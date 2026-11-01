import { createApiClient, ApiError } from '../apiClient';
import type { ApiClient } from '../apiClient';
import { loadCredentials, saveCredentials, getConsoleUrl } from '../credentialStore';
import { logger } from '../logger';
import {
  StateBackend,
  LockMetadata,
  StateSource,
  WriteReadiness,
  BackendCapabilities,
} from './types';
import type { LockOptions } from '../../types';
import { StateFile } from '../../types';
import { migrateState, toPersistedState, emptyScopedState } from '../stateManager';
import { normalizeScope } from '../stateScope';
import { EventQueue, DeploymentEventRecord } from '../eventQueue';
import { lang } from '../../lang';
import crypto from 'node:crypto';
import type { DeploymentScope } from '../stateScope';

export type SaasBackendContext = {
  readonly scope: DeploymentScope;
  /** Org slug declared as top-level `org:` in the yaml (D-6). When present it
   * must match the API key's org — checked before any provisioning write. */
  readonly declaredOrg?: string;
};

export type SaasBackendOptions = {
  /** Explicit API key (--si-api-key / env) taking precedence over the credentials file. */
  readonly apiKey?: string;
  /**
   * 'mutating' commands may provision deployments and write state; 'read-only'
   * commands resolve identity/state without creating any deployment or
   * lifecycle record (issue #280 §4).
   */
  readonly mode?: 'mutating' | 'read-only';
};

type DeploymentInitResponse = {
  id: string;
  appId: string;
  serviceId: string;
  status: string;
  isNewApp: boolean;
  isNewService: boolean;
};

type ActiveDeployment = {
  id: string;
  status: string;
};

type MigrateTargetsResponse = {
  app: { name: string; exists: boolean; id: string | null };
  service: { name: string; exists: boolean; id: string | null; provider: string | null };
  stages: Array<{
    name: string;
    registered: boolean;
    hasState: boolean;
    latestVersion: string | null;
  }>;
};

type ServerCapabilities = {
  regionalScope: boolean;
};

/**
 * Scope protocol version carried by every regional mutation payload. Servers
 * that understand regional isolation validate it; servers that predate the
 * protocol strip the unknown fields — which the CLI detects via the
 * capabilities probe and refuses to write through (no silent unscoped fallback).
 */
export const SCOPE_PROTOCOL_VERSION = 1;

/**
 * Scope-bound SaaS backend (issue #280 §4). Deployment identity on the Console
 * is Service + Stage + Region; the authenticated, server-resolved service
 * identity inherits App/Organization ownership.
 */
export const createSaasStateBackend = (
  context: SaasBackendContext,
  options?: SaasBackendOptions,
): StateBackend => {
  const normalized = normalizeScope(context.scope);
  const mode = options?.mode ?? 'mutating';
  const creds = loadCredentials();
  const apiKey = options?.apiKey || creds?.apiKey;
  const consoleUrl = getConsoleUrl();
  let knownOrgId = creds?.orgId ?? '';

  if (!apiKey) {
    throw new Error(lang.__('SAAS_BACKEND_NO_CREDENTIALS'));
  }

  // D-6 fast path: when both the yaml declaration and the stored slug are
  // known, fail before touching the network at all.
  if (context.declaredOrg && creds?.orgSlug && context.declaredOrg !== creds.orgSlug) {
    throw new Error(
      lang.__('SAAS_ORG_MISMATCH', {
        declared: context.declaredOrg,
        actual: creds.orgSlug,
      }),
    );
  }
  if (!context.declaredOrg && creds?.orgName) {
    logger.info(lang.__('SAAS_ORG_FROM_CREDENTIALS', { orgName: creds.orgName }));
  }

  const client: ApiClient = createApiClient({
    apiKey,
    baseUrl: consoleUrl,
    orgId: knownOrgId,
  });

  let currentDeploymentId: string | null = null;
  let resolvedAppId: string | null = null;
  let resolvedServiceId: string | null = null;
  let provisioned = false;
  let eventQueue: EventQueue | null = null;
  let sequenceCounter = 0;
  let lastSource: StateSource = 'empty';
  let probedCapabilities: ServerCapabilities | null = null;
  // Server-acknowledged base revision for optimistic concurrency: updated from
  // every successful load/sync so consecutive saves within one deployment
  // advance the base instead of replaying a stale one (issue #280 §4).
  let acknowledgedSerial: number | null = null;

  const capabilities: BackendCapabilities = { conditionalCreate: true };

  /**
   * Probe server scope capabilities without creating business records. A 404
   * (pre-regional server) resolves to { regionalScope: false } — regional
   * writes stay disabled instead of silently falling back to the unscoped
   * protocol.
   */
  const probeCapabilities = async (): Promise<ServerCapabilities> => {
    if (probedCapabilities) {
      return probedCapabilities;
    }
    try {
      const caps = await client.get<Partial<ServerCapabilities>>('/api/v1/capabilities');
      probedCapabilities = { regionalScope: caps?.regionalScope === true };
    } catch (error) {
      if (error instanceof ApiError && (error.status === 404 || error.status === 405)) {
        probedCapabilities = { regionalScope: false };
      } else {
        throw error;
      }
    }
    return probedCapabilities;
  };

  /** ADR-005: enqueue a typed event for the active deployment (durable JSONL + batch flush). */
  const reportEvent = (event: DeploymentEventRecord): void => {
    ensureEventQueue();
    if (!eventQueue || !currentDeploymentId) return;
    sequenceCounter += 1;
    eventQueue.report({
      ...event,
      deploymentId: currentDeploymentId,
      sequence: event.sequence ?? sequenceCounter,
    });
  };

  const ensureEventQueue = (): void => {
    if (eventQueue || !currentDeploymentId) return;
    eventQueue = new EventQueue({
      deploymentId: currentDeploymentId,
      sendBatch: async (events) => {
        await client.patch(`/api/v1/deployments/${currentDeploymentId}`, {
          phase: 'event',
          events,
          ...(resolvedAppId ? { appId: resolvedAppId } : {}),
        });
      },
      flushOnExit: true,
    });
  };

  /**
   * D-6: resolve the API key's org identity (id + slug). Credentials written
   * before the slug field existed lack it — fetch it from the validate endpoint
   * once, cache it for this backend instance and heal the stored file so later
   * commands check locally. Unresolvable (network / version skew) degrades to
   * skipping the checks: the key still only ever writes to its own org.
   */
  let resolvedIdentity: { orgId?: string; orgSlug?: string } | null = null;
  const resolveKeyOrgIdentity = async (): Promise<{ orgId?: string; orgSlug?: string }> => {
    if (resolvedIdentity) {
      return resolvedIdentity;
    }
    const local: { orgId?: string; orgSlug?: string } = {
      orgId: creds?.orgId || undefined,
      orgSlug: creds?.orgSlug,
    };
    if (local.orgId && local.orgSlug) {
      resolvedIdentity = local;
      return local;
    }
    try {
      const fetched = await client.get<{ orgId?: string; orgSlug?: string }>(
        '/api/v1/auth/api-keys/validate',
      );
      if (fetched.orgSlug && creds) {
        saveCredentials({ ...creds, orgSlug: fetched.orgSlug });
      }
      resolvedIdentity = {
        orgId: local.orgId ?? fetched.orgId,
        orgSlug: local.orgSlug ?? fetched.orgSlug,
      };
      knownOrgId = resolvedIdentity.orgId ?? knownOrgId;
    } catch {
      resolvedIdentity = local;
    }
    return resolvedIdentity;
  };

  /**
   * Read-only identity resolution (issue #280 §4): resolve app/service ids via
   * the migrate-targets endpoint WITHOUT creating any deployment or lifecycle
   * record. Used by diff/show. Only reachable while `provisioned` is false —
   * a successful resolution flips that flag, so no cache-check is needed here.
   */
  const resolveReadOnlyIdentity = async (): Promise<boolean> => {
    const targets = await client.get<MigrateTargetsResponse>(
      `/api/v1/state/migrate/targets?app_name=${encodeURIComponent(normalized.app)}&service_name=${encodeURIComponent(normalized.service)}&stages=${encodeURIComponent(normalized.stage)}`,
    );
    if (!targets.app.exists || !targets.service.exists) {
      return false;
    }
    resolvedAppId = targets.app.id!;
    resolvedServiceId = targets.service.id!;
    return true;
  };

  /**
   * Provision the deployment by calling the unified POST endpoint (mutating
   * mode only). This resolves YAML names to Console UUIDs and caches them.
   * The payload carries the regional scope protocol.
   */
  const provision = async (provider: string, stage: string): Promise<void> => {
    // D-6: the org declaration must match the key's org BEFORE provisioning —
    // this POST is what auto-creates app/service, i.e. the wrong-org write.
    if (context.declaredOrg) {
      const { orgSlug } = await resolveKeyOrgIdentity();
      if (orgSlug && orgSlug !== context.declaredOrg) {
        throw new Error(
          lang.__('SAAS_ORG_MISMATCH', {
            declared: context.declaredOrg,
            actual: orgSlug,
          }),
        );
      }
    }
    const caps = await probeCapabilities();
    if (!caps.regionalScope) {
      throw new Error(lang.__('SAAS_REGIONAL_SCOPE_UNSUPPORTED', { consoleUrl }));
    }
    const result = await client.post<DeploymentInitResponse>('/api/v1/deployments/', {
      appName: normalized.app,
      serviceName: normalized.service,
      provider,
      stage,
      region: normalized.region,
      scope: { stage, region: normalized.region },
      scopeProtocol: SCOPE_PROTOCOL_VERSION,
      spec: { operation: 'init' },
      source: 'cli',
    });
    resolvedAppId = result.appId;
    resolvedServiceId = result.serviceId;
    currentDeploymentId = result.id;
    provisioned = true;
  };

  /**
   * Ensure the backend is provisioned — mutating mode calls provision();
   * read-only mode resolves identity without creating records.
   */
  const ensureResolved = async (provider: string, stage: string): Promise<void> => {
    if (provisioned) {
      return;
    }
    if (mode === 'read-only') {
      const exists = await resolveReadOnlyIdentity();
      if (!exists) {
        // A deployment that does not exist yet has no state — and creating one
        // is exactly what a read-only command must not do.
        lastSource = 'empty';
        return;
      }
      provisioned = true;
      return;
    }
    await provision(provider, stage);
  };

  /** Validate a returned state document against the bound scope before use. */
  const validateReturnedScope = (stateJson: StateFile): StateFile => {
    if (stateJson.scope) {
      const stored = {
        provider: stateJson.provider,
        app: stateJson.app,
        service: stateJson.service,
        stage: stateJson.scope.stage,
        region: stateJson.scope.region,
      };
      const matches =
        stored.stage === normalized.stage &&
        (stored.region ?? '').toLowerCase() === normalized.region;
      if (!matches) {
        throw new Error(
          lang.__('SAAS_STATE_SCOPE_MISMATCH', {
            storedStage: stored.stage ?? 'unknown',
            storedRegion: stored.region ?? 'unknown',
            stage: normalized.stage,
            region: normalized.region,
          }),
        );
      }
    }
    return stateJson;
  };

  return {
    scope: normalized,
    capabilities,

    loadState: async (): Promise<StateFile> => {
      await ensureResolved(normalized.provider, normalized.stage);

      if (!resolvedAppId || !resolvedServiceId) {
        // Read-only resolution found no existing app/service — no state, and
        // no records were created.
        lastSource = 'empty';
        return emptyScopedState(normalized);
      }

      try {
        const state = await client.get<{ stateJson: StateFile }>(
          `/api/v1/apps/${resolvedAppId}/services/${resolvedServiceId}/state/current?stage=${encodeURIComponent(normalized.stage)}&region=${encodeURIComponent(normalized.region)}`,
        );
        const validated = validateReturnedScope(state.stateJson);
        const migrated = migrateState(validated);
        // D-6 identity anchor: the state records the org id that owns this
        // service (persisted on every SaaS save / migrate backfill). A mismatch
        // with the current key's org means a wrong key — or an org deleted and
        // recreated under the same slug (name matches, identity does not).
        // Refuse before anything downstream reads or writes this state.
        if (migrated.orgId) {
          const { orgId: keyOrgId } = await resolveKeyOrgIdentity();
          if (keyOrgId && migrated.orgId !== keyOrgId) {
            throw new Error(
              lang.__('SAAS_STATE_ORG_MISMATCH', {
                stateOrgId: migrated.orgId,
                keyOrgId,
              }),
            );
          }
        }
        // A returned document WITH a matching scope is regional; one without
        // scope info predates the regional protocol — ambiguity is resolved
        // by the write gate, never by picking an arbitrary region.
        lastSource = state.stateJson.scope ? 'scoped' : 'legacy';
        acknowledgedSerial = state.stateJson.serial ?? null;
        // Legacy Console states hold fresh resources only in the top-level
        // field (pre-stage-syncing saves) — prefer the stage store, fall back.
        const stageResources = migrated.stages?.[normalized.stage]?.resources;
        const resources =
          stageResources && Object.keys(stageResources).length > 0
            ? stageResources
            : migrated.resources && Object.keys(migrated.resources).length > 0
              ? migrated.resources
              : {};
        // Attach console metadata so subsequent deploys have the UUIDs
        return {
          ...migrated,
          resources,
          orgId: knownOrgId,
          appId: resolvedAppId!,
          serviceId: resolvedServiceId!,
        };
      } catch (error) {
        // Only a genuine 404 ("no state yet for this service+stage+region") may
        // start from an empty state. Network/5xx/auth failures must surface —
        // treating them as empty would make the next plan propose full
        // re-creation.
        if (!(error instanceof ApiError && error.status === 404)) {
          throw error;
        }
        lastSource = 'empty';
        return {
          ...emptyScopedState(normalized),
          orgId: knownOrgId,
          ...(resolvedAppId ? { appId: resolvedAppId } : {}),
          ...(resolvedServiceId ? { serviceId: resolvedServiceId } : {}),
        };
      }
    },

    saveState: async (state: StateFile): Promise<void> => {
      if (mode !== 'mutating') {
        throw new Error(lang.__('SAAS_READ_ONLY_WRITE_REFUSED'));
      }
      // A save whose identity differs from the bound scope is refused — the
      // SaaS backend never writes state across deployment scopes.
      if (
        state.provider !== normalized.provider ||
        state.app !== normalized.app ||
        state.service !== normalized.service
      ) {
        throw new Error(
          lang.__('SAAS_STATE_SCOPE_MISMATCH', {
            storedStage: state.scope?.stage ?? state.provider,
            storedRegion: state.scope?.region ?? `${state.app}/${state.service}`,
            stage: normalized.stage,
            region: normalized.region,
          }),
        );
      }
      // Defense in depth: the write gate runs earlier; verify again so no
      // unscoped write can slip through a missed probe.
      const caps = await probeCapabilities();
      if (!caps.regionalScope) {
        throw new Error(lang.__('SAAS_REGIONAL_SCOPE_UNSUPPORTED', { consoleUrl }));
      }
      await ensureResolved(state.provider, normalized.stage);

      // Sync the runtime projection into the stage store before stripping, so
      // stages[stage].resources carries the fresh working set (mirrors the fs
      // and remote backends' save contract)
      const stateJson = toPersistedState({
        ...state,
        scope: { stage: normalized.stage, region: normalized.region },
        stages: {
          ...state.stages,
          [normalized.stage]: {
            ...state.stages?.[normalized.stage],
            resources: state.resources,
          },
        },
      });
      const contentHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(stateJson))
        .digest('hex');
      const baseRevision = acknowledgedSerial ?? state.serial ?? null;
      const body = {
        appName: normalized.app,
        serviceName: normalized.service,
        provider: state.provider,
        stage: normalized.stage,
        region: normalized.region,
        scope: { stage: normalized.stage, region: normalized.region },
        scopeProtocol: SCOPE_PROTOCOL_VERSION,
        // Base revision/lineage for optimistic concurrency on the server —
        // advances with every confirmed save in this run instead of replaying
        // the revision loaded before the deploy started.
        baseSerial: baseRevision,
        baseLineage: state.lineage ?? null,
        // Idempotency: retries of the SAME document (same lineage + content)
        // dedupe; distinct incremental saves of one deployment have distinct
        // content and therefore distinct keys — progress is never dropped.
        idempotencyKey: crypto
          .createHash('sha256')
          .update(
            JSON.stringify({
              app: normalized.app,
              service: normalized.service,
              stage: normalized.stage,
              region: normalized.region,
              lineage: state.lineage ?? null,
              contentHash,
            }),
          )
          .digest('hex'),
        stateJson,
        contentHash,
        resourceCount: Object.keys(state.resources).length,
      };
      await client.post(
        `/api/v1/apps/${resolvedAppId}/services/${resolvedServiceId}/state/sync`,
        body,
      );
      acknowledgedSerial = (baseRevision ?? -1) + 1;
      lastSource = 'scoped';
    },

    readStateSource: (): StateSource => lastSource,

    probeWriteReadiness: async (): Promise<WriteReadiness> => {
      const caps = await probeCapabilities();
      if (!caps.regionalScope) {
        return {
          ready: false,
          source: lastSource,
          reason: lang.__('SAAS_REGIONAL_SCOPE_UNSUPPORTED', { consoleUrl }),
        };
      }
      if (lastSource === 'legacy') {
        return {
          ready: false,
          source: lastSource,
          reason: lang.__('SAAS_WRITE_BLOCKED_UNSCOPED_STATE', {
            stage: normalized.stage,
            region: normalized.region,
          }),
        };
      }
      return { ready: true, source: lastSource };
    },

    acquireLock: async (_operation: string, _lockOptions?: LockOptions): Promise<string> => {
      return 'saas-lock-placeholder';
    },

    releaseLock: async (_lockId: string): Promise<void> => {
      // Lock is managed by deployment lifecycle in withLock
    },

    forceUnlock: async (_lockId: string): Promise<boolean> => {
      throw new Error(
        lang.__('SAAS_FORCE_UNLOCK_NOT_SUPPORTED', {
          consoleUrl,
        }),
      );
    },

    readLock: async (): Promise<LockMetadata | null> => {
      if (!resolvedServiceId) {
        return null;
      }
      try {
        const active = await client.get<ActiveDeployment[]>(
          `/api/v1/deployments/active?service_id=${resolvedServiceId}&stage=${normalized.stage}&region=${normalized.region}`,
        );
        // Backend returns data:null (not []) when no deployment is active
        if (Array.isArray(active) && active.length > 0) {
          const d = active[0];
          return {
            id: d.id,
            user: 'Console',
            processId: 0,
            hostname: 'console',
            operation: 'deploy',
            acquiredAt: new Date().toISOString(),
            path: `/api/v1/deployments/${d.id}`,
          };
        }
        return null;
      } catch {
        return null;
      }
    },

    withLock: async <T>(
      operation: string,
      fn: () => Promise<T>,
      _lockOptions?: LockOptions,
      onLockAcquired?: (lockId: string) => void,
    ): Promise<T> => {
      if (!currentDeploymentId) {
        throw new Error(lang.__('SAAS_BACKEND_NO_DEPLOYMENT'));
      }

      // Acquire lock via phase:start (server checks for 409 conflicts). The
      // regional scope rides along so the server binds the run to this
      // Stage/Region deployment, not merely the service+stage.
      await client.patch(`/api/v1/deployments/${currentDeploymentId}`, {
        phase: 'start',
        region: normalized.region,
        scope: { stage: normalized.stage, region: normalized.region },
        scopeProtocol: SCOPE_PROTOCOL_VERSION,
      });
      onLockAcquired?.(currentDeploymentId);
      ensureEventQueue();
      reportEvent({ type: 'deployment_started', message: `Deployment ${operation} started` });

      try {
        const result = await fn();
        // If the caller returned a deployment summary ({ stateJson, plan,
        // contentHash, resourceCount }), forward it so the console persists the
        // plan + linked infra state (Changes / State JSON on deployment detail).
        // Otherwise fall back to the legacy contract (result = fn's value).
        const summary = (result ?? {}) as Record<string, unknown>;
        const isSummary =
          typeof result === 'object' &&
          result !== null &&
          ('stateJson' in summary || 'plan' in summary);
        await client.patch(`/api/v1/deployments/${currentDeploymentId}`, {
          phase: 'complete',
          region: normalized.region,
          result: isSummary ? (summary['result'] ?? null) : result,
          ...(isSummary
            ? {
                stateJson: summary['stateJson'],
                contentHash: summary['contentHash'],
                resourceCount: summary['resourceCount'],
                plan: summary['plan'],
              }
            : {}),
        });
        reportEvent({ type: 'deployment_completed', message: `Deployment ${operation} completed` });
        await eventQueue?.flushOnExit();
        return result;
      } catch (err) {
        // Fail with error. If the caller attached plan/stateJson to the error
        // (see commands/deploy.ts), forward them so the console can render
        // Changes + State JSON even for a failed deployment.
        const failure = err as Error & {
          plan?: { items: Array<unknown> };
          stateJson?: Record<string, unknown>;
        };
        try {
          const payload: Record<string, unknown> = {
            phase: 'fail',
            region: normalized.region,
            error: { message: err instanceof Error ? err.message : String(err) },
            ...(failure.plan ? { plan: failure.plan } : {}),
          };
          if (failure.stateJson) {
            payload['stateJson'] = failure.stateJson;
            payload['contentHash'] = crypto
              .createHash('sha256')
              .update(JSON.stringify(failure.stateJson))
              .digest('hex');
            payload['resourceCount'] = Object.keys(failure.stateJson.resources ?? {}).length;
          }
          await client.patch(`/api/v1/deployments/${currentDeploymentId}`, payload);
        } catch {
          // Best-effort fail notification
        }
        reportEvent({
          type: 'deployment_failed',
          message: `Deployment ${operation} failed`,
          error: { message: err instanceof Error ? err.message : String(err) },
          severity: 'error',
        });
        await eventQueue?.flushOnExit();
        throw err;
      }
    },

    reportEvent,
    flushEvents: async (): Promise<void> => {
      await eventQueue?.flushOnExit();
    },
    replayOrphanedEvents: async (): Promise<void> => {
      // Replays queue files from ANY previous run — each file carries its own
      // deploymentId, and sendBatch targets the deployment embedded in the event.
      const replayQueue = new EventQueue({
        deploymentId: 'replay',
        sendBatch: async (events) => {
          const deploymentId = events[0]?.deploymentId as string | undefined;
          if (!deploymentId) return;
          await client.patch(`/api/v1/deployments/${deploymentId}`, {
            phase: 'event',
            events,
          });
        },
      });
      await replayQueue.replayOrphanedQueues();
    },
  };
};

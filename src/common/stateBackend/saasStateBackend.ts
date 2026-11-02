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
import type { DeploymentScope } from '../stateScope';
import {
  SCOPE_PROTOCOL_VERSION,
  supportsRegionalSaas,
  isRegionalSaasSnapshot,
  hashSaasState,
  type SaasStateSnapshot,
} from '../saasProtocol';
import { CURRENT_STATE_VERSION } from '../../types';

export type SaasBackendContext = {
  readonly scope: DeploymentScope;
  /** Org slug declared as top-level `org:` in the yaml (D-6). When present it
   * must match the API key's org — checked before any provisioning write. */
  readonly declaredOrg?: string;
};

export type SaasBackendOptions = {
  /** Explicit API key (--si-api-key / env) taking precedence over the credentials file. */
  readonly apiKey?: string;
  readonly mode?: 'mutating' | 'read-only';
  readonly eventQueueDir?: string;
};

type DeploymentInitResponse = {
  id: string;
  appId: string;
  serviceId: string;
  status: string;
  isNewApp: boolean;
  isNewService: boolean;
  stage: string;
  region: string;
  stageId: string;
  scopeProtocol: number;
  orgId?: string;
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

export const createSaasStateBackend = (
  context: SaasBackendContext,
  options?: SaasBackendOptions,
): StateBackend => {
  const normalized = normalizeScope(context.scope);
  const mode = options?.mode ?? 'mutating';
  const creds = options?.apiKey ? null : loadCredentials();
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
  // Only the server-acknowledged hash is a CAS base; never reconstruct it
  // from JSONB or from a document-local serial/lineage.
  let acknowledgedHash: string | null = null;
  let acknowledgedSnapshot: SaasStateSnapshot | null = null;
  let running = false;

  const retryRequest = async <T>(send: () => Promise<T>): Promise<T> => {
    try {
      return await send();
    } catch (error) {
      if (error instanceof ApiError && error.status < 500) throw error;
      return send();
    }
  };

  const capabilities: BackendCapabilities = { conditionalCreate: true };

  const probeCapabilities = async (): Promise<ServerCapabilities> => {
    if (probedCapabilities) {
      return probedCapabilities;
    }
    try {
      const caps = await client.get<Partial<ServerCapabilities>>('/api/v1/capabilities');
      probedCapabilities = { regionalScope: supportsRegionalSaas(caps) };
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
      queueDir: options?.eventQueueDir,
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

  const resolveReadOnlyIdentity = async (): Promise<boolean> => {
    const targets = await client.get<MigrateTargetsResponse>(
      `/api/v1/state/migrate/targets?app_name=${encodeURIComponent(normalized.app)}&service_name=${encodeURIComponent(normalized.service)}&stages=${encodeURIComponent(normalized.stage)}&region=${encodeURIComponent(normalized.region)}`,
    );
    if (!targets.app.exists || !targets.service.exists) {
      return false;
    }
    resolvedAppId = targets.app.id!;
    resolvedServiceId = targets.service.id!;
    return true;
  };

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
      scopeProtocol: SCOPE_PROTOCOL_VERSION,
      spec: { operation: 'init' },
      source: 'cli',
    });
    if (
      result.scopeProtocol !== SCOPE_PROTOCOL_VERSION ||
      result.stage !== normalized.stage ||
      result.region !== normalized.region ||
      !result.stageId
    ) {
      throw new Error(lang.__('SAAS_STATE_ACK_INVALID'));
    }
    resolvedAppId = result.appId;
    knownOrgId = result.orgId ?? knownOrgId;
    resolvedServiceId = result.serviceId;
    currentDeploymentId = result.id;
    provisioned = true;
  };

  const ensureResolved = async (provider: string, stage: string): Promise<void> => {
    if (provisioned) {
      return;
    }
    if (mode === 'read-only') {
      const exists = await resolveReadOnlyIdentity();
      if (!exists) {
        lastSource = 'empty';
        return;
      }
      provisioned = true;
      return;
    }
    await provision(provider, stage);
  };

  const validateReturnedScope = (stateJson: StateFile): StateFile => {
    if (
      stateJson.provider !== normalized.provider ||
      stateJson.app !== normalized.app ||
      stateJson.service !== normalized.service
    ) {
      throw new Error(
        lang.__('SAAS_STATE_SCOPE_MISMATCH', {
          storedStage: stateJson.scope?.stage ?? 'unknown',
          storedRegion: stateJson.scope?.region ?? 'unknown',
          stage: normalized.stage,
          region: normalized.region,
        }),
      );
    }
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
        lastSource = 'empty';
        return emptyScopedState(normalized);
      }

      try {
        const state = await client.get<SaasStateSnapshot>(
          `/api/v1/apps/${resolvedAppId}/services/${resolvedServiceId}/state/current?stage=${encodeURIComponent(normalized.stage)}&region=${encodeURIComponent(normalized.region)}`,
        );
        if (!state || !state.stateJson || typeof state.stateJson !== 'object') {
          throw new Error(lang.__('SAAS_STATE_ACK_INVALID'));
        }
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
        // The server's activated lifecycle binding authorizes projection of
        // historical documents; the JSON scope block alone is not authority.
        const regional =
          isRegionalSaasSnapshot(state, normalized) && state.serviceId === resolvedServiceId;
        lastSource = regional ? 'scoped' : 'legacy';
        acknowledgedHash = regional ? state.contentHash : null;
        acknowledgedSnapshot = regional ? state : null;
        // Legacy Console states hold fresh resources only in the top-level
        // field (pre-stage-syncing saves) — prefer the stage store, fall back.
        const stageResources = migrated.stages?.[normalized.stage]?.resources;
        const resources =
          stageResources !== undefined
            ? stageResources
            : migrated.resources && Object.keys(migrated.resources).length > 0
              ? migrated.resources
              : {};
        // Attach console metadata so subsequent deploys have the UUIDs
        return {
          ...migrated,
          ...(regional
            ? {
                version: CURRENT_STATE_VERSION,
                scope: { stage: normalized.stage, region: normalized.region },
                stages: {
                  [normalized.stage]: { ...migrated.stages?.[normalized.stage], resources },
                },
              }
            : {}),
          resources,
          orgId: knownOrgId,
          appId: resolvedAppId!,
          serviceId: resolvedServiceId!,
        };
      } catch (error) {
        if (!(error instanceof ApiError && error.status === 404)) {
          throw error;
        }
        lastSource = 'empty';
        acknowledgedHash = '';
        acknowledgedSnapshot = null;
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

      if (
        state.provider !== normalized.provider ||
        state.app !== normalized.app ||
        state.service !== normalized.service ||
        (state.scope &&
          (state.scope.stage !== normalized.stage || state.scope.region !== normalized.region))
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

      const caps = await probeCapabilities();
      if (!caps.regionalScope) {
        throw new Error(lang.__('SAAS_REGIONAL_SCOPE_UNSUPPORTED', { consoleUrl }));
      }
      await ensureResolved(state.provider, normalized.stage);
      if (acknowledgedHash === null) {
        throw new Error(lang.__('SAAS_STATE_BASE_UNKNOWN'));
      }

      // Sync the runtime projection into the stage store before stripping, so
      // stages[stage].resources carries the fresh working set (mirrors the fs
      // and remote backends' save contract)
      const stateJson = toPersistedState({
        ...state,
        version: CURRENT_STATE_VERSION,
        scope: { stage: normalized.stage, region: normalized.region },
        stages: {
          [normalized.stage]: {
            ...state.stages?.[normalized.stage],
            resources: state.resources,
          },
        },
      });
      const contentHash = hashSaasState(stateJson);
      const body = {
        appName: normalized.app,
        serviceName: normalized.service,
        provider: state.provider,
        stage: normalized.stage,
        region: normalized.region,
        scopeProtocol: SCOPE_PROTOCOL_VERSION,
        baseContentHash: acknowledgedHash,
        ...(running ? { deploymentId: currentDeploymentId } : {}),
        stateJson,
        contentHash,
        resourceCount: Object.keys(state.resources).length,
      };
      const response = await retryRequest(() =>
        client.post<SaasStateSnapshot>(
          `/api/v1/apps/${resolvedAppId}/services/${resolvedServiceId}/state/sync`,
          body,
        ),
      );
      if (
        !isRegionalSaasSnapshot(response, normalized) ||
        response.serviceId !== resolvedServiceId ||
        response.contentHash !== contentHash
      ) {
        throw new Error(lang.__('SAAS_STATE_ACK_INVALID'));
      }
      acknowledgedHash = response.contentHash;
      acknowledgedSnapshot = response;
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
      if (mode !== 'mutating' || acknowledgedHash === null) {
        throw new Error(lang.__('SAAS_STATE_BASE_UNKNOWN'));
      }

      await retryRequest(() =>
        client.patch(`/api/v1/deployments/${currentDeploymentId}`, {
          phase: 'start',
          region: normalized.region,
          scopeProtocol: SCOPE_PROTOCOL_VERSION,
          baseContentHash: acknowledgedHash,
        }),
      );
      running = true;
      onLockAcquired?.(currentDeploymentId);
      ensureEventQueue();
      reportEvent({
        type: 'deployment_started',
        message: lang.__('SAAS_BACKEND_DEPLOYMENT_STARTED'),
      });

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
        await retryRequest(() =>
          client.patch(`/api/v1/deployments/${currentDeploymentId}`, {
            phase: 'complete',
            region: normalized.region,
            scopeProtocol: SCOPE_PROTOCOL_VERSION,
            baseContentHash: acknowledgedHash,
            ...(acknowledgedSnapshot ? { stateId: acknowledgedSnapshot.id } : {}),
            result: isSummary ? (summary['result'] ?? null) : result,
            ...(isSummary
              ? {
                  ...(!acknowledgedSnapshot && summary['stateJson']
                    ? {
                        stateJson: summary['stateJson'],
                        contentHash: hashSaasState(summary['stateJson']),
                        resourceCount: summary['resourceCount'],
                      }
                    : {}),
                  plan: summary['plan'],
                }
              : {}),
          }),
        );
        reportEvent({
          type: 'deployment_completed',
          message: lang.__('SAAS_BACKEND_DEPLOYMENT_COMPLETE'),
        });
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
            scopeProtocol: SCOPE_PROTOCOL_VERSION,
            baseContentHash: acknowledgedHash,
            ...(acknowledgedSnapshot ? { stateId: acknowledgedSnapshot.id } : {}),
            error: { message: err instanceof Error ? err.message : String(err) },
            ...(failure.plan ? { plan: failure.plan } : {}),
          };
          if (failure.stateJson) payload['stateSnapshot'] = failure.stateJson;
          try {
            await retryRequest(() =>
              client.patch(`/api/v1/deployments/${currentDeploymentId}`, payload),
            );
          } catch (failureError) {
            if (!(failureError instanceof ApiError && failureError.status === 409))
              throw failureError;
            // Preserve partial diagnostics, but never replace a newer head.
            const { stateId: _stateId, ...diagnostic } = payload;
            await retryRequest(() =>
              client.patch(`/api/v1/deployments/${currentDeploymentId}`, diagnostic),
            );
          }
        } catch {
          // Best-effort fail notification
        }
        reportEvent({
          type: 'deployment_failed',
          message: lang.__('SAAS_BACKEND_DEPLOYMENT_FAILED', {
            error: err instanceof Error ? err.message : String(err),
          }),
          error: { message: err instanceof Error ? err.message : String(err) },
          severity: 'error',
        });
        await eventQueue?.flushOnExit();
        throw err;
      } finally {
        running = false;
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
        queueDir: options?.eventQueueDir,
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

import { createApiClient } from '../apiClient';
import type { ApiClient } from '../apiClient';
import { loadCredentials, getConsoleUrl } from '../credentialStore';
import { StateBackend } from './types';
import { StateFile, LockMetadata, LockOptions, CURRENT_STATE_VERSION } from '../../types';
import { migrateState, toPersistedState } from '../stateManager';
import { EventQueue, DeploymentEventRecord } from '../eventQueue';
import { lang } from '../../lang';
import crypto from 'node:crypto';

export type SaasBackendContext = {
  readonly app: string;
  readonly service: string;
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

const getDefaultState = (provider: string, app: string, service: string): StateFile => ({
  version: CURRENT_STATE_VERSION,
  provider,
  app,
  service,
  stages: {},
  resources: {},
});

export const createSaasStateBackend = (context: SaasBackendContext): StateBackend => {
  const creds = loadCredentials();
  const apiKey = creds?.apiKey;
  const consoleUrl = getConsoleUrl();
  const orgId = creds?.orgId ?? '';

  if (!apiKey) {
    throw new Error(lang.__('SAAS_BACKEND_NO_CREDENTIALS'));
  }

  const client: ApiClient = createApiClient({
    apiKey,
    baseUrl: consoleUrl,
    orgId,
  });

  let currentDeploymentId: string | null = null;
  let currentStage: string | null = null;
  let resolvedAppId: string | null = null;
  let resolvedServiceId: string | null = null;
  let provisioned = false;
  let eventQueue: EventQueue | null = null;
  let sequenceCounter = 0;

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
   * Provision the deployment by calling the unified POST endpoint.
   * This resolves YAML names to Console UUIDs and caches them.
   */
  const provision = async (provider: string, stage: string): Promise<void> => {
    const result = await client.post<DeploymentInitResponse>('/api/v1/deployments/', {
      appName: context.app,
      serviceName: context.service,
      provider,
      stage,
      spec: { operation: 'init' },
      source: 'cli',
    });
    resolvedAppId = result.appId;
    resolvedServiceId = result.serviceId;
    currentDeploymentId = result.id;
    provisioned = true;
  };

  /**
   * Ensure the backend is provisioned — calls provision() if not already done.
   */
  const ensureProvisioned = async (provider: string, stage: string): Promise<void> => {
    if (!provisioned) {
      await provision(provider, stage);
    }
  };

  return {
    loadState: async (
      provider: string,
      app: string,
      service: string,
      stage: string,
    ): Promise<StateFile> => {
      currentStage = stage;
      await ensureProvisioned(provider, stage);

      try {
        const state = await client.get<{ stateJson: StateFile }>(
          `/api/v1/apps/${resolvedAppId}/services/${resolvedServiceId}/state/current?stage=${encodeURIComponent(stage)}`,
        );
        const migrated = migrateState(state.stateJson);
        // Legacy Console states hold fresh resources only in the top-level
        // field (pre-stage-syncing saves) — prefer the stage store, fall back.
        const stageResources = migrated.stages?.[stage]?.resources;
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
          orgId,
          appId: resolvedAppId!,
          serviceId: resolvedServiceId!,
        };
      } catch {
        const defaultState = getDefaultState(provider, app, service);
        return {
          ...defaultState,
          orgId,
          appId: resolvedAppId!,
          serviceId: resolvedServiceId!,
        };
      }
    },

    saveState: async (
      state: StateFile,
      app: string,
      service: string,
      stage: string,
    ): Promise<void> => {
      // If not provisioned yet, use the state's provider for provisioning
      await ensureProvisioned(state.provider, stage);

      // Sync the runtime projection into the stage store before stripping, so
      // stages[stage].resources carries the fresh working set (mirrors the fs
      // and remote backends' save contract)
      const stateJson = toPersistedState({
        ...state,
        stages: {
          ...state.stages,
          [stage]: {
            ...state.stages?.[stage],
            resources: state.resources,
          },
        },
      });
      const body = {
        appName: app,
        serviceName: service,
        provider: state.provider,
        stage,
        stateJson,
        contentHash: crypto.createHash('sha256').update(JSON.stringify(stateJson)).digest('hex'),
        resourceCount: Object.keys(state.resources).length,
      };
      await client.post(
        `/api/v1/apps/${resolvedAppId}/services/${resolvedServiceId}/state/sync`,
        body,
      );
    },

    acquireLock: async (_operation: string, _options?: LockOptions): Promise<string> => {
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
          `/api/v1/deployments/active?service_id=${resolvedServiceId}&stage=${currentStage ?? ''}`,
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
      _options?: LockOptions,
      onLockAcquired?: (lockId: string) => void,
    ): Promise<T> => {
      if (!currentStage) {
        throw new Error('SaaS state backend: call loadState() first to set stage');
      }
      if (!currentDeploymentId) {
        throw new Error('SaaS state backend: no deployment available, call loadState() first');
      }

      // Acquire lock via phase:start (server checks for 409 conflicts)
      await client.patch(`/api/v1/deployments/${currentDeploymentId}`, { phase: 'start' });
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

import { createApiClient } from '../apiClient';
import type { ApiClient } from '../apiClient';
import { loadCredentials, getConsoleUrl } from '../credentialStore';
import { StateBackend } from './types';
import { StateFile, LockMetadata, LockOptions, CURRENT_STATE_VERSION } from '../../types';
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
        // Attach console metadata so subsequent deploys have the UUIDs
        return {
          ...state.stateJson,
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

      // The backend persists the full state file under state_json — send the whole
      // StateFile (not just resources) so loadState round-trips it unchanged.
      const body = {
        appName: app,
        serviceName: service,
        provider: state.provider,
        stage,
        stateJson: state,
        contentHash: crypto.createHash('sha256').update(JSON.stringify(state)).digest('hex'),
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

    forceUnlock: async (lockId: string): Promise<boolean> => {
      try {
        await client.post(`/api/v1/deployments/${lockId}/force-unlock`, {});
        return true;
      } catch {
        return false;
      }
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
    ): Promise<T> => {
      if (!currentStage) {
        throw new Error('SaaS state backend: call loadState() first to set stage');
      }
      if (!currentDeploymentId) {
        throw new Error('SaaS state backend: no deployment available, call loadState() first');
      }

      // Acquire lock via phase:start (server checks for 409 conflicts)
      await client.patch(`/api/v1/deployments/${currentDeploymentId}`, { phase: 'start' });

      try {
        const result = await fn();
        // Complete with success
        await client.patch(`/api/v1/deployments/${currentDeploymentId}`, {
          phase: 'complete',
          result,
        });
        return result;
      } catch (err) {
        // Fail with error
        try {
          await client.patch(`/api/v1/deployments/${currentDeploymentId}`, {
            phase: 'fail',
            error: { message: err instanceof Error ? err.message : String(err) },
          });
        } catch {
          // Best-effort fail notification
        }
        throw err;
      }
    },
  };
};

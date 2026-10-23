import { ProviderEnum } from '../../common/providerEnum';

/**
 * Runtimes the shared local worker can actually execute, keyed by provider.
 *
 * Entries use the runtime identifiers an IAC declares: the standard runtimes of
 * src/common/runtimeMapper.ts for Tencent, the veFaaS runtime ids for Volcengine.
 * This is a local execution capability list, not the deploy-time support list —
 * the local worker runs the installed Node.js, so other languages, custom
 * runtimes and container images cannot be simulated. Keep it in step with the
 * provider's Node.js runtime set when that changes.
 */
const LOCAL_NODE_RUNTIMES: Partial<Record<ProviderEnum, ReadonlyArray<string>>> = {
  [ProviderEnum.TENCENT]: ['nodejs10', 'nodejs12', 'nodejs14', 'nodejs16', 'nodejs18'],
  [ProviderEnum.VOLCENGINE]: ['node14/v1', 'node20/v1'],
};

export const localNodeRuntimes = (provider: ProviderEnum): ReadonlyArray<string> =>
  LOCAL_NODE_RUNTIMES[provider] ?? [];

export const isLocalNodeRuntime = (provider: ProviderEnum, runtime: string): boolean =>
  localNodeRuntimes(provider).includes(runtime);

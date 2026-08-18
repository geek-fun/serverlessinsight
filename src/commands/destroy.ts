import { getContext, getIacLocation, logger, setContext, setIac, ProviderEnum } from '../common';
import { createStateBackend } from '../common/stateBackend';
import { parseYaml, revalYaml } from '../parser';
import { lang } from '../lang';
import { destroyTencentStack } from '../stack/scfStack';
import { destroyAliyunStack } from '../stack/aliyunStack';
import { destroyVolcengineStack } from '../stack/volcengineStack';

export const destroyStack = async (options: {
  location: string;
  region?: string;
  provider?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
  stage?: string;
}) => {
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  await setContext(
    {
      ...options,
      app: rawIac.app,
      service: rawIac.service,
      iacProvider: rawIac.provider,
      stages: rawIac.stages,
    },
    true,
  );
  const context = getContext();
  const iac = revalYaml(iacLocation, context);

  // Store IAC in context for access by all functions
  setIac(iac);

  logger.info(
    lang.__('DESTROYING_STACK', {
      provider: context.provider,
      region: context.region,
    }),
  );

  const backend = createStateBackend(iac.backend, context);

  // Release the active lock on SIGINT/SIGTERM so Ctrl+C doesn't leave a stale
  // lock behind. Best-effort: the local backend release is synchronous (unlink)
  // and completes before exit; remote backends may be cut short, and their lock
  // is then recovered via the stale/dead-PID detection path.
  const activeSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  const signalHandlers = new Map<NodeJS.Signals, () => void>();
  let currentLockId: string | null = null;
  let released = false;

  const releaseOnSignal = (): void => {
    if (released) return;
    released = true;
    if (currentLockId) {
      void backend.releaseLock(currentLockId).catch(() => {
        // best-effort release — ignore failures on the exit path
      });
    }
    process.exit(130);
  };

  for (const sig of activeSignals) {
    const handler = (): void => releaseOnSignal();
    process.on(sig, handler);
    signalHandlers.set(sig, handler);
  }

  try {
    await backend.withLock(
      'destroy',
      async () => {
        if (iac.provider.name === ProviderEnum.TENCENT) {
          await destroyTencentStack(backend);
        } else if (iac.provider.name === ProviderEnum.ALIYUN) {
          await destroyAliyunStack(backend);
        } else if (iac.provider.name === ProviderEnum.VOLCENGINE) {
          await destroyVolcengineStack(backend);
        } else {
          throw new Error(`Unsupported provider: ${iac.provider.name}`);
        }
      },
      {},
      (lockId) => {
        currentLockId = lockId;
      },
    );
  } finally {
    for (const [sig, handler] of signalHandlers) {
      process.removeListener(sig, handler);
    }
    signalHandlers.clear();
  }
};

import * as readline from 'node:readline';
import crypto from 'node:crypto';
import { deployStack } from '../stack';
import { getContext, getIacLocation, logger, setContext, setIac, ProviderEnum } from '../common';
import { createStateBackend } from '../common/stateBackend';
import { parseYaml, revalYaml } from '../parser';
import { generateTencentPlan, displayPlan } from '../stack/scfStack';
import { generateAliyunPlan } from '../stack/aliyunStack';
import { generateVolcenginePlan } from '../stack/volcengineStack';
import { lang } from '../lang';

const askConfirmation = async (): Promise<boolean> => {
  if (!process.stdin.isTTY) {
    throw new Error(
      'Interactive confirmation required but stdin is not a TTY. ' +
        'Use --auto-approve (-y) to skip confirmation in non-interactive environments.',
    );
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(lang.__('DEPLOY_CONFIRMATION'), (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
    });
  });
};

export const deploy = async (options: {
  location: string;
  parameters?: { [key: string]: string };
  stage?: string;
  region?: string;
  provider?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
  autoApprove?: boolean;
  siApiKey?: string;
}) => {
  logger.info(lang.__('VALIDATING_YAML'));
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  logger.info(lang.__('YAML_VALID'));

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

  setIac(iac);

  const backend = createStateBackend(iac.backend, { ...context, siApiKey: options.siApiKey });

  // ADR-005: wire the backend's event reporter into the global context so
  // executors can emit per-resource deployment events via context.reportEvent.
  if (backend.reportEvent) {
    context.reportEvent = backend.reportEvent;
  }

  logger.info(lang.__('GENERATING_PLAN'));
  let planResult;
  if (iac.provider.name === ProviderEnum.TENCENT) {
    planResult = await generateTencentPlan(iac, backend);
  } else if (iac.provider.name === ProviderEnum.ALIYUN) {
    planResult = await generateAliyunPlan(iac, backend);
  } else if (iac.provider.name === ProviderEnum.VOLCENGINE) {
    planResult = await generateVolcenginePlan(iac, backend);
  } else {
    throw new Error(lang.__('PLAN_COMMAND_NOT_SUPPORTED'));
  }

  displayPlan(planResult);

  if (planResult.items.some((item) => item.action !== 'noop')) {
    if (!options.autoApprove) {
      const confirmed = await askConfirmation();
      if (!confirmed) {
        logger.info(lang.__('DEPLOY_CANCELLED'));
        return;
      }
    }
  }

  logger.info(lang.__('DEPLOYING_STACK'));
  logger.info(lang.__('ACQUIRING_LOCK'));

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
    // ADR-005: drain any buffered deployment events before exiting so the
    // console timeline is as complete as possible even on Ctrl+C.
    const flushPromise = backend.flushEvents?.();
    if (flushPromise) {
      void flushPromise.finally(() => process.exit(130));
    } else {
      process.exit(130);
    }
  };

  for (const sig of activeSignals) {
    const handler = (): void => releaseOnSignal();
    process.on(sig, handler);
    signalHandlers.set(sig, handler);
  }

  // ADR-005: replay event-queue files orphaned by a previous interrupted run.
  await backend.replayOrphanedEvents?.();

  try {
    await backend.withLock(
      'deploy',
      async () => {
        try {
          await deployStack(iac, backend);
        } catch (err) {
          // The deployment FAILED, but the console still needs the plan
          // (what we attempted) + the partial state (what succeeded) to render
          // a meaningful Changes / State JSON / error view. Attach them to the
          // error; withLock's fail branch forwards them.
          const failure = err as Error & {
            plan?: { items: Array<unknown> };
            stateJson?: Record<string, unknown>;
          };
          try {
            const partialState = await backend.loadState(
              iac.provider.name,
              iac.app,
              iac.service,
              options.stage ?? 'dev',
            );
            failure.stateJson = partialState ?? {};
          } catch {
            // state may be unreadable mid-failure — plan alone is still useful
          }
          failure.plan = { items: planResult.items };
          throw failure;
        }
        // Read back the final state so the deployment record can link it
        // (console shows Changes + State JSON from the plan and state).
        const finalState = await backend.loadState(
          iac.provider.name,
          iac.app,
          iac.service,
          options.stage ?? 'dev',
        );
        return {
          plan: { items: planResult.items },
          stateJson: finalState ?? {},
          contentHash: crypto
            .createHash('sha256')
            .update(JSON.stringify(finalState ?? {}))
            .digest('hex'),
          resourceCount: Object.keys(finalState?.resources ?? {}).length,
        };
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

  logger.info(lang.__('STACK_DEPLOYED'));
};

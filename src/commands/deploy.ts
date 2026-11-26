import { redactPlanItems } from '../common/planRedaction';
import {
  isRedactedEnvValue,
  readEnvironment,
  RUNTIME_TOKEN_PRESERVE,
} from '../common/envRedaction';
import * as readline from 'node:readline';
import crypto from 'node:crypto';
import { deployStack } from '../stack';
import {
  getContext,
  getIacLocation,
  logger,
  setContext,
  setIac,
  ProviderEnum,
  toPersistedState,
} from '../common';
import { PlanItem, ServerlessIac, StateBackendType } from '../types';
import { createStateBackend, type StateBackend } from '../common/stateBackend';
import {
  beginConfigSession,
  endConfigSession,
  collectConfigRefs,
  applyConfigResolution,
  setAppliedConfigMeta,
  registerRuntimeSecret,
} from '../common/configSession';
import { resolveConfigRefsViaSaas } from '../common/configClient';
import { parseYaml, revalYaml } from '../parser';
import { generateTencentPlan, displayPlan } from '../stack/scfStack';
import { generateAliyunPlan } from '../stack/aliyunStack';
import { generateVolcenginePlan } from '../stack/volcengineStack';
import { lang } from '../lang';

const reconcileRuntimeConfigTokens = async (
  iac: ServerlessIac,
  planItems: PlanItem[],
  backend: StateBackend,
): Promise<PlanItem[]> => {
  const functions = iac.functions ?? [];
  if (functions.length === 0 || !backend.issueRuntimeConfigToken) {
    return planItems;
  }
  if (!planItems.some((item) => item.action !== 'noop')) {
    return planItems;
  }

  const liveTokens = new Map<string, string>();
  let needsIssuance = false;

  for (const fn of functions) {
    const planItem = planItems.find((item) => item.logicalId === `functions.${fn.key}`);
    if (planItem?.action === 'noop') continue;
    const liveToken = readEnvironment(planItem?.changes?.before?.environment)?.SI_CONFIG_TOKEN;
    if (typeof liveToken === 'string' && liveToken.length > 0 && !isRedactedEnvValue(liveToken)) {
      liveTokens.set(fn.key, liveToken);
    } else {
      needsIssuance = true;
    }
  }

  if (needsIssuance) {
    const runtimeConfig = await backend.issueRuntimeConfigToken();
    registerRuntimeSecret(runtimeConfig.token);
    for (const fn of functions) {
      fn.environment = {
        ...(fn.environment ?? {}),
        SI_CONFIG_TOKEN: runtimeConfig.token,
        SI_CONSOLE_URL: runtimeConfig.consoleUrl,
      };
    }
    setIac(iac);
    logger.info(lang.__('CONFIG_RUNTIME_TOKEN_INJECTED'));
    // Rotating the service+stage runtime key revokes the previous sirt_ key,
    // so any unchanged sibling function must also receive the new token.
    return planItems.map((item) =>
      item.logicalId?.startsWith('functions.') && item.action === 'noop'
        ? { ...item, action: 'update' as const }
        : item,
    );
  }

  for (const fn of functions) {
    const liveToken = liveTokens.get(fn.key);
    if (!liveToken) continue;
    registerRuntimeSecret(liveToken);
    fn.environment = {
      ...(fn.environment ?? {}),
      SI_CONFIG_TOKEN: liveToken,
      ...(backend.consoleUrl ? { SI_CONSOLE_URL: backend.consoleUrl } : {}),
    };
  }
  setIac(iac);
  return planItems;
};

const askConfirmation = async (): Promise<boolean> => {
  if (!process.stdin.isTTY) {
    throw new Error(lang.__('CONFIRMATION_STDIN_NOT_TTY'));
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
  bindUnknownRegion?: string;
  provider?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
  autoApprove?: boolean;
  siApiKey?: string;
  org?: string;
  line?: string;
  refresh?: boolean;
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
      refresh: options.refresh ?? true,
    },
    true,
  );

  const context = getContext();

  // Epic #53 P1: config-set references resolve in a two-pass evaluation —
  // calcValue swaps sentinels, the batch resolve fills values, and
  // applyConfigResolution substitutes them (failing closed on missing refs).
  const configRefs = collectConfigRefs(rawIac, context.stage);
  let iac: ServerlessIac;
  const session = beginConfigSession();
  try {
    if (configRefs.length > 0) {
      if (rawIac.backend?.type !== StateBackendType.SAAS) {
        throw new Error(lang.__('CONFIG_RESOLVE_REQUIRES_SAAS'));
      }
      logger.info(lang.__('CONFIG_RESOLVING_REFS', { count: String(configRefs.length) }));
      const resolved = await resolveConfigRefsViaSaas(configRefs, {
        stage: context.stage,
        app: rawIac.app,
        service: rawIac.service,
        provider: context.provider,
        region: context.region,
        siApiKey: options.siApiKey,
        declaredOrg: rawIac.org,
        org: options.org,
        line: options.line,
      });
      for (const [ref, value] of resolved) {
        session.resolved.set(ref, value);
      }
    }

    iac = revalYaml(iacLocation, context);
    // Applied meta (functionEnvRefs/databasePasswordRefs/secretValues) is stored
    // module-level for the sanitization pipeline (envRedaction/planRedaction).
    applyConfigResolution(iac);
  } finally {
    endConfigSession();
  }
  if (configRefs.length > 0) {
    logger.info(lang.__('CONFIG_REFS_RESOLVED', { count: String(configRefs.length) }));
  }

  try {
    setIac(iac);

    // D-4: deploy mutates state — a migrated (managedBy=saas) legacy state must
    // fail closed here and route the user to the Console backend.
    const backend = await createStateBackend(iac.backend, {
      ...context,
      declaredOrg: iac.org,
      siApiKey: options.siApiKey,
      org: options.org,
      line: options.line,
      migrationMarker: 'refuse',
    });

    await backend.upgradeLegacyState?.({ bindUnknownRegion: options.bindUnknownRegion });

    const readiness = await backend.probeWriteReadiness();
    if (!readiness.ready) {
      throw new Error(readiness.reason ?? lang.__('STATE_WRITE_NOT_READY'));
    }

    // ADR-005: wire the backend's event reporter into the global context so
    // executors can emit per-resource deployment events via context.reportEvent.
    if (backend.reportEvent) {
      context.reportEvent = backend.reportEvent;
    }

    // Epic #53 P2: declare SI_CONFIG_TOKEN / SI_CONSOLE_URL before planning
    // using the non-rotating preserve sentinel so:
    // - cancelled or noop deploys never rotate a live production runtime key;
    // - missing cloud tokens surface as drift;
    // - actual issuance/preservation happens post-approval inside withLock.
    if (configRefs.length > 0 && backend.issueRuntimeConfigToken) {
      for (const fn of iac.functions ?? []) {
        fn.environment = {
          ...(fn.environment ?? {}),
          SI_CONFIG_TOKEN: RUNTIME_TOKEN_PRESERVE,
          ...(backend.consoleUrl ? { SI_CONSOLE_URL: backend.consoleUrl } : {}),
        };
      }
      setIac(iac);
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
    const publishedPlan = { items: redactPlanItems(planResult.items) };

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
            const effectiveItems =
              configRefs.length > 0
                ? await reconcileRuntimeConfigTokens(iac, planResult.items, backend)
                : planResult.items;
            // Issue #246: execute exactly the plan that was displayed and
            // approved above — no second plan computation mid-deploy.
            await deployStack(iac, backend, { items: effectiveItems });
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
              const partialState = await backend.loadState();
              failure.stateJson = partialState ? toPersistedState(partialState) : {};
            } catch {
              // state may be unreadable mid-failure — plan alone is still useful
            }
            failure.plan = publishedPlan;
            throw failure;
          }
          // Read back the final state so the deployment record can link it
          // (console shows Changes + State JSON from the plan and state).
          const finalState = await backend.loadState();
          const stateJson = finalState ? toPersistedState(finalState) : {};
          return {
            plan: publishedPlan,
            stateJson,
            contentHash: crypto
              .createHash('sha256')
              .update(JSON.stringify(stateJson))
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
  } finally {
    setAppliedConfigMeta(null);
  }
};

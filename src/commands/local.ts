import { getIacLocation, logger, setContext, setIac, getContext } from '../common';
import { StateBackendType } from '../types';
import {
  beginConfigSession,
  endConfigSession,
  collectConfigRefs,
  applyConfigResolution,
} from '../common/configSession';
import { resolveConfigRefsViaSaas } from '../common/configClient';
import { writeLocalConfigSnapshot } from './config';
import { startLocalStack } from '../stack/localStack';
import { parseYaml, revalYaml } from '../parser';
import { lang } from '../lang';

export type RunLocalOptions = {
  stage: string;
  debug: boolean;
  watch: boolean;
  location: string | undefined;
  provider?: string;
  region?: string;
  strictPrefix?: boolean;
};

export const runLocal = async (opts: RunLocalOptions) => {
  const { stage, debug, watch, location, provider, region, strictPrefix } = opts;

  const iacLocation = getIacLocation(location);
  const rawIac = parseYaml(iacLocation);
  await setContext({
    stage,
    app: rawIac.app,
    service: rawIac.service,
    location,
    provider,
    region,
    iacProvider: rawIac.provider,
    stages: rawIac.stages,
  });
  const ctx = getContext();

  // Epic #53 P1/P2: resolve config-set refs for local runs and write the
  // merged snapshot the runtime SDK reads in local mode. Without SaaS
  // credentials the run keeps the raw templates and says so — local stays
  // offline-capable.
  const configRefs = collectConfigRefs(rawIac);
  const session = beginConfigSession();
  let resolvedLocally = false;
  if (configRefs.length > 0 && rawIac.backend?.type === StateBackendType.SAAS) {
    try {
      const resolved = await resolveConfigRefsViaSaas(configRefs, {
        stage,
        declaredOrg: rawIac.org,
      });
      for (const [ref, value] of resolved) {
        session.resolved.set(ref, value);
      }
      resolvedLocally = true;
    } catch (error) {
      logger.warn(
        lang.__('CONFIG_LOCAL_RESOLVE_FAILED', {
          reason: error instanceof Error ? error.message : String(error),
        }),
      );
    }
  }

  const evaluatedIac = revalYaml(iacLocation, ctx);
  // Applied meta is stored module-level for the sanitization pipeline.
  applyConfigResolution(evaluatedIac);
  endConfigSession();
  const iac = {
    ...evaluatedIac,
    provider: { ...evaluatedIac.provider, name: ctx.provider, region: ctx.region },
  };

  // Store IAC in context for access by all functions
  setIac(iac);

  if (resolvedLocally) {
    const entries = [...session.resolved.entries()].map(([ref, resolved]) => ({
      key: ref,
      value: resolved.value,
      secret: resolved.secret,
      source: {
        name: resolved.configSet,
        versionNumber: resolved.versionNumber,
        scope: resolved.scope,
      },
    }));
    const snapshot = {
      stage,
      snapshotVersion: Math.max(0, ...[...session.resolved.values()].map((v) => v.versionNumber)),
      entries,
    };
    const file = await writeLocalConfigSnapshot(snapshot);
    logger.info(lang.__('CONFIG_LOCAL_SNAPSHOT_WRITTEN', { file, count: String(entries.length) }));
  }

  logger.info(
    lang.__('RUN_LOCAL_STARTING', {
      stage,
      debug: String(debug),
      watch: String(watch),
      strictPrefix: String(!!strictPrefix),
    }),
  );

  await startLocalStack(iac, { strictPrefix: !!strictPrefix, stage });
};

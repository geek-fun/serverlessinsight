import { getIacLocation, logger, setContext, setIac, getContext } from '../common';
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
};

export const runLocal = async (opts: RunLocalOptions) => {
  const { stage, debug, watch, location, provider, region } = opts;

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

  const evaluatedIac = revalYaml(iacLocation, ctx);
  const iac = {
    ...evaluatedIac,
    provider: { ...evaluatedIac.provider, name: ctx.provider, region: ctx.region },
  };

  // Store IAC in context for access by all functions
  setIac(iac);

  logger.info(
    lang.__('RUN_LOCAL_STARTING', {
      stage,
      debug: String(debug),
      watch: String(watch),
    }),
  );

  await startLocalStack(iac);
};

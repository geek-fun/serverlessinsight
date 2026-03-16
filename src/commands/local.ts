import { getIacLocation, logger, setContext, setIac, getContext } from '../common';
import { startLocalStack } from '../stack/localStack';
import { parseYaml, revalYaml } from '../parser';
import { lang } from '../lang';

export type RunLocalOptions = {
  stage: string;
  port: number;
  debug: boolean;
  watch: boolean;
  location: string | undefined;
};

export const runLocal = async (opts: RunLocalOptions) => {
  const { stage, port, debug, watch, location } = opts;

  const iacLocation = getIacLocation(location);
  const rawIac = parseYaml(iacLocation);
  await setContext({ stage, app: rawIac.app, service: rawIac.service, location });
  const ctx = getContext();

  const iac = revalYaml(iacLocation, ctx);

  // Store IAC in context for access by all functions
  setIac(iac);

  logger.info(
    lang.__('RUN_LOCAL_STARTING', {
      stage,
      port: String(port),
      debug: String(debug),
      watch: String(watch),
    }),
  );

  await startLocalStack(iac);
};

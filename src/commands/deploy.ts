import { deployStack } from '../stack';
import { getContext, getIacLocation, logger, setContext, setIac } from '../common';
import { createStateBackend } from '../common/stateBackend';
import { parseYaml, revalYaml } from '../parser';
import { lang } from '../lang';

export const deploy = async (
  stackName: string,
  options: {
    location: string;
    parameters?: { [key: string]: string };
    stage?: string;
    region?: string;
    provider?: string;
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
  },
) => {
  logger.info(lang.__('VALIDATING_YAML'));
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  logger.info(lang.__('YAML_VALID'));

  await setContext(
    { ...options, stackName, iacProvider: rawIac.provider, stages: rawIac.stages },
    true,
  );

  const context = getContext();
  const iac = revalYaml(iacLocation, context);

  // Store IAC in context for access by all functions
  setIac(iac);

  logger.info(lang.__('DEPLOYING_STACK'));

  const backend = createStateBackend(iac.backend, context);
  await backend.withLock('deploy', async () => {
    await deployStack(stackName, iac, backend);
  });

  logger.info(lang.__('STACK_DEPLOYED'));
};

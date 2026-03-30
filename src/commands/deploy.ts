import * as readline from 'node:readline';
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

  const backend = createStateBackend(iac.backend, context);

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
  await backend.withLock('deploy', async () => {
    await deployStack(iac, backend);
  });

  logger.info(lang.__('STACK_DEPLOYED'));
};

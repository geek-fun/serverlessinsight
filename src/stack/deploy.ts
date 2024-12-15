import * as ros from '@alicloud/ros-cdk-core';

import { ActionContext, ServerlessIac } from '../types';
import { logger, Provider, rfsStackDeploy, rosStackDeploy } from '../common';
import { RosStack } from './rosStack';
import { RfsStack } from './rfsStack';

export const generateRosStackTemplate = (
  stackName: string,
  iac: ServerlessIac,
  context: ActionContext,
) => {
  const app = new ros.App();
  new RosStack(app, iac, context);

  const assembly = app.synth();
  const stackArtifact = assembly.getStackByName(stackName);

  return { template: stackArtifact.template };
};

export const generateRfsStackTemplate = (
  stackName: string,
  iac: ServerlessIac,
  context: ActionContext,
) => {
  const stack = new RfsStack(iac, context);

  const hcl = stack.toHclTerraform();
  console.log('HCL:', hcl);

  return { template: hcl };
};

export const deployStack = async (
  stackName: string,
  iac: ServerlessIac,
  context: ActionContext,
) => {
  const { template } = generateRosStackTemplate(stackName, iac, context);
  if (iac.provider === Provider.ALIYUN) {
    await rosStackDeploy(stackName, template, context);
  } else if (iac.provider === Provider.HUAWEI) {
    await rfsStackDeploy(stackName, template);
  }

  logger.info(`Stack deployed! 🎉`);
};

export const generateStackTemplate = (
  stackName: string,
  iac: ServerlessIac,
  context: ActionContext,
): { template: unknown } => {
  if (iac.provider === Provider.ALIYUN) {
    return generateRosStackTemplate(stackName, iac, context);
  } else if (iac.provider === Provider.HUAWEI) {
    return generateRfsStackTemplate(stackName, iac, context);
  }
  return { template: '' };
};

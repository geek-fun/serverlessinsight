import * as ros from '@alicloud/ros-cdk-core';
import { ActionContext, ServerlessIac } from '../types';
import { logger, rosStackDeploy } from '../common';
import { RosStack } from './rosStack/rosStack';

export const generateStackTemplate = (
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

export const deployStack = async (
  stackName: string,
  iac: ServerlessIac,
  context: ActionContext,
) => {
  const { template } = generateStackTemplate(stackName, iac, context);

  await rosStackDeploy(stackName, template, context);
  logger.info(`Stack deployed! 🎉`);
};

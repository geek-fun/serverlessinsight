import * as ros from '@alicloud/ros-cdk-core';
import { ActionContext, ServerlessIac } from '../types';
import { printer, rosStackDeploy } from '../common';
import { IacStack } from './iacStack';

const generateStackTemplate = (stackName: string, iac: ServerlessIac, context: ActionContext) => {
  const app = new ros.App();
  new IacStack(app, iac, context);

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
  console.log('Generated ROS YAML:', JSON.stringify({ template }));
  await rosStackDeploy(stackName, template, context);
  printer.info(`Stack deployed! 🎉`);
};

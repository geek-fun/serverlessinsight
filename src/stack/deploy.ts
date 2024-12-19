import * as ros from '@alicloud/ros-cdk-core';
import fs from 'node:fs';

import { ActionContext, ServerlessIac } from '../types';
import { logger, ProviderEnum, publishAssets, rosStackDeploy } from '../common';
import { RosStack } from './rosStack';
import { RfsStack } from './rfsStack';
import { get } from 'lodash';

export const generateRosStackTemplate = (
  stackName: string,
  iac: ServerlessIac,
  context: ActionContext,
) => {
  const app = new ros.App();
  new RosStack(app, iac, context);

  const assembly = app.synth();

  const { template } = assembly.getStackByName(stackName);

  const assetFolderPath = get(assembly.tryGetArtifact(`${stackName}.assets`), 'file', '');
  const assetsFileBody = fs.readFileSync(assetFolderPath);
  const assets = {
    rootPath: assembly.directory,
    ...JSON.parse(assetsFileBody.toString('utf-8').trim()),
  };

  return { template, assets };
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
  const { template, assets } = generateRosStackTemplate(stackName, iac, context);
  logger.info(`Deploying stack, publishing assets...`);
  await publishAssets(assets, context);
  logger.info(`Assets published! 🎉`);
  await rosStackDeploy(stackName, template, context);
  logger.info(`Stack deployed! 🎉`);
};

export const generateStackTemplate = (
  stackName: string,
  iac: ServerlessIac,
  context: ActionContext,
): { template: unknown } => {
  if (iac.provider.name === ProviderEnum.ALIYUN) {
    return generateRosStackTemplate(stackName, iac, context);
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    return generateRfsStackTemplate(stackName, iac, context);
  }
  return { template: '' };
};

import * as ros from '@alicloud/ros-cdk-core';
import fs from 'node:fs';

import { ServerlessIac } from '../types';
import {
  cleanupAssets,
  constructAssets,
  getContext,
  logger,
  ProviderEnum,
  publishAssets,
  rosStackDeploy,
} from '../common';
import { prepareBootstrapStack, RosStack } from './rosStack';
import { RfsStack } from './rfsStack';
import { get } from 'lodash';

export const generateRosStackTemplate = (stackName: string, iac: ServerlessIac) => {
  const context = getContext();
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

export const generateRfsStackTemplate = (stackName: string, iac: ServerlessIac) => {
  const stack = new RfsStack(iac);

  const hcl = stack.toHclTerraform();
  console.log('HCL:', hcl);

  return { template: hcl };
};

export const deployStack = async (stackName: string, iac: ServerlessIac) => {
  const { template, assets } = generateRosStackTemplate(stackName, iac);
  await prepareBootstrapStack();
  logger.info(`Deploying stack, publishing assets...`);
  const constructedAssets = await constructAssets(assets);
  try {
    await publishAssets(constructedAssets);
    logger.info(`Assets published! 🎉`);
    await rosStackDeploy(stackName, template);
  } catch (e) {
    logger.error(`Failed to deploy stack: ${e}`);
    throw e;
  } finally {
    try {
      logger.info(`Cleaning up temporary Assets...`);
      await cleanupAssets(constructedAssets);
      logger.info(`Assets cleaned up!♻️`);
    } catch (e) {
      logger.error(
        `Failed to cleanup assets, it wont affect the deployment result, but to avoid potential cost, you can delete the temporary bucket : ${constructedAssets?.[0].bucketName}, error details:${e}`,
      );
    }
  }
};

export const generateStackTemplate = (
  stackName: string,
  iac: ServerlessIac,
): { template: unknown } => {
  if (iac.provider.name === ProviderEnum.ALIYUN) {
    return generateRosStackTemplate(stackName, iac);
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    return generateRfsStackTemplate(stackName, iac);
  }
  return { template: '' };
};

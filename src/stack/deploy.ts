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
import { lang } from '../lang';

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
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));
  const constructedAssets = await constructAssets(assets);
  try {
    await publishAssets(constructedAssets);
    logger.info(lang.__('ASSETS_PUBLISHED'));
    await rosStackDeploy(stackName, template);
  } catch (e) {
    logger.error(lang.__('FAILED_TO_DEPLOY_STACK', { error: String(e) }));
    throw e;
  } finally {
    try {
      logger.info(lang.__('CLEANING_UP_TEMPORARY_ASSETS'));
      await cleanupAssets(constructedAssets);
      logger.info(lang.__('ASSETS_CLEANED_UP'));
    } catch (e) {
      logger.error(
        lang.__('FAILED_TO_CLEANUP_ASSETS', {
          bucketName: String(constructedAssets?.[0].bucketName),
          error: String(e),
        }),
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

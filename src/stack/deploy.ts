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
  loadState,
  saveState,
} from '../common';
import { prepareBootstrapStack, RosStack } from './rosStack';
import { RfsStack } from './rfsStack';
import {
  generatePlan,
  executePlan,
  generateBucketPlan,
  executeBucketPlan,
  generateDatabasePlan,
  executeDatabasePlan,
} from './scfStack';
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

const deployTencent = async (iac: ServerlessIac): Promise<void> => {
  const context = getContext();
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));

  // Load current state
  let state = loadState(iac.provider.name, process.cwd());

  // Generate plan for functions
  logger.info(lang.__('GENERATING_PLAN'));
  const functionPlan = await generatePlan(context, state, iac.functions);

  // Generate plan for buckets
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);

  // Generate plan for databases
  const databasePlan = await generateDatabasePlan(context, state, iac.databases);

  // Combine plans
  const combinedPlan = {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items],
  };

  // Log plan
  logger.info(`${lang.__('PLAN_GENERATED')}: ${combinedPlan.items.length} ${lang.__('ACTIONS')}`);
  for (const item of combinedPlan.items) {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  }

  // Execute function plan
  logger.info(lang.__('EXECUTING_PLAN'));
  state = await executePlan(context, functionPlan, iac.functions, state);

  // Execute bucket plan
  state = await executeBucketPlan(context, bucketPlan, iac.buckets, state);

  // Execute database plan
  state = await executeDatabasePlan(context, databasePlan, iac.databases, state);

  // Save state
  saveState(state, process.cwd());

  logger.info(lang.__('STACK_DEPLOYED'));
};

const deployAliyun = async (stackName: string, iac: ServerlessIac): Promise<void> => {
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

const deployHuawei = async (stackName: string, iac: ServerlessIac): Promise<void> => {
  // For now, Huawei uses the same approach as Aliyun but with different stack
  const { template } = generateRfsStackTemplate(stackName, iac);
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));
  // TODO: Implement Huawei-specific deployment logic
  console.log('HCL:', template);
  logger.info(lang.__('STACK_DEPLOYED'));
};

export const deployStack = async (stackName: string, iac: ServerlessIac) => {
  if (iac.provider.name === ProviderEnum.TENCENT) {
    await deployTencent(iac);
  } else if (iac.provider.name === ProviderEnum.ALIYUN) {
    await deployAliyun(stackName, iac);
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    await deployHuawei(stackName, iac);
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
  } else if (iac.provider.name === ProviderEnum.TENCENT) {
    // Tencent uses state-based deployment, no template generation needed
    return { template: {} };
  }
  return { template: '' };
};

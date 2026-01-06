import * as ros from '@alicloud/ros-cdk-core';
import fs from 'node:fs';

import { ServerlessIac } from '../types';
import { getContext, logger, ProviderEnum, loadState, saveState } from '../common';
import { RosStack } from './rosStack';
import { RfsStack } from './rfsStack';
import {
  generateFunctionPlan,
  executeFunctionPlan,
  generateBucketPlan,
  executeBucketPlan,
  generateDatabasePlan,
  executeDatabasePlan,
} from './scfStack';
import {
  generateFunctionPlan as generateAliyunFunctionPlan,
  executeFunctionPlan as executeAliyunFunctionPlan,
  generateBucketPlan as generateAliyunBucketPlan,
  executeBucketPlan as executeAliyunBucketPlan,
  generateDatabasePlan as generateAliyunDatabasePlan,
  executeDatabasePlan as executeAliyunDatabasePlan,
  generateTablePlan,
  executeTablePlan,
} from './aliyunStack';
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
  const functionPlan = await generateFunctionPlan(context, state, iac.functions);

  // Generate plan for buckets
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);

  // Generate plan for databases
  const databasePlan = await generateDatabasePlan(context, state, iac.databases);

  // Combine plans
  const combinedPlan = {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items],
  };

  logger.info(`${lang.__('PLAN_GENERATED')}: ${combinedPlan.items.length} ${lang.__('ACTIONS')}`);
  combinedPlan.items.forEach((item) => {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  });

  logger.info(lang.__('EXECUTING_PLAN'));
  state = await executeFunctionPlan(context, functionPlan, iac.functions, state);

  state = await executeBucketPlan(context, bucketPlan, iac.buckets, state);

  state = await executeDatabasePlan(context, databasePlan, iac.databases, state);

  saveState(state, process.cwd());

  logger.info(lang.__('STACK_DEPLOYED'));
};

const deployAliyun = async (iac: ServerlessIac): Promise<void> => {
  const context = getContext();
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));

  let state = loadState(iac.provider.name, process.cwd());

  logger.info(lang.__('GENERATING_PLAN'));
  const functionPlan = await generateAliyunFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateAliyunBucketPlan(context, state, iac.buckets);
  const databasePlan = await generateAliyunDatabasePlan(context, state, iac.databases);
  const tablePlan = await generateTablePlan(context, state, iac.tables);

  // Combine plans
  const combinedPlan = {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items, ...tablePlan.items],
  };

  logger.info(`${lang.__('PLAN_GENERATED')}: ${combinedPlan.items.length} ${lang.__('ACTIONS')}`);
  combinedPlan.items.forEach((item) => {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  });

  logger.info(lang.__('EXECUTING_PLAN'));
  state = await executeAliyunFunctionPlan(context, functionPlan, iac.functions, state);
  state = await executeAliyunBucketPlan(context, bucketPlan, iac.buckets, state);
  state = await executeAliyunDatabasePlan(context, databasePlan, iac.databases, state);
  state = await executeTablePlan(context, tablePlan, iac.tables, state);

  saveState(state, process.cwd());

  logger.info(lang.__('STACK_DEPLOYED'));
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
    await deployAliyun(iac);
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    await deployHuawei(stackName, iac);
  }
};

export const generateStackTemplate = (
  stackName: string,
  iac: ServerlessIac,
): { template: unknown } => {
  if (iac.provider.name === ProviderEnum.ALIYUN) {
    // Aliyun now uses state-based deployment, no template generation needed
    return { template: {} };
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    return generateRfsStackTemplate(stackName, iac);
  } else if (iac.provider.name === ProviderEnum.TENCENT) {
    // Tencent uses state-based deployment, no template generation needed
    return { template: {} };
  }
  return { template: '' };
};

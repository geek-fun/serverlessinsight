import { ServerlessIac } from '../../types';
import { getContext, loadState } from '../../common';
import { generateFunctionPlan } from './fc3Planner';
import { generateBucketPlan } from './ossPlanner';
import { generateDatabasePlan } from './databasePlanner';
import { generateTablePlan } from './tablestorePlanner';

export const generateAliyunPlan = async (iac: ServerlessIac) => {
  const context = getContext();
  const state = loadState(iac.provider.name, process.cwd());

  const functionPlan = await generateFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);
  const databasePlan = await generateDatabasePlan(context, state, iac.databases);
  const tablePlan = await generateTablePlan(context, state, iac.tables);

  return {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items, ...tablePlan.items],
  };
};

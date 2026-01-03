import { Context, BucketDomain, Plan, StateFile } from '../../types';
import { createBucketResource, deleteBucketResource, updateBucketResource } from './cosResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';

export const executeBucketPlan = async (
  context: Context,
  plan: Plan,
  buckets: Array<BucketDomain> | undefined,
  initialState: StateFile,
): Promise<StateFile> => {
  const bucketsMap = new Map<string, BucketDomain>();
  let currentState = initialState;

  if (buckets) {
    for (const bucket of buckets) {
      bucketsMap.set(`buckets.${bucket.key}`, bucket);
    }
  }

  for (const item of plan.items) {
    if (item.action === 'noop') {
      logger.info(`No changes for ${item.logicalId}`);
      continue;
    }

    try {
      switch (item.action) {
        case 'create': {
          const bucket = bucketsMap.get(item.logicalId);
          if (!bucket) {
            throw new Error(`Bucket not found for logical ID: ${item.logicalId}`);
          }
          logger.info(`Creating bucket: ${bucket.name}`);
          currentState = await createBucketResource(context, bucket, currentState);
          logger.info(`Successfully created bucket: ${bucket.name}`);
          break;
        }

        case 'update': {
          const bucket = bucketsMap.get(item.logicalId);
          if (!bucket) {
            throw new Error(`Bucket not found for logical ID: ${item.logicalId}`);
          }
          logger.info(`Updating bucket: ${bucket.name}`);
          currentState = await updateBucketResource(context, bucket, currentState);
          logger.info(`Successfully updated bucket: ${bucket.name}`);
          break;
        }

        case 'delete': {
          const state = getResource(currentState, item.logicalId);
          if (!state) {
            logger.warn(`State not found for ${item.logicalId}, skipping deletion`);
            continue;
          }
          // Extract bucket name from definition
          const bucketName = state.definition.bucket as string;
          logger.info(`Deleting bucket: ${bucketName}`);
          currentState = await deleteBucketResource(
            context,
            bucketName,
            state.region,
            item.logicalId,
            currentState,
          );
          logger.info(`Successfully deleted bucket: ${bucketName}`);
          break;
        }

        default:
          logger.warn(`Unknown action: ${item.action} for ${item.logicalId}`);
      }
    } catch (error) {
      logger.error(`Failed to execute ${item.action} for ${item.logicalId}: ${error}`);
      throw error;
    }
  }

  return currentState;
};

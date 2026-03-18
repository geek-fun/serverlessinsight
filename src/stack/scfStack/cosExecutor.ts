import {
  Context,
  BucketDomain,
  Plan,
  PlanItem,
  StateFile,
  SaveStateFn,
  ExecutionResult,
} from '../../types';
import { createBucketResource, deleteBucketResource, updateBucketResource } from './cosResource';
import { logger } from '../../common';
import { getResource } from '../../common/stateManager';
import { lang } from '../../lang';

const executeCreateAction = async (
  context: Context,
  bucket: BucketDomain,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(lang.__('CREATING_RESOURCE', { resourceType: 'bucket', name: bucket.name }));
  const newState = await createBucketResource(context, bucket, currentState);
  logger.info(lang.__('RESOURCE_CREATED', { resourceType: 'bucket', name: bucket.name }));
  return newState;
};

const executeUpdateAction = async (
  context: Context,
  bucket: BucketDomain,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(lang.__('UPDATING_RESOURCE', { resourceType: 'bucket', name: bucket.name }));
  const newState = await updateBucketResource(context, bucket, currentState);
  logger.info(lang.__('RESOURCE_UPDATED', { resourceType: 'bucket', name: bucket.name }));
  return newState;
};

const executeDeleteAction = async (
  context: Context,
  bucketName: string,
  region: string,
  logicalId: string,
  currentState: StateFile,
): Promise<StateFile> => {
  logger.info(lang.__('DELETING_RESOURCE', { resourceType: 'bucket', name: bucketName }));
  const newState = await deleteBucketResource(context, bucketName, region, logicalId, currentState);
  logger.info(lang.__('RESOURCE_DELETED', { resourceType: 'bucket', name: bucketName }));
  return newState;
};

const executeSingleItem = async (
  context: Context,
  item: PlanItem,
  bucketsMap: Map<string, BucketDomain>,
  currentState: StateFile,
): Promise<StateFile | null> => {
  switch (item.action) {
    case 'noop':
      logger.info(lang.__('NO_CHANGESForResource', { logicalId: item.logicalId }));
      return null;

    case 'create': {
      const bucket = bucketsMap.get(item.logicalId);
      if (!bucket) {
        throw new Error(`Bucket not found for logical ID: ${item.logicalId}`);
      }
      return executeCreateAction(context, bucket, currentState);
    }

    case 'update': {
      const bucket = bucketsMap.get(item.logicalId);
      if (!bucket) {
        throw new Error(`Bucket not found for logical ID: ${item.logicalId}`);
      }
      return executeUpdateAction(context, bucket, currentState);
    }

    case 'delete': {
      const state = getResource(currentState, item.logicalId);
      if (!state) {
        logger.warn(lang.__('STATE_NOT_FOUND_SKIPPING', { logicalId: item.logicalId }));
        return null;
      }
      const bucketName = state.definition.bucket as string;
      return executeDeleteAction(context, bucketName, state.region, item.logicalId, currentState);
    }

    default:
      logger.warn(
        lang.__('UNKNOWN_ACTION_FOR_RESOURCE', { action: item.action, logicalId: item.logicalId }),
      );
      return null;
  }
};

export const executeBucketPlan = async (
  context: Context,
  plan: Plan,
  buckets: Array<BucketDomain> | undefined,
  initialState: StateFile,
  onStateChange?: SaveStateFn,
): Promise<ExecutionResult> => {
  const bucketsMap = new Map<string, BucketDomain>(
    buckets?.map((bucket) => [`buckets.${bucket.key}`, bucket]) ?? [],
  );

  const successfulItems: Array<PlanItem> = [];
  let currentState = initialState;

  for (const item of plan.items) {
    try {
      const newState = await executeSingleItem(context, item, bucketsMap, currentState);
      if (newState !== null) {
        currentState = newState;
        successfulItems.push(item);
        if (onStateChange) {
          onStateChange(currentState);
          logger.debug(
            lang.__('STATE_PERSISTED_AFTER_OPERATION', {
              action: item.action,
              resourceId: item.logicalId,
            }),
          );
        }
      }
    } catch (error) {
      return {
        state: currentState,
        partialFailure: {
          failedItem: item,
          error: error instanceof Error ? error : new Error(String(error)),
          successfulItems,
        },
      };
    }
  }

  return { state: currentState };
};

import { normalizeBucketPolicyDefinition, removedBucketPolicy } from '../../common/bucketPolicy';
import {
  Context,
  BucketDomain,
  Plan,
  PlanItem,
  ResourceTypeEnum,
  StateFile,
  ResourceAttributes,
} from '../../types';
import { lang } from '../../lang';
import { createTencentClient } from '../../common/tencentClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import {
  COS_BUCKET_POLICY_INSTANCE_TYPE,
  bucketToCosBucketConfig,
  cloudCosToDefinition,
  extractCosBucketDefinition,
} from './cosTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { planRefreshedResource } from '../../common/refreshPlanner';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

const planBucketDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'COS_BUCKET',
  changes: { before: definition },
});

export const generateBucketPlan = async (
  context: Context,
  state: StateFile,
  buckets: Array<BucketDomain> | undefined,
): Promise<Plan> => {
  if (!buckets || buckets.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId]) => logicalId.startsWith('buckets.'))
      .map(([logicalId, resourceState]) => planBucketDeletion(logicalId, resourceState.definition));
    return { items };
  }

  const desiredLogicalIds = new Set(buckets.map((bucket) => `buckets.${bucket.key}`));

  const bucketItems = await mapWithConcurrency(
    buckets,
    PLAN_READ_CONCURRENCY,
    async (bucket): Promise<PlanItem> => {
      const logicalId = `buckets.${bucket.key}`;
      const currentState = getResource(state, logicalId);
      const config = bucketToCosBucketConfig(bucket, context.region);
      const desiredDefinition = extractCosBucketDefinition(config);

      const client = createTencentClient(context);
      const readBucket = () =>
        cachedRefreshRead(context, `cos.getBucket:${context.region}:${bucket.name}`, () =>
          client.cos.getBucket(bucket.name, context.region),
        );

      return planRefreshedResource({
        logicalId,
        resourceType: 'COS_BUCKET',
        currentState,
        desiredDefinition,
        read: readBucket,
        isOwned: (remote) => isOwnedByStack(context, logicalId, remote.Tags),
        foreignError: () =>
          new Error(
            lang.__('RESOURCE_EXISTS_NOT_OWNED', {
              resourceType: 'Bucket',
              resourceName: bucket.name,
              tagKey: OWNERSHIP_TAG_KEY,
            }),
          ),
        normalizeForDisplay: (definition) => normalizeBucketPolicyDefinition(definition, 'tencent'),
        cloudToDefinition: cloudCosToDefinition,
        removedDependents: {
          ...removedBucketPolicy(COS_BUCKET_POLICY_INSTANCE_TYPE, currentState, desiredDefinition),
          ...(!config.Domain &&
          (currentState?.instances ?? []).some((i) => i.type === ResourceTypeEnum.COS_DNS_CNAME)
            ? { domain: currentState?.definition.domain ?? null }
            : {}),
        },
        refresh: context.refresh,
      });
    },
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId]) => logicalId.startsWith('buckets.') && !desiredLogicalIds.has(logicalId))
    .map(([logicalId, resourceState]) => planBucketDeletion(logicalId, resourceState.definition));

  return { items: [...bucketItems, ...deletionItems] };
};

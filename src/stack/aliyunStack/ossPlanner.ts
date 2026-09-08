import path from 'node:path';
import { Context, BucketDomain, Plan, PlanItem, StateFile, ResourceAttributes } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import {
  bucketToOssBucketConfig,
  cloudOssToDefinition,
  extractOssBucketDefinition,
} from './ossTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { computeDirectoryHash } from '../../common/hashUtils';
import { planRefreshedResource } from '../../common/refreshPlanner';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

const planBucketDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'ALIYUN_OSS_BUCKET',
  changes: { before: normalizeDefinitionForDisplay(definition) },
});

// getBucket returns tags as { key, value } (BucketTag); the ownership helper
// expects { Key, Value }. Convert before verification.
const toOwnershipTags = (
  tags: Array<{ key?: string; value?: string }> | undefined,
): Array<{ Key?: string; Value?: string }> | undefined =>
  tags?.map((tag) => ({ Key: tag.key, Value: tag.value }));

const normalizeDefinitionForDisplay = (definition: ResourceAttributes): ResourceAttributes => {
  const { domainBound: _domainBound, ...rest } = definition as { domainBound?: unknown };
  return rest;
};

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
      const config = bucketToOssBucketConfig(bucket);
      const websiteCodeHash = (() => {
        if (!bucket.website?.code) return undefined;
        try {
          return computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code));
        } catch {
          return null;
        }
      })();
      const desiredDefinition = extractOssBucketDefinition(config, websiteCodeHash);
      const client = createAliyunClient(context);
      const domainBindingPending =
        (currentState?.definition as { domainBound?: boolean | null } | undefined)?.domainBound ===
        false;

      return planRefreshedResource({
        logicalId,
        resourceType: 'ALIYUN_OSS_BUCKET',
        currentState,
        desiredDefinition,
        read: () =>
          cachedRefreshRead(context, `oss.getBucket:${bucket.name}`, () =>
            client.oss.getBucket(bucket.name),
          ),
        isOwned: (remote) => isOwnedByStack(context, logicalId, toOwnershipTags(remote.tags)),
        foreignError: () =>
          new Error(
            `Bucket ${bucket.name} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to create — resolve manually.`,
          ),
        cloudToDefinition: cloudOssToDefinition,
        normalizeForDisplay: normalizeDefinitionForDisplay,
        extraUpdate: () => Promise.resolve({ update: domainBindingPending, drifted: false }),
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

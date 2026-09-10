import path from 'node:path';
import { lang } from '../../lang';
import { Context, BucketDomain, Plan, PlanItem, StateFile, ResourceAttributes } from '../../types';
import { createVolcengineClient } from '../../common/volcengineClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import { planRefreshedResource } from '../../common/refreshPlanner';
import { jsonDocumentDiffers } from '../../common/planCompare';
import { bucketToTosConfig, cloudTosToDefinition, extractTosBucketDefinition } from './tosTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { computeDirectoryHash } from '../../common';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

const planBucketDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'VOLCENGINE_TOS_BUCKET',
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
      const config = bucketToTosConfig(bucket);
      const websiteCodeHash = (() => {
        if (!bucket.website?.code) return undefined;
        try {
          return computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code));
        } catch {
          return null;
        }
      })();
      const desiredDefinition = extractTosBucketDefinition(config, websiteCodeHash);
      const client = createVolcengineClient(context);

      return planRefreshedResource({
        logicalId,
        resourceType: 'VOLCENGINE_TOS_BUCKET',
        currentState,
        desiredDefinition,
        read: () =>
          cachedRefreshRead(context, `tos.getBucket:${bucket.name}`, () =>
            client.tos.getBucket(bucket.name),
          ),
        isOwned: (remote) => isOwnedByStack(context, logicalId, remote.Tags),
        foreignError: () =>
          new Error(
            lang.__('RESOURCE_EXISTS_NOT_OWNED', {
              resourceType: 'Bucket',
              resourceName: bucket.name,
              tagKey: OWNERSHIP_TAG_KEY,
            }),
          ),
        cloudToDefinition: cloudTosToDefinition,
        extraUpdate: async () => {
          // Policy needs a canonical compare: the cloud returns a parsed
          // object while the config serializes it — see jsonDocumentDiffers.
          const desiredPolicy = (desiredDefinition as { policy?: string | null }).policy ?? null;
          if (desiredPolicy === null) {
            return { update: false, drifted: false };
          }
          const cloudPolicy = await cachedRefreshRead(
            context,
            `tos.getBucketPolicy:${bucket.name}`,
            () => client.tos.getBucketPolicy(bucket.name),
          );
          return {
            update: jsonDocumentDiffers(desiredPolicy, cloudPolicy),
            drifted: true,
          };
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

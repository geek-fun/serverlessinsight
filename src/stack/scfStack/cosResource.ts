import { Context, BucketDomain, ResourceState, StateFile } from '../../types';
import {
  createCosBucket,
  deleteCosBucket,
  getCosBucket,
  updateCosBucketAcl,
  updateCosBucketWebsite,
} from './cosProvider';
import { bucketToCosBucketConfig, extractCosBucketDefinition, CosBucketInfo } from './cosTypes';
import { setResource, removeResource } from '../../common/stateManager';

const buildCosInstanceFromProvider = (info: CosBucketInfo, arn: string) => {
  return {
    arn,
    id: info.Name,
    bucket: info.Name,
    location: info.Location,
    creationDate: info.CreationDate ?? null,
    acl: info.ACL ?? null,
    websiteConfiguration: info.WebsiteConfiguration
      ? {
          indexDocument: info.WebsiteConfiguration.IndexDocument?.Suffix ?? null,
          errorDocument: info.WebsiteConfiguration.ErrorDocument?.Key ?? null,
        }
      : {},
    accessControlPolicy: info.AccessControlPolicy
      ? {
          owner: info.AccessControlPolicy.owner
            ? {
                id: info.AccessControlPolicy.owner.id ?? null,
                displayName: info.AccessControlPolicy.owner.displayName ?? null,
              }
            : {},
          grants:
            info.AccessControlPolicy.grants?.map((g) => ({
              grantee: g.grantee
                ? {
                    type: g.grantee.type ?? null,
                    uri: g.grantee.uri ?? null,
                    id: g.grantee.id ?? null,
                    displayName: g.grantee.displayName ?? null,
                  }
                : {},
              permission: g.permission ?? null,
            })) ?? [],
        }
      : {},
    corsConfiguration:
      info.CorsConfiguration?.map((r) => ({
        id: r.id ?? null,
        allowedOrigins: r.allowedOrigins ?? [],
        allowedMethods: r.allowedMethods ?? [],
        allowedHeaders: r.allowedHeaders ?? [],
        exposeHeaders: r.exposeHeaders ?? [],
        maxAgeSeconds: r.maxAgeSeconds ?? null,
      })) ?? [],
    versioningConfiguration: info.VersioningConfiguration
      ? {
          status: info.VersioningConfiguration.status ?? null,
        }
      : {},
    taggingConfiguration: info.TaggingConfiguration
      ? {
          tags:
            info.TaggingConfiguration.tags?.map((t) => ({
              key: t.key ?? null,
              value: t.value ?? null,
            })) ?? [],
        }
      : {},
  };
};

export const createBucketResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToCosBucketConfig(bucket, context.region);

  await createCosBucket(context, config);

  // Refresh state from provider to get all attributes
  const bucketInfo = await getCosBucket(context, bucket.name, context.region);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${bucket.name}`);
  }

  const definition = extractCosBucketDefinition(config);
  const arn = `arn:tencent:cos:${context.region}::bucket:${bucket.name}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildCosInstanceFromProvider(bucketInfo, arn)],
    lastUpdated: new Date().toISOString(),
  };

  const logicalId = `buckets.${bucket.key}`;
  return setResource(state, logicalId, resourceState);
};

export const readBucketResource = async (context: Context, bucketName: string, region: string) => {
  return await getCosBucket(context, bucketName, region);
};

export const updateBucketResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToCosBucketConfig(bucket, context.region);

  // Update ACL if specified
  if (config.ACL) {
    await updateCosBucketAcl(context, bucket.name, context.region, config.ACL);
  }

  // Update website configuration if specified
  if (config.WebsiteConfiguration) {
    await updateCosBucketWebsite(context, bucket.name, context.region, config.WebsiteConfiguration);
  }

  // Refresh state from provider to get all attributes
  const bucketInfo = await getCosBucket(context, bucket.name, context.region);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${bucket.name}`);
  }

  const definition = extractCosBucketDefinition(config);
  const arn = `arn:tencent:cos:${context.region}::bucket:${bucket.name}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildCosInstanceFromProvider(bucketInfo, arn)],
    lastUpdated: new Date().toISOString(),
  };

  const logicalId = `buckets.${bucket.key}`;
  return setResource(state, logicalId, resourceState);
};

export const deleteBucketResource = async (
  context: Context,
  bucketName: string,
  region: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  await deleteCosBucket(context, bucketName, region);
  return removeResource(state, logicalId);
};

import {
  Context,
  BucketDomain,
  ResourceState,
  StateFile,
  ResourceInstance,
  ResourceTypeEnum,
} from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import { CosCnameInfo } from '../../common/tencentClient/cosOperations';
import { bucketToCosBucketConfig, extractCosBucketDefinition, CosBucketInfo } from './cosTypes';
import { setResource, removeResource } from '../../common/stateManager';
import { buildSid } from '../../common';
import { logger } from '../../common/logger';
import { lang } from '../../lang';

type CosDnsInstance = ResourceInstance & {
  type: 'TENCENT_COS_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
};

const buildCosInstanceFromProvider = (info: CosBucketInfo, sid: string) => {
  return {
    sid,
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

  const client = createTencentClient(context);
  await client.cos.createBucket(config);

  const bucketInfo = await client.cos.getBucket(bucket.name, context.region);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${bucket.name}`);
  }

  const definition = extractCosBucketDefinition(config);
  const sid = buildSid('tencent', 'cos', context.stage, bucket.name);
  const logicalId = `buckets.${bucket.key}`;

  const instances: Array<ResourceInstance> = [
    buildCosInstanceFromProvider(bucketInfo as CosBucketInfo, sid),
  ];

  let cnameInfo: CosCnameInfo | undefined;
  if (bucket.website?.domain) {
    logger.info(
      lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
        domain: bucket.website.domain,
        bucketName: bucket.name,
      }),
    );
    cnameInfo = await client.cos.bindCustomDomain(bucket.name, bucket.website.domain);

    if (cnameInfo) {
      const instanceId = cnameInfo.dnsRecordId ?? bucket.website.domain;
      const dnsInstance: CosDnsInstance = {
        sid: buildSid('tencent', 'dnspod', context.stage, instanceId),
        id: instanceId,
        type: ResourceTypeEnum.COS_DNS_CNAME,
        domain: bucket.website.domain,
        cname: cnameInfo.cname,
        ...(cnameInfo.dnsRecordId ? { dnsRecordId: cnameInfo.dnsRecordId } : {}),
      };
      instances.push(dnsInstance);

      // Refresh bucket info to capture auto-added CORS rule
      const refreshedInfo = await client.cos.getBucket(bucket.name, context.region);
      if (refreshedInfo) {
        instances[0] = buildCosInstanceFromProvider(refreshedInfo as CosBucketInfo, sid);
      }
    }
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

export const readBucketResource = async (context: Context, bucketName: string, region: string) => {
  const client = createTencentClient(context);
  return await client.cos.getBucket(bucketName, region);
};

export const updateBucketResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToCosBucketConfig(bucket, context.region);
  const client = createTencentClient(context);

  if (config.ACL) {
    await client.cos.updateBucketAcl(bucket.name, context.region, config.ACL);
  }

  if (config.WebsiteConfiguration) {
    await client.cos.updateBucketWebsite(bucket.name, context.region, config.WebsiteConfiguration);
  }

  const bucketInfo = await client.cos.getBucket(bucket.name, context.region);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${bucket.name}`);
  }

  const definition = extractCosBucketDefinition(config);
  const sid = buildSid('tencent', 'cos', context.stage, bucket.name);
  const logicalId = `buckets.${bucket.key}`;

  const instances: Array<ResourceInstance> = [
    buildCosInstanceFromProvider(bucketInfo as CosBucketInfo, sid),
  ];

  const existingState = state.resources[logicalId];
  const existingDnsInstance = existingState?.instances?.find(
    (i) => i.type === ResourceTypeEnum.COS_DNS_CNAME,
  ) as CosDnsInstance | undefined;

  if (bucket.website?.domain) {
    const domainChanged = existingDnsInstance?.domain !== bucket.website.domain;

    if (domainChanged && existingDnsInstance) {
      await client.cos.unbindCustomDomain(
        bucket.name,
        existingDnsInstance.domain,
        existingDnsInstance.dnsRecordId,
      );
    }

    logger.info(
      lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
        domain: bucket.website.domain,
        bucketName: bucket.name,
      }),
    );
    const cnameInfo = await client.cos.bindCustomDomain(bucket.name, bucket.website.domain);

    if (cnameInfo) {
      const instanceId = cnameInfo.dnsRecordId ?? bucket.website.domain;
      const dnsInstance: CosDnsInstance = {
        sid: buildSid('tencent', 'dnspod', context.stage, instanceId),
        id: instanceId,
        type: ResourceTypeEnum.COS_DNS_CNAME,
        domain: bucket.website.domain,
        cname: cnameInfo.cname,
        ...(cnameInfo.dnsRecordId ? { dnsRecordId: cnameInfo.dnsRecordId } : {}),
      };
      instances.push(dnsInstance);

      // Refresh bucket info to capture auto-added CORS rule
      const refreshedInfo = await client.cos.getBucket(bucket.name, context.region);
      if (refreshedInfo) {
        instances[0] = buildCosInstanceFromProvider(refreshedInfo as CosBucketInfo, sid);
      }
    }
  } else if (existingDnsInstance) {
    await client.cos.unbindCustomDomain(
      bucket.name,
      existingDnsInstance.domain,
      existingDnsInstance.dnsRecordId,
    );
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

export const deleteBucketResource = async (
  context: Context,
  bucketName: string,
  region: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createTencentClient(context);

  const existingState = state.resources[logicalId];
  const dnsInstance = existingState?.instances?.find(
    (i) => i.type === ResourceTypeEnum.COS_DNS_CNAME,
  ) as CosDnsInstance | undefined;

  if (dnsInstance) {
    await client.cos.unbindCustomDomain(bucketName, dnsInstance.domain, dnsInstance.dnsRecordId);
  }

  try {
    await client.cos.deleteBucket(bucketName, region);
  } catch (err) {
    const errorCode = (err as { code?: string })?.code;
    const statusCode = (err as { statusCode?: number })?.statusCode;
    if (errorCode === 'NoSuchBucket' || statusCode === 404) {
      logger.warn(
        lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Bucket', name: bucketName }),
      );
    } else {
      throw err;
    }
  }
  return removeResource(state, logicalId);
};

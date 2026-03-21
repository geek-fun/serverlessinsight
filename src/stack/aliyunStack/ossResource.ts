import { createAliyunClient } from '../../common/aliyunClient';
import {
  OssBucketInfo,
  OssCnameInfo,
  OssCnameCertificateConfig,
} from '../../common/aliyunClient/ossOperations';
import { setResource, removeResource, buildSid } from '../../common';
import { readPemContent, warnInlinePem } from '../../common/certUtils';
import {
  Context,
  BucketDomain,
  ResourceState,
  StateFile,
  ResourceInstance,
  ResourceTypeEnum,
} from '../../types';
import { bucketToOssBucketConfig, extractOssBucketDefinition } from './ossTypes';
import { CommonBucketInstance } from '../bucketTypes';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import path from 'node:path';

type OssDnsInstance = ResourceInstance & {
  type: 'ALIYUN_OSS_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
  txtRecordId?: string;
};

const buildOssInstanceFromProvider = (info: OssBucketInfo, sid: string): CommonBucketInstance => {
  return {
    type: ResourceTypeEnum.ALIYUN_OSS_BUCKET,
    sid,
    id: info.name,
    bucketName: info.name,
    location: info.location ?? null,
    creationDate: info.creationDate ?? null,
    storageClass: info.storageClass ?? null,
    dataRedundancyType: info.dataRedundancyType ?? null,
    resourceGroupId: info.resourceGroupId ?? null,
    comment: info.comment ?? null,
    owner: info.owner
      ? {
          id: info.owner.id ?? null,
          displayName: info.owner.displayName ?? null,
        }
      : undefined,
    blockPublicAccess: info.blockPublicAccess ?? null,
    accessMonitorStatus: info.accessMonitorStatus ?? null,
    acl: info.acl ?? null,
    websiteConfig: info.websiteConfig
      ? {
          indexDocument: info.websiteConfig.indexDocument ?? null,
          errorDocument: info.websiteConfig.errorDocument ?? null,
        }
      : undefined,
    loggingConfig: info.loggingConfig
      ? {
          targetBucket: info.loggingConfig.targetBucket ?? null,
          targetPrefix: info.loggingConfig.targetPrefix ?? null,
        }
      : undefined,
    corsRules: info.corsRules?.map((rule) => ({
      id: rule.id ?? null,
      allowedOrigins: rule.allowedOrigins ?? [],
      allowedMethods: rule.allowedMethods ?? [],
      allowedHeaders: rule.allowedHeaders ?? [],
      exposeHeaders: rule.exposeHeaders ?? [],
      maxAgeSeconds: rule.maxAgeSeconds ?? null,
    })),
    lifecycleRules: info.lifecycleRules?.map((rule) => ({
      id: rule.id ?? null,
      status: rule.status ?? null,
      prefix: rule.prefix ?? null,
      expiration: rule.expiration
        ? {
            days: rule.expiration.days ?? null,
            date: rule.expiration.date ?? null,
            expiredObjectDeleteMarker: rule.expiration.expiredObjectDeleteMarker ?? null,
          }
        : undefined,
      transition: rule.transition
        ? {
            days: rule.transition.days ?? null,
            date: rule.transition.date ?? null,
            storageClass: rule.transition.storageClass ?? null,
          }
        : undefined,
    })),
    versioningStatus: info.versioningConfig?.status ?? null,
    encryptionConfig: info.encryptionConfig
      ? {
          sseAlgorithm: info.encryptionConfig.sseAlgorithm ?? null,
          kmsMasterKeyId: info.encryptionConfig.kmsMasterKeyId ?? null,
          kmsDataEncryption: info.encryptionConfig.kmsDataEncryption ?? null,
        }
      : undefined,
    transferAccelerationStatus: info.transferAccelerationStatus ?? null,
    replicationRules: info.replicationRules?.map((rule) => ({
      id: rule.id ?? null,
      status: rule.status ?? null,
      prefix: rule.prefix ?? null,
      destination: rule.destination
        ? {
            bucket: rule.destination.bucket ?? null,
            storageClass: rule.destination.storageClass ?? null,
          }
        : undefined,
    })),
    tags: info.tags?.map((tag) => ({
      key: tag.key ?? null,
      value: tag.value ?? null,
    })),
  };
};

const resolveBucketDomainCertificate = async (
  bucket: BucketDomain,
  client: ReturnType<typeof createAliyunClient>,
): Promise<OssCnameCertificateConfig | undefined> => {
  const website = bucket.website;
  if (!website) return undefined;

  if (website.domain_certificate_id) {
    const certId = website.domain_certificate_id;
    const detail = await client.cas.getCertificate(certId);
    if (!detail || !detail.cert || !detail.key) {
      throw new Error(lang.__('CERT_REFERENCE_NOT_FOUND', { reference: certId }));
    }
    return { certificateBody: detail.cert, certificatePrivateKey: detail.key };
  }

  if (website.domain_certificate_body && website.domain_certificate_private_key) {
    const body = readPemContent(website.domain_certificate_body);
    const key = readPemContent(website.domain_certificate_private_key);
    warnInlinePem(website.domain_certificate_private_key);
    return { certificateBody: body, certificatePrivateKey: key };
  }

  return undefined;
};

export const createBucketResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToOssBucketConfig(bucket);
  const client = createAliyunClient(context);

  await client.oss.createBucket({
    bucketName: config.bucketName,
    acl: config.acl,
    websiteConfig: config.websiteConfig,
    storageClass: config.storageClass,
  });

  // Refresh state from provider to get bucket info
  let bucketInfo = await client.oss.getBucket(config.bucketName);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${config.bucketName}`);
  }

  const sid = buildSid('aliyun', 'oss', context.stage, config.bucketName);
  const logicalId = `buckets.${bucket.key}`;

  const instances: Array<ResourceInstance> = [buildOssInstanceFromProvider(bucketInfo, sid)];

  const partialResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: {
      ...extractOssBucketDefinition(config),
      ...(bucket.website?.domain != null ? { domainBound: null } : {}),
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  state = setResource(state, logicalId, partialResourceState);

  let cnameInfo: OssCnameInfo | undefined;
  if (bucket.website?.domain) {
    const certificate = await resolveBucketDomainCertificate(bucket, client);

    logger.info(
      lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
        domain: bucket.website.domain,
        bucketName: config.bucketName,
      }),
    );
    if (certificate) {
      logger.info(
        lang.__('OSS_BUCKET_CERT_BINDING', {
          domain: bucket.website.domain,
          bucketName: config.bucketName,
        }),
      );
    }

    cnameInfo = await client.oss.bindCustomDomain(
      config.bucketName,
      bucket.website.domain,
      certificate,
    );

    if (cnameInfo) {
      const instanceId = cnameInfo.dnsRecordId ?? bucket.website.domain;
      const dnsInstance: OssDnsInstance = {
        sid: buildSid('aliyun', 'alidns', context.stage, instanceId),
        id: instanceId,
        type: ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
        domain: bucket.website.domain,
        cname: cnameInfo.cname,
        ...(cnameInfo.dnsRecordId ? { dnsRecordId: cnameInfo.dnsRecordId } : {}),
        ...(cnameInfo.txtRecordId ? { txtRecordId: cnameInfo.txtRecordId } : {}),
      };
      instances.push(dnsInstance);

      // Refresh bucket info to capture auto-added CORS rule
      bucketInfo = await client.oss.getBucket(config.bucketName);
      if (bucketInfo) {
        instances[0] = buildOssInstanceFromProvider(bucketInfo, sid);
      }
    }
  }

  // Upload static files if code path is specified
  if (bucket.website?.code) {
    try {
      const codePath = path.resolve(process.cwd(), bucket.website.code);
      await client.oss.uploadFiles(config.bucketName, codePath);

      // Refresh state after upload to get updated info
      bucketInfo = await client.oss.getBucket(config.bucketName);
      if (bucketInfo) {
        instances[0] = buildOssInstanceFromProvider(bucketInfo, sid);
      }
    } catch (error) {
      logger.error(
        `Failed to upload files to bucket, but bucket was created and saved to state: ${error}`,
      );
      logger.info(lang.__('OSS_BUCKET_TRACKED_CAN_RETRY'));
    }
  }

  const finalResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: {
      ...extractOssBucketDefinition(config),
      ...(bucket.website?.domain != null
        ? { domainBound: cnameInfo?.bucketCnameBound ?? null }
        : {}),
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, finalResourceState);
};

export const readBucketResource = async (context: Context, bucketName: string) => {
  const client = createAliyunClient(context);
  return await client.oss.getBucket(bucketName);
};

export const updateBucketResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToOssBucketConfig(bucket);
  const client = createAliyunClient(context);

  if (config.acl) {
    await client.oss.updateBucketAcl(config.bucketName, config.acl);
  }

  if (config.websiteConfig) {
    await client.oss.updateBucketWebsite(config.bucketName, config.websiteConfig);
  }

  if (bucket.website?.code) {
    const codePath = path.resolve(process.cwd(), bucket.website.code);
    await client.oss.uploadFiles(config.bucketName, codePath);
  }

  const bucketInfo = await client.oss.getBucket(config.bucketName);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${config.bucketName}`);
  }

  const sid = buildSid('aliyun', 'oss', context.stage, config.bucketName);
  const logicalId = `buckets.${bucket.key}`;

  const instances: Array<ResourceInstance> = [buildOssInstanceFromProvider(bucketInfo, sid)];

  const existingState = state.resources[logicalId];
  const existingDnsInstance = existingState?.instances?.find(
    (i) => i.type === ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
  ) as OssDnsInstance | undefined;

  let cnameInfo: OssCnameInfo | undefined;

  if (bucket.website?.domain) {
    const domainChanged = existingDnsInstance?.domain !== bucket.website.domain;

    if (domainChanged && existingDnsInstance) {
      await client.oss.unbindCustomDomain(
        config.bucketName,
        existingDnsInstance.domain,
        existingDnsInstance.dnsRecordId,
        existingDnsInstance.txtRecordId,
      );
    }

    const certificate = await resolveBucketDomainCertificate(bucket, client);

    logger.info(
      lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
        domain: bucket.website.domain,
        bucketName: config.bucketName,
      }),
    );
    if (certificate) {
      logger.info(
        lang.__('OSS_BUCKET_CERT_BINDING', {
          domain: bucket.website.domain,
          bucketName: config.bucketName,
        }),
      );
    }

    cnameInfo = await client.oss.bindCustomDomain(
      config.bucketName,
      bucket.website.domain,
      certificate,
    );

    if (cnameInfo) {
      const instanceId = cnameInfo.dnsRecordId ?? bucket.website.domain;
      const dnsInstance: OssDnsInstance = {
        sid: buildSid('aliyun', 'alidns', context.stage, instanceId),
        id: instanceId,
        type: ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
        domain: bucket.website.domain,
        cname: cnameInfo.cname,
        ...(cnameInfo.dnsRecordId ? { dnsRecordId: cnameInfo.dnsRecordId } : {}),
        ...(cnameInfo.txtRecordId ? { txtRecordId: cnameInfo.txtRecordId } : {}),
      };
      instances.push(dnsInstance);

      // Refresh bucket info to capture auto-added CORS rule
      const refreshedInfo = await client.oss.getBucket(config.bucketName);
      if (refreshedInfo) {
        instances[0] = buildOssInstanceFromProvider(refreshedInfo, sid);
      }
    }
  } else if (existingDnsInstance) {
    await client.oss.unbindCustomDomain(
      config.bucketName,
      existingDnsInstance.domain,
      existingDnsInstance.dnsRecordId,
      existingDnsInstance.txtRecordId,
    );
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: {
      ...extractOssBucketDefinition(config),
      ...(bucket.website?.domain != null
        ? { domainBound: cnameInfo?.bucketCnameBound ?? null }
        : {}),
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

export const deleteBucketResource = async (
  context: Context,
  bucketName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createAliyunClient(context);

  const existingState = state.resources[logicalId];
  const dnsInstance = existingState?.instances?.find(
    (i) => i.type === ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
  ) as OssDnsInstance | undefined;

  if (dnsInstance) {
    await client.oss.unbindCustomDomain(
      bucketName,
      dnsInstance.domain,
      dnsInstance.dnsRecordId,
      dnsInstance.txtRecordId,
    );
  }

  try {
    await client.oss.deleteBucket(bucketName);
  } catch (err) {
    const errorCode = (err as { code?: string })?.code;
    if (errorCode === 'NoSuchBucket') {
      logger.warn(
        lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Bucket', name: bucketName }),
      );
    } else {
      throw err;
    }
  }
  return removeResource(state, logicalId);
};

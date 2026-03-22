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
import { setResource, removeResource, buildSid } from '../../common';
import { readPemContent, warnInlinePem } from '../../common/certUtils';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { deriveWwwDomain } from '../../common/domainUtils';

type CosDnsInstance = ResourceInstance & {
  type: 'TENCENT_COS_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
  isWwwVariant?: boolean;
};

type CosResolvedCertificateUpload = {
  mode: 'upload';
  certificateName: string;
  certificateBody: string;
  certificatePrivateKey: string;
};

type CosResolvedCertificateReference = {
  mode: 'reference';
  certificateId: string;
};

type CosResolvedCertificate = CosResolvedCertificateUpload | CosResolvedCertificateReference;

const resolveBucketDomainCertificate = (
  bucket: BucketDomain,
): CosResolvedCertificate | undefined => {
  const website = bucket.website;
  if (!website) return undefined;

  if (website.domain_certificate_id) {
    logger.info(
      lang.__('CERT_RESOLVING_REFERENCE', {
        reference: website.domain_certificate_id,
        domain: website.domain ?? bucket.key,
      }),
    );
    return {
      mode: 'reference',
      certificateId: website.domain_certificate_id,
    };
  }

  if (website.domain_certificate_body && website.domain_certificate_private_key) {
    if (!website.domain) {
      throw new Error(lang.__('BUCKET_DOMAIN_REQUIRED_FOR_CERT', { name: bucket.key }));
    }
    const body = readPemContent(website.domain_certificate_body);
    const key = readPemContent(website.domain_certificate_private_key);
    warnInlinePem(website.domain_certificate_private_key);
    return {
      mode: 'upload',
      certificateName: website.domain.replace(/\./g, '_'),
      certificateBody: body,
      certificatePrivateKey: key,
    };
  }

  return undefined;
};

const deployCertificateToCosDomain = async (
  client: ReturnType<typeof createTencentClient>,
  resolved: CosResolvedCertificate,
  bucketName: string,
  domain: string,
  region: string,
): Promise<void> => {
  logger.info(lang.__('COS_BUCKET_CERT_DEPLOYING', { domain, bucketName }));

  let certificateId: string;

  if (resolved.mode === 'reference') {
    logger.info(
      lang.__('CERT_RESOLVED_REFERENCE', {
        name: domain,
        certId: resolved.certificateId,
      }),
    );
    certificateId = resolved.certificateId;
  } else {
    logger.info(
      lang.__('CERT_RESOLVED_UPLOAD', {
        name: resolved.certificateName,
      }),
    );
    const certInfo = await client.ssl.uploadCertificate(
      resolved.certificateName,
      resolved.certificateBody,
      resolved.certificatePrivateKey,
    );
    certificateId = certInfo.certificateId;
  }

  const instanceId = `${region}|${bucketName}|${domain}`;
  await client.ssl.deployCertificateInstance(certificateId, 'cos', [instanceId]);
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
    const resolved = resolveBucketDomainCertificate(bucket);
    const primaryDomain = bucket.website.domain;
    const wwwBindApex = bucket.website.www_bind_apex ?? false;

    logger.info(
      lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
        domain: primaryDomain,
        bucketName: bucket.name,
      }),
    );
    cnameInfo = await client.cos.bindCustomDomain(bucket.name, primaryDomain);

    if (cnameInfo) {
      const instanceId = cnameInfo.dnsRecordId ?? primaryDomain;
      const dnsInstance: CosDnsInstance = {
        sid: buildSid('tencent', 'dnspod', context.stage, instanceId),
        id: instanceId,
        type: ResourceTypeEnum.COS_DNS_CNAME,
        domain: primaryDomain,
        cname: cnameInfo.cname,
        ...(cnameInfo.dnsRecordId ? { dnsRecordId: cnameInfo.dnsRecordId } : {}),
      };
      instances.push(dnsInstance);

      if (resolved && cnameInfo.bucketDomainBound) {
        await deployCertificateToCosDomain(
          client,
          resolved,
          bucket.name,
          primaryDomain,
          context.region,
        );
      }
    }

    const wwwDomain = wwwBindApex ? deriveWwwDomain(primaryDomain) : null;
    if (wwwDomain) {
      logger.info(
        lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
          domain: wwwDomain,
          bucketName: bucket.name,
        }),
      );

      const wwwCnameInfo = await client.cos.bindCustomDomain(bucket.name, wwwDomain);

      if (wwwCnameInfo) {
        const wwwInstanceId = wwwCnameInfo.dnsRecordId ?? wwwDomain;
        const wwwDnsInstance: CosDnsInstance = {
          sid: buildSid('tencent', 'dnspod', context.stage, wwwInstanceId),
          id: wwwInstanceId,
          type: ResourceTypeEnum.COS_DNS_CNAME,
          domain: wwwDomain,
          cname: wwwCnameInfo.cname,
          isWwwVariant: true,
          ...(wwwCnameInfo.dnsRecordId ? { dnsRecordId: wwwCnameInfo.dnsRecordId } : {}),
        };
        instances.push(wwwDnsInstance);

        if (resolved && wwwCnameInfo.bucketDomainBound) {
          await deployCertificateToCosDomain(
            client,
            resolved,
            bucket.name,
            wwwDomain,
            context.region,
          );
        }
      }
    }

    const refreshedInfo = await client.cos.getBucket(bucket.name, context.region);
    if (refreshedInfo) {
      instances[0] = buildCosInstanceFromProvider(refreshedInfo as CosBucketInfo, sid);
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
  const existingDnsInstances = existingState?.instances?.filter(
    (i) => i.type === ResourceTypeEnum.COS_DNS_CNAME,
  ) as CosDnsInstance[] | undefined;
  const existingPrimaryDnsInstance = existingDnsInstances?.find((i) => !i.isWwwVariant);
  const existingWwwDnsInstance = existingDnsInstances?.find((i) => i.isWwwVariant);

  if (bucket.website?.domain) {
    const primaryDomain = bucket.website.domain;
    const wwwBindApex = bucket.website.www_bind_apex ?? false;
    const domainChanged = existingPrimaryDnsInstance?.domain !== primaryDomain;

    if (domainChanged && existingDnsInstances) {
      for (const instance of existingDnsInstances) {
        await client.cos.unbindCustomDomain(bucket.name, instance.domain, instance.dnsRecordId);
      }
    }

    const resolved = resolveBucketDomainCertificate(bucket);

    logger.info(
      lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
        domain: primaryDomain,
        bucketName: bucket.name,
      }),
    );
    const cnameInfo = await client.cos.bindCustomDomain(bucket.name, primaryDomain);

    if (cnameInfo) {
      const instanceId = cnameInfo.dnsRecordId ?? primaryDomain;
      const dnsInstance: CosDnsInstance = {
        sid: buildSid('tencent', 'dnspod', context.stage, instanceId),
        id: instanceId,
        type: ResourceTypeEnum.COS_DNS_CNAME,
        domain: primaryDomain,
        cname: cnameInfo.cname,
        ...(cnameInfo.dnsRecordId ? { dnsRecordId: cnameInfo.dnsRecordId } : {}),
      };
      instances.push(dnsInstance);

      if (resolved && cnameInfo.bucketDomainBound) {
        await deployCertificateToCosDomain(
          client,
          resolved,
          bucket.name,
          primaryDomain,
          context.region,
        );
      }
    }

    const wwwDomain = wwwBindApex ? deriveWwwDomain(primaryDomain) : null;
    if (wwwDomain) {
      logger.info(
        lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
          domain: wwwDomain,
          bucketName: bucket.name,
        }),
      );

      const wwwCnameInfo = await client.cos.bindCustomDomain(bucket.name, wwwDomain);

      if (wwwCnameInfo) {
        const wwwInstanceId = wwwCnameInfo.dnsRecordId ?? wwwDomain;
        const wwwDnsInstance: CosDnsInstance = {
          sid: buildSid('tencent', 'dnspod', context.stage, wwwInstanceId),
          id: wwwInstanceId,
          type: ResourceTypeEnum.COS_DNS_CNAME,
          domain: wwwDomain,
          cname: wwwCnameInfo.cname,
          isWwwVariant: true,
          ...(wwwCnameInfo.dnsRecordId ? { dnsRecordId: wwwCnameInfo.dnsRecordId } : {}),
        };
        instances.push(wwwDnsInstance);

        if (resolved && wwwCnameInfo.bucketDomainBound) {
          await deployCertificateToCosDomain(
            client,
            resolved,
            bucket.name,
            wwwDomain,
            context.region,
          );
        }
      }
    } else if (existingWwwDnsInstance && !wwwBindApex) {
      await client.cos.unbindCustomDomain(
        bucket.name,
        existingWwwDnsInstance.domain,
        existingWwwDnsInstance.dnsRecordId,
      );
    }

    const refreshedInfo = await client.cos.getBucket(bucket.name, context.region);
    if (refreshedInfo) {
      instances[0] = buildCosInstanceFromProvider(refreshedInfo as CosBucketInfo, sid);
    }
  } else if (existingDnsInstances) {
    for (const instance of existingDnsInstances) {
      await client.cos.unbindCustomDomain(bucket.name, instance.domain, instance.dnsRecordId);
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

export const deleteBucketResource = async (
  context: Context,
  bucketName: string,
  region: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createTencentClient(context);

  const existingState = state.resources[logicalId];
  const dnsInstances = existingState?.instances?.filter(
    (i) => i.type === ResourceTypeEnum.COS_DNS_CNAME,
  ) as CosDnsInstance[] | undefined;

  if (dnsInstances) {
    for (const dnsInstance of dnsInstances) {
      await client.cos.unbindCustomDomain(bucketName, dnsInstance.domain, dnsInstance.dnsRecordId);
    }
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

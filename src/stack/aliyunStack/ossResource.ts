import { createAliyunClient } from '../../common/aliyunClient';
import {
  OssBucketInfo,
  OssCnameInfo,
  OssCnameCertificateConfig,
} from '../../common/aliyunClient/ossOperations';
import { setResource, removeResource, buildSid, computeDirectoryHash } from '../../common';
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
import { deriveWwwDomain, extractMainDomain, extractHostRecord } from '../../common/domainUtils';

type OssDnsInstance = ResourceInstance & {
  type: 'ALIYUN_OSS_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
  txtRecordId?: string;
  isWwwVariant?: boolean;
};

type OssCdnInstance = ResourceInstance & {
  type: 'ALIYUN_CDN_DISTRIBUTION';
  domainName: string;
  cname?: string;
};

type OssCdnDnsInstance = ResourceInstance & {
  type: 'ALIYUN_CDN_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
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
  const domain = bucket.domain;
  const website = bucket.website;

  const certId = domain?.certificate_id || website?.domain_certificate_id;
  const certBody = domain?.certificate_body || website?.domain_certificate_body;
  const certKey = domain?.certificate_private_key || website?.domain_certificate_private_key;

  if (certId) {
    const detail = await client.cas.getCertificate(certId);
    if (!detail || !detail.cert || !detail.key) {
      throw new Error(lang.__('CERT_REFERENCE_NOT_FOUND', { reference: certId }));
    }
    return { certificateBody: detail.cert, certificatePrivateKey: detail.key };
  }

  if (certBody && certKey) {
    const body = readPemContent(certBody);
    const key = readPemContent(certKey);
    warnInlinePem(certKey);
    return { certificateBody: body, certificatePrivateKey: key };
  }

  return undefined;
};

const getIsCdnEnabled = (bucket: BucketDomain): boolean => {
  if (!bucket.domain?.cdn) return false;
  if (typeof bucket.domain.cdn === 'boolean') return bucket.domain.cdn;
  return bucket.domain.cdn.enabled;
};

const getIsAccelerateEnabled = (bucket: BucketDomain): boolean => {
  return bucket.domain?.accelerate === true;
};

const buildOssBucketPolicyJson = (iam: BucketDomain['iam']): Record<string, unknown> | null => {
  if (!iam?.resource?.statements || iam.resource.statements.length === 0) return null;
  return {
    Version: '1',
    Statement: iam.resource.statements.map((stmt) => {
      const s: Record<string, unknown> = {
        Effect: stmt.effect,
        Principal: stmt.principal,
        Action: stmt.action,
        Resource: stmt.resource,
      };
      if (stmt.condition) {
        s.Condition = stmt.condition;
      }
      return s;
    }),
  };
};

const applyBucketPolicy = async (
  client: ReturnType<typeof createAliyunClient>,
  bucket: BucketDomain,
): Promise<void> => {
  if (!bucket.iam) return;
  const policy = buildOssBucketPolicyJson(bucket.iam);
  if (!policy) return;
  logger.info(lang.__('BUCKET_POLICY_APPLYING', { bucketName: bucket.name }));
  await client.oss.putBucketPolicy(bucket.name, policy);
  logger.info(lang.__('BUCKET_POLICY_APPLIED', { bucketName: bucket.name }));
};

const deleteBucketPolicy = async (
  client: ReturnType<typeof createAliyunClient>,
  bucketName: string,
): Promise<void> => {
  try {
    await client.oss.deleteBucketPolicy(bucketName);
    logger.info(lang.__('BUCKET_POLICY_DELETED', { bucketName }));
  } catch {
    // Best effort cleanup
  }
};

const getDomainName = (bucket: BucketDomain): string | undefined => {
  return bucket.domain?.domain_name || bucket.website?.domain;
};

/* istanbul ignore next */
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
    throw new Error(
      lang.__('FAILED_TO_REFRESH_STATE', { resourceType: 'bucket', name: config.bucketName }),
    );
  }

  const sid = buildSid('aliyun', 'oss', context.stage, config.bucketName);
  const logicalId = `buckets.${bucket.key}`;

  const instances: Array<ResourceInstance> = [buildOssInstanceFromProvider(bucketInfo, sid)];

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const partialResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: {
      ...extractOssBucketDefinition(config, websiteCodeHash),
      ...(bucket.website?.domain != null ? { domainBound: null } : {}),
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  state = setResource(state, logicalId, partialResourceState);

  const domainName = getDomainName(bucket);
  const isCdnEnabled = getIsCdnEnabled(bucket);
  const isAccelerateEnabled = getIsAccelerateEnabled(bucket);
  let cnameInfo: OssCnameInfo | undefined;

  // Enable transfer acceleration if requested
  if (isAccelerateEnabled) {
    logger.info(lang.__('ENABLING_OSS_TRANSFER_ACCELERATION', { bucketName: config.bucketName }));
    const accelEnabled = await client.oss.enableTransferAcceleration(config.bucketName);
    if (!accelEnabled) {
      throw new Error(lang.__('FAILED_TO_ENABLE_ACCELERATION', { bucketName: config.bucketName }));
    }
  }

  if (domainName) {
    const certificate = await resolveBucketDomainCertificate(bucket, client);
    const primaryDomain = domainName;
    const wwwBindApex = bucket.domain?.www_bind_apex ?? bucket.website?.www_bind_apex ?? false;

    const mainDomain = extractMainDomain(primaryDomain);
    const hostRecord = extractHostRecord(primaryDomain, mainDomain);

    logger.info(
      lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
        domain: primaryDomain,
        bucketName: config.bucketName,
      }),
    );

    // Resolve CDN config from bucket.domain.cdn object form
    const cdnObj = typeof bucket.domain?.cdn === 'object' ? bucket.domain?.cdn : undefined;
    const resolvedCdnType = cdnObj?.cdn_type ?? 'web';
    const resolvedScope = cdnObj?.scope ?? 'global';
    if (isCdnEnabled) {
      const originEndpoint = isAccelerateEnabled
        ? await client.oss.getAccelerateEndpoint(config.bucketName)
        : await client.oss.getBucketCnameEndpoint(config.bucketName);

      logger.info(
        lang.__('CREATING_CDN_DISTRIBUTION', {
          domain: primaryDomain,
          origin: originEndpoint,
        }),
      );

      await client.cdn.addCdnDomain({
        domainName: primaryDomain,
        cdnType: resolvedCdnType,
        sources: [{ type: 'oss', content: originEndpoint }],
        scope: resolvedScope,
      });

      if (cdnObj) {
        if (cdnObj.cache_ttl != null || cdnObj.ignore_query_string != null) {
          await client.cdn.applyCacheConfig(
            primaryDomain,
            cdnObj.cache_ttl,
            cdnObj.ignore_query_string,
          );
        }
        if (cdnObj.origin_protocol) {
          await client.cdn.applyProtocolConfig(primaryDomain, cdnObj.origin_protocol);
        }
        if (cdnObj.compression != null) {
          await client.cdn.applyCompression(primaryDomain, cdnObj.compression);
        }
        if (cdnObj.force_redirect_https != null) {
          await client.cdn.applyHttpsRedirect(primaryDomain, cdnObj.force_redirect_https);
        }
      }

      const cdnDomainInfo = await client.cdn.describeCdnDomainDetail(primaryDomain);
      const cdnCname = cdnDomainInfo?.cname;

      if (certificate) {
        logger.info(lang.__('CDN_DEPLOYING_CERTIFICATE', { domain: primaryDomain }));
        await client.cdn.setDomainServerCertificate(primaryDomain, {
          serverCertificate: certificate.certificateBody,
          privateKey: certificate.certificatePrivateKey,
          serverCertificateStatus: 'on',
        });
      }

      if (cdnCname) {
        const cdnInstance: OssCdnInstance = {
          sid: buildSid('aliyun', 'cdn', context.stage, primaryDomain),
          id: primaryDomain,
          type: ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
          domainName: primaryDomain,
          cname: cdnCname,
        };
        instances.push(cdnInstance);

        // Create DNS CNAME pointing to CDN distribution target
        const dnsRecordId = await client.dns.addDomainRecord({
          domainName: mainDomain,
          rr: hostRecord,
          type: 'CNAME',
          value: cdnCname,
          ttl: 600,
        });

        const dnsInstance: OssCdnDnsInstance = {
          sid: buildSid('aliyun', 'alidns', context.stage, dnsRecordId || primaryDomain),
          id: dnsRecordId || primaryDomain,
          type: ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
          domain: primaryDomain,
          cname: cdnCname,
          dnsRecordId: dnsRecordId || undefined,
        };
        instances.push(dnsInstance);
      }

      // Bind custom domain to OSS bucket for back-to-origin (internal, not DNS-facing)
      cnameInfo = await client.oss.bindCustomDomain(
        config.bucketName,
        primaryDomain,
        certificate,
        true,
      );
    } else if (isAccelerateEnabled) {
      // Accelerate-only: create DNS pointing to accelerated endpoint
      const accelerateEndpoint = await client.oss.getAccelerateEndpoint(config.bucketName);
      const dnsRecordId = await client.dns.addDomainRecord({
        domainName: mainDomain,
        rr: hostRecord,
        type: 'CNAME',
        value: accelerateEndpoint,
        ttl: 600,
      });

      const dnsInstance: OssCdnDnsInstance = {
        sid: buildSid('aliyun', 'alidns', context.stage, dnsRecordId || primaryDomain),
        id: dnsRecordId || primaryDomain,
        type: ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
        domain: primaryDomain,
        cname: accelerateEndpoint,
        dnsRecordId: dnsRecordId || undefined,
      };
      instances.push(dnsInstance);

      cnameInfo = {
        domain: primaryDomain,
        cname: accelerateEndpoint,
        dnsRecordId: dnsRecordId || undefined,
        bucketCnameBound: false,
      };
    } else {
      // Direct OSS domain binding (existing behavior)
      if (certificate) {
        logger.info(
          lang.__('OSS_BUCKET_CERT_BINDING', {
            domain: primaryDomain,
            bucketName: config.bucketName,
          }),
        );
      }

      cnameInfo = await client.oss.bindCustomDomain(config.bucketName, primaryDomain, certificate);

      if (cnameInfo) {
        const instanceId = cnameInfo.dnsRecordId ?? primaryDomain;
        const dnsInstance: OssDnsInstance = {
          sid: buildSid('aliyun', 'alidns', context.stage, instanceId),
          id: instanceId,
          type: ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
          domain: primaryDomain,
          cname: cnameInfo.cname,
          ...(cnameInfo.dnsRecordId ? { dnsRecordId: cnameInfo.dnsRecordId } : {}),
          ...(cnameInfo.txtRecordId ? { txtRecordId: cnameInfo.txtRecordId } : {}),
        };
        instances.push(dnsInstance);
      }
    }

    const wwwDomain = wwwBindApex ? deriveWwwDomain(primaryDomain) : null;
    if (wwwDomain) {
      logger.info(
        lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
          domain: wwwDomain,
          bucketName: config.bucketName,
        }),
      );

      if (isCdnEnabled) {
        const originEndpoint = isAccelerateEnabled
          ? await client.oss.getAccelerateEndpoint(config.bucketName)
          : await client.oss.getBucketCnameEndpoint(config.bucketName);

        await client.cdn.addCdnDomain({
          domainName: wwwDomain,
          cdnType: resolvedCdnType,
          sources: [{ type: 'oss', content: originEndpoint }],
          scope: resolvedScope,
        });

        const wwwCdnInfo = await client.cdn.describeCdnDomainDetail(wwwDomain);

        if (cdnObj) {
          if (cdnObj.cache_ttl != null || cdnObj.ignore_query_string != null) {
            await client.cdn.applyCacheConfig(
              wwwDomain,
              cdnObj.cache_ttl,
              cdnObj.ignore_query_string,
            );
          }
          if (cdnObj.origin_protocol) {
            await client.cdn.applyProtocolConfig(wwwDomain, cdnObj.origin_protocol);
          }
          if (cdnObj.compression != null) {
            await client.cdn.applyCompression(wwwDomain, cdnObj.compression);
          }
          if (cdnObj.force_redirect_https != null) {
            await client.cdn.applyHttpsRedirect(wwwDomain, cdnObj.force_redirect_https);
          }
        }

        if (certificate) {
          await client.cdn.setDomainServerCertificate(wwwDomain, {
            serverCertificate: certificate.certificateBody,
            privateKey: certificate.certificatePrivateKey,
            serverCertificateStatus: 'on',
          });
        }

        if (wwwCdnInfo?.cname) {
          const wwwMainDomain = extractMainDomain(wwwDomain);
          const wwwHostRecord = extractHostRecord(wwwDomain, wwwMainDomain);

          const wwwDnsRecordId = await client.dns.addDomainRecord({
            domainName: wwwMainDomain,
            rr: wwwHostRecord,
            type: 'CNAME',
            value: wwwCdnInfo.cname,
            ttl: 600,
          });

          const wwwCdnInstance: OssCdnInstance = {
            sid: buildSid('aliyun', 'cdn', context.stage, wwwDomain),
            id: wwwDomain,
            type: ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
            domainName: wwwDomain,
            cname: wwwCdnInfo.cname,
          };
          instances.push(wwwCdnInstance);

          const wwwDnsInstance: OssCdnDnsInstance = {
            sid: buildSid('aliyun', 'alidns', context.stage, wwwDnsRecordId || wwwDomain),
            id: wwwDnsRecordId || wwwDomain,
            type: ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
            domain: wwwDomain,
            cname: wwwCdnInfo.cname,
            dnsRecordId: wwwDnsRecordId || undefined,
          };
          instances.push(wwwDnsInstance);
        }
      } else {
        const wwwCnameInfo = await client.oss.bindCustomDomain(
          config.bucketName,
          wwwDomain,
          certificate,
        );

        if (wwwCnameInfo) {
          const wwwInstanceId = wwwCnameInfo.dnsRecordId ?? wwwDomain;
          const wwwDnsInstance: OssDnsInstance = {
            sid: buildSid('aliyun', 'alidns', context.stage, wwwInstanceId),
            id: wwwInstanceId,
            type: ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
            domain: wwwDomain,
            cname: wwwCnameInfo.cname,
            isWwwVariant: true,
            ...(wwwCnameInfo.dnsRecordId ? { dnsRecordId: wwwCnameInfo.dnsRecordId } : {}),
            ...(wwwCnameInfo.txtRecordId ? { txtRecordId: wwwCnameInfo.txtRecordId } : {}),
          };
          instances.push(wwwDnsInstance);
        }
      }
    }

    // Refresh bucket info to capture auto-added CORS rule
    bucketInfo = await client.oss.getBucket(config.bucketName);
    if (bucketInfo) {
      instances[0] = buildOssInstanceFromProvider(bucketInfo, sid);
    }
  }

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
      logger.error(lang.__('FAILED_TO_UPLOAD_BUCKET_FILES', { error: String(error) }));
      logger.info(lang.__('OSS_BUCKET_TRACKED_CAN_RETRY'));
    }
  }

  // Apply IAM bucket policy if configured
  await applyBucketPolicy(client, bucket);

  const finalResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: {
      ...extractOssBucketDefinition(config, websiteCodeHash),
      ...(domainName != null ? { domainBound: cnameInfo?.bucketCnameBound ?? null } : {}),
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, finalResourceState);
};

/* istanbul ignore next */
export const readBucketResource = async (context: Context, bucketName: string) => {
  const client = createAliyunClient(context);
  return await client.oss.getBucket(bucketName);
};

/* istanbul ignore next */
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
    throw new Error(
      lang.__('FAILED_TO_REFRESH_STATE', { resourceType: 'bucket', name: config.bucketName }),
    );
  }

  const sid = buildSid('aliyun', 'oss', context.stage, config.bucketName);
  const logicalId = `buckets.${bucket.key}`;

  const instances: Array<ResourceInstance> = [buildOssInstanceFromProvider(bucketInfo, sid)];

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const existingState = state.resources[logicalId];
  const domName = getDomainName(bucket);
  const isCdnEnabled = getIsCdnEnabled(bucket);
  const isAccelerateEnabled = getIsAccelerateEnabled(bucket);

  const existingCdnInstances = existingState?.instances?.filter(
    (i) => i.type === ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
  ) as OssCdnInstance[] | undefined;

  const existingDnsInstances = existingState?.instances?.filter(
    (i) =>
      i.type === ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME ||
      i.type === ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
  ) as (OssDnsInstance | OssCdnDnsInstance)[] | undefined;
  const existingPrimaryDnsInstance = existingDnsInstances?.find(
    (i) => !(i as OssDnsInstance).isWwwVariant,
  );
  const existingWwwDnsInstance = existingDnsInstances?.find(
    (i) => (i as OssDnsInstance).isWwwVariant,
  );

  let cnameInfo: OssCnameInfo | undefined;

  if (domName) {
    const primaryDomain = domName;
    const wwwBindApex = bucket.domain?.www_bind_apex ?? bucket.website?.www_bind_apex ?? false;
    const domainChanged = existingPrimaryDnsInstance?.domain !== primaryDomain;

    if (domainChanged) {
      // For CDN/accelerate buckets, don't delete old resources since we can't recreate them in update.
      // The user must destroy+recreate to change the CDN domain.
      if (!isCdnEnabled && !isAccelerateEnabled) {
        // Clean up old CDN distributions
        if (existingCdnInstances) {
          for (const cdnInstance of existingCdnInstances) {
            try {
              await client.cdn.deleteCdnDomain(cdnInstance.domainName);
            } catch {
              /* best effort */
            }
          }
        }
        // Clean up old DNS bindings
        if (existingDnsInstances) {
          for (const instance of existingDnsInstances) {
            const ossInstance = instance as OssDnsInstance;
            await client.oss.unbindCustomDomain(
              config.bucketName,
              ossInstance.domain,
              ossInstance.dnsRecordId,
              ossInstance.txtRecordId,
            );
          }
        }
      }
    }

    const certificate = await resolveBucketDomainCertificate(bucket, client);

    logger.info(
      lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
        domain: primaryDomain,
        bucketName: config.bucketName,
      }),
    );
    if (certificate) {
      logger.info(
        lang.__('OSS_BUCKET_CERT_BINDING', {
          domain: primaryDomain,
          bucketName: config.bucketName,
        }),
      );
    }

    // Fail fast if CDN/accelerate was enabled but is now being removed
    // (must use destroy+recreate to change CDN/accelerate configuration)
    if (!isCdnEnabled && !isAccelerateEnabled) {
      const existingDef = existingState?.definition as Record<string, unknown> | undefined;
      const cdnWasEnabled = existingDef?.cdnEnabled === true;
      const accelWasEnabled = existingDef?.accelerateEnabled === true;
      if (cdnWasEnabled || accelWasEnabled) {
        throw new Error(
          lang.__('CDN_ACCELERATE_CONFIG_CHANGED', {
            bucketName: config.bucketName,
          }),
        );
      }
    }

    if (isCdnEnabled || isAccelerateEnabled) {
      const existingDef = existingState?.definition as Record<string, unknown> | undefined;
      const cdnWasEnabled = existingDef?.cdnEnabled === true;
      const accelWasEnabled = existingDef?.accelerateEnabled === true;
      const oldDomain = existingDef?.domain as string | undefined;
      const oldCdnType = existingDef?.cdnType as string | undefined;
      const oldCdnScope = existingDef?.cdnScope as string | undefined;
      const oldCacheTtl = existingDef?.cdnCacheTtl as number | undefined;
      const oldIgnoreQS = existingDef?.cdnIgnoreQueryString as boolean | undefined;
      const oldOriginProto = existingDef?.cdnOriginProtocol as string | undefined;
      const oldCompression = existingDef?.cdnCompression as boolean | undefined;
      const oldHttpsRedirect = existingDef?.cdnForceRedirectHttps as boolean | undefined;

      const enableChanged =
        cdnWasEnabled !== isCdnEnabled || accelWasEnabled !== isAccelerateEnabled;
      const domainChanged = oldDomain !== primaryDomain;
      if (enableChanged || domainChanged) {
        throw new Error(
          lang.__('CDN_ACCELERATE_CONFIG_CHANGED', {
            bucketName: config.bucketName,
          }),
        );
      }

      const cdnConfig = typeof bucket.domain?.cdn === 'object' ? bucket.domain.cdn : undefined;
      const resolvedCdnType = cdnConfig?.cdn_type ?? 'web';
      const resolvedScope = cdnConfig?.scope ?? 'global';

      if (isCdnEnabled) {
        if (
          oldCdnType !== (cdnConfig?.cdn_type ?? 'web') ||
          oldCdnScope !== (cdnConfig?.scope ?? 'global')
        ) {
          await client.cdn.modifyCdnDomain({
            domainName: primaryDomain,
            cdnType: resolvedCdnType,
            scope: resolvedScope,
            sources: [
              {
                type: 'oss',
                content: isAccelerateEnabled
                  ? await client.oss.getAccelerateEndpoint(config.bucketName)
                  : await client.oss.getBucketCnameEndpoint(config.bucketName),
              },
            ],
          });
        }
        if (
          oldCacheTtl !== cdnConfig?.cache_ttl ||
          oldIgnoreQS !== cdnConfig?.ignore_query_string
        ) {
          await client.cdn.applyCacheConfig(
            primaryDomain,
            cdnConfig?.cache_ttl,
            cdnConfig?.ignore_query_string,
          );
        }
        if (oldOriginProto !== cdnConfig?.origin_protocol) {
          await client.cdn.applyProtocolConfig(primaryDomain, cdnConfig?.origin_protocol);
        }
        if (oldCompression !== cdnConfig?.compression) {
          await client.cdn.applyCompression(primaryDomain, cdnConfig?.compression);
        }
        if (oldHttpsRedirect !== cdnConfig?.force_redirect_https) {
          await client.cdn.applyHttpsRedirect(primaryDomain, cdnConfig?.force_redirect_https);
        }
      }

      const existingCdnDnsInstances = existingState?.instances?.filter(
        (i) =>
          i.type === ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION ||
          i.type === ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
      );
      const filteredInstances = wwwBindApex
        ? (existingCdnDnsInstances ?? [])
        : (existingCdnDnsInstances ?? []).filter(
            (i) => !(i as { isWwwVariant?: boolean }).isWwwVariant,
          );
      if (filteredInstances.length > 0) {
        instances.push(...filteredInstances);
      }

      return setResource(state, logicalId, {
        mode: 'managed',
        region: context.region,
        definition: {
          ...extractOssBucketDefinition(config, websiteCodeHash),
          ...(domName != null ? { domainBound: cnameInfo?.bucketCnameBound ?? null } : {}),
        },
        instances,
        lastUpdated: new Date().toISOString(),
      });
    } else {
      cnameInfo = await client.oss.bindCustomDomain(config.bucketName, primaryDomain, certificate);

      if (cnameInfo) {
        const instanceId = cnameInfo.dnsRecordId ?? primaryDomain;
        const dnsInstance: OssDnsInstance = {
          sid: buildSid('aliyun', 'alidns', context.stage, instanceId),
          id: instanceId,
          type: ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
          domain: primaryDomain,
          cname: cnameInfo.cname,
          ...(cnameInfo.dnsRecordId ? { dnsRecordId: cnameInfo.dnsRecordId } : {}),
          ...(cnameInfo.txtRecordId ? { txtRecordId: cnameInfo.txtRecordId } : {}),
        };
        instances.push(dnsInstance);
      }
    }

    const wwwDomain = wwwBindApex ? deriveWwwDomain(primaryDomain) : null;
    if (wwwDomain) {
      logger.info(
        lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
          domain: wwwDomain,
          bucketName: config.bucketName,
        }),
      );

      const wwwCnameInfo = await client.oss.bindCustomDomain(
        config.bucketName,
        wwwDomain,
        certificate,
      );

      if (wwwCnameInfo) {
        const wwwInstanceId = wwwCnameInfo.dnsRecordId ?? wwwDomain;
        const wwwDnsInstance: OssDnsInstance = {
          sid: buildSid('aliyun', 'alidns', context.stage, wwwInstanceId),
          id: wwwInstanceId,
          type: ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
          domain: wwwDomain,
          cname: wwwCnameInfo.cname,
          isWwwVariant: true,
          ...(wwwCnameInfo.dnsRecordId ? { dnsRecordId: wwwCnameInfo.dnsRecordId } : {}),
          ...(wwwCnameInfo.txtRecordId ? { txtRecordId: wwwCnameInfo.txtRecordId } : {}),
        };
        instances.push(wwwDnsInstance);
      }
    } else if (existingWwwDnsInstance && !wwwBindApex) {
      const wwwInstance = existingWwwDnsInstance as OssDnsInstance;
      await client.oss.unbindCustomDomain(
        config.bucketName,
        wwwInstance.domain,
        wwwInstance.dnsRecordId,
        wwwInstance.txtRecordId,
      );
    }

    const refreshedInfo = await client.oss.getBucket(config.bucketName);
    if (refreshedInfo) {
      instances[0] = buildOssInstanceFromProvider(refreshedInfo, sid);
    }
  } else if (existingDnsInstances) {
    for (const instance of existingDnsInstances) {
      const ossInstance = instance as OssDnsInstance;
      await client.oss.unbindCustomDomain(
        config.bucketName,
        ossInstance.domain,
        ossInstance.dnsRecordId,
        ossInstance.txtRecordId,
      );
    }
  }

  // Apply IAM bucket policy if configured (update or remove)
  const existingDef = existingState?.definition as Record<string, unknown> | undefined;
  const oldPolicyJson = existingDef?.policy as string | undefined;
  const newPolicyJson = bucket.iam ? JSON.stringify(bucket.iam) : null;
  if (newPolicyJson !== (oldPolicyJson ?? null)) {
    if (newPolicyJson) {
      logger.info(lang.__('BUCKET_POLICY_APPLYING', { bucketName: config.bucketName }));
      const policyObj = buildOssBucketPolicyJson(bucket.iam);
      if (policyObj) {
        await client.oss.putBucketPolicy(config.bucketName, policyObj);
        logger.info(lang.__('BUCKET_POLICY_APPLIED', { bucketName: config.bucketName }));
      } else {
        // iam exists but has no statements — delete any existing policy
        await deleteBucketPolicy(client, config.bucketName);
      }
    } else {
      await deleteBucketPolicy(client, config.bucketName);
    }
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: {
      ...extractOssBucketDefinition(config, websiteCodeHash),
      ...(domName != null ? { domainBound: cnameInfo?.bucketCnameBound ?? null } : {}),
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

/* istanbul ignore next */
export const deleteBucketResource = async (
  context: Context,
  bucketName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createAliyunClient(context);

  const existingState = state.resources[logicalId];
  const dnsInstances = existingState?.instances?.filter(
    (i) => i.type === ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
  ) as OssDnsInstance[] | undefined;

  // Clean up CDN distributions if any
  const cdnInstances = existingState?.instances?.filter(
    (i) => i.type === ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
  ) as OssCdnInstance[] | undefined;

  if (cdnInstances) {
    for (const cdnInstance of cdnInstances) {
      try {
        await client.cdn.deleteCdnDomain(cdnInstance.domainName);
        logger.info(lang.__('CDN_DOMAIN_DELETED', { domain: cdnInstance.domainName }));
      } catch (error) {
        logger.warn(
          lang.__('CDN_DOMAIN_DELETE_FAILED', {
            domain: cdnInstance.domainName,
            error: String(error),
          }),
        );
      }
    }
  }

  // Clean up CDN DNS CNAME records
  const cdnDnsInstances = existingState?.instances?.filter(
    (i) => i.type === ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
  ) as OssCdnDnsInstance[] | undefined;

  if (cdnDnsInstances && client.dns) {
    for (const dnsInstance of cdnDnsInstances) {
      if (dnsInstance.dnsRecordId) {
        try {
          await client.dns.deleteDomainRecord(dnsInstance.dnsRecordId);
        } catch {
          // Best effort cleanup
        }
      }
    }
  }

  // Clean up bucket policy before deleting bucket
  await deleteBucketPolicy(client, bucketName);

  if (dnsInstances) {
    for (const dnsInstance of dnsInstances) {
      await client.oss.unbindCustomDomain(
        bucketName,
        dnsInstance.domain,
        dnsInstance.dnsRecordId,
        dnsInstance.txtRecordId,
      );
    }
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

import { buildBucketPolicy, isOwnedBucketPolicy } from '../../common/bucketPolicy';
import { mergeManagedIntent } from '../../common/planCompare';
import { withLifecycleIntent } from '../../common/functionDefinition';
import {
  buildStoredBindings,
  cdnDeliveryChanged,
  desiredBindingMode,
  getBindingCdnOptions,
  groupBindingInstances,
  isBindingCdnEnabled,
  shouldDeployBindingCertificate,
  type BindingInstanceGroup,
  type StoredBinding,
} from '../../common/bindingReconcile';
import { mapCdnScope } from '../../common/cdnCapabilities';
import { resolveBindingCertificateHash } from '../../common/certUtils';
import { createAliyunClient } from '../../common/aliyunClient';
import {
  OssBucketInfo,
  OssCnameCertificateConfig,
  OssCnameInfo,
} from '../../common/aliyunClient/ossOperations';
import {
  setResource,
  removeResource,
  buildSid,
  computeDirectoryHash,
  getResource,
} from '../../common';
import { readPemContent, warnInlinePem } from '../../common/certUtils';
import {
  Context,
  BucketDomain,
  CdnConfig,
  BucketDomainBinding,
  ResourceState,
  StateFile,
  ResourceInstance,
  ResourceAttributes,
  ResourceTypeEnum,
  PartialResourceError,
} from '../../types';
import {
  OSS_BUCKET_POLICY_INSTANCE_TYPE,
  bucketToOssBucketConfig,
  extractOssBucketDefinition,
} from './ossTypes';
import { CommonBucketInstance } from '../bucketTypes';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import path from 'node:path';
import { extractMainDomain, extractHostRecord, normalizeHostname } from '../../common/domainUtils';

type OssDnsInstance = ResourceInstance & {
  type: 'ALIYUN_OSS_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
  txtRecordId?: string;
  /** Legacy marker from the removed www_bind_apex shortcut; plain bindings replaced it. */
  isWwwVariant?: boolean;
};

type OssCdnInstance = ResourceInstance & {
  type: 'ALIYUN_CDN_DISTRIBUTION';
  domainName: string;
  cname?: string;
  pending?: boolean;
};

type OssCdnDnsInstance = ResourceInstance & {
  type: 'ALIYUN_CDN_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
};

// getBucket returns tags as { key, value } (BucketTag); the ownership helper
// expects { Key, Value }. Convert before verification.
const toOwnershipTags = (
  tags: OssBucketInfo['tags'],
): Array<{ Key?: string; Value?: string }> | undefined =>
  tags?.map((tag) => ({ Key: tag.key, Value: tag.value }));

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
    policy: info.policy ?? null,
  };
};

const resolveBindingCertificate = async (
  binding: BucketDomainBinding,
  client: ReturnType<typeof createAliyunClient>,
): Promise<OssCnameCertificateConfig | undefined> => {
  if (binding.certificate_id) {
    const detail = await client.cas.getCertificate(binding.certificate_id);
    if (!detail || !detail.cert || !detail.key) {
      throw new Error(lang.__('CERT_REFERENCE_NOT_FOUND', { reference: binding.certificate_id }));
    }
    return { certificateBody: detail.cert, certificatePrivateKey: detail.key };
  }

  if (binding.certificate_body && binding.certificate_private_key) {
    const body = readPemContent(binding.certificate_body);
    const key = readPemContent(binding.certificate_private_key);
    warnInlinePem(binding.certificate_private_key);
    return { certificateBody: body, certificatePrivateKey: key };
  }

  return undefined;
};

const buildOssBucketPolicyJson = (iam: BucketDomain['iam']): Record<string, unknown> | null =>
  buildBucketPolicy(iam, 'aliyun');

const buildOssPolicyInstance = (context: Context, bucketName: string): ResourceInstance => ({
  sid: buildSid('aliyun', 'oss-policy', context.stage, bucketName),
  type: OSS_BUCKET_POLICY_INSTANCE_TYPE,
  id: bucketName,
});

const applyBucketPolicy = async (
  client: ReturnType<typeof createAliyunClient>,
  bucket: BucketDomain,
): Promise<void> => {
  if (!bucket.iam) return;
  const policy = buildOssBucketPolicyJson(bucket.iam);
  if (!policy) {
    if (bucket.iam.resource.statements.length === 0) await deleteBucketPolicy(client, bucket.name);
    return;
  }
  logger.info(lang.__('BUCKET_POLICY_APPLYING', { bucketName: bucket.name }));
  await client.oss.putBucketPolicy(bucket.name, policy);
  logger.info(lang.__('BUCKET_POLICY_APPLIED', { bucketName: bucket.name }));
};

const deleteBucketPolicy = async (
  client: ReturnType<typeof createAliyunClient>,
  bucketName: string,
): Promise<void> => {
  await client.oss.deleteBucketPolicy(bucketName);
  logger.info(lang.__('BUCKET_POLICY_DELETED', { bucketName }));
};

/* istanbul ignore next */
export const createBucketResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToOssBucketConfig(bucket);
  const client = createAliyunClient(context);

  const sid = buildSid('aliyun', 'oss', context.stage, config.bucketName);
  const logicalId = `buckets.${bucket.key}`;

  // Stamp the ownership tag into the create config so the provider records who
  // owns the bucket. A later deploy whose local state was reset can then adopt
  // it idempotently (PutBucket is idempotent) only when the tag matches — a
  // same-named untagged bucket is never silently taken over.
  config.Tags = [{ Key: OWNERSHIP_TAG_KEY, Value: buildOwnershipTagValue(context, logicalId) }];

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const existingResourceState = getResource(state, logicalId);
  const isTainted = existingResourceState?.status === 'tainted';
  let existingBucketOnRetry = isTainted ? await client.oss.getBucket(config.bucketName) : null;

  if (existingBucketOnRetry) {
    logger.info(
      lang.__('TAINTED_RECOVERY_SKIP_CREATE', {
        resourceType: 'Bucket',
        resourceName: config.bucketName,
      }),
    );
  }

  if (existingBucketOnRetry && existingResourceState) {
    return updateBucketResource(context, bucket, state);
  }

  const instances: Array<ResourceInstance> = [];

  const hasBindings = (bucket.domains?.length ?? 0) > 0;

  const partialResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: {
      ...extractOssBucketDefinition(config, websiteCodeHash),
      ...(hasBindings ? { domainBound: null } : {}),
    },
    instances,
    lastUpdated: new Date().toISOString(),
    status: 'tainted',
  };

  const stateAfterDependents = setResource(state, logicalId, partialResourceState);

  const refuseAdoptionError = (): Error =>
    new Error(
      lang.__('RESOURCE_EXISTS_NOT_OWNED_ADOPT', {
        resourceType: 'Bucket',
        resourceName: config.bucketName,
        tagKey: OWNERSHIP_TAG_KEY,
      }),
    );

  let anyBindingBound: boolean | undefined;

  try {
    if (!existingBucketOnRetry) {
      try {
        await client.oss.createBucket({
          bucketName: config.bucketName,
          acl: config.acl,
          websiteConfig: config.websiteConfig,
          storageClass: config.storageClass,
          Tags: config.Tags,
        });
      } catch (error) {
        if (
          isResourceAlreadyExistsError(error, ['BucketAlreadyExists', 'BucketAlreadyOwnedByYou'])
        ) {
          // Idempotent adoption: a same-named bucket already exists in the
          // provider. Adopt it ONLY if it carries our ownership tag (proves a
          // previous run of THIS stack created it — e.g. state was reset). An
          // untagged bucket may belong to another project, so it must fail
          // loudly rather than silently taking it over (destroy would then
          // remove a resource that was never ours).
          const probe = await client.oss.getBucket(config.bucketName);
          if (probe && isOwnedByStack(context, logicalId, toOwnershipTags(probe.tags))) {
            existingBucketOnRetry = probe;
            logger.info(
              lang.__('RESOURCE_OWNERSHIP_TAG_ADOPT', {
                resourceType: 'Bucket',
                name: config.bucketName,
                tag: OWNERSHIP_TAG_KEY,
              }),
            );
          } else {
            throw new PartialResourceError(stateAfterDependents, refuseAdoptionError());
          }
        } else {
          throw error;
        }
      }
    }

    // Refresh state from provider to get bucket info
    let bucketInfo = existingBucketOnRetry ?? null;
    if (!bucketInfo) {
      bucketInfo = await client.oss.getBucket(config.bucketName);
      if (!bucketInfo) {
        throw new Error(
          lang.__('FAILED_TO_REFRESH_STATE', { resourceType: 'bucket', name: config.bucketName }),
        );
      }
      // PutBucket is idempotent within the same region/account, so a
      // "successful" create does NOT prove we created the bucket — it may have
      // pre-existed. Verify ownership; an untagged bucket is refused rather
      // than silently adopted.
      if (!isOwnedByStack(context, logicalId, toOwnershipTags(bucketInfo.tags))) {
        throw new PartialResourceError(stateAfterDependents, refuseAdoptionError());
      }
    }
    instances[0] = buildOssInstanceFromProvider(bucketInfo, sid);

    // Bucket-level transfer acceleration (issue #279)
    if (bucket.accelerate === true) {
      logger.info(lang.__('ENABLING_OSS_TRANSFER_ACCELERATION', { bucketName: config.bucketName }));
      const accelEnabled = await client.oss.enableTransferAcceleration(config.bucketName);
      if (!accelEnabled) {
        throw new Error(
          lang.__('FAILED_TO_ENABLE_ACCELERATION', { bucketName: config.bucketName }),
        );
      }
    }

    for (const binding of bucket.domains ?? []) {
      const bound = await createBindingResources(
        context,
        client,
        config.bucketName,
        binding,
        bucket.accelerate === true,
        instances,
      );
      if (bound != null) anyBindingBound = anyBindingBound ?? true;
      if (bound === false) anyBindingBound = false;
    }

    // Refresh bucket info to capture auto-added CORS rules from the bindings
    if (hasBindings) {
      bucketInfo = await client.oss.getBucket(config.bucketName);
      if (bucketInfo) {
        instances[0] = buildOssInstanceFromProvider(bucketInfo, sid);
      }
    }

    if (bucket.website?.code) {
      const codePath = path.resolve(process.cwd(), bucket.website.code);
      await client.oss.uploadFiles(config.bucketName, codePath);

      // Refresh state after upload to get updated info
      bucketInfo = await client.oss.getBucket(config.bucketName);
      if (bucketInfo) {
        instances[0] = buildOssInstanceFromProvider(bucketInfo, sid);
      }
    }

    // Apply IAM bucket policy if configured
    await applyBucketPolicy(client, bucket);
    if (buildOssBucketPolicyJson(bucket.iam)) {
      instances.push(buildOssPolicyInstance(context, bucket.name));
    }
  } catch (error) {
    // Refusal/adoption errors already carry the tainted state — rethrow as-is
    // instead of wrapping a PartialResourceError inside another one.
    if (error instanceof PartialResourceError) throw error;
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }

  const finalResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: {
      ...extractOssBucketDefinition(config, websiteCodeHash),
      ...(hasBindings ? { domainBound: anyBindingBound == null ? null : anyBindingBound } : {}),
    },
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(stateAfterDependents, logicalId, finalResourceState);
};

/* istanbul ignore next */
export const readBucketResource = async (context: Context, bucketName: string) => {
  const client = createAliyunClient(context);
  return await client.oss.getBucket(bucketName);
};

// ---------------------------------------------------------------------------
// Per-binding reconcile (issue #279; core extracted to common/bindingReconcile)
// ---------------------------------------------------------------------------

/** Aliyun instance-group view over the shared binding group shape. */
type AliyunBindingGroup = BindingInstanceGroup & {
  cdn?: OssCdnInstance;
  cdnDns?: OssCdnDnsInstance;
  dns?: OssDnsInstance;
};

const asAliyunGroup = (group?: BindingInstanceGroup): AliyunBindingGroup | undefined =>
  group as AliyunBindingGroup | undefined;

const bindingInstanceHostname = (instance: ResourceInstance): string =>
  normalizeHostname(String((instance as { domainName?: string }).domainName ?? instance.domain));

const ALIYUN_BINDING_ROLE_BY_TYPE: Record<string, keyof BindingInstanceGroup> = {
  [ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME]: 'dns',
  [ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION]: 'cdn',
  [ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME]: 'cdnDns',
};

const LEGACY_BINDING_FIELDS = [
  'domain',
  'wwwBindApex',
  'domainCertificateId',
  'domainCertificateBody',
  'domainCertificatePrivateKey',
  'domainProtocol',
  'cdnEnabled',
  'cdnType',
  'cdnScope',
  'cdnCacheTtl',
  'cdnIgnoreQueryString',
  'cdnOriginProtocol',
  'cdnCompression',
  'cdnForceRedirectHttps',
  'accelerateEnabled',
];

const storedAccelerationEnabled = (definition: ResourceAttributes): boolean =>
  (definition.accelerate ?? definition.accelerateEnabled) === true;

/** Legacy single-domain definitions (pre-v1 state) migrate in place. */
const aliyunLegacyBinding = (definition: ResourceAttributes): StoredBinding | undefined => {
  const legacy = definition as Record<string, unknown>;
  if (Array.isArray(legacy.domains) || typeof legacy.domain !== 'string' || !legacy.domain) {
    return undefined;
  }
  const hostname = normalizeHostname(legacy.domain);
  const cdnEnabled = legacy.cdnEnabled === true;
  const accelerate = storedAccelerationEnabled(definition);
  return {
    hostname,
    mode: cdnEnabled ? 'cdn' : accelerate ? 'accelerate-only' : 'direct',
    ...(cdnEnabled
      ? {
          cdn: {
            enabled: true,
            cdn_type: (legacy.cdnType as CdnConfig['cdn_type']) ?? 'web',
            scope: (legacy.cdnScope as CdnConfig['scope']) ?? 'global',
            ...(legacy.cdnCacheTtl != null ? { cache_ttl: legacy.cdnCacheTtl as number } : {}),
            ...(legacy.cdnIgnoreQueryString != null
              ? { ignore_query_string: legacy.cdnIgnoreQueryString as boolean }
              : {}),
            ...(legacy.cdnOriginProtocol != null
              ? { origin_protocol: legacy.cdnOriginProtocol as CdnConfig['origin_protocol'] }
              : {}),
            ...(legacy.cdnCompression != null
              ? { compression: legacy.cdnCompression as boolean }
              : {}),
            ...(legacy.cdnForceRedirectHttps != null
              ? { force_redirect_https: legacy.cdnForceRedirectHttps as boolean }
              : {}),
          },
        }
      : {}),
    ...(typeof legacy.domainCertificateId === 'string' && legacy.domainCertificateId
      ? { certId: legacy.domainCertificateId }
      : {}),
  };
};

const applyCdnOptions = async (
  client: ReturnType<typeof createAliyunClient>,
  hostname: string,
  cdnObj: CdnConfig | undefined,
): Promise<void> => {
  if (cdnObj?.cache_ttl != null || cdnObj?.ignore_query_string != null) {
    await client.cdn.applyCacheConfig(hostname, cdnObj?.cache_ttl, cdnObj?.ignore_query_string);
  }
  if (cdnObj?.origin_protocol) {
    await client.cdn.applyProtocolConfig(hostname, cdnObj.origin_protocol);
  }
  if (cdnObj?.compression != null) {
    await client.cdn.applyCompression(hostname, cdnObj.compression);
  }
  if (cdnObj?.force_redirect_https != null) {
    await client.cdn.applyHttpsRedirect(hostname, cdnObj.force_redirect_https);
  }
};

const deployCdnCertificate = async (
  client: ReturnType<typeof createAliyunClient>,
  hostname: string,
  certificate: OssCnameCertificateConfig,
): Promise<void> => {
  logger.info(lang.__('CDN_DEPLOYING_CERTIFICATE', { domain: hostname }));
  await client.cdn.setDomainServerCertificate(hostname, {
    serverCertificate: certificate.certificateBody,
    privateKey: certificate.certificatePrivateKey,
    serverCertificateStatus: 'on',
  });
};

const resolveCdnOriginEndpoint = async (
  client: ReturnType<typeof createAliyunClient>,
  bucketName: string,
  accelerate: boolean,
): Promise<string> =>
  accelerate
    ? await client.oss.getAccelerateEndpoint(bucketName)
    : await client.oss.getBucketCnameEndpoint(bucketName);

const recordOssBinding = (
  context: Context,
  hostname: string,
  info: OssCnameInfo | undefined,
  instances: Array<ResourceInstance>,
  previous?: OssDnsInstance,
  separateDns = false,
): void => {
  if (!info && !previous) return;
  const dnsRecordId = separateDns ? undefined : (info?.dnsRecordId ?? previous?.dnsRecordId);
  const txtRecordId = info?.txtRecordId ?? previous?.txtRecordId;
  const id = dnsRecordId ?? hostname;
  instances.push({
    sid: buildSid('aliyun', separateDns ? 'oss-cname' : 'alidns', context.stage, id),
    id,
    type: ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
    domain: hostname,
    cname: info?.cname ?? previous!.cname,
    ...(dnsRecordId ? { dnsRecordId } : {}),
    ...(txtRecordId ? { txtRecordId } : {}),
  } satisfies OssDnsInstance);
};

const ensureDeliveryDns = async (
  context: Context,
  client: ReturnType<typeof createAliyunClient>,
  hostname: string,
  cname: string,
  instances: Array<ResourceInstance>,
  previous?: OssCdnDnsInstance | OssDnsInstance,
): Promise<void> => {
  const config = {
    domainName: extractMainDomain(hostname),
    rr: extractHostRecord(hostname, extractMainDomain(hostname)),
    type: 'CNAME',
    value: cname,
    ttl: 600,
  };
  let dnsRecordId = previous?.dnsRecordId;
  const index = instances.length;
  if (dnsRecordId) {
    instances.push({
      sid: previous!.sid,
      id: dnsRecordId,
      type: ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
      domain: hostname,
      cname: previous!.cname,
      dnsRecordId,
    } satisfies OssCdnDnsInstance);
    if (previous?.cname !== cname) await client.dns.updateDomainRecord(dnsRecordId, config);
  } else {
    dnsRecordId = await client.dns.addDomainRecord(config);
  }
  const id = dnsRecordId || hostname;
  instances[index] = {
    sid: buildSid('aliyun', 'alidns', context.stage, id),
    id,
    type: ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
    domain: hostname,
    cname,
    ...(dnsRecordId ? { dnsRecordId } : {}),
  } satisfies OssCdnDnsInstance;
};

const createCdnBinding = async (
  context: Context,
  client: ReturnType<typeof createAliyunClient>,
  bucketName: string,
  binding: BucketDomainBinding,
  accelerate: boolean,
  certificate: OssCnameCertificateConfig | undefined,
  instances: Array<ResourceInstance>,
): Promise<boolean | undefined> => {
  const hostname = binding.domain_name;
  const cdnObj = getBindingCdnOptions(binding);
  const originEndpoint = await resolveCdnOriginEndpoint(client, bucketName, accelerate);
  logger.info(lang.__('CREATING_CDN_DISTRIBUTION', { domain: hostname, origin: originEndpoint }));
  await client.cdn.addCdnDomain({
    domainName: hostname,
    cdnType: cdnObj?.cdn_type ?? 'web',
    sources: [{ type: 'oss', content: originEndpoint }],
    scope: mapCdnScope('aliyun', cdnObj?.scope),
  });
  return updateCdnBinding(
    context,
    client,
    bucketName,
    binding,
    accelerate,
    certificate,
    { hostname, mode: 'cdn', cdn: { ...cdnObj, enabled: true } },
    {
      cdn: {
        sid: buildSid('aliyun', 'cdn', context.stage, hostname),
        id: hostname,
        type: ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
        domainName: hostname,
        pending: true,
      },
    },
    instances,
  );
};

const updateCdnBinding = async (
  context: Context,
  client: ReturnType<typeof createAliyunClient>,
  bucketName: string,
  binding: BucketDomainBinding,
  accelerate: boolean,
  certificate: OssCnameCertificateConfig | undefined,
  stored: StoredBinding,
  group: BindingInstanceGroup | undefined,
  instances: Array<ResourceInstance>,
): Promise<boolean | undefined> => {
  const hostname = binding.domain_name;
  const cdnObj = getBindingCdnOptions(binding);
  const aliyunGroup = asAliyunGroup(group);
  const pending = aliyunGroup?.cdn?.pending === true;
  const distributionIndex = instances.length;
  instances.push({
    ...aliyunGroup?.cdn,
    sid: aliyunGroup?.cdn?.sid ?? buildSid('aliyun', 'cdn', context.stage, hostname),
    id: hostname,
    type: ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
    domainName: hostname,
    pending: true,
  } satisfies OssCdnInstance);

  if (cdnDeliveryChanged(stored.cdn, cdnObj)) {
    await client.cdn.modifyCdnDomain({
      domainName: hostname,
      cdnType: cdnObj?.cdn_type ?? 'web',
      scope: mapCdnScope('aliyun', cdnObj?.scope),
      sources: [
        { type: 'oss', content: await resolveCdnOriginEndpoint(client, bucketName, accelerate) },
      ],
    });
  }
  if (pending) {
    await applyCdnOptions(client, hostname, cdnObj);
  } else {
    // Omitted options resolve to their documented defaults (issue #283/#294
    // unified contract): cache_ttl/ignore_query_string → provider-default
    // cache behavior, origin_protocol → provider default, the boolean knobs
    // → off. The apply layer renders null as the default (aliyun: absence of
    // the config item), so a dropped option converges the cloud instead of
    // leaving the previous setting behind (same shape on tencent/volcengine).
    if (
      (stored.cdn?.cache_ttl ?? null) !== (cdnObj?.cache_ttl ?? null) ||
      (stored.cdn?.ignore_query_string ?? null) !== (cdnObj?.ignore_query_string ?? null)
    ) {
      await client.cdn.applyCacheConfig(
        hostname,
        cdnObj?.cache_ttl ?? null,
        cdnObj?.ignore_query_string ?? null,
      );
    }
    if ((stored.cdn?.origin_protocol ?? null) !== (cdnObj?.origin_protocol ?? null)) {
      await client.cdn.applyProtocolConfig(hostname, cdnObj?.origin_protocol ?? null);
    }
    if ((stored.cdn?.compression ?? null) !== (cdnObj?.compression ?? null)) {
      await client.cdn.applyCompression(hostname, cdnObj?.compression ?? false);
    }
    if ((stored.cdn?.force_redirect_https ?? null) !== (cdnObj?.force_redirect_https ?? null)) {
      await client.cdn.applyHttpsRedirect(hostname, cdnObj?.force_redirect_https ?? false);
    }
  }
  if (certificate) {
    const certificateHash = resolveBindingCertificateHash({
      certificate_id: binding.certificate_id,
      certificate_body: binding.certificate_body,
      certificate_private_key: binding.certificate_private_key,
    });
    if (
      shouldDeployBindingCertificate({
        pending,
        certificateId: binding.certificate_id,
        certificateHash,
        stored,
      })
    ) {
      await deployCdnCertificate(client, hostname, certificate);
    } else {
      logger.info(lang.__('CDN_CERT_UNCHANGED_SKIPPED', { domain: hostname }));
    }
  }

  if (aliyunGroup?.cdnDns) {
    instances.push(aliyunGroup.cdnDns);
  } else {
    const detail = await client.cdn.describeCdnDomainDetail(hostname);
    if (!detail?.cname) {
      throw new Error(
        lang.__('FAILED_TO_REFRESH_STATE', { resourceType: 'CDN domain', name: hostname }),
      );
    }
    await ensureDeliveryDns(context, client, hostname, detail.cname, instances);
    instances[distributionIndex] = { ...instances[distributionIndex], cname: detail.cname };
  }
  const cnameInfo = await client.oss.bindCustomDomain(bucketName, hostname, certificate, true);
  recordOssBinding(context, hostname, cnameInfo, instances, aliyunGroup?.dns, true);
  const { pending: _pending, ...ready } = instances[distributionIndex] as OssCdnInstance;
  instances[distributionIndex] = ready;
  return cnameInfo?.bucketCnameBound;
};

const createAccelerateOnlyBinding = async (
  context: Context,
  client: ReturnType<typeof createAliyunClient>,
  bucketName: string,
  binding: BucketDomainBinding,
  certificate: OssCnameCertificateConfig | undefined,
  instances: Array<ResourceInstance>,
  group?: BindingInstanceGroup,
): Promise<boolean | undefined> => {
  const hostname = binding.domain_name;
  const cnameInfo = await client.oss.bindCustomDomain(bucketName, hostname, certificate, true);
  const aliyunGroup = asAliyunGroup(group);
  recordOssBinding(context, hostname, cnameInfo, instances, aliyunGroup?.dns, true);
  const endpoint = await client.oss.getAccelerateEndpoint(bucketName);
  await ensureDeliveryDns(
    context,
    client,
    hostname,
    endpoint,
    instances,
    aliyunGroup?.cdnDns ?? aliyunGroup?.dns,
  );
  return cnameInfo?.bucketCnameBound;
};

const createDirectBinding = async (
  context: Context,
  client: ReturnType<typeof createAliyunClient>,
  bucketName: string,
  binding: BucketDomainBinding,
  certificate: OssCnameCertificateConfig | undefined,
  instances: Array<ResourceInstance>,
  previous?: OssDnsInstance,
): Promise<boolean | undefined> => {
  const hostname = binding.domain_name;
  if (certificate) {
    logger.info(
      lang.__('OSS_BUCKET_CERT_BINDING', {
        domain: hostname,
        bucketName,
      }),
    );
  }

  const cnameInfo = await client.oss.bindCustomDomain(bucketName, hostname, certificate);
  recordOssBinding(context, hostname, cnameInfo, instances, previous);
  return cnameInfo?.bucketCnameBound;
};

const teardownBinding = async (
  client: ReturnType<typeof createAliyunClient>,
  bucketName: string,
  stored: StoredBinding,
  group: BindingInstanceGroup | undefined,
): Promise<void> => {
  if (!group) return;
  const aliyunGroup = asAliyunGroup(group);
  if (stored.mode === 'cdn') {
    const distributionName = aliyunGroup?.cdn?.domainName ?? stored.hostname;
    try {
      await client.cdn.deleteCdnDomain(distributionName);
    } catch (error) {
      if ((error as { code?: string })?.code !== 'InvalidDomain.NotFound') throw error;
    }
    logger.info(lang.__('CDN_DOMAIN_DELETED', { domain: distributionName }));
    if (aliyunGroup?.cdnDns?.dnsRecordId) {
      await client.dns.deleteDomainRecord(aliyunGroup.cdnDns.dnsRecordId);
    }
    await client.oss.unbindCustomDomain(
      bucketName,
      stored.hostname,
      undefined,
      aliyunGroup?.dns?.txtRecordId,
    );
    return;
  }

  if (stored.mode === 'accelerate-only') {
    if (aliyunGroup?.cdnDns?.dnsRecordId) {
      await client.dns.deleteDomainRecord(aliyunGroup.cdnDns.dnsRecordId);
    }
    await client.oss.unbindCustomDomain(
      bucketName,
      stored.hostname,
      undefined,
      aliyunGroup?.dns?.txtRecordId,
    );
    return;
  }

  // direct binding
  const domain = aliyunGroup?.dns?.domain ?? stored.hostname;
  await client.oss.unbindCustomDomain(
    bucketName,
    domain,
    aliyunGroup?.dns?.dnsRecordId,
    aliyunGroup?.dns?.txtRecordId,
  );
};

const createBindingResources = async (
  context: Context,
  client: ReturnType<typeof createAliyunClient>,
  bucketName: string,
  binding: BucketDomainBinding,
  accelerate: boolean,
  instances: Array<ResourceInstance>,
): Promise<boolean | undefined> => {
  const certificate = await resolveBindingCertificate(binding, client);
  const hostname = normalizeHostname(binding.domain_name);

  logger.info(
    lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
      domain: hostname,
      bucketName,
    }),
  );

  if (isBindingCdnEnabled(binding)) {
    return createCdnBinding(
      context,
      client,
      bucketName,
      { ...binding, domain_name: hostname },
      accelerate,
      certificate,
      instances,
    );
  }
  if (accelerate) {
    return createAccelerateOnlyBinding(
      context,
      client,
      bucketName,
      { ...binding, domain_name: hostname },
      certificate,
      instances,
    );
  }
  return createDirectBinding(
    context,
    client,
    bucketName,
    { ...binding, domain_name: hostname },
    certificate,
    instances,
  );
};

// A binding switching between CDN and non-CDN delivery on the same hostname is
// reconciled at binding level (issue #283): the previous delivery group is torn
// down and rebuilt in the new mode — the bucket and unrelated bindings stay.

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
  const existingState = state.resources[logicalId];

  const instances: Array<ResourceInstance> = [buildOssInstanceFromProvider(bucketInfo, sid)];

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const desiredBindings = bucket.domains ?? [];
  const desiredAccelerate = bucket.accelerate === true;
  const groups = groupBindingInstances(existingState?.instances, ALIYUN_BINDING_ROLE_BY_TYPE);

  const storedAccelerate = storedAccelerationEnabled(existingState?.definition ?? {});
  const storedBindings = buildStoredBindings(existingState, groups, {
    accelerateEnabled: storedAccelerate,
    legacyBinding: aliyunLegacyBinding,
  });

  // Transfer acceleration cannot be disabled through update, and enabling it
  // under existing CDN bindings would orphan their origins (the CDN origin
  // endpoint was chosen at creation) — both fail loudly instead of drifting.
  if (
    (storedAccelerate && !desiredAccelerate) ||
    (!storedAccelerate &&
      desiredAccelerate &&
      [...storedBindings.values()].some((b) => b.mode === 'cdn'))
  ) {
    throw new Error(lang.__('CDN_ACCELERATE_CONFIG_CHANGED', { bucketName: config.bucketName }));
  }

  const removedHosts = new Set<string>();
  let accelerationEnabled = storedAccelerate;
  try {
    if (desiredAccelerate && !storedAccelerate) {
      logger.info(lang.__('ENABLING_OSS_TRANSFER_ACCELERATION', { bucketName: config.bucketName }));
      const accelEnabled = await client.oss.enableTransferAcceleration(config.bucketName);
      if (!accelEnabled) {
        throw new Error(
          lang.__('FAILED_TO_ENABLE_ACCELERATION', { bucketName: config.bucketName }),
        );
      }
    }

    accelerationEnabled = desiredAccelerate;
    let anyBindingBound: boolean | undefined;
    const trackBindingResult = (bound: boolean | undefined): void => {
      if (bound == null) return;
      anyBindingBound = anyBindingBound ?? true;
      if (bound === false) anyBindingBound = false;
    };

    for (const rawBinding of desiredBindings) {
      const hostname = normalizeHostname(rawBinding.domain_name);
      const binding = { ...rawBinding, domain_name: hostname };
      let stored = storedBindings.get(hostname);
      const cdnEnabled = isBindingCdnEnabled(binding);

      // Binding-level delivery-mode switch (issue #283): tear the previous
      // delivery group down and rebuild in the new mode below.
      if (
        stored &&
        stored.mode !== desiredBindingMode(cdnEnabled, desiredAccelerate) &&
        !(stored.mode === 'direct' && desiredAccelerate && !cdnEnabled)
      ) {
        await teardownBinding(client, config.bucketName, stored, groups.get(hostname));
        stored = undefined;
      }

      const certificate = await resolveBindingCertificate(binding, client);
      logger.info(
        lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
          domain: hostname,
          bucketName: config.bucketName,
        }),
      );

      if (cdnEnabled) {
        trackBindingResult(
          stored?.mode === 'cdn' && groups.get(hostname)?.cdn
            ? await updateCdnBinding(
                context,
                client,
                config.bucketName,
                binding,
                desiredAccelerate,
                certificate,
                stored,
                groups.get(hostname),
                instances,
              )
            : await createCdnBinding(
                context,
                client,
                config.bucketName,
                binding,
                desiredAccelerate,
                certificate,
                instances,
              ),
        );
      } else if (desiredAccelerate) {
        trackBindingResult(
          await createAccelerateOnlyBinding(
            context,
            client,
            config.bucketName,
            binding,
            certificate,
            instances,
            groups.get(hostname),
          ),
        );
      } else {
        trackBindingResult(
          await createDirectBinding(
            context,
            client,
            config.bucketName,
            binding,
            certificate,
            instances,
            asAliyunGroup(groups.get(hostname))?.dns,
          ),
        );
      }
    }

    // Converge removed bindings: any stored binding no longer declared is torn down.
    const desiredHosts = new Set(desiredBindings.map((b) => normalizeHostname(b.domain_name)));
    for (const [hostname, stored] of storedBindings) {
      if (desiredHosts.has(hostname)) continue;
      logger.info(
        lang.__('BINDING_REMOVING_DOMAIN', { domain: hostname, bucketName: config.bucketName }),
      );
      await teardownBinding(client, config.bucketName, stored, groups.get(hostname));
      removedHosts.add(hostname);
    }

    const hasBindings = desiredBindings.length > 0;

    const policy = buildOssBucketPolicyJson(bucket.iam);
    const policyOwned = isOwnedBucketPolicy(
      OSS_BUCKET_POLICY_INSTANCE_TYPE,
      existingState?.instances,
      existingState?.definition,
    );
    if (policy) {
      await client.oss.putBucketPolicy(config.bucketName, policy);
      instances.push(buildOssPolicyInstance(context, config.bucketName));
    } else if (policyOwned || bucket.iam?.resource?.statements !== undefined) {
      await deleteBucketPolicy(client, config.bucketName);
    }

    const refreshedInfo = await client.oss.getBucket(config.bucketName);
    if (refreshedInfo) {
      instances[0] = buildOssInstanceFromProvider(refreshedInfo, sid);
    }

    const definitionIntent = {
      ...extractOssBucketDefinition(config, websiteCodeHash),
      ...(hasBindings ? { domainBound: anyBindingBound == null ? null : anyBindingBound } : {}),
    };
    const resourceState: ResourceState = {
      mode: 'managed',
      region: context.region,
      definition: withLifecycleIntent(
        mergeManagedIntent(existingState?.definition ?? {}, definitionIntent),
        definitionIntent,
        ['policy', 'domainBound', ...LEGACY_BINDING_FIELDS],
      ),
      instances,
      lastUpdated: new Date().toISOString(),
    };

    return setResource(state, logicalId, resourceState);
  } catch (error) {
    const previousDefinition = existingState?.definition ?? {};
    const previousDomains = previousDefinition.domains;
    const legacyRemoved =
      typeof previousDefinition.domain === 'string' &&
      removedHosts.has(normalizeHostname(previousDefinition.domain));
    const recoveryDefinition = {
      ...previousDefinition,
      bucketName: config.bucketName,
      ...(Array.isArray(previousDomains)
        ? {
            domains: previousDomains.filter(
              (entry) =>
                typeof entry?.domain_name !== 'string' ||
                !removedHosts.has(normalizeHostname(entry.domain_name)),
            ),
          }
        : legacyRemoved
          ? { domains: [] }
          : {}),
      accelerate: accelerationEnabled,
      domainBound: false,
    };
    const bindingTypes = new Set<string>([
      ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME,
      ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
      ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME,
    ]);
    const retainedInstances = new Map(
      [...(existingState?.instances ?? []), ...instances]
        .filter(
          (instance) =>
            !bindingTypes.has(String(instance.type)) ||
            !removedHosts.has(bindingInstanceHostname(instance)),
        )
        .map((instance) => [
          bindingTypes.has(String(instance.type))
            ? `${instance.type}:${bindingInstanceHostname(instance)}`
            : instance.sid,
          instance,
        ]),
    );
    throw new PartialResourceError(
      setResource(state, logicalId, {
        ...existingState,
        mode: 'managed',
        region: context.region,
        definition: recoveryDefinition,
        instances: [...retainedInstances.values()],
        lastUpdated: new Date().toISOString(),
        status: 'ready',
      }),
      error instanceof Error ? error : new Error(String(error)),
    );
  }
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
  const groups = groupBindingInstances(existingState?.instances, ALIYUN_BINDING_ROLE_BY_TYPE);
  const storedBindings = buildStoredBindings(existingState, groups, {
    accelerateEnabled: storedAccelerationEnabled(existingState?.definition ?? {}),
    legacyBinding: aliyunLegacyBinding,
  });

  for (const [hostname, stored] of storedBindings) {
    await teardownBinding(client, bucketName, stored, groups.get(hostname));
  }

  // Clean up bucket policy before deleting bucket
  await deleteBucketPolicy(client, bucketName);

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

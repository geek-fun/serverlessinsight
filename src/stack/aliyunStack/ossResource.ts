import { buildBucketPolicy, isOwnedBucketPolicy } from '../../common/bucketPolicy';
import { mergeManagedIntent } from '../../common/planCompare';
import { withLifecycleIntent } from '../../common/functionDefinition';
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
// Per-binding reconcile (issue #279)
// ---------------------------------------------------------------------------

/** Per-binding CDN configuration as declared (object form) or implied by the boolean shorthand. */
type BindingCdnConfig = {
  enabled: boolean;
  cdn_type?: 'web' | 'download' | 'video';
  scope?: 'domestic' | 'overseas' | 'global';
  cache_ttl?: number;
  ignore_query_string?: boolean;
  origin_protocol?: 'http' | 'https' | 'follow';
  compression?: boolean;
  force_redirect_https?: boolean;
};

/** Stored per-binding view reconstructed from state; identity is the normalized hostname. */
type StoredBinding = {
  hostname: string;
  mode: 'cdn' | 'direct' | 'accelerate-only';
  cdn?: BindingCdnConfig;
  certId?: string;
};

type BindingInstanceGroup = {
  cdn?: OssCdnInstance;
  cdnDns?: OssCdnDnsInstance;
  ossDns?: OssDnsInstance;
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

const isBindingCdnEnabled = (binding: BucketDomainBinding): boolean =>
  binding.cdn === true || (typeof binding.cdn === 'object' && binding.cdn.enabled === true);

const instanceHostname = (instance: ResourceInstance): string =>
  normalizeHostname(String((instance as { domainName?: string }).domainName ?? instance.domain));

const groupBindingInstances = (
  instances: Array<ResourceInstance> | undefined,
): Map<string, BindingInstanceGroup> => {
  const groups = new Map<string, BindingInstanceGroup>();
  (instances ?? []).forEach((instance) => {
    if (
      instance.type !== ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME &&
      instance.type !== ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION &&
      instance.type !== ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME
    ) {
      return;
    }
    const hostname = instanceHostname(instance);
    const group = groups.get(hostname) ?? {};
    if (instance.type === ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION) {
      group.cdn = instance as OssCdnInstance;
    } else if (instance.type === ResourceTypeEnum.ALIYUN_CDN_DNS_CNAME) {
      group.cdnDns = instance as OssCdnDnsInstance;
    } else {
      group.ossDns = instance as OssDnsInstance;
    }
    groups.set(hostname, group);
  });
  return groups;
};

/** Definition-first (new `domains` array or legacy flat keys), instance types as fallback. */
const buildStoredBindings = (
  existingState: ResourceState | undefined,
  groups: Map<string, BindingInstanceGroup>,
): Map<string, StoredBinding> => {
  const stored = new Map<string, StoredBinding>();
  const definition = (existingState?.definition ?? {}) as Record<string, unknown>;
  const storedAccelerate = storedAccelerationEnabled(definition);

  const domains = Array.isArray(definition.domains)
    ? (definition.domains as Array<Record<string, unknown>>)
    : [];
  domains.forEach((entry) => {
    if (typeof entry?.domain_name !== 'string') return;
    const hostname = normalizeHostname(entry.domain_name);
    const cdn = typeof entry.cdn === 'object' && entry.cdn !== null ? { ...entry.cdn } : undefined;
    const cdnEnabled = (cdn as { enabled?: boolean } | undefined)?.enabled === true;
    stored.set(hostname, {
      hostname,
      mode: cdnEnabled ? 'cdn' : storedAccelerate ? 'accelerate-only' : 'direct',
      ...(cdn ? { cdn: cdn as StoredBinding['cdn'] } : {}),
      ...(typeof entry.certificate_id === 'string' && entry.certificate_id
        ? { certId: entry.certificate_id }
        : {}),
    });
  });

  // Legacy single-domain definitions (pre-v1 state) migrate in place.
  if (
    !Array.isArray(definition.domains) &&
    typeof definition.domain === 'string' &&
    definition.domain
  ) {
    const hostname = normalizeHostname(definition.domain);
    if (!stored.has(hostname)) {
      const cdnEnabled = definition.cdnEnabled === true;
      stored.set(hostname, {
        hostname,
        mode: cdnEnabled ? 'cdn' : storedAccelerate ? 'accelerate-only' : 'direct',
        ...(cdnEnabled
          ? {
              cdn: {
                enabled: true,
                cdn_type: (definition.cdnType as 'web' | 'download' | 'video') ?? 'web',
                scope: (definition.cdnScope as 'domestic' | 'overseas' | 'global') ?? 'global',
                ...(definition.cdnCacheTtl != null
                  ? { cache_ttl: definition.cdnCacheTtl as number }
                  : {}),
                ...(definition.cdnIgnoreQueryString != null
                  ? { ignore_query_string: definition.cdnIgnoreQueryString as boolean }
                  : {}),
                ...(definition.cdnOriginProtocol != null
                  ? { origin_protocol: definition.cdnOriginProtocol as 'http' | 'https' | 'follow' }
                  : {}),
                ...(definition.cdnCompression != null
                  ? { compression: definition.cdnCompression as boolean }
                  : {}),
                ...(definition.cdnForceRedirectHttps != null
                  ? { force_redirect_https: definition.cdnForceRedirectHttps as boolean }
                  : {}),
              },
            }
          : {}),
        ...(typeof definition.domainCertificateId === 'string' && definition.domainCertificateId
          ? { certId: definition.domainCertificateId }
          : {}),
      });
    }
  }

  // Drift repair: binding instances recorded in state without a definition
  // entry (e.g. hand-edited state) are adopted as stored bindings by hostname.
  groups.forEach((group, hostname) => {
    if (stored.has(hostname)) return;
    const mode: StoredBinding['mode'] = group.cdn
      ? 'cdn'
      : group.ossDns
        ? storedAccelerate
          ? 'accelerate-only'
          : 'direct'
        : 'cdn';
    stored.set(hostname, { hostname, mode });
  });

  return stored;
};

const applyCdnOptions = async (
  client: ReturnType<typeof createAliyunClient>,
  hostname: string,
  cdnObj: Partial<NonNullable<StoredBinding['cdn']>> | undefined,
): Promise<void> => {
  if (!cdnObj) return;
  if (cdnObj.cache_ttl != null || cdnObj.ignore_query_string != null) {
    await client.cdn.applyCacheConfig(hostname, cdnObj.cache_ttl, cdnObj.ignore_query_string);
  }
  if (cdnObj.origin_protocol) {
    await client.cdn.applyProtocolConfig(hostname, cdnObj.origin_protocol);
  }
  if (cdnObj.compression != null) {
    await client.cdn.applyCompression(hostname, cdnObj.compression);
  }
  if (cdnObj.force_redirect_https != null) {
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
  const cdnObj = typeof binding.cdn === 'object' ? binding.cdn : undefined;
  const originEndpoint = await resolveCdnOriginEndpoint(client, bucketName, accelerate);
  logger.info(lang.__('CREATING_CDN_DISTRIBUTION', { domain: hostname, origin: originEndpoint }));
  await client.cdn.addCdnDomain({
    domainName: hostname,
    cdnType: cdnObj?.cdn_type ?? 'web',
    sources: [{ type: 'oss', content: originEndpoint }],
    scope: cdnObj?.scope ?? 'global',
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
  const cdnObj = typeof binding.cdn === 'object' ? binding.cdn : undefined;
  const pending = group?.cdn?.pending === true;
  const distributionIndex = instances.length;
  instances.push({
    ...group?.cdn,
    sid: group?.cdn?.sid ?? buildSid('aliyun', 'cdn', context.stage, hostname),
    id: hostname,
    type: ResourceTypeEnum.ALIYUN_CDN_DISTRIBUTION,
    domainName: hostname,
    pending: true,
  } satisfies OssCdnInstance);

  if (
    (stored.cdn?.cdn_type ?? 'web') !== (cdnObj?.cdn_type ?? 'web') ||
    (stored.cdn?.scope ?? 'global') !== (cdnObj?.scope ?? 'global')
  ) {
    await client.cdn.modifyCdnDomain({
      domainName: hostname,
      cdnType: cdnObj?.cdn_type ?? 'web',
      scope: cdnObj?.scope ?? 'global',
      sources: [
        { type: 'oss', content: await resolveCdnOriginEndpoint(client, bucketName, accelerate) },
      ],
    });
  }
  if (pending) {
    await applyCdnOptions(client, hostname, cdnObj);
  } else {
    if (
      (stored.cdn?.cache_ttl ?? null) !== (cdnObj?.cache_ttl ?? null) ||
      (stored.cdn?.ignore_query_string ?? null) !== (cdnObj?.ignore_query_string ?? null)
    ) {
      await client.cdn.applyCacheConfig(hostname, cdnObj?.cache_ttl, cdnObj?.ignore_query_string);
    }
    if ((stored.cdn?.origin_protocol ?? null) !== (cdnObj?.origin_protocol ?? null)) {
      await client.cdn.applyProtocolConfig(hostname, cdnObj?.origin_protocol);
    }
    if ((stored.cdn?.compression ?? null) !== (cdnObj?.compression ?? null)) {
      await client.cdn.applyCompression(hostname, cdnObj?.compression);
    }
    if ((stored.cdn?.force_redirect_https ?? null) !== (cdnObj?.force_redirect_https ?? null)) {
      await client.cdn.applyHttpsRedirect(hostname, cdnObj?.force_redirect_https);
    }
  }
  if (
    certificate &&
    (pending || !binding.certificate_id || stored.certId !== binding.certificate_id)
  ) {
    await deployCdnCertificate(client, hostname, certificate);
  }

  if (group?.cdnDns) {
    instances.push(group.cdnDns);
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
  recordOssBinding(context, hostname, cnameInfo, instances, group?.ossDns, true);
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
  recordOssBinding(context, hostname, cnameInfo, instances, group?.ossDns, true);
  const endpoint = await client.oss.getAccelerateEndpoint(bucketName);
  await ensureDeliveryDns(
    context,
    client,
    hostname,
    endpoint,
    instances,
    group?.cdnDns ?? group?.ossDns,
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
  if (stored.mode === 'cdn') {
    const distributionName = group?.cdn?.domainName ?? stored.hostname;
    try {
      await client.cdn.deleteCdnDomain(distributionName);
    } catch (error) {
      if ((error as { code?: string })?.code !== 'InvalidDomain.NotFound') throw error;
    }
    logger.info(lang.__('CDN_DOMAIN_DELETED', { domain: distributionName }));
    if (group?.cdnDns?.dnsRecordId) {
      await client.dns.deleteDomainRecord(group.cdnDns.dnsRecordId);
    }
    await client.oss.unbindCustomDomain(
      bucketName,
      stored.hostname,
      undefined,
      group?.ossDns?.txtRecordId,
    );
    return;
  }

  if (stored.mode === 'accelerate-only') {
    if (group?.cdnDns?.dnsRecordId) {
      await client.dns.deleteDomainRecord(group.cdnDns.dnsRecordId);
    }
    await client.oss.unbindCustomDomain(
      bucketName,
      stored.hostname,
      undefined,
      group?.ossDns?.txtRecordId,
    );
    return;
  }

  // direct binding
  const domain = group?.ossDns?.domain ?? stored.hostname;
  await client.oss.unbindCustomDomain(
    bucketName,
    domain,
    group?.ossDns?.dnsRecordId,
    group?.ossDns?.txtRecordId,
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

// A binding may not silently switch between CDN and non-CDN delivery on the
// same hostname: the update path cannot recreate the CDN distribution/DNS
// pair in place, so the switch fails loudly (destroy+recreate instead).
const guardBindingModeSwitch = (
  stored: StoredBinding,
  cdnEnabled: boolean,
  bucketName: string,
): void => {
  if (cdnEnabled !== (stored.mode === 'cdn')) {
    throw new Error(lang.__('CDN_ACCELERATE_CONFIG_CHANGED', { bucketName }));
  }
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
  const existingState = state.resources[logicalId];

  const instances: Array<ResourceInstance> = [buildOssInstanceFromProvider(bucketInfo, sid)];

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const desiredBindings = bucket.domains ?? [];
  const desiredAccelerate = bucket.accelerate === true;
  const groups = groupBindingInstances(existingState?.instances);
  const storedBindings = buildStoredBindings(existingState, groups);

  const storedAccelerate = storedAccelerationEnabled(existingState?.definition ?? {});

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
      const stored = storedBindings.get(hostname);
      const cdnEnabled = isBindingCdnEnabled(binding);

      if (stored) {
        guardBindingModeSwitch(stored, cdnEnabled, config.bucketName);
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
        if (stored?.mode === 'accelerate-only') {
          await teardownBinding(client, config.bucketName, stored, groups.get(hostname));
        }
        trackBindingResult(
          await createDirectBinding(
            context,
            client,
            config.bucketName,
            binding,
            certificate,
            instances,
            groups.get(hostname)?.ossDns,
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
            !removedHosts.has(instanceHostname(instance)),
        )
        .map((instance) => [
          bindingTypes.has(String(instance.type))
            ? `${instance.type}:${instanceHostname(instance)}`
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
  const groups = groupBindingInstances(existingState?.instances);
  const storedBindings = buildStoredBindings(existingState, groups);

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

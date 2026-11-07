import { mergeManagedIntent } from '../../common/planCompare';
import { buildBucketPolicy, isOwnedBucketPolicy } from '../../common/bucketPolicy';
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
import { mapCdnScope, mapOriginProtocol } from '../../common/cdnCapabilities';
import { resolveBindingCertificateHash } from '../../common/certUtils';
import {
  Context,
  BucketDomain,
  BucketDomainBinding,
  PartialResourceError,
  ResourceState,
  StateFile,
  ResourceInstance,
  ResourceTypeEnum,
} from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import type { TencentCdnOriginConfig } from '../../common/tencentClient/cdnOperations';
import {
  COS_BUCKET_POLICY_INSTANCE_TYPE,
  bucketToCosBucketConfig,
  extractCosBucketDefinition,
  CosBucketInfo,
} from './cosTypes';
import { setResource, removeResource, buildSid } from '../../common';
import { readPemContent, warnInlinePem } from '../../common/certUtils';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import { extractHostRecord, extractMainDomain, normalizeHostname } from '../../common/domainUtils';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';

const buildCosBucketPolicyJson = (iam: BucketDomain['iam']): Record<string, unknown> | null =>
  buildBucketPolicy(iam, 'tencent');

const buildCosPolicyInstance = (context: Context, bucketName: string): ResourceInstance => ({
  sid: buildSid('tencent', 'cos-policy', context.stage, bucketName),
  type: COS_BUCKET_POLICY_INSTANCE_TYPE,
  id: bucketName,
});

const applyBucketPolicy = async (
  client: ReturnType<typeof createTencentClient>,
  bucket: BucketDomain,
  region: string,
  owned = false,
): Promise<void> => {
  const policy = buildCosBucketPolicyJson(bucket.iam);
  if (!policy) {
    if (owned || bucket.iam?.resource?.statements !== undefined) {
      await deleteBucketPolicy(client, bucket.name, region);
    }
    return;
  }
  logger.info(lang.__('BUCKET_POLICY_APPLYING', { bucketName: bucket.name }));
  await client.cos.putBucketPolicy(bucket.name, region, policy);
  logger.info(lang.__('BUCKET_POLICY_APPLIED', { bucketName: bucket.name }));
};

const deleteBucketPolicy = async (
  client: ReturnType<typeof createTencentClient>,
  bucketName: string,
  region: string,
): Promise<void> => {
  try {
    await client.cos.deleteBucketPolicy(bucketName, region);
    logger.info(lang.__('BUCKET_POLICY_DELETED', { bucketName }));
  } catch (err) {
    const errorCode = (err as { code?: string })?.code;
    const statusCode = (err as { statusCode?: number })?.statusCode;
    if (errorCode === 'NoSuchBucket' || statusCode === 404) {
      logger.warn(
        lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Bucket', name: bucketName }),
      );
      return;
    }
    throw err;
  }
};

type CosDnsInstance = ResourceInstance & {
  type: 'TENCENT_COS_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
  /** Legacy marker from the removed www_bind_apex shortcut; plain bindings replaced it. */
  isWwwVariant?: boolean;
};

type CosCdnInstance = ResourceInstance & {
  type: 'TENCENT_CDN_DOMAIN';
  domainName: string;
  cname?: string;
  pending?: boolean;
};

type CosCdnDnsInstance = ResourceInstance & {
  type: 'TENCENT_CDN_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
};

/** Tencent instance-group view over the shared binding group shape. */
type TencentBindingGroup = BindingInstanceGroup & {
  cdn?: CosCdnInstance;
  cdnDns?: CosCdnDnsInstance;
  dns?: CosDnsInstance;
};

const asTencentGroup = (group?: BindingInstanceGroup): TencentBindingGroup | undefined =>
  group as TencentBindingGroup | undefined;

const TENCENT_BINDING_ROLE_BY_TYPE: Record<string, keyof BindingInstanceGroup> = {
  [ResourceTypeEnum.COS_DNS_CNAME]: 'dns',
  [ResourceTypeEnum.TENCENT_CDN_DOMAIN]: 'cdn',
  [ResourceTypeEnum.TENCENT_CDN_DNS_CNAME]: 'cdnDns',
};

/** Legacy single-domain definitions (pre-v1 state) migrate in place; legacy Tencent bindings were always direct. */
const tencentLegacyBinding = (
  definition: ResourceState['definition'],
): StoredBinding | undefined => {
  const legacy = definition as Record<string, unknown>;
  if (Array.isArray(legacy.domains) || typeof legacy.domain !== 'string' || !legacy.domain) {
    return undefined;
  }
  return { hostname: normalizeHostname(legacy.domain), mode: 'direct' };
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

const resolveBindingCertificate = (
  binding: BucketDomainBinding,
): CosResolvedCertificate | undefined => {
  if (binding.certificate_id) {
    logger.info(
      lang.__('CERT_RESOLVING_REFERENCE', {
        reference: binding.certificate_id,
        domain: binding.domain_name,
      }),
    );
    return {
      mode: 'reference',
      certificateId: binding.certificate_id,
    };
  }

  if (binding.certificate_body && binding.certificate_private_key) {
    const body = readPemContent(binding.certificate_body);
    const key = readPemContent(binding.certificate_private_key);
    warnInlinePem(binding.certificate_private_key);
    return {
      mode: 'upload',
      certificateName: binding.domain_name.replace(/\./g, '_'),
      certificateBody: body,
      certificatePrivateKey: key,
    };
  }

  return undefined;
};

const resolveCosCertificateId = async (
  client: ReturnType<typeof createTencentClient>,
  resolved: CosResolvedCertificate,
): Promise<string> => {
  if (resolved.mode === 'reference') {
    logger.info(
      lang.__('CERT_RESOLVED_REFERENCE', {
        name: resolved.certificateId,
        certId: resolved.certificateId,
      }),
    );
    return resolved.certificateId;
  }
  logger.info(
    lang.__('CERT_RESOLVED_UPLOAD', {
      name: resolved.certificateName,
    }),
  );
  // Repeatable: false — Tencent returns the existing certificate id when the
  // same content was uploaded before, so this is idempotent.
  const certInfo = await client.ssl.uploadCertificate(
    resolved.certificateName,
    resolved.certificateBody,
    resolved.certificatePrivateKey,
  );
  return certInfo.certificateId;
};

const deployCertificateToCosDomain = async (
  client: ReturnType<typeof createTencentClient>,
  resolved: CosResolvedCertificate,
  bucketName: string,
  domain: string,
  region: string,
): Promise<void> => {
  logger.info(lang.__('COS_BUCKET_CERT_DEPLOYING', { domain, bucketName }));

  const certificateId = await resolveCosCertificateId(client, resolved);

  const instanceId = `${region}|${bucketName}|${domain}`;
  await client.ssl.deployCertificateInstance(certificateId, 'cos', [instanceId]);
};

// v1 capability contract (issue #279): bucket-level transfer acceleration is
// implemented on aliyun OSS only; COS rejects it instead of ignoring it.
const guardCosCapabilities = (bucket: BucketDomain): void => {
  if (bucket.accelerate === true) {
    throw new Error(
      lang.__('BUCKET_ACCELERATE_PROVIDER_NOT_SUPPORTED', { key: bucket.key, provider: 'tencent' }),
    );
  }
};

const bindCosDomain = async (
  client: ReturnType<typeof createTencentClient>,
  bucket: BucketDomain,
  binding: BucketDomainBinding,
  context: Context,
  instances: Array<ResourceInstance>,
  stored?: StoredBinding,
): Promise<void> => {
  const resolved = resolveBindingCertificate(binding);

  logger.info(
    lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
      domain: binding.domain_name,
      bucketName: bucket.name,
    }),
  );
  const cnameInfo = await client.cos.bindCustomDomain(bucket.name, binding.domain_name);

  if (cnameInfo) {
    const instanceId = cnameInfo.dnsRecordId ?? binding.domain_name;
    instances.push({
      sid: buildSid('tencent', 'dnspod', context.stage, instanceId),
      id: instanceId,
      type: ResourceTypeEnum.COS_DNS_CNAME,
      domain: binding.domain_name,
      cname: cnameInfo.cname,
      ...(cnameInfo.dnsRecordId ? { dnsRecordId: cnameInfo.dnsRecordId } : {}),
    } satisfies CosDnsInstance);

    if (resolved && cnameInfo.bucketDomainBound) {
      // Certificate redeploys are keyed on content hash (issue #283): an
      // unchanged certificate must not re-hit the SSL APIs on every deploy.
      const certificateHash = resolveBindingCertificateHash({
        certificate_id: binding.certificate_id,
        certificate_body: binding.certificate_body,
        certificate_private_key: binding.certificate_private_key,
      });
      if (
        shouldDeployBindingCertificate({
          pending: false,
          certificateId: resolved.mode === 'reference' ? resolved.certificateId : undefined,
          certificateHash,
          stored,
        })
      ) {
        await deployCertificateToCosDomain(
          client,
          resolved,
          bucket.name,
          binding.domain_name,
          context.region,
        );
      } else {
        logger.info(lang.__('CDN_CERT_UNCHANGED_SKIPPED', { domain: binding.domain_name }));
      }
    }
  }
};

// ---------------------------------------------------------------------------
// Per-binding CDN delivery (issue #283)
// ---------------------------------------------------------------------------

const buildCosOrigin = (
  client: ReturnType<typeof createTencentClient>,
  bucketName: string,
  cdnObj: ReturnType<typeof getBindingCdnOptions>,
): TencentCdnOriginConfig => {
  const cosEndpoint = client.cos.getCosEndpoint(bucketName);
  return {
    originType: 'cos',
    origins: [cosEndpoint],
    serverName: cosEndpoint,
    ...(cdnObj?.origin_protocol
      ? { originPullProtocol: mapOriginProtocol('tencent', cdnObj.origin_protocol) }
      : {}),
  };
};

const ensureCdnDns = async (
  context: Context,
  client: ReturnType<typeof createTencentClient>,
  hostname: string,
  cname: string,
  instances: Array<ResourceInstance>,
  previous?: CosCdnDnsInstance,
): Promise<void> => {
  const mainDomain = extractMainDomain(hostname);
  const config = {
    domainName: mainDomain,
    rr: extractHostRecord(hostname, mainDomain),
    type: 'CNAME',
    value: cname,
    ttl: 600,
  };
  let dnsRecordId = previous?.dnsRecordId;
  const index = instances.length;
  if (dnsRecordId) {
    if (previous?.cname !== cname) {
      await client.dns.updateDomainRecord(mainDomain, dnsRecordId, config);
    }
  } else {
    dnsRecordId = await client.dns.addDomainRecord(config);
  }
  const id = dnsRecordId || hostname;
  instances[index] = {
    sid: buildSid('tencent', 'dnspod', context.stage, id),
    id,
    type: ResourceTypeEnum.TENCENT_CDN_DNS_CNAME,
    domain: hostname,
    cname,
    ...(dnsRecordId ? { dnsRecordId } : {}),
  } satisfies CosCdnDnsInstance;
};

const applyCdnOptions = async (
  client: ReturnType<typeof createTencentClient>,
  bucketName: string,
  hostname: string,
  cdnObj: ReturnType<typeof getBindingCdnOptions>,
): Promise<void> => {
  if (cdnObj?.cache_ttl != null || cdnObj?.ignore_query_string != null) {
    await client.cdn.applyCacheConfig(hostname, cdnObj?.cache_ttl, cdnObj?.ignore_query_string);
  }
  if (cdnObj?.compression != null) {
    await client.cdn.applyCompression(hostname, cdnObj.compression);
  }
  if (cdnObj?.force_redirect_https != null) {
    await client.cdn.applyHttpsRedirect(hostname, cdnObj.force_redirect_https);
  }
};

const createCdnBinding = async (
  context: Context,
  client: ReturnType<typeof createTencentClient>,
  bucket: BucketDomain,
  binding: BucketDomainBinding,
  certificate: CosResolvedCertificate | undefined,
  instances: Array<ResourceInstance>,
): Promise<boolean | undefined> => {
  const hostname = binding.domain_name;
  const cdnObj = getBindingCdnOptions(binding);
  const origin = buildCosOrigin(client, bucket.name, cdnObj);
  logger.info(
    lang.__('CREATING_CDN_DISTRIBUTION', { domain: hostname, origin: origin.origins[0] }),
  );
  try {
    await client.cdn.addCdnDomain({
      domainName: hostname,
      serviceType: cdnObj?.cdn_type ?? 'web',
      area: mapCdnScope('tencent', cdnObj?.scope),
      origin,
    });
  } catch (error) {
    // Partial-failure retry: a CDN domain created by an interrupted earlier run
    // must not block convergence — probe and continue as an update.
    const existing = await client.cdn.describeCdnDomain(hostname);
    if (!existing) throw error;
    logger.info(
      lang.__('RESOURCE_OWNERSHIP_TAG_ADOPT', {
        resourceType: 'CDN domain',
        name: hostname,
        tag: 'state',
      }),
    );
  }
  return updateCdnBinding(
    context,
    client,
    bucket,
    binding,
    certificate,
    { hostname, mode: 'cdn', cdn: { ...cdnObj, enabled: true } },
    {
      cdn: {
        sid: buildSid('tencent', 'cdn', context.stage, hostname),
        id: hostname,
        type: ResourceTypeEnum.TENCENT_CDN_DOMAIN,
        domainName: hostname,
        pending: true,
      },
    },
    instances,
  );
};

const updateCdnBinding = async (
  context: Context,
  client: ReturnType<typeof createTencentClient>,
  bucket: BucketDomain,
  binding: BucketDomainBinding,
  certificate: CosResolvedCertificate | undefined,
  stored: StoredBinding,
  group: BindingInstanceGroup | undefined,
  instances: Array<ResourceInstance>,
): Promise<boolean | undefined> => {
  const hostname = binding.domain_name;
  const cdnObj = getBindingCdnOptions(binding);
  const tencentGroup = asTencentGroup(group);
  const pending = tencentGroup?.cdn?.pending === true;
  const distributionIndex = instances.length;
  instances.push({
    ...tencentGroup?.cdn,
    sid: tencentGroup?.cdn?.sid ?? buildSid('tencent', 'cdn', context.stage, hostname),
    id: hostname,
    type: ResourceTypeEnum.TENCENT_CDN_DOMAIN,
    domainName: hostname,
    pending: true,
  } satisfies CosCdnInstance);

  // Tencent updates service type / acceleration area / origin in place via
  // UpdateDomainConfig — no distribution recreation needed.
  if (!pending && cdnDeliveryChanged(stored.cdn, cdnObj)) {
    await client.cdn.updateCdnDelivery(hostname, {
      serviceType: cdnObj?.cdn_type ?? 'web',
      area: mapCdnScope('tencent', cdnObj?.scope),
      origin: buildCosOrigin(client, bucket.name, cdnObj),
    });
  }
  const applyOptions = pending || cdnDeliveryChanged(stored.cdn, cdnObj);
  if (applyOptions) {
    await applyCdnOptions(client, bucket.name, hostname, cdnObj);
  } else {
    if (
      (stored.cdn?.cache_ttl ?? null) !== (cdnObj?.cache_ttl ?? null) ||
      (stored.cdn?.ignore_query_string ?? null) !== (cdnObj?.ignore_query_string ?? null)
    ) {
      await client.cdn.applyCacheConfig(hostname, cdnObj?.cache_ttl, cdnObj?.ignore_query_string);
    }
    if ((stored.cdn?.compression ?? null) !== (cdnObj?.compression ?? null)) {
      await client.cdn.applyCompression(hostname, cdnObj?.compression);
    }
    if ((stored.cdn?.force_redirect_https ?? null) !== (cdnObj?.force_redirect_https ?? null)) {
      await client.cdn.applyHttpsRedirect(hostname, cdnObj?.force_redirect_https);
    }
    if ((stored.cdn?.origin_protocol ?? null) !== (cdnObj?.origin_protocol ?? null)) {
      // An explicit origin config is required to reset the pull protocol; the
      // provider default when unset is plain http.
      await client.cdn.updateCdnDelivery(hostname, {
        origin: {
          ...buildCosOrigin(client, bucket.name, cdnObj),
          originPullProtocol: mapOriginProtocol('tencent', cdnObj?.origin_protocol) ?? 'http',
        },
      });
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
        certificateId: certificate.mode === 'reference' ? certificate.certificateId : undefined,
        certificateHash,
        stored,
      })
    ) {
      logger.info(lang.__('CDN_DEPLOYING_CERTIFICATE', { domain: hostname }));
      const certId = await resolveCosCertificateId(client, certificate);
      await client.ssl.deployCertificateInstance(certId, 'cdn', [hostname]);
      await client.cdn.enableHttps(hostname);
    } else {
      logger.info(lang.__('CDN_CERT_UNCHANGED_SKIPPED', { domain: hostname }));
    }
  }

  if (tencentGroup?.cdnDns) {
    instances.push(tencentGroup.cdnDns);
  } else {
    const detail = await client.cdn.describeCdnDomain(hostname);
    if (!detail?.cname) {
      throw new Error(
        lang.__('FAILED_TO_REFRESH_STATE', { resourceType: 'CDN domain', name: hostname }),
      );
    }
    await ensureCdnDns(context, client, hostname, detail.cname, instances);
    instances[distributionIndex] = { ...instances[distributionIndex], cname: detail.cname };
  }
  // The bucket keeps the domain bound (REST rule + CORS) so direct origin
  // checks and browser CORS keep working alongside CDN delivery.
  const cnameInfo = await client.cos.bindCustomDomain(bucket.name, hostname, { skipDns: true });
  const { pending: _pending, ...ready } = instances[distributionIndex] as CosCdnInstance;
  instances[distributionIndex] = ready;
  return cnameInfo?.bucketDomainBound;
};

const teardownCosBinding = async (
  client: ReturnType<typeof createTencentClient>,
  bucketName: string,
  stored: StoredBinding,
  group: BindingInstanceGroup | undefined,
): Promise<void> => {
  if (!group) return;
  const tencentGroup = asTencentGroup(group);
  if (stored.mode === 'cdn') {
    const distributionName = tencentGroup?.cdn?.domainName ?? stored.hostname;
    await client.cdn.deleteCdnDomain(distributionName);
    logger.info(lang.__('CDN_DOMAIN_DELETED', { domain: distributionName }));
    if (tencentGroup?.cdnDns?.dnsRecordId) {
      const mainDomain = extractMainDomain(stored.hostname);
      await client.dns
        .deleteDomainRecord(mainDomain, tencentGroup.cdnDns.dnsRecordId)
        .catch(() => undefined);
    }
    await client.cos.unbindCustomDomain(bucketName, stored.hostname);
    return;
  }

  // direct binding
  const domain = tencentGroup?.dns?.domain ?? stored.hostname;
  await client.cos.unbindCustomDomain(bucketName, domain, tencentGroup?.dns?.dnsRecordId);
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
    tags:
      info.Tags?.map((t) => ({
        key: t.Key,
        value: t.Value,
      })) ?? [],
    lifecycleConfiguration: info.LifecycleConfiguration
      ? {
          rules:
            info.LifecycleConfiguration.rules?.map((r) => ({
              id: r.id ?? null,
              status: r.status ?? null,
              prefix: r.prefix ?? null,
              expiration: r.expiration
                ? {
                    days: r.expiration.days ?? null,
                    date: r.expiration.date ?? null,
                    expiredObjectDeleteMarker: r.expiration.expiredObjectDeleteMarker ?? null,
                  }
                : {},
              transition: r.transition
                ? {
                    days: r.transition.days ?? null,
                    date: r.transition.date ?? null,
                    storageClass: r.transition.storageClass ?? null,
                  }
                : {},
            })) ?? [],
        }
      : {},
    loggingConfiguration: info.LoggingConfiguration
      ? {
          targetBucket: info.LoggingConfiguration.targetBucket ?? null,
          targetPrefix: info.LoggingConfiguration.targetPrefix ?? null,
        }
      : {},
    replicationConfiguration: info.ReplicationConfiguration
      ? {
          role: info.ReplicationConfiguration.role ?? null,
          rules:
            info.ReplicationConfiguration.rules?.map((r) => ({
              id: r.id ?? null,
              status: r.status ?? null,
              prefix: r.prefix ?? null,
              destination: r.destination
                ? {
                    bucket: r.destination.bucket ?? null,
                    storageClass: r.destination.storageClass ?? null,
                  }
                : {},
            })) ?? [],
        }
      : {},
    sseConfiguration: info.SseConfiguration
      ? {
          sseAlgorithm: info.SseConfiguration.sseAlgorithm ?? null,
          sseKmsMasterKeyId: info.SseConfiguration.sseKmsMasterKeyId ?? null,
        }
      : {},
    policy: info.Policy ?? null,
  };
};

export const createBucketResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToCosBucketConfig(bucket, context.region);

  const client = createTencentClient(context);

  const definition = extractCosBucketDefinition(config);
  const logicalId = `buckets.${bucket.key}`;

  // Stamp the ownership tag (sent as the x-cos-tagging header on PutBucket) so
  // a later run can idempotently adopt this bucket, and an unrelated same-named
  // bucket is never adopted.
  config.Tags = [{ Key: OWNERSHIP_TAG_KEY, Value: buildOwnershipTagValue(context, logicalId) }];

  const taintedResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [],
    lastUpdated: new Date().toISOString(),
    status: 'tainted',
  };

  const stateAfterDependents = setResource(state, logicalId, taintedResourceState);

  try {
    try {
      await client.cos.createBucket(config);
    } catch (error) {
      // COS PutBucket is idempotent for the same region/owner, so a collision
      // surfaces only for a different region/owner (BucketAlreadyExists /
      // BucketAlreadyOwnedByYou) — treat it as non-fatal and fall through to
      // the ownership probe below. Any other error propagates (outer catch
      // persists the tainted state).
      if (
        !isResourceAlreadyExistsError(error, ['BucketAlreadyExists', 'BucketAlreadyOwnedByYou'])
      ) {
        throw error;
      }
      logger.info(
        lang.__('OWNERSHIP_VERIFYING', { resourceType: 'Bucket', resourceName: bucket.name }),
      );
    }

    const bucketInfo = await client.cos.getBucket(bucket.name, context.region);
    if (!bucketInfo) {
      throw new Error(lang.__('REFRESH_STATE_BUCKET', { name: bucket.name }));
    }

    // PutBucket succeeding does NOT prove the bucket is ours: a pre-existing
    // bucket is returned idempotently. Only a bucket carrying our ownership tag
    // (stamped at create time via x-cos-tagging) may be adopted; an untagged
    // one may belong to another project and must fail loudly rather than be
    // silently taken over (destroy would then remove a resource never ours).
    if (!isOwnedByStack(context, logicalId, bucketInfo.Tags)) {
      throw new PartialResourceError(
        stateAfterDependents,
        new Error(
          lang.__('RESOURCE_EXISTS_NOT_OWNED_ADOPT', {
            resourceType: 'Bucket',
            resourceName: bucket.name,
            tagKey: OWNERSHIP_TAG_KEY,
          }),
        ),
      );
    }

    const sid = buildSid('tencent', 'cos', context.stage, bucket.name);

    const instances: Array<ResourceInstance> = [
      buildCosInstanceFromProvider(bucketInfo as CosBucketInfo, sid),
    ];

    guardCosCapabilities(bucket);
    for (const binding of bucket.domains ?? []) {
      if (isBindingCdnEnabled(binding)) {
        const certificate = resolveBindingCertificate(binding);
        await createCdnBinding(context, client, bucket, binding, certificate, instances);
      } else {
        await bindCosDomain(client, bucket, binding, context, instances);
      }
    }

    if ((bucket.domains?.length ?? 0) > 0) {
      const refreshedInfo = await client.cos.getBucket(bucket.name, context.region);
      if (refreshedInfo) {
        instances[0] = buildCosInstanceFromProvider(refreshedInfo as CosBucketInfo, sid);
      }
    }

    // Apply IAM bucket policy if configured
    await applyBucketPolicy(client, bucket, context.region);
    if (buildCosBucketPolicyJson(bucket.iam)) {
      instances.push(buildCosPolicyInstance(context, bucket.name));
    }

    const resourceState: ResourceState = {
      mode: 'managed',
      region: context.region,
      definition,
      instances,
      lastUpdated: new Date().toISOString(),
    };

    return setResource(state, logicalId, resourceState);
  } catch (error) {
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }
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
    throw new Error(lang.__('REFRESH_STATE_BUCKET', { name: bucket.name }));
  }

  const definition = extractCosBucketDefinition(config);
  const sid = buildSid('tencent', 'cos', context.stage, bucket.name);
  const logicalId = `buckets.${bucket.key}`;

  const instances: Array<ResourceInstance> = [
    buildCosInstanceFromProvider(bucketInfo as CosBucketInfo, sid),
  ];

  const existingState = state.resources[logicalId];
  const groups = groupBindingInstances(existingState?.instances, TENCENT_BINDING_ROLE_BY_TYPE);
  const storedBindings = buildStoredBindings(existingState, groups, {
    accelerateEnabled: false,
    legacyBinding: tencentLegacyBinding,
  });

  // Per-binding reconcile (issue #279/#283): bindings are identified by
  // normalized hostname — re-binding an existing host is idempotent, delivery
  // mode switches tear down and rebuild at binding level, undeclared stored
  // bindings are torn down.
  guardCosCapabilities(bucket);
  const desiredDomains = bucket.domains ?? [];
  const desiredHosts = new Set(desiredDomains.map((b) => normalizeHostname(b.domain_name)));

  for (const rawBinding of desiredDomains) {
    const hostname = normalizeHostname(rawBinding.domain_name);
    const binding = { ...rawBinding, domain_name: hostname };
    let stored = storedBindings.get(hostname);
    const cdnEnabled = isBindingCdnEnabled(binding);

    // Binding-level delivery-mode switch (issue #283): tear the previous
    // delivery group down and rebuild in the new mode below.
    if (stored && stored.mode !== desiredBindingMode(cdnEnabled, false)) {
      await teardownCosBinding(client, bucket.name, stored, groups.get(hostname));
      stored = undefined;
    }

    if (cdnEnabled) {
      const certificate = resolveBindingCertificate(binding);
      if (stored?.mode === 'cdn' && groups.get(hostname)?.cdn) {
        await updateCdnBinding(
          context,
          client,
          bucket,
          binding,
          certificate,
          stored,
          groups.get(hostname),
          instances,
        );
      } else {
        await createCdnBinding(context, client, bucket, binding, certificate, instances);
      }
    } else {
      await bindCosDomain(client, bucket, binding, context, instances, stored);
    }
  }

  // Converge removed bindings: any stored binding no longer declared is torn down.
  for (const [hostname, stored] of storedBindings) {
    if (desiredHosts.has(hostname)) continue;
    logger.info(lang.__('BINDING_REMOVING_DOMAIN', { domain: hostname, bucketName: bucket.name }));
    await teardownCosBinding(client, bucket.name, stored, groups.get(hostname));
  }

  if (desiredDomains.length > 0) {
    const refreshedInfo = await client.cos.getBucket(bucket.name, context.region);
    if (refreshedInfo) {
      instances[0] = buildCosInstanceFromProvider(refreshedInfo as CosBucketInfo, sid);
    }
  }

  const policyOwned = isOwnedBucketPolicy(
    COS_BUCKET_POLICY_INSTANCE_TYPE,
    existingState?.instances,
    existingState?.definition,
  );
  await applyBucketPolicy(client, bucket, context.region, policyOwned);
  if (buildCosBucketPolicyJson(bucket.iam)) {
    instances.push(buildCosPolicyInstance(context, bucket.name));
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: withLifecycleIntent(
      mergeManagedIntent(existingState?.definition ?? {}, definition),
      definition,
      ['policy'],
    ),
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
  const groups = groupBindingInstances(existingState?.instances, TENCENT_BINDING_ROLE_BY_TYPE);
  const storedBindings = buildStoredBindings(existingState, groups, {
    accelerateEnabled: false,
    legacyBinding: tencentLegacyBinding,
  });

  // Clean up bucket policy before deleting bucket
  await deleteBucketPolicy(client, bucketName, region);

  for (const [hostname, stored] of storedBindings) {
    await teardownCosBinding(client, bucketName, stored, groups.get(hostname));
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

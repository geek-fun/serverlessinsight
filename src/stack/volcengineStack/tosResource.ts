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
  resolveBindingCertificate,
  shouldDeployBindingCertificate,
  type BindingInstanceGroup,
  type BindingResolvedCertificate,
  type StoredBinding,
} from '../../common/bindingReconcile';
import { mapCdnScope, mapOriginProtocol } from '../../common/cdnCapabilities';
import {
  getTosAccelerateEndpoint,
  getTosEndpoint,
  createVolcengineClient,
} from '../../common/volcengineClient';
import type { TosBucketInfo, VolcengineCdnOriginConfig } from '../../common/volcengineClient/types';
import {
  setResource,
  removeResource,
  buildSid,
  computeDirectoryHash,
  getResource,
} from '../../common';
import {
  Context,
  BucketDomain,
  BucketDomainBinding,
  ResourceState,
  StateFile,
  ResourceInstance,
  ResourceTypeEnum,
  PartialResourceError,
} from '../../types';
import {
  TOS_BUCKET_POLICY_INSTANCE_TYPE,
  bucketToTosConfig,
  extractTosBucketDefinition,
  buildTosInstanceFromProvider,
} from './tosTypes';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import path from 'node:path';
import { resolveBindingCertificateHash } from '../../common/certUtils';
import { extractHostRecord, extractMainDomain, normalizeHostname } from '../../common/domainUtils';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';

const buildTosBucketPolicyJson = (iam: BucketDomain['iam']): Record<string, unknown> | null =>
  buildBucketPolicy(iam, 'volcengine');

const applyBucketPolicy = async (
  client: ReturnType<typeof createVolcengineClient>,
  bucket: BucketDomain,
  owned = false,
): Promise<void> => {
  const policy = buildTosBucketPolicyJson(bucket.iam);
  if (!policy) {
    if (owned || bucket.iam?.resource?.statements !== undefined) {
      await deleteBucketPolicy(client, bucket.name);
    }
    return;
  }
  logger.info(lang.__('BUCKET_POLICY_APPLYING', { bucketName: bucket.name }));
  await client.tos.putBucketPolicy(bucket.name, policy);
  logger.info(lang.__('BUCKET_POLICY_APPLIED', { bucketName: bucket.name }));
};

const deleteBucketPolicy = async (
  client: ReturnType<typeof createVolcengineClient>,
  bucketName: string,
): Promise<void> => {
  await client.tos.deleteBucketPolicy(bucketName);
  logger.info(lang.__('BUCKET_POLICY_DELETED', { bucketName }));
};

const buildTosPolicyInstance = (context: Context, bucketName: string): ResourceInstance => ({
  sid: buildSid('volcengine', 'tos-policy', context.stage, bucketName),
  type: TOS_BUCKET_POLICY_INSTANCE_TYPE,
  id: bucketName,
});

// ---------------------------------------------------------------------------
// Per-binding state views (issue #294, shared reconcile core)
// ---------------------------------------------------------------------------

type TosDnsInstance = ResourceInstance & {
  type: 'VOLCENGINE_TOS_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
};

type TosCdnInstance = ResourceInstance & {
  type: 'VOLCENGINE_CDN_DOMAIN';
  domainName: string;
  cname?: string;
  pending?: boolean;
};

type TosCdnDnsInstance = ResourceInstance & {
  type: 'VOLCENGINE_CDN_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
};

/** Volcengine instance-group view over the shared binding group shape. */
type VolcengineBindingGroup = BindingInstanceGroup & {
  cdn?: TosCdnInstance;
  cdnDns?: TosCdnDnsInstance;
  dns?: TosDnsInstance;
};

const asVolcengineGroup = (group?: BindingInstanceGroup): VolcengineBindingGroup | undefined =>
  group as VolcengineBindingGroup | undefined;

const VOLCENGINE_BINDING_ROLE_BY_TYPE: Record<string, keyof BindingInstanceGroup> = {
  [ResourceTypeEnum.VOLCENGINE_TOS_DNS_CNAME]: 'dns',
  [ResourceTypeEnum.VOLCENGINE_CDN_DOMAIN]: 'cdn',
  [ResourceTypeEnum.VOLCENGINE_CDN_DNS_CNAME]: 'cdnDns',
};

const storedAccelerationEnabled = (definition: ResourceState['definition']): boolean =>
  (definition.accelerate ?? definition.accelerateEnabled) === true;

// ---------------------------------------------------------------------------
// Certificates
// ---------------------------------------------------------------------------

type TosResolvedCertificate = BindingResolvedCertificate;

// Inline PEM reaches the shared resolver only on CDN bindings — semantic
// validation rejects it on direct volcengine bindings (TOS has no
// bucket-domain certificate-upload API).

const resolveCdnCertificateId = async (
  client: ReturnType<typeof createVolcengineClient>,
  resolved: TosResolvedCertificate,
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
  // Repeatable false — the CDN returns the existing certificate id when the
  // same content was uploaded before, so redeploys stay idempotent.
  const certInfo = await client.cdn.addCertificate({
    certificate: resolved.certificateBody,
    privateKey: resolved.certificatePrivateKey,
    name: resolved.certificateName,
  });
  return certInfo.certificateId;
};

// ---------------------------------------------------------------------------
// Direct / accelerate-only bindings
// ---------------------------------------------------------------------------

const bindTosDomain = async (
  context: Context,
  client: ReturnType<typeof createVolcengineClient>,
  bucket: BucketDomain,
  binding: BucketDomainBinding,
  accelerate: boolean,
  instances: Array<ResourceInstance>,
): Promise<void> => {
  const hostname = binding.domain_name;

  logger.info(
    lang.__('BINDING_CUSTOM_DOMAIN_TO_BUCKET', {
      domain: hostname,
      bucketName: bucket.name,
    }),
  );
  // certificate_id passes through as the TOS-side CertId (a reference into
  // the Volcengine certificate center); inline PEM cannot reach TOS.
  await client.tos.putBucketCustomDomain(
    bucket.name,
    hostname,
    binding.certificate_id ? { certId: binding.certificate_id } : undefined,
  );

  const cname = accelerate
    ? getTosAccelerateEndpoint(bucket.name)
    : getTosEndpoint(bucket.name, context.region);
  const mainDomain = extractMainDomain(hostname);
  const dnsRecordId = await client.dns.addDomainRecord({
    domainName: mainDomain,
    host: extractHostRecord(hostname, mainDomain),
    type: 'CNAME',
    value: cname,
    ttl: 600,
  });
  const id = dnsRecordId ?? hostname;
  instances.push({
    sid: buildSid('volcengine', 'dns', context.stage, id),
    id,
    type: ResourceTypeEnum.VOLCENGINE_TOS_DNS_CNAME,
    domain: hostname,
    cname,
    ...(dnsRecordId ? { dnsRecordId } : {}),
  } satisfies TosDnsInstance);
};

// ---------------------------------------------------------------------------
// Per-binding CDN delivery (issue #294)
// ---------------------------------------------------------------------------

/**
 * CDN pulls straight from the TOS bucket (OriginType 'TOS' + bucket name), so
 * the custom domain is NOT bound to the bucket in CDN mode — unlike the
 * Tencent COS path, TOS custom-domain registration plays no role in CDN
 * origin pulls and would require domain-ownership verification.
 */
const buildTosOrigin = (bucketName: string, region: string): VolcengineCdnOriginConfig => ({
  originLines: [{ originType: 'TOS', bucketName, region }],
});

const ensureCdnDns = async (
  context: Context,
  client: ReturnType<typeof createVolcengineClient>,
  hostname: string,
  cname: string,
  instances: Array<ResourceInstance>,
): Promise<void> => {
  // The CDN CNAME for a hostname is stable, so an existing delivery record is
  // updated in place — only a missing record is created here.
  const mainDomain = extractMainDomain(hostname);
  const dnsRecordId = await client.dns.addDomainRecord({
    domainName: mainDomain,
    host: extractHostRecord(hostname, mainDomain),
    type: 'CNAME',
    value: cname,
    ttl: 600,
  });
  const id = dnsRecordId || hostname;
  instances.push({
    sid: buildSid('volcengine', 'cdn-dns', context.stage, id),
    id,
    type: ResourceTypeEnum.VOLCENGINE_CDN_DNS_CNAME,
    domain: hostname,
    cname,
    ...(dnsRecordId ? { dnsRecordId } : {}),
  } satisfies TosCdnDnsInstance);
};

const applyCdnOptions = async (
  client: ReturnType<typeof createVolcengineClient>,
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
  client: ReturnType<typeof createVolcengineClient>,
  bucket: BucketDomain,
  binding: BucketDomainBinding,
  certificate: TosResolvedCertificate | undefined,
  instances: Array<ResourceInstance>,
): Promise<void> => {
  const hostname = binding.domain_name;
  const cdnObj = getBindingCdnOptions(binding);
  logger.info(lang.__('CREATING_CDN_DISTRIBUTION', { domain: hostname, origin: bucket.name }));
  const originProtocol = mapOriginProtocol('volcengine', cdnObj?.origin_protocol);
  try {
    await client.cdn.addCdnDomain({
      domain: hostname,
      serviceType: cdnObj?.cdn_type ?? 'web',
      serviceRegion: mapCdnScope('volcengine', cdnObj?.scope),
      origin: buildTosOrigin(bucket.name, context.region),
      ...(originProtocol ? { originProtocol } : {}),
    });
  } catch (error) {
    // Partial-failure retry: a CDN domain created by an interrupted earlier run
    // must not block convergence — probe, verify ownership and continue as an
    // update. A domain whose origin does not point at this bucket is not ours
    // to adopt (repo convention: refuse un-owned resources).
    const existing = await client.cdn.describeCdnDomain(hostname);
    if (!existing) throw error;
    const origins = existing.origin ?? [];
    const bucketEndpoint = getTosEndpoint(bucket.name, context.region);
    if (!origins.includes(bucket.name) && !origins.includes(bucketEndpoint)) {
      throw new Error(
        lang.__('CDN_DOMAIN_EXISTS_NOT_OWNED', { domain: hostname, bucketName: bucket.name }),
        { cause: error },
      );
    }
    logger.info(
      lang.__('RESOURCE_OWNERSHIP_TAG_ADOPT', {
        resourceType: 'CDN domain',
        name: hostname,
        tag: 'state',
      }),
    );
  }
  await updateCdnBinding(
    context,
    client,
    bucket,
    binding,
    certificate,
    { hostname, mode: 'cdn', cdn: { ...cdnObj, enabled: true } },
    {
      cdn: {
        sid: buildSid('volcengine', 'cdn', context.stage, hostname),
        id: hostname,
        type: ResourceTypeEnum.VOLCENGINE_CDN_DOMAIN,
        domainName: hostname,
        pending: true,
      },
    },
    instances,
  );
};

const updateCdnBinding = async (
  context: Context,
  client: ReturnType<typeof createVolcengineClient>,
  bucket: BucketDomain,
  binding: BucketDomainBinding,
  certificate: TosResolvedCertificate | undefined,
  stored: StoredBinding,
  group: BindingInstanceGroup | undefined,
  instances: Array<ResourceInstance>,
): Promise<void> => {
  const hostname = binding.domain_name;
  const cdnObj = getBindingCdnOptions(binding);
  const volcengineGroup = asVolcengineGroup(group);
  const pending = volcengineGroup?.cdn?.pending === true;
  const distributionIndex = instances.length;
  instances.push({
    ...volcengineGroup?.cdn,
    sid: volcengineGroup?.cdn?.sid ?? buildSid('volcengine', 'cdn', context.stage, hostname),
    id: hostname,
    type: ResourceTypeEnum.VOLCENGINE_CDN_DOMAIN,
    domainName: hostname,
    pending: true,
  } satisfies TosCdnInstance);

  // Volcengine updates service type / acceleration region / origin in place
  // via UpdateCdnConfig — no distribution recreation needed.
  if (!pending && cdnDeliveryChanged(stored.cdn, cdnObj)) {
    await client.cdn.updateCdnDelivery(hostname, {
      serviceType: cdnObj?.cdn_type ?? 'web',
      serviceRegion: mapCdnScope('volcengine', cdnObj?.scope),
      origin: buildTosOrigin(bucket.name, context.region),
    });
  }
  const applyOptions = pending || cdnDeliveryChanged(stored.cdn, cdnObj);
  if (applyOptions) {
    await applyCdnOptions(client, hostname, cdnObj);
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
      // An explicit protocol is required to reset the pull behavior; the
      // provider default when unset is plain http.
      await client.cdn.updateCdnDelivery(hostname, {
        originProtocol:
          mapOriginProtocol('volcengine', cdnObj?.origin_protocol) ??
          mapOriginProtocol('volcengine', 'http'),
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
      const certId = await resolveCdnCertificateId(client, certificate);
      await client.cdn.applyCertificate(hostname, certId);
    } else {
      logger.info(lang.__('CDN_CERT_UNCHANGED_SKIPPED', { domain: hostname }));
    }
  }

  if (volcengineGroup?.cdnDns) {
    instances.push(volcengineGroup.cdnDns);
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
  const { pending: _pending, ...ready } = instances[distributionIndex] as TosCdnInstance;
  instances[distributionIndex] = ready;
};

const teardownTosBinding = async (
  client: ReturnType<typeof createVolcengineClient>,
  bucketName: string,
  stored: StoredBinding,
  group: BindingInstanceGroup | undefined,
): Promise<void> => {
  if (!group) return;
  const volcengineGroup = asVolcengineGroup(group);
  if (stored.mode === 'cdn') {
    const distributionName = volcengineGroup?.cdn?.domainName ?? stored.hostname;
    await client.cdn.deleteCdnDomain(distributionName);
    logger.info(lang.__('CDN_DOMAIN_DELETED', { domain: distributionName }));
    if (volcengineGroup?.cdnDns?.dnsRecordId) {
      try {
        await client.dns.deleteDomainRecord(volcengineGroup.cdnDns.dnsRecordId);
      } catch (error) {
        // Best-effort delivery-record cleanup: the binding teardown must not
        // fail because the record is already gone.
        logger.debug(lang.__('DNS_OPERATION_ERROR', { error: String(error) }));
      }
    }
    return;
  }

  // direct / accelerate-only binding: TOS unbind + delivery CNAME removal.
  const domain = volcengineGroup?.dns?.domain ?? stored.hostname;
  await client.tos.deleteBucketCustomDomain(bucketName, domain);
  if (volcengineGroup?.dns?.dnsRecordId) {
    try {
      await client.dns.deleteDomainRecord(volcengineGroup.dns.dnsRecordId);
    } catch (error) {
      logger.debug(lang.__('DNS_OPERATION_ERROR', { error: String(error) }));
    }
  }
};

// ---------------------------------------------------------------------------
// Resource entry points
// ---------------------------------------------------------------------------

export const createResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToTosConfig(bucket);
  const client = createVolcengineClient(context);

  const sid = buildSid('volcengine', 'tos', context.stage, bucket.name);
  const logicalId = `buckets.${bucket.key}`;

  // Stamp the ownership tag (sent as the x-tos-tagging header on CreateBucket)
  // so a later run can idempotently adopt this bucket, and an unrelated
  // same-named bucket is never adopted.
  config.Tags = [{ Key: OWNERSHIP_TAG_KEY, Value: buildOwnershipTagValue(context, logicalId) }];

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const existingResourceState = getResource(state, logicalId);
  const isTainted = existingResourceState?.status === 'tainted';
  const existingBucketOnRetry = isTainted ? await client.tos.getBucket(bucket.name) : null;

  if (existingBucketOnRetry) {
    logger.info(
      lang.__('TAINTED_RECOVERY_SKIP_CREATE', {
        resourceType: 'Bucket',
        resourceName: bucket.name,
      }),
    );
  }

  const taintedResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: extractTosBucketDefinition(config, websiteCodeHash),
    instances: existingBucketOnRetry
      ? [buildTosInstanceFromProvider(existingBucketOnRetry, sid)]
      : [
          {
            type: 'VOLCENGINE_TOS_BUCKET',
            sid,
            id: bucket.name,
            bucketName: bucket.name,
            attributes: {},
          },
        ],
    status: 'tainted',
    lastUpdated: new Date().toISOString(),
  };

  const stateAfterDependents = setResource(state, logicalId, taintedResourceState);

  try {
    let bucketInfo: TosBucketInfo;
    if (existingBucketOnRetry) {
      bucketInfo = existingBucketOnRetry;
    } else {
      try {
        await client.tos.createBucket(config);
      } catch (error) {
        // TOS CreateBucket may be idempotent for the same account; a collision
        // (BucketAlreadyExists) surfaces only for a bucket owned by another
        // account. Treat it as non-fatal and fall through to the ownership probe
        // below — an untagged pre-existing bucket is refused there.
        if (!isResourceAlreadyExistsError(error, ['BucketAlreadyExists'])) {
          throw error;
        }
        logger.info(
          lang.__('OWNERSHIP_VERIFYING', { resourceType: 'Bucket', resourceName: bucket.name }),
        );
      }

      // CreateBucket succeeding does NOT prove the bucket is ours: a pre-existing
      // bucket is returned idempotently. Only a bucket carrying our ownership tag
      // may be adopted; an untagged one may belong to another project and must
      // fail loudly rather than be silently taken over.
      const probe = await client.tos.getBucket(bucket.name);
      if (!probe) {
        throw new Error(lang.__('REFRESH_STATE_BUCKET', { name: bucket.name }));
      }
      if (!isOwnedByStack(context, logicalId, probe.Tags)) {
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
      bucketInfo = probe;
    }

    const instances: Array<ResourceInstance> = [buildTosInstanceFromProvider(bucketInfo, sid)];

    // Bucket-level transfer acceleration (issue #294)
    if (bucket.accelerate === true) {
      logger.info(lang.__('ENABLING_OSS_TRANSFER_ACCELERATION', { bucketName: bucket.name }));
      await client.tos.putBucketTransferAcceleration(bucket.name, true);
    }

    const bindingLoop = async (accelerate: boolean): Promise<void> => {
      for (const rawBinding of bucket.domains ?? []) {
        const hostname = normalizeHostname(rawBinding.domain_name);
        const binding = { ...rawBinding, domain_name: hostname };
        if (isBindingCdnEnabled(binding)) {
          await createCdnBinding(
            context,
            client,
            bucket,
            binding,
            resolveBindingCertificate(binding),
            instances,
          );
        } else {
          await bindTosDomain(context, client, bucket, binding, accelerate, instances);
        }
      }
    };
    await bindingLoop(bucket.accelerate === true);

    if (bucket.website?.code) {
      const codePath = path.resolve(process.cwd(), bucket.website.code);
      await client.tos.uploadFiles(bucket.name, codePath);

      const refreshedInfo = await client.tos.getBucket(bucket.name);
      if (refreshedInfo) {
        instances[0] = buildTosInstanceFromProvider(refreshedInfo, sid);
      }
    }

    // Apply IAM bucket policy if configured
    await applyBucketPolicy(client, bucket);
    if (buildTosBucketPolicyJson(bucket.iam)) {
      instances.push(buildTosPolicyInstance(context, bucket.name));
    }

    const resourceState: ResourceState = {
      mode: 'managed',
      region: context.region,
      definition: extractTosBucketDefinition(config, websiteCodeHash),
      instances,
      status: 'ready',
      lastUpdated: new Date().toISOString(),
    };

    return setResource(stateAfterDependents, logicalId, resourceState);
  } catch (error) {
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }
};

export const readResource = async (context: Context, bucketName: string) => {
  const client = createVolcengineClient(context);
  return await client.tos.getBucket(bucketName);
};

export const updateResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToTosConfig(bucket);
  const client = createVolcengineClient(context);

  if (config.acl) {
    await client.tos.updateBucketAcl(bucket.name, config.acl);
  }

  if (config.websiteConfig) {
    await client.tos.updateBucketWebsite(bucket.name, config.websiteConfig);
  }

  if (bucket.website?.code) {
    const codePath = path.resolve(process.cwd(), bucket.website.code);
    await client.tos.uploadFiles(bucket.name, codePath);
  }

  const bucketInfo = await client.tos.getBucket(bucket.name);
  if (!bucketInfo) {
    throw new Error(
      lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Bucket', name: bucket.name }),
    );
  }

  const sid = buildSid('volcengine', 'tos', context.stage, bucket.name);
  const logicalId = `buckets.${bucket.key}`;
  const existingState = state.resources[logicalId];

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const instances: Array<ResourceInstance> = [buildTosInstanceFromProvider(bucketInfo, sid)];

  // Per-binding reconcile (issue #294): bindings are identified by normalized
  // hostname — re-binding an existing host is idempotent, delivery mode
  // switches tear down and rebuild at binding level, undeclared stored
  // bindings are torn down.
  const desiredAccelerate = bucket.accelerate === true;
  const groups = groupBindingInstances(existingState?.instances, VOLCENGINE_BINDING_ROLE_BY_TYPE);
  const storedAccelerate = storedAccelerationEnabled(existingState?.definition ?? {});
  const storedBindings = buildStoredBindings(existingState, groups, {
    accelerateEnabled: storedAccelerate,
  });

  // Acceleration cannot be disabled through update — stored accelerate-only
  // bindings would be orphaned with no way to repoint them here (aliyun
  // parity). Fail loudly instead of drifting.
  if (storedAccelerate && !desiredAccelerate) {
    throw new Error(lang.__('CDN_ACCELERATE_CONFIG_CHANGED', { bucketName: bucket.name }));
  }

  if (desiredAccelerate && !storedAccelerate) {
    logger.info(lang.__('ENABLING_OSS_TRANSFER_ACCELERATION', { bucketName: bucket.name }));
    await client.tos.putBucketTransferAcceleration(bucket.name, true);
  }

  const desiredDomains = bucket.domains ?? [];
  const desiredHosts = new Set(desiredDomains.map((b) => normalizeHostname(b.domain_name)));

  for (const rawBinding of desiredDomains) {
    const hostname = normalizeHostname(rawBinding.domain_name);
    const binding = { ...rawBinding, domain_name: hostname };
    let stored = storedBindings.get(hostname);
    const cdnEnabled = isBindingCdnEnabled(binding);

    // Binding-level delivery-mode switch: tear the previous delivery group
    // down and rebuild in the new mode below. A direct binding under newly
    // enabled acceleration is rebound in place (its TOS rule is identical).
    if (
      stored &&
      stored.mode !== desiredBindingMode(cdnEnabled, desiredAccelerate) &&
      !(stored.mode === 'direct' && desiredAccelerate && !cdnEnabled)
    ) {
      await teardownTosBinding(client, bucket.name, stored, groups.get(hostname));
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
      await bindTosDomain(context, client, bucket, binding, desiredAccelerate, instances);
    }
  }

  // Converge removed bindings: any stored binding no longer declared is torn down.
  for (const [hostname, stored] of storedBindings) {
    if (desiredHosts.has(hostname)) continue;
    logger.info(lang.__('BINDING_REMOVING_DOMAIN', { domain: hostname, bucketName: bucket.name }));
    await teardownTosBinding(client, bucket.name, stored, groups.get(hostname));
  }

  const policyOwned = isOwnedBucketPolicy(
    TOS_BUCKET_POLICY_INSTANCE_TYPE,
    existingState?.instances,
    existingState?.definition,
  );
  await applyBucketPolicy(client, bucket, policyOwned);
  if (buildTosBucketPolicyJson(bucket.iam)) {
    instances.push(buildTosPolicyInstance(context, bucket.name));
  }

  const tosDefinition = extractTosBucketDefinition(config, websiteCodeHash);
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: withLifecycleIntent(
      mergeManagedIntent(existingState?.definition ?? {}, tosDefinition),
      tosDefinition,
      ['policy'],
    ),
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

export const deleteResource = async (
  context: Context,
  bucketName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createVolcengineClient(context);

  const existingState = state.resources[logicalId];
  const groups = groupBindingInstances(existingState?.instances, VOLCENGINE_BINDING_ROLE_BY_TYPE);
  const storedBindings = buildStoredBindings(existingState, groups, {
    accelerateEnabled: storedAccelerationEnabled(existingState?.definition ?? {}),
  });

  // Clean up bucket policy before deleting bucket
  await deleteBucketPolicy(client, bucketName);

  for (const [hostname, stored] of storedBindings) {
    await teardownTosBinding(client, bucketName, stored, groups.get(hostname));
  }

  try {
    await client.tos.deleteBucket(bucketName);
  } catch (err) {
    const errorCode = (err as { code?: string })?.code;
    if (errorCode === 'NoSuchBucket' || errorCode === 'ResourceNotFound') {
      logger.warn(
        lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Bucket', name: bucketName }),
      );
    } else {
      throw err;
    }
  }

  return removeResource(state, logicalId);
};

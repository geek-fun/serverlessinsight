import { mergeManagedIntent } from '../../common/planCompare';
import { buildBucketPolicy, isOwnedBucketPolicy } from '../../common/bucketPolicy';
import { withLifecycleIntent } from '../../common/functionDefinition';
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
import { normalizeHostname } from '../../common/domainUtils';
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
      await deployCertificateToCosDomain(
        client,
        resolved,
        bucket.name,
        binding.domain_name,
        context.region,
      );
    }
  }
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
      await bindCosDomain(client, bucket, binding, context, instances);
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
  const existingDnsInstances = existingState?.instances?.filter(
    (i) => i.type === ResourceTypeEnum.COS_DNS_CNAME,
  ) as CosDnsInstance[] | undefined;

  // Per-binding reconcile (issue #279): bindings are identified by normalized
  // hostname — re-binding an existing host is idempotent, undeclared stored
  // bindings are torn down.
  guardCosCapabilities(bucket);
  const desiredDomains = bucket.domains ?? [];
  const desiredHosts = new Set(desiredDomains.map((b) => normalizeHostname(b.domain_name)));

  for (const rawBinding of desiredDomains) {
    await bindCosDomain(
      client,
      bucket,
      { ...rawBinding, domain_name: normalizeHostname(rawBinding.domain_name) },
      context,
      instances,
    );
  }

  const storedByHost = new Map<string, CosDnsInstance>();
  (existingDnsInstances ?? []).forEach((instance) =>
    storedByHost.set(normalizeHostname(instance.domain), instance),
  );
  for (const [hostname, instance] of storedByHost) {
    if (desiredHosts.has(hostname)) continue;
    logger.info(lang.__('BINDING_REMOVING_DOMAIN', { domain: hostname, bucketName: bucket.name }));
    await client.cos.unbindCustomDomain(bucket.name, instance.domain, instance.dnsRecordId);
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
  const dnsInstances = existingState?.instances?.filter(
    (i) => i.type === ResourceTypeEnum.COS_DNS_CNAME,
  ) as CosDnsInstance[] | undefined;

  // Clean up bucket policy before deleting bucket
  await deleteBucketPolicy(client, bucketName, region);

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

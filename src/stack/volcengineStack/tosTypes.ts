import { serializeBucketPolicy } from '../../common/bucketPolicy';
import { BucketDomain, BucketDomainBinding, BucketIam, ResourceAttributes } from '../../types';
import { bindingToDefinitionEntry } from '../../common/bindingReconcile';
import type {
  TosAcl,
  TosBucketInfo,
  TosStorageClass,
  TosWebsiteConfig,
} from '../../common/volcengineClient/types';

export type TosBucketDefinition = {
  bucketName: string;
  acl: TosAcl | null;
  storageClass: TosStorageClass | null;
  websiteConfiguration: TosWebsiteConfig | null;
  websiteCodeHash: string | null;
  iam?: BucketIam;
};

const aclMap: Record<string, TosAcl> = {
  PRIVATE: 'private',
  PUBLIC_READ: 'public-read',
  PUBLIC_READ_WRITE: 'public-read-write',
};

export const TOS_BUCKET_POLICY_INSTANCE_TYPE = 'VOLCENGINE_TOS_BUCKET_POLICY';

export type TosBindingConfig = {
  domain: string;
  certificateId?: string;
  certificateBody?: string;
  certificatePrivateKey?: string;
  // CDN delivery on TOS is implemented by the CDN domain path (issue #294).
  cdn?: BucketDomainBinding['cdn'];
};

export const bucketToTosConfig = (bucket: BucketDomain) => {
  const config: {
    bucketName: string;
    acl?: TosAcl;
    storageClass?: TosStorageClass;
    websiteConfig?: TosWebsiteConfig;
    iam?: BucketIam;
    domains?: TosBindingConfig[];
    accelerateEnabled?: boolean;
    Tags?: Array<{ Key: string; Value: string }>;
  } = {
    bucketName: bucket.name,
  };

  if (bucket.iam) {
    config.iam = bucket.iam;
  }

  if (bucket.security?.acl) {
    config.acl = aclMap[bucket.security.acl];
  }

  if (bucket.storage?.class) {
    config.storageClass = bucket.storage.class as TosStorageClass;
  }

  if (bucket.website) {
    config.websiteConfig = {
      indexDocument: bucket.website.index,
      errorDocument: bucket.website.index,
    };
  }

  if (bucket.domains?.length) {
    config.domains = bucket.domains.map((binding) => ({
      domain: binding.domain_name,
      certificateId: binding.certificate_id,
      certificateBody: binding.certificate_body,
      certificatePrivateKey: binding.certificate_private_key,
      ...(binding.cdn != null ? { cdn: binding.cdn } : {}),
    }));
  }

  if (bucket.accelerate != null) {
    config.accelerateEnabled = bucket.accelerate === true;
  }

  return config;
};

const tosBindingToDefinitionEntry = (binding: TosBindingConfig): ResourceAttributes =>
  bindingToDefinitionEntry({
    domainName: binding.domain,
    certificateId: binding.certificateId,
    certificateBody: binding.certificateBody,
    certificatePrivateKey: binding.certificatePrivateKey,
    ...(binding.cdn != null ? { cdn: binding.cdn } : {}),
  });

export const extractTosBucketDefinition = (
  config: ReturnType<typeof bucketToTosConfig>,
  websiteCodeHash?: string | null,
): ResourceAttributes => {
  return {
    bucketName: config.bucketName,
    acl: config.acl ?? null,
    storageClass: config.storageClass ?? null,
    websiteConfiguration: config.websiteConfig
      ? {
          indexDocument: config.websiteConfig.indexDocument,
          errorDocument: config.websiteConfig.errorDocument ?? null,
        }
      : null,
    websiteCodeHash: websiteCodeHash ?? null,
    // Bindings are canonicalized: sorted by hostname so list reordering in
    // YAML never produces a plan change (issue #279/#294).
    domains: (config.domains ?? [])
      .slice()
      .sort((a, b) => a.domain.localeCompare(b.domain))
      .map(tosBindingToDefinitionEntry),
    accelerate: config.accelerateEnabled ?? false,
    policy: serializeBucketPolicy(config.iam, 'volcengine'),
  };
};

// issue #234 phase 2: cloud-side counterpart of extractTosBucketDefinition.
// Mirrors the executor write shape key-for-key: acl/storageClass/websiteConfig
// are compared live; policy (GetBucket returns no bucket-policy document) and
// websiteCodeHash (local-only) are not refreshable and stay omitted so they can
// never trigger phantom drift.
export const cloudTosToDefinition = (info: TosBucketInfo): ResourceAttributes => ({
  bucketName: info.name,
  acl: info.acl ?? null,
  storageClass: info.storageClass ?? null,
  websiteConfiguration: info.websiteConfig
    ? {
        indexDocument: info.websiteConfig.indexDocument ?? null,
        errorDocument: info.websiteConfig.errorDocument ?? null,
      }
    : info.websiteConfig,
});

export const buildTosInstanceFromProvider = (info: TosBucketInfo, sid: string) => {
  return {
    type: 'VOLCENGINE_TOS_BUCKET',
    sid,
    id: info.name,
    bucketName: info.name,
    location: info.location ?? null,
    creationDate: info.creationDate ?? null,
    storageClass: info.storageClass ?? null,
    extranetEndpoint: info.extranetEndpoint ?? null,
    intranetEndpoint: info.intranetEndpoint ?? null,
    acl: info.acl ?? null,
    websiteConfig: info.websiteConfig
      ? {
          indexDocument: info.websiteConfig.indexDocument ?? null,
          errorDocument: info.websiteConfig.errorDocument ?? null,
        }
      : null,
    Tags: info.Tags ?? null,
    owner: info.owner ?? null,
    projectName: info.projectName ?? null,
    bucketType: info.type ?? null,
    azRedundancy: info.azRedundancy ?? null,
    extranetS3Endpoint: info.extranetS3Endpoint ?? null,
    intranetS3Endpoint: info.intranetS3Endpoint ?? null,
    versioning: info.versioning ?? null,
    crossRegionReplication: info.crossRegionReplication ?? null,
    transferAcceleration: info.transferAcceleration ?? null,
    accessMonitor: info.accessMonitor ?? null,
    serverSideEncryptionConfiguration: info.serverSideEncryptionConfiguration ?? null,
  };
};

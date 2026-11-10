import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { deploy } from '../../src/commands/deploy';
import { destroyStack } from '../../src/commands/destroy';
import { cleanScopedState, readScopedState } from './scopedState';

jest.mock('../../src/common/volcengineClient', () => ({
  ...jest.requireActual('../../src/common/volcengineClient/tosOperations'),
  createVolcengineClient: jest.fn(),
}));

jest.mock('../../src/common/imsClient', () => ({
  getIamInfo: jest.fn().mockResolvedValue({
    accountId: '123456789012',
    displayName: 'Test User',
    userId: 'test-user-id',
  }),
}));

jest.mock('../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockCreateVolcengineClient = require('../../src/common/volcengineClient')
  .createVolcengineClient as jest.Mock;

const APP_NAME = 'volc-cdn-app';
const SERVICE_NAME = 'volc-cdn-service';
const STAGE = 'dev';
const REGION = 'cn-beijing';
const BUCKET_NAME = 'volc-cdn-bucket';
const BUCKET_LOGICAL_ID = 'buckets.site_bucket';
const BUCKET_DOMAIN = 'static.example.com';
const CDN_CNAME = `${BUCKET_DOMAIN}.cdn.boscdn.com`;
const TOS_ENDPOINT = `${BUCKET_NAME}.tos-${REGION}.volces.com`;
const BUCKET_CERT_ID = 'cert-volc-ref-1';

type VolcMockClient = {
  tos: Record<string, jest.Mock>;
  cdn: Record<string, jest.Mock>;
  dns: Record<string, jest.Mock>;
};

const getBucketInfo = () => ({
  name: BUCKET_NAME,
  location: REGION,
  extranetEndpoint: TOS_ENDPOINT,
  Tags: [
    {
      Key: 'si-owned-by',
      Value: `${APP_NAME}-${SERVICE_NAME}:${BUCKET_LOGICAL_ID}@${REGION}`,
    },
  ],
});

const buildMockVolcClient = (): VolcMockClient => {
  const client: VolcMockClient = {
    tos: {
      createBucket: jest.fn().mockResolvedValue(getBucketInfo()),
      getBucket: jest.fn().mockImplementation(async () => getBucketInfo()),
      deleteBucket: jest.fn().mockResolvedValue(undefined),
      updateBucketAcl: jest.fn().mockResolvedValue(undefined),
      updateBucketWebsite: jest.fn().mockResolvedValue(undefined),
      putObject: jest.fn().mockResolvedValue(undefined),
      listObjects: jest.fn().mockResolvedValue([]),
      deleteObjects: jest.fn().mockResolvedValue(undefined),
      uploadFiles: jest.fn().mockResolvedValue(undefined),
      putBucketPolicy: jest.fn().mockResolvedValue(undefined),
      getBucketPolicy: jest.fn().mockResolvedValue(null),
      deleteBucketPolicy: jest.fn().mockResolvedValue(undefined),
      putBucketCustomDomain: jest.fn().mockResolvedValue(undefined),
      getBucketCustomDomains: jest.fn().mockResolvedValue([]),
      deleteBucketCustomDomain: jest.fn().mockResolvedValue(undefined),
      putBucketTransferAcceleration: jest.fn().mockResolvedValue(undefined),
    },
    cdn: {
      addCdnDomain: jest.fn().mockResolvedValue(undefined),
      describeCdnDomain: jest.fn().mockResolvedValue({
        domain: BUCKET_DOMAIN,
        cname: CDN_CNAME,
        serviceType: 'web',
        serviceRegion: 'global',
        status: 'online',
        origin: [BUCKET_NAME],
      }),
      deleteCdnDomain: jest.fn().mockResolvedValue(undefined),
      updateCdnDelivery: jest.fn().mockResolvedValue(undefined),
      applyCacheConfig: jest.fn().mockResolvedValue(undefined),
      applyCompression: jest.fn().mockResolvedValue(undefined),
      applyHttpsRedirect: jest.fn().mockResolvedValue(undefined),
      applyCertificate: jest.fn().mockResolvedValue(undefined),
      addCertificate: jest.fn().mockResolvedValue({ certificateId: 'uploaded-cert-1' }),
    },
    dns: {
      addDomainRecord: jest.fn().mockResolvedValue('cdn-dns-record-1'),
      updateDomainRecord: jest.fn().mockResolvedValue(undefined),
      deleteDomainRecord: jest.fn().mockResolvedValue(undefined),
      describeDomainRecords: jest.fn().mockResolvedValue([]),
    },
  };
  return client;
};

type BucketCdnShape = {
  cdnType?: string;
  scope?: string;
  cacheTtl?: number;
  originProtocol?: string;
  forceRedirectHttps?: boolean;
};

const buildIacYaml = (bucketCdn?: BucketCdnShape): string => `version: 0.0.1
provider:
  name: volcengine
  region: ${REGION}

app: ${APP_NAME}
service: ${SERVICE_NAME}

stages:
  ${STAGE}:
    region: ${REGION}

backend:
  state_manager:
    type: LOCAL

buckets:
  site_bucket:
    name: ${BUCKET_NAME}
    domains:
      - domain_name: ${BUCKET_DOMAIN}
        certificate_id: '${BUCKET_CERT_ID}'
${
  bucketCdn
    ? `        cdn:
          enabled: true
          cdn_type: ${bucketCdn.cdnType ?? 'web'}
          scope: ${bucketCdn.scope ?? 'global'}
${bucketCdn.cacheTtl != null ? `          cache_ttl: ${bucketCdn.cacheTtl}\n` : ''}${
        bucketCdn.originProtocol ? `          origin_protocol: ${bucketCdn.originProtocol}\n` : ''
      }${
        bucketCdn.forceRedirectHttps != null
          ? `          force_redirect_https: ${bucketCdn.forceRedirectHttps}\n`
          : ''
      }`
    : ''
}
`;

const readStateFile = async () => {
  const state = await readScopedState(APP_NAME, SERVICE_NAME, STAGE, REGION, 'volcengine');
  return state as {
    stages?: {
      [stage: string]: {
        resources?: Record<
          string,
          {
            definition?: Record<string, unknown>;
            instances?: Array<{ type: string; id: string }>;
          }
        >;
      };
    };
  };
};

const deployOptions = (iacFilePath: string) => ({
  location: iacFilePath,
  stage: STAGE,
  autoApprove: true,
  region: REGION,
  provider: 'volcengine' as const,
  accessKeyId: 'test-key',
  accessKeySecret: 'test-secret',
});

describe('Volcengine TOS CDN Flow Service Test (issue #294)', () => {
  let tempDir: string;
  let iacFilePath: string;
  let mockClient: VolcMockClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'volc-cdn-flow-'));
    iacFilePath = path.join(tempDir, 'volcengine-cdn-flow.yml');
    await fs.writeFile(
      iacFilePath,
      buildIacYaml({
        cacheTtl: 3600,
        originProtocol: 'https',
        forceRedirectHttps: true,
      }),
      'utf-8',
    );

    mockClient = buildMockVolcClient();
    mockCreateVolcengineClient.mockReturnValue(mockClient);

    await cleanScopedState(APP_NAME, SERVICE_NAME);
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
    await cleanScopedState(APP_NAME, SERVICE_NAME);
  });

  it('deploys a bucket binding with CDN delivery, certificate and CDN CNAME', async () => {
    await deploy(deployOptions(iacFilePath));

    // CDN domain created with the TOS bucket as origin and si scope mapped
    expect(mockClient.cdn.addCdnDomain).toHaveBeenCalledWith({
      domain: BUCKET_DOMAIN,
      serviceType: 'web',
      serviceRegion: 'global',
      origin: {
        originLines: [
          {
            originType: 'primary',
            instanceType: 'TOS',
            bucketName: BUCKET_NAME,
            region: REGION,
            address: TOS_ENDPOINT,
            originHost: TOS_ENDPOINT,
          },
        ],
      },
      originProtocol: 'https',
    });

    // cache/redirect options applied (cache_ttl is seconds)
    expect(mockClient.cdn.applyCacheConfig).toHaveBeenCalledWith(BUCKET_DOMAIN, 3600, undefined);
    expect(mockClient.cdn.applyHttpsRedirect).toHaveBeenCalledWith(BUCKET_DOMAIN, true);

    // certificate applied by reference (no upload happens for a reference id)
    expect(mockClient.cdn.addCertificate).not.toHaveBeenCalled();
    expect(mockClient.cdn.applyCertificate).toHaveBeenCalledWith(BUCKET_DOMAIN, BUCKET_CERT_ID);

    // DNS CNAME points at the CDN domain's CNAME
    expect(mockClient.dns.addDomainRecord).toHaveBeenCalledWith({
      domainName: 'example.com',
      host: 'static',
      type: 'CNAME',
      value: CDN_CNAME,
      ttl: 600,
    });

    // CDN mode does not register the custom domain on the bucket
    expect(mockClient.tos.putBucketCustomDomain).not.toHaveBeenCalled();

    const state = await readStateFile();
    const bucketState = state.stages?.[STAGE]?.resources?.[BUCKET_LOGICAL_ID];
    expect(bucketState?.instances).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'VOLCENGINE_CDN_DOMAIN', id: BUCKET_DOMAIN }),
        expect.objectContaining({ type: 'VOLCENGINE_CDN_DNS_CNAME' }),
      ]),
    );
    expect(bucketState?.definition).toEqual(
      expect.objectContaining({
        domains: [
          expect.objectContaining({
            domain_name: BUCKET_DOMAIN,
            certificate_id: BUCKET_CERT_ID,
            cdn: expect.objectContaining({ enabled: true, cdn_type: 'web', scope: 'global' }),
          }),
        ],
      }),
    );
  });

  it('converges to a noop redeploy and updates delivery settings in place', async () => {
    await deploy(deployOptions(iacFilePath));

    // Redeploy with identical config: plan converges to noop — no CDN calls.
    jest.clearAllMocks();
    mockCreateVolcengineClient.mockReturnValue(mockClient);
    await deploy(deployOptions(iacFilePath));
    expect(mockClient.cdn.addCdnDomain).not.toHaveBeenCalled();
    expect(mockClient.cdn.updateCdnDelivery).not.toHaveBeenCalled();

    // Change cdn_type/scope/cache_ttl: volcengine updates delivery in place.
    await fs.writeFile(
      iacFilePath,
      buildIacYaml({ cdnType: 'download', scope: 'chinese_mainland', cacheTtl: 7200 }),
      'utf-8',
    );
    jest.clearAllMocks();
    mockCreateVolcengineClient.mockReturnValue(mockClient);
    await deploy(deployOptions(iacFilePath));

    expect(mockClient.cdn.addCdnDomain).not.toHaveBeenCalled();
    expect(mockClient.cdn.deleteCdnDomain).not.toHaveBeenCalled();
    expect(mockClient.cdn.updateCdnDelivery).toHaveBeenCalledWith(
      BUCKET_DOMAIN,
      expect.objectContaining({ serviceType: 'download', serviceRegion: 'chinese_mainland' }),
    );
    expect(mockClient.cdn.applyCacheConfig).toHaveBeenCalledWith(BUCKET_DOMAIN, 7200, undefined);
  });

  it('switches a binding off CDN at binding level and rebuilds it as a direct binding', async () => {
    await deploy(deployOptions(iacFilePath));

    await fs.writeFile(iacFilePath, buildIacYaml(), 'utf-8');
    jest.clearAllMocks();
    mockCreateVolcengineClient.mockReturnValue(mockClient);
    await deploy(deployOptions(iacFilePath));

    // CDN delivery torn down for this binding only…
    expect(mockClient.cdn.deleteCdnDomain).toHaveBeenCalledWith(BUCKET_DOMAIN);
    expect(mockClient.dns.deleteDomainRecord).toHaveBeenCalledWith('cdn-dns-record-1');
    // …and the same hostname re-bound directly (TOS rule + bucket CNAME record).
    expect(mockClient.tos.putBucketCustomDomain).toHaveBeenCalledWith(BUCKET_NAME, BUCKET_DOMAIN, {
      certId: BUCKET_CERT_ID,
    });
    expect(mockClient.dns.addDomainRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        domainName: 'example.com',
        host: 'static',
        value: TOS_ENDPOINT,
      }),
    );

    const state = await readStateFile();
    const bucketState = state.stages?.[STAGE]?.resources?.[BUCKET_LOGICAL_ID];
    expect(bucketState?.instances).toEqual(
      expect.arrayContaining([expect.objectContaining({ type: 'VOLCENGINE_TOS_DNS_CNAME' })]),
    );
    expect(bucketState?.instances?.some((i) => i.type === 'VOLCENGINE_CDN_DOMAIN')).toBe(false);
  });

  it('destroys the CDN domain and its DNS record with the bucket', async () => {
    await deploy(deployOptions(iacFilePath));

    jest.clearAllMocks();
    mockCreateVolcengineClient.mockReturnValue(mockClient);

    await destroyStack({
      location: iacFilePath,
      stage: STAGE,
      region: REGION,
      provider: 'volcengine',
      accessKeyId: 'test-key',
      accessKeySecret: 'test-secret',
    });

    expect(mockClient.cdn.deleteCdnDomain).toHaveBeenCalledWith(BUCKET_DOMAIN);
    expect(mockClient.dns.deleteDomainRecord).toHaveBeenCalledWith('cdn-dns-record-1');
    // The CDN binding never registered the domain on the bucket.
    expect(mockClient.tos.deleteBucketCustomDomain).not.toHaveBeenCalled();
    expect(mockClient.tos.deleteBucket).toHaveBeenCalledWith(BUCKET_NAME);

    const state = await readStateFile();
    expect(state.stages?.[STAGE]?.resources).toEqual({});
  });
});

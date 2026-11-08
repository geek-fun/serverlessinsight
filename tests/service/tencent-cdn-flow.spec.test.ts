import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { deploy } from '../../src/commands/deploy';
import { destroyStack } from '../../src/commands/destroy';
import { cleanScopedState, readScopedState } from './scopedState';

jest.mock('../../src/common/tencentClient', () => ({
  createTencentClient: jest.fn(),
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
const mockCreateTencentClient = require('../../src/common/tencentClient')
  .createTencentClient as jest.Mock;

const APP_NAME = 'tencent-cdn-app';
const SERVICE_NAME = 'tencent-cdn-service';
const STAGE = 'dev';
const REGION = 'ap-guangzhou';
const BUCKET_NAME = 'tencent-cdn-bucket';
const BUCKET_LOGICAL_ID = 'buckets.site_bucket';
const BUCKET_DOMAIN = 'static.example.com';
const CDN_CNAME = `${BUCKET_DOMAIN}.cdn.dnsv1.com`;
const COS_ENDPOINT = `${BUCKET_NAME}.cos.${REGION}.myqcloud.com`;
const BUCKET_CERT_ID = 'cos-cert-id-1';

type TencentMockClient = {
  cos: Record<string, jest.Mock>;
  ssl: Record<string, jest.Mock>;
  dns: Record<string, jest.Mock>;
  cdn: Record<string, jest.Mock>;
};

const getBucketInfo = () => ({
  Name: BUCKET_NAME,
  Location: REGION,
  ACL: 'private',
  Tags: [
    {
      Key: 'si-owned-by',
      Value: `${APP_NAME}-${SERVICE_NAME}:${BUCKET_LOGICAL_ID}@${REGION}`,
    },
  ],
});

const buildMockTencentClient = (): TencentMockClient => {
  const client: TencentMockClient = {
    cos: {
      createBucket: jest.fn().mockResolvedValue({}),
      getBucket: jest.fn().mockImplementation(async () => getBucketInfo()),
      deleteBucket: jest.fn().mockResolvedValue({}),
      updateBucketAcl: jest.fn().mockResolvedValue({}),
      updateBucketWebsite: jest.fn().mockResolvedValue({}),
      bindCustomDomain: jest
        .fn()
        .mockImplementation(
          async (_bucket: string, domain: string, options?: { skipDns?: boolean }) => ({
            domain,
            cname: COS_ENDPOINT,
            bucketDomainBound: true,
            ...(options?.skipDns ? {} : { dnsRecordId: 'cos-dns-record-1' }),
          }),
        ),
      unbindCustomDomain: jest.fn().mockResolvedValue(undefined),
      putBucketPolicy: jest.fn().mockResolvedValue({}),
      deleteBucketPolicy: jest.fn().mockResolvedValue({}),
      getCosEndpoint: jest.fn((bucket: string) => `${bucket}.cos.${REGION}.myqcloud.com`),
    },
    ssl: {
      uploadCertificate: jest.fn().mockResolvedValue({ certificateId: 'uploaded-cert-1' }),
      deployCertificateInstance: jest
        .fn()
        .mockResolvedValue({ deployRecordId: 1, deployStatus: 1 }),
      getCertificate: jest.fn().mockResolvedValue(null),
      deleteCertificate: jest.fn().mockResolvedValue(undefined),
    },
    dns: {
      addDomainRecord: jest.fn().mockResolvedValue('cdn-dns-record-1'),
      updateDomainRecord: jest.fn().mockResolvedValue(undefined),
      deleteDomainRecord: jest.fn().mockResolvedValue(undefined),
      describeDomainRecords: jest.fn().mockResolvedValue([]),
      checkDomainRecordExists: jest.fn().mockResolvedValue(false),
    },
    cdn: {
      addCdnDomain: jest.fn().mockResolvedValue({}),
      describeCdnDomain: jest
        .fn()
        .mockResolvedValue({ domainName: BUCKET_DOMAIN, cname: CDN_CNAME, status: 'online' }),
      deleteCdnDomain: jest.fn().mockResolvedValue({}),
      updateCdnDelivery: jest.fn().mockResolvedValue({}),
      applyCacheConfig: jest.fn().mockResolvedValue({}),
      applyCompression: jest.fn().mockResolvedValue({}),
      applyHttpsRedirect: jest.fn().mockResolvedValue({}),
      enableHttps: jest.fn().mockResolvedValue({}),
    },
  };
  return client;
};

type BucketCdnShape = {
  cdnType?: string;
  scope?: string;
  cacheTtl?: number;
  ignoreQueryString?: boolean;
  originProtocol?: string;
  forceRedirectHttps?: boolean;
};

const buildIacYaml = (bucketCdn?: BucketCdnShape): string => `version: 0.0.1
provider:
  name: tencent
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
        bucketCdn.ignoreQueryString != null
          ? `          ignore_query_string: ${bucketCdn.ignoreQueryString}\n`
          : ''
      }${bucketCdn.originProtocol ? `          origin_protocol: ${bucketCdn.originProtocol}\n` : ''}${
        bucketCdn.forceRedirectHttps != null
          ? `          force_redirect_https: ${bucketCdn.forceRedirectHttps}\n`
          : ''
      }`
    : ''
}
`;

const readStateFile = async () => {
  const state = await readScopedState(APP_NAME, SERVICE_NAME, STAGE, REGION, 'tencent');
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
  provider: 'tencent' as const,
  accessKeyId: 'test-key',
  accessKeySecret: 'test-secret',
});

describe('Tencent COS CDN Flow Service Test (issue #283)', () => {
  let tempDir: string;
  let iacFilePath: string;
  let mockClient: TencentMockClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'tencent-cdn-flow-'));
    iacFilePath = path.join(tempDir, 'tencent-cdn-flow.yml');
    await fs.writeFile(
      iacFilePath,
      buildIacYaml({
        cacheTtl: 3600,
        ignoreQueryString: true,
        originProtocol: 'https',
        forceRedirectHttps: true,
      }),
      'utf-8',
    );

    mockClient = buildMockTencentClient();
    mockCreateTencentClient.mockReturnValue(mockClient);

    await cleanScopedState(APP_NAME, SERVICE_NAME);
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
    await cleanScopedState(APP_NAME, SERVICE_NAME);
  });

  it('deploys a bucket binding with CDN delivery, certificate and CDN CNAME', async () => {
    await deploy(deployOptions(iacFilePath));

    // CDN domain created with the COS bucket as origin and si scope mapped
    expect(mockClient.cdn.addCdnDomain).toHaveBeenCalledWith({
      domainName: BUCKET_DOMAIN,
      serviceType: 'web',
      area: 'global',
      origin: {
        originType: 'cos',
        origins: [COS_ENDPOINT],
        serverName: COS_ENDPOINT,
        originPullProtocol: 'https',
      },
    });

    // cache/redirect options applied (cache_ttl is seconds)
    expect(mockClient.cdn.applyCacheConfig).toHaveBeenCalledWith(BUCKET_DOMAIN, 3600, true);
    expect(mockClient.cdn.applyHttpsRedirect).toHaveBeenCalledWith(BUCKET_DOMAIN, true);

    // certificate deployed to the CDN domain via the SSL service
    expect(mockClient.ssl.deployCertificateInstance).toHaveBeenCalledWith(BUCKET_CERT_ID, 'cdn', [
      BUCKET_DOMAIN,
    ]);
    expect(mockClient.cdn.enableHttps).toHaveBeenCalledWith(BUCKET_DOMAIN);

    // DNS CNAME points at the CDN domain's CNAME
    expect(mockClient.dns.addDomainRecord).toHaveBeenCalledWith({
      domainName: 'example.com',
      rr: 'static',
      type: 'CNAME',
      value: CDN_CNAME,
      ttl: 600,
    });

    // bucket keeps the REST binding without a competing bucket-side DNS record
    expect(mockClient.cos.bindCustomDomain).toHaveBeenCalledWith(BUCKET_NAME, BUCKET_DOMAIN, {
      skipDns: true,
    });

    const state = await readStateFile();
    const bucketState = state.stages?.[STAGE]?.resources?.[BUCKET_LOGICAL_ID];
    expect(bucketState?.instances).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'TENCENT_CDN_DOMAIN', id: BUCKET_DOMAIN }),
        expect.objectContaining({ type: 'TENCENT_CDN_DNS_CNAME' }),
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
    mockCreateTencentClient.mockReturnValue(mockClient);
    await deploy(deployOptions(iacFilePath));
    expect(mockClient.cdn.addCdnDomain).not.toHaveBeenCalled();

    // Change cdn_type/scope/cache_ttl: Tencent updates delivery in place.
    await fs.writeFile(
      iacFilePath,
      buildIacYaml({ cdnType: 'media', scope: 'chinese_mainland', cacheTtl: 7200 }),
      'utf-8',
    );
    jest.clearAllMocks();
    mockCreateTencentClient.mockReturnValue(mockClient);
    await deploy(deployOptions(iacFilePath));

    expect(mockClient.cdn.addCdnDomain).not.toHaveBeenCalled();
    expect(mockClient.cdn.deleteCdnDomain).not.toHaveBeenCalled();
    expect(mockClient.cdn.updateCdnDelivery).toHaveBeenCalledWith(
      BUCKET_DOMAIN,
      expect.objectContaining({ serviceType: 'media', area: 'mainland' }),
    );
    expect(mockClient.cdn.applyCacheConfig).toHaveBeenCalledWith(BUCKET_DOMAIN, 7200, undefined);
  });

  it('switches a binding off CDN at binding level and rebuilds it as a direct binding', async () => {
    await deploy(deployOptions(iacFilePath));

    await fs.writeFile(iacFilePath, buildIacYaml(), 'utf-8');
    jest.clearAllMocks();
    mockCreateTencentClient.mockReturnValue(mockClient);
    await deploy(deployOptions(iacFilePath));

    // CDN delivery torn down for this binding only…
    expect(mockClient.cdn.deleteCdnDomain).toHaveBeenCalledWith(BUCKET_DOMAIN);
    expect(mockClient.dns.deleteDomainRecord).toHaveBeenCalledWith(
      'example.com',
      'cdn-dns-record-1',
    );
    // …and the same hostname re-bound directly (bucket REST rule + bucket CNAME record).
    expect(mockClient.cos.bindCustomDomain).toHaveBeenCalledWith(BUCKET_NAME, BUCKET_DOMAIN);
    expect(mockClient.cos.unbindCustomDomain).toHaveBeenCalledWith(BUCKET_NAME, BUCKET_DOMAIN);

    const state = await readStateFile();
    const bucketState = state.stages?.[STAGE]?.resources?.[BUCKET_LOGICAL_ID];
    expect(bucketState?.instances).toEqual(
      expect.arrayContaining([expect.objectContaining({ type: 'TENCENT_COS_DNS_CNAME' })]),
    );
    expect(bucketState?.instances?.some((i) => i.type === 'TENCENT_CDN_DOMAIN')).toBe(false);
  });

  it('destroys the CDN domain, its DNS record and the binding with the bucket', async () => {
    await deploy(deployOptions(iacFilePath));

    jest.clearAllMocks();
    mockCreateTencentClient.mockReturnValue(mockClient);

    await destroyStack({
      location: iacFilePath,
      stage: STAGE,
      region: REGION,
      provider: 'tencent',
      accessKeyId: 'test-key',
      accessKeySecret: 'test-secret',
    });

    expect(mockClient.cdn.deleteCdnDomain).toHaveBeenCalledWith(BUCKET_DOMAIN);
    expect(mockClient.dns.deleteDomainRecord).toHaveBeenCalledWith(
      'example.com',
      'cdn-dns-record-1',
    );
    expect(mockClient.cos.unbindCustomDomain).toHaveBeenCalledWith(BUCKET_NAME, BUCKET_DOMAIN);
    expect(mockClient.cos.deleteBucket).toHaveBeenCalledWith(BUCKET_NAME, REGION);

    const state = await readStateFile();
    expect(state.stages?.[STAGE]?.resources).toEqual({});
  });
});

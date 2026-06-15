import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { deploy } from '../../src/commands/deploy';
import { destroyStack } from '../../src/commands/destroy';
import { createMockAliyunClient, type MockAliyunClient } from './mockCloudClient';

jest.mock('../../src/common/aliyunClient', () => ({
  createAliyunClient: jest.fn(),
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
const mockCreateAliyunClient = require('../../src/common/aliyunClient')
  .createAliyunClient as jest.Mock;

const APP_NAME = 'cdn-flow-app';
const SERVICE_NAME = 'cdn-flow-service';
const STAGE = 'dev';
const REGION = 'cn-hangzhou';
const BUCKET_NAME = 'cdn-flow-bucket';
const BUCKET_LOGICAL_ID = 'buckets.site_bucket';
const EVENT_LOGICAL_ID = 'events.gateway_event';
const BUCKET_DOMAIN = 'static.example.com';
const API_DOMAIN = 'api.example.com';
const BUCKET_CERT_ID = 'bucket-cert-id';
const API_CERT_ID = 'api-cert-id';
const APIGW_GROUP_ID = 'group-123';
const APIGW_SUB_DOMAIN = 'group-123.apigw.aliyuncs.com';
const API_ID = 'api-123';
const API_NAME = 'cdn-flow-gateway-dev-agw-api-GET-api--hello';
const STATE_FILE_PATH = path.join(
  process.cwd(),
  '.serverlessinsight',
  `state-${APP_NAME}-${SERVICE_NAME}.json`,
);
const STATE_LOCK_PATH = `${STATE_FILE_PATH}.lock`;
const WEBSITE_SOURCE_PATH = path.join(process.cwd(), 'tests/fixtures/test-bucket');

type ExtendedMockAliyunClient = MockAliyunClient & {
  dns: {
    addDomainRecord: jest.Mock;
    deleteDomainRecord: jest.Mock;
    describeDomainRecords: jest.Mock;
    checkDomainRecordExists: jest.Mock;
  };
  cas: {
    getCertificate: jest.Mock;
    uploadCertificate: jest.Mock;
    deleteCertificate: jest.Mock;
  };
  oss: MockAliyunClient['oss'] & {
    getBucket: jest.Mock;
    uploadFiles: jest.Mock;
    updateBucketAcl: jest.Mock;
    updateBucketWebsite: jest.Mock;
    bindCustomDomain: jest.Mock;
    unbindCustomDomain: jest.Mock;
    putFile: jest.Mock;
  };
  apigw: MockAliyunClient['apigw'] & {
    findApiGroupByName: jest.Mock;
    updateApiGroup: jest.Mock;
    updateApi: jest.Mock;
  };
};

type CdnConfigShape = {
  scope: 'global' | 'domestic' | 'overseas';
  cacheTtl: number;
  ignoreQueryString: boolean;
  originProtocol: 'http' | 'https' | 'follow';
  compression: boolean;
  forceRedirectHttps: boolean;
};

const getBucketInfo = () => ({
  name: BUCKET_NAME,
  location: 'oss-cn-hangzhou',
  acl: 'private',
  storageClass: 'Standard',
  websiteConfig: {
    indexDocument: 'index.html',
    errorDocument: '404.html',
  },
});

const getApigwGroupInfo = () => ({
  groupId: APIGW_GROUP_ID,
  groupName: `${SERVICE_NAME}-${STAGE}-agw-group`,
  subDomain: APIGW_SUB_DOMAIN,
  description: `API Gateway group for ${SERVICE_NAME}`,
});

const getApiInfo = (apiId: string = API_ID) => ({
  apiId,
  apiName: API_NAME,
  groupId: APIGW_GROUP_ID,
  groupName: `${SERVICE_NAME}-${STAGE}-agw-group`,
  requestConfig: {
    requestProtocol: 'HTTP',
    requestHttpMethod: 'GET',
    requestPath: '/api/hello',
    requestMode: 'PASSTHROUGH',
  },
  serviceConfig: {
    serviceProtocol: 'FunctionCompute',
  },
  resultType: 'PASSTHROUGH',
});

const buildMockAliyunClient = (): ExtendedMockAliyunClient => {
  const base = createMockAliyunClient() as unknown as ExtendedMockAliyunClient;

  base.oss = {
    ...base.oss,
    getBucket: jest.fn().mockResolvedValue(getBucketInfo()),
    uploadFiles: jest.fn().mockResolvedValue(undefined),
    updateBucketAcl: jest.fn().mockResolvedValue(undefined),
    updateBucketWebsite: jest.fn().mockResolvedValue(undefined),
    bindCustomDomain: jest.fn().mockResolvedValue({
      domain: BUCKET_DOMAIN,
      cname: `${BUCKET_NAME}.oss-cn-hangzhou.aliyuncs.com`,
      bucketCnameBound: true,
    }),
    unbindCustomDomain: jest.fn().mockResolvedValue(undefined),
    putFile: jest.fn().mockResolvedValue(undefined),
  };

  base.apigw = {
    ...base.apigw,
    findApiGroupByName: jest.fn().mockResolvedValue(null),
    updateApiGroup: jest.fn().mockResolvedValue(undefined),
    updateApi: jest.fn().mockResolvedValue(undefined),
    createApiGroup: jest.fn().mockResolvedValue(APIGW_GROUP_ID),
    getApiGroup: jest.fn().mockResolvedValue(getApigwGroupInfo()),
    createApi: jest.fn().mockResolvedValue(API_ID),
    getApi: jest.fn().mockImplementation((_groupId: string, apiId: string) => {
      return Promise.resolve(getApiInfo(apiId));
    }),
    deployApi: jest.fn().mockResolvedValue(undefined),
    abolishApi: jest.fn().mockResolvedValue(undefined),
    deleteApi: jest.fn().mockResolvedValue(undefined),
    deleteApiGroup: jest.fn().mockResolvedValue(undefined),
    bindCustomDomain: jest.fn().mockImplementation((_, state) => Promise.resolve(state)),
    unbindCustomDomain: jest.fn().mockResolvedValue(undefined),
  };

  base.cdn = {
    ...base.cdn,
    describeCdnDomainDetail: jest.fn().mockImplementation((domainName: string) => {
      return Promise.resolve({
        domainName,
        cname: `${domainName}.cdn.aliyuncs.com`,
        status: 'online',
      });
    }),
  };

  base.dns = {
    addDomainRecord: jest.fn().mockImplementation(({ rr, type }: { rr: string; type: string }) => {
      return Promise.resolve(`${rr}-${type.toLowerCase()}-record-id`);
    }),
    deleteDomainRecord: jest.fn().mockResolvedValue(undefined),
    describeDomainRecords: jest.fn().mockResolvedValue([]),
    checkDomainRecordExists: jest.fn().mockResolvedValue(false),
  };

  base.cas = {
    getCertificate: jest.fn().mockImplementation((certId: string) => {
      return Promise.resolve({
        cert: `cert-body-${certId}`,
        key: `cert-key-${certId}`,
      });
    }),
    uploadCertificate: jest.fn().mockResolvedValue(undefined),
    deleteCertificate: jest.fn().mockResolvedValue(undefined),
  };

  return base;
};

const buildIacYaml = (bucketCdn: CdnConfigShape, apiCdn: CdnConfigShape): string => `version: 0.0.1
app: ${APP_NAME}
provider:
  name: aliyun
  region: ${REGION}

stages:
  ${STAGE}:
    region: ${REGION}

service: ${SERVICE_NAME}

buckets:
  site_bucket:
    name: ${BUCKET_NAME}
    website:
      code: ${JSON.stringify(WEBSITE_SOURCE_PATH)}
      index: index.html
    domain:
      domain_name: ${BUCKET_DOMAIN}
      certificate_id: ${BUCKET_CERT_ID}
      cdn:
        enabled: true
        cdn_type: web
        scope: ${bucketCdn.scope}
        cache_ttl: ${bucketCdn.cacheTtl}
        ignore_query_string: ${bucketCdn.ignoreQueryString}
        origin_protocol: ${bucketCdn.originProtocol}
        compression: ${bucketCdn.compression}
        force_redirect_https: ${bucketCdn.forceRedirectHttps}

events:
  gateway_event:
    type: API_GATEWAY
    name: cdn-flow-gateway
    domain:
      domain_name: ${API_DOMAIN}
      certificate_id: ${API_CERT_ID}
      cdn:
        enabled: true
        cdn_type: web
        scope: ${apiCdn.scope}
        cache_ttl: ${apiCdn.cacheTtl}
        ignore_query_string: ${apiCdn.ignoreQueryString}
        origin_protocol: ${apiCdn.originProtocol}
        compression: ${apiCdn.compression}
        force_redirect_https: ${apiCdn.forceRedirectHttps}
    triggers:
      - method: GET
        path: /api/hello
        backend: hello-function
`;

const writeIacFile = async (
  iacFilePath: string,
  bucketCdn: CdnConfigShape,
  apiCdn: CdnConfigShape,
): Promise<void> => {
  await fs.writeFile(iacFilePath, buildIacYaml(bucketCdn, apiCdn), 'utf-8');
};

const readStateFile = async () => {
  const content = await fs.readFile(STATE_FILE_PATH, 'utf-8');
  return JSON.parse(content) as {
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

const INITIAL_BUCKET_CDN: CdnConfigShape = {
  scope: 'global',
  cacheTtl: 3600,
  ignoreQueryString: true,
  originProtocol: 'https',
  compression: true,
  forceRedirectHttps: true,
};

const INITIAL_API_CDN: CdnConfigShape = {
  scope: 'global',
  cacheTtl: 1800,
  ignoreQueryString: false,
  originProtocol: 'https',
  compression: true,
  forceRedirectHttps: true,
};

const UPDATED_BUCKET_CDN: CdnConfigShape = {
  scope: 'domestic',
  cacheTtl: 7200,
  ignoreQueryString: false,
  originProtocol: 'http',
  compression: false,
  forceRedirectHttps: false,
};

const UPDATED_API_CDN: CdnConfigShape = {
  scope: 'overseas',
  cacheTtl: 900,
  ignoreQueryString: true,
  originProtocol: 'follow',
  compression: false,
  forceRedirectHttps: false,
};

describe('CDN Flow Service Test', () => {
  let tempDir: string;
  let iacFilePath: string;
  let mockClient: ExtendedMockAliyunClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'cdn-flow-'));
    iacFilePath = path.join(tempDir, 'cdn-flow.yml');
    await writeIacFile(iacFilePath, INITIAL_BUCKET_CDN, INITIAL_API_CDN);

    mockClient = buildMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    await fs.rm(STATE_FILE_PATH, { force: true }).catch(() => {});
    await fs.rm(STATE_LOCK_PATH, { force: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
    await fs.rm(STATE_FILE_PATH, { force: true }).catch(() => {});
    await fs.rm(STATE_LOCK_PATH, { force: true }).catch(() => {});
  });

  it('should deploy bucket and API Gateway CDN resources with advanced CDN fields', async () => {
    await deploy({
      location: iacFilePath,
      stage: STAGE,
      autoApprove: true,
      region: REGION,
      provider: 'aliyun',
      accessKeyId: 'test-key',
      accessKeySecret: 'test-secret',
    });

    expect(mockClient.cas.getCertificate).toHaveBeenCalledWith(BUCKET_CERT_ID);
    expect(mockClient.cas.getCertificate).toHaveBeenCalledWith(API_CERT_ID);

    expect(mockClient.cdn.addCdnDomain).toHaveBeenCalledWith({
      domainName: BUCKET_DOMAIN,
      cdnType: 'web',
      sources: [{ type: 'oss', content: 'test-bucket.oss-cn-hangzhou.aliyuncs.com' }],
      scope: 'global',
    });
    expect(mockClient.cdn.addCdnDomain).toHaveBeenCalledWith({
      domainName: API_DOMAIN,
      cdnType: 'web',
      sources: [{ type: 'domain', content: APIGW_SUB_DOMAIN, port: 443 }],
      scope: 'global',
    });

    expect(mockClient.cdn.applyCacheConfig).toHaveBeenCalledWith(BUCKET_DOMAIN, 3600, true);
    expect(mockClient.cdn.applyCacheConfig).toHaveBeenCalledWith(API_DOMAIN, 1800, false);
    expect(mockClient.cdn.applyProtocolConfig).toHaveBeenCalledWith(BUCKET_DOMAIN, 'https');
    expect(mockClient.cdn.applyProtocolConfig).toHaveBeenCalledWith(API_DOMAIN, 'https');
    expect(mockClient.cdn.applyCompression).toHaveBeenCalledWith(BUCKET_DOMAIN, true);
    expect(mockClient.cdn.applyCompression).toHaveBeenCalledWith(API_DOMAIN, true);
    expect(mockClient.cdn.applyHttpsRedirect).toHaveBeenCalledWith(BUCKET_DOMAIN, true);
    expect(mockClient.cdn.applyHttpsRedirect).toHaveBeenCalledWith(API_DOMAIN, true);

    expect(mockClient.cdn.setDomainServerCertificate).toHaveBeenCalledWith(BUCKET_DOMAIN, {
      serverCertificate: `cert-body-${BUCKET_CERT_ID}`,
      privateKey: `cert-key-${BUCKET_CERT_ID}`,
      serverCertificateStatus: 'on',
    });
    expect(mockClient.cdn.setDomainServerCertificate).toHaveBeenCalledWith(API_DOMAIN, {
      serverCertificate: `cert-body-${API_CERT_ID}`,
      privateKey: `cert-key-${API_CERT_ID}`,
      serverCertificateStatus: 'on',
    });

    expect(mockClient.dns.addDomainRecord).toHaveBeenCalledWith({
      domainName: 'example.com',
      rr: 'static',
      type: 'CNAME',
      value: `${BUCKET_DOMAIN}.cdn.aliyuncs.com`,
      ttl: 600,
    });
    expect(mockClient.dns.addDomainRecord).toHaveBeenCalledWith({
      domainName: 'example.com',
      rr: 'api',
      type: 'CNAME',
      value: `${API_DOMAIN}.cdn.aliyuncs.com`,
      ttl: 600,
    });

    const state = await readStateFile();
    const bucketState = state.stages?.[STAGE]?.resources?.[BUCKET_LOGICAL_ID];
    const eventState = state.stages?.[STAGE]?.resources?.[EVENT_LOGICAL_ID];

    expect(bucketState?.instances).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'ALIYUN_CDN_DISTRIBUTION', id: BUCKET_DOMAIN }),
        expect.objectContaining({ type: 'ALIYUN_CDN_DNS_CNAME' }),
      ]),
    );
    expect(eventState?.instances).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'ALIYUN_CDN_DISTRIBUTION', id: API_DOMAIN }),
        expect.objectContaining({ type: 'ALIYUN_CDN_DNS_CNAME' }),
      ]),
    );
    expect(bucketState?.definition).toEqual(
      expect.objectContaining({
        cdnEnabled: true,
        cdnScope: 'global',
        cdnCacheTtl: 3600,
      }),
    );
    expect(eventState?.definition).toEqual(
      expect.objectContaining({
        domain: expect.objectContaining({
          cdnEnabled: true,
          cdnScope: 'global',
          cdnCacheTtl: 1800,
        }),
      }),
    );
  });

  it('should update existing CDN resources with modifyCdnDomain', async () => {
    await deploy({
      location: iacFilePath,
      stage: STAGE,
      autoApprove: true,
      region: REGION,
      provider: 'aliyun',
      accessKeyId: 'test-key',
      accessKeySecret: 'test-secret',
    });

    jest.clearAllMocks();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    await writeIacFile(iacFilePath, UPDATED_BUCKET_CDN, UPDATED_API_CDN);

    await deploy({
      location: iacFilePath,
      stage: STAGE,
      autoApprove: true,
      region: REGION,
      provider: 'aliyun',
      accessKeyId: 'test-key',
      accessKeySecret: 'test-secret',
    });

    expect(mockClient.cdn.addCdnDomain).not.toHaveBeenCalled();
    expect(mockClient.cdn.modifyCdnDomain).toHaveBeenCalledWith({
      domainName: BUCKET_DOMAIN,
      cdnType: 'web',
      scope: 'domestic',
      sources: [{ type: 'oss', content: 'test-bucket.oss-cn-hangzhou.aliyuncs.com' }],
    });
    expect(mockClient.cdn.modifyCdnDomain).toHaveBeenCalledWith({
      domainName: API_DOMAIN,
      cdnType: 'web',
      scope: 'overseas',
      sources: [{ type: 'domain', content: APIGW_SUB_DOMAIN }],
    });

    expect(mockClient.cdn.applyCacheConfig).toHaveBeenCalledWith(BUCKET_DOMAIN, 7200, false);
    expect(mockClient.cdn.applyCacheConfig).toHaveBeenCalledWith(API_DOMAIN, 900, true);
    expect(mockClient.cdn.applyProtocolConfig).toHaveBeenCalledWith(BUCKET_DOMAIN, 'http');
    expect(mockClient.cdn.applyProtocolConfig).toHaveBeenCalledWith(API_DOMAIN, 'follow');
    expect(mockClient.cdn.applyCompression).toHaveBeenCalledWith(BUCKET_DOMAIN, false);
    expect(mockClient.cdn.applyCompression).toHaveBeenCalledWith(API_DOMAIN, false);
    expect(mockClient.cdn.applyHttpsRedirect).toHaveBeenCalledWith(BUCKET_DOMAIN, false);
    expect(mockClient.cdn.applyHttpsRedirect).toHaveBeenCalledWith(API_DOMAIN, false);

    const state = await readStateFile();
    const bucketState = state.stages?.[STAGE]?.resources?.[BUCKET_LOGICAL_ID];
    const eventState = state.stages?.[STAGE]?.resources?.[EVENT_LOGICAL_ID];

    expect(bucketState?.definition).toEqual(
      expect.objectContaining({
        cdnScope: 'domestic',
        cdnCacheTtl: 7200,
        cdnOriginProtocol: 'http',
        cdnCompression: false,
        cdnForceRedirectHttps: false,
      }),
    );
    expect(eventState?.definition).toEqual(
      expect.objectContaining({
        domain: expect.objectContaining({
          cdnScope: 'overseas',
          cdnCacheTtl: 900,
          cdnOriginProtocol: 'follow',
          cdnCompression: false,
          cdnForceRedirectHttps: false,
        }),
      }),
    );
  });

  it('should clean up CDN resources during destroy', async () => {
    await deploy({
      location: iacFilePath,
      stage: STAGE,
      autoApprove: true,
      region: REGION,
      provider: 'aliyun',
      accessKeyId: 'test-key',
      accessKeySecret: 'test-secret',
    });

    jest.clearAllMocks();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    await destroyStack({
      location: iacFilePath,
      stage: STAGE,
      region: REGION,
      provider: 'aliyun',
      accessKeyId: 'test-key',
      accessKeySecret: 'test-secret',
    });

    expect(mockClient.cdn.deleteCdnDomain).toHaveBeenCalledWith(BUCKET_DOMAIN);
    expect(mockClient.cdn.deleteCdnDomain).toHaveBeenCalledWith(API_DOMAIN);
    expect(mockClient.dns.deleteDomainRecord).toHaveBeenCalledWith('static-cname-record-id');
    expect(mockClient.dns.deleteDomainRecord).toHaveBeenCalledWith('api-cname-record-id');
    expect(mockClient.oss.deleteBucket).toHaveBeenCalledWith(BUCKET_NAME);
    expect(mockClient.apigw.abolishApi).toHaveBeenCalledWith(APIGW_GROUP_ID, API_ID, 'RELEASE');
    expect(mockClient.apigw.deleteApi).toHaveBeenCalledWith(APIGW_GROUP_ID, API_ID);
    expect(mockClient.apigw.deleteApiGroup).toHaveBeenCalledWith(APIGW_GROUP_ID);

    const state = await readStateFile();
    expect(state.stages?.[STAGE]?.resources).toEqual({});
  });
});

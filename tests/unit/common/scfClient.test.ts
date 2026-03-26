import { createTencentCloudClient, createTdsqlcClient } from '../../../src/common/scfClient';
import { ProviderEnum } from '../../../src/common/providerEnum';
import type { Context } from '../../../src/types';

jest.mock('tencentcloud-sdk-nodejs-scf', () => ({
  scf: {
    v20180416: {
      Client: jest.fn().mockImplementation((config) => ({ config, type: 'scf' })),
    },
  },
}));

jest.mock('tencentcloud-sdk-nodejs-cynosdb', () => ({
  cynosdb: {
    v20190107: {
      Client: jest.fn().mockImplementation((config) => ({ config, type: 'cynosdb' })),
    },
  },
}));

jest.mock('cos-nodejs-sdk-v5', () =>
  jest.fn().mockImplementation((config) => ({ config, type: 'cos' })),
);

const mockContext = (overrides?: Partial<Context>): Context =>
  ({
    provider: ProviderEnum.TENCENT,
    region: 'ap-guangzhou',
    accessKeyId: 'test-secret-id',
    accessKeySecret: 'test-secret-key',
    stage: 'dev',
    ...overrides,
  }) as Context;

type MockClient = { config: Record<string, unknown> };

describe('scfClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTencentCloudClient', () => {
    it('should create SCF client with correct configuration', () => {
      const context = mockContext();
      const client = createTencentCloudClient(context);

      expect(client.scf).toBeDefined();
      expect((client.scf as unknown as MockClient).config).toEqual(
        expect.objectContaining({
          credential: {
            secretId: 'test-secret-id',
            secretKey: 'test-secret-key',
          },
          region: 'ap-guangzhou',
        }),
      );
    });

    it('should create COS client with correct credentials', () => {
      const context = mockContext();
      const client = createTencentCloudClient(context);

      expect(client.cos).toBeDefined();
      expect((client.cos as unknown as MockClient).config).toEqual(
        expect.objectContaining({
          SecretId: 'test-secret-id',
          SecretKey: 'test-secret-key',
        }),
      );
    });

    it('should use context region for SCF client', () => {
      const context = mockContext({ region: 'ap-shanghai' });
      const client = createTencentCloudClient(context);

      expect((client.scf as unknown as MockClient).config.region).toBe('ap-shanghai');
    });

    it('should include httpProfile with correct endpoint', () => {
      const context = mockContext();
      const client = createTencentCloudClient(context);

      const scfConfig = (client.scf as unknown as MockClient).config;
      expect(scfConfig.profile).toEqual({
        httpProfile: {
          endpoint: 'scf.tencentcloudapi.com',
        },
      });
    });
  });

  describe('createTdsqlcClient', () => {
    it('should create CynosDB client with correct configuration', () => {
      const context = mockContext();
      const client = createTdsqlcClient(context);

      expect(client).toBeDefined();
      expect((client as unknown as MockClient).config).toEqual(
        expect.objectContaining({
          credential: {
            secretId: 'test-secret-id',
            secretKey: 'test-secret-key',
          },
          region: 'ap-guangzhou',
        }),
      );
    });

    it('should use correct endpoint for CynosDB', () => {
      const context = mockContext();
      const client = createTdsqlcClient(context);

      const config = (client as unknown as MockClient).config;
      expect(config.profile).toEqual({
        httpProfile: {
          endpoint: 'cynosdb.tencentcloudapi.com',
        },
      });
    });

    it('should use context region for CynosDB client', () => {
      const context = mockContext({ region: 'ap-beijing' });
      const client = createTdsqlcClient(context);

      expect((client as unknown as MockClient).config.region).toBe('ap-beijing');
    });
  });
});

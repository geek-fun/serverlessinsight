/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTencentClient } from '../../../../src/common/tencentClient/index';

jest.mock('../../../../src/common/tencentClient/scfOperations', () => ({
  createScfOperations: jest.fn((client) => ({
    _mock: 'scf',
    client,
  })),
}));

jest.mock('../../../../src/common/tencentClient/cosOperations', () => ({
  createCosOperations: jest.fn((client, region, dnsOps) => ({
    _mock: 'cos',
    client,
    region,
    dnsOps,
  })),
}));

jest.mock('../../../../src/common/tencentClient/tdsqlcOperations', () => ({
  createTdsqlcOperations: jest.fn((client, context) => ({
    _mock: 'tdsqlc',
    client,
    context,
  })),
}));

jest.mock('../../../../src/common/tencentClient/esOperations', () => ({
  createTencentEsOperations: jest.fn((client, context) => ({
    _mock: 'es',
    client,
    context,
  })),
}));

jest.mock('../../../../src/common/tencentClient/dnspodOperations', () => ({
  createDnsOperations: jest.fn((client) => ({
    _mock: 'dns',
    client,
  })),
  createDnsClient: jest.fn((context) => ({
    _mock: 'dnsClient',
    context,
  })),
}));

jest.mock('../../../../src/common/tencentClient/sslOperations', () => ({
  createSslOperations: jest.fn((client) => ({
    _mock: 'ssl',
    client,
  })),
}));

jest.mock('tencentcloud-sdk-nodejs-scf', () => ({
  scf: {
    v20180416: {
      Client: jest.fn(() => ({ _mock: 'scfClient' })),
    },
  },
}));

jest.mock('tencentcloud-sdk-nodejs-cynosdb', () => ({
  cynosdb: {
    v20190107: {
      Client: jest.fn(() => ({ _mock: 'cynosdbClient' })),
    },
  },
}));

jest.mock('tencentcloud-sdk-nodejs-es', () => ({
  es: {
    v20180416: {
      Client: jest.fn(() => ({ _mock: 'esClient' })),
    },
  },
}));

jest.mock('tencentcloud-sdk-nodejs-ssl', () => ({
  ssl: {
    v20191205: {
      Client: jest.fn(() => ({ _mock: 'sslClient' })),
    },
  },
}));

jest.mock('cos-nodejs-sdk-v5', () => {
  return jest.fn(() => ({ _mock: 'cosClient' }));
});

const mockContext = {
  region: 'ap-guangzhou',
  accessKeyId: 'test-key-id',
  accessKeySecret: 'test-key-secret',
};

describe('tencentClient index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTencentClient', () => {
    it('should create and return all client operations', () => {
      const client = createTencentClient(mockContext as any);

      expect(client).toHaveProperty('scf');
      expect(client).toHaveProperty('cos');
      expect(client).toHaveProperty('tdsqlc');
      expect(client).toHaveProperty('es');
      expect(client).toHaveProperty('ssl');
      expect(client).toHaveProperty('dns');
    });

    it('should initialize SCF client with correct config', () => {
      createTencentClient(mockContext as any);

      const ScfClient = require('tencentcloud-sdk-nodejs-scf').scf.v20180416.Client;
      expect(ScfClient).toHaveBeenCalledWith(
        expect.objectContaining({
          credential: {
            secretId: 'test-key-id',
            secretKey: 'test-key-secret',
          },
          region: 'ap-guangzhou',
        }),
      );
    });

    it('should initialize COS client with correct credentials', () => {
      createTencentClient(mockContext as any);

      const COS = require('cos-nodejs-sdk-v5');
      expect(COS).toHaveBeenCalledWith({
        SecretId: 'test-key-id',
        SecretKey: 'test-key-secret',
      });
    });

    it('should initialize Cynosdb client with correct config', () => {
      createTencentClient(mockContext as any);

      const CynosdbClient = require('tencentcloud-sdk-nodejs-cynosdb').cynosdb.v20190107.Client;
      expect(CynosdbClient).toHaveBeenCalledWith(
        expect.objectContaining({
          credential: {
            secretId: 'test-key-id',
            secretKey: 'test-key-secret',
          },
          region: 'ap-guangzhou',
        }),
      );
    });

    it('should initialize ES client with correct config', () => {
      createTencentClient(mockContext as any);

      const EsClient = require('tencentcloud-sdk-nodejs-es').es.v20180416.Client;
      expect(EsClient).toHaveBeenCalledWith(
        expect.objectContaining({
          credential: {
            secretId: 'test-key-id',
            secretKey: 'test-key-secret',
          },
          region: 'ap-guangzhou',
        }),
      );
    });

    it('should initialize SSL client with correct config', () => {
      createTencentClient(mockContext as any);

      const SslClient = require('tencentcloud-sdk-nodejs-ssl').ssl.v20191205.Client;
      expect(SslClient).toHaveBeenCalledWith(
        expect.objectContaining({
          credential: {
            secretId: 'test-key-id',
            secretKey: 'test-key-secret',
          },
          region: 'ap-guangzhou',
        }),
      );
    });

    it('should create DNS client operations', () => {
      createTencentClient(mockContext as any);

      const {
        createDnsOperations,
      } = require('../../../../src/common/tencentClient/dnspodOperations');
      expect(createDnsOperations).toHaveBeenCalled();
    });

    it('should create SCF operations with SCF client', () => {
      createTencentClient(mockContext as any);

      const { createScfOperations } = require('../../../../src/common/tencentClient/scfOperations');
      expect(createScfOperations).toHaveBeenCalled();
    });

    it('should create COS operations with COS client, region, and DNS operations', () => {
      createTencentClient(mockContext as any);

      const { createCosOperations } = require('../../../../src/common/tencentClient/cosOperations');
      expect(createCosOperations).toHaveBeenCalledWith(
        expect.objectContaining({ _mock: 'cosClient' }),
        'ap-guangzhou',
        expect.objectContaining({ _mock: 'dns' }),
      );
    });

    it('should create TDSQLC operations with Cynosdb client and context', () => {
      createTencentClient(mockContext as any);

      const {
        createTdsqlcOperations,
      } = require('../../../../src/common/tencentClient/tdsqlcOperations');
      expect(createTdsqlcOperations).toHaveBeenCalledWith(
        expect.objectContaining({ _mock: 'cynosdbClient' }),
        mockContext,
      );
    });

    it('should create ES operations with ES client and context', () => {
      createTencentClient(mockContext as any);

      const {
        createTencentEsOperations,
      } = require('../../../../src/common/tencentClient/esOperations');
      expect(createTencentEsOperations).toHaveBeenCalledWith(
        expect.objectContaining({ _mock: 'esClient' }),
        mockContext,
      );
    });

    it('should create SSL operations with SSL client', () => {
      createTencentClient(mockContext as any);

      const { createSslOperations } = require('../../../../src/common/tencentClient/sslOperations');
      expect(createSslOperations).toHaveBeenCalled();
    });

    it('should set correct endpoint for each service', () => {
      createTencentClient(mockContext as any);

      const ScfClient = require('tencentcloud-sdk-nodejs-scf').scf.v20180416.Client;
      const CynosdbClient = require('tencentcloud-sdk-nodejs-cynosdb').cynosdb.v20190107.Client;
      const EsClient = require('tencentcloud-sdk-nodejs-es').es.v20180416.Client;
      const SslClient = require('tencentcloud-sdk-nodejs-ssl').ssl.v20191205.Client;

      expect(ScfClient).toHaveBeenCalledWith(
        expect.objectContaining({
          profile: {
            httpProfile: {
              endpoint: 'scf.tencentcloudapi.com',
            },
          },
        }),
      );

      expect(CynosdbClient).toHaveBeenCalledWith(
        expect.objectContaining({
          profile: {
            httpProfile: {
              endpoint: 'cynosdb.tencentcloudapi.com',
            },
          },
        }),
      );

      expect(EsClient).toHaveBeenCalledWith(
        expect.objectContaining({
          profile: {
            httpProfile: {
              endpoint: 'es.tencentcloudapi.com',
            },
          },
        }),
      );

      expect(SslClient).toHaveBeenCalledWith(
        expect.objectContaining({
          profile: {
            httpProfile: {
              endpoint: 'ssl.tencentcloudapi.com',
            },
          },
        }),
      );
    });

    it('should return client with all methods available', () => {
      const client = createTencentClient(mockContext as any);

      expect(typeof client.scf).toBe('object');
      expect(typeof client.cos).toBe('object');
      expect(typeof client.tdsqlc).toBe('object');
      expect(typeof client.es).toBe('object');
      expect(typeof client.ssl).toBe('object');
      expect(typeof client.dns).toBe('object');
    });
  });
});

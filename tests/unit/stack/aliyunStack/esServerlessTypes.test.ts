import {
  cloudEsToDefinition,
  databaseToEsConfig,
  extractEsDefinition,
} from '../../../../src/stack/aliyunStack/esServerlessTypes';
import type { EsInfo } from '../../../../src/common/aliyunClient/esOperations';
import { DatabaseDomain, DatabaseEnum, DatabaseVersionEnum } from '../../../../src/types';

describe('EsServerlessTypes', () => {
  describe('databaseToEsConfig', () => {
    it('should convert database domain to ES config for Search 7.10', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es-search',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: DatabaseVersionEnum['ES_SEARCH_7.10'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PUBLIC',
          ingressRules: ['10.0.0.0/8', '192.168.0.0/16'],
        },
        cu: {
          min: 2,
          max: 8,
        },
        storage: {
          min: 20,
        },
      };

      const result = databaseToEsConfig(database);

      expect(result.appName).toBe('test-es-search');
      expect(result.appVersion).toBe('7.10');
      expect(result.authentication?.basicAuth?.[0].password).toBe('TestPass123!');
      expect(result.quotaInfo?.appType).toBe('STANDARD');
      expect(result.quotaInfo?.cu).toBe(2);
      expect(result.quotaInfo?.storage).toBe(20);
      expect(result.description).toBe('Elasticsearch serverless app: test-es-search');
      expect(result.chargeType).toBe('POSTPAY');
    });

    it('should configure network for PUBLIC access', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: DatabaseVersionEnum['ES_SEARCH_7.10'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PUBLIC',
          ingressRules: ['10.0.0.0/8'],
        },
        cu: {
          min: 2,
          max: 8,
        },
        storage: {
          min: 20,
        },
      };

      const result = databaseToEsConfig(database);

      expect(result.network).toBeDefined();
      expect(result.network).toHaveLength(1);
      expect(result.network?.[0].type).toBe('PUBLIC_ES');
      expect(result.network?.[0].enabled).toBe(true);
      expect(result.network?.[0].whiteIpGroup?.[0].ips).toEqual(['10.0.0.0/8']);
    });

    it('should configure private network for PRIVATE access with VPC', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: DatabaseVersionEnum['ES_SEARCH_7.10'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['10.0.0.0/8'],
          vpcId: 'vpc-12345',
        },
        cu: {
          min: 2,
          max: 8,
        },
        storage: {
          min: 20,
        },
      };

      const result = databaseToEsConfig(database);

      expect(result.network).toBeUndefined();
      expect(result.privateNetwork).toBeDefined();
      expect(result.privateNetwork).toHaveLength(1);
      expect(result.privateNetwork?.[0].type).toBe('PRIVATE_ES');
      expect(result.privateNetwork?.[0].enabled).toBe(true);
      expect(result.privateNetwork?.[0].vpcId).toBe('vpc-12345');
      expect(result.privateNetwork?.[0].whiteIpGroup?.[0].ips).toEqual(['10.0.0.0/8']);
    });

    it('should not configure network for PRIVATE access without VPC', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: DatabaseVersionEnum['ES_SEARCH_7.10'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: [],
        },
        cu: {
          min: 2,
          max: 8,
        },
        storage: {
          min: 20,
        },
      };

      const result = databaseToEsConfig(database);

      expect(result.network).toBeUndefined();
      expect(result.privateNetwork).toBeUndefined();
    });

    it('should map Time Series 7.10 correctly', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es-ts',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: DatabaseVersionEnum['ES_TIME_SERIES_7.10'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: [],
        },
        cu: {
          min: 2,
          max: 8,
        },
        storage: {
          min: 20,
        },
      };

      const result = databaseToEsConfig(database);

      expect(result.appVersion).toBe('7.10');
      expect(result.quotaInfo?.appType).toBe('TRIAL');
    });

    it('should throw error for unsupported database type', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-db',
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
        version: DatabaseVersionEnum['MYSQL_8.0'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: [],
        },
        cu: {
          min: 1,
          max: 8,
        },
        storage: {
          min: 20,
        },
      };

      expect(() => databaseToEsConfig(database)).toThrow('Unsupported ES database type/version');
    });
  });

  describe('extractEsDefinition', () => {
    it('should extract all attributes with null for undefined fields', () => {
      const config = {
        appName: 'test-es',
        appVersion: '7.10',
        authentication: {
          basicAuth: [
            {
              username: 'elastic',
              password: 'TestPass123!',
            },
          ],
        },
        quotaInfo: {
          appType: 'STANDARD',
          cu: 2,
          storage: 100,
        },
        description: 'Test ES app',
        chargeType: 'POSTPAY',
        network: [
          {
            type: 'PUBLIC_ES',
            enabled: true,
            domain: 'test.es.aliyuncs.com',
            port: 9200,
            whiteIpGroup: [
              {
                groupName: 'default',
                ips: ['10.0.0.0/8'],
              },
            ],
          },
        ],
        privateNetwork: [
          {
            type: 'PRIVATE_ES',
            enabled: true,
            vpcId: 'vpc-123',
            pvlEndpointId: 'ep-456',
            whiteIpGroup: [
              {
                groupName: 'private',
                ips: ['192.168.0.0/16'],
              },
            ],
          },
        ],
        tags: [
          {
            key: 'env',
            value: 'test',
          },
        ],
      };

      const definition = extractEsDefinition(config);

      expect(definition).toEqual({
        appName: 'test-es',
        appVersion: '7.10',
        authentication: {
          basicAuth: [{ password: '***', username: '***' }],
        },
        quotaInfo: {
          appType: 'STANDARD',
          cu: 2,
          storage: 100,
        },
        description: 'Test ES app',
        chargeType: 'POSTPAY',
        network: [
          {
            type: 'PUBLIC_ES',
            enabled: true,
            domain: 'test.es.aliyuncs.com',
            port: 9200,
            whiteIpGroup: [
              {
                groupName: 'default',
                ips: ['10.0.0.0/8'],
              },
            ],
          },
        ],
        privateNetwork: [
          {
            type: 'PRIVATE_ES',
            enabled: true,
            vpcId: 'vpc-123',
            pvlEndpointId: 'ep-456',
            whiteIpGroup: [
              {
                groupName: 'private',
                ips: ['192.168.0.0/16'],
              },
            ],
          },
        ],
        tags: [
          {
            key: 'env',
            value: 'test',
          },
        ],
      });
    });

    it('should mask passwords in definition', () => {
      const config = {
        appName: 'test-es',
        appVersion: '7.10',
        authentication: {
          basicAuth: [
            {
              username: 'admin',
              password: 'SuperSecret123!',
            },
          ],
        },
        quotaInfo: {
          appType: 'STANDARD',
          cu: 2,
        },
      };

      const definition = extractEsDefinition(config);

      expect(definition.authentication).toEqual({
        basicAuth: [{ password: '***', username: '***' }],
      });
    });

    it('should handle undefined authentication', () => {
      const config = {
        appName: 'test-es',
        appVersion: '7.10',
        quotaInfo: {
          appType: 'STANDARD',
          cu: 2,
        },
      };

      const definition = extractEsDefinition(config);

      expect(definition.authentication).toBeNull();
    });
  });

  describe('cloudEsToDefinition', () => {
    it('maps network, private network, tags, and readable ES attributes', () => {
      const info: EsInfo = {
        appName: 'orders-search',
        appType: 'STANDARD',
        description: 'Elasticsearch serverless app: orders-search',
        chargeType: 'POSTPAY',
        version: '7.10',
        network: [
          {
            type: 'PUBLIC_ES',
            enabled: true,
            domain: 'orders.es.aliyuncs.com',
            port: 9200,
            whiteIpGroup: [{ groupName: 'default', ips: ['10.0.0.0/8'] }],
          },
        ],
        privateNetwork: [
          {
            type: 'PRIVATE_ES',
            enabled: true,
            domain: 'orders.private.aliyuncs.com',
            port: 9200,
            vpcId: 'vpc-123',
            pvlEndpointId: 'ep-456',
            whiteIpGroup: [{ groupName: 'private', ips: ['192.168.0.0/16'] }],
          },
        ],
        tags: [{ key: 'env', value: 'prod' }],
      };

      expect(cloudEsToDefinition(info)).toEqual({
        appName: 'orders-search',
        appVersion: '7.10',
        description: 'Elasticsearch serverless app: orders-search',
        chargeType: 'POSTPAY',
        network: [
          {
            type: 'PUBLIC_ES',
            enabled: true,
            domain: 'orders.es.aliyuncs.com',
            port: 9200,
            whiteIpGroup: [{ groupName: 'default', ips: ['10.0.0.0/8'] }],
          },
        ],
        privateNetwork: [
          {
            type: 'PRIVATE_ES',
            enabled: true,
            domain: 'orders.private.aliyuncs.com',
            port: 9200,
            vpcId: 'vpc-123',
            pvlEndpointId: 'ep-456',
            whiteIpGroup: [{ groupName: 'private', ips: ['192.168.0.0/16'] }],
          },
        ],
        tags: [{ key: 'env', value: 'prod' }],
      });
    });

    it('omits config-only and unreadable attributes from minimal cloud info', () => {
      const definition = cloudEsToDefinition({ appId: 'app-1' });

      expect(definition).toEqual({});
      expect(definition).not.toHaveProperty('appVersion');
      expect(definition).not.toHaveProperty('authentication');
      expect(definition).not.toHaveProperty('quotaInfo');
      expect(definition).not.toHaveProperty('cu');
      expect(definition).not.toHaveProperty('storage');
    });

    it('omits absent network collections and preserves empty white IP groups', () => {
      const definition = cloudEsToDefinition({
        network: [{ type: 'PUBLIC_ES', whiteIpGroup: [] }],
        privateNetwork: undefined,
      });

      expect(definition.network).toEqual([
        { type: 'PUBLIC_ES', enabled: null, domain: null, port: null, whiteIpGroup: [] },
      ]);
      expect(definition).not.toHaveProperty('privateNetwork');
    });
  });
});

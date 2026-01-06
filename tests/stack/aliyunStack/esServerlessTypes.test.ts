import {
  databaseToEsConfig,
  extractEsDefinition,
} from '../../../src/stack/aliyunStack/esServerlessTypes';
import { DatabaseDomain, DatabaseEnum, DatabaseVersionEnum } from '../../../src/types';

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

      expect(result.AppName).toBe('test-es-search');
      expect(result.AppVersion).toBe('7.10');
      expect(result.Authentication?.BasicAuth?.[0].Password).toBe('TestPass123!');
      expect(result.QuotaInfo?.AppType).toBe('STANDARD');
      expect(result.QuotaInfo?.Cu).toBe(2);
      expect(result.QuotaInfo?.Storage).toBe(20);
      expect(result.Description).toBe('Elasticsearch serverless app: test-es-search');
      expect(result.ChargeType).toBe('POSTPAY');
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

      expect(result.Network).toBeDefined();
      expect(result.Network).toHaveLength(1);
      expect(result.Network?.[0].Type).toBe('PUBLIC_ES');
      expect(result.Network?.[0].Enabled).toBe(true);
      expect(result.Network?.[0].WhiteIpGroup?.[0].Ips).toEqual(['10.0.0.0/8']);
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

      expect(result.Network).toBeUndefined();
      expect(result.PrivateNetwork).toBeDefined();
      expect(result.PrivateNetwork).toHaveLength(1);
      expect(result.PrivateNetwork?.[0].Type).toBe('PRIVATE_ES');
      expect(result.PrivateNetwork?.[0].Enabled).toBe(true);
      expect(result.PrivateNetwork?.[0].VpcId).toBe('vpc-12345');
      expect(result.PrivateNetwork?.[0].WhiteIpGroup?.[0].Ips).toEqual(['10.0.0.0/8']);
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

      expect(result.Network).toBeUndefined();
      expect(result.PrivateNetwork).toBeUndefined();
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

      expect(result.AppVersion).toBe('7.10');
      expect(result.QuotaInfo?.AppType).toBe('TRIAL');
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
        AppName: 'test-es',
        AppVersion: '7.10',
        Authentication: {
          BasicAuth: [
            {
              Username: 'elastic',
              Password: 'TestPass123!',
            },
          ],
        },
        QuotaInfo: {
          AppType: 'STANDARD',
          Cu: 2,
          Storage: 100,
        },
        Description: 'Test ES app',
        ChargeType: 'POSTPAY',
        Network: [
          {
            Type: 'PUBLIC_ES',
            Enabled: true,
            Domain: 'test.es.aliyuncs.com',
            Port: 9200,
            WhiteIpGroup: [
              {
                GroupName: 'default',
                Ips: ['10.0.0.0/8'],
              },
            ],
          },
        ],
        PrivateNetwork: [
          {
            Type: 'PRIVATE_ES',
            Enabled: true,
            VpcId: 'vpc-123',
            PvlEndpointId: 'ep-456',
            WhiteIpGroup: [
              {
                GroupName: 'private',
                Ips: ['192.168.0.0/16'],
              },
            ],
          },
        ],
        Tags: [
          {
            Key: 'env',
            Value: 'test',
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
        AppName: 'test-es',
        AppVersion: '7.10',
        Authentication: {
          BasicAuth: [
            {
              Username: 'admin',
              Password: 'SuperSecret123!',
            },
          ],
        },
        QuotaInfo: {
          AppType: 'STANDARD',
          Cu: 2,
        },
      };

      const definition = extractEsDefinition(config);

      expect(definition.authentication).toEqual({
        basicAuth: [{ password: '***', username: '***' }],
      });
    });

    it('should handle undefined authentication', () => {
      const config = {
        AppName: 'test-es',
        AppVersion: '7.10',
        QuotaInfo: {
          AppType: 'STANDARD',
          Cu: 2,
        },
      };

      const definition = extractEsDefinition(config);

      expect(definition.authentication).toBeNull();
    });
  });
});

import {
  databaseToTencentEsConfig,
  extractTencentEsDefinition,
} from '../../../src/stack/scfStack/esServerlessTypes';
import { DatabaseDomain, DatabaseEnum, DatabaseVersionEnum } from '../../../src/types';

describe('TencentEsServerlessTypes', () => {
  describe('databaseToTencentEsConfig', () => {
    it('should convert database domain to Tencent ES config with minimal fields', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es-space',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: DatabaseVersionEnum['ES_SEARCH_7.10'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PUBLIC',
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

      const result = databaseToTencentEsConfig(database);

      expect(result).toEqual({
        SpaceName: 'test-es-space',
        Version: '7.10',
      });
    });

    it('should map ES_TIME_SERIES_7.10 version correctly', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es-timeseries',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: DatabaseVersionEnum['ES_TIME_SERIES_7.10'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PUBLIC',
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

      const result = databaseToTencentEsConfig(database);

      expect(result.SpaceName).toBe('test-es-timeseries');
      expect(result.Version).toBe('7.10');
    });

    it('should include VPC configuration when provided', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es-vpc',
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
          vpcId: 'vpc-12345',
          subnetId: 'subnet-67890',
        },
        cu: {
          min: 2,
          max: 8,
        },
        storage: {
          min: 20,
        },
      };

      const result = databaseToTencentEsConfig(database);

      expect(result.VpcId).toBe('vpc-12345');
      expect(result.SubnetId).toBe('subnet-67890');
    });

    it('should include IP whitelist from ingress rules', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es-whitelist',
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

      const result = databaseToTencentEsConfig(database);

      expect(result.KibanaWhiteIpList).toEqual(['10.0.0.0/8', '192.168.0.0/16']);
    });

    it('should throw for unsupported database type/version', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es',
        type: DatabaseEnum.TDSQL_C_SERVERLESS,
        version: DatabaseVersionEnum['MYSQL_8.0'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PUBLIC',
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

      expect(() => databaseToTencentEsConfig(database)).toThrow(
        'Unsupported ES database type/version',
      );
    });

    it('should not include KibanaWhiteIpList when ingress rules are empty', () => {
      const database: DatabaseDomain = {
        key: 'test_es',
        name: 'test-es-no-whitelist',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: DatabaseVersionEnum['ES_SEARCH_7.10'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PUBLIC',
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

      const result = databaseToTencentEsConfig(database);

      expect(result.KibanaWhiteIpList).toBeUndefined();
    });
  });

  describe('extractTencentEsDefinition', () => {
    it('should extract all attributes with null for undefined fields', () => {
      const config = {
        SpaceName: 'test-es-space',
        Version: '7.10',
      };

      const definition = extractTencentEsDefinition(config);

      expect(definition).toEqual({
        spaceName: 'test-es-space',
        version: '7.10',
        vpcId: null,
        subnetId: null,
        zone: null,
        kibanaWhiteIpList: null,
      });
    });

    it('should include VPC configuration when provided', () => {
      const config = {
        SpaceName: 'test-es-space',
        Version: '7.10',
        VpcId: 'vpc-12345',
        SubnetId: 'subnet-67890',
      };

      const definition = extractTencentEsDefinition(config);

      expect(definition.vpcId).toBe('vpc-12345');
      expect(definition.subnetId).toBe('subnet-67890');
    });

    it('should include KibanaWhiteIpList when provided', () => {
      const config = {
        SpaceName: 'test-es-space',
        Version: '7.10',
        KibanaWhiteIpList: ['10.0.0.0/8', '192.168.0.0/16'],
      };

      const definition = extractTencentEsDefinition(config);

      expect(definition.kibanaWhiteIpList).toEqual(['10.0.0.0/8', '192.168.0.0/16']);
    });

    it('should include zone when provided', () => {
      const config = {
        SpaceName: 'test-es-space',
        Version: '7.10',
        Zone: 'ap-guangzhou-1',
      };

      const definition = extractTencentEsDefinition(config);

      expect(definition.zone).toBe('ap-guangzhou-1');
    });

    it('should not include password in definition', () => {
      const config = {
        SpaceName: 'test-es-space',
        Version: '7.10',
      };

      const definition = extractTencentEsDefinition(config);

      expect(definition).not.toHaveProperty('password');
      expect(definition).not.toHaveProperty('Password');
    });
  });
});

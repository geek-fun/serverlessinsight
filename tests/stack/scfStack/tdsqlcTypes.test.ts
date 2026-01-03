import {
  databaseToTdsqlcConfig,
  extractTdsqlcAttributes,
} from '../../../src/stack/scfStack/tdsqlcTypes';
import { DatabaseDomain, DatabaseEnum, DatabaseVersionEnum } from '../../../src/types';

describe('TdsqlcTypes', () => {
  describe('databaseToTdsqlcConfig', () => {
    it('should convert database domain to TDSQL-C config with minimal fields', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-tdsqlc',
        type: DatabaseEnum.TDSQL_C_SERVERLESS,
        version: DatabaseVersionEnum['MYSQL_8.0'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['0.0.0.0/0'],
        },
        cu: {
          min: 1,
          max: 8,
        },
        storage: {
          min: 10,
        },
      };

      const result = databaseToTdsqlcConfig(database);

      expect(result).toEqual({
        ClusterName: 'test-tdsqlc',
        DbType: 'MYSQL' as const,
        DbVersion: '8.0',
        DbMode: 'SERVERLESS' as const,
        MinCpu: 1,
        MaxCpu: 8,
        AutoPause: false,
        AutoPauseDelay: 600,
        StoragePayMode: 0,
        AdminPassword: 'TestPass123!',
        MinStorageSize: 10,
      });
    });

    it('should map MYSQL_5.7 version correctly', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-tdsqlc',
        type: DatabaseEnum.TDSQL_C_SERVERLESS,
        version: DatabaseVersionEnum['MYSQL_5.7'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['0.0.0.0/0'],
        },
        cu: {
          min: 0,
          max: 4,
        },
        storage: {
          min: 20,
        },
      };

      const result = databaseToTdsqlcConfig(database);

      expect(result.DbVersion).toBe('5.7');
      expect(result.AutoPause).toBe(true); // min cu is 0, so auto-pause enabled
    });

    it('should include VPC configuration when provided', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-tdsqlc',
        type: DatabaseEnum.TDSQL_C_SERVERLESS,
        version: DatabaseVersionEnum['MYSQL_8.0'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['0.0.0.0/0'],
          vpcId: 'vpc-12345',
          subnetId: 'subnet-67890',
        },
        cu: {
          min: 1,
          max: 8,
        },
        storage: {
          min: 10,
        },
      };

      const result = databaseToTdsqlcConfig(database);

      expect(result.VpcId).toBe('vpc-12345');
      expect(result.SubnetId).toBe('subnet-67890');
    });

    it('should include storage limits when provided', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-tdsqlc',
        type: DatabaseEnum.TDSQL_C_SERVERLESS,
        version: DatabaseVersionEnum['MYSQL_8.0'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['0.0.0.0/0'],
        },
        cu: {
          min: 1,
          max: 8,
        },
        storage: {
          min: 10,
          max: 1000,
        },
      };

      const result = databaseToTdsqlcConfig(database);

      expect(result.MinStorageSize).toBe(10);
      expect(result.MaxStorageSize).toBe(1000);
    });

    it('should enable auto-pause when min CPU is 0', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-tdsqlc',
        type: DatabaseEnum.TDSQL_C_SERVERLESS,
        version: DatabaseVersionEnum['MYSQL_8.0'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['0.0.0.0/0'],
        },
        cu: {
          min: 0,
          max: 8,
        },
        storage: {
          min: 10,
        },
      };

      const result = databaseToTdsqlcConfig(database);

      expect(result.AutoPause).toBe(true);
    });
  });

  describe('extractTdsqlcAttributes', () => {
    it('should extract all attributes including null values', () => {
      const config = {
        ClusterName: 'test-tdsqlc',
        DbType: 'MYSQL' as const,
        DbVersion: '8.0',
        DbMode: 'SERVERLESS' as const,
        MinCpu: 1,
        MaxCpu: 8,
        AutoPause: false,
        AutoPauseDelay: 600,
        StoragePayMode: 0,
        AdminPassword: 'TestPass123!',
      };

      const attributes = extractTdsqlcAttributes(config);

      expect(attributes).toEqual({
        clusterName: 'test-tdsqlc',
        dbType: 'MYSQL',
        dbVersion: '8.0',
        dbMode: 'SERVERLESS',
        minCpu: 1,
        maxCpu: 8,
        autoPause: false,
        autoPauseDelay: 600,
        storagePayMode: 0,
        vpcId: null,
        subnetId: null,
        port: null,
        projectId: null,
        minStorageSize: null,
        maxStorageSize: null,
      });
    });

    it('should exclude AdminPassword from attributes', () => {
      const config = {
        ClusterName: 'test-tdsqlc',
        DbType: 'MYSQL' as const,
        DbVersion: '8.0',
        DbMode: 'SERVERLESS' as const,
        MinCpu: 1,
        MaxCpu: 8,
        AutoPause: false,
        AutoPauseDelay: 600,
        StoragePayMode: 0,
        AdminPassword: 'TestPass123!',
      };

      const attributes = extractTdsqlcAttributes(config);

      expect(attributes).not.toHaveProperty('adminPassword');
      expect(attributes).not.toHaveProperty('AdminPassword');
    });

    it('should include VPC configuration when provided', () => {
      const config = {
        ClusterName: 'test-tdsqlc',
        DbType: 'MYSQL' as const,
        DbVersion: '8.0',
        DbMode: 'SERVERLESS' as const,
        MinCpu: 1,
        MaxCpu: 8,
        AutoPause: false,
        AutoPauseDelay: 600,
        StoragePayMode: 0,
        AdminPassword: 'TestPass123!',
        VpcId: 'vpc-12345',
        SubnetId: 'subnet-67890',
      };

      const attributes = extractTdsqlcAttributes(config);

      expect(attributes.vpcId).toBe('vpc-12345');
      expect(attributes.subnetId).toBe('subnet-67890');
    });

    it('should include storage limits when provided', () => {
      const config = {
        ClusterName: 'test-tdsqlc',
        DbType: 'MYSQL' as const,
        DbVersion: '8.0',
        DbMode: 'SERVERLESS' as const,
        MinCpu: 1,
        MaxCpu: 8,
        AutoPause: false,
        AutoPauseDelay: 600,
        StoragePayMode: 0,
        AdminPassword: 'TestPass123!',
        MinStorageSize: 10,
        MaxStorageSize: 1000,
      };

      const attributes = extractTdsqlcAttributes(config);

      expect(attributes.minStorageSize).toBe(10);
      expect(attributes.maxStorageSize).toBe(1000);
    });
  });
});

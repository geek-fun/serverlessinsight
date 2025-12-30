import {
  databaseToTdsqlcConfig,
  computeDatabaseConfigHash,
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

  describe('computeDatabaseConfigHash', () => {
    it('should compute consistent hash for same config', () => {
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

      const hash1 = computeDatabaseConfigHash(config);
      const hash2 = computeDatabaseConfigHash(config);

      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(16);
    });

    it('should compute different hash for different configs', () => {
      const config1 = {
        ClusterName: 'test-tdsqlc-1',
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

      const config2 = {
        ClusterName: 'test-tdsqlc-2',
        DbType: 'MYSQL' as const,
        DbVersion: '8.0',
        DbMode: 'SERVERLESS' as const,
        MinCpu: 2,
        MaxCpu: 16,
        AutoPause: true,
        AutoPauseDelay: 600,
        StoragePayMode: 0,
        AdminPassword: 'TestPass123!',
      };

      const hash1 = computeDatabaseConfigHash(config1);
      const hash2 = computeDatabaseConfigHash(config2);

      expect(hash1).not.toBe(hash2);
    });

    it('should include VPC configuration in hash', () => {
      const config1 = {
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

      const config2 = {
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

      const hash1 = computeDatabaseConfigHash(config1);
      const hash2 = computeDatabaseConfigHash(config2);

      expect(hash1).not.toBe(hash2);
    });
  });
});

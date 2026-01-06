import { databaseToRdsConfig, extractRdsDefinition } from '../../../src/stack/aliyunStack/rdsTypes';
import { DatabaseDomain, DatabaseEnum, DatabaseVersionEnum } from '../../../src/types';

describe('RdsTypes', () => {
  describe('databaseToRdsConfig', () => {
    it('should convert database domain to RDS config for MySQL 8.0', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-rds-mysql',
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
        version: DatabaseVersionEnum['MYSQL_8.0'],
        security: {
          basicAuth: {
            username: 'admin',
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['10.0.0.0/8'],
        },
        cu: {
          min: 0,
          max: 16,
        },
        storage: {
          min: 20,
        },
      };

      const result = databaseToRdsConfig(database);

      expect(result.engine).toBe('MySQL');
      expect(result.engineVersion).toBe('8.0');
      expect(result.category).toBe('serverless_basic');
      expect(result.dbInstanceClass).toBe('mysql.n2.serverless.1c');
      expect(result.dbInstanceStorage).toBe(20);
      expect(result.dbInstanceStorageType).toBe('general_essd');
      expect(result.burstingEnabled).toBe(true);
      expect(result.serverlessConfig?.autoPause).toBe(true); // min cu is 0
      expect(result.securityIPList).toBe('10.0.0.0/8');
      expect(result.dbInstanceNetType).toBe('Intranet');
    });

    it('should map MYSQL HA 8.0 correctly', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-rds-mysql-ha',
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
        version: DatabaseVersionEnum['MYSQL_HA_8.0'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PUBLIC',
          ingressRules: ['0.0.0.0/0'],
        },
        cu: {
          min: 1,
          max: 8,
        },
        storage: {
          min: 50,
        },
      };

      const result = databaseToRdsConfig(database);

      expect(result.category).toBe('serverless_standard');
      expect(result.dbInstanceClass).toBe('mysql.n2.serverless.2c');
      expect(result.multiAZ).toBe(true);
      expect(result.serverlessConfig?.autoPause).toBe(false);
      expect(result.dbInstanceNetType).toBe('Internet');
    });

    it('should map PostgreSQL 14 correctly', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-rds-pgsql',
        type: DatabaseEnum.RDS_PGSQL_SERVERLESS,
        version: DatabaseVersionEnum.PGSQL_14,
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['10.0.0.0/8'],
        },
        cu: {
          min: 1,
          max: 8,
        },
        storage: {
          min: 20,
        },
      };

      const result = databaseToRdsConfig(database);

      expect(result.engine).toBe('PostgreSQL');
      expect(result.engineVersion).toBe('14.0');
      expect(result.category).toBe('serverless_basic');
      expect(result.dbInstanceClass).toBe('pg.n2.serverless.1c');
    });

    it('should map SQL Server 2019 correctly', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-rds-mssql',
        type: DatabaseEnum.RDS_MSSQL_SERVERLESS,
        version: DatabaseVersionEnum.MSSQL_HA_2019,
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['10.0.0.0/8'],
        },
        cu: {
          min: 2,
          max: 6,
        },
        storage: {
          min: 50,
        },
      };

      const result = databaseToRdsConfig(database);

      expect(result.engine).toBe('SQLServer');
      expect(result.engineVersion).toBe('2019_std_sl');
      expect(result.category).toBe('serverless_ha');
      expect(result.dbInstanceClass).toBe('mssql.mem2.serverless.s2');
      expect(result.dbInstanceStorageType).toBe('cloud_essd');
      expect(result.burstingEnabled).toBe(false);
    });

    it('should include VPC configuration when provided', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-rds',
        type: DatabaseEnum.RDS_MYSQL_SERVERLESS,
        version: DatabaseVersionEnum['MYSQL_8.0'],
        security: {
          basicAuth: {
            password: 'TestPass123!',
          },
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['10.0.0.0/8'],
          vpcId: 'vpc-12345',
          subnetId: 'subnet-67890',
        },
        cu: {
          min: 1,
          max: 8,
        },
        storage: {
          min: 20,
        },
      };

      const result = databaseToRdsConfig(database);

      expect(result.vpcId).toBe('vpc-12345');
      expect(result.vSwitchId).toBe('subnet-67890');
    });

    it('should throw error for unsupported database type', () => {
      const database: DatabaseDomain = {
        key: 'test_db',
        name: 'test-db',
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
        },
        cu: {
          min: 2,
          max: 8,
        },
        storage: {
          min: 20,
        },
      };

      expect(() => databaseToRdsConfig(database)).toThrow('Unsupported RDS database type/version');
    });
  });

  describe('extractRdsDefinition', () => {
    it('should extract all attributes with null for undefined fields', () => {
      const config = {
        dbInstanceDescription: 'test-rds',
        engine: 'MySQL',
        engineVersion: '8.0',
        dbInstanceClass: 'mysql.n2.serverless.1c',
        dbInstanceStorage: 20,
        category: 'serverless_basic',
        dbInstanceStorageType: 'general_essd',
        burstingEnabled: true,
        serverlessConfig: {
          minCapacity: 0.5,
          maxCapacity: 16.5,
          autoPause: true,
          switchForce: false,
        },
        masterUsername: 'admin',
        masterUserPassword: 'TestPass123!',
        multiAZ: false,
        securityIPList: '10.0.0.0/8',
        connectionStringType: 'Inner',
        dbInstanceNetType: 'Intranet',
      };

      const definition = extractRdsDefinition(config);

      expect(definition).toEqual({
        dbInstanceDescription: 'test-rds',
        engine: 'MySQL',
        engineVersion: '8.0',
        dbInstanceClass: 'mysql.n2.serverless.1c',
        dbInstanceStorage: 20,
        category: 'serverless_basic',
        dbInstanceStorageType: 'general_essd',
        burstingEnabled: true,
        serverlessConfig: {
          minCapacity: 0.5,
          maxCapacity: 16.5,
          autoPause: true,
          switchForce: false,
        },
        multiAZ: false,
        securityIPList: '10.0.0.0/8',
        connectionStringType: 'Inner',
        dbInstanceNetType: 'Intranet',
        vpcId: null,
        vSwitchId: null,
      });
    });

    it('should exclude passwords from definition', () => {
      const config = {
        dbInstanceDescription: 'test-rds',
        engine: 'MySQL',
        engineVersion: '8.0',
        dbInstanceClass: 'mysql.n2.serverless.1c',
        dbInstanceStorage: 20,
        category: 'serverless_basic',
        dbInstanceStorageType: 'general_essd',
        serverlessConfig: {
          minCapacity: 0.5,
          maxCapacity: 16.5,
          autoPause: true,
          switchForce: false,
        },
        masterUserPassword: 'SecretPass123!',
      };

      const definition = extractRdsDefinition(config);

      expect(definition).not.toHaveProperty('masterUserPassword');
      expect(definition).not.toHaveProperty('MasterUserPassword');
    });
  });
});

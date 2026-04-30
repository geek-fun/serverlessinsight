import { parseDatabase } from '../../../src/parser/databaseParser';

describe('parseDatabase', () => {
  it('should return undefined when databases is empty', () => {
    expect(parseDatabase(undefined)).toBeUndefined();
    expect(parseDatabase({})).toBeUndefined();
  });

  it('should parse database with explicit values', () => {
    const databases = {
      main_db: {
        name: 'orders-db',
        type: 'RDS_MYSQL_SERVERLESS',
        version: 'MYSQL_8.0',
        security: {
          basic_auth: {
            master_user: 'admin',
            password: 'secret',
          },
        },
        cu: {
          min: 2,
          max: 8,
        },
        storage: {
          min: 20,
          max: 200,
        },
        network: {
          type: 'PUBLIC',
          ingress_rules: ['10.0.0.0/24', '192.168.1.0/24'],
          vpc_id: 'vpc-123',
          subnet_id: 'subnet-456',
        },
      },
    };

    expect(parseDatabase(databases as never)).toEqual([
      {
        key: 'main_db',
        name: 'orders-db',
        type: 'RDS_MYSQL_SERVERLESS',
        version: 'MYSQL_8.0',
        security: {
          basicAuth: {
            username: 'admin',
            password: 'secret',
          },
        },
        cu: {
          min: 2,
          max: 8,
        },
        storage: {
          min: 20,
          max: 200,
        },
        network: {
          type: 'PUBLIC',
          ingressRules: ['10.0.0.0/24', '192.168.1.0/24'],
          vpcId: 'vpc-123',
          subnetId: 'subnet-456',
        },
      },
    ]);
  });

  it('should apply defaults for omitted optional fields', () => {
    const databases = {
      cache_db: {
        name: 'cache-db',
        type: 'ELASTICSEARCH_SERVERLESS',
        version: 'ES_SEARCH_7.10',
        security: {
          basic_auth: {
            password: 'cache-secret',
          },
        },
      },
    };

    expect(parseDatabase(databases as never)).toEqual([
      {
        key: 'cache_db',
        name: 'cache-db',
        type: 'ELASTICSEARCH_SERVERLESS',
        version: 'ES_SEARCH_7.10',
        security: {
          basicAuth: {
            username: undefined,
            password: 'cache-secret',
          },
        },
        cu: {
          min: 0,
          max: 6,
        },
        storage: {
          min: 10,
          max: undefined,
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['0.0.0.0/0'],
          vpcId: undefined,
          subnetId: undefined,
        },
      },
    ]);
  });

  it('should coerce mixed input types to parsed values', () => {
    const databases = {
      analytics_db: {
        name: 123,
        type: 'RDS_PGSQL_SERVERLESS',
        version: 'PGSQL_15',
        security: {
          basic_auth: {
            master_user: 789,
            password: 456,
          },
        },
        cu: {
          min: '3',
          max: '12',
        },
        storage: {
          min: '50',
        },
        network: {
          type: 'PRIVATE',
          ingress_rules: [1001],
        },
      },
    };

    expect(parseDatabase(databases as never)).toEqual([
      expect.objectContaining({
        name: '123',
        security: {
          basicAuth: {
            username: '789',
            password: '456',
          },
        },
        cu: {
          min: 3,
          max: 12,
        },
        storage: {
          min: 50,
          max: undefined,
        },
        network: {
          type: 'PRIVATE',
          ingressRules: ['1001'],
          vpcId: undefined,
          subnetId: undefined,
        },
      }),
    ]);
  });
});

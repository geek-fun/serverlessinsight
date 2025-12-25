export const databaseSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/databaseschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: {
          type: 'string',
          enum: [
            'ELASTICSEARCH_SERVERLESS',
            'RDS_MYSQL_SERVERLESS',
            'RDS_PGSQL_SERVERLESS',
            'RDS_MSSQL_SERVERLESS',
          ],
        },
        version: {
          type: 'string',
          enum: [
            'MYSQL_5.7',
            'MYSQL_8.0',
            'MYSQL_HA_5.7',
            'MYSQL_HA_8.0',
            'PGSQL_14',
            'PGSQL_15',
            'PGSQL_16',
            'PGSQL_HA_14',
            'PGSQL_HA_15',
            'PGSQL_HA_16',
            'MSSQL_HA_2016',
            'MSSQL_HA_2017',
            'MSSQL_HA_2019',
            'ES_SEARCH_8.17',
            'ES_TIME_SERIES_7.10',
          ],
        },
        cu: {
          type: 'object',
          properties: {
            min: { type: 'integer', minimum: 0, maximum: 32 },
            max: { type: 'integer', minimum: 1, maximum: 32 },
          },
        },
        storage: {
          type: 'object',
          properties: { min: { type: 'integer', minimum: 20 } },
          required: ['min'],
        },
        security: {
          type: 'object',
          properties: {
            basic_auth: {
              type: 'object',
              properties: {
                master_user: { type: 'string' },
                password: { type: 'string' },
              },
              required: ['master_user', 'password'],
            },
          },
          required: ['basic_auth'],
        },
        network: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['PUBLIC', 'PRIVATE'] },
            ingress_rules: {
              type: 'array',
              items: { type: 'string' },
            },
            public: { type: 'boolean' },
          },
        },
      },
      required: ['name', 'type', 'version', 'security'],
      additionalProperties: false,
    },
  },
};

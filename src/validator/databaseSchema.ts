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
          ],
        },
        engine_mode: { type: 'string', enum: ['SEARCH', 'TIMESERIES'] },
        cu: {
          type: 'object',
          properties: {
            min: { type: 'number', minimum: 0, maximum: 32 },
            max: { type: 'number', minimum: 0.5, maximum: 32 },
          },
        },
        storage: {
          type: 'object',
          properties: { min: { type: 'number', minimum: 20 } },
          required: ['min'],
        },
        security: {
          type: 'object',
          properties: {
            basic_auth: {
              type: 'object',
              properties: {
                password: { type: 'string' },
              },
              required: ['password'],
            },
          },
          required: ['basic_auth'],
        },
        network: {
          type: 'object',
          properties: {
            public: { type: 'boolean' },
          },
        },
      },
      required: ['name', 'type', 'version', 'security'],
      additionalProperties: false,
    },
  },
};

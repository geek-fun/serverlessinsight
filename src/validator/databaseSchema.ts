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
            'RDS_POSTGRESQL_SERVERLESS',
            'RDS_SQLSERVER_SERVERLESS',
          ],
        },
        version: { type: 'string' },
        engine_mode: { type: 'string', enum: ['SEARCH', 'TIMESERIES'] },
        cu: { type: 'object', properties: { min: { type: 'number' }, max: { type: 'number' } } },
        storage: { type: 'object', properties: { min: { type: 'number' } }, required: ['min'] },
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

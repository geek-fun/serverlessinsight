export const databaseSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/databaseschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string', enum: ['ELASTICSEARCH_SERVERLESS'] },
        version: { type: 'string' },
        engine_mode: { type: 'string', enum: ['SEARCH', 'TIMESERIES'] },
        cu: { type: 'number' },
        storage_size: { type: 'number' },
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
      required: ['name', 'type', 'version', 'security', 'cu', 'storage_size'],
      additionalProperties: false,
    },
  },
};

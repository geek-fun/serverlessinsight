export const rootSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/schema.json',
  type: 'object',
  properties: {
    version: { type: 'string', enum: ['0.0.0', '0.0.1'] },
    provider: {
      type: 'object',
      properties: {
        name: { type: 'string', enum: ['huawei', 'aliyun'] },
        region: { type: 'string' },
      },
    },
    service: { type: 'string' },
    vars: {
      type: 'object',
      additionalProperties: {
        type: ['string', 'number', 'boolean'],
      },
    },
    stages: {
      type: 'object',
      patternProperties: {
        '.*': {
          type: 'object',
          additionalProperties: {
            type: ['string', 'number', 'boolean'],
          },
        },
      },
    },
    tags: {
      type: 'object',
      additionalProperties: {
        type: ['string', 'number', 'boolean'],
      },
    },
    functions: {
      $ref: 'https://serverlessinsight.geekfun.club/schemas/functionschema.json',
    },
    events: {
      $ref: 'https://serverlessinsight.geekfun.club/schemas/eventschema.json',
    },
    databases: {
      $ref: 'https://serverlessinsight.geekfun.club/schemas/databaseschema.json',
    },
    buckets: {
      $ref: 'https://serverlessinsight.geekfun.club/schemas/bucketschema.json',
    },
    tables: {
      $ref: 'https://serverlessinsight.geekfun.club/schemas/tableschema.json',
    },
  },
  required: ['version', 'provider', 'service'],
  additionalProperties: false,
};

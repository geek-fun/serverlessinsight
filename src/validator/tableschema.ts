export const tableSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/tableschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        collection: { type: 'string' },
        name: { type: 'string' },
        type: { type: 'string', enum: ['TABLE_STORE_C', 'TABLE_STORE_H'] },
        desc: { type: 'string', maxLength: 256 },
        network: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['PUBLIC', 'PRIVATE'] },
            ingress_rules: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          required: ['type'],
        },
        throughput: {
          type: 'object',
          properties: {
            reserved: {
              type: 'object',
              properties: {
                read: { type: 'integer' },
                write: { type: 'integer' },
              },
            },
            on_demand: {
              type: 'object',
              properties: {
                read: { type: 'integer' },
                write: { type: 'integer' },
              },
            },
          },
        },
        key_schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              type: { type: 'string', enum: ['HASH', 'RANGE'] },
            },
            required: ['name', 'type'],
          },
        },
        attributes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              type: { type: 'string', enum: ['STRING', 'INTEGER', 'DOUBLE', 'BOOLEAN', 'BINARY'] },
            },
            required: ['name', 'type'],
          },
        },
      },
      required: ['collection', 'name', 'type', 'key_schema', 'attributes'],
      additionalProperties: false,
    },
  },
};

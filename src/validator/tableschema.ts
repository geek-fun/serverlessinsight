import { resolvableInteger, resolvableEnum } from './templateRefSchema';

export const tableSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/tableschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        collection: { type: 'string' },
        name: { type: 'string' },
        type: resolvableEnum(['TABLE_STORE_C', 'TABLE_STORE_H']),
        desc: { type: 'string', maxLength: 256 },
        network: {
          type: 'object',
          properties: {
            type: resolvableEnum(['PUBLIC', 'PRIVATE']),
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
                read: resolvableInteger,
                write: resolvableInteger,
              },
            },
            on_demand: {
              type: 'object',
              properties: {
                read: resolvableInteger,
                write: resolvableInteger,
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
              type: resolvableEnum(['HASH', 'RANGE']),
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
              type: resolvableEnum(['STRING', 'INTEGER', 'DOUBLE', 'BOOLEAN', 'BINARY']),
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

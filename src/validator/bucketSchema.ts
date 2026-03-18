import { resolvableNumber, resolvableBoolean, resolvableEnum } from './templateRefSchema';

export const bucketSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/bucketschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        storage: {
          type: 'object',
          properties: {
            class: {
              type: 'string',
            },
          },
          required: ['class'],
          additionalProperties: false,
        },
        versioning: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
            },
          },
          required: ['status'],
          additionalProperties: false,
        },
        security: {
          type: 'object',
          properties: {
            acl: resolvableEnum(['PRIVATE', 'PUBLIC_READ', 'PUBLIC_READ_WRITE']),
            force_delete: resolvableBoolean,
            sse_algorithm: {
              type: 'string',
            },
            sse_kms_master_key_id: {
              type: 'string',
            },
          },
          additionalProperties: false,
        },
        website: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
            },
            domain: {
              type: 'string',
            },
            index: {
              type: 'string',
            },
            error_page: {
              type: 'string',
            },
            error_code: resolvableNumber,
          },
          required: ['code'],
          additionalProperties: false,
        },
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
};

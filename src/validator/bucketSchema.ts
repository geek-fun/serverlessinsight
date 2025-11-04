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
        },
        versioning: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
            },
          },
          required: ['status'],
        },
        security: {
          type: 'object',
          properties: {
            access: {
              type: 'string',
              enum: ['PRIVATE', 'PUBLIC_READ', 'PUBLIC_READ_WRITE'],
            },
            force_delete: {
              type: 'boolean',
            },
            sse_algorithm: {
              type: 'string',
            },
            sse_kms_master_key_id: {
              type: 'string',
            },
          },
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
            error_code: {
              type: 'number',
            },
          },
          required: ['code'],
        },
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
};

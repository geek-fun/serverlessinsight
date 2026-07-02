import { resolvableBoolean, resolvableEnum } from './templateRefSchema';

const cdnSchema = {
  oneOf: [
    { type: 'boolean' },
    {
      type: 'object',
      properties: {
        enabled: resolvableBoolean,
        cdn_type: { type: 'string', enum: ['web', 'download', 'video'] },
        scope: { type: 'string', enum: ['domestic', 'overseas', 'global'] },
        cache_ttl: { type: 'number' },
        ignore_query_string: resolvableBoolean,
        origin_protocol: { type: 'string', enum: ['http', 'https', 'follow'] },
        compression: resolvableBoolean,
        force_redirect_https: resolvableBoolean,
      },
      additionalProperties: false,
    },
  ],
};

const bucketDomainSchema = {
  oneOf: [
    { type: 'string' },
    {
      type: 'object',
      properties: {
        domain_name: { type: 'string' },
        certificate_id: { type: 'string' },
        certificate_body: { type: 'string' },
        certificate_private_key: { type: 'string' },
        protocol: {
          oneOf: [
            { type: 'string', enum: ['HTTP', 'HTTPS'] },
            {
              type: 'array',
              items: { type: 'string', enum: ['HTTP', 'HTTPS'] },
              minItems: 1,
              uniqueItems: true,
            },
          ],
        },
        www_bind_apex: resolvableBoolean,
        cdn: cdnSchema,
        accelerate: resolvableBoolean,
      },
      required: ['domain_name'],
      additionalProperties: false,
      oneOf: [
        {
          not: {
            anyOf: [
              { required: ['certificate_id'] },
              { required: ['certificate_body'] },
              { required: ['certificate_private_key'] },
            ],
          },
        },
        {
          required: ['certificate_body', 'certificate_private_key'],
          not: { required: ['certificate_id'] },
        },
        {
          required: ['certificate_id'],
          not: {
            anyOf: [{ required: ['certificate_body'] }, { required: ['certificate_private_key'] }],
          },
        },
      ],
    },
  ],
};

const bucketWebsiteDomainSchema = {
  oneOf: [
    { type: 'string' },
    {
      type: 'object',
      properties: {
        domain_name: { type: 'string' },
        certificate_id: { type: 'string' },
        certificate_body: { type: 'string' },
        certificate_private_key: { type: 'string' },
        protocol: {
          oneOf: [
            { type: 'string', enum: ['HTTP', 'HTTPS'] },
            {
              type: 'array',
              items: { type: 'string', enum: ['HTTP', 'HTTPS'] },
              minItems: 1,
              uniqueItems: true,
            },
          ],
        },
        www_bind_apex: resolvableBoolean,
        cdn: cdnSchema,
      },
      required: ['domain_name'],
      additionalProperties: false,
      oneOf: [
        {
          not: {
            anyOf: [
              { required: ['certificate_id'] },
              { required: ['certificate_body'] },
              { required: ['certificate_private_key'] },
            ],
          },
        },
        {
          required: ['certificate_body', 'certificate_private_key'],
          not: { required: ['certificate_id'] },
        },
        {
          required: ['certificate_id'],
          not: {
            anyOf: [{ required: ['certificate_body'] }, { required: ['certificate_private_key'] }],
          },
        },
      ],
    },
  ],
};

const iamStatementPrincipalSchema = {
  type: 'object',
  minProperties: 1,
  additionalProperties: { type: 'string' },
};

const iamStatementSchema = {
  type: 'object',
  properties: {
    effect: { type: 'string', enum: ['Allow', 'Deny'] },
    principal: iamStatementPrincipalSchema,
    action: {
      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' }, minItems: 1 }],
    },
    resource: {
      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' }, minItems: 1 }],
    },
    condition: {
      type: 'object',
      additionalProperties: true,
    },
  },
  required: ['effect', 'principal', 'action', 'resource'],
  additionalProperties: false,
};

const iamResourceSchema = {
  type: 'object',
  properties: {
    statements: {
      type: 'array',
      items: iamStatementSchema,
      minItems: 1,
    },
  },
  required: ['statements'],
  additionalProperties: false,
};

const iamSchema = {
  type: 'object',
  properties: {
    resource: iamResourceSchema,
  },
  required: ['resource'],
  additionalProperties: false,
};

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
        // Canonical domain config (top-level)
        domain: bucketDomainSchema,
        website: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
            },
            // Deprecated: Use top-level `domain` instead
            domain: bucketWebsiteDomainSchema,
            index: {
              type: 'string',
            },
          },
          required: ['code'],
          additionalProperties: false,
        },
        iam: iamSchema,
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
};

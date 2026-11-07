import {
  resolvableBoolean,
  resolvableEnum,
  resolvableConstrained,
  HOST_NAME_PATTERN,
  BUCKET_NAME_PATTERN,
} from './templateRefSchema';
import { cdnSchema } from './cdnSchema';

// v1 (issue #279): bucket custom domains are declared as a `domains` list.
// The legacy top-level `domain`, `website.domain` and `www_bind_apex` fields
// were removed — legacy usage is rejected at schema validation and semantic
// validation reports a migration error (see validateSemantics). The
// never-consumed `protocol` field was removed with issue #283.
const bucketDomainBindingSchema = {
  type: 'object',
  properties: {
    domain_name: resolvableConstrained({ pattern: HOST_NAME_PATTERN }),
    certificate_id: { type: 'string' },
    certificate_body: { type: 'string' },
    certificate_private_key: { type: 'string' },
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
        name: resolvableConstrained({ pattern: BUCKET_NAME_PATTERN }),
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
        // Bucket-level transfer acceleration (all providers model it per bucket).
        accelerate: resolvableBoolean,
        // The only accepted custom-domain form since v1 (issue #279).
        domains: {
          type: 'array',
          items: bucketDomainBindingSchema,
        },
        website: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
            },
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

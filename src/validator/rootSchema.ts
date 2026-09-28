import { scalarValue, templateRefSchema } from './templateRefSchema';

// Provider-enforced function-name maximums (audit of issue #222)
const FUNCTION_NAME_MAX_LENGTH: Record<string, number> = {
  aliyun: 64,
  tencent: 60,
};

const functionNameLimitBranch = (provider: string, maxLength: number): Record<string, unknown> => ({
  if: {
    properties: {
      provider: { type: 'object', properties: { name: { const: provider } }, required: ['name'] },
    },
    required: ['provider'],
  },
  then: {
    properties: {
      functions: {
        type: 'object',
        patternProperties: {
          '.*': {
            type: 'object',
            properties: {
              // Whole-value template references bypass the literal limit.
              name: { anyOf: [{ type: 'string', maxLength }, templateRefSchema] },
            },
          },
        },
      },
    },
  },
});

export const rootSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/schema.json',
  type: 'object',
  properties: {
    version: {
      type: 'string',
      enum: ['0.0.0', '0.0.1', '0.1.0'],
      description: 'ServerlessInsight IaC document version.',
    },
    app: {
      type: 'string',
      pattern: '^[a-z][a-z0-9-]*$',
      description:
        'Application name — the top-level grouping of services. Lowercase letters, digits and hyphens, starting with a letter.',
    },
    provider: {
      type: 'object',
      description: 'Target cloud provider and deployment region.',
      properties: {
        name: {
          type: 'string',
          enum: ['huawei', 'aliyun', 'tencent', 'aws', 'volcengine'],
          description: 'Cloud provider identifier.',
        },
        region: { type: 'string', description: 'Deployment region, e.g. cn-hangzhou.' },
      },
      required: ['name', 'region'],
      allOf: [
        {
          if: {
            properties: {
              name: { const: 'aliyun' },
            },
            required: ['name'],
          },
          then: {
            properties: {
              region: {
                type: 'string',
                enum: [
                  'cn-qingdao',
                  'cn-beijing',
                  'cn-zhangjiakou',
                  'cn-huhehaote',
                  'cn-wulanchabu',
                  'cn-hangzhou',
                  'cn-shanghai',
                  'cn-shenzhen',
                  'cn-heyuan',
                  'cn-guangzhou',
                  'cn-chengdu',
                  'cn-hongkong',
                  'ap-southeast-1',
                  'ap-southeast-3',
                  'ap-southeast-5',
                  'ap-southeast-6',
                  'ap-southeast-7',
                  'ap-northeast-1',
                  'ap-northeast-2',
                  'eu-central-1',
                  'eu-west-1',
                  'us-east-1',
                  'us-west-1',
                  'na-south-1',
                  'me-east-1',
                  'me-central-1',
                ],
              },
            },
          },
        },
      ],
    },
    service: {
      type: 'string',
      pattern: '^[a-z][a-z0-9-]*$',
      description:
        'Service name inside the application. Lowercase letters, digits and hyphens, starting with a letter.',
    },
    // Target Console org (organizations.slug). Optional — required only when an
    // explicit SaaS state backend is declared (allOf branch below); with
    // LOCAL/BUCKET_STORE backends it is allowed but inert (decision D-6).
    org: {
      type: 'string',
      pattern: '^[a-z0-9][a-z0-9-]*$',
      description:
        'Target ServerlessInsight Console organization slug (required for SaaS state backend).',
    },
    vars: {
      type: 'object',
      description: 'Reusable variables referenceable as ${vars.<key>} throughout the document.',
      additionalProperties: scalarValue,
    },
    stages: {
      type: 'object',
      description: 'Per-stage variables referenceable as ${stages.<key>}, keyed by stage name.',
      patternProperties: {
        '.*': {
          type: 'object',
          additionalProperties: scalarValue,
        },
      },
    },
    tags: {
      type: 'object',
      description: 'Tags applied to every managed cloud resource.',
      additionalProperties: scalarValue,
    },
    functions: {
      description: 'Serverless function definitions keyed by logical id.',
      $ref: 'https://serverlessinsight.geekfun.club/schemas/functionschema.json',
    },
    events: {
      description: 'Event definitions (e.g. API_GATEWAY) keyed by logical id.',
      $ref: 'https://serverlessinsight.geekfun.club/schemas/eventschema.json',
    },
    databases: {
      description: 'Serverless database definitions keyed by logical id.',
      $ref: 'https://serverlessinsight.geekfun.club/schemas/databaseschema.json',
    },
    buckets: {
      description: 'Object-storage bucket definitions keyed by logical id.',
      $ref: 'https://serverlessinsight.geekfun.club/schemas/bucketschema.json',
    },
    tables: {
      description: 'Tablestore table definitions keyed by logical id.',
      $ref: 'https://serverlessinsight.geekfun.club/schemas/tableschema.json',
    },
    backend: {
      type: 'object',
      description: 'Remote state backend configuration (defaults to the SaaS backend).',
      properties: {
        state_manager: {
          type: 'object',
          description: 'State storage: LOCAL directory, BUCKET_STORE, or the SaaS Console.',
          properties: {
            type: { type: 'string', enum: ['LOCAL', 'BUCKET_STORE', 'SAAS'] },
            bucket: { type: 'string', description: 'State bucket name (BUCKET_STORE only).' },
            key: { type: 'string', description: 'State object key (BUCKET_STORE only).' },
          },
          required: ['type'],
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
  },
  required: ['version', 'provider', 'app', 'service'],
  additionalProperties: false,
  allOf: [
    // Explicit SaaS state backend must declare the target org at top level.
    // A missing backend block stays org-free (zero-config quick start — the
    // API key decides the org there); every nested level needs its own
    // `required` so the `if` can't match vacuously.
    {
      if: {
        properties: {
          backend: {
            type: 'object',
            properties: {
              state_manager: {
                type: 'object',
                properties: { type: { const: 'SAAS' } },
                required: ['type'],
              },
            },
            required: ['state_manager'],
          },
        },
        required: ['backend'],
      },
      then: { required: ['org'] },
    },
    ...Object.entries(FUNCTION_NAME_MAX_LENGTH).map(([provider, maxLength]) =>
      functionNameLimitBranch(provider, maxLength),
    ),
  ],
};

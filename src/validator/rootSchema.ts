export const rootSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/schema.json',
  type: 'object',
  properties: {
    version: { type: 'string', enum: ['0.0.0', '0.0.1', '0.1.0'] },
    app: { type: 'string', pattern: '^[a-z][a-z0-9-]*$' },
    provider: {
      type: 'object',
      properties: {
        name: { type: 'string', enum: ['huawei', 'aliyun', 'tencent', 'aws', 'volcengine'] },
        region: { type: 'string' },
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
    service: { type: 'string', pattern: '^[a-z][a-z0-9-]*$' },
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
    backend: {
      type: 'object',
      properties: {
        state_manager: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['LOCAL', 'BUCKET_STORE'] },
            bucket: { type: 'string' },
            key: { type: 'string' },
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
};

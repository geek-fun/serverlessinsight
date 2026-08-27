import {
  resolvableEnum,
  resolvableBoolean,
  resolvableConstrained,
  HOST_NAME_PATTERN,
} from './templateRefSchema';

const cdnSchema = {
  oneOf: [
    { type: 'boolean' },
    {
      type: 'object',
      properties: {
        enabled: { type: 'boolean' },
        cdn_type: { type: 'string', enum: ['web', 'download', 'video'] },
        scope: { type: 'string', enum: ['domestic', 'overseas', 'global'] },
        cache_ttl: { type: 'number' },
        ignore_query_string: { type: 'boolean' },
        origin_protocol: { type: 'string', enum: ['http', 'https', 'follow'] },
        compression: { type: 'boolean' },
        force_redirect_https: { type: 'boolean' },
      },
      additionalProperties: false,
    },
  ],
};

export const eventSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/eventschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: resolvableEnum(['API_GATEWAY']),
        log: resolvableBoolean,
        network: {
          type: 'object',
          additionalProperties: false,
          required: ['vpc_id', 'subnet_ids'],
          properties: {
            vpc_id: { type: 'string' },
            subnet_ids: { type: 'array', items: { type: 'string' }, minItems: 2 },
          },
        },
        triggers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              method: resolvableEnum(['GET', 'POST', 'PUT', 'DELETE', 'ANY']),
              path: resolvableConstrained({ pattern: '^/\\S*$' }),
              backend: { type: 'string' },
            },
            required: ['method', 'path', 'backend'],
          },
        },
        domain: {
          type: 'object',
          additionalProperties: false,
          required: ['domain_name'],
          properties: {
            domain_name: resolvableConstrained({ pattern: HOST_NAME_PATTERN }),
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
            www_bind_apex: { type: 'boolean' },
            cdn: cdnSchema,
          },
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
                anyOf: [
                  { required: ['certificate_body'] },
                  { required: ['certificate_private_key'] },
                ],
              },
            },
          ],
        },
      },
      required: ['name', 'type', 'triggers'],
    },
  },
};

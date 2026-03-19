import { resolvableEnum } from './templateRefSchema';

export const eventSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/eventschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: resolvableEnum(['API_GATEWAY']),
        triggers: {
          type: 'array',
          items: {
            method: resolvableEnum(['GET', 'POST', 'PUT', 'DELETE', 'ANY']),
            path: { type: 'string' },
            backend: { type: 'string' },
            required: ['method', 'path', 'backend'],
          },
        },
        domain: {
          type: 'object',
          additionalProperties: false,
          required: ['domain_name'],
          properties: {
            domain_name: { type: 'string' },
            certificate_name: { type: 'string' },
            certificate_body: { type: 'string' },
            certificate_private_key: { type: 'string' },
            certificate: { type: 'string' },
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
          },
        },
      },
      required: ['name', 'type', 'triggers'],
    },
  },
};

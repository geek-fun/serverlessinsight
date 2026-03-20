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

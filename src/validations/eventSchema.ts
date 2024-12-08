export const eventSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/eventschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string', enum: ['API_GATEWAY'] },
        triggers: {
          type: 'array',
          items: {
            method: { type: 'string', enum: ['GET', 'POST', 'PUT', 'DELETE', 'ANY'] },
            path: { type: 'string' },
            backend: { type: 'string' },
            required: ['method', 'path', 'backend'],
          },
        },
        custom_domain: {
          type: 'object',
          properties: {
            domain_name: { type: 'string' },
            certificate_name: { type: 'string' },
            certificate_body: { type: 'string' },
            certificate_private_key: { type: 'string' },
          },
          required: [
            'domain_name',
            'certificate_name',
            'certificate_body',
            'certificate_private_key',
          ],
        },
      },
      required: ['name', 'type', 'triggers'],
    },
  },
};

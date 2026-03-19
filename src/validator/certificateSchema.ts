export const certificateSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/certificateschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        certificate_body: { type: 'string' },
        private_key: { type: 'string' },
        chain: { type: 'string' },
        certificate_id: { type: 'string' },
      },
      oneOf: [
        {
          required: ['certificate_body', 'private_key'],
          not: { required: ['certificate_id'] },
        },
        {
          required: ['certificate_id'],
          not: {
            anyOf: [{ required: ['certificate_body'] }, { required: ['private_key'] }],
          },
        },
      ],
      additionalProperties: false,
    },
  },
};

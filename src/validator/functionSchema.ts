export const functionSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/functionschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      properties: {
        name: { type: 'string' },
        runtime: {
          type: 'string',
          enum: [
            'nodejs20',
            'nodejs18',
            'nodejs16',
            'nodejs14',
            'nodejs12',
            'nodejs10',
            'nodejs8',
            'python3.10',
            'python3.9',
            'python3',
            'PHP 7.2',
            'Java 11',
            '.NET Core 3.1',
            'Go 1.x',
          ],
        },
        handler: { type: 'string' },
        code: { type: 'string' },
        memory: { type: 'number' },
        timeout: { type: 'number' },
        environment: {
          type: 'object',
          additionalProperties: {
            type: ['string', 'number', 'boolean'],
          },
        },
      },
      additionalProperties: false,
    },
  },
};

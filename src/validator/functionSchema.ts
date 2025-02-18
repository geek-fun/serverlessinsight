export const functionSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/functionschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      required: ['name', 'runtime', 'handler', 'code'],
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
        log: { type: 'boolean' },
        environment: {
          type: 'object',
          additionalProperties: {
            type: ['string', 'number', 'boolean'],
          },
        },
        storage: {
          type: 'object',
          properties: {
            disk: { type: 'number' },
            nas: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  mount_path: { type: 'string' },
                  storage_class: {
                    type: 'string',
                    enum: [
                      'STANDARD_PERFORMANCE',
                      'STANDARD_CAPACITY',
                      'EXTREME_STANDARD',
                      'EXTREME_ADVANCE',
                    ],
                    vpc_id: { type: 'string' },
                    subnet_id: { type: 'string' },
                  },
                  additionalProperties: false,
                },
                required: ['mount_path', 'storage_class', 'vpc_id', 'subnet_id'],
              },
            },
          },
        },
      },
      additionalProperties: false,
    },
  },
};

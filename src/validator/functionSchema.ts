import { resolvableNumber, resolvableBoolean, resolvableEnum } from './templateRefSchema';

export const functionSchema = {
  $id: 'https://serverlessinsight.geekfun.club/schemas/functionschema.json',
  type: 'object',
  patternProperties: {
    '.*': {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        code: {
          type: 'object',
          required: ['runtime', 'handler', 'path'],
          additionalProperties: false,
          properties: {
            runtime: resolvableEnum([
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
            ]),
            handler: { type: 'string' },
            path: { type: 'string' },
          },
        },
        container: {
          type: 'object',
          required: ['image', 'port'],
          additionalProperties: false,
          properties: {
            image: { type: 'string' },
            cmd: { type: 'string' },
            port: resolvableNumber,
          },
        },
        memory: resolvableNumber,
        gpu: resolvableEnum([
          'TESLA_8',
          'TESLA_12',
          'TESLA_16',
          'AMPERE_8',
          'AMPERE_12',
          'AMPERE_16',
          'AMPERE_24',
          'ADA_48',
        ]),
        timeout: resolvableNumber,
        log: resolvableBoolean,
        environment: {
          type: 'object',
          additionalProperties: {
            type: ['string', 'number', 'boolean'],
          },
        },
        network: {
          type: 'object',
          properties: {
            vpc_id: { type: 'string' },
            subnet_ids: { type: 'array', items: { type: 'string' } },
            security_group: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                ingress: { type: 'array', items: { type: 'string' } },
                egress: { type: 'array', items: { type: 'string' } },
              },
              required: ['name', 'ingress'],
              additionalProperties: false,
            },
          },
          required: ['vpc_id', 'subnet_ids', 'security_group'],
        },
        storage: {
          type: 'object',
          properties: {
            disk: resolvableNumber,
            nas: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  mount_path: { type: 'string' },
                  storage_class: resolvableEnum([
                    'STANDARD_CAPACITY',
                    'STANDARD_PERFORMANCE',
                    'EXTREME_STANDARD',
                    'EXTREME_ADVANCE',
                  ]),
                  additionalProperties: false,
                },
                required: ['mount_path', 'storage_class'],
              },
            },
          },
        },
      },
      additionalProperties: false,
    },
  },
};

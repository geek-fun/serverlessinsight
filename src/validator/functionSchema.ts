import {
  resolvableNumber,
  resolvableBoolean,
  resolvableEnum,
  resolvableConstrained,
  scalarValue,
  HOST_NAME_PATTERN,
} from './templateRefSchema';

const securityGroupRulePattern =
  '^[A-Za-z]+:\\d{1,3}(?:\\.\\d{1,3}){3}\\/\\d{1,2}:(?:ALL|\\d{1,5}(?:\\/\\d{1,5})?)$';

/**
 * Timer trigger names become physical cloud trigger names (FC3 triggerName,
 * SCF TriggerName, veFaaS Name) — all three accept letters/digits/`-`/`_`
 * with a 60-char budget on the strictest provider (Tencent).
 */
export const TIMER_TRIGGER_NAME_PATTERN = '^[A-Za-z][A-Za-z0-9_-]{0,59}$';

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
              'nodejs24',
              'nodejs22',
              'nodejs20',
              'nodejs18',
              'nodejs16',
              'nodejs14',
              'nodejs12',
              'nodejs10',
              'python3.14',
              'python3.13',
              'python3.12',
              'python3.11',
              'python3.10',
              'python3.9',
              'python3.7',
              'python3.6',
              'java25',
              'java21',
              'java17',
              'java11',
              'java8',
              'php8.0',
              'php7.4',
              'php7.2',
              'php5.6',
              'go1',
              'dotnet_core3.1',
              'golang/v1',
              'native/v1',
              'nativejava8/v1',
              'node14/v1',
              'node20/v1',
              'nodeprime14/v1',
              'python3.12/v1',
              'python3.9/v1',
              'native-python3.12/v1',
              'native-node20/v1',
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
            ...scalarValue,
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
                ingress: {
                  type: 'array',
                  items: { type: 'string', pattern: securityGroupRulePattern },
                },
                egress: {
                  type: 'array',
                  items: { type: 'string', pattern: securityGroupRulePattern },
                },
              },
              required: ['name', 'ingress'],
              additionalProperties: false,
            },
          },
          required: ['vpc_id', 'subnet_ids', 'security_group'],
        },
        iam: {
          type: 'object',
          additionalProperties: false,
          properties: {
            role: {
              oneOf: [
                { type: 'string' },
                {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    name: { type: 'string' },
                    managed_policies: { type: 'array', items: { type: 'string' } },
                    statements: {
                      type: 'array',
                      items: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                          sid: { type: 'string' },
                          effect: { type: 'string', enum: ['Allow', 'Deny'] },
                          action: {
                            oneOf: [
                              { type: 'string' },
                              { type: 'array', items: { type: 'string' }, minItems: 1 },
                            ],
                          },
                          resource: {
                            oneOf: [
                              { type: 'string' },
                              { type: 'array', items: { type: 'string' }, minItems: 1 },
                            ],
                          },
                        },
                        required: ['effect', 'action', 'resource'],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        triggers: {
          type: 'object',
          additionalProperties: false,
          properties: {
            http: {
              type: 'object',
              required: ['auth_type'],
              additionalProperties: false,
              properties: {
                auth_type: resolvableEnum(['public', 'iam']),
                access: {
                  type: 'array',
                  items: resolvableEnum(['public', 'internal']),
                  minItems: 1,
                },
              },
            },
            timer: {
              type: 'array',
              items: {
                type: 'object',
                required: ['name', 'cron'],
                additionalProperties: false,
                properties: {
                  name: resolvableConstrained({ pattern: TIMER_TRIGGER_NAME_PATTERN }),
                  // si-cron syntax (issue #258); full grammar validation runs
                  // in semantic validation where errors can carry the reason
                  cron: resolvableConstrained({ pattern: '.+' }),
                  payload: { type: 'string' },
                  enable: resolvableBoolean,
                  description: { type: 'string' },
                },
              },
            },
          },
        },
        domain: {
          type: 'object',
          required: ['domain_name'],
          additionalProperties: false,
          properties: {
            domain_name: resolvableConstrained({ pattern: HOST_NAME_PATTERN }),
            certificate_id: { type: 'string' },
            protocol: resolvableEnum(['HTTP', 'HTTPS']),
          },
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

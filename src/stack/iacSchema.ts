import { RawServerlessIac } from '../types';
import Ajv, { ErrorObject } from 'ajv';
import { logger } from '../common';

const ajv = new Ajv({ allowUnionTypes: true, strict: false, allErrors: true });

const schema = {
  type: 'object',
  properties: {
    version: { type: 'string', enum: ['0.0.0', '0.0.1'] },
    provider: { type: 'string', enum: ['aliyun', 'huawei'] },
    service: { type: 'string' },
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
    },
    events: {
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
    },
    databases: {
      type: 'object',
      patternProperties: {
        '.*': {
          type: 'object',
          properties: {
            name: { type: 'string' },
            type: { type: 'string', enum: ['ELASTICSEARCH_SERVERLESS'] },
            version: { type: 'string' },
            engine_mode: { type: 'string', enum: ['SEARCH', 'TIMESERIES'] },
            cu: { type: 'number' },
            storage_size: { type: 'number' },
            security: {
              type: 'object',
              properties: {
                basic_auth: {
                  type: 'object',
                  properties: {
                    password: { type: 'string' },
                  },
                  required: ['password'],
                },
              },
              required: ['basic_auth'],
            },
            network: {
              type: 'object',
              properties: {
                public: { type: 'boolean' },
              },
            },
          },
          required: ['name', 'type', 'version', 'security', 'cu', 'storage_size'],
          additionalProperties: false,
        },
      },
    },
  },
  required: ['version', 'provider', 'service'],
  additionalProperties: false,
};

type IacSchemaError = {
  instancePath: string;
  schemaPath: string;
  message: string;
  allowedValues?: Array<string>;
  type: string;
};

class IacSchemaErrors extends Error {
  private schemaErrors: Array<IacSchemaError>;

  constructor(errors: Array<ErrorObject>) {
    super(`Invalid yaml`);
    this.schemaErrors = errors.map((error) => ({
      instancePath: error.instancePath,
      schemaPath: error.schemaPath,
      message: error.message as string,
      allowedValues: error.params?.allowedValues,
      type: error.keyword,
    }));
  }

  public get errors() {
    return this.schemaErrors;
  }
}

export const validateYaml = (iacJson: RawServerlessIac) => {
  const validate = ajv.compile(schema);
  const valid = validate(iacJson);
  if (!valid) {
    logger.debug(`Invalid yaml: ${JSON.stringify(validate.errors)}`);
    throw new IacSchemaErrors(validate.errors as Array<ErrorObject>);
  }

  return true;
};

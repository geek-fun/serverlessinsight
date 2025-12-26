import Ajv, { ErrorObject } from 'ajv';
import { logger } from '../common';
import { ServerlessIacRaw } from '../types';
import { rootSchema } from './rootSchema';
import { databaseSchema } from './databaseSchema';
import { eventSchema } from './eventSchema';
import { functionSchema } from './functionSchema';
import { bucketSchema } from './bucketSchema';
import { tableSchema } from './tableschema';
import { lang } from '../lang';

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
    const schemaErrors = errors.map((error) => ({
      instancePath: error.instancePath,
      schemaPath: error.schemaPath,
      message: error.message as string,
      allowedValues: error.params?.allowedValues,
      type: error.keyword,
    }));

    const formattedMessage = schemaErrors
      .map((error, index) => {
        const parts = [
          `Error ${index + 1}:`,
          `  Path: ${error.instancePath || '/'}`,
          `  Type: ${error.type}`,
          `  Message: ${error.message}`,
        ];
        if (error.allowedValues) {
          parts.push(`  Allowed values: ${error.allowedValues.join(', ')}`);
        }
        return parts.join('\n');
      })
      .join('\n\n');

    super(`Invalid yaml:\n\n${formattedMessage}`);
    this.schemaErrors = schemaErrors;
  }

  public get errors() {
    return this.schemaErrors;
  }
}

const ajv = new Ajv({ allowUnionTypes: true, strict: false, allErrors: true });
const validate = ajv
  .addSchema(functionSchema)
  .addSchema(eventSchema)
  .addSchema(databaseSchema)
  .addSchema(tableSchema)
  .addSchema(bucketSchema)
  .compile(rootSchema);

export const validateYaml = (iacJson: ServerlessIacRaw) => {
  const valid = validate(iacJson);
  if (!valid) {
    logger.debug(lang.__('INVALID_YAML', { errors: JSON.stringify(validate.errors) }));
    throw new IacSchemaErrors(validate.errors as Array<ErrorObject>);
  }

  return true;
};

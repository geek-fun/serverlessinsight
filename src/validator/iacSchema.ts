import Ajv, { ErrorObject } from 'ajv';
import { logger } from '../common';
import { ServerlessIacRaw } from '../types';
import { rootSchema } from './rootSchema';
import { databaseSchema } from './databaseSchema';
import { eventSchema } from './eventSchema';
import { functionSchema } from './functionSchema';
import { bucketSchema } from './bucketSchema';

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

const ajv = new Ajv({ allowUnionTypes: true, strict: false, allErrors: true });
const validate = ajv
  .addSchema(functionSchema)
  .addSchema(eventSchema)
  .addSchema(databaseSchema)
  .addSchema(bucketSchema)
  .compile(rootSchema);

export const validateYaml = (iacJson: ServerlessIacRaw) => {
  const valid = validate(iacJson);
  if (!valid) {
    logger.debug(`Invalid yaml: ${JSON.stringify(validate.errors)}`);
    throw new IacSchemaErrors(validate.errors as Array<ErrorObject>);
  }

  return true;
};

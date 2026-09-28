import { getContext, getIacLocation, logger, setContext } from '../common';
import { parseYaml } from '../parser';
import { IacSchemaErrors } from '../validator';
import { VALIDATE_JSON_VERSION, ValidateJsonError, writeJson } from '../common/jsonOutput';
import { lang } from '../lang';

export const validate = async (options: {
  location: string | undefined;
  stage: string | undefined;
  json?: boolean;
}): Promise<{ valid: boolean }> => {
  const iacLocation = getIacLocation(options.location);

  if (options.json) {
    try {
      await runValidation(iacLocation, options);
    } catch (error) {
      if (error instanceof IacSchemaErrors) {
        writeJson({
          validateVersion: VALIDATE_JSON_VERSION,
          valid: false,
          errors: error.errors.map((schemaError): ValidateJsonError => ({
            path: schemaError.instancePath,
            keyword: schemaError.type,
            message: schemaError.message,
            ...(schemaError.allowedValues && schemaError.allowedValues.length > 0
              ? { allowedValues: schemaError.allowedValues }
              : {}),
          })),
        });
        return { valid: false };
      }
      throw error;
    }
    logger.info(lang.__('YAML_VALID'));
    writeJson({ validateVersion: VALIDATE_JSON_VERSION, valid: true, errors: [] });
    return { valid: true };
  }

  await runValidation(iacLocation, options);
  logger.info(lang.__('YAML_VALID'));
  return { valid: true };
};

const runValidation = async (
  iacLocation: string,
  options: { location: string | undefined; stage: string | undefined },
): Promise<void> => {
  const rawIac = parseYaml(iacLocation);
  await setContext({ app: rawIac.app, service: rawIac.service, ...options });
  const context = getContext();
  parseYaml(context.iacLocation);
};

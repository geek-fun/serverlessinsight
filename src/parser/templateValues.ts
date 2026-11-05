import { exportIacJsonSchema, templateRefSchema } from '../validator';

type Schema = {
  $ref?: string;
  type?: string;
  pattern?: string;
  definitions?: Record<string, Schema>;
  properties?: Record<string, Schema>;
  patternProperties?: Record<string, Schema>;
  additionalProperties?: Schema | boolean;
  items?: Schema;
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
};

let document: Schema | undefined;
const getDocument = (): Schema => (document ??= exportIacJsonSchema() as Schema);

const expandSchema = (schema: Schema): Schema[] => {
  const reference = schema.$ref && getDocument().definitions?.[schema.$ref.split('/').pop()!];
  if (reference) return expandSchema(reference);
  return [
    schema,
    ...[...(schema.oneOf ?? []), ...(schema.anyOf ?? []), ...(schema.allOf ?? [])].flatMap(
      expandSchema,
    ),
  ];
};

const childSchemas = (schema: Schema, key: string | number): Schema[] => {
  if (typeof key === 'number') return schema.items ? [schema.items] : [];
  const property = schema.properties?.[key];
  const patterns = Object.entries(schema.patternProperties ?? {})
    .filter(([pattern]) => new RegExp(pattern).test(key))
    .map(([, value]) => value);
  if (property || patterns.length) return [...(property ? [property] : []), ...patterns];
  return typeof schema.additionalProperties === 'object' ? [schema.additionalProperties] : [];
};

export const isStringTemplateField = (path: Array<string | number>): boolean =>
  path
    .reduce<Schema[]>(
      (schemas, key) =>
        schemas.flatMap(expandSchema).flatMap((schema) => childSchemas(schema, key)),
      [getDocument()],
    )
    .flatMap(expandSchema)
    .some((schema) => schema.type === 'string' && schema.pattern !== templateRefSchema.pattern);

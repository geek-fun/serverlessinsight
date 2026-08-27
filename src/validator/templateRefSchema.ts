// Template reference pattern that matches ${vars.xxx}, ${stages.xxx}, ${ctx.xxx}, ${functions.xxx}, ${certificates.xxx}
// Note: ${functions.xxx} and ${certificates.xxx} references are kept as strings and resolved by the deployment engine
// Only ${vars.xxx}, ${stages.xxx}, and ${ctx.xxx} are resolved at parse time
const templateRefPattern = '^\\$\\{(vars|stages|ctx|functions|certificates)\\.[\\w.]+\\}$';

// Schema definition for a template reference string
export const templateRefSchema = {
  type: 'string',
  pattern: templateRefPattern,
};

// Helper function to create a oneOf schema for a type that can also be a template reference
const withTemplateRef = (schema: Record<string, unknown>) => ({
  oneOf: [schema, templateRefSchema],
});

// Common resolvable type schemas
export const resolvableNumber = withTemplateRef({ type: 'number' });
export const resolvableInteger = withTemplateRef({ type: 'integer' });
export const resolvableBoolean = withTemplateRef({ type: 'boolean' });

// Helper for enum types that can also be template refs
export const resolvableEnum = (enumValues: string[]) =>
  withTemplateRef({ type: 'string', enum: enumValues });

/**
 * String field accepting either a whole template reference (`${vars.x}`) or a
 * literal satisfying the given JSON-Schema string constraints. Partial
 * interpolations deliberately fail so unresolved values never reach deploy.
 */
export const resolvableConstrained = (constraints: {
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}): Record<string, unknown> =>
  withTemplateRef({
    type: 'string',
    ...(constraints.pattern !== undefined ? { pattern: constraints.pattern } : {}),
    ...(constraints.minLength !== undefined ? { minLength: constraints.minLength } : {}),
    ...(constraints.maxLength !== undefined ? { maxLength: constraints.maxLength } : {}),
  });

/** Hostname optionally prefixed with a wildcard label (`*.example.com`). */
export const HOST_NAME_PATTERN =
  '^(?:\\*\\.)?(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\\.)+[A-Za-z]{2,63}$';

/** Resource-style bucket name: lowercase labels (dotted forms permitted), 3–63 chars. */
export const BUCKET_NAME_PATTERN =
  '^(?:[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?|(?:[a-z0-9][a-z0-9-]*\\.)+[a-z0-9-]{1,61}[a-z0-9])$';

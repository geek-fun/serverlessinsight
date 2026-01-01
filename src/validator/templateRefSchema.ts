// Template reference pattern that matches ${vars.xxx}, ${stages.xxx}, ${ctx.xxx}, ${functions.xxx}
export const templateRefPattern = '^\\$\\{(vars|stages|ctx|functions)\\.[\\w.]+\\}$';

// Schema definition for a template reference string
export const templateRefSchema = {
  type: 'string',
  pattern: templateRefPattern,
};

// Helper function to create a oneOf schema for a type that can also be a template reference
export const withTemplateRef = (schema: Record<string, unknown>) => ({
  oneOf: [schema, templateRefSchema],
});

// Common resolvable type schemas
export const resolvableNumber = withTemplateRef({ type: 'number' });
export const resolvableInteger = withTemplateRef({ type: 'integer' });
export const resolvableBoolean = withTemplateRef({ type: 'boolean' });
export const resolvableString = { type: 'string' }; // strings already accept template refs

// Helper for enum types that can also be template refs
export const resolvableEnum = (enumValues: string[]) =>
  withTemplateRef({ type: 'string', enum: enumValues });

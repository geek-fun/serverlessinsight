// Provider-agnostic IAM policy statement merge helpers.
// These functions operate on raw statement arrays and never import
// provider-specific modules — consumers supply their own map functions.

export type IamStatement = {
  sid?: string;
  effect: 'Allow' | 'Deny';
  action: string[];
  resource: string[];
};

/**
 * Merge built-in native statements with optional custom user statements.
 * Returns a NEW array — the input arrays are never mutated.
 *
 * @param nativeBuiltIn - The parsed Statement[] from the provider's built-in policy JSON.
 * @param custom - Optional user custom statements in provider-agnostic format.
 * @param mapFn - Converts an IamStatement into the native statement shape for the specific provider.
 * @returns A new array with built-in statements first, then mapped custom statements.
 */
export const mergePolicyStatements = <S extends Record<string, unknown>>(
  nativeBuiltIn: S[],
  custom: IamStatement[] | undefined,
  mapFn: (stmt: IamStatement) => S,
): S[] => {
  if (!custom || custom.length === 0) {
    return nativeBuiltIn;
  }
  const mappedCustom = custom.map(mapFn);
  return [...nativeBuiltIn, ...mappedCustom];
};

/**
 * Parse a provider's built-in policy JSON string into its raw Statement array.
 * Returns an empty array when the JSON is invalid or has no Statement field.
 */
export const parseBuiltInStatements = (policyJson: string): Record<string, unknown>[] => {
  const parsed = JSON.parse(policyJson) as Record<string, unknown>;
  const statement = parsed.Statement;
  return Array.isArray(statement) ? statement : [];
};

/**
 * Build a complete policy document JSON string from an array of statements.
 *
 * @param statements - The policy statements to include.
 * @param providerOptions - Optional per-provider options such as version.
 * @returns A JSON-stringified policy document.
 */
export const buildPolicyDocument = (
  statements: Record<string, unknown>[],
  providerOptions?: { version?: string },
): string => {
  const doc: Record<string, unknown> = { Statement: statements };
  if (providerOptions?.version) {
    doc.Version = providerOptions.version;
  }
  return JSON.stringify(doc);
};

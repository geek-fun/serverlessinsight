/**
 * Generic "resource already exists" detector for create-time errors, shared
 * across all providers. Cloud SDKs report collisions with different shapes:
 *   - Tencent: code ResourceInUse, message "指定的Function已存在，请勿重复创建"
 *   - Aliyun:   code...AlreadyExists / message "already exists" / ResourceExhausted
 *   - Volcengine: code...Conflict / message "already exist"
 *
 * Deliberately does NOT match timeouts/network errors — those must propagate so
 * a missing resource is never silently swallowed. Callers can pass provider-
 * specific extra codes that only their SDK emits.
 */
export const isResourceAlreadyExistsError = (
  error: unknown,
  extraCodes: string[] = [],
): boolean => {
  const code =
    error && typeof error === 'object' && 'code' in error && typeof error.code === 'string'
      ? error.code.toLowerCase()
      : '';

  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  const providerCodes = extraCodes.map((c) => c.toLowerCase());

  return (
    code.includes('resourceinuse') ||
    message.includes('已存在') ||
    message.includes('already exist') ||
    providerCodes.some((c) => code.includes(c))
  );
};

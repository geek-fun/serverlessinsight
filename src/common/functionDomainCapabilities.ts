/**
 * Provider function-domain capability registry (issue #286, #282 fail-fast row).
 *
 * Single source of truth for whether a provider implements direct custom
 * domain binding on functions, and whether wildcard domains (`*.example.com`)
 * are accepted by that provider's domain API. Semantic validation fail-fasts
 * on unsupported combinations; delivering function domains for a provider
 * narrows this registry instead of adding per-executor checks.
 *
 * Deliberately pure (no logger/lang imports) so the validator can import it
 * without dragging runtime state into the validation graph. Only the accessor
 * helper is exported — the registry table itself stays internal.
 */

type FunctionDomainProviderName = 'aliyun' | 'tencent' | 'volcengine';

type FunctionDomainCapability = {
  /** Direct custom-domain binding on functions is implemented by si. */
  functionDomains: boolean;
  /** The provider's domain API accepts wildcard domains (single `*`, first label). */
  wildcardDomains: boolean;
};

// Verified against provider APIs (2026-11):
// - aliyun FC3: POST /2023-03-30/custom-domains; wildcard domains supported.
// - tencent SCF: CreateCustomDomain (2018-04-16); docs state 通配符域名不支持.
// - volcengine veFaaS: no domain API at all (triggers: Timer/APIG/Kafka/... only);
//   the real path is an APIG trigger + APIG domain binding (event-domain model).
const FUNCTION_DOMAIN_CAPABILITIES: Record<FunctionDomainProviderName, FunctionDomainCapability> = {
  aliyun: { functionDomains: true, wildcardDomains: true },
  tencent: { functionDomains: true, wildcardDomains: false },
  volcengine: { functionDomains: false, wildcardDomains: false },
};

export const resolveFunctionDomainCapability = (
  providerName: string,
): FunctionDomainCapability | undefined =>
  FUNCTION_DOMAIN_CAPABILITIES[providerName as FunctionDomainProviderName];

import { FunctionDomainBindingParsed, FunctionProtocol, ResourceAttributes } from '../types';
import { resolveBindingCertificateHash } from './certUtils';

/**
 * Cross-provider core for function custom domains (issue #286).
 *
 * The domain model is binding-per-function, domain-per-cloud: each function
 * declares `domains` bindings; bindings sharing a `domain_name` are merged
 * into ONE cloud-side domain resource whose route list maps paths to the
 * declaring functions. Aliyun FC3 (`routeConfig.routes[]`) and Tencent SCF
 * (`EndpointsConfig[]`) share the same shape, so the route merge, protocol
 * canonicalization and definition canonicalization live here once; provider
 * stacks only supply their cloud operations and instance-type strings.
 */

export const DEFAULT_FUNCTION_ROUTE_PATH = '/*';
export const DEFAULT_FUNCTION_QUALIFIER = '$DEFAULT';

export type FunctionDomainRoute = {
  path: string;
  functionName: string;
  qualifier?: string;
};

export const normalizeFunctionDomainName = (domainName: string): string =>
  domainName.trim().toLowerCase();

const isFunctionProtocol = (value: string): value is FunctionProtocol =>
  value === 'HTTP' || value === 'HTTPS';

/**
 * Canonical protocol form: a sorted, de-duplicated subset of HTTP/HTTPS.
 * Accepts the scalar (`HTTPS`) and array (`[HTTP, HTTPS]`) YAML forms; empty
 * input restores the documented default `[HTTPS]` (issue #286).
 */
export const normalizeFunctionProtocol = (
  raw: string | Array<string> | undefined,
): Array<FunctionProtocol> => {
  const values = (Array.isArray(raw) ? raw : raw !== undefined ? [raw] : [])
    .map((value) => String(value).trim().toUpperCase())
    .filter(isFunctionProtocol);
  const unique = [...new Set(values)].sort();
  return unique.length > 0 ? unique : ['HTTPS'];
};

/** The single protocol string each provider API expects (`HTTP`, `HTTPS`, or the combined form). */
export const mapFunctionProtocol = (
  provider: 'aliyun' | 'tencent',
  protocols: Array<FunctionProtocol>,
): string => {
  if (protocols.length >= 2) return provider === 'aliyun' ? 'HTTP,HTTPS' : 'HTTP&HTTPS';
  return protocols[0];
};

/**
 * Route-path rules shared by semantic validation and the parser: the path
 * must start with `/`, and `*` may appear at most once and only as the last
 * character (both aliyun and tencent accept exact paths or a trailing
 * wildcard; matching is exact > longest-prefix, never regex).
 */
export const isValidFunctionRoutePath = (path: string): boolean => {
  if (!path.startsWith('/')) return false;
  const wildcardIndex = path.indexOf('*');
  if (wildcardIndex === -1) return true;
  return wildcardIndex === path.length - 1 && path.lastIndexOf('*') === wildcardIndex;
};

const routeSortKey = (route: FunctionDomainRoute): string =>
  `${route.path}\u0000${route.functionName}`;

/**
 * Subtractive-merge reconcile (issue #286): si owns the whole domain resource,
 * but each function reconciles ONLY its own routes. Routes pointing at other
 * functions pass through untouched (preserving their qualifier), the owning
 * function's previous routes are replaced by its desired paths.
 *
 * - `apply`: converge the domain towards (live minus own stale) plus own paths.
 * - `remove`: drop every route of the owning function (function teardown or
 *   binding removal) — the caller deletes the domain when the result is empty.
 */
export const mergeDomainRoutes = (
  live: Array<FunctionDomainRoute> | undefined,
  own: { functionName: string; paths: Array<string> },
  mode: 'apply' | 'remove',
): Array<FunctionDomainRoute> => {
  const others = (live ?? []).filter((route) => route.functionName !== own.functionName);
  if (mode === 'remove')
    return [...others].sort((a, b) => routeSortKey(a).localeCompare(routeSortKey(b)));
  const ownPaths = [...new Set(own.paths)];
  const ownRoutes = ownPaths.map((path) => ({ path, functionName: own.functionName }));
  return [...others, ...ownRoutes].sort((a, b) => routeSortKey(a).localeCompare(routeSortKey(b)));
};

/** Whether two normalized route lists describe the same routing table (order-insensitive; qualifier ignored — si routes are always $DEFAULT). */
export const routesEqual = (
  a: Array<FunctionDomainRoute> | undefined,
  b: Array<FunctionDomainRoute> | undefined,
): boolean => {
  const keyOf = (route: FunctionDomainRoute): string => `${route.path}\u0000${route.functionName}`;
  const aKeys = (a ?? []).map(keyOf).sort();
  const bKeys = (b ?? []).map(keyOf).sort();
  return aKeys.length === bKeys.length && aKeys.every((key, index) => key === bKeys[index]);
};

/**
 * Canonicalized definition entry for one binding — the exact shape persisted
 * in state and compared by plan/diff. `certificate_hash` records the content
 * hash of inline PEM (or reference id) so cert redeploys only happen on
 * change (issue #283 pattern, applied to function domains by #286).
 */
export const functionDomainDefinitionEntry = (
  binding: FunctionDomainBindingParsed,
): ResourceAttributes => ({
  domain_name: binding.domain_name,
  path: binding.path,
  certificate_id: binding.certificate_id ?? null,
  certificate_body: binding.certificate_body ?? null,
  certificate_private_key: binding.certificate_private_key ? '(managed)' : null,
  certificate_hash:
    resolveBindingCertificateHash({
      certificate_id: binding.certificate_id,
      certificate_body: binding.certificate_body,
      certificate_private_key: binding.certificate_private_key,
    }) ?? null,
  protocol: binding.protocol,
});

/** Bindings sorted by (domain, path) so YAML list reordering never produces a plan change. */
export const canonicalFunctionDomains = (
  bindings: Array<FunctionDomainBindingParsed> | undefined,
): Array<ResourceAttributes> =>
  (bindings ?? [])
    .map(functionDomainDefinitionEntry)
    .sort((a, b) =>
      `${a.domain_name}\u0000${a.path}`.localeCompare(`${b.domain_name}\u0000${b.path}`),
    );

/** A stored per-function binding view reconstructed from state instances. */
export type StoredFunctionDomainBinding = {
  domainName: string;
  paths: Array<string>;
};

/**
 * Reads a function's recorded domain bindings from its state instances
 * (identity = the domain name; one instance per domain per function holding
 * that function's `paths`). Instances recorded before #286 carry no `paths`
 * — they routed `/*`, which is the in-place migration default.
 */
export const storedFunctionDomainBindings = (
  instances: Array<Record<string, unknown>> | undefined,
  instanceType: string,
): Map<string, StoredFunctionDomainBinding> => {
  const stored = new Map<string, StoredFunctionDomainBinding>();
  (instances ?? []).forEach((instance) => {
    if (instance.type !== instanceType) return;
    const domainName = normalizeFunctionDomainName(String(instance.id ?? ''));
    if (!domainName) return;
    const rawPaths = Array.isArray(instance.paths)
      ? (instance.paths as Array<unknown>).map(String).filter(Boolean)
      : [];
    const paths = rawPaths.length > 0 ? rawPaths : [DEFAULT_FUNCTION_ROUTE_PATH];
    stored.set(domainName, { domainName, paths });
  });
  return stored;
};

/** A function's desired bindings on one domain, aggregated across multiple path bindings. */
export type AggregatedFunctionDomainBinding = {
  domainName: string;
  paths: Array<string>;
  /** First declared binding — supplies the per-domain protocol and certificate. */
  representative: FunctionDomainBindingParsed;
};

/**
 * Groups a function's `domains` bindings by normalized domain name. A
 * function may bind the same domain with several paths (the cloud route list
 * supports it); the representative binding supplies certificate/protocol,
 * which semantic validation requires to be consistent anyway.
 */
export const aggregateFunctionDomainBindings = (
  bindings: Array<FunctionDomainBindingParsed> | undefined,
): Map<string, AggregatedFunctionDomainBinding> => {
  const aggregated = new Map<string, AggregatedFunctionDomainBinding>();
  (bindings ?? []).forEach((binding) => {
    const domainName = normalizeFunctionDomainName(binding.domain_name);
    const existing = aggregated.get(domainName);
    aggregated.set(
      domainName,
      existing
        ? {
            ...existing,
            paths: existing.paths.includes(binding.path)
              ? existing.paths
              : [...existing.paths, binding.path],
          }
        : { domainName, paths: [binding.path], representative: binding },
    );
  });
  return aggregated;
};

/**
 * The certificate hash recorded in this function's saved definition for a
 * domain (issue #283 pattern): the canonicalized `domains` entry carries
 * `certificate_hash`; pre-#286 state stored a legacy single-object `domain`
 * whose `certificate_id` derives the same reference hash.
 */
export const storedFunctionDomainCertHash = (
  definition: ResourceAttributes | undefined,
  domainName: string,
): string | undefined => {
  const target = normalizeFunctionDomainName(domainName);
  const domains = Array.isArray(definition?.domains)
    ? (definition?.domains as Array<Record<string, unknown>>)
    : [];
  const entry = domains.find(
    (candidate) => normalizeFunctionDomainName(String(candidate.domain_name ?? '')) === target,
  );
  if (entry && typeof entry.certificate_hash === 'string' && entry.certificate_hash) {
    return entry.certificate_hash;
  }
  const legacy = definition?.domain as Record<string, unknown> | undefined;
  if (
    legacy &&
    typeof legacy.domain_name === 'string' &&
    normalizeFunctionDomainName(legacy.domain_name) === target &&
    typeof legacy.certificate_id === 'string' &&
    legacy.certificate_id
  ) {
    return resolveBindingCertificateHash({ certificate_id: legacy.certificate_id });
  }
  return undefined;
};

/** Normalizes a provider GET route payload into the shared route shape. */
export const toFunctionDomainRoutes = (
  routeConfig:
    { routes: Array<{ path?: string; functionName?: string; qualifier?: string }> } | undefined,
): Array<FunctionDomainRoute> =>
  (routeConfig?.routes ?? []).map((route) => ({
    path: route.path ?? '',
    functionName: route.functionName ?? '',
    ...(route.qualifier ? { qualifier: route.qualifier } : {}),
  }));

/** Whether any live route already points at one of this stack's functions — the ownership heuristic for state-less adoption after a partial failure. */
export const routesReferenceStackFunctions = (
  live: Array<FunctionDomainRoute>,
  stackFunctionNames: Set<string>,
): boolean => live.some((route) => stackFunctionNames.has(route.functionName));

/** Every function name in the stack: the parsed config is the authoritative desired set. */
export const collectStackFunctionNames = (
  iacFunctions: Array<{ name: string }> | undefined,
  ownFunctionName: string,
): Set<string> => {
  const names = new Set<string>([ownFunctionName]);
  (iacFunctions ?? []).forEach((fn) => names.add(fn.name));
  return names;
};

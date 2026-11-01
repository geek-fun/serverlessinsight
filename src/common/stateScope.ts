import path from 'node:path';
import { lang } from '../lang';

/**
 * Deployment scope identity (issue #280).
 *
 * An independent deployment state is identified by Service + Stage + Region.
 * Provider is a consistency constraint of the Service, not an additional axis.
 * Cloud accounts/projects/subscriptions are NOT identity dimensions.
 *
 * One command operates on exactly one scope. YAML path, filename and content
 * hash are never deployment identity.
 */
export type DeploymentScope = {
  provider: string;
  app: string;
  service: string;
  stage: string;
  region: string;
};

/** Scope sub-object persisted inside a V4 state document. */
export type StateScope = {
  stage: string;
  region: string;
};

export const SCOPED_STATE_DIR = 'states';
export const SCOPED_STATE_FILE = 'state.json';
export const SCOPED_LOCK_FILE = 'state.lock';
export const SCOPED_OBJECT_PREFIX = '.scopes';

/**
 * Validate one path-key segment of a scope (app / service / stage / region).
 * Segments become directory names on disk and object-key segments in bucket
 * storage, so they must be nonempty and path-safe. `.` / `..` and separators
 * are rejected so a crafted name cannot escape the states directory.
 */
export const validateScopeKeyPart = (part: string, label: string): string => {
  if (!part || part.trim().length === 0) {
    throw new Error(lang.__('SCOPE_KEY_PART_REQUIRED', { label }));
  }
  if (
    part.includes('/') ||
    part.includes('\\') ||
    part.includes('..') ||
    part.trim() !== part ||
    part === '.' ||
    part === '..'
  ) {
    throw new Error(lang.__('SCOPE_KEY_PART_INVALID', { label, part }));
  }
  return part;
};

/**
 * Canonicalise a region: trim, lowercase, path-safe. Regions are canonical
 * cloud identifiers (e.g. 'cn-hangzhou'); a missing region can never select an
 * arbitrary state, so an empty value is rejected up-front.
 */
export const canonicalizeRegion = (region: string | undefined): string => {
  const canonical = (region ?? '').trim().toLowerCase();
  return validateScopeKeyPart(canonical, 'region');
};

/** Validate a full deployment scope; returns a normalised copy. */
export const normalizeScope = (scope: DeploymentScope): DeploymentScope => ({
  provider: validateScopeKeyPart(scope.provider, 'provider'),
  app: validateScopeKeyPart(scope.app, 'app'),
  service: validateScopeKeyPart(scope.service, 'service'),
  stage: validateScopeKeyPart(scope.stage, 'stage'),
  region: canonicalizeRegion(scope.region),
});

/**
 * Deterministic, collision-resistant, path-safe local storage layout:
 * `.serverlessinsight/states/<app>/<service>/<stage>/<region>/state.json`.
 * Every segment is validated, so the layout cannot be escaped by config values.
 */
export const buildScopedStatePath = (
  app: string,
  service: string,
  stage: string,
  region: string,
  baseDir: string = process.cwd(),
): string => {
  return path.join(
    baseDir,
    '.serverlessinsight',
    SCOPED_STATE_DIR,
    validateScopeKeyPart(app, 'app'),
    validateScopeKeyPart(service, 'service'),
    validateScopeKeyPart(stage, 'stage'),
    canonicalizeRegion(region),
    SCOPED_STATE_FILE,
  );
};

/**
 * Bucket-store scoped object key derived from the configured (legacy) key:
 * `<key>.scopes/<app>/<service>/<stage>/<region>/state.json`. The configured
 * key remains the legacy/discovery entry point.
 */
export const buildScopedObjectKey = (
  key: string,
  app: string,
  service: string,
  stage: string,
  region: string,
): string => {
  if (!key || key.trim().length === 0) {
    throw new Error(lang.__('SCOPE_KEY_PART_REQUIRED', { label: 'key' }));
  }
  const segments = [app, service, stage, canonicalizeRegion(region)].map((part, index) =>
    validateScopeKeyPart(part, ['app', 'service', 'stage', 'region'][index]),
  );
  const base = `${key.replace(/\/+$/, '')}${SCOPED_OBJECT_PREFIX}`;
  return [base, ...segments, SCOPED_STATE_FILE].join('/');
};

/** The `scope` object of a V4 document must match the requested deployment scope exactly. */
export const stateScopeMatches = (scope: StateScope, stage: string, region: string): boolean =>
  scope.stage === stage && canonicalizeRegion(scope.region) === canonicalizeRegion(region);

/**
 * Service-level provider binding record (issue #280 §1): one Service has one
 * provider across ALL its scopes. Local layout:
 * `.serverlessinsight/states/<app>/<service>/provider.json`.
 */
export const buildServiceBindingPath = (
  app: string,
  service: string,
  baseDir: string = process.cwd(),
): string =>
  path.join(
    baseDir,
    '.serverlessinsight',
    SCOPED_STATE_DIR,
    validateScopeKeyPart(app, 'app'),
    validateScopeKeyPart(service, 'service'),
    'provider.json',
  );

/** Bucket-store service-level binding key: `<key>.scopes/<app>/<service>/provider.json`. */
export const buildServiceObjectKey = (key: string, app: string, service: string): string => {
  if (!key || key.trim().length === 0) {
    throw new Error(lang.__('SCOPE_KEY_PART_REQUIRED', { label: 'key' }));
  }
  return [
    `${key.replace(/\/+$/, '')}${SCOPED_OBJECT_PREFIX}`,
    validateScopeKeyPart(app, 'app'),
    validateScopeKeyPart(service, 'service'),
    'provider.json',
  ].join('/');
};

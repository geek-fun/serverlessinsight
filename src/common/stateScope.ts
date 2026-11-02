import path from 'node:path';
import { lang } from '../lang';

export type DeploymentScope = {
  provider: string;
  app: string;
  service: string;
  stage: string;
  region: string;
};

export type StateScope = {
  stage: string;
  region: string;
};

const SCOPED_STATE_DIR = 'states';
const SCOPED_STATE_FILE = 'state.json';
const SCOPED_OBJECT_PREFIX = '.scopes';

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

export const canonicalizeRegion = (region: string | undefined): string => {
  const canonical = (region ?? '').trim().toLowerCase();
  return validateScopeKeyPart(canonical, 'region');
};

export const normalizeScope = (scope: DeploymentScope): DeploymentScope => ({
  provider: validateScopeKeyPart(scope.provider, 'provider'),
  app: validateScopeKeyPart(scope.app, 'app'),
  service: validateScopeKeyPart(scope.service, 'service'),
  stage: validateScopeKeyPart(scope.stage, 'stage'),
  region: canonicalizeRegion(scope.region),
});

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

export const stateScopeMatches = (scope: StateScope, stage: string, region: string): boolean =>
  scope.stage === stage && canonicalizeRegion(scope.region) === canonicalizeRegion(region);

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

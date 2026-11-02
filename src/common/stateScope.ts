import path from 'node:path';

import { lang } from '../lang';
import { LOCK_FILE_SUFFIX } from './constants';

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

const filenamePart = (part: string, label: string): string =>
  encodeURIComponent(validateScopeKeyPart(part, label)).replace(/_/g, '%5F');

const scopedFilename = (service: string, stage: string, region: string): string =>
  `${filenamePart(service, 'service')}_${filenamePart(stage, 'stage')}_${filenamePart(canonicalizeRegion(region), 'region')}_state.json`;

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
    scopedFilename(service, stage, region),
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
  const base = `${key.replace(/\/+$/, '')}${SCOPED_OBJECT_PREFIX}`;
  return [base, validateScopeKeyPart(app, 'app'), scopedFilename(service, stage, region)].join('/');
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
    `${filenamePart(service, 'service')}_provider.json`,
  );

export const buildServiceObjectKey = (key: string, app: string, service: string): string => {
  if (!key || key.trim().length === 0) {
    throw new Error(lang.__('SCOPE_KEY_PART_REQUIRED', { label: 'key' }));
  }
  return [
    `${key.replace(/\/+$/, '')}${SCOPED_OBJECT_PREFIX}`,
    validateScopeKeyPart(app, 'app'),
    `${filenamePart(service, 'service')}_provider.json`,
  ].join('/');
};

export const getPreviousScopedLocations = (location: string): string[] => {
  const boundary = Math.max(location.lastIndexOf('/'), location.lastIndexOf('\\'));
  const [service, stage, region, suffix, ...extra] = location.slice(boundary + 1).split('_');
  if (!service || !stage || !region || suffix !== 'state.json' || extra.length) return [];
  const separator = boundary < 0 ? '/' : location[boundary];
  const root = location.slice(0, boundary + 1);
  const parts = [service, stage, region].map((part) =>
    validateScopeKeyPart(decodeURIComponent(part), 'scope'),
  );
  const serviceRoot = `${root}${parts[0]}${separator}`;
  const state = `${serviceRoot}${parts[1]}${separator}${parts[2]}${separator}state.json`;
  return [
    `${serviceRoot}provider.json`,
    state,
    `${state}${LOCK_FILE_SUFFIX}`,
    `${state}.backup`,
    `${state}.tmp`,
  ];
};

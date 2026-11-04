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

export const stateScopeMatches = (scope: StateScope, stage: string, region: string): boolean =>
  scope.stage === stage && canonicalizeRegion(scope.region) === canonicalizeRegion(region);

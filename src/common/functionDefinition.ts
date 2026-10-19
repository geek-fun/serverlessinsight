import { mergeManagedIntent } from './planCompare';
import type { FunctionDomain, ResourceAttributes } from '../types';

/** Persist lifecycle intent alongside function configuration, using the same shape on every provider. */
export const withFunctionLifecycle = (
  definition: ResourceAttributes,
  fn?: FunctionDomain,
): ResourceAttributes => ({
  ...definition,
  ...(fn?.log !== undefined && !definition.logConfig ? { logEnabled: fn.log } : {}),
  ...(fn?.triggers?.http ? { http: fn.triggers.http } : {}),
  ...(fn?.domain ? { domain: fn.domain } : {}),
  ...(fn?.triggers?.timer !== undefined ? { timers: fn.triggers.timer } : {}),
});

/** An omitted IAM block must not revoke a previously managed grant on an unrelated update. */
export const withStoredFunctionIam = (
  fn: FunctionDomain,
  stored: ResourceAttributes = {},
): FunctionDomain => {
  const iam = mergeManagedIntent({ iam: stored.iam }, { iam: fn.iam }).iam as FunctionDomain['iam'];
  return iam ? { ...fn, iam } : fn;
};

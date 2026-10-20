import { mergeManagedIntent } from './planCompare';
import type { FunctionDomain, ResourceAttributes } from '../types';

/** Persist lifecycle intent alongside function configuration, using the same shape on every provider. */
export const withFunctionLifecycle = (
  definition: ResourceAttributes,
  fn?: FunctionDomain,
  support: { http?: boolean; domain?: boolean } = {},
): ResourceAttributes => ({
  ...definition,
  ...(fn?.log !== undefined && !definition.logConfig ? { logEnabled: fn.log } : {}),
  ...(support.http !== false && fn?.triggers?.http ? { http: fn.triggers.http } : {}),
  ...(support.domain !== false && fn?.domain ? { domain: fn.domain } : {}),
  ...(fn?.triggers?.timer !== undefined ? { timers: fn.triggers.timer } : {}),
});

/** Lifecycle fields follow the YAML on write: a removed field is dropped, not merged back from stored intent. */
export const withLifecycleIntent = (
  merged: ResourceAttributes,
  desired: ResourceAttributes,
  keys: readonly string[],
): ResourceAttributes => ({
  ...Object.fromEntries(Object.entries(merged).filter(([key]) => !keys.includes(key))),
  ...Object.fromEntries(keys.filter((key) => key in desired).map((key) => [key, desired[key]])),
});

/** An omitted IAM block must not revoke a previously managed grant on an unrelated update. */
export const withStoredFunctionIam = (
  fn: FunctionDomain,
  stored: ResourceAttributes = {},
): FunctionDomain => {
  const iam = mergeManagedIntent({ iam: stored.iam }, { iam: fn.iam }).iam as FunctionDomain['iam'];
  return iam ? { ...fn, iam } : fn;
};

import { isSensitiveEnvEntry, readEnvironment, redactEnvironmentAttributes } from './envRedaction';
import { lang } from '../lang';
import type { AttributeDiff, PlanItem } from '../types';

const SENSITIVE_FIELDS = new Set([
  'authentication',
  'credentials',
  'domainCertificatePrivateKey',
  'certificatePrivateKey',
]);

const maskDiffValues = (diff: AttributeDiff): AttributeDiff => {
  const { children: _children, before, after, ...rest } = diff;
  return {
    ...rest,
    ...(before !== undefined ? { before: lang.__('PLAN_SENSITIVE_VALUE') } : {}),
    ...(after !== undefined ? { after: lang.__('PLAN_SENSITIVE_VALUE') } : {}),
  };
};

/** Compute diffs first so plans can show that a secret changed without showing its values. */
export const redactAttributeDiffs = (diffs: AttributeDiff[]): AttributeDiff[] =>
  diffs.map((diff) => {
    if (SENSITIVE_FIELDS.has(diff.key)) return maskDiffValues(diff);
    if (diff.key === 'environment') {
      const before = readEnvironment(diff.before);
      const after = readEnvironment(diff.after);
      return {
        ...diff,
        ...(before && { before: redactEnvironmentAttributes({ environment: before }).environment }),
        ...(after && { after: redactEnvironmentAttributes({ environment: after }).environment }),
        ...(diff.children && {
          children: diff.children.map((child) =>
            isSensitiveEnvEntry(child.key, child.before) ||
            isSensitiveEnvEntry(child.key, child.after)
              ? maskDiffValues(child)
              : child,
          ),
        }),
      };
    }
    return {
      ...diff,
      ...(diff.children ? { children: redactAttributeDiffs(diff.children) } : {}),
    };
  });

/** Store only redacted values in SaaS deployment records. */
export const redactPlanItems = (items: PlanItem[]): PlanItem[] =>
  items.map((item) => {
    const { before, after } = item.changes ?? {};
    return {
      ...item,
      ...(item.changes && {
        changes: {
          ...item.changes,
          ...(before && { before: redactEnvironmentAttributes(before) }),
          ...(after && { after: redactEnvironmentAttributes(after, before) }),
        },
      }),
      ...(item.stateUpdate && { stateUpdate: redactEnvironmentAttributes(item.stateUpdate) }),
    };
  });

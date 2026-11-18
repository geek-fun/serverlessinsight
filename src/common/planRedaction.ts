import {
  isConfigRefMarker,
  isSensitiveEnvEntry,
  markerProvenance,
  readEnvironment,
  redactEnvironmentAttributes,
  sessionMarkerFor,
} from './envRedaction';
import { lang } from '../lang';
import type { AttributeDiff, PlanItem } from '../types';

const SENSITIVE_FIELDS = new Set([
  'authentication',
  'credentials',
  'domainCertificatePrivateKey',
  'certificatePrivateKey',
]);

const sensitiveDisplay = (value: unknown, previous?: unknown): string => {
  const marker =
    sessionMarkerFor(value) ??
    (typeof value === 'string' && isConfigRefMarker(value) ? value : null);
  if (marker) {
    const previousMarker =
      typeof previous === 'string'
        ? (sessionMarkerFor(previous) ?? (isConfigRefMarker(previous) ? previous : null))
        : null;
    const provenance = markerProvenance(marker, previousMarker ?? undefined);
    if (provenance) return provenance;
  }
  return lang.__('PLAN_SENSITIVE_VALUE');
};

const maskDiffValues = (diff: AttributeDiff): AttributeDiff => {
  const { children: _children, before, after, ...rest } = diff;
  return {
    ...rest,
    ...(before !== undefined ? { before: sensitiveDisplay(before) } : {}),
    ...(after !== undefined ? { after: sensitiveDisplay(after, before) } : {}),
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

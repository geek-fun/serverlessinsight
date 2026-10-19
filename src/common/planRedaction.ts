import { lang } from '../lang';
import type { AttributeDiff } from '../types';

const SENSITIVE_FIELDS = new Set([
  'authentication',
  'credentials',
  'domainCertificatePrivateKey',
  'certificatePrivateKey',
]);

/** Comparison markers never become public credential values in human or JSON plans. */
export const redactAttributeDiffs = (diffs: AttributeDiff[]): AttributeDiff[] =>
  diffs.map((diff) => {
    if (SENSITIVE_FIELDS.has(diff.key)) {
      const { children: _children, before, after, ...rest } = diff;
      return {
        ...rest,
        ...(before !== undefined ? { before: lang.__('PLAN_SENSITIVE_VALUE') } : {}),
        ...(after !== undefined ? { after: lang.__('PLAN_SENSITIVE_VALUE') } : {}),
      };
    }
    return {
      ...diff,
      ...(diff.children ? { children: redactAttributeDiffs(diff.children) } : {}),
    };
  });

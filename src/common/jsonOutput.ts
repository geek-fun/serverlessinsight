import type { AttributeDiff, PlanItem } from '../types';
import { computeAttributeDiffs, isRecreate } from './planFormatter';

/**
 * Machine-readable output channel (issue #250): the `--json` surface of the CLI.
 *
 * Contract with agents:
 * - logs (pino) go to stderr, JSON results go to stdout — a pipe of stdout is
 *   always a single JSON document (jq-parseable);
 * - every envelope carries a version field (`planVersion` / `validateVersion` /
 *   `showVersion`) so consumers can pin a shape;
 * - failures emit `{ error: { code, message } }` where `code` is the stable
 *   i18n key behind the message — locale changes never change the code.
 */
export const PLAN_JSON_VERSION = 1;
export const VALIDATE_JSON_VERSION = 1;
export const SHOW_JSON_VERSION = 1;

let jsonMode = false;

export const setJsonMode = (enabled: boolean): void => {
  jsonMode = enabled;
};

export const isJsonMode = (): boolean => jsonMode;

export const writeJson = (payload: unknown): void => {
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
};

export type PlanJsonAction = 'create' | 'update' | 'destroy' | 'recreate';

export type PlanJsonChange = {
  logicalId: string;
  type: string;
  action: PlanJsonAction;
  attributes: AttributeDiff[];
  drifted?: boolean;
  driftReasons?: string[];
};

export type PlanJsonSummary = {
  create: number;
  update: number;
  destroy: number;
  recreate: number;
  unchanged: number;
};

export type PlanIdentity = {
  provider: string;
  app: string;
  service: string;
  stage: string;
};

export type PlanJsonPayload = PlanIdentity & {
  planVersion: number;
  changes: PlanJsonChange[];
  summary: PlanJsonSummary;
};

export const buildPlanSummary = (items: PlanItem[]): PlanJsonSummary =>
  items.reduce<PlanJsonSummary>(
    (summary, item) => {
      if (item.action === 'noop') {
        return { ...summary, unchanged: summary.unchanged + 1 };
      }
      if (item.action === 'create') {
        return isRecreate(item)
          ? { ...summary, recreate: summary.recreate + 1 }
          : { ...summary, create: summary.create + 1 };
      }
      if (item.action === 'update') {
        return { ...summary, update: summary.update + 1 };
      }
      return { ...summary, destroy: summary.destroy + 1 };
    },
    { create: 0, update: 0, destroy: 0, recreate: 0, unchanged: 0 },
  );

const toPlanJsonAction = (item: PlanItem): PlanJsonAction => {
  if (item.action === 'delete') return 'destroy';
  if (item.action === 'create' && isRecreate(item)) return 'recreate';
  return item.action === 'update' ? 'update' : 'create';
};

export const buildPlanChange = (item: PlanItem): PlanJsonChange => {
  const attributes = item.changes
    ? computeAttributeDiffs(item.changes.before, item.changes.after).diffs
    : [];

  return {
    logicalId: item.logicalId,
    type: item.resourceType,
    action: toPlanJsonAction(item),
    attributes,
    ...(item.drifted ? { drifted: true } : {}),
    ...(item.driftReasons && item.driftReasons.length > 0
      ? { driftReasons: item.driftReasons }
      : {}),
  };
};

export const buildPlanJson = (
  planResult: { items: PlanItem[] },
  identity: PlanIdentity,
): PlanJsonPayload => {
  const items = planResult.items ?? [];

  return {
    planVersion: PLAN_JSON_VERSION,
    ...identity,
    changes: items.filter((item) => item.action !== 'noop').map(buildPlanChange),
    summary: buildPlanSummary(items),
  };
};

export type ValidateJsonError = {
  path: string;
  keyword: string;
  message: string;
  allowedValues?: Array<string>;
};

export type ValidateJsonPayload = {
  validateVersion: number;
  valid: boolean;
  errors: ValidateJsonError[];
};

export type ShowJsonPayload = PlanIdentity & {
  showVersion: number;
  serial?: number;
  lineage?: string;
  managedBy?: string;
  stateLocation: string;
  backend: 'saas' | 'bucket_store' | 'local';
  locked: boolean;
  lock: Record<string, unknown> | null;
  resources: Record<string, unknown>;
  resourceCount: number;
};

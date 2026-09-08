import { PlanItem, ResourceAttributes, ResourceState } from '../types';
import { attributesEqual } from './hashUtils';
import { remoteDiffersFromDesired } from './planCompare';

/**
 * Exists-path decision for attribute-refresh planners (issue #234 Phase 3):
 * remote missing → create+drifted; intent-diff or live-attribute drift →
 * update+drifted; extra bookkeeping conditions → update (drifted per flag);
 * otherwise noop. Read failures propagate — callers keep their catch → create
 * fallback. Item construction stays with the caller: before/after
 * normalization and resource-specific details differ per planner.
 */
export type RefreshExistsDecision =
  { action: 'create'; drifted: true } | { action: 'update'; drifted: boolean } | { action: 'noop' };

export type RefreshExistsArgs<T> = {
  read: () => Promise<T | null>;
  cloudToDefinition: (remote: T) => ResourceAttributes;
  enrichRemoteAttributes?: (
    remote: T,
    attributes: ResourceAttributes,
  ) => Promise<ResourceAttributes>;
  desiredDefinition: ResourceAttributes;
  /** intent diff — computed by the caller (normalization differs per planner) */
  definitionChanged: boolean;
  /**
   * Extra update sources beyond the two standard diffs (e.g. pending domain
   * binding). `drifted` controls the flag: intent/live drift set it,
   * bookkeeping-only conditions do not.
   */
  extraUpdate?: () => Promise<{ update: boolean; drifted: boolean }>;
};

export const decideRefreshedExistsAction = async <T>(
  args: RefreshExistsArgs<T>,
): Promise<RefreshExistsDecision> => {
  const remote = await args.read();
  if (!remote) {
    return { action: 'create', drifted: true };
  }
  let attributes = args.cloudToDefinition(remote);
  if (args.enrichRemoteAttributes) {
    attributes = await args.enrichRemoteAttributes(remote, attributes);
  }
  const remoteDiffers = remoteDiffersFromDesired(attributes, args.desiredDefinition);
  if (args.definitionChanged || remoteDiffers) {
    return { action: 'update', drifted: true };
  }
  const extra = await args.extraUpdate?.();
  if (extra?.update) {
    return { action: 'update', drifted: extra.drifted };
  }
  return { action: 'noop' };
};

export type PlanRefreshedResourceArgs<T> = {
  logicalId: string;
  resourceType: string;
  /** undefined or tainted routes to the probe-create path (planner semantics) */
  currentState: ResourceState | undefined;
  desiredDefinition: ResourceAttributes;
  /** no-state/tainted probe; defaults to `read` when both paths read alike */
  probeRead?: () => Promise<T | null>;
  read: () => Promise<T | null>;
  isOwned: (remote: T) => boolean;
  /** thrown on the probe path when a same-named remote exists unowned */
  foreignError: (remote: T) => Error;
  cloudToDefinition: (remote: T) => ResourceAttributes;
  /** Post-process mapped remote attributes with extra live reads (e.g. resolve cloud log-config ids to names). */
  enrichRemoteAttributes?: (
    remote: T,
    attributes: ResourceAttributes,
  ) => Promise<ResourceAttributes>;
  /** applied to both sides before the intent diff and in changes display */
  normalizeForDisplay?: (definition: ResourceAttributes) => ResourceAttributes;
  extraUpdate?: () => Promise<{ update: boolean; drifted: boolean }>;
  /**
   * When false (CLI --no-refresh): skip the live read and the attribute-drift
   * leg entirely — the decision degenerates to intent-diff only, with no
   * drifted claims. The probe-create path still runs (ownership safety).
   */
  refresh?: boolean;
};

/**
 * Shared planner skeleton (issue #234 Phase 3): covers the uniform
 * no-state-probe / exists-refresh decision chain of the simple planners
 * (buckets, tables, databases). Function and gateway planners keep their
 * custom flows (role probes, trigger reconciliation, config normalization).
 * Read failures on the exists path degrade to a create plan — the pre-existing
 * planner behavior, preserved verbatim.
 */
export const planRefreshedResource = async <T>(
  args: PlanRefreshedResourceArgs<T>,
): Promise<PlanItem> => {
  const { logicalId, resourceType, currentState, desiredDefinition } = args;

  if (!currentState || currentState.status === 'tainted') {
    const probeRead = args.probeRead ?? args.read;
    const remote = await probeRead();
    if (remote && !args.isOwned(remote)) {
      throw args.foreignError(remote);
    }
    return {
      logicalId,
      action: 'create',
      resourceType,
      changes: { after: desiredDefinition },
    };
  }

  const normalize = args.normalizeForDisplay ?? ((d) => d);
  const currentDefinition = currentState.definition || {};
  const normalizedCurrent = normalize(currentDefinition);
  const normalizedDesired = normalize(desiredDefinition);
  const definitionChanged = !attributesEqual(normalizedCurrent, normalizedDesired);
  const refreshEnabled = args.refresh ?? true;

  try {
    // --no-refresh: no cloud knowledge, so no drift claims — intent-diff only.
    if (!refreshEnabled) {
      if (!definitionChanged) {
        return { logicalId, action: 'noop', resourceType };
      }
      return {
        logicalId,
        action: 'update',
        resourceType,
        changes: { before: normalizedCurrent, after: normalizedDesired },
      };
    }

    const decision = await decideRefreshedExistsAction<T>({
      read: args.read,
      cloudToDefinition: args.cloudToDefinition,
      enrichRemoteAttributes: args.enrichRemoteAttributes,
      desiredDefinition,
      definitionChanged,
      extraUpdate: args.extraUpdate,
    });

    if (decision.action === 'noop') {
      return { logicalId, action: 'noop', resourceType };
    }

    if (decision.action === 'create') {
      return {
        logicalId,
        action: 'create',
        resourceType,
        changes: { before: normalize(currentDefinition), after: desiredDefinition },
        drifted: true,
      };
    }

    return {
      logicalId,
      action: 'update',
      resourceType,
      changes: { before: normalizedCurrent, after: normalizedDesired },
      ...(decision.drifted ? { drifted: true } : {}),
    };
  } catch {
    return {
      logicalId,
      action: 'create',
      resourceType,
      changes: { before: normalize(currentDefinition), after: desiredDefinition },
    };
  }
};

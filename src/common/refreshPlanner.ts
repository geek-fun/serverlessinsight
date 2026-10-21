import { PlanItem, ResourceAttributes, ResourceState, StateFile } from '../types';
import { attributesEqual } from './hashUtils';
import { assertPlanIdentity, assertSupportedPlanUpdate } from './planCapabilities';
import { getResource, setResource } from './stateManager';
import {
  computeRevertKeys,
  definitionsDiffer,
  managedDefinition,
  mergeLiveBefore,
  mergeManagedIntent,
  remoteDiffersFromDesired,
} from './planCompare';
import { logger } from './logger';
import { lang } from '../lang';

/** Keep cloud writes, drift repairs and verified state-only adoption distinct. */
export type RefreshExistsDecision =
  | { action: 'create'; drifted: true }
  | {
      action: 'update';
      drifted: boolean;
      /** live cloud attributes (post cloudToDefinition + enrich) for the diff baseline */
      liveAttributes: ResourceAttributes;
      /** probe-level drift sources (i18n keys) when the update is reason-driven */
      driftReasons?: string[];
    }
  | { action: 'state'; liveAttributes: ResourceAttributes }
  | { action: 'noop' };

export type RefreshExistsArgs<T> = {
  read: () => Promise<T | null>;
  cloudToDefinition: (remote: T) => ResourceAttributes;
  enrichRemoteAttributes?: (
    remote: T,
    attributes: ResourceAttributes,
  ) => Promise<ResourceAttributes>;
  desiredDefinition: ResourceAttributes;
  storedDefinition: ResourceAttributes;
  /** intent diff — computed by the caller (normalization differs per planner) */
  definitionChanged: boolean;
  /**
   * Extra update sources beyond the two standard diffs (e.g. pending domain
   * binding, nested topic drift). `drifted` controls the flag: live
   * drift sets it, bookkeeping-only conditions do not. `reason` (an i18n key)
   * marks probe-level drift that has no attribute-level diff to show.
   */
  extraUpdate?: () => Promise<{
    update: boolean;
    drifted: boolean;
    reason?: string;
    reasons?: string[];
  }>;
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
  const effectiveChanged = definitionsDiffer(
    mergeLiveBefore(args.storedDefinition, attributes, args.desiredDefinition),
    args.desiredDefinition,
  );
  const extra = await args.extraUpdate?.();
  if (effectiveChanged || extra?.update) {
    const drifted =
      remoteDiffersFromDesired(
        attributes,
        managedDefinition(args.storedDefinition, args.desiredDefinition),
      ) ||
      (extra?.update === true && extra.drifted === true);
    return {
      action: 'update',
      drifted,
      liveAttributes: attributes,
      ...(extra?.reasons?.length || extra?.reason
        ? {
            driftReasons: [
              ...new Set([...(extra?.reasons ?? []), ...(extra?.reason ? [extra.reason] : [])]),
            ],
          }
        : {}),
    };
  }
  if (args.definitionChanged && !remoteDiffers) {
    return { action: 'state', liveAttributes: attributes };
  }
  return { action: 'noop' };
};

export type PlanRefreshedResourceArgs<T> = {
  logicalId: string;
  resourceType: string;
  /** undefined or tainted routes to the probe-create path (planner semantics) */
  currentState: ResourceState | undefined;
  desiredDefinition: ResourceAttributes;
  /** Dependents we created (recorded in state) that the desired definition no longer declares, keyed by field. */
  removedDependents?: ResourceAttributes;
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
  extraUpdate?: () => Promise<{
    update: boolean;
    drifted: boolean;
    reason?: string;
    reasons?: string[];
  }>;
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
 *
 * Issue #246 display contract: a drift/intent update's `changes.before` is
 * always cloud reality — live attributes merged over the stored definition
 * (stored fills the keys the cloud mapper never emits) — so every update
 * renders a complete live→desired field diff, and `revertKeys` marks the
 * fields whose difference is purely an out-of-config cloud edit.
 */
const withRemovedDependents = (
  item: PlanItem,
  removed: ResourceAttributes,
  desired: ResourceAttributes,
): PlanItem => {
  if (Object.keys(removed).length === 0 || item.action === 'create' || item.action === 'delete') {
    return item;
  }
  const { stateUpdate: _stateUpdate, ...rest } = item;
  return {
    ...rest,
    action: 'update',
    changes: {
      before: { ...(item.changes?.before ?? {}), ...removed },
      after: item.changes?.after ?? managedDefinition(desired),
    },
  };
};

export const planRefreshedResource = async <T>(
  args: PlanRefreshedResourceArgs<T>,
): Promise<PlanItem> =>
  withRemovedDependents(
    await planRefreshedResourceCore(args),
    args.currentState ? (args.removedDependents ?? {}) : {},
    args.desiredDefinition,
  );

const planRefreshedResourceCore = async <T>(
  args: PlanRefreshedResourceArgs<T>,
): Promise<PlanItem> => {
  const { logicalId, resourceType, currentState, desiredDefinition } = args;

  if (currentState) {
    if (
      currentState.metadata?.resourceType &&
      currentState.metadata.resourceType !== resourceType
    ) {
      throw new Error(lang.__('PLAN_REPLACEMENT_REQUIRED', { logicalId, fields: 'resourceType' }));
    }
    assertPlanIdentity(logicalId, resourceType, currentState.definition || {}, desiredDefinition);
  }

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
  const normalizedCurrent = managedDefinition(
    normalize(currentDefinition),
    normalize(desiredDefinition),
  );
  const normalizedDesired = managedDefinition(normalize(desiredDefinition));
  const definitionChanged = !attributesEqual(normalizedCurrent, normalizedDesired);
  const refreshEnabled = args.refresh ?? true;

  try {
    // --no-refresh: no cloud knowledge, so no drift claims — intent-diff only.
    if (!refreshEnabled) {
      if (!definitionChanged) {
        return { logicalId, action: 'noop', resourceType };
      }
      assertSupportedPlanUpdate(
        logicalId,
        resourceType,
        { ...currentDefinition, ...normalizedCurrent },
        normalizedDesired,
      );
      return {
        logicalId,
        action: 'update',
        resourceType,
        changes: { before: normalizedCurrent, after: normalizedDesired },
      };
    }

    const decision = await decideRefreshedExistsAction<T>({
      read: args.read,
      cloudToDefinition: (remote) => normalize(args.cloudToDefinition(remote)),
      enrichRemoteAttributes: args.enrichRemoteAttributes,
      desiredDefinition: normalizedDesired,
      storedDefinition: normalizedCurrent,
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
        changes: { before: normalizedCurrent, after: desiredDefinition },
        drifted: true,
      };
    }

    if (decision.action === 'state') {
      return { logicalId, action: 'noop', resourceType, stateUpdate: desiredDefinition };
    }

    const normalizedLive = normalize(decision.liveAttributes);
    const before = mergeLiveBefore(normalizedCurrent, normalizedLive, normalizedDesired);
    assertSupportedPlanUpdate(
      logicalId,
      resourceType,
      { ...currentDefinition, ...before },
      normalizedDesired,
    );
    const revertKeys = computeRevertKeys(normalizedCurrent, normalizedLive, normalizedDesired);
    return {
      logicalId,
      action: 'update',
      resourceType,
      changes: {
        before,
        after: normalizedDesired,
      },
      ...(decision.drifted ? { drifted: true } : {}),
      ...(revertKeys.length ? { revertKeys } : {}),
      ...(decision.driftReasons?.length ? { driftReasons: decision.driftReasons } : {}),
    };
  } catch (error: unknown) {
    logger.warn(
      lang.__('PLAN_LIVE_READ_FAILED', {
        logicalId,
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    throw error;
  }
};

/** Applied only under the deployment lock, never by the read-only plan command. */
export const applyPlanStateUpdates = (state: StateFile, items: PlanItem[]): StateFile =>
  items.reduce((current, item) => {
    const resource = getResource(current, item.logicalId);
    if (item.action !== 'noop' || !item.stateUpdate || !resource) return current;
    return setResource(current, item.logicalId, {
      ...resource,
      definition: mergeManagedIntent(resource.definition ?? {}, item.stateUpdate),
    });
  }, state);

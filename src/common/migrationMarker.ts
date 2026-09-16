import { logger } from './logger';
import { lang } from '../lang';

/**
 * Value written into the legacy state's top-level `managedBy` field once
 * `si migrate` has copied the state to the Console (docs/state-migration-saas.md
 * §6.3). The marker is just a new persisted version of the state — there is no
 * separate tombstone mechanism.
 */
export const MANAGED_BY_SAAS = 'saas';

export type MigrationMarkerAction = 'refuse' | 'warn' | 'off';

/** True when the state has been migrated to (and is now owned by) the Console. */
export const isMigratedToSaas = (state: { managedBy?: string } | null | undefined): boolean => {
  return state?.managedBy === MANAGED_BY_SAAS;
};

/**
 * Ownership handover check (decision D-4): after migration the Console is the
 * single source of truth. Mutating commands (deploy/destroy) pass 'refuse' so
 * a legacy-backend write attempt fails closed; read-only commands (plan/diff/
 * show) pass 'warn'; `si migrate` itself passes 'off' (it must be able to read
 * marked state for idempotent re-runs and --rollback).
 */
export const enforceMigrationMarker = (
  state: { managedBy?: string } | null | undefined,
  action: MigrationMarkerAction,
): void => {
  if (action === 'off' || !isMigratedToSaas(state)) {
    return;
  }
  if (action === 'refuse') {
    throw new Error(lang.__('MIGRATION_MARKER_REFUSED'));
  }
  logger.warn(lang.__('MIGRATION_MARKER_WARN'));
};

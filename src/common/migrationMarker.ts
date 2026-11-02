import { logger } from './logger';
import { lang } from '../lang';

/**
 * Value written into the legacy state's top-level `managedBy` field once
 * `si migrate` has copied the state to the Console (docs/state-migration-saas.md
 * §6.3). The marker is just a new persisted version of the state — there is no
 * separate tombstone mechanism.
 */
export const MANAGED_BY_SAAS = 'saas';

export const MANAGED_BY_REGIONAL = 'regional';

export type MigrationMarkerAction = 'refuse' | 'warn' | 'off';

const MIGRATION_MARKERS = new Set([MANAGED_BY_SAAS, MANAGED_BY_REGIONAL]);

export const isMigratedState = (state: { managedBy?: string } | null | undefined): boolean => {
  return !!state?.managedBy && MIGRATION_MARKERS.has(state.managedBy);
};

/** True when the state has been migrated to (and is now owned by) the Console. */
export const isMigratedToSaas = (state: { managedBy?: string } | null | undefined): boolean => {
  return state?.managedBy === MANAGED_BY_SAAS;
};

export const enforceMigrationMarker = (
  state: { managedBy?: string } | null | undefined,
  action: MigrationMarkerAction,
): void => {
  if (action === 'off' || !isMigratedState(state)) {
    return;
  }
  if (action === 'refuse') {
    throw new Error(
      state?.managedBy === MANAGED_BY_REGIONAL
        ? lang.__('MIGRATION_MARKER_REGIONAL_REFUSED')
        : lang.__('MIGRATION_MARKER_REFUSED'),
    );
  }
  logger.warn(
    state?.managedBy === MANAGED_BY_REGIONAL
      ? lang.__('MIGRATION_MARKER_REGIONAL_WARN')
      : lang.__('MIGRATION_MARKER_WARN'),
  );
};

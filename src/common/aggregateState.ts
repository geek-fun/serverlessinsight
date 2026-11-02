import crypto from 'node:crypto';

import {
  CURRENT_STATE_VERSION,
  StateCorruptError,
  StateScopeMismatchError,
  StateVersionError,
  type PersistedStateFile,
  type StageState,
  type StateFile,
  type StateMigrationInfo,
} from '../types';
import { lang } from '../lang';
import { normalizeScope, validateScopeKeyPart, type DeploymentScope } from './stateScope';
import { hashSaasState } from './saasProtocol';

export const AGGREGATE_STATE_VERSION = '5.0';

export type StatePartition = StageState & {
  lineage: string;
  serial: number;
  orgId?: string;
  appId?: string;
  serviceId?: string;
  managedBy?: string;
  migration?: StateMigrationInfo;
};

export type AggregateStateFile = {
  version: typeof AGGREGATE_STATE_VERSION;
  app: string;
  service: string;
  stages: Record<
    string,
    { providers: Record<string, { regions: Record<string, StatePartition> }> }
  >;
};

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const aggregateStateCorruptError = (location: string, cause?: unknown): StateCorruptError =>
  Object.assign(new StateCorruptError(location, cause), {
    message: lang.__('STATE_AGGREGATE_INVALID'),
  });

const corrupt = (location: string): never => {
  throw aggregateStateCorruptError(location);
};

const ownEntry = <T>(values: Record<string, T> | undefined, key: string): T | undefined =>
  values && Object.prototype.hasOwnProperty.call(values, key) ? values[key] : undefined;

export const emptyDeploymentState = (scope: DeploymentScope): StateFile => {
  const normalized = normalizeScope(scope);
  return {
    version: CURRENT_STATE_VERSION,
    provider: normalized.provider,
    app: normalized.app,
    service: normalized.service,
    scope: { stage: normalized.stage, region: normalized.region },
    stages: { [normalized.stage]: { resources: {}, shared: {} } },
    resources: {},
  };
};

export const readAggregateDocument = (
  raw: unknown,
  scope: Pick<DeploymentScope, 'app' | 'service'>,
  location: string,
): AggregateStateFile => {
  if (!record(raw)) return corrupt(location);
  if (raw.version !== AGGREGATE_STATE_VERSION) {
    throw new StateVersionError(String(raw.version ?? ''), AGGREGATE_STATE_VERSION);
  }
  if (raw.app !== scope.app || raw.service !== scope.service) {
    throw Object.assign(new StateCorruptError(location, undefined), {
      message: lang.__('STATE_SCOPED_IDENTITY_MISMATCH'),
    });
  }
  if (!record(raw.stages) || 'provider' in raw || 'resources' in raw) return corrupt(location);
  Object.entries(raw.stages).forEach(([stage, entry]) => {
    validateScopeKeyPart(stage, 'stage');
    if (!record(entry) || !record(entry.providers)) return corrupt(location);
    Object.entries(entry.providers).forEach(([provider, providerEntry]) => {
      validateScopeKeyPart(provider, 'provider');
      if (!record(providerEntry) || !record(providerEntry.regions)) return corrupt(location);
      Object.entries(providerEntry.regions).forEach(([region, partition]) => {
        validateScopeKeyPart(region, 'region');
        if (
          region !== region.toLowerCase() ||
          !record(partition) ||
          !record(partition.resources) ||
          (partition.shared !== undefined && !record(partition.shared)) ||
          ['app', 'service', 'provider', 'scope', 'version', 'stages'].some(
            (key) => key in partition,
          ) ||
          typeof partition.lineage !== 'string' ||
          partition.lineage.length === 0 ||
          !Number.isInteger(partition.serial) ||
          Number(partition.serial) < 1
        ) {
          return corrupt(location);
        }
      });
    });
  });
  return raw as AggregateStateFile;
};

export const aggregatePartition = (
  document: AggregateStateFile | null,
  scope: DeploymentScope,
): StatePartition | undefined => {
  const stage = ownEntry(document?.stages, scope.stage);
  const provider = ownEntry(stage?.providers, scope.provider);
  return ownEntry(provider?.regions, scope.region);
};

export const projectAggregateScope = (
  document: AggregateStateFile | null,
  scope: DeploymentScope,
): StateFile => {
  const normalized = normalizeScope(scope);
  const partition = aggregatePartition(document, normalized);
  const empty = emptyDeploymentState(normalized);
  if (!partition) return empty;
  const { resources, shared = {}, ...metadata } = partition;
  return {
    ...empty,
    ...metadata,
    stages: { [normalized.stage]: { resources, shared } },
    resources,
  };
};

export const assertDeploymentState = (state: StateFile, scope: DeploymentScope): void => {
  const normalized = normalizeScope(scope);
  if (state.version !== CURRENT_STATE_VERSION) {
    throw new StateVersionError(state.version, CURRENT_STATE_VERSION);
  }
  if (
    state.app !== normalized.app ||
    state.service !== normalized.service ||
    state.provider !== normalized.provider ||
    (state.scope &&
      (state.scope.stage !== normalized.stage ||
        state.scope.region.toLowerCase() !== normalized.region))
  ) {
    throw new StateScopeMismatchError(normalized, {
      app: state.app,
      service: state.service,
      provider: state.provider,
      stage: state.scope?.stage,
      region: state.scope?.region,
    });
  }
};

const METADATA_KEYS = ['orgId', 'appId', 'serviceId', 'managedBy', 'migration'] as const;

export const mergeAggregateScope = (
  document: AggregateStateFile | null,
  scope: DeploymentScope,
  state: StateFile,
  options: { preserveRevision?: boolean } = {},
): AggregateStateFile => {
  const normalized = normalizeScope(scope);
  assertDeploymentState(state, normalized);
  const previous = aggregatePartition(document, normalized);
  const metadata = Object.fromEntries(
    METADATA_KEYS.flatMap((key) => {
      const value = previous ? previous[key] : state[key];
      return value === undefined ? [] : [[key, value]];
    }),
  );
  const partition: StatePartition = {
    ...metadata,
    lineage: previous?.lineage ?? state.lineage ?? crypto.randomUUID(),
    serial: options.preserveRevision ? (state.serial ?? 1) : (previous?.serial ?? 0) + 1,
    resources: state.resources,
    shared: state.stages[normalized.stage]?.shared ?? previous?.shared ?? {},
  };
  const stages = document?.stages ?? {};
  const providers = ownEntry(stages, normalized.stage)?.providers ?? {};
  const regions = ownEntry(providers, normalized.provider)?.regions ?? {};
  return {
    ...document,
    version: AGGREGATE_STATE_VERSION,
    app: normalized.app,
    service: normalized.service,
    stages: {
      ...stages,
      [normalized.stage]: {
        providers: {
          ...providers,
          [normalized.provider]: { regions: { ...regions, [normalized.region]: partition } },
        },
      },
    },
  };
};

export const patchAggregateScope = (
  document: AggregateStateFile,
  selected: DeploymentScope,
  patch: Record<string, unknown | undefined>,
): AggregateStateFile => {
  const scope = normalizeScope(selected);
  if (
    Object.keys(patch).some((key) => !METADATA_KEYS.includes(key as (typeof METADATA_KEYS)[number]))
  ) {
    throw new Error(lang.__('STATE_PARTITION_PATCH_INVALID'));
  }
  const current = projectAggregateScope(document, scope);
  const next = mergeAggregateScope(document, scope, current);
  const partition = aggregatePartition(next, scope)!;
  const patched = Object.fromEntries(
    Object.entries({ ...partition, ...patch }).filter(([, value]) => value !== undefined),
  ) as StatePartition;
  return {
    ...next,
    stages: {
      ...next.stages,
      [scope.stage]: {
        providers: {
          ...next.stages[scope.stage].providers,
          [scope.provider]: {
            regions: {
              ...next.stages[scope.stage].providers[scope.provider].regions,
              [scope.region]: patched,
            },
          },
        },
      },
    },
  };
};

export const deploymentStateHash = (state: StateFile): string => {
  const { resources: _projection, ...persisted } = state;
  return hashSaasState(persisted as PersistedStateFile);
};

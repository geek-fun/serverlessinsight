import * as readline from 'node:readline';
import {
  getContext,
  getIacLocation,
  logger,
  setContext,
  setIac,
  toPersistedState,
  normalizeScope,
  validateScopedDocument,
  SCOPE_PROTOCOL_VERSION,
  supportsRegionalSaas,
  isRegionalSaasSnapshot,
  hashSaasState,
  type SaasStateSnapshot,
} from '../common';
import { createStateBackend } from '../common/stateBackend';
import { loadCredentials, getConsoleUrl } from '../common/credentialStore';
import { createApiClient, validateApiKey } from '../common/apiClient';
import { isMigratedToSaas } from '../common/migrationMarker';
import { StateBackendType } from '../types';
import { parseYaml, revalYaml } from '../parser';
import { lang } from '../lang';

type MigrateUploadResult = {
  provider: string;
  stateId: string;
  versionNumber: number;
  appId: string;
  serviceId: string;
  deduped: boolean;
  stageId: string;
  region: string;
  scopeProtocol: number;
};

type MigrateTargets = {
  app: { name: string; exists: boolean; id: string | null };
  service: {
    name: string;
    exists: boolean;
    id: string | null;
    provider: string | null;
    regionalScopeEnabled: boolean;
    scopeProtocol?: number;
  };
  stages: Array<{
    name: string;
    registered: boolean;
    hasState: boolean;
    latestVersion: number | null;
    contentHash: string | null;
  }>;
};

const askConfirmation = async (message: string): Promise<boolean> => {
  if (!process.stdin.isTTY) {
    throw new Error(lang.__('CONFIRMATION_STDIN_NOT_TTY'));
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
    });
  });
};

/**
 * `si migrate` — one-time migration of a legacy (local/bucket) state to the
 * Console. docs/state-migration-saas.md §4.2:
 *   preflight → source lock → pull/validate → plan → confirm → upload
 *   → read-back verify → backfill console UUIDs + write marker → unlock.
 * The marker (managedBy=saas) is a new persisted version of the source state
 * that closes the legacy backend for mutations (decision D-4). Every step is
 * re-runnable: uploads dedupe by contentHash and the marker is only written
 * after verification passes.
 */
export const migrate = async (options: {
  location: string;
  stage?: string;
  region?: string;
  provider?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
  siApiKey?: string;
  autoApprove?: boolean;
  force?: boolean;
  noMarker?: boolean;
  dryRun?: boolean;
  rollback?: boolean;
  bindUnknownRegion?: string;
}) => {
  logger.info(lang.__('VALIDATING_YAML'));
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  logger.info(lang.__('YAML_VALID'));

  await setContext(
    {
      ...options,
      app: rawIac.app,
      service: rawIac.service,
      iacProvider: rawIac.provider,
      stages: rawIac.stages,
    },
    // No live cloud probing: migrate only touches the state stores. This also
    // lets --rollback and local-backend runs work without cloud credentials.
    false,
  );

  const context = getContext();
  const iac = revalYaml(iacLocation, context);
  setIac(iac);

  // ① preflight — the source must be a legacy backend with actual state
  const backendType = iac.backend?.type ?? StateBackendType.SAAS;

  if (backendType !== StateBackendType.LOCAL && backendType !== StateBackendType.BUCKET_STORE) {
    throw new Error(lang.__('MIGRATE_NO_BACKEND_SOURCE'));
  }

  // Marker checks stay OFF on the source backend: si migrate must be able to
  // read a marked state (idempotent re-runs, --rollback).
  const sourceBackend = createStateBackend(iac.backend, { ...context, siApiKey: options.siApiKey });

  // --rollback: the explicit undo — clear the marker, legacy path reopens.
  // Purely local to the source backend, so it needs NO Console credentials.
  if (options.rollback) {
    await sourceBackend.withLock('migrate-rollback', async () => {
      const state = await sourceBackend.loadState();
      if (!isMigratedToSaas(state)) {
        logger.info(lang.__('MIGRATE_ROLLBACK_NO_MARKER'));
        return;
      }
      if (!sourceBackend.patchPersisted) {
        throw new Error(lang.__('MIGRATE_NO_BACKEND_SOURCE'));
      }
      await sourceBackend.patchPersisted({ managedBy: undefined });
      logger.info(lang.__('MIGRATE_ROLLBACK_DONE'));
      logger.info(lang.__('MIGRATE_ROLLBACK_DONE_HINT'));
    });
    return;
  }

  const creds = loadCredentials();
  const apiKey = options.siApiKey ?? creds?.apiKey;
  if (!apiKey) throw new Error(lang.__('MIGRATE_NEED_CREDENTIALS'));
  const baseUrl = getConsoleUrl();
  const identity = await validateApiKey(apiKey, baseUrl);
  const orgId = identity.orgId;
  if (iac.org && identity.orgSlug && iac.org !== identity.orgSlug) {
    throw new Error(lang.__('SAAS_ORG_MISMATCH', { declared: iac.org, actual: identity.orgSlug }));
  }
  const client = createApiClient({ apiKey, baseUrl, orgId });
  if (!supportsRegionalSaas(await client.get('/api/v1/capabilities'))) {
    throw new Error(lang.__('SAAS_REGIONAL_SCOPE_UNSUPPORTED', { consoleUrl: baseUrl }));
  }
  const scope = normalizeScope({
    provider: context.provider,
    app: iac.app,
    service: iac.service,
    stage: context.stage,
    region: context.region,
  });
  logger.info(lang.__('MIGRATE_PREFLIGHT_OK', { orgName: identity.orgName, orgId }));

  await sourceBackend.withLock('migrate', async () => {
    await sourceBackend.upgradeLegacyState?.({
      bindUnknownRegion: options.bindUnknownRegion,
      dryRun: options.dryRun,
    });
    const state = await sourceBackend.loadState();
    if (isMigratedToSaas(state)) {
      logger.warn(lang.__('MIGRATE_ALREADY_MARKED'));
      return;
    }
    if (!state.scope || state.version !== '4.0') {
      throw new Error(lang.__('MIGRATE_SOURCE_FORMAT_INVALID'));
    }
    validateScopedDocument(toPersistedState(state), scope);
    if (!options.noMarker && !sourceBackend.patchPersisted)
      throw new Error(lang.__('MIGRATE_NO_BACKEND_SOURCE'));
    if (
      Object.entries(state.stages).some(
        ([stage, entry]) =>
          stage !== scope.stage &&
          (Object.keys(entry.resources ?? {}).length > 0 ||
            Object.keys(entry.shared ?? {}).length > 0),
      )
    ) {
      throw new Error(lang.__('MIGRATE_SOURCE_MULTIPLE_SCOPES'));
    }
    const selected = state.stages[scope.stage];
    if (
      !Object.keys(selected?.resources ?? {}).length &&
      !Object.keys(selected?.shared ?? {}).length
    ) {
      throw new Error(lang.__('MIGRATE_NOTHING_TO_MIGRATE'));
    }
    const resourceCount = Object.keys(selected.resources).length;
    const targets = await client.get<MigrateTargets>(
      `/api/v1/state/migrate/targets?app_name=${encodeURIComponent(scope.app)}&service_name=${encodeURIComponent(scope.service)}&stages=${encodeURIComponent(scope.stage)}&region=${encodeURIComponent(scope.region)}&provider=${encodeURIComponent(scope.provider)}`,
    );
    if (
      targets.service.exists &&
      (targets.service.regionalScopeEnabled !== true ||
        targets.service.scopeProtocol !== SCOPE_PROTOCOL_VERSION)
    ) {
      throw new Error(lang.__('MIGRATE_TARGET_REGIONAL_REQUIRED'));
    }
    const report = targets.stages.find((entry) => entry.name === scope.stage);
    if (report?.hasState && !report.contentHash) throw new Error(lang.__('SAAS_STATE_ACK_INVALID'));
    logger.info(lang.__('MIGRATE_TARGETS_HEADER', { orgName: identity.orgName }));
    logger.info(
      targets.app.exists
        ? lang.__('MIGRATE_TARGET_APP_EXISTS', { app: scope.app, appId: targets.app.id ?? '' })
        : lang.__('MIGRATE_TARGET_APP_CREATE', { app: scope.app }),
    );
    logger.info(
      targets.service.exists
        ? lang.__('MIGRATE_TARGET_SERVICE_EXISTS', {
            service: scope.service,
            serviceId: targets.service.id ?? '',
            provider: scope.provider,
          })
        : lang.__('MIGRATE_TARGET_SERVICE_CREATE', {
            service: scope.service,
            provider: scope.provider,
          }),
    );
    logger.info(
      lang.__(
        report?.hasState
          ? 'MIGRATE_TARGET_STAGE_EXISTS'
          : report?.registered
            ? 'MIGRATE_TARGET_STAGE_EMPTY'
            : 'MIGRATE_TARGET_STAGE_NEW',
        {
          stage: `${scope.stage} / ${scope.region}`,
          count: String(resourceCount),
          version: String(report?.latestVersion ?? 1),
        },
      ),
    );
    logger.info(lang.__('MIGRATE_TARGETS_HINT'));
    if (options.dryRun) {
      logger.info(lang.__('MIGRATE_DRY_RUN_NOTICE'));
      return;
    }
    if (!options.autoApprove) {
      if (!(await askConfirmation(lang.__('MIGRATE_WRITER_CONFIRMATION')))) return;
      if (!(await askConfirmation(lang.__('MIGRATE_CONFIRMATION')))) return;
    }
    const persisted = { ...toPersistedState(state), stages: { [scope.stage]: selected }, orgId };
    const contentHash = hashSaasState(persisted);
    logger.info(lang.__('MIGRATE_UPLOADING', { stage: scope.stage }));
    const uploaded = await client.post<MigrateUploadResult>('/api/v1/state/migrate', {
      appName: scope.app,
      serviceName: scope.service,
      provider: scope.provider,
      stage: scope.stage,
      region: scope.region,
      scopeProtocol: SCOPE_PROTOCOL_VERSION,
      baseContentHash: report?.contentHash ?? '',
      stateJson: persisted,
      contentHash,
      resourceCount,
      origin: backendType === StateBackendType.LOCAL ? 'local' : 'bucket',
      conflict: options.force ? 'overwrite' : 'reject',
    });
    const remote = await client.get<SaasStateSnapshot & { resourceCount: number | null }>(
      `/api/v1/apps/${uploaded.appId}/services/${uploaded.serviceId}/state/current?stage=${encodeURIComponent(scope.stage)}&region=${encodeURIComponent(scope.region)}&provider=${encodeURIComponent(scope.provider)}`,
    );
    if (
      !isRegionalSaasSnapshot(remote, scope) ||
      remote.serviceId !== uploaded.serviceId ||
      remote.id !== uploaded.stateId ||
      remote.stageId !== uploaded.stageId ||
      uploaded.scopeProtocol !== SCOPE_PROTOCOL_VERSION ||
      uploaded.provider !== scope.provider ||
      uploaded.region !== scope.region ||
      remote.contentHash !== contentHash ||
      remote.versionNumber !== uploaded.versionNumber ||
      (!uploaded.deduped && remote.resourceCount !== resourceCount)
    ) {
      throw new Error(lang.__('MIGRATE_VERIFY_FAILED', { stage: scope.stage }));
    }
    validateScopedDocument(remote.stateJson, scope);
    logger.info(
      lang.__('MIGRATE_UPLOADED', {
        stage: scope.stage,
        version: String(uploaded.versionNumber),
        deduped: uploaded.deduped ? lang.__('MIGRATE_UPLOADED_DEDUPLICATED') : '',
        appId: uploaded.appId,
        serviceId: uploaded.serviceId,
      }),
    );
    if (options.noMarker) {
      logger.warn(lang.__('MIGRATE_MARKER_SKIPPED'));
    } else {
      await sourceBackend.patchPersisted!({
        orgId,
        appId: uploaded.appId,
        serviceId: uploaded.serviceId,
        managedBy: 'saas',
      });
      logger.info(lang.__('MIGRATE_MARKER_WRITTEN'));
    }
    logger.info(lang.__('MIGRATE_CUTOVER_STEPS'));
  });
};

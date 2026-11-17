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
import { resolveLineContext } from '../common/lineContext';
import { assertValidatedOrg, assertValidatedRegion } from '../common/consoleLines';
import { createApiClient, validateApiKey } from '../common/apiClient';
import { isMigratedToSaas, MANAGED_BY_SAAS } from '../common/migrationMarker';
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
 * Each verified source partition receives a managedBy marker in one aggregate
 * write. A retry can deduplicate uploads by contentHash.
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
  org?: string;
  line?: string;
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

  // Migration needs to inspect marked partitions for retries and rollback.
  const sourceBackend = await createStateBackend(iac.backend, {
    ...context,
    siApiKey: options.siApiKey,
  });

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

  const { loadMigrationStates } = sourceBackend;
  const markMigrated = options.noMarker ? undefined : sourceBackend.patchPersisted;
  if (!loadMigrationStates || (!options.noMarker && !markMigrated)) {
    throw new Error(lang.__('MIGRATE_NO_BACKEND_SOURCE'));
  }

  // ADR-008: one resolution entry for line + key + org identity.
  const lineCtx = await resolveLineContext({
    siApiKey: options.siApiKey,
    declaredOrg: iac.org,
    orgFlag: options.org,
    lineFlag: options.line,
    operation: 'migrate',
  });
  const { apiKey, consoleUrl: baseUrl } = lineCtx;
  const identity = await validateApiKey(apiKey, baseUrl);
  assertValidatedRegion(lineCtx.line, identity.region);
  assertValidatedOrg(iac.org ?? options.org, identity.orgSlug);
  const orgId = identity.orgId;
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
    const allStages = !options.stage?.trim();
    const sourceStates = await loadMigrationStates(allStages);
    const snapshots = sourceStates
      .filter((state) => !isMigratedToSaas(state))
      .flatMap((state) => {
        if (!state.scope || state.version !== '4.0') {
          throw new Error(lang.__('MIGRATE_SOURCE_FORMAT_INVALID'));
        }
        const { stage } = state.scope;
        const entry = state.stages[stage];
        const resourceCount = Object.keys(entry?.resources ?? {}).length;
        if (!resourceCount && !Object.keys(entry?.shared ?? {}).length) return [];

        const persisted = { ...toPersistedState(state), orgId };
        validateScopedDocument(persisted, allStages ? { ...scope, stage } : scope);
        return [{ stage, persisted, resourceCount }];
      });
    if (!snapshots.length) {
      if (sourceStates.some(isMigratedToSaas)) {
        logger.warn(lang.__('MIGRATE_ALREADY_MARKED'));
        return;
      }
      throw new Error(lang.__('MIGRATE_NOTHING_TO_MIGRATE'));
    }

    // Each stage has its own CAS base and snapshot.
    type StagePlan = (typeof snapshots)[number] & {
      targets: MigrateTargets;
      report: MigrateTargets['stages'][number] | undefined;
      contentHash: string;
    };
    const plans: StagePlan[] = [];
    for (const snapshot of snapshots) {
      const { stage, persisted } = snapshot;
      const targets = await client.get<MigrateTargets>(
        `/api/v1/state/migrate/targets?app_name=${encodeURIComponent(scope.app)}&service_name=${encodeURIComponent(scope.service)}&stages=${encodeURIComponent(stage)}&region=${encodeURIComponent(scope.region)}&provider=${encodeURIComponent(scope.provider)}`,
      );
      if (
        targets.service.exists &&
        (targets.service.regionalScopeEnabled !== true ||
          targets.service.scopeProtocol !== SCOPE_PROTOCOL_VERSION)
      ) {
        throw new Error(lang.__('MIGRATE_TARGET_REGIONAL_REQUIRED'));
      }
      const report = targets.stages.find((stageReport) => stageReport.name === stage);
      if (report?.hasState && !report.contentHash)
        throw new Error(lang.__('SAAS_STATE_ACK_INVALID'));
      plans.push({ ...snapshot, targets, report, contentHash: hashSaasState(persisted) });
    }

    const first = plans[0]!.targets;
    logger.info(lang.__('MIGRATE_TARGETS_HEADER', { orgName: identity.orgName }));
    logger.info(
      first.app.exists
        ? lang.__('MIGRATE_TARGET_APP_EXISTS', { app: scope.app, appId: first.app.id ?? '' })
        : lang.__('MIGRATE_TARGET_APP_CREATE', { app: scope.app }),
    );
    logger.info(
      first.service.exists
        ? lang.__('MIGRATE_TARGET_SERVICE_EXISTS', {
            service: scope.service,
            serviceId: first.service.id ?? '',
            provider: scope.provider,
          })
        : lang.__('MIGRATE_TARGET_SERVICE_CREATE', {
            service: scope.service,
            provider: scope.provider,
          }),
    );
    for (const plan of plans) {
      const report = plan.report;
      logger.info(
        lang.__(
          report?.hasState
            ? 'MIGRATE_TARGET_STAGE_EXISTS'
            : report?.registered
              ? 'MIGRATE_TARGET_STAGE_EMPTY'
              : 'MIGRATE_TARGET_STAGE_NEW',
          {
            stage: `${plan.stage} / ${scope.region}`,
            count: String(plan.resourceCount),
            version: String(report?.latestVersion ?? 1),
          },
        ),
      );
    }
    logger.info(lang.__('MIGRATE_TARGETS_HINT'));
    if (options.dryRun) {
      logger.info(lang.__('MIGRATE_DRY_RUN_NOTICE'));
      return;
    }
    if (!options.autoApprove) {
      if (!(await askConfirmation(lang.__('MIGRATE_WRITER_CONFIRMATION')))) return;
      if (!(await askConfirmation(lang.__('MIGRATE_CONFIRMATION')))) return;
    }
    let appId = '';
    let serviceId = '';
    for (const plan of plans) {
      logger.info(lang.__('MIGRATE_UPLOADING', { stage: plan.stage }));
      const uploaded = await client.post<MigrateUploadResult>('/api/v1/state/migrate', {
        appName: scope.app,
        serviceName: scope.service,
        provider: scope.provider,
        stage: plan.stage,
        region: scope.region,
        scopeProtocol: SCOPE_PROTOCOL_VERSION,
        baseContentHash: plan.report?.contentHash ?? '',
        stateJson: plan.persisted,
        contentHash: plan.contentHash,
        resourceCount: plan.resourceCount,
        origin: backendType === StateBackendType.LOCAL ? 'local' : 'bucket',
        conflict: options.force ? 'overwrite' : 'reject',
      });
      if (
        !uploaded?.appId ||
        !uploaded.serviceId ||
        (appId && (uploaded.appId !== appId || uploaded.serviceId !== serviceId))
      ) {
        throw new Error(lang.__('MIGRATE_VERIFY_FAILED', { stage: plan.stage }));
      }
      const remote = await client.get<SaasStateSnapshot & { resourceCount: number | null }>(
        `/api/v1/apps/${uploaded.appId}/services/${uploaded.serviceId}/state/current?stage=${encodeURIComponent(plan.stage)}&region=${encodeURIComponent(scope.region)}&provider=${encodeURIComponent(scope.provider)}`,
      );
      if (
        !isRegionalSaasSnapshot(remote, { ...scope, stage: plan.stage }) ||
        remote.serviceId !== uploaded.serviceId ||
        remote.id !== uploaded.stateId ||
        remote.stageId !== uploaded.stageId ||
        uploaded.scopeProtocol !== SCOPE_PROTOCOL_VERSION ||
        uploaded.provider !== scope.provider ||
        uploaded.region !== scope.region ||
        remote.contentHash !== plan.contentHash ||
        remote.versionNumber !== uploaded.versionNumber ||
        (!uploaded.deduped && remote.resourceCount !== plan.resourceCount)
      ) {
        throw new Error(lang.__('MIGRATE_VERIFY_FAILED', { stage: plan.stage }));
      }
      validateScopedDocument(remote.stateJson, { ...scope, stage: plan.stage });
      appId = uploaded.appId;
      serviceId = uploaded.serviceId;
      logger.info(
        lang.__('MIGRATE_UPLOADED', {
          stage: plan.stage,
          version: String(uploaded.versionNumber),
          deduped: uploaded.deduped ? lang.__('MIGRATE_UPLOADED_DEDUPLICATED') : '',
          appId: uploaded.appId,
          serviceId: uploaded.serviceId,
        }),
      );
    }
    if (!markMigrated) {
      logger.warn(lang.__('MIGRATE_MARKER_SKIPPED'));
    } else {
      await markMigrated(
        { orgId, appId, serviceId, managedBy: MANAGED_BY_SAAS },
        plans.map(({ stage }) => stage),
      );
      logger.info(lang.__('MIGRATE_MARKER_WRITTEN'));
    }
    logger.info(lang.__('MIGRATE_CUTOVER_STEPS'));
  });
};

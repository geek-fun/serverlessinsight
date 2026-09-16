import * as readline from 'node:readline';
import crypto from 'node:crypto';
import {
  getContext,
  getIacLocation,
  logger,
  setContext,
  setIac,
  toPersistedState,
} from '../common';
import { createStateBackend } from '../common/stateBackend';
import { loadCredentials, getConsoleUrl } from '../common/credentialStore';
import { createApiClient, validateApiKey, ApiError } from '../common/apiClient';
import { isMigratedToSaas } from '../common/migrationMarker';
import { StateBackendType } from '../types';
import { parseYaml, revalYaml } from '../parser';
import { lang } from '../lang';

export type MigrateUploadResult = {
  stateId: string;
  versionNumber: number;
  appId: string;
  serviceId: string;
  deduped: boolean;
};

export type MigrateStageResult = MigrateUploadResult & { stage: string };

type MigrateTargets = {
  app: { name: string; exists: boolean; id: string | null };
  service: { name: string; exists: boolean; id: string | null; provider: string | null };
  stages: Array<{
    name: string;
    registered: boolean;
    hasState: boolean;
    latestVersion: number | null;
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
      const state = await sourceBackend.loadState(
        iac.provider.name,
        iac.app,
        iac.service,
        options.stage ?? 'default',
      );
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
  if (!apiKey) {
    throw new Error(lang.__('MIGRATE_NEED_CREDENTIALS'));
  }
  const baseUrl = getConsoleUrl();
  const identity = await validateApiKey(apiKey, baseUrl);
  const orgId = identity.orgId;
  logger.info(lang.__('MIGRATE_PREFLIGHT_OK', { orgName: identity.orgName, orgId }));
  const client = createApiClient({ apiKey, baseUrl, orgId });

  await sourceBackend.withLock('migrate', async () => {
    // ③ pull + normalize (loadState applies registered state migrations)
    const hydrateStage = options.stage ?? Object.keys(iac.stages ?? {})[0] ?? 'default';
    const state = await sourceBackend.loadState(
      iac.provider.name,
      iac.app,
      iac.service,
      hydrateStage,
    );
    if (isMigratedToSaas(state)) {
      logger.warn(lang.__('MIGRATE_ALREADY_MARKED'));
    }
    if (state.provider && state.provider !== iac.provider.name) {
      throw new Error(
        lang.__('MIGRATE_PROVIDER_MISMATCH', {
          stateProvider: state.provider,
          ymlProvider: iac.provider.name,
        }),
      );
    }

    // ④ mapping plan — only stages holding deployed resources migrate
    const allStageKeys = Object.keys(state.stages ?? {});
    if (options.stage && !allStageKeys.includes(options.stage)) {
      throw new Error(lang.__('MIGRATE_STAGE_NOT_FOUND', { stage: options.stage }));
    }
    const stageKeys = (options.stage ? [options.stage] : allStageKeys).filter(
      (stageKey) => Object.keys(state.stages?.[stageKey]?.resources ?? {}).length > 0,
    );
    if (stageKeys.length === 0) {
      throw new Error(lang.__('MIGRATE_NOTHING_TO_MIGRATE'));
    }

    // ④ mapping plan — resolve which Console targets already exist (mapped by
    // name) and which would be auto-created, so the dry-run/confirm screen
    // keeps the user in control of the destination (pre-create in Console to
    // adopt existing apps/services/membership settings).
    const targets = await client.get<MigrateTargets>(
      `/api/v1/state/migrate/targets?app_name=${encodeURIComponent(iac.app)}&service_name=${encodeURIComponent(iac.service)}&stages=${encodeURIComponent(stageKeys.join(','))}`,
    );

    logger.info(lang.__('MIGRATE_TARGETS_HEADER', { orgName: identity.orgName }));
    if (targets.app.exists) {
      logger.info(
        lang.__('MIGRATE_TARGET_APP_EXISTS', {
          app: targets.app.name,
          appId: targets.app.id ?? '',
        }),
      );
    } else {
      logger.info(lang.__('MIGRATE_TARGET_APP_CREATE', { app: targets.app.name }));
    }
    if (targets.service.exists) {
      if (targets.service.provider && targets.service.provider !== iac.provider.name) {
        throw new Error(
          lang.__('MIGRATE_PROVIDER_MISMATCH_TARGET', {
            service: iac.service,
            existingProvider: targets.service.provider,
            ymlProvider: iac.provider.name,
          }),
        );
      }
      logger.info(
        lang.__('MIGRATE_TARGET_SERVICE_EXISTS', {
          service: targets.service.name,
          serviceId: targets.service.id ?? '',
          provider: targets.service.provider ?? '',
        }),
      );
    } else {
      logger.info(
        lang.__('MIGRATE_TARGET_SERVICE_CREATE', {
          service: targets.service.name,
          provider: iac.provider.name,
        }),
      );
    }
    for (const stageKey of stageKeys) {
      const count = String(Object.keys(state.stages?.[stageKey]?.resources ?? {}).length);
      const report = targets.stages.find((s) => s.name === stageKey);
      if (report?.hasState) {
        logger.info(
          lang.__('MIGRATE_TARGET_STAGE_EXISTS', {
            stage: stageKey,
            count,
            version: String(report.latestVersion ?? 1),
          }),
        );
      } else if (report?.registered) {
        logger.info(lang.__('MIGRATE_TARGET_STAGE_EMPTY', { stage: stageKey, count }));
      } else {
        logger.info(lang.__('MIGRATE_TARGET_STAGE_NEW', { stage: stageKey, count }));
      }
    }
    logger.info(lang.__('MIGRATE_TARGETS_HINT'));

    if (options.dryRun) {
      logger.info(lang.__('MIGRATE_DRY_RUN_NOTICE'));
      return;
    }

    // ⑤ confirm — the writer-upgrade question is the §4.5 runbook gate
    if (!options.autoApprove) {
      if (!(await askConfirmation(lang.__('MIGRATE_WRITER_CONFIRMATION')))) {
        return;
      }
      if (!(await askConfirmation(lang.__('MIGRATE_CONFIRMATION')))) {
        return;
      }
    }

    // ⑥ upload — same full-persisted-state contract as the SaaS backend save.
    // The imported version carries the owning org id immediately (D-6 identity
    // anchor), so the first post-cutover loadState can verify it without
    // waiting for a fresh deploy save.
    const persisted = { ...toPersistedState(state), orgId };
    const contentHash = crypto.createHash('sha256').update(JSON.stringify(persisted)).digest('hex');

    const results: MigrateStageResult[] = [];
    for (const stageKey of stageKeys) {
      logger.info(lang.__('MIGRATE_UPLOADING', { stage: stageKey }));
      const resourceCount = Object.keys(state.stages?.[stageKey]?.resources ?? {}).length;

      let uploadResult: MigrateUploadResult;
      try {
        uploadResult = await client.post<MigrateUploadResult>('/api/v1/state/migrate', {
          appName: iac.app,
          serviceName: iac.service,
          provider: iac.provider.name,
          stage: stageKey,
          stateJson: persisted,
          contentHash,
          resourceCount,
          origin: backendType === StateBackendType.LOCAL ? 'local' : 'bucket',
          conflict: options.force ? 'overwrite' : 'reject',
        });
      } catch (error) {
        if (error instanceof ApiError && error.status === 409) {
          throw new Error(lang.__('MIGRATE_CONFLICT'), { cause: error });
        }
        throw error;
      }

      // ⑦ read-back verification — the stored version must be ours. The server
      // echoes the hash it stored, so no JSON re-serialization is involved
      // (Postgres jsonb would reorder keys and break a naive string compare).
      const remote = await client.get<{
        contentHash: string;
        resourceCount: number | null;
        versionNumber: number;
      }>(
        `/api/v1/apps/${uploadResult.appId}/services/${uploadResult.serviceId}/state/current?stage=${encodeURIComponent(stageKey)}`,
      );
      const verified =
        remote.contentHash === contentHash &&
        remote.versionNumber === uploadResult.versionNumber &&
        (uploadResult.deduped || remote.resourceCount === resourceCount);
      if (!verified) {
        throw new Error(lang.__('MIGRATE_VERIFY_FAILED', { stage: stageKey }));
      }

      results.push({ stage: stageKey, ...uploadResult });
      logger.info(
        lang.__('MIGRATE_UPLOADED', {
          stage: stageKey,
          version: String(uploadResult.versionNumber),
          deduped: uploadResult.deduped ? lang.__('MIGRATE_UPLOADED_DEDUPLICATED') : '',
          appId: uploadResult.appId,
          serviceId: uploadResult.serviceId,
        }),
      );
    }

    // ⑧⑨ backfill console UUIDs + write the migration marker as one new
    // persisted version. Only reached when every stage verified.
    const first = results[0]!;
    if (options.noMarker) {
      logger.warn(lang.__('MIGRATE_MARKER_SKIPPED'));
    } else {
      if (!sourceBackend.patchPersisted) {
        throw new Error(lang.__('MIGRATE_NO_BACKEND_SOURCE'));
      }
      await sourceBackend.patchPersisted({
        orgId,
        appId: first.appId,
        serviceId: first.serviceId,
        managedBy: 'saas',
      });
      logger.info(lang.__('MIGRATE_MARKER_WRITTEN'));
    }

    logger.info(lang.__('MIGRATE_CUTOVER_STEPS'));
  });
};

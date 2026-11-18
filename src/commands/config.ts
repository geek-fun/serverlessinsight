import * as fs from 'node:fs';
import * as path from 'node:path';
import * as readline from 'node:readline';
import { parseYaml } from '../parser';
import { getContext, setContext, getIacLocation, logger } from '../common';
import { lang } from '../lang';
import { normalizeScope } from '../common/stateScope';
import { createConfigClient, resolveTargetIds, type ConfigClient } from '../common/configClient';

/**
 * `si config` command group (epic #53 P1) — reads/writes config sets in SI
 * SaaS. Plaintexts are write-only from the CLI: values enter through a hidden
 * prompt or `--stdin`, and existing secret values stay server-side (per-key
 * merges happen server-side), so viewing plaintexts stays a Console action.
 */

type ConfigCommandOptions = {
  location?: string;
  stage?: string;
  region?: string;
  provider?: string;
  siApiKey?: string;
  org?: string;
  line?: string;
};

const yamlScope = async (options: ConfigCommandOptions) => {
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  await setContext({
    stage: options.stage,
    app: rawIac.app,
    service: rawIac.service,
    location: options.location,
    provider: options.provider,
    region: options.region,
    iacProvider: rawIac.provider,
    stages: rawIac.stages,
  });
  const context = getContext();
  const scope = normalizeScope({
    provider: context.provider,
    app: rawIac.app,
    service: rawIac.service,
    stage: context.stage,
    region: context.region,
  });
  return { rawIac, scope };
};

const promptHiddenValue = async (): Promise<string> => {
  // Hidden input without writing the value to shell history (issue #53 P1 —
  // `--value` is deliberately unsupported). `_writeToOutput` suppression keeps
  // typed characters off the terminal.
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stderr,
    terminal: true,
  });
  (rl as unknown as { _writeToOutput?: (text: string) => void })._writeToOutput = (
    text: string,
  ) => {
    if (text.includes('\n') || text.includes('\r')) {
      (rl as unknown as { output: { write: (t: string) => void } }).output.write(text);
    }
  };
  const value: string = await new Promise((resolve) => {
    rl.question(lang.__('CONFIG_SET_VALUE_PROMPT'), (answer) => resolve(answer));
  });
  (rl as unknown as { output: { write: (t: string) => void } }).output.write('\n');
  rl.close();
  return value;
};

const readStdinValue = async (): Promise<string> => {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks).toString('utf-8').trimEnd();
};

const clientFor = async (
  options: ConfigCommandOptions,
  declaredOrg?: string,
): Promise<ConfigClient> =>
  createConfigClient({
    siApiKey: options.siApiKey,
    declaredOrg,
    org: options.org,
    line: options.line,
    operation: 'config management',
  });

type ConfigSetRecord = {
  id: string;
  name: string;
  scope: string;
  stage: string | null;
  updatedAt: string;
};

type ConfigSetDetail = {
  configSet: ConfigSetRecord;
  versions: Array<{
    versionNumber: number;
    tags: string[];
    items: Array<{ key: string; value: string; type: string; description?: string }>;
  }>;
};

export const configList = async (options: ConfigCommandOptions): Promise<void> => {
  const { rawIac, scope } = await yamlScope(options);
  const configClient = await clientFor(options, rawIac.org);
  const { appId } = await resolveTargetIds(configClient, scope);
  if (!appId) {
    logger.info(lang.__('CONFIG_LIST_NO_APP', { app: scope.app }));
    return;
  }
  const sets = await configClient.client.get<
    Array<{ id: string; name: string; scope: string; stage: string | null; updatedAt: string }>
  >(`/api/v1/config-sets?appId=${appId}`);
  if (sets.length === 0) {
    logger.info(lang.__('CONFIG_LIST_EMPTY'));
    return;
  }
  for (const set of sets) {
    logger.info(
      lang.__('CONFIG_LIST_ROW', {
        name: set.name,
        scope: set.scope,
        stage: set.stage ?? '-',
        updated: set.updatedAt,
      }),
    );
  }
};

export const configSet = async (
  nameAndKey: string,
  options: ConfigCommandOptions & { type?: string; stdin?: boolean; description?: string },
): Promise<void> => {
  const dot = nameAndKey.indexOf('.');
  if (dot <= 0 || dot === nameAndKey.length - 1) {
    throw new Error(lang.__('CONFIG_SET_REF_INVALID', { ref: nameAndKey }));
  }
  const setName = nameAndKey.slice(0, dot);
  const itemKey = nameAndKey.slice(dot + 1);
  if (itemKey.includes('.')) {
    throw new Error(lang.__('CONFIG_SET_REF_INVALID', { ref: nameAndKey }));
  }

  const { rawIac, scope } = await yamlScope(options);
  const configClient = await clientFor(options, rawIac.org);
  const { appId, serviceId } = await resolveTargetIds(configClient, scope);
  if (!appId) throw new Error(lang.__('CONFIG_LIST_NO_APP', { app: scope.app }));

  const type = (options.type ?? 'string').toLowerCase();
  const value = options.stdin ? await readStdinValue() : await promptHiddenValue();
  if (!value) throw new Error(lang.__('CONFIG_SET_VALUE_EMPTY'));

  const existing = await configClient.client.get<
    Array<{ id: string; name: string; scope: string }>
  >(`/api/v1/config-sets?appId=${appId}`);
  const target = existing.find((set) => set.name === setName);

  if (target) {
    await configClient.client.put(`/api/v1/config-sets/${target.id}`, {
      items: [{ key: itemKey, value, type }],
      mergeWithLatest: true,
      changeSummary: `si config set ${nameAndKey}`,
    });
    logger.info(lang.__('CONFIG_SET_MERGED', { ref: nameAndKey, name: setName }));
    return;
  }

  // Fresh set: --stage selects stage scope, otherwise service scope (both
  // need the yaml service — org-scope sets are a Console action by design).
  if (!serviceId) {
    throw new Error(lang.__('CONFIG_SET_NO_SERVICE', { app: scope.app, service: scope.service }));
  }
  const scopeKind = options.stage ? 'stage' : 'service';
  const created = await configClient.client.post<{ id: string; name: string }>(
    '/api/v1/config-sets',
    {
      name: setName,
      scope: scopeKind,
      appId,
      serviceId,
      ...(options.stage ? { stage: options.stage } : {}),
      items: [
        {
          key: itemKey,
          value,
          type,
          ...(options.description ? { description: options.description } : {}),
        },
      ],
      changeSummary: 'si config set (initial)',
    },
  );
  logger.info(lang.__('CONFIG_SET_CREATED', { name: created.name, scope: scopeKind }));
};

export const configVersions = async (
  name: string,
  options: ConfigCommandOptions,
): Promise<void> => {
  const { rawIac, scope } = await yamlScope(options);
  const configClient = await clientFor(options, rawIac.org);
  const { appId } = await resolveTargetIds(configClient, scope);
  if (!appId) throw new Error(lang.__('CONFIG_LIST_NO_APP', { app: scope.app }));
  const sets = await configClient.client.get<Array<{ id: string; name: string }>>(
    `/api/v1/config-sets?appId=${appId}`,
  );
  const target = sets.find((set) => set.name === name);
  if (!target) throw new Error(lang.__('CONFIG_SET_NOT_FOUND', { name }));

  const detail = await configClient.client.get<ConfigSetDetail>(`/api/v1/config-sets/${target.id}`);
  for (const version of detail.versions) {
    logger.info(
      lang.__('CONFIG_VERSIONS_ROW', {
        version: String(version.versionNumber),
        tags: version.tags?.join(', ') ?? '-',
        items: String(version.items?.length ?? 0),
      }),
    );
  }
};

export const configRelease = async (
  name: string,
  options: ConfigCommandOptions & { version?: number },
): Promise<void> => {
  const { rawIac, scope } = await yamlScope(options);
  const configClient = await clientFor(options, rawIac.org);
  const { appId } = await resolveTargetIds(configClient, scope);
  if (!appId) throw new Error(lang.__('CONFIG_LIST_NO_APP', { app: scope.app }));
  const sets = await configClient.client.get<Array<{ id: string; name: string }>>(
    `/api/v1/config-sets?appId=${appId}`,
  );
  const target = sets.find((set) => set.name === name);
  if (!target) throw new Error(lang.__('CONFIG_SET_NOT_FOUND', { name }));

  const detail = await configClient.client.get<ConfigSetDetail>(`/api/v1/config-sets/${target.id}`);
  const latest = detail.versions.find((version) => version.tags?.includes('latest'));
  const targetVersion = options.version ?? latest?.versionNumber;
  if (!targetVersion) throw new Error(lang.__('CONFIG_SET_NOT_FOUND', { name }));
  if (!options.version) {
    logger.warn(lang.__('CONFIG_RELEASE_ALREADY_LATEST', { name, version: String(targetVersion) }));
    return;
  }
  // Moving the `latest` tag IS the release/rollback (issue #53 P1) — the next
  // resolve/runtime fetch picks it up without redeploying.
  await configClient.client.post(`/api/v1/config-sets/${target.id}/tag`, {
    versionNumber: targetVersion,
    tag: 'latest',
  });
  logger.info(lang.__('CONFIG_RELEASED', { name, version: String(targetVersion) }));
};

export const configTag = async (
  name: string,
  options: ConfigCommandOptions & { version: number; tag: string },
): Promise<void> => {
  const { rawIac, scope } = await yamlScope(options);
  const configClient = await clientFor(options, rawIac.org);
  const { appId } = await resolveTargetIds(configClient, scope);
  if (!appId) throw new Error(lang.__('CONFIG_LIST_NO_APP', { app: scope.app }));
  const sets = await configClient.client.get<Array<{ id: string; name: string }>>(
    `/api/v1/config-sets?appId=${appId}`,
  );
  const target = sets.find((set) => set.name === name);
  if (!target) throw new Error(lang.__('CONFIG_SET_NOT_FOUND', { name }));
  await configClient.client.post(`/api/v1/config-sets/${target.id}/tag`, {
    versionNumber: options.version,
    tag: options.tag,
  });
  logger.info(
    lang.__('CONFIG_TAGGED', { name, version: String(options.version), tag: options.tag }),
  );
};

export const configDelete = async (
  nameAndKey: string,
  options: ConfigCommandOptions,
): Promise<void> => {
  const dot = nameAndKey.indexOf('.');
  if (dot <= 0 || dot === nameAndKey.length - 1) {
    throw new Error(lang.__('CONFIG_SET_REF_INVALID', { ref: nameAndKey }));
  }
  const setName = nameAndKey.slice(0, dot);
  const itemKey = nameAndKey.slice(dot + 1);
  const { rawIac, scope } = await yamlScope(options);
  const configClient = await clientFor(options, rawIac.org);
  const { appId } = await resolveTargetIds(configClient, scope);
  if (!appId) throw new Error(lang.__('CONFIG_LIST_NO_APP', { app: scope.app }));
  const sets = await configClient.client.get<Array<{ id: string; name: string }>>(
    `/api/v1/config-sets?appId=${appId}`,
  );
  const target = sets.find((set) => set.name === setName);
  if (!target) throw new Error(lang.__('CONFIG_SET_NOT_FOUND', { name: setName }));
  await configClient.client.put(`/api/v1/config-sets/${target.id}`, {
    items: [],
    mergeWithLatest: true,
    removeKeys: [itemKey],
    changeSummary: `si config delete ${nameAndKey}`,
  });
  logger.info(lang.__('CONFIG_KEY_DELETED', { ref: nameAndKey }));
};

/** `si local` companion (epic #53 P2): write the merged snapshot the runtime
 * SDK reads in local mode. */
export const writeLocalConfigSnapshot = async (
  snapshot: {
    stage: string;
    snapshotVersion: number;
    entries: Array<{ key: string; value: string; secret: boolean; source?: unknown }>;
  },
  projectDir = process.cwd(),
): Promise<string> => {
  const dir = path.join(projectDir, '.serverlessinsight');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'local-config.json');
  fs.writeFileSync(file, JSON.stringify(snapshot, null, 2));
  return file;
};

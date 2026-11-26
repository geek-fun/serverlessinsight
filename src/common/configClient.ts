import { resolveLineContext } from './lineContext';
import { createApiClient, validateApiKey, type ApiClient } from './apiClient';
import { assertValidatedOrg, assertValidatedRegion } from './consoleLines';
import { normalizeScope } from './stateScope';
import { lang } from '../lang';
import type { ResolvedConfigValue } from './configSession';

type ResolvedValueScope = ResolvedConfigValue['scope'];

/**
 * SI SaaS client surface for Config & Secrets (epic #53 P1/P2). Every call
 * routes through the ADR-008 line-context resolution — the same entry deploy
 * uses — so org/line/key precedence stays identical.
 */

export type ConfigResolveItem = {
  ref: string;
  value: string;
  /** Whole-field sensitive when true — the sanitization pipeline masks it. */
  secret: boolean;
  source: { configSetId: string; name: string; versionNumber: number; scope: string };
};

export type ConfigResolveResponse = {
  items: ConfigResolveItem[];
  missing: Array<{ ref: string; reason: string }>;
};

export type ConfigClient = {
  readonly client: ApiClient;
  readonly consoleUrl: string;
  readonly orgId: string;
};

export const createConfigClient = async (options: {
  siApiKey?: string;
  declaredOrg?: string;
  org?: string;
  line?: string;
  operation: string;
}): Promise<ConfigClient> => {
  const lineCtx = await resolveLineContext({
    siApiKey: options.siApiKey,
    declaredOrg: options.declaredOrg,
    orgFlag: options.org,
    lineFlag: options.line,
    operation: options.operation,
  });
  const identity = await validateApiKey(lineCtx.apiKey, lineCtx.consoleUrl);
  assertValidatedRegion(lineCtx.line, identity.region);
  assertValidatedOrg(options.declaredOrg ?? options.org, identity.orgSlug);
  const client = createApiClient({
    apiKey: lineCtx.apiKey,
    baseUrl: lineCtx.consoleUrl,
    orgId: identity.orgId,
  });
  return { client, consoleUrl: lineCtx.consoleUrl, orgId: identity.orgId };
};

/** Resolve app/service ids for the yaml context without creating anything. */
export const resolveTargetIds = async (
  configClient: ConfigClient,
  scope: { app: string; service: string; stage: string; region: string; provider: string },
): Promise<{ appId: string | null; serviceId: string | null }> => {
  const targets = await configClient.client.get<{
    app: { exists: boolean; id: string | null };
    service: { exists: boolean; id: string | null };
  }>(
    `/api/v1/state/migrate/targets?app_name=${encodeURIComponent(scope.app)}&service_name=${encodeURIComponent(
      scope.service,
    )}&stages=${encodeURIComponent(scope.stage)}&region=${encodeURIComponent(scope.region)}&provider=${encodeURIComponent(
      scope.provider,
    )}`,
  );
  return {
    appId: targets.app.exists ? targets.app.id : null,
    serviceId: targets.service.exists ? targets.service.id : null,
  };
};

/**
 * Batch resolve refs for one deploy/diff/local run (issue #53 P1). Resolves
 * appId/serviceId when deployment scope is given so org-scoped API keys walk
 * the full stage → service → app → org cascade. Fails closed listing every
 * missing or unauthorized ref together with the scopes that were searched.
 */
export const resolveConfigRefsViaSaas = async (
  refs: string[],
  options: {
    stage: string;
    app?: string;
    service?: string;
    provider?: string;
    region?: string;
    siApiKey?: string;
    declaredOrg?: string;
    org?: string;
    line?: string;
  },
): Promise<Map<string, ResolvedConfigValue>> => {
  const configClient = await createConfigClient({
    siApiKey: options.siApiKey,
    declaredOrg: options.declaredOrg,
    org: options.org,
    line: options.line,
    operation: 'config resolution',
  });
  let targetIds: { appId: string | null; serviceId: string | null } = {
    appId: null,
    serviceId: null,
  };
  if (options.app && options.service && options.provider && options.region) {
    targetIds = await resolveTargetIds(
      configClient,
      normalizeScope({
        app: options.app,
        service: options.service,
        stage: options.stage,
        provider: options.provider,
        region: options.region,
      }),
    );
  }
  const response = await configClient.client.post<ConfigResolveResponse>(
    '/api/v1/config-sets/resolve',
    {
      refs,
      stage: options.stage,
      ...(targetIds.appId ? { appId: targetIds.appId } : {}),
      ...(targetIds.serviceId ? { serviceId: targetIds.serviceId } : {}),
    },
  );
  const resolved = new Map<string, ResolvedConfigValue>();
  for (const item of response.items ?? []) {
    resolved.set(item.ref, {
      value: item.value,
      versionNumber: item.source.versionNumber,
      secret: item.secret === true,
      scope: item.source.scope as ResolvedValueScope,
      configSet: item.source.name,
    });
  }
  if ((response.missing ?? []).length > 0) {
    const list = response.missing.map((m) => `${m.ref}: ${m.reason}`).join('\n  ');
    throw new Error(
      lang.__('CONFIG_ITEM_NOT_FOUND', { refs: list, scopes: 'stage, service, app, org' }),
    );
  }
  return resolved;
};

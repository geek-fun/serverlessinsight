import { buildTencentHttpTriggerDesc, mapAuthType, mapAccess } from '../../common/triggerMapper';
import { buildFunctionHttpTriggerName } from '../../common/nameBuilder';
import { buildSid } from '../../common/sidUtils';
import { remoteDiffersFromDesired } from '../../common/planCompare';
import { createTencentClient } from '../../common/tencentClient';
import { lang } from '../../lang';
import type { Context, FunctionDomain, ResourceAttributes, ResourceInstance } from '../../types';

export const SCF_HTTP_TRIGGER_TYPE = 'TENCENT_SCF_HTTP_TRIGGER';

type Trigger = { TriggerName?: string; Type?: string; TriggerDesc?: string };

const isFunctionUrl = (trigger: Trigger): boolean =>
  trigger.Type === 'http' && Boolean(trigger.TriggerDesc?.includes('NetConfig'));

export const normalizeScfHttpTriggerDesc = (value?: string): Record<string, unknown> | null => {
  try {
    const parsed = JSON.parse(value ?? '') as {
      AuthType?: string;
      NetConfig?: { EnableIntranet?: boolean; EnableExtranet?: boolean };
    };
    if (!parsed.AuthType || !parsed.NetConfig) return null;
    return {
      AuthType: parsed.AuthType,
      NetConfig: {
        EnableIntranet: parsed.NetConfig.EnableIntranet ?? false,
        EnableExtranet: parsed.NetConfig.EnableExtranet ?? true,
      },
    };
  } catch {
    return null;
  }
};

export const ownedScfHttpTrigger = (
  instances: Array<Record<string, unknown>>,
  definition: ResourceAttributes,
): { id: string; triggerDesc?: string } | undefined => {
  const recorded = instances.find((instance) => instance.type === SCF_HTTP_TRIGGER_TYPE);
  if (typeof recorded?.id === 'string')
    return { id: recorded.id, triggerDesc: recorded.triggerDesc as string | undefined };
  if (!definition.http) return undefined;
  const fn = instances.find(
    (instance) => typeof instance.functionName === 'string' || instance.type == null,
  );
  const legacy = (fn?.triggers as Array<Record<string, unknown>> | undefined)?.find(
    (trigger) =>
      trigger.type === 'http' &&
      trigger.owned !== false &&
      typeof trigger.triggerName === 'string' &&
      typeof trigger.triggerDesc === 'string' &&
      trigger.triggerDesc.includes('NetConfig'),
  );
  return legacy
    ? { id: String(legacy.triggerName), triggerDesc: String(legacy.triggerDesc) }
    : undefined;
};

export const reconcileScfHttpTrigger = async (
  context: Context,
  fn: FunctionDomain,
  instances: Array<Record<string, unknown>>,
  definition: ResourceAttributes,
  client: ReturnType<typeof createTencentClient>,
  repair = false,
  recoverCreated = false,
): Promise<Array<ResourceInstance & { type: string }>> => {
  const owned = ownedScfHttpTrigger(instances, definition);
  const remove = async (id: string): Promise<void> => {
    try {
      await client.scf.deleteTrigger({ FunctionName: fn.name, TriggerName: id, Type: 'http' });
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code !== 'ResourceNotFound' && code !== 'ResourceNotFound.TriggerName') throw error;
    }
  };
  if (!fn.triggers?.http) {
    if (owned) await remove(owned.id);
    return [];
  }
  if (!fn.triggers.http.auth_type)
    throw new Error(lang.__('HTTP_TRIGGER_AUTH_TYPE_REQUIRED', { functionName: fn.name }));
  const desc = buildTencentHttpTriggerDesc(
    mapAuthType(context.provider, fn.triggers.http.auth_type),
    mapAccess(fn.triggers.http.access),
  );
  const record = (id: string): ResourceInstance & { type: string } => ({
    type: SCF_HTTP_TRIGGER_TYPE,
    id,
    sid: buildSid('tencent', 'scf-http-trigger', context.stage, `${fn.name}.${id}`),
    triggerDesc: desc,
  });
  const before = (await client.scf.getFunction(fn.name))?.Triggers ?? [];
  const live = before.find(
    (trigger) => isFunctionUrl(trigger) && (!owned || trigger.TriggerName === owned.id),
  );
  if (live && !owned) {
    if (
      recoverCreated &&
      definition.http &&
      live.TriggerName &&
      !remoteDiffersFromDesired(
        { http: normalizeScfHttpTriggerDesc(live.TriggerDesc) },
        { http: normalizeScfHttpTriggerDesc(desc) },
      )
    )
      return [record(live.TriggerName)];
    return [];
  }
  if (
    live &&
    owned &&
    !repair &&
    !remoteDiffersFromDesired(
      { http: normalizeScfHttpTriggerDesc(live.TriggerDesc) },
      { http: normalizeScfHttpTriggerDesc(desc) },
    )
  )
    return [record(owned.id)];
  if (owned) await remove(owned.id);
  const created = await client.scf.createTrigger({
    FunctionName: fn.name,
    TriggerName: buildFunctionHttpTriggerName(fn.key),
    Type: 'http',
    TriggerDesc: desc,
    Qualifier: '$DEFAULT',
    Enable: 'OPEN',
  });
  const observed = created?.TriggerName
    ? created
    : (await client.scf.getFunction(fn.name))?.Triggers?.find(
        (trigger) =>
          isFunctionUrl(trigger) &&
          (!before.some((previous) => previous.TriggerName === trigger.TriggerName) ||
            trigger.TriggerName === owned?.id),
      );
  if (!observed?.TriggerName)
    throw new Error(lang.__('SCF_HTTP_TRIGGER_ID_UNAVAILABLE', { functionName: fn.name }));
  return [record(observed.TriggerName)];
};

import {
  attributesEqual,
  buildFunctionRoleName,
  computeZipContentHash,
  getAllResources,
  getResource,
  logger,
} from '../../common';
import { createAliyunClient } from '../../common/aliyunClient';
import { buildFc3ExecutionPolicyDocument } from '../../common/aliyunClient/ramOperations';
import { SLS_LOGSTORE_SHARDS, SLS_LOGSTORE_TTL } from '../../common/aliyunClient/slsOperations';
import {
  canonicalSecurityGroupRule,
  parseSecurityGroupRule,
} from '../../common/aliyunClient/ecsOperations';
import { cachedRefreshRead } from '../../common/refreshCache';
import {
  computeRevertKeys,
  mergeLiveBefore,
  remoteDiffersFromDesired,
} from '../../common/planCompare';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import {
  Context,
  FunctionDomain,
  Plan,
  PlanItem,
  ResourceAttributes,
  ResourceState,
  StateFile,
} from '../../types';
import {
  cloudFc3ToDefinition,
  extractFc3Definition,
  Fc3FunctionConfig,
  functionToFc3Config,
} from './fc3Types';
import { resolveRoleGrant } from './fc3Resource';
import { lang } from '../../lang';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

/**
 * Provider-managed logConfig fields that are set by the system after creation.
 * These should not be compared when detecting changes.
 */
const PROVIDER_MANAGED_LOG_CONFIG_FIELDS = ['project', 'logstore', 'logBeginRule'] as const;

/**
 * Normalize definition for comparison by excluding provider-managed fields.
 * This prevents false-positive change detection when the system populates
 * fields like logConfig.project and logConfig.logstore after creation.
 */
const normalizeDefinitionForComparison = (definition: ResourceAttributes): ResourceAttributes => {
  const { logConfig, ...rest } = definition;

  if (!logConfig || typeof logConfig !== 'object') {
    return definition;
  }

  const normalizedLogConfig: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(logConfig)) {
    if (
      !PROVIDER_MANAGED_LOG_CONFIG_FIELDS.includes(
        key as (typeof PROVIDER_MANAGED_LOG_CONFIG_FIELDS)[number],
      )
    ) {
      normalizedLogConfig[key] = value;
    }
  }

  return {
    ...rest,
    logConfig: Object.keys(normalizedLogConfig).length > 0 ? normalizedLogConfig : null,
  };
};

const isSecurityGroupId = (value: string): boolean => value.startsWith('sg-');

const resolveSecurityGroupId = async (
  context: Context,
  securityGroupName: string,
  vpcId?: string,
): Promise<string> => {
  if (isSecurityGroupId(securityGroupName)) {
    return securityGroupName;
  }

  const client = createAliyunClient(context);
  const sg = await cachedRefreshRead(
    context,
    `ecs.getSecurityGroupByName:${securityGroupName}:${vpcId ?? ''}`,
    () => client.ecs.getSecurityGroupByName(securityGroupName, vpcId),
  );
  if (!sg) {
    throw new Error(
      lang.__('SECURITY_GROUP_NOT_FOUND', { sgName: securityGroupName, vpcId: vpcId ?? 'default' }),
    );
  }
  return sg.securityGroupId;
};

const resolveVpcConfigSecurityGroup = async (
  context: Context,
  config: Fc3FunctionConfig,
): Promise<Fc3FunctionConfig> => {
  if (!config.vpcConfig?.securityGroupId) {
    return config;
  }

  const securityGroupId = await resolveSecurityGroupId(
    context,
    config.vpcConfig.securityGroupId,
    config.vpcConfig.vpcId,
  );

  return {
    ...config,
    vpcConfig: {
      ...config.vpcConfig,
      securityGroupId,
    },
  };
};

const planFunctionDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'ALIYUN_FC3',
  changes: { before: normalizeDefinitionForComparison(definition) },
});

type ManagedRoleProbe = { roleName: string };

// Issue #234: recorded role instance governs (stored-first); explicit managed
// iam.role derives the executor's name. External (string) roles and functions
// without role config are deliberately not probed.
const resolveManagedRoleProbe = (
  context: Context,
  fn: FunctionDomain,
  currentState: ResourceState | undefined,
): ManagedRoleProbe | undefined => {
  const iamRole = fn.iam?.role;
  if (typeof iamRole === 'string') {
    return undefined;
  }
  const roleInstance = currentState?.instances?.find(
    (i) => (i as { type?: string }).type === 'ALIYUN_RAM_ROLE',
  ) as { id?: string } | undefined;
  if (roleInstance?.id) {
    return { roleName: roleInstance.id };
  }
  if (iamRole && typeof iamRole === 'object') {
    const serviceName = `${context.app}-${context.service}`;
    return {
      roleName: iamRole.name ?? buildFunctionRoleName(serviceName, context.stage, fn.key),
    };
  }
  return undefined;
};

/**
 * Parse a cloud RAM trust/policy document. Aliyun returns these URL-encoded
 * (GetRole / GetPolicyVersion) while mocks return plain JSON — accept both.
 * Unparseable/absent yields `undefined` so the caller treats the dimension as
 * unreadable instead of phantom-drifting on garbage.
 */
const parseRolePolicyDocument = (raw: string | undefined): Record<string, unknown> | undefined => {
  if (!raw) {
    return undefined;
  }
  const tryParse = (candidate: string): Record<string, unknown> | undefined => {
    try {
      const parsed: unknown = JSON.parse(candidate);
      return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : undefined;
    } catch {
      return undefined;
    }
  };
  return tryParse(raw) ?? tryParse(decodeURIComponent(raw));
};

/**
 * Live RAM role policy drift against the grant the executor would write via
 * resolveRoleGrant (the very call updateResource uses), so the planner never
 * diverges from the executor. Scoped to avoid false drift:
 * - Only functions declaring a managed `iam.role` object: legacy recorded roles
 *   without one carry older si-written documents whose baseline differs from
 *   today's derivation — flagging them would fabricate drift with no console
 *   edit behind them (the existence probe still covers them).
 * - Only single-owner roles; shared roles need an executor peer-union the
 *   planner cannot reproduce → probe-only (coverage gap accepted).
 * - logConfig must be derivable from state: with logging on but no recorded
 *   logstore instance the executor creates one during update and derives the
 *   grant from that new logstore, which the planner cannot know → skip.
 * Returns an i18n drift-reason key (issue #246) instead of a boolean so the
 * plan can say WHICH dimension drifted; null means no drift.
 */
const detectRolePolicyDrift = async (
  context: Context,
  state: StateFile,
  fn: FunctionDomain,
  currentState: ResourceState,
  roleName: string,
  cloudRole: { assumeRolePolicyDocument?: string } | null,
): Promise<string | null> => {
  const client = createAliyunClient(context);
  const logicalId = `functions.${fn.key}`;

  const iamRole = fn.iam?.role;
  if (!iamRole || typeof iamRole === 'string') {
    return null;
  }

  const roleInstance = currentState.instances?.find(
    (i) =>
      (i as { type?: string }).type === 'ALIYUN_RAM_ROLE' &&
      (i as { id?: string }).id === roleName &&
      !(i as { external?: boolean }).external,
  );
  if (!roleInstance) {
    return null;
  }

  // Conservative ownership scan (mirrors collectRolePeers semantics without
  // requiring context.iac): any OTHER function in state recording the same
  // managed role instance makes the role shared → executor uses a peer union.
  const sharedRole = Object.entries(getAllResources(state)).some(
    ([peerLogicalId, peerState]) =>
      peerLogicalId !== logicalId &&
      peerLogicalId.startsWith('functions.') &&
      (peerState.instances ?? []).some(
        (i) =>
          (i as { type?: string }).type === 'ALIYUN_RAM_ROLE' &&
          (i as { id?: string }).id === roleName &&
          !(i as { external?: boolean }).external,
      ),
  );
  if (sharedRole) {
    return null;
  }

  let logConfig: { project: string; logstore: string } | undefined;
  if (fn.log) {
    const logstoreInstance = currentState.instances?.find(
      (i) => (i as { type?: string }).type === 'ALIYUN_SLS_LOGSTORE',
    ) as { id?: string } | undefined;
    if (!logstoreInstance?.id) {
      return null;
    }
    const [project, logstore] = logstoreInstance.id.split('/');
    logConfig = { project, logstore };
  }

  const roleGrant = resolveRoleGrant(context, state, fn, logConfig, roleName);

  // a. trust policy — console edits to the assume-role principals.
  const cloudTrust = parseRolePolicyDocument(cloudRole?.assumeRolePolicyDocument);
  const desiredTrust: Record<string, unknown> = {
    Version: '1',
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Principal: { Service: [...roleGrant.trustedServices] },
      },
    ],
  };
  if (cloudTrust && !attributesEqual(cloudTrust, desiredTrust)) {
    return 'PLAN_DRIFT_ROLE_POLICY';
  }

  // b. execution + custom policy (the `<roleName>-policy` custom document). An
  // absent/unreadable cloud document is drift: the executor recreates it on
  // update, so leaving it unread would mask a deleted policy.
  const cloudPolicyDocument = await cachedRefreshRead(
    context,
    `ram.getExecutionPolicyDocument:${roleName}`,
    () => client.ram.getExecutionPolicyDocument(roleName),
  );
  const cloudPolicy = parseRolePolicyDocument(cloudPolicyDocument);
  const desiredPolicyDocument = parseRolePolicyDocument(
    buildFc3ExecutionPolicyDocument(roleGrant.executionStatements, roleGrant.customStatements),
  );
  if (
    !cloudPolicy ||
    !desiredPolicyDocument ||
    !attributesEqual(cloudPolicy, desiredPolicyDocument)
  ) {
    return 'PLAN_DRIFT_ROLE_POLICY';
  }

  // c. managed (system) policies as sorted name sets; desired ARNs strip the
  // `acs:ram::<uid>:policy/` prefix.
  const desiredManagedNames = (iamRole.managed_policies ?? []).map(
    (policyArn) => policyArn.split('/').pop() ?? '',
  );
  const cloudManagedNames = await cachedRefreshRead(
    context,
    `ram.listAttachedRolePolicies:${roleName}`,
    () => client.ram.listAttachedRolePolicies(roleName),
  );
  const asSortedSetKey = (names: string[]): string => [...names].sort().join(',');
  if (asSortedSetKey(desiredManagedNames) !== asSortedSetKey(cloudManagedNames ?? [])) {
    return 'PLAN_DRIFT_ROLE_POLICY';
  }

  return null;
};

/**
 * Issue #234 M1: nested log-drift probe — logstore ttl/shards and index
 * presence for functions that declare logging. The logstore is per-function
 * (buildFunctionLogstoreName), so this lives in the function flow. Aliyun
 * cannot shrink shards, so only a shard deficit counts as drift.
 * Returns an i18n drift-reason key (issue #246); null means no drift.
 */
const detectFunctionNestedDrift = async (
  context: Context,
  client: ReturnType<typeof createAliyunClient>,
  fn: FunctionDomain,
  currentState: ResourceState,
): Promise<string | null> => {
  // Each declared dimension contributes its own probe; undeclared dimensions
  // fall through so later dimensions still run.
  if (fn.log) {
    const slsLogstoreInstance = currentState.instances?.find(
      (i) => (i as { type?: string }).type === 'ALIYUN_SLS_LOGSTORE',
    ) as { id?: string } | undefined;
    if (slsLogstoreInstance?.id) {
      const [projectName, logstoreName] = slsLogstoreInstance.id.split('/');
      if (projectName && logstoreName) {
        const logstore = await cachedRefreshRead(
          context,
          `sls.getLogstore:${projectName}:${logstoreName}`,
          () => client.sls.getLogstore(projectName, logstoreName),
        );
        if (!logstore) {
          return 'PLAN_DRIFT_LOGSTORE'; // logstore deleted out-of-band
        }
        if (logstore.ttl !== SLS_LOGSTORE_TTL) {
          return 'PLAN_DRIFT_LOGSTORE';
        }
        // Aliyun cannot shrink shards — only a deficit counts as drift.
        if ((logstore.shardCount ?? 0) < SLS_LOGSTORE_SHARDS) {
          return 'PLAN_DRIFT_LOGSTORE';
        }

        const index = await cachedRefreshRead(
          context,
          `sls.getIndex:${projectName}:${logstoreName}`,
          () => client.sls.getIndex(projectName, logstoreName),
        );
        if (!index) {
          return 'PLAN_DRIFT_LOGSTORE'; // index deleted out-of-band
        }
      }
    }
  }

  // SG rules are function-owned (created from fn.network.security_group) —
  // console edits to the rule set are function drift (issue #234 M2).
  if (fn.network) {
    const sgInstance = currentState.instances?.find(
      (i) => (i as { type?: string }).type === 'ALIYUN_ECS_SECURITY_GROUP',
    ) as { id?: string } | undefined;
    if (sgInstance?.id) {
      const sgId = sgInstance.id;
      const live = await cachedRefreshRead(context, `ecs.getSecurityGroupRules:${sgId}`, () =>
        client.ecs.getSecurityGroupRules(sgId),
      );
      const desiredRules = (
        ingress: string[],
        egress: string[],
      ): { ingress: string[]; egress: string[] } => {
        const parse = (rule: string): string | null => {
          try {
            const parsed = parseSecurityGroupRule(rule);
            return canonicalSecurityGroupRule(parsed.protocol, parsed.portRange, parsed.cidr);
          } catch {
            return null; // invalid rules are skipped at create time too
          }
        };
        return {
          ingress: (ingress ?? []).map(parse).filter((r): r is string => Boolean(r)),
          egress: (egress ?? []).map(parse).filter((r): r is string => Boolean(r)),
        };
      };
      const desired = desiredRules(
        fn.network.security_group.ingress ?? [],
        fn.network.security_group.egress ?? [],
      );
      const liveIngress = (live?.ingressRules ?? []).map((r) =>
        canonicalSecurityGroupRule(r.ipProtocol ?? '', r.portRange ?? '', r.sourceCidrIp ?? ''),
      );
      const liveEgress = (live?.egressRules ?? []).map((r) =>
        canonicalSecurityGroupRule(r.ipProtocol ?? '', r.portRange ?? '', r.destCidrIp ?? ''),
      );
      if (
        desired.ingress.some((d) => !liveIngress.includes(d)) ||
        liveIngress.some((l) => !desired.ingress.includes(l)) ||
        desired.egress.some((d) => !liveEgress.includes(d)) ||
        liveEgress.some((l) => !desired.egress.includes(l))
      ) {
        return 'PLAN_DRIFT_SG_RULES';
      }
    }
  }

  // Issue #234 M4: NAS mount targets are function-owned — a file system with
  // no live mount targets means the console deleted it out-of-band.
  if (fn.storage?.nas && fn.storage.nas.length > 0 && fn.network) {
    const fsInstances = currentState.instances?.filter(
      (i) => (i as { type?: string }).type === 'ALIYUN_NAS_FILE_SYSTEM',
    ) as { id?: string }[];
    for (const fs of fsInstances) {
      const fsId = fs.id;
      if (!fsId) {
        continue;
      }
      const targets = await cachedRefreshRead(context, `nas.listMountTargets:${fsId}`, () =>
        client.nas.listMountTargets(fsId),
      );
      if (!targets || targets.length === 0) {
        return 'PLAN_DRIFT_NAS_MOUNT'; // mount target deleted out-of-band
      }
    }
  }

  return null;
};

export const generateFunctionPlan = async (
  context: Context,
  state: StateFile,
  functions: Array<FunctionDomain> | undefined,
): Promise<Plan> => {
  if (!functions || functions.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId]) => logicalId.startsWith('functions.'))
      .map(([logicalId, resourceState]) =>
        planFunctionDeletion(logicalId, resourceState.definition),
      );
    return { items };
  }

  const desiredLogicalIds = new Set(functions.map((fn) => `functions.${fn.key}`));

  const functionItems = await mapWithConcurrency(
    functions,
    PLAN_READ_CONCURRENCY,
    async (fn): Promise<PlanItem> => {
      const logicalId = `functions.${fn.key}`;
      const currentState = getResource(state, logicalId);
      const rawConfig = functionToFc3Config(fn);
      const config = await resolveVpcConfigSecurityGroup(context, rawConfig);
      const desiredCodeHash = fn.code ? await computeZipContentHash(fn.code.path) : null;
      const baseDefinition = extractFc3Definition(config, desiredCodeHash);
      const desiredDefinition = fn.iam ? { ...baseDefinition, iam: fn.iam } : baseDefinition;

      if (!currentState || currentState.status === 'tainted') {
        // No usable local state: probe the provider before planning create.
        // If a same-named function already exists WITHOUT our ownership tag it
        // may belong to another project — fail fast in the plan instead of
        // letting the executor discover it mid-deploy.
        const client = createAliyunClient(context);
        const remoteFunction = await cachedRefreshRead(context, `fc3.getFunction:${fn.name}`, () =>
          client.fc3.getFunction(fn.name),
        );
        if (remoteFunction && !isOwnedByStack(context, logicalId, remoteFunction.tags)) {
          throw new Error(
            lang.__('RESOURCE_EXISTS_NOT_OWNED', {
              resourceType: 'Function',
              resourceName: fn.name,
              tagKey: OWNERSHIP_TAG_KEY,
            }),
          );
        }

        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_FC3',
          changes: { after: desiredDefinition },
        };
      }

      try {
        const client = createAliyunClient(context);
        const normalizedCurrent = normalizeDefinitionForComparison(currentState.definition || {});
        const normalizedDesired = normalizeDefinitionForComparison(desiredDefinition);
        const definitionChanged = !attributesEqual(normalizedCurrent, normalizedDesired);

        // --no-refresh: no live read, no drift claims — intent-diff only.
        if (context.refresh === false) {
          if (!definitionChanged) {
            return { logicalId, action: 'noop', resourceType: 'ALIYUN_FC3' };
          }
          return {
            logicalId,
            action: 'update',
            resourceType: 'ALIYUN_FC3',
            changes: { before: normalizedCurrent, after: normalizedDesired },
          };
        }

        const remoteFunction = await cachedRefreshRead(context, `fc3.getFunction:${fn.name}`, () =>
          client.fc3.getFunction(fn.name),
        );

        if (!remoteFunction) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'ALIYUN_FC3',
            changes: {
              before: normalizeDefinitionForComparison(currentState.definition),
              after: normalizeDefinitionForComparison(desiredDefinition),
            },
            drifted: true,
          };
        }

        // Issue #234 phase 1: live attribute drift. The stored definition can
        // be untouched while the console edited the deployed function
        // (memory/timeout/env/...). One-directional: only mapper-emitted keys
        // the desired definition declares are compared, so cloud-only extras
        // the config never asked for are ignored (desired-declared contract).
        // Issue #246: the diff baseline is cloud reality — live attributes
        // merged over the stored definition — and revertKeys marks the fields
        // whose difference is purely an out-of-config cloud edit.
        const remoteAttributes = cloudFc3ToDefinition(remoteFunction);
        const remoteDiffers = remoteDiffersFromDesired(remoteAttributes, desiredDefinition);
        const liveBefore = normalizeDefinitionForComparison(
          mergeLiveBefore(currentState.definition || {}, remoteAttributes),
        );
        const revertKeys = computeRevertKeys(
          normalizedCurrent,
          normalizeDefinitionForComparison(remoteAttributes),
          normalizedDesired,
        );

        if (definitionChanged || remoteDiffers) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'ALIYUN_FC3',
            changes: { before: liveBefore, after: normalizedDesired },
            drifted: true,
            ...(revertKeys.length ? { revertKeys } : {}),
          };
        }

        const roleProbe = resolveManagedRoleProbe(context, fn, currentState);
        if (roleProbe) {
          try {
            const cloudRole = await cachedRefreshRead(
              context,
              `ram.getRole:${roleProbe.roleName}`,
              () => client.ram.getRole(roleProbe.roleName),
            );
            if (!cloudRole) {
              logger.warn(
                lang.__('PLAN_FUNCTION_ROLE_MISSING', {
                  roleName: roleProbe.roleName,
                  functionName: fn.name,
                }),
              );
              return {
                logicalId,
                action: 'update',
                resourceType: 'ALIYUN_FC3',
                changes: { before: liveBefore, after: normalizedDesired },
                drifted: true,
                driftReasons: ['PLAN_DRIFT_ROLE_MISSING'],
              };
            }
            const roleDriftReason = await detectRolePolicyDrift(
              context,
              state,
              fn,
              currentState,
              roleProbe.roleName,
              cloudRole,
            );
            if (roleDriftReason) {
              return {
                logicalId,
                action: 'update',
                resourceType: 'ALIYUN_FC3',
                changes: { before: liveBefore, after: normalizedDesired },
                drifted: true,
                driftReasons: [roleDriftReason],
              };
            }
          } catch (error: unknown) {
            logger.warn(
              lang.__('PLAN_FUNCTION_ROLE_PROBE_FAILED', {
                roleName: roleProbe.roleName,
                functionName: fn.name,
                error: String(error),
              }),
            );
          }
        }

        // Issue #234 M1/M2: nested drift probe — the probe itself skips
        // dimensions the config does not declare.
        try {
          const nestedDriftReason = await detectFunctionNestedDrift(
            context,
            client,
            fn,
            currentState,
          );
          if (nestedDriftReason) {
            return {
              logicalId,
              action: 'update',
              resourceType: 'ALIYUN_FC3',
              changes: { before: liveBefore, after: normalizedDesired },
              drifted: true,
              driftReasons: [nestedDriftReason],
            };
          }
        } catch (error: unknown) {
          logger.warn(
            lang.__('PLAN_FUNCTION_NESTED_PROBE_FAILED', {
              functionName: fn.name,
              error: String(error),
            }),
          );
        }

        return { logicalId, action: 'noop', resourceType: 'ALIYUN_FC3' };
      } catch (error: unknown) {
        logger.warn(
          lang.__('PLAN_LIVE_READ_FAILED', {
            logicalId,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_FC3',
          changes: {
            before: normalizeDefinitionForComparison(currentState.definition),
            after: normalizeDefinitionForComparison(desiredDefinition),
          },
          drifted: true,
        };
      }
    },
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(
      ([logicalId]) => logicalId.startsWith('functions.') && !desiredLogicalIds.has(logicalId),
    )
    .map(([logicalId, resourceState]) => planFunctionDeletion(logicalId, resourceState.definition));

  return { items: [...functionItems, ...deletionItems] };
};

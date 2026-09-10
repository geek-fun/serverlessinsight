import { attributesEqual, computeZipContentHash, getResource, logger } from '../../common';
import { getAllResources, getSharedResource } from '../../common/stateManager';
import { createVolcengineClient } from '../../common/volcengineClient';
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
  StateFile,
} from '../../types';
import {
  buildDefaultTrustPolicy,
  extractVefaasDefinition,
  functionToVefaasConfig,
} from './vefaasTypes';
import { resolveRoleGrant } from './vefaasResource';
import { TLS_TOPIC_TTL } from '../../common/volcengineClient/tlsOperations';
import { buildRolePolicyName } from '../../common/nameBuilder';
import { buildSharedProjectName, buildFunctionLogTopicName } from './sharedLogProject';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';
import { lang } from '../../lang';

const planFunctionDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'VOLCENGINE_VEFAAS',
  changes: { before: definition },
});

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
      const config = functionToVefaasConfig(fn);
      const codePath = fn.code!.path;
      const desiredCodeHash = await computeZipContentHash(codePath);
      // Mirror the executor's auto-role behavior: when the YAML omits
      // `iam.role`, the executor reuses the IAM role recorded in state
      // (createDependentResources persists a VOLCENGINE_IAM_ROLE instance and
      // reuses it on subsequent deploys). Deriving the same trn here keeps the
      // plan's desired definition in sync with what the executor will apply —
      // otherwise every plan shows a phantom `role: <trn> -> null` drift.
      if (!fn.iam && currentState?.instances?.length) {
        const roleInstance = currentState.instances.find(
          (i) => (i as { type?: string }).type === 'VOLCENGINE_IAM_ROLE',
        ) as { trn?: string } | undefined;
        if (roleInstance?.trn) {
          config.role = roleInstance.trn;
        }
      }
      // Mirror the executor's TLS log-resource behavior: functionToVefaasConfig(fn)
      // never sets logConfig on its own (it's only populated via the second
      // `options` argument), so without this the diff below always compares
      // desiredDefinition.logConfig === undefined regardless of `fn.log` in the
      // YAML — meaning `log: true` could never be detected as drift and the
      // planner would report `noop` forever, so `UpdateFunction`'s `TlsConfig`
      // never gets sent. Derive the same project/topic names the executor
      // would use (shared stage slot → tracked topic instance → deterministic
      // names `${app}-${stage}-tls` / `${service}-${stage}-${fn.key}-fn-logs`) so
      // the diff can see the field change without phantom drift.
      if (fn.log) {
        const tlsTopicInstance = currentState?.instances?.find(
          (i) => (i as { type?: string }).type === 'VOLCENGINE_TLS_TOPIC',
        ) as { id?: string } | undefined;
        const shared = getSharedResource(state, context.stage, 'logs.project');

        if (tlsTopicInstance?.id) {
          const [projectName, topicName] = tlsTopicInstance.id.split('/');
          config.logConfig = { project: projectName, topic: topicName };
        } else if (shared) {
          const projectName = (shared.instances?.[0] as { id?: string } | undefined)?.id;
          if (projectName) {
            config.logConfig = {
              project: projectName,
              topic: buildFunctionLogTopicName(context.service, context.stage, fn.key),
            };
          }
        } else {
          config.logConfig = {
            project: buildSharedProjectName(context.app, context.stage),
            topic: buildFunctionLogTopicName(context.service, context.stage, fn.key),
          };
        }
      }
      const baseDefinition = extractVefaasDefinition(config, desiredCodeHash);
      const desiredDefinition = fn.iam ? { ...baseDefinition, iam: fn.iam } : baseDefinition;

      if (!currentState || currentState.status === 'tainted') {
        // No usable local state: probe the provider before planning create.
        // If a same-named function already exists WITHOUT our ownership tag it
        // may belong to another project — fail fast in the plan instead of
        // letting the executor discover it mid-deploy.
        const client = createVolcengineClient(context);
        const remoteFunction = await cachedRefreshRead(
          context,
          `vefaas.getFunction:${fn.name}`,
          () => client.vefaas.getFunction(fn.name),
        );
        if (remoteFunction && !isOwnedByStack(context, logicalId, remoteFunction.Tags)) {
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
          resourceType: 'VOLCENGINE_VEFAAS',
          changes: { after: desiredDefinition },
        };
      }

      try {
        const client = createVolcengineClient(context);
        const currentDefinition = currentState.definition || {};
        const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

        // --no-refresh: no live read, no drift claims — intent-diff only.
        if (context.refresh === false) {
          if (!definitionChanged) {
            return { logicalId, action: 'noop', resourceType: 'VOLCENGINE_VEFAAS' };
          }
          return {
            logicalId,
            action: 'update',
            resourceType: 'VOLCENGINE_VEFAAS',
            changes: { before: currentDefinition, after: desiredDefinition },
          };
        }

        const remoteFunction = await cachedRefreshRead(
          context,
          `vefaas.getFunction:${fn.name}`,
          () => client.vefaas.getFunction(fn.name),
        );

        if (!remoteFunction) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'VOLCENGINE_VEFAAS',
            changes: {
              before: currentState.definition,
              after: desiredDefinition,
            },
            drifted: true,
          };
        }

        // Drift detection against the LIVE provider: compare the remote
        // function's actual attributes (runtime/handler/memory/timeout/env)
        // against the desired definition. Console edits would otherwise go
        // undetected — definitionChanged only sees local-vs-desired.
        // One-directional desired-declared contract (issue #246 fix: this
        // planner previously used a full two-directional equality, so
        // cloud-only values within mapped keys phantom-drifted every plan).
        // Mapper-emitted shapes are subset-normalized to the definition the
        // config writes, so nested comparisons stay apples-to-apples.
        // Not refreshable (issue #234 phase 2): the IAM custom policy document
        // (volcengine IAM has no GetPolicy read) and dependent TLS topics
        // (existence-only by design decision 5) stay covered by the executor's
        // reconcile path instead of live plan comparison.
        const remoteAttributes: ResourceAttributes = {
          runtime: remoteFunction.runtime,
          handler: remoteFunction.handler,
          memorySize: remoteFunction.memoryMb,
          timeout: remoteFunction.requestTimeout,
          environment: remoteFunction.environmentVariables ?? {},
          // Provider responses carry `null` for unset fields while the desired
          // definition carries `undefined` — normalize null → undefined so the
          // comparison ignores the representation difference.
          description: remoteFunction.description ?? undefined,
          role: remoteFunction.role ?? undefined,
          vpcConfig: remoteFunction.vpcConfig
            ? {
                vpcId: remoteFunction.vpcConfig.vpcId ?? undefined,
                subnetIds: remoteFunction.vpcConfig.subnetIds ?? [],
                securityGroupIds: remoteFunction.vpcConfig.securityGroupIds ?? [],
              }
            : undefined,
          logConfig: remoteFunction.logConfig
            ? { project: remoteFunction.logConfig.project, topic: remoteFunction.logConfig.topic }
            : undefined,
        };
        const remoteDiffers = remoteDiffersFromDesired(remoteAttributes, desiredDefinition);
        const liveBefore = mergeLiveBefore(currentDefinition, remoteAttributes);
        const revertKeys = computeRevertKeys(
          currentDefinition,
          remoteAttributes,
          desiredDefinition,
        );

        if (definitionChanged || remoteDiffers) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'VOLCENGINE_VEFAAS',
            changes: { before: liveBefore, after: desiredDefinition },
            drifted: true,
            ...(revertKeys.length ? { revertKeys } : {}),
          };
        }

        // Issue #234 phase 3: live role drift — trust policy and attached
        // managed policies. The custom <role>-policy DOCUMENT has no read API
        // (volcengine IAM has no GetPolicy), so it stays executor-reconciled.
        const iamRoleInstance = currentState.instances.find(
          (i) => (i as { type?: string }).type === 'VOLCENGINE_IAM_ROLE',
        ) as { id?: string } | undefined;
        if (iamRoleInstance?.id) {
          try {
            const roleId = iamRoleInstance.id;
            const roleGrant = resolveRoleGrant(context, state, fn, roleId);
            const cloudRole = await cachedRefreshRead(context, `iam.getRole:${roleId}`, () =>
              client.iam.getRole(roleId),
            );
            if (!cloudRole) {
              return {
                logicalId,
                action: 'update',
                resourceType: 'VOLCENGINE_VEFAAS',
                changes: { before: liveBefore, after: desiredDefinition },
                drifted: true,
                driftReasons: ['PLAN_DRIFT_ROLE_MISSING'],
              };
            }
            let cloudTrust: unknown;
            try {
              cloudTrust = JSON.parse(cloudRole.trustPolicyDocument ?? '');
            } catch {
              cloudTrust = undefined;
            }
            if (
              cloudTrust &&
              !attributesEqual(
                cloudTrust as Record<string, unknown>,
                buildDefaultTrustPolicy(roleGrant.trustedServices) as unknown as Record<
                  string,
                  unknown
                >,
              )
            ) {
              return {
                logicalId,
                action: 'update',
                resourceType: 'VOLCENGINE_VEFAAS',
                changes: { before: liveBefore, after: desiredDefinition },
                drifted: true,
                driftReasons: ['PLAN_DRIFT_ROLE_POLICY'],
              };
            }
            const desiredManaged = (
              (fn.iam?.role as { managed_policies?: string[] } | undefined)?.managed_policies ?? []
            ).map((arn) => arn.split('/').pop() ?? '');
            const asSetKey = (names: string[]): string => [...names].sort().join(',');
            const cloudManaged = await cachedRefreshRead(
              context,
              `iam.listAttachedRolePolicies:${roleId}`,
              () => client.iam.listAttachedRolePolicies(roleId),
            );
            const desiredNames = asSetKey([...desiredManaged, buildRolePolicyName(roleId)]);
            if (desiredNames !== asSetKey(cloudManaged ?? [])) {
              return {
                logicalId,
                action: 'update',
                resourceType: 'VOLCENGINE_VEFAAS',
                changes: { before: liveBefore, after: desiredDefinition },
                drifted: true,
                driftReasons: ['PLAN_DRIFT_ROLE_POLICY'],
              };
            }
          } catch (error: unknown) {
            logger.warn(
              lang.__('PLAN_FUNCTION_ROLE_PROBE_FAILED', {
                roleName: iamRoleInstance.id,
                functionName: fn.name,
                error: String(error),
              }),
            );
          }
        }

        // Issue #234 M5: nested topic drift — ttl is the only ModifyTopic
        // field si manages; probed only when logging is declared (the
        // --no-refresh early return above already guarantees refresh is on).
        if (fn.log) {
          const tlsTopicInstance = currentState.instances.find(
            (i) => (i as { type?: string }).type === 'VOLCENGINE_TLS_TOPIC',
          ) as { id?: string } | undefined;
          if (tlsTopicInstance?.id) {
            try {
              const [topicProject, topicName] = tlsTopicInstance.id.split('/');
              if (topicProject && topicName) {
                const liveTopic = await cachedRefreshRead(
                  context,
                  `tls.getTopic:${topicProject}:${topicName}`,
                  () => client.tls.getTopic(topicProject, topicName),
                );
                if (!liveTopic || (liveTopic.ttl ?? TLS_TOPIC_TTL) !== TLS_TOPIC_TTL) {
                  return {
                    logicalId,
                    action: 'update',
                    resourceType: 'VOLCENGINE_VEFAAS',
                    changes: { before: liveBefore, after: desiredDefinition },
                    drifted: true,
                    driftReasons: ['PLAN_DRIFT_TLS_TOPIC'],
                  };
                }
              }
            } catch (error: unknown) {
              logger.warn(
                lang.__('PLAN_FUNCTION_NESTED_PROBE_FAILED', {
                  functionName: fn.name,
                  error: String(error),
                }),
              );
            }
          }
        }

        return { logicalId, action: 'noop', resourceType: 'VOLCENGINE_VEFAAS' };
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
          resourceType: 'VOLCENGINE_VEFAAS',
          changes: {
            before: currentState.definition,
            after: desiredDefinition,
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

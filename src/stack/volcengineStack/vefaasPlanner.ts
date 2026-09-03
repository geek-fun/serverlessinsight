import { attributesEqual, computeZipContentHash, getResource } from '../../common';
import { getAllResources, getSharedResource } from '../../common/stateManager';
import { createVolcengineClient } from '../../common/volcengineClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import {
  Context,
  FunctionDomain,
  Plan,
  PlanItem,
  ResourceAttributes,
  StateFile,
} from '../../types';
import { extractVefaasDefinition, functionToVefaasConfig } from './vefaasTypes';
import { buildSharedProjectName, buildFunctionLogTopicName } from './sharedLogProject';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

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
            `Function ${fn.name} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to create — resolve manually.`,
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

        const currentDefinition = currentState.definition || {};
        const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

        // Drift detection against the LIVE provider: compare the remote
        // function's actual attributes (runtime/handler/memory/timeout/env)
        // against the desired definition. Console edits would otherwise go
        // undetected — definitionChanged only sees local-vs-desired.
        const remoteAttributes: ResourceAttributes = {
          runtime: remoteFunction.runtime,
          handler: remoteFunction.handler,
          memorySize: remoteFunction.memoryMb,
          timeout: remoteFunction.requestTimeout,
          environment: remoteFunction.environmentVariables,
          // Provider responses carry `null` for unset fields while the desired
          // definition carries `undefined` — normalize null → undefined so the
          // comparison ignores the representation difference.
          description: remoteFunction.description ?? undefined,
          role: remoteFunction.role ?? undefined,
          vpcConfig: remoteFunction.vpcConfig ?? undefined,
          logConfig: remoteFunction.logConfig
            ? { project: remoteFunction.logConfig.project, topic: remoteFunction.logConfig.topic }
            : undefined,
        };
        const remoteMatchesDesired = attributesEqual(remoteAttributes, desiredDefinition);

        if (definitionChanged || !remoteMatchesDesired) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'VOLCENGINE_VEFAAS',
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType: 'VOLCENGINE_VEFAAS' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'VOLCENGINE_VEFAAS',
          changes: {
            before: currentState.definition,
            after: desiredDefinition,
          },
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

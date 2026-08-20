import { attributesEqual, computeZipContentHash, getResource } from '../../common';
import { getAllResources } from '../../common/stateManager';
import { createVolcengineClient } from '../../common/volcengineClient';
import {
  Context,
  FunctionDomain,
  Plan,
  PlanItem,
  ResourceAttributes,
  StateFile,
} from '../../types';
import { extractVefaasDefinition, functionToVefaasConfig } from './vefaasTypes';
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

  const functionItems = await Promise.all(
    functions.map(async (fn): Promise<PlanItem> => {
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
      const baseDefinition = extractVefaasDefinition(config, desiredCodeHash);
      const desiredDefinition = fn.iam ? { ...baseDefinition, iam: fn.iam } : baseDefinition;

      if (!currentState || currentState.status === 'tainted') {
        // No usable local state: probe the provider before planning create.
        // If a same-named function already exists WITHOUT our ownership tag it
        // may belong to another project — fail fast in the plan instead of
        // letting the executor discover it mid-deploy.
        const client = createVolcengineClient(context);
        const remoteFunction = await client.vefaas.getFunction(fn.name);
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
        const remoteFunction = await client.vefaas.getFunction(fn.name);

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
    }),
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(
      ([logicalId]) => logicalId.startsWith('functions.') && !desiredLogicalIds.has(logicalId),
    )
    .map(([logicalId, resourceState]) => planFunctionDeletion(logicalId, resourceState.definition));

  return { items: [...functionItems, ...deletionItems] };
};

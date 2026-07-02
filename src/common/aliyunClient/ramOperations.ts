import RamClient from '@alicloud/ram20150501';
import * as ram from '@alicloud/ram20150501';
import { lang } from '../../lang';
import { logger } from '../logger';
import {
  mergePolicyStatements,
  parseBuiltInStatements,
  buildPolicyDocument,
} from '../iamStatements';
import type { IamStatement } from '../iamStatements';
import { RamRoleInfo } from './types';

type RamSdkClient = RamClient;

const buildAssumeRolePolicy = (trustedServices: string[]): string =>
  JSON.stringify({
    Version: '1',
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Principal: {
          Service: trustedServices,
        },
      },
    ],
  });

const FC_EXECUTION_POLICY = JSON.stringify({
  Version: '1',
  Statement: [
    {
      Effect: 'Allow',
      Action: ['fc:InvokeFunction'],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: [
        'log:PostLogStoreLogs',
        'log:CreateLogStore',
        'log:GetLogStore',
        'log:ListShards',
        'log:GetCursorOrData',
      ],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: ['nas:*'],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: [
        'ecs:CreateNetworkInterface',
        'ecs:DeleteNetworkInterface',
        'ecs:DescribeNetworkInterfaces',
        'ecs:CreateNetworkInterfacePermission',
        'ecs:DescribeNetworkInterfacePermissions',
        'ecs:DeleteNetworkInterfacePermission',
      ],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: ['vpc:DescribeVSwitchAttributes'],
      Resource: '*',
    },
  ],
});

const FC_EXECUTION_STATEMENTS = parseBuiltInStatements(FC_EXECUTION_POLICY);

const extractPolicyNameFromArn = (arn: string): string => {
  const parts = arn.split('/');
  return parts[parts.length - 1];
};

const mapToAliyunStatement = (stmt: IamStatement): Record<string, unknown> => {
  const result: Record<string, unknown> = {
    Effect: stmt.effect,
    Action: stmt.action,
    Resource: stmt.resource,
  };
  if (stmt.sid) {
    result.Sid = stmt.sid;
  }
  return result;
};

const buildExecutionPolicy = (customStatements?: IamStatement[]): string => {
  const merged = mergePolicyStatements(
    FC_EXECUTION_STATEMENTS,
    customStatements,
    mapToAliyunStatement,
  );
  return buildPolicyDocument(merged, { version: '1' });
};

/* istanbul ignore next */ export const createRamOperations = (ramClient: RamSdkClient) => {
  const attachRolePolicyForFc = async (
    roleName: string,
    customStatements?: IamStatement[],
  ): Promise<string> => {
    const policyName = `${roleName}-policy`;

    // Create policy
    try {
      const createPolicyRequest = new ram.CreatePolicyRequest({
        policyName,
        policyDocument: buildExecutionPolicy(customStatements),
        description: `FC execution policy for ${roleName}`,
      });
      await ramClient.createPolicy(createPolicyRequest);
    } catch (error: unknown) {
      // Policy may already exist
      if (
        !(
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityAlreadyExists.Policy'
        )
      ) {
        throw error;
      }
    }

    // Attach policy to role
    try {
      const attachRequest = new ram.AttachPolicyToRoleRequest({
        policyType: 'Custom',
        policyName,
        roleName,
      });
      await ramClient.attachPolicyToRole(attachRequest);
    } catch (error: unknown) {
      // Policy may already be attached
      if (
        !(
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityAlreadyExists.Role.Policy'
        )
      ) {
        throw error;
      }
    }

    return policyName;
  };

  const attachManagedPoliciesFn = async (roleName: string, policies: string[]): Promise<void> => {
    for (const policyArn of policies) {
      try {
        const attachRequest = new ram.AttachPolicyToRoleRequest({
          policyType: 'System',
          policyName: extractPolicyNameFromArn(policyArn),
          roleName,
        });
        await ramClient.attachPolicyToRole(attachRequest);
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityAlreadyExists.Role.Policy'
        ) {
          // Already attached - idempotent
        } else {
          throw error;
        }
      }
    }
  };

  const detachManagedPoliciesFn = async (roleName: string, policies: string[]): Promise<void> => {
    for (const policyArn of policies) {
      try {
        const detachRequest = new ram.DetachPolicyFromRoleRequest({
          policyType: 'System',
          policyName: extractPolicyNameFromArn(policyArn),
          roleName,
        });
        await ramClient.detachPolicyFromRole(detachRequest);
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityNotExist.Role.Policy'
        ) {
          // Not attached - idempotent
        } else {
          throw error;
        }
      }
    }
  };

  const listAttachedRolePoliciesFn = async (roleName: string): Promise<string[]> => {
    try {
      const request = new ram.ListPoliciesForRoleRequest({ roleName });
      const response = await ramClient.listPoliciesForRole(request);
      if (!response?.body?.policies?.policy) {
        return [];
      }
      return response.body.policies.policy
        .filter((p: { policyType?: string }) => p.policyType === 'System')
        .map((p: { policyName?: string }) => p.policyName ?? '');
    } catch {
      return [];
    }
  };

  return {
    createRole: async (
      roleName: string,
      trustedServices: string[],
      description?: string,
      customStatements?: IamStatement[],
      managedPolicies?: string[],
    ): Promise<RamRoleInfo> => {
      const assumeRolePolicy = buildAssumeRolePolicy(trustedServices);

      try {
        const request = new ram.CreateRoleRequest({
          roleName,
          assumeRolePolicyDocument: assumeRolePolicy,
          description: description ?? `ServerlessInsight FC execution role for ${roleName}`,
        });

        const response = await ramClient.createRole(request);

        const roleInfo: RamRoleInfo = {
          roleName,
          roleId: response.body?.role?.roleId,
          arn: response.body?.role?.arn,
          description: response.body?.role?.description,
          createDate: response.body?.role?.createDate,
          updateDate: response.body?.role?.updateDate,
          maxSessionDuration: response.body?.role?.maxSessionDuration,
          assumeRolePolicyDocument: assumeRolePolicy,
        };

        const policyName = await attachRolePolicyForFc(roleName, customStatements);

        if (managedPolicies && managedPolicies.length > 0) {
          await attachManagedPoliciesFn(roleName, managedPolicies);
        }

        return { ...roleInfo, policyName, managedPolicies };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityAlreadyExists.Role'
        ) {
          logger.warn(lang.__('RAM_ROLE_ALREADY_EXISTS', { roleName }));

          try {
            const getRequest = new ram.GetRoleRequest({ roleName });
            const getResponse = await ramClient.getRole(getRequest);

            const updateRequest = new ram.UpdateRoleRequest({
              roleName,
              newAssumeRolePolicyDocument: assumeRolePolicy,
            });
            await ramClient.updateRole(updateRequest);

            const policyName = await attachRolePolicyForFc(roleName, customStatements);

            if (managedPolicies && managedPolicies.length > 0) {
              await attachManagedPoliciesFn(roleName, managedPolicies);
            }

            return {
              roleName,
              roleId: getResponse.body?.role?.roleId,
              arn: getResponse.body?.role?.arn,
              description: getResponse.body?.role?.description,
              createDate: getResponse.body?.role?.createDate,
              updateDate: getResponse.body?.role?.updateDate,
              maxSessionDuration: getResponse.body?.role?.maxSessionDuration,
              assumeRolePolicyDocument: assumeRolePolicy,
              policyName,
              managedPolicies,
            };
          } catch (recoveryError: unknown) {
            // eslint-disable-next-line preserve-caught-error
            throw new Error(
              lang.__('RAM_ROLE_DRIFT_RECOVERY_FAILED', {
                roleName,
                error:
                  recoveryError instanceof Error ? recoveryError.message : String(recoveryError),
              }),
            );
          }
        }
        throw error;
      }
    },

    updateRoleTrustPolicy: async (
      roleName: string,
      trustedServices: string[],
    ): Promise<RamRoleInfo> => {
      const assumeRolePolicy = buildAssumeRolePolicy(trustedServices);

      try {
        const getRequest = new ram.GetRoleRequest({ roleName });
        const getResponse = await ramClient.getRole(getRequest);

        const roleInfo: RamRoleInfo = {
          roleName,
          roleId: getResponse.body?.role?.roleId,
          arn: getResponse.body?.role?.arn,
          description: getResponse.body?.role?.description,
          createDate: getResponse.body?.role?.createDate,
          updateDate: getResponse.body?.role?.updateDate,
          maxSessionDuration: getResponse.body?.role?.maxSessionDuration,
          assumeRolePolicyDocument: assumeRolePolicy,
          policyName: `${roleName}-policy`,
        };

        const updateRequest = new ram.UpdateRoleRequest({
          roleName,
          newAssumeRolePolicyDocument: assumeRolePolicy,
        });
        await ramClient.updateRole(updateRequest);

        return roleInfo;
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityNotExist.Role'
        ) {
          // eslint-disable-next-line preserve-caught-error
          throw new Error(lang.__('RAM_ROLE_NOT_FOUND_IN_CLOUD', { roleName }));
        }
        throw error;
      }
    },

    updateRolePolicy: async (
      roleName: string,
      customStatements?: IamStatement[],
    ): Promise<void> => {
      const policyName = `${roleName}-policy`;
      try {
        await ramClient.detachPolicyFromRole(
          new ram.DetachPolicyFromRoleRequest({ policyType: 'Custom', policyName, roleName }),
        );
      } catch {
        /* idempotent */
      }
      try {
        await ramClient.deletePolicy(new ram.DeletePolicyRequest({ policyName }));
      } catch {
        /* idempotent */
      }
      try {
        await ramClient.createPolicy(
          new ram.CreatePolicyRequest({
            policyName,
            policyDocument: buildExecutionPolicy(customStatements),
            description: `FC execution policy for ${roleName}`,
          }),
        );
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityAlreadyExists.Policy'
        ) {
          /* idempotent */
        } else throw error;
      }
      try {
        await ramClient.attachPolicyToRole(
          new ram.AttachPolicyToRoleRequest({ policyType: 'Custom', policyName, roleName }),
        );
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityAlreadyExists.Role.Policy'
        ) {
          /* idempotent */
        } else throw error;
      }
    },

    getRole: async (roleName: string): Promise<RamRoleInfo | null> => {
      try {
        const request = new ram.GetRoleRequest({
          roleName,
        });
        const response = await ramClient.getRole(request);

        if (!response || !response.body || !response.body.role) {
          return null;
        }

        return {
          roleName: response.body.role.roleName ?? roleName,
          roleId: response.body.role.roleId,
          arn: response.body.role.arn,
          description: response.body.role.description,
          createDate: response.body.role.createDate,
          updateDate: response.body.role.updateDate,
          maxSessionDuration: response.body.role.maxSessionDuration,
          assumeRolePolicyDocument: response.body.role.assumeRolePolicyDocument,
          policyName: `${roleName}-policy`,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'EntityNotExist.Role'
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteRole: async (roleName: string, managedPolicies?: string[]): Promise<void> => {
      const policyName = `${roleName}-policy`;

      if (managedPolicies && managedPolicies.length > 0) {
        await detachManagedPoliciesFn(roleName, managedPolicies);
      }

      // Detach policy from role
      try {
        const detachRequest = new ram.DetachPolicyFromRoleRequest({
          policyType: 'Custom',
          policyName,
          roleName,
        });
        await ramClient.detachPolicyFromRole(detachRequest);
      } catch {
        // Ignore if policy is not attached
      }

      // Delete policy
      try {
        const deletePolicyRequest = new ram.DeletePolicyRequest({
          policyName,
        });
        await ramClient.deletePolicy(deletePolicyRequest);
      } catch {
        // Ignore if policy doesn't exist
      }

      // Delete role
      const request = new ram.DeleteRoleRequest({
        roleName,
      });
      await ramClient.deleteRole(request);
    },

    attachManagedPolicies: attachManagedPoliciesFn,

    detachManagedPolicies: detachManagedPoliciesFn,

    listAttachedRolePolicies: listAttachedRolePoliciesFn,

    updateManagedPolicies: async (roleName: string, desiredPolicies: string[]): Promise<void> => {
      const desiredNames = desiredPolicies.map(extractPolicyNameFromArn);
      const currentNames = await listAttachedRolePoliciesFn(roleName);

      const currentSet = new Set(currentNames);
      const desiredSet = new Set(desiredNames);

      const toAttach = desiredPolicies.filter((p) => !currentSet.has(extractPolicyNameFromArn(p)));
      const toDetach = currentNames.filter((n) => !desiredSet.has(n));

      if (toAttach.length > 0) {
        await attachManagedPoliciesFn(roleName, toAttach);
      }
      if (toDetach.length > 0) {
        await detachManagedPoliciesFn(roleName, toDetach);
      }
    },
  };
};

import RamClient from '@alicloud/ram20150501';
import * as ram from '@alicloud/ram20150501';
import { lang } from '../../lang';
import { logger } from '../logger';
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

export const createRamOperations = (ramClient: RamSdkClient) => {
  const attachRolePolicyForFc = async (roleName: string): Promise<void> => {
    const policyName = `${roleName}-policy`;

    // Create policy
    try {
      const createPolicyRequest = new ram.CreatePolicyRequest({
        policyName,
        policyDocument: FC_EXECUTION_POLICY,
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
  };

  return {
    createRole: async (
      roleName: string,
      trustedServices: string[],
      description?: string,
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
        };

        await attachRolePolicyForFc(roleName);

        return roleInfo;
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

            await attachRolePolicyForFc(roleName);

            return {
              roleName,
              roleId: getResponse.body?.role?.roleId,
              arn: getResponse.body?.role?.arn,
              description: getResponse.body?.role?.description,
              createDate: getResponse.body?.role?.createDate,
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

    deleteRole: async (roleName: string): Promise<void> => {
      const policyName = `${roleName}-policy`;

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
  };
};

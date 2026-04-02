import { Service } from '@volcengine/openapi';
import type { IamRoleConfig, IamRoleInfo } from './types';
import { logger } from '../logger';
import { lang } from '../../lang';

type IamSdkClient = Service;

const DEFAULT_TRUST_POLICY_SERVICES = ['vefaas.volcengine.com'];

const buildTrustPolicyDocument = (trustedServices: string[]): string => {
  return JSON.stringify({
    Statement: [
      {
        Effect: 'Allow',
        Action: ['sts:AssumeRole'],
        Principal: {
          Service: trustedServices,
        },
      },
    ],
  });
};

const VEFAAS_EXECUTION_POLICY = JSON.stringify({
  Statement: [
    {
      Effect: 'Allow',
      Action: ['vefaas:*'],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: ['tos:GetObject', 'tos:PutObject', 'tos:DeleteObject', 'tos:ListBucket'],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: ['vpc:DescribeVpcs', 'vpc:DescribeSubnets', 'vpc:DescribeSecurityGroups'],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: ['tls:CreateProject', 'tls:CreateTopic', 'tls:PutLogs'],
      Resource: '*',
    },
  ],
});

export const createIamOperations = (iamClient: IamSdkClient) => {
  const createAndAttachPolicy = async (roleName: string): Promise<string> => {
    const policyName = `${roleName}-policy`;

    try {
      await iamClient.fetchOpenAPI({
        Action: 'CreatePolicy',
        Version: '2024-01-01',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          PolicyName: policyName,
          PolicyDocument: VEFAAS_EXECUTION_POLICY,
          Description: `veFaaS execution policy for ${roleName}`,
        },
      });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'PolicyAlreadyExists' || error.code === 'Conflict') {
          logger.info(lang.__('IAM_POLICY_ALREADY_EXISTS', { policyName }));
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }

    try {
      await iamClient.fetchOpenAPI({
        Action: 'AttachRolePolicy',
        Version: '2024-01-01',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          RoleName: roleName,
          PolicyName: policyName,
          PolicyType: 'Custom',
        },
      });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'PolicyAlreadyAttached' || error.code === 'Conflict') {
          logger.info(lang.__('IAM_POLICY_ALREADY_ATTACHED', { policyName, roleName }));
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }

    return policyName;
  };

  const detachAndDeletePolicy = async (roleName: string): Promise<void> => {
    const policyName = `${roleName}-policy`;

    try {
      await iamClient.fetchOpenAPI({
        Action: 'DetachRolePolicy',
        Version: '2024-01-01',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          RoleName: roleName,
          PolicyName: policyName,
          PolicyType: 'Custom',
        },
      });
    } catch {
      // Ignore if policy is not attached
    }

    try {
      await iamClient.fetchOpenAPI({
        Action: 'DeletePolicy',
        Version: '2024-01-01',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          PolicyName: policyName,
          PolicyType: 'Custom',
        },
      });
    } catch {
      // Ignore if policy doesn't exist
    }
  };

  return {
    createRole: async (config: IamRoleConfig): Promise<IamRoleInfo> => {
      const roleName = config.roleName;
      const trustedServices =
        config.trustPolicy.Statement[0]?.Principal.Service || DEFAULT_TRUST_POLICY_SERVICES;
      const trustPolicyDocument = buildTrustPolicyDocument(trustedServices);

      try {
        const response = await iamClient.fetchOpenAPI({
          Action: 'CreateRole',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: {
            RoleName: roleName,
            TrustPolicyDocument: trustPolicyDocument,
            DisplayName: config.displayName,
            Description:
              config.description ?? `ServerlessInsight veFaaS execution role for ${roleName}`,
            MaxSessionDuration: config.maxSessionDuration ?? 3600,
          },
        });

        const data = (response.Result || {}) as Record<string, unknown>;
        const roleData = (data.Role || {}) as Record<string, unknown>;

        const policyName = await createAndAttachPolicy(roleName);

        logger.info(lang.__('IAM_ROLE_CREATED', { roleName }));

        return {
          roleName: roleData.RoleName as string | undefined,
          roleId: roleData.RoleId as string | undefined,
          trn: roleData.TRN as string | undefined,
          description: roleData.Description as string | undefined,
          createdTime: roleData.CreateTime as string | undefined,
          maxSessionDuration: roleData.MaxSessionDuration as number | undefined,
          trustPolicyDocument,
          policyName,
        };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'RoleAlreadyExists' || error.code === 'Conflict') {
            logger.info(lang.__('IAM_ROLE_ALREADY_EXISTS', { roleName }));

            try {
              const existingRole = await iamClient.fetchOpenAPI({
                Action: 'GetRole',
                Version: '2024-01-01',
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: { RoleName: roleName },
              });

              await iamClient.fetchOpenAPI({
                Action: 'UpdateTrustPolicy',
                Version: '2024-01-01',
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: {
                  RoleName: roleName,
                  TrustPolicyDocument: trustPolicyDocument,
                },
              });

              const policyName = await createAndAttachPolicy(roleName);

              const roleData = ((existingRole.Result || {}) as Record<string, unknown>)
                .Role as Record<string, unknown>;

              return {
                roleName: roleData?.RoleName as string | undefined,
                roleId: roleData?.RoleId as string | undefined,
                trn: roleData?.TRN as string | undefined,
                description: roleData?.Description as string | undefined,
                createdTime: roleData?.CreateTime as string | undefined,
                maxSessionDuration: roleData?.MaxSessionDuration as number | undefined,
                trustPolicyDocument,
                policyName,
              };
            } catch (recoveryError: unknown) {
              // eslint-disable-next-line preserve-caught-error
              throw new Error(
                lang.__('IAM_ROLE_DRIFT_RECOVERY_FAILED', {
                  roleName,
                  error:
                    recoveryError instanceof Error ? recoveryError.message : String(recoveryError),
                }),
              );
            }
          }
        }
        throw error;
      }
    },

    getRole: async (roleName: string): Promise<IamRoleInfo | null> => {
      try {
        const response = await iamClient.fetchOpenAPI({
          Action: 'GetRole',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { RoleName: roleName },
        });

        const roleData = ((response.Result || {}) as Record<string, unknown>).Role as Record<
          string,
          unknown
        >;

        if (!roleData) {
          return null;
        }

        return {
          roleName: roleData.RoleName as string | undefined,
          roleId: roleData.RoleId as string | undefined,
          trn: roleData.TRN as string | undefined,
          description: roleData.Description as string | undefined,
          createdTime: roleData.CreateTime as string | undefined,
          maxSessionDuration: roleData.MaxSessionDuration as number | undefined,
          trustPolicyDocument: roleData.TrustPolicyDocument as string | undefined,
          policyName: `${roleName}-policy`,
        };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'RoleNotFound' || error.code === 'NoSuchEntity') {
            return null;
          }
        }
        throw error;
      }
    },

    updateRoleTrustPolicy: async (
      roleName: string,
      trustPolicy: IamRoleConfig['trustPolicy'],
    ): Promise<void> => {
      const trustPolicyDocument = JSON.stringify(trustPolicy);

      try {
        await iamClient.fetchOpenAPI({
          Action: 'UpdateTrustPolicy',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: {
            RoleName: roleName,
            TrustPolicyDocument: trustPolicyDocument,
          },
        });

        logger.info(lang.__('IAM_ROLE_TRUST_POLICY_UPDATED', { roleName }));
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'RoleNotFound' || error.code === 'NoSuchEntity') {
            // eslint-disable-next-line preserve-caught-error
            throw new Error(lang.__('IAM_ROLE_NOT_FOUND_IN_CLOUD', { roleName }));
          }
        }
        throw error;
      }
    },

    deleteRole: async (roleName: string): Promise<void> => {
      await detachAndDeletePolicy(roleName);

      try {
        await iamClient.fetchOpenAPI({
          Action: 'DeleteRole',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { RoleName: roleName },
        });

        logger.info(lang.__('IAM_ROLE_DELETED', { roleName }));
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'RoleNotFound' || error.code === 'NoSuchEntity') {
            logger.warn(lang.__('IAM_ROLE_NOT_FOUND_IN_CLOUD', { roleName }));
            return;
          }
        }
        throw error;
      }
    },

    attachRolePolicy: async (
      roleName: string,
      policyName: string,
      policyType: 'System' | 'Custom',
    ): Promise<void> => {
      try {
        await iamClient.fetchOpenAPI({
          Action: 'AttachRolePolicy',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: {
            RoleName: roleName,
            PolicyName: policyName,
            PolicyType: policyType,
          },
        });

        logger.info(lang.__('IAM_POLICY_ATTACHED', { policyName, roleName }));
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'PolicyAlreadyAttached' || error.code === 'Conflict') {
            logger.info(lang.__('IAM_POLICY_ALREADY_ATTACHED', { policyName, roleName }));
            return;
          }
        }
        throw error;
      }
    },

    detachRolePolicy: async (roleName: string, policyName: string): Promise<void> => {
      try {
        await iamClient.fetchOpenAPI({
          Action: 'DetachRolePolicy',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: {
            RoleName: roleName,
            PolicyName: policyName,
            PolicyType: 'Custom',
          },
        });

        logger.info(lang.__('IAM_POLICY_DETACHED', { policyName, roleName }));
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'PolicyNotAttached' || error.code === 'NoSuchEntity')
        ) {
          return;
        }
        logger.warn(
          lang.__('IAM_POLICY_DETACH_FAILED', { policyName, roleName, error: String(error) }),
        );
      }
    },
  };
};

import * as tencentCam from 'tencentcloud-sdk-nodejs-cam';
import {
  mergePolicyStatements,
  parseBuiltInStatements,
  buildPolicyDocument,
} from '../iamStatements';
import type { IamStatement } from '../iamStatements';
import { logger } from '../logger';
import { lang } from '../../lang';
import type { CamRoleInfo } from './types';

type CamSdkClient = InstanceType<typeof tencentCam.cam.v20190116.Client>;

// SCF built-in execution policy (same idea as Aliyun's FC_EXECUTION_POLICY)
const SCF_EXECUTION_POLICY = JSON.stringify({
  Version: '2.0',
  Statement: [
    {
      Effect: 'Allow',
      Action: ['scf:InvokeFunction'],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: ['cls:logset:putlog', 'cls:logset:create*', 'cls:logset:get*'],
      Resource: '*',
    },
    {
      Effect: 'Allow',
      Action: ['cos:GetObject', 'cos:PutObject', 'cos:DeleteObject', 'cos:ListBucket'],
      Resource: '*',
    },
  ],
});

const SCF_EXECUTION_STATEMENTS = parseBuiltInStatements(SCF_EXECUTION_POLICY);

const mapToCamStatement = (stmt: IamStatement): Record<string, unknown> => {
  const result: Record<string, unknown> = {
    Effect: stmt.effect,
    Action: stmt.actions,
    Resource: stmt.resources,
  };
  if (stmt.sid) {
    result.Sid = stmt.sid;
  }
  return result;
};

const buildExecutionPolicy = (customStatements?: IamStatement[]): string => {
  const merged = mergePolicyStatements(
    SCF_EXECUTION_STATEMENTS,
    customStatements,
    mapToCamStatement,
  );
  return buildPolicyDocument(merged, { version: '2.0' });
};

const buildAssumeRolePolicy = (trustedServices: string[]): string =>
  JSON.stringify({
    Version: '2.0',
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

// Try to delete a policy by name. Tencent CAM DeletePolicy requires a numeric
// PolicyId, so we first list policies to find the ID by name.
const deletePolicyByName = async (camClient: CamSdkClient, policyName: string): Promise<void> => {
  try {
    const listResp = await camClient.ListPolicies({ Keyword: policyName, Scope: 'Local' });
    const found = listResp.List?.find((p) => p.PolicyName === policyName);
    if (found?.PolicyId) {
      await camClient.DeletePolicy({ PolicyId: [found.PolicyId] });
    }
  } catch {
    // Idempotent cleanup - best effort
  }
};

export const createCamOperations = (camClient: CamSdkClient) => {
  const attachPolicy = async (roleName: string, policyName: string): Promise<void> => {
    try {
      await camClient.AttachRolePolicy({
        PolicyName: policyName,
        AttachRoleName: roleName,
      });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        const code = String((error as Record<string, unknown>).code);
        if (code === 'InvalidParameter.AttachmentRoleAlreadyExist') {
          return; // Already attached - idempotent
        }
      }
      throw error;
    }
  };

  const detachPolicy = async (roleName: string, policyName: string): Promise<void> => {
    try {
      await camClient.DetachRolePolicy({
        PolicyName: policyName,
        DetachRoleName: roleName,
      });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        const code = String((error as Record<string, unknown>).code);
        if (
          code === 'ResourceNotFound.PolicyNotAttached' ||
          code === 'ResourceNotFound.RoleNotExist'
        ) {
          return; // Not found - idempotent
        }
      }
      throw error;
    }
  };

  return {
    createRole: async (
      roleName: string,
      trustedServices: string[],
      description?: string,
      customStatements?: IamStatement[],
      managedPolicies?: string[],
    ): Promise<CamRoleInfo> => {
      const assumeRolePolicy = buildAssumeRolePolicy(trustedServices);
      try {
        const response = await camClient.CreateRole({
          RoleName: roleName,
          PolicyDocument: assumeRolePolicy,
          Description: description ?? `ServerlessInsight SCF execution role for ${roleName}`,
        });

        // Build base role info; CreateRole only returns RoleId,
        // so get full info (including RoleArn) via GetRole
        const roleId = response.RoleId;
        let roleArn: string | undefined;
        try {
          const getResp = await camClient.GetRole({ RoleName: roleName });
          roleArn = getResp.RoleInfo?.RoleArn;
        } catch {
          // optional enrichment
        }

        const roleInfo: CamRoleInfo = {
          roleName,
          roleId,
          roleArn,
        };

        // Attach inline policy with built-in + custom statements
        const policyName = `${roleName}-policy`;
        try {
          await camClient.CreatePolicy({
            PolicyName: policyName,
            PolicyDocument: buildExecutionPolicy(customStatements),
            Description: `SCF execution policy for ${roleName}`,
          });
          await attachPolicy(roleName, policyName);
        } catch (error: unknown) {
          if (error && typeof error === 'object' && 'code' in error) {
            const code = String((error as Record<string, unknown>).code);
            if (code === 'InvalidParameter.PolicyAlreadyExist') {
              // Policy already exists - reuse it
              await attachPolicy(roleName, policyName);
            } else {
              throw error;
            }
          } else {
            throw error;
          }
        }

        // Attach managed policies
        if (managedPolicies && managedPolicies.length > 0) {
          for (const policyArn of managedPolicies) {
            await attachPolicy(roleName, policyArn);
          }
        }

        return { ...roleInfo, policyName };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          const code = String((error as Record<string, unknown>).code);
          if (code === 'InvalidParameter.RoleAlreadyExist') {
            logger.warn(lang.__('TENCENT_CAM_ROLE_ALREADY_EXISTS', { roleName }));
            // Try to get the role info
            try {
              const getResponse = await camClient.GetRole({ RoleName: roleName });
              const roleData = getResponse.RoleInfo;
              const policyName = `${roleName}-policy`;
              // Re-attach built-in policy (idempotent)
              try {
                await camClient.CreatePolicy({
                  PolicyName: policyName,
                  PolicyDocument: buildExecutionPolicy(customStatements),
                  Description: `SCF execution policy for ${roleName}`,
                });
                await attachPolicy(roleName, policyName);
              } catch {
                /* already exists */
              }
              // Re-attach managed policies
              if (managedPolicies && managedPolicies.length > 0) {
                for (const policyArn of managedPolicies) {
                  await attachPolicy(roleName, policyArn);
                }
              }
              return {
                roleName,
                roleId: roleData?.RoleId,
                roleArn: roleData?.RoleArn,
                policyName,
              };
            } catch (recoveryError: unknown) {
              // eslint-disable-next-line preserve-caught-error
              throw new Error(
                lang.__('TENCENT_CAM_ROLE_DRIFT_RECOVERY_FAILED', {
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

    getRole: async (roleName: string): Promise<CamRoleInfo | null> => {
      try {
        const response = await camClient.GetRole({ RoleName: roleName });
        const roleData = response.RoleInfo;
        if (!roleData) return null;
        return {
          roleName: roleData.RoleName,
          roleId: roleData.RoleId,
          roleArn: roleData.RoleArn,
          description: roleData.Description,
          policyName: `${roleName}-policy`,
        };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          const code = String((error as Record<string, unknown>).code);
          if (code === 'ResourceNotFound.RoleNotExist') return null;
        }
        throw error;
      }
    },

    deleteRole: async (roleName: string, managedPolicies?: string[]): Promise<void> => {
      const policyName = `${roleName}-policy`;

      // Detach managed policies first (don't delete them)
      if (managedPolicies && managedPolicies.length > 0) {
        for (const policyArn of managedPolicies) {
          await detachPolicy(roleName, policyArn);
        }
      }

      // Detach and delete inline policy
      await detachPolicy(roleName, policyName);
      await deletePolicyByName(camClient, policyName);

      // Delete role
      try {
        await camClient.DeleteRole({ RoleName: roleName });
        logger.info(lang.__('TENCENT_CAM_ROLE_DELETED', { roleName }));
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          const code = String((error as Record<string, unknown>).code);
          if (code === 'ResourceNotFound.RoleNotExist') return;
        }
        throw error;
      }
    },

    updateRolePolicy: async (
      roleName: string,
      customStatements?: IamStatement[],
    ): Promise<void> => {
      const policyName = `${roleName}-policy`;
      // Detach + delete old
      await detachPolicy(roleName, policyName);
      await deletePolicyByName(camClient, policyName);
      // Create + attach new
      try {
        await camClient.CreatePolicy({
          PolicyName: policyName,
          PolicyDocument: buildExecutionPolicy(customStatements),
          Description: `SCF execution policy for ${roleName}`,
        });
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          const code = String((error as Record<string, unknown>).code);
          if (code !== 'InvalidParameter.PolicyAlreadyExist') throw error;
        } else {
          throw error;
        }
      }
      await attachPolicy(roleName, policyName);
    },

    updateManagedPolicies: async (roleName: string, desiredPolicies: string[]): Promise<void> => {
      try {
        const response = await camClient.ListAttachedRolePolicies({
          RoleName: roleName,
          Page: 1,
          Rp: 200,
        });
        const currentPolicies = response.List ?? [];
        const currentNames = currentPolicies.map((p) => p.PolicyName ?? '');
        // Detach removed policies
        for (const current of currentNames) {
          if (current && !desiredPolicies.includes(current)) {
            await detachPolicy(roleName, current);
          }
        }
        // Attach new policies
        for (const desired of desiredPolicies) {
          if (!currentNames.includes(desired)) {
            await attachPolicy(roleName, desired);
          }
        }
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          const code = String((error as Record<string, unknown>).code);
          if (code === 'ResourceNotFound.RoleNotExist') return;
        }
        throw error;
      }
    },
  };
};

import EcsClient from '@alicloud/ecs20140526';
import * as ecs from '@alicloud/ecs20140526';
import { Context } from '../../types';
import { SecurityGroupInfo, SecurityGroupRule } from './types';
import { logger } from '../logger';

type EcsSdkClient = EcsClient;

export // ECS security group helpers
const securityGroupRangeMap: Record<string, string> = {
  TCP: '1/65535',
  UDP: '1/65535',
  ICMP: '-1/-1',
  GRE: '-1/-1',
  ALL: '-1/-1',
};

const transformPortRange = (protocol: string, portRange: string): string => {
  if (portRange.toUpperCase() === 'ALL') {
    return securityGroupRangeMap[protocol.toUpperCase()];
  }
  return portRange.includes('/') ? portRange : `${portRange}/${portRange}`;
};

const normalizeProtocol = (protocol: string): string => protocol.trim().toUpperCase();

export const parseSecurityGroupRule = (
  rule: string,
): { protocol: string; cidr: string; portRange: string } => {
  const [rawProtocol, second, third, ...rest] = rule.split(':');

  if (rest.length > 0 || !rawProtocol || !second || !third) {
    throw new Error(`Invalid security group rule format: ${rule}`);
  }

  const protocol = normalizeProtocol(rawProtocol);
  const secondTrimmed = second.trim();
  const thirdTrimmed = third.trim();

  if (!secondTrimmed || !thirdTrimmed) {
    throw new Error(`Invalid security group rule format: ${rule}`);
  }

  return { protocol, cidr: secondTrimmed, portRange: thirdTrimmed };
};

const isDuplicateSecurityGroupRuleError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false;
  }

  if (!('code' in error) || typeof error.code !== 'string') {
    return false;
  }

  const duplicateCodes = new Set([
    'InvalidPermission.Duplicate',
    'InvalidSecurityGroupRule.Duplicate',
    'SecurityRuleDuplicate',
  ]);

  return duplicateCodes.has(error.code);
};

export const createEcsOperations = (ecsClient: EcsSdkClient, context: Context) => {
  const operations = {
    createSecurityGroup: async (
      securityGroupName: string,
      vpcId: string,
      ingressRules: string[],
      egressRules: string[],
      description?: string,
    ): Promise<SecurityGroupInfo> => {
      const createRequest = new ecs.CreateSecurityGroupRequest({
        regionId: context.region,
        securityGroupName,
        vpcId,
        description: description ?? `ServerlessInsight security group for ${securityGroupName}`,
      });

      const response = await ecsClient.createSecurityGroup(createRequest);
      const securityGroupId = response.body?.securityGroupId;

      if (!securityGroupId) {
        throw new Error('Failed to create security group');
      }

      // Add ingress rules
      for (const rule of ingressRules) {
        let parsedRule: { protocol: string; cidr: string; portRange: string };
        try {
          parsedRule = parseSecurityGroupRule(rule);
        } catch (error) {
          logger.warn(`Skipping invalid ingress rule: ${rule}. ${String(error)}`);
          continue;
        }

        const ingressRequest = new ecs.AuthorizeSecurityGroupRequest({
          regionId: context.region,
          securityGroupId,
          ipProtocol: parsedRule.protocol.toLowerCase(),
          sourceCidrIp: parsedRule.cidr,
          portRange: transformPortRange(parsedRule.protocol, parsedRule.portRange),
        });
        try {
          await ecsClient.authorizeSecurityGroup(ingressRequest);
        } catch (error) {
          if (isDuplicateSecurityGroupRuleError(error)) {
            logger.debug(`Ingress rule already exists, skipping: ${rule}`);
            continue;
          }
          logger.warn(`Failed to add ingress rule: ${rule}. ${String(error)}`);
        }
      }

      // Add egress rules
      for (const rule of egressRules) {
        let parsedRule: { protocol: string; cidr: string; portRange: string };
        try {
          parsedRule = parseSecurityGroupRule(rule);
        } catch (error) {
          logger.warn(`Skipping invalid egress rule: ${rule}. ${String(error)}`);
          continue;
        }

        const egressRequest = new ecs.AuthorizeSecurityGroupEgressRequest({
          regionId: context.region,
          securityGroupId,
          ipProtocol: parsedRule.protocol.toLowerCase(),
          destCidrIp: parsedRule.cidr,
          portRange: transformPortRange(parsedRule.protocol, parsedRule.portRange),
        });
        try {
          await ecsClient.authorizeSecurityGroupEgress(egressRequest);
        } catch (error) {
          if (isDuplicateSecurityGroupRuleError(error)) {
            logger.debug(`Egress rule already exists, skipping: ${rule}`);
            continue;
          }
          logger.warn(`Failed to add egress rule: ${rule}. ${String(error)}`);
        }
      }

      const sg = await operations.getSecurityGroup(securityGroupId);
      if (!sg) {
        return {
          securityGroupId,
          securityGroupName,
          vpcId,
          description,
        };
      }
      return sg;
    },

    getSecurityGroupRules: async (
      securityGroupId: string,
    ): Promise<{ ingressRules: SecurityGroupRule[]; egressRules: SecurityGroupRule[] }> => {
      const ingressRules: SecurityGroupRule[] = [];
      const egressRules: SecurityGroupRule[] = [];

      try {
        const request = new ecs.DescribeSecurityGroupAttributeRequest({
          regionId: context.region,
          securityGroupId,
          direction: 'ingress',
        });
        const response = await ecsClient.describeSecurityGroupAttribute(request);

        if (response?.body?.permissions?.permission) {
          for (const perm of response.body.permissions.permission) {
            ingressRules.push({
              direction: 'ingress',
              ipProtocol: perm.ipProtocol ?? '',
              portRange: perm.portRange ?? '',
              sourceCidrIp: perm.sourceCidrIp,
              priority: perm.priority,
              policy: perm.policy,
              description: perm.description,
              ruleId: perm.ruleId,
            });
          }
        }
      } catch (error) {
        logger.debug(`Failed to get ingress rules: ${String(error)}`);
      }

      try {
        const request = new ecs.DescribeSecurityGroupAttributeRequest({
          regionId: context.region,
          securityGroupId,
          direction: 'egress',
        });
        const response = await ecsClient.describeSecurityGroupAttribute(request);

        if (response?.body?.permissions?.permission) {
          for (const perm of response.body.permissions.permission) {
            egressRules.push({
              direction: 'egress',
              ipProtocol: perm.ipProtocol ?? '',
              portRange: perm.portRange ?? '',
              destCidrIp: perm.destCidrIp,
              priority: perm.priority,
              policy: perm.policy,
              description: perm.description,
              ruleId: perm.ruleId,
            });
          }
        }
      } catch (error) {
        logger.debug(`Failed to get egress rules: ${String(error)}`);
      }

      return { ingressRules, egressRules };
    },

    getSecurityGroup: async (securityGroupId: string): Promise<SecurityGroupInfo | null> => {
      try {
        const request = new ecs.DescribeSecurityGroupsRequest({
          regionId: context.region,
          securityGroupId,
        });
        const response = await ecsClient.describeSecurityGroups(request);

        if (
          !response ||
          !response.body ||
          !response.body.securityGroups ||
          !response.body.securityGroups.securityGroup ||
          response.body.securityGroups.securityGroup.length === 0
        ) {
          return null;
        }

        const sg = response.body.securityGroups.securityGroup[0];

        const rules = await operations.getSecurityGroupRules(securityGroupId);

        return {
          securityGroupId: sg.securityGroupId ?? securityGroupId,
          securityGroupName: sg.securityGroupName,
          vpcId: sg.vpcId,
          description: sg.description,
          createTime: sg.creationTime,
          ingressRules: rules.ingressRules,
          egressRules: rules.egressRules,
        };
      } catch {
        return null;
      }
    },

    getSecurityGroupByName: async (
      securityGroupName: string,
      vpcId?: string,
    ): Promise<SecurityGroupInfo | null> => {
      try {
        const request = new ecs.DescribeSecurityGroupsRequest({
          regionId: context.region,
          securityGroupName,
          vpcId,
        });
        const response = await ecsClient.describeSecurityGroups(request);

        if (
          !response ||
          !response.body ||
          !response.body.securityGroups ||
          !response.body.securityGroups.securityGroup ||
          response.body.securityGroups.securityGroup.length === 0
        ) {
          return null;
        }

        const sg = response.body.securityGroups.securityGroup[0];
        const rules = await operations.getSecurityGroupRules(sg.securityGroupId!);

        return {
          securityGroupId: sg.securityGroupId!,
          securityGroupName: sg.securityGroupName,
          vpcId: sg.vpcId,
          description: sg.description,
          createTime: sg.creationTime,
          ingressRules: rules.ingressRules,
          egressRules: rules.egressRules,
        };
      } catch {
        return null;
      }
    },

    deleteSecurityGroup: async (securityGroupId: string): Promise<void> => {
      const request = new ecs.DeleteSecurityGroupRequest({
        regionId: context.region,
        securityGroupId,
      });

      await ecsClient.deleteSecurityGroup(request);
    },
  };

  return operations;
};

import EcsClient from '@alicloud/ecs20140526';
import * as ecs from '@alicloud/ecs20140526';
import { Context } from '../../types';
import { SecurityGroupInfo } from './types';
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

export const createEcsOperations = (ecsClient: EcsSdkClient, context: Context) => ({
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

    return {
      securityGroupId,
      securityGroupName,
      vpcId,
      description,
    };
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
      return {
        securityGroupId: sg.securityGroupId ?? securityGroupId,
        securityGroupName: sg.securityGroupName,
        vpcId: sg.vpcId,
        description: sg.description,
        createTime: sg.creationTime,
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
});

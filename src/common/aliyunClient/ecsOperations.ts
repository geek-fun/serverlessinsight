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

const createEcsOperations = (ecsClient: EcsSdkClient, context: Context) => ({
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
      const [protocol, cidrIp, portRange] = rule.split(':');
      const ingressRequest = new ecs.AuthorizeSecurityGroupRequest({
        regionId: context.region,
        securityGroupId,
        ipProtocol: protocol.toLowerCase(),
        sourceCidrIp: cidrIp,
        portRange: transformPortRange(protocol, portRange),
      });
      try {
        await ecsClient.authorizeSecurityGroup(ingressRequest);
      } catch {
        logger.warn(`Failed to add ingress rule: ${rule}`);
      }
    }

    // Add egress rules
    for (const rule of egressRules) {
      const [protocol, cidrIp, portRange] = rule.split(':');
      const egressRequest = new ecs.AuthorizeSecurityGroupEgressRequest({
        regionId: context.region,
        securityGroupId,
        ipProtocol: protocol.toLowerCase(),
        destCidrIp: cidrIp,
        portRange: transformPortRange(protocol, portRange),
      });
      try {
        await ecsClient.authorizeSecurityGroupEgress(egressRequest);
      } catch {
        logger.warn(`Failed to add egress rule: ${rule}`);
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

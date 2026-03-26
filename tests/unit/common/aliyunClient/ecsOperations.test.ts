import {
  createEcsOperations,
  parseSecurityGroupRule,
} from '../../../../src/common/aliyunClient/ecsOperations';
import { Context } from '../../../../src/types';
import { ProviderEnum } from '../../../../src/common/providerEnum';

const mockCreateSecurityGroup = jest.fn();
const mockAuthorizeSecurityGroup = jest.fn();
const mockAuthorizeSecurityGroupEgress = jest.fn();
const mockDescribeSecurityGroupAttribute = jest.fn();
const mockDescribeSecurityGroups = jest.fn();
const mockDeleteSecurityGroup = jest.fn();

const mockEcsClient = {
  createSecurityGroup: mockCreateSecurityGroup,
  authorizeSecurityGroup: mockAuthorizeSecurityGroup,
  authorizeSecurityGroupEgress: mockAuthorizeSecurityGroupEgress,
  describeSecurityGroupAttribute: mockDescribeSecurityGroupAttribute,
  describeSecurityGroups: mockDescribeSecurityGroups,
  deleteSecurityGroup: mockDeleteSecurityGroup,
} as unknown as Context;

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

describe('ecsOperations', () => {
  let operations: ReturnType<typeof createEcsOperations>;
  const mockContext: Partial<Context> = {
    region: 'cn-hangzhou',
    provider: ProviderEnum.ALIYUN,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    operations = createEcsOperations(mockEcsClient, mockContext as Context);
  });

  describe('parseSecurityGroupRule', () => {
    it('should parse basic TCP rule', () => {
      const result = parseSecurityGroupRule('TCP:192.168.1.0/24:80/80');
      expect(result).toEqual({
        protocol: 'TCP',
        cidr: '192.168.1.0/24',
        portRange: '80/80',
      });
    });

    it('should parse rule with case-insensitive protocol', () => {
      const result = parseSecurityGroupRule('tcp:192.168.1.0/24:80/80');
      expect(result).toEqual({
        protocol: 'TCP',
        cidr: '192.168.1.0/24',
        portRange: '80/80',
      });
    });

    it('should parse ICMP rule', () => {
      const result = parseSecurityGroupRule('ICMP:0.0.0.0/0:ALL');
      expect(result).toEqual({
        protocol: 'ICMP',
        cidr: '0.0.0.0/0',
        portRange: 'ALL',
      });
    });

    it('should trim whitespace in components', () => {
      const result = parseSecurityGroupRule('TCP: 192.168.1.0/24 : 80/80');
      expect(result).toEqual({
        protocol: 'TCP',
        cidr: '192.168.1.0/24',
        portRange: '80/80',
      });
    });

    it('should throw on invalid format', () => {
      expect(() => parseSecurityGroupRule('INVALID')).toThrow('Invalid security group rule format');
    });

    it('should throw with too many colons', () => {
      expect(() => parseSecurityGroupRule('TCP:192.168.1.0/24:80/80:extra')).toThrow(
        'Invalid security group rule format',
      );
    });
  });

  describe('createSecurityGroup', () => {
    it('should create security group with ingress and egress rules', async () => {
      mockCreateSecurityGroup.mockResolvedValue({
        body: {
          securityGroupId: 'sg-123',
        },
      });

      mockAuthorizeSecurityGroup.mockResolvedValue({});
      mockAuthorizeSecurityGroupEgress.mockResolvedValue({});

      mockDescribeSecurityGroupAttribute.mockResolvedValue({
        body: {
          permissions: {
            permission: [],
          },
        },
      });

      mockDescribeSecurityGroups.mockResolvedValue({
        body: {
          securityGroups: {
            securityGroup: [
              {
                securityGroupId: 'sg-123',
                securityGroupName: 'test-sg',
                vpcId: 'vpc-123',
              },
            ],
          },
        },
      });

      const result = await operations.createSecurityGroup(
        'test-sg',
        'vpc-123',
        ['TCP:192.168.1.0/24:80/80'],
        ['TCP:0.0.0.0/0:ALL'],
        'Test security group',
      );

      expect(result.securityGroupId).toBe('sg-123');
      expect(mockCreateSecurityGroup).toHaveBeenCalled();
      expect(mockAuthorizeSecurityGroup).toHaveBeenCalled();
      expect(mockAuthorizeSecurityGroupEgress).toHaveBeenCalled();
    });

    it('should throw if security group ID is not returned', async () => {
      mockCreateSecurityGroup.mockResolvedValue({ body: {} });

      await expect(operations.createSecurityGroup('test-sg', 'vpc-123', [], [])).rejects.toThrow(
        'Failed to create security group',
      );
    });

    it('should skip invalid ingress rules', async () => {
      mockCreateSecurityGroup.mockResolvedValue({
        body: {
          securityGroupId: 'sg-123',
        },
      });

      mockAuthorizeSecurityGroup.mockResolvedValue({});
      mockAuthorizeSecurityGroupEgress.mockResolvedValue({});

      mockDescribeSecurityGroupAttribute.mockResolvedValue({
        body: {
          permissions: {
            permission: [],
          },
        },
      });

      mockDescribeSecurityGroups.mockResolvedValue({
        body: {
          securityGroups: {
            securityGroup: [
              {
                securityGroupId: 'sg-123',
                securityGroupName: 'test-sg',
                vpcId: 'vpc-123',
              },
            ],
          },
        },
      });

      const result = await operations.createSecurityGroup(
        'test-sg',
        'vpc-123',
        ['INVALID', 'TCP:192.168.1.0/24:80/80'],
        [],
      );

      expect(result.securityGroupId).toBe('sg-123');
      expect(mockAuthorizeSecurityGroup).toHaveBeenCalledTimes(1);
    });

    it('should handle duplicate rule errors', async () => {
      mockCreateSecurityGroup.mockResolvedValue({
        body: {
          securityGroupId: 'sg-123',
        },
      });

      const dupError = new Error('InvalidPermission.Duplicate');
      Object.assign(dupError, { code: 'InvalidPermission.Duplicate' });
      mockAuthorizeSecurityGroup.mockRejectedValue(dupError);

      mockDescribeSecurityGroupAttribute.mockResolvedValue({
        body: {
          permissions: {
            permission: [],
          },
        },
      });

      mockDescribeSecurityGroups.mockResolvedValue({
        body: {
          securityGroups: {
            securityGroup: [
              {
                securityGroupId: 'sg-123',
                securityGroupName: 'test-sg',
                vpcId: 'vpc-123',
              },
            ],
          },
        },
      });

      const result = await operations.createSecurityGroup(
        'test-sg',
        'vpc-123',
        ['TCP:192.168.1.0/24:80/80'],
        [],
      );

      expect(result.securityGroupId).toBe('sg-123');
    });
  });

  describe('getSecurityGroup', () => {
    it('should get security group with rules', async () => {
      mockDescribeSecurityGroups.mockResolvedValue({
        body: {
          securityGroups: {
            securityGroup: [
              {
                securityGroupId: 'sg-123',
                securityGroupName: 'test-sg',
                vpcId: 'vpc-123',
                description: 'Test security group',
              },
            ],
          },
        },
      });

      mockDescribeSecurityGroupAttribute.mockResolvedValue({
        body: {
          permissions: {
            permission: [
              {
                ipProtocol: 'tcp',
                portRange: '80/80',
                sourceCidrIp: '192.168.1.0/24',
                priority: 1,
                policy: 'accept',
              },
            ],
          },
        },
      });

      const result = await operations.getSecurityGroup('sg-123');

      expect(result).toBeDefined();
      expect(result?.securityGroupId).toBe('sg-123');
      expect(result?.securityGroupName).toBe('test-sg');
      expect(result?.ingressRules).toHaveLength(1);
    });

    it('should return null when security group not found', async () => {
      mockDescribeSecurityGroups.mockResolvedValue({
        body: {
          securityGroups: {
            securityGroup: [],
          },
        },
      });

      const result = await operations.getSecurityGroup('sg-nonexistent');

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      mockDescribeSecurityGroups.mockRejectedValue(new Error('InternalError'));

      const result = await operations.getSecurityGroup('sg-123');

      expect(result).toBeNull();
    });
  });

  describe('getSecurityGroupByName', () => {
    it('should get security group by name', async () => {
      mockDescribeSecurityGroups.mockResolvedValue({
        body: {
          securityGroups: {
            securityGroup: [
              {
                securityGroupId: 'sg-123',
                securityGroupName: 'test-sg',
                vpcId: 'vpc-123',
              },
            ],
          },
        },
      });

      mockDescribeSecurityGroupAttribute.mockResolvedValue({
        body: {
          permissions: {
            permission: [],
          },
        },
      });

      const result = await operations.getSecurityGroupByName('test-sg', 'vpc-123');

      expect(result?.securityGroupId).toBe('sg-123');
      expect(result?.securityGroupName).toBe('test-sg');
    });

    it('should return null when not found', async () => {
      mockDescribeSecurityGroups.mockResolvedValue({
        body: {
          securityGroups: {
            securityGroup: [],
          },
        },
      });

      const result = await operations.getSecurityGroupByName('nonexistent', 'vpc-123');

      expect(result).toBeNull();
    });
  });

  describe('deleteSecurityGroup', () => {
    it('should delete security group', async () => {
      mockDeleteSecurityGroup.mockResolvedValue({});

      await operations.deleteSecurityGroup('sg-123');

      expect(mockDeleteSecurityGroup).toHaveBeenCalledWith(
        expect.objectContaining({
          regionId: 'cn-hangzhou',
          securityGroupId: 'sg-123',
        }),
      );
    });

    it('should throw on deletion failure', async () => {
      mockDeleteSecurityGroup.mockRejectedValue(new Error('InUse'));

      await expect(operations.deleteSecurityGroup('sg-123')).rejects.toThrow('InUse');
    });
  });

  describe('getSecurityGroupRules', () => {
    it('should get both ingress and egress rules', async () => {
      mockDescribeSecurityGroupAttribute.mockResolvedValue({
        body: {
          permissions: {
            permission: [
              {
                direction: 'ingress',
                ipProtocol: 'tcp',
                portRange: '80/80',
                sourceCidrIp: '0.0.0.0/0',
                priority: 1,
                policy: 'accept',
              },
            ],
          },
        },
      });

      const result = await operations.getSecurityGroupRules('sg-123');

      expect(result.ingressRules).toBeDefined();
      expect(result.egressRules).toBeDefined();
    });
  });
});

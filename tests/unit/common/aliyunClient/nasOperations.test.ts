import { createNasOperations } from '../../../../src/common/aliyunClient/nasOperations';
import { NasStorageClassEnum } from '../../../../src/types';

const mockCreateAccessGroup = jest.fn();
const mockDescribeAccessGroups = jest.fn();
const mockDeleteAccessGroup = jest.fn();
const mockCreateAccessRule = jest.fn();
const mockCreateFileSystem = jest.fn();
const mockDescribeFileSystems = jest.fn();
const mockDeleteFileSystem = jest.fn();
const mockCreateMountTarget = jest.fn();
const mockDescribeMountTargets = jest.fn();
const mockDeleteMountTarget = jest.fn();

const mockNasClient = {
  createAccessGroup: mockCreateAccessGroup,
  describeAccessGroups: mockDescribeAccessGroups,
  deleteAccessGroup: mockDeleteAccessGroup,
  createAccessRule: mockCreateAccessRule,
  createFileSystem: mockCreateFileSystem,
  describeFileSystems: mockDescribeFileSystems,
  deleteFileSystem: mockDeleteFileSystem,
  createMountTarget: mockCreateMountTarget,
  describeMountTargets: mockDescribeMountTargets,
  deleteMountTarget: mockDeleteMountTarget,
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

describe('nasOperations', () => {
  let operations: ReturnType<typeof createNasOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    operations = createNasOperations(mockNasClient);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('createAccessGroup', () => {
    it('should create access group with default type', async () => {
      mockCreateAccessGroup.mockResolvedValue({});

      const result = await operations.createAccessGroup('test-ag');

      expect(result).toBeDefined();
      expect(result.accessGroupName).toBe('test-ag');
      expect(result.accessGroupType).toBe('Vpc');
      expect(mockCreateAccessGroup).toHaveBeenCalledWith(
        expect.objectContaining({
          accessGroupName: 'test-ag',
          accessGroupType: 'Vpc',
        }),
      );
    });

    it('should create access group with custom type', async () => {
      mockCreateAccessGroup.mockResolvedValue({});

      const result = await operations.createAccessGroup('test-ag', 'Classic');

      expect(result.accessGroupType).toBe('Classic');
      expect(mockCreateAccessGroup).toHaveBeenCalledWith(
        expect.objectContaining({
          accessGroupType: 'Classic',
        }),
      );
    });

    it('should throw on creation error', async () => {
      mockCreateAccessGroup.mockRejectedValue(new Error('NameNotUnique'));

      await expect(operations.createAccessGroup('test-ag')).rejects.toThrow('NameNotUnique');
    });
  });

  describe('getAccessGroup', () => {
    it('should get access group', async () => {
      mockDescribeAccessGroups.mockResolvedValue({
        body: {
          accessGroups: {
            accessGroup: [
              {
                accessGroupName: 'test-ag',
                accessGroupType: 'Vpc',
                ruleCount: 5,
              },
            ],
          },
        },
      });

      const result = await operations.getAccessGroup('test-ag');

      expect(result).toBeDefined();
      expect(result?.accessGroupName).toBe('test-ag');
      expect(result?.accessGroupType).toBe('Vpc');
      expect(result?.ruleCount).toBe(5);
    });

    it('should return null when access group not found', async () => {
      mockDescribeAccessGroups.mockResolvedValue({
        body: {
          accessGroups: {
            accessGroup: [],
          },
        },
      });

      const result = await operations.getAccessGroup('nonexistent');

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      mockDescribeAccessGroups.mockRejectedValue(new Error('InternalError'));

      const result = await operations.getAccessGroup('test-ag');

      expect(result).toBeNull();
    });
  });

  describe('deleteAccessGroup', () => {
    it('should delete access group', async () => {
      mockDeleteAccessGroup.mockResolvedValue({});

      await operations.deleteAccessGroup('test-ag');

      expect(mockDeleteAccessGroup).toHaveBeenCalledWith(
        expect.objectContaining({
          accessGroupName: 'test-ag',
        }),
      );
    });

    it('should throw on deletion error', async () => {
      mockDeleteAccessGroup.mockRejectedValue(new Error('InUse'));

      await expect(operations.deleteAccessGroup('test-ag')).rejects.toThrow('InUse');
    });
  });

  describe('createAccessRule', () => {
    it('should create access rule', async () => {
      mockCreateAccessRule.mockResolvedValue({});

      const result = await operations.createAccessRule('test-ag', '192.168.0.0/16');

      expect(result).toBeDefined();
      expect(result.accessGroupName).toBe('test-ag');
      expect(result.sourceCidrIp).toBe('192.168.0.0/16');
      expect(result.rwAccessType).toBe('RDWR');
      expect(result.userAccessType).toBe('no_squash');
      expect(result.priority).toBe(1);
    });

    it('should throw on creation error', async () => {
      mockCreateAccessRule.mockRejectedValue(new Error('InvalidIp.Format'));

      await expect(operations.createAccessRule('test-ag', 'invalid-ip')).rejects.toThrow(
        'InvalidIp.Format',
      );
    });
  });

  describe('createFileSystem', () => {
    it('should create standard capacity file system', async () => {
      mockCreateFileSystem.mockResolvedValue({
        body: {
          fileSystemId: 'fs-123',
        },
      });

      mockDescribeFileSystems.mockResolvedValue({
        body: {
          fileSystems: {
            fileSystem: [
              {
                fileSystemId: 'fs-123',
                fileSystemType: 'standard',
                storageType: 'Capacity',
                protocolType: 'NFS',
                status: 'Running',
              },
            ],
          },
        },
      });

      const result = await operations.createFileSystem(
        NasStorageClassEnum.STANDARD_CAPACITY,
        'test-function',
      );

      expect(result).toBeDefined();
      expect(result.fileSystemId).toBe('fs-123');
      expect(result.fileSystemType).toBe('standard');
      expect(result.storageType).toBe('Capacity');
    });

    it('should create extreme performance file system', async () => {
      mockCreateFileSystem.mockResolvedValue({
        body: {
          fileSystemId: 'fs-456',
        },
      });

      mockDescribeFileSystems.mockResolvedValue({
        body: {
          fileSystems: {
            fileSystem: [
              {
                fileSystemId: 'fs-456',
                fileSystemType: 'extreme',
                storageType: 'advance',
                protocolType: 'NFS',
                status: 'Running',
              },
            ],
          },
        },
      });

      const result = await operations.createFileSystem(
        NasStorageClassEnum.EXTREME_ADVANCE,
        'test-function',
      );

      expect(result.fileSystemType).toBe('extreme');
      expect(result.storageType).toBe('advance');
    });

    it('should throw if no file system ID returned', async () => {
      mockCreateFileSystem.mockResolvedValue({ body: {} });

      await expect(
        operations.createFileSystem(NasStorageClassEnum.STANDARD_CAPACITY, 'test-function'),
      ).rejects.toThrow('Failed to create NAS file system');
    });

    it('should wait for file system to be running', async () => {
      mockCreateFileSystem.mockResolvedValue({
        body: {
          fileSystemId: 'fs-123',
        },
      });

      mockDescribeFileSystems.mockResolvedValue({
        body: {
          fileSystems: {
            fileSystem: [
              {
                fileSystemId: 'fs-123',
                fileSystemType: 'standard',
                storageType: 'Capacity',
                protocolType: 'NFS',
                status: 'Running',
              },
            ],
          },
        },
      });

      const result = await operations.createFileSystem(
        NasStorageClassEnum.STANDARD_CAPACITY,
        'test-function',
      );
      expect(result).toBeDefined();
    });
  });

  describe('getFileSystem', () => {
    it('should get file system', async () => {
      mockDescribeFileSystems.mockResolvedValue({
        body: {
          fileSystems: {
            fileSystem: [
              {
                fileSystemId: 'fs-123',
                fileSystemType: 'standard',
                storageType: 'Capacity',
                protocolType: 'NFS',
                status: 'Running',
                createTime: '2023-01-01T00:00:00Z',
                description: 'Test file system',
              },
            ],
          },
        },
      });

      const result = await operations.getFileSystem('fs-123');

      expect(result).toBeDefined();
      expect(result?.fileSystemId).toBe('fs-123');
      expect(result?.status).toBe('Running');
    });

    it('should return null when not found', async () => {
      mockDescribeFileSystems.mockResolvedValue({
        body: {
          fileSystems: {
            fileSystem: [],
          },
        },
      });

      const result = await operations.getFileSystem('nonexistent');

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      mockDescribeFileSystems.mockRejectedValue(new Error('InternalError'));

      const result = await operations.getFileSystem('fs-123');

      expect(result).toBeNull();
    });
  });

  describe('deleteFileSystem', () => {
    it('should delete file system', async () => {
      mockDeleteFileSystem.mockResolvedValue({});

      await operations.deleteFileSystem('fs-123');

      expect(mockDeleteFileSystem).toHaveBeenCalledWith(
        expect.objectContaining({
          fileSystemId: 'fs-123',
        }),
      );
    });

    it('should throw on deletion error', async () => {
      mockDeleteFileSystem.mockRejectedValue(new Error('HasMountTarget'));

      await expect(operations.deleteFileSystem('fs-123')).rejects.toThrow('HasMountTarget');
    });
  });

  describe('createMountTarget', () => {
    it('should create mount target', async () => {
      mockCreateMountTarget.mockResolvedValue({
        body: {
          mountTargetDomain: 'fs-123.cn-hangzhou.nas.aliyuncs.com',
        },
      });

      mockDescribeMountTargets.mockResolvedValue({
        body: {
          mountTargets: {
            mountTarget: [
              {
                mountTargetDomain: 'fs-123.cn-hangzhou.nas.aliyuncs.com',
                vpcId: 'vpc-123',
                vswId: 'vsw-456',
                accessGroup: 'test-ag',
                status: 'Active',
              },
            ],
          },
        },
      });

      const result = await operations.createMountTarget('fs-123', 'test-ag', 'vpc-123', 'vsw-456');

      expect(result).toBeDefined();
      expect(result.mountTargetDomain).toBe('fs-123.cn-hangzhou.nas.aliyuncs.com');
      expect(result.fileSystemId).toBe('fs-123');
      expect(result.vpcId).toBe('vpc-123');
    });

    it('should throw if mount target domain not returned', async () => {
      mockCreateMountTarget.mockResolvedValue({ body: {} });

      await expect(
        operations.createMountTarget('fs-123', 'test-ag', 'vpc-123', 'vsw-456'),
      ).rejects.toThrow('Failed to create NAS mount target');
    });

    it('should wait for mount target to be active', async () => {
      mockCreateMountTarget.mockResolvedValue({
        body: {
          mountTargetDomain: 'fs-123.cn-hangzhou.nas.aliyuncs.com',
        },
      });

      mockDescribeMountTargets.mockResolvedValue({
        body: {
          mountTargets: {
            mountTarget: [
              {
                mountTargetDomain: 'fs-123.cn-hangzhou.nas.aliyuncs.com',
                vpcId: 'vpc-123',
                vswId: 'vsw-456',
                accessGroup: 'test-ag',
                status: 'Active',
              },
            ],
          },
        },
      });

      const result = await operations.createMountTarget('fs-123', 'test-ag', 'vpc-123', 'vsw-456');
      expect(result).toBeDefined();
    });
  });

  describe('getMountTarget', () => {
    it('should get mount target', async () => {
      mockDescribeMountTargets.mockResolvedValue({
        body: {
          mountTargets: {
            mountTarget: [
              {
                mountTargetDomain: 'fs-123.cn-hangzhou.nas.aliyuncs.com',
                vpcId: 'vpc-123',
                vswId: 'vsw-456',
                accessGroup: 'test-ag',
                status: 'Active',
              },
            ],
          },
        },
      });

      const result = await operations.getMountTarget(
        'fs-123',
        'fs-123.cn-hangzhou.nas.aliyuncs.com',
      );

      expect(result).toBeDefined();
      expect(result?.mountTargetDomain).toBe('fs-123.cn-hangzhou.nas.aliyuncs.com');
      expect(result?.status).toBe('Active');
    });

    it('should return null when not found', async () => {
      mockDescribeMountTargets.mockResolvedValue({
        body: {
          mountTargets: {
            mountTarget: [],
          },
        },
      });

      const result = await operations.getMountTarget('fs-123', 'nonexistent');

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      mockDescribeMountTargets.mockRejectedValue(new Error('InternalError'));

      const result = await operations.getMountTarget(
        'fs-123',
        'fs-123.cn-hangzhou.nas.aliyuncs.com',
      );

      expect(result).toBeNull();
    });
  });

  describe('deleteMountTarget', () => {
    it('should delete mount target', async () => {
      mockDeleteMountTarget.mockResolvedValue({});

      await operations.deleteMountTarget('fs-123', 'fs-123.cn-hangzhou.nas.aliyuncs.com');

      expect(mockDeleteMountTarget).toHaveBeenCalledWith(
        expect.objectContaining({
          fileSystemId: 'fs-123',
          mountTargetDomain: 'fs-123.cn-hangzhou.nas.aliyuncs.com',
        }),
      );
    });

    it('should throw on deletion error', async () => {
      mockDeleteMountTarget.mockRejectedValue(new Error('TargetNotFound'));

      await expect(operations.deleteMountTarget('fs-123', 'invalid')).rejects.toThrow(
        'TargetNotFound',
      );
    });
  });
});

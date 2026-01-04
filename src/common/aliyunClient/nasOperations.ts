import NasClient from '@alicloud/nas20170626';
import * as nas from '@alicloud/nas20170626';
import { NasStorageClassEnum } from '../../types';
import { NasFileSystemInfo, NasMountTargetInfo, NasAccessGroupInfo } from './types';

type NasSdkClient = NasClient;

const storageClassMap: Record<
  NasStorageClassEnum,
  { fileSystemType: string; storageType: string }
> = {
  [NasStorageClassEnum.STANDARD_CAPACITY]: { fileSystemType: 'standard', storageType: 'Capacity' },
  [NasStorageClassEnum.STANDARD_PERFORMANCE]: {
    fileSystemType: 'standard',
    storageType: 'Performance',
  },
  [NasStorageClassEnum.EXTREME_STANDARD]: { fileSystemType: 'extreme', storageType: 'standard' },
  [NasStorageClassEnum.EXTREME_ADVANCE]: { fileSystemType: 'extreme', storageType: 'advance' },
};

export const createNasOperations = (nasClient: NasSdkClient) => {
  const operations = {
    createAccessGroup: async (
      accessGroupName: string,
      accessGroupType: string = 'Vpc',
    ): Promise<NasAccessGroupInfo> => {
      const request = new nas.CreateAccessGroupRequest({
        accessGroupName,
        accessGroupType,
      });

      await nasClient.createAccessGroup(request);

      return {
        accessGroupName,
        accessGroupType,
      };
    },

    getAccessGroup: async (accessGroupName: string): Promise<NasAccessGroupInfo | null> => {
      try {
        const request = new nas.DescribeAccessGroupsRequest({
          accessGroupName,
        });
        const response = await nasClient.describeAccessGroups(request);

        if (
          !response ||
          !response.body ||
          !response.body.accessGroups ||
          !response.body.accessGroups.accessGroup ||
          response.body.accessGroups.accessGroup.length === 0
        ) {
          return null;
        }

        const ag = response.body.accessGroups.accessGroup[0];
        return {
          accessGroupName: ag.accessGroupName ?? accessGroupName,
          accessGroupType: ag.accessGroupType,
          ruleCount: ag.ruleCount,
        };
      } catch {
        return null;
      }
    },

    deleteAccessGroup: async (accessGroupName: string): Promise<void> => {
      const request = new nas.DeleteAccessGroupRequest({
        accessGroupName,
      });

      await nasClient.deleteAccessGroup(request);
    },

    createAccessRule: async (accessGroupName: string, sourceCidrIp: string): Promise<void> => {
      const request = new nas.CreateAccessRuleRequest({
        accessGroupName,
        sourceCidrIp,
        RWAccessType: 'RDWR',
        userAccessType: 'no_squash',
        priority: 1,
      });

      await nasClient.createAccessRule(request);
    },

    createFileSystem: async (
      storageClass: NasStorageClassEnum,
      functionName: string,
    ): Promise<NasFileSystemInfo> => {
      const { fileSystemType, storageType } = storageClassMap[storageClass];

      const request = new nas.CreateFileSystemRequest({
        fileSystemType,
        storageType,
        protocolType: 'NFS',
        description: `ServerlessInsight NAS for ${functionName}`,
      });

      const response = await nasClient.createFileSystem(request);
      const fileSystemId = response.body?.fileSystemId;

      if (!fileSystemId) {
        throw new Error('Failed to create NAS file system');
      }

      // Wait for file system to be ready
      let retries = 0;
      while (retries < 30) {
        const fs = await operations.getFileSystem(fileSystemId);
        if (fs && fs.status === 'Running') {
          return fs;
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
        retries++;
      }

      return {
        fileSystemId,
        fileSystemType,
        storageType,
        protocolType: 'NFS',
      };
    },

    getFileSystem: async (fileSystemId: string): Promise<NasFileSystemInfo | null> => {
      try {
        const request = new nas.DescribeFileSystemsRequest({
          fileSystemId,
        });
        const response = await nasClient.describeFileSystems(request);

        if (
          !response ||
          !response.body ||
          !response.body.fileSystems ||
          !response.body.fileSystems.fileSystem ||
          response.body.fileSystems.fileSystem.length === 0
        ) {
          return null;
        }

        const fs = response.body.fileSystems.fileSystem[0];
        return {
          fileSystemId: fs.fileSystemId ?? fileSystemId,
          fileSystemType: fs.fileSystemType,
          storageType: fs.storageType,
          protocolType: fs.protocolType,
          status: fs.status,
          createTime: fs.createTime,
        };
      } catch {
        return null;
      }
    },

    deleteFileSystem: async (fileSystemId: string): Promise<void> => {
      const request = new nas.DeleteFileSystemRequest({
        fileSystemId,
      });

      await nasClient.deleteFileSystem(request);
    },

    createMountTarget: async (
      fileSystemId: string,
      accessGroupName: string,
      vpcId: string,
      vSwitchId: string,
    ): Promise<NasMountTargetInfo> => {
      const request = new nas.CreateMountTargetRequest({
        fileSystemId,
        accessGroupName,
        networkType: 'Vpc',
        vpcId,
        vSwitchId,
      });

      const response = await nasClient.createMountTarget(request);
      const mountTargetDomain = response.body?.mountTargetDomain;

      if (!mountTargetDomain) {
        throw new Error('Failed to create NAS mount target');
      }

      // Wait for mount target to be ready
      let retries = 0;
      while (retries < 30) {
        const mt = await operations.getMountTarget(fileSystemId, mountTargetDomain);
        if (mt && mt.status === 'Active') {
          return mt;
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
        retries++;
      }

      return {
        mountTargetDomain,
        fileSystemId,
        vpcId,
        vSwitchId,
        accessGroupName,
      };
    },

    getMountTarget: async (
      fileSystemId: string,
      mountTargetDomain: string,
    ): Promise<NasMountTargetInfo | null> => {
      try {
        const request = new nas.DescribeMountTargetsRequest({
          fileSystemId,
          mountTargetDomain,
        });
        const response = await nasClient.describeMountTargets(request);

        if (
          !response ||
          !response.body ||
          !response.body.mountTargets ||
          !response.body.mountTargets.mountTarget ||
          response.body.mountTargets.mountTarget.length === 0
        ) {
          return null;
        }

        const mt = response.body.mountTargets.mountTarget[0];
        return {
          mountTargetDomain: mt.mountTargetDomain ?? mountTargetDomain,
          fileSystemId,
          vpcId: mt.vpcId,
          vSwitchId: mt.vswId,
          accessGroupName: mt.accessGroup,
          status: mt.status,
        };
      } catch {
        return null;
      }
    },

    deleteMountTarget: async (fileSystemId: string, mountTargetDomain: string): Promise<void> => {
      const request = new nas.DeleteMountTargetRequest({
        fileSystemId,
        mountTargetDomain,
      });

      await nasClient.deleteMountTarget(request);
    },
  };

  return operations;
};

import { Context, FunctionDomain } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { logger } from '../../common/logger';

// Combined function to create all dependent resources
export const createDependentResources = async (
  context: Context,
  fn: FunctionDomain,
  serviceName: string,
): Promise<{
  logConfig?: { project: string; logstore: string };
  role?: { roleName: string; arn: string };
  securityGroup?: { securityGroupId: string };
  nasConfig?: {
    mountPoints: Array<{
      serverAddr: string;
      mountDir: string;
      fileSystemId: string;
      mountTargetDomain: string;
      accessGroupName: string;
    }>;
  };
  instances: Array<{
    type: string;
    id: string;
    arn?: string;
    attributes: Record<string, unknown>;
  }>;
}> => {
  const client = createAliyunClient(context);
  const instances: Array<{
    type: string;
    id: string;
    arn?: string;
    attributes: Record<string, unknown>;
  }> = [];
  let logConfig: { project: string; logstore: string } | undefined;
  let securityGroup: { securityGroupId: string } | undefined;
  let nasConfig:
    | {
        mountPoints: Array<{
          serverAddr: string;
          mountDir: string;
          fileSystemId: string;
          mountTargetDomain: string;
          accessGroupName: string;
        }>;
      }
    | undefined;

  // Create SLS resources if logging is enabled
  if (fn.log) {
    const projectName = `${serviceName}-sls`;
    const logstoreName = `${serviceName}-sls-logstore`;

    logger.info(`Creating SLS project: ${projectName}`);
    const project = await client.sls.createProject(projectName);
    instances.push({
      type: 'ALIYUN_SLS_PROJECT',
      id: projectName,
      attributes: { ...project },
    });

    logger.info(`Creating SLS logstore: ${logstoreName}`);
    const logstore = await client.sls.createLogstore(projectName, logstoreName);
    instances.push({
      type: 'ALIYUN_SLS_LOGSTORE',
      id: `${projectName}/${logstoreName}`,
      attributes: { ...logstore },
    });

    logger.info(`Creating SLS index for: ${logstoreName}`);
    const index = await client.sls.createIndex(projectName, logstoreName);
    instances.push({
      type: 'ALIYUN_SLS_INDEX',
      id: `${projectName}/${logstoreName}/index`,
      attributes: { ...index },
    });

    logConfig = { project: projectName, logstore: logstoreName };
  }

  // Create RAM role
  const roleName = `${serviceName}-fc-role`;
  logger.info(`Creating RAM role: ${roleName}`);
  const ramRole = await client.ram.createRole(roleName);
  instances.push({
    type: 'ALIYUN_RAM_ROLE',
    id: roleName,
    arn: ramRole.arn,
    attributes: { ...ramRole },
  });
  const role = { roleName, arn: ramRole.arn ?? `acs:ram::${context.accountId}:role/${roleName}` };

  // Create security group if network is configured
  if (fn.network) {
    const sgName = fn.network.security_group.name;
    logger.info(`Creating security group: ${sgName}`);
    const sg = await client.ecs.createSecurityGroup(
      sgName,
      fn.network.vpc_id,
      fn.network.security_group.ingress,
      fn.network.security_group.egress,
    );
    instances.push({
      type: 'ALIYUN_ECS_SECURITY_GROUP',
      id: sg.securityGroupId,
      attributes: { ...sg },
    });
    securityGroup = { securityGroupId: sg.securityGroupId };
  }

  // Create NAS resources if configured
  if (fn.storage?.nas && fn.storage.nas.length > 0 && fn.network) {
    const mountPoints: Array<{
      serverAddr: string;
      mountDir: string;
      fileSystemId: string;
      mountTargetDomain: string;
      accessGroupName: string;
    }> = [];

    for (const nasItem of fn.storage.nas) {
      const mountPath = nasItem.mount_path.replace(/\//g, '-').replace(/^-/, '');
      const accessGroupName = `${fn.name}-nas-access-${mountPath}`;

      logger.info(`Creating NAS access group: ${accessGroupName}`);
      const accessGroup = await client.nas.createAccessGroup(accessGroupName);
      instances.push({
        type: 'ALIYUN_NAS_ACCESS_GROUP',
        id: accessGroupName,
        attributes: { ...accessGroup },
      });

      logger.info(`Creating NAS access rule for: ${accessGroupName}`);
      await client.nas.createAccessRule(accessGroupName, '10.0.0.0/8');

      logger.info(`Creating NAS file system for: ${fn.name}`);
      const fileSystem = await client.nas.createFileSystem(nasItem.storage_class, fn.name);
      instances.push({
        type: 'ALIYUN_NAS_FILE_SYSTEM',
        id: fileSystem.fileSystemId,
        attributes: { ...fileSystem },
      });

      logger.info(`Creating NAS mount target for: ${fileSystem.fileSystemId}`);
      const mountTarget = await client.nas.createMountTarget(
        fileSystem.fileSystemId,
        accessGroupName,
        fn.network.vpc_id,
        fn.network.subnet_ids[0],
      );
      instances.push({
        type: 'ALIYUN_NAS_MOUNT_TARGET',
        id: `${fileSystem.fileSystemId}/${mountTarget.mountTargetDomain}`,
        attributes: { ...mountTarget },
      });

      mountPoints.push({
        serverAddr: `${mountTarget.mountTargetDomain}:/`,
        mountDir: nasItem.mount_path,
        fileSystemId: fileSystem.fileSystemId,
        mountTargetDomain: mountTarget.mountTargetDomain,
        accessGroupName,
      });
    }

    nasConfig = { mountPoints };
  }

  return {
    logConfig,
    role,
    securityGroup,
    nasConfig,
    instances,
  };
};

// Delete all dependent resources
export const deleteDependentResources = async (
  context: Context,
  instances: Array<{
    type: string;
    id: string;
    attributes: Record<string, unknown>;
  }>,
): Promise<void> => {
  const client = createAliyunClient(context);

  // Delete in reverse order of creation
  for (const instance of [...instances].reverse()) {
    try {
      switch (instance.type) {
        case 'ALIYUN_NAS_MOUNT_TARGET': {
          const [fileSystemId, mountTargetDomain] = instance.id.split('/');
          logger.info(`Deleting NAS mount target: ${instance.id}`);
          await client.nas.deleteMountTarget(fileSystemId, mountTargetDomain);
          break;
        }
        case 'ALIYUN_NAS_FILE_SYSTEM':
          logger.info(`Deleting NAS file system: ${instance.id}`);
          await client.nas.deleteFileSystem(instance.id);
          break;
        case 'ALIYUN_NAS_ACCESS_GROUP':
          logger.info(`Deleting NAS access group: ${instance.id}`);
          await client.nas.deleteAccessGroup(instance.id);
          break;
        case 'ALIYUN_ECS_SECURITY_GROUP':
          logger.info(`Deleting security group: ${instance.id}`);
          await client.ecs.deleteSecurityGroup(instance.id);
          break;
        case 'ALIYUN_RAM_ROLE':
          logger.info(`Deleting RAM role: ${instance.id}`);
          await client.ram.deleteRole(instance.id);
          break;
        case 'ALIYUN_SLS_INDEX': {
          const [projectName, logstoreName] = instance.id.split('/');
          logger.info(`Deleting SLS index: ${instance.id}`);
          await client.sls.deleteIndex(projectName, logstoreName);
          break;
        }
        case 'ALIYUN_SLS_LOGSTORE': {
          const [projectName, logstoreName] = instance.id.split('/');
          logger.info(`Deleting SLS logstore: ${instance.id}`);
          await client.sls.deleteLogstore(projectName, logstoreName);
          break;
        }
        case 'ALIYUN_SLS_PROJECT':
          logger.info(`Deleting SLS project: ${instance.id}`);
          await client.sls.deleteProject(instance.id);
          break;
        default:
          logger.warn(`Unknown resource type: ${instance.type}`);
      }
    } catch (err) {
      logger.error(`Failed to delete resource ${instance.type}:${instance.id}: ${err}`);
    }
  }
};

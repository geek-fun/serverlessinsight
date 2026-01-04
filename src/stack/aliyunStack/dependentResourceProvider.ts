import { Context, FunctionDomain, NasStorageClassEnum } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import * as sls from '@alicloud/sls20201230';
import * as ram from '@alicloud/ram20150501';
import * as ecs from '@alicloud/ecs20140526';
import * as nas from '@alicloud/nas20170626';
import { logger } from '../../common/logger';

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

// SLS Provider
export type SlsProjectInfo = {
  projectName: string;
  description?: string;
  status?: string;
  createTime?: string;
  lastModifyTime?: string;
};

export type SlsLogstoreInfo = {
  logstoreName: string;
  projectName: string;
  ttl?: number;
  shardCount?: number;
  createTime?: number;
  lastModifyTime?: number;
};

export type SlsIndexInfo = {
  projectName: string;
  logstoreName: string;
  indexMode?: string;
  lastModifyTime?: number;
};

export const createSlsProject = async (
  context: Context,
  projectName: string,
  description?: string,
): Promise<SlsProjectInfo> => {
  const client = createAliyunClient(context);

  const request = new sls.CreateProjectRequest({
    projectName,
    description: description ?? `ServerlessInsight log project for ${projectName}`,
  });

  await client.sls.createProject(request);

  // Wait for project to be ready
  let retries = 0;
  while (retries < 10) {
    try {
      const project = await getSlsProject(context, projectName);
      if (project) {
        return project;
      }
    } catch {
      // Project not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    retries++;
  }

  return { projectName };
};

export const getSlsProject = async (
  context: Context,
  projectName: string,
): Promise<SlsProjectInfo | null> => {
  const client = createAliyunClient(context);

  try {
    const response = await client.sls.getProject(projectName);

    if (!response || !response.body) {
      return null;
    }

    return {
      projectName: response.body.name ?? projectName,
      description: response.body.description,
      status: response.body.status,
      createTime: response.body.createTime,
      lastModifyTime: response.body.lastModifyTime,
    };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ProjectNotExist') {
      return null;
    }
    throw error;
  }
};

export const deleteSlsProject = async (context: Context, projectName: string): Promise<void> => {
  const client = createAliyunClient(context);
  const request = new sls.DeleteProjectRequest({});
  await client.sls.deleteProject(projectName, request);
};

export const createSlsLogstore = async (
  context: Context,
  projectName: string,
  logstoreName: string,
  ttl: number = 7,
): Promise<SlsLogstoreInfo> => {
  const client = createAliyunClient(context);

  const request = new sls.CreateLogStoreRequest({
    logstoreName,
    ttl,
    shardCount: 2,
  });

  await client.sls.createLogStore(projectName, request);

  // Wait for logstore to be ready
  let retries = 0;
  while (retries < 10) {
    try {
      const logstore = await getSlsLogstore(context, projectName, logstoreName);
      if (logstore) {
        return logstore;
      }
    } catch {
      // Logstore not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    retries++;
  }

  return { logstoreName, projectName, ttl };
};

export const getSlsLogstore = async (
  context: Context,
  projectName: string,
  logstoreName: string,
): Promise<SlsLogstoreInfo | null> => {
  const client = createAliyunClient(context);

  try {
    const response = await client.sls.getLogStore(projectName, logstoreName);

    if (!response || !response.body) {
      return null;
    }

    return {
      logstoreName: response.body.logstoreName ?? logstoreName,
      projectName,
      ttl: response.body.ttl,
      shardCount: response.body.shardCount,
      createTime: response.body.createTime,
      lastModifyTime: response.body.lastModifyTime,
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'LogStoreNotExist'
    ) {
      return null;
    }
    throw error;
  }
};

export const deleteSlsLogstore = async (
  context: Context,
  projectName: string,
  logstoreName: string,
): Promise<void> => {
  const client = createAliyunClient(context);
  await client.sls.deleteLogStore(projectName, logstoreName);
};

export const createSlsIndex = async (
  context: Context,
  projectName: string,
  logstoreName: string,
): Promise<SlsIndexInfo> => {
  const client = createAliyunClient(context);

  const request = new sls.CreateIndexRequest({
    body: new sls.Index({
      line: new sls.IndexLine({
        token: [
          ',',
          ' ',
          "'",
          '"',
          ';',
          '=',
          '(',
          ')',
          '[',
          ']',
          '{',
          '}',
          '?',
          '@',
          '&',
          '<',
          '>',
          '/',
          ':',
          '\n',
          '\t',
          '\r',
        ],
      }),
    }),
  });

  await client.sls.createIndex(projectName, logstoreName, request);

  return { projectName, logstoreName };
};

export const getSlsIndex = async (
  context: Context,
  projectName: string,
  logstoreName: string,
): Promise<SlsIndexInfo | null> => {
  const client = createAliyunClient(context);

  try {
    const response = await client.sls.getIndex(projectName, logstoreName);

    if (!response || !response.body) {
      return null;
    }

    return {
      projectName,
      logstoreName,
      indexMode: response.body.indexMode,
      lastModifyTime: response.body.lastModifyTime,
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'IndexConfigNotExist'
    ) {
      return null;
    }
    throw error;
  }
};

export const deleteSlsIndex = async (
  context: Context,
  projectName: string,
  logstoreName: string,
): Promise<void> => {
  const client = createAliyunClient(context);
  await client.sls.deleteIndex(projectName, logstoreName);
};

// RAM Provider
export type RamRoleInfo = {
  roleName: string;
  roleId?: string;
  arn?: string;
  description?: string;
  createDate?: string;
};

const FC_ASSUME_ROLE_POLICY = JSON.stringify({
  Version: '1',
  Statement: [
    {
      Action: 'sts:AssumeRole',
      Effect: 'Allow',
      Principal: {
        Service: ['fc.aliyuncs.com'],
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

export const createRamRole = async (
  context: Context,
  roleName: string,
  description?: string,
): Promise<RamRoleInfo> => {
  const client = createAliyunClient(context);

  const request = new ram.CreateRoleRequest({
    roleName,
    assumeRolePolicyDocument: FC_ASSUME_ROLE_POLICY,
    description: description ?? `ServerlessInsight FC execution role for ${roleName}`,
  });

  const response = await client.ram.createRole(request);

  // Attach policy to role
  await attachRolePolicyForFc(context, roleName);

  return {
    roleName,
    roleId: response.body?.role?.roleId,
    arn: response.body?.role?.arn,
    description: response.body?.role?.description,
    createDate: response.body?.role?.createDate,
  };
};

const attachRolePolicyForFc = async (context: Context, roleName: string): Promise<void> => {
  const client = createAliyunClient(context);
  const policyName = `${roleName}-policy`;

  // Create policy
  try {
    const createPolicyRequest = new ram.CreatePolicyRequest({
      policyName,
      policyDocument: FC_EXECUTION_POLICY,
      description: `FC execution policy for ${roleName}`,
    });
    await client.ram.createPolicy(createPolicyRequest);
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
    await client.ram.attachPolicyToRole(attachRequest);
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

export const getRamRole = async (
  context: Context,
  roleName: string,
): Promise<RamRoleInfo | null> => {
  const client = createAliyunClient(context);

  try {
    const request = new ram.GetRoleRequest({
      roleName,
    });
    const response = await client.ram.getRole(request);

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
};

export const deleteRamRole = async (context: Context, roleName: string): Promise<void> => {
  const client = createAliyunClient(context);
  const policyName = `${roleName}-policy`;

  // Detach policy from role
  try {
    const detachRequest = new ram.DetachPolicyFromRoleRequest({
      policyType: 'Custom',
      policyName,
      roleName,
    });
    await client.ram.detachPolicyFromRole(detachRequest);
  } catch {
    // Ignore if policy is not attached
  }

  // Delete policy
  try {
    const deletePolicyRequest = new ram.DeletePolicyRequest({
      policyName,
    });
    await client.ram.deletePolicy(deletePolicyRequest);
  } catch {
    // Ignore if policy doesn't exist
  }

  // Delete role
  const request = new ram.DeleteRoleRequest({
    roleName,
  });
  await client.ram.deleteRole(request);
};

// ECS Security Group Provider
export type SecurityGroupInfo = {
  securityGroupId: string;
  securityGroupName?: string;
  vpcId?: string;
  description?: string;
  createTime?: string;
};

export const createSecurityGroup = async (
  context: Context,
  securityGroupName: string,
  vpcId: string,
  ingressRules: string[],
  egressRules: string[],
  description?: string,
): Promise<SecurityGroupInfo> => {
  const client = createAliyunClient(context);

  const createRequest = new ecs.CreateSecurityGroupRequest({
    regionId: context.region,
    securityGroupName,
    vpcId,
    description: description ?? `ServerlessInsight security group for ${securityGroupName}`,
  });

  const response = await client.ecs.createSecurityGroup(createRequest);
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
      await client.ecs.authorizeSecurityGroup(ingressRequest);
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
      await client.ecs.authorizeSecurityGroupEgress(egressRequest);
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
};

export const getSecurityGroup = async (
  context: Context,
  securityGroupId: string,
): Promise<SecurityGroupInfo | null> => {
  const client = createAliyunClient(context);

  try {
    const request = new ecs.DescribeSecurityGroupsRequest({
      regionId: context.region,
      securityGroupId,
    });
    const response = await client.ecs.describeSecurityGroups(request);

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
};

export const deleteSecurityGroup = async (
  context: Context,
  securityGroupId: string,
): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new ecs.DeleteSecurityGroupRequest({
    regionId: context.region,
    securityGroupId,
  });

  await client.ecs.deleteSecurityGroup(request);
};

// NAS Provider
export type NasFileSystemInfo = {
  fileSystemId: string;
  fileSystemType?: string;
  storageType?: string;
  protocolType?: string;
  status?: string;
  createTime?: string;
};

export type NasMountTargetInfo = {
  mountTargetDomain: string;
  fileSystemId: string;
  vpcId?: string;
  vSwitchId?: string;
  accessGroupName?: string;
  status?: string;
};

export type NasAccessGroupInfo = {
  accessGroupName: string;
  accessGroupType?: string;
  ruleCount?: number;
  createTime?: string;
};

export const createNasAccessGroup = async (
  context: Context,
  accessGroupName: string,
  accessGroupType: string = 'Vpc',
): Promise<NasAccessGroupInfo> => {
  const client = createAliyunClient(context);

  const request = new nas.CreateAccessGroupRequest({
    accessGroupName,
    accessGroupType,
  });

  await client.nas.createAccessGroup(request);

  return {
    accessGroupName,
    accessGroupType,
  };
};

export const getNasAccessGroup = async (
  context: Context,
  accessGroupName: string,
): Promise<NasAccessGroupInfo | null> => {
  const client = createAliyunClient(context);

  try {
    const request = new nas.DescribeAccessGroupsRequest({
      accessGroupName,
    });
    const response = await client.nas.describeAccessGroups(request);

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
};

export const deleteNasAccessGroup = async (
  context: Context,
  accessGroupName: string,
): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new nas.DeleteAccessGroupRequest({
    accessGroupName,
  });

  await client.nas.deleteAccessGroup(request);
};

export const createNasAccessRule = async (
  context: Context,
  accessGroupName: string,
  sourceCidrIp: string,
): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new nas.CreateAccessRuleRequest({
    accessGroupName,
    sourceCidrIp,
    RWAccessType: 'RDWR',
    userAccessType: 'no_squash',
    priority: 1,
  });

  await client.nas.createAccessRule(request);
};

export const createNasFileSystem = async (
  context: Context,
  storageClass: NasStorageClassEnum,
  functionName: string,
): Promise<NasFileSystemInfo> => {
  const client = createAliyunClient(context);
  const { fileSystemType, storageType } = storageClassMap[storageClass];

  const request = new nas.CreateFileSystemRequest({
    fileSystemType,
    storageType,
    protocolType: 'NFS',
    description: `ServerlessInsight NAS for ${functionName}`,
  });

  const response = await client.nas.createFileSystem(request);
  const fileSystemId = response.body?.fileSystemId;

  if (!fileSystemId) {
    throw new Error('Failed to create NAS file system');
  }

  // Wait for file system to be ready
  let retries = 0;
  while (retries < 30) {
    const fs = await getNasFileSystem(context, fileSystemId);
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
};

export const getNasFileSystem = async (
  context: Context,
  fileSystemId: string,
): Promise<NasFileSystemInfo | null> => {
  const client = createAliyunClient(context);

  try {
    const request = new nas.DescribeFileSystemsRequest({
      fileSystemId,
    });
    const response = await client.nas.describeFileSystems(request);

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
};

export const deleteNasFileSystem = async (
  context: Context,
  fileSystemId: string,
): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new nas.DeleteFileSystemRequest({
    fileSystemId,
  });

  await client.nas.deleteFileSystem(request);
};

export const createNasMountTarget = async (
  context: Context,
  fileSystemId: string,
  accessGroupName: string,
  vpcId: string,
  vSwitchId: string,
): Promise<NasMountTargetInfo> => {
  const client = createAliyunClient(context);

  const request = new nas.CreateMountTargetRequest({
    fileSystemId,
    accessGroupName,
    networkType: 'Vpc',
    vpcId,
    vSwitchId,
  });

  const response = await client.nas.createMountTarget(request);
  const mountTargetDomain = response.body?.mountTargetDomain;

  if (!mountTargetDomain) {
    throw new Error('Failed to create NAS mount target');
  }

  // Wait for mount target to be ready
  let retries = 0;
  while (retries < 30) {
    const mt = await getNasMountTarget(context, fileSystemId, mountTargetDomain);
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
};

export const getNasMountTarget = async (
  context: Context,
  fileSystemId: string,
  mountTargetDomain: string,
): Promise<NasMountTargetInfo | null> => {
  const client = createAliyunClient(context);

  try {
    const request = new nas.DescribeMountTargetsRequest({
      fileSystemId,
      mountTargetDomain,
    });
    const response = await client.nas.describeMountTargets(request);

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
};

export const deleteNasMountTarget = async (
  context: Context,
  fileSystemId: string,
  mountTargetDomain: string,
): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new nas.DeleteMountTargetRequest({
    fileSystemId,
    mountTargetDomain,
  });

  await client.nas.deleteMountTarget(request);
};

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
    const project = await createSlsProject(context, projectName);
    instances.push({
      type: 'ALIYUN_SLS_PROJECT',
      id: projectName,
      attributes: { ...project },
    });

    logger.info(`Creating SLS logstore: ${logstoreName}`);
    const logstore = await createSlsLogstore(context, projectName, logstoreName);
    instances.push({
      type: 'ALIYUN_SLS_LOGSTORE',
      id: `${projectName}/${logstoreName}`,
      attributes: { ...logstore },
    });

    logger.info(`Creating SLS index for: ${logstoreName}`);
    const index = await createSlsIndex(context, projectName, logstoreName);
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
  const ramRole = await createRamRole(context, roleName);
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
    const sg = await createSecurityGroup(
      context,
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
      const accessGroup = await createNasAccessGroup(context, accessGroupName);
      instances.push({
        type: 'ALIYUN_NAS_ACCESS_GROUP',
        id: accessGroupName,
        attributes: { ...accessGroup },
      });

      // Add access rule for VPC CIDR
      logger.info(`Creating NAS access rule for: ${accessGroupName}`);
      await createNasAccessRule(context, accessGroupName, '0.0.0.0/0');

      logger.info(`Creating NAS file system for: ${fn.name}`);
      const fileSystem = await createNasFileSystem(context, nasItem.storage_class, fn.name);
      instances.push({
        type: 'ALIYUN_NAS_FILE_SYSTEM',
        id: fileSystem.fileSystemId,
        attributes: { ...fileSystem },
      });

      logger.info(`Creating NAS mount target for: ${fileSystem.fileSystemId}`);
      const mountTarget = await createNasMountTarget(
        context,
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
  // Delete in reverse order of creation
  for (const instance of [...instances].reverse()) {
    try {
      switch (instance.type) {
        case 'ALIYUN_NAS_MOUNT_TARGET': {
          const [fileSystemId, mountTargetDomain] = instance.id.split('/');
          logger.info(`Deleting NAS mount target: ${instance.id}`);
          await deleteNasMountTarget(context, fileSystemId, mountTargetDomain);
          break;
        }
        case 'ALIYUN_NAS_FILE_SYSTEM':
          logger.info(`Deleting NAS file system: ${instance.id}`);
          await deleteNasFileSystem(context, instance.id);
          break;
        case 'ALIYUN_NAS_ACCESS_GROUP':
          logger.info(`Deleting NAS access group: ${instance.id}`);
          await deleteNasAccessGroup(context, instance.id);
          break;
        case 'ALIYUN_ECS_SECURITY_GROUP':
          logger.info(`Deleting security group: ${instance.id}`);
          await deleteSecurityGroup(context, instance.id);
          break;
        case 'ALIYUN_RAM_ROLE':
          logger.info(`Deleting RAM role: ${instance.id}`);
          await deleteRamRole(context, instance.id);
          break;
        case 'ALIYUN_SLS_INDEX': {
          const [projectName, logstoreName] = instance.id.split('/');
          logger.info(`Deleting SLS index: ${instance.id}`);
          await deleteSlsIndex(context, projectName, logstoreName);
          break;
        }
        case 'ALIYUN_SLS_LOGSTORE': {
          const [projectName, logstoreName] = instance.id.split('/');
          logger.info(`Deleting SLS logstore: ${instance.id}`);
          await deleteSlsLogstore(context, projectName, logstoreName);
          break;
        }
        case 'ALIYUN_SLS_PROJECT':
          logger.info(`Deleting SLS project: ${instance.id}`);
          await deleteSlsProject(context, instance.id);
          break;
        default:
          logger.warn(`Unknown resource type: ${instance.type}`);
      }
    } catch (err) {
      logger.error(`Failed to delete resource ${instance.type}:${instance.id}: ${err}`);
    }
  }
};

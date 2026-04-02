import type { Context } from '../../src/types';
import { ProviderEnum } from '../../src/common/providerEnum';

export type MockAliyunClient = {
  fc3: {
    createFunction: jest.Mock;
    getFunction: jest.Mock;
    updateFunctionConfiguration: jest.Mock;
    updateFunctionCode: jest.Mock;
    deleteFunction: jest.Mock;
    createTrigger: jest.Mock;
    deleteTrigger: jest.Mock;
  };
  apigw: {
    createApiGroup: jest.Mock;
    getApiGroup: jest.Mock;
    deleteApiGroup: jest.Mock;
    createApi: jest.Mock;
    getApi: jest.Mock;
    deleteApi: jest.Mock;
    deployApi: jest.Mock;
    abolishApi: jest.Mock;
    bindCustomDomain: jest.Mock;
    unbindCustomDomain: jest.Mock;
  };
  oss: {
    createBucket: jest.Mock;
    getBucketInfo: jest.Mock;
    deleteBucket: jest.Mock;
    putBucketWebsite: jest.Mock;
    deleteBucketWebsite: jest.Mock;
    putBucketAcl: jest.Mock;
  };
  ram: {
    createRole: jest.Mock;
    getRole: jest.Mock;
    deleteRole: jest.Mock;
    createPolicy: jest.Mock;
    deletePolicy: jest.Mock;
    attachPolicyToRole: jest.Mock;
    detachPolicyFromRole: jest.Mock;
  };
  nas: {
    createFileSystem: jest.Mock;
    getFileSystem: jest.Mock;
    deleteFileSystem: jest.Mock;
    createMountTarget: jest.Mock;
    deleteMountTarget: jest.Mock;
    createAccessGroup: jest.Mock;
    deleteAccessGroup: jest.Mock;
  };
  rds: {
    createDBInstance: jest.Mock;
    describeDBInstanceAttribute: jest.Mock;
    deleteDBInstance: jest.Mock;
  };
  ecs: {
    createSecurityGroup: jest.Mock;
    describeSecurityGroups: jest.Mock;
    deleteSecurityGroup: jest.Mock;
    getSecurityGroupByName: jest.Mock;
  };
  sls: {
    createProject: jest.Mock;
    createLogstore: jest.Mock;
    createIndex: jest.Mock;
    waitForProject: jest.Mock;
    waitForLogstore: jest.Mock;
  };
};

export const createMockAliyunClient = (): MockAliyunClient => ({
  fc3: {
    createFunction: jest.fn().mockResolvedValue({ body: { functionName: 'test-function' } }),
    getFunction: jest.fn().mockResolvedValue({
      body: {
        functionConfig: {
          functionName: 'test-function',
          memorySize: 128,
          timeout: 60,
          runtime: 'nodejs18',
        },
      },
    }),
    updateFunctionConfiguration: jest.fn().mockResolvedValue({}),
    updateFunctionCode: jest.fn().mockResolvedValue({}),
    deleteFunction: jest.fn().mockResolvedValue({}),
    createTrigger: jest.fn().mockResolvedValue({ body: { triggerName: 'http-trigger' } }),
    deleteTrigger: jest.fn().mockResolvedValue({}),
  },
  apigw: {
    createApiGroup: jest.fn().mockResolvedValue({ body: { groupId: 'group-123' } }),
    getApiGroup: jest
      .fn()
      .mockResolvedValue({ body: { groupId: 'group-123', groupName: 'test-group' } }),
    deleteApiGroup: jest.fn().mockResolvedValue({}),
    createApi: jest.fn().mockResolvedValue({ body: { apiId: 'api-123' } }),
    getApi: jest.fn().mockResolvedValue({ body: { apiId: 'api-123', apiName: 'test-api' } }),
    deleteApi: jest.fn().mockResolvedValue({}),
    deployApi: jest.fn().mockResolvedValue({}),
    abolishApi: jest.fn().mockResolvedValue({}),
    bindCustomDomain: jest.fn().mockResolvedValue({}),
    unbindCustomDomain: jest.fn().mockResolvedValue({}),
  },
  oss: {
    createBucket: jest.fn().mockResolvedValue({}),
    getBucketInfo: jest.fn().mockResolvedValue({ body: { BucketInfo: { Name: 'test-bucket' } } }),
    deleteBucket: jest.fn().mockResolvedValue({}),
    putBucketWebsite: jest.fn().mockResolvedValue({}),
    deleteBucketWebsite: jest.fn().mockResolvedValue({}),
    putBucketAcl: jest.fn().mockResolvedValue({}),
  },
  ram: {
    createRole: jest.fn().mockResolvedValue({ body: { Role: { RoleName: 'test-role' } } }),
    getRole: jest.fn().mockResolvedValue({ body: { Role: { RoleName: 'test-role' } } }),
    deleteRole: jest.fn().mockResolvedValue({}),
    createPolicy: jest.fn().mockResolvedValue({ body: { Policy: { PolicyName: 'test-policy' } } }),
    deletePolicy: jest.fn().mockResolvedValue({}),
    attachPolicyToRole: jest.fn().mockResolvedValue({}),
    detachPolicyFromRole: jest.fn().mockResolvedValue({}),
  },
  nas: {
    createFileSystem: jest.fn().mockResolvedValue({ body: { fileSystemId: 'fs-123' } }),
    getFileSystem: jest.fn().mockResolvedValue({ body: { fileSystems: { fileSystem: [] } } }),
    deleteFileSystem: jest.fn().mockResolvedValue({}),
    createMountTarget: jest
      .fn()
      .mockResolvedValue({ body: { mountTargetDomain: 'fs-123.cn-hangzhou.nas.aliyuncs.com' } }),
    deleteMountTarget: jest.fn().mockResolvedValue({}),
    createAccessGroup: jest.fn().mockResolvedValue({}),
    deleteAccessGroup: jest.fn().mockResolvedValue({}),
  },
  rds: {
    createDBInstance: jest.fn().mockResolvedValue({ body: { DBInstanceId: 'rds-123' } }),
    describeDBInstanceAttribute: jest.fn().mockResolvedValue({
      body: {
        Items: { DBInstanceAttribute: [{ DBInstanceId: 'rds-123', DBInstanceStatus: 'Running' }] },
      },
    }),
    deleteDBInstance: jest.fn().mockResolvedValue({}),
  },
  ecs: {
    createSecurityGroup: jest.fn().mockResolvedValue({ body: { SecurityGroupId: 'sg-123' } }),
    describeSecurityGroups: jest
      .fn()
      .mockResolvedValue({ body: { SecurityGroups: { SecurityGroup: [] } } }),
    deleteSecurityGroup: jest.fn().mockResolvedValue({}),
    getSecurityGroupByName: jest.fn().mockResolvedValue({ securityGroupId: 'sg-123' }),
  },
  sls: {
    createProject: jest.fn().mockResolvedValue({ projectName: 'test-project' }),
    createLogstore: jest.fn().mockResolvedValue({ logstoreName: 'test-logstore' }),
    createIndex: jest.fn().mockResolvedValue({}),
    waitForProject: jest.fn().mockResolvedValue({}),
    waitForLogstore: jest.fn().mockResolvedValue({}),
  },
});

export type MockTencentClient = {
  scf: {
    CreateFunction: jest.Mock;
    GetFunction: jest.Mock;
    DeleteFunction: jest.Mock;
    UpdateFunctionCode: jest.Mock;
    UpdateFunctionConfiguration: jest.Mock;
  };
  cos: {
    putBucket: jest.Mock;
    getBucket: jest.Mock;
    deleteBucket: jest.Mock;
  };
  cynosdb: {
    CreateClusters: jest.Mock;
    DescribeClusters: jest.Mock;
    DeleteCluster: jest.Mock;
  };
};

export const createMockTencentClient = (): MockTencentClient => ({
  scf: {
    CreateFunction: jest.fn().mockResolvedValue({ FunctionName: 'test-function' }),
    GetFunction: jest.fn().mockResolvedValue({ FunctionName: 'test-function', Status: 'Active' }),
    DeleteFunction: jest.fn().mockResolvedValue({}),
    UpdateFunctionCode: jest.fn().mockResolvedValue({}),
    UpdateFunctionConfiguration: jest.fn().mockResolvedValue({}),
  },
  cos: {
    putBucket: jest.fn().mockResolvedValue({}),
    getBucket: jest.fn().mockResolvedValue({ Name: 'test-bucket' }),
    deleteBucket: jest.fn().mockResolvedValue({}),
  },
  cynosdb: {
    CreateClusters: jest.fn().mockResolvedValue({ ClusterId: 'cluster-123' }),
    DescribeClusters: jest.fn().mockResolvedValue({ ClusterSet: [] }),
    DeleteCluster: jest.fn().mockResolvedValue({}),
  },
});

export type MockVolcengineClient = {
  vefaas: {
    createFunction: jest.Mock;
    getFunction: jest.Mock;
    updateFunctionConfiguration: jest.Mock;
    updateFunctionCode: jest.Mock;
    deleteFunction: jest.Mock;
    listFunctions: jest.Mock;
  };
  tos: {
    createBucket: jest.Mock;
    getBucket: jest.Mock;
    deleteBucket: jest.Mock;
    updateBucketAcl: jest.Mock;
    updateBucketWebsite: jest.Mock;
    putObject: jest.Mock;
    listObjects: jest.Mock;
    deleteObjects: jest.Mock;
    uploadFiles: jest.Mock;
  };
  iam: {
    createRole: jest.Mock;
    getRole: jest.Mock;
    updateRoleTrustPolicy: jest.Mock;
    deleteRole: jest.Mock;
    attachRolePolicy: jest.Mock;
    detachRolePolicy: jest.Mock;
  };
  tls: {
    createProject: jest.Mock;
    getProject: jest.Mock;
    deleteProject: jest.Mock;
    createTopic: jest.Mock;
    getTopic: jest.Mock;
    deleteTopic: jest.Mock;
    createIndex: jest.Mock;
    deleteIndex: jest.Mock;
    waitForProject: jest.Mock;
    waitForTopic: jest.Mock;
  };
  apigw: {
    createGateway: jest.Mock;
    getGateway: jest.Mock;
    findGatewayByName: jest.Mock;
    updateGateway: jest.Mock;
    deleteGateway: jest.Mock;
    createApi: jest.Mock;
    getApi: jest.Mock;
    updateApi: jest.Mock;
    deleteApi: jest.Mock;
    deployApi: jest.Mock;
    bindDomain: jest.Mock;
    unbindDomain: jest.Mock;
  };
};

export const createMockVolcengineClient = (): MockVolcengineClient => ({
  vefaas: {
    createFunction: jest.fn().mockResolvedValue(undefined),
    getFunction: jest.fn().mockResolvedValue({
      functionId: 'func-123',
      functionName: 'test-function',
      runtime: 'nodejs/v18',
      handler: 'index.handler',
      memoryMb: 128,
      requestTimeout: 30,
      status: 'Active',
    }),
    updateFunctionConfiguration: jest.fn().mockResolvedValue(undefined),
    updateFunctionCode: jest.fn().mockResolvedValue(undefined),
    deleteFunction: jest.fn().mockResolvedValue(undefined),
    listFunctions: jest.fn().mockResolvedValue([]),
  },
  tos: {
    createBucket: jest.fn().mockResolvedValue({
      name: 'test-bucket',
      location: 'cn-beijing',
      extranetEndpoint: 'test-bucket.tos-cn-beijing.volces.com',
    }),
    getBucket: jest.fn().mockResolvedValue({
      name: 'test-bucket',
      location: 'cn-beijing',
      extranetEndpoint: 'test-bucket.tos-cn-beijing.volces.com',
    }),
    deleteBucket: jest.fn().mockResolvedValue(undefined),
    updateBucketAcl: jest.fn().mockResolvedValue(undefined),
    updateBucketWebsite: jest.fn().mockResolvedValue(undefined),
    putObject: jest.fn().mockResolvedValue(undefined),
    listObjects: jest.fn().mockResolvedValue([]),
    deleteObjects: jest.fn().mockResolvedValue(undefined),
    uploadFiles: jest.fn().mockResolvedValue(undefined),
  },
  iam: {
    createRole: jest.fn().mockResolvedValue({
      roleName: 'test-role',
      roleId: 'role-123',
      trn: 'trn:iam::123456789012:role/test-role',
    }),
    getRole: jest.fn().mockResolvedValue({
      roleName: 'test-role',
      roleId: 'role-123',
      trn: 'trn:iam::123456789012:role/test-role',
    }),
    updateRoleTrustPolicy: jest.fn().mockResolvedValue(undefined),
    deleteRole: jest.fn().mockResolvedValue(undefined),
    attachRolePolicy: jest.fn().mockResolvedValue(undefined),
    detachRolePolicy: jest.fn().mockResolvedValue(undefined),
  },
  tls: {
    createProject: jest.fn().mockResolvedValue({
      projectId: 'proj-123',
      projectName: 'test-project',
      status: 'Running',
    }),
    getProject: jest.fn().mockResolvedValue({
      projectId: 'proj-123',
      projectName: 'test-project',
      status: 'Running',
    }),
    deleteProject: jest.fn().mockResolvedValue(undefined),
    createTopic: jest.fn().mockResolvedValue({
      topicId: 'topic-123',
      topicName: 'test-topic',
      status: 'Running',
    }),
    getTopic: jest.fn().mockResolvedValue({
      topicId: 'topic-123',
      topicName: 'test-topic',
      status: 'Running',
    }),
    deleteTopic: jest.fn().mockResolvedValue(undefined),
    createIndex: jest.fn().mockResolvedValue(undefined),
    deleteIndex: jest.fn().mockResolvedValue(undefined),
    waitForProject: jest.fn().mockResolvedValue(undefined),
    waitForTopic: jest.fn().mockResolvedValue(undefined),
  },
  apigw: {
    createGateway: jest.fn().mockResolvedValue({
      gatewayId: 'gw-123',
      gatewayName: 'test-gateway',
      status: 'Running',
      subDomain: 'gw-123.apig.cn-beijing.volces.com',
    }),
    getGateway: jest.fn().mockResolvedValue({
      gatewayId: 'gw-123',
      gatewayName: 'test-gateway',
      status: 'Running',
      subDomain: 'gw-123.apig.cn-beijing.volces.com',
    }),
    findGatewayByName: jest.fn().mockResolvedValue(null),
    updateGateway: jest.fn().mockResolvedValue(undefined),
    deleteGateway: jest.fn().mockResolvedValue(undefined),
    createApi: jest.fn().mockResolvedValue('api-123'),
    getApi: jest.fn().mockResolvedValue({
      apiId: 'api-123',
      apiName: 'test-api',
      gatewayId: 'gw-123',
      method: 'GET',
      path: '/api/hello',
      status: 'Running',
    }),
    updateApi: jest.fn().mockResolvedValue(undefined),
    deleteApi: jest.fn().mockResolvedValue(undefined),
    deployApi: jest.fn().mockResolvedValue(undefined),
    bindDomain: jest.fn().mockResolvedValue(undefined),
    unbindDomain: jest.fn().mockResolvedValue(undefined),
  },
});

export const createMockContext = (overrides?: Partial<Context>): Context =>
  ({
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accessKeyId: 'test-access-key-id',
    accessKeySecret: 'test-access-key-secret',
    stage: 'dev',
    app: 'test-app',
    service: 'test-service',
    ...overrides,
  }) as Context;

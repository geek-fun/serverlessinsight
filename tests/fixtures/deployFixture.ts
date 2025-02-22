import { DatabaseEnum, DatabaseVersionEnum, ServerlessIac } from '../../src/types';
import { cloneDeep, set } from 'lodash';
import { ProviderEnum } from '../../src/common';

export const oneFcOneGatewayIac = {
  service: 'my-demo-service',
  version: '0.0.1',
  provider: {
    name: 'aliyun' as ProviderEnum,
    region: 'cn-hangzhou',
  },
  vars: {
    account_id: 1234567890,
  },
  stages: {
    dev: {
      region: '${vars.region}',
      account_id: '${vars.account_id}',
    },
  },
  functions: [
    {
      key: 'hello_fn',
      name: 'hello_fn',
      code: {
        runtime: 'nodejs18',
        handler: 'index.handler',
        path: 'tests/fixtures/artifacts/artifact.zip',
      },
      memory: 128,
      timeout: 10,
      log: true,
      environment: {
        NODE_ENV: 'production',
      },
      storage: {},
    },
  ],
  events: [
    {
      type: 'API_GATEWAY',
      key: 'gateway_event',
      name: 'gateway_event',
      triggers: [
        {
          method: 'GET',
          path: '/api/hello',
          backend: '${functions.hello_fn}',
        },
      ],
    },
  ],
  tags: [
    {
      key: 'owner',
      value: 'geek-fun',
    },
  ],
} as ServerlessIac;

export const oneFcOneGatewayRos = {
  Description: 'my-demo-service stack',
  Mappings: {
    stages: {
      dev: {
        account_id: {
          Ref: 'account_id',
        },
        region: {
          Ref: 'region',
        },
      },
    },
  },
  Metadata: {
    'ALIYUN::ROS::Interface': {
      TemplateTags: ['Create by ROS CDK'],
    },
  },
  Parameters: {
    account_id: {
      Default: 1234567890,
      Type: 'String',
    },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    gateway_event_api_R0VUXy9hcGkvaGVsbG8: {
      Properties: {
        ApiName: 'gateway_event_api_R0VUXy9hcGkvaGVsbG8',
        AuthType: 'ANONYMOUS',
        GroupId: {
          'Fn::GetAtt': ['my-demo-service_apigroup', 'GroupId'],
        },
        RequestConfig: {
          RequestHttpMethod: 'GET',
          RequestMode: 'PASSTHROUGH',
          RequestPath: '/api/hello',
          RequestProtocol: 'HTTP',
        },
        ResultSample: 'ServerlessInsight resultSample',
        ResultType: 'PASSTHROUGH',
        ServiceConfig: {
          FunctionComputeConfig: {
            FcVersion: '3.0',
            FunctionName: {
              'Fn::GetAtt': ['hello_fn', 'FunctionName'],
            },
            Method: 'GET',
            RoleArn: {
              'Fn::GetAtt': ['my-demo-service_role', 'Arn'],
            },
          },
          ServiceProtocol: 'FunctionCompute',
        },
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
        Visibility: 'PRIVATE',
      },
      Type: 'ALIYUN::ApiGateway::Api',
    },
    hello_fn: {
      DependsOn: [
        'my-demo-service_sls',
        'my-demo-service_sls_logstore',
        'my-demo-service_sls_index',
      ],
      Properties: {
        Code: {
          ZipFile: 'resolved-code',
        },
        EnvironmentVariables: {
          NODE_ENV: 'production',
        },
        FunctionName: 'hello_fn',
        Handler: 'index.handler',
        LogConfig: {
          EnableRequestMetrics: true,
          Logstore: {
            'Fn::GetAtt': ['my-demo-service_sls_logstore', 'LogstoreName'],
          },
          Project: {
            'Fn::GetAtt': ['my-demo-service_sls_logstore', 'ProjectName'],
          },
        },
        MemorySize: 128,
        Runtime: 'nodejs18',
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
    },
    'my-demo-service_apigroup': {
      Properties: {
        GroupName: 'my-demo-service_apigroup',
        PassthroughHeaders: 'host',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
      },
      Type: 'ALIYUN::ApiGateway::Group',
    },
    'my-demo-service_deployment': {
      Properties: {
        ApiId: {
          'Fn::GetAtt': ['gateway_event_api_R0VUXy9hcGkvaGVsbG8', 'ApiId'],
        },
        Description: 'my-demo-service Api Gateway deployment',
        GroupId: {
          'Fn::GetAtt': ['my-demo-service_apigroup', 'GroupId'],
        },
        StageName: 'RELEASE',
      },
      Type: 'ALIYUN::ApiGateway::Deployment',
    },
    'my-demo-service_role': {
      Properties: {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: ['apigateway.aliyuncs.com'],
              },
            },
          ],
          Version: '1',
        },
        Description: 'my-demo-service role',
        Policies: [
          {
            PolicyDocument: {
              Statement: [
                {
                  Action: ['fc:InvokeFunction'],
                  Effect: 'Allow',
                  Resource: ['*'],
                },
              ],
              Version: '1',
            },
            PolicyName: 'my-demo-service-policy',
          },
        ],
        RoleName: 'my-demo-service-gateway-access-role',
      },
      Type: 'ALIYUN::RAM::Role',
    },
    'my-demo-service_sls': {
      Properties: {
        Name: 'my-demo-service-sls',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
      },
      Type: 'ALIYUN::SLS::Project',
    },
    'my-demo-service_sls_index': {
      Properties: {
        FullTextIndex: {
          Enable: true,
        },
        LogReduce: false,
        LogstoreName: {
          'Fn::GetAtt': ['my-demo-service_sls_logstore', 'LogstoreName'],
        },
        ProjectName: {
          'Fn::GetAtt': ['my-demo-service_sls', 'Name'],
        },
      },
      Type: 'ALIYUN::SLS::Index',
    },
    'my-demo-service_sls_logstore': {
      Properties: {
        AppendMeta: false,
        AutoSplit: false,
        EnableTracking: false,
        LogstoreName: 'my-demo-service-sls-logstore',
        PreserveStorage: false,
        ProjectName: {
          'Fn::GetAtt': ['my-demo-service_sls', 'Name'],
        },
        ShardCount: 2,
        TTL: 7,
      },
      Type: 'ALIYUN::SLS::Logstore',
    },
  },
};

export const referredServiceIac = set(
  cloneDeep(oneFcOneGatewayIac),
  'service',
  'my-demo-service-${ctx.stage}',
);

export const referredServiceRos = {
  Description: 'my-demo-service-dev stack',
  Mappings: {
    stages: {
      dev: {
        account_id: { Ref: 'account_id' },
        region: { Ref: 'region' },
      },
    },
  },
  Metadata: { 'ALIYUN::ROS::Interface': { TemplateTags: ['Create by ROS CDK'] } },
  Parameters: {
    account_id: { Default: 1234567890, Type: 'String' },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    gateway_event_api_R0VUXy9hcGkvaGVsbG8: {
      Properties: {
        ApiName: 'gateway_event_api_R0VUXy9hcGkvaGVsbG8',
        AuthType: 'ANONYMOUS',
        GroupId: {
          'Fn::GetAtt': ['my-demo-service-dev_apigroup', 'GroupId'],
        },
        RequestConfig: {
          RequestHttpMethod: 'GET',
          RequestMode: 'PASSTHROUGH',
          RequestPath: '/api/hello',
          RequestProtocol: 'HTTP',
        },
        ResultSample: 'ServerlessInsight resultSample',
        ResultType: 'PASSTHROUGH',
        ServiceConfig: {
          FunctionComputeConfig: {
            FcVersion: '3.0',
            FunctionName: {
              'Fn::GetAtt': ['hello_fn', 'FunctionName'],
            },
            Method: 'GET',
            RoleArn: {
              'Fn::GetAtt': ['my-demo-service-dev_role', 'Arn'],
            },
          },
          ServiceProtocol: 'FunctionCompute',
        },
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
        Visibility: 'PRIVATE',
      },
      Type: 'ALIYUN::ApiGateway::Api',
    },
    hello_fn: {
      DependsOn: [
        'my-demo-service-dev_sls',
        'my-demo-service-dev_sls_logstore',
        'my-demo-service-dev_sls_index',
      ],
      Properties: {
        Code: {
          ZipFile: 'resolved-code',
        },
        EnvironmentVariables: {
          NODE_ENV: 'production',
        },
        FunctionName: 'hello_fn',
        Handler: 'index.handler',
        LogConfig: {
          EnableRequestMetrics: true,
          Logstore: {
            'Fn::GetAtt': ['my-demo-service-dev_sls_logstore', 'LogstoreName'],
          },
          Project: {
            'Fn::GetAtt': ['my-demo-service-dev_sls_logstore', 'ProjectName'],
          },
        },
        MemorySize: 128,
        Runtime: 'nodejs18',
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
    },
    'my-demo-service-dev_apigroup': {
      Properties: {
        GroupName: 'my-demo-service-dev_apigroup',
        PassthroughHeaders: 'host',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
      },
      Type: 'ALIYUN::ApiGateway::Group',
    },
    'my-demo-service-dev_deployment': {
      Properties: {
        ApiId: {
          'Fn::GetAtt': ['gateway_event_api_R0VUXy9hcGkvaGVsbG8', 'ApiId'],
        },
        Description: 'my-demo-service-dev Api Gateway deployment',
        GroupId: {
          'Fn::GetAtt': ['my-demo-service-dev_apigroup', 'GroupId'],
        },
        StageName: 'RELEASE',
      },
      Type: 'ALIYUN::ApiGateway::Deployment',
    },
    'my-demo-service-dev_role': {
      Properties: {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: ['apigateway.aliyuncs.com'],
              },
            },
          ],
          Version: '1',
        },
        Description: 'my-demo-service-dev role',
        Policies: [
          {
            PolicyDocument: {
              Statement: [
                {
                  Action: ['fc:InvokeFunction'],
                  Effect: 'Allow',
                  Resource: ['*'],
                },
              ],
              Version: '1',
            },
            PolicyName: 'my-demo-service-dev-policy',
          },
        ],
        RoleName: 'my-demo-service-dev-gateway-access-role',
      },
      Type: 'ALIYUN::RAM::Role',
    },
    'my-demo-service-dev_sls': {
      Properties: {
        Name: 'my-demo-service-dev-sls',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
      },
      Type: 'ALIYUN::SLS::Project',
    },
    'my-demo-service-dev_sls_index': {
      Properties: {
        FullTextIndex: {
          Enable: true,
        },
        LogReduce: false,
        LogstoreName: {
          'Fn::GetAtt': ['my-demo-service-dev_sls_logstore', 'LogstoreName'],
        },
        ProjectName: {
          'Fn::GetAtt': ['my-demo-service-dev_sls', 'Name'],
        },
      },
      Type: 'ALIYUN::SLS::Index',
    },
    'my-demo-service-dev_sls_logstore': {
      Properties: {
        AppendMeta: false,
        AutoSplit: false,
        EnableTracking: false,
        LogstoreName: 'my-demo-service-dev-sls-logstore',
        PreserveStorage: false,
        ProjectName: {
          'Fn::GetAtt': ['my-demo-service-dev_sls', 'Name'],
        },
        ShardCount: 2,
        TTL: 7,
      },
      Type: 'ALIYUN::SLS::Logstore',
    },
  },
};

export const minimumIac = {
  service: 'my-demo-minimum-service',
  version: '0.0.1',
  provider: {
    name: 'aliyun' as ProviderEnum,
    region: 'cn-hangzhou',
  },

  functions: [
    {
      key: 'hello_fn',
      name: 'hello_fn',
      code: {
        runtime: 'nodejs18',
        handler: 'index.handler',
        path: 'tests/fixtures/artifacts/artifact.zip',
      },
    },
  ],
} as ServerlessIac;

export const minimumRos = {
  Description: 'my-demo-minimum-service stack',
  Metadata: { 'ALIYUN::ROS::Interface': { TemplateTags: ['Create by ROS CDK'] } },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    'my-demo-minimum-service_sls': {
      Properties: {
        Name: 'my-demo-minimum-service-sls',
      },
      Type: 'ALIYUN::SLS::Project',
    },
    'my-demo-minimum-service_sls_index': {
      Properties: {
        FullTextIndex: {
          Enable: true,
        },
        LogReduce: false,
        LogstoreName: {
          'Fn::GetAtt': ['my-demo-minimum-service_sls_logstore', 'LogstoreName'],
        },
        ProjectName: {
          'Fn::GetAtt': ['my-demo-minimum-service_sls', 'Name'],
        },
      },
      Type: 'ALIYUN::SLS::Index',
    },
    'my-demo-minimum-service_sls_logstore': {
      Properties: {
        AppendMeta: false,
        AutoSplit: false,
        EnableTracking: false,
        LogstoreName: 'my-demo-minimum-service-sls-logstore',
        PreserveStorage: false,
        ProjectName: {
          'Fn::GetAtt': ['my-demo-minimum-service_sls', 'Name'],
        },
        ShardCount: 2,
        TTL: 7,
      },
      Type: 'ALIYUN::SLS::Logstore',
    },
    hello_fn: {
      Properties: {
        Code: {
          ZipFile: 'resolved-code',
        },
        FunctionName: 'hello_fn',
        Handler: 'index.handler',
        Runtime: 'nodejs18',
      },
      Type: 'ALIYUN::FC3::Function',
    },
  },
};

export const oneFcIac = {
  service: 'my-demo-service',
  version: '0.0.1',
  provider: {
    name: 'aliyun' as ProviderEnum,
    region: 'cn-hangzhou',
  },
  vars: {
    account_id: 1234567890,
  },
  stages: {
    dev: {
      region: '${vars.region}',
      account_id: '${vars.account_id}',
    },
  },
  functions: [
    {
      key: 'hello_fn',
      name: 'hello_fn',
      code: {
        runtime: 'nodejs18',
        handler: 'index.handler',
        path: 'tests/fixtures/artifacts/artifact.zip',
      },
      memory: 128,
      timeout: 10,
      log: true,
      environment: {
        NODE_ENV: 'production',
      },
      storage: {},
    },
  ],
  tags: [
    {
      key: 'owner',
      value: 'geek-fun',
    },
  ],
} as ServerlessIac;

export const oneFcRos = {
  Description: 'my-demo-service stack',
  Mappings: {
    stages: {
      dev: {
        account_id: { Ref: 'account_id' },
        region: { Ref: 'region' },
      },
    },
  },
  Metadata: { 'ALIYUN::ROS::Interface': { TemplateTags: ['Create by ROS CDK'] } },
  Parameters: {
    account_id: {
      Default: 1234567890,
      Type: 'String',
    },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    hello_fn: {
      DependsOn: [
        'my-demo-service_sls',
        'my-demo-service_sls_logstore',
        'my-demo-service_sls_index',
      ],
      Properties: {
        Code: {
          ZipFile: 'resolved-code',
        },
        EnvironmentVariables: {
          NODE_ENV: 'production',
        },
        FunctionName: 'hello_fn',
        Handler: 'index.handler',
        LogConfig: {
          EnableRequestMetrics: true,
          Logstore: {
            'Fn::GetAtt': ['my-demo-service_sls_logstore', 'LogstoreName'],
          },
          Project: {
            'Fn::GetAtt': ['my-demo-service_sls_logstore', 'ProjectName'],
          },
        },
        MemorySize: 128,
        Runtime: 'nodejs18',
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
    },
    'my-demo-service_sls': {
      Properties: {
        Name: 'my-demo-service-sls',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
      },
      Type: 'ALIYUN::SLS::Project',
    },
    'my-demo-service_sls_index': {
      Properties: {
        FullTextIndex: {
          Enable: true,
        },
        LogReduce: false,
        LogstoreName: {
          'Fn::GetAtt': ['my-demo-service_sls_logstore', 'LogstoreName'],
        },
        ProjectName: {
          'Fn::GetAtt': ['my-demo-service_sls', 'Name'],
        },
      },
      Type: 'ALIYUN::SLS::Index',
    },
    'my-demo-service_sls_logstore': {
      Properties: {
        AppendMeta: false,
        AutoSplit: false,
        EnableTracking: false,
        LogstoreName: 'my-demo-service-sls-logstore',
        PreserveStorage: false,
        ProjectName: {
          'Fn::GetAtt': ['my-demo-service_sls', 'Name'],
        },
        ShardCount: 2,
        TTL: 7,
      },
      Type: 'ALIYUN::SLS::Logstore',
    },
  },
};

export const oneFcIacWithNas = {
  ...oneFcIac,
  functions: [
    {
      ...((oneFcIac.functions && oneFcIac.functions[0]) ?? {}),
      network: {
        vpc_id: 'vpc-123456',
        subnet_ids: ['subnet-123456', 'subnet-67890', 'subnet-98765'],
        security_group: {
          name: 'my-security-group',
          ingress: [
            'TCP:0.0.0.0/0:80',
            'TCP:0.0.0.0/0:443',
            'TCP:0.0.0.0/0:22/22',
            'ICMP:0.0.0.0/0:ALL',
          ],
          egress: ['ALL:0.0.0.0/0:ALL'],
        },
      },
      storage: {
        nas: [
          {
            mount_path: '/mnt/nas',
            storage_class: 'STANDARD_CAPACITY',
          },
        ],
      },
    },
  ],
} as ServerlessIac;

export const oneFcIacWithNasRos = {
  ...oneFcRos,
  Resources: {
    ...oneFcRos.Resources,
    hello_fn: {
      Type: 'ALIYUN::FC3::Function',
      Properties: {
        ...oneFcRos.Resources.hello_fn.Properties,
        NasConfig: {
          MountPoints: [
            {
              MountDir: '/mnt/nas',
              ServerAddr: {
                'Fn::Join': [
                  '',
                  [
                    {
                      'Fn::GetAtt': ['hello_fn_nas_mount_L21udC9uYXM', 'MountTargetDomain'],
                    },
                    ':/',
                  ],
                ],
              },
            },
          ],
        },
        VpcConfig: {
          SecurityGroupId: {
            'Fn::GetAtt': ['hello_fn_security_group', 'SecurityGroupId'],
          },
          VSwitchIds: ['subnet-123456', 'subnet-67890', 'subnet-98765'],
          VpcId: 'vpc-123456',
        },
      },
      DependsOn: [
        'my-demo-service_sls',
        'my-demo-service_sls_logstore',
        'my-demo-service_sls_index',
        'hello_fn_nas_mount_L21udC9uYXM',
      ],
    },
    hello_fn_nas_L21udC9uYXM: {
      Properties: {
        DeletionForce: false,
        FileSystemType: 'standard',
        ProtocolType: 'NFS',
        StorageType: 'Capacity',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
          {
            Key: 'function-name',
            Value: 'hello_fn',
          },
        ],
      },
      Type: 'ALIYUN::NAS::FileSystem',
    },
    hello_fn_nas_access_L21udC9uYXM: {
      Properties: {
        AccessGroupName: 'hello_fn-nas-access-L21udC9uYXM',
        AccessGroupType: 'Vpc',
        FileSystemType: 'standard',
      },
      Type: 'ALIYUN::NAS::AccessGroup',
    },
    hello_fn_nas_mount_L21udC9uYXM: {
      Properties: {
        AccessGroupName: {
          'Fn::GetAtt': ['hello_fn_nas_access_L21udC9uYXM', 'AccessGroupName'],
        },
        FileSystemId: {
          'Fn::GetAtt': ['hello_fn_nas_L21udC9uYXM', 'FileSystemId'],
        },
        NetworkType: 'Vpc',
        VSwitchId: 'subnet-123456',
        VpcId: 'vpc-123456',
      },
      Type: 'ALIYUN::NAS::MountTarget',
    },
    hello_fn_security_group: {
      Properties: {
        SecurityGroupEgress: [
          {
            DestCidrIp: '0.0.0.0/0',
            IpProtocol: 'all',
            PortRange: '-1/-1',
          },
        ],
        SecurityGroupIngress: [
          {
            IpProtocol: 'tcp',
            PortRange: '80/80',
            SourceCidrIp: '0.0.0.0/0',
          },
          {
            IpProtocol: 'tcp',
            PortRange: '443/443',
            SourceCidrIp: '0.0.0.0/0',
          },
          {
            IpProtocol: 'tcp',
            PortRange: '22/22',
            SourceCidrIp: '0.0.0.0/0',
          },
          {
            IpProtocol: 'icmp',
            PortRange: '-1/-1',
            SourceCidrIp: '0.0.0.0/0',
          },
        ],
        SecurityGroupName: 'my-security-group',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
        VpcId: 'vpc-123456',
      },
      Type: 'ALIYUN::ECS::SecurityGroup',
    },
  },
};
export const oneFcIacWithStage = {
  service: 'my-demo-service',
  version: '0.0.1',
  provider: {
    name: 'aliyun',
    region: 'cn-hangzhou',
  },
  vars: {
    account_id: 1234567890,
  },
  stages: {
    default: {
      node_env: 'default',
    },
    dev: {
      region: '${vars.region}',
      account_id: '${vars.account_id}',
      node_env: 'develop',
    },
  },
  functions: [
    {
      key: 'hello_fn',
      name: 'hello_fn',
      code: {
        runtime: 'nodejs18',
        handler: 'index.handler',
        path: 'tests/fixtures/artifacts/artifact.zip',
      },
      memory: 128,
      timeout: 10,
      log: true,
      environment: {
        NODE_ENV: '${stages.node_env}',
      },
      storage: {},
    },
  ],
  tags: [
    {
      key: 'owner',
      value: 'geek-fun',
    },
  ],
} as ServerlessIac;

export const oneFcWithStageRos = {
  Description: 'my-demo-service stack',
  Mappings: {
    stages: {
      default: {
        node_env: 'default',
      },
      dev: {
        account_id: { Ref: 'account_id' },
        region: { Ref: 'region' },
        node_env: 'develop',
      },
    },
  },
  Metadata: { 'ALIYUN::ROS::Interface': { TemplateTags: ['Create by ROS CDK'] } },
  Parameters: {
    account_id: { Default: 1234567890, Type: 'String' },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    hello_fn: {
      DependsOn: [
        'my-demo-service_sls',
        'my-demo-service_sls_logstore',
        'my-demo-service_sls_index',
      ],
      Properties: {
        Code: { ZipFile: 'resolved-code' },
        EnvironmentVariables: { NODE_ENV: { 'Fn::FindInMap': ['stages', 'default', 'node_env'] } },
        FunctionName: 'hello_fn',
        Handler: 'index.handler',
        LogConfig: {
          EnableRequestMetrics: true,
          Logstore: {
            'Fn::GetAtt': ['my-demo-service_sls_logstore', 'LogstoreName'],
          },
          Project: {
            'Fn::GetAtt': ['my-demo-service_sls_logstore', 'ProjectName'],
          },
        },
        MemorySize: 128,
        Runtime: 'nodejs18',
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
    },
    'my-demo-service_sls': {
      Properties: {
        Name: 'my-demo-service-sls',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
      },
      Type: 'ALIYUN::SLS::Project',
    },
    'my-demo-service_sls_index': {
      Properties: {
        FullTextIndex: {
          Enable: true,
        },
        LogReduce: false,
        LogstoreName: {
          'Fn::GetAtt': ['my-demo-service_sls_logstore', 'LogstoreName'],
        },
        ProjectName: {
          'Fn::GetAtt': ['my-demo-service_sls', 'Name'],
        },
      },
      Type: 'ALIYUN::SLS::Index',
    },
    'my-demo-service_sls_logstore': {
      Properties: {
        AppendMeta: false,
        AutoSplit: false,
        EnableTracking: false,
        LogstoreName: 'my-demo-service-sls-logstore',
        PreserveStorage: false,
        ProjectName: {
          'Fn::GetAtt': ['my-demo-service_sls', 'Name'],
        },
        ShardCount: 2,
        TTL: 7,
      },
      Type: 'ALIYUN::SLS::Logstore',
    },
  },
};

export const oneFcWithContainerIac = {
  ...oneFcIac,
  functions: [
    {
      ...((oneFcIac.functions && oneFcIac.functions[0]) ?? {}),
      code: undefined,
      container: {
        image: 'registry.cn-hangzhou.aliyuncs.com/aliyunfc/abcd:1.6.0',
        cmd: 'npm start',
        port: 9200,
      },
    },
  ],
} as ServerlessIac;

export const oneFcWithContainerRos = {
  ...oneFcRos,
  Resources: {
    ...oneFcRos.Resources,
    hello_fn: {
      ...oneFcRos.Resources.hello_fn,
      Properties: {
        ...oneFcRos.Resources.hello_fn.Properties,
        Code: undefined,
        Runtime: 'custom-container',
        CustomContainerConfig: {
          Command: ['npm', 'start'],
          Image: 'registry.cn-hangzhou.aliyuncs.com/aliyunfc/abcd:1.6.0',
          Port: 9200,
        },
      },
    },
  },
};

export const oneFcWithGpuIac = {
  ...oneFcIac,
  functions: [
    {
      ...((oneFcIac.functions && oneFcIac.functions[0]) ?? {}),
      gpu: 'TESLA_8',
    },
  ],
} as ServerlessIac;
export const oneFcWithGpuRos = {
  ...oneFcRos,
  Resources: {
    ...oneFcRos.Resources,
    hello_fn: {
      ...oneFcRos.Resources.hello_fn,
      Properties: {
        ...oneFcRos.Resources.hello_fn.Properties,
        GpuConfig: {
          GpuMemorySize: 8192,
          GpuType: 'fc.gpu.tesla.1',
        },
      },
    },
  },
};

export const largeCodeRos = {
  Description: 'my-demo-service stack',
  Mappings: {
    stages: {
      dev: {
        account_id: {
          Ref: 'account_id',
        },
        region: {
          Ref: 'region',
        },
      },
    },
  },
  Metadata: {
    'ALIYUN::ROS::Interface': {
      TemplateTags: ['Create by ROS CDK'],
    },
  },
  Parameters: {
    account_id: {
      Default: 1234567890,
      Type: 'String',
    },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    'FCFunctionFormy-demo-service_artifacts_code_deployment': {
      Properties: {
        CAPort: 9000,
        Code: {
          OssBucketName: {
            'Fn::Sub': expect.stringContaining('assets-${ALIYUN::Region}'),
          },
          OssObjectName: 'c6a72ed7e7e83f01a000b75885758088fa050298a31a1e95d37ac88f08e42315.zip',
        },
        FunctionName: {
          'Fn::Join': [
            '-',
            [
              'ros-cdk',
              {
                'Fn::Select': [
                  0,
                  {
                    'Fn::Split': [
                      '-',
                      {
                        Ref: 'ALIYUN::StackId',
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        Handler: 'index.handler',
        MemorySize: 128,
        Runtime: 'python3.10',
        ServiceName: {
          'Fn::GetAtt': ['FCServiceFormy-demo-service_artifacts_code_deployment', 'ServiceName'],
        },
        Timeout: 3000,
      },
      Type: 'ALIYUN::FC::Function',
    },
    'FCRoleFormy-demo-service_artifacts_code_deployment': {
      Properties: {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: ['fc.aliyuncs.com'],
              },
            },
          ],
          Version: '1',
        },
        DeletionForce: false,
        IgnoreExisting: false,
        Policies: [
          {
            PolicyDocument: {
              Statement: [
                {
                  Action: ['oss:*'],
                  Effect: 'Allow',
                  Resource: ['*'],
                },
              ],
              Version: '1',
            },
            PolicyName: 'AliyunOSSFullAccess',
          },
          {
            PolicyDocument: {
              Statement: [
                {
                  Action: ['log:*'],
                  Effect: 'Allow',
                  Resource: ['*'],
                },
                {
                  Action: ['ram:CreateServiceLinkedRole'],
                  Condition: {
                    StringEquals: {
                      'ram:ServiceName': [
                        'audit.log.aliyuncs.com',
                        'alert.log.aliyuncs.com',
                        'middlewarelens.log.aliyuncs.com',
                        'storagelens.log.aliyuncs.com',
                        'ai-lens.log.aliyuncs.com',
                        'securitylens.log.aliyuncs.com',
                      ],
                    },
                  },
                  Effect: 'Allow',
                  Resource: ['*'],
                },
              ],
              Version: '1',
            },
            PolicyName: 'AliyunLogFullAccess',
          },
        ],
        RoleName: {
          'Fn::Join': [
            '-',
            [
              'ros-cdk',
              {
                'Fn::Select': [
                  0,
                  {
                    'Fn::Split': [
                      '-',
                      {
                        Ref: 'ALIYUN::StackId',
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
      },
      Type: 'ALIYUN::RAM::Role',
    },
    'FCServiceFormy-demo-service_artifacts_code_deployment': {
      Properties: {
        DeletionForce: false,
        Description: 'FC service for oss deployment by CDK',
        Role: {
          'Fn::GetAtt': ['FCRoleFormy-demo-service_artifacts_code_deployment', 'Arn'],
        },
        ServiceName: {
          'Fn::Join': [
            '-',
            [
              'ros-cdk',
              {
                'Fn::Select': [
                  0,
                  {
                    'Fn::Split': [
                      '-',
                      {
                        Ref: 'ALIYUN::StackId',
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
      },
      Type: 'ALIYUN::FC::Service',
    },
    gateway_event_api_R0VUXy9hcGkvaGVsbG8: {
      Properties: {
        ApiName: 'gateway_event_api_R0VUXy9hcGkvaGVsbG8',
        AuthType: 'ANONYMOUS',
        GroupId: {
          'Fn::GetAtt': ['my-demo-service_apigroup', 'GroupId'],
        },
        RequestConfig: {
          RequestHttpMethod: 'GET',
          RequestMode: 'PASSTHROUGH',
          RequestPath: '/api/hello',
          RequestProtocol: 'HTTP',
        },
        ResultSample: 'ServerlessInsight resultSample',
        ResultType: 'PASSTHROUGH',
        ServiceConfig: {
          FunctionComputeConfig: {
            FcVersion: '3.0',
            FunctionName: {
              'Fn::GetAtt': ['hello_fn', 'FunctionName'],
            },
            Method: 'GET',
            RoleArn: {
              'Fn::GetAtt': ['my-demo-service_role', 'Arn'],
            },
          },
          ServiceProtocol: 'FunctionCompute',
        },
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
        Visibility: 'PRIVATE',
      },
      Type: 'ALIYUN::ApiGateway::Api',
    },
    hello_fn: {
      DependsOn: [
        'my-demo-service_sls',
        'my-demo-service_sls_logstore',
        'my-demo-service_sls_index',
        'my-demo-service_artifacts_code_deployment',
      ],
      Properties: {
        Code: {
          OssBucketName: {
            'Fn::Sub': 'si-bootstrap-artifacts-${ALIYUN::AccountId}-${ALIYUN::Region}',
          },
          OssObjectName: 'hello_fn/43cb4c356149762dbe507fc1baede172-large-artifact.zip',
        },
        EnvironmentVariables: {
          NODE_ENV: 'production',
        },
        FunctionName: 'hello_fn',
        Handler: 'index.handler',
        LogConfig: {
          EnableRequestMetrics: true,
          Logstore: {
            'Fn::GetAtt': ['my-demo-service_sls_logstore', 'LogstoreName'],
          },
          Project: {
            'Fn::GetAtt': ['my-demo-service_sls_logstore', 'ProjectName'],
          },
        },
        MemorySize: 128,
        Runtime: 'nodejs18',
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
    },
    'my-demo-service_apigroup': {
      Properties: {
        GroupName: 'my-demo-service_apigroup',
        PassthroughHeaders: 'host',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
      },
      Type: 'ALIYUN::ApiGateway::Group',
    },
    'my-demo-service_artifacts_code_deployment': {
      Properties: {
        Parameters: {
          destinationBucket: {
            'Fn::Sub': 'si-bootstrap-artifacts-${ALIYUN::AccountId}-${ALIYUN::Region}',
          },
          retainOnCreate: false,
          sources: [
            {
              bucket: { 'Fn::Sub': expect.any(String) },
              fileName: 'hello_fn/43cb4c356149762dbe507fc1baede172-large-artifact.zip',
              objectKey: '2bfeafed8d3df0d44c235271cdf2aa7d908a3c2757af14a67d33d102847f46fd.zip',
            },
          ],
        },
        ServiceToken: {
          'Fn::GetAtt': ['FCFunctionFormy-demo-service_artifacts_code_deployment', 'ARN'],
        },
        Timeout: 3000,
      },
      Type: 'ALIYUN::ROS::CustomResource',
    },
    'my-demo-service_deployment': {
      Properties: {
        ApiId: {
          'Fn::GetAtt': ['gateway_event_api_R0VUXy9hcGkvaGVsbG8', 'ApiId'],
        },
        Description: 'my-demo-service Api Gateway deployment',
        GroupId: {
          'Fn::GetAtt': ['my-demo-service_apigroup', 'GroupId'],
        },
        StageName: 'RELEASE',
      },
      Type: 'ALIYUN::ApiGateway::Deployment',
    },
    'my-demo-service_role': {
      Properties: {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: ['apigateway.aliyuncs.com'],
              },
            },
          ],
          Version: '1',
        },
        Description: 'my-demo-service role',
        Policies: [
          {
            PolicyDocument: {
              Statement: [
                {
                  Action: ['fc:InvokeFunction'],
                  Effect: 'Allow',
                  Resource: ['*'],
                },
              ],
              Version: '1',
            },
            PolicyName: 'my-demo-service-policy',
          },
        ],
        RoleName: 'my-demo-service-gateway-access-role',
      },
      Type: 'ALIYUN::RAM::Role',
    },
    'my-demo-service_sls': {
      Properties: {
        Name: 'my-demo-service-sls',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
      },
      Type: 'ALIYUN::SLS::Project',
    },
    'my-demo-service_sls_index': {
      Properties: {
        FullTextIndex: {
          Enable: true,
        },
        LogReduce: false,
        LogstoreName: {
          'Fn::GetAtt': ['my-demo-service_sls_logstore', 'LogstoreName'],
        },
        ProjectName: {
          'Fn::GetAtt': ['my-demo-service_sls', 'Name'],
        },
      },
      Type: 'ALIYUN::SLS::Index',
    },
    'my-demo-service_sls_logstore': {
      Properties: {
        AppendMeta: false,
        AutoSplit: false,
        EnableTracking: false,
        LogstoreName: 'my-demo-service-sls-logstore',
        PreserveStorage: false,
        ProjectName: {
          'Fn::GetAtt': ['my-demo-service_sls', 'Name'],
        },
        ShardCount: 2,
        TTL: 7,
      },
      Type: 'ALIYUN::SLS::Logstore',
    },
  },
};
export const defaultContext = {
  accessKeyId: 'access key id',
  accessKeySecret: 'access key secret',
  iacLocation: expect.stringContaining('tests/fixtures/serverless-insight.yml'),
  parameters: [],
  region: 'cn-hangzhou',
  securityToken: 'account id',
  stackName: 'my-demo-stack',
  stage: 'default',
};

export const esServerlessMinimumIac = {
  service: 'my-demo-es-serverless-service',
  version: '0.0.1',
  provider: {
    name: 'aliyun' as ProviderEnum,
    region: 'cn-hangzhou',
  },
  databases: [
    {
      key: 'insight_es_db_test',
      name: 'insight-poc-es-test',
      type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
      version: DatabaseVersionEnum['ES_SEARCH_7.10'],
      security: {
        basicAuth: {
          username: 'test-username',
          password: 'test-password',
        },
      },
      cu: { min: 1, max: 8 },
      storage: { min: 20 },
    },
  ],
} as unknown as ServerlessIac;

export const esServerlessMinimumRos = {
  Description: 'my-demo-es-serverless-service stack',
  Metadata: { 'ALIYUN::ROS::Interface': { TemplateTags: ['Create by ROS CDK'] } },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    insight_es_db_test: {
      Properties: {
        AppName: 'insight-poc-es-test',
        AppVersion: '7.10',
        Authentication: {
          BasicAuth: [
            {
              Password: 'test-password',
            },
          ],
        },
        QuotaInfo: {
          AppType: 'STANDARD',
          Cu: 1,
          Storage: 20,
        },
        // Network: [
        //   {
        //     Enabled: true,
        //     Type: 'PUBLIC_KIBANA',
        //   },
        //   {
        //     Enabled: true,
        //     Type: 'PUBLIC_ES',
        //   },
        // ],
      },
      Type: 'ALIYUN::ElasticSearchServerless::App',
    },
  },
};

export const bucketMinimumIac = {
  version: '0.0.1',
  provider: {
    name: 'aliyun',
    region: 'cn-hangzhou',
  },
  service: 'my-bucket-service',
  buckets: [
    {
      key: 'my_bucket',
      name: 'my-bucket',
    },
  ],
} as unknown as ServerlessIac;

export const bucketMinimumRos = {
  Description: 'my-bucket-service stack',
  Metadata: { 'ALIYUN::ROS::Interface': { TemplateTags: ['Create by ROS CDK'] } },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    my_bucket: {
      Properties: {
        BucketName: 'my-bucket',
        AccessControl: 'private',
        DeletionForce: false,
        EnableOssHdfsService: false,
        RedundancyType: 'LRS',
      },
      Type: 'ALIYUN::OSS::Bucket',
    },
  },
};

export const bucketWithWebsiteIac = {
  version: '0.0.1',
  provider: {
    name: 'aliyun',
    region: 'cn-hangzhou',
  },
  service: 'my-bucket-service',
  buckets: [
    {
      key: 'my_bucket',
      name: 'my-bucket',
      website: {
        code: 'tests/fixtures/artifacts/large-artifact.zip',
        domain: 'my-bucket.com',
        index: 'index.html',
        error_page: '404.html',
        error_code: 404,
      },
    },
  ],
} as ServerlessIac;

export const bucketWithWebsiteRos = {
  Description: 'my-bucket-service stack',
  Metadata: {
    'ALIYUN::ROS::Interface': {
      TemplateTags: ['Create by ROS CDK'],
    },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    FCFunctionForsi_auto_my_bucket_bucket_code_deployment: {
      Properties: {
        CAPort: 9000,
        Code: {
          OssBucketName: {
            'Fn::Sub': expect.any(String),
          },
          OssObjectName: 'c6a72ed7e7e83f01a000b75885758088fa050298a31a1e95d37ac88f08e42315.zip',
        },
        FunctionName: {
          'Fn::Join': [
            '-',
            [
              'ros-cdk',
              {
                'Fn::Select': [
                  0,
                  {
                    'Fn::Split': [
                      '-',
                      {
                        Ref: 'ALIYUN::StackId',
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        Handler: 'index.handler',
        MemorySize: 128,
        Runtime: 'python3.10',
        ServiceName: {
          'Fn::GetAtt': ['FCServiceForsi_auto_my_bucket_bucket_code_deployment', 'ServiceName'],
        },
        Timeout: 3000,
      },
      Type: 'ALIYUN::FC::Function',
    },
    FCServiceForsi_auto_my_bucket_bucket_code_deployment: {
      Properties: {
        DeletionForce: false,
        Description: 'FC service for oss deployment by CDK',
        Role: {
          'Fn::GetAtt': ['si_auto_od_bucket_role', 'Arn'],
        },
        ServiceName: {
          'Fn::Join': [
            '-',
            [
              'ros-cdk',
              {
                'Fn::Select': [
                  0,
                  {
                    'Fn::Split': [
                      '-',
                      {
                        Ref: 'ALIYUN::StackId',
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
      },
      Type: 'ALIYUN::FC::Service',
    },
    my_bucket: {
      Properties: {
        AccessControl: 'private',
        BucketName: 'my-bucket',
        DeletionForce: false,
        EnableOssHdfsService: false,
        RedundancyType: 'LRS',
        WebsiteConfigurationV2: {
          ErrorDocument: {
            HttpStatus: '404',
            Key: '404.html',
          },
          IndexDocument: {
            Suffix: 'index.html',
            SupportSubDir: 'true',
            Type: '0',
          },
        },
      },
      Type: 'ALIYUN::OSS::Bucket',
    },
    my_bucket_custom_domain_bXktYnVja2V0LmNvbQ: {
      Properties: {
        BucketName: {
          'Fn::GetAtt': ['my_bucket', 'Name'],
        },
        DomainName: 'my-bucket.com',
      },
      Type: 'ALIYUN::OSS::Domain',
    },
    si_auto_my_bucket_bucket_code_deployment: {
      Properties: {
        Parameters: {
          destinationBucket: {
            'Fn::GetAtt': ['my_bucket', 'Name'],
          },
          retainOnCreate: false,
          sources: [
            {
              bucket: {
                'Fn::Sub': expect.any(String),
              },
              fileName: 'large-artifact.zip',
              objectKey: '2bfeafed8d3df0d44c235271cdf2aa7d908a3c2757af14a67d33d102847f46fd.zip',
            },
          ],
        },
        ServiceToken: {
          'Fn::GetAtt': ['FCFunctionForsi_auto_my_bucket_bucket_code_deployment', 'ARN'],
        },
        Timeout: 3000,
      },
      Type: 'ALIYUN::ROS::CustomResource',
    },
    si_auto_od_bucket_role: {
      Properties: {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: ['fc.aliyuncs.com'],
              },
            },
          ],
          Version: '1',
        },
        DeletionForce: false,
        Description:
          'roles created by ServerlessInsight for oss deployment to put files to oss bucket during deployment',
        IgnoreExisting: false,
        PolicyAttachments: {
          System: ['AliyunOSSFullAccess', 'AliyunLogFullAccess'],
        },
        RoleName: {
          'Fn::Sub': 'si-auto-od-bucket-role-${ALIYUN::StackId}',
        },
      },
      Type: 'ALIYUN::RAM::Role',
    },
  },
};

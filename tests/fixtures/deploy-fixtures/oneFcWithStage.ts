import { ServerlessIac } from '../../../src/types';

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
      name: 'hello-fn',
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
      DependsOn: ['sls_project', 'sls_logstore', 'sls_index'],
      Properties: {
        Code: { ZipFile: 'resolved-code' },
        EnvironmentVariables: { NODE_ENV: { 'Fn::FindInMap': ['stages', 'default', 'node_env'] } },
        FunctionName: 'hello-fn',
        Handler: 'index.handler',
        LogConfig: {
          EnableRequestMetrics: true,
          Logstore: {
            'Fn::GetAtt': ['sls_logstore', 'LogstoreName'],
          },
          Project: {
            'Fn::GetAtt': ['sls_logstore', 'ProjectName'],
          },
        },
        MemorySize: 128,
        Runtime: 'nodejs18',
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
    },
    sls_project: {
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
    sls_index: {
      Properties: {
        FullTextIndex: {
          Enable: true,
        },
        LogReduce: false,
        LogstoreName: {
          'Fn::GetAtt': ['sls_logstore', 'LogstoreName'],
        },
        ProjectName: {
          'Fn::GetAtt': ['sls_project', 'Name'],
        },
      },
      Type: 'ALIYUN::SLS::Index',
    },
    sls_logstore: {
      Properties: {
        AppendMeta: false,
        AutoSplit: false,
        EnableTracking: false,
        LogstoreName: 'my-demo-service-sls-logstore',
        PreserveStorage: false,
        ProjectName: {
          'Fn::GetAtt': ['sls_project', 'Name'],
        },
        ShardCount: 2,
        TTL: 7,
      },
      Type: 'ALIYUN::SLS::Logstore',
    },
  },
};

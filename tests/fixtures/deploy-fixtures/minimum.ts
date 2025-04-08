import { ProviderEnum } from '../../../src/common';
import { ServerlessIac } from '../../../src/types';

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
      name: 'hello-fn',
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
    my_demo_minimum_service_sls: {
      Properties: {
        Name: 'my-demo-minimum-service-sls',
      },
      Type: 'ALIYUN::SLS::Project',
    },
    my_demo_minimum_service_sls_index: {
      Properties: {
        FullTextIndex: {
          Enable: true,
        },
        LogReduce: false,
        LogstoreName: {
          'Fn::GetAtt': ['my_demo_minimum_service_sls_logstore', 'LogstoreName'],
        },
        ProjectName: {
          'Fn::GetAtt': ['my_demo_minimum_service_sls', 'Name'],
        },
      },
      Type: 'ALIYUN::SLS::Index',
    },
    my_demo_minimum_service_sls_logstore: {
      Properties: {
        AppendMeta: false,
        AutoSplit: false,
        EnableTracking: false,
        LogstoreName: 'my-demo-minimum-service-sls-logstore',
        PreserveStorage: false,
        ProjectName: {
          'Fn::GetAtt': ['my_demo_minimum_service_sls', 'Name'],
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
        FunctionName: 'hello-fn',
        Handler: 'index.handler',
        Runtime: 'nodejs18',
      },
      Type: 'ALIYUN::FC3::Function',
    },
  },
};

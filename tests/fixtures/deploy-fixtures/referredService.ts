import { cloneDeep, set } from 'lodash';
import { oneFcOneGatewayIac } from './oneFcOneGateway';

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
    gateway_event_agw_api_deployment_get_api_hello: {
      Properties: {
        ApiId: {
          'Fn::GetAtt': ['gateway_event_agw_api_get_api_hello', 'ApiId'],
        },
        Description: 'my-demo-service-dev Api Gateway deployment for api: GET /api/hello',
        GroupId: {
          'Fn::GetAtt': ['gateway_event_agw_group', 'GroupId'],
        },
        StageName: 'RELEASE',
      },
      Type: 'ALIYUN::ApiGateway::Deployment',
    },
    gateway_event_agw_api_get_api_hello: {
      Properties: {
        ApiName: 'gateway-event-agw-api-get-api-hello',
        AuthType: 'ANONYMOUS',
        GroupId: {
          'Fn::GetAtt': ['gateway_event_agw_group', 'GroupId'],
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
            FcRegionId: 'cn-hangzhou',
            FcVersion: '3.0',
            FunctionName: {
              'Fn::GetAtt': ['hello_fn', 'FunctionName'],
            },
            Method: 'GET',
            RoleArn: {
              'Fn::GetAtt': ['gateway_event_agw_role', 'Arn'],
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
    gateway_event_agw_custom_domain: {
      DependsOn: ['gateway_event_agw_custom_domain_record'],
      Properties: {
        DomainName: 'api.my-demo-service.com',
        GroupId: {
          'Fn::GetAtt': ['gateway_event_agw_group', 'GroupId'],
        },
      },
      Type: 'ALIYUN::ApiGateway::CustomDomain',
    },
    gateway_event_agw_custom_domain_record: {
      Properties: {
        DomainName: 'my-demo-service.com',
        RR: 'api',
        TTL: 600,
        Type: 'CNAME',
        Value: {
          'Fn::GetAtt': ['gateway_event_agw_group', 'SubDomain'],
        },
      },
      Type: 'ALIYUN::DNS::DomainRecord',
    },
    gateway_event_agw_group: {
      Properties: {
        GroupName: 'my-demo-service-dev-agw-group',
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
    gateway_event_agw_role: {
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
            PolicyName: 'my-demo-service-dev-gateway-event-policy',
          },
        ],
        RoleName: 'gateway-event-agw-access-role',
      },
      Type: 'ALIYUN::RAM::Role',
    },
    hello_fn: {
      DependsOn: ['sls_project', 'sls_logstore', 'sls_index'],
      Properties: {
        Code: {
          ZipFile: 'resolved-code',
        },
        EnvironmentVariables: {
          NODE_ENV: 'production',
        },
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
        LogstoreName: 'my-demo-service-dev-sls-logstore',
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

import { ServerlessIac } from '../../src/types';

export const oneFcOneGatewayIac = {
  service: 'my-demo-service',
  version: '0.0.1',
  provider: 'aliyun',
  vars: {
    region: 'cn-hangzhou',
    account_id: 1234567890,
  },
  stages: {
    dev: {
      region: '${vars:region}',
      account_id: '${vars:account_id}',
    },
  },
  functions: [
    {
      key: 'hello_fn',
      name: 'hello_fn',
      runtime: 'nodejs18',
      handler: 'index.handler',
      code: 'artifact.zip',
      memory: 128,
      timeout: 10,
      environment: {
        NODE_ENV: 'production',
      },
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
          backend: 'demo_fn_gateway',
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
    stages: { dev: { account_id: '${vars:account_id}', region: '${vars:region}' } },
  },
  Metadata: { 'ALIYUN::ROS::Interface': { TemplateTags: ['Create by ROS CDK'] } },
  Parameters: {
    account_id: { Default: 1234567890, Type: 'String' },
    region: { Default: 'cn-hangzhou', Type: 'String' },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    gateway_event_api_get__api_hello: {
      Properties: {
        ApiName: 'gateway_event_api_get__api_hello',
        GroupId: { 'Fn::GetAtt': ['my-demo-service_apigroup', 'GroupId'] },
        RequestConfig: {
          RequestHttpMethod: 'GET',
          RequestMode: 'PASSTHROUGH',
          RequestPath: '/api/hello',
          RequestProtocol: 'HTTP',
        },
        ResultSample: 'ServerlessInsight resultSample',
        ResultType: 'JSON',
        ServiceConfig: {
          FunctionComputeConfig: {
            FunctionName: 'demo_fn_gateway',
            RoleArn: { 'Fn::GetAtt': ['my-demo-service_role', 'Arn'] },
            ServiceName: 'my-demo-service-service',
          },
          ServiceProtocol: 'FunctionCompute',
        },
        Tags: [{ Key: 'owner', Value: 'geek-fun' }],
        Visibility: 'PRIVATE',
      },
      Type: 'ALIYUN::ApiGateway::Api',
    },
    hello_fn: {
      Properties: {
        Code: { ZipFile: 'resolved-code' },
        EnvironmentVariables: { NODE_ENV: 'production' },
        FunctionName: 'hello_fn',
        Handler: 'index.handler',
        MemorySize: 128,
        Runtime: 'nodejs18',
        ServiceName: 'my-demo-service-service',
        Timeout: 10,
      },
      Type: 'ALIYUN::FC::Function',
    },
    'my-demo-service-service': {
      Properties: {
        ServiceName: 'my-demo-service-service',
        Tags: [{ Key: 'owner', Value: 'geek-fun' }],
      },
      Type: 'ALIYUN::FC::Service',
    },
    'my-demo-service_apigroup': {
      Properties: {
        GroupName: 'my-demo-service_apigroup',
        Tags: [{ Key: 'owner', Value: 'geek-fun' }],
      },
      Type: 'ALIYUN::ApiGateway::Group',
    },
    'my-demo-service_role': {
      Properties: {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: { Service: ['apigateway.aliyuncs.com'] },
            },
          ],
          Version: '1',
        },
        Description: 'my-demo-service role',
        Policies: [
          {
            PolicyDocument: {
              Statement: [{ Action: ['fc:InvokeFunction'], Effect: 'Allow', Resource: ['*'] }],
              Version: '1',
            },
            PolicyName: 'my-demo-service-policy',
          },
        ],
        RoleName: 'my-demo-service-gateway-access-role',
      },
      Type: 'ALIYUN::RAM::Role',
    },
  },
};

export const oneFcIac = {
  service: 'my-demo-service',
  version: '0.0.1',
  provider: 'aliyun',
  vars: {
    region: 'cn-hangzhou',
    account_id: 1234567890,
  },
  stages: {
    dev: {
      region: '${vars:region}',
      account_id: '${vars:account_id}',
    },
  },
  functions: [
    {
      key: 'hello_fn',
      name: 'hello_fn',
      runtime: 'nodejs18',
      handler: 'index.handler',
      code: 'artifact.zip',
      memory: 128,
      timeout: 10,
      environment: {
        NODE_ENV: 'production',
      },
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
    stages: { dev: { account_id: '${vars:account_id}', region: '${vars:region}' } },
  },
  Metadata: { 'ALIYUN::ROS::Interface': { TemplateTags: ['Create by ROS CDK'] } },
  Parameters: {
    account_id: { Default: 1234567890, Type: 'String' },
    region: { Default: 'cn-hangzhou', Type: 'String' },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    hello_fn: {
      Properties: {
        Code: { ZipFile: 'resolved-code' },
        EnvironmentVariables: { NODE_ENV: 'production' },
        FunctionName: 'hello_fn',
        Handler: 'index.handler',
        MemorySize: 128,
        Runtime: 'nodejs18',
        ServiceName: 'my-demo-service-service',
        Timeout: 10,
      },
      Type: 'ALIYUN::FC::Function',
    },
    'my-demo-service-service': {
      Properties: {
        ServiceName: 'my-demo-service-service',
        Tags: [{ Key: 'owner', Value: 'geek-fun' }],
      },
      Type: 'ALIYUN::FC::Service',
    },
  },
};

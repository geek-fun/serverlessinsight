import { DatabaseEnum, Provider, ServerlessIac } from '../../src/types';
import { cloneDeep, set } from 'lodash';

export const oneFcOneGatewayIac = {
  service: 'my-demo-service',
  version: '0.0.1',
  provider: 'aliyun' as Provider,
  vars: {
    region: 'cn-hangzhou',
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
      runtime: 'nodejs18',
      handler: 'index.handler',
      code: 'tests/fixtures/artifacts/artifact.zip',
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
        account_id: { Ref: 'account_id' },
        region: { Ref: 'region' },
      },
    },
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
            FunctionName: { 'Fn::GetAtt': ['hello_fn', 'FunctionName'] },
            RoleArn: { 'Fn::GetAtt': ['my-demo-service_role', 'Arn'] },
            FcVersion: '3.0',
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
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
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
    region: { Default: 'cn-hangzhou', Type: 'String' },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    gateway_event_api_get__api_hello: {
      Properties: {
        ApiName: 'gateway_event_api_get__api_hello',
        GroupId: { 'Fn::GetAtt': ['my-demo-service-dev_apigroup', 'GroupId'] },
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
            FunctionName: { 'Fn::GetAtt': ['hello_fn', 'FunctionName'] },
            RoleArn: { 'Fn::GetAtt': ['my-demo-service-dev_role', 'Arn'] },
            FcVersion: '3.0',
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
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
    },
    'my-demo-service-dev_apigroup': {
      Properties: {
        GroupName: 'my-demo-service-dev_apigroup',
        Tags: [{ Key: 'owner', Value: 'geek-fun' }],
      },
      Type: 'ALIYUN::ApiGateway::Group',
    },
    'my-demo-service-dev_role': {
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
        Description: 'my-demo-service-dev role',
        Policies: [
          {
            PolicyDocument: {
              Statement: [{ Action: ['fc:InvokeFunction'], Effect: 'Allow', Resource: ['*'] }],
              Version: '1',
            },
            PolicyName: 'my-demo-service-dev-policy',
          },
        ],
        RoleName: 'my-demo-service-dev-gateway-access-role',
      },
      Type: 'ALIYUN::RAM::Role',
    },
  },
};

export const minimumIac = {
  service: 'my-demo-minimum-service',
  version: '0.0.1',
  provider: 'aliyun' as Provider,

  functions: [
    {
      key: 'hello_fn',
      name: 'hello_fn',
      runtime: 'nodejs18',
      handler: 'index.handler',
      code: 'tests/fixtures/artifacts/artifact.zip',
    },
  ],
} as ServerlessIac;

export const minimumRos = {
  Description: 'my-demo-minimum-service stack',
  Metadata: { 'ALIYUN::ROS::Interface': { TemplateTags: ['Create by ROS CDK'] } },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    hello_fn: {
      Properties: {
        Code: { ZipFile: 'resolved-code' },
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
  provider: 'aliyun' as Provider,
  vars: {
    region: 'cn-hangzhou',
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
      runtime: 'nodejs18',
      handler: 'index.handler',
      code: 'tests/fixtures/artifacts/artifact.zip',
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
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
    },
  },
};

export const oneFcIacWithStage = {
  service: 'my-demo-service',
  version: '0.0.1',
  provider: 'aliyun' as Provider,
  vars: {
    region: 'cn-hangzhou',
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
      runtime: 'nodejs18',
      handler: 'index.handler',
      code: 'tests/fixtures/artifacts/artifact.zip',
      memory: 128,
      timeout: 10,
      environment: {
        NODE_ENV: '${stages.node_env}',
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
    region: { Default: 'cn-hangzhou', Type: 'String' },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    hello_fn: {
      Properties: {
        Code: { ZipFile: 'resolved-code' },
        EnvironmentVariables: { NODE_ENV: { 'Fn::FindInMap': ['stages', 'default', 'node_env'] } },
        FunctionName: 'hello_fn',
        Handler: 'index.handler',
        MemorySize: 128,
        Runtime: 'nodejs18',
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
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
    region: {
      Default: 'cn-hangzhou',
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
        Timeout: 300,
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
    gateway_event_api_get__api_hello: {
      Properties: {
        ApiName: 'gateway_event_api_get__api_hello',
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
        ResultType: 'JSON',
        ServiceConfig: {
          FunctionComputeConfig: {
            FcVersion: '3.0',
            FunctionName: {
              'Fn::GetAtt': ['hello_fn', 'FunctionName'],
            },
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
      Properties: {
        Code: {
          OssBucketName: {
            'Fn::GetAtt': ['my-demo-service_artifacts_bucket', 'Name'],
          },
          OssObjectName: 'hello_fn/43cb4c356149762dbe507fc1baede172-large-artifact.zip',
        },
        EnvironmentVariables: {
          NODE_ENV: 'production',
        },
        FunctionName: 'hello_fn',
        Handler: 'index.handler',
        MemorySize: 128,
        Runtime: 'nodejs18',
        Timeout: 10,
      },
      Type: 'ALIYUN::FC3::Function',
    },
    'my-demo-service_apigroup': {
      Properties: {
        GroupName: 'my-demo-service_apigroup',
        Tags: [
          {
            Key: 'owner',
            Value: 'geek-fun',
          },
        ],
      },
      Type: 'ALIYUN::ApiGateway::Group',
    },
    'my-demo-service_artifacts_bucket': {
      Properties: {
        AccessControl: 'private',
        BucketName: 'my-demo-service-artifacts-bucket',
        DeletionForce: false,
        EnableOssHdfsService: false,
        RedundancyType: 'LRS',
        ServerSideEncryptionConfiguration: {
          SSEAlgorithm: 'KMS',
        },
      },
      Type: 'ALIYUN::OSS::Bucket',
    },
    'my-demo-service_artifacts_code_deployment': {
      Properties: {
        Parameters: {
          destinationBucket: {
            'Fn::GetAtt': ['my-demo-service_artifacts_bucket', 'Name'],
          },
          retainOnCreate: false,
          sources: [
            {
              bucket: { 'Fn::Sub': expect.stringContaining('assets-${ALIYUN::Region}') },
              fileName: 'hello_fn/43cb4c356149762dbe507fc1baede172-large-artifact.zip',
              objectKey: '2bfeafed8d3df0d44c235271cdf2aa7d908a3c2757af14a67d33d102847f46fd.zip',
            },
          ],
        },
        ServiceToken: {
          'Fn::GetAtt': ['FCFunctionFormy-demo-service_artifacts_code_deployment', 'ARN'],
        },
        Timeout: 300,
      },
      Type: 'ALIYUN::ROS::CustomResource',
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

export const esServerlessMinimumIac: ServerlessIac = {
  service: 'my-demo-es-serverless-service',
  version: '0.0.1',
  provider: 'aliyun' as Provider as Provider,
  databases: [
    {
      key: 'insight_es_db_test',
      name: 'insight-poc-es-test',
      type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
      version: '7.10',
      engineMode: 'SEARCH',
      security: {
        basicAuth: {
          password: 'test-password',
        },
      },
      cu: 1,
      storageSize: 20,
    },
  ],
};

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

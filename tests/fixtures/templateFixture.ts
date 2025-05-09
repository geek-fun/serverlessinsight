export const jsonTemplate = {
  Description: 'insight-poc stack',
  Metadata: {
    'ALIYUN::ROS::Interface': {
      TemplateTags: ['Create by ROS CDK'],
    },
  },
  ROSTemplateFormatVersion: '2015-09-01',
  Parameters: {
    region: {
      Type: 'String',
      Default: 'cn-hangzhou',
    },
    testv: {
      Type: 'String',
      Default: 'testVarValue',
    },
    handler: {
      Type: 'String',
      Default: 'index.handler',
    },
  },
  Mappings: {
    stages: {
      default: {
        region: {
          Ref: 'region',
        },
        node_env: 'default',
      },
      dev: {
        region: {
          Ref: 'region',
        },
        node_env: 'development',
      },
      prod: {
        region: 'cn-shanghai',
      },
    },
  },
  Resources: {
    sls_project: {
      Type: 'ALIYUN::SLS::Project',
      Properties: {
        Name: 'insight-poc-sls',
        Tags: [
          {
            Value: 'ServerlessInsight',
            Key: 'iac-provider',
          },
          {
            Value: 'geek-fun',
            Key: 'owner',
          },
        ],
      },
    },
    sls_logstore: {
      Type: 'ALIYUN::SLS::Logstore',
      Properties: {
        LogstoreName: 'insight-poc-sls-logstore',
        ProjectName: {
          'Fn::GetAtt': ['sls_project', 'Name'],
        },
        AppendMeta: false,
        AutoSplit: false,
        EnableTracking: false,
        PreserveStorage: false,
        ShardCount: 2,
        TTL: 7,
      },
    },
    sls_index: {
      Type: 'ALIYUN::SLS::Index',
      Properties: {
        FullTextIndex: {
          Enable: true,
        },
        LogstoreName: {
          'Fn::GetAtt': ['sls_logstore', 'LogstoreName'],
        },
        ProjectName: {
          'Fn::GetAtt': ['sls_project', 'Name'],
        },
        LogReduce: false,
      },
    },
    insight_poc_fn: {
      Type: 'ALIYUN::FC3::Function',
      Properties: {
        FunctionName: 'insight-poc-fn',
        Handler: {
          Ref: 'handler',
        },
        Runtime: 'nodejs18',
        Code: {
          ZipFile:
            'UEsDBBQAAAAAADiNNVkAAAAAAAAAAAAAAAAJACAAYXJ0aWZhY3QvVVQNAAfdlO5m7pTuZt2U7mZ1eAsAAQT1AQAABBQAAABQSwMEFAAIAAgA44w1WQAAAAAAAAAAngAAABEAIABhcnRpZmFjdC9pbmRleC5qc1VUDQAHO5TuZt6U7mbdlO5mdXgLAAEE9QEAAAQUAAAAhYuxCsJAEAX7fMV2uUDIDwR7rS2sz8uaBB+7srsJAfHf5cDebhhm+HiphQ9LlglsdKLHJiVWFUq8s0RPRSX4qJCBey7Pjt4NVe0KHqBzaq9sOxvY/SK+zkvQmQGlmxqmthtr/7uTbEBP/5fP2HwBUEsHCG5M74NvAAAAngAAAFBLAQIUAxQAAAAAADiNNVkAAAAAAAAAAAAAAAAJACAAAAAAAAAAAADtQQAAAABhcnRpZmFjdC9VVA0AB92U7mbulO5m3ZTuZnV4CwABBPUBAAAEFAAAAFBLAQIUAxQACAAIAOOMNVluTO+DbwAAAJ4AAAARACAAAAAAAAAAAACkgUcAAABhcnRpZmFjdC9pbmRleC5qc1VUDQAHO5TuZt6U7mbdlO5mdXgLAAEE9QEAAAQUAAAAUEsFBgAAAAACAAIAtgAAABUBAAAAAA==',
        },
        EnvironmentVariables: {
          NODE_ENV: {
            'Fn::FindInMap': ['stages', 'default', 'node_env'],
          },
          TEST_VAR: {
            Ref: 'testv',
          },
          TEST_VAR_EXTRA: {
            'Fn::Sub': 'abcds-${testv}-andyou',
          },
        },
        LogConfig: {
          Project: {
            'Fn::GetAtt': ['sls_logstore', 'ProjectName'],
          },
          Logstore: {
            'Fn::GetAtt': ['sls_logstore', 'LogstoreName'],
          },
          EnableRequestMetrics: true,
        },
        MemorySize: 512,
        Timeout: 10,
      },
      DependsOn: ['sls_project', 'sls_logstore', 'sls_index'],
    },
    gateway_event_agw_role: {
      Type: 'ALIYUN::RAM::Role',
      Properties: {
        AssumeRolePolicyDocument: {
          Version: '1',
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: ['apigateway.aliyuncs.com'],
              },
            },
          ],
        },
        RoleName: 'insight-poc-gateway-agw-access-role',
        Description: 'insight-poc role',
        Policies: [
          {
            PolicyName: 'insight-poc-insight-poc-gateway-policy',
            PolicyDocument: {
              Version: '1',
              Statement: [
                {
                  Action: ['fc:InvokeFunction'],
                  Resource: ['*'],
                  Effect: 'Allow',
                },
              ],
            },
          },
        ],
      },
    },
    gateway_event_agw_group: {
      Type: 'ALIYUN::ApiGateway::Group',
      Properties: {
        GroupName: 'insight-poc-agw-group',
        PassthroughHeaders: 'host',
        Tags: [
          {
            Value: 'ServerlessInsight',
            Key: 'iac-provider',
          },
          {
            Value: 'geek-fun',
            Key: 'owner',
          },
        ],
      },
    },
    gateway_event_agw_api_get_api_hello: {
      Type: 'ALIYUN::ApiGateway::Api',
      Properties: {
        ApiName: 'insight-poc-gateway-agw-api-get-api-hello',
        GroupId: {
          'Fn::GetAtt': ['gateway_event_agw_group', 'GroupId'],
        },
        RequestConfig: {
          RequestPath: '/api/hello',
          RequestMode: 'PASSTHROUGH',
          RequestProtocol: 'HTTP',
          RequestHttpMethod: 'GET',
        },
        ServiceConfig: {
          FunctionComputeConfig: {
            FcVersion: '3.0',
            Method: 'GET',
            FcRegionId: 'cn-hangzhou',
            RoleArn: {
              'Fn::GetAtt': ['gateway_event_agw_role', 'Arn'],
            },
            FunctionName: {
              'Fn::GetAtt': ['insight_poc_fn', 'FunctionName'],
            },
          },
          ServiceProtocol: 'FunctionCompute',
        },
        Visibility: 'PRIVATE',
        AuthType: 'ANONYMOUS',
        ResultSample: 'ServerlessInsight resultSample',
        ResultType: 'PASSTHROUGH',
        Tags: [
          {
            Value: 'ServerlessInsight',
            Key: 'iac-provider',
          },
          {
            Value: 'geek-fun',
            Key: 'owner',
          },
        ],
      },
    },
    gateway_event_agw_api_deployment_get_api_hello: {
      Type: 'ALIYUN::ApiGateway::Deployment',
      Properties: {
        ApiId: {
          'Fn::GetAtt': ['gateway_event_agw_api_get_api_hello', 'ApiId'],
        },
        GroupId: {
          'Fn::GetAtt': ['gateway_event_agw_group', 'GroupId'],
        },
        StageName: 'RELEASE',
        Description: 'insight-poc Api Gateway deployment for api: GET /api/hello',
      },
    },
  },
};

export const yamlTemplate = `
Description: insight-poc stack
Metadata:
  ALIYUN::ROS::Interface:
    TemplateTags:
      - Create by ROS CDK
ROSTemplateFormatVersion: 2015-09-01
Parameters:
  region:
    Type: String
    Default: cn-hangzhou
  testv:
    Type: String
    Default: testVarValue
  handler:
    Type: String
    Default: index.handler
Mappings:
  stages:
    default:
      region:
        Ref: region
      node_env: default
    dev:
      region:
        Ref: region
      node_env: development
    prod:
      region: cn-shanghai
Resources:
  sls_project:
    Type: ALIYUN::SLS::Project
    Properties:
      Name: insight-poc-sls
      Tags:
        - Value: ServerlessInsight
          Key: iac-provider
        - Value: geek-fun
          Key: owner
  sls_logstore:
    Type: ALIYUN::SLS::Logstore
    Properties:
      LogstoreName: insight-poc-sls-logstore
      ProjectName:
        Fn::GetAtt:
          - sls_project
          - Name
      AppendMeta: false
      AutoSplit: false
      EnableTracking: false
      PreserveStorage: false
      ShardCount: 2
      TTL: 7
  sls_index:
    Type: ALIYUN::SLS::Index
    Properties:
      FullTextIndex:
        Enable: true
      LogstoreName:
        Fn::GetAtt:
          - sls_logstore
          - LogstoreName
      ProjectName:
        Fn::GetAtt:
          - sls_project
          - Name
      LogReduce: false
  insight_poc_fn:
    Type: ALIYUN::FC3::Function
    Properties:
      FunctionName: insight-poc-fn
      Handler:
        Ref: handler
      Runtime: nodejs18
      Code:
        ZipFile: UEsDBBQAAAAAADiNNVkAAAAAAAAAAAAAAAAJACAAYXJ0aWZhY3QvVVQNAAfdlO5m7pTuZt2U7mZ1eAsAAQT1AQAABBQAAABQSwMEFAAIAAgA44w1WQAAAAAAAAAAngAAABEAIABhcnRpZmFjdC9pbmRleC5qc1VUDQAHO5TuZt6U7mbdlO5mdXgLAAEE9QEAAAQUAAAAhYuxCsJAEAX7fMV2uUDIDwR7rS2sz8uaBB+7srsJAfHf5cDebhhm+HiphQ9LlglsdKLHJiVWFUq8s0RPRSX4qJCBey7Pjt4NVe0KHqBzaq9sOxvY/SK+zkvQmQGlmxqmthtr/7uTbEBP/5fP2HwBUEsHCG5M74NvAAAAngAAAFBLAQIUAxQAAAAAADiNNVkAAAAAAAAAAAAAAAAJACAAAAAAAAAAAADtQQAAAABhcnRpZmFjdC9VVA0AB92U7mbulO5m3ZTuZnV4CwABBPUBAAAEFAAAAFBLAQIUAxQACAAIAOOMNVluTO+DbwAAAJ4AAAARACAAAAAAAAAAAACkgUcAAABhcnRpZmFjdC9pbmRleC5qc1VUDQAHO5TuZt6U7mbdlO5mdXgLAAEE9QEAAAQUAAAAUEsFBgAAAAACAAIAtgAAABUBAAAAAA==
      EnvironmentVariables:
        NODE_ENV:
          Fn::FindInMap:
            - stages
            - default
            - node_env
        TEST_VAR:
          Ref: testv
        TEST_VAR_EXTRA:
          Fn::Sub: abcds-\${testv}-andyou
      LogConfig:
        Project:
          Fn::GetAtt:
            - sls_logstore
            - ProjectName
        Logstore:
          Fn::GetAtt:
            - sls_logstore
            - LogstoreName
        EnableRequestMetrics: true
      MemorySize: 512
      Timeout: 10
    DependsOn:
      - sls_project
      - sls_logstore
      - sls_index
  gateway_event_agw_role:
    Type: ALIYUN::RAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: "1"
        Statement:
          - Action: sts:AssumeRole
            Effect: Allow
            Principal:
              Service:
                - apigateway.aliyuncs.com
      RoleName: insight-poc-gateway-agw-access-role
      Description: insight-poc role
      Policies:
        - PolicyName: insight-poc-insight-poc-gateway-policy
          PolicyDocument:
            Version: "1"
            Statement:
              - Action:
                  - fc:InvokeFunction
                Resource:
                  - "*"
                Effect: Allow
  gateway_event_agw_group:
    Type: ALIYUN::ApiGateway::Group
    Properties:
      GroupName: insight-poc-agw-group
      PassthroughHeaders: host
      Tags:
        - Value: ServerlessInsight
          Key: iac-provider
        - Value: geek-fun
          Key: owner
  gateway_event_agw_api_get_api_hello:
    Type: ALIYUN::ApiGateway::Api
    Properties:
      ApiName: insight-poc-gateway-agw-api-get-api-hello
      GroupId:
        Fn::GetAtt:
          - gateway_event_agw_group
          - GroupId
      RequestConfig:
        RequestPath: /api/hello
        RequestMode: PASSTHROUGH
        RequestProtocol: HTTP
        RequestHttpMethod: GET
      ServiceConfig:
        FunctionComputeConfig:
          FcVersion: "3.0"
          Method: GET
          FcRegionId: cn-hangzhou
          RoleArn:
            Fn::GetAtt:
              - gateway_event_agw_role
              - Arn
          FunctionName:
            Fn::GetAtt:
              - insight_poc_fn
              - FunctionName
        ServiceProtocol: FunctionCompute
      Visibility: PRIVATE
      AuthType: ANONYMOUS
      ResultSample: ServerlessInsight resultSample
      ResultType: PASSTHROUGH
      Tags:
        - Value: ServerlessInsight
          Key: iac-provider
        - Value: geek-fun
          Key: owner
  gateway_event_agw_api_deployment_get_api_hello:
    Type: ALIYUN::ApiGateway::Deployment
    Properties:
      ApiId:
        Fn::GetAtt:
          - gateway_event_agw_api_get_api_hello
          - ApiId
      GroupId:
        Fn::GetAtt:
          - gateway_event_agw_group
          - GroupId
      StageName: RELEASE
      Description: "insight-poc Api Gateway deployment for api: GET /api/hello"
`;

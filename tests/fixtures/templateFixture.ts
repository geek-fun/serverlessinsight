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
            'UEsDBAoAAAAAAHVIkFsAAAAAAAAAAAAAAAAJABwAYXJ0aWZhY3QvVVQJAANtIEFpbSBBaXV4CwABBOkDAAAE6QMAAFBLAwQUAAAACAB1SJBbKpxHj54BAACPAwAAEQAcAGFydGlmYWN0L2luZGV4LmpzVVQJAANtIEFpbSBBaXV4CwABBOkDAAAE6QMAAJ1Sy07DMBC88xV7wolU0gohDkUcoIAAIUAUifMm2aQGYwfbqahQ/52N86BUCCFOtrwzszPrpffKWO+SBepckYVjKGqdeWk0RLQk7UeQGe3pvbmgUilmLzF87ACMx3AZSJAav4DTuiiYH50ouao1XMxi4Crk0lLmwaTPzRGdPM3hBl/THGOWWKKF0OQMPR7xgywgaoUS6dpL6yJue4auQwcojH1FP201QDrAzkaADsoc6np+d5tUaB21eok3c2+lLqM4PgroXv3GlFA7rvS5E2XKkpOxN1yiVJhy5I2YgdgY7/Cwu7tF7b3D1nsidWEicW9NRi60/Ipm6a0m50Xnbv3lkTWcUdRoRGJOdklWMf1KO1kuPFySUgaejFW52Ir2QL62+lsTV7EadYMMuOZPhvfjwTl/Bzo6PDjXmckpn0KBytGoqzqPvnYzrkxB7E8moi8sCHOybjroAIhZMwTt9x5XFQnGNxMZVwqlFh1o3dNTk68Y8XvKdkBt1H5FI10rNRqChEGsgdjyxh4Nu/jDIuluZf858i0ffyGtdzjDJ1BLAQIeAwoAAAAAAHVIkFsAAAAAAAAAAAAAAAAJABgAAAAAAAAAEAD9QQAAAABhcnRpZmFjdC9VVAUAA20gQWl1eAsAAQTpAwAABOkDAABQSwECHgMUAAAACAB1SJBbKpxHj54BAACPAwAAEQAYAAAAAAABAAAAtIFDAAAAYXJ0aWZhY3QvaW5kZXguanNVVAUAA20gQWl1eAsAAQTpAwAABOkDAABQSwUGAAAAAAIAAgCmAAAALAIAAAAA',
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
        ZipFile: UEsDBAoAAAAAAHVIkFsAAAAAAAAAAAAAAAAJABwAYXJ0aWZhY3QvVVQJAANtIEFpbSBBaXV4CwABBOkDAAAE6QMAAFBLAwQUAAAACAB1SJBbKpxHj54BAACPAwAAEQAcAGFydGlmYWN0L2luZGV4LmpzVVQJAANtIEFpbSBBaXV4CwABBOkDAAAE6QMAAJ1Sy07DMBC88xV7wolU0gohDkUcoIAAIUAUifMm2aQGYwfbqahQ/52N86BUCCFOtrwzszPrpffKWO+SBepckYVjKGqdeWk0RLQk7UeQGe3pvbmgUilmLzF87ACMx3AZSJAav4DTuiiYH50ouao1XMxi4Crk0lLmwaTPzRGdPM3hBl/THGOWWKKF0OQMPR7xgywgaoUS6dpL6yJue4auQwcojH1FP201QDrAzkaADsoc6np+d5tUaB21eok3c2+lLqM4PgroXv3GlFA7rvS5E2XKkpOxN1yiVJhy5I2YgdgY7/Cwu7tF7b3D1nsidWEicW9NRi60/Ipm6a0m50Xnbv3lkTWcUdRoRGJOdklWMf1KO1kuPFySUgaejFW52Ir2QL62+lsTV7EadYMMuOZPhvfjwTl/Bzo6PDjXmckpn0KBytGoqzqPvnYzrkxB7E8moi8sCHOybjroAIhZMwTt9x5XFQnGNxMZVwqlFh1o3dNTk68Y8XvKdkBt1H5FI10rNRqChEGsgdjyxh4Nu/jDIuluZf858i0ffyGtdzjDJ1BLAQIeAwoAAAAAAHVIkFsAAAAAAAAAAAAAAAAJABgAAAAAAAAAEAD9QQAAAABhcnRpZmFjdC9VVAUAA20gQWl1eAsAAQTpAwAABOkDAABQSwECHgMUAAAACAB1SJBbKpxHj54BAACPAwAAEQAYAAAAAAABAAAAtIFDAAAAYXJ0aWZhY3QvaW5kZXguanNVVAUAA20gQWl1eAsAAQTpAwAABOkDAABQSwUGAAAAAAIAAgCmAAAALAIAAAAA
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

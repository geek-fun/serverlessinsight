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
    FCFunctionForsi_auto_artifacts_code_deployment: {
      Properties: {
        CAPort: 9000,
        Code: {
          OssBucketName: { 'Fn::Sub': expect.stringContaining('assets-${ALIYUN::Region}') },
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
          'Fn::GetAtt': ['FCServiceForsi_auto_artifacts_code_deployment', 'ServiceName'],
        },
        Timeout: 3000,
      },
      Type: 'ALIYUN::FC::Function',
    },
    FCRoleForsi_auto_artifacts_code_deployment: {
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
    FCServiceForsi_auto_artifacts_code_deployment: {
      Properties: {
        DeletionForce: false,
        Description: 'FC service for oss deployment by CDK',
        Role: {
          'Fn::GetAtt': ['FCRoleForsi_auto_artifacts_code_deployment', 'Arn'],
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
    gateway_event_agw_api_deployment_get_api_hello: {
      Properties: {
        ApiId: {
          'Fn::GetAtt': ['gateway_event_agw_api_get_api_hello', 'ApiId'],
        },
        Description: 'my-demo-service Api Gateway deployment for api: GET /api/hello',
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
            FcVersion: '3.0',
            FcRegionId: 'cn-hangzhou',
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
    hello_fn: {
      DependsOn: ['sls_project', 'sls_logstore', 'sls_index', 'si_auto_artifacts_code_deployment'],
      Properties: {
        Code: {
          OssBucketName: 'si-bootstrap-artifacts-123456789012-cn-hangzhou',
          OssObjectName: 'hello-fn/43cb4c356149762dbe507fc1baede172-large-artifact.zip',
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
    si_auto_artifacts_code_deployment: {
      Properties: {
        Parameters: {
          destinationBucket: 'si-bootstrap-artifacts-123456789012-cn-hangzhou',
          retainOnCreate: false,
          sources: [
            {
              bucket: { 'Fn::Sub': expect.any(String) },
              fileName: 'hello-fn/43cb4c356149762dbe507fc1baede172-large-artifact.zip',
              objectKey: '2bfeafed8d3df0d44c235271cdf2aa7d908a3c2757af14a67d33d102847f46fd.zip',
            },
          ],
        },
        ServiceToken: {
          'Fn::GetAtt': ['FCFunctionForsi_auto_artifacts_code_deployment', 'ARN'],
        },
        Timeout: 3000,
      },
      Type: 'ALIYUN::ROS::CustomResource',
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
        GroupName: 'my-demo-service-agw-group',
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
            PolicyName: 'my-demo-service-gateway-event-policy',
          },
        ],
        RoleName: 'gateway-event-agw-access-role',
      },
      Type: 'ALIYUN::RAM::Role',
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

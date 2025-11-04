import { ServerlessIac } from '../../../src/types';

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
        BlockPublicAccess: false,
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
    my_bucket_custom_domain: {
      Properties: {
        BucketName: {
          'Fn::GetAtt': ['my_bucket', 'Name'],
        },
        DomainName: 'my-bucket.com',
      },
      Type: 'ALIYUN::OSS::Domain',
    },
    my_bucket_custom_domain_record: {
      Properties: {
        DomainName: 'my-bucket.com',
        RR: '@',
        TTL: 600,
        Type: 'CNAME',
        Value: {
          'Fn::GetAtt': ['my_bucket', 'InternalDomainName'],
        },
      },
      Type: 'ALIYUN::DNS::DomainRecord',
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

import { ServerlessIac } from '../../../src/types';

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
        BlockPublicAccess: false,
        DeletionForce: false,
        EnableOssHdfsService: false,
        RedundancyType: 'LRS',
      },
      Type: 'ALIYUN::OSS::Bucket',
    },
  },
};

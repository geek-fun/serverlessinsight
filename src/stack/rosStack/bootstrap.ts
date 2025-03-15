import { getContext, getIamInfo, rosStackDeploy } from '../../common';
import { Context } from '../../types';

const getBootstrapTemplate = async (context: Context) => {
  const iamInfo = await getIamInfo(context);
  const stackName = `serverlessInsight-bootstrap-${iamInfo?.accountId}-${context.region}`;

  const template = {
    Description: 'ServerlessInsight Bootstrap Stack',
    Metadata: {
      'ALIYUN::ROS::Interface': {
        TemplateTags: ['Bootstrap stack created by ServerlessInsight'],
      },
    },
    ROSTemplateFormatVersion: '2015-09-01',
    Resources: {
      ServerlessInsight_artifacts_bucket: {
        Type: 'ALIYUN::OSS::Bucket',
        Properties: {
          BucketName: {
            'Fn::Sub': 'si-bootstrap-artifacts-${ALIYUN::AccountId}-${ALIYUN::Region}',
          },
          AccessControl: 'private',
          DeletionForce: false,
          EnableOssHdfsService: false,
          RedundancyType: 'LRS',
          ServerSideEncryptionConfiguration: {
            SSEAlgorithm: 'KMS',
          },
        },
      },
    },
  };
  return { stackName, template };
};

export const prepareBootstrapStack = async () => {
  const context = getContext();
  const { stackName, template } = await getBootstrapTemplate(context);
  await rosStackDeploy(stackName, template);
};

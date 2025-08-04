import { getContext, rosStackDeploy, SI_BOOTSTRAP_FC_PREFIX } from '../../common';
import { Context } from '../../types';

const getBootstrapTemplate = async (context: Context) => {
  const stackName = `si-bootstrap-${context.accountId}-${context.region}`;

  const template = {
    Description: 'ServerlessInsight Bootstrap Stack',
    Metadata: {
      'ALIYUN::ROS::Interface': {
        TemplateTags: ['Bootstrap stack created by ServerlessInsight'],
      },
    },
    ROSTemplateFormatVersion: '2015-09-01',
    Resources: {
      si_auto_artifacts_bucket: {
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
      si_auto_bootstrap_api_lambda: {
        Type: 'ALIYUN::FC3::Function',
        Properties: {
          FunctionName: {
            'Fn::Sub': `${SI_BOOTSTRAP_FC_PREFIX}-$\{ALIYUN::AccountId}-$\{ALIYUN::Region}`,
          },
          Description: 'ServerlessInsight Bootstrap API',
          Handler: 'index.handler',
          Runtime: 'nodejs20',
          Layers: ['acs:fc:cn-hangzhou:1990893136649406:layers/si-bootstrap-sdk/versions/7'],
          Code: {
            SourceCode: `
const { bootstrapHandler } = require('@geek-fun/si-bootstrap-sdk');

module.exports.handler = async (event, context) => {
  console.log('Event:', event);
  console.log('Context:', context);

  try {
    const result = bootstrapHandler({event, context});
    return {
      statusCode: 200,
      body: JSON.stringify({ message: result }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
            `,
          },
          MemorySize: 512,
          Timeout: 900, // 15 minutes
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

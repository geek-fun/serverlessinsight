import {
  getContext,
  rosStackDeploy,
  SI_BOOTSTRAP_BUCKET_PREFIX,
  SI_BOOTSTRAP_FC_PREFIX,
} from '../../common';
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
          BucketName: `${SI_BOOTSTRAP_BUCKET_PREFIX}-${context.accountId}-${context.region}`,
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
          FunctionName: `${SI_BOOTSTRAP_FC_PREFIX}-${context.accountId}-${context.region}`,
          Description: 'ServerlessInsight Bootstrap API',
          Handler: 'index.handler',
          Runtime: 'nodejs20',
          Layers: ['acs:fc:cn-hangzhou:1990893136649406:layers/si-bootstrap-sdk/versions/18'],
          Code: {
            SourceCode: `
const { bootstrapHandler } = require('@geek-fun/si-bootstrap-sdk');

module.exports.handler = async (rawEvent, context) => {
  // 处理 Buffer 类型的事件
  const event = parseEvent(rawEvent);

  const commonResponse = {
    RequestId: event.requestId,
    LogicalResourceId: event.logicalResourceId,
    StackId: event.stackId
  };

  try {
    // 处理业务逻辑
    const result = await bootstrapHandler(event);

    // 构建符合 ROS 要求的响应结构
    const rosResponse = {
      ...commonResponse,
      Status: result.status,
      Reason: result.reason,
      PhysicalResourceId: result.physicalResourceId,
      Data: result.data || {}       // 业务数据
    };

    // 如果是删除操作，不需要返回数据
    if (event.requestType === 'Delete') {
      delete rosResponse.Data;
    }

    // 发送响应到 ROS 服务（如果提供了 ResponseURL）
    if (event.responseURL) {
      await sendResponse(event.responseURL, rosResponse);
    }

    // 返回成功响应
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Request processed successfully',
        rosResponse
      })
    };
  } catch (error) {
    console.error('Error:', error);

    // 构建错误响应
    const errorResponse = {
      ...commonResponse,
      Status: 'FAILED',
      Reason: error.message || 'Internal Server Error',
      PhysicalResourceId: 'error-' + Date.now()
    };

    // 发送错误响应到 ROS 服务
    if (event.responseURL) {
      try {
        await sendResponse(event.responseURL, errorResponse);
      } catch (err) {
        console.error('Failed to send error response:', err);
      }
    }

    // 返回错误响应
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: error.message,
        rosErrorResponse: errorResponse
      })
    };
  }
};

// 使用原生 fetch API 发送响应
async function sendResponse(responseUrl, responseBody) {

  try {
    const body = JSON.stringify(responseBody);

    const response = await fetch(responseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body).toString(),
        'Date': new Date().toUTCString()
      },
      body: body
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(\`Failed to send response. Status: \${response.status}, Body: \${errorText}\`);
    }

    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error sending response:', error);
    throw error;
  }
}


const parseEvent = (rawEvent) => {
// 处理 Buffer 类型的事件
  let event;
  if (Buffer.isBuffer(rawEvent)) {
    event = JSON.parse(rawEvent.toString('utf8'));
  } else if (typeof rawEvent === 'string') {
    event = JSON.parse(rawEvent);
  } else {
    event = rawEvent;
  }

  const { credentials, ...resourceProperties } = event.ResourceProperties
  return {
    stackId: event.StackId,
    responseURL: event.ResponseURL,
    resourceOwnerId: event.ResourceOwnerId,
    callerId: event.CallerId,
    resourceProperties,
    eventType: event.ResourceType,
    requestType: event.RequestType?.toUpperCase(),
    resourceType: resourceProperties.resource,
    regionId: event.RegionId,
    stackName: event.StackName,
    requestId: event.RequestId,
    intranetResponseURL: event.IntranetResponseURL,
    logicalResourceId: event.LogicalResourceId,
    physicalResourceId: event.PhysicalResourceId,
    credentials
  };
};`,
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

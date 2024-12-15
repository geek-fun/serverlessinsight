import { AosClient } from '@huaweicloud/huaweicloud-sdk-aos';
import { BasicCredentials } from '@huaweicloud/huaweicloud-sdk-core';
import { logger } from './logger';
import { GetStackMetadataRequest } from '@huaweicloud/huaweicloud-sdk-aos/v1/model/GetStackMetadataRequest';
import { CreateStackRequest } from '@huaweicloud/huaweicloud-sdk-aos/v1/model/CreateStackRequest';
import { CreateStackRequestBody } from '@huaweicloud/huaweicloud-sdk-aos/v1/model/CreateStackRequestBody';
import { DeployStackRequest } from '@huaweicloud/huaweicloud-sdk-aos/v1/model/DeployStackRequest';
import { DeployStackRequestBody } from '@huaweicloud/huaweicloud-sdk-aos/v1/model/DeployStackRequestBody';

const basicCredentials = new BasicCredentials()
  .withAk(process.env.HUAWEICLOUD_SDK_AK)
  .withSk(process.env.HUAWEICLOUD_SDK_SK)
  .withProjectId(process.env.ProjectId);

const client = AosClient.newBuilder()
  .withCredential(basicCredentials)
  .withEndpoint(process.env.HUAWEICLOUD_SDK_ENDPOINT ?? '')
  .build();

const getStackByName = async (stackName: string) => {
  const { httpStatusCode, status, stackId } = await client.getStackMetadata(
    new GetStackMetadataRequest().withStackName(stackName),
  );
  return httpStatusCode === 200 ? { status, stackId, stackName } : null;
};

const createStack = async (stackName: string, templateBody: string) => {
  return await client.createStack(
    new CreateStackRequest().withBody(
      new CreateStackRequestBody().withStackName(stackName).withTemplateBody(templateBody),
    ),
  );
};

const updateStack = async (stackId: string, templateBody: string) => {
  return await client.deployStack(
    new DeployStackRequest().withBody(
      new DeployStackRequestBody().withStackId(stackId).withTemplateBody(templateBody),
    ),
  );
};

export const rfsStackDeploy = async (stackName: string, templateBody: string) => {
  const existingStack = await getStackByName(stackName);
  if (existingStack) {
    await updateStack(stackName, templateBody);
  } else {
    await createStack(stackName, templateBody);

    logger.info(`Stack deployed! 🎉`);
  }
};

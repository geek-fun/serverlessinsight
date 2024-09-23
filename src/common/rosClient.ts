import Util from '@alicloud/tea-util';
import ROS20190910, {
  CreateStackRequest,
  CreateStackRequestParameters,
  CreateStackRequestTags,
  GetStackRequest,
  ListStacksRequest,
  UpdateStackRequest,
  UpdateStackRequestParameters,
} from '@alicloud/ros20190910';
import { Config } from '@alicloud/openapi-client';
import { ActionContext } from '../types';
import { logger } from './logger';
import { lang } from '../lang';

const client = new ROS20190910(
  new Config({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    regionId: process.env.ALIYUN_REGION,
    disableRollback: false,
  }),
);

const createStack = async (stackName: string, templateBody: unknown, context: ActionContext) => {
  const parameters = context.parameters?.map(
    (parameter) =>
      new CreateStackRequestParameters({
        parameterKey: Util.assertAsString(parameter.key),
        parameterValue: Util.assertAsString(parameter.value),
      }),
  );

  const createStackRequest = new CreateStackRequest({
    regionId: context.region,
    sync: true,
    stackName,
    templateBody: JSON.stringify(templateBody),
    parameters,
    tags: context.tags?.map((tag) => new CreateStackRequestTags(tag)),
  });

  const response = await client.createStack(createStackRequest);
  logger.info(`创建中，资源栈ID:${response.body?.stackId}`);
  // wait for stack create complete
  return await getStackActionResult(response.body?.stackId || '', context.region);
};

const updateStack = async (stackId: string, templateBody: unknown, context: ActionContext) => {
  const parameters = context.parameters?.map(
    (parameter) =>
      new UpdateStackRequestParameters({
        parameterKey: Util.assertAsString(parameter.key),
        parameterValue: Util.assertAsString(parameter.key),
      }),
  );

  const updateStackRequest = new UpdateStackRequest({
    regionId: context.region,
    stackId,
    templateBody: JSON.stringify(templateBody),
    parameters,
    tags: context.tags?.map((tag) => new CreateStackRequestTags(tag)),
  });
  try {
    const response = await client.updateStack(updateStackRequest);
    logger.info(`更新中，资源栈ID:${response.body?.stackId}`);
    // wait for stack update complete
    return await getStackActionResult(response.body?.stackId || '', context.region);
  } catch (err) {
    const { Message: message, statusCode } =
      (err as { data: { Message: string; statusCode: number } })?.data || {};
    if (statusCode === 400 && message.includes('Update the completely same stack')) {
      logger.warn(`${lang.__('UPDATE_COMPLETELY_SAME_STACK')}`);
      return null;
    } else {
      throw err;
    }
  }
};

const getStackByName = async (stackName: string, region: string) => {
  const result = await client.listStacks(
    new ListStacksRequest({
      regionId: region,
      pageSize: 10,
      pageNumber: 1,
      stackName: [stackName],
    }),
  );

  if (result.statusCode === 200) {
    return result.body?.stacks?.[0];
  } else {
    return null;
  }
};

const getStackActionResult = async (stackId: string, region: string) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const result = await client.getStack(
          new GetStackRequest({
            regionId: region,
            stackId,
          }),
        );
        logger.info(`stack status: ${result.body?.stackStatus}`);
        if (result.body?.stackStatus?.indexOf('IN_PROGRESS') < 0) {
          clearInterval(interval);
          resolve(result.body);
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, 5000); // 5 seconds interval
  });
};

export const rosStackDeploy = async (
  stackName: string,
  templateBody: unknown,
  context: ActionContext,
) => {
  const stackInfo = await getStackByName(stackName, context.region);
  if (stackInfo) {
    const { Status: stackStatus } = stackInfo;
    if (stackStatus?.indexOf('IN_PROGRESS') >= 0) {
      logger.error(`fail to update stack, because stack status is ${stackStatus}`);
      throw new Error(`fail to update stack, because stack status is ${stackStatus}`);
    }

    logger.info(`Update stack: ${stackName} deploying... `);
    const stack = await updateStack(stackInfo.stackId as string, templateBody, context);

    logger.info(`updateStack: ${JSON.stringify(stack)}`);
  } else {
    // create stack
    logger.info(`Create stack: ${stackName} deploying... `);
    const stack = await createStack(stackName, templateBody, context);

    logger.info(`createStack: ${JSON.stringify(stack)}`);
  }
};

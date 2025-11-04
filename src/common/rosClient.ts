import Client, {
  CreateStackRequest,
  CreateStackRequestParameters,
  CreateStackRequestTags,
  DeleteStackRequest,
  GetStackRequest,
  ListStacksRequest,
  UpdateStackRequest,
  UpdateStackRequestParameters,
} from '@alicloud/ros20190910';
import { Config } from '@alicloud/openapi-client';
import Util from '@alicloud/tea-util';
import { Context } from '../types';
import { logger } from './logger';
import { lang } from '../lang';
import { getContext } from './context';

const client = new Client(
  new Config({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    regionId: process.env.ALIYUN_REGION,
    disableRollback: false,
  }),
);

const createStack = async (stackName: string, templateBody: unknown, context: Context) => {
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

const updateStack = async (stackId: string, templateBody: unknown, context: Context) => {
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
    logger.info(`更新中，资源栈ID: ${response.body?.stackId}`);
    // wait for stack update complete
    return await getStackActionResult(response.body?.stackId || '', context.region);
  } catch (err) {
    const { message, statusCode } =
      (err as {
        message: string;
        code: string;
        statusCode: number;
        description: string;
        requestId: string;
        accessDeniedDetail: unknown;
      }) || {};
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

const getStackActionResult = async (
  stackId: string,
  region: string,
): Promise<{ stackName: string; stackId: string } | undefined> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(async () => {
      try {
        const result = await client.getStack(new GetStackRequest({ regionId: region, stackId }));
        const status = result.body?.status ?? '';

        logger.info(`stack status: ${status}`);

        if (
          [
            'CREATE_COMPLETE',
            'UPDATE_COMPLETE',
            'DELETE_COMPLETE',
            'CHECK_COMPLETE',
            'IMPORT_CREATE_COMPLETE',
            'IMPORT_UPDATE_COMPLETE',
          ].includes(status)
        ) {
          clearInterval(interval);
          resolve(result.body as { stackName: string; stackId: string });
        } else if (
          [
            'CREATE_ROLLBACK_FAILED',
            'CREATE_ROLLBACK_COMPLETE',
            'ROLLBACK_FAILED',
            'ROLLBACK_COMPLETE',
            'IMPORT_CREATE_ROLLBACK_FAILED',
            'IMPORT_CREATE_ROLLBACK_COMPLETE',
            'IMPORT_UPDATE_ROLLBACK_FAILED',
            'IMPORT_UPDATE_ROLLBACK_COMPLETE',
          ].includes(status)
        ) {
          clearInterval(interval);
          reject(new Error(`Stack operation failed with status: ${status}`));
        } else if (Date.now() - startTime > 3600000) {
          // 1 hour in milliseconds
          clearInterval(interval);
          reject(new Error('Stack operation did not finish within 1 hour'));
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, 5000); // 5 seconds interval
  });
};

export const rosStackDeploy = async (stackName: string, templateBody: unknown) => {
  const context = getContext();
  const stackInfo = await getStackByName(stackName, context.region);
  if (stackInfo) {
    const { Status: stackStatus } = stackInfo;
    if (stackStatus?.indexOf('IN_PROGRESS') >= 0) {
      throw new Error(`fail to update stack, because stack status is ${stackStatus}`);
    }

    logger.info(`Update stack: ${stackName} deploying... `);
    const stack = await updateStack(stackInfo.stackId as string, templateBody, context);

    logger.info(`stackUpdate success! stackName:${stack?.stackName}, stackId:${stack?.stackId}`);
  } else {
    // create stack
    logger.info(`Create stack: ${stackName} deploying... `);
    const stack = await createStack(stackName, templateBody, context);

    logger.info(`createStack success! stackName:${stack?.stackName}, stackId:${stack?.stackId}`);
  }
};

export const rosStackDelete = async ({
  stackName,
  region,
}: Pick<Context, 'stackName' | 'region' | 'provider'>) => {
  const stackInfo = await getStackByName(stackName, region);

  if (!stackInfo) {
    logger.warn(`Stack: ${stackName} not exists, skipped! 🚫`);
    return;
  }
  try {
    const deleteStackRequest = new DeleteStackRequest({
      regionId: region,
      stackId: stackInfo.stackId,
    });
    await client.deleteStack(deleteStackRequest);
    await getStackActionResult(stackInfo.stackId as string, region);
    logger.info(`Stack: ${stackName} deleted!🗑 `);
  } catch (err) {
    logger.error(`Stack: ${stackName} delete failed! ❌, error: ${JSON.stringify(err)}`);
    throw new Error(JSON.stringify(err));
  }
};

import Util from '@alicloud/tea-util';
import ROS20190910, {
  CreateStackRequest,
  CreateStackRequestParameters,
  CreateStackRequestTags,
  ListStacksRequest,
  UpdateStackRequest,
} from '@alicloud/ros20190910';
import { Config } from '@alicloud/openapi-client';
import { ActionContext } from '../types';
import { printer } from './printer';

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
    stackName,
    templateBody: JSON.stringify(templateBody),
    parameters,
    tags: context.tags?.map((tag) => new CreateStackRequestTags(tag)),
  });

  console.log('createStackRequest:', createStackRequest);

  const response = await client.createStack(createStackRequest);
  console.log(`创建中，资源栈ID:${response.body?.stackId}`);
  return response.body?.stackId;
};

const updateStack = async (stackId: string, templateBody: unknown, context: ActionContext) => {
  const parameters = context.parameters?.map(
    (parameter) =>
      new CreateStackRequestParameters({
        parameterKey: Util.assertAsString(parameter.key),
        parameterValue: Util.assertAsString(parameter.value),
      }),
  );

  const createStackRequest = new UpdateStackRequest({
    regionId: context.region,
    stackId,
    templateBody: JSON.stringify(templateBody),
    parameters,
    tags: context.tags?.map((tag) => new CreateStackRequestTags(tag)),
  });

  const response = await client.updateStack(createStackRequest);
  console.log(`更新中，资源栈ID:${response.body?.stackId}`);
  return response.body?.stackId;
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

export const rosStackDeploy = async (
  stackName: string,
  templateBody: unknown,
  context: ActionContext,
) => {
  const stackInfo = await getStackByName(stackName, context.region);
  if (stackInfo) {
    const { Status: stackStatus } = stackInfo;
    if (stackStatus?.indexOf('IN_PROGRESS') >= 0) {
      printer.error(`fail to update stack, because stack status is ${stackStatus}`);
      throw new Error(`fail to update stack, because stack status is ${stackStatus}`);
    }

    printer.info(`Update stack: ${stackName} deploying... `);
    return await updateStack(stackInfo.stackId as string, templateBody, context);
  } else {
    // create stack
    printer.info(`Create stack: ${stackName} deploying... `);
    return await createStack(stackName, templateBody, context);
  }
};

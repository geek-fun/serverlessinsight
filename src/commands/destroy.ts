import { constructActionContext, logger, rosStackDelete } from '../common';

export const destroyStack = async (stackName: string) => {
  const context = constructActionContext({ stackName });
  logger.info(`Destroying stack ${stackName}...`);
  await rosStackDelete(context);
};

import { constructActionContext, logger, rosStackDelete } from '../common';

export const destroyStack = async (stackName: string, options: { location: string }) => {
  const context = constructActionContext({ stackName, ...options });
  logger.info(`Destroying stack ${stackName}...`);
  await rosStackDelete(context);
};

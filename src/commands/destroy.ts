import { constructActionContext, rosStackDelete } from '../common';

export const destroyStack = async (stackName: string) => {
  const context = constructActionContext({ stackName });
  await rosStackDelete(context);
};

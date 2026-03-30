import { ServerlessIac } from '../../types';
import { getContext, logger } from '../../common';
import { StateBackend } from '../../common/stateBackend';
import { lang } from '../../lang';

export const deployVolcengineStack = async (iac: ServerlessIac, backend: StateBackend) => {
  const context = getContext();
  logger.info(lang.__('DEPLOYING_STACK'));

  const state = await backend.loadState('volcengine', iac.app, iac.service, context.stage);

  logger.info(lang.__('PLAN_NO_CHANGES'));

  await backend.saveState(state, iac.app, iac.service, context.stage);

  logger.info(lang.__('STACK_DEPLOYED'));
};

import { getContext, logger, ProviderEnum } from '../../common';
import { StateBackend } from '../../common/stateBackend';
import { lang } from '../../lang';

export const destroyVolcengineStack = async (backend: StateBackend) => {
  const context = getContext();
  const providerName = ProviderEnum.VOLCENGINE;

  logger.info(
    lang.__('DESTROYING_STACK', {
      provider: context.provider,
      region: context.region,
    }),
  );

  const state = await backend.loadState(providerName, context.app, context.service, context.stage);

  logger.info(lang.__('PLAN_NO_CHANGES'));

  await backend.saveState(state, context.app, context.service, context.stage);
};

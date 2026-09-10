import { ServerlessIac, Plan } from '../types';
import { ProviderEnum } from '../common';
import { StateBackend } from '../common/stateBackend';
import { deployTencentStack } from './scfStack';
import { deployAliyunStack } from './aliyunStack';
import { deployVolcengineStack } from './volcengineStack';

const deployHuawei = async (): Promise<void> => {
  throw new Error(
    'Huawei deployment is not yet implemented. ' +
      'The provider currently generates HCL templates but does not deploy them. ' +
      'Please use Aliyun or Tencent providers, or contribute Huawei deployment support.',
  );
};

/**
 * `plan` (issue #246): the exact plan shown to the user for approval is the
 * plan executed — deployers partition its items by resourceType instead of
 * re-probing the cloud and re-deciding. Omit it to fall back to per-provider
 * plan generation (legacy path kept for direct deployer callers).
 */
export const deployStack = async (iac: ServerlessIac, backend: StateBackend, plan?: Plan) => {
  if (iac.provider.name === ProviderEnum.TENCENT) {
    await deployTencentStack(iac, backend, plan);
  } else if (iac.provider.name === ProviderEnum.ALIYUN) {
    await deployAliyunStack(iac, backend, plan);
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    await deployHuawei();
  } else if (iac.provider.name === ProviderEnum.VOLCENGINE) {
    await deployVolcengineStack(iac, backend, plan);
  }
};

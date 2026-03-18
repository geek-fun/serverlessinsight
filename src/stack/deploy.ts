import { ServerlessIac } from '../types';
import { ProviderEnum } from '../common';
import { StateBackend } from '../common/stateBackend';
import { deployTencentStack } from './scfStack';
import { deployAliyunStack } from './aliyunStack';

const deployHuawei = async (): Promise<void> => {
  throw new Error(
    'Huawei deployment is not yet implemented. ' +
      'The provider currently generates HCL templates but does not deploy them. ' +
      'Please use Aliyun or Tencent providers, or contribute Huawei deployment support.',
  );
};

export const deployStack = async (iac: ServerlessIac, backend: StateBackend) => {
  if (iac.provider.name === ProviderEnum.TENCENT) {
    await deployTencentStack(iac, backend);
  } else if (iac.provider.name === ProviderEnum.ALIYUN) {
    await deployAliyunStack(iac, backend);
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    await deployHuawei();
  }
};

import { ServerlessIac } from '../types';
import { logger, ProviderEnum } from '../common';
import { StateBackend } from '../common/stateBackend';
import { RfsStack } from './rfsStack';
import { deployTencentStack } from './scfStack';
import { deployAliyunStack } from './aliyunStack';
import { lang } from '../lang';

export const generateRfsStackTemplate = (iac: ServerlessIac) => {
  const stack = new RfsStack(iac);

  const hcl = stack.toHclTerraform();
  console.log('HCL:', hcl);

  return { template: hcl };
};

const deployHuawei = async (iac: ServerlessIac): Promise<void> => {
  // For now, Huawei uses the same approach as Aliyun but with different stack
  const { template } = generateRfsStackTemplate(iac);
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));
  // TODO: Implement Huawei-specific deployment logic
  console.log('HCL:', template);
  logger.info(lang.__('STACK_DEPLOYED'));
};

export const deployStack = async (iac: ServerlessIac, backend: StateBackend) => {
  if (iac.provider.name === ProviderEnum.TENCENT) {
    await deployTencentStack(iac, backend);
  } else if (iac.provider.name === ProviderEnum.ALIYUN) {
    await deployAliyunStack(iac, backend);
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    await deployHuawei(iac);
  }
};

export const generateStackTemplate = (iac: ServerlessIac): { template: unknown } => {
  if (iac.provider.name === ProviderEnum.ALIYUN) {
    // Aliyun now uses state-based deployment, no template generation needed
    return { template: {} };
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    return generateRfsStackTemplate(iac);
  } else if (iac.provider.name === ProviderEnum.TENCENT) {
    // Tencent uses state-based deployment, no template generation needed
    return { template: {} };
  }
  return { template: '' };
};

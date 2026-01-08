import { ServerlessIac } from '../types';
import { logger, ProviderEnum } from '../common';
import { RfsStack } from './rfsStack';
import { deployTencentStack } from './scfStack';
import { deployAliyunStack } from './aliyunStack';
import { lang } from '../lang';

export const generateRfsStackTemplate = (stackName: string, iac: ServerlessIac) => {
  const stack = new RfsStack(iac);

  const hcl = stack.toHclTerraform();
  console.log('HCL:', hcl);

  return { template: hcl };
};

const deployHuawei = async (stackName: string, iac: ServerlessIac): Promise<void> => {
  // For now, Huawei uses the same approach as Aliyun but with different stack
  const { template } = generateRfsStackTemplate(stackName, iac);
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));
  // TODO: Implement Huawei-specific deployment logic
  console.log('HCL:', template);
  logger.info(lang.__('STACK_DEPLOYED'));
};

export const deployStack = async (stackName: string, iac: ServerlessIac) => {
  if (iac.provider.name === ProviderEnum.TENCENT) {
    await deployTencentStack(iac);
  } else if (iac.provider.name === ProviderEnum.ALIYUN) {
    await deployAliyunStack(iac);
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    await deployHuawei(stackName, iac);
  }
};

export const generateStackTemplate = (
  stackName: string,
  iac: ServerlessIac,
): { template: unknown } => {
  if (iac.provider.name === ProviderEnum.ALIYUN) {
    // Aliyun now uses state-based deployment, no template generation needed
    return { template: {} };
  } else if (iac.provider.name === ProviderEnum.HUAWEI) {
    return generateRfsStackTemplate(stackName, iac);
  } else if (iac.provider.name === ProviderEnum.TENCENT) {
    // Tencent uses state-based deployment, no template generation needed
    return { template: {} };
  }
  return { template: '' };
};

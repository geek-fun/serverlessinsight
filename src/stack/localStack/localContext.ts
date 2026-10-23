import { ProviderEnum } from '../../common/providerEnum';
import { FunctionDomain, ServerlessIac } from '../../types';
import { createAliyunContextSerializable } from './aliyunFc';
import { createLegacyContext } from './legacyLambda';
import { createScfContextSerializable } from './tencent';
import { createVolcengineContext } from './volcengine';

/**
 * The single entry point for local invocation contexts.
 *
 * HTTP adapters and the local timer simulation both go through it, so a
 * provider is never handed another provider's context shape. Every provider
 * owns its builder; AWS and Huawei share the legacy generic context and make
 * no provider-native claim.
 */
export const buildLocalContext = (
  provider: ProviderEnum,
  iac: ServerlessIac,
  fn: FunctionDomain,
  requestId: string,
): unknown => {
  switch (provider) {
    case ProviderEnum.ALIYUN:
      return createAliyunContextSerializable(
        iac,
        fn.name,
        fn.code?.handler ?? '',
        fn.memory ?? 128,
        fn.timeout ?? 3,
        requestId,
      );
    case ProviderEnum.TENCENT:
      return createScfContextSerializable(iac, fn, requestId);
    case ProviderEnum.VOLCENGINE:
      return createVolcengineContext(requestId);
    default:
      return createLegacyContext(iac, fn, requestId);
  }
};

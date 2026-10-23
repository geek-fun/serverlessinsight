import { ProviderEnum } from '../../common/providerEnum';

/**
 * Providers whose local HTTP routes keep the request path verbatim, including
 * repeated and trailing slashes. Their simulated HTTP triggers match the path
 * exactly rather than collapsing or wildcarding path segments.
 */
const PRESERVES_PATH: ReadonlyArray<ProviderEnum> = [ProviderEnum.TENCENT, ProviderEnum.VOLCENGINE];

export const preservesLocalPath = (provider: ProviderEnum): boolean =>
  PRESERVES_PATH.includes(provider);

import { randomUUID } from 'node:crypto';
import { ProviderEnum } from '../../common';

/**
 * Local request ids are UUIDs. SCF (Tencent) and veFaaS (Volcengine) request ids
 * keep their hyphens, matching the shape the providers document; Aliyun FC
 * strips them.
 */
export const generateRequestId = (preserveHyphens = false): string => {
  const requestId = randomUUID();
  return preserveHyphens ? requestId : requestId.replace(/-/g, '');
};

const keepsHyphens = (provider: ProviderEnum): boolean =>
  provider === ProviderEnum.TENCENT || provider === ProviderEnum.VOLCENGINE;

export const generateProviderRequestId = (provider: ProviderEnum): string =>
  generateRequestId(keepsHyphens(provider));

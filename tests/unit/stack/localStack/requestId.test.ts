import { ProviderEnum } from '../../../../src/common';
import {
  generateProviderRequestId,
  generateRequestId,
} from '../../../../src/stack/localStack/requestId';

describe('local request ids', () => {
  it('generates a UUID without hyphens by default', () => {
    const id = generateRequestId();
    expect(id).toMatch(/^[\da-f]{32}$/);
    expect(id).not.toContain('-');
  });

  it('generates unique ids', () => {
    expect(generateRequestId()).not.toBe(generateRequestId());
  });

  it('keeps the UUID hyphens for SCF and veFaaS', () => {
    expect(generateProviderRequestId(ProviderEnum.TENCENT)).toMatch(
      /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/,
    );
    expect(generateProviderRequestId(ProviderEnum.VOLCENGINE)).toMatch(
      /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/,
    );
  });

  it('strips the hyphens for Aliyun FC', () => {
    expect(generateProviderRequestId(ProviderEnum.ALIYUN)).toMatch(/^[\da-f]{32}$/);
  });
});

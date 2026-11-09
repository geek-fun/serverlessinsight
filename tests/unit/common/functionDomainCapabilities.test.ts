import { resolveFunctionDomainCapability } from '../../../src/common/functionDomainCapabilities';

describe('function domain capability registry (issue #286)', () => {
  it('enables function domains on aliyun and tencent only', () => {
    expect(resolveFunctionDomainCapability('aliyun')?.functionDomains).toBe(true);
    expect(resolveFunctionDomainCapability('tencent')?.functionDomains).toBe(true);
    expect(resolveFunctionDomainCapability('volcengine')?.functionDomains).toBe(false);
  });

  it('supports wildcard domains on aliyun but not tencent (per-provider API check)', () => {
    expect(resolveFunctionDomainCapability('aliyun')?.wildcardDomains).toBe(true);
    expect(resolveFunctionDomainCapability('tencent')?.wildcardDomains).toBe(false);
    expect(resolveFunctionDomainCapability('volcengine')?.wildcardDomains).toBe(false);
  });

  it('returns undefined for unknown providers', () => {
    expect(resolveFunctionDomainCapability('huawei')).toBeUndefined();
  });
});

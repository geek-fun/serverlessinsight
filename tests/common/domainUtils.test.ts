import { normalizeDomain } from '../../src/common/domainUtils';

describe('normalizeDomain', () => {
  it('should strip leading @. from domain', () => {
    expect(normalizeDomain('@.wentsen.com')).toBe('wentsen.com');
  });

  it('should leave plain apex domain unchanged', () => {
    expect(normalizeDomain('wentsen.com')).toBe('wentsen.com');
  });

  it('should leave subdomain unchanged', () => {
    expect(normalizeDomain('www.wentsen.com')).toBe('www.wentsen.com');
  });

  it('should leave non-apex subdomain unchanged', () => {
    expect(normalizeDomain('cdn.example.com')).toBe('cdn.example.com');
  });
});

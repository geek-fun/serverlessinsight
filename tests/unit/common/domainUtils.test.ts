import {
  normalizeDomain,
  extractMainDomain,
  extractHostRecord,
  deriveWwwDomain,
} from '../../../src/common/domainUtils';

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

describe('extractMainDomain', () => {
  it('should return single-level TLD domain as-is', () => {
    expect(extractMainDomain('example.com')).toBe('example.com');
  });

  it('should extract main domain from subdomain with single-level TLD', () => {
    expect(extractMainDomain('www.example.com')).toBe('example.com');
  });

  it('should extract main domain from multi-level subdomain with single-level TLD', () => {
    expect(extractMainDomain('api.cdn.example.com')).toBe('example.com');
  });

  it('should return multi-level TLD domain with exactly 3 parts as-is', () => {
    expect(extractMainDomain('example.co.uk')).toBe('example.co.uk');
  });

  it('should extract main domain from subdomain with multi-level TLD', () => {
    expect(extractMainDomain('www.example.co.uk')).toBe('example.co.uk');
  });

  it('should extract main domain from multi-level subdomain with multi-level TLD', () => {
    expect(extractMainDomain('api.www.example.co.uk')).toBe('example.co.uk');
  });

  it('should handle multi-level TLD for China domains', () => {
    expect(extractMainDomain('www.example.com.cn')).toBe('example.com.cn');
  });

  it('should handle multi-level TLD for Australia domains', () => {
    expect(extractMainDomain('cdn.example.com.au')).toBe('example.com.au');
  });

  it('should return domain unchanged if only 2 parts', () => {
    expect(extractMainDomain('example.com')).toBe('example.com');
  });

  it('should return domain unchanged if only 1 part', () => {
    expect(extractMainDomain('localhost')).toBe('localhost');
  });
});

describe('extractHostRecord', () => {
  it('should return @ for apex domain', () => {
    expect(extractHostRecord('example.com', 'example.com')).toBe('@');
  });

  it('should extract subdomain prefix when domain matches suffix', () => {
    expect(extractHostRecord('www.example.com', 'example.com')).toBe('www');
  });

  it('should extract multi-level subdomain prefix when domain matches suffix', () => {
    expect(extractHostRecord('api.cdn.example.com', 'example.com')).toBe('api.cdn');
  });

  it('should return full domain when it does not end with main domain suffix', () => {
    expect(extractHostRecord('unrelated.com', 'example.com')).toBe('unrelated.com');
  });

  it('should return full domain when main domain is not a proper suffix', () => {
    expect(extractHostRecord('notexample.com', 'example.com')).toBe('notexample.com');
  });

  it('should handle multi-level TLD domains correctly', () => {
    expect(extractHostRecord('www.example.co.uk', 'example.co.uk')).toBe('www');
  });
});

describe('deriveWwwDomain', () => {
  it('should prepend www to apex domain', () => {
    expect(deriveWwwDomain('example.com')).toBe('www.example.com');
  });

  it('should return null when domain already starts with www', () => {
    expect(deriveWwwDomain('www.example.com')).toBeNull();
  });

  it('should prepend www to subdomain', () => {
    expect(deriveWwwDomain('api.example.com')).toBe('www.api.example.com');
  });

  it('should prepend www to multi-level TLD domain', () => {
    expect(deriveWwwDomain('example.co.uk')).toBe('www.example.co.uk');
  });

  it('should return null for domain starting with www prefix regardless of case', () => {
    expect(deriveWwwDomain('www.example.com')).toBeNull();
  });
});

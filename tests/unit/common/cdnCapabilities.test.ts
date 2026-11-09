import {
  mapCdnScope,
  mapOriginProtocol,
  resolveCdnCapability,
} from '../../../src/common/cdnCapabilities';

describe('cdnCapabilities registry (issue #283)', () => {
  describe('resolveCdnCapability', () => {
    it('returns the capability row per known provider', () => {
      expect(resolveCdnCapability('aliyun')?.bucketCdn).toBe(true);
      expect(resolveCdnCapability('tencent')?.bucketCdn).toBe(true);
      expect(resolveCdnCapability('tencent')?.eventCdn).toBe(false);
      // issue #294: volcengine TOS bucket CDN delivery delivered.
      expect(resolveCdnCapability('volcengine')?.bucketCdn).toBe(true);
      expect(resolveCdnCapability('volcengine')?.eventCdn).toBe(false);
    });

    it('returns undefined for unknown providers so callers can fail fast', () => {
      expect(resolveCdnCapability('huawei')).toBeUndefined();
    });
  });

  describe('mapCdnScope', () => {
    it('maps the si vocabulary onto each provider API value', () => {
      expect(mapCdnScope('aliyun', 'chinese_mainland')).toBe('domestic');
      expect(mapCdnScope('tencent', 'chinese_mainland')).toBe('mainland');
      expect(mapCdnScope('tencent', 'overseas')).toBe('overseas');
      expect(mapCdnScope('volcengine', 'chinese_mainland')).toBe('chinese_mainland');
      expect(mapCdnScope('volcengine', 'overseas')).toBe('outside_chinese_mainland');
    });

    it('defaults to global when the scope is omitted', () => {
      expect(mapCdnScope('aliyun')).toBe('global');
      expect(mapCdnScope('tencent', undefined)).toBe('global');
      expect(mapCdnScope('volcengine')).toBe('global');
    });
  });

  describe('mapOriginProtocol', () => {
    it('maps onto each provider API value', () => {
      expect(mapOriginProtocol('tencent', 'follow')).toBe('follow');
      expect(mapOriginProtocol('volcengine', 'follow')).toBe('followclient');
      expect(mapOriginProtocol('aliyun', 'https')).toBe('https');
    });

    it('passes undefined through so executors keep their no-call semantics', () => {
      expect(mapOriginProtocol('tencent', undefined)).toBeUndefined();
    });
  });
  it('falls back to global for an unknown scope value', () => {
    expect(mapCdnScope('aliyun', 'bogus')).toBe('global');
  });
});

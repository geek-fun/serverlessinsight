import {
  OWNERSHIP_TAG_KEY,
  buildOwnershipTagValue,
  buildSharedOwnershipTagValue,
  parseOwnershipTagValue,
  isLegacyOwnershipTag,
  isOwnedByApp,
  isOwnedByStack,
} from '../../../src/stack/ownershipTag';

const context = { app: 'fn-url-probe', service: 'fn-url-probe', region: 'cn-hangzhou' };

describe('ownershipTag', () => {
  it('builds a combined stack:logicalId@region value', () => {
    expect(buildOwnershipTagValue(context, 'functions.probe')).toBe(
      'fn-url-probe-fn-url-probe:functions.probe@cn-hangzhou',
    );
  });

  it('parses a region-suffixed ownership value', () => {
    expect(parseOwnershipTagValue('fn-url-probe-fn-url-probe:functions.probe@cn-hangzhou')).toEqual(
      {
        stack: 'fn-url-probe-fn-url-probe',
        logicalId: 'functions.probe',
        region: 'cn-hangzhou',
      },
    );
  });

  it('parses a legacy ownership value without region', () => {
    expect(parseOwnershipTagValue('fn-url-probe-fn-url-probe:functions.probe')).toEqual({
      stack: 'fn-url-probe-fn-url-probe',
      logicalId: 'functions.probe',
    });
  });

  it('returns null for malformed values', () => {
    expect(parseOwnershipTagValue(undefined)).toBeNull();
    expect(parseOwnershipTagValue('')).toBeNull();
    expect(parseOwnershipTagValue('no-colon-here')).toBeNull();
    expect(parseOwnershipTagValue(':leading-colon')).toBeNull();
  });

  it('flags legacy values without a region and current values with one', () => {
    expect(isLegacyOwnershipTag('fn-url-probe-fn-url-probe:functions.probe')).toBe(true);
    expect(isLegacyOwnershipTag('fn-url-probe-fn-url-probe:functions.probe@cn-hangzhou')).toBe(
      false,
    );
    expect(isLegacyOwnershipTag(undefined)).toBe(false);
    expect(isLegacyOwnershipTag('no-colon-here')).toBe(false);
  });

  it('returns true when a region-suffixed tag matches the owning stack, logical id and region', () => {
    const tags = [
      {
        Key: OWNERSHIP_TAG_KEY,
        Value: 'fn-url-probe-fn-url-probe:functions.probe@cn-hangzhou',
      },
    ];
    expect(isOwnedByStack(context, 'functions.probe', tags)).toBe(true);
  });

  it('returns false when a region-suffixed tag belongs to another region', () => {
    const tags = [
      {
        Key: OWNERSHIP_TAG_KEY,
        Value: 'fn-url-probe-fn-url-probe:functions.probe@cn-beijing',
      },
    ];
    expect(isOwnedByStack(context, 'functions.probe', tags)).toBe(false);
  });

  it('still adopts legacy tags without a region', () => {
    const tags = [{ Key: OWNERSHIP_TAG_KEY, Value: 'fn-url-probe-fn-url-probe:functions.probe' }];
    expect(isOwnedByStack(context, 'functions.probe', tags)).toBe(true);
  });

  it('returns false when tag logical id differs', () => {
    const tags = [
      {
        Key: OWNERSHIP_TAG_KEY,
        Value: 'fn-url-probe-fn-url-probe:functions.other@cn-hangzhou',
      },
    ];
    expect(isOwnedByStack(context, 'functions.probe', tags)).toBe(false);
  });

  it('returns false when tag stack differs', () => {
    const tags = [{ Key: OWNERSHIP_TAG_KEY, Value: 'another-app:functions.probe@cn-hangzhou' }];
    expect(isOwnedByStack(context, 'functions.probe', tags)).toBe(false);
  });

  it('returns false when no tags', () => {
    expect(isOwnedByStack(context, 'functions.probe', undefined)).toBe(false);
    expect(isOwnedByStack(context, 'functions.probe', [])).toBe(false);
  });

  it('returns false for unrelated tags', () => {
    expect(isOwnedByStack(context, 'functions.probe', [{ Key: 'env', Value: 'prod' }])).toBe(false);
  });

  describe('shared app-scoped ownership', () => {
    it('builds a legacy app-scoped shared ownership value without region', () => {
      expect(buildSharedOwnershipTagValue('my-app', 'logs.project')).toBe(
        'my-app:shared:logs.project',
      );
    });

    it('builds a region-suffixed shared ownership value when a region is given', () => {
      expect(buildSharedOwnershipTagValue('my-app', 'logs.project', 'cn-hangzhou')).toBe(
        'my-app:shared:logs.project@cn-hangzhou',
      );
    });

    it('returns true when a legacy shared tag matches app and logical id', () => {
      const tags = [
        { Key: OWNERSHIP_TAG_KEY, Value: buildSharedOwnershipTagValue('my-app', 'logs.project') },
      ];
      expect(isOwnedByApp('my-app', 'logs.project', tags)).toBe(true);
    });

    it('returns true when a region-suffixed shared tag matches app, logical id and region', () => {
      const tags = [
        {
          Key: OWNERSHIP_TAG_KEY,
          Value: buildSharedOwnershipTagValue('my-app', 'logs.project', 'cn-hangzhou'),
        },
      ];
      expect(isOwnedByApp('my-app', 'logs.project', tags, 'cn-hangzhou')).toBe(true);
    });

    it('returns false when a region-suffixed shared tag belongs to another region', () => {
      const tags = [
        {
          Key: OWNERSHIP_TAG_KEY,
          Value: buildSharedOwnershipTagValue('my-app', 'logs.project', 'cn-hangzhou'),
        },
      ];
      expect(isOwnedByApp('my-app', 'logs.project', tags, 'cn-beijing')).toBe(false);
      expect(isOwnedByApp('my-app', 'logs.project', tags)).toBe(false);
    });

    it('returns false when another app owns the shared resource', () => {
      const tags = [
        {
          Key: OWNERSHIP_TAG_KEY,
          Value: buildSharedOwnershipTagValue('other-app', 'logs.project'),
        },
      ];
      expect(isOwnedByApp('my-app', 'logs.project', tags)).toBe(false);
    });

    it('returns false when the logical id differs for the same app', () => {
      const tags = [
        { Key: OWNERSHIP_TAG_KEY, Value: buildSharedOwnershipTagValue('my-app', 'logs.other') },
      ];
      expect(isOwnedByApp('my-app', 'logs.project', tags)).toBe(false);
    });

    it('returns false when tags are missing or the key is unrelated', () => {
      expect(isOwnedByApp('my-app', 'logs.project', undefined)).toBe(false);
      expect(isOwnedByApp('my-app', 'logs.project', [])).toBe(false);
      expect(isOwnedByApp('my-app', 'logs.project', [{ Key: 'env', Value: 'prod' }])).toBe(false);
    });
  });
});

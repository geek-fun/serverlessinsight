import {
  OWNERSHIP_TAG_KEY,
  buildOwnershipTagValue,
  buildSharedOwnershipTagValue,
  parseOwnershipTagValue,
  isOwnedByApp,
  isOwnedByStack,
} from '../../../src/stack/ownershipTag';

const context = { app: 'fn-url-probe', service: 'fn-url-probe' };

describe('ownershipTag', () => {
  it('builds a combined stack:logicalId value', () => {
    expect(buildOwnershipTagValue(context, 'functions.probe')).toBe(
      'fn-url-probe-fn-url-probe:functions.probe',
    );
  });

  it('parses a valid ownership value', () => {
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

  it('returns true when tag matches the owning stack and logical id', () => {
    const tags = [{ Key: OWNERSHIP_TAG_KEY, Value: 'fn-url-probe-fn-url-probe:functions.probe' }];
    expect(isOwnedByStack(context, 'functions.probe', tags)).toBe(true);
  });

  it('returns false when tag logical id differs', () => {
    const tags = [{ Key: OWNERSHIP_TAG_KEY, Value: 'fn-url-probe-fn-url-probe:functions.other' }];
    expect(isOwnedByStack(context, 'functions.probe', tags)).toBe(false);
  });

  it('returns false when tag stack differs', () => {
    const tags = [{ Key: OWNERSHIP_TAG_KEY, Value: 'another-app:functions.probe' }];
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
    it('builds an app-scoped shared ownership value', () => {
      expect(buildSharedOwnershipTagValue('my-app', 'logs.project')).toBe(
        'my-app:shared:logs.project',
      );
    });

    it('returns true when shared tag matches app and logical id', () => {
      const tags = [
        { Key: OWNERSHIP_TAG_KEY, Value: buildSharedOwnershipTagValue('my-app', 'logs.project') },
      ];
      expect(isOwnedByApp('my-app', 'logs.project', tags)).toBe(true);
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

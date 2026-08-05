import {
  OWNERSHIP_TAG_KEY,
  buildOwnershipTagValue,
  parseOwnershipTagValue,
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
});

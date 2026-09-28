import { hasLangKey, lookupErrorCode } from '../../../src/lang';

describe('error code reverse lookup (issue #250)', () => {
  it('matches a template without placeholders exactly', () => {
    expect(lookupErrorCode('Yaml is valid! 🎉')).toBe('YAML_VALID');
  });

  it('matches an interpolated message back to its i18n key', () => {
    expect(lookupErrorCode('File does not exist at path: /tmp/stack.yml')).toBe(
      'IAC_FILE_NOT_FOUND',
    );
  });

  it('matches messages with multiple placeholders', () => {
    const key = lookupErrorCode("Command 'plan' failed with error:\nboom");
    expect(key).toBe('COMMAND_FAILED');
  });

  it('returns undefined for messages that are not in any catalog', () => {
    expect(lookupErrorCode('some totally unknown error text')).toBeUndefined();
  });

  it('returns undefined for empty or missing messages', () => {
    expect(lookupErrorCode(undefined)).toBeUndefined();
    expect(lookupErrorCode('')).toBeUndefined();
  });

  it('recognizes known lang keys via hasLangKey', () => {
    expect(hasLangKey('YAML_VALID')).toBe(true);
    expect(hasLangKey('NOT_A_REAL_KEY')).toBe(false);
  });

  it('is locale-independent: zh-CN messages resolve to the same key', () => {
    // '状态中没有任何资源。' is the zh-CN translation of SHOW_NO_RESOURCES
    expect(lookupErrorCode('状态中没有任何资源。')).toBe('SHOW_NO_RESOURCES');
  });
});

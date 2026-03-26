import {
  parseBoolean,
  parseBooleanWithDefault,
  parseNumber,
  parseNumberWithDefault,
  parseStringWithDefault,
  parseOptionalString,
} from '../../../src/parser/parseUtils';

describe('parseBoolean', () => {
  it('should return boolean value when input is boolean', () => {
    expect(parseBoolean(true)).toBe(true);
    expect(parseBoolean(false)).toBe(false);
  });

  it('should return true when input is string "true"', () => {
    expect(parseBoolean('true')).toBe(true);
  });

  it('should return false when input is string "false"', () => {
    expect(parseBoolean('false')).toBe(false);
  });

  it('should return default value when input is undefined', () => {
    expect(parseBoolean(undefined, true)).toBe(true);
    expect(parseBoolean(undefined, false)).toBe(false);
  });

  it('should return undefined when input is undefined and no default provided', () => {
    expect(parseBoolean(undefined)).toBeUndefined();
  });
});

describe('parseBooleanWithDefault', () => {
  it('should return boolean value when input is valid', () => {
    expect(parseBooleanWithDefault(true, false)).toBe(true);
    expect(parseBooleanWithDefault(false, true)).toBe(false);
  });

  it('should return default value when input is undefined', () => {
    expect(parseBooleanWithDefault(undefined, true)).toBe(true);
    expect(parseBooleanWithDefault(undefined, false)).toBe(false);
  });

  it('should parse string boolean and return parsed value', () => {
    expect(parseBooleanWithDefault('true', false)).toBe(true);
    expect(parseBooleanWithDefault('false', true)).toBe(false);
  });
});

describe('parseNumber', () => {
  it('should return number value when input is number', () => {
    expect(parseNumber(42)).toBe(42);
    expect(parseNumber(0)).toBe(0);
    expect(parseNumber(-10)).toBe(-10);
  });

  it('should parse valid string number', () => {
    expect(parseNumber('42')).toBe(42);
    expect(parseNumber('0')).toBe(0);
    expect(parseNumber('-10')).toBe(-10);
    expect(parseNumber('3.14')).toBe(3.14);
  });

  it('should return default value when string is not a valid number', () => {
    expect(parseNumber('not-a-number', 100)).toBe(100);
    expect(parseNumber('abc', 0)).toBe(0);
  });

  it('should return default value when input is undefined', () => {
    expect(parseNumber(undefined, 50)).toBe(50);
  });

  it('should return undefined when input is undefined and no default provided', () => {
    expect(parseNumber(undefined)).toBeUndefined();
  });
});

describe('parseNumberWithDefault', () => {
  it('should return number value when input is valid', () => {
    expect(parseNumberWithDefault(42, 0)).toBe(42);
    expect(parseNumberWithDefault('100', 0)).toBe(100);
  });

  it('should return default value when input is undefined', () => {
    expect(parseNumberWithDefault(undefined, 99)).toBe(99);
  });

  it('should return default value when string is not a valid number', () => {
    expect(parseNumberWithDefault('invalid', 42)).toBe(42);
  });
});

describe('parseStringWithDefault', () => {
  it('should return string value when input is provided', () => {
    expect(parseStringWithDefault('hello', 'default')).toBe('hello');
  });

  it('should return default value when input is undefined', () => {
    expect(parseStringWithDefault(undefined, 'default')).toBe('default');
  });

  it('should return default value when input is empty string', () => {
    expect(parseStringWithDefault('', 'default')).toBe('default');
  });

  it('should convert non-string values to string', () => {
    expect(parseStringWithDefault('123', 'default')).toBe('123');
  });
});

describe('parseOptionalString', () => {
  it('should return string value when input is provided', () => {
    expect(parseOptionalString('hello')).toBe('hello');
  });

  it('should return undefined when input is undefined', () => {
    expect(parseOptionalString(undefined)).toBeUndefined();
  });

  it('should return undefined when input is empty string', () => {
    expect(parseOptionalString('')).toBeUndefined();
  });

  it('should convert non-string values to string', () => {
    expect(parseOptionalString('42')).toBe('42');
  });
});

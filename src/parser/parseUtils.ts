import { Resolvable } from '../types';

/**
 * Helper to convert Resolvable<boolean> to boolean
 * @param value - The value that may be a boolean, string 'true'/'false', or undefined
 * @param defaultValue - The default value to return if value is undefined or not parseable
 */
export const parseBoolean = (
  value: Resolvable<boolean> | undefined,
  defaultValue?: boolean,
): boolean | undefined => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return defaultValue;
};

/**
 * Helper to convert Resolvable<boolean> to boolean with a required default
 * @param value - The value that may be a boolean, string 'true'/'false', or undefined
 * @param defaultValue - The default value to return if value is undefined or not parseable
 */
export const parseBooleanWithDefault = (
  value: Resolvable<boolean> | undefined,
  defaultValue: boolean,
): boolean => {
  const result = parseBoolean(value, defaultValue);
  return result ?? defaultValue;
};

/**
 * Helper to convert Resolvable<number> to number
 * @param value - The value that may be a number, string number, or undefined
 * @param defaultValue - The default value to return if value is undefined or not parseable
 */
export const parseNumber = (
  value: Resolvable<number> | undefined,
  defaultValue?: number,
): number | undefined => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
};

/**
 * Helper to convert Resolvable<number> to number with a required default
 * @param value - The value that may be a number, string number, or undefined
 * @param defaultValue - The default value to return if value is undefined or not parseable
 */
export const parseNumberWithDefault = (
  value: Resolvable<number> | undefined,
  defaultValue: number,
): number => {
  const result = parseNumber(value, defaultValue);
  return result ?? defaultValue;
};

/**
 * Helper to convert Resolvable<string> to string with a default value
 * @param value - The value that may be a string or undefined
 * @param defaultValue - The default value to return if value is undefined
 */
export const parseStringWithDefault = (
  value: Resolvable<string> | undefined,
  defaultValue: string,
): string => {
  return value ? String(value) : defaultValue;
};

/**
 * Helper to safely convert Resolvable<string> to string | undefined
 * @param value - The value that may be a string or undefined
 */
export const parseOptionalString = (value: Resolvable<string> | undefined): string | undefined => {
  return value ? String(value) : undefined;
};

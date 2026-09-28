/**
 * no-color.org convention (issue #250): a NO_COLOR environment variable that
 * is present and not an empty string disables ANSI color, regardless of value.
 */
export const isNoColorEnabled = (): boolean =>
  process.env.NO_COLOR !== undefined && process.env.NO_COLOR !== '';

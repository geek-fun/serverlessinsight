/**
 * Leaf module for generated provider resource names.
 *
 * Lives in src/common (not in the stack modules) so that both the deployment
 * stacks and the pre-deploy semantic validator share ONE source of truth for
 * generated names without introducing import cycles. See issue #222.
 */
import { buildConstrainedName, CONSTRAINT_NAME_LIMITS } from './nameBuilder';

/**
 * Generate a unique API key from an HTTP method and path.
 * Uses URL encoding to preserve path structure and avoid collisions.
 */
export const generateApiKey = (method: string, path: string): string => {
  // Replace slashes with double underscores to preserve path structure
  // Replace other non-alphanumeric chars with single underscore
  const sanitizedPath = path
    .replace(/\//g, '__')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/^__/, '') // Remove leading double underscore
    .replace(/__$/, ''); // Remove trailing double underscore
  return `${method}_${sanitizedPath}`;
};

/**
 * Aliyun API Gateway apiName. Aliyun CreateApi requires 4-50 chars of
 * [A-Za-z0-9_] — no hyphens.
 *
 * Resolves issue #221: long event names no longer truncate the trailing
 * method/path discriminator out of existence.
 */
export const buildAliyunApigwApiName = (eventName: string, stage: string, apiKey: string): string =>
  buildConstrainedName({
    parts: [eventName, stage, 'agw_api', apiKey],
    maxLength: CONSTRAINT_NAME_LIMITS.ALIYUN_CREATE_API_NAME,
    charset: 'underscore',
  });

/**
 * Volcengine API Gateway route name (max 63 chars, letters/digits/hyphens).
 */
export const buildVolcengineRouteName = (
  eventName: string,
  method: string,
  path: string,
): string => {
  const sanitizedPath = path
    .replace(/\//g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/^_+|_+$/g, '');
  return buildConstrainedName({
    parts: [eventName, `${method}_${sanitizedPath}`],
    maxLength: CONSTRAINT_NAME_LIMITS.VOLCENGINE_ROUTE_NAME,
    charset: 'hyphen',
  });
};

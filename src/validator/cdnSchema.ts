import { resolvableBoolean } from './templateRefSchema';

// Shared per-binding CDN schema for bucket and event domains (issue #283).
// The schema validates shape only: cdn_type is the union across implemented
// providers and scope is the provider-neutral Chinese-mainland-anchored
// vocabulary; per-provider legality is enforced by semantic validation through
// the capability registry (src/common/cdnCapabilities.ts).
export const CDN_TYPE_VALUES = ['web', 'download', 'video', 'media', 'hybrid', 'dynamic'] as const;
export const CDN_SCOPE_VALUES = ['chinese_mainland', 'overseas', 'global'] as const;

export const cdnSchema = {
  oneOf: [
    { type: 'boolean' },
    {
      type: 'object',
      properties: {
        enabled: resolvableBoolean,
        cdn_type: { type: 'string', enum: [...CDN_TYPE_VALUES] },
        scope: { type: 'string', enum: [...CDN_SCOPE_VALUES] },
        cache_ttl: { type: 'number' },
        ignore_query_string: resolvableBoolean,
        origin_protocol: { type: 'string', enum: ['http', 'https', 'follow'] },
        compression: resolvableBoolean,
        force_redirect_https: resolvableBoolean,
      },
      additionalProperties: false,
    },
  ],
};

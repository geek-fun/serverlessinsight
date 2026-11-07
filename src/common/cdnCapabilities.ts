import type { CdnScope } from '../types';

/**
 * Provider CDN capability registry (issue #283, shared with #282).
 *
 * Single source of truth for:
 * - whether a provider implements bucket / event domain CDN delivery;
 * - which cdn_type values each provider's CDN accepts;
 * - si's provider-neutral `scope` vocabulary mapped to each provider's API
 *   value (one row per provider — never hardcode these strings in executors);
 * - si's `origin_protocol` mapped to each provider's API value.
 *
 * Semantic validation fail-fasts on unsupported combinations; delivering CDN
 * for a provider narrows this registry instead of adding per-executor checks.
 * Deliberately pure (no logger/lang imports) so the validator can import it
 * without dragging runtime state into the validation graph. Only the accessor
 * helpers are exported — the registry table itself stays internal.
 */
type CdnProviderName = 'aliyun' | 'tencent' | 'volcengine';

type CdnCapability = {
  bucketCdn: boolean;
  eventCdn: boolean;
  cdnTypes: ReadonlyArray<string>;
  scopeMap: Record<CdnScope, string>;
  originProtocolMap: Record<'http' | 'https' | 'follow', string>;
};

// cdn_type union per provider (verified against provider APIs, 2026-11):
// aliyun web/download/video, tencent web/download/media/hybrid/dynamic,
// volcengine web/download/video.
const ALIYUN_CDN_TYPES: ReadonlyArray<string> = ['web', 'download', 'video'];
const TENCENT_CDN_TYPES: ReadonlyArray<string> = ['web', 'download', 'media', 'hybrid', 'dynamic'];
const VOLCENGINE_CDN_TYPES: ReadonlyArray<string> = ['web', 'download', 'video'];

const CDN_CAPABILITIES: Record<CdnProviderName, CdnCapability> = {
  aliyun: {
    bucketCdn: true,
    eventCdn: true,
    cdnTypes: ALIYUN_CDN_TYPES,
    scopeMap: {
      chinese_mainland: 'domestic',
      overseas: 'overseas',
      global: 'global',
    },
    originProtocolMap: {
      http: 'http',
      https: 'https',
      follow: 'follow',
    },
  },
  tencent: {
    bucketCdn: true,
    eventCdn: false,
    cdnTypes: TENCENT_CDN_TYPES,
    scopeMap: {
      chinese_mainland: 'mainland',
      overseas: 'overseas',
      global: 'global',
    },
    originProtocolMap: {
      http: 'http',
      https: 'https',
      follow: 'follow',
    },
  },
  volcengine: {
    bucketCdn: false,
    eventCdn: false,
    cdnTypes: VOLCENGINE_CDN_TYPES,
    scopeMap: {
      chinese_mainland: 'chinese_mainland',
      overseas: 'outside_chinese_mainland',
      global: 'global',
    },
    originProtocolMap: {
      http: 'http',
      https: 'https',
      follow: 'followclient',
    },
  },
};

export const resolveCdnCapability = (providerName: string): CdnCapability | undefined => {
  const provider = providerName as CdnProviderName;
  return CDN_CAPABILITIES[provider];
};

/**
 * Maps si's neutral `scope` value (defaulting to `global`) onto the provider's
 * API value. Executors call this instead of hardcoding provider vocabulary.
 */
export const mapCdnScope = (provider: CdnProviderName, scope?: string): string => {
  const capability = CDN_CAPABILITIES[provider];
  return capability.scopeMap[(scope ?? 'global') as CdnScope] ?? 'global';
};

/**
 * Maps si's `origin_protocol` onto the provider's API value; undefined passes
 * through so executors can keep their "not set → no call" semantics.
 */
export const mapOriginProtocol = (
  provider: CdnProviderName,
  originProtocol?: string,
): string | undefined => {
  if (originProtocol == null) return undefined;
  return CDN_CAPABILITIES[provider].originProtocolMap[
    originProtocol as 'http' | 'https' | 'follow'
  ];
};

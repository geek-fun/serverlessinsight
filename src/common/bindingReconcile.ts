import { CdnConfig, ResourceAttributes, ResourceInstance, ResourceState } from '../types';
import { normalizeHostname } from './domainUtils';
import { readPemContent, resolveBindingCertificateHash, warnInlinePem } from './certUtils';
import { logger } from './logger';
import { lang } from '../lang';

/**
 * Provider-agnostic per-binding reconcile core (issue #283).
 *
 * Extracted from the aliyun OSS path and shared with the Tencent COS path so
 * the binding state machine (stored-binding construction, hostname grouping,
 * mode resolution, option diffing, certificate change detection) lives in
 * exactly one place. Provider stacks supply their instance types and cloud
 * operations; this module holds the logic both must agree on.
 */

export type BindingCdnCarrier = {
  cdn?: boolean | CdnConfig;
};

/** A binding's CDN options as declared: object form, or implied by the boolean shorthand. */
export const getBindingCdnOptions = (binding: BindingCdnCarrier): CdnConfig | undefined => {
  if (binding.cdn == null) return undefined;
  if (typeof binding.cdn === 'boolean') return binding.cdn ? { enabled: true } : undefined;
  return binding.cdn;
};

export const isBindingCdnEnabled = (binding: BindingCdnCarrier): boolean =>
  binding.cdn === true || (typeof binding.cdn === 'object' && binding.cdn?.enabled === true);

/** A stored per-binding view reconstructed from state; identity is the normalized hostname. */
export type StoredBinding = {
  hostname: string;
  mode: 'cdn' | 'direct' | 'accelerate-only';
  cdn?: CdnConfig;
  certId?: string;
  certHash?: string;
};

export type BindingInstanceGroup = {
  cdn?: ResourceInstance;
  cdnDns?: ResourceInstance;
  dns?: ResourceInstance;
};

const instanceHostname = (instance: ResourceInstance): string =>
  normalizeHostname(String((instance as { domainName?: string }).domainName ?? instance.domain));

/**
 * Groups a resource's instances by binding hostname. `roleByType` maps each
 * provider's instance type strings onto the shared roles (CDN distribution,
 * CDN CNAME record, direct-binding CNAME record).
 */
export const groupBindingInstances = (
  instances: Array<ResourceInstance> | undefined,
  roleByType: Record<string, keyof BindingInstanceGroup>,
): Map<string, BindingInstanceGroup> => {
  const groups = new Map<string, BindingInstanceGroup>();
  (instances ?? []).forEach((instance) => {
    const role = roleByType[String(instance.type)];
    if (!role) return;
    const hostname = instanceHostname(instance);
    const group = groups.get(hostname) ?? {};
    group[role] = instance;
    groups.set(hostname, group);
  });
  return groups;
};

/**
 * Definition-first stored-binding reconstruction: reads the canonicalized
 * `domains` entries from saved state, migrates legacy single-domain state via
 * `legacyBinding`, and adopts instance-only bindings as a drift repair.
 */
export const buildStoredBindings = (
  existingState: ResourceState | undefined,
  groups: Map<string, BindingInstanceGroup>,
  options: {
    accelerateEnabled: boolean;
    legacyBinding?: (definition: ResourceAttributes) => StoredBinding | undefined;
  },
): Map<string, StoredBinding> => {
  const stored = new Map<string, StoredBinding>();
  const definition = (existingState?.definition ?? {}) as Record<string, unknown>;
  const accelerateEnabled = options.accelerateEnabled === true;

  const domains = Array.isArray(definition.domains)
    ? (definition.domains as Array<Record<string, unknown>>)
    : [];
  domains.forEach((entry) => {
    if (typeof entry?.domain_name !== 'string') return;
    const hostname = normalizeHostname(entry.domain_name);
    const cdn = typeof entry.cdn === 'object' && entry.cdn !== null ? { ...entry.cdn } : undefined;
    const cdnEnabled = (cdn as { enabled?: boolean } | undefined)?.enabled === true;
    stored.set(hostname, {
      hostname,
      mode: cdnEnabled ? 'cdn' : accelerateEnabled ? 'accelerate-only' : 'direct',
      ...(cdn ? { cdn: cdn as CdnConfig } : {}),
      ...(typeof entry.certificate_id === 'string' && entry.certificate_id
        ? { certId: entry.certificate_id }
        : {}),
      ...(typeof entry.certificate_hash === 'string' && entry.certificate_hash
        ? { certHash: entry.certificate_hash }
        : {}),
    });
  });

  if (options.legacyBinding) {
    const legacy = options.legacyBinding(definition as ResourceAttributes);
    if (legacy && !stored.has(legacy.hostname)) stored.set(legacy.hostname, legacy);
  }

  // Drift repair: binding instances recorded in state without a definition
  // entry (e.g. hand-edited state) are adopted as stored bindings by hostname.
  groups.forEach((group, hostname) => {
    if (stored.has(hostname)) return;
    const mode: StoredBinding['mode'] = group.cdn
      ? 'cdn'
      : group.dns
        ? accelerateEnabled
          ? 'accelerate-only'
          : 'direct'
        : 'cdn';
    stored.set(hostname, { hostname, mode });
  });

  return stored;
};

/** Whether the CDN delivery shape (service type / acceleration area) changed — the distribution-level update both providers apply through their update APIs. */
export const cdnDeliveryChanged = (
  stored: CdnConfig | undefined,
  desired: CdnConfig | undefined,
): boolean =>
  (stored?.cdn_type ?? 'web') !== (desired?.cdn_type ?? 'web') ||
  (stored?.scope ?? 'global') !== (desired?.scope ?? 'global');

/** The delivery mode a binding's declared config resolves to. */
export const desiredBindingMode = (
  cdnEnabled: boolean,
  accelerate: boolean,
): StoredBinding['mode'] => (cdnEnabled ? 'cdn' : accelerate ? 'accelerate-only' : 'direct');

/** Whether a binding's certificate requires (re)deployment, keyed on pending state, reference id and content hash. */
export const shouldDeployBindingCertificate = (input: {
  pending: boolean;
  certificateId?: string;
  certificateHash?: string;
  stored: StoredBinding | undefined;
}): boolean => {
  const { pending, certificateId, certificateHash, stored } = input;
  if (pending) return true;
  if (certificateId) return stored?.certId !== certificateId;
  if (certificateHash) return stored?.certHash !== certificateHash;
  return false;
};

/** A binding's certificate as declared: a provider certificate id, or an inline PEM pair to upload. */
export type BindingResolvedCertificate =
  | {
      mode: 'upload';
      certificateName: string;
      certificateBody: string;
      certificatePrivateKey: string;
    }
  | { mode: 'reference'; certificateId: string };

/**
 * Shared certificate resolution for bucket bindings (issue #283/#294):
 * reference ids pass through, inline PEM pairs are read (fail-loud at deploy
 * time) and hashed downstream. Providers without an upload path must reject
 * inline PEM earlier, in semantic validation.
 */
export const resolveBindingCertificate = (binding: {
  domain_name: string;
  certificate_id?: string;
  certificate_body?: string;
  certificate_private_key?: string;
}): BindingResolvedCertificate | undefined => {
  if (binding.certificate_id) {
    logger.info(
      lang.__('CERT_RESOLVING_REFERENCE', {
        reference: binding.certificate_id,
        domain: binding.domain_name,
      }),
    );
    return { mode: 'reference', certificateId: binding.certificate_id };
  }
  if (binding.certificate_body && binding.certificate_private_key) {
    const body = readPemContent(binding.certificate_body);
    const key = readPemContent(binding.certificate_private_key);
    warnInlinePem(binding.certificate_private_key);
    return {
      mode: 'upload',
      certificateName: binding.domain_name.replace(/\./g, '_'),
      certificateBody: body,
      certificatePrivateKey: key,
    };
  }
  return undefined;
};

/**
 * Canonicalized definition entry for one binding — the exact shape persisted
 * in state and compared by plan/diff. `certificate_hash` records the
 * content hash of inline PEM (or reference id) so redeploys only happen on
 * change (issue #283).
 */
export const bindingToDefinitionEntry = (binding: {
  domainName: string;
  certificateId?: string;
  certificateBody?: string;
  certificatePrivateKey?: string;
  cdn?: boolean | CdnConfig;
}): ResourceAttributes => {
  const cdnOptions = getBindingCdnOptions(binding);
  const cdnEnabled = isBindingCdnEnabled(binding);
  const certificateHash = resolveBindingCertificateHash({
    certificate_id: binding.certificateId,
    certificate_body: binding.certificateBody,
    certificate_private_key: binding.certificatePrivateKey,
  });
  return {
    domain_name: binding.domainName,
    certificate_id: binding.certificateId ?? null,
    certificate_body: binding.certificateBody ?? null,
    certificate_private_key: binding.certificatePrivateKey ? '(managed)' : null,
    certificate_hash: certificateHash ?? null,
    // CDN delivery state is always an explicit object: absence in YAML
    // resolves to `{ enabled: false }` (the documented default). A null would
    // be projected away by the planner's declared-field diff, making a
    // removed `cdn` block invisible to plan/diff (issue #283).
    cdn: {
      enabled: cdnEnabled,
      ...(cdnOptions?.cdn_type != null || cdnEnabled
        ? { cdn_type: cdnOptions?.cdn_type ?? 'web' }
        : {}),
      ...(cdnOptions?.scope != null || cdnEnabled ? { scope: cdnOptions?.scope ?? 'global' } : {}),
      ...(cdnOptions?.cache_ttl != null ? { cache_ttl: cdnOptions.cache_ttl } : {}),
      ...(cdnOptions?.ignore_query_string != null
        ? { ignore_query_string: cdnOptions.ignore_query_string }
        : {}),
      ...(cdnOptions?.origin_protocol != null
        ? { origin_protocol: cdnOptions.origin_protocol }
        : {}),
      ...(cdnOptions?.compression != null ? { compression: cdnOptions.compression } : {}),
      ...(cdnOptions?.force_redirect_https != null
        ? { force_redirect_https: cdnOptions.force_redirect_https }
        : {}),
    },
  };
};

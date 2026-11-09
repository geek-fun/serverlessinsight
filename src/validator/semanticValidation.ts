import { ErrorObject } from 'ajv';
import type { ServerlessIacRaw } from '../types';
import { lang } from '../lang';
import { logger } from '../common/logger';
// Direct leaf imports on purpose: routing through the src/common barrel would
// drag stateManager/lockManager/fs surfaces into the validator graph and
// recreate an import cycle with src/parser. These helpers are pure.
import {
  buildAliyunApigwApiName,
  buildVolcengineRouteName,
  generateApiKey,
} from '../common/providerNames';
import { checkSiCronForProvider } from '../common/siCron';
import { resolveCdnCapability } from '../common/cdnCapabilities';
import { isWildcardHostname, normalizeHostname, wildcardCovers } from '../common/domainUtils';

type EventTriggerRaw = {
  method?: unknown;
  path?: unknown;
  backend?: unknown;
};

type TimerTriggerRaw = {
  name?: unknown;
  cron?: unknown;
  payload?: unknown;
};

const FUNCTION_BACKEND_PATTERN = /^\$\{functions\.([\w.]+)\}$/;
const TEMPLATE_REF_PATTERN = /^\$\{[^}]+\}$/;

/** A resolvable literal hostname usable for binding-conflict checks (refs excluded). */
const asCheckableHostname = (value: unknown): string | undefined => {
  if (typeof value !== 'string' || value.length === 0 || TEMPLATE_REF_PATTERN.test(value)) {
    return undefined;
  }
  return normalizeHostname(value);
};

type SemanticErrorParams = {
  instancePath: string;
  schemaPath: string;
  keyword: string;
  message: string;
};

/**
 * Bucket semantics (issue #279): legacy domain forms are rejected with a
 * migration error, bindings are de-duplicated by normalized hostname, and an
 * exact host may not coexist with a wildcard covering it. Provider capability
 * limits are enforced here so `si validate` fails before any deploy runs.
 */
const validateBuckets = (
  providerName: string,
  buckets: Record<string, unknown>,
  errors: Array<ErrorObject>,
): void => {
  Object.entries(buckets).forEach(([bucketKey, rawBucket]) => {
    if (!rawBucket || typeof rawBucket !== 'object') return;
    const bucket = rawBucket as Record<string, unknown>;
    const bucketPath = `/buckets/${bucketKey}`;
    const push = ({ instancePath, schemaPath, keyword, message }: SemanticErrorParams) =>
      errors.push({ instancePath, schemaPath, keyword, params: {}, message } as ErrorObject);

    // v1 migration guards: legacy spellings fail loudly with the mapping, not
    // a generic additionalProperties message.
    if (bucket.domain != null) {
      push({
        instancePath: `${bucketPath}/domain`,
        schemaPath: '#/semantic/bucketDomainMigrated',
        keyword: 'bucketDomainMigrated',
        message: lang.__('BUCKET_DOMAIN_MIGRATION_REQUIRED', { key: bucketKey }),
      });
    }
    const website = bucket.website as Record<string, unknown> | undefined;
    if (website && typeof website === 'object' && website.domain != null) {
      push({
        instancePath: `${bucketPath}/website/domain`,
        schemaPath: '#/semantic/bucketWebsiteDomainMigrated',
        keyword: 'bucketWebsiteDomainMigrated',
        message: lang.__('BUCKET_WEBSITE_DOMAIN_MIGRATION_REQUIRED', { key: bucketKey }),
      });
    }

    const domains = Array.isArray(bucket.domains)
      ? (bucket.domains as Array<Record<string, unknown>>)
      : [];

    const seen: Array<{ host: string; wildcard: boolean }> = [];
    const capability = resolveCdnCapability(providerName);
    domains.forEach((entry, index) => {
      if (!entry || typeof entry !== 'object') return;
      const entryPath = `${bucketPath}/domains/${index}`;
      const rawDomain = typeof entry.domain_name === 'string' ? entry.domain_name : '';

      if (entry.www_bind_apex != null) {
        push({
          instancePath: entryPath,
          schemaPath: '#/semantic/bucketWwwBindApexRemoved',
          keyword: 'bucketWwwBindApexRemoved',
          message: lang.__('BUCKET_WWW_BIND_APEX_MIGRATION_REQUIRED', { key: bucketKey }),
        });
      }
      if (entry.accelerate != null) {
        push({
          instancePath: entryPath,
          schemaPath: '#/semantic/bucketDomainAccelerateMigrated',
          keyword: 'bucketDomainAccelerateMigrated',
          message: lang.__('BUCKET_DOMAIN_ACCELERATE_MIGRATION_REQUIRED', { key: bucketKey }),
        });
      }
      if (entry.protocol != null) {
        push({
          instancePath: entryPath,
          schemaPath: '#/semantic/bucketBindingProtocolRemoved',
          keyword: 'bucketBindingProtocolRemoved',
          message: lang.__('BUCKET_BINDING_PROTOCOL_REMOVED', {
            key: bucketKey,
            domain: rawDomain,
          }),
        });
      }

      // Volcengine direct bindings (no `cdn`) reference certificates by id —
      // TOS has no certificate-upload API for bucket domains, so inline PEM
      // cannot be applied (issue #294).
      if (
        providerName === 'volcengine' &&
        !(
          (typeof entry.cdn === 'boolean' && entry.cdn === true) ||
          (typeof entry.cdn === 'object' &&
            entry.cdn !== null &&
            (entry.cdn as Record<string, unknown>).enabled === true)
        ) &&
        typeof entry.certificate_body === 'string' &&
        typeof entry.certificate_private_key === 'string'
      ) {
        push({
          instancePath: entryPath,
          schemaPath: '#/semantic/volcengineDirectBindingPemUnsupported',
          keyword: 'volcengineDirectBindingPemUnsupported',
          message: lang.__('TOS_DIRECT_BINDING_PEM_NOT_SUPPORTED', {
            key: bucketKey,
            domain: rawDomain,
          }),
        });
      }

      // CDN capability checks (issue #283, shared registry with #282). Only
      // literal object values are checked — booleans carry no fields.
      const cdnObj =
        typeof entry.cdn === 'object' && entry.cdn !== null
          ? (entry.cdn as Record<string, unknown>)
          : undefined;
      if (cdnObj && capability) {
        if (!capability.bucketCdn) {
          push({
            instancePath: entryPath,
            schemaPath: '#/semantic/bucketCdnProviderUnsupported',
            keyword: 'bucketCdnProviderUnsupported',
            message: lang.__('CDN_NOT_SUPPORTED_ON_BUCKET_DOMAIN', {
              key: bucketKey,
              domain: rawDomain,
              provider: providerName,
            }),
          });
        } else {
          if (cdnObj.scope === 'domestic') {
            push({
              instancePath: `${entryPath}/cdn/scope`,
              schemaPath: '#/semantic/cdnScopeMigrated',
              keyword: 'cdnScopeMigrated',
              message: lang.__('CDN_SCOPE_MIGRATION_REQUIRED', {
                key: bucketKey,
                domain: rawDomain,
              }),
            });
          }
          const cdnType = typeof cdnObj.cdn_type === 'string' ? cdnObj.cdn_type : undefined;
          if (cdnType && !capability.cdnTypes.includes(cdnType)) {
            push({
              instancePath: `${entryPath}/cdn/cdn_type`,
              schemaPath: '#/semantic/cdnTypeProviderUnsupported',
              keyword: 'cdnTypeProviderUnsupported',
              message: lang.__('CDN_TYPE_NOT_SUPPORTED_BY_PROVIDER', {
                cdnType,
                provider: providerName,
                supported: capability.cdnTypes.join(', '),
              }),
            });
          }
          const hasCertificate =
            typeof entry.certificate_id === 'string' ||
            (typeof entry.certificate_body === 'string' &&
              typeof entry.certificate_private_key === 'string');
          if (cdnObj.force_redirect_https === true && !hasCertificate) {
            push({
              instancePath: `${entryPath}/cdn/force_redirect_https`,
              schemaPath: '#/semantic/forceRedirectHttpsRequiresCertificate',
              keyword: 'forceRedirectHttpsRequiresCertificate',
              message: lang.__('FORCE_REDIRECT_HTTPS_REQUIRES_CERTIFICATE', {
                key: bucketKey,
                domain: rawDomain,
              }),
            });
          }
        }
      }

      const host = asCheckableHostname(entry.domain_name);
      if (!host) return;

      const duplicate = seen.find((prev) => prev.host === host);
      if (duplicate) {
        push({
          instancePath: entryPath,
          schemaPath: '#/semantic/duplicateBucketDomain',
          keyword: 'duplicateBucketDomain',
          message: lang.__('BUCKET_DOMAINS_DUPLICATE', { key: bucketKey, domain: host }),
        });
        return;
      }

      const coveringWildcard = seen.find(
        (prev) =>
          prev.wildcard !== isWildcardHostname(host) &&
          wildcardCovers(prev.wildcard ? prev.host : host, prev.wildcard ? host : prev.host),
      );
      if (coveringWildcard) {
        const wildcard = coveringWildcard.wildcard ? coveringWildcard.host : host;
        const exact = coveringWildcard.wildcard ? host : coveringWildcard.host;
        push({
          instancePath: entryPath,
          schemaPath: '#/semantic/wildcardBucketDomainConflict',
          keyword: 'wildcardBucketDomainConflict',
          message: lang.__('BUCKET_DOMAINS_WILDCARD_CONFLICT', { key: bucketKey, exact, wildcard }),
        });
        return;
      }

      seen.push({ host, wildcard: isWildcardHostname(host) });
    });

    if (bucket.accelerate === true && providerName !== 'aliyun' && providerName !== 'volcengine') {
      push({
        instancePath: `${bucketPath}/accelerate`,
        schemaPath: '#/semantic/bucketAccelerateProviderUnsupported',
        keyword: 'bucketAccelerateProviderUnsupported',
        message: lang.__('BUCKET_ACCELERATE_PROVIDER_NOT_SUPPORTED', {
          key: bucketKey,
          provider: providerName,
        }),
      });
    }
  });
};

/** Tencent SCF allows at most 10 same-type triggers per function (#212 matrix). */
const TENCENT_TIMER_TRIGGER_LIMIT = 10;

/**
 * Stage is intentionally empty here: it is identical for every generated name
 * inside one validation run, so collision detection is unaffected while avoiding
 * coupling the validator to CLI context state.
 */
const STAGE_PLACEHOLDER = '';

export const validateSemantics = (iacJson: ServerlessIacRaw): Array<ErrorObject> => {
  const errors: Array<ErrorObject> = [];

  if (!iacJson || typeof iacJson !== 'object') {
    return errors;
  }

  const providerName = typeof iacJson.provider?.name === 'string' ? iacJson.provider.name : '';
  const events = (iacJson.events ?? {}) as Record<string, Record<string, unknown>>;
  const functionDefinitions = (iacJson.functions ?? {}) as Record<string, unknown>;
  const buckets = (iacJson.buckets ?? {}) as Record<string, unknown>;

  const definedFunctionKeys = new Set(Object.keys(functionDefinitions));
  const definedFunctionNames = new Set(
    Object.values(functionDefinitions)
      .map((fn) =>
        fn && typeof fn === 'object' && typeof (fn as { name?: unknown }).name === 'string'
          ? (fn as { name: string }).name
          : undefined,
      )
      .filter((name): name is string => name !== undefined),
  );

  Object.entries(functionDefinitions).forEach(([fnKey, rawFn]) => {
    if (!rawFn || typeof rawFn !== 'object') return;
    const fn = rawFn as { code?: unknown; container?: unknown; triggers?: unknown };
    const instancePath = `/functions/${fnKey}`;
    if (fn.container && fn.code) {
      errors.push({
        instancePath,
        schemaPath: '#/semantic/containerCodeConflict',
        keyword: 'containerCodeConflict',
        params: {},
        message: lang.__('SEMANTIC_CONTAINER_CODE_CONFLICT', { fnKey }),
      });
    } else if (!fn.container && !fn.code) {
      errors.push({
        instancePath,
        schemaPath: '#/semantic/functionSourceRequired',
        keyword: 'functionSourceRequired',
        params: {},
        message: lang.__('SEMANTIC_FUNCTION_SOURCE_REQUIRED', { fnKey }),
      });
    }

    // Timer triggers (issue #258): si-cron validity + provider capability
    // matrix surface here so `si validate` fails before any deploy runs.
    const triggers = fn.triggers as { timer?: unknown } | undefined;
    const timers = Array.isArray(triggers?.timer)
      ? (triggers?.timer as Array<TimerTriggerRaw>)
      : [];

    const seenTimerNames = new Set<string>();
    timers.forEach((timer, index) => {
      const timerPath = `${instancePath}/triggers/timer/${index}`;
      const name = typeof timer.name === 'string' ? timer.name : '';
      const cron = typeof timer.cron === 'string' ? timer.cron : '';

      if (name.length === 0) {
        errors.push({
          instancePath: timerPath,
          schemaPath: '#/semantic/timerNameRequired',
          keyword: 'timerNameRequired',
          params: {},
          message: lang.__('TIMER_TRIGGER_NAME_REQUIRED', { functionName: fnKey }),
        });
      } else if (seenTimerNames.has(name)) {
        errors.push({
          instancePath: timerPath,
          schemaPath: '#/semantic/duplicateTimerName',
          keyword: 'duplicateTimerName',
          params: {},
          message: lang.__('TIMER_TRIGGER_DUPLICATE_NAME', { name, functionName: fnKey }),
        });
      } else {
        seenTimerNames.add(name);
      }

      if (cron.length === 0) {
        errors.push({
          instancePath: timerPath,
          schemaPath: '#/semantic/timerCronRequired',
          keyword: 'timerCronRequired',
          params: {},
          message: lang.__('TIMER_TRIGGER_CRON_REQUIRED', { name: name || fnKey }),
        });
        return;
      }
      // template refs resolve at runtime — grammar is checked post-resolution
      if (TEMPLATE_REF_PATTERN.test(cron)) {
        return;
      }
      const cronProblem = checkSiCronForProvider(cron, providerName);
      if (cronProblem) {
        errors.push({
          instancePath: timerPath,
          schemaPath: '#/semantic/invalidSiCron',
          keyword: 'invalidSiCron',
          params: {},
          message: lang.__('SEMANTIC_TIMER_CRON_INVALID', {
            name: name || fnKey,
            functionName: fnKey,
            cron,
            reason: cronProblem,
          }),
        });
      }
    });

    if (providerName === 'tencent' && timers.length > TENCENT_TIMER_TRIGGER_LIMIT) {
      errors.push({
        instancePath: `${instancePath}/triggers/timer`,
        schemaPath: '#/semantic/timerTriggerLimit',
        keyword: 'timerTriggerLimit',
        params: {},
        message: lang.__('TIMER_TRIGGER_LIMIT_EXCEEDED', {
          functionName: fnKey,
          count: String(timers.length),
          provider: providerName,
          max: String(TENCENT_TIMER_TRIGGER_LIMIT),
        }),
      });
    }
  });

  validateBuckets(providerName, buckets, errors);

  Object.entries(events).forEach(([eventKey, rawEvent]) => {
    const triggers = Array.isArray(rawEvent.triggers)
      ? (rawEvent.triggers as Array<EventTriggerRaw>)
      : [];
    const eventName = typeof rawEvent.name === 'string' ? rawEvent.name : '';

    // Event-domain CDN capability (issue #283 registry, #282 fail-fast): CDN
    // delivery on gateway domains is implemented on aliyun only.
    const eventDomain =
      rawEvent.domain && typeof rawEvent.domain === 'object'
        ? (rawEvent.domain as Record<string, unknown>)
        : undefined;
    if (eventDomain?.cdn != null) {
      const capability = resolveCdnCapability(providerName);
      if (!capability || !capability.eventCdn) {
        errors.push({
          instancePath: `/events/${eventKey}/domain/cdn`,
          schemaPath: '#/semantic/eventCdnProviderUnsupported',
          keyword: 'eventCdnProviderUnsupported',
          params: {},
          message: lang.__('CDN_NOT_SUPPORTED_ON_EVENT_DOMAIN', {
            eventKey,
            provider: providerName,
          }),
        });
      } else {
        // Same capability checks as bucket bindings, mirrored onto event
        // domains so both paths report identical migration/support errors.
        const eventCdnObj =
          typeof eventDomain.cdn === 'object' && eventDomain.cdn !== null
            ? (eventDomain.cdn as Record<string, unknown>)
            : undefined;
        if (eventCdnObj) {
          if (eventCdnObj.scope === 'domestic') {
            errors.push({
              instancePath: `/events/${eventKey}/domain/cdn/scope`,
              schemaPath: '#/semantic/eventCdnScopeMigrated',
              keyword: 'eventCdnScopeMigrated',
              params: {},
              message: lang.__('EVENT_CDN_SCOPE_MIGRATION_REQUIRED', { eventKey }),
            });
          }
          const eventCdnType =
            typeof eventCdnObj.cdn_type === 'string' ? eventCdnObj.cdn_type : undefined;
          if (eventCdnType && !capability.cdnTypes.includes(eventCdnType)) {
            errors.push({
              instancePath: `/events/${eventKey}/domain/cdn/cdn_type`,
              schemaPath: '#/semantic/eventCdnTypeProviderUnsupported',
              keyword: 'eventCdnTypeProviderUnsupported',
              params: { allowedValues: capability.cdnTypes },
              message: lang.__('CDN_TYPE_NOT_SUPPORTED_BY_PROVIDER', {
                cdnType: eventCdnType,
                provider: providerName,
                supported: capability.cdnTypes.join(', '),
              }),
            });
          }
          const eventHasCertificate =
            typeof eventDomain.certificate_id === 'string' ||
            (typeof eventDomain.certificate_body === 'string' &&
              typeof eventDomain.certificate_private_key === 'string');
          if (eventCdnObj.force_redirect_https === true && !eventHasCertificate) {
            errors.push({
              instancePath: `/events/${eventKey}/domain/cdn/force_redirect_https`,
              schemaPath: '#/semantic/eventForceRedirectHttpsRequiresCertificate',
              keyword: 'eventForceRedirectHttpsRequiresCertificate',
              params: {},
              message: lang.__('EVENT_FORCE_REDIRECT_HTTPS_REQUIRES_CERTIFICATE', { eventKey }),
            });
          }
        }
      }
    }

    // Aliyun groups are per-event (each API_GATEWAY event owns its group), so
    // apiName collisions are checked event-locally, matching Volcengine's
    // per-event route scope.
    const seenTriggerKeys = new Map<string, string>();
    const seenRouteNames = new Map<string, string>();
    const seenApiNames = new Map<string, string>();

    triggers.forEach((trigger, index) => {
      const method = typeof trigger.method === 'string' ? trigger.method.toUpperCase() : '';
      const path = typeof trigger.path === 'string' ? trigger.path : '';
      const instancePath = `/events/${eventKey}/triggers/${index}`;

      let isDuplicateTrigger = false;
      if (method.length > 0 && path.length > 0) {
        const triggerKey = `${method}:${path}`;
        if (seenTriggerKeys.has(triggerKey)) {
          isDuplicateTrigger = true;
          errors.push({
            instancePath,
            schemaPath: '#/semantic/duplicateTrigger',
            keyword: 'duplicateTrigger',
            params: {},
            message: lang.__('SEMANTIC_DUPLICATE_TRIGGER', { eventKey, method, path }),
          });
        } else {
          seenTriggerKeys.set(triggerKey, path);
        }
      }

      const backendRef =
        typeof trigger.backend === 'string'
          ? FUNCTION_BACKEND_PATTERN.exec(trigger.backend)?.[1]
          : undefined;

      if (backendRef && !definedFunctionKeys.has(backendRef)) {
        errors.push({
          instancePath,
          schemaPath: '#/semantic/unresolvedBackendFunction',
          keyword: 'unresolvedBackendFunction',
          params: {},
          message: lang.__('SEMANTIC_UNRESOLVED_FUNCTION_BACKEND', {
            reference: `\${functions.${backendRef}}`,
            eventKey,
          }),
        });
      }

      // Bare backend semantics (issue #227): a bare value must be a function's
      // deployed name. A value equal to a template function's KEY is the exact
      // misconfiguration that broke the API Gateway trust policy — reject it;
      // a value matching a template function's name passes with a preference
      // warning; anything else is an external function (statically unverifiable).
      const bareBackend =
        typeof trigger.backend === 'string' &&
        !backendRef &&
        !TEMPLATE_REF_PATTERN.test(trigger.backend)
          ? trigger.backend
          : undefined;

      if (bareBackend) {
        if (definedFunctionNames.has(bareBackend)) {
          const matchedKey = Object.keys(functionDefinitions).find(
            (key) =>
              typeof (functionDefinitions[key] as { name?: unknown })?.name === 'string' &&
              (functionDefinitions[key] as { name: string }).name === bareBackend,
          );
          logger.warn(
            lang.__('SEMANTIC_BACKEND_BARE_NAME', {
              backend: bareBackend,
              key: matchedKey ?? bareBackend,
              eventKey,
            }),
          );
        } else if (definedFunctionKeys.has(bareBackend)) {
          errors.push({
            instancePath,
            schemaPath: '#/semantic/bareBackendKey',
            keyword: 'bareBackendKey',
            params: {},
            message: lang.__('SEMANTIC_BACKEND_BARE_KEY', {
              backend: bareBackend,
              key: bareBackend,
              eventKey,
            }),
          });
        }
      }

      // Generated names derive from method+path, so a duplicate trigger would
      // only re-report the duplicateTrigger error — skip name collision checks.
      if (isDuplicateTrigger || method.length === 0 || path.length === 0) {
        return;
      }

      if (providerName === 'aliyun') {
        const apiKey = generateApiKey(method, path);
        const apiName = buildAliyunApigwApiName(eventName, STAGE_PLACEHOLDER, apiKey);
        const firstPath = seenApiNames.get(apiName);

        if (firstPath !== undefined) {
          errors.push({
            instancePath,
            schemaPath: '#/semantic/duplicateGeneratedApiName',
            keyword: 'duplicateGeneratedApiName',
            params: {},
            message: lang.__('SEMANTIC_DUPLICATE_GENERATED_API_NAME', {
              apiName,
              firstPath,
              secondPath: path,
            }),
          });
        } else {
          seenApiNames.set(apiName, path);
        }
      }

      if (providerName === 'volcengine') {
        const routeName = buildVolcengineRouteName(eventName, method, path);
        const firstPath = seenRouteNames.get(routeName);

        if (firstPath !== undefined) {
          errors.push({
            instancePath,
            schemaPath: '#/semantic/duplicateRouteName',
            keyword: 'duplicateRouteName',
            params: {},
            message: lang.__('SEMANTIC_DUPLICATE_ROUTE_NAME', {
              routeName,
              firstPath,
              secondPath: path,
            }),
          });
        } else {
          seenRouteNames.set(routeName, path);
        }
      }
    });
  });

  return errors;
};

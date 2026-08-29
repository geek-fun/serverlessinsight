import { ErrorObject } from 'ajv';
import type { ServerlessIacRaw } from '../types';
import { lang } from '../lang';
import { logger } from '../common/logger';
// Direct leaf import on purpose: routing through the src/common barrel would
// drag stateManager/lockManager/fs surfaces into the validator graph and
// recreate an import cycle with src/parser. These helpers are pure.
import {
  buildAliyunApigwApiName,
  buildVolcengineRouteName,
  generateApiKey,
} from '../common/providerNames';

type EventTriggerRaw = {
  method?: unknown;
  path?: unknown;
  backend?: unknown;
};

const FUNCTION_BACKEND_PATTERN = /^\$\{functions\.([\w.]+)\}$/;
const TEMPLATE_REF_PATTERN = /^\$\{[^}]+\}$/;

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

  Object.entries(events).forEach(([eventKey, rawEvent]) => {
    const triggers = Array.isArray(rawEvent.triggers)
      ? (rawEvent.triggers as Array<EventTriggerRaw>)
      : [];
    const eventName = typeof rawEvent.name === 'string' ? rawEvent.name : '';

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

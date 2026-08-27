import { ErrorObject } from 'ajv';
import type { ServerlessIacRaw } from '../types';
import { lang } from '../lang';
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

      if (method.length > 0 && path.length > 0) {
        const triggerKey = `${method}:${path}`;
        const firstPath = seenTriggerKeys.get(triggerKey);

        if (firstPath !== undefined) {
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

      if (method.length > 0 && path.length > 0) {
        if (providerName === 'aliyun') {
          const apiKey = generateApiKey(method, path);
          const apiName = buildAliyunApigwApiName(eventName, STAGE_PLACEHOLDER, apiKey);
          const firstPath = seenApiNames.get(apiName);

          if (firstPath) {
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

          if (firstPath) {
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
      }
    });
  });

  return errors;
};

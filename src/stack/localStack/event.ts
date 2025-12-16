import { EventTypes, ServerlessIac } from '../../types';
import { isEmpty } from 'lodash';
import { ParsedRequest, RouteHandler, RouteResponse } from '../../types/localStack';
import { IncomingMessage } from 'http';
import { getIacDefinition, logger } from '../../common';
import { functionsHandler } from './function';

const matchTrigger = (
  req: { method: string; path: string },
  trigger: { method: string; path: string },
): boolean => {
  if (req.method !== 'ANY' && req.method !== trigger.method) {
    return false;
  }

  const normalize = (s: string) => s.replace(/^\/+|\/+$/g, '');
  const [pathSegments, triggerSegments] = [
    normalize(req.path).split('/'),
    normalize(trigger.path).split('/'),
  ];

  const hasWildcard = triggerSegments[triggerSegments.length - 1] === '*';

  const prefixSegments = hasWildcard ? triggerSegments.slice(0, -1) : triggerSegments;
  const minRequiredSegments = prefixSegments.length;

  if (pathSegments.length < minRequiredSegments) return false;

  return prefixSegments.every((triggerSegment, index) => {
    const pathSegment = pathSegments[index];

    if (triggerSegment.startsWith('[') && triggerSegment.endsWith(']')) {
      return pathSegment !== '';
    }

    return triggerSegment === pathSegment;
  });
};

const servEvent = async (
  req: IncomingMessage,
  parsed: ParsedRequest,
  iac: ServerlessIac,
): Promise<RouteResponse | void> => {
  const event = iac.events?.find(
    (event) => event.type === EventTypes.API_GATEWAY && event.key === parsed.identifier,
  );

  if (isEmpty(event)) {
    return {
      statusCode: 404,
      body: { error: 'API Gateway event not found', event: parsed.identifier },
    };
  }
  logger.info(
    `Event trigger ${JSON.stringify(event.triggers)}, req method: ${req.method}, req url${req.url}`,
  );
  const matchedTrigger = event.triggers.find((trigger) =>
    matchTrigger({ method: parsed.method, path: parsed.url }, trigger),
  );

  if (!matchedTrigger) {
    return { statusCode: 404, body: { error: 'No matching trigger found' } };
  }

  if (matchedTrigger.backend) {
    const backendDef = getIacDefinition(iac, matchedTrigger.backend);
    if (!backendDef) {
      return {
        statusCode: 500,
        body: { error: 'Backend definition missing', backend: matchedTrigger.backend },
      };
    }
    return await functionsHandler(req, { ...parsed, identifier: backendDef?.key as string }, iac);
  }

  return {
    statusCode: 202,
    body: { message: 'Trigger matched but no backend configured' },
  };
};

export const eventsHandler: RouteHandler = async (req, parsed, iac) => {
  return await servEvent(req, parsed, iac);
};

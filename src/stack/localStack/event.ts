import { EventTypes, ServerlessIac } from '../../types';
import { isEmpty } from 'lodash';
import { ParsedRequest, RouteHandler, RouteKind, RouteResponse } from '../../types/localStack';
import { IncomingMessage } from 'http';
import { getIacDefinition, isFunctionDomain, logger, ProviderEnum } from '../../common';
import { functionsHandler } from './function';
import { generateRequestId, logApiGatewayRequest } from './aliyunFc';
import { lang } from '../../lang';

const matchTrigger = (
  req: { method: string; path: string },
  trigger: { method: string; path: string },
): boolean => {
  if (trigger.method !== 'ANY' && req.method !== trigger.method) {
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
  const startTime = new Date();
  const requestId = generateRequestId(iac.provider.name === ProviderEnum.VOLCENGINE);
  const sourceIp = req.socket?.remoteAddress || '127.0.0.1';
  const isAliyun = iac.provider.name === ProviderEnum.ALIYUN;

  const event = iac.events?.find(
    (event) =>
      event.key === parsed.identifier &&
      (event.type === EventTypes.API_GATEWAY || iac.provider.name === ProviderEnum.VOLCENGINE),
  );

  if (isEmpty(event)) {
    return {
      statusCode: 404,
      body: { error: 'API Gateway event not found', event: parsed.identifier },
    };
  }
  if (event.type !== EventTypes.API_GATEWAY) {
    return { statusCode: 501, body: { error: lang.__('LOCAL_VOLCENGINE_TRIGGER_UNSUPPORTED') } };
  }
  logger.info(
    lang.__('EVENT_TRIGGER', {
      triggers: JSON.stringify(event.triggers),
      method: req.method || '',
      url: req.url || '',
    }),
  );
  const matchedTrigger = event.triggers.find((trigger) =>
    iac.provider.name === ProviderEnum.VOLCENGINE
      ? (trigger.method === 'ANY' || trigger.method === parsed.method) &&
        trigger.path === parsed.url
      : matchTrigger({ method: parsed.method, path: parsed.url }, trigger),
  );

  if (!matchedTrigger) {
    const endTime = new Date();
    if (isAliyun) {
      logApiGatewayRequest(requestId, parsed.url, 404, startTime, endTime, sourceIp);
    }
    return { statusCode: 404, body: { error: 'No matching trigger found' } };
  }

  if (matchedTrigger.backend) {
    const backendDef = getIacDefinition(iac, matchedTrigger.backend);
    if (!backendDef || !isFunctionDomain(backendDef)) {
      const endTime = new Date();
      if (isAliyun) {
        logApiGatewayRequest(requestId, parsed.url, 500, startTime, endTime, sourceIp);
      }
      return {
        statusCode: 500,
        body: { error: 'Backend definition missing', backend: matchedTrigger.backend },
      };
    }

    const result = await functionsHandler(
      req,
      { ...parsed, kind: RouteKind.SI_EVENTS, identifier: backendDef.key },
      iac,
      requestId,
    );

    const endTime = new Date();
    if (isAliyun) {
      logApiGatewayRequest(requestId, parsed.url, result.statusCode, startTime, endTime, sourceIp);
    }

    return result;
  }

  return {
    statusCode: 202,
    body: { message: 'Trigger matched but no backend configured' },
  };
};

export const eventsHandler: RouteHandler = async (req, parsed, iac) => {
  return await servEvent(req, parsed, iac);
};

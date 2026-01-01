import { EventTypes, ServerlessIac } from '../../types';
import { isEmpty } from 'lodash';
import { ParsedRequest, RouteHandler, RouteResponse } from '../../types/localStack';
import { IncomingMessage } from 'http';
import { getIacDefinition, logger, ProviderEnum } from '../../common';
import { functionsHandler } from './function';
import {
  generateRequestId,
  logApiGatewayRequest,
  transformToAliyunEvent,
  transformFCResponse,
  createAliyunContextSerializable,
} from './aliyunFc';
import { invokeFunction } from './functionRunner';
import path from 'node:path';
import fs from 'node:fs';
import { FunctionOptions } from '../../types/localStack';
import { extractZipFile } from './utils';
import { lang } from '../../lang';

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
  const startTime = new Date();
  const requestId = generateRequestId();
  const sourceIp = req.socket?.remoteAddress || '127.0.0.1';
  const isAliyun = iac.provider.name === ProviderEnum.ALIYUN;

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
    lang.__('EVENT_TRIGGER', {
      triggers: JSON.stringify(event.triggers),
      method: req.method || '',
      url: req.url || '',
    }),
  );
  const matchedTrigger = event.triggers.find((trigger) =>
    matchTrigger({ method: parsed.method, path: parsed.url }, trigger),
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
    if (!backendDef) {
      const endTime = new Date();
      if (isAliyun) {
        logApiGatewayRequest(requestId, parsed.url, 500, startTime, endTime, sourceIp);
      }
      return {
        statusCode: 500,
        body: { error: 'Backend definition missing', backend: matchedTrigger.backend },
      };
    }

    // For Aliyun, handle the function execution with proper event transformation
    if (isAliyun && backendDef.code) {
      let tempDir: string | null = null;
      try {
        const { event: aliyunEvent } = await transformToAliyunEvent(req, parsed.url, parsed.query);

        const codePath = path.resolve(process.cwd(), backendDef.code.path);
        let codeDir: string;

        if (codePath.endsWith('.zip') && fs.existsSync(codePath)) {
          tempDir = await extractZipFile(codePath);
          codeDir = tempDir;
        } else if (fs.existsSync(codePath) && fs.statSync(codePath).isDirectory()) {
          codeDir = codePath;
        } else {
          codeDir = path.dirname(codePath);
        }

        const funOptions: FunctionOptions = {
          codeDir,
          functionKey: backendDef.key as string,
          handler: backendDef.code.handler,
          servicePath: '',
          timeout: (backendDef.timeout ?? 3) * 1000,
        };

        const aliyunContext = createAliyunContextSerializable(
          iac,
          backendDef.name,
          backendDef.code.handler,
          backendDef.memory ?? 128,
          backendDef.timeout ?? 3,
          requestId,
        );

        const env = {
          ...backendDef.environment,
        };

        logger.debug(lang.__('INVOKING_FC_FUNCTION_WITH_ALIYUN_EVENT'));
        const result = await invokeFunction(funOptions, env, aliyunEvent, aliyunContext);

        const endTime = new Date();
        const transformed = transformFCResponse(result);

        // Log API Gateway request
        logApiGatewayRequest(
          requestId,
          parsed.url,
          transformed.statusCode,
          startTime,
          endTime,
          sourceIp,
        );

        return {
          statusCode: transformed.statusCode,
          headers: transformed.headers,
          body: transformed.body,
        };
      } catch (error) {
        const endTime = new Date();
        logApiGatewayRequest(requestId, parsed.url, 500, startTime, endTime, sourceIp);
        logger.error(lang.__('FUNCTION_EXECUTION_ERROR', { error: String(error) }));
        return {
          statusCode: 500,
          body: {
            error: 'Function execution failed',
            message: error instanceof Error ? error.message : String(error),
          },
        };
      } finally {
        if (tempDir && fs.existsSync(tempDir)) {
          fs.rmSync(tempDir, { recursive: true, force: true });
        }
      }
    }

    // For non-Aliyun or when using functionsHandler
    const result = await functionsHandler(
      req,
      { ...parsed, identifier: backendDef?.key as string },
      iac,
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

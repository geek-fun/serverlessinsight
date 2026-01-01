import { IncomingMessage } from 'http';
import { ServerlessIac } from '../../types';
import { FunctionOptions, ParsedRequest, RouteResponse } from '../../types/localStack';
import { logger, readRequestBody, ProviderEnum } from '../../common';
import { invokeFunction } from './functionRunner';
import path from 'node:path';
import fs from 'node:fs';
import {
  transformToAliyunEvent,
  createAliyunContextSerializable,
  transformFCResponse,
  generateRequestId,
} from './aliyunFc';
import { extractZipFile } from './utils';
import { lang } from '../../lang';

export const functionsHandler = async (
  req: IncomingMessage,
  parsed: ParsedRequest,
  iac: ServerlessIac,
): Promise<RouteResponse> => {
  logger.info(
    lang.__('FUNCTION_REQUEST_RECEIVED', {
      method: req.method || '',
      identifier: parsed.identifier ?? '/',
    }),
  );

  const fcDef = iac.functions?.find((fn) => fn.key === parsed.identifier);
  if (!fcDef) {
    return {
      statusCode: 404,
      body: { error: 'Function not found', functionKey: parsed.identifier },
    };
  }

  if (!fcDef.code) {
    return {
      statusCode: 400,
      body: { error: 'Function code configuration not found', functionKey: fcDef.key },
    };
  }

  let tempDir: string | null = null;

  try {
    const codePath = path.resolve(process.cwd(), fcDef.code.path);

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
      functionKey: fcDef.key,
      handler: fcDef.code.handler,
      servicePath: '',
      timeout: (fcDef.timeout ?? 3) * 1000,
    };

    // Check if provider is Aliyun to use Aliyun FC format
    const isAliyun = iac.provider.name === ProviderEnum.ALIYUN;

    let event: unknown;
    let fcContext: unknown;
    let env: Record<string, string>;

    if (isAliyun) {
      // Aliyun FC format: event is a Buffer containing JSON
      const requestId = generateRequestId();
      const { event: aliyunEvent } = await transformToAliyunEvent(req, parsed.url, parsed.query);

      event = aliyunEvent;
      // Use serializable context for worker thread (logger will be added inside worker)
      fcContext = createAliyunContextSerializable(
        iac,
        fcDef.name,
        fcDef.code.handler,
        fcDef.memory ?? 128,
        fcDef.timeout ?? 3,
        requestId,
      );

      env = {
        ...fcDef.environment,
      };
    } else {
      // AWS Lambda format (default)
      const rawBody = await readRequestBody(req);
      event = rawBody ? JSON.parse(rawBody) : {};

      env = {
        ...fcDef.environment,
        AWS_REGION: iac.provider.region || 'us-east-1',
        FUNCTION_NAME: fcDef.name,
        FUNCTION_MEMORY_SIZE: String(fcDef.memory),
        FUNCTION_TIMEOUT: String(fcDef.timeout),
      };

      fcContext = {
        functionName: fcDef.name,
        functionVersion: '$LATEST',
        memoryLimitInMB: fcDef.memory,
        logGroupName: `/aws/lambda/${fcDef.name}`,
        logStreamName: `${new Date().toISOString().split('T')[0]}/[$LATEST]${Math.random().toString(36).substring(7)}`,
        invokedFunctionArn: `arn:aws:lambda:${iac.provider.region}:000000000000:function:${fcDef.name}`,
        awsRequestId: Math.random().toString(36).substring(2, 15),
      };
    }

    logger.debug(
      lang.__('INVOKING_WORKER_WITH_EVENT_TYPE', {
        eventType: isAliyun ? 'Buffer' : 'Object',
      }),
    );
    logger.debug(lang.__('WORKER_CODE_DIR', { codeDir, handler: funOptions.handler }));

    const result = await invokeFunction(funOptions, env, event, fcContext);

    logger.info(lang.__('FUNCTION_EXECUTION_RESULT', { result: JSON.stringify(result) }));

    // For Aliyun, transform FC response to HTTP response if needed
    if (isAliyun && result) {
      const transformed = transformFCResponse(result);
      return {
        statusCode: transformed.statusCode,
        headers: transformed.headers,
        body: transformed.body,
      };
    }

    return {
      statusCode: 200,
      body: result,
    };
  } catch (error) {
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
};

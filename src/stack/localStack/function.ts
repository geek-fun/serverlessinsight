import { IncomingMessage } from 'http';
import fs from 'node:fs';
import { inspect } from 'node:util';
import { ServerlessIac } from '../../types';
import { FunctionOptions, ParsedRequest, RouteResponse } from '../../types/localStack';
import { logger } from '../../common';
import { invokeFunction } from './functionRunner';
import { generateProviderRequestId } from './requestId';
import { getLocalHttpAdapter } from './httpAdapter';
import { resolveCodeDir } from './utils';
import { lang } from '../../lang';

export const functionsHandler = async (
  req: IncomingMessage,
  parsed: ParsedRequest,
  iac: ServerlessIac,
  requestId = generateProviderRequestId(iac.provider.name),
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
      body: { error: lang.__('LOCAL_FUNCTION_NOT_FOUND'), functionKey: parsed.identifier },
    };
  }

  let tempDir: string | null = null;

  try {
    const adapter = getLocalHttpAdapter(iac.provider.name);
    adapter.validate(fcDef);
    if (!fcDef.code) {
      return {
        statusCode: 400,
        body: { error: lang.__('LOCAL_FUNCTION_CODE_MISSING'), functionKey: fcDef.key },
      };
    }

    const { codeDir, tempDir: resolvedTempDir } = await resolveCodeDir(fcDef.code.path);
    tempDir = resolvedTempDir;

    const funOptions: FunctionOptions = {
      codeDir,
      functionKey: fcDef.key,
      handler: fcDef.code.handler,
      servicePath: '',
      timeout: (fcDef.timeout ?? 3) * 1000,
    };

    const { event, context, env } = await adapter.buildInvocation(
      req,
      parsed,
      iac,
      fcDef,
      requestId,
    );
    logger.debug(
      lang.__('INVOKING_WORKER_WITH_EVENT_TYPE', {
        eventType: Buffer.isBuffer(event) ? 'Buffer' : 'Object',
      }),
    );
    logger.debug(lang.__('WORKER_CODE_DIR', { codeDir, handler: funOptions.handler }));

    const result = await invokeFunction(funOptions, env, event, context);
    logger.info(lang.__('FUNCTION_EXECUTION_RESULT', { result: inspect(result) }));
    return adapter.transformResponse(result, parsed.kind);
  } catch (error) {
    logger.error(lang.__('FUNCTION_EXECUTION_ERROR', { error: String(error) }));
    const statusCode =
      error instanceof Error && 'statusCode' in error && typeof error.statusCode === 'number'
        ? error.statusCode
        : 500;
    return {
      statusCode,
      body: {
        error: lang.__('LOCAL_FUNCTION_EXECUTION_FAILED'),
        message: error instanceof Error ? error.message : String(error),
      },
    };
  } finally {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
};

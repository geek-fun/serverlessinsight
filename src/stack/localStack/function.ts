import { IncomingMessage } from 'http';
import { ServerlessIac } from '../../types';
import { FunctionOptions, ParsedRequest, RouteResponse } from '../../types/localStack';
import { logger, getContext, calcValue, readRequestBody } from '../../common';
import { invokeFunction } from './functionRunner';
import path from 'node:path';
import fs from 'node:fs';
import JSZip from 'jszip';
import os from 'node:os';

const extractZipFile = async (zipPath: string): Promise<string> => {
  const zipData = fs.readFileSync(zipPath);
  const zip = await JSZip.loadAsync(zipData);

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'si-function-'));

  for (const [relativePath, file] of Object.entries(zip.files)) {
    if (file.dir) {
      fs.mkdirSync(path.join(tempDir, relativePath), { recursive: true });
    } else {
      const content = await file.async('nodebuffer');
      const filePath = path.join(tempDir, relativePath);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content);
    }
  }

  // Check if there's a single root directory in the zip
  // If so, return that directory instead of the temp directory
  const entries = fs.readdirSync(tempDir);
  if (entries.length === 1) {
    const singleEntry = path.join(tempDir, entries[0]);
    if (fs.statSync(singleEntry).isDirectory()) {
      return singleEntry;
    }
  }

  return tempDir;
};

export const functionsHandler = async (
  req: IncomingMessage,
  parsed: ParsedRequest,
  iac: ServerlessIac,
): Promise<RouteResponse> => {
  logger.info(
    `Function request received by local server -> ${req.method} ${parsed.identifier ?? '/'} `,
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
    const rawBody = await readRequestBody(req);
    const event = rawBody ? JSON.parse(rawBody) : {};

    const ctx = getContext();
    logger.debug(`Context parameters: ${JSON.stringify(ctx.parameters)}`);

    const codePath = path.resolve(process.cwd(), calcValue(fcDef.code.path, ctx));

    let codeDir: string;

    if (codePath.endsWith('.zip') && fs.existsSync(codePath)) {
      tempDir = await extractZipFile(codePath);
      codeDir = tempDir;
    } else if (fs.existsSync(codePath) && fs.statSync(codePath).isDirectory()) {
      codeDir = codePath;
    } else {
      codeDir = path.dirname(codePath);
    }
    const functionName = calcValue<string>(fcDef.name, ctx);

    const funOptions: FunctionOptions = {
      codeDir,
      functionKey: fcDef.key,
      handler: calcValue(fcDef.code.handler, ctx),
      servicePath: '',
      timeout: (fcDef.timeout || 3) * 1000,
    };

    const env = {
      ...fcDef.environment,
      AWS_REGION: iac.provider.region || 'us-east-1',
      FUNCTION_NAME: functionName,
      FUNCTION_MEMORY_SIZE: String(fcDef.memory || 128),
      FUNCTION_TIMEOUT: String(fcDef.timeout || 3),
    };

    const fcContext = {
      functionName,
      functionVersion: '$LATEST',
      memoryLimitInMB: fcDef.memory || 128,
      logGroupName: `/aws/lambda/${functionName}`,
      logStreamName: `${new Date().toISOString().split('T')[0]}/[$LATEST]${Math.random().toString(36).substring(7)}`,
      invokedFunctionArn: `arn:aws:lambda:${iac.provider.region}:000000000000:function:${functionName}`,
      awsRequestId: Math.random().toString(36).substring(2, 15),
    };

    logger.debug(
      `Invoking worker with event: ${JSON.stringify(event)} and context: ${JSON.stringify(fcContext)}`,
    );
    logger.debug(`Worker codeDir: ${codeDir}, handler: ${funOptions.handler}`);

    const result = await invokeFunction(funOptions, env, event, fcContext);

    logger.info(`Function execution result: ${JSON.stringify(result)}`);

    return {
      statusCode: 200,
      body: result,
    };
  } catch (error) {
    logger.error(`Function execution error: ${error}`);
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

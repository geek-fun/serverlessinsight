import { randomUUID } from 'crypto';
import { IncomingMessage } from 'http';
import { readRequestBody } from '../../common';
import { ServerlessIac } from '../../types';
import {
  AliyunApiGatewayContext,
  AliyunFCResponse,
  AliyunServerlessEvent,
} from '../../types/localStack';

const createFCLogger = (requestId: string) => {
  const formatLog = (level: string, message: string) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} ${requestId} [${level}] ${message}`);
  };

  return {
    debug: (message: string) => formatLog('DEBUG', message),
    info: (message: string) => formatLog('INFO', message),
    warn: (message: string) => formatLog('WARNING', message),
    error: (message: string) => formatLog('ERROR', message),
    log: (message: string) => formatLog('INFO', message),
  };
};

export const transformToAliyunEvent = async (
  req: IncomingMessage,
  url: string,
  query: Record<string, string>,
): Promise<{ event: Buffer; headers: Record<string, string> }> => {
  const rawBody = await readRequestBody(req);

  const pathParameters: Record<string, string> = {};

  const event: AliyunServerlessEvent = {
    path: url,
    httpMethod: req.method || 'GET',
    headers: req.headers as Record<string, string>,
    queryParameters: query,
    pathParameters,
    body: rawBody || undefined,
    isBase64Encoded: false,
  };

  const eventBuffer = Buffer.from(JSON.stringify(event));

  return { event: eventBuffer, headers: req.headers as Record<string, string> };
};

export const createAliyunContextSerializable = (
  iac: ServerlessIac,
  functionName: string,
  handler: string,
  memory: number,
  timeout: number,
  requestId: string,
): Omit<AliyunApiGatewayContext, 'logger' | 'tracing'> & {
  requestId: string;
  tracing: Omit<AliyunApiGatewayContext['tracing'], 'parseOpenTracingBaggages'>;
} => {
  return {
    requestId,
    region: iac.provider.region || 'cn-hangzhou',
    accountId: process.env.ALIYUN_ACCOUNT_ID || '000000000000',
    credentials: {
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || 'mock-access-key-id',
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || 'mock-access-key-secret',
      securityToken: process.env.ALIYUN_SECURITY_TOKEN || '',
    },
    function: {
      name: functionName,
      handler,
      memory,
      timeout,
      initializer: '',
    },
    service: {
      name: iac.service || 'default-service',
      logProject: `${iac.service}-log-project`,
      logStore: `${iac.service}-log-store`,
      qualifier: 'LATEST',
      versionId: '1',
    },
    tracing: {
      spanContext: '',
      jaegerEndpoint: '',
      spanBaggages: {},
    },
  };
};

export const createAliyunContext = (
  iac: ServerlessIac,
  functionName: string,
  handler: string,
  memory: number,
  timeout: number,
  requestId: string,
): AliyunApiGatewayContext => {
  const baseContext = createAliyunContextSerializable(
    iac,
    functionName,
    handler,
    memory,
    timeout,
    requestId,
  );
  return {
    ...baseContext,
    tracing: {
      ...baseContext.tracing,
      parseOpenTracingBaggages: () => ({}),
    },
    logger: createFCLogger(requestId),
  };
};

export const addFCHeaders = (
  context: AliyunApiGatewayContext,
  headers: Record<string, string>,
): Record<string, string> => {
  return {
    ...headers,
    'x-fc-request-id': context.requestId,
    'x-fc-access-key-id': context.credentials.accessKeyId,
    'x-fc-access-key-secret': context.credentials.accessKeySecret,
    'x-fc-security-token': context.credentials.securityToken,
    'x-fc-function-handler': context.function.handler,
    'x-fc-function-memory': String(context.function.memory),
    'x-fc-region': context.region,
    'x-fc-account-id': context.accountId,
    'x-fc-qualifier': context.service.qualifier,
    'x-fc-version-id': context.service.versionId,
    'x-fc-function-name': context.function.name,
    'x-fc-service-logproject': context.service.logProject,
    'x-fc-service-logstore': context.service.logStore,
    'x-fc-control-path': '/http-invoke',
  };
};

export const transformFCResponse = (
  result: unknown,
): { statusCode: number; headers: Record<string, string>; body: unknown } => {
  if (result && typeof result === 'object' && 'statusCode' in result && 'body' in result) {
    const {
      statusCode: rawStatus = 200,
      body: rawBody,
      isBase64Encoded,
      headers = {},
    } = result as AliyunFCResponse;

    const parsedStatus = typeof rawStatus === 'string' ? parseInt(rawStatus, 10) : rawStatus;
    const statusCode = isNaN(parsedStatus) ? 200 : parsedStatus;

    let body = rawBody;

    if (isBase64Encoded && typeof body === 'string') {
      body = Buffer.from(body, 'base64').toString('utf-8');
    }

    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // If parsing fails, keep as string
      }
    }

    return { statusCode, headers, body };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: result,
  };
};

export const logApiGatewayRequest = (
  requestId: string,
  apiPath: string,
  statusCode: number,
  startTime: Date,
  endTime: Date,
  sourceIp: string,
) => {
  const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(1);
  const startTimeStr = formatDateTime(startTime);
  const endTimeStr = formatDateTime(endTime);
  const timestamp = formatDateTime(new Date());

  console.log(
    `${timestamp} | ${requestId} | ${apiPath} | Sync Call | local-app | Development | local-project | ${statusCode} | ${startTimeStr} | ${endTimeStr} | ${duration}s | - | ${sourceIp}`,
  );
};

const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const generateRequestId = (): string => {
  return randomUUID().replace(/-/g, '');
};

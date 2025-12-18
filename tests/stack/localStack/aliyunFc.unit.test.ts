import {
  transformToAliyunEvent,
  createAliyunContextSerializable,
  createAliyunContext,
  addFCHeaders,
  transformFCResponse,
  logApiGatewayRequest,
  generateRequestId,
} from '../../../src/stack/localStack/aliyunFc';
import { IncomingMessage } from 'http';
import { Readable } from 'stream';
import { ProviderEnum } from '../../../src/common';
import { ServerlessIac } from '../../../src/types';

describe('Aliyun FC Utilities', () => {
  const mockIac: ServerlessIac = {
    version: '0.0.1',
    service: 'test-service',
    provider: {
      name: ProviderEnum.ALIYUN,
      region: 'cn-shanghai',
    },
  };

  describe('generateRequestId', () => {
    it('should generate a UUID without hyphens', () => {
      const id = generateRequestId();
      expect(id).toBeDefined();
      expect(id).toMatch(/^[a-f0-9]{32}$/);
      expect(id).not.toContain('-');
    });

    it('should generate unique IDs', () => {
      const id1 = generateRequestId();
      const id2 = generateRequestId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('transformToAliyunEvent', () => {
    const mockRequest = (method = 'GET', body = ''): IncomingMessage => {
      const readable = new Readable();
      readable.push(body);
      readable.push(null);

      const req = readable as unknown as IncomingMessage;
      req.method = method;
      req.headers = {
        'content-type': 'application/json',
        host: 'localhost:4567',
      };
      return req;
    };

    it('should transform GET request to Aliyun event', async () => {
      const req = mockRequest('GET');
      const url = '/api/test';
      const query = { param1: 'value1', param2: 'value2' };

      const result = await transformToAliyunEvent(req, url, query);

      expect(Buffer.isBuffer(result.event)).toBe(true);
      const parsedEvent = JSON.parse(result.event.toString());
      expect(parsedEvent.path).toBe('/api/test');
      expect(parsedEvent.httpMethod).toBe('GET');
      expect(parsedEvent.queryParameters).toEqual(query);
      expect(parsedEvent.headers).toBeDefined();
      expect(parsedEvent.isBase64Encoded).toBe(false);
    });

    it('should transform POST request with body to Aliyun event', async () => {
      const body = JSON.stringify({ test: 'data' });
      const req = mockRequest('POST', body);
      const url = '/api/create';
      const query = {};

      const result = await transformToAliyunEvent(req, url, query);

      const parsedEvent = JSON.parse(result.event.toString());
      expect(parsedEvent.httpMethod).toBe('POST');
      expect(parsedEvent.body).toBe(body);
      expect(parsedEvent.path).toBe('/api/create');
    });

    it('should include headers in the response', async () => {
      const req = mockRequest('GET');
      const result = await transformToAliyunEvent(req, '/test', {});

      expect(result.headers).toBeDefined();
      expect(result.headers['content-type']).toBe('application/json');
    });

    it('should handle request without body', async () => {
      const req = mockRequest('GET', '');
      const result = await transformToAliyunEvent(req, '/test', {});

      const parsedEvent = JSON.parse(result.event.toString());
      expect(parsedEvent.body).toBeUndefined();
    });
  });

  describe('createAliyunContextSerializable', () => {
    it('should create serializable Aliyun context', () => {
      const context = createAliyunContextSerializable(
        mockIac,
        'test-function',
        'index.handler',
        512,
        30,
        'request-id-123',
      );

      expect(context.requestId).toBe('request-id-123');
      expect(context.region).toBe('cn-shanghai');
      expect(context.function.name).toBe('test-function');
      expect(context.function.handler).toBe('index.handler');
      expect(context.function.memory).toBe(512);
      expect(context.function.timeout).toBe(30);
      expect(context.service.name).toBe('test-service');
      expect(context.credentials).toBeDefined();
      expect(context.tracing).toBeDefined();
    });

    it('should use default values when provider region is not specified', () => {
      const iacWithoutRegion: ServerlessIac = {
        ...mockIac,
        provider: { name: ProviderEnum.ALIYUN, region: '' },
      };

      const context = createAliyunContextSerializable(
        iacWithoutRegion,
        'test-func',
        'index.handler',
        256,
        10,
        'req-id',
      );

      expect(context.region).toBe('cn-hangzhou'); // default region
    });

    it('should use environment variables for credentials if available', () => {
      process.env.ALIYUN_ACCOUNT_ID = 'test-account-id';
      process.env.ALIYUN_ACCESS_KEY_ID = 'test-access-key';
      process.env.ALIYUN_ACCESS_KEY_SECRET = 'test-secret';
      process.env.ALIYUN_SECURITY_TOKEN = 'test-token';

      const context = createAliyunContextSerializable(mockIac, 'func', 'handler', 128, 5, 'req');

      expect(context.accountId).toBe('test-account-id');
      expect(context.credentials.accessKeyId).toBe('test-access-key');
      expect(context.credentials.accessKeySecret).toBe('test-secret');
      expect(context.credentials.securityToken).toBe('test-token');

      delete process.env.ALIYUN_ACCOUNT_ID;
      delete process.env.ALIYUN_ACCESS_KEY_ID;
      delete process.env.ALIYUN_ACCESS_KEY_SECRET;
      delete process.env.ALIYUN_SECURITY_TOKEN;
    });

    it('should set default service name when not provided', () => {
      const iacWithoutService: ServerlessIac = {
        version: '0.0.1',
        service: '', // service is required but can be empty
        provider: {
          name: ProviderEnum.ALIYUN,
          region: 'cn-beijing',
        },
      };

      const context = createAliyunContextSerializable(
        iacWithoutService,
        'func',
        'handler',
        128,
        5,
        'req',
      );

      expect(context.service.name).toBe('default-service');
    });
  });

  describe('createAliyunContext', () => {
    it('should create full Aliyun context with logger', () => {
      const context = createAliyunContext(
        mockIac,
        'test-function',
        'index.handler',
        512,
        30,
        'request-id-123',
      );

      expect(context.logger).toBeDefined();
      expect(typeof context.logger.debug).toBe('function');
      expect(typeof context.logger.info).toBe('function');
      expect(typeof context.logger.warn).toBe('function');
      expect(typeof context.logger.error).toBe('function');
      expect(typeof context.logger.log).toBe('function');
      expect(context.tracing.parseOpenTracingBaggages).toBeDefined();
      expect(typeof context.tracing.parseOpenTracingBaggages).toBe('function');
    });

    it('should have logger methods that output correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const context = createAliyunContext(mockIac, 'func', 'handler', 128, 5, 'req-123');

      context.logger.info('Test message');
      expect(consoleSpy).toHaveBeenCalled();
      const call = consoleSpy.mock.calls[0][0];
      expect(call).toContain('req-123');
      expect(call).toContain('[INFO]');
      expect(call).toContain('Test message');

      consoleSpy.mockRestore();
    });

    it('should have all logger levels', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const context = createAliyunContext(mockIac, 'func', 'handler', 128, 5, 'req-id');

      context.logger.debug('debug msg');
      context.logger.info('info msg');
      context.logger.warn('warn msg');
      context.logger.error('error msg');
      context.logger.log('log msg');

      expect(consoleSpy).toHaveBeenCalledTimes(5);
      expect(consoleSpy.mock.calls[0][0]).toContain('[DEBUG]');
      expect(consoleSpy.mock.calls[1][0]).toContain('[INFO]');
      expect(consoleSpy.mock.calls[2][0]).toContain('[WARNING]');
      expect(consoleSpy.mock.calls[3][0]).toContain('[ERROR]');
      expect(consoleSpy.mock.calls[4][0]).toContain('[INFO]'); // log maps to INFO

      consoleSpy.mockRestore();
    });
  });

  describe('addFCHeaders', () => {
    it('should add all FC headers to existing headers', () => {
      const context = createAliyunContext(mockIac, 'func', 'index.handler', 256, 10, 'req-456');
      const existingHeaders = { 'x-custom': 'value' };

      const result = addFCHeaders(context, existingHeaders);

      expect(result['x-custom']).toBe('value');
      expect(result['x-fc-request-id']).toBe('req-456');
      expect(result['x-fc-function-name']).toBe('func');
      expect(result['x-fc-function-handler']).toBe('index.handler');
      expect(result['x-fc-function-memory']).toBe('256');
      expect(result['x-fc-region']).toBe('cn-shanghai');
      expect(result['x-fc-qualifier']).toBe('LATEST');
      expect(result['x-fc-control-path']).toBe('/http-invoke');
      expect(result['x-fc-service-logproject']).toBe('test-service-log-project');
      expect(result['x-fc-service-logstore']).toBe('test-service-log-store');
    });

    it('should work with empty headers', () => {
      const context = createAliyunContext(mockIac, 'func', 'handler', 128, 5, 'req');
      const result = addFCHeaders(context, {});

      expect(Object.keys(result).length).toBeGreaterThan(10);
      expect(result['x-fc-request-id']).toBe('req');
    });
  });

  describe('transformFCResponse', () => {
    it('should transform FC response with statusCode and body', () => {
      const fcResponse = {
        statusCode: '200',
        body: JSON.stringify({ message: 'success' }),
        headers: { 'x-custom': 'value' },
        isBase64Encoded: false,
      };

      const result = transformFCResponse(fcResponse);

      expect(result.statusCode).toBe(200);
      expect(result.headers['x-custom']).toBe('value');
      expect(result.body).toEqual({ message: 'success' });
    });

    it('should handle numeric statusCode', () => {
      const fcResponse = {
        statusCode: 201,
        body: 'created',
        headers: {},
      };

      const result = transformFCResponse(fcResponse);

      expect(result.statusCode).toBe(201);
    });

    it('should decode base64 encoded body', () => {
      const originalData = 'Hello World';
      const base64Data = Buffer.from(originalData).toString('base64');

      const fcResponse = {
        statusCode: 200,
        body: base64Data,
        isBase64Encoded: true,
        headers: {},
      };

      const result = transformFCResponse(fcResponse);

      expect(result.body).toBe(originalData);
    });

    it('should parse JSON string body', () => {
      const fcResponse = {
        statusCode: 200,
        body: '{"data":"value"}',
        headers: {},
      };

      const result = transformFCResponse(fcResponse);

      expect(result.body).toEqual({ data: 'value' });
    });

    it('should keep non-JSON string body as is', () => {
      const fcResponse = {
        statusCode: 200,
        body: 'plain text response',
        headers: {},
      };

      const result = transformFCResponse(fcResponse);

      expect(result.body).toBe('plain text response');
    });

    it('should wrap non-FC response format', () => {
      const simpleResult = { message: 'hello' };

      const result = transformFCResponse(simpleResult);

      expect(result.statusCode).toBe(200);
      expect(result.headers['Content-Type']).toBe('application/json');
      expect(result.body).toEqual(simpleResult);
    });

    it('should handle null/undefined result', () => {
      const result = transformFCResponse(null);

      expect(result.statusCode).toBe(200);
      expect(result.body).toBeNull();
    });

    it('should handle string result', () => {
      const result = transformFCResponse('simple string');

      expect(result.statusCode).toBe(200);
      expect(result.body).toBe('simple string');
    });

    it('should use default statusCode if missing', () => {
      const fcResponse = {
        statusCode: '',
        body: 'test',
        headers: {},
      };

      const result = transformFCResponse(fcResponse);

      expect(result.statusCode).toBe(200);
    });
  });

  describe('logApiGatewayRequest', () => {
    it('should log API gateway request in correct format', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const startTime = new Date('2025-12-18T10:00:00Z');
      const endTime = new Date('2025-12-18T10:00:02.500Z');

      logApiGatewayRequest('req-123', '/api/test', 200, startTime, endTime, '192.168.1.1');

      expect(consoleSpy).toHaveBeenCalled();
      const logMessage = consoleSpy.mock.calls[0][0];

      expect(logMessage).toContain('req-123');
      expect(logMessage).toContain('/api/test');
      expect(logMessage).toContain('200');
      expect(logMessage).toContain('2.5s');
      expect(logMessage).toContain('192.168.1.1');
      expect(logMessage).toContain('Sync Call');
      expect(logMessage).toContain('local-app');
      expect(logMessage).toContain('Development');

      consoleSpy.mockRestore();
    });

    it('should calculate duration correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const startTime = new Date('2025-12-18T10:00:00Z');
      const endTime = new Date('2025-12-18T10:00:01Z');

      logApiGatewayRequest('req', '/api', 200, startTime, endTime, '127.0.0.1');

      const logMessage = consoleSpy.mock.calls[0][0];
      expect(logMessage).toContain('1.0s');

      consoleSpy.mockRestore();
    });

    it('should format dates correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const startTime = new Date('2025-12-18T15:30:45Z');
      const endTime = new Date('2025-12-18T15:30:46Z');

      logApiGatewayRequest('req', '/api', 404, startTime, endTime, '10.0.0.1');

      const logMessage = consoleSpy.mock.calls[0][0];
      expect(logMessage).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
      expect(logMessage).toContain('404');

      consoleSpy.mockRestore();
    });
  });
});

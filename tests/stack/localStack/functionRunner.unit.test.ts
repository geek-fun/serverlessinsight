import { invokeFunction } from '../../../src/stack/localStack/functionRunner';
import { FunctionOptions } from '../../../src/types/localStack';
import path from 'path';
import fs from 'fs';

describe('FunctionRunner Unit Tests', () => {
  const tempDir = path.join(__dirname, '../../fixtures/temp-test-handlers');

  beforeAll(() => {
    // Create temp directory for test handlers
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('invokeFunction with callback-style handler', () => {
    it('should invoke callback-style handler successfully', async () => {
      const handlerCode = `
        exports.handler = function(event, context, callback) {
          callback(null, { statusCode: 200, body: 'success' });
        };
      `;

      const handlerPath = path.join(tempDir, 'callback-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'callback-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      const result = await invokeFunction(options, {}, { test: 'data' }, { requestId: '123' });

      expect(result).toEqual({ statusCode: 200, body: 'success' });
    });

    it('should handle callback errors', async () => {
      const handlerCode = `
        exports.handler = function(event, context, callback) {
          callback(new Error('Handler error'));
        };
      `;

      const handlerPath = path.join(tempDir, 'error-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'error-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      try {
        await invokeFunction(options, {}, {}, {});
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle synchronous errors in callback handler', async () => {
      const handlerCode = `
        exports.handler = function(event, context, callback) {
          throw new Error('Sync error in handler');
        };
      `;

      const handlerPath = path.join(tempDir, 'sync-error-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'sync-error-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      try {
        await invokeFunction(options, {}, {}, {});
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('invokeFunction with async handler', () => {
    it('should invoke async handler successfully', async () => {
      const handlerCode = `
        exports.handler = async function(event, context) {
          return { statusCode: 200, body: 'async success' };
        };
      `;

      const handlerPath = path.join(tempDir, 'async-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'async-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      const result = await invokeFunction(options, {}, { test: 'data' }, { requestId: '456' });

      expect(result).toEqual({ statusCode: 200, body: 'async success' });
    });

    it('should handle async handler rejections', async () => {
      const handlerCode = `
        exports.handler = async function(event, context) {
          throw new Error('Async handler error');
        };
      `;

      const handlerPath = path.join(tempDir, 'async-error-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'async-error-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      try {
        await invokeFunction(options, {}, {}, {});
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('invokeFunction with different event types', () => {
    it('should handle Buffer event (Aliyun FC format)', async () => {
      const handlerCode = `
        exports.handler = function(event, context, callback) {
          const data = JSON.parse(event.toString());
          callback(null, { received: data });
        };
      `;

      const handlerPath = path.join(tempDir, 'buffer-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'buffer-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      const event = Buffer.from(JSON.stringify({ message: 'hello' }));
      const result = await invokeFunction(options, {}, event, {});

      expect(result).toEqual({ received: { message: 'hello' } });
    });

    it('should handle object event (AWS Lambda format)', async () => {
      const handlerCode = `
        exports.handler = async function(event, context) {
          return { receivedEvent: event };
        };
      `;

      const handlerPath = path.join(tempDir, 'object-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'object-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      const event = { key: 'value', number: 123 };
      const result = await invokeFunction(options, {}, event, {});

      expect(result).toEqual({ receivedEvent: event });
    });
  });

  describe('invokeFunction error handling', () => {
    it('should handle missing handler file', async () => {
      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'non-existent.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      try {
        await invokeFunction(options, {}, {}, {});
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle missing handler method', async () => {
      const handlerCode = `
        exports.someOtherFunction = function() {
          return 'wrong function';
        };
      `;

      const handlerPath = path.join(tempDir, 'missing-method.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'missing-method.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      try {
        await invokeFunction(options, {}, {}, {});
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle non-function handler export', async () => {
      const handlerCode = `
        exports.handler = 'not a function';
      `;

      const handlerPath = path.join(tempDir, 'non-function.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'non-function.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      try {
        await invokeFunction(options, {}, {}, {});
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('invokeFunction with context', () => {
    it('should pass context to handler', async () => {
      const handlerCode = `
        exports.handler = async function(event, context) {
          return {
            requestId: context.requestId,
            functionName: context.functionName,
          };
        };
      `;

      const handlerPath = path.join(tempDir, 'context-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'context-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      const context = {
        requestId: 'req-789',
        functionName: 'test-function',
      };

      const result = await invokeFunction(options, {}, {}, context);

      expect(result).toEqual({
        requestId: 'req-789',
        functionName: 'test-function',
      });
    });

    it('should reconstruct Aliyun logger in context', async () => {
      const handlerCode = `
        exports.handler = function(event, context, callback) {
          // Test that logger is available
          if (context.logger && typeof context.logger.info === 'function') {
            context.logger.info('Test log');
            callback(null, { hasLogger: true });
          } else {
            callback(null, { hasLogger: false });
          }
        };
      `;

      const handlerPath = path.join(tempDir, 'logger-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'logger-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      // Serializable Aliyun context without logger
      const context = {
        requestId: 'req-aliyun',
        function: { name: 'test' },
        service: { name: 'svc' },
        tracing: {},
      };

      const result = await invokeFunction(options, {}, {}, context);

      expect(result).toEqual({ hasLogger: true });
    });
  });

  describe('invokeFunction with environment variables', () => {
    it('should set environment variables before invoking handler', async () => {
      const handlerCode = `
        exports.handler = async function(event, context) {
          return {
            customEnv: process.env.CUSTOM_VAR,
            anotherEnv: process.env.ANOTHER_VAR,
          };
        };
      `;

      const handlerPath = path.join(tempDir, 'env-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'env-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      const env = {
        CUSTOM_VAR: 'custom-value',
        ANOTHER_VAR: 'another-value',
      };

      const result = await invokeFunction(options, env, {}, {});

      expect(result).toEqual({
        customEnv: 'custom-value',
        anotherEnv: 'another-value',
      });
    });
  });

  describe('invokeFunction timeout handling', () => {
    it('should handle handler that completes before timeout', async () => {
      const handlerCode = `
        exports.handler = async function(event, context) {
          // Quick execution
          return { completed: true };
        };
      `;

      const handlerPath = path.join(tempDir, 'quick-handler.js');
      fs.writeFileSync(handlerPath, handlerCode);

      const options: FunctionOptions = {
        codeDir: tempDir,
        handler: 'quick-handler.handler',
        servicePath: '',
        timeout: 5000,
        functionKey: 'test-func',
      };

      const result = await invokeFunction(options, {}, {}, {});

      expect(result).toEqual({ completed: true });
    }, 10000);
  });
});

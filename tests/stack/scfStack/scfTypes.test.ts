import { functionToScfConfig, extractScfDefinition } from '../../../src/stack/scfStack/scfTypes';
import { FunctionDomain } from '../../../src/types';

describe('SCF Types', () => {
  describe('functionToScfConfig', () => {
    it('should convert FunctionDomain to ScfFunctionConfig', () => {
      const fn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        code: {
          runtime: 'nodejs18',
          handler: 'index.handler',
          path: 'test.zip',
        },
        memory: 512,
        timeout: 10,
        environment: {
          NODE_ENV: 'production',
          API_KEY: 'test123',
        },
        storage: {},
      };

      const config = functionToScfConfig(fn);

      expect(config.FunctionName).toBe('test-function');
      expect(config.Runtime).toBe('Nodejs18.15');
      expect(config.Handler).toBe('index.handler');
      expect(config.MemorySize).toBe(512);
      expect(config.Timeout).toBe(10);
      expect(config.Environment).toBeDefined();
      expect(config.Environment?.Variables).toHaveLength(2);
      expect(config.Environment?.Variables).toEqual(
        expect.arrayContaining([
          { Key: 'NODE_ENV', Value: 'production' },
          { Key: 'API_KEY', Value: 'test123' },
        ]),
      );
    });

    it('should handle function without environment variables', () => {
      const fn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        code: {
          runtime: 'nodejs18',
          handler: 'index.handler',
          path: 'test.zip',
        },
        memory: 256,
        timeout: 5,
        storage: {},
      };

      const config = functionToScfConfig(fn);

      expect(config).toEqual({
        FunctionName: 'test-function',
        Runtime: 'Nodejs18.15',
        Handler: 'index.handler',
        MemorySize: 256,
        Timeout: 5,
      });
    });

    it('should handle empty environment object', () => {
      const fn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        code: {
          runtime: 'nodejs18',
          handler: 'index.handler',
          path: 'test.zip',
        },
        memory: 256,
        timeout: 5,
        environment: {},
        storage: {},
      };

      const config = functionToScfConfig(fn);

      expect(config).toEqual({
        FunctionName: 'test-function',
        Runtime: 'Nodejs18.15',
        Handler: 'index.handler',
        MemorySize: 256,
        Timeout: 5,
      });
    });
  });

  describe('extractScfDefinition', () => {
    it('should extract definition from config with codeHash', () => {
      const config = {
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
      };

      const definition = extractScfDefinition(config, 'abc123');

      expect(definition).toEqual({
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environment: { NODE_ENV: 'production' },
        codeHash: 'abc123',
      });
    });

    it('should set environment to null when not provided', () => {
      const config = {
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
      };

      const definition = extractScfDefinition(config, 'abc123');

      expect(definition).toEqual({
        functionName: 'test-function',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environment: null,
        codeHash: 'abc123',
      });
    });

    it('should convert environment variables array to map', () => {
      const config = {
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [
            { Key: 'NODE_ENV', Value: 'production' },
            { Key: 'API_KEY', Value: 'test123' },
          ],
        },
      };

      const definition = extractScfDefinition(config, 'abc123');

      expect(definition.environment).toEqual({
        NODE_ENV: 'production',
        API_KEY: 'test123',
      });
    });
  });
});

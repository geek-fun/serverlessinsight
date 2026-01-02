import { computeConfigHash, functionToScfConfig } from '../../../src/stack/scfStack/scfTypes';
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

  describe('computeConfigHash', () => {
    it('should generate consistent hash for same config', () => {
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

      const hash1 = computeConfigHash(config);
      const hash2 = computeConfigHash(config);

      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(16);
    });

    it('should generate different hash for different configs', () => {
      const config1 = {
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
      };

      const config2 = {
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 1024, // Different memory size
        Timeout: 10,
      };

      const hash1 = computeConfigHash(config1);
      const hash2 = computeConfigHash(config2);

      expect(hash1).not.toBe(hash2);
    });

    it('should ignore FunctionName in hash computation', () => {
      const config1 = {
        FunctionName: 'test-function-1',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
      };

      const config2 = {
        FunctionName: 'test-function-2', // Different name
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
      };

      const hash1 = computeConfigHash(config1);
      const hash2 = computeConfigHash(config2);

      expect(hash1).toBe(hash2);
    });

    it('should consider environment variables in hash', () => {
      const config1 = {
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
      };

      const config2 = {
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'development' }], // Different value
        },
      };

      const hash1 = computeConfigHash(config1);
      const hash2 = computeConfigHash(config2);

      expect(hash1).not.toBe(hash2);
    });
  });
});

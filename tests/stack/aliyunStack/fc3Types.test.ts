import { functionToFc3Config, extractFc3Definition } from '../../../src/stack/aliyunStack/fc3Types';
import { FunctionDomain, FunctionGpuEnum } from '../../../src/types';

describe('FC3 Types', () => {
  describe('functionToFc3Config', () => {
    it('should convert FunctionDomain to Fc3FunctionConfig', () => {
      const fn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        code: {
          runtime: 'nodejs20',
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

      const config = functionToFc3Config(fn);

      expect(config.functionName).toBe('test-function');
      expect(config.runtime).toBe('nodejs20');
      expect(config.handler).toBe('index.handler');
      expect(config.memorySize).toBe(512);
      expect(config.timeout).toBe(10);
      expect(config.environmentVariables).toEqual({
        NODE_ENV: 'production',
        API_KEY: 'test123',
      });
    });

    it('should handle function without environment variables', () => {
      const fn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        code: {
          runtime: 'nodejs20',
          handler: 'index.handler',
          path: 'test.zip',
        },
        memory: 256,
        timeout: 5,
        storage: {},
      };

      const config = functionToFc3Config(fn);

      expect(config).toMatchObject({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 256,
        timeout: 5,
      });
      expect(config.environmentVariables).toBeUndefined();
    });

    it('should handle empty environment object', () => {
      const fn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        code: {
          runtime: 'nodejs20',
          handler: 'index.handler',
          path: 'test.zip',
        },
        memory: 256,
        timeout: 5,
        environment: {},
        storage: {},
      };

      const config = functionToFc3Config(fn);

      expect(config.environmentVariables).toBeUndefined();
    });

    it('should handle function with GPU config', () => {
      const fn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        code: {
          runtime: 'python3.10',
          handler: 'handler.main',
          path: 'test.zip',
        },
        memory: 512,
        timeout: 60,
        gpu: FunctionGpuEnum.TESLA_8,
        storage: {},
      };

      const config = functionToFc3Config(fn);

      expect(config.gpuConfig).toEqual({
        gpuMemorySize: 8192,
        gpuType: 'fc.gpu.tesla.1',
      });
    });

    it('should handle function with container config', () => {
      const fn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        container: {
          image: 'registry.example.com/my-image:latest',
          cmd: 'python app.py',
          port: 8080,
        },
        memory: 512,
        timeout: 60,
        storage: {},
      };

      const config = functionToFc3Config(fn);

      expect(config.runtime).toBe('custom-container');
      expect(config.handler).toBe('index.handler');
      expect(config.customContainerConfig).toEqual({
        image: 'registry.example.com/my-image:latest',
        command: ['python', 'app.py'],
        port: 8080,
      });
    });

    it('should handle function with VPC config', () => {
      const fn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        code: {
          runtime: 'nodejs20',
          handler: 'index.handler',
          path: 'test.zip',
        },
        memory: 512,
        timeout: 60,
        network: {
          vpc_id: 'vpc-12345',
          subnet_ids: ['vsw-123', 'vsw-456'],
          security_group: {
            name: 'sg-12345',
            ingress: [],
            egress: [],
          },
        },
        storage: {},
      };

      const config = functionToFc3Config(fn);

      expect(config.vpcConfig).toEqual({
        vpcId: 'vpc-12345',
        vSwitchIds: ['vsw-123', 'vsw-456'],
        securityGroupId: 'sg-12345',
      });
    });
  });

  describe('extractFc3Definition', () => {
    it('should extract definition from config with codeHash', () => {
      const config = {
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environmentVariables: { NODE_ENV: 'production' },
      };

      const definition = extractFc3Definition(config, 'abc123');

      expect(definition).toEqual({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        diskSize: null,
        environment: { NODE_ENV: 'production' },
        vpcConfig: null,
        gpuConfig: null,
        customContainerConfig: null,
        codeHash: 'abc123',
      });
    });

    it('should set environment to empty object when not provided', () => {
      const config = {
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
      };

      const definition = extractFc3Definition(config, 'abc123');

      expect(definition.environment).toEqual({});
    });

    it('should include GPU config when provided', () => {
      const config = {
        functionName: 'test-function',
        runtime: 'python3.10',
        handler: 'handler.main',
        memorySize: 512,
        timeout: 60,
        gpuConfig: {
          gpuMemorySize: 8192,
          gpuType: 'fc.gpu.tesla.1',
        },
      };

      const definition = extractFc3Definition(config, 'abc123');

      expect(definition.gpuConfig).toEqual({
        gpuMemorySize: 8192,
        gpuType: 'fc.gpu.tesla.1',
      });
    });
  });
});

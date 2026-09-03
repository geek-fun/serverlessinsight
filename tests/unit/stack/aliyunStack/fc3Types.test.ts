import {
  functionToFc3Config,
  extractFc3Definition,
  extractFunctionDomainDefinition,
  cloudFc3ToDefinition,
} from '../../../../src/stack/aliyunStack/fc3Types';
import type { Fc3FunctionInfo } from '../../../../src/stack/aliyunStack/fc3Types';
import { remoteDiffersFromDesired } from '../../../../src/common/planCompare';
import { FunctionDomain, FunctionGpuEnum, NasStorageClassEnum } from '../../../../src/types';

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
        nasConfig: null,
        logConfig: null,
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

  describe('cloudFc3ToDefinition', () => {
    it('should map a full cloud Fc3FunctionInfo to the definition shape', () => {
      const info: Fc3FunctionInfo = {
        functionName: 'my-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
        diskSize: 1024,
        environmentVariables: { NODE_ENV: 'production', LOG_LEVEL: 'info' },
        vpcConfig: {
          vpcId: 'vpc-abc',
          vSwitchIds: ['vsw-1', 'vsw-2'],
          securityGroupId: 'sg-xyz',
          role: 'acs:ram::123456789:role/extra-vpc-role',
        },
        gpuConfig: { gpuMemorySize: 8192, gpuType: 'fc.gpu.tesla.1' },
        customContainerConfig: {
          image: 'registry.example.com/app:latest',
          entrypoint: ['/bin/sh'],
          command: ['-c', 'start'],
          port: 8080,
          accelerationType: 'Default',
          acrInstanceId: 'cri-12345',
        },
        nasConfig: {
          userId: 10003,
          groupId: 10003,
          mountPoints: [
            {
              serverAddr: '0123456789-abc.cn-hangzhou.nas.aliyuncs.com:/data',
              mountDir: '/mnt/data',
              enableTls: false,
            },
          ],
        },
        logConfig: {
          project: 'my-project',
          logstore: 'my-logstore',
          enableRequestMetrics: true,
          enableInstanceMetrics: false,
          logBeginRule: 'DefaultRegex',
        },
      };

      expect(cloudFc3ToDefinition(info)).toEqual({
        functionName: 'my-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
        diskSize: 1024,
        environment: { NODE_ENV: 'production', LOG_LEVEL: 'info' },
        vpcConfig: { vpcId: 'vpc-abc', vSwitchIds: ['vsw-1', 'vsw-2'], securityGroupId: 'sg-xyz' },
        gpuConfig: { gpuMemorySize: 8192, gpuType: 'fc.gpu.tesla.1' },
        customContainerConfig: {
          image: 'registry.example.com/app:latest',
          port: 8080,
          command: ['-c', 'start'],
        },
        nasConfig: {
          userId: 10003,
          groupId: 10003,
          mountPoints: [
            {
              serverAddr: '0123456789-abc.cn-hangzhou.nas.aliyuncs.com:/data',
              mountDir: '/mnt/data',
              enableTls: false,
            },
          ],
        },
        logConfig: { enableRequestMetrics: true, enableInstanceMetrics: false },
      });
    });

    it('never emits executor-unmanaged container keys (entrypoint, accelerationType)', () => {
      const info: Fc3FunctionInfo = {
        functionName: 'container-fn',
        runtime: 'custom-container',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 60,
        customContainerConfig: {
          image: 'registry.example.com/app:latest',
          entrypoint: ['/bin/sh'],
          port: 8080,
          accelerationType: 'Default',
        },
      };

      const attrs = cloudFc3ToDefinition(info);

      expect(attrs.customContainerConfig).toEqual({
        image: 'registry.example.com/app:latest',
        port: 8080,
      });
      expect(attrs.customContainerConfig).not.toHaveProperty('entrypoint');
      expect(attrs.customContainerConfig).not.toHaveProperty('accelerationType');
    });

    it('omits container command when the cloud does not report it', () => {
      const info: Fc3FunctionInfo = {
        functionName: 'container-fn',
        runtime: 'custom-container',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 60,
        customContainerConfig: {
          image: 'registry.example.com/app:latest',
          port: 8080,
        },
      };

      expect(cloudFc3ToDefinition(info).customContainerConfig).toEqual({
        image: 'registry.example.com/app:latest',
        port: 8080,
      });
    });

    it('should map a minimal info to nulls and empties for the rest', () => {
      const info: Fc3FunctionInfo = { functionName: 'minimal-function', memorySize: 128 };

      expect(cloudFc3ToDefinition(info)).toEqual({
        functionName: 'minimal-function',
        runtime: null,
        handler: null,
        memorySize: 128,
        timeout: null,
        diskSize: null,
        environment: {},
        vpcConfig: null,
        gpuConfig: null,
        customContainerConfig: null,
        nasConfig: null,
        logConfig: null,
      });
    });

    it('should keep logConfig null when the cloud response has none', () => {
      const info: Fc3FunctionInfo = {
        functionName: 'no-log-function',
        runtime: 'python3.10',
        handler: 'handler.main',
        memorySize: 256,
        timeout: 10,
      };

      const result = cloudFc3ToDefinition(info);

      expect(result.logConfig).toBeNull();
      expect(result).toEqual({
        functionName: 'no-log-function',
        runtime: 'python3.10',
        handler: 'handler.main',
        memorySize: 256,
        timeout: 10,
        diskSize: null,
        environment: {},
        vpcConfig: null,
        gpuConfig: null,
        customContainerConfig: null,
        nasConfig: null,
        logConfig: null,
      });
    });

    it('should never emit codeHash, role, iam, or description keys', () => {
      const info: Fc3FunctionInfo = {
        functionName: 'roleful-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 30,
        role: 'acs:ram::123456789:role/my-execution-role',
        description: 'deployed by si',
        codeChecksum: 'deadbeef',
      };

      const result = cloudFc3ToDefinition(info);

      expect(result).not.toHaveProperty('codeHash');
      expect(result).not.toHaveProperty('role');
      expect(result).not.toHaveProperty('iam');
      expect(result).not.toHaveProperty('description');
      expect(Object.keys(result).sort()).toEqual(
        [
          'customContainerConfig',
          'diskSize',
          'environment',
          'functionName',
          'gpuConfig',
          'handler',
          'logConfig',
          'memorySize',
          'nasConfig',
          'runtime',
          'timeout',
          'vpcConfig',
        ].sort(),
      );
    });
  });

  describe('cloudFc3ToDefinition roundtrip vs desired definition (issue #234)', () => {
    // functionToFc3Config field names align with Fc3FunctionInfo, so its output
    // is a faithful "cloud as the executor wrote it" simulation. This guard
    // keeps cloudFc3ToDefinition and functionToFc3Config shape-compatible.
    const expectNoRoundtripDrift = (fn: FunctionDomain): void => {
      const desired = extractFunctionDomainDefinition(fn, 'abc123');
      const cloudInfo = functionToFc3Config(fn) as unknown as Fc3FunctionInfo;

      expect(remoteDiffersFromDesired(cloudFc3ToDefinition(cloudInfo), desired)).toBe(false);
    };

    it('plain code function', () => {
      expectNoRoundtripDrift({
        key: 'test_fn',
        name: 'code-fn',
        code: { runtime: 'nodejs20', handler: 'index.handler', path: 'test.zip' },
        memory: 512,
        timeout: 10,
        environment: { NODE_ENV: 'production' },
        storage: {},
      });
    });

    it('code function with vpc, gpu, nas and log config', () => {
      expectNoRoundtripDrift({
        key: 'test_fn',
        name: 'full-fn',
        code: { runtime: 'nodejs20', handler: 'index.handler', path: 'test.zip' },
        memory: 512,
        timeout: 10,
        environment: { NODE_ENV: 'production' },
        gpu: FunctionGpuEnum.TESLA_8,
        network: {
          vpc_id: 'vpc-12345',
          subnet_ids: ['vsw-123', 'vsw-456'],
          security_group: { name: 'sg-12345', ingress: [], egress: [] },
        },
        storage: {
          nas: [
            {
              storage_class: NasStorageClassEnum.STANDARD_CAPACITY,
              mount_path: '/mnt/data',
            },
          ],
        },
        log: true,
      });
    });

    it('container function with cmd declared', () => {
      expectNoRoundtripDrift({
        key: 'test_fn',
        name: 'container-fn',
        container: {
          image: 'registry.example.com/app:latest',
          cmd: 'python app.py',
          port: 8080,
        },
        memory: 512,
        timeout: 60,
        storage: {},
      });
    });

    it('container function without cmd declared', () => {
      expectNoRoundtripDrift({
        key: 'test_fn',
        name: 'container-no-cmd-fn',
        container: {
          image: 'registry.example.com/app:latest',
          port: 8080,
        },
        memory: 512,
        timeout: 60,
        storage: {},
      });
    });

    it('function without environment declared (desired env {} vs cloud env {}) stays noop', () => {
      expectNoRoundtripDrift({
        key: 'test_fn',
        name: 'envless-fn',
        code: { runtime: 'nodejs20', handler: 'index.handler', path: 'test.zip' },
        memory: 128,
        timeout: 60,
        storage: {},
      });
    });
  });
});

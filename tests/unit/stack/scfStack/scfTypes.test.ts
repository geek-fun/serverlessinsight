import {
  functionToScfConfig,
  extractFunctionDomainDefinition,
  extractScfDefinition,
} from '../../../../src/stack/scfStack/scfTypes';
import { FunctionDomain, FunctionGpuEnum, NasStorageClassEnum } from '../../../../src/types';

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

    it('should map network, storage, GPU, container, and role options', () => {
      const fn: FunctionDomain = {
        key: 'full_fn',
        name: 'full-function',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: 'test.zip' },
        network: {
          vpc_id: 'vpc-123',
          subnet_ids: ['subnet-456'],
          security_group: { name: 'sg-123', ingress: [], egress: [] },
        },
        storage: {
          disk: 512,
          nas: [{ mount_path: '/mnt/data', storage_class: NasStorageClassEnum.STANDARD_CAPACITY }],
        },
        gpu: FunctionGpuEnum.TESLA_8,
        container: { image: 'registry.example.com/image:latest', port: 8080 },
      };

      const config = functionToScfConfig(fn, 'role-123');

      expect(config).toMatchObject({
        Role: 'role-123',
        VpcConfig: { VpcId: 'vpc-123', SubnetId: 'subnet-456' },
        DiskSize: 512,
        CfsConfig: { CfsInsList: [{ LocalMountDir: '/mnt/data', RemoteMountDir: '/' }] },
        UseGpu: 'TRUE',
        ImageConfig: { ImageUri: 'registry.example.com/image:latest' },
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
        vpcConfig: null,
        diskSize: null,
        cfsConfig: null,
        useGpu: null,
        imageConfig: null,
      });
    });

    it('should set environment to empty object when not provided', () => {
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
        environment: {},
        codeHash: 'abc123',
        vpcConfig: null,
        diskSize: null,
        cfsConfig: null,
        useGpu: null,
        imageConfig: null,
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

    it('should include IAM when extracting a function domain definition', () => {
      const fn: FunctionDomain = {
        key: 'iam_fn',
        name: 'iam-function',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: 'test.zip' },
        iam: { role: 'role-123' },
        storage: {},
      };

      const definition = extractFunctionDomainDefinition(fn, 'hash-123');

      expect(definition).toEqual(
        expect.objectContaining({
          functionName: 'iam-function',
          codeHash: 'hash-123',
          iam: { role: 'role-123' },
        }),
      );
    });
  });
});

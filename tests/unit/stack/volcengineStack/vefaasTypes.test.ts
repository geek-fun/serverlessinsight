import {
  getTrustedServicesForFunction,
  functionToVefaasConfig,
  extractVefaasDefinition,
  buildDefaultTrustPolicy,
  deriveVefaasExecutionStatements,
} from '../../../../src/stack/volcengineStack/vefaasTypes';
import type { FunctionDomain } from '../../../../src/types';
import { NasStorageClassEnum } from '../../../../src/types';

describe('vefaasTypes', () => {
  const mockFn: FunctionDomain = {
    key: 'test_fn',
    name: 'test-function',
    code: {
      path: '/test/code.zip',
      handler: 'index.handler',
      runtime: 'nodejs16',
    },
    memory: 256,
    timeout: 30,
    storage: {},
  };

  describe('getTrustedServicesForFunction', () => {
    it('should return only vefaas service when context has no iac', () => {
      const context = {};

      const result = getTrustedServicesForFunction(mockFn, context as never);

      expect(result).toEqual(['vefaas']);
    });

    it('should return only vefaas service when context iac has no events', () => {
      const context = { iac: {} };

      const result = getTrustedServicesForFunction(mockFn, context as never);

      expect(result).toEqual(['vefaas']);
    });

    it('should include apigateway service when a trigger backend matches', () => {
      const context = {
        iac: {
          events: [
            {
              triggers: [{ backend: '${functions.test_fn}' }],
            },
          ],
        },
      };

      const result = getTrustedServicesForFunction(mockFn, context as never);

      expect(result).toEqual(['vefaas', 'apigateway']);
    });

    it('should return only vefaas when no trigger backend matches', () => {
      const context = {
        iac: {
          events: [
            {
              triggers: [{ backend: '${functions.other_fn}' }],
            },
          ],
        },
      };

      const result = getTrustedServicesForFunction(mockFn, context as never);

      expect(result).toEqual(['vefaas']);
    });

    it('should include apigateway when a bare backend equals the function deployed name (issue #227)', () => {
      const context = {
        iac: {
          events: [
            {
              triggers: [{ backend: 'test-function' }],
            },
          ],
        },
      };

      const result = getTrustedServicesForFunction(mockFn, context as never);

      expect(result).toEqual(['vefaas', 'apigateway']);
    });

    it('should include apigateway for an external bare backend that matches no template function (issue #227)', () => {
      const context = {
        iac: {
          functions: [{ key: 'other_fn', name: 'other-function' }],
          events: [
            {
              triggers: [{ backend: 'external-deployed-fn' }],
            },
          ],
        },
      };

      const result = getTrustedServicesForFunction(mockFn, context as never);

      expect(result).toEqual(['vefaas', 'apigateway']);
    });

    it('should not treat a bare value matching another template function key as this function trigger', () => {
      const context = {
        iac: {
          functions: [{ key: 'other_fn', name: 'other-function' }],
          events: [
            {
              triggers: [{ backend: 'other_fn' }],
            },
          ],
        },
      };

      const result = getTrustedServicesForFunction(mockFn, context as never);

      expect(result).toEqual(['vefaas']);
    });
  });

  describe('functionToVefaasConfig', () => {
    it('should convert function domain to vefaas config with minimal options', () => {
      const result = functionToVefaasConfig(mockFn);

      expect(result.functionName).toBe('test-function');
      expect(result.runtime).toBe('nodejs16');
      expect(result.handler).toBe('index.handler');
      expect(result.memoryMb).toBe(256);
      expect(result.requestTimeout).toBe(30);
    });

    it('should include role when provided', () => {
      const result = functionToVefaasConfig(mockFn, { role: 'test-role' });

      expect(result.role).toBe('test-role');
    });

    it('should include vpcConfig when provided', () => {
      const vpcConfig = {
        vpcId: 'vpc-123',
        subnetIds: ['subnet-1'],
        securityGroupIds: ['sg-1'],
      };
      const result = functionToVefaasConfig(mockFn, { vpcConfig });

      expect(result.vpcConfig).toEqual(vpcConfig);
    });

    it('should not include tosMountConfig when not provided', () => {
      const result = functionToVefaasConfig(mockFn, { role: 'test-role' });

      expect(result.tosMountConfig).toBeUndefined();
    });

    it('should include tosMountConfig when provided', () => {
      const tosMountConfig = { bucketName: 'test-bucket', mountPath: '/mnt' };
      const result = functionToVefaasConfig(mockFn, { tosMountConfig });

      expect(result.tosMountConfig).toEqual(tosMountConfig);
    });

    it('should include logConfig when provided', () => {
      const logConfig = { project: 'test-project', topic: 'test-topic' };
      const result = functionToVefaasConfig(mockFn, { logConfig });

      expect(result.logConfig).toEqual(logConfig);
    });

    it('should use defaults when memory and timeout not set', () => {
      const fnWithoutDefaults: FunctionDomain = {
        ...mockFn,
        memory: undefined,
        timeout: undefined,
      };
      const result = functionToVefaasConfig(fnWithoutDefaults);

      expect(result.memoryMb).toBe(512);
      expect(result.requestTimeout).toBe(60);
    });
  });

  describe('extractVefaasDefinition', () => {
    it('should extract definition from config', () => {
      const config = {
        functionName: 'test-fn',
        runtime: 'nodejs16' as never,
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
        environmentVariables: { KEY: 'value' },
      };

      const result = extractVefaasDefinition(config, 'hash-abc');

      expect(result.functionName).toBe('test-fn');
      expect(result.codeHash).toBe('hash-abc');
      expect(result.environment).toEqual({ KEY: 'value' });
    });

    it('should use empty object for environment when not set', () => {
      const config = {
        functionName: 'test-fn',
        runtime: 'nodejs16' as never,
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      };

      const result = extractVefaasDefinition(config, 'hash-abc');

      expect(result.environment).toEqual({});
    });
  });

  describe('buildDefaultTrustPolicy', () => {
    it('should build trust policy for given services', () => {
      const services = ['vefaas'];
      const result = buildDefaultTrustPolicy(services);

      expect(result.Statement[0].Effect).toBe('Allow');
      expect(result.Statement[0].Principal.Service).toEqual(services);
      expect(result.Statement[0].Action).toContain('sts:AssumeRole');
    });
  });

  describe('deriveVefaasExecutionStatements', () => {
    const context = {} as never;

    it('returns only vefaas and tls baseline for a bare function', () => {
      const result = deriveVefaasExecutionStatements(mockFn, context);

      expect(result).toEqual([
        { effect: 'Allow', action: ['vefaas:*'], resource: ['*'] },
        {
          effect: 'Allow',
          action: ['tls:CreateProject', 'tls:CreateTopic', 'tls:PutLogs'],
          resource: ['*'],
        },
      ]);
    });

    it('adds vpc describe statements when network is configured', () => {
      const fnWithNetwork: FunctionDomain = {
        ...mockFn,
        network: {
          vpc_id: 'vpc-123',
          subnet_ids: ['subnet-1'],
          security_group: { name: 'sg-1', ingress: [], egress: [] },
        },
      };

      const result = deriveVefaasExecutionStatements(fnWithNetwork, context);

      expect(result).toHaveLength(3);
      expect(result).toEqual(
        expect.arrayContaining([
          {
            effect: 'Allow',
            action: ['vpc:DescribeVpcs', 'vpc:DescribeSubnets', 'vpc:DescribeSecurityGroups'],
            resource: ['*'],
          },
        ]),
      );
    });

    it('adds tos object statements when a TOS mount is configured', () => {
      const fnWithTos: FunctionDomain = {
        ...mockFn,
        storage: {
          nas: [
            { mount_path: '/mnt/tos', storage_class: NasStorageClassEnum.STANDARD_PERFORMANCE },
          ],
        },
      };

      const result = deriveVefaasExecutionStatements(fnWithTos, context);

      expect(result).toHaveLength(3);
      expect(result).toEqual(
        expect.arrayContaining([
          {
            effect: 'Allow',
            action: ['tos:GetObject', 'tos:PutObject', 'tos:DeleteObject', 'tos:ListBucket'],
            resource: ['*'],
          },
        ]),
      );
    });

    it('includes vpc and tos statements when both are configured', () => {
      const fnWithBoth: FunctionDomain = {
        ...mockFn,
        network: {
          vpc_id: 'vpc-123',
          subnet_ids: ['subnet-1'],
          security_group: { name: 'sg-1', ingress: [], egress: [] },
        },
        storage: {
          nas: [
            { mount_path: '/mnt/tos', storage_class: NasStorageClassEnum.STANDARD_PERFORMANCE },
          ],
        },
      };

      const result = deriveVefaasExecutionStatements(fnWithBoth, context);

      expect(result).toHaveLength(4);
      expect(result.map((s) => s.action[0])).toEqual([
        'vefaas:*',
        'tls:CreateProject',
        'vpc:DescribeVpcs',
        'tos:GetObject',
      ]);
    });

    it('does not include custom iam statements in the derived baseline', () => {
      const fnWithIam: FunctionDomain = {
        ...mockFn,
        iam: {
          role: {
            statements: [{ effect: 'Allow', action: ['ecs:DescribeInstances'], resource: ['*'] }],
          },
        },
      };

      const result = deriveVefaasExecutionStatements(fnWithIam, context);

      expect(result).toHaveLength(2);
    });
  });
});

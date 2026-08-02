import { parseFunction } from '../../../src/parser/functionParser';
import { NasStorageClassEnum } from '../../../src/types';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('parseFunction', () => {
  it('should return undefined when functions is undefined', () => {
    expect(parseFunction(undefined)).toBeUndefined();
  });

  it('should return undefined when functions is empty object', () => {
    expect(parseFunction({})).toBeUndefined();
  });

  it('should parse function with code', () => {
    const result = parseFunction({
      my_fn: {
        name: 'test-fn',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
        memory: 512,
        timeout: 10,
      },
    });

    expect(result).toHaveLength(1);
    expect(result![0]).toMatchObject({
      key: 'my_fn',
      name: 'test-fn',
      code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
      container: undefined,
      memory: 512,
      timeout: 10,
      storage: { disk: undefined, nas: undefined },
    });
  });

  it('should parse function with container instead of code', () => {
    const result = parseFunction({
      container_fn: {
        name: 'container-fn',
        container: { image: 'registry.example.com/app:latest', cmd: '/start', port: 8080 },
        memory: 1024,
        timeout: 30,
      },
    });

    expect(result).toHaveLength(1);
    expect(result![0]).toMatchObject({
      key: 'container_fn',
      name: 'container-fn',
      code: undefined,
      container: { image: 'registry.example.com/app:latest', cmd: '/start', port: 8080 },
    });
  });

  it('should parse container with default port when port is missing', () => {
    const result = parseFunction({
      fn: {
        name: 'fn',
        container: { image: 'img:latest', port: undefined as unknown as number },
      },
    });

    expect(result![0].container!.port).toBe(0);
  });

  it('should parse function without code or container', () => {
    const result = parseFunction({
      fn: { name: 'bare-fn' },
    });

    expect(result![0].code).toBeUndefined();
    expect(result![0].container).toBeUndefined();
  });

  it('should parse function with storage.nas', () => {
    const result = parseFunction({
      fn: {
        name: 'nas-fn',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
        storage: {
          disk: 512,
          nas: [
            { mount_path: '/mnt/data', storage_class: 'STANDARD_PERFORMANCE' },
            { mount_path: '/mnt/logs', storage_class: 'EXTREME_STANDARD' },
          ],
        },
      },
    });

    expect(result![0].storage).toEqual({
      disk: 512,
      nas: [
        { mount_path: '/mnt/data', storage_class: NasStorageClassEnum.STANDARD_PERFORMANCE },
        { mount_path: '/mnt/logs', storage_class: NasStorageClassEnum.EXTREME_STANDARD },
      ],
    });
  });

  it('should parse function with storage.disk but no nas', () => {
    const result = parseFunction({
      fn: {
        name: 'disk-fn',
        storage: { disk: 1024 },
      },
    });

    expect(result![0].storage).toEqual({ disk: 1024, nas: undefined });
  });

  it('should parse function without storage field', () => {
    const result = parseFunction({
      fn: { name: 'no-storage-fn' },
    });

    expect(result![0].storage).toEqual({ disk: undefined, nas: undefined });
  });

  it('should parse gpu, log, environment, and network fields', () => {
    const result = parseFunction({
      fn: {
        name: 'full-fn',
        code: { runtime: 'python3.10', handler: 'main.handler', path: './app' },
        memory: 2048,
        gpu: 'TESLA_8',
        timeout: 60,
        log: true,
        environment: { NODE_ENV: 'production', API_KEY: 'secret' },
        network: {
          vpc_id: 'vpc-123',
          subnet_ids: ['subnet-a', 'subnet-b'],
          security_group: { name: 'sg-test', ingress: ['80/tcp'], egress: ['all'] },
        },
      },
    });

    expect(result![0].gpu).toBe('TESLA_8');
    expect(result![0].log).toBe(true);
    expect(result![0].environment).toEqual({ NODE_ENV: 'production', API_KEY: 'secret' });
    expect(result![0].network).toEqual({
      vpc_id: 'vpc-123',
      subnet_ids: ['subnet-a', 'subnet-b'],
      security_group: { name: 'sg-test', ingress: ['80/tcp'], egress: ['all'] },
    });
  });

  it('should parse function with iam role and statements', () => {
    const result = parseFunction({
      fn: {
        name: 'iam-fn',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
        iam: {
          role: {
            statements: [
              {
                effect: 'Allow' as const,
                action: ['log:PostLogStoreLogs'],
                resource: ['acs:log:*:*:project/*/logstore/*'],
              },
              {
                sid: 'DenySpecific',
                effect: 'Deny' as const,
                action: ['oss:DeleteBucket'],
                resource: ['acs:oss:*:*:my-bucket'],
              },
            ],
          },
        },
      },
    });

    expect(result).toHaveLength(1);
    expect(result![0].iam).toEqual({
      role: {
        statements: [
          {
            sid: undefined,
            effect: 'Allow',
            action: ['log:PostLogStoreLogs'],
            resource: ['acs:log:*:*:project/*/logstore/*'],
          },
          {
            sid: 'DenySpecific',
            effect: 'Deny',
            action: ['oss:DeleteBucket'],
            resource: ['acs:oss:*:*:my-bucket'],
          },
        ],
      },
    });
  });

  it('should parse iam.role as a string (external role)', () => {
    const result = parseFunction({
      fn: {
        name: 'external-role-fn',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
        iam: { role: 'acs:ram::123456789012:role/external-role' },
      },
    });

    expect(result![0].iam).toEqual({ role: 'acs:ram::123456789012:role/external-role' });
  });

  it('should parse iam.role object with name and managed_policies', () => {
    const result = parseFunction({
      fn: {
        name: 'role-fn',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
        iam: {
          role: {
            name: 'custom-role',
            managed_policies: ['AliyunOSSFullAccess', 'AliyunLogFullAccess'],
          },
        },
      },
    });

    expect(result![0].iam).toEqual({
      role: {
        name: 'custom-role',
        managed_policies: ['AliyunOSSFullAccess', 'AliyunLogFullAccess'],
      },
    });
  });

  it('should parse iam.role object without name or managed_policies', () => {
    const result = parseFunction({
      fn: {
        name: 'minimal-role-fn',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
        iam: { role: {} },
      },
    });

    expect(result![0].iam).toEqual({ role: {} });
  });

  it('should parse statements with single string action and resource', () => {
    const result = parseFunction({
      fn: {
        name: 'single-statement-fn',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
        iam: {
          role: {
            statements: [
              {
                effect: 'Allow' as const,
                action: 'log:PostLogStoreLogs',
                resource: 'acs:log:*:*:project/*/logstore/*',
              },
            ],
          },
        },
      },
    });

    expect(result![0].iam).toEqual({
      role: {
        statements: [
          {
            sid: undefined,
            effect: 'Allow',
            action: ['log:PostLogStoreLogs'],
            resource: ['acs:log:*:*:project/*/logstore/*'],
          },
        ],
      },
    });
  });

  it('should parse iam object without role', () => {
    const result = parseFunction({
      fn: {
        name: 'no-role-fn',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
        iam: {},
      },
    });

    expect(result![0].iam).toEqual({ role: undefined });
  });

  it('should parse function without iam statements', () => {
    const result = parseFunction({
      fn: {
        name: 'no-iam-fn',
        code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
      },
    });

    expect(result![0].iam).toBeUndefined();
  });

  it('should parse multiple functions', () => {
    const result = parseFunction({
      fn_a: { name: 'fn-a', code: { runtime: 'nodejs18', handler: 'a.handler', path: './a' } },
      fn_b: { name: 'fn-b', code: { runtime: 'python3.10', handler: 'b.handler', path: './b' } },
    });

    expect(result).toHaveLength(2);
    expect(result![0].key).toBe('fn_a');
    expect(result![1].key).toBe('fn_b');
  });

  it('should parse log as false', () => {
    const result = parseFunction({
      fn: { name: 'fn', log: false },
    });

    expect(result![0].log).toBe(false);
  });

  it('should parse string-typed numeric fields', () => {
    const result = parseFunction({
      fn: {
        name: 'fn',
        memory: '256' as unknown as number,
        timeout: '30' as unknown as number,
      },
    });

    expect(result![0].memory).toBe(256);
    expect(result![0].timeout).toBe(30);
  });

  describe('triggers.http', () => {
    it('should parse triggers.http with public auth_type', () => {
      const result = parseFunction({
        fn: {
          name: 'http-fn',
          code: { runtime: 'nodejs18', handler: 'index.handler', path: './src' },
          triggers: { http: { auth_type: 'public' as const } },
        },
      });

      expect(result![0].triggers).toEqual({ http: { auth_type: 'public', access: undefined } });
    });

    it('should parse triggers.http with iam auth_type', () => {
      const result = parseFunction({
        fn: {
          name: 'http-fn',
          triggers: { http: { auth_type: 'iam' as const } },
        },
      });

      expect(result![0].triggers?.http?.auth_type).toBe('iam');
    });

    it('should parse triggers.http with access array', () => {
      const result = parseFunction({
        fn: {
          name: 'http-fn',
          triggers: {
            http: {
              auth_type: 'public' as const,
              access: ['public' as const, 'internal' as const],
            },
          },
        },
      });

      expect(result![0].triggers?.http?.access).toEqual(['public', 'internal']);
    });

    it('should throw when auth_type is missing', () => {
      expect(() =>
        parseFunction({
          fn: {
            name: 'http-fn',
            triggers: { http: { auth_type: undefined as unknown as 'public' | 'iam' } },
          },
        }),
      ).toThrow('HTTP_TRIGGER_AUTH_TYPE_REQUIRED');
    });

    it('should throw on invalid auth_type', () => {
      expect(() =>
        parseFunction({
          fn: {
            name: 'http-fn',
            triggers: { http: { auth_type: 'invalid' as 'public' | 'iam' } },
          },
        }),
      ).toThrow('INVALID_HTTP_TRIGGER_AUTH_TYPE');
    });

    it('should not include triggers key when no http trigger is set', () => {
      const result = parseFunction({
        fn: { name: 'no-trigger-fn' },
      });

      expect(result![0]).not.toHaveProperty('triggers');
    });
  });

  describe('domain', () => {
    it('should parse domain with domain_name only', () => {
      const result = parseFunction({
        fn: {
          name: 'domain-fn',
          domain: { domain_name: 'api.example.com' },
        },
      });

      expect(result![0].domain).toEqual({
        domain_name: 'api.example.com',
        certificate_id: undefined,
        protocol: 'HTTPS',
      });
    });

    it('should parse domain with certificate_id and protocol', () => {
      const result = parseFunction({
        fn: {
          name: 'domain-fn',
          domain: { domain_name: 'api.example.com', certificate_id: 'cert-123', protocol: 'HTTP' },
        },
      });

      expect(result![0].domain).toEqual({
        domain_name: 'api.example.com',
        certificate_id: 'cert-123',
        protocol: 'HTTP',
      });
    });

    it('should not include domain key when no domain is set', () => {
      const result = parseFunction({
        fn: { name: 'no-domain-fn' },
      });

      expect(result![0]).not.toHaveProperty('domain');
    });
  });
});

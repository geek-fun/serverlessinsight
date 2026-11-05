jest.mock('node:fs', () => ({ existsSync: jest.fn(() => true), readFileSync: jest.fn() }));
jest.mock('../../../src/common', () => ({
  ...jest.requireActual('../../../src/common/iacHelper'),
  ...jest.requireActual('../../../src/common/runtimeMapper'),
  ...jest.requireActual('../../../src/common/logger'),
}));
jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

import { readFileSync } from 'node:fs';
import { stringify } from 'yaml';

import { revalYaml } from '../../../src/parser';
import { IacSchemaErrors } from '../../../src/validator';
import { ProviderEnum } from '../../../src/common/providerEnum';
import type { Context } from '../../../src/types';

const context: Context = {
  app: 'ignored-app',
  service: 'ignored-service',
  provider: ProviderEnum.TENCENT,
  region: 'ap-shanghai',
  stage: 'prod',
  accessKeyId: '',
  accessKeySecret: '',
  iacLocation: '/config.yml',
};
const template = {
  app: 'shop',
  service: 'api',
  version: '0.0.1',
  provider: { name: 'aliyun', region: 'cn-hangzhou' },
};

describe('effective deployment validation', () => {
  it.each(['12345678', '00123456', '123456789012345678901234567890'])(
    'preserves the exact certificate ID %s after stage interpolation',
    (certificateId) => {
      jest.mocked(readFileSync).mockReturnValue(
        stringify({
          ...template,
          stages: { prod: { certificate_id: certificateId } },
          events: {
            gateway: {
              name: 'example-gateway',
              type: 'API_GATEWAY',
              triggers: [],
              domain: {
                domain_name: 'api.example.com',
                certificate_id: '${stages.certificate_id}',
                protocol: 'HTTPS',
              },
            },
          },
        }),
      );
      const result = revalYaml('/config.yml', {
        ...context,
        provider: ProviderEnum.ALIYUN,
        region: 'cn-hangzhou',
        stages: { prod: { certificate_id: certificateId } },
      });
      expect(result.events?.[0].domain?.certificate_id).toBe(certificateId);
    },
  );

  it('preserves string and secret values while inferring numeric and boolean fields', () => {
    jest.mocked(readFileSync).mockReturnValue(
      stringify({
        ...template,
        vars: { token: '00012345678901234567890', flag: 'false', size: '512' },
        functions: {
          handler: {
            name: '${vars.token}',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
            memory: '${vars.size}',
            timeout: '${vars.size}',
            log: '${vars.flag}',
            environment: { TOKEN: '${vars.token}', FLAG: '${vars.flag}' },
            domain: { domain_name: 'api.example.com', certificate_id: '${vars.token}' },
          },
        },
      }),
    );
    const result = revalYaml('/config.yml', {
      ...context,
      provider: ProviderEnum.ALIYUN,
      region: 'cn-hangzhou',
    });
    expect(result.functions?.[0]).toMatchObject({
      name: '00012345678901234567890',
      memory: 512,
      timeout: 512,
      log: false,
      environment: { TOKEN: '00012345678901234567890', FLAG: 'false' },
      domain: { certificate_id: '00012345678901234567890' },
    });
  });

  it('continues to reject invalid numeric template values before execution', () => {
    jest.mocked(readFileSync).mockReturnValue(
      stringify({
        ...template,
        vars: { memory: 'not-a-number' },
        functions: { handler: { name: 'handler', memory: '${vars.memory}' } },
      }),
    );
    expect(() =>
      revalYaml('/config.yml', {
        ...context,
        provider: ProviderEnum.ALIYUN,
        region: 'cn-hangzhou',
      }),
    ).toThrow(IacSchemaErrors);
  });

  it.each(['domain', 'website'])(
    'preserves a numeric certificate reference in a bucket %s',
    (location) => {
      const domain = {
        domain_name: 'assets.example.com',
        certificate_id: '${vars.certificate}',
        protocol: 'HTTPS',
      };
      jest.mocked(readFileSync).mockReturnValue(
        stringify({
          ...template,
          vars: { certificate: '00012345678901234567890' },
          buckets: {
            assets: {
              name: 'example-assets',
              ...(location === 'domain' ? { domain } : { website: { code: './site', domain } }),
            },
          },
        }),
      );
      const result = revalYaml('/config.yml', {
        ...context,
        provider: ProviderEnum.ALIYUN,
        region: 'cn-hangzhou',
      });
      expect(
        location === 'domain'
          ? result.buckets?.[0].domain?.certificate_id
          : result.buckets?.[0].website?.domain_certificate_id,
      ).toBe('00012345678901234567890');
    },
  );

  it('keeps YAML App and Service while applying workload provider and region', () => {
    jest.mocked(readFileSync).mockReturnValue(stringify(template));
    expect(revalYaml('/config.yml', context)).toMatchObject({
      app: 'shop',
      service: 'api',
      provider: { name: 'tencent', region: 'ap-shanghai' },
    });
  });

  it('rejects a runtime supported by the template cloud but unsupported by the effective cloud', () => {
    jest.mocked(readFileSync).mockReturnValue(
      stringify({
        ...template,
        functions: {
          handler: {
            name: 'handler',
            code: { runtime: 'nodejs20', handler: 'index.handler', path: './code' },
          },
        },
      }),
    );
    expect(() => revalYaml('/config.yml', context)).toThrow(
      /runtime 'nodejs20' is not supported by provider 'tencent'/,
    );
  });

  it('rejects resources the effective provider planner would omit', () => {
    jest.mocked(readFileSync).mockReturnValue(
      stringify({
        ...template,
        events: { api: { name: 'api', type: 'API_GATEWAY', triggers: [] } },
      }),
    );
    expect(() => revalYaml('/config.yml', context)).toThrow(/cannot deploy 'events'/);
  });

  it('validates runtime values after evaluating template expressions', () => {
    jest.mocked(readFileSync).mockReturnValue(
      stringify({
        ...template,
        vars: { runtime: 'unsupported-runtime' },
        functions: {
          handler: {
            name: 'handler',
            code: { runtime: '${vars.runtime}', handler: 'index.handler', path: './code' },
          },
        },
      }),
    );
    expect(() => revalYaml('/config.yml', context)).toThrow(IacSchemaErrors);
  });
});

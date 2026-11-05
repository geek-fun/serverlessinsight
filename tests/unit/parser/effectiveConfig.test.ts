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

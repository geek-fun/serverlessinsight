import { runLocal } from '../../../src/commands/local';
import { getContext, getIacLocation, setContext, setIac } from '../../../src/common';
import { parseYaml, revalYaml } from '../../../src/parser';
import { startLocalStack } from '../../../src/stack/localStack';
import { ProviderEnum } from '../../../src/common/providerEnum';
import { Context, ServerlessIac } from '../../../src/types';

jest.mock('../../../src/common', () => ({
  getIacLocation: jest.fn(),
  setContext: jest.fn(),
  getContext: jest.fn(),
  setIac: jest.fn(),
  logger: { info: jest.fn() },
}));
jest.mock('../../../src/parser', () => ({ parseYaml: jest.fn(), revalYaml: jest.fn() }));
jest.mock('../../../src/stack/localStack', () => ({ startLocalStack: jest.fn() }));

it('forwards YAML provider, region and stages and uses effective CLI overrides for local invocation', async () => {
  const iac = {
    app: 'local-app',
    service: 'local-service',
    provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-beijing' },
    stages: { preview: { MODE: 'preview' } },
  } as unknown as ServerlessIac;
  const ctx = {
    stage: 'preview',
    provider: ProviderEnum.VOLCENGINE,
    region: 'cn-shanghai',
  } as Context;
  jest.mocked(getIacLocation).mockReturnValue('/tmp/app/serverlessinsight.yml');
  jest.mocked(parseYaml).mockReturnValue(iac);
  jest.mocked(getContext).mockReturnValue(ctx);
  jest.mocked(revalYaml).mockReturnValue(iac);

  await runLocal({
    stage: 'preview',
    debug: false,
    watch: false,
    location: '/tmp/app',
    provider: 'volcengine',
    region: 'cn-shanghai',
  });

  expect(setContext).toHaveBeenCalledWith({
    stage: 'preview',
    app: 'local-app',
    service: 'local-service',
    location: '/tmp/app',
    provider: 'volcengine',
    region: 'cn-shanghai',
    iacProvider: iac.provider,
    stages: iac.stages,
  });
  expect(revalYaml).toHaveBeenCalledWith('/tmp/app/serverlessinsight.yml', ctx);
  const effective = { ...iac, provider: { name: ProviderEnum.VOLCENGINE, region: 'cn-shanghai' } };
  expect(setIac).toHaveBeenCalledWith(effective);
  expect(startLocalStack).toHaveBeenCalledWith(effective);
});

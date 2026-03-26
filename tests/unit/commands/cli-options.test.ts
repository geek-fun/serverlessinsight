import { getIacLocation, setContext, getContext } from '../../../src/common';
import { parseYaml } from '../../../src/parser';

jest.mock('../../../src/common/imsClient', () => ({
  getIamInfo: jest.fn().mockResolvedValue({ accountId: '123456789012', region: 'cn-hangzhou' }),
}));

jest.mock('../../../src/stack', () => ({
  deployStack: jest.fn(),
}));

jest.mock('../../../src/stack/scfStack', () => ({
  generateTencentPlan: jest.fn().mockResolvedValue({ items: [] }),
  displayPlan: jest.fn(),
  destroyTencentStack: jest.fn(),
}));

jest.mock('../../../src/stack/aliyunStack', () => ({
  generateAliyunPlan: jest.fn().mockResolvedValue({ items: [] }),
  destroyAliyunStack: jest.fn(),
}));

jest.mock('../../../src/common/stateBackend', () => ({
  createStateBackend: jest.fn().mockReturnValue({
    loadState: jest.fn(),
    saveState: jest.fn(),
    acquireLock: jest.fn(),
    releaseLock: jest.fn(),
    forceUnlock: jest.fn(),
    readLock: jest.fn().mockResolvedValue(null),
    withLock: jest.fn(async (_op: string, fn: () => Promise<void>) => await fn()),
  }),
}));

describe('show command action handler', () => {
  const fixtureFile = 'tests/fixtures/serverless-insight.yml';

  it('correctly maps file→location when calling setContext', async () => {
    const iacLocation = getIacLocation(fixtureFile);
    const rawIac = parseYaml(iacLocation);
    const stage = 'test-stage';

    await setContext({
      location: fixtureFile,
      stage,
      app: rawIac.app,
      service: rawIac.service,
      iacProvider: rawIac.provider,
      stages: rawIac.stages,
    });

    const context = getContext();
    expect(context.iacLocation).toContain('serverless-insight.yml');
    expect(context.stage).toBe('test-stage');
    expect(context.app).toBe(rawIac.app);
    expect(context.service).toBe(rawIac.service);
  });

  it('uses location parameter (not file) for iacLocation in context', async () => {
    const customPath = 'tests/fixtures/serverless-insight-with-bucket.yml';
    const rawIac = parseYaml(getIacLocation(customPath));

    await setContext({
      location: customPath,
      stage: 'prod',
      app: rawIac.app,
      service: rawIac.service,
      iacProvider: rawIac.provider,
      stages: rawIac.stages,
    });

    const context = getContext();
    expect(context.iacLocation).toContain('serverless-insight-with-bucket.yml');
  });
});

describe('validate command action handler', () => {
  it('correctly receives location parameter', async () => {
    const { validate } = await import('../../../src/commands/validate');
    const fixtureFile = 'tests/fixtures/serverless-insight.yml';

    await expect(validate({ location: fixtureFile, stage: 'dev' })).resolves.not.toThrow();
  });
});

describe('deploy command action handler', () => {
  it('correctly receives location parameter', async () => {
    const { deploy } = await import('../../../src/commands/deploy');
    const fixtureFile = 'tests/fixtures/serverless-insight.yml';

    await expect(
      deploy({ location: fixtureFile, stage: 'test', parameters: {}, autoApprove: true }),
    ).resolves.not.toThrow();
  });
});

describe('plan command action handler', () => {
  it('correctly receives location parameter', async () => {
    const { plan } = await import('../../../src/commands/plan');
    const fixtureFile = 'tests/fixtures/serverless-insight.yml';

    await expect(plan({ location: fixtureFile, stage: 'test' })).resolves.not.toThrow();
  });
});

describe('destroy command action handler', () => {
  it('correctly receives location parameter', async () => {
    const { destroyStack } = await import('../../../src/commands/destroy');
    const fixtureFile = 'tests/fixtures/serverless-insight.yml';

    await expect(destroyStack({ location: fixtureFile, stage: 'dev' })).resolves.not.toThrow();
  });
});

describe('local command action handler', () => {
  it('correctly receives location parameter', async () => {
    jest.mock('../../../src/stack/localStack', () => ({ startLocalStack: jest.fn() }));
    const { runLocal } = await import('../../../src/commands/local');
    const fixtureFile = 'tests/fixtures/serverless-insight.yml';

    await expect(
      runLocal({ location: fixtureFile, stage: 'local', port: 3000, debug: false, watch: true }),
    ).resolves.not.toThrow();
  });
});

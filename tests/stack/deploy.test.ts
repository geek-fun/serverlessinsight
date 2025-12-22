import { deployStack } from '../../src/stack';
import {
  bucketMinimumIac,
  bucketMinimumRos,
  bucketWithWebsiteIac,
  bucketWithWebsiteRos,
  esServerlessMinimumIac,
  esServerlessMinimumRos,
  largeCodeRos,
  minimumIac,
  minimumRos,
  oneFcIac,
  oneFcIacWithNas,
  oneFcIacWithNasRos,
  oneFcIacWithStage,
  oneFcOneGatewayIac,
  oneFcOneGatewayRos,
  oneFcRos,
  oneFcWithContainerIac,
  oneFcWithContainerRos,
  oneFcWithGpuIac,
  oneFcWithGpuRos,
  oneFcWithStageRos,
  referredServiceIac,
  referredServiceRos,
} from '../fixtures/deploy-fixtures';
import { cloneDeep, set } from 'lodash';
import path from 'node:path';

const mockedEnterWith = jest.fn();
const mockedGetStore = jest.fn();

const mockedRosStackDeploy = jest.fn();
const mockedResolveCode = jest.fn();
const mockedPublishAssets = jest.fn();
const mockedCleanupAssets = jest.fn();
const mockedGetIamInfo = jest.fn();

jest.mock('node:async_hooks', () => ({
  AsyncLocalStorage: jest.fn().mockImplementation(() => ({
    enterWith: (...args: unknown[]) => mockedEnterWith(...args),
    getStore: (...args: unknown[]) => mockedGetStore(...args),
  })),
}));

jest.mock('../../src/common', () => ({
  ...jest.requireActual('../../src/common'),
  rosStackDeploy: (...args: unknown[]) => mockedRosStackDeploy(...args),
  publishAssets: (...args: unknown[]) => mockedPublishAssets(...args),
  cleanupAssets: (...args: unknown[]) => mockedCleanupAssets(...args),
  resolveCode: (path: string) => mockedResolveCode(path),
  getIamInfo: (...args: unknown[]) => mockedGetIamInfo(...args),
  logger: { info: jest.fn(), debug: jest.fn() },
}));

describe('Unit tests for stack deployment', () => {
  beforeAll(async () => {
    const { setContext } = jest.requireActual('../../src/common');
    const iacLocation = path.resolve(__dirname, '../fixtures/serverless-insight.yml');
    await setContext({
      stage: 'default',
      stackName: 'test-stack',
      region: 'cn-hangzhou',
      accessKeyId: 'test-access-key-id',
      accessKeySecret: 'test-access-key-secret',
      location: iacLocation,
    });
  });

  beforeEach(() => {
    mockedResolveCode.mockReturnValueOnce('resolved-code');
    mockedPublishAssets.mockResolvedValueOnce('published-assets-bucket');
    mockedGetIamInfo.mockResolvedValueOnce({ accountId: '123456789012', region: 'cn-hangzhou' });
  });
  afterEach(() => {
    mockedEnterWith.mockRestore();
    mockedRosStackDeploy.mockRestore();
    mockedResolveCode.mockRestore();
    mockedPublishAssets.mockRestore();
    mockedGetIamInfo.mockRestore();
    mockedCleanupAssets.mockRestore();
  });

  it('should deploy generated stack when minimum fields provided', async () => {
    const stackName = 'my-demo-minimum-stack';
    mockedGetStore.mockReturnValue({ stackName });
    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(stackName, minimumIac);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, minimumRos]);
  });

  it('should deploy generated stack when only one FC specified', async () => {
    const stackName = 'my-demo-stack-fc-only';
    mockedGetStore.mockReturnValue({ stackName });

    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(stackName, oneFcIac);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, oneFcRos]);
  });

  it('should reference to default stage mappings when --stage not provided', async () => {
    const options = { stackName: 'my-demo-stack-fc-with-stage-1', stage: 'default' };
    mockedGetStore.mockReturnValue(options);
    mockedRosStackDeploy.mockResolvedValueOnce(options.stackName);

    await deployStack(options.stackName, oneFcIacWithStage);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([options.stackName, oneFcWithStageRos]);
  });

  it('should reference to specified stage mappings when --stage is provided', async () => {
    const options = { stackName: 'my-demo-stack-fc-with-stage-1', stage: 'dev' };
    mockedGetStore.mockReturnValue(options);
    mockedRosStackDeploy.mockResolvedValueOnce(options.stackName);

    await deployStack(options.stackName, oneFcIacWithStage);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
      options.stackName,
      set(
        cloneDeep(oneFcWithStageRos),
        'Resources.hello_fn.Properties.EnvironmentVariables.NODE_ENV.Fn::FindInMap',
        ['stages', 'dev', 'node_env'],
      ),
    ]);
  });

  it('should evaluate service name as pure string when it reference ${ctx.stage}', async () => {
    const options = { stackName: 'my-demo-stack-fc-with-stage-1', stage: 'dev' };
    mockedGetStore.mockReturnValue(options);
    mockedRosStackDeploy.mockResolvedValueOnce(options.stackName);

    await deployStack(options.stackName, referredServiceIac);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([options.stackName, referredServiceRos]);
  });

  it('should create bucket and store code artifact to bucket when code size > 15MB', async () => {
    const stackName = 'my-large-code-stack';
    mockedGetStore.mockReturnValue({ stackName, accountId: '123456789012', region: 'cn-hangzhou' });
    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(
      stackName,
      set(
        cloneDeep(oneFcOneGatewayIac),
        'functions[0].code.path',
        'tests/fixtures/artifacts/large-artifact.zip',
      ),
    );

    const expectedAssets = Array(2).fill({
      bucketName: expect.any(String),
      objectKey: expect.stringContaining('.zip'),
      source: expect.stringContaining('.zip'),
    });
    expect(mockedPublishAssets).toHaveBeenCalledTimes(1);
    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedPublishAssets).toHaveBeenCalledWith(expectedAssets);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, largeCodeRos]);
    expect(mockedCleanupAssets).toHaveBeenCalledTimes(1);
    expect(mockedCleanupAssets).toHaveBeenCalledWith(expectedAssets);
  });

  describe('unit test for deploy of events', () => {
    it('should deploy event with custom domain specified when domain is provided', async () => {
      const stackName = 'my-event-stack-with-custom-domain';
      mockedGetStore.mockReturnValue({ stackName });
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, oneFcOneGatewayIac);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, oneFcOneGatewayRos]);
    });
  });

  describe('unit test for deploy of databases', () => {
    it('should deploy elasticsearch serverless when database minimum fields provided', async () => {
      const stackName = 'my-demo-es-serverless-stack';
      mockedGetStore.mockReturnValue({ stackName });
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, esServerlessMinimumIac);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, esServerlessMinimumRos]);
    });
  });

  describe('unit test for deploy of buckets', () => {
    it('should deploy bucket when minimum fields provided', async () => {
      const stackName = 'my-demo-bucket-stack';
      mockedGetStore.mockReturnValue({ stackName });
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, bucketMinimumIac);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, bucketMinimumRos]);
    });

    it('should deploy bucket as a website when website field is provided', async () => {
      const stackName = 'my-website-bucket-stack';
      mockedGetStore.mockReturnValue({ stackName });
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, bucketWithWebsiteIac);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedPublishAssets).toHaveBeenCalledTimes(1);
      expect(mockedCleanupAssets).toHaveBeenCalledTimes(1);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, bucketWithWebsiteRos]);
    });
  });

  describe('unit test for serverless Gpu', () => {
    it('should deploy function with nas when nas field is provided', async () => {
      const stackName = 'my-demo-stack-with-nas';
      mockedGetStore.mockReturnValue({ stackName });
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, oneFcIacWithNas);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, oneFcIacWithNasRos]);
    });

    it('should deploy function with container when container field is provided', async () => {
      const stackName = 'my-demo-stack-with-container';
      mockedGetStore.mockReturnValue({ stackName });
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, oneFcWithContainerIac);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, oneFcWithContainerRos]);
    });

    it('should deploy function with gpu configured', async () => {
      const stackName = 'my-demo-stack-with-gpu';
      mockedGetStore.mockReturnValue({ stackName });
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, oneFcWithGpuIac);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, oneFcWithGpuRos]);
    });
  });
});

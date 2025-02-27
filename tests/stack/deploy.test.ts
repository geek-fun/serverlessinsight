import { deployStack } from '../../src/stack';
import { ActionContext } from '../../src/types';
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
} from '../fixtures/deployFixture';
import { cloneDeep, set } from 'lodash';

const mockedRosStackDeploy = jest.fn();
const mockedResolveCode = jest.fn();
const mockedPublishAssets = jest.fn();
const mockedCleanupAssets = jest.fn();
const mockedGetIamInfo = jest.fn();

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
  beforeEach(() => {
    mockedResolveCode.mockReturnValueOnce('resolved-code');
    mockedPublishAssets.mockResolvedValueOnce('published-assets-bucket');
    mockedGetIamInfo.mockResolvedValueOnce({ accountId: '123456789012', region: 'cn-hangzhou' });
  });
  afterEach(() => {
    mockedRosStackDeploy.mockRestore();
    mockedResolveCode.mockRestore();
    mockedPublishAssets.mockRestore();
    mockedGetIamInfo.mockRestore();
    mockedCleanupAssets.mockRestore();
  });

  it('should deploy generated stack when minimum fields provided', async () => {
    const stackName = 'my-demo-minimum-stack';
    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(stackName, minimumIac, { stackName } as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, minimumRos, { stackName }]);
  });

  it('should deploy generated stack when only one FC specified', async () => {
    const stackName = 'my-demo-stack-fc-only';
    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(stackName, oneFcIac, { stackName } as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([stackName, oneFcRos, { stackName }]);
  });

  it('should reference to default stage mappings when --stage not provided', async () => {
    const options = { stackName: 'my-demo-stack-fc-with-stage-1', stage: 'default' };
    mockedRosStackDeploy.mockResolvedValueOnce(options.stackName);

    await deployStack(options.stackName, oneFcIacWithStage, options as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
      options.stackName,
      oneFcWithStageRos,
      options,
    ]);
  });

  it('should reference to specified stage mappings when --stage is provided', async () => {
    const options = { stackName: 'my-demo-stack-fc-with-stage-1', stage: 'dev' };
    mockedRosStackDeploy.mockResolvedValueOnce(options.stackName);

    await deployStack(options.stackName, oneFcIacWithStage, options as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
      options.stackName,
      set(
        cloneDeep(oneFcWithStageRos),
        'Resources.hello_fn.Properties.EnvironmentVariables.NODE_ENV.Fn::FindInMap',
        ['stages', 'dev', 'node_env'],
      ),
      options,
    ]);
  });

  it('should evaluate service name as pure string when it reference ${ctx.stage}', async () => {
    const options = { stackName: 'my-demo-stack-fc-with-stage-1', stage: 'dev' };
    mockedRosStackDeploy.mockResolvedValueOnce(options.stackName);

    await deployStack(options.stackName, referredServiceIac, options as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
      options.stackName,
      referredServiceRos,
      options,
    ]);
  });

  it('should create bucket and store code artifact to bucket when code size > 15MB', async () => {
    const stackName = 'my-large-code-stack';
    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(
      stackName,
      set(
        cloneDeep(oneFcOneGatewayIac),
        'functions[0].code.path',
        'tests/fixtures/artifacts/large-artifact.zip',
      ),
      { stackName } as ActionContext,
    );

    const expectedAssets = Array(2).fill({
      bucketName: expect.any(String),
      objectKey: expect.stringContaining('.zip'),
      source: expect.stringContaining('.zip'),
    });
    expect(mockedPublishAssets).toHaveBeenCalledTimes(1);
    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedPublishAssets).toHaveBeenCalledWith(expectedAssets, { stackName });
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
      stackName,
      largeCodeRos,
      {
        stackName,
      },
    ]);
    expect(mockedCleanupAssets).toHaveBeenCalledTimes(1);
    expect(mockedCleanupAssets).toHaveBeenCalledWith(expectedAssets, { stackName });
  });

  describe('unit test for deploy of events', () => {
    it('should deploy event with custom domain specified when domain is provided', async () => {
      const stackName = 'my-event-stack-with-custom-domain';
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, oneFcOneGatewayIac, { stackName } as ActionContext);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
        stackName,
        oneFcOneGatewayRos,
        { stackName },
      ]);
    });
  });

  describe('unit test for deploy of databases', () => {
    it('should deploy elasticsearch serverless when database minimum fields provided', async () => {
      const stackName = 'my-demo-es-serverless-stack';
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, esServerlessMinimumIac, { stackName } as ActionContext);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
        stackName,
        esServerlessMinimumRos,
        {
          stackName,
        },
      ]);
    });
  });

  describe('unit test for deploy of buckets', () => {
    it('should deploy bucket when minimum fields provided', async () => {
      const stackName = 'my-demo-bucket-stack';
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, bucketMinimumIac, { stackName } as ActionContext);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
        stackName,
        bucketMinimumRos,
        { stackName },
      ]);
    });

    it('should deploy bucket as a website when website field is provided', async () => {
      const stackName = 'my-website-bucket-stack';
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, bucketWithWebsiteIac, { stackName } as ActionContext);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedPublishAssets).toHaveBeenCalledTimes(1);
      expect(mockedCleanupAssets).toHaveBeenCalledTimes(1);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
        stackName,
        bucketWithWebsiteRos,
        { stackName },
      ]);
    });
  });

  describe('unit test for serverless Gpu', () => {
    it('should deploy function with nas when nas field is provided', async () => {
      const stackName = 'my-demo-stack-with-nas';
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, oneFcIacWithNas, { stackName } as ActionContext);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
        stackName,
        oneFcIacWithNasRos,
        { stackName },
      ]);
    });

    it('should deploy function with container when container field is provided', async () => {
      const stackName = 'my-demo-stack-with-container';
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, oneFcWithContainerIac, { stackName } as ActionContext);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
        stackName,
        oneFcWithContainerRos,
        { stackName },
      ]);
    });

    it('should deploy function with gpu configured', async () => {
      const stackName = 'my-demo-stack-with-gpu';
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, oneFcWithGpuIac, { stackName } as ActionContext);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
        stackName,
        oneFcWithGpuRos,
        { stackName },
      ]);
    });
  });
});

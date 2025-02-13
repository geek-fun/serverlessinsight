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
  oneFcIacWithStage,
  oneFcOneGatewayIac,
  oneFcOneGatewayRos,
  oneFcRos,
  oneFcWithStageRos,
  referredServiceIac,
  referredServiceRos,
} from '../fixtures/deployFixture';
import { cloneDeep, set } from 'lodash';

const mockedRosStackDeploy = jest.fn();
const mockedResolveCode = jest.fn();
const mockedPublishAssets = jest.fn();
const mockedGetIamInfo = jest.fn();

jest.mock('../../src/common', () => ({
  ...jest.requireActual('../../src/common'),
  rosStackDeploy: (...args: unknown[]) => mockedRosStackDeploy(...args),
  publishAssets: (...args: unknown[]) => mockedPublishAssets(...args),
  resolveCode: (path: string) => mockedResolveCode(path),
  getIamInfo: (...args: unknown[]) => mockedGetIamInfo(...args),
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
  });

  it('should deploy generated stack when iac is valid', async () => {
    const stackName = 'my-demo-stack';
    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(stackName, oneFcOneGatewayIac, { stackName } as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
      stackName,
      oneFcOneGatewayRos,
      {
        stackName,
      },
    ]);
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
        'functions[0].code',
        'tests/fixtures/artifacts/large-artifact.zip',
      ),
      { stackName } as ActionContext,
    );

    expect(mockedPublishAssets).toHaveBeenCalledTimes(1);
    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
    expect(mockedPublishAssets).toHaveBeenCalledWith(
      expect.objectContaining({
        dockerImages: {},
        files: expect.any(Object),
        rootPath: expect.any(String),
        version: '7.0.0',
      }),

      { stackName },
    );
    expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
      stackName,
      largeCodeRos,
      {
        stackName,
      },
    ]);
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

    it('should deploy bucket as a website when website  field is provided', async () => {
      const stackName = 'my-website-bucket-stack';
      mockedRosStackDeploy.mockResolvedValue(stackName);

      await deployStack(stackName, bucketWithWebsiteIac, { stackName } as ActionContext);

      expect(mockedRosStackDeploy).toHaveBeenCalledTimes(2);
      expect(mockedPublishAssets).toHaveBeenCalledTimes(1);
      expect(mockedRosStackDeploy.mock.calls[1]).toEqual([
        stackName,
        bucketWithWebsiteRos,
        { stackName },
      ]);
    });
  });
});

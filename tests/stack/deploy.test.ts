import { deployStack } from '../../src/stack';
import { ActionContext } from '../../src/types';
import {
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
jest.mock('../../src/common', () => ({
  ...jest.requireActual('../../src/common'),
  rosStackDeploy: (...args: unknown[]) => mockedRosStackDeploy(...args),
  resolveCode: (path: string) => mockedResolveCode(path),
}));

describe('Unit tests for stack deployment', () => {
  beforeEach(() => {
    mockedRosStackDeploy.mockRestore();
    mockedResolveCode.mockReturnValueOnce('resolved-code');
  });

  it('should deploy generated stack when iac is valid', async () => {
    const stackName = 'my-demo-stack';
    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(stackName, oneFcOneGatewayIac, { stackName } as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(1);
    expect(mockedRosStackDeploy).toHaveBeenCalledWith(stackName, oneFcOneGatewayRos, { stackName });
  });

  it('should deploy generated stack when minimum fields provided', async () => {
    const stackName = 'my-demo-minimum-stack';
    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(stackName, minimumIac, { stackName } as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(1);
    expect(mockedRosStackDeploy).toHaveBeenCalledWith(stackName, minimumRos, { stackName });
  });

  it('should deploy generated stack when only one FC specified', async () => {
    const stackName = 'my-demo-stack-fc-only';
    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(stackName, oneFcIac, { stackName } as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(1);
    expect(mockedRosStackDeploy).toHaveBeenCalledWith(stackName, oneFcRos, { stackName });
  });

  it('should reference to default stage mappings when --stage not provided', async () => {
    const options = { stackName: 'my-demo-stack-fc-with-stage-1', stage: 'default' };
    mockedRosStackDeploy.mockResolvedValueOnce(options.stackName);

    await deployStack(options.stackName, oneFcIacWithStage, options as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(1);
    expect(mockedRosStackDeploy).toHaveBeenCalledWith(
      options.stackName,
      oneFcWithStageRos,
      options,
    );
  });

  it('should reference to specified stage mappings when --stage is provided', async () => {
    const options = { stackName: 'my-demo-stack-fc-with-stage-1', stage: 'dev' };
    mockedRosStackDeploy.mockResolvedValueOnce(options.stackName);

    await deployStack(options.stackName, oneFcIacWithStage, options as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(1);
    expect(mockedRosStackDeploy).toHaveBeenCalledWith(
      options.stackName,
      set(
        cloneDeep(oneFcWithStageRos),
        'Resources.hello_fn.Properties.EnvironmentVariables.NODE_ENV.Fn::FindInMap',
        ['stages', 'dev', 'node_env'],
      ),
      options,
    );
  });
  it('should evaluate service name as pure string when it reference ${ctx.stage}', async () => {
    const options = { stackName: 'my-demo-stack-fc-with-stage-1', stage: 'dev' };
    mockedRosStackDeploy.mockResolvedValueOnce(options.stackName);

    await deployStack(options.stackName, referredServiceIac, options as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(1);
    expect(mockedRosStackDeploy).toHaveBeenCalledWith(
      options.stackName,
      referredServiceRos,
      options,
    );
  });
});

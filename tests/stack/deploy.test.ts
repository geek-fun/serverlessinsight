import { deployStack } from '../../src/stack';
import { ActionContext } from '../../src/types';
import {
  oneFcIac,
  oneFcOneGatewayIac,
  oneFcOneGatewayRos,
  oneFcRos,
} from '../fixtures/deployFixture';

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

  it('should deploy generated stack when only one FC specified', async () => {
    const stackName = 'my-demo-stack-fc-only';
    mockedRosStackDeploy.mockResolvedValueOnce(stackName);

    await deployStack(stackName, oneFcIac, { stackName } as ActionContext);

    expect(mockedRosStackDeploy).toHaveBeenCalledTimes(1);
    expect(mockedRosStackDeploy).toHaveBeenCalledWith(stackName, oneFcRos, { stackName });
  });
});

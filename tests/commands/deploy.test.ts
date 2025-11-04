import { deploy } from '../../src/commands/deploy';

const mockedIamInfo = jest.fn();
const mockedDeployStack = jest.fn();

jest.mock('../../src/common/imsClient', () => ({
  ...jest.requireActual('../../src/common/imsClient'),
  getIamInfo: (...rags: unknown[]) => mockedIamInfo(...rags),
}));

jest.mock('../../src/stack', () => ({
  ...jest.requireActual('../../src/stack'),
  deployStack: (...args: unknown[]) => mockedDeployStack(...args),
}));

describe('unit test for deploy command', () => {
  it('should construct valid context and deploy the stack when deploy with valid iac', async () => {
    mockedIamInfo.mockResolvedValue({ accountId: '123456789012', region: 'cn-hangzhou' });

    const stackName = 'my-demo-stack';

    await deploy(stackName, {
      location: 'tests/fixtures/serverless-insight.yml',
      parameters: {},
      stage: undefined,
    });

    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
    expect(mockedDeployStack).toHaveBeenCalledWith(stackName, expect.any(Object));
  });
});

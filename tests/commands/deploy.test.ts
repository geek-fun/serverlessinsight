import { deploy } from '../../src/commands/deploy';

const mockedDeployStack = jest.fn();
jest.mock('../../src/stack', () => ({
  ...jest.requireActual('../../src/stack'),
  deployStack: (...args: unknown[]) => mockedDeployStack(...args),
}));

describe('unit test for deploy command', () => {
  it('should construct valid context and deploy the stack when deploy with valid iac', async () => {
    const stackName = 'my-demo-stack';
    await deploy(stackName, { location: 'tests/fixtures/serverless-insight.yml', parameters: {} });
    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
    expect(mockedDeployStack).toHaveBeenCalledWith(stackName, expect.any(Object), {
      accessKeyId: undefined,
      accessKeySecret: undefined,
      iacLocation:
        '/Users/blank/Documents/dev/geekfun/serverlessinsight/tests/fixtures/serverless-insight.yml',
      parameters: [],
      region: 'cn-hangzhou',
      securityToken: undefined,
      stackName: 'my-demo-stack',
      stage: 'default',
    });
  });
});

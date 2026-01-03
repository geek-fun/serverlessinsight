import { template } from '../../src/commands/template';
import { TemplateFormat } from '../../src/types';

const mockedLogger = jest.fn();
const mockedGetContext = jest.fn();

jest.mock('../../src/common/logger', () => ({
  logger: { info: (...args: unknown[]) => mockedLogger(...args), debug: jest.fn() },
}));

jest.mock('../../src/common/imsClient', () => ({
  getIamInfo: jest.fn().mockResolvedValue({ accountId: '123456789012', region: 'cn-hangzhou' }),
}));

jest.mock('../../src/common/context', () => ({
  ...jest.requireActual('../../src/common/context'),
  getContext: (...args: unknown[]) => mockedGetContext(...args),
}));

const stackName = 'printTemplateStack';
const location = 'tests/fixtures/serverless-insight.yml';

describe('Unit test for template command', () => {
  beforeEach(() => {
    mockedGetContext.mockReturnValue({
      accountId: '123456789012',
      region: 'cn-hangzhou',
      stage: 'default',
      stackName,
      provider: 'aliyun',
    });
  });

  afterEach(() => {
    mockedLogger.mockRestore();
    mockedGetContext.mockRestore();
  });

  it('should print empty template for Aliyun (state-based deployment)', async () => {
    const options = {
      format: TemplateFormat.JSON,
      location,
      stage: undefined,
    };

    await template(stackName, options);

    // Aliyun uses state-based deployment, so template generation returns empty object
    expect(mockedLogger).toHaveBeenCalledWith(`\n${JSON.stringify({}, null, 2)}`);
  });

  it('should print empty template in YAML format for Aliyun', async () => {
    const options = { format: TemplateFormat.YAML, location, stage: undefined };

    await template(stackName, options);

    // Aliyun uses state-based deployment, so template generation returns empty object
    expect(mockedLogger).toHaveBeenCalledWith('\n{}\n');
  });
});

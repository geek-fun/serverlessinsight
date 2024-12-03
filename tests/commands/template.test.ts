import { template } from '../../src/commands/template';
import { TemplateFormat } from '../../src/types';
import { jsonTemplate, yamlTemplate } from '../fixtures/templateFixture';

const mockedLogger = jest.fn();
jest.mock('../../src/common/logger', () => ({
  logger: { info: (...args: unknown[]) => mockedLogger(...args), debug: jest.fn() },
}));
const stackName = 'printTemplateStack';
const location = 'tests/fixtures/serverless-insight.yml';

describe('Unit test for template command', () => {
  beforeEach(() => {
    mockedLogger.mockRestore();
  });
  it('should print the template in JSON format by default', () => {
    const options = {
      format: TemplateFormat.JSON,
      location,
      stage: undefined,
    };

    template(stackName, options);

    expect(mockedLogger).toHaveBeenCalledWith(`\n${JSON.stringify(jsonTemplate, null, 2)}`);
  });

  it('should print the template in YAML format when specified', () => {
    const options = { format: TemplateFormat.YAML, location, stage: undefined };

    template(stackName, options);

    expect(mockedLogger).toHaveBeenCalledWith(yamlTemplate);
  });
});

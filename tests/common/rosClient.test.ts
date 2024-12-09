import { logger, rosStackDeploy } from '../../src/common';
import { context } from '../fixtures/contextFixture';
import { lang } from '../../src/lang';

const mockedCreateStack = jest.fn();
const mockedUpdateStack = jest.fn();
const mockedListStacks = jest.fn();
const mockedGetStack = jest.fn();

jest.mock('@alicloud/ros20190910', () => ({
  ...jest.requireActual('@alicloud/ros20190910'),
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    createStack: () => mockedCreateStack(),
    updateStack: () => mockedUpdateStack(),
    listStacks: () => mockedListStacks(),
    getStack: () => mockedGetStack(),
  })),
}));

jest.mock('../../src/common/logger');

describe('Unit test for rosClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new stack if it does not exist', async () => {
    mockedListStacks.mockResolvedValue({ statusCode: 200, body: { stacks: [] } });
    mockedCreateStack.mockResolvedValue({ body: { stackId: 'newStackId' } });
    mockedGetStack.mockResolvedValue({ body: { status: 'CREATE_COMPLETE' } });

    await rosStackDeploy('newStack', {}, context);

    expect(mockedCreateStack).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('createStack success'));
  });

  it('should update an existing stack if it exists', async () => {
    mockedListStacks.mockResolvedValue({
      statusCode: 200,
      body: { stacks: [{ stackId: 'existingStackId', Status: 'CREATE_COMPLETE' }] },
    });
    mockedUpdateStack.mockResolvedValue({ body: { stackId: 'existingStackId' } });
    mockedGetStack.mockResolvedValue({ body: { status: 'UPDATE_COMPLETE' } });

    await rosStackDeploy('existingStack', {}, context);

    expect(mockedUpdateStack).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('stackUpdate success'));
  });

  it('should throw an error if the stack is in progress', async () => {
    mockedListStacks.mockResolvedValue({
      statusCode: 200,
      body: { stacks: [{ stackId: 'inProgressStackId', Status: 'CREATE_IN_PROGRESS' }] },
    });

    await expect(rosStackDeploy('inProgressStack', {}, context)).rejects.toThrow(
      'fail to update stack, because stack status is CREATE_IN_PROGRESS',
    );
  });

  it('should notify user with warning logs when update completely same stack', async () => {
    mockedListStacks.mockResolvedValue({
      statusCode: 200,
      body: { stacks: [{ stackId: 'existingStackId', Status: 'CREATE_COMPLETE' }] },
    });
    mockedUpdateStack.mockRejectedValueOnce({
      data: { statusCode: 400, Message: 'Update the completely same stack' },
    });
    mockedGetStack.mockResolvedValue({ body: { status: 'UPDATE_COMPLETE' } });

    await rosStackDeploy('existingStack', {}, context);

    expect(logger.warn).toHaveBeenCalledWith(`${lang.__('UPDATE_COMPLETELY_SAME_STACK')}`);
  });

  it('should throw error when deploy stack failed', async () => {
    mockedListStacks.mockResolvedValue({ statusCode: 200, body: { stacks: [] } });
    mockedCreateStack.mockResolvedValueOnce({ body: { stackId: 'newStackId' } });
    mockedGetStack.mockResolvedValue({ body: { status: 'ROLLBACK_COMPLETE' } });

    await expect(rosStackDeploy('newStack', {}, context)).rejects.toThrow(
      `Stack operation failed with status: ROLLBACK_COMPLETE`,
    );
  });
});

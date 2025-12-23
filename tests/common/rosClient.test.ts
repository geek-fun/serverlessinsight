import { rosStackDelete, rosStackDeploy } from '../../src/common';
import { context } from '../fixtures/contextFixture';
import { lang } from '../../src/lang';

const mockedGetStore = jest.fn();
const mockedCreateStack = jest.fn();
const mockedUpdateStack = jest.fn();
const mockedListStacks = jest.fn();
const mockedGetStack = jest.fn();
const mockedDeleteStack = jest.fn();
const mockedLoggerInfo = jest.fn();
const mockedLoggerWarn = jest.fn();
const mockedLoggerError = jest.fn();
const mockedGetContext = jest.fn();

jest.mock('node:async_hooks', () => ({
  AsyncLocalStorage: jest.fn().mockImplementation(() => ({
    enterWith: jest.fn(),
    getStore: (...args: unknown[]) => mockedGetStore(...args),
  })),
}));

jest.mock('@alicloud/ros20190910', () => ({
  ...jest.requireActual('@alicloud/ros20190910'),
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    createStack: () => mockedCreateStack(),
    updateStack: () => mockedUpdateStack(),
    listStacks: () => mockedListStacks(),
    getStack: () => mockedGetStack(),
    deleteStack: () => mockedDeleteStack(),
  })),
}));

jest.mock('../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLoggerInfo(...args),
    warn: (...args: unknown[]) => mockedLoggerWarn(...args),
    error: (...args: unknown[]) => mockedLoggerError(...args),
  },
}));

jest.mock('../../src/common/context', () => ({
  ...jest.requireActual('../../src/common/context'),
  getContext: () => mockedGetContext(),
}));

describe('Unit test for rosClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetContext.mockReturnValue(context);
  });

  describe('Unit tes for rosStackDeploy', () => {
    it('should create a new stack if it does not exist', async () => {
      const stackName = 'newStack';
      mockedGetStore.mockReturnValue({ stackName });
      mockedListStacks.mockResolvedValue({ statusCode: 200, body: { stacks: [] } });
      mockedCreateStack.mockResolvedValue({ body: { stackId: 'newStackId' } });
      mockedGetStack.mockResolvedValue({ body: { status: 'CREATE_COMPLETE' } });

      await rosStackDeploy(stackName, {});

      expect(mockedCreateStack).toHaveBeenCalled();
      expect(mockedLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('createStack success'));
    });

    it('should update an existing stack if it exists', async () => {
      const stackName = 'existingStack';
      mockedGetStore.mockReturnValue({ stackName });
      mockedListStacks.mockResolvedValue({
        statusCode: 200,
        body: { stacks: [{ stackId: 'existingStackId', Status: 'CREATE_COMPLETE' }] },
      });
      mockedUpdateStack.mockResolvedValue({ body: { stackId: 'existingStackId' } });
      mockedGetStack.mockResolvedValue({ body: { status: 'UPDATE_COMPLETE' } });

      await rosStackDeploy(stackName, {});

      expect(mockedUpdateStack).toHaveBeenCalled();
      expect(mockedLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('stackUpdate success'));
    });

    it('should throw an error if the stack is in progress', async () => {
      const stackName = 'inProgressStack';
      mockedGetStore.mockReturnValue({ stackName });
      mockedListStacks.mockResolvedValue({
        statusCode: 200,
        body: { stacks: [{ stackId: 'inProgressStackId', Status: 'CREATE_IN_PROGRESS' }] },
      });

      await expect(rosStackDeploy(stackName, {})).rejects.toThrow(
        'fail to update stack, because stack status is CREATE_IN_PROGRESS',
      );
    });

    it('should notify user with warning logs when update completely same stack', async () => {
      const stackName = 'existingStack';
      mockedGetStore.mockReturnValue({ stackName });
      mockedListStacks.mockResolvedValue({
        statusCode: 200,
        body: { stacks: [{ stackId: 'existingStackId', Status: 'CREATE_COMPLETE' }] },
      });
      mockedUpdateStack.mockRejectedValueOnce({
        statusCode: 400,
        message: 'Update the completely same stack',
      });
      mockedGetStack.mockResolvedValue({ body: { status: 'UPDATE_COMPLETE' } });

      await rosStackDeploy(stackName, {});

      expect(mockedLoggerWarn).toHaveBeenCalledWith(`${lang.__('UPDATE_COMPLETELY_SAME_STACK')}`);
    });

    it('should throw error when deploy stack failed', async () => {
      const stackName = 'newStack';
      mockedGetStore.mockReturnValue({ stackName });
      mockedListStacks.mockResolvedValue({ statusCode: 200, body: { stacks: [] } });
      mockedCreateStack.mockResolvedValueOnce({ body: { stackId: 'newStackId' } });
      mockedGetStack.mockResolvedValue({ body: { status: 'ROLLBACK_COMPLETE' } });

      await expect(rosStackDeploy(stackName, {})).rejects.toThrow(
        `Stack operation failed with status: ROLLBACK_COMPLETE`,
      );
    });
  });

  describe('Unit test for rosStackDelete', () => {
    it('should delete the stack when the provided stack is exists', async () => {
      mockedListStacks.mockResolvedValue({
        statusCode: 200,
        body: { stacks: [{ stackId: 'stackToDelete', Status: 'UPDATE_COMPLETE' }] },
      });
      mockedDeleteStack.mockResolvedValue({ body: { stackId: 'stackToDelete' } });

      mockedGetStack.mockResolvedValueOnce({ body: { status: 'DELETE_COMPLETE' } });

      await rosStackDelete(context);

      expect(mockedLoggerInfo).toHaveBeenCalledWith('stack status: DELETE_COMPLETE');
      expect(mockedLoggerInfo).toHaveBeenCalledWith('Stack: testStack deleted!🗑 ');
    });

    it('should throw an error when the stack does not exist', async () => {
      mockedListStacks.mockResolvedValue({ statusCode: 404, body: { stacks: [] } });
      await rosStackDelete(context);

      expect(mockedLoggerWarn).toHaveBeenCalledWith('Stack: testStack not exists, skipped! 🚫');
    });

    it('should throw error when delete stack failed', async () => {
      mockedListStacks.mockResolvedValue({
        statusCode: 200,
        body: { stacks: [{ stackId: 'stackToDelete', Status: 'UPDATE_COMPLETE' }] },
      });
      mockedDeleteStack.mockRejectedValue({ data: { statusCode: 400, Message: 'DELETE_FAILED' } });

      await expect(rosStackDelete(context)).rejects.toThrow(
        JSON.stringify({ statusCode: 400, Message: 'DELETE_FAILED' }),
      );
      expect(mockedLoggerError).toHaveBeenCalledWith(
        expect.stringContaining('Stack: testStack delete failed! ❌'),
      );
    });
  });
});

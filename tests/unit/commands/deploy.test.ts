import { deploy } from '../../../src/commands/deploy';
import * as readline from 'node:readline';

const mockedIamInfo = jest.fn();
const mockedDeployStack = jest.fn();
const mockedGenerateAliyunPlan = jest.fn();
const mockedGenerateTencentPlan = jest.fn();
const mockedDisplayPlan = jest.fn();
const mockedParseYaml = jest.fn();
const mockedRevalYaml = jest.fn();
const mockedGetIacLocation = jest.fn();
const mockedSetContext = jest.fn();
const mockedGetContext = jest.fn();
const mockedSetIac = jest.fn();
const mockedCreateStateBackend = jest.fn();

jest.mock('../../../src/common/imsClient', () => ({
  ...jest.requireActual('../../../src/common/imsClient'),
  getIamInfo: (...args: unknown[]) => mockedIamInfo(...args),
}));

jest.mock('../../../src/stack', () => ({
  ...jest.requireActual('../../../src/stack'),
  deployStack: (...args: unknown[]) => mockedDeployStack(...args),
}));

jest.mock('../../../src/stack/aliyunStack', () => ({
  ...jest.requireActual('../../../src/stack/aliyunStack'),
  generateAliyunPlan: (...args: unknown[]) => mockedGenerateAliyunPlan(...args),
}));

jest.mock('../../../src/stack/scfStack', () => ({
  ...jest.requireActual('../../../src/stack/scfStack'),
  generateTencentPlan: (...args: unknown[]) => mockedGenerateTencentPlan(...args),
  displayPlan: (...args: unknown[]) => mockedDisplayPlan(...args),
}));

jest.mock('../../../src/parser', () => ({
  ...jest.requireActual('../../../src/parser'),
  parseYaml: (...args: unknown[]) => mockedParseYaml(...args),
  revalYaml: (...args: unknown[]) => mockedRevalYaml(...args),
}));

jest.mock('../../../src/common', () => ({
  ...jest.requireActual('../../../src/common'),
  getIacLocation: (...args: unknown[]) => mockedGetIacLocation(...args),
  setContext: (...args: unknown[]) => mockedSetContext(...args),
  getContext: (...args: unknown[]) => mockedGetContext(...args),
  setIac: (...args: unknown[]) => mockedSetIac(...args),
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/common/stateBackend', () => ({
  ...jest.requireActual('../../../src/common/stateBackend'),
  createStateBackend: (...args: unknown[]) => mockedCreateStateBackend(...args),
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

jest.mock('node:readline');

const aliyunRawIac = {
  app: 'test-app',
  service: 'test-svc',
  provider: { name: 'aliyun' },
  stages: {},
};
const tencentRawIac = {
  app: 'test-app',
  service: 'test-svc',
  provider: { name: 'tencent' },
  stages: {},
};
const unsupportedRawIac = {
  app: 'test-app',
  service: 'test-svc',
  provider: { name: 'gcp' },
  stages: {},
};

const aliyunIac = { ...aliyunRawIac, backend: undefined };
const tencentIac = { ...tencentRawIac, backend: undefined };
const unsupportedIac = { ...unsupportedRawIac, backend: undefined };

const planWithChanges = { items: [{ action: 'create', resource: 'test' }] };
const planAllNoop = { items: [{ action: 'noop', resource: 'test' }] };

const mockBackend = {
  withLock: jest.fn((_: string, fn: () => Promise<void>) => fn()),
  getState: jest.fn(),
  loadState: jest.fn().mockResolvedValue({
    version: '1',
    provider: 'tencent',
    app: 'test',
    service: 'test',
    stages: {},
    resources: {},
  }),
  setState: jest.fn(),
};

const baseOptions = {
  location: 'tests/fixtures/serverless-insight.yml',
  parameters: {},
  stage: undefined,
  autoApprove: true,
};

const setupAliyunMocks = () => {
  mockedGetIacLocation.mockReturnValue('resolved-location');
  mockedParseYaml.mockReturnValue(aliyunRawIac);
  mockedSetContext.mockResolvedValue(undefined);
  mockedGetContext.mockReturnValue({ provider: 'aliyun', region: 'cn-hangzhou' });
  mockedRevalYaml.mockReturnValue(aliyunIac);
  mockedCreateStateBackend.mockReturnValue(mockBackend);
  mockedGenerateAliyunPlan.mockResolvedValue(planWithChanges);
  mockedDeployStack.mockResolvedValue(undefined);
};

describe('unit test for deploy command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should deploy with aliyun provider and autoApprove', async () => {
    setupAliyunMocks();

    await deploy(baseOptions);

    expect(mockedGenerateAliyunPlan).toHaveBeenCalledTimes(1);
    expect(mockedDisplayPlan).toHaveBeenCalledWith(planWithChanges);
    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
  });

  it('should deploy with tencent provider', async () => {
    mockedGetIacLocation.mockReturnValue('resolved-location');
    mockedParseYaml.mockReturnValue(tencentRawIac);
    mockedSetContext.mockResolvedValue(undefined);
    mockedGetContext.mockReturnValue({ provider: 'tencent', region: 'ap-guangzhou' });
    mockedRevalYaml.mockReturnValue(tencentIac);
    mockedCreateStateBackend.mockReturnValue(mockBackend);
    mockedGenerateTencentPlan.mockResolvedValue(planWithChanges);
    mockedDeployStack.mockResolvedValue(undefined);

    await deploy(baseOptions);

    expect(mockedGenerateTencentPlan).toHaveBeenCalledTimes(1);
    expect(mockedGenerateAliyunPlan).not.toHaveBeenCalled();
    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
  });

  it('should throw for unsupported provider', async () => {
    mockedGetIacLocation.mockReturnValue('resolved-location');
    mockedParseYaml.mockReturnValue(unsupportedRawIac);
    mockedSetContext.mockResolvedValue(undefined);
    mockedGetContext.mockReturnValue({ provider: 'gcp', region: 'us-east-1' });
    mockedRevalYaml.mockReturnValue(unsupportedIac);
    mockedCreateStateBackend.mockReturnValue(mockBackend);

    await expect(deploy(baseOptions)).rejects.toThrow('PLAN_COMMAND_NOT_SUPPORTED');
  });

  it('should skip confirmation when all plan items are noop', async () => {
    setupAliyunMocks();
    mockedGenerateAliyunPlan.mockResolvedValue(planAllNoop);

    await deploy({ ...baseOptions, autoApprove: false });

    expect(readline.createInterface).not.toHaveBeenCalled();
    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
  });

  it('should throw when stdin is not TTY and autoApprove is false with changes', async () => {
    setupAliyunMocks();
    const originalIsTTY = process.stdin.isTTY;
    Object.defineProperty(process.stdin, 'isTTY', { value: false, configurable: true });

    await expect(deploy({ ...baseOptions, autoApprove: false })).rejects.toThrow(
      'Interactive confirmation required',
    );

    Object.defineProperty(process.stdin, 'isTTY', { value: originalIsTTY, configurable: true });
  });

  it('should proceed with deploy when user confirms with yes', async () => {
    setupAliyunMocks();
    const originalIsTTY = process.stdin.isTTY;
    Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true });

    const mockClose = jest.fn();
    const mockQuestion = jest.fn((_prompt: string, callback: (answer: string) => void) => {
      callback('yes');
    });
    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      close: mockClose,
    });

    await deploy({ ...baseOptions, autoApprove: false });

    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
    expect(mockClose).toHaveBeenCalled();

    Object.defineProperty(process.stdin, 'isTTY', { value: originalIsTTY, configurable: true });
  });

  it('should cancel deploy when user answers no', async () => {
    setupAliyunMocks();
    const originalIsTTY = process.stdin.isTTY;
    Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true });

    const mockClose = jest.fn();
    const mockQuestion = jest.fn((_prompt: string, callback: (answer: string) => void) => {
      callback('no');
    });
    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      close: mockClose,
    });

    await deploy({ ...baseOptions, autoApprove: false });

    expect(mockedDeployStack).not.toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();

    Object.defineProperty(process.stdin, 'isTTY', { value: originalIsTTY, configurable: true });
  });

  it('should accept y as confirmation', async () => {
    setupAliyunMocks();
    const originalIsTTY = process.stdin.isTTY;
    Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true });

    const mockClose = jest.fn();
    const mockQuestion = jest.fn((_prompt: string, callback: (answer: string) => void) => {
      callback('y');
    });
    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      close: mockClose,
    });

    await deploy({ ...baseOptions, autoApprove: false });

    expect(mockedDeployStack).toHaveBeenCalledTimes(1);

    Object.defineProperty(process.stdin, 'isTTY', { value: originalIsTTY, configurable: true });
  });

  it('should not ask confirmation when autoApprove is true even with changes', async () => {
    setupAliyunMocks();

    await deploy({ ...baseOptions, autoApprove: true });

    expect(readline.createInterface).not.toHaveBeenCalled();
    expect(mockedDeployStack).toHaveBeenCalledTimes(1);
  });

  describe('signal-aware lock release', () => {
    it('should release the active lock and exit(130) when SIGINT is received', async () => {
      setupAliyunMocks();
      const releaseLock = jest.fn().mockResolvedValue(undefined);
      mockedCreateStateBackend.mockReturnValue({
        withLock: jest.fn(
          (
            _op: string,
            fn: () => Promise<unknown>,
            _options?: unknown,
            onLockAcquired?: (id: string) => void,
          ) => {
            onLockAcquired?.('deploy-lock-id');
            return fn();
          },
        ),
        releaseLock,
        getState: jest.fn(),
        loadState: jest.fn().mockResolvedValue({
          version: '1',
          provider: 'tencent',
          app: 'test',
          service: 'test',
          stages: {},
          resources: {},
        }),
        setState: jest.fn(),
      });

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        return undefined as never;
      });

      let releaseDeploy: (() => void) | undefined;
      mockedDeployStack.mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            releaseDeploy = resolve;
          }),
      );

      const baselineSigint = process.listenerCount('SIGINT');
      const baselineSigterm = process.listenerCount('SIGTERM');

      const deployPromise = deploy(baseOptions);

      await new Promise<void>((resolve) => {
        const timer = setInterval(() => {
          if (releaseDeploy) {
            clearInterval(timer);
            resolve();
          }
        }, 5);
      });

      process.emit('SIGINT');

      expect(releaseLock).toHaveBeenCalledWith('deploy-lock-id');
      expect(exitSpy).toHaveBeenCalledWith(130);

      releaseDeploy?.();
      await deployPromise;

      expect(process.listenerCount('SIGINT')).toBe(baselineSigint);
      expect(process.listenerCount('SIGTERM')).toBe(baselineSigterm);

      exitSpy.mockRestore();
    });

    it('should exit(130) without releasing when no lock is acquired yet', async () => {
      setupAliyunMocks();

      const releaseLock = jest.fn();
      mockedCreateStateBackend.mockReturnValue({
        // onLockAcquired is intentionally never invoked: simulates a signal
        // arriving before the lock has been acquired.
        withLock: jest.fn((_op: string, fn: () => Promise<unknown>) => fn()),
        releaseLock,
        getState: jest.fn(),
        loadState: jest.fn().mockResolvedValue({
          version: '1',
          provider: 'tencent',
          app: 'test',
          service: 'test',
          stages: {},
          resources: {},
        }),
        setState: jest.fn(),
      });

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        return undefined as never;
      });

      let releaseDeploy: (() => void) | undefined;
      mockedDeployStack.mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            releaseDeploy = resolve;
          }),
      );

      const deployPromise = deploy(baseOptions);

      await new Promise<void>((resolve) => {
        const timer = setInterval(() => {
          if (releaseDeploy) {
            clearInterval(timer);
            resolve();
          }
        }, 5);
      });

      process.emit('SIGINT');

      expect(releaseLock).not.toHaveBeenCalled();
      expect(exitSpy).toHaveBeenCalledWith(130);

      releaseDeploy?.();
      await deployPromise;

      exitSpy.mockRestore();
    });

    it('should remove signal handlers after a normal deploy completes', async () => {
      setupAliyunMocks();
      const baselineSigint = process.listenerCount('SIGINT');
      const baselineSigterm = process.listenerCount('SIGTERM');

      await deploy(baseOptions);

      expect(process.listenerCount('SIGINT')).toBe(baselineSigint);
      expect(process.listenerCount('SIGTERM')).toBe(baselineSigterm);
    });

    it('should wire the backend event reporter into context', async () => {
      setupAliyunMocks();
      const context = { provider: 'aliyun', region: 'cn-hangzhou' };
      const reportEvent = jest.fn();
      mockedGetContext.mockReturnValue(context);
      mockedCreateStateBackend.mockReturnValue({
        ...mockBackend,
        reportEvent,
        replayOrphanedEvents: jest.fn().mockResolvedValue(undefined),
      });

      await deploy(baseOptions);

      expect(context).toHaveProperty('reportEvent', reportEvent);
    });

    it('should flush buffered events before exiting after a signal', async () => {
      setupAliyunMocks();
      const releaseLock = jest.fn().mockResolvedValue(undefined);
      const flushEvents = jest.fn().mockResolvedValue(undefined);
      mockedCreateStateBackend.mockReturnValue({
        withLock: jest.fn(
          (
            _op: string,
            fn: () => Promise<unknown>,
            _options?: unknown,
            onLockAcquired?: (id: string) => void,
          ) => {
            onLockAcquired?.('deploy-lock-id');
            return fn();
          },
        ),
        releaseLock,
        flushEvents,
        loadState: jest.fn().mockResolvedValue({ resources: {} }),
        replayOrphanedEvents: jest.fn().mockResolvedValue(undefined),
      });
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
      let releaseDeploy: (() => void) | undefined;
      mockedDeployStack.mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            releaseDeploy = resolve;
          }),
      );

      const deployPromise = deploy(baseOptions);
      await new Promise<void>((resolve) => {
        const timer = setInterval(() => {
          if (releaseDeploy) {
            clearInterval(timer);
            resolve();
          }
        }, 5);
      });

      process.emit('SIGTERM');
      await Promise.resolve();
      expect(flushEvents).toHaveBeenCalled();
      expect(exitSpy).toHaveBeenCalledWith(130);

      releaseDeploy?.();
      await deployPromise;
      exitSpy.mockRestore();
    });
  });
});

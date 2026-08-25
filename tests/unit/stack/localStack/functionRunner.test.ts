import { EventEmitter } from 'node:events';

type WorkerMock = EventEmitter & {
  postMessage: jest.Mock;
  terminate: jest.Mock;
  once: (event: string, listener: (...args: never[]) => void) => WorkerMock;
  off: (event: string, listener: (...args: never[]) => void) => WorkerMock;
};

const createWorkerMock = (): WorkerMock => {
  const worker = new EventEmitter() as WorkerMock;
  worker.postMessage = jest.fn();
  worker.terminate = jest.fn().mockResolvedValue(0);
  return worker;
};

const workers: WorkerMock[] = [];

jest.mock('node:fs', () => ({ existsSync: jest.fn().mockReturnValue(true) }));
jest.mock('node:worker_threads', () => {
  class MockMessagePort extends EventEmitter {
    close = jest.fn();
  }

  return {
    MessageChannel: class {
      port1 = new MockMessagePort();
      port2 = new MockMessagePort();

      constructor() {
        this.port2.on('message', (value) => this.port1.emit('message', value));
        this.port2.on('error', (error) => this.port1.emit('error', error));
        this.port2.on('close', () => this.port1.emit('close'));
      }
    },
    Worker: jest.fn(() => {
      const worker = createWorkerMock();
      workers.push(worker);
      return worker;
    }),
    isMainThread: true,
    parentPort: undefined,
    workerData: undefined,
  };
});

import { invokeFunction, runFunction } from '../../../../src/stack/localStack/functionRunner';

const options = {
  codeDir: '/tmp/functions',
  functionKey: 'hello',
  handler: 'index.handler',
  servicePath: '',
  timeout: 1000,
};

describe('functionRunner main-thread API', () => {
  beforeEach(() => {
    workers.length = 0;
    jest.clearAllMocks();
  });

  it('sends an event and resolves a normal worker response', async () => {
    const runner = runFunction(options, { NODE_ENV: 'test' });
    const execution = runner.execute({ value: 1 }, { requestId: 'req-1' });

    expect(workers[0]?.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ event: { value: 1 }, context: { requestId: 'req-1' } }),
      expect.any(Array),
    );

    const worker = workers[0];
    expect(worker).toBeDefined();
    const postedPort = worker?.postMessage.mock.calls[0]?.[0].port;
    postedPort.emit('message', { result: 'ok' });

    await expect(execution).resolves.toEqual({ result: 'ok' });
    await expect(runner.terminate()).resolves.toBe(0);
  });

  it('rejects when the worker sends an Error object', async () => {
    const runner = runFunction(options, {});
    const execution = runner.execute({}, {});
    const postedPort = workers[0]?.postMessage.mock.calls[0]?.[0].port;
    const error = new Error('handler failed');
    postedPort.emit('message', error);

    await expect(execution).rejects.toBe(error);
  });

  it('rejects on worker errors and ignores later messages', async () => {
    const runner = runFunction(options, {});
    const execution = runner.execute({}, {});
    const worker = workers[0];
    const postedPort = worker?.postMessage.mock.calls[0]?.[0].port;
    const error = new Error('worker failed');

    worker.emit('error', error);
    postedPort.emit('message', 'late response');

    await expect(execution).rejects.toBe(error);
  });

  it('rejects when the worker exits with a non-zero code', async () => {
    const runner = runFunction(options, {});
    const execution = runner.execute({}, {});
    workers[0]?.emit('exit', 7);

    await expect(execution).rejects.toThrow('Worker stopped with exit code 7');
  });

  it('rejects when the worker exits successfully before responding', async () => {
    const runner = runFunction(options, {});
    const execution = runner.execute({}, {});
    const postedPort = workers[0]?.postMessage.mock.calls[0]?.[0].port;
    workers[0]?.emit('exit', 0);
    postedPort.emit('close');

    await expect(execution).rejects.toThrow('Port closed before receiving response');
  });

  it('converts non-Error postMessage failures to Error objects', async () => {
    const runner = runFunction(options, {});
    const worker = workers[0];
    worker.postMessage.mockImplementation(() => {
      throw 'not an error';
    });

    await expect(runner.execute({}, {})).rejects.toThrow('not an error');
  });

  it('terminates the worker after invokeFunction resolves', async () => {
    const execution = invokeFunction(options, {}, 'event', 'context');
    const worker = workers[0];
    const postedPort = worker?.postMessage.mock.calls[0]?.[0].port;
    postedPort.emit('message', 'result');

    await expect(execution).resolves.toBe('result');
    expect(worker?.terminate).toHaveBeenCalledTimes(1);
  });

  it('terminates the worker after invokeFunction rejects', async () => {
    const execution = invokeFunction(options, {}, 'event', 'context');
    const worker = workers[0];
    worker?.emit('error', new Error('execution failed'));

    await expect(execution).rejects.toThrow('execution failed');
    expect(worker?.terminate).toHaveBeenCalledTimes(1);
  });
});

describe('functionRunner worker-thread handler', () => {
  it('loads a callback handler, reconstructs its context, and converts Uint8Array events', async () => {
    jest.resetModules();
    const parentPort = new EventEmitter();
    const workerData = {
      codeDir: 'tests/fixtures/aliyun-fc-handler',
      functionKey: 'hello',
      handler: 'index.handler',
      servicePath: '',
      timeout: 1000,
    };
    jest.doMock('node:worker_threads', () => ({
      MessageChannel: jest.fn(),
      Worker: jest.fn(),
      isMainThread: false,
      parentPort,
      workerData,
    }));

    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('../../../../src/stack/localStack/functionRunner');
    });

    const port = new EventEmitter() as EventEmitter & {
      postMessage: jest.Mock;
      close: jest.Mock;
    };
    port.postMessage = jest.fn();
    port.close = jest.fn();
    const context = {
      requestId: 'request-1',
      function: { name: 'hello' },
      service: { name: 'service' },
      tracing: {},
    };
    const event = new Uint8Array(Buffer.from(JSON.stringify({ path: '/hello' })));

    parentPort.emit('message', { event, context, port });
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(port.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: '200', isBase64Encoded: false }),
    );
    expect(port.close).toHaveBeenCalled();
  });

  it('returns an error response when the handler method is missing', async () => {
    jest.resetModules();
    const parentPort = new EventEmitter();
    jest.doMock('node:worker_threads', () => ({
      MessageChannel: jest.fn(),
      Worker: jest.fn(),
      isMainThread: false,
      parentPort,
      workerData: {
        codeDir: 'tests/fixtures/aliyun-fc-handler',
        functionKey: 'hello',
        handler: 'index.missing',
        servicePath: '',
        timeout: 1000,
      },
    }));

    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('../../../../src/stack/localStack/functionRunner');
    });

    const port = new EventEmitter() as EventEmitter & {
      postMessage: jest.Mock;
      close: jest.Mock;
    };
    port.postMessage = jest.fn();
    port.close = jest.fn();
    parentPort.emit('message', { event: {}, context: {}, port });
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(port.postMessage.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({ message: expect.stringContaining('Handler "missing" not found') }),
    );
    expect(port.close).toHaveBeenCalled();
  });
});

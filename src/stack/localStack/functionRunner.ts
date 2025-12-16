import { existsSync } from 'node:fs';
import path, { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { MessagePort } from 'node:worker_threads';
import { MessageChannel, Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { FunctionOptions } from '../../types/localStack';

type WorkerData = {
  codeDir: string;
  handler: string;
  servicePath: string;
  timeout: number;
  functionKey: string;
};

type WorkerMessage = {
  event: unknown;
  context: unknown;
  port: MessagePort;
};

type HandlerCallback = (error: Error | null, result?: unknown) => void;
type HandlerFunction = (event: unknown, context: unknown, callback?: HandlerCallback) => unknown;

// ============================================================================
// Worker Thread Code (runs in worker context)
// ============================================================================

const parseHandler = (handler: string): [string, string] => {
  const [handlerFile, handlerMethod] = handler.split('.');
  return [handlerFile, handlerMethod];
};

const resolveHandlerPath = (codeDir: string, servicePath: string, handlerFile: string): string =>
  servicePath
    ? path.resolve(servicePath, codeDir, handlerFile)
    : path.resolve(codeDir, handlerFile);

const loadHandlerModule = async (handlerPath: string): Promise<Record<string, unknown>> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(handlerPath) as Record<string, unknown>;
  } catch {
    const fileUrl = pathToFileURL(handlerPath + '.js').href;
    return (await import(fileUrl)) as Record<string, unknown>;
  }
};

const getHandlerFunction = (
  handlerModule: Record<string, unknown>,
  handlerMethod: string,
  handlerPath: string,
): HandlerFunction => {
  const handlerFn = handlerModule[handlerMethod] as HandlerFunction;

  if (typeof handlerFn !== 'function') {
    throw new Error(`Handler "${handlerMethod}" not found or is not a function in ${handlerPath}`);
  }

  return handlerFn;
};

const invokeHandler = (
  handlerFn: HandlerFunction,
  event: unknown,
  context: unknown,
): Promise<unknown> =>
  new Promise<unknown>((resolve, reject) => {
    // Callback-style handler (3+ parameters)
    if (handlerFn.length >= 3) {
      handlerFn(event, context, (error: Error | null, result?: unknown) => {
        return error ? reject(error) : resolve(result);
      });
    } else {
      return Promise.resolve(handlerFn(event, context)).then(resolve).catch(reject);
    }
  });

const createTimeoutHandler = (
  port: MessagePort,
  timeoutMs: number,
): { timeoutId: NodeJS.Timeout; clearTimer: () => void } => {
  const timeoutId = setTimeout(() => {
    port.postMessage(new Error(`Function execution timed out after ${timeoutMs}ms`));
    port.close();
  }, timeoutMs);

  return {
    timeoutId,
    clearTimer: () => clearTimeout(timeoutId),
  };
};

const executeHandler = async ({ event, context, port }: WorkerMessage): Promise<void> => {
  const { codeDir, handler, servicePath, timeout } = workerData as WorkerData;
  const { clearTimer } = createTimeoutHandler(port, timeout);

  try {
    // If context has requestId but no logger, reconstruct logger and tracing function for Aliyun FC
    let actualContext = context;
    if (
      context &&
      typeof context === 'object' &&
      'requestId' in context &&
      !('logger' in context)
    ) {
      const requestId = (context as { requestId: string }).requestId;
      const formatLog = (level: string, message: string) => {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} ${requestId} [${level}] ${message}`);
      };

      const baseContext = context as Record<string, unknown>;
      actualContext = {
        ...baseContext,
        tracing: {
          ...(baseContext.tracing as Record<string, unknown>),
          parseOpenTracingBaggages: () => ({}),
        },
        logger: {
          debug: (message: string) => formatLog('DEBUG', message),
          info: (message: string) => formatLog('INFO', message),
          warn: (message: string) => formatLog('WARNING', message),
          error: (message: string) => formatLog('ERROR', message),
          log: (message: string) => formatLog('INFO', message),
        },
      };
    }

    const [handlerFile, handlerMethod] = parseHandler(handler);
    const handlerPath = resolveHandlerPath(codeDir, servicePath, handlerFile);
    const handlerModule = await loadHandlerModule(handlerPath);
    const handlerFn = getHandlerFunction(handlerModule, handlerMethod, handlerPath);
    const result = await invokeHandler(handlerFn, event, actualContext);

    clearTimer();
    port.postMessage(result);
    port.close();
  } catch (error) {
    clearTimer();
    port.postMessage(error instanceof Error ? error : new Error(String(error)));
    port.close();
  }
};

// Initialize worker thread message handler
if (!isMainThread) {
  parentPort?.on('message', async (message: WorkerMessage) => {
    try {
      await executeHandler(message);
    } catch (error) {
      message.port.postMessage(error instanceof Error ? error : new Error(String(error)));
      message.port.close();
    }
  });
}

// ============================================================================
// Main Thread Code (functional API)
// ============================================================================

const resolveWorkerPath = (): string => {
  const localPath = join(__dirname, 'functionRunner.js');

  if (existsSync(localPath)) {
    return localPath;
  }

  // Fallback to dist directory
  const distPath = __dirname.replace(/src\/stack\/localStack$/, 'dist/src/stack/localStack');
  return join(distPath, 'functionRunner.js');
};

const createWorker = (funOptions: FunctionOptions, env: Record<string, string>): Worker => {
  const { codeDir, functionKey, handler, servicePath, timeout } = funOptions;
  const workerPath = resolveWorkerPath();

  return new Worker(workerPath, {
    env,
    workerData: {
      codeDir,
      functionKey,
      handler,
      servicePath,
      timeout,
    },
  });
};

const createMessageHandler = (
  port: MessagePort,
  resolve: (value: unknown) => void,
  reject: (error: Error) => void,
): (() => void) => {
  let resolved = false;

  const handleMessage = (value: unknown) => {
    if (resolved) return;
    resolved = true;
    return value instanceof Error ? reject(value) : resolve(value);
  };

  const handleError = (err: Error) => {
    if (resolved) return;
    resolved = true;
    reject(err);
  };

  port.on('message', handleMessage).on('error', handleError);

  return () => {
    port.off('message', handleMessage);
    port.off('error', handleError);
  };
};

const sendMessage = (
  worker: Worker,
  event: unknown,
  context: unknown,
  port2: MessagePort,
): void => {
  worker.postMessage(
    {
      context,
      event,
      port: port2,
    },
    [port2],
  );
};

export const runFunction = (funOptions: FunctionOptions, env: Record<string, string>) => {
  const worker = createWorker(funOptions, env);

  const execute = (event: unknown, context: unknown): Promise<unknown> =>
    new Promise((resolve, reject) => {
      const { port1, port2 } = new MessageChannel();
      const cleanup = createMessageHandler(port1, resolve, reject);

      try {
        sendMessage(worker, event, context, port2);
      } catch (error) {
        cleanup();
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });

  const terminate = (): Promise<number> => worker.terminate();

  return {
    execute,
    terminate,
  };
};

export const invokeFunction = async (
  funOptions: FunctionOptions,
  env: Record<string, string>,
  event: unknown,
  context: unknown,
): Promise<unknown> => {
  const runner = runFunction(funOptions, env);

  try {
    return await runner.execute(event, context);
  } finally {
    await runner.terminate();
  }
};

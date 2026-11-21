import { EventQueue } from '../../../src/common/eventQueue';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const mockSendBatch = jest.fn();

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'event-queue-test-'));
const queueDir = path.join(tmpDir, 'event-queue');

describe('EventQueue', () => {
  beforeEach(() => {
    mockSendBatch.mockReset();
    fs.rmSync(queueDir, { recursive: true, force: true });
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('write-first: event is persisted to JSONL before send, removed only after 2xx', async () => {
    const queue = new EventQueue({
      deploymentId: 'dep-1',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 2,
      flushIntervalMs: 10000,
      flushOnExit: false,
      baseRetryMs: 100,
      maxRetries: 2,
    });

    // First send keeps failing (network down) — event must remain in the JSONL file
    mockSendBatch.mockRejectedValue(new Error('network down'));
    queue.report({
      type: 'resource_pre',
      logicalId: 'functions.fn',
      action: 'create',
      sequence: 1,
    });
    await queue.flush();

    const file = path.join(queueDir, 'dep-1.jsonl');
    expect(fs.existsSync(file)).toBe(true);
    const lines = fs.readFileSync(file, 'utf8').trim().split('\n').filter(Boolean);
    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0]!)).toMatchObject({
      type: 'resource_pre',
      logicalId: 'functions.fn',
    });

    // Switch send to succeed — event removed from JSONL after 2xx
    mockSendBatch.mockReset();
    mockSendBatch.mockResolvedValue(undefined);
    await queue.flush();
    // File is removed entirely once empty (fs.rmSync), so existence=false or
    // empty content both prove the event was purged after 2xx.
    if (fs.existsSync(file)) {
      expect(fs.readFileSync(file, 'utf8').trim()).toBe('');
    }
  });

  it('flushes when batch size is reached', async () => {
    const queue = new EventQueue({
      deploymentId: 'dep-1',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 2,
      flushIntervalMs: 10000,
      flushOnExit: false,
    });
    mockSendBatch.mockResolvedValue(undefined);

    queue.report({ type: 'resource_pre', sequence: 1 });
    queue.report({ type: 'resource_complete', sequence: 2 });

    expect(mockSendBatch).toHaveBeenCalledTimes(1);
    const batch = mockSendBatch.mock.calls[0][0] as unknown[];
    expect(batch).toHaveLength(2);
    expect(batch[0]).toMatchObject({ sequence: 1 });
    expect(batch[1]).toMatchObject({ sequence: 2 });
  });

  it('batches events submitted before the first flush (no premature send)', async () => {
    const queue = new EventQueue({
      deploymentId: 'dep-1',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
      flushIntervalMs: 10000,
      flushOnExit: false,
    });
    mockSendBatch.mockResolvedValue(undefined);

    queue.report({ type: 'resource_pre', sequence: 1 });
    queue.report({ type: 'resource_complete', sequence: 2 });
    expect(mockSendBatch).not.toHaveBeenCalled();

    await queue.flush();
    expect(mockSendBatch).toHaveBeenCalledTimes(1);
    expect(mockSendBatch.mock.calls[0][0]).toHaveLength(2);
  });

  it('replays orphaned queue files from a previous run', async () => {
    fs.mkdirSync(queueDir, { recursive: true });
    fs.writeFileSync(
      path.join(queueDir, 'dep-old.jsonl'),
      JSON.stringify({ type: 'resource_pre', sequence: 1, consoleUrl: 'https://console.test' }) +
        '\n' +
        JSON.stringify({
          type: 'resource_complete',
          sequence: 2,
          consoleUrl: 'https://console.test',
        }) +
        '\n',
    );
    mockSendBatch.mockResolvedValue(undefined);

    const queue = new EventQueue({
      deploymentId: 'dep-old',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
      flushIntervalMs: 10000,
      flushOnExit: false,
      replayConsoleUrl: 'https://console.test',
    });
    await queue.replayOrphanedQueues();

    expect(mockSendBatch).toHaveBeenCalled();
    const sent = mockSendBatch.mock.calls.flatMap((c) => c[0] as unknown[]);
    expect(sent).toHaveLength(2);
  });

  it('keeps queue files whose recorded console origin does not match', async () => {
    fs.mkdirSync(queueDir, { recursive: true });
    const file = path.join(queueDir, 'other-origin.jsonl');
    fs.writeFileSync(
      file,
      `${JSON.stringify({ type: 'resource_pre', sequence: 1, consoleUrl: 'https://other.test' })}\n`,
    );
    mockSendBatch.mockResolvedValue(undefined);

    const queue = new EventQueue({
      deploymentId: 'other-origin',
      queueDir,
      sendBatch: mockSendBatch,
      replayConsoleUrl: 'https://console.test',
    });
    await queue.replayOrphanedQueues();

    expect(mockSendBatch).not.toHaveBeenCalled();
    expect(fs.existsSync(file)).toBe(true);
  });

  it('restores a replay file when the send fails and no writer recreated it', async () => {
    fs.mkdirSync(queueDir, { recursive: true });
    const file = path.join(queueDir, 'failed-origin.jsonl');
    fs.writeFileSync(
      file,
      `${JSON.stringify({ type: 'failed', sequence: 1, consoleUrl: 'https://console.test' })}\n`,
    );
    mockSendBatch.mockRejectedValue(new Error('replay failed'));
    const queue = new EventQueue({
      deploymentId: 'failed-origin',
      queueDir,
      sendBatch: mockSendBatch,
      maxRetries: 1,
      replayConsoleUrl: 'https://console.test',
    });

    await queue.replayOrphanedQueues();

    const mockedLogger = jest.requireMock('../../../src/common/logger') as {
      logger: { warn: jest.Mock };
    };
    expect(fs.existsSync(file)).toBe(true);
    expect(mockedLogger.logger.warn).toHaveBeenCalledWith('EVENT_REPLAY_FAILED');
  });

  it('flushOnExit sends remaining events with a bounded timeout', async () => {
    const queue = new EventQueue({
      deploymentId: 'dep-1',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
      flushIntervalMs: 10000,
      flushOnExit: true,
    });
    mockSendBatch.mockResolvedValue(undefined);

    queue.report({ type: 'diagnostic', message: 'final', sequence: 1 });
    await queue.flushOnExit();

    expect(mockSendBatch).toHaveBeenCalledTimes(1);
    expect(mockSendBatch.mock.calls[0][0]).toHaveLength(1);
  });

  it('flushOnExit drains events reported while a heartbeat flush is in flight', async () => {
    let releaseInFlight!: () => void;
    const inFlight = new Promise<void>((resolve) => {
      releaseInFlight = resolve;
    });
    mockSendBatch.mockImplementationOnce(() => inFlight).mockResolvedValue(undefined);
    const queue = new EventQueue({
      deploymentId: 'dep-race',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
      flushIntervalMs: 10000,
      flushOnExit: true,
    });

    queue.report({ type: 'first', sequence: 1 });
    const heartbeat = queue.flush();
    queue.report({ type: 'second', sequence: 2 });
    const exitFlush = queue.flushOnExit();

    releaseInFlight();
    await heartbeat;
    await exitFlush;

    expect(mockSendBatch).toHaveBeenCalledTimes(2);
    expect(mockSendBatch.mock.calls[1][0]).toEqual([{ type: 'second', sequence: 2 }]);
    expect(queue.pendingCount).toBe(0);
  });
});

jest.mock('../../../src/common/retryUtils', () => ({
  sleep: jest.fn().mockResolvedValue(undefined),
}));

describe('EventQueue uncovered paths', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fs.rmSync(queueDir, { recursive: true, force: true });
  });

  it('removes empty orphan files without sending a batch', async () => {
    fs.mkdirSync(queueDir, { recursive: true });
    const emptyFile = path.join(queueDir, 'empty.jsonl');
    fs.writeFileSync(emptyFile, '\n');
    const queue = new EventQueue({ deploymentId: 'dep-empty', queueDir, sendBatch: mockSendBatch });

    await queue.replayOrphanedQueues();

    expect(fs.existsSync(emptyFile)).toBe(false);
    expect(mockSendBatch).not.toHaveBeenCalled();
  });

  it('logs a warning and retains an orphan file when replay fails', async () => {
    fs.mkdirSync(queueDir, { recursive: true });
    const orphanFile = path.join(queueDir, 'failed.jsonl');
    fs.writeFileSync(
      orphanFile,
      `${JSON.stringify({ type: 'failed', sequence: 1, consoleUrl: 'https://console.test' })}\n`,
    );
    mockSendBatch.mockRejectedValue(new Error('replay failed'));
    const queue = new EventQueue({
      deploymentId: 'dep-failed',
      queueDir,
      sendBatch: mockSendBatch,
      maxRetries: 1,
      replayConsoleUrl: 'https://console.test',
    });

    await queue.replayOrphanedQueues();

    const mockedLogger = jest.requireMock('../../../src/common/logger') as {
      logger: { warn: jest.Mock };
    };
    expect(fs.existsSync(orphanFile)).toBe(true);
    expect(mockedLogger.logger.warn).toHaveBeenCalledWith('EVENT_REPLAY_FAILED');
  });

  it('does not retry a batch the server rejected as a client error', async () => {
    fs.mkdirSync(queueDir, { recursive: true });
    const clientError = new Error('unknown field');
    (clientError as unknown as { status: number }).status = 400;
    mockSendBatch.mockRejectedValue(clientError);
    const queue = new EventQueue({
      deploymentId: 'dep-4xx',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
      baseRetryMs: 25,
      maxRetries: 3,
    });
    queue.report({ type: 'bad' });

    await queue.flush();

    // Permanently rejected: it leaves the pending queue for this run (no more
    // retries) but stays in the JSONL file for inspection.
    expect(mockSendBatch).toHaveBeenCalledTimes(1);
    expect(queue.pendingCount).toBe(0);
    expect(fs.existsSync(path.join(queueDir, 'dep-4xx.jsonl'))).toBe(true);
    const mockedLogger = jest.requireMock('../../../src/common/logger') as {
      logger: { warn: jest.Mock };
    };
    expect(mockedLogger.logger.warn).toHaveBeenCalledWith('EVENT_BATCH_REJECTED');
  });

  it('passes an abort signal down to the batch sender', async () => {
    mockSendBatch.mockImplementation(
      async (_events: unknown, requestOptions?: { signal?: AbortSignal }) => {
        expect(requestOptions?.signal).toBeInstanceOf(AbortSignal);
      },
    );
    const queue = new EventQueue({
      deploymentId: 'dep-signal',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
    });
    queue.report({ type: 'signalled' });

    const controller = new AbortController();
    await queue.flush({ signal: controller.signal });
    expect(mockSendBatch).toHaveBeenCalledTimes(1);
  });

  it('aborts in-flight requests at the exit deadline and keeps the batch for the next run', async () => {
    mockSendBatch.mockImplementation(
      (_events: unknown, requestOptions?: { signal?: AbortSignal }) =>
        new Promise((_resolve, reject) => {
          requestOptions?.signal?.addEventListener('abort', () => {
            const abortError = new Error('aborted');
            abortError.name = 'AbortError';
            reject(abortError);
          });
        }),
    );
    const queue = new EventQueue({
      deploymentId: 'dep-abort',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
      flushIntervalMs: 10000,
      flushOnExit: true,
      exitTimeoutMs: 150,
    });
    queue.report({ type: 'slow', sequence: 1 });

    await queue.flushOnExit();

    // The hung request never confirmed delivery — the batch stays queued and
    // on disk for the next run's replay.
    expect(queue.pendingCount).toBe(1);
    expect(fs.existsSync(path.join(queueDir, 'dep-abort.jsonl'))).toBe(true);
  });

  it('rewrites unsent JSONL entries after a partial flush', async () => {
    fs.mkdirSync(queueDir, { recursive: true });
    const file = path.join(queueDir, 'dep-partial.jsonl');
    fs.writeFileSync(file, `${JSON.stringify({ type: 'old' })}\n`);
    mockSendBatch.mockResolvedValue(undefined);
    const queue = new EventQueue({
      deploymentId: 'dep-partial',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
    });

    queue.report({ type: 'new' });
    await queue.flush();

    expect(fs.readFileSync(file, 'utf8')).toBe(`${JSON.stringify({ type: 'old' })}\n`);
  });

  it('flushes pending events when the interval elapses', async () => {
    jest.useFakeTimers();
    mockSendBatch.mockResolvedValue(undefined);
    const queue = new EventQueue({
      deploymentId: 'dep-interval',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
      flushIntervalMs: 100,
    });
    queue.report({ type: 'interval' });

    await jest.advanceTimersByTimeAsync(100);

    expect(mockSendBatch).toHaveBeenCalledWith([{ type: 'interval' }], { signal: undefined });
    jest.useRealTimers();
  });

  it('retries failed sends with bounded backoff before succeeding', async () => {
    mockSendBatch.mockRejectedValueOnce(new Error('temporary')).mockResolvedValueOnce(undefined);
    const queue = new EventQueue({
      deploymentId: 'dep-retry',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
      baseRetryMs: 25,
      maxRetries: 2,
    });
    queue.report({ type: 'retry' });

    await queue.flush();

    expect(mockSendBatch).toHaveBeenCalledTimes(2);
    expect(queue.pendingCount).toBe(0);
  });

  it('registers signal handlers that initiate the final flush', async () => {
    const onceSpy = jest.spyOn(process, 'once');
    mockSendBatch.mockResolvedValue(undefined);
    const queue = new EventQueue({
      deploymentId: 'dep-signal',
      queueDir,
      sendBatch: mockSendBatch,
      batchSize: 10,
      flushOnExit: true,
    });
    queue.report({ type: 'signal' });

    const signalRegistration = onceSpy.mock.calls.find(([signal]) => signal === 'SIGINT');
    const handler = signalRegistration?.[1];
    expect(typeof handler).toBe('function');
    if (typeof handler === 'function') {
      handler();
      await Promise.resolve();
      await Promise.resolve();
    }

    expect(mockSendBatch).toHaveBeenCalledWith(
      [{ type: 'signal' }],
      expect.objectContaining({ signal: expect.anything() }),
    );
    onceSpy.mockRestore();
  });
});

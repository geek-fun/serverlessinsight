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
      JSON.stringify({ type: 'resource_pre', sequence: 1 }) +
        '\n' +
        JSON.stringify({ type: 'resource_complete', sequence: 2 }) +
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
    });
    await queue.replayOrphanedQueues();

    expect(mockSendBatch).toHaveBeenCalled();
    const sent = mockSendBatch.mock.calls.flatMap((c) => c[0] as unknown[]);
    expect(sent).toHaveLength(2);
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
    fs.writeFileSync(orphanFile, `${JSON.stringify({ type: 'failed' })}\n`);
    mockSendBatch.mockRejectedValue(new Error('replay failed'));
    const queue = new EventQueue({
      deploymentId: 'dep-failed',
      queueDir,
      sendBatch: mockSendBatch,
      maxRetries: 1,
    });

    await queue.replayOrphanedQueues();

    const mockedLogger = jest.requireMock('../../../src/common/logger') as {
      logger: { warn: jest.Mock };
    };
    expect(fs.existsSync(orphanFile)).toBe(true);
    expect(mockedLogger.logger.warn).toHaveBeenCalledWith('EVENT_REPLAY_FAILED');
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

    expect(mockSendBatch).toHaveBeenCalledWith([{ type: 'interval' }]);
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

    expect(mockSendBatch).toHaveBeenCalledWith([{ type: 'signal' }]);
    onceSpy.mockRestore();
  });
});

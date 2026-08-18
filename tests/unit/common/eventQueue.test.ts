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

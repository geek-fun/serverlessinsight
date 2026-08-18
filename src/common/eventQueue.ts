import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { logger } from './logger';
import { lang } from '../lang';
import { sleep } from './retryUtils';

/**
 * A typed deployment event (ADR-005 discriminated union).
 * `sequence` is client-generated and monotonic within a deployment.
 */
export type DeploymentEventRecord = {
  type: string;
  logicalId?: string;
  resourceType?: string;
  action?: string;
  message?: string;
  severity?: 'info' | 'warn' | 'error';
  error?: { code?: string; message: string; details?: unknown };
  durationMs?: number;
  sequence?: number;
  [k: string]: unknown;
};

export type SendBatchFn = (events: DeploymentEventRecord[]) => Promise<void>;

export type EventQueueOptions = {
  deploymentId: string;
  queueDir?: string;
  sendBatch: SendBatchFn;
  /** Flush when this many events accumulate. */
  batchSize?: number;
  /** Heartbeat: flush at least this often. */
  flushIntervalMs?: number;
  /** Attempt a bounded final flush on process exit. */
  flushOnExit?: boolean;
  /** Retry backoff between failed send attempts (ms). */
  baseRetryMs?: number;
  /** Max send attempts before giving up (events stay in the JSONL queue). */
  maxRetries?: number;
};

const DEFAULT_QUEUE_DIR = path.join(os.homedir(), '.serverlessinsight', 'event-queue');
const DEFAULT_BATCH_SIZE = 20;
const DEFAULT_FLUSH_INTERVAL_MS = 5000;
const DEFAULT_MAX_RETRIES = 3;
const EXIT_FLUSH_TIMEOUT_MS = 3000;

export class EventQueue {
  private readonly deploymentId: string;
  private readonly queueDir: string;
  private readonly sendBatch: SendBatchFn;
  private readonly batchSize: number;
  private readonly flushIntervalMs: number;
  private readonly baseRetryMs: number;
  private readonly maxRetries: number;

  private readonly pending: DeploymentEventRecord[] = [];
  private readonly filePath: string;
  private lastFlushAt = 0;
  private flushing = false;
  private intervalTimer: NodeJS.Timeout | null = null;

  constructor(options: EventQueueOptions) {
    this.deploymentId = options.deploymentId;
    this.queueDir = options.queueDir ?? DEFAULT_QUEUE_DIR;
    this.sendBatch = options.sendBatch;
    this.batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
    this.flushIntervalMs = options.flushIntervalMs ?? DEFAULT_FLUSH_INTERVAL_MS;
    this.baseRetryMs = options.baseRetryMs ?? 1000;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.filePath = path.join(this.queueDir, `${this.deploymentId}.jsonl`);

    if (options.flushOnExit) {
      this.installExitHandlers();
    }

    this.intervalTimer = setInterval(() => {
      void this.maybeFlushByInterval();
    }, this.flushIntervalMs);
    this.intervalTimer.unref?.();
  }

  /** Enqueue an event — write-first to the JSONL file, then try to flush. */
  report(event: DeploymentEventRecord): void {
    this.appendToFile([event]);
    this.pending.push(event);
    if (this.pending.length >= this.batchSize) {
      void this.flush();
    }
  }

  /** Flush pending events now (bounded by backoff on failure). */
  async flush(): Promise<void> {
    if (this.flushing) return;
    if (this.pending.length === 0) return;

    this.flushing = true;
    const batch = this.pending.splice(0, this.pending.length);
    try {
      await this.sendWithRetry(batch);
      this.removeFromFile(batch);
      this.lastFlushAt = Date.now();
    } catch (error) {
      // Send failed — restore the batch to the pending queue; it remains in
      // the JSONL file and will be retried on the next flush / run.
      this.pending.unshift(...batch);
      logger.warn(
        lang.__('EVENT_FLUSH_FAILED', {
          deploymentId: this.deploymentId,
          count: String(batch.length),
          error: error instanceof Error ? error.message : String(error),
        }),
      );
    } finally {
      this.flushing = false;
    }
  }

  /** Bounded final flush for process exit (SIGINT/SIGTERM / normal exit). */
  async flushOnExit(): Promise<void> {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    if (this.pending.length === 0) return;
    await Promise.race([this.flush(), sleep(EXIT_FLUSH_TIMEOUT_MS).then(() => undefined)]);
  }

  /** Replay orphaned queue files left by a previous (interrupted) run. */
  async replayOrphanedQueues(): Promise<void> {
    if (!fs.existsSync(this.queueDir)) return;
    const files = fs.readdirSync(this.queueDir).filter((f) => f.endsWith('.jsonl'));
    for (const file of files) {
      const filePath = path.join(this.queueDir, file);
      const events = this.readFile(filePath);
      if (events.length === 0) {
        fs.rmSync(filePath, { force: true });
        continue;
      }
      try {
        await this.sendWithRetry(events);
        fs.rmSync(filePath, { force: true });
      } catch (error) {
        logger.warn(
          lang.__('EVENT_REPLAY_FAILED', {
            file,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      }
    }
  }

  get pendingCount(): number {
    return this.pending.length;
  }

  private async maybeFlushByInterval(): Promise<void> {
    if (this.pending.length === 0) return;
    if (Date.now() - this.lastFlushAt >= this.flushIntervalMs) {
      await this.flush();
    }
  }

  private async sendWithRetry(batch: DeploymentEventRecord[]): Promise<void> {
    let attempt = 0;
    for (;;) {
      try {
        await this.sendBatch(batch);
        return;
      } catch (error) {
        attempt += 1;
        if (attempt >= this.maxRetries) {
          throw error;
        }
        const delay = this.baseRetryMs * 2 ** (attempt - 1);
        await sleep(Math.min(delay, 30000));
      }
    }
  }

  private appendToFile(events: DeploymentEventRecord[]): void {
    fs.mkdirSync(this.queueDir, { recursive: true });
    const lines = events.map((e) => JSON.stringify(e)).join('\n') + '\n';
    fs.appendFileSync(this.filePath, lines, 'utf8');
  }

  private removeFromFile(events: DeploymentEventRecord[]): void {
    if (!fs.existsSync(this.filePath)) return;
    const sent = new Set(events.map((e) => JSON.stringify(e)));
    const remaining = this.readFile(this.filePath).filter((e) => !sent.has(JSON.stringify(e)));
    if (remaining.length === 0) {
      fs.rmSync(this.filePath, { force: true });
    } else {
      fs.writeFileSync(
        this.filePath,
        remaining.map((e) => JSON.stringify(e)).join('\n') + '\n',
        'utf8',
      );
    }
  }

  private readFile(filePath: string): DeploymentEventRecord[] {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    return content
      .split('\n')
      .filter((l) => l.trim().length > 0)
      .map((l) => JSON.parse(l) as DeploymentEventRecord);
  }

  private installExitHandlers(): void {
    const onExit = (): void => {
      void this.flushOnExit();
    };
    process.once('SIGINT', onExit);
    process.once('SIGTERM', onExit);
  }
}

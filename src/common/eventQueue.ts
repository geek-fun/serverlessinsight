import * as fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import * as os from 'node:os';
import * as path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { logger } from './logger';
import { lang } from '../lang';

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
  /** ISO-8601 instant when the event happened; stamped at emit time, never at flush time. */
  occurredAt?: string;
  /** Delivery version chosen before spooling. Replay uses this version. */
  deploymentEventsProtocol?: 1 | 2;
  [k: string]: unknown;
};

export type SendBatchFn = (
  events: DeploymentEventRecord[],
  requestOptions?: { signal?: AbortSignal },
) => Promise<void>;

export type EventQueueOptions = {
  deploymentId: string;
  queueDir?: string;
  sendBatch: SendBatchFn;
  /** Flush when this many events accumulate. */
  batchSize?: number;
  /** Heartbeat: flush at least this often. */
  flushIntervalMs?: number;
  /** Retry backoff between failed send attempts (ms). */
  baseRetryMs?: number;
  /** Max send attempts before giving up (events stay in the JSONL queue). */
  maxRetries?: number;
  /** Console origin the queue was written against; replay skips files from other origins. */
  replayConsoleUrl?: string;
  /** Exit flush deadline (ms); in-flight requests abort at the deadline. */
  exitTimeoutMs?: number;
  /** Startup replay budget (ms); replay requests abort past it. */
  replayBudgetMs?: number;
};

const DEFAULT_QUEUE_DIR = path.join(os.homedir(), '.serverlessinsight', 'event-queue', 'v2');
const DEFAULT_BATCH_SIZE = 20;
const DEFAULT_FLUSH_INTERVAL_MS = 5000;
const DEFAULT_MAX_RETRIES = 3;
const EXIT_FLUSH_TIMEOUT_MS = 3000;
const EXIT_FLUSH_RETRY_MS = 200;
const REPLAY_BUDGET_MS = 3000;
const SEND_TIMEOUT_MS = 15000;

/** Client errors are permanent for a batch (unknown field, version mismatch,
 * sequence conflict) — retrying would never succeed. */
const isPermanentRejection = (error: unknown): boolean => {
  const status = (error as { status?: number } | null)?.status;
  return (
    typeof status === 'number' && status >= 400 && status < 500 && status !== 408 && status !== 429
  );
};

const replayOwnerIsAlive = (pid: number): boolean => {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code !== 'ESRCH';
  }
};

export class EventQueue {
  private readonly deploymentId: string;
  private readonly queueDir: string;
  private readonly sendBatch: SendBatchFn;
  private readonly batchSize: number;
  private readonly flushIntervalMs: number;
  private readonly baseRetryMs: number;
  private readonly maxRetries: number;
  private readonly replayConsoleUrl: string | undefined;
  private readonly exitTimeoutMs: number;
  private readonly replayBudgetMs: number;

  private readonly pending: DeploymentEventRecord[] = [];
  private readonly filePath: string;
  private lastFlushAt = 0;
  private inFlight: { promise: Promise<void>; controller: AbortController } | null = null;
  private finalFlush: Promise<void> | undefined;
  private intervalTimer: NodeJS.Timeout | null = null;

  constructor(options: EventQueueOptions) {
    this.deploymentId = options.deploymentId;
    this.queueDir = options.queueDir ?? DEFAULT_QUEUE_DIR;
    this.sendBatch = options.sendBatch;
    this.batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
    this.flushIntervalMs = options.flushIntervalMs ?? DEFAULT_FLUSH_INTERVAL_MS;
    this.baseRetryMs = options.baseRetryMs ?? 1000;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.replayConsoleUrl = options.replayConsoleUrl;
    this.exitTimeoutMs = options.exitTimeoutMs ?? EXIT_FLUSH_TIMEOUT_MS;
    this.replayBudgetMs = options.replayBudgetMs ?? REPLAY_BUDGET_MS;
    this.filePath = path.join(
      this.queueDir,
      `${this.deploymentId}.writer.${process.pid}.${randomUUID()}.jsonl`,
    );

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
  flush(requestOptions?: { signal?: AbortSignal }): Promise<void> {
    if (this.inFlight) return this.inFlight.promise;
    if (this.pending.length === 0) return Promise.resolve();

    const controller = new AbortController();
    const signal = AbortSignal.any([
      controller.signal,
      AbortSignal.timeout(SEND_TIMEOUT_MS),
      ...(requestOptions?.signal ? [requestOptions.signal] : []),
    ]);
    const batch = this.pending.splice(0, this.pending.length);
    const promise = this.sendPending(batch, signal).finally(() => {
      this.inFlight = null;
    });
    this.inFlight = { controller, promise };
    return promise;
  }

  private async sendPending(batch: DeploymentEventRecord[], signal: AbortSignal): Promise<void> {
    try {
      await this.sendWithRetry(batch, signal);
      this.removeFromFile(batch);
      this.lastFlushAt = Date.now();
    } catch (error) {
      if (isPermanentRejection(error)) {
        // Server rejected the batch permanently (version mismatch, sequence
        // conflict, …) — stop retrying it for this run. The records stay in
        // the JSONL queue for inspection.
        logger.warn(
          lang.__('EVENT_BATCH_REJECTED', {
            deploymentId: this.deploymentId,
            count: String(batch.length),
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      } else {
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
      }
    }
  }

  /** Bounded final flush for process exit (SIGINT/SIGTERM / normal exit). */
  flushOnExit(): Promise<void> {
    return (this.finalFlush ??= this.drainOnExit());
  }

  private async drainOnExit(): Promise<void> {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    const signal = AbortSignal.timeout(this.exitTimeoutMs);
    const abortCurrentSend = (): void => this.inFlight?.controller.abort(signal.reason);
    signal.addEventListener('abort', abortCurrentSend, { once: true });
    try {
      while (!signal.aborted && (this.inFlight || this.pending.length > 0)) {
        await this.flush({ signal });
        if (this.pending.length > 0 && !signal.aborted) {
          await delay(EXIT_FLUSH_RETRY_MS, undefined, { signal });
        }
      }
    } catch (error) {
      if (!signal.aborted) throw error;
    } finally {
      signal.removeEventListener('abort', abortCurrentSend);
    }
  }

  /**
   * Replay orphaned queue files left by a previous (interrupted) run.
   * Live writers retain their own files. Replay claims retired files by
   * rename, and another process can reclaim them if the replay worker exits.
   * Files without a matching console origin (or legacy rows without one) are
   * preserved for explicit recovery. Bounded by a time budget; leftovers wait
   * for the next run.
   */
  async replayOrphanedQueues(): Promise<void> {
    this.warnAboutLegacyQueueFiles();
    if (!fs.existsSync(this.queueDir)) return;
    const files = fs.readdirSync(this.queueDir);
    const signal = AbortSignal.timeout(this.replayBudgetMs);
    const deadline = performance.now() + this.replayBudgetMs;
    for (const file of files) {
      if (signal.aborted || performance.now() >= deadline) break;
      const previousClaim = /^(.+\.jsonl)\.replaying(?:\.(\d+)\.[\w-]+)?$/.exec(file);
      if (!file.endsWith('.jsonl') && !previousClaim) continue;
      const owner = previousClaim?.[2] ?? /\.writer\.(\d+)\.[\w-]+\.jsonl$/.exec(file)?.[1];
      if (owner && replayOwnerIsAlive(Number(owner))) continue;

      const originalPath = path.join(this.queueDir, previousClaim?.[1] ?? file);
      const filePath = path.join(this.queueDir, file);
      const claimedPath = `${originalPath}.replaying.${process.pid}.${randomUUID()}`;
      try {
        fs.renameSync(filePath, claimedPath);
      } catch {
        continue;
      }
      try {
        const events = this.readFile(claimedPath);
        const replayable = events.filter((event) => this.isReplayable(event, file));
        if (replayable.length > 0) {
          await this.sendWithRetry(replayable, signal);
        }
        const sent = new Set(replayable.map((event) => JSON.stringify(event)));
        this.saveRemaining(
          claimedPath,
          events.filter((event) => !sent.has(JSON.stringify(event))),
        );
      } catch (error) {
        logger.warn(
          lang.__('EVENT_REPLAY_FAILED', {
            file,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      }
      this.releaseReplayClaim(claimedPath);
    }
  }

  private isReplayable(event: DeploymentEventRecord, file: string): boolean {
    const origin = event.consoleUrl as string | undefined;
    if (!origin || !this.replayConsoleUrl) return false;
    if (origin !== this.replayConsoleUrl) {
      logger.warn(lang.__('EVENT_REPLAY_ORIGIN_MISMATCH', { file }));
      return false;
    }
    return true;
  }

  /** Pre-v2 queues live in the parent directory; their origin is unrecorded. */
  private warnAboutLegacyQueueFiles(): void {
    const legacyDir = path.dirname(this.queueDir);
    if (legacyDir === this.queueDir || !fs.existsSync(legacyDir)) return;
    const legacyFiles = fs
      .readdirSync(legacyDir)
      .filter((f) => f.endsWith('.jsonl') && !f.endsWith('.replaying'));
    if (legacyFiles.length > 0) {
      logger.warn(lang.__('EVENT_LEGACY_QUEUE_PRESERVED', { count: String(legacyFiles.length) }));
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

  private async sendWithRetry(batch: DeploymentEventRecord[], signal: AbortSignal): Promise<void> {
    let attempt = 0;
    for (;;) {
      try {
        signal.throwIfAborted();
        await this.sendUntilAborted(batch, signal);
        return;
      } catch (error) {
        // Deadline cancellation: leave the batch for the next run, no retries.
        if (signal.aborted) throw error;
        if (isPermanentRejection(error)) {
          throw error;
        }
        attempt += 1;
        if (attempt >= this.maxRetries) {
          throw error;
        }
        const retryDelay = this.baseRetryMs * 2 ** (attempt - 1);
        await delay(Math.min(retryDelay, 30000), undefined, { signal });
      }
    }
  }

  private async sendUntilAborted(
    batch: DeploymentEventRecord[],
    signal: AbortSignal,
  ): Promise<void> {
    let abort!: () => void;
    const aborted = new Promise<never>((_resolve, reject) => {
      abort = () => reject(signal.reason);
      signal.addEventListener('abort', abort, { once: true });
    });
    try {
      await Promise.race([this.sendBatch(batch, { signal }), aborted]);
    } finally {
      signal.removeEventListener('abort', abort);
    }
  }

  private releaseReplayClaim(claimedPath: string): void {
    if (!fs.existsSync(claimedPath)) return;
    try {
      // A writer may have recreated the original filename. Release any
      // remaining events as an independent queue to avoid replacing it.
      fs.renameSync(claimedPath, path.join(this.queueDir, `retained.${randomUUID()}.jsonl`));
    } catch (error) {
      logger.warn(lang.__('EVENT_REPLAY_FAILED', { file: claimedPath, error: String(error) }));
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
    this.saveRemaining(this.filePath, remaining);
  }

  private saveRemaining(filePath: string, remaining: DeploymentEventRecord[]): void {
    if (remaining.length === 0) {
      fs.rmSync(filePath, { force: true });
    } else {
      const temporaryPath = `${filePath}.${randomUUID()}.tmp`;
      fs.writeFileSync(
        temporaryPath,
        remaining.map((e) => JSON.stringify(e)).join('\n') + '\n',
        'utf8',
      );
      fs.renameSync(temporaryPath, filePath);
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
}

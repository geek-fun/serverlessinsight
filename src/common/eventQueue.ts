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
  /** ISO-8601 instant when the event happened; stamped at emit time, never at flush time. */
  occurredAt?: string;
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
  /** Attempt a bounded final flush on process exit. */
  flushOnExit?: boolean;
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

/** Client errors are permanent for a batch (unknown field, version mismatch,
 * sequence conflict) — retrying would never succeed. */
const isPermanentRejection = (error: unknown): boolean => {
  const status = (error as { status?: number }).status;
  return (
    typeof status === 'number' && status >= 400 && status < 500 && status !== 408 && status !== 429
  );
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
    this.replayConsoleUrl = options.replayConsoleUrl;
    this.exitTimeoutMs = options.exitTimeoutMs ?? EXIT_FLUSH_TIMEOUT_MS;
    this.replayBudgetMs = options.replayBudgetMs ?? REPLAY_BUDGET_MS;
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
  async flush(requestOptions?: { signal?: AbortSignal }): Promise<void> {
    if (this.flushing) return;
    if (this.pending.length === 0) return;

    this.flushing = true;
    const batch = this.pending.splice(0, this.pending.length);
    try {
      await this.sendWithRetry(batch, requestOptions?.signal);
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
    const deadline = Date.now() + this.exitTimeoutMs;
    // In-flight requests are cancelled at the deadline instead of blocking
    // process exit on a hung connection.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.max(this.exitTimeoutMs, 0));
    timer.unref?.();
    try {
      while (this.pending.length > 0 && !controller.signal.aborted && Date.now() < deadline) {
        // A heartbeat flush may be in flight; flush() no-ops while it holds the
        // flag, so re-attempt after a short wait instead of giving up.
        await this.flush({ signal: controller.signal });
        if (this.pending.length > 0 && !controller.signal.aborted && Date.now() < deadline) {
          await sleep(Math.min(EXIT_FLUSH_RETRY_MS, deadline - Date.now()));
        }
      }
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Replay orphaned queue files left by a previous (interrupted) run.
   * Each file is atomically claimed by rename, so a concurrent writer keeps
   * appending to the original path while the replay works on the snapshot.
   * Files without a matching console origin (or legacy rows without one) are
   * preserved for explicit recovery. Bounded by a time budget; leftovers wait
   * for the next run.
   */
  async replayOrphanedQueues(): Promise<void> {
    this.warnAboutLegacyQueueFiles();
    if (!fs.existsSync(this.queueDir)) return;
    const files = fs.readdirSync(this.queueDir).filter((f) => f.endsWith('.jsonl'));
    const deadline = Date.now() + this.replayBudgetMs;
    for (const file of files) {
      if (Date.now() >= deadline) break;
      const filePath = path.join(this.queueDir, file);
      const claimedPath = `${filePath}.replaying`;
      if (fs.existsSync(claimedPath)) continue;
      try {
        fs.renameSync(filePath, claimedPath);
      } catch {
        continue;
      }
      const events = this.readFile(claimedPath);
      if (events.length === 0) {
        fs.rmSync(claimedPath, { force: true });
        continue;
      }
      const replayable = events.filter((e) => this.isReplayable(e, file));
      if (replayable.length === 0) {
        // Nothing deliverable (no origin recorded, or all from other origins)
        // — restore the file for explicit recovery instead of discarding it.
        if (!fs.existsSync(filePath)) fs.renameSync(claimedPath, filePath);
        continue;
      }
      // Each file's delivery is cancellable within the remaining budget.
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), Math.max(deadline - Date.now(), 0));
      timer.unref?.();
      try {
        await this.sendWithRetry(replayable, controller.signal);
        // Deliver only the replayed subset; keep anything appended or skipped.
        const sent = new Set(replayable.map((e) => JSON.stringify(e)));
        const remaining = this.readFile(claimedPath).filter((e) => !sent.has(JSON.stringify(e)));
        if (remaining.length === 0) {
          fs.rmSync(claimedPath, { force: true });
        } else {
          fs.writeFileSync(
            claimedPath,
            remaining.map((e) => JSON.stringify(e)).join('\n') + '\n',
            'utf8',
          );
        }
      } catch (error) {
        logger.warn(
          lang.__('EVENT_REPLAY_FAILED', {
            file,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
        // A writer may have recreated the original file while we were sending;
        // only restore the snapshot when that has not happened, otherwise keep
        // the claimed file for explicit recovery.
        if (!fs.existsSync(filePath)) {
          fs.renameSync(claimedPath, filePath);
        }
      } finally {
        clearTimeout(timer);
      }
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

  private async sendWithRetry(batch: DeploymentEventRecord[], signal?: AbortSignal): Promise<void> {
    let attempt = 0;
    for (;;) {
      try {
        await this.sendBatch(batch, { signal });
        return;
      } catch (error) {
        // Deadline cancellation: leave the batch for the next run, no retries.
        if (signal?.aborted) throw error;
        if (isPermanentRejection(error)) {
          throw error;
        }
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

export type LockMetadata = {
  id: string;
  user: string;
  processId: number;
  hostname: string;
  operation: string;
  acquiredAt: string;
  path: string;
};

export type LockOptions = {
  timeout?: number; // milliseconds, default 10 minutes
  retryDelay?: number; // milliseconds, base delay for exponential backoff, default 2000
  maxRetries?: number; // default calculated from timeout
};

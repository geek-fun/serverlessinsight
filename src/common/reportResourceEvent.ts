import type { Context } from '../types';
import type { DeploymentEventRecord } from './eventQueue';

/** ADR-005: emit a resource lifecycle event via context.reportEvent (no-op if unwired). */
export const reportResourceEvent = (
  context: Context,
  event: Omit<DeploymentEventRecord, 'type'> & { type: string },
): void => {
  context.reportEvent?.(event);
};

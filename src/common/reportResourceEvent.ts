import type { Context } from '../types';
import type { DeploymentEventRecord } from './eventQueue';

/** ADR-005: emit a resource lifecycle event via context.reportEvent (no-op if unwired).
 *  Noop plan items change nothing, so their pre event is skipped — the timeline only
 *  shows resources that were actually acted on, matching the Changes tab. */
export const reportResourceEvent = (
  context: Context,
  event: Omit<DeploymentEventRecord, 'type'> & { type: string },
): void => {
  if (event.type === 'resource_pre' && event.action === 'noop') return;
  context.reportEvent?.(event);
};

import crypto from 'node:crypto';

import type { DeploymentScope } from './stateScope';
import type { StateFile } from '../types';

/** Regional identity and content-hash CAS shared by all SaaS commands. */
export const SCOPE_PROTOCOL_VERSION = 2;

/** JSONB can reorder keys; content identity must survive a server round trip. */
export const hashSaasState = (state: unknown): string =>
  crypto
    .createHash('sha256')
    .update(
      JSON.stringify(state, (_key, value: unknown) =>
        value && typeof value === 'object' && !Array.isArray(value)
          ? Object.fromEntries(
              Object.keys(value)
                .sort()
                .map((key) => [key, (value as Record<string, unknown>)[key]]),
            )
          : value,
      ),
    )
    .digest('hex');

export const supportsRegionalSaas = (value: unknown): boolean => {
  const caps = value as Record<string, unknown> | null;
  return (
    caps?.regionalScope === true &&
    caps.scopeProtocol === SCOPE_PROTOCOL_VERSION &&
    caps.stateFormat === '4.0'
  );
};

export type SaasStateSnapshot = {
  id: string;
  serviceId: string;
  stageId: string;
  stage: string;
  region: string;
  scopeProtocol: number;
  contentHash: string;
  versionNumber: number;
  stateJson: StateFile;
};

/** Scope authority is server metadata, independent of historical JSON format. */
export const isRegionalSaasSnapshot = (
  snapshot: Partial<SaasStateSnapshot> | null | undefined,
  scope: DeploymentScope,
): snapshot is SaasStateSnapshot =>
  snapshot?.scopeProtocol === SCOPE_PROTOCOL_VERSION &&
  typeof snapshot.stageId === 'string' &&
  snapshot.stageId.length > 0 &&
  snapshot.stage === scope.stage &&
  snapshot.region === scope.region &&
  typeof snapshot.id === 'string' &&
  snapshot.id.length > 0 &&
  typeof snapshot.contentHash === 'string' &&
  snapshot.contentHash.length > 0 &&
  Number.isInteger(snapshot.versionNumber) &&
  snapshot.versionNumber! > 0;

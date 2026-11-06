import { TosClient, TosServerCode } from '@volcengine/tos-sdk';

import { StorageAdapter, StateBackend } from './types';
import { createRemoteStateBackend } from './remoteStateBackend';
import { MigrationMarkerAction } from '../migrationMarker';
import { TOS_STATE_CONNECT_TIMEOUT_MS, TOS_STATE_REQUEST_TIMEOUT_MS } from '../constants';
import { lang } from '../../lang';
import type { DeploymentScope } from '../stateScope';

export type TosStorageConfig = {
  bucket: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  lockPath: string;
};

type TosFailure = {
  code?: string;
  statusCode?: number;
};

const describeFailure = (err: unknown): TosFailure => {
  if (!err || typeof err !== 'object') return {};
  const { code, statusCode } = err as { code?: unknown; statusCode?: unknown };
  return {
    ...(typeof code === 'string' ? { code } : {}),
    ...(typeof statusCode === 'number' ? { statusCode } : {}),
  };
};

const isMissingBucket = ({ code }: TosFailure): boolean => code === TosServerCode.NoSuchBucket;

const isAccessDenied = ({ code, statusCode }: TosFailure): boolean =>
  code === TosServerCode.AccessDenied || statusCode === 403;

/** Only a confirmed missing object is absent state. Other 404s stay errors. */
const isMissingObject = ({ code }: TosFailure): boolean => code === TosServerCode.NoSuchKey;

/** A bare 404 is still an idempotent deletion, but never an empty state read. */
const isMissingObjectDeletion = ({ code, statusCode }: TosFailure): boolean =>
  code === TosServerCode.NoSuchKey || (code === undefined && statusCode === 404);

const assertNotFatalAbsence = (err: unknown): void => {
  const failure = describeFailure(err);
  if (isMissingBucket(failure)) {
    throw new Error(
      lang.__('STATE_BUCKET_NOT_FOUND', { code: failure.code ?? TosServerCode.NoSuchBucket }),
    );
  }
  if (isAccessDenied(failure)) {
    throw new Error(
      lang.__('STATE_BUCKET_ACCESS_DENIED', {
        code: failure.code ?? TosServerCode.AccessDenied,
      }),
    );
  }
};

export const createTosStorageAdapter = (config: TosStorageConfig): StorageAdapter => {
  const tosClient = new TosClient({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    stsToken: config.securityToken,
    region: config.region,
    endpoint: `tos-${config.region}.volces.com`,
    secure: true,
    requestTimeout: TOS_STATE_REQUEST_TIMEOUT_MS,
    connectionTimeout: TOS_STATE_CONNECT_TIMEOUT_MS,
  });

  return {
    read: async <T>(key: string): Promise<T | null> => {
      try {
        const response = await tosClient.getObjectV2({
          bucket: config.bucket,
          key,
          dataType: 'buffer',
        });
        return JSON.parse(response.data.content.toString('utf-8')) as T;
      } catch (err: unknown) {
        assertNotFatalAbsence(err);
        if (isMissingObject(describeFailure(err))) return null;
        throw err;
      }
    },

    write: async (key: string, data: unknown): Promise<void> => {
      await tosClient.putObject({
        bucket: config.bucket,
        key,
        body: Buffer.from(JSON.stringify(data, null, 2), 'utf-8'),
        contentType: 'application/json',
      });
    },

    delete: async (key: string): Promise<void> => {
      try {
        await tosClient.deleteObject({ bucket: config.bucket, key });
      } catch (err: unknown) {
        assertNotFatalAbsence(err);
        if (isMissingObjectDeletion(describeFailure(err))) return;
        throw err;
      }
    },

    lockPath: config.lockPath,
  };
};

export const createTosStateBackend = (config: {
  scope: DeploymentScope;
  bucket: string;
  key: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  markerAction?: MigrationMarkerAction;
}): StateBackend => {
  const adapter = createTosStorageAdapter({
    bucket: config.bucket,
    region: config.region,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    securityToken: config.securityToken,
    lockPath: `tos://${config.bucket}/${config.key}`,
  });
  return createRemoteStateBackend(adapter, {
    scope: config.scope,
    key: config.key,
    markerAction: config.markerAction,
  });
};

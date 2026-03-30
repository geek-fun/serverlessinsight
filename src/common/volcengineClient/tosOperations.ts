import type { TosBucketConfig, TosBucketInfo } from './types';

type TosSdkClient = unknown;

export const createTosOperations = (_client: TosSdkClient, _region: string) => ({
  createBucket: async (_config: TosBucketConfig): Promise<void> => {
    throw new Error('TOS operations not yet implemented - Phase 3');
  },

  getBucket: async (_bucketName: string): Promise<TosBucketInfo | null> => {
    throw new Error('TOS operations not yet implemented - Phase 3');
  },

  deleteBucket: async (_bucketName: string): Promise<void> => {
    throw new Error('TOS operations not yet implemented - Phase 3');
  },

  putObject: async (_bucket: string, _key: string, _body: Buffer): Promise<void> => {
    throw new Error('TOS operations not yet implemented - Phase 3');
  },

  listObjects: async (_bucket: string, _prefix?: string): Promise<string[]> => {
    throw new Error('TOS operations not yet implemented - Phase 3');
  },

  deleteObjects: async (_bucket: string, _keys: string[]): Promise<void> => {
    throw new Error('TOS operations not yet implemented - Phase 3');
  },

  setBucketWebsite: async (_bucket: string, _config: TosBucketConfig['website']): Promise<void> => {
    throw new Error('TOS operations not yet implemented - Phase 3');
  },
});

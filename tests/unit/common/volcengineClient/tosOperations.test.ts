import { createTosOperations } from '../../../../src/common/volcengineClient/tosOperations';
import type { TosBucketConfig } from '../../../../src/common/volcengineClient/types';

describe('tosOperations', () => {
  let operations: ReturnType<typeof createTosOperations>;

  beforeEach(() => {
    operations = createTosOperations(null, 'cn-beijing');
  });

  const mockConfig: TosBucketConfig = {
    bucketName: 'test-bucket',
    acl: 'private',
  };

  describe('createBucket', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.createBucket(mockConfig)).rejects.toThrow(
        'TOS operations not yet implemented - Phase 3',
      );
    });
  });

  describe('getBucket', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.getBucket('test-bucket')).rejects.toThrow(
        'TOS operations not yet implemented - Phase 3',
      );
    });
  });

  describe('deleteBucket', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.deleteBucket('test-bucket')).rejects.toThrow(
        'TOS operations not yet implemented - Phase 3',
      );
    });
  });

  describe('putObject', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.putObject('bucket', 'key', Buffer.from('test'))).rejects.toThrow(
        'TOS operations not yet implemented - Phase 3',
      );
    });
  });

  describe('listObjects', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.listObjects('bucket', 'prefix/')).rejects.toThrow(
        'TOS operations not yet implemented - Phase 3',
      );
    });
  });

  describe('deleteObjects', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.deleteObjects('bucket', ['key1', 'key2'])).rejects.toThrow(
        'TOS operations not yet implemented - Phase 3',
      );
    });
  });

  describe('setBucketWebsite', () => {
    it('should throw not implemented error', async () => {
      await expect(operations.setBucketWebsite('bucket', { index: 'index.html' })).rejects.toThrow(
        'TOS operations not yet implemented - Phase 3',
      );
    });
  });
});

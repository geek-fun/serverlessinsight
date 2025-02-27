import { constructAssets, getAssets, publishAssets } from '../../src/common';
import { Stats } from 'node:fs';
import { assetsFixture } from '../fixtures/assetsFixture';
import { ActionContext } from '../../src/types';

const mockedBucketPut = jest.fn();
const mockedReaddirSync = jest.fn();
const mockedLstatSync = jest.fn();
const mockedExistsSync = jest.fn();
const mockedGenerateAsync = jest.fn();
const mockedInfoLogger = jest.fn();

jest.mock('ali-oss', () =>
  jest.fn().mockImplementation(() => ({
    getBucketInfo: jest.fn().mockResolvedValue({}),
    put: (...args: unknown[]) => mockedBucketPut(...args),
  })),
);

jest.mock('node:fs', () => {
  return {
    readdirSync: (...args: unknown[]) => mockedReaddirSync(...args),
    lstatSync: (...args: unknown[]) => mockedLstatSync(...args),
    existsSync: (...args: unknown[]) => mockedExistsSync(...args),
    writeFileSync: jest.fn().mockImplementation(() => {}),
    readFileSync: jest.fn().mockImplementation(() => {}),
  };
});
jest.mock('node:path', () => ({
  resolve: (...args: string[]) => args.join('/'),
  normalize: (p: string) => p,
  join: (...args: string[]) => args.join('/'),
}));

jest.mock('jszip', () =>
  jest.fn().mockImplementation(() => ({
    generateAsync: () => mockedGenerateAsync(),
    file: jest.fn().mockImplementation(() => {}),
    folder: jest.fn().mockImplementation(() => {}),
  })),
);

jest.mock('../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedInfoLogger(...args),
    debug: jest.fn(),
  },
}));

describe('Unit test for rosAssets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Unite test for getAssets', () => {
    it('should return assets from the specified location', () => {
      const mockLocation = 'mock/location';
      mockedExistsSync.mockReturnValue(true);
      mockedReaddirSync
        .mockReturnValueOnce(['folder1/', 'file1', 'file2'])
        .mockReturnValueOnce(['file3', 'file4']);
      mockedLstatSync
        .mockReturnValueOnce({ isFile: () => false } as Stats)
        .mockReturnValueOnce({ isFile: () => false } as Stats)
        .mockReturnValueOnce({ isFile: () => true } as Stats)
        .mockReturnValueOnce({ isFile: () => true } as Stats)
        .mockReturnValueOnce({ isFile: () => true } as Stats)
        .mockReturnValueOnce({ isFile: () => true } as Stats);

      const assets = getAssets(mockLocation);

      expect(assets).toEqual(Array(4).fill({ bind: expect.any(Function) }));
    });

    it('should throw error if the location is not exists', () => {
      const mockLocation = 'mock/location';
      mockedExistsSync.mockReturnValueOnce(false);

      expect(() => getAssets(mockLocation)).toThrow(`Location: ${mockLocation}/ is not exists!`);
    });
  });

  describe('publishAssets', () => {
    const mockContext = {
      region: 'mock-region',
      accessKeyId: 'mock-access-key-id',
      accessKeySecret: 'mock-access-key-secret',
    } as ActionContext;

    it('should publish assets to the specified bucket', async () => {
      mockedExistsSync.mockReturnValue(true);
      mockedReaddirSync.mockReturnValueOnce(['file1', 'file2']);
      mockedLstatSync
        .mockReturnValueOnce({ isFile: () => true } as Stats)
        .mockReturnValueOnce({ isFile: () => true } as Stats);
      mockedGenerateAsync.mockResolvedValue(Buffer.from('mock-zip-content'));

      const bucketName = await publishAssets(
        await constructAssets(assetsFixture, 'mock-region'),
        mockContext,
      );

      expect(bucketName).toBe('cdk-ajmywduza-assets-mock-region');
      expect(mockedBucketPut.mock.calls).toEqual([
        [
          '55d1d2dd5d6c1b083a04c15431f70da1f2840b9de06383411cbf7eda2a512efe.zip',
          'path/to/asset.55d1d2dd5d6c1b083a04c15431f70da1f2840b9de06383411cbf7eda2a512efe.zip',
          expect.any(Object),
        ],
        [
          'c6a72ed7e7e83f01a000b75885758088fa050298a31a1e95d37ac88f08e42315.zip',
          'path/to/asset.c6a72ed7e7e83f01a000b75885758088fa050298a31a1e95d37ac88f08e42315.zip',
          expect.any(Object),
        ],
      ]);
      expect(mockedInfoLogger.mock.calls).toEqual([
        [
          'Folder compressed to: path/to/asset.55d1d2dd5d6c1b083a04c15431f70da1f2840b9de06383411cbf7eda2a512efe.zip',
        ],
      ]);
    });

    it('should log and skip if no assets to publish', async () => {
      await publishAssets([], mockContext);

      expect(mockedInfoLogger).toHaveBeenCalledWith('No assets to publish, skipped!');
    });
  });
});

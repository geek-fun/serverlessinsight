import {
  cleanupAssets,
  constructAssets,
  getAssets,
  publishAssets,
  ProviderEnum,
} from '../../src/common';
import { lang } from '../../src/lang';
import { Stats } from 'node:fs';
import { assetsFixture } from '../fixtures/assetsFixture';

const mockedGetStore = jest.fn();
const mockedBucketPut = jest.fn();
const mockedDeleteBucket = jest.fn();
const mockedDelete = jest.fn();
const mockedReaddirSync = jest.fn();
const mockedLstatSync = jest.fn();
const mockedExistsSync = jest.fn();
const mockedGenerateAsync = jest.fn();
const mockedInfoLogger = jest.fn();
const mockedDebugLogger = jest.fn();
const mockedGetContext = jest.fn();

jest.mock('../../src/common/rosClient', () => ({}));
jest.mock('../../src/common/imsClient', () => ({}));
jest.mock('@alicloud/ros-cdk-core', () => ({}));

jest.mock('@alicloud/ros-cdk-ossdeployment', () => ({
  Source: {
    asset: jest.fn().mockImplementation(() => ({ bind: jest.fn() })),
  },
}));

jest.mock('node:async_hooks', () => ({
  AsyncLocalStorage: jest.fn().mockImplementation(() => ({
    enterWith: jest.fn(),
    getStore: (...args: unknown[]) => mockedGetStore(...args),
  })),
}));

jest.mock('ali-oss', () =>
  jest.fn().mockImplementation(() => ({
    getBucketInfo: jest.fn().mockResolvedValue({}),
    put: (...args: unknown[]) => mockedBucketPut(...args),
    delete: (...args: unknown[]) => mockedDelete(...args),
    deleteBucket: (...args: unknown[]) => mockedDeleteBucket(...args),
  })),
);

jest.mock('node:fs', () => {
  return {
    readdirSync: (...args: unknown[]) => mockedReaddirSync(...args),
    lstatSync: (...args: unknown[]) => mockedLstatSync(...args),
    existsSync: (...args: unknown[]) => mockedExistsSync(...args),
    statSync: (...args: unknown[]) => mockedLstatSync(...args),
    writeFileSync: jest.fn().mockImplementation(() => {}),
    readFileSync: jest.fn().mockImplementation(() => {}),
  };
});
jest.mock('node:path', () => ({
  resolve: (...args: string[]) => args.join('/'),
  normalize: (p: string) => p,
  join: (...args: string[]) => args.join('/'),
  isAbsolute: (p: string) => p.startsWith('/'),
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
    debug: (...args: unknown[]) => mockedDebugLogger(...args),
  },
}));

jest.mock('../../src/common/context', () => ({
  ...jest.requireActual('../../src/common/context'),
  getContext: () => mockedGetContext(),
}));

describe('Unit test for rosAssets', () => {
  beforeAll(() => {
    // Set locale to English for consistent test messages
    lang.setLocale('en-US');
  });

  beforeEach(() => {
    mockedGetStore.mockReturnValue({
      region: 'mock-region',
      accessKeyId: 'mock-access-key-id',
      accessKeySecret: 'mock-access-key-secret',
    });
    mockedGetContext.mockReturnValue({
      stage: 'default',
      stackName: 'test-stack',
      provider: ProviderEnum.ALIYUN,
      region: 'cn-hangzhou',
      accessKeyId: 'test-access-key-id',
      accessKeySecret: 'test-access-key-secret',
      iacLocation: 'tests/fixtures/serverless-insight.yml',
      parameters: [],
      stages: {},
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Unit test for getAssets', () => {
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

  describe('Unit test for publishAssets', () => {
    it('should publish assets to the specified bucket', async () => {
      mockedExistsSync.mockReturnValue(true);
      mockedReaddirSync.mockReturnValueOnce(['file1', 'file2']);
      mockedLstatSync
        .mockReturnValueOnce({ isFile: () => true } as Stats)
        .mockReturnValueOnce({ isFile: () => true } as Stats);
      mockedGenerateAsync.mockResolvedValue(Buffer.from('mock-zip-content'));

      const bucketName = await publishAssets(await constructAssets(assetsFixture));

      expect(bucketName).toBe('cdk-ajmywduza-assets-cn-hangzhou');
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
          lang.__('FOLDER_COMPRESSED_TO', {
            zipPath:
              'path/to/asset.55d1d2dd5d6c1b083a04c15431f70da1f2840b9de06383411cbf7eda2a512efe.zip',
          }),
        ],
      ]);
    });

    it('should log and skip if no assets to publish', async () => {
      await publishAssets([]);

      expect(mockedInfoLogger).toHaveBeenCalledWith(lang.__('NO_ASSETS_TO_PUBLISH'));
    });
  });

  describe('Unit test for cleanupAssets', () => {
    it('should cleanup and delete the bucket when given assets is valid', async () => {
      mockedExistsSync.mockReturnValue(true);
      mockedReaddirSync.mockReturnValueOnce(['file1', 'file2']);
      mockedLstatSync
        .mockReturnValueOnce({ isFile: () => true } as Stats)
        .mockReturnValueOnce({ isFile: () => true } as Stats);
      mockedGenerateAsync.mockResolvedValue(Buffer.from('mock-zip-content'));

      await cleanupAssets(await constructAssets(assetsFixture));

      expect(mockedDelete).toHaveBeenCalledTimes(2);
      expect(mockedDelete.mock.calls).toEqual([
        ['55d1d2dd5d6c1b083a04c15431f70da1f2840b9de06383411cbf7eda2a512efe.zip'],
        ['c6a72ed7e7e83f01a000b75885758088fa050298a31a1e95d37ac88f08e42315.zip'],
      ]);
      expect(mockedDeleteBucket).toHaveBeenCalledTimes(1);
      expect(mockedDeleteBucket).toHaveBeenCalledWith('cdk-ajmywduza-assets-cn-hangzhou');
    });

    it('should skip the cleanupAssets when there is no assets', async () => {
      await cleanupAssets([]);

      expect(mockedInfoLogger).toHaveBeenCalledWith(lang.__('NO_ASSETS_TO_CLEANUP'));
    });
  });
});

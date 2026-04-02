import fs from 'node:fs';
import {
  getIacLocation,
  setContext,
  getContext,
  setIac,
  clearContext,
} from '../../../src/common/context';

jest.mock('node:fs');
jest.mock('../../../src/common/imsClient', () => ({
  getIamInfo: jest.fn().mockResolvedValue({ accountId: '123456789012', userId: 'test-user' }),
}));
jest.mock('../../../src/common/credentials', () => ({
  getCredentials: jest.fn(() => ({
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
  })),
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe('context', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    clearContext();
    process.env = { ...originalEnv };
    delete process.env.ROS_REGION_ID;
    delete process.env.SI_REGION;
  });

  afterAll(() => {
    process.env = originalEnv;
    clearContext();
  });

  describe('getIacLocation', () => {
    it('should return resolved path when file exists', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.statSync.mockReturnValue({ isDirectory: () => false, isFile: () => true } as never);

      const result = getIacLocation('/absolute/path/serverless.yml');

      expect(result).toBe('/absolute/path/serverless.yml');
    });

    it('should return undefined path when file does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);

      expect(() => getIacLocation('nonexistent.yml')).toThrow('No IaC file found');
    });

    it('should search directory for default IAC files', () => {
      mockFs.existsSync
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);
      mockFs.statSync
        .mockReturnValueOnce({ isDirectory: () => true } as never)
        .mockReturnValueOnce({ isFile: () => true } as never);

      const result = getIacLocation('/some/directory');

      expect(result).toContain('serverless-insight.yml');
    });

    it('should throw when directory exists but no IAC files found', () => {
      mockFs.existsSync.mockReturnValueOnce(true).mockReturnValue(false);
      mockFs.statSync.mockReturnValue({ isDirectory: () => true } as never);

      expect(() => getIacLocation('/empty/directory')).toThrow('No IaC file found');
    });

    it('should throw when no default IAC file found in cwd', () => {
      mockFs.existsSync.mockReturnValue(false);

      expect(() => getIacLocation(undefined)).toThrow('No IaC file found');
    });
  });

  describe('getContext', () => {
    it('should throw when context not set', () => {
      expect(() => getContext()).toThrow('No context found');
    });
  });

  describe('setIac', () => {
    it('should throw when context not set', () => {
      expect(() => setIac({} as never)).toThrow('Context must be set before setting IAC');
    });
  });

  describe('clearContext', () => {
    it('should clear context', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.statSync.mockReturnValue({ isDirectory: () => false } as never);

      await setContext({
        app: 'test-app',
        service: 'test-service',
        location: '/test/path',
      });

      expect(() => getContext()).not.toThrow();
      clearContext();
      expect(() => getContext()).toThrow('No context found');
    });
  });

  describe('setContext', () => {
    it('should set context with provided values', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.statSync.mockReturnValue({ isDirectory: () => false } as never);

      await setContext({
        app: 'test-app',
        service: 'test-service',
        stage: 'prod',
        region: 'cn-beijing',
        location: '/test/path',
        parameters: { KEY: 'value' },
      });

      const ctx = getContext();
      expect(ctx.app).toBe('test-app');
      expect(ctx.stage).toBe('prod');
      expect(ctx.region).toBe('cn-beijing');
      expect(ctx.parameters).toEqual([{ key: 'KEY', value: 'value' }]);
    });

    it('should warn when ROS_REGION_ID is set without SI_REGION', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.statSync.mockReturnValue({ isDirectory: () => false } as never);

      process.env.ROS_REGION_ID = 'cn-shanghai';
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      await setContext({ app: 'test', service: 'svc', location: '/path' });

      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('ROS_REGION_ID'));
      warnSpy.mockRestore();
    });

    it('should call getIamInfo when reaValToken is true', async () => {
      const { getIamInfo } = jest.requireMock('../../../src/common/imsClient');
      mockFs.existsSync.mockReturnValue(true);
      mockFs.statSync.mockReturnValue({ isDirectory: () => false } as never);

      await setContext({ app: 'test', service: 'svc', location: '/path' }, true);

      expect(getIamInfo).toHaveBeenCalled();
    });
  });
});

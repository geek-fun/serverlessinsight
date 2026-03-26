import { isFilePath, readPemContent, warnInlinePem } from '../../../src/common/certUtils';
import fs from 'node:fs';
import path from 'node:path';

const mockedLogger = {
  info: jest.fn(),
  warn: jest.fn(),
};

jest.mock('../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLogger.info(...args),
    warn: (...args: unknown[]) => mockedLogger.warn(...args),
  },
}));

jest.mock('../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, unknown>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

jest.mock('node:fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('certUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isFilePath', () => {
    it('should return true for relative path starting with ./', () => {
      expect(isFilePath('./cert.pem')).toBe(true);
    });

    it('should return true for relative path starting with ../', () => {
      expect(isFilePath('../certs/cert.pem')).toBe(true);
    });

    it('should return true for path ending with .pem', () => {
      expect(isFilePath('/path/to/cert.pem')).toBe(true);
    });

    it('should return true for path ending with .crt', () => {
      expect(isFilePath('/path/to/cert.crt')).toBe(true);
    });

    it('should return true for path ending with .key', () => {
      expect(isFilePath('/path/to/private.key')).toBe(true);
    });

    it('should return false for inline PEM content', () => {
      expect(isFilePath('-----BEGIN CERTIFICATE-----')).toBe(false);
    });

    it('should return false for non-file path strings', () => {
      expect(isFilePath('certificate-id-12345')).toBe(false);
    });

    it('should return false for absolute path without file extension', () => {
      expect(isFilePath('/absolute/path/file')).toBe(false);
    });
  });

  describe('readPemContent', () => {
    it('should return value directly when not a file path', () => {
      const inlineContent = '-----BEGIN CERTIFICATE-----\nMIIC...\n-----END CERTIFICATE-----';
      const result = readPemContent(inlineContent);
      expect(result).toBe(inlineContent);
    });

    it('should read file content when given a relative path starting with ./', () => {
      const filePath = './cert.pem';
      const expectedPath = path.resolve(process.cwd(), filePath);
      const fileContent = '-----BEGIN CERTIFICATE-----\ntest\n-----END CERTIFICATE-----';

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(fileContent);

      const result = readPemContent(filePath);

      expect(mockFs.existsSync).toHaveBeenCalledWith(expectedPath);
      expect(mockFs.readFileSync).toHaveBeenCalledWith(expectedPath, 'utf-8');
      expect(result).toBe(fileContent);
      expect(mockedLogger.info).toHaveBeenCalledWith(expect.stringContaining('CERT_READING_FILE'));
    });

    it('should read file content when given a path ending with .pem', () => {
      const filePath = '/abs/path/cert.pem';
      const _expectedPath = path.resolve(process.cwd(), filePath);
      const fileContent = 'PEM CONTENT';

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(fileContent);

      const result = readPemContent(filePath);

      expect(result).toBe(fileContent);
    });

    it('should throw error when file does not exist', () => {
      const filePath = './missing.pem';
      const _expectedPath = path.resolve(process.cwd(), filePath);

      mockFs.existsSync.mockReturnValue(false);

      expect(() => readPemContent(filePath)).toThrow('CERT_FILE_NOT_FOUND');
    });

    it('should handle paths with ../', () => {
      const filePath = '../certs/cert.key';
      const _expectedPath = path.resolve(process.cwd(), filePath);
      const fileContent = '-----BEGIN PRIVATE KEY-----\nKEY\n-----END PRIVATE KEY-----';

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(fileContent);

      const result = readPemContent(filePath);

      expect(result).toBe(fileContent);
    });
  });

  describe('warnInlinePem', () => {
    it('should warn when value contains BEGIN marker', () => {
      warnInlinePem('-----BEGIN CERTIFICATE-----\ntest');

      expect(mockedLogger.warn).toHaveBeenCalledWith('CERT_INLINE_PEM_WARNING');
    });

    it('should warn when value contains PRIVATE KEY marker', () => {
      warnInlinePem('-----BEGIN PRIVATE KEY-----\ntest');

      expect(mockedLogger.warn).toHaveBeenCalledWith('CERT_INLINE_PEM_WARNING');
    });

    it('should warn when value contains RSA PRIVATE KEY', () => {
      warnInlinePem('-----BEGIN RSA PRIVATE KEY-----\ntest');

      expect(mockedLogger.warn).toHaveBeenCalledWith('CERT_INLINE_PEM_WARNING');
    });

    it('should not warn when value is a file path', () => {
      warnInlinePem('./cert.pem');

      expect(mockedLogger.warn).not.toHaveBeenCalled();
    });

    it('should not warn when value is a certificate ID', () => {
      warnInlinePem('cert-id-12345');

      expect(mockedLogger.warn).not.toHaveBeenCalled();
    });

    it('should handle non-string values gracefully', () => {
      warnInlinePem(undefined as unknown as string);

      expect(mockedLogger.warn).not.toHaveBeenCalled();
    });
  });
});

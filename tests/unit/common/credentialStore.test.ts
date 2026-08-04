jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

import path from 'node:path';

const mockHomedir = '/home/testuser';
const mockCredentialsPath = path.join(mockHomedir, '.serverlessinsight', 'credentials.json');

jest.mock('node:os', () => ({
  homedir: jest.fn(() => mockHomedir),
}));

const mockFs = {
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  chmodSync: jest.fn(),
  unlinkSync: jest.fn(),
  mkdirSync: jest.fn(),
};

jest.mock('node:fs', () => mockFs);

const ORIGINAL_ENV = { ...process.env };

import {
  getCredentialsPath,
  loadCredentials,
  saveCredentials,
  deleteCredentials,
  resolveConsoleUrl,
  resolveApiKey,
  validateApiKeyFormat,
} from '../../../src/common/credentialStore';
import type { ConsoleCredentials } from '../../../src/common/credentialStore';

describe('credentialStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  describe('getCredentialsPath', () => {
    it('should return ~/.serverlessinsight/credentials.json', () => {
      const result = getCredentialsPath();
      expect(result).toBe(mockCredentialsPath);
    });
  });

  describe('loadCredentials', () => {
    it('should return null when file does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);
      const result = loadCredentials();
      expect(result).toBeNull();
    });

    it('should parse and return credentials from file', () => {
      const creds: ConsoleCredentials = {
        apiKey: 'si_abc123def456_ghijklmnopqrstuvwxyz0123456789abcd',
        consoleUrl: 'https://api.console.serverlessinsight.com',
        userEmail: 'test@example.com',
        orgId: 'org-uuid',
        orgName: 'TestOrg',
      };
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(creds));
      const result = loadCredentials();
      expect(result).toEqual(creds);
    });

    it('should return null on corrupted JSON', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('not-json{');
      const result = loadCredentials();
      expect(result).toBeNull();
    });
  });

  describe('saveCredentials', () => {
    it('should write credentials to correct path with indented JSON', () => {
      mockFs.existsSync.mockReturnValue(false);
      const creds: ConsoleCredentials = {
        apiKey: 'si_key',
        consoleUrl: 'https://api.test.com',
        userEmail: 'u@t.com',
        orgId: 'oid',
        orgName: 'ON',
      };
      saveCredentials(creds);
      expect(mockFs.mkdirSync).toHaveBeenCalledWith(path.join(mockHomedir, '.serverlessinsight'), {
        recursive: true,
      });
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        mockCredentialsPath,
        JSON.stringify(creds, null, 2),
        'utf-8',
      );
    });

    it('should restrict credentials file permissions to owner (0600)', () => {
      mockFs.existsSync.mockReturnValue(false);
      const creds: ConsoleCredentials = {
        apiKey: 'si_key',
        consoleUrl: 'https://api.test.com',
        userEmail: 'u@t.com',
        orgId: 'oid',
        orgName: 'ON',
      };
      saveCredentials(creds);
      expect(mockFs.chmodSync).toHaveBeenCalledWith(mockCredentialsPath, 0o600);
    });
  });

  describe('deleteCredentials', () => {
    it('should unlink the credentials file', () => {
      mockFs.existsSync.mockReturnValue(true);
      deleteCredentials();
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(mockCredentialsPath);
    });

    it('should not throw if file does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);
      expect(() => deleteCredentials()).not.toThrow();
    });
  });

  describe('resolveConsoleUrl', () => {
    it('should return SI_CONSOLE_URL env var when set', () => {
      process.env.SI_CONSOLE_URL = 'https://custom.api.com';
      const result = resolveConsoleUrl({ consoleUrl: 'https://creds.api.com' });
      expect(result).toBe('https://custom.api.com');
    });

    it('should return from credentials when env not set', () => {
      delete process.env.SI_CONSOLE_URL;
      const result = resolveConsoleUrl({ consoleUrl: 'https://creds.api.com' });
      expect(result).toBe('https://creds.api.com');
    });

    it('should return default when nothing is set', () => {
      delete process.env.SI_CONSOLE_URL;
      const result = resolveConsoleUrl({});
      expect(result).toBe('https://api.console.serverlessinsight.com');
    });
  });

  describe('resolveApiKey', () => {
    it('should return siApiKey param when provided', () => {
      const result = resolveApiKey({ siApiKey: 'flag-key', envKey: undefined, creds: undefined });
      expect(result).toBe('flag-key');
    });

    it('should return env SI_API_KEY when flag not set', () => {
      const result = resolveApiKey({ siApiKey: undefined, envKey: 'env-key', creds: undefined });
      expect(result).toBe('env-key');
    });

    it('should return from credentials when no flag or env', () => {
      const result = resolveApiKey({
        siApiKey: undefined,
        envKey: undefined,
        creds: { apiKey: 'creds-key' } as ConsoleCredentials,
      });
      expect(result).toBe('creds-key');
    });

    it('should return null when no source available', () => {
      const result = resolveApiKey({ siApiKey: undefined, envKey: undefined, creds: undefined });
      expect(result).toBeNull();
    });
  });

  describe('validateApiKeyFormat', () => {
    it('should return true for valid key format', () => {
      expect(validateApiKeyFormat('si_ABCdef123456_abcdefghijklmnopqrstuvwxyz012345')).toBe(true);
      expect(validateApiKeyFormat('si_AXw7foqhs8PU_8UbTJZPJpl9a5bCVA85eqZJz60DPsx71')).toBe(true);
    });

    it('should return false for missing si_ prefix', () => {
      expect(validateApiKeyFormat('abc_123_456')).toBe(false);
    });

    it('should return false for wrong prefix length', () => {
      expect(validateApiKeyFormat('si_abc_xyz')).toBe(false);
    });

    it('should return false for wrong secret length', () => {
      expect(validateApiKeyFormat('si_ABCdef123456_tooshort')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validateApiKeyFormat('')).toBe(false);
    });
  });
});

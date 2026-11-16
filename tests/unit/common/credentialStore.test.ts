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
  loadCredentials,
  loadCredentialsFile,
  saveProfile,
  updateProfile,
  removeActiveProfile,
  deleteCredentials,
  findProfilesBySlug,
  resolveApiKey,
  bestEffortConsoleOrigin,
} from '../../../src/common/credentialStore';
import { parseApiKeyLine, validateApiKeyFormat } from '../../../src/common/credentialStore';

const legacyKey = 'si_abcdef123456_0123456789abcdef0123456789abcdef';
const chinaKey = 'si_cn_abcdef123456_0123456789abcdef0123456789abcdef';
const intlKey = 'si_com_abcdef123456_0123456789abcdef0123456789abcdef';

const chinaProfile = {
  apiKey: chinaKey,
  orgId: 'org-cn',
  orgName: 'Wentsen',
  orgSlug: 'wentsen',
  userEmail: 'owner@wentsen.com',
};

const intlProfile = {
  apiKey: intlKey,
  orgId: 'org-com',
  orgName: 'Wentsen Intl',
  orgSlug: 'wentsen',
  userEmail: 'owner@wentsen.com',
};

describe('credentialStore (ADR-008 v2)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
    delete process.env.SI_CONSOLE_URL;
    delete process.env.SI_CONSOLE_LINE;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  describe('loadCredentialsFile', () => {
    it('returns null when the file does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);
      expect(loadCredentialsFile()).toBeNull();
    });

    it('returns null on corrupted JSON', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('not-json{');
      expect(loadCredentialsFile()).toBeNull();
    });

    it('passes a v2 composite-key file through, including a same-slug cross-line pair', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: 'china/wentsen',
          profiles: { 'china/wentsen': chinaProfile, 'international/wentsen': intlProfile },
        }),
      );
      const file = loadCredentialsFile();
      expect(file?.active).toBe('china/wentsen');
      expect(file?.profiles['china/wentsen']).toEqual(chinaProfile);
      expect(file?.profiles['international/wentsen']).toEqual(intlProfile);
    });

    it('heals a legacy v1 file in memory to the composite-key shape', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          apiKey: legacyKey,
          consoleUrl: 'https://console.serverlessinsight.cn',
          orgId: 'org-cn',
          orgName: 'Wentsen',
          orgSlug: 'wentsen',
          userEmail: 'owner@wentsen.com',
        }),
      );
      const file = loadCredentialsFile();
      expect(file?.active).toBe('china/wentsen');
      expect(file?.profiles['china/wentsen']?.apiKey).toBe(legacyKey);
      // Heal is in-memory: the legacy file stays untouched until the next save.
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });

    it('defaults the healed line to international for unknown origins', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          apiKey: legacyKey,
          consoleUrl: 'http://localhost:3000',
          orgId: 'org-x',
          orgSlug: 'wentsen',
        }),
      );
      expect(Object.keys(loadCredentialsFile()!.profiles)).toEqual(['international/wentsen']);
    });

    it('uses a temporary legacy key when the v1 file has no org slug', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          apiKey: legacyKey,
          consoleUrl: 'https://console.serverlessinsight.com',
          orgId: '0123456789abcdef',
        }),
      );
      expect(Object.keys(loadCredentialsFile()!.profiles)).toEqual([
        'international/legacy-01234567',
      ]);
    });

    it('drops a dangling active pointer', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ active: 'china/gone', profiles: { 'china/wentsen': chinaProfile } }),
      );
      expect(loadCredentialsFile()!.active).toBeUndefined();
    });
  });

  describe('loadCredentials', () => {
    it('returns the active profile with line and store key attached', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: 'china/wentsen',
          profiles: { 'china/wentsen': chinaProfile, 'international/wentsen': intlProfile },
        }),
      );
      const creds = loadCredentials();
      expect(creds?.line).toBe('china');
      expect(creds?.profileKey).toBe('china/wentsen');
      expect(creds?.apiKey).toBe(chinaKey);
    });

    it('returns null when no active profile exists', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ profiles: { 'china/wentsen': chinaProfile } }),
      );
      expect(loadCredentials()).toBeNull();
    });
  });

  describe('saveProfile', () => {
    it('writes the composite key, activates it and creates the directory', () => {
      mockFs.existsSync.mockReturnValue(false);
      saveProfile('china', chinaProfile, { activate: true });
      expect(mockFs.mkdirSync).toHaveBeenCalledWith(path.join(mockHomedir, '.serverlessinsight'), {
        recursive: true,
      });
      const written = JSON.parse(mockFs.writeFileSync.mock.calls[0][1] as string);
      expect(written.active).toBe('china/wentsen');
      expect(written.profiles['china/wentsen']).toEqual(chinaProfile);
      expect(mockFs.chmodSync).toHaveBeenCalledWith(mockCredentialsPath, 0o600);
    });

    it('keeps the existing active profile when activating is not requested', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ active: 'china/wentsen', profiles: { 'china/wentsen': chinaProfile } }),
      );
      saveProfile('international', intlProfile);
      const written = JSON.parse(mockFs.writeFileSync.mock.calls[0][1] as string);
      expect(written.active).toBe('china/wentsen');
      expect(written.profiles['international/wentsen']).toEqual(intlProfile);
    });

    it('re-keys away a healed legacy entry for the same org', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: 'china/legacy-01234567',
          profiles: { 'china/legacy-01234567': { ...chinaProfile, orgSlug: undefined } },
        }),
      );
      saveProfile('china', chinaProfile, { activate: true });
      const written = JSON.parse(mockFs.writeFileSync.mock.calls[0][1] as string);
      expect(written.active).toBe('china/wentsen');
      expect(Object.keys(written.profiles)).toEqual(['china/wentsen']);
    });
  });

  describe('updateProfile', () => {
    it('patches one profile in place (slug heal)', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: 'china/wentsen',
          profiles: { 'china/wentsen': chinaProfile, 'international/wentsen': intlProfile },
        }),
      );
      updateProfile('china/wentsen', { orgSlug: 'wentsen-renamed' });
      const written = JSON.parse(mockFs.writeFileSync.mock.calls[0][1] as string);
      expect(written.profiles['china/wentsen'].orgSlug).toBe('wentsen-renamed');
      expect(written.profiles['international/wentsen'].orgSlug).toBe('wentsen');
    });

    it('is a no-op for an unknown profile key', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify({ profiles: {} }));
      updateProfile('china/ghost', { orgSlug: 'x' });
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });
  });

  describe('removeActiveProfile', () => {
    it('removes only the active profile when others remain', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: 'china/wentsen',
          profiles: { 'china/wentsen': chinaProfile, 'international/wentsen': intlProfile },
        }),
      );
      const removed = removeActiveProfile();
      expect(removed?.profileKey).toBe('china/wentsen');
      const written = JSON.parse(mockFs.writeFileSync.mock.calls[0][1] as string);
      expect(written.active).toBeUndefined();
      expect(Object.keys(written.profiles)).toEqual(['international/wentsen']);
    });

    it('deletes the file when the last profile logs out', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ active: 'china/wentsen', profiles: { 'china/wentsen': chinaProfile } }),
      );
      removeActiveProfile();
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(mockCredentialsPath);
    });
  });

  describe('findProfilesBySlug', () => {
    it('matches profiles whose key ends with the slug, across lines', () => {
      const file = {
        active: 'china/wentsen',
        profiles: {
          'china/wentsen': chinaProfile,
          'international/wentsen': intlProfile,
          'international/acme': { ...intlProfile, orgSlug: 'acme' },
        },
      };
      expect(findProfilesBySlug(file, 'wentsen').sort()).toEqual([
        'china/wentsen',
        'international/wentsen',
      ]);
    });
  });

  describe('deleteCredentials', () => {
    it('unlinks the credentials file', () => {
      mockFs.existsSync.mockReturnValue(true);
      deleteCredentials();
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(mockCredentialsPath);
    });

    it('does not throw if the file does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);
      expect(() => deleteCredentials()).not.toThrow();
    });
  });

  describe('bestEffortConsoleOrigin', () => {
    it('prefers the internal SI_CONSOLE_URL test hook', () => {
      process.env.SI_CONSOLE_URL = 'http://localhost:3000';
      expect(bestEffortConsoleOrigin()).toBe('http://localhost:3000');
    });

    it('derives the origin from the active profile line', () => {
      delete process.env.SI_CONSOLE_URL;
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ active: 'china/wentsen', profiles: { 'china/wentsen': chinaProfile } }),
      );
      expect(bestEffortConsoleOrigin()).toBe('https://console.serverlessinsight.cn');
    });

    it('falls back to the international origin', () => {
      delete process.env.SI_CONSOLE_URL;
      mockFs.existsSync.mockReturnValue(false);
      expect(bestEffortConsoleOrigin()).toBe('https://console.serverlessinsight.com');
    });
  });

  describe('resolveApiKey', () => {
    it('prefers flag over env over profile', () => {
      expect(resolveApiKey({ siApiKey: 'flag', envKey: 'env', creds: { apiKey: 'stored' } })).toBe(
        'flag',
      );
      expect(
        resolveApiKey({ siApiKey: undefined, envKey: 'env', creds: { apiKey: 'stored' } }),
      ).toBe('env');
      expect(
        resolveApiKey({ siApiKey: undefined, envKey: undefined, creds: { apiKey: 'stored' } }),
      ).toBe('stored');
      expect(
        resolveApiKey({ siApiKey: undefined, envKey: undefined, creds: undefined }),
      ).toBeNull();
    });
  });

  describe('key formats (ADR-008 dual format)', () => {
    it('accepts legacy and line-stamped keys', () => {
      expect(validateApiKeyFormat(legacyKey)).toBe(true);
      expect(validateApiKeyFormat(chinaKey)).toBe(true);
      expect(validateApiKeyFormat(intlKey)).toBe(true);
      expect(validateApiKeyFormat('si_cn_tooshort_short')).toBe(false);
      expect(validateApiKeyFormat('si_xx_abcdef123456_0123456789abcdef0123456789abcdef')).toBe(
        false,
      );
      expect(validateApiKeyFormat('')).toBe(false);
    });

    it('parses the line from stamped keys and returns null for legacy keys', () => {
      expect(parseApiKeyLine(chinaKey)).toBe('china');
      expect(parseApiKeyLine(intlKey)).toBe('international');
      expect(parseApiKeyLine(legacyKey)).toBeNull();
    });
  });
});

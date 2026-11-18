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
  renameSync: jest.fn(),
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
  readLegacyConsoleUrl,
} from '../../../src/common/credentialStore';
import { parseApiKeyLine, validateApiKeyFormat } from '../../../src/common/credentialStore';

const legacyKey = 'si_abcdef123456_0123456789abcdef0123456789abcdef';
const chinaKey = 'si_cn_abcdef123456_0123456789abcdef0123456789abcdef';
const intlKey = 'si_com_abcdef123456_0123456789abcdef0123456789abcdef';

const chinaProfile = {
  apiKey: chinaKey,
  orgId: 'org-cn',
  orgName: 'Example Org',
  orgSlug: 'example-org',
  userEmail: 'owner@example.com',
};

const intlProfile = {
  apiKey: intlKey,
  orgId: 'org-com',
  orgName: 'Example Org Intl',
  orgSlug: 'example-org',
  userEmail: 'owner@example.com',
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
          active: 'china/example-org',
          profiles: { 'china/example-org': chinaProfile, 'international/example-org': intlProfile },
        }),
      );
      const file = loadCredentialsFile();
      expect(file?.active).toBe('china/example-org');
      expect(file?.profiles['china/example-org']).toEqual(chinaProfile);
      expect(file?.profiles['international/example-org']).toEqual(intlProfile);
    });

    it('heals a legacy v1 file in memory to the composite-key shape', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          apiKey: legacyKey,
          consoleUrl: 'https://console.serverlessinsight.cn',
          orgId: 'org-cn',
          orgName: 'Example Org',
          orgSlug: 'example-org',
          userEmail: 'owner@example.com',
        }),
      );
      const file = loadCredentialsFile();
      expect(file?.active).toBe('china/example-org');
      expect(file?.profiles['china/example-org']?.apiKey).toBe(legacyKey);
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
          orgSlug: 'example-org',
        }),
      );
      expect(Object.keys(loadCredentialsFile()!.profiles)).toEqual(['international/example-org']);
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
        JSON.stringify({ active: 'china/gone', profiles: { 'china/example-org': chinaProfile } }),
      );
      expect(loadCredentialsFile()!.active).toBeUndefined();
    });
  });

  describe('loadCredentials', () => {
    it('returns the active profile with line and store key attached', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: 'china/example-org',
          profiles: { 'china/example-org': chinaProfile, 'international/example-org': intlProfile },
        }),
      );
      const creds = loadCredentials();
      expect(creds?.line).toBe('china');
      expect(creds?.profileKey).toBe('china/example-org');
      expect(creds?.apiKey).toBe(chinaKey);
    });

    it('returns null when no active profile exists', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ profiles: { 'china/example-org': chinaProfile } }),
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
      expect(written.active).toBe('china/example-org');
      expect(written.profiles['china/example-org']).toEqual(chinaProfile);
      // Atomic replace (issue #309): a private 0600 temp file renamed into place.
      const [tmpPath, , options] = mockFs.writeFileSync.mock.calls[0] as [
        string,
        string,
        { encoding: string; mode: number },
      ];
      expect(tmpPath).toContain('credentials.json.tmp-');
      expect(options).toEqual({ encoding: 'utf-8', mode: 0o600 });
      expect(mockFs.renameSync).toHaveBeenCalledWith(tmpPath, mockCredentialsPath);
    });

    it('keeps the existing active profile when activating is not requested', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: 'china/example-org',
          profiles: { 'china/example-org': chinaProfile },
        }),
      );
      saveProfile('international', intlProfile);
      const written = JSON.parse(mockFs.writeFileSync.mock.calls[0][1] as string);
      expect(written.active).toBe('china/example-org');
      expect(written.profiles['international/example-org']).toEqual(intlProfile);
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
      expect(written.active).toBe('china/example-org');
      expect(Object.keys(written.profiles)).toEqual(['china/example-org']);
    });
  });

  describe('updateProfile', () => {
    const legacyKey = 'china/legacy-01234567';
    const legacyProfile = { ...chinaProfile, orgSlug: undefined };

    it('moves a verified legacy profile to its slug and updates the active pointer', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: legacyKey,
          profiles: { [legacyKey]: legacyProfile, 'international/example-org': intlProfile },
        }),
      );
      updateProfile(legacyKey, chinaProfile.apiKey, { orgSlug: 'example-org' });
      const written = JSON.parse(mockFs.writeFileSync.mock.calls[0][1] as string);
      expect(written.active).toBe('china/example-org');
      expect(written.profiles).toEqual({
        'china/example-org': chinaProfile,
        'international/example-org': intlProfile,
      });
    });

    it('updates identity at the same key without changing the active profile', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: 'international/example-org',
          profiles: { 'china/example-org': chinaProfile, 'international/example-org': intlProfile },
        }),
      );
      updateProfile('china/example-org', chinaProfile.apiKey, {
        orgSlug: 'example-org',
        orgId: 'new-id',
      });
      const written = JSON.parse(mockFs.writeFileSync.mock.calls[0][1] as string);
      expect(written.active).toBe('international/example-org');
      expect(written.profiles['china/example-org'].orgId).toBe('new-id');
    });

    it('leaves a newer or changed profile intact when validation races another login', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          profiles: { [legacyKey]: legacyProfile, 'china/example-org': chinaProfile },
        }),
      );

      updateProfile(legacyKey, chinaProfile.apiKey, { orgSlug: 'example-org' });
      updateProfile(legacyKey, 'different-key', { orgSlug: 'other' });
      updateProfile('china/ghost', chinaProfile.apiKey, { orgSlug: 'other' });

      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });
  });

  describe('removeActiveProfile', () => {
    it('removes only the active profile when others remain', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: 'china/example-org',
          profiles: { 'china/example-org': chinaProfile, 'international/example-org': intlProfile },
        }),
      );
      const removed = removeActiveProfile();
      expect(removed?.profileKey).toBe('china/example-org');
      const written = JSON.parse(mockFs.writeFileSync.mock.calls[0][1] as string);
      expect(written.active).toBeUndefined();
      expect(Object.keys(written.profiles)).toEqual(['international/example-org']);
    });

    it('deletes the file when the last profile logs out', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          active: 'china/example-org',
          profiles: { 'china/example-org': chinaProfile },
        }),
      );
      removeActiveProfile();
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(mockCredentialsPath);
    });
  });

  describe('findProfilesBySlug', () => {
    it('matches profiles whose key ends with the slug, across lines', () => {
      const file = {
        active: 'china/example-org',
        profiles: {
          'china/example-org': chinaProfile,
          'international/example-org': intlProfile,
          'international/acme': { ...intlProfile, orgSlug: 'acme' },
        },
      };
      expect(findProfilesBySlug(file, 'example-org').sort()).toEqual([
        'china/example-org',
        'international/example-org',
      ]);
    });
    it('finds a previously healed legacy slug before the profile has been re-keyed', () => {
      const file = { profiles: { 'china/legacy-01234567': chinaProfile } };
      expect(findProfilesBySlug(file, 'example-org')).toEqual(['china/legacy-01234567']);
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
        JSON.stringify({
          active: 'china/example-org',
          profiles: { 'china/example-org': chinaProfile },
        }),
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

  describe('atomic, change-aware writes (issue #309)', () => {
    it('skips the write entirely when the serialized content is unchanged', () => {
      const file = {
        active: 'china/example-org',
        profiles: { 'china/example-org': chinaProfile },
      };
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(file, null, 2));

      saveProfile('china', chinaProfile);

      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
      expect(mockFs.renameSync).not.toHaveBeenCalled();
    });

    it('writes through a private 0600 temp file and renames it into place', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ active: 'china/old', profiles: { 'china/old': chinaProfile } }),
      );

      saveProfile('china', { ...chinaProfile, orgSlug: 'renamed-org' });

      const [tmpPath, , options] = mockFs.writeFileSync.mock.calls[0] as [
        string,
        string,
        { encoding: string; mode: number },
      ];
      expect(tmpPath).toContain('credentials.json.tmp-');
      expect(options).toEqual({ encoding: 'utf-8', mode: 0o600 });
      expect(mockFs.renameSync).toHaveBeenCalledWith(tmpPath, mockCredentialsPath);
    });
  });

  describe('updateProfile return contract (issue #309)', () => {
    const legacyKey2 = 'china/legacy-01234567';
    const legacyProfile = { ...chinaProfile, orgSlug: undefined };

    it('returns the new key when the profile is re-keyed', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ active: legacyKey2, profiles: { [legacyKey2]: legacyProfile } }),
      );

      expect(updateProfile(legacyKey2, chinaProfile.apiKey, { orgSlug: 'example-org' })).toBe(
        'china/example-org',
      );
    });

    it('returns null when the key does not own the profile or the target exists', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          profiles: { [legacyKey2]: legacyProfile, 'china/example-org': chinaProfile },
        }),
      );

      expect(updateProfile(legacyKey2, 'different-key', { orgSlug: 'other' })).toBeNull();
      expect(updateProfile(legacyKey2, chinaProfile.apiKey, { orgSlug: 'example-org' })).toBeNull();
      expect(updateProfile('china/ghost', chinaProfile.apiKey, { orgSlug: 'other' })).toBeNull();
    });

    it('refreshes orgName and userEmail from the validate response', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ active: legacyKey2, profiles: { [legacyKey2]: legacyProfile } }),
      );

      updateProfile(legacyKey2, chinaProfile.apiKey, {
        orgSlug: 'example-org',
        orgName: 'Renamed Org',
        userEmail: 'new@example.com',
      });

      const written = JSON.parse(mockFs.writeFileSync.mock.calls[0][1] as string);
      expect(written.profiles['china/example-org']).toEqual({
        ...chinaProfile,
        orgName: 'Renamed Org',
        userEmail: 'new@example.com',
      });
    });
  });

  describe('readLegacyConsoleUrl (issue #309)', () => {
    it('returns the raw consoleUrl of a legacy file without the in-memory heal', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ apiKey: legacyKey, consoleUrl: 'http://localhost:3002', orgId: 'org-1' }),
      );

      expect(readLegacyConsoleUrl()).toBe('http://localhost:3002');
    });

    it('returns null for v2 files, missing files and unparsable content', () => {
      mockFs.existsSync.mockReturnValue(false);
      expect(readLegacyConsoleUrl()).toBeNull();

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({ active: 'china/example-org', profiles: {} }),
      );
      expect(readLegacyConsoleUrl()).toBeNull();

      mockFs.readFileSync.mockReturnValue('not json');
      expect(readLegacyConsoleUrl()).toBeNull();
    });
  });
});

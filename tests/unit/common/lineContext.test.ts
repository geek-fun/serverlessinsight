jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

const mockQuestion = jest.fn();
jest.mock('node:readline', () => ({
  createInterface: () => ({ question: mockQuestion, close: jest.fn() }),
}));

const mockLoadCredentialsFile = jest.fn();

jest.mock('../../../src/common/credentialStore', () => ({
  ...jest.requireActual('../../../src/common/credentialStore'),
  loadCredentialsFile: (...args: unknown[]) => mockLoadCredentialsFile(...args),
}));

const originalIsTTY = Object.getOwnPropertyDescriptor(process.stdin, 'isTTY');
const setTty = (value: boolean) => {
  Object.defineProperty(process.stdin, 'isTTY', { configurable: true, value });
};

const ORIGINAL_ENV = { ...process.env };

import { logger } from '../../../src/common/logger';
import { resolveLineContext } from '../../../src/common/lineContext';

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

const twoLineFile = {
  active: 'china/example-org',
  profiles: { 'china/example-org': chinaProfile, 'international/example-org': intlProfile },
};

describe('resolveLineContext (ADR-008 resolution order)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setTty(false);
    mockLoadCredentialsFile.mockReset();
    process.env = { ...ORIGINAL_ENV };
    delete process.env.SI_API_KEY;
    delete process.env.SI_CONSOLE_LINE;
    delete process.env.SI_CONSOLE_URL;
    delete process.env.SI_CONSOLE_UI_URL;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
    if (originalIsTTY) Object.defineProperty(process.stdin, 'isTTY', originalIsTTY);
    else Reflect.deleteProperty(process.stdin, 'isTTY');
  });

  it('step 1: a key line segment pins the line and derives the console origin', async () => {
    mockLoadCredentialsFile.mockReturnValue(null);
    const ctx = await resolveLineContext({ siApiKey: chinaKey, operation: 'deploy' });
    expect(ctx.line).toBe('china');
    expect(ctx.consoleUrl).toBe('https://console.serverlessinsight.cn');
    expect(ctx.apiKey).toBe(chinaKey);
    expect(ctx.lineSource).toBe('key-segment');
  });

  it('step 2: yml org selects the line via a unique profile match', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      profiles: { 'china/example-org': chinaProfile },
    });
    const ctx = await resolveLineContext({ declaredOrg: 'example-org', operation: 'deploy' });
    expect(ctx.line).toBe('china');
    expect(ctx.profileKey).toBe('china/example-org');
    expect(ctx.apiKey).toBe(chinaKey);
    expect(ctx.lineSource).toBe('yml-org');
  });

  it('step 2: the same slug on both lines fails fast with a --line hint', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);
    await expect(
      resolveLineContext({ declaredOrg: 'example-org', operation: 'deploy' }),
    ).rejects.toThrow('SAAS_LINE_AMBIGUOUS_ORG');
  });

  it('step 2: --line disambiguates the same YAML org slug on both lines', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);

    await expect(
      resolveLineContext({ declaredOrg: 'example-org', lineFlag: 'international' }),
    ).resolves.toMatchObject({ apiKey: intlKey, profileKey: 'international/example-org' });
  });

  it.each(['flag', 'env'] as const)(
    'uses saved profiles for routing without borrowing org identity for a different %s key',
    async (source) => {
      mockLoadCredentialsFile.mockReturnValue(twoLineFile);
      const override = 'si_cn_abcdef123456_0123456789abcdef0123456789abcdea';
      if (source === 'env') process.env.SI_API_KEY = override;

      const result = await resolveLineContext({
        declaredOrg: 'example-org',
        ...(source === 'flag' ? { siApiKey: override } : {}),
      });

      expect(result).toMatchObject({ line: 'china', apiKey: override, keySource: source });
      expect(result).not.toHaveProperty('profileKey');
      expect(result).not.toHaveProperty('orgId');
      expect(result).not.toHaveProperty('orgSlug');
      expect(result).not.toHaveProperty('orgName');
      expect(result).not.toHaveProperty('userEmail');
      expect(mockLoadCredentialsFile).not.toHaveBeenCalled();
    },
  );

  it('an explicit legacy key never borrows the stored line (issue #309)', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      active: 'china/example-org',
      profiles: { 'china/example-org': chinaProfile },
    });

    await expect(
      resolveLineContext({ declaredOrg: 'other-org', siApiKey: legacyKey }),
    ).rejects.toThrow('SAAS_LINE_UNRESOLVED');
    expect(mockLoadCredentialsFile).not.toHaveBeenCalled();
  });

  it('selects the active legacy credential on its line when YAML names an org', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      active: 'china/legacy-1234',
      profiles: { 'china/legacy-1234': { apiKey: legacyKey, orgId: 'org-cn' } },
    });
    const result = await resolveLineContext({ declaredOrg: 'example-org' });

    expect(result).toMatchObject({
      line: 'china',
      apiKey: legacyKey,
      profileKey: 'china/legacy-1234',
      orgId: 'org-cn',
    });
    expect(result).not.toHaveProperty('orgSlug');
    await expect(
      resolveLineContext({ declaredOrg: 'example-org', lineFlag: 'international' }),
    ).rejects.toThrow('SAAS_BACKEND_NO_CREDENTIALS');
  });

  it('uses an explicitly named org without requiring an active profile', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      profiles: { 'china/example-org': chinaProfile },
    });
    await expect(resolveLineContext({ orgFlag: 'example-org' })).resolves.toMatchObject({
      apiKey: chinaKey,
      lineSource: 'flag',
    });
  });

  it('step 2: an explicit key never selects a stored profile even when the slug matches (issue #309)', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);
    const ctx = await resolveLineContext({
      siApiKey: intlKey,
      declaredOrg: 'example-org',
      operation: 'deploy',
    });
    expect(ctx.line).toBe('international');
    expect(ctx.apiKey).toBe(intlKey);
    expect(ctx.profileKey).toBeUndefined();
    expect(ctx.orgId).toBeUndefined();
    expect(mockLoadCredentialsFile).not.toHaveBeenCalled();
  });

  it('step 3: --line overrides, and disagreeing with the key segment is a conflict', async () => {
    mockLoadCredentialsFile.mockReturnValue(null);
    await expect(
      resolveLineContext({ siApiKey: chinaKey, lineFlag: 'international', operation: 'deploy' }),
    ).rejects.toThrow('SAAS_LINE_CONFLICT');
  });

  it('step 3: --org selects a profile on the --line', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);
    const ctx = await resolveLineContext({ lineFlag: 'international', orgFlag: 'example-org' });
    expect(ctx.line).toBe('international');
    expect(ctx.profileKey).toBe('international/example-org');
  });

  it('step 4: the active profile resolves when nothing else does', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);
    const ctx = await resolveLineContext({ operation: 'deploy' });
    expect(ctx.line).toBe('china');
    expect(ctx.apiKey).toBe(chinaKey);
    expect(ctx.lineSource).toBe('active');
  });

  it('CI guard: an explicit key never reads credentials nor selects a profile (issue #309)', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);
    const ctx = await resolveLineContext({ siApiKey: intlKey, operation: 'deploy' });
    expect(ctx.line).toBe('international');
    expect(ctx.apiKey).toBe(intlKey);
    expect(ctx.keySource).toBe('flag');
    expect(ctx.profileKey).toBeUndefined();
    expect(ctx.orgId).toBeUndefined();
    expect(ctx.orgSlug).toBeUndefined();
    expect(ctx.orgName).toBeUndefined();
    expect(ctx.userEmail).toBeUndefined();
    expect(mockLoadCredentialsFile).not.toHaveBeenCalled();
  });

  it('step 5: non-interactive runs fail fast when nothing resolves', async () => {
    mockLoadCredentialsFile.mockReturnValue(null);
    await expect(resolveLineContext({ operation: 'deploy' })).rejects.toThrow(
      'SAAS_LINE_UNRESOLVED',
    );
  });

  it('no key and no stored profile ends in the no-credentials error', async () => {
    mockLoadCredentialsFile.mockReturnValue({ profiles: { 'china/example-org': chinaProfile } });
    // --line resolves the line, but the profile slug is not named, so no key.
    await expect(resolveLineContext({ lineFlag: 'china', operation: 'deploy' })).rejects.toThrow(
      'SAAS_BACKEND_NO_CREDENTIALS',
    );
  });

  it('a stored profile supplies the key when no explicit key is given', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      profiles: { 'international/acme': { ...intlProfile, orgSlug: 'acme' } },
    });
    const ctx = await resolveLineContext({ declaredOrg: 'acme', operation: 'deploy' });
    expect(ctx.apiKey).toBe(intlKey);
    expect(ctx.orgSlug).toBe('acme');
  });

  it('declaredOrg mismatching the profile slug fails fast (D-6)', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      profiles: { 'china/example-org': chinaProfile },
    });
    await expect(resolveLineContext({ declaredOrg: 'other', operation: 'deploy' })).rejects.toThrow(
      'SAAS_ORG_MISMATCH',
    );
  });

  it('SI_CONSOLE_LINE routes a legacy key and warns deprecation', async () => {
    mockLoadCredentialsFile.mockReturnValue(null);
    process.env.SI_CONSOLE_LINE = 'cn';
    const ctx = await resolveLineContext({ siApiKey: legacyKey, operation: 'deploy' });
    expect(ctx.line).toBe('china');
    expect(ctx.lineSource).toBe('env-legacy');
    expect(logger.warn).toHaveBeenCalledWith('SAAS_LINE_ENV_DEPRECATED');
  });

  it('ignores the legacy environment hint for a stamped stored key', async () => {
    process.env.SI_CONSOLE_LINE = 'international';
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);

    await expect(resolveLineContext({})).resolves.toMatchObject({
      apiKey: chinaKey,
      line: 'china',
    });
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it.each(['1', 'bogus', '2'])(
    'handles profile selection input %s without an active profile',
    async (answer) => {
      setTty(true);
      mockLoadCredentialsFile.mockReturnValue({ profiles: twoLineFile.profiles });
      mockQuestion.mockImplementation((_query, respond: (value: string) => void) =>
        respond(answer),
      );

      if (answer === 'bogus') {
        await expect(resolveLineContext({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');
      } else {
        await expect(resolveLineContext({ operation: 'deploy' })).resolves.toMatchObject({
          apiKey: answer === '1' ? chinaKey : intlKey,
          lineSource: 'prompt',
        });
      }
    },
  );

  it('an invalid --line value is rejected', async () => {
    mockLoadCredentialsFile.mockReturnValue(null);
    await expect(
      resolveLineContext({ lineFlag: 'eu-west-3', operation: 'deploy' }),
    ).rejects.toThrow('SAAS_LINE_INVALID');
  });

  it('the undocumented SI_CONSOLE_URL hook overrides the derived origin', async () => {
    mockLoadCredentialsFile.mockReturnValue(null);
    process.env.SI_CONSOLE_URL = 'http://localhost:3000';
    const ctx = await resolveLineContext({ siApiKey: chinaKey, operation: 'deploy' });
    expect(ctx.consoleUrl).toBe('http://localhost:3000');
  });
});

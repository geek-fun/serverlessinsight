jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

const mockLoadCredentialsFile = jest.fn();

jest.mock('../../../src/common/credentialStore', () => ({
  ...jest.requireActual('../../../src/common/credentialStore'),
  loadCredentialsFile: (...args: unknown[]) => mockLoadCredentialsFile(...args),
}));

const ORIGINAL_ENV = { ...process.env };

import { logger } from '../../../src/common/logger';
import { resolveLineContext } from '../../../src/common/lineContext';

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

const twoLineFile = {
  active: 'china/wentsen',
  profiles: { 'china/wentsen': chinaProfile, 'international/wentsen': intlProfile },
};

describe('resolveLineContext (ADR-008 resolution order)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadCredentialsFile.mockReset();
    process.env = { ...ORIGINAL_ENV };
    delete process.env.SI_API_KEY;
    delete process.env.SI_CONSOLE_LINE;
    delete process.env.SI_CONSOLE_URL;
    delete process.env.SI_CONSOLE_UI_URL;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
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
      profiles: { 'china/wentsen': chinaProfile },
    });
    const ctx = await resolveLineContext({ declaredOrg: 'wentsen', operation: 'deploy' });
    expect(ctx.line).toBe('china');
    expect(ctx.profileKey).toBe('china/wentsen');
    expect(ctx.apiKey).toBe(chinaKey);
    expect(ctx.lineSource).toBe('yml-org');
  });

  it('step 2: the same slug on both lines fails fast with a --line hint', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);
    await expect(
      resolveLineContext({ declaredOrg: 'wentsen', operation: 'deploy' }),
    ).rejects.toThrow('SAAS_LINE_AMBIGUOUS_ORG');
  });

  it('step 2: a key segment restricts the slug lookup to its own line', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);
    const ctx = await resolveLineContext({
      siApiKey: intlKey,
      declaredOrg: 'wentsen',
      operation: 'deploy',
    });
    expect(ctx.line).toBe('international');
    expect(ctx.profileKey).toBe('international/wentsen');
    expect(ctx.orgId).toBe('org-com');
  });

  it('step 3: --line overrides, and disagreeing with the key segment is a conflict', async () => {
    mockLoadCredentialsFile.mockReturnValue(null);
    await expect(
      resolveLineContext({ siApiKey: chinaKey, lineFlag: 'international', operation: 'deploy' }),
    ).rejects.toThrow('SAAS_LINE_CONFLICT');
  });

  it('step 3: --org selects a profile on the --line', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);
    const ctx = await resolveLineContext({ lineFlag: 'international', orgFlag: 'wentsen' });
    expect(ctx.line).toBe('international');
    expect(ctx.profileKey).toBe('international/wentsen');
  });

  it('step 4: the active profile resolves when nothing else does', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);
    const ctx = await resolveLineContext({ operation: 'deploy' });
    expect(ctx.line).toBe('china');
    expect(ctx.apiKey).toBe(chinaKey);
    expect(ctx.lineSource).toBe('active');
  });

  it('step 4: a key segment silently overrides an active profile on the other line (CI case)', async () => {
    mockLoadCredentialsFile.mockReturnValue(twoLineFile);
    const ctx = await resolveLineContext({ siApiKey: intlKey, operation: 'deploy' });
    expect(ctx.line).toBe('international');
    expect(ctx.apiKey).toBe(intlKey);
    expect(ctx.profileKey).toBe('international/wentsen');
  });

  it('step 5: non-interactive runs fail fast when nothing resolves', async () => {
    mockLoadCredentialsFile.mockReturnValue(null);
    await expect(resolveLineContext({ operation: 'deploy' })).rejects.toThrow(
      'SAAS_LINE_UNRESOLVED',
    );
  });

  it('no key and no stored profile ends in the no-credentials error', async () => {
    mockLoadCredentialsFile.mockReturnValue({ profiles: { 'china/wentsen': chinaProfile } });
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
      profiles: { 'china/wentsen': chinaProfile },
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

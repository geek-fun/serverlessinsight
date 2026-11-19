jest.mock('../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, unknown>) =>
      params
        ? key +
          ' ' +
          Object.entries(params)
            .map(([k, v]) => `${k}=${v}`)
            .join(' ')
        : key,
  },
}));

const mockLoadCredentialsFile = jest.fn();

jest.mock('../../../src/common/credentialStore', () => ({
  loadCredentialsFile: (...args: unknown[]) => mockLoadCredentialsFile(...args),
}));

import { whoami } from '../../../src/commands/whoami';

const chinaProfile = {
  apiKey: 'si_cn_abcdef123456_0123456789abcdef0123456789abcdef',
  orgId: 'org-cn',
  orgName: 'Example Org',
  orgSlug: 'example-org',
  userEmail: 'owner@example.com',
};

const intlProfile = {
  apiKey: 'si_com_abcdef123456_0123456789abcdef0123456789abcdef',
  orgId: 'org-com',
  orgSlug: 'acme',
};

describe('whoami command (ADR-008 multi-profile)', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadCredentialsFile.mockReturnValue(null);
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('prints not-logged-in message when no profiles exist', async () => {
    await whoami();

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('WHOAMI_NOT_LOGGED_IN');
  });

  it('prints the whole profile report as one block (issue #315)', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      active: 'china/example-org',
      profiles: { 'china/example-org': chinaProfile, 'international/acme': intlProfile },
    });

    await whoami();

    // The report is one user-facing block, not a per-line log stream.
    expect(logSpy).toHaveBeenCalledTimes(1);
    const lines = (logSpy.mock.calls[0][0] as string).split('\n');
    expect(lines.some((l) => l.includes('WHOAMI_PROFILES_HEADER') && l.includes('count=2'))).toBe(
      true,
    );
    expect(lines.some((l) => l.includes('china/example-org'))).toBe(true);
    expect(lines.some((l) => l.includes('international/acme'))).toBe(true);
    // Active profile marker + suffix only on the active entry
    const activeLine = lines.find((l) => l.includes('profileKey=china/example-org'));
    expect(activeLine).toContain('WHOAMI_ACTIVE_MARK');
    expect(activeLine).toContain('WHOAMI_ACTIVE_SUFFIX');
    const inactiveLine = lines.find((l) => l.includes('profileKey=international/acme'));
    expect(inactiveLine).not.toContain('WHOAMI_ACTIVE_MARK');
    // Console origin is derived from the active profile's line
    expect(lines.some((l) => l.includes('https://console.serverlessinsight.cn'))).toBe(true);
  });

  it('falls back to orgId when orgName is missing and shows the international origin', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      active: 'international/acme',
      profiles: { 'international/acme': intlProfile },
    });

    await whoami();

    const lines = (logSpy.mock.calls[0][0] as string).split('\n');
    expect(lines.some((l) => l.includes('org-com'))).toBe(true);
    expect(lines.some((l) => l.includes('https://console.serverlessinsight.com'))).toBe(true);
  });
});

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

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
import { logger } from '../../../src/common/logger';

const chinaProfile = {
  apiKey: 'si_cn_abcdef123456_0123456789abcdef0123456789abcdef',
  orgId: 'org-cn',
  orgName: 'Wentsen',
  orgSlug: 'wentsen',
  userEmail: 'owner@wentsen.com',
};

const intlProfile = {
  apiKey: 'si_com_abcdef123456_0123456789abcdef0123456789abcdef',
  orgId: 'org-com',
  orgSlug: 'acme',
};

describe('whoami command (ADR-008 multi-profile)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadCredentialsFile.mockReturnValue(null);
  });

  it('prints not-logged-in message when no profiles exist', async () => {
    await whoami();

    expect(logger.info).toHaveBeenCalledWith('WHOAMI_NOT_LOGGED_IN');
  });

  it('lists every profile and marks the active one', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      active: 'china/wentsen',
      profiles: { 'china/wentsen': chinaProfile, 'international/acme': intlProfile },
    });

    await whoami();

    const calls = (logger.info as jest.Mock).mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes('WHOAMI_PROFILES_HEADER') && c.includes('count=2'))).toBe(
      true,
    );
    expect(calls.some((c) => c.includes('china/wentsen'))).toBe(true);
    expect(calls.some((c) => c.includes('international/acme'))).toBe(true);
    // Active profile marker + suffix only on the active entry
    const activeLine = calls.find(
      (c) => c.includes('WHOAMI_PROFILE') && c.includes('profileKey=china/wentsen'),
    );
    expect(activeLine).toContain('WHOAMI_ACTIVE_MARK');
    expect(activeLine).toContain('WHOAMI_ACTIVE_SUFFIX');
    const inactiveLine = calls.find(
      (c) => c.includes('WHOAMI_PROFILE') && c.includes('profileKey=international/acme'),
    );
    expect(inactiveLine).not.toContain('WHOAMI_ACTIVE_MARK');
  });

  it('falls back to orgId when orgName is missing and shows the active line origin', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      active: 'international/acme',
      profiles: { 'international/acme': intlProfile },
    });

    await whoami();

    const calls = (logger.info as jest.Mock).mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes('org-com'))).toBe(true);
    expect(calls.some((c) => c.includes('https://console.serverlessinsight.com'))).toBe(true);
  });
});

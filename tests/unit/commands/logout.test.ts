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

const mockRemoveActiveProfile = jest.fn();

jest.mock('../../../src/common/credentialStore', () => ({
  removeActiveProfile: (...args: unknown[]) => mockRemoveActiveProfile(...args),
}));

import { logout } from '../../../src/commands/logout';
import { logger } from '../../../src/common/logger';

describe('logout command (ADR-008 active profile)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRemoveActiveProfile.mockReturnValue(null);
  });

  it('prints not-logged-in message when there is no active profile', async () => {
    await logout();

    expect(logger.info).toHaveBeenCalledWith('LOGOUT_NOT_LOGGED_IN');
  });

  it('logs out of the active profile only', async () => {
    mockRemoveActiveProfile.mockReturnValue({
      apiKey: 'si_cn_abcdef123456_0123456789abcdef0123456789abcdef',
      orgId: 'org-cn',
      orgSlug: 'wentsen',
      line: 'china',
      profileKey: 'china/wentsen',
    });

    await logout();

    expect(logger.info).toHaveBeenCalledWith('LOGOUT_SUCCESS profileKey=china/wentsen');
  });
});

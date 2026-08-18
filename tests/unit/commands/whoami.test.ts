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

const mockLoadCredentials = jest.fn();

jest.mock('../../../src/common/credentialStore', () => ({
  loadCredentials: (...args: unknown[]) => mockLoadCredentials(...args),
}));

import { whoami } from '../../../src/commands/whoami';
import { logger } from '../../../src/common/logger';

describe('whoami command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadCredentials.mockReturnValue(null);
  });

  it('prints not-logged-in message when no credentials exist', async () => {
    await whoami();

    expect(logger.info).toHaveBeenCalledWith('WHOAMI_NOT_LOGGED_IN');
  });

  it('prints account details when logged in', async () => {
    mockLoadCredentials.mockReturnValue({
      apiKey: 'si_abcdef123456_0123456789abcdef0123456789abcdef01',
      consoleUrl: 'https://api.console.test.com',
      orgId: 'org-1',
      orgName: 'Test Org',
      userEmail: 'user@test.com',
    });

    await whoami();

    const calls = (logger.info as jest.Mock).mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes('user@test.com'))).toBe(true);
    expect(calls.some((c) => c.includes('Test Org'))).toBe(true);
    expect(calls.some((c) => c.includes('https://api.console.test.com'))).toBe(true);
    expect(calls.some((c) => c.includes('si_abcdef123'))).toBe(true);
  });

  it('falls back to orgId and unknown email when fields are missing', async () => {
    mockLoadCredentials.mockReturnValue({
      apiKey: 'si_abcdef123456_0123456789abcdef0123456789abcdef01',
      consoleUrl: 'https://api.console.test.com',
      orgId: 'org-1',
    });

    await whoami();

    const calls = (logger.info as jest.Mock).mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes('(unknown)'))).toBe(true);
    expect(calls.some((c) => c.includes('org-1'))).toBe(true);
  });
});

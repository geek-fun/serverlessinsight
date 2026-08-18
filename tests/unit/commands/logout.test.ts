jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

const mockLoadCredentials = jest.fn();
const mockDeleteCredentials = jest.fn();

jest.mock('../../../src/common/credentialStore', () => ({
  loadCredentials: (...args: unknown[]) => mockLoadCredentials(...args),
  deleteCredentials: (...args: unknown[]) => mockDeleteCredentials(...args),
}));

import { logout } from '../../../src/commands/logout';
import { logger } from '../../../src/common/logger';

describe('logout command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadCredentials.mockReturnValue(null);
  });

  it('prints not-logged-in message when no credentials exist', async () => {
    await logout();

    expect(logger.info).toHaveBeenCalledWith('LOGOUT_NOT_LOGGED_IN');
    expect(mockDeleteCredentials).not.toHaveBeenCalled();
  });

  it('deletes credentials when logged in', async () => {
    mockLoadCredentials.mockReturnValue({
      apiKey: 'si_abcdef123456_0123456789abcdef0123456789abcdef01',
      consoleUrl: 'https://api.console.test.com',
      orgId: 'org-1',
      userEmail: 'user@test.com',
      orgName: 'Test Org',
    });

    await logout();

    expect(mockDeleteCredentials).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith('LOGOUT_SUCCESS');
  });
});

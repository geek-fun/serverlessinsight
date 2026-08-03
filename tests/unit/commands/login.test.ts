jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

jest.mock('../../../src/common/apiClient', () => ({
  validateApiKey: jest.fn(),
}));

jest.mock('open', () => jest.fn());

const mockLoadCredentials = jest.fn();
const mockSaveCredentials = jest.fn();
const mockDeleteCredentials = jest.fn();
const mockResolveConsoleUrl = jest.fn();
const mockValidateApiKeyFormat = jest.fn();

jest.mock('../../../src/common/credentialStore', () => ({
  loadCredentials: (...args: unknown[]) => mockLoadCredentials(...args),
  saveCredentials: (...args: unknown[]) => mockSaveCredentials(...args),
  deleteCredentials: (...args: unknown[]) => mockDeleteCredentials(...args),
  resolveConsoleUrl: (...args: unknown[]) => mockResolveConsoleUrl(...args),
  validateApiKeyFormat: (...args: unknown[]) => mockValidateApiKeyFormat(...args),
}));

let mockReadlineAnswer = '2';
jest.mock('node:readline', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn((_query: string, callback: (answer: string) => void) => {
      callback(mockReadlineAnswer);
    }),
    close: jest.fn(),
  })),
}));

import { login } from '../../../src/commands/login';
import { validateApiKey } from '../../../src/common/apiClient';
import { logger } from '../../../src/common/logger';

const mockValidateApiKey = validateApiKey as jest.Mock;

describe('login command', () => {
  const ORIGINAL_ENV = { ...process.env };
  const validKey = 'si_abcdef123456_0123456789abcdef0123456789abcdef01';

  beforeEach(() => {
    jest.clearAllMocks();
    mockReadlineAnswer = '2';
    process.env = { ...ORIGINAL_ENV };
    delete process.env.SI_API_KEY;
    delete process.env.SI_CONSOLE_URL;
    mockResolveConsoleUrl.mockReturnValue('https://api.console.test.com');
    mockValidateApiKeyFormat.mockReturnValue(true);
    mockLoadCredentials.mockReturnValue(null);
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('logs in with --si-api-key and saves credentials', async () => {
    mockValidateApiKey.mockResolvedValue({
      orgId: 'org-1',
      orgName: 'Test Org',
      userEmail: 'user@test.com',
      scopes: ['deploy'],
    });

    await login({ siApiKey: validKey });

    expect(mockValidateApiKey).toHaveBeenCalledWith(validKey, 'https://api.console.test.com');
    expect(mockSaveCredentials).toHaveBeenCalledWith({
      apiKey: validKey,
      consoleUrl: 'https://api.console.test.com',
      orgId: 'org-1',
      orgName: 'Test Org',
      userEmail: 'user@test.com',
    });
    expect(logger.info).toHaveBeenCalled();
  });

  it('logs in via SI_API_KEY env var', async () => {
    process.env.SI_API_KEY = validKey;
    mockValidateApiKey.mockResolvedValue({
      orgId: 'org-1',
      orgName: 'Test Org',
      userEmail: 'user@test.com',
      scopes: ['deploy'],
    });

    await login({});

    expect(mockValidateApiKey).toHaveBeenCalledWith(validKey, 'https://api.console.test.com');
    expect(mockSaveCredentials).toHaveBeenCalled();
  });

  it('rejects an invalid API key format', async () => {
    mockValidateApiKeyFormat.mockReturnValue(false);

    await login({ siApiKey: 'bad-key' });

    expect(mockValidateApiKey).not.toHaveBeenCalled();
    expect(mockSaveCredentials).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });

  it('handles validateApiKey failure gracefully', async () => {
    mockValidateApiKey.mockRejectedValue(new Error('network down'));

    await login({ siApiKey: validKey });

    expect(mockSaveCredentials).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalled();
  });

  it('asks for confirmation and re-authenticates when already logged in', async () => {
    mockReadlineAnswer = 'y';
    mockLoadCredentials.mockReturnValue({
      apiKey: 'si_oldkey123456_0123456789abcdef0123456789abcdef01',
      consoleUrl: 'https://api.console.test.com',
      orgId: 'org-1',
      userEmail: 'old@test.com',
      orgName: 'Old Org',
    });
    mockValidateApiKey.mockResolvedValue({
      orgId: 'org-2',
      orgName: 'New Org',
      userEmail: 'user@test.com',
      scopes: ['deploy'],
    });

    await login({ siApiKey: validKey });

    expect(mockDeleteCredentials).toHaveBeenCalled();
    expect(mockSaveCredentials).toHaveBeenCalled();
  });

  it('cancels when the user declines re-authentication', async () => {
    mockReadlineAnswer = 'n';
    mockLoadCredentials.mockReturnValue({
      apiKey: 'si_oldkey123456_0123456789abcdef0123456789abcdef01',
      consoleUrl: 'https://api.console.test.com',
      orgId: 'org-1',
      userEmail: 'old@test.com',
      orgName: 'Old Org',
    });

    await login({ siApiKey: validKey });

    expect(mockDeleteCredentials).not.toHaveBeenCalled();
    expect(mockSaveCredentials).not.toHaveBeenCalled();
  });

  it('prompts for a key when no flag or env is set', async () => {
    mockValidateApiKey.mockResolvedValue({
      orgId: 'org-1',
      orgName: 'Test Org',
      userEmail: 'user@test.com',
      scopes: ['deploy'],
    });

    await login({});

    expect(mockSaveCredentials).toHaveBeenCalled();
  });

  it('completes the browser callback flow and saves credentials', async () => {
    mockReadlineAnswer = '1';

    const openMock = jest.requireMock('open') as jest.Mock;
    openMock.mockImplementation(() => Promise.resolve());

    const loginPromise = login({});
    await new Promise((resolve) => setTimeout(resolve, 300));

    const fullUrl = openMock.mock.calls[0]?.[0] as string;
    expect(fullUrl).toContain('/cli/authorize');
    const redirectUri = new URL(fullUrl).searchParams.get('redirect_uri') as string;
    const port = new URL(redirectUri).port;

    const res = await fetch(
      `http://127.0.0.1:${port}/callback?api_key=si_abcdef123456_0123456789abcdef0123456789abcdef01&org_id=org-1&org_name=Test%20Org&user_email=user%40test.com`,
    );
    expect(res.status).toBe(200);

    await loginPromise;

    expect(mockSaveCredentials).toHaveBeenCalledWith({
      apiKey: 'si_abcdef123456_0123456789abcdef0123456789abcdef01',
      consoleUrl: 'https://api.console.test.com',
      orgId: 'org-1',
      orgName: 'Test Org',
      userEmail: 'user@test.com',
    });
  });
});

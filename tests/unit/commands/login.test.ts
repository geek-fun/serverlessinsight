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

const mockReadlineAnswers: string[] = [];
jest.mock('node:readline', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn((_query: string, callback: (answer: string) => void) => {
      callback(mockReadlineAnswers.length > 0 ? mockReadlineAnswers.shift()! : '');
    }),
    close: jest.fn(),
  })),
}));

const mockServer = {
  listen: jest.fn(),
  close: jest.fn(),
  closeAllConnections: jest.fn(),
};
jest.mock('node:http', () => ({
  ...jest.requireActual('node:http'),
  createServer: jest.fn(() => mockServer),
}));

const mockSaveProfile = jest.fn();
const mockLoadCredentialsFile = jest.fn();

jest.mock('../../../src/common/credentialStore', () => ({
  saveProfile: (...args: unknown[]) => mockSaveProfile(...args),
  loadCredentialsFile: (...args: unknown[]) => mockLoadCredentialsFile(...args),
}));

import * as readline from 'node:readline';
import { login } from '../../../src/commands/login';
import { validateApiKey } from '../../../src/common/apiClient';
import { logger } from '../../../src/common/logger';

const mockValidateApiKey = validateApiKey as jest.Mock;

/** The interactive login paths gate on stdin.isTTY; jest's stdin is not a TTY. */
const setTty = (value: boolean | undefined): void => {
  Object.defineProperty(process.stdin, 'isTTY', { value, configurable: true });
};

type BrowserCallbackHandler = (req: { url?: string }, res: unknown) => Promise<void>;

/**
 * Point `open` at the given implementation and make the mocked server "listen"
 * immediately, the way every browser-flow test needs it.
 */
const setupBrowserLogin = (
  openImplementation: () => unknown = () => Promise.resolve(),
): jest.Mock => {
  const openMock = jest.requireMock('open') as jest.Mock;
  openMock.mockImplementation(openImplementation);
  mockServer.listen.mockImplementationOnce((_port: unknown, _host: unknown, cb: () => void) => {
    cb();
    return mockServer;
  });
  return openMock;
};

/**
 * Resolve the callback-server handler as soon as login() registers it — polls
 * the observable condition instead of sleeping a fixed 50ms, so slow machines
 * never race the registration and fast ones never waste the wait.
 */
const waitForCallbackServer = async (): Promise<BrowserCallbackHandler> => {
  const createServerMock = jest.requireMock('node:http').createServer as jest.Mock;
  const deadline = Date.now() + 5_000;
  while (createServerMock.mock.calls.length === 0) {
    if (Date.now() > deadline) {
      throw new Error('login did not start the callback server within 5s');
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return createServerMock.mock.calls[0][0] as BrowserCallbackHandler;
};

const identity = (overrides: Record<string, unknown> = {}) => ({
  orgId: 'org-1',
  orgName: 'Test Org',
  orgSlug: 'test-org',
  userEmail: 'user@test.com',
  scopes: ['deploy'],
  ...overrides,
});

describe('login command (ADR-008)', () => {
  const ORIGINAL_ENV = { ...process.env };
  const originalIsTTY = Object.getOwnPropertyDescriptor(process.stdin, 'isTTY');
  const legacyKey = 'si_abcdef123456_0123456789abcdef0123456789abcdef';
  const chinaKey = 'si_cn_abcdef123456_0123456789abcdef0123456789abcdef';
  const intlKey = 'si_com_abcdef123456_0123456789abcdef0123456789abcdef';

  beforeEach(() => {
    jest.clearAllMocks();
    setTty(false);
    mockReadlineAnswers.length = 0;
    process.env = { ...ORIGINAL_ENV };
    delete process.env.SI_API_KEY;
    delete process.env.SI_CONSOLE_URL;
    delete process.env.SI_CONSOLE_UI_URL;
    delete process.env.SI_CONSOLE_LINE;
    mockLoadCredentialsFile.mockReturnValue(null);
    mockValidateApiKey.mockResolvedValue(identity());
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
    if (originalIsTTY) Object.defineProperty(process.stdin, 'isTTY', originalIsTTY);
    else Reflect.deleteProperty(process.stdin, 'isTTY');
  });

  describe('key login', () => {
    it('derives the line from the key segment and stores the profile', async () => {
      await login({ siApiKey: chinaKey });

      expect(mockValidateApiKey).toHaveBeenCalledWith(
        chinaKey,
        'https://console.serverlessinsight.cn',
      );
      expect(mockSaveProfile).toHaveBeenCalledWith(
        'china',
        expect.objectContaining({ apiKey: chinaKey, orgId: 'org-1', orgSlug: 'test-org' }),
        { activate: true },
      );
    });

    it('accepts a legacy key with an explicit --line', async () => {
      await login({ siApiKey: legacyKey, line: 'china' });

      expect(mockValidateApiKey).toHaveBeenCalledWith(
        legacyKey,
        'https://console.serverlessinsight.cn',
      );
      expect(mockSaveProfile).toHaveBeenCalledWith(
        'china',
        expect.objectContaining({ apiKey: legacyKey }),
        { activate: true },
      );
    });

    it('rejects a key whose segment disagrees with --line', async () => {
      await login({ siApiKey: chinaKey, line: 'international' });

      expect(logger.error).toHaveBeenCalledWith('LOGIN_LINE_MISMATCH');
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('fails a segment-less key with no line source outside a TTY', async () => {
      setTty(false);
      await login({ siApiKey: legacyKey });

      expect(logger.error).toHaveBeenCalledWith('LOGIN_NEED_LINE');
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('lets an interactive login pick the line for a supplied legacy key', async () => {
      setTty(true);
      mockReadlineAnswers.push('invalid', '9', '2');

      await login({ siApiKey: legacyKey });

      expect(mockValidateApiKey).toHaveBeenCalledWith(
        legacyKey,
        'https://console.serverlessinsight.cn',
      );
      expect(readline.createInterface).toHaveBeenCalledTimes(3);
    });

    it('accepts a key entered manually after choosing the default line', async () => {
      setTty(true);
      mockReadlineAnswers.push('', '2', ` ${intlKey} `);

      await login({});

      expect(mockValidateApiKey).toHaveBeenCalledWith(
        intlKey,
        'https://console.serverlessinsight.com',
      );
      expect(mockSaveProfile).toHaveBeenCalledWith(
        'international',
        expect.objectContaining({ apiKey: intlKey }),
        { activate: true },
      );
    });

    it('reports that the line cannot be resolved without arguments or a TTY', async () => {
      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');
      expect(readline.createInterface).not.toHaveBeenCalled();
    });

    it('routes a legacy key through the deprecated SI_CONSOLE_LINE with a warning', async () => {
      process.env.SI_CONSOLE_LINE = 'cn';
      await login({ siApiKey: legacyKey });

      expect(logger.warn).toHaveBeenCalledWith('SAAS_LINE_ENV_DEPRECATED');
      expect(mockSaveProfile).toHaveBeenCalledWith(
        'china',
        expect.objectContaining({ apiKey: legacyKey }),
        { activate: true },
      );
    });

    it('rejects --org when the validated org slug differs', async () => {
      await login({ siApiKey: chinaKey, org: 'other-org' });

      expect(logger.error).toHaveBeenCalledWith('LOGIN_ORG_MISMATCH');
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('cross-checks the validate region against the login line (ADR-008)', async () => {
      // Key segment says cn and the line is china; a console reporting region
      // "com" is misconfigured — refuse to store.
      mockValidateApiKey.mockResolvedValue(identity({ region: 'com' }));

      await login({ siApiKey: chinaKey });

      expect(logger.error).toHaveBeenCalledWith('LOGIN_LINE_MISMATCH');
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('accepts a matching validate region', async () => {
      mockValidateApiKey.mockResolvedValue(identity({ region: 'cn' }));

      await login({ siApiKey: chinaKey });

      expect(mockSaveProfile).toHaveBeenCalledWith(
        'china',
        expect.objectContaining({ apiKey: chinaKey }),
        { activate: true },
      );
    });

    it('logs in via SI_API_KEY env var', async () => {
      process.env.SI_API_KEY = intlKey;

      await login({});

      expect(mockSaveProfile).toHaveBeenCalledWith(
        'international',
        expect.objectContaining({ apiKey: intlKey }),
        { activate: true },
      );
    });

    it('rejects a malformed key before any network call', async () => {
      await login({ siApiKey: 'not-a-key' });

      expect(mockValidateApiKey).not.toHaveBeenCalled();
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });
  });

  describe('browser login', () => {
    beforeEach(() => {
      setTty(true);
    });

    it('picks the line interactively and stores the profile under that line', async () => {
      mockReadlineAnswers.push('2'); // line picker → china
      mockReadlineAnswers.push('1'); // method → browser
      setupBrowserLogin();

      const loginPromise = login({});
      const handler = await waitForCallbackServer();
      handler(
        {
          url:
            '/callback?api_key=' +
            chinaKey +
            '&org_id=org-1&org_name=Test%20Org&user_email=user@test.com',
        },
        { writeHead: jest.fn(), end: jest.fn() },
      );

      await loginPromise;

      expect(mockValidateApiKey).toHaveBeenCalledWith(
        chinaKey,
        'https://console.serverlessinsight.cn',
      );
      expect(mockSaveProfile).toHaveBeenCalledWith(
        'china',
        expect.objectContaining({ apiKey: chinaKey, orgSlug: 'test-org' }),
        { activate: true },
      );
    });

    it('refuses a callback key from a different line than the login line', async () => {
      mockReadlineAnswers.push('1'); // line picker → international
      mockReadlineAnswers.push('1'); // method → browser
      setupBrowserLogin();

      const loginPromise = login({});
      const handler = await waitForCallbackServer();
      handler(
        {
          url:
            '/callback?api_key=' +
            chinaKey +
            '&org_id=org-1&org_name=Test%20Org&user_email=user@test.com',
        },
        { writeHead: jest.fn(), end: jest.fn() },
      );

      await loginPromise;

      expect(logger.error).toHaveBeenCalledWith('LOGIN_LINE_MISMATCH');
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('heals the org slug from validate when the callback lacks it', async () => {
      mockReadlineAnswers.push('1'); // line picker → international
      mockReadlineAnswers.push('1'); // method → browser
      setupBrowserLogin();

      const loginPromise = login({});
      const handler = await waitForCallbackServer();
      handler(
        {
          url:
            '/callback?api_key=' +
            intlKey +
            '&org_id=org-1&org_name=Test%20Org&user_email=user@test.com',
        },
        { writeHead: jest.fn(), end: jest.fn() },
      );

      await loginPromise;

      expect(mockSaveProfile).toHaveBeenCalledWith(
        'international',
        expect.objectContaining({ orgSlug: 'test-org' }),
        { activate: true },
      );
    });

    it('keeps the callback identity when the validate endpoint is temporarily unavailable', async () => {
      mockReadlineAnswers.push('1');
      mockValidateApiKey.mockRejectedValueOnce(new Error('network error'));
      setupBrowserLogin();

      const loginPromise = login({ line: 'international' });
      const handler = await waitForCallbackServer();
      await handler(
        {
          url: `/callback?api_key=${intlKey}&org_id=org-1&org_name=Example&user_email=user@example.com`,
        },
        { writeHead: jest.fn(), end: jest.fn() },
      );
      await loginPromise;

      expect(mockSaveProfile).toHaveBeenCalledWith(
        'international',
        expect.objectContaining({ apiKey: intlKey, orgId: 'org-1', orgName: 'Example' }),
        { activate: true },
      );
    });

    it('accepts the console POST body so the key never rides the URL', async () => {
      mockReadlineAnswers.push('1'); // line picker → international
      mockReadlineAnswers.push('1'); // method → browser
      setupBrowserLogin();

      const loginPromise = login({});
      const handler = await waitForCallbackServer();
      const payload = {
        api_key: intlKey,
        org_id: 'org-1',
        org_name: 'Test Org',
        user_email: 'user@test.com',
      };
      const req = {
        url: '/callback',
        method: 'POST',
        on: (event: string, cb: (chunk?: unknown) => void) => {
          if (event === 'data') cb(JSON.stringify(payload));
          if (event === 'end') cb();
        },
      };
      await handler(req as unknown as import('node:http').IncomingMessage, {
        writeHead: jest.fn(),
        end: jest.fn(),
      });

      await loginPromise;

      expect(mockSaveProfile).toHaveBeenCalledWith(
        'international',
        expect.objectContaining({ apiKey: intlKey, orgId: 'org-1' }),
        { activate: true },
      );
      expect(mockValidateApiKey).toHaveBeenCalledWith(
        intlKey,
        'https://console.serverlessinsight.com',
      );
    });

    it('warns when the browser opener throws synchronously', async () => {
      mockReadlineAnswers.push('1');
      mockReadlineAnswers.push('1');
      setupBrowserLogin(() => {
        throw new Error('browser unavailable');
      });

      const loginPromise = login({});
      const handler = await waitForCallbackServer();
      await handler({ url: '/callback?api_key=key' }, { writeHead: jest.fn(), end: jest.fn() });
      await loginPromise;

      expect(logger.warn).toHaveBeenCalledWith('LOGIN_BROWSER_UNAVAILABLE');
    });
  });

  describe('already logged in', () => {
    beforeEach(() => {
      setTty(true);
      mockLoadCredentialsFile.mockReturnValue({
        active: 'china/example-org',
        profiles: {
          'china/example-org': {
            apiKey: chinaKey,
            orgId: 'org-1',
            orgSlug: 'example-org',
            orgName: 'Example Org',
          },
        },
      });
    });

    it('cancels when the user declines re-login', async () => {
      mockReadlineAnswers.push('n');

      await login({ siApiKey: chinaKey });

      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('re-login proceeds and overwrites the target profile', async () => {
      mockReadlineAnswers.push('y');

      await login({ siApiKey: chinaKey });

      expect(mockSaveProfile).toHaveBeenCalledWith(
        'china',
        expect.objectContaining({ apiKey: chinaKey }),
        { activate: true },
      );
    });

    it('validates and saves a supplied key without prompting when stdin is not a TTY', async () => {
      setTty(false);

      await login({ siApiKey: intlKey, line: 'international', org: 'test-org' });

      expect(readline.createInterface).not.toHaveBeenCalled();
      expect(mockValidateApiKey).toHaveBeenCalledWith(
        intlKey,
        'https://console.serverlessinsight.com',
      );
      expect(mockSaveProfile).toHaveBeenCalledWith(
        'international',
        expect.objectContaining({ apiKey: intlKey, orgSlug: 'test-org' }),
        { activate: true },
      );
    });
  });
});

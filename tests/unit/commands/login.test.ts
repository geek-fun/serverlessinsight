jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: jest.fn((key: string) => key) },
}));

jest.mock('../../../src/common/apiClient', () => {
  class MockApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
    }
  }
  return { validateApiKey: jest.fn(), ApiError: MockApiError };
});

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
const mockUpdateProfile = jest.fn();
const mockReadLegacyConsoleUrl = jest.fn();

jest.mock('../../../src/common/credentialStore', () => ({
  saveProfile: (...args: unknown[]) => mockSaveProfile(...args),
  loadCredentialsFile: (...args: unknown[]) => mockLoadCredentialsFile(...args),
  updateProfile: (...args: unknown[]) => mockUpdateProfile(...args),
  readLegacyConsoleUrl: (...args: unknown[]) => mockReadLegacyConsoleUrl(...args),
}));

import * as readline from 'node:readline';
import type { IncomingMessage } from 'node:http';
import { login } from '../../../src/commands/login';
import { validateApiKey } from '../../../src/common/apiClient';
import { logger } from '../../../src/common/logger';
import { lang } from '../../../src/lang';

const mockValidateApiKey = validateApiKey as jest.Mock;
/** The lang mock returns the bare key; its calls keep the placeholder params. */
const langMock = lang.__ as jest.Mock;

/** The interactive login paths gate on stdin.isTTY; jest's stdin is not a TTY. */
const setTty = (value: boolean | undefined): void => {
  Object.defineProperty(process.stdin, 'isTTY', { value, configurable: true });
};

type BrowserCallbackHandler = (
  req: Partial<Pick<IncomingMessage, 'url' | 'method' | 'headers' | 'on'>>,
  res: unknown,
) => Promise<void>;

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
    mockReadLegacyConsoleUrl.mockReturnValue(null);
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

    it.each([
      { line: 'international', origin: 'https://console.serverlessinsight.com' },
      { line: 'china', origin: 'https://console.serverlessinsight.cn' },
      { line: 'international', origin: 'http://localhost:5173', uiUrl: 'http://localhost:5173/' },
    ])('allows the JSON preflight from $origin for $line', async ({ line, origin, uiUrl }) => {
      if (uiUrl) process.env.SI_CONSOLE_UI_URL = uiUrl;
      mockReadlineAnswers.push('1');
      setupBrowserLogin();
      const loginPromise = login({ line });
      const handler = await waitForCallbackServer();
      const key = line === 'china' ? chinaKey : intlKey;
      const response = { writeHead: jest.fn(), end: jest.fn() };

      await handler(
        {
          url: `/callback?api_key=${key}`,
          method: 'OPTIONS',
          headers: {
            origin,
            'access-control-request-method': 'POST',
            'access-control-request-headers': 'content-type',
          },
        },
        response,
      );

      expect(response.writeHead).toHaveBeenCalledWith(204, {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        Vary: 'Origin',
      });
      expect(response.end).toHaveBeenCalledWith();
      expect(mockValidateApiKey).not.toHaveBeenCalled();
      expect(mockSaveProfile).not.toHaveBeenCalled();
      expect(mockServer.close).not.toHaveBeenCalled();

      await handler(
        { url: `/callback?api_key=${key}`, method: 'GET' },
        {
          writeHead: jest.fn(),
          end: jest.fn(),
        },
      );
      await loginPromise;
      expect(mockSaveProfile).toHaveBeenCalledTimes(1);
    });

    it.each(['OPTIONS', 'POST'])(
      'rejects %s callbacks from an unexpected origin and keeps waiting',
      async (method) => {
        mockReadlineAnswers.push('1');
        setupBrowserLogin();
        const loginPromise = login({ line: 'international' });
        const handler = await waitForCallbackServer();
        const response = { writeHead: jest.fn(), end: jest.fn() };
        const on = jest.fn();

        await handler(
          {
            url: `/callback?api_key=${intlKey}`,
            method,
            headers: { origin: 'https://unexpected.example.test' },
            on,
          },
          response,
        );

        expect(response.writeHead).toHaveBeenCalledWith(403, {
          'Content-Type': 'text/plain; charset=utf-8',
          Vary: 'Origin',
        });
        expect(response.end).toHaveBeenCalledWith('LOGIN_CALLBACK_ORIGIN_INVALID');
        expect(on).not.toHaveBeenCalled();
        expect(mockValidateApiKey).not.toHaveBeenCalled();
        expect(mockSaveProfile).not.toHaveBeenCalled();
        expect(mockServer.close).not.toHaveBeenCalled();

        await handler(
          { url: `/callback?api_key=${intlKey}`, method: 'GET' },
          {
            writeHead: jest.fn(),
            end: jest.fn(),
          },
        );
        await loginPromise;
        expect(mockSaveProfile).toHaveBeenCalledTimes(1);
      },
    );

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
        headers: {
          origin: 'https://console.serverlessinsight.com',
          'content-type': 'application/json',
        },
        on: (event: string, cb: (chunk?: unknown) => void) => {
          if (event === 'data') cb(JSON.stringify(payload));
          if (event === 'end') cb();
        },
      };
      const response = { writeHead: jest.fn(), end: jest.fn() };
      await handler(req as unknown as IncomingMessage, response);

      await loginPromise;

      expect(response.writeHead).toHaveBeenCalledWith(200, {
        'Access-Control-Allow-Origin': 'https://console.serverlessinsight.com',
        'Content-Type': 'text/html; charset=utf-8',
        Vary: 'Origin',
      });
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

    it('answers the CORS preflight for POST /callback with 204 and honored headers', async () => {
      process.env.SI_LOGIN_TIMEOUT_MS = '60';
      mockReadlineAnswers.push('1');
      mockReadlineAnswers.push('1');
      setupBrowserLogin();

      const loginPromise = login({});
      const handler = await waitForCallbackServer();
      const response = { writeHead: jest.fn(), end: jest.fn() };
      await handler(
        {
          url: '/callback',
          method: 'OPTIONS',
          headers: { origin: 'https://console.serverlessinsight.com' },
        } as unknown as IncomingMessage,
        response,
      );

      expect(response.writeHead).toHaveBeenCalledWith(
        204,
        expect.objectContaining({
          'Access-Control-Allow-Origin': 'https://console.serverlessinsight.com',
          'Access-Control-Allow-Methods': 'POST',
        }),
      );
      expect(response.end).toHaveBeenCalled();
      // Nothing was authorized; the shortened timeout closes the flow out.
      await expect(loginPromise).resolves.toBeUndefined();
      expect(logger.error).toHaveBeenCalledWith('LOGIN_TIMEOUT');
    });

    it('rejects a POST from a foreign origin with 403 and stores nothing', async () => {
      process.env.SI_LOGIN_TIMEOUT_MS = '60';
      mockReadlineAnswers.push('1');
      mockReadlineAnswers.push('1');
      setupBrowserLogin();

      const loginPromise = login({});
      const handler = await waitForCallbackServer();
      const response = { writeHead: jest.fn(), end: jest.fn() };
      await handler(
        {
          url: '/callback',
          method: 'POST',
          headers: { origin: 'https://evil.example.com' },
          on: (event: string, cb: (chunk?: unknown) => void) => {
            if (event === 'data') cb(JSON.stringify({ api_key: intlKey }));
            if (event === 'end') cb();
          },
        } as unknown as IncomingMessage,
        response,
      );

      expect(response.writeHead).toHaveBeenCalledWith(
        403,
        expect.objectContaining({ Vary: 'Origin' }),
      );
      await expect(loginPromise).resolves.toBeUndefined();
      expect(mockSaveProfile).not.toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith('LOGIN_TIMEOUT');
    });

    it('treats an unparsable POST body as an absent key and keeps waiting', async () => {
      process.env.SI_LOGIN_TIMEOUT_MS = '60';
      mockReadlineAnswers.push('1');
      mockReadlineAnswers.push('1');
      setupBrowserLogin();

      const loginPromise = login({});
      const handler = await waitForCallbackServer();
      const response = { writeHead: jest.fn(), end: jest.fn() };
      await handler(
        {
          url: '/callback',
          method: 'POST',
          headers: { origin: 'https://console.serverlessinsight.com' },
          on: (event: string, cb: (chunk?: unknown) => void) => {
            if (event === 'data') cb('not-json{');
            if (event === 'end') cb();
          },
        } as unknown as IncomingMessage,
        response,
      );

      expect(response.writeHead).toHaveBeenCalledWith(200, {
        'Access-Control-Allow-Origin': 'https://console.serverlessinsight.com',
        'Content-Type': 'text/plain',
        Vary: 'Origin',
      });
      expect(response.end).toHaveBeenCalledWith('Waiting for authorization...');
      await expect(loginPromise).resolves.toBeUndefined();
      expect(mockSaveProfile).not.toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith('LOGIN_TIMEOUT');
    });

    it('reports a network validate failure without storing anything (issue #309)', async () => {
      mockValidateApiKey.mockRejectedValueOnce(new Error('validate exploded'));

      await login({ siApiKey: chinaKey });

      expect(logger.error).toHaveBeenCalledWith('LOGIN_VALIDATE_UNREACHABLE');
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('reports a 401 validate failure as an invalid key (issue #309)', async () => {
      const { ApiError } = jest.requireMock('../../../src/common/apiClient');
      mockValidateApiKey.mockRejectedValueOnce(new ApiError('denied', 401));

      await login({ siApiKey: chinaKey });

      expect(logger.error).toHaveBeenCalledWith('LOGIN_KEY_INVALID');
      expect(mockSaveProfile).not.toHaveBeenCalled();
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

      await login({});

      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('re-login with an explicit key proceeds without the re-auth prompt (issue #309)', async () => {
      await login({ siApiKey: chinaKey });

      expect(readline.createInterface).not.toHaveBeenCalled();
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

    it('shows the stored profile side when --org mismatches the key org (direction A)', async () => {
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

      await login({ siApiKey: intlKey, line: 'international', org: 'other-org' });

      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_ORG_MISMATCH',
        expect.objectContaining({ actual: 'test-org', expected: 'other-org' }),
      );
      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_ORG_MISMATCH_ACTIVE',
        expect.objectContaining({ profileKey: 'china/example-org', orgName: 'Example Org' }),
      );
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('falls back to the slug and id when the stored profile carries no org name', async () => {
      mockLoadCredentialsFile.mockReturnValue({
        active: 'china/example-org',
        profiles: {
          'china/example-org': { apiKey: chinaKey, orgId: 'org-1', orgSlug: 'example-org' },
        },
      });

      await login({ siApiKey: intlKey, line: 'international', org: 'other-org' });

      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_ORG_MISMATCH_ACTIVE',
        expect.objectContaining({ profileKey: 'china/example-org', orgName: 'example-org' }),
      );
    });
  });

  describe('explicit key edge cases (issue #309 coverage)', () => {
    it('rejects a malformed key before any network call', async () => {
      await login({ siApiKey: 'not-a-key', line: 'china' });

      expect(logger.error).toHaveBeenCalledWith('LOGIN_KEY_FORMAT_INVALID');
      expect(mockValidateApiKey).not.toHaveBeenCalled();
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('warns when the browser opener rejects asynchronously', async () => {
      setTty(true);
      mockReadlineAnswers.push('1');
      mockReadlineAnswers.push('1');
      setupBrowserLogin(() => Promise.reject(new Error('popup blocked')));

      const loginPromise = login({});
      const handler = await waitForCallbackServer();
      await handler({ url: '/callback?api_key=key' }, { writeHead: jest.fn(), end: jest.fn() });
      await loginPromise;

      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_BROWSER_UNAVAILABLE',
        expect.objectContaining({ url: expect.stringContaining('/cli/authorize') }),
      );
    });
  });

  describe('stored profile heal (issue #309)', () => {
    const placeholderKey = 'international/legacy-0701c503';
    const placeholderProfile = {
      apiKey: legacyKey,
      orgId: 'org-1',
      orgName: 'Test Org',
      userEmail: 'user@test.com',
    };

    const storedPlaceholder = (key = placeholderKey) => ({
      active: key,
      profiles: { [key]: placeholderProfile },
    });

    const healedTo = (newKey: string) => mockUpdateProfile.mockImplementation(() => newKey);

    it('heals a placeholder profile from the key segment and re-keys it', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      healedTo('international/test-org');

      await login({});

      expect(mockValidateApiKey).toHaveBeenCalledWith(
        legacyKey,
        'https://console.serverlessinsight.com',
      );
      expect(mockUpdateProfile).toHaveBeenCalledWith(
        placeholderKey,
        legacyKey,
        expect.objectContaining({ orgSlug: 'test-org', orgId: 'org-1', orgName: 'Test Org' }),
      );
      expect(mockSaveProfile).not.toHaveBeenCalled();
      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_HEALED',
        expect.objectContaining({ profileKey: 'international/test-org' }),
      );
    });

    it('heals a legacy profile whose stored URL pins the line', async () => {
      const chinaPlaceholderKey = 'china/legacy-0701c503';
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder(chinaPlaceholderKey));
      mockReadLegacyConsoleUrl.mockReturnValue('https://console.serverlessinsight.cn');
      healedTo('china/test-org');

      await login({});

      expect(mockValidateApiKey).toHaveBeenCalledWith(
        legacyKey,
        'https://console.serverlessinsight.cn',
      );
      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_HEAL_DEBUG',
        expect.objectContaining({ from: chinaPlaceholderKey, to: 'china/test-org' }),
      );
    });

    it('heals a legacy profile when --line pins the line explicitly', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder('china/legacy-0701c503'));
      mockReadLegacyConsoleUrl.mockReturnValue('http://localhost:3002');
      healedTo('china/test-org');

      await login({ line: 'china' });

      expect(mockValidateApiKey).toHaveBeenCalledWith(
        legacyKey,
        'https://console.serverlessinsight.cn',
      );
      expect(mockUpdateProfile).toHaveBeenCalled();
    });

    it('keeps the profile and explains the fix when the line cannot be determined', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      mockReadLegacyConsoleUrl.mockReturnValue('http://localhost:3002');

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_DIAG_LOCALHOST_URL',
        expect.objectContaining({ url: 'http://localhost:3002' }),
      );
      expect(logger.error).toHaveBeenCalledWith('LOGIN_HEAL_LINE_UNRESOLVED');
      expect(mockUpdateProfile).not.toHaveBeenCalled();
    });

    it('keeps the stored profile when the key is rejected (401)', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      const { ApiError } = jest.requireMock('../../../src/common/apiClient');
      mockValidateApiKey.mockRejectedValueOnce(new ApiError('denied', 401));

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(logger.error).toHaveBeenCalledWith('LOGIN_HEAL_KEY_INVALID');
      expect(mockUpdateProfile).not.toHaveBeenCalled();
    });

    it('keeps the stored profile when the console is unreachable', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      mockValidateApiKey.mockRejectedValueOnce(new Error('ECONNREFUSED'));

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(logger.error).toHaveBeenCalledWith('LOGIN_HEAL_UNREACHABLE');
      expect(mockUpdateProfile).not.toHaveBeenCalled();
    });

    it('does not touch a healthy stored profile', async () => {
      mockLoadCredentialsFile.mockReturnValue({
        active: 'china/example-org',
        profiles: {
          'china/example-org': {
            apiKey: chinaKey,
            orgId: 'org-1',
            orgSlug: 'example-org',
            orgName: 'Example Org',
            userEmail: 'user@test.com',
          },
        },
      });

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(mockValidateApiKey).not.toHaveBeenCalled();
      expect(mockUpdateProfile).not.toHaveBeenCalled();
      expect(logger.warn).not.toHaveBeenCalled();
    });

    it('re-entering the stored key reuses the stored line instead of the picker', async () => {
      setTty(true);
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder('china/legacy-0701c503'));
      mockReadLegacyConsoleUrl.mockReturnValue('https://console.serverlessinsight.cn');

      await login({ siApiKey: legacyKey });

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

    it('reuses the composite profile key prefix when no legacy URL exists', async () => {
      setTty(true);
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder('china/legacy-0701c503'));
      mockReadLegacyConsoleUrl.mockReturnValue(null);

      await login({ siApiKey: legacyKey });

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

    it('refuses to heal a stored key that fails the format check', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder('international/legacy-0701c503'));
      mockLoadCredentialsFile.mockReturnValue({
        active: 'international/legacy-0701c503',
        profiles: {
          'international/legacy-0701c503': { ...placeholderProfile, apiKey: 'not-a-key' },
        },
      });

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(mockValidateApiKey).not.toHaveBeenCalled();
      expect(mockUpdateProfile).not.toHaveBeenCalled();
    });

    it('keeps the profile when the validate region disagrees with the healed line', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      mockValidateApiKey.mockResolvedValueOnce({ ...identity(), region: 'cn' });

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_LINE_MISMATCH',
        expect.objectContaining({ keyLine: 'cn', line: 'international' }),
      );
      expect(mockUpdateProfile).not.toHaveBeenCalled();
    });

    it('explains the fix when the profile cannot be re-keyed (heal skipped)', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      mockUpdateProfile.mockReturnValue(null);

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(logger.error).toHaveBeenCalledWith('LOGIN_HEAL_SKIPPED');
    });

    it('heals a segment-keyed profile from a minimal validate payload', async () => {
      mockLoadCredentialsFile.mockReturnValue({
        active: 'china/legacy-0701c503',
        profiles: {
          'china/legacy-0701c503': { apiKey: chinaKey, orgId: 'org-1', userEmail: 'user@test.com' },
        },
      });
      // No org id/name/email beyond the slug — the heal must tolerate it.
      mockValidateApiKey.mockResolvedValueOnce({ orgSlug: 'test-org', region: 'cn' });
      healedTo('china/test-org');

      await login({});

      expect(mockValidateApiKey).toHaveBeenCalledWith(
        chinaKey,
        'https://console.serverlessinsight.cn',
      );
      expect(mockUpdateProfile).toHaveBeenCalledWith('china/legacy-0701c503', chinaKey, {
        orgSlug: 'test-org',
        line: 'china',
      });
      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_HEALED',
        expect.objectContaining({ profileKey: 'china/test-org', userEmail: 'user@test.com' }),
      );
    });

    it('keeps the profile unverified when validate carries no slug', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      mockValidateApiKey.mockResolvedValueOnce({ orgId: 'org-42', region: 'com' });
      mockUpdateProfile.mockImplementation(() => placeholderKey);

      await login({});

      // No fabricated slug: the profile is refreshed in place and stays unverified,
      // so the console can assign the real slug later without a local mismatch.
      expect(mockUpdateProfile).toHaveBeenCalledWith(placeholderKey, legacyKey, {
        line: 'international',
        orgId: 'org-42',
      });
    });

    it('keeps a legacy profile whose key already matches its slug key in place', async () => {
      mockLoadCredentialsFile.mockReturnValue({
        active: 'international/test-org',
        profiles: {
          'international/test-org': {
            apiKey: intlKey,
            orgId: 'org-1',
            orgSlug: 'test-org',
            orgName: 'Test Org',
          },
        },
      });
      mockReadLegacyConsoleUrl.mockReturnValue('https://console.serverlessinsight.com');
      healedTo('international/test-org');

      await login({});

      expect(mockUpdateProfile).toHaveBeenCalledWith(
        'international/test-org',
        intlKey,
        expect.objectContaining({ orgSlug: 'test-org' }),
      );
      expect(logger.debug).not.toHaveBeenCalledWith(
        'LOGIN_HEAL_DEBUG',
        expect.objectContaining({ from: 'international/test-org', to: 'international/test-org' }),
      );
    });

    it('treats a 5xx validate response as unreachable and logs non-Error failures verbatim', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      const { ApiError } = jest.requireMock('../../../src/common/apiClient');
      mockValidateApiKey.mockRejectedValueOnce(new ApiError('boom', 500));

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(logger.error).toHaveBeenCalledWith('LOGIN_HEAL_UNREACHABLE');
      expect(logger.debug).toHaveBeenCalledWith('boom');
    });

    it('treats a 403 heal rejection like any rejected key', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      const { ApiError } = jest.requireMock('../../../src/common/apiClient');
      mockValidateApiKey.mockRejectedValueOnce(new ApiError('forbidden', 403));

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(logger.error).toHaveBeenCalledWith('LOGIN_HEAL_KEY_INVALID');
    });

    it('accepts a spelled-out yes and reports 403 as an invalid key on the key path', async () => {
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
      mockReadlineAnswers.push('yes');
      mockReadlineAnswers.push('2'); // line picker -> china
      mockReadlineAnswers.push('2'); // method chooser -> API key
      mockReadlineAnswers.push(chinaKey);

      await login({});

      expect(mockSaveProfile).toHaveBeenCalledWith(
        'china',
        expect.objectContaining({ apiKey: chinaKey }),
        { activate: true },
      );
    });

    it('reports a 403 validate failure as an invalid key (key path)', async () => {
      const { ApiError } = jest.requireMock('../../../src/common/apiClient');
      mockValidateApiKey.mockRejectedValueOnce(new ApiError('forbidden', 403));

      await login({ siApiKey: chinaKey });

      expect(logger.error).toHaveBeenCalledWith('LOGIN_KEY_INVALID');
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('refreshes in place when validate carries no identity at all', async () => {
      mockLoadCredentialsFile.mockReturnValue({
        active: placeholderKey,
        profiles: { [placeholderKey]: { apiKey: legacyKey, orgId: 'org-1' } },
      });
      mockValidateApiKey.mockResolvedValueOnce({ region: 'com' });
      mockUpdateProfile.mockImplementation(() => placeholderKey);

      await login({});

      expect(mockUpdateProfile).toHaveBeenCalledWith(placeholderKey, legacyKey, {
        line: 'international',
      });
      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_HEALED',
        expect.objectContaining({ profileKey: placeholderKey, userEmail: '(unknown)' }),
      );
    });

    it('enforces the --org assertion during heal and stores nothing on mismatch', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      // Stored key belongs to test-org; the user asserted other-team.
      mockValidateApiKey.mockResolvedValueOnce({ ...identity(), region: 'com' });

      await expect(login({ org: 'other-team' })).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_ORG_MISMATCH',
        expect.objectContaining({ actual: 'test-org', expected: 'other-team' }),
      );
      expect(mockUpdateProfile).not.toHaveBeenCalled();
    });

    it('re-keys to the line validation actually used, not the stored prefix', async () => {
      // Legacy file with a fabricated international prefix; --line pins china.
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder('international/legacy-0701c503'));
      mockReadLegacyConsoleUrl.mockReturnValue('http://localhost:3002');
      mockValidateApiKey.mockResolvedValueOnce({ ...identity(), region: 'cn' });
      healedTo('china/test-org');

      await login({ line: 'china' });

      expect(mockValidateApiKey).toHaveBeenCalledWith(
        legacyKey,
        'https://console.serverlessinsight.cn',
      );
      expect(mockUpdateProfile).toHaveBeenCalledWith('international/legacy-0701c503', legacyKey, {
        orgSlug: 'test-org',
        line: 'china',
        orgId: 'org-1',
        orgName: 'Test Org',
        userEmail: 'user@test.com',
      });
    });

    it('refuses to heal when the key segment contradicts --line', async () => {
      // Heal refusal falls through to a fresh sign-in; keep that branch's
      // internal timeout short so the test does not wait on it.
      process.env.SI_LOGIN_TIMEOUT_MS = '50';
      mockLoadCredentialsFile.mockReturnValue({
        active: 'international/legacy-0701c503',
        profiles: {
          'international/legacy-0701c503': { ...placeholderProfile, apiKey: chinaKey },
        },
      });

      await login({ line: 'international' });

      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_LINE_MISMATCH',
        expect.objectContaining({ keyLine: 'china', line: 'international' }),
      );
      expect(mockValidateApiKey).not.toHaveBeenCalled();
    });

    it('logs a non-Error validate failure verbatim', async () => {
      mockLoadCredentialsFile.mockReturnValue(storedPlaceholder());
      mockValidateApiKey.mockRejectedValueOnce('plain string failure');

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(logger.debug).toHaveBeenCalledWith('plain string failure');
    });

    it('falls back to the org id in the mismatch report when no name or slug is stored', async () => {
      mockLoadCredentialsFile.mockReturnValue({
        active: 'china/legacy-0701c503',
        profiles: { 'china/legacy-0701c503': { apiKey: chinaKey, orgId: 'org-1' } },
      });

      await login({ siApiKey: intlKey, line: 'international', org: 'other-org' });

      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_ORG_MISMATCH_ACTIVE',
        expect.objectContaining({ profileKey: 'china/legacy-0701c503', orgName: 'org-1' }),
      );
    });

    it('refuses the line when the stored profile key is not a composite key', async () => {
      mockLoadCredentialsFile.mockReturnValue({
        active: 'badprefix/foo',
        profiles: { 'badprefix/foo': { apiKey: legacyKey, orgId: 'org-1' } },
      });
      mockReadLegacyConsoleUrl.mockReturnValue(null);

      await login({ siApiKey: legacyKey });

      expect(logger.error).toHaveBeenCalledWith('LOGIN_NEED_LINE');
      expect(mockValidateApiKey).not.toHaveBeenCalled();
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });

    it('reports the unresolvable line for a profile whose stored key prefix is invalid', async () => {
      mockLoadCredentialsFile.mockReturnValue({
        active: 'badprefix/foo',
        profiles: { 'badprefix/foo': { apiKey: legacyKey, orgId: 'org-1' } },
      });
      mockReadLegacyConsoleUrl.mockReturnValue(null);

      await expect(login({})).rejects.toThrow('SAAS_LINE_UNRESOLVED');

      expect(logger.error).toHaveBeenCalledWith('LOGIN_HEAL_LINE_UNRESOLVED');
    });

    it('accepts a plain no for a healthy profile without a stored email', async () => {
      setTty(true);
      mockLoadCredentialsFile.mockReturnValue({
        active: 'china/example-org',
        profiles: {
          'china/example-org': { apiKey: chinaKey, orgId: 'org-1', orgSlug: 'example-org' },
        },
      });
      mockReadlineAnswers.push('n');

      await login({});

      expect(langMock).toHaveBeenCalledWith(
        'LOGIN_ALREADY_LOGGED_IN',
        expect.objectContaining({ userEmail: '' }),
      );
      expect(mockSaveProfile).not.toHaveBeenCalled();
    });
  });
});

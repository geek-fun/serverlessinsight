import * as readline from 'node:readline';
import { createServer, Server } from 'node:http';
import open from 'open';
import { logger } from '../common';
import { validateApiKey } from '../common/apiClient';
import {
  saveCredentials,
  loadCredentials,
  deleteCredentials,
  resolveConsoleUrl,
  resolveConsoleUiUrl,
  validateApiKeyFormat,
} from '../common/credentialStore';
import { lang } from '../lang';

const ask = (query: string): Promise<string> => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise<string>((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const loginWithKey = async (apiKey: string, consoleUrl: string): Promise<boolean> => {
  if (!validateApiKeyFormat(apiKey)) {
    logger.error(lang.__('LOGIN_KEY_FORMAT_INVALID'));
    return false;
  }

  logger.info(lang.__('LOGIN_VALIDATING_KEY'));
  try {
    const result = await validateApiKey(apiKey, consoleUrl);
    saveCredentials({
      apiKey,
      consoleUrl,
      orgId: result.orgId,
      orgName: result.orgName,
      userEmail: result.userEmail,
    });
    logger.info(lang.__('LOGIN_SUCCESS_KEY', { orgName: result.orgName }));
    return true;
  } catch (error) {
    logger.error(lang.__('LOGIN_KEY_INVALID'));
    logger.debug(error instanceof Error ? error.message : String(error));
    return false;
  }
};

const loginWithBrowser = async (consoleUrl: string): Promise<boolean> => {
  const randomPort = Math.floor(Math.random() * 79) + 54321; // 54321-54399
  let apiKey: string | null = null;

  logger.info(lang.__('LOGIN_STARTING_SERVER'));

  return new Promise<boolean>((resolve) => {
    const uiUrl = resolveConsoleUiUrl({ consoleUrl });
    const server: Server = createServer(async (req, res) => {
      if (!req.url) return;
      const url = new URL(req.url, `http://127.0.0.1:${randomPort}`);
      const key = url.searchParams.get('api_key');

      if (key && url.pathname === '/callback') {
        apiKey = key;
        const appId = url.searchParams.get('app_id') ?? '';
        const target = appId ? `${uiUrl}/${appId}/membership/api-keys` : uiUrl;
        const escapedTarget = target
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Authorization received</title>
  <meta http-equiv="refresh" content="3; url=${escapedTarget}" />
</head>
<body style="font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #fafafa;">
  <div style="text-align: center; padding: 24px;">
    <h1 style="font-size: 20px; margin-bottom: 8px;">Authorization received ✅</h1>
    <p style="color: #666; font-size: 14px;">You may close this window.</p>
    <p style="color: #666; font-size: 13px; margin-top: 16px;">
      Redirecting to Console in 3 seconds...
      <a href="${escapedTarget}">Go now</a>
    </p>
  </div>
</body>
</html>`);
        clearTimeout(timeoutTimer);
        server.closeAllConnections();
        server.close();

        const orgId = url.searchParams.get('org_id') || '';
        const orgName = url.searchParams.get('org_name') || '';
        const userEmail = url.searchParams.get('user_email') || '';

        saveCredentials({ apiKey, consoleUrl, orgId, orgName, userEmail });
        logger.info(lang.__('LOGIN_SUCCESS', { userEmail, orgName }));
        resolve(true);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Waiting for authorization...');
      }
    });

    server.listen(randomPort, '127.0.0.1', () => {
      const redirectUri = `http://127.0.0.1:${randomPort}/callback`;
      const fullUrl = `${uiUrl}/cli/authorize?redirect_uri=${encodeURIComponent(redirectUri)}`;

      logger.info(lang.__('LOGIN_OPENING_BROWSER'));
      try {
        open(fullUrl).catch(() => {
          logger.warn(lang.__('LOGIN_BROWSER_UNAVAILABLE', { url: fullUrl }));
        });
      } catch {
        logger.warn(lang.__('LOGIN_BROWSER_UNAVAILABLE', { url: fullUrl }));
      }
    });

    const timeoutTimer = setTimeout(() => {
      if (apiKey === null) {
        server.closeAllConnections();
        server.close();
        logger.error(lang.__('LOGIN_TIMEOUT'));
        resolve(false);
      }
    }, 300_000);
  });
};

export const login = async (options: { siApiKey?: string }): Promise<void> => {
  const consoleUrl = resolveConsoleUrl(loadCredentials() ?? undefined);

  // Check if already logged in
  const existingCreds = loadCredentials();
  if (existingCreds) {
    const answer = await ask(
      lang.__('LOGIN_ALREADY_LOGGED_IN', {
        userEmail: existingCreds.userEmail || '',
        orgName: existingCreds.orgName || '',
      }),
    );
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      logger.info(lang.__('LOGIN_CANCELLED'));
      return;
    }
    deleteCredentials();
  }

  // If --si-api-key provided, use it directly
  if (options.siApiKey) {
    await loginWithKey(options.siApiKey, consoleUrl);
    return;
  }

  // If SI_API_KEY env var set, use it
  if (process.env.SI_API_KEY) {
    await loginWithKey(process.env.SI_API_KEY, consoleUrl);
    return;
  }

  // Interactive prompt
  console.log(`\n  ${lang.__('LOGIN_CHOOSE_METHOD')}\n`);
  console.log(`    1. ${lang.__('LOGIN_OPTION_BROWSER')}`);
  console.log(`    2. ${lang.__('LOGIN_OPTION_API_KEY')}\n`);

  const choice = await ask(lang.__('LOGIN_SELECT_CHOICE'));

  if (choice.trim() === '2') {
    const key = await ask(lang.__('LOGIN_ENTER_API_KEY'));
    await loginWithKey(key.trim(), consoleUrl);
  } else {
    await loginWithBrowser(consoleUrl);
  }
};

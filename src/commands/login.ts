import * as readline from 'node:readline';
import { createServer, Server } from 'node:http';
import open from 'open';
import { logger } from '../common';
import { validateApiKey } from '../common/apiClient';
import { saveProfile, loadCredentialsFile } from '../common/credentialStore';
import {
  CONSOLE_LINES,
  ConsoleLineName,
  LINE_NAMES,
  consoleOriginFor,
  consoleUiOriginFor,
  normalizeLineName,
  parseApiKeyLine,
  toProfileKey,
  validateApiKeyFormat,
} from '../common/consoleLines';
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

/** ADR-008: pick the line by NAME; the origin shown is informational only. */
const promptLinePicker = async (): Promise<ConsoleLineName> => {
  console.log(`\n  ${lang.__('LOGIN_PICK_LINE')}\n`);
  LINE_NAMES.forEach((name, index) => {
    console.log(
      lang.__('LOGIN_LINE_OPTION', {
        index: String(index + 1),
        name,
        origin: CONSOLE_LINES[name].origin,
      }),
    );
  });
  console.log('');
  for (;;) {
    const answer = await ask(lang.__('LOGIN_LINE_PROMPT'));
    const index = Number.parseInt(answer.trim(), 10);
    if (Number.isNaN(index)) {
      // Empty input accepts the first option as the default.
      if (answer.trim() === '') return LINE_NAMES[0]!;
      continue;
    }
    if (index >= 1 && index <= LINE_NAMES.length) {
      return LINE_NAMES[index - 1]!;
    }
  }
};

type LoginIdentity = {
  orgId: string;
  orgName: string;
  orgSlug?: string;
  userEmail: string;
};

const finalizeLogin = (
  apiKey: string,
  line: ConsoleLineName,
  identity: LoginIdentity,
  orgFlag?: string,
  region?: string,
): boolean => {
  const keyLine = parseApiKeyLine(apiKey);
  if (keyLine && keyLine !== line) {
    logger.error(lang.__('LOGIN_LINE_MISMATCH', { keyLine, line }));
    return false;
  }
  // ADR-008 defensive cross-check: the issuing platform's own line segment
  // must agree with the line we authenticated against.
  const expectedSegment = CONSOLE_LINES[line].keySegment;
  if (region && region !== expectedSegment) {
    logger.error(lang.__('LOGIN_LINE_MISMATCH', { keyLine: region, line }));
    return false;
  }
  if (orgFlag && identity.orgSlug && identity.orgSlug !== orgFlag) {
    logger.error(lang.__('LOGIN_ORG_MISMATCH', { actual: identity.orgSlug, expected: orgFlag }));
    return false;
  }
  const slug = identity.orgSlug || identity.orgId || 'unknown';
  saveProfile(
    line,
    {
      apiKey,
      orgId: identity.orgId,
      orgName: identity.orgName,
      orgSlug: slug,
      userEmail: identity.userEmail,
    },
    { activate: true },
  );
  logger.info(
    lang.__('LOGIN_PROFILE_SAVED', {
      profileKey: toProfileKey(line, slug),
      userEmail: identity.userEmail || '(unknown)',
    }),
  );
  return true;
};

const loginWithKey = async (
  apiKey: string,
  line: ConsoleLineName,
  orgFlag?: string,
): Promise<boolean> => {
  if (!validateApiKeyFormat(apiKey)) {
    logger.error(lang.__('LOGIN_KEY_FORMAT_INVALID'));
    return false;
  }

  logger.info(lang.__('LOGIN_VALIDATING_KEY'));
  try {
    const result = await validateApiKey(apiKey, consoleOriginFor(line));
    return finalizeLogin(
      apiKey,
      line,
      {
        orgId: result.orgId,
        orgName: result.orgName,
        orgSlug: result.orgSlug,
        userEmail: result.userEmail,
      },
      orgFlag,
      result.region,
    );
  } catch (error) {
    logger.error(lang.__('LOGIN_KEY_INVALID'));
    logger.debug(error instanceof Error ? error.message : String(error));
    return false;
  }
};

const loginWithBrowser = async (line: ConsoleLineName, orgFlag?: string): Promise<boolean> => {
  const randomPort = Math.floor(Math.random() * 79) + 54321; // 54321-54399
  let apiKey: string | null = null;

  logger.info(lang.__('LOGIN_STARTING_SERVER'));

  return new Promise<boolean>((resolve) => {
    const uiUrl = consoleUiOriginFor(line);
    const server: Server = createServer(async (req, res) => {
      if (!req.url) return;
      const url = new URL(req.url, `http://127.0.0.1:${randomPort}`);

      // Issue #23 Phase 9: the console POSTs the payload as a JSON body so the
      // key never rides the URL. GET remains accepted for older consoles.
      const params =
        req.method === 'POST' && url.pathname === '/callback'
          ? await new Promise<URLSearchParams>((resolveParams) => {
              let body = '';
              req.on('data', (chunk: Buffer) => {
                body += chunk.toString();
              });
              req.on('end', () => {
                try {
                  const parsed = JSON.parse(body || '{}') as Record<string, string>;
                  resolveParams(new URLSearchParams(Object.entries(parsed)));
                } catch {
                  resolveParams(new URLSearchParams());
                }
              });
            })
          : url.searchParams;

      const key = params.get('api_key');

      if (key && url.pathname === '/callback') {
        apiKey = key;
        const appId = params.get('app_id') ?? '';
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

        const identity: LoginIdentity = {
          orgId: params.get('org_id') || '',
          orgName: params.get('org_name') || '',
          userEmail: params.get('user_email') || '',
          orgSlug: undefined,
        };

        // The authorize callback doesn't carry the org slug; fetch the full
        // identity once so the yml `org:` cross-check works out of the box.
        // Degrade to the callback params if the validate roundtrip fails.
        let region: string | undefined;
        try {
          const validated = await validateApiKey(key, consoleOriginFor(line));
          identity.orgSlug = validated.orgSlug;
          region = validated.region;
          if (!identity.orgId) identity.orgId = validated.orgId;
          if (!identity.orgName) identity.orgName = validated.orgName;
          if (!identity.userEmail) identity.userEmail = validated.userEmail;
        } catch {
          identity.orgSlug = undefined;
        }

        resolve(finalizeLogin(key, line, identity, orgFlag, region));
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

export const login = async (options: {
  siApiKey?: string;
  line?: string;
  org?: string;
}): Promise<void> => {
  // Check if already logged in
  const file = loadCredentialsFile();
  const activeProfile = file?.active ? file.profiles[file.active] : undefined;
  if (activeProfile && process.stdin.isTTY === true) {
    const answer = await ask(
      lang.__('LOGIN_ALREADY_LOGGED_IN', {
        userEmail: activeProfile.userEmail || '',
        orgName: activeProfile.orgName || activeProfile.orgId,
      }),
    );
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      logger.info(lang.__('LOGIN_CANCELLED'));
      return;
    }
  }

  const flagLine = normalizeLineName(options.line);

  // If --si-api-key provided (or SI_API_KEY env), use it directly
  const key = options.siApiKey ?? process.env.SI_API_KEY;
  if (key) {
    const keyLine = parseApiKeyLine(key);
    if (keyLine && flagLine && keyLine !== flagLine) {
      logger.error(lang.__('LOGIN_LINE_MISMATCH', { keyLine, line: flagLine }));
      return;
    }
    const line = keyLine ?? flagLine ?? normalizeLineName(process.env.SI_CONSOLE_LINE);
    if (!line) {
      if (process.stdin.isTTY === true) {
        const picked = await promptLinePicker();
        await loginWithKey(key, picked, options.org);
        return;
      }
      logger.error(lang.__('LOGIN_NEED_LINE'));
      return;
    }
    if (!keyLine && !flagLine && process.env.SI_CONSOLE_LINE) {
      logger.warn(lang.__('SAAS_LINE_ENV_DEPRECATED'));
    }
    await loginWithKey(key, line, options.org);
    return;
  }

  // Interactive flow: pick the region first (ADR-008), then the method.
  const line =
    flagLine ??
    (process.stdin.isTTY === true
      ? await promptLinePicker()
      : (() => {
          throw new Error(lang.__('SAAS_LINE_UNRESOLVED', { operation: 'login' }));
        })());

  // Interactive prompt
  console.log(`\n  ${lang.__('LOGIN_CHOOSE_METHOD')}\n`);
  console.log(`    1. ${lang.__('LOGIN_OPTION_BROWSER')}`);
  console.log(`    2. ${lang.__('LOGIN_OPTION_API_KEY')}\n`);

  const choice = await ask(lang.__('LOGIN_SELECT_CHOICE'));

  if (choice.trim() === '2') {
    const keyInput = await ask(lang.__('LOGIN_ENTER_API_KEY'));
    await loginWithKey(keyInput.trim(), line, options.org);
  } else {
    await loginWithBrowser(line, options.org);
  }
};

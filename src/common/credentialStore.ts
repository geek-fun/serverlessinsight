import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { logger } from './logger';
import { lang } from '../lang';

const CREDENTIALS_DIR = '.serverlessinsight';
const CREDENTIALS_FILE = 'credentials.json';
const DEFAULT_CONSOLE_URL = 'https://api.console.serverlessinsight.com';

export type ConsoleCredentials = {
  readonly apiKey: string;
  readonly consoleUrl: string;
  readonly orgId: string;
  readonly userEmail?: string;
  readonly orgName?: string;
};

export type ResolveApiKeyParams = {
  readonly siApiKey?: string;
  readonly envKey?: string;
  readonly creds?: ConsoleCredentials;
};

export const getCredentialsPath = (): string => {
  return path.join(os.homedir(), CREDENTIALS_DIR, CREDENTIALS_FILE);
};

const ensureCredentialsDir = (): void => {
  const dir = path.join(os.homedir(), CREDENTIALS_DIR);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const loadCredentials = (): ConsoleCredentials | null => {
  const credPath = getCredentialsPath();
  if (!fs.existsSync(credPath)) {
    return null;
  }
  try {
    const content = fs.readFileSync(credPath, 'utf-8');
    const parsed = JSON.parse(content) as ConsoleCredentials;
    if (!parsed.apiKey || !parsed.consoleUrl || !parsed.orgId) {
      return null;
    }
    return parsed;
  } catch {
    logger.warn(lang.__('CREDENTIAL_CORRUPTED'));
    return null;
  }
};

export const saveCredentials = (creds: ConsoleCredentials): void => {
  ensureCredentialsDir();
  const credPath = getCredentialsPath();
  fs.writeFileSync(credPath, JSON.stringify(creds, null, 2), 'utf-8');
  fs.chmodSync(credPath, 0o600);
};

export const deleteCredentials = (): void => {
  const credPath = getCredentialsPath();
  if (fs.existsSync(credPath)) {
    fs.unlinkSync(credPath);
  }
};

export const clearCredentials = deleteCredentials;

export const resolveConsoleUrl = (creds?: { readonly consoleUrl?: string }): string => {
  return process.env.SI_CONSOLE_URL || creds?.consoleUrl || DEFAULT_CONSOLE_URL;
};

export const getConsoleUrl = (): string => {
  return process.env.SI_CONSOLE_URL || DEFAULT_CONSOLE_URL;
};

/**
 * Resolve the console FRONTEND (UI) URL for browser flows (e.g. /cli/authorize).
 * The API URL and the UI URL differ: production uses api./console. subdomains;
 * local dev runs the API on :3000 and the Vite dev server on :5173.
 */
export const resolveConsoleUiUrl = (creds?: { readonly consoleUrl?: string }): string => {
  if (process.env.SI_CONSOLE_UI_URL) {
    return process.env.SI_CONSOLE_UI_URL;
  }
  const apiUrl = resolveConsoleUrl(creds);
  if (apiUrl.includes('api.')) {
    return apiUrl.replace('api.', 'console.');
  }
  if (apiUrl.includes('localhost:3000')) {
    return apiUrl.replace('localhost:3000', 'localhost:5173');
  }
  return apiUrl;
};

export const resolveApiKey = (params: ResolveApiKeyParams): string | null => {
  const { siApiKey, envKey, creds } = params;
  return siApiKey ?? envKey ?? creds?.apiKey ?? null;
};

export const validateApiKeyFormat = (key: string): boolean => {
  return /^si_[A-Za-z0-9_-]{12}_[A-Za-z0-9_-]{32}$/.test(key);
};

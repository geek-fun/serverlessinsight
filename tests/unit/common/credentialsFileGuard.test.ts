/**
 * Issue #309: integration-level proof on a real filesystem that an explicit
 * key (flag/env) never touches ~/.serverlessinsight/credentials.json — the
 * file is not read, and its content and mtime stay identical. Runners with a
 * shared or cached HOME are the target scenario.
 */
jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

const mockHome = { current: '' };

jest.mock('node:os', () => ({
  ...jest.requireActual('node:os'),
  homedir: () => mockHome.current,
}));

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { resolveLineContext } from '../../../src/common/lineContext';

const ORIGINAL_ENV = { ...process.env };

const chinaKey = 'si_cn_abcdef123456_0123456789abcdef0123456789abcdef';
const intlKey = 'si_com_abcdef123456_0123456789abcdef0123456789abcdea';
const legacyKey = 'si_abcdef123456_0123456789abcdef0123456789abcdef';

const credentialsPath = () => path.join(mockHome.current, '.serverlessinsight', 'credentials.json');

const seedCredentials = (content: unknown): void => {
  const dir = path.join(mockHome.current, '.serverlessinsight');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(credentialsPath(), JSON.stringify(content, null, 2), { mode: 0o600 });
};

const snapshot = () => {
  const stat = fs.statSync(credentialsPath());
  // Read without an encoding so the snapshot never pollutes the
  // (path, 'utf-8') spy assertion below.
  return { content: fs.readFileSync(credentialsPath()).toString('utf-8'), mtimeMs: stat.mtimeMs };
};

describe('credentials file guard with a real HOME (issue #309)', () => {
  let readSpy: jest.SpyInstance;

  beforeAll(() => {
    mockHome.current = fs.mkdtempSync(path.join(os.tmpdir(), 'si-guard-home-'));
  });

  afterAll(() => {
    fs.rmSync(mockHome.current, { recursive: true, force: true });
    mockHome.current = '';
  });

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.SI_API_KEY;
    delete process.env.SI_CONSOLE_LINE;
    delete process.env.SI_CONSOLE_URL;
    seedCredentials({
      active: 'china/example-org',
      profiles: {
        'china/example-org': {
          apiKey: chinaKey,
          orgId: 'org-cn',
          orgSlug: 'example-org',
          orgName: 'Example Org',
          userEmail: 'owner@example.com',
        },
      },
    });
    // Spy on the real fs module the credential store uses — the same module
    // instance, so every read of the credentials file is observable here.
    readSpy = jest.spyOn(fs, 'readFileSync');
  });

  afterEach(() => {
    readSpy.mockRestore();
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('an env key never reads or writes the credentials file', async () => {
    process.env.SI_API_KEY = intlKey;
    const before = snapshot();

    const ctx = await resolveLineContext({ operation: 'deploy' });

    expect(ctx.keySource).toBe('env');
    expect(ctx.apiKey).toBe(intlKey);
    expect(ctx.profileKey).toBeUndefined();
    expect(ctx.orgSlug).toBeUndefined();
    expect(readSpy).not.toHaveBeenCalledWith(credentialsPath(), 'utf-8');

    const after = snapshot();
    expect(after.content).toBe(before.content);
    expect(after.mtimeMs).toBe(before.mtimeMs);
  });

  it('a flag key never reads or writes the credentials file', async () => {
    const before = snapshot();

    const ctx = await resolveLineContext({ siApiKey: legacyKey, lineFlag: 'china' });

    expect(ctx.keySource).toBe('flag');
    expect(ctx.apiKey).toBe(legacyKey);
    expect(ctx.line).toBe('china');
    expect(ctx.profileKey).toBeUndefined();
    expect(readSpy).not.toHaveBeenCalledWith(credentialsPath(), 'utf-8');

    const after = snapshot();
    expect(after.content).toBe(before.content);
    expect(after.mtimeMs).toBe(before.mtimeMs);
  });

  it('a profile-sourced key still resolves through the stored profile', async () => {
    const ctx = await resolveLineContext({ operation: 'deploy' });

    expect(ctx.keySource).toBe('profile');
    expect(ctx.apiKey).toBe(chinaKey);
    expect(ctx.profileKey).toBe('china/example-org');
    expect(ctx.orgSlug).toBe('example-org');
    // The spy genuinely observes the read, so the guard assertions above are
    // meaningful rather than vacuous.
    expect(readSpy).toHaveBeenCalledWith(credentialsPath(), 'utf-8');
  });
});

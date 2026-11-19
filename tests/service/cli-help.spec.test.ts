import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Issue #308: every `--help` surface is snapshotted against the built CLI, so
 * any option or wording change must be acknowledged explicitly (jest -u) —
 * the same guard idea as the i18n catalog parity test. A raw i18n key (e.g.
 * OPT_LINE) appearing in any help output fails the guard test, the exact
 * defect class PR #307 fixed.
 *
 * The CLI is spawned because commander v15 is ESM-only and cannot be required
 * inside jest's CJS module runner. dist/ is built by CI before testing;
 * skipped when dist is absent so a raw `npm test` without a build passes.
 */
const CLI_PATH = path.join(__dirname, '../../dist/src/commands/index.js');
const REPO_ROOT = path.join(__dirname, '../..');

type CliResult = { code: number | null; stdout: string; stderr: string };

const runCliHelp = (args: string[]): Promise<CliResult> =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [CLI_PATH, ...args.filter(Boolean), '--help'], {
      cwd: REPO_ROOT,
      env: { ...process.env, NO_COLOR: '1', SI_LANG: 'en' },
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });

const HELP_SURFACES: ReadonlyArray<readonly string[]> = [
  [''],
  ['login'],
  ['logout'],
  ['whoami'],
  ['schema'],
  ['show'],
  ['validate'],
  ['diff'],
  ['deploy'],
  ['migrate'],
  ['destroy'],
  ['local'],
  ['force-unlock'],
];

const helpLabel = (args: readonly string[]): string => (args.length ? args[0] : 'root');

const distAvailable = existsSync(CLI_PATH);

(distAvailable ? describe : describe.skip)('CLI help surfaces (issue #308)', () => {
  it.each(HELP_SURFACES)(
    '%s help matches the snapshot',
    async (args) => {
      const { code, stdout, stderr } = await runCliHelp([...args]);

      expect(code).toBe(0);
      expect(stderr).toBe('');
      expect(stdout).toMatchSnapshot();
    },
    30000,
  );

  it('never renders a raw i18n key as help text', async () => {
    const outputs = await Promise.all(HELP_SURFACES.map((args) => runCliHelp([...args])));
    // The PR #307 defect class: an option description that IS the raw key.
    // Env var names like SI_API_KEY inside prose must not match.
    const rawKeyDescription = /^\s+--\S+\s+[A-Z]{2,}_[A-Z0-9_]{2,}\s*$/m;
    const offenders = outputs
      .map((result, index) => ({
        surface: helpLabel(HELP_SURFACES[index]),
        match: result.stdout.match(rawKeyDescription),
      }))
      .filter((entry) => entry.match !== null);
    expect(offenders).toEqual([]);
  }, 60000);

  it('documents the accepted provider values from the implemented set', async () => {
    const { stdout } = await runCliHelp(['deploy']);

    expect(stdout).toContain('aliyun | tencent | volcengine');
    expect(stdout).not.toMatch(/huawei|aws/);
  }, 30000);

  it('documents both console lines with their origins', async () => {
    const { stdout } = await runCliHelp(['deploy']);

    expect(stdout).toContain('international = https://console.serverlessinsight.com');
    expect(stdout).toContain('china = https://console.serverlessinsight.cn');
  }, 30000);

  it('keeps the diff and force-unlock flag surfaces aligned (issue #308)', async () => {
    const diff = await runCliHelp(['diff']);
    const forceUnlock = await runCliHelp(['force-unlock']);

    expect(diff.stdout).toContain('--si-api-key');
    expect(forceUnlock.stdout).toContain('--line');
  }, 30000);

  it('guides new users from the root help', async () => {
    const { stdout } = await runCliHelp([]);

    expect(stdout).toContain('si login');
    expect(stdout).toContain('si deploy');
    expect(stdout).toContain('--help');
  }, 30000);
});

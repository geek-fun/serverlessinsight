import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Issue #271 removal acceptance: `si diff` is the sole command for previewing
 * deployment changes. The legacy `si plan` verb is rejected fast with a
 * localized, actionable error directing to `si diff` — before any cloud or
 * state access, leaving stdout untouched. Other unknown commands keep
 * commander's default error.
 *
 * These tests spawn the built CLI (dist/) — CI builds before testing; skipped
 * when dist is absent so a raw `npm test` without a build still passes.
 */
const CLI_PATH = path.join(__dirname, '../../dist/src/commands/index.js');
const REPO_ROOT = path.join(__dirname, '../..');
const MISSING_FIXTURE = 'tests/fixtures/no-such-file.yml';

type CliResult = { code: number | null; stdout: string; stderr: string };

const runCli = (args: string[], extraEnv: Record<string, string> = {}): Promise<CliResult> =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [CLI_PATH, ...args], {
      cwd: REPO_ROOT,
      env: { ...process.env, NO_COLOR: '1', SI_LANG: 'en', ...extraEnv },
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

const distAvailable = existsSync(CLI_PATH);

(distAvailable ? describe : describe.skip)('CLI plan removal (issue #271)', () => {
  it('registers diff without any plan alias in its help', async () => {
    const { code, stdout } = await runCli(['diff', '--help']);

    expect(code).toBe(0);
    expect(stdout).toContain('Usage: si diff [options]');
    expect(stdout).not.toContain('|plan');
    expect(stdout).not.toContain('plan');
  }, 30000);

  it('lists diff without plan in the top-level help', async () => {
    const { stdout } = await runCli(['--help']);

    expect(stdout).toContain('diff [options]');
    expect(stdout).not.toContain('diff|plan');
    expect(stdout).not.toMatch(/^\s+plan/m);
  }, 30000);

  it('rejects si plan fast with an actionable migration hint and empty stdout', async () => {
    const { code, stdout, stderr } = await runCli(['plan', '--json', '-f', MISSING_FIXTURE]);

    expect(code).toBe(1);
    // rejected before any flow: no result data, no error envelope, no mutations
    expect(stdout).toBe('');
    expect(stderr).toContain('removed');
    expect(stderr).toContain('diff');
  }, 30000);

  it('localizes the removal hint', async () => {
    const { stderr } = await runCli(['plan', '--json', '-f', MISSING_FIXTURE], {
      SI_LANG: 'zh',
    });

    expect(stderr).toContain('移除');
    expect(stderr).toContain('diff');
  }, 30000);

  it('keeps si diff itself working end to end', async () => {
    const { code, stdout } = await runCli(['diff', '--json', '-f', MISSING_FIXTURE]);

    expect(code).toBe(1);
    const payload = JSON.parse(stdout);
    expect(payload.error.code).toBe('CONTEXT_NO_IAC_FILE');
  }, 30000);

  it('keeps the default unknown-command error for other verbs', async () => {
    const { code, stdout, stderr } = await runCli(['definitely-not-a-command']);

    expect(code).toBe(1);
    expect(stdout).toBe('');
    expect(stderr).toContain("unknown command 'definitely-not-a-command'");
  }, 30000);
});

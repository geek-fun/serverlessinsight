import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Issue #271 acceptance: `si diff` is the sole long-term planning command and
 * `si plan` remains as a deprecated compatibility alias during the migration
 * window. Both names share one registration, so the alias must behave
 * identically (same options, same flow, same exit codes) while additionally
 * printing a localized deprecation warning on stderr — stdout JSON stays
 * parseable, and `diff` itself must not warn.
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

(distAvailable ? describe : describe.skip)('CLI plan/diff deprecation (issue #271)', () => {
  it('registers plan as an alias of diff with identical help output', async () => {
    const [diffHelp, planHelp] = await Promise.all([
      runCli(['diff', '--help']),
      runCli(['plan', '--help']),
    ]);

    expect(diffHelp.code).toBe(0);
    expect(planHelp.code).toBe(0);
    expect(planHelp.stdout).toBe(diffHelp.stdout);
    expect(diffHelp.stdout).toContain('Usage: si diff|plan [options]');
  }, 30000);

  it('lists diff|plan once in the top-level help with diff first', async () => {
    const { stdout } = await runCli(['--help']);

    expect(stdout).toContain('diff|plan [options]');
    // no standalone plan entry in the command list
    expect(stdout).not.toMatch(/^\s+plan \[options\]/m);
  }, 30000);

  it('si plan warns on stderr while stdout JSON stays parseable', async () => {
    const { code, stdout, stderr } = await runCli(['plan', '--json', '-f', MISSING_FIXTURE]);

    expect(code).toBe(1);
    const payload = JSON.parse(stdout);
    expect(payload.error.code).toBe('CONTEXT_NO_IAC_FILE');
    expect(stderr).toMatch(/deprecated/i);
    expect(stderr).toContain('diff');
  }, 30000);

  it('si diff does not emit the plan deprecation warning', async () => {
    const { code, stdout, stderr } = await runCli(['diff', '--json', '-f', MISSING_FIXTURE]);

    expect(code).toBe(1);
    expect(JSON.parse(stdout).error.code).toBe('CONTEXT_NO_IAC_FILE');
    expect(stderr).not.toMatch(/deprecated/i);
  }, 30000);

  it('localizes the deprecation warning', async () => {
    const { stderr } = await runCli(['plan', '--json', '-f', MISSING_FIXTURE], {
      SI_LANG: 'zh',
    });

    expect(stderr).toContain('弃用');
  }, 30000);

  it('both verbs exit 1 with the identical error envelope on the same failure', async () => {
    const [viaDiff, viaPlan] = await Promise.all([
      runCli(['diff', '--json', '-f', MISSING_FIXTURE]),
      runCli(['plan', '--json', '-f', MISSING_FIXTURE]),
    ]);

    expect(viaDiff.code).toBe(1);
    expect(viaPlan.code).toBe(1);
    expect(JSON.parse(viaPlan.stdout)).toEqual(JSON.parse(viaDiff.stdout));
  }, 30000);
});

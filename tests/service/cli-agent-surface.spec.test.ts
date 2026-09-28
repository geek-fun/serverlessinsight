import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Issue #250 acceptance: the real CLI binary separates logs (stderr) from
 * result data (stdout), and validate exits 0 for valid / 1 for invalid input.
 * `si schema` must emit a jq-parseable JSON Schema on stdout.
 *
 * These tests spawn the built CLI (dist/) — CI builds before testing; skipped
 * when dist is absent so a raw `npm test` without a build still passes.
 */
const CLI_PATH = path.join(__dirname, '../../dist/src/commands/index.js');
const REPO_ROOT = path.join(__dirname, '../..');

type CliResult = { code: number | null; stdout: string; stderr: string };

const runCli = (args: string[]): Promise<CliResult> =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [CLI_PATH, ...args], {
      cwd: REPO_ROOT,
      env: { ...process.env, NO_COLOR: '1' },
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

(distAvailable ? describe : describe.skip)('CLI agent surface (issue #250)', () => {
  it('si schema writes a JSON Schema document to stdout and exits 0', async () => {
    const { code, stdout } = await runCli(['schema']);

    expect(code).toBe(0);
    const payload = JSON.parse(stdout);
    expect(payload.$schema).toBe('http://json-schema.org/draft-07/schema#');
    expect(payload.definitions).toBeDefined();
  }, 30000);

  it('si validate exits 0 and emits a valid envelope for a well-formed yaml', async () => {
    const { code, stdout } = await runCli([
      'validate',
      '--json',
      '-f',
      'tests/fixtures/serverless-insight.yml',
      '-s',
      'dev',
    ]);

    expect(code).toBe(0);
    const payload = JSON.parse(stdout);
    expect(payload.validateVersion).toBe(1);
    expect(payload.valid).toBe(true);
    expect(payload.errors).toEqual([]);
  }, 30000);

  it('si validate exits 1 and emits the error envelope on stdout (stderr stays log-only)', async () => {
    const { code, stdout, stderr } = await runCli([
      'validate',
      '--json',
      '-f',
      'tests/fixtures/invalid-serverless-insight.yml',
      '-s',
      'dev',
    ]);

    expect(code).toBe(1);
    // stdout stays a single parseable JSON document
    const payload = JSON.parse(stdout);
    expect(payload.validateVersion).toBe(1);
    expect(payload.valid).toBe(false);
    expect(payload.errors.length).toBeGreaterThan(0);
    // no result data leaks to stderr, no logs leak to stdout
    expect(stderr).not.toContain('validateVersion');
  }, 30000);

  it('a failing command emits { error: { code } } on stdout and logs the failure to stderr', async () => {
    const { code, stdout, stderr } = await runCli([
      'validate',
      '--json',
      '-f',
      'tests/fixtures/no-such-file.yml',
    ]);

    expect(code).toBe(1);
    const payload = JSON.parse(stdout);
    expect(payload.error.code).toBe('CONTEXT_NO_IAC_FILE');
    expect(payload.error.message).toBeDefined();
    expect(stderr.length).toBeGreaterThan(0);
    expect(stderr).not.toContain('"error"');
  }, 30000);
});

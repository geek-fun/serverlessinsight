import { spawnSync } from 'node:child_process';
import path from 'node:path';

const cli = path.resolve(__dirname, '../../dist/src/commands/index.js');
const run = (args: string[]) =>
  spawnSync(process.execPath, [cli, ...args], {
    encoding: 'utf8',
    env: { ...process.env, SI_LANG: 'en-US' },
  });

it('removes the standalone regional format migration option', () => {
  const result = run(['migrate', '--to-regional']);
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("unknown option '--to-regional'");
});

it.each(['deploy', 'destroy', 'migrate'])(
  'offers explicit unknown-region binding on %s',
  (command) => {
    const result = run([command, '--help']);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('--bind-unknown-region');
    expect(result.stdout).not.toContain('--to-regional');
    expect(result.stdout).not.toContain('--rollback-op-id');
  },
);

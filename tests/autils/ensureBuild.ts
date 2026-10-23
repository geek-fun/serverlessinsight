import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Jest `globalSetup` that makes `npm test` self-sufficient.
 *
 * Two parts of the local stack execute **compiled** output at runtime, so they
 * cannot run from the TypeScript sources alone:
 *
 * - `functionRunner` spawns a worker thread from
 *   `dist/src/stack/localStack/functionRunner.js`;
 * - the CLI smoke tests spawn `dist/src/commands/index.js`.
 *
 * Without a build those suites fail with `Cannot find module` — a missing
 * prerequisite that reads like a product bug.
 *
 * `tsc --build` is incremental and takes ~0.1s once the output is current, so it
 * runs unconditionally rather than only when artifacts are absent: that keeps a
 * bare `npm test` working in a clean checkout and also guarantees the suites
 * never exercise stale output after a source edit.
 */

const REQUIRED_ARTIFACTS = [
  'dist/src/stack/localStack/functionRunner.js',
  'dist/src/commands/index.js',
];

const repoRoot = path.resolve(__dirname, '../..');

const missingArtifacts = (): string[] =>
  REQUIRED_ARTIFACTS.filter((artifact) => !existsSync(path.join(repoRoot, artifact)));

export default (): void => {
  try {
    execFileSync(
      process.execPath,
      [path.join(repoRoot, 'node_modules/typescript/bin/tsc'), '--build'],
      {
        cwd: repoRoot,
        stdio: 'inherit',
      },
    );
  } catch (error) {
    throw new Error(`jest globalSetup could not build the project: ${String(error)}`, {
      cause: error,
    });
  }

  const missing = missingArtifacts();

  if (missing.length > 0) {
    throw new Error(
      `jest globalSetup finished without producing ${missing.join(', ')}. Run \`npm run build\` to inspect the failure.`,
    );
  }
};

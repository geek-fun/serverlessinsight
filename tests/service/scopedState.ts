import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Scoped-state helpers for service tests (issue #280): deploys write one V4
 * document per Stage/Region under `.serverlessinsight/states/<app>/<service>/`,
 * so suites must clean/assert that subtree instead of the legacy aggregate.
 */

export const scopedStateDir = (app: string, service: string): string =>
  path.join(process.cwd(), '.serverlessinsight', 'states', app, service);

export const scopedStatePath = (
  app: string,
  service: string,
  stage: string,
  region: string,
): string => path.join(scopedStateDir(app, service), stage, region, 'state.json');

export const cleanScopedState = async (app: string, service: string): Promise<void> => {
  await fs.rm(scopedStateDir(app, service), { recursive: true, force: true }).catch(() => {});
};

export const readScopedState = async <T = Record<string, unknown>>(
  app: string,
  service: string,
  stage: string,
  region: string,
): Promise<T> =>
  JSON.parse(await fs.readFile(scopedStatePath(app, service, stage, region), 'utf-8')) as T;

export const writeScopedState = async (
  app: string,
  service: string,
  stage: string,
  region: string,
  state: Record<string, unknown>,
): Promise<void> => {
  const filePath = scopedStatePath(app, service, stage, region);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(state, null, 2), 'utf-8');
};

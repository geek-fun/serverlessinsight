import fs from 'node:fs/promises';
import path from 'node:path';

import { createLocalStateBackend } from '../../src/common/stateBackend';
import { CURRENT_STATE_VERSION, type StateFile } from '../../src/types';
import { getStatePath } from '../../src/common/stateManager';

export const cleanScopedState = async (app: string, service: string): Promise<void> => {
  const file = getStatePath(app, service);
  const directory = path.dirname(file);
  const files = await fs.readdir(directory).catch(() => [] as string[]);
  await Promise.all(
    files
      .filter((name) => name === path.basename(file) || name.startsWith(path.basename(file) + '.'))
      .map((name) => fs.rm(path.join(directory, name), { recursive: true, force: true })),
  );
};

export const readScopedState = async <T = Record<string, unknown>>(
  app: string,
  service: string,
  stage: string,
  region: string,
  provider = 'aliyun',
): Promise<T> =>
  (await createLocalStateBackend({ app, service, stage, region, provider }).loadState()) as T;

export const writeScopedState = async (
  app: string,
  service: string,
  stage: string,
  region: string,
  state: Record<string, unknown>,
): Promise<void> => {
  const runtime = state as StateFile;
  const provider = runtime.provider;
  await createLocalStateBackend({ app, service, stage, region, provider }).saveState({
    ...runtime,
    version: CURRENT_STATE_VERSION,
    app,
    service,
    scope: { stage, region },
    resources: runtime.stages?.[stage]?.resources ?? runtime.resources ?? {},
  });
};

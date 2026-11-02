import fs from 'node:fs/promises';
import path from 'node:path';

const scopedStateDir = (app: string): string =>
  path.join(process.cwd(), '.serverlessinsight', 'states', app);

export const scopedStatePath = (
  app: string,
  service: string,
  stage: string,
  region: string,
): string =>
  path.join(
    scopedStateDir(app),
    `${encodeURIComponent(service).replace(/_/g, '%5F')}_${encodeURIComponent(stage).replace(/_/g, '%5F')}_${encodeURIComponent(region).replace(/_/g, '%5F')}_state.json`,
  );

export const cleanScopedState = async (app: string, service: string): Promise<void> => {
  const directory = scopedStateDir(app);
  const files = await fs.readdir(directory).catch(() => [] as string[]);
  await Promise.all(
    files
      .filter((file) => file.startsWith(`${encodeURIComponent(service).replace(/_/g, '%5F')}_`))
      .map((file) => fs.rm(path.join(directory, file), { recursive: true, force: true })),
  );
  await fs.rm(path.join(directory, service), { recursive: true, force: true });
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

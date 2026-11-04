import fs from 'node:fs';
import path from 'node:path';
import type { KeyValueIO } from './regionalMigration';
import { writeStateFileAtomically } from './stateManager';

export const createLocalStateIO = (options: { backupWrites?: boolean } = {}): KeyValueIO => ({
  read: async <T>(key: string): Promise<T | null> => {
    try {
      return JSON.parse(fs.readFileSync(key, 'utf-8')) as T;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw error;
    }
  },
  write: async (key, data) => {
    fs.mkdirSync(path.dirname(key), { recursive: true });
    if (options.backupWrites === false) {
      writeStateFileAtomically(key, JSON.stringify(data, null, 2), { backup: false });
    } else {
      writeStateFileAtomically(key, JSON.stringify(data, null, 2));
    }
  },
});

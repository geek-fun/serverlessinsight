import fs from 'node:fs';
import path from 'node:path';
import type { KeyValueIO } from './regionalMigration';
import { writeStateFileAtomically } from './stateManager';

const listLocalFiles = (directory: string): string[] => {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const key = path.join(directory, entry.name);
    return entry.isDirectory() ? listLocalFiles(key) : [key];
  });
};

export const createLocalStateIO = (options: { backupWrites?: boolean } = {}): KeyValueIO => ({
  list: async (prefix) => listLocalFiles(prefix),
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
  putIfAbsent: async (key, data) => {
    fs.mkdirSync(path.dirname(key), { recursive: true });
    let fd: number;
    try {
      fd = fs.openSync(key, 'wx');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'EEXIST') return false;
      throw error;
    }
    try {
      fs.writeFileSync(fd, JSON.stringify(data, null, 2), 'utf-8');
      fs.fsyncSync(fd);
    } finally {
      fs.closeSync(fd);
    }
    return true;
  },
  delete: async (key) => {
    fs.rmSync(key, { force: true });
  },
});

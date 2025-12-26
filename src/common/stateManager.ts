import fs from 'node:fs';
import path from 'node:path';
import { ResourceState, StateFile } from '../types';

const STATE_DIR = '.serverlessinsight';
const STATE_FILE = 'state.json';

export const getStatePath = (baseDir: string = process.cwd()): string => {
  return path.join(baseDir, STATE_DIR, STATE_FILE);
};

export const ensureStateDir = (baseDir: string = process.cwd()): void => {
  const stateDir = path.join(baseDir, STATE_DIR);
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }
};

export class StateManager {
  private state: StateFile;
  private statePath: string;

  constructor(
    private readonly provider: string,
    private readonly baseDir: string = process.cwd(),
  ) {
    this.statePath = getStatePath(baseDir);
    this.state = this.load();
  }

  public load(): StateFile {
    try {
      if (fs.existsSync(this.statePath)) {
        const content = fs.readFileSync(this.statePath, 'utf-8');
        return JSON.parse(content);
      }
      // If file doesn't exist or is invalid, return empty state
    } catch {
      // Ignore error
    }
    return {
      version: '0.1',
      provider: this.provider,
      resources: {},
    };
  }

  public save(): void {
    ensureStateDir(this.baseDir);
    fs.writeFileSync(this.statePath, JSON.stringify(this.state, null, 2), 'utf-8');
  }

  public get(resourceId: string): ResourceState | undefined {
    return this.state.resources[resourceId];
  }

  public set(resourceId: string, resourceState: ResourceState): void {
    this.state.resources[resourceId] = resourceState;
  }

  public remove(resourceId: string): void {
    delete this.state.resources[resourceId];
  }

  public getAll(): Record<string, ResourceState> {
    return this.state.resources;
  }

  public clear(): void {
    this.state.resources = {};
  }

  public getState(): StateFile {
    return this.state;
  }
}

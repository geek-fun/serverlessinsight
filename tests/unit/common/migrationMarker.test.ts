import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  enforceMigrationMarker,
  isMigratedToSaas,
  MANAGED_BY_SAAS,
} from '../../../src/common/migrationMarker';
import {
  saveState,
  patchPersistedState,
  loadState,
  getStatePath,
} from '../../../src/common/stateManager';
import { logger } from '../../../src/common/logger';
import { StateFile } from '../../../src/types';

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const mkTmpDir = (): string => fs.mkdtempSync(path.join(os.tmpdir(), 'si-migrate-'));

const freshState = (app: string): StateFile => ({
  version: '3.0',
  provider: 'aliyun',
  app,
  service: 'svc',
  stages: { dev: { resources: {} } },
  resources: {},
});

describe('migration marker (managedBy=saas)', () => {
  it('isMigratedToSaas detects the marker', () => {
    expect(isMigratedToSaas({ managedBy: 'saas' })).toBe(true);
    expect(isMigratedToSaas({ managedBy: 'other' })).toBe(false);
    expect(isMigratedToSaas({})).toBe(false);
    expect(isMigratedToSaas(null)).toBe(false);
  });

  it('refuse → throws the MIGRATION_MARKER_REFUSED guidance (deploy/destroy path)', () => {
    expect(() => enforceMigrationMarker({ managedBy: MANAGED_BY_SAAS }, 'refuse')).toThrow(
      'MIGRATION_MARKER_REFUSED',
    );
  });

  it('warn → logs and passes (plan/show path)', () => {
    expect(() => enforceMigrationMarker({ managedBy: MANAGED_BY_SAAS }, 'warn')).not.toThrow();
    expect(logger.warn).toHaveBeenCalledWith('MIGRATION_MARKER_WARN');
  });

  it('off → no-op even for a marked state (si migrate itself)', () => {
    expect(() => enforceMigrationMarker({ managedBy: MANAGED_BY_SAAS }, 'off')).not.toThrow();
    expect(logger.warn).not.toHaveBeenCalledWith('MIGRATION_MARKER_WARN');
  });
});

describe('patchPersistedState (local fs)', () => {
  it('writes marker + console linkage as a new version with backup; loadState then sees the marker', () => {
    const dir = mkTmpDir();
    saveState(freshState('a'), 'a', 'svc', 'dev', dir);

    patchPersistedState(
      'a',
      'svc',
      { orgId: 'org-1', appId: 'app-1', serviceId: 'svc-1', managedBy: MANAGED_BY_SAAS },
      dir,
    );

    const raw = JSON.parse(fs.readFileSync(getStatePath('a', 'svc', dir), 'utf-8'));
    expect(raw['managedBy']).toBe('saas');
    expect(raw['orgId']).toBe('org-1');
    expect(raw['appId']).toBe('app-1');
    expect(raw['serviceId']).toBe('svc-1');
    expect(raw['serial']).toBe(2);
    expect(fs.existsSync(`${getStatePath('a', 'svc', dir)}.backup`)).toBe(true);

    const loaded = loadState('aliyun', 'a', 'svc', 'dev', dir);
    expect(isMigratedToSaas(loaded)).toBe(true);
    // patching must not disturb the stage store
    expect(Object.keys(loaded.stages['dev']!.resources)).toEqual([]);
  });

  it('a patch value of undefined deletes the key (si migrate --rollback)', () => {
    const dir = mkTmpDir();
    saveState(freshState('b'), 'b', 'svc', 'dev', dir);
    patchPersistedState('b', 'svc', { managedBy: MANAGED_BY_SAAS, orgId: 'org-2' }, dir);
    patchPersistedState('b', 'svc', { managedBy: undefined }, dir);

    const raw = JSON.parse(fs.readFileSync(getStatePath('b', 'svc', dir), 'utf-8'));
    expect('managedBy' in raw).toBe(false);
    expect(raw['orgId']).toBe('org-2');

    expect(isMigratedToSaas(loadState('aliyun', 'b', 'svc', 'dev', dir))).toBe(false);
  });
});

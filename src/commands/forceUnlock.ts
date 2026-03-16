import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';
import { getIacLocation, formatLockInfo, logger, setContext, getContext } from '../common';
import { createStateBackend } from '../common/stateBackend';
import { LOCK_FILE_SUFFIX } from '../common/constants';
import { readLockFileForCommand, forceUnlock as fsForceUnlock } from '../common/lockManager';
import { lang } from '../lang';
import { parseYaml, revalYaml } from '../parser';
import { LockMetadata } from '../types';

const askConfirmation = (question: string): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().trim() === 'yes');
    });
  });
};

export const forceUnlockCommand = async (
  lockId: string,
  options: {
    location?: string;
    stage?: string;
    region?: string;
    provider?: string;
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
  } = {},
): Promise<void> => {
  let backend;

  if (options.location) {
    const iacLocation = getIacLocation(options.location);
    const rawIac = parseYaml(iacLocation);
    await setContext(
      {
        ...options,
        app: rawIac.app,
        service: rawIac.service,
        iacProvider: rawIac.provider,
        stages: rawIac.stages,
      },
      false,
    );
    const context = getContext();
    const iac = revalYaml(iacLocation, context);
    backend = createStateBackend(iac.backend, context);
  } else {
    const stateDir = path.join(process.cwd(), '.serverlessinsight');
    let foundStatePath: string | undefined;

    if (fs.existsSync(stateDir)) {
      const lockFiles = fs.readdirSync(stateDir).filter((f) => f.endsWith(LOCK_FILE_SUFFIX));
      if (lockFiles.length > 0) {
        const lockContent = fs.readFileSync(path.join(stateDir, lockFiles[0]), 'utf-8');
        const lockMeta = JSON.parse(lockContent) as LockMetadata;
        foundStatePath = lockMeta.path;
      }
    }

    if (!foundStatePath) {
      logger.error(lang.__('NO_LOCK_FOUND'));
      throw new Error(lang.__('NO_LOCK_FOUND'));
    }

    const statePath = foundStatePath;
    backend = {
      readLock: async () => readLockFileForCommand(statePath),
      forceUnlock: async (id: string) => fsForceUnlock(statePath, id),
      loadState: async () => {
        throw new Error('Not supported in no-location mode');
      },
      saveState: async () => {
        throw new Error('Not supported in no-location mode');
      },
      acquireLock: async () => {
        throw new Error('Not supported in no-location mode');
      },
      releaseLock: async () => {
        throw new Error('Not supported in no-location mode');
      },
      withLock: async () => {
        throw new Error('Not supported in no-location mode');
      },
    };
  }

  // Check if lock exists
  const existingLock = await backend.readLock();
  if (!existingLock) {
    logger.error(lang.__('NO_LOCK_FOUND'));
    throw new Error(lang.__('NO_LOCK_FOUND'));
  }

  // Verify lock ID matches
  if (existingLock.id !== lockId) {
    logger.error(
      lang.__('LOCK_ID_MISMATCH', {
        providedId: lockId,
        actualId: existingLock.id,
      }),
    );
    throw new Error(
      lang.__('LOCK_ID_MISMATCH', {
        providedId: lockId,
        actualId: existingLock.id,
      }),
    );
  }

  // Show lock info
  logger.info(lang.__('CURRENT_LOCK_INFO'));
  logger.info(formatLockInfo(existingLock));

  // Ask for confirmation
  logger.warn(lang.__('FORCE_UNLOCK_WARNING'));
  const confirmed = await askConfirmation(lang.__('FORCE_UNLOCK_CONFIRM'));

  if (!confirmed) {
    logger.info(lang.__('FORCE_UNLOCK_CANCELLED'));
    return;
  }

  // Force unlock
  const success = await backend.forceUnlock(lockId);
  if (success) {
    logger.info(lang.__('LOCK_RELEASED'));
  } else {
    logger.error(lang.__('FAILED_TO_RELEASE_LOCK'));
    throw new Error(lang.__('FAILED_TO_RELEASE_LOCK'));
  }
};

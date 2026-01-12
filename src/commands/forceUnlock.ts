import readline from 'node:readline';
import {
  getStatePath,
  forceUnlock,
  readLockFile,
  getLockPath,
  formatLockInfo,
  logger,
} from '../common';
import { lang } from '../lang';

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

export const forceUnlockCommand = async (lockId: string): Promise<void> => {
  const statePath = getStatePath();
  const lockPath = getLockPath(statePath);

  // Check if lock exists
  const existingLock = readLockFile(lockPath);
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
  const success = forceUnlock(statePath, lockId);
  if (success) {
    logger.info(lang.__('LOCK_RELEASED'));
  } else {
    logger.error(lang.__('FAILED_TO_RELEASE_LOCK'));
    throw new Error(lang.__('FAILED_TO_RELEASE_LOCK'));
  }
};

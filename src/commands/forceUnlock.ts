import readline from 'node:readline';
import { getIacLocation, formatLockInfo, logger, setContext, getContext } from '../common';
import { createStateBackend } from '../common/stateBackend';
import { createLocalStateBackend } from '../common/stateBackend/localStateBackend';
import { lang } from '../lang';
import { parseYaml, revalYaml } from '../parser';

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
    await setContext({ ...options, iacProvider: rawIac.provider, stages: rawIac.stages }, false);
    const context = getContext();
    const iac = revalYaml(iacLocation, context);
    backend = createStateBackend(iac.backend, context);
  } else {
    backend = createLocalStateBackend();
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

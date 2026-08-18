import { logger } from '../common';
import { loadCredentials, deleteCredentials } from '../common/credentialStore';
import { lang } from '../lang';

export const logout = async (): Promise<void> => {
  const creds = loadCredentials();
  if (!creds) {
    logger.info(lang.__('LOGOUT_NOT_LOGGED_IN'));
    return;
  }

  logger.info(lang.__('LOGOUT_DELETING_CREDENTIALS'));
  deleteCredentials();
  logger.info(lang.__('LOGOUT_SUCCESS'));
};

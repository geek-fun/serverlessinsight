import { logger } from '../common';
import { removeActiveProfile } from '../common/credentialStore';
import { lang } from '../lang';

export const logout = async (): Promise<void> => {
  const removed = removeActiveProfile();
  if (!removed) {
    logger.info(lang.__('LOGOUT_NOT_LOGGED_IN'));
    return;
  }

  logger.info(lang.__('LOGOUT_SUCCESS', { profileKey: removed.profileKey }));
};

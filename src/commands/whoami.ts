import { logger } from '../common';
import { loadCredentials } from '../common/credentialStore';
import { lang } from '../lang';

export const whoami = async (): Promise<void> => {
  const creds = loadCredentials();
  if (!creds) {
    logger.info(lang.__('WHOAMI_NOT_LOGGED_IN'));
    return;
  }

  logger.info('');
  logger.info(`  ${lang.__('WHOAMI_LOGGED_IN', { userEmail: creds.userEmail || '(unknown)' })}`);
  logger.info(`  ${lang.__('WHOAMI_ORG', { orgName: creds.orgName || creds.orgId })}`);
  logger.info(`  ${lang.__('WHOAMI_CONSOLE', { url: creds.consoleUrl })}`);
  logger.info(
    `  ${lang.__('WHOAMI_API_KEY', { keyPrefix: creds.apiKey.slice(0, 12) })} ${lang.__('WHOAMI_KEY_ACTIVE')}`,
  );
  logger.info('');
};

import { logger } from '../common';
import { loadCredentialsFile } from '../common/credentialStore';
import { ConsoleLineName, consoleOriginFor, splitProfileKey } from '../common/consoleLines';
import { lang } from '../lang';

export const whoami = async (): Promise<void> => {
  const file = loadCredentialsFile();
  const profileKeys = Object.keys(file?.profiles ?? {});
  if (!file || profileKeys.length === 0) {
    logger.info(lang.__('WHOAMI_NOT_LOGGED_IN'));
    return;
  }

  logger.info('');
  logger.info(`  ${lang.__('WHOAMI_PROFILES_HEADER', { count: String(profileKeys.length) })}`);
  let activeLine: ConsoleLineName | undefined;
  for (const key of profileKeys) {
    const profile = file.profiles[key]!;
    const isActive = key === file.active;
    const split = splitProfileKey(key);
    if (isActive && split) activeLine = split.line;
    logger.info(
      '  ' +
        lang.__('WHOAMI_PROFILE', {
          marker: isActive ? lang.__('WHOAMI_ACTIVE_MARK') : '  ',
          profileKey: key,
          orgName: profile.orgName || profile.orgId,
          keyPrefix: profile.apiKey.slice(0, 12),
        }) +
        (isActive ? lang.__('WHOAMI_ACTIVE_SUFFIX') : ''),
    );
  }
  if (activeLine) {
    logger.info(`  ${lang.__('WHOAMI_CONSOLE', { url: consoleOriginFor(activeLine) })}`);
  }
  logger.info('');
};

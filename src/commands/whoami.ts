import { CredentialsFile, loadCredentialsFile } from '../common/credentialStore';
import { ConsoleLineName, consoleOriginFor, splitProfileKey } from '../common/consoleLines';
import { lang } from '../lang';

/** Issue #315: the report is one user-facing block, not a log stream. */
export const whoamiReport = (file: CredentialsFile | null): string => {
  const profileKeys = Object.keys(file?.profiles ?? {});
  if (!file || profileKeys.length === 0) {
    return lang.__('WHOAMI_NOT_LOGGED_IN');
  }

  const entries = profileKeys.map((key) => ({
    key,
    profile: file.profiles[key]!,
    isActive: key === file.active,
  }));
  const activeEntry = entries.find((entry) => entry.isActive);
  const activeLine: ConsoleLineName | undefined = activeEntry
    ? splitProfileKey(activeEntry.key)?.line
    : undefined;

  return [
    '',
    `  ${lang.__('WHOAMI_PROFILES_HEADER', { count: String(profileKeys.length) })}`,
    ...entries.map(
      (entry) =>
        '  ' +
        lang.__('WHOAMI_PROFILE', {
          marker: entry.isActive ? lang.__('WHOAMI_ACTIVE_MARK') : '  ',
          profileKey: entry.key,
          orgName: entry.profile.orgName || entry.profile.orgId,
          keyPrefix: entry.profile.apiKey.slice(0, 12),
        }) +
        (entry.isActive ? lang.__('WHOAMI_ACTIVE_SUFFIX') : ''),
    ),
    ...(activeLine
      ? [`  ${lang.__('WHOAMI_CONSOLE', { url: consoleOriginFor(activeLine) })}`]
      : []),
    '',
  ].join('\n');
};

export const whoami = async (): Promise<void> => {
  console.log(whoamiReport(loadCredentialsFile()));
};

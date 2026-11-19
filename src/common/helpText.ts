/**
 * Help-text values derived from their single-source registries (issue #308):
 * option descriptions interpolate these instead of hand-written lists that
 * drift from the code. The value lists themselves are option values and
 * origins (not prose), so they stay untranslated while the surrounding
 * descriptions go through i18n.
 */
import { CONSOLE_LINES, LINE_NAMES } from './consoleLines';
import { DEFAULT_IAC_FILES } from './context';
import { IMPLEMENTED_PROVIDERS } from './providerEnum';

/** `international = https://console.serverlessinsight.com | china = https://...` */
export const buildLineValues = (): string =>
  LINE_NAMES.map((name) => `${name} = ${CONSOLE_LINES[name].origin}`).join(' | ');

/** `aliyun | tencent | volcengine` — providers with a real stack implementation. */
export const buildProviderValues = (): string => IMPLEMENTED_PROVIDERS.join(' | ');

/** The file names probed when `-f/--file` is omitted. */
export const buildFileProbeValues = (): string => DEFAULT_IAC_FILES.join(', ');

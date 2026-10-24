import { execSync } from 'child_process';
import { I18n } from 'i18n';
import { en } from './en';
import { zhCN } from './zh-CN';

// Disable Mustache's default HTML escaping — i18n uses Mustache internally for
// template interpolation ({{var}}), which HTML-encodes values (/ → &#x2F; etc.).
// This is correct for web output but wrong for CLI terminal output.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mustache = require('mustache');
mustache.escape = (text: string) => text;

type SiLocale = 'en-US' | 'zh-CN';

const normalizeLocale = (value: string | undefined): SiLocale | null => {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (normalized.startsWith('zh')) return 'zh-CN';
  if (normalized.startsWith('en')) return 'en-US';
  return null;
};

const getSystemLanguage = (defaultLang: SiLocale): string => {
  const override = normalizeLocale(process.env.SI_LANG);
  if (override) return override;

  const envLocale = [process.env.LC_ALL, process.env.LANG].reduce<SiLocale | null>(
    (found, value) => found ?? normalizeLocale(value),
    null,
  );
  if (envLocale) return envLocale;

  if (process.platform === 'win32') {
    try {
      const codePageOutput = execSync('chcp').toString();
      const codePageMatch = codePageOutput.match(/(\d+)\s*$/m);
      if (codePageMatch) {
        return parseInt(codePageMatch[1]) === 936 ? 'zh-CN' : 'en-US';
      }
    } catch {
      // ignore
    }
  }

  return defaultLang;
};

const lang = new I18n({
  locales: ['en-US', 'zh-CN'],
  defaultLocale: getSystemLanguage('zh-CN'),
  staticCatalog: {
    'en-US': en,
    'zh-CN': zhCN,
  },
  objectNotation: true,
});

/**
 * Issue #250: i18n keys double as stable machine error codes. Errors are
 * thrown with an already-translated message, so the CLI boundary maps a
 * message back to its key — locale-independent by construction (both catalogs
 * are indexed, and a code resolved under zh-CN equals the one under en-US).
 */
type MessageTemplate = { key: string; segments: Array<string> };

let templateIndex: Array<MessageTemplate> | null = null;

const buildTemplateIndex = (): Array<MessageTemplate> =>
  [...Object.entries(en), ...Object.entries(zhCN)].flatMap<MessageTemplate>(([key, value]) =>
    typeof value === 'string' ? [{ key, segments: value.split(/{{[^}]*}}/g) }] : [],
  );

const matchTemplate = (message: string, segments: Array<string>): boolean => {
  if (segments.length === 1) {
    return message === segments[0];
  }
  let rest = message;
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (i === 0) {
      if (!rest.startsWith(segment)) return false;
      rest = rest.slice(segment.length);
      continue;
    }
    if (i === segments.length - 1) {
      return rest.endsWith(segment);
    }
    const at = rest.indexOf(segment);
    if (at < 0) return false;
    rest = rest.slice(at + segment.length);
  }
  return true;
};

const langKeySet = (): Set<string> => new Set(Object.keys({ ...en, ...zhCN }));

export const hasLangKey = (key: string): boolean => langKeySet().has(key);

export const lookupErrorCode = (message: string | undefined): string | undefined => {
  if (!message) return undefined;
  templateIndex = templateIndex ?? buildTemplateIndex();
  return templateIndex.find((template) => matchTemplate(message, template.segments))?.key;
};

export { lang, getSystemLanguage };

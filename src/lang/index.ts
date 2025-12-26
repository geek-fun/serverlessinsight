import { I18n } from 'i18n';
import { en } from './en';
import { zhCN } from './zh-CN';

/**
 * Detects the system language and returns the appropriate locale.
 * Defaults to 'en' if the system language is not supported.
 */
const detectSystemLanguage = (): string => {
  // Try to get locale from environment variables
  const envLang =
    process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;

  if (envLang) {
    const locale = envLang.split('.')[0].toLowerCase();
    // Check for Chinese variants
    if (locale.includes('zh') || locale.includes('cn')) {
      return 'zh-CN';
    }
  }

  // Try to use Intl API for browser/Node.js environment
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    if (locale.startsWith('zh')) {
      return 'zh-CN';
    }
  } catch {
    // Intl API not available, use default
  }

  // Default to English
  return 'en';
};

const defaultLocale = detectSystemLanguage();

const lang = new I18n({
  locales: ['en', 'zh-CN'],
  defaultLocale,
  staticCatalog: {
    en,
    'zh-CN': zhCN,
  },
});

export { lang };

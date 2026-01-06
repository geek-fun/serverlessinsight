import { execSync } from 'child_process';
import { I18n } from 'i18n';
import { en } from './en';
import { zhCN } from './zh-CN';

const getSystemLanguage = (defaultLang: 'zh-CN' | 'en-US'): string => {
  const langMatch = (process.env.LANG || process.env.LC_ALL || '').match(
    /([a-z]{2})[-_]?([A-Z]{2})?/,
  );
  if (langMatch) {
    return langMatch[0].replace('_', '-');
  }

  try {
    const codePageOutput = execSync('chcp').toString();
    const codePageMatch = codePageOutput.match(/(\d+)\s*$/m);
    if (codePageMatch) {
      const codePage = parseInt(codePageMatch[1]);
      return codePage === 936 ? 'zh-CN' : 'en-US';
    }
  } catch {
    // ignore
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

export { lang };

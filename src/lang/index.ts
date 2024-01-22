import { I18n } from 'i18n';

const lang = new I18n({
  locales: ['en', 'cn'],
  register: [{ hello: 'hello' }, { hello: '你好' }],
});

export { lang };

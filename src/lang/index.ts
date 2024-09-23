import { I18n } from 'i18n';

const lang = new I18n({
  locales: ['en', 'cn'],
  register: [
    {
      hello: 'hello',
      UPDATE_COMPLETELY_SAME_STACK: 'The stack is completely the same, update SKIPPED',
    },
    { hello: '你好', UPDATE_COMPLETELY_SAME_STACK: '栈完全相同，更新跳过' },
  ],
});

export { lang };

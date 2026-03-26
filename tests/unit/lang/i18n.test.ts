import { lang } from '../../../src/lang';

describe('i18n Language Support', () => {
  describe('Translation Keys', () => {
    it('should have English translations', () => {
      lang.setLocale('en-US');
      expect(lang.__('YAML_VALID')).toBe('Yaml is valid! 🎉');
      expect(lang.__('VALIDATING_YAML')).toBe('Validating yaml...');
      expect(lang.__('DEPLOYING_STACK')).toBe('Deploying stack...');
      expect(lang.__('STACK_DEPLOYED')).toBe('Stack deployed! 🎉');
    });

    it('should have Chinese translations', () => {
      lang.setLocale('zh-CN');
      expect(lang.__('YAML_VALID')).toBe('Yaml 有效! 🎉');
      expect(lang.__('VALIDATING_YAML')).toBe('正在验证 yaml...');
      expect(lang.__('DEPLOYING_STACK')).toBe('正在部署资源栈...');
      expect(lang.__('STACK_DEPLOYED')).toBe('资源栈部署成功! 🎉');
    });

    it('should support parameterized translations in English', () => {
      lang.setLocale('en-US');
      const result = lang.__('CREATING_STACK_ID', { stackId: 'stack-123' });
      expect(result).toBe('Creating, Stack ID: stack-123');
    });

    it('should support parameterized translations in Chinese', () => {
      lang.setLocale('zh-CN');
      const result = lang.__('CREATING_STACK_ID', { stackId: 'stack-123' });
      expect(result).toBe('创建中，资源栈ID: stack-123');
    });

    it('should translate error messages in English', () => {
      lang.setLocale('en-US');
      const result = lang.__('FUNCTION_EXECUTION_ERROR', { error: 'Test error' });
      expect(result).toBe('Function execution error: Test error');
    });

    it('should translate error messages in Chinese', () => {
      lang.setLocale('zh-CN');
      const result = lang.__('FUNCTION_EXECUTION_ERROR', { error: '测试错误' });
      expect(result).toBe('函数执行错误: 测试错误');
    });

    it('should translate complex parameterized messages in English', () => {
      lang.setLocale('en-US');
      const result = lang.__('DESTROYING_STACK', {
        provider: 'aliyun',
        region: 'cn-hangzhou',
      });
      expect(result).toBe('Destroying stack: provider: aliyun, region: cn-hangzhou...');
    });

    it('should translate complex parameterized messages in Chinese', () => {
      lang.setLocale('zh-CN');
      const result = lang.__('DESTROYING_STACK', {
        provider: 'aliyun',
        region: 'cn-hangzhou',
      });
      expect(result).toBe('正在销毁资源栈: 供应商: aliyun, 地区: cn-hangzhou...');
    });
  });

  describe('Locale Support', () => {
    it('should support English locale', () => {
      lang.setLocale('en-US');
      expect(lang.getLocale()).toBe('en-US');
    });

    it('should support Chinese Simplified locale', () => {
      lang.setLocale('zh-CN');
      expect(lang.getLocale()).toBe('zh-CN');
    });

    it('should have both locales available', () => {
      const locales = lang.getLocales();
      expect(locales).toContain('en-US');
      expect(locales).toContain('zh-CN');
    });
  });

  describe('Translation Coverage', () => {
    const criticalKeys = [
      // Validation messages
      'VALIDATING_YAML',
      'YAML_VALID',
      'INVALID_YAML',

      // Deploy messages
      'DEPLOYING_STACK',
      'STACK_DEPLOYED',
      'FAILED_TO_DEPLOY_STACK',

      // Stack operations
      'CREATING_STACK_ID',
      'UPDATING_STACK_ID',
      'STACK_STATUS',
      'STACK_DELETED',

      // Error messages
      'FUNCTION_EXECUTION_ERROR',
      'LOCAL_GATEWAY_ERROR',
      'ERROR_GENERAL',
    ];

    it('should have all critical keys in English', () => {
      lang.setLocale('en-US');
      criticalKeys.forEach((key) => {
        const translation = lang.__(key);
        expect(translation).toBeTruthy();
        expect(translation).not.toBe(key); // Should not return the key itself
      });
    });

    it('should have all critical keys in Chinese', () => {
      lang.setLocale('zh-CN');
      criticalKeys.forEach((key) => {
        const translation = lang.__(key);
        expect(translation).toBeTruthy();
        expect(translation).not.toBe(key); // Should not return the key itself
      });
    });
  });
});

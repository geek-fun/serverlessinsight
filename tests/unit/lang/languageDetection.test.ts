import { execSync } from 'child_process';
import { getSystemLanguage } from '../../../src/lang';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

const mockedExecSync = execSync as jest.Mock;

const setPlatform = (platform: NodeJS.Platform) => {
  Object.defineProperty(process, 'platform', { value: platform });
};

describe('getSystemLanguage', () => {
  const originalPlatform = process.platform;
  const originalEnv = { ...process.env };

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.SI_LANG;
    delete process.env.LANG;
    delete process.env.LC_ALL;
    setPlatform('darwin');
  });

  afterAll(() => {
    setPlatform(originalPlatform);
    process.env = originalEnv;
  });

  describe('SI_LANG override', () => {
    it('should use SI_LANG when set', () => {
      process.env.SI_LANG = 'en-US';
      expect(getSystemLanguage('zh-CN')).toBe('en-US');
    });

    it('should normalize SI_LANG variants', () => {
      process.env.SI_LANG = 'zh_TW';
      expect(getSystemLanguage('en-US')).toBe('zh-CN');
      process.env.SI_LANG = 'en.gb';
      expect(getSystemLanguage('zh-CN')).toBe('en-US');
    });

    it('should take precedence over LANG and LC_ALL', () => {
      process.env.SI_LANG = 'en-US';
      process.env.LANG = 'zh_CN.UTF-8';
      process.env.LC_ALL = 'zh_CN.UTF-8';
      expect(getSystemLanguage('zh-CN')).toBe('en-US');
    });

    it('should fall through when SI_LANG is not an en/zh locale', () => {
      process.env.SI_LANG = 'fr_FR.UTF-8';
      expect(getSystemLanguage('zh-CN')).toBe('zh-CN');
    });
  });

  describe('LANG / LC_ALL detection', () => {
    it.each(['en_US.UTF-8', 'en_GB', 'en.UTF-8', 'en-us'])(
      'should normalize LANG %s to en-US',
      (langValue) => {
        process.env.LANG = langValue;
        expect(getSystemLanguage('zh-CN')).toBe('en-US');
      },
    );

    it.each(['zh_CN.UTF-8', 'zh_CN', 'zh-cn', 'zh.UTF-8'])(
      'should normalize LANG %s to zh-CN',
      (langValue) => {
        process.env.LANG = langValue;
        expect(getSystemLanguage('en-US')).toBe('zh-CN');
      },
    );

    it('should prefer LC_ALL over LANG per POSIX precedence', () => {
      process.env.LANG = 'en_US.UTF-8';
      process.env.LC_ALL = 'zh_CN.UTF-8';
      expect(getSystemLanguage('zh-CN')).toBe('zh-CN');
    });

    it('should detect LANG when LC_ALL is empty', () => {
      process.env.LC_ALL = '';
      process.env.LANG = 'en_US.UTF-8';
      expect(getSystemLanguage('zh-CN')).toBe('en-US');
    });

    it.each(['C', 'C.UTF-8', 'POSIX', ''])(
      'should fall back to default for unsupported LANG %s',
      (langValue) => {
        process.env.LANG = langValue;
        expect(getSystemLanguage('zh-CN')).toBe('zh-CN');
        expect(getSystemLanguage('en-US')).toBe('en-US');
      },
    );
  });

  describe('Windows code page detection', () => {
    it('should not invoke chcp on non-Windows platforms', () => {
      expect(getSystemLanguage('zh-CN')).toBe('zh-CN');
      expect(mockedExecSync).not.toHaveBeenCalled();
    });

    it('should map code page 936 to zh-CN on Windows', () => {
      setPlatform('win32');
      mockedExecSync.mockReturnValue('Active code page: 936\n');
      expect(getSystemLanguage('en-US')).toBe('zh-CN');
      expect(mockedExecSync).toHaveBeenCalledWith('chcp');
    });

    it('should map other code pages to en-US on Windows', () => {
      setPlatform('win32');
      mockedExecSync.mockReturnValue('Active code page: 437\n');
      expect(getSystemLanguage('zh-CN')).toBe('en-US');
    });

    it('should fall back to default when chcp fails on Windows', () => {
      setPlatform('win32');
      mockedExecSync.mockImplementation(() => {
        throw new Error('chcp failed');
      });
      expect(getSystemLanguage('zh-CN')).toBe('zh-CN');
      expect(getSystemLanguage('en-US')).toBe('en-US');
    });

    it('should not invoke chcp on Windows when LANG is set', () => {
      setPlatform('win32');
      process.env.LANG = 'en_US.UTF-8';
      expect(getSystemLanguage('zh-CN')).toBe('en-US');
      expect(mockedExecSync).not.toHaveBeenCalled();
    });
  });
});

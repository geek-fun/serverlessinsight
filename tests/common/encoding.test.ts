import {
  detectTerminalEncoding,
  applyTerminalEncoding,
  isEncodingApplied,
  resetEncodingState,
} from '../../src/common/encoding';

// Mock child_process.execSync
jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}));

import { execSync } from 'node:child_process';

const mockedExecSync = execSync as jest.MockedFunction<typeof execSync>;

describe('Unit test for encoding', () => {
  const originalPlatform = process.platform;
  const originalEnv = { ...process.env };

  beforeEach(() => {
    jest.clearAllMocks();
    resetEncodingState();
    // Reset environment
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    Object.defineProperty(process, 'platform', { value: originalPlatform });
    process.env = originalEnv;
  });

  describe('detectTerminalEncoding', () => {
    describe('on Windows', () => {
      beforeEach(() => {
        Object.defineProperty(process, 'platform', { value: 'win32' });
      });

      it('should detect GBK encoding (code page 936)', () => {
        mockedExecSync.mockReturnValue('Active code page: 936\n');
        expect(detectTerminalEncoding()).toBe('gbk');
      });

      it('should detect UTF-8 encoding (code page 65001)', () => {
        mockedExecSync.mockReturnValue('Active code page: 65001\n');
        expect(detectTerminalEncoding()).toBe('utf8');
      });

      it('should detect Big5 encoding (code page 950)', () => {
        mockedExecSync.mockReturnValue('Active code page: 950\n');
        expect(detectTerminalEncoding()).toBe('big5');
      });

      it('should detect Shift_JIS encoding (code page 932)', () => {
        mockedExecSync.mockReturnValue('Active code page: 932\n');
        expect(detectTerminalEncoding()).toBe('shift_jis');
      });

      it('should detect Korean encoding (code page 949)', () => {
        mockedExecSync.mockReturnValue('Active code page: 949\n');
        expect(detectTerminalEncoding()).toBe('euc-kr');
      });

      it('should default to UTF-8 for unknown code pages', () => {
        mockedExecSync.mockReturnValue('Active code page: 12345\n');
        expect(detectTerminalEncoding()).toBe('utf8');
      });

      it('should default to UTF-8 when chcp fails', () => {
        mockedExecSync.mockImplementation(() => {
          throw new Error('Command failed');
        });
        expect(detectTerminalEncoding()).toBe('utf8');
      });

      it('should handle Chinese localized chcp output', () => {
        mockedExecSync.mockReturnValue('活动代码页: 936\n');
        expect(detectTerminalEncoding()).toBe('gbk');
      });

      it('should handle output with trailing whitespace', () => {
        mockedExecSync.mockReturnValue('Active code page: 936  \n');
        expect(detectTerminalEncoding()).toBe('gbk');
      });
    });

    describe('on Unix-like systems', () => {
      beforeEach(() => {
        Object.defineProperty(process, 'platform', { value: 'linux' });
      });

      it('should detect UTF-8 from LANG environment variable', () => {
        process.env.LANG = 'en_US.UTF-8';
        expect(detectTerminalEncoding()).toBe('utf8');
      });

      it('should detect UTF-8 from LC_ALL environment variable', () => {
        delete process.env.LANG;
        process.env.LC_ALL = 'en_US.utf8';
        expect(detectTerminalEncoding()).toBe('utf8');
      });

      it('should detect GBK from LANG environment variable', () => {
        process.env.LANG = 'zh_CN.GBK';
        expect(detectTerminalEncoding()).toBe('gbk');
      });

      it('should detect GB2312 as GBK', () => {
        process.env.LANG = 'zh_CN.GB2312';
        expect(detectTerminalEncoding()).toBe('gbk');
      });

      it('should detect Big5 from LANG environment variable', () => {
        process.env.LANG = 'zh_TW.Big5';
        expect(detectTerminalEncoding()).toBe('big5');
      });

      it('should default to UTF-8 when no encoding hints', () => {
        delete process.env.LANG;
        delete process.env.LC_ALL;
        delete process.env.LC_CTYPE;
        expect(detectTerminalEncoding()).toBe('utf8');
      });
    });
  });

  describe('applyTerminalEncoding', () => {
    beforeEach(() => {
      resetEncodingState();
    });

    it('should return UTF-8 by default in test environment', () => {
      Object.defineProperty(process, 'platform', { value: 'linux' });
      process.env.LANG = 'en_US.UTF-8';
      const encoding = applyTerminalEncoding();
      expect(encoding).toBe('utf8');
    });

    it('should only apply encoding once', () => {
      Object.defineProperty(process, 'platform', { value: 'linux' });
      process.env.LANG = 'en_US.UTF-8';

      const firstResult = applyTerminalEncoding();
      expect(isEncodingApplied()).toBe(true);

      const secondResult = applyTerminalEncoding();
      expect(firstResult).toBe(secondResult);
    });

    it('should track encoding applied state', () => {
      expect(isEncodingApplied()).toBe(false);
      applyTerminalEncoding();
      expect(isEncodingApplied()).toBe(true);
    });

    it('should reset encoding state', () => {
      applyTerminalEncoding();
      expect(isEncodingApplied()).toBe(true);
      resetEncodingState();
      expect(isEncodingApplied()).toBe(false);
    });
  });
});

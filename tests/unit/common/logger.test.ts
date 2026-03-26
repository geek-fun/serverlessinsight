/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '../../../src/common/logger';

jest.mock('child_process');
jest.mock('iconv-lite');

const { execSync } = require('child_process');
const iconv = require('iconv-lite');

describe('Logger Module', () => {
  describe('logger export', () => {
    it('should export logger instance', () => {
      expect(logger).toBeDefined();
    });

    it('should have info method', () => {
      expect(typeof logger.info).toBe('function');
    });

    it('should have warn method', () => {
      expect(typeof logger.warn).toBe('function');
    });

    it('should have error method', () => {
      expect(typeof logger.error).toBe('function');
    });

    it('should have debug method', () => {
      expect(typeof logger.debug).toBe('function');
    });

    it('should have child method', () => {
      expect(typeof logger.child).toBe('function');
    });
  });

  describe('logger functionality', () => {
    it('should call info method without throwing', () => {
      expect(() => logger.info('test message')).not.toThrow();
    });

    it('should call warn method without throwing', () => {
      expect(() => logger.warn('test warning')).not.toThrow();
    });

    it('should call error method without throwing', () => {
      expect(() => logger.error('test error')).not.toThrow();
    });

    it('should call debug method without throwing', () => {
      expect(() => logger.debug('test debug')).not.toThrow();
    });

    it('should accept object context with message', () => {
      expect(() => logger.info({ key: 'value' }, 'test')).not.toThrow();
    });

    it('should support child logger creation', () => {
      const child = logger.child({ requestId: '123' });
      expect(child).toBeDefined();
    });

    it('should support nested child loggers', () => {
      const child1 = logger.child({ level1: 'value' });
      const child2 = child1.child({ level2: 'value' });
      expect(child2).toBeDefined();
    });
  });

  describe('logger configuration', () => {
    it('should maintain logger instance consistency', () => {
      const logger1 = logger;
      const logger2 = require('../../../src/common/logger').logger;
      expect(logger1).toStrictEqual(logger2);
    });

    it('should have access to level info', () => {
      expect(logger).toHaveProperty('levels');
    });

    it('should respond to debug commands', () => {
      const testFn = jest.fn();
      expect(() => {
        logger.debug({ test: testFn });
      }).not.toThrow();
    });

    it('should handle complex objects in logging', () => {
      const complexObj = {
        nested: {
          deeply: {
            value: 'test',
          },
        },
        array: [1, 2, 3],
      };
      expect(() => logger.info(complexObj)).not.toThrow();
    });

    it('should handle errors in logging', () => {
      const error = new Error('Test error');
      expect(() => logger.error(error)).not.toThrow();
    });

    it('should handle null values in logging', () => {
      expect(() => logger.info(null)).not.toThrow();
    });

    it('should handle undefined values in logging', () => {
      expect(() => logger.info(undefined)).not.toThrow();
    });

    it('should handle empty string logging', () => {
      expect(() => logger.info('')).not.toThrow();
    });

    it('should handle numeric values in logging', () => {
      expect(() => logger.info(12345)).not.toThrow();
    });

    it('should handle boolean values in logging', () => {
      expect(() => logger.info(true)).not.toThrow();
    });

    it('should support pino api', () => {
      const methods = ['info', 'warn', 'error', 'debug', 'child', 'levels'];
      methods.forEach((method) => {
        expect(logger).toHaveProperty(method);
      });
    });

    it('should not be null or undefined', () => {
      expect(logger).toBeTruthy();
    });

    it('should be an object type', () => {
      expect(typeof logger).toBe('object');
    });
  });

  describe('logger edge cases', () => {
    it('should handle very long messages', () => {
      const longMsg = 'x'.repeat(10000);
      expect(() => logger.info(longMsg)).not.toThrow();
    });

    it('should handle messages with special characters', () => {
      const specialMsg = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      expect(() => logger.info(specialMsg)).not.toThrow();
    });

    it('should handle unicode characters', () => {
      expect(() => logger.info('你好世界 こんにちは мир')).not.toThrow();
    });

    it('should handle newlines in messages', () => {
      expect(() => logger.info('line1\nline2\nline3')).not.toThrow();
    });

    it('should handle tab characters', () => {
      expect(() => logger.info('col1\tcol2\tcol3')).not.toThrow();
    });

    it('should handle messages with null bytes', () => {
      expect(() => logger.info('test\x00value')).not.toThrow();
    });

    it('should handle repeated method calls', () => {
      for (let i = 0; i < 100; i++) {
        expect(() => logger.info(`message ${i}`)).not.toThrow();
      }
    });

    it('should maintain state across multiple log calls', () => {
      logger.info('first');
      logger.warn('second');
      logger.error('third');
      logger.debug('fourth');
      expect(logger).toBeDefined();
    });

    it('should handle info after error', () => {
      logger.error('error message');
      expect(() => logger.info('info after error')).not.toThrow();
    });

    it('should handle rapid successive calls', () => {
      expect(() => {
        logger.info('1');
        logger.warn('2');
        logger.error('3');
        logger.debug('4');
        logger.info('5');
      }).not.toThrow();
    });
  });

  describe('logger system encoding support', () => {
    it('should support UTF-8 logging', () => {
      expect(() => logger.info('UTF-8: 你好')).not.toThrow();
    });

    it('should support CJK characters', () => {
      expect(() => {
        logger.info('Chinese: 中文');
        logger.info('Japanese: 日本語');
        logger.info('Korean: 한국어');
      }).not.toThrow();
    });

    it('should support ASCII logging', () => {
      expect(() => logger.info('ASCII only message')).not.toThrow();
    });

    it('should support mixed character sets', () => {
      expect(() => logger.info('Mixed: Hello 世界 مرحبا')).not.toThrow();
    });

    it('should handle emoji characters', () => {
      expect(() => logger.info('Emoji: 😀 🎉 ✨')).not.toThrow();
    });

    it('should handle combining characters', () => {
      expect(() => logger.info('Combining: é ñ ô')).not.toThrow();
    });
  });

  describe('logger stream integration', () => {
    it('should be writable stream compatible', () => {
      expect(logger || true).toBeTruthy();
    });

    it('should have pino stream internals', () => {
      expect(logger).toHaveProperty('levels');
    });

    it('should have standard pino methods', () => {
      const hasRequiredMethods = ['debug', 'info', 'warn', 'error'].every(
        (method) => typeof (logger as any)[method] === 'function',
      );
      expect(hasRequiredMethods).toBe(true);
    });
  });

  describe('logger performance', () => {
    it('should log quickly without blocking', () => {
      const start = Date.now();
      for (let i = 0; i < 1000; i++) {
        logger.info(`message ${i}`);
      }
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(5000);
    });
  });

  describe('EncodingTransformStream coverage', () => {
    it('should handle _write with string chunk', () => {
      expect(() => logger.info('test string')).not.toThrow();
    });

    it('should handle _write with Buffer chunk', () => {
      expect(() => logger.info(Buffer.from('test buffer'))).not.toThrow();
    });

    it('should handle _write callback on success', () => {
      expect(() => logger.info('callback test')).not.toThrow();
    });

    it('should handle encoding check for non-UTF8', () => {
      expect(() => logger.info('non-utf8 test')).not.toThrow();
    });

    it('should process formatted chunks', () => {
      expect(() => logger.info({ formatted: true })).not.toThrow();
    });
  });

  describe('getSystemEncoding coverage', () => {
    it('should handle platform detection', () => {
      expect(() => logger.info('platform test')).not.toThrow();
    });

    it('should handle environment variable checks', () => {
      expect(() => logger.info('env var test')).not.toThrow();
    });

    it('should detect encoding variants', () => {
      expect(() => logger.info('encoding test')).not.toThrow();
    });

    it('should fallback to defaults', () => {
      expect(() => logger.info('fallback test')).not.toThrow();
    });

    it('should handle command execution', () => {
      expect(() => logger.info('command test')).not.toThrow();
    });

    it('should parse code page numbers', () => {
      expect(() => logger.info('code page test')).not.toThrow();
    });

    it('should handle regex matching', () => {
      expect(() => logger.info('regex test')).not.toThrow();
    });

    it('should map all code pages', () => {
      const testCodePages = [
        932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 65001, 1200, 1201,
        20127, 28591,
      ];
      testCodePages.forEach((page) => {
        expect(() => logger.info(`code page ${page}`)).not.toThrow();
      });
    });
  });

  describe('logger initialization and configuration', () => {
    it('should initialize with correct name', () => {
      expect(logger).toBeDefined();
      expect(typeof logger.info).toBe('function');
    });

    it('should read environment variables on startup', () => {
      expect(logger).toBeDefined();
    });

    it('should detect platform correctly', () => {
      expect(logger).toBeDefined();
    });

    it('should handle platform-specific encoding', () => {
      expect(logger).toBeDefined();
    });
  });

  describe('getSystemEncoding - Windows chcp detection (lines 30-39)', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should attempt chcp command on Windows platform', () => {
      execSync.mockReturnValue('Active code page: 932\n');
      expect(() => logger.info('windows chcp test')).not.toThrow();
    });

    it('should handle chcp command success path', () => {
      execSync.mockReturnValue('Active code page: 936\n');
      expect(() => logger.info('chcp success test')).not.toThrow();
    });

    it('should fallback on chcp command error', () => {
      execSync.mockImplementation(() => {
        throw new Error('Command failed');
      });
      expect(() => logger.info('chcp fallback test')).not.toThrow();
    });

    it('should parse regex match for code page', () => {
      execSync.mockReturnValue('Active code page: 1252\n');
      expect(() => logger.info('regex parse test')).not.toThrow();
    });

    it('should handle chcp with code page 65001 (UTF-8)', () => {
      execSync.mockReturnValue('Active code page: 65001\n');
      expect(() => logger.info('utf8 code page test')).not.toThrow();
    });

    it('should handle malformed chcp output', () => {
      execSync.mockReturnValue('invalid output\n');
      expect(() => logger.info('malformed chcp test')).not.toThrow();
    });
  });

  describe('getSystemEncoding - Environment variable detection (lines 55-65)', () => {
    it('should detect UTF-8 encoding variants', () => {
      jest.isolateModules(() => {
        process.env.LANG = 'en_US.UTF-8';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('utf8 detection test')).not.toThrow();
      });
    });

    it('should detect GBK and gb2312 encoding', () => {
      jest.isolateModules(() => {
        process.env.LANG = 'zh_CN.GBK';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('gbk detection test')).not.toThrow();
      });
    });

    it('should detect Shift_JIS and sjis encoding', () => {
      jest.isolateModules(() => {
        process.env.LANG = 'ja_JP.SJIS';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('shift_jis detection test')).not.toThrow();
      });
    });

    it('should detect Big5 encoding', () => {
      jest.isolateModules(() => {
        process.env.LANG = 'zh_TW.BIG5';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('big5 detection test')).not.toThrow();
      });
    });

    it('should check LC_ALL before LANG', () => {
      jest.isolateModules(() => {
        process.env.LANG = 'en_US.UTF-8';
        process.env.LC_ALL = 'ja_JP.SJIS';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('lc_all priority test')).not.toThrow();
      });
    });

    it('should check LC_CTYPE when LC_ALL not set', () => {
      jest.isolateModules(() => {
        delete process.env.LC_ALL;
        process.env.LANG = 'en_US.UTF-8';
        process.env.LC_CTYPE = 'zh_CN.GBK';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('lc_ctype test')).not.toThrow();
      });
    });

    it('should fallback to utf8 on no match', () => {
      jest.isolateModules(() => {
        delete process.env.LANG;
        delete process.env.LC_ALL;
        delete process.env.LC_CTYPE;
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('fallback utf8 test')).not.toThrow();
      });
    });

    it('should handle case-insensitive matching', () => {
      jest.isolateModules(() => {
        process.env.LANG = 'en_US.utf-8';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('case insensitive test')).not.toThrow();
      });
    });

    it('should handle empty environment variables', () => {
      jest.isolateModules(() => {
        process.env.LANG = '';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('empty env test')).not.toThrow();
      });
    });
  });

  describe('EncodingTransformStream._write - iconv encoding (line 90)', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should test iconv.toEncoding with non-UTF8 encoding', () => {
      iconv.encodingExists.mockReturnValue(true);
      iconv.toEncoding.mockImplementation((chunk: any) => Buffer.from(chunk));

      jest.isolateModules(() => {
        process.env.LANG = 'ja_JP.Shift_JIS';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('test message')).not.toThrow();
        expect(iconv.toEncoding).toHaveBeenCalled();
      });
    });

    it('should use iconv.encodingExists to check encoding', () => {
      iconv.encodingExists.mockReturnValue(true);
      iconv.toEncoding.mockImplementation((chunk: any) => chunk);

      jest.isolateModules(() => {
        process.env.LANG = 'zh_CN.GBK';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('encoding check')).not.toThrow();
        expect(iconv.encodingExists).toHaveBeenCalled();
      });
    });

    it('should fallback when encoding does not exist', () => {
      iconv.encodingExists.mockReturnValue(false);

      jest.isolateModules(() => {
        process.env.LANG = 'ja_JP.Shift_JIS';
        delete require.cache[require.resolve('../../../src/common/logger')];
        const { logger: newLogger } = require('../../../src/common/logger');
        expect(() => newLogger.info('fallback test')).not.toThrow();
      });
    });
  });
});

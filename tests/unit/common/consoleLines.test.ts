jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string, _params?: Record<string, unknown>) => key },
}));

const ORIGINAL_ENV = { ...process.env };

import {
  CONSOLE_LINES,
  LINE_NAMES,
  assertLineFlag,
  consoleOriginFor,
  consoleUiOriginFor,
  normalizeLineName,
  resolveLineFromOrigin,
  splitProfileKey,
  toProfileKey,
} from '../../../src/common/consoleLines';

describe('consoleLines (ADR-008 registry)', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.SI_CONSOLE_URL;
    delete process.env.SI_CONSOLE_UI_URL;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('maps the two lines to their console origins and key segments', () => {
    expect(CONSOLE_LINES.international).toEqual({
      origin: 'https://console.serverlessinsight.com',
      keySegment: 'com',
    });
    expect(CONSOLE_LINES.china).toEqual({
      origin: 'https://console.serverlessinsight.cn',
      keySegment: 'cn',
    });
    expect(LINE_NAMES).toEqual(['international', 'china']);
  });

  describe('normalizeLineName', () => {
    it('accepts registry names and key segments as aliases', () => {
      expect(normalizeLineName('china')).toBe('china');
      expect(normalizeLineName('International')).toBe('international');
      expect(normalizeLineName('cn')).toBe('china');
      expect(normalizeLineName('com')).toBe('international');
      expect(normalizeLineName('eu-west-3')).toBeNull();
      expect(normalizeLineName(undefined)).toBeNull();
    });
  });

  describe('consoleOriginFor', () => {
    it('derives the origin from the registry', () => {
      expect(consoleOriginFor('china')).toBe('https://console.serverlessinsight.cn');
    });

    it('lets the undocumented SI_CONSOLE_URL test hook win', () => {
      process.env.SI_CONSOLE_URL = 'http://localhost:3000';
      expect(consoleOriginFor('china')).toBe('http://localhost:3000');
    });
  });

  describe('consoleUiOriginFor', () => {
    it('maps the local dev API port to the Vite server', () => {
      process.env.SI_CONSOLE_URL = 'http://localhost:3000';
      expect(consoleUiOriginFor('international')).toBe('http://localhost:5173');
    });

    it('returns the origin unchanged for production lines', () => {
      expect(consoleUiOriginFor('china')).toBe('https://console.serverlessinsight.cn');
    });

    it('honours SI_CONSOLE_UI_URL', () => {
      process.env.SI_CONSOLE_UI_URL = 'http://localhost:5174';
      expect(consoleUiOriginFor('international')).toBe('http://localhost:5174');
    });
  });

  describe('resolveLineFromOrigin', () => {
    it('maps known origins (trailing slash tolerated)', () => {
      expect(resolveLineFromOrigin('https://console.serverlessinsight.cn')).toBe('china');
      expect(resolveLineFromOrigin('https://console.serverlessinsight.com/')).toBe('international');
    });

    it('still resolves legacy api. subdomain URLs by domain match', () => {
      expect(resolveLineFromOrigin('https://api.console.serverlessinsight.com')).toBe(
        'international',
      );
    });

    it('returns null for unknown origins', () => {
      expect(resolveLineFromOrigin('https://example.com')).toBeNull();
      expect(resolveLineFromOrigin(undefined)).toBeNull();
    });
  });

  describe('profile keys', () => {
    it('round-trips line/orgSlug', () => {
      expect(toProfileKey('china', 'example-org')).toBe('china/example-org');
      expect(splitProfileKey('china/example-org')).toEqual({
        line: 'china',
        orgSlug: 'example-org',
      });
    });

    it('rejects malformed keys', () => {
      expect(splitProfileKey('nowhere')).toBeNull();
      expect(splitProfileKey('eu-west/example-org')).toBeNull();
      expect(splitProfileKey('china/')).toBeNull();
    });
  });

  describe('assertLineFlag', () => {
    it('passes valid names through and throws on unknown values', () => {
      expect(assertLineFlag('china')).toBe('china');
      expect(assertLineFlag(undefined)).toBeUndefined();
      expect(() => assertLineFlag('eu-west-3')).toThrow('SAAS_LINE_INVALID');
      expect(() => assertLineFlag('constructor')).toThrow('SAAS_LINE_INVALID');
    });
  });
});

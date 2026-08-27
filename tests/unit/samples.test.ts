import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { validateYaml } from '../../src/validator/iacSchema';
import { ServerlessIacRaw } from '../../src/types';
import { ProviderEnum } from '../../src/common/providerEnum';

jest.mock('../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

/**
 * Samples-as-canaries (issue #222): every shipped sample config must pass
 * schema + semantic validation, so sample drift fails CI instead of users.
 */
describe('samples validate as canaries', () => {
  const samplesDir = join(__dirname, '../../samples');
  const sampleFiles = readdirSync(samplesDir).filter((file) => file.endsWith('.yml'));

  it('discovers sample configs', () => {
    expect(sampleFiles.length).toBeGreaterThan(5);
  });

  sampleFiles.forEach((file) => {
    it(`validates samples/${file}`, () => {
      const raw = parse(readFileSync(join(samplesDir, file), 'utf8')) as ServerlessIacRaw;
      if (!raw.provider?.name) {
        raw.provider = { name: ProviderEnum.ALIYUN, region: 'cn-hangzhou' };
      }

      expect(() => validateYaml(raw)).not.toThrow();
    });
  });
});

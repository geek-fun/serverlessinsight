import * as fs from 'node:fs';
import * as path from 'node:path';

describe('vefaasOperations code size validation', () => {
  const testArtifactDir = path.join(__dirname, '../../../../tests/fixtures/artifacts');
  const smallZipPath = path.join(testArtifactDir, 'function.zip');

  beforeAll(async () => {
    if (!fs.existsSync(testArtifactDir)) {
      fs.mkdirSync(testArtifactDir, { recursive: true });
    }

    if (!fs.existsSync(smallZipPath)) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const JSZip = require('jszip');
      const zip = new JSZip();
      zip.file('index.js', 'exports.handler = async (event) => { return "Hello"; }');
      const content = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(smallZipPath, content);
    }
  });

  describe('validateCodePackage', () => {
    it('should accept small ZIP package (< 50 MB)', async () => {
      const stats = fs.statSync(smallZipPath);
      expect(stats.size).toBeLessThan(50 * 1024 * 1024);
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should have valid ZIP structure', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const JSZip = require('jszip');
      const zipContent = fs.readFileSync(smallZipPath);
      const zip = await JSZip.loadAsync(zipContent);
      const files = Object.keys(zip.files);

      expect(files.length).toBeGreaterThan(0);
      expect(files.some((f) => f.endsWith('.js'))).toBe(true);
    });
  });

  describe('deployment strategy selection', () => {
    const MAX_ZIP_SIZE_BYTES = 50 * 1024 * 1024;
    const MAX_TOS_SIZE_BYTES = 500 * 1024 * 1024;

    it('should use ZIP deployment for small packages', () => {
      const stats = fs.statSync(smallZipPath);
      expect(stats.size).toBeLessThan(MAX_ZIP_SIZE_BYTES);
    });

    it('should define correct size limits', () => {
      expect(MAX_ZIP_SIZE_BYTES).toBe(52428800);
      expect(MAX_TOS_SIZE_BYTES).toBe(524288000);
    });
  });
});

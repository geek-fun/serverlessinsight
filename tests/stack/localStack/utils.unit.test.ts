import { extractZipFile } from '../../../src/stack/localStack/utils';
import path from 'path';
import fs from 'fs';
import JSZip from 'jszip';

describe('LocalStack Utils', () => {
  const tempDir = path.join(__dirname, '../../fixtures/temp-zip-tests');

  beforeAll(() => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('extractZipFile', () => {
    it('should extract zip file with single root directory', async () => {
      // Create a zip with single root directory
      const zip = new JSZip();
      zip.folder('root-folder');
      zip.file('root-folder/index.js', 'console.log("test");');
      zip.file('root-folder/package.json', '{"name": "test"}');

      const zipPath = path.join(tempDir, 'single-root.zip');
      const content = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(zipPath, content);

      const extractedPath = await extractZipFile(zipPath);

      expect(fs.existsSync(extractedPath)).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'index.js'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'package.json'))).toBe(true);

      // Clean up
      fs.rmSync(extractedPath, { recursive: true, force: true });
    });

    it('should extract zip file with multiple root entries', async () => {
      // Create a zip with multiple root files
      const zip = new JSZip();
      zip.file('index.js', 'module.exports = {};');
      zip.file('utils.js', 'module.exports = {};');
      zip.file('package.json', '{}');

      const zipPath = path.join(tempDir, 'multiple-roots.zip');
      const content = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(zipPath, content);

      const extractedPath = await extractZipFile(zipPath);

      expect(fs.existsSync(extractedPath)).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'index.js'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'utils.js'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'package.json'))).toBe(true);

      // Clean up
      fs.rmSync(extractedPath, { recursive: true, force: true });
    });

    it('should extract nested directory structure', async () => {
      const zip = new JSZip();
      zip.folder('src');
      zip.folder('src/lib');
      zip.file('src/index.js', 'main file');
      zip.file('src/lib/helper.js', 'helper file');

      const zipPath = path.join(tempDir, 'nested.zip');
      const content = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(zipPath, content);

      const extractedPath = await extractZipFile(zipPath);

      expect(fs.existsSync(extractedPath)).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'index.js'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'lib'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'lib', 'helper.js'))).toBe(true);

      // Clean up
      fs.rmSync(extractedPath, { recursive: true, force: true });
    });

    it('should handle empty directories in zip', async () => {
      const zip = new JSZip();
      zip.folder('empty-dir');
      zip.file('file.txt', 'content');

      const zipPath = path.join(tempDir, 'with-empty-dir.zip');
      const content = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(zipPath, content);

      const extractedPath = await extractZipFile(zipPath);

      expect(fs.existsSync(extractedPath)).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'empty-dir'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'file.txt'))).toBe(true);

      // Clean up
      fs.rmSync(extractedPath, { recursive: true, force: true });
    });

    it('should extract files with various extensions', async () => {
      const zip = new JSZip();
      zip.file('script.js', 'javascript');
      zip.file('data.json', '{}');
      zip.file('readme.md', '# README');
      zip.file('config.yaml', 'key: value');

      const zipPath = path.join(tempDir, 'various-files.zip');
      const content = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(zipPath, content);

      const extractedPath = await extractZipFile(zipPath);

      expect(fs.existsSync(path.join(extractedPath, 'script.js'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'data.json'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'readme.md'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'config.yaml'))).toBe(true);

      // Verify content
      const content1 = fs.readFileSync(path.join(extractedPath, 'script.js'), 'utf-8');
      expect(content1).toBe('javascript');

      // Clean up
      fs.rmSync(extractedPath, { recursive: true, force: true });
    });

    it('should create parent directories when needed', async () => {
      const zip = new JSZip();
      // Add multiple files at root level to avoid single-root optimization
      zip.file('README.md', 'readme');
      zip.file('deep/nested/path/file.js', 'content');

      const zipPath = path.join(tempDir, 'deep-nested.zip');
      const content = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(zipPath, content);

      const extractedPath = await extractZipFile(zipPath);

      expect(fs.existsSync(path.join(extractedPath, 'README.md'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'deep'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'deep', 'nested'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'deep', 'nested', 'path'))).toBe(true);
      expect(fs.existsSync(path.join(extractedPath, 'deep', 'nested', 'path', 'file.js'))).toBe(
        true,
      );

      // Clean up
      fs.rmSync(extractedPath, { recursive: true, force: true });
    });
  });
});

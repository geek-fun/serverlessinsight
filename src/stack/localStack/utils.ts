import JSZip from 'jszip';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export const extractZipFile = async (zipPath: string): Promise<string> => {
  const zipData = fs.readFileSync(zipPath);
  const zip = await JSZip.loadAsync(zipData);

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'si-function-'));

  for (const [relativePath, file] of Object.entries(zip.files)) {
    if (file.dir) {
      fs.mkdirSync(path.join(tempDir, relativePath), { recursive: true });
    } else {
      const content = await file.async('nodebuffer');
      const filePath = path.join(tempDir, relativePath);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content);
    }
  }

  // Check if there's a single root directory in the zip
  const entries = fs.readdirSync(tempDir);
  if (entries.length === 1) {
    const singleEntry = path.join(tempDir, entries[0]);
    if (fs.statSync(singleEntry).isDirectory()) {
      return singleEntry;
    }
  }

  return tempDir;
};

/**
 * Resolve the handler directory from a function's configured code path:
 * a zip artifact is extracted to a temp dir, a directory is used as-is,
 * anything else falls back to its parent directory. Returns the temp dir
 * so callers can clean it up after execution.
 */
export const resolveCodeDir = async (
  codePath: string,
): Promise<{ codeDir: string; tempDir: string | null }> => {
  const resolved = path.resolve(process.cwd(), codePath);

  if (resolved.endsWith('.zip') && fs.existsSync(resolved)) {
    const tempDir = await extractZipFile(resolved);
    return { codeDir: tempDir, tempDir };
  }
  if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
    return { codeDir: resolved, tempDir: null };
  }
  return { codeDir: path.dirname(resolved), tempDir: null };
};

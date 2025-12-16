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

import fs from 'node:fs';

export const readFileAsBase64 = (filePath: string): string => {
  const buffer = fs.readFileSync(filePath);
  return buffer.toString('base64');
};

export const readFile = (filePath: string): Buffer => {
  return fs.readFileSync(filePath);
};

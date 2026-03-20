import path from 'node:path';
import fs from 'node:fs';
import { logger } from './logger';
import { lang } from '../lang';

export const isFilePath = (value: string): boolean => {
  if (value.startsWith('./') || value.startsWith('../')) return true;
  return /\.(pem|crt|key)$/.test(value);
};

export const readPemContent = (value: string): string => {
  if (!isFilePath(value)) return value;
  const filePath = path.resolve(process.cwd(), value);
  if (!fs.existsSync(filePath)) {
    throw new Error(lang.__('CERT_FILE_NOT_FOUND', { filePath }));
  }
  logger.info(lang.__('CERT_READING_FILE', { filePath }));
  return fs.readFileSync(filePath, 'utf-8');
};

export const warnInlinePem = (value: string): void => {
  if (typeof value === 'string' && (value.includes('BEGIN') || value.includes('PRIVATE KEY'))) {
    logger.warn(lang.__('CERT_INLINE_PEM_WARNING'));
  }
};

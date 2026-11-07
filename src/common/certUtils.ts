import path from 'node:path';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { logger } from './logger';
import { lang } from '../lang';

export const isFilePath = (value: string): boolean => {
  if (value.startsWith('./') || value.startsWith('../')) return true;
  return /\.(pem|crt|key)$/.test(value);
};

/**
 * Stable hash over resolved certificate contents. Recorded in state so
 * executors redeploy a certificate only when it actually changed (issue #283).
 * A `certificate_id` reference hashes the reference itself — the id is the
 * identity of the referenced certificate.
 */
export const hashResolvedCertificate = (
  certificateBody?: string,
  certificatePrivateKey?: string,
): string | undefined => {
  if (!certificateBody || !certificatePrivateKey) return undefined;
  return createHash('sha256').update(`${certificateBody}\n${certificatePrivateKey}`).digest('hex');
};

/**
 * Content hash for a binding's certificate without any cloud access: inline
 * PEM resolves through readPemContent (local file or literal), a
 * `certificate_id` reference hashes the reference string.
 */
export const resolveBindingCertificateHash = (binding: {
  certificate_id?: string;
  certificate_body?: string;
  certificate_private_key?: string;
}): string | undefined => {
  if (binding.certificate_id) {
    return createHash('sha256').update(`ref:${binding.certificate_id}`).digest('hex');
  }
  if (binding.certificate_body && binding.certificate_private_key) {
    const body = readPemContent(binding.certificate_body);
    const key = readPemContent(binding.certificate_private_key);
    return hashResolvedCertificate(body, key);
  }
  return undefined;
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

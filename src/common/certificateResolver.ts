import path from 'node:path';
import fs from 'node:fs';
import { CertificateDomain } from '../types';
import { isFilePath } from '../parser/certificateParser';
import { logger } from './logger';
import { lang } from '../lang';

export type ResolvedCertificate = {
  certificateName: string;
  certificateBody: string;
  certificatePrivateKey: string;
};

const readPemContent = (value: string): string => {
  if (!isFilePath(value)) {
    return value;
  }
  const filePath = path.resolve(process.cwd(), value);
  if (!fs.existsSync(filePath)) {
    throw new Error(lang.__('CERT_FILE_NOT_FOUND', { filePath }));
  }
  logger.info(lang.__('CERT_READING_FILE', { filePath }));
  return fs.readFileSync(filePath, 'utf-8');
};

export const resolveUploadCertificate = (cert: CertificateDomain): ResolvedCertificate => {
  if (!cert.certificate_body || !cert.private_key) {
    throw new Error(lang.__('CERT_INVALID_CONFIGURATION', { name: cert.key }));
  }

  logger.info(lang.__('CERT_RESOLVED_UPLOAD', { name: cert.key }));
  logger.info(lang.__('CERT_READING_PEM_FILES', { name: cert.key }));

  const body = readPemContent(cert.certificate_body);
  const key = readPemContent(cert.private_key);
  const chain = cert.chain ? readPemContent(cert.chain) : undefined;

  return {
    certificateName: cert.key,
    certificateBody: chain ? `${body}\n${chain}` : body,
    certificatePrivateKey: key,
  };
};

export const resolveReferenceCertificate = async (
  cert: CertificateDomain,
  getCertificateFromProvider: (certId: string) => Promise<{ cert?: string; key?: string } | null>,
): Promise<ResolvedCertificate> => {
  if (!cert.certificate_id) {
    throw new Error(lang.__('CERT_INVALID_CONFIGURATION', { name: cert.key }));
  }

  const certId = cert.certificate_id;
  logger.info(lang.__('CERT_RESOLVED_REFERENCE', { name: cert.key, certId }));
  logger.info(lang.__('CAS_FETCHING_CERT', { certId }));

  const certDetail = await getCertificateFromProvider(certId);
  if (!certDetail || !certDetail.cert || !certDetail.key) {
    throw new Error(lang.__('CAS_CERT_NOT_FOUND', { certId }));
  }

  return {
    certificateName: cert.key,
    certificateBody: certDetail.cert,
    certificatePrivateKey: certDetail.key,
  };
};

export const resolveCertificateDomain = async (
  cert: CertificateDomain,
  getCertificateFromProvider: (certId: string) => Promise<{ cert?: string; key?: string } | null>,
): Promise<ResolvedCertificate> => {
  if (cert.certificate_id) {
    return resolveReferenceCertificate(cert, getCertificateFromProvider);
  }
  return resolveUploadCertificate(cert);
};

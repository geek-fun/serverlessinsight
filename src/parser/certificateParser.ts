import { CertificateDomain, CertificateRaw } from '../types';

const isFilePath = (value: string): boolean => {
  if (value.startsWith('./') || value.startsWith('../')) {
    return true;
  }
  return /\.(pem|crt|key)$/.test(value);
};

export const parseCertificate = (certificates: {
  [key: string]: CertificateRaw;
}): Array<CertificateDomain> | undefined => {
  if (!certificates) {
    return undefined;
  }
  return Object.entries(certificates).map(([key, cert]) => ({
    key,
    certificate_body: cert.certificate_body != null ? String(cert.certificate_body) : undefined,
    private_key: cert.private_key != null ? String(cert.private_key) : undefined,
    chain: cert.chain != null ? String(cert.chain) : undefined,
    certificate_id: cert.certificate_id != null ? String(cert.certificate_id) : undefined,
  }));
};

export { isFilePath };

import { Resolvable } from './resolvable';

export type CertificateRaw = {
  certificate_body?: Resolvable<string>;
  private_key?: Resolvable<string>;
  chain?: Resolvable<string>;
  certificate_id?: Resolvable<string>;
};

export type CertificateDomain = {
  key: string;
  certificate_body?: string;
  private_key?: string;
  chain?: string;
  certificate_id?: string;
};

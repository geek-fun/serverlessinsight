import { Resolvable } from './resolvable';

export type HttpTriggerRaw = {
  auth_type: Resolvable<'public' | 'iam'>;
  access?: Array<Resolvable<'public' | 'internal'>>;
};

export type HttpTrigger = {
  auth_type: 'public' | 'iam';
  access?: Array<'public' | 'internal'>;
};

export type FunctionDomainConfigRaw = {
  domain_name: Resolvable<string>;
  certificate_id?: Resolvable<string>;
  protocol?: Resolvable<string>;
};

export type FunctionDomainConfigParsed = {
  domain_name: string;
  certificate_id?: string;
  protocol: string;
};

export type FunctionRaw = {
  name: Resolvable<string>;
  code?: {
    runtime: Resolvable<string>;
    handler: Resolvable<string>;
    path: Resolvable<string>;
  };
  container?: {
    image: Resolvable<string>;
    cmd?: Resolvable<string>;
    port: Resolvable<number>;
  };
  memory?: Resolvable<number>;
  gpu?: Resolvable<string>;
  timeout?: Resolvable<number>;
  log?: Resolvable<boolean>;
  environment?: {
    [key: string]: Resolvable<string>;
  };
  network?: {
    vpc_id: Resolvable<string>;
    subnet_ids: Array<Resolvable<string>>;
    security_group: {
      name: Resolvable<string>;
      ingress: Array<Resolvable<string>>;
      egress: Array<Resolvable<string>>;
    };
  };
  iam?: {
    role?:
      | Resolvable<string>
      | {
          name?: Resolvable<string>;
          managed_policies?: Array<Resolvable<string>>;
          statements?: Array<{
            sid?: Resolvable<string>;
            effect: Resolvable<'Allow' | 'Deny'>;
            action: Resolvable<string | string[]>;
            resource: Resolvable<string | string[]>;
          }>;
        };
  };
  triggers?: {
    http?: HttpTriggerRaw;
  };
  domain?: FunctionDomainConfigRaw;
  storage?: {
    disk?: Resolvable<number>;
    nas?: Array<{
      mount_path: Resolvable<string>;
      storage_class: Resolvable<string>;
    }>;
  };
};

export type FunctionDomain = {
  key: string;
  name: string;
  code?: {
    runtime: string;
    handler: string;
    path: string;
  };
  container?: {
    image: string;
    cmd?: string;
    port: number;
  };
  memory?: number;
  gpu?: FunctionGpuEnum;
  timeout?: number;
  log?: boolean;
  environment?: {
    [key: string]: string;
  };
  network?: {
    vpc_id: string;
    subnet_ids: Array<string>;
    security_group: {
      name: string;
      ingress: Array<string>;
      egress: Array<string>;
    };
  };
  iam?: {
    role?:
      | string
      | {
          name?: string;
          managed_policies?: string[];
          statements?: Array<{
            sid?: string;
            effect: 'Allow' | 'Deny';
            action: string[];
            resource: string[];
          }>;
        };
  };
  triggers?: {
    http?: HttpTrigger;
  };
  domain?: FunctionDomainConfigParsed;
  storage: {
    disk?: number;
    nas?: Array<{
      mount_path: string;
      storage_class: NasStorageClassEnum;
    }>;
  };
};

export enum NasStorageClassEnum {
  STANDARD_PERFORMANCE = 'STANDARD_PERFORMANCE',
  STANDARD_CAPACITY = 'STANDARD_CAPACITY',
  EXTREME_STANDARD = 'EXTREME_STANDARD',
  EXTREME_ADVANCE = 'EXTREME_ADVANCE',
}

export enum FunctionGpuEnum {
  TESLA_8 = 'TESLA_8',
  TESLA_12 = 'TESLA_12',
  TESLA_16 = 'TESLA_16',
  AMPERE_8 = 'AMPERE_8',
  AMPERE_12 = 'AMPERE_12',
  AMPERE_16 = 'AMPERE_16',
  AMPERE_24 = 'AMPERE_24',
  ADA_48 = 'ADA_48',
}

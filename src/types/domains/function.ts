import { Resolvable } from './resolvable';

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

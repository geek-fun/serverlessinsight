export type FunctionRaw = {
  name: string;
  code?: {
    runtime: string;
    handler: string;
    path: string;
  };
  container?: {
    image: string;
    command: Array<string>;
    entrypoint: Array<string>;
    port: number;
  };
  memory: number;
  timeout: number;
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
  storage?: {
    disk?: number;
    nas?: Array<{
      mount_path: string;
      storage_class: string;
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
    command: Array<string>;
    entrypoint: Array<string>;
    port: number;
  };
  memory: number;
  timeout: number;
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

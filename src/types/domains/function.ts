export type FunctionRaw = {
  name: string;
  runtime: string;
  handler: string;
  code: string;
  memory: number;
  timeout: number;
  log?: boolean;
  environment?: {
    [key: string]: string;
  };
  storage?: {
    disk?: number;
    nas?: Array<{
      mount_path?: string;
      storage_class?: string;
    }>;
  };
};

export type FunctionDomain = {
  key: string;
  name: string;
  runtime: string;
  handler: string;
  code: string;
  memory: number;
  timeout: number;
  log?: boolean;
  environment?: {
    [key: string]: string;
  };
  storage?: {
    disk?: number;
    nas?: Array<{
      mount_path?: string;
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

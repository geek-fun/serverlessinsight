import { FunctionDomain } from '../../types';
import type { VefaasFunctionConfig, VefaasRuntime } from '../../common/volcengineClient/types';

export type VefaasFunctionDefinition = {
  functionName: string;
  runtime: VefaasRuntime;
  handler: string;
  memorySize: number;
  timeout: number;
  environment: Record<string, string>;
  codeHash: string;
  description?: string;
};

export type VefaasFunctionInfo = {
  functionId?: string;
  functionName?: string;
  runtime?: string;
  handler?: string;
  memoryMb?: number;
  requestTimeout?: number;
  environmentVariables?: Record<string, string>;
  description?: string;
  status?: string;
  createdTime?: string;
  lastModifiedTime?: string;
};

export const functionToVefaasConfig = (fn: FunctionDomain): VefaasFunctionConfig => {
  return {
    functionName: fn.name,
    runtime: fn.code!.runtime as VefaasRuntime,
    handler: fn.code!.handler,
    memoryMb: fn.memory ?? 512,
    requestTimeout: fn.timeout ?? 60,
    environmentVariables: fn.environment,
  };
};

export const extractVefaasDefinition = (
  config: VefaasFunctionConfig,
  codeHash: string,
): VefaasFunctionDefinition => {
  return {
    functionName: config.functionName,
    runtime: config.runtime,
    handler: config.handler,
    memorySize: config.memoryMb,
    timeout: config.requestTimeout,
    environment: config.environmentVariables || {},
    codeHash,
    description: config.description,
  };
};

import { FunctionDomain, ResourceAttributes } from '../../types';
import { mapRuntime, ProviderEnum } from '../../common';

export type ScfFunctionConfig = {
  FunctionName: string;
  Runtime: string;
  Handler: string;
  MemorySize: number;
  Timeout: number;
  Environment?: {
    Variables: Array<{ Key: string; Value: string }>;
  };
  Code?: {
    ZipFile?: string;
  };
};

export type ScfFunctionInfo = {
  FunctionName: string;
  Runtime: string;
  Handler: string;
  MemorySize: number;
  Timeout: number;
  Environment?: {
    Variables: Array<{ Key: string; Value: string }>;
  };
  ModTime?: string;
  CodeSha256?: string;
};

export const functionToScfConfig = (fn: FunctionDomain): ScfFunctionConfig => {
  const config: ScfFunctionConfig = {
    FunctionName: fn.name,
    Runtime: mapRuntime(fn.code!.runtime, ProviderEnum.TENCENT),
    Handler: fn.code!.handler,
    MemorySize: fn.memory ?? 128,
    Timeout: fn.timeout ?? 3,
  };

  if (fn.environment && Object.keys(fn.environment).length > 0) {
    config.Environment = {
      Variables: Object.entries(fn.environment).map(([key, value]) => ({
        Key: key,
        Value: value,
      })),
    };
  }

  return config;
};

/**
 * Extract definition attributes from an SCF function config for state storage.
 * This represents the IaC template definition for the function.
 * Following Terraform's approach of storing complete resource attributes.
 * All optional fields are included with null values if undefined.
 * @param config - The SCF function configuration
 * @param codeHash - Hash of the function code artifact for drift detection
 */
export const extractScfDefinition = (
  config: ScfFunctionConfig,
  codeHash: string,
): ResourceAttributes => {
  // Store environment as a map for easier comparison
  let envMap: Record<string, string> | null = null;
  if (config.Environment?.Variables) {
    envMap = {};
    for (const v of config.Environment.Variables) {
      envMap[v.Key] = v.Value;
    }
  }

  return {
    functionName: config.FunctionName,
    runtime: config.Runtime,
    handler: config.Handler,
    memorySize: config.MemorySize,
    timeout: config.Timeout,
    environment: envMap,
    codeHash,
  };
};

/**
 * Extract definition from FunctionDomain for comparison during planning.
 * This extracts the desired state from the user's configuration.
 * @param fn - The function domain from IaC template
 * @param codeHash - Hash of the function code artifact
 */
export const extractFunctionDomainDefinition = (
  fn: FunctionDomain,
  codeHash: string,
): ResourceAttributes => {
  const config = functionToScfConfig(fn);
  return extractScfDefinition(config, codeHash);
};

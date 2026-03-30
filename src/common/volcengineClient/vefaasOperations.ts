import { Service } from '@volcengine/openapi';
import type { VefaasFunctionConfig, VefaasFunctionInfo } from './types';

type VefaasSdkClient = Service;

const buildEnvVariables = (envs?: Record<string, string>) => {
  if (!envs) return undefined;
  return Object.entries(envs).map(([key, value]) => ({ key, value }));
};

const parseEnvVariables = (envs?: Array<{ key: string; value: string }>) => {
  if (!envs || envs.length === 0) return undefined;
  return envs.reduce(
    (acc, { key, value }) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
};

export const createVefaasOperations = (client: VefaasSdkClient) => ({
  createFunction: async (config: VefaasFunctionConfig, codeBase64: string): Promise<void> => {
    const params = {
      FunctionName: config.functionName,
      Runtime: config.runtime,
      Handler: config.handler,
      MemoryMb: config.memoryMb,
      RequestTimeout: config.requestTimeout,
      ...(config.description && { Description: config.description }),
      ...(config.environmentVariables && { Envs: buildEnvVariables(config.environmentVariables) }),
      SourceType: 'zip',
      Source: codeBase64,
    };

    await client.fetchOpenAPI({
      Action: 'CreateFunction',
      Version: '2024-06-06',
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: params,
    });
  },

  getFunction: async (functionName: string): Promise<VefaasFunctionInfo | null> => {
    try {
      const response = await client.fetchOpenAPI({
        Action: 'GetFunction',
        Version: '2024-06-06',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { FunctionName: functionName },
      });

      const data = (response.Result || {}) as Record<string, unknown>;

      return {
        functionId: data.FunctionId as string | undefined,
        functionName: data.FunctionName as string | undefined,
        runtime: data.Runtime as string | undefined,
        handler: data.Handler as string | undefined,
        memoryMb: data.MemoryMb as number | undefined,
        requestTimeout: data.RequestTimeout as number | undefined,
        description: data.Description as string | undefined,
        environmentVariables: parseEnvVariables(
          data.Envs as Array<{ key: string; value: string }> | undefined,
        ),
        status: data.Status as string | undefined,
        createdTime: data.CreationTime as string | undefined,
        lastModifiedTime: data.LastUpdateTime as string | undefined,
      };
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'ResourceNotFound' || error.code === 'FunctionNotFound') {
          return null;
        }
      }
      throw error;
    }
  },

  updateFunctionConfiguration: async (config: VefaasFunctionConfig): Promise<void> => {
    const params = {
      FunctionName: config.functionName,
      Handler: config.handler,
      Runtime: config.runtime,
      MemoryMb: config.memoryMb,
      RequestTimeout: config.requestTimeout,
      ...(config.description !== undefined && { Description: config.description }),
      ...(config.environmentVariables && { Envs: buildEnvVariables(config.environmentVariables) }),
    };

    await client.fetchOpenAPI({
      Action: 'UpdateFunction',
      Version: '2024-06-06',
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: params,
    });
  },

  updateFunctionCode: async (functionName: string, codeBase64: string): Promise<void> => {
    await client.fetchOpenAPI({
      Action: 'UpdateFunction',
      Version: '2024-06-06',
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: {
        FunctionName: functionName,
        SourceType: 'zip',
        Source: codeBase64,
      },
    });
  },

  deleteFunction: async (functionName: string): Promise<void> => {
    await client.fetchOpenAPI({
      Action: 'DeleteFunction',
      Version: '2024-06-06',
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: { FunctionName: functionName },
    });
  },

  listFunctions: async (): Promise<VefaasFunctionInfo[]> => {
    const response = await client.fetchOpenAPI({
      Action: 'ListFunctions',
      Version: '2024-06-06',
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: {},
    });

    const result = (response.Result || {}) as Record<string, unknown>;
    const functions = (result.Functions || []) as Array<Record<string, unknown>>;

    return functions.map((fn: Record<string, unknown>) => ({
      functionId: fn.FunctionId as string | undefined,
      functionName: fn.FunctionName as string | undefined,
      runtime: fn.Runtime as string | undefined,
      handler: fn.Handler as string | undefined,
      memoryMb: fn.MemoryMb as number | undefined,
      requestTimeout: fn.RequestTimeout as number | undefined,
      description: fn.Description as string | undefined,
      status: fn.Status as string | undefined,
      createdTime: fn.CreationTime as string | undefined,
      lastModifiedTime: fn.LastUpdateTime as string | undefined,
    }));
  },
});

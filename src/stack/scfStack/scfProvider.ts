import { Context } from '../../types';
import { ScfFunctionConfig, ScfFunctionInfo } from './scfTypes';
import { createTencentCloudClient } from '../../common/scfClient';
import fs from 'node:fs';

export const createScfFunction = async (
  context: Context,
  config: ScfFunctionConfig,
  codePath: string,
): Promise<void> => {
  const client = createTencentCloudClient(context);
  const codeBuffer = fs.readFileSync(codePath);
  const codeBase64 = codeBuffer.toString('base64');

  const params = {
    FunctionName: config.FunctionName,
    Code: {
      ZipFile: codeBase64,
    },
    Handler: config.Handler,
    Runtime: config.Runtime,
    MemorySize: config.MemorySize,
    Timeout: config.Timeout,
    ...(config.Environment && { Environment: config.Environment }),
  };

  await client.scf.CreateFunction(params);
};

export const getScfFunction = async (
  context: Context,
  functionName: string,
): Promise<ScfFunctionInfo | null> => {
  const client = createTencentCloudClient(context);
  try {
    const params = {
      FunctionName: functionName,
    };

    const response = await client.scf.GetFunction(params);

    if (!response || !response.FunctionName) {
      return null;
    }

    const environment = response.Environment?.Variables
      ? {
          Variables: response.Environment.Variables.map((v: { Key?: string; Value?: string }) => ({
            Key: v.Key || '',
            Value: v.Value || '',
          })),
        }
      : undefined;

    return {
      FunctionName: response.FunctionName || '',
      Runtime: response.Runtime || '',
      Handler: response.Handler || '',
      MemorySize: response.MemorySize || 128,
      Timeout: response.Timeout || 3,
      Environment: environment,
      ModTime: response.ModTime,
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'ResourceNotFound.FunctionName'
    ) {
      return null;
    }
    throw error;
  }
};

export const updateScfFunctionConfiguration = async (
  context: Context,
  config: ScfFunctionConfig,
): Promise<void> => {
  const client = createTencentCloudClient(context);
  const params = {
    FunctionName: config.FunctionName,
    Handler: config.Handler,
    Runtime: config.Runtime,
    MemorySize: config.MemorySize,
    Timeout: config.Timeout,
    ...(config.Environment && { Environment: config.Environment }),
  };

  await client.scf.UpdateFunctionConfiguration(params);
};

export const updateScfFunctionCode = async (
  context: Context,
  functionName: string,
  codePath: string,
): Promise<void> => {
  const client = createTencentCloudClient(context);
  const codeBuffer = fs.readFileSync(codePath);
  const codeBase64 = codeBuffer.toString('base64');

  const params = {
    FunctionName: functionName,
    ZipFile: codeBase64,
  };

  await client.scf.UpdateFunctionCode(params);
};

export const deleteScfFunction = async (context: Context, functionName: string): Promise<void> => {
  const client = createTencentCloudClient(context);
  const params = {
    FunctionName: functionName,
  };

  await client.scf.DeleteFunction(params);
};

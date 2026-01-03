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

    const triggers = response.Triggers?.map(
      (t: {
        ModTime?: string;
        Type?: string;
        TriggerDesc?: string;
        TriggerName?: string;
        AddTime?: string;
        Enable?: number;
        CustomArgument?: string;
        AvailableStatus?: string;
        ResourceId?: string;
        BindStatus?: string;
        TriggerAttribute?: string;
        Qualifier?: string;
        Description?: string;
      }) => ({
        ModTime: t.ModTime || '',
        Type: t.Type || '',
        TriggerDesc: t.TriggerDesc || '',
        TriggerName: t.TriggerName || '',
        AddTime: t.AddTime || '',
        Enable: t.Enable || 0,
        CustomArgument: t.CustomArgument,
        AvailableStatus: t.AvailableStatus,
        ResourceId: t.ResourceId,
        BindStatus: t.BindStatus,
        TriggerAttribute: t.TriggerAttribute,
        Qualifier: t.Qualifier,
        Description: t.Description,
      }),
    );

    const tags = response.Tags?.map((t: { Key?: string; Value?: string }) => ({
      Key: t.Key || '',
      Value: t.Value || '',
    }));

    return {
      FunctionName: response.FunctionName || '',
      Runtime: response.Runtime || '',
      Handler: response.Handler || '',
      MemorySize: response.MemorySize || 128,
      Timeout: response.Timeout || 3,
      Environment: environment,
      ModTime: response.ModTime,
      CodeSha256: undefined, // Not available in GetFunction response
      CodeInfo: response.CodeInfo,
      Description: response.Description,
      Triggers: triggers,
      CodeSize: response.CodeSize,
      FunctionVersion: response.FunctionVersion,
      VpcConfig: response.VpcConfig,
      UseGpu: response.UseGpu,
      CodeResult: response.CodeResult,
      CodeError: response.CodeError,
      ErrNo: response.ErrNo,
      Namespace: response.Namespace,
      Role: response.Role,
      InstallDependency: response.InstallDependency,
      Status: response.Status,
      StatusDesc: response.StatusDesc,
      ClsLogsetId: response.ClsLogsetId,
      ClsTopicId: response.ClsTopicId,
      FunctionId: response.FunctionId,
      Tags: tags,
      EipConfig: response.EipConfig,
      AccessInfo: response.AccessInfo,
      Type: response.Type,
      L5Enable: response.L5Enable,
      Layers: response.Layers,
      DeadLetterConfig: response.DeadLetterConfig,
      AddTime: response.AddTime,
      PublicNetConfig: response.PublicNetConfig,
      OnsEnable: response.OnsEnable,
      CfsConfig: response.CfsConfig,
      AvailableStatus: response.AvailableStatus,
      Qualifier: response.Qualifier,
      InitTimeout: response.InitTimeout,
      StatusReasons: response.StatusReasons,
      AsyncRunEnable: response.AsyncRunEnable,
      TraceEnable: response.TraceEnable,
      ImageConfig: response.ImageConfig,
      ProtocolType: response.ProtocolType,
      ProtocolParams: response.ProtocolParams,
      DnsCache: response.DnsCache,
      IntranetConfig: response.IntranetConfig,
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

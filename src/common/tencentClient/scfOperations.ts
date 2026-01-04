import * as tencentcloud from 'tencentcloud-sdk-nodejs-scf';
import { ScfFunctionConfig, ScfFunctionInfo } from './types';

const ScfClient = tencentcloud.scf.v20180416.Client;
type ScfSdkClient = InstanceType<typeof ScfClient>;

export // SCF operations
const createScfOperations = (scfClient: ScfSdkClient) => ({
  createFunction: async (config: ScfFunctionConfig, codeBase64: string): Promise<void> => {
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

    await scfClient.CreateFunction(params);
  },

  getFunction: async (functionName: string): Promise<ScfFunctionInfo | null> => {
    try {
      const params = {
        FunctionName: functionName,
      };

      const response = await scfClient.GetFunction(params);

      if (!response || !response.FunctionName) {
        return null;
      }

      const environment = response.Environment?.Variables
        ? {
            Variables: response.Environment.Variables.map(
              (v: { Key?: string; Value?: string }) => ({
                Key: v.Key || '',
                Value: v.Value || '',
              }),
            ),
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
        CodeSha256: undefined,
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
  },

  updateFunctionConfiguration: async (config: ScfFunctionConfig): Promise<void> => {
    const params = {
      FunctionName: config.FunctionName,
      Handler: config.Handler,
      Runtime: config.Runtime,
      MemorySize: config.MemorySize,
      Timeout: config.Timeout,
      ...(config.Environment && { Environment: config.Environment }),
    };

    await scfClient.UpdateFunctionConfiguration(params);
  },

  updateFunctionCode: async (functionName: string, codeBase64: string): Promise<void> => {
    const params = {
      FunctionName: functionName,
      ZipFile: codeBase64,
    };

    await scfClient.UpdateFunctionCode(params);
  },

  deleteFunction: async (functionName: string): Promise<void> => {
    const params = {
      FunctionName: functionName,
    };

    await scfClient.DeleteFunction(params);
  },
});

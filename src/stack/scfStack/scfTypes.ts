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

export type ScfTrigger = {
  ModTime: string;
  Type: string;
  TriggerDesc: string;
  TriggerName: string;
  AddTime: string;
  Enable: number;
  CustomArgument?: string;
  AvailableStatus?: string;
  ResourceId?: string;
  BindStatus?: string;
  TriggerAttribute?: string;
  Qualifier?: string;
  Description?: string;
};

export type ScfVpcConfig = {
  VpcId?: string;
  SubnetId?: string;
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
  CodeInfo?: string;
  Description?: string;
  Triggers?: ScfTrigger[];
  CodeSize?: number;
  FunctionVersion?: string;
  VpcConfig?: ScfVpcConfig;
  UseGpu?: string;
  CodeResult?: string;
  CodeError?: string;
  ErrNo?: number;
  Namespace?: string;
  Role?: string;
  InstallDependency?: string;
  Status?: string;
  StatusDesc?: string;
  ClsLogsetId?: string;
  ClsTopicId?: string;
  FunctionId?: string;
  Tags?: Array<{ Key: string; Value: string }>;
  EipConfig?: {
    EipFixed?: string;
    Eips?: string[];
  };
  AccessInfo?: {
    Host?: string;
    Vip?: string;
  };
  Type?: string;
  L5Enable?: string;
  Layers?: Array<{
    LayerName?: string;
    LayerVersion?: number;
    CompatibleRuntimes?: string[];
  }>;
  DeadLetterConfig?: {
    Type?: string;
    Name?: string;
    FilterType?: string;
  };
  AddTime?: string;
  PublicNetConfig?: {
    PublicNetStatus?: string;
    EipConfig?: {
      EipStatus?: string;
      EipAddress?: string[];
    };
  };
  OnsEnable?: string;
  CfsConfig?: {
    CfsInsList?: Array<{
      UserId?: string;
      UserGroupId?: string;
      CfsId?: string;
      MountInsId?: string;
      LocalMountDir?: string;
      RemoteMountDir?: string;
      IpAddress?: string;
      MountVpcId?: string;
      MountSubnetId?: string;
    }>;
  };
  AvailableStatus?: string;
  Qualifier?: string;
  InitTimeout?: number;
  StatusReasons?: Array<{
    ErrorCode?: string;
    ErrorMessage?: string;
  }>;
  AsyncRunEnable?: string;
  TraceEnable?: string;
  ImageConfig?: {
    ImageType?: string;
    ImageUri?: string;
  };
  ProtocolType?: string;
  ProtocolParams?: {
    WSParams?: {
      IdleTimeOut?: number;
    };
  };
  DnsCache?: string;
  IntranetConfig?: {
    IpFixed?: string;
  };
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

export const extractScfDefinition = (
  config: ScfFunctionConfig,
  codeHash: string,
): ResourceAttributes => {
  const envMap: Record<string, string> = {};
  if (config.Environment?.Variables) {
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

export const extractFunctionDomainDefinition = (
  fn: FunctionDomain,
  codeHash: string,
): ResourceAttributes => {
  const config = functionToScfConfig(fn);
  return extractScfDefinition(config, codeHash);
};

export enum TdsqlcClusterStatus {
  RUNNING = 'running',
  ISOLATED = 'isolated',
  OFFLINE = 'offline',
}

export type ScfFunctionConfig = {
  FunctionName: string;
  Handler: string;
  Runtime: string;
  MemorySize?: number;
  Timeout?: number;
  Environment?: {
    Variables?: Array<{
      Key: string;
      Value: string;
    }>;
  };
};

export type ScfFunctionInfo = {
  FunctionName: string;
  Runtime: string;
  Handler: string;
  MemorySize: number;
  Timeout: number;
  Environment?: {
    Variables?: Array<{
      Key: string;
      Value: string;
    }>;
  };
  ModTime?: string;
  CodeSha256?: string;
  CodeInfo?: unknown;
  Description?: string;
  Triggers?: Array<{
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
  }>;
  CodeSize?: number;
  FunctionVersion?: string;
  VpcConfig?: unknown;
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
  Tags?: Array<{
    Key: string;
    Value: string;
  }>;
  EipConfig?: unknown;
  AccessInfo?: unknown;
  Type?: string;
  L5Enable?: string;
  Layers?: unknown[];
  DeadLetterConfig?: unknown;
  AddTime?: string;
  PublicNetConfig?: unknown;
  OnsEnable?: string;
  CfsConfig?: unknown;
  AvailableStatus?: string;
  Qualifier?: string;
  InitTimeout?: number;
  StatusReasons?: unknown[];
  AsyncRunEnable?: string;
  TraceEnable?: string;
  ImageConfig?: unknown;
  ProtocolType?: string;
  ProtocolParams?: unknown;
  DnsCache?: string;
  IntranetConfig?: unknown;
};

export type CosBucketConfig = {
  Bucket: string;
  Region: string;
  ACL?: 'private' | 'public-read' | 'public-read-write';
  WebsiteConfiguration?: {
    IndexDocument: {
      Suffix: string;
    };
    ErrorDocument?: {
      Key: string;
    };
  };
};

export type CosBucketInfo = {
  Name: string;
  Location: string;
  ACL?: string;
  WebsiteConfiguration?: {
    IndexDocument?: {
      Suffix?: string;
    };
    ErrorDocument?: {
      Key?: string;
    };
  };
  AccessControlPolicy?: {
    owner?: {
      id?: string;
      displayName?: string;
    };
    grants?: Array<{
      grantee?: {
        type: string;
        uri?: string;
        id?: string;
        displayName?: string;
      };
      permission?: string;
    }>;
  };
  CorsConfiguration?: Array<{
    id?: string;
    allowedOrigins?: string[];
    allowedMethods?: string[];
    allowedHeaders?: string[];
    exposeHeaders?: string[];
    maxAgeSeconds?: number;
  }>;
  VersioningConfiguration?: {
    status?: string;
  };
  TaggingConfiguration?: {
    tags?: Array<{
      key?: string;
      value?: string;
    }>;
  };
};

export type TdsqlcClusterConfig = {
  ClusterName: string;
  DbType: string;
  DbVersion: string;
  DbMode: string;
  VpcId?: string;
  SubnetId?: string;
  ProjectId?: number;
  AdminPassword: string;
  Port?: number;
  MinCpu: number;
  MaxCpu: number;
  AutoPause?: boolean;
  AutoPauseDelay?: number;
  StoragePayMode?: number;
  MaxStorageSize?: number;
};

export type TdsqlcClusterInfo = {
  ClusterId: string;
  ClusterName: string;
  Region: string;
  Zone?: string;
  PhysicalZone?: string;
  DbType: string;
  DbVersion: string;
  DbMode?: string;
  Status: string;
  StatusDesc?: string;
  ServerlessStatus?: string;
  VpcId?: string;
  VpcName?: string;
  SubnetId?: string;
  SubnetName?: string;
  Charset?: string;
  Vip?: string;
  Vport?: number;
  WanDomain?: string;
  WanIP?: string;
  WanPort?: number;
  WanStatus?: string;
  MinCpu?: number;
  MaxCpu?: number;
  MinStorageSize?: number;
  MaxStorageSize?: number;
  StorageId?: string;
  Storage?: number;
  StorageLimit?: number;
  StoragePayMode?: number;
  AutoPause?: string;
  AutoPauseDelay?: number;
  CreateTime?: string;
  UpdateTime?: string;
  ProjectId?: number;
  PayMode?: number;
  PeriodEndTime?: string;
  AutoRenewFlag?: number;
  InstanceCount?: number;
  ProcessingTask?: string;
  SupportedFeatures?: string[];
  RollbackSupport?: string;
  NetworkType?: string;
  ResourcePackageId?: string;
  ResourcePackageType?: string;
  ResourcePackageState?: string;
  PhysicalRegion?: string;
  ProxyStatus?: string;
  RwGroupId?: string;
  MasterZone?: string;
  SlaveZones?: string[];
  BusinessType?: string;
  IsFreeze?: string;
  OrderSource?: string;
  Ability?: unknown;
  ResourceTags?: unknown[];
  CynosVersion?: string;
  CynosVersionStatus?: string;
  IsLatestVersion?: boolean;
};

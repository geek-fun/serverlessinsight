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
  Role?: string;
  Environment?: {
    Variables?: Array<{
      Key: string;
      Value: string;
    }>;
  };
  Tags?: Array<{ Key: string; Value: string }>;
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
  InstanceConcurrencyConfig?: {
    DynamicEnabled?: string;
    MaxConcurrency?: number;
    InstanceIsolationEnabled?: string;
    Type?: string;
    MixNodeConfig?: Array<{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }>;
    SessionConfig?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    };
  };
  DnsCache?: string;
  IntranetConfig?: {
    IpFixed?: string;
    IpAddress?: string[];
  };
};

export type CosBucketConfig = {
  Bucket: string;
  Region: string;
  ACL?: 'private' | 'public-read' | 'public-read-write';
  Tags?: Array<{ Key: string; Value: string }>;
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
  Tags?: Array<{ Key: string; Value: string }>;
  CreationDate?: string;
  LifecycleConfiguration?: {
    rules?: Array<{
      id?: string;
      status?: string;
      prefix?: string;
      expiration?: {
        days?: number;
        date?: string;
        expiredObjectDeleteMarker?: boolean;
      };
      transition?: {
        days?: number;
        date?: string;
        storageClass?: string;
      };
    }>;
  };
  LoggingConfiguration?: {
    targetBucket?: string;
    targetPrefix?: string;
  };
  ReplicationConfiguration?: {
    role?: string;
    rules?: Array<{
      id?: string;
      status?: string;
      prefix?: string;
      destination?: {
        bucket?: string;
        storageClass?: string;
      };
    }>;
  };
  SseConfiguration?: {
    sseAlgorithm?: string;
    sseKmsMasterKeyId?: string;
  };
  Policy?: unknown;
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
  // TDSQL-C tags use TagKey/TagValue (CreateClusters.ResourceTags.N), not SCF's {Key,Value}.
  ResourceTags?: Array<{ TagKey: string; TagValue: string }>;
};

export type TdsqlcClusterInfo = {
  ClusterId: string;
  ClusterName: string;
  Region: string;
  Uin?: string;
  AppId?: number;
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
  Tasks?: Array<{
    TaskId?: number;
    TaskType?: string;
    TaskStatus?: string;
    ObjectId?: string;
    ObjectType?: string;
  }>;
  NetAddrs?: Array<{
    Vip?: string;
    Vport?: number;
    WanDomain?: string;
    WanPort?: number;
    NetType?: string;
    UniqSubnetId?: string;
    UniqVpcId?: string;
  }>;
  HasSlaveZone?: string;
  ResourcePackages?: Array<{
    PackageId?: string;
    PackageType?: string;
    DeductionPriority?: number;
  }>;
  GdnId?: string;
  GdnRole?: string;
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
  Ability?: {
    IsSupportSlaveZone?: string;
    NonsupportSlaveZoneReason?: string;
    IsSupportRo?: string;
    NonsupportRoReason?: string;
  };
  ResourceTags?: Array<{ TagKey?: string; TagValue?: string }>;
  CynosVersion?: string;
  CynosVersionTag?: string;
  CynosVersionStatus?: string;
  IsLatestVersion?: boolean;
};

// Tencent SSL Certificate types
export type SslCertificateInfo = {
  certificateId: string;
  alias?: string;
  domain?: string;
  status?: number;
  certBeginTime?: string;
  certEndTime?: string;
};

export type SslDeployResult = {
  deployRecordId?: number;
  deployStatus?: number;
};

// Tencent ES Serverless types
export enum TencentEsSpaceStatus {
  CREATING = 0,
  NORMAL = 1,
  DELETING = 2,
  DELETED = 3,
}

export type TencentEsSpaceConfig = {
  SpaceName: string;
  VpcInfo?: Array<{
    VpcId: string;
    SubnetId: string;
  }>;
  Zone?: string;
  KibanaWhiteIpList?: string[];
  Tags?: Array<{ Key: string; Value: string }>;
};

export type TencentEsSpaceInfo = {
  SpaceId: string;
  SpaceName: string;
  Status: number;
  CreateTime?: string;
  IndexCount?: number;
  KibanaUrl?: string;
  KibanaPrivateUrl?: string;
  IndexAccessUrl?: string;
  KibanaPublicAcl?: {
    BlackIpList?: string[];
    WhiteIpList?: string[];
  };
  KibanaEmbedUrl?: string;
  DiDataList?: Array<{
    DiId?: string;
    CreateTime?: string;
    Status?: number;
    DiDataSourceCvm?: unknown;
    DiDataSourceTke?: unknown;
    DiDataSinkServerless?: unknown;
    DiDataSourceType?: string;
  }>;
  VpcInfo?: Array<{
    VpcId?: string;
    SubnetId?: string;
    VpcUid?: number;
    SubnetUid?: number;
    AvailableIpAddressCount?: number;
  }>;
  Region?: string;
  Zone?: string;
  EnableKibanaPublicAccess?: number;
  EnableKibanaPrivateAccess?: number;
  AppId?: number;
  KibanaLanguage?: string;
  ClusterType?: number;
  EnableMcpAccess?: number;
  McpAccess?: string;
  Tags?: Array<{ Key: string; Value: string }>;
};

// Tencent CAM (Cloud Access Management) types
export type CamRoleInfo = {
  roleName?: string;
  roleId?: string;
  roleArn?: string;
  description?: string;
  policyName?: string;
};

import { DatabaseDomain, ResourceAttributes } from '../../types';

export type TdsqlcClusterConfig = {
  ClusterName: string;
  DbType: 'MYSQL';
  DbVersion: string;
  DbMode: 'SERVERLESS';
  VpcId?: string;
  SubnetId?: string;
  Port?: number;
  ProjectId?: number;
  MinCpu: number;
  MaxCpu: number;
  MinStorageSize?: number;
  MaxStorageSize?: number;
  AutoPause?: boolean;
  AutoPauseDelay?: number;
  StoragePayMode?: number;
  AdminPassword: string;
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
  WanPort?: string;
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
  RollbackSupport?: number;
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
  ResourceTags?: Array<{
    TagKey?: string;
    TagValue?: string;
  }>;
  CynosVersion?: string;
  CynosVersionStatus?: string;
  IsLatestVersion?: string;
};

export const databaseToTdsqlcConfig = (database: DatabaseDomain): TdsqlcClusterConfig => {
  // Map version from enum to Tencent Cloud version format
  const versionMap: Record<string, string> = {
    'MYSQL_5.7': '5.7',
    'MYSQL_8.0': '8.0',
  };

  const dbVersion = versionMap[database.version] || '8.0';

  const config: TdsqlcClusterConfig = {
    ClusterName: database.name,
    DbType: 'MYSQL',
    DbVersion: dbVersion,
    DbMode: 'SERVERLESS',
    MinCpu: database.cu.min,
    MaxCpu: database.cu.max,
    AutoPause: database.cu.min === 0,
    AutoPauseDelay: 600, // Default 10 minutes
    StoragePayMode: 0, // Pay-per-use
    AdminPassword: database.security.basicAuth.password,
  };

  // Add VPC configuration if provided
  if (database.network.vpcId) {
    config.VpcId = database.network.vpcId;
  }

  if (database.network.subnetId) {
    config.SubnetId = database.network.subnetId;
  }

  // Add storage configuration if provided
  if (database.storage.min !== undefined) {
    config.MinStorageSize = database.storage.min;
  }

  if (database.storage.max !== undefined) {
    config.MaxStorageSize = database.storage.max;
  }

  return config;
};

export const extractTdsqlcDefinition = (config: TdsqlcClusterConfig): ResourceAttributes => {
  return {
    clusterName: config.ClusterName,
    dbType: config.DbType,
    dbVersion: config.DbVersion,
    dbMode: config.DbMode,
    minCpu: config.MinCpu,
    maxCpu: config.MaxCpu,
    autoPause: config.AutoPause ?? null,
    autoPauseDelay: config.AutoPauseDelay ?? null,
    storagePayMode: config.StoragePayMode ?? null,
    vpcId: config.VpcId ?? null,
    subnetId: config.SubnetId ?? null,
    port: config.Port ?? null,
    projectId: config.ProjectId ?? null,
    minStorageSize: config.MinStorageSize ?? null,
    maxStorageSize: config.MaxStorageSize ?? null,
  };
};

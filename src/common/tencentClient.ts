import * as tencentcloud from 'tencentcloud-sdk-nodejs-scf';
import * as cynosdb from 'tencentcloud-sdk-nodejs-cynosdb';
import COS from 'cos-nodejs-sdk-v5';
import type {
  HeadBucketResult,
  GetBucketAclResult,
  GetBucketCorsResult,
  GetBucketWebsiteResult,
  GetBucketVersioningResult,
  GetBucketTaggingResult,
} from 'cos-nodejs-sdk-v5';
import { Context } from '../types';
import { logger } from './logger';
import { lang } from '../lang';

const ScfClient = tencentcloud.scf.v20180416.Client;
const CynosdbClient = cynosdb.cynosdb.v20190107.Client;

// Internal SDK client types
type ScfSdkClient = InstanceType<typeof ScfClient>;
type CosSdkClient = COS;
type CynosdbSdkClient = InstanceType<typeof CynosdbClient>;

// SCF Operation Types
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

// COS Operation Types
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

// TDSQL-C Operation Types
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

// Functional client with operation functions
export type TencentClient = {
  scf: {
    createFunction: (config: ScfFunctionConfig, codeBase64: string) => Promise<void>;
    getFunction: (functionName: string) => Promise<ScfFunctionInfo | null>;
    updateFunctionConfiguration: (config: ScfFunctionConfig) => Promise<void>;
    updateFunctionCode: (functionName: string, codeBase64: string) => Promise<void>;
    deleteFunction: (functionName: string) => Promise<void>;
  };
  cos: {
    createBucket: (config: CosBucketConfig) => Promise<void>;
    getBucket: (bucketName: string, region: string) => Promise<CosBucketInfo | null>;
    updateBucketAcl: (
      bucketName: string,
      region: string,
      acl: 'private' | 'public-read' | 'public-read-write',
    ) => Promise<void>;
    updateBucketWebsite: (
      bucketName: string,
      region: string,
      websiteConfig: {
        IndexDocument: {
          Suffix: string;
        };
        ErrorDocument?: {
          Key: string;
        };
      },
    ) => Promise<void>;
    deleteBucket: (bucketName: string, region: string) => Promise<void>;
  };
  tdsqlc: {
    createCluster: (config: TdsqlcClusterConfig) => Promise<string>;
    getCluster: (clusterId: string) => Promise<TdsqlcClusterInfo | null>;
    updateCluster: (clusterId: string, config: TdsqlcClusterConfig) => Promise<void>;
    deleteCluster: (clusterId: string) => Promise<void>;
  };
};

// Initialize SDK clients (internal)
const initializeSdkClients = (context: Context) => {
  const scfClientConfig = {
    credential: {
      secretId: context.accessKeyId,
      secretKey: context.accessKeySecret,
    },
    region: context.region,
    profile: {
      httpProfile: {
        endpoint: 'scf.tencentcloudapi.com',
      },
    },
  };

  const scfClient = new ScfClient(scfClientConfig);

  const cosClient = new COS({
    SecretId: context.accessKeyId,
    SecretKey: context.accessKeySecret,
  });

  const cynosdbClientConfig = {
    credential: {
      secretId: context.accessKeyId,
      secretKey: context.accessKeySecret,
    },
    region: context.region,
    profile: {
      httpProfile: {
        endpoint: 'cynosdb.tencentcloudapi.com',
      },
    },
  };

  const cynosdbClient = new CynosdbClient(cynosdbClientConfig);

  return {
    scf: scfClient,
    cos: cosClient,
    cynosdb: cynosdbClient,
  };
};

// SCF operations
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

// COS operations
const createCosOperations = (cosClient: CosSdkClient) => ({
  createBucket: async (config: CosBucketConfig): Promise<void> => {
    // Create bucket
    await new Promise<void>((resolve, reject) => {
      cosClient.putBucket(
        {
          Bucket: config.Bucket,
          Region: config.Region,
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });

    // Set ACL if specified
    if (config.ACL) {
      await new Promise<void>((resolve, reject) => {
        cosClient.putBucketAcl(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            ACL: config.ACL,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          },
        );
      });
    }

    // Set website configuration if specified
    if (config.WebsiteConfiguration) {
      const websiteConfig = config.WebsiteConfiguration;
      await new Promise<void>((resolve, reject) => {
        cosClient.putBucketWebsite(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            WebsiteConfiguration: websiteConfig,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          },
        );
      });
    }
  },

  getBucket: async (bucketName: string, region: string): Promise<CosBucketInfo | null> => {
    try {
      // Check if bucket exists
      await new Promise<HeadBucketResult>((resolve, reject) => {
        cosClient.headBucket(
          {
            Bucket: bucketName,
            Region: region,
          },
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          },
        );
      });

      // Get ACL
      let acl: string | undefined;
      let accessControlPolicy: CosBucketInfo['AccessControlPolicy'];
      try {
        const aclResult = await new Promise<GetBucketAclResult>((resolve, reject) => {
          cosClient.getBucketAcl(
            {
              Bucket: bucketName,
              Region: region,
            },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            },
          );
        });
        acl = aclResult.ACL;
        accessControlPolicy = {
          owner: aclResult.Owner
            ? {
                id: aclResult.Owner.ID,
                displayName: undefined,
              }
            : undefined,
          grants: aclResult.Grants?.map((g) => ({
            grantee: g.Grantee
              ? {
                  type: 'ID' in g.Grantee ? 'CanonicalUser' : 'Group',
                  uri: 'URI' in g.Grantee ? g.Grantee.URI : undefined,
                  id: 'ID' in g.Grantee ? g.Grantee.ID : undefined,
                  displayName: undefined,
                }
              : undefined,
            permission: g.Permission,
          })),
        };
      } catch {
        // ACL might not be accessible due to insufficient permissions
      }

      // Get CORS configuration
      let corsConfiguration: CosBucketInfo['CorsConfiguration'];
      try {
        const corsResult = await new Promise<GetBucketCorsResult>((resolve, reject) => {
          cosClient.getBucketCors(
            {
              Bucket: bucketName,
              Region: region,
            },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            },
          );
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        corsConfiguration = corsResult.CORSRules?.map((r: any) => ({
          id: r.ID,
          allowedOrigins: r.AllowedOrigin,
          allowedMethods: r.AllowedMethod,
          allowedHeaders: r.AllowedHeader,
          exposeHeaders: r.ExposeHeader,
          maxAgeSeconds: r.MaxAgeSeconds,
        }));
      } catch {
        // CORS might not be configured
      }

      // Get website configuration
      let websiteConfig: CosBucketInfo['WebsiteConfiguration'];
      try {
        const websiteResult = await new Promise<GetBucketWebsiteResult>((resolve, reject) => {
          cosClient.getBucketWebsite(
            {
              Bucket: bucketName,
              Region: region,
            },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            },
          );
        });

        if (
          websiteResult.WebsiteConfiguration?.IndexDocument ||
          websiteResult.WebsiteConfiguration?.ErrorDocument
        ) {
          websiteConfig = {
            IndexDocument: websiteResult.WebsiteConfiguration.IndexDocument,
            ErrorDocument: websiteResult.WebsiteConfiguration.ErrorDocument,
          };
        }
      } catch {
        // Website configuration might not be set
      }

      // Get versioning configuration
      let versioningConfig: CosBucketInfo['VersioningConfiguration'];
      try {
        const versioningResult = await new Promise<GetBucketVersioningResult>((resolve, reject) => {
          cosClient.getBucketVersioning(
            {
              Bucket: bucketName,
              Region: region,
            },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            },
          );
        });
        versioningConfig = {
          status: versioningResult.VersioningConfiguration?.Status,
        };
      } catch {
        // Versioning might not be accessible
      }

      // Get tagging configuration
      let taggingConfig: CosBucketInfo['TaggingConfiguration'];
      try {
        const taggingResult = await new Promise<GetBucketTaggingResult>((resolve, reject) => {
          cosClient.getBucketTagging(
            {
              Bucket: bucketName,
              Region: region,
            },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            },
          );
        });
        taggingConfig = {
          tags: taggingResult.Tags?.map((t) => ({
            key: t.Key,
            value: t.Value,
          })),
        };
      } catch {
        // Tagging might not be configured
      }

      return {
        Name: bucketName,
        Location: region,
        ACL: acl,
        WebsiteConfiguration: websiteConfig,
        AccessControlPolicy: accessControlPolicy,
        CorsConfiguration: corsConfiguration,
        VersioningConfiguration: versioningConfig,
        TaggingConfiguration: taggingConfig,
      };
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'statusCode' in error) {
        const statusCode = (error as { statusCode: number }).statusCode;
        if (statusCode === 404) {
          return null;
        }
      }
      throw error;
    }
  },

  updateBucketAcl: async (
    bucketName: string,
    region: string,
    acl: 'private' | 'public-read' | 'public-read-write',
  ): Promise<void> => {
    await new Promise<void>((resolve, reject) => {
      cosClient.putBucketAcl(
        {
          Bucket: bucketName,
          Region: region,
          ACL: acl,
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  },

  updateBucketWebsite: async (
    bucketName: string,
    region: string,
    websiteConfig: {
      IndexDocument: {
        Suffix: string;
      };
      ErrorDocument?: {
        Key: string;
      };
    },
  ): Promise<void> => {
    await new Promise<void>((resolve, reject) => {
      cosClient.putBucketWebsite(
        {
          Bucket: bucketName,
          Region: region,
          WebsiteConfiguration: websiteConfig,
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  },

  deleteBucket: async (bucketName: string, region: string): Promise<void> => {
    await new Promise<void>((resolve, reject) => {
      cosClient.deleteBucket(
        {
          Bucket: bucketName,
          Region: region,
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  },
});

// TDSQL-C helper functions
const waitForClusterReady = async (
  getCluster: (clusterId: string) => Promise<TdsqlcClusterInfo | null>,
  clusterId: string,
): Promise<void> => {
  const maxAttempts = 60;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const cluster = await getCluster(clusterId);

    if (!cluster) {
      throw new Error(lang.__('TDSQL_CLUSTER_NOT_FOUND', { clusterId }));
    }

    if (cluster.Status === 'running') {
      logger.info(lang.__('TDSQL_CLUSTER_READY', { clusterId }));
      return;
    }

    if (cluster.Status === 'isolated' || cluster.Status === 'offline') {
      throw new Error(lang.__('TDSQL_CLUSTER_ERROR_STATE', { status: cluster.Status }));
    }

    logger.info(lang.__('TDSQL_CLUSTER_WAITING', { clusterId, status: cluster.Status }));
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(lang.__('TDSQL_CLUSTER_TIMEOUT_READY', { clusterId }));
};

const waitForClusterDeleted = async (
  getCluster: (clusterId: string) => Promise<TdsqlcClusterInfo | null>,
  clusterId: string,
): Promise<void> => {
  const maxAttempts = 60;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const cluster = await getCluster(clusterId);

    if (!cluster) {
      logger.info(lang.__('TDSQL_CLUSTER_DELETED', { clusterId }));
      return;
    }

    if (cluster.Status === 'isolated' || cluster.Status === 'offline') {
      logger.info(lang.__('TDSQL_CLUSTER_BEING_DELETED', { clusterId }));
      await new Promise((resolve) => setTimeout(resolve, 10000));
      attempts++;
      continue;
    }

    logger.info(lang.__('TDSQL_CLUSTER_WAITING_DELETE', { clusterId, status: cluster.Status }));
    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  throw new Error(lang.__('TDSQL_CLUSTER_TIMEOUT_DELETE', { clusterId }));
};

// TDSQL-C operations
const createTdsqlcOperations = (cynosdbClient: CynosdbSdkClient, context: Context) => {
  const operations = {
    createCluster: async (config: TdsqlcClusterConfig): Promise<string> => {
      const params = {
        Zone: `${context.region}-1`,
        VpcId: config.VpcId || '',
        SubnetId: config.SubnetId || '',
        DbType: config.DbType,
        DbVersion: config.DbVersion,
        DbMode: config.DbMode,
        ProjectId: config.ProjectId || 0,
        ClusterName: config.ClusterName,
        AdminPassword: config.AdminPassword,
        Port: config.Port || 3306,
        PayMode: 0,
        MinCpu: config.MinCpu,
        MaxCpu: config.MaxCpu,
        AutoPause: config.AutoPause ? 'yes' : 'no',
        AutoPauseDelay: config.AutoPauseDelay,
        StoragePayMode: config.StoragePayMode,
        StorageLimit: config.MaxStorageSize,
      };

      try {
        const response = await cynosdbClient.CreateClusters(params);
        logger.info(lang.__('TDSQL_CLUSTER_CREATION_INITIATED'));

        if (!response.ClusterIds || response.ClusterIds.length === 0) {
          throw new Error(lang.__('TDSQL_CLUSTER_NO_ID_RETURNED'));
        }

        const clusterId = response.ClusterIds[0];

        // Wait for cluster to be ready
        await waitForClusterReady(operations.getCluster, clusterId);

        return clusterId;
      } catch (error) {
        logger.error(`${lang.__('TDSQL_CLUSTER_CREATION_FAILED')}: ${error}`);
        throw error;
      }
    },

    getCluster: async (clusterId: string): Promise<TdsqlcClusterInfo | null> => {
      const params = {
        Filters: [
          {
            Names: ['ClusterId'],
            Values: [clusterId],
            ExactMatch: true,
          },
        ],
      };

      try {
        const response = await cynosdbClient.DescribeClusters(params);

        if (!response.ClusterSet || response.ClusterSet.length === 0) {
          return null;
        }

        const cluster = response.ClusterSet[0];

        return {
          ClusterId: cluster.ClusterId || '',
          ClusterName: cluster.ClusterName || '',
          Region: cluster.Region || context.region,
          Zone: cluster.Zone,
          PhysicalZone: cluster.PhysicalZone,
          DbType: cluster.DbType || '',
          DbVersion: cluster.DbVersion || '',
          DbMode: cluster.DbMode,
          Status: cluster.Status || '',
          StatusDesc: cluster.StatusDesc,
          ServerlessStatus: cluster.ServerlessStatus,
          VpcId: cluster.VpcId,
          VpcName: undefined,
          SubnetId: cluster.SubnetId,
          SubnetName: undefined,
          Charset: undefined,
          Vip: cluster.Vip,
          Vport: cluster.Vport,
          WanDomain: undefined,
          WanIP: undefined,
          WanPort: undefined,
          WanStatus: undefined,
          MinCpu: undefined,
          MaxCpu: undefined,
          MinStorageSize: cluster.MinStorageSize,
          MaxStorageSize: cluster.MaxStorageSize,
          StorageId: cluster.StorageId,
          Storage: cluster.Storage,
          StorageLimit: cluster.StorageLimit,
          StoragePayMode: cluster.StoragePayMode,
          AutoPause: cluster.ServerlessStatus,
          AutoPauseDelay: undefined,
          CreateTime: cluster.CreateTime,
          UpdateTime: cluster.UpdateTime,
          ProjectId: cluster.ProjectID,
          PayMode: cluster.PayMode,
          PeriodEndTime: cluster.PeriodEndTime,
          AutoRenewFlag: cluster.RenewFlag,
          InstanceCount: cluster.InstanceNum,
          ProcessingTask: cluster.ProcessingTask,
          SupportedFeatures: undefined,
          RollbackSupport: undefined,
          NetworkType: undefined,
          ResourcePackageId: undefined,
          ResourcePackageType: undefined,
          ResourcePackageState: undefined,
          PhysicalRegion: undefined,
          ProxyStatus: undefined,
          RwGroupId: undefined,
          MasterZone: cluster.MasterZone,
          SlaveZones: cluster.SlaveZones,
          BusinessType: cluster.BusinessType,
          IsFreeze: cluster.IsFreeze,
          OrderSource: cluster.OrderSource,
          Ability: cluster.Ability,
          ResourceTags: cluster.ResourceTags,
          CynosVersion: cluster.CynosVersion,
          CynosVersionStatus: undefined,
          IsLatestVersion: undefined,
        };
      } catch (error) {
        logger.error(`${lang.__('TDSQL_CLUSTER_GET_FAILED')}: ${error}`);
        return null;
      }
    },

    updateCluster: async (clusterId: string, config: TdsqlcClusterConfig): Promise<void> => {
      const params = {
        ClusterId: clusterId,
        MinCpu: config.MinCpu,
        MaxCpu: config.MaxCpu,
        AutoPause: config.AutoPause ? 'yes' : 'no',
        AutoPauseDelay: config.AutoPauseDelay,
      };

      try {
        await cynosdbClient.ModifyServerlessStrategy(params);
        logger.info(lang.__('TDSQL_CLUSTER_UPDATED', { clusterId }));

        // Wait for update to complete
        await waitForClusterReady(operations.getCluster, clusterId);
      } catch (error) {
        logger.error(`${lang.__('TDSQL_CLUSTER_UPDATE_FAILED')}: ${error}`);
        throw error;
      }
    },

    deleteCluster: async (clusterId: string): Promise<void> => {
      const params = {
        ClusterId: clusterId,
      };

      try {
        await cynosdbClient.OfflineCluster(params);
        logger.info(lang.__('TDSQL_CLUSTER_DELETION_INITIATED', { clusterId }));

        // Wait for cluster to be deleted
        await waitForClusterDeleted(operations.getCluster, clusterId);
      } catch (error) {
        logger.error(`${lang.__('TDSQL_CLUSTER_DELETE_FAILED')}: ${error}`);
        throw error;
      }
    },
  };

  return operations;
};

export const createTencentClient = (context: Context): TencentClient => {
  const sdkClients = initializeSdkClients(context);

  return {
    scf: createScfOperations(sdkClients.scf),
    cos: createCosOperations(sdkClients.cos),
    tdsqlc: createTdsqlcOperations(sdkClients.cynosdb, context),
  };
};

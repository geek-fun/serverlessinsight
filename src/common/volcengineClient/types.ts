import type { Context } from '../../types';
import type { IamStatement } from '../iamStatements';

/**
 * Volcengine provider type definitions
 * Based on Volcengine API documentation: https://www.volcengine.com/docs
 */

// ============================================================================
// veFaaS (Function Service) Types
// ============================================================================

/**
 * Supported runtimes for veFaaS
 * @see https://www.volcengine.com/docs/6662/107380
 * Note: Python 3.8 runtime has been deprecated
 */
export type VefaasRuntime =
  | 'golang/v1'
  | 'native/v1'
  | 'nativejava8/v1'
  | 'node14/v1'
  | 'node20/v1'
  | 'nodeprime14/v1'
  | 'python3.12/v1'
  | 'python3.8/v1'
  | 'python3.9/v1';

/**
 * Configuration for creating/updating a veFaaS function
 */
export type VefaasFunctionConfig = {
  functionName: string;
  runtime: VefaasRuntime;
  handler: string;
  memoryMb: number;
  requestTimeout: number;
  description?: string;
  environmentVariables?: Record<string, string>;
  role?: string;
  vpcConfig?: {
    vpcId: string;
    subnetIds: string[];
    securityGroupIds: string[];
  };
  tosMountConfig?: {
    bucketName: string;
    mountPath: string;
  };
  logConfig?: {
    project: string;
    topic: string;
  };
  Tags?: Array<{ Key: string; Value: string }>;
};

/**
 * veFaaS VpcConfig as returned by GetFunction — includes the enable toggles
 * that the create/update request shape omits.
 * @see https://www.volcengine.com/docs/6662/1262130
 */
export type VefaasVpcConfigInfo = {
  vpcId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  enableVpc?: boolean;
  enableSharedInternetAccess?: boolean;
};

/**
 * veFaaS TLS (log) config as returned by GetFunction — toggles included.
 */
export type VefaasLogConfigInfo = {
  project?: string;
  topic?: string;
  enableLog?: boolean;
};

/**
 * veFaaS NAS storage config as returned by GetFunction.
 */
export type VefaasNasStorageInfo = {
  enableNas?: boolean;
  nasConfigs?: Array<{
    gid?: number;
    uid?: number;
    remotePath?: string;
    fileSystemId?: string;
    mountPointId?: string;
    localMountPath?: string;
  }>;
};

/**
 * veFaaS TOS mount config as returned by GetFunction.
 */
export type VefaasTosMountInfo = {
  enableTos?: boolean;
  mountPoints?: Array<{
    endpoint?: string;
    readOnly?: boolean;
    bucketName?: string;
    bucketPath?: string;
    localMountPath?: string;
  }>;
};

/**
 * veFaaS async task config as returned by GetFunction.
 */
export type VefaasAsyncTaskInfo = {
  enableAsyncTask?: boolean;
  maxRetry?: number;
  destinationConfig?: {
    onSuccess?: { destination?: string };
    onFailure?: { destination?: string };
  };
};

/**
 * Response from veFaaS getFunction API — retains the FULL set of fields the
 * provider returns (including runtime toggles like CpuStrategy, ExclusiveMode,
 * MaxConcurrency, APMplus, network/storage/log switches, async tasks and tags)
 * so state keeps maximum resource detail.
 * @see https://www.volcengine.com/docs/6662/1262130
 */
export type VefaasFunctionInfo = {
  functionId?: string;
  functionName?: string;
  runtime?: string;
  handler?: string;
  memoryMb?: number;
  requestTimeout?: number;
  description?: string;
  environmentVariables?: Record<string, string>;
  status?: string;
  createdTime?: string;
  lastModifiedTime?: string;
  role?: string;
  vpcConfig?: VefaasVpcConfigInfo;
  logConfig?: VefaasLogConfigInfo;
  Tags?: Array<{ Key?: string; Value?: string }>;
  // --- Maximum-detail fields (retained verbatim from GetFunction) ---
  exclusiveMode?: boolean;
  maxConcurrency?: number;
  codeSize?: number;
  codeSizeLimit?: number;
  sourceLocation?: string;
  sourceType?: string;
  owner?: string;
  triggersCount?: number;
  instanceType?: string;
  initializerSec?: number;
  command?: string;
  port?: number;
  cpuStrategy?: string;
  projectName?: string;
  functionType?: string;
  cell?: string;
  enableApmplus?: boolean;
  nasStorage?: VefaasNasStorageInfo;
  tosMountConfig?: VefaasTosMountInfo;
  asyncTaskConfig?: VefaasAsyncTaskInfo;
};

// ============================================================================
// TOS (Object Storage) Types
// ============================================================================

/**
 * TOS bucket ACL options
 * @see https://www.volcengine.com/docs/6516/74857
 */
export type TosAcl = 'private' | 'public-read' | 'public-read-write';

/**
 * TOS storage class options
 * @see https://www.volcengine.com/docs/6516/74858
 */
export type TosStorageClass = 'STANDARD' | 'IA' | 'ARCHIVE';

/**
 * TOS bucket website configuration
 */
export type TosWebsiteConfig = {
  indexDocument: string;
  errorDocument?: string;
};

/**
 * Configuration for creating a TOS bucket
 */
export type TosBucketConfig = {
  bucketName: string;
  acl?: TosAcl;
  storageClass?: TosStorageClass;
  websiteConfig?: TosWebsiteConfig;
  websiteCodeHash?: string;
  domain?: string;
  Tags?: Array<{ Key: string; Value: string }>;
};

/**
 * Response from TOS headBucket API
 */
export type TosBucketInfo = {
  name: string;
  location?: string;
  creationDate?: string;
  storageClass?: TosStorageClass;
  extranetEndpoint?: string;
  intranetEndpoint?: string;
  acl?: TosAcl;
  websiteConfig?: TosWebsiteConfig;
  Tags?: Array<{ Key: string; Value: string }>;
  // --- Maximum-detail fields (retained verbatim from GetBucketInfo) ---
  owner?: {
    id?: string;
    displayName?: string;
  };
  projectName?: string;
  type?: string;
  azRedundancy?: string;
  extranetS3Endpoint?: string;
  intranetS3Endpoint?: string;
  versioning?: string;
  crossRegionReplication?: string;
  transferAcceleration?: string;
  accessMonitor?: string;
  serverSideEncryptionConfiguration?: {
    rule?: Array<{
      applyServerSideEncryptionByDefault?: {
        sseAlgorithm?: string;
        kmsMasterKeyId?: string;
      };
    }>;
  };
};

/**
 * TOS object metadata
 */
export type TosObjectInfo = {
  key: string;
  size?: number;
  lastModified?: string;
  etag?: string;
};

// ============================================================================
// IAM (Identity and Access Management) Types
// ============================================================================

/**
 * Trust policy statement for IAM roles
 */
export type IamTrustPolicyStatement = {
  Effect: 'Allow' | 'Deny';
  Action: string[];
  Principal: {
    Service: string[];
  };
};

/**
 * Configuration for creating an IAM role
 */
export type IamRoleConfig = {
  roleName: string;
  displayName: string;
  description?: string;
  trustPolicy: {
    Statement: IamTrustPolicyStatement[];
  };
  maxSessionDuration?: number;
  customStatements?: IamStatement[];
  managedPolicies?: string[];
};

/**
 * Response from IAM getRole API
 */
export type IamRoleInfo = {
  roleName?: string;
  roleId?: string;
  trn?: string;
  createdTime?: string;
  description?: string;
  maxSessionDuration?: number;
  trustPolicyDocument?: string;
  policyName?: string;
  managedPolicies?: string[];
};

// ============================================================================
// TLS (Log Service) Types
// ============================================================================

/**
 * Configuration for creating a TLS project
 */
export type TlsProjectConfig = {
  projectName: string;
  description?: string;
  region?: string;
};

/**
 * Response from TLS getProject API
 */
export type TlsProjectInfo = {
  projectId?: string;
  projectName?: string;
  description?: string;
  region?: string;
  createTime?: string;
  status?: string;
  /**
   * True when this run's CreateProject created the project; false (or absent)
   * when an already-existing project was returned (AlreadyExists race). Lets
   * callers distinguish a fresh create from an adoption of a pre-existing one.
   */
  created?: boolean;
};

/**
 * Configuration for creating a TLS topic
 */
export type TlsTopicConfig = {
  projectName: string;
  topicName: string;
  description?: string;
  ttl?: number;
};

/**
 * Response from TLS getTopic API
 */
export type TlsTopicInfo = {
  topicId?: string;
  topicName?: string;
  projectName?: string;
  description?: string;
  ttl?: number;
  createTime?: string;
  status?: string;
  tags?: Array<{ Key?: string; Value?: string }>;
};

/**
 * Configuration for creating a TLS index
 */
export type TlsIndexConfig = {
  projectName: string;
  topicName: string;
  fullTextIndex?: {
    delimiter?: string;
    caseSensitive?: boolean;
  };
  keyValueIndex?: Array<{
    key: string;
    value: string;
    type: string;
  }>;
};

/**
 * Configuration for adding ownership tags to TLS resources
 */
export type TlsTagConfig = {
  resourceType: 'project' | 'topic';
  resourcesList: string[];
  tags: Array<{ key: string; value: string }>;
};

/**
 * Configuration for removing ownership tags from TLS resources
 */
export type TlsRemoveTagsConfig = {
  resourceType: 'project' | 'topic';
  resourcesList: string[];
  tagKeys: string[];
};

// ============================================================================
// API Gateway Types
// ============================================================================

export type ApigwHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

/**
 * API 网关实例 (cloud-native: instance → service → upstream → route).
 * A serverless-type gateway (Type: 'serverless') has no managed-instance fee and
 * bills per API call (first 1M calls/month free). One per account per region.
 */
export type ApigwGatewayConfig = {
  gatewayName: string;
  type?: 'standard' | 'serverless';
  network?: {
    vpcId: string;
    subnetIds: string[]; // >= 2 subnets in different AZs
  };
  description?: string;
  logConfig?: {
    enable: boolean;
    projectId: string;
    topicId: string;
  };
  Tags?: Array<{ Key: string; Value: string }>;
};

export type ApigwGatewayInfo = {
  gatewayId?: string;
  gatewayName?: string;
  type?: string;
  status?: string;
  createdTime?: string;
  description?: string;
  message?: string;
  tags?: Array<{ Key: string; Value: string }>;
  // --- Maximum-detail fields (retained verbatim from ListGateways) ---
  region?: string;
  version?: string;
  projectName?: string;
  networkSpec?: {
    vpcId?: string;
    subnetIds?: string[];
  };
  backendSpec?: {
    isVkeWithFlannelCniSupported?: boolean;
    vkePodCidr?: string;
  };
  monitorSpec?: {
    enable?: boolean;
    workspaceId?: string;
  };
  logSpec?: {
    enable?: boolean;
    projectId?: string;
    topicId?: string;
  };
  resourceSpec?: {
    replicas?: number;
    instanceSpecCode?: string;
    clbSpecCode?: string;
    publicNetworkBillingType?: string;
    publicNetworkBandwidth?: number;
    networkType?: {
      enablePublicNetwork?: boolean;
      enablePrivateNetwork?: boolean;
    };
  };
};

export type ApigwServiceConfig = {
  gatewayId: string;
  serviceName: string;
  protocol?: string[]; // e.g. ['HTTP']
  description?: string;
};

export type ApigwServiceInfo = {
  serviceId?: string;
  serviceName?: string;
  gatewayId?: string;
  status?: string;
  protocol?: string[];
  createdTime?: string;
  // --- Maximum-detail fields (retained verbatim from ListGatewayServices / GetGatewayService) ---
  gatewayName?: string;
  message?: string;
  comments?: string;
  authSpec?: {
    enable?: boolean;
  };
  domains?: Array<{
    domain?: string;
    type?: string;
  }>;
  customDomains?: Array<{
    id?: string;
    domain?: string;
  }>;
};

export type ApigwUpstreamConfig = {
  gatewayId: string;
  upstreamName: string;
  sourceType: 'VeFaas';
  functionId: string; // veFaaS function Id
  protocol?: string;
};

export type ApigwUpstreamInfo = {
  upstreamId?: string;
  upstreamName?: string;
  gatewayId?: string;
  status?: string;
  sourceType?: string;
  protocol?: string;
  functionId?: string;
  createdTime?: string;
  // --- Maximum-detail fields (retained verbatim from ListUpstreams) ---
  comments?: string;
  resourceType?: string;
  updateTime?: string;
  backendTargetList?: Array<{
    ip?: string;
    port?: number;
    healthStatus?: string;
  }>;
};

export type ApigwRouteConfig = {
  serviceId: string;
  routeName: string;
  method: ApigwHttpMethod;
  path: string;
  upstreamId: string;
};

export type ApigwRouteInfo = {
  routeId?: string;
  routeName?: string;
  serviceId?: string;
  method?: string;
  path?: string;
  upstreamIds?: string[];
  // --- Maximum-detail fields (retained verbatim from GetRoute / ListRoutes) ---
  status?: string;
  enable?: boolean;
  priority?: number;
  matchRule?: {
    method?: string[];
    path?: {
      matchType?: string;
      matchContent?: string;
    };
  };
  upstreamList?: Array<{
    upstreamId?: string;
    version?: string;
    weight?: number;
  }>;
};

export type ApigwDomainConfig = {
  serviceId: string;
  domainName: string;
  certificateId?: string;
};

export type ApigwTriggerConfig = {
  method: ApigwHttpMethod;
  path: string;
  backendFunctionName: string;
};

export type ApigwConfig = {
  gatewayName: string;
  protocol?: 'HTTP' | 'HTTPS' | 'HTTP&HTTPS';
  description?: string;
  network?: {
    vpcId: string;
    subnetIds: string[];
  };
  triggers: ApigwTriggerConfig[];
  domain?: {
    domainName: string;
    certificateId?: string;
  };
};

export type ApigwInfo = {
  gatewayId?: string;
  gatewayName?: string;
  protocol?: string;
  status?: string;
  createdTime?: string;
  endpoints?: Array<{
    method: string;
    path: string;
    backendType: string;
    backendId: string;
  }>;
};

// ============================================================================
// Volcengine Client Types
// ============================================================================

/**
 * Volcengine client operations interface
 * This defines the operations available through createVolcengineClient()
 */
export type VolcengineClient = {
  vefaas: {
    createFunction: (
      config: VefaasFunctionConfig,
      codeBase64: string,
    ) => Promise<{ functionId: string; releaseRecordId?: string }>;
    getFunction: (functionName: string) => Promise<VefaasFunctionInfo | null>;
    getFunctionById: (functionId: string) => Promise<VefaasFunctionInfo | null>;
    updateFunctionConfiguration: (
      functionId: string,
      config: VefaasFunctionConfig,
    ) => Promise<string | undefined>;
    updateFunctionCode: (
      functionId: string,
      codeBase64: string,
    ) => Promise<{ releaseRecordId?: string }>;
    deleteFunction: (functionId: string) => Promise<void>;
    listFunctions: () => Promise<VefaasFunctionInfo[]>;
  };
  tos: {
    createBucket: (config: TosBucketConfig) => Promise<TosBucketInfo>;
    getBucket: (bucketName: string) => Promise<TosBucketInfo | null>;
    deleteBucket: (bucketName: string) => Promise<void>;
    updateBucketAcl: (bucketName: string, acl: TosAcl) => Promise<void>;
    updateBucketWebsite: (bucketName: string, config: TosWebsiteConfig) => Promise<void>;
    putObject: (bucket: string, key: string, body: Buffer) => Promise<void>;
    listObjects: (bucket: string, prefix?: string) => Promise<TosObjectInfo[]>;
    deleteObjects: (bucket: string, keys: string[]) => Promise<void>;
    uploadFiles: (bucketName: string, sourcePath: string) => Promise<void>;
    putBucketPolicy: (bucketName: string, policy: Record<string, unknown>) => Promise<void>;
    getBucketPolicy: (bucketName: string) => Promise<Record<string, unknown> | null>;
    deleteBucketPolicy: (bucketName: string) => Promise<void>;
  };
  iam: {
    createRole: (config: IamRoleConfig) => Promise<IamRoleInfo>;
    getRole: (roleName: string) => Promise<IamRoleInfo | null>;
    updateRoleTrustPolicy: (
      roleName: string,
      policy: IamRoleConfig['trustPolicy'],
    ) => Promise<void>;
    deleteRole: (roleName: string) => Promise<void>;
    attachRolePolicy: (
      roleName: string,
      policyName: string,
      policyType: 'System' | 'Custom',
    ) => Promise<void>;
    detachRolePolicy: (roleName: string, policyName: string) => Promise<void>;
    updateRolePolicy: (roleName: string, customStatements?: IamStatement[]) => Promise<void>;
    updateManagedPolicies: (roleName: string, desiredPolicies: string[]) => Promise<void>;
    listAttachedRolePolicies: (roleName: string) => Promise<string[]>;
    tagRole: (roleName: string, tags: Array<{ key: string; value: string }>) => Promise<void>;
  };
  tls: {
    createProject: (config: TlsProjectConfig) => Promise<TlsProjectInfo>;
    getProject: (projectName: string) => Promise<TlsProjectInfo | null>;
    getProjectTags: (projectName: string) => Promise<Array<{ Key?: string; Value?: string }>>;
    deleteProject: (projectName: string) => Promise<void>;
    createTopic: (config: TlsTopicConfig) => Promise<TlsTopicInfo>;
    getTopic: (projectName: string, topicName: string) => Promise<TlsTopicInfo | null>;
    listTopics: (projectName: string) => Promise<TlsTopicInfo[]>;
    deleteTopic: (projectName: string, topicName: string) => Promise<void>;
    createIndex: (config: TlsIndexConfig) => Promise<void>;
    deleteIndex: (projectName: string, topicName: string) => Promise<void>;
    waitForProject: (projectName: string) => Promise<void>;
    waitForTopic: (projectName: string, topicName: string) => Promise<void>;
    addTags: (config: TlsTagConfig) => Promise<void>;
    removeTags: (config: TlsRemoveTagsConfig) => Promise<void>;
  };
  apigw: {
    createGateway: (config: ApigwGatewayConfig) => Promise<ApigwGatewayInfo>;
    getGateway: (gatewayId: string) => Promise<ApigwGatewayInfo | null>;
    findGatewayByName: (gatewayName: string) => Promise<ApigwGatewayInfo | null>;
    findServerlessGateway: () => Promise<ApigwGatewayInfo | null>;
    waitForGatewayRunning: (gatewayId: string) => Promise<ApigwGatewayInfo>;
    updateGateway: (gatewayId: string, config: ApigwGatewayConfig) => Promise<void>;
    deleteGateway: (gatewayId: string) => Promise<void>;
    updateGatewayLog: (
      gatewayId: string,
      logConfig: NonNullable<ApigwGatewayConfig['logConfig']>,
    ) => Promise<void>;
    createService: (config: ApigwServiceConfig) => Promise<string>;
    getService: (serviceId: string) => Promise<ApigwServiceInfo | null>;
    findServiceByName: (gatewayId: string, serviceName: string) => Promise<ApigwServiceInfo | null>;
    deleteService: (serviceId: string) => Promise<void>;
    createUpstream: (config: ApigwUpstreamConfig) => Promise<string>;
    getUpstream: (upstreamId: string) => Promise<ApigwUpstreamInfo | null>;
    findUpstreamByName: (
      gatewayId: string,
      upstreamName: string,
    ) => Promise<ApigwUpstreamInfo | null>;
    deleteUpstream: (upstreamId: string) => Promise<void>;
    createRoute: (config: ApigwRouteConfig) => Promise<string>;
    getRoute: (routeId: string) => Promise<ApigwRouteInfo | null>;
    findRouteByName: (serviceId: string, routeName: string) => Promise<ApigwRouteInfo | null>;
    listRoutesByService: (serviceId: string) => Promise<ApigwRouteInfo[]>;
    deleteRoute: (routeId: string) => Promise<void>;
    createCustomDomain: (config: ApigwDomainConfig) => Promise<string>;
    deleteCustomDomain: (domainId: string) => Promise<void>;
  };
  sts: {
    getAccountId: () => Promise<string | undefined>;
  };
};

/**
 * Context type extension for Volcengine provider
 */
export type VolcengineContext = Context & {
  provider: 'volcengine';
};

// ============================================================================
// Volcengine Regions
// ============================================================================

/**
 * Supported Volcengine regions
 * @see https://www.volcengine.com/docs/6662/107381
 */
export const VOLCENGINE_REGIONS = {
  CN_BEIJING: 'cn-beijing',
  CN_SHANGHAI: 'cn-shanghai',
  CN_GUANGZHOU: 'cn-guangzhou',
  AP_SOUTHEAST_1: 'ap-southeast-1',
} as const;

export type VolcengineRegion = (typeof VOLCENGINE_REGIONS)[keyof typeof VOLCENGINE_REGIONS];

// ============================================================================
// Volcengine Endpoints
// ============================================================================

/**
 * Build service endpoint for Volcengine services
 */
export const buildVolcengineEndpoint = (service: string, region: string): string => {
  return `${service}.${region}.volces.com`;
};

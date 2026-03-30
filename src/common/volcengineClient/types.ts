import type { Context } from '../../types';

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
  | 'nodejs/v20'
  | 'nodejs/v18'
  | 'nodejs/v16'
  | 'nodejs/v14'
  | 'python/v3.12'
  | 'python/v3.11'
  | 'python/v3.10'
  | 'python/v3.9'
  | 'golang/v1'
  | 'java/v21'
  | 'java/v17'
  | 'java/v11'
  | 'java/v8';

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
  vpcConfig?: {
    vpcId: string;
    subnetIds: string[];
    securityGroupIds: string[];
  };
  tosMountConfig?: {
    bucketName: string;
    mountPath: string;
  };
};

/**
 * Response from veFaaS getFunction API
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
  vpcConfig?: {
    vpcId?: string;
    subnetIds?: string[];
    securityGroupIds?: string[];
  };
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
};

// ============================================================================
// API Gateway Types
// ============================================================================

/**
 * HTTP method for API Gateway triggers
 */
export type ApigwHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

/**
 * API Gateway trigger configuration
 */
export type ApigwTriggerConfig = {
  method: ApigwHttpMethod;
  path: string;
  backendFunctionName: string;
  description?: string;
};

/**
 * Configuration for creating an API Gateway
 */
export type ApigwConfig = {
  gatewayName: string;
  protocol?: 'HTTP' | 'HTTPS' | 'HTTP&HTTPS';
  description?: string;
  triggers: ApigwTriggerConfig[];
  domain?: {
    domainName: string;
    certificateId?: string;
  };
};

/**
 * Response from API Gateway getGateway API
 */
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
    createFunction: (config: VefaasFunctionConfig, codeBase64: string) => Promise<void>;
    getFunction: (functionName: string) => Promise<VefaasFunctionInfo | null>;
    updateFunctionConfiguration: (config: VefaasFunctionConfig) => Promise<void>;
    updateFunctionCode: (functionName: string, codeBase64: string) => Promise<void>;
    deleteFunction: (functionName: string) => Promise<void>;
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
  };
  iam: {
    createRole: (config: IamRoleConfig) => Promise<IamRoleInfo>;
    getRole: (roleName: string) => Promise<IamRoleInfo | null>;
    updateRoleTrustPolicy: (
      roleName: string,
      policy: IamRoleConfig['trustPolicy'],
    ) => Promise<void>;
    deleteRole: (roleName: string) => Promise<void>;
  };
  apigw: {
    createGateway: (config: ApigwConfig) => Promise<ApigwInfo>;
    getGateway: (gatewayId: string) => Promise<ApigwInfo | null>;
    updateGateway: (gatewayId: string, config: ApigwConfig) => Promise<void>;
    deleteGateway: (gatewayId: string) => Promise<void>;
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

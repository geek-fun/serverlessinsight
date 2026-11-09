export enum ResourceTypeEnum {
  // Tencent Cloud
  SCF_FUNCTION = 'SCF_FUNCTION',
  COS_BUCKET = 'COS_BUCKET',
  COS_DNS_CNAME = 'TENCENT_COS_DNS_CNAME',
  TENCENT_CDN_DOMAIN = 'TENCENT_CDN_DOMAIN',
  TENCENT_CDN_DNS_CNAME = 'TENCENT_CDN_DNS_CNAME',
  TDSQL_C_SERVERLESS = 'TDSQL_C_SERVERLESS',

  // Aliyun - Primary Resources
  ALIYUN_FC3_FUNCTION = 'ALIYUN_FC3_FUNCTION',
  ALIYUN_APIGW_GROUP = 'ALIYUN_APIGW_GROUP',
  ALIYUN_APIGW_API = 'ALIYUN_APIGW_API',
  ALIYUN_APIGW_DEPLOYMENT = 'ALIYUN_APIGW_DEPLOYMENT',
  ALIYUN_APIGW_LOG_CONFIG = 'ALIYUN_APIGW_LOG_CONFIG',
  ALIYUN_APIGW_DNS_VERIFICATION = 'ALIYUN_APIGW_DNS_VERIFICATION',
  ALIYUN_OSS_BUCKET = 'ALIYUN_OSS_BUCKET',
  ALIYUN_OSS_DNS_CNAME = 'ALIYUN_OSS_DNS_CNAME',
  ALIYUN_RDS_SERVERLESS = 'ALIYUN_RDS_SERVERLESS',
  ALIYUN_ES_SERVERLESS = 'ALIYUN_ES_SERVERLESS',
  ALIYUN_TABLESTORE_TABLE = 'ALIYUN_TABLESTORE_TABLE',

  // Aliyun - CDN Resources
  ALIYUN_CDN_DISTRIBUTION = 'ALIYUN_CDN_DISTRIBUTION',
  ALIYUN_CDN_DNS_CNAME = 'ALIYUN_CDN_DNS_CNAME',

  // Aliyun - FC3 Dependent Resources
  ALIYUN_SLS_PROJECT = 'ALIYUN_SLS_PROJECT',
  ALIYUN_SLS_LOGSTORE = 'ALIYUN_SLS_LOGSTORE',
  ALIYUN_SLS_INDEX = 'ALIYUN_SLS_INDEX',
  ALIYUN_RAM_ROLE = 'ALIYUN_RAM_ROLE',
  VOLCENGINE_IAM_ROLE = 'VOLCENGINE_IAM_ROLE',
  TENCENT_SCF_ROLE = 'TENCENT_SCF_ROLE',
  TENCENT_CLS_LOGSET = 'TENCENT_CLS_LOGSET',
  TENCENT_CLS_TOPIC = 'TENCENT_CLS_TOPIC',
  ALIYUN_ECS_SECURITY_GROUP = 'ALIYUN_ECS_SECURITY_GROUP',
  ALIYUN_NAS_ACCESS_GROUP = 'ALIYUN_NAS_ACCESS_GROUP',
  ALIYUN_NAS_FILE_SYSTEM = 'ALIYUN_NAS_FILE_SYSTEM',
  ALIYUN_NAS_MOUNT_TARGET = 'ALIYUN_NAS_MOUNT_TARGET',

  // Volcengine - Primary Resources
  VOLCENGINE_VEFAAS_FUNCTION = 'VOLCENGINE_VEFAAS_FUNCTION',
  VOLCENGINE_TOS_BUCKET = 'VOLCENGINE_TOS_BUCKET',

  // Volcengine - TOS bucket domain bindings (issue #294)
  VOLCENGINE_TOS_DNS_CNAME = 'VOLCENGINE_TOS_DNS_CNAME',
  VOLCENGINE_CDN_DOMAIN = 'VOLCENGINE_CDN_DOMAIN',
  VOLCENGINE_CDN_DNS_CNAME = 'VOLCENGINE_CDN_DNS_CNAME',
}

export type ResourceAttributes = Record<string, unknown>;

export type ResourceMode = 'managed' | 'data';

export type ResourceStatus = 'ready' | 'tainted';

export type ResourceInstance = {
  sid: string;
  id: string;
  [key: string]: unknown;
};

export type ResourceState = {
  mode: ResourceMode;
  region: string;
  definition: ResourceAttributes;
  instances: Array<ResourceInstance>;
  lastUpdated: string;
  status?: ResourceStatus;
  metadata?: Record<string, unknown>;
};

export const CURRENT_STATE_VERSION = '4.0';

export const LEGACY_STATE_VERSION = '3.0';

export type StateScope = {
  stage: string;
  region: string;
};

export type StateMigrationInfo = {
  opId: string;
  sourceVersion: string;
  sourceHash: string;
  migratedAt: string;
};

export type StageState = {
  resources: Record<string, ResourceState>;
  shared?: Record<string, ResourceState>;
};

export type StateFile = {
  version: string;
  provider: string;
  app: string;
  service: string;
  orgId?: string;
  appId?: string;
  serviceId?: string;
  serial?: number;
  lineage?: string;
  scope?: StateScope;
  migration?: StateMigrationInfo;
  /**
   * Migration ownership marker (docs/state-migration-saas.md §6.3): set to
   * 'saas' by `si migrate` after the state has been imported into the Console.
   * Legacy backends then refuse mutations on this state (decision D-4).
   */
  managedBy?: string;
  stages: Record<string, StageState>;
  resources: Record<string, ResourceState>;
};

/**
 * Persisted shape of a state file (disk / remote storage / API payloads).
 * `StateFile.resources` is a runtime-only projection of `stages[stage].resources`
 * (hydrated by loadState) and is never serialized — `stages` is the single
 * authoritative store. See issue #225.
 */
export type PersistedStateFile = Omit<StateFile, 'resources'>;

export type PlanAction = 'create' | 'update' | 'delete' | 'noop';

export type GatewayDomainUpdate = {
  exists: boolean;
  binding: boolean;
  certificate: boolean;
};

export type GatewayUpdateScope = {
  group: boolean;
  apis: boolean;
  logging: boolean;
  domains: Record<string, GatewayDomainUpdate>;
};

export type PlanItem = {
  logicalId: string;
  action: PlanAction;
  resourceType: string;
  changes?: {
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
  };
  /** No cloud mutation: adopt verified live values into saved intent. */
  stateUpdate?: ResourceAttributes;
  /** Verified gateway dimensions requiring mutation; absent means a full reconciliation. */
  gatewayUpdate?: GatewayUpdateScope;
  drifted?: boolean;
  /**
   * Top-level keys whose stored value already matches the desired definition
   * while the live cloud value does not — the field-level signature of an
   * out-of-config cloud edit. Rendered as a per-field revert annotation.
   */
  revertKeys?: string[];
  /**
   * Probe-level drift sources that cannot map to attributes (role policy,
   * logstore, security-group rules, ...). Values are i18n message keys,
   * resolved at display time.
   */
  driftReasons?: string[];
};

export type Plan = {
  items: Array<PlanItem>;
};

export type AttributeDiff = {
  key: string;
  before?: unknown;
  after?: unknown;
  action: 'add' | 'change' | 'remove';
  isComputed?: boolean;
  children?: AttributeDiff[];
};

export type PlanDisplayConfig = {
  colorize: boolean;
  indentSize: number;
  keyAlignWidth: number;
};

export type SaveStateFn = (state: StateFile) => Promise<void>;

export type PartialFailureError = {
  failedItem: PlanItem;
  error: Error;
  successfulItems: Array<PlanItem>;
};

export type ExecutionResult = {
  state: StateFile;
  partialFailure?: PartialFailureError;
};

export class PartialResourceError extends Error {
  readonly updatedState: StateFile;
  readonly cause: Error;

  constructor(updatedState: StateFile, cause: Error) {
    super(`Partial resource creation failed: ${cause.message}`);
    this.name = 'PartialResourceError';
    this.updatedState = updatedState;
    this.cause = cause;
  }
}

export class StateCorruptError extends Error {
  readonly path: string;
  readonly cause: unknown;

  constructor(path: string, cause: unknown) {
    super(
      `State file at "${path}" is corrupt and no valid "${path}.backup" is available to recover from. ` +
        'Restore the state file from the .backup file if it exists, or remove the corrupt file and re-run the deploy to rebuild state.',
      { cause },
    );
    this.name = 'StateCorruptError';
    this.path = path;
    this.cause = cause;
  }
}

export class StateVersionError extends Error {
  readonly version: string;
  readonly currentVersion: string;
  readonly cause: unknown;

  constructor(version: string, currentVersion: string, cause?: unknown) {
    super(
      `State file version "${version}" is not supported by this CLI (current "${currentVersion}"). ` +
        'Upgrade the CLI to a version that understands this state format, or restore a compatible state file.',
      cause !== undefined ? { cause } : undefined,
    );
    this.name = 'StateVersionError';
    this.version = version;
    this.currentVersion = currentVersion;
    this.cause = cause;
  }
}

export class StateScopeMismatchError extends Error {
  readonly requested: Record<string, string>;
  readonly stored: Record<string, string | undefined>;

  constructor(
    requested: { provider: string; app: string; service: string; stage: string; region: string },
    stored: { provider?: string; app?: string; service?: string; stage?: string; region?: string },
  ) {
    super(
      `State identity mismatch: the stored state belongs to ` +
        `provider=${stored.provider ?? 'unknown'}, app=${stored.app ?? 'unknown'}, ` +
        `service=${stored.service ?? 'unknown'}, stage=${stored.stage ?? 'unknown'}, ` +
        `region=${stored.region ?? 'unknown'}, but the command requested ` +
        `provider=${requested.provider}, app=${requested.app}, service=${requested.service}, ` +
        `stage=${requested.stage}, region=${requested.region}. ` +
        'Refusing to mix deployment scopes; check --stage/--region/--provider.',
    );
    this.name = 'StateScopeMismatchError';
    this.requested = requested;
    this.stored = stored;
  }
}

export class StateRegionRequiredError extends Error {
  constructor(stage: string) {
    super(
      `A regional deployment state requires a canonical region, but none was resolved for stage "${stage}". ` +
        'Pass -r/--region explicitly or set provider.region in the YAML configuration.',
    );
    this.name = 'StateRegionRequiredError';
  }
}

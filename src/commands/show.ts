import { ResourceState, ResourceTypeEnum, ServerlessIac } from '../types';
import { StateBackendType } from '../types/domains/backend';
import { getStatePath, loadState, getContext, hasCredentials } from '../common';
import { readLockFileForCommand } from '../common/lockManager';
import { createStateBackend } from '../common/stateBackend';
import { logger } from '../common/logger';
import { StateBackend, LockMetadata } from '../common/stateBackend/types';

type ShowOptions = {
  stage?: string;
  location?: string;
  iac?: ServerlessIac;
};

const formatTimeAgo = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays > 0) return `${diffDays} day(s) ago`;
  if (diffHours > 0) return `${diffHours} hour(s) ago`;
  if (diffMins > 0) return `${diffMins} minute(s) ago`;
  return 'just now';
};

const formatFunctionOutput = (logicalId: string, resource: ResourceState): string[] => {
  const lines: string[] = [];
  const instance = resource.instances?.[0];
  if (!instance) return lines;

  const functionName = (instance.functionName as string) || instance.id;
  const runtime = instance.runtime as string;
  const handler = instance.handler as string;
  const memory = instance.memorySize as number;
  const timeout = instance.timeout as number;

  lines.push(`  📦 ${functionName}`);
  lines.push(`     Runtime: ${runtime}`);
  lines.push(`     Handler: ${handler}`);
  lines.push(`     Memory: ${memory}MB, Timeout: ${timeout}s`);

  if (instance.internetAccess !== undefined) {
    lines.push(`     Internet Access: ${instance.internetAccess ? 'Yes' : 'No'}`);
  }

  return lines;
};

const formatApiGatewayOutput = (logicalId: string, resource: ResourceState): string[] => {
  const lines: string[] = [];
  const instance = resource.instances?.[0];
  if (!instance) return lines;

  if (instance.type === ResourceTypeEnum.ALIYUN_APIGW_GROUP) {
    const groupName = (instance.groupName as string) || instance.id;
    const subDomain = instance.subDomain as string;
    const basePath = instance.basePath as string;

    lines.push(`  🌐 API Group: ${groupName}`);
    if (subDomain) {
      lines.push(`     Sub-domain: ${subDomain}`);
    }
    if (basePath) {
      lines.push(`     Base Path: ${basePath}`);
    }
  } else if (instance.type === ResourceTypeEnum.ALIYUN_APIGW_API) {
    const apiName = (instance.apiName as string) || instance.id;
    const groupId = instance.groupId as string;

    lines.push(`  🔗 API: ${apiName}`);
    lines.push(`     Group ID: ${groupId}`);
  }

  return lines;
};

const formatBucketOutput = (logicalId: string, resource: ResourceState): string[] => {
  const lines: string[] = [];
  const instance = resource.instances?.[0];
  if (!instance) return lines;

  const bucketName = (instance.bucketName as string) || instance.id;
  const region = resource.region;
  const isOss = instance.type === ResourceTypeEnum.ALIYUN_OSS_BUCKET;
  const isCos = instance.type === ResourceTypeEnum.COS_BUCKET;

  lines.push(`  🪣 ${bucketName}`);
  lines.push(`     Region: ${region}`);

  if (isOss) {
    lines.push(`     Endpoint: https://${bucketName}.oss-${region}.aliyuncs.com`);
  } else if (isCos) {
    lines.push(`     Endpoint: https://${bucketName}.cos.${region}.myqcloud.com`);
  }

  const dnsInstance = resource.instances?.find(
    (inst) =>
      inst.type === ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME ||
      inst.type === ResourceTypeEnum.COS_DNS_CNAME,
  );

  const customDomain = (dnsInstance?.domain as string) || (instance.customDomain as string);
  if (customDomain) {
    lines.push(`     Custom Domain: ${customDomain}`);
    if (dnsInstance?.cname) {
      lines.push(`     CNAME Target: ${dnsInstance.cname as string}`);
    }
  }

  return lines;
};

const formatDatabaseOutput = (logicalId: string, resource: ResourceState): string[] => {
  const lines: string[] = [];
  const instance = resource.instances?.[0];
  if (!instance) return lines;

  const instanceId =
    (instance.instanceId as string) || (instance.clusterId as string) || instance.id;
  const engine = (instance.engine as string) || (instance.engineMode as string);
  const status = instance.status as string;

  lines.push(`  🗄️  ${instanceId}`);
  if (engine) {
    lines.push(`     Engine: ${engine}`);
  }
  if (status) {
    lines.push(`     Status: ${status}`);
  }

  return lines;
};

const formatDnsOutput = (logicalId: string, resource: ResourceState): string[] => {
  const lines: string[] = [];
  const instance = resource.instances?.[0];
  if (!instance) return lines;

  const domain = instance.domain as string;
  const cname = instance.cname as string;
  const rr = instance.rr as string;

  lines.push(`  🔀 ${domain || instance.id}`);
  if (rr && cname) {
    lines.push(`     ${rr} -> ${cname}`);
  } else if (cname) {
    lines.push(`     CNAME: ${cname}`);
  }

  return lines;
};

const formatResourceOutput = (logicalId: string, resource: ResourceState): string[] => {
  const instance = resource.instances?.[0];
  if (!instance) return [];

  const type = instance.type as string;

  if (type === ResourceTypeEnum.ALIYUN_FC3_FUNCTION || type === ResourceTypeEnum.SCF_FUNCTION) {
    return formatFunctionOutput(logicalId, resource);
  }

  if (type === ResourceTypeEnum.ALIYUN_APIGW_GROUP || type === ResourceTypeEnum.ALIYUN_APIGW_API) {
    return formatApiGatewayOutput(logicalId, resource);
  }

  if (type === ResourceTypeEnum.ALIYUN_OSS_BUCKET || type === ResourceTypeEnum.COS_BUCKET) {
    return formatBucketOutput(logicalId, resource);
  }

  if (
    type === ResourceTypeEnum.ALIYUN_RDS_SERVERLESS ||
    type === ResourceTypeEnum.TDSQL_C_SERVERLESS ||
    type === ResourceTypeEnum.ALIYUN_ES_SERVERLESS ||
    type === ResourceTypeEnum.ALIYUN_TABLESTORE_TABLE
  ) {
    return formatDatabaseOutput(logicalId, resource);
  }

  if (
    type === ResourceTypeEnum.ALIYUN_OSS_DNS_CNAME ||
    type === ResourceTypeEnum.COS_DNS_CNAME ||
    type === ResourceTypeEnum.ALIYUN_APIGW_DNS_VERIFICATION
  ) {
    return formatDnsOutput(logicalId, resource);
  }

  return [];
};

const loadLocalState = (
  provider: string,
  app: string,
  service: string,
  stage: string,
  baseDir: string,
) => {
  return loadState(provider, app, service, stage, baseDir);
};

const readLocalLock = (app: string, service: string, baseDir: string): LockMetadata | null => {
  const statePath = getStatePath(app, service, baseDir);
  return readLockFileForCommand(statePath);
};

const getBackendLocationString = (backendConfig: ServerlessIac['backend']): string => {
  if (!backendConfig || backendConfig.type === StateBackendType.LOCAL) {
    return 'local';
  }
  const config = backendConfig as { bucket: string; key: string };
  return `bucket://${config.bucket}/${config.key}`;
};

export const show = async (options: ShowOptions): Promise<void> => {
  const context = getContext();
  const stage = options.stage ?? context.stage;
  const baseDir = options.location ?? process.cwd();

  logger.info(
    `Loading state for app: ${context.app}, service: ${context.service}, stage: ${stage}...`,
  );

  let state;
  let lockInfo: LockMetadata | null;
  let stateLocation: string;
  let usingRemoteBackend = false;

  const shouldUseRemoteBackend = options.iac?.backend?.type === StateBackendType.BUCKET_STORE;

  if (shouldUseRemoteBackend && hasCredentials(context)) {
    try {
      const backend: StateBackend = createStateBackend(options.iac!.backend, context);
      state = await backend.loadState(context.provider, context.app, context.service, stage);
      lockInfo = await backend.readLock();
      usingRemoteBackend = true;
      stateLocation = getBackendLocationString(options.iac!.backend);
    } catch (error) {
      logger.warn(
        `Failed to load state from remote backend, falling back to local state: ${error}`,
      );
      state = loadLocalState(context.provider, context.app, context.service, stage, baseDir);
      lockInfo = readLocalLock(context.app, context.service, baseDir);
      stateLocation = getStatePath(context.app, context.service, baseDir);
    }
  } else {
    if (shouldUseRemoteBackend && !hasCredentials(context)) {
      logger.warn(
        'Remote backend configured but credentials not available. Falling back to local state.',
      );
    }
    state = loadLocalState(context.provider, context.app, context.service, stage, baseDir);
    lockInfo = readLocalLock(context.app, context.service, baseDir);
    stateLocation = getStatePath(context.app, context.service, baseDir);
  }

  const resources = state.resources;
  const resourceCount = Object.keys(resources).length;

  if (resourceCount === 0) {
    logger.info('No resources found in state.');
    logger.info('');
    logger.info(`State location: ${stateLocation}`);
    if (usingRemoteBackend) {
      logger.info('Backend: Remote');
    }
    logger.info('');
    logger.info('To deploy resources, run: si deploy');
    return;
  }

  logger.info('');
  logger.info('═'.repeat(60));
  logger.info('DEPLOYED RESOURCES');
  logger.info('═'.repeat(60));

  const groupedResources: Record<string, Array<[string, ResourceState]>> = {};

  for (const [logicalId, resource] of Object.entries(resources)) {
    const instance = resource.instances?.[0];
    const type = (instance?.type as string) || 'unknown';
    const category = type.includes('FUNCTION')
      ? 'functions'
      : type.includes('APIGW')
        ? 'apiGateway'
        : type.includes('BUCKET')
          ? 'storage'
          : type.includes('DNS') || type.includes('CNAME')
            ? 'dns'
            : type.includes('RDS') ||
                type.includes('TDSQL') ||
                type.includes('ES_') ||
                type.includes('TABLESTORE')
              ? 'databases'
              : 'other';

    if (!groupedResources[category]) {
      groupedResources[category] = [];
    }
    groupedResources[category].push([logicalId, resource]);
  }

  const categoryOrder = ['functions', 'apiGateway', 'storage', 'databases', 'dns', 'other'];
  const categoryLabels: Record<string, string> = {
    functions: 'Functions',
    apiGateway: 'API Gateway',
    storage: 'Storage',
    databases: 'Databases',
    dns: 'DNS Records',
    other: 'Other Resources',
  };

  for (const category of categoryOrder) {
    const resourcesInCategory = groupedResources[category];
    if (!resourcesInCategory || resourcesInCategory.length === 0) continue;

    logger.info('');
    logger.info(`📦 ${categoryLabels[category]}`);
    logger.info('─'.repeat(40));

    for (const [logicalId, resource] of resourcesInCategory) {
      const lines = formatResourceOutput(logicalId, resource);
      for (const line of lines) {
        logger.info(line);
      }
    }
  }

  logger.info('');
  logger.info('═'.repeat(60));
  logger.info('SUMMARY');
  logger.info('═'.repeat(60));
  logger.info('');
  logger.info(`  Provider:     ${state.provider}`);
  logger.info(`  App:          ${state.app}`);
  logger.info(`  Service:      ${state.service}`);
  logger.info(`  Stage:        ${stage}`);
  logger.info(`  Resources:    ${resourceCount}`);

  if (Object.keys(resources).length > 0) {
    const lastUpdated = Object.values(resources).reduce<string | undefined>((latest, r) => {
      if (!r.lastUpdated) return latest;
      if (!latest) return r.lastUpdated;
      return r.lastUpdated > latest ? r.lastUpdated : latest;
    }, undefined);
    if (lastUpdated) {
      logger.info(`  Last Updated: ${formatTimeAgo(lastUpdated)}`);
    }
  }

  logger.info('');
  logger.info(`State location: ${stateLocation}`);
  if (usingRemoteBackend) {
    logger.info('Backend: Remote');
  }

  if (lockInfo) {
    logger.info(`Lock Status: LOCKED by ${lockInfo.user || 'unknown'}`);
  } else {
    logger.info('Lock Status: UNLOCKED');
  }
};

import { lang } from '../lang';
import { definitionsDiffer, managedDefinition } from './planCompare';

const UPDATE_FIELDS: Record<string, readonly string[]> = {
  VOLCENGINE_VEFAAS: [
    'codeHash',
    'runtime',
    'handler',
    'memorySize',
    'timeout',
    'environment',
    'description',
    'role',
    'iam',
    'vpcConfig',
    'tosMountConfig',
    'logConfig',
    'timers',
  ],
  ALIYUN_RDS_SERVERLESS: ['serverlessConfig', 'securityIPList'],
  ALIYUN_ES_SERVERLESS: ['description', 'authentication'],
  TDSQL_C_SERVERLESS: ['minCpu', 'maxCpu', 'autoPause', 'autoPauseDelay'],
  TENCENT_ES_SERVERLESS: ['spaceName', 'kibanaWhiteIpList'],
  ALIYUN_TABLESTORE_TABLE: ['reservedThroughput', 'tableOptions'],
  SCF: [
    'codeHash',
    'memorySize',
    'timeout',
    'environment',
    'iam',
    'logConfig',
    'logEnabled',
    'http',
    'domain',
    'timers',
  ],
  ALIYUN_OSS_BUCKET: [
    'acl',
    'websiteConfiguration',
    'websiteCodeHash',
    'domain',
    'wwwBindApex',
    'domainCertificateId',
    'domainCertificateBody',
    'domainCertificatePrivateKey',
    'domainProtocol',
    'policy',
    'cdnType',
    'cdnScope',
    'cdnCacheTtl',
    'cdnIgnoreQueryString',
    'cdnOriginProtocol',
    'cdnCompression',
    'cdnForceRedirectHttps',
  ],
  COS_BUCKET: [
    'acl',
    'websiteConfiguration',
    'domain',
    'wwwBindApex',
    'domainCertificateId',
    'domainCertificateBody',
    'domainCertificatePrivateKey',
    'domainProtocol',
    'policy',
  ],
  VOLCENGINE_TOS_BUCKET: ['acl', 'websiteConfiguration', 'websiteCodeHash', 'policy'],
};

const IDENTITY_FIELDS: Record<string, readonly string[]> = {
  ALIYUN_FC3: ['functionName'],
  SCF: ['functionName'],
  VOLCENGINE_VEFAAS: ['functionName'],
  ALIYUN_OSS_BUCKET: ['bucketName'],
  COS_BUCKET: ['bucket', 'region'],
  VOLCENGINE_TOS_BUCKET: ['bucketName'],
  ALIYUN_RDS_SERVERLESS: [],
  ALIYUN_ES_SERVERLESS: ['appName'],
  TDSQL_C_SERVERLESS: [],
  TENCENT_ES_SERVERLESS: [],
  ALIYUN_TABLESTORE_TABLE: ['instanceName', 'tableName'],
  ALIYUN_APIGW: ['groupName'],
  VOLCENGINE_APIGW: ['gatewayName'],
};

export const assertPlanIdentity = (
  logicalId: string,
  resourceType: string,
  stored: Record<string, unknown>,
  desired: Record<string, unknown>,
): void => {
  const changed = (IDENTITY_FIELDS[resourceType] ?? []).filter(
    (key) =>
      stored[key] !== undefined &&
      definitionsDiffer({ [key]: stored[key] }, { [key]: desired[key] }),
  );
  if (changed.length) {
    throw new Error(
      lang.__('PLAN_REPLACEMENT_REQUIRED', { logicalId, fields: changed.join(', ') }),
    );
  }
};

export const assertSupportedPlanUpdate = (
  logicalId: string,
  resourceType: string,
  before: Record<string, unknown>,
  desired: Record<string, unknown>,
): void => {
  if (
    resourceType === 'ALIYUN_FC3' &&
    Array.isArray(before.nasStorage) &&
    Array.isArray(desired.nasStorage)
  ) {
    const oldClasses = before.nasStorage.map(
      (entry: { storage_class?: string }) => entry.storage_class,
    );
    const newClasses = desired.nasStorage.map(
      (entry: { storage_class?: string }) => entry.storage_class,
    );
    if (JSON.stringify(oldClasses) !== JSON.stringify(newClasses)) {
      throw new Error(
        lang.__('PLAN_UPDATE_NOT_SUPPORTED', { logicalId, fields: 'nasStorage.storage_class' }),
      );
    }
  }
  if (
    resourceType === 'ALIYUN_OSS_BUCKET' &&
    (before.cdnEnabled === true || before.accelerateEnabled === true) &&
    definitionsDiffer({ domain: before.domain }, { domain: desired.domain })
  ) {
    throw new Error(lang.__('PLAN_UPDATE_NOT_SUPPORTED', { logicalId, fields: 'domain' }));
  }
  const supported = UPDATE_FIELDS[resourceType];
  if (!supported) return;
  const changed = Object.keys(managedDefinition(desired)).filter(
    (key) =>
      !supported.includes(key) &&
      definitionsDiffer({ [key]: before[key] }, { [key]: desired[key] }),
  );
  if (changed.length) {
    throw new Error(
      lang.__('PLAN_UPDATE_NOT_SUPPORTED', { logicalId, fields: changed.join(', ') }),
    );
  }
};

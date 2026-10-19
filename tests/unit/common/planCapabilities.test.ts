import {
  assertPlanIdentity,
  assertSupportedPlanUpdate,
} from '../../../src/common/planCapabilities';

describe('plan update capabilities', () => {
  it.each([
    ['ALIYUN_RDS_SERVERLESS', 'engineVersion'],
    ['ALIYUN_ES_SERVERLESS', 'quotaInfo'],
    ['TDSQL_C_SERVERLESS', 'vpcId'],
    ['TENCENT_ES_SERVERLESS', 'vpcId'],
    ['SCF', 'handler'],
    ['ALIYUN_TABLESTORE_TABLE', 'primaryKey'],
    ['ALIYUN_OSS_BUCKET', 'versioningStatus'],
    ['COS_BUCKET', 'sseAlgorithm'],
    ['VOLCENGINE_TOS_BUCKET', 'storageClass'],
  ])('rejects an unimplemented %s update to %s before execution', (type, key) => {
    expect(() =>
      assertSupportedPlanUpdate('resource.test', type, { [key]: 'old' }, { [key]: 'new' }),
    ).toThrow(key);
  });

  it.each([
    ['ALIYUN_RDS_SERVERLESS', 'securityIPList'],
    ['ALIYUN_ES_SERVERLESS', 'authentication'],
    ['TDSQL_C_SERVERLESS', 'autoPauseDelay'],
    ['TENCENT_ES_SERVERLESS', 'kibanaWhiteIpList'],
    ['SCF', 'memorySize'],
    ['ALIYUN_TABLESTORE_TABLE', 'tableOptions'],
    ['ALIYUN_OSS_BUCKET', 'policy'],
    ['COS_BUCKET', 'policy'],
    ['VOLCENGINE_TOS_BUCKET', 'policy'],
  ])('allows a supported %s update to %s', (type, key) => {
    expect(() =>
      assertSupportedPlanUpdate('resource.test', type, { [key]: 'old' }, { [key]: 'new' }),
    ).not.toThrow();
  });

  it('allows unchanged immutable values, ignores unmanaged omissions and leaves custom providers extensible', () => {
    expect(() =>
      assertSupportedPlanUpdate('db', 'TDSQL_C_SERVERLESS', { vpcId: 'same' }, { vpcId: 'same' }),
    ).not.toThrow();
    expect(() =>
      assertSupportedPlanUpdate('db', 'TDSQL_C_SERVERLESS', { vpcId: 'old' }, { vpcId: null }),
    ).not.toThrow();
    expect(() =>
      assertSupportedPlanUpdate('custom', 'CUSTOM', {}, { custom: 'value' }),
    ).not.toThrow();
  });

  it('rejects physical renames and region changes but allows initial identities', () => {
    expect(() =>
      assertPlanIdentity(
        'functions.fn',
        'ALIYUN_FC3',
        { functionName: 'old' },
        { functionName: 'new' },
      ),
    ).toThrow('replacement');
    expect(() =>
      assertPlanIdentity('buckets.b', 'COS_BUCKET', { region: 'old' }, { region: 'new' }),
    ).toThrow('replacement');
    expect(() =>
      assertPlanIdentity('functions.fn', 'ALIYUN_FC3', {}, { functionName: 'new' }),
    ).not.toThrow();
    expect(() =>
      assertPlanIdentity(
        'functions.fn',
        'ALIYUN_FC3',
        { functionName: 'same' },
        { functionName: 'same' },
      ),
    ).not.toThrow();
    expect(() =>
      assertPlanIdentity('custom', 'CUSTOM', { name: 'old' }, { name: 'new' }),
    ).not.toThrow();
  });
  it('rejects changes to reused NAS storage classes and CDN identities', () => {
    expect(() =>
      assertSupportedPlanUpdate(
        'fn',
        'ALIYUN_FC3',
        { nasStorage: [{ storage_class: 'old' }] },
        { nasStorage: [{ storage_class: 'new' }] },
      ),
    ).toThrow('nasStorage');
    expect(() =>
      assertSupportedPlanUpdate(
        'bucket',
        'ALIYUN_OSS_BUCKET',
        { domain: 'old.example.com', cdnEnabled: true },
        { domain: 'new.example.com' },
      ),
    ).toThrow('domain');
    expect(() =>
      assertSupportedPlanUpdate(
        'fn',
        'ALIYUN_FC3',
        { nasStorage: [{ storage_class: 'same' }] },
        { nasStorage: [{ storage_class: 'same' }] },
      ),
    ).not.toThrow();
  });
});

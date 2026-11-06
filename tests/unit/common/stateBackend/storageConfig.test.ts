jest.mock('../../../../src/common/stateBackend/localStateBackend', () => ({
  createLocalStateBackend: jest.fn(),
}));
jest.mock('../../../../src/common/stateBackend/ossStateBackend', () => ({
  createOssStateBackend: jest.fn(),
}));
jest.mock('../../../../src/common/stateBackend/cosStateBackend', () => ({
  createCosStateBackend: jest.fn(),
}));
jest.mock('../../../../src/common/stateBackend/tosStateBackend', () => ({
  createTosStateBackend: jest.fn(),
}));
jest.mock('../../../../src/common/stateBackend/saasStateBackend', () => ({
  createSaasStateBackend: jest.fn(),
}));
jest.mock('../../../../src/lang', () => ({ lang: { __: (key: string) => key } }));

import {
  createStateBackend,
  resolveStateStorage,
  type BackendContext,
} from '../../../../src/common/stateBackend';
import { createOssStateBackend } from '../../../../src/common/stateBackend/ossStateBackend';
import { createCosStateBackend } from '../../../../src/common/stateBackend/cosStateBackend';
import { createTosStateBackend } from '../../../../src/common/stateBackend/tosStateBackend';
import { StateBackendType, type BucketStoreBackendConfig } from '../../../../src/types';

const config: BucketStoreBackendConfig = {
  type: StateBackendType.BUCKET_STORE,
  bucket: 'synthetic-state',
  key: 'infra/state.json',
};
const context: BackendContext = {
  app: 'shop',
  service: 'api',
  stage: 'prod',
  provider: 'volcengine',
  region: 'cn-beijing',
  accessKeyId: 'workload-id',
  accessKeySecret: 'workload-secret',
  securityToken: 'workload-token',
  storage: { provider: 'aliyun', region: 'ap-southeast-1' },
};

describe('independent state storage configuration', () => {
  const originalEnv = process.env;
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ALIYUN_ACCESS_KEY_ID: 'storage-id',
      ALIYUN_ACCESS_KEY_SECRET: 'storage-secret',
      ALIYUN_SECURITY_TOKEN: 'storage-token',
      TENCENTCLOUD_SECRET_ID: 'cos-id',
      TENCENTCLOUD_SECRET_KEY: 'cos-secret',
      VOLCENGINE_ACCESS_KEY_ID: 'tos-id',
      VOLCENGINE_SECRET_KEY: 'tos-secret',
      VOLCSTACK_SESSION_TOKEN: 'tos-token',
    };
  });
  afterAll(() => {
    process.env = originalEnv;
  });

  it('pins the original YAML cloud and region while retaining the effective deployment scope', () => {
    createStateBackend(config, context);
    expect(createOssStateBackend).toHaveBeenCalledWith(
      expect.objectContaining({
        scope: {
          app: 'shop',
          service: 'api',
          stage: 'prod',
          provider: 'volcengine',
          region: 'cn-beijing',
        },
        bucket: 'synthetic-state',
        key: 'infra/state.json',
        region: 'ap-southeast-1',
        accessKeyId: 'storage-id',
        accessKeySecret: 'storage-secret',
        securityToken: 'storage-token',
      }),
    );
    expect(createCosStateBackend).not.toHaveBeenCalled();
  });

  it('honors explicit storage settings and resolves credentials for that cloud', () => {
    createStateBackend(
      { ...config, storageProvider: 'tencent', storageRegion: 'AP-SHANGHAI' },
      context,
    );
    expect(createCosStateBackend).toHaveBeenCalledWith(
      expect.objectContaining({
        region: 'ap-shanghai',
        accessKeyId: 'cos-id',
        accessKeySecret: 'cos-secret',
      }),
    );
    expect(createCosStateBackend).toHaveBeenCalledWith(
      expect.not.objectContaining({ securityToken: 'workload-token' }),
    );
  });

  it('retains explicitly supplied credentials when storage and workload use the same cloud', () => {
    expect(resolveStateStorage(config, { ...context, provider: 'aliyun' })).toEqual({
      provider: 'aliyun',
      region: 'ap-southeast-1',
      accessKeyId: 'workload-id',
      accessKeySecret: 'workload-secret',
      securityToken: 'workload-token',
    });
  });

  it('supports direct factory callers without template defaults', () => {
    expect(
      resolveStateStorage(config, { ...context, storage: undefined, provider: 'tencent' }),
    ).toMatchObject({
      provider: 'tencent',
      region: 'cn-beijing',
      accessKeyId: 'workload-id',
    });
  });

  it('routes a volcengine workload to TOS using the original YAML provider and region', () => {
    createStateBackend(config, {
      ...context,
      storage: { provider: 'volcengine', region: 'cn-beijing' },
    });

    expect(createTosStateBackend).toHaveBeenCalledWith(
      expect.objectContaining({
        scope: expect.objectContaining({ provider: 'volcengine', region: 'cn-beijing' }),
        bucket: 'synthetic-state',
        key: 'infra/state.json',
        region: 'cn-beijing',
        accessKeyId: 'workload-id',
        accessKeySecret: 'workload-secret',
        securityToken: 'workload-token',
      }),
    );
    expect(createOssStateBackend).not.toHaveBeenCalled();
    expect(createCosStateBackend).not.toHaveBeenCalled();
  });

  it('honors explicit volcengine storage for a workload on another cloud', () => {
    createStateBackend(
      { ...config, storageProvider: 'volcengine', storageRegion: 'CN-BEIJING' },
      { ...context, provider: 'aliyun', region: 'cn-hangzhou' },
    );

    expect(createTosStateBackend).toHaveBeenCalledWith(
      expect.objectContaining({
        region: 'cn-beijing',
        scope: expect.objectContaining({ provider: 'aliyun', region: 'cn-hangzhou' }),
        accessKeyId: 'tos-id',
        accessKeySecret: 'tos-secret',
        securityToken: 'tos-token',
      }),
    );
    expect(createTosStateBackend).toHaveBeenCalledWith(
      expect.not.objectContaining({ accessKeyId: 'workload-id' }),
    );
    expect(createOssStateBackend).not.toHaveBeenCalled();
  });

  it('keeps the original YAML storage location when workload CLI overrides change the scope', () => {
    createStateBackend(config, {
      ...context,
      provider: 'aliyun',
      region: 'cn-hangzhou',
      storage: { provider: 'volcengine', region: 'cn-beijing' },
    });

    expect(createTosStateBackend).toHaveBeenCalledWith(
      expect.objectContaining({
        region: 'cn-beijing',
        scope: expect.objectContaining({ provider: 'aliyun', region: 'cn-hangzhou' }),
      }),
    );
    expect(createOssStateBackend).not.toHaveBeenCalled();
  });

  it('resolves permanent TOS credentials without a session token', () => {
    process.env = {
      VOLCENGINE_ACCESS_KEY_ID: 'permanent-id',
      VOLCENGINE_SECRET_KEY: 'permanent-secret',
    };

    expect(
      resolveStateStorage(
        { ...config, storageProvider: 'volcengine', storageRegion: 'cn-beijing' },
        { ...context, provider: 'aliyun' },
      ),
    ).toEqual({
      provider: 'volcengine',
      region: 'cn-beijing',
      accessKeyId: 'permanent-id',
      accessKeySecret: 'permanent-secret',
    });
  });

  it('refuses unsupported storage clouds instead of choosing an OSS SDK implicitly', () => {
    expect(() =>
      resolveStateStorage(config, { ...context, provider: 'huawei', storage: undefined }),
    ).toThrow('STATE_STORAGE_PROVIDER_UNSUPPORTED');
    expect(createOssStateBackend).not.toHaveBeenCalled();
    expect(createTosStateBackend).not.toHaveBeenCalled();
  });

  it('never reuses another cloud credentials when storage credentials are missing', () => {
    process.env = {};
    expect(() => createStateBackend(config, context)).toThrow('STATE_STORAGE_CREDENTIALS_MISSING');
    expect(createOssStateBackend).not.toHaveBeenCalled();
  });

  it('reports missing TOS storage credentials before selecting any backend', () => {
    process.env = {
      ALIYUN_ACCESS_KEY_ID: 'workload-id',
      ALIYUN_ACCESS_KEY_SECRET: 'workload-secret',
    };

    expect(() =>
      createStateBackend(
        { ...config, storageProvider: 'volcengine' },
        { ...context, provider: 'aliyun' },
      ),
    ).toThrow('STATE_STORAGE_CREDENTIALS_MISSING');
    expect(createTosStateBackend).not.toHaveBeenCalled();
    expect(createOssStateBackend).not.toHaveBeenCalled();
  });
});

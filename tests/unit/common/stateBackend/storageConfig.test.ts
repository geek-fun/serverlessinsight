jest.mock('../../../../src/common/stateBackend/localStateBackend', () => ({
  createLocalStateBackend: jest.fn(),
}));
jest.mock('../../../../src/common/stateBackend/ossStateBackend', () => ({
  createOssStateBackend: jest.fn(),
}));
jest.mock('../../../../src/common/stateBackend/cosStateBackend', () => ({
  createCosStateBackend: jest.fn(),
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

  it('refuses unsupported storage clouds instead of choosing an OSS SDK implicitly', () => {
    expect(() => resolveStateStorage(config, { ...context, storage: undefined })).toThrow(
      'STATE_STORAGE_PROVIDER_UNSUPPORTED',
    );
    expect(createOssStateBackend).not.toHaveBeenCalled();
  });

  it('never reuses another cloud credentials when storage credentials are missing', () => {
    process.env = {};
    expect(() => createStateBackend(config, context)).toThrow('STATE_STORAGE_CREDENTIALS_MISSING');
    expect(createOssStateBackend).not.toHaveBeenCalled();
  });
});

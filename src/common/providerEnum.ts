export enum ProviderEnum {
  HUAWEI = 'huawei',
  ALIYUN = 'aliyun',
  TENCENT = 'tencent',
  AWS = 'aws',
  VOLCENGINE = 'volcengine',
}

/**
 * Providers with a real stack implementation. Keep in sync with the dispatch
 * in src/stack/deploy.ts: huawei is a stub that refuses to deploy, aws has no
 * dispatch branch. Drives the `--provider` help text (issue #308).
 */
export const IMPLEMENTED_PROVIDERS: readonly ProviderEnum[] = [
  ProviderEnum.ALIYUN,
  ProviderEnum.TENCENT,
  ProviderEnum.VOLCENGINE,
];

import { CdkAssets } from '../../src/types';

export const assetsFixture = {
  version: '7.0.0',
  rootPath: 'path/to',
  files: {
    '55d1d2dd5d6c1b083a04c15431f70da1f2840b9de06383411cbf7eda2a512efe': {
      source: {
        path: 'asset.55d1d2dd5d6c1b083a04c15431f70da1f2840b9de06383411cbf7eda2a512efe',
        packaging: 'zip',
      },
      destinations: {
        'current_account-current_region': {
          bucketName: 'cdk-ajmywduza-assets-${ALIYUN::Region}',
          objectKey: '55d1d2dd5d6c1b083a04c15431f70da1f2840b9de06383411cbf7eda2a512efe.zip',
        },
      },
    },
    c6a72ed7e7e83f01a000b75885758088fa050298a31a1e95d37ac88f08e42315: {
      source: {
        path: 'asset.c6a72ed7e7e83f01a000b75885758088fa050298a31a1e95d37ac88f08e42315.zip',
        packaging: 'file',
      },
      destinations: {
        'current_account-current_region': {
          bucketName: 'cdk-ajmywduza-assets-${ALIYUN::Region}',
          objectKey: 'c6a72ed7e7e83f01a000b75885758088fa050298a31a1e95d37ac88f08e42315.zip',
        },
      },
    },
    '318b7e53b977163f004f1de9cb5bfa104c52b7d7058452d25d16530bb82ec261': {
      source: {
        path: 'insight-website-poc.template.json',
        packaging: 'file',
      },
      destinations: {
        'current_account-current_region': {
          bucketName: 'cdk-ajmywduza-assets-${ALIYUN::Region}',
          objectKey: '318b7e53b977163f004f1de9cb5bfa104c52b7d7058452d25d16530bb82ec261.json',
        },
      },
    },
  },
  dockerImages: {},
} as unknown as CdkAssets;

import { ProviderEnum } from './providerEnum';

export enum StandardRuntime {
  NODEJS24 = 'nodejs24',
  NODEJS22 = 'nodejs22',
  NODEJS20 = 'nodejs20',
  NODEJS18 = 'nodejs18',
  NODEJS16 = 'nodejs16',
  NODEJS14 = 'nodejs14',
  NODEJS12 = 'nodejs12',
  NODEJS10 = 'nodejs10',
  PYTHON3_14 = 'python3.14',
  PYTHON3_13 = 'python3.13',
  PYTHON3_12 = 'python3.12',
  PYTHON3_11 = 'python3.11',
  PYTHON3_10 = 'python3.10',
  PYTHON3_9 = 'python3.9',
  PYTHON3_7 = 'python3.7',
  PYTHON3_6 = 'python3.6',
  JAVA25 = 'java25',
  JAVA21 = 'java21',
  JAVA17 = 'java17',
  JAVA11 = 'java11',
  JAVA8 = 'java8',
  PHP8_0 = 'php8.0',
  PHP7_4 = 'php7.4',
  PHP7_2 = 'php7.2',
  PHP5_6 = 'php5.6',
  GO1 = 'go1',
  DOTNET_CORE3_1 = 'dotnet_core3.1',
}

type RuntimeMapping = {
  [key in ProviderEnum]?: string;
};

const runtimeMappings: Record<StandardRuntime, RuntimeMapping> = {
  [StandardRuntime.NODEJS24]: {
    [ProviderEnum.AWS]: 'nodejs24.x',
  },
  [StandardRuntime.NODEJS22]: {
    [ProviderEnum.AWS]: 'nodejs22.x',
  },
  [StandardRuntime.NODEJS20]: {
    [ProviderEnum.ALIYUN]: 'nodejs20',
    [ProviderEnum.AWS]: 'nodejs20.x',
  },
  [StandardRuntime.NODEJS18]: {
    [ProviderEnum.ALIYUN]: 'nodejs18',
    [ProviderEnum.TENCENT]: 'Nodejs18.15',
  },
  [StandardRuntime.NODEJS16]: {
    [ProviderEnum.ALIYUN]: 'nodejs16',
    [ProviderEnum.TENCENT]: 'Nodejs16.13',
  },
  [StandardRuntime.NODEJS14]: {
    [ProviderEnum.ALIYUN]: 'nodejs14',
    [ProviderEnum.TENCENT]: 'Nodejs14.18',
  },
  [StandardRuntime.NODEJS12]: {
    [ProviderEnum.ALIYUN]: 'nodejs12',
    [ProviderEnum.TENCENT]: 'Nodejs12.16',
  },
  [StandardRuntime.NODEJS10]: {
    [ProviderEnum.ALIYUN]: 'nodejs10',
    [ProviderEnum.TENCENT]: 'Nodejs10.15',
  },
  [StandardRuntime.PYTHON3_14]: {
    [ProviderEnum.AWS]: 'python3.14',
  },
  [StandardRuntime.PYTHON3_13]: {
    [ProviderEnum.AWS]: 'python3.13',
  },
  [StandardRuntime.PYTHON3_12]: {
    [ProviderEnum.ALIYUN]: 'python3.12',
    [ProviderEnum.AWS]: 'python3.12',
  },
  [StandardRuntime.PYTHON3_11]: {
    [ProviderEnum.AWS]: 'python3.11',
  },
  [StandardRuntime.PYTHON3_10]: {
    [ProviderEnum.ALIYUN]: 'python3.10',
    [ProviderEnum.TENCENT]: 'Python3.10',
    [ProviderEnum.AWS]: 'python3.10',
  },
  [StandardRuntime.PYTHON3_9]: {
    [ProviderEnum.ALIYUN]: 'python3.9',
    [ProviderEnum.TENCENT]: 'Python3.9',
  },
  [StandardRuntime.PYTHON3_7]: {
    [ProviderEnum.TENCENT]: 'Python3.7',
  },
  [StandardRuntime.PYTHON3_6]: {
    [ProviderEnum.ALIYUN]: 'python3.6',
    [ProviderEnum.TENCENT]: 'Python3.6',
  },
  [StandardRuntime.JAVA25]: {
    [ProviderEnum.AWS]: 'java25',
  },
  [StandardRuntime.JAVA21]: {
    [ProviderEnum.AWS]: 'java21',
  },
  [StandardRuntime.JAVA17]: {
    [ProviderEnum.AWS]: 'java17',
  },
  [StandardRuntime.JAVA11]: {
    [ProviderEnum.ALIYUN]: 'java11',
    [ProviderEnum.AWS]: 'java11',
  },
  [StandardRuntime.JAVA8]: {
    [ProviderEnum.ALIYUN]: 'java8',
    [ProviderEnum.TENCENT]: 'Java8',
    [ProviderEnum.AWS]: 'java8.al2',
  },
  [StandardRuntime.PHP8_0]: {
    [ProviderEnum.TENCENT]: 'Php8.0',
  },
  [StandardRuntime.PHP7_4]: {
    [ProviderEnum.TENCENT]: 'Php7.4',
  },
  [StandardRuntime.PHP7_2]: {
    [ProviderEnum.ALIYUN]: 'php7.2',
    [ProviderEnum.TENCENT]: 'Php7.2',
  },
  [StandardRuntime.PHP5_6]: {
    [ProviderEnum.TENCENT]: 'Php5.6',
  },
  [StandardRuntime.GO1]: {
    [ProviderEnum.ALIYUN]: 'go 1.x',
    [ProviderEnum.TENCENT]: 'Go1',
  },
  [StandardRuntime.DOTNET_CORE3_1]: {
    [ProviderEnum.ALIYUN]: '.NET Core 3.1',
  },
};

export const mapRuntime = (standardRuntime: string, provider: ProviderEnum): string => {
  const mapping = runtimeMappings[standardRuntime as StandardRuntime];

  if (!mapping) {
    throw new Error(`Unsupported standard runtime: ${standardRuntime}`);
  }

  const providerRuntime = mapping[provider];

  if (!providerRuntime) {
    throw new Error(
      `Runtime ${standardRuntime} is not supported for provider ${provider}. ` +
        `Supported providers for this runtime: ${Object.keys(mapping).join(', ')}`,
    );
  }

  return providerRuntime;
};

export const isRuntimeSupported = (standardRuntime: string, provider: ProviderEnum): boolean => {
  const mapping = runtimeMappings[standardRuntime as StandardRuntime];
  return !!mapping && !!mapping[provider];
};

export const getSupportedRuntimes = (provider?: ProviderEnum): string[] => {
  if (!provider) {
    return Object.values(StandardRuntime);
  }

  return Object.entries(runtimeMappings)
    .filter(([, mapping]) => !!mapping[provider])
    .map(([runtime]) => runtime);
};

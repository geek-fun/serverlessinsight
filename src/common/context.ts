import fs from 'node:fs';
import path from 'node:path';
import { Context, ServerlessIac } from '../types';
import { getCredentials } from './credentials';
import { getIamInfo } from './imsClient';
import { ProviderEnum } from './providerEnum';

let context: Context | undefined;

const DEFAULT_IAC_FILES = [
  'serverlessinsight.yml',
  'serverlessInsight.yml',
  'ServerlessInsight.yml',
  'serverless-insight.yml',
];

export const getIacLocation = (location?: string): string => {
  const projectRoot = path.resolve(process.cwd());
  const searchTargets = location ? [location] : DEFAULT_IAC_FILES;
  const attempted = new Set<string>();

  const toAbsolutePath = (target: string) =>
    path.isAbsolute(target) ? target : path.resolve(projectRoot, target);

  const tryResolveCandidate = (target: string): string | undefined => {
    const resolved = toAbsolutePath(target);
    attempted.add(resolved);

    if (!fs.existsSync(resolved)) {
      return undefined;
    }

    const stats = fs.statSync(resolved);
    if (stats.isDirectory()) {
      for (const fileName of DEFAULT_IAC_FILES) {
        const nested = path.join(resolved, fileName);
        attempted.add(nested);
        if (fs.existsSync(nested) && fs.statSync(nested).isFile()) {
          return nested;
        }
      }
      return undefined;
    }

    return resolved;
  };

  for (const candidate of searchTargets) {
    const match = tryResolveCandidate(candidate);
    if (match) {
      return match;
    }
  }

  const attemptedList = Array.from(attempted)
    .map((n) => `'${n}'`)
    .join(', ');
  throw new Error(`No IaC file found. Tried: ${attemptedList}`);
};

export const setContext = async (
  config: {
    stage?: string;
    stackName?: string;
    region?: string;
    provider?: string;
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
    location?: string;
    parameters?: { [key: string]: string };
    iacProvider?: ServerlessIac['provider'];
    stages?: ServerlessIac['stages'];
  },
  reaValToken = false,
): Promise<void> => {
  const region =
    config.region ??
    config.iacProvider?.region ??
    process.env.ROS_REGION_ID ??
    process.env.ALIYUN_REGION ??
    'cn-hangzhou';

  const provider = (config.provider ??
    config.iacProvider?.name ??
    ProviderEnum.ALIYUN) as ProviderEnum;

  const credentials = getCredentials(
    {
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      securityToken: config.securityToken,
    },
    provider,
  );

  const newContext: Context = {
    stage: config.stage ?? 'default',
    stackName: config.stackName ?? '',
    provider,
    region,
    accessKeyId: credentials.accessKeyId as string,
    accessKeySecret: credentials.accessKeySecret as string,
    securityToken: credentials.securityToken,
    iacLocation: getIacLocation(config.location),
    parameters: Object.entries(config.parameters ?? {}).map(([key, value]) => ({ key, value })),
    stages: Object.entries(config.stages ?? {}).reduce(
      (acc, [stage, parameters]) => ({
        ...acc,
        [stage]: Object.entries(parameters).map(([key, value]) => ({ key, value })),
      }),
      {},
    ),
  };

  if (reaValToken) {
    const iamInfo = await getIamInfo(newContext);
    newContext.accountId = iamInfo?.accountId;
  }
  context = newContext;
};

export const getContext = (): Context => {
  if (!context) {
    throw new Error('No context found');
  }
  return context;
};

export const clearContext = (): void => {
  context = undefined;
};

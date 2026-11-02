import { ProviderEnum } from './providerEnum';
import { validateScopeKeyPart } from './stateScope';
import { lang } from '../lang';

type EffectiveConfigInput = {
  cli?: {
    stage?: string;
    region?: string;
    provider?: string;
  };
  iacProvider?: {
    name?: string;
    region?: string;
  };
};

type EffectiveOverrides = {
  region: boolean;
  provider: boolean;
  stage: boolean;
};

type EffectiveConfig = {
  provider: string;
  region: string;
  stage: string;
  overrides: EffectiveOverrides;
};

const DEFAULT_STAGE = 'default';
const DEFAULT_REGION = 'cn-hangzhou';

const parseCliProvider = (raw: string | undefined): ProviderEnum | undefined => {
  if (!raw) return undefined;
  const normalized = raw.trim().toLowerCase() as ProviderEnum;
  if (!Object.values(ProviderEnum).includes(normalized)) {
    throw new Error(lang.__('EFFECTIVE_CONFIG_UNKNOWN_PROVIDER', { provider: raw }));
  }
  return normalized;
};

export const resolveEffectiveConfig = (input: EffectiveConfigInput): EffectiveConfig => {
  const cli = input.cli ?? {};
  const iacProvider = input.iacProvider ?? {};

  const cliRegion = cli.region?.trim() || undefined;
  const cliProvider = parseCliProvider(cli.provider);

  const region =
    cliRegion ??
    iacProvider.region?.trim() ??
    process.env.SI_REGION ??
    process.env.ALIYUN_REGION ??
    DEFAULT_REGION;

  const provider = cliProvider ?? iacProvider.name ?? ProviderEnum.ALIYUN;
  const stage = cli.stage?.trim() || DEFAULT_STAGE;

  return {
    provider,
    region: canonicalRegion(region),
    stage: validateScopeKeyPart(stage, 'stage'),
    overrides: {
      region: !!cliRegion,
      provider: !!cliProvider,
      stage: !!cli.stage?.trim(),
    },
  };
};

const canonicalRegion = (region: string): string => {
  const canonical = region.trim().toLowerCase();
  if (!canonical) {
    throw new Error(lang.__('EFFECTIVE_CONFIG_REGION_REQUIRED'));
  }
  return canonical;
};

export const assertProviderBinding = (expected: string, actual: string): void => {
  if (expected !== actual) {
    throw new Error(lang.__('EFFECTIVE_CONFIG_PROVIDER_MISMATCH', { expected, actual }));
  }
};

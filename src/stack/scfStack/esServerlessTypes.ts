import { DatabaseDomain, DatabaseEnum, DatabaseVersionEnum, ResourceAttributes } from '../../types';

export type TencentEsConfig = {
  SpaceName: string;
  VpcId?: string;
  SubnetId?: string;
  Zone?: string;
  KibanaWhiteIpList?: string[];
  Version?: string;
};

export type TencentEsSpaceInfo = {
  SpaceId: string;
  SpaceName: string;
  Status: number;
  CreateTime?: string;
  IndexCount?: number;
  KibanaUrl?: string;
  KibanaPrivateUrl?: string;
};

// Map database versions to ES versions
const esVersionMap = new Map<
  string,
  {
    version: string;
  }
>([
  [
    `${DatabaseEnum.ELASTICSEARCH_SERVERLESS}-${DatabaseVersionEnum['ES_SEARCH_7.10']}`,
    { version: '7.10' },
  ],
  [
    `${DatabaseEnum.ELASTICSEARCH_SERVERLESS}-${DatabaseVersionEnum['ES_TIME_SERIES_7.10']}`,
    { version: '7.10' },
  ],
]);

export const databaseToTencentEsConfig = (database: DatabaseDomain): TencentEsConfig => {
  const engineConfig = esVersionMap.get(`${database.type}-${database.version}`);

  if (!engineConfig) {
    throw new Error(`Unsupported ES database type/version: ${database.type}-${database.version}`);
  }

  const config: TencentEsConfig = {
    SpaceName: database.name,
    Version: engineConfig.version,
  };

  // Add network configuration
  if (database.network.vpcId) {
    config.VpcId = database.network.vpcId;
  }

  if (database.network.subnetId) {
    config.SubnetId = database.network.subnetId;
  }

  // Add IP whitelist from ingress rules for public access
  if (database.network.ingressRules && database.network.ingressRules.length > 0) {
    config.KibanaWhiteIpList = database.network.ingressRules;
  }

  return config;
};

export const extractTencentEsDefinition = (config: TencentEsConfig): ResourceAttributes => {
  return {
    spaceName: config.SpaceName,
    version: config.Version ?? null,
    vpcId: config.VpcId ?? null,
    subnetId: config.SubnetId ?? null,
    zone: config.Zone ?? null,
    kibanaWhiteIpList: config.KibanaWhiteIpList ?? null,
  };
};

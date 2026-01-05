import { DatabaseDomain, DatabaseEnum, DatabaseVersionEnum, ResourceAttributes } from '../../types';
import { EsConfig, EsInfo } from '../../common/aliyunClient/esOperations';

// Map database versions to ES versions
const esVersionMap = new Map<
  string,
  {
    version: string;
    category: string;
    quota: { minCu: number; maxCu: number };
  }
>([
  [
    `${DatabaseEnum.ELASTICSEARCH_SERVERLESS}-${DatabaseVersionEnum['ES_SEARCH_7.10']}`,
    {
      version: '7.10',
      category: 'STANDARD',
      quota: { minCu: 2, maxCu: 8 },
    },
  ],
  [
    `${DatabaseEnum.ELASTICSEARCH_SERVERLESS}-${DatabaseVersionEnum['ES_TIME_SERIES_7.10']}`,
    {
      version: '7.10',
      category: 'TRIAL',
      quota: { minCu: 2, maxCu: 8 },
    },
  ],
]);

export const databaseToEsConfig = (database: DatabaseDomain): EsConfig => {
  const engineConfig = esVersionMap.get(`${database.type}-${database.version}`);

  if (!engineConfig) {
    throw new Error(`Unsupported ES database type/version: ${database.type}-${database.version}`);
  }

  const { version, category } = engineConfig;

  const config: EsConfig = {
    AppName: database.name,
    AppVersion: version,
    Authentication: {
      BasicAuth: [
        {
          Password: database.security.basicAuth.password,
        },
      ],
    },
    QuotaInfo: {
      AppType: category,
      MinCu: database.cu.min,
    },
    Description: `Elasticsearch serverless app: ${database.name}`,
  };

  // Add network configuration if public access is configured
  if (database.network.type === 'PUBLIC' && database.network.ingressRules.length > 0) {
    config.Network = [
      {
        Type: 'PUBLIC_KIBANA',
        Enabled: true,
        WhiteIpGroup: [
          {
            GroupName: 'default',
            Ips: database.network.ingressRules,
          },
        ],
      },
      {
        Type: 'PUBLIC_ES',
        Enabled: true,
        WhiteIpGroup: [
          {
            GroupName: 'default',
            Ips: database.network.ingressRules,
          },
        ],
      },
    ];
  }

  return config;
};

export const extractEsDefinition = (config: EsConfig): ResourceAttributes => {
  return {
    appName: config.AppName,
    appVersion: config.AppVersion,
    authentication: config.Authentication
      ? {
          basicAuth: config.Authentication.BasicAuth?.map(() => ({
            password: '***',
          })),
        }
      : null,
    quotaInfo: config.QuotaInfo
      ? {
          appType: config.QuotaInfo.AppType,
          minCu: config.QuotaInfo.MinCu,
        }
      : null,
    description: config.Description ?? null,
    network: config.Network
      ? config.Network.map((n) => ({
          type: n.Type,
          enabled: n.Enabled,
          whiteIpGroup: n.WhiteIpGroup
            ? n.WhiteIpGroup.map((w) => ({
                groupName: w.GroupName,
                ips: w.Ips,
              }))
            : null,
        }))
      : null,
  };
};

export { EsConfig, EsInfo };

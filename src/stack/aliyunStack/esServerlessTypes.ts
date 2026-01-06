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
          Username: database.security.basicAuth.username || 'elastic',
        },
      ],
    },
    QuotaInfo: {
      AppType: category,
      Cu: database.cu.min,
      Storage: database.storage.min,
    },
    Description: `Elasticsearch serverless app: ${database.name}`,
    ChargeType: 'POSTPAY',
  };

  // Add network configuration for public access
  if (database.network.type === 'PUBLIC' && database.network.ingressRules.length > 0) {
    config.Network = [
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

  // Add private network configuration
  if (database.network.type === 'PRIVATE' && database.network.vpcId) {
    config.PrivateNetwork = [
      {
        Type: 'PRIVATE_ES',
        Enabled: true,
        VpcId: database.network.vpcId,
        WhiteIpGroup:
          database.network.ingressRules.length > 0
            ? [
                {
                  GroupName: 'default',
                  Ips: database.network.ingressRules,
                },
              ]
            : undefined,
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
            username: '***',
          })),
        }
      : null,
    quotaInfo: config.QuotaInfo
      ? {
          appType: config.QuotaInfo.AppType ?? null,
          cu: config.QuotaInfo.Cu ?? null,
          storage: config.QuotaInfo.Storage ?? null,
        }
      : null,
    description: config.Description ?? null,
    chargeType: config.ChargeType ?? null,
    network: config.Network
      ? config.Network.map((n) => ({
          type: n.Type ?? null,
          enabled: n.Enabled ?? null,
          domain: n.Domain ?? null,
          port: n.Port ?? null,
          whiteIpGroup: n.WhiteIpGroup
            ? n.WhiteIpGroup.map((w) => ({
                groupName: w.GroupName ?? null,
                ips: w.Ips ?? [],
              }))
            : null,
        }))
      : null,
    privateNetwork: config.PrivateNetwork
      ? config.PrivateNetwork.map((n) => ({
          type: n.Type ?? null,
          enabled: n.Enabled ?? null,
          vpcId: n.VpcId ?? null,
          pvlEndpointId: n.PvlEndpointId ?? null,
          whiteIpGroup: n.WhiteIpGroup
            ? n.WhiteIpGroup.map((w) => ({
                groupName: w.GroupName ?? null,
                ips: w.Ips ?? [],
              }))
            : null,
        }))
      : null,
    tags: config.Tags
      ? config.Tags.map((t) => ({
          key: t.Key ?? null,
          value: t.Value ?? null,
        }))
      : null,
  };
};

export { EsConfig, EsInfo };

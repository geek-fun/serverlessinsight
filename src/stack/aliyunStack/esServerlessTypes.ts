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
    appName: database.name,
    appVersion: version,
    authentication: {
      basicAuth: [
        {
          password: database.security.basicAuth.password,
          username: database.security.basicAuth.username || 'elastic',
        },
      ],
    },
    quotaInfo: {
      appType: category,
      cu: database.cu.min,
      storage: database.storage.min,
    },
    description: `Elasticsearch serverless app: ${database.name}`,
    chargeType: 'POSTPAY',
  };

  // Add network configuration for public access
  if (database.network.type === 'PUBLIC' && database.network.ingressRules.length > 0) {
    config.network = [
      {
        type: 'PUBLIC_ES',
        enabled: true,
        whiteIpGroup: [
          {
            groupName: 'default',
            ips: database.network.ingressRules,
          },
        ],
      },
    ];
  }

  // Add private network configuration
  if (database.network.type === 'PRIVATE' && database.network.vpcId) {
    config.privateNetwork = [
      {
        type: 'PRIVATE_ES',
        enabled: true,
        vpcId: database.network.vpcId,
        whiteIpGroup:
          database.network.ingressRules.length > 0
            ? [
                {
                  groupName: 'default',
                  ips: database.network.ingressRules,
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
    appName: config.appName,
    appVersion: config.appVersion,
    authentication: config.authentication
      ? {
          basicAuth: config.authentication.basicAuth?.map(() => ({
            password: '***',
            username: '***',
          })),
        }
      : null,
    quotaInfo: config.quotaInfo
      ? {
          appType: config.quotaInfo.appType ?? null,
          cu: config.quotaInfo.cu ?? null,
          storage: config.quotaInfo.storage ?? null,
        }
      : null,
    description: config.description ?? null,
    chargeType: config.chargeType ?? null,
    network: config.network
      ? config.network.map((n) => ({
          type: n.type ?? null,
          enabled: n.enabled ?? null,
          domain: n.domain ?? null,
          port: n.port ?? null,
          whiteIpGroup: n.whiteIpGroup
            ? n.whiteIpGroup.map((w) => ({
                groupName: w.groupName ?? null,
                ips: w.ips ?? [],
              }))
            : null,
        }))
      : null,
    privateNetwork: config.privateNetwork
      ? config.privateNetwork.map((n) => ({
          type: n.type ?? null,
          enabled: n.enabled ?? null,
          vpcId: n.vpcId ?? null,
          pvlEndpointId: n.pvlEndpointId ?? null,
          whiteIpGroup: n.whiteIpGroup
            ? n.whiteIpGroup.map((w) => ({
                groupName: w.groupName ?? null,
                ips: w.ips ?? [],
              }))
            : null,
        }))
      : null,
    tags: config.tags
      ? config.tags.map((t) => ({
          key: t.key ?? null,
          value: t.value ?? null,
        }))
      : null,
  };
};

export { EsConfig, EsInfo };

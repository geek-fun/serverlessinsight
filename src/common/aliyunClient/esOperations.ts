import EsClient from '@alicloud/elasticsearch20170613';
import { Context } from '../../types';

export type EsConfig = {
  AppName: string;
  AppVersion: string;
  Authentication?: {
    BasicAuth?: Array<{
      Password: string;
    }>;
  };
  QuotaInfo: {
    AppType: string;
    MinCu: number;
  };
  Description?: string;
  Network?: Array<{
    Type: string;
    Enabled: boolean;
    WhiteIpGroup?: Array<{
      GroupName: string;
      Ips: string[];
    }>;
  }>;
  ChargeType?: string;
  RegionId?: string;
};

export type EsInfo = {
  AppId?: string;
  AppName?: string;
  AppVersion?: string;
  Status?: string;
  Description?: string;
  CreateTime?: number;
  ModifiedTime?: number;
  RegionId?: string;
  QuotaInfo?: {
    AppType?: string;
    MinCu?: number;
  };
  Network?: Array<{
    Type?: string;
    Enabled?: boolean;
    WhiteIpGroup?: Array<{
      GroupName?: string;
      Ips?: string[];
    }>;
    Endpoint?: string;
  }>;
};

export const createEsOperations = (_esClient: EsClient, _context: Context) => {
  const operations = {
    createApp: async (_config: EsConfig): Promise<string> => {
      // Note: Elasticsearch Serverless API support is limited.
      // This implementation uses the regular Elasticsearch instance API as a workaround.
      // For production use, consider using ROS API or wait for dedicated serverless SDK.

      throw new Error(
        'Elasticsearch Serverless direct API is not yet supported. ' +
          'Please use ROS-based deployment or wait for dedicated SDK support.',
      );
    },

    getApp: async (_appId: string): Promise<EsInfo | null> => {
      throw new Error(
        'Elasticsearch Serverless direct API is not yet supported. ' +
          'Please use ROS-based deployment or wait for dedicated SDK support.',
      );
    },

    updateApp: async (_appId: string, _config: EsConfig): Promise<void> => {
      throw new Error(
        'Elasticsearch Serverless direct API is not yet supported. ' +
          'Please use ROS-based deployment or wait for dedicated SDK support.',
      );
    },

    deleteApp: async (_appId: string): Promise<void> => {
      throw new Error(
        'Elasticsearch Serverless direct API is not yet supported. ' +
          'Please use ROS-based deployment or wait for dedicated SDK support.',
      );
    },
  };

  return operations;
};

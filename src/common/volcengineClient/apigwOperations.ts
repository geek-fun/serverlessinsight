import { Service } from '@volcengine/openapi';
import type {
  ApigwGroupConfig,
  ApigwGroupInfo,
  ApigwApiConfig,
  ApigwApiInfo,
  ApigwDomainConfig,
} from './types';
import { logger } from '../logger';
import { lang } from '../../lang';

type ApigwSdkClient = Service;

export const createApigwOperations = (client: ApigwSdkClient | null) => {
  if (!client) {
    return {
      createGateway: async (_config: ApigwGroupConfig): Promise<ApigwGroupInfo> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      getGateway: async (_gatewayId: string): Promise<ApigwGroupInfo | null> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      findGatewayByName: async (_gatewayName: string): Promise<ApigwGroupInfo | null> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      updateGateway: async (_gatewayId: string, _config: ApigwGroupConfig): Promise<void> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      deleteGateway: async (_gatewayId: string): Promise<void> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      createApi: async (_config: ApigwApiConfig): Promise<string> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      getApi: async (_gatewayId: string, _apiId: string): Promise<ApigwApiInfo | null> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      updateApi: async (_apiId: string, _config: ApigwApiConfig): Promise<void> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      deleteApi: async (_gatewayId: string, _apiId: string): Promise<void> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      deployApi: async (_gatewayId: string, _apiId: string): Promise<void> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      bindDomain: async (_config: ApigwDomainConfig): Promise<void> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
      unbindDomain: async (_gatewayId: string, _domainName: string): Promise<void> => {
        throw new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED'));
      },
    };
  }

  return {
    createGateway: async (config: ApigwGroupConfig): Promise<ApigwGroupInfo> => {
      logger.info(lang.__('VOLCENGINE_CREATING_APIGW', { gatewayName: config.groupName }));

      const params = {
        Name: config.groupName,
        ...(config.description && { Description: config.description }),
        ...(config.protocol && { Protocol: config.protocol }),
      };

      const response = await client.fetchOpenAPI({
        Action: 'CreateGateway',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: params,
      });

      const data = (response.Result || {}) as Record<string, unknown>;

      return {
        gatewayId: data.GatewayId as string | undefined,
        gatewayName: data.Name as string | undefined,
        protocol: data.Protocol as string | undefined,
        status: data.Status as string | undefined,
        createdTime: data.CreatedTime as string | undefined,
        description: data.Description as string | undefined,
        subDomain: data.SubDomain as string | undefined,
      };
    },

    getGateway: async (gatewayId: string): Promise<ApigwGroupInfo | null> => {
      try {
        const response = await client.fetchOpenAPI({
          Action: 'GetGateway',
          Version: '2021-03-03',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { GatewayId: gatewayId },
        });

        const data = (response.Result || {}) as Record<string, unknown>;

        return {
          gatewayId: data.GatewayId as string | undefined,
          gatewayName: data.Name as string | undefined,
          protocol: data.Protocol as string | undefined,
          status: data.Status as string | undefined,
          createdTime: data.CreatedTime as string | undefined,
          description: data.Description as string | undefined,
          subDomain: data.SubDomain as string | undefined,
        };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'ResourceNotFound' || error.code === 'GatewayNotFound') {
            return null;
          }
        }
        throw error;
      }
    },

    findGatewayByName: async (gatewayName: string): Promise<ApigwGroupInfo | null> => {
      const response = await client.fetchOpenAPI({
        Action: 'ListGateways',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { Name: gatewayName },
      });

      const result = (response.Result || {}) as Record<string, unknown>;
      const gateways = (result.Gateways || []) as Array<Record<string, unknown>>;

      const gateway = gateways.find((g) => g.Name === gatewayName);
      if (!gateway) return null;

      return {
        gatewayId: gateway.GatewayId as string | undefined,
        gatewayName: gateway.Name as string | undefined,
        protocol: gateway.Protocol as string | undefined,
        status: gateway.Status as string | undefined,
        createdTime: gateway.CreatedTime as string | undefined,
        description: gateway.Description as string | undefined,
        subDomain: gateway.SubDomain as string | undefined,
      };
    },

    updateGateway: async (gatewayId: string, config: ApigwGroupConfig): Promise<void> => {
      const params = {
        GatewayId: gatewayId,
        Name: config.groupName,
        ...(config.description && { Description: config.description }),
        ...(config.protocol && { Protocol: config.protocol }),
      };

      await client.fetchOpenAPI({
        Action: 'UpdateGateway',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: params,
      });
    },

    deleteGateway: async (gatewayId: string): Promise<void> => {
      logger.info(lang.__('VOLCENGINE_DELETING_APIGW', { gatewayName: gatewayId }));

      await client.fetchOpenAPI({
        Action: 'DeleteGateway',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { GatewayId: gatewayId },
      });
    },

    createApi: async (config: ApigwApiConfig): Promise<string> => {
      const params = {
        GatewayId: config.gatewayId,
        Name: config.apiName,
        Method: config.method,
        Path: config.path,
        BackendType: 'Function',
        BackendConfig: {
          FunctionName: config.backendFunctionName,
          Timeout: config.requestTimeout ?? 60,
        },
      };

      const response = await client.fetchOpenAPI({
        Action: 'CreateApi',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: params,
      });

      const data = (response.Result || {}) as Record<string, unknown>;
      return data.ApiId as string;
    },

    getApi: async (gatewayId: string, apiId: string): Promise<ApigwApiInfo | null> => {
      try {
        const response = await client.fetchOpenAPI({
          Action: 'GetApi',
          Version: '2021-03-03',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { GatewayId: gatewayId, ApiId: apiId },
        });

        const data = (response.Result || {}) as Record<string, unknown>;
        const backendConfig = (data.BackendConfig || {}) as Record<string, unknown>;

        return {
          apiId: data.ApiId as string | undefined,
          apiName: data.Name as string | undefined,
          gatewayId: data.GatewayId as string | undefined,
          method: data.Method as string | undefined,
          path: data.Path as string | undefined,
          description: data.Description as string | undefined,
          backendType: data.BackendType as string | undefined,
          backendId: data.BackendId as string | undefined,
          backendFunctionName: backendConfig.FunctionName as string | undefined,
          status: data.Status as string | undefined,
          createdTime: data.CreatedTime as string | undefined,
        };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'ResourceNotFound' || error.code === 'ApiNotFound') {
            return null;
          }
        }
        throw error;
      }
    },

    updateApi: async (apiId: string, config: ApigwApiConfig): Promise<void> => {
      const params = {
        ApiId: apiId,
        GatewayId: config.gatewayId,
        Name: config.apiName,
        Method: config.method,
        Path: config.path,
        BackendType: 'Function',
        BackendConfig: {
          FunctionName: config.backendFunctionName,
          Timeout: config.requestTimeout ?? 60,
        },
      };

      await client.fetchOpenAPI({
        Action: 'UpdateApi',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: params,
      });
    },

    deleteApi: async (gatewayId: string, apiId: string): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'DeleteApi',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { GatewayId: gatewayId, ApiId: apiId },
      });
    },

    deployApi: async (gatewayId: string, apiId: string): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'DeployApi',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { GatewayId: gatewayId, ApiId: apiId, Stage: 'RELEASE' },
      });
    },

    bindDomain: async (config: ApigwDomainConfig): Promise<void> => {
      const params = {
        GatewayId: config.gatewayId,
        DomainName: config.domainName,
        ...(config.certificateId && { CertificateId: config.certificateId }),
      };

      await client.fetchOpenAPI({
        Action: 'BindDomain',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: params,
      });

      logger.info(lang.__('APIGW_DOMAIN_BOUND_SUCCESS', { domain: config.domainName }));
    },

    unbindDomain: async (gatewayId: string, domainName: string): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'UnbindDomain',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { GatewayId: gatewayId, DomainName: domainName },
      });
    },
  };
};

export type ApigwOperations = ReturnType<typeof createApigwOperations>;

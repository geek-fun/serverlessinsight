import { Service } from '@volcengine/openapi';
import type {
  ApigwGatewayConfig,
  ApigwGatewayInfo,
  ApigwServiceConfig,
  ApigwServiceInfo,
  ApigwUpstreamConfig,
  ApigwUpstreamInfo,
  ApigwRouteConfig,
  ApigwRouteInfo,
  ApigwDomainConfig,
} from './types';
import { logger } from '../logger';
import { lang } from '../../lang';
import { pollUntil } from '../polling';

// Gateway provisioning is slow (mirrors the 30-minute Terraform timeout) —
// use a longer, gentler poll window than the 60s SCF default.
const APIGW_POLL_INTERVAL_MS = 10000;
const APIGW_POLL_MAX_ATTEMPTS = 120; // up to 20 minutes

type ApigwSdkClient = Service;

/* istanbul ignore next */ export const createApigwOperations = (client: ApigwSdkClient | null) => {
  if (!client) {
    const notInitialized = <T>(): Promise<T> =>
      Promise.reject(new Error(lang.__('VOLCENGINE_APIGW_CLIENT_NOT_INITIALIZED')));
    return {
      createGateway: async (_c: ApigwGatewayConfig): Promise<ApigwGatewayInfo> => notInitialized(),
      getGateway: async (_id: string): Promise<ApigwGatewayInfo | null> => notInitialized(),
      findGatewayByName: async (_n: string): Promise<ApigwGatewayInfo | null> => notInitialized(),
      findServerlessGateway: async (): Promise<ApigwGatewayInfo | null> => notInitialized(),
      waitForGatewayRunning: async (_id: string): Promise<ApigwGatewayInfo> => notInitialized(),
      updateGateway: async (_id: string, _c: ApigwGatewayConfig): Promise<void> => notInitialized(),
      deleteGateway: async (_id: string): Promise<void> => notInitialized(),
      updateGatewayLog: async (
        _id: string,
        _c: NonNullable<ApigwGatewayConfig['logConfig']>,
      ): Promise<void> => notInitialized(),
      createService: async (_c: ApigwServiceConfig): Promise<string> => notInitialized(),
      getService: async (_id: string): Promise<ApigwServiceInfo | null> => notInitialized(),
      findServiceByName: async (_g: string, _n: string): Promise<ApigwServiceInfo | null> =>
        notInitialized(),
      deleteService: async (_id: string): Promise<void> => notInitialized(),
      createUpstream: async (_c: ApigwUpstreamConfig): Promise<string> => notInitialized(),
      getUpstream: async (_id: string): Promise<ApigwUpstreamInfo | null> => notInitialized(),
      findUpstreamByName: async (_g: string, _n: string): Promise<ApigwUpstreamInfo | null> =>
        notInitialized(),
      deleteUpstream: async (_id: string): Promise<void> => notInitialized(),
      createRoute: async (_c: ApigwRouteConfig): Promise<string> => notInitialized(),
      getRoute: async (_id: string): Promise<ApigwRouteInfo | null> => notInitialized(),
      findRouteByName: async (_s: string, _n: string): Promise<ApigwRouteInfo | null> =>
        notInitialized(),
      listRoutesByService: async (_s: string): Promise<ApigwRouteInfo[]> => notInitialized(),
      deleteRoute: async (_id: string): Promise<void> => notInitialized(),
      createCustomDomain: async (_c: ApigwDomainConfig): Promise<string> => notInitialized(),
      deleteCustomDomain: async (_id: string): Promise<void> => notInitialized(),
    };
  }

  const region = (client as unknown as { region?: string }).region ?? 'cn-beijing';

  const parseGateway = (data: Record<string, unknown>): ApigwGatewayInfo => {
    const networkSpec = data.NetworkSpec as Record<string, unknown> | undefined;
    const backendSpec = data.BackendSpec as Record<string, unknown> | undefined;
    const monitorSpec = data.MonitorSpec as Record<string, unknown> | undefined;
    const logSpec = data.LogSpec as Record<string, unknown> | undefined;
    const resourceSpec = data.ResourceSpec as Record<string, unknown> | undefined;
    const networkType = resourceSpec?.NetworkType as Record<string, unknown> | undefined;
    return {
      gatewayId: data.Id as string | undefined,
      gatewayName: data.Name as string | undefined,
      type: data.Type as string | undefined,
      status: data.Status as string | undefined,
      createdTime: data.CreatedTime as string | undefined,
      // The provider returns the gateway description under `Comments` (not
      // `Description`) — reading the wrong key left it always undefined.
      description:
        (data.Comments as string | undefined) ?? (data.Description as string | undefined),
      message: data.Message as string | undefined,
      tags: (data.Tags as Array<{ Key: string; Value: string }> | undefined)?.map((t) => ({
        Key: t.Key,
        Value: t.Value,
      })),
      region: data.Region as string | undefined,
      version: data.Version as string | undefined,
      projectName: data.ProjectName as string | undefined,
      networkSpec: networkSpec
        ? {
            vpcId: networkSpec.VpcId as string | undefined,
            subnetIds: networkSpec.SubnetIds as string[] | undefined,
          }
        : undefined,
      backendSpec: backendSpec
        ? {
            isVkeWithFlannelCniSupported: backendSpec.IsVkeWithFlannelCNISupported as
              boolean | undefined,
            vkePodCidr: backendSpec.VkePodCidr as string | undefined,
          }
        : undefined,
      monitorSpec: monitorSpec
        ? {
            enable: monitorSpec.Enable as boolean | undefined,
            workspaceId: monitorSpec.WorkspaceId as string | undefined,
          }
        : undefined,
      logSpec: logSpec
        ? {
            enable: logSpec.Enable as boolean | undefined,
            projectId: logSpec.ProjectId as string | undefined,
            topicId: logSpec.TopicId as string | undefined,
          }
        : undefined,
      resourceSpec: resourceSpec
        ? {
            replicas: resourceSpec.Replicas as number | undefined,
            instanceSpecCode: resourceSpec.InstanceSpecCode as string | undefined,
            clbSpecCode: resourceSpec.ClbSpecCode as string | undefined,
            publicNetworkBillingType: resourceSpec.PublicNetworkBillingType as string | undefined,
            publicNetworkBandwidth: resourceSpec.PublicNetworkBandwidth as number | undefined,
            networkType: networkType
              ? {
                  enablePublicNetwork: networkType.EnablePublicNetwork as boolean | undefined,
                  enablePrivateNetwork: networkType.EnablePrivateNetwork as boolean | undefined,
                }
              : undefined,
          }
        : undefined,
    };
  };

  // apig 无 GetGateway action；唯一读取是 ListGateways，项 ID 字段为 `Id`
  // （对齐官方 terraform-provider-volcengine apig_gateway 实现）
  const listGateways = async (filter: Record<string, unknown>): Promise<ApigwGatewayInfo[]> => {
    const response = await client.fetchOpenAPI({
      Action: 'ListGateways',
      Version: '2021-03-03',
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: { Filter: filter, Region: region },
    });
    const result = (response.Result || {}) as Record<string, unknown>;
    const items = (result.Items ?? []) as Array<Record<string, unknown>>;
    return items.map(parseGateway);
  };

  return {
    createGateway: async (config: ApigwGatewayConfig): Promise<ApigwGatewayInfo> => {
      logger.info(lang.__('VOLCENGINE_CREATING_APIGW', { gatewayName: config.gatewayName }));

      const params: Record<string, unknown> = {
        Name: config.gatewayName,
        Region: region,
        Type: config.type ?? 'serverless',
        // NetworkSpec (VPC + subnets) is REQUIRED by CreateGateway even for
        // serverless gateways — verified live: omitting it returns
        // "missing NetworkSpec parameter". ResourceSpec is optional; when
        // present its InstanceSpecCode/Replicas become mandatory.
        ...(config.network && {
          NetworkSpec: { VpcId: config.network.vpcId, SubnetIds: config.network.subnetIds },
        }),
        ...(config.description && { Comments: config.description }),
        ...(config.Tags && { Tags: config.Tags }),
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
        gatewayId: data.Id as string | undefined,
        gatewayName: config.gatewayName,
        type: config.type ?? 'serverless',
      };
    },

    getGateway: async (gatewayId: string): Promise<ApigwGatewayInfo | null> => {
      const gateways = await listGateways({ Ids: [gatewayId] });
      return gateways[0] ?? null;
    },

    findGatewayByName: async (gatewayName: string): Promise<ApigwGatewayInfo | null> => {
      const gateways = await listGateways({ Name: gatewayName });
      const match = gateways.find((g) => g.gatewayName === gatewayName);
      return match ?? null;
    },

    findServerlessGateway: async (): Promise<ApigwGatewayInfo | null> => {
      const gateways = await listGateways({ Type: 'serverless' });
      return gateways.find((g) => g.type === 'serverless') ?? null;
    },

    // Gateway creation is async — downstream calls (service/upstream/route)
    // are rejected until the instance reaches Running.
    waitForGatewayRunning: async (gatewayId: string): Promise<ApigwGatewayInfo> => {
      const TERMINAL_FAILED_STATUSES = ['Failed', 'CreatedFailed', 'CreationFailed', 'Error'];
      const gateway = await pollUntil({
        description: `API Gateway ${gatewayId} to be Running`,
        fetch: async () => {
          const gateways = await listGateways({ Ids: [gatewayId] });
          const info = gateways[0] ?? null;
          if (info && TERMINAL_FAILED_STATUSES.includes(info.status ?? '')) {
            const reason = info.message
              ? `: ${info.message}`
              : ` (status ${info.status}) — check the Volcengine console for the gateway instance`;
            throw new Error(`API Gateway ${gatewayId} creation failed${reason}`);
          }
          return info;
        },
        isDone: (info) => info?.status === 'Running',
        intervalMs: APIGW_POLL_INTERVAL_MS,
        maxAttempts: APIGW_POLL_MAX_ATTEMPTS,
        onProgress: (info, attempt, maxAttempts) => {
          logger.info(
            lang.__('VOLCENGINE_APIGW_WAITING_RUNNING', {
              gatewayName: info?.gatewayName ?? gatewayId,
              status: info?.status ?? 'unknown',
              attempt: String(attempt),
              maxAttempts: String(maxAttempts),
            }),
          );
        },
      });
      if (!gateway) {
        throw new Error(`API Gateway ${gatewayId} disappeared while waiting for Running`);
      }
      return gateway;
    },

    updateGateway: async (gatewayId: string, config: ApigwGatewayConfig): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'UpdateGateway',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          Id: gatewayId,
          ...(config.description && { Comments: config.description }),
        },
      });
    },

    updateGatewayLog: async (
      gatewayId: string,
      logConfig: NonNullable<ApigwGatewayConfig['logConfig']>,
    ): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'UpdateGatewayLog',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          Id: gatewayId,
          LogSpec: {
            Enable: logConfig.enable,
            ...(logConfig.projectId && { ProjectId: logConfig.projectId }),
            ...(logConfig.topicId && { TopicId: logConfig.topicId }),
          },
        },
      });

      if (logConfig.enable) {
        logger.info(lang.__('APIGW_LOG_ENABLED', { gatewayId }));
      } else {
        logger.info(lang.__('APIGW_LOG_DISABLED', { gatewayId }));
      }
    },

    deleteGateway: async (gatewayId: string): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'DeleteGateway',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { Id: gatewayId },
      });
    },

    createService: async (config: ApigwServiceConfig): Promise<string> => {
      logger.info(
        lang.__('VOLCENGINE_CREATING_APIGW_SERVICE', { serviceName: config.serviceName }),
      );

      const response = await client.fetchOpenAPI({
        Action: 'CreateGatewayService',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          GatewayId: config.gatewayId,
          ServiceName: config.serviceName,
          Protocol: config.protocol ?? ['HTTP'],
          AuthSpec: { Enable: false },
          ...(config.description && { Comments: config.description }),
        },
      });

      const data = (response.Result || {}) as Record<string, unknown>;
      return (data.Id as string) ?? '';
    },

    getService: async (serviceId: string): Promise<ApigwServiceInfo | null> => {
      try {
        const response = await client.fetchOpenAPI({
          Action: 'GetGatewayService',
          Version: '2021-03-03',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { Id: serviceId },
        });

        const result = (response.Result || {}) as Record<string, unknown>;
        const data = (result.GatewayService ?? {}) as Record<string, unknown>;
        const authSpec = data.AuthSpec as Record<string, unknown> | undefined;
        return {
          serviceId: data.Id as string | undefined,
          serviceName: data.Name as string | undefined,
          gatewayId: data.GatewayId as string | undefined,
          status: data.Status as string | undefined,
          protocol: data.Protocol as string[] | undefined,
          createdTime: data.CreateTime as string | undefined,
          gatewayName: data.GatewayName as string | undefined,
          message: data.Message as string | undefined,
          comments:
            (data.Comments as string | undefined) ?? (data.Description as string | undefined),
          authSpec: authSpec ? { enable: authSpec.Enable as boolean | undefined } : undefined,
          domains: (data.Domains as Array<Record<string, unknown>> | undefined)?.map((d) => ({
            domain: d.Domain as string | undefined,
            type: d.Type as string | undefined,
          })),
          customDomains: (data.CustomDomains as Array<Record<string, unknown>> | undefined)?.map(
            (d) => ({
              id: d.Id as string | undefined,
              domain: d.Domain as string | undefined,
            }),
          ),
        };
      } catch (error) {
        const err = error as { code?: string };
        if (err.code === 'NotFound' || err.code === 'ServiceNotFound') {
          return null;
        }
        throw error;
      }
    },

    findServiceByName: async (
      gatewayId: string,
      serviceName: string,
    ): Promise<ApigwServiceInfo | null> => {
      const response = await client.fetchOpenAPI({
        Action: 'ListGatewayServices',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { GatewayId: gatewayId, Filter: { Name: serviceName } },
      });

      const result = (response.Result || {}) as Record<string, unknown>;
      const items = (result.Items ?? []) as Array<Record<string, unknown>>;
      const match = items.find((s) => s.Name === serviceName);
      if (!match) {
        return null;
      }
      const authSpec = match.AuthSpec as Record<string, unknown> | undefined;
      return {
        serviceId: match.Id as string | undefined,
        serviceName: match.Name as string | undefined,
        gatewayId: match.GatewayId as string | undefined,
        status: match.Status as string | undefined,
        protocol: match.Protocol as string[] | undefined,
        createdTime: match.CreateTime as string | undefined,
        gatewayName: match.GatewayName as string | undefined,
        message: match.Message as string | undefined,
        comments:
          (match.Comments as string | undefined) ?? (match.Description as string | undefined),
        authSpec: authSpec ? { enable: authSpec.Enable as boolean | undefined } : undefined,
        domains: (match.Domains as Array<Record<string, unknown>> | undefined)?.map((d) => ({
          domain: d.Domain as string | undefined,
          type: d.Type as string | undefined,
        })),
        customDomains: (match.CustomDomains as Array<Record<string, unknown>> | undefined)?.map(
          (d) => ({
            id: d.Id as string | undefined,
            domain: d.Domain as string | undefined,
          }),
        ),
      };
    },

    deleteService: async (serviceId: string): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'DeleteGatewayService',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { Id: serviceId },
      });
    },

    createUpstream: async (config: ApigwUpstreamConfig): Promise<string> => {
      logger.info(
        lang.__('VOLCENGINE_CREATING_APIGW_UPSTREAM', { upstreamName: config.upstreamName }),
      );

      const response = await client.fetchOpenAPI({
        Action: 'CreateUpstream',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          Name: config.upstreamName,
          GatewayId: config.gatewayId,
          SourceType: config.sourceType,
          Protocol: config.protocol ?? 'HTTP',
          UpstreamSpec: {
            // VeFaas 是单对象（非数组），内含 FunctionId
            VeFaas: { FunctionId: config.functionId },
          },
        },
      });

      const data = (response.Result || {}) as Record<string, unknown>;
      return (data.Id as string) ?? '';
    },

    getUpstream: async (upstreamId: string): Promise<ApigwUpstreamInfo | null> => {
      try {
        const response = await client.fetchOpenAPI({
          Action: 'ListUpstreams',
          Version: '2021-03-03',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { Filter: { Ids: [upstreamId] } },
        });

        const result = (response.Result || {}) as Record<string, unknown>;
        const items = (result.Items ?? []) as Array<Record<string, unknown>>;
        const data = items[0];
        if (!data) {
          return null;
        }
        const upstreamSpec = data.UpstreamSpec as Record<string, unknown> | undefined;
        const veFaas = upstreamSpec?.VeFaas as Record<string, unknown> | undefined;
        return {
          upstreamId: data.Id as string | undefined,
          upstreamName: data.Name as string | undefined,
          gatewayId: data.GatewayId as string | undefined,
          status: data.Status as string | undefined,
          sourceType: data.SourceType as string | undefined,
          protocol: data.Protocol as string | undefined,
          functionId: (veFaas?.FunctionId as string | undefined) ?? undefined,
          createdTime: data.CreateTime as string | undefined,
          comments:
            (data.Comments as string | undefined) ?? (data.Description as string | undefined),
          resourceType: data.ResourceType as string | undefined,
          updateTime: data.UpdateTime as string | undefined,
          backendTargetList: (
            data.BackendTargetList as Array<Record<string, unknown>> | undefined
          )?.map((b) => ({
            ip: b.Ip as string | undefined,
            port: b.Port as number | undefined,
            healthStatus: b.HealthStatus as string | undefined,
          })),
        };
      } catch (error) {
        const err = error as { code?: string };
        if (err.code === 'NotFound' || err.code === 'UpstreamNotFound') {
          return null;
        }
        throw error;
      }
    },

    findUpstreamByName: async (
      gatewayId: string,
      upstreamName: string,
    ): Promise<ApigwUpstreamInfo | null> => {
      const response = await client.fetchOpenAPI({
        Action: 'ListUpstreams',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { GatewayId: gatewayId, Filter: { Name: upstreamName } },
      });

      const result = (response.Result || {}) as Record<string, unknown>;
      const items = (result.Items ?? []) as Array<Record<string, unknown>>;
      const match = items.find((u) => u.Name === upstreamName);
      if (!match) {
        return null;
      }
      const upstreamSpec = match.UpstreamSpec as Record<string, unknown> | undefined;
      const veFaas = upstreamSpec?.VeFaas as Record<string, unknown> | undefined;
      return {
        upstreamId: match.Id as string | undefined,
        upstreamName: match.Name as string | undefined,
        gatewayId: match.GatewayId as string | undefined,
        sourceType: match.SourceType as string | undefined,
        protocol: match.Protocol as string | undefined,
        functionId: (veFaas?.FunctionId as string | undefined) ?? undefined,
        status: match.Status as string | undefined,
        createdTime: match.CreateTime as string | undefined,
        comments:
          (match.Comments as string | undefined) ?? (match.Description as string | undefined),
        resourceType: match.ResourceType as string | undefined,
        updateTime: match.UpdateTime as string | undefined,
        backendTargetList: (
          match.BackendTargetList as Array<Record<string, unknown>> | undefined
        )?.map((b) => ({
          ip: b.Ip as string | undefined,
          port: b.Port as number | undefined,
          healthStatus: b.HealthStatus as string | undefined,
        })),
      };
    },

    deleteUpstream: async (upstreamId: string): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'DeleteUpstream',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { Id: upstreamId },
      });
    },

    createRoute: async (config: ApigwRouteConfig): Promise<string> => {
      logger.info(lang.__('VOLCENGINE_CREATING_APIGW_ROUTE', { routeName: config.routeName }));

      const response = await client.fetchOpenAPI({
        Action: 'CreateRoute',
        Version: '2022-11-12',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          Name: config.routeName,
          ServiceId: config.serviceId,
          Enable: true,
          Priority: 0,
          MatchRule: {
            // Path 是单对象（非数组）
            Path: { MatchType: 'Exact', MatchContent: config.path },
            Method: [config.method],
          },
          UpstreamList: [{ UpstreamId: config.upstreamId, Weight: 100 }],
        },
      });

      const data = (response.Result || {}) as Record<string, unknown>;
      return (data.Id as string) ?? '';
    },

    findRouteByName: async (
      serviceId: string,
      routeName: string,
    ): Promise<ApigwRouteInfo | null> => {
      const response = await client.fetchOpenAPI({
        Action: 'ListRoutes',
        Version: '2022-11-12',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { Filter: { ServiceId: serviceId } },
      });
      const result = (response.Result || {}) as Record<string, unknown>;
      const items = (result.Items ?? []) as Array<Record<string, unknown>>;
      const match = items.find((r) => r.Name === routeName);
      if (!match) {
        return null;
      }
      const matchRule = match.MatchRule as Record<string, unknown> | undefined;
      const path = matchRule?.Path as Record<string, unknown> | undefined;
      const upstreamList = match.UpstreamList as Array<Record<string, unknown>> | undefined;
      return {
        routeId: match.Id as string | undefined,
        routeName: match.Name as string | undefined,
        serviceId: match.ServiceId as string | undefined,
        status: match.Status as string | undefined,
        enable: match.Enable as boolean | undefined,
        priority: match.Priority as number | undefined,
        method: (matchRule?.Method as string[] | undefined)?.[0],
        path: path?.MatchContent as string | undefined,
        upstreamIds: upstreamList?.map((u) => u.UpstreamId as string),
        matchRule: matchRule
          ? {
              method: matchRule.Method as string[] | undefined,
              path: path
                ? {
                    matchType: path.MatchType as string | undefined,
                    matchContent: path.MatchContent as string | undefined,
                  }
                : undefined,
            }
          : undefined,
        upstreamList: upstreamList?.map((u) => ({
          upstreamId: u.UpstreamId as string | undefined,
          version: u.Version as string | undefined,
          weight: u.Weight as number | undefined,
        })),
      };
    },

    getRoute: async (routeId: string): Promise<ApigwRouteInfo | null> => {
      try {
        const response = await client.fetchOpenAPI({
          Action: 'GetRoute',
          Version: '2022-11-12',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { Id: routeId },
        });

        const result = (response.Result || {}) as Record<string, unknown>;
        const data = (result.Route ?? {}) as Record<string, unknown>;
        const matchRule = data.MatchRule as Record<string, unknown> | undefined;
        const path = matchRule?.Path as Record<string, unknown> | undefined;
        const upstreamList = data.UpstreamList as Array<Record<string, unknown>> | undefined;
        return {
          routeId: data.Id as string | undefined,
          routeName: data.Name as string | undefined,
          serviceId: data.ServiceId as string | undefined,
          status: data.Status as string | undefined,
          enable: data.Enable as boolean | undefined,
          priority: data.Priority as number | undefined,
          method: (matchRule?.Method as string[] | undefined)?.[0],
          path: path?.MatchContent as string | undefined,
          upstreamIds: upstreamList?.map((u) => u.UpstreamId as string),
          matchRule: matchRule
            ? {
                method: matchRule.Method as string[] | undefined,
                path: path
                  ? {
                      matchType: path.MatchType as string | undefined,
                      matchContent: path.MatchContent as string | undefined,
                    }
                  : undefined,
              }
            : undefined,
          upstreamList: upstreamList?.map((u) => ({
            upstreamId: u.UpstreamId as string | undefined,
            version: u.Version as string | undefined,
            weight: u.Weight as number | undefined,
          })),
        };
      } catch (error) {
        const err = error as { code?: string };
        if (err.code === 'NotFound' || err.code === 'RouteNotFound') {
          return null;
        }
        throw error;
      }
    },

    listRoutesByService: async (serviceId: string): Promise<ApigwRouteInfo[]> => {
      const response = await client.fetchOpenAPI({
        Action: 'ListRoutes',
        Version: '2022-11-12',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { Filter: { ServiceId: serviceId } },
      });

      const result = (response.Result || {}) as Record<string, unknown>;
      const items = (result.Items ?? []) as Array<Record<string, unknown>>;
      return items.map((r) => {
        const matchRule = r.MatchRule as Record<string, unknown> | undefined;
        const path = matchRule?.Path as Record<string, unknown> | undefined;
        const upstreamList = r.UpstreamList as Array<Record<string, unknown>> | undefined;
        return {
          routeId: r.Id as string | undefined,
          routeName: r.Name as string | undefined,
          serviceId: r.ServiceId as string | undefined,
          status: r.Status as string | undefined,
          enable: r.Enable as boolean | undefined,
          priority: r.Priority as number | undefined,
          method: (matchRule?.Method as string[] | undefined)?.[0],
          path: path?.MatchContent as string | undefined,
          upstreamIds: upstreamList?.map((u) => u.UpstreamId as string),
          matchRule: matchRule
            ? {
                method: matchRule.Method as string[] | undefined,
                path: path
                  ? {
                      matchType: path.MatchType as string | undefined,
                      matchContent: path.MatchContent as string | undefined,
                    }
                  : undefined,
              }
            : undefined,
          upstreamList: upstreamList?.map((u) => ({
            upstreamId: u.UpstreamId as string | undefined,
            version: u.Version as string | undefined,
            weight: u.Weight as number | undefined,
          })),
        };
      });
    },

    deleteRoute: async (routeId: string): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'DeleteRoute',
        Version: '2022-11-12',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { Id: routeId },
      });
    },

    createCustomDomain: async (config: ApigwDomainConfig): Promise<string> => {
      const response = await client.fetchOpenAPI({
        Action: 'CreateCustomDomain',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          ServiceId: config.serviceId,
          Domain: config.domainName,
          ...(config.certificateId && { CertificateId: config.certificateId }),
        },
      });

      const data = (response.Result || {}) as Record<string, unknown>;
      return (data.Id as string) ?? '';
    },

    deleteCustomDomain: async (domainId: string): Promise<void> => {
      await client.fetchOpenAPI({
        Action: 'DeleteCustomDomain',
        Version: '2021-03-03',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: { Id: domainId },
      });
    },
  };
};

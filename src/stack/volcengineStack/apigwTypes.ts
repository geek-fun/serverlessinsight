import {
  buildVolcengineRouteName,
  getContext,
  getIacDefinition,
  isFunctionDomain,
  logger,
} from '../../common';
import type {
  ApigwGatewayConfig,
  ApigwServiceConfig,
  ApigwUpstreamConfig,
  ApigwRouteConfig,
} from '../../common/volcengineClient/types';
import type { EventDomain, ResourceAttributes } from '../../types';
import { lang } from '../../lang';

/**
 * Gateway instance name — reused for find-by-name adoption across deploys.
 */
export const buildGatewayName = (serviceName: string, stage: string): string =>
  `${serviceName}-${stage}-apigw`.replace(/_/g, '-');

export const buildServiceName = (event: EventDomain, stage: string): string =>
  `${event.name}-${stage}-service`.replace(/_/g, '-');

export const buildUpstreamName = (
  event: EventDomain,
  backendRef: string,
  stage: string,
): string => {
  const fnKey = resolveFunctionKey(backendRef);
  return `${event.name}-${stage}-upstream-${fnKey.replace(/_/g, '-')}`;
};

export const buildRouteName = (event: EventDomain, method: string, path: string): string =>
  buildVolcengineRouteName(event.name, method, path);

/**
 * Resolves a function reference like ${functions.xxx} to the actual function name
 */
const resolveFunctionReference = (backendRef: string): string => {
  const context = getContext();
  if (!context.iac) {
    logger.warn(lang.__('CANNOT_RESOLVE_FUNCTION_REF', { backendRef }));
    return backendRef;
  }

  const functionDef = getIacDefinition(context.iac, backendRef);

  if (!functionDef || !isFunctionDomain(functionDef)) {
    logger.warn(lang.__('FUNCTION_REF_NOT_RESOLVED', { backendRef }));
    return backendRef;
  }

  return functionDef.name;
};

/**
 * Extracts the function key (e.g. 'api_function') from a ${functions.xxx} backend ref.
 */
export const resolveFunctionKey = (backendRef: string): string => {
  const match = /^\$\{functions\.([\w.]+)}$/.exec(String(backendRef ?? ''));
  return match?.[1] ?? backendRef;
};

export const eventToApigwGatewayConfig = (
  event: EventDomain,
  serviceName: string,
  stage: string,
  ownershipValue: string,
): ApigwGatewayConfig => {
  return {
    gatewayName: buildGatewayName(serviceName, stage),
    type: 'serverless',
    ...(event.network && {
      network: { vpcId: event.network.vpc_id, subnetIds: event.network.subnet_ids },
    }),
    logConfig: event.log ? { enable: true, projectId: '', topicId: '' } : undefined,
    Tags: [{ Key: 'si-owned-by', Value: ownershipValue }],
  };
};

export const eventToApigwServiceConfig = (
  event: EventDomain,
  serviceName: string,
  stage: string,
  gatewayId: string,
): ApigwServiceConfig => {
  return {
    gatewayId,
    serviceName: buildServiceName(event, stage),
    protocol: ['HTTP'],
    description: `API Gateway for ${serviceName}`,
  };
};

export const triggerToApigwUpstreamConfig = (
  event: EventDomain,
  trigger: EventDomain['triggers'][0],
  serviceName: string,
  stage: string,
  gatewayId: string,
  functionId: string,
): ApigwUpstreamConfig => {
  return {
    gatewayId,
    upstreamName: buildUpstreamName(event, String(trigger.backend), stage),
    sourceType: 'VeFaas',
    functionId,
    protocol: 'HTTP',
  };
};

export const triggerToApigwRouteConfig = (
  event: EventDomain,
  trigger: EventDomain['triggers'][0],
  serviceId: string,
  upstreamId: string,
): ApigwRouteConfig => {
  return {
    serviceId,
    routeName: buildRouteName(event, String(trigger.method), String(trigger.path)),
    method: trigger.method as ApigwRouteConfig['method'],
    path: String(trigger.path),
    upstreamId,
  };
};

export const extractEventDomainDefinition = (
  event: EventDomain,
): {
  gatewayName: string;
  network?: { vpcId: string; subnetIds: string[] };
  logEnabled: boolean;
  logConfig?: { project: string; topic: string };
  triggers: Array<{ method: string; path: string; backend: string }>;
  domain?: { domainName?: string; certificateId?: string };
} => {
  const context = getContext();
  return {
    gatewayName: event.name,
    ...(event.network && {
      network: { vpcId: event.network.vpc_id, subnetIds: event.network.subnet_ids },
    }),
    logEnabled: event.log === true || event.log === 'true',
    ...(event.log && context
      ? {
          logConfig: {
            project: `${context.app}-${context.stage}-tls`,
            topic: `${context.service}-${context.stage}-apigw-logs`,
          },
        }
      : {}),
    triggers: event.triggers.map((t) => ({
      method: String(t.method),
      path: String(t.path),
      backend: String(t.backend),
    })),
    domain: event.domain
      ? {
          domainName: event.domain.domain_name as string | undefined,
          certificateId: event.domain.certificate_id as string | undefined,
        }
      : undefined,
  };
};

export type EventDomainDefinition = ReturnType<typeof extractEventDomainDefinition>;

export const buildEventResourceDefinition = (event: EventDomain): ResourceAttributes => {
  return extractEventDomainDefinition(event) as unknown as ResourceAttributes;
};

export { resolveFunctionReference };

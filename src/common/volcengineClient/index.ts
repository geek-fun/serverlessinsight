import { Service } from '@volcengine/openapi';
import { TlsService } from '@volcengine/openapi/lib/services/tls';
import type { OpenApiResponse } from '@volcengine/openapi/lib/base/types';
import type { Context } from '../../types';
import type { VolcengineClient } from './types';
import { createVefaasOperations } from './vefaasOperations';
import { createTosOperations } from './tosOperations';
import { createIamOperations } from './iamOperations';
import { createApigwOperations } from './apigwOperations';
import { createStsOperations } from './stsOperations';
import { createTlsOperations } from './tlsOperations';

export * from './types';
export * from './vefaasOperations';
export * from './tosOperations';
export * from './iamOperations';
export * from './apigwOperations';
export * from './tlsOperations';

/**
 * fetchOpenAPI resolves with { ResponseMetadata: { Error } } on API errors
 * (validateStatus: null) — rethrow with .code so callers' error.code checks work.
 */
const wrapService = <T extends Service>(service: T): T => {
  const fetchOpenAPI = service.fetchOpenAPI.bind(service);
  service.fetchOpenAPI = async <Result>(
    params: Parameters<T['fetchOpenAPI']>[0],
    options?: Parameters<T['fetchOpenAPI']>[1],
  ): Promise<OpenApiResponse<Result>> => {
    const response = await fetchOpenAPI<Result>(params, options);
    const apiError = response?.ResponseMetadata?.Error;
    if (apiError?.Code) {
      const requestId = response?.ResponseMetadata?.RequestId;
      const action = params.Action || '';
      const error = new Error(
        `Volcengine ${action} failed: ${apiError.Code}: ${apiError.Message ?? ''}` +
          (requestId ? ` (RequestId: ${requestId})` : ''),
      ) as Error & {
        code?: string;
        requestId?: string;
        action?: string;
      };
      error.code = apiError.Code;
      error.requestId = requestId;
      error.action = action;
      throw error;
    }
    return response;
  };
  return service;
};

const initializeSdkClients = (context: Context) => {
  const vefaasService = wrapService(
    new Service({
      serviceName: 'vefaas',
      defaultVersion: '2024-06-06',
      accessKeyId: context.accessKeyId,
      secretKey: context.accessKeySecret,
      region: context.region,
      ...(context.securityToken && { sessionToken: context.securityToken }),
    }),
  );

  const tosService = wrapService(
    new Service({
      serviceName: 'tos',
      defaultVersion: '2018-08-01',
      host: `tos-${context.region}.volces.com`,
      accessKeyId: context.accessKeyId,
      secretKey: context.accessKeySecret,
      region: context.region,
      ...(context.securityToken && { sessionToken: context.securityToken }),
    }),
  );

  const iamService = wrapService(
    new Service({
      serviceName: 'iam',
      defaultVersion: '2024-01-01',
      accessKeyId: context.accessKeyId,
      secretKey: context.accessKeySecret,
      region: context.region,
      ...(context.securityToken && { sessionToken: context.securityToken }),
    }),
  );

  const tlsService = new TlsService({
    region: context.region,
    host: `tls-${context.region}.volces.com`,
    accessKeyId: context.accessKeyId,
    secretKey: context.accessKeySecret,
    ...(context.securityToken && { sessionToken: context.securityToken }),
  });

  const apigwService = wrapService(
    new Service({
      serviceName: 'apig',
      defaultVersion: '2021-03-03',
      accessKeyId: context.accessKeyId,
      secretKey: context.accessKeySecret,
      region: context.region,
      ...(context.securityToken && { sessionToken: context.securityToken }),
    }),
  );

  const stsService = wrapService(
    new Service({
      serviceName: 'sts',
      defaultVersion: '2018-01-01',
      accessKeyId: context.accessKeyId,
      secretKey: context.accessKeySecret,
      region: context.region,
      ...(context.securityToken && { sessionToken: context.securityToken }),
    }),
  );

  return {
    vefaas: vefaasService,
    tos: tosService,
    iam: iamService,
    tls: tlsService,
    apigw: apigwService,
    sts: stsService,
  };
};

export const createVolcengineClient = (context: Context): VolcengineClient => {
  const sdkClients = initializeSdkClients(context);

  return {
    vefaas: createVefaasOperations(sdkClients.vefaas),
    tos: createTosOperations(sdkClients.tos, context.region),
    iam: createIamOperations(sdkClients.iam),
    tls: createTlsOperations(sdkClients.tls),
    apigw: createApigwOperations(sdkClients.apigw),
    sts: createStsOperations(sdkClients.sts),
  };
};

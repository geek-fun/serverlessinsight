import { Service } from '@volcengine/openapi';
import type { Context } from '../../types';
import type { VolcengineClient } from './types';
import { createVefaasOperations } from './vefaasOperations';
import { createTosOperations } from './tosOperations';
import { createIamOperations } from './iamOperations';
import { createApigwOperations } from './apigwOperations';
import { createTlsOperations } from './tlsOperations';

export * from './types';
export * from './vefaasOperations';
export * from './tosOperations';
export * from './iamOperations';
export * from './apigwOperations';
export * from './tlsOperations';

const initializeSdkClients = (context: Context) => {
  const vefaasService = new Service({
    serviceName: 'vefaas',
    defaultVersion: '2024-06-06',
    protocol: 'https',
    host: 'vefaas.volcengineapi.com',
    accessKeyId: context.accessKeyId,
    secretKey: context.accessKeySecret,
    region: context.region,
    ...(context.securityToken && { sessionToken: context.securityToken }),
  });

  const tosService = new Service({
    serviceName: 'tos',
    defaultVersion: '2018-08-01',
    protocol: 'https',
    host: `tos-${context.region}.volces.com`,
    accessKeyId: context.accessKeyId,
    secretKey: context.accessKeySecret,
    region: context.region,
    ...(context.securityToken && { sessionToken: context.securityToken }),
  });

  const iamService = new Service({
    serviceName: 'iam',
    defaultVersion: '2024-01-01',
    protocol: 'https',
    host: 'iam.volcengineapi.com',
    accessKeyId: context.accessKeyId,
    secretKey: context.accessKeySecret,
    region: context.region,
    ...(context.securityToken && { sessionToken: context.securityToken }),
  });

  const tlsService = new Service({
    serviceName: 'tls',
    defaultVersion: '2024-01-01',
    protocol: 'https',
    host: `tls.${context.region}.volces.com`,
    accessKeyId: context.accessKeyId,
    secretKey: context.accessKeySecret,
    region: context.region,
    ...(context.securityToken && { sessionToken: context.securityToken }),
  });

  const apigwService = new Service({
    serviceName: 'apig',
    defaultVersion: '2021-03-03',
    protocol: 'https',
    host: 'apig.volcengineapi.com',
    accessKeyId: context.accessKeyId,
    secretKey: context.accessKeySecret,
    region: context.region,
    ...(context.securityToken && { sessionToken: context.securityToken }),
  });

  return {
    vefaas: vefaasService,
    tos: tosService,
    iam: iamService,
    tls: tlsService,
    apigw: apigwService,
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
  };
};

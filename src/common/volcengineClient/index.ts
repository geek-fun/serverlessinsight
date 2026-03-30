import type { Context } from '../../types';
import type { VolcengineClient } from './types';
import { createVefaasOperations } from './vefaasOperations';
import { createTosOperations } from './tosOperations';
import { createIamOperations } from './iamOperations';
import { createApigwOperations } from './apigwOperations';

export * from './types';
export * from './vefaasOperations';
export * from './tosOperations';
export * from './iamOperations';
export * from './apigwOperations';

const initializeSdkClients = (_context: Context) => {
  return {
    vefaas: null,
    tos: null,
    iam: null,
    apigw: null,
  };
};

export const createVolcengineClient = (context: Context): VolcengineClient => {
  const sdkClients = initializeSdkClients(context);

  return {
    vefaas: createVefaasOperations(sdkClients.vefaas),
    tos: createTosOperations(sdkClients.tos, context.region),
    iam: createIamOperations(sdkClients.iam),
    apigw: createApigwOperations(sdkClients.apigw),
  };
};

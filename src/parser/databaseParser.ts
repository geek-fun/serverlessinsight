import { DatabaseDomain, DatabaseEnum, DatabaseRaw, DatabaseVersionEnum } from '../types';
import { get, isEmpty } from 'lodash';

export const parseDatabase = (databases?: {
  [key: string]: DatabaseRaw;
}): Array<DatabaseDomain> | undefined => {
  if (isEmpty(databases)) {
    return undefined;
  }
  return Object.entries(databases)?.map(([key, database]) => ({
    key: key,
    name: database.name,
    type: database.type as DatabaseEnum,
    version: database.version as DatabaseVersionEnum,
    security: {
      basicAuth: {
        username: get(database, 'security.basic_auth.master_user'),
        password: get(database, 'security.basic_auth.password'),
      },
    },
    cu: {
      min: database.cu?.min ?? 0,
      max: database.cu?.max ?? 6,
    },
    storage: {
      min: database.storage?.min ?? 20,
      max: database.storage?.max,
    },
    network: {
      type: database.network?.type ?? 'PRIVATE',
      ingressRules: database.network?.ingress_rules ?? ['0.0.0.0/0'],
      vpcId: database.network?.vpc_id,
      subnetId: database.network?.subnet_id,
    },
  }));
};

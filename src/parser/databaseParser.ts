import { DatabaseDomain, DatabaseEnum, DatabaseRaw, DatabaseVersionEnum } from '../types';
import { get, isEmpty } from 'lodash';
import { parseNumber, parseOptionalString } from './parseUtils';

export const parseDatabase = (databases?: {
  [key: string]: DatabaseRaw;
}): Array<DatabaseDomain> | undefined => {
  if (isEmpty(databases)) {
    return undefined;
  }
  return Object.entries(databases)?.map(([key, database]) => ({
    key: key,
    name: String(database.name),
    type: String(database.type) as DatabaseEnum,
    version: String(database.version) as DatabaseVersionEnum,
    security: {
      basicAuth: {
        username: parseOptionalString(get(database, 'security.basic_auth.master_user')),
        password: String(get(database, 'security.basic_auth.password') ?? ''),
      },
    },
    cu: {
      min: parseNumber(database.cu?.min, 0),
      max: parseNumber(database.cu?.max, 6),
    },
    storage: {
      min: parseNumber(database.storage?.min, 10),
      max: database.storage?.max ? parseNumber(database.storage.max, 0) : undefined,
    },
    network: {
      type: String(database.network?.type ?? 'PRIVATE') as 'PUBLIC' | 'PRIVATE',
      ingressRules: database.network?.ingress_rules?.map((rule) => String(rule)) ?? ['0.0.0.0/0'],
      vpcId: database.network?.vpc_id ? String(database.network.vpc_id) : undefined,
      subnetId: database.network?.subnet_id ? String(database.network.subnet_id) : undefined,
    },
  }));
};

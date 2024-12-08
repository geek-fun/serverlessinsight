import { DatabaseDomain, DatabaseEnum, DatabaseRaw } from '../types';
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
    version: database.version,
    engineMode: database.engine_mode,
    security: {
      basicAuth: {
        password: get(database, 'security.basic_auth.password'),
      },
    },
    cu: database.cu,
    storageSize: database.storage_size,
    network: database.network && {
      public: database.network?.public as boolean,
    },
  }));
};

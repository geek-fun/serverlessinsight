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
    cu: {
      min: database.cu?.min ?? 0.5,
      max: database.cu?.max ?? 6,
    },
    storage: {
      min: database.storage?.min ?? 20,
    },
    network: database.network && {
      public: database.network?.public as boolean,
    },
  }));
};

import { tableStore } from './tablestore';
import {
  Credentials,
  RequestTypeEnum,
  ResourceEnum,
  ResourceProperties,
  TableStoreResourceProperties,
} from '../tyes';

export const resources: {
  [K in ResourceEnum]: {
    [R in RequestTypeEnum]: (
      props: ResourceProperties<TableStoreResourceProperties>,
      credentials: Credentials,
      regionId: string,
    ) => Promise<{ [key: string]: unknown } | undefined>;
  };
} = {
  [ResourceEnum.TABLE_STORE_C]: {
    CREATE: tableStore.create,
    UPDATE: tableStore.update,
    DELETE: tableStore.delete,
  },
  [ResourceEnum.TABLE_STORE_H]: {
    CREATE: tableStore.create,
    UPDATE: tableStore.update,
    DELETE: tableStore.delete,
  },
};

import { AttributeTypeEnum, KeyTypeEnum, TableDomain, TableRaw } from '../types/domains/table';
import { isEmpty, omitBy, isNil } from 'lodash';

export function parseTable(tablesRaw?: {
  [key: string]: TableRaw;
}): Array<TableDomain> | undefined {
  if (isEmpty(tablesRaw)) {
    return undefined;
  }

  return Object.entries(tablesRaw)?.map(([key, table]) => {
    const throughput = omitBy(
      {
        reserved: omitBy(
          {
            read: table.throughput?.reserved?.read,
            write: table.throughput?.reserved?.write,
          },
          isNil,
        ),
        onDemand: omitBy(
          {
            read: table.throughput?.on_demand?.read,
            write: table.throughput?.on_demand?.write,
          },
          isNil,
        ),
      },
      isEmpty,
    );

    return {
      key,
      collection: table.collection,
      name: table.name,
      type: table.type,
      desc: table.desc,
      network: {
        type: table.network?.type ?? 'PRIVATE',
        ingressRules: table.network?.ingress_rules ?? [],
      },
      throughput: !isEmpty(throughput) ? throughput : undefined,
      keySchema:
        table.key_schema?.map((keySchema) => ({
          name: keySchema.name,
          type: keySchema.type as KeyTypeEnum,
        })) ?? [],
      attributes:
        table.attributes?.map((attribute) => ({
          name: attribute.name,
          type: attribute.type as AttributeTypeEnum,
        })) ?? [],
    };
  });
}

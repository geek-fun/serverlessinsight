import {
  AttributeTypeEnum,
  KeyTypeEnum,
  TableDomain,
  TableEnum,
  TableRaw,
} from '../types/domains/table';
import { isEmpty, omitBy, isNil } from 'lodash';

// Helper to convert Resolvable<number> or string to number
const parseNumber = (value: number | string | undefined): number | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value === 'number') {
    return value;
  }
  const parsed = Number(value);
  return isNaN(parsed) ? undefined : parsed;
};

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
            read: parseNumber(table.throughput?.reserved?.read),
            write: parseNumber(table.throughput?.reserved?.write),
          },
          isNil,
        ),
        onDemand: omitBy(
          {
            read: parseNumber(table.throughput?.on_demand?.read),
            write: parseNumber(table.throughput?.on_demand?.write),
          },
          isNil,
        ),
      },
      isEmpty,
    );

    return {
      key,
      collection: String(table.collection),
      name: String(table.name),
      type: String(table.type) as TableEnum,
      desc: table.desc ? String(table.desc) : undefined,
      network: {
        type: String(table.network?.type ?? 'PRIVATE') as 'PUBLIC' | 'PRIVATE',
        ingressRules: table.network?.ingress_rules?.map((rule) => String(rule)) ?? [],
      },
      throughput: !isEmpty(throughput) ? throughput : undefined,
      keySchema:
        table.key_schema?.map((keySchema) => ({
          name: String(keySchema.name),
          type: String(keySchema.type) as KeyTypeEnum,
        })) ?? [],
      attributes:
        table.attributes?.map((attribute) => ({
          name: String(attribute.name),
          type: String(attribute.type) as AttributeTypeEnum,
        })) ?? [],
    };
  });
}

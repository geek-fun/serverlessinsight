import { rootSchema } from './rootSchema';
import { functionSchema } from './functionSchema';
import { eventSchema } from './eventSchema';
import { databaseSchema } from './databaseSchema';
import { bucketSchema } from './bucketSchema';
import { tableSchema } from './tableschema';

/**
 * Issue #250: export the schemas Ajv compiles against as one self-contained,
 * standard JSON Schema document. The compiled stack uses draft-07 style with
 * external `$ref`s by `$id`; the export bundles every referenced schema under
 * `definitions` and rewrites the refs to local pointers, so the artifact
 * loads in a bare Ajv (or any draft-07 validator) with zero setup — usable as
 * an anchor for structured YAML generation, editor completion, and
 * `si validate` loops.
 */
const REF_TARGETS: Record<string, string> = {
  'https://serverlessinsight.geekfun.club/schemas/functionschema.json': 'functions',
  'https://serverlessinsight.geekfun.club/schemas/eventschema.json': 'events',
  'https://serverlessinsight.geekfun.club/schemas/databaseschema.json': 'databases',
  'https://serverlessinsight.geekfun.club/schemas/bucketschema.json': 'buckets',
  'https://serverlessinsight.geekfun.club/schemas/tableschema.json': 'tables',
};

const rewriteRefs = (node: unknown): void => {
  if (Array.isArray(node)) {
    node.forEach(rewriteRefs);
    return;
  }
  if (node && typeof node === 'object') {
    Object.entries(node).forEach(([key, value]) => {
      if (key === '$ref' && typeof value === 'string' && REF_TARGETS[value]) {
        (node as Record<string, unknown>)['$ref'] = `#/definitions/${REF_TARGETS[value]}`;
        return;
      }
      rewriteRefs(value);
    });
  }
};

export const exportIacJsonSchema = (): Record<string, unknown> => {
  const bundled = {
    ...rootSchema,
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'ServerlessInsight IaC configuration',
    description:
      'JSON Schema for ServerlessInsight serverless IaC YAML files. Use it to generate or ' +
      'complete `serverless-insight.yml` documents; validate results with `si validate`.',
    definitions: {
      functions: functionSchema,
      events: eventSchema,
      databases: databaseSchema,
      buckets: bucketSchema,
      tables: tableSchema,
    },
  };

  const plain = JSON.parse(JSON.stringify(bundled)) as Record<string, unknown>;
  rewriteRefs(plain);
  return plain;
};

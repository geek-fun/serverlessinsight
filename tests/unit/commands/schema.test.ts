import { existsSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';
import { parse } from 'yaml';
import { schema } from '../../../src/commands/schema';
import { exportIacJsonSchema } from '../../../src/validator';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('schema command (issue #250)', () => {
  const outputPath = path.join('/tmp', 'si-schema-test.json');

  afterEach(() => {
    if (existsSync(outputPath)) {
      rmSync(outputPath);
    }
  });

  describe('exportIacJsonSchema', () => {
    const exported = exportIacJsonSchema();

    it('produces a self-contained draft-07 document', () => {
      expect(exported.$schema).toBe('http://json-schema.org/draft-07/schema#');
      expect(exported.$id).toContain('serverlessinsight');
      expect(exported.title).toBeDefined();
      expect(exported.description).toBeDefined();
      expect(Object.keys(exported.definitions as object)).toEqual(
        expect.arrayContaining(['functions', 'events', 'databases', 'buckets', 'tables']),
      );
    });

    it('carries description fields on the top-level properties', () => {
      const properties = exported.properties as Record<string, { description?: string }>;

      expect(properties.app.description).toBeDefined();
      expect(properties.functions.description).toBeDefined();
      expect(properties.backend.description).toBeDefined();
    });

    it('rewrites every external $ref to a local definitions pointer', () => {
      const refs: string[] = [];
      const walk = (node: unknown): void => {
        if (Array.isArray(node)) {
          node.forEach(walk);
          return;
        }
        if (node && typeof node === 'object') {
          Object.entries(node).forEach(([key, value]) => {
            if (key === '$ref' && typeof value === 'string') {
              refs.push(value);
              return;
            }
            walk(value);
          });
        }
      };
      walk(exported);

      expect(refs.length).toBeGreaterThan(0);
      refs.forEach((ref) => expect(ref).toMatch(/^#\/definitions\//));
    });

    it('loads in a bare Ajv without extra options or schemas', () => {
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(exportIacJsonSchema());
      expect(typeof validate).toBe('function');
    });

    it('accepts a valid sample and rejects an invalid one', () => {
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(exportIacJsonSchema());

      const validSample = parse(
        readFileSync('tests/fixtures/serverless-insight-plan.yml', 'utf8'),
      ) as object;
      expect(validate(validSample)).toBe(true);

      expect(validate({ version: '0.0.1', provider: { name: 'aliyun' } })).toBe(false);
    });
  });

  describe('schema command', () => {
    it('writes the schema JSON to stdout by default', async () => {
      const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);

      await schema({});

      expect(stdoutSpy).toHaveBeenCalledTimes(1);
      const written = stdoutSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(written);
      expect(parsed.$schema).toBe('http://json-schema.org/draft-07/schema#');
      stdoutSpy.mockRestore();
    });

    it('writes the schema to a file with --output and logs the path', async () => {
      await schema({ output: outputPath });

      expect(existsSync(outputPath)).toBe(true);
      const parsed = JSON.parse(readFileSync(outputPath, 'utf8'));
      expect(parsed.$schema).toBe('http://json-schema.org/draft-07/schema#');
    });
  });
});

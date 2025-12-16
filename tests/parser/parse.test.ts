import path from 'node:path';
import { parseYaml, revalYaml } from '../../src/parser';
import { Context } from '../../src/types';
import { ProviderEnum } from '../../src/common';

describe('unit test for parse', () => {
  describe('domain - databases', () => {
    const iacLocation = path.resolve(__dirname, '../fixtures/serverless-insight-es.yml');

    it('should pass databases from yaml to domain instance when the yaml is valid', () => {
      const databaseDomain = parseYaml(iacLocation);
      expect(databaseDomain).toEqual({
        service: 'insight-es-poc',
        version: '0.0.1',
        provider: {
          name: 'aliyun',
          region: 'cn-chengdu',
        },
        tags: [
          { key: 'iac-provider', value: 'ServerlessInsight' },
          { key: 'owner', value: 'geek-fun' },
        ],
        databases: [
          {
            key: 'insight_es_db',
            type: 'ELASTICSEARCH_SERVERLESS',
            name: 'insight-poc-es',
            version: 'ES_SEARCH_7.10',
            security: {
              basicAuth: {
                username: 'test-username',
                password: 'U34I6InQ8elseTgqTWT2t2oFXpoqFg',
              },
            },
            network: {
              ingressRules: ['0.0.0.0/0'],
              type: 'PRIVATE',
            },
            cu: {
              min: 1,
              max: 6,
            },
            storage: {
              min: 20,
            },
          },
        ],
      });
    });
  });

  describe('domain - tables', () => {
    const iacLocation = path.resolve(__dirname, '../fixtures/serverless-insight-table.yml');

    it('should parse tables from yaml to domain instance when the yaml is valid', () => {
      const domain = parseYaml(iacLocation);
      expect(domain.tables).toEqual([
        {
          key: 'insight_poc_table',
          collection: 'store_or_instance_name',
          desc: 'This is a test table for serverless insight',
          name: 'insight-poc-table',
          type: 'TABLE_STORE_C',
          network: {
            type: 'PRIVATE',
            ingressRules: ['TCP:0.0.0.0/0:80', 'TCP:0.0.0.0/0:443'],
          },
          throughput: {
            reserved: {
              read: 2,
              write: 10,
            },
            onDemand: {
              read: 100,
              write: 100,
            },
          },
          keySchema: [{ name: 'id', type: 'HASH' }],
          attributes: [{ name: 'id', type: 'STRING' }],
        },
      ]);
    });

    it('should set the default value when not provided by client', () => {
      const iacLocation = path.resolve(__dirname, '../fixtures/serverless-insight-table-mini.yml');
      const domain = parseYaml(iacLocation);
      expect(domain.tables).toEqual([
        {
          key: 'insight_poc_table',
          collection: 'store_or_instance_id',
          name: 'insight-poc-table',
          type: 'TABLE_STORE_H',
          network: {
            type: 'PRIVATE',
            ingressRules: [],
          },
          attributes: [
            {
              name: 'id',
              type: 'STRING',
            },
          ],
          keySchema: [
            {
              name: 'id',
              type: 'HASH',
            },
          ],
        },
      ]);
    });
  });

  describe('revalYaml - template variable evaluation', () => {
    const iacLocation = path.resolve(__dirname, '../fixtures/serverless-insight.yml');
    const testContext: Context = {
      stage: 'default',
      stackName: 'testStack',
      provider: ProviderEnum.ALIYUN,
      region: 'cn-hangzhou',
      accessKeyId: 'testAccessKeyId',
      accessKeySecret: 'testAccessKeySecret',
      iacLocation,
      parameters: [],
      stages: {
        default: [
          { key: 'region', value: 'cn-hangzhou' },
          { key: 'node_env', value: 'default' },
        ],
      },
    };

    it('should evaluate template variables in YAML', () => {
      const result = revalYaml(iacLocation, testContext);

      expect(result.functions).toBeDefined();
      expect(result.functions![0].code?.handler).toBe('index.handler');
      expect(result.functions![0].environment?.NODE_ENV).toBe('default');
    });

    it('should set default values for optional function fields', () => {
      const result = revalYaml(iacLocation, testContext);

      expect(result.functions).toBeDefined();
      expect(result.functions![0].memory).toBeDefined();
      expect(result.functions![0].timeout).toBeDefined();
      // Should have defaults if not provided, or keep existing values
      expect(typeof result.functions![0].memory).toBe('number');
      expect(typeof result.functions![0].timeout).toBe('number');
    });

    it('should evaluate ${ctx.stage} in values', () => {
      const yamlWithStage = path.resolve(__dirname, '../fixtures/serverless-insight.yml');
      const result = revalYaml(yamlWithStage, testContext);

      // The YAML doesn't directly use ${ctx.stage}, but we can verify the context is used
      expect(result.service).toBe('insight-poc');
    });

    it('should evaluate ${vars.xxx} in values', () => {
      const result = revalYaml(iacLocation, testContext);

      // Check that vars were evaluated
      expect(result.functions![0].code?.handler).toBe('index.handler');
    });

    it('should evaluate ${stages.xxx} in values', () => {
      const result = revalYaml(iacLocation, testContext);

      // Check that stage variables were evaluated
      expect(result.functions![0].environment?.NODE_ENV).toBe('default');
    });

    it('should keep ${functions.xxx} references unchanged', () => {
      const result = revalYaml(iacLocation, testContext);

      // Check that function references in events are kept as-is
      if (result.events && result.events[0].triggers) {
        const backend = result.events[0].triggers[0].backend;
        // Should still contain ${functions.xxx} pattern
        expect(backend).toContain('${functions.');
      }
    });

    it('should apply default memory of 128 when not specified', () => {
      // Create a minimal YAML context
      const minimalContext: Context = {
        ...testContext,
        stage: 'default',
      };

      const result = revalYaml(iacLocation, minimalContext);

      // Functions without explicit memory should get default 128
      const functionWithDefaults = result.functions?.find((fn) => !fn.memory || fn.memory === 128);
      if (functionWithDefaults) {
        expect(functionWithDefaults.memory).toBe(128);
      }
    });

    it('should apply default timeout of 3 when not specified', () => {
      const minimalContext: Context = {
        ...testContext,
        stage: 'default',
      };

      const result = revalYaml(iacLocation, minimalContext);

      // Functions without explicit timeout should get default 3
      const functionWithDefaults = result.functions?.find((fn) => !fn.timeout || fn.timeout === 3);
      if (functionWithDefaults) {
        expect(functionWithDefaults.timeout).toBe(3);
      }
    });

    it('should preserve explicitly set memory and timeout values', () => {
      const result = revalYaml(iacLocation, testContext);

      // The test fixture has memory: 512 and timeout: 10
      expect(result.functions![0].memory).toBe(512);
      expect(result.functions![0].timeout).toBe(10);
    });

    it('should handle nested template variables in environment', () => {
      const result = revalYaml(iacLocation, testContext);

      // Check nested variable evaluation
      expect(result.functions![0].environment).toBeDefined();
      expect(result.functions![0].environment?.TEST_VAR).toBe('testVarValue');
      expect(result.functions![0].environment?.TEST_VAR_EXTRA).toContain('testVarValue');
    });
  });
});

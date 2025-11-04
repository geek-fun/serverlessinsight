import path from 'node:path';
import { parseYaml } from '../../src/parser';

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
});

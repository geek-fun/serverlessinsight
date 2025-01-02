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
});

import path from 'node:path';
import { parseYaml } from '../../src/parser';

describe('unit test for parse', () => {
  describe('domain - databases', () => {
    const yamlPath = path.resolve(__dirname, '../fixtures/serverless-insight-es.yml');

    it('should pass databases from yaml to domain instance when the yaml is valid', () => {
      const databaseDomain = parseYaml(yamlPath);
      expect(databaseDomain).toEqual({
        service: 'insight-es-poc',
        version: '0.0.1',
        provider: 'aliyun',
        tags: [
          { key: 'iac-provider', value: 'ServerlessInsight' },
          { key: 'owner', value: 'geek-fun' },
        ],
        databases: [
          {
            key: 'insight_es_db',
            type: 'ELASTICSEARCH_SERVERLESS',
            name: 'insight-poc-es',
            engineMode: 'SEARCH',
            version: '7.10',
            security: {
              basicAuth: {
                password: 'U34I6InQ8elseTgqTWT2t2oFXpoqFg',
              },
            },
            cu: 1,
            storageSize: 20,
          },
        ],
      });
    });
  });
});

import { ProviderEnum } from '../../../src/common';
import { DatabaseEnum, DatabaseVersionEnum, ServerlessIac } from '../../../src/types';

export const esServerlessMinimumIac = {
  service: 'my-demo-es-serverless-service',
  version: '0.0.1',
  provider: {
    name: 'aliyun' as ProviderEnum,
    region: 'cn-hangzhou',
  },
  databases: [
    {
      key: 'insight_es_db_test',
      name: 'insight-poc-es-test',
      type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
      version: DatabaseVersionEnum['ES_SEARCH_7.10'],
      security: {
        basicAuth: {
          username: 'test-username',
          password: 'test-password',
        },
      },
      cu: { min: 1, max: 8 },
      storage: { min: 20 },
    },
  ],
} as unknown as ServerlessIac;

export const esServerlessMinimumRos = {
  Description: 'my-demo-es-serverless-service stack',
  Metadata: { 'ALIYUN::ROS::Interface': { TemplateTags: ['Create by ROS CDK'] } },
  ROSTemplateFormatVersion: '2015-09-01',
  Resources: {
    insight_es_db_test: {
      Properties: {
        AppName: 'insight-poc-es-test',
        AppVersion: '7.10',
        Authentication: {
          BasicAuth: [
            {
              Password: 'test-password',
            },
          ],
        },
        QuotaInfo: {
          AppType: 'STANDARD',
          MinCu: 1,
        },
        Scenario: 'SEARCH',
        // Network: [
        //   {
        //     Enabled: true,
        //     Type: 'PUBLIC_KIBANA',
        //   },
        //   {
        //     Enabled: true,
        //     Type: 'PUBLIC_ES',
        //   },
        // ],
      },
      Type: 'ALIYUN::ElasticSearchServerless::App',
    },
  },
};

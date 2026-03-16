import { TagDomain, Tags } from '../types';

export const parseTag = (
  tags: Tags | undefined,
  app: string = '',
  service: string = '',
  stage: string = '',
): Array<TagDomain> => {
  return [
    { key: 'iac-provider', value: 'ServerlessInsight' },
    { key: 'app', value: app },
    { key: 'service', value: service },
    { key: 'stage', value: stage },
    ...Object.entries(tags ?? {}).map(([key, value]) => ({ key, value })),
  ];
};

import { TagDomain, Tags } from '../types';

export const parseTag = (tags: Tags | undefined): Array<TagDomain> => {
  return [
    { key: 'iac-provider', value: 'ServerlessInsight' },
    ...Object.entries(tags ?? {}).map(([key, value]) => ({ key, value })),
  ];
};

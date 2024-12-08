import { ActionContext, TagDomain, Tags } from '../types';
import { replaceReference } from '../common';

export const parseTag = (tags: Tags | undefined, context: ActionContext): Array<TagDomain> => {
  return [
    { key: 'iac-provider', value: 'ServerlessInsight' },
    ...Object.entries(tags ?? {}).map(([key, value]) => ({
      key: replaceReference(key, context),
      value: replaceReference(value, context),
    })),
  ];
};

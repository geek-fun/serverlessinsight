import { TagDomain, Tags } from '../types';
import { isEmpty } from 'lodash';

export const parseTag = (tags?: Tags): Array<TagDomain> => {
  const tagList = [{ key: 'iac-provider', value: 'ServerlessInsight' }];
  if (isEmpty(tags)) return tagList;

  return [...tagList, ...Object.entries(tags).map(([key, value]) => ({ key, value }))];
};

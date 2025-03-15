import { Context, ServerlessIac } from '../../types';
import { calcRefs } from '../../common';

export const resolveTags = (tags: ServerlessIac['tags'], context: Context) => {
  return tags?.reduce((acc: { [key: string]: string }, tag) => {
    acc[tag.key] = calcRefs(tag.value, context);
    return acc;
  }, {});
};

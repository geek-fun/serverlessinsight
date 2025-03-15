import { Context, ServerlessIac } from '../../types';
import { calcRefers } from '../../common';

export const resolveTags = (tags: ServerlessIac['tags'], context: Context) => {
  return tags?.reduce((acc: { [key: string]: string }, tag) => {
    acc[tag.key] = calcRefers(tag.value, context);
    return acc;
  }, {});
};

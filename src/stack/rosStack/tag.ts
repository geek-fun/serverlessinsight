import { Context, ServerlessIac } from '../../types';
import { replaceReference } from '../../common';

export const resolveTags = (tags: ServerlessIac['tags'], context: Context) => {
  return tags?.reduce((acc: { [key: string]: string }, tag) => {
    acc[tag.key] = replaceReference(tag.value, context);
    return acc;
  }, {});
};

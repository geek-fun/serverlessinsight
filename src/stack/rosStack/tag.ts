import { ActionContext, ServerlessIac } from '../../types';
import { replaceReference } from '../../common';

export const resolveTags = (tags: ServerlessIac['tags'], context: ActionContext) => {
  return tags?.reduce((acc: { [key: string]: string }, tag) => {
    acc[tag.key] = replaceReference(tag.value, context);
    return acc;
  }, {});
};

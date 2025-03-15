import * as ros from '@alicloud/ros-cdk-core';
import { replaceReference } from '../../common';
import { Context, Stages } from '../../types';
import { isEmpty } from 'lodash';

export const resolveStages = (
  scope: ros.Construct,
  stages: Stages | undefined,
  context: Context,
) => {
  if (isEmpty(stages)) {
    return undefined;
  }
  new ros.RosMapping(scope, 'stages', { mapping: replaceReference(stages, context) });
};

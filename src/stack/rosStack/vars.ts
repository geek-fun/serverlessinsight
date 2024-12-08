import * as ros from '@alicloud/ros-cdk-core';
import { RosParameterType } from '@alicloud/ros-cdk-core';
import { Vars } from '../../types';
import { isEmpty } from 'lodash';

export const resloveVars = (scope: ros.Construct, vars: Vars | undefined) => {
  if (isEmpty(vars)) {
    return undefined;
  }

  Object.entries(vars).map(
    ([id, value]) =>
      new ros.RosParameter(scope, id, {
        type: RosParameterType.STRING,
        defaultValue: value,
      }),
  );
};

import { ActionContext, DatabaseDomain } from '../../types';
import * as oss from '@alicloud/ros-cdk-oss';
import * as ros from '@alicloud/ros-cdk-core';
import { replaceReference } from '../../common';

export const resolveBuckets = (
  scope: ros.Construct,
  buckets: Array<DatabaseDomain> | undefined,
  context: ActionContext,
) => {
  if (!buckets) {
    return undefined;
  }
  buckets.forEach((bucket) => {
    new oss.Bucket(scope, replaceReference(bucket.key, context), {
      bucketName: bucket.name,
    });
  });
};

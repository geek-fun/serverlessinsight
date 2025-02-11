import { ActionContext, BucketDomain } from '../../types';
import * as oss from '@alicloud/ros-cdk-oss';
import * as ros from '@alicloud/ros-cdk-core';
import { replaceReference } from '../../common';

export const resolveBuckets = (
  scope: ros.Construct,
  buckets: Array<BucketDomain> | undefined,
  context: ActionContext,
) => {
  if (!buckets) {
    return undefined;
  }
  buckets.forEach((bucket) => {
    new oss.Bucket(scope, replaceReference(bucket.key, context), {
      bucketName: replaceReference(bucket.name, context),
      websiteConfigurationV2: bucket.website
        ? {
            indexDocument: {
              type: '0',
              suffix: replaceReference(bucket.website.index, context),
              supportSubDir: 'true',
            },
            errorDocument: {
              httpStatus: `${replaceReference(bucket.website.error_code, context)}`,
              key: replaceReference(bucket.website.error_page, context),
            },
          }
        : undefined,
    });
  });
};

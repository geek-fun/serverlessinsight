import { ActionContext, BucketDomain } from '../../types';
import * as oss from '@alicloud/ros-cdk-oss';
import * as ros from '@alicloud/ros-cdk-core';
import { replaceReference } from '../../common';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import path from 'node:path';

export const resolveBuckets = (
  scope: ros.Construct,
  buckets: Array<BucketDomain> | undefined,
  context: ActionContext,
) => {
  if (!buckets) {
    return undefined;
  }
  buckets.forEach((bucket) => {
    const ossBucket = new oss.Bucket(scope, replaceReference(bucket.key, context), {
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
    if (bucket.website?.code) {
      const filePath = path.resolve(process.cwd(), replaceReference(bucket.website.code, context));
      new ossDeployment.BucketDeployment(
        scope,
        `${replaceReference(bucket.key, context)}_bucket_code_deployment`,
        {
          sources: [ossDeployment.Source.asset(filePath)],
          destinationBucket: ossBucket.attrName,
          timeout: 3000,
          logMonitoring: false,
          retainOnCreate: false,
        },
        true,
      );
    }
  });
};

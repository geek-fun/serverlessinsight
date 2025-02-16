import { ActionContext, BucketDomain } from '../../types';
import * as oss from '@alicloud/ros-cdk-oss';
import * as ros from '@alicloud/ros-cdk-core';
import { getAssets, replaceReference } from '../../common';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import path from 'node:path';
import { RosRole } from '@alicloud/ros-cdk-ram';

export const resolveBuckets = (
  scope: ros.Construct,
  buckets: Array<BucketDomain> | undefined,
  context: ActionContext,
) => {
  if (!buckets) {
    return undefined;
  }
  const bucketSources = buckets.some((bucket) => bucket?.website?.code);
  let siAutoOssDeploymentBucketRole: RosRole | undefined;
  if (bucketSources) {
    siAutoOssDeploymentBucketRole = new RosRole(
      scope,
      'si_auto_od_bucket_role',
      {
        roleName: ros.Fn.sub('si-auto-od-bucket-role-${ALIYUN::StackId}'),
        description:
          'roles created by ServerlessInsight for oss deployment to put files to oss bucket during deployment',
        deletionForce: false,
        ignoreExisting: false,
        assumeRolePolicyDocument: {
          version: '1',
          statement: [
            {
              action: 'sts:AssumeRole',
              effect: 'Allow',
              principal: { service: ['fc.aliyuncs.com'] },
            },
          ],
        },
        policyAttachments: {
          system: ['AliyunOSSFullAccess', 'AliyunLogFullAccess'],
        },
      },
      true,
    );
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
        `si_auto_${bucket.key}_bucket_code_deployment`,
        {
          sources: getAssets(filePath),
          destinationBucket: ossBucket.attrName,
          roleArn: siAutoOssDeploymentBucketRole!.attrArn,
          timeout: 3000,
          logMonitoring: false,
          retainOnCreate: false,
        },
        true,
      );
    }
  });
};

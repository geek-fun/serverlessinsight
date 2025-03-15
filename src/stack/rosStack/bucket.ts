import { BucketAccessEnum, BucketDomain, Context } from '../../types';
import * as oss from '@alicloud/ros-cdk-oss';
import * as ros from '@alicloud/ros-cdk-core';
import {
  encodeBase64ForRosId,
  getAssets,
  OSS_DEPLOYMENT_TIMEOUT,
  replaceReference,
  splitDomain,
} from '../../common';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import * as dns from '@alicloud/ros-cdk-dns';
import path from 'node:path';
import { RosRole } from '@alicloud/ros-cdk-ram';

const aclMap = new Map([
  [BucketAccessEnum.PRIVATE, 'private'],
  [BucketAccessEnum.PUBLIC_READ, 'public-read'],
  [BucketAccessEnum.PUBLIC_READ_WRITE, 'public-read-write'],
]);

export const resolveBuckets = (
  scope: ros.Construct,
  buckets: Array<BucketDomain> | undefined,
  context: Context,
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
      accessControl: aclMap.get(
        replaceReference(bucket.security?.acl, context) ?? ('' as BucketAccessEnum),
      ),
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
          timeout: OSS_DEPLOYMENT_TIMEOUT,
          logMonitoring: false,
          retainOnCreate: false,
        },
        true,
      );
    }
    if (bucket.website?.domain) {
      const { rr, domainName } = splitDomain(bucket.website.domain);
      new oss.Domain(
        scope,
        `${bucket.key}_custom_domain_${encodeBase64ForRosId(bucket.website.domain)}`,
        {
          bucketName: ossBucket.attrName,
          domainName: replaceReference(bucket.website.domain, context),
        },
      );

      new dns.DomainRecord(
        scope,
        `${bucket.key}_custom_domain_record_${encodeBase64ForRosId(bucket.website.domain)}`,
        {
          domainName: domainName,
          rr,
          type: 'CNAME',
          value: [BucketAccessEnum.PUBLIC_READ, BucketAccessEnum.PUBLIC_READ_WRITE].includes(
            bucket.security?.acl ?? ('' as BucketAccessEnum),
          )
            ? ossBucket.attrDomainName
            : ossBucket.attrInternalDomainName,
        },
      );
    }
  });
};

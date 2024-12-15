import { ActionContext, FunctionDomain } from '../../types';
import {
  CODE_ZIP_SIZE_LIMIT,
  getFileSource,
  readCodeSize,
  replaceReference,
  resolveCode,
} from '../../common';
import * as fc from '@alicloud/ros-cdk-fc3';
import * as oss from '@alicloud/ros-cdk-oss';
import { isEmpty } from 'lodash';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import * as ros from '@alicloud/ros-cdk-core';

export const resolveFunctions = (
  scope: ros.Construct,
  functions: Array<FunctionDomain> | undefined,
  context: ActionContext,
  service: string,
) => {
  if (isEmpty(functions)) {
    return undefined;
  }
  const fileSources = functions
    ?.filter(({ code }) => readCodeSize(code) > CODE_ZIP_SIZE_LIMIT)
    .map(({ code, name }) => {
      const fcName = replaceReference(name, context);

      return { fcName, ...getFileSource(fcName, code) };
    });

  let destinationBucket: oss.Bucket;
  let artifactsDeployment: ossDeployment.BucketDeployment;
  if (!isEmpty(fileSources)) {
    // creat oss to store code
    destinationBucket = new oss.Bucket(
      scope,
      replaceReference(`${service}_artifacts_bucket`, context),
      {
        bucketName: `${service}-artifacts-bucket`,
        serverSideEncryptionConfiguration: { sseAlgorithm: 'KMS' },
      },
      true,
    );
    artifactsDeployment = new ossDeployment.BucketDeployment(
      scope,
      `${service}_artifacts_code_deployment`,
      {
        sources: fileSources!.map(({ source }) => source),
        destinationBucket,
        timeout: 300,
        logMonitoring: false, // 是否开启日志监控，设为false则不开启
      },
      true,
    );
    artifactsDeployment.addDependency(destinationBucket);
  }
  functions?.forEach((fnc) => {
    const storeInBucket = readCodeSize(fnc.code) > CODE_ZIP_SIZE_LIMIT;
    const zipcode: fc.RosFunction.CodeProperty = {
      zipFile: resolveCode('artifacts/artifact.zip'),
    };
    if (storeInBucket) {
      // const code = {
      //   ossBucketName: destinationBucket.attrName,
      //   ossObjectName: fileSources?.find(
      //     ({ fcName }) => fcName === replaceReference(fnc.name, context),
      //   )?.objectKey,
      // };
      // console.log('code', code);
    }
    const fcn = new fc.RosFunction(
      scope,
      fnc.key,
      {
        functionName: replaceReference(fnc.name, context),
        handler: replaceReference(fnc.handler, context),
        runtime: replaceReference(fnc.runtime, context),
        memorySize: replaceReference(fnc.memory, context),
        timeout: replaceReference(fnc.timeout, context),
        environmentVariables: replaceReference(fnc.environment, context),
        code: zipcode,
      },
      true,
    );
    if (storeInBucket) {
      fcn.addDependsOn(destinationBucket as unknown as ros.RosResource);
      fcn.addDependsOn(artifactsDeployment as unknown as ros.RosResource);
    }
  });
};

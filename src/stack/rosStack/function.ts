import { ActionContext, FunctionDomain, ServerlessIac } from '../../types';
import {
  CODE_ZIP_SIZE_LIMIT,
  getFileSource,
  readCodeSize,
  replaceReference,
  resolveCode,
} from '../../common';
import * as fc from '@alicloud/ros-cdk-fc3';
import { isEmpty } from 'lodash';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import * as ros from '@alicloud/ros-cdk-core';
import * as sls from '@alicloud/ros-cdk-sls';

export const resolveFunctions = (
  scope: ros.Construct,
  functions: Array<FunctionDomain> | undefined,
  tags: ServerlessIac['tags'] | undefined,
  context: ActionContext,
  service: string,
) => {
  if (isEmpty(functions)) {
    return undefined;
  }
  const slsService = new sls.Project(
    scope,
    `${service}_sls`,
    { name: `${service}-sls`, tags: replaceReference(tags, context) },
    true,
  );

  const slsLogstore = new sls.Logstore(
    scope,
    `${service}_sls_logstore`,
    {
      logstoreName: `${service}-sls-logstore`,
      projectName: slsService.attrName,
      ttl: 7,
    },
    true,
  );

  new sls.Index(
    scope,
    `${service}_sls_index`,
    {
      projectName: slsService.attrName,
      logstoreName: slsLogstore.attrLogstoreName,
      fullTextIndex: { enable: true },
    },
    true,
  );

  const fileSources = functions
    ?.filter(({ code }) => readCodeSize(code) > CODE_ZIP_SIZE_LIMIT)
    .map(({ code, name }) => {
      const fcName = replaceReference(name, context);

      return { fcName, ...getFileSource(fcName, code) };
    });

  const destinationBucketName = ros.Fn.sub(
    'si-bootstrap-artifacts-${ALIYUN::AccountId}-${ALIYUN::Region}',
  );
  const ossDeploymentId = `${service}_artifacts_code_deployment`;

  if (!isEmpty(fileSources)) {
    new ossDeployment.BucketDeployment(
      scope,
      ossDeploymentId,
      {
        sources: fileSources!.map(({ source }) => source),
        destinationBucket: destinationBucketName,
        timeout: 3000,
        logMonitoring: false,
        retainOnCreate: false,
      },
      true,
    );
  }
  functions?.forEach((fnc) => {
    const storeInBucket = readCodeSize(fnc.code) > CODE_ZIP_SIZE_LIMIT;
    let code: fc.RosFunction.CodeProperty = {
      zipFile: resolveCode(fnc.code),
    };
    if (storeInBucket) {
      code = {
        ossBucketName: destinationBucketName,
        ossObjectName: fileSources?.find(
          ({ fcName }) => fcName === replaceReference(fnc.name, context),
        )?.objectKey,
      };
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
        code,
        logConfig: {
          project: slsLogstore.attrProjectName,
          logstore: slsLogstore.attrLogstoreName,
          enableRequestMetrics: true,
        },
      },
      true,
    );
    fcn.addRosDependency(`${service}_sls`);
    fcn.addRosDependency(`${service}_sls_logstore`);
    fcn.addRosDependency(`${service}_sls_index`);

    if (storeInBucket) {
      fcn.addRosDependency(`${service}_artifacts_code_deployment`);
    }
  });
};

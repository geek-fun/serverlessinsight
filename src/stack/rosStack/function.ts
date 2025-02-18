import { ActionContext, FunctionDomain, NasStorageClassEnum, ServerlessIac } from '../../types';
import {
  CODE_ZIP_SIZE_LIMIT,
  encodeBase64ForRosId,
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
import * as nas from '@alicloud/ros-cdk-nas';
import { RosFunction } from '@alicloud/ros-cdk-fc3/lib/fc3.generated';

const storageClassMap = {
  [NasStorageClassEnum.STANDARD_CAPACITY]: { fileSystemType: 'standard', storageType: 'Capacity' },
  [NasStorageClassEnum.STANDARD_PERFORMANCE]: {
    fileSystemType: 'standard',
    storageType: 'Performance',
  },
  [NasStorageClassEnum.EXTREME_STANDARD]: { fileSystemType: 'extreme', storageType: 'standard' },
  [NasStorageClassEnum.EXTREME_ADVANCE]: { fileSystemType: 'extreme', storageType: 'advance' },
};

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
  let logConfig: RosFunction.LogConfigProperty | undefined = undefined;

  const enableLog = functions?.some(({ log }) => log);
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
  if (enableLog) {
    logConfig = {
      project: slsLogstore.attrProjectName,
      logstore: slsLogstore.attrLogstoreName,
      enableRequestMetrics: true,
    };
  }

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
    let fcNas:
      | Array<{ nas: nas.FileSystem; nasMount: nas.MountTarget; mountDir: string }>
      | undefined;
    if (fnc.storage?.nas) {
      fcNas = fnc.storage.nas.map((nasItem) => {
        const { fileSystemType, storageType } = storageClassMap[nasItem.storage_class];
        const accessGroup = new nas.AccessGroup(
          scope,
          `${fnc.key}_nas_access_${encodeBase64ForRosId(nasItem.mount_path)}`,
          {
            accessGroupName: `${fnc.name}-nas-access-${encodeBase64ForRosId(nasItem.mount_path)}`,
            accessGroupType: 'Vpc',
          },
          true,
        );

        const nasResource = new nas.FileSystem(
          scope,
          `${fnc.key}_nas_${encodeBase64ForRosId(nasItem.mount_path)}`,
          {
            fileSystemType,
            storageType,
            protocolType: 'NFS',
          },
          true,
        );
        const nasMountTarget = new nas.MountTarget(
          scope,
          `${fnc.key}_nas_mount_${encodeBase64ForRosId(nasItem.mount_path)}`,
          {
            fileSystemId: nasResource.attrFileSystemId,
            networkType: 'Vpc',
            accessGroupName: accessGroup.attrAccessGroupName,
            vpcId: nasItem.vpc_id,
            vSwitchId: nasItem.subnet_id,
          },
          true,
        );

        return { nas: nasResource, nasMount: nasMountTarget, mountDir: nasItem.mount_path };
      });
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
        diskSize: fnc.storage?.disk,
        environmentVariables: replaceReference(fnc.environment, context),
        code,
        logConfig,
        nasConfig: fcNas?.length
          ? {
              mountPoints: fcNas?.map(({ nasMount, mountDir }) => ({
                mountDir,
                serverAddr: `${nasMount.attrMountTargetDomain}:/`,
              })),
            }
          : undefined,
      },
      true,
    );
    if (enableLog) {
      fcn.addRosDependency(`${service}_sls`);
      fcn.addRosDependency(`${service}_sls_logstore`);
      fcn.addRosDependency(`${service}_sls_index`);
    }

    if (storeInBucket) {
      fcn.addRosDependency(`${service}_artifacts_code_deployment`);
    }
    if (fcNas?.length) {
      fcNas.forEach((nasItem) => {
        fcn.addRosDependency(`${fnc.key}_nas_mount_${encodeBase64ForRosId(nasItem.mountDir)}`);
      });
    }
  });
};

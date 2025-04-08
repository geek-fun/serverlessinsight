import {
  Context,
  FunctionDomain,
  FunctionGpuEnum,
  NasStorageClassEnum,
  ServerlessIac,
} from '../../types';
import {
  calcRefs,
  calcValue,
  CODE_ZIP_SIZE_LIMIT,
  formatRosId,
  getFileSource,
  OSS_DEPLOYMENT_TIMEOUT,
  readCodeSize,
  resolveCode,
} from '../../common';
import * as fc from '@alicloud/ros-cdk-fc3';
import { isEmpty } from 'lodash';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import * as ros from '@alicloud/ros-cdk-core';
import * as sls from '@alicloud/ros-cdk-sls';
import * as nas from '@alicloud/ros-cdk-nas';
import * as ecs from '@alicloud/ros-cdk-ecs';
import * as vpc from '@alicloud/ros-cdk-vpc';
import { RosFunction, RosFunctionProps } from '@alicloud/ros-cdk-fc3/lib/fc3.generated';

const storageClassMap = {
  [NasStorageClassEnum.STANDARD_CAPACITY]: { fileSystemType: 'standard', storageType: 'Capacity' },
  [NasStorageClassEnum.STANDARD_PERFORMANCE]: {
    fileSystemType: 'standard',
    storageType: 'Performance',
  },
  [NasStorageClassEnum.EXTREME_STANDARD]: { fileSystemType: 'extreme', storageType: 'standard' },
  [NasStorageClassEnum.EXTREME_ADVANCE]: { fileSystemType: 'extreme', storageType: 'advance' },
};

const securityGroupRangeMap: { [key: string]: string } = {
  TCP: '1/65535',
  UDP: '1/65535',
  ICMP: '-1/-1',
  GRE: '-1/-1',
  ALL: '-1/-1',
};
const gpuConfigMap = {
  [FunctionGpuEnum.TESLA_8]: { gpuMemorySize: 8192, gpuType: 'fc.gpu.tesla.1' },
  [FunctionGpuEnum.TESLA_12]: { gpuMemorySize: 12288, gpuType: 'fc.gpu.tesla.1' },
  [FunctionGpuEnum.TESLA_16]: { gpuMemorySize: 16384, gpuType: 'fc.gpu.tesla.1' },
  [FunctionGpuEnum.AMPERE_8]: { gpuMemorySize: 8192, gpuType: 'fc.gpu.ampere.1' },
  [FunctionGpuEnum.AMPERE_12]: { gpuMemorySize: 12288, gpuType: 'fc.gpu.ampere.1' },
  [FunctionGpuEnum.AMPERE_16]: { gpuMemorySize: 16384, gpuType: 'fc.gpu.ampere.1' },
  [FunctionGpuEnum.AMPERE_24]: { gpuMemorySize: 24576, gpuType: 'fc.gpu.ampere.1' },
  [FunctionGpuEnum.ADA_48]: { gpuMemorySize: 49152, gpuType: 'fc.gpu.ada.1' },
};

const transformSecurityRules = (rules: Array<string>, ruleType: 'INGRESS' | 'EGRESS') => {
  return rules.map((rule) => {
    const [protocol, cidrIp, portRange] = rule.split(':');

    return {
      ipProtocol: protocol.toLowerCase(),
      portRange:
        portRange.toUpperCase() === 'ALL'
          ? securityGroupRangeMap[protocol.toUpperCase()]
          : portRange.includes('/')
            ? portRange
            : `${portRange}/${portRange}`,
      [ruleType === 'INGRESS' ? 'sourceCidrIp' : 'destCidrIp']: cidrIp,
    };
  });
};

const transformGpuConfig = (gpu: FunctionDomain['gpu']) => {
  if (!gpu) {
    return undefined;
  }

  return gpuConfigMap[gpu];
};

export const resolveFunctions = (
  scope: ros.Construct,
  functions: Array<FunctionDomain> | undefined,
  tags: ServerlessIac['tags'] | undefined,
  context: Context,
  service: string,
) => {
  if (isEmpty(functions)) {
    return undefined;
  }
  let logConfig: RosFunction.LogConfigProperty | undefined = undefined;

  const enableLog = functions?.some(({ log }) => log);
  const slsServiceId = formatRosId(calcValue(`${service}_sls`, context));
  const slsLogstoreId = formatRosId(calcValue(`${service}_sls_logstore`, context));
  const slsIndexId = formatRosId(calcValue(`${service}_sls_index`, context));

  const slsService = new sls.Project(
    scope,
    slsServiceId,
    { name: calcRefs(`${service}-sls`, context), tags: calcRefs(tags, context) },
    true,
  );

  const slsLogstore = new sls.Logstore(
    scope,
    slsLogstoreId,
    {
      logstoreName: calcRefs(`${service}-sls-logstore`, context),
      projectName: slsService.attrName,
      ttl: 7,
    },
    true,
  );

  new sls.Index(
    scope,
    slsIndexId,
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
    ?.filter(({ code }) => code?.path && readCodeSize(code.path) > CODE_ZIP_SIZE_LIMIT)
    .map(({ code, name }) => {
      const fcName = calcRefs(name, context);

      return { fcName, ...getFileSource(fcName, code!.path) };
    });

  const destinationBucketName = ros.Fn.sub(
    'si-bootstrap-artifacts-${ALIYUN::AccountId}-${ALIYUN::Region}',
  );
  const ossDeploymentId = formatRosId(calcValue(`${service}_artifacts_code_deployment`, context));

  if (!isEmpty(fileSources)) {
    new ossDeployment.BucketDeployment(
      scope,
      ossDeploymentId,
      {
        sources: fileSources!.map(({ source }) => source),
        destinationBucket: destinationBucketName,
        timeout: OSS_DEPLOYMENT_TIMEOUT,
        logMonitoring: false,
        retainOnCreate: false,
      },
      true,
    );
  }

  functions?.forEach((fnc) => {
    let runtimeConfig:
      | {
          customContainerConfig: RosFunctionProps['customContainerConfig'];
          runtime: RosFunctionProps['runtime'];
          handler: RosFunctionProps['handler'];
        }
      | {
          code: RosFunctionProps['code'];
          runtime: RosFunctionProps['runtime'];
          handler: RosFunctionProps['handler'];
        };

    const storeInBucket =
      !!fnc.code?.path && readCodeSize(calcValue(fnc.code.path, context)) > CODE_ZIP_SIZE_LIMIT;

    if (fnc.container) {
      runtimeConfig = {
        runtime: 'custom-container',
        handler: 'index.handler',
        customContainerConfig: {
          image: calcRefs(fnc.container.image, context),
          command: calcRefs(fnc.container.cmd, context)?.split(' '),
          port: calcRefs(fnc.container.port, context),
        },
      };
    } else {
      let code: fc.RosFunction.CodeProperty = {
        zipFile: resolveCode(calcValue(fnc.code!.path, context)),
      };
      if (storeInBucket) {
        code = {
          ossBucketName: destinationBucketName,
          ossObjectName: fileSources?.find(({ fcName }) => fcName === calcRefs(fnc.name, context))
            ?.objectKey,
        };
      }
      runtimeConfig = {
        code,
        handler: calcRefs(fnc.code!.handler, context),
        runtime: calcRefs(fnc.code!.runtime, context),
      };
    }

    let vpcConfig: fc.RosFunction.VpcConfigProperty | undefined = undefined;
    if (fnc.network) {
      const securityGroup = new ecs.SecurityGroup(
        scope,
        formatRosId(`${fnc.key}_security_group`),
        {
          securityGroupName: fnc.network.security_group.name,
          vpcId: calcRefs(fnc.network.vpc_id, context),
          tags: calcRefs(tags, context),
          securityGroupIngress: transformSecurityRules(
            fnc.network.security_group.ingress,
            'INGRESS',
          ),
          securityGroupEgress: transformSecurityRules(fnc.network.security_group.egress, 'EGRESS'),
        },
        true,
      );

      vpcConfig = {
        vpcId: calcRefs(fnc.network.vpc_id, context),
        vSwitchIds: calcRefs(fnc.network.subnet_ids, context),
        securityGroupId: securityGroup.attrSecurityGroupId,
      };
    }

    let fcNas:
      | Array<{
          nas: nas.FileSystem;
          nasMount: nas.MountTarget;
          mountDir: string;
          nasMountTargetId: string;
        }>
      | undefined;
    if (fnc.storage?.nas) {
      fcNas = fnc.storage.nas.map((nasItem) => {
        const storageClass = calcValue(nasItem.storage_class, context) as NasStorageClassEnum;
        const { fileSystemType, storageType } = storageClassMap[storageClass];
        const mountPathValue = formatRosId(calcValue(nasItem.mount_path, context));
        const nasMountTargetId = formatRosId(`${fnc.key}_nas_mount_${mountPathValue}`);

        const accessGroup = new nas.AccessGroup(
          scope,
          formatRosId(`${fnc.key}_nas_access_${mountPathValue}`),
          {
            accessGroupName: calcRefs(
              `${fnc.name}-nas-access-${mountPathValue.replace(/_/g, '-')}`,
              context,
            ),
            accessGroupType: 'Vpc',
          },
          true,
        );

        const fcVpcSubnets = fnc.network?.subnet_ids.map(
          (subnet) =>
            new vpc.datasource.VSwitch(
              scope,
              formatRosId(calcValue(`${fnc.key}_datasource_subnet_${subnet}`, context)),
              {
                vSwitchId: subnet,
                refreshOptions: 'Always',
              },
            ),
        );

        fcVpcSubnets?.forEach((subnetDatasource, index) => {
          new nas.AccessRule(
            scope,
            formatRosId(
              calcValue(`${fnc.key}_nas_rule_${fnc.network!.subnet_ids[index]}`, context),
            ),
            {
              accessGroupName: accessGroup.attrAccessGroupName,
              sourceCidrIp: subnetDatasource.attrCidrBlock,
            },
            true,
          );
        });

        const nasResource = new nas.FileSystem(
          scope,
          formatRosId(`${fnc.key}_nas_${mountPathValue}`),
          {
            fileSystemType,
            storageType,
            protocolType: 'NFS',
            tags: [
              ...(calcRefs(tags, context) ?? []),
              { key: 'function-name', value: calcRefs(fnc.name, context) },
            ],
          },
          true,
        );
        const nasMountTarget = new nas.MountTarget(
          scope,
          nasMountTargetId,
          {
            fileSystemId: nasResource.attrFileSystemId,
            networkType: 'Vpc',
            accessGroupName: accessGroup.attrAccessGroupName,
            vpcId: calcRefs(fnc.network!.vpc_id, context),
            vSwitchId: calcRefs(fnc.network!.subnet_ids[0], context),
          },
          true,
        );

        return {
          nas: nasResource,
          nasMount: nasMountTarget,
          mountDir: calcRefs(nasItem.mount_path, context),
          nasMountTargetId,
        };
      });
    }

    const fcn = new fc.RosFunction(
      scope,
      fnc.key,
      {
        functionName: calcRefs(fnc.name, context),
        memorySize: calcRefs(fnc.memory, context),
        diskSize: calcRefs(fnc.storage?.disk, context),
        gpuConfig: transformGpuConfig(fnc.gpu),
        timeout: calcRefs(fnc.timeout, context),
        environmentVariables: calcRefs(fnc.environment, context),
        logConfig,
        vpcConfig,
        ...runtimeConfig,
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
      fcn.addRosDependency(slsServiceId);
      fcn.addRosDependency(slsLogstoreId);
      fcn.addRosDependency(slsIndexId);
    }

    if (storeInBucket) {
      fcn.addRosDependency(ossDeploymentId);
    }
    if (fcNas?.length) {
      fcNas.forEach(({ nasMountTargetId }) => fcn.addRosDependency(nasMountTargetId));
    }
  });
};

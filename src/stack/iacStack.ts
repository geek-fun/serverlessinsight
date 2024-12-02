import * as ros from '@alicloud/ros-cdk-core';
import { RosParameterType } from '@alicloud/ros-cdk-core';
import { ActionContext, EventTypes, ServerlessIac } from '../types';
import * as fc from '@alicloud/ros-cdk-fc3';
import { RosFunction } from '@alicloud/ros-cdk-fc3/lib/fc3.generated';
import * as ram from '@alicloud/ros-cdk-ram';
import * as agw from '@alicloud/ros-cdk-apigateway';
import * as oss from '@alicloud/ros-cdk-oss';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import {
  CODE_ZIP_SIZE_LIMIT,
  getFileSource,
  readCodeSize,
  replaceReference,
  resolveCode,
} from '../common';

export class IacStack extends ros.Stack {
  private readonly service: string;

  constructor(scope: ros.Construct, iac: ServerlessIac, context: ActionContext) {
    super(scope, replaceReference(iac.service, context), {
      stackName: context.stackName,
      tags: iac.tags?.reduce((acc: { [key: string]: string }, tag) => {
        acc[tag.key] = replaceReference(tag.value, context);
        return acc;
      }, {}),
    });
    this.service = replaceReference(iac.service, context);

    // Define Parameters
    if (iac.vars) {
      Object.entries(iac.vars).map(
        ([id, value]) =>
          new ros.RosParameter(this, id, {
            type: RosParameterType.STRING,
            defaultValue: value,
          }),
      );
    }

    // Define Mappings
    if (iac.stages) {
      new ros.RosMapping(this, 'stages', { mapping: replaceReference(iac.stages, context) });
    }

    new ros.RosInfo(
      this,
      ros.RosInfo.description,
      replaceReference(`${this.service} stack`, context),
    );

    const fileSources = iac.functions
      .filter(({ code }) => readCodeSize(code) > CODE_ZIP_SIZE_LIMIT)
      .map(({ code, name }) => ({ fcName: name, ...getFileSource(name, code) }));

    let destinationBucket: oss.Bucket;
    if (fileSources.length > 0) {
      // creat oss to store code
      destinationBucket = new oss.Bucket(
        this,
        replaceReference(`${this.service}_artifacts_bucket`, context),
        {
          bucketName: replaceReference(`${this.service}-artifacts-bucket`, context),
          serverSideEncryptionConfiguration: { sseAlgorithm: 'KMS' },
        },
        true,
      );
      new ossDeployment.BucketDeployment(
        this,
        `${this.service}_artifacts_code_deployment`,
        {
          sources: fileSources.map(({ source }) => source),
          destinationBucket,
          timeout: 300,
          logMonitoring: false, // 是否开启日志监控，设为false则不开启
        },
        true,
      );
    }

    iac.functions.forEach((fnc) => {
      let code: RosFunction.CodeProperty = {
        zipFile: resolveCode(fnc.code),
      };
      if (readCodeSize(fnc.code) > CODE_ZIP_SIZE_LIMIT) {
        code = {
          ossBucketName: destinationBucket.attrName,
          ossObjectName: fileSources.find(({ fcName }) => fcName === fnc.name)?.objectKey,
        };
      }
      new fc.RosFunction(
        this,
        fnc.key,
        {
          functionName: replaceReference(fnc.name, context),
          handler: replaceReference(fnc.handler, context),
          runtime: replaceReference(fnc.runtime, context),
          memorySize: replaceReference(fnc.memory, context),
          timeout: replaceReference(fnc.timeout, context),
          environmentVariables: replaceReference(fnc.environment, context),
          code,
        },
        true,
      );
    });

    const apiGateway = iac.events?.filter((event) => event.type === EventTypes.API_GATEWAY);
    if (apiGateway?.length) {
      const gatewayAccessRole = new ram.RosRole(
        this,
        replaceReference(`${this.service}_role`, context),
        {
          roleName: replaceReference(`${this.service}-gateway-access-role`, context),
          description: replaceReference(`${this.service} role`, context),
          assumeRolePolicyDocument: {
            version: '1',
            statement: [
              {
                action: 'sts:AssumeRole',
                effect: 'Allow',
                principal: {
                  service: ['apigateway.aliyuncs.com'],
                },
              },
            ],
          },
          policies: [
            {
              policyName: replaceReference(`${this.service}-policy`, context),
              policyDocument: {
                version: '1',
                statement: [
                  {
                    action: ['fc:InvokeFunction'],
                    effect: 'Allow',
                    // @TODO implement at least permission granting
                    resource: ['*'],
                  },
                ],
              },
            },
          ],
        },
        true,
      );

      const apiGatewayGroup = new agw.RosGroup(
        this,
        replaceReference(`${this.service}_apigroup`, context),
        {
          groupName: replaceReference(`${this.service}_apigroup`, context),
          tags: replaceReference(iac.tags, context),
        },
        true,
      );

      // new agw.RosCustomDomain(
      //   this,
      //   'customDomain',
      //   {
      //     domainName: 'example.com',
      //     certificateName: 'example.com',
      //     certificateBody: 'example.com',
      //     certificatePrivateKey: 'example.com',
      //     groupId: apiGatewayGroup.attrGroupId,
      //   },
      //   true,
      // );

      apiGateway.forEach((event) => {
        event.triggers.forEach((trigger) => {
          const key = `${trigger.method}_${trigger.path}`.toLowerCase().replace(/\//g, '_');

          const api = new agw.RosApi(
            this,
            replaceReference(`${event.key}_api_${key}`, context),
            {
              apiName: replaceReference(`${event.name}_api_${key}`, context),
              groupId: apiGatewayGroup.attrGroupId,
              visibility: 'PRIVATE',
              requestConfig: {
                requestProtocol: 'HTTP',
                requestHttpMethod: replaceReference(trigger.method, context),
                requestPath: replaceReference(trigger.path, context),
                requestMode: 'PASSTHROUGH',
              },
              serviceConfig: {
                serviceProtocol: 'FunctionCompute',
                functionComputeConfig: {
                  fcRegionId: context.region,
                  functionName: replaceReference(trigger.backend, context),
                  roleArn: gatewayAccessRole.attrArn,
                  fcVersion: '3.0',
                },
              },
              resultSample: 'ServerlessInsight resultSample',
              resultType: 'JSON',
              tags: replaceReference(iac.tags, context),
            },
            true,
          );
          api.addDependsOn(apiGatewayGroup);
        });
      });
    }
  }
}

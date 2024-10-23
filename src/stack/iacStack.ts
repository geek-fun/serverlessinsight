import * as ros from '@alicloud/ros-cdk-core';
import { RosParameterType } from '@alicloud/ros-cdk-core';
import { ActionContext, EventTypes, ServerlessIac } from '../types';
import * as fc from '@alicloud/ros-cdk-fc3';
import * as ram from '@alicloud/ros-cdk-ram';
import * as agw from '@alicloud/ros-cdk-apigateway';
import { evalRefValue, replaceReference, resolveCode } from '../common';

export class IacStack extends ros.Stack {
  private service: string;

  constructor(scope: ros.Construct, iac: ServerlessIac, context: ActionContext) {
    super(scope, evalRefValue(iac.service, iac, context.stage), {
      stackName: context.stackName,
      tags: iac.tags?.reduce((acc: { [key: string]: string }, tag) => {
        acc[tag.key] = replaceReference(tag.value, context.stage);
        return acc;
      }, {}),
    });
    this.service = evalRefValue(iac.service, iac, context.stage);

    // Define Parameters
    if (iac.vars) {
      Object.entries(iac.vars).map(
        ([key, value]) =>
          new ros.RosParameter(this, key, {
            type: RosParameterType.STRING,
            defaultValue: value,
          }),
      );
    }

    // Define Mappings
    if (iac.stages) {
      new ros.RosMapping(this, 'stages', { mapping: replaceReference(iac.stages, context.stage) });
    }

    new ros.RosInfo(
      this,
      ros.RosInfo.description,
      replaceReference(`${this.service} stack`, context.stage),
    );

    iac.functions.forEach((fnc) => {
      new fc.RosFunction(
        this,
        fnc.key,
        {
          functionName: replaceReference(fnc.name, context.stage),
          handler: replaceReference(fnc.handler, context.stage),
          runtime: replaceReference(fnc.runtime, context.stage),
          memorySize: replaceReference(fnc.memory, context.stage),
          timeout: replaceReference(fnc.timeout, context.stage),
          environmentVariables: replaceReference(fnc.environment, context.stage),
          code: {
            zipFile: resolveCode(fnc.code),
          },
        },
        true,
      );
    });

    const apiGateway = iac.events?.filter((event) => event.type === EventTypes.API_GATEWAY);
    if (apiGateway?.length) {
      const gatewayAccessRole = new ram.RosRole(
        this,
        replaceReference(`${this.service}_role`, context.stage),
        {
          roleName: replaceReference(`${this.service}-gateway-access-role`, context.stage),
          description: replaceReference(`${this.service} role`, context.stage),
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
              policyName: replaceReference(`${this.service}-policy`, context.stage),
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
        replaceReference(`${this.service}_apigroup`, context.stage),
        {
          groupName: replaceReference(`${this.service}_apigroup`, context.stage),
          tags: replaceReference(iac.tags, context.stage),
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
            replaceReference(`${event.key}_api_${key}`, context.stage),
            {
              apiName: replaceReference(`${event.name}_api_${key}`, context.stage),
              groupId: apiGatewayGroup.attrGroupId,
              visibility: 'PRIVATE',
              requestConfig: {
                requestProtocol: 'HTTP',
                requestHttpMethod: replaceReference(trigger.method, context.stage),
                requestPath: replaceReference(trigger.path, context.stage),
                requestMode: 'PASSTHROUGH',
              },
              serviceConfig: {
                serviceProtocol: 'FunctionCompute',
                functionComputeConfig: {
                  fcRegionId: context.region,
                  functionName: replaceReference(trigger.backend, context.stage),
                  roleArn: gatewayAccessRole.attrArn,
                  fcVersion: '3.0',
                },
              },
              resultSample: 'ServerlessInsight resultSample',
              resultType: 'JSON',
              tags: replaceReference(iac.tags, context.stage),
            },
            true,
          );
          api.addDependsOn(apiGatewayGroup);
        });
      });
    }
  }
}

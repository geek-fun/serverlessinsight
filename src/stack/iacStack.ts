import * as ros from '@alicloud/ros-cdk-core';
import { RosParameterType } from '@alicloud/ros-cdk-core';
import { ActionContext, EventTypes, ServerlessIac } from '../types';
import * as fc from '@alicloud/ros-cdk-fc';
import * as ram from '@alicloud/ros-cdk-ram';
import * as agw from '@alicloud/ros-cdk-apigateway';
import { replaceVars, resolveCode } from '../common';

export class IacStack extends ros.Stack {
  constructor(scope: ros.Construct, iac: ServerlessIac, context: ActionContext) {
    super(scope, iac.service, {
      stackName: context.stackName,
      tags: iac.tags.reduce((acc: { [key: string]: string }, tag) => {
        acc[tag.key] = replaceVars(tag.value, context.stage);
        return acc;
      }, {}),
    });

    // Define Parameters
    Object.entries(iac.vars).map(
      ([key, value]) =>
        new ros.RosParameter(this, key, {
          type: RosParameterType.STRING,
          defaultValue: value,
        }),
    );

    // Define Mappings
    new ros.RosMapping(this, 'stages', { mapping: replaceVars(iac.stages, context.stage) });

    new ros.RosInfo(
      this,
      ros.RosInfo.description,
      replaceVars(`${iac.service} stack`, context.stage),
    );

    const service = new fc.RosService(
      this,
      replaceVars(`${iac.service}-service`, context.stage),
      {
        serviceName: replaceVars(`${iac.service}-service`, context.stage),
        tags: replaceVars(iac.tags, context.stage),
      },
      true,
    );

    iac.functions.forEach((fnc) => {
      const func = new fc.RosFunction(
        this,
        fnc.key,
        {
          functionName: replaceVars(fnc.name, context.stage),
          serviceName: replaceVars(service.serviceName, context.stage),
          handler: replaceVars(fnc.handler, context.stage),
          runtime: replaceVars(fnc.runtime, context.stage),
          memorySize: replaceVars(fnc.memory, context.stage),
          timeout: replaceVars(fnc.timeout, context.stage),
          environmentVariables: replaceVars(fnc.environment, context.stage),
          code: {
            zipFile: resolveCode(fnc.code),
          },
        },
        true,
      );
      func.addDependsOn(service);
    });

    const apiGateway = iac.events?.filter((event) => event.type === EventTypes.API_GATEWAY);
    if (apiGateway?.length) {
      const gatewayAccessRole = new ram.RosRole(
        this,
        replaceVars(`${iac.service}_role`, context.stage),
        {
          roleName: replaceVars(`${iac.service}-gateway-access-role`, context.stage),
          description: replaceVars(`${iac.service} role`, context.stage),
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
              policyName: replaceVars(`${iac.service}-policy`, context.stage),
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
        replaceVars(`${iac.service}_apigroup`, context.stage),
        {
          groupName: replaceVars(`${iac.service}_apigroup`, context.stage),
          tags: replaceVars(iac.tags, context.stage),
        },
        true,
      );

      apiGateway.forEach((event) => {
        event.triggers.forEach((trigger) => {
          const key = `${trigger.method}_${trigger.path}`.toLowerCase().replace(/\//g, '_');

          const api = new agw.RosApi(
            this,
            replaceVars(`${event.key}_api_${key}`, context.stage),
            {
              apiName: replaceVars(`${event.name}_api_${key}`, context.stage),
              groupId: apiGatewayGroup.attrGroupId,
              visibility: 'PRIVATE',
              requestConfig: {
                requestProtocol: 'HTTP',
                requestHttpMethod: replaceVars(trigger.method, context.stage),
                requestPath: replaceVars(trigger.path, context.stage),
                requestMode: 'PASSTHROUGH',
              },
              serviceConfig: {
                serviceProtocol: 'FunctionCompute',
                functionComputeConfig: {
                  fcRegionId: context.region,
                  serviceName: service.serviceName,
                  functionName: trigger.backend,
                  roleArn: gatewayAccessRole.attrArn,
                },
              },
              resultSample: 'ServerlessInsight resultSample',
              resultType: 'JSON',
              tags: replaceVars(iac.tags, context.stage),
            },
            true,
          );
          api.addDependsOn(apiGatewayGroup);
        });
      });
    }
  }
}

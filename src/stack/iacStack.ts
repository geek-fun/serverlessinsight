import * as ros from '@alicloud/ros-cdk-core';
import { ActionContext, EventTypes, ServerlessIac } from '../types';
import { RosParameterType } from '@alicloud/ros-cdk-core';
import * as fc from '@alicloud/ros-cdk-fc';
import * as ram from '@alicloud/ros-cdk-ram';
import * as agw from '@alicloud/ros-cdk-apigateway';
import path from 'node:path';
import fs from 'node:fs';

const resolveCode = (location: string): string => {
  const filePath = path.resolve(process.cwd(), location);
  const fileContent = fs.readFileSync(filePath);

  return fileContent.toString('base64');
};

const replaceVars = <T>(value: T): T => {
  if (typeof value === 'string') {
    const matchVar = value.match(/^\$\{vars\.(\w+)}$/);
    const containsVar = value.match(/\$\{vars\.(\w+)}/);
    if (matchVar?.length) {
      return ros.Fn.ref(matchVar[1]) as T;
    }
    if (containsVar?.length) {
      return ros.Fn.sub(value.replace(/\$\{vars\.(\w+)}/g, '${$1}')) as T;
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(replaceVars) as T;
  }

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, replaceVars(val)]),
    ) as T;
  }

  return value;
};

export class IacStack extends ros.Stack {
  constructor(scope: ros.Construct, iac: ServerlessIac, context: ActionContext) {
    super(scope, iac.service, {
      tags: iac.tags.reduce((acc: { [key: string]: string }, tag) => {
        acc[tag.key] = replaceVars(tag.value);
        return acc;
      }, {}),
    });

    Object.entries(iac.vars).map(
      ([key, value]) =>
        new ros.RosParameter(this, key, {
          type: RosParameterType.STRING,
          defaultValue: value,
        }),
    );

    new ros.RosInfo(this, ros.RosInfo.description, replaceVars(`${iac.service} stack`));

    const service = new fc.RosService(
      this,
      replaceVars(`${iac.service}-service`),
      {
        serviceName: replaceVars(`${iac.service}-service`),
        tags: replaceVars(iac.tags),
      },
      true,
    );

    iac.functions.forEach((fnc) => {
      const func = new fc.RosFunction(
        this,
        fnc.key,
        {
          functionName: replaceVars(fnc.name),
          serviceName: replaceVars(service.serviceName),
          handler: replaceVars(fnc.handler),
          runtime: replaceVars(fnc.runtime),
          memorySize: replaceVars(fnc.memory),
          timeout: replaceVars(fnc.timeout),
          environmentVariables: replaceVars(fnc.environment),
          code: {
            zipFile: resolveCode(fnc.code),
          },
        },
        true,
      );
      func.addDependsOn(service);
    });

    const apiGateway = iac.events.find((event) => event.type === EventTypes.API_GATEWAY);
    if (apiGateway) {
      const gatewayAccessRole = new ram.RosRole(
        this,
        replaceVars(`${iac.service}_role`),
        {
          roleName: replaceVars(`${iac.service}-gateway-access-role`),
          description: replaceVars(`${iac.service} role`),
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
              policyName: replaceVars(`${iac.service}-policy`),
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
        replaceVars(`${iac.service}_apigroup`),
        {
          groupName: replaceVars(`${iac.service}_apigroup`),
          tags: replaceVars(iac.tags),
        },
        true,
      );

      iac.events
        .filter((event) => event.type === EventTypes.API_GATEWAY)
        .forEach((event) => {
          event.triggers.forEach((trigger) => {
            const key = `${trigger.method}_${trigger.path}`.toLowerCase().replace(/\//g, '_');

            const api = new agw.RosApi(
              this,
              replaceVars(`${event.key}_api_${key}`),
              {
                apiName: replaceVars(`${event.name}_api_${key}`),
                groupId: apiGatewayGroup.attrGroupId,
                visibility: 'PRIVATE',
                requestConfig: {
                  requestProtocol: 'HTTP',
                  requestHttpMethod: replaceVars(trigger.method),
                  requestPath: replaceVars(trigger.path),
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
                tags: replaceVars(iac.tags),
              },
              true,
            );
            api.addDependsOn(apiGatewayGroup);
          });
        });
    }
  }
}

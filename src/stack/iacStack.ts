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

const replaceVars = (
  value: { [key: string]: unknown } | string | number | unknown,
): { [key: string]: unknown } | string | number | unknown => {
  if (typeof value === 'string') {
    const matchVar = value.match(/^\$\{vars\.(\w+)}$/);
    const containsVar = value.match(/\$\{vars\.(\w+)}/);
    if (matchVar?.length) {
      return ros.Fn.ref(matchVar[1]);
    }
    if (containsVar?.length) {
      return ros.Fn.sub(value.replace(/\$\{vars\.(\w+)}/g, '${$1}'));
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(replaceVars);
  }

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, replaceVars(val)]));
  }

  return value;
};

export class IacStack extends ros.Stack {
  private readonly iac: ServerlessIac;

  constructor(scope: ros.Construct, iac: ServerlessIac, context: ActionContext) {
    super(scope, iac.service, {
      tags: iac.tags.reduce((acc: { [key: string]: string }, tag) => {
        acc[tag.key] = tag.value;
        return acc;
      }, {}),
    });

    this.iac = replaceVars(iac) as ServerlessIac;
    console.log('IAC:', JSON.stringify(this.iac));

    Object.entries(this.iac.vars).map(
      ([key, value]) =>
        new ros.RosParameter(this, key, {
          type: RosParameterType.STRING,
          defaultValue: value,
        }),
    );

    new ros.RosInfo(this, ros.RosInfo.description, `${this.iac.service} stack`);

    const service = new fc.RosService(
      this,
      `${this.iac.service}-service`,
      {
        serviceName: `${this.iac.service}-service`,
        tags: this.iac.tags,
      },
      true,
    );

    this.iac.functions.forEach((fnc) => {
      const func = new fc.RosFunction(
        this,
        fnc.key,
        {
          functionName: fnc.name,
          serviceName: service.serviceName,
          handler: fnc.handler,
          runtime: fnc.runtime,
          memorySize: fnc.memory,
          timeout: fnc.timeout,
          environmentVariables: fnc.environment,
          code: {
            zipFile: resolveCode(fnc.code),
          },
        },
        true,
      );
      func.addDependsOn(service);
    });

    const apiGateway = this.iac.events.find((event) => event.type === EventTypes.API_GATEWAY);
    if (apiGateway) {
      const gatewayAccessRole = new ram.RosRole(
        this,
        `${this.iac.service}_role`,
        {
          roleName: `${this.iac.service}-gateway-access-role`,
          description: `${this.iac.service} role`,
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
              policyName: `${iac.service}-policy`,
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
        `${this.iac.service}_apigroup`,
        {
          groupName: `${this.iac.service}_apigroup`,
          tags: this.iac.tags,
        },
        true,
      );

      this.iac.events
        .filter((event) => event.type === EventTypes.API_GATEWAY)
        .forEach((event) => {
          event.triggers.forEach((trigger) => {
            const key = `${trigger.method}_${trigger.path}`.toLowerCase().replace(/\//g, '_');
            const api = new agw.RosApi(
              this,
              `${event.key}_api_${key}`,
              {
                apiName: `${event.name}_api_${key}`,
                groupId: apiGatewayGroup.attrGroupId,
                visibility: 'PRIVATE',
                requestConfig: {
                  requestProtocol: 'HTTP',
                  requestHttpMethod: trigger.method,
                  requestPath: trigger.path,
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
                tags: iac.tags,
              },
              true,
            );
            api.addDependsOn(apiGatewayGroup);
          });
        });
    }
  }
}

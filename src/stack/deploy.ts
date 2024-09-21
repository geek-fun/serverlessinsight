import * as ros from '@alicloud/ros-cdk-core';
import * as fc from '@alicloud/ros-cdk-fc';
import * as agw from '@alicloud/ros-cdk-apigateway';
import * as ram from '@alicloud/ros-cdk-ram';

import { ActionContext, EventTypes, ServerlessIac } from '../types';
import { printer, rosStackDeploy } from '../common';
import path from 'node:path';
import * as fs from 'node:fs';

const resolveCode = (location: string): string => {
  const filePath = path.resolve(process.cwd(), location);
  const fileContent = fs.readFileSync(filePath);

  return fileContent.toString('base64');
};

export class IacStack extends ros.Stack {
  constructor(scope: ros.Construct, iac: ServerlessIac, context: ActionContext) {
    super(scope, iac.service);
    new ros.RosInfo(this, ros.RosInfo.description, `${iac.service} stack`);

    const service = new fc.RosService(
      this,
      `${iac.service}-service`,
      {
        serviceName: `${iac.service}-service`,
      },
      true,
    );

    iac.functions.forEach((fnc) => {
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

    const apiGateway = iac.events.find((event) => event.type === EventTypes.API_GATEWAY);
    if (apiGateway) {
      const gatewayAccessRole = new ram.RosRole(
        this,
        `${iac.service}_role`,
        {
          roleName: `${iac.service}-gateway-access-role`,
          description: `${iac.service} role`,
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
        `${iac.service}_apigroup`,
        {
          groupName: `${iac.service}_apigroup`,
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
              },
              true,
            );
            api.addDependsOn(apiGatewayGroup);
          });
        });
    }
  }
}

const generateStackTemplate = (stackName: string, iac: ServerlessIac, context: ActionContext) => {
  const app = new ros.App();
  new IacStack(app, iac, context);

  const assembly = app.synth();
  const stackArtifact = assembly.getStackByName(stackName);
  const parameters = Object.entries(stackArtifact.parameters).map(([key, value]) => ({
    key,
    value,
  }));

  return { template: stackArtifact.template, parameters };
};

export const deployStack = async (
  stackName: string,
  iac: ServerlessIac,
  context: ActionContext,
) => {
  printer.info(`Deploying stack... ${JSON.stringify(iac)}`);

  const { template, parameters } = generateStackTemplate(stackName, iac, context);
  console.log('Generated ROS YAML:', JSON.stringify({ template, parameters }));
  await rosStackDeploy(stackName, template, { ...context, parameters });
  printer.info(`Stack deployed! 🎉`);
};

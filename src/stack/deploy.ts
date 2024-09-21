import * as ros from '@alicloud/ros-cdk-core';
import * as fc from '@alicloud/ros-cdk-fc';
import { ActionContext, ServerlessIac } from '../types';
import { printer, rosStackDeploy } from '../common';
import path from 'node:path';
import * as fs from 'node:fs';

const resolveCode = (location: string): string => {
  const filePath = path.resolve(process.cwd(), location);
  const fileContent = fs.readFileSync(filePath);

  return fileContent.toString('base64');
};

export class IacStack extends ros.Stack {
  constructor(scope: ros.Construct, iac: ServerlessIac, props?: ros.StackProps) {
    super(scope, iac.service, props);
    new ros.RosInfo(this, ros.RosInfo.description, 'This is the simple ros cdk app example.');
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
  }
}

const generateStackTemplate = (stackName: string, iac: ServerlessIac) => {
  const app = new ros.App();
  new IacStack(app, iac);

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

  const { template, parameters } = generateStackTemplate(stackName, iac);
  console.log('Generated ROS YAML:', JSON.stringify({ template, parameters }));
  await rosStackDeploy(stackName, template, { ...context, parameters });
  printer.info(`Stack deployed! 🎉`);
};

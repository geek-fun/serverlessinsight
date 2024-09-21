import * as ros from '@alicloud/ros-cdk-core';
import * as fc from '@alicloud/ros-cdk-fc';
import { ActionContext, ServerlessIac } from '../types';
import { printer, rosStackDeploy } from '../common';

export class IacStack extends ros.Stack {
  constructor(scope: ros.Construct, iac: ServerlessIac, props?: ros.StackProps) {
    super(scope, iac.service, props);
    new ros.RosInfo(this, ros.RosInfo.description, 'This is the simple ros cdk app example.');
    iac.functions.map(
      (fnc) =>
        new fc.RosFunction(
          this,
          fnc.name,
          {
            functionName: fnc.name,
            serviceName: `${fnc.name}-service`,
            handler: fnc.handler,
            runtime: fnc.runtime,
            memorySize: fnc.memory,
            timeout: fnc.timeout,
            environmentVariables: fnc.environment,
            code: {
              zipFile:
                'exports.handler = function(event, context, callback) { callback(null, "Hello World"); }',
            },
          },
          false,
        ),
    );
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

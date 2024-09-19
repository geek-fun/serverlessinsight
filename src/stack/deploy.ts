import * as ros from '@alicloud/ros-cdk-core';
import * as fc from '@alicloud/ros-cdk-fc';
import { ServerlessIac } from '../types';

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

export const deployStack = (iac: ServerlessIac) => {
  console.log(`Deploying stack... ${JSON.stringify(iac)}`);
  const app = new ros.App();
  new IacStack(app, iac);
  app.synth();
};

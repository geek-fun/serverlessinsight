import * as ros from '@alicloud/ros-cdk-core';
import { ActionContext, ServerlessIac } from '../../types';
import { replaceReference } from '../../common';
import { resolveTags } from './tag';
import { resolveFunctions } from './function';
import { resolveStages } from './stage';
import { resolveVars } from './vars';
import { resolveDatabases } from './database';
import { resolveEvents } from './event';

export class RosStack extends ros.Stack {
  private readonly service: string;

  constructor(scope: ros.Construct, iac: ServerlessIac, context: ActionContext) {
    super(scope, replaceReference(iac.service, context), {
      stackName: context.stackName,
      tags: resolveTags(iac.tags, context),
    });

    this.service = replaceReference(iac.service, context);
    new ros.RosInfo(this, ros.RosInfo.description, `${this.service} stack`);

    // Define Parameters
    resolveVars(this, iac.vars);
    // Define Mappings
    resolveStages(this, iac.stages, context);
    // Define functions
    resolveFunctions(this, iac.functions, context, this.service);
    // Define Events
    resolveEvents(this, iac.events, iac.tags, context, this.service);
    // Define Databases
    resolveDatabases(this, iac.databases, context);
  }
}

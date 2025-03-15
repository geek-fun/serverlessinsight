import * as ros from '@alicloud/ros-cdk-core';
import { ServerlessIac } from '../../types';
import { getContext, replaceReference } from '../../common';
import { resolveTags } from './tag';
import { resolveFunctions } from './function';
import { resolveStages } from './stage';
import { resloveVars } from './vars';
import { resolveDatabases } from './database';
import { resolveEvents } from './event';
import { resolveBuckets } from './bucket';

export * from './bootstrap';

export class RosStack extends ros.Stack {
  private readonly service: string;

  constructor(scope: ros.Construct, iac: ServerlessIac, context = getContext()) {
    super(scope, replaceReference(iac.service, context), {
      stackName: context.stackName,
      tags: resolveTags(iac.tags, context),
    });

    this.service = replaceReference(iac.service, context);
    new ros.RosInfo(this, ros.RosInfo.description, `${this.service} stack`);

    // Define Parameters
    resloveVars(this, iac.vars);
    // Define Mappings
    resolveStages(this, iac.stages, context);
    // Define functions
    resolveFunctions(this, iac.functions, iac.tags, context, this.service);
    // Define Events
    resolveEvents(this, iac.events, iac.tags, context, this.service);
    // Define Databases
    resolveDatabases(this, iac.databases, context);
    // Define Buckets
    resolveBuckets(this, iac.buckets, context);
  }
}

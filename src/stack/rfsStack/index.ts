import { TerraformStack } from 'cdktf';
import { Construct } from 'constructs';
import { ActionContext, ServerlessIac } from '../../types';
import { HuaweicloudProvider } from '../../constructs/providers/huaweicloud/provider';

export class RfsStack extends TerraformStack {
  constructor(scope: Construct, iac: ServerlessIac, context: ActionContext) {
    super(scope, context.stackName);
    new HuaweicloudProvider(scope, 'huaweicloud', {
      region: context.region,
      accessKey: context.accessKeyId,
      secretKey: context.accessKeySecret,
    });
  }
}

import { ActionContext, ServerlessIac } from '../../types';
import { resolveFunction } from './function';

const provider = (stack: RfsStack, context: ActionContext) => {
  const hcl = `
terraform {
  required_providers {
    huaweicloud = {
      source  = "huaweicloud/huaweicloud"
      version = ">= 1.67.1"
    }
  }
}

provider "huaweicloud" {
  region     = "${context.region}"
  access_key = "${context.accessKeyId}"
  secret_key = "${context.accessKeySecret}"
}
  `;
  stack.appendHcl(hcl);
};

export class RfsStack {
  private hcl: string = '';

  constructor(
    private readonly iac: ServerlessIac,
    private readonly context: ActionContext,
  ) {
    provider(this, context);
    resolveFunction(this, iac.functions, context, iac.service);
  }

  public toHclTerraform() {
    return this.hcl;
  }

  public appendHcl(hcl: string) {
    this.hcl += hcl;
  }
}
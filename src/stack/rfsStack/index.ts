import { ActionContext, ServerlessIac } from '../../types';

const provider = (context: ActionContext) => `
terraform {
  required_providers {
    huaweicloud = {
      source  = "huaweicloud/huaweicloud"
      version = ">= 1.71.2"
    }
  }
}

provider "huaweicloud" {
  region     = "${context.region}"
  access_key = "${context.accessKeyId}"
  secret_key = "${context.accessKeySecret}"
}
`;

export class RfsStack {
  private hcl: string = '';

  constructor(
    private readonly iac: ServerlessIac,
    private readonly context: ActionContext,
  ) {
    this.hcl = provider(context);
  }
  public toHclTerraform() {
    return this.hcl;
  }
}

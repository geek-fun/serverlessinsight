// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_custom_policy_attachment
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IdentitycenterCustomPolicyAttachmentConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the custom policy to attach to a permission set.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_custom_policy_attachment#custom_policy IdentitycenterCustomPolicyAttachment#custom_policy}
  */
  readonly customPolicy: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_custom_policy_attachment#id IdentitycenterCustomPolicyAttachment#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the IAM Identity Center instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_custom_policy_attachment#instance_id IdentitycenterCustomPolicyAttachment#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the ID of the IAM Identity Center permission set.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_custom_policy_attachment#permission_set_id IdentitycenterCustomPolicyAttachment#permission_set_id}
  */
  readonly permissionSetId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_custom_policy_attachment huaweicloud_identitycenter_custom_policy_attachment}
*/
export class IdentitycenterCustomPolicyAttachment extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_identitycenter_custom_policy_attachment";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IdentitycenterCustomPolicyAttachment resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IdentitycenterCustomPolicyAttachment to import
  * @param importFromId The id of the existing IdentitycenterCustomPolicyAttachment that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_custom_policy_attachment#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IdentitycenterCustomPolicyAttachment to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_identitycenter_custom_policy_attachment", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_custom_policy_attachment huaweicloud_identitycenter_custom_policy_attachment} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IdentitycenterCustomPolicyAttachmentConfig
  */
  public constructor(scope: Construct, id: string, config: IdentitycenterCustomPolicyAttachmentConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_identitycenter_custom_policy_attachment',
      terraformGeneratorMetadata: {
        providerName: 'huaweicloud',
        providerVersion: '1.71.1',
        providerVersionConstraint: '~> 1.71'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._customPolicy = config.customPolicy;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._permissionSetId = config.permissionSetId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // custom_policy - computed: false, optional: false, required: true
  private _customPolicy?: string; 
  public get customPolicy() {
    return this.getStringAttribute('custom_policy');
  }
  public set customPolicy(value: string) {
    this._customPolicy = value;
  }
  // Temporarily expose input value. Use with caution.
  public get customPolicyInput() {
    return this._customPolicy;
  }

  // id - computed: true, optional: true, required: false
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  public resetId() {
    this._id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // permission_set_id - computed: false, optional: false, required: true
  private _permissionSetId?: string; 
  public get permissionSetId() {
    return this.getStringAttribute('permission_set_id');
  }
  public set permissionSetId(value: string) {
    this._permissionSetId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get permissionSetIdInput() {
    return this._permissionSetId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      custom_policy: cdktf.stringToTerraform(this._customPolicy),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      permission_set_id: cdktf.stringToTerraform(this._permissionSetId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      custom_policy: {
        value: cdktf.stringToHclTerraform(this._customPolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      permission_set_id: {
        value: cdktf.stringToHclTerraform(this._permissionSetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

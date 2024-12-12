// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AsLifecycleHookCallbackConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback#id AsLifecycleHookCallback#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback#instance_id AsLifecycleHookCallback#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback#lifecycle_action_key AsLifecycleHookCallback#lifecycle_action_key}
  */
  readonly lifecycleActionKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback#lifecycle_action_result AsLifecycleHookCallback#lifecycle_action_result}
  */
  readonly lifecycleActionResult: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback#lifecycle_hook_name AsLifecycleHookCallback#lifecycle_hook_name}
  */
  readonly lifecycleHookName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback#region AsLifecycleHookCallback#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback#scaling_group_id AsLifecycleHookCallback#scaling_group_id}
  */
  readonly scalingGroupId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback huaweicloud_as_lifecycle_hook_callback}
*/
export class AsLifecycleHookCallback extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_as_lifecycle_hook_callback";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AsLifecycleHookCallback resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AsLifecycleHookCallback to import
  * @param importFromId The id of the existing AsLifecycleHookCallback that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AsLifecycleHookCallback to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_as_lifecycle_hook_callback", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_lifecycle_hook_callback huaweicloud_as_lifecycle_hook_callback} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AsLifecycleHookCallbackConfig
  */
  public constructor(scope: Construct, id: string, config: AsLifecycleHookCallbackConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_as_lifecycle_hook_callback',
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
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._lifecycleActionKey = config.lifecycleActionKey;
    this._lifecycleActionResult = config.lifecycleActionResult;
    this._lifecycleHookName = config.lifecycleHookName;
    this._region = config.region;
    this._scalingGroupId = config.scalingGroupId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // instance_id - computed: false, optional: true, required: false
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  public resetInstanceId() {
    this._instanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // lifecycle_action_key - computed: false, optional: true, required: false
  private _lifecycleActionKey?: string; 
  public get lifecycleActionKey() {
    return this.getStringAttribute('lifecycle_action_key');
  }
  public set lifecycleActionKey(value: string) {
    this._lifecycleActionKey = value;
  }
  public resetLifecycleActionKey() {
    this._lifecycleActionKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lifecycleActionKeyInput() {
    return this._lifecycleActionKey;
  }

  // lifecycle_action_result - computed: false, optional: false, required: true
  private _lifecycleActionResult?: string; 
  public get lifecycleActionResult() {
    return this.getStringAttribute('lifecycle_action_result');
  }
  public set lifecycleActionResult(value: string) {
    this._lifecycleActionResult = value;
  }
  // Temporarily expose input value. Use with caution.
  public get lifecycleActionResultInput() {
    return this._lifecycleActionResult;
  }

  // lifecycle_hook_name - computed: false, optional: true, required: false
  private _lifecycleHookName?: string; 
  public get lifecycleHookName() {
    return this.getStringAttribute('lifecycle_hook_name');
  }
  public set lifecycleHookName(value: string) {
    this._lifecycleHookName = value;
  }
  public resetLifecycleHookName() {
    this._lifecycleHookName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lifecycleHookNameInput() {
    return this._lifecycleHookName;
  }

  // region - computed: true, optional: true, required: false
  private _region?: string; 
  public get region() {
    return this.getStringAttribute('region');
  }
  public set region(value: string) {
    this._region = value;
  }
  public resetRegion() {
    this._region = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get regionInput() {
    return this._region;
  }

  // scaling_group_id - computed: false, optional: false, required: true
  private _scalingGroupId?: string; 
  public get scalingGroupId() {
    return this.getStringAttribute('scaling_group_id');
  }
  public set scalingGroupId(value: string) {
    this._scalingGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingGroupIdInput() {
    return this._scalingGroupId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      lifecycle_action_key: cdktf.stringToTerraform(this._lifecycleActionKey),
      lifecycle_action_result: cdktf.stringToTerraform(this._lifecycleActionResult),
      lifecycle_hook_name: cdktf.stringToTerraform(this._lifecycleHookName),
      region: cdktf.stringToTerraform(this._region),
      scaling_group_id: cdktf.stringToTerraform(this._scalingGroupId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
      lifecycle_action_key: {
        value: cdktf.stringToHclTerraform(this._lifecycleActionKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lifecycle_action_result: {
        value: cdktf.stringToHclTerraform(this._lifecycleActionResult),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lifecycle_hook_name: {
        value: cdktf.stringToHclTerraform(this._lifecycleHookName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      scaling_group_id: {
        value: cdktf.stringToHclTerraform(this._scalingGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WorkspaceUserConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#account_expires WorkspaceUser#account_expires}
  */
  readonly accountExpires?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#description WorkspaceUser#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#disabled WorkspaceUser#disabled}
  */
  readonly disabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#email WorkspaceUser#email}
  */
  readonly email: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#enable_change_password WorkspaceUser#enable_change_password}
  */
  readonly enableChangePassword?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#id WorkspaceUser#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#name WorkspaceUser#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#next_login_change_password WorkspaceUser#next_login_change_password}
  */
  readonly nextLoginChangePassword?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#password_never_expires WorkspaceUser#password_never_expires}
  */
  readonly passwordNeverExpires?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#region WorkspaceUser#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user huaweicloud_workspace_user}
*/
export class WorkspaceUser extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_user";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WorkspaceUser resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WorkspaceUser to import
  * @param importFromId The id of the existing WorkspaceUser that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WorkspaceUser to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_user", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_user huaweicloud_workspace_user} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WorkspaceUserConfig
  */
  public constructor(scope: Construct, id: string, config: WorkspaceUserConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_user',
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
    this._accountExpires = config.accountExpires;
    this._description = config.description;
    this._disabled = config.disabled;
    this._email = config.email;
    this._enableChangePassword = config.enableChangePassword;
    this._id = config.id;
    this._name = config.name;
    this._nextLoginChangePassword = config.nextLoginChangePassword;
    this._passwordNeverExpires = config.passwordNeverExpires;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // account_expires - computed: false, optional: true, required: false
  private _accountExpires?: string; 
  public get accountExpires() {
    return this.getStringAttribute('account_expires');
  }
  public set accountExpires(value: string) {
    this._accountExpires = value;
  }
  public resetAccountExpires() {
    this._accountExpires = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountExpiresInput() {
    return this._accountExpires;
  }

  // description - computed: false, optional: true, required: false
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  public resetDescription() {
    this._description = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
  }

  // disabled - computed: false, optional: true, required: false
  private _disabled?: boolean | cdktf.IResolvable; 
  public get disabled() {
    return this.getBooleanAttribute('disabled');
  }
  public set disabled(value: boolean | cdktf.IResolvable) {
    this._disabled = value;
  }
  public resetDisabled() {
    this._disabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disabledInput() {
    return this._disabled;
  }

  // email - computed: false, optional: false, required: true
  private _email?: string; 
  public get email() {
    return this.getStringAttribute('email');
  }
  public set email(value: string) {
    this._email = value;
  }
  // Temporarily expose input value. Use with caution.
  public get emailInput() {
    return this._email;
  }

  // enable_change_password - computed: false, optional: true, required: false
  private _enableChangePassword?: boolean | cdktf.IResolvable; 
  public get enableChangePassword() {
    return this.getBooleanAttribute('enable_change_password');
  }
  public set enableChangePassword(value: boolean | cdktf.IResolvable) {
    this._enableChangePassword = value;
  }
  public resetEnableChangePassword() {
    this._enableChangePassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableChangePasswordInput() {
    return this._enableChangePassword;
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

  // locked - computed: true, optional: false, required: false
  public get locked() {
    return this.getBooleanAttribute('locked');
  }

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // next_login_change_password - computed: false, optional: true, required: false
  private _nextLoginChangePassword?: boolean | cdktf.IResolvable; 
  public get nextLoginChangePassword() {
    return this.getBooleanAttribute('next_login_change_password');
  }
  public set nextLoginChangePassword(value: boolean | cdktf.IResolvable) {
    this._nextLoginChangePassword = value;
  }
  public resetNextLoginChangePassword() {
    this._nextLoginChangePassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nextLoginChangePasswordInput() {
    return this._nextLoginChangePassword;
  }

  // password_never_expires - computed: false, optional: true, required: false
  private _passwordNeverExpires?: boolean | cdktf.IResolvable; 
  public get passwordNeverExpires() {
    return this.getBooleanAttribute('password_never_expires');
  }
  public set passwordNeverExpires(value: boolean | cdktf.IResolvable) {
    this._passwordNeverExpires = value;
  }
  public resetPasswordNeverExpires() {
    this._passwordNeverExpires = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordNeverExpiresInput() {
    return this._passwordNeverExpires;
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

  // total_desktops - computed: true, optional: false, required: false
  public get totalDesktops() {
    return this.getNumberAttribute('total_desktops');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      account_expires: cdktf.stringToTerraform(this._accountExpires),
      description: cdktf.stringToTerraform(this._description),
      disabled: cdktf.booleanToTerraform(this._disabled),
      email: cdktf.stringToTerraform(this._email),
      enable_change_password: cdktf.booleanToTerraform(this._enableChangePassword),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      next_login_change_password: cdktf.booleanToTerraform(this._nextLoginChangePassword),
      password_never_expires: cdktf.booleanToTerraform(this._passwordNeverExpires),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      account_expires: {
        value: cdktf.stringToHclTerraform(this._accountExpires),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      disabled: {
        value: cdktf.booleanToHclTerraform(this._disabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      email: {
        value: cdktf.stringToHclTerraform(this._email),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_change_password: {
        value: cdktf.booleanToHclTerraform(this._enableChangePassword),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      next_login_change_password: {
        value: cdktf.booleanToHclTerraform(this._nextLoginChangePassword),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      password_never_expires: {
        value: cdktf.booleanToHclTerraform(this._passwordNeverExpires),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

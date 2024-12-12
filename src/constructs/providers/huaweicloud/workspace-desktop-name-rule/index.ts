// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WorkspaceDesktopNameRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule#digit_number WorkspaceDesktopNameRule#digit_number}
  */
  readonly digitNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule#id WorkspaceDesktopNameRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule#is_default_policy WorkspaceDesktopNameRule#is_default_policy}
  */
  readonly isDefaultPolicy?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule#name WorkspaceDesktopNameRule#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule#name_prefix WorkspaceDesktopNameRule#name_prefix}
  */
  readonly namePrefix: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule#region WorkspaceDesktopNameRule#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule#single_domain_user_increment WorkspaceDesktopNameRule#single_domain_user_increment}
  */
  readonly singleDomainUserIncrement: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule#start_number WorkspaceDesktopNameRule#start_number}
  */
  readonly startNumber: number;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule huaweicloud_workspace_desktop_name_rule}
*/
export class WorkspaceDesktopNameRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_desktop_name_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WorkspaceDesktopNameRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WorkspaceDesktopNameRule to import
  * @param importFromId The id of the existing WorkspaceDesktopNameRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WorkspaceDesktopNameRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_desktop_name_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_desktop_name_rule huaweicloud_workspace_desktop_name_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WorkspaceDesktopNameRuleConfig
  */
  public constructor(scope: Construct, id: string, config: WorkspaceDesktopNameRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_desktop_name_rule',
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
    this._digitNumber = config.digitNumber;
    this._id = config.id;
    this._isDefaultPolicy = config.isDefaultPolicy;
    this._name = config.name;
    this._namePrefix = config.namePrefix;
    this._region = config.region;
    this._singleDomainUserIncrement = config.singleDomainUserIncrement;
    this._startNumber = config.startNumber;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // digit_number - computed: false, optional: false, required: true
  private _digitNumber?: number; 
  public get digitNumber() {
    return this.getNumberAttribute('digit_number');
  }
  public set digitNumber(value: number) {
    this._digitNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get digitNumberInput() {
    return this._digitNumber;
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

  // is_contain_user - computed: true, optional: false, required: false
  public get isContainUser() {
    return this.getBooleanAttribute('is_contain_user');
  }

  // is_default_policy - computed: true, optional: true, required: false
  private _isDefaultPolicy?: boolean | cdktf.IResolvable; 
  public get isDefaultPolicy() {
    return this.getBooleanAttribute('is_default_policy');
  }
  public set isDefaultPolicy(value: boolean | cdktf.IResolvable) {
    this._isDefaultPolicy = value;
  }
  public resetIsDefaultPolicy() {
    this._isDefaultPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isDefaultPolicyInput() {
    return this._isDefaultPolicy;
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

  // name_prefix - computed: false, optional: false, required: true
  private _namePrefix?: string; 
  public get namePrefix() {
    return this.getStringAttribute('name_prefix');
  }
  public set namePrefix(value: string) {
    this._namePrefix = value;
  }
  // Temporarily expose input value. Use with caution.
  public get namePrefixInput() {
    return this._namePrefix;
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

  // single_domain_user_increment - computed: false, optional: false, required: true
  private _singleDomainUserIncrement?: number; 
  public get singleDomainUserIncrement() {
    return this.getNumberAttribute('single_domain_user_increment');
  }
  public set singleDomainUserIncrement(value: number) {
    this._singleDomainUserIncrement = value;
  }
  // Temporarily expose input value. Use with caution.
  public get singleDomainUserIncrementInput() {
    return this._singleDomainUserIncrement;
  }

  // start_number - computed: false, optional: false, required: true
  private _startNumber?: number; 
  public get startNumber() {
    return this.getNumberAttribute('start_number');
  }
  public set startNumber(value: number) {
    this._startNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startNumberInput() {
    return this._startNumber;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      digit_number: cdktf.numberToTerraform(this._digitNumber),
      id: cdktf.stringToTerraform(this._id),
      is_default_policy: cdktf.booleanToTerraform(this._isDefaultPolicy),
      name: cdktf.stringToTerraform(this._name),
      name_prefix: cdktf.stringToTerraform(this._namePrefix),
      region: cdktf.stringToTerraform(this._region),
      single_domain_user_increment: cdktf.numberToTerraform(this._singleDomainUserIncrement),
      start_number: cdktf.numberToTerraform(this._startNumber),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      digit_number: {
        value: cdktf.numberToHclTerraform(this._digitNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_default_policy: {
        value: cdktf.booleanToHclTerraform(this._isDefaultPolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name_prefix: {
        value: cdktf.stringToHclTerraform(this._namePrefix),
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
      single_domain_user_increment: {
        value: cdktf.numberToHclTerraform(this._singleDomainUserIncrement),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      start_number: {
        value: cdktf.numberToHclTerraform(this._startNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

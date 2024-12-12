// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RgcAccountConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#email RgcAccount#email}
  */
  readonly email: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#id RgcAccount#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#identity_store_email RgcAccount#identity_store_email}
  */
  readonly identityStoreEmail: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#identity_store_user_name RgcAccount#identity_store_user_name}
  */
  readonly identityStoreUserName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#name RgcAccount#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#parent_organizational_unit_id RgcAccount#parent_organizational_unit_id}
  */
  readonly parentOrganizationalUnitId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#parent_organizational_unit_name RgcAccount#parent_organizational_unit_name}
  */
  readonly parentOrganizationalUnitName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#phone RgcAccount#phone}
  */
  readonly phone?: string;
  /**
  * blueprint block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#blueprint RgcAccount#blueprint}
  */
  readonly blueprint?: RgcAccountBlueprint;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#timeouts RgcAccount#timeouts}
  */
  readonly timeouts?: RgcAccountTimeouts;
}
export interface RgcAccountBlueprint {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#blueprint_product_id RgcAccount#blueprint_product_id}
  */
  readonly blueprintProductId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#blueprint_product_version RgcAccount#blueprint_product_version}
  */
  readonly blueprintProductVersion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#is_blueprint_has_multi_account_resource RgcAccount#is_blueprint_has_multi_account_resource}
  */
  readonly isBlueprintHasMultiAccountResource?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#variables RgcAccount#variables}
  */
  readonly variables?: string;
}

export function rgcAccountBlueprintToTerraform(struct?: RgcAccountBlueprintOutputReference | RgcAccountBlueprint): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    blueprint_product_id: cdktf.stringToTerraform(struct!.blueprintProductId),
    blueprint_product_version: cdktf.stringToTerraform(struct!.blueprintProductVersion),
    is_blueprint_has_multi_account_resource: cdktf.booleanToTerraform(struct!.isBlueprintHasMultiAccountResource),
    variables: cdktf.stringToTerraform(struct!.variables),
  }
}


export function rgcAccountBlueprintToHclTerraform(struct?: RgcAccountBlueprintOutputReference | RgcAccountBlueprint): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    blueprint_product_id: {
      value: cdktf.stringToHclTerraform(struct!.blueprintProductId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    blueprint_product_version: {
      value: cdktf.stringToHclTerraform(struct!.blueprintProductVersion),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    is_blueprint_has_multi_account_resource: {
      value: cdktf.booleanToHclTerraform(struct!.isBlueprintHasMultiAccountResource),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    variables: {
      value: cdktf.stringToHclTerraform(struct!.variables),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RgcAccountBlueprintOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): RgcAccountBlueprint | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._blueprintProductId !== undefined) {
      hasAnyValues = true;
      internalValueResult.blueprintProductId = this._blueprintProductId;
    }
    if (this._blueprintProductVersion !== undefined) {
      hasAnyValues = true;
      internalValueResult.blueprintProductVersion = this._blueprintProductVersion;
    }
    if (this._isBlueprintHasMultiAccountResource !== undefined) {
      hasAnyValues = true;
      internalValueResult.isBlueprintHasMultiAccountResource = this._isBlueprintHasMultiAccountResource;
    }
    if (this._variables !== undefined) {
      hasAnyValues = true;
      internalValueResult.variables = this._variables;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RgcAccountBlueprint | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._blueprintProductId = undefined;
      this._blueprintProductVersion = undefined;
      this._isBlueprintHasMultiAccountResource = undefined;
      this._variables = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._blueprintProductId = value.blueprintProductId;
      this._blueprintProductVersion = value.blueprintProductVersion;
      this._isBlueprintHasMultiAccountResource = value.isBlueprintHasMultiAccountResource;
      this._variables = value.variables;
    }
  }

  // blueprint_product_id - computed: false, optional: true, required: false
  private _blueprintProductId?: string; 
  public get blueprintProductId() {
    return this.getStringAttribute('blueprint_product_id');
  }
  public set blueprintProductId(value: string) {
    this._blueprintProductId = value;
  }
  public resetBlueprintProductId() {
    this._blueprintProductId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get blueprintProductIdInput() {
    return this._blueprintProductId;
  }

  // blueprint_product_version - computed: false, optional: true, required: false
  private _blueprintProductVersion?: string; 
  public get blueprintProductVersion() {
    return this.getStringAttribute('blueprint_product_version');
  }
  public set blueprintProductVersion(value: string) {
    this._blueprintProductVersion = value;
  }
  public resetBlueprintProductVersion() {
    this._blueprintProductVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get blueprintProductVersionInput() {
    return this._blueprintProductVersion;
  }

  // is_blueprint_has_multi_account_resource - computed: false, optional: true, required: false
  private _isBlueprintHasMultiAccountResource?: boolean | cdktf.IResolvable; 
  public get isBlueprintHasMultiAccountResource() {
    return this.getBooleanAttribute('is_blueprint_has_multi_account_resource');
  }
  public set isBlueprintHasMultiAccountResource(value: boolean | cdktf.IResolvable) {
    this._isBlueprintHasMultiAccountResource = value;
  }
  public resetIsBlueprintHasMultiAccountResource() {
    this._isBlueprintHasMultiAccountResource = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isBlueprintHasMultiAccountResourceInput() {
    return this._isBlueprintHasMultiAccountResource;
  }

  // variables - computed: false, optional: true, required: false
  private _variables?: string; 
  public get variables() {
    return this.getStringAttribute('variables');
  }
  public set variables(value: string) {
    this._variables = value;
  }
  public resetVariables() {
    this._variables = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get variablesInput() {
    return this._variables;
  }
}
export interface RgcAccountTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#create RgcAccount#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#delete RgcAccount#delete}
  */
  readonly delete?: string;
}

export function rgcAccountTimeoutsToTerraform(struct?: RgcAccountTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function rgcAccountTimeoutsToHclTerraform(struct?: RgcAccountTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RgcAccountTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): RgcAccountTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RgcAccountTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._delete = value.delete;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account huaweicloud_rgc_account}
*/
export class RgcAccount extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rgc_account";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a RgcAccount resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the RgcAccount to import
  * @param importFromId The id of the existing RgcAccount that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the RgcAccount to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rgc_account", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rgc_account huaweicloud_rgc_account} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RgcAccountConfig
  */
  public constructor(scope: Construct, id: string, config: RgcAccountConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rgc_account',
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
    this._email = config.email;
    this._id = config.id;
    this._identityStoreEmail = config.identityStoreEmail;
    this._identityStoreUserName = config.identityStoreUserName;
    this._name = config.name;
    this._parentOrganizationalUnitId = config.parentOrganizationalUnitId;
    this._parentOrganizationalUnitName = config.parentOrganizationalUnitName;
    this._phone = config.phone;
    this._blueprint.internalValue = config.blueprint;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // identity_store_email - computed: false, optional: false, required: true
  private _identityStoreEmail?: string; 
  public get identityStoreEmail() {
    return this.getStringAttribute('identity_store_email');
  }
  public set identityStoreEmail(value: string) {
    this._identityStoreEmail = value;
  }
  // Temporarily expose input value. Use with caution.
  public get identityStoreEmailInput() {
    return this._identityStoreEmail;
  }

  // identity_store_user_name - computed: false, optional: false, required: true
  private _identityStoreUserName?: string; 
  public get identityStoreUserName() {
    return this.getStringAttribute('identity_store_user_name');
  }
  public set identityStoreUserName(value: string) {
    this._identityStoreUserName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get identityStoreUserNameInput() {
    return this._identityStoreUserName;
  }

  // joined_at - computed: true, optional: false, required: false
  public get joinedAt() {
    return this.getStringAttribute('joined_at');
  }

  // joined_method - computed: true, optional: false, required: false
  public get joinedMethod() {
    return this.getStringAttribute('joined_method');
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

  // parent_organizational_unit_id - computed: false, optional: false, required: true
  private _parentOrganizationalUnitId?: string; 
  public get parentOrganizationalUnitId() {
    return this.getStringAttribute('parent_organizational_unit_id');
  }
  public set parentOrganizationalUnitId(value: string) {
    this._parentOrganizationalUnitId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get parentOrganizationalUnitIdInput() {
    return this._parentOrganizationalUnitId;
  }

  // parent_organizational_unit_name - computed: false, optional: false, required: true
  private _parentOrganizationalUnitName?: string; 
  public get parentOrganizationalUnitName() {
    return this.getStringAttribute('parent_organizational_unit_name');
  }
  public set parentOrganizationalUnitName(value: string) {
    this._parentOrganizationalUnitName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get parentOrganizationalUnitNameInput() {
    return this._parentOrganizationalUnitName;
  }

  // phone - computed: false, optional: true, required: false
  private _phone?: string; 
  public get phone() {
    return this.getStringAttribute('phone');
  }
  public set phone(value: string) {
    this._phone = value;
  }
  public resetPhone() {
    this._phone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get phoneInput() {
    return this._phone;
  }

  // urn - computed: true, optional: false, required: false
  public get urn() {
    return this.getStringAttribute('urn');
  }

  // blueprint - computed: false, optional: true, required: false
  private _blueprint = new RgcAccountBlueprintOutputReference(this, "blueprint");
  public get blueprint() {
    return this._blueprint;
  }
  public putBlueprint(value: RgcAccountBlueprint) {
    this._blueprint.internalValue = value;
  }
  public resetBlueprint() {
    this._blueprint.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get blueprintInput() {
    return this._blueprint.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new RgcAccountTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: RgcAccountTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      email: cdktf.stringToTerraform(this._email),
      id: cdktf.stringToTerraform(this._id),
      identity_store_email: cdktf.stringToTerraform(this._identityStoreEmail),
      identity_store_user_name: cdktf.stringToTerraform(this._identityStoreUserName),
      name: cdktf.stringToTerraform(this._name),
      parent_organizational_unit_id: cdktf.stringToTerraform(this._parentOrganizationalUnitId),
      parent_organizational_unit_name: cdktf.stringToTerraform(this._parentOrganizationalUnitName),
      phone: cdktf.stringToTerraform(this._phone),
      blueprint: rgcAccountBlueprintToTerraform(this._blueprint.internalValue),
      timeouts: rgcAccountTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      email: {
        value: cdktf.stringToHclTerraform(this._email),
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
      identity_store_email: {
        value: cdktf.stringToHclTerraform(this._identityStoreEmail),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      identity_store_user_name: {
        value: cdktf.stringToHclTerraform(this._identityStoreUserName),
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
      parent_organizational_unit_id: {
        value: cdktf.stringToHclTerraform(this._parentOrganizationalUnitId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      parent_organizational_unit_name: {
        value: cdktf.stringToHclTerraform(this._parentOrganizationalUnitName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      phone: {
        value: cdktf.stringToHclTerraform(this._phone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      blueprint: {
        value: rgcAccountBlueprintToHclTerraform(this._blueprint.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "RgcAccountBlueprintList",
      },
      timeouts: {
        value: rgcAccountTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "RgcAccountTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RmsOrganizationalAssignmentPackageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the excluded accounts for conformance package deployment.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#excluded_accounts RmsOrganizationalAssignmentPackage#excluded_accounts}
  */
  readonly excludedAccounts?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#id RmsOrganizationalAssignmentPackage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the assignment package name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#name RmsOrganizationalAssignmentPackage#name}
  */
  readonly name: string;
  /**
  * Specifies the ID of the organization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#organization_id RmsOrganizationalAssignmentPackage#organization_id}
  */
  readonly organizationId: string;
  /**
  * Specifies the content of a custom assignment package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#template_body RmsOrganizationalAssignmentPackage#template_body}
  */
  readonly templateBody?: string;
  /**
  * Specifies the name of a predefined conformance package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#template_key RmsOrganizationalAssignmentPackage#template_key}
  */
  readonly templateKey?: string;
  /**
  * Specifies the OBS address of a conformance package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#template_uri RmsOrganizationalAssignmentPackage#template_uri}
  */
  readonly templateUri?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#timeouts RmsOrganizationalAssignmentPackage#timeouts}
  */
  readonly timeouts?: RmsOrganizationalAssignmentPackageTimeouts;
  /**
  * vars_structure block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#vars_structure RmsOrganizationalAssignmentPackage#vars_structure}
  */
  readonly varsStructure?: RmsOrganizationalAssignmentPackageVarsStructure[] | cdktf.IResolvable;
}
export interface RmsOrganizationalAssignmentPackageTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#create RmsOrganizationalAssignmentPackage#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#delete RmsOrganizationalAssignmentPackage#delete}
  */
  readonly delete?: string;
}

export function rmsOrganizationalAssignmentPackageTimeoutsToTerraform(struct?: RmsOrganizationalAssignmentPackageTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function rmsOrganizationalAssignmentPackageTimeoutsToHclTerraform(struct?: RmsOrganizationalAssignmentPackageTimeouts | cdktf.IResolvable): any {
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

export class RmsOrganizationalAssignmentPackageTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): RmsOrganizationalAssignmentPackageTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: RmsOrganizationalAssignmentPackageTimeouts | cdktf.IResolvable | undefined) {
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
export interface RmsOrganizationalAssignmentPackageVarsStructure {
  /**
  * Specifies the name of a parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#var_key RmsOrganizationalAssignmentPackage#var_key}
  */
  readonly varKey?: string;
  /**
  * Specifies the value of a parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#var_value RmsOrganizationalAssignmentPackage#var_value}
  */
  readonly varValue?: string;
}

export function rmsOrganizationalAssignmentPackageVarsStructureToTerraform(struct?: RmsOrganizationalAssignmentPackageVarsStructure | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    var_key: cdktf.stringToTerraform(struct!.varKey),
    var_value: cdktf.stringToTerraform(struct!.varValue),
  }
}


export function rmsOrganizationalAssignmentPackageVarsStructureToHclTerraform(struct?: RmsOrganizationalAssignmentPackageVarsStructure | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    var_key: {
      value: cdktf.stringToHclTerraform(struct!.varKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    var_value: {
      value: cdktf.stringToHclTerraform(struct!.varValue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RmsOrganizationalAssignmentPackageVarsStructureOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): RmsOrganizationalAssignmentPackageVarsStructure | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._varKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.varKey = this._varKey;
    }
    if (this._varValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.varValue = this._varValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RmsOrganizationalAssignmentPackageVarsStructure | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._varKey = undefined;
      this._varValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._varKey = value.varKey;
      this._varValue = value.varValue;
    }
  }

  // var_key - computed: true, optional: true, required: false
  private _varKey?: string; 
  public get varKey() {
    return this.getStringAttribute('var_key');
  }
  public set varKey(value: string) {
    this._varKey = value;
  }
  public resetVarKey() {
    this._varKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get varKeyInput() {
    return this._varKey;
  }

  // var_value - computed: true, optional: true, required: false
  private _varValue?: string; 
  public get varValue() {
    return this.getStringAttribute('var_value');
  }
  public set varValue(value: string) {
    this._varValue = value;
  }
  public resetVarValue() {
    this._varValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get varValueInput() {
    return this._varValue;
  }
}

export class RmsOrganizationalAssignmentPackageVarsStructureList extends cdktf.ComplexList {
  public internalValue? : RmsOrganizationalAssignmentPackageVarsStructure[] | cdktf.IResolvable

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): RmsOrganizationalAssignmentPackageVarsStructureOutputReference {
    return new RmsOrganizationalAssignmentPackageVarsStructureOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package huaweicloud_rms_organizational_assignment_package}
*/
export class RmsOrganizationalAssignmentPackage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rms_organizational_assignment_package";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a RmsOrganizationalAssignmentPackage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the RmsOrganizationalAssignmentPackage to import
  * @param importFromId The id of the existing RmsOrganizationalAssignmentPackage that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the RmsOrganizationalAssignmentPackage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rms_organizational_assignment_package", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_organizational_assignment_package huaweicloud_rms_organizational_assignment_package} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RmsOrganizationalAssignmentPackageConfig
  */
  public constructor(scope: Construct, id: string, config: RmsOrganizationalAssignmentPackageConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rms_organizational_assignment_package',
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
    this._excludedAccounts = config.excludedAccounts;
    this._id = config.id;
    this._name = config.name;
    this._organizationId = config.organizationId;
    this._templateBody = config.templateBody;
    this._templateKey = config.templateKey;
    this._templateUri = config.templateUri;
    this._timeouts.internalValue = config.timeouts;
    this._varsStructure.internalValue = config.varsStructure;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // excluded_accounts - computed: true, optional: true, required: false
  private _excludedAccounts?: string[]; 
  public get excludedAccounts() {
    return this.getListAttribute('excluded_accounts');
  }
  public set excludedAccounts(value: string[]) {
    this._excludedAccounts = value;
  }
  public resetExcludedAccounts() {
    this._excludedAccounts = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get excludedAccountsInput() {
    return this._excludedAccounts;
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

  // org_conformance_pack_urn - computed: true, optional: false, required: false
  public get orgConformancePackUrn() {
    return this.getStringAttribute('org_conformance_pack_urn');
  }

  // organization_id - computed: false, optional: false, required: true
  private _organizationId?: string; 
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }
  public set organizationId(value: string) {
    this._organizationId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get organizationIdInput() {
    return this._organizationId;
  }

  // owner_id - computed: true, optional: false, required: false
  public get ownerId() {
    return this.getStringAttribute('owner_id');
  }

  // template_body - computed: true, optional: true, required: false
  private _templateBody?: string; 
  public get templateBody() {
    return this.getStringAttribute('template_body');
  }
  public set templateBody(value: string) {
    this._templateBody = value;
  }
  public resetTemplateBody() {
    this._templateBody = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateBodyInput() {
    return this._templateBody;
  }

  // template_key - computed: true, optional: true, required: false
  private _templateKey?: string; 
  public get templateKey() {
    return this.getStringAttribute('template_key');
  }
  public set templateKey(value: string) {
    this._templateKey = value;
  }
  public resetTemplateKey() {
    this._templateKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateKeyInput() {
    return this._templateKey;
  }

  // template_uri - computed: true, optional: true, required: false
  private _templateUri?: string; 
  public get templateUri() {
    return this.getStringAttribute('template_uri');
  }
  public set templateUri(value: string) {
    this._templateUri = value;
  }
  public resetTemplateUri() {
    this._templateUri = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateUriInput() {
    return this._templateUri;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new RmsOrganizationalAssignmentPackageTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: RmsOrganizationalAssignmentPackageTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // vars_structure - computed: false, optional: true, required: false
  private _varsStructure = new RmsOrganizationalAssignmentPackageVarsStructureList(this, "vars_structure", true);
  public get varsStructure() {
    return this._varsStructure;
  }
  public putVarsStructure(value: RmsOrganizationalAssignmentPackageVarsStructure[] | cdktf.IResolvable) {
    this._varsStructure.internalValue = value;
  }
  public resetVarsStructure() {
    this._varsStructure.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get varsStructureInput() {
    return this._varsStructure.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      excluded_accounts: cdktf.listMapper(cdktf.stringToTerraform, false)(this._excludedAccounts),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      organization_id: cdktf.stringToTerraform(this._organizationId),
      template_body: cdktf.stringToTerraform(this._templateBody),
      template_key: cdktf.stringToTerraform(this._templateKey),
      template_uri: cdktf.stringToTerraform(this._templateUri),
      timeouts: rmsOrganizationalAssignmentPackageTimeoutsToTerraform(this._timeouts.internalValue),
      vars_structure: cdktf.listMapper(rmsOrganizationalAssignmentPackageVarsStructureToTerraform, true)(this._varsStructure.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      excluded_accounts: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._excludedAccounts),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
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
      organization_id: {
        value: cdktf.stringToHclTerraform(this._organizationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      template_body: {
        value: cdktf.stringToHclTerraform(this._templateBody),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      template_key: {
        value: cdktf.stringToHclTerraform(this._templateKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      template_uri: {
        value: cdktf.stringToHclTerraform(this._templateUri),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeouts: {
        value: rmsOrganizationalAssignmentPackageTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "RmsOrganizationalAssignmentPackageTimeouts",
      },
      vars_structure: {
        value: cdktf.listMapperHcl(rmsOrganizationalAssignmentPackageVarsStructureToHclTerraform, true)(this._varsStructure.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "RmsOrganizationalAssignmentPackageVarsStructureList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

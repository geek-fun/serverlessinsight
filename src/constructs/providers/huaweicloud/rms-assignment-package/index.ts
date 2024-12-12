// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RmsAssignmentPackageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the agency name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#agency_name RmsAssignmentPackage#agency_name}
  */
  readonly agencyName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#id RmsAssignmentPackage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the assignment package name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#name RmsAssignmentPackage#name}
  */
  readonly name: string;
  /**
  * Specifies the content of a custom assignment package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#template_body RmsAssignmentPackage#template_body}
  */
  readonly templateBody?: string;
  /**
  * Specifies the name of a built-in assignment package template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#template_key RmsAssignmentPackage#template_key}
  */
  readonly templateKey?: string;
  /**
  * Specifies the URL address of the OBS bucket where an assignment package template was stored.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#template_uri RmsAssignmentPackage#template_uri}
  */
  readonly templateUri?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#timeouts RmsAssignmentPackage#timeouts}
  */
  readonly timeouts?: RmsAssignmentPackageTimeouts;
  /**
  * vars_structure block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#vars_structure RmsAssignmentPackage#vars_structure}
  */
  readonly varsStructure?: RmsAssignmentPackageVarsStructure[] | cdktf.IResolvable;
}
export interface RmsAssignmentPackageTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#create RmsAssignmentPackage#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#delete RmsAssignmentPackage#delete}
  */
  readonly delete?: string;
}

export function rmsAssignmentPackageTimeoutsToTerraform(struct?: RmsAssignmentPackageTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function rmsAssignmentPackageTimeoutsToHclTerraform(struct?: RmsAssignmentPackageTimeouts | cdktf.IResolvable): any {
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

export class RmsAssignmentPackageTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): RmsAssignmentPackageTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: RmsAssignmentPackageTimeouts | cdktf.IResolvable | undefined) {
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
export interface RmsAssignmentPackageVarsStructure {
  /**
  * Specifies the name of a parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#var_key RmsAssignmentPackage#var_key}
  */
  readonly varKey?: string;
  /**
  * Specifies the value of a parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#var_value RmsAssignmentPackage#var_value}
  */
  readonly varValue?: string;
}

export function rmsAssignmentPackageVarsStructureToTerraform(struct?: RmsAssignmentPackageVarsStructure | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    var_key: cdktf.stringToTerraform(struct!.varKey),
    var_value: cdktf.stringToTerraform(struct!.varValue),
  }
}


export function rmsAssignmentPackageVarsStructureToHclTerraform(struct?: RmsAssignmentPackageVarsStructure | cdktf.IResolvable): any {
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

export class RmsAssignmentPackageVarsStructureOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): RmsAssignmentPackageVarsStructure | cdktf.IResolvable | undefined {
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

  public set internalValue(value: RmsAssignmentPackageVarsStructure | cdktf.IResolvable | undefined) {
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

export class RmsAssignmentPackageVarsStructureList extends cdktf.ComplexList {
  public internalValue? : RmsAssignmentPackageVarsStructure[] | cdktf.IResolvable

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
  public get(index: number): RmsAssignmentPackageVarsStructureOutputReference {
    return new RmsAssignmentPackageVarsStructureOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package huaweicloud_rms_assignment_package}
*/
export class RmsAssignmentPackage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rms_assignment_package";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a RmsAssignmentPackage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the RmsAssignmentPackage to import
  * @param importFromId The id of the existing RmsAssignmentPackage that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the RmsAssignmentPackage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rms_assignment_package", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_assignment_package huaweicloud_rms_assignment_package} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RmsAssignmentPackageConfig
  */
  public constructor(scope: Construct, id: string, config: RmsAssignmentPackageConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rms_assignment_package',
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
    this._agencyName = config.agencyName;
    this._id = config.id;
    this._name = config.name;
    this._templateBody = config.templateBody;
    this._templateKey = config.templateKey;
    this._templateUri = config.templateUri;
    this._timeouts.internalValue = config.timeouts;
    this._varsStructure.internalValue = config.varsStructure;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // agency_name - computed: true, optional: true, required: false
  private _agencyName?: string; 
  public get agencyName() {
    return this.getStringAttribute('agency_name');
  }
  public set agencyName(value: string) {
    this._agencyName = value;
  }
  public resetAgencyName() {
    this._agencyName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyNameInput() {
    return this._agencyName;
  }

  // deployment_id - computed: true, optional: false, required: false
  public get deploymentId() {
    return this.getStringAttribute('deployment_id');
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

  // stack_id - computed: true, optional: false, required: false
  public get stackId() {
    return this.getStringAttribute('stack_id');
  }

  // stack_name - computed: true, optional: false, required: false
  public get stackName() {
    return this.getStringAttribute('stack_name');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new RmsAssignmentPackageTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: RmsAssignmentPackageTimeouts) {
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
  private _varsStructure = new RmsAssignmentPackageVarsStructureList(this, "vars_structure", true);
  public get varsStructure() {
    return this._varsStructure;
  }
  public putVarsStructure(value: RmsAssignmentPackageVarsStructure[] | cdktf.IResolvable) {
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
      agency_name: cdktf.stringToTerraform(this._agencyName),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      template_body: cdktf.stringToTerraform(this._templateBody),
      template_key: cdktf.stringToTerraform(this._templateKey),
      template_uri: cdktf.stringToTerraform(this._templateUri),
      timeouts: rmsAssignmentPackageTimeoutsToTerraform(this._timeouts.internalValue),
      vars_structure: cdktf.listMapper(rmsAssignmentPackageVarsStructureToTerraform, true)(this._varsStructure.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      agency_name: {
        value: cdktf.stringToHclTerraform(this._agencyName),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
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
        value: rmsAssignmentPackageTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "RmsAssignmentPackageTimeouts",
      },
      vars_structure: {
        value: cdktf.listMapperHcl(rmsAssignmentPackageVarsStructureToHclTerraform, true)(this._varsStructure.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "RmsAssignmentPackageVarsStructureList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

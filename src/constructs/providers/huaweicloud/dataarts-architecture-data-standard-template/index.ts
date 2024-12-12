// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataartsArchitectureDataStandardTemplateConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#id DataartsArchitectureDataStandardTemplate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#region DataartsArchitectureDataStandardTemplate#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#workspace_id DataartsArchitectureDataStandardTemplate#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * custom_fields block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#custom_fields DataartsArchitectureDataStandardTemplate#custom_fields}
  */
  readonly customFields?: DataartsArchitectureDataStandardTemplateCustomFields[] | cdktf.IResolvable;
  /**
  * optional_fields block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#optional_fields DataartsArchitectureDataStandardTemplate#optional_fields}
  */
  readonly optionalFields?: DataartsArchitectureDataStandardTemplateOptionalFields[] | cdktf.IResolvable;
}
export interface DataartsArchitectureDataStandardTemplateCustomFields {
  /**
  * Specifies the name of the field.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#fd_name DataartsArchitectureDataStandardTemplate#fd_name}
  */
  readonly fdName: string;
  /**
  * Specifies the optional values of the field.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#optional_values DataartsArchitectureDataStandardTemplate#optional_values}
  */
  readonly optionalValues?: string;
  /**
  * Specifies whether the field is required.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#required DataartsArchitectureDataStandardTemplate#required}
  */
  readonly required?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether the field is search supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#searchable DataartsArchitectureDataStandardTemplate#searchable}
  */
  readonly searchable?: boolean | cdktf.IResolvable;
}

export function dataartsArchitectureDataStandardTemplateCustomFieldsToTerraform(struct?: DataartsArchitectureDataStandardTemplateCustomFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    fd_name: cdktf.stringToTerraform(struct!.fdName),
    optional_values: cdktf.stringToTerraform(struct!.optionalValues),
    required: cdktf.booleanToTerraform(struct!.required),
    searchable: cdktf.booleanToTerraform(struct!.searchable),
  }
}


export function dataartsArchitectureDataStandardTemplateCustomFieldsToHclTerraform(struct?: DataartsArchitectureDataStandardTemplateCustomFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    fd_name: {
      value: cdktf.stringToHclTerraform(struct!.fdName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    optional_values: {
      value: cdktf.stringToHclTerraform(struct!.optionalValues),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    required: {
      value: cdktf.booleanToHclTerraform(struct!.required),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    searchable: {
      value: cdktf.booleanToHclTerraform(struct!.searchable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureDataStandardTemplateCustomFieldsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureDataStandardTemplateCustomFields | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._fdName !== undefined) {
      hasAnyValues = true;
      internalValueResult.fdName = this._fdName;
    }
    if (this._optionalValues !== undefined) {
      hasAnyValues = true;
      internalValueResult.optionalValues = this._optionalValues;
    }
    if (this._required !== undefined) {
      hasAnyValues = true;
      internalValueResult.required = this._required;
    }
    if (this._searchable !== undefined) {
      hasAnyValues = true;
      internalValueResult.searchable = this._searchable;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureDataStandardTemplateCustomFields | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._fdName = undefined;
      this._optionalValues = undefined;
      this._required = undefined;
      this._searchable = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._fdName = value.fdName;
      this._optionalValues = value.optionalValues;
      this._required = value.required;
      this._searchable = value.searchable;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // fd_name - computed: false, optional: false, required: true
  private _fdName?: string; 
  public get fdName() {
    return this.getStringAttribute('fd_name');
  }
  public set fdName(value: string) {
    this._fdName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fdNameInput() {
    return this._fdName;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // optional_values - computed: false, optional: true, required: false
  private _optionalValues?: string; 
  public get optionalValues() {
    return this.getStringAttribute('optional_values');
  }
  public set optionalValues(value: string) {
    this._optionalValues = value;
  }
  public resetOptionalValues() {
    this._optionalValues = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get optionalValuesInput() {
    return this._optionalValues;
  }

  // required - computed: false, optional: true, required: false
  private _required?: boolean | cdktf.IResolvable; 
  public get required() {
    return this.getBooleanAttribute('required');
  }
  public set required(value: boolean | cdktf.IResolvable) {
    this._required = value;
  }
  public resetRequired() {
    this._required = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requiredInput() {
    return this._required;
  }

  // searchable - computed: false, optional: true, required: false
  private _searchable?: boolean | cdktf.IResolvable; 
  public get searchable() {
    return this.getBooleanAttribute('searchable');
  }
  public set searchable(value: boolean | cdktf.IResolvable) {
    this._searchable = value;
  }
  public resetSearchable() {
    this._searchable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get searchableInput() {
    return this._searchable;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }
}

export class DataartsArchitectureDataStandardTemplateCustomFieldsList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureDataStandardTemplateCustomFields[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureDataStandardTemplateCustomFieldsOutputReference {
    return new DataartsArchitectureDataStandardTemplateCustomFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsArchitectureDataStandardTemplateOptionalFields {
  /**
  * Specifies the name of the field.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#fd_name DataartsArchitectureDataStandardTemplate#fd_name}
  */
  readonly fdName: string;
  /**
  * Specifies whether the field is required.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#required DataartsArchitectureDataStandardTemplate#required}
  */
  readonly required?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether the field is search supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#searchable DataartsArchitectureDataStandardTemplate#searchable}
  */
  readonly searchable?: boolean | cdktf.IResolvable;
}

export function dataartsArchitectureDataStandardTemplateOptionalFieldsToTerraform(struct?: DataartsArchitectureDataStandardTemplateOptionalFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    fd_name: cdktf.stringToTerraform(struct!.fdName),
    required: cdktf.booleanToTerraform(struct!.required),
    searchable: cdktf.booleanToTerraform(struct!.searchable),
  }
}


export function dataartsArchitectureDataStandardTemplateOptionalFieldsToHclTerraform(struct?: DataartsArchitectureDataStandardTemplateOptionalFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    fd_name: {
      value: cdktf.stringToHclTerraform(struct!.fdName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    required: {
      value: cdktf.booleanToHclTerraform(struct!.required),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    searchable: {
      value: cdktf.booleanToHclTerraform(struct!.searchable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureDataStandardTemplateOptionalFieldsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureDataStandardTemplateOptionalFields | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._fdName !== undefined) {
      hasAnyValues = true;
      internalValueResult.fdName = this._fdName;
    }
    if (this._required !== undefined) {
      hasAnyValues = true;
      internalValueResult.required = this._required;
    }
    if (this._searchable !== undefined) {
      hasAnyValues = true;
      internalValueResult.searchable = this._searchable;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureDataStandardTemplateOptionalFields | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._fdName = undefined;
      this._required = undefined;
      this._searchable = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._fdName = value.fdName;
      this._required = value.required;
      this._searchable = value.searchable;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // fd_name - computed: false, optional: false, required: true
  private _fdName?: string; 
  public get fdName() {
    return this.getStringAttribute('fd_name');
  }
  public set fdName(value: string) {
    this._fdName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fdNameInput() {
    return this._fdName;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // required - computed: false, optional: true, required: false
  private _required?: boolean | cdktf.IResolvable; 
  public get required() {
    return this.getBooleanAttribute('required');
  }
  public set required(value: boolean | cdktf.IResolvable) {
    this._required = value;
  }
  public resetRequired() {
    this._required = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requiredInput() {
    return this._required;
  }

  // searchable - computed: false, optional: true, required: false
  private _searchable?: boolean | cdktf.IResolvable; 
  public get searchable() {
    return this.getBooleanAttribute('searchable');
  }
  public set searchable(value: boolean | cdktf.IResolvable) {
    this._searchable = value;
  }
  public resetSearchable() {
    this._searchable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get searchableInput() {
    return this._searchable;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }
}

export class DataartsArchitectureDataStandardTemplateOptionalFieldsList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureDataStandardTemplateOptionalFields[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureDataStandardTemplateOptionalFieldsOutputReference {
    return new DataartsArchitectureDataStandardTemplateOptionalFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template huaweicloud_dataarts_architecture_data_standard_template}
*/
export class DataartsArchitectureDataStandardTemplate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_architecture_data_standard_template";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataartsArchitectureDataStandardTemplate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataartsArchitectureDataStandardTemplate to import
  * @param importFromId The id of the existing DataartsArchitectureDataStandardTemplate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataartsArchitectureDataStandardTemplate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_architecture_data_standard_template", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_data_standard_template huaweicloud_dataarts_architecture_data_standard_template} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataartsArchitectureDataStandardTemplateConfig
  */
  public constructor(scope: Construct, id: string, config: DataartsArchitectureDataStandardTemplateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_architecture_data_standard_template',
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
    this._region = config.region;
    this._workspaceId = config.workspaceId;
    this._customFields.internalValue = config.customFields;
    this._optionalFields.internalValue = config.optionalFields;
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

  // workspace_id - computed: false, optional: false, required: true
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // custom_fields - computed: false, optional: true, required: false
  private _customFields = new DataartsArchitectureDataStandardTemplateCustomFieldsList(this, "custom_fields", true);
  public get customFields() {
    return this._customFields;
  }
  public putCustomFields(value: DataartsArchitectureDataStandardTemplateCustomFields[] | cdktf.IResolvable) {
    this._customFields.internalValue = value;
  }
  public resetCustomFields() {
    this._customFields.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customFieldsInput() {
    return this._customFields.internalValue;
  }

  // optional_fields - computed: false, optional: true, required: false
  private _optionalFields = new DataartsArchitectureDataStandardTemplateOptionalFieldsList(this, "optional_fields", true);
  public get optionalFields() {
    return this._optionalFields;
  }
  public putOptionalFields(value: DataartsArchitectureDataStandardTemplateOptionalFields[] | cdktf.IResolvable) {
    this._optionalFields.internalValue = value;
  }
  public resetOptionalFields() {
    this._optionalFields.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get optionalFieldsInput() {
    return this._optionalFields.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      custom_fields: cdktf.listMapper(dataartsArchitectureDataStandardTemplateCustomFieldsToTerraform, true)(this._customFields.internalValue),
      optional_fields: cdktf.listMapper(dataartsArchitectureDataStandardTemplateOptionalFieldsToTerraform, true)(this._optionalFields.internalValue),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      custom_fields: {
        value: cdktf.listMapperHcl(dataartsArchitectureDataStandardTemplateCustomFieldsToHclTerraform, true)(this._customFields.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "DataartsArchitectureDataStandardTemplateCustomFieldsList",
      },
      optional_fields: {
        value: cdktf.listMapperHcl(dataartsArchitectureDataStandardTemplateOptionalFieldsToHclTerraform, true)(this._optionalFields.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "DataartsArchitectureDataStandardTemplateOptionalFieldsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

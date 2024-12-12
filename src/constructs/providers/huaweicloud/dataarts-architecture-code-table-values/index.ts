// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataartsArchitectureCodeTableValuesConfig extends cdktf.TerraformMetaArguments {
  /**
  * The code of the code table field.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#field_code DataartsArchitectureCodeTableValues#field_code}
  */
  readonly fieldCode: string;
  /**
  * The ID of the code table field.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#field_id DataartsArchitectureCodeTableValues#field_id}
  */
  readonly fieldId: string;
  /**
  * The name of the code table field.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#field_name DataartsArchitectureCodeTableValues#field_name}
  */
  readonly fieldName: string;
  /**
  * The ordinal of the code table field.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#field_ordinal DataartsArchitectureCodeTableValues#field_ordinal}
  */
  readonly fieldOrdinal: number;
  /**
  * The type of the code table field.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#field_type DataartsArchitectureCodeTableValues#field_type}
  */
  readonly fieldType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#id DataartsArchitectureCodeTableValues#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The region in which to create the resource.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#region DataartsArchitectureCodeTableValues#region}
  */
  readonly region?: string;
  /**
  * The ID of the code table.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#table_id DataartsArchitectureCodeTableValues#table_id}
  */
  readonly tableId: string;
  /**
  * The ID of DataArts Studio workspace.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#workspace_id DataartsArchitectureCodeTableValues#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * values block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#values DataartsArchitectureCodeTableValues#values}
  */
  readonly values: DataartsArchitectureCodeTableValuesValues[] | cdktf.IResolvable;
}
export interface DataartsArchitectureCodeTableValuesValues {
  /**
  * The value of a field.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#value DataartsArchitectureCodeTableValues#value}
  */
  readonly value: string;
}

export function dataartsArchitectureCodeTableValuesValuesToTerraform(struct?: DataartsArchitectureCodeTableValuesValues | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function dataartsArchitectureCodeTableValuesValuesToHclTerraform(struct?: DataartsArchitectureCodeTableValuesValues | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureCodeTableValuesValuesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureCodeTableValuesValues | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureCodeTableValuesValues | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._value = value.value;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // ordinal - computed: true, optional: false, required: false
  public get ordinal() {
    return this.getNumberAttribute('ordinal');
  }

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class DataartsArchitectureCodeTableValuesValuesList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureCodeTableValuesValues[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureCodeTableValuesValuesOutputReference {
    return new DataartsArchitectureCodeTableValuesValuesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values huaweicloud_dataarts_architecture_code_table_values}
*/
export class DataartsArchitectureCodeTableValues extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_architecture_code_table_values";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataartsArchitectureCodeTableValues resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataartsArchitectureCodeTableValues to import
  * @param importFromId The id of the existing DataartsArchitectureCodeTableValues that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataartsArchitectureCodeTableValues to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_architecture_code_table_values", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_code_table_values huaweicloud_dataarts_architecture_code_table_values} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataartsArchitectureCodeTableValuesConfig
  */
  public constructor(scope: Construct, id: string, config: DataartsArchitectureCodeTableValuesConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_architecture_code_table_values',
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
    this._fieldCode = config.fieldCode;
    this._fieldId = config.fieldId;
    this._fieldName = config.fieldName;
    this._fieldOrdinal = config.fieldOrdinal;
    this._fieldType = config.fieldType;
    this._id = config.id;
    this._region = config.region;
    this._tableId = config.tableId;
    this._workspaceId = config.workspaceId;
    this._values.internalValue = config.values;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // field_code - computed: false, optional: false, required: true
  private _fieldCode?: string; 
  public get fieldCode() {
    return this.getStringAttribute('field_code');
  }
  public set fieldCode(value: string) {
    this._fieldCode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldCodeInput() {
    return this._fieldCode;
  }

  // field_id - computed: false, optional: false, required: true
  private _fieldId?: string; 
  public get fieldId() {
    return this.getStringAttribute('field_id');
  }
  public set fieldId(value: string) {
    this._fieldId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldIdInput() {
    return this._fieldId;
  }

  // field_name - computed: false, optional: false, required: true
  private _fieldName?: string; 
  public get fieldName() {
    return this.getStringAttribute('field_name');
  }
  public set fieldName(value: string) {
    this._fieldName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldNameInput() {
    return this._fieldName;
  }

  // field_ordinal - computed: false, optional: false, required: true
  private _fieldOrdinal?: number; 
  public get fieldOrdinal() {
    return this.getNumberAttribute('field_ordinal');
  }
  public set fieldOrdinal(value: number) {
    this._fieldOrdinal = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldOrdinalInput() {
    return this._fieldOrdinal;
  }

  // field_type - computed: false, optional: false, required: true
  private _fieldType?: string; 
  public get fieldType() {
    return this.getStringAttribute('field_type');
  }
  public set fieldType(value: string) {
    this._fieldType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldTypeInput() {
    return this._fieldType;
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

  // table_id - computed: false, optional: false, required: true
  private _tableId?: string; 
  public get tableId() {
    return this.getStringAttribute('table_id');
  }
  public set tableId(value: string) {
    this._tableId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get tableIdInput() {
    return this._tableId;
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

  // values - computed: false, optional: false, required: true
  private _values = new DataartsArchitectureCodeTableValuesValuesList(this, "values", false);
  public get values() {
    return this._values;
  }
  public putValues(value: DataartsArchitectureCodeTableValuesValues[] | cdktf.IResolvable) {
    this._values.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valuesInput() {
    return this._values.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      field_code: cdktf.stringToTerraform(this._fieldCode),
      field_id: cdktf.stringToTerraform(this._fieldId),
      field_name: cdktf.stringToTerraform(this._fieldName),
      field_ordinal: cdktf.numberToTerraform(this._fieldOrdinal),
      field_type: cdktf.stringToTerraform(this._fieldType),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      table_id: cdktf.stringToTerraform(this._tableId),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      values: cdktf.listMapper(dataartsArchitectureCodeTableValuesValuesToTerraform, true)(this._values.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      field_code: {
        value: cdktf.stringToHclTerraform(this._fieldCode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      field_id: {
        value: cdktf.stringToHclTerraform(this._fieldId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      field_name: {
        value: cdktf.stringToHclTerraform(this._fieldName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      field_ordinal: {
        value: cdktf.numberToHclTerraform(this._fieldOrdinal),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      field_type: {
        value: cdktf.stringToHclTerraform(this._fieldType),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      table_id: {
        value: cdktf.stringToHclTerraform(this._tableId),
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
      values: {
        value: cdktf.listMapperHcl(dataartsArchitectureCodeTableValuesValuesToHclTerraform, true)(this._values.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataartsArchitectureCodeTableValuesValuesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

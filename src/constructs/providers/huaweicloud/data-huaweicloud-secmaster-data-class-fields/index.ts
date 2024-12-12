// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudSecmasterDataClassFieldsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the data class ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields#data_class_id DataHuaweicloudSecmasterDataClassFields#data_class_id}
  */
  readonly dataClassId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields#id DataHuaweicloudSecmasterDataClassFields#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies whether it is built in SecMaster. The value can be **true** or **false**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields#is_built_in DataHuaweicloudSecmasterDataClassFields#is_built_in}
  */
  readonly isBuiltIn?: string;
  /**
  * Specifies whether to display in other places other the classification and mapping module.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields#mapping DataHuaweicloudSecmasterDataClassFields#mapping}
  */
  readonly mapping?: string;
  /**
  * Specifies the field name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields#name DataHuaweicloudSecmasterDataClassFields#name}
  */
  readonly name?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields#region DataHuaweicloudSecmasterDataClassFields#region}
  */
  readonly region?: string;
  /**
  * Specifies the workspace ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields#workspace_id DataHuaweicloudSecmasterDataClassFields#workspace_id}
  */
  readonly workspaceId: string;
}
export interface DataHuaweicloudSecmasterDataClassFieldsFields {
}

export function dataHuaweicloudSecmasterDataClassFieldsFieldsToTerraform(struct?: DataHuaweicloudSecmasterDataClassFieldsFields): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterDataClassFieldsFieldsToHclTerraform(struct?: DataHuaweicloudSecmasterDataClassFieldsFields): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterDataClassFieldsFieldsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudSecmasterDataClassFieldsFields | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterDataClassFieldsFields | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // business_code - computed: true, optional: false, required: false
  public get businessCode() {
    return this.getStringAttribute('business_code');
  }

  // business_id - computed: true, optional: false, required: false
  public get businessId() {
    return this.getStringAttribute('business_id');
  }

  // business_type - computed: true, optional: false, required: false
  public get businessType() {
    return this.getStringAttribute('business_type');
  }

  // case_sensitive - computed: true, optional: false, required: false
  public get caseSensitive() {
    return this.getBooleanAttribute('case_sensitive');
  }

  // creatabled - computed: true, optional: false, required: false
  public get creatabled() {
    return this.getBooleanAttribute('creatabled');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // creator - computed: true, optional: false, required: false
  public get creator() {
    return this.getStringAttribute('creator');
  }

  // creator_id - computed: true, optional: false, required: false
  public get creatorId() {
    return this.getStringAttribute('creator_id');
  }

  // data_class_name - computed: true, optional: false, required: false
  public get dataClassName() {
    return this.getStringAttribute('data_class_name');
  }

  // default_value - computed: true, optional: false, required: false
  public get defaultValue() {
    return this.getStringAttribute('default_value');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // display_type - computed: true, optional: false, required: false
  public get displayType() {
    return this.getStringAttribute('display_type');
  }

  // editabled - computed: true, optional: false, required: false
  public get editabled() {
    return this.getBooleanAttribute('editabled');
  }

  // extra_json - computed: true, optional: false, required: false
  public get extraJson() {
    return this.getStringAttribute('extra_json');
  }

  // field_key - computed: true, optional: false, required: false
  public get fieldKey() {
    return this.getStringAttribute('field_key');
  }

  // field_tooltip - computed: true, optional: false, required: false
  public get fieldTooltip() {
    return this.getStringAttribute('field_tooltip');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // io_type - computed: true, optional: false, required: false
  public get ioType() {
    return this.getStringAttribute('io_type');
  }

  // is_built_in - computed: true, optional: false, required: false
  public get isBuiltIn() {
    return this.getBooleanAttribute('is_built_in');
  }

  // json_schema - computed: true, optional: false, required: false
  public get jsonSchema() {
    return this.getStringAttribute('json_schema');
  }

  // maintainabled - computed: true, optional: false, required: false
  public get maintainabled() {
    return this.getBooleanAttribute('maintainabled');
  }

  // mapping - computed: true, optional: false, required: false
  public get mapping() {
    return this.getBooleanAttribute('mapping');
  }

  // modifier - computed: true, optional: false, required: false
  public get modifier() {
    return this.getStringAttribute('modifier');
  }

  // modifier_id - computed: true, optional: false, required: false
  public get modifierId() {
    return this.getStringAttribute('modifier_id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // read_only - computed: true, optional: false, required: false
  public get readOnly() {
    return this.getBooleanAttribute('read_only');
  }

  // required - computed: true, optional: false, required: false
  public get required() {
    return this.getBooleanAttribute('required');
  }

  // searchabled - computed: true, optional: false, required: false
  public get searchabled() {
    return this.getBooleanAttribute('searchabled');
  }

  // subscribed_version - computed: true, optional: false, required: false
  public get subscribedVersion() {
    return this.getStringAttribute('subscribed_version');
  }

  // target_api - computed: true, optional: false, required: false
  public get targetApi() {
    return this.getStringAttribute('target_api');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // used_by - computed: true, optional: false, required: false
  public get usedBy() {
    return this.getStringAttribute('used_by');
  }

  // visible - computed: true, optional: false, required: false
  public get visible() {
    return this.getBooleanAttribute('visible');
  }
}

export class DataHuaweicloudSecmasterDataClassFieldsFieldsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterDataClassFieldsFieldsOutputReference {
    return new DataHuaweicloudSecmasterDataClassFieldsFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields huaweicloud_secmaster_data_class_fields}
*/
export class DataHuaweicloudSecmasterDataClassFields extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_data_class_fields";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudSecmasterDataClassFields resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudSecmasterDataClassFields to import
  * @param importFromId The id of the existing DataHuaweicloudSecmasterDataClassFields that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudSecmasterDataClassFields to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_data_class_fields", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_data_class_fields huaweicloud_secmaster_data_class_fields} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudSecmasterDataClassFieldsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudSecmasterDataClassFieldsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_data_class_fields',
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
    this._dataClassId = config.dataClassId;
    this._id = config.id;
    this._isBuiltIn = config.isBuiltIn;
    this._mapping = config.mapping;
    this._name = config.name;
    this._region = config.region;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // data_class_id - computed: false, optional: false, required: true
  private _dataClassId?: string; 
  public get dataClassId() {
    return this.getStringAttribute('data_class_id');
  }
  public set dataClassId(value: string) {
    this._dataClassId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataClassIdInput() {
    return this._dataClassId;
  }

  // fields - computed: true, optional: false, required: false
  private _fields = new DataHuaweicloudSecmasterDataClassFieldsFieldsList(this, "fields", false);
  public get fields() {
    return this._fields;
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

  // is_built_in - computed: false, optional: true, required: false
  private _isBuiltIn?: string; 
  public get isBuiltIn() {
    return this.getStringAttribute('is_built_in');
  }
  public set isBuiltIn(value: string) {
    this._isBuiltIn = value;
  }
  public resetIsBuiltIn() {
    this._isBuiltIn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isBuiltInInput() {
    return this._isBuiltIn;
  }

  // mapping - computed: false, optional: true, required: false
  private _mapping?: string; 
  public get mapping() {
    return this.getStringAttribute('mapping');
  }
  public set mapping(value: string) {
    this._mapping = value;
  }
  public resetMapping() {
    this._mapping = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mappingInput() {
    return this._mapping;
  }

  // name - computed: false, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      data_class_id: cdktf.stringToTerraform(this._dataClassId),
      id: cdktf.stringToTerraform(this._id),
      is_built_in: cdktf.stringToTerraform(this._isBuiltIn),
      mapping: cdktf.stringToTerraform(this._mapping),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      data_class_id: {
        value: cdktf.stringToHclTerraform(this._dataClassId),
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
      is_built_in: {
        value: cdktf.stringToHclTerraform(this._isBuiltIn),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      mapping: {
        value: cdktf.stringToHclTerraform(this._mapping),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

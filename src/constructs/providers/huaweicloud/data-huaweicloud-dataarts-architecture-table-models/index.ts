// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDataartsArchitectureTableModelsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the name of the creator of the table model.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models#created_by DataHuaweicloudDataartsArchitectureTableModels#created_by}
  */
  readonly createdBy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models#id DataHuaweicloudDataartsArchitectureTableModels#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the model ID to which the table model belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models#model_id DataHuaweicloudDataartsArchitectureTableModels#model_id}
  */
  readonly modelId: string;
  /**
  * Specifies the Chinese or English name of the table model.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models#name DataHuaweicloudDataartsArchitectureTableModels#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models#region DataHuaweicloudDataartsArchitectureTableModels#region}
  */
  readonly region?: string;
  /**
  * Specifies the status of the table model.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models#status DataHuaweicloudDataartsArchitectureTableModels#status}
  */
  readonly status?: string;
  /**
  * Specifies the subject ID to which the table model belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models#subject_id DataHuaweicloudDataartsArchitectureTableModels#subject_id}
  */
  readonly subjectId?: string;
  /**
  * Specifies the workspace ID of DataArts Architecture.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models#workspace_id DataHuaweicloudDataartsArchitectureTableModels#workspace_id}
  */
  readonly workspaceId: string;
}
export interface DataHuaweicloudDataartsArchitectureTableModelsTablesAttributes {
}

export function dataHuaweicloudDataartsArchitectureTableModelsTablesAttributesToTerraform(struct?: DataHuaweicloudDataartsArchitectureTableModelsTablesAttributes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureTableModelsTablesAttributesToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureTableModelsTablesAttributes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureTableModelsTablesAttributesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureTableModelsTablesAttributes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureTableModelsTablesAttributes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // code - computed: true, optional: false, required: false
  public get code() {
    return this.getStringAttribute('code');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // data_type - computed: true, optional: false, required: false
  public get dataType() {
    return this.getStringAttribute('data_type');
  }

  // data_type_extend - computed: true, optional: false, required: false
  public get dataTypeExtend() {
    return this.getStringAttribute('data_type_extend');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // domain_type - computed: true, optional: false, required: false
  public get domainType() {
    return this.getStringAttribute('domain_type');
  }

  // extend_field - computed: true, optional: false, required: false
  public get extendField() {
    return this.getBooleanAttribute('extend_field');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_foreign_key - computed: true, optional: false, required: false
  public get isForeignKey() {
    return this.getBooleanAttribute('is_foreign_key');
  }

  // is_partition_key - computed: true, optional: false, required: false
  public get isPartitionKey() {
    return this.getBooleanAttribute('is_partition_key');
  }

  // is_primary_key - computed: true, optional: false, required: false
  public get isPrimaryKey() {
    return this.getBooleanAttribute('is_primary_key');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // name_en - computed: true, optional: false, required: false
  public get nameEn() {
    return this.getStringAttribute('name_en');
  }

  // not_null - computed: true, optional: false, required: false
  public get notNull() {
    return this.getBooleanAttribute('not_null');
  }

  // ordinal - computed: true, optional: false, required: false
  public get ordinal() {
    return this.getNumberAttribute('ordinal');
  }

  // stand_row_id - computed: true, optional: false, required: false
  public get standRowId() {
    return this.getStringAttribute('stand_row_id');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudDataartsArchitectureTableModelsTablesAttributesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureTableModelsTablesAttributesOutputReference {
    return new DataHuaweicloudDataartsArchitectureTableModelsTablesAttributesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDataartsArchitectureTableModelsTables {
}

export function dataHuaweicloudDataartsArchitectureTableModelsTablesToTerraform(struct?: DataHuaweicloudDataartsArchitectureTableModelsTables): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDataartsArchitectureTableModelsTablesToHclTerraform(struct?: DataHuaweicloudDataartsArchitectureTableModelsTables): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDataartsArchitectureTableModelsTablesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDataartsArchitectureTableModelsTables | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDataartsArchitectureTableModelsTables | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // attributes - computed: true, optional: false, required: false
  private _attributes = new DataHuaweicloudDataartsArchitectureTableModelsTablesAttributesList(this, "attributes", false);
  public get attributes() {
    return this._attributes;
  }

  // business_asset_status - computed: true, optional: false, required: false
  public get businessAssetStatus() {
    return this.getStringAttribute('business_asset_status');
  }

  // catalog_path - computed: true, optional: false, required: false
  public get catalogPath() {
    return this.getStringAttribute('catalog_path');
  }

  // code - computed: true, optional: false, required: false
  public get code() {
    return this.getStringAttribute('code');
  }

  // compression - computed: true, optional: false, required: false
  public get compression() {
    return this.getStringAttribute('compression');
  }

  // configs - computed: true, optional: false, required: false
  public get configs() {
    return this.getStringAttribute('configs');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // data_format - computed: true, optional: false, required: false
  public get dataFormat() {
    return this.getStringAttribute('data_format');
  }

  // data_quality_status - computed: true, optional: false, required: false
  public get dataQualityStatus() {
    return this.getStringAttribute('data_quality_status');
  }

  // db_name - computed: true, optional: false, required: false
  public get dbName() {
    return this.getStringAttribute('db_name');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // dev_physical_table_status - computed: true, optional: false, required: false
  public get devPhysicalTableStatus() {
    return this.getStringAttribute('dev_physical_table_status');
  }

  // dev_version - computed: true, optional: false, required: false
  public get devVersion() {
    return this.getStringAttribute('dev_version');
  }

  // dirty_out_database - computed: true, optional: false, required: false
  public get dirtyOutDatabase() {
    return this.getStringAttribute('dirty_out_database');
  }

  // dirty_out_prefix - computed: true, optional: false, required: false
  public get dirtyOutPrefix() {
    return this.getStringAttribute('dirty_out_prefix');
  }

  // dirty_out_suffix - computed: true, optional: false, required: false
  public get dirtyOutSuffix() {
    return this.getStringAttribute('dirty_out_suffix');
  }

  // dirty_out_switch - computed: true, optional: false, required: false
  public get dirtyOutSwitch() {
    return this.getBooleanAttribute('dirty_out_switch');
  }

  // distribute - computed: true, optional: false, required: false
  public get distribute() {
    return this.getStringAttribute('distribute');
  }

  // distribute_column - computed: true, optional: false, required: false
  public get distributeColumn() {
    return this.getStringAttribute('distribute_column');
  }

  // dlf_task_id - computed: true, optional: false, required: false
  public get dlfTaskId() {
    return this.getStringAttribute('dlf_task_id');
  }

  // dw_id - computed: true, optional: false, required: false
  public get dwId() {
    return this.getStringAttribute('dw_id');
  }

  // dw_type - computed: true, optional: false, required: false
  public get dwType() {
    return this.getStringAttribute('dw_type');
  }

  // env_type - computed: true, optional: false, required: false
  public get envType() {
    return this.getStringAttribute('env_type');
  }

  // extend_info - computed: true, optional: false, required: false
  public get extendInfo() {
    return this.getStringAttribute('extend_info');
  }

  // has_related_logic_table - computed: true, optional: false, required: false
  public get hasRelatedLogicTable() {
    return this.getBooleanAttribute('has_related_logic_table');
  }

  // has_related_physical_table - computed: true, optional: false, required: false
  public get hasRelatedPhysicalTable() {
    return this.getBooleanAttribute('has_related_physical_table');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_partition - computed: true, optional: false, required: false
  public get isPartition() {
    return this.getBooleanAttribute('is_partition');
  }

  // logic_tb_guid - computed: true, optional: false, required: false
  public get logicTbGuid() {
    return this.getStringAttribute('logic_tb_guid');
  }

  // logic_tb_id - computed: true, optional: false, required: false
  public get logicTbId() {
    return this.getStringAttribute('logic_tb_id');
  }

  // meta_data_link_status - computed: true, optional: false, required: false
  public get metaDataLinkStatus() {
    return this.getStringAttribute('meta_data_link_status');
  }

  // model_id - computed: true, optional: false, required: false
  public get modelId() {
    return this.getStringAttribute('model_id');
  }

  // obs_location - computed: true, optional: false, required: false
  public get obsLocation() {
    return this.getStringAttribute('obs_location');
  }

  // owner - computed: true, optional: false, required: false
  public get owner() {
    return this.getStringAttribute('owner');
  }

  // parent_table_code - computed: true, optional: false, required: false
  public get parentTableCode() {
    return this.getStringAttribute('parent_table_code');
  }

  // parent_table_id - computed: true, optional: false, required: false
  public get parentTableId() {
    return this.getStringAttribute('parent_table_id');
  }

  // parent_table_name - computed: true, optional: false, required: false
  public get parentTableName() {
    return this.getStringAttribute('parent_table_name');
  }

  // partition_conf - computed: true, optional: false, required: false
  public get partitionConf() {
    return this.getStringAttribute('partition_conf');
  }

  // physical_table_name - computed: true, optional: false, required: false
  public get physicalTableName() {
    return this.getStringAttribute('physical_table_name');
  }

  // physical_table_status - computed: true, optional: false, required: false
  public get physicalTableStatus() {
    return this.getStringAttribute('physical_table_status');
  }

  // prod_version - computed: true, optional: false, required: false
  public get prodVersion() {
    return this.getStringAttribute('prod_version');
  }

  // queue_name - computed: true, optional: false, required: false
  public get queueName() {
    return this.getStringAttribute('queue_name');
  }

  // related_logic_table_id - computed: true, optional: false, required: false
  public get relatedLogicTableId() {
    return this.getStringAttribute('related_logic_table_id');
  }

  // schema - computed: true, optional: false, required: false
  public get schema() {
    return this.getStringAttribute('schema');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // subject_id - computed: true, optional: false, required: false
  public get subjectId() {
    return this.getStringAttribute('subject_id');
  }

  // summary_status - computed: true, optional: false, required: false
  public get summaryStatus() {
    return this.getStringAttribute('summary_status');
  }

  // table_name - computed: true, optional: false, required: false
  public get tableName() {
    return this.getStringAttribute('table_name');
  }

  // table_type - computed: true, optional: false, required: false
  public get tableType() {
    return this.getStringAttribute('table_type');
  }

  // tb_guid - computed: true, optional: false, required: false
  public get tbGuid() {
    return this.getStringAttribute('tb_guid');
  }

  // tb_id - computed: true, optional: false, required: false
  public get tbId() {
    return this.getStringAttribute('tb_id');
  }

  // technical_asset_status - computed: true, optional: false, required: false
  public get technicalAssetStatus() {
    return this.getStringAttribute('technical_asset_status');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }

  // use_recently_partition - computed: true, optional: false, required: false
  public get useRecentlyPartition() {
    return this.getBooleanAttribute('use_recently_partition');
  }
}

export class DataHuaweicloudDataartsArchitectureTableModelsTablesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDataartsArchitectureTableModelsTablesOutputReference {
    return new DataHuaweicloudDataartsArchitectureTableModelsTablesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models huaweicloud_dataarts_architecture_table_models}
*/
export class DataHuaweicloudDataartsArchitectureTableModels extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_architecture_table_models";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDataartsArchitectureTableModels resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDataartsArchitectureTableModels to import
  * @param importFromId The id of the existing DataHuaweicloudDataartsArchitectureTableModels that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDataartsArchitectureTableModels to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_architecture_table_models", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dataarts_architecture_table_models huaweicloud_dataarts_architecture_table_models} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDataartsArchitectureTableModelsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDataartsArchitectureTableModelsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_architecture_table_models',
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
    this._createdBy = config.createdBy;
    this._id = config.id;
    this._modelId = config.modelId;
    this._name = config.name;
    this._region = config.region;
    this._status = config.status;
    this._subjectId = config.subjectId;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_by - computed: false, optional: true, required: false
  private _createdBy?: string; 
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }
  public set createdBy(value: string) {
    this._createdBy = value;
  }
  public resetCreatedBy() {
    this._createdBy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createdByInput() {
    return this._createdBy;
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

  // model_id - computed: false, optional: false, required: true
  private _modelId?: string; 
  public get modelId() {
    return this.getStringAttribute('model_id');
  }
  public set modelId(value: string) {
    this._modelId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get modelIdInput() {
    return this._modelId;
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

  // status - computed: false, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // subject_id - computed: false, optional: true, required: false
  private _subjectId?: string; 
  public get subjectId() {
    return this.getStringAttribute('subject_id');
  }
  public set subjectId(value: string) {
    this._subjectId = value;
  }
  public resetSubjectId() {
    this._subjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subjectIdInput() {
    return this._subjectId;
  }

  // tables - computed: true, optional: false, required: false
  private _tables = new DataHuaweicloudDataartsArchitectureTableModelsTablesList(this, "tables", false);
  public get tables() {
    return this._tables;
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
      created_by: cdktf.stringToTerraform(this._createdBy),
      id: cdktf.stringToTerraform(this._id),
      model_id: cdktf.stringToTerraform(this._modelId),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      status: cdktf.stringToTerraform(this._status),
      subject_id: cdktf.stringToTerraform(this._subjectId),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      created_by: {
        value: cdktf.stringToHclTerraform(this._createdBy),
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
      model_id: {
        value: cdktf.stringToHclTerraform(this._modelId),
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
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      subject_id: {
        value: cdktf.stringToHclTerraform(this._subjectId),
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

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataartsArchitectureTableModelConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#code DataartsArchitectureTableModel#code}
  */
  readonly code?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#compression DataartsArchitectureTableModel#compression}
  */
  readonly compression?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#configs DataartsArchitectureTableModel#configs}
  */
  readonly configs?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#data_format DataartsArchitectureTableModel#data_format}
  */
  readonly dataFormat?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#db_name DataartsArchitectureTableModel#db_name}
  */
  readonly dbName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#del_type DataartsArchitectureTableModel#del_type}
  */
  readonly delType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#description DataartsArchitectureTableModel#description}
  */
  readonly description: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#dirty_out_database DataartsArchitectureTableModel#dirty_out_database}
  */
  readonly dirtyOutDatabase?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#dirty_out_prefix DataartsArchitectureTableModel#dirty_out_prefix}
  */
  readonly dirtyOutPrefix?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#dirty_out_suffix DataartsArchitectureTableModel#dirty_out_suffix}
  */
  readonly dirtyOutSuffix?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#dirty_out_switch DataartsArchitectureTableModel#dirty_out_switch}
  */
  readonly dirtyOutSwitch?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#distribute DataartsArchitectureTableModel#distribute}
  */
  readonly distribute?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#distribute_column DataartsArchitectureTableModel#distribute_column}
  */
  readonly distributeColumn?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#dlf_task_id DataartsArchitectureTableModel#dlf_task_id}
  */
  readonly dlfTaskId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#dw_id DataartsArchitectureTableModel#dw_id}
  */
  readonly dwId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#dw_name DataartsArchitectureTableModel#dw_name}
  */
  readonly dwName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#dw_type DataartsArchitectureTableModel#dw_type}
  */
  readonly dwType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#id DataartsArchitectureTableModel#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#model_id DataartsArchitectureTableModel#model_id}
  */
  readonly modelId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#obs_location DataartsArchitectureTableModel#obs_location}
  */
  readonly obsLocation?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#owner DataartsArchitectureTableModel#owner}
  */
  readonly owner?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#parent_table_id DataartsArchitectureTableModel#parent_table_id}
  */
  readonly parentTableId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#parent_table_name DataartsArchitectureTableModel#parent_table_name}
  */
  readonly parentTableName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#partition_conf DataartsArchitectureTableModel#partition_conf}
  */
  readonly partitionConf?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#physical_table_name DataartsArchitectureTableModel#physical_table_name}
  */
  readonly physicalTableName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#queue_name DataartsArchitectureTableModel#queue_name}
  */
  readonly queueName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#region DataartsArchitectureTableModel#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#related_logic_model_id DataartsArchitectureTableModel#related_logic_model_id}
  */
  readonly relatedLogicModelId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#related_logic_model_name DataartsArchitectureTableModel#related_logic_model_name}
  */
  readonly relatedLogicModelName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#related_logic_table_model_id DataartsArchitectureTableModel#related_logic_table_model_id}
  */
  readonly relatedLogicTableModelId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#related_logic_table_model_name DataartsArchitectureTableModel#related_logic_table_model_name}
  */
  readonly relatedLogicTableModelName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#reversed DataartsArchitectureTableModel#reversed}
  */
  readonly reversed?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#schema DataartsArchitectureTableModel#schema}
  */
  readonly schema?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#subject_id DataartsArchitectureTableModel#subject_id}
  */
  readonly subjectId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#table_name DataartsArchitectureTableModel#table_name}
  */
  readonly tableName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#table_type DataartsArchitectureTableModel#table_type}
  */
  readonly tableType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#use_recently_partition DataartsArchitectureTableModel#use_recently_partition}
  */
  readonly useRecentlyPartition?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#workspace_id DataartsArchitectureTableModel#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * attributes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#attributes DataartsArchitectureTableModel#attributes}
  */
  readonly attributes: DataartsArchitectureTableModelAttributes[] | cdktf.IResolvable;
  /**
  * mappings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#mappings DataartsArchitectureTableModel#mappings}
  */
  readonly mappings?: DataartsArchitectureTableModelMappings[] | cdktf.IResolvable;
  /**
  * relations block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#relations DataartsArchitectureTableModel#relations}
  */
  readonly relations?: DataartsArchitectureTableModelRelations[] | cdktf.IResolvable;
}
export interface DataartsArchitectureTableModelAttributes {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#code DataartsArchitectureTableModel#code}
  */
  readonly code?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#data_type DataartsArchitectureTableModel#data_type}
  */
  readonly dataType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#data_type_extend DataartsArchitectureTableModel#data_type_extend}
  */
  readonly dataTypeExtend?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#description DataartsArchitectureTableModel#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#extend_field DataartsArchitectureTableModel#extend_field}
  */
  readonly extendField?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#is_foreign_key DataartsArchitectureTableModel#is_foreign_key}
  */
  readonly isForeignKey?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#is_partition_key DataartsArchitectureTableModel#is_partition_key}
  */
  readonly isPartitionKey?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#is_primary_key DataartsArchitectureTableModel#is_primary_key}
  */
  readonly isPrimaryKey?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#name DataartsArchitectureTableModel#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#name_en DataartsArchitectureTableModel#name_en}
  */
  readonly nameEn: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#not_null DataartsArchitectureTableModel#not_null}
  */
  readonly notNull?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#ordinal DataartsArchitectureTableModel#ordinal}
  */
  readonly ordinal?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#related_logic_attr_id DataartsArchitectureTableModel#related_logic_attr_id}
  */
  readonly relatedLogicAttrId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#related_logic_attr_name DataartsArchitectureTableModel#related_logic_attr_name}
  */
  readonly relatedLogicAttrName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#related_logic_attr_name_en DataartsArchitectureTableModel#related_logic_attr_name_en}
  */
  readonly relatedLogicAttrNameEn?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#stand_row_id DataartsArchitectureTableModel#stand_row_id}
  */
  readonly standRowId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#stand_row_name DataartsArchitectureTableModel#stand_row_name}
  */
  readonly standRowName?: string;
}

export function dataartsArchitectureTableModelAttributesToTerraform(struct?: DataartsArchitectureTableModelAttributes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    code: cdktf.stringToTerraform(struct!.code),
    data_type: cdktf.stringToTerraform(struct!.dataType),
    data_type_extend: cdktf.stringToTerraform(struct!.dataTypeExtend),
    description: cdktf.stringToTerraform(struct!.description),
    extend_field: cdktf.booleanToTerraform(struct!.extendField),
    is_foreign_key: cdktf.booleanToTerraform(struct!.isForeignKey),
    is_partition_key: cdktf.booleanToTerraform(struct!.isPartitionKey),
    is_primary_key: cdktf.booleanToTerraform(struct!.isPrimaryKey),
    name: cdktf.stringToTerraform(struct!.name),
    name_en: cdktf.stringToTerraform(struct!.nameEn),
    not_null: cdktf.booleanToTerraform(struct!.notNull),
    ordinal: cdktf.stringToTerraform(struct!.ordinal),
    related_logic_attr_id: cdktf.stringToTerraform(struct!.relatedLogicAttrId),
    related_logic_attr_name: cdktf.stringToTerraform(struct!.relatedLogicAttrName),
    related_logic_attr_name_en: cdktf.stringToTerraform(struct!.relatedLogicAttrNameEn),
    stand_row_id: cdktf.stringToTerraform(struct!.standRowId),
    stand_row_name: cdktf.stringToTerraform(struct!.standRowName),
  }
}


export function dataartsArchitectureTableModelAttributesToHclTerraform(struct?: DataartsArchitectureTableModelAttributes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    code: {
      value: cdktf.stringToHclTerraform(struct!.code),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    data_type: {
      value: cdktf.stringToHclTerraform(struct!.dataType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    data_type_extend: {
      value: cdktf.stringToHclTerraform(struct!.dataTypeExtend),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    extend_field: {
      value: cdktf.booleanToHclTerraform(struct!.extendField),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    is_foreign_key: {
      value: cdktf.booleanToHclTerraform(struct!.isForeignKey),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    is_partition_key: {
      value: cdktf.booleanToHclTerraform(struct!.isPartitionKey),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    is_primary_key: {
      value: cdktf.booleanToHclTerraform(struct!.isPrimaryKey),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name_en: {
      value: cdktf.stringToHclTerraform(struct!.nameEn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    not_null: {
      value: cdktf.booleanToHclTerraform(struct!.notNull),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    ordinal: {
      value: cdktf.stringToHclTerraform(struct!.ordinal),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    related_logic_attr_id: {
      value: cdktf.stringToHclTerraform(struct!.relatedLogicAttrId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    related_logic_attr_name: {
      value: cdktf.stringToHclTerraform(struct!.relatedLogicAttrName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    related_logic_attr_name_en: {
      value: cdktf.stringToHclTerraform(struct!.relatedLogicAttrNameEn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    stand_row_id: {
      value: cdktf.stringToHclTerraform(struct!.standRowId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    stand_row_name: {
      value: cdktf.stringToHclTerraform(struct!.standRowName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureTableModelAttributesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureTableModelAttributes | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._code !== undefined) {
      hasAnyValues = true;
      internalValueResult.code = this._code;
    }
    if (this._dataType !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataType = this._dataType;
    }
    if (this._dataTypeExtend !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataTypeExtend = this._dataTypeExtend;
    }
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._extendField !== undefined) {
      hasAnyValues = true;
      internalValueResult.extendField = this._extendField;
    }
    if (this._isForeignKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.isForeignKey = this._isForeignKey;
    }
    if (this._isPartitionKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.isPartitionKey = this._isPartitionKey;
    }
    if (this._isPrimaryKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.isPrimaryKey = this._isPrimaryKey;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._nameEn !== undefined) {
      hasAnyValues = true;
      internalValueResult.nameEn = this._nameEn;
    }
    if (this._notNull !== undefined) {
      hasAnyValues = true;
      internalValueResult.notNull = this._notNull;
    }
    if (this._ordinal !== undefined) {
      hasAnyValues = true;
      internalValueResult.ordinal = this._ordinal;
    }
    if (this._relatedLogicAttrId !== undefined) {
      hasAnyValues = true;
      internalValueResult.relatedLogicAttrId = this._relatedLogicAttrId;
    }
    if (this._relatedLogicAttrName !== undefined) {
      hasAnyValues = true;
      internalValueResult.relatedLogicAttrName = this._relatedLogicAttrName;
    }
    if (this._relatedLogicAttrNameEn !== undefined) {
      hasAnyValues = true;
      internalValueResult.relatedLogicAttrNameEn = this._relatedLogicAttrNameEn;
    }
    if (this._standRowId !== undefined) {
      hasAnyValues = true;
      internalValueResult.standRowId = this._standRowId;
    }
    if (this._standRowName !== undefined) {
      hasAnyValues = true;
      internalValueResult.standRowName = this._standRowName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureTableModelAttributes | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._code = undefined;
      this._dataType = undefined;
      this._dataTypeExtend = undefined;
      this._description = undefined;
      this._extendField = undefined;
      this._isForeignKey = undefined;
      this._isPartitionKey = undefined;
      this._isPrimaryKey = undefined;
      this._name = undefined;
      this._nameEn = undefined;
      this._notNull = undefined;
      this._ordinal = undefined;
      this._relatedLogicAttrId = undefined;
      this._relatedLogicAttrName = undefined;
      this._relatedLogicAttrNameEn = undefined;
      this._standRowId = undefined;
      this._standRowName = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._code = value.code;
      this._dataType = value.dataType;
      this._dataTypeExtend = value.dataTypeExtend;
      this._description = value.description;
      this._extendField = value.extendField;
      this._isForeignKey = value.isForeignKey;
      this._isPartitionKey = value.isPartitionKey;
      this._isPrimaryKey = value.isPrimaryKey;
      this._name = value.name;
      this._nameEn = value.nameEn;
      this._notNull = value.notNull;
      this._ordinal = value.ordinal;
      this._relatedLogicAttrId = value.relatedLogicAttrId;
      this._relatedLogicAttrName = value.relatedLogicAttrName;
      this._relatedLogicAttrNameEn = value.relatedLogicAttrNameEn;
      this._standRowId = value.standRowId;
      this._standRowName = value.standRowName;
    }
  }

  // code - computed: true, optional: true, required: false
  private _code?: string; 
  public get code() {
    return this.getStringAttribute('code');
  }
  public set code(value: string) {
    this._code = value;
  }
  public resetCode() {
    this._code = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeInput() {
    return this._code;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // data_type - computed: false, optional: false, required: true
  private _dataType?: string; 
  public get dataType() {
    return this.getStringAttribute('data_type');
  }
  public set dataType(value: string) {
    this._dataType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataTypeInput() {
    return this._dataType;
  }

  // data_type_extend - computed: false, optional: true, required: false
  private _dataTypeExtend?: string; 
  public get dataTypeExtend() {
    return this.getStringAttribute('data_type_extend');
  }
  public set dataTypeExtend(value: string) {
    this._dataTypeExtend = value;
  }
  public resetDataTypeExtend() {
    this._dataTypeExtend = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataTypeExtendInput() {
    return this._dataTypeExtend;
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

  // domain_type - computed: true, optional: false, required: false
  public get domainType() {
    return this.getStringAttribute('domain_type');
  }

  // extend_field - computed: true, optional: true, required: false
  private _extendField?: boolean | cdktf.IResolvable; 
  public get extendField() {
    return this.getBooleanAttribute('extend_field');
  }
  public set extendField(value: boolean | cdktf.IResolvable) {
    this._extendField = value;
  }
  public resetExtendField() {
    this._extendField = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendFieldInput() {
    return this._extendField;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_foreign_key - computed: true, optional: true, required: false
  private _isForeignKey?: boolean | cdktf.IResolvable; 
  public get isForeignKey() {
    return this.getBooleanAttribute('is_foreign_key');
  }
  public set isForeignKey(value: boolean | cdktf.IResolvable) {
    this._isForeignKey = value;
  }
  public resetIsForeignKey() {
    this._isForeignKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isForeignKeyInput() {
    return this._isForeignKey;
  }

  // is_partition_key - computed: true, optional: true, required: false
  private _isPartitionKey?: boolean | cdktf.IResolvable; 
  public get isPartitionKey() {
    return this.getBooleanAttribute('is_partition_key');
  }
  public set isPartitionKey(value: boolean | cdktf.IResolvable) {
    this._isPartitionKey = value;
  }
  public resetIsPartitionKey() {
    this._isPartitionKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isPartitionKeyInput() {
    return this._isPartitionKey;
  }

  // is_primary_key - computed: true, optional: true, required: false
  private _isPrimaryKey?: boolean | cdktf.IResolvable; 
  public get isPrimaryKey() {
    return this.getBooleanAttribute('is_primary_key');
  }
  public set isPrimaryKey(value: boolean | cdktf.IResolvable) {
    this._isPrimaryKey = value;
  }
  public resetIsPrimaryKey() {
    this._isPrimaryKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isPrimaryKeyInput() {
    return this._isPrimaryKey;
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

  // name_en - computed: false, optional: false, required: true
  private _nameEn?: string; 
  public get nameEn() {
    return this.getStringAttribute('name_en');
  }
  public set nameEn(value: string) {
    this._nameEn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameEnInput() {
    return this._nameEn;
  }

  // not_null - computed: true, optional: true, required: false
  private _notNull?: boolean | cdktf.IResolvable; 
  public get notNull() {
    return this.getBooleanAttribute('not_null');
  }
  public set notNull(value: boolean | cdktf.IResolvable) {
    this._notNull = value;
  }
  public resetNotNull() {
    this._notNull = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notNullInput() {
    return this._notNull;
  }

  // ordinal - computed: true, optional: true, required: false
  private _ordinal?: string; 
  public get ordinal() {
    return this.getStringAttribute('ordinal');
  }
  public set ordinal(value: string) {
    this._ordinal = value;
  }
  public resetOrdinal() {
    this._ordinal = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ordinalInput() {
    return this._ordinal;
  }

  // related_logic_attr_id - computed: false, optional: true, required: false
  private _relatedLogicAttrId?: string; 
  public get relatedLogicAttrId() {
    return this.getStringAttribute('related_logic_attr_id');
  }
  public set relatedLogicAttrId(value: string) {
    this._relatedLogicAttrId = value;
  }
  public resetRelatedLogicAttrId() {
    this._relatedLogicAttrId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedLogicAttrIdInput() {
    return this._relatedLogicAttrId;
  }

  // related_logic_attr_name - computed: true, optional: true, required: false
  private _relatedLogicAttrName?: string; 
  public get relatedLogicAttrName() {
    return this.getStringAttribute('related_logic_attr_name');
  }
  public set relatedLogicAttrName(value: string) {
    this._relatedLogicAttrName = value;
  }
  public resetRelatedLogicAttrName() {
    this._relatedLogicAttrName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedLogicAttrNameInput() {
    return this._relatedLogicAttrName;
  }

  // related_logic_attr_name_en - computed: true, optional: true, required: false
  private _relatedLogicAttrNameEn?: string; 
  public get relatedLogicAttrNameEn() {
    return this.getStringAttribute('related_logic_attr_name_en');
  }
  public set relatedLogicAttrNameEn(value: string) {
    this._relatedLogicAttrNameEn = value;
  }
  public resetRelatedLogicAttrNameEn() {
    this._relatedLogicAttrNameEn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedLogicAttrNameEnInput() {
    return this._relatedLogicAttrNameEn;
  }

  // stand_row_id - computed: false, optional: true, required: false
  private _standRowId?: string; 
  public get standRowId() {
    return this.getStringAttribute('stand_row_id');
  }
  public set standRowId(value: string) {
    this._standRowId = value;
  }
  public resetStandRowId() {
    this._standRowId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get standRowIdInput() {
    return this._standRowId;
  }

  // stand_row_name - computed: true, optional: true, required: false
  private _standRowName?: string; 
  public get standRowName() {
    return this.getStringAttribute('stand_row_name');
  }
  public set standRowName(value: string) {
    this._standRowName = value;
  }
  public resetStandRowName() {
    this._standRowName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get standRowNameInput() {
    return this._standRowName;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataartsArchitectureTableModelAttributesList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureTableModelAttributes[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureTableModelAttributesOutputReference {
    return new DataartsArchitectureTableModelAttributesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsArchitectureTableModelMappingsSourceFields {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#field_ids DataartsArchitectureTableModel#field_ids}
  */
  readonly fieldIds?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#field_names DataartsArchitectureTableModel#field_names}
  */
  readonly fieldNames?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#target_field_name DataartsArchitectureTableModel#target_field_name}
  */
  readonly targetFieldName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#transform_expression DataartsArchitectureTableModel#transform_expression}
  */
  readonly transformExpression?: string;
}

export function dataartsArchitectureTableModelMappingsSourceFieldsToTerraform(struct?: DataartsArchitectureTableModelMappingsSourceFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    field_ids: cdktf.stringToTerraform(struct!.fieldIds),
    field_names: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.fieldNames),
    target_field_name: cdktf.stringToTerraform(struct!.targetFieldName),
    transform_expression: cdktf.stringToTerraform(struct!.transformExpression),
  }
}


export function dataartsArchitectureTableModelMappingsSourceFieldsToHclTerraform(struct?: DataartsArchitectureTableModelMappingsSourceFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    field_ids: {
      value: cdktf.stringToHclTerraform(struct!.fieldIds),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    field_names: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.fieldNames),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    target_field_name: {
      value: cdktf.stringToHclTerraform(struct!.targetFieldName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    transform_expression: {
      value: cdktf.stringToHclTerraform(struct!.transformExpression),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureTableModelMappingsSourceFieldsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureTableModelMappingsSourceFields | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._fieldIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.fieldIds = this._fieldIds;
    }
    if (this._fieldNames !== undefined) {
      hasAnyValues = true;
      internalValueResult.fieldNames = this._fieldNames;
    }
    if (this._targetFieldName !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetFieldName = this._targetFieldName;
    }
    if (this._transformExpression !== undefined) {
      hasAnyValues = true;
      internalValueResult.transformExpression = this._transformExpression;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureTableModelMappingsSourceFields | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._fieldIds = undefined;
      this._fieldNames = undefined;
      this._targetFieldName = undefined;
      this._transformExpression = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._fieldIds = value.fieldIds;
      this._fieldNames = value.fieldNames;
      this._targetFieldName = value.targetFieldName;
      this._transformExpression = value.transformExpression;
    }
  }

  // changed - computed: true, optional: false, required: false
  public get changed() {
    return this.getBooleanAttribute('changed');
  }

  // field_ids - computed: false, optional: true, required: false
  private _fieldIds?: string; 
  public get fieldIds() {
    return this.getStringAttribute('field_ids');
  }
  public set fieldIds(value: string) {
    this._fieldIds = value;
  }
  public resetFieldIds() {
    this._fieldIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldIdsInput() {
    return this._fieldIds;
  }

  // field_names - computed: false, optional: true, required: false
  private _fieldNames?: string[]; 
  public get fieldNames() {
    return this.getListAttribute('field_names');
  }
  public set fieldNames(value: string[]) {
    this._fieldNames = value;
  }
  public resetFieldNames() {
    this._fieldNames = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldNamesInput() {
    return this._fieldNames;
  }

  // target_field_name - computed: false, optional: true, required: false
  private _targetFieldName?: string; 
  public get targetFieldName() {
    return this.getStringAttribute('target_field_name');
  }
  public set targetFieldName(value: string) {
    this._targetFieldName = value;
  }
  public resetTargetFieldName() {
    this._targetFieldName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get targetFieldNameInput() {
    return this._targetFieldName;
  }

  // transform_expression - computed: false, optional: true, required: false
  private _transformExpression?: string; 
  public get transformExpression() {
    return this.getStringAttribute('transform_expression');
  }
  public set transformExpression(value: string) {
    this._transformExpression = value;
  }
  public resetTransformExpression() {
    this._transformExpression = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get transformExpressionInput() {
    return this._transformExpression;
  }
}

export class DataartsArchitectureTableModelMappingsSourceFieldsList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureTableModelMappingsSourceFields[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureTableModelMappingsSourceFieldsOutputReference {
    return new DataartsArchitectureTableModelMappingsSourceFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsArchitectureTableModelMappingsSourceTablesJoinFields {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#field1_id DataartsArchitectureTableModel#field1_id}
  */
  readonly field1Id: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#field1_name DataartsArchitectureTableModel#field1_name}
  */
  readonly field1Name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#field2_id DataartsArchitectureTableModel#field2_id}
  */
  readonly field2Id: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#field2_name DataartsArchitectureTableModel#field2_name}
  */
  readonly field2Name?: string;
}

export function dataartsArchitectureTableModelMappingsSourceTablesJoinFieldsToTerraform(struct?: DataartsArchitectureTableModelMappingsSourceTablesJoinFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    field1_id: cdktf.stringToTerraform(struct!.field1Id),
    field1_name: cdktf.stringToTerraform(struct!.field1Name),
    field2_id: cdktf.stringToTerraform(struct!.field2Id),
    field2_name: cdktf.stringToTerraform(struct!.field2Name),
  }
}


export function dataartsArchitectureTableModelMappingsSourceTablesJoinFieldsToHclTerraform(struct?: DataartsArchitectureTableModelMappingsSourceTablesJoinFields | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    field1_id: {
      value: cdktf.stringToHclTerraform(struct!.field1Id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    field1_name: {
      value: cdktf.stringToHclTerraform(struct!.field1Name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    field2_id: {
      value: cdktf.stringToHclTerraform(struct!.field2Id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    field2_name: {
      value: cdktf.stringToHclTerraform(struct!.field2Name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureTableModelMappingsSourceTablesJoinFieldsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureTableModelMappingsSourceTablesJoinFields | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._field1Id !== undefined) {
      hasAnyValues = true;
      internalValueResult.field1Id = this._field1Id;
    }
    if (this._field1Name !== undefined) {
      hasAnyValues = true;
      internalValueResult.field1Name = this._field1Name;
    }
    if (this._field2Id !== undefined) {
      hasAnyValues = true;
      internalValueResult.field2Id = this._field2Id;
    }
    if (this._field2Name !== undefined) {
      hasAnyValues = true;
      internalValueResult.field2Name = this._field2Name;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureTableModelMappingsSourceTablesJoinFields | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._field1Id = undefined;
      this._field1Name = undefined;
      this._field2Id = undefined;
      this._field2Name = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._field1Id = value.field1Id;
      this._field1Name = value.field1Name;
      this._field2Id = value.field2Id;
      this._field2Name = value.field2Name;
    }
  }

  // field1_id - computed: false, optional: false, required: true
  private _field1Id?: string; 
  public get field1Id() {
    return this.getStringAttribute('field1_id');
  }
  public set field1Id(value: string) {
    this._field1Id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get field1IdInput() {
    return this._field1Id;
  }

  // field1_name - computed: true, optional: true, required: false
  private _field1Name?: string; 
  public get field1Name() {
    return this.getStringAttribute('field1_name');
  }
  public set field1Name(value: string) {
    this._field1Name = value;
  }
  public resetField1Name() {
    this._field1Name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get field1NameInput() {
    return this._field1Name;
  }

  // field2_id - computed: false, optional: false, required: true
  private _field2Id?: string; 
  public get field2Id() {
    return this.getStringAttribute('field2_id');
  }
  public set field2Id(value: string) {
    this._field2Id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get field2IdInput() {
    return this._field2Id;
  }

  // field2_name - computed: true, optional: true, required: false
  private _field2Name?: string; 
  public get field2Name() {
    return this.getStringAttribute('field2_name');
  }
  public set field2Name(value: string) {
    this._field2Name = value;
  }
  public resetField2Name() {
    this._field2Name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get field2NameInput() {
    return this._field2Name;
  }
}

export class DataartsArchitectureTableModelMappingsSourceTablesJoinFieldsList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureTableModelMappingsSourceTablesJoinFields[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureTableModelMappingsSourceTablesJoinFieldsOutputReference {
    return new DataartsArchitectureTableModelMappingsSourceTablesJoinFieldsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsArchitectureTableModelMappingsSourceTables {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#join_type DataartsArchitectureTableModel#join_type}
  */
  readonly joinType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#table1_id DataartsArchitectureTableModel#table1_id}
  */
  readonly table1Id: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#table1_name DataartsArchitectureTableModel#table1_name}
  */
  readonly table1Name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#table2_id DataartsArchitectureTableModel#table2_id}
  */
  readonly table2Id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#table2_name DataartsArchitectureTableModel#table2_name}
  */
  readonly table2Name?: string;
  /**
  * join_fields block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#join_fields DataartsArchitectureTableModel#join_fields}
  */
  readonly joinFields?: DataartsArchitectureTableModelMappingsSourceTablesJoinFields[] | cdktf.IResolvable;
}

export function dataartsArchitectureTableModelMappingsSourceTablesToTerraform(struct?: DataartsArchitectureTableModelMappingsSourceTables | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    join_type: cdktf.stringToTerraform(struct!.joinType),
    table1_id: cdktf.stringToTerraform(struct!.table1Id),
    table1_name: cdktf.stringToTerraform(struct!.table1Name),
    table2_id: cdktf.stringToTerraform(struct!.table2Id),
    table2_name: cdktf.stringToTerraform(struct!.table2Name),
    join_fields: cdktf.listMapper(dataartsArchitectureTableModelMappingsSourceTablesJoinFieldsToTerraform, true)(struct!.joinFields),
  }
}


export function dataartsArchitectureTableModelMappingsSourceTablesToHclTerraform(struct?: DataartsArchitectureTableModelMappingsSourceTables | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    join_type: {
      value: cdktf.stringToHclTerraform(struct!.joinType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    table1_id: {
      value: cdktf.stringToHclTerraform(struct!.table1Id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    table1_name: {
      value: cdktf.stringToHclTerraform(struct!.table1Name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    table2_id: {
      value: cdktf.stringToHclTerraform(struct!.table2Id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    table2_name: {
      value: cdktf.stringToHclTerraform(struct!.table2Name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    join_fields: {
      value: cdktf.listMapperHcl(dataartsArchitectureTableModelMappingsSourceTablesJoinFieldsToHclTerraform, true)(struct!.joinFields),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsArchitectureTableModelMappingsSourceTablesJoinFieldsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureTableModelMappingsSourceTablesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureTableModelMappingsSourceTables | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._joinType !== undefined) {
      hasAnyValues = true;
      internalValueResult.joinType = this._joinType;
    }
    if (this._table1Id !== undefined) {
      hasAnyValues = true;
      internalValueResult.table1Id = this._table1Id;
    }
    if (this._table1Name !== undefined) {
      hasAnyValues = true;
      internalValueResult.table1Name = this._table1Name;
    }
    if (this._table2Id !== undefined) {
      hasAnyValues = true;
      internalValueResult.table2Id = this._table2Id;
    }
    if (this._table2Name !== undefined) {
      hasAnyValues = true;
      internalValueResult.table2Name = this._table2Name;
    }
    if (this._joinFields?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.joinFields = this._joinFields?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureTableModelMappingsSourceTables | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._joinType = undefined;
      this._table1Id = undefined;
      this._table1Name = undefined;
      this._table2Id = undefined;
      this._table2Name = undefined;
      this._joinFields.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._joinType = value.joinType;
      this._table1Id = value.table1Id;
      this._table1Name = value.table1Name;
      this._table2Id = value.table2Id;
      this._table2Name = value.table2Name;
      this._joinFields.internalValue = value.joinFields;
    }
  }

  // join_type - computed: true, optional: true, required: false
  private _joinType?: string; 
  public get joinType() {
    return this.getStringAttribute('join_type');
  }
  public set joinType(value: string) {
    this._joinType = value;
  }
  public resetJoinType() {
    this._joinType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get joinTypeInput() {
    return this._joinType;
  }

  // table1_id - computed: false, optional: false, required: true
  private _table1Id?: string; 
  public get table1Id() {
    return this.getStringAttribute('table1_id');
  }
  public set table1Id(value: string) {
    this._table1Id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get table1IdInput() {
    return this._table1Id;
  }

  // table1_name - computed: true, optional: true, required: false
  private _table1Name?: string; 
  public get table1Name() {
    return this.getStringAttribute('table1_name');
  }
  public set table1Name(value: string) {
    this._table1Name = value;
  }
  public resetTable1Name() {
    this._table1Name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get table1NameInput() {
    return this._table1Name;
  }

  // table2_id - computed: true, optional: true, required: false
  private _table2Id?: string; 
  public get table2Id() {
    return this.getStringAttribute('table2_id');
  }
  public set table2Id(value: string) {
    this._table2Id = value;
  }
  public resetTable2Id() {
    this._table2Id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get table2IdInput() {
    return this._table2Id;
  }

  // table2_name - computed: true, optional: true, required: false
  private _table2Name?: string; 
  public get table2Name() {
    return this.getStringAttribute('table2_name');
  }
  public set table2Name(value: string) {
    this._table2Name = value;
  }
  public resetTable2Name() {
    this._table2Name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get table2NameInput() {
    return this._table2Name;
  }

  // join_fields - computed: false, optional: true, required: false
  private _joinFields = new DataartsArchitectureTableModelMappingsSourceTablesJoinFieldsList(this, "join_fields", false);
  public get joinFields() {
    return this._joinFields;
  }
  public putJoinFields(value: DataartsArchitectureTableModelMappingsSourceTablesJoinFields[] | cdktf.IResolvable) {
    this._joinFields.internalValue = value;
  }
  public resetJoinFields() {
    this._joinFields.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get joinFieldsInput() {
    return this._joinFields.internalValue;
  }
}

export class DataartsArchitectureTableModelMappingsSourceTablesList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureTableModelMappingsSourceTables[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureTableModelMappingsSourceTablesOutputReference {
    return new DataartsArchitectureTableModelMappingsSourceTablesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsArchitectureTableModelMappings {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#name DataartsArchitectureTableModel#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#src_model_id DataartsArchitectureTableModel#src_model_id}
  */
  readonly srcModelId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#src_model_name DataartsArchitectureTableModel#src_model_name}
  */
  readonly srcModelName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#view_text DataartsArchitectureTableModel#view_text}
  */
  readonly viewText?: string;
  /**
  * source_fields block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#source_fields DataartsArchitectureTableModel#source_fields}
  */
  readonly sourceFields?: DataartsArchitectureTableModelMappingsSourceFields[] | cdktf.IResolvable;
  /**
  * source_tables block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#source_tables DataartsArchitectureTableModel#source_tables}
  */
  readonly sourceTables: DataartsArchitectureTableModelMappingsSourceTables[] | cdktf.IResolvable;
}

export function dataartsArchitectureTableModelMappingsToTerraform(struct?: DataartsArchitectureTableModelMappings | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    src_model_id: cdktf.stringToTerraform(struct!.srcModelId),
    src_model_name: cdktf.stringToTerraform(struct!.srcModelName),
    view_text: cdktf.stringToTerraform(struct!.viewText),
    source_fields: cdktf.listMapper(dataartsArchitectureTableModelMappingsSourceFieldsToTerraform, true)(struct!.sourceFields),
    source_tables: cdktf.listMapper(dataartsArchitectureTableModelMappingsSourceTablesToTerraform, true)(struct!.sourceTables),
  }
}


export function dataartsArchitectureTableModelMappingsToHclTerraform(struct?: DataartsArchitectureTableModelMappings | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    src_model_id: {
      value: cdktf.stringToHclTerraform(struct!.srcModelId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    src_model_name: {
      value: cdktf.stringToHclTerraform(struct!.srcModelName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    view_text: {
      value: cdktf.stringToHclTerraform(struct!.viewText),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_fields: {
      value: cdktf.listMapperHcl(dataartsArchitectureTableModelMappingsSourceFieldsToHclTerraform, true)(struct!.sourceFields),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsArchitectureTableModelMappingsSourceFieldsList",
    },
    source_tables: {
      value: cdktf.listMapperHcl(dataartsArchitectureTableModelMappingsSourceTablesToHclTerraform, true)(struct!.sourceTables),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsArchitectureTableModelMappingsSourceTablesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureTableModelMappingsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureTableModelMappings | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._srcModelId !== undefined) {
      hasAnyValues = true;
      internalValueResult.srcModelId = this._srcModelId;
    }
    if (this._srcModelName !== undefined) {
      hasAnyValues = true;
      internalValueResult.srcModelName = this._srcModelName;
    }
    if (this._viewText !== undefined) {
      hasAnyValues = true;
      internalValueResult.viewText = this._viewText;
    }
    if (this._sourceFields?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceFields = this._sourceFields?.internalValue;
    }
    if (this._sourceTables?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceTables = this._sourceTables?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureTableModelMappings | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._srcModelId = undefined;
      this._srcModelName = undefined;
      this._viewText = undefined;
      this._sourceFields.internalValue = undefined;
      this._sourceTables.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._srcModelId = value.srcModelId;
      this._srcModelName = value.srcModelName;
      this._viewText = value.viewText;
      this._sourceFields.internalValue = value.sourceFields;
      this._sourceTables.internalValue = value.sourceTables;
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

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
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

  // src_model_id - computed: true, optional: true, required: false
  private _srcModelId?: string; 
  public get srcModelId() {
    return this.getStringAttribute('src_model_id');
  }
  public set srcModelId(value: string) {
    this._srcModelId = value;
  }
  public resetSrcModelId() {
    this._srcModelId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcModelIdInput() {
    return this._srcModelId;
  }

  // src_model_name - computed: true, optional: true, required: false
  private _srcModelName?: string; 
  public get srcModelName() {
    return this.getStringAttribute('src_model_name');
  }
  public set srcModelName(value: string) {
    this._srcModelName = value;
  }
  public resetSrcModelName() {
    this._srcModelName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcModelNameInput() {
    return this._srcModelName;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }

  // view_text - computed: true, optional: true, required: false
  private _viewText?: string; 
  public get viewText() {
    return this.getStringAttribute('view_text');
  }
  public set viewText(value: string) {
    this._viewText = value;
  }
  public resetViewText() {
    this._viewText = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get viewTextInput() {
    return this._viewText;
  }

  // source_fields - computed: false, optional: true, required: false
  private _sourceFields = new DataartsArchitectureTableModelMappingsSourceFieldsList(this, "source_fields", false);
  public get sourceFields() {
    return this._sourceFields;
  }
  public putSourceFields(value: DataartsArchitectureTableModelMappingsSourceFields[] | cdktf.IResolvable) {
    this._sourceFields.internalValue = value;
  }
  public resetSourceFields() {
    this._sourceFields.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceFieldsInput() {
    return this._sourceFields.internalValue;
  }

  // source_tables - computed: false, optional: false, required: true
  private _sourceTables = new DataartsArchitectureTableModelMappingsSourceTablesList(this, "source_tables", false);
  public get sourceTables() {
    return this._sourceTables;
  }
  public putSourceTables(value: DataartsArchitectureTableModelMappingsSourceTables[] | cdktf.IResolvable) {
    this._sourceTables.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTablesInput() {
    return this._sourceTables.internalValue;
  }
}

export class DataartsArchitectureTableModelMappingsList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureTableModelMappings[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureTableModelMappingsOutputReference {
    return new DataartsArchitectureTableModelMappingsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsArchitectureTableModelRelationsMappings {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#source_field_id DataartsArchitectureTableModel#source_field_id}
  */
  readonly sourceFieldId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#source_field_name DataartsArchitectureTableModel#source_field_name}
  */
  readonly sourceFieldName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#target_field_id DataartsArchitectureTableModel#target_field_id}
  */
  readonly targetFieldId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#target_field_name DataartsArchitectureTableModel#target_field_name}
  */
  readonly targetFieldName?: string;
}

export function dataartsArchitectureTableModelRelationsMappingsToTerraform(struct?: DataartsArchitectureTableModelRelationsMappings | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    source_field_id: cdktf.stringToTerraform(struct!.sourceFieldId),
    source_field_name: cdktf.stringToTerraform(struct!.sourceFieldName),
    target_field_id: cdktf.stringToTerraform(struct!.targetFieldId),
    target_field_name: cdktf.stringToTerraform(struct!.targetFieldName),
  }
}


export function dataartsArchitectureTableModelRelationsMappingsToHclTerraform(struct?: DataartsArchitectureTableModelRelationsMappings | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    source_field_id: {
      value: cdktf.stringToHclTerraform(struct!.sourceFieldId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_field_name: {
      value: cdktf.stringToHclTerraform(struct!.sourceFieldName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_field_id: {
      value: cdktf.stringToHclTerraform(struct!.targetFieldId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_field_name: {
      value: cdktf.stringToHclTerraform(struct!.targetFieldName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureTableModelRelationsMappingsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureTableModelRelationsMappings | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._sourceFieldId !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceFieldId = this._sourceFieldId;
    }
    if (this._sourceFieldName !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceFieldName = this._sourceFieldName;
    }
    if (this._targetFieldId !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetFieldId = this._targetFieldId;
    }
    if (this._targetFieldName !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetFieldName = this._targetFieldName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureTableModelRelationsMappings | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._sourceFieldId = undefined;
      this._sourceFieldName = undefined;
      this._targetFieldId = undefined;
      this._targetFieldName = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._sourceFieldId = value.sourceFieldId;
      this._sourceFieldName = value.sourceFieldName;
      this._targetFieldId = value.targetFieldId;
      this._targetFieldName = value.targetFieldName;
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

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // source_field_id - computed: true, optional: true, required: false
  private _sourceFieldId?: string; 
  public get sourceFieldId() {
    return this.getStringAttribute('source_field_id');
  }
  public set sourceFieldId(value: string) {
    this._sourceFieldId = value;
  }
  public resetSourceFieldId() {
    this._sourceFieldId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceFieldIdInput() {
    return this._sourceFieldId;
  }

  // source_field_name - computed: true, optional: true, required: false
  private _sourceFieldName?: string; 
  public get sourceFieldName() {
    return this.getStringAttribute('source_field_name');
  }
  public set sourceFieldName(value: string) {
    this._sourceFieldName = value;
  }
  public resetSourceFieldName() {
    this._sourceFieldName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceFieldNameInput() {
    return this._sourceFieldName;
  }

  // target_field_id - computed: true, optional: true, required: false
  private _targetFieldId?: string; 
  public get targetFieldId() {
    return this.getStringAttribute('target_field_id');
  }
  public set targetFieldId(value: string) {
    this._targetFieldId = value;
  }
  public resetTargetFieldId() {
    this._targetFieldId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get targetFieldIdInput() {
    return this._targetFieldId;
  }

  // target_field_name - computed: true, optional: true, required: false
  private _targetFieldName?: string; 
  public get targetFieldName() {
    return this.getStringAttribute('target_field_name');
  }
  public set targetFieldName(value: string) {
    this._targetFieldName = value;
  }
  public resetTargetFieldName() {
    this._targetFieldName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get targetFieldNameInput() {
    return this._targetFieldName;
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

export class DataartsArchitectureTableModelRelationsMappingsList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureTableModelRelationsMappings[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureTableModelRelationsMappingsOutputReference {
    return new DataartsArchitectureTableModelRelationsMappingsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsArchitectureTableModelRelations {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#name DataartsArchitectureTableModel#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#role DataartsArchitectureTableModel#role}
  */
  readonly role?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#source_table_id DataartsArchitectureTableModel#source_table_id}
  */
  readonly sourceTableId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#source_table_name DataartsArchitectureTableModel#source_table_name}
  */
  readonly sourceTableName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#source_type DataartsArchitectureTableModel#source_type}
  */
  readonly sourceType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#target_table_id DataartsArchitectureTableModel#target_table_id}
  */
  readonly targetTableId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#target_table_name DataartsArchitectureTableModel#target_table_name}
  */
  readonly targetTableName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#target_type DataartsArchitectureTableModel#target_type}
  */
  readonly targetType: string;
  /**
  * mappings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#mappings DataartsArchitectureTableModel#mappings}
  */
  readonly mappings: DataartsArchitectureTableModelRelationsMappings[] | cdktf.IResolvable;
}

export function dataartsArchitectureTableModelRelationsToTerraform(struct?: DataartsArchitectureTableModelRelations | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    role: cdktf.stringToTerraform(struct!.role),
    source_table_id: cdktf.stringToTerraform(struct!.sourceTableId),
    source_table_name: cdktf.stringToTerraform(struct!.sourceTableName),
    source_type: cdktf.stringToTerraform(struct!.sourceType),
    target_table_id: cdktf.stringToTerraform(struct!.targetTableId),
    target_table_name: cdktf.stringToTerraform(struct!.targetTableName),
    target_type: cdktf.stringToTerraform(struct!.targetType),
    mappings: cdktf.listMapper(dataartsArchitectureTableModelRelationsMappingsToTerraform, true)(struct!.mappings),
  }
}


export function dataartsArchitectureTableModelRelationsToHclTerraform(struct?: DataartsArchitectureTableModelRelations | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    role: {
      value: cdktf.stringToHclTerraform(struct!.role),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_table_id: {
      value: cdktf.stringToHclTerraform(struct!.sourceTableId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_table_name: {
      value: cdktf.stringToHclTerraform(struct!.sourceTableName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_type: {
      value: cdktf.stringToHclTerraform(struct!.sourceType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_table_id: {
      value: cdktf.stringToHclTerraform(struct!.targetTableId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_table_name: {
      value: cdktf.stringToHclTerraform(struct!.targetTableName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_type: {
      value: cdktf.stringToHclTerraform(struct!.targetType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mappings: {
      value: cdktf.listMapperHcl(dataartsArchitectureTableModelRelationsMappingsToHclTerraform, true)(struct!.mappings),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsArchitectureTableModelRelationsMappingsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsArchitectureTableModelRelationsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsArchitectureTableModelRelations | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._role !== undefined) {
      hasAnyValues = true;
      internalValueResult.role = this._role;
    }
    if (this._sourceTableId !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceTableId = this._sourceTableId;
    }
    if (this._sourceTableName !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceTableName = this._sourceTableName;
    }
    if (this._sourceType !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceType = this._sourceType;
    }
    if (this._targetTableId !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetTableId = this._targetTableId;
    }
    if (this._targetTableName !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetTableName = this._targetTableName;
    }
    if (this._targetType !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetType = this._targetType;
    }
    if (this._mappings?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.mappings = this._mappings?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsArchitectureTableModelRelations | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._role = undefined;
      this._sourceTableId = undefined;
      this._sourceTableName = undefined;
      this._sourceType = undefined;
      this._targetTableId = undefined;
      this._targetTableName = undefined;
      this._targetType = undefined;
      this._mappings.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._role = value.role;
      this._sourceTableId = value.sourceTableId;
      this._sourceTableName = value.sourceTableName;
      this._sourceType = value.sourceType;
      this._targetTableId = value.targetTableId;
      this._targetTableName = value.targetTableName;
      this._targetType = value.targetType;
      this._mappings.internalValue = value.mappings;
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

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
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

  // role - computed: false, optional: true, required: false
  private _role?: string; 
  public get role() {
    return this.getStringAttribute('role');
  }
  public set role(value: string) {
    this._role = value;
  }
  public resetRole() {
    this._role = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get roleInput() {
    return this._role;
  }

  // source_table_id - computed: true, optional: true, required: false
  private _sourceTableId?: string; 
  public get sourceTableId() {
    return this.getStringAttribute('source_table_id');
  }
  public set sourceTableId(value: string) {
    this._sourceTableId = value;
  }
  public resetSourceTableId() {
    this._sourceTableId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTableIdInput() {
    return this._sourceTableId;
  }

  // source_table_name - computed: true, optional: true, required: false
  private _sourceTableName?: string; 
  public get sourceTableName() {
    return this.getStringAttribute('source_table_name');
  }
  public set sourceTableName(value: string) {
    this._sourceTableName = value;
  }
  public resetSourceTableName() {
    this._sourceTableName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTableNameInput() {
    return this._sourceTableName;
  }

  // source_type - computed: false, optional: false, required: true
  private _sourceType?: string; 
  public get sourceType() {
    return this.getStringAttribute('source_type');
  }
  public set sourceType(value: string) {
    this._sourceType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTypeInput() {
    return this._sourceType;
  }

  // target_table_id - computed: true, optional: true, required: false
  private _targetTableId?: string; 
  public get targetTableId() {
    return this.getStringAttribute('target_table_id');
  }
  public set targetTableId(value: string) {
    this._targetTableId = value;
  }
  public resetTargetTableId() {
    this._targetTableId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get targetTableIdInput() {
    return this._targetTableId;
  }

  // target_table_name - computed: true, optional: true, required: false
  private _targetTableName?: string; 
  public get targetTableName() {
    return this.getStringAttribute('target_table_name');
  }
  public set targetTableName(value: string) {
    this._targetTableName = value;
  }
  public resetTargetTableName() {
    this._targetTableName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get targetTableNameInput() {
    return this._targetTableName;
  }

  // target_type - computed: false, optional: false, required: true
  private _targetType?: string; 
  public get targetType() {
    return this.getStringAttribute('target_type');
  }
  public set targetType(value: string) {
    this._targetType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetTypeInput() {
    return this._targetType;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // updated_by - computed: true, optional: false, required: false
  public get updatedBy() {
    return this.getStringAttribute('updated_by');
  }

  // mappings - computed: false, optional: false, required: true
  private _mappings = new DataartsArchitectureTableModelRelationsMappingsList(this, "mappings", false);
  public get mappings() {
    return this._mappings;
  }
  public putMappings(value: DataartsArchitectureTableModelRelationsMappings[] | cdktf.IResolvable) {
    this._mappings.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get mappingsInput() {
    return this._mappings.internalValue;
  }
}

export class DataartsArchitectureTableModelRelationsList extends cdktf.ComplexList {
  public internalValue? : DataartsArchitectureTableModelRelations[] | cdktf.IResolvable

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
  public get(index: number): DataartsArchitectureTableModelRelationsOutputReference {
    return new DataartsArchitectureTableModelRelationsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model huaweicloud_dataarts_architecture_table_model}
*/
export class DataartsArchitectureTableModel extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_architecture_table_model";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataartsArchitectureTableModel resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataartsArchitectureTableModel to import
  * @param importFromId The id of the existing DataartsArchitectureTableModel that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataartsArchitectureTableModel to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_architecture_table_model", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_architecture_table_model huaweicloud_dataarts_architecture_table_model} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataartsArchitectureTableModelConfig
  */
  public constructor(scope: Construct, id: string, config: DataartsArchitectureTableModelConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_architecture_table_model',
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
    this._code = config.code;
    this._compression = config.compression;
    this._configs = config.configs;
    this._dataFormat = config.dataFormat;
    this._dbName = config.dbName;
    this._delType = config.delType;
    this._description = config.description;
    this._dirtyOutDatabase = config.dirtyOutDatabase;
    this._dirtyOutPrefix = config.dirtyOutPrefix;
    this._dirtyOutSuffix = config.dirtyOutSuffix;
    this._dirtyOutSwitch = config.dirtyOutSwitch;
    this._distribute = config.distribute;
    this._distributeColumn = config.distributeColumn;
    this._dlfTaskId = config.dlfTaskId;
    this._dwId = config.dwId;
    this._dwName = config.dwName;
    this._dwType = config.dwType;
    this._id = config.id;
    this._modelId = config.modelId;
    this._obsLocation = config.obsLocation;
    this._owner = config.owner;
    this._parentTableId = config.parentTableId;
    this._parentTableName = config.parentTableName;
    this._partitionConf = config.partitionConf;
    this._physicalTableName = config.physicalTableName;
    this._queueName = config.queueName;
    this._region = config.region;
    this._relatedLogicModelId = config.relatedLogicModelId;
    this._relatedLogicModelName = config.relatedLogicModelName;
    this._relatedLogicTableModelId = config.relatedLogicTableModelId;
    this._relatedLogicTableModelName = config.relatedLogicTableModelName;
    this._reversed = config.reversed;
    this._schema = config.schema;
    this._subjectId = config.subjectId;
    this._tableName = config.tableName;
    this._tableType = config.tableType;
    this._useRecentlyPartition = config.useRecentlyPartition;
    this._workspaceId = config.workspaceId;
    this._attributes.internalValue = config.attributes;
    this._mappings.internalValue = config.mappings;
    this._relations.internalValue = config.relations;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // business_asset_status - computed: true, optional: false, required: false
  public get businessAssetStatus() {
    return this.getStringAttribute('business_asset_status');
  }

  // catalog_path - computed: true, optional: false, required: false
  public get catalogPath() {
    return this.getStringAttribute('catalog_path');
  }

  // code - computed: true, optional: true, required: false
  private _code?: string; 
  public get code() {
    return this.getStringAttribute('code');
  }
  public set code(value: string) {
    this._code = value;
  }
  public resetCode() {
    this._code = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeInput() {
    return this._code;
  }

  // compression - computed: true, optional: true, required: false
  private _compression?: string; 
  public get compression() {
    return this.getStringAttribute('compression');
  }
  public set compression(value: string) {
    this._compression = value;
  }
  public resetCompression() {
    this._compression = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get compressionInput() {
    return this._compression;
  }

  // configs - computed: false, optional: true, required: false
  private _configs?: string; 
  public get configs() {
    return this.getStringAttribute('configs');
  }
  public set configs(value: string) {
    this._configs = value;
  }
  public resetConfigs() {
    this._configs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configsInput() {
    return this._configs;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // data_format - computed: true, optional: true, required: false
  private _dataFormat?: string; 
  public get dataFormat() {
    return this.getStringAttribute('data_format');
  }
  public set dataFormat(value: string) {
    this._dataFormat = value;
  }
  public resetDataFormat() {
    this._dataFormat = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataFormatInput() {
    return this._dataFormat;
  }

  // data_quality_status - computed: true, optional: false, required: false
  public get dataQualityStatus() {
    return this.getStringAttribute('data_quality_status');
  }

  // db_name - computed: false, optional: true, required: false
  private _dbName?: string; 
  public get dbName() {
    return this.getStringAttribute('db_name');
  }
  public set dbName(value: string) {
    this._dbName = value;
  }
  public resetDbName() {
    this._dbName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dbNameInput() {
    return this._dbName;
  }

  // del_type - computed: false, optional: true, required: false
  private _delType?: string; 
  public get delType() {
    return this.getStringAttribute('del_type');
  }
  public set delType(value: string) {
    this._delType = value;
  }
  public resetDelType() {
    this._delType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get delTypeInput() {
    return this._delType;
  }

  // description - computed: false, optional: false, required: true
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
  }

  // dev_physical_table_status - computed: true, optional: false, required: false
  public get devPhysicalTableStatus() {
    return this.getStringAttribute('dev_physical_table_status');
  }

  // dirty_out_database - computed: false, optional: true, required: false
  private _dirtyOutDatabase?: string; 
  public get dirtyOutDatabase() {
    return this.getStringAttribute('dirty_out_database');
  }
  public set dirtyOutDatabase(value: string) {
    this._dirtyOutDatabase = value;
  }
  public resetDirtyOutDatabase() {
    this._dirtyOutDatabase = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dirtyOutDatabaseInput() {
    return this._dirtyOutDatabase;
  }

  // dirty_out_prefix - computed: false, optional: true, required: false
  private _dirtyOutPrefix?: string; 
  public get dirtyOutPrefix() {
    return this.getStringAttribute('dirty_out_prefix');
  }
  public set dirtyOutPrefix(value: string) {
    this._dirtyOutPrefix = value;
  }
  public resetDirtyOutPrefix() {
    this._dirtyOutPrefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dirtyOutPrefixInput() {
    return this._dirtyOutPrefix;
  }

  // dirty_out_suffix - computed: false, optional: true, required: false
  private _dirtyOutSuffix?: string; 
  public get dirtyOutSuffix() {
    return this.getStringAttribute('dirty_out_suffix');
  }
  public set dirtyOutSuffix(value: string) {
    this._dirtyOutSuffix = value;
  }
  public resetDirtyOutSuffix() {
    this._dirtyOutSuffix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dirtyOutSuffixInput() {
    return this._dirtyOutSuffix;
  }

  // dirty_out_switch - computed: true, optional: true, required: false
  private _dirtyOutSwitch?: boolean | cdktf.IResolvable; 
  public get dirtyOutSwitch() {
    return this.getBooleanAttribute('dirty_out_switch');
  }
  public set dirtyOutSwitch(value: boolean | cdktf.IResolvable) {
    this._dirtyOutSwitch = value;
  }
  public resetDirtyOutSwitch() {
    this._dirtyOutSwitch = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dirtyOutSwitchInput() {
    return this._dirtyOutSwitch;
  }

  // distribute - computed: true, optional: true, required: false
  private _distribute?: string; 
  public get distribute() {
    return this.getStringAttribute('distribute');
  }
  public set distribute(value: string) {
    this._distribute = value;
  }
  public resetDistribute() {
    this._distribute = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get distributeInput() {
    return this._distribute;
  }

  // distribute_column - computed: true, optional: true, required: false
  private _distributeColumn?: string; 
  public get distributeColumn() {
    return this.getStringAttribute('distribute_column');
  }
  public set distributeColumn(value: string) {
    this._distributeColumn = value;
  }
  public resetDistributeColumn() {
    this._distributeColumn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get distributeColumnInput() {
    return this._distributeColumn;
  }

  // dlf_task_id - computed: true, optional: true, required: false
  private _dlfTaskId?: string; 
  public get dlfTaskId() {
    return this.getStringAttribute('dlf_task_id');
  }
  public set dlfTaskId(value: string) {
    this._dlfTaskId = value;
  }
  public resetDlfTaskId() {
    this._dlfTaskId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dlfTaskIdInput() {
    return this._dlfTaskId;
  }

  // dw_id - computed: false, optional: true, required: false
  private _dwId?: string; 
  public get dwId() {
    return this.getStringAttribute('dw_id');
  }
  public set dwId(value: string) {
    this._dwId = value;
  }
  public resetDwId() {
    this._dwId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dwIdInput() {
    return this._dwId;
  }

  // dw_name - computed: true, optional: true, required: false
  private _dwName?: string; 
  public get dwName() {
    return this.getStringAttribute('dw_name');
  }
  public set dwName(value: string) {
    this._dwName = value;
  }
  public resetDwName() {
    this._dwName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dwNameInput() {
    return this._dwName;
  }

  // dw_type - computed: false, optional: false, required: true
  private _dwType?: string; 
  public get dwType() {
    return this.getStringAttribute('dw_type');
  }
  public set dwType(value: string) {
    this._dwType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dwTypeInput() {
    return this._dwType;
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

  // is_partition - computed: true, optional: false, required: false
  public get isPartition() {
    return this.getBooleanAttribute('is_partition');
  }

  // logic_tb_guid - computed: true, optional: false, required: false
  public get logicTbGuid() {
    return this.getStringAttribute('logic_tb_guid');
  }

  // meta_data_link_status - computed: true, optional: false, required: false
  public get metaDataLinkStatus() {
    return this.getStringAttribute('meta_data_link_status');
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

  // obs_location - computed: false, optional: true, required: false
  private _obsLocation?: string; 
  public get obsLocation() {
    return this.getStringAttribute('obs_location');
  }
  public set obsLocation(value: string) {
    this._obsLocation = value;
  }
  public resetObsLocation() {
    this._obsLocation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsLocationInput() {
    return this._obsLocation;
  }

  // owner - computed: false, optional: true, required: false
  private _owner?: string; 
  public get owner() {
    return this.getStringAttribute('owner');
  }
  public set owner(value: string) {
    this._owner = value;
  }
  public resetOwner() {
    this._owner = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ownerInput() {
    return this._owner;
  }

  // parent_table_code - computed: true, optional: false, required: false
  public get parentTableCode() {
    return this.getStringAttribute('parent_table_code');
  }

  // parent_table_id - computed: false, optional: true, required: false
  private _parentTableId?: string; 
  public get parentTableId() {
    return this.getStringAttribute('parent_table_id');
  }
  public set parentTableId(value: string) {
    this._parentTableId = value;
  }
  public resetParentTableId() {
    this._parentTableId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parentTableIdInput() {
    return this._parentTableId;
  }

  // parent_table_name - computed: true, optional: true, required: false
  private _parentTableName?: string; 
  public get parentTableName() {
    return this.getStringAttribute('parent_table_name');
  }
  public set parentTableName(value: string) {
    this._parentTableName = value;
  }
  public resetParentTableName() {
    this._parentTableName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parentTableNameInput() {
    return this._parentTableName;
  }

  // partition_conf - computed: false, optional: true, required: false
  private _partitionConf?: string; 
  public get partitionConf() {
    return this.getStringAttribute('partition_conf');
  }
  public set partitionConf(value: string) {
    this._partitionConf = value;
  }
  public resetPartitionConf() {
    this._partitionConf = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get partitionConfInput() {
    return this._partitionConf;
  }

  // physical_table_name - computed: false, optional: false, required: true
  private _physicalTableName?: string; 
  public get physicalTableName() {
    return this.getStringAttribute('physical_table_name');
  }
  public set physicalTableName(value: string) {
    this._physicalTableName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get physicalTableNameInput() {
    return this._physicalTableName;
  }

  // physical_table_status - computed: true, optional: false, required: false
  public get physicalTableStatus() {
    return this.getStringAttribute('physical_table_status');
  }

  // queue_name - computed: false, optional: true, required: false
  private _queueName?: string; 
  public get queueName() {
    return this.getStringAttribute('queue_name');
  }
  public set queueName(value: string) {
    this._queueName = value;
  }
  public resetQueueName() {
    this._queueName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queueNameInput() {
    return this._queueName;
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

  // related_logic_model_id - computed: false, optional: true, required: false
  private _relatedLogicModelId?: string; 
  public get relatedLogicModelId() {
    return this.getStringAttribute('related_logic_model_id');
  }
  public set relatedLogicModelId(value: string) {
    this._relatedLogicModelId = value;
  }
  public resetRelatedLogicModelId() {
    this._relatedLogicModelId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedLogicModelIdInput() {
    return this._relatedLogicModelId;
  }

  // related_logic_model_name - computed: true, optional: true, required: false
  private _relatedLogicModelName?: string; 
  public get relatedLogicModelName() {
    return this.getStringAttribute('related_logic_model_name');
  }
  public set relatedLogicModelName(value: string) {
    this._relatedLogicModelName = value;
  }
  public resetRelatedLogicModelName() {
    this._relatedLogicModelName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedLogicModelNameInput() {
    return this._relatedLogicModelName;
  }

  // related_logic_table_model_id - computed: false, optional: true, required: false
  private _relatedLogicTableModelId?: string; 
  public get relatedLogicTableModelId() {
    return this.getStringAttribute('related_logic_table_model_id');
  }
  public set relatedLogicTableModelId(value: string) {
    this._relatedLogicTableModelId = value;
  }
  public resetRelatedLogicTableModelId() {
    this._relatedLogicTableModelId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedLogicTableModelIdInput() {
    return this._relatedLogicTableModelId;
  }

  // related_logic_table_model_name - computed: true, optional: true, required: false
  private _relatedLogicTableModelName?: string; 
  public get relatedLogicTableModelName() {
    return this.getStringAttribute('related_logic_table_model_name');
  }
  public set relatedLogicTableModelName(value: string) {
    this._relatedLogicTableModelName = value;
  }
  public resetRelatedLogicTableModelName() {
    this._relatedLogicTableModelName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedLogicTableModelNameInput() {
    return this._relatedLogicTableModelName;
  }

  // reversed - computed: true, optional: true, required: false
  private _reversed?: boolean | cdktf.IResolvable; 
  public get reversed() {
    return this.getBooleanAttribute('reversed');
  }
  public set reversed(value: boolean | cdktf.IResolvable) {
    this._reversed = value;
  }
  public resetReversed() {
    this._reversed = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get reversedInput() {
    return this._reversed;
  }

  // schema - computed: false, optional: true, required: false
  private _schema?: string; 
  public get schema() {
    return this.getStringAttribute('schema');
  }
  public set schema(value: string) {
    this._schema = value;
  }
  public resetSchema() {
    this._schema = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schemaInput() {
    return this._schema;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // subject_id - computed: false, optional: false, required: true
  private _subjectId?: string; 
  public get subjectId() {
    return this.getStringAttribute('subject_id');
  }
  public set subjectId(value: string) {
    this._subjectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subjectIdInput() {
    return this._subjectId;
  }

  // summary_status - computed: true, optional: false, required: false
  public get summaryStatus() {
    return this.getStringAttribute('summary_status');
  }

  // table_name - computed: false, optional: false, required: true
  private _tableName?: string; 
  public get tableName() {
    return this.getStringAttribute('table_name');
  }
  public set tableName(value: string) {
    this._tableName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get tableNameInput() {
    return this._tableName;
  }

  // table_type - computed: true, optional: true, required: false
  private _tableType?: string; 
  public get tableType() {
    return this.getStringAttribute('table_type');
  }
  public set tableType(value: string) {
    this._tableType = value;
  }
  public resetTableType() {
    this._tableType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tableTypeInput() {
    return this._tableType;
  }

  // tb_guid - computed: true, optional: false, required: false
  public get tbGuid() {
    return this.getStringAttribute('tb_guid');
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

  // use_recently_partition - computed: true, optional: true, required: false
  private _useRecentlyPartition?: boolean | cdktf.IResolvable; 
  public get useRecentlyPartition() {
    return this.getBooleanAttribute('use_recently_partition');
  }
  public set useRecentlyPartition(value: boolean | cdktf.IResolvable) {
    this._useRecentlyPartition = value;
  }
  public resetUseRecentlyPartition() {
    this._useRecentlyPartition = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get useRecentlyPartitionInput() {
    return this._useRecentlyPartition;
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

  // attributes - computed: false, optional: false, required: true
  private _attributes = new DataartsArchitectureTableModelAttributesList(this, "attributes", true);
  public get attributes() {
    return this._attributes;
  }
  public putAttributes(value: DataartsArchitectureTableModelAttributes[] | cdktf.IResolvable) {
    this._attributes.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get attributesInput() {
    return this._attributes.internalValue;
  }

  // mappings - computed: false, optional: true, required: false
  private _mappings = new DataartsArchitectureTableModelMappingsList(this, "mappings", false);
  public get mappings() {
    return this._mappings;
  }
  public putMappings(value: DataartsArchitectureTableModelMappings[] | cdktf.IResolvable) {
    this._mappings.internalValue = value;
  }
  public resetMappings() {
    this._mappings.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mappingsInput() {
    return this._mappings.internalValue;
  }

  // relations - computed: false, optional: true, required: false
  private _relations = new DataartsArchitectureTableModelRelationsList(this, "relations", false);
  public get relations() {
    return this._relations;
  }
  public putRelations(value: DataartsArchitectureTableModelRelations[] | cdktf.IResolvable) {
    this._relations.internalValue = value;
  }
  public resetRelations() {
    this._relations.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relationsInput() {
    return this._relations.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      code: cdktf.stringToTerraform(this._code),
      compression: cdktf.stringToTerraform(this._compression),
      configs: cdktf.stringToTerraform(this._configs),
      data_format: cdktf.stringToTerraform(this._dataFormat),
      db_name: cdktf.stringToTerraform(this._dbName),
      del_type: cdktf.stringToTerraform(this._delType),
      description: cdktf.stringToTerraform(this._description),
      dirty_out_database: cdktf.stringToTerraform(this._dirtyOutDatabase),
      dirty_out_prefix: cdktf.stringToTerraform(this._dirtyOutPrefix),
      dirty_out_suffix: cdktf.stringToTerraform(this._dirtyOutSuffix),
      dirty_out_switch: cdktf.booleanToTerraform(this._dirtyOutSwitch),
      distribute: cdktf.stringToTerraform(this._distribute),
      distribute_column: cdktf.stringToTerraform(this._distributeColumn),
      dlf_task_id: cdktf.stringToTerraform(this._dlfTaskId),
      dw_id: cdktf.stringToTerraform(this._dwId),
      dw_name: cdktf.stringToTerraform(this._dwName),
      dw_type: cdktf.stringToTerraform(this._dwType),
      id: cdktf.stringToTerraform(this._id),
      model_id: cdktf.stringToTerraform(this._modelId),
      obs_location: cdktf.stringToTerraform(this._obsLocation),
      owner: cdktf.stringToTerraform(this._owner),
      parent_table_id: cdktf.stringToTerraform(this._parentTableId),
      parent_table_name: cdktf.stringToTerraform(this._parentTableName),
      partition_conf: cdktf.stringToTerraform(this._partitionConf),
      physical_table_name: cdktf.stringToTerraform(this._physicalTableName),
      queue_name: cdktf.stringToTerraform(this._queueName),
      region: cdktf.stringToTerraform(this._region),
      related_logic_model_id: cdktf.stringToTerraform(this._relatedLogicModelId),
      related_logic_model_name: cdktf.stringToTerraform(this._relatedLogicModelName),
      related_logic_table_model_id: cdktf.stringToTerraform(this._relatedLogicTableModelId),
      related_logic_table_model_name: cdktf.stringToTerraform(this._relatedLogicTableModelName),
      reversed: cdktf.booleanToTerraform(this._reversed),
      schema: cdktf.stringToTerraform(this._schema),
      subject_id: cdktf.stringToTerraform(this._subjectId),
      table_name: cdktf.stringToTerraform(this._tableName),
      table_type: cdktf.stringToTerraform(this._tableType),
      use_recently_partition: cdktf.booleanToTerraform(this._useRecentlyPartition),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      attributes: cdktf.listMapper(dataartsArchitectureTableModelAttributesToTerraform, true)(this._attributes.internalValue),
      mappings: cdktf.listMapper(dataartsArchitectureTableModelMappingsToTerraform, true)(this._mappings.internalValue),
      relations: cdktf.listMapper(dataartsArchitectureTableModelRelationsToTerraform, true)(this._relations.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      code: {
        value: cdktf.stringToHclTerraform(this._code),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      compression: {
        value: cdktf.stringToHclTerraform(this._compression),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      configs: {
        value: cdktf.stringToHclTerraform(this._configs),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      data_format: {
        value: cdktf.stringToHclTerraform(this._dataFormat),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      db_name: {
        value: cdktf.stringToHclTerraform(this._dbName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      del_type: {
        value: cdktf.stringToHclTerraform(this._delType),
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
      dirty_out_database: {
        value: cdktf.stringToHclTerraform(this._dirtyOutDatabase),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dirty_out_prefix: {
        value: cdktf.stringToHclTerraform(this._dirtyOutPrefix),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dirty_out_suffix: {
        value: cdktf.stringToHclTerraform(this._dirtyOutSuffix),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dirty_out_switch: {
        value: cdktf.booleanToHclTerraform(this._dirtyOutSwitch),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      distribute: {
        value: cdktf.stringToHclTerraform(this._distribute),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      distribute_column: {
        value: cdktf.stringToHclTerraform(this._distributeColumn),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dlf_task_id: {
        value: cdktf.stringToHclTerraform(this._dlfTaskId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dw_id: {
        value: cdktf.stringToHclTerraform(this._dwId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dw_name: {
        value: cdktf.stringToHclTerraform(this._dwName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dw_type: {
        value: cdktf.stringToHclTerraform(this._dwType),
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
      obs_location: {
        value: cdktf.stringToHclTerraform(this._obsLocation),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      owner: {
        value: cdktf.stringToHclTerraform(this._owner),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      parent_table_id: {
        value: cdktf.stringToHclTerraform(this._parentTableId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      parent_table_name: {
        value: cdktf.stringToHclTerraform(this._parentTableName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      partition_conf: {
        value: cdktf.stringToHclTerraform(this._partitionConf),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      physical_table_name: {
        value: cdktf.stringToHclTerraform(this._physicalTableName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      queue_name: {
        value: cdktf.stringToHclTerraform(this._queueName),
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
      related_logic_model_id: {
        value: cdktf.stringToHclTerraform(this._relatedLogicModelId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      related_logic_model_name: {
        value: cdktf.stringToHclTerraform(this._relatedLogicModelName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      related_logic_table_model_id: {
        value: cdktf.stringToHclTerraform(this._relatedLogicTableModelId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      related_logic_table_model_name: {
        value: cdktf.stringToHclTerraform(this._relatedLogicTableModelName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      reversed: {
        value: cdktf.booleanToHclTerraform(this._reversed),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      schema: {
        value: cdktf.stringToHclTerraform(this._schema),
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
      table_name: {
        value: cdktf.stringToHclTerraform(this._tableName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      table_type: {
        value: cdktf.stringToHclTerraform(this._tableType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      use_recently_partition: {
        value: cdktf.booleanToHclTerraform(this._useRecentlyPartition),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      attributes: {
        value: cdktf.listMapperHcl(dataartsArchitectureTableModelAttributesToHclTerraform, true)(this._attributes.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "DataartsArchitectureTableModelAttributesList",
      },
      mappings: {
        value: cdktf.listMapperHcl(dataartsArchitectureTableModelMappingsToHclTerraform, true)(this._mappings.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataartsArchitectureTableModelMappingsList",
      },
      relations: {
        value: cdktf.listMapperHcl(dataartsArchitectureTableModelRelationsToHclTerraform, true)(this._relations.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataartsArchitectureTableModelRelationsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

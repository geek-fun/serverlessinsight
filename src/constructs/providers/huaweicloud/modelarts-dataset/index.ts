// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ModelartsDatasetConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#description ModelartsDataset#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#id ModelartsDataset#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#import_labeled_enabled ModelartsDataset#import_labeled_enabled}
  */
  readonly importLabeledEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#name ModelartsDataset#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#output_path ModelartsDataset#output_path}
  */
  readonly outputPath: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#region ModelartsDataset#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#type ModelartsDataset#type}
  */
  readonly type: number;
  /**
  * data_source block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#data_source ModelartsDataset#data_source}
  */
  readonly dataSource: ModelartsDatasetDataSource;
  /**
  * label_format block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#label_format ModelartsDataset#label_format}
  */
  readonly labelFormat?: ModelartsDatasetLabelFormat;
  /**
  * labels block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#labels ModelartsDataset#labels}
  */
  readonly labels?: ModelartsDatasetLabels[] | cdktf.IResolvable;
  /**
  * schemas block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#schemas ModelartsDataset#schemas}
  */
  readonly schemas?: ModelartsDatasetSchemas[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#timeouts ModelartsDataset#timeouts}
  */
  readonly timeouts?: ModelartsDatasetTimeouts;
}
export interface ModelartsDatasetDataSource {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#cluster_id ModelartsDataset#cluster_id}
  */
  readonly clusterId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#data_type ModelartsDataset#data_type}
  */
  readonly dataType?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#database_name ModelartsDataset#database_name}
  */
  readonly databaseName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#password ModelartsDataset#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#path ModelartsDataset#path}
  */
  readonly path?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#queue_name ModelartsDataset#queue_name}
  */
  readonly queueName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#table_name ModelartsDataset#table_name}
  */
  readonly tableName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#user_name ModelartsDataset#user_name}
  */
  readonly userName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#with_column_header ModelartsDataset#with_column_header}
  */
  readonly withColumnHeader?: boolean | cdktf.IResolvable;
}

export function modelartsDatasetDataSourceToTerraform(struct?: ModelartsDatasetDataSourceOutputReference | ModelartsDatasetDataSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cluster_id: cdktf.stringToTerraform(struct!.clusterId),
    data_type: cdktf.numberToTerraform(struct!.dataType),
    database_name: cdktf.stringToTerraform(struct!.databaseName),
    password: cdktf.stringToTerraform(struct!.password),
    path: cdktf.stringToTerraform(struct!.path),
    queue_name: cdktf.stringToTerraform(struct!.queueName),
    table_name: cdktf.stringToTerraform(struct!.tableName),
    user_name: cdktf.stringToTerraform(struct!.userName),
    with_column_header: cdktf.booleanToTerraform(struct!.withColumnHeader),
  }
}


export function modelartsDatasetDataSourceToHclTerraform(struct?: ModelartsDatasetDataSourceOutputReference | ModelartsDatasetDataSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cluster_id: {
      value: cdktf.stringToHclTerraform(struct!.clusterId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    data_type: {
      value: cdktf.numberToHclTerraform(struct!.dataType),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    database_name: {
      value: cdktf.stringToHclTerraform(struct!.databaseName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    path: {
      value: cdktf.stringToHclTerraform(struct!.path),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    queue_name: {
      value: cdktf.stringToHclTerraform(struct!.queueName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    table_name: {
      value: cdktf.stringToHclTerraform(struct!.tableName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user_name: {
      value: cdktf.stringToHclTerraform(struct!.userName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    with_column_header: {
      value: cdktf.booleanToHclTerraform(struct!.withColumnHeader),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsDatasetDataSourceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ModelartsDatasetDataSource | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._clusterId !== undefined) {
      hasAnyValues = true;
      internalValueResult.clusterId = this._clusterId;
    }
    if (this._dataType !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataType = this._dataType;
    }
    if (this._databaseName !== undefined) {
      hasAnyValues = true;
      internalValueResult.databaseName = this._databaseName;
    }
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._queueName !== undefined) {
      hasAnyValues = true;
      internalValueResult.queueName = this._queueName;
    }
    if (this._tableName !== undefined) {
      hasAnyValues = true;
      internalValueResult.tableName = this._tableName;
    }
    if (this._userName !== undefined) {
      hasAnyValues = true;
      internalValueResult.userName = this._userName;
    }
    if (this._withColumnHeader !== undefined) {
      hasAnyValues = true;
      internalValueResult.withColumnHeader = this._withColumnHeader;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsDatasetDataSource | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._clusterId = undefined;
      this._dataType = undefined;
      this._databaseName = undefined;
      this._password = undefined;
      this._path = undefined;
      this._queueName = undefined;
      this._tableName = undefined;
      this._userName = undefined;
      this._withColumnHeader = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._clusterId = value.clusterId;
      this._dataType = value.dataType;
      this._databaseName = value.databaseName;
      this._password = value.password;
      this._path = value.path;
      this._queueName = value.queueName;
      this._tableName = value.tableName;
      this._userName = value.userName;
      this._withColumnHeader = value.withColumnHeader;
    }
  }

  // cluster_id - computed: false, optional: true, required: false
  private _clusterId?: string; 
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }
  public set clusterId(value: string) {
    this._clusterId = value;
  }
  public resetClusterId() {
    this._clusterId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterIdInput() {
    return this._clusterId;
  }

  // data_type - computed: false, optional: true, required: false
  private _dataType?: number; 
  public get dataType() {
    return this.getNumberAttribute('data_type');
  }
  public set dataType(value: number) {
    this._dataType = value;
  }
  public resetDataType() {
    this._dataType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataTypeInput() {
    return this._dataType;
  }

  // database_name - computed: false, optional: true, required: false
  private _databaseName?: string; 
  public get databaseName() {
    return this.getStringAttribute('database_name');
  }
  public set databaseName(value: string) {
    this._databaseName = value;
  }
  public resetDatabaseName() {
    this._databaseName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get databaseNameInput() {
    return this._databaseName;
  }

  // password - computed: false, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // path - computed: false, optional: true, required: false
  private _path?: string; 
  public get path() {
    return this.getStringAttribute('path');
  }
  public set path(value: string) {
    this._path = value;
  }
  public resetPath() {
    this._path = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pathInput() {
    return this._path;
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

  // table_name - computed: false, optional: true, required: false
  private _tableName?: string; 
  public get tableName() {
    return this.getStringAttribute('table_name');
  }
  public set tableName(value: string) {
    this._tableName = value;
  }
  public resetTableName() {
    this._tableName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tableNameInput() {
    return this._tableName;
  }

  // user_name - computed: false, optional: true, required: false
  private _userName?: string; 
  public get userName() {
    return this.getStringAttribute('user_name');
  }
  public set userName(value: string) {
    this._userName = value;
  }
  public resetUserName() {
    this._userName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userNameInput() {
    return this._userName;
  }

  // with_column_header - computed: false, optional: true, required: false
  private _withColumnHeader?: boolean | cdktf.IResolvable; 
  public get withColumnHeader() {
    return this.getBooleanAttribute('with_column_header');
  }
  public set withColumnHeader(value: boolean | cdktf.IResolvable) {
    this._withColumnHeader = value;
  }
  public resetWithColumnHeader() {
    this._withColumnHeader = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get withColumnHeaderInput() {
    return this._withColumnHeader;
  }
}
export interface ModelartsDatasetLabelFormat {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#label_separator ModelartsDataset#label_separator}
  */
  readonly labelSeparator?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#text_label_separator ModelartsDataset#text_label_separator}
  */
  readonly textLabelSeparator?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#type ModelartsDataset#type}
  */
  readonly type?: string;
}

export function modelartsDatasetLabelFormatToTerraform(struct?: ModelartsDatasetLabelFormatOutputReference | ModelartsDatasetLabelFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    label_separator: cdktf.stringToTerraform(struct!.labelSeparator),
    text_label_separator: cdktf.stringToTerraform(struct!.textLabelSeparator),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function modelartsDatasetLabelFormatToHclTerraform(struct?: ModelartsDatasetLabelFormatOutputReference | ModelartsDatasetLabelFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    label_separator: {
      value: cdktf.stringToHclTerraform(struct!.labelSeparator),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    text_label_separator: {
      value: cdktf.stringToHclTerraform(struct!.textLabelSeparator),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsDatasetLabelFormatOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ModelartsDatasetLabelFormat | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._labelSeparator !== undefined) {
      hasAnyValues = true;
      internalValueResult.labelSeparator = this._labelSeparator;
    }
    if (this._textLabelSeparator !== undefined) {
      hasAnyValues = true;
      internalValueResult.textLabelSeparator = this._textLabelSeparator;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsDatasetLabelFormat | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._labelSeparator = undefined;
      this._textLabelSeparator = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._labelSeparator = value.labelSeparator;
      this._textLabelSeparator = value.textLabelSeparator;
      this._type = value.type;
    }
  }

  // label_separator - computed: false, optional: true, required: false
  private _labelSeparator?: string; 
  public get labelSeparator() {
    return this.getStringAttribute('label_separator');
  }
  public set labelSeparator(value: string) {
    this._labelSeparator = value;
  }
  public resetLabelSeparator() {
    this._labelSeparator = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get labelSeparatorInput() {
    return this._labelSeparator;
  }

  // text_label_separator - computed: false, optional: true, required: false
  private _textLabelSeparator?: string; 
  public get textLabelSeparator() {
    return this.getStringAttribute('text_label_separator');
  }
  public set textLabelSeparator(value: string) {
    this._textLabelSeparator = value;
  }
  public resetTextLabelSeparator() {
    this._textLabelSeparator = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get textLabelSeparatorInput() {
    return this._textLabelSeparator;
  }

  // type - computed: false, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface ModelartsDatasetLabels {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#name ModelartsDataset#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#property_color ModelartsDataset#property_color}
  */
  readonly propertyColor?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#property_shape ModelartsDataset#property_shape}
  */
  readonly propertyShape?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#property_shortcut ModelartsDataset#property_shortcut}
  */
  readonly propertyShortcut?: string;
}

export function modelartsDatasetLabelsToTerraform(struct?: ModelartsDatasetLabels | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    property_color: cdktf.stringToTerraform(struct!.propertyColor),
    property_shape: cdktf.stringToTerraform(struct!.propertyShape),
    property_shortcut: cdktf.stringToTerraform(struct!.propertyShortcut),
  }
}


export function modelartsDatasetLabelsToHclTerraform(struct?: ModelartsDatasetLabels | cdktf.IResolvable): any {
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
    property_color: {
      value: cdktf.stringToHclTerraform(struct!.propertyColor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    property_shape: {
      value: cdktf.stringToHclTerraform(struct!.propertyShape),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    property_shortcut: {
      value: cdktf.stringToHclTerraform(struct!.propertyShortcut),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsDatasetLabelsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ModelartsDatasetLabels | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._propertyColor !== undefined) {
      hasAnyValues = true;
      internalValueResult.propertyColor = this._propertyColor;
    }
    if (this._propertyShape !== undefined) {
      hasAnyValues = true;
      internalValueResult.propertyShape = this._propertyShape;
    }
    if (this._propertyShortcut !== undefined) {
      hasAnyValues = true;
      internalValueResult.propertyShortcut = this._propertyShortcut;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsDatasetLabels | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._propertyColor = undefined;
      this._propertyShape = undefined;
      this._propertyShortcut = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._propertyColor = value.propertyColor;
      this._propertyShape = value.propertyShape;
      this._propertyShortcut = value.propertyShortcut;
    }
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

  // property_color - computed: true, optional: true, required: false
  private _propertyColor?: string; 
  public get propertyColor() {
    return this.getStringAttribute('property_color');
  }
  public set propertyColor(value: string) {
    this._propertyColor = value;
  }
  public resetPropertyColor() {
    this._propertyColor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get propertyColorInput() {
    return this._propertyColor;
  }

  // property_shape - computed: true, optional: true, required: false
  private _propertyShape?: string; 
  public get propertyShape() {
    return this.getStringAttribute('property_shape');
  }
  public set propertyShape(value: string) {
    this._propertyShape = value;
  }
  public resetPropertyShape() {
    this._propertyShape = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get propertyShapeInput() {
    return this._propertyShape;
  }

  // property_shortcut - computed: true, optional: true, required: false
  private _propertyShortcut?: string; 
  public get propertyShortcut() {
    return this.getStringAttribute('property_shortcut');
  }
  public set propertyShortcut(value: string) {
    this._propertyShortcut = value;
  }
  public resetPropertyShortcut() {
    this._propertyShortcut = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get propertyShortcutInput() {
    return this._propertyShortcut;
  }
}

export class ModelartsDatasetLabelsList extends cdktf.ComplexList {
  public internalValue? : ModelartsDatasetLabels[] | cdktf.IResolvable

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
  public get(index: number): ModelartsDatasetLabelsOutputReference {
    return new ModelartsDatasetLabelsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ModelartsDatasetSchemas {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#name ModelartsDataset#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#type ModelartsDataset#type}
  */
  readonly type: string;
}

export function modelartsDatasetSchemasToTerraform(struct?: ModelartsDatasetSchemas | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function modelartsDatasetSchemasToHclTerraform(struct?: ModelartsDatasetSchemas | cdktf.IResolvable): any {
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
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsDatasetSchemasOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ModelartsDatasetSchemas | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsDatasetSchemas | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._type = value.type;
    }
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

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}

export class ModelartsDatasetSchemasList extends cdktf.ComplexList {
  public internalValue? : ModelartsDatasetSchemas[] | cdktf.IResolvable

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
  public get(index: number): ModelartsDatasetSchemasOutputReference {
    return new ModelartsDatasetSchemasOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ModelartsDatasetTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#create ModelartsDataset#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#delete ModelartsDataset#delete}
  */
  readonly delete?: string;
}

export function modelartsDatasetTimeoutsToTerraform(struct?: ModelartsDatasetTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function modelartsDatasetTimeoutsToHclTerraform(struct?: ModelartsDatasetTimeouts | cdktf.IResolvable): any {
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

export class ModelartsDatasetTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): ModelartsDatasetTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: ModelartsDatasetTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset huaweicloud_modelarts_dataset}
*/
export class ModelartsDataset extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_modelarts_dataset";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ModelartsDataset resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ModelartsDataset to import
  * @param importFromId The id of the existing ModelartsDataset that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ModelartsDataset to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_modelarts_dataset", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_dataset huaweicloud_modelarts_dataset} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ModelartsDatasetConfig
  */
  public constructor(scope: Construct, id: string, config: ModelartsDatasetConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_modelarts_dataset',
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
    this._description = config.description;
    this._id = config.id;
    this._importLabeledEnabled = config.importLabeledEnabled;
    this._name = config.name;
    this._outputPath = config.outputPath;
    this._region = config.region;
    this._type = config.type;
    this._dataSource.internalValue = config.dataSource;
    this._labelFormat.internalValue = config.labelFormat;
    this._labels.internalValue = config.labels;
    this._schemas.internalValue = config.schemas;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // data_format - computed: true, optional: false, required: false
  public get dataFormat() {
    return this.getStringAttribute('data_format');
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

  // import_labeled_enabled - computed: false, optional: true, required: false
  private _importLabeledEnabled?: boolean | cdktf.IResolvable; 
  public get importLabeledEnabled() {
    return this.getBooleanAttribute('import_labeled_enabled');
  }
  public set importLabeledEnabled(value: boolean | cdktf.IResolvable) {
    this._importLabeledEnabled = value;
  }
  public resetImportLabeledEnabled() {
    this._importLabeledEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get importLabeledEnabledInput() {
    return this._importLabeledEnabled;
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

  // output_path - computed: false, optional: false, required: true
  private _outputPath?: string; 
  public get outputPath() {
    return this.getStringAttribute('output_path');
  }
  public set outputPath(value: string) {
    this._outputPath = value;
  }
  // Temporarily expose input value. Use with caution.
  public get outputPathInput() {
    return this._outputPath;
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getNumberAttribute('status');
  }

  // type - computed: false, optional: false, required: true
  private _type?: number; 
  public get type() {
    return this.getNumberAttribute('type');
  }
  public set type(value: number) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // data_source - computed: false, optional: false, required: true
  private _dataSource = new ModelartsDatasetDataSourceOutputReference(this, "data_source");
  public get dataSource() {
    return this._dataSource;
  }
  public putDataSource(value: ModelartsDatasetDataSource) {
    this._dataSource.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataSourceInput() {
    return this._dataSource.internalValue;
  }

  // label_format - computed: false, optional: true, required: false
  private _labelFormat = new ModelartsDatasetLabelFormatOutputReference(this, "label_format");
  public get labelFormat() {
    return this._labelFormat;
  }
  public putLabelFormat(value: ModelartsDatasetLabelFormat) {
    this._labelFormat.internalValue = value;
  }
  public resetLabelFormat() {
    this._labelFormat.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get labelFormatInput() {
    return this._labelFormat.internalValue;
  }

  // labels - computed: false, optional: true, required: false
  private _labels = new ModelartsDatasetLabelsList(this, "labels", false);
  public get labels() {
    return this._labels;
  }
  public putLabels(value: ModelartsDatasetLabels[] | cdktf.IResolvable) {
    this._labels.internalValue = value;
  }
  public resetLabels() {
    this._labels.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get labelsInput() {
    return this._labels.internalValue;
  }

  // schemas - computed: false, optional: true, required: false
  private _schemas = new ModelartsDatasetSchemasList(this, "schemas", false);
  public get schemas() {
    return this._schemas;
  }
  public putSchemas(value: ModelartsDatasetSchemas[] | cdktf.IResolvable) {
    this._schemas.internalValue = value;
  }
  public resetSchemas() {
    this._schemas.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schemasInput() {
    return this._schemas.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new ModelartsDatasetTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: ModelartsDatasetTimeouts) {
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
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      import_labeled_enabled: cdktf.booleanToTerraform(this._importLabeledEnabled),
      name: cdktf.stringToTerraform(this._name),
      output_path: cdktf.stringToTerraform(this._outputPath),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.numberToTerraform(this._type),
      data_source: modelartsDatasetDataSourceToTerraform(this._dataSource.internalValue),
      label_format: modelartsDatasetLabelFormatToTerraform(this._labelFormat.internalValue),
      labels: cdktf.listMapper(modelartsDatasetLabelsToTerraform, true)(this._labels.internalValue),
      schemas: cdktf.listMapper(modelartsDatasetSchemasToTerraform, true)(this._schemas.internalValue),
      timeouts: modelartsDatasetTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      description: {
        value: cdktf.stringToHclTerraform(this._description),
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
      import_labeled_enabled: {
        value: cdktf.booleanToHclTerraform(this._importLabeledEnabled),
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
      output_path: {
        value: cdktf.stringToHclTerraform(this._outputPath),
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
      type: {
        value: cdktf.numberToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      data_source: {
        value: modelartsDatasetDataSourceToHclTerraform(this._dataSource.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ModelartsDatasetDataSourceList",
      },
      label_format: {
        value: modelartsDatasetLabelFormatToHclTerraform(this._labelFormat.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ModelartsDatasetLabelFormatList",
      },
      labels: {
        value: cdktf.listMapperHcl(modelartsDatasetLabelsToHclTerraform, true)(this._labels.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ModelartsDatasetLabelsList",
      },
      schemas: {
        value: cdktf.listMapperHcl(modelartsDatasetSchemasToHclTerraform, true)(this._schemas.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ModelartsDatasetSchemasList",
      },
      timeouts: {
        value: modelartsDatasetTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "ModelartsDatasetTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

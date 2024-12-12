// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SecmasterIndicatorConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the confidence of the indicator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#confidence SecmasterIndicator#confidence}
  */
  readonly confidence: number;
  /**
  * Specifies the first occurrence time of the indicator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#first_occurrence_time SecmasterIndicator#first_occurrence_time}
  */
  readonly firstOccurrenceTime: string;
  /**
  * Specifies the granularity of the indicator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#granularity SecmasterIndicator#granularity}
  */
  readonly granularity: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#id SecmasterIndicator#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies whether the indicator is invalid.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#invalid SecmasterIndicator#invalid}
  */
  readonly invalid?: boolean | cdktf.IResolvable;
  /**
  * Specifies the labels of the indicator in comma-separated string.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#labels SecmasterIndicator#labels}
  */
  readonly labels?: string;
  /**
  * Specifies the last occurrence time of the indicator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#last_occurrence_time SecmasterIndicator#last_occurrence_time}
  */
  readonly lastOccurrenceTime: string;
  /**
  * Specifies the indicator name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#name SecmasterIndicator#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#region SecmasterIndicator#region}
  */
  readonly region?: string;
  /**
  * Specifies the indicator status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#status SecmasterIndicator#status}
  */
  readonly status: string;
  /**
  * Specifies the indicator type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#threat_degree SecmasterIndicator#threat_degree}
  */
  readonly threatDegree: string;
  /**
  * Specifies the value of the indicator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#value SecmasterIndicator#value}
  */
  readonly value: string;
  /**
  * Specifies the ID of the workspace to which the indicator belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#workspace_id SecmasterIndicator#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * data_source block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#data_source SecmasterIndicator#data_source}
  */
  readonly dataSource: SecmasterIndicatorDataSource;
  /**
  * type block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#type SecmasterIndicator#type}
  */
  readonly type: SecmasterIndicatorType;
}
export interface SecmasterIndicatorDataSource {
  /**
  * Specifies the product feature.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#product_feature SecmasterIndicator#product_feature}
  */
  readonly productFeature: string;
  /**
  * Specifies the product name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#product_name SecmasterIndicator#product_name}
  */
  readonly productName: string;
  /**
  * Specifies the data source type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#source_type SecmasterIndicator#source_type}
  */
  readonly sourceType: number;
}

export function secmasterIndicatorDataSourceToTerraform(struct?: SecmasterIndicatorDataSourceOutputReference | SecmasterIndicatorDataSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    product_feature: cdktf.stringToTerraform(struct!.productFeature),
    product_name: cdktf.stringToTerraform(struct!.productName),
    source_type: cdktf.numberToTerraform(struct!.sourceType),
  }
}


export function secmasterIndicatorDataSourceToHclTerraform(struct?: SecmasterIndicatorDataSourceOutputReference | SecmasterIndicatorDataSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    product_feature: {
      value: cdktf.stringToHclTerraform(struct!.productFeature),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    product_name: {
      value: cdktf.stringToHclTerraform(struct!.productName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_type: {
      value: cdktf.numberToHclTerraform(struct!.sourceType),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class SecmasterIndicatorDataSourceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): SecmasterIndicatorDataSource | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._productFeature !== undefined) {
      hasAnyValues = true;
      internalValueResult.productFeature = this._productFeature;
    }
    if (this._productName !== undefined) {
      hasAnyValues = true;
      internalValueResult.productName = this._productName;
    }
    if (this._sourceType !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceType = this._sourceType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SecmasterIndicatorDataSource | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._productFeature = undefined;
      this._productName = undefined;
      this._sourceType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._productFeature = value.productFeature;
      this._productName = value.productName;
      this._sourceType = value.sourceType;
    }
  }

  // product_feature - computed: false, optional: false, required: true
  private _productFeature?: string; 
  public get productFeature() {
    return this.getStringAttribute('product_feature');
  }
  public set productFeature(value: string) {
    this._productFeature = value;
  }
  // Temporarily expose input value. Use with caution.
  public get productFeatureInput() {
    return this._productFeature;
  }

  // product_name - computed: false, optional: false, required: true
  private _productName?: string; 
  public get productName() {
    return this.getStringAttribute('product_name');
  }
  public set productName(value: string) {
    this._productName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get productNameInput() {
    return this._productName;
  }

  // source_type - computed: false, optional: false, required: true
  private _sourceType?: number; 
  public get sourceType() {
    return this.getNumberAttribute('source_type');
  }
  public set sourceType(value: number) {
    this._sourceType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTypeInput() {
    return this._sourceType;
  }
}
export interface SecmasterIndicatorType {
  /**
  * Specifies the category.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#category SecmasterIndicator#category}
  */
  readonly category: string;
  /**
  * Specifies the indicator type ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#id SecmasterIndicator#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id: string;
  /**
  * Specifies the indicator type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#indicator_type SecmasterIndicator#indicator_type}
  */
  readonly indicatorType: string;
}

export function secmasterIndicatorTypeToTerraform(struct?: SecmasterIndicatorTypeOutputReference | SecmasterIndicatorType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    category: cdktf.stringToTerraform(struct!.category),
    id: cdktf.stringToTerraform(struct!.id),
    indicator_type: cdktf.stringToTerraform(struct!.indicatorType),
  }
}


export function secmasterIndicatorTypeToHclTerraform(struct?: SecmasterIndicatorTypeOutputReference | SecmasterIndicatorType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    category: {
      value: cdktf.stringToHclTerraform(struct!.category),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    indicator_type: {
      value: cdktf.stringToHclTerraform(struct!.indicatorType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class SecmasterIndicatorTypeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): SecmasterIndicatorType | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._category !== undefined) {
      hasAnyValues = true;
      internalValueResult.category = this._category;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._indicatorType !== undefined) {
      hasAnyValues = true;
      internalValueResult.indicatorType = this._indicatorType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SecmasterIndicatorType | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._category = undefined;
      this._id = undefined;
      this._indicatorType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._category = value.category;
      this._id = value.id;
      this._indicatorType = value.indicatorType;
    }
  }

  // category - computed: false, optional: false, required: true
  private _category?: string; 
  public get category() {
    return this.getStringAttribute('category');
  }
  public set category(value: string) {
    this._category = value;
  }
  // Temporarily expose input value. Use with caution.
  public get categoryInput() {
    return this._category;
  }

  // id - computed: false, optional: false, required: true
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // indicator_type - computed: false, optional: false, required: true
  private _indicatorType?: string; 
  public get indicatorType() {
    return this.getStringAttribute('indicator_type');
  }
  public set indicatorType(value: string) {
    this._indicatorType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get indicatorTypeInput() {
    return this._indicatorType;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator huaweicloud_secmaster_indicator}
*/
export class SecmasterIndicator extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_indicator";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SecmasterIndicator resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SecmasterIndicator to import
  * @param importFromId The id of the existing SecmasterIndicator that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SecmasterIndicator to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_indicator", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_indicator huaweicloud_secmaster_indicator} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SecmasterIndicatorConfig
  */
  public constructor(scope: Construct, id: string, config: SecmasterIndicatorConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_indicator',
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
    this._confidence = config.confidence;
    this._firstOccurrenceTime = config.firstOccurrenceTime;
    this._granularity = config.granularity;
    this._id = config.id;
    this._invalid = config.invalid;
    this._labels = config.labels;
    this._lastOccurrenceTime = config.lastOccurrenceTime;
    this._name = config.name;
    this._region = config.region;
    this._status = config.status;
    this._threatDegree = config.threatDegree;
    this._value = config.value;
    this._workspaceId = config.workspaceId;
    this._dataSource.internalValue = config.dataSource;
    this._type.internalValue = config.type;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // confidence - computed: false, optional: false, required: true
  private _confidence?: number; 
  public get confidence() {
    return this.getNumberAttribute('confidence');
  }
  public set confidence(value: number) {
    this._confidence = value;
  }
  // Temporarily expose input value. Use with caution.
  public get confidenceInput() {
    return this._confidence;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // first_occurrence_time - computed: false, optional: false, required: true
  private _firstOccurrenceTime?: string; 
  public get firstOccurrenceTime() {
    return this.getStringAttribute('first_occurrence_time');
  }
  public set firstOccurrenceTime(value: string) {
    this._firstOccurrenceTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get firstOccurrenceTimeInput() {
    return this._firstOccurrenceTime;
  }

  // granularity - computed: false, optional: false, required: true
  private _granularity?: number; 
  public get granularity() {
    return this.getNumberAttribute('granularity');
  }
  public set granularity(value: number) {
    this._granularity = value;
  }
  // Temporarily expose input value. Use with caution.
  public get granularityInput() {
    return this._granularity;
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

  // invalid - computed: false, optional: true, required: false
  private _invalid?: boolean | cdktf.IResolvable; 
  public get invalid() {
    return this.getBooleanAttribute('invalid');
  }
  public set invalid(value: boolean | cdktf.IResolvable) {
    this._invalid = value;
  }
  public resetInvalid() {
    this._invalid = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get invalidInput() {
    return this._invalid;
  }

  // labels - computed: true, optional: true, required: false
  private _labels?: string; 
  public get labels() {
    return this.getStringAttribute('labels');
  }
  public set labels(value: string) {
    this._labels = value;
  }
  public resetLabels() {
    this._labels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get labelsInput() {
    return this._labels;
  }

  // last_occurrence_time - computed: false, optional: false, required: true
  private _lastOccurrenceTime?: string; 
  public get lastOccurrenceTime() {
    return this.getStringAttribute('last_occurrence_time');
  }
  public set lastOccurrenceTime(value: string) {
    this._lastOccurrenceTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get lastOccurrenceTimeInput() {
    return this._lastOccurrenceTime;
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

  // status - computed: false, optional: false, required: true
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // threat_degree - computed: false, optional: false, required: true
  private _threatDegree?: string; 
  public get threatDegree() {
    return this.getStringAttribute('threat_degree');
  }
  public set threatDegree(value: string) {
    this._threatDegree = value;
  }
  // Temporarily expose input value. Use with caution.
  public get threatDegreeInput() {
    return this._threatDegree;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
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

  // data_source - computed: false, optional: false, required: true
  private _dataSource = new SecmasterIndicatorDataSourceOutputReference(this, "data_source");
  public get dataSource() {
    return this._dataSource;
  }
  public putDataSource(value: SecmasterIndicatorDataSource) {
    this._dataSource.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataSourceInput() {
    return this._dataSource.internalValue;
  }

  // type - computed: false, optional: false, required: true
  private _type = new SecmasterIndicatorTypeOutputReference(this, "type");
  public get type() {
    return this._type;
  }
  public putType(value: SecmasterIndicatorType) {
    this._type.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      confidence: cdktf.numberToTerraform(this._confidence),
      first_occurrence_time: cdktf.stringToTerraform(this._firstOccurrenceTime),
      granularity: cdktf.numberToTerraform(this._granularity),
      id: cdktf.stringToTerraform(this._id),
      invalid: cdktf.booleanToTerraform(this._invalid),
      labels: cdktf.stringToTerraform(this._labels),
      last_occurrence_time: cdktf.stringToTerraform(this._lastOccurrenceTime),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      status: cdktf.stringToTerraform(this._status),
      threat_degree: cdktf.stringToTerraform(this._threatDegree),
      value: cdktf.stringToTerraform(this._value),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      data_source: secmasterIndicatorDataSourceToTerraform(this._dataSource.internalValue),
      type: secmasterIndicatorTypeToTerraform(this._type.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      confidence: {
        value: cdktf.numberToHclTerraform(this._confidence),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      first_occurrence_time: {
        value: cdktf.stringToHclTerraform(this._firstOccurrenceTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      granularity: {
        value: cdktf.numberToHclTerraform(this._granularity),
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
      invalid: {
        value: cdktf.booleanToHclTerraform(this._invalid),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      labels: {
        value: cdktf.stringToHclTerraform(this._labels),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      last_occurrence_time: {
        value: cdktf.stringToHclTerraform(this._lastOccurrenceTime),
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
      threat_degree: {
        value: cdktf.stringToHclTerraform(this._threatDegree),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      value: {
        value: cdktf.stringToHclTerraform(this._value),
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
      data_source: {
        value: secmasterIndicatorDataSourceToHclTerraform(this._dataSource.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "SecmasterIndicatorDataSourceList",
      },
      type: {
        value: secmasterIndicatorTypeToHclTerraform(this._type.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "SecmasterIndicatorTypeList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

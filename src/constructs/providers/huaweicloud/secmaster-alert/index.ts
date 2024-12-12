// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SecmasterAlertConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the close comment.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#close_comment SecmasterAlert#close_comment}
  */
  readonly closeComment?: string;
  /**
  * Specifies the close reason.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#close_reason SecmasterAlert#close_reason}
  */
  readonly closeReason?: string;
  /**
  * Specifies whether it's debugging data.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#debugging_data SecmasterAlert#debugging_data}
  */
  readonly debuggingData?: boolean | cdktf.IResolvable;
  /**
  * Specifies the description of the alert.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#description SecmasterAlert#description}
  */
  readonly description: string;
  /**
  * Specifies the first occurrence time of the indicator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#first_occurrence_time SecmasterAlert#first_occurrence_time}
  */
  readonly firstOccurrenceTime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#id SecmasterAlert#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the labels of the alert in comma-separated string.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#labels SecmasterAlert#labels}
  */
  readonly labels?: string;
  /**
  * Specifies the last occurrence time of the indicator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#last_occurrence_time SecmasterAlert#last_occurrence_time}
  */
  readonly lastOccurrenceTime?: string;
  /**
  * Specifies the alert name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#name SecmasterAlert#name}
  */
  readonly name: string;
  /**
  * Specifies the owner name of the alert.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#owner SecmasterAlert#owner}
  */
  readonly owner?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#region SecmasterAlert#region}
  */
  readonly region?: string;
  /**
  * Specifies the alert severity.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#severity SecmasterAlert#severity}
  */
  readonly severity: string;
  /**
  * Specifies the alert stage.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#stage SecmasterAlert#stage}
  */
  readonly stage: string;
  /**
  * Specifies the alert status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#status SecmasterAlert#status}
  */
  readonly status: string;
  /**
  * Specifies the alert verification status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#verification_status SecmasterAlert#verification_status}
  */
  readonly verificationStatus: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#workspace_id SecmasterAlert#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * data_source block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#data_source SecmasterAlert#data_source}
  */
  readonly dataSource: SecmasterAlertDataSource;
  /**
  * type block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#type SecmasterAlert#type}
  */
  readonly type: SecmasterAlertType;
}
export interface SecmasterAlertDataSource {
  /**
  * Specifies the product feature.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#product_feature SecmasterAlert#product_feature}
  */
  readonly productFeature: string;
  /**
  * Specifies the product name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#product_name SecmasterAlert#product_name}
  */
  readonly productName: string;
  /**
  * Specifies the source type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#source_type SecmasterAlert#source_type}
  */
  readonly sourceType: number;
}

export function secmasterAlertDataSourceToTerraform(struct?: SecmasterAlertDataSourceOutputReference | SecmasterAlertDataSource): any {
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


export function secmasterAlertDataSourceToHclTerraform(struct?: SecmasterAlertDataSourceOutputReference | SecmasterAlertDataSource): any {
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

export class SecmasterAlertDataSourceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): SecmasterAlertDataSource | undefined {
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

  public set internalValue(value: SecmasterAlertDataSource | undefined) {
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
export interface SecmasterAlertType {
  /**
  * Specifies the alert type
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#alert_type SecmasterAlert#alert_type}
  */
  readonly alertType: string;
  /**
  * Specifies the category.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#category SecmasterAlert#category}
  */
  readonly category: string;
}

export function secmasterAlertTypeToTerraform(struct?: SecmasterAlertTypeOutputReference | SecmasterAlertType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    alert_type: cdktf.stringToTerraform(struct!.alertType),
    category: cdktf.stringToTerraform(struct!.category),
  }
}


export function secmasterAlertTypeToHclTerraform(struct?: SecmasterAlertTypeOutputReference | SecmasterAlertType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    alert_type: {
      value: cdktf.stringToHclTerraform(struct!.alertType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    category: {
      value: cdktf.stringToHclTerraform(struct!.category),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class SecmasterAlertTypeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): SecmasterAlertType | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._alertType !== undefined) {
      hasAnyValues = true;
      internalValueResult.alertType = this._alertType;
    }
    if (this._category !== undefined) {
      hasAnyValues = true;
      internalValueResult.category = this._category;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SecmasterAlertType | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._alertType = undefined;
      this._category = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._alertType = value.alertType;
      this._category = value.category;
    }
  }

  // alert_type - computed: false, optional: false, required: true
  private _alertType?: string; 
  public get alertType() {
    return this.getStringAttribute('alert_type');
  }
  public set alertType(value: string) {
    this._alertType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get alertTypeInput() {
    return this._alertType;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert huaweicloud_secmaster_alert}
*/
export class SecmasterAlert extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_alert";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SecmasterAlert resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SecmasterAlert to import
  * @param importFromId The id of the existing SecmasterAlert that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SecmasterAlert to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_alert", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert huaweicloud_secmaster_alert} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SecmasterAlertConfig
  */
  public constructor(scope: Construct, id: string, config: SecmasterAlertConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_alert',
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
    this._closeComment = config.closeComment;
    this._closeReason = config.closeReason;
    this._debuggingData = config.debuggingData;
    this._description = config.description;
    this._firstOccurrenceTime = config.firstOccurrenceTime;
    this._id = config.id;
    this._labels = config.labels;
    this._lastOccurrenceTime = config.lastOccurrenceTime;
    this._name = config.name;
    this._owner = config.owner;
    this._region = config.region;
    this._severity = config.severity;
    this._stage = config.stage;
    this._status = config.status;
    this._verificationStatus = config.verificationStatus;
    this._workspaceId = config.workspaceId;
    this._dataSource.internalValue = config.dataSource;
    this._type.internalValue = config.type;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // close_comment - computed: true, optional: true, required: false
  private _closeComment?: string; 
  public get closeComment() {
    return this.getStringAttribute('close_comment');
  }
  public set closeComment(value: string) {
    this._closeComment = value;
  }
  public resetCloseComment() {
    this._closeComment = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get closeCommentInput() {
    return this._closeComment;
  }

  // close_reason - computed: true, optional: true, required: false
  private _closeReason?: string; 
  public get closeReason() {
    return this.getStringAttribute('close_reason');
  }
  public set closeReason(value: string) {
    this._closeReason = value;
  }
  public resetCloseReason() {
    this._closeReason = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get closeReasonInput() {
    return this._closeReason;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // debugging_data - computed: true, optional: true, required: false
  private _debuggingData?: boolean | cdktf.IResolvable; 
  public get debuggingData() {
    return this.getBooleanAttribute('debugging_data');
  }
  public set debuggingData(value: boolean | cdktf.IResolvable) {
    this._debuggingData = value;
  }
  public resetDebuggingData() {
    this._debuggingData = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get debuggingDataInput() {
    return this._debuggingData;
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

  // last_occurrence_time - computed: true, optional: true, required: false
  private _lastOccurrenceTime?: string; 
  public get lastOccurrenceTime() {
    return this.getStringAttribute('last_occurrence_time');
  }
  public set lastOccurrenceTime(value: string) {
    this._lastOccurrenceTime = value;
  }
  public resetLastOccurrenceTime() {
    this._lastOccurrenceTime = undefined;
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

  // owner - computed: true, optional: true, required: false
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

  // severity - computed: false, optional: false, required: true
  private _severity?: string; 
  public get severity() {
    return this.getStringAttribute('severity');
  }
  public set severity(value: string) {
    this._severity = value;
  }
  // Temporarily expose input value. Use with caution.
  public get severityInput() {
    return this._severity;
  }

  // stage - computed: false, optional: false, required: true
  private _stage?: string; 
  public get stage() {
    return this.getStringAttribute('stage');
  }
  public set stage(value: string) {
    this._stage = value;
  }
  // Temporarily expose input value. Use with caution.
  public get stageInput() {
    return this._stage;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // verification_status - computed: false, optional: false, required: true
  private _verificationStatus?: string; 
  public get verificationStatus() {
    return this.getStringAttribute('verification_status');
  }
  public set verificationStatus(value: string) {
    this._verificationStatus = value;
  }
  // Temporarily expose input value. Use with caution.
  public get verificationStatusInput() {
    return this._verificationStatus;
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
  private _dataSource = new SecmasterAlertDataSourceOutputReference(this, "data_source");
  public get dataSource() {
    return this._dataSource;
  }
  public putDataSource(value: SecmasterAlertDataSource) {
    this._dataSource.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataSourceInput() {
    return this._dataSource.internalValue;
  }

  // type - computed: false, optional: false, required: true
  private _type = new SecmasterAlertTypeOutputReference(this, "type");
  public get type() {
    return this._type;
  }
  public putType(value: SecmasterAlertType) {
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
      close_comment: cdktf.stringToTerraform(this._closeComment),
      close_reason: cdktf.stringToTerraform(this._closeReason),
      debugging_data: cdktf.booleanToTerraform(this._debuggingData),
      description: cdktf.stringToTerraform(this._description),
      first_occurrence_time: cdktf.stringToTerraform(this._firstOccurrenceTime),
      id: cdktf.stringToTerraform(this._id),
      labels: cdktf.stringToTerraform(this._labels),
      last_occurrence_time: cdktf.stringToTerraform(this._lastOccurrenceTime),
      name: cdktf.stringToTerraform(this._name),
      owner: cdktf.stringToTerraform(this._owner),
      region: cdktf.stringToTerraform(this._region),
      severity: cdktf.stringToTerraform(this._severity),
      stage: cdktf.stringToTerraform(this._stage),
      status: cdktf.stringToTerraform(this._status),
      verification_status: cdktf.stringToTerraform(this._verificationStatus),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      data_source: secmasterAlertDataSourceToTerraform(this._dataSource.internalValue),
      type: secmasterAlertTypeToTerraform(this._type.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      close_comment: {
        value: cdktf.stringToHclTerraform(this._closeComment),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      close_reason: {
        value: cdktf.stringToHclTerraform(this._closeReason),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      debugging_data: {
        value: cdktf.booleanToHclTerraform(this._debuggingData),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      first_occurrence_time: {
        value: cdktf.stringToHclTerraform(this._firstOccurrenceTime),
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
      owner: {
        value: cdktf.stringToHclTerraform(this._owner),
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
      severity: {
        value: cdktf.stringToHclTerraform(this._severity),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      stage: {
        value: cdktf.stringToHclTerraform(this._stage),
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
      verification_status: {
        value: cdktf.stringToHclTerraform(this._verificationStatus),
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
        value: secmasterAlertDataSourceToHclTerraform(this._dataSource.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "SecmasterAlertDataSourceList",
      },
      type: {
        value: secmasterAlertTypeToHclTerraform(this._type.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "SecmasterAlertTypeList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

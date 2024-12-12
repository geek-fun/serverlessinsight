// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SecmasterIncidentConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the close comment.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#close_comment SecmasterIncident#close_comment}
  */
  readonly closeComment?: string;
  /**
  * Specifies the close reason.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#close_reason SecmasterIncident#close_reason}
  */
  readonly closeReason?: string;
  /**
  * Specifies whether it's debugging data.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#debugging_data SecmasterIncident#debugging_data}
  */
  readonly debuggingData?: boolean | cdktf.IResolvable;
  /**
  * Specifies the incident description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#description SecmasterIncident#description}
  */
  readonly description: string;
  /**
  * Specifies the first occurrence time of the incident.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#first_occurrence_time SecmasterIncident#first_occurrence_time}
  */
  readonly firstOccurrenceTime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#id SecmasterIncident#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the labels.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#labels SecmasterIncident#labels}
  */
  readonly labels?: string;
  /**
  * Specifies the last occurrence time of the incident.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#last_occurrence_time SecmasterIncident#last_occurrence_time}
  */
  readonly lastOccurrenceTime?: string;
  /**
  * Specifies the incident level.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#level SecmasterIncident#level}
  */
  readonly level: string;
  /**
  * Specifies the incident name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#name SecmasterIncident#name}
  */
  readonly name: string;
  /**
  * Specifies the user name of the owner.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#owner SecmasterIncident#owner}
  */
  readonly owner?: string;
  /**
  * Specifies the planned closure time of the incident.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#planned_closure_time SecmasterIncident#planned_closure_time}
  */
  readonly plannedClosureTime?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#region SecmasterIncident#region}
  */
  readonly region?: string;
  /**
  * Specifies the stage of the incident.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#stage SecmasterIncident#stage}
  */
  readonly stage?: string;
  /**
  * Specifies the incident status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#status SecmasterIncident#status}
  */
  readonly status: string;
  /**
  * Specifies the verification status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#verification_status SecmasterIncident#verification_status}
  */
  readonly verificationStatus?: string;
  /**
  * Specifies the ID of the workspace to which the incident belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#workspace_id SecmasterIncident#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * data_source block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#data_source SecmasterIncident#data_source}
  */
  readonly dataSource: SecmasterIncidentDataSource;
  /**
  * type block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#type SecmasterIncident#type}
  */
  readonly type: SecmasterIncidentType;
}
export interface SecmasterIncidentDataSource {
  /**
  * Specifies the product feature.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#product_feature SecmasterIncident#product_feature}
  */
  readonly productFeature: string;
  /**
  * Specifies the product name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#product_name SecmasterIncident#product_name}
  */
  readonly productName: string;
  /**
  * Specifies the source type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#source_type SecmasterIncident#source_type}
  */
  readonly sourceType: number;
}

export function secmasterIncidentDataSourceToTerraform(struct?: SecmasterIncidentDataSourceOutputReference | SecmasterIncidentDataSource): any {
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


export function secmasterIncidentDataSourceToHclTerraform(struct?: SecmasterIncidentDataSourceOutputReference | SecmasterIncidentDataSource): any {
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

export class SecmasterIncidentDataSourceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): SecmasterIncidentDataSource | undefined {
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

  public set internalValue(value: SecmasterIncidentDataSource | undefined) {
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
export interface SecmasterIncidentType {
  /**
  * Specifies the category.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#category SecmasterIncident#category}
  */
  readonly category: string;
  /**
  * Specifies the incident type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#incident_type SecmasterIncident#incident_type}
  */
  readonly incidentType: string;
}

export function secmasterIncidentTypeToTerraform(struct?: SecmasterIncidentTypeOutputReference | SecmasterIncidentType): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    category: cdktf.stringToTerraform(struct!.category),
    incident_type: cdktf.stringToTerraform(struct!.incidentType),
  }
}


export function secmasterIncidentTypeToHclTerraform(struct?: SecmasterIncidentTypeOutputReference | SecmasterIncidentType): any {
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
    incident_type: {
      value: cdktf.stringToHclTerraform(struct!.incidentType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class SecmasterIncidentTypeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): SecmasterIncidentType | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._category !== undefined) {
      hasAnyValues = true;
      internalValueResult.category = this._category;
    }
    if (this._incidentType !== undefined) {
      hasAnyValues = true;
      internalValueResult.incidentType = this._incidentType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SecmasterIncidentType | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._category = undefined;
      this._incidentType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._category = value.category;
      this._incidentType = value.incidentType;
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

  // incident_type - computed: false, optional: false, required: true
  private _incidentType?: string; 
  public get incidentType() {
    return this.getStringAttribute('incident_type');
  }
  public set incidentType(value: string) {
    this._incidentType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get incidentTypeInput() {
    return this._incidentType;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident huaweicloud_secmaster_incident}
*/
export class SecmasterIncident extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_incident";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SecmasterIncident resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SecmasterIncident to import
  * @param importFromId The id of the existing SecmasterIncident that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SecmasterIncident to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_incident", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_incident huaweicloud_secmaster_incident} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SecmasterIncidentConfig
  */
  public constructor(scope: Construct, id: string, config: SecmasterIncidentConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_incident',
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
    this._level = config.level;
    this._name = config.name;
    this._owner = config.owner;
    this._plannedClosureTime = config.plannedClosureTime;
    this._region = config.region;
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

  // creator - computed: true, optional: false, required: false
  public get creator() {
    return this.getStringAttribute('creator');
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

  // level - computed: false, optional: false, required: true
  private _level?: string; 
  public get level() {
    return this.getStringAttribute('level');
  }
  public set level(value: string) {
    this._level = value;
  }
  // Temporarily expose input value. Use with caution.
  public get levelInput() {
    return this._level;
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

  // planned_closure_time - computed: true, optional: true, required: false
  private _plannedClosureTime?: string; 
  public get plannedClosureTime() {
    return this.getStringAttribute('planned_closure_time');
  }
  public set plannedClosureTime(value: string) {
    this._plannedClosureTime = value;
  }
  public resetPlannedClosureTime() {
    this._plannedClosureTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get plannedClosureTimeInput() {
    return this._plannedClosureTime;
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

  // stage - computed: true, optional: true, required: false
  private _stage?: string; 
  public get stage() {
    return this.getStringAttribute('stage');
  }
  public set stage(value: string) {
    this._stage = value;
  }
  public resetStage() {
    this._stage = undefined;
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

  // verification_status - computed: true, optional: true, required: false
  private _verificationStatus?: string; 
  public get verificationStatus() {
    return this.getStringAttribute('verification_status');
  }
  public set verificationStatus(value: string) {
    this._verificationStatus = value;
  }
  public resetVerificationStatus() {
    this._verificationStatus = undefined;
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
  private _dataSource = new SecmasterIncidentDataSourceOutputReference(this, "data_source");
  public get dataSource() {
    return this._dataSource;
  }
  public putDataSource(value: SecmasterIncidentDataSource) {
    this._dataSource.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataSourceInput() {
    return this._dataSource.internalValue;
  }

  // type - computed: false, optional: false, required: true
  private _type = new SecmasterIncidentTypeOutputReference(this, "type");
  public get type() {
    return this._type;
  }
  public putType(value: SecmasterIncidentType) {
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
      level: cdktf.stringToTerraform(this._level),
      name: cdktf.stringToTerraform(this._name),
      owner: cdktf.stringToTerraform(this._owner),
      planned_closure_time: cdktf.stringToTerraform(this._plannedClosureTime),
      region: cdktf.stringToTerraform(this._region),
      stage: cdktf.stringToTerraform(this._stage),
      status: cdktf.stringToTerraform(this._status),
      verification_status: cdktf.stringToTerraform(this._verificationStatus),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      data_source: secmasterIncidentDataSourceToTerraform(this._dataSource.internalValue),
      type: secmasterIncidentTypeToTerraform(this._type.internalValue),
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
      level: {
        value: cdktf.stringToHclTerraform(this._level),
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
      planned_closure_time: {
        value: cdktf.stringToHclTerraform(this._plannedClosureTime),
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
        value: secmasterIncidentDataSourceToHclTerraform(this._dataSource.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "SecmasterIncidentDataSourceList",
      },
      type: {
        value: secmasterIncidentTypeToHclTerraform(this._type.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "SecmasterIncidentTypeList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

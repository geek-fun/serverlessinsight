// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudAsPolicyExecuteLogsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#end_time DataHuaweicloudAsPolicyExecuteLogs#end_time}
  */
  readonly endTime?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#execute_type DataHuaweicloudAsPolicyExecuteLogs#execute_type}
  */
  readonly executeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#id DataHuaweicloudAsPolicyExecuteLogs#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#log_id DataHuaweicloudAsPolicyExecuteLogs#log_id}
  */
  readonly logId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#region DataHuaweicloudAsPolicyExecuteLogs#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#scaling_policy_id DataHuaweicloudAsPolicyExecuteLogs#scaling_policy_id}
  */
  readonly scalingPolicyId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#scaling_resource_id DataHuaweicloudAsPolicyExecuteLogs#scaling_resource_id}
  */
  readonly scalingResourceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#scaling_resource_type DataHuaweicloudAsPolicyExecuteLogs#scaling_resource_type}
  */
  readonly scalingResourceType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#start_time DataHuaweicloudAsPolicyExecuteLogs#start_time}
  */
  readonly startTime?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#status DataHuaweicloudAsPolicyExecuteLogs#status}
  */
  readonly status?: string;
}
export interface DataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecords {
}

export function dataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecordsToTerraform(struct?: DataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecords): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecordsToHclTerraform(struct?: DataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecords): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecordsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecords | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecords | undefined) {
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

  // job_name - computed: true, optional: false, required: false
  public get jobName() {
    return this.getStringAttribute('job_name');
  }

  // job_status - computed: true, optional: false, required: false
  public get jobStatus() {
    return this.getStringAttribute('job_status');
  }

  // message - computed: true, optional: false, required: false
  public get message() {
    return this.getStringAttribute('message');
  }

  // record_time - computed: true, optional: false, required: false
  public get recordTime() {
    return this.getStringAttribute('record_time');
  }

  // record_type - computed: true, optional: false, required: false
  public get recordType() {
    return this.getStringAttribute('record_type');
  }

  // request - computed: true, optional: false, required: false
  public get request() {
    return this.getStringAttribute('request');
  }

  // response - computed: true, optional: false, required: false
  public get response() {
    return this.getStringAttribute('response');
  }
}

export class DataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecordsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecordsOutputReference {
    return new DataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecordsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAsPolicyExecuteLogsExecuteLogs {
}

export function dataHuaweicloudAsPolicyExecuteLogsExecuteLogsToTerraform(struct?: DataHuaweicloudAsPolicyExecuteLogsExecuteLogs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAsPolicyExecuteLogsExecuteLogsToHclTerraform(struct?: DataHuaweicloudAsPolicyExecuteLogsExecuteLogs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAsPolicyExecuteLogsExecuteLogsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAsPolicyExecuteLogsExecuteLogs | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAsPolicyExecuteLogsExecuteLogs | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // desire_value - computed: true, optional: false, required: false
  public get desireValue() {
    return this.getStringAttribute('desire_value');
  }

  // execute_time - computed: true, optional: false, required: false
  public get executeTime() {
    return this.getStringAttribute('execute_time');
  }

  // execute_type - computed: true, optional: false, required: false
  public get executeType() {
    return this.getStringAttribute('execute_type');
  }

  // failed_reason - computed: true, optional: false, required: false
  public get failedReason() {
    return this.getStringAttribute('failed_reason');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // job_records - computed: true, optional: false, required: false
  private _jobRecords = new DataHuaweicloudAsPolicyExecuteLogsExecuteLogsJobRecordsList(this, "job_records", false);
  public get jobRecords() {
    return this._jobRecords;
  }

  // limit_value - computed: true, optional: false, required: false
  public get limitValue() {
    return this.getStringAttribute('limit_value');
  }

  // metadata - computed: true, optional: false, required: false
  private _metadata = new cdktf.StringMap(this, "metadata");
  public get metadata() {
    return this._metadata;
  }

  // old_value - computed: true, optional: false, required: false
  public get oldValue() {
    return this.getStringAttribute('old_value');
  }

  // scaling_policy_id - computed: true, optional: false, required: false
  public get scalingPolicyId() {
    return this.getStringAttribute('scaling_policy_id');
  }

  // scaling_resource_id - computed: true, optional: false, required: false
  public get scalingResourceId() {
    return this.getStringAttribute('scaling_resource_id');
  }

  // scaling_resource_type - computed: true, optional: false, required: false
  public get scalingResourceType() {
    return this.getStringAttribute('scaling_resource_type');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class DataHuaweicloudAsPolicyExecuteLogsExecuteLogsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAsPolicyExecuteLogsExecuteLogsOutputReference {
    return new DataHuaweicloudAsPolicyExecuteLogsExecuteLogsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs huaweicloud_as_policy_execute_logs}
*/
export class DataHuaweicloudAsPolicyExecuteLogs extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_as_policy_execute_logs";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudAsPolicyExecuteLogs resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudAsPolicyExecuteLogs to import
  * @param importFromId The id of the existing DataHuaweicloudAsPolicyExecuteLogs that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudAsPolicyExecuteLogs to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_as_policy_execute_logs", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/as_policy_execute_logs huaweicloud_as_policy_execute_logs} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudAsPolicyExecuteLogsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudAsPolicyExecuteLogsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_as_policy_execute_logs',
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
    this._endTime = config.endTime;
    this._executeType = config.executeType;
    this._id = config.id;
    this._logId = config.logId;
    this._region = config.region;
    this._scalingPolicyId = config.scalingPolicyId;
    this._scalingResourceId = config.scalingResourceId;
    this._scalingResourceType = config.scalingResourceType;
    this._startTime = config.startTime;
    this._status = config.status;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // end_time - computed: false, optional: true, required: false
  private _endTime?: string; 
  public get endTime() {
    return this.getStringAttribute('end_time');
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
  public resetEndTime() {
    this._endTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endTimeInput() {
    return this._endTime;
  }

  // execute_logs - computed: true, optional: false, required: false
  private _executeLogs = new DataHuaweicloudAsPolicyExecuteLogsExecuteLogsList(this, "execute_logs", false);
  public get executeLogs() {
    return this._executeLogs;
  }

  // execute_type - computed: false, optional: true, required: false
  private _executeType?: string; 
  public get executeType() {
    return this.getStringAttribute('execute_type');
  }
  public set executeType(value: string) {
    this._executeType = value;
  }
  public resetExecuteType() {
    this._executeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get executeTypeInput() {
    return this._executeType;
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

  // log_id - computed: false, optional: true, required: false
  private _logId?: string; 
  public get logId() {
    return this.getStringAttribute('log_id');
  }
  public set logId(value: string) {
    this._logId = value;
  }
  public resetLogId() {
    this._logId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logIdInput() {
    return this._logId;
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

  // scaling_policy_id - computed: false, optional: false, required: true
  private _scalingPolicyId?: string; 
  public get scalingPolicyId() {
    return this.getStringAttribute('scaling_policy_id');
  }
  public set scalingPolicyId(value: string) {
    this._scalingPolicyId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingPolicyIdInput() {
    return this._scalingPolicyId;
  }

  // scaling_resource_id - computed: false, optional: true, required: false
  private _scalingResourceId?: string; 
  public get scalingResourceId() {
    return this.getStringAttribute('scaling_resource_id');
  }
  public set scalingResourceId(value: string) {
    this._scalingResourceId = value;
  }
  public resetScalingResourceId() {
    this._scalingResourceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingResourceIdInput() {
    return this._scalingResourceId;
  }

  // scaling_resource_type - computed: false, optional: true, required: false
  private _scalingResourceType?: string; 
  public get scalingResourceType() {
    return this.getStringAttribute('scaling_resource_type');
  }
  public set scalingResourceType(value: string) {
    this._scalingResourceType = value;
  }
  public resetScalingResourceType() {
    this._scalingResourceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingResourceTypeInput() {
    return this._scalingResourceType;
  }

  // start_time - computed: false, optional: true, required: false
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  public resetStartTime() {
    this._startTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      end_time: cdktf.stringToTerraform(this._endTime),
      execute_type: cdktf.stringToTerraform(this._executeType),
      id: cdktf.stringToTerraform(this._id),
      log_id: cdktf.stringToTerraform(this._logId),
      region: cdktf.stringToTerraform(this._region),
      scaling_policy_id: cdktf.stringToTerraform(this._scalingPolicyId),
      scaling_resource_id: cdktf.stringToTerraform(this._scalingResourceId),
      scaling_resource_type: cdktf.stringToTerraform(this._scalingResourceType),
      start_time: cdktf.stringToTerraform(this._startTime),
      status: cdktf.stringToTerraform(this._status),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      end_time: {
        value: cdktf.stringToHclTerraform(this._endTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      execute_type: {
        value: cdktf.stringToHclTerraform(this._executeType),
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
      log_id: {
        value: cdktf.stringToHclTerraform(this._logId),
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
      scaling_policy_id: {
        value: cdktf.stringToHclTerraform(this._scalingPolicyId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      scaling_resource_id: {
        value: cdktf.stringToHclTerraform(this._scalingResourceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      scaling_resource_type: {
        value: cdktf.stringToHclTerraform(this._scalingResourceType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      start_time: {
        value: cdktf.stringToHclTerraform(this._startTime),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

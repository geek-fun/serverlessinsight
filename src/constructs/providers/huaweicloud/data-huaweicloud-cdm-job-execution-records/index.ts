// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cdm_job_execution_records
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCdmJobExecutionRecordsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the cluster ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cdm_job_execution_records#cluster_id DataHuaweicloudCdmJobExecutionRecords#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cdm_job_execution_records#id DataHuaweicloudCdmJobExecutionRecords#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the job name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cdm_job_execution_records#job_name DataHuaweicloudCdmJobExecutionRecords#job_name}
  */
  readonly jobName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cdm_job_execution_records#region DataHuaweicloudCdmJobExecutionRecords#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudCdmJobExecutionRecordsRecordsCounters {
}

export function dataHuaweicloudCdmJobExecutionRecordsRecordsCountersToTerraform(struct?: DataHuaweicloudCdmJobExecutionRecordsRecordsCounters): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCdmJobExecutionRecordsRecordsCountersToHclTerraform(struct?: DataHuaweicloudCdmJobExecutionRecordsRecordsCounters): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCdmJobExecutionRecordsRecordsCountersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCdmJobExecutionRecordsRecordsCounters | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCdmJobExecutionRecordsRecordsCounters | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // bytes_read - computed: true, optional: false, required: false
  public get bytesRead() {
    return this.getNumberAttribute('bytes_read');
  }

  // bytes_written - computed: true, optional: false, required: false
  public get bytesWritten() {
    return this.getNumberAttribute('bytes_written');
  }

  // file_skipped - computed: true, optional: false, required: false
  public get fileSkipped() {
    return this.getNumberAttribute('file_skipped');
  }

  // files_read - computed: true, optional: false, required: false
  public get filesRead() {
    return this.getNumberAttribute('files_read');
  }

  // files_written - computed: true, optional: false, required: false
  public get filesWritten() {
    return this.getNumberAttribute('files_written');
  }

  // rows_read - computed: true, optional: false, required: false
  public get rowsRead() {
    return this.getNumberAttribute('rows_read');
  }

  // rows_written - computed: true, optional: false, required: false
  public get rowsWritten() {
    return this.getNumberAttribute('rows_written');
  }

  // rows_written_skipped - computed: true, optional: false, required: false
  public get rowsWrittenSkipped() {
    return this.getNumberAttribute('rows_written_skipped');
  }

  // total_files - computed: true, optional: false, required: false
  public get totalFiles() {
    return this.getNumberAttribute('total_files');
  }

  // total_size - computed: true, optional: false, required: false
  public get totalSize() {
    return this.getNumberAttribute('total_size');
  }
}

export class DataHuaweicloudCdmJobExecutionRecordsRecordsCountersList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCdmJobExecutionRecordsRecordsCountersOutputReference {
    return new DataHuaweicloudCdmJobExecutionRecordsRecordsCountersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudCdmJobExecutionRecordsRecords {
}

export function dataHuaweicloudCdmJobExecutionRecordsRecordsToTerraform(struct?: DataHuaweicloudCdmJobExecutionRecordsRecords): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCdmJobExecutionRecordsRecordsToHclTerraform(struct?: DataHuaweicloudCdmJobExecutionRecordsRecords): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCdmJobExecutionRecordsRecordsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCdmJobExecutionRecordsRecords | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCdmJobExecutionRecordsRecords | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // counters - computed: true, optional: false, required: false
  private _counters = new DataHuaweicloudCdmJobExecutionRecordsRecordsCountersList(this, "counters", false);
  public get counters() {
    return this._counters;
  }

  // creation_date - computed: true, optional: false, required: false
  public get creationDate() {
    return this.getStringAttribute('creation_date');
  }

  // creation_user - computed: true, optional: false, required: false
  public get creationUser() {
    return this.getStringAttribute('creation_user');
  }

  // delete_rows - computed: true, optional: false, required: false
  public get deleteRows() {
    return this.getNumberAttribute('delete_rows');
  }

  // error_details - computed: true, optional: false, required: false
  public get errorDetails() {
    return this.getStringAttribute('error_details');
  }

  // error_summary - computed: true, optional: false, required: false
  public get errorSummary() {
    return this.getStringAttribute('error_summary');
  }

  // execute_date - computed: true, optional: false, required: false
  public get executeDate() {
    return this.getStringAttribute('execute_date');
  }

  // external_id - computed: true, optional: false, required: false
  public get externalId() {
    return this.getStringAttribute('external_id');
  }

  // is_delete_job - computed: true, optional: false, required: false
  public get isDeleteJob() {
    return this.getBooleanAttribute('is_delete_job');
  }

  // is_execute_auto - computed: true, optional: false, required: false
  public get isExecuteAuto() {
    return this.getBooleanAttribute('is_execute_auto');
  }

  // is_incrementing - computed: true, optional: false, required: false
  public get isIncrementing() {
    return this.getBooleanAttribute('is_incrementing');
  }

  // is_stoping_increment - computed: true, optional: false, required: false
  public get isStopingIncrement() {
    return this.getStringAttribute('is_stoping_increment');
  }

  // last_udpate_user - computed: true, optional: false, required: false
  public get lastUdpateUser() {
    return this.getStringAttribute('last_udpate_user');
  }

  // last_update_date - computed: true, optional: false, required: false
  public get lastUpdateDate() {
    return this.getStringAttribute('last_update_date');
  }

  // progress - computed: true, optional: false, required: false
  public get progress() {
    return this.getNumberAttribute('progress');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // submission_id - computed: true, optional: false, required: false
  public get submissionId() {
    return this.getNumberAttribute('submission_id');
  }

  // update_rows - computed: true, optional: false, required: false
  public get updateRows() {
    return this.getNumberAttribute('update_rows');
  }

  // write_rows - computed: true, optional: false, required: false
  public get writeRows() {
    return this.getNumberAttribute('write_rows');
  }
}

export class DataHuaweicloudCdmJobExecutionRecordsRecordsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCdmJobExecutionRecordsRecordsOutputReference {
    return new DataHuaweicloudCdmJobExecutionRecordsRecordsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cdm_job_execution_records huaweicloud_cdm_job_execution_records}
*/
export class DataHuaweicloudCdmJobExecutionRecords extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cdm_job_execution_records";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCdmJobExecutionRecords resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCdmJobExecutionRecords to import
  * @param importFromId The id of the existing DataHuaweicloudCdmJobExecutionRecords that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cdm_job_execution_records#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCdmJobExecutionRecords to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cdm_job_execution_records", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cdm_job_execution_records huaweicloud_cdm_job_execution_records} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCdmJobExecutionRecordsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCdmJobExecutionRecordsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cdm_job_execution_records',
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
    this._clusterId = config.clusterId;
    this._id = config.id;
    this._jobName = config.jobName;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cluster_id - computed: false, optional: false, required: true
  private _clusterId?: string; 
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }
  public set clusterId(value: string) {
    this._clusterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterIdInput() {
    return this._clusterId;
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

  // job_name - computed: false, optional: false, required: true
  private _jobName?: string; 
  public get jobName() {
    return this.getStringAttribute('job_name');
  }
  public set jobName(value: string) {
    this._jobName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get jobNameInput() {
    return this._jobName;
  }

  // records - computed: true, optional: false, required: false
  private _records = new DataHuaweicloudCdmJobExecutionRecordsRecordsList(this, "records", false);
  public get records() {
    return this._records;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      id: cdktf.stringToTerraform(this._id),
      job_name: cdktf.stringToTerraform(this._jobName),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
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
      job_name: {
        value: cdktf.stringToHclTerraform(this._jobName),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

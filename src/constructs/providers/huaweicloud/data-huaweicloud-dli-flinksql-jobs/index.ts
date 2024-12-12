// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDliFlinksqlJobsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#cu_num DataHuaweicloudDliFlinksqlJobs#cu_num}
  */
  readonly cuNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#id DataHuaweicloudDliFlinksqlJobs#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#job_id DataHuaweicloudDliFlinksqlJobs#job_id}
  */
  readonly jobId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#manager_cu_num DataHuaweicloudDliFlinksqlJobs#manager_cu_num}
  */
  readonly managerCuNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#parallel_num DataHuaweicloudDliFlinksqlJobs#parallel_num}
  */
  readonly parallelNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#queue_name DataHuaweicloudDliFlinksqlJobs#queue_name}
  */
  readonly queueName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#region DataHuaweicloudDliFlinksqlJobs#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#tags DataHuaweicloudDliFlinksqlJobs#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#tm_cu_num DataHuaweicloudDliFlinksqlJobs#tm_cu_num}
  */
  readonly tmCuNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#tm_slot_num DataHuaweicloudDliFlinksqlJobs#tm_slot_num}
  */
  readonly tmSlotNum?: number;
}
export interface DataHuaweicloudDliFlinksqlJobsJobs {
}

export function dataHuaweicloudDliFlinksqlJobsJobsToTerraform(struct?: DataHuaweicloudDliFlinksqlJobsJobs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDliFlinksqlJobsJobsToHclTerraform(struct?: DataHuaweicloudDliFlinksqlJobsJobs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDliFlinksqlJobsJobsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDliFlinksqlJobsJobs | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDliFlinksqlJobsJobs | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // checkpoint_enabled - computed: true, optional: false, required: false
  public get checkpointEnabled() {
    return this.getBooleanAttribute('checkpoint_enabled');
  }

  // checkpoint_interval - computed: true, optional: false, required: false
  public get checkpointInterval() {
    return this.getNumberAttribute('checkpoint_interval');
  }

  // checkpoint_mode - computed: true, optional: false, required: false
  public get checkpointMode() {
    return this.getStringAttribute('checkpoint_mode');
  }

  // cu_num - computed: true, optional: false, required: false
  public get cuNum() {
    return this.getNumberAttribute('cu_num');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // dirty_data_strategy - computed: true, optional: false, required: false
  public get dirtyDataStrategy() {
    return this.getStringAttribute('dirty_data_strategy');
  }

  // edge_group_ids - computed: true, optional: false, required: false
  public get edgeGroupIds() {
    return this.getListAttribute('edge_group_ids');
  }

  // flink_version - computed: true, optional: false, required: false
  public get flinkVersion() {
    return this.getStringAttribute('flink_version');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // idle_state_retention - computed: true, optional: false, required: false
  public get idleStateRetention() {
    return this.getNumberAttribute('idle_state_retention');
  }

  // log_enabled - computed: true, optional: false, required: false
  public get logEnabled() {
    return this.getBooleanAttribute('log_enabled');
  }

  // manager_cu_num - computed: true, optional: false, required: false
  public get managerCuNum() {
    return this.getNumberAttribute('manager_cu_num');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // obs_bucket - computed: true, optional: false, required: false
  public get obsBucket() {
    return this.getStringAttribute('obs_bucket');
  }

  // operator_config - computed: true, optional: false, required: false
  public get operatorConfig() {
    return this.getStringAttribute('operator_config');
  }

  // parallel_num - computed: true, optional: false, required: false
  public get parallelNum() {
    return this.getNumberAttribute('parallel_num');
  }

  // queue_name - computed: true, optional: false, required: false
  public get queueName() {
    return this.getStringAttribute('queue_name');
  }

  // restart_when_exception - computed: true, optional: false, required: false
  public get restartWhenException() {
    return this.getBooleanAttribute('restart_when_exception');
  }

  // resume_checkpoint - computed: true, optional: false, required: false
  public get resumeCheckpoint() {
    return this.getBooleanAttribute('resume_checkpoint');
  }

  // resume_max_num - computed: true, optional: false, required: false
  public get resumeMaxNum() {
    return this.getNumberAttribute('resume_max_num');
  }

  // run_mode - computed: true, optional: false, required: false
  public get runMode() {
    return this.getStringAttribute('run_mode');
  }

  // runtime_config - computed: true, optional: false, required: false
  public get runtimeConfig() {
    return this.getStringAttribute('runtime_config');
  }

  // smn_topic - computed: true, optional: false, required: false
  public get smnTopic() {
    return this.getStringAttribute('smn_topic');
  }

  // sql - computed: true, optional: false, required: false
  public get sql() {
    return this.getStringAttribute('sql');
  }

  // static_estimator_config - computed: true, optional: false, required: false
  public get staticEstimatorConfig() {
    return this.getStringAttribute('static_estimator_config');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tm_cu_num - computed: true, optional: false, required: false
  public get tmCuNum() {
    return this.getNumberAttribute('tm_cu_num');
  }

  // tm_slot_num - computed: true, optional: false, required: false
  public get tmSlotNum() {
    return this.getNumberAttribute('tm_slot_num');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // udf_jar_url - computed: true, optional: false, required: false
  public get udfJarUrl() {
    return this.getStringAttribute('udf_jar_url');
  }
}

export class DataHuaweicloudDliFlinksqlJobsJobsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDliFlinksqlJobsJobsOutputReference {
    return new DataHuaweicloudDliFlinksqlJobsJobsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs huaweicloud_dli_flinksql_jobs}
*/
export class DataHuaweicloudDliFlinksqlJobs extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dli_flinksql_jobs";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDliFlinksqlJobs resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDliFlinksqlJobs to import
  * @param importFromId The id of the existing DataHuaweicloudDliFlinksqlJobs that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDliFlinksqlJobs to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dli_flinksql_jobs", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dli_flinksql_jobs huaweicloud_dli_flinksql_jobs} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDliFlinksqlJobsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDliFlinksqlJobsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dli_flinksql_jobs',
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
    this._cuNum = config.cuNum;
    this._id = config.id;
    this._jobId = config.jobId;
    this._managerCuNum = config.managerCuNum;
    this._parallelNum = config.parallelNum;
    this._queueName = config.queueName;
    this._region = config.region;
    this._tags = config.tags;
    this._tmCuNum = config.tmCuNum;
    this._tmSlotNum = config.tmSlotNum;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cu_num - computed: false, optional: true, required: false
  private _cuNum?: number; 
  public get cuNum() {
    return this.getNumberAttribute('cu_num');
  }
  public set cuNum(value: number) {
    this._cuNum = value;
  }
  public resetCuNum() {
    this._cuNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cuNumInput() {
    return this._cuNum;
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

  // job_id - computed: false, optional: true, required: false
  private _jobId?: string; 
  public get jobId() {
    return this.getStringAttribute('job_id');
  }
  public set jobId(value: string) {
    this._jobId = value;
  }
  public resetJobId() {
    this._jobId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get jobIdInput() {
    return this._jobId;
  }

  // jobs - computed: true, optional: false, required: false
  private _jobs = new DataHuaweicloudDliFlinksqlJobsJobsList(this, "jobs", false);
  public get jobs() {
    return this._jobs;
  }

  // manager_cu_num - computed: false, optional: true, required: false
  private _managerCuNum?: number; 
  public get managerCuNum() {
    return this.getNumberAttribute('manager_cu_num');
  }
  public set managerCuNum(value: number) {
    this._managerCuNum = value;
  }
  public resetManagerCuNum() {
    this._managerCuNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get managerCuNumInput() {
    return this._managerCuNum;
  }

  // parallel_num - computed: false, optional: true, required: false
  private _parallelNum?: number; 
  public get parallelNum() {
    return this.getNumberAttribute('parallel_num');
  }
  public set parallelNum(value: number) {
    this._parallelNum = value;
  }
  public resetParallelNum() {
    this._parallelNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parallelNumInput() {
    return this._parallelNum;
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

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string }; 
  public get tags() {
    return this.getStringMapAttribute('tags');
  }
  public set tags(value: { [key: string]: string }) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // tm_cu_num - computed: false, optional: true, required: false
  private _tmCuNum?: number; 
  public get tmCuNum() {
    return this.getNumberAttribute('tm_cu_num');
  }
  public set tmCuNum(value: number) {
    this._tmCuNum = value;
  }
  public resetTmCuNum() {
    this._tmCuNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tmCuNumInput() {
    return this._tmCuNum;
  }

  // tm_slot_num - computed: false, optional: true, required: false
  private _tmSlotNum?: number; 
  public get tmSlotNum() {
    return this.getNumberAttribute('tm_slot_num');
  }
  public set tmSlotNum(value: number) {
    this._tmSlotNum = value;
  }
  public resetTmSlotNum() {
    this._tmSlotNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tmSlotNumInput() {
    return this._tmSlotNum;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cu_num: cdktf.numberToTerraform(this._cuNum),
      id: cdktf.stringToTerraform(this._id),
      job_id: cdktf.stringToTerraform(this._jobId),
      manager_cu_num: cdktf.numberToTerraform(this._managerCuNum),
      parallel_num: cdktf.numberToTerraform(this._parallelNum),
      queue_name: cdktf.stringToTerraform(this._queueName),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      tm_cu_num: cdktf.numberToTerraform(this._tmCuNum),
      tm_slot_num: cdktf.numberToTerraform(this._tmSlotNum),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cu_num: {
        value: cdktf.numberToHclTerraform(this._cuNum),
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
      job_id: {
        value: cdktf.stringToHclTerraform(this._jobId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      manager_cu_num: {
        value: cdktf.numberToHclTerraform(this._managerCuNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      parallel_num: {
        value: cdktf.numberToHclTerraform(this._parallelNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      tm_cu_num: {
        value: cdktf.numberToHclTerraform(this._tmCuNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      tm_slot_num: {
        value: cdktf.numberToHclTerraform(this._tmSlotNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

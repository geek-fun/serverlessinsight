// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DliFlinksqlJobConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#checkpoint_enabled DliFlinksqlJob#checkpoint_enabled}
  */
  readonly checkpointEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#checkpoint_interval DliFlinksqlJob#checkpoint_interval}
  */
  readonly checkpointInterval?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#checkpoint_mode DliFlinksqlJob#checkpoint_mode}
  */
  readonly checkpointMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#cu_number DliFlinksqlJob#cu_number}
  */
  readonly cuNumber?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#description DliFlinksqlJob#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#dirty_data_strategy DliFlinksqlJob#dirty_data_strategy}
  */
  readonly dirtyDataStrategy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#edge_group_ids DliFlinksqlJob#edge_group_ids}
  */
  readonly edgeGroupIds?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#flink_version DliFlinksqlJob#flink_version}
  */
  readonly flinkVersion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#graph_type DliFlinksqlJob#graph_type}
  */
  readonly graphType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#id DliFlinksqlJob#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#idle_state_retention DliFlinksqlJob#idle_state_retention}
  */
  readonly idleStateRetention?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#log_enabled DliFlinksqlJob#log_enabled}
  */
  readonly logEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#manager_cu_number DliFlinksqlJob#manager_cu_number}
  */
  readonly managerCuNumber?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#name DliFlinksqlJob#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#obs_bucket DliFlinksqlJob#obs_bucket}
  */
  readonly obsBucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#operator_config DliFlinksqlJob#operator_config}
  */
  readonly operatorConfig?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#parallel_number DliFlinksqlJob#parallel_number}
  */
  readonly parallelNumber?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#queue_name DliFlinksqlJob#queue_name}
  */
  readonly queueName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#region DliFlinksqlJob#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#restart_when_exception DliFlinksqlJob#restart_when_exception}
  */
  readonly restartWhenException?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#resume_checkpoint DliFlinksqlJob#resume_checkpoint}
  */
  readonly resumeCheckpoint?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#resume_max_num DliFlinksqlJob#resume_max_num}
  */
  readonly resumeMaxNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#run_mode DliFlinksqlJob#run_mode}
  */
  readonly runMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#runtime_config DliFlinksqlJob#runtime_config}
  */
  readonly runtimeConfig?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#smn_topic DliFlinksqlJob#smn_topic}
  */
  readonly smnTopic?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#sql DliFlinksqlJob#sql}
  */
  readonly sql?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#static_estimator DliFlinksqlJob#static_estimator}
  */
  readonly staticEstimator?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#static_estimator_config DliFlinksqlJob#static_estimator_config}
  */
  readonly staticEstimatorConfig?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#tags DliFlinksqlJob#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#tm_cus DliFlinksqlJob#tm_cus}
  */
  readonly tmCus?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#tm_slot_num DliFlinksqlJob#tm_slot_num}
  */
  readonly tmSlotNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#type DliFlinksqlJob#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#udf_jar_url DliFlinksqlJob#udf_jar_url}
  */
  readonly udfJarUrl?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#timeouts DliFlinksqlJob#timeouts}
  */
  readonly timeouts?: DliFlinksqlJobTimeouts;
}
export interface DliFlinksqlJobTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#create DliFlinksqlJob#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#delete DliFlinksqlJob#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#update DliFlinksqlJob#update}
  */
  readonly update?: string;
}

export function dliFlinksqlJobTimeoutsToTerraform(struct?: DliFlinksqlJobTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function dliFlinksqlJobTimeoutsToHclTerraform(struct?: DliFlinksqlJobTimeouts | cdktf.IResolvable): any {
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
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DliFlinksqlJobTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DliFlinksqlJobTimeouts | cdktf.IResolvable | undefined {
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
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliFlinksqlJobTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
      this._update = undefined;
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
      this._update = value.update;
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

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job huaweicloud_dli_flinksql_job}
*/
export class DliFlinksqlJob extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dli_flinksql_job";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DliFlinksqlJob resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DliFlinksqlJob to import
  * @param importFromId The id of the existing DliFlinksqlJob that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DliFlinksqlJob to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dli_flinksql_job", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_flinksql_job huaweicloud_dli_flinksql_job} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DliFlinksqlJobConfig
  */
  public constructor(scope: Construct, id: string, config: DliFlinksqlJobConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dli_flinksql_job',
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
    this._checkpointEnabled = config.checkpointEnabled;
    this._checkpointInterval = config.checkpointInterval;
    this._checkpointMode = config.checkpointMode;
    this._cuNumber = config.cuNumber;
    this._description = config.description;
    this._dirtyDataStrategy = config.dirtyDataStrategy;
    this._edgeGroupIds = config.edgeGroupIds;
    this._flinkVersion = config.flinkVersion;
    this._graphType = config.graphType;
    this._id = config.id;
    this._idleStateRetention = config.idleStateRetention;
    this._logEnabled = config.logEnabled;
    this._managerCuNumber = config.managerCuNumber;
    this._name = config.name;
    this._obsBucket = config.obsBucket;
    this._operatorConfig = config.operatorConfig;
    this._parallelNumber = config.parallelNumber;
    this._queueName = config.queueName;
    this._region = config.region;
    this._restartWhenException = config.restartWhenException;
    this._resumeCheckpoint = config.resumeCheckpoint;
    this._resumeMaxNum = config.resumeMaxNum;
    this._runMode = config.runMode;
    this._runtimeConfig = config.runtimeConfig;
    this._smnTopic = config.smnTopic;
    this._sql = config.sql;
    this._staticEstimator = config.staticEstimator;
    this._staticEstimatorConfig = config.staticEstimatorConfig;
    this._tags = config.tags;
    this._tmCus = config.tmCus;
    this._tmSlotNum = config.tmSlotNum;
    this._type = config.type;
    this._udfJarUrl = config.udfJarUrl;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // checkpoint_enabled - computed: false, optional: true, required: false
  private _checkpointEnabled?: boolean | cdktf.IResolvable; 
  public get checkpointEnabled() {
    return this.getBooleanAttribute('checkpoint_enabled');
  }
  public set checkpointEnabled(value: boolean | cdktf.IResolvable) {
    this._checkpointEnabled = value;
  }
  public resetCheckpointEnabled() {
    this._checkpointEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get checkpointEnabledInput() {
    return this._checkpointEnabled;
  }

  // checkpoint_interval - computed: false, optional: true, required: false
  private _checkpointInterval?: number; 
  public get checkpointInterval() {
    return this.getNumberAttribute('checkpoint_interval');
  }
  public set checkpointInterval(value: number) {
    this._checkpointInterval = value;
  }
  public resetCheckpointInterval() {
    this._checkpointInterval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get checkpointIntervalInput() {
    return this._checkpointInterval;
  }

  // checkpoint_mode - computed: false, optional: true, required: false
  private _checkpointMode?: string; 
  public get checkpointMode() {
    return this.getStringAttribute('checkpoint_mode');
  }
  public set checkpointMode(value: string) {
    this._checkpointMode = value;
  }
  public resetCheckpointMode() {
    this._checkpointMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get checkpointModeInput() {
    return this._checkpointMode;
  }

  // cu_number - computed: false, optional: true, required: false
  private _cuNumber?: number; 
  public get cuNumber() {
    return this.getNumberAttribute('cu_number');
  }
  public set cuNumber(value: number) {
    this._cuNumber = value;
  }
  public resetCuNumber() {
    this._cuNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cuNumberInput() {
    return this._cuNumber;
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

  // dirty_data_strategy - computed: false, optional: true, required: false
  private _dirtyDataStrategy?: string; 
  public get dirtyDataStrategy() {
    return this.getStringAttribute('dirty_data_strategy');
  }
  public set dirtyDataStrategy(value: string) {
    this._dirtyDataStrategy = value;
  }
  public resetDirtyDataStrategy() {
    this._dirtyDataStrategy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dirtyDataStrategyInput() {
    return this._dirtyDataStrategy;
  }

  // edge_group_ids - computed: false, optional: true, required: false
  private _edgeGroupIds?: string[]; 
  public get edgeGroupIds() {
    return this.getListAttribute('edge_group_ids');
  }
  public set edgeGroupIds(value: string[]) {
    this._edgeGroupIds = value;
  }
  public resetEdgeGroupIds() {
    this._edgeGroupIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get edgeGroupIdsInput() {
    return this._edgeGroupIds;
  }

  // flink_version - computed: false, optional: true, required: false
  private _flinkVersion?: string; 
  public get flinkVersion() {
    return this.getStringAttribute('flink_version');
  }
  public set flinkVersion(value: string) {
    this._flinkVersion = value;
  }
  public resetFlinkVersion() {
    this._flinkVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get flinkVersionInput() {
    return this._flinkVersion;
  }

  // graph_type - computed: false, optional: true, required: false
  private _graphType?: string; 
  public get graphType() {
    return this.getStringAttribute('graph_type');
  }
  public set graphType(value: string) {
    this._graphType = value;
  }
  public resetGraphType() {
    this._graphType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get graphTypeInput() {
    return this._graphType;
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

  // idle_state_retention - computed: false, optional: true, required: false
  private _idleStateRetention?: number; 
  public get idleStateRetention() {
    return this.getNumberAttribute('idle_state_retention');
  }
  public set idleStateRetention(value: number) {
    this._idleStateRetention = value;
  }
  public resetIdleStateRetention() {
    this._idleStateRetention = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idleStateRetentionInput() {
    return this._idleStateRetention;
  }

  // log_enabled - computed: false, optional: true, required: false
  private _logEnabled?: boolean | cdktf.IResolvable; 
  public get logEnabled() {
    return this.getBooleanAttribute('log_enabled');
  }
  public set logEnabled(value: boolean | cdktf.IResolvable) {
    this._logEnabled = value;
  }
  public resetLogEnabled() {
    this._logEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logEnabledInput() {
    return this._logEnabled;
  }

  // manager_cu_number - computed: false, optional: true, required: false
  private _managerCuNumber?: number; 
  public get managerCuNumber() {
    return this.getNumberAttribute('manager_cu_number');
  }
  public set managerCuNumber(value: number) {
    this._managerCuNumber = value;
  }
  public resetManagerCuNumber() {
    this._managerCuNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get managerCuNumberInput() {
    return this._managerCuNumber;
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

  // obs_bucket - computed: false, optional: true, required: false
  private _obsBucket?: string; 
  public get obsBucket() {
    return this.getStringAttribute('obs_bucket');
  }
  public set obsBucket(value: string) {
    this._obsBucket = value;
  }
  public resetObsBucket() {
    this._obsBucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsBucketInput() {
    return this._obsBucket;
  }

  // operator_config - computed: false, optional: true, required: false
  private _operatorConfig?: string; 
  public get operatorConfig() {
    return this.getStringAttribute('operator_config');
  }
  public set operatorConfig(value: string) {
    this._operatorConfig = value;
  }
  public resetOperatorConfig() {
    this._operatorConfig = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get operatorConfigInput() {
    return this._operatorConfig;
  }

  // parallel_number - computed: false, optional: true, required: false
  private _parallelNumber?: number; 
  public get parallelNumber() {
    return this.getNumberAttribute('parallel_number');
  }
  public set parallelNumber(value: number) {
    this._parallelNumber = value;
  }
  public resetParallelNumber() {
    this._parallelNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parallelNumberInput() {
    return this._parallelNumber;
  }

  // queue_name - computed: true, optional: true, required: false
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

  // restart_when_exception - computed: false, optional: true, required: false
  private _restartWhenException?: boolean | cdktf.IResolvable; 
  public get restartWhenException() {
    return this.getBooleanAttribute('restart_when_exception');
  }
  public set restartWhenException(value: boolean | cdktf.IResolvable) {
    this._restartWhenException = value;
  }
  public resetRestartWhenException() {
    this._restartWhenException = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get restartWhenExceptionInput() {
    return this._restartWhenException;
  }

  // resume_checkpoint - computed: false, optional: true, required: false
  private _resumeCheckpoint?: boolean | cdktf.IResolvable; 
  public get resumeCheckpoint() {
    return this.getBooleanAttribute('resume_checkpoint');
  }
  public set resumeCheckpoint(value: boolean | cdktf.IResolvable) {
    this._resumeCheckpoint = value;
  }
  public resetResumeCheckpoint() {
    this._resumeCheckpoint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resumeCheckpointInput() {
    return this._resumeCheckpoint;
  }

  // resume_max_num - computed: false, optional: true, required: false
  private _resumeMaxNum?: number; 
  public get resumeMaxNum() {
    return this.getNumberAttribute('resume_max_num');
  }
  public set resumeMaxNum(value: number) {
    this._resumeMaxNum = value;
  }
  public resetResumeMaxNum() {
    this._resumeMaxNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resumeMaxNumInput() {
    return this._resumeMaxNum;
  }

  // run_mode - computed: false, optional: true, required: false
  private _runMode?: string; 
  public get runMode() {
    return this.getStringAttribute('run_mode');
  }
  public set runMode(value: string) {
    this._runMode = value;
  }
  public resetRunMode() {
    this._runMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get runModeInput() {
    return this._runMode;
  }

  // runtime_config - computed: false, optional: true, required: false
  private _runtimeConfig?: { [key: string]: string }; 
  public get runtimeConfig() {
    return this.getStringMapAttribute('runtime_config');
  }
  public set runtimeConfig(value: { [key: string]: string }) {
    this._runtimeConfig = value;
  }
  public resetRuntimeConfig() {
    this._runtimeConfig = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get runtimeConfigInput() {
    return this._runtimeConfig;
  }

  // smn_topic - computed: false, optional: true, required: false
  private _smnTopic?: string; 
  public get smnTopic() {
    return this.getStringAttribute('smn_topic');
  }
  public set smnTopic(value: string) {
    this._smnTopic = value;
  }
  public resetSmnTopic() {
    this._smnTopic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smnTopicInput() {
    return this._smnTopic;
  }

  // sql - computed: false, optional: true, required: false
  private _sql?: string; 
  public get sql() {
    return this.getStringAttribute('sql');
  }
  public set sql(value: string) {
    this._sql = value;
  }
  public resetSql() {
    this._sql = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sqlInput() {
    return this._sql;
  }

  // static_estimator - computed: false, optional: true, required: false
  private _staticEstimator?: boolean | cdktf.IResolvable; 
  public get staticEstimator() {
    return this.getBooleanAttribute('static_estimator');
  }
  public set staticEstimator(value: boolean | cdktf.IResolvable) {
    this._staticEstimator = value;
  }
  public resetStaticEstimator() {
    this._staticEstimator = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get staticEstimatorInput() {
    return this._staticEstimator;
  }

  // static_estimator_config - computed: false, optional: true, required: false
  private _staticEstimatorConfig?: string; 
  public get staticEstimatorConfig() {
    return this.getStringAttribute('static_estimator_config');
  }
  public set staticEstimatorConfig(value: string) {
    this._staticEstimatorConfig = value;
  }
  public resetStaticEstimatorConfig() {
    this._staticEstimatorConfig = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get staticEstimatorConfigInput() {
    return this._staticEstimatorConfig;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // stream_graph - computed: true, optional: false, required: false
  public get streamGraph() {
    return this.getStringAttribute('stream_graph');
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

  // tm_cus - computed: false, optional: true, required: false
  private _tmCus?: number; 
  public get tmCus() {
    return this.getNumberAttribute('tm_cus');
  }
  public set tmCus(value: number) {
    this._tmCus = value;
  }
  public resetTmCus() {
    this._tmCus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tmCusInput() {
    return this._tmCus;
  }

  // tm_slot_num - computed: true, optional: true, required: false
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

  // udf_jar_url - computed: true, optional: true, required: false
  private _udfJarUrl?: string; 
  public get udfJarUrl() {
    return this.getStringAttribute('udf_jar_url');
  }
  public set udfJarUrl(value: string) {
    this._udfJarUrl = value;
  }
  public resetUdfJarUrl() {
    this._udfJarUrl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get udfJarUrlInput() {
    return this._udfJarUrl;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DliFlinksqlJobTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DliFlinksqlJobTimeouts) {
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
      checkpoint_enabled: cdktf.booleanToTerraform(this._checkpointEnabled),
      checkpoint_interval: cdktf.numberToTerraform(this._checkpointInterval),
      checkpoint_mode: cdktf.stringToTerraform(this._checkpointMode),
      cu_number: cdktf.numberToTerraform(this._cuNumber),
      description: cdktf.stringToTerraform(this._description),
      dirty_data_strategy: cdktf.stringToTerraform(this._dirtyDataStrategy),
      edge_group_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._edgeGroupIds),
      flink_version: cdktf.stringToTerraform(this._flinkVersion),
      graph_type: cdktf.stringToTerraform(this._graphType),
      id: cdktf.stringToTerraform(this._id),
      idle_state_retention: cdktf.numberToTerraform(this._idleStateRetention),
      log_enabled: cdktf.booleanToTerraform(this._logEnabled),
      manager_cu_number: cdktf.numberToTerraform(this._managerCuNumber),
      name: cdktf.stringToTerraform(this._name),
      obs_bucket: cdktf.stringToTerraform(this._obsBucket),
      operator_config: cdktf.stringToTerraform(this._operatorConfig),
      parallel_number: cdktf.numberToTerraform(this._parallelNumber),
      queue_name: cdktf.stringToTerraform(this._queueName),
      region: cdktf.stringToTerraform(this._region),
      restart_when_exception: cdktf.booleanToTerraform(this._restartWhenException),
      resume_checkpoint: cdktf.booleanToTerraform(this._resumeCheckpoint),
      resume_max_num: cdktf.numberToTerraform(this._resumeMaxNum),
      run_mode: cdktf.stringToTerraform(this._runMode),
      runtime_config: cdktf.hashMapper(cdktf.stringToTerraform)(this._runtimeConfig),
      smn_topic: cdktf.stringToTerraform(this._smnTopic),
      sql: cdktf.stringToTerraform(this._sql),
      static_estimator: cdktf.booleanToTerraform(this._staticEstimator),
      static_estimator_config: cdktf.stringToTerraform(this._staticEstimatorConfig),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      tm_cus: cdktf.numberToTerraform(this._tmCus),
      tm_slot_num: cdktf.numberToTerraform(this._tmSlotNum),
      type: cdktf.stringToTerraform(this._type),
      udf_jar_url: cdktf.stringToTerraform(this._udfJarUrl),
      timeouts: dliFlinksqlJobTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      checkpoint_enabled: {
        value: cdktf.booleanToHclTerraform(this._checkpointEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      checkpoint_interval: {
        value: cdktf.numberToHclTerraform(this._checkpointInterval),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      checkpoint_mode: {
        value: cdktf.stringToHclTerraform(this._checkpointMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cu_number: {
        value: cdktf.numberToHclTerraform(this._cuNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dirty_data_strategy: {
        value: cdktf.stringToHclTerraform(this._dirtyDataStrategy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      edge_group_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._edgeGroupIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      flink_version: {
        value: cdktf.stringToHclTerraform(this._flinkVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      graph_type: {
        value: cdktf.stringToHclTerraform(this._graphType),
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
      idle_state_retention: {
        value: cdktf.numberToHclTerraform(this._idleStateRetention),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      log_enabled: {
        value: cdktf.booleanToHclTerraform(this._logEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      manager_cu_number: {
        value: cdktf.numberToHclTerraform(this._managerCuNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      obs_bucket: {
        value: cdktf.stringToHclTerraform(this._obsBucket),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      operator_config: {
        value: cdktf.stringToHclTerraform(this._operatorConfig),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      parallel_number: {
        value: cdktf.numberToHclTerraform(this._parallelNumber),
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
      restart_when_exception: {
        value: cdktf.booleanToHclTerraform(this._restartWhenException),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      resume_checkpoint: {
        value: cdktf.booleanToHclTerraform(this._resumeCheckpoint),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      resume_max_num: {
        value: cdktf.numberToHclTerraform(this._resumeMaxNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      run_mode: {
        value: cdktf.stringToHclTerraform(this._runMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      runtime_config: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._runtimeConfig),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      smn_topic: {
        value: cdktf.stringToHclTerraform(this._smnTopic),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      sql: {
        value: cdktf.stringToHclTerraform(this._sql),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      static_estimator: {
        value: cdktf.booleanToHclTerraform(this._staticEstimator),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      static_estimator_config: {
        value: cdktf.stringToHclTerraform(this._staticEstimatorConfig),
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
      tm_cus: {
        value: cdktf.numberToHclTerraform(this._tmCus),
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
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      udf_jar_url: {
        value: cdktf.stringToHclTerraform(this._udfJarUrl),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeouts: {
        value: dliFlinksqlJobTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DliFlinksqlJobTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DliSqlJobConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#database_name DliSqlJob#database_name}
  */
  readonly databaseName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#id DliSqlJob#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#queue_name DliSqlJob#queue_name}
  */
  readonly queueName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#region DliSqlJob#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#sql DliSqlJob#sql}
  */
  readonly sql: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#tags DliSqlJob#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * conf block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#conf DliSqlJob#conf}
  */
  readonly conf?: DliSqlJobConf;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#timeouts DliSqlJob#timeouts}
  */
  readonly timeouts?: DliSqlJobTimeouts;
}
export interface DliSqlJobConf {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#dli_sql_job_timeout DliSqlJob#dli_sql_job_timeout}
  */
  readonly dliSqlJobTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#dli_sql_sqlasync_enabled DliSqlJob#dli_sql_sqlasync_enabled}
  */
  readonly dliSqlSqlasyncEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#spark_sql_auto_broadcast_join_threshold DliSqlJob#spark_sql_auto_broadcast_join_threshold}
  */
  readonly sparkSqlAutoBroadcastJoinThreshold?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#spark_sql_bad_records_path DliSqlJob#spark_sql_bad_records_path}
  */
  readonly sparkSqlBadRecordsPath?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#spark_sql_dynamic_partition_overwrite_enabled DliSqlJob#spark_sql_dynamic_partition_overwrite_enabled}
  */
  readonly sparkSqlDynamicPartitionOverwriteEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#spark_sql_files_max_partition_bytes DliSqlJob#spark_sql_files_max_partition_bytes}
  */
  readonly sparkSqlFilesMaxPartitionBytes?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#spark_sql_max_records_per_file DliSqlJob#spark_sql_max_records_per_file}
  */
  readonly sparkSqlMaxRecordsPerFile?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#spark_sql_shuffle_partitions DliSqlJob#spark_sql_shuffle_partitions}
  */
  readonly sparkSqlShufflePartitions?: number;
}

export function dliSqlJobConfToTerraform(struct?: DliSqlJobConfOutputReference | DliSqlJobConf): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dli_sql_job_timeout: cdktf.numberToTerraform(struct!.dliSqlJobTimeout),
    dli_sql_sqlasync_enabled: cdktf.booleanToTerraform(struct!.dliSqlSqlasyncEnabled),
    spark_sql_auto_broadcast_join_threshold: cdktf.numberToTerraform(struct!.sparkSqlAutoBroadcastJoinThreshold),
    spark_sql_bad_records_path: cdktf.stringToTerraform(struct!.sparkSqlBadRecordsPath),
    spark_sql_dynamic_partition_overwrite_enabled: cdktf.booleanToTerraform(struct!.sparkSqlDynamicPartitionOverwriteEnabled),
    spark_sql_files_max_partition_bytes: cdktf.numberToTerraform(struct!.sparkSqlFilesMaxPartitionBytes),
    spark_sql_max_records_per_file: cdktf.numberToTerraform(struct!.sparkSqlMaxRecordsPerFile),
    spark_sql_shuffle_partitions: cdktf.numberToTerraform(struct!.sparkSqlShufflePartitions),
  }
}


export function dliSqlJobConfToHclTerraform(struct?: DliSqlJobConfOutputReference | DliSqlJobConf): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    dli_sql_job_timeout: {
      value: cdktf.numberToHclTerraform(struct!.dliSqlJobTimeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    dli_sql_sqlasync_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.dliSqlSqlasyncEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    spark_sql_auto_broadcast_join_threshold: {
      value: cdktf.numberToHclTerraform(struct!.sparkSqlAutoBroadcastJoinThreshold),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    spark_sql_bad_records_path: {
      value: cdktf.stringToHclTerraform(struct!.sparkSqlBadRecordsPath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    spark_sql_dynamic_partition_overwrite_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.sparkSqlDynamicPartitionOverwriteEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    spark_sql_files_max_partition_bytes: {
      value: cdktf.numberToHclTerraform(struct!.sparkSqlFilesMaxPartitionBytes),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    spark_sql_max_records_per_file: {
      value: cdktf.numberToHclTerraform(struct!.sparkSqlMaxRecordsPerFile),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    spark_sql_shuffle_partitions: {
      value: cdktf.numberToHclTerraform(struct!.sparkSqlShufflePartitions),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DliSqlJobConfOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DliSqlJobConf | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dliSqlJobTimeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.dliSqlJobTimeout = this._dliSqlJobTimeout;
    }
    if (this._dliSqlSqlasyncEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.dliSqlSqlasyncEnabled = this._dliSqlSqlasyncEnabled;
    }
    if (this._sparkSqlAutoBroadcastJoinThreshold !== undefined) {
      hasAnyValues = true;
      internalValueResult.sparkSqlAutoBroadcastJoinThreshold = this._sparkSqlAutoBroadcastJoinThreshold;
    }
    if (this._sparkSqlBadRecordsPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.sparkSqlBadRecordsPath = this._sparkSqlBadRecordsPath;
    }
    if (this._sparkSqlDynamicPartitionOverwriteEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.sparkSqlDynamicPartitionOverwriteEnabled = this._sparkSqlDynamicPartitionOverwriteEnabled;
    }
    if (this._sparkSqlFilesMaxPartitionBytes !== undefined) {
      hasAnyValues = true;
      internalValueResult.sparkSqlFilesMaxPartitionBytes = this._sparkSqlFilesMaxPartitionBytes;
    }
    if (this._sparkSqlMaxRecordsPerFile !== undefined) {
      hasAnyValues = true;
      internalValueResult.sparkSqlMaxRecordsPerFile = this._sparkSqlMaxRecordsPerFile;
    }
    if (this._sparkSqlShufflePartitions !== undefined) {
      hasAnyValues = true;
      internalValueResult.sparkSqlShufflePartitions = this._sparkSqlShufflePartitions;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliSqlJobConf | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._dliSqlJobTimeout = undefined;
      this._dliSqlSqlasyncEnabled = undefined;
      this._sparkSqlAutoBroadcastJoinThreshold = undefined;
      this._sparkSqlBadRecordsPath = undefined;
      this._sparkSqlDynamicPartitionOverwriteEnabled = undefined;
      this._sparkSqlFilesMaxPartitionBytes = undefined;
      this._sparkSqlMaxRecordsPerFile = undefined;
      this._sparkSqlShufflePartitions = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._dliSqlJobTimeout = value.dliSqlJobTimeout;
      this._dliSqlSqlasyncEnabled = value.dliSqlSqlasyncEnabled;
      this._sparkSqlAutoBroadcastJoinThreshold = value.sparkSqlAutoBroadcastJoinThreshold;
      this._sparkSqlBadRecordsPath = value.sparkSqlBadRecordsPath;
      this._sparkSqlDynamicPartitionOverwriteEnabled = value.sparkSqlDynamicPartitionOverwriteEnabled;
      this._sparkSqlFilesMaxPartitionBytes = value.sparkSqlFilesMaxPartitionBytes;
      this._sparkSqlMaxRecordsPerFile = value.sparkSqlMaxRecordsPerFile;
      this._sparkSqlShufflePartitions = value.sparkSqlShufflePartitions;
    }
  }

  // dli_sql_job_timeout - computed: false, optional: true, required: false
  private _dliSqlJobTimeout?: number; 
  public get dliSqlJobTimeout() {
    return this.getNumberAttribute('dli_sql_job_timeout');
  }
  public set dliSqlJobTimeout(value: number) {
    this._dliSqlJobTimeout = value;
  }
  public resetDliSqlJobTimeout() {
    this._dliSqlJobTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dliSqlJobTimeoutInput() {
    return this._dliSqlJobTimeout;
  }

  // dli_sql_sqlasync_enabled - computed: false, optional: true, required: false
  private _dliSqlSqlasyncEnabled?: boolean | cdktf.IResolvable; 
  public get dliSqlSqlasyncEnabled() {
    return this.getBooleanAttribute('dli_sql_sqlasync_enabled');
  }
  public set dliSqlSqlasyncEnabled(value: boolean | cdktf.IResolvable) {
    this._dliSqlSqlasyncEnabled = value;
  }
  public resetDliSqlSqlasyncEnabled() {
    this._dliSqlSqlasyncEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dliSqlSqlasyncEnabledInput() {
    return this._dliSqlSqlasyncEnabled;
  }

  // spark_sql_auto_broadcast_join_threshold - computed: false, optional: true, required: false
  private _sparkSqlAutoBroadcastJoinThreshold?: number; 
  public get sparkSqlAutoBroadcastJoinThreshold() {
    return this.getNumberAttribute('spark_sql_auto_broadcast_join_threshold');
  }
  public set sparkSqlAutoBroadcastJoinThreshold(value: number) {
    this._sparkSqlAutoBroadcastJoinThreshold = value;
  }
  public resetSparkSqlAutoBroadcastJoinThreshold() {
    this._sparkSqlAutoBroadcastJoinThreshold = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sparkSqlAutoBroadcastJoinThresholdInput() {
    return this._sparkSqlAutoBroadcastJoinThreshold;
  }

  // spark_sql_bad_records_path - computed: false, optional: true, required: false
  private _sparkSqlBadRecordsPath?: string; 
  public get sparkSqlBadRecordsPath() {
    return this.getStringAttribute('spark_sql_bad_records_path');
  }
  public set sparkSqlBadRecordsPath(value: string) {
    this._sparkSqlBadRecordsPath = value;
  }
  public resetSparkSqlBadRecordsPath() {
    this._sparkSqlBadRecordsPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sparkSqlBadRecordsPathInput() {
    return this._sparkSqlBadRecordsPath;
  }

  // spark_sql_dynamic_partition_overwrite_enabled - computed: false, optional: true, required: false
  private _sparkSqlDynamicPartitionOverwriteEnabled?: boolean | cdktf.IResolvable; 
  public get sparkSqlDynamicPartitionOverwriteEnabled() {
    return this.getBooleanAttribute('spark_sql_dynamic_partition_overwrite_enabled');
  }
  public set sparkSqlDynamicPartitionOverwriteEnabled(value: boolean | cdktf.IResolvable) {
    this._sparkSqlDynamicPartitionOverwriteEnabled = value;
  }
  public resetSparkSqlDynamicPartitionOverwriteEnabled() {
    this._sparkSqlDynamicPartitionOverwriteEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sparkSqlDynamicPartitionOverwriteEnabledInput() {
    return this._sparkSqlDynamicPartitionOverwriteEnabled;
  }

  // spark_sql_files_max_partition_bytes - computed: false, optional: true, required: false
  private _sparkSqlFilesMaxPartitionBytes?: number; 
  public get sparkSqlFilesMaxPartitionBytes() {
    return this.getNumberAttribute('spark_sql_files_max_partition_bytes');
  }
  public set sparkSqlFilesMaxPartitionBytes(value: number) {
    this._sparkSqlFilesMaxPartitionBytes = value;
  }
  public resetSparkSqlFilesMaxPartitionBytes() {
    this._sparkSqlFilesMaxPartitionBytes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sparkSqlFilesMaxPartitionBytesInput() {
    return this._sparkSqlFilesMaxPartitionBytes;
  }

  // spark_sql_max_records_per_file - computed: false, optional: true, required: false
  private _sparkSqlMaxRecordsPerFile?: number; 
  public get sparkSqlMaxRecordsPerFile() {
    return this.getNumberAttribute('spark_sql_max_records_per_file');
  }
  public set sparkSqlMaxRecordsPerFile(value: number) {
    this._sparkSqlMaxRecordsPerFile = value;
  }
  public resetSparkSqlMaxRecordsPerFile() {
    this._sparkSqlMaxRecordsPerFile = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sparkSqlMaxRecordsPerFileInput() {
    return this._sparkSqlMaxRecordsPerFile;
  }

  // spark_sql_shuffle_partitions - computed: false, optional: true, required: false
  private _sparkSqlShufflePartitions?: number; 
  public get sparkSqlShufflePartitions() {
    return this.getNumberAttribute('spark_sql_shuffle_partitions');
  }
  public set sparkSqlShufflePartitions(value: number) {
    this._sparkSqlShufflePartitions = value;
  }
  public resetSparkSqlShufflePartitions() {
    this._sparkSqlShufflePartitions = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sparkSqlShufflePartitionsInput() {
    return this._sparkSqlShufflePartitions;
  }
}
export interface DliSqlJobTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#create DliSqlJob#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#delete DliSqlJob#delete}
  */
  readonly delete?: string;
}

export function dliSqlJobTimeoutsToTerraform(struct?: DliSqlJobTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function dliSqlJobTimeoutsToHclTerraform(struct?: DliSqlJobTimeouts | cdktf.IResolvable): any {
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

export class DliSqlJobTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DliSqlJobTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DliSqlJobTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job huaweicloud_dli_sql_job}
*/
export class DliSqlJob extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dli_sql_job";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DliSqlJob resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DliSqlJob to import
  * @param importFromId The id of the existing DliSqlJob that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DliSqlJob to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dli_sql_job", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_sql_job huaweicloud_dli_sql_job} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DliSqlJobConfig
  */
  public constructor(scope: Construct, id: string, config: DliSqlJobConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dli_sql_job',
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
    this._databaseName = config.databaseName;
    this._id = config.id;
    this._queueName = config.queueName;
    this._region = config.region;
    this._sql = config.sql;
    this._tags = config.tags;
    this._conf.internalValue = config.conf;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // duration - computed: true, optional: false, required: false
  public get duration() {
    return this.getNumberAttribute('duration');
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

  // job_type - computed: true, optional: false, required: false
  public get jobType() {
    return this.getStringAttribute('job_type');
  }

  // owner - computed: true, optional: false, required: false
  public get owner() {
    return this.getStringAttribute('owner');
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

  // rows - computed: true, optional: false, required: false
  private _rows = new cdktf.StringListList(this, "rows", false);
  public get rows() {
    return this._rows;
  }

  // schema - computed: true, optional: false, required: false
  private _schema = new cdktf.StringMapList(this, "schema", false);
  public get schema() {
    return this._schema;
  }

  // sql - computed: false, optional: false, required: true
  private _sql?: string; 
  public get sql() {
    return this.getStringAttribute('sql');
  }
  public set sql(value: string) {
    this._sql = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sqlInput() {
    return this._sql;
  }

  // start_time - computed: true, optional: false, required: false
  public get startTime() {
    return this.getStringAttribute('start_time');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // conf - computed: false, optional: true, required: false
  private _conf = new DliSqlJobConfOutputReference(this, "conf");
  public get conf() {
    return this._conf;
  }
  public putConf(value: DliSqlJobConf) {
    this._conf.internalValue = value;
  }
  public resetConf() {
    this._conf.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get confInput() {
    return this._conf.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DliSqlJobTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DliSqlJobTimeouts) {
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
      database_name: cdktf.stringToTerraform(this._databaseName),
      id: cdktf.stringToTerraform(this._id),
      queue_name: cdktf.stringToTerraform(this._queueName),
      region: cdktf.stringToTerraform(this._region),
      sql: cdktf.stringToTerraform(this._sql),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      conf: dliSqlJobConfToTerraform(this._conf.internalValue),
      timeouts: dliSqlJobTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      database_name: {
        value: cdktf.stringToHclTerraform(this._databaseName),
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
      sql: {
        value: cdktf.stringToHclTerraform(this._sql),
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
      conf: {
        value: dliSqlJobConfToHclTerraform(this._conf.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DliSqlJobConfList",
      },
      timeouts: {
        value: dliSqlJobTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DliSqlJobTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

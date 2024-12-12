// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafkav2_smart_connect_tasks
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDmsKafkav2SmartConnectTasksConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafkav2_smart_connect_tasks#id DataHuaweicloudDmsKafkav2SmartConnectTasks#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the kafka instance ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafkav2_smart_connect_tasks#instance_id DataHuaweicloudDmsKafkav2SmartConnectTasks#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafkav2_smart_connect_tasks#region DataHuaweicloudDmsKafkav2SmartConnectTasks#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTask {
}

export function dataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTaskToTerraform(struct?: DataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTask): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTaskToHclTerraform(struct?: DataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTask): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTaskOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTask | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTask | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // consumer_strategy - computed: true, optional: false, required: false
  public get consumerStrategy() {
    return this.getStringAttribute('consumer_strategy');
  }

  // deliver_time_interval - computed: true, optional: false, required: false
  public get deliverTimeInterval() {
    return this.getNumberAttribute('deliver_time_interval');
  }

  // destination_file_type - computed: true, optional: false, required: false
  public get destinationFileType() {
    return this.getStringAttribute('destination_file_type');
  }

  // flush_size - computed: true, optional: false, required: false
  public get flushSize() {
    return this.getNumberAttribute('flush_size');
  }

  // key_converter - computed: true, optional: false, required: false
  public get keyConverter() {
    return this.getStringAttribute('key_converter');
  }

  // kv_delimiter - computed: true, optional: false, required: false
  public get kvDelimiter() {
    return this.getStringAttribute('kv_delimiter');
  }

  // obs_bucket_name - computed: true, optional: false, required: false
  public get obsBucketName() {
    return this.getStringAttribute('obs_bucket_name');
  }

  // obs_part_size - computed: true, optional: false, required: false
  public get obsPartSize() {
    return this.getNumberAttribute('obs_part_size');
  }

  // obs_path - computed: true, optional: false, required: false
  public get obsPath() {
    return this.getStringAttribute('obs_path');
  }

  // partition_format - computed: true, optional: false, required: false
  public get partitionFormat() {
    return this.getStringAttribute('partition_format');
  }

  // partitioner_class - computed: true, optional: false, required: false
  public get partitionerClass() {
    return this.getStringAttribute('partitioner_class');
  }

  // record_delimiter - computed: true, optional: false, required: false
  public get recordDelimiter() {
    return this.getStringAttribute('record_delimiter');
  }

  // schema_generator_class - computed: true, optional: false, required: false
  public get schemaGeneratorClass() {
    return this.getStringAttribute('schema_generator_class');
  }

  // store_keys - computed: true, optional: false, required: false
  public get storeKeys() {
    return this.getBooleanAttribute('store_keys');
  }

  // timezone - computed: true, optional: false, required: false
  public get timezone() {
    return this.getStringAttribute('timezone');
  }

  // value_converter - computed: true, optional: false, required: false
  public get valueConverter() {
    return this.getStringAttribute('value_converter');
  }
}

export class DataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTaskList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTaskOutputReference {
    return new DataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTaskOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTask {
}

export function dataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTaskToTerraform(struct?: DataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTask): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTaskToHclTerraform(struct?: DataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTask): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTaskOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTask | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTask | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // compression_type - computed: true, optional: false, required: false
  public get compressionType() {
    return this.getStringAttribute('compression_type');
  }

  // consumer_strategy - computed: true, optional: false, required: false
  public get consumerStrategy() {
    return this.getStringAttribute('consumer_strategy');
  }

  // current_instance_alias - computed: true, optional: false, required: false
  public get currentInstanceAlias() {
    return this.getStringAttribute('current_instance_alias');
  }

  // direction - computed: true, optional: false, required: false
  public get direction() {
    return this.getStringAttribute('direction');
  }

  // peer_instance_address - computed: true, optional: false, required: false
  public get peerInstanceAddress() {
    return this.getListAttribute('peer_instance_address');
  }

  // peer_instance_alias - computed: true, optional: false, required: false
  public get peerInstanceAlias() {
    return this.getStringAttribute('peer_instance_alias');
  }

  // peer_instance_id - computed: true, optional: false, required: false
  public get peerInstanceId() {
    return this.getStringAttribute('peer_instance_id');
  }

  // provenance_header_enabled - computed: true, optional: false, required: false
  public get provenanceHeaderEnabled() {
    return this.getBooleanAttribute('provenance_header_enabled');
  }

  // rename_topic_enabled - computed: true, optional: false, required: false
  public get renameTopicEnabled() {
    return this.getBooleanAttribute('rename_topic_enabled');
  }

  // replication_factor - computed: true, optional: false, required: false
  public get replicationFactor() {
    return this.getNumberAttribute('replication_factor');
  }

  // sasl_mechanism - computed: true, optional: false, required: false
  public get saslMechanism() {
    return this.getStringAttribute('sasl_mechanism');
  }

  // security_protocol - computed: true, optional: false, required: false
  public get securityProtocol() {
    return this.getStringAttribute('security_protocol');
  }

  // sync_consumer_offsets_enabled - computed: true, optional: false, required: false
  public get syncConsumerOffsetsEnabled() {
    return this.getBooleanAttribute('sync_consumer_offsets_enabled');
  }

  // task_num - computed: true, optional: false, required: false
  public get taskNum() {
    return this.getNumberAttribute('task_num');
  }

  // topics_mapping - computed: true, optional: false, required: false
  public get topicsMapping() {
    return this.getListAttribute('topics_mapping');
  }

  // user_name - computed: true, optional: false, required: false
  public get userName() {
    return this.getStringAttribute('user_name');
  }
}

export class DataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTaskList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTaskOutputReference {
    return new DataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTaskOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDmsKafkav2SmartConnectTasksTasks {
}

export function dataHuaweicloudDmsKafkav2SmartConnectTasksTasksToTerraform(struct?: DataHuaweicloudDmsKafkav2SmartConnectTasksTasks): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDmsKafkav2SmartConnectTasksTasksToHclTerraform(struct?: DataHuaweicloudDmsKafkav2SmartConnectTasksTasks): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDmsKafkav2SmartConnectTasksTasksOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDmsKafkav2SmartConnectTasksTasks | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDmsKafkav2SmartConnectTasksTasks | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // destination_task - computed: true, optional: false, required: false
  private _destinationTask = new DataHuaweicloudDmsKafkav2SmartConnectTasksTasksDestinationTaskList(this, "destination_task", false);
  public get destinationTask() {
    return this._destinationTask;
  }

  // destination_type - computed: true, optional: false, required: false
  public get destinationType() {
    return this.getStringAttribute('destination_type');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // source_task - computed: true, optional: false, required: false
  private _sourceTask = new DataHuaweicloudDmsKafkav2SmartConnectTasksTasksSourceTaskList(this, "source_task", false);
  public get sourceTask() {
    return this._sourceTask;
  }

  // source_type - computed: true, optional: false, required: false
  public get sourceType() {
    return this.getStringAttribute('source_type');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // task_name - computed: true, optional: false, required: false
  public get taskName() {
    return this.getStringAttribute('task_name');
  }

  // topics - computed: true, optional: false, required: false
  public get topics() {
    return this.getListAttribute('topics');
  }

  // topics_regex - computed: true, optional: false, required: false
  public get topicsRegex() {
    return this.getStringAttribute('topics_regex');
  }
}

export class DataHuaweicloudDmsKafkav2SmartConnectTasksTasksList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDmsKafkav2SmartConnectTasksTasksOutputReference {
    return new DataHuaweicloudDmsKafkav2SmartConnectTasksTasksOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafkav2_smart_connect_tasks huaweicloud_dms_kafkav2_smart_connect_tasks}
*/
export class DataHuaweicloudDmsKafkav2SmartConnectTasks extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_kafkav2_smart_connect_tasks";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDmsKafkav2SmartConnectTasks resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDmsKafkav2SmartConnectTasks to import
  * @param importFromId The id of the existing DataHuaweicloudDmsKafkav2SmartConnectTasks that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafkav2_smart_connect_tasks#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDmsKafkav2SmartConnectTasks to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_kafkav2_smart_connect_tasks", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dms_kafkav2_smart_connect_tasks huaweicloud_dms_kafkav2_smart_connect_tasks} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDmsKafkav2SmartConnectTasksConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDmsKafkav2SmartConnectTasksConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_kafkav2_smart_connect_tasks',
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
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
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

  // tasks - computed: true, optional: false, required: false
  private _tasks = new DataHuaweicloudDmsKafkav2SmartConnectTasksTasksList(this, "tasks", false);
  public get tasks() {
    return this._tasks;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
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

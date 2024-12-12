// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsKafkav2SmartConnectTaskConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the destination type of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#destination_type DmsKafkav2SmartConnectTask#destination_type}
  */
  readonly destinationType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#id DmsKafkav2SmartConnectTask#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the kafka instance ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#instance_id DmsKafkav2SmartConnectTask#instance_id}
  */
  readonly instanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#region DmsKafkav2SmartConnectTask#region}
  */
  readonly region?: string;
  /**
  * Specifies the source type of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#source_type DmsKafkav2SmartConnectTask#source_type}
  */
  readonly sourceType?: string;
  /**
  * Specifies whether to start a task later.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#start_later DmsKafkav2SmartConnectTask#start_later}
  */
  readonly startLater?: boolean | cdktf.IResolvable;
  /**
  * Specifies the smart connect task name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#task_name DmsKafkav2SmartConnectTask#task_name}
  */
  readonly taskName: string;
  /**
  * Specifies the topics list of the task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#topics DmsKafkav2SmartConnectTask#topics}
  */
  readonly topics?: string[];
  /**
  * Specifies the topics regular expression of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#topics_regex DmsKafkav2SmartConnectTask#topics_regex}
  */
  readonly topicsRegex?: string;
  /**
  * destination_task block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#destination_task DmsKafkav2SmartConnectTask#destination_task}
  */
  readonly destinationTask?: DmsKafkav2SmartConnectTaskDestinationTask;
  /**
  * source_task block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#source_task DmsKafkav2SmartConnectTask#source_task}
  */
  readonly sourceTask?: DmsKafkav2SmartConnectTaskSourceTask;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#timeouts DmsKafkav2SmartConnectTask#timeouts}
  */
  readonly timeouts?: DmsKafkav2SmartConnectTaskTimeouts;
}
export interface DmsKafkav2SmartConnectTaskDestinationTask {
  /**
  * Specifies the access key used to access the OBS bucket.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#access_key DmsKafkav2SmartConnectTask#access_key}
  */
  readonly accessKey?: string;
  /**
  * Specifies the consumer strategy of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#consumer_strategy DmsKafkav2SmartConnectTask#consumer_strategy}
  */
  readonly consumerStrategy?: string;
  /**
  * Specifies the deliver time interval of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#deliver_time_interval DmsKafkav2SmartConnectTask#deliver_time_interval}
  */
  readonly deliverTimeInterval?: number;
  /**
  * Specifies the destination file type of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#destination_file_type DmsKafkav2SmartConnectTask#destination_file_type}
  */
  readonly destinationFileType?: string;
  /**
  * Specifies the obs bucket name of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#obs_bucket_name DmsKafkav2SmartConnectTask#obs_bucket_name}
  */
  readonly obsBucketName?: string;
  /**
  * Specifies the obs path of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#obs_path DmsKafkav2SmartConnectTask#obs_path}
  */
  readonly obsPath?: string;
  /**
  * Specifies the partiton format of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#partition_format DmsKafkav2SmartConnectTask#partition_format}
  */
  readonly partitionFormat?: string;
  /**
  * Specifies the record delimiter of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#record_delimiter DmsKafkav2SmartConnectTask#record_delimiter}
  */
  readonly recordDelimiter?: string;
  /**
  * Specifies the secret access key used to access the OBS bucket.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#secret_key DmsKafkav2SmartConnectTask#secret_key}
  */
  readonly secretKey?: string;
  /**
  * Specifies whether to store keys.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#store_keys DmsKafkav2SmartConnectTask#store_keys}
  */
  readonly storeKeys?: boolean | cdktf.IResolvable;
}

export function dmsKafkav2SmartConnectTaskDestinationTaskToTerraform(struct?: DmsKafkav2SmartConnectTaskDestinationTaskOutputReference | DmsKafkav2SmartConnectTaskDestinationTask): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_key: cdktf.stringToTerraform(struct!.accessKey),
    consumer_strategy: cdktf.stringToTerraform(struct!.consumerStrategy),
    deliver_time_interval: cdktf.numberToTerraform(struct!.deliverTimeInterval),
    destination_file_type: cdktf.stringToTerraform(struct!.destinationFileType),
    obs_bucket_name: cdktf.stringToTerraform(struct!.obsBucketName),
    obs_path: cdktf.stringToTerraform(struct!.obsPath),
    partition_format: cdktf.stringToTerraform(struct!.partitionFormat),
    record_delimiter: cdktf.stringToTerraform(struct!.recordDelimiter),
    secret_key: cdktf.stringToTerraform(struct!.secretKey),
    store_keys: cdktf.booleanToTerraform(struct!.storeKeys),
  }
}


export function dmsKafkav2SmartConnectTaskDestinationTaskToHclTerraform(struct?: DmsKafkav2SmartConnectTaskDestinationTaskOutputReference | DmsKafkav2SmartConnectTaskDestinationTask): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    access_key: {
      value: cdktf.stringToHclTerraform(struct!.accessKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    consumer_strategy: {
      value: cdktf.stringToHclTerraform(struct!.consumerStrategy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    deliver_time_interval: {
      value: cdktf.numberToHclTerraform(struct!.deliverTimeInterval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    destination_file_type: {
      value: cdktf.stringToHclTerraform(struct!.destinationFileType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_bucket_name: {
      value: cdktf.stringToHclTerraform(struct!.obsBucketName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_path: {
      value: cdktf.stringToHclTerraform(struct!.obsPath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    partition_format: {
      value: cdktf.stringToHclTerraform(struct!.partitionFormat),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    record_delimiter: {
      value: cdktf.stringToHclTerraform(struct!.recordDelimiter),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    secret_key: {
      value: cdktf.stringToHclTerraform(struct!.secretKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    store_keys: {
      value: cdktf.booleanToHclTerraform(struct!.storeKeys),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsKafkav2SmartConnectTaskDestinationTaskOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DmsKafkav2SmartConnectTaskDestinationTask | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessKey = this._accessKey;
    }
    if (this._consumerStrategy !== undefined) {
      hasAnyValues = true;
      internalValueResult.consumerStrategy = this._consumerStrategy;
    }
    if (this._deliverTimeInterval !== undefined) {
      hasAnyValues = true;
      internalValueResult.deliverTimeInterval = this._deliverTimeInterval;
    }
    if (this._destinationFileType !== undefined) {
      hasAnyValues = true;
      internalValueResult.destinationFileType = this._destinationFileType;
    }
    if (this._obsBucketName !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsBucketName = this._obsBucketName;
    }
    if (this._obsPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsPath = this._obsPath;
    }
    if (this._partitionFormat !== undefined) {
      hasAnyValues = true;
      internalValueResult.partitionFormat = this._partitionFormat;
    }
    if (this._recordDelimiter !== undefined) {
      hasAnyValues = true;
      internalValueResult.recordDelimiter = this._recordDelimiter;
    }
    if (this._secretKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.secretKey = this._secretKey;
    }
    if (this._storeKeys !== undefined) {
      hasAnyValues = true;
      internalValueResult.storeKeys = this._storeKeys;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsKafkav2SmartConnectTaskDestinationTask | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accessKey = undefined;
      this._consumerStrategy = undefined;
      this._deliverTimeInterval = undefined;
      this._destinationFileType = undefined;
      this._obsBucketName = undefined;
      this._obsPath = undefined;
      this._partitionFormat = undefined;
      this._recordDelimiter = undefined;
      this._secretKey = undefined;
      this._storeKeys = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accessKey = value.accessKey;
      this._consumerStrategy = value.consumerStrategy;
      this._deliverTimeInterval = value.deliverTimeInterval;
      this._destinationFileType = value.destinationFileType;
      this._obsBucketName = value.obsBucketName;
      this._obsPath = value.obsPath;
      this._partitionFormat = value.partitionFormat;
      this._recordDelimiter = value.recordDelimiter;
      this._secretKey = value.secretKey;
      this._storeKeys = value.storeKeys;
    }
  }

  // access_key - computed: false, optional: true, required: false
  private _accessKey?: string; 
  public get accessKey() {
    return this.getStringAttribute('access_key');
  }
  public set accessKey(value: string) {
    this._accessKey = value;
  }
  public resetAccessKey() {
    this._accessKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessKeyInput() {
    return this._accessKey;
  }

  // consumer_strategy - computed: false, optional: true, required: false
  private _consumerStrategy?: string; 
  public get consumerStrategy() {
    return this.getStringAttribute('consumer_strategy');
  }
  public set consumerStrategy(value: string) {
    this._consumerStrategy = value;
  }
  public resetConsumerStrategy() {
    this._consumerStrategy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get consumerStrategyInput() {
    return this._consumerStrategy;
  }

  // deliver_time_interval - computed: false, optional: true, required: false
  private _deliverTimeInterval?: number; 
  public get deliverTimeInterval() {
    return this.getNumberAttribute('deliver_time_interval');
  }
  public set deliverTimeInterval(value: number) {
    this._deliverTimeInterval = value;
  }
  public resetDeliverTimeInterval() {
    this._deliverTimeInterval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deliverTimeIntervalInput() {
    return this._deliverTimeInterval;
  }

  // destination_file_type - computed: false, optional: true, required: false
  private _destinationFileType?: string; 
  public get destinationFileType() {
    return this.getStringAttribute('destination_file_type');
  }
  public set destinationFileType(value: string) {
    this._destinationFileType = value;
  }
  public resetDestinationFileType() {
    this._destinationFileType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationFileTypeInput() {
    return this._destinationFileType;
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

  // obs_bucket_name - computed: false, optional: true, required: false
  private _obsBucketName?: string; 
  public get obsBucketName() {
    return this.getStringAttribute('obs_bucket_name');
  }
  public set obsBucketName(value: string) {
    this._obsBucketName = value;
  }
  public resetObsBucketName() {
    this._obsBucketName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsBucketNameInput() {
    return this._obsBucketName;
  }

  // obs_part_size - computed: true, optional: false, required: false
  public get obsPartSize() {
    return this.getNumberAttribute('obs_part_size');
  }

  // obs_path - computed: false, optional: true, required: false
  private _obsPath?: string; 
  public get obsPath() {
    return this.getStringAttribute('obs_path');
  }
  public set obsPath(value: string) {
    this._obsPath = value;
  }
  public resetObsPath() {
    this._obsPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsPathInput() {
    return this._obsPath;
  }

  // partition_format - computed: false, optional: true, required: false
  private _partitionFormat?: string; 
  public get partitionFormat() {
    return this.getStringAttribute('partition_format');
  }
  public set partitionFormat(value: string) {
    this._partitionFormat = value;
  }
  public resetPartitionFormat() {
    this._partitionFormat = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get partitionFormatInput() {
    return this._partitionFormat;
  }

  // partitioner_class - computed: true, optional: false, required: false
  public get partitionerClass() {
    return this.getStringAttribute('partitioner_class');
  }

  // record_delimiter - computed: false, optional: true, required: false
  private _recordDelimiter?: string; 
  public get recordDelimiter() {
    return this.getStringAttribute('record_delimiter');
  }
  public set recordDelimiter(value: string) {
    this._recordDelimiter = value;
  }
  public resetRecordDelimiter() {
    this._recordDelimiter = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recordDelimiterInput() {
    return this._recordDelimiter;
  }

  // schema_generator_class - computed: true, optional: false, required: false
  public get schemaGeneratorClass() {
    return this.getStringAttribute('schema_generator_class');
  }

  // secret_key - computed: false, optional: true, required: false
  private _secretKey?: string; 
  public get secretKey() {
    return this.getStringAttribute('secret_key');
  }
  public set secretKey(value: string) {
    this._secretKey = value;
  }
  public resetSecretKey() {
    this._secretKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretKeyInput() {
    return this._secretKey;
  }

  // store_keys - computed: false, optional: true, required: false
  private _storeKeys?: boolean | cdktf.IResolvable; 
  public get storeKeys() {
    return this.getBooleanAttribute('store_keys');
  }
  public set storeKeys(value: boolean | cdktf.IResolvable) {
    this._storeKeys = value;
  }
  public resetStoreKeys() {
    this._storeKeys = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storeKeysInput() {
    return this._storeKeys;
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
export interface DmsKafkav2SmartConnectTaskSourceTask {
  /**
  * Specifies the compression algorithm to use for copying messages.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#compression_type DmsKafkav2SmartConnectTask#compression_type}
  */
  readonly compressionType?: string;
  /**
  * Specifies the start offset.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#consumer_strategy DmsKafkav2SmartConnectTask#consumer_strategy}
  */
  readonly consumerStrategy?: string;
  /**
  * Specifies the current Kafka instance alias.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#current_instance_alias DmsKafkav2SmartConnectTask#current_instance_alias}
  */
  readonly currentInstanceAlias?: string;
  /**
  * Specifies the sync direction.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#direction DmsKafkav2SmartConnectTask#direction}
  */
  readonly direction?: string;
  /**
  * Specifies the peer Kafka user password.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#password DmsKafkav2SmartConnectTask#password}
  */
  readonly password?: string;
  /**
  * Specifies the peer Kafka instance address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#peer_instance_address DmsKafkav2SmartConnectTask#peer_instance_address}
  */
  readonly peerInstanceAddress?: string[];
  /**
  * Specifies the peer Kafka instance alias.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#peer_instance_alias DmsKafkav2SmartConnectTask#peer_instance_alias}
  */
  readonly peerInstanceAlias?: string;
  /**
  * Specifies the peer Kafka instance ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#peer_instance_id DmsKafkav2SmartConnectTask#peer_instance_id}
  */
  readonly peerInstanceId?: string;
  /**
  * Specifies whether the message header contains the message source.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#provenance_header_enabled DmsKafkav2SmartConnectTask#provenance_header_enabled}
  */
  readonly provenanceHeaderEnabled?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether to rename the topic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#rename_topic_enabled DmsKafkav2SmartConnectTask#rename_topic_enabled}
  */
  readonly renameTopicEnabled?: boolean | cdktf.IResolvable;
  /**
  * Specifies the number of topic replicas.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#replication_factor DmsKafkav2SmartConnectTask#replication_factor}
  */
  readonly replicationFactor?: number;
  /**
  * Specifies the peer Kafka authentication mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#sasl_mechanism DmsKafkav2SmartConnectTask#sasl_mechanism}
  */
  readonly saslMechanism?: string;
  /**
  * Specifies the peer Kafka authentication.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#security_protocol DmsKafkav2SmartConnectTask#security_protocol}
  */
  readonly securityProtocol?: string;
  /**
  * Specifies whether to sync the consumption progress.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#sync_consumer_offsets_enabled DmsKafkav2SmartConnectTask#sync_consumer_offsets_enabled}
  */
  readonly syncConsumerOffsetsEnabled?: boolean | cdktf.IResolvable;
  /**
  * Specifies the number of data replication tasks.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#task_num DmsKafkav2SmartConnectTask#task_num}
  */
  readonly taskNum?: number;
  /**
  * Specifies the topic mapping, which is used to customize the target topic name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#topics_mapping DmsKafkav2SmartConnectTask#topics_mapping}
  */
  readonly topicsMapping?: string[];
  /**
  * Specifies the peer Kafka username.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#user_name DmsKafkav2SmartConnectTask#user_name}
  */
  readonly userName?: string;
}

export function dmsKafkav2SmartConnectTaskSourceTaskToTerraform(struct?: DmsKafkav2SmartConnectTaskSourceTaskOutputReference | DmsKafkav2SmartConnectTaskSourceTask): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    compression_type: cdktf.stringToTerraform(struct!.compressionType),
    consumer_strategy: cdktf.stringToTerraform(struct!.consumerStrategy),
    current_instance_alias: cdktf.stringToTerraform(struct!.currentInstanceAlias),
    direction: cdktf.stringToTerraform(struct!.direction),
    password: cdktf.stringToTerraform(struct!.password),
    peer_instance_address: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.peerInstanceAddress),
    peer_instance_alias: cdktf.stringToTerraform(struct!.peerInstanceAlias),
    peer_instance_id: cdktf.stringToTerraform(struct!.peerInstanceId),
    provenance_header_enabled: cdktf.booleanToTerraform(struct!.provenanceHeaderEnabled),
    rename_topic_enabled: cdktf.booleanToTerraform(struct!.renameTopicEnabled),
    replication_factor: cdktf.numberToTerraform(struct!.replicationFactor),
    sasl_mechanism: cdktf.stringToTerraform(struct!.saslMechanism),
    security_protocol: cdktf.stringToTerraform(struct!.securityProtocol),
    sync_consumer_offsets_enabled: cdktf.booleanToTerraform(struct!.syncConsumerOffsetsEnabled),
    task_num: cdktf.numberToTerraform(struct!.taskNum),
    topics_mapping: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.topicsMapping),
    user_name: cdktf.stringToTerraform(struct!.userName),
  }
}


export function dmsKafkav2SmartConnectTaskSourceTaskToHclTerraform(struct?: DmsKafkav2SmartConnectTaskSourceTaskOutputReference | DmsKafkav2SmartConnectTaskSourceTask): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    compression_type: {
      value: cdktf.stringToHclTerraform(struct!.compressionType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    consumer_strategy: {
      value: cdktf.stringToHclTerraform(struct!.consumerStrategy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    current_instance_alias: {
      value: cdktf.stringToHclTerraform(struct!.currentInstanceAlias),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    direction: {
      value: cdktf.stringToHclTerraform(struct!.direction),
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
    peer_instance_address: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.peerInstanceAddress),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    peer_instance_alias: {
      value: cdktf.stringToHclTerraform(struct!.peerInstanceAlias),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    peer_instance_id: {
      value: cdktf.stringToHclTerraform(struct!.peerInstanceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    provenance_header_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.provenanceHeaderEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    rename_topic_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.renameTopicEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    replication_factor: {
      value: cdktf.numberToHclTerraform(struct!.replicationFactor),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    sasl_mechanism: {
      value: cdktf.stringToHclTerraform(struct!.saslMechanism),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    security_protocol: {
      value: cdktf.stringToHclTerraform(struct!.securityProtocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sync_consumer_offsets_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.syncConsumerOffsetsEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    task_num: {
      value: cdktf.numberToHclTerraform(struct!.taskNum),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    topics_mapping: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.topicsMapping),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    user_name: {
      value: cdktf.stringToHclTerraform(struct!.userName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsKafkav2SmartConnectTaskSourceTaskOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DmsKafkav2SmartConnectTaskSourceTask | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._compressionType !== undefined) {
      hasAnyValues = true;
      internalValueResult.compressionType = this._compressionType;
    }
    if (this._consumerStrategy !== undefined) {
      hasAnyValues = true;
      internalValueResult.consumerStrategy = this._consumerStrategy;
    }
    if (this._currentInstanceAlias !== undefined) {
      hasAnyValues = true;
      internalValueResult.currentInstanceAlias = this._currentInstanceAlias;
    }
    if (this._direction !== undefined) {
      hasAnyValues = true;
      internalValueResult.direction = this._direction;
    }
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._peerInstanceAddress !== undefined) {
      hasAnyValues = true;
      internalValueResult.peerInstanceAddress = this._peerInstanceAddress;
    }
    if (this._peerInstanceAlias !== undefined) {
      hasAnyValues = true;
      internalValueResult.peerInstanceAlias = this._peerInstanceAlias;
    }
    if (this._peerInstanceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.peerInstanceId = this._peerInstanceId;
    }
    if (this._provenanceHeaderEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.provenanceHeaderEnabled = this._provenanceHeaderEnabled;
    }
    if (this._renameTopicEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.renameTopicEnabled = this._renameTopicEnabled;
    }
    if (this._replicationFactor !== undefined) {
      hasAnyValues = true;
      internalValueResult.replicationFactor = this._replicationFactor;
    }
    if (this._saslMechanism !== undefined) {
      hasAnyValues = true;
      internalValueResult.saslMechanism = this._saslMechanism;
    }
    if (this._securityProtocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.securityProtocol = this._securityProtocol;
    }
    if (this._syncConsumerOffsetsEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.syncConsumerOffsetsEnabled = this._syncConsumerOffsetsEnabled;
    }
    if (this._taskNum !== undefined) {
      hasAnyValues = true;
      internalValueResult.taskNum = this._taskNum;
    }
    if (this._topicsMapping !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicsMapping = this._topicsMapping;
    }
    if (this._userName !== undefined) {
      hasAnyValues = true;
      internalValueResult.userName = this._userName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsKafkav2SmartConnectTaskSourceTask | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._compressionType = undefined;
      this._consumerStrategy = undefined;
      this._currentInstanceAlias = undefined;
      this._direction = undefined;
      this._password = undefined;
      this._peerInstanceAddress = undefined;
      this._peerInstanceAlias = undefined;
      this._peerInstanceId = undefined;
      this._provenanceHeaderEnabled = undefined;
      this._renameTopicEnabled = undefined;
      this._replicationFactor = undefined;
      this._saslMechanism = undefined;
      this._securityProtocol = undefined;
      this._syncConsumerOffsetsEnabled = undefined;
      this._taskNum = undefined;
      this._topicsMapping = undefined;
      this._userName = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._compressionType = value.compressionType;
      this._consumerStrategy = value.consumerStrategy;
      this._currentInstanceAlias = value.currentInstanceAlias;
      this._direction = value.direction;
      this._password = value.password;
      this._peerInstanceAddress = value.peerInstanceAddress;
      this._peerInstanceAlias = value.peerInstanceAlias;
      this._peerInstanceId = value.peerInstanceId;
      this._provenanceHeaderEnabled = value.provenanceHeaderEnabled;
      this._renameTopicEnabled = value.renameTopicEnabled;
      this._replicationFactor = value.replicationFactor;
      this._saslMechanism = value.saslMechanism;
      this._securityProtocol = value.securityProtocol;
      this._syncConsumerOffsetsEnabled = value.syncConsumerOffsetsEnabled;
      this._taskNum = value.taskNum;
      this._topicsMapping = value.topicsMapping;
      this._userName = value.userName;
    }
  }

  // compression_type - computed: true, optional: true, required: false
  private _compressionType?: string; 
  public get compressionType() {
    return this.getStringAttribute('compression_type');
  }
  public set compressionType(value: string) {
    this._compressionType = value;
  }
  public resetCompressionType() {
    this._compressionType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get compressionTypeInput() {
    return this._compressionType;
  }

  // consumer_strategy - computed: true, optional: true, required: false
  private _consumerStrategy?: string; 
  public get consumerStrategy() {
    return this.getStringAttribute('consumer_strategy');
  }
  public set consumerStrategy(value: string) {
    this._consumerStrategy = value;
  }
  public resetConsumerStrategy() {
    this._consumerStrategy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get consumerStrategyInput() {
    return this._consumerStrategy;
  }

  // current_instance_alias - computed: true, optional: true, required: false
  private _currentInstanceAlias?: string; 
  public get currentInstanceAlias() {
    return this.getStringAttribute('current_instance_alias');
  }
  public set currentInstanceAlias(value: string) {
    this._currentInstanceAlias = value;
  }
  public resetCurrentInstanceAlias() {
    this._currentInstanceAlias = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get currentInstanceAliasInput() {
    return this._currentInstanceAlias;
  }

  // direction - computed: true, optional: true, required: false
  private _direction?: string; 
  public get direction() {
    return this.getStringAttribute('direction');
  }
  public set direction(value: string) {
    this._direction = value;
  }
  public resetDirection() {
    this._direction = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get directionInput() {
    return this._direction;
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

  // peer_instance_address - computed: true, optional: true, required: false
  private _peerInstanceAddress?: string[]; 
  public get peerInstanceAddress() {
    return cdktf.Fn.tolist(this.getListAttribute('peer_instance_address'));
  }
  public set peerInstanceAddress(value: string[]) {
    this._peerInstanceAddress = value;
  }
  public resetPeerInstanceAddress() {
    this._peerInstanceAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get peerInstanceAddressInput() {
    return this._peerInstanceAddress;
  }

  // peer_instance_alias - computed: true, optional: true, required: false
  private _peerInstanceAlias?: string; 
  public get peerInstanceAlias() {
    return this.getStringAttribute('peer_instance_alias');
  }
  public set peerInstanceAlias(value: string) {
    this._peerInstanceAlias = value;
  }
  public resetPeerInstanceAlias() {
    this._peerInstanceAlias = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get peerInstanceAliasInput() {
    return this._peerInstanceAlias;
  }

  // peer_instance_id - computed: false, optional: true, required: false
  private _peerInstanceId?: string; 
  public get peerInstanceId() {
    return this.getStringAttribute('peer_instance_id');
  }
  public set peerInstanceId(value: string) {
    this._peerInstanceId = value;
  }
  public resetPeerInstanceId() {
    this._peerInstanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get peerInstanceIdInput() {
    return this._peerInstanceId;
  }

  // provenance_header_enabled - computed: true, optional: true, required: false
  private _provenanceHeaderEnabled?: boolean | cdktf.IResolvable; 
  public get provenanceHeaderEnabled() {
    return this.getBooleanAttribute('provenance_header_enabled');
  }
  public set provenanceHeaderEnabled(value: boolean | cdktf.IResolvable) {
    this._provenanceHeaderEnabled = value;
  }
  public resetProvenanceHeaderEnabled() {
    this._provenanceHeaderEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get provenanceHeaderEnabledInput() {
    return this._provenanceHeaderEnabled;
  }

  // rename_topic_enabled - computed: true, optional: true, required: false
  private _renameTopicEnabled?: boolean | cdktf.IResolvable; 
  public get renameTopicEnabled() {
    return this.getBooleanAttribute('rename_topic_enabled');
  }
  public set renameTopicEnabled(value: boolean | cdktf.IResolvable) {
    this._renameTopicEnabled = value;
  }
  public resetRenameTopicEnabled() {
    this._renameTopicEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get renameTopicEnabledInput() {
    return this._renameTopicEnabled;
  }

  // replication_factor - computed: false, optional: true, required: false
  private _replicationFactor?: number; 
  public get replicationFactor() {
    return this.getNumberAttribute('replication_factor');
  }
  public set replicationFactor(value: number) {
    this._replicationFactor = value;
  }
  public resetReplicationFactor() {
    this._replicationFactor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get replicationFactorInput() {
    return this._replicationFactor;
  }

  // sasl_mechanism - computed: true, optional: true, required: false
  private _saslMechanism?: string; 
  public get saslMechanism() {
    return this.getStringAttribute('sasl_mechanism');
  }
  public set saslMechanism(value: string) {
    this._saslMechanism = value;
  }
  public resetSaslMechanism() {
    this._saslMechanism = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get saslMechanismInput() {
    return this._saslMechanism;
  }

  // security_protocol - computed: true, optional: true, required: false
  private _securityProtocol?: string; 
  public get securityProtocol() {
    return this.getStringAttribute('security_protocol');
  }
  public set securityProtocol(value: string) {
    this._securityProtocol = value;
  }
  public resetSecurityProtocol() {
    this._securityProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityProtocolInput() {
    return this._securityProtocol;
  }

  // sync_consumer_offsets_enabled - computed: true, optional: true, required: false
  private _syncConsumerOffsetsEnabled?: boolean | cdktf.IResolvable; 
  public get syncConsumerOffsetsEnabled() {
    return this.getBooleanAttribute('sync_consumer_offsets_enabled');
  }
  public set syncConsumerOffsetsEnabled(value: boolean | cdktf.IResolvable) {
    this._syncConsumerOffsetsEnabled = value;
  }
  public resetSyncConsumerOffsetsEnabled() {
    this._syncConsumerOffsetsEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get syncConsumerOffsetsEnabledInput() {
    return this._syncConsumerOffsetsEnabled;
  }

  // task_num - computed: false, optional: true, required: false
  private _taskNum?: number; 
  public get taskNum() {
    return this.getNumberAttribute('task_num');
  }
  public set taskNum(value: number) {
    this._taskNum = value;
  }
  public resetTaskNum() {
    this._taskNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get taskNumInput() {
    return this._taskNum;
  }

  // topics_mapping - computed: false, optional: true, required: false
  private _topicsMapping?: string[]; 
  public get topicsMapping() {
    return cdktf.Fn.tolist(this.getListAttribute('topics_mapping'));
  }
  public set topicsMapping(value: string[]) {
    this._topicsMapping = value;
  }
  public resetTopicsMapping() {
    this._topicsMapping = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicsMappingInput() {
    return this._topicsMapping;
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
}
export interface DmsKafkav2SmartConnectTaskTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#create DmsKafkav2SmartConnectTask#create}
  */
  readonly create?: string;
}

export function dmsKafkav2SmartConnectTaskTimeoutsToTerraform(struct?: DmsKafkav2SmartConnectTaskTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function dmsKafkav2SmartConnectTaskTimeoutsToHclTerraform(struct?: DmsKafkav2SmartConnectTaskTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsKafkav2SmartConnectTaskTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DmsKafkav2SmartConnectTaskTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsKafkav2SmartConnectTaskTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task huaweicloud_dms_kafkav2_smart_connect_task}
*/
export class DmsKafkav2SmartConnectTask extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_kafkav2_smart_connect_task";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsKafkav2SmartConnectTask resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsKafkav2SmartConnectTask to import
  * @param importFromId The id of the existing DmsKafkav2SmartConnectTask that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsKafkav2SmartConnectTask to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_kafkav2_smart_connect_task", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafkav2_smart_connect_task huaweicloud_dms_kafkav2_smart_connect_task} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsKafkav2SmartConnectTaskConfig
  */
  public constructor(scope: Construct, id: string, config: DmsKafkav2SmartConnectTaskConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_kafkav2_smart_connect_task',
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
    this._destinationType = config.destinationType;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._region = config.region;
    this._sourceType = config.sourceType;
    this._startLater = config.startLater;
    this._taskName = config.taskName;
    this._topics = config.topics;
    this._topicsRegex = config.topicsRegex;
    this._destinationTask.internalValue = config.destinationTask;
    this._sourceTask.internalValue = config.sourceTask;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // destination_type - computed: true, optional: true, required: false
  private _destinationType?: string; 
  public get destinationType() {
    return this.getStringAttribute('destination_type');
  }
  public set destinationType(value: string) {
    this._destinationType = value;
  }
  public resetDestinationType() {
    this._destinationType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationTypeInput() {
    return this._destinationType;
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

  // source_type - computed: true, optional: true, required: false
  private _sourceType?: string; 
  public get sourceType() {
    return this.getStringAttribute('source_type');
  }
  public set sourceType(value: string) {
    this._sourceType = value;
  }
  public resetSourceType() {
    this._sourceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTypeInput() {
    return this._sourceType;
  }

  // start_later - computed: false, optional: true, required: false
  private _startLater?: boolean | cdktf.IResolvable; 
  public get startLater() {
    return this.getBooleanAttribute('start_later');
  }
  public set startLater(value: boolean | cdktf.IResolvable) {
    this._startLater = value;
  }
  public resetStartLater() {
    this._startLater = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get startLaterInput() {
    return this._startLater;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // task_name - computed: false, optional: false, required: true
  private _taskName?: string; 
  public get taskName() {
    return this.getStringAttribute('task_name');
  }
  public set taskName(value: string) {
    this._taskName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get taskNameInput() {
    return this._taskName;
  }

  // topics - computed: false, optional: true, required: false
  private _topics?: string[]; 
  public get topics() {
    return cdktf.Fn.tolist(this.getListAttribute('topics'));
  }
  public set topics(value: string[]) {
    this._topics = value;
  }
  public resetTopics() {
    this._topics = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicsInput() {
    return this._topics;
  }

  // topics_regex - computed: false, optional: true, required: false
  private _topicsRegex?: string; 
  public get topicsRegex() {
    return this.getStringAttribute('topics_regex');
  }
  public set topicsRegex(value: string) {
    this._topicsRegex = value;
  }
  public resetTopicsRegex() {
    this._topicsRegex = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicsRegexInput() {
    return this._topicsRegex;
  }

  // destination_task - computed: false, optional: true, required: false
  private _destinationTask = new DmsKafkav2SmartConnectTaskDestinationTaskOutputReference(this, "destination_task");
  public get destinationTask() {
    return this._destinationTask;
  }
  public putDestinationTask(value: DmsKafkav2SmartConnectTaskDestinationTask) {
    this._destinationTask.internalValue = value;
  }
  public resetDestinationTask() {
    this._destinationTask.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationTaskInput() {
    return this._destinationTask.internalValue;
  }

  // source_task - computed: false, optional: true, required: false
  private _sourceTask = new DmsKafkav2SmartConnectTaskSourceTaskOutputReference(this, "source_task");
  public get sourceTask() {
    return this._sourceTask;
  }
  public putSourceTask(value: DmsKafkav2SmartConnectTaskSourceTask) {
    this._sourceTask.internalValue = value;
  }
  public resetSourceTask() {
    this._sourceTask.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTaskInput() {
    return this._sourceTask.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DmsKafkav2SmartConnectTaskTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DmsKafkav2SmartConnectTaskTimeouts) {
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
      destination_type: cdktf.stringToTerraform(this._destinationType),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      region: cdktf.stringToTerraform(this._region),
      source_type: cdktf.stringToTerraform(this._sourceType),
      start_later: cdktf.booleanToTerraform(this._startLater),
      task_name: cdktf.stringToTerraform(this._taskName),
      topics: cdktf.listMapper(cdktf.stringToTerraform, false)(this._topics),
      topics_regex: cdktf.stringToTerraform(this._topicsRegex),
      destination_task: dmsKafkav2SmartConnectTaskDestinationTaskToTerraform(this._destinationTask.internalValue),
      source_task: dmsKafkav2SmartConnectTaskSourceTaskToTerraform(this._sourceTask.internalValue),
      timeouts: dmsKafkav2SmartConnectTaskTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      destination_type: {
        value: cdktf.stringToHclTerraform(this._destinationType),
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
      source_type: {
        value: cdktf.stringToHclTerraform(this._sourceType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      start_later: {
        value: cdktf.booleanToHclTerraform(this._startLater),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      task_name: {
        value: cdktf.stringToHclTerraform(this._taskName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      topics: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._topics),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      topics_regex: {
        value: cdktf.stringToHclTerraform(this._topicsRegex),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_task: {
        value: dmsKafkav2SmartConnectTaskDestinationTaskToHclTerraform(this._destinationTask.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsKafkav2SmartConnectTaskDestinationTaskList",
      },
      source_task: {
        value: dmsKafkav2SmartConnectTaskSourceTaskToHclTerraform(this._sourceTask.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsKafkav2SmartConnectTaskSourceTaskList",
      },
      timeouts: {
        value: dmsKafkav2SmartConnectTaskTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DmsKafkav2SmartConnectTaskTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

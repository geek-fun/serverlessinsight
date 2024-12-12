// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsKafkaSmartConnectTaskConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the access key used to access the OBS bucket.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#access_key DmsKafkaSmartConnectTask#access_key}
  */
  readonly accessKey: string;
  /**
  * Specifies the connector id of the kafka instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#connector_id DmsKafkaSmartConnectTask#connector_id}
  */
  readonly connectorId: string;
  /**
  * Specifies the consumer strategy of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#consumer_strategy DmsKafkaSmartConnectTask#consumer_strategy}
  */
  readonly consumerStrategy: string;
  /**
  * Specifies the deliver time interval of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#deliver_time_interval DmsKafkaSmartConnectTask#deliver_time_interval}
  */
  readonly deliverTimeInterval: number;
  /**
  * Specifies the destination file type of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#destination_file_type DmsKafkaSmartConnectTask#destination_file_type}
  */
  readonly destinationFileType?: string;
  /**
  * Specifies the destination type of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#destination_type DmsKafkaSmartConnectTask#destination_type}
  */
  readonly destinationType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#id DmsKafkaSmartConnectTask#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the obs bucket name of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#obs_bucket_name DmsKafkaSmartConnectTask#obs_bucket_name}
  */
  readonly obsBucketName: string;
  /**
  * Specifies the obs path of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#obs_path DmsKafkaSmartConnectTask#obs_path}
  */
  readonly obsPath?: string;
  /**
  * Specifies the partiton format of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#partition_format DmsKafkaSmartConnectTask#partition_format}
  */
  readonly partitionFormat: string;
  /**
  * Specifies the record delimiter of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#record_delimiter DmsKafkaSmartConnectTask#record_delimiter}
  */
  readonly recordDelimiter?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#region DmsKafkaSmartConnectTask#region}
  */
  readonly region?: string;
  /**
  * Specifies the secret access key used to access the OBS bucket.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#secret_key DmsKafkaSmartConnectTask#secret_key}
  */
  readonly secretKey: string;
  /**
  * Specifies the source type of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#source_type DmsKafkaSmartConnectTask#source_type}
  */
  readonly sourceType: string;
  /**
  * Specifies the name of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#task_name DmsKafkaSmartConnectTask#task_name}
  */
  readonly taskName: string;
  /**
  * Specifies the topics of the task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#topics DmsKafkaSmartConnectTask#topics}
  */
  readonly topics?: string;
  /**
  * Specifies the topics regular expression of the smart connect task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#topics_regex DmsKafkaSmartConnectTask#topics_regex}
  */
  readonly topicsRegex?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#timeouts DmsKafkaSmartConnectTask#timeouts}
  */
  readonly timeouts?: DmsKafkaSmartConnectTaskTimeouts;
}
export interface DmsKafkaSmartConnectTaskTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#create DmsKafkaSmartConnectTask#create}
  */
  readonly create?: string;
}

export function dmsKafkaSmartConnectTaskTimeoutsToTerraform(struct?: DmsKafkaSmartConnectTaskTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function dmsKafkaSmartConnectTaskTimeoutsToHclTerraform(struct?: DmsKafkaSmartConnectTaskTimeouts | cdktf.IResolvable): any {
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

export class DmsKafkaSmartConnectTaskTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DmsKafkaSmartConnectTaskTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DmsKafkaSmartConnectTaskTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task huaweicloud_dms_kafka_smart_connect_task}
*/
export class DmsKafkaSmartConnectTask extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_kafka_smart_connect_task";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsKafkaSmartConnectTask resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsKafkaSmartConnectTask to import
  * @param importFromId The id of the existing DmsKafkaSmartConnectTask that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsKafkaSmartConnectTask to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_kafka_smart_connect_task", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_kafka_smart_connect_task huaweicloud_dms_kafka_smart_connect_task} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsKafkaSmartConnectTaskConfig
  */
  public constructor(scope: Construct, id: string, config: DmsKafkaSmartConnectTaskConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_kafka_smart_connect_task',
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
    this._accessKey = config.accessKey;
    this._connectorId = config.connectorId;
    this._consumerStrategy = config.consumerStrategy;
    this._deliverTimeInterval = config.deliverTimeInterval;
    this._destinationFileType = config.destinationFileType;
    this._destinationType = config.destinationType;
    this._id = config.id;
    this._obsBucketName = config.obsBucketName;
    this._obsPath = config.obsPath;
    this._partitionFormat = config.partitionFormat;
    this._recordDelimiter = config.recordDelimiter;
    this._region = config.region;
    this._secretKey = config.secretKey;
    this._sourceType = config.sourceType;
    this._taskName = config.taskName;
    this._topics = config.topics;
    this._topicsRegex = config.topicsRegex;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_key - computed: false, optional: false, required: true
  private _accessKey?: string; 
  public get accessKey() {
    return this.getStringAttribute('access_key');
  }
  public set accessKey(value: string) {
    this._accessKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get accessKeyInput() {
    return this._accessKey;
  }

  // connector_id - computed: false, optional: false, required: true
  private _connectorId?: string; 
  public get connectorId() {
    return this.getStringAttribute('connector_id');
  }
  public set connectorId(value: string) {
    this._connectorId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get connectorIdInput() {
    return this._connectorId;
  }

  // consumer_strategy - computed: false, optional: false, required: true
  private _consumerStrategy?: string; 
  public get consumerStrategy() {
    return this.getStringAttribute('consumer_strategy');
  }
  public set consumerStrategy(value: string) {
    this._consumerStrategy = value;
  }
  // Temporarily expose input value. Use with caution.
  public get consumerStrategyInput() {
    return this._consumerStrategy;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // deliver_time_interval - computed: false, optional: false, required: true
  private _deliverTimeInterval?: number; 
  public get deliverTimeInterval() {
    return this.getNumberAttribute('deliver_time_interval');
  }
  public set deliverTimeInterval(value: number) {
    this._deliverTimeInterval = value;
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

  // destination_type - computed: false, optional: false, required: true
  private _destinationType?: string; 
  public get destinationType() {
    return this.getStringAttribute('destination_type');
  }
  public set destinationType(value: string) {
    this._destinationType = value;
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

  // obs_bucket_name - computed: false, optional: false, required: true
  private _obsBucketName?: string; 
  public get obsBucketName() {
    return this.getStringAttribute('obs_bucket_name');
  }
  public set obsBucketName(value: string) {
    this._obsBucketName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get obsBucketNameInput() {
    return this._obsBucketName;
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

  // partition_format - computed: false, optional: false, required: true
  private _partitionFormat?: string; 
  public get partitionFormat() {
    return this.getStringAttribute('partition_format');
  }
  public set partitionFormat(value: string) {
    this._partitionFormat = value;
  }
  // Temporarily expose input value. Use with caution.
  public get partitionFormatInput() {
    return this._partitionFormat;
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

  // secret_key - computed: false, optional: false, required: true
  private _secretKey?: string; 
  public get secretKey() {
    return this.getStringAttribute('secret_key');
  }
  public set secretKey(value: string) {
    this._secretKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get secretKeyInput() {
    return this._secretKey;
  }

  // source_type - computed: false, optional: false, required: true
  private _sourceType?: string; 
  public get sourceType() {
    return this.getStringAttribute('source_type');
  }
  public set sourceType(value: string) {
    this._sourceType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTypeInput() {
    return this._sourceType;
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
  private _topics?: string; 
  public get topics() {
    return this.getStringAttribute('topics');
  }
  public set topics(value: string) {
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

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DmsKafkaSmartConnectTaskTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DmsKafkaSmartConnectTaskTimeouts) {
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
      access_key: cdktf.stringToTerraform(this._accessKey),
      connector_id: cdktf.stringToTerraform(this._connectorId),
      consumer_strategy: cdktf.stringToTerraform(this._consumerStrategy),
      deliver_time_interval: cdktf.numberToTerraform(this._deliverTimeInterval),
      destination_file_type: cdktf.stringToTerraform(this._destinationFileType),
      destination_type: cdktf.stringToTerraform(this._destinationType),
      id: cdktf.stringToTerraform(this._id),
      obs_bucket_name: cdktf.stringToTerraform(this._obsBucketName),
      obs_path: cdktf.stringToTerraform(this._obsPath),
      partition_format: cdktf.stringToTerraform(this._partitionFormat),
      record_delimiter: cdktf.stringToTerraform(this._recordDelimiter),
      region: cdktf.stringToTerraform(this._region),
      secret_key: cdktf.stringToTerraform(this._secretKey),
      source_type: cdktf.stringToTerraform(this._sourceType),
      task_name: cdktf.stringToTerraform(this._taskName),
      topics: cdktf.stringToTerraform(this._topics),
      topics_regex: cdktf.stringToTerraform(this._topicsRegex),
      timeouts: dmsKafkaSmartConnectTaskTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      access_key: {
        value: cdktf.stringToHclTerraform(this._accessKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      connector_id: {
        value: cdktf.stringToHclTerraform(this._connectorId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      consumer_strategy: {
        value: cdktf.stringToHclTerraform(this._consumerStrategy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      deliver_time_interval: {
        value: cdktf.numberToHclTerraform(this._deliverTimeInterval),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      destination_file_type: {
        value: cdktf.stringToHclTerraform(this._destinationFileType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
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
      obs_bucket_name: {
        value: cdktf.stringToHclTerraform(this._obsBucketName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      obs_path: {
        value: cdktf.stringToHclTerraform(this._obsPath),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      partition_format: {
        value: cdktf.stringToHclTerraform(this._partitionFormat),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      record_delimiter: {
        value: cdktf.stringToHclTerraform(this._recordDelimiter),
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
      secret_key: {
        value: cdktf.stringToHclTerraform(this._secretKey),
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
      task_name: {
        value: cdktf.stringToHclTerraform(this._taskName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      topics: {
        value: cdktf.stringToHclTerraform(this._topics),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      topics_regex: {
        value: cdktf.stringToHclTerraform(this._topicsRegex),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeouts: {
        value: dmsKafkaSmartConnectTaskTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DmsKafkaSmartConnectTaskTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

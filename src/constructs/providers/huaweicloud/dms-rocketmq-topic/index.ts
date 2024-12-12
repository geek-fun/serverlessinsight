// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsRocketmqTopicConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#id DmsRocketmqTopic#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#instance_id DmsRocketmqTopic#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the message type of the topic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#message_type DmsRocketmqTopic#message_type}
  */
  readonly messageType?: string;
  /**
  * Specifies the name of the topic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#name DmsRocketmqTopic#name}
  */
  readonly name: string;
  /**
  * Specifies the permissions of the topic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#permission DmsRocketmqTopic#permission}
  */
  readonly permission?: string;
  /**
  * Specifies the number of queues.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#queue_num DmsRocketmqTopic#queue_num}
  */
  readonly queueNum?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#region DmsRocketmqTopic#region}
  */
  readonly region?: string;
  /**
  * Specifies the total number of read queues.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#total_read_queue_num DmsRocketmqTopic#total_read_queue_num}
  */
  readonly totalReadQueueNum?: number;
  /**
  * Specifies the total number of write queues.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#total_write_queue_num DmsRocketmqTopic#total_write_queue_num}
  */
  readonly totalWriteQueueNum?: number;
  /**
  * brokers block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#brokers DmsRocketmqTopic#brokers}
  */
  readonly brokers?: DmsRocketmqTopicBrokers[] | cdktf.IResolvable;
  /**
  * queues block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#queues DmsRocketmqTopic#queues}
  */
  readonly queues?: DmsRocketmqTopicQueues[] | cdktf.IResolvable;
}
export interface DmsRocketmqTopicBrokers {
  /**
  * Indicates the name of the broker.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#name DmsRocketmqTopic#name}
  */
  readonly name?: string;
}

export function dmsRocketmqTopicBrokersToTerraform(struct?: DmsRocketmqTopicBrokers | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function dmsRocketmqTopicBrokersToHclTerraform(struct?: DmsRocketmqTopicBrokers | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsRocketmqTopicBrokersOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DmsRocketmqTopicBrokers | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRocketmqTopicBrokers | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
    }
  }

  // name - computed: true, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // read_queue_num - computed: true, optional: false, required: false
  public get readQueueNum() {
    return this.getNumberAttribute('read_queue_num');
  }

  // write_queue_num - computed: true, optional: false, required: false
  public get writeQueueNum() {
    return this.getNumberAttribute('write_queue_num');
  }
}

export class DmsRocketmqTopicBrokersList extends cdktf.ComplexList {
  public internalValue? : DmsRocketmqTopicBrokers[] | cdktf.IResolvable

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
  public get(index: number): DmsRocketmqTopicBrokersOutputReference {
    return new DmsRocketmqTopicBrokersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsRocketmqTopicQueues {
  /**
  * Specifies the associated broker.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#broker DmsRocketmqTopic#broker}
  */
  readonly broker?: string;
  /**
  * Specifies the number of the queues.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#queue_num DmsRocketmqTopic#queue_num}
  */
  readonly queueNum?: number;
}

export function dmsRocketmqTopicQueuesToTerraform(struct?: DmsRocketmqTopicQueues | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    broker: cdktf.stringToTerraform(struct!.broker),
    queue_num: cdktf.numberToTerraform(struct!.queueNum),
  }
}


export function dmsRocketmqTopicQueuesToHclTerraform(struct?: DmsRocketmqTopicQueues | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    broker: {
      value: cdktf.stringToHclTerraform(struct!.broker),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    queue_num: {
      value: cdktf.numberToHclTerraform(struct!.queueNum),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsRocketmqTopicQueuesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DmsRocketmqTopicQueues | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._broker !== undefined) {
      hasAnyValues = true;
      internalValueResult.broker = this._broker;
    }
    if (this._queueNum !== undefined) {
      hasAnyValues = true;
      internalValueResult.queueNum = this._queueNum;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRocketmqTopicQueues | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._broker = undefined;
      this._queueNum = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._broker = value.broker;
      this._queueNum = value.queueNum;
    }
  }

  // broker - computed: false, optional: true, required: false
  private _broker?: string; 
  public get broker() {
    return this.getStringAttribute('broker');
  }
  public set broker(value: string) {
    this._broker = value;
  }
  public resetBroker() {
    this._broker = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get brokerInput() {
    return this._broker;
  }

  // queue_num - computed: false, optional: true, required: false
  private _queueNum?: number; 
  public get queueNum() {
    return this.getNumberAttribute('queue_num');
  }
  public set queueNum(value: number) {
    this._queueNum = value;
  }
  public resetQueueNum() {
    this._queueNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queueNumInput() {
    return this._queueNum;
  }
}

export class DmsRocketmqTopicQueuesList extends cdktf.ComplexList {
  public internalValue? : DmsRocketmqTopicQueues[] | cdktf.IResolvable

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
  public get(index: number): DmsRocketmqTopicQueuesOutputReference {
    return new DmsRocketmqTopicQueuesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic huaweicloud_dms_rocketmq_topic}
*/
export class DmsRocketmqTopic extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_rocketmq_topic";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsRocketmqTopic resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsRocketmqTopic to import
  * @param importFromId The id of the existing DmsRocketmqTopic that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsRocketmqTopic to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_rocketmq_topic", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_topic huaweicloud_dms_rocketmq_topic} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsRocketmqTopicConfig
  */
  public constructor(scope: Construct, id: string, config: DmsRocketmqTopicConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_rocketmq_topic',
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
    this._messageType = config.messageType;
    this._name = config.name;
    this._permission = config.permission;
    this._queueNum = config.queueNum;
    this._region = config.region;
    this._totalReadQueueNum = config.totalReadQueueNum;
    this._totalWriteQueueNum = config.totalWriteQueueNum;
    this._brokers.internalValue = config.brokers;
    this._queues.internalValue = config.queues;
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

  // message_type - computed: true, optional: true, required: false
  private _messageType?: string; 
  public get messageType() {
    return this.getStringAttribute('message_type');
  }
  public set messageType(value: string) {
    this._messageType = value;
  }
  public resetMessageType() {
    this._messageType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get messageTypeInput() {
    return this._messageType;
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

  // permission - computed: true, optional: true, required: false
  private _permission?: string; 
  public get permission() {
    return this.getStringAttribute('permission');
  }
  public set permission(value: string) {
    this._permission = value;
  }
  public resetPermission() {
    this._permission = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get permissionInput() {
    return this._permission;
  }

  // queue_num - computed: true, optional: true, required: false
  private _queueNum?: number; 
  public get queueNum() {
    return this.getNumberAttribute('queue_num');
  }
  public set queueNum(value: number) {
    this._queueNum = value;
  }
  public resetQueueNum() {
    this._queueNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queueNumInput() {
    return this._queueNum;
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

  // total_read_queue_num - computed: true, optional: true, required: false
  private _totalReadQueueNum?: number; 
  public get totalReadQueueNum() {
    return this.getNumberAttribute('total_read_queue_num');
  }
  public set totalReadQueueNum(value: number) {
    this._totalReadQueueNum = value;
  }
  public resetTotalReadQueueNum() {
    this._totalReadQueueNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get totalReadQueueNumInput() {
    return this._totalReadQueueNum;
  }

  // total_write_queue_num - computed: true, optional: true, required: false
  private _totalWriteQueueNum?: number; 
  public get totalWriteQueueNum() {
    return this.getNumberAttribute('total_write_queue_num');
  }
  public set totalWriteQueueNum(value: number) {
    this._totalWriteQueueNum = value;
  }
  public resetTotalWriteQueueNum() {
    this._totalWriteQueueNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get totalWriteQueueNumInput() {
    return this._totalWriteQueueNum;
  }

  // brokers - computed: false, optional: true, required: false
  private _brokers = new DmsRocketmqTopicBrokersList(this, "brokers", false);
  public get brokers() {
    return this._brokers;
  }
  public putBrokers(value: DmsRocketmqTopicBrokers[] | cdktf.IResolvable) {
    this._brokers.internalValue = value;
  }
  public resetBrokers() {
    this._brokers.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get brokersInput() {
    return this._brokers.internalValue;
  }

  // queues - computed: false, optional: true, required: false
  private _queues = new DmsRocketmqTopicQueuesList(this, "queues", false);
  public get queues() {
    return this._queues;
  }
  public putQueues(value: DmsRocketmqTopicQueues[] | cdktf.IResolvable) {
    this._queues.internalValue = value;
  }
  public resetQueues() {
    this._queues.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queuesInput() {
    return this._queues.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      message_type: cdktf.stringToTerraform(this._messageType),
      name: cdktf.stringToTerraform(this._name),
      permission: cdktf.stringToTerraform(this._permission),
      queue_num: cdktf.numberToTerraform(this._queueNum),
      region: cdktf.stringToTerraform(this._region),
      total_read_queue_num: cdktf.numberToTerraform(this._totalReadQueueNum),
      total_write_queue_num: cdktf.numberToTerraform(this._totalWriteQueueNum),
      brokers: cdktf.listMapper(dmsRocketmqTopicBrokersToTerraform, true)(this._brokers.internalValue),
      queues: cdktf.listMapper(dmsRocketmqTopicQueuesToTerraform, true)(this._queues.internalValue),
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
      message_type: {
        value: cdktf.stringToHclTerraform(this._messageType),
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
      permission: {
        value: cdktf.stringToHclTerraform(this._permission),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      queue_num: {
        value: cdktf.numberToHclTerraform(this._queueNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      total_read_queue_num: {
        value: cdktf.numberToHclTerraform(this._totalReadQueueNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      total_write_queue_num: {
        value: cdktf.numberToHclTerraform(this._totalWriteQueueNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      brokers: {
        value: cdktf.listMapperHcl(dmsRocketmqTopicBrokersToHclTerraform, true)(this._brokers.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsRocketmqTopicBrokersList",
      },
      queues: {
        value: cdktf.listMapperHcl(dmsRocketmqTopicQueuesToHclTerraform, true)(this._queues.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsRocketmqTopicQueuesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

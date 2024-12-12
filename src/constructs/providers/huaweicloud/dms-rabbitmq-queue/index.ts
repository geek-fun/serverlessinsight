// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsRabbitmqQueueConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#auto_delete DmsRabbitmqQueue#auto_delete}
  */
  readonly autoDelete: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#dead_letter_exchange DmsRabbitmqQueue#dead_letter_exchange}
  */
  readonly deadLetterExchange?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#dead_letter_routing_key DmsRabbitmqQueue#dead_letter_routing_key}
  */
  readonly deadLetterRoutingKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#durable DmsRabbitmqQueue#durable}
  */
  readonly durable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#id DmsRabbitmqQueue#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#instance_id DmsRabbitmqQueue#instance_id}
  */
  readonly instanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#lazy_mode DmsRabbitmqQueue#lazy_mode}
  */
  readonly lazyMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#message_ttl DmsRabbitmqQueue#message_ttl}
  */
  readonly messageTtl?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#name DmsRabbitmqQueue#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#region DmsRabbitmqQueue#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#vhost DmsRabbitmqQueue#vhost}
  */
  readonly vhost: string;
}
export interface DmsRabbitmqQueueConsumerDetailsChannelDetails {
}

export function dmsRabbitmqQueueConsumerDetailsChannelDetailsToTerraform(struct?: DmsRabbitmqQueueConsumerDetailsChannelDetails): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dmsRabbitmqQueueConsumerDetailsChannelDetailsToHclTerraform(struct?: DmsRabbitmqQueueConsumerDetailsChannelDetails): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DmsRabbitmqQueueConsumerDetailsChannelDetailsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsRabbitmqQueueConsumerDetailsChannelDetails | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRabbitmqQueueConsumerDetailsChannelDetails | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // connection_name - computed: true, optional: false, required: false
  public get connectionName() {
    return this.getStringAttribute('connection_name');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // number - computed: true, optional: false, required: false
  public get number() {
    return this.getNumberAttribute('number');
  }

  // peer_host - computed: true, optional: false, required: false
  public get peerHost() {
    return this.getStringAttribute('peer_host');
  }

  // peer_port - computed: true, optional: false, required: false
  public get peerPort() {
    return this.getNumberAttribute('peer_port');
  }

  // user - computed: true, optional: false, required: false
  public get user() {
    return this.getStringAttribute('user');
  }
}

export class DmsRabbitmqQueueConsumerDetailsChannelDetailsList extends cdktf.ComplexList {

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
  public get(index: number): DmsRabbitmqQueueConsumerDetailsChannelDetailsOutputReference {
    return new DmsRabbitmqQueueConsumerDetailsChannelDetailsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsRabbitmqQueueConsumerDetails {
}

export function dmsRabbitmqQueueConsumerDetailsToTerraform(struct?: DmsRabbitmqQueueConsumerDetails): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dmsRabbitmqQueueConsumerDetailsToHclTerraform(struct?: DmsRabbitmqQueueConsumerDetails): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DmsRabbitmqQueueConsumerDetailsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsRabbitmqQueueConsumerDetails | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRabbitmqQueueConsumerDetails | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // ack_required - computed: true, optional: false, required: false
  public get ackRequired() {
    return this.getBooleanAttribute('ack_required');
  }

  // channel_details - computed: true, optional: false, required: false
  private _channelDetails = new DmsRabbitmqQueueConsumerDetailsChannelDetailsList(this, "channel_details", false);
  public get channelDetails() {
    return this._channelDetails;
  }

  // consumer_tag - computed: true, optional: false, required: false
  public get consumerTag() {
    return this.getStringAttribute('consumer_tag');
  }

  // prefetch_count - computed: true, optional: false, required: false
  public get prefetchCount() {
    return this.getNumberAttribute('prefetch_count');
  }
}

export class DmsRabbitmqQueueConsumerDetailsList extends cdktf.ComplexList {

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
  public get(index: number): DmsRabbitmqQueueConsumerDetailsOutputReference {
    return new DmsRabbitmqQueueConsumerDetailsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsRabbitmqQueueQueueBindings {
}

export function dmsRabbitmqQueueQueueBindingsToTerraform(struct?: DmsRabbitmqQueueQueueBindings): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dmsRabbitmqQueueQueueBindingsToHclTerraform(struct?: DmsRabbitmqQueueQueueBindings): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DmsRabbitmqQueueQueueBindingsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsRabbitmqQueueQueueBindings | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRabbitmqQueueQueueBindings | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // destination - computed: true, optional: false, required: false
  public get destination() {
    return this.getStringAttribute('destination');
  }

  // destination_type - computed: true, optional: false, required: false
  public get destinationType() {
    return this.getStringAttribute('destination_type');
  }

  // properties_key - computed: true, optional: false, required: false
  public get propertiesKey() {
    return this.getStringAttribute('properties_key');
  }

  // routing_key - computed: true, optional: false, required: false
  public get routingKey() {
    return this.getStringAttribute('routing_key');
  }

  // source - computed: true, optional: false, required: false
  public get source() {
    return this.getStringAttribute('source');
  }
}

export class DmsRabbitmqQueueQueueBindingsList extends cdktf.ComplexList {

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
  public get(index: number): DmsRabbitmqQueueQueueBindingsOutputReference {
    return new DmsRabbitmqQueueQueueBindingsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue huaweicloud_dms_rabbitmq_queue}
*/
export class DmsRabbitmqQueue extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_rabbitmq_queue";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsRabbitmqQueue resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsRabbitmqQueue to import
  * @param importFromId The id of the existing DmsRabbitmqQueue that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsRabbitmqQueue to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_rabbitmq_queue", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rabbitmq_queue huaweicloud_dms_rabbitmq_queue} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsRabbitmqQueueConfig
  */
  public constructor(scope: Construct, id: string, config: DmsRabbitmqQueueConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_rabbitmq_queue',
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
    this._autoDelete = config.autoDelete;
    this._deadLetterExchange = config.deadLetterExchange;
    this._deadLetterRoutingKey = config.deadLetterRoutingKey;
    this._durable = config.durable;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._lazyMode = config.lazyMode;
    this._messageTtl = config.messageTtl;
    this._name = config.name;
    this._region = config.region;
    this._vhost = config.vhost;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // auto_delete - computed: false, optional: false, required: true
  private _autoDelete?: boolean | cdktf.IResolvable; 
  public get autoDelete() {
    return this.getBooleanAttribute('auto_delete');
  }
  public set autoDelete(value: boolean | cdktf.IResolvable) {
    this._autoDelete = value;
  }
  // Temporarily expose input value. Use with caution.
  public get autoDeleteInput() {
    return this._autoDelete;
  }

  // consumer_details - computed: true, optional: false, required: false
  private _consumerDetails = new DmsRabbitmqQueueConsumerDetailsList(this, "consumer_details", false);
  public get consumerDetails() {
    return this._consumerDetails;
  }

  // consumers - computed: true, optional: false, required: false
  public get consumers() {
    return this.getNumberAttribute('consumers');
  }

  // dead_letter_exchange - computed: false, optional: true, required: false
  private _deadLetterExchange?: string; 
  public get deadLetterExchange() {
    return this.getStringAttribute('dead_letter_exchange');
  }
  public set deadLetterExchange(value: string) {
    this._deadLetterExchange = value;
  }
  public resetDeadLetterExchange() {
    this._deadLetterExchange = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deadLetterExchangeInput() {
    return this._deadLetterExchange;
  }

  // dead_letter_routing_key - computed: false, optional: true, required: false
  private _deadLetterRoutingKey?: string; 
  public get deadLetterRoutingKey() {
    return this.getStringAttribute('dead_letter_routing_key');
  }
  public set deadLetterRoutingKey(value: string) {
    this._deadLetterRoutingKey = value;
  }
  public resetDeadLetterRoutingKey() {
    this._deadLetterRoutingKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deadLetterRoutingKeyInput() {
    return this._deadLetterRoutingKey;
  }

  // durable - computed: true, optional: true, required: false
  private _durable?: boolean | cdktf.IResolvable; 
  public get durable() {
    return this.getBooleanAttribute('durable');
  }
  public set durable(value: boolean | cdktf.IResolvable) {
    this._durable = value;
  }
  public resetDurable() {
    this._durable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get durableInput() {
    return this._durable;
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

  // lazy_mode - computed: false, optional: true, required: false
  private _lazyMode?: string; 
  public get lazyMode() {
    return this.getStringAttribute('lazy_mode');
  }
  public set lazyMode(value: string) {
    this._lazyMode = value;
  }
  public resetLazyMode() {
    this._lazyMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lazyModeInput() {
    return this._lazyMode;
  }

  // message_ttl - computed: false, optional: true, required: false
  private _messageTtl?: number; 
  public get messageTtl() {
    return this.getNumberAttribute('message_ttl');
  }
  public set messageTtl(value: number) {
    this._messageTtl = value;
  }
  public resetMessageTtl() {
    this._messageTtl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get messageTtlInput() {
    return this._messageTtl;
  }

  // messages - computed: true, optional: false, required: false
  public get messages() {
    return this.getNumberAttribute('messages');
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

  // policy - computed: true, optional: false, required: false
  public get policy() {
    return this.getStringAttribute('policy');
  }

  // queue_bindings - computed: true, optional: false, required: false
  private _queueBindings = new DmsRabbitmqQueueQueueBindingsList(this, "queue_bindings", false);
  public get queueBindings() {
    return this._queueBindings;
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

  // vhost - computed: false, optional: false, required: true
  private _vhost?: string; 
  public get vhost() {
    return this.getStringAttribute('vhost');
  }
  public set vhost(value: string) {
    this._vhost = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vhostInput() {
    return this._vhost;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auto_delete: cdktf.booleanToTerraform(this._autoDelete),
      dead_letter_exchange: cdktf.stringToTerraform(this._deadLetterExchange),
      dead_letter_routing_key: cdktf.stringToTerraform(this._deadLetterRoutingKey),
      durable: cdktf.booleanToTerraform(this._durable),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      lazy_mode: cdktf.stringToTerraform(this._lazyMode),
      message_ttl: cdktf.numberToTerraform(this._messageTtl),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      vhost: cdktf.stringToTerraform(this._vhost),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auto_delete: {
        value: cdktf.booleanToHclTerraform(this._autoDelete),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      dead_letter_exchange: {
        value: cdktf.stringToHclTerraform(this._deadLetterExchange),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dead_letter_routing_key: {
        value: cdktf.stringToHclTerraform(this._deadLetterRoutingKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      durable: {
        value: cdktf.booleanToHclTerraform(this._durable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      lazy_mode: {
        value: cdktf.stringToHclTerraform(this._lazyMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      message_ttl: {
        value: cdktf.numberToHclTerraform(this._messageTtl),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vhost: {
        value: cdktf.stringToHclTerraform(this._vhost),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

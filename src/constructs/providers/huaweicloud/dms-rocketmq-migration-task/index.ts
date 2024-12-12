// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsRocketmqMigrationTaskConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#id DmsRocketmqMigrationTask#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the RocketMQ instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#instance_id DmsRocketmqMigrationTask#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the name of the migration task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#name DmsRocketmqMigrationTask#name}
  */
  readonly name: string;
  /**
  * Specifies whether to overwrite configurations with the same name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#overwrite DmsRocketmqMigrationTask#overwrite}
  */
  readonly overwrite: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#region DmsRocketmqMigrationTask#region}
  */
  readonly region?: string;
  /**
  * Specifies the migration task type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#type DmsRocketmqMigrationTask#type}
  */
  readonly type: string;
  /**
  * bindings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#bindings DmsRocketmqMigrationTask#bindings}
  */
  readonly bindings?: DmsRocketmqMigrationTaskBindings[] | cdktf.IResolvable;
  /**
  * exchanges block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#exchanges DmsRocketmqMigrationTask#exchanges}
  */
  readonly exchanges?: DmsRocketmqMigrationTaskExchanges[] | cdktf.IResolvable;
  /**
  * queues block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#queues DmsRocketmqMigrationTask#queues}
  */
  readonly queues?: DmsRocketmqMigrationTaskQueues[] | cdktf.IResolvable;
  /**
  * subscription_groups block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#subscription_groups DmsRocketmqMigrationTask#subscription_groups}
  */
  readonly subscriptionGroups?: DmsRocketmqMigrationTaskSubscriptionGroups[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#timeouts DmsRocketmqMigrationTask#timeouts}
  */
  readonly timeouts?: DmsRocketmqMigrationTaskTimeouts;
  /**
  * topic_configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#topic_configs DmsRocketmqMigrationTask#topic_configs}
  */
  readonly topicConfigs?: DmsRocketmqMigrationTaskTopicConfigs[] | cdktf.IResolvable;
  /**
  * vhosts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#vhosts DmsRocketmqMigrationTask#vhosts}
  */
  readonly vhosts?: DmsRocketmqMigrationTaskVhosts[] | cdktf.IResolvable;
}
export interface DmsRocketmqMigrationTaskBindings {
  /**
  * Specifies the message target.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#destination DmsRocketmqMigrationTask#destination}
  */
  readonly destination?: string;
  /**
  * Specifies the message target type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#destination_type DmsRocketmqMigrationTask#destination_type}
  */
  readonly destinationType?: string;
  /**
  * Specifies the routing key.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#routing_key DmsRocketmqMigrationTask#routing_key}
  */
  readonly routingKey?: string;
  /**
  * Specifies the message source.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#source DmsRocketmqMigrationTask#source}
  */
  readonly source?: string;
  /**
  * Specifies the virtual host name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#vhost DmsRocketmqMigrationTask#vhost}
  */
  readonly vhost?: string;
}

export function dmsRocketmqMigrationTaskBindingsToTerraform(struct?: DmsRocketmqMigrationTaskBindings | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    destination: cdktf.stringToTerraform(struct!.destination),
    destination_type: cdktf.stringToTerraform(struct!.destinationType),
    routing_key: cdktf.stringToTerraform(struct!.routingKey),
    source: cdktf.stringToTerraform(struct!.source),
    vhost: cdktf.stringToTerraform(struct!.vhost),
  }
}


export function dmsRocketmqMigrationTaskBindingsToHclTerraform(struct?: DmsRocketmqMigrationTaskBindings | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    destination: {
      value: cdktf.stringToHclTerraform(struct!.destination),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    destination_type: {
      value: cdktf.stringToHclTerraform(struct!.destinationType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    routing_key: {
      value: cdktf.stringToHclTerraform(struct!.routingKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source: {
      value: cdktf.stringToHclTerraform(struct!.source),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vhost: {
      value: cdktf.stringToHclTerraform(struct!.vhost),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsRocketmqMigrationTaskBindingsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsRocketmqMigrationTaskBindings | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._destination !== undefined) {
      hasAnyValues = true;
      internalValueResult.destination = this._destination;
    }
    if (this._destinationType !== undefined) {
      hasAnyValues = true;
      internalValueResult.destinationType = this._destinationType;
    }
    if (this._routingKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.routingKey = this._routingKey;
    }
    if (this._source !== undefined) {
      hasAnyValues = true;
      internalValueResult.source = this._source;
    }
    if (this._vhost !== undefined) {
      hasAnyValues = true;
      internalValueResult.vhost = this._vhost;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRocketmqMigrationTaskBindings | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._destination = undefined;
      this._destinationType = undefined;
      this._routingKey = undefined;
      this._source = undefined;
      this._vhost = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._destination = value.destination;
      this._destinationType = value.destinationType;
      this._routingKey = value.routingKey;
      this._source = value.source;
      this._vhost = value.vhost;
    }
  }

  // destination - computed: false, optional: true, required: false
  private _destination?: string; 
  public get destination() {
    return this.getStringAttribute('destination');
  }
  public set destination(value: string) {
    this._destination = value;
  }
  public resetDestination() {
    this._destination = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationInput() {
    return this._destination;
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

  // routing_key - computed: true, optional: true, required: false
  private _routingKey?: string; 
  public get routingKey() {
    return this.getStringAttribute('routing_key');
  }
  public set routingKey(value: string) {
    this._routingKey = value;
  }
  public resetRoutingKey() {
    this._routingKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get routingKeyInput() {
    return this._routingKey;
  }

  // source - computed: true, optional: true, required: false
  private _source?: string; 
  public get source() {
    return this.getStringAttribute('source');
  }
  public set source(value: string) {
    this._source = value;
  }
  public resetSource() {
    this._source = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceInput() {
    return this._source;
  }

  // vhost - computed: true, optional: true, required: false
  private _vhost?: string; 
  public get vhost() {
    return this.getStringAttribute('vhost');
  }
  public set vhost(value: string) {
    this._vhost = value;
  }
  public resetVhost() {
    this._vhost = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vhostInput() {
    return this._vhost;
  }
}

export class DmsRocketmqMigrationTaskBindingsList extends cdktf.ComplexList {
  public internalValue? : DmsRocketmqMigrationTaskBindings[] | cdktf.IResolvable

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
  public get(index: number): DmsRocketmqMigrationTaskBindingsOutputReference {
    return new DmsRocketmqMigrationTaskBindingsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsRocketmqMigrationTaskExchanges {
  /**
  * Specifies whether to enable data persistence.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#durable DmsRocketmqMigrationTask#durable}
  */
  readonly durable?: boolean | cdktf.IResolvable;
  /**
  * Specifies the switch name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#name DmsRocketmqMigrationTask#name}
  */
  readonly name?: string;
  /**
  * Specifies the exchange type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#type DmsRocketmqMigrationTask#type}
  */
  readonly type?: string;
  /**
  * Specifies the virtual host name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#vhost DmsRocketmqMigrationTask#vhost}
  */
  readonly vhost?: string;
}

export function dmsRocketmqMigrationTaskExchangesToTerraform(struct?: DmsRocketmqMigrationTaskExchanges | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    durable: cdktf.booleanToTerraform(struct!.durable),
    name: cdktf.stringToTerraform(struct!.name),
    type: cdktf.stringToTerraform(struct!.type),
    vhost: cdktf.stringToTerraform(struct!.vhost),
  }
}


export function dmsRocketmqMigrationTaskExchangesToHclTerraform(struct?: DmsRocketmqMigrationTaskExchanges | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    durable: {
      value: cdktf.booleanToHclTerraform(struct!.durable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vhost: {
      value: cdktf.stringToHclTerraform(struct!.vhost),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsRocketmqMigrationTaskExchangesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsRocketmqMigrationTaskExchanges | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._durable !== undefined) {
      hasAnyValues = true;
      internalValueResult.durable = this._durable;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._vhost !== undefined) {
      hasAnyValues = true;
      internalValueResult.vhost = this._vhost;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRocketmqMigrationTaskExchanges | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._durable = undefined;
      this._name = undefined;
      this._type = undefined;
      this._vhost = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._durable = value.durable;
      this._name = value.name;
      this._type = value.type;
      this._vhost = value.vhost;
    }
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

  // type - computed: true, optional: true, required: false
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

  // vhost - computed: true, optional: true, required: false
  private _vhost?: string; 
  public get vhost() {
    return this.getStringAttribute('vhost');
  }
  public set vhost(value: string) {
    this._vhost = value;
  }
  public resetVhost() {
    this._vhost = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vhostInput() {
    return this._vhost;
  }
}

export class DmsRocketmqMigrationTaskExchangesList extends cdktf.ComplexList {
  public internalValue? : DmsRocketmqMigrationTaskExchanges[] | cdktf.IResolvable

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
  public get(index: number): DmsRocketmqMigrationTaskExchangesOutputReference {
    return new DmsRocketmqMigrationTaskExchangesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsRocketmqMigrationTaskQueues {
  /**
  * Specifies whether to enable data persistence.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#durable DmsRocketmqMigrationTask#durable}
  */
  readonly durable?: boolean | cdktf.IResolvable;
  /**
  * Specifies the queue name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#name DmsRocketmqMigrationTask#name}
  */
  readonly name?: string;
  /**
  * Specifies the virtual host name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#vhost DmsRocketmqMigrationTask#vhost}
  */
  readonly vhost?: string;
}

export function dmsRocketmqMigrationTaskQueuesToTerraform(struct?: DmsRocketmqMigrationTaskQueues | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    durable: cdktf.booleanToTerraform(struct!.durable),
    name: cdktf.stringToTerraform(struct!.name),
    vhost: cdktf.stringToTerraform(struct!.vhost),
  }
}


export function dmsRocketmqMigrationTaskQueuesToHclTerraform(struct?: DmsRocketmqMigrationTaskQueues | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    durable: {
      value: cdktf.booleanToHclTerraform(struct!.durable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vhost: {
      value: cdktf.stringToHclTerraform(struct!.vhost),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsRocketmqMigrationTaskQueuesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsRocketmqMigrationTaskQueues | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._durable !== undefined) {
      hasAnyValues = true;
      internalValueResult.durable = this._durable;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._vhost !== undefined) {
      hasAnyValues = true;
      internalValueResult.vhost = this._vhost;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRocketmqMigrationTaskQueues | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._durable = undefined;
      this._name = undefined;
      this._vhost = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._durable = value.durable;
      this._name = value.name;
      this._vhost = value.vhost;
    }
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

  // vhost - computed: true, optional: true, required: false
  private _vhost?: string; 
  public get vhost() {
    return this.getStringAttribute('vhost');
  }
  public set vhost(value: string) {
    this._vhost = value;
  }
  public resetVhost() {
    this._vhost = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vhostInput() {
    return this._vhost;
  }
}

export class DmsRocketmqMigrationTaskQueuesList extends cdktf.ComplexList {
  public internalValue? : DmsRocketmqMigrationTaskQueues[] | cdktf.IResolvable

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
  public get(index: number): DmsRocketmqMigrationTaskQueuesOutputReference {
    return new DmsRocketmqMigrationTaskQueuesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsRocketmqMigrationTaskSubscriptionGroups {
  /**
  * Specifies whether to enable broadcast.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#consume_broadcast_enable DmsRocketmqMigrationTask#consume_broadcast_enable}
  */
  readonly consumeBroadcastEnable?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether to enable consumption.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#consume_enable DmsRocketmqMigrationTask#consume_enable}
  */
  readonly consumeEnable?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether to enable consumption from the earliest offset.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#consume_from_min_enable DmsRocketmqMigrationTask#consume_from_min_enable}
  */
  readonly consumeFromMinEnable?: boolean | cdktf.IResolvable;
  /**
  * Specifies the name of a consumer group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#group_name DmsRocketmqMigrationTask#group_name}
  */
  readonly groupName: string;
  /**
  * Specifies whether to notify changes of consumer IDs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#notify_consumerids_changed_enable DmsRocketmqMigrationTask#notify_consumerids_changed_enable}
  */
  readonly notifyConsumeridsChangedEnable?: boolean | cdktf.IResolvable;
  /**
  * Specifies the maximum number of consumption retries.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#retry_max_times DmsRocketmqMigrationTask#retry_max_times}
  */
  readonly retryMaxTimes?: number;
  /**
  * Specifies the number of retry queues.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#retry_queue_num DmsRocketmqMigrationTask#retry_queue_num}
  */
  readonly retryQueueNum?: number;
  /**
  * Specifies the ID of the broker selected for slow consumption.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#which_broker_when_consume_slow DmsRocketmqMigrationTask#which_broker_when_consume_slow}
  */
  readonly whichBrokerWhenConsumeSlow?: number;
}

export function dmsRocketmqMigrationTaskSubscriptionGroupsToTerraform(struct?: DmsRocketmqMigrationTaskSubscriptionGroups | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    consume_broadcast_enable: cdktf.booleanToTerraform(struct!.consumeBroadcastEnable),
    consume_enable: cdktf.booleanToTerraform(struct!.consumeEnable),
    consume_from_min_enable: cdktf.booleanToTerraform(struct!.consumeFromMinEnable),
    group_name: cdktf.stringToTerraform(struct!.groupName),
    notify_consumerids_changed_enable: cdktf.booleanToTerraform(struct!.notifyConsumeridsChangedEnable),
    retry_max_times: cdktf.numberToTerraform(struct!.retryMaxTimes),
    retry_queue_num: cdktf.numberToTerraform(struct!.retryQueueNum),
    which_broker_when_consume_slow: cdktf.numberToTerraform(struct!.whichBrokerWhenConsumeSlow),
  }
}


export function dmsRocketmqMigrationTaskSubscriptionGroupsToHclTerraform(struct?: DmsRocketmqMigrationTaskSubscriptionGroups | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    consume_broadcast_enable: {
      value: cdktf.booleanToHclTerraform(struct!.consumeBroadcastEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    consume_enable: {
      value: cdktf.booleanToHclTerraform(struct!.consumeEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    consume_from_min_enable: {
      value: cdktf.booleanToHclTerraform(struct!.consumeFromMinEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    group_name: {
      value: cdktf.stringToHclTerraform(struct!.groupName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    notify_consumerids_changed_enable: {
      value: cdktf.booleanToHclTerraform(struct!.notifyConsumeridsChangedEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    retry_max_times: {
      value: cdktf.numberToHclTerraform(struct!.retryMaxTimes),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    retry_queue_num: {
      value: cdktf.numberToHclTerraform(struct!.retryQueueNum),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    which_broker_when_consume_slow: {
      value: cdktf.numberToHclTerraform(struct!.whichBrokerWhenConsumeSlow),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsRocketmqMigrationTaskSubscriptionGroupsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsRocketmqMigrationTaskSubscriptionGroups | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._consumeBroadcastEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.consumeBroadcastEnable = this._consumeBroadcastEnable;
    }
    if (this._consumeEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.consumeEnable = this._consumeEnable;
    }
    if (this._consumeFromMinEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.consumeFromMinEnable = this._consumeFromMinEnable;
    }
    if (this._groupName !== undefined) {
      hasAnyValues = true;
      internalValueResult.groupName = this._groupName;
    }
    if (this._notifyConsumeridsChangedEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.notifyConsumeridsChangedEnable = this._notifyConsumeridsChangedEnable;
    }
    if (this._retryMaxTimes !== undefined) {
      hasAnyValues = true;
      internalValueResult.retryMaxTimes = this._retryMaxTimes;
    }
    if (this._retryQueueNum !== undefined) {
      hasAnyValues = true;
      internalValueResult.retryQueueNum = this._retryQueueNum;
    }
    if (this._whichBrokerWhenConsumeSlow !== undefined) {
      hasAnyValues = true;
      internalValueResult.whichBrokerWhenConsumeSlow = this._whichBrokerWhenConsumeSlow;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRocketmqMigrationTaskSubscriptionGroups | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._consumeBroadcastEnable = undefined;
      this._consumeEnable = undefined;
      this._consumeFromMinEnable = undefined;
      this._groupName = undefined;
      this._notifyConsumeridsChangedEnable = undefined;
      this._retryMaxTimes = undefined;
      this._retryQueueNum = undefined;
      this._whichBrokerWhenConsumeSlow = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._consumeBroadcastEnable = value.consumeBroadcastEnable;
      this._consumeEnable = value.consumeEnable;
      this._consumeFromMinEnable = value.consumeFromMinEnable;
      this._groupName = value.groupName;
      this._notifyConsumeridsChangedEnable = value.notifyConsumeridsChangedEnable;
      this._retryMaxTimes = value.retryMaxTimes;
      this._retryQueueNum = value.retryQueueNum;
      this._whichBrokerWhenConsumeSlow = value.whichBrokerWhenConsumeSlow;
    }
  }

  // consume_broadcast_enable - computed: true, optional: true, required: false
  private _consumeBroadcastEnable?: boolean | cdktf.IResolvable; 
  public get consumeBroadcastEnable() {
    return this.getBooleanAttribute('consume_broadcast_enable');
  }
  public set consumeBroadcastEnable(value: boolean | cdktf.IResolvable) {
    this._consumeBroadcastEnable = value;
  }
  public resetConsumeBroadcastEnable() {
    this._consumeBroadcastEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get consumeBroadcastEnableInput() {
    return this._consumeBroadcastEnable;
  }

  // consume_enable - computed: true, optional: true, required: false
  private _consumeEnable?: boolean | cdktf.IResolvable; 
  public get consumeEnable() {
    return this.getBooleanAttribute('consume_enable');
  }
  public set consumeEnable(value: boolean | cdktf.IResolvable) {
    this._consumeEnable = value;
  }
  public resetConsumeEnable() {
    this._consumeEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get consumeEnableInput() {
    return this._consumeEnable;
  }

  // consume_from_min_enable - computed: true, optional: true, required: false
  private _consumeFromMinEnable?: boolean | cdktf.IResolvable; 
  public get consumeFromMinEnable() {
    return this.getBooleanAttribute('consume_from_min_enable');
  }
  public set consumeFromMinEnable(value: boolean | cdktf.IResolvable) {
    this._consumeFromMinEnable = value;
  }
  public resetConsumeFromMinEnable() {
    this._consumeFromMinEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get consumeFromMinEnableInput() {
    return this._consumeFromMinEnable;
  }

  // group_name - computed: false, optional: false, required: true
  private _groupName?: string; 
  public get groupName() {
    return this.getStringAttribute('group_name');
  }
  public set groupName(value: string) {
    this._groupName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupNameInput() {
    return this._groupName;
  }

  // notify_consumerids_changed_enable - computed: true, optional: true, required: false
  private _notifyConsumeridsChangedEnable?: boolean | cdktf.IResolvable; 
  public get notifyConsumeridsChangedEnable() {
    return this.getBooleanAttribute('notify_consumerids_changed_enable');
  }
  public set notifyConsumeridsChangedEnable(value: boolean | cdktf.IResolvable) {
    this._notifyConsumeridsChangedEnable = value;
  }
  public resetNotifyConsumeridsChangedEnable() {
    this._notifyConsumeridsChangedEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notifyConsumeridsChangedEnableInput() {
    return this._notifyConsumeridsChangedEnable;
  }

  // retry_max_times - computed: true, optional: true, required: false
  private _retryMaxTimes?: number; 
  public get retryMaxTimes() {
    return this.getNumberAttribute('retry_max_times');
  }
  public set retryMaxTimes(value: number) {
    this._retryMaxTimes = value;
  }
  public resetRetryMaxTimes() {
    this._retryMaxTimes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retryMaxTimesInput() {
    return this._retryMaxTimes;
  }

  // retry_queue_num - computed: true, optional: true, required: false
  private _retryQueueNum?: number; 
  public get retryQueueNum() {
    return this.getNumberAttribute('retry_queue_num');
  }
  public set retryQueueNum(value: number) {
    this._retryQueueNum = value;
  }
  public resetRetryQueueNum() {
    this._retryQueueNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retryQueueNumInput() {
    return this._retryQueueNum;
  }

  // which_broker_when_consume_slow - computed: true, optional: true, required: false
  private _whichBrokerWhenConsumeSlow?: number; 
  public get whichBrokerWhenConsumeSlow() {
    return this.getNumberAttribute('which_broker_when_consume_slow');
  }
  public set whichBrokerWhenConsumeSlow(value: number) {
    this._whichBrokerWhenConsumeSlow = value;
  }
  public resetWhichBrokerWhenConsumeSlow() {
    this._whichBrokerWhenConsumeSlow = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get whichBrokerWhenConsumeSlowInput() {
    return this._whichBrokerWhenConsumeSlow;
  }
}

export class DmsRocketmqMigrationTaskSubscriptionGroupsList extends cdktf.ComplexList {
  public internalValue? : DmsRocketmqMigrationTaskSubscriptionGroups[] | cdktf.IResolvable

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
  public get(index: number): DmsRocketmqMigrationTaskSubscriptionGroupsOutputReference {
    return new DmsRocketmqMigrationTaskSubscriptionGroupsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsRocketmqMigrationTaskTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#create DmsRocketmqMigrationTask#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#delete DmsRocketmqMigrationTask#delete}
  */
  readonly delete?: string;
}

export function dmsRocketmqMigrationTaskTimeoutsToTerraform(struct?: DmsRocketmqMigrationTaskTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function dmsRocketmqMigrationTaskTimeoutsToHclTerraform(struct?: DmsRocketmqMigrationTaskTimeouts | cdktf.IResolvable): any {
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

export class DmsRocketmqMigrationTaskTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DmsRocketmqMigrationTaskTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DmsRocketmqMigrationTaskTimeouts | cdktf.IResolvable | undefined) {
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
export interface DmsRocketmqMigrationTaskTopicConfigs {
  /**
  * Specifies whether a message is an ordered message.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#order DmsRocketmqMigrationTask#order}
  */
  readonly order?: boolean | cdktf.IResolvable;
  /**
  * Specifies the number of permission.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#perm DmsRocketmqMigrationTask#perm}
  */
  readonly perm?: number;
  /**
  * Specifies the number of read queues.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#read_queue_num DmsRocketmqMigrationTask#read_queue_num}
  */
  readonly readQueueNum?: number;
  /**
  * Specifies the filter type of a topic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#topic_filter_type DmsRocketmqMigrationTask#topic_filter_type}
  */
  readonly topicFilterType?: string;
  /**
  * Specifies the topic name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#topic_name DmsRocketmqMigrationTask#topic_name}
  */
  readonly topicName: string;
  /**
  * Specifies the system flag of a topic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#topic_sys_flag DmsRocketmqMigrationTask#topic_sys_flag}
  */
  readonly topicSysFlag?: number;
  /**
  * Specifies the number of write queues.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#write_queue_num DmsRocketmqMigrationTask#write_queue_num}
  */
  readonly writeQueueNum?: number;
}

export function dmsRocketmqMigrationTaskTopicConfigsToTerraform(struct?: DmsRocketmqMigrationTaskTopicConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    order: cdktf.booleanToTerraform(struct!.order),
    perm: cdktf.numberToTerraform(struct!.perm),
    read_queue_num: cdktf.numberToTerraform(struct!.readQueueNum),
    topic_filter_type: cdktf.stringToTerraform(struct!.topicFilterType),
    topic_name: cdktf.stringToTerraform(struct!.topicName),
    topic_sys_flag: cdktf.numberToTerraform(struct!.topicSysFlag),
    write_queue_num: cdktf.numberToTerraform(struct!.writeQueueNum),
  }
}


export function dmsRocketmqMigrationTaskTopicConfigsToHclTerraform(struct?: DmsRocketmqMigrationTaskTopicConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    order: {
      value: cdktf.booleanToHclTerraform(struct!.order),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    perm: {
      value: cdktf.numberToHclTerraform(struct!.perm),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    read_queue_num: {
      value: cdktf.numberToHclTerraform(struct!.readQueueNum),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    topic_filter_type: {
      value: cdktf.stringToHclTerraform(struct!.topicFilterType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic_name: {
      value: cdktf.stringToHclTerraform(struct!.topicName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic_sys_flag: {
      value: cdktf.numberToHclTerraform(struct!.topicSysFlag),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    write_queue_num: {
      value: cdktf.numberToHclTerraform(struct!.writeQueueNum),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DmsRocketmqMigrationTaskTopicConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsRocketmqMigrationTaskTopicConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._order !== undefined) {
      hasAnyValues = true;
      internalValueResult.order = this._order;
    }
    if (this._perm !== undefined) {
      hasAnyValues = true;
      internalValueResult.perm = this._perm;
    }
    if (this._readQueueNum !== undefined) {
      hasAnyValues = true;
      internalValueResult.readQueueNum = this._readQueueNum;
    }
    if (this._topicFilterType !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicFilterType = this._topicFilterType;
    }
    if (this._topicName !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicName = this._topicName;
    }
    if (this._topicSysFlag !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicSysFlag = this._topicSysFlag;
    }
    if (this._writeQueueNum !== undefined) {
      hasAnyValues = true;
      internalValueResult.writeQueueNum = this._writeQueueNum;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DmsRocketmqMigrationTaskTopicConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._order = undefined;
      this._perm = undefined;
      this._readQueueNum = undefined;
      this._topicFilterType = undefined;
      this._topicName = undefined;
      this._topicSysFlag = undefined;
      this._writeQueueNum = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._order = value.order;
      this._perm = value.perm;
      this._readQueueNum = value.readQueueNum;
      this._topicFilterType = value.topicFilterType;
      this._topicName = value.topicName;
      this._topicSysFlag = value.topicSysFlag;
      this._writeQueueNum = value.writeQueueNum;
    }
  }

  // order - computed: true, optional: true, required: false
  private _order?: boolean | cdktf.IResolvable; 
  public get order() {
    return this.getBooleanAttribute('order');
  }
  public set order(value: boolean | cdktf.IResolvable) {
    this._order = value;
  }
  public resetOrder() {
    this._order = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get orderInput() {
    return this._order;
  }

  // perm - computed: true, optional: true, required: false
  private _perm?: number; 
  public get perm() {
    return this.getNumberAttribute('perm');
  }
  public set perm(value: number) {
    this._perm = value;
  }
  public resetPerm() {
    this._perm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get permInput() {
    return this._perm;
  }

  // read_queue_num - computed: true, optional: true, required: false
  private _readQueueNum?: number; 
  public get readQueueNum() {
    return this.getNumberAttribute('read_queue_num');
  }
  public set readQueueNum(value: number) {
    this._readQueueNum = value;
  }
  public resetReadQueueNum() {
    this._readQueueNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readQueueNumInput() {
    return this._readQueueNum;
  }

  // topic_filter_type - computed: true, optional: true, required: false
  private _topicFilterType?: string; 
  public get topicFilterType() {
    return this.getStringAttribute('topic_filter_type');
  }
  public set topicFilterType(value: string) {
    this._topicFilterType = value;
  }
  public resetTopicFilterType() {
    this._topicFilterType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicFilterTypeInput() {
    return this._topicFilterType;
  }

  // topic_name - computed: false, optional: false, required: true
  private _topicName?: string; 
  public get topicName() {
    return this.getStringAttribute('topic_name');
  }
  public set topicName(value: string) {
    this._topicName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicNameInput() {
    return this._topicName;
  }

  // topic_sys_flag - computed: true, optional: true, required: false
  private _topicSysFlag?: number; 
  public get topicSysFlag() {
    return this.getNumberAttribute('topic_sys_flag');
  }
  public set topicSysFlag(value: number) {
    this._topicSysFlag = value;
  }
  public resetTopicSysFlag() {
    this._topicSysFlag = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicSysFlagInput() {
    return this._topicSysFlag;
  }

  // write_queue_num - computed: true, optional: true, required: false
  private _writeQueueNum?: number; 
  public get writeQueueNum() {
    return this.getNumberAttribute('write_queue_num');
  }
  public set writeQueueNum(value: number) {
    this._writeQueueNum = value;
  }
  public resetWriteQueueNum() {
    this._writeQueueNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get writeQueueNumInput() {
    return this._writeQueueNum;
  }
}

export class DmsRocketmqMigrationTaskTopicConfigsList extends cdktf.ComplexList {
  public internalValue? : DmsRocketmqMigrationTaskTopicConfigs[] | cdktf.IResolvable

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
  public get(index: number): DmsRocketmqMigrationTaskTopicConfigsOutputReference {
    return new DmsRocketmqMigrationTaskTopicConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DmsRocketmqMigrationTaskVhosts {
  /**
  * Specifies the virtual host name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#name DmsRocketmqMigrationTask#name}
  */
  readonly name?: string;
}

export function dmsRocketmqMigrationTaskVhostsToTerraform(struct?: DmsRocketmqMigrationTaskVhosts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function dmsRocketmqMigrationTaskVhostsToHclTerraform(struct?: DmsRocketmqMigrationTaskVhosts | cdktf.IResolvable): any {
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

export class DmsRocketmqMigrationTaskVhostsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DmsRocketmqMigrationTaskVhosts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: DmsRocketmqMigrationTaskVhosts | cdktf.IResolvable | undefined) {
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
}

export class DmsRocketmqMigrationTaskVhostsList extends cdktf.ComplexList {
  public internalValue? : DmsRocketmqMigrationTaskVhosts[] | cdktf.IResolvable

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
  public get(index: number): DmsRocketmqMigrationTaskVhostsOutputReference {
    return new DmsRocketmqMigrationTaskVhostsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task huaweicloud_dms_rocketmq_migration_task}
*/
export class DmsRocketmqMigrationTask extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_rocketmq_migration_task";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsRocketmqMigrationTask resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsRocketmqMigrationTask to import
  * @param importFromId The id of the existing DmsRocketmqMigrationTask that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsRocketmqMigrationTask to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_rocketmq_migration_task", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_migration_task huaweicloud_dms_rocketmq_migration_task} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsRocketmqMigrationTaskConfig
  */
  public constructor(scope: Construct, id: string, config: DmsRocketmqMigrationTaskConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_rocketmq_migration_task',
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
    this._name = config.name;
    this._overwrite = config.overwrite;
    this._region = config.region;
    this._type = config.type;
    this._bindings.internalValue = config.bindings;
    this._exchanges.internalValue = config.exchanges;
    this._queues.internalValue = config.queues;
    this._subscriptionGroups.internalValue = config.subscriptionGroups;
    this._timeouts.internalValue = config.timeouts;
    this._topicConfigs.internalValue = config.topicConfigs;
    this._vhosts.internalValue = config.vhosts;
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

  // overwrite - computed: false, optional: false, required: true
  private _overwrite?: string; 
  public get overwrite() {
    return this.getStringAttribute('overwrite');
  }
  public set overwrite(value: string) {
    this._overwrite = value;
  }
  // Temporarily expose input value. Use with caution.
  public get overwriteInput() {
    return this._overwrite;
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

  // start_date - computed: true, optional: false, required: false
  public get startDate() {
    return this.getStringAttribute('start_date');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // bindings - computed: false, optional: true, required: false
  private _bindings = new DmsRocketmqMigrationTaskBindingsList(this, "bindings", false);
  public get bindings() {
    return this._bindings;
  }
  public putBindings(value: DmsRocketmqMigrationTaskBindings[] | cdktf.IResolvable) {
    this._bindings.internalValue = value;
  }
  public resetBindings() {
    this._bindings.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bindingsInput() {
    return this._bindings.internalValue;
  }

  // exchanges - computed: false, optional: true, required: false
  private _exchanges = new DmsRocketmqMigrationTaskExchangesList(this, "exchanges", false);
  public get exchanges() {
    return this._exchanges;
  }
  public putExchanges(value: DmsRocketmqMigrationTaskExchanges[] | cdktf.IResolvable) {
    this._exchanges.internalValue = value;
  }
  public resetExchanges() {
    this._exchanges.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get exchangesInput() {
    return this._exchanges.internalValue;
  }

  // queues - computed: false, optional: true, required: false
  private _queues = new DmsRocketmqMigrationTaskQueuesList(this, "queues", false);
  public get queues() {
    return this._queues;
  }
  public putQueues(value: DmsRocketmqMigrationTaskQueues[] | cdktf.IResolvable) {
    this._queues.internalValue = value;
  }
  public resetQueues() {
    this._queues.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queuesInput() {
    return this._queues.internalValue;
  }

  // subscription_groups - computed: false, optional: true, required: false
  private _subscriptionGroups = new DmsRocketmqMigrationTaskSubscriptionGroupsList(this, "subscription_groups", false);
  public get subscriptionGroups() {
    return this._subscriptionGroups;
  }
  public putSubscriptionGroups(value: DmsRocketmqMigrationTaskSubscriptionGroups[] | cdktf.IResolvable) {
    this._subscriptionGroups.internalValue = value;
  }
  public resetSubscriptionGroups() {
    this._subscriptionGroups.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subscriptionGroupsInput() {
    return this._subscriptionGroups.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DmsRocketmqMigrationTaskTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DmsRocketmqMigrationTaskTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // topic_configs - computed: false, optional: true, required: false
  private _topicConfigs = new DmsRocketmqMigrationTaskTopicConfigsList(this, "topic_configs", false);
  public get topicConfigs() {
    return this._topicConfigs;
  }
  public putTopicConfigs(value: DmsRocketmqMigrationTaskTopicConfigs[] | cdktf.IResolvable) {
    this._topicConfigs.internalValue = value;
  }
  public resetTopicConfigs() {
    this._topicConfigs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicConfigsInput() {
    return this._topicConfigs.internalValue;
  }

  // vhosts - computed: false, optional: true, required: false
  private _vhosts = new DmsRocketmqMigrationTaskVhostsList(this, "vhosts", false);
  public get vhosts() {
    return this._vhosts;
  }
  public putVhosts(value: DmsRocketmqMigrationTaskVhosts[] | cdktf.IResolvable) {
    this._vhosts.internalValue = value;
  }
  public resetVhosts() {
    this._vhosts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vhostsInput() {
    return this._vhosts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      overwrite: cdktf.stringToTerraform(this._overwrite),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.stringToTerraform(this._type),
      bindings: cdktf.listMapper(dmsRocketmqMigrationTaskBindingsToTerraform, true)(this._bindings.internalValue),
      exchanges: cdktf.listMapper(dmsRocketmqMigrationTaskExchangesToTerraform, true)(this._exchanges.internalValue),
      queues: cdktf.listMapper(dmsRocketmqMigrationTaskQueuesToTerraform, true)(this._queues.internalValue),
      subscription_groups: cdktf.listMapper(dmsRocketmqMigrationTaskSubscriptionGroupsToTerraform, true)(this._subscriptionGroups.internalValue),
      timeouts: dmsRocketmqMigrationTaskTimeoutsToTerraform(this._timeouts.internalValue),
      topic_configs: cdktf.listMapper(dmsRocketmqMigrationTaskTopicConfigsToTerraform, true)(this._topicConfigs.internalValue),
      vhosts: cdktf.listMapper(dmsRocketmqMigrationTaskVhostsToTerraform, true)(this._vhosts.internalValue),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      overwrite: {
        value: cdktf.stringToHclTerraform(this._overwrite),
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
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      bindings: {
        value: cdktf.listMapperHcl(dmsRocketmqMigrationTaskBindingsToHclTerraform, true)(this._bindings.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsRocketmqMigrationTaskBindingsList",
      },
      exchanges: {
        value: cdktf.listMapperHcl(dmsRocketmqMigrationTaskExchangesToHclTerraform, true)(this._exchanges.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsRocketmqMigrationTaskExchangesList",
      },
      queues: {
        value: cdktf.listMapperHcl(dmsRocketmqMigrationTaskQueuesToHclTerraform, true)(this._queues.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsRocketmqMigrationTaskQueuesList",
      },
      subscription_groups: {
        value: cdktf.listMapperHcl(dmsRocketmqMigrationTaskSubscriptionGroupsToHclTerraform, true)(this._subscriptionGroups.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsRocketmqMigrationTaskSubscriptionGroupsList",
      },
      timeouts: {
        value: dmsRocketmqMigrationTaskTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DmsRocketmqMigrationTaskTimeouts",
      },
      topic_configs: {
        value: cdktf.listMapperHcl(dmsRocketmqMigrationTaskTopicConfigsToHclTerraform, true)(this._topicConfigs.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsRocketmqMigrationTaskTopicConfigsList",
      },
      vhosts: {
        value: cdktf.listMapperHcl(dmsRocketmqMigrationTaskVhostsToHclTerraform, true)(this._vhosts.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DmsRocketmqMigrationTaskVhostsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

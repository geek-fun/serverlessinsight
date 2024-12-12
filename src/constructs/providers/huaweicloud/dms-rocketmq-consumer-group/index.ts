// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsRocketmqConsumerGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies whether to broadcast of the consumer group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#broadcast DmsRocketmqConsumerGroup#broadcast}
  */
  readonly broadcast?: boolean | cdktf.IResolvable;
  /**
  * Specifies the list of associated brokers of the consumer group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#brokers DmsRocketmqConsumerGroup#brokers}
  */
  readonly brokers?: string[];
  /**
  * Specifies whether to consume orderly.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#consume_orderly DmsRocketmqConsumerGroup#consume_orderly}
  */
  readonly consumeOrderly?: boolean | cdktf.IResolvable;
  /**
  * Specifies the description of the consumer group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#description DmsRocketmqConsumerGroup#description}
  */
  readonly description?: string;
  /**
  * Specifies the consumer group is enabled or not. Default to true.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#enabled DmsRocketmqConsumerGroup#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#id DmsRocketmqConsumerGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the rocketMQ instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#instance_id DmsRocketmqConsumerGroup#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the name of the consumer group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#name DmsRocketmqConsumerGroup#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#region DmsRocketmqConsumerGroup#region}
  */
  readonly region?: string;
  /**
  * Specifies the maximum number of retry times.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#retry_max_times DmsRocketmqConsumerGroup#retry_max_times}
  */
  readonly retryMaxTimes: number;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group huaweicloud_dms_rocketmq_consumer_group}
*/
export class DmsRocketmqConsumerGroup extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_rocketmq_consumer_group";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsRocketmqConsumerGroup resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsRocketmqConsumerGroup to import
  * @param importFromId The id of the existing DmsRocketmqConsumerGroup that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsRocketmqConsumerGroup to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_rocketmq_consumer_group", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_rocketmq_consumer_group huaweicloud_dms_rocketmq_consumer_group} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsRocketmqConsumerGroupConfig
  */
  public constructor(scope: Construct, id: string, config: DmsRocketmqConsumerGroupConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_rocketmq_consumer_group',
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
    this._broadcast = config.broadcast;
    this._brokers = config.brokers;
    this._consumeOrderly = config.consumeOrderly;
    this._description = config.description;
    this._enabled = config.enabled;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._name = config.name;
    this._region = config.region;
    this._retryMaxTimes = config.retryMaxTimes;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // broadcast - computed: true, optional: true, required: false
  private _broadcast?: boolean | cdktf.IResolvable; 
  public get broadcast() {
    return this.getBooleanAttribute('broadcast');
  }
  public set broadcast(value: boolean | cdktf.IResolvable) {
    this._broadcast = value;
  }
  public resetBroadcast() {
    this._broadcast = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get broadcastInput() {
    return this._broadcast;
  }

  // brokers - computed: true, optional: true, required: false
  private _brokers?: string[]; 
  public get brokers() {
    return cdktf.Fn.tolist(this.getListAttribute('brokers'));
  }
  public set brokers(value: string[]) {
    this._brokers = value;
  }
  public resetBrokers() {
    this._brokers = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get brokersInput() {
    return this._brokers;
  }

  // consume_orderly - computed: true, optional: true, required: false
  private _consumeOrderly?: boolean | cdktf.IResolvable; 
  public get consumeOrderly() {
    return this.getBooleanAttribute('consume_orderly');
  }
  public set consumeOrderly(value: boolean | cdktf.IResolvable) {
    this._consumeOrderly = value;
  }
  public resetConsumeOrderly() {
    this._consumeOrderly = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get consumeOrderlyInput() {
    return this._consumeOrderly;
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

  // enabled - computed: false, optional: true, required: false
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  public resetEnabled() {
    this._enabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
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

  // retry_max_times - computed: false, optional: false, required: true
  private _retryMaxTimes?: number; 
  public get retryMaxTimes() {
    return this.getNumberAttribute('retry_max_times');
  }
  public set retryMaxTimes(value: number) {
    this._retryMaxTimes = value;
  }
  // Temporarily expose input value. Use with caution.
  public get retryMaxTimesInput() {
    return this._retryMaxTimes;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      broadcast: cdktf.booleanToTerraform(this._broadcast),
      brokers: cdktf.listMapper(cdktf.stringToTerraform, false)(this._brokers),
      consume_orderly: cdktf.booleanToTerraform(this._consumeOrderly),
      description: cdktf.stringToTerraform(this._description),
      enabled: cdktf.booleanToTerraform(this._enabled),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      retry_max_times: cdktf.numberToTerraform(this._retryMaxTimes),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      broadcast: {
        value: cdktf.booleanToHclTerraform(this._broadcast),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      brokers: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._brokers),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      consume_orderly: {
        value: cdktf.booleanToHclTerraform(this._consumeOrderly),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enabled: {
        value: cdktf.booleanToHclTerraform(this._enabled),
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
      retry_max_times: {
        value: cdktf.numberToHclTerraform(this._retryMaxTimes),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

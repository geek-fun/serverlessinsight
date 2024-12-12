// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DmsQueueConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue#description DmsQueue#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue#id DmsQueue#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue#max_consume_count DmsQueue#max_consume_count}
  */
  readonly maxConsumeCount?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue#name DmsQueue#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue#queue_mode DmsQueue#queue_mode}
  */
  readonly queueMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue#redrive_policy DmsQueue#redrive_policy}
  */
  readonly redrivePolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue#region DmsQueue#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue#retention_hours DmsQueue#retention_hours}
  */
  readonly retentionHours?: number;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue huaweicloud_dms_queue}
*/
export class DmsQueue extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dms_queue";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DmsQueue resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DmsQueue to import
  * @param importFromId The id of the existing DmsQueue that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DmsQueue to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dms_queue", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dms_queue huaweicloud_dms_queue} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DmsQueueConfig
  */
  public constructor(scope: Construct, id: string, config: DmsQueueConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dms_queue',
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
    this._description = config.description;
    this._id = config.id;
    this._maxConsumeCount = config.maxConsumeCount;
    this._name = config.name;
    this._queueMode = config.queueMode;
    this._redrivePolicy = config.redrivePolicy;
    this._region = config.region;
    this._retentionHours = config.retentionHours;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created - computed: true, optional: false, required: false
  public get created() {
    return this.getStringAttribute('created');
  }

  // description - computed: true, optional: true, required: false
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

  // group_count - computed: true, optional: false, required: false
  public get groupCount() {
    return this.getNumberAttribute('group_count');
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

  // max_consume_count - computed: true, optional: true, required: false
  private _maxConsumeCount?: number; 
  public get maxConsumeCount() {
    return this.getNumberAttribute('max_consume_count');
  }
  public set maxConsumeCount(value: number) {
    this._maxConsumeCount = value;
  }
  public resetMaxConsumeCount() {
    this._maxConsumeCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxConsumeCountInput() {
    return this._maxConsumeCount;
  }

  // max_msg_size_byte - computed: true, optional: false, required: false
  public get maxMsgSizeByte() {
    return this.getNumberAttribute('max_msg_size_byte');
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

  // produced_messages - computed: true, optional: false, required: false
  public get producedMessages() {
    return this.getNumberAttribute('produced_messages');
  }

  // queue_mode - computed: true, optional: true, required: false
  private _queueMode?: string; 
  public get queueMode() {
    return this.getStringAttribute('queue_mode');
  }
  public set queueMode(value: string) {
    this._queueMode = value;
  }
  public resetQueueMode() {
    this._queueMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queueModeInput() {
    return this._queueMode;
  }

  // redrive_policy - computed: true, optional: true, required: false
  private _redrivePolicy?: string; 
  public get redrivePolicy() {
    return this.getStringAttribute('redrive_policy');
  }
  public set redrivePolicy(value: string) {
    this._redrivePolicy = value;
  }
  public resetRedrivePolicy() {
    this._redrivePolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redrivePolicyInput() {
    return this._redrivePolicy;
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

  // reservation - computed: true, optional: false, required: false
  public get reservation() {
    return this.getNumberAttribute('reservation');
  }

  // retention_hours - computed: true, optional: true, required: false
  private _retentionHours?: number; 
  public get retentionHours() {
    return this.getNumberAttribute('retention_hours');
  }
  public set retentionHours(value: number) {
    this._retentionHours = value;
  }
  public resetRetentionHours() {
    this._retentionHours = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retentionHoursInput() {
    return this._retentionHours;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      max_consume_count: cdktf.numberToTerraform(this._maxConsumeCount),
      name: cdktf.stringToTerraform(this._name),
      queue_mode: cdktf.stringToTerraform(this._queueMode),
      redrive_policy: cdktf.stringToTerraform(this._redrivePolicy),
      region: cdktf.stringToTerraform(this._region),
      retention_hours: cdktf.numberToTerraform(this._retentionHours),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      description: {
        value: cdktf.stringToHclTerraform(this._description),
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
      max_consume_count: {
        value: cdktf.numberToHclTerraform(this._maxConsumeCount),
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
      queue_mode: {
        value: cdktf.stringToHclTerraform(this._queueMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      redrive_policy: {
        value: cdktf.stringToHclTerraform(this._redrivePolicy),
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
      retention_hours: {
        value: cdktf.numberToHclTerraform(this._retentionHours),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

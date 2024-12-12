// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AsBandwidthPolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the alarm rule ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#alarm_id AsBandwidthPolicy#alarm_id}
  */
  readonly alarmId?: string;
  /**
  * Specifies the scaling bandwidth ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#bandwidth_id AsBandwidthPolicy#bandwidth_id}
  */
  readonly bandwidthId: string;
  /**
  * Specifies the cooldown period (in seconds).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#cool_down_time AsBandwidthPolicy#cool_down_time}
  */
  readonly coolDownTime?: number;
  /**
  * Specifies the description of the AS policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#description AsBandwidthPolicy#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#id AsBandwidthPolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#region AsBandwidthPolicy#region}
  */
  readonly region?: string;
  /**
  * Specifies the AS policy name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#scaling_policy_name AsBandwidthPolicy#scaling_policy_name}
  */
  readonly scalingPolicyName: string;
  /**
  * Specifies the AS policy type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#scaling_policy_type AsBandwidthPolicy#scaling_policy_type}
  */
  readonly scalingPolicyType: string;
  /**
  * scaling_policy_action block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#scaling_policy_action AsBandwidthPolicy#scaling_policy_action}
  */
  readonly scalingPolicyAction?: AsBandwidthPolicyScalingPolicyAction;
  /**
  * scheduled_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#scheduled_policy AsBandwidthPolicy#scheduled_policy}
  */
  readonly scheduledPolicy?: AsBandwidthPolicyScheduledPolicy;
}
export interface AsBandwidthPolicyScalingPolicyAction {
  /**
  * Specifies the operation restrictions.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#limits AsBandwidthPolicy#limits}
  */
  readonly limits?: number;
  /**
  * Specifies the operation to be performed. The default operation is ADD.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#operation AsBandwidthPolicy#operation}
  */
  readonly operation?: string;
  /**
  * Specifies the bandwidth (Mbit/s).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#size AsBandwidthPolicy#size}
  */
  readonly size?: number;
}

export function asBandwidthPolicyScalingPolicyActionToTerraform(struct?: AsBandwidthPolicyScalingPolicyActionOutputReference | AsBandwidthPolicyScalingPolicyAction): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    limits: cdktf.numberToTerraform(struct!.limits),
    operation: cdktf.stringToTerraform(struct!.operation),
    size: cdktf.numberToTerraform(struct!.size),
  }
}


export function asBandwidthPolicyScalingPolicyActionToHclTerraform(struct?: AsBandwidthPolicyScalingPolicyActionOutputReference | AsBandwidthPolicyScalingPolicyAction): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    limits: {
      value: cdktf.numberToHclTerraform(struct!.limits),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    operation: {
      value: cdktf.stringToHclTerraform(struct!.operation),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AsBandwidthPolicyScalingPolicyActionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AsBandwidthPolicyScalingPolicyAction | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._limits !== undefined) {
      hasAnyValues = true;
      internalValueResult.limits = this._limits;
    }
    if (this._operation !== undefined) {
      hasAnyValues = true;
      internalValueResult.operation = this._operation;
    }
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AsBandwidthPolicyScalingPolicyAction | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._limits = undefined;
      this._operation = undefined;
      this._size = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._limits = value.limits;
      this._operation = value.operation;
      this._size = value.size;
    }
  }

  // limits - computed: true, optional: true, required: false
  private _limits?: number; 
  public get limits() {
    return this.getNumberAttribute('limits');
  }
  public set limits(value: number) {
    this._limits = value;
  }
  public resetLimits() {
    this._limits = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get limitsInput() {
    return this._limits;
  }

  // operation - computed: true, optional: true, required: false
  private _operation?: string; 
  public get operation() {
    return this.getStringAttribute('operation');
  }
  public set operation(value: string) {
    this._operation = value;
  }
  public resetOperation() {
    this._operation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get operationInput() {
    return this._operation;
  }

  // size - computed: true, optional: true, required: false
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  public resetSize() {
    this._size = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }
}
export interface AsBandwidthPolicyScheduledPolicy {
  /**
  * Specifies the end time of the scaling action triggered periodically.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#end_time AsBandwidthPolicy#end_time}
  */
  readonly endTime?: string;
  /**
  * Specifies the time when the scaling action is triggered. The time format complies with UTC.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#launch_time AsBandwidthPolicy#launch_time}
  */
  readonly launchTime: string;
  /**
  * Specifies the periodic triggering type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#recurrence_type AsBandwidthPolicy#recurrence_type}
  */
  readonly recurrenceType?: string;
  /**
  * Specifies the day when a periodic scaling action is triggered.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#recurrence_value AsBandwidthPolicy#recurrence_value}
  */
  readonly recurrenceValue?: string;
  /**
  * Specifies the start time of the scaling action triggered periodically.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#start_time AsBandwidthPolicy#start_time}
  */
  readonly startTime?: string;
}

export function asBandwidthPolicyScheduledPolicyToTerraform(struct?: AsBandwidthPolicyScheduledPolicyOutputReference | AsBandwidthPolicyScheduledPolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    end_time: cdktf.stringToTerraform(struct!.endTime),
    launch_time: cdktf.stringToTerraform(struct!.launchTime),
    recurrence_type: cdktf.stringToTerraform(struct!.recurrenceType),
    recurrence_value: cdktf.stringToTerraform(struct!.recurrenceValue),
    start_time: cdktf.stringToTerraform(struct!.startTime),
  }
}


export function asBandwidthPolicyScheduledPolicyToHclTerraform(struct?: AsBandwidthPolicyScheduledPolicyOutputReference | AsBandwidthPolicyScheduledPolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    end_time: {
      value: cdktf.stringToHclTerraform(struct!.endTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    launch_time: {
      value: cdktf.stringToHclTerraform(struct!.launchTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    recurrence_type: {
      value: cdktf.stringToHclTerraform(struct!.recurrenceType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    recurrence_value: {
      value: cdktf.stringToHclTerraform(struct!.recurrenceValue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    start_time: {
      value: cdktf.stringToHclTerraform(struct!.startTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AsBandwidthPolicyScheduledPolicyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AsBandwidthPolicyScheduledPolicy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._endTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.endTime = this._endTime;
    }
    if (this._launchTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.launchTime = this._launchTime;
    }
    if (this._recurrenceType !== undefined) {
      hasAnyValues = true;
      internalValueResult.recurrenceType = this._recurrenceType;
    }
    if (this._recurrenceValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.recurrenceValue = this._recurrenceValue;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AsBandwidthPolicyScheduledPolicy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._endTime = undefined;
      this._launchTime = undefined;
      this._recurrenceType = undefined;
      this._recurrenceValue = undefined;
      this._startTime = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._endTime = value.endTime;
      this._launchTime = value.launchTime;
      this._recurrenceType = value.recurrenceType;
      this._recurrenceValue = value.recurrenceValue;
      this._startTime = value.startTime;
    }
  }

  // end_time - computed: true, optional: true, required: false
  private _endTime?: string; 
  public get endTime() {
    return this.getStringAttribute('end_time');
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
  public resetEndTime() {
    this._endTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endTimeInput() {
    return this._endTime;
  }

  // launch_time - computed: false, optional: false, required: true
  private _launchTime?: string; 
  public get launchTime() {
    return this.getStringAttribute('launch_time');
  }
  public set launchTime(value: string) {
    this._launchTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get launchTimeInput() {
    return this._launchTime;
  }

  // recurrence_type - computed: true, optional: true, required: false
  private _recurrenceType?: string; 
  public get recurrenceType() {
    return this.getStringAttribute('recurrence_type');
  }
  public set recurrenceType(value: string) {
    this._recurrenceType = value;
  }
  public resetRecurrenceType() {
    this._recurrenceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recurrenceTypeInput() {
    return this._recurrenceType;
  }

  // recurrence_value - computed: true, optional: true, required: false
  private _recurrenceValue?: string; 
  public get recurrenceValue() {
    return this.getStringAttribute('recurrence_value');
  }
  public set recurrenceValue(value: string) {
    this._recurrenceValue = value;
  }
  public resetRecurrenceValue() {
    this._recurrenceValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recurrenceValueInput() {
    return this._recurrenceValue;
  }

  // start_time - computed: true, optional: true, required: false
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  public resetStartTime() {
    this._startTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy huaweicloud_as_bandwidth_policy}
*/
export class AsBandwidthPolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_as_bandwidth_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AsBandwidthPolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AsBandwidthPolicy to import
  * @param importFromId The id of the existing AsBandwidthPolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AsBandwidthPolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_as_bandwidth_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_bandwidth_policy huaweicloud_as_bandwidth_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AsBandwidthPolicyConfig
  */
  public constructor(scope: Construct, id: string, config: AsBandwidthPolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_as_bandwidth_policy',
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
    this._alarmId = config.alarmId;
    this._bandwidthId = config.bandwidthId;
    this._coolDownTime = config.coolDownTime;
    this._description = config.description;
    this._id = config.id;
    this._region = config.region;
    this._scalingPolicyName = config.scalingPolicyName;
    this._scalingPolicyType = config.scalingPolicyType;
    this._scalingPolicyAction.internalValue = config.scalingPolicyAction;
    this._scheduledPolicy.internalValue = config.scheduledPolicy;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // alarm_id - computed: true, optional: true, required: false
  private _alarmId?: string; 
  public get alarmId() {
    return this.getStringAttribute('alarm_id');
  }
  public set alarmId(value: string) {
    this._alarmId = value;
  }
  public resetAlarmId() {
    this._alarmId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmIdInput() {
    return this._alarmId;
  }

  // bandwidth_id - computed: false, optional: false, required: true
  private _bandwidthId?: string; 
  public get bandwidthId() {
    return this.getStringAttribute('bandwidth_id');
  }
  public set bandwidthId(value: string) {
    this._bandwidthId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthIdInput() {
    return this._bandwidthId;
  }

  // cool_down_time - computed: true, optional: true, required: false
  private _coolDownTime?: number; 
  public get coolDownTime() {
    return this.getNumberAttribute('cool_down_time');
  }
  public set coolDownTime(value: number) {
    this._coolDownTime = value;
  }
  public resetCoolDownTime() {
    this._coolDownTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get coolDownTimeInput() {
    return this._coolDownTime;
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

  // scaling_policy_name - computed: false, optional: false, required: true
  private _scalingPolicyName?: string; 
  public get scalingPolicyName() {
    return this.getStringAttribute('scaling_policy_name');
  }
  public set scalingPolicyName(value: string) {
    this._scalingPolicyName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingPolicyNameInput() {
    return this._scalingPolicyName;
  }

  // scaling_policy_type - computed: false, optional: false, required: true
  private _scalingPolicyType?: string; 
  public get scalingPolicyType() {
    return this.getStringAttribute('scaling_policy_type');
  }
  public set scalingPolicyType(value: string) {
    this._scalingPolicyType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingPolicyTypeInput() {
    return this._scalingPolicyType;
  }

  // scaling_resource_type - computed: true, optional: false, required: false
  public get scalingResourceType() {
    return this.getStringAttribute('scaling_resource_type');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // scaling_policy_action - computed: false, optional: true, required: false
  private _scalingPolicyAction = new AsBandwidthPolicyScalingPolicyActionOutputReference(this, "scaling_policy_action");
  public get scalingPolicyAction() {
    return this._scalingPolicyAction;
  }
  public putScalingPolicyAction(value: AsBandwidthPolicyScalingPolicyAction) {
    this._scalingPolicyAction.internalValue = value;
  }
  public resetScalingPolicyAction() {
    this._scalingPolicyAction.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingPolicyActionInput() {
    return this._scalingPolicyAction.internalValue;
  }

  // scheduled_policy - computed: false, optional: true, required: false
  private _scheduledPolicy = new AsBandwidthPolicyScheduledPolicyOutputReference(this, "scheduled_policy");
  public get scheduledPolicy() {
    return this._scheduledPolicy;
  }
  public putScheduledPolicy(value: AsBandwidthPolicyScheduledPolicy) {
    this._scheduledPolicy.internalValue = value;
  }
  public resetScheduledPolicy() {
    this._scheduledPolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scheduledPolicyInput() {
    return this._scheduledPolicy.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      alarm_id: cdktf.stringToTerraform(this._alarmId),
      bandwidth_id: cdktf.stringToTerraform(this._bandwidthId),
      cool_down_time: cdktf.numberToTerraform(this._coolDownTime),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      scaling_policy_name: cdktf.stringToTerraform(this._scalingPolicyName),
      scaling_policy_type: cdktf.stringToTerraform(this._scalingPolicyType),
      scaling_policy_action: asBandwidthPolicyScalingPolicyActionToTerraform(this._scalingPolicyAction.internalValue),
      scheduled_policy: asBandwidthPolicyScheduledPolicyToTerraform(this._scheduledPolicy.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      alarm_id: {
        value: cdktf.stringToHclTerraform(this._alarmId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      bandwidth_id: {
        value: cdktf.stringToHclTerraform(this._bandwidthId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cool_down_time: {
        value: cdktf.numberToHclTerraform(this._coolDownTime),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
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
      scaling_policy_name: {
        value: cdktf.stringToHclTerraform(this._scalingPolicyName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      scaling_policy_type: {
        value: cdktf.stringToHclTerraform(this._scalingPolicyType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      scaling_policy_action: {
        value: asBandwidthPolicyScalingPolicyActionToHclTerraform(this._scalingPolicyAction.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AsBandwidthPolicyScalingPolicyActionList",
      },
      scheduled_policy: {
        value: asBandwidthPolicyScheduledPolicyToHclTerraform(this._scheduledPolicy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AsBandwidthPolicyScheduledPolicyList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

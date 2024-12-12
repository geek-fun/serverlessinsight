// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AsPlannedTaskConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#id AsPlannedTask#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the planned task to create.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#name AsPlannedTask#name}
  */
  readonly name: string;
  /**
  * The region where the planned task resource are located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#region AsPlannedTask#region}
  */
  readonly region?: string;
  /**
  * The ID of the scaling group where the planned task to create.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#scaling_group_id AsPlannedTask#scaling_group_id}
  */
  readonly scalingGroupId: string;
  /**
  * instance_number block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#instance_number AsPlannedTask#instance_number}
  */
  readonly instanceNumber: AsPlannedTaskInstanceNumber;
  /**
  * scheduled_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#scheduled_policy AsPlannedTask#scheduled_policy}
  */
  readonly scheduledPolicy: AsPlannedTaskScheduledPolicy;
}
export interface AsPlannedTaskInstanceNumber {
  /**
  * The expected number of instances for the scaling group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#desire AsPlannedTask#desire}
  */
  readonly desire?: string;
  /**
  * The maximum number of instances for the scaling group
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#max AsPlannedTask#max}
  */
  readonly max?: string;
  /**
  * The minimum number of instances for the scaling group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#min AsPlannedTask#min}
  */
  readonly min?: string;
}

export function asPlannedTaskInstanceNumberToTerraform(struct?: AsPlannedTaskInstanceNumberOutputReference | AsPlannedTaskInstanceNumber): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    desire: cdktf.stringToTerraform(struct!.desire),
    max: cdktf.stringToTerraform(struct!.max),
    min: cdktf.stringToTerraform(struct!.min),
  }
}


export function asPlannedTaskInstanceNumberToHclTerraform(struct?: AsPlannedTaskInstanceNumberOutputReference | AsPlannedTaskInstanceNumber): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    desire: {
      value: cdktf.stringToHclTerraform(struct!.desire),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max: {
      value: cdktf.stringToHclTerraform(struct!.max),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    min: {
      value: cdktf.stringToHclTerraform(struct!.min),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AsPlannedTaskInstanceNumberOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AsPlannedTaskInstanceNumber | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._desire !== undefined) {
      hasAnyValues = true;
      internalValueResult.desire = this._desire;
    }
    if (this._max !== undefined) {
      hasAnyValues = true;
      internalValueResult.max = this._max;
    }
    if (this._min !== undefined) {
      hasAnyValues = true;
      internalValueResult.min = this._min;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AsPlannedTaskInstanceNumber | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._desire = undefined;
      this._max = undefined;
      this._min = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._desire = value.desire;
      this._max = value.max;
      this._min = value.min;
    }
  }

  // desire - computed: false, optional: true, required: false
  private _desire?: string; 
  public get desire() {
    return this.getStringAttribute('desire');
  }
  public set desire(value: string) {
    this._desire = value;
  }
  public resetDesire() {
    this._desire = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get desireInput() {
    return this._desire;
  }

  // max - computed: false, optional: true, required: false
  private _max?: string; 
  public get max() {
    return this.getStringAttribute('max');
  }
  public set max(value: string) {
    this._max = value;
  }
  public resetMax() {
    this._max = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxInput() {
    return this._max;
  }

  // min - computed: false, optional: true, required: false
  private _min?: string; 
  public get min() {
    return this.getStringAttribute('min');
  }
  public set min(value: string) {
    this._min = value;
  }
  public resetMin() {
    this._min = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get minInput() {
    return this._min;
  }
}
export interface AsPlannedTaskScheduledPolicy {
  /**
  * The effective end time of planned task
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#end_time AsPlannedTask#end_time}
  */
  readonly endTime?: string;
  /**
  * The execution time of planned task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#launch_time AsPlannedTask#launch_time}
  */
  readonly launchTime: string;
  /**
  * The triggering type of planned task
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#recurrence_type AsPlannedTask#recurrence_type}
  */
  readonly recurrenceType?: string;
  /**
  * The frequency at which planned task are triggered
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#recurrence_value AsPlannedTask#recurrence_value}
  */
  readonly recurrenceValue?: string;
  /**
  * The effective start time of planned task.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#start_time AsPlannedTask#start_time}
  */
  readonly startTime?: string;
}

export function asPlannedTaskScheduledPolicyToTerraform(struct?: AsPlannedTaskScheduledPolicyOutputReference | AsPlannedTaskScheduledPolicy): any {
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


export function asPlannedTaskScheduledPolicyToHclTerraform(struct?: AsPlannedTaskScheduledPolicyOutputReference | AsPlannedTaskScheduledPolicy): any {
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

export class AsPlannedTaskScheduledPolicyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AsPlannedTaskScheduledPolicy | undefined {
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

  public set internalValue(value: AsPlannedTaskScheduledPolicy | undefined) {
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

  // end_time - computed: false, optional: true, required: false
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

  // recurrence_type - computed: false, optional: true, required: false
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

  // recurrence_value - computed: false, optional: true, required: false
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

  // start_time - computed: false, optional: true, required: false
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task huaweicloud_as_planned_task}
*/
export class AsPlannedTask extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_as_planned_task";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AsPlannedTask resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AsPlannedTask to import
  * @param importFromId The id of the existing AsPlannedTask that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AsPlannedTask to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_as_planned_task", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_planned_task huaweicloud_as_planned_task} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AsPlannedTaskConfig
  */
  public constructor(scope: Construct, id: string, config: AsPlannedTaskConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_as_planned_task',
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
    this._name = config.name;
    this._region = config.region;
    this._scalingGroupId = config.scalingGroupId;
    this._instanceNumber.internalValue = config.instanceNumber;
    this._scheduledPolicy.internalValue = config.scheduledPolicy;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // scaling_group_id - computed: false, optional: false, required: true
  private _scalingGroupId?: string; 
  public get scalingGroupId() {
    return this.getStringAttribute('scaling_group_id');
  }
  public set scalingGroupId(value: string) {
    this._scalingGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingGroupIdInput() {
    return this._scalingGroupId;
  }

  // instance_number - computed: false, optional: false, required: true
  private _instanceNumber = new AsPlannedTaskInstanceNumberOutputReference(this, "instance_number");
  public get instanceNumber() {
    return this._instanceNumber;
  }
  public putInstanceNumber(value: AsPlannedTaskInstanceNumber) {
    this._instanceNumber.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceNumberInput() {
    return this._instanceNumber.internalValue;
  }

  // scheduled_policy - computed: false, optional: false, required: true
  private _scheduledPolicy = new AsPlannedTaskScheduledPolicyOutputReference(this, "scheduled_policy");
  public get scheduledPolicy() {
    return this._scheduledPolicy;
  }
  public putScheduledPolicy(value: AsPlannedTaskScheduledPolicy) {
    this._scheduledPolicy.internalValue = value;
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
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      scaling_group_id: cdktf.stringToTerraform(this._scalingGroupId),
      instance_number: asPlannedTaskInstanceNumberToTerraform(this._instanceNumber.internalValue),
      scheduled_policy: asPlannedTaskScheduledPolicyToTerraform(this._scheduledPolicy.internalValue),
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
      scaling_group_id: {
        value: cdktf.stringToHclTerraform(this._scalingGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      instance_number: {
        value: asPlannedTaskInstanceNumberToHclTerraform(this._instanceNumber.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AsPlannedTaskInstanceNumberList",
      },
      scheduled_policy: {
        value: asPlannedTaskScheduledPolicyToHclTerraform(this._scheduledPolicy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AsPlannedTaskScheduledPolicyList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

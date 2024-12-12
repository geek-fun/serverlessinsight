// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CbrPolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * The maximum number of retained backups.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#backup_quantity CbrPolicy#backup_quantity}
  */
  readonly backupQuantity?: number;
  /**
  * The ID of the replication destination project.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#destination_project_id CbrPolicy#destination_project_id}
  */
  readonly destinationProjectId?: string;
  /**
  * The name of the replication destination region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#destination_region CbrPolicy#destination_region}
  */
  readonly destinationRegion?: string;
  /**
  * Whether to enable the acceleration function to shorten the replication time for cross-region
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#enable_acceleration CbrPolicy#enable_acceleration}
  */
  readonly enableAcceleration?: boolean | cdktf.IResolvable;
  /**
  * Whether to enable the CBR policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#enabled CbrPolicy#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#id CbrPolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The policy name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#name CbrPolicy#name}
  */
  readonly name: string;
  /**
  * The region where the policy is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#region CbrPolicy#region}
  */
  readonly region?: string;
  /**
  * The duration (in days) for retained backups.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#time_period CbrPolicy#time_period}
  */
  readonly timePeriod?: number;
  /**
  * The UTC time zone.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#time_zone CbrPolicy#time_zone}
  */
  readonly timeZone?: string;
  /**
  * The protection type of the CBR policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#type CbrPolicy#type}
  */
  readonly type: string;
  /**
  * backup_cycle block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#backup_cycle CbrPolicy#backup_cycle}
  */
  readonly backupCycle: CbrPolicyBackupCycle;
  /**
  * long_term_retention block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#long_term_retention CbrPolicy#long_term_retention}
  */
  readonly longTermRetention?: CbrPolicyLongTermRetention;
}
export interface CbrPolicyBackupCycle {
  /**
  * The weekly backup time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#days CbrPolicy#days}
  */
  readonly days?: string;
  /**
  * The execution time of the policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#execution_times CbrPolicy#execution_times}
  */
  readonly executionTimes: string[];
  /**
  * The number of days between each backup.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#interval CbrPolicy#interval}
  */
  readonly interval?: number;
}

export function cbrPolicyBackupCycleToTerraform(struct?: CbrPolicyBackupCycleOutputReference | CbrPolicyBackupCycle): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    days: cdktf.stringToTerraform(struct!.days),
    execution_times: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.executionTimes),
    interval: cdktf.numberToTerraform(struct!.interval),
  }
}


export function cbrPolicyBackupCycleToHclTerraform(struct?: CbrPolicyBackupCycleOutputReference | CbrPolicyBackupCycle): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    days: {
      value: cdktf.stringToHclTerraform(struct!.days),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    execution_times: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.executionTimes),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    interval: {
      value: cdktf.numberToHclTerraform(struct!.interval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CbrPolicyBackupCycleOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CbrPolicyBackupCycle | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._days !== undefined) {
      hasAnyValues = true;
      internalValueResult.days = this._days;
    }
    if (this._executionTimes !== undefined) {
      hasAnyValues = true;
      internalValueResult.executionTimes = this._executionTimes;
    }
    if (this._interval !== undefined) {
      hasAnyValues = true;
      internalValueResult.interval = this._interval;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CbrPolicyBackupCycle | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._days = undefined;
      this._executionTimes = undefined;
      this._interval = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._days = value.days;
      this._executionTimes = value.executionTimes;
      this._interval = value.interval;
    }
  }

  // days - computed: false, optional: true, required: false
  private _days?: string; 
  public get days() {
    return this.getStringAttribute('days');
  }
  public set days(value: string) {
    this._days = value;
  }
  public resetDays() {
    this._days = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get daysInput() {
    return this._days;
  }

  // execution_times - computed: false, optional: false, required: true
  private _executionTimes?: string[]; 
  public get executionTimes() {
    return this.getListAttribute('execution_times');
  }
  public set executionTimes(value: string[]) {
    this._executionTimes = value;
  }
  // Temporarily expose input value. Use with caution.
  public get executionTimesInput() {
    return this._executionTimes;
  }

  // interval - computed: false, optional: true, required: false
  private _interval?: number; 
  public get interval() {
    return this.getNumberAttribute('interval');
  }
  public set interval(value: number) {
    this._interval = value;
  }
  public resetInterval() {
    this._interval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get intervalInput() {
    return this._interval;
  }
}
export interface CbrPolicyLongTermRetention {
  /**
  * The latest backup of each day is saved in the long term.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#daily CbrPolicy#daily}
  */
  readonly daily?: number;
  /**
  * How often (after how many incremental backups) a full backup is performed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#full_backup_interval CbrPolicy#full_backup_interval}
  */
  readonly fullBackupInterval?: number;
  /**
  * The latest backup of each month is saved in the long term.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#monthly CbrPolicy#monthly}
  */
  readonly monthly?: number;
  /**
  * The latest backup of each week is saved in the long term.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#weekly CbrPolicy#weekly}
  */
  readonly weekly?: number;
  /**
  * The latest backup of each year is saved in the long term.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#yearly CbrPolicy#yearly}
  */
  readonly yearly?: number;
}

export function cbrPolicyLongTermRetentionToTerraform(struct?: CbrPolicyLongTermRetentionOutputReference | CbrPolicyLongTermRetention): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    daily: cdktf.numberToTerraform(struct!.daily),
    full_backup_interval: cdktf.numberToTerraform(struct!.fullBackupInterval),
    monthly: cdktf.numberToTerraform(struct!.monthly),
    weekly: cdktf.numberToTerraform(struct!.weekly),
    yearly: cdktf.numberToTerraform(struct!.yearly),
  }
}


export function cbrPolicyLongTermRetentionToHclTerraform(struct?: CbrPolicyLongTermRetentionOutputReference | CbrPolicyLongTermRetention): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    daily: {
      value: cdktf.numberToHclTerraform(struct!.daily),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    full_backup_interval: {
      value: cdktf.numberToHclTerraform(struct!.fullBackupInterval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    monthly: {
      value: cdktf.numberToHclTerraform(struct!.monthly),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    weekly: {
      value: cdktf.numberToHclTerraform(struct!.weekly),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    yearly: {
      value: cdktf.numberToHclTerraform(struct!.yearly),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CbrPolicyLongTermRetentionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CbrPolicyLongTermRetention | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._daily !== undefined) {
      hasAnyValues = true;
      internalValueResult.daily = this._daily;
    }
    if (this._fullBackupInterval !== undefined) {
      hasAnyValues = true;
      internalValueResult.fullBackupInterval = this._fullBackupInterval;
    }
    if (this._monthly !== undefined) {
      hasAnyValues = true;
      internalValueResult.monthly = this._monthly;
    }
    if (this._weekly !== undefined) {
      hasAnyValues = true;
      internalValueResult.weekly = this._weekly;
    }
    if (this._yearly !== undefined) {
      hasAnyValues = true;
      internalValueResult.yearly = this._yearly;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CbrPolicyLongTermRetention | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._daily = undefined;
      this._fullBackupInterval = undefined;
      this._monthly = undefined;
      this._weekly = undefined;
      this._yearly = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._daily = value.daily;
      this._fullBackupInterval = value.fullBackupInterval;
      this._monthly = value.monthly;
      this._weekly = value.weekly;
      this._yearly = value.yearly;
    }
  }

  // daily - computed: false, optional: true, required: false
  private _daily?: number; 
  public get daily() {
    return this.getNumberAttribute('daily');
  }
  public set daily(value: number) {
    this._daily = value;
  }
  public resetDaily() {
    this._daily = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dailyInput() {
    return this._daily;
  }

  // full_backup_interval - computed: false, optional: true, required: false
  private _fullBackupInterval?: number; 
  public get fullBackupInterval() {
    return this.getNumberAttribute('full_backup_interval');
  }
  public set fullBackupInterval(value: number) {
    this._fullBackupInterval = value;
  }
  public resetFullBackupInterval() {
    this._fullBackupInterval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fullBackupIntervalInput() {
    return this._fullBackupInterval;
  }

  // monthly - computed: false, optional: true, required: false
  private _monthly?: number; 
  public get monthly() {
    return this.getNumberAttribute('monthly');
  }
  public set monthly(value: number) {
    this._monthly = value;
  }
  public resetMonthly() {
    this._monthly = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get monthlyInput() {
    return this._monthly;
  }

  // weekly - computed: false, optional: true, required: false
  private _weekly?: number; 
  public get weekly() {
    return this.getNumberAttribute('weekly');
  }
  public set weekly(value: number) {
    this._weekly = value;
  }
  public resetWeekly() {
    this._weekly = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get weeklyInput() {
    return this._weekly;
  }

  // yearly - computed: false, optional: true, required: false
  private _yearly?: number; 
  public get yearly() {
    return this.getNumberAttribute('yearly');
  }
  public set yearly(value: number) {
    this._yearly = value;
  }
  public resetYearly() {
    this._yearly = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get yearlyInput() {
    return this._yearly;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy huaweicloud_cbr_policy}
*/
export class CbrPolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cbr_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CbrPolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CbrPolicy to import
  * @param importFromId The id of the existing CbrPolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CbrPolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cbr_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cbr_policy huaweicloud_cbr_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CbrPolicyConfig
  */
  public constructor(scope: Construct, id: string, config: CbrPolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cbr_policy',
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
    this._backupQuantity = config.backupQuantity;
    this._destinationProjectId = config.destinationProjectId;
    this._destinationRegion = config.destinationRegion;
    this._enableAcceleration = config.enableAcceleration;
    this._enabled = config.enabled;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._timePeriod = config.timePeriod;
    this._timeZone = config.timeZone;
    this._type = config.type;
    this._backupCycle.internalValue = config.backupCycle;
    this._longTermRetention.internalValue = config.longTermRetention;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backup_quantity - computed: false, optional: true, required: false
  private _backupQuantity?: number; 
  public get backupQuantity() {
    return this.getNumberAttribute('backup_quantity');
  }
  public set backupQuantity(value: number) {
    this._backupQuantity = value;
  }
  public resetBackupQuantity() {
    this._backupQuantity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backupQuantityInput() {
    return this._backupQuantity;
  }

  // destination_project_id - computed: false, optional: true, required: false
  private _destinationProjectId?: string; 
  public get destinationProjectId() {
    return this.getStringAttribute('destination_project_id');
  }
  public set destinationProjectId(value: string) {
    this._destinationProjectId = value;
  }
  public resetDestinationProjectId() {
    this._destinationProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationProjectIdInput() {
    return this._destinationProjectId;
  }

  // destination_region - computed: false, optional: true, required: false
  private _destinationRegion?: string; 
  public get destinationRegion() {
    return this.getStringAttribute('destination_region');
  }
  public set destinationRegion(value: string) {
    this._destinationRegion = value;
  }
  public resetDestinationRegion() {
    this._destinationRegion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationRegionInput() {
    return this._destinationRegion;
  }

  // enable_acceleration - computed: false, optional: true, required: false
  private _enableAcceleration?: boolean | cdktf.IResolvable; 
  public get enableAcceleration() {
    return this.getBooleanAttribute('enable_acceleration');
  }
  public set enableAcceleration(value: boolean | cdktf.IResolvable) {
    this._enableAcceleration = value;
  }
  public resetEnableAcceleration() {
    this._enableAcceleration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableAccelerationInput() {
    return this._enableAcceleration;
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

  // time_period - computed: false, optional: true, required: false
  private _timePeriod?: number; 
  public get timePeriod() {
    return this.getNumberAttribute('time_period');
  }
  public set timePeriod(value: number) {
    this._timePeriod = value;
  }
  public resetTimePeriod() {
    this._timePeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timePeriodInput() {
    return this._timePeriod;
  }

  // time_zone - computed: true, optional: true, required: false
  private _timeZone?: string; 
  public get timeZone() {
    return this.getStringAttribute('time_zone');
  }
  public set timeZone(value: string) {
    this._timeZone = value;
  }
  public resetTimeZone() {
    this._timeZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeZoneInput() {
    return this._timeZone;
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

  // backup_cycle - computed: false, optional: false, required: true
  private _backupCycle = new CbrPolicyBackupCycleOutputReference(this, "backup_cycle");
  public get backupCycle() {
    return this._backupCycle;
  }
  public putBackupCycle(value: CbrPolicyBackupCycle) {
    this._backupCycle.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get backupCycleInput() {
    return this._backupCycle.internalValue;
  }

  // long_term_retention - computed: false, optional: true, required: false
  private _longTermRetention = new CbrPolicyLongTermRetentionOutputReference(this, "long_term_retention");
  public get longTermRetention() {
    return this._longTermRetention;
  }
  public putLongTermRetention(value: CbrPolicyLongTermRetention) {
    this._longTermRetention.internalValue = value;
  }
  public resetLongTermRetention() {
    this._longTermRetention.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get longTermRetentionInput() {
    return this._longTermRetention.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      backup_quantity: cdktf.numberToTerraform(this._backupQuantity),
      destination_project_id: cdktf.stringToTerraform(this._destinationProjectId),
      destination_region: cdktf.stringToTerraform(this._destinationRegion),
      enable_acceleration: cdktf.booleanToTerraform(this._enableAcceleration),
      enabled: cdktf.booleanToTerraform(this._enabled),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      time_period: cdktf.numberToTerraform(this._timePeriod),
      time_zone: cdktf.stringToTerraform(this._timeZone),
      type: cdktf.stringToTerraform(this._type),
      backup_cycle: cbrPolicyBackupCycleToTerraform(this._backupCycle.internalValue),
      long_term_retention: cbrPolicyLongTermRetentionToTerraform(this._longTermRetention.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      backup_quantity: {
        value: cdktf.numberToHclTerraform(this._backupQuantity),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      destination_project_id: {
        value: cdktf.stringToHclTerraform(this._destinationProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_region: {
        value: cdktf.stringToHclTerraform(this._destinationRegion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_acceleration: {
        value: cdktf.booleanToHclTerraform(this._enableAcceleration),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      time_period: {
        value: cdktf.numberToHclTerraform(this._timePeriod),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      time_zone: {
        value: cdktf.stringToHclTerraform(this._timeZone),
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
      backup_cycle: {
        value: cbrPolicyBackupCycleToHclTerraform(this._backupCycle.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CbrPolicyBackupCycleList",
      },
      long_term_retention: {
        value: cbrPolicyLongTermRetentionToHclTerraform(this._longTermRetention.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CbrPolicyLongTermRetentionList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

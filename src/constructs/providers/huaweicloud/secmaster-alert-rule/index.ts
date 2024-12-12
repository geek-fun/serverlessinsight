// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SecmasterAlertRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the custom information of the alert rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#custom_information SecmasterAlertRule#custom_information}
  */
  readonly customInformation?: { [key: string]: string };
  /**
  * Specifies whether to generate debugging alarms.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#debugging_alarm SecmasterAlertRule#debugging_alarm}
  */
  readonly debuggingAlarm?: boolean | cdktf.IResolvable;
  /**
  * Specifies the description of the alert rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#description SecmasterAlertRule#description}
  */
  readonly description: string;
  /**
  * Specifies whether to put events in a group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#event_grouping SecmasterAlertRule#event_grouping}
  */
  readonly eventGrouping?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#id SecmasterAlertRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the alert rule name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#name SecmasterAlertRule#name}
  */
  readonly name: string;
  /**
  * Specifies the pipeline ID of the alert rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#pipeline_id SecmasterAlertRule#pipeline_id}
  */
  readonly pipelineId: string;
  /**
  * Specifies the query rule of the alert rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#query_rule SecmasterAlertRule#query_rule}
  */
  readonly queryRule: string;
  /**
  * Specifies the query type of the alert rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#query_type SecmasterAlertRule#query_type}
  */
  readonly queryType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#region SecmasterAlertRule#region}
  */
  readonly region?: string;
  /**
  * Specifies the severity of the alert rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#severity SecmasterAlertRule#severity}
  */
  readonly severity: string;
  /**
  * Specifies the status of the alert rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#status SecmasterAlertRule#status}
  */
  readonly status: string;
  /**
  * Specifies whether to stop the query when an alarm is generated.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#suppression SecmasterAlertRule#suppression}
  */
  readonly suppression?: boolean | cdktf.IResolvable;
  /**
  * Specifies the type of the alert rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#type SecmasterAlertRule#type}
  */
  readonly type: { [key: string]: string };
  /**
  * Specifies the ID of the workspace to which the alert rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#workspace_id SecmasterAlertRule#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * query_plan block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#query_plan SecmasterAlertRule#query_plan}
  */
  readonly queryPlan: SecmasterAlertRuleQueryPlan;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#timeouts SecmasterAlertRule#timeouts}
  */
  readonly timeouts?: SecmasterAlertRuleTimeouts;
  /**
  * triggers block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#triggers SecmasterAlertRule#triggers}
  */
  readonly triggers: SecmasterAlertRuleTriggers[] | cdktf.IResolvable;
}
export interface SecmasterAlertRuleQueryPlan {
  /**
  * Specifies the execution delay in minutes.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#execution_delay SecmasterAlertRule#execution_delay}
  */
  readonly executionDelay?: number;
  /**
  * Specifies the overtime interval in minutes.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#overtime_interval SecmasterAlertRule#overtime_interval}
  */
  readonly overtimeInterval?: number;
  /**
  * Specifies the query interval.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#query_interval SecmasterAlertRule#query_interval}
  */
  readonly queryInterval: number;
  /**
  * Specifies the query interval unit.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#query_interval_unit SecmasterAlertRule#query_interval_unit}
  */
  readonly queryIntervalUnit: string;
  /**
  * Specifies the time window.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#time_window SecmasterAlertRule#time_window}
  */
  readonly timeWindow: number;
  /**
  * Specifies the time window unit.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#time_window_unit SecmasterAlertRule#time_window_unit}
  */
  readonly timeWindowUnit: string;
}

export function secmasterAlertRuleQueryPlanToTerraform(struct?: SecmasterAlertRuleQueryPlanOutputReference | SecmasterAlertRuleQueryPlan): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    execution_delay: cdktf.numberToTerraform(struct!.executionDelay),
    overtime_interval: cdktf.numberToTerraform(struct!.overtimeInterval),
    query_interval: cdktf.numberToTerraform(struct!.queryInterval),
    query_interval_unit: cdktf.stringToTerraform(struct!.queryIntervalUnit),
    time_window: cdktf.numberToTerraform(struct!.timeWindow),
    time_window_unit: cdktf.stringToTerraform(struct!.timeWindowUnit),
  }
}


export function secmasterAlertRuleQueryPlanToHclTerraform(struct?: SecmasterAlertRuleQueryPlanOutputReference | SecmasterAlertRuleQueryPlan): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    execution_delay: {
      value: cdktf.numberToHclTerraform(struct!.executionDelay),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    overtime_interval: {
      value: cdktf.numberToHclTerraform(struct!.overtimeInterval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    query_interval: {
      value: cdktf.numberToHclTerraform(struct!.queryInterval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    query_interval_unit: {
      value: cdktf.stringToHclTerraform(struct!.queryIntervalUnit),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    time_window: {
      value: cdktf.numberToHclTerraform(struct!.timeWindow),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    time_window_unit: {
      value: cdktf.stringToHclTerraform(struct!.timeWindowUnit),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class SecmasterAlertRuleQueryPlanOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): SecmasterAlertRuleQueryPlan | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._executionDelay !== undefined) {
      hasAnyValues = true;
      internalValueResult.executionDelay = this._executionDelay;
    }
    if (this._overtimeInterval !== undefined) {
      hasAnyValues = true;
      internalValueResult.overtimeInterval = this._overtimeInterval;
    }
    if (this._queryInterval !== undefined) {
      hasAnyValues = true;
      internalValueResult.queryInterval = this._queryInterval;
    }
    if (this._queryIntervalUnit !== undefined) {
      hasAnyValues = true;
      internalValueResult.queryIntervalUnit = this._queryIntervalUnit;
    }
    if (this._timeWindow !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeWindow = this._timeWindow;
    }
    if (this._timeWindowUnit !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeWindowUnit = this._timeWindowUnit;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SecmasterAlertRuleQueryPlan | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._executionDelay = undefined;
      this._overtimeInterval = undefined;
      this._queryInterval = undefined;
      this._queryIntervalUnit = undefined;
      this._timeWindow = undefined;
      this._timeWindowUnit = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._executionDelay = value.executionDelay;
      this._overtimeInterval = value.overtimeInterval;
      this._queryInterval = value.queryInterval;
      this._queryIntervalUnit = value.queryIntervalUnit;
      this._timeWindow = value.timeWindow;
      this._timeWindowUnit = value.timeWindowUnit;
    }
  }

  // execution_delay - computed: true, optional: true, required: false
  private _executionDelay?: number; 
  public get executionDelay() {
    return this.getNumberAttribute('execution_delay');
  }
  public set executionDelay(value: number) {
    this._executionDelay = value;
  }
  public resetExecutionDelay() {
    this._executionDelay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get executionDelayInput() {
    return this._executionDelay;
  }

  // overtime_interval - computed: true, optional: true, required: false
  private _overtimeInterval?: number; 
  public get overtimeInterval() {
    return this.getNumberAttribute('overtime_interval');
  }
  public set overtimeInterval(value: number) {
    this._overtimeInterval = value;
  }
  public resetOvertimeInterval() {
    this._overtimeInterval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get overtimeIntervalInput() {
    return this._overtimeInterval;
  }

  // query_interval - computed: false, optional: false, required: true
  private _queryInterval?: number; 
  public get queryInterval() {
    return this.getNumberAttribute('query_interval');
  }
  public set queryInterval(value: number) {
    this._queryInterval = value;
  }
  // Temporarily expose input value. Use with caution.
  public get queryIntervalInput() {
    return this._queryInterval;
  }

  // query_interval_unit - computed: false, optional: false, required: true
  private _queryIntervalUnit?: string; 
  public get queryIntervalUnit() {
    return this.getStringAttribute('query_interval_unit');
  }
  public set queryIntervalUnit(value: string) {
    this._queryIntervalUnit = value;
  }
  // Temporarily expose input value. Use with caution.
  public get queryIntervalUnitInput() {
    return this._queryIntervalUnit;
  }

  // time_window - computed: false, optional: false, required: true
  private _timeWindow?: number; 
  public get timeWindow() {
    return this.getNumberAttribute('time_window');
  }
  public set timeWindow(value: number) {
    this._timeWindow = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeWindowInput() {
    return this._timeWindow;
  }

  // time_window_unit - computed: false, optional: false, required: true
  private _timeWindowUnit?: string; 
  public get timeWindowUnit() {
    return this.getStringAttribute('time_window_unit');
  }
  public set timeWindowUnit(value: string) {
    this._timeWindowUnit = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeWindowUnitInput() {
    return this._timeWindowUnit;
  }
}
export interface SecmasterAlertRuleTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#create SecmasterAlertRule#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#update SecmasterAlertRule#update}
  */
  readonly update?: string;
}

export function secmasterAlertRuleTimeoutsToTerraform(struct?: SecmasterAlertRuleTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function secmasterAlertRuleTimeoutsToHclTerraform(struct?: SecmasterAlertRuleTimeouts | cdktf.IResolvable): any {
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
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class SecmasterAlertRuleTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): SecmasterAlertRuleTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SecmasterAlertRuleTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._update = value.update;
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

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}
export interface SecmasterAlertRuleTriggers {
  /**
  * Specifies the accumulated times.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#accumulated_times SecmasterAlertRule#accumulated_times}
  */
  readonly accumulatedTimes: number;
  /**
  * Specifies the expression.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#expression SecmasterAlertRule#expression}
  */
  readonly expression: string;
  /**
  * Specifies the trigger mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#mode SecmasterAlertRule#mode}
  */
  readonly mode: string;
  /**
  * Specifies the operator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#operator SecmasterAlertRule#operator}
  */
  readonly operator: string;
  /**
  * Specifies the severity of the trigger.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#severity SecmasterAlertRule#severity}
  */
  readonly severity: string;
}

export function secmasterAlertRuleTriggersToTerraform(struct?: SecmasterAlertRuleTriggers | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    accumulated_times: cdktf.numberToTerraform(struct!.accumulatedTimes),
    expression: cdktf.stringToTerraform(struct!.expression),
    mode: cdktf.stringToTerraform(struct!.mode),
    operator: cdktf.stringToTerraform(struct!.operator),
    severity: cdktf.stringToTerraform(struct!.severity),
  }
}


export function secmasterAlertRuleTriggersToHclTerraform(struct?: SecmasterAlertRuleTriggers | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    accumulated_times: {
      value: cdktf.numberToHclTerraform(struct!.accumulatedTimes),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    expression: {
      value: cdktf.stringToHclTerraform(struct!.expression),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mode: {
      value: cdktf.stringToHclTerraform(struct!.mode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    operator: {
      value: cdktf.stringToHclTerraform(struct!.operator),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    severity: {
      value: cdktf.stringToHclTerraform(struct!.severity),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class SecmasterAlertRuleTriggersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): SecmasterAlertRuleTriggers | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accumulatedTimes !== undefined) {
      hasAnyValues = true;
      internalValueResult.accumulatedTimes = this._accumulatedTimes;
    }
    if (this._expression !== undefined) {
      hasAnyValues = true;
      internalValueResult.expression = this._expression;
    }
    if (this._mode !== undefined) {
      hasAnyValues = true;
      internalValueResult.mode = this._mode;
    }
    if (this._operator !== undefined) {
      hasAnyValues = true;
      internalValueResult.operator = this._operator;
    }
    if (this._severity !== undefined) {
      hasAnyValues = true;
      internalValueResult.severity = this._severity;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SecmasterAlertRuleTriggers | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._accumulatedTimes = undefined;
      this._expression = undefined;
      this._mode = undefined;
      this._operator = undefined;
      this._severity = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._accumulatedTimes = value.accumulatedTimes;
      this._expression = value.expression;
      this._mode = value.mode;
      this._operator = value.operator;
      this._severity = value.severity;
    }
  }

  // accumulated_times - computed: false, optional: false, required: true
  private _accumulatedTimes?: number; 
  public get accumulatedTimes() {
    return this.getNumberAttribute('accumulated_times');
  }
  public set accumulatedTimes(value: number) {
    this._accumulatedTimes = value;
  }
  // Temporarily expose input value. Use with caution.
  public get accumulatedTimesInput() {
    return this._accumulatedTimes;
  }

  // expression - computed: false, optional: false, required: true
  private _expression?: string; 
  public get expression() {
    return this.getStringAttribute('expression');
  }
  public set expression(value: string) {
    this._expression = value;
  }
  // Temporarily expose input value. Use with caution.
  public get expressionInput() {
    return this._expression;
  }

  // mode - computed: false, optional: false, required: true
  private _mode?: string; 
  public get mode() {
    return this.getStringAttribute('mode');
  }
  public set mode(value: string) {
    this._mode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get modeInput() {
    return this._mode;
  }

  // operator - computed: false, optional: false, required: true
  private _operator?: string; 
  public get operator() {
    return this.getStringAttribute('operator');
  }
  public set operator(value: string) {
    this._operator = value;
  }
  // Temporarily expose input value. Use with caution.
  public get operatorInput() {
    return this._operator;
  }

  // severity - computed: false, optional: false, required: true
  private _severity?: string; 
  public get severity() {
    return this.getStringAttribute('severity');
  }
  public set severity(value: string) {
    this._severity = value;
  }
  // Temporarily expose input value. Use with caution.
  public get severityInput() {
    return this._severity;
  }
}

export class SecmasterAlertRuleTriggersList extends cdktf.ComplexList {
  public internalValue? : SecmasterAlertRuleTriggers[] | cdktf.IResolvable

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
  public get(index: number): SecmasterAlertRuleTriggersOutputReference {
    return new SecmasterAlertRuleTriggersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule huaweicloud_secmaster_alert_rule}
*/
export class SecmasterAlertRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_alert_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SecmasterAlertRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SecmasterAlertRule to import
  * @param importFromId The id of the existing SecmasterAlertRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SecmasterAlertRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_alert_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_alert_rule huaweicloud_secmaster_alert_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SecmasterAlertRuleConfig
  */
  public constructor(scope: Construct, id: string, config: SecmasterAlertRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_alert_rule',
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
    this._customInformation = config.customInformation;
    this._debuggingAlarm = config.debuggingAlarm;
    this._description = config.description;
    this._eventGrouping = config.eventGrouping;
    this._id = config.id;
    this._name = config.name;
    this._pipelineId = config.pipelineId;
    this._queryRule = config.queryRule;
    this._queryType = config.queryType;
    this._region = config.region;
    this._severity = config.severity;
    this._status = config.status;
    this._suppression = config.suppression;
    this._type = config.type;
    this._workspaceId = config.workspaceId;
    this._queryPlan.internalValue = config.queryPlan;
    this._timeouts.internalValue = config.timeouts;
    this._triggers.internalValue = config.triggers;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // custom_information - computed: true, optional: true, required: false
  private _customInformation?: { [key: string]: string }; 
  public get customInformation() {
    return this.getStringMapAttribute('custom_information');
  }
  public set customInformation(value: { [key: string]: string }) {
    this._customInformation = value;
  }
  public resetCustomInformation() {
    this._customInformation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customInformationInput() {
    return this._customInformation;
  }

  // debugging_alarm - computed: false, optional: true, required: false
  private _debuggingAlarm?: boolean | cdktf.IResolvable; 
  public get debuggingAlarm() {
    return this.getBooleanAttribute('debugging_alarm');
  }
  public set debuggingAlarm(value: boolean | cdktf.IResolvable) {
    this._debuggingAlarm = value;
  }
  public resetDebuggingAlarm() {
    this._debuggingAlarm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get debuggingAlarmInput() {
    return this._debuggingAlarm;
  }

  // description - computed: false, optional: false, required: true
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
  }

  // event_grouping - computed: false, optional: true, required: false
  private _eventGrouping?: boolean | cdktf.IResolvable; 
  public get eventGrouping() {
    return this.getBooleanAttribute('event_grouping');
  }
  public set eventGrouping(value: boolean | cdktf.IResolvable) {
    this._eventGrouping = value;
  }
  public resetEventGrouping() {
    this._eventGrouping = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eventGroupingInput() {
    return this._eventGrouping;
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

  // pipeline_id - computed: false, optional: false, required: true
  private _pipelineId?: string; 
  public get pipelineId() {
    return this.getStringAttribute('pipeline_id');
  }
  public set pipelineId(value: string) {
    this._pipelineId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pipelineIdInput() {
    return this._pipelineId;
  }

  // query_rule - computed: false, optional: false, required: true
  private _queryRule?: string; 
  public get queryRule() {
    return this.getStringAttribute('query_rule');
  }
  public set queryRule(value: string) {
    this._queryRule = value;
  }
  // Temporarily expose input value. Use with caution.
  public get queryRuleInput() {
    return this._queryRule;
  }

  // query_type - computed: false, optional: false, required: true
  private _queryType?: string; 
  public get queryType() {
    return this.getStringAttribute('query_type');
  }
  public set queryType(value: string) {
    this._queryType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get queryTypeInput() {
    return this._queryType;
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

  // severity - computed: false, optional: false, required: true
  private _severity?: string; 
  public get severity() {
    return this.getStringAttribute('severity');
  }
  public set severity(value: string) {
    this._severity = value;
  }
  // Temporarily expose input value. Use with caution.
  public get severityInput() {
    return this._severity;
  }

  // status - computed: false, optional: false, required: true
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // suppression - computed: true, optional: true, required: false
  private _suppression?: boolean | cdktf.IResolvable; 
  public get suppression() {
    return this.getBooleanAttribute('suppression');
  }
  public set suppression(value: boolean | cdktf.IResolvable) {
    this._suppression = value;
  }
  public resetSuppression() {
    this._suppression = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get suppressionInput() {
    return this._suppression;
  }

  // type - computed: false, optional: false, required: true
  private _type?: { [key: string]: string }; 
  public get type() {
    return this.getStringMapAttribute('type');
  }
  public set type(value: { [key: string]: string }) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // workspace_id - computed: false, optional: false, required: true
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // query_plan - computed: false, optional: false, required: true
  private _queryPlan = new SecmasterAlertRuleQueryPlanOutputReference(this, "query_plan");
  public get queryPlan() {
    return this._queryPlan;
  }
  public putQueryPlan(value: SecmasterAlertRuleQueryPlan) {
    this._queryPlan.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get queryPlanInput() {
    return this._queryPlan.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new SecmasterAlertRuleTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: SecmasterAlertRuleTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // triggers - computed: false, optional: false, required: true
  private _triggers = new SecmasterAlertRuleTriggersList(this, "triggers", false);
  public get triggers() {
    return this._triggers;
  }
  public putTriggers(value: SecmasterAlertRuleTriggers[] | cdktf.IResolvable) {
    this._triggers.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get triggersInput() {
    return this._triggers.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      custom_information: cdktf.hashMapper(cdktf.stringToTerraform)(this._customInformation),
      debugging_alarm: cdktf.booleanToTerraform(this._debuggingAlarm),
      description: cdktf.stringToTerraform(this._description),
      event_grouping: cdktf.booleanToTerraform(this._eventGrouping),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
      query_rule: cdktf.stringToTerraform(this._queryRule),
      query_type: cdktf.stringToTerraform(this._queryType),
      region: cdktf.stringToTerraform(this._region),
      severity: cdktf.stringToTerraform(this._severity),
      status: cdktf.stringToTerraform(this._status),
      suppression: cdktf.booleanToTerraform(this._suppression),
      type: cdktf.hashMapper(cdktf.stringToTerraform)(this._type),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      query_plan: secmasterAlertRuleQueryPlanToTerraform(this._queryPlan.internalValue),
      timeouts: secmasterAlertRuleTimeoutsToTerraform(this._timeouts.internalValue),
      triggers: cdktf.listMapper(secmasterAlertRuleTriggersToTerraform, true)(this._triggers.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      custom_information: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._customInformation),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      debugging_alarm: {
        value: cdktf.booleanToHclTerraform(this._debuggingAlarm),
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
      event_grouping: {
        value: cdktf.booleanToHclTerraform(this._eventGrouping),
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
      pipeline_id: {
        value: cdktf.stringToHclTerraform(this._pipelineId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      query_rule: {
        value: cdktf.stringToHclTerraform(this._queryRule),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      query_type: {
        value: cdktf.stringToHclTerraform(this._queryType),
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
      severity: {
        value: cdktf.stringToHclTerraform(this._severity),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      suppression: {
        value: cdktf.booleanToHclTerraform(this._suppression),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      type: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._type),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      query_plan: {
        value: secmasterAlertRuleQueryPlanToHclTerraform(this._queryPlan.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "SecmasterAlertRuleQueryPlanList",
      },
      timeouts: {
        value: secmasterAlertRuleTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "SecmasterAlertRuleTimeouts",
      },
      triggers: {
        value: cdktf.listMapperHcl(secmasterAlertRuleTriggersToHclTerraform, true)(this._triggers.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "SecmasterAlertRuleTriggersList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsSqlAlarmRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the alarm level.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#alarm_level LtsSqlAlarmRule#alarm_level}
  */
  readonly alarmLevel: string;
  /**
  * Specifies the condition expression.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#condition_expression LtsSqlAlarmRule#condition_expression}
  */
  readonly conditionExpression: string;
  /**
  * Specifies the description of the SQL alarm rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#description LtsSqlAlarmRule#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#id LtsSqlAlarmRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the name of the SQL alarm rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#name LtsSqlAlarmRule#name}
  */
  readonly name: string;
  /**
  * Specifies the frequency to recover the alarm.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#recovery_frequency LtsSqlAlarmRule#recovery_frequency}
  */
  readonly recoveryFrequency?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#region LtsSqlAlarmRule#region}
  */
  readonly region?: string;
  /**
  * Specifies whether to send notifications.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#send_notifications LtsSqlAlarmRule#send_notifications}
  */
  readonly sendNotifications?: boolean | cdktf.IResolvable;
  /**
  * Specifies whether to send recovery notifications.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#send_recovery_notifications LtsSqlAlarmRule#send_recovery_notifications}
  */
  readonly sendRecoveryNotifications?: boolean | cdktf.IResolvable;
  /**
  * Specifies the status of the alarm rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#status LtsSqlAlarmRule#status}
  */
  readonly status?: string;
  /**
  * Specifies the count to trigger the alarm.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#trigger_condition_count LtsSqlAlarmRule#trigger_condition_count}
  */
  readonly triggerConditionCount?: number;
  /**
  * Specifies the frequency to trigger the alarm.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#trigger_condition_frequency LtsSqlAlarmRule#trigger_condition_frequency}
  */
  readonly triggerConditionFrequency?: number;
  /**
  * frequency block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#frequency LtsSqlAlarmRule#frequency}
  */
  readonly frequency: LtsSqlAlarmRuleFrequency;
  /**
  * notification_rule block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#notification_rule LtsSqlAlarmRule#notification_rule}
  */
  readonly notificationRule?: LtsSqlAlarmRuleNotificationRule;
  /**
  * sql_requests block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#sql_requests LtsSqlAlarmRule#sql_requests}
  */
  readonly sqlRequests: LtsSqlAlarmRuleSqlRequests[] | cdktf.IResolvable;
}
export interface LtsSqlAlarmRuleFrequency {
  /**
  * Specifies the cron expression.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#cron_expression LtsSqlAlarmRule#cron_expression}
  */
  readonly cronExpression?: string;
  /**
  * Specifies the day of week.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#day_of_week LtsSqlAlarmRule#day_of_week}
  */
  readonly dayOfWeek?: number;
  /**
  * Specifies the unit fixed rate.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#fixed_rate LtsSqlAlarmRule#fixed_rate}
  */
  readonly fixedRate?: number;
  /**
  * Specifies the unit of fixed rate.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#fixed_rate_unit LtsSqlAlarmRule#fixed_rate_unit}
  */
  readonly fixedRateUnit?: string;
  /**
  * Specifies the hour of day.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#hour_of_day LtsSqlAlarmRule#hour_of_day}
  */
  readonly hourOfDay?: number;
  /**
  * Specifies the frequency type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#type LtsSqlAlarmRule#type}
  */
  readonly type: string;
}

export function ltsSqlAlarmRuleFrequencyToTerraform(struct?: LtsSqlAlarmRuleFrequencyOutputReference | LtsSqlAlarmRuleFrequency): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cron_expression: cdktf.stringToTerraform(struct!.cronExpression),
    day_of_week: cdktf.numberToTerraform(struct!.dayOfWeek),
    fixed_rate: cdktf.numberToTerraform(struct!.fixedRate),
    fixed_rate_unit: cdktf.stringToTerraform(struct!.fixedRateUnit),
    hour_of_day: cdktf.numberToTerraform(struct!.hourOfDay),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function ltsSqlAlarmRuleFrequencyToHclTerraform(struct?: LtsSqlAlarmRuleFrequencyOutputReference | LtsSqlAlarmRuleFrequency): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cron_expression: {
      value: cdktf.stringToHclTerraform(struct!.cronExpression),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    day_of_week: {
      value: cdktf.numberToHclTerraform(struct!.dayOfWeek),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    fixed_rate: {
      value: cdktf.numberToHclTerraform(struct!.fixedRate),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    fixed_rate_unit: {
      value: cdktf.stringToHclTerraform(struct!.fixedRateUnit),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    hour_of_day: {
      value: cdktf.numberToHclTerraform(struct!.hourOfDay),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsSqlAlarmRuleFrequencyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsSqlAlarmRuleFrequency | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cronExpression !== undefined) {
      hasAnyValues = true;
      internalValueResult.cronExpression = this._cronExpression;
    }
    if (this._dayOfWeek !== undefined) {
      hasAnyValues = true;
      internalValueResult.dayOfWeek = this._dayOfWeek;
    }
    if (this._fixedRate !== undefined) {
      hasAnyValues = true;
      internalValueResult.fixedRate = this._fixedRate;
    }
    if (this._fixedRateUnit !== undefined) {
      hasAnyValues = true;
      internalValueResult.fixedRateUnit = this._fixedRateUnit;
    }
    if (this._hourOfDay !== undefined) {
      hasAnyValues = true;
      internalValueResult.hourOfDay = this._hourOfDay;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsSqlAlarmRuleFrequency | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._cronExpression = undefined;
      this._dayOfWeek = undefined;
      this._fixedRate = undefined;
      this._fixedRateUnit = undefined;
      this._hourOfDay = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._cronExpression = value.cronExpression;
      this._dayOfWeek = value.dayOfWeek;
      this._fixedRate = value.fixedRate;
      this._fixedRateUnit = value.fixedRateUnit;
      this._hourOfDay = value.hourOfDay;
      this._type = value.type;
    }
  }

  // cron_expression - computed: true, optional: true, required: false
  private _cronExpression?: string; 
  public get cronExpression() {
    return this.getStringAttribute('cron_expression');
  }
  public set cronExpression(value: string) {
    this._cronExpression = value;
  }
  public resetCronExpression() {
    this._cronExpression = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cronExpressionInput() {
    return this._cronExpression;
  }

  // day_of_week - computed: true, optional: true, required: false
  private _dayOfWeek?: number; 
  public get dayOfWeek() {
    return this.getNumberAttribute('day_of_week');
  }
  public set dayOfWeek(value: number) {
    this._dayOfWeek = value;
  }
  public resetDayOfWeek() {
    this._dayOfWeek = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dayOfWeekInput() {
    return this._dayOfWeek;
  }

  // fixed_rate - computed: true, optional: true, required: false
  private _fixedRate?: number; 
  public get fixedRate() {
    return this.getNumberAttribute('fixed_rate');
  }
  public set fixedRate(value: number) {
    this._fixedRate = value;
  }
  public resetFixedRate() {
    this._fixedRate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fixedRateInput() {
    return this._fixedRate;
  }

  // fixed_rate_unit - computed: true, optional: true, required: false
  private _fixedRateUnit?: string; 
  public get fixedRateUnit() {
    return this.getStringAttribute('fixed_rate_unit');
  }
  public set fixedRateUnit(value: string) {
    this._fixedRateUnit = value;
  }
  public resetFixedRateUnit() {
    this._fixedRateUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fixedRateUnitInput() {
    return this._fixedRateUnit;
  }

  // hour_of_day - computed: true, optional: true, required: false
  private _hourOfDay?: number; 
  public get hourOfDay() {
    return this.getNumberAttribute('hour_of_day');
  }
  public set hourOfDay(value: number) {
    this._hourOfDay = value;
  }
  public resetHourOfDay() {
    this._hourOfDay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hourOfDayInput() {
    return this._hourOfDay;
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
}
export interface LtsSqlAlarmRuleNotificationRuleTopics {
  /**
  * Specifies the display name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#display_name LtsSqlAlarmRule#display_name}
  */
  readonly displayName?: string;
  /**
  * Specifies the topic name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#name LtsSqlAlarmRule#name}
  */
  readonly name: string;
  /**
  * Specifies the push policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#push_policy LtsSqlAlarmRule#push_policy}
  */
  readonly pushPolicy?: string;
  /**
  * Specifies the topic URN.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#topic_urn LtsSqlAlarmRule#topic_urn}
  */
  readonly topicUrn: string;
}

export function ltsSqlAlarmRuleNotificationRuleTopicsToTerraform(struct?: LtsSqlAlarmRuleNotificationRuleTopics | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    display_name: cdktf.stringToTerraform(struct!.displayName),
    name: cdktf.stringToTerraform(struct!.name),
    push_policy: cdktf.stringToTerraform(struct!.pushPolicy),
    topic_urn: cdktf.stringToTerraform(struct!.topicUrn),
  }
}


export function ltsSqlAlarmRuleNotificationRuleTopicsToHclTerraform(struct?: LtsSqlAlarmRuleNotificationRuleTopics | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    display_name: {
      value: cdktf.stringToHclTerraform(struct!.displayName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    push_policy: {
      value: cdktf.stringToHclTerraform(struct!.pushPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic_urn: {
      value: cdktf.stringToHclTerraform(struct!.topicUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsSqlAlarmRuleNotificationRuleTopicsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsSqlAlarmRuleNotificationRuleTopics | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._displayName !== undefined) {
      hasAnyValues = true;
      internalValueResult.displayName = this._displayName;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._pushPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.pushPolicy = this._pushPolicy;
    }
    if (this._topicUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicUrn = this._topicUrn;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsSqlAlarmRuleNotificationRuleTopics | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._displayName = undefined;
      this._name = undefined;
      this._pushPolicy = undefined;
      this._topicUrn = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._displayName = value.displayName;
      this._name = value.name;
      this._pushPolicy = value.pushPolicy;
      this._topicUrn = value.topicUrn;
    }
  }

  // display_name - computed: true, optional: true, required: false
  private _displayName?: string; 
  public get displayName() {
    return this.getStringAttribute('display_name');
  }
  public set displayName(value: string) {
    this._displayName = value;
  }
  public resetDisplayName() {
    this._displayName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get displayNameInput() {
    return this._displayName;
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

  // push_policy - computed: true, optional: true, required: false
  private _pushPolicy?: string; 
  public get pushPolicy() {
    return this.getStringAttribute('push_policy');
  }
  public set pushPolicy(value: string) {
    this._pushPolicy = value;
  }
  public resetPushPolicy() {
    this._pushPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pushPolicyInput() {
    return this._pushPolicy;
  }

  // topic_urn - computed: false, optional: false, required: true
  private _topicUrn?: string; 
  public get topicUrn() {
    return this.getStringAttribute('topic_urn');
  }
  public set topicUrn(value: string) {
    this._topicUrn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicUrnInput() {
    return this._topicUrn;
  }
}

export class LtsSqlAlarmRuleNotificationRuleTopicsList extends cdktf.ComplexList {
  public internalValue? : LtsSqlAlarmRuleNotificationRuleTopics[] | cdktf.IResolvable

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
  public get(index: number): LtsSqlAlarmRuleNotificationRuleTopicsOutputReference {
    return new LtsSqlAlarmRuleNotificationRuleTopicsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LtsSqlAlarmRuleNotificationRule {
  /**
  * Specifies the notification language.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#language LtsSqlAlarmRule#language}
  */
  readonly language: string;
  /**
  * Specifies the notification template name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#template_name LtsSqlAlarmRule#template_name}
  */
  readonly templateName: string;
  /**
  * Specifies the timezone.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#timezone LtsSqlAlarmRule#timezone}
  */
  readonly timezone?: string;
  /**
  * Specifies the user name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#user_name LtsSqlAlarmRule#user_name}
  */
  readonly userName: string;
  /**
  * topics block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#topics LtsSqlAlarmRule#topics}
  */
  readonly topics: LtsSqlAlarmRuleNotificationRuleTopics[] | cdktf.IResolvable;
}

export function ltsSqlAlarmRuleNotificationRuleToTerraform(struct?: LtsSqlAlarmRuleNotificationRuleOutputReference | LtsSqlAlarmRuleNotificationRule): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    language: cdktf.stringToTerraform(struct!.language),
    template_name: cdktf.stringToTerraform(struct!.templateName),
    timezone: cdktf.stringToTerraform(struct!.timezone),
    user_name: cdktf.stringToTerraform(struct!.userName),
    topics: cdktf.listMapper(ltsSqlAlarmRuleNotificationRuleTopicsToTerraform, true)(struct!.topics),
  }
}


export function ltsSqlAlarmRuleNotificationRuleToHclTerraform(struct?: LtsSqlAlarmRuleNotificationRuleOutputReference | LtsSqlAlarmRuleNotificationRule): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    language: {
      value: cdktf.stringToHclTerraform(struct!.language),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    template_name: {
      value: cdktf.stringToHclTerraform(struct!.templateName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    timezone: {
      value: cdktf.stringToHclTerraform(struct!.timezone),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user_name: {
      value: cdktf.stringToHclTerraform(struct!.userName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topics: {
      value: cdktf.listMapperHcl(ltsSqlAlarmRuleNotificationRuleTopicsToHclTerraform, true)(struct!.topics),
      isBlock: true,
      type: "list",
      storageClassType: "LtsSqlAlarmRuleNotificationRuleTopicsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsSqlAlarmRuleNotificationRuleOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsSqlAlarmRuleNotificationRule | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._language !== undefined) {
      hasAnyValues = true;
      internalValueResult.language = this._language;
    }
    if (this._templateName !== undefined) {
      hasAnyValues = true;
      internalValueResult.templateName = this._templateName;
    }
    if (this._timezone !== undefined) {
      hasAnyValues = true;
      internalValueResult.timezone = this._timezone;
    }
    if (this._userName !== undefined) {
      hasAnyValues = true;
      internalValueResult.userName = this._userName;
    }
    if (this._topics?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.topics = this._topics?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsSqlAlarmRuleNotificationRule | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._language = undefined;
      this._templateName = undefined;
      this._timezone = undefined;
      this._userName = undefined;
      this._topics.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._language = value.language;
      this._templateName = value.templateName;
      this._timezone = value.timezone;
      this._userName = value.userName;
      this._topics.internalValue = value.topics;
    }
  }

  // language - computed: false, optional: false, required: true
  private _language?: string; 
  public get language() {
    return this.getStringAttribute('language');
  }
  public set language(value: string) {
    this._language = value;
  }
  // Temporarily expose input value. Use with caution.
  public get languageInput() {
    return this._language;
  }

  // template_name - computed: false, optional: false, required: true
  private _templateName?: string; 
  public get templateName() {
    return this.getStringAttribute('template_name');
  }
  public set templateName(value: string) {
    this._templateName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get templateNameInput() {
    return this._templateName;
  }

  // timezone - computed: true, optional: true, required: false
  private _timezone?: string; 
  public get timezone() {
    return this.getStringAttribute('timezone');
  }
  public set timezone(value: string) {
    this._timezone = value;
  }
  public resetTimezone() {
    this._timezone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timezoneInput() {
    return this._timezone;
  }

  // user_name - computed: false, optional: false, required: true
  private _userName?: string; 
  public get userName() {
    return this.getStringAttribute('user_name');
  }
  public set userName(value: string) {
    this._userName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get userNameInput() {
    return this._userName;
  }

  // topics - computed: false, optional: false, required: true
  private _topics = new LtsSqlAlarmRuleNotificationRuleTopicsList(this, "topics", false);
  public get topics() {
    return this._topics;
  }
  public putTopics(value: LtsSqlAlarmRuleNotificationRuleTopics[] | cdktf.IResolvable) {
    this._topics.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicsInput() {
    return this._topics.internalValue;
  }
}
export interface LtsSqlAlarmRuleSqlRequests {
  /**
  * Specifies the SQL request is relative to time range.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#is_time_range_relative LtsSqlAlarmRule#is_time_range_relative}
  */
  readonly isTimeRangeRelative?: boolean | cdktf.IResolvable;
  /**
  * Specifies the log group id.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#log_group_id LtsSqlAlarmRule#log_group_id}
  */
  readonly logGroupId: string;
  /**
  * Specifies the log stream id.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#log_stream_id LtsSqlAlarmRule#log_stream_id}
  */
  readonly logStreamId: string;
  /**
  * Specifies the search time range.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#search_time_range LtsSqlAlarmRule#search_time_range}
  */
  readonly searchTimeRange: number;
  /**
  * Specifies the unit of search time range.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#search_time_range_unit LtsSqlAlarmRule#search_time_range_unit}
  */
  readonly searchTimeRangeUnit: string;
  /**
  * Specifies the SQL.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#sql LtsSqlAlarmRule#sql}
  */
  readonly sql: string;
  /**
  * Specifies the SQL request title.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#title LtsSqlAlarmRule#title}
  */
  readonly title: string;
}

export function ltsSqlAlarmRuleSqlRequestsToTerraform(struct?: LtsSqlAlarmRuleSqlRequests | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    is_time_range_relative: cdktf.booleanToTerraform(struct!.isTimeRangeRelative),
    log_group_id: cdktf.stringToTerraform(struct!.logGroupId),
    log_stream_id: cdktf.stringToTerraform(struct!.logStreamId),
    search_time_range: cdktf.numberToTerraform(struct!.searchTimeRange),
    search_time_range_unit: cdktf.stringToTerraform(struct!.searchTimeRangeUnit),
    sql: cdktf.stringToTerraform(struct!.sql),
    title: cdktf.stringToTerraform(struct!.title),
  }
}


export function ltsSqlAlarmRuleSqlRequestsToHclTerraform(struct?: LtsSqlAlarmRuleSqlRequests | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    is_time_range_relative: {
      value: cdktf.booleanToHclTerraform(struct!.isTimeRangeRelative),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    log_group_id: {
      value: cdktf.stringToHclTerraform(struct!.logGroupId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    log_stream_id: {
      value: cdktf.stringToHclTerraform(struct!.logStreamId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    search_time_range: {
      value: cdktf.numberToHclTerraform(struct!.searchTimeRange),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    search_time_range_unit: {
      value: cdktf.stringToHclTerraform(struct!.searchTimeRangeUnit),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sql: {
      value: cdktf.stringToHclTerraform(struct!.sql),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    title: {
      value: cdktf.stringToHclTerraform(struct!.title),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsSqlAlarmRuleSqlRequestsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LtsSqlAlarmRuleSqlRequests | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._isTimeRangeRelative !== undefined) {
      hasAnyValues = true;
      internalValueResult.isTimeRangeRelative = this._isTimeRangeRelative;
    }
    if (this._logGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.logGroupId = this._logGroupId;
    }
    if (this._logStreamId !== undefined) {
      hasAnyValues = true;
      internalValueResult.logStreamId = this._logStreamId;
    }
    if (this._searchTimeRange !== undefined) {
      hasAnyValues = true;
      internalValueResult.searchTimeRange = this._searchTimeRange;
    }
    if (this._searchTimeRangeUnit !== undefined) {
      hasAnyValues = true;
      internalValueResult.searchTimeRangeUnit = this._searchTimeRangeUnit;
    }
    if (this._sql !== undefined) {
      hasAnyValues = true;
      internalValueResult.sql = this._sql;
    }
    if (this._title !== undefined) {
      hasAnyValues = true;
      internalValueResult.title = this._title;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsSqlAlarmRuleSqlRequests | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._isTimeRangeRelative = undefined;
      this._logGroupId = undefined;
      this._logStreamId = undefined;
      this._searchTimeRange = undefined;
      this._searchTimeRangeUnit = undefined;
      this._sql = undefined;
      this._title = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._isTimeRangeRelative = value.isTimeRangeRelative;
      this._logGroupId = value.logGroupId;
      this._logStreamId = value.logStreamId;
      this._searchTimeRange = value.searchTimeRange;
      this._searchTimeRangeUnit = value.searchTimeRangeUnit;
      this._sql = value.sql;
      this._title = value.title;
    }
  }

  // is_time_range_relative - computed: true, optional: true, required: false
  private _isTimeRangeRelative?: boolean | cdktf.IResolvable; 
  public get isTimeRangeRelative() {
    return this.getBooleanAttribute('is_time_range_relative');
  }
  public set isTimeRangeRelative(value: boolean | cdktf.IResolvable) {
    this._isTimeRangeRelative = value;
  }
  public resetIsTimeRangeRelative() {
    this._isTimeRangeRelative = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isTimeRangeRelativeInput() {
    return this._isTimeRangeRelative;
  }

  // log_group_id - computed: false, optional: false, required: true
  private _logGroupId?: string; 
  public get logGroupId() {
    return this.getStringAttribute('log_group_id');
  }
  public set logGroupId(value: string) {
    this._logGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logGroupIdInput() {
    return this._logGroupId;
  }

  // log_stream_id - computed: false, optional: false, required: true
  private _logStreamId?: string; 
  public get logStreamId() {
    return this.getStringAttribute('log_stream_id');
  }
  public set logStreamId(value: string) {
    this._logStreamId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamIdInput() {
    return this._logStreamId;
  }

  // search_time_range - computed: false, optional: false, required: true
  private _searchTimeRange?: number; 
  public get searchTimeRange() {
    return this.getNumberAttribute('search_time_range');
  }
  public set searchTimeRange(value: number) {
    this._searchTimeRange = value;
  }
  // Temporarily expose input value. Use with caution.
  public get searchTimeRangeInput() {
    return this._searchTimeRange;
  }

  // search_time_range_unit - computed: false, optional: false, required: true
  private _searchTimeRangeUnit?: string; 
  public get searchTimeRangeUnit() {
    return this.getStringAttribute('search_time_range_unit');
  }
  public set searchTimeRangeUnit(value: string) {
    this._searchTimeRangeUnit = value;
  }
  // Temporarily expose input value. Use with caution.
  public get searchTimeRangeUnitInput() {
    return this._searchTimeRangeUnit;
  }

  // sql - computed: false, optional: false, required: true
  private _sql?: string; 
  public get sql() {
    return this.getStringAttribute('sql');
  }
  public set sql(value: string) {
    this._sql = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sqlInput() {
    return this._sql;
  }

  // title - computed: false, optional: false, required: true
  private _title?: string; 
  public get title() {
    return this.getStringAttribute('title');
  }
  public set title(value: string) {
    this._title = value;
  }
  // Temporarily expose input value. Use with caution.
  public get titleInput() {
    return this._title;
  }
}

export class LtsSqlAlarmRuleSqlRequestsList extends cdktf.ComplexList {
  public internalValue? : LtsSqlAlarmRuleSqlRequests[] | cdktf.IResolvable

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
  public get(index: number): LtsSqlAlarmRuleSqlRequestsOutputReference {
    return new LtsSqlAlarmRuleSqlRequestsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule huaweicloud_lts_sql_alarm_rule}
*/
export class LtsSqlAlarmRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_sql_alarm_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsSqlAlarmRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsSqlAlarmRule to import
  * @param importFromId The id of the existing LtsSqlAlarmRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsSqlAlarmRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_sql_alarm_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_sql_alarm_rule huaweicloud_lts_sql_alarm_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsSqlAlarmRuleConfig
  */
  public constructor(scope: Construct, id: string, config: LtsSqlAlarmRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_sql_alarm_rule',
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
    this._alarmLevel = config.alarmLevel;
    this._conditionExpression = config.conditionExpression;
    this._description = config.description;
    this._id = config.id;
    this._name = config.name;
    this._recoveryFrequency = config.recoveryFrequency;
    this._region = config.region;
    this._sendNotifications = config.sendNotifications;
    this._sendRecoveryNotifications = config.sendRecoveryNotifications;
    this._status = config.status;
    this._triggerConditionCount = config.triggerConditionCount;
    this._triggerConditionFrequency = config.triggerConditionFrequency;
    this._frequency.internalValue = config.frequency;
    this._notificationRule.internalValue = config.notificationRule;
    this._sqlRequests.internalValue = config.sqlRequests;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // alarm_level - computed: false, optional: false, required: true
  private _alarmLevel?: string; 
  public get alarmLevel() {
    return this.getStringAttribute('alarm_level');
  }
  public set alarmLevel(value: string) {
    this._alarmLevel = value;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmLevelInput() {
    return this._alarmLevel;
  }

  // condition_expression - computed: false, optional: false, required: true
  private _conditionExpression?: string; 
  public get conditionExpression() {
    return this.getStringAttribute('condition_expression');
  }
  public set conditionExpression(value: string) {
    this._conditionExpression = value;
  }
  // Temporarily expose input value. Use with caution.
  public get conditionExpressionInput() {
    return this._conditionExpression;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // domain_id - computed: true, optional: false, required: false
  public get domainId() {
    return this.getStringAttribute('domain_id');
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

  // recovery_frequency - computed: true, optional: true, required: false
  private _recoveryFrequency?: number; 
  public get recoveryFrequency() {
    return this.getNumberAttribute('recovery_frequency');
  }
  public set recoveryFrequency(value: number) {
    this._recoveryFrequency = value;
  }
  public resetRecoveryFrequency() {
    this._recoveryFrequency = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recoveryFrequencyInput() {
    return this._recoveryFrequency;
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

  // send_notifications - computed: true, optional: true, required: false
  private _sendNotifications?: boolean | cdktf.IResolvable; 
  public get sendNotifications() {
    return this.getBooleanAttribute('send_notifications');
  }
  public set sendNotifications(value: boolean | cdktf.IResolvable) {
    this._sendNotifications = value;
  }
  public resetSendNotifications() {
    this._sendNotifications = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sendNotificationsInput() {
    return this._sendNotifications;
  }

  // send_recovery_notifications - computed: true, optional: true, required: false
  private _sendRecoveryNotifications?: boolean | cdktf.IResolvable; 
  public get sendRecoveryNotifications() {
    return this.getBooleanAttribute('send_recovery_notifications');
  }
  public set sendRecoveryNotifications(value: boolean | cdktf.IResolvable) {
    this._sendRecoveryNotifications = value;
  }
  public resetSendRecoveryNotifications() {
    this._sendRecoveryNotifications = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sendRecoveryNotificationsInput() {
    return this._sendRecoveryNotifications;
  }

  // status - computed: true, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // trigger_condition_count - computed: true, optional: true, required: false
  private _triggerConditionCount?: number; 
  public get triggerConditionCount() {
    return this.getNumberAttribute('trigger_condition_count');
  }
  public set triggerConditionCount(value: number) {
    this._triggerConditionCount = value;
  }
  public resetTriggerConditionCount() {
    this._triggerConditionCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerConditionCountInput() {
    return this._triggerConditionCount;
  }

  // trigger_condition_frequency - computed: true, optional: true, required: false
  private _triggerConditionFrequency?: number; 
  public get triggerConditionFrequency() {
    return this.getNumberAttribute('trigger_condition_frequency');
  }
  public set triggerConditionFrequency(value: number) {
    this._triggerConditionFrequency = value;
  }
  public resetTriggerConditionFrequency() {
    this._triggerConditionFrequency = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerConditionFrequencyInput() {
    return this._triggerConditionFrequency;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // frequency - computed: false, optional: false, required: true
  private _frequency = new LtsSqlAlarmRuleFrequencyOutputReference(this, "frequency");
  public get frequency() {
    return this._frequency;
  }
  public putFrequency(value: LtsSqlAlarmRuleFrequency) {
    this._frequency.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get frequencyInput() {
    return this._frequency.internalValue;
  }

  // notification_rule - computed: false, optional: true, required: false
  private _notificationRule = new LtsSqlAlarmRuleNotificationRuleOutputReference(this, "notification_rule");
  public get notificationRule() {
    return this._notificationRule;
  }
  public putNotificationRule(value: LtsSqlAlarmRuleNotificationRule) {
    this._notificationRule.internalValue = value;
  }
  public resetNotificationRule() {
    this._notificationRule.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationRuleInput() {
    return this._notificationRule.internalValue;
  }

  // sql_requests - computed: false, optional: false, required: true
  private _sqlRequests = new LtsSqlAlarmRuleSqlRequestsList(this, "sql_requests", false);
  public get sqlRequests() {
    return this._sqlRequests;
  }
  public putSqlRequests(value: LtsSqlAlarmRuleSqlRequests[] | cdktf.IResolvable) {
    this._sqlRequests.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sqlRequestsInput() {
    return this._sqlRequests.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      alarm_level: cdktf.stringToTerraform(this._alarmLevel),
      condition_expression: cdktf.stringToTerraform(this._conditionExpression),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      recovery_frequency: cdktf.numberToTerraform(this._recoveryFrequency),
      region: cdktf.stringToTerraform(this._region),
      send_notifications: cdktf.booleanToTerraform(this._sendNotifications),
      send_recovery_notifications: cdktf.booleanToTerraform(this._sendRecoveryNotifications),
      status: cdktf.stringToTerraform(this._status),
      trigger_condition_count: cdktf.numberToTerraform(this._triggerConditionCount),
      trigger_condition_frequency: cdktf.numberToTerraform(this._triggerConditionFrequency),
      frequency: ltsSqlAlarmRuleFrequencyToTerraform(this._frequency.internalValue),
      notification_rule: ltsSqlAlarmRuleNotificationRuleToTerraform(this._notificationRule.internalValue),
      sql_requests: cdktf.listMapper(ltsSqlAlarmRuleSqlRequestsToTerraform, true)(this._sqlRequests.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      alarm_level: {
        value: cdktf.stringToHclTerraform(this._alarmLevel),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      condition_expression: {
        value: cdktf.stringToHclTerraform(this._conditionExpression),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      recovery_frequency: {
        value: cdktf.numberToHclTerraform(this._recoveryFrequency),
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
      send_notifications: {
        value: cdktf.booleanToHclTerraform(this._sendNotifications),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      send_recovery_notifications: {
        value: cdktf.booleanToHclTerraform(this._sendRecoveryNotifications),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      trigger_condition_count: {
        value: cdktf.numberToHclTerraform(this._triggerConditionCount),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      trigger_condition_frequency: {
        value: cdktf.numberToHclTerraform(this._triggerConditionFrequency),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      frequency: {
        value: ltsSqlAlarmRuleFrequencyToHclTerraform(this._frequency.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsSqlAlarmRuleFrequencyList",
      },
      notification_rule: {
        value: ltsSqlAlarmRuleNotificationRuleToHclTerraform(this._notificationRule.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsSqlAlarmRuleNotificationRuleList",
      },
      sql_requests: {
        value: cdktf.listMapperHcl(ltsSqlAlarmRuleSqlRequestsToHclTerraform, true)(this._sqlRequests.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsSqlAlarmRuleSqlRequestsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AomAlarmRulesTemplateConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#description AomAlarmRulesTemplate#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#enterprise_project_id AomAlarmRulesTemplate#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#id AomAlarmRulesTemplate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#name AomAlarmRulesTemplate#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#region AomAlarmRulesTemplate#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#type AomAlarmRulesTemplate#type}
  */
  readonly type: string;
  /**
  * alarm_template_spec_list block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_template_spec_list AomAlarmRulesTemplate#alarm_template_spec_list}
  */
  readonly alarmTemplateSpecList: AomAlarmRulesTemplateAlarmTemplateSpecListStruct[] | cdktf.IResolvable;
  /**
  * templating block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#templating AomAlarmRulesTemplate#templating}
  */
  readonly templating?: AomAlarmRulesTemplateTemplating;
}
export interface AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotification {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#bind_notification_rule_id AomAlarmRulesTemplate#bind_notification_rule_id}
  */
  readonly bindNotificationRuleId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#notification_enable AomAlarmRulesTemplate#notification_enable}
  */
  readonly notificationEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#notification_type AomAlarmRulesTemplate#notification_type}
  */
  readonly notificationType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#notify_frequency AomAlarmRulesTemplate#notify_frequency}
  */
  readonly notifyFrequency?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#notify_resolved AomAlarmRulesTemplate#notify_resolved}
  */
  readonly notifyResolved?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#notify_triggered AomAlarmRulesTemplate#notify_triggered}
  */
  readonly notifyTriggered?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#route_group_enable AomAlarmRulesTemplate#route_group_enable}
  */
  readonly routeGroupEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#route_group_rule AomAlarmRulesTemplate#route_group_rule}
  */
  readonly routeGroupRule?: string;
}

export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotificationToTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotificationOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotification): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bind_notification_rule_id: cdktf.stringToTerraform(struct!.bindNotificationRuleId),
    notification_enable: cdktf.booleanToTerraform(struct!.notificationEnable),
    notification_type: cdktf.stringToTerraform(struct!.notificationType),
    notify_frequency: cdktf.stringToTerraform(struct!.notifyFrequency),
    notify_resolved: cdktf.booleanToTerraform(struct!.notifyResolved),
    notify_triggered: cdktf.booleanToTerraform(struct!.notifyTriggered),
    route_group_enable: cdktf.booleanToTerraform(struct!.routeGroupEnable),
    route_group_rule: cdktf.stringToTerraform(struct!.routeGroupRule),
  }
}


export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotificationToHclTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotificationOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotification): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bind_notification_rule_id: {
      value: cdktf.stringToHclTerraform(struct!.bindNotificationRuleId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    notification_enable: {
      value: cdktf.booleanToHclTerraform(struct!.notificationEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    notification_type: {
      value: cdktf.stringToHclTerraform(struct!.notificationType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    notify_frequency: {
      value: cdktf.stringToHclTerraform(struct!.notifyFrequency),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    notify_resolved: {
      value: cdktf.booleanToHclTerraform(struct!.notifyResolved),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    notify_triggered: {
      value: cdktf.booleanToHclTerraform(struct!.notifyTriggered),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    route_group_enable: {
      value: cdktf.booleanToHclTerraform(struct!.routeGroupEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    route_group_rule: {
      value: cdktf.stringToHclTerraform(struct!.routeGroupRule),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotificationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotification | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bindNotificationRuleId !== undefined) {
      hasAnyValues = true;
      internalValueResult.bindNotificationRuleId = this._bindNotificationRuleId;
    }
    if (this._notificationEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.notificationEnable = this._notificationEnable;
    }
    if (this._notificationType !== undefined) {
      hasAnyValues = true;
      internalValueResult.notificationType = this._notificationType;
    }
    if (this._notifyFrequency !== undefined) {
      hasAnyValues = true;
      internalValueResult.notifyFrequency = this._notifyFrequency;
    }
    if (this._notifyResolved !== undefined) {
      hasAnyValues = true;
      internalValueResult.notifyResolved = this._notifyResolved;
    }
    if (this._notifyTriggered !== undefined) {
      hasAnyValues = true;
      internalValueResult.notifyTriggered = this._notifyTriggered;
    }
    if (this._routeGroupEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.routeGroupEnable = this._routeGroupEnable;
    }
    if (this._routeGroupRule !== undefined) {
      hasAnyValues = true;
      internalValueResult.routeGroupRule = this._routeGroupRule;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotification | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bindNotificationRuleId = undefined;
      this._notificationEnable = undefined;
      this._notificationType = undefined;
      this._notifyFrequency = undefined;
      this._notifyResolved = undefined;
      this._notifyTriggered = undefined;
      this._routeGroupEnable = undefined;
      this._routeGroupRule = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bindNotificationRuleId = value.bindNotificationRuleId;
      this._notificationEnable = value.notificationEnable;
      this._notificationType = value.notificationType;
      this._notifyFrequency = value.notifyFrequency;
      this._notifyResolved = value.notifyResolved;
      this._notifyTriggered = value.notifyTriggered;
      this._routeGroupEnable = value.routeGroupEnable;
      this._routeGroupRule = value.routeGroupRule;
    }
  }

  // bind_notification_rule_id - computed: false, optional: true, required: false
  private _bindNotificationRuleId?: string; 
  public get bindNotificationRuleId() {
    return this.getStringAttribute('bind_notification_rule_id');
  }
  public set bindNotificationRuleId(value: string) {
    this._bindNotificationRuleId = value;
  }
  public resetBindNotificationRuleId() {
    this._bindNotificationRuleId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bindNotificationRuleIdInput() {
    return this._bindNotificationRuleId;
  }

  // notification_enable - computed: true, optional: true, required: false
  private _notificationEnable?: boolean | cdktf.IResolvable; 
  public get notificationEnable() {
    return this.getBooleanAttribute('notification_enable');
  }
  public set notificationEnable(value: boolean | cdktf.IResolvable) {
    this._notificationEnable = value;
  }
  public resetNotificationEnable() {
    this._notificationEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationEnableInput() {
    return this._notificationEnable;
  }

  // notification_type - computed: false, optional: false, required: true
  private _notificationType?: string; 
  public get notificationType() {
    return this.getStringAttribute('notification_type');
  }
  public set notificationType(value: string) {
    this._notificationType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationTypeInput() {
    return this._notificationType;
  }

  // notify_frequency - computed: true, optional: true, required: false
  private _notifyFrequency?: string; 
  public get notifyFrequency() {
    return this.getStringAttribute('notify_frequency');
  }
  public set notifyFrequency(value: string) {
    this._notifyFrequency = value;
  }
  public resetNotifyFrequency() {
    this._notifyFrequency = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notifyFrequencyInput() {
    return this._notifyFrequency;
  }

  // notify_resolved - computed: true, optional: true, required: false
  private _notifyResolved?: boolean | cdktf.IResolvable; 
  public get notifyResolved() {
    return this.getBooleanAttribute('notify_resolved');
  }
  public set notifyResolved(value: boolean | cdktf.IResolvable) {
    this._notifyResolved = value;
  }
  public resetNotifyResolved() {
    this._notifyResolved = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notifyResolvedInput() {
    return this._notifyResolved;
  }

  // notify_triggered - computed: true, optional: true, required: false
  private _notifyTriggered?: boolean | cdktf.IResolvable; 
  public get notifyTriggered() {
    return this.getBooleanAttribute('notify_triggered');
  }
  public set notifyTriggered(value: boolean | cdktf.IResolvable) {
    this._notifyTriggered = value;
  }
  public resetNotifyTriggered() {
    this._notifyTriggered = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notifyTriggeredInput() {
    return this._notifyTriggered;
  }

  // route_group_enable - computed: true, optional: true, required: false
  private _routeGroupEnable?: boolean | cdktf.IResolvable; 
  public get routeGroupEnable() {
    return this.getBooleanAttribute('route_group_enable');
  }
  public set routeGroupEnable(value: boolean | cdktf.IResolvable) {
    this._routeGroupEnable = value;
  }
  public resetRouteGroupEnable() {
    this._routeGroupEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get routeGroupEnableInput() {
    return this._routeGroupEnable;
  }

  // route_group_rule - computed: false, optional: true, required: false
  private _routeGroupRule?: string; 
  public get routeGroupRule() {
    return this.getStringAttribute('route_group_rule');
  }
  public set routeGroupRule(value: string) {
    this._routeGroupRule = value;
  }
  public resetRouteGroupRule() {
    this._routeGroupRule = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get routeGroupRuleInput() {
    return this._routeGroupRule;
  }
}
export interface AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#aggregation_window AomAlarmRulesTemplate#aggregation_window}
  */
  readonly aggregationWindow?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#event_name AomAlarmRulesTemplate#event_name}
  */
  readonly eventName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#frequency AomAlarmRulesTemplate#frequency}
  */
  readonly frequency?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#operator AomAlarmRulesTemplate#operator}
  */
  readonly operator?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#thresholds AomAlarmRulesTemplate#thresholds}
  */
  readonly thresholds?: { [key: string]: number };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#trigger_type AomAlarmRulesTemplate#trigger_type}
  */
  readonly triggerType: string;
}

export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsToTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    aggregation_window: cdktf.numberToTerraform(struct!.aggregationWindow),
    event_name: cdktf.stringToTerraform(struct!.eventName),
    frequency: cdktf.stringToTerraform(struct!.frequency),
    operator: cdktf.stringToTerraform(struct!.operator),
    thresholds: cdktf.hashMapper(cdktf.numberToTerraform)(struct!.thresholds),
    trigger_type: cdktf.stringToTerraform(struct!.triggerType),
  }
}


export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsToHclTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    aggregation_window: {
      value: cdktf.numberToHclTerraform(struct!.aggregationWindow),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    event_name: {
      value: cdktf.stringToHclTerraform(struct!.eventName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    frequency: {
      value: cdktf.stringToHclTerraform(struct!.frequency),
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
    thresholds: {
      value: cdktf.hashMapperHcl(cdktf.numberToHclTerraform)(struct!.thresholds),
      isBlock: false,
      type: "map",
      storageClassType: "numberMap",
    },
    trigger_type: {
      value: cdktf.stringToHclTerraform(struct!.triggerType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._aggregationWindow !== undefined) {
      hasAnyValues = true;
      internalValueResult.aggregationWindow = this._aggregationWindow;
    }
    if (this._eventName !== undefined) {
      hasAnyValues = true;
      internalValueResult.eventName = this._eventName;
    }
    if (this._frequency !== undefined) {
      hasAnyValues = true;
      internalValueResult.frequency = this._frequency;
    }
    if (this._operator !== undefined) {
      hasAnyValues = true;
      internalValueResult.operator = this._operator;
    }
    if (this._thresholds !== undefined) {
      hasAnyValues = true;
      internalValueResult.thresholds = this._thresholds;
    }
    if (this._triggerType !== undefined) {
      hasAnyValues = true;
      internalValueResult.triggerType = this._triggerType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._aggregationWindow = undefined;
      this._eventName = undefined;
      this._frequency = undefined;
      this._operator = undefined;
      this._thresholds = undefined;
      this._triggerType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._aggregationWindow = value.aggregationWindow;
      this._eventName = value.eventName;
      this._frequency = value.frequency;
      this._operator = value.operator;
      this._thresholds = value.thresholds;
      this._triggerType = value.triggerType;
    }
  }

  // aggregation_window - computed: false, optional: true, required: false
  private _aggregationWindow?: number; 
  public get aggregationWindow() {
    return this.getNumberAttribute('aggregation_window');
  }
  public set aggregationWindow(value: number) {
    this._aggregationWindow = value;
  }
  public resetAggregationWindow() {
    this._aggregationWindow = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aggregationWindowInput() {
    return this._aggregationWindow;
  }

  // event_name - computed: false, optional: true, required: false
  private _eventName?: string; 
  public get eventName() {
    return this.getStringAttribute('event_name');
  }
  public set eventName(value: string) {
    this._eventName = value;
  }
  public resetEventName() {
    this._eventName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eventNameInput() {
    return this._eventName;
  }

  // frequency - computed: false, optional: true, required: false
  private _frequency?: string; 
  public get frequency() {
    return this.getStringAttribute('frequency');
  }
  public set frequency(value: string) {
    this._frequency = value;
  }
  public resetFrequency() {
    this._frequency = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get frequencyInput() {
    return this._frequency;
  }

  // operator - computed: false, optional: true, required: false
  private _operator?: string; 
  public get operator() {
    return this.getStringAttribute('operator');
  }
  public set operator(value: string) {
    this._operator = value;
  }
  public resetOperator() {
    this._operator = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get operatorInput() {
    return this._operator;
  }

  // thresholds - computed: false, optional: true, required: false
  private _thresholds?: { [key: string]: number }; 
  public get thresholds() {
    return this.getNumberMapAttribute('thresholds');
  }
  public set thresholds(value: { [key: string]: number }) {
    this._thresholds = value;
  }
  public resetThresholds() {
    this._thresholds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get thresholdsInput() {
    return this._thresholds;
  }

  // trigger_type - computed: false, optional: false, required: true
  private _triggerType?: string; 
  public get triggerType() {
    return this.getStringAttribute('trigger_type');
  }
  public set triggerType(value: string) {
    this._triggerType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerTypeInput() {
    return this._triggerType;
  }
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsOutputReference {
    return new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_source AomAlarmRulesTemplate#alarm_source}
  */
  readonly alarmSource?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_subtype AomAlarmRulesTemplate#alarm_subtype}
  */
  readonly alarmSubtype?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#event_source AomAlarmRulesTemplate#event_source}
  */
  readonly eventSource?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#monitor_object_templates AomAlarmRulesTemplate#monitor_object_templates}
  */
  readonly monitorObjectTemplates?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#monitor_objects AomAlarmRulesTemplate#monitor_objects}
  */
  readonly monitorObjects?: { [key: string]: string }[] | cdktf.IResolvable;
  /**
  * trigger_conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#trigger_conditions AomAlarmRulesTemplate#trigger_conditions}
  */
  readonly triggerConditions?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions[] | cdktf.IResolvable;
}

export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecToTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    alarm_source: cdktf.stringToTerraform(struct!.alarmSource),
    alarm_subtype: cdktf.stringToTerraform(struct!.alarmSubtype),
    event_source: cdktf.stringToTerraform(struct!.eventSource),
    monitor_object_templates: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.monitorObjectTemplates),
    monitor_objects: cdktf.listMapper(cdktf.hashMapper(cdktf.stringToTerraform), false)(struct!.monitorObjects),
    trigger_conditions: cdktf.listMapper(aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsToTerraform, true)(struct!.triggerConditions),
  }
}


export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecToHclTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    alarm_source: {
      value: cdktf.stringToHclTerraform(struct!.alarmSource),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    alarm_subtype: {
      value: cdktf.stringToHclTerraform(struct!.alarmSubtype),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    event_source: {
      value: cdktf.stringToHclTerraform(struct!.eventSource),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    monitor_object_templates: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.monitorObjectTemplates),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    monitor_objects: {
      value: cdktf.listMapperHcl(cdktf.hashMapperHcl(cdktf.stringToHclTerraform), false)(struct!.monitorObjects),
      isBlock: false,
      type: "list",
      storageClassType: "stringMapList",
    },
    trigger_conditions: {
      value: cdktf.listMapperHcl(aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsToHclTerraform, true)(struct!.triggerConditions),
      isBlock: true,
      type: "set",
      storageClassType: "AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._alarmSource !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmSource = this._alarmSource;
    }
    if (this._alarmSubtype !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmSubtype = this._alarmSubtype;
    }
    if (this._eventSource !== undefined) {
      hasAnyValues = true;
      internalValueResult.eventSource = this._eventSource;
    }
    if (this._monitorObjectTemplates !== undefined) {
      hasAnyValues = true;
      internalValueResult.monitorObjectTemplates = this._monitorObjectTemplates;
    }
    if (this._monitorObjects !== undefined) {
      hasAnyValues = true;
      internalValueResult.monitorObjects = this._monitorObjects;
    }
    if (this._triggerConditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.triggerConditions = this._triggerConditions?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._alarmSource = undefined;
      this._alarmSubtype = undefined;
      this._eventSource = undefined;
      this._monitorObjectTemplates = undefined;
      this._monitorObjects = undefined;
      this._triggerConditions.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._alarmSource = value.alarmSource;
      this._alarmSubtype = value.alarmSubtype;
      this._eventSource = value.eventSource;
      this._monitorObjectTemplates = value.monitorObjectTemplates;
      this._monitorObjects = value.monitorObjects;
      this._triggerConditions.internalValue = value.triggerConditions;
    }
  }

  // alarm_source - computed: false, optional: true, required: false
  private _alarmSource?: string; 
  public get alarmSource() {
    return this.getStringAttribute('alarm_source');
  }
  public set alarmSource(value: string) {
    this._alarmSource = value;
  }
  public resetAlarmSource() {
    this._alarmSource = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmSourceInput() {
    return this._alarmSource;
  }

  // alarm_subtype - computed: false, optional: true, required: false
  private _alarmSubtype?: string; 
  public get alarmSubtype() {
    return this.getStringAttribute('alarm_subtype');
  }
  public set alarmSubtype(value: string) {
    this._alarmSubtype = value;
  }
  public resetAlarmSubtype() {
    this._alarmSubtype = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmSubtypeInput() {
    return this._alarmSubtype;
  }

  // event_source - computed: false, optional: true, required: false
  private _eventSource?: string; 
  public get eventSource() {
    return this.getStringAttribute('event_source');
  }
  public set eventSource(value: string) {
    this._eventSource = value;
  }
  public resetEventSource() {
    this._eventSource = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eventSourceInput() {
    return this._eventSource;
  }

  // monitor_object_templates - computed: false, optional: true, required: false
  private _monitorObjectTemplates?: string[]; 
  public get monitorObjectTemplates() {
    return cdktf.Fn.tolist(this.getListAttribute('monitor_object_templates'));
  }
  public set monitorObjectTemplates(value: string[]) {
    this._monitorObjectTemplates = value;
  }
  public resetMonitorObjectTemplates() {
    this._monitorObjectTemplates = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get monitorObjectTemplatesInput() {
    return this._monitorObjectTemplates;
  }

  // monitor_objects - computed: false, optional: true, required: false
  private _monitorObjects?: { [key: string]: string }[] | cdktf.IResolvable; 
  public get monitorObjects() {
    return this.interpolationForAttribute('monitor_objects');
  }
  public set monitorObjects(value: { [key: string]: string }[] | cdktf.IResolvable) {
    this._monitorObjects = value;
  }
  public resetMonitorObjects() {
    this._monitorObjects = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get monitorObjectsInput() {
    return this._monitorObjects;
  }

  // trigger_conditions - computed: false, optional: true, required: false
  private _triggerConditions = new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsList(this, "trigger_conditions", true);
  public get triggerConditions() {
    return this._triggerConditions;
  }
  public putTriggerConditions(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions[] | cdktf.IResolvable) {
    this._triggerConditions.internalValue = value;
  }
  public resetTriggerConditions() {
    this._triggerConditions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerConditionsInput() {
    return this._triggerConditions.internalValue;
  }
}
export interface AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#auto_tags AomAlarmRulesTemplate#auto_tags}
  */
  readonly autoTags?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#custom_annotations AomAlarmRulesTemplate#custom_annotations}
  */
  readonly customAnnotations?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#custom_tags AomAlarmRulesTemplate#custom_tags}
  */
  readonly customTags?: string[];
}

export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsToTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    auto_tags: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.autoTags),
    custom_annotations: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.customAnnotations),
    custom_tags: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.customTags),
  }
}


export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsToHclTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    auto_tags: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.autoTags),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    custom_annotations: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.customAnnotations),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    custom_tags: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.customTags),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._autoTags !== undefined) {
      hasAnyValues = true;
      internalValueResult.autoTags = this._autoTags;
    }
    if (this._customAnnotations !== undefined) {
      hasAnyValues = true;
      internalValueResult.customAnnotations = this._customAnnotations;
    }
    if (this._customTags !== undefined) {
      hasAnyValues = true;
      internalValueResult.customTags = this._customTags;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._autoTags = undefined;
      this._customAnnotations = undefined;
      this._customTags = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._autoTags = value.autoTags;
      this._customAnnotations = value.customAnnotations;
      this._customTags = value.customTags;
    }
  }

  // auto_tags - computed: false, optional: true, required: false
  private _autoTags?: string[]; 
  public get autoTags() {
    return cdktf.Fn.tolist(this.getListAttribute('auto_tags'));
  }
  public set autoTags(value: string[]) {
    this._autoTags = value;
  }
  public resetAutoTags() {
    this._autoTags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoTagsInput() {
    return this._autoTags;
  }

  // custom_annotations - computed: false, optional: true, required: false
  private _customAnnotations?: string[]; 
  public get customAnnotations() {
    return cdktf.Fn.tolist(this.getListAttribute('custom_annotations'));
  }
  public set customAnnotations(value: string[]) {
    this._customAnnotations = value;
  }
  public resetCustomAnnotations() {
    this._customAnnotations = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customAnnotationsInput() {
    return this._customAnnotations;
  }

  // custom_tags - computed: false, optional: true, required: false
  private _customTags?: string[]; 
  public get customTags() {
    return cdktf.Fn.tolist(this.getListAttribute('custom_tags'));
  }
  public set customTags(value: string[]) {
    this._customTags = value;
  }
  public resetCustomTags() {
    this._customTags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customTagsInput() {
    return this._customTags;
  }
}
export interface AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#no_data_alert_state AomAlarmRulesTemplate#no_data_alert_state}
  */
  readonly noDataAlertState?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#no_data_timeframe AomAlarmRulesTemplate#no_data_timeframe}
  */
  readonly noDataTimeframe?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#notify_no_data AomAlarmRulesTemplate#notify_no_data}
  */
  readonly notifyNoData?: boolean | cdktf.IResolvable;
}

export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsToTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    no_data_alert_state: cdktf.stringToTerraform(struct!.noDataAlertState),
    no_data_timeframe: cdktf.numberToTerraform(struct!.noDataTimeframe),
    notify_no_data: cdktf.booleanToTerraform(struct!.notifyNoData),
  }
}


export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsToHclTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    no_data_alert_state: {
      value: cdktf.stringToHclTerraform(struct!.noDataAlertState),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    no_data_timeframe: {
      value: cdktf.numberToHclTerraform(struct!.noDataTimeframe),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    notify_no_data: {
      value: cdktf.booleanToHclTerraform(struct!.notifyNoData),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._noDataAlertState !== undefined) {
      hasAnyValues = true;
      internalValueResult.noDataAlertState = this._noDataAlertState;
    }
    if (this._noDataTimeframe !== undefined) {
      hasAnyValues = true;
      internalValueResult.noDataTimeframe = this._noDataTimeframe;
    }
    if (this._notifyNoData !== undefined) {
      hasAnyValues = true;
      internalValueResult.notifyNoData = this._notifyNoData;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._noDataAlertState = undefined;
      this._noDataTimeframe = undefined;
      this._notifyNoData = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._noDataAlertState = value.noDataAlertState;
      this._noDataTimeframe = value.noDataTimeframe;
      this._notifyNoData = value.notifyNoData;
    }
  }

  // no_data_alert_state - computed: false, optional: true, required: false
  private _noDataAlertState?: string; 
  public get noDataAlertState() {
    return this.getStringAttribute('no_data_alert_state');
  }
  public set noDataAlertState(value: string) {
    this._noDataAlertState = value;
  }
  public resetNoDataAlertState() {
    this._noDataAlertState = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get noDataAlertStateInput() {
    return this._noDataAlertState;
  }

  // no_data_timeframe - computed: false, optional: true, required: false
  private _noDataTimeframe?: number; 
  public get noDataTimeframe() {
    return this.getNumberAttribute('no_data_timeframe');
  }
  public set noDataTimeframe(value: number) {
    this._noDataTimeframe = value;
  }
  public resetNoDataTimeframe() {
    this._noDataTimeframe = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get noDataTimeframeInput() {
    return this._noDataTimeframe;
  }

  // notify_no_data - computed: false, optional: true, required: false
  private _notifyNoData?: boolean | cdktf.IResolvable; 
  public get notifyNoData() {
    return this.getBooleanAttribute('notify_no_data');
  }
  public set notifyNoData(value: boolean | cdktf.IResolvable) {
    this._notifyNoData = value;
  }
  public resetNotifyNoData() {
    this._notifyNoData = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notifyNoDataInput() {
    return this._notifyNoData;
  }
}
export interface AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#recovery_timeframe AomAlarmRulesTemplate#recovery_timeframe}
  */
  readonly recoveryTimeframe?: number;
}

export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsToTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    recovery_timeframe: cdktf.numberToTerraform(struct!.recoveryTimeframe),
  }
}


export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsToHclTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    recovery_timeframe: {
      value: cdktf.numberToHclTerraform(struct!.recoveryTimeframe),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._recoveryTimeframe !== undefined) {
      hasAnyValues = true;
      internalValueResult.recoveryTimeframe = this._recoveryTimeframe;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._recoveryTimeframe = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._recoveryTimeframe = value.recoveryTimeframe;
    }
  }

  // recovery_timeframe - computed: false, optional: true, required: false
  private _recoveryTimeframe?: number; 
  public get recoveryTimeframe() {
    return this.getNumberAttribute('recovery_timeframe');
  }
  public set recoveryTimeframe(value: number) {
    this._recoveryTimeframe = value;
  }
  public resetRecoveryTimeframe() {
    this._recoveryTimeframe = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recoveryTimeframeInput() {
    return this._recoveryTimeframe;
  }
}
export interface AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#aggregate_type AomAlarmRulesTemplate#aggregate_type}
  */
  readonly aggregateType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#aggregation_type AomAlarmRulesTemplate#aggregation_type}
  */
  readonly aggregationType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#aggregation_window AomAlarmRulesTemplate#aggregation_window}
  */
  readonly aggregationWindow?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#aom_monitor_level AomAlarmRulesTemplate#aom_monitor_level}
  */
  readonly aomMonitorLevel?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#expression AomAlarmRulesTemplate#expression}
  */
  readonly expression?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#metric_labels AomAlarmRulesTemplate#metric_labels}
  */
  readonly metricLabels?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#metric_name AomAlarmRulesTemplate#metric_name}
  */
  readonly metricName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#metric_namespace AomAlarmRulesTemplate#metric_namespace}
  */
  readonly metricNamespace?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#metric_query_mode AomAlarmRulesTemplate#metric_query_mode}
  */
  readonly metricQueryMode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#metric_statistic_method AomAlarmRulesTemplate#metric_statistic_method}
  */
  readonly metricStatisticMethod?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#metric_unit AomAlarmRulesTemplate#metric_unit}
  */
  readonly metricUnit?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#mix_promql AomAlarmRulesTemplate#mix_promql}
  */
  readonly mixPromql?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#operator AomAlarmRulesTemplate#operator}
  */
  readonly operator?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#promql AomAlarmRulesTemplate#promql}
  */
  readonly promql?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#promql_expr AomAlarmRulesTemplate#promql_expr}
  */
  readonly promqlExpr?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#promql_for AomAlarmRulesTemplate#promql_for}
  */
  readonly promqlFor?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#query_match AomAlarmRulesTemplate#query_match}
  */
  readonly queryMatch?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#thresholds AomAlarmRulesTemplate#thresholds}
  */
  readonly thresholds?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#trigger_interval AomAlarmRulesTemplate#trigger_interval}
  */
  readonly triggerInterval?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#trigger_times AomAlarmRulesTemplate#trigger_times}
  */
  readonly triggerTimes?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#trigger_type AomAlarmRulesTemplate#trigger_type}
  */
  readonly triggerType?: string;
}

export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsToTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    aggregate_type: cdktf.stringToTerraform(struct!.aggregateType),
    aggregation_type: cdktf.stringToTerraform(struct!.aggregationType),
    aggregation_window: cdktf.stringToTerraform(struct!.aggregationWindow),
    aom_monitor_level: cdktf.stringToTerraform(struct!.aomMonitorLevel),
    expression: cdktf.stringToTerraform(struct!.expression),
    metric_labels: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.metricLabels),
    metric_name: cdktf.stringToTerraform(struct!.metricName),
    metric_namespace: cdktf.stringToTerraform(struct!.metricNamespace),
    metric_query_mode: cdktf.stringToTerraform(struct!.metricQueryMode),
    metric_statistic_method: cdktf.stringToTerraform(struct!.metricStatisticMethod),
    metric_unit: cdktf.stringToTerraform(struct!.metricUnit),
    mix_promql: cdktf.stringToTerraform(struct!.mixPromql),
    operator: cdktf.stringToTerraform(struct!.operator),
    promql: cdktf.stringToTerraform(struct!.promql),
    promql_expr: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.promqlExpr),
    promql_for: cdktf.stringToTerraform(struct!.promqlFor),
    query_match: cdktf.stringToTerraform(struct!.queryMatch),
    thresholds: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.thresholds),
    trigger_interval: cdktf.stringToTerraform(struct!.triggerInterval),
    trigger_times: cdktf.stringToTerraform(struct!.triggerTimes),
    trigger_type: cdktf.stringToTerraform(struct!.triggerType),
  }
}


export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsToHclTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    aggregate_type: {
      value: cdktf.stringToHclTerraform(struct!.aggregateType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    aggregation_type: {
      value: cdktf.stringToHclTerraform(struct!.aggregationType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    aggregation_window: {
      value: cdktf.stringToHclTerraform(struct!.aggregationWindow),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    aom_monitor_level: {
      value: cdktf.stringToHclTerraform(struct!.aomMonitorLevel),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    expression: {
      value: cdktf.stringToHclTerraform(struct!.expression),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    metric_labels: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.metricLabels),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    metric_name: {
      value: cdktf.stringToHclTerraform(struct!.metricName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    metric_namespace: {
      value: cdktf.stringToHclTerraform(struct!.metricNamespace),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    metric_query_mode: {
      value: cdktf.stringToHclTerraform(struct!.metricQueryMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    metric_statistic_method: {
      value: cdktf.stringToHclTerraform(struct!.metricStatisticMethod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    metric_unit: {
      value: cdktf.stringToHclTerraform(struct!.metricUnit),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mix_promql: {
      value: cdktf.stringToHclTerraform(struct!.mixPromql),
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
    promql: {
      value: cdktf.stringToHclTerraform(struct!.promql),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    promql_expr: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.promqlExpr),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    promql_for: {
      value: cdktf.stringToHclTerraform(struct!.promqlFor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    query_match: {
      value: cdktf.stringToHclTerraform(struct!.queryMatch),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    thresholds: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.thresholds),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    trigger_interval: {
      value: cdktf.stringToHclTerraform(struct!.triggerInterval),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    trigger_times: {
      value: cdktf.stringToHclTerraform(struct!.triggerTimes),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    trigger_type: {
      value: cdktf.stringToHclTerraform(struct!.triggerType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._aggregateType !== undefined) {
      hasAnyValues = true;
      internalValueResult.aggregateType = this._aggregateType;
    }
    if (this._aggregationType !== undefined) {
      hasAnyValues = true;
      internalValueResult.aggregationType = this._aggregationType;
    }
    if (this._aggregationWindow !== undefined) {
      hasAnyValues = true;
      internalValueResult.aggregationWindow = this._aggregationWindow;
    }
    if (this._aomMonitorLevel !== undefined) {
      hasAnyValues = true;
      internalValueResult.aomMonitorLevel = this._aomMonitorLevel;
    }
    if (this._expression !== undefined) {
      hasAnyValues = true;
      internalValueResult.expression = this._expression;
    }
    if (this._metricLabels !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricLabels = this._metricLabels;
    }
    if (this._metricName !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricName = this._metricName;
    }
    if (this._metricNamespace !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricNamespace = this._metricNamespace;
    }
    if (this._metricQueryMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricQueryMode = this._metricQueryMode;
    }
    if (this._metricStatisticMethod !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricStatisticMethod = this._metricStatisticMethod;
    }
    if (this._metricUnit !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricUnit = this._metricUnit;
    }
    if (this._mixPromql !== undefined) {
      hasAnyValues = true;
      internalValueResult.mixPromql = this._mixPromql;
    }
    if (this._operator !== undefined) {
      hasAnyValues = true;
      internalValueResult.operator = this._operator;
    }
    if (this._promql !== undefined) {
      hasAnyValues = true;
      internalValueResult.promql = this._promql;
    }
    if (this._promqlExpr !== undefined) {
      hasAnyValues = true;
      internalValueResult.promqlExpr = this._promqlExpr;
    }
    if (this._promqlFor !== undefined) {
      hasAnyValues = true;
      internalValueResult.promqlFor = this._promqlFor;
    }
    if (this._queryMatch !== undefined) {
      hasAnyValues = true;
      internalValueResult.queryMatch = this._queryMatch;
    }
    if (this._thresholds !== undefined) {
      hasAnyValues = true;
      internalValueResult.thresholds = this._thresholds;
    }
    if (this._triggerInterval !== undefined) {
      hasAnyValues = true;
      internalValueResult.triggerInterval = this._triggerInterval;
    }
    if (this._triggerTimes !== undefined) {
      hasAnyValues = true;
      internalValueResult.triggerTimes = this._triggerTimes;
    }
    if (this._triggerType !== undefined) {
      hasAnyValues = true;
      internalValueResult.triggerType = this._triggerType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._aggregateType = undefined;
      this._aggregationType = undefined;
      this._aggregationWindow = undefined;
      this._aomMonitorLevel = undefined;
      this._expression = undefined;
      this._metricLabels = undefined;
      this._metricName = undefined;
      this._metricNamespace = undefined;
      this._metricQueryMode = undefined;
      this._metricStatisticMethod = undefined;
      this._metricUnit = undefined;
      this._mixPromql = undefined;
      this._operator = undefined;
      this._promql = undefined;
      this._promqlExpr = undefined;
      this._promqlFor = undefined;
      this._queryMatch = undefined;
      this._thresholds = undefined;
      this._triggerInterval = undefined;
      this._triggerTimes = undefined;
      this._triggerType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._aggregateType = value.aggregateType;
      this._aggregationType = value.aggregationType;
      this._aggregationWindow = value.aggregationWindow;
      this._aomMonitorLevel = value.aomMonitorLevel;
      this._expression = value.expression;
      this._metricLabels = value.metricLabels;
      this._metricName = value.metricName;
      this._metricNamespace = value.metricNamespace;
      this._metricQueryMode = value.metricQueryMode;
      this._metricStatisticMethod = value.metricStatisticMethod;
      this._metricUnit = value.metricUnit;
      this._mixPromql = value.mixPromql;
      this._operator = value.operator;
      this._promql = value.promql;
      this._promqlExpr = value.promqlExpr;
      this._promqlFor = value.promqlFor;
      this._queryMatch = value.queryMatch;
      this._thresholds = value.thresholds;
      this._triggerInterval = value.triggerInterval;
      this._triggerTimes = value.triggerTimes;
      this._triggerType = value.triggerType;
    }
  }

  // aggregate_type - computed: false, optional: true, required: false
  private _aggregateType?: string; 
  public get aggregateType() {
    return this.getStringAttribute('aggregate_type');
  }
  public set aggregateType(value: string) {
    this._aggregateType = value;
  }
  public resetAggregateType() {
    this._aggregateType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aggregateTypeInput() {
    return this._aggregateType;
  }

  // aggregation_type - computed: false, optional: true, required: false
  private _aggregationType?: string; 
  public get aggregationType() {
    return this.getStringAttribute('aggregation_type');
  }
  public set aggregationType(value: string) {
    this._aggregationType = value;
  }
  public resetAggregationType() {
    this._aggregationType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aggregationTypeInput() {
    return this._aggregationType;
  }

  // aggregation_window - computed: false, optional: true, required: false
  private _aggregationWindow?: string; 
  public get aggregationWindow() {
    return this.getStringAttribute('aggregation_window');
  }
  public set aggregationWindow(value: string) {
    this._aggregationWindow = value;
  }
  public resetAggregationWindow() {
    this._aggregationWindow = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aggregationWindowInput() {
    return this._aggregationWindow;
  }

  // aom_monitor_level - computed: false, optional: true, required: false
  private _aomMonitorLevel?: string; 
  public get aomMonitorLevel() {
    return this.getStringAttribute('aom_monitor_level');
  }
  public set aomMonitorLevel(value: string) {
    this._aomMonitorLevel = value;
  }
  public resetAomMonitorLevel() {
    this._aomMonitorLevel = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aomMonitorLevelInput() {
    return this._aomMonitorLevel;
  }

  // expression - computed: false, optional: true, required: false
  private _expression?: string; 
  public get expression() {
    return this.getStringAttribute('expression');
  }
  public set expression(value: string) {
    this._expression = value;
  }
  public resetExpression() {
    this._expression = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expressionInput() {
    return this._expression;
  }

  // metric_labels - computed: false, optional: true, required: false
  private _metricLabels?: string[]; 
  public get metricLabels() {
    return cdktf.Fn.tolist(this.getListAttribute('metric_labels'));
  }
  public set metricLabels(value: string[]) {
    this._metricLabels = value;
  }
  public resetMetricLabels() {
    this._metricLabels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricLabelsInput() {
    return this._metricLabels;
  }

  // metric_name - computed: false, optional: true, required: false
  private _metricName?: string; 
  public get metricName() {
    return this.getStringAttribute('metric_name');
  }
  public set metricName(value: string) {
    this._metricName = value;
  }
  public resetMetricName() {
    this._metricName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricNameInput() {
    return this._metricName;
  }

  // metric_namespace - computed: false, optional: true, required: false
  private _metricNamespace?: string; 
  public get metricNamespace() {
    return this.getStringAttribute('metric_namespace');
  }
  public set metricNamespace(value: string) {
    this._metricNamespace = value;
  }
  public resetMetricNamespace() {
    this._metricNamespace = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricNamespaceInput() {
    return this._metricNamespace;
  }

  // metric_query_mode - computed: false, optional: false, required: true
  private _metricQueryMode?: string; 
  public get metricQueryMode() {
    return this.getStringAttribute('metric_query_mode');
  }
  public set metricQueryMode(value: string) {
    this._metricQueryMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get metricQueryModeInput() {
    return this._metricQueryMode;
  }

  // metric_statistic_method - computed: false, optional: true, required: false
  private _metricStatisticMethod?: string; 
  public get metricStatisticMethod() {
    return this.getStringAttribute('metric_statistic_method');
  }
  public set metricStatisticMethod(value: string) {
    this._metricStatisticMethod = value;
  }
  public resetMetricStatisticMethod() {
    this._metricStatisticMethod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricStatisticMethodInput() {
    return this._metricStatisticMethod;
  }

  // metric_unit - computed: false, optional: true, required: false
  private _metricUnit?: string; 
  public get metricUnit() {
    return this.getStringAttribute('metric_unit');
  }
  public set metricUnit(value: string) {
    this._metricUnit = value;
  }
  public resetMetricUnit() {
    this._metricUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricUnitInput() {
    return this._metricUnit;
  }

  // mix_promql - computed: false, optional: true, required: false
  private _mixPromql?: string; 
  public get mixPromql() {
    return this.getStringAttribute('mix_promql');
  }
  public set mixPromql(value: string) {
    this._mixPromql = value;
  }
  public resetMixPromql() {
    this._mixPromql = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mixPromqlInput() {
    return this._mixPromql;
  }

  // operator - computed: false, optional: true, required: false
  private _operator?: string; 
  public get operator() {
    return this.getStringAttribute('operator');
  }
  public set operator(value: string) {
    this._operator = value;
  }
  public resetOperator() {
    this._operator = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get operatorInput() {
    return this._operator;
  }

  // promql - computed: false, optional: true, required: false
  private _promql?: string; 
  public get promql() {
    return this.getStringAttribute('promql');
  }
  public set promql(value: string) {
    this._promql = value;
  }
  public resetPromql() {
    this._promql = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get promqlInput() {
    return this._promql;
  }

  // promql_expr - computed: false, optional: true, required: false
  private _promqlExpr?: string[]; 
  public get promqlExpr() {
    return cdktf.Fn.tolist(this.getListAttribute('promql_expr'));
  }
  public set promqlExpr(value: string[]) {
    this._promqlExpr = value;
  }
  public resetPromqlExpr() {
    this._promqlExpr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get promqlExprInput() {
    return this._promqlExpr;
  }

  // promql_for - computed: false, optional: true, required: false
  private _promqlFor?: string; 
  public get promqlFor() {
    return this.getStringAttribute('promql_for');
  }
  public set promqlFor(value: string) {
    this._promqlFor = value;
  }
  public resetPromqlFor() {
    this._promqlFor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get promqlForInput() {
    return this._promqlFor;
  }

  // query_match - computed: false, optional: true, required: false
  private _queryMatch?: string; 
  public get queryMatch() {
    return this.getStringAttribute('query_match');
  }
  public set queryMatch(value: string) {
    this._queryMatch = value;
  }
  public resetQueryMatch() {
    this._queryMatch = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queryMatchInput() {
    return this._queryMatch;
  }

  // thresholds - computed: false, optional: true, required: false
  private _thresholds?: { [key: string]: string }; 
  public get thresholds() {
    return this.getStringMapAttribute('thresholds');
  }
  public set thresholds(value: { [key: string]: string }) {
    this._thresholds = value;
  }
  public resetThresholds() {
    this._thresholds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get thresholdsInput() {
    return this._thresholds;
  }

  // trigger_interval - computed: false, optional: true, required: false
  private _triggerInterval?: string; 
  public get triggerInterval() {
    return this.getStringAttribute('trigger_interval');
  }
  public set triggerInterval(value: string) {
    this._triggerInterval = value;
  }
  public resetTriggerInterval() {
    this._triggerInterval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerIntervalInput() {
    return this._triggerInterval;
  }

  // trigger_times - computed: false, optional: true, required: false
  private _triggerTimes?: string; 
  public get triggerTimes() {
    return this.getStringAttribute('trigger_times');
  }
  public set triggerTimes(value: string) {
    this._triggerTimes = value;
  }
  public resetTriggerTimes() {
    this._triggerTimes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerTimesInput() {
    return this._triggerTimes;
  }

  // trigger_type - computed: false, optional: true, required: false
  private _triggerType?: string; 
  public get triggerType() {
    return this.getStringAttribute('trigger_type');
  }
  public set triggerType(value: string) {
    this._triggerType = value;
  }
  public resetTriggerType() {
    this._triggerType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerTypeInput() {
    return this._triggerType;
  }
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsOutputReference {
    return new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_source AomAlarmRulesTemplate#alarm_source}
  */
  readonly alarmSource?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_subtype AomAlarmRulesTemplate#alarm_subtype}
  */
  readonly alarmSubtype?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#monitor_type AomAlarmRulesTemplate#monitor_type}
  */
  readonly monitorType?: string;
  /**
  * alarm_tags block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_tags AomAlarmRulesTemplate#alarm_tags}
  */
  readonly alarmTags?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags;
  /**
  * no_data_conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#no_data_conditions AomAlarmRulesTemplate#no_data_conditions}
  */
  readonly noDataConditions?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions;
  /**
  * recovery_conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#recovery_conditions AomAlarmRulesTemplate#recovery_conditions}
  */
  readonly recoveryConditions?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions;
  /**
  * trigger_conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#trigger_conditions AomAlarmRulesTemplate#trigger_conditions}
  */
  readonly triggerConditions?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions[] | cdktf.IResolvable;
}

export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecToTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    alarm_source: cdktf.stringToTerraform(struct!.alarmSource),
    alarm_subtype: cdktf.stringToTerraform(struct!.alarmSubtype),
    monitor_type: cdktf.stringToTerraform(struct!.monitorType),
    alarm_tags: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsToTerraform(struct!.alarmTags),
    no_data_conditions: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsToTerraform(struct!.noDataConditions),
    recovery_conditions: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsToTerraform(struct!.recoveryConditions),
    trigger_conditions: cdktf.listMapper(aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsToTerraform, true)(struct!.triggerConditions),
  }
}


export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecToHclTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecOutputReference | AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    alarm_source: {
      value: cdktf.stringToHclTerraform(struct!.alarmSource),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    alarm_subtype: {
      value: cdktf.stringToHclTerraform(struct!.alarmSubtype),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    monitor_type: {
      value: cdktf.stringToHclTerraform(struct!.monitorType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    alarm_tags: {
      value: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsToHclTerraform(struct!.alarmTags),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsList",
    },
    no_data_conditions: {
      value: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsToHclTerraform(struct!.noDataConditions),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsList",
    },
    recovery_conditions: {
      value: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsToHclTerraform(struct!.recoveryConditions),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsList",
    },
    trigger_conditions: {
      value: cdktf.listMapperHcl(aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsToHclTerraform, true)(struct!.triggerConditions),
      isBlock: true,
      type: "set",
      storageClassType: "AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._alarmSource !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmSource = this._alarmSource;
    }
    if (this._alarmSubtype !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmSubtype = this._alarmSubtype;
    }
    if (this._monitorType !== undefined) {
      hasAnyValues = true;
      internalValueResult.monitorType = this._monitorType;
    }
    if (this._alarmTags?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmTags = this._alarmTags?.internalValue;
    }
    if (this._noDataConditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.noDataConditions = this._noDataConditions?.internalValue;
    }
    if (this._recoveryConditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.recoveryConditions = this._recoveryConditions?.internalValue;
    }
    if (this._triggerConditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.triggerConditions = this._triggerConditions?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._alarmSource = undefined;
      this._alarmSubtype = undefined;
      this._monitorType = undefined;
      this._alarmTags.internalValue = undefined;
      this._noDataConditions.internalValue = undefined;
      this._recoveryConditions.internalValue = undefined;
      this._triggerConditions.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._alarmSource = value.alarmSource;
      this._alarmSubtype = value.alarmSubtype;
      this._monitorType = value.monitorType;
      this._alarmTags.internalValue = value.alarmTags;
      this._noDataConditions.internalValue = value.noDataConditions;
      this._recoveryConditions.internalValue = value.recoveryConditions;
      this._triggerConditions.internalValue = value.triggerConditions;
    }
  }

  // alarm_source - computed: false, optional: true, required: false
  private _alarmSource?: string; 
  public get alarmSource() {
    return this.getStringAttribute('alarm_source');
  }
  public set alarmSource(value: string) {
    this._alarmSource = value;
  }
  public resetAlarmSource() {
    this._alarmSource = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmSourceInput() {
    return this._alarmSource;
  }

  // alarm_subtype - computed: false, optional: true, required: false
  private _alarmSubtype?: string; 
  public get alarmSubtype() {
    return this.getStringAttribute('alarm_subtype');
  }
  public set alarmSubtype(value: string) {
    this._alarmSubtype = value;
  }
  public resetAlarmSubtype() {
    this._alarmSubtype = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmSubtypeInput() {
    return this._alarmSubtype;
  }

  // monitor_type - computed: false, optional: true, required: false
  private _monitorType?: string; 
  public get monitorType() {
    return this.getStringAttribute('monitor_type');
  }
  public set monitorType(value: string) {
    this._monitorType = value;
  }
  public resetMonitorType() {
    this._monitorType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get monitorTypeInput() {
    return this._monitorType;
  }

  // alarm_tags - computed: false, optional: true, required: false
  private _alarmTags = new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsOutputReference(this, "alarm_tags");
  public get alarmTags() {
    return this._alarmTags;
  }
  public putAlarmTags(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags) {
    this._alarmTags.internalValue = value;
  }
  public resetAlarmTags() {
    this._alarmTags.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmTagsInput() {
    return this._alarmTags.internalValue;
  }

  // no_data_conditions - computed: false, optional: true, required: false
  private _noDataConditions = new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsOutputReference(this, "no_data_conditions");
  public get noDataConditions() {
    return this._noDataConditions;
  }
  public putNoDataConditions(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions) {
    this._noDataConditions.internalValue = value;
  }
  public resetNoDataConditions() {
    this._noDataConditions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get noDataConditionsInput() {
    return this._noDataConditions.internalValue;
  }

  // recovery_conditions - computed: false, optional: true, required: false
  private _recoveryConditions = new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsOutputReference(this, "recovery_conditions");
  public get recoveryConditions() {
    return this._recoveryConditions;
  }
  public putRecoveryConditions(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions) {
    this._recoveryConditions.internalValue = value;
  }
  public resetRecoveryConditions() {
    this._recoveryConditions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recoveryConditionsInput() {
    return this._recoveryConditions.internalValue;
  }

  // trigger_conditions - computed: false, optional: true, required: false
  private _triggerConditions = new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsList(this, "trigger_conditions", true);
  public get triggerConditions() {
    return this._triggerConditions;
  }
  public putTriggerConditions(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions[] | cdktf.IResolvable) {
    this._triggerConditions.internalValue = value;
  }
  public resetTriggerConditions() {
    this._triggerConditions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerConditionsInput() {
    return this._triggerConditions.internalValue;
  }
}
export interface AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItems {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_rule_description AomAlarmRulesTemplate#alarm_rule_description}
  */
  readonly alarmRuleDescription?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_rule_name AomAlarmRulesTemplate#alarm_rule_name}
  */
  readonly alarmRuleName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_rule_type AomAlarmRulesTemplate#alarm_rule_type}
  */
  readonly alarmRuleType: string;
  /**
  * event_alarm_spec block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#event_alarm_spec AomAlarmRulesTemplate#event_alarm_spec}
  */
  readonly eventAlarmSpec?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec;
  /**
  * metric_alarm_spec block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#metric_alarm_spec AomAlarmRulesTemplate#metric_alarm_spec}
  */
  readonly metricAlarmSpec?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec;
}

export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsToTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItems | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    alarm_rule_description: cdktf.stringToTerraform(struct!.alarmRuleDescription),
    alarm_rule_name: cdktf.stringToTerraform(struct!.alarmRuleName),
    alarm_rule_type: cdktf.stringToTerraform(struct!.alarmRuleType),
    event_alarm_spec: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecToTerraform(struct!.eventAlarmSpec),
    metric_alarm_spec: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecToTerraform(struct!.metricAlarmSpec),
  }
}


export function aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsToHclTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItems | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    alarm_rule_description: {
      value: cdktf.stringToHclTerraform(struct!.alarmRuleDescription),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    alarm_rule_name: {
      value: cdktf.stringToHclTerraform(struct!.alarmRuleName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    alarm_rule_type: {
      value: cdktf.stringToHclTerraform(struct!.alarmRuleType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    event_alarm_spec: {
      value: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecToHclTerraform(struct!.eventAlarmSpec),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecList",
    },
    metric_alarm_spec: {
      value: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecToHclTerraform(struct!.metricAlarmSpec),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItems | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._alarmRuleDescription !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmRuleDescription = this._alarmRuleDescription;
    }
    if (this._alarmRuleName !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmRuleName = this._alarmRuleName;
    }
    if (this._alarmRuleType !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmRuleType = this._alarmRuleType;
    }
    if (this._eventAlarmSpec?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.eventAlarmSpec = this._eventAlarmSpec?.internalValue;
    }
    if (this._metricAlarmSpec?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricAlarmSpec = this._metricAlarmSpec?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItems | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._alarmRuleDescription = undefined;
      this._alarmRuleName = undefined;
      this._alarmRuleType = undefined;
      this._eventAlarmSpec.internalValue = undefined;
      this._metricAlarmSpec.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._alarmRuleDescription = value.alarmRuleDescription;
      this._alarmRuleName = value.alarmRuleName;
      this._alarmRuleType = value.alarmRuleType;
      this._eventAlarmSpec.internalValue = value.eventAlarmSpec;
      this._metricAlarmSpec.internalValue = value.metricAlarmSpec;
    }
  }

  // alarm_rule_description - computed: false, optional: true, required: false
  private _alarmRuleDescription?: string; 
  public get alarmRuleDescription() {
    return this.getStringAttribute('alarm_rule_description');
  }
  public set alarmRuleDescription(value: string) {
    this._alarmRuleDescription = value;
  }
  public resetAlarmRuleDescription() {
    this._alarmRuleDescription = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmRuleDescriptionInput() {
    return this._alarmRuleDescription;
  }

  // alarm_rule_name - computed: false, optional: false, required: true
  private _alarmRuleName?: string; 
  public get alarmRuleName() {
    return this.getStringAttribute('alarm_rule_name');
  }
  public set alarmRuleName(value: string) {
    this._alarmRuleName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmRuleNameInput() {
    return this._alarmRuleName;
  }

  // alarm_rule_type - computed: false, optional: false, required: true
  private _alarmRuleType?: string; 
  public get alarmRuleType() {
    return this.getStringAttribute('alarm_rule_type');
  }
  public set alarmRuleType(value: string) {
    this._alarmRuleType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmRuleTypeInput() {
    return this._alarmRuleType;
  }

  // event_alarm_spec - computed: false, optional: true, required: false
  private _eventAlarmSpec = new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecOutputReference(this, "event_alarm_spec");
  public get eventAlarmSpec() {
    return this._eventAlarmSpec;
  }
  public putEventAlarmSpec(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec) {
    this._eventAlarmSpec.internalValue = value;
  }
  public resetEventAlarmSpec() {
    this._eventAlarmSpec.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eventAlarmSpecInput() {
    return this._eventAlarmSpec.internalValue;
  }

  // metric_alarm_spec - computed: false, optional: true, required: false
  private _metricAlarmSpec = new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecOutputReference(this, "metric_alarm_spec");
  public get metricAlarmSpec() {
    return this._metricAlarmSpec;
  }
  public putMetricAlarmSpec(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec) {
    this._metricAlarmSpec.internalValue = value;
  }
  public resetMetricAlarmSpec() {
    this._metricAlarmSpec.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricAlarmSpecInput() {
    return this._metricAlarmSpec.internalValue;
  }
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItems[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsOutputReference {
    return new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmRulesTemplateAlarmTemplateSpecListStruct {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#related_cce_clusters AomAlarmRulesTemplate#related_cce_clusters}
  */
  readonly relatedCceClusters?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#related_cloud_service AomAlarmRulesTemplate#related_cloud_service}
  */
  readonly relatedCloudService?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#related_prometheus_instances AomAlarmRulesTemplate#related_prometheus_instances}
  */
  readonly relatedPrometheusInstances?: string[];
  /**
  * alarm_notification block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_notification AomAlarmRulesTemplate#alarm_notification}
  */
  readonly alarmNotification?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotification;
  /**
  * alarm_template_spec_items block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#alarm_template_spec_items AomAlarmRulesTemplate#alarm_template_spec_items}
  */
  readonly alarmTemplateSpecItems?: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItems[] | cdktf.IResolvable;
}

export function aomAlarmRulesTemplateAlarmTemplateSpecListStructToTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    related_cce_clusters: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.relatedCceClusters),
    related_cloud_service: cdktf.stringToTerraform(struct!.relatedCloudService),
    related_prometheus_instances: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.relatedPrometheusInstances),
    alarm_notification: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotificationToTerraform(struct!.alarmNotification),
    alarm_template_spec_items: cdktf.listMapper(aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsToTerraform, true)(struct!.alarmTemplateSpecItems),
  }
}


export function aomAlarmRulesTemplateAlarmTemplateSpecListStructToHclTerraform(struct?: AomAlarmRulesTemplateAlarmTemplateSpecListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    related_cce_clusters: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.relatedCceClusters),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    related_cloud_service: {
      value: cdktf.stringToHclTerraform(struct!.relatedCloudService),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    related_prometheus_instances: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.relatedPrometheusInstances),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    alarm_notification: {
      value: aomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotificationToHclTerraform(struct!.alarmNotification),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotificationList",
    },
    alarm_template_spec_items: {
      value: cdktf.listMapperHcl(aomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsToHclTerraform, true)(struct!.alarmTemplateSpecItems),
      isBlock: true,
      type: "set",
      storageClassType: "AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmRulesTemplateAlarmTemplateSpecListStruct | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._relatedCceClusters !== undefined) {
      hasAnyValues = true;
      internalValueResult.relatedCceClusters = this._relatedCceClusters;
    }
    if (this._relatedCloudService !== undefined) {
      hasAnyValues = true;
      internalValueResult.relatedCloudService = this._relatedCloudService;
    }
    if (this._relatedPrometheusInstances !== undefined) {
      hasAnyValues = true;
      internalValueResult.relatedPrometheusInstances = this._relatedPrometheusInstances;
    }
    if (this._alarmNotification?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmNotification = this._alarmNotification?.internalValue;
    }
    if (this._alarmTemplateSpecItems?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmTemplateSpecItems = this._alarmTemplateSpecItems?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateAlarmTemplateSpecListStruct | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._relatedCceClusters = undefined;
      this._relatedCloudService = undefined;
      this._relatedPrometheusInstances = undefined;
      this._alarmNotification.internalValue = undefined;
      this._alarmTemplateSpecItems.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._relatedCceClusters = value.relatedCceClusters;
      this._relatedCloudService = value.relatedCloudService;
      this._relatedPrometheusInstances = value.relatedPrometheusInstances;
      this._alarmNotification.internalValue = value.alarmNotification;
      this._alarmTemplateSpecItems.internalValue = value.alarmTemplateSpecItems;
    }
  }

  // related_cce_clusters - computed: false, optional: true, required: false
  private _relatedCceClusters?: string[]; 
  public get relatedCceClusters() {
    return cdktf.Fn.tolist(this.getListAttribute('related_cce_clusters'));
  }
  public set relatedCceClusters(value: string[]) {
    this._relatedCceClusters = value;
  }
  public resetRelatedCceClusters() {
    this._relatedCceClusters = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedCceClustersInput() {
    return this._relatedCceClusters;
  }

  // related_cloud_service - computed: false, optional: true, required: false
  private _relatedCloudService?: string; 
  public get relatedCloudService() {
    return this.getStringAttribute('related_cloud_service');
  }
  public set relatedCloudService(value: string) {
    this._relatedCloudService = value;
  }
  public resetRelatedCloudService() {
    this._relatedCloudService = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedCloudServiceInput() {
    return this._relatedCloudService;
  }

  // related_prometheus_instances - computed: false, optional: true, required: false
  private _relatedPrometheusInstances?: string[]; 
  public get relatedPrometheusInstances() {
    return cdktf.Fn.tolist(this.getListAttribute('related_prometheus_instances'));
  }
  public set relatedPrometheusInstances(value: string[]) {
    this._relatedPrometheusInstances = value;
  }
  public resetRelatedPrometheusInstances() {
    this._relatedPrometheusInstances = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedPrometheusInstancesInput() {
    return this._relatedPrometheusInstances;
  }

  // alarm_notification - computed: false, optional: true, required: false
  private _alarmNotification = new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotificationOutputReference(this, "alarm_notification");
  public get alarmNotification() {
    return this._alarmNotification;
  }
  public putAlarmNotification(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmNotification) {
    this._alarmNotification.internalValue = value;
  }
  public resetAlarmNotification() {
    this._alarmNotification.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmNotificationInput() {
    return this._alarmNotification.internalValue;
  }

  // alarm_template_spec_items - computed: false, optional: true, required: false
  private _alarmTemplateSpecItems = new AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItemsList(this, "alarm_template_spec_items", true);
  public get alarmTemplateSpecItems() {
    return this._alarmTemplateSpecItems;
  }
  public putAlarmTemplateSpecItems(value: AomAlarmRulesTemplateAlarmTemplateSpecListAlarmTemplateSpecItems[] | cdktf.IResolvable) {
    this._alarmTemplateSpecItems.internalValue = value;
  }
  public resetAlarmTemplateSpecItems() {
    this._alarmTemplateSpecItems.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmTemplateSpecItemsInput() {
    return this._alarmTemplateSpecItems.internalValue;
  }
}

export class AomAlarmRulesTemplateAlarmTemplateSpecListStructList extends cdktf.ComplexList {
  public internalValue? : AomAlarmRulesTemplateAlarmTemplateSpecListStruct[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmRulesTemplateAlarmTemplateSpecListStructOutputReference {
    return new AomAlarmRulesTemplateAlarmTemplateSpecListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmRulesTemplateTemplatingListStruct {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#description AomAlarmRulesTemplate#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#name AomAlarmRulesTemplate#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#query AomAlarmRulesTemplate#query}
  */
  readonly query?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#type AomAlarmRulesTemplate#type}
  */
  readonly type?: string;
}

export function aomAlarmRulesTemplateTemplatingListStructToTerraform(struct?: AomAlarmRulesTemplateTemplatingListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    name: cdktf.stringToTerraform(struct!.name),
    query: cdktf.stringToTerraform(struct!.query),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function aomAlarmRulesTemplateTemplatingListStructToHclTerraform(struct?: AomAlarmRulesTemplateTemplatingListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
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
    query: {
      value: cdktf.stringToHclTerraform(struct!.query),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateTemplatingListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmRulesTemplateTemplatingListStruct | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._query !== undefined) {
      hasAnyValues = true;
      internalValueResult.query = this._query;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateTemplatingListStruct | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._name = undefined;
      this._query = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._description = value.description;
      this._name = value.name;
      this._query = value.query;
      this._type = value.type;
    }
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

  // query - computed: false, optional: true, required: false
  private _query?: string; 
  public get query() {
    return this.getStringAttribute('query');
  }
  public set query(value: string) {
    this._query = value;
  }
  public resetQuery() {
    this._query = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queryInput() {
    return this._query;
  }

  // type - computed: false, optional: true, required: false
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
}

export class AomAlarmRulesTemplateTemplatingListStructList extends cdktf.ComplexList {
  public internalValue? : AomAlarmRulesTemplateTemplatingListStruct[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmRulesTemplateTemplatingListStructOutputReference {
    return new AomAlarmRulesTemplateTemplatingListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmRulesTemplateTemplating {
  /**
  * list block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#list AomAlarmRulesTemplate#list}
  */
  readonly list: AomAlarmRulesTemplateTemplatingListStruct[] | cdktf.IResolvable;
}

export function aomAlarmRulesTemplateTemplatingToTerraform(struct?: AomAlarmRulesTemplateTemplatingOutputReference | AomAlarmRulesTemplateTemplating): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    list: cdktf.listMapper(aomAlarmRulesTemplateTemplatingListStructToTerraform, true)(struct!.list),
  }
}


export function aomAlarmRulesTemplateTemplatingToHclTerraform(struct?: AomAlarmRulesTemplateTemplatingOutputReference | AomAlarmRulesTemplateTemplating): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    list: {
      value: cdktf.listMapperHcl(aomAlarmRulesTemplateTemplatingListStructToHclTerraform, true)(struct!.list),
      isBlock: true,
      type: "set",
      storageClassType: "AomAlarmRulesTemplateTemplatingListStructList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmRulesTemplateTemplatingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AomAlarmRulesTemplateTemplating | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._list?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.list = this._list?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmRulesTemplateTemplating | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._list.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._list.internalValue = value.list;
    }
  }

  // list - computed: false, optional: false, required: true
  private _list = new AomAlarmRulesTemplateTemplatingListStructList(this, "list", true);
  public get list() {
    return this._list;
  }
  public putList(value: AomAlarmRulesTemplateTemplatingListStruct[] | cdktf.IResolvable) {
    this._list.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get listInput() {
    return this._list.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template huaweicloud_aom_alarm_rules_template}
*/
export class AomAlarmRulesTemplate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_alarm_rules_template";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AomAlarmRulesTemplate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AomAlarmRulesTemplate to import
  * @param importFromId The id of the existing AomAlarmRulesTemplate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AomAlarmRulesTemplate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_alarm_rules_template", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_rules_template huaweicloud_aom_alarm_rules_template} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AomAlarmRulesTemplateConfig
  */
  public constructor(scope: Construct, id: string, config: AomAlarmRulesTemplateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_alarm_rules_template',
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
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._type = config.type;
    this._alarmTemplateSpecList.internalValue = config.alarmTemplateSpecList;
    this._templating.internalValue = config.templating;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // enterprise_project_id - computed: true, optional: true, required: false
  private _enterpriseProjectId?: string; 
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }
  public set enterpriseProjectId(value: string) {
    this._enterpriseProjectId = value;
  }
  public resetEnterpriseProjectId() {
    this._enterpriseProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseProjectIdInput() {
    return this._enterpriseProjectId;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // alarm_template_spec_list - computed: false, optional: false, required: true
  private _alarmTemplateSpecList = new AomAlarmRulesTemplateAlarmTemplateSpecListStructList(this, "alarm_template_spec_list", false);
  public get alarmTemplateSpecList() {
    return this._alarmTemplateSpecList;
  }
  public putAlarmTemplateSpecList(value: AomAlarmRulesTemplateAlarmTemplateSpecListStruct[] | cdktf.IResolvable) {
    this._alarmTemplateSpecList.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmTemplateSpecListInput() {
    return this._alarmTemplateSpecList.internalValue;
  }

  // templating - computed: false, optional: true, required: false
  private _templating = new AomAlarmRulesTemplateTemplatingOutputReference(this, "templating");
  public get templating() {
    return this._templating;
  }
  public putTemplating(value: AomAlarmRulesTemplateTemplating) {
    this._templating.internalValue = value;
  }
  public resetTemplating() {
    this._templating.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templatingInput() {
    return this._templating.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.stringToTerraform(this._type),
      alarm_template_spec_list: cdktf.listMapper(aomAlarmRulesTemplateAlarmTemplateSpecListStructToTerraform, true)(this._alarmTemplateSpecList.internalValue),
      templating: aomAlarmRulesTemplateTemplatingToTerraform(this._templating.internalValue),
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
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
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
      alarm_template_spec_list: {
        value: cdktf.listMapperHcl(aomAlarmRulesTemplateAlarmTemplateSpecListStructToHclTerraform, true)(this._alarmTemplateSpecList.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AomAlarmRulesTemplateAlarmTemplateSpecListStructList",
      },
      templating: {
        value: aomAlarmRulesTemplateTemplatingToHclTerraform(this._templating.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AomAlarmRulesTemplateTemplatingList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AomAlarmPolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#alarm_rule_description AomAlarmPolicy#alarm_rule_description}
  */
  readonly alarmRuleDescription?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#alarm_rule_enable AomAlarmPolicy#alarm_rule_enable}
  */
  readonly alarmRuleEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#alarm_rule_name AomAlarmPolicy#alarm_rule_name}
  */
  readonly alarmRuleName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#alarm_rule_status AomAlarmPolicy#alarm_rule_status}
  */
  readonly alarmRuleStatus?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#alarm_rule_type AomAlarmPolicy#alarm_rule_type}
  */
  readonly alarmRuleType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#id AomAlarmPolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#region AomAlarmPolicy#region}
  */
  readonly region?: string;
  /**
  * alarm_notifications block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#alarm_notifications AomAlarmPolicy#alarm_notifications}
  */
  readonly alarmNotifications?: AomAlarmPolicyAlarmNotifications[] | cdktf.IResolvable;
  /**
  * event_alarm_spec block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#event_alarm_spec AomAlarmPolicy#event_alarm_spec}
  */
  readonly eventAlarmSpec?: AomAlarmPolicyEventAlarmSpec[] | cdktf.IResolvable;
  /**
  * metric_alarm_spec block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#metric_alarm_spec AomAlarmPolicy#metric_alarm_spec}
  */
  readonly metricAlarmSpec?: AomAlarmPolicyMetricAlarmSpec[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#timeouts AomAlarmPolicy#timeouts}
  */
  readonly timeouts?: AomAlarmPolicyTimeouts;
}
export interface AomAlarmPolicyAlarmNotifications {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#bind_notification_rule_id AomAlarmPolicy#bind_notification_rule_id}
  */
  readonly bindNotificationRuleId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#inhibit_enable AomAlarmPolicy#inhibit_enable}
  */
  readonly inhibitEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#inhibit_rule AomAlarmPolicy#inhibit_rule}
  */
  readonly inhibitRule?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#notification_enable AomAlarmPolicy#notification_enable}
  */
  readonly notificationEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#notification_type AomAlarmPolicy#notification_type}
  */
  readonly notificationType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#notify_resolved AomAlarmPolicy#notify_resolved}
  */
  readonly notifyResolved?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#route_group_enable AomAlarmPolicy#route_group_enable}
  */
  readonly routeGroupEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#route_group_rule AomAlarmPolicy#route_group_rule}
  */
  readonly routeGroupRule?: string;
}

export function aomAlarmPolicyAlarmNotificationsToTerraform(struct?: AomAlarmPolicyAlarmNotifications | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bind_notification_rule_id: cdktf.stringToTerraform(struct!.bindNotificationRuleId),
    inhibit_enable: cdktf.booleanToTerraform(struct!.inhibitEnable),
    inhibit_rule: cdktf.stringToTerraform(struct!.inhibitRule),
    notification_enable: cdktf.booleanToTerraform(struct!.notificationEnable),
    notification_type: cdktf.stringToTerraform(struct!.notificationType),
    notify_resolved: cdktf.booleanToTerraform(struct!.notifyResolved),
    route_group_enable: cdktf.booleanToTerraform(struct!.routeGroupEnable),
    route_group_rule: cdktf.stringToTerraform(struct!.routeGroupRule),
  }
}


export function aomAlarmPolicyAlarmNotificationsToHclTerraform(struct?: AomAlarmPolicyAlarmNotifications | cdktf.IResolvable): any {
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
    inhibit_enable: {
      value: cdktf.booleanToHclTerraform(struct!.inhibitEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    inhibit_rule: {
      value: cdktf.stringToHclTerraform(struct!.inhibitRule),
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
    notify_resolved: {
      value: cdktf.booleanToHclTerraform(struct!.notifyResolved),
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

export class AomAlarmPolicyAlarmNotificationsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmPolicyAlarmNotifications | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bindNotificationRuleId !== undefined) {
      hasAnyValues = true;
      internalValueResult.bindNotificationRuleId = this._bindNotificationRuleId;
    }
    if (this._inhibitEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.inhibitEnable = this._inhibitEnable;
    }
    if (this._inhibitRule !== undefined) {
      hasAnyValues = true;
      internalValueResult.inhibitRule = this._inhibitRule;
    }
    if (this._notificationEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.notificationEnable = this._notificationEnable;
    }
    if (this._notificationType !== undefined) {
      hasAnyValues = true;
      internalValueResult.notificationType = this._notificationType;
    }
    if (this._notifyResolved !== undefined) {
      hasAnyValues = true;
      internalValueResult.notifyResolved = this._notifyResolved;
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

  public set internalValue(value: AomAlarmPolicyAlarmNotifications | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._bindNotificationRuleId = undefined;
      this._inhibitEnable = undefined;
      this._inhibitRule = undefined;
      this._notificationEnable = undefined;
      this._notificationType = undefined;
      this._notifyResolved = undefined;
      this._routeGroupEnable = undefined;
      this._routeGroupRule = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._bindNotificationRuleId = value.bindNotificationRuleId;
      this._inhibitEnable = value.inhibitEnable;
      this._inhibitRule = value.inhibitRule;
      this._notificationEnable = value.notificationEnable;
      this._notificationType = value.notificationType;
      this._notifyResolved = value.notifyResolved;
      this._routeGroupEnable = value.routeGroupEnable;
      this._routeGroupRule = value.routeGroupRule;
    }
  }

  // bind_notification_rule_id - computed: true, optional: true, required: false
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

  // inhibit_enable - computed: true, optional: true, required: false
  private _inhibitEnable?: boolean | cdktf.IResolvable; 
  public get inhibitEnable() {
    return this.getBooleanAttribute('inhibit_enable');
  }
  public set inhibitEnable(value: boolean | cdktf.IResolvable) {
    this._inhibitEnable = value;
  }
  public resetInhibitEnable() {
    this._inhibitEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inhibitEnableInput() {
    return this._inhibitEnable;
  }

  // inhibit_rule - computed: true, optional: true, required: false
  private _inhibitRule?: string; 
  public get inhibitRule() {
    return this.getStringAttribute('inhibit_rule');
  }
  public set inhibitRule(value: string) {
    this._inhibitRule = value;
  }
  public resetInhibitRule() {
    this._inhibitRule = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inhibitRuleInput() {
    return this._inhibitRule;
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

  // notification_type - computed: true, optional: true, required: false
  private _notificationType?: string; 
  public get notificationType() {
    return this.getStringAttribute('notification_type');
  }
  public set notificationType(value: string) {
    this._notificationType = value;
  }
  public resetNotificationType() {
    this._notificationType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationTypeInput() {
    return this._notificationType;
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

  // route_group_rule - computed: true, optional: true, required: false
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

export class AomAlarmPolicyAlarmNotificationsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmPolicyAlarmNotifications[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmPolicyAlarmNotificationsOutputReference {
    return new AomAlarmPolicyAlarmNotificationsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmPolicyEventAlarmSpecAlarmTags {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#auto_tags AomAlarmPolicy#auto_tags}
  */
  readonly autoTags?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#custom_annotations AomAlarmPolicy#custom_annotations}
  */
  readonly customAnnotations?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#custom_tags AomAlarmPolicy#custom_tags}
  */
  readonly customTags?: string[];
}

export function aomAlarmPolicyEventAlarmSpecAlarmTagsToTerraform(struct?: AomAlarmPolicyEventAlarmSpecAlarmTags | cdktf.IResolvable): any {
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


export function aomAlarmPolicyEventAlarmSpecAlarmTagsToHclTerraform(struct?: AomAlarmPolicyEventAlarmSpecAlarmTags | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    auto_tags: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.autoTags),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    custom_annotations: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.customAnnotations),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    custom_tags: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.customTags),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmPolicyEventAlarmSpecAlarmTagsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmPolicyEventAlarmSpecAlarmTags | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
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

  public set internalValue(value: AomAlarmPolicyEventAlarmSpecAlarmTags | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._autoTags = undefined;
      this._customAnnotations = undefined;
      this._customTags = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._autoTags = value.autoTags;
      this._customAnnotations = value.customAnnotations;
      this._customTags = value.customTags;
    }
  }

  // auto_tags - computed: true, optional: true, required: false
  private _autoTags?: string[]; 
  public get autoTags() {
    return this.getListAttribute('auto_tags');
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

  // custom_annotations - computed: true, optional: true, required: false
  private _customAnnotations?: string[]; 
  public get customAnnotations() {
    return this.getListAttribute('custom_annotations');
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

  // custom_tags - computed: true, optional: true, required: false
  private _customTags?: string[]; 
  public get customTags() {
    return this.getListAttribute('custom_tags');
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

export class AomAlarmPolicyEventAlarmSpecAlarmTagsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmPolicyEventAlarmSpecAlarmTags[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmPolicyEventAlarmSpecAlarmTagsOutputReference {
    return new AomAlarmPolicyEventAlarmSpecAlarmTagsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmPolicyEventAlarmSpecNoDataConditions {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#no_data_alert_state AomAlarmPolicy#no_data_alert_state}
  */
  readonly noDataAlertState?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#no_data_timeframe AomAlarmPolicy#no_data_timeframe}
  */
  readonly noDataTimeframe?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#notify_no_data AomAlarmPolicy#notify_no_data}
  */
  readonly notifyNoData?: boolean | cdktf.IResolvable;
}

export function aomAlarmPolicyEventAlarmSpecNoDataConditionsToTerraform(struct?: AomAlarmPolicyEventAlarmSpecNoDataConditions | cdktf.IResolvable): any {
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


export function aomAlarmPolicyEventAlarmSpecNoDataConditionsToHclTerraform(struct?: AomAlarmPolicyEventAlarmSpecNoDataConditions | cdktf.IResolvable): any {
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

export class AomAlarmPolicyEventAlarmSpecNoDataConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmPolicyEventAlarmSpecNoDataConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
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

  public set internalValue(value: AomAlarmPolicyEventAlarmSpecNoDataConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._noDataAlertState = undefined;
      this._noDataTimeframe = undefined;
      this._notifyNoData = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._noDataAlertState = value.noDataAlertState;
      this._noDataTimeframe = value.noDataTimeframe;
      this._notifyNoData = value.notifyNoData;
    }
  }

  // no_data_alert_state - computed: true, optional: true, required: false
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

  // no_data_timeframe - computed: true, optional: true, required: false
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

  // notify_no_data - computed: true, optional: true, required: false
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

export class AomAlarmPolicyEventAlarmSpecNoDataConditionsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmPolicyEventAlarmSpecNoDataConditions[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmPolicyEventAlarmSpecNoDataConditionsOutputReference {
    return new AomAlarmPolicyEventAlarmSpecNoDataConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmPolicyEventAlarmSpec {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#event_source AomAlarmPolicy#event_source}
  */
  readonly eventSource?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#monitor_objects AomAlarmPolicy#monitor_objects}
  */
  readonly monitorObjects?: { [key: string]: string }[] | cdktf.IResolvable;
  /**
  * alarm_tags block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#alarm_tags AomAlarmPolicy#alarm_tags}
  */
  readonly alarmTags?: AomAlarmPolicyEventAlarmSpecAlarmTags[] | cdktf.IResolvable;
  /**
  * no_data_conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#no_data_conditions AomAlarmPolicy#no_data_conditions}
  */
  readonly noDataConditions?: AomAlarmPolicyEventAlarmSpecNoDataConditions[] | cdktf.IResolvable;
}

export function aomAlarmPolicyEventAlarmSpecToTerraform(struct?: AomAlarmPolicyEventAlarmSpec | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    event_source: cdktf.stringToTerraform(struct!.eventSource),
    monitor_objects: cdktf.listMapper(cdktf.hashMapper(cdktf.stringToTerraform), false)(struct!.monitorObjects),
    alarm_tags: cdktf.listMapper(aomAlarmPolicyEventAlarmSpecAlarmTagsToTerraform, true)(struct!.alarmTags),
    no_data_conditions: cdktf.listMapper(aomAlarmPolicyEventAlarmSpecNoDataConditionsToTerraform, true)(struct!.noDataConditions),
  }
}


export function aomAlarmPolicyEventAlarmSpecToHclTerraform(struct?: AomAlarmPolicyEventAlarmSpec | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    event_source: {
      value: cdktf.stringToHclTerraform(struct!.eventSource),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    monitor_objects: {
      value: cdktf.listMapperHcl(cdktf.hashMapperHcl(cdktf.stringToHclTerraform), false)(struct!.monitorObjects),
      isBlock: false,
      type: "list",
      storageClassType: "stringMapList",
    },
    alarm_tags: {
      value: cdktf.listMapperHcl(aomAlarmPolicyEventAlarmSpecAlarmTagsToHclTerraform, true)(struct!.alarmTags),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmPolicyEventAlarmSpecAlarmTagsList",
    },
    no_data_conditions: {
      value: cdktf.listMapperHcl(aomAlarmPolicyEventAlarmSpecNoDataConditionsToHclTerraform, true)(struct!.noDataConditions),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmPolicyEventAlarmSpecNoDataConditionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmPolicyEventAlarmSpecOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmPolicyEventAlarmSpec | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._eventSource !== undefined) {
      hasAnyValues = true;
      internalValueResult.eventSource = this._eventSource;
    }
    if (this._monitorObjects !== undefined) {
      hasAnyValues = true;
      internalValueResult.monitorObjects = this._monitorObjects;
    }
    if (this._alarmTags?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmTags = this._alarmTags?.internalValue;
    }
    if (this._noDataConditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.noDataConditions = this._noDataConditions?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmPolicyEventAlarmSpec | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._eventSource = undefined;
      this._monitorObjects = undefined;
      this._alarmTags.internalValue = undefined;
      this._noDataConditions.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._eventSource = value.eventSource;
      this._monitorObjects = value.monitorObjects;
      this._alarmTags.internalValue = value.alarmTags;
      this._noDataConditions.internalValue = value.noDataConditions;
    }
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

  // monitor_objects - computed: true, optional: true, required: false
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

  // alarm_tags - computed: false, optional: true, required: false
  private _alarmTags = new AomAlarmPolicyEventAlarmSpecAlarmTagsList(this, "alarm_tags", false);
  public get alarmTags() {
    return this._alarmTags;
  }
  public putAlarmTags(value: AomAlarmPolicyEventAlarmSpecAlarmTags[] | cdktf.IResolvable) {
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
  private _noDataConditions = new AomAlarmPolicyEventAlarmSpecNoDataConditionsList(this, "no_data_conditions", false);
  public get noDataConditions() {
    return this._noDataConditions;
  }
  public putNoDataConditions(value: AomAlarmPolicyEventAlarmSpecNoDataConditions[] | cdktf.IResolvable) {
    this._noDataConditions.internalValue = value;
  }
  public resetNoDataConditions() {
    this._noDataConditions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get noDataConditionsInput() {
    return this._noDataConditions.internalValue;
  }
}

export class AomAlarmPolicyEventAlarmSpecList extends cdktf.ComplexList {
  public internalValue? : AomAlarmPolicyEventAlarmSpec[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmPolicyEventAlarmSpecOutputReference {
    return new AomAlarmPolicyEventAlarmSpecOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmPolicyMetricAlarmSpecAlarmTags {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#auto_tags AomAlarmPolicy#auto_tags}
  */
  readonly autoTags?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#custom_annotations AomAlarmPolicy#custom_annotations}
  */
  readonly customAnnotations?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#custom_tags AomAlarmPolicy#custom_tags}
  */
  readonly customTags?: string[];
}

export function aomAlarmPolicyMetricAlarmSpecAlarmTagsToTerraform(struct?: AomAlarmPolicyMetricAlarmSpecAlarmTags | cdktf.IResolvable): any {
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


export function aomAlarmPolicyMetricAlarmSpecAlarmTagsToHclTerraform(struct?: AomAlarmPolicyMetricAlarmSpecAlarmTags | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    auto_tags: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.autoTags),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    custom_annotations: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.customAnnotations),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    custom_tags: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.customTags),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmPolicyMetricAlarmSpecAlarmTagsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmPolicyMetricAlarmSpecAlarmTags | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
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

  public set internalValue(value: AomAlarmPolicyMetricAlarmSpecAlarmTags | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._autoTags = undefined;
      this._customAnnotations = undefined;
      this._customTags = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._autoTags = value.autoTags;
      this._customAnnotations = value.customAnnotations;
      this._customTags = value.customTags;
    }
  }

  // auto_tags - computed: true, optional: true, required: false
  private _autoTags?: string[]; 
  public get autoTags() {
    return this.getListAttribute('auto_tags');
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

  // custom_annotations - computed: true, optional: true, required: false
  private _customAnnotations?: string[]; 
  public get customAnnotations() {
    return this.getListAttribute('custom_annotations');
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

  // custom_tags - computed: true, optional: true, required: false
  private _customTags?: string[]; 
  public get customTags() {
    return this.getListAttribute('custom_tags');
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

export class AomAlarmPolicyMetricAlarmSpecAlarmTagsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmPolicyMetricAlarmSpecAlarmTags[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmPolicyMetricAlarmSpecAlarmTagsOutputReference {
    return new AomAlarmPolicyMetricAlarmSpecAlarmTagsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmPolicyMetricAlarmSpecNoDataConditions {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#no_data_alert_state AomAlarmPolicy#no_data_alert_state}
  */
  readonly noDataAlertState?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#no_data_timeframe AomAlarmPolicy#no_data_timeframe}
  */
  readonly noDataTimeframe?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#notify_no_data AomAlarmPolicy#notify_no_data}
  */
  readonly notifyNoData?: boolean | cdktf.IResolvable;
}

export function aomAlarmPolicyMetricAlarmSpecNoDataConditionsToTerraform(struct?: AomAlarmPolicyMetricAlarmSpecNoDataConditions | cdktf.IResolvable): any {
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


export function aomAlarmPolicyMetricAlarmSpecNoDataConditionsToHclTerraform(struct?: AomAlarmPolicyMetricAlarmSpecNoDataConditions | cdktf.IResolvable): any {
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

export class AomAlarmPolicyMetricAlarmSpecNoDataConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmPolicyMetricAlarmSpecNoDataConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
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

  public set internalValue(value: AomAlarmPolicyMetricAlarmSpecNoDataConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._noDataAlertState = undefined;
      this._noDataTimeframe = undefined;
      this._notifyNoData = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._noDataAlertState = value.noDataAlertState;
      this._noDataTimeframe = value.noDataTimeframe;
      this._notifyNoData = value.notifyNoData;
    }
  }

  // no_data_alert_state - computed: true, optional: true, required: false
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

  // no_data_timeframe - computed: true, optional: true, required: false
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

  // notify_no_data - computed: true, optional: true, required: false
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

export class AomAlarmPolicyMetricAlarmSpecNoDataConditionsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmPolicyMetricAlarmSpecNoDataConditions[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmPolicyMetricAlarmSpecNoDataConditionsOutputReference {
    return new AomAlarmPolicyMetricAlarmSpecNoDataConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmPolicyMetricAlarmSpecTriggerConditions {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#aggregation_type AomAlarmPolicy#aggregation_type}
  */
  readonly aggregationType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#aggregation_window AomAlarmPolicy#aggregation_window}
  */
  readonly aggregationWindow?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#metric_labels AomAlarmPolicy#metric_labels}
  */
  readonly metricLabels?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#metric_name AomAlarmPolicy#metric_name}
  */
  readonly metricName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#metric_namespace AomAlarmPolicy#metric_namespace}
  */
  readonly metricNamespace?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#metric_query_mode AomAlarmPolicy#metric_query_mode}
  */
  readonly metricQueryMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#metric_unit AomAlarmPolicy#metric_unit}
  */
  readonly metricUnit?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#operator AomAlarmPolicy#operator}
  */
  readonly operator?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#promql AomAlarmPolicy#promql}
  */
  readonly promql?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#thresholds AomAlarmPolicy#thresholds}
  */
  readonly thresholds?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#trigger_interval AomAlarmPolicy#trigger_interval}
  */
  readonly triggerInterval?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#trigger_times AomAlarmPolicy#trigger_times}
  */
  readonly triggerTimes?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#trigger_type AomAlarmPolicy#trigger_type}
  */
  readonly triggerType?: string;
}

export function aomAlarmPolicyMetricAlarmSpecTriggerConditionsToTerraform(struct?: AomAlarmPolicyMetricAlarmSpecTriggerConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    aggregation_type: cdktf.stringToTerraform(struct!.aggregationType),
    aggregation_window: cdktf.stringToTerraform(struct!.aggregationWindow),
    metric_labels: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.metricLabels),
    metric_name: cdktf.stringToTerraform(struct!.metricName),
    metric_namespace: cdktf.stringToTerraform(struct!.metricNamespace),
    metric_query_mode: cdktf.stringToTerraform(struct!.metricQueryMode),
    metric_unit: cdktf.stringToTerraform(struct!.metricUnit),
    operator: cdktf.stringToTerraform(struct!.operator),
    promql: cdktf.stringToTerraform(struct!.promql),
    thresholds: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.thresholds),
    trigger_interval: cdktf.stringToTerraform(struct!.triggerInterval),
    trigger_times: cdktf.numberToTerraform(struct!.triggerTimes),
    trigger_type: cdktf.stringToTerraform(struct!.triggerType),
  }
}


export function aomAlarmPolicyMetricAlarmSpecTriggerConditionsToHclTerraform(struct?: AomAlarmPolicyMetricAlarmSpecTriggerConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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
    metric_labels: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.metricLabels),
      isBlock: false,
      type: "list",
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
    metric_unit: {
      value: cdktf.stringToHclTerraform(struct!.metricUnit),
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
      value: cdktf.numberToHclTerraform(struct!.triggerTimes),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
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

export class AomAlarmPolicyMetricAlarmSpecTriggerConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmPolicyMetricAlarmSpecTriggerConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._aggregationType !== undefined) {
      hasAnyValues = true;
      internalValueResult.aggregationType = this._aggregationType;
    }
    if (this._aggregationWindow !== undefined) {
      hasAnyValues = true;
      internalValueResult.aggregationWindow = this._aggregationWindow;
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
    if (this._metricUnit !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricUnit = this._metricUnit;
    }
    if (this._operator !== undefined) {
      hasAnyValues = true;
      internalValueResult.operator = this._operator;
    }
    if (this._promql !== undefined) {
      hasAnyValues = true;
      internalValueResult.promql = this._promql;
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

  public set internalValue(value: AomAlarmPolicyMetricAlarmSpecTriggerConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._aggregationType = undefined;
      this._aggregationWindow = undefined;
      this._metricLabels = undefined;
      this._metricName = undefined;
      this._metricNamespace = undefined;
      this._metricQueryMode = undefined;
      this._metricUnit = undefined;
      this._operator = undefined;
      this._promql = undefined;
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
      this._aggregationType = value.aggregationType;
      this._aggregationWindow = value.aggregationWindow;
      this._metricLabels = value.metricLabels;
      this._metricName = value.metricName;
      this._metricNamespace = value.metricNamespace;
      this._metricQueryMode = value.metricQueryMode;
      this._metricUnit = value.metricUnit;
      this._operator = value.operator;
      this._promql = value.promql;
      this._thresholds = value.thresholds;
      this._triggerInterval = value.triggerInterval;
      this._triggerTimes = value.triggerTimes;
      this._triggerType = value.triggerType;
    }
  }

  // aggregation_type - computed: true, optional: true, required: false
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

  // aggregation_window - computed: true, optional: true, required: false
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

  // metric_labels - computed: true, optional: true, required: false
  private _metricLabels?: string[]; 
  public get metricLabels() {
    return this.getListAttribute('metric_labels');
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

  // metric_name - computed: true, optional: true, required: false
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

  // metric_namespace - computed: true, optional: true, required: false
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

  // metric_query_mode - computed: true, optional: true, required: false
  private _metricQueryMode?: string; 
  public get metricQueryMode() {
    return this.getStringAttribute('metric_query_mode');
  }
  public set metricQueryMode(value: string) {
    this._metricQueryMode = value;
  }
  public resetMetricQueryMode() {
    this._metricQueryMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricQueryModeInput() {
    return this._metricQueryMode;
  }

  // metric_unit - computed: true, optional: true, required: false
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

  // operator - computed: true, optional: true, required: false
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

  // promql - computed: true, optional: true, required: false
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

  // thresholds - computed: true, optional: true, required: false
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

  // trigger_interval - computed: true, optional: true, required: false
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

  // trigger_times - computed: true, optional: true, required: false
  private _triggerTimes?: number; 
  public get triggerTimes() {
    return this.getNumberAttribute('trigger_times');
  }
  public set triggerTimes(value: number) {
    this._triggerTimes = value;
  }
  public resetTriggerTimes() {
    this._triggerTimes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerTimesInput() {
    return this._triggerTimes;
  }

  // trigger_type - computed: true, optional: true, required: false
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

export class AomAlarmPolicyMetricAlarmSpecTriggerConditionsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmPolicyMetricAlarmSpecTriggerConditions[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmPolicyMetricAlarmSpecTriggerConditionsOutputReference {
    return new AomAlarmPolicyMetricAlarmSpecTriggerConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmPolicyMetricAlarmSpec {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#alarm_rule_template_bind_enable AomAlarmPolicy#alarm_rule_template_bind_enable}
  */
  readonly alarmRuleTemplateBindEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#alarm_rule_template_id AomAlarmPolicy#alarm_rule_template_id}
  */
  readonly alarmRuleTemplateId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#metric_kind AomAlarmPolicy#metric_kind}
  */
  readonly metricKind?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#monitor_objects AomAlarmPolicy#monitor_objects}
  */
  readonly monitorObjects?: { [key: string]: string }[] | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#monitor_type AomAlarmPolicy#monitor_type}
  */
  readonly monitorType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#recovery_conditions AomAlarmPolicy#recovery_conditions}
  */
  readonly recoveryConditions?: { [key: string]: number };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#resource_kind AomAlarmPolicy#resource_kind}
  */
  readonly resourceKind?: string;
  /**
  * alarm_tags block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#alarm_tags AomAlarmPolicy#alarm_tags}
  */
  readonly alarmTags?: AomAlarmPolicyMetricAlarmSpecAlarmTags[] | cdktf.IResolvable;
  /**
  * no_data_conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#no_data_conditions AomAlarmPolicy#no_data_conditions}
  */
  readonly noDataConditions?: AomAlarmPolicyMetricAlarmSpecNoDataConditions[] | cdktf.IResolvable;
  /**
  * trigger_conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#trigger_conditions AomAlarmPolicy#trigger_conditions}
  */
  readonly triggerConditions?: AomAlarmPolicyMetricAlarmSpecTriggerConditions[] | cdktf.IResolvable;
}

export function aomAlarmPolicyMetricAlarmSpecToTerraform(struct?: AomAlarmPolicyMetricAlarmSpec | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    alarm_rule_template_bind_enable: cdktf.booleanToTerraform(struct!.alarmRuleTemplateBindEnable),
    alarm_rule_template_id: cdktf.stringToTerraform(struct!.alarmRuleTemplateId),
    metric_kind: cdktf.stringToTerraform(struct!.metricKind),
    monitor_objects: cdktf.listMapper(cdktf.hashMapper(cdktf.stringToTerraform), false)(struct!.monitorObjects),
    monitor_type: cdktf.stringToTerraform(struct!.monitorType),
    recovery_conditions: cdktf.hashMapper(cdktf.numberToTerraform)(struct!.recoveryConditions),
    resource_kind: cdktf.stringToTerraform(struct!.resourceKind),
    alarm_tags: cdktf.listMapper(aomAlarmPolicyMetricAlarmSpecAlarmTagsToTerraform, true)(struct!.alarmTags),
    no_data_conditions: cdktf.listMapper(aomAlarmPolicyMetricAlarmSpecNoDataConditionsToTerraform, true)(struct!.noDataConditions),
    trigger_conditions: cdktf.listMapper(aomAlarmPolicyMetricAlarmSpecTriggerConditionsToTerraform, true)(struct!.triggerConditions),
  }
}


export function aomAlarmPolicyMetricAlarmSpecToHclTerraform(struct?: AomAlarmPolicyMetricAlarmSpec | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    alarm_rule_template_bind_enable: {
      value: cdktf.booleanToHclTerraform(struct!.alarmRuleTemplateBindEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    alarm_rule_template_id: {
      value: cdktf.stringToHclTerraform(struct!.alarmRuleTemplateId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    metric_kind: {
      value: cdktf.stringToHclTerraform(struct!.metricKind),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    monitor_objects: {
      value: cdktf.listMapperHcl(cdktf.hashMapperHcl(cdktf.stringToHclTerraform), false)(struct!.monitorObjects),
      isBlock: false,
      type: "list",
      storageClassType: "stringMapList",
    },
    monitor_type: {
      value: cdktf.stringToHclTerraform(struct!.monitorType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    recovery_conditions: {
      value: cdktf.hashMapperHcl(cdktf.numberToHclTerraform)(struct!.recoveryConditions),
      isBlock: false,
      type: "map",
      storageClassType: "numberMap",
    },
    resource_kind: {
      value: cdktf.stringToHclTerraform(struct!.resourceKind),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    alarm_tags: {
      value: cdktf.listMapperHcl(aomAlarmPolicyMetricAlarmSpecAlarmTagsToHclTerraform, true)(struct!.alarmTags),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmPolicyMetricAlarmSpecAlarmTagsList",
    },
    no_data_conditions: {
      value: cdktf.listMapperHcl(aomAlarmPolicyMetricAlarmSpecNoDataConditionsToHclTerraform, true)(struct!.noDataConditions),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmPolicyMetricAlarmSpecNoDataConditionsList",
    },
    trigger_conditions: {
      value: cdktf.listMapperHcl(aomAlarmPolicyMetricAlarmSpecTriggerConditionsToHclTerraform, true)(struct!.triggerConditions),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmPolicyMetricAlarmSpecTriggerConditionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmPolicyMetricAlarmSpecOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmPolicyMetricAlarmSpec | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._alarmRuleTemplateBindEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmRuleTemplateBindEnable = this._alarmRuleTemplateBindEnable;
    }
    if (this._alarmRuleTemplateId !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmRuleTemplateId = this._alarmRuleTemplateId;
    }
    if (this._metricKind !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricKind = this._metricKind;
    }
    if (this._monitorObjects !== undefined) {
      hasAnyValues = true;
      internalValueResult.monitorObjects = this._monitorObjects;
    }
    if (this._monitorType !== undefined) {
      hasAnyValues = true;
      internalValueResult.monitorType = this._monitorType;
    }
    if (this._recoveryConditions !== undefined) {
      hasAnyValues = true;
      internalValueResult.recoveryConditions = this._recoveryConditions;
    }
    if (this._resourceKind !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceKind = this._resourceKind;
    }
    if (this._alarmTags?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.alarmTags = this._alarmTags?.internalValue;
    }
    if (this._noDataConditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.noDataConditions = this._noDataConditions?.internalValue;
    }
    if (this._triggerConditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.triggerConditions = this._triggerConditions?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmPolicyMetricAlarmSpec | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._alarmRuleTemplateBindEnable = undefined;
      this._alarmRuleTemplateId = undefined;
      this._metricKind = undefined;
      this._monitorObjects = undefined;
      this._monitorType = undefined;
      this._recoveryConditions = undefined;
      this._resourceKind = undefined;
      this._alarmTags.internalValue = undefined;
      this._noDataConditions.internalValue = undefined;
      this._triggerConditions.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._alarmRuleTemplateBindEnable = value.alarmRuleTemplateBindEnable;
      this._alarmRuleTemplateId = value.alarmRuleTemplateId;
      this._metricKind = value.metricKind;
      this._monitorObjects = value.monitorObjects;
      this._monitorType = value.monitorType;
      this._recoveryConditions = value.recoveryConditions;
      this._resourceKind = value.resourceKind;
      this._alarmTags.internalValue = value.alarmTags;
      this._noDataConditions.internalValue = value.noDataConditions;
      this._triggerConditions.internalValue = value.triggerConditions;
    }
  }

  // alarm_rule_template_bind_enable - computed: true, optional: true, required: false
  private _alarmRuleTemplateBindEnable?: boolean | cdktf.IResolvable; 
  public get alarmRuleTemplateBindEnable() {
    return this.getBooleanAttribute('alarm_rule_template_bind_enable');
  }
  public set alarmRuleTemplateBindEnable(value: boolean | cdktf.IResolvable) {
    this._alarmRuleTemplateBindEnable = value;
  }
  public resetAlarmRuleTemplateBindEnable() {
    this._alarmRuleTemplateBindEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmRuleTemplateBindEnableInput() {
    return this._alarmRuleTemplateBindEnable;
  }

  // alarm_rule_template_id - computed: true, optional: true, required: false
  private _alarmRuleTemplateId?: string; 
  public get alarmRuleTemplateId() {
    return this.getStringAttribute('alarm_rule_template_id');
  }
  public set alarmRuleTemplateId(value: string) {
    this._alarmRuleTemplateId = value;
  }
  public resetAlarmRuleTemplateId() {
    this._alarmRuleTemplateId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmRuleTemplateIdInput() {
    return this._alarmRuleTemplateId;
  }

  // metric_kind - computed: true, optional: true, required: false
  private _metricKind?: string; 
  public get metricKind() {
    return this.getStringAttribute('metric_kind');
  }
  public set metricKind(value: string) {
    this._metricKind = value;
  }
  public resetMetricKind() {
    this._metricKind = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricKindInput() {
    return this._metricKind;
  }

  // monitor_objects - computed: true, optional: true, required: false
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

  // monitor_type - computed: false, optional: false, required: true
  private _monitorType?: string; 
  public get monitorType() {
    return this.getStringAttribute('monitor_type');
  }
  public set monitorType(value: string) {
    this._monitorType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get monitorTypeInput() {
    return this._monitorType;
  }

  // recovery_conditions - computed: true, optional: true, required: false
  private _recoveryConditions?: { [key: string]: number }; 
  public get recoveryConditions() {
    return this.getNumberMapAttribute('recovery_conditions');
  }
  public set recoveryConditions(value: { [key: string]: number }) {
    this._recoveryConditions = value;
  }
  public resetRecoveryConditions() {
    this._recoveryConditions = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recoveryConditionsInput() {
    return this._recoveryConditions;
  }

  // resource_kind - computed: true, optional: true, required: false
  private _resourceKind?: string; 
  public get resourceKind() {
    return this.getStringAttribute('resource_kind');
  }
  public set resourceKind(value: string) {
    this._resourceKind = value;
  }
  public resetResourceKind() {
    this._resourceKind = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceKindInput() {
    return this._resourceKind;
  }

  // alarm_tags - computed: false, optional: true, required: false
  private _alarmTags = new AomAlarmPolicyMetricAlarmSpecAlarmTagsList(this, "alarm_tags", false);
  public get alarmTags() {
    return this._alarmTags;
  }
  public putAlarmTags(value: AomAlarmPolicyMetricAlarmSpecAlarmTags[] | cdktf.IResolvable) {
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
  private _noDataConditions = new AomAlarmPolicyMetricAlarmSpecNoDataConditionsList(this, "no_data_conditions", false);
  public get noDataConditions() {
    return this._noDataConditions;
  }
  public putNoDataConditions(value: AomAlarmPolicyMetricAlarmSpecNoDataConditions[] | cdktf.IResolvable) {
    this._noDataConditions.internalValue = value;
  }
  public resetNoDataConditions() {
    this._noDataConditions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get noDataConditionsInput() {
    return this._noDataConditions.internalValue;
  }

  // trigger_conditions - computed: false, optional: true, required: false
  private _triggerConditions = new AomAlarmPolicyMetricAlarmSpecTriggerConditionsList(this, "trigger_conditions", false);
  public get triggerConditions() {
    return this._triggerConditions;
  }
  public putTriggerConditions(value: AomAlarmPolicyMetricAlarmSpecTriggerConditions[] | cdktf.IResolvable) {
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

export class AomAlarmPolicyMetricAlarmSpecList extends cdktf.ComplexList {
  public internalValue? : AomAlarmPolicyMetricAlarmSpec[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmPolicyMetricAlarmSpecOutputReference {
    return new AomAlarmPolicyMetricAlarmSpecOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmPolicyTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#create AomAlarmPolicy#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#delete AomAlarmPolicy#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#update AomAlarmPolicy#update}
  */
  readonly update?: string;
}

export function aomAlarmPolicyTimeoutsToTerraform(struct?: AomAlarmPolicyTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function aomAlarmPolicyTimeoutsToHclTerraform(struct?: AomAlarmPolicyTimeouts | cdktf.IResolvable): any {
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

export class AomAlarmPolicyTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): AomAlarmPolicyTimeouts | cdktf.IResolvable | undefined {
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
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmPolicyTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
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
      this._delete = value.delete;
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

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy huaweicloud_aom_alarm_policy}
*/
export class AomAlarmPolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_alarm_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AomAlarmPolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AomAlarmPolicy to import
  * @param importFromId The id of the existing AomAlarmPolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AomAlarmPolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_alarm_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_policy huaweicloud_aom_alarm_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AomAlarmPolicyConfig
  */
  public constructor(scope: Construct, id: string, config: AomAlarmPolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_alarm_policy',
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
    this._alarmRuleDescription = config.alarmRuleDescription;
    this._alarmRuleEnable = config.alarmRuleEnable;
    this._alarmRuleName = config.alarmRuleName;
    this._alarmRuleStatus = config.alarmRuleStatus;
    this._alarmRuleType = config.alarmRuleType;
    this._id = config.id;
    this._region = config.region;
    this._alarmNotifications.internalValue = config.alarmNotifications;
    this._eventAlarmSpec.internalValue = config.eventAlarmSpec;
    this._metricAlarmSpec.internalValue = config.metricAlarmSpec;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // alarm_rule_description - computed: true, optional: true, required: false
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

  // alarm_rule_enable - computed: true, optional: true, required: false
  private _alarmRuleEnable?: boolean | cdktf.IResolvable; 
  public get alarmRuleEnable() {
    return this.getBooleanAttribute('alarm_rule_enable');
  }
  public set alarmRuleEnable(value: boolean | cdktf.IResolvable) {
    this._alarmRuleEnable = value;
  }
  public resetAlarmRuleEnable() {
    this._alarmRuleEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmRuleEnableInput() {
    return this._alarmRuleEnable;
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

  // alarm_rule_status - computed: true, optional: true, required: false
  private _alarmRuleStatus?: string; 
  public get alarmRuleStatus() {
    return this.getStringAttribute('alarm_rule_status');
  }
  public set alarmRuleStatus(value: string) {
    this._alarmRuleStatus = value;
  }
  public resetAlarmRuleStatus() {
    this._alarmRuleStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmRuleStatusInput() {
    return this._alarmRuleStatus;
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

  // alarm_notifications - computed: false, optional: true, required: false
  private _alarmNotifications = new AomAlarmPolicyAlarmNotificationsList(this, "alarm_notifications", false);
  public get alarmNotifications() {
    return this._alarmNotifications;
  }
  public putAlarmNotifications(value: AomAlarmPolicyAlarmNotifications[] | cdktf.IResolvable) {
    this._alarmNotifications.internalValue = value;
  }
  public resetAlarmNotifications() {
    this._alarmNotifications.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmNotificationsInput() {
    return this._alarmNotifications.internalValue;
  }

  // event_alarm_spec - computed: false, optional: true, required: false
  private _eventAlarmSpec = new AomAlarmPolicyEventAlarmSpecList(this, "event_alarm_spec", false);
  public get eventAlarmSpec() {
    return this._eventAlarmSpec;
  }
  public putEventAlarmSpec(value: AomAlarmPolicyEventAlarmSpec[] | cdktf.IResolvable) {
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
  private _metricAlarmSpec = new AomAlarmPolicyMetricAlarmSpecList(this, "metric_alarm_spec", false);
  public get metricAlarmSpec() {
    return this._metricAlarmSpec;
  }
  public putMetricAlarmSpec(value: AomAlarmPolicyMetricAlarmSpec[] | cdktf.IResolvable) {
    this._metricAlarmSpec.internalValue = value;
  }
  public resetMetricAlarmSpec() {
    this._metricAlarmSpec.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricAlarmSpecInput() {
    return this._metricAlarmSpec.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new AomAlarmPolicyTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: AomAlarmPolicyTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      alarm_rule_description: cdktf.stringToTerraform(this._alarmRuleDescription),
      alarm_rule_enable: cdktf.booleanToTerraform(this._alarmRuleEnable),
      alarm_rule_name: cdktf.stringToTerraform(this._alarmRuleName),
      alarm_rule_status: cdktf.stringToTerraform(this._alarmRuleStatus),
      alarm_rule_type: cdktf.stringToTerraform(this._alarmRuleType),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      alarm_notifications: cdktf.listMapper(aomAlarmPolicyAlarmNotificationsToTerraform, true)(this._alarmNotifications.internalValue),
      event_alarm_spec: cdktf.listMapper(aomAlarmPolicyEventAlarmSpecToTerraform, true)(this._eventAlarmSpec.internalValue),
      metric_alarm_spec: cdktf.listMapper(aomAlarmPolicyMetricAlarmSpecToTerraform, true)(this._metricAlarmSpec.internalValue),
      timeouts: aomAlarmPolicyTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      alarm_rule_description: {
        value: cdktf.stringToHclTerraform(this._alarmRuleDescription),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      alarm_rule_enable: {
        value: cdktf.booleanToHclTerraform(this._alarmRuleEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      alarm_rule_name: {
        value: cdktf.stringToHclTerraform(this._alarmRuleName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      alarm_rule_status: {
        value: cdktf.stringToHclTerraform(this._alarmRuleStatus),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      alarm_rule_type: {
        value: cdktf.stringToHclTerraform(this._alarmRuleType),
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
      alarm_notifications: {
        value: cdktf.listMapperHcl(aomAlarmPolicyAlarmNotificationsToHclTerraform, true)(this._alarmNotifications.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AomAlarmPolicyAlarmNotificationsList",
      },
      event_alarm_spec: {
        value: cdktf.listMapperHcl(aomAlarmPolicyEventAlarmSpecToHclTerraform, true)(this._eventAlarmSpec.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AomAlarmPolicyEventAlarmSpecList",
      },
      metric_alarm_spec: {
        value: cdktf.listMapperHcl(aomAlarmPolicyMetricAlarmSpecToHclTerraform, true)(this._metricAlarmSpec.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AomAlarmPolicyMetricAlarmSpecList",
      },
      timeouts: {
        value: aomAlarmPolicyTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "AomAlarmPolicyTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

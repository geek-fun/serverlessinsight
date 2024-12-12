// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudAomAlarmRulesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#alarm_rule_name DataHuaweicloudAomAlarmRules#alarm_rule_name}
  */
  readonly alarmRuleName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#alarm_rule_status DataHuaweicloudAomAlarmRules#alarm_rule_status}
  */
  readonly alarmRuleStatus?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#alarm_rule_type DataHuaweicloudAomAlarmRules#alarm_rule_type}
  */
  readonly alarmRuleType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#bind_notification_rule_id DataHuaweicloudAomAlarmRules#bind_notification_rule_id}
  */
  readonly bindNotificationRuleId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#enterprise_project_id DataHuaweicloudAomAlarmRules#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#event_severity DataHuaweicloudAomAlarmRules#event_severity}
  */
  readonly eventSeverity?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#event_source DataHuaweicloudAomAlarmRules#event_source}
  */
  readonly eventSource?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#id DataHuaweicloudAomAlarmRules#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#prom_instance_id DataHuaweicloudAomAlarmRules#prom_instance_id}
  */
  readonly promInstanceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#region DataHuaweicloudAomAlarmRules#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#related_cce_clusters DataHuaweicloudAomAlarmRules#related_cce_clusters}
  */
  readonly relatedCceClusters?: string;
}
export interface DataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotifications {
}

export function dataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotificationsToTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotifications): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotificationsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotifications): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotificationsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotifications | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotifications | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // bind_notification_rule_id - computed: true, optional: false, required: false
  public get bindNotificationRuleId() {
    return this.getStringAttribute('bind_notification_rule_id');
  }

  // notification_enable - computed: true, optional: false, required: false
  public get notificationEnable() {
    return this.getBooleanAttribute('notification_enable');
  }

  // notification_type - computed: true, optional: false, required: false
  public get notificationType() {
    return this.getStringAttribute('notification_type');
  }

  // notify_frequency - computed: true, optional: false, required: false
  public get notifyFrequency() {
    return this.getStringAttribute('notify_frequency');
  }

  // notify_resolved - computed: true, optional: false, required: false
  public get notifyResolved() {
    return this.getBooleanAttribute('notify_resolved');
  }

  // notify_triggered - computed: true, optional: false, required: false
  public get notifyTriggered() {
    return this.getBooleanAttribute('notify_triggered');
  }

  // route_group_enable - computed: true, optional: false, required: false
  public get routeGroupEnable() {
    return this.getBooleanAttribute('route_group_enable');
  }

  // route_group_rule - computed: true, optional: false, required: false
  public get routeGroupRule() {
    return this.getStringAttribute('route_group_rule');
  }
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotificationsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotificationsOutputReference {
    return new DataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotificationsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditions {
}

export function dataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditionsToTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditionsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditionsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // aggregation_window - computed: true, optional: false, required: false
  public get aggregationWindow() {
    return this.getNumberAttribute('aggregation_window');
  }

  // event_name - computed: true, optional: false, required: false
  public get eventName() {
    return this.getStringAttribute('event_name');
  }

  // frequency - computed: true, optional: false, required: false
  public get frequency() {
    return this.getStringAttribute('frequency');
  }

  // operator - computed: true, optional: false, required: false
  public get operator() {
    return this.getStringAttribute('operator');
  }

  // thresholds - computed: true, optional: false, required: false
  private _thresholds = new cdktf.NumberMap(this, "thresholds");
  public get thresholds() {
    return this._thresholds;
  }

  // trigger_type - computed: true, optional: false, required: false
  public get triggerType() {
    return this.getStringAttribute('trigger_type');
  }
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditionsOutputReference {
    return new DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpec {
}

export function dataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecToTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpec | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpec | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // alarm_source - computed: true, optional: false, required: false
  public get alarmSource() {
    return this.getStringAttribute('alarm_source');
  }

  // event_source - computed: true, optional: false, required: false
  public get eventSource() {
    return this.getStringAttribute('event_source');
  }

  // monitor_objects - computed: true, optional: false, required: false
  private _monitorObjects = new cdktf.StringMapList(this, "monitor_objects", false);
  public get monitorObjects() {
    return this._monitorObjects;
  }

  // trigger_conditions - computed: true, optional: false, required: false
  private _triggerConditions = new DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecTriggerConditionsList(this, "trigger_conditions", false);
  public get triggerConditions() {
    return this._triggerConditions;
  }
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecOutputReference {
    return new DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTags {
}

export function dataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTagsToTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTags): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTagsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTags): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTagsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTags | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTags | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // auto_tags - computed: true, optional: false, required: false
  public get autoTags() {
    return this.getListAttribute('auto_tags');
  }

  // custom_annotations - computed: true, optional: false, required: false
  public get customAnnotations() {
    return this.getListAttribute('custom_annotations');
  }

  // custom_tags - computed: true, optional: false, required: false
  public get customTags() {
    return this.getListAttribute('custom_tags');
  }
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTagsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTagsOutputReference {
    return new DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTagsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditions {
}

export function dataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditionsToTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditionsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditionsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // no_data_alert_state - computed: true, optional: false, required: false
  public get noDataAlertState() {
    return this.getStringAttribute('no_data_alert_state');
  }

  // no_data_timeframe - computed: true, optional: false, required: false
  public get noDataTimeframe() {
    return this.getNumberAttribute('no_data_timeframe');
  }

  // notify_no_data - computed: true, optional: false, required: false
  public get notifyNoData() {
    return this.getBooleanAttribute('notify_no_data');
  }
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditionsOutputReference {
    return new DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditions {
}

export function dataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditionsToTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditionsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditionsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // recovery_timeframe - computed: true, optional: false, required: false
  public get recoveryTimeframe() {
    return this.getNumberAttribute('recovery_timeframe');
  }
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditionsOutputReference {
    return new DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditions {
}

export function dataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditionsToTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditionsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditionsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // aggregate_type - computed: true, optional: false, required: false
  public get aggregateType() {
    return this.getStringAttribute('aggregate_type');
  }

  // aggregation_type - computed: true, optional: false, required: false
  public get aggregationType() {
    return this.getStringAttribute('aggregation_type');
  }

  // aggregation_window - computed: true, optional: false, required: false
  public get aggregationWindow() {
    return this.getStringAttribute('aggregation_window');
  }

  // aom_monitor_level - computed: true, optional: false, required: false
  public get aomMonitorLevel() {
    return this.getStringAttribute('aom_monitor_level');
  }

  // expression - computed: true, optional: false, required: false
  public get expression() {
    return this.getStringAttribute('expression');
  }

  // metric_labels - computed: true, optional: false, required: false
  public get metricLabels() {
    return this.getListAttribute('metric_labels');
  }

  // metric_name - computed: true, optional: false, required: false
  public get metricName() {
    return this.getStringAttribute('metric_name');
  }

  // metric_namespace - computed: true, optional: false, required: false
  public get metricNamespace() {
    return this.getStringAttribute('metric_namespace');
  }

  // metric_query_mode - computed: true, optional: false, required: false
  public get metricQueryMode() {
    return this.getStringAttribute('metric_query_mode');
  }

  // metric_statistic_method - computed: true, optional: false, required: false
  public get metricStatisticMethod() {
    return this.getStringAttribute('metric_statistic_method');
  }

  // metric_unit - computed: true, optional: false, required: false
  public get metricUnit() {
    return this.getStringAttribute('metric_unit');
  }

  // mix_promql - computed: true, optional: false, required: false
  public get mixPromql() {
    return this.getStringAttribute('mix_promql');
  }

  // operator - computed: true, optional: false, required: false
  public get operator() {
    return this.getStringAttribute('operator');
  }

  // promql - computed: true, optional: false, required: false
  public get promql() {
    return this.getStringAttribute('promql');
  }

  // promql_expr - computed: true, optional: false, required: false
  public get promqlExpr() {
    return cdktf.Fn.tolist(this.getListAttribute('promql_expr'));
  }

  // promql_for - computed: true, optional: false, required: false
  public get promqlFor() {
    return this.getStringAttribute('promql_for');
  }

  // query_match - computed: true, optional: false, required: false
  public get queryMatch() {
    return this.getStringAttribute('query_match');
  }

  // query_param - computed: true, optional: false, required: false
  public get queryParam() {
    return this.getStringAttribute('query_param');
  }

  // thresholds - computed: true, optional: false, required: false
  private _thresholds = new cdktf.StringMap(this, "thresholds");
  public get thresholds() {
    return this._thresholds;
  }

  // trigger_interval - computed: true, optional: false, required: false
  public get triggerInterval() {
    return this.getStringAttribute('trigger_interval');
  }

  // trigger_times - computed: true, optional: false, required: false
  public get triggerTimes() {
    return this.getStringAttribute('trigger_times');
  }

  // trigger_type - computed: true, optional: false, required: false
  public get triggerType() {
    return this.getStringAttribute('trigger_type');
  }
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditionsOutputReference {
    return new DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpec {
}

export function dataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecToTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpec | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpec | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // alarm_tags - computed: true, optional: false, required: false
  private _alarmTags = new DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecAlarmTagsList(this, "alarm_tags", false);
  public get alarmTags() {
    return this._alarmTags;
  }

  // monitor_objects - computed: true, optional: false, required: false
  private _monitorObjects = new cdktf.StringMapList(this, "monitor_objects", false);
  public get monitorObjects() {
    return this._monitorObjects;
  }

  // monitor_type - computed: true, optional: false, required: false
  public get monitorType() {
    return this.getStringAttribute('monitor_type');
  }

  // no_data_conditions - computed: true, optional: false, required: false
  private _noDataConditions = new DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecNoDataConditionsList(this, "no_data_conditions", false);
  public get noDataConditions() {
    return this._noDataConditions;
  }

  // recovery_conditions - computed: true, optional: false, required: false
  private _recoveryConditions = new DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecRecoveryConditionsList(this, "recovery_conditions", false);
  public get recoveryConditions() {
    return this._recoveryConditions;
  }

  // trigger_conditions - computed: true, optional: false, required: false
  private _triggerConditions = new DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecTriggerConditionsList(this, "trigger_conditions", false);
  public get triggerConditions() {
    return this._triggerConditions;
  }
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecOutputReference {
    return new DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesAlarmRules {
}

export function dataHuaweicloudAomAlarmRulesAlarmRulesToTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesAlarmRulesToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesAlarmRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHuaweicloudAomAlarmRulesAlarmRules | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesAlarmRules | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // alarm_notifications - computed: true, optional: false, required: false
  private _alarmNotifications = new DataHuaweicloudAomAlarmRulesAlarmRulesAlarmNotificationsList(this, "alarm_notifications", false);
  public get alarmNotifications() {
    return this._alarmNotifications;
  }

  // alarm_rule_id - computed: true, optional: false, required: false
  public get alarmRuleId() {
    return this.getStringAttribute('alarm_rule_id');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // enable - computed: true, optional: false, required: false
  public get enable() {
    return this.getBooleanAttribute('enable');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // event_alarm_spec - computed: true, optional: false, required: false
  private _eventAlarmSpec = new DataHuaweicloudAomAlarmRulesAlarmRulesEventAlarmSpecList(this, "event_alarm_spec", false);
  public get eventAlarmSpec() {
    return this._eventAlarmSpec;
  }

  // metric_alarm_spec - computed: true, optional: false, required: false
  private _metricAlarmSpec = new DataHuaweicloudAomAlarmRulesAlarmRulesMetricAlarmSpecList(this, "metric_alarm_spec", false);
  public get metricAlarmSpec() {
    return this._metricAlarmSpec;
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // prom_instance_id - computed: true, optional: false, required: false
  public get promInstanceId() {
    return this.getStringAttribute('prom_instance_id');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudAomAlarmRulesAlarmRulesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesAlarmRulesOutputReference {
    return new DataHuaweicloudAomAlarmRulesAlarmRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules huaweicloud_aom_alarm_rules}
*/
export class DataHuaweicloudAomAlarmRules extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_alarm_rules";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudAomAlarmRules resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudAomAlarmRules to import
  * @param importFromId The id of the existing DataHuaweicloudAomAlarmRules that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudAomAlarmRules to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_alarm_rules", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules huaweicloud_aom_alarm_rules} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudAomAlarmRulesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudAomAlarmRulesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_alarm_rules',
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
    this._alarmRuleName = config.alarmRuleName;
    this._alarmRuleStatus = config.alarmRuleStatus;
    this._alarmRuleType = config.alarmRuleType;
    this._bindNotificationRuleId = config.bindNotificationRuleId;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._eventSeverity = config.eventSeverity;
    this._eventSource = config.eventSource;
    this._id = config.id;
    this._promInstanceId = config.promInstanceId;
    this._region = config.region;
    this._relatedCceClusters = config.relatedCceClusters;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // alarm_rule_name - computed: false, optional: true, required: false
  private _alarmRuleName?: string; 
  public get alarmRuleName() {
    return this.getStringAttribute('alarm_rule_name');
  }
  public set alarmRuleName(value: string) {
    this._alarmRuleName = value;
  }
  public resetAlarmRuleName() {
    this._alarmRuleName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmRuleNameInput() {
    return this._alarmRuleName;
  }

  // alarm_rule_status - computed: false, optional: true, required: false
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

  // alarm_rule_type - computed: false, optional: true, required: false
  private _alarmRuleType?: string; 
  public get alarmRuleType() {
    return this.getStringAttribute('alarm_rule_type');
  }
  public set alarmRuleType(value: string) {
    this._alarmRuleType = value;
  }
  public resetAlarmRuleType() {
    this._alarmRuleType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmRuleTypeInput() {
    return this._alarmRuleType;
  }

  // alarm_rules - computed: true, optional: false, required: false
  private _alarmRules = new DataHuaweicloudAomAlarmRulesAlarmRulesList(this, "alarm_rules", false);
  public get alarmRules() {
    return this._alarmRules;
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

  // enterprise_project_id - computed: false, optional: true, required: false
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

  // event_severity - computed: false, optional: true, required: false
  private _eventSeverity?: string; 
  public get eventSeverity() {
    return this.getStringAttribute('event_severity');
  }
  public set eventSeverity(value: string) {
    this._eventSeverity = value;
  }
  public resetEventSeverity() {
    this._eventSeverity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eventSeverityInput() {
    return this._eventSeverity;
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

  // prom_instance_id - computed: false, optional: true, required: false
  private _promInstanceId?: string; 
  public get promInstanceId() {
    return this.getStringAttribute('prom_instance_id');
  }
  public set promInstanceId(value: string) {
    this._promInstanceId = value;
  }
  public resetPromInstanceId() {
    this._promInstanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get promInstanceIdInput() {
    return this._promInstanceId;
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

  // related_cce_clusters - computed: false, optional: true, required: false
  private _relatedCceClusters?: string; 
  public get relatedCceClusters() {
    return this.getStringAttribute('related_cce_clusters');
  }
  public set relatedCceClusters(value: string) {
    this._relatedCceClusters = value;
  }
  public resetRelatedCceClusters() {
    this._relatedCceClusters = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get relatedCceClustersInput() {
    return this._relatedCceClusters;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      alarm_rule_name: cdktf.stringToTerraform(this._alarmRuleName),
      alarm_rule_status: cdktf.stringToTerraform(this._alarmRuleStatus),
      alarm_rule_type: cdktf.stringToTerraform(this._alarmRuleType),
      bind_notification_rule_id: cdktf.stringToTerraform(this._bindNotificationRuleId),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      event_severity: cdktf.stringToTerraform(this._eventSeverity),
      event_source: cdktf.stringToTerraform(this._eventSource),
      id: cdktf.stringToTerraform(this._id),
      prom_instance_id: cdktf.stringToTerraform(this._promInstanceId),
      region: cdktf.stringToTerraform(this._region),
      related_cce_clusters: cdktf.stringToTerraform(this._relatedCceClusters),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
      bind_notification_rule_id: {
        value: cdktf.stringToHclTerraform(this._bindNotificationRuleId),
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
      event_severity: {
        value: cdktf.stringToHclTerraform(this._eventSeverity),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      event_source: {
        value: cdktf.stringToHclTerraform(this._eventSource),
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
      prom_instance_id: {
        value: cdktf.stringToHclTerraform(this._promInstanceId),
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
      related_cce_clusters: {
        value: cdktf.stringToHclTerraform(this._relatedCceClusters),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

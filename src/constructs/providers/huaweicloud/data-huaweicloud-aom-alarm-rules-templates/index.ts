// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules_templates
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudAomAlarmRulesTemplatesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules_templates#enterprise_project_id DataHuaweicloudAomAlarmRulesTemplates#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules_templates#id DataHuaweicloudAomAlarmRulesTemplates#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules_templates#region DataHuaweicloudAomAlarmRulesTemplates#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules_templates#template_id DataHuaweicloudAomAlarmRulesTemplates#template_id}
  */
  readonly templateId?: string;
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotification {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotificationToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotification): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotificationToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotification): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotificationOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotification | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotification | undefined) {
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

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotificationList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotificationOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotificationOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditions | undefined) {
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

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpec | undefined) {
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

  // alarm_subtype - computed: true, optional: false, required: false
  public get alarmSubtype() {
    return this.getStringAttribute('alarm_subtype');
  }

  // event_source - computed: true, optional: false, required: false
  public get eventSource() {
    return this.getStringAttribute('event_source');
  }

  // monitor_object_templates - computed: true, optional: false, required: false
  public get monitorObjectTemplates() {
    return this.getListAttribute('monitor_object_templates');
  }

  // monitor_objects - computed: true, optional: false, required: false
  private _monitorObjects = new cdktf.StringMapList(this, "monitor_objects", false);
  public get monitorObjects() {
    return this._monitorObjects;
  }

  // trigger_conditions - computed: true, optional: false, required: false
  private _triggerConditions = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecTriggerConditionsList(this, "trigger_conditions", false);
  public get triggerConditions() {
    return this._triggerConditions;
  }
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTags | undefined) {
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

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditions | undefined) {
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

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditions | undefined) {
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

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditions | undefined) {
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
    return this.getListAttribute('promql_expr');
  }

  // promql_for - computed: true, optional: false, required: false
  public get promqlFor() {
    return this.getStringAttribute('promql_for');
  }

  // query_match - computed: true, optional: false, required: false
  public get queryMatch() {
    return this.getStringAttribute('query_match');
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

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpec | undefined) {
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

  // alarm_subtype - computed: true, optional: false, required: false
  public get alarmSubtype() {
    return this.getStringAttribute('alarm_subtype');
  }

  // alarm_tags - computed: true, optional: false, required: false
  private _alarmTags = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecAlarmTagsList(this, "alarm_tags", false);
  public get alarmTags() {
    return this._alarmTags;
  }

  // monitor_type - computed: true, optional: false, required: false
  public get monitorType() {
    return this.getStringAttribute('monitor_type');
  }

  // no_data_conditions - computed: true, optional: false, required: false
  private _noDataConditions = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecNoDataConditionsList(this, "no_data_conditions", false);
  public get noDataConditions() {
    return this._noDataConditions;
  }

  // recovery_conditions - computed: true, optional: false, required: false
  private _recoveryConditions = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecRecoveryConditionsList(this, "recovery_conditions", false);
  public get recoveryConditions() {
    return this._recoveryConditions;
  }

  // trigger_conditions - computed: true, optional: false, required: false
  private _triggerConditions = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecTriggerConditionsList(this, "trigger_conditions", false);
  public get triggerConditions() {
    return this._triggerConditions;
  }
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItems {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItems): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItems): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItems | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItems | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // alarm_rule_description - computed: true, optional: false, required: false
  public get alarmRuleDescription() {
    return this.getStringAttribute('alarm_rule_description');
  }

  // alarm_rule_name - computed: true, optional: false, required: false
  public get alarmRuleName() {
    return this.getStringAttribute('alarm_rule_name');
  }

  // alarm_rule_type - computed: true, optional: false, required: false
  public get alarmRuleType() {
    return this.getStringAttribute('alarm_rule_type');
  }

  // event_alarm_spec - computed: true, optional: false, required: false
  private _eventAlarmSpec = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsEventAlarmSpecList(this, "event_alarm_spec", false);
  public get eventAlarmSpec() {
    return this._eventAlarmSpec;
  }

  // metric_alarm_spec - computed: true, optional: false, required: false
  private _metricAlarmSpec = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsMetricAlarmSpecList(this, "metric_alarm_spec", false);
  public get metricAlarmSpec() {
    return this._metricAlarmSpec;
  }
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStruct {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStructToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStructToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // alarm_notification - computed: true, optional: false, required: false
  private _alarmNotification = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmNotificationList(this, "alarm_notification", false);
  public get alarmNotification() {
    return this._alarmNotification;
  }

  // alarm_template_spec_items - computed: true, optional: false, required: false
  private _alarmTemplateSpecItems = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListAlarmTemplateSpecItemsList(this, "alarm_template_spec_items", false);
  public get alarmTemplateSpecItems() {
    return this._alarmTemplateSpecItems;
  }

  // related_cce_clusters - computed: true, optional: false, required: false
  public get relatedCceClusters() {
    return this.getListAttribute('related_cce_clusters');
  }

  // related_cloud_service - computed: true, optional: false, required: false
  public get relatedCloudService() {
    return this.getStringAttribute('related_cloud_service');
  }

  // related_prometheus_instances - computed: true, optional: false, required: false
  public get relatedPrometheusInstances() {
    return this.getListAttribute('related_prometheus_instances');
  }
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStructList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStructOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStruct {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStructToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStructToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStruct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStruct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStruct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // query - computed: true, optional: false, required: false
  public get query() {
    return this.getStringAttribute('query');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStructList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStructOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplating {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplating): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplating): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplating | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplating | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // list - computed: true, optional: false, required: false
  private _list = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingListStructList(this, "list", false);
  public get list() {
    return this._list;
  }
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudAomAlarmRulesTemplatesTemplates {
}

export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesToTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplates): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomAlarmRulesTemplatesTemplatesToHclTerraform(struct?: DataHuaweicloudAomAlarmRulesTemplatesTemplates): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomAlarmRulesTemplatesTemplates | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomAlarmRulesTemplatesTemplates | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // alarm_template_spec_list - computed: true, optional: false, required: false
  private _alarmTemplateSpecList = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesAlarmTemplateSpecListStructList(this, "alarm_template_spec_list", false);
  public get alarmTemplateSpecList() {
    return this._alarmTemplateSpecList;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // templating - computed: true, optional: false, required: false
  private _templating = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesTemplatingList(this, "templating", false);
  public get templating() {
    return this._templating;
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

export class DataHuaweicloudAomAlarmRulesTemplatesTemplatesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomAlarmRulesTemplatesTemplatesOutputReference {
    return new DataHuaweicloudAomAlarmRulesTemplatesTemplatesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules_templates huaweicloud_aom_alarm_rules_templates}
*/
export class DataHuaweicloudAomAlarmRulesTemplates extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_alarm_rules_templates";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudAomAlarmRulesTemplates resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudAomAlarmRulesTemplates to import
  * @param importFromId The id of the existing DataHuaweicloudAomAlarmRulesTemplates that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules_templates#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudAomAlarmRulesTemplates to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_alarm_rules_templates", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_alarm_rules_templates huaweicloud_aom_alarm_rules_templates} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudAomAlarmRulesTemplatesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudAomAlarmRulesTemplatesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_alarm_rules_templates',
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
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._region = config.region;
    this._templateId = config.templateId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // template_id - computed: false, optional: true, required: false
  private _templateId?: string; 
  public get templateId() {
    return this.getStringAttribute('template_id');
  }
  public set templateId(value: string) {
    this._templateId = value;
  }
  public resetTemplateId() {
    this._templateId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateIdInput() {
    return this._templateId;
  }

  // templates - computed: true, optional: false, required: false
  private _templates = new DataHuaweicloudAomAlarmRulesTemplatesTemplatesList(this, "templates", false);
  public get templates() {
    return this._templates;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      template_id: cdktf.stringToTerraform(this._templateId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      template_id: {
        value: cdktf.stringToHclTerraform(this._templateId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

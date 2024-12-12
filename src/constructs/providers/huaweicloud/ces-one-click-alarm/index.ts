// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CesOneClickAlarmConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#id CesOneClickAlarm#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the time when the alarm notification was enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#notification_begin_time CesOneClickAlarm#notification_begin_time}
  */
  readonly notificationBeginTime?: string;
  /**
  * Specifies whether to enable the alarm notification.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#notification_enabled CesOneClickAlarm#notification_enabled}
  */
  readonly notificationEnabled: boolean | cdktf.IResolvable;
  /**
  * Specifies the time when the alarm notification was disabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#notification_end_time CesOneClickAlarm#notification_end_time}
  */
  readonly notificationEndTime?: string;
  /**
  * Specifies the default one-click monitoring ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#one_click_alarm_id CesOneClickAlarm#one_click_alarm_id}
  */
  readonly oneClickAlarmId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#region CesOneClickAlarm#region}
  */
  readonly region?: string;
  /**
  * alarm_notifications block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#alarm_notifications CesOneClickAlarm#alarm_notifications}
  */
  readonly alarmNotifications?: CesOneClickAlarmAlarmNotifications[] | cdktf.IResolvable;
  /**
  * dimension_names block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#dimension_names CesOneClickAlarm#dimension_names}
  */
  readonly dimensionNames: CesOneClickAlarmDimensionNames;
  /**
  * ok_notifications block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#ok_notifications CesOneClickAlarm#ok_notifications}
  */
  readonly okNotifications?: CesOneClickAlarmOkNotifications[] | cdktf.IResolvable;
}
export interface CesOneClickAlarmAlarmNotifications {
  /**
  * Specifies the list of objects to be notified if the alarm status changes.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#notification_list CesOneClickAlarm#notification_list}
  */
  readonly notificationList: string[];
  /**
  * Specifies the notification type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#type CesOneClickAlarm#type}
  */
  readonly type: string;
}

export function cesOneClickAlarmAlarmNotificationsToTerraform(struct?: CesOneClickAlarmAlarmNotifications | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    notification_list: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.notificationList),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function cesOneClickAlarmAlarmNotificationsToHclTerraform(struct?: CesOneClickAlarmAlarmNotifications | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    notification_list: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.notificationList),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
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

export class CesOneClickAlarmAlarmNotificationsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CesOneClickAlarmAlarmNotifications | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._notificationList !== undefined) {
      hasAnyValues = true;
      internalValueResult.notificationList = this._notificationList;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CesOneClickAlarmAlarmNotifications | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._notificationList = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._notificationList = value.notificationList;
      this._type = value.type;
    }
  }

  // notification_list - computed: false, optional: false, required: true
  private _notificationList?: string[]; 
  public get notificationList() {
    return this.getListAttribute('notification_list');
  }
  public set notificationList(value: string[]) {
    this._notificationList = value;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationListInput() {
    return this._notificationList;
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

export class CesOneClickAlarmAlarmNotificationsList extends cdktf.ComplexList {
  public internalValue? : CesOneClickAlarmAlarmNotifications[] | cdktf.IResolvable

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
  public get(index: number): CesOneClickAlarmAlarmNotificationsOutputReference {
    return new CesOneClickAlarmAlarmNotificationsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CesOneClickAlarmDimensionNames {
  /**
  * Specifies whether to enable the event alarm rules.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#event CesOneClickAlarm#event}
  */
  readonly event?: boolean | cdktf.IResolvable;
  /**
  * Specifies dimensions in metric alarm rules that have one-click monitoring enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#metric CesOneClickAlarm#metric}
  */
  readonly metric?: string[];
}

export function cesOneClickAlarmDimensionNamesToTerraform(struct?: CesOneClickAlarmDimensionNamesOutputReference | CesOneClickAlarmDimensionNames): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    event: cdktf.booleanToTerraform(struct!.event),
    metric: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.metric),
  }
}


export function cesOneClickAlarmDimensionNamesToHclTerraform(struct?: CesOneClickAlarmDimensionNamesOutputReference | CesOneClickAlarmDimensionNames): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    event: {
      value: cdktf.booleanToHclTerraform(struct!.event),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    metric: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.metric),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CesOneClickAlarmDimensionNamesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CesOneClickAlarmDimensionNames | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._event !== undefined) {
      hasAnyValues = true;
      internalValueResult.event = this._event;
    }
    if (this._metric !== undefined) {
      hasAnyValues = true;
      internalValueResult.metric = this._metric;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CesOneClickAlarmDimensionNames | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._event = undefined;
      this._metric = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._event = value.event;
      this._metric = value.metric;
    }
  }

  // event - computed: false, optional: true, required: false
  private _event?: boolean | cdktf.IResolvable; 
  public get event() {
    return this.getBooleanAttribute('event');
  }
  public set event(value: boolean | cdktf.IResolvable) {
    this._event = value;
  }
  public resetEvent() {
    this._event = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eventInput() {
    return this._event;
  }

  // metric - computed: false, optional: true, required: false
  private _metric?: string[]; 
  public get metric() {
    return this.getListAttribute('metric');
  }
  public set metric(value: string[]) {
    this._metric = value;
  }
  public resetMetric() {
    this._metric = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricInput() {
    return this._metric;
  }
}
export interface CesOneClickAlarmOkNotifications {
  /**
  * Specifies the list of objects to be notified if the alarm status changes.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#notification_list CesOneClickAlarm#notification_list}
  */
  readonly notificationList: string[];
  /**
  * Specifies the notification type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#type CesOneClickAlarm#type}
  */
  readonly type: string;
}

export function cesOneClickAlarmOkNotificationsToTerraform(struct?: CesOneClickAlarmOkNotifications | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    notification_list: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.notificationList),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function cesOneClickAlarmOkNotificationsToHclTerraform(struct?: CesOneClickAlarmOkNotifications | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    notification_list: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.notificationList),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
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

export class CesOneClickAlarmOkNotificationsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CesOneClickAlarmOkNotifications | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._notificationList !== undefined) {
      hasAnyValues = true;
      internalValueResult.notificationList = this._notificationList;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CesOneClickAlarmOkNotifications | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._notificationList = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._notificationList = value.notificationList;
      this._type = value.type;
    }
  }

  // notification_list - computed: false, optional: false, required: true
  private _notificationList?: string[]; 
  public get notificationList() {
    return this.getListAttribute('notification_list');
  }
  public set notificationList(value: string[]) {
    this._notificationList = value;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationListInput() {
    return this._notificationList;
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

export class CesOneClickAlarmOkNotificationsList extends cdktf.ComplexList {
  public internalValue? : CesOneClickAlarmOkNotifications[] | cdktf.IResolvable

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
  public get(index: number): CesOneClickAlarmOkNotificationsOutputReference {
    return new CesOneClickAlarmOkNotificationsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm huaweicloud_ces_one_click_alarm}
*/
export class CesOneClickAlarm extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_ces_one_click_alarm";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CesOneClickAlarm resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CesOneClickAlarm to import
  * @param importFromId The id of the existing CesOneClickAlarm that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CesOneClickAlarm to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_ces_one_click_alarm", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ces_one_click_alarm huaweicloud_ces_one_click_alarm} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CesOneClickAlarmConfig
  */
  public constructor(scope: Construct, id: string, config: CesOneClickAlarmConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_ces_one_click_alarm',
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
    this._notificationBeginTime = config.notificationBeginTime;
    this._notificationEnabled = config.notificationEnabled;
    this._notificationEndTime = config.notificationEndTime;
    this._oneClickAlarmId = config.oneClickAlarmId;
    this._region = config.region;
    this._alarmNotifications.internalValue = config.alarmNotifications;
    this._dimensionNames.internalValue = config.dimensionNames;
    this._okNotifications.internalValue = config.okNotifications;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // enabled - computed: true, optional: false, required: false
  public get enabled() {
    return this.getBooleanAttribute('enabled');
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

  // namespace - computed: true, optional: false, required: false
  public get namespace() {
    return this.getStringAttribute('namespace');
  }

  // notification_begin_time - computed: false, optional: true, required: false
  private _notificationBeginTime?: string; 
  public get notificationBeginTime() {
    return this.getStringAttribute('notification_begin_time');
  }
  public set notificationBeginTime(value: string) {
    this._notificationBeginTime = value;
  }
  public resetNotificationBeginTime() {
    this._notificationBeginTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationBeginTimeInput() {
    return this._notificationBeginTime;
  }

  // notification_enabled - computed: false, optional: false, required: true
  private _notificationEnabled?: boolean | cdktf.IResolvable; 
  public get notificationEnabled() {
    return this.getBooleanAttribute('notification_enabled');
  }
  public set notificationEnabled(value: boolean | cdktf.IResolvable) {
    this._notificationEnabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationEnabledInput() {
    return this._notificationEnabled;
  }

  // notification_end_time - computed: false, optional: true, required: false
  private _notificationEndTime?: string; 
  public get notificationEndTime() {
    return this.getStringAttribute('notification_end_time');
  }
  public set notificationEndTime(value: string) {
    this._notificationEndTime = value;
  }
  public resetNotificationEndTime() {
    this._notificationEndTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationEndTimeInput() {
    return this._notificationEndTime;
  }

  // one_click_alarm_id - computed: false, optional: false, required: true
  private _oneClickAlarmId?: string; 
  public get oneClickAlarmId() {
    return this.getStringAttribute('one_click_alarm_id');
  }
  public set oneClickAlarmId(value: string) {
    this._oneClickAlarmId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get oneClickAlarmIdInput() {
    return this._oneClickAlarmId;
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
  private _alarmNotifications = new CesOneClickAlarmAlarmNotificationsList(this, "alarm_notifications", false);
  public get alarmNotifications() {
    return this._alarmNotifications;
  }
  public putAlarmNotifications(value: CesOneClickAlarmAlarmNotifications[] | cdktf.IResolvable) {
    this._alarmNotifications.internalValue = value;
  }
  public resetAlarmNotifications() {
    this._alarmNotifications.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmNotificationsInput() {
    return this._alarmNotifications.internalValue;
  }

  // dimension_names - computed: false, optional: false, required: true
  private _dimensionNames = new CesOneClickAlarmDimensionNamesOutputReference(this, "dimension_names");
  public get dimensionNames() {
    return this._dimensionNames;
  }
  public putDimensionNames(value: CesOneClickAlarmDimensionNames) {
    this._dimensionNames.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dimensionNamesInput() {
    return this._dimensionNames.internalValue;
  }

  // ok_notifications - computed: false, optional: true, required: false
  private _okNotifications = new CesOneClickAlarmOkNotificationsList(this, "ok_notifications", false);
  public get okNotifications() {
    return this._okNotifications;
  }
  public putOkNotifications(value: CesOneClickAlarmOkNotifications[] | cdktf.IResolvable) {
    this._okNotifications.internalValue = value;
  }
  public resetOkNotifications() {
    this._okNotifications.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get okNotificationsInput() {
    return this._okNotifications.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      notification_begin_time: cdktf.stringToTerraform(this._notificationBeginTime),
      notification_enabled: cdktf.booleanToTerraform(this._notificationEnabled),
      notification_end_time: cdktf.stringToTerraform(this._notificationEndTime),
      one_click_alarm_id: cdktf.stringToTerraform(this._oneClickAlarmId),
      region: cdktf.stringToTerraform(this._region),
      alarm_notifications: cdktf.listMapper(cesOneClickAlarmAlarmNotificationsToTerraform, true)(this._alarmNotifications.internalValue),
      dimension_names: cesOneClickAlarmDimensionNamesToTerraform(this._dimensionNames.internalValue),
      ok_notifications: cdktf.listMapper(cesOneClickAlarmOkNotificationsToTerraform, true)(this._okNotifications.internalValue),
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
      notification_begin_time: {
        value: cdktf.stringToHclTerraform(this._notificationBeginTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      notification_enabled: {
        value: cdktf.booleanToHclTerraform(this._notificationEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      notification_end_time: {
        value: cdktf.stringToHclTerraform(this._notificationEndTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      one_click_alarm_id: {
        value: cdktf.stringToHclTerraform(this._oneClickAlarmId),
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
        value: cdktf.listMapperHcl(cesOneClickAlarmAlarmNotificationsToHclTerraform, true)(this._alarmNotifications.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CesOneClickAlarmAlarmNotificationsList",
      },
      dimension_names: {
        value: cesOneClickAlarmDimensionNamesToHclTerraform(this._dimensionNames.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CesOneClickAlarmDimensionNamesList",
      },
      ok_notifications: {
        value: cdktf.listMapperHcl(cesOneClickAlarmOkNotificationsToHclTerraform, true)(this._okNotifications.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CesOneClickAlarmOkNotificationsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AomAlarmGroupRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#description AomAlarmGroupRule#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#enterprise_project_id AomAlarmGroupRule#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#group_by AomAlarmGroupRule#group_by}
  */
  readonly groupBy: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#group_interval AomAlarmGroupRule#group_interval}
  */
  readonly groupInterval: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#group_repeat_waiting AomAlarmGroupRule#group_repeat_waiting}
  */
  readonly groupRepeatWaiting: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#group_wait AomAlarmGroupRule#group_wait}
  */
  readonly groupWait: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#id AomAlarmGroupRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#name AomAlarmGroupRule#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#region AomAlarmGroupRule#region}
  */
  readonly region?: string;
  /**
  * detail block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#detail AomAlarmGroupRule#detail}
  */
  readonly detail: AomAlarmGroupRuleDetail[] | cdktf.IResolvable;
}
export interface AomAlarmGroupRuleDetailMatch {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#key AomAlarmGroupRule#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#operate AomAlarmGroupRule#operate}
  */
  readonly operate: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#value AomAlarmGroupRule#value}
  */
  readonly value?: string[];
}

export function aomAlarmGroupRuleDetailMatchToTerraform(struct?: AomAlarmGroupRuleDetailMatch | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
    operate: cdktf.stringToTerraform(struct!.operate),
    value: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.value),
  }
}


export function aomAlarmGroupRuleDetailMatchToHclTerraform(struct?: AomAlarmGroupRuleDetailMatch | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    key: {
      value: cdktf.stringToHclTerraform(struct!.key),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    operate: {
      value: cdktf.stringToHclTerraform(struct!.operate),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.value),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmGroupRuleDetailMatchOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmGroupRuleDetailMatch | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    if (this._operate !== undefined) {
      hasAnyValues = true;
      internalValueResult.operate = this._operate;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmGroupRuleDetailMatch | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._key = undefined;
      this._operate = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._key = value.key;
      this._operate = value.operate;
      this._value = value.value;
    }
  }

  // key - computed: false, optional: false, required: true
  private _key?: string; 
  public get key() {
    return this.getStringAttribute('key');
  }
  public set key(value: string) {
    this._key = value;
  }
  // Temporarily expose input value. Use with caution.
  public get keyInput() {
    return this._key;
  }

  // operate - computed: false, optional: false, required: true
  private _operate?: string; 
  public get operate() {
    return this.getStringAttribute('operate');
  }
  public set operate(value: string) {
    this._operate = value;
  }
  // Temporarily expose input value. Use with caution.
  public get operateInput() {
    return this._operate;
  }

  // value - computed: false, optional: true, required: false
  private _value?: string[]; 
  public get value() {
    return cdktf.Fn.tolist(this.getListAttribute('value'));
  }
  public set value(value: string[]) {
    this._value = value;
  }
  public resetValue() {
    this._value = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class AomAlarmGroupRuleDetailMatchList extends cdktf.ComplexList {
  public internalValue? : AomAlarmGroupRuleDetailMatch[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmGroupRuleDetailMatchOutputReference {
    return new AomAlarmGroupRuleDetailMatchOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmGroupRuleDetail {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#bind_notification_rule_ids AomAlarmGroupRule#bind_notification_rule_ids}
  */
  readonly bindNotificationRuleIds: string[];
  /**
  * match block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#match AomAlarmGroupRule#match}
  */
  readonly match: AomAlarmGroupRuleDetailMatch[] | cdktf.IResolvable;
}

export function aomAlarmGroupRuleDetailToTerraform(struct?: AomAlarmGroupRuleDetail | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bind_notification_rule_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.bindNotificationRuleIds),
    match: cdktf.listMapper(aomAlarmGroupRuleDetailMatchToTerraform, true)(struct!.match),
  }
}


export function aomAlarmGroupRuleDetailToHclTerraform(struct?: AomAlarmGroupRuleDetail | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bind_notification_rule_ids: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.bindNotificationRuleIds),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    match: {
      value: cdktf.listMapperHcl(aomAlarmGroupRuleDetailMatchToHclTerraform, true)(struct!.match),
      isBlock: true,
      type: "set",
      storageClassType: "AomAlarmGroupRuleDetailMatchList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmGroupRuleDetailOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmGroupRuleDetail | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bindNotificationRuleIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.bindNotificationRuleIds = this._bindNotificationRuleIds;
    }
    if (this._match?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.match = this._match?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmGroupRuleDetail | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._bindNotificationRuleIds = undefined;
      this._match.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._bindNotificationRuleIds = value.bindNotificationRuleIds;
      this._match.internalValue = value.match;
    }
  }

  // bind_notification_rule_ids - computed: false, optional: false, required: true
  private _bindNotificationRuleIds?: string[]; 
  public get bindNotificationRuleIds() {
    return cdktf.Fn.tolist(this.getListAttribute('bind_notification_rule_ids'));
  }
  public set bindNotificationRuleIds(value: string[]) {
    this._bindNotificationRuleIds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bindNotificationRuleIdsInput() {
    return this._bindNotificationRuleIds;
  }

  // match - computed: false, optional: false, required: true
  private _match = new AomAlarmGroupRuleDetailMatchList(this, "match", true);
  public get match() {
    return this._match;
  }
  public putMatch(value: AomAlarmGroupRuleDetailMatch[] | cdktf.IResolvable) {
    this._match.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get matchInput() {
    return this._match.internalValue;
  }
}

export class AomAlarmGroupRuleDetailList extends cdktf.ComplexList {
  public internalValue? : AomAlarmGroupRuleDetail[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmGroupRuleDetailOutputReference {
    return new AomAlarmGroupRuleDetailOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule huaweicloud_aom_alarm_group_rule}
*/
export class AomAlarmGroupRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_alarm_group_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AomAlarmGroupRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AomAlarmGroupRule to import
  * @param importFromId The id of the existing AomAlarmGroupRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AomAlarmGroupRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_alarm_group_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_group_rule huaweicloud_aom_alarm_group_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AomAlarmGroupRuleConfig
  */
  public constructor(scope: Construct, id: string, config: AomAlarmGroupRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_alarm_group_rule',
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
    this._groupBy = config.groupBy;
    this._groupInterval = config.groupInterval;
    this._groupRepeatWaiting = config.groupRepeatWaiting;
    this._groupWait = config.groupWait;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._detail.internalValue = config.detail;
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

  // group_by - computed: false, optional: false, required: true
  private _groupBy?: string[]; 
  public get groupBy() {
    return cdktf.Fn.tolist(this.getListAttribute('group_by'));
  }
  public set groupBy(value: string[]) {
    this._groupBy = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupByInput() {
    return this._groupBy;
  }

  // group_interval - computed: false, optional: false, required: true
  private _groupInterval?: number; 
  public get groupInterval() {
    return this.getNumberAttribute('group_interval');
  }
  public set groupInterval(value: number) {
    this._groupInterval = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupIntervalInput() {
    return this._groupInterval;
  }

  // group_repeat_waiting - computed: false, optional: false, required: true
  private _groupRepeatWaiting?: number; 
  public get groupRepeatWaiting() {
    return this.getNumberAttribute('group_repeat_waiting');
  }
  public set groupRepeatWaiting(value: number) {
    this._groupRepeatWaiting = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupRepeatWaitingInput() {
    return this._groupRepeatWaiting;
  }

  // group_wait - computed: false, optional: false, required: true
  private _groupWait?: number; 
  public get groupWait() {
    return this.getNumberAttribute('group_wait');
  }
  public set groupWait(value: number) {
    this._groupWait = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupWaitInput() {
    return this._groupWait;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // detail - computed: false, optional: false, required: true
  private _detail = new AomAlarmGroupRuleDetailList(this, "detail", true);
  public get detail() {
    return this._detail;
  }
  public putDetail(value: AomAlarmGroupRuleDetail[] | cdktf.IResolvable) {
    this._detail.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get detailInput() {
    return this._detail.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      group_by: cdktf.listMapper(cdktf.stringToTerraform, false)(this._groupBy),
      group_interval: cdktf.numberToTerraform(this._groupInterval),
      group_repeat_waiting: cdktf.numberToTerraform(this._groupRepeatWaiting),
      group_wait: cdktf.numberToTerraform(this._groupWait),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      detail: cdktf.listMapper(aomAlarmGroupRuleDetailToTerraform, true)(this._detail.internalValue),
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
      group_by: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._groupBy),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      group_interval: {
        value: cdktf.numberToHclTerraform(this._groupInterval),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      group_repeat_waiting: {
        value: cdktf.numberToHclTerraform(this._groupRepeatWaiting),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      group_wait: {
        value: cdktf.numberToHclTerraform(this._groupWait),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      detail: {
        value: cdktf.listMapperHcl(aomAlarmGroupRuleDetailToHclTerraform, true)(this._detail.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "AomAlarmGroupRuleDetailList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AomAlarmSilenceRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#description AomAlarmSilenceRule#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#id AomAlarmSilenceRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the rule name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#name AomAlarmSilenceRule#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#region AomAlarmSilenceRule#region}
  */
  readonly region?: string;
  /**
  * Specifies the time zone.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#time_zone AomAlarmSilenceRule#time_zone}
  */
  readonly timeZone: string;
  /**
  * silence_conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#silence_conditions AomAlarmSilenceRule#silence_conditions}
  */
  readonly silenceConditions: AomAlarmSilenceRuleSilenceConditions[] | cdktf.IResolvable;
  /**
  * silence_time block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#silence_time AomAlarmSilenceRule#silence_time}
  */
  readonly silenceTime: AomAlarmSilenceRuleSilenceTime;
}
export interface AomAlarmSilenceRuleSilenceConditionsConditions {
  /**
  * Specifies the key of the match condition.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#key AomAlarmSilenceRule#key}
  */
  readonly key: string;
  /**
  * Specifies the operate of the match condition.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#operate AomAlarmSilenceRule#operate}
  */
  readonly operate: string;
  /**
  * Specifies the value list of the match condition.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#value AomAlarmSilenceRule#value}
  */
  readonly value?: string[];
}

export function aomAlarmSilenceRuleSilenceConditionsConditionsToTerraform(struct?: AomAlarmSilenceRuleSilenceConditionsConditions | cdktf.IResolvable): any {
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


export function aomAlarmSilenceRuleSilenceConditionsConditionsToHclTerraform(struct?: AomAlarmSilenceRuleSilenceConditionsConditions | cdktf.IResolvable): any {
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
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmSilenceRuleSilenceConditionsConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmSilenceRuleSilenceConditionsConditions | cdktf.IResolvable | undefined {
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

  public set internalValue(value: AomAlarmSilenceRuleSilenceConditionsConditions | cdktf.IResolvable | undefined) {
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

  // value - computed: true, optional: true, required: false
  private _value?: string[]; 
  public get value() {
    return this.getListAttribute('value');
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

export class AomAlarmSilenceRuleSilenceConditionsConditionsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmSilenceRuleSilenceConditionsConditions[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmSilenceRuleSilenceConditionsConditionsOutputReference {
    return new AomAlarmSilenceRuleSilenceConditionsConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmSilenceRuleSilenceConditions {
  /**
  * conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#conditions AomAlarmSilenceRule#conditions}
  */
  readonly conditions: AomAlarmSilenceRuleSilenceConditionsConditions[] | cdktf.IResolvable;
}

export function aomAlarmSilenceRuleSilenceConditionsToTerraform(struct?: AomAlarmSilenceRuleSilenceConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    conditions: cdktf.listMapper(aomAlarmSilenceRuleSilenceConditionsConditionsToTerraform, true)(struct!.conditions),
  }
}


export function aomAlarmSilenceRuleSilenceConditionsToHclTerraform(struct?: AomAlarmSilenceRuleSilenceConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    conditions: {
      value: cdktf.listMapperHcl(aomAlarmSilenceRuleSilenceConditionsConditionsToHclTerraform, true)(struct!.conditions),
      isBlock: true,
      type: "list",
      storageClassType: "AomAlarmSilenceRuleSilenceConditionsConditionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomAlarmSilenceRuleSilenceConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomAlarmSilenceRuleSilenceConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._conditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.conditions = this._conditions?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmSilenceRuleSilenceConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._conditions.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._conditions.internalValue = value.conditions;
    }
  }

  // conditions - computed: false, optional: false, required: true
  private _conditions = new AomAlarmSilenceRuleSilenceConditionsConditionsList(this, "conditions", false);
  public get conditions() {
    return this._conditions;
  }
  public putConditions(value: AomAlarmSilenceRuleSilenceConditionsConditions[] | cdktf.IResolvable) {
    this._conditions.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get conditionsInput() {
    return this._conditions.internalValue;
  }
}

export class AomAlarmSilenceRuleSilenceConditionsList extends cdktf.ComplexList {
  public internalValue? : AomAlarmSilenceRuleSilenceConditions[] | cdktf.IResolvable

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
  public get(index: number): AomAlarmSilenceRuleSilenceConditionsOutputReference {
    return new AomAlarmSilenceRuleSilenceConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomAlarmSilenceRuleSilenceTime {
  /**
  * Specifies the end time of the silence rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#ends_at AomAlarmSilenceRule#ends_at}
  */
  readonly endsAt?: number;
  /**
  * Specifies the silence time of the rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#scope AomAlarmSilenceRule#scope}
  */
  readonly scope?: number[];
  /**
  * Specifies the start time of the silence rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#starts_at AomAlarmSilenceRule#starts_at}
  */
  readonly startsAt: number;
  /**
  * Specifies the effective time type of the silence rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#type AomAlarmSilenceRule#type}
  */
  readonly type: string;
}

export function aomAlarmSilenceRuleSilenceTimeToTerraform(struct?: AomAlarmSilenceRuleSilenceTimeOutputReference | AomAlarmSilenceRuleSilenceTime): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    ends_at: cdktf.numberToTerraform(struct!.endsAt),
    scope: cdktf.listMapper(cdktf.numberToTerraform, false)(struct!.scope),
    starts_at: cdktf.numberToTerraform(struct!.startsAt),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function aomAlarmSilenceRuleSilenceTimeToHclTerraform(struct?: AomAlarmSilenceRuleSilenceTimeOutputReference | AomAlarmSilenceRuleSilenceTime): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    ends_at: {
      value: cdktf.numberToHclTerraform(struct!.endsAt),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    scope: {
      value: cdktf.listMapperHcl(cdktf.numberToHclTerraform, false)(struct!.scope),
      isBlock: false,
      type: "list",
      storageClassType: "numberList",
    },
    starts_at: {
      value: cdktf.numberToHclTerraform(struct!.startsAt),
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

export class AomAlarmSilenceRuleSilenceTimeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AomAlarmSilenceRuleSilenceTime | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._endsAt !== undefined) {
      hasAnyValues = true;
      internalValueResult.endsAt = this._endsAt;
    }
    if (this._scope !== undefined) {
      hasAnyValues = true;
      internalValueResult.scope = this._scope;
    }
    if (this._startsAt !== undefined) {
      hasAnyValues = true;
      internalValueResult.startsAt = this._startsAt;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomAlarmSilenceRuleSilenceTime | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._endsAt = undefined;
      this._scope = undefined;
      this._startsAt = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._endsAt = value.endsAt;
      this._scope = value.scope;
      this._startsAt = value.startsAt;
      this._type = value.type;
    }
  }

  // ends_at - computed: true, optional: true, required: false
  private _endsAt?: number; 
  public get endsAt() {
    return this.getNumberAttribute('ends_at');
  }
  public set endsAt(value: number) {
    this._endsAt = value;
  }
  public resetEndsAt() {
    this._endsAt = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endsAtInput() {
    return this._endsAt;
  }

  // scope - computed: true, optional: true, required: false
  private _scope?: number[]; 
  public get scope() {
    return this.getNumberListAttribute('scope');
  }
  public set scope(value: number[]) {
    this._scope = value;
  }
  public resetScope() {
    this._scope = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scopeInput() {
    return this._scope;
  }

  // starts_at - computed: false, optional: false, required: true
  private _startsAt?: number; 
  public get startsAt() {
    return this.getNumberAttribute('starts_at');
  }
  public set startsAt(value: number) {
    this._startsAt = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startsAtInput() {
    return this._startsAt;
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

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule huaweicloud_aom_alarm_silence_rule}
*/
export class AomAlarmSilenceRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_alarm_silence_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AomAlarmSilenceRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AomAlarmSilenceRule to import
  * @param importFromId The id of the existing AomAlarmSilenceRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AomAlarmSilenceRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_alarm_silence_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_alarm_silence_rule huaweicloud_aom_alarm_silence_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AomAlarmSilenceRuleConfig
  */
  public constructor(scope: Construct, id: string, config: AomAlarmSilenceRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_alarm_silence_rule',
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
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._timeZone = config.timeZone;
    this._silenceConditions.internalValue = config.silenceConditions;
    this._silenceTime.internalValue = config.silenceTime;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getNumberAttribute('created_at');
  }

  // description - computed: true, optional: true, required: false
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

  // time_zone - computed: false, optional: false, required: true
  private _timeZone?: string; 
  public get timeZone() {
    return this.getStringAttribute('time_zone');
  }
  public set timeZone(value: string) {
    this._timeZone = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeZoneInput() {
    return this._timeZone;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getNumberAttribute('updated_at');
  }

  // silence_conditions - computed: false, optional: false, required: true
  private _silenceConditions = new AomAlarmSilenceRuleSilenceConditionsList(this, "silence_conditions", false);
  public get silenceConditions() {
    return this._silenceConditions;
  }
  public putSilenceConditions(value: AomAlarmSilenceRuleSilenceConditions[] | cdktf.IResolvable) {
    this._silenceConditions.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get silenceConditionsInput() {
    return this._silenceConditions.internalValue;
  }

  // silence_time - computed: false, optional: false, required: true
  private _silenceTime = new AomAlarmSilenceRuleSilenceTimeOutputReference(this, "silence_time");
  public get silenceTime() {
    return this._silenceTime;
  }
  public putSilenceTime(value: AomAlarmSilenceRuleSilenceTime) {
    this._silenceTime.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get silenceTimeInput() {
    return this._silenceTime.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      time_zone: cdktf.stringToTerraform(this._timeZone),
      silence_conditions: cdktf.listMapper(aomAlarmSilenceRuleSilenceConditionsToTerraform, true)(this._silenceConditions.internalValue),
      silence_time: aomAlarmSilenceRuleSilenceTimeToTerraform(this._silenceTime.internalValue),
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
      time_zone: {
        value: cdktf.stringToHclTerraform(this._timeZone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      silence_conditions: {
        value: cdktf.listMapperHcl(aomAlarmSilenceRuleSilenceConditionsToHclTerraform, true)(this._silenceConditions.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AomAlarmSilenceRuleSilenceConditionsList",
      },
      silence_time: {
        value: aomAlarmSilenceRuleSilenceTimeToHclTerraform(this._silenceTime.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AomAlarmSilenceRuleSilenceTimeList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

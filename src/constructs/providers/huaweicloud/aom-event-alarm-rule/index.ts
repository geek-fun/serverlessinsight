// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AomEventAlarmRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the action rule name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#action_rule AomEventAlarmRule#action_rule}
  */
  readonly actionRule?: string;
  /**
  * Specifies the alarm source of the rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#alarm_source AomEventAlarmRule#alarm_source}
  */
  readonly alarmSource: string;
  /**
  * Specifies the alarm type of the rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#alarm_type AomEventAlarmRule#alarm_type}
  */
  readonly alarmType: string;
  /**
  * Specifies the comparison condition of alarm.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#comparison_operator AomEventAlarmRule#comparison_operator}
  */
  readonly comparisonOperator?: string;
  /**
  * Specifies the description of the rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#description AomEventAlarmRule#description}
  */
  readonly description?: string;
  /**
  * Specifies whether the rule is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#enabled AomEventAlarmRule#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * Specifies the route grouping rule name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#grouping_rule AomEventAlarmRule#grouping_rule}
  */
  readonly groupingRule?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#id AomEventAlarmRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the name of the rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#name AomEventAlarmRule#name}
  */
  readonly name: string;
  /**
  * Specifies the monitoring period in seconds.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#period AomEventAlarmRule#period}
  */
  readonly period?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#region AomEventAlarmRule#region}
  */
  readonly region?: string;
  /**
  * Specifies the select object of the rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#select_object AomEventAlarmRule#select_object}
  */
  readonly selectObject: { [key: string]: string };
  /**
  * Specifies the accumulated times to trigger the alarm.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#trigger_count AomEventAlarmRule#trigger_count}
  */
  readonly triggerCount?: number;
  /**
  * Specifies the trigger type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#trigger_type AomEventAlarmRule#trigger_type}
  */
  readonly triggerType: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule huaweicloud_aom_event_alarm_rule}
*/
export class AomEventAlarmRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_event_alarm_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AomEventAlarmRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AomEventAlarmRule to import
  * @param importFromId The id of the existing AomEventAlarmRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AomEventAlarmRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_event_alarm_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_event_alarm_rule huaweicloud_aom_event_alarm_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AomEventAlarmRuleConfig
  */
  public constructor(scope: Construct, id: string, config: AomEventAlarmRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_event_alarm_rule',
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
    this._actionRule = config.actionRule;
    this._alarmSource = config.alarmSource;
    this._alarmType = config.alarmType;
    this._comparisonOperator = config.comparisonOperator;
    this._description = config.description;
    this._enabled = config.enabled;
    this._groupingRule = config.groupingRule;
    this._id = config.id;
    this._name = config.name;
    this._period = config.period;
    this._region = config.region;
    this._selectObject = config.selectObject;
    this._triggerCount = config.triggerCount;
    this._triggerType = config.triggerType;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // action_rule - computed: true, optional: true, required: false
  private _actionRule?: string; 
  public get actionRule() {
    return this.getStringAttribute('action_rule');
  }
  public set actionRule(value: string) {
    this._actionRule = value;
  }
  public resetActionRule() {
    this._actionRule = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get actionRuleInput() {
    return this._actionRule;
  }

  // alarm_source - computed: false, optional: false, required: true
  private _alarmSource?: string; 
  public get alarmSource() {
    return this.getStringAttribute('alarm_source');
  }
  public set alarmSource(value: string) {
    this._alarmSource = value;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmSourceInput() {
    return this._alarmSource;
  }

  // alarm_type - computed: false, optional: false, required: true
  private _alarmType?: string; 
  public get alarmType() {
    return this.getStringAttribute('alarm_type');
  }
  public set alarmType(value: string) {
    this._alarmType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get alarmTypeInput() {
    return this._alarmType;
  }

  // comparison_operator - computed: true, optional: true, required: false
  private _comparisonOperator?: string; 
  public get comparisonOperator() {
    return this.getStringAttribute('comparison_operator');
  }
  public set comparisonOperator(value: string) {
    this._comparisonOperator = value;
  }
  public resetComparisonOperator() {
    this._comparisonOperator = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get comparisonOperatorInput() {
    return this._comparisonOperator;
  }

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

  // grouping_rule - computed: true, optional: true, required: false
  private _groupingRule?: string; 
  public get groupingRule() {
    return this.getStringAttribute('grouping_rule');
  }
  public set groupingRule(value: string) {
    this._groupingRule = value;
  }
  public resetGroupingRule() {
    this._groupingRule = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get groupingRuleInput() {
    return this._groupingRule;
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

  // period - computed: false, optional: true, required: false
  private _period?: number; 
  public get period() {
    return this.getNumberAttribute('period');
  }
  public set period(value: number) {
    this._period = value;
  }
  public resetPeriod() {
    this._period = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodInput() {
    return this._period;
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

  // select_object - computed: false, optional: false, required: true
  private _selectObject?: { [key: string]: string }; 
  public get selectObject() {
    return this.getStringMapAttribute('select_object');
  }
  public set selectObject(value: { [key: string]: string }) {
    this._selectObject = value;
  }
  // Temporarily expose input value. Use with caution.
  public get selectObjectInput() {
    return this._selectObject;
  }

  // trigger_count - computed: false, optional: true, required: false
  private _triggerCount?: number; 
  public get triggerCount() {
    return this.getNumberAttribute('trigger_count');
  }
  public set triggerCount(value: number) {
    this._triggerCount = value;
  }
  public resetTriggerCount() {
    this._triggerCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerCountInput() {
    return this._triggerCount;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getNumberAttribute('updated_at');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      action_rule: cdktf.stringToTerraform(this._actionRule),
      alarm_source: cdktf.stringToTerraform(this._alarmSource),
      alarm_type: cdktf.stringToTerraform(this._alarmType),
      comparison_operator: cdktf.stringToTerraform(this._comparisonOperator),
      description: cdktf.stringToTerraform(this._description),
      enabled: cdktf.booleanToTerraform(this._enabled),
      grouping_rule: cdktf.stringToTerraform(this._groupingRule),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      period: cdktf.numberToTerraform(this._period),
      region: cdktf.stringToTerraform(this._region),
      select_object: cdktf.hashMapper(cdktf.stringToTerraform)(this._selectObject),
      trigger_count: cdktf.numberToTerraform(this._triggerCount),
      trigger_type: cdktf.stringToTerraform(this._triggerType),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      action_rule: {
        value: cdktf.stringToHclTerraform(this._actionRule),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      alarm_source: {
        value: cdktf.stringToHclTerraform(this._alarmSource),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      alarm_type: {
        value: cdktf.stringToHclTerraform(this._alarmType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      comparison_operator: {
        value: cdktf.stringToHclTerraform(this._comparisonOperator),
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
      enabled: {
        value: cdktf.booleanToHclTerraform(this._enabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      grouping_rule: {
        value: cdktf.stringToHclTerraform(this._groupingRule),
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
      period: {
        value: cdktf.numberToHclTerraform(this._period),
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
      select_object: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._selectObject),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      trigger_count: {
        value: cdktf.numberToHclTerraform(this._triggerCount),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      trigger_type: {
        value: cdktf.stringToHclTerraform(this._triggerType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

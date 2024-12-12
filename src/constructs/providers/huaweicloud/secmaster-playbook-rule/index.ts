// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SecmasterPlaybookRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the cron expression.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#cron SecmasterPlaybookRule#cron}
  */
  readonly cron?: string;
  /**
  * Specifies the playbook end time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#end_time SecmasterPlaybookRule#end_time}
  */
  readonly endTime?: string;
  /**
  * Specifies the playbook end type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#end_type SecmasterPlaybookRule#end_type}
  */
  readonly endType?: string;
  /**
  * Specifies the execution type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#execution_type SecmasterPlaybookRule#execution_type}
  */
  readonly executionType?: string;
  /**
  * Specifies the expression type of the rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#expression_type SecmasterPlaybookRule#expression_type}
  */
  readonly expressionType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#id SecmasterPlaybookRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the logics of the rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#logics SecmasterPlaybookRule#logics}
  */
  readonly logics?: string[];
  /**
  * Specifies the repeat range.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#only_once SecmasterPlaybookRule#only_once}
  */
  readonly onlyOnce?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#region SecmasterPlaybookRule#region}
  */
  readonly region?: string;
  /**
  * Specifies the repeat range.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#repeat_range SecmasterPlaybookRule#repeat_range}
  */
  readonly repeatRange?: string;
  /**
  * Specifies the schedule type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#schedule_type SecmasterPlaybookRule#schedule_type}
  */
  readonly scheduleType?: string;
  /**
  * Specifies the playbook start type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#start_type SecmasterPlaybookRule#start_type}
  */
  readonly startType?: string;
  /**
  * Specifies the playbook version ID of the rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#version_id SecmasterPlaybookRule#version_id}
  */
  readonly versionId: string;
  /**
  * Specifies the ID of the workspace to which the playbook rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#workspace_id SecmasterPlaybookRule#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#conditions SecmasterPlaybookRule#conditions}
  */
  readonly conditions?: SecmasterPlaybookRuleConditions[] | cdktf.IResolvable;
}
export interface SecmasterPlaybookRuleConditions {
  /**
  * Specifies the condition data.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#data SecmasterPlaybookRule#data}
  */
  readonly data?: string[];
  /**
  * Specifies the condition detail.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#detail SecmasterPlaybookRule#detail}
  */
  readonly detail?: string;
  /**
  * Specifies the condition name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#name SecmasterPlaybookRule#name}
  */
  readonly name?: string;
}

export function secmasterPlaybookRuleConditionsToTerraform(struct?: SecmasterPlaybookRuleConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    data: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.data),
    detail: cdktf.stringToTerraform(struct!.detail),
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function secmasterPlaybookRuleConditionsToHclTerraform(struct?: SecmasterPlaybookRuleConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    data: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.data),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    detail: {
      value: cdktf.stringToHclTerraform(struct!.detail),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class SecmasterPlaybookRuleConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): SecmasterPlaybookRuleConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._data !== undefined) {
      hasAnyValues = true;
      internalValueResult.data = this._data;
    }
    if (this._detail !== undefined) {
      hasAnyValues = true;
      internalValueResult.detail = this._detail;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: SecmasterPlaybookRuleConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._data = undefined;
      this._detail = undefined;
      this._name = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._data = value.data;
      this._detail = value.detail;
      this._name = value.name;
    }
  }

  // data - computed: true, optional: true, required: false
  private _data?: string[]; 
  public get data() {
    return this.getListAttribute('data');
  }
  public set data(value: string[]) {
    this._data = value;
  }
  public resetData() {
    this._data = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataInput() {
    return this._data;
  }

  // detail - computed: true, optional: true, required: false
  private _detail?: string; 
  public get detail() {
    return this.getStringAttribute('detail');
  }
  public set detail(value: string) {
    this._detail = value;
  }
  public resetDetail() {
    this._detail = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get detailInput() {
    return this._detail;
  }

  // name - computed: true, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }
}

export class SecmasterPlaybookRuleConditionsList extends cdktf.ComplexList {
  public internalValue? : SecmasterPlaybookRuleConditions[] | cdktf.IResolvable

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
  public get(index: number): SecmasterPlaybookRuleConditionsOutputReference {
    return new SecmasterPlaybookRuleConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule huaweicloud_secmaster_playbook_rule}
*/
export class SecmasterPlaybookRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_playbook_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SecmasterPlaybookRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SecmasterPlaybookRule to import
  * @param importFromId The id of the existing SecmasterPlaybookRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SecmasterPlaybookRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_playbook_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_rule huaweicloud_secmaster_playbook_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SecmasterPlaybookRuleConfig
  */
  public constructor(scope: Construct, id: string, config: SecmasterPlaybookRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_playbook_rule',
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
    this._cron = config.cron;
    this._endTime = config.endTime;
    this._endType = config.endType;
    this._executionType = config.executionType;
    this._expressionType = config.expressionType;
    this._id = config.id;
    this._logics = config.logics;
    this._onlyOnce = config.onlyOnce;
    this._region = config.region;
    this._repeatRange = config.repeatRange;
    this._scheduleType = config.scheduleType;
    this._startType = config.startType;
    this._versionId = config.versionId;
    this._workspaceId = config.workspaceId;
    this._conditions.internalValue = config.conditions;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // cron - computed: true, optional: true, required: false
  private _cron?: string; 
  public get cron() {
    return this.getStringAttribute('cron');
  }
  public set cron(value: string) {
    this._cron = value;
  }
  public resetCron() {
    this._cron = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cronInput() {
    return this._cron;
  }

  // end_time - computed: true, optional: true, required: false
  private _endTime?: string; 
  public get endTime() {
    return this.getStringAttribute('end_time');
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
  public resetEndTime() {
    this._endTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endTimeInput() {
    return this._endTime;
  }

  // end_type - computed: true, optional: true, required: false
  private _endType?: string; 
  public get endType() {
    return this.getStringAttribute('end_type');
  }
  public set endType(value: string) {
    this._endType = value;
  }
  public resetEndType() {
    this._endType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endTypeInput() {
    return this._endType;
  }

  // execution_type - computed: true, optional: true, required: false
  private _executionType?: string; 
  public get executionType() {
    return this.getStringAttribute('execution_type');
  }
  public set executionType(value: string) {
    this._executionType = value;
  }
  public resetExecutionType() {
    this._executionType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get executionTypeInput() {
    return this._executionType;
  }

  // expression_type - computed: true, optional: true, required: false
  private _expressionType?: string; 
  public get expressionType() {
    return this.getStringAttribute('expression_type');
  }
  public set expressionType(value: string) {
    this._expressionType = value;
  }
  public resetExpressionType() {
    this._expressionType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expressionTypeInput() {
    return this._expressionType;
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

  // logics - computed: true, optional: true, required: false
  private _logics?: string[]; 
  public get logics() {
    return this.getListAttribute('logics');
  }
  public set logics(value: string[]) {
    this._logics = value;
  }
  public resetLogics() {
    this._logics = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logicsInput() {
    return this._logics;
  }

  // only_once - computed: true, optional: true, required: false
  private _onlyOnce?: boolean | cdktf.IResolvable; 
  public get onlyOnce() {
    return this.getBooleanAttribute('only_once');
  }
  public set onlyOnce(value: boolean | cdktf.IResolvable) {
    this._onlyOnce = value;
  }
  public resetOnlyOnce() {
    this._onlyOnce = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get onlyOnceInput() {
    return this._onlyOnce;
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

  // repeat_range - computed: true, optional: true, required: false
  private _repeatRange?: string; 
  public get repeatRange() {
    return this.getStringAttribute('repeat_range');
  }
  public set repeatRange(value: string) {
    this._repeatRange = value;
  }
  public resetRepeatRange() {
    this._repeatRange = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get repeatRangeInput() {
    return this._repeatRange;
  }

  // schedule_type - computed: true, optional: true, required: false
  private _scheduleType?: string; 
  public get scheduleType() {
    return this.getStringAttribute('schedule_type');
  }
  public set scheduleType(value: string) {
    this._scheduleType = value;
  }
  public resetScheduleType() {
    this._scheduleType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scheduleTypeInput() {
    return this._scheduleType;
  }

  // start_type - computed: true, optional: true, required: false
  private _startType?: string; 
  public get startType() {
    return this.getStringAttribute('start_type');
  }
  public set startType(value: string) {
    this._startType = value;
  }
  public resetStartType() {
    this._startType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get startTypeInput() {
    return this._startType;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // version_id - computed: false, optional: false, required: true
  private _versionId?: string; 
  public get versionId() {
    return this.getStringAttribute('version_id');
  }
  public set versionId(value: string) {
    this._versionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get versionIdInput() {
    return this._versionId;
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

  // conditions - computed: false, optional: true, required: false
  private _conditions = new SecmasterPlaybookRuleConditionsList(this, "conditions", false);
  public get conditions() {
    return this._conditions;
  }
  public putConditions(value: SecmasterPlaybookRuleConditions[] | cdktf.IResolvable) {
    this._conditions.internalValue = value;
  }
  public resetConditions() {
    this._conditions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get conditionsInput() {
    return this._conditions.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cron: cdktf.stringToTerraform(this._cron),
      end_time: cdktf.stringToTerraform(this._endTime),
      end_type: cdktf.stringToTerraform(this._endType),
      execution_type: cdktf.stringToTerraform(this._executionType),
      expression_type: cdktf.stringToTerraform(this._expressionType),
      id: cdktf.stringToTerraform(this._id),
      logics: cdktf.listMapper(cdktf.stringToTerraform, false)(this._logics),
      only_once: cdktf.booleanToTerraform(this._onlyOnce),
      region: cdktf.stringToTerraform(this._region),
      repeat_range: cdktf.stringToTerraform(this._repeatRange),
      schedule_type: cdktf.stringToTerraform(this._scheduleType),
      start_type: cdktf.stringToTerraform(this._startType),
      version_id: cdktf.stringToTerraform(this._versionId),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      conditions: cdktf.listMapper(secmasterPlaybookRuleConditionsToTerraform, true)(this._conditions.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cron: {
        value: cdktf.stringToHclTerraform(this._cron),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      end_time: {
        value: cdktf.stringToHclTerraform(this._endTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      end_type: {
        value: cdktf.stringToHclTerraform(this._endType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      execution_type: {
        value: cdktf.stringToHclTerraform(this._executionType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      expression_type: {
        value: cdktf.stringToHclTerraform(this._expressionType),
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
      logics: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._logics),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      only_once: {
        value: cdktf.booleanToHclTerraform(this._onlyOnce),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      repeat_range: {
        value: cdktf.stringToHclTerraform(this._repeatRange),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      schedule_type: {
        value: cdktf.stringToHclTerraform(this._scheduleType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      start_type: {
        value: cdktf.stringToHclTerraform(this._startType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      version_id: {
        value: cdktf.stringToHclTerraform(this._versionId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      conditions: {
        value: cdktf.listMapperHcl(secmasterPlaybookRuleConditionsToHclTerraform, true)(this._conditions.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "SecmasterPlaybookRuleConditionsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

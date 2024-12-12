// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WafRuleCcProtectionConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies whether to enable global counting. Default to false.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#all_waf_instances WafRuleCcProtection#all_waf_instances}
  */
  readonly allWafInstances?: boolean | cdktf.IResolvable;
  /**
  * Specifies the type of the returned page.
  * The options are **application/json**, **text/html** and **text/xml**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#block_page_type WafRuleCcProtection#block_page_type}
  */
  readonly blockPageType?: string;
  /**
  * Specifies the description of WAF cc protection rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#description WafRuleCcProtection#description}
  */
  readonly description?: string;
  /**
  * Specifies the enterprise project ID of WAF cc protection rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#enterprise_project_id WafRuleCcProtection#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#id WafRuleCcProtection#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the number of requests allowed from a web visitor in a rate limiting period.
  * The value ranges from 1 to 2,147,483,647.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#limit_num WafRuleCcProtection#limit_num}
  */
  readonly limitNum: number;
  /**
  * Specifies the rate limiting period. The value ranges from 1 to 3,600 in seconds.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#limit_period WafRuleCcProtection#limit_period}
  */
  readonly limitPeriod: number;
  /**
  * Specifies the lock time for resuming normal page access after blocking can be set.
  * The value ranges from 0 to 65,535 in seconds.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#lock_time WafRuleCcProtection#lock_time}
  */
  readonly lockTime?: number;
  /**
  * Specifies the rule name of WAF cc protection rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#name WafRuleCcProtection#name}
  */
  readonly name: string;
  /**
  * Specifies the other user identifier.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#other_user_identifier WafRuleCcProtection#other_user_identifier}
  */
  readonly otherUserIdentifier?: string;
  /**
  * Specifies the content of the returned page.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#page_content WafRuleCcProtection#page_content}
  */
  readonly pageContent?: string;
  /**
  * Specifies the policy ID of WAF cc protection rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#policy_id WafRuleCcProtection#policy_id}
  */
  readonly policyId: string;
  /**
  * Specifies the protective action taken when the number of requests reaches the upper limit.
  * The value can be **captcha**, **block**, **log** or **dynamic_block**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#protective_action WafRuleCcProtection#protective_action}
  */
  readonly protectiveAction: string;
  /**
  * Specifies the rate limit mode.
  * Valid values are **ip**, **cookie**, **header**, **other**, **policy**, **domain**, **url**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#rate_limit_mode WafRuleCcProtection#rate_limit_mode}
  */
  readonly rateLimitMode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#region WafRuleCcProtection#region}
  */
  readonly region?: string;
  /**
  * Specifies whether to enable domain aggregation statistics. Default to false.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#request_aggregation WafRuleCcProtection#request_aggregation}
  */
  readonly requestAggregation?: boolean | cdktf.IResolvable;
  /**
  * The status of a cc protection rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#status WafRuleCcProtection#status}
  */
  readonly status?: number;
  /**
  * Specifies the allowable frequency. The value ranges from 0 to 2,147,483,647.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#unlock_num WafRuleCcProtection#unlock_num}
  */
  readonly unlockNum?: number;
  /**
  * Specifies the user identifier.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#user_identifier WafRuleCcProtection#user_identifier}
  */
  readonly userIdentifier?: string;
  /**
  * conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#conditions WafRuleCcProtection#conditions}
  */
  readonly conditions: WafRuleCcProtectionConditions[] | cdktf.IResolvable;
}
export interface WafRuleCcProtectionConditions {
  /**
  * Specifies the content of the match condition.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#content WafRuleCcProtection#content}
  */
  readonly content?: string;
  /**
  * Specifies the field type.
  * The value can be **url**, **ip**, **ipv6**, **params**, **cookie**, **header** or **response_code**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#field WafRuleCcProtection#field}
  */
  readonly field: string;
  /**
  * Specifies the condition matching logic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#logic WafRuleCcProtection#logic}
  */
  readonly logic: string;
  /**
  * Specifies the reference table id.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#reference_table_id WafRuleCcProtection#reference_table_id}
  */
  readonly referenceTableId?: string;
  /**
  * Specifies the subfield of the condition.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#subfield WafRuleCcProtection#subfield}
  */
  readonly subfield?: string;
}

export function wafRuleCcProtectionConditionsToTerraform(struct?: WafRuleCcProtectionConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    content: cdktf.stringToTerraform(struct!.content),
    field: cdktf.stringToTerraform(struct!.field),
    logic: cdktf.stringToTerraform(struct!.logic),
    reference_table_id: cdktf.stringToTerraform(struct!.referenceTableId),
    subfield: cdktf.stringToTerraform(struct!.subfield),
  }
}


export function wafRuleCcProtectionConditionsToHclTerraform(struct?: WafRuleCcProtectionConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    content: {
      value: cdktf.stringToHclTerraform(struct!.content),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    field: {
      value: cdktf.stringToHclTerraform(struct!.field),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    logic: {
      value: cdktf.stringToHclTerraform(struct!.logic),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    reference_table_id: {
      value: cdktf.stringToHclTerraform(struct!.referenceTableId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    subfield: {
      value: cdktf.stringToHclTerraform(struct!.subfield),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafRuleCcProtectionConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): WafRuleCcProtectionConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._content !== undefined) {
      hasAnyValues = true;
      internalValueResult.content = this._content;
    }
    if (this._field !== undefined) {
      hasAnyValues = true;
      internalValueResult.field = this._field;
    }
    if (this._logic !== undefined) {
      hasAnyValues = true;
      internalValueResult.logic = this._logic;
    }
    if (this._referenceTableId !== undefined) {
      hasAnyValues = true;
      internalValueResult.referenceTableId = this._referenceTableId;
    }
    if (this._subfield !== undefined) {
      hasAnyValues = true;
      internalValueResult.subfield = this._subfield;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafRuleCcProtectionConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._content = undefined;
      this._field = undefined;
      this._logic = undefined;
      this._referenceTableId = undefined;
      this._subfield = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._content = value.content;
      this._field = value.field;
      this._logic = value.logic;
      this._referenceTableId = value.referenceTableId;
      this._subfield = value.subfield;
    }
  }

  // content - computed: true, optional: true, required: false
  private _content?: string; 
  public get content() {
    return this.getStringAttribute('content');
  }
  public set content(value: string) {
    this._content = value;
  }
  public resetContent() {
    this._content = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contentInput() {
    return this._content;
  }

  // field - computed: false, optional: false, required: true
  private _field?: string; 
  public get field() {
    return this.getStringAttribute('field');
  }
  public set field(value: string) {
    this._field = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldInput() {
    return this._field;
  }

  // logic - computed: false, optional: false, required: true
  private _logic?: string; 
  public get logic() {
    return this.getStringAttribute('logic');
  }
  public set logic(value: string) {
    this._logic = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logicInput() {
    return this._logic;
  }

  // reference_table_id - computed: false, optional: true, required: false
  private _referenceTableId?: string; 
  public get referenceTableId() {
    return this.getStringAttribute('reference_table_id');
  }
  public set referenceTableId(value: string) {
    this._referenceTableId = value;
  }
  public resetReferenceTableId() {
    this._referenceTableId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get referenceTableIdInput() {
    return this._referenceTableId;
  }

  // subfield - computed: false, optional: true, required: false
  private _subfield?: string; 
  public get subfield() {
    return this.getStringAttribute('subfield');
  }
  public set subfield(value: string) {
    this._subfield = value;
  }
  public resetSubfield() {
    this._subfield = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subfieldInput() {
    return this._subfield;
  }
}

export class WafRuleCcProtectionConditionsList extends cdktf.ComplexList {
  public internalValue? : WafRuleCcProtectionConditions[] | cdktf.IResolvable

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
  public get(index: number): WafRuleCcProtectionConditionsOutputReference {
    return new WafRuleCcProtectionConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection huaweicloud_waf_rule_cc_protection}
*/
export class WafRuleCcProtection extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_waf_rule_cc_protection";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WafRuleCcProtection resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WafRuleCcProtection to import
  * @param importFromId The id of the existing WafRuleCcProtection that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WafRuleCcProtection to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_waf_rule_cc_protection", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_cc_protection huaweicloud_waf_rule_cc_protection} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WafRuleCcProtectionConfig
  */
  public constructor(scope: Construct, id: string, config: WafRuleCcProtectionConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_waf_rule_cc_protection',
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
    this._allWafInstances = config.allWafInstances;
    this._blockPageType = config.blockPageType;
    this._description = config.description;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._limitNum = config.limitNum;
    this._limitPeriod = config.limitPeriod;
    this._lockTime = config.lockTime;
    this._name = config.name;
    this._otherUserIdentifier = config.otherUserIdentifier;
    this._pageContent = config.pageContent;
    this._policyId = config.policyId;
    this._protectiveAction = config.protectiveAction;
    this._rateLimitMode = config.rateLimitMode;
    this._region = config.region;
    this._requestAggregation = config.requestAggregation;
    this._status = config.status;
    this._unlockNum = config.unlockNum;
    this._userIdentifier = config.userIdentifier;
    this._conditions.internalValue = config.conditions;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // all_waf_instances - computed: true, optional: true, required: false
  private _allWafInstances?: boolean | cdktf.IResolvable; 
  public get allWafInstances() {
    return this.getBooleanAttribute('all_waf_instances');
  }
  public set allWafInstances(value: boolean | cdktf.IResolvable) {
    this._allWafInstances = value;
  }
  public resetAllWafInstances() {
    this._allWafInstances = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get allWafInstancesInput() {
    return this._allWafInstances;
  }

  // block_page_type - computed: false, optional: true, required: false
  private _blockPageType?: string; 
  public get blockPageType() {
    return this.getStringAttribute('block_page_type');
  }
  public set blockPageType(value: string) {
    this._blockPageType = value;
  }
  public resetBlockPageType() {
    this._blockPageType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get blockPageTypeInput() {
    return this._blockPageType;
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

  // limit_num - computed: false, optional: false, required: true
  private _limitNum?: number; 
  public get limitNum() {
    return this.getNumberAttribute('limit_num');
  }
  public set limitNum(value: number) {
    this._limitNum = value;
  }
  // Temporarily expose input value. Use with caution.
  public get limitNumInput() {
    return this._limitNum;
  }

  // limit_period - computed: false, optional: false, required: true
  private _limitPeriod?: number; 
  public get limitPeriod() {
    return this.getNumberAttribute('limit_period');
  }
  public set limitPeriod(value: number) {
    this._limitPeriod = value;
  }
  // Temporarily expose input value. Use with caution.
  public get limitPeriodInput() {
    return this._limitPeriod;
  }

  // lock_time - computed: false, optional: true, required: false
  private _lockTime?: number; 
  public get lockTime() {
    return this.getNumberAttribute('lock_time');
  }
  public set lockTime(value: number) {
    this._lockTime = value;
  }
  public resetLockTime() {
    this._lockTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lockTimeInput() {
    return this._lockTime;
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

  // other_user_identifier - computed: false, optional: true, required: false
  private _otherUserIdentifier?: string; 
  public get otherUserIdentifier() {
    return this.getStringAttribute('other_user_identifier');
  }
  public set otherUserIdentifier(value: string) {
    this._otherUserIdentifier = value;
  }
  public resetOtherUserIdentifier() {
    this._otherUserIdentifier = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get otherUserIdentifierInput() {
    return this._otherUserIdentifier;
  }

  // page_content - computed: false, optional: true, required: false
  private _pageContent?: string; 
  public get pageContent() {
    return this.getStringAttribute('page_content');
  }
  public set pageContent(value: string) {
    this._pageContent = value;
  }
  public resetPageContent() {
    this._pageContent = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pageContentInput() {
    return this._pageContent;
  }

  // policy_id - computed: false, optional: false, required: true
  private _policyId?: string; 
  public get policyId() {
    return this.getStringAttribute('policy_id');
  }
  public set policyId(value: string) {
    this._policyId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get policyIdInput() {
    return this._policyId;
  }

  // protective_action - computed: false, optional: false, required: true
  private _protectiveAction?: string; 
  public get protectiveAction() {
    return this.getStringAttribute('protective_action');
  }
  public set protectiveAction(value: string) {
    this._protectiveAction = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protectiveActionInput() {
    return this._protectiveAction;
  }

  // rate_limit_mode - computed: false, optional: false, required: true
  private _rateLimitMode?: string; 
  public get rateLimitMode() {
    return this.getStringAttribute('rate_limit_mode');
  }
  public set rateLimitMode(value: string) {
    this._rateLimitMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rateLimitModeInput() {
    return this._rateLimitMode;
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

  // request_aggregation - computed: true, optional: true, required: false
  private _requestAggregation?: boolean | cdktf.IResolvable; 
  public get requestAggregation() {
    return this.getBooleanAttribute('request_aggregation');
  }
  public set requestAggregation(value: boolean | cdktf.IResolvable) {
    this._requestAggregation = value;
  }
  public resetRequestAggregation() {
    this._requestAggregation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestAggregationInput() {
    return this._requestAggregation;
  }

  // status - computed: false, optional: true, required: false
  private _status?: number; 
  public get status() {
    return this.getNumberAttribute('status');
  }
  public set status(value: number) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // unlock_num - computed: false, optional: true, required: false
  private _unlockNum?: number; 
  public get unlockNum() {
    return this.getNumberAttribute('unlock_num');
  }
  public set unlockNum(value: number) {
    this._unlockNum = value;
  }
  public resetUnlockNum() {
    this._unlockNum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get unlockNumInput() {
    return this._unlockNum;
  }

  // user_identifier - computed: false, optional: true, required: false
  private _userIdentifier?: string; 
  public get userIdentifier() {
    return this.getStringAttribute('user_identifier');
  }
  public set userIdentifier(value: string) {
    this._userIdentifier = value;
  }
  public resetUserIdentifier() {
    this._userIdentifier = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userIdentifierInput() {
    return this._userIdentifier;
  }

  // conditions - computed: false, optional: false, required: true
  private _conditions = new WafRuleCcProtectionConditionsList(this, "conditions", false);
  public get conditions() {
    return this._conditions;
  }
  public putConditions(value: WafRuleCcProtectionConditions[] | cdktf.IResolvable) {
    this._conditions.internalValue = value;
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
      all_waf_instances: cdktf.booleanToTerraform(this._allWafInstances),
      block_page_type: cdktf.stringToTerraform(this._blockPageType),
      description: cdktf.stringToTerraform(this._description),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      limit_num: cdktf.numberToTerraform(this._limitNum),
      limit_period: cdktf.numberToTerraform(this._limitPeriod),
      lock_time: cdktf.numberToTerraform(this._lockTime),
      name: cdktf.stringToTerraform(this._name),
      other_user_identifier: cdktf.stringToTerraform(this._otherUserIdentifier),
      page_content: cdktf.stringToTerraform(this._pageContent),
      policy_id: cdktf.stringToTerraform(this._policyId),
      protective_action: cdktf.stringToTerraform(this._protectiveAction),
      rate_limit_mode: cdktf.stringToTerraform(this._rateLimitMode),
      region: cdktf.stringToTerraform(this._region),
      request_aggregation: cdktf.booleanToTerraform(this._requestAggregation),
      status: cdktf.numberToTerraform(this._status),
      unlock_num: cdktf.numberToTerraform(this._unlockNum),
      user_identifier: cdktf.stringToTerraform(this._userIdentifier),
      conditions: cdktf.listMapper(wafRuleCcProtectionConditionsToTerraform, true)(this._conditions.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      all_waf_instances: {
        value: cdktf.booleanToHclTerraform(this._allWafInstances),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      block_page_type: {
        value: cdktf.stringToHclTerraform(this._blockPageType),
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
      limit_num: {
        value: cdktf.numberToHclTerraform(this._limitNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      limit_period: {
        value: cdktf.numberToHclTerraform(this._limitPeriod),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      lock_time: {
        value: cdktf.numberToHclTerraform(this._lockTime),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      other_user_identifier: {
        value: cdktf.stringToHclTerraform(this._otherUserIdentifier),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      page_content: {
        value: cdktf.stringToHclTerraform(this._pageContent),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      policy_id: {
        value: cdktf.stringToHclTerraform(this._policyId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      protective_action: {
        value: cdktf.stringToHclTerraform(this._protectiveAction),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      rate_limit_mode: {
        value: cdktf.stringToHclTerraform(this._rateLimitMode),
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
      request_aggregation: {
        value: cdktf.booleanToHclTerraform(this._requestAggregation),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      status: {
        value: cdktf.numberToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      unlock_num: {
        value: cdktf.numberToHclTerraform(this._unlockNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      user_identifier: {
        value: cdktf.stringToHclTerraform(this._userIdentifier),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      conditions: {
        value: cdktf.listMapperHcl(wafRuleCcProtectionConditionsToHclTerraform, true)(this._conditions.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafRuleCcProtectionConditionsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

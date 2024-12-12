// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WafRuleGlobalProtectionWhitelistConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the advanced content.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#advanced_content WafRuleGlobalProtectionWhitelist#advanced_content}
  */
  readonly advancedContent?: string;
  /**
  * Specifies the advanced field. The following fields are supported:
  * **params**, **cookie**, **header**, **body** and **multipart**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#advanced_field WafRuleGlobalProtectionWhitelist#advanced_field}
  */
  readonly advancedField?: string;
  /**
  * Specifies the description of WAF global protection whitelist rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#description WafRuleGlobalProtectionWhitelist#description}
  */
  readonly description?: string;
  /**
  * Specifies the protected domain name bound with the policy or manually enter a single
  * domain name corresponding to the wildcard domain name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#domains WafRuleGlobalProtectionWhitelist#domains}
  */
  readonly domains: string[];
  /**
  * Specifies the enterprise project ID of WAF global protection whitelist rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#enterprise_project_id WafRuleGlobalProtectionWhitelist#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#id WafRuleGlobalProtectionWhitelist#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ignore waf protection rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#ignore_waf_protection WafRuleGlobalProtectionWhitelist#ignore_waf_protection}
  */
  readonly ignoreWafProtection: string;
  /**
  * Specifies the policy ID of WAF global protection whitelist rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#policy_id WafRuleGlobalProtectionWhitelist#policy_id}
  */
  readonly policyId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#region WafRuleGlobalProtectionWhitelist#region}
  */
  readonly region?: string;
  /**
  * Specifies the status of WAF global protection whitelist rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#status WafRuleGlobalProtectionWhitelist#status}
  */
  readonly status?: number;
  /**
  * conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#conditions WafRuleGlobalProtectionWhitelist#conditions}
  */
  readonly conditions: WafRuleGlobalProtectionWhitelistConditions[] | cdktf.IResolvable;
}
export interface WafRuleGlobalProtectionWhitelistConditions {
  /**
  * Specifies the content of the match condition.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#content WafRuleGlobalProtectionWhitelist#content}
  */
  readonly content: string;
  /**
  * Specifies the field type. The value can be **ip**, **url**, **params**, **cookie** 
  * or **header**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#field WafRuleGlobalProtectionWhitelist#field}
  */
  readonly field: string;
  /**
  * Specifies the condition matching logic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#logic WafRuleGlobalProtectionWhitelist#logic}
  */
  readonly logic: string;
  /**
  * Specifies the subfield of the condition.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#subfield WafRuleGlobalProtectionWhitelist#subfield}
  */
  readonly subfield?: string;
}

export function wafRuleGlobalProtectionWhitelistConditionsToTerraform(struct?: WafRuleGlobalProtectionWhitelistConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    content: cdktf.stringToTerraform(struct!.content),
    field: cdktf.stringToTerraform(struct!.field),
    logic: cdktf.stringToTerraform(struct!.logic),
    subfield: cdktf.stringToTerraform(struct!.subfield),
  }
}


export function wafRuleGlobalProtectionWhitelistConditionsToHclTerraform(struct?: WafRuleGlobalProtectionWhitelistConditions | cdktf.IResolvable): any {
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

export class WafRuleGlobalProtectionWhitelistConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): WafRuleGlobalProtectionWhitelistConditions | cdktf.IResolvable | undefined {
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
    if (this._subfield !== undefined) {
      hasAnyValues = true;
      internalValueResult.subfield = this._subfield;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafRuleGlobalProtectionWhitelistConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._content = undefined;
      this._field = undefined;
      this._logic = undefined;
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
      this._subfield = value.subfield;
    }
  }

  // content - computed: false, optional: false, required: true
  private _content?: string; 
  public get content() {
    return this.getStringAttribute('content');
  }
  public set content(value: string) {
    this._content = value;
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

  // subfield - computed: true, optional: true, required: false
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

export class WafRuleGlobalProtectionWhitelistConditionsList extends cdktf.ComplexList {
  public internalValue? : WafRuleGlobalProtectionWhitelistConditions[] | cdktf.IResolvable

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
  public get(index: number): WafRuleGlobalProtectionWhitelistConditionsOutputReference {
    return new WafRuleGlobalProtectionWhitelistConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist huaweicloud_waf_rule_global_protection_whitelist}
*/
export class WafRuleGlobalProtectionWhitelist extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_waf_rule_global_protection_whitelist";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WafRuleGlobalProtectionWhitelist resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WafRuleGlobalProtectionWhitelist to import
  * @param importFromId The id of the existing WafRuleGlobalProtectionWhitelist that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WafRuleGlobalProtectionWhitelist to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_waf_rule_global_protection_whitelist", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_rule_global_protection_whitelist huaweicloud_waf_rule_global_protection_whitelist} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WafRuleGlobalProtectionWhitelistConfig
  */
  public constructor(scope: Construct, id: string, config: WafRuleGlobalProtectionWhitelistConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_waf_rule_global_protection_whitelist',
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
    this._advancedContent = config.advancedContent;
    this._advancedField = config.advancedField;
    this._description = config.description;
    this._domains = config.domains;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._ignoreWafProtection = config.ignoreWafProtection;
    this._policyId = config.policyId;
    this._region = config.region;
    this._status = config.status;
    this._conditions.internalValue = config.conditions;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // advanced_content - computed: false, optional: true, required: false
  private _advancedContent?: string; 
  public get advancedContent() {
    return this.getStringAttribute('advanced_content');
  }
  public set advancedContent(value: string) {
    this._advancedContent = value;
  }
  public resetAdvancedContent() {
    this._advancedContent = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get advancedContentInput() {
    return this._advancedContent;
  }

  // advanced_field - computed: false, optional: true, required: false
  private _advancedField?: string; 
  public get advancedField() {
    return this.getStringAttribute('advanced_field');
  }
  public set advancedField(value: string) {
    this._advancedField = value;
  }
  public resetAdvancedField() {
    this._advancedField = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get advancedFieldInput() {
    return this._advancedField;
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

  // domains - computed: false, optional: false, required: true
  private _domains?: string[]; 
  public get domains() {
    return this.getListAttribute('domains');
  }
  public set domains(value: string[]) {
    this._domains = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainsInput() {
    return this._domains;
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

  // ignore_waf_protection - computed: false, optional: false, required: true
  private _ignoreWafProtection?: string; 
  public get ignoreWafProtection() {
    return this.getStringAttribute('ignore_waf_protection');
  }
  public set ignoreWafProtection(value: string) {
    this._ignoreWafProtection = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ignoreWafProtectionInput() {
    return this._ignoreWafProtection;
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

  // conditions - computed: false, optional: false, required: true
  private _conditions = new WafRuleGlobalProtectionWhitelistConditionsList(this, "conditions", false);
  public get conditions() {
    return this._conditions;
  }
  public putConditions(value: WafRuleGlobalProtectionWhitelistConditions[] | cdktf.IResolvable) {
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
      advanced_content: cdktf.stringToTerraform(this._advancedContent),
      advanced_field: cdktf.stringToTerraform(this._advancedField),
      description: cdktf.stringToTerraform(this._description),
      domains: cdktf.listMapper(cdktf.stringToTerraform, false)(this._domains),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      ignore_waf_protection: cdktf.stringToTerraform(this._ignoreWafProtection),
      policy_id: cdktf.stringToTerraform(this._policyId),
      region: cdktf.stringToTerraform(this._region),
      status: cdktf.numberToTerraform(this._status),
      conditions: cdktf.listMapper(wafRuleGlobalProtectionWhitelistConditionsToTerraform, true)(this._conditions.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      advanced_content: {
        value: cdktf.stringToHclTerraform(this._advancedContent),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      advanced_field: {
        value: cdktf.stringToHclTerraform(this._advancedField),
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
      domains: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._domains),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
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
      ignore_waf_protection: {
        value: cdktf.stringToHclTerraform(this._ignoreWafProtection),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      status: {
        value: cdktf.numberToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      conditions: {
        value: cdktf.listMapperHcl(wafRuleGlobalProtectionWhitelistConditionsToHclTerraform, true)(this._conditions.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafRuleGlobalProtectionWhitelistConditionsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

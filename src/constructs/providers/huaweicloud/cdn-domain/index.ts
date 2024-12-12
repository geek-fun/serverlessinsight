// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CdnDomainConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enable_force_new CdnDomain#enable_force_new}
  */
  readonly enableForceNew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enterprise_project_id CdnDomain#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#id CdnDomain#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#name CdnDomain#name}
  */
  readonly name: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#service_area CdnDomain#service_area}
  */
  readonly serviceArea?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#tags CdnDomain#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type: string;
  /**
  * cache_settings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#cache_settings CdnDomain#cache_settings}
  */
  readonly cacheSettings?: CdnDomainCacheSettings;
  /**
  * configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#configs CdnDomain#configs}
  */
  readonly configs?: CdnDomainConfigs;
  /**
  * sources block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#sources CdnDomain#sources}
  */
  readonly sources: CdnDomainSources[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#timeouts CdnDomain#timeouts}
  */
  readonly timeouts?: CdnDomainTimeouts;
}
export interface CdnDomainCacheSettingsRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#content CdnDomain#content}
  */
  readonly content?: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#priority CdnDomain#priority}
  */
  readonly priority?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#rule_type CdnDomain#rule_type}
  */
  readonly ruleType: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#ttl CdnDomain#ttl}
  */
  readonly ttl?: number;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#ttl_type CdnDomain#ttl_type}
  */
  readonly ttlType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#url_parameter_type CdnDomain#url_parameter_type}
  */
  readonly urlParameterType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#url_parameter_value CdnDomain#url_parameter_value}
  */
  readonly urlParameterValue?: string;
}

export function cdnDomainCacheSettingsRulesToTerraform(struct?: CdnDomainCacheSettingsRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    content: cdktf.stringToTerraform(struct!.content),
    priority: cdktf.numberToTerraform(struct!.priority),
    rule_type: cdktf.stringToTerraform(struct!.ruleType),
    ttl: cdktf.numberToTerraform(struct!.ttl),
    ttl_type: cdktf.stringToTerraform(struct!.ttlType),
    url_parameter_type: cdktf.stringToTerraform(struct!.urlParameterType),
    url_parameter_value: cdktf.stringToTerraform(struct!.urlParameterValue),
  }
}


export function cdnDomainCacheSettingsRulesToHclTerraform(struct?: CdnDomainCacheSettingsRules | cdktf.IResolvable): any {
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
    priority: {
      value: cdktf.numberToHclTerraform(struct!.priority),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    rule_type: {
      value: cdktf.stringToHclTerraform(struct!.ruleType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ttl: {
      value: cdktf.numberToHclTerraform(struct!.ttl),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    ttl_type: {
      value: cdktf.stringToHclTerraform(struct!.ttlType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    url_parameter_type: {
      value: cdktf.stringToHclTerraform(struct!.urlParameterType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    url_parameter_value: {
      value: cdktf.stringToHclTerraform(struct!.urlParameterValue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainCacheSettingsRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainCacheSettingsRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._content !== undefined) {
      hasAnyValues = true;
      internalValueResult.content = this._content;
    }
    if (this._priority !== undefined) {
      hasAnyValues = true;
      internalValueResult.priority = this._priority;
    }
    if (this._ruleType !== undefined) {
      hasAnyValues = true;
      internalValueResult.ruleType = this._ruleType;
    }
    if (this._ttl !== undefined) {
      hasAnyValues = true;
      internalValueResult.ttl = this._ttl;
    }
    if (this._ttlType !== undefined) {
      hasAnyValues = true;
      internalValueResult.ttlType = this._ttlType;
    }
    if (this._urlParameterType !== undefined) {
      hasAnyValues = true;
      internalValueResult.urlParameterType = this._urlParameterType;
    }
    if (this._urlParameterValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.urlParameterValue = this._urlParameterValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainCacheSettingsRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._content = undefined;
      this._priority = undefined;
      this._ruleType = undefined;
      this._ttl = undefined;
      this._ttlType = undefined;
      this._urlParameterType = undefined;
      this._urlParameterValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._content = value.content;
      this._priority = value.priority;
      this._ruleType = value.ruleType;
      this._ttl = value.ttl;
      this._ttlType = value.ttlType;
      this._urlParameterType = value.urlParameterType;
      this._urlParameterValue = value.urlParameterValue;
    }
  }

  // content - computed: false, optional: true, required: false
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

  // priority - computed: true, optional: true, required: false
  private _priority?: number; 
  public get priority() {
    return this.getNumberAttribute('priority');
  }
  public set priority(value: number) {
    this._priority = value;
  }
  public resetPriority() {
    this._priority = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get priorityInput() {
    return this._priority;
  }

  // rule_type - computed: false, optional: false, required: true
  private _ruleType?: string; 
  public get ruleType() {
    return this.getStringAttribute('rule_type');
  }
  public set ruleType(value: string) {
    this._ruleType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleTypeInput() {
    return this._ruleType;
  }

  // ttl - computed: true, optional: true, required: false
  private _ttl?: number; 
  public get ttl() {
    return this.getNumberAttribute('ttl');
  }
  public set ttl(value: number) {
    this._ttl = value;
  }
  public resetTtl() {
    this._ttl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ttlInput() {
    return this._ttl;
  }

  // ttl_type - computed: true, optional: true, required: false
  private _ttlType?: string; 
  public get ttlType() {
    return this.getStringAttribute('ttl_type');
  }
  public set ttlType(value: string) {
    this._ttlType = value;
  }
  public resetTtlType() {
    this._ttlType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ttlTypeInput() {
    return this._ttlType;
  }

  // url_parameter_type - computed: false, optional: true, required: false
  private _urlParameterType?: string; 
  public get urlParameterType() {
    return this.getStringAttribute('url_parameter_type');
  }
  public set urlParameterType(value: string) {
    this._urlParameterType = value;
  }
  public resetUrlParameterType() {
    this._urlParameterType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get urlParameterTypeInput() {
    return this._urlParameterType;
  }

  // url_parameter_value - computed: false, optional: true, required: false
  private _urlParameterValue?: string; 
  public get urlParameterValue() {
    return this.getStringAttribute('url_parameter_value');
  }
  public set urlParameterValue(value: string) {
    this._urlParameterValue = value;
  }
  public resetUrlParameterValue() {
    this._urlParameterValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get urlParameterValueInput() {
    return this._urlParameterValue;
  }
}

export class CdnDomainCacheSettingsRulesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainCacheSettingsRules[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainCacheSettingsRulesOutputReference {
    return new CdnDomainCacheSettingsRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainCacheSettings {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#follow_origin CdnDomain#follow_origin}
  */
  readonly followOrigin?: boolean | cdktf.IResolvable;
  /**
  * rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#rules CdnDomain#rules}
  */
  readonly rules?: CdnDomainCacheSettingsRules[] | cdktf.IResolvable;
}

export function cdnDomainCacheSettingsToTerraform(struct?: CdnDomainCacheSettingsOutputReference | CdnDomainCacheSettings): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    follow_origin: cdktf.booleanToTerraform(struct!.followOrigin),
    rules: cdktf.listMapper(cdnDomainCacheSettingsRulesToTerraform, true)(struct!.rules),
  }
}


export function cdnDomainCacheSettingsToHclTerraform(struct?: CdnDomainCacheSettingsOutputReference | CdnDomainCacheSettings): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    follow_origin: {
      value: cdktf.booleanToHclTerraform(struct!.followOrigin),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    rules: {
      value: cdktf.listMapperHcl(cdnDomainCacheSettingsRulesToHclTerraform, true)(struct!.rules),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainCacheSettingsRulesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainCacheSettingsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainCacheSettings | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._followOrigin !== undefined) {
      hasAnyValues = true;
      internalValueResult.followOrigin = this._followOrigin;
    }
    if (this._rules?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.rules = this._rules?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainCacheSettings | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._followOrigin = undefined;
      this._rules.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._followOrigin = value.followOrigin;
      this._rules.internalValue = value.rules;
    }
  }

  // follow_origin - computed: false, optional: true, required: false
  private _followOrigin?: boolean | cdktf.IResolvable; 
  public get followOrigin() {
    return this.getBooleanAttribute('follow_origin');
  }
  public set followOrigin(value: boolean | cdktf.IResolvable) {
    this._followOrigin = value;
  }
  public resetFollowOrigin() {
    this._followOrigin = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get followOriginInput() {
    return this._followOrigin;
  }

  // rules - computed: false, optional: true, required: false
  private _rules = new CdnDomainCacheSettingsRulesList(this, "rules", true);
  public get rules() {
    return this._rules;
  }
  public putRules(value: CdnDomainCacheSettingsRules[] | cdktf.IResolvable) {
    this._rules.internalValue = value;
  }
  public resetRules() {
    this._rules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rulesInput() {
    return this._rules.internalValue;
  }
}
export interface CdnDomainConfigsAccessAreaFilter {
  /**
  * Specifies the areas, separated by commas.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#area CdnDomain#area}
  */
  readonly area: string;
  /**
  * Specifies the content type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#content_type CdnDomain#content_type}
  */
  readonly contentType: string;
  /**
  * Specifies the content value.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#content_value CdnDomain#content_value}
  */
  readonly contentValue?: string;
  /**
  * Specifies the IP addresses exception in access control, separated by commas.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#exception_ip CdnDomain#exception_ip}
  */
  readonly exceptionIp?: string;
  /**
  * Specifies the blacklist and whitelist rule type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type: string;
}

export function cdnDomainConfigsAccessAreaFilterToTerraform(struct?: CdnDomainConfigsAccessAreaFilter | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    area: cdktf.stringToTerraform(struct!.area),
    content_type: cdktf.stringToTerraform(struct!.contentType),
    content_value: cdktf.stringToTerraform(struct!.contentValue),
    exception_ip: cdktf.stringToTerraform(struct!.exceptionIp),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function cdnDomainConfigsAccessAreaFilterToHclTerraform(struct?: CdnDomainConfigsAccessAreaFilter | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    area: {
      value: cdktf.stringToHclTerraform(struct!.area),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    content_type: {
      value: cdktf.stringToHclTerraform(struct!.contentType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    content_value: {
      value: cdktf.stringToHclTerraform(struct!.contentValue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    exception_ip: {
      value: cdktf.stringToHclTerraform(struct!.exceptionIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
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

export class CdnDomainConfigsAccessAreaFilterOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainConfigsAccessAreaFilter | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._area !== undefined) {
      hasAnyValues = true;
      internalValueResult.area = this._area;
    }
    if (this._contentType !== undefined) {
      hasAnyValues = true;
      internalValueResult.contentType = this._contentType;
    }
    if (this._contentValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.contentValue = this._contentValue;
    }
    if (this._exceptionIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.exceptionIp = this._exceptionIp;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsAccessAreaFilter | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._area = undefined;
      this._contentType = undefined;
      this._contentValue = undefined;
      this._exceptionIp = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._area = value.area;
      this._contentType = value.contentType;
      this._contentValue = value.contentValue;
      this._exceptionIp = value.exceptionIp;
      this._type = value.type;
    }
  }

  // area - computed: false, optional: false, required: true
  private _area?: string; 
  public get area() {
    return this.getStringAttribute('area');
  }
  public set area(value: string) {
    this._area = value;
  }
  // Temporarily expose input value. Use with caution.
  public get areaInput() {
    return this._area;
  }

  // content_type - computed: false, optional: false, required: true
  private _contentType?: string; 
  public get contentType() {
    return this.getStringAttribute('content_type');
  }
  public set contentType(value: string) {
    this._contentType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get contentTypeInput() {
    return this._contentType;
  }

  // content_value - computed: true, optional: true, required: false
  private _contentValue?: string; 
  public get contentValue() {
    return this.getStringAttribute('content_value');
  }
  public set contentValue(value: string) {
    this._contentValue = value;
  }
  public resetContentValue() {
    this._contentValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contentValueInput() {
    return this._contentValue;
  }

  // exception_ip - computed: true, optional: true, required: false
  private _exceptionIp?: string; 
  public get exceptionIp() {
    return this.getStringAttribute('exception_ip');
  }
  public set exceptionIp(value: string) {
    this._exceptionIp = value;
  }
  public resetExceptionIp() {
    this._exceptionIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get exceptionIpInput() {
    return this._exceptionIp;
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

export class CdnDomainConfigsAccessAreaFilterList extends cdktf.ComplexList {
  public internalValue? : CdnDomainConfigsAccessAreaFilter[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainConfigsAccessAreaFilterOutputReference {
    return new CdnDomainConfigsAccessAreaFilterOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainConfigsCacheUrlParameterFilter {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#value CdnDomain#value}
  */
  readonly value?: string;
}

export function cdnDomainConfigsCacheUrlParameterFilterToTerraform(struct?: CdnDomainConfigsCacheUrlParameterFilterOutputReference | CdnDomainConfigsCacheUrlParameterFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cdnDomainConfigsCacheUrlParameterFilterToHclTerraform(struct?: CdnDomainConfigsCacheUrlParameterFilterOutputReference | CdnDomainConfigsCacheUrlParameterFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsCacheUrlParameterFilterOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsCacheUrlParameterFilter | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsCacheUrlParameterFilter | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._type = undefined;
      this._value = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._type = value.type;
      this._value = value.value;
    }
  }

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // value - computed: false, optional: true, required: false
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
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
export interface CdnDomainConfigsCompress {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enabled CdnDomain#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#file_type CdnDomain#file_type}
  */
  readonly fileType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type?: string;
}

export function cdnDomainConfigsCompressToTerraform(struct?: CdnDomainConfigsCompressOutputReference | CdnDomainConfigsCompress): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    file_type: cdktf.stringToTerraform(struct!.fileType),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function cdnDomainConfigsCompressToHclTerraform(struct?: CdnDomainConfigsCompressOutputReference | CdnDomainConfigsCompress): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    file_type: {
      value: cdktf.stringToHclTerraform(struct!.fileType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
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

export class CdnDomainConfigsCompressOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsCompress | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    if (this._fileType !== undefined) {
      hasAnyValues = true;
      internalValueResult.fileType = this._fileType;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsCompress | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enabled = undefined;
      this._fileType = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enabled = value.enabled;
      this._fileType = value.fileType;
      this._type = value.type;
    }
  }

  // enabled - computed: false, optional: false, required: true
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // file_type - computed: true, optional: true, required: false
  private _fileType?: string; 
  public get fileType() {
    return this.getStringAttribute('file_type');
  }
  public set fileType(value: string) {
    this._fileType = value;
  }
  public resetFileType() {
    this._fileType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fileTypeInput() {
    return this._fileType;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface CdnDomainConfigsErrorCodeCache {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#code CdnDomain#code}
  */
  readonly code: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#ttl CdnDomain#ttl}
  */
  readonly ttl: number;
}

export function cdnDomainConfigsErrorCodeCacheToTerraform(struct?: CdnDomainConfigsErrorCodeCache | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    code: cdktf.numberToTerraform(struct!.code),
    ttl: cdktf.numberToTerraform(struct!.ttl),
  }
}


export function cdnDomainConfigsErrorCodeCacheToHclTerraform(struct?: CdnDomainConfigsErrorCodeCache | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    code: {
      value: cdktf.numberToHclTerraform(struct!.code),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    ttl: {
      value: cdktf.numberToHclTerraform(struct!.ttl),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsErrorCodeCacheOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainConfigsErrorCodeCache | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._code !== undefined) {
      hasAnyValues = true;
      internalValueResult.code = this._code;
    }
    if (this._ttl !== undefined) {
      hasAnyValues = true;
      internalValueResult.ttl = this._ttl;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsErrorCodeCache | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._code = undefined;
      this._ttl = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._code = value.code;
      this._ttl = value.ttl;
    }
  }

  // code - computed: false, optional: false, required: true
  private _code?: number; 
  public get code() {
    return this.getNumberAttribute('code');
  }
  public set code(value: number) {
    this._code = value;
  }
  // Temporarily expose input value. Use with caution.
  public get codeInput() {
    return this._code;
  }

  // ttl - computed: false, optional: false, required: true
  private _ttl?: number; 
  public get ttl() {
    return this.getNumberAttribute('ttl');
  }
  public set ttl(value: number) {
    this._ttl = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ttlInput() {
    return this._ttl;
  }
}

export class CdnDomainConfigsErrorCodeCacheList extends cdktf.ComplexList {
  public internalValue? : CdnDomainConfigsErrorCodeCache[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainConfigsErrorCodeCacheOutputReference {
    return new CdnDomainConfigsErrorCodeCacheOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainConfigsErrorCodeRedirectRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#error_code CdnDomain#error_code}
  */
  readonly errorCode: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#target_code CdnDomain#target_code}
  */
  readonly targetCode: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#target_link CdnDomain#target_link}
  */
  readonly targetLink: string;
}

export function cdnDomainConfigsErrorCodeRedirectRulesToTerraform(struct?: CdnDomainConfigsErrorCodeRedirectRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    error_code: cdktf.numberToTerraform(struct!.errorCode),
    target_code: cdktf.numberToTerraform(struct!.targetCode),
    target_link: cdktf.stringToTerraform(struct!.targetLink),
  }
}


export function cdnDomainConfigsErrorCodeRedirectRulesToHclTerraform(struct?: CdnDomainConfigsErrorCodeRedirectRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    error_code: {
      value: cdktf.numberToHclTerraform(struct!.errorCode),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    target_code: {
      value: cdktf.numberToHclTerraform(struct!.targetCode),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    target_link: {
      value: cdktf.stringToHclTerraform(struct!.targetLink),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsErrorCodeRedirectRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainConfigsErrorCodeRedirectRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._errorCode !== undefined) {
      hasAnyValues = true;
      internalValueResult.errorCode = this._errorCode;
    }
    if (this._targetCode !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetCode = this._targetCode;
    }
    if (this._targetLink !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetLink = this._targetLink;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsErrorCodeRedirectRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._errorCode = undefined;
      this._targetCode = undefined;
      this._targetLink = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._errorCode = value.errorCode;
      this._targetCode = value.targetCode;
      this._targetLink = value.targetLink;
    }
  }

  // error_code - computed: false, optional: false, required: true
  private _errorCode?: number; 
  public get errorCode() {
    return this.getNumberAttribute('error_code');
  }
  public set errorCode(value: number) {
    this._errorCode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get errorCodeInput() {
    return this._errorCode;
  }

  // target_code - computed: false, optional: false, required: true
  private _targetCode?: number; 
  public get targetCode() {
    return this.getNumberAttribute('target_code');
  }
  public set targetCode(value: number) {
    this._targetCode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetCodeInput() {
    return this._targetCode;
  }

  // target_link - computed: false, optional: false, required: true
  private _targetLink?: string; 
  public get targetLink() {
    return this.getStringAttribute('target_link');
  }
  public set targetLink(value: string) {
    this._targetLink = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetLinkInput() {
    return this._targetLink;
  }
}

export class CdnDomainConfigsErrorCodeRedirectRulesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainConfigsErrorCodeRedirectRules[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainConfigsErrorCodeRedirectRulesOutputReference {
    return new CdnDomainConfigsErrorCodeRedirectRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainConfigsFlexibleOriginBackSources {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#http_port CdnDomain#http_port}
  */
  readonly httpPort?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#https_port CdnDomain#https_port}
  */
  readonly httpsPort?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#ip_or_domain CdnDomain#ip_or_domain}
  */
  readonly ipOrDomain: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#obs_bucket_type CdnDomain#obs_bucket_type}
  */
  readonly obsBucketType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#sources_type CdnDomain#sources_type}
  */
  readonly sourcesType: string;
}

export function cdnDomainConfigsFlexibleOriginBackSourcesToTerraform(struct?: CdnDomainConfigsFlexibleOriginBackSourcesOutputReference | CdnDomainConfigsFlexibleOriginBackSources): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    http_port: cdktf.numberToTerraform(struct!.httpPort),
    https_port: cdktf.numberToTerraform(struct!.httpsPort),
    ip_or_domain: cdktf.stringToTerraform(struct!.ipOrDomain),
    obs_bucket_type: cdktf.stringToTerraform(struct!.obsBucketType),
    sources_type: cdktf.stringToTerraform(struct!.sourcesType),
  }
}


export function cdnDomainConfigsFlexibleOriginBackSourcesToHclTerraform(struct?: CdnDomainConfigsFlexibleOriginBackSourcesOutputReference | CdnDomainConfigsFlexibleOriginBackSources): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    http_port: {
      value: cdktf.numberToHclTerraform(struct!.httpPort),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    https_port: {
      value: cdktf.numberToHclTerraform(struct!.httpsPort),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    ip_or_domain: {
      value: cdktf.stringToHclTerraform(struct!.ipOrDomain),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_bucket_type: {
      value: cdktf.stringToHclTerraform(struct!.obsBucketType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sources_type: {
      value: cdktf.stringToHclTerraform(struct!.sourcesType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsFlexibleOriginBackSourcesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsFlexibleOriginBackSources | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._httpPort !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpPort = this._httpPort;
    }
    if (this._httpsPort !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpsPort = this._httpsPort;
    }
    if (this._ipOrDomain !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipOrDomain = this._ipOrDomain;
    }
    if (this._obsBucketType !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsBucketType = this._obsBucketType;
    }
    if (this._sourcesType !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourcesType = this._sourcesType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsFlexibleOriginBackSources | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._httpPort = undefined;
      this._httpsPort = undefined;
      this._ipOrDomain = undefined;
      this._obsBucketType = undefined;
      this._sourcesType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._httpPort = value.httpPort;
      this._httpsPort = value.httpsPort;
      this._ipOrDomain = value.ipOrDomain;
      this._obsBucketType = value.obsBucketType;
      this._sourcesType = value.sourcesType;
    }
  }

  // http_port - computed: true, optional: true, required: false
  private _httpPort?: number; 
  public get httpPort() {
    return this.getNumberAttribute('http_port');
  }
  public set httpPort(value: number) {
    this._httpPort = value;
  }
  public resetHttpPort() {
    this._httpPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpPortInput() {
    return this._httpPort;
  }

  // https_port - computed: true, optional: true, required: false
  private _httpsPort?: number; 
  public get httpsPort() {
    return this.getNumberAttribute('https_port');
  }
  public set httpsPort(value: number) {
    this._httpsPort = value;
  }
  public resetHttpsPort() {
    this._httpsPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpsPortInput() {
    return this._httpsPort;
  }

  // ip_or_domain - computed: false, optional: false, required: true
  private _ipOrDomain?: string; 
  public get ipOrDomain() {
    return this.getStringAttribute('ip_or_domain');
  }
  public set ipOrDomain(value: string) {
    this._ipOrDomain = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ipOrDomainInput() {
    return this._ipOrDomain;
  }

  // obs_bucket_type - computed: true, optional: true, required: false
  private _obsBucketType?: string; 
  public get obsBucketType() {
    return this.getStringAttribute('obs_bucket_type');
  }
  public set obsBucketType(value: string) {
    this._obsBucketType = value;
  }
  public resetObsBucketType() {
    this._obsBucketType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsBucketTypeInput() {
    return this._obsBucketType;
  }

  // sources_type - computed: false, optional: false, required: true
  private _sourcesType?: string; 
  public get sourcesType() {
    return this.getStringAttribute('sources_type');
  }
  public set sourcesType(value: string) {
    this._sourcesType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourcesTypeInput() {
    return this._sourcesType;
  }
}
export interface CdnDomainConfigsFlexibleOrigin {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#match_pattern CdnDomain#match_pattern}
  */
  readonly matchPattern?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#match_type CdnDomain#match_type}
  */
  readonly matchType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#priority CdnDomain#priority}
  */
  readonly priority: number;
  /**
  * back_sources block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#back_sources CdnDomain#back_sources}
  */
  readonly backSources: CdnDomainConfigsFlexibleOriginBackSources;
}

export function cdnDomainConfigsFlexibleOriginToTerraform(struct?: CdnDomainConfigsFlexibleOrigin | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    match_pattern: cdktf.stringToTerraform(struct!.matchPattern),
    match_type: cdktf.stringToTerraform(struct!.matchType),
    priority: cdktf.numberToTerraform(struct!.priority),
    back_sources: cdnDomainConfigsFlexibleOriginBackSourcesToTerraform(struct!.backSources),
  }
}


export function cdnDomainConfigsFlexibleOriginToHclTerraform(struct?: CdnDomainConfigsFlexibleOrigin | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    match_pattern: {
      value: cdktf.stringToHclTerraform(struct!.matchPattern),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    match_type: {
      value: cdktf.stringToHclTerraform(struct!.matchType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    priority: {
      value: cdktf.numberToHclTerraform(struct!.priority),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    back_sources: {
      value: cdnDomainConfigsFlexibleOriginBackSourcesToHclTerraform(struct!.backSources),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsFlexibleOriginBackSourcesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsFlexibleOriginOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainConfigsFlexibleOrigin | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._matchPattern !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchPattern = this._matchPattern;
    }
    if (this._matchType !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchType = this._matchType;
    }
    if (this._priority !== undefined) {
      hasAnyValues = true;
      internalValueResult.priority = this._priority;
    }
    if (this._backSources?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.backSources = this._backSources?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsFlexibleOrigin | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._matchPattern = undefined;
      this._matchType = undefined;
      this._priority = undefined;
      this._backSources.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._matchPattern = value.matchPattern;
      this._matchType = value.matchType;
      this._priority = value.priority;
      this._backSources.internalValue = value.backSources;
    }
  }

  // match_pattern - computed: true, optional: true, required: false
  private _matchPattern?: string; 
  public get matchPattern() {
    return this.getStringAttribute('match_pattern');
  }
  public set matchPattern(value: string) {
    this._matchPattern = value;
  }
  public resetMatchPattern() {
    this._matchPattern = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchPatternInput() {
    return this._matchPattern;
  }

  // match_type - computed: false, optional: false, required: true
  private _matchType?: string; 
  public get matchType() {
    return this.getStringAttribute('match_type');
  }
  public set matchType(value: string) {
    this._matchType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get matchTypeInput() {
    return this._matchType;
  }

  // priority - computed: false, optional: false, required: true
  private _priority?: number; 
  public get priority() {
    return this.getNumberAttribute('priority');
  }
  public set priority(value: number) {
    this._priority = value;
  }
  // Temporarily expose input value. Use with caution.
  public get priorityInput() {
    return this._priority;
  }

  // back_sources - computed: false, optional: false, required: true
  private _backSources = new CdnDomainConfigsFlexibleOriginBackSourcesOutputReference(this, "back_sources");
  public get backSources() {
    return this._backSources;
  }
  public putBackSources(value: CdnDomainConfigsFlexibleOriginBackSources) {
    this._backSources.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get backSourcesInput() {
    return this._backSources.internalValue;
  }
}

export class CdnDomainConfigsFlexibleOriginList extends cdktf.ComplexList {
  public internalValue? : CdnDomainConfigsFlexibleOrigin[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainConfigsFlexibleOriginOutputReference {
    return new CdnDomainConfigsFlexibleOriginOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainConfigsForceRedirect {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enabled CdnDomain#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#redirect_code CdnDomain#redirect_code}
  */
  readonly redirectCode?: number;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type?: string;
}

export function cdnDomainConfigsForceRedirectToTerraform(struct?: CdnDomainConfigsForceRedirectOutputReference | CdnDomainConfigsForceRedirect): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    redirect_code: cdktf.numberToTerraform(struct!.redirectCode),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function cdnDomainConfigsForceRedirectToHclTerraform(struct?: CdnDomainConfigsForceRedirectOutputReference | CdnDomainConfigsForceRedirect): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    redirect_code: {
      value: cdktf.numberToHclTerraform(struct!.redirectCode),
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

export class CdnDomainConfigsForceRedirectOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsForceRedirect | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    if (this._redirectCode !== undefined) {
      hasAnyValues = true;
      internalValueResult.redirectCode = this._redirectCode;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsForceRedirect | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enabled = undefined;
      this._redirectCode = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enabled = value.enabled;
      this._redirectCode = value.redirectCode;
      this._type = value.type;
    }
  }

  // enabled - computed: false, optional: false, required: true
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // redirect_code - computed: true, optional: true, required: false
  private _redirectCode?: number; 
  public get redirectCode() {
    return this.getNumberAttribute('redirect_code');
  }
  public set redirectCode(value: number) {
    this._redirectCode = value;
  }
  public resetRedirectCode() {
    this._redirectCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redirectCodeInput() {
    return this._redirectCode;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface CdnDomainConfigsHsts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enabled CdnDomain#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#include_subdomains CdnDomain#include_subdomains}
  */
  readonly includeSubdomains?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#max_age CdnDomain#max_age}
  */
  readonly maxAge?: number;
}

export function cdnDomainConfigsHstsToTerraform(struct?: CdnDomainConfigsHstsOutputReference | CdnDomainConfigsHsts): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    include_subdomains: cdktf.stringToTerraform(struct!.includeSubdomains),
    max_age: cdktf.numberToTerraform(struct!.maxAge),
  }
}


export function cdnDomainConfigsHstsToHclTerraform(struct?: CdnDomainConfigsHstsOutputReference | CdnDomainConfigsHsts): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    include_subdomains: {
      value: cdktf.stringToHclTerraform(struct!.includeSubdomains),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_age: {
      value: cdktf.numberToHclTerraform(struct!.maxAge),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsHstsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsHsts | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    if (this._includeSubdomains !== undefined) {
      hasAnyValues = true;
      internalValueResult.includeSubdomains = this._includeSubdomains;
    }
    if (this._maxAge !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxAge = this._maxAge;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsHsts | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enabled = undefined;
      this._includeSubdomains = undefined;
      this._maxAge = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enabled = value.enabled;
      this._includeSubdomains = value.includeSubdomains;
      this._maxAge = value.maxAge;
    }
  }

  // enabled - computed: false, optional: false, required: true
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // include_subdomains - computed: true, optional: true, required: false
  private _includeSubdomains?: string; 
  public get includeSubdomains() {
    return this.getStringAttribute('include_subdomains');
  }
  public set includeSubdomains(value: string) {
    this._includeSubdomains = value;
  }
  public resetIncludeSubdomains() {
    this._includeSubdomains = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get includeSubdomainsInput() {
    return this._includeSubdomains;
  }

  // max_age - computed: true, optional: true, required: false
  private _maxAge?: number; 
  public get maxAge() {
    return this.getNumberAttribute('max_age');
  }
  public set maxAge(value: number) {
    this._maxAge = value;
  }
  public resetMaxAge() {
    this._maxAge = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxAgeInput() {
    return this._maxAge;
  }
}
export interface CdnDomainConfigsHttpResponseHeader {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#action CdnDomain#action}
  */
  readonly action: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#name CdnDomain#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#value CdnDomain#value}
  */
  readonly value?: string;
}

export function cdnDomainConfigsHttpResponseHeaderToTerraform(struct?: CdnDomainConfigsHttpResponseHeader | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    action: cdktf.stringToTerraform(struct!.action),
    name: cdktf.stringToTerraform(struct!.name),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cdnDomainConfigsHttpResponseHeaderToHclTerraform(struct?: CdnDomainConfigsHttpResponseHeader | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    action: {
      value: cdktf.stringToHclTerraform(struct!.action),
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
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsHttpResponseHeaderOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainConfigsHttpResponseHeader | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._action !== undefined) {
      hasAnyValues = true;
      internalValueResult.action = this._action;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsHttpResponseHeader | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._action = undefined;
      this._name = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._action = value.action;
      this._name = value.name;
      this._value = value.value;
    }
  }

  // action - computed: false, optional: false, required: true
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
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

  // value - computed: false, optional: true, required: false
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
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

export class CdnDomainConfigsHttpResponseHeaderList extends cdktf.ComplexList {
  public internalValue? : CdnDomainConfigsHttpResponseHeader[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainConfigsHttpResponseHeaderOutputReference {
    return new CdnDomainConfigsHttpResponseHeaderOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainConfigsHttpsSettings {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#certificate_body CdnDomain#certificate_body}
  */
  readonly certificateBody?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#certificate_name CdnDomain#certificate_name}
  */
  readonly certificateName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#certificate_source CdnDomain#certificate_source}
  */
  readonly certificateSource?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#certificate_type CdnDomain#certificate_type}
  */
  readonly certificateType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#http2_enabled CdnDomain#http2_enabled}
  */
  readonly http2Enabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#https_enabled CdnDomain#https_enabled}
  */
  readonly httpsEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#ocsp_stapling_status CdnDomain#ocsp_stapling_status}
  */
  readonly ocspStaplingStatus?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#private_key CdnDomain#private_key}
  */
  readonly privateKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#scm_certificate_id CdnDomain#scm_certificate_id}
  */
  readonly scmCertificateId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#tls_version CdnDomain#tls_version}
  */
  readonly tlsVersion?: string;
}

export function cdnDomainConfigsHttpsSettingsToTerraform(struct?: CdnDomainConfigsHttpsSettingsOutputReference | CdnDomainConfigsHttpsSettings): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    certificate_body: cdktf.stringToTerraform(struct!.certificateBody),
    certificate_name: cdktf.stringToTerraform(struct!.certificateName),
    certificate_source: cdktf.numberToTerraform(struct!.certificateSource),
    certificate_type: cdktf.stringToTerraform(struct!.certificateType),
    http2_enabled: cdktf.booleanToTerraform(struct!.http2Enabled),
    https_enabled: cdktf.booleanToTerraform(struct!.httpsEnabled),
    ocsp_stapling_status: cdktf.stringToTerraform(struct!.ocspStaplingStatus),
    private_key: cdktf.stringToTerraform(struct!.privateKey),
    scm_certificate_id: cdktf.stringToTerraform(struct!.scmCertificateId),
    tls_version: cdktf.stringToTerraform(struct!.tlsVersion),
  }
}


export function cdnDomainConfigsHttpsSettingsToHclTerraform(struct?: CdnDomainConfigsHttpsSettingsOutputReference | CdnDomainConfigsHttpsSettings): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    certificate_body: {
      value: cdktf.stringToHclTerraform(struct!.certificateBody),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    certificate_name: {
      value: cdktf.stringToHclTerraform(struct!.certificateName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    certificate_source: {
      value: cdktf.numberToHclTerraform(struct!.certificateSource),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    certificate_type: {
      value: cdktf.stringToHclTerraform(struct!.certificateType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    http2_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.http2Enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    https_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.httpsEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    ocsp_stapling_status: {
      value: cdktf.stringToHclTerraform(struct!.ocspStaplingStatus),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    private_key: {
      value: cdktf.stringToHclTerraform(struct!.privateKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scm_certificate_id: {
      value: cdktf.stringToHclTerraform(struct!.scmCertificateId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    tls_version: {
      value: cdktf.stringToHclTerraform(struct!.tlsVersion),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsHttpsSettingsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsHttpsSettings | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._certificateBody !== undefined) {
      hasAnyValues = true;
      internalValueResult.certificateBody = this._certificateBody;
    }
    if (this._certificateName !== undefined) {
      hasAnyValues = true;
      internalValueResult.certificateName = this._certificateName;
    }
    if (this._certificateSource !== undefined) {
      hasAnyValues = true;
      internalValueResult.certificateSource = this._certificateSource;
    }
    if (this._certificateType !== undefined) {
      hasAnyValues = true;
      internalValueResult.certificateType = this._certificateType;
    }
    if (this._http2Enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.http2Enabled = this._http2Enabled;
    }
    if (this._httpsEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpsEnabled = this._httpsEnabled;
    }
    if (this._ocspStaplingStatus !== undefined) {
      hasAnyValues = true;
      internalValueResult.ocspStaplingStatus = this._ocspStaplingStatus;
    }
    if (this._privateKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.privateKey = this._privateKey;
    }
    if (this._scmCertificateId !== undefined) {
      hasAnyValues = true;
      internalValueResult.scmCertificateId = this._scmCertificateId;
    }
    if (this._tlsVersion !== undefined) {
      hasAnyValues = true;
      internalValueResult.tlsVersion = this._tlsVersion;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsHttpsSettings | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._certificateBody = undefined;
      this._certificateName = undefined;
      this._certificateSource = undefined;
      this._certificateType = undefined;
      this._http2Enabled = undefined;
      this._httpsEnabled = undefined;
      this._ocspStaplingStatus = undefined;
      this._privateKey = undefined;
      this._scmCertificateId = undefined;
      this._tlsVersion = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._certificateBody = value.certificateBody;
      this._certificateName = value.certificateName;
      this._certificateSource = value.certificateSource;
      this._certificateType = value.certificateType;
      this._http2Enabled = value.http2Enabled;
      this._httpsEnabled = value.httpsEnabled;
      this._ocspStaplingStatus = value.ocspStaplingStatus;
      this._privateKey = value.privateKey;
      this._scmCertificateId = value.scmCertificateId;
      this._tlsVersion = value.tlsVersion;
    }
  }

  // certificate_body - computed: true, optional: true, required: false
  private _certificateBody?: string; 
  public get certificateBody() {
    return this.getStringAttribute('certificate_body');
  }
  public set certificateBody(value: string) {
    this._certificateBody = value;
  }
  public resetCertificateBody() {
    this._certificateBody = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateBodyInput() {
    return this._certificateBody;
  }

  // certificate_name - computed: true, optional: true, required: false
  private _certificateName?: string; 
  public get certificateName() {
    return this.getStringAttribute('certificate_name');
  }
  public set certificateName(value: string) {
    this._certificateName = value;
  }
  public resetCertificateName() {
    this._certificateName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateNameInput() {
    return this._certificateName;
  }

  // certificate_source - computed: true, optional: true, required: false
  private _certificateSource?: number; 
  public get certificateSource() {
    return this.getNumberAttribute('certificate_source');
  }
  public set certificateSource(value: number) {
    this._certificateSource = value;
  }
  public resetCertificateSource() {
    this._certificateSource = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateSourceInput() {
    return this._certificateSource;
  }

  // certificate_type - computed: true, optional: true, required: false
  private _certificateType?: string; 
  public get certificateType() {
    return this.getStringAttribute('certificate_type');
  }
  public set certificateType(value: string) {
    this._certificateType = value;
  }
  public resetCertificateType() {
    this._certificateType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateTypeInput() {
    return this._certificateType;
  }

  // http2_enabled - computed: true, optional: true, required: false
  private _http2Enabled?: boolean | cdktf.IResolvable; 
  public get http2Enabled() {
    return this.getBooleanAttribute('http2_enabled');
  }
  public set http2Enabled(value: boolean | cdktf.IResolvable) {
    this._http2Enabled = value;
  }
  public resetHttp2Enabled() {
    this._http2Enabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get http2EnabledInput() {
    return this._http2Enabled;
  }

  // http2_status - computed: true, optional: false, required: false
  public get http2Status() {
    return this.getStringAttribute('http2_status');
  }

  // https_enabled - computed: true, optional: true, required: false
  private _httpsEnabled?: boolean | cdktf.IResolvable; 
  public get httpsEnabled() {
    return this.getBooleanAttribute('https_enabled');
  }
  public set httpsEnabled(value: boolean | cdktf.IResolvable) {
    this._httpsEnabled = value;
  }
  public resetHttpsEnabled() {
    this._httpsEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpsEnabledInput() {
    return this._httpsEnabled;
  }

  // https_status - computed: true, optional: false, required: false
  public get httpsStatus() {
    return this.getStringAttribute('https_status');
  }

  // ocsp_stapling_status - computed: true, optional: true, required: false
  private _ocspStaplingStatus?: string; 
  public get ocspStaplingStatus() {
    return this.getStringAttribute('ocsp_stapling_status');
  }
  public set ocspStaplingStatus(value: string) {
    this._ocspStaplingStatus = value;
  }
  public resetOcspStaplingStatus() {
    this._ocspStaplingStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ocspStaplingStatusInput() {
    return this._ocspStaplingStatus;
  }

  // private_key - computed: true, optional: true, required: false
  private _privateKey?: string; 
  public get privateKey() {
    return this.getStringAttribute('private_key');
  }
  public set privateKey(value: string) {
    this._privateKey = value;
  }
  public resetPrivateKey() {
    this._privateKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateKeyInput() {
    return this._privateKey;
  }

  // scm_certificate_id - computed: true, optional: true, required: false
  private _scmCertificateId?: string; 
  public get scmCertificateId() {
    return this.getStringAttribute('scm_certificate_id');
  }
  public set scmCertificateId(value: string) {
    this._scmCertificateId = value;
  }
  public resetScmCertificateId() {
    this._scmCertificateId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scmCertificateIdInput() {
    return this._scmCertificateId;
  }

  // tls_version - computed: true, optional: true, required: false
  private _tlsVersion?: string; 
  public get tlsVersion() {
    return this.getStringAttribute('tls_version');
  }
  public set tlsVersion(value: string) {
    this._tlsVersion = value;
  }
  public resetTlsVersion() {
    this._tlsVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tlsVersionInput() {
    return this._tlsVersion;
  }
}
export interface CdnDomainConfigsIpFilter {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#value CdnDomain#value}
  */
  readonly value?: string;
}

export function cdnDomainConfigsIpFilterToTerraform(struct?: CdnDomainConfigsIpFilterOutputReference | CdnDomainConfigsIpFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cdnDomainConfigsIpFilterToHclTerraform(struct?: CdnDomainConfigsIpFilterOutputReference | CdnDomainConfigsIpFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsIpFilterOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsIpFilter | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsIpFilter | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._type = undefined;
      this._value = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._type = value.type;
      this._value = value.value;
    }
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

  // value - computed: true, optional: true, required: false
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
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
export interface CdnDomainConfigsIpFrequencyLimit {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enabled CdnDomain#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#qps CdnDomain#qps}
  */
  readonly qps?: number;
}

export function cdnDomainConfigsIpFrequencyLimitToTerraform(struct?: CdnDomainConfigsIpFrequencyLimitOutputReference | CdnDomainConfigsIpFrequencyLimit): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    qps: cdktf.numberToTerraform(struct!.qps),
  }
}


export function cdnDomainConfigsIpFrequencyLimitToHclTerraform(struct?: CdnDomainConfigsIpFrequencyLimitOutputReference | CdnDomainConfigsIpFrequencyLimit): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    qps: {
      value: cdktf.numberToHclTerraform(struct!.qps),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsIpFrequencyLimitOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsIpFrequencyLimit | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    if (this._qps !== undefined) {
      hasAnyValues = true;
      internalValueResult.qps = this._qps;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsIpFrequencyLimit | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enabled = undefined;
      this._qps = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enabled = value.enabled;
      this._qps = value.qps;
    }
  }

  // enabled - computed: false, optional: false, required: true
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // qps - computed: true, optional: true, required: false
  private _qps?: number; 
  public get qps() {
    return this.getNumberAttribute('qps');
  }
  public set qps(value: number) {
    this._qps = value;
  }
  public resetQps() {
    this._qps = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get qpsInput() {
    return this._qps;
  }
}
export interface CdnDomainConfigsOriginRequestUrlRewrite {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#match_type CdnDomain#match_type}
  */
  readonly matchType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#priority CdnDomain#priority}
  */
  readonly priority: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#source_url CdnDomain#source_url}
  */
  readonly sourceUrl?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#target_url CdnDomain#target_url}
  */
  readonly targetUrl: string;
}

export function cdnDomainConfigsOriginRequestUrlRewriteToTerraform(struct?: CdnDomainConfigsOriginRequestUrlRewrite | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    match_type: cdktf.stringToTerraform(struct!.matchType),
    priority: cdktf.numberToTerraform(struct!.priority),
    source_url: cdktf.stringToTerraform(struct!.sourceUrl),
    target_url: cdktf.stringToTerraform(struct!.targetUrl),
  }
}


export function cdnDomainConfigsOriginRequestUrlRewriteToHclTerraform(struct?: CdnDomainConfigsOriginRequestUrlRewrite | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    match_type: {
      value: cdktf.stringToHclTerraform(struct!.matchType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    priority: {
      value: cdktf.numberToHclTerraform(struct!.priority),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    source_url: {
      value: cdktf.stringToHclTerraform(struct!.sourceUrl),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_url: {
      value: cdktf.stringToHclTerraform(struct!.targetUrl),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsOriginRequestUrlRewriteOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainConfigsOriginRequestUrlRewrite | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._matchType !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchType = this._matchType;
    }
    if (this._priority !== undefined) {
      hasAnyValues = true;
      internalValueResult.priority = this._priority;
    }
    if (this._sourceUrl !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceUrl = this._sourceUrl;
    }
    if (this._targetUrl !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetUrl = this._targetUrl;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsOriginRequestUrlRewrite | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._matchType = undefined;
      this._priority = undefined;
      this._sourceUrl = undefined;
      this._targetUrl = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._matchType = value.matchType;
      this._priority = value.priority;
      this._sourceUrl = value.sourceUrl;
      this._targetUrl = value.targetUrl;
    }
  }

  // match_type - computed: false, optional: false, required: true
  private _matchType?: string; 
  public get matchType() {
    return this.getStringAttribute('match_type');
  }
  public set matchType(value: string) {
    this._matchType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get matchTypeInput() {
    return this._matchType;
  }

  // priority - computed: false, optional: false, required: true
  private _priority?: number; 
  public get priority() {
    return this.getNumberAttribute('priority');
  }
  public set priority(value: number) {
    this._priority = value;
  }
  // Temporarily expose input value. Use with caution.
  public get priorityInput() {
    return this._priority;
  }

  // source_url - computed: true, optional: true, required: false
  private _sourceUrl?: string; 
  public get sourceUrl() {
    return this.getStringAttribute('source_url');
  }
  public set sourceUrl(value: string) {
    this._sourceUrl = value;
  }
  public resetSourceUrl() {
    this._sourceUrl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceUrlInput() {
    return this._sourceUrl;
  }

  // target_url - computed: false, optional: false, required: true
  private _targetUrl?: string; 
  public get targetUrl() {
    return this.getStringAttribute('target_url');
  }
  public set targetUrl(value: string) {
    this._targetUrl = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetUrlInput() {
    return this._targetUrl;
  }
}

export class CdnDomainConfigsOriginRequestUrlRewriteList extends cdktf.ComplexList {
  public internalValue? : CdnDomainConfigsOriginRequestUrlRewrite[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainConfigsOriginRequestUrlRewriteOutputReference {
    return new CdnDomainConfigsOriginRequestUrlRewriteOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainConfigsQuic {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enabled CdnDomain#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
}

export function cdnDomainConfigsQuicToTerraform(struct?: CdnDomainConfigsQuicOutputReference | CdnDomainConfigsQuic): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
  }
}


export function cdnDomainConfigsQuicToHclTerraform(struct?: CdnDomainConfigsQuicOutputReference | CdnDomainConfigsQuic): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsQuicOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsQuic | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsQuic | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enabled = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enabled = value.enabled;
    }
  }

  // enabled - computed: false, optional: false, required: true
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }
}
export interface CdnDomainConfigsReferer {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#include_empty CdnDomain#include_empty}
  */
  readonly includeEmpty?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#value CdnDomain#value}
  */
  readonly value?: string;
}

export function cdnDomainConfigsRefererToTerraform(struct?: CdnDomainConfigsRefererOutputReference | CdnDomainConfigsReferer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    include_empty: cdktf.booleanToTerraform(struct!.includeEmpty),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cdnDomainConfigsRefererToHclTerraform(struct?: CdnDomainConfigsRefererOutputReference | CdnDomainConfigsReferer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    include_empty: {
      value: cdktf.booleanToHclTerraform(struct!.includeEmpty),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsRefererOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsReferer | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._includeEmpty !== undefined) {
      hasAnyValues = true;
      internalValueResult.includeEmpty = this._includeEmpty;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsReferer | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._includeEmpty = undefined;
      this._type = undefined;
      this._value = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._includeEmpty = value.includeEmpty;
      this._type = value.type;
      this._value = value.value;
    }
  }

  // include_empty - computed: true, optional: true, required: false
  private _includeEmpty?: boolean | cdktf.IResolvable; 
  public get includeEmpty() {
    return this.getBooleanAttribute('include_empty');
  }
  public set includeEmpty(value: boolean | cdktf.IResolvable) {
    this._includeEmpty = value;
  }
  public resetIncludeEmpty() {
    this._includeEmpty = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get includeEmptyInput() {
    return this._includeEmpty;
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

  // value - computed: true, optional: true, required: false
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
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
export interface CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#key CdnDomain#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#value CdnDomain#value}
  */
  readonly value: string;
}

export function cdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesToTerraform(struct?: CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesToHclTerraform(struct?: CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules | cdktf.IResolvable): any {
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
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._key = undefined;
      this._type = undefined;
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
      this._type = value.type;
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

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesOutputReference {
    return new CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#key CdnDomain#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#value CdnDomain#value}
  */
  readonly value: string;
}

export function cdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesToTerraform(struct?: CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesToHclTerraform(struct?: CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules | cdktf.IResolvable): any {
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
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._key = undefined;
      this._type = undefined;
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
      this._type = value.type;
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

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesOutputReference {
    return new CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainConfigsRemoteAuthRemoteAuthRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#auth_failed_status CdnDomain#auth_failed_status}
  */
  readonly authFailedStatus: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#auth_server CdnDomain#auth_server}
  */
  readonly authServer: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#auth_success_status CdnDomain#auth_success_status}
  */
  readonly authSuccessStatus: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#file_type_setting CdnDomain#file_type_setting}
  */
  readonly fileTypeSetting: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#request_method CdnDomain#request_method}
  */
  readonly requestMethod: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#reserve_args CdnDomain#reserve_args}
  */
  readonly reserveArgs?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#reserve_args_setting CdnDomain#reserve_args_setting}
  */
  readonly reserveArgsSetting: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#reserve_headers CdnDomain#reserve_headers}
  */
  readonly reserveHeaders?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#reserve_headers_setting CdnDomain#reserve_headers_setting}
  */
  readonly reserveHeadersSetting: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#response_status CdnDomain#response_status}
  */
  readonly responseStatus: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#specified_file_type CdnDomain#specified_file_type}
  */
  readonly specifiedFileType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#timeout CdnDomain#timeout}
  */
  readonly timeout: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#timeout_action CdnDomain#timeout_action}
  */
  readonly timeoutAction: string;
  /**
  * add_custom_args_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#add_custom_args_rules CdnDomain#add_custom_args_rules}
  */
  readonly addCustomArgsRules?: CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules[] | cdktf.IResolvable;
  /**
  * add_custom_headers_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#add_custom_headers_rules CdnDomain#add_custom_headers_rules}
  */
  readonly addCustomHeadersRules?: CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules[] | cdktf.IResolvable;
}

export function cdnDomainConfigsRemoteAuthRemoteAuthRulesToTerraform(struct?: CdnDomainConfigsRemoteAuthRemoteAuthRulesOutputReference | CdnDomainConfigsRemoteAuthRemoteAuthRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    auth_failed_status: cdktf.stringToTerraform(struct!.authFailedStatus),
    auth_server: cdktf.stringToTerraform(struct!.authServer),
    auth_success_status: cdktf.stringToTerraform(struct!.authSuccessStatus),
    file_type_setting: cdktf.stringToTerraform(struct!.fileTypeSetting),
    request_method: cdktf.stringToTerraform(struct!.requestMethod),
    reserve_args: cdktf.stringToTerraform(struct!.reserveArgs),
    reserve_args_setting: cdktf.stringToTerraform(struct!.reserveArgsSetting),
    reserve_headers: cdktf.stringToTerraform(struct!.reserveHeaders),
    reserve_headers_setting: cdktf.stringToTerraform(struct!.reserveHeadersSetting),
    response_status: cdktf.stringToTerraform(struct!.responseStatus),
    specified_file_type: cdktf.stringToTerraform(struct!.specifiedFileType),
    timeout: cdktf.numberToTerraform(struct!.timeout),
    timeout_action: cdktf.stringToTerraform(struct!.timeoutAction),
    add_custom_args_rules: cdktf.listMapper(cdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesToTerraform, true)(struct!.addCustomArgsRules),
    add_custom_headers_rules: cdktf.listMapper(cdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesToTerraform, true)(struct!.addCustomHeadersRules),
  }
}


export function cdnDomainConfigsRemoteAuthRemoteAuthRulesToHclTerraform(struct?: CdnDomainConfigsRemoteAuthRemoteAuthRulesOutputReference | CdnDomainConfigsRemoteAuthRemoteAuthRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    auth_failed_status: {
      value: cdktf.stringToHclTerraform(struct!.authFailedStatus),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    auth_server: {
      value: cdktf.stringToHclTerraform(struct!.authServer),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    auth_success_status: {
      value: cdktf.stringToHclTerraform(struct!.authSuccessStatus),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    file_type_setting: {
      value: cdktf.stringToHclTerraform(struct!.fileTypeSetting),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    request_method: {
      value: cdktf.stringToHclTerraform(struct!.requestMethod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    reserve_args: {
      value: cdktf.stringToHclTerraform(struct!.reserveArgs),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    reserve_args_setting: {
      value: cdktf.stringToHclTerraform(struct!.reserveArgsSetting),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    reserve_headers: {
      value: cdktf.stringToHclTerraform(struct!.reserveHeaders),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    reserve_headers_setting: {
      value: cdktf.stringToHclTerraform(struct!.reserveHeadersSetting),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    response_status: {
      value: cdktf.stringToHclTerraform(struct!.responseStatus),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    specified_file_type: {
      value: cdktf.stringToHclTerraform(struct!.specifiedFileType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    timeout: {
      value: cdktf.numberToHclTerraform(struct!.timeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    timeout_action: {
      value: cdktf.stringToHclTerraform(struct!.timeoutAction),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    add_custom_args_rules: {
      value: cdktf.listMapperHcl(cdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesToHclTerraform, true)(struct!.addCustomArgsRules),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesList",
    },
    add_custom_headers_rules: {
      value: cdktf.listMapperHcl(cdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesToHclTerraform, true)(struct!.addCustomHeadersRules),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsRemoteAuthRemoteAuthRulesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsRemoteAuthRemoteAuthRules | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authFailedStatus !== undefined) {
      hasAnyValues = true;
      internalValueResult.authFailedStatus = this._authFailedStatus;
    }
    if (this._authServer !== undefined) {
      hasAnyValues = true;
      internalValueResult.authServer = this._authServer;
    }
    if (this._authSuccessStatus !== undefined) {
      hasAnyValues = true;
      internalValueResult.authSuccessStatus = this._authSuccessStatus;
    }
    if (this._fileTypeSetting !== undefined) {
      hasAnyValues = true;
      internalValueResult.fileTypeSetting = this._fileTypeSetting;
    }
    if (this._requestMethod !== undefined) {
      hasAnyValues = true;
      internalValueResult.requestMethod = this._requestMethod;
    }
    if (this._reserveArgs !== undefined) {
      hasAnyValues = true;
      internalValueResult.reserveArgs = this._reserveArgs;
    }
    if (this._reserveArgsSetting !== undefined) {
      hasAnyValues = true;
      internalValueResult.reserveArgsSetting = this._reserveArgsSetting;
    }
    if (this._reserveHeaders !== undefined) {
      hasAnyValues = true;
      internalValueResult.reserveHeaders = this._reserveHeaders;
    }
    if (this._reserveHeadersSetting !== undefined) {
      hasAnyValues = true;
      internalValueResult.reserveHeadersSetting = this._reserveHeadersSetting;
    }
    if (this._responseStatus !== undefined) {
      hasAnyValues = true;
      internalValueResult.responseStatus = this._responseStatus;
    }
    if (this._specifiedFileType !== undefined) {
      hasAnyValues = true;
      internalValueResult.specifiedFileType = this._specifiedFileType;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    if (this._timeoutAction !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeoutAction = this._timeoutAction;
    }
    if (this._addCustomArgsRules?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.addCustomArgsRules = this._addCustomArgsRules?.internalValue;
    }
    if (this._addCustomHeadersRules?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.addCustomHeadersRules = this._addCustomHeadersRules?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsRemoteAuthRemoteAuthRules | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._authFailedStatus = undefined;
      this._authServer = undefined;
      this._authSuccessStatus = undefined;
      this._fileTypeSetting = undefined;
      this._requestMethod = undefined;
      this._reserveArgs = undefined;
      this._reserveArgsSetting = undefined;
      this._reserveHeaders = undefined;
      this._reserveHeadersSetting = undefined;
      this._responseStatus = undefined;
      this._specifiedFileType = undefined;
      this._timeout = undefined;
      this._timeoutAction = undefined;
      this._addCustomArgsRules.internalValue = undefined;
      this._addCustomHeadersRules.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._authFailedStatus = value.authFailedStatus;
      this._authServer = value.authServer;
      this._authSuccessStatus = value.authSuccessStatus;
      this._fileTypeSetting = value.fileTypeSetting;
      this._requestMethod = value.requestMethod;
      this._reserveArgs = value.reserveArgs;
      this._reserveArgsSetting = value.reserveArgsSetting;
      this._reserveHeaders = value.reserveHeaders;
      this._reserveHeadersSetting = value.reserveHeadersSetting;
      this._responseStatus = value.responseStatus;
      this._specifiedFileType = value.specifiedFileType;
      this._timeout = value.timeout;
      this._timeoutAction = value.timeoutAction;
      this._addCustomArgsRules.internalValue = value.addCustomArgsRules;
      this._addCustomHeadersRules.internalValue = value.addCustomHeadersRules;
    }
  }

  // auth_failed_status - computed: false, optional: false, required: true
  private _authFailedStatus?: string; 
  public get authFailedStatus() {
    return this.getStringAttribute('auth_failed_status');
  }
  public set authFailedStatus(value: string) {
    this._authFailedStatus = value;
  }
  // Temporarily expose input value. Use with caution.
  public get authFailedStatusInput() {
    return this._authFailedStatus;
  }

  // auth_server - computed: false, optional: false, required: true
  private _authServer?: string; 
  public get authServer() {
    return this.getStringAttribute('auth_server');
  }
  public set authServer(value: string) {
    this._authServer = value;
  }
  // Temporarily expose input value. Use with caution.
  public get authServerInput() {
    return this._authServer;
  }

  // auth_success_status - computed: false, optional: false, required: true
  private _authSuccessStatus?: string; 
  public get authSuccessStatus() {
    return this.getStringAttribute('auth_success_status');
  }
  public set authSuccessStatus(value: string) {
    this._authSuccessStatus = value;
  }
  // Temporarily expose input value. Use with caution.
  public get authSuccessStatusInput() {
    return this._authSuccessStatus;
  }

  // file_type_setting - computed: false, optional: false, required: true
  private _fileTypeSetting?: string; 
  public get fileTypeSetting() {
    return this.getStringAttribute('file_type_setting');
  }
  public set fileTypeSetting(value: string) {
    this._fileTypeSetting = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fileTypeSettingInput() {
    return this._fileTypeSetting;
  }

  // request_method - computed: false, optional: false, required: true
  private _requestMethod?: string; 
  public get requestMethod() {
    return this.getStringAttribute('request_method');
  }
  public set requestMethod(value: string) {
    this._requestMethod = value;
  }
  // Temporarily expose input value. Use with caution.
  public get requestMethodInput() {
    return this._requestMethod;
  }

  // reserve_args - computed: false, optional: true, required: false
  private _reserveArgs?: string; 
  public get reserveArgs() {
    return this.getStringAttribute('reserve_args');
  }
  public set reserveArgs(value: string) {
    this._reserveArgs = value;
  }
  public resetReserveArgs() {
    this._reserveArgs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get reserveArgsInput() {
    return this._reserveArgs;
  }

  // reserve_args_setting - computed: false, optional: false, required: true
  private _reserveArgsSetting?: string; 
  public get reserveArgsSetting() {
    return this.getStringAttribute('reserve_args_setting');
  }
  public set reserveArgsSetting(value: string) {
    this._reserveArgsSetting = value;
  }
  // Temporarily expose input value. Use with caution.
  public get reserveArgsSettingInput() {
    return this._reserveArgsSetting;
  }

  // reserve_headers - computed: false, optional: true, required: false
  private _reserveHeaders?: string; 
  public get reserveHeaders() {
    return this.getStringAttribute('reserve_headers');
  }
  public set reserveHeaders(value: string) {
    this._reserveHeaders = value;
  }
  public resetReserveHeaders() {
    this._reserveHeaders = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get reserveHeadersInput() {
    return this._reserveHeaders;
  }

  // reserve_headers_setting - computed: false, optional: false, required: true
  private _reserveHeadersSetting?: string; 
  public get reserveHeadersSetting() {
    return this.getStringAttribute('reserve_headers_setting');
  }
  public set reserveHeadersSetting(value: string) {
    this._reserveHeadersSetting = value;
  }
  // Temporarily expose input value. Use with caution.
  public get reserveHeadersSettingInput() {
    return this._reserveHeadersSetting;
  }

  // response_status - computed: false, optional: false, required: true
  private _responseStatus?: string; 
  public get responseStatus() {
    return this.getStringAttribute('response_status');
  }
  public set responseStatus(value: string) {
    this._responseStatus = value;
  }
  // Temporarily expose input value. Use with caution.
  public get responseStatusInput() {
    return this._responseStatus;
  }

  // specified_file_type - computed: false, optional: true, required: false
  private _specifiedFileType?: string; 
  public get specifiedFileType() {
    return this.getStringAttribute('specified_file_type');
  }
  public set specifiedFileType(value: string) {
    this._specifiedFileType = value;
  }
  public resetSpecifiedFileType() {
    this._specifiedFileType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get specifiedFileTypeInput() {
    return this._specifiedFileType;
  }

  // timeout - computed: false, optional: false, required: true
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }

  // timeout_action - computed: false, optional: false, required: true
  private _timeoutAction?: string; 
  public get timeoutAction() {
    return this.getStringAttribute('timeout_action');
  }
  public set timeoutAction(value: string) {
    this._timeoutAction = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutActionInput() {
    return this._timeoutAction;
  }

  // add_custom_args_rules - computed: false, optional: true, required: false
  private _addCustomArgsRules = new CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesList(this, "add_custom_args_rules", true);
  public get addCustomArgsRules() {
    return this._addCustomArgsRules;
  }
  public putAddCustomArgsRules(value: CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules[] | cdktf.IResolvable) {
    this._addCustomArgsRules.internalValue = value;
  }
  public resetAddCustomArgsRules() {
    this._addCustomArgsRules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addCustomArgsRulesInput() {
    return this._addCustomArgsRules.internalValue;
  }

  // add_custom_headers_rules - computed: false, optional: true, required: false
  private _addCustomHeadersRules = new CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesList(this, "add_custom_headers_rules", true);
  public get addCustomHeadersRules() {
    return this._addCustomHeadersRules;
  }
  public putAddCustomHeadersRules(value: CdnDomainConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules[] | cdktf.IResolvable) {
    this._addCustomHeadersRules.internalValue = value;
  }
  public resetAddCustomHeadersRules() {
    this._addCustomHeadersRules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addCustomHeadersRulesInput() {
    return this._addCustomHeadersRules.internalValue;
  }
}
export interface CdnDomainConfigsRemoteAuth {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enabled CdnDomain#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * remote_auth_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#remote_auth_rules CdnDomain#remote_auth_rules}
  */
  readonly remoteAuthRules?: CdnDomainConfigsRemoteAuthRemoteAuthRules;
}

export function cdnDomainConfigsRemoteAuthToTerraform(struct?: CdnDomainConfigsRemoteAuthOutputReference | CdnDomainConfigsRemoteAuth): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    remote_auth_rules: cdnDomainConfigsRemoteAuthRemoteAuthRulesToTerraform(struct!.remoteAuthRules),
  }
}


export function cdnDomainConfigsRemoteAuthToHclTerraform(struct?: CdnDomainConfigsRemoteAuthOutputReference | CdnDomainConfigsRemoteAuth): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    remote_auth_rules: {
      value: cdnDomainConfigsRemoteAuthRemoteAuthRulesToHclTerraform(struct!.remoteAuthRules),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsRemoteAuthRemoteAuthRulesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsRemoteAuthOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsRemoteAuth | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    if (this._remoteAuthRules?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.remoteAuthRules = this._remoteAuthRules?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsRemoteAuth | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enabled = undefined;
      this._remoteAuthRules.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enabled = value.enabled;
      this._remoteAuthRules.internalValue = value.remoteAuthRules;
    }
  }

  // enabled - computed: false, optional: false, required: true
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // remote_auth_rules - computed: false, optional: true, required: false
  private _remoteAuthRules = new CdnDomainConfigsRemoteAuthRemoteAuthRulesOutputReference(this, "remote_auth_rules");
  public get remoteAuthRules() {
    return this._remoteAuthRules;
  }
  public putRemoteAuthRules(value: CdnDomainConfigsRemoteAuthRemoteAuthRules) {
    this._remoteAuthRules.internalValue = value;
  }
  public resetRemoteAuthRules() {
    this._remoteAuthRules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get remoteAuthRulesInput() {
    return this._remoteAuthRules.internalValue;
  }
}
export interface CdnDomainConfigsRequestLimitRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#limit_rate_after CdnDomain#limit_rate_after}
  */
  readonly limitRateAfter: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#limit_rate_value CdnDomain#limit_rate_value}
  */
  readonly limitRateValue: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#match_type CdnDomain#match_type}
  */
  readonly matchType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#match_value CdnDomain#match_value}
  */
  readonly matchValue?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#priority CdnDomain#priority}
  */
  readonly priority: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type: string;
}

export function cdnDomainConfigsRequestLimitRulesToTerraform(struct?: CdnDomainConfigsRequestLimitRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    limit_rate_after: cdktf.numberToTerraform(struct!.limitRateAfter),
    limit_rate_value: cdktf.numberToTerraform(struct!.limitRateValue),
    match_type: cdktf.stringToTerraform(struct!.matchType),
    match_value: cdktf.stringToTerraform(struct!.matchValue),
    priority: cdktf.numberToTerraform(struct!.priority),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function cdnDomainConfigsRequestLimitRulesToHclTerraform(struct?: CdnDomainConfigsRequestLimitRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    limit_rate_after: {
      value: cdktf.numberToHclTerraform(struct!.limitRateAfter),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    limit_rate_value: {
      value: cdktf.numberToHclTerraform(struct!.limitRateValue),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    match_type: {
      value: cdktf.stringToHclTerraform(struct!.matchType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    match_value: {
      value: cdktf.stringToHclTerraform(struct!.matchValue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    priority: {
      value: cdktf.numberToHclTerraform(struct!.priority),
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

export class CdnDomainConfigsRequestLimitRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainConfigsRequestLimitRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._limitRateAfter !== undefined) {
      hasAnyValues = true;
      internalValueResult.limitRateAfter = this._limitRateAfter;
    }
    if (this._limitRateValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.limitRateValue = this._limitRateValue;
    }
    if (this._matchType !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchType = this._matchType;
    }
    if (this._matchValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchValue = this._matchValue;
    }
    if (this._priority !== undefined) {
      hasAnyValues = true;
      internalValueResult.priority = this._priority;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsRequestLimitRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._limitRateAfter = undefined;
      this._limitRateValue = undefined;
      this._matchType = undefined;
      this._matchValue = undefined;
      this._priority = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._limitRateAfter = value.limitRateAfter;
      this._limitRateValue = value.limitRateValue;
      this._matchType = value.matchType;
      this._matchValue = value.matchValue;
      this._priority = value.priority;
      this._type = value.type;
    }
  }

  // limit_rate_after - computed: false, optional: false, required: true
  private _limitRateAfter?: number; 
  public get limitRateAfter() {
    return this.getNumberAttribute('limit_rate_after');
  }
  public set limitRateAfter(value: number) {
    this._limitRateAfter = value;
  }
  // Temporarily expose input value. Use with caution.
  public get limitRateAfterInput() {
    return this._limitRateAfter;
  }

  // limit_rate_value - computed: false, optional: false, required: true
  private _limitRateValue?: number; 
  public get limitRateValue() {
    return this.getNumberAttribute('limit_rate_value');
  }
  public set limitRateValue(value: number) {
    this._limitRateValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get limitRateValueInput() {
    return this._limitRateValue;
  }

  // match_type - computed: false, optional: false, required: true
  private _matchType?: string; 
  public get matchType() {
    return this.getStringAttribute('match_type');
  }
  public set matchType(value: string) {
    this._matchType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get matchTypeInput() {
    return this._matchType;
  }

  // match_value - computed: false, optional: true, required: false
  private _matchValue?: string; 
  public get matchValue() {
    return this.getStringAttribute('match_value');
  }
  public set matchValue(value: string) {
    this._matchValue = value;
  }
  public resetMatchValue() {
    this._matchValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchValueInput() {
    return this._matchValue;
  }

  // priority - computed: false, optional: false, required: true
  private _priority?: number; 
  public get priority() {
    return this.getNumberAttribute('priority');
  }
  public set priority(value: number) {
    this._priority = value;
  }
  // Temporarily expose input value. Use with caution.
  public get priorityInput() {
    return this._priority;
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

export class CdnDomainConfigsRequestLimitRulesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainConfigsRequestLimitRules[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainConfigsRequestLimitRulesOutputReference {
    return new CdnDomainConfigsRequestLimitRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainConfigsRetrievalRequestHeader {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#action CdnDomain#action}
  */
  readonly action: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#name CdnDomain#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#value CdnDomain#value}
  */
  readonly value?: string;
}

export function cdnDomainConfigsRetrievalRequestHeaderToTerraform(struct?: CdnDomainConfigsRetrievalRequestHeader | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    action: cdktf.stringToTerraform(struct!.action),
    name: cdktf.stringToTerraform(struct!.name),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cdnDomainConfigsRetrievalRequestHeaderToHclTerraform(struct?: CdnDomainConfigsRetrievalRequestHeader | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    action: {
      value: cdktf.stringToHclTerraform(struct!.action),
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
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsRetrievalRequestHeaderOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainConfigsRetrievalRequestHeader | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._action !== undefined) {
      hasAnyValues = true;
      internalValueResult.action = this._action;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsRetrievalRequestHeader | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._action = undefined;
      this._name = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._action = value.action;
      this._name = value.name;
      this._value = value.value;
    }
  }

  // action - computed: false, optional: false, required: true
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
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

  // value - computed: false, optional: true, required: false
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
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

export class CdnDomainConfigsRetrievalRequestHeaderList extends cdktf.ComplexList {
  public internalValue? : CdnDomainConfigsRetrievalRequestHeader[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainConfigsRetrievalRequestHeaderOutputReference {
    return new CdnDomainConfigsRetrievalRequestHeaderOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainConfigsUrlSigningInheritConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enabled CdnDomain#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#inherit_time_type CdnDomain#inherit_time_type}
  */
  readonly inheritTimeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#inherit_type CdnDomain#inherit_type}
  */
  readonly inheritType?: string;
}

export function cdnDomainConfigsUrlSigningInheritConfigToTerraform(struct?: CdnDomainConfigsUrlSigningInheritConfigOutputReference | CdnDomainConfigsUrlSigningInheritConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    inherit_time_type: cdktf.stringToTerraform(struct!.inheritTimeType),
    inherit_type: cdktf.stringToTerraform(struct!.inheritType),
  }
}


export function cdnDomainConfigsUrlSigningInheritConfigToHclTerraform(struct?: CdnDomainConfigsUrlSigningInheritConfigOutputReference | CdnDomainConfigsUrlSigningInheritConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    inherit_time_type: {
      value: cdktf.stringToHclTerraform(struct!.inheritTimeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    inherit_type: {
      value: cdktf.stringToHclTerraform(struct!.inheritType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsUrlSigningInheritConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsUrlSigningInheritConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    if (this._inheritTimeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.inheritTimeType = this._inheritTimeType;
    }
    if (this._inheritType !== undefined) {
      hasAnyValues = true;
      internalValueResult.inheritType = this._inheritType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsUrlSigningInheritConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enabled = undefined;
      this._inheritTimeType = undefined;
      this._inheritType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enabled = value.enabled;
      this._inheritTimeType = value.inheritTimeType;
      this._inheritType = value.inheritType;
    }
  }

  // enabled - computed: false, optional: false, required: true
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // inherit_time_type - computed: true, optional: true, required: false
  private _inheritTimeType?: string; 
  public get inheritTimeType() {
    return this.getStringAttribute('inherit_time_type');
  }
  public set inheritTimeType(value: string) {
    this._inheritTimeType = value;
  }
  public resetInheritTimeType() {
    this._inheritTimeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inheritTimeTypeInput() {
    return this._inheritTimeType;
  }

  // inherit_type - computed: true, optional: true, required: false
  private _inheritType?: string; 
  public get inheritType() {
    return this.getStringAttribute('inherit_type');
  }
  public set inheritType(value: string) {
    this._inheritType = value;
  }
  public resetInheritType() {
    this._inheritType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inheritTypeInput() {
    return this._inheritType;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }
}
export interface CdnDomainConfigsUrlSigning {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#backup_key CdnDomain#backup_key}
  */
  readonly backupKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enabled CdnDomain#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#expire_time CdnDomain#expire_time}
  */
  readonly expireTime?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#key CdnDomain#key}
  */
  readonly key?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#match_type CdnDomain#match_type}
  */
  readonly matchType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#sign_arg CdnDomain#sign_arg}
  */
  readonly signArg?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#sign_method CdnDomain#sign_method}
  */
  readonly signMethod?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#time_format CdnDomain#time_format}
  */
  readonly timeFormat?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type?: string;
  /**
  * inherit_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#inherit_config CdnDomain#inherit_config}
  */
  readonly inheritConfig?: CdnDomainConfigsUrlSigningInheritConfig;
}

export function cdnDomainConfigsUrlSigningToTerraform(struct?: CdnDomainConfigsUrlSigningOutputReference | CdnDomainConfigsUrlSigning): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    backup_key: cdktf.stringToTerraform(struct!.backupKey),
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    expire_time: cdktf.numberToTerraform(struct!.expireTime),
    key: cdktf.stringToTerraform(struct!.key),
    match_type: cdktf.stringToTerraform(struct!.matchType),
    sign_arg: cdktf.stringToTerraform(struct!.signArg),
    sign_method: cdktf.stringToTerraform(struct!.signMethod),
    time_format: cdktf.stringToTerraform(struct!.timeFormat),
    type: cdktf.stringToTerraform(struct!.type),
    inherit_config: cdnDomainConfigsUrlSigningInheritConfigToTerraform(struct!.inheritConfig),
  }
}


export function cdnDomainConfigsUrlSigningToHclTerraform(struct?: CdnDomainConfigsUrlSigningOutputReference | CdnDomainConfigsUrlSigning): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    backup_key: {
      value: cdktf.stringToHclTerraform(struct!.backupKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    expire_time: {
      value: cdktf.numberToHclTerraform(struct!.expireTime),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    key: {
      value: cdktf.stringToHclTerraform(struct!.key),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    match_type: {
      value: cdktf.stringToHclTerraform(struct!.matchType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sign_arg: {
      value: cdktf.stringToHclTerraform(struct!.signArg),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sign_method: {
      value: cdktf.stringToHclTerraform(struct!.signMethod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    time_format: {
      value: cdktf.stringToHclTerraform(struct!.timeFormat),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    inherit_config: {
      value: cdnDomainConfigsUrlSigningInheritConfigToHclTerraform(struct!.inheritConfig),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsUrlSigningInheritConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsUrlSigningOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsUrlSigning | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._backupKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.backupKey = this._backupKey;
    }
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    if (this._expireTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.expireTime = this._expireTime;
    }
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    if (this._matchType !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchType = this._matchType;
    }
    if (this._signArg !== undefined) {
      hasAnyValues = true;
      internalValueResult.signArg = this._signArg;
    }
    if (this._signMethod !== undefined) {
      hasAnyValues = true;
      internalValueResult.signMethod = this._signMethod;
    }
    if (this._timeFormat !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeFormat = this._timeFormat;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._inheritConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.inheritConfig = this._inheritConfig?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsUrlSigning | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._backupKey = undefined;
      this._enabled = undefined;
      this._expireTime = undefined;
      this._key = undefined;
      this._matchType = undefined;
      this._signArg = undefined;
      this._signMethod = undefined;
      this._timeFormat = undefined;
      this._type = undefined;
      this._inheritConfig.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._backupKey = value.backupKey;
      this._enabled = value.enabled;
      this._expireTime = value.expireTime;
      this._key = value.key;
      this._matchType = value.matchType;
      this._signArg = value.signArg;
      this._signMethod = value.signMethod;
      this._timeFormat = value.timeFormat;
      this._type = value.type;
      this._inheritConfig.internalValue = value.inheritConfig;
    }
  }

  // backup_key - computed: true, optional: true, required: false
  private _backupKey?: string; 
  public get backupKey() {
    return this.getStringAttribute('backup_key');
  }
  public set backupKey(value: string) {
    this._backupKey = value;
  }
  public resetBackupKey() {
    this._backupKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backupKeyInput() {
    return this._backupKey;
  }

  // enabled - computed: false, optional: false, required: true
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // expire_time - computed: true, optional: true, required: false
  private _expireTime?: number; 
  public get expireTime() {
    return this.getNumberAttribute('expire_time');
  }
  public set expireTime(value: number) {
    this._expireTime = value;
  }
  public resetExpireTime() {
    this._expireTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expireTimeInput() {
    return this._expireTime;
  }

  // key - computed: true, optional: true, required: false
  private _key?: string; 
  public get key() {
    return this.getStringAttribute('key');
  }
  public set key(value: string) {
    this._key = value;
  }
  public resetKey() {
    this._key = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyInput() {
    return this._key;
  }

  // match_type - computed: true, optional: true, required: false
  private _matchType?: string; 
  public get matchType() {
    return this.getStringAttribute('match_type');
  }
  public set matchType(value: string) {
    this._matchType = value;
  }
  public resetMatchType() {
    this._matchType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchTypeInput() {
    return this._matchType;
  }

  // sign_arg - computed: true, optional: true, required: false
  private _signArg?: string; 
  public get signArg() {
    return this.getStringAttribute('sign_arg');
  }
  public set signArg(value: string) {
    this._signArg = value;
  }
  public resetSignArg() {
    this._signArg = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get signArgInput() {
    return this._signArg;
  }

  // sign_method - computed: true, optional: true, required: false
  private _signMethod?: string; 
  public get signMethod() {
    return this.getStringAttribute('sign_method');
  }
  public set signMethod(value: string) {
    this._signMethod = value;
  }
  public resetSignMethod() {
    this._signMethod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get signMethodInput() {
    return this._signMethod;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // time_format - computed: true, optional: true, required: false
  private _timeFormat?: string; 
  public get timeFormat() {
    return this.getStringAttribute('time_format');
  }
  public set timeFormat(value: string) {
    this._timeFormat = value;
  }
  public resetTimeFormat() {
    this._timeFormat = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeFormatInput() {
    return this._timeFormat;
  }

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // inherit_config - computed: false, optional: true, required: false
  private _inheritConfig = new CdnDomainConfigsUrlSigningInheritConfigOutputReference(this, "inherit_config");
  public get inheritConfig() {
    return this._inheritConfig;
  }
  public putInheritConfig(value: CdnDomainConfigsUrlSigningInheritConfig) {
    this._inheritConfig.internalValue = value;
  }
  public resetInheritConfig() {
    this._inheritConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inheritConfigInput() {
    return this._inheritConfig.internalValue;
  }
}
export interface CdnDomainConfigsUserAgentFilter {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#include_empty CdnDomain#include_empty}
  */
  readonly includeEmpty?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#type CdnDomain#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#ua_list CdnDomain#ua_list}
  */
  readonly uaList?: string[];
}

export function cdnDomainConfigsUserAgentFilterToTerraform(struct?: CdnDomainConfigsUserAgentFilterOutputReference | CdnDomainConfigsUserAgentFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    include_empty: cdktf.stringToTerraform(struct!.includeEmpty),
    type: cdktf.stringToTerraform(struct!.type),
    ua_list: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.uaList),
  }
}


export function cdnDomainConfigsUserAgentFilterToHclTerraform(struct?: CdnDomainConfigsUserAgentFilterOutputReference | CdnDomainConfigsUserAgentFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    include_empty: {
      value: cdktf.stringToHclTerraform(struct!.includeEmpty),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ua_list: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.uaList),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsUserAgentFilterOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsUserAgentFilter | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._includeEmpty !== undefined) {
      hasAnyValues = true;
      internalValueResult.includeEmpty = this._includeEmpty;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._uaList !== undefined) {
      hasAnyValues = true;
      internalValueResult.uaList = this._uaList;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsUserAgentFilter | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._includeEmpty = undefined;
      this._type = undefined;
      this._uaList = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._includeEmpty = value.includeEmpty;
      this._type = value.type;
      this._uaList = value.uaList;
    }
  }

  // include_empty - computed: true, optional: true, required: false
  private _includeEmpty?: string; 
  public get includeEmpty() {
    return this.getStringAttribute('include_empty');
  }
  public set includeEmpty(value: string) {
    this._includeEmpty = value;
  }
  public resetIncludeEmpty() {
    this._includeEmpty = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get includeEmptyInput() {
    return this._includeEmpty;
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

  // ua_list - computed: true, optional: true, required: false
  private _uaList?: string[]; 
  public get uaList() {
    return cdktf.Fn.tolist(this.getListAttribute('ua_list'));
  }
  public set uaList(value: string[]) {
    this._uaList = value;
  }
  public resetUaList() {
    this._uaList = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get uaListInput() {
    return this._uaList;
  }
}
export interface CdnDomainConfigsVideoSeek {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enable_flv_by_time_seek CdnDomain#enable_flv_by_time_seek}
  */
  readonly enableFlvByTimeSeek?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enable_video_seek CdnDomain#enable_video_seek}
  */
  readonly enableVideoSeek: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#end_parameter CdnDomain#end_parameter}
  */
  readonly endParameter?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#start_parameter CdnDomain#start_parameter}
  */
  readonly startParameter?: string;
}

export function cdnDomainConfigsVideoSeekToTerraform(struct?: CdnDomainConfigsVideoSeekOutputReference | CdnDomainConfigsVideoSeek): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enable_flv_by_time_seek: cdktf.booleanToTerraform(struct!.enableFlvByTimeSeek),
    enable_video_seek: cdktf.booleanToTerraform(struct!.enableVideoSeek),
    end_parameter: cdktf.stringToTerraform(struct!.endParameter),
    start_parameter: cdktf.stringToTerraform(struct!.startParameter),
  }
}


export function cdnDomainConfigsVideoSeekToHclTerraform(struct?: CdnDomainConfigsVideoSeekOutputReference | CdnDomainConfigsVideoSeek): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enable_flv_by_time_seek: {
      value: cdktf.booleanToHclTerraform(struct!.enableFlvByTimeSeek),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    enable_video_seek: {
      value: cdktf.booleanToHclTerraform(struct!.enableVideoSeek),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    end_parameter: {
      value: cdktf.stringToHclTerraform(struct!.endParameter),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    start_parameter: {
      value: cdktf.stringToHclTerraform(struct!.startParameter),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsVideoSeekOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsVideoSeek | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enableFlvByTimeSeek !== undefined) {
      hasAnyValues = true;
      internalValueResult.enableFlvByTimeSeek = this._enableFlvByTimeSeek;
    }
    if (this._enableVideoSeek !== undefined) {
      hasAnyValues = true;
      internalValueResult.enableVideoSeek = this._enableVideoSeek;
    }
    if (this._endParameter !== undefined) {
      hasAnyValues = true;
      internalValueResult.endParameter = this._endParameter;
    }
    if (this._startParameter !== undefined) {
      hasAnyValues = true;
      internalValueResult.startParameter = this._startParameter;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsVideoSeek | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enableFlvByTimeSeek = undefined;
      this._enableVideoSeek = undefined;
      this._endParameter = undefined;
      this._startParameter = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enableFlvByTimeSeek = value.enableFlvByTimeSeek;
      this._enableVideoSeek = value.enableVideoSeek;
      this._endParameter = value.endParameter;
      this._startParameter = value.startParameter;
    }
  }

  // enable_flv_by_time_seek - computed: true, optional: true, required: false
  private _enableFlvByTimeSeek?: boolean | cdktf.IResolvable; 
  public get enableFlvByTimeSeek() {
    return this.getBooleanAttribute('enable_flv_by_time_seek');
  }
  public set enableFlvByTimeSeek(value: boolean | cdktf.IResolvable) {
    this._enableFlvByTimeSeek = value;
  }
  public resetEnableFlvByTimeSeek() {
    this._enableFlvByTimeSeek = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableFlvByTimeSeekInput() {
    return this._enableFlvByTimeSeek;
  }

  // enable_video_seek - computed: false, optional: false, required: true
  private _enableVideoSeek?: boolean | cdktf.IResolvable; 
  public get enableVideoSeek() {
    return this.getBooleanAttribute('enable_video_seek');
  }
  public set enableVideoSeek(value: boolean | cdktf.IResolvable) {
    this._enableVideoSeek = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enableVideoSeekInput() {
    return this._enableVideoSeek;
  }

  // end_parameter - computed: false, optional: true, required: false
  private _endParameter?: string; 
  public get endParameter() {
    return this.getStringAttribute('end_parameter');
  }
  public set endParameter(value: string) {
    this._endParameter = value;
  }
  public resetEndParameter() {
    this._endParameter = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endParameterInput() {
    return this._endParameter;
  }

  // start_parameter - computed: false, optional: true, required: false
  private _startParameter?: string; 
  public get startParameter() {
    return this.getStringAttribute('start_parameter');
  }
  public set startParameter(value: string) {
    this._startParameter = value;
  }
  public resetStartParameter() {
    this._startParameter = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get startParameterInput() {
    return this._startParameter;
  }
}
export interface CdnDomainConfigsWebsocket {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#enabled CdnDomain#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#timeout CdnDomain#timeout}
  */
  readonly timeout?: number;
}

export function cdnDomainConfigsWebsocketToTerraform(struct?: CdnDomainConfigsWebsocketOutputReference | CdnDomainConfigsWebsocket): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    timeout: cdktf.numberToTerraform(struct!.timeout),
  }
}


export function cdnDomainConfigsWebsocketToHclTerraform(struct?: CdnDomainConfigsWebsocketOutputReference | CdnDomainConfigsWebsocket): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    timeout: {
      value: cdktf.numberToHclTerraform(struct!.timeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsWebsocketOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigsWebsocket | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigsWebsocket | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enabled = undefined;
      this._timeout = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enabled = value.enabled;
      this._timeout = value.timeout;
    }
  }

  // enabled - computed: false, optional: false, required: true
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // timeout - computed: true, optional: true, required: false
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  public resetTimeout() {
    this._timeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }
}
export interface CdnDomainConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#description CdnDomain#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#ipv6_enable CdnDomain#ipv6_enable}
  */
  readonly ipv6Enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#origin_follow302_status CdnDomain#origin_follow302_status}
  */
  readonly originFollow302Status?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#origin_protocol CdnDomain#origin_protocol}
  */
  readonly originProtocol?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#origin_receive_timeout CdnDomain#origin_receive_timeout}
  */
  readonly originReceiveTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#range_based_retrieval_enabled CdnDomain#range_based_retrieval_enabled}
  */
  readonly rangeBasedRetrievalEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#slice_etag_status CdnDomain#slice_etag_status}
  */
  readonly sliceEtagStatus?: string;
  /**
  * access_area_filter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#access_area_filter CdnDomain#access_area_filter}
  */
  readonly accessAreaFilter?: CdnDomainConfigsAccessAreaFilter[] | cdktf.IResolvable;
  /**
  * cache_url_parameter_filter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#cache_url_parameter_filter CdnDomain#cache_url_parameter_filter}
  */
  readonly cacheUrlParameterFilter?: CdnDomainConfigsCacheUrlParameterFilter;
  /**
  * compress block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#compress CdnDomain#compress}
  */
  readonly compress?: CdnDomainConfigsCompress;
  /**
  * error_code_cache block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#error_code_cache CdnDomain#error_code_cache}
  */
  readonly errorCodeCache?: CdnDomainConfigsErrorCodeCache[] | cdktf.IResolvable;
  /**
  * error_code_redirect_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#error_code_redirect_rules CdnDomain#error_code_redirect_rules}
  */
  readonly errorCodeRedirectRules?: CdnDomainConfigsErrorCodeRedirectRules[] | cdktf.IResolvable;
  /**
  * flexible_origin block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#flexible_origin CdnDomain#flexible_origin}
  */
  readonly flexibleOrigin?: CdnDomainConfigsFlexibleOrigin[] | cdktf.IResolvable;
  /**
  * force_redirect block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#force_redirect CdnDomain#force_redirect}
  */
  readonly forceRedirect?: CdnDomainConfigsForceRedirect;
  /**
  * hsts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#hsts CdnDomain#hsts}
  */
  readonly hsts?: CdnDomainConfigsHsts;
  /**
  * http_response_header block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#http_response_header CdnDomain#http_response_header}
  */
  readonly httpResponseHeader?: CdnDomainConfigsHttpResponseHeader[] | cdktf.IResolvable;
  /**
  * https_settings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#https_settings CdnDomain#https_settings}
  */
  readonly httpsSettings?: CdnDomainConfigsHttpsSettings;
  /**
  * ip_filter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#ip_filter CdnDomain#ip_filter}
  */
  readonly ipFilter?: CdnDomainConfigsIpFilter;
  /**
  * ip_frequency_limit block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#ip_frequency_limit CdnDomain#ip_frequency_limit}
  */
  readonly ipFrequencyLimit?: CdnDomainConfigsIpFrequencyLimit;
  /**
  * origin_request_url_rewrite block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#origin_request_url_rewrite CdnDomain#origin_request_url_rewrite}
  */
  readonly originRequestUrlRewrite?: CdnDomainConfigsOriginRequestUrlRewrite[] | cdktf.IResolvable;
  /**
  * quic block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#quic CdnDomain#quic}
  */
  readonly quic?: CdnDomainConfigsQuic;
  /**
  * referer block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#referer CdnDomain#referer}
  */
  readonly referer?: CdnDomainConfigsReferer;
  /**
  * remote_auth block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#remote_auth CdnDomain#remote_auth}
  */
  readonly remoteAuth?: CdnDomainConfigsRemoteAuth;
  /**
  * request_limit_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#request_limit_rules CdnDomain#request_limit_rules}
  */
  readonly requestLimitRules?: CdnDomainConfigsRequestLimitRules[] | cdktf.IResolvable;
  /**
  * retrieval_request_header block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#retrieval_request_header CdnDomain#retrieval_request_header}
  */
  readonly retrievalRequestHeader?: CdnDomainConfigsRetrievalRequestHeader[] | cdktf.IResolvable;
  /**
  * url_signing block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#url_signing CdnDomain#url_signing}
  */
  readonly urlSigning?: CdnDomainConfigsUrlSigning;
  /**
  * user_agent_filter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#user_agent_filter CdnDomain#user_agent_filter}
  */
  readonly userAgentFilter?: CdnDomainConfigsUserAgentFilter;
  /**
  * video_seek block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#video_seek CdnDomain#video_seek}
  */
  readonly videoSeek?: CdnDomainConfigsVideoSeek;
  /**
  * websocket block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#websocket CdnDomain#websocket}
  */
  readonly websocket?: CdnDomainConfigsWebsocket;
}

export function cdnDomainConfigsToTerraform(struct?: CdnDomainConfigsOutputReference | CdnDomainConfigs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    ipv6_enable: cdktf.booleanToTerraform(struct!.ipv6Enable),
    origin_follow302_status: cdktf.stringToTerraform(struct!.originFollow302Status),
    origin_protocol: cdktf.stringToTerraform(struct!.originProtocol),
    origin_receive_timeout: cdktf.numberToTerraform(struct!.originReceiveTimeout),
    range_based_retrieval_enabled: cdktf.booleanToTerraform(struct!.rangeBasedRetrievalEnabled),
    slice_etag_status: cdktf.stringToTerraform(struct!.sliceEtagStatus),
    access_area_filter: cdktf.listMapper(cdnDomainConfigsAccessAreaFilterToTerraform, true)(struct!.accessAreaFilter),
    cache_url_parameter_filter: cdnDomainConfigsCacheUrlParameterFilterToTerraform(struct!.cacheUrlParameterFilter),
    compress: cdnDomainConfigsCompressToTerraform(struct!.compress),
    error_code_cache: cdktf.listMapper(cdnDomainConfigsErrorCodeCacheToTerraform, true)(struct!.errorCodeCache),
    error_code_redirect_rules: cdktf.listMapper(cdnDomainConfigsErrorCodeRedirectRulesToTerraform, true)(struct!.errorCodeRedirectRules),
    flexible_origin: cdktf.listMapper(cdnDomainConfigsFlexibleOriginToTerraform, true)(struct!.flexibleOrigin),
    force_redirect: cdnDomainConfigsForceRedirectToTerraform(struct!.forceRedirect),
    hsts: cdnDomainConfigsHstsToTerraform(struct!.hsts),
    http_response_header: cdktf.listMapper(cdnDomainConfigsHttpResponseHeaderToTerraform, true)(struct!.httpResponseHeader),
    https_settings: cdnDomainConfigsHttpsSettingsToTerraform(struct!.httpsSettings),
    ip_filter: cdnDomainConfigsIpFilterToTerraform(struct!.ipFilter),
    ip_frequency_limit: cdnDomainConfigsIpFrequencyLimitToTerraform(struct!.ipFrequencyLimit),
    origin_request_url_rewrite: cdktf.listMapper(cdnDomainConfigsOriginRequestUrlRewriteToTerraform, true)(struct!.originRequestUrlRewrite),
    quic: cdnDomainConfigsQuicToTerraform(struct!.quic),
    referer: cdnDomainConfigsRefererToTerraform(struct!.referer),
    remote_auth: cdnDomainConfigsRemoteAuthToTerraform(struct!.remoteAuth),
    request_limit_rules: cdktf.listMapper(cdnDomainConfigsRequestLimitRulesToTerraform, true)(struct!.requestLimitRules),
    retrieval_request_header: cdktf.listMapper(cdnDomainConfigsRetrievalRequestHeaderToTerraform, true)(struct!.retrievalRequestHeader),
    url_signing: cdnDomainConfigsUrlSigningToTerraform(struct!.urlSigning),
    user_agent_filter: cdnDomainConfigsUserAgentFilterToTerraform(struct!.userAgentFilter),
    video_seek: cdnDomainConfigsVideoSeekToTerraform(struct!.videoSeek),
    websocket: cdnDomainConfigsWebsocketToTerraform(struct!.websocket),
  }
}


export function cdnDomainConfigsToHclTerraform(struct?: CdnDomainConfigsOutputReference | CdnDomainConfigs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ipv6_enable: {
      value: cdktf.booleanToHclTerraform(struct!.ipv6Enable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    origin_follow302_status: {
      value: cdktf.stringToHclTerraform(struct!.originFollow302Status),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    origin_protocol: {
      value: cdktf.stringToHclTerraform(struct!.originProtocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    origin_receive_timeout: {
      value: cdktf.numberToHclTerraform(struct!.originReceiveTimeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    range_based_retrieval_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.rangeBasedRetrievalEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    slice_etag_status: {
      value: cdktf.stringToHclTerraform(struct!.sliceEtagStatus),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    access_area_filter: {
      value: cdktf.listMapperHcl(cdnDomainConfigsAccessAreaFilterToHclTerraform, true)(struct!.accessAreaFilter),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainConfigsAccessAreaFilterList",
    },
    cache_url_parameter_filter: {
      value: cdnDomainConfigsCacheUrlParameterFilterToHclTerraform(struct!.cacheUrlParameterFilter),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsCacheUrlParameterFilterList",
    },
    compress: {
      value: cdnDomainConfigsCompressToHclTerraform(struct!.compress),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsCompressList",
    },
    error_code_cache: {
      value: cdktf.listMapperHcl(cdnDomainConfigsErrorCodeCacheToHclTerraform, true)(struct!.errorCodeCache),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainConfigsErrorCodeCacheList",
    },
    error_code_redirect_rules: {
      value: cdktf.listMapperHcl(cdnDomainConfigsErrorCodeRedirectRulesToHclTerraform, true)(struct!.errorCodeRedirectRules),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainConfigsErrorCodeRedirectRulesList",
    },
    flexible_origin: {
      value: cdktf.listMapperHcl(cdnDomainConfigsFlexibleOriginToHclTerraform, true)(struct!.flexibleOrigin),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainConfigsFlexibleOriginList",
    },
    force_redirect: {
      value: cdnDomainConfigsForceRedirectToHclTerraform(struct!.forceRedirect),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsForceRedirectList",
    },
    hsts: {
      value: cdnDomainConfigsHstsToHclTerraform(struct!.hsts),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsHstsList",
    },
    http_response_header: {
      value: cdktf.listMapperHcl(cdnDomainConfigsHttpResponseHeaderToHclTerraform, true)(struct!.httpResponseHeader),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainConfigsHttpResponseHeaderList",
    },
    https_settings: {
      value: cdnDomainConfigsHttpsSettingsToHclTerraform(struct!.httpsSettings),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsHttpsSettingsList",
    },
    ip_filter: {
      value: cdnDomainConfigsIpFilterToHclTerraform(struct!.ipFilter),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsIpFilterList",
    },
    ip_frequency_limit: {
      value: cdnDomainConfigsIpFrequencyLimitToHclTerraform(struct!.ipFrequencyLimit),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsIpFrequencyLimitList",
    },
    origin_request_url_rewrite: {
      value: cdktf.listMapperHcl(cdnDomainConfigsOriginRequestUrlRewriteToHclTerraform, true)(struct!.originRequestUrlRewrite),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainConfigsOriginRequestUrlRewriteList",
    },
    quic: {
      value: cdnDomainConfigsQuicToHclTerraform(struct!.quic),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsQuicList",
    },
    referer: {
      value: cdnDomainConfigsRefererToHclTerraform(struct!.referer),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsRefererList",
    },
    remote_auth: {
      value: cdnDomainConfigsRemoteAuthToHclTerraform(struct!.remoteAuth),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsRemoteAuthList",
    },
    request_limit_rules: {
      value: cdktf.listMapperHcl(cdnDomainConfigsRequestLimitRulesToHclTerraform, true)(struct!.requestLimitRules),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainConfigsRequestLimitRulesList",
    },
    retrieval_request_header: {
      value: cdktf.listMapperHcl(cdnDomainConfigsRetrievalRequestHeaderToHclTerraform, true)(struct!.retrievalRequestHeader),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainConfigsRetrievalRequestHeaderList",
    },
    url_signing: {
      value: cdnDomainConfigsUrlSigningToHclTerraform(struct!.urlSigning),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsUrlSigningList",
    },
    user_agent_filter: {
      value: cdnDomainConfigsUserAgentFilterToHclTerraform(struct!.userAgentFilter),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsUserAgentFilterList",
    },
    video_seek: {
      value: cdnDomainConfigsVideoSeekToHclTerraform(struct!.videoSeek),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsVideoSeekList",
    },
    websocket: {
      value: cdnDomainConfigsWebsocketToHclTerraform(struct!.websocket),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainConfigsWebsocketList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainConfigsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainConfigs | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._ipv6Enable !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipv6Enable = this._ipv6Enable;
    }
    if (this._originFollow302Status !== undefined) {
      hasAnyValues = true;
      internalValueResult.originFollow302Status = this._originFollow302Status;
    }
    if (this._originProtocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.originProtocol = this._originProtocol;
    }
    if (this._originReceiveTimeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.originReceiveTimeout = this._originReceiveTimeout;
    }
    if (this._rangeBasedRetrievalEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.rangeBasedRetrievalEnabled = this._rangeBasedRetrievalEnabled;
    }
    if (this._sliceEtagStatus !== undefined) {
      hasAnyValues = true;
      internalValueResult.sliceEtagStatus = this._sliceEtagStatus;
    }
    if (this._accessAreaFilter?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessAreaFilter = this._accessAreaFilter?.internalValue;
    }
    if (this._cacheUrlParameterFilter?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.cacheUrlParameterFilter = this._cacheUrlParameterFilter?.internalValue;
    }
    if (this._compress?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.compress = this._compress?.internalValue;
    }
    if (this._errorCodeCache?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.errorCodeCache = this._errorCodeCache?.internalValue;
    }
    if (this._errorCodeRedirectRules?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.errorCodeRedirectRules = this._errorCodeRedirectRules?.internalValue;
    }
    if (this._flexibleOrigin?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.flexibleOrigin = this._flexibleOrigin?.internalValue;
    }
    if (this._forceRedirect?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.forceRedirect = this._forceRedirect?.internalValue;
    }
    if (this._hsts?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.hsts = this._hsts?.internalValue;
    }
    if (this._httpResponseHeader?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpResponseHeader = this._httpResponseHeader?.internalValue;
    }
    if (this._httpsSettings?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpsSettings = this._httpsSettings?.internalValue;
    }
    if (this._ipFilter?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipFilter = this._ipFilter?.internalValue;
    }
    if (this._ipFrequencyLimit?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipFrequencyLimit = this._ipFrequencyLimit?.internalValue;
    }
    if (this._originRequestUrlRewrite?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.originRequestUrlRewrite = this._originRequestUrlRewrite?.internalValue;
    }
    if (this._quic?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.quic = this._quic?.internalValue;
    }
    if (this._referer?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.referer = this._referer?.internalValue;
    }
    if (this._remoteAuth?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.remoteAuth = this._remoteAuth?.internalValue;
    }
    if (this._requestLimitRules?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.requestLimitRules = this._requestLimitRules?.internalValue;
    }
    if (this._retrievalRequestHeader?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.retrievalRequestHeader = this._retrievalRequestHeader?.internalValue;
    }
    if (this._urlSigning?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.urlSigning = this._urlSigning?.internalValue;
    }
    if (this._userAgentFilter?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.userAgentFilter = this._userAgentFilter?.internalValue;
    }
    if (this._videoSeek?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.videoSeek = this._videoSeek?.internalValue;
    }
    if (this._websocket?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.websocket = this._websocket?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainConfigs | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._description = undefined;
      this._ipv6Enable = undefined;
      this._originFollow302Status = undefined;
      this._originProtocol = undefined;
      this._originReceiveTimeout = undefined;
      this._rangeBasedRetrievalEnabled = undefined;
      this._sliceEtagStatus = undefined;
      this._accessAreaFilter.internalValue = undefined;
      this._cacheUrlParameterFilter.internalValue = undefined;
      this._compress.internalValue = undefined;
      this._errorCodeCache.internalValue = undefined;
      this._errorCodeRedirectRules.internalValue = undefined;
      this._flexibleOrigin.internalValue = undefined;
      this._forceRedirect.internalValue = undefined;
      this._hsts.internalValue = undefined;
      this._httpResponseHeader.internalValue = undefined;
      this._httpsSettings.internalValue = undefined;
      this._ipFilter.internalValue = undefined;
      this._ipFrequencyLimit.internalValue = undefined;
      this._originRequestUrlRewrite.internalValue = undefined;
      this._quic.internalValue = undefined;
      this._referer.internalValue = undefined;
      this._remoteAuth.internalValue = undefined;
      this._requestLimitRules.internalValue = undefined;
      this._retrievalRequestHeader.internalValue = undefined;
      this._urlSigning.internalValue = undefined;
      this._userAgentFilter.internalValue = undefined;
      this._videoSeek.internalValue = undefined;
      this._websocket.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._description = value.description;
      this._ipv6Enable = value.ipv6Enable;
      this._originFollow302Status = value.originFollow302Status;
      this._originProtocol = value.originProtocol;
      this._originReceiveTimeout = value.originReceiveTimeout;
      this._rangeBasedRetrievalEnabled = value.rangeBasedRetrievalEnabled;
      this._sliceEtagStatus = value.sliceEtagStatus;
      this._accessAreaFilter.internalValue = value.accessAreaFilter;
      this._cacheUrlParameterFilter.internalValue = value.cacheUrlParameterFilter;
      this._compress.internalValue = value.compress;
      this._errorCodeCache.internalValue = value.errorCodeCache;
      this._errorCodeRedirectRules.internalValue = value.errorCodeRedirectRules;
      this._flexibleOrigin.internalValue = value.flexibleOrigin;
      this._forceRedirect.internalValue = value.forceRedirect;
      this._hsts.internalValue = value.hsts;
      this._httpResponseHeader.internalValue = value.httpResponseHeader;
      this._httpsSettings.internalValue = value.httpsSettings;
      this._ipFilter.internalValue = value.ipFilter;
      this._ipFrequencyLimit.internalValue = value.ipFrequencyLimit;
      this._originRequestUrlRewrite.internalValue = value.originRequestUrlRewrite;
      this._quic.internalValue = value.quic;
      this._referer.internalValue = value.referer;
      this._remoteAuth.internalValue = value.remoteAuth;
      this._requestLimitRules.internalValue = value.requestLimitRules;
      this._retrievalRequestHeader.internalValue = value.retrievalRequestHeader;
      this._urlSigning.internalValue = value.urlSigning;
      this._userAgentFilter.internalValue = value.userAgentFilter;
      this._videoSeek.internalValue = value.videoSeek;
      this._websocket.internalValue = value.websocket;
    }
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

  // ipv6_enable - computed: false, optional: true, required: false
  private _ipv6Enable?: boolean | cdktf.IResolvable; 
  public get ipv6Enable() {
    return this.getBooleanAttribute('ipv6_enable');
  }
  public set ipv6Enable(value: boolean | cdktf.IResolvable) {
    this._ipv6Enable = value;
  }
  public resetIpv6Enable() {
    this._ipv6Enable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipv6EnableInput() {
    return this._ipv6Enable;
  }

  // origin_follow302_status - computed: true, optional: true, required: false
  private _originFollow302Status?: string; 
  public get originFollow302Status() {
    return this.getStringAttribute('origin_follow302_status');
  }
  public set originFollow302Status(value: string) {
    this._originFollow302Status = value;
  }
  public resetOriginFollow302Status() {
    this._originFollow302Status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get originFollow302StatusInput() {
    return this._originFollow302Status;
  }

  // origin_protocol - computed: true, optional: true, required: false
  private _originProtocol?: string; 
  public get originProtocol() {
    return this.getStringAttribute('origin_protocol');
  }
  public set originProtocol(value: string) {
    this._originProtocol = value;
  }
  public resetOriginProtocol() {
    this._originProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get originProtocolInput() {
    return this._originProtocol;
  }

  // origin_receive_timeout - computed: true, optional: true, required: false
  private _originReceiveTimeout?: number; 
  public get originReceiveTimeout() {
    return this.getNumberAttribute('origin_receive_timeout');
  }
  public set originReceiveTimeout(value: number) {
    this._originReceiveTimeout = value;
  }
  public resetOriginReceiveTimeout() {
    this._originReceiveTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get originReceiveTimeoutInput() {
    return this._originReceiveTimeout;
  }

  // range_based_retrieval_enabled - computed: false, optional: true, required: false
  private _rangeBasedRetrievalEnabled?: boolean | cdktf.IResolvable; 
  public get rangeBasedRetrievalEnabled() {
    return this.getBooleanAttribute('range_based_retrieval_enabled');
  }
  public set rangeBasedRetrievalEnabled(value: boolean | cdktf.IResolvable) {
    this._rangeBasedRetrievalEnabled = value;
  }
  public resetRangeBasedRetrievalEnabled() {
    this._rangeBasedRetrievalEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rangeBasedRetrievalEnabledInput() {
    return this._rangeBasedRetrievalEnabled;
  }

  // slice_etag_status - computed: true, optional: true, required: false
  private _sliceEtagStatus?: string; 
  public get sliceEtagStatus() {
    return this.getStringAttribute('slice_etag_status');
  }
  public set sliceEtagStatus(value: string) {
    this._sliceEtagStatus = value;
  }
  public resetSliceEtagStatus() {
    this._sliceEtagStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sliceEtagStatusInput() {
    return this._sliceEtagStatus;
  }

  // access_area_filter - computed: false, optional: true, required: false
  private _accessAreaFilter = new CdnDomainConfigsAccessAreaFilterList(this, "access_area_filter", true);
  public get accessAreaFilter() {
    return this._accessAreaFilter;
  }
  public putAccessAreaFilter(value: CdnDomainConfigsAccessAreaFilter[] | cdktf.IResolvable) {
    this._accessAreaFilter.internalValue = value;
  }
  public resetAccessAreaFilter() {
    this._accessAreaFilter.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessAreaFilterInput() {
    return this._accessAreaFilter.internalValue;
  }

  // cache_url_parameter_filter - computed: false, optional: true, required: false
  private _cacheUrlParameterFilter = new CdnDomainConfigsCacheUrlParameterFilterOutputReference(this, "cache_url_parameter_filter");
  public get cacheUrlParameterFilter() {
    return this._cacheUrlParameterFilter;
  }
  public putCacheUrlParameterFilter(value: CdnDomainConfigsCacheUrlParameterFilter) {
    this._cacheUrlParameterFilter.internalValue = value;
  }
  public resetCacheUrlParameterFilter() {
    this._cacheUrlParameterFilter.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cacheUrlParameterFilterInput() {
    return this._cacheUrlParameterFilter.internalValue;
  }

  // compress - computed: false, optional: true, required: false
  private _compress = new CdnDomainConfigsCompressOutputReference(this, "compress");
  public get compress() {
    return this._compress;
  }
  public putCompress(value: CdnDomainConfigsCompress) {
    this._compress.internalValue = value;
  }
  public resetCompress() {
    this._compress.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get compressInput() {
    return this._compress.internalValue;
  }

  // error_code_cache - computed: false, optional: true, required: false
  private _errorCodeCache = new CdnDomainConfigsErrorCodeCacheList(this, "error_code_cache", true);
  public get errorCodeCache() {
    return this._errorCodeCache;
  }
  public putErrorCodeCache(value: CdnDomainConfigsErrorCodeCache[] | cdktf.IResolvable) {
    this._errorCodeCache.internalValue = value;
  }
  public resetErrorCodeCache() {
    this._errorCodeCache.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get errorCodeCacheInput() {
    return this._errorCodeCache.internalValue;
  }

  // error_code_redirect_rules - computed: false, optional: true, required: false
  private _errorCodeRedirectRules = new CdnDomainConfigsErrorCodeRedirectRulesList(this, "error_code_redirect_rules", true);
  public get errorCodeRedirectRules() {
    return this._errorCodeRedirectRules;
  }
  public putErrorCodeRedirectRules(value: CdnDomainConfigsErrorCodeRedirectRules[] | cdktf.IResolvable) {
    this._errorCodeRedirectRules.internalValue = value;
  }
  public resetErrorCodeRedirectRules() {
    this._errorCodeRedirectRules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get errorCodeRedirectRulesInput() {
    return this._errorCodeRedirectRules.internalValue;
  }

  // flexible_origin - computed: false, optional: true, required: false
  private _flexibleOrigin = new CdnDomainConfigsFlexibleOriginList(this, "flexible_origin", true);
  public get flexibleOrigin() {
    return this._flexibleOrigin;
  }
  public putFlexibleOrigin(value: CdnDomainConfigsFlexibleOrigin[] | cdktf.IResolvable) {
    this._flexibleOrigin.internalValue = value;
  }
  public resetFlexibleOrigin() {
    this._flexibleOrigin.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get flexibleOriginInput() {
    return this._flexibleOrigin.internalValue;
  }

  // force_redirect - computed: false, optional: true, required: false
  private _forceRedirect = new CdnDomainConfigsForceRedirectOutputReference(this, "force_redirect");
  public get forceRedirect() {
    return this._forceRedirect;
  }
  public putForceRedirect(value: CdnDomainConfigsForceRedirect) {
    this._forceRedirect.internalValue = value;
  }
  public resetForceRedirect() {
    this._forceRedirect.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forceRedirectInput() {
    return this._forceRedirect.internalValue;
  }

  // hsts - computed: false, optional: true, required: false
  private _hsts = new CdnDomainConfigsHstsOutputReference(this, "hsts");
  public get hsts() {
    return this._hsts;
  }
  public putHsts(value: CdnDomainConfigsHsts) {
    this._hsts.internalValue = value;
  }
  public resetHsts() {
    this._hsts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hstsInput() {
    return this._hsts.internalValue;
  }

  // http_response_header - computed: false, optional: true, required: false
  private _httpResponseHeader = new CdnDomainConfigsHttpResponseHeaderList(this, "http_response_header", true);
  public get httpResponseHeader() {
    return this._httpResponseHeader;
  }
  public putHttpResponseHeader(value: CdnDomainConfigsHttpResponseHeader[] | cdktf.IResolvable) {
    this._httpResponseHeader.internalValue = value;
  }
  public resetHttpResponseHeader() {
    this._httpResponseHeader.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpResponseHeaderInput() {
    return this._httpResponseHeader.internalValue;
  }

  // https_settings - computed: false, optional: true, required: false
  private _httpsSettings = new CdnDomainConfigsHttpsSettingsOutputReference(this, "https_settings");
  public get httpsSettings() {
    return this._httpsSettings;
  }
  public putHttpsSettings(value: CdnDomainConfigsHttpsSettings) {
    this._httpsSettings.internalValue = value;
  }
  public resetHttpsSettings() {
    this._httpsSettings.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpsSettingsInput() {
    return this._httpsSettings.internalValue;
  }

  // ip_filter - computed: false, optional: true, required: false
  private _ipFilter = new CdnDomainConfigsIpFilterOutputReference(this, "ip_filter");
  public get ipFilter() {
    return this._ipFilter;
  }
  public putIpFilter(value: CdnDomainConfigsIpFilter) {
    this._ipFilter.internalValue = value;
  }
  public resetIpFilter() {
    this._ipFilter.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipFilterInput() {
    return this._ipFilter.internalValue;
  }

  // ip_frequency_limit - computed: false, optional: true, required: false
  private _ipFrequencyLimit = new CdnDomainConfigsIpFrequencyLimitOutputReference(this, "ip_frequency_limit");
  public get ipFrequencyLimit() {
    return this._ipFrequencyLimit;
  }
  public putIpFrequencyLimit(value: CdnDomainConfigsIpFrequencyLimit) {
    this._ipFrequencyLimit.internalValue = value;
  }
  public resetIpFrequencyLimit() {
    this._ipFrequencyLimit.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipFrequencyLimitInput() {
    return this._ipFrequencyLimit.internalValue;
  }

  // origin_request_url_rewrite - computed: false, optional: true, required: false
  private _originRequestUrlRewrite = new CdnDomainConfigsOriginRequestUrlRewriteList(this, "origin_request_url_rewrite", true);
  public get originRequestUrlRewrite() {
    return this._originRequestUrlRewrite;
  }
  public putOriginRequestUrlRewrite(value: CdnDomainConfigsOriginRequestUrlRewrite[] | cdktf.IResolvable) {
    this._originRequestUrlRewrite.internalValue = value;
  }
  public resetOriginRequestUrlRewrite() {
    this._originRequestUrlRewrite.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get originRequestUrlRewriteInput() {
    return this._originRequestUrlRewrite.internalValue;
  }

  // quic - computed: false, optional: true, required: false
  private _quic = new CdnDomainConfigsQuicOutputReference(this, "quic");
  public get quic() {
    return this._quic;
  }
  public putQuic(value: CdnDomainConfigsQuic) {
    this._quic.internalValue = value;
  }
  public resetQuic() {
    this._quic.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get quicInput() {
    return this._quic.internalValue;
  }

  // referer - computed: false, optional: true, required: false
  private _referer = new CdnDomainConfigsRefererOutputReference(this, "referer");
  public get referer() {
    return this._referer;
  }
  public putReferer(value: CdnDomainConfigsReferer) {
    this._referer.internalValue = value;
  }
  public resetReferer() {
    this._referer.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get refererInput() {
    return this._referer.internalValue;
  }

  // remote_auth - computed: false, optional: true, required: false
  private _remoteAuth = new CdnDomainConfigsRemoteAuthOutputReference(this, "remote_auth");
  public get remoteAuth() {
    return this._remoteAuth;
  }
  public putRemoteAuth(value: CdnDomainConfigsRemoteAuth) {
    this._remoteAuth.internalValue = value;
  }
  public resetRemoteAuth() {
    this._remoteAuth.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get remoteAuthInput() {
    return this._remoteAuth.internalValue;
  }

  // request_limit_rules - computed: false, optional: true, required: false
  private _requestLimitRules = new CdnDomainConfigsRequestLimitRulesList(this, "request_limit_rules", true);
  public get requestLimitRules() {
    return this._requestLimitRules;
  }
  public putRequestLimitRules(value: CdnDomainConfigsRequestLimitRules[] | cdktf.IResolvable) {
    this._requestLimitRules.internalValue = value;
  }
  public resetRequestLimitRules() {
    this._requestLimitRules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestLimitRulesInput() {
    return this._requestLimitRules.internalValue;
  }

  // retrieval_request_header - computed: false, optional: true, required: false
  private _retrievalRequestHeader = new CdnDomainConfigsRetrievalRequestHeaderList(this, "retrieval_request_header", true);
  public get retrievalRequestHeader() {
    return this._retrievalRequestHeader;
  }
  public putRetrievalRequestHeader(value: CdnDomainConfigsRetrievalRequestHeader[] | cdktf.IResolvable) {
    this._retrievalRequestHeader.internalValue = value;
  }
  public resetRetrievalRequestHeader() {
    this._retrievalRequestHeader.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retrievalRequestHeaderInput() {
    return this._retrievalRequestHeader.internalValue;
  }

  // url_signing - computed: false, optional: true, required: false
  private _urlSigning = new CdnDomainConfigsUrlSigningOutputReference(this, "url_signing");
  public get urlSigning() {
    return this._urlSigning;
  }
  public putUrlSigning(value: CdnDomainConfigsUrlSigning) {
    this._urlSigning.internalValue = value;
  }
  public resetUrlSigning() {
    this._urlSigning.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get urlSigningInput() {
    return this._urlSigning.internalValue;
  }

  // user_agent_filter - computed: false, optional: true, required: false
  private _userAgentFilter = new CdnDomainConfigsUserAgentFilterOutputReference(this, "user_agent_filter");
  public get userAgentFilter() {
    return this._userAgentFilter;
  }
  public putUserAgentFilter(value: CdnDomainConfigsUserAgentFilter) {
    this._userAgentFilter.internalValue = value;
  }
  public resetUserAgentFilter() {
    this._userAgentFilter.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userAgentFilterInput() {
    return this._userAgentFilter.internalValue;
  }

  // video_seek - computed: false, optional: true, required: false
  private _videoSeek = new CdnDomainConfigsVideoSeekOutputReference(this, "video_seek");
  public get videoSeek() {
    return this._videoSeek;
  }
  public putVideoSeek(value: CdnDomainConfigsVideoSeek) {
    this._videoSeek.internalValue = value;
  }
  public resetVideoSeek() {
    this._videoSeek.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get videoSeekInput() {
    return this._videoSeek.internalValue;
  }

  // websocket - computed: false, optional: true, required: false
  private _websocket = new CdnDomainConfigsWebsocketOutputReference(this, "websocket");
  public get websocket() {
    return this._websocket;
  }
  public putWebsocket(value: CdnDomainConfigsWebsocket) {
    this._websocket.internalValue = value;
  }
  public resetWebsocket() {
    this._websocket.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get websocketInput() {
    return this._websocket.internalValue;
  }
}
export interface CdnDomainSources {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#active CdnDomain#active}
  */
  readonly active?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#http_port CdnDomain#http_port}
  */
  readonly httpPort?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#https_port CdnDomain#https_port}
  */
  readonly httpsPort?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#obs_bucket_type CdnDomain#obs_bucket_type}
  */
  readonly obsBucketType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#obs_web_hosting_enabled CdnDomain#obs_web_hosting_enabled}
  */
  readonly obsWebHostingEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#origin CdnDomain#origin}
  */
  readonly origin: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#origin_type CdnDomain#origin_type}
  */
  readonly originType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#retrieval_host CdnDomain#retrieval_host}
  */
  readonly retrievalHost?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#weight CdnDomain#weight}
  */
  readonly weight?: number;
}

export function cdnDomainSourcesToTerraform(struct?: CdnDomainSources | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    active: cdktf.numberToTerraform(struct!.active),
    http_port: cdktf.numberToTerraform(struct!.httpPort),
    https_port: cdktf.numberToTerraform(struct!.httpsPort),
    obs_bucket_type: cdktf.stringToTerraform(struct!.obsBucketType),
    obs_web_hosting_enabled: cdktf.booleanToTerraform(struct!.obsWebHostingEnabled),
    origin: cdktf.stringToTerraform(struct!.origin),
    origin_type: cdktf.stringToTerraform(struct!.originType),
    retrieval_host: cdktf.stringToTerraform(struct!.retrievalHost),
    weight: cdktf.numberToTerraform(struct!.weight),
  }
}


export function cdnDomainSourcesToHclTerraform(struct?: CdnDomainSources | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    active: {
      value: cdktf.numberToHclTerraform(struct!.active),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    http_port: {
      value: cdktf.numberToHclTerraform(struct!.httpPort),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    https_port: {
      value: cdktf.numberToHclTerraform(struct!.httpsPort),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    obs_bucket_type: {
      value: cdktf.stringToHclTerraform(struct!.obsBucketType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    obs_web_hosting_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.obsWebHostingEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    origin: {
      value: cdktf.stringToHclTerraform(struct!.origin),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    origin_type: {
      value: cdktf.stringToHclTerraform(struct!.originType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    retrieval_host: {
      value: cdktf.stringToHclTerraform(struct!.retrievalHost),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    weight: {
      value: cdktf.numberToHclTerraform(struct!.weight),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainSourcesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainSources | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._active !== undefined) {
      hasAnyValues = true;
      internalValueResult.active = this._active;
    }
    if (this._httpPort !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpPort = this._httpPort;
    }
    if (this._httpsPort !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpsPort = this._httpsPort;
    }
    if (this._obsBucketType !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsBucketType = this._obsBucketType;
    }
    if (this._obsWebHostingEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsWebHostingEnabled = this._obsWebHostingEnabled;
    }
    if (this._origin !== undefined) {
      hasAnyValues = true;
      internalValueResult.origin = this._origin;
    }
    if (this._originType !== undefined) {
      hasAnyValues = true;
      internalValueResult.originType = this._originType;
    }
    if (this._retrievalHost !== undefined) {
      hasAnyValues = true;
      internalValueResult.retrievalHost = this._retrievalHost;
    }
    if (this._weight !== undefined) {
      hasAnyValues = true;
      internalValueResult.weight = this._weight;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainSources | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._active = undefined;
      this._httpPort = undefined;
      this._httpsPort = undefined;
      this._obsBucketType = undefined;
      this._obsWebHostingEnabled = undefined;
      this._origin = undefined;
      this._originType = undefined;
      this._retrievalHost = undefined;
      this._weight = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._active = value.active;
      this._httpPort = value.httpPort;
      this._httpsPort = value.httpsPort;
      this._obsBucketType = value.obsBucketType;
      this._obsWebHostingEnabled = value.obsWebHostingEnabled;
      this._origin = value.origin;
      this._originType = value.originType;
      this._retrievalHost = value.retrievalHost;
      this._weight = value.weight;
    }
  }

  // active - computed: false, optional: true, required: false
  private _active?: number; 
  public get active() {
    return this.getNumberAttribute('active');
  }
  public set active(value: number) {
    this._active = value;
  }
  public resetActive() {
    this._active = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get activeInput() {
    return this._active;
  }

  // http_port - computed: true, optional: true, required: false
  private _httpPort?: number; 
  public get httpPort() {
    return this.getNumberAttribute('http_port');
  }
  public set httpPort(value: number) {
    this._httpPort = value;
  }
  public resetHttpPort() {
    this._httpPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpPortInput() {
    return this._httpPort;
  }

  // https_port - computed: true, optional: true, required: false
  private _httpsPort?: number; 
  public get httpsPort() {
    return this.getNumberAttribute('https_port');
  }
  public set httpsPort(value: number) {
    this._httpsPort = value;
  }
  public resetHttpsPort() {
    this._httpsPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpsPortInput() {
    return this._httpsPort;
  }

  // obs_bucket_type - computed: true, optional: true, required: false
  private _obsBucketType?: string; 
  public get obsBucketType() {
    return this.getStringAttribute('obs_bucket_type');
  }
  public set obsBucketType(value: string) {
    this._obsBucketType = value;
  }
  public resetObsBucketType() {
    this._obsBucketType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsBucketTypeInput() {
    return this._obsBucketType;
  }

  // obs_web_hosting_enabled - computed: true, optional: true, required: false
  private _obsWebHostingEnabled?: boolean | cdktf.IResolvable; 
  public get obsWebHostingEnabled() {
    return this.getBooleanAttribute('obs_web_hosting_enabled');
  }
  public set obsWebHostingEnabled(value: boolean | cdktf.IResolvable) {
    this._obsWebHostingEnabled = value;
  }
  public resetObsWebHostingEnabled() {
    this._obsWebHostingEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsWebHostingEnabledInput() {
    return this._obsWebHostingEnabled;
  }

  // origin - computed: false, optional: false, required: true
  private _origin?: string; 
  public get origin() {
    return this.getStringAttribute('origin');
  }
  public set origin(value: string) {
    this._origin = value;
  }
  // Temporarily expose input value. Use with caution.
  public get originInput() {
    return this._origin;
  }

  // origin_type - computed: false, optional: false, required: true
  private _originType?: string; 
  public get originType() {
    return this.getStringAttribute('origin_type');
  }
  public set originType(value: string) {
    this._originType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get originTypeInput() {
    return this._originType;
  }

  // retrieval_host - computed: true, optional: true, required: false
  private _retrievalHost?: string; 
  public get retrievalHost() {
    return this.getStringAttribute('retrieval_host');
  }
  public set retrievalHost(value: string) {
    this._retrievalHost = value;
  }
  public resetRetrievalHost() {
    this._retrievalHost = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retrievalHostInput() {
    return this._retrievalHost;
  }

  // weight - computed: true, optional: true, required: false
  private _weight?: number; 
  public get weight() {
    return this.getNumberAttribute('weight');
  }
  public set weight(value: number) {
    this._weight = value;
  }
  public resetWeight() {
    this._weight = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get weightInput() {
    return this._weight;
  }
}

export class CdnDomainSourcesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainSources[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainSourcesOutputReference {
    return new CdnDomainSourcesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#create CdnDomain#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#delete CdnDomain#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#update CdnDomain#update}
  */
  readonly update?: string;
}

export function cdnDomainTimeoutsToTerraform(struct?: CdnDomainTimeouts | cdktf.IResolvable): any {
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


export function cdnDomainTimeoutsToHclTerraform(struct?: CdnDomainTimeouts | cdktf.IResolvable): any {
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

export class CdnDomainTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CdnDomainTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain huaweicloud_cdn_domain}
*/
export class CdnDomain extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cdn_domain";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CdnDomain resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CdnDomain to import
  * @param importFromId The id of the existing CdnDomain that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CdnDomain to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cdn_domain", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain huaweicloud_cdn_domain} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CdnDomainConfig
  */
  public constructor(scope: Construct, id: string, config: CdnDomainConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cdn_domain',
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
    this._enableForceNew = config.enableForceNew;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._name = config.name;
    this._serviceArea = config.serviceArea;
    this._tags = config.tags;
    this._type = config.type;
    this._cacheSettings.internalValue = config.cacheSettings;
    this._configs.internalValue = config.configs;
    this._sources.internalValue = config.sources;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cname - computed: true, optional: false, required: false
  public get cname() {
    return this.getStringAttribute('cname');
  }

  // domain_name - computed: true, optional: false, required: false
  public get domainName() {
    return this.getStringAttribute('domain_name');
  }

  // domain_status - computed: true, optional: false, required: false
  public get domainStatus() {
    return this.getStringAttribute('domain_status');
  }

  // enable_force_new - computed: false, optional: true, required: false
  private _enableForceNew?: string; 
  public get enableForceNew() {
    return this.getStringAttribute('enable_force_new');
  }
  public set enableForceNew(value: string) {
    this._enableForceNew = value;
  }
  public resetEnableForceNew() {
    this._enableForceNew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableForceNewInput() {
    return this._enableForceNew;
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

  // service_area - computed: true, optional: true, required: false
  private _serviceArea?: string; 
  public get serviceArea() {
    return this.getStringAttribute('service_area');
  }
  public set serviceArea(value: string) {
    this._serviceArea = value;
  }
  public resetServiceArea() {
    this._serviceArea = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceAreaInput() {
    return this._serviceArea;
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string }; 
  public get tags() {
    return this.getStringMapAttribute('tags');
  }
  public set tags(value: { [key: string]: string }) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
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

  // cache_settings - computed: false, optional: true, required: false
  private _cacheSettings = new CdnDomainCacheSettingsOutputReference(this, "cache_settings");
  public get cacheSettings() {
    return this._cacheSettings;
  }
  public putCacheSettings(value: CdnDomainCacheSettings) {
    this._cacheSettings.internalValue = value;
  }
  public resetCacheSettings() {
    this._cacheSettings.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cacheSettingsInput() {
    return this._cacheSettings.internalValue;
  }

  // configs - computed: false, optional: true, required: false
  private _configs = new CdnDomainConfigsOutputReference(this, "configs");
  public get configs() {
    return this._configs;
  }
  public putConfigs(value: CdnDomainConfigs) {
    this._configs.internalValue = value;
  }
  public resetConfigs() {
    this._configs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configsInput() {
    return this._configs.internalValue;
  }

  // sources - computed: false, optional: false, required: true
  private _sources = new CdnDomainSourcesList(this, "sources", true);
  public get sources() {
    return this._sources;
  }
  public putSources(value: CdnDomainSources[] | cdktf.IResolvable) {
    this._sources.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourcesInput() {
    return this._sources.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CdnDomainTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CdnDomainTimeouts) {
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
      enable_force_new: cdktf.stringToTerraform(this._enableForceNew),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      service_area: cdktf.stringToTerraform(this._serviceArea),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      type: cdktf.stringToTerraform(this._type),
      cache_settings: cdnDomainCacheSettingsToTerraform(this._cacheSettings.internalValue),
      configs: cdnDomainConfigsToTerraform(this._configs.internalValue),
      sources: cdktf.listMapper(cdnDomainSourcesToTerraform, true)(this._sources.internalValue),
      timeouts: cdnDomainTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      enable_force_new: {
        value: cdktf.stringToHclTerraform(this._enableForceNew),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      service_area: {
        value: cdktf.stringToHclTerraform(this._serviceArea),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cache_settings: {
        value: cdnDomainCacheSettingsToHclTerraform(this._cacheSettings.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CdnDomainCacheSettingsList",
      },
      configs: {
        value: cdnDomainConfigsToHclTerraform(this._configs.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CdnDomainConfigsList",
      },
      sources: {
        value: cdktf.listMapperHcl(cdnDomainSourcesToHclTerraform, true)(this._sources.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "CdnDomainSourcesList",
      },
      timeouts: {
        value: cdnDomainTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CdnDomainTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

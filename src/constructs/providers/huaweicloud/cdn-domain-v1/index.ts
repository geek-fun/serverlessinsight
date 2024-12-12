// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CdnDomainV1Config extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enable_force_new CdnDomainV1#enable_force_new}
  */
  readonly enableForceNew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enterprise_project_id CdnDomainV1#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#id CdnDomainV1#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#name CdnDomainV1#name}
  */
  readonly name: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#service_area CdnDomainV1#service_area}
  */
  readonly serviceArea?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#tags CdnDomainV1#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type: string;
  /**
  * cache_settings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#cache_settings CdnDomainV1#cache_settings}
  */
  readonly cacheSettings?: CdnDomainV1CacheSettings;
  /**
  * configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#configs CdnDomainV1#configs}
  */
  readonly configs?: CdnDomainV1Configs;
  /**
  * sources block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#sources CdnDomainV1#sources}
  */
  readonly sources: CdnDomainV1Sources[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#timeouts CdnDomainV1#timeouts}
  */
  readonly timeouts?: CdnDomainV1Timeouts;
}
export interface CdnDomainV1CacheSettingsRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#content CdnDomainV1#content}
  */
  readonly content?: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#priority CdnDomainV1#priority}
  */
  readonly priority?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#rule_type CdnDomainV1#rule_type}
  */
  readonly ruleType: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#ttl CdnDomainV1#ttl}
  */
  readonly ttl?: number;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#ttl_type CdnDomainV1#ttl_type}
  */
  readonly ttlType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#url_parameter_type CdnDomainV1#url_parameter_type}
  */
  readonly urlParameterType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#url_parameter_value CdnDomainV1#url_parameter_value}
  */
  readonly urlParameterValue?: string;
}

export function cdnDomainV1CacheSettingsRulesToTerraform(struct?: CdnDomainV1CacheSettingsRules | cdktf.IResolvable): any {
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


export function cdnDomainV1CacheSettingsRulesToHclTerraform(struct?: CdnDomainV1CacheSettingsRules | cdktf.IResolvable): any {
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

export class CdnDomainV1CacheSettingsRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1CacheSettingsRules | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1CacheSettingsRules | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1CacheSettingsRulesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1CacheSettingsRules[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1CacheSettingsRulesOutputReference {
    return new CdnDomainV1CacheSettingsRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1CacheSettings {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#follow_origin CdnDomainV1#follow_origin}
  */
  readonly followOrigin?: boolean | cdktf.IResolvable;
  /**
  * rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#rules CdnDomainV1#rules}
  */
  readonly rules?: CdnDomainV1CacheSettingsRules[] | cdktf.IResolvable;
}

export function cdnDomainV1CacheSettingsToTerraform(struct?: CdnDomainV1CacheSettingsOutputReference | CdnDomainV1CacheSettings): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    follow_origin: cdktf.booleanToTerraform(struct!.followOrigin),
    rules: cdktf.listMapper(cdnDomainV1CacheSettingsRulesToTerraform, true)(struct!.rules),
  }
}


export function cdnDomainV1CacheSettingsToHclTerraform(struct?: CdnDomainV1CacheSettingsOutputReference | CdnDomainV1CacheSettings): any {
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
      value: cdktf.listMapperHcl(cdnDomainV1CacheSettingsRulesToHclTerraform, true)(struct!.rules),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1CacheSettingsRulesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainV1CacheSettingsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1CacheSettings | undefined {
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

  public set internalValue(value: CdnDomainV1CacheSettings | undefined) {
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
  private _rules = new CdnDomainV1CacheSettingsRulesList(this, "rules", true);
  public get rules() {
    return this._rules;
  }
  public putRules(value: CdnDomainV1CacheSettingsRules[] | cdktf.IResolvable) {
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
export interface CdnDomainV1ConfigsAccessAreaFilter {
  /**
  * Specifies the areas, separated by commas.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#area CdnDomainV1#area}
  */
  readonly area: string;
  /**
  * Specifies the content type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#content_type CdnDomainV1#content_type}
  */
  readonly contentType: string;
  /**
  * Specifies the content value.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#content_value CdnDomainV1#content_value}
  */
  readonly contentValue?: string;
  /**
  * Specifies the IP addresses exception in access control, separated by commas.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#exception_ip CdnDomainV1#exception_ip}
  */
  readonly exceptionIp?: string;
  /**
  * Specifies the blacklist and whitelist rule type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type: string;
}

export function cdnDomainV1ConfigsAccessAreaFilterToTerraform(struct?: CdnDomainV1ConfigsAccessAreaFilter | cdktf.IResolvable): any {
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


export function cdnDomainV1ConfigsAccessAreaFilterToHclTerraform(struct?: CdnDomainV1ConfigsAccessAreaFilter | cdktf.IResolvable): any {
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

export class CdnDomainV1ConfigsAccessAreaFilterOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1ConfigsAccessAreaFilter | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsAccessAreaFilter | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1ConfigsAccessAreaFilterList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1ConfigsAccessAreaFilter[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1ConfigsAccessAreaFilterOutputReference {
    return new CdnDomainV1ConfigsAccessAreaFilterOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1ConfigsCacheUrlParameterFilter {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#value CdnDomainV1#value}
  */
  readonly value?: string;
}

export function cdnDomainV1ConfigsCacheUrlParameterFilterToTerraform(struct?: CdnDomainV1ConfigsCacheUrlParameterFilterOutputReference | CdnDomainV1ConfigsCacheUrlParameterFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cdnDomainV1ConfigsCacheUrlParameterFilterToHclTerraform(struct?: CdnDomainV1ConfigsCacheUrlParameterFilterOutputReference | CdnDomainV1ConfigsCacheUrlParameterFilter): any {
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

export class CdnDomainV1ConfigsCacheUrlParameterFilterOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsCacheUrlParameterFilter | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsCacheUrlParameterFilter | undefined) {
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
export interface CdnDomainV1ConfigsCompress {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enabled CdnDomainV1#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#file_type CdnDomainV1#file_type}
  */
  readonly fileType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type?: string;
}

export function cdnDomainV1ConfigsCompressToTerraform(struct?: CdnDomainV1ConfigsCompressOutputReference | CdnDomainV1ConfigsCompress): any {
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


export function cdnDomainV1ConfigsCompressToHclTerraform(struct?: CdnDomainV1ConfigsCompressOutputReference | CdnDomainV1ConfigsCompress): any {
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

export class CdnDomainV1ConfigsCompressOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsCompress | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsCompress | undefined) {
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
export interface CdnDomainV1ConfigsErrorCodeCache {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#code CdnDomainV1#code}
  */
  readonly code: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#ttl CdnDomainV1#ttl}
  */
  readonly ttl: number;
}

export function cdnDomainV1ConfigsErrorCodeCacheToTerraform(struct?: CdnDomainV1ConfigsErrorCodeCache | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    code: cdktf.numberToTerraform(struct!.code),
    ttl: cdktf.numberToTerraform(struct!.ttl),
  }
}


export function cdnDomainV1ConfigsErrorCodeCacheToHclTerraform(struct?: CdnDomainV1ConfigsErrorCodeCache | cdktf.IResolvable): any {
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

export class CdnDomainV1ConfigsErrorCodeCacheOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1ConfigsErrorCodeCache | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsErrorCodeCache | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1ConfigsErrorCodeCacheList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1ConfigsErrorCodeCache[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1ConfigsErrorCodeCacheOutputReference {
    return new CdnDomainV1ConfigsErrorCodeCacheOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1ConfigsErrorCodeRedirectRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#error_code CdnDomainV1#error_code}
  */
  readonly errorCode: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#target_code CdnDomainV1#target_code}
  */
  readonly targetCode: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#target_link CdnDomainV1#target_link}
  */
  readonly targetLink: string;
}

export function cdnDomainV1ConfigsErrorCodeRedirectRulesToTerraform(struct?: CdnDomainV1ConfigsErrorCodeRedirectRules | cdktf.IResolvable): any {
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


export function cdnDomainV1ConfigsErrorCodeRedirectRulesToHclTerraform(struct?: CdnDomainV1ConfigsErrorCodeRedirectRules | cdktf.IResolvable): any {
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

export class CdnDomainV1ConfigsErrorCodeRedirectRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1ConfigsErrorCodeRedirectRules | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsErrorCodeRedirectRules | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1ConfigsErrorCodeRedirectRulesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1ConfigsErrorCodeRedirectRules[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1ConfigsErrorCodeRedirectRulesOutputReference {
    return new CdnDomainV1ConfigsErrorCodeRedirectRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1ConfigsFlexibleOriginBackSources {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#http_port CdnDomainV1#http_port}
  */
  readonly httpPort?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#https_port CdnDomainV1#https_port}
  */
  readonly httpsPort?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#ip_or_domain CdnDomainV1#ip_or_domain}
  */
  readonly ipOrDomain: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#obs_bucket_type CdnDomainV1#obs_bucket_type}
  */
  readonly obsBucketType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#sources_type CdnDomainV1#sources_type}
  */
  readonly sourcesType: string;
}

export function cdnDomainV1ConfigsFlexibleOriginBackSourcesToTerraform(struct?: CdnDomainV1ConfigsFlexibleOriginBackSourcesOutputReference | CdnDomainV1ConfigsFlexibleOriginBackSources): any {
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


export function cdnDomainV1ConfigsFlexibleOriginBackSourcesToHclTerraform(struct?: CdnDomainV1ConfigsFlexibleOriginBackSourcesOutputReference | CdnDomainV1ConfigsFlexibleOriginBackSources): any {
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

export class CdnDomainV1ConfigsFlexibleOriginBackSourcesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsFlexibleOriginBackSources | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsFlexibleOriginBackSources | undefined) {
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
export interface CdnDomainV1ConfigsFlexibleOrigin {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#match_pattern CdnDomainV1#match_pattern}
  */
  readonly matchPattern?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#match_type CdnDomainV1#match_type}
  */
  readonly matchType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#priority CdnDomainV1#priority}
  */
  readonly priority: number;
  /**
  * back_sources block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#back_sources CdnDomainV1#back_sources}
  */
  readonly backSources: CdnDomainV1ConfigsFlexibleOriginBackSources;
}

export function cdnDomainV1ConfigsFlexibleOriginToTerraform(struct?: CdnDomainV1ConfigsFlexibleOrigin | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    match_pattern: cdktf.stringToTerraform(struct!.matchPattern),
    match_type: cdktf.stringToTerraform(struct!.matchType),
    priority: cdktf.numberToTerraform(struct!.priority),
    back_sources: cdnDomainV1ConfigsFlexibleOriginBackSourcesToTerraform(struct!.backSources),
  }
}


export function cdnDomainV1ConfigsFlexibleOriginToHclTerraform(struct?: CdnDomainV1ConfigsFlexibleOrigin | cdktf.IResolvable): any {
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
      value: cdnDomainV1ConfigsFlexibleOriginBackSourcesToHclTerraform(struct!.backSources),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsFlexibleOriginBackSourcesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainV1ConfigsFlexibleOriginOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1ConfigsFlexibleOrigin | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsFlexibleOrigin | cdktf.IResolvable | undefined) {
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
  private _backSources = new CdnDomainV1ConfigsFlexibleOriginBackSourcesOutputReference(this, "back_sources");
  public get backSources() {
    return this._backSources;
  }
  public putBackSources(value: CdnDomainV1ConfigsFlexibleOriginBackSources) {
    this._backSources.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get backSourcesInput() {
    return this._backSources.internalValue;
  }
}

export class CdnDomainV1ConfigsFlexibleOriginList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1ConfigsFlexibleOrigin[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1ConfigsFlexibleOriginOutputReference {
    return new CdnDomainV1ConfigsFlexibleOriginOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1ConfigsForceRedirect {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enabled CdnDomainV1#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#redirect_code CdnDomainV1#redirect_code}
  */
  readonly redirectCode?: number;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type?: string;
}

export function cdnDomainV1ConfigsForceRedirectToTerraform(struct?: CdnDomainV1ConfigsForceRedirectOutputReference | CdnDomainV1ConfigsForceRedirect): any {
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


export function cdnDomainV1ConfigsForceRedirectToHclTerraform(struct?: CdnDomainV1ConfigsForceRedirectOutputReference | CdnDomainV1ConfigsForceRedirect): any {
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

export class CdnDomainV1ConfigsForceRedirectOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsForceRedirect | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsForceRedirect | undefined) {
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
export interface CdnDomainV1ConfigsHsts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enabled CdnDomainV1#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#include_subdomains CdnDomainV1#include_subdomains}
  */
  readonly includeSubdomains?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#max_age CdnDomainV1#max_age}
  */
  readonly maxAge?: number;
}

export function cdnDomainV1ConfigsHstsToTerraform(struct?: CdnDomainV1ConfigsHstsOutputReference | CdnDomainV1ConfigsHsts): any {
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


export function cdnDomainV1ConfigsHstsToHclTerraform(struct?: CdnDomainV1ConfigsHstsOutputReference | CdnDomainV1ConfigsHsts): any {
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

export class CdnDomainV1ConfigsHstsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsHsts | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsHsts | undefined) {
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
export interface CdnDomainV1ConfigsHttpResponseHeader {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#action CdnDomainV1#action}
  */
  readonly action: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#name CdnDomainV1#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#value CdnDomainV1#value}
  */
  readonly value?: string;
}

export function cdnDomainV1ConfigsHttpResponseHeaderToTerraform(struct?: CdnDomainV1ConfigsHttpResponseHeader | cdktf.IResolvable): any {
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


export function cdnDomainV1ConfigsHttpResponseHeaderToHclTerraform(struct?: CdnDomainV1ConfigsHttpResponseHeader | cdktf.IResolvable): any {
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

export class CdnDomainV1ConfigsHttpResponseHeaderOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1ConfigsHttpResponseHeader | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsHttpResponseHeader | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1ConfigsHttpResponseHeaderList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1ConfigsHttpResponseHeader[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1ConfigsHttpResponseHeaderOutputReference {
    return new CdnDomainV1ConfigsHttpResponseHeaderOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1ConfigsHttpsSettings {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#certificate_body CdnDomainV1#certificate_body}
  */
  readonly certificateBody?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#certificate_name CdnDomainV1#certificate_name}
  */
  readonly certificateName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#certificate_source CdnDomainV1#certificate_source}
  */
  readonly certificateSource?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#certificate_type CdnDomainV1#certificate_type}
  */
  readonly certificateType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#http2_enabled CdnDomainV1#http2_enabled}
  */
  readonly http2Enabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#https_enabled CdnDomainV1#https_enabled}
  */
  readonly httpsEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#ocsp_stapling_status CdnDomainV1#ocsp_stapling_status}
  */
  readonly ocspStaplingStatus?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#private_key CdnDomainV1#private_key}
  */
  readonly privateKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#scm_certificate_id CdnDomainV1#scm_certificate_id}
  */
  readonly scmCertificateId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#tls_version CdnDomainV1#tls_version}
  */
  readonly tlsVersion?: string;
}

export function cdnDomainV1ConfigsHttpsSettingsToTerraform(struct?: CdnDomainV1ConfigsHttpsSettingsOutputReference | CdnDomainV1ConfigsHttpsSettings): any {
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


export function cdnDomainV1ConfigsHttpsSettingsToHclTerraform(struct?: CdnDomainV1ConfigsHttpsSettingsOutputReference | CdnDomainV1ConfigsHttpsSettings): any {
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

export class CdnDomainV1ConfigsHttpsSettingsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsHttpsSettings | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsHttpsSettings | undefined) {
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
export interface CdnDomainV1ConfigsIpFilter {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#value CdnDomainV1#value}
  */
  readonly value?: string;
}

export function cdnDomainV1ConfigsIpFilterToTerraform(struct?: CdnDomainV1ConfigsIpFilterOutputReference | CdnDomainV1ConfigsIpFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cdnDomainV1ConfigsIpFilterToHclTerraform(struct?: CdnDomainV1ConfigsIpFilterOutputReference | CdnDomainV1ConfigsIpFilter): any {
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

export class CdnDomainV1ConfigsIpFilterOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsIpFilter | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsIpFilter | undefined) {
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
export interface CdnDomainV1ConfigsIpFrequencyLimit {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enabled CdnDomainV1#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#qps CdnDomainV1#qps}
  */
  readonly qps?: number;
}

export function cdnDomainV1ConfigsIpFrequencyLimitToTerraform(struct?: CdnDomainV1ConfigsIpFrequencyLimitOutputReference | CdnDomainV1ConfigsIpFrequencyLimit): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    qps: cdktf.numberToTerraform(struct!.qps),
  }
}


export function cdnDomainV1ConfigsIpFrequencyLimitToHclTerraform(struct?: CdnDomainV1ConfigsIpFrequencyLimitOutputReference | CdnDomainV1ConfigsIpFrequencyLimit): any {
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

export class CdnDomainV1ConfigsIpFrequencyLimitOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsIpFrequencyLimit | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsIpFrequencyLimit | undefined) {
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
export interface CdnDomainV1ConfigsOriginRequestUrlRewrite {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#match_type CdnDomainV1#match_type}
  */
  readonly matchType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#priority CdnDomainV1#priority}
  */
  readonly priority: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#source_url CdnDomainV1#source_url}
  */
  readonly sourceUrl?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#target_url CdnDomainV1#target_url}
  */
  readonly targetUrl: string;
}

export function cdnDomainV1ConfigsOriginRequestUrlRewriteToTerraform(struct?: CdnDomainV1ConfigsOriginRequestUrlRewrite | cdktf.IResolvable): any {
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


export function cdnDomainV1ConfigsOriginRequestUrlRewriteToHclTerraform(struct?: CdnDomainV1ConfigsOriginRequestUrlRewrite | cdktf.IResolvable): any {
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

export class CdnDomainV1ConfigsOriginRequestUrlRewriteOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1ConfigsOriginRequestUrlRewrite | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsOriginRequestUrlRewrite | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1ConfigsOriginRequestUrlRewriteList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1ConfigsOriginRequestUrlRewrite[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1ConfigsOriginRequestUrlRewriteOutputReference {
    return new CdnDomainV1ConfigsOriginRequestUrlRewriteOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1ConfigsQuic {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enabled CdnDomainV1#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
}

export function cdnDomainV1ConfigsQuicToTerraform(struct?: CdnDomainV1ConfigsQuicOutputReference | CdnDomainV1ConfigsQuic): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
  }
}


export function cdnDomainV1ConfigsQuicToHclTerraform(struct?: CdnDomainV1ConfigsQuicOutputReference | CdnDomainV1ConfigsQuic): any {
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

export class CdnDomainV1ConfigsQuicOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsQuic | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CdnDomainV1ConfigsQuic | undefined) {
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
export interface CdnDomainV1ConfigsReferer {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#include_empty CdnDomainV1#include_empty}
  */
  readonly includeEmpty?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#value CdnDomainV1#value}
  */
  readonly value?: string;
}

export function cdnDomainV1ConfigsRefererToTerraform(struct?: CdnDomainV1ConfigsRefererOutputReference | CdnDomainV1ConfigsReferer): any {
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


export function cdnDomainV1ConfigsRefererToHclTerraform(struct?: CdnDomainV1ConfigsRefererOutputReference | CdnDomainV1ConfigsReferer): any {
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

export class CdnDomainV1ConfigsRefererOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsReferer | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsReferer | undefined) {
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
export interface CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#key CdnDomainV1#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#value CdnDomainV1#value}
  */
  readonly value: string;
}

export function cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesToTerraform(struct?: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules | cdktf.IResolvable): any {
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


export function cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesToHclTerraform(struct?: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules | cdktf.IResolvable): any {
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

export class CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesOutputReference {
    return new CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#key CdnDomainV1#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#value CdnDomainV1#value}
  */
  readonly value: string;
}

export function cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesToTerraform(struct?: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules | cdktf.IResolvable): any {
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


export function cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesToHclTerraform(struct?: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules | cdktf.IResolvable): any {
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

export class CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesOutputReference {
    return new CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1ConfigsRemoteAuthRemoteAuthRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#auth_failed_status CdnDomainV1#auth_failed_status}
  */
  readonly authFailedStatus: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#auth_server CdnDomainV1#auth_server}
  */
  readonly authServer: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#auth_success_status CdnDomainV1#auth_success_status}
  */
  readonly authSuccessStatus: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#file_type_setting CdnDomainV1#file_type_setting}
  */
  readonly fileTypeSetting: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#request_method CdnDomainV1#request_method}
  */
  readonly requestMethod: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#reserve_args CdnDomainV1#reserve_args}
  */
  readonly reserveArgs?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#reserve_args_setting CdnDomainV1#reserve_args_setting}
  */
  readonly reserveArgsSetting: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#reserve_headers CdnDomainV1#reserve_headers}
  */
  readonly reserveHeaders?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#reserve_headers_setting CdnDomainV1#reserve_headers_setting}
  */
  readonly reserveHeadersSetting: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#response_status CdnDomainV1#response_status}
  */
  readonly responseStatus: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#specified_file_type CdnDomainV1#specified_file_type}
  */
  readonly specifiedFileType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#timeout CdnDomainV1#timeout}
  */
  readonly timeout: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#timeout_action CdnDomainV1#timeout_action}
  */
  readonly timeoutAction: string;
  /**
  * add_custom_args_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#add_custom_args_rules CdnDomainV1#add_custom_args_rules}
  */
  readonly addCustomArgsRules?: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules[] | cdktf.IResolvable;
  /**
  * add_custom_headers_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#add_custom_headers_rules CdnDomainV1#add_custom_headers_rules}
  */
  readonly addCustomHeadersRules?: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules[] | cdktf.IResolvable;
}

export function cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesToTerraform(struct?: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesOutputReference | CdnDomainV1ConfigsRemoteAuthRemoteAuthRules): any {
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
    add_custom_args_rules: cdktf.listMapper(cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesToTerraform, true)(struct!.addCustomArgsRules),
    add_custom_headers_rules: cdktf.listMapper(cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesToTerraform, true)(struct!.addCustomHeadersRules),
  }
}


export function cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesToHclTerraform(struct?: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesOutputReference | CdnDomainV1ConfigsRemoteAuthRemoteAuthRules): any {
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
      value: cdktf.listMapperHcl(cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesToHclTerraform, true)(struct!.addCustomArgsRules),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesList",
    },
    add_custom_headers_rules: {
      value: cdktf.listMapperHcl(cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesToHclTerraform, true)(struct!.addCustomHeadersRules),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsRemoteAuthRemoteAuthRules | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsRemoteAuthRemoteAuthRules | undefined) {
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
  private _addCustomArgsRules = new CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRulesList(this, "add_custom_args_rules", true);
  public get addCustomArgsRules() {
    return this._addCustomArgsRules;
  }
  public putAddCustomArgsRules(value: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomArgsRules[] | cdktf.IResolvable) {
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
  private _addCustomHeadersRules = new CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRulesList(this, "add_custom_headers_rules", true);
  public get addCustomHeadersRules() {
    return this._addCustomHeadersRules;
  }
  public putAddCustomHeadersRules(value: CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesAddCustomHeadersRules[] | cdktf.IResolvable) {
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
export interface CdnDomainV1ConfigsRemoteAuth {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enabled CdnDomainV1#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * remote_auth_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#remote_auth_rules CdnDomainV1#remote_auth_rules}
  */
  readonly remoteAuthRules?: CdnDomainV1ConfigsRemoteAuthRemoteAuthRules;
}

export function cdnDomainV1ConfigsRemoteAuthToTerraform(struct?: CdnDomainV1ConfigsRemoteAuthOutputReference | CdnDomainV1ConfigsRemoteAuth): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    remote_auth_rules: cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesToTerraform(struct!.remoteAuthRules),
  }
}


export function cdnDomainV1ConfigsRemoteAuthToHclTerraform(struct?: CdnDomainV1ConfigsRemoteAuthOutputReference | CdnDomainV1ConfigsRemoteAuth): any {
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
      value: cdnDomainV1ConfigsRemoteAuthRemoteAuthRulesToHclTerraform(struct!.remoteAuthRules),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainV1ConfigsRemoteAuthOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsRemoteAuth | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsRemoteAuth | undefined) {
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
  private _remoteAuthRules = new CdnDomainV1ConfigsRemoteAuthRemoteAuthRulesOutputReference(this, "remote_auth_rules");
  public get remoteAuthRules() {
    return this._remoteAuthRules;
  }
  public putRemoteAuthRules(value: CdnDomainV1ConfigsRemoteAuthRemoteAuthRules) {
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
export interface CdnDomainV1ConfigsRequestLimitRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#limit_rate_after CdnDomainV1#limit_rate_after}
  */
  readonly limitRateAfter: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#limit_rate_value CdnDomainV1#limit_rate_value}
  */
  readonly limitRateValue: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#match_type CdnDomainV1#match_type}
  */
  readonly matchType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#match_value CdnDomainV1#match_value}
  */
  readonly matchValue?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#priority CdnDomainV1#priority}
  */
  readonly priority: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type: string;
}

export function cdnDomainV1ConfigsRequestLimitRulesToTerraform(struct?: CdnDomainV1ConfigsRequestLimitRules | cdktf.IResolvable): any {
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


export function cdnDomainV1ConfigsRequestLimitRulesToHclTerraform(struct?: CdnDomainV1ConfigsRequestLimitRules | cdktf.IResolvable): any {
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

export class CdnDomainV1ConfigsRequestLimitRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1ConfigsRequestLimitRules | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsRequestLimitRules | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1ConfigsRequestLimitRulesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1ConfigsRequestLimitRules[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1ConfigsRequestLimitRulesOutputReference {
    return new CdnDomainV1ConfigsRequestLimitRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1ConfigsRetrievalRequestHeader {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#action CdnDomainV1#action}
  */
  readonly action: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#name CdnDomainV1#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#value CdnDomainV1#value}
  */
  readonly value?: string;
}

export function cdnDomainV1ConfigsRetrievalRequestHeaderToTerraform(struct?: CdnDomainV1ConfigsRetrievalRequestHeader | cdktf.IResolvable): any {
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


export function cdnDomainV1ConfigsRetrievalRequestHeaderToHclTerraform(struct?: CdnDomainV1ConfigsRetrievalRequestHeader | cdktf.IResolvable): any {
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

export class CdnDomainV1ConfigsRetrievalRequestHeaderOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1ConfigsRetrievalRequestHeader | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsRetrievalRequestHeader | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1ConfigsRetrievalRequestHeaderList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1ConfigsRetrievalRequestHeader[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1ConfigsRetrievalRequestHeaderOutputReference {
    return new CdnDomainV1ConfigsRetrievalRequestHeaderOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1ConfigsUrlSigningInheritConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enabled CdnDomainV1#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#inherit_time_type CdnDomainV1#inherit_time_type}
  */
  readonly inheritTimeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#inherit_type CdnDomainV1#inherit_type}
  */
  readonly inheritType?: string;
}

export function cdnDomainV1ConfigsUrlSigningInheritConfigToTerraform(struct?: CdnDomainV1ConfigsUrlSigningInheritConfigOutputReference | CdnDomainV1ConfigsUrlSigningInheritConfig): any {
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


export function cdnDomainV1ConfigsUrlSigningInheritConfigToHclTerraform(struct?: CdnDomainV1ConfigsUrlSigningInheritConfigOutputReference | CdnDomainV1ConfigsUrlSigningInheritConfig): any {
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

export class CdnDomainV1ConfigsUrlSigningInheritConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsUrlSigningInheritConfig | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsUrlSigningInheritConfig | undefined) {
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
export interface CdnDomainV1ConfigsUrlSigning {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#backup_key CdnDomainV1#backup_key}
  */
  readonly backupKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enabled CdnDomainV1#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#expire_time CdnDomainV1#expire_time}
  */
  readonly expireTime?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#key CdnDomainV1#key}
  */
  readonly key?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#match_type CdnDomainV1#match_type}
  */
  readonly matchType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#sign_arg CdnDomainV1#sign_arg}
  */
  readonly signArg?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#sign_method CdnDomainV1#sign_method}
  */
  readonly signMethod?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#time_format CdnDomainV1#time_format}
  */
  readonly timeFormat?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type?: string;
  /**
  * inherit_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#inherit_config CdnDomainV1#inherit_config}
  */
  readonly inheritConfig?: CdnDomainV1ConfigsUrlSigningInheritConfig;
}

export function cdnDomainV1ConfigsUrlSigningToTerraform(struct?: CdnDomainV1ConfigsUrlSigningOutputReference | CdnDomainV1ConfigsUrlSigning): any {
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
    inherit_config: cdnDomainV1ConfigsUrlSigningInheritConfigToTerraform(struct!.inheritConfig),
  }
}


export function cdnDomainV1ConfigsUrlSigningToHclTerraform(struct?: CdnDomainV1ConfigsUrlSigningOutputReference | CdnDomainV1ConfigsUrlSigning): any {
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
      value: cdnDomainV1ConfigsUrlSigningInheritConfigToHclTerraform(struct!.inheritConfig),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsUrlSigningInheritConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainV1ConfigsUrlSigningOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsUrlSigning | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsUrlSigning | undefined) {
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
  private _inheritConfig = new CdnDomainV1ConfigsUrlSigningInheritConfigOutputReference(this, "inherit_config");
  public get inheritConfig() {
    return this._inheritConfig;
  }
  public putInheritConfig(value: CdnDomainV1ConfigsUrlSigningInheritConfig) {
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
export interface CdnDomainV1ConfigsUserAgentFilter {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#include_empty CdnDomainV1#include_empty}
  */
  readonly includeEmpty?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#type CdnDomainV1#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#ua_list CdnDomainV1#ua_list}
  */
  readonly uaList?: string[];
}

export function cdnDomainV1ConfigsUserAgentFilterToTerraform(struct?: CdnDomainV1ConfigsUserAgentFilterOutputReference | CdnDomainV1ConfigsUserAgentFilter): any {
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


export function cdnDomainV1ConfigsUserAgentFilterToHclTerraform(struct?: CdnDomainV1ConfigsUserAgentFilterOutputReference | CdnDomainV1ConfigsUserAgentFilter): any {
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

export class CdnDomainV1ConfigsUserAgentFilterOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsUserAgentFilter | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsUserAgentFilter | undefined) {
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
export interface CdnDomainV1ConfigsVideoSeek {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enable_flv_by_time_seek CdnDomainV1#enable_flv_by_time_seek}
  */
  readonly enableFlvByTimeSeek?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enable_video_seek CdnDomainV1#enable_video_seek}
  */
  readonly enableVideoSeek: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#end_parameter CdnDomainV1#end_parameter}
  */
  readonly endParameter?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#start_parameter CdnDomainV1#start_parameter}
  */
  readonly startParameter?: string;
}

export function cdnDomainV1ConfigsVideoSeekToTerraform(struct?: CdnDomainV1ConfigsVideoSeekOutputReference | CdnDomainV1ConfigsVideoSeek): any {
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


export function cdnDomainV1ConfigsVideoSeekToHclTerraform(struct?: CdnDomainV1ConfigsVideoSeekOutputReference | CdnDomainV1ConfigsVideoSeek): any {
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

export class CdnDomainV1ConfigsVideoSeekOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsVideoSeek | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsVideoSeek | undefined) {
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
export interface CdnDomainV1ConfigsWebsocket {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#enabled CdnDomainV1#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#timeout CdnDomainV1#timeout}
  */
  readonly timeout?: number;
}

export function cdnDomainV1ConfigsWebsocketToTerraform(struct?: CdnDomainV1ConfigsWebsocketOutputReference | CdnDomainV1ConfigsWebsocket): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    timeout: cdktf.numberToTerraform(struct!.timeout),
  }
}


export function cdnDomainV1ConfigsWebsocketToHclTerraform(struct?: CdnDomainV1ConfigsWebsocketOutputReference | CdnDomainV1ConfigsWebsocket): any {
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

export class CdnDomainV1ConfigsWebsocketOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1ConfigsWebsocket | undefined {
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

  public set internalValue(value: CdnDomainV1ConfigsWebsocket | undefined) {
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
export interface CdnDomainV1Configs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#description CdnDomainV1#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#ipv6_enable CdnDomainV1#ipv6_enable}
  */
  readonly ipv6Enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#origin_follow302_status CdnDomainV1#origin_follow302_status}
  */
  readonly originFollow302Status?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#origin_protocol CdnDomainV1#origin_protocol}
  */
  readonly originProtocol?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#origin_receive_timeout CdnDomainV1#origin_receive_timeout}
  */
  readonly originReceiveTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#range_based_retrieval_enabled CdnDomainV1#range_based_retrieval_enabled}
  */
  readonly rangeBasedRetrievalEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#slice_etag_status CdnDomainV1#slice_etag_status}
  */
  readonly sliceEtagStatus?: string;
  /**
  * access_area_filter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#access_area_filter CdnDomainV1#access_area_filter}
  */
  readonly accessAreaFilter?: CdnDomainV1ConfigsAccessAreaFilter[] | cdktf.IResolvable;
  /**
  * cache_url_parameter_filter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#cache_url_parameter_filter CdnDomainV1#cache_url_parameter_filter}
  */
  readonly cacheUrlParameterFilter?: CdnDomainV1ConfigsCacheUrlParameterFilter;
  /**
  * compress block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#compress CdnDomainV1#compress}
  */
  readonly compress?: CdnDomainV1ConfigsCompress;
  /**
  * error_code_cache block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#error_code_cache CdnDomainV1#error_code_cache}
  */
  readonly errorCodeCache?: CdnDomainV1ConfigsErrorCodeCache[] | cdktf.IResolvable;
  /**
  * error_code_redirect_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#error_code_redirect_rules CdnDomainV1#error_code_redirect_rules}
  */
  readonly errorCodeRedirectRules?: CdnDomainV1ConfigsErrorCodeRedirectRules[] | cdktf.IResolvable;
  /**
  * flexible_origin block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#flexible_origin CdnDomainV1#flexible_origin}
  */
  readonly flexibleOrigin?: CdnDomainV1ConfigsFlexibleOrigin[] | cdktf.IResolvable;
  /**
  * force_redirect block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#force_redirect CdnDomainV1#force_redirect}
  */
  readonly forceRedirect?: CdnDomainV1ConfigsForceRedirect;
  /**
  * hsts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#hsts CdnDomainV1#hsts}
  */
  readonly hsts?: CdnDomainV1ConfigsHsts;
  /**
  * http_response_header block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#http_response_header CdnDomainV1#http_response_header}
  */
  readonly httpResponseHeader?: CdnDomainV1ConfigsHttpResponseHeader[] | cdktf.IResolvable;
  /**
  * https_settings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#https_settings CdnDomainV1#https_settings}
  */
  readonly httpsSettings?: CdnDomainV1ConfigsHttpsSettings;
  /**
  * ip_filter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#ip_filter CdnDomainV1#ip_filter}
  */
  readonly ipFilter?: CdnDomainV1ConfigsIpFilter;
  /**
  * ip_frequency_limit block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#ip_frequency_limit CdnDomainV1#ip_frequency_limit}
  */
  readonly ipFrequencyLimit?: CdnDomainV1ConfigsIpFrequencyLimit;
  /**
  * origin_request_url_rewrite block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#origin_request_url_rewrite CdnDomainV1#origin_request_url_rewrite}
  */
  readonly originRequestUrlRewrite?: CdnDomainV1ConfigsOriginRequestUrlRewrite[] | cdktf.IResolvable;
  /**
  * quic block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#quic CdnDomainV1#quic}
  */
  readonly quic?: CdnDomainV1ConfigsQuic;
  /**
  * referer block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#referer CdnDomainV1#referer}
  */
  readonly referer?: CdnDomainV1ConfigsReferer;
  /**
  * remote_auth block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#remote_auth CdnDomainV1#remote_auth}
  */
  readonly remoteAuth?: CdnDomainV1ConfigsRemoteAuth;
  /**
  * request_limit_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#request_limit_rules CdnDomainV1#request_limit_rules}
  */
  readonly requestLimitRules?: CdnDomainV1ConfigsRequestLimitRules[] | cdktf.IResolvable;
  /**
  * retrieval_request_header block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#retrieval_request_header CdnDomainV1#retrieval_request_header}
  */
  readonly retrievalRequestHeader?: CdnDomainV1ConfigsRetrievalRequestHeader[] | cdktf.IResolvable;
  /**
  * url_signing block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#url_signing CdnDomainV1#url_signing}
  */
  readonly urlSigning?: CdnDomainV1ConfigsUrlSigning;
  /**
  * user_agent_filter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#user_agent_filter CdnDomainV1#user_agent_filter}
  */
  readonly userAgentFilter?: CdnDomainV1ConfigsUserAgentFilter;
  /**
  * video_seek block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#video_seek CdnDomainV1#video_seek}
  */
  readonly videoSeek?: CdnDomainV1ConfigsVideoSeek;
  /**
  * websocket block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#websocket CdnDomainV1#websocket}
  */
  readonly websocket?: CdnDomainV1ConfigsWebsocket;
}

export function cdnDomainV1ConfigsToTerraform(struct?: CdnDomainV1ConfigsOutputReference | CdnDomainV1Configs): any {
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
    access_area_filter: cdktf.listMapper(cdnDomainV1ConfigsAccessAreaFilterToTerraform, true)(struct!.accessAreaFilter),
    cache_url_parameter_filter: cdnDomainV1ConfigsCacheUrlParameterFilterToTerraform(struct!.cacheUrlParameterFilter),
    compress: cdnDomainV1ConfigsCompressToTerraform(struct!.compress),
    error_code_cache: cdktf.listMapper(cdnDomainV1ConfigsErrorCodeCacheToTerraform, true)(struct!.errorCodeCache),
    error_code_redirect_rules: cdktf.listMapper(cdnDomainV1ConfigsErrorCodeRedirectRulesToTerraform, true)(struct!.errorCodeRedirectRules),
    flexible_origin: cdktf.listMapper(cdnDomainV1ConfigsFlexibleOriginToTerraform, true)(struct!.flexibleOrigin),
    force_redirect: cdnDomainV1ConfigsForceRedirectToTerraform(struct!.forceRedirect),
    hsts: cdnDomainV1ConfigsHstsToTerraform(struct!.hsts),
    http_response_header: cdktf.listMapper(cdnDomainV1ConfigsHttpResponseHeaderToTerraform, true)(struct!.httpResponseHeader),
    https_settings: cdnDomainV1ConfigsHttpsSettingsToTerraform(struct!.httpsSettings),
    ip_filter: cdnDomainV1ConfigsIpFilterToTerraform(struct!.ipFilter),
    ip_frequency_limit: cdnDomainV1ConfigsIpFrequencyLimitToTerraform(struct!.ipFrequencyLimit),
    origin_request_url_rewrite: cdktf.listMapper(cdnDomainV1ConfigsOriginRequestUrlRewriteToTerraform, true)(struct!.originRequestUrlRewrite),
    quic: cdnDomainV1ConfigsQuicToTerraform(struct!.quic),
    referer: cdnDomainV1ConfigsRefererToTerraform(struct!.referer),
    remote_auth: cdnDomainV1ConfigsRemoteAuthToTerraform(struct!.remoteAuth),
    request_limit_rules: cdktf.listMapper(cdnDomainV1ConfigsRequestLimitRulesToTerraform, true)(struct!.requestLimitRules),
    retrieval_request_header: cdktf.listMapper(cdnDomainV1ConfigsRetrievalRequestHeaderToTerraform, true)(struct!.retrievalRequestHeader),
    url_signing: cdnDomainV1ConfigsUrlSigningToTerraform(struct!.urlSigning),
    user_agent_filter: cdnDomainV1ConfigsUserAgentFilterToTerraform(struct!.userAgentFilter),
    video_seek: cdnDomainV1ConfigsVideoSeekToTerraform(struct!.videoSeek),
    websocket: cdnDomainV1ConfigsWebsocketToTerraform(struct!.websocket),
  }
}


export function cdnDomainV1ConfigsToHclTerraform(struct?: CdnDomainV1ConfigsOutputReference | CdnDomainV1Configs): any {
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
      value: cdktf.listMapperHcl(cdnDomainV1ConfigsAccessAreaFilterToHclTerraform, true)(struct!.accessAreaFilter),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1ConfigsAccessAreaFilterList",
    },
    cache_url_parameter_filter: {
      value: cdnDomainV1ConfigsCacheUrlParameterFilterToHclTerraform(struct!.cacheUrlParameterFilter),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsCacheUrlParameterFilterList",
    },
    compress: {
      value: cdnDomainV1ConfigsCompressToHclTerraform(struct!.compress),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsCompressList",
    },
    error_code_cache: {
      value: cdktf.listMapperHcl(cdnDomainV1ConfigsErrorCodeCacheToHclTerraform, true)(struct!.errorCodeCache),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1ConfigsErrorCodeCacheList",
    },
    error_code_redirect_rules: {
      value: cdktf.listMapperHcl(cdnDomainV1ConfigsErrorCodeRedirectRulesToHclTerraform, true)(struct!.errorCodeRedirectRules),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1ConfigsErrorCodeRedirectRulesList",
    },
    flexible_origin: {
      value: cdktf.listMapperHcl(cdnDomainV1ConfigsFlexibleOriginToHclTerraform, true)(struct!.flexibleOrigin),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1ConfigsFlexibleOriginList",
    },
    force_redirect: {
      value: cdnDomainV1ConfigsForceRedirectToHclTerraform(struct!.forceRedirect),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsForceRedirectList",
    },
    hsts: {
      value: cdnDomainV1ConfigsHstsToHclTerraform(struct!.hsts),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsHstsList",
    },
    http_response_header: {
      value: cdktf.listMapperHcl(cdnDomainV1ConfigsHttpResponseHeaderToHclTerraform, true)(struct!.httpResponseHeader),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1ConfigsHttpResponseHeaderList",
    },
    https_settings: {
      value: cdnDomainV1ConfigsHttpsSettingsToHclTerraform(struct!.httpsSettings),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsHttpsSettingsList",
    },
    ip_filter: {
      value: cdnDomainV1ConfigsIpFilterToHclTerraform(struct!.ipFilter),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsIpFilterList",
    },
    ip_frequency_limit: {
      value: cdnDomainV1ConfigsIpFrequencyLimitToHclTerraform(struct!.ipFrequencyLimit),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsIpFrequencyLimitList",
    },
    origin_request_url_rewrite: {
      value: cdktf.listMapperHcl(cdnDomainV1ConfigsOriginRequestUrlRewriteToHclTerraform, true)(struct!.originRequestUrlRewrite),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1ConfigsOriginRequestUrlRewriteList",
    },
    quic: {
      value: cdnDomainV1ConfigsQuicToHclTerraform(struct!.quic),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsQuicList",
    },
    referer: {
      value: cdnDomainV1ConfigsRefererToHclTerraform(struct!.referer),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsRefererList",
    },
    remote_auth: {
      value: cdnDomainV1ConfigsRemoteAuthToHclTerraform(struct!.remoteAuth),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsRemoteAuthList",
    },
    request_limit_rules: {
      value: cdktf.listMapperHcl(cdnDomainV1ConfigsRequestLimitRulesToHclTerraform, true)(struct!.requestLimitRules),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1ConfigsRequestLimitRulesList",
    },
    retrieval_request_header: {
      value: cdktf.listMapperHcl(cdnDomainV1ConfigsRetrievalRequestHeaderToHclTerraform, true)(struct!.retrievalRequestHeader),
      isBlock: true,
      type: "set",
      storageClassType: "CdnDomainV1ConfigsRetrievalRequestHeaderList",
    },
    url_signing: {
      value: cdnDomainV1ConfigsUrlSigningToHclTerraform(struct!.urlSigning),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsUrlSigningList",
    },
    user_agent_filter: {
      value: cdnDomainV1ConfigsUserAgentFilterToHclTerraform(struct!.userAgentFilter),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsUserAgentFilterList",
    },
    video_seek: {
      value: cdnDomainV1ConfigsVideoSeekToHclTerraform(struct!.videoSeek),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsVideoSeekList",
    },
    websocket: {
      value: cdnDomainV1ConfigsWebsocketToHclTerraform(struct!.websocket),
      isBlock: true,
      type: "list",
      storageClassType: "CdnDomainV1ConfigsWebsocketList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CdnDomainV1ConfigsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CdnDomainV1Configs | undefined {
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

  public set internalValue(value: CdnDomainV1Configs | undefined) {
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
  private _accessAreaFilter = new CdnDomainV1ConfigsAccessAreaFilterList(this, "access_area_filter", true);
  public get accessAreaFilter() {
    return this._accessAreaFilter;
  }
  public putAccessAreaFilter(value: CdnDomainV1ConfigsAccessAreaFilter[] | cdktf.IResolvable) {
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
  private _cacheUrlParameterFilter = new CdnDomainV1ConfigsCacheUrlParameterFilterOutputReference(this, "cache_url_parameter_filter");
  public get cacheUrlParameterFilter() {
    return this._cacheUrlParameterFilter;
  }
  public putCacheUrlParameterFilter(value: CdnDomainV1ConfigsCacheUrlParameterFilter) {
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
  private _compress = new CdnDomainV1ConfigsCompressOutputReference(this, "compress");
  public get compress() {
    return this._compress;
  }
  public putCompress(value: CdnDomainV1ConfigsCompress) {
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
  private _errorCodeCache = new CdnDomainV1ConfigsErrorCodeCacheList(this, "error_code_cache", true);
  public get errorCodeCache() {
    return this._errorCodeCache;
  }
  public putErrorCodeCache(value: CdnDomainV1ConfigsErrorCodeCache[] | cdktf.IResolvable) {
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
  private _errorCodeRedirectRules = new CdnDomainV1ConfigsErrorCodeRedirectRulesList(this, "error_code_redirect_rules", true);
  public get errorCodeRedirectRules() {
    return this._errorCodeRedirectRules;
  }
  public putErrorCodeRedirectRules(value: CdnDomainV1ConfigsErrorCodeRedirectRules[] | cdktf.IResolvable) {
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
  private _flexibleOrigin = new CdnDomainV1ConfigsFlexibleOriginList(this, "flexible_origin", true);
  public get flexibleOrigin() {
    return this._flexibleOrigin;
  }
  public putFlexibleOrigin(value: CdnDomainV1ConfigsFlexibleOrigin[] | cdktf.IResolvable) {
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
  private _forceRedirect = new CdnDomainV1ConfigsForceRedirectOutputReference(this, "force_redirect");
  public get forceRedirect() {
    return this._forceRedirect;
  }
  public putForceRedirect(value: CdnDomainV1ConfigsForceRedirect) {
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
  private _hsts = new CdnDomainV1ConfigsHstsOutputReference(this, "hsts");
  public get hsts() {
    return this._hsts;
  }
  public putHsts(value: CdnDomainV1ConfigsHsts) {
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
  private _httpResponseHeader = new CdnDomainV1ConfigsHttpResponseHeaderList(this, "http_response_header", true);
  public get httpResponseHeader() {
    return this._httpResponseHeader;
  }
  public putHttpResponseHeader(value: CdnDomainV1ConfigsHttpResponseHeader[] | cdktf.IResolvable) {
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
  private _httpsSettings = new CdnDomainV1ConfigsHttpsSettingsOutputReference(this, "https_settings");
  public get httpsSettings() {
    return this._httpsSettings;
  }
  public putHttpsSettings(value: CdnDomainV1ConfigsHttpsSettings) {
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
  private _ipFilter = new CdnDomainV1ConfigsIpFilterOutputReference(this, "ip_filter");
  public get ipFilter() {
    return this._ipFilter;
  }
  public putIpFilter(value: CdnDomainV1ConfigsIpFilter) {
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
  private _ipFrequencyLimit = new CdnDomainV1ConfigsIpFrequencyLimitOutputReference(this, "ip_frequency_limit");
  public get ipFrequencyLimit() {
    return this._ipFrequencyLimit;
  }
  public putIpFrequencyLimit(value: CdnDomainV1ConfigsIpFrequencyLimit) {
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
  private _originRequestUrlRewrite = new CdnDomainV1ConfigsOriginRequestUrlRewriteList(this, "origin_request_url_rewrite", true);
  public get originRequestUrlRewrite() {
    return this._originRequestUrlRewrite;
  }
  public putOriginRequestUrlRewrite(value: CdnDomainV1ConfigsOriginRequestUrlRewrite[] | cdktf.IResolvable) {
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
  private _quic = new CdnDomainV1ConfigsQuicOutputReference(this, "quic");
  public get quic() {
    return this._quic;
  }
  public putQuic(value: CdnDomainV1ConfigsQuic) {
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
  private _referer = new CdnDomainV1ConfigsRefererOutputReference(this, "referer");
  public get referer() {
    return this._referer;
  }
  public putReferer(value: CdnDomainV1ConfigsReferer) {
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
  private _remoteAuth = new CdnDomainV1ConfigsRemoteAuthOutputReference(this, "remote_auth");
  public get remoteAuth() {
    return this._remoteAuth;
  }
  public putRemoteAuth(value: CdnDomainV1ConfigsRemoteAuth) {
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
  private _requestLimitRules = new CdnDomainV1ConfigsRequestLimitRulesList(this, "request_limit_rules", true);
  public get requestLimitRules() {
    return this._requestLimitRules;
  }
  public putRequestLimitRules(value: CdnDomainV1ConfigsRequestLimitRules[] | cdktf.IResolvable) {
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
  private _retrievalRequestHeader = new CdnDomainV1ConfigsRetrievalRequestHeaderList(this, "retrieval_request_header", true);
  public get retrievalRequestHeader() {
    return this._retrievalRequestHeader;
  }
  public putRetrievalRequestHeader(value: CdnDomainV1ConfigsRetrievalRequestHeader[] | cdktf.IResolvable) {
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
  private _urlSigning = new CdnDomainV1ConfigsUrlSigningOutputReference(this, "url_signing");
  public get urlSigning() {
    return this._urlSigning;
  }
  public putUrlSigning(value: CdnDomainV1ConfigsUrlSigning) {
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
  private _userAgentFilter = new CdnDomainV1ConfigsUserAgentFilterOutputReference(this, "user_agent_filter");
  public get userAgentFilter() {
    return this._userAgentFilter;
  }
  public putUserAgentFilter(value: CdnDomainV1ConfigsUserAgentFilter) {
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
  private _videoSeek = new CdnDomainV1ConfigsVideoSeekOutputReference(this, "video_seek");
  public get videoSeek() {
    return this._videoSeek;
  }
  public putVideoSeek(value: CdnDomainV1ConfigsVideoSeek) {
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
  private _websocket = new CdnDomainV1ConfigsWebsocketOutputReference(this, "websocket");
  public get websocket() {
    return this._websocket;
  }
  public putWebsocket(value: CdnDomainV1ConfigsWebsocket) {
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
export interface CdnDomainV1Sources {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#active CdnDomainV1#active}
  */
  readonly active?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#http_port CdnDomainV1#http_port}
  */
  readonly httpPort?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#https_port CdnDomainV1#https_port}
  */
  readonly httpsPort?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#obs_bucket_type CdnDomainV1#obs_bucket_type}
  */
  readonly obsBucketType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#obs_web_hosting_enabled CdnDomainV1#obs_web_hosting_enabled}
  */
  readonly obsWebHostingEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#origin CdnDomainV1#origin}
  */
  readonly origin: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#origin_type CdnDomainV1#origin_type}
  */
  readonly originType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#retrieval_host CdnDomainV1#retrieval_host}
  */
  readonly retrievalHost?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#weight CdnDomainV1#weight}
  */
  readonly weight?: number;
}

export function cdnDomainV1SourcesToTerraform(struct?: CdnDomainV1Sources | cdktf.IResolvable): any {
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


export function cdnDomainV1SourcesToHclTerraform(struct?: CdnDomainV1Sources | cdktf.IResolvable): any {
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

export class CdnDomainV1SourcesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CdnDomainV1Sources | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1Sources | cdktf.IResolvable | undefined) {
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

export class CdnDomainV1SourcesList extends cdktf.ComplexList {
  public internalValue? : CdnDomainV1Sources[] | cdktf.IResolvable

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
  public get(index: number): CdnDomainV1SourcesOutputReference {
    return new CdnDomainV1SourcesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CdnDomainV1Timeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#create CdnDomainV1#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#delete CdnDomainV1#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#update CdnDomainV1#update}
  */
  readonly update?: string;
}

export function cdnDomainV1TimeoutsToTerraform(struct?: CdnDomainV1Timeouts | cdktf.IResolvable): any {
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


export function cdnDomainV1TimeoutsToHclTerraform(struct?: CdnDomainV1Timeouts | cdktf.IResolvable): any {
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

export class CdnDomainV1TimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CdnDomainV1Timeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CdnDomainV1Timeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1 huaweicloud_cdn_domain_v1}
*/
export class CdnDomainV1 extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cdn_domain_v1";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CdnDomainV1 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CdnDomainV1 to import
  * @param importFromId The id of the existing CdnDomainV1 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CdnDomainV1 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cdn_domain_v1", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cdn_domain_v1 huaweicloud_cdn_domain_v1} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CdnDomainV1Config
  */
  public constructor(scope: Construct, id: string, config: CdnDomainV1Config) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cdn_domain_v1',
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
  private _cacheSettings = new CdnDomainV1CacheSettingsOutputReference(this, "cache_settings");
  public get cacheSettings() {
    return this._cacheSettings;
  }
  public putCacheSettings(value: CdnDomainV1CacheSettings) {
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
  private _configs = new CdnDomainV1ConfigsOutputReference(this, "configs");
  public get configs() {
    return this._configs;
  }
  public putConfigs(value: CdnDomainV1Configs) {
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
  private _sources = new CdnDomainV1SourcesList(this, "sources", true);
  public get sources() {
    return this._sources;
  }
  public putSources(value: CdnDomainV1Sources[] | cdktf.IResolvable) {
    this._sources.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourcesInput() {
    return this._sources.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CdnDomainV1TimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CdnDomainV1Timeouts) {
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
      cache_settings: cdnDomainV1CacheSettingsToTerraform(this._cacheSettings.internalValue),
      configs: cdnDomainV1ConfigsToTerraform(this._configs.internalValue),
      sources: cdktf.listMapper(cdnDomainV1SourcesToTerraform, true)(this._sources.internalValue),
      timeouts: cdnDomainV1TimeoutsToTerraform(this._timeouts.internalValue),
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
        value: cdnDomainV1CacheSettingsToHclTerraform(this._cacheSettings.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CdnDomainV1CacheSettingsList",
      },
      configs: {
        value: cdnDomainV1ConfigsToHclTerraform(this._configs.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CdnDomainV1ConfigsList",
      },
      sources: {
        value: cdktf.listMapperHcl(cdnDomainV1SourcesToHclTerraform, true)(this._sources.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "CdnDomainV1SourcesList",
      },
      timeouts: {
        value: cdnDomainV1TimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CdnDomainV1Timeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AomServiceDiscoveryRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#description AomServiceDiscoveryRule#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#detect_log_enabled AomServiceDiscoveryRule#detect_log_enabled}
  */
  readonly detectLogEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#discovery_rule_enabled AomServiceDiscoveryRule#discovery_rule_enabled}
  */
  readonly discoveryRuleEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#id AomServiceDiscoveryRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#is_default_rule AomServiceDiscoveryRule#is_default_rule}
  */
  readonly isDefaultRule?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#log_file_suffix AomServiceDiscoveryRule#log_file_suffix}
  */
  readonly logFileSuffix: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#name AomServiceDiscoveryRule#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#priority AomServiceDiscoveryRule#priority}
  */
  readonly priority?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#region AomServiceDiscoveryRule#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#service_type AomServiceDiscoveryRule#service_type}
  */
  readonly serviceType: string;
  /**
  * discovery_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#discovery_rules AomServiceDiscoveryRule#discovery_rules}
  */
  readonly discoveryRules: AomServiceDiscoveryRuleDiscoveryRules[] | cdktf.IResolvable;
  /**
  * log_path_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#log_path_rules AomServiceDiscoveryRule#log_path_rules}
  */
  readonly logPathRules?: AomServiceDiscoveryRuleLogPathRules[] | cdktf.IResolvable;
  /**
  * name_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#name_rules AomServiceDiscoveryRule#name_rules}
  */
  readonly nameRules: AomServiceDiscoveryRuleNameRules;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#timeouts AomServiceDiscoveryRule#timeouts}
  */
  readonly timeouts?: AomServiceDiscoveryRuleTimeouts;
}
export interface AomServiceDiscoveryRuleDiscoveryRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#check_content AomServiceDiscoveryRule#check_content}
  */
  readonly checkContent: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#check_mode AomServiceDiscoveryRule#check_mode}
  */
  readonly checkMode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#check_type AomServiceDiscoveryRule#check_type}
  */
  readonly checkType: string;
}

export function aomServiceDiscoveryRuleDiscoveryRulesToTerraform(struct?: AomServiceDiscoveryRuleDiscoveryRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    check_content: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.checkContent),
    check_mode: cdktf.stringToTerraform(struct!.checkMode),
    check_type: cdktf.stringToTerraform(struct!.checkType),
  }
}


export function aomServiceDiscoveryRuleDiscoveryRulesToHclTerraform(struct?: AomServiceDiscoveryRuleDiscoveryRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    check_content: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.checkContent),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    check_mode: {
      value: cdktf.stringToHclTerraform(struct!.checkMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    check_type: {
      value: cdktf.stringToHclTerraform(struct!.checkType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomServiceDiscoveryRuleDiscoveryRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomServiceDiscoveryRuleDiscoveryRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._checkContent !== undefined) {
      hasAnyValues = true;
      internalValueResult.checkContent = this._checkContent;
    }
    if (this._checkMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.checkMode = this._checkMode;
    }
    if (this._checkType !== undefined) {
      hasAnyValues = true;
      internalValueResult.checkType = this._checkType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomServiceDiscoveryRuleDiscoveryRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._checkContent = undefined;
      this._checkMode = undefined;
      this._checkType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._checkContent = value.checkContent;
      this._checkMode = value.checkMode;
      this._checkType = value.checkType;
    }
  }

  // check_content - computed: false, optional: false, required: true
  private _checkContent?: string[]; 
  public get checkContent() {
    return this.getListAttribute('check_content');
  }
  public set checkContent(value: string[]) {
    this._checkContent = value;
  }
  // Temporarily expose input value. Use with caution.
  public get checkContentInput() {
    return this._checkContent;
  }

  // check_mode - computed: false, optional: false, required: true
  private _checkMode?: string; 
  public get checkMode() {
    return this.getStringAttribute('check_mode');
  }
  public set checkMode(value: string) {
    this._checkMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get checkModeInput() {
    return this._checkMode;
  }

  // check_type - computed: false, optional: false, required: true
  private _checkType?: string; 
  public get checkType() {
    return this.getStringAttribute('check_type');
  }
  public set checkType(value: string) {
    this._checkType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get checkTypeInput() {
    return this._checkType;
  }
}

export class AomServiceDiscoveryRuleDiscoveryRulesList extends cdktf.ComplexList {
  public internalValue? : AomServiceDiscoveryRuleDiscoveryRules[] | cdktf.IResolvable

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
  public get(index: number): AomServiceDiscoveryRuleDiscoveryRulesOutputReference {
    return new AomServiceDiscoveryRuleDiscoveryRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomServiceDiscoveryRuleLogPathRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#args AomServiceDiscoveryRule#args}
  */
  readonly args: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#name_type AomServiceDiscoveryRule#name_type}
  */
  readonly nameType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#value AomServiceDiscoveryRule#value}
  */
  readonly value: string[];
}

export function aomServiceDiscoveryRuleLogPathRulesToTerraform(struct?: AomServiceDiscoveryRuleLogPathRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    args: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.args),
    name_type: cdktf.stringToTerraform(struct!.nameType),
    value: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.value),
  }
}


export function aomServiceDiscoveryRuleLogPathRulesToHclTerraform(struct?: AomServiceDiscoveryRuleLogPathRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    args: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.args),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    name_type: {
      value: cdktf.stringToHclTerraform(struct!.nameType),
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

export class AomServiceDiscoveryRuleLogPathRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomServiceDiscoveryRuleLogPathRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._args !== undefined) {
      hasAnyValues = true;
      internalValueResult.args = this._args;
    }
    if (this._nameType !== undefined) {
      hasAnyValues = true;
      internalValueResult.nameType = this._nameType;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomServiceDiscoveryRuleLogPathRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._args = undefined;
      this._nameType = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._args = value.args;
      this._nameType = value.nameType;
      this._value = value.value;
    }
  }

  // args - computed: false, optional: false, required: true
  private _args?: string[]; 
  public get args() {
    return this.getListAttribute('args');
  }
  public set args(value: string[]) {
    this._args = value;
  }
  // Temporarily expose input value. Use with caution.
  public get argsInput() {
    return this._args;
  }

  // name_type - computed: false, optional: false, required: true
  private _nameType?: string; 
  public get nameType() {
    return this.getStringAttribute('name_type');
  }
  public set nameType(value: string) {
    this._nameType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameTypeInput() {
    return this._nameType;
  }

  // value - computed: false, optional: false, required: true
  private _value?: string[]; 
  public get value() {
    return this.getListAttribute('value');
  }
  public set value(value: string[]) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class AomServiceDiscoveryRuleLogPathRulesList extends cdktf.ComplexList {
  public internalValue? : AomServiceDiscoveryRuleLogPathRules[] | cdktf.IResolvable

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
  public get(index: number): AomServiceDiscoveryRuleLogPathRulesOutputReference {
    return new AomServiceDiscoveryRuleLogPathRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomServiceDiscoveryRuleNameRulesApplicationNameRule {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#args AomServiceDiscoveryRule#args}
  */
  readonly args: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#name_type AomServiceDiscoveryRule#name_type}
  */
  readonly nameType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#value AomServiceDiscoveryRule#value}
  */
  readonly value?: string[];
}

export function aomServiceDiscoveryRuleNameRulesApplicationNameRuleToTerraform(struct?: AomServiceDiscoveryRuleNameRulesApplicationNameRule | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    args: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.args),
    name_type: cdktf.stringToTerraform(struct!.nameType),
    value: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.value),
  }
}


export function aomServiceDiscoveryRuleNameRulesApplicationNameRuleToHclTerraform(struct?: AomServiceDiscoveryRuleNameRulesApplicationNameRule | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    args: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.args),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    name_type: {
      value: cdktf.stringToHclTerraform(struct!.nameType),
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

export class AomServiceDiscoveryRuleNameRulesApplicationNameRuleOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomServiceDiscoveryRuleNameRulesApplicationNameRule | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._args !== undefined) {
      hasAnyValues = true;
      internalValueResult.args = this._args;
    }
    if (this._nameType !== undefined) {
      hasAnyValues = true;
      internalValueResult.nameType = this._nameType;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomServiceDiscoveryRuleNameRulesApplicationNameRule | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._args = undefined;
      this._nameType = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._args = value.args;
      this._nameType = value.nameType;
      this._value = value.value;
    }
  }

  // args - computed: false, optional: false, required: true
  private _args?: string[]; 
  public get args() {
    return this.getListAttribute('args');
  }
  public set args(value: string[]) {
    this._args = value;
  }
  // Temporarily expose input value. Use with caution.
  public get argsInput() {
    return this._args;
  }

  // name_type - computed: false, optional: false, required: true
  private _nameType?: string; 
  public get nameType() {
    return this.getStringAttribute('name_type');
  }
  public set nameType(value: string) {
    this._nameType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameTypeInput() {
    return this._nameType;
  }

  // value - computed: false, optional: true, required: false
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

export class AomServiceDiscoveryRuleNameRulesApplicationNameRuleList extends cdktf.ComplexList {
  public internalValue? : AomServiceDiscoveryRuleNameRulesApplicationNameRule[] | cdktf.IResolvable

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
  public get(index: number): AomServiceDiscoveryRuleNameRulesApplicationNameRuleOutputReference {
    return new AomServiceDiscoveryRuleNameRulesApplicationNameRuleOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomServiceDiscoveryRuleNameRulesServiceNameRule {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#args AomServiceDiscoveryRule#args}
  */
  readonly args: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#name_type AomServiceDiscoveryRule#name_type}
  */
  readonly nameType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#value AomServiceDiscoveryRule#value}
  */
  readonly value?: string[];
}

export function aomServiceDiscoveryRuleNameRulesServiceNameRuleToTerraform(struct?: AomServiceDiscoveryRuleNameRulesServiceNameRule | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    args: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.args),
    name_type: cdktf.stringToTerraform(struct!.nameType),
    value: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.value),
  }
}


export function aomServiceDiscoveryRuleNameRulesServiceNameRuleToHclTerraform(struct?: AomServiceDiscoveryRuleNameRulesServiceNameRule | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    args: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.args),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    name_type: {
      value: cdktf.stringToHclTerraform(struct!.nameType),
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

export class AomServiceDiscoveryRuleNameRulesServiceNameRuleOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AomServiceDiscoveryRuleNameRulesServiceNameRule | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._args !== undefined) {
      hasAnyValues = true;
      internalValueResult.args = this._args;
    }
    if (this._nameType !== undefined) {
      hasAnyValues = true;
      internalValueResult.nameType = this._nameType;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomServiceDiscoveryRuleNameRulesServiceNameRule | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._args = undefined;
      this._nameType = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._args = value.args;
      this._nameType = value.nameType;
      this._value = value.value;
    }
  }

  // args - computed: false, optional: false, required: true
  private _args?: string[]; 
  public get args() {
    return this.getListAttribute('args');
  }
  public set args(value: string[]) {
    this._args = value;
  }
  // Temporarily expose input value. Use with caution.
  public get argsInput() {
    return this._args;
  }

  // name_type - computed: false, optional: false, required: true
  private _nameType?: string; 
  public get nameType() {
    return this.getStringAttribute('name_type');
  }
  public set nameType(value: string) {
    this._nameType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameTypeInput() {
    return this._nameType;
  }

  // value - computed: false, optional: true, required: false
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

export class AomServiceDiscoveryRuleNameRulesServiceNameRuleList extends cdktf.ComplexList {
  public internalValue? : AomServiceDiscoveryRuleNameRulesServiceNameRule[] | cdktf.IResolvable

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
  public get(index: number): AomServiceDiscoveryRuleNameRulesServiceNameRuleOutputReference {
    return new AomServiceDiscoveryRuleNameRulesServiceNameRuleOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AomServiceDiscoveryRuleNameRules {
  /**
  * application_name_rule block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#application_name_rule AomServiceDiscoveryRule#application_name_rule}
  */
  readonly applicationNameRule: AomServiceDiscoveryRuleNameRulesApplicationNameRule[] | cdktf.IResolvable;
  /**
  * service_name_rule block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#service_name_rule AomServiceDiscoveryRule#service_name_rule}
  */
  readonly serviceNameRule: AomServiceDiscoveryRuleNameRulesServiceNameRule[] | cdktf.IResolvable;
}

export function aomServiceDiscoveryRuleNameRulesToTerraform(struct?: AomServiceDiscoveryRuleNameRulesOutputReference | AomServiceDiscoveryRuleNameRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    application_name_rule: cdktf.listMapper(aomServiceDiscoveryRuleNameRulesApplicationNameRuleToTerraform, true)(struct!.applicationNameRule),
    service_name_rule: cdktf.listMapper(aomServiceDiscoveryRuleNameRulesServiceNameRuleToTerraform, true)(struct!.serviceNameRule),
  }
}


export function aomServiceDiscoveryRuleNameRulesToHclTerraform(struct?: AomServiceDiscoveryRuleNameRulesOutputReference | AomServiceDiscoveryRuleNameRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    application_name_rule: {
      value: cdktf.listMapperHcl(aomServiceDiscoveryRuleNameRulesApplicationNameRuleToHclTerraform, true)(struct!.applicationNameRule),
      isBlock: true,
      type: "list",
      storageClassType: "AomServiceDiscoveryRuleNameRulesApplicationNameRuleList",
    },
    service_name_rule: {
      value: cdktf.listMapperHcl(aomServiceDiscoveryRuleNameRulesServiceNameRuleToHclTerraform, true)(struct!.serviceNameRule),
      isBlock: true,
      type: "list",
      storageClassType: "AomServiceDiscoveryRuleNameRulesServiceNameRuleList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AomServiceDiscoveryRuleNameRulesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AomServiceDiscoveryRuleNameRules | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._applicationNameRule?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.applicationNameRule = this._applicationNameRule?.internalValue;
    }
    if (this._serviceNameRule?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.serviceNameRule = this._serviceNameRule?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AomServiceDiscoveryRuleNameRules | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._applicationNameRule.internalValue = undefined;
      this._serviceNameRule.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._applicationNameRule.internalValue = value.applicationNameRule;
      this._serviceNameRule.internalValue = value.serviceNameRule;
    }
  }

  // application_name_rule - computed: false, optional: false, required: true
  private _applicationNameRule = new AomServiceDiscoveryRuleNameRulesApplicationNameRuleList(this, "application_name_rule", false);
  public get applicationNameRule() {
    return this._applicationNameRule;
  }
  public putApplicationNameRule(value: AomServiceDiscoveryRuleNameRulesApplicationNameRule[] | cdktf.IResolvable) {
    this._applicationNameRule.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get applicationNameRuleInput() {
    return this._applicationNameRule.internalValue;
  }

  // service_name_rule - computed: false, optional: false, required: true
  private _serviceNameRule = new AomServiceDiscoveryRuleNameRulesServiceNameRuleList(this, "service_name_rule", false);
  public get serviceNameRule() {
    return this._serviceNameRule;
  }
  public putServiceNameRule(value: AomServiceDiscoveryRuleNameRulesServiceNameRule[] | cdktf.IResolvable) {
    this._serviceNameRule.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceNameRuleInput() {
    return this._serviceNameRule.internalValue;
  }
}
export interface AomServiceDiscoveryRuleTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#create AomServiceDiscoveryRule#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#delete AomServiceDiscoveryRule#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#update AomServiceDiscoveryRule#update}
  */
  readonly update?: string;
}

export function aomServiceDiscoveryRuleTimeoutsToTerraform(struct?: AomServiceDiscoveryRuleTimeouts | cdktf.IResolvable): any {
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


export function aomServiceDiscoveryRuleTimeoutsToHclTerraform(struct?: AomServiceDiscoveryRuleTimeouts | cdktf.IResolvable): any {
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

export class AomServiceDiscoveryRuleTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): AomServiceDiscoveryRuleTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: AomServiceDiscoveryRuleTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule huaweicloud_aom_service_discovery_rule}
*/
export class AomServiceDiscoveryRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_service_discovery_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AomServiceDiscoveryRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AomServiceDiscoveryRule to import
  * @param importFromId The id of the existing AomServiceDiscoveryRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AomServiceDiscoveryRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_service_discovery_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_service_discovery_rule huaweicloud_aom_service_discovery_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AomServiceDiscoveryRuleConfig
  */
  public constructor(scope: Construct, id: string, config: AomServiceDiscoveryRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_service_discovery_rule',
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
    this._detectLogEnabled = config.detectLogEnabled;
    this._discoveryRuleEnabled = config.discoveryRuleEnabled;
    this._id = config.id;
    this._isDefaultRule = config.isDefaultRule;
    this._logFileSuffix = config.logFileSuffix;
    this._name = config.name;
    this._priority = config.priority;
    this._region = config.region;
    this._serviceType = config.serviceType;
    this._discoveryRules.internalValue = config.discoveryRules;
    this._logPathRules.internalValue = config.logPathRules;
    this._nameRules.internalValue = config.nameRules;
    this._timeouts.internalValue = config.timeouts;
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

  // detect_log_enabled - computed: false, optional: true, required: false
  private _detectLogEnabled?: boolean | cdktf.IResolvable; 
  public get detectLogEnabled() {
    return this.getBooleanAttribute('detect_log_enabled');
  }
  public set detectLogEnabled(value: boolean | cdktf.IResolvable) {
    this._detectLogEnabled = value;
  }
  public resetDetectLogEnabled() {
    this._detectLogEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get detectLogEnabledInput() {
    return this._detectLogEnabled;
  }

  // discovery_rule_enabled - computed: false, optional: true, required: false
  private _discoveryRuleEnabled?: boolean | cdktf.IResolvable; 
  public get discoveryRuleEnabled() {
    return this.getBooleanAttribute('discovery_rule_enabled');
  }
  public set discoveryRuleEnabled(value: boolean | cdktf.IResolvable) {
    this._discoveryRuleEnabled = value;
  }
  public resetDiscoveryRuleEnabled() {
    this._discoveryRuleEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get discoveryRuleEnabledInput() {
    return this._discoveryRuleEnabled;
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

  // is_default_rule - computed: false, optional: true, required: false
  private _isDefaultRule?: boolean | cdktf.IResolvable; 
  public get isDefaultRule() {
    return this.getBooleanAttribute('is_default_rule');
  }
  public set isDefaultRule(value: boolean | cdktf.IResolvable) {
    this._isDefaultRule = value;
  }
  public resetIsDefaultRule() {
    this._isDefaultRule = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isDefaultRuleInput() {
    return this._isDefaultRule;
  }

  // log_file_suffix - computed: false, optional: false, required: true
  private _logFileSuffix?: string[]; 
  public get logFileSuffix() {
    return this.getListAttribute('log_file_suffix');
  }
  public set logFileSuffix(value: string[]) {
    this._logFileSuffix = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logFileSuffixInput() {
    return this._logFileSuffix;
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

  // priority - computed: false, optional: true, required: false
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

  // rule_id - computed: true, optional: false, required: false
  public get ruleId() {
    return this.getStringAttribute('rule_id');
  }

  // service_type - computed: false, optional: false, required: true
  private _serviceType?: string; 
  public get serviceType() {
    return this.getStringAttribute('service_type');
  }
  public set serviceType(value: string) {
    this._serviceType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceTypeInput() {
    return this._serviceType;
  }

  // discovery_rules - computed: false, optional: false, required: true
  private _discoveryRules = new AomServiceDiscoveryRuleDiscoveryRulesList(this, "discovery_rules", false);
  public get discoveryRules() {
    return this._discoveryRules;
  }
  public putDiscoveryRules(value: AomServiceDiscoveryRuleDiscoveryRules[] | cdktf.IResolvable) {
    this._discoveryRules.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get discoveryRulesInput() {
    return this._discoveryRules.internalValue;
  }

  // log_path_rules - computed: false, optional: true, required: false
  private _logPathRules = new AomServiceDiscoveryRuleLogPathRulesList(this, "log_path_rules", false);
  public get logPathRules() {
    return this._logPathRules;
  }
  public putLogPathRules(value: AomServiceDiscoveryRuleLogPathRules[] | cdktf.IResolvable) {
    this._logPathRules.internalValue = value;
  }
  public resetLogPathRules() {
    this._logPathRules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logPathRulesInput() {
    return this._logPathRules.internalValue;
  }

  // name_rules - computed: false, optional: false, required: true
  private _nameRules = new AomServiceDiscoveryRuleNameRulesOutputReference(this, "name_rules");
  public get nameRules() {
    return this._nameRules;
  }
  public putNameRules(value: AomServiceDiscoveryRuleNameRules) {
    this._nameRules.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameRulesInput() {
    return this._nameRules.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new AomServiceDiscoveryRuleTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: AomServiceDiscoveryRuleTimeouts) {
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
      description: cdktf.stringToTerraform(this._description),
      detect_log_enabled: cdktf.booleanToTerraform(this._detectLogEnabled),
      discovery_rule_enabled: cdktf.booleanToTerraform(this._discoveryRuleEnabled),
      id: cdktf.stringToTerraform(this._id),
      is_default_rule: cdktf.booleanToTerraform(this._isDefaultRule),
      log_file_suffix: cdktf.listMapper(cdktf.stringToTerraform, false)(this._logFileSuffix),
      name: cdktf.stringToTerraform(this._name),
      priority: cdktf.numberToTerraform(this._priority),
      region: cdktf.stringToTerraform(this._region),
      service_type: cdktf.stringToTerraform(this._serviceType),
      discovery_rules: cdktf.listMapper(aomServiceDiscoveryRuleDiscoveryRulesToTerraform, true)(this._discoveryRules.internalValue),
      log_path_rules: cdktf.listMapper(aomServiceDiscoveryRuleLogPathRulesToTerraform, true)(this._logPathRules.internalValue),
      name_rules: aomServiceDiscoveryRuleNameRulesToTerraform(this._nameRules.internalValue),
      timeouts: aomServiceDiscoveryRuleTimeoutsToTerraform(this._timeouts.internalValue),
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
      detect_log_enabled: {
        value: cdktf.booleanToHclTerraform(this._detectLogEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      discovery_rule_enabled: {
        value: cdktf.booleanToHclTerraform(this._discoveryRuleEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_default_rule: {
        value: cdktf.booleanToHclTerraform(this._isDefaultRule),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      log_file_suffix: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._logFileSuffix),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      priority: {
        value: cdktf.numberToHclTerraform(this._priority),
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
      service_type: {
        value: cdktf.stringToHclTerraform(this._serviceType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      discovery_rules: {
        value: cdktf.listMapperHcl(aomServiceDiscoveryRuleDiscoveryRulesToHclTerraform, true)(this._discoveryRules.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AomServiceDiscoveryRuleDiscoveryRulesList",
      },
      log_path_rules: {
        value: cdktf.listMapperHcl(aomServiceDiscoveryRuleLogPathRulesToHclTerraform, true)(this._logPathRules.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AomServiceDiscoveryRuleLogPathRulesList",
      },
      name_rules: {
        value: aomServiceDiscoveryRuleNameRulesToHclTerraform(this._nameRules.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AomServiceDiscoveryRuleNameRulesList",
      },
      timeouts: {
        value: aomServiceDiscoveryRuleTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "AomServiceDiscoveryRuleTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

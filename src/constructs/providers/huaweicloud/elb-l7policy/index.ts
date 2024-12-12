// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ElbL7PolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#action ElbL7Policy#action}
  */
  readonly action?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#description ElbL7Policy#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#id ElbL7Policy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#listener_id ElbL7Policy#listener_id}
  */
  readonly listenerId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#name ElbL7Policy#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#priority ElbL7Policy#priority}
  */
  readonly priority?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#redirect_listener_id ElbL7Policy#redirect_listener_id}
  */
  readonly redirectListenerId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#redirect_pool_id ElbL7Policy#redirect_pool_id}
  */
  readonly redirectPoolId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#region ElbL7Policy#region}
  */
  readonly region?: string;
  /**
  * fixed_response_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#fixed_response_config ElbL7Policy#fixed_response_config}
  */
  readonly fixedResponseConfig?: ElbL7PolicyFixedResponseConfig;
  /**
  * redirect_pools_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#redirect_pools_config ElbL7Policy#redirect_pools_config}
  */
  readonly redirectPoolsConfig?: ElbL7PolicyRedirectPoolsConfig[] | cdktf.IResolvable;
  /**
  * redirect_pools_extend_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#redirect_pools_extend_config ElbL7Policy#redirect_pools_extend_config}
  */
  readonly redirectPoolsExtendConfig?: ElbL7PolicyRedirectPoolsExtendConfig;
  /**
  * redirect_pools_sticky_session_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#redirect_pools_sticky_session_config ElbL7Policy#redirect_pools_sticky_session_config}
  */
  readonly redirectPoolsStickySessionConfig?: ElbL7PolicyRedirectPoolsStickySessionConfig;
  /**
  * redirect_url_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#redirect_url_config ElbL7Policy#redirect_url_config}
  */
  readonly redirectUrlConfig?: ElbL7PolicyRedirectUrlConfig;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#timeouts ElbL7Policy#timeouts}
  */
  readonly timeouts?: ElbL7PolicyTimeouts;
}
export interface ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#key ElbL7Policy#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#value ElbL7Policy#value}
  */
  readonly value: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#value_type ElbL7Policy#value_type}
  */
  readonly valueType: string;
}

export function elbL7PolicyFixedResponseConfigInsertHeadersConfigConfigsToTerraform(struct?: ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
    value: cdktf.stringToTerraform(struct!.value),
    value_type: cdktf.stringToTerraform(struct!.valueType),
  }
}


export function elbL7PolicyFixedResponseConfigInsertHeadersConfigConfigsToHclTerraform(struct?: ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigs | cdktf.IResolvable): any {
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
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value_type: {
      value: cdktf.stringToHclTerraform(struct!.valueType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    if (this._valueType !== undefined) {
      hasAnyValues = true;
      internalValueResult.valueType = this._valueType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._key = undefined;
      this._value = undefined;
      this._valueType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._key = value.key;
      this._value = value.value;
      this._valueType = value.valueType;
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

  // value_type - computed: false, optional: false, required: true
  private _valueType?: string; 
  public get valueType() {
    return this.getStringAttribute('value_type');
  }
  public set valueType(value: string) {
    this._valueType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueTypeInput() {
    return this._valueType;
  }
}

export class ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigsList extends cdktf.ComplexList {
  public internalValue? : ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigs[] | cdktf.IResolvable

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
  public get(index: number): ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigsOutputReference {
    return new ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ElbL7PolicyFixedResponseConfigInsertHeadersConfig {
  /**
  * configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#configs ElbL7Policy#configs}
  */
  readonly configs: ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigs[] | cdktf.IResolvable;
}

export function elbL7PolicyFixedResponseConfigInsertHeadersConfigToTerraform(struct?: ElbL7PolicyFixedResponseConfigInsertHeadersConfigOutputReference | ElbL7PolicyFixedResponseConfigInsertHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    configs: cdktf.listMapper(elbL7PolicyFixedResponseConfigInsertHeadersConfigConfigsToTerraform, true)(struct!.configs),
  }
}


export function elbL7PolicyFixedResponseConfigInsertHeadersConfigToHclTerraform(struct?: ElbL7PolicyFixedResponseConfigInsertHeadersConfigOutputReference | ElbL7PolicyFixedResponseConfigInsertHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    configs: {
      value: cdktf.listMapperHcl(elbL7PolicyFixedResponseConfigInsertHeadersConfigConfigsToHclTerraform, true)(struct!.configs),
      isBlock: true,
      type: "set",
      storageClassType: "ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyFixedResponseConfigInsertHeadersConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyFixedResponseConfigInsertHeadersConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._configs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.configs = this._configs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyFixedResponseConfigInsertHeadersConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._configs.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._configs.internalValue = value.configs;
    }
  }

  // configs - computed: false, optional: false, required: true
  private _configs = new ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigsList(this, "configs", true);
  public get configs() {
    return this._configs;
  }
  public putConfigs(value: ElbL7PolicyFixedResponseConfigInsertHeadersConfigConfigs[] | cdktf.IResolvable) {
    this._configs.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get configsInput() {
    return this._configs.internalValue;
  }
}
export interface ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#key ElbL7Policy#key}
  */
  readonly key: string;
}

export function elbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigsToTerraform(struct?: ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
  }
}


export function elbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigsToHclTerraform(struct?: ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigs | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._key = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._key = value.key;
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
}

export class ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigsList extends cdktf.ComplexList {
  public internalValue? : ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigs[] | cdktf.IResolvable

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
  public get(index: number): ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigsOutputReference {
    return new ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ElbL7PolicyFixedResponseConfigRemoveHeadersConfig {
  /**
  * configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#configs ElbL7Policy#configs}
  */
  readonly configs: ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigs[] | cdktf.IResolvable;
}

export function elbL7PolicyFixedResponseConfigRemoveHeadersConfigToTerraform(struct?: ElbL7PolicyFixedResponseConfigRemoveHeadersConfigOutputReference | ElbL7PolicyFixedResponseConfigRemoveHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    configs: cdktf.listMapper(elbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigsToTerraform, true)(struct!.configs),
  }
}


export function elbL7PolicyFixedResponseConfigRemoveHeadersConfigToHclTerraform(struct?: ElbL7PolicyFixedResponseConfigRemoveHeadersConfigOutputReference | ElbL7PolicyFixedResponseConfigRemoveHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    configs: {
      value: cdktf.listMapperHcl(elbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigsToHclTerraform, true)(struct!.configs),
      isBlock: true,
      type: "set",
      storageClassType: "ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyFixedResponseConfigRemoveHeadersConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyFixedResponseConfigRemoveHeadersConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._configs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.configs = this._configs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyFixedResponseConfigRemoveHeadersConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._configs.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._configs.internalValue = value.configs;
    }
  }

  // configs - computed: false, optional: false, required: true
  private _configs = new ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigsList(this, "configs", true);
  public get configs() {
    return this._configs;
  }
  public putConfigs(value: ElbL7PolicyFixedResponseConfigRemoveHeadersConfigConfigs[] | cdktf.IResolvable) {
    this._configs.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get configsInput() {
    return this._configs.internalValue;
  }
}
export interface ElbL7PolicyFixedResponseConfigTrafficLimitConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#burst ElbL7Policy#burst}
  */
  readonly burst?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#per_source_ip_qps ElbL7Policy#per_source_ip_qps}
  */
  readonly perSourceIpQps?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#qps ElbL7Policy#qps}
  */
  readonly qps?: number;
}

export function elbL7PolicyFixedResponseConfigTrafficLimitConfigToTerraform(struct?: ElbL7PolicyFixedResponseConfigTrafficLimitConfigOutputReference | ElbL7PolicyFixedResponseConfigTrafficLimitConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    burst: cdktf.numberToTerraform(struct!.burst),
    per_source_ip_qps: cdktf.numberToTerraform(struct!.perSourceIpQps),
    qps: cdktf.numberToTerraform(struct!.qps),
  }
}


export function elbL7PolicyFixedResponseConfigTrafficLimitConfigToHclTerraform(struct?: ElbL7PolicyFixedResponseConfigTrafficLimitConfigOutputReference | ElbL7PolicyFixedResponseConfigTrafficLimitConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    burst: {
      value: cdktf.numberToHclTerraform(struct!.burst),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    per_source_ip_qps: {
      value: cdktf.numberToHclTerraform(struct!.perSourceIpQps),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
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

export class ElbL7PolicyFixedResponseConfigTrafficLimitConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyFixedResponseConfigTrafficLimitConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._burst !== undefined) {
      hasAnyValues = true;
      internalValueResult.burst = this._burst;
    }
    if (this._perSourceIpQps !== undefined) {
      hasAnyValues = true;
      internalValueResult.perSourceIpQps = this._perSourceIpQps;
    }
    if (this._qps !== undefined) {
      hasAnyValues = true;
      internalValueResult.qps = this._qps;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyFixedResponseConfigTrafficLimitConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._burst = undefined;
      this._perSourceIpQps = undefined;
      this._qps = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._burst = value.burst;
      this._perSourceIpQps = value.perSourceIpQps;
      this._qps = value.qps;
    }
  }

  // burst - computed: false, optional: true, required: false
  private _burst?: number; 
  public get burst() {
    return this.getNumberAttribute('burst');
  }
  public set burst(value: number) {
    this._burst = value;
  }
  public resetBurst() {
    this._burst = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get burstInput() {
    return this._burst;
  }

  // per_source_ip_qps - computed: false, optional: true, required: false
  private _perSourceIpQps?: number; 
  public get perSourceIpQps() {
    return this.getNumberAttribute('per_source_ip_qps');
  }
  public set perSourceIpQps(value: number) {
    this._perSourceIpQps = value;
  }
  public resetPerSourceIpQps() {
    this._perSourceIpQps = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get perSourceIpQpsInput() {
    return this._perSourceIpQps;
  }

  // qps - computed: false, optional: true, required: false
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
export interface ElbL7PolicyFixedResponseConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#content_type ElbL7Policy#content_type}
  */
  readonly contentType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#message_body ElbL7Policy#message_body}
  */
  readonly messageBody?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#status_code ElbL7Policy#status_code}
  */
  readonly statusCode: string;
  /**
  * insert_headers_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#insert_headers_config ElbL7Policy#insert_headers_config}
  */
  readonly insertHeadersConfig?: ElbL7PolicyFixedResponseConfigInsertHeadersConfig;
  /**
  * remove_headers_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#remove_headers_config ElbL7Policy#remove_headers_config}
  */
  readonly removeHeadersConfig?: ElbL7PolicyFixedResponseConfigRemoveHeadersConfig;
  /**
  * traffic_limit_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#traffic_limit_config ElbL7Policy#traffic_limit_config}
  */
  readonly trafficLimitConfig?: ElbL7PolicyFixedResponseConfigTrafficLimitConfig;
}

export function elbL7PolicyFixedResponseConfigToTerraform(struct?: ElbL7PolicyFixedResponseConfigOutputReference | ElbL7PolicyFixedResponseConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    content_type: cdktf.stringToTerraform(struct!.contentType),
    message_body: cdktf.stringToTerraform(struct!.messageBody),
    status_code: cdktf.stringToTerraform(struct!.statusCode),
    insert_headers_config: elbL7PolicyFixedResponseConfigInsertHeadersConfigToTerraform(struct!.insertHeadersConfig),
    remove_headers_config: elbL7PolicyFixedResponseConfigRemoveHeadersConfigToTerraform(struct!.removeHeadersConfig),
    traffic_limit_config: elbL7PolicyFixedResponseConfigTrafficLimitConfigToTerraform(struct!.trafficLimitConfig),
  }
}


export function elbL7PolicyFixedResponseConfigToHclTerraform(struct?: ElbL7PolicyFixedResponseConfigOutputReference | ElbL7PolicyFixedResponseConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    content_type: {
      value: cdktf.stringToHclTerraform(struct!.contentType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    message_body: {
      value: cdktf.stringToHclTerraform(struct!.messageBody),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    status_code: {
      value: cdktf.stringToHclTerraform(struct!.statusCode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    insert_headers_config: {
      value: elbL7PolicyFixedResponseConfigInsertHeadersConfigToHclTerraform(struct!.insertHeadersConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ElbL7PolicyFixedResponseConfigInsertHeadersConfigList",
    },
    remove_headers_config: {
      value: elbL7PolicyFixedResponseConfigRemoveHeadersConfigToHclTerraform(struct!.removeHeadersConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ElbL7PolicyFixedResponseConfigRemoveHeadersConfigList",
    },
    traffic_limit_config: {
      value: elbL7PolicyFixedResponseConfigTrafficLimitConfigToHclTerraform(struct!.trafficLimitConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ElbL7PolicyFixedResponseConfigTrafficLimitConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyFixedResponseConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyFixedResponseConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._contentType !== undefined) {
      hasAnyValues = true;
      internalValueResult.contentType = this._contentType;
    }
    if (this._messageBody !== undefined) {
      hasAnyValues = true;
      internalValueResult.messageBody = this._messageBody;
    }
    if (this._statusCode !== undefined) {
      hasAnyValues = true;
      internalValueResult.statusCode = this._statusCode;
    }
    if (this._insertHeadersConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.insertHeadersConfig = this._insertHeadersConfig?.internalValue;
    }
    if (this._removeHeadersConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.removeHeadersConfig = this._removeHeadersConfig?.internalValue;
    }
    if (this._trafficLimitConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.trafficLimitConfig = this._trafficLimitConfig?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyFixedResponseConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._contentType = undefined;
      this._messageBody = undefined;
      this._statusCode = undefined;
      this._insertHeadersConfig.internalValue = undefined;
      this._removeHeadersConfig.internalValue = undefined;
      this._trafficLimitConfig.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._contentType = value.contentType;
      this._messageBody = value.messageBody;
      this._statusCode = value.statusCode;
      this._insertHeadersConfig.internalValue = value.insertHeadersConfig;
      this._removeHeadersConfig.internalValue = value.removeHeadersConfig;
      this._trafficLimitConfig.internalValue = value.trafficLimitConfig;
    }
  }

  // content_type - computed: true, optional: true, required: false
  private _contentType?: string; 
  public get contentType() {
    return this.getStringAttribute('content_type');
  }
  public set contentType(value: string) {
    this._contentType = value;
  }
  public resetContentType() {
    this._contentType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contentTypeInput() {
    return this._contentType;
  }

  // message_body - computed: false, optional: true, required: false
  private _messageBody?: string; 
  public get messageBody() {
    return this.getStringAttribute('message_body');
  }
  public set messageBody(value: string) {
    this._messageBody = value;
  }
  public resetMessageBody() {
    this._messageBody = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get messageBodyInput() {
    return this._messageBody;
  }

  // status_code - computed: false, optional: false, required: true
  private _statusCode?: string; 
  public get statusCode() {
    return this.getStringAttribute('status_code');
  }
  public set statusCode(value: string) {
    this._statusCode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get statusCodeInput() {
    return this._statusCode;
  }

  // insert_headers_config - computed: false, optional: true, required: false
  private _insertHeadersConfig = new ElbL7PolicyFixedResponseConfigInsertHeadersConfigOutputReference(this, "insert_headers_config");
  public get insertHeadersConfig() {
    return this._insertHeadersConfig;
  }
  public putInsertHeadersConfig(value: ElbL7PolicyFixedResponseConfigInsertHeadersConfig) {
    this._insertHeadersConfig.internalValue = value;
  }
  public resetInsertHeadersConfig() {
    this._insertHeadersConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get insertHeadersConfigInput() {
    return this._insertHeadersConfig.internalValue;
  }

  // remove_headers_config - computed: false, optional: true, required: false
  private _removeHeadersConfig = new ElbL7PolicyFixedResponseConfigRemoveHeadersConfigOutputReference(this, "remove_headers_config");
  public get removeHeadersConfig() {
    return this._removeHeadersConfig;
  }
  public putRemoveHeadersConfig(value: ElbL7PolicyFixedResponseConfigRemoveHeadersConfig) {
    this._removeHeadersConfig.internalValue = value;
  }
  public resetRemoveHeadersConfig() {
    this._removeHeadersConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get removeHeadersConfigInput() {
    return this._removeHeadersConfig.internalValue;
  }

  // traffic_limit_config - computed: false, optional: true, required: false
  private _trafficLimitConfig = new ElbL7PolicyFixedResponseConfigTrafficLimitConfigOutputReference(this, "traffic_limit_config");
  public get trafficLimitConfig() {
    return this._trafficLimitConfig;
  }
  public putTrafficLimitConfig(value: ElbL7PolicyFixedResponseConfigTrafficLimitConfig) {
    this._trafficLimitConfig.internalValue = value;
  }
  public resetTrafficLimitConfig() {
    this._trafficLimitConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trafficLimitConfigInput() {
    return this._trafficLimitConfig.internalValue;
  }
}
export interface ElbL7PolicyRedirectPoolsConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#pool_id ElbL7Policy#pool_id}
  */
  readonly poolId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#weight ElbL7Policy#weight}
  */
  readonly weight?: number;
}

export function elbL7PolicyRedirectPoolsConfigToTerraform(struct?: ElbL7PolicyRedirectPoolsConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    pool_id: cdktf.stringToTerraform(struct!.poolId),
    weight: cdktf.numberToTerraform(struct!.weight),
  }
}


export function elbL7PolicyRedirectPoolsConfigToHclTerraform(struct?: ElbL7PolicyRedirectPoolsConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    pool_id: {
      value: cdktf.stringToHclTerraform(struct!.poolId),
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

export class ElbL7PolicyRedirectPoolsConfigOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ElbL7PolicyRedirectPoolsConfig | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._poolId !== undefined) {
      hasAnyValues = true;
      internalValueResult.poolId = this._poolId;
    }
    if (this._weight !== undefined) {
      hasAnyValues = true;
      internalValueResult.weight = this._weight;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectPoolsConfig | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._poolId = undefined;
      this._weight = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._poolId = value.poolId;
      this._weight = value.weight;
    }
  }

  // pool_id - computed: false, optional: false, required: true
  private _poolId?: string; 
  public get poolId() {
    return this.getStringAttribute('pool_id');
  }
  public set poolId(value: string) {
    this._poolId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get poolIdInput() {
    return this._poolId;
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

export class ElbL7PolicyRedirectPoolsConfigList extends cdktf.ComplexList {
  public internalValue? : ElbL7PolicyRedirectPoolsConfig[] | cdktf.IResolvable

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
  public get(index: number): ElbL7PolicyRedirectPoolsConfigOutputReference {
    return new ElbL7PolicyRedirectPoolsConfigOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#key ElbL7Policy#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#value ElbL7Policy#value}
  */
  readonly value: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#value_type ElbL7Policy#value_type}
  */
  readonly valueType: string;
}

export function elbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigsToTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
    value: cdktf.stringToTerraform(struct!.value),
    value_type: cdktf.stringToTerraform(struct!.valueType),
  }
}


export function elbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigsToHclTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigs | cdktf.IResolvable): any {
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
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value_type: {
      value: cdktf.stringToHclTerraform(struct!.valueType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    if (this._valueType !== undefined) {
      hasAnyValues = true;
      internalValueResult.valueType = this._valueType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._key = undefined;
      this._value = undefined;
      this._valueType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._key = value.key;
      this._value = value.value;
      this._valueType = value.valueType;
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

  // value_type - computed: false, optional: false, required: true
  private _valueType?: string; 
  public get valueType() {
    return this.getStringAttribute('value_type');
  }
  public set valueType(value: string) {
    this._valueType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueTypeInput() {
    return this._valueType;
  }
}

export class ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigsList extends cdktf.ComplexList {
  public internalValue? : ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigs[] | cdktf.IResolvable

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
  public get(index: number): ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigsOutputReference {
    return new ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfig {
  /**
  * configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#configs ElbL7Policy#configs}
  */
  readonly configs: ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigs[] | cdktf.IResolvable;
}

export function elbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigToTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigOutputReference | ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    configs: cdktf.listMapper(elbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigsToTerraform, true)(struct!.configs),
  }
}


export function elbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigToHclTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigOutputReference | ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    configs: {
      value: cdktf.listMapperHcl(elbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigsToHclTerraform, true)(struct!.configs),
      isBlock: true,
      type: "set",
      storageClassType: "ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._configs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.configs = this._configs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._configs.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._configs.internalValue = value.configs;
    }
  }

  // configs - computed: false, optional: false, required: true
  private _configs = new ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigsList(this, "configs", true);
  public get configs() {
    return this._configs;
  }
  public putConfigs(value: ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigConfigs[] | cdktf.IResolvable) {
    this._configs.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get configsInput() {
    return this._configs.internalValue;
  }
}
export interface ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#key ElbL7Policy#key}
  */
  readonly key: string;
}

export function elbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigsToTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
  }
}


export function elbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigsToHclTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigs | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._key = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._key = value.key;
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
}

export class ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigsList extends cdktf.ComplexList {
  public internalValue? : ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigs[] | cdktf.IResolvable

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
  public get(index: number): ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigsOutputReference {
    return new ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfig {
  /**
  * configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#configs ElbL7Policy#configs}
  */
  readonly configs: ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigs[] | cdktf.IResolvable;
}

export function elbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigToTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigOutputReference | ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    configs: cdktf.listMapper(elbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigsToTerraform, true)(struct!.configs),
  }
}


export function elbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigToHclTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigOutputReference | ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    configs: {
      value: cdktf.listMapperHcl(elbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigsToHclTerraform, true)(struct!.configs),
      isBlock: true,
      type: "set",
      storageClassType: "ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._configs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.configs = this._configs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._configs.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._configs.internalValue = value.configs;
    }
  }

  // configs - computed: false, optional: false, required: true
  private _configs = new ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigsList(this, "configs", true);
  public get configs() {
    return this._configs;
  }
  public putConfigs(value: ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigConfigs[] | cdktf.IResolvable) {
    this._configs.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get configsInput() {
    return this._configs.internalValue;
  }
}
export interface ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#host ElbL7Policy#host}
  */
  readonly host?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#path ElbL7Policy#path}
  */
  readonly path?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#query ElbL7Policy#query}
  */
  readonly query?: string;
}

export function elbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfigToTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfigOutputReference | ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    host: cdktf.stringToTerraform(struct!.host),
    path: cdktf.stringToTerraform(struct!.path),
    query: cdktf.stringToTerraform(struct!.query),
  }
}


export function elbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfigToHclTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfigOutputReference | ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    host: {
      value: cdktf.stringToHclTerraform(struct!.host),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    path: {
      value: cdktf.stringToHclTerraform(struct!.path),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    query: {
      value: cdktf.stringToHclTerraform(struct!.query),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._host !== undefined) {
      hasAnyValues = true;
      internalValueResult.host = this._host;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._query !== undefined) {
      hasAnyValues = true;
      internalValueResult.query = this._query;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._host = undefined;
      this._path = undefined;
      this._query = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._host = value.host;
      this._path = value.path;
      this._query = value.query;
    }
  }

  // host - computed: true, optional: true, required: false
  private _host?: string; 
  public get host() {
    return this.getStringAttribute('host');
  }
  public set host(value: string) {
    this._host = value;
  }
  public resetHost() {
    this._host = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostInput() {
    return this._host;
  }

  // path - computed: true, optional: true, required: false
  private _path?: string; 
  public get path() {
    return this.getStringAttribute('path');
  }
  public set path(value: string) {
    this._path = value;
  }
  public resetPath() {
    this._path = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pathInput() {
    return this._path;
  }

  // query - computed: false, optional: true, required: false
  private _query?: string; 
  public get query() {
    return this.getStringAttribute('query');
  }
  public set query(value: string) {
    this._query = value;
  }
  public resetQuery() {
    this._query = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queryInput() {
    return this._query;
  }
}
export interface ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#burst ElbL7Policy#burst}
  */
  readonly burst?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#per_source_ip_qps ElbL7Policy#per_source_ip_qps}
  */
  readonly perSourceIpQps?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#qps ElbL7Policy#qps}
  */
  readonly qps?: number;
}

export function elbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfigToTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfigOutputReference | ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    burst: cdktf.numberToTerraform(struct!.burst),
    per_source_ip_qps: cdktf.numberToTerraform(struct!.perSourceIpQps),
    qps: cdktf.numberToTerraform(struct!.qps),
  }
}


export function elbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfigToHclTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfigOutputReference | ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    burst: {
      value: cdktf.numberToHclTerraform(struct!.burst),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    per_source_ip_qps: {
      value: cdktf.numberToHclTerraform(struct!.perSourceIpQps),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
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

export class ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._burst !== undefined) {
      hasAnyValues = true;
      internalValueResult.burst = this._burst;
    }
    if (this._perSourceIpQps !== undefined) {
      hasAnyValues = true;
      internalValueResult.perSourceIpQps = this._perSourceIpQps;
    }
    if (this._qps !== undefined) {
      hasAnyValues = true;
      internalValueResult.qps = this._qps;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._burst = undefined;
      this._perSourceIpQps = undefined;
      this._qps = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._burst = value.burst;
      this._perSourceIpQps = value.perSourceIpQps;
      this._qps = value.qps;
    }
  }

  // burst - computed: false, optional: true, required: false
  private _burst?: number; 
  public get burst() {
    return this.getNumberAttribute('burst');
  }
  public set burst(value: number) {
    this._burst = value;
  }
  public resetBurst() {
    this._burst = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get burstInput() {
    return this._burst;
  }

  // per_source_ip_qps - computed: false, optional: true, required: false
  private _perSourceIpQps?: number; 
  public get perSourceIpQps() {
    return this.getNumberAttribute('per_source_ip_qps');
  }
  public set perSourceIpQps(value: number) {
    this._perSourceIpQps = value;
  }
  public resetPerSourceIpQps() {
    this._perSourceIpQps = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get perSourceIpQpsInput() {
    return this._perSourceIpQps;
  }

  // qps - computed: false, optional: true, required: false
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
export interface ElbL7PolicyRedirectPoolsExtendConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#rewrite_url_enabled ElbL7Policy#rewrite_url_enabled}
  */
  readonly rewriteUrlEnabled?: boolean | cdktf.IResolvable;
  /**
  * insert_headers_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#insert_headers_config ElbL7Policy#insert_headers_config}
  */
  readonly insertHeadersConfig?: ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfig;
  /**
  * remove_headers_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#remove_headers_config ElbL7Policy#remove_headers_config}
  */
  readonly removeHeadersConfig?: ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfig;
  /**
  * rewrite_url_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#rewrite_url_config ElbL7Policy#rewrite_url_config}
  */
  readonly rewriteUrlConfig?: ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfig;
  /**
  * traffic_limit_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#traffic_limit_config ElbL7Policy#traffic_limit_config}
  */
  readonly trafficLimitConfig?: ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfig;
}

export function elbL7PolicyRedirectPoolsExtendConfigToTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigOutputReference | ElbL7PolicyRedirectPoolsExtendConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    rewrite_url_enabled: cdktf.booleanToTerraform(struct!.rewriteUrlEnabled),
    insert_headers_config: elbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigToTerraform(struct!.insertHeadersConfig),
    remove_headers_config: elbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigToTerraform(struct!.removeHeadersConfig),
    rewrite_url_config: elbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfigToTerraform(struct!.rewriteUrlConfig),
    traffic_limit_config: elbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfigToTerraform(struct!.trafficLimitConfig),
  }
}


export function elbL7PolicyRedirectPoolsExtendConfigToHclTerraform(struct?: ElbL7PolicyRedirectPoolsExtendConfigOutputReference | ElbL7PolicyRedirectPoolsExtendConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    rewrite_url_enabled: {
      value: cdktf.booleanToHclTerraform(struct!.rewriteUrlEnabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    insert_headers_config: {
      value: elbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigToHclTerraform(struct!.insertHeadersConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigList",
    },
    remove_headers_config: {
      value: elbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigToHclTerraform(struct!.removeHeadersConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigList",
    },
    rewrite_url_config: {
      value: elbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfigToHclTerraform(struct!.rewriteUrlConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfigList",
    },
    traffic_limit_config: {
      value: elbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfigToHclTerraform(struct!.trafficLimitConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectPoolsExtendConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyRedirectPoolsExtendConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._rewriteUrlEnabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.rewriteUrlEnabled = this._rewriteUrlEnabled;
    }
    if (this._insertHeadersConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.insertHeadersConfig = this._insertHeadersConfig?.internalValue;
    }
    if (this._removeHeadersConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.removeHeadersConfig = this._removeHeadersConfig?.internalValue;
    }
    if (this._rewriteUrlConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.rewriteUrlConfig = this._rewriteUrlConfig?.internalValue;
    }
    if (this._trafficLimitConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.trafficLimitConfig = this._trafficLimitConfig?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectPoolsExtendConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._rewriteUrlEnabled = undefined;
      this._insertHeadersConfig.internalValue = undefined;
      this._removeHeadersConfig.internalValue = undefined;
      this._rewriteUrlConfig.internalValue = undefined;
      this._trafficLimitConfig.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._rewriteUrlEnabled = value.rewriteUrlEnabled;
      this._insertHeadersConfig.internalValue = value.insertHeadersConfig;
      this._removeHeadersConfig.internalValue = value.removeHeadersConfig;
      this._rewriteUrlConfig.internalValue = value.rewriteUrlConfig;
      this._trafficLimitConfig.internalValue = value.trafficLimitConfig;
    }
  }

  // rewrite_url_enabled - computed: true, optional: true, required: false
  private _rewriteUrlEnabled?: boolean | cdktf.IResolvable; 
  public get rewriteUrlEnabled() {
    return this.getBooleanAttribute('rewrite_url_enabled');
  }
  public set rewriteUrlEnabled(value: boolean | cdktf.IResolvable) {
    this._rewriteUrlEnabled = value;
  }
  public resetRewriteUrlEnabled() {
    this._rewriteUrlEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rewriteUrlEnabledInput() {
    return this._rewriteUrlEnabled;
  }

  // insert_headers_config - computed: false, optional: true, required: false
  private _insertHeadersConfig = new ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfigOutputReference(this, "insert_headers_config");
  public get insertHeadersConfig() {
    return this._insertHeadersConfig;
  }
  public putInsertHeadersConfig(value: ElbL7PolicyRedirectPoolsExtendConfigInsertHeadersConfig) {
    this._insertHeadersConfig.internalValue = value;
  }
  public resetInsertHeadersConfig() {
    this._insertHeadersConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get insertHeadersConfigInput() {
    return this._insertHeadersConfig.internalValue;
  }

  // remove_headers_config - computed: false, optional: true, required: false
  private _removeHeadersConfig = new ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfigOutputReference(this, "remove_headers_config");
  public get removeHeadersConfig() {
    return this._removeHeadersConfig;
  }
  public putRemoveHeadersConfig(value: ElbL7PolicyRedirectPoolsExtendConfigRemoveHeadersConfig) {
    this._removeHeadersConfig.internalValue = value;
  }
  public resetRemoveHeadersConfig() {
    this._removeHeadersConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get removeHeadersConfigInput() {
    return this._removeHeadersConfig.internalValue;
  }

  // rewrite_url_config - computed: false, optional: true, required: false
  private _rewriteUrlConfig = new ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfigOutputReference(this, "rewrite_url_config");
  public get rewriteUrlConfig() {
    return this._rewriteUrlConfig;
  }
  public putRewriteUrlConfig(value: ElbL7PolicyRedirectPoolsExtendConfigRewriteUrlConfig) {
    this._rewriteUrlConfig.internalValue = value;
  }
  public resetRewriteUrlConfig() {
    this._rewriteUrlConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rewriteUrlConfigInput() {
    return this._rewriteUrlConfig.internalValue;
  }

  // traffic_limit_config - computed: false, optional: true, required: false
  private _trafficLimitConfig = new ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfigOutputReference(this, "traffic_limit_config");
  public get trafficLimitConfig() {
    return this._trafficLimitConfig;
  }
  public putTrafficLimitConfig(value: ElbL7PolicyRedirectPoolsExtendConfigTrafficLimitConfig) {
    this._trafficLimitConfig.internalValue = value;
  }
  public resetTrafficLimitConfig() {
    this._trafficLimitConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trafficLimitConfigInput() {
    return this._trafficLimitConfig.internalValue;
  }
}
export interface ElbL7PolicyRedirectPoolsStickySessionConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#enable ElbL7Policy#enable}
  */
  readonly enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#timeout ElbL7Policy#timeout}
  */
  readonly timeout?: number;
}

export function elbL7PolicyRedirectPoolsStickySessionConfigToTerraform(struct?: ElbL7PolicyRedirectPoolsStickySessionConfigOutputReference | ElbL7PolicyRedirectPoolsStickySessionConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enable: cdktf.booleanToTerraform(struct!.enable),
    timeout: cdktf.numberToTerraform(struct!.timeout),
  }
}


export function elbL7PolicyRedirectPoolsStickySessionConfigToHclTerraform(struct?: ElbL7PolicyRedirectPoolsStickySessionConfigOutputReference | ElbL7PolicyRedirectPoolsStickySessionConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enable: {
      value: cdktf.booleanToHclTerraform(struct!.enable),
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

export class ElbL7PolicyRedirectPoolsStickySessionConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyRedirectPoolsStickySessionConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enable !== undefined) {
      hasAnyValues = true;
      internalValueResult.enable = this._enable;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectPoolsStickySessionConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enable = undefined;
      this._timeout = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enable = value.enable;
      this._timeout = value.timeout;
    }
  }

  // enable - computed: true, optional: true, required: false
  private _enable?: boolean | cdktf.IResolvable; 
  public get enable() {
    return this.getBooleanAttribute('enable');
  }
  public set enable(value: boolean | cdktf.IResolvable) {
    this._enable = value;
  }
  public resetEnable() {
    this._enable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableInput() {
    return this._enable;
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
export interface ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#key ElbL7Policy#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#value ElbL7Policy#value}
  */
  readonly value: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#value_type ElbL7Policy#value_type}
  */
  readonly valueType: string;
}

export function elbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigsToTerraform(struct?: ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
    value: cdktf.stringToTerraform(struct!.value),
    value_type: cdktf.stringToTerraform(struct!.valueType),
  }
}


export function elbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigsToHclTerraform(struct?: ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigs | cdktf.IResolvable): any {
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
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value_type: {
      value: cdktf.stringToHclTerraform(struct!.valueType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    if (this._valueType !== undefined) {
      hasAnyValues = true;
      internalValueResult.valueType = this._valueType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._key = undefined;
      this._value = undefined;
      this._valueType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._key = value.key;
      this._value = value.value;
      this._valueType = value.valueType;
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

  // value_type - computed: false, optional: false, required: true
  private _valueType?: string; 
  public get valueType() {
    return this.getStringAttribute('value_type');
  }
  public set valueType(value: string) {
    this._valueType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueTypeInput() {
    return this._valueType;
  }
}

export class ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigsList extends cdktf.ComplexList {
  public internalValue? : ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigs[] | cdktf.IResolvable

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
  public get(index: number): ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigsOutputReference {
    return new ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ElbL7PolicyRedirectUrlConfigInsertHeadersConfig {
  /**
  * configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#configs ElbL7Policy#configs}
  */
  readonly configs: ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigs[] | cdktf.IResolvable;
}

export function elbL7PolicyRedirectUrlConfigInsertHeadersConfigToTerraform(struct?: ElbL7PolicyRedirectUrlConfigInsertHeadersConfigOutputReference | ElbL7PolicyRedirectUrlConfigInsertHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    configs: cdktf.listMapper(elbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigsToTerraform, true)(struct!.configs),
  }
}


export function elbL7PolicyRedirectUrlConfigInsertHeadersConfigToHclTerraform(struct?: ElbL7PolicyRedirectUrlConfigInsertHeadersConfigOutputReference | ElbL7PolicyRedirectUrlConfigInsertHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    configs: {
      value: cdktf.listMapperHcl(elbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigsToHclTerraform, true)(struct!.configs),
      isBlock: true,
      type: "set",
      storageClassType: "ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectUrlConfigInsertHeadersConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyRedirectUrlConfigInsertHeadersConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._configs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.configs = this._configs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectUrlConfigInsertHeadersConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._configs.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._configs.internalValue = value.configs;
    }
  }

  // configs - computed: false, optional: false, required: true
  private _configs = new ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigsList(this, "configs", true);
  public get configs() {
    return this._configs;
  }
  public putConfigs(value: ElbL7PolicyRedirectUrlConfigInsertHeadersConfigConfigs[] | cdktf.IResolvable) {
    this._configs.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get configsInput() {
    return this._configs.internalValue;
  }
}
export interface ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#key ElbL7Policy#key}
  */
  readonly key: string;
}

export function elbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigsToTerraform(struct?: ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
  }
}


export function elbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigsToHclTerraform(struct?: ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigs | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._key = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._key = value.key;
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
}

export class ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigsList extends cdktf.ComplexList {
  public internalValue? : ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigs[] | cdktf.IResolvable

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
  public get(index: number): ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigsOutputReference {
    return new ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ElbL7PolicyRedirectUrlConfigRemoveHeadersConfig {
  /**
  * configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#configs ElbL7Policy#configs}
  */
  readonly configs: ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigs[] | cdktf.IResolvable;
}

export function elbL7PolicyRedirectUrlConfigRemoveHeadersConfigToTerraform(struct?: ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigOutputReference | ElbL7PolicyRedirectUrlConfigRemoveHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    configs: cdktf.listMapper(elbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigsToTerraform, true)(struct!.configs),
  }
}


export function elbL7PolicyRedirectUrlConfigRemoveHeadersConfigToHclTerraform(struct?: ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigOutputReference | ElbL7PolicyRedirectUrlConfigRemoveHeadersConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    configs: {
      value: cdktf.listMapperHcl(elbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigsToHclTerraform, true)(struct!.configs),
      isBlock: true,
      type: "set",
      storageClassType: "ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyRedirectUrlConfigRemoveHeadersConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._configs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.configs = this._configs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectUrlConfigRemoveHeadersConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._configs.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._configs.internalValue = value.configs;
    }
  }

  // configs - computed: false, optional: false, required: true
  private _configs = new ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigsList(this, "configs", true);
  public get configs() {
    return this._configs;
  }
  public putConfigs(value: ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigConfigs[] | cdktf.IResolvable) {
    this._configs.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get configsInput() {
    return this._configs.internalValue;
  }
}
export interface ElbL7PolicyRedirectUrlConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#host ElbL7Policy#host}
  */
  readonly host?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#path ElbL7Policy#path}
  */
  readonly path?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#port ElbL7Policy#port}
  */
  readonly port?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#protocol ElbL7Policy#protocol}
  */
  readonly protocol?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#query ElbL7Policy#query}
  */
  readonly query?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#status_code ElbL7Policy#status_code}
  */
  readonly statusCode: string;
  /**
  * insert_headers_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#insert_headers_config ElbL7Policy#insert_headers_config}
  */
  readonly insertHeadersConfig?: ElbL7PolicyRedirectUrlConfigInsertHeadersConfig;
  /**
  * remove_headers_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#remove_headers_config ElbL7Policy#remove_headers_config}
  */
  readonly removeHeadersConfig?: ElbL7PolicyRedirectUrlConfigRemoveHeadersConfig;
}

export function elbL7PolicyRedirectUrlConfigToTerraform(struct?: ElbL7PolicyRedirectUrlConfigOutputReference | ElbL7PolicyRedirectUrlConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    host: cdktf.stringToTerraform(struct!.host),
    path: cdktf.stringToTerraform(struct!.path),
    port: cdktf.stringToTerraform(struct!.port),
    protocol: cdktf.stringToTerraform(struct!.protocol),
    query: cdktf.stringToTerraform(struct!.query),
    status_code: cdktf.stringToTerraform(struct!.statusCode),
    insert_headers_config: elbL7PolicyRedirectUrlConfigInsertHeadersConfigToTerraform(struct!.insertHeadersConfig),
    remove_headers_config: elbL7PolicyRedirectUrlConfigRemoveHeadersConfigToTerraform(struct!.removeHeadersConfig),
  }
}


export function elbL7PolicyRedirectUrlConfigToHclTerraform(struct?: ElbL7PolicyRedirectUrlConfigOutputReference | ElbL7PolicyRedirectUrlConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    host: {
      value: cdktf.stringToHclTerraform(struct!.host),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    path: {
      value: cdktf.stringToHclTerraform(struct!.path),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    port: {
      value: cdktf.stringToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    protocol: {
      value: cdktf.stringToHclTerraform(struct!.protocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    query: {
      value: cdktf.stringToHclTerraform(struct!.query),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    status_code: {
      value: cdktf.stringToHclTerraform(struct!.statusCode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    insert_headers_config: {
      value: elbL7PolicyRedirectUrlConfigInsertHeadersConfigToHclTerraform(struct!.insertHeadersConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ElbL7PolicyRedirectUrlConfigInsertHeadersConfigList",
    },
    remove_headers_config: {
      value: elbL7PolicyRedirectUrlConfigRemoveHeadersConfigToHclTerraform(struct!.removeHeadersConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbL7PolicyRedirectUrlConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ElbL7PolicyRedirectUrlConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._host !== undefined) {
      hasAnyValues = true;
      internalValueResult.host = this._host;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    if (this._query !== undefined) {
      hasAnyValues = true;
      internalValueResult.query = this._query;
    }
    if (this._statusCode !== undefined) {
      hasAnyValues = true;
      internalValueResult.statusCode = this._statusCode;
    }
    if (this._insertHeadersConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.insertHeadersConfig = this._insertHeadersConfig?.internalValue;
    }
    if (this._removeHeadersConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.removeHeadersConfig = this._removeHeadersConfig?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbL7PolicyRedirectUrlConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._host = undefined;
      this._path = undefined;
      this._port = undefined;
      this._protocol = undefined;
      this._query = undefined;
      this._statusCode = undefined;
      this._insertHeadersConfig.internalValue = undefined;
      this._removeHeadersConfig.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._host = value.host;
      this._path = value.path;
      this._port = value.port;
      this._protocol = value.protocol;
      this._query = value.query;
      this._statusCode = value.statusCode;
      this._insertHeadersConfig.internalValue = value.insertHeadersConfig;
      this._removeHeadersConfig.internalValue = value.removeHeadersConfig;
    }
  }

  // host - computed: true, optional: true, required: false
  private _host?: string; 
  public get host() {
    return this.getStringAttribute('host');
  }
  public set host(value: string) {
    this._host = value;
  }
  public resetHost() {
    this._host = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostInput() {
    return this._host;
  }

  // path - computed: true, optional: true, required: false
  private _path?: string; 
  public get path() {
    return this.getStringAttribute('path');
  }
  public set path(value: string) {
    this._path = value;
  }
  public resetPath() {
    this._path = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pathInput() {
    return this._path;
  }

  // port - computed: true, optional: true, required: false
  private _port?: string; 
  public get port() {
    return this.getStringAttribute('port');
  }
  public set port(value: string) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }

  // protocol - computed: true, optional: true, required: false
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  public resetProtocol() {
    this._protocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }

  // query - computed: false, optional: true, required: false
  private _query?: string; 
  public get query() {
    return this.getStringAttribute('query');
  }
  public set query(value: string) {
    this._query = value;
  }
  public resetQuery() {
    this._query = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queryInput() {
    return this._query;
  }

  // status_code - computed: false, optional: false, required: true
  private _statusCode?: string; 
  public get statusCode() {
    return this.getStringAttribute('status_code');
  }
  public set statusCode(value: string) {
    this._statusCode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get statusCodeInput() {
    return this._statusCode;
  }

  // insert_headers_config - computed: false, optional: true, required: false
  private _insertHeadersConfig = new ElbL7PolicyRedirectUrlConfigInsertHeadersConfigOutputReference(this, "insert_headers_config");
  public get insertHeadersConfig() {
    return this._insertHeadersConfig;
  }
  public putInsertHeadersConfig(value: ElbL7PolicyRedirectUrlConfigInsertHeadersConfig) {
    this._insertHeadersConfig.internalValue = value;
  }
  public resetInsertHeadersConfig() {
    this._insertHeadersConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get insertHeadersConfigInput() {
    return this._insertHeadersConfig.internalValue;
  }

  // remove_headers_config - computed: false, optional: true, required: false
  private _removeHeadersConfig = new ElbL7PolicyRedirectUrlConfigRemoveHeadersConfigOutputReference(this, "remove_headers_config");
  public get removeHeadersConfig() {
    return this._removeHeadersConfig;
  }
  public putRemoveHeadersConfig(value: ElbL7PolicyRedirectUrlConfigRemoveHeadersConfig) {
    this._removeHeadersConfig.internalValue = value;
  }
  public resetRemoveHeadersConfig() {
    this._removeHeadersConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get removeHeadersConfigInput() {
    return this._removeHeadersConfig.internalValue;
  }
}
export interface ElbL7PolicyTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#create ElbL7Policy#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#delete ElbL7Policy#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#update ElbL7Policy#update}
  */
  readonly update?: string;
}

export function elbL7PolicyTimeoutsToTerraform(struct?: ElbL7PolicyTimeouts | cdktf.IResolvable): any {
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


export function elbL7PolicyTimeoutsToHclTerraform(struct?: ElbL7PolicyTimeouts | cdktf.IResolvable): any {
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

export class ElbL7PolicyTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): ElbL7PolicyTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: ElbL7PolicyTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy huaweicloud_elb_l7policy}
*/
export class ElbL7Policy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_elb_l7policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ElbL7Policy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ElbL7Policy to import
  * @param importFromId The id of the existing ElbL7Policy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ElbL7Policy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_elb_l7policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_l7policy huaweicloud_elb_l7policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ElbL7PolicyConfig
  */
  public constructor(scope: Construct, id: string, config: ElbL7PolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_elb_l7policy',
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
    this._action = config.action;
    this._description = config.description;
    this._id = config.id;
    this._listenerId = config.listenerId;
    this._name = config.name;
    this._priority = config.priority;
    this._redirectListenerId = config.redirectListenerId;
    this._redirectPoolId = config.redirectPoolId;
    this._region = config.region;
    this._fixedResponseConfig.internalValue = config.fixedResponseConfig;
    this._redirectPoolsConfig.internalValue = config.redirectPoolsConfig;
    this._redirectPoolsExtendConfig.internalValue = config.redirectPoolsExtendConfig;
    this._redirectPoolsStickySessionConfig.internalValue = config.redirectPoolsStickySessionConfig;
    this._redirectUrlConfig.internalValue = config.redirectUrlConfig;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // action - computed: false, optional: true, required: false
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  public resetAction() {
    this._action = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
  }

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

  // listener_id - computed: false, optional: false, required: true
  private _listenerId?: string; 
  public get listenerId() {
    return this.getStringAttribute('listener_id');
  }
  public set listenerId(value: string) {
    this._listenerId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get listenerIdInput() {
    return this._listenerId;
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

  // provisioning_status - computed: true, optional: false, required: false
  public get provisioningStatus() {
    return this.getStringAttribute('provisioning_status');
  }

  // redirect_listener_id - computed: true, optional: true, required: false
  private _redirectListenerId?: string; 
  public get redirectListenerId() {
    return this.getStringAttribute('redirect_listener_id');
  }
  public set redirectListenerId(value: string) {
    this._redirectListenerId = value;
  }
  public resetRedirectListenerId() {
    this._redirectListenerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redirectListenerIdInput() {
    return this._redirectListenerId;
  }

  // redirect_pool_id - computed: true, optional: true, required: false
  private _redirectPoolId?: string; 
  public get redirectPoolId() {
    return this.getStringAttribute('redirect_pool_id');
  }
  public set redirectPoolId(value: string) {
    this._redirectPoolId = value;
  }
  public resetRedirectPoolId() {
    this._redirectPoolId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redirectPoolIdInput() {
    return this._redirectPoolId;
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

  // fixed_response_config - computed: false, optional: true, required: false
  private _fixedResponseConfig = new ElbL7PolicyFixedResponseConfigOutputReference(this, "fixed_response_config");
  public get fixedResponseConfig() {
    return this._fixedResponseConfig;
  }
  public putFixedResponseConfig(value: ElbL7PolicyFixedResponseConfig) {
    this._fixedResponseConfig.internalValue = value;
  }
  public resetFixedResponseConfig() {
    this._fixedResponseConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fixedResponseConfigInput() {
    return this._fixedResponseConfig.internalValue;
  }

  // redirect_pools_config - computed: false, optional: true, required: false
  private _redirectPoolsConfig = new ElbL7PolicyRedirectPoolsConfigList(this, "redirect_pools_config", true);
  public get redirectPoolsConfig() {
    return this._redirectPoolsConfig;
  }
  public putRedirectPoolsConfig(value: ElbL7PolicyRedirectPoolsConfig[] | cdktf.IResolvable) {
    this._redirectPoolsConfig.internalValue = value;
  }
  public resetRedirectPoolsConfig() {
    this._redirectPoolsConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redirectPoolsConfigInput() {
    return this._redirectPoolsConfig.internalValue;
  }

  // redirect_pools_extend_config - computed: false, optional: true, required: false
  private _redirectPoolsExtendConfig = new ElbL7PolicyRedirectPoolsExtendConfigOutputReference(this, "redirect_pools_extend_config");
  public get redirectPoolsExtendConfig() {
    return this._redirectPoolsExtendConfig;
  }
  public putRedirectPoolsExtendConfig(value: ElbL7PolicyRedirectPoolsExtendConfig) {
    this._redirectPoolsExtendConfig.internalValue = value;
  }
  public resetRedirectPoolsExtendConfig() {
    this._redirectPoolsExtendConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redirectPoolsExtendConfigInput() {
    return this._redirectPoolsExtendConfig.internalValue;
  }

  // redirect_pools_sticky_session_config - computed: false, optional: true, required: false
  private _redirectPoolsStickySessionConfig = new ElbL7PolicyRedirectPoolsStickySessionConfigOutputReference(this, "redirect_pools_sticky_session_config");
  public get redirectPoolsStickySessionConfig() {
    return this._redirectPoolsStickySessionConfig;
  }
  public putRedirectPoolsStickySessionConfig(value: ElbL7PolicyRedirectPoolsStickySessionConfig) {
    this._redirectPoolsStickySessionConfig.internalValue = value;
  }
  public resetRedirectPoolsStickySessionConfig() {
    this._redirectPoolsStickySessionConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redirectPoolsStickySessionConfigInput() {
    return this._redirectPoolsStickySessionConfig.internalValue;
  }

  // redirect_url_config - computed: false, optional: true, required: false
  private _redirectUrlConfig = new ElbL7PolicyRedirectUrlConfigOutputReference(this, "redirect_url_config");
  public get redirectUrlConfig() {
    return this._redirectUrlConfig;
  }
  public putRedirectUrlConfig(value: ElbL7PolicyRedirectUrlConfig) {
    this._redirectUrlConfig.internalValue = value;
  }
  public resetRedirectUrlConfig() {
    this._redirectUrlConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redirectUrlConfigInput() {
    return this._redirectUrlConfig.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new ElbL7PolicyTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: ElbL7PolicyTimeouts) {
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
      action: cdktf.stringToTerraform(this._action),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      listener_id: cdktf.stringToTerraform(this._listenerId),
      name: cdktf.stringToTerraform(this._name),
      priority: cdktf.numberToTerraform(this._priority),
      redirect_listener_id: cdktf.stringToTerraform(this._redirectListenerId),
      redirect_pool_id: cdktf.stringToTerraform(this._redirectPoolId),
      region: cdktf.stringToTerraform(this._region),
      fixed_response_config: elbL7PolicyFixedResponseConfigToTerraform(this._fixedResponseConfig.internalValue),
      redirect_pools_config: cdktf.listMapper(elbL7PolicyRedirectPoolsConfigToTerraform, true)(this._redirectPoolsConfig.internalValue),
      redirect_pools_extend_config: elbL7PolicyRedirectPoolsExtendConfigToTerraform(this._redirectPoolsExtendConfig.internalValue),
      redirect_pools_sticky_session_config: elbL7PolicyRedirectPoolsStickySessionConfigToTerraform(this._redirectPoolsStickySessionConfig.internalValue),
      redirect_url_config: elbL7PolicyRedirectUrlConfigToTerraform(this._redirectUrlConfig.internalValue),
      timeouts: elbL7PolicyTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      action: {
        value: cdktf.stringToHclTerraform(this._action),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      listener_id: {
        value: cdktf.stringToHclTerraform(this._listenerId),
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
      priority: {
        value: cdktf.numberToHclTerraform(this._priority),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      redirect_listener_id: {
        value: cdktf.stringToHclTerraform(this._redirectListenerId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      redirect_pool_id: {
        value: cdktf.stringToHclTerraform(this._redirectPoolId),
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
      fixed_response_config: {
        value: elbL7PolicyFixedResponseConfigToHclTerraform(this._fixedResponseConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ElbL7PolicyFixedResponseConfigList",
      },
      redirect_pools_config: {
        value: cdktf.listMapperHcl(elbL7PolicyRedirectPoolsConfigToHclTerraform, true)(this._redirectPoolsConfig.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ElbL7PolicyRedirectPoolsConfigList",
      },
      redirect_pools_extend_config: {
        value: elbL7PolicyRedirectPoolsExtendConfigToHclTerraform(this._redirectPoolsExtendConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ElbL7PolicyRedirectPoolsExtendConfigList",
      },
      redirect_pools_sticky_session_config: {
        value: elbL7PolicyRedirectPoolsStickySessionConfigToHclTerraform(this._redirectPoolsStickySessionConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ElbL7PolicyRedirectPoolsStickySessionConfigList",
      },
      redirect_url_config: {
        value: elbL7PolicyRedirectUrlConfigToHclTerraform(this._redirectUrlConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ElbL7PolicyRedirectUrlConfigList",
      },
      timeouts: {
        value: elbL7PolicyTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "ElbL7PolicyTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

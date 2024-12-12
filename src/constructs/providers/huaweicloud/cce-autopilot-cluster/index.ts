// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CceAutopilotClusterConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#alias CceAutopilotCluster#alias}
  */
  readonly alias?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#annotations CceAutopilotCluster#annotations}
  */
  readonly annotations?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#category CceAutopilotCluster#category}
  */
  readonly category?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#custom_san CceAutopilotCluster#custom_san}
  */
  readonly customSan?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#delete_efs CceAutopilotCluster#delete_efs}
  */
  readonly deleteEfs?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#delete_eni CceAutopilotCluster#delete_eni}
  */
  readonly deleteEni?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#delete_net CceAutopilotCluster#delete_net}
  */
  readonly deleteNet?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#delete_obs CceAutopilotCluster#delete_obs}
  */
  readonly deleteObs?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#delete_sfs30 CceAutopilotCluster#delete_sfs30}
  */
  readonly deleteSfs30?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#deletion_protection CceAutopilotCluster#deletion_protection}
  */
  readonly deletionProtection?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#description CceAutopilotCluster#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#eip_id CceAutopilotCluster#eip_id}
  */
  readonly eipId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#enable_autopilot CceAutopilotCluster#enable_autopilot}
  */
  readonly enableAutopilot?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#enable_force_new CceAutopilotCluster#enable_force_new}
  */
  readonly enableForceNew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#enable_snat CceAutopilotCluster#enable_snat}
  */
  readonly enableSnat?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#enable_swr_image_access CceAutopilotCluster#enable_swr_image_access}
  */
  readonly enableSwrImageAccess?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#flavor CceAutopilotCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#id CceAutopilotCluster#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#ipv6_enable CceAutopilotCluster#ipv6_enable}
  */
  readonly ipv6Enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#kube_proxy_mode CceAutopilotCluster#kube_proxy_mode}
  */
  readonly kubeProxyMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#lts_reclaim_policy CceAutopilotCluster#lts_reclaim_policy}
  */
  readonly ltsReclaimPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#name CceAutopilotCluster#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#region CceAutopilotCluster#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#tags CceAutopilotCluster#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#type CceAutopilotCluster#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#version CceAutopilotCluster#version}
  */
  readonly version?: string;
  /**
  * authentication block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#authentication CceAutopilotCluster#authentication}
  */
  readonly authentication?: CceAutopilotClusterAuthentication;
  /**
  * configurations_override block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#configurations_override CceAutopilotCluster#configurations_override}
  */
  readonly configurationsOverride?: CceAutopilotClusterConfigurationsOverride[] | cdktf.IResolvable;
  /**
  * container_network block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#container_network CceAutopilotCluster#container_network}
  */
  readonly containerNetwork: CceAutopilotClusterContainerNetwork;
  /**
  * eni_network block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#eni_network CceAutopilotCluster#eni_network}
  */
  readonly eniNetwork?: CceAutopilotClusterEniNetwork;
  /**
  * extend_param block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#extend_param CceAutopilotCluster#extend_param}
  */
  readonly extendParam?: CceAutopilotClusterExtendParam;
  /**
  * host_network block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#host_network CceAutopilotCluster#host_network}
  */
  readonly hostNetwork: CceAutopilotClusterHostNetwork;
  /**
  * service_network block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#service_network CceAutopilotCluster#service_network}
  */
  readonly serviceNetwork?: CceAutopilotClusterServiceNetwork;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#timeouts CceAutopilotCluster#timeouts}
  */
  readonly timeouts?: CceAutopilotClusterTimeouts;
}
export interface CceAutopilotClusterStatusEndpoints {
}

export function cceAutopilotClusterStatusEndpointsToTerraform(struct?: CceAutopilotClusterStatusEndpoints): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function cceAutopilotClusterStatusEndpointsToHclTerraform(struct?: CceAutopilotClusterStatusEndpoints): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CceAutopilotClusterStatusEndpointsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): CceAutopilotClusterStatusEndpoints | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterStatusEndpoints | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // url - computed: true, optional: false, required: false
  public get url() {
    return this.getStringAttribute('url');
  }
}

export class CceAutopilotClusterStatusEndpointsList extends cdktf.ComplexList {

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
  public get(index: number): CceAutopilotClusterStatusEndpointsOutputReference {
    return new CceAutopilotClusterStatusEndpointsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceAutopilotClusterStatus {
}

export function cceAutopilotClusterStatusToTerraform(struct?: CceAutopilotClusterStatus): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function cceAutopilotClusterStatusToHclTerraform(struct?: CceAutopilotClusterStatus): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CceAutopilotClusterStatusOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): CceAutopilotClusterStatus | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterStatus | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // endpoints - computed: true, optional: false, required: false
  private _endpoints = new CceAutopilotClusterStatusEndpointsList(this, "endpoints", false);
  public get endpoints() {
    return this._endpoints;
  }

  // phase - computed: true, optional: false, required: false
  public get phase() {
    return this.getStringAttribute('phase');
  }
}

export class CceAutopilotClusterStatusList extends cdktf.ComplexList {

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
  public get(index: number): CceAutopilotClusterStatusOutputReference {
    return new CceAutopilotClusterStatusOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceAutopilotClusterAuthentication {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#mode CceAutopilotCluster#mode}
  */
  readonly mode?: string;
}

export function cceAutopilotClusterAuthenticationToTerraform(struct?: CceAutopilotClusterAuthenticationOutputReference | CceAutopilotClusterAuthentication): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    mode: cdktf.stringToTerraform(struct!.mode),
  }
}


export function cceAutopilotClusterAuthenticationToHclTerraform(struct?: CceAutopilotClusterAuthenticationOutputReference | CceAutopilotClusterAuthentication): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    mode: {
      value: cdktf.stringToHclTerraform(struct!.mode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceAutopilotClusterAuthenticationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceAutopilotClusterAuthentication | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._mode !== undefined) {
      hasAnyValues = true;
      internalValueResult.mode = this._mode;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterAuthentication | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._mode = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._mode = value.mode;
    }
  }

  // mode - computed: true, optional: true, required: false
  private _mode?: string; 
  public get mode() {
    return this.getStringAttribute('mode');
  }
  public set mode(value: string) {
    this._mode = value;
  }
  public resetMode() {
    this._mode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get modeInput() {
    return this._mode;
  }
}
export interface CceAutopilotClusterConfigurationsOverrideConfigurations {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#name CceAutopilotCluster#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#value CceAutopilotCluster#value}
  */
  readonly value?: string;
}

export function cceAutopilotClusterConfigurationsOverrideConfigurationsToTerraform(struct?: CceAutopilotClusterConfigurationsOverrideConfigurations | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cceAutopilotClusterConfigurationsOverrideConfigurationsToHclTerraform(struct?: CceAutopilotClusterConfigurationsOverrideConfigurations | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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

export class CceAutopilotClusterConfigurationsOverrideConfigurationsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceAutopilotClusterConfigurationsOverrideConfigurations | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
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

  public set internalValue(value: CceAutopilotClusterConfigurationsOverrideConfigurations | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
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
      this._name = value.name;
      this._value = value.value;
    }
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

export class CceAutopilotClusterConfigurationsOverrideConfigurationsList extends cdktf.ComplexList {
  public internalValue? : CceAutopilotClusterConfigurationsOverrideConfigurations[] | cdktf.IResolvable

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
  public get(index: number): CceAutopilotClusterConfigurationsOverrideConfigurationsOutputReference {
    return new CceAutopilotClusterConfigurationsOverrideConfigurationsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceAutopilotClusterConfigurationsOverride {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#name CceAutopilotCluster#name}
  */
  readonly name?: string;
  /**
  * configurations block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#configurations CceAutopilotCluster#configurations}
  */
  readonly configurations?: CceAutopilotClusterConfigurationsOverrideConfigurations[] | cdktf.IResolvable;
}

export function cceAutopilotClusterConfigurationsOverrideToTerraform(struct?: CceAutopilotClusterConfigurationsOverride | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    configurations: cdktf.listMapper(cceAutopilotClusterConfigurationsOverrideConfigurationsToTerraform, true)(struct!.configurations),
  }
}


export function cceAutopilotClusterConfigurationsOverrideToHclTerraform(struct?: CceAutopilotClusterConfigurationsOverride | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    configurations: {
      value: cdktf.listMapperHcl(cceAutopilotClusterConfigurationsOverrideConfigurationsToHclTerraform, true)(struct!.configurations),
      isBlock: true,
      type: "list",
      storageClassType: "CceAutopilotClusterConfigurationsOverrideConfigurationsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceAutopilotClusterConfigurationsOverrideOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceAutopilotClusterConfigurationsOverride | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._configurations?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.configurations = this._configurations?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterConfigurationsOverride | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._configurations.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._configurations.internalValue = value.configurations;
    }
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

  // configurations - computed: false, optional: true, required: false
  private _configurations = new CceAutopilotClusterConfigurationsOverrideConfigurationsList(this, "configurations", false);
  public get configurations() {
    return this._configurations;
  }
  public putConfigurations(value: CceAutopilotClusterConfigurationsOverrideConfigurations[] | cdktf.IResolvable) {
    this._configurations.internalValue = value;
  }
  public resetConfigurations() {
    this._configurations.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configurationsInput() {
    return this._configurations.internalValue;
  }
}

export class CceAutopilotClusterConfigurationsOverrideList extends cdktf.ComplexList {
  public internalValue? : CceAutopilotClusterConfigurationsOverride[] | cdktf.IResolvable

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
  public get(index: number): CceAutopilotClusterConfigurationsOverrideOutputReference {
    return new CceAutopilotClusterConfigurationsOverrideOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceAutopilotClusterContainerNetwork {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#mode CceAutopilotCluster#mode}
  */
  readonly mode: string;
}

export function cceAutopilotClusterContainerNetworkToTerraform(struct?: CceAutopilotClusterContainerNetworkOutputReference | CceAutopilotClusterContainerNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    mode: cdktf.stringToTerraform(struct!.mode),
  }
}


export function cceAutopilotClusterContainerNetworkToHclTerraform(struct?: CceAutopilotClusterContainerNetworkOutputReference | CceAutopilotClusterContainerNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    mode: {
      value: cdktf.stringToHclTerraform(struct!.mode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceAutopilotClusterContainerNetworkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceAutopilotClusterContainerNetwork | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._mode !== undefined) {
      hasAnyValues = true;
      internalValueResult.mode = this._mode;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterContainerNetwork | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._mode = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._mode = value.mode;
    }
  }

  // mode - computed: false, optional: false, required: true
  private _mode?: string; 
  public get mode() {
    return this.getStringAttribute('mode');
  }
  public set mode(value: string) {
    this._mode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get modeInput() {
    return this._mode;
  }
}
export interface CceAutopilotClusterEniNetworkSubnets {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#subnet_id CceAutopilotCluster#subnet_id}
  */
  readonly subnetId: string;
}

export function cceAutopilotClusterEniNetworkSubnetsToTerraform(struct?: CceAutopilotClusterEniNetworkSubnets | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    subnet_id: cdktf.stringToTerraform(struct!.subnetId),
  }
}


export function cceAutopilotClusterEniNetworkSubnetsToHclTerraform(struct?: CceAutopilotClusterEniNetworkSubnets | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    subnet_id: {
      value: cdktf.stringToHclTerraform(struct!.subnetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceAutopilotClusterEniNetworkSubnetsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceAutopilotClusterEniNetworkSubnets | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._subnetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.subnetId = this._subnetId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterEniNetworkSubnets | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._subnetId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._subnetId = value.subnetId;
    }
  }

  // subnet_id - computed: false, optional: false, required: true
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
  }
}

export class CceAutopilotClusterEniNetworkSubnetsList extends cdktf.ComplexList {
  public internalValue? : CceAutopilotClusterEniNetworkSubnets[] | cdktf.IResolvable

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
  public get(index: number): CceAutopilotClusterEniNetworkSubnetsOutputReference {
    return new CceAutopilotClusterEniNetworkSubnetsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceAutopilotClusterEniNetwork {
  /**
  * subnets block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#subnets CceAutopilotCluster#subnets}
  */
  readonly subnets: CceAutopilotClusterEniNetworkSubnets[] | cdktf.IResolvable;
}

export function cceAutopilotClusterEniNetworkToTerraform(struct?: CceAutopilotClusterEniNetworkOutputReference | CceAutopilotClusterEniNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    subnets: cdktf.listMapper(cceAutopilotClusterEniNetworkSubnetsToTerraform, true)(struct!.subnets),
  }
}


export function cceAutopilotClusterEniNetworkToHclTerraform(struct?: CceAutopilotClusterEniNetworkOutputReference | CceAutopilotClusterEniNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    subnets: {
      value: cdktf.listMapperHcl(cceAutopilotClusterEniNetworkSubnetsToHclTerraform, true)(struct!.subnets),
      isBlock: true,
      type: "list",
      storageClassType: "CceAutopilotClusterEniNetworkSubnetsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceAutopilotClusterEniNetworkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceAutopilotClusterEniNetwork | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._subnets?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.subnets = this._subnets?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterEniNetwork | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._subnets.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._subnets.internalValue = value.subnets;
    }
  }

  // subnets - computed: false, optional: false, required: true
  private _subnets = new CceAutopilotClusterEniNetworkSubnetsList(this, "subnets", false);
  public get subnets() {
    return this._subnets;
  }
  public putSubnets(value: CceAutopilotClusterEniNetworkSubnets[] | cdktf.IResolvable) {
    this._subnets.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetsInput() {
    return this._subnets.internalValue;
  }
}
export interface CceAutopilotClusterExtendParam {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#enterprise_project_id CceAutopilotCluster#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
}

export function cceAutopilotClusterExtendParamToTerraform(struct?: CceAutopilotClusterExtendParamOutputReference | CceAutopilotClusterExtendParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enterprise_project_id: cdktf.stringToTerraform(struct!.enterpriseProjectId),
  }
}


export function cceAutopilotClusterExtendParamToHclTerraform(struct?: CceAutopilotClusterExtendParamOutputReference | CceAutopilotClusterExtendParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enterprise_project_id: {
      value: cdktf.stringToHclTerraform(struct!.enterpriseProjectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceAutopilotClusterExtendParamOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceAutopilotClusterExtendParam | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enterpriseProjectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.enterpriseProjectId = this._enterpriseProjectId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterExtendParam | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enterpriseProjectId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enterpriseProjectId = value.enterpriseProjectId;
    }
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
}
export interface CceAutopilotClusterHostNetwork {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#subnet CceAutopilotCluster#subnet}
  */
  readonly subnet: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#vpc CceAutopilotCluster#vpc}
  */
  readonly vpc: string;
}

export function cceAutopilotClusterHostNetworkToTerraform(struct?: CceAutopilotClusterHostNetworkOutputReference | CceAutopilotClusterHostNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    subnet: cdktf.stringToTerraform(struct!.subnet),
    vpc: cdktf.stringToTerraform(struct!.vpc),
  }
}


export function cceAutopilotClusterHostNetworkToHclTerraform(struct?: CceAutopilotClusterHostNetworkOutputReference | CceAutopilotClusterHostNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    subnet: {
      value: cdktf.stringToHclTerraform(struct!.subnet),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vpc: {
      value: cdktf.stringToHclTerraform(struct!.vpc),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceAutopilotClusterHostNetworkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceAutopilotClusterHostNetwork | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._subnet !== undefined) {
      hasAnyValues = true;
      internalValueResult.subnet = this._subnet;
    }
    if (this._vpc !== undefined) {
      hasAnyValues = true;
      internalValueResult.vpc = this._vpc;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterHostNetwork | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._subnet = undefined;
      this._vpc = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._subnet = value.subnet;
      this._vpc = value.vpc;
    }
  }

  // subnet - computed: false, optional: false, required: true
  private _subnet?: string; 
  public get subnet() {
    return this.getStringAttribute('subnet');
  }
  public set subnet(value: string) {
    this._subnet = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetInput() {
    return this._subnet;
  }

  // vpc - computed: false, optional: false, required: true
  private _vpc?: string; 
  public get vpc() {
    return this.getStringAttribute('vpc');
  }
  public set vpc(value: string) {
    this._vpc = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcInput() {
    return this._vpc;
  }
}
export interface CceAutopilotClusterServiceNetwork {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#ipv4_cidr CceAutopilotCluster#ipv4_cidr}
  */
  readonly ipv4Cidr?: string;
}

export function cceAutopilotClusterServiceNetworkToTerraform(struct?: CceAutopilotClusterServiceNetworkOutputReference | CceAutopilotClusterServiceNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    ipv4_cidr: cdktf.stringToTerraform(struct!.ipv4Cidr),
  }
}


export function cceAutopilotClusterServiceNetworkToHclTerraform(struct?: CceAutopilotClusterServiceNetworkOutputReference | CceAutopilotClusterServiceNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    ipv4_cidr: {
      value: cdktf.stringToHclTerraform(struct!.ipv4Cidr),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceAutopilotClusterServiceNetworkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceAutopilotClusterServiceNetwork | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._ipv4Cidr !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipv4Cidr = this._ipv4Cidr;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterServiceNetwork | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._ipv4Cidr = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._ipv4Cidr = value.ipv4Cidr;
    }
  }

  // ipv4_cidr - computed: true, optional: true, required: false
  private _ipv4Cidr?: string; 
  public get ipv4Cidr() {
    return this.getStringAttribute('ipv4_cidr');
  }
  public set ipv4Cidr(value: string) {
    this._ipv4Cidr = value;
  }
  public resetIpv4Cidr() {
    this._ipv4Cidr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipv4CidrInput() {
    return this._ipv4Cidr;
  }
}
export interface CceAutopilotClusterTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#create CceAutopilotCluster#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#delete CceAutopilotCluster#delete}
  */
  readonly delete?: string;
}

export function cceAutopilotClusterTimeoutsToTerraform(struct?: CceAutopilotClusterTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function cceAutopilotClusterTimeoutsToHclTerraform(struct?: CceAutopilotClusterTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceAutopilotClusterTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CceAutopilotClusterTimeouts | cdktf.IResolvable | undefined {
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
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceAutopilotClusterTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster huaweicloud_cce_autopilot_cluster}
*/
export class CceAutopilotCluster extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cce_autopilot_cluster";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CceAutopilotCluster resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CceAutopilotCluster to import
  * @param importFromId The id of the existing CceAutopilotCluster that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CceAutopilotCluster to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cce_autopilot_cluster", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_autopilot_cluster huaweicloud_cce_autopilot_cluster} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CceAutopilotClusterConfig
  */
  public constructor(scope: Construct, id: string, config: CceAutopilotClusterConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cce_autopilot_cluster',
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
    this._alias = config.alias;
    this._annotations = config.annotations;
    this._category = config.category;
    this._customSan = config.customSan;
    this._deleteEfs = config.deleteEfs;
    this._deleteEni = config.deleteEni;
    this._deleteNet = config.deleteNet;
    this._deleteObs = config.deleteObs;
    this._deleteSfs30 = config.deleteSfs30;
    this._deletionProtection = config.deletionProtection;
    this._description = config.description;
    this._eipId = config.eipId;
    this._enableAutopilot = config.enableAutopilot;
    this._enableForceNew = config.enableForceNew;
    this._enableSnat = config.enableSnat;
    this._enableSwrImageAccess = config.enableSwrImageAccess;
    this._flavor = config.flavor;
    this._id = config.id;
    this._ipv6Enable = config.ipv6Enable;
    this._kubeProxyMode = config.kubeProxyMode;
    this._ltsReclaimPolicy = config.ltsReclaimPolicy;
    this._name = config.name;
    this._region = config.region;
    this._tags = config.tags;
    this._type = config.type;
    this._version = config.version;
    this._authentication.internalValue = config.authentication;
    this._configurationsOverride.internalValue = config.configurationsOverride;
    this._containerNetwork.internalValue = config.containerNetwork;
    this._eniNetwork.internalValue = config.eniNetwork;
    this._extendParam.internalValue = config.extendParam;
    this._hostNetwork.internalValue = config.hostNetwork;
    this._serviceNetwork.internalValue = config.serviceNetwork;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // alias - computed: true, optional: true, required: false
  private _alias?: string; 
  public get alias() {
    return this.getStringAttribute('alias');
  }
  public set alias(value: string) {
    this._alias = value;
  }
  public resetAlias() {
    this._alias = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aliasInput() {
    return this._alias;
  }

  // annotations - computed: true, optional: true, required: false
  private _annotations?: { [key: string]: string }; 
  public get annotations() {
    return this.getStringMapAttribute('annotations');
  }
  public set annotations(value: { [key: string]: string }) {
    this._annotations = value;
  }
  public resetAnnotations() {
    this._annotations = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get annotationsInput() {
    return this._annotations;
  }

  // az - computed: true, optional: false, required: false
  public get az() {
    return this.getStringAttribute('az');
  }

  // category - computed: true, optional: true, required: false
  private _category?: string; 
  public get category() {
    return this.getStringAttribute('category');
  }
  public set category(value: string) {
    this._category = value;
  }
  public resetCategory() {
    this._category = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get categoryInput() {
    return this._category;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // custom_san - computed: true, optional: true, required: false
  private _customSan?: string[]; 
  public get customSan() {
    return this.getListAttribute('custom_san');
  }
  public set customSan(value: string[]) {
    this._customSan = value;
  }
  public resetCustomSan() {
    this._customSan = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customSanInput() {
    return this._customSan;
  }

  // delete_efs - computed: false, optional: true, required: false
  private _deleteEfs?: string; 
  public get deleteEfs() {
    return this.getStringAttribute('delete_efs');
  }
  public set deleteEfs(value: string) {
    this._deleteEfs = value;
  }
  public resetDeleteEfs() {
    this._deleteEfs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteEfsInput() {
    return this._deleteEfs;
  }

  // delete_eni - computed: false, optional: true, required: false
  private _deleteEni?: string; 
  public get deleteEni() {
    return this.getStringAttribute('delete_eni');
  }
  public set deleteEni(value: string) {
    this._deleteEni = value;
  }
  public resetDeleteEni() {
    this._deleteEni = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteEniInput() {
    return this._deleteEni;
  }

  // delete_net - computed: false, optional: true, required: false
  private _deleteNet?: string; 
  public get deleteNet() {
    return this.getStringAttribute('delete_net');
  }
  public set deleteNet(value: string) {
    this._deleteNet = value;
  }
  public resetDeleteNet() {
    this._deleteNet = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteNetInput() {
    return this._deleteNet;
  }

  // delete_obs - computed: false, optional: true, required: false
  private _deleteObs?: string; 
  public get deleteObs() {
    return this.getStringAttribute('delete_obs');
  }
  public set deleteObs(value: string) {
    this._deleteObs = value;
  }
  public resetDeleteObs() {
    this._deleteObs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteObsInput() {
    return this._deleteObs;
  }

  // delete_sfs30 - computed: false, optional: true, required: false
  private _deleteSfs30?: string; 
  public get deleteSfs30() {
    return this.getStringAttribute('delete_sfs30');
  }
  public set deleteSfs30(value: string) {
    this._deleteSfs30 = value;
  }
  public resetDeleteSfs30() {
    this._deleteSfs30 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteSfs30Input() {
    return this._deleteSfs30;
  }

  // deletion_protection - computed: true, optional: true, required: false
  private _deletionProtection?: boolean | cdktf.IResolvable; 
  public get deletionProtection() {
    return this.getBooleanAttribute('deletion_protection');
  }
  public set deletionProtection(value: boolean | cdktf.IResolvable) {
    this._deletionProtection = value;
  }
  public resetDeletionProtection() {
    this._deletionProtection = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deletionProtectionInput() {
    return this._deletionProtection;
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

  // eip_id - computed: false, optional: true, required: false
  private _eipId?: string; 
  public get eipId() {
    return this.getStringAttribute('eip_id');
  }
  public set eipId(value: string) {
    this._eipId = value;
  }
  public resetEipId() {
    this._eipId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eipIdInput() {
    return this._eipId;
  }

  // enable_autopilot - computed: false, optional: true, required: false
  private _enableAutopilot?: boolean | cdktf.IResolvable; 
  public get enableAutopilot() {
    return this.getBooleanAttribute('enable_autopilot');
  }
  public set enableAutopilot(value: boolean | cdktf.IResolvable) {
    this._enableAutopilot = value;
  }
  public resetEnableAutopilot() {
    this._enableAutopilot = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableAutopilotInput() {
    return this._enableAutopilot;
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

  // enable_snat - computed: true, optional: true, required: false
  private _enableSnat?: boolean | cdktf.IResolvable; 
  public get enableSnat() {
    return this.getBooleanAttribute('enable_snat');
  }
  public set enableSnat(value: boolean | cdktf.IResolvable) {
    this._enableSnat = value;
  }
  public resetEnableSnat() {
    this._enableSnat = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableSnatInput() {
    return this._enableSnat;
  }

  // enable_swr_image_access - computed: true, optional: true, required: false
  private _enableSwrImageAccess?: boolean | cdktf.IResolvable; 
  public get enableSwrImageAccess() {
    return this.getBooleanAttribute('enable_swr_image_access');
  }
  public set enableSwrImageAccess(value: boolean | cdktf.IResolvable) {
    this._enableSwrImageAccess = value;
  }
  public resetEnableSwrImageAccess() {
    this._enableSwrImageAccess = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableSwrImageAccessInput() {
    return this._enableSwrImageAccess;
  }

  // flavor - computed: false, optional: false, required: true
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
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

  // ipv6_enable - computed: true, optional: true, required: false
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

  // kube_proxy_mode - computed: true, optional: true, required: false
  private _kubeProxyMode?: string; 
  public get kubeProxyMode() {
    return this.getStringAttribute('kube_proxy_mode');
  }
  public set kubeProxyMode(value: string) {
    this._kubeProxyMode = value;
  }
  public resetKubeProxyMode() {
    this._kubeProxyMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kubeProxyModeInput() {
    return this._kubeProxyMode;
  }

  // lts_reclaim_policy - computed: false, optional: true, required: false
  private _ltsReclaimPolicy?: string; 
  public get ltsReclaimPolicy() {
    return this.getStringAttribute('lts_reclaim_policy');
  }
  public set ltsReclaimPolicy(value: string) {
    this._ltsReclaimPolicy = value;
  }
  public resetLtsReclaimPolicy() {
    this._ltsReclaimPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsReclaimPolicyInput() {
    return this._ltsReclaimPolicy;
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

  // platform_version - computed: true, optional: false, required: false
  public get platformVersion() {
    return this.getStringAttribute('platform_version');
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

  // status - computed: true, optional: false, required: false
  private _status = new CceAutopilotClusterStatusList(this, "status", false);
  public get status() {
    return this._status;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // version - computed: true, optional: true, required: false
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  public resetVersion() {
    this._version = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // authentication - computed: false, optional: true, required: false
  private _authentication = new CceAutopilotClusterAuthenticationOutputReference(this, "authentication");
  public get authentication() {
    return this._authentication;
  }
  public putAuthentication(value: CceAutopilotClusterAuthentication) {
    this._authentication.internalValue = value;
  }
  public resetAuthentication() {
    this._authentication.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticationInput() {
    return this._authentication.internalValue;
  }

  // configurations_override - computed: false, optional: true, required: false
  private _configurationsOverride = new CceAutopilotClusterConfigurationsOverrideList(this, "configurations_override", false);
  public get configurationsOverride() {
    return this._configurationsOverride;
  }
  public putConfigurationsOverride(value: CceAutopilotClusterConfigurationsOverride[] | cdktf.IResolvable) {
    this._configurationsOverride.internalValue = value;
  }
  public resetConfigurationsOverride() {
    this._configurationsOverride.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configurationsOverrideInput() {
    return this._configurationsOverride.internalValue;
  }

  // container_network - computed: false, optional: false, required: true
  private _containerNetwork = new CceAutopilotClusterContainerNetworkOutputReference(this, "container_network");
  public get containerNetwork() {
    return this._containerNetwork;
  }
  public putContainerNetwork(value: CceAutopilotClusterContainerNetwork) {
    this._containerNetwork.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get containerNetworkInput() {
    return this._containerNetwork.internalValue;
  }

  // eni_network - computed: false, optional: true, required: false
  private _eniNetwork = new CceAutopilotClusterEniNetworkOutputReference(this, "eni_network");
  public get eniNetwork() {
    return this._eniNetwork;
  }
  public putEniNetwork(value: CceAutopilotClusterEniNetwork) {
    this._eniNetwork.internalValue = value;
  }
  public resetEniNetwork() {
    this._eniNetwork.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eniNetworkInput() {
    return this._eniNetwork.internalValue;
  }

  // extend_param - computed: false, optional: true, required: false
  private _extendParam = new CceAutopilotClusterExtendParamOutputReference(this, "extend_param");
  public get extendParam() {
    return this._extendParam;
  }
  public putExtendParam(value: CceAutopilotClusterExtendParam) {
    this._extendParam.internalValue = value;
  }
  public resetExtendParam() {
    this._extendParam.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendParamInput() {
    return this._extendParam.internalValue;
  }

  // host_network - computed: false, optional: false, required: true
  private _hostNetwork = new CceAutopilotClusterHostNetworkOutputReference(this, "host_network");
  public get hostNetwork() {
    return this._hostNetwork;
  }
  public putHostNetwork(value: CceAutopilotClusterHostNetwork) {
    this._hostNetwork.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get hostNetworkInput() {
    return this._hostNetwork.internalValue;
  }

  // service_network - computed: false, optional: true, required: false
  private _serviceNetwork = new CceAutopilotClusterServiceNetworkOutputReference(this, "service_network");
  public get serviceNetwork() {
    return this._serviceNetwork;
  }
  public putServiceNetwork(value: CceAutopilotClusterServiceNetwork) {
    this._serviceNetwork.internalValue = value;
  }
  public resetServiceNetwork() {
    this._serviceNetwork.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceNetworkInput() {
    return this._serviceNetwork.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CceAutopilotClusterTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CceAutopilotClusterTimeouts) {
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
      alias: cdktf.stringToTerraform(this._alias),
      annotations: cdktf.hashMapper(cdktf.stringToTerraform)(this._annotations),
      category: cdktf.stringToTerraform(this._category),
      custom_san: cdktf.listMapper(cdktf.stringToTerraform, false)(this._customSan),
      delete_efs: cdktf.stringToTerraform(this._deleteEfs),
      delete_eni: cdktf.stringToTerraform(this._deleteEni),
      delete_net: cdktf.stringToTerraform(this._deleteNet),
      delete_obs: cdktf.stringToTerraform(this._deleteObs),
      delete_sfs30: cdktf.stringToTerraform(this._deleteSfs30),
      deletion_protection: cdktf.booleanToTerraform(this._deletionProtection),
      description: cdktf.stringToTerraform(this._description),
      eip_id: cdktf.stringToTerraform(this._eipId),
      enable_autopilot: cdktf.booleanToTerraform(this._enableAutopilot),
      enable_force_new: cdktf.stringToTerraform(this._enableForceNew),
      enable_snat: cdktf.booleanToTerraform(this._enableSnat),
      enable_swr_image_access: cdktf.booleanToTerraform(this._enableSwrImageAccess),
      flavor: cdktf.stringToTerraform(this._flavor),
      id: cdktf.stringToTerraform(this._id),
      ipv6_enable: cdktf.booleanToTerraform(this._ipv6Enable),
      kube_proxy_mode: cdktf.stringToTerraform(this._kubeProxyMode),
      lts_reclaim_policy: cdktf.stringToTerraform(this._ltsReclaimPolicy),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      type: cdktf.stringToTerraform(this._type),
      version: cdktf.stringToTerraform(this._version),
      authentication: cceAutopilotClusterAuthenticationToTerraform(this._authentication.internalValue),
      configurations_override: cdktf.listMapper(cceAutopilotClusterConfigurationsOverrideToTerraform, true)(this._configurationsOverride.internalValue),
      container_network: cceAutopilotClusterContainerNetworkToTerraform(this._containerNetwork.internalValue),
      eni_network: cceAutopilotClusterEniNetworkToTerraform(this._eniNetwork.internalValue),
      extend_param: cceAutopilotClusterExtendParamToTerraform(this._extendParam.internalValue),
      host_network: cceAutopilotClusterHostNetworkToTerraform(this._hostNetwork.internalValue),
      service_network: cceAutopilotClusterServiceNetworkToTerraform(this._serviceNetwork.internalValue),
      timeouts: cceAutopilotClusterTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      alias: {
        value: cdktf.stringToHclTerraform(this._alias),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      annotations: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._annotations),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      category: {
        value: cdktf.stringToHclTerraform(this._category),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      custom_san: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._customSan),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      delete_efs: {
        value: cdktf.stringToHclTerraform(this._deleteEfs),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      delete_eni: {
        value: cdktf.stringToHclTerraform(this._deleteEni),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      delete_net: {
        value: cdktf.stringToHclTerraform(this._deleteNet),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      delete_obs: {
        value: cdktf.stringToHclTerraform(this._deleteObs),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      delete_sfs30: {
        value: cdktf.stringToHclTerraform(this._deleteSfs30),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      deletion_protection: {
        value: cdktf.booleanToHclTerraform(this._deletionProtection),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      eip_id: {
        value: cdktf.stringToHclTerraform(this._eipId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_autopilot: {
        value: cdktf.booleanToHclTerraform(this._enableAutopilot),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_force_new: {
        value: cdktf.stringToHclTerraform(this._enableForceNew),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_snat: {
        value: cdktf.booleanToHclTerraform(this._enableSnat),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_swr_image_access: {
        value: cdktf.booleanToHclTerraform(this._enableSwrImageAccess),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      flavor: {
        value: cdktf.stringToHclTerraform(this._flavor),
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
      ipv6_enable: {
        value: cdktf.booleanToHclTerraform(this._ipv6Enable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      kube_proxy_mode: {
        value: cdktf.stringToHclTerraform(this._kubeProxyMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lts_reclaim_policy: {
        value: cdktf.stringToHclTerraform(this._ltsReclaimPolicy),
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
      version: {
        value: cdktf.stringToHclTerraform(this._version),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      authentication: {
        value: cceAutopilotClusterAuthenticationToHclTerraform(this._authentication.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceAutopilotClusterAuthenticationList",
      },
      configurations_override: {
        value: cdktf.listMapperHcl(cceAutopilotClusterConfigurationsOverrideToHclTerraform, true)(this._configurationsOverride.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceAutopilotClusterConfigurationsOverrideList",
      },
      container_network: {
        value: cceAutopilotClusterContainerNetworkToHclTerraform(this._containerNetwork.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceAutopilotClusterContainerNetworkList",
      },
      eni_network: {
        value: cceAutopilotClusterEniNetworkToHclTerraform(this._eniNetwork.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceAutopilotClusterEniNetworkList",
      },
      extend_param: {
        value: cceAutopilotClusterExtendParamToHclTerraform(this._extendParam.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceAutopilotClusterExtendParamList",
      },
      host_network: {
        value: cceAutopilotClusterHostNetworkToHclTerraform(this._hostNetwork.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceAutopilotClusterHostNetworkList",
      },
      service_network: {
        value: cceAutopilotClusterServiceNetworkToHclTerraform(this._serviceNetwork.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceAutopilotClusterServiceNetworkList",
      },
      timeouts: {
        value: cceAutopilotClusterTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CceAutopilotClusterTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

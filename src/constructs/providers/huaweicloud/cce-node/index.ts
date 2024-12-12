// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CceNodeConfig extends cdktf.TerraformMetaArguments {
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#annotations CceNode#annotations}
  */
  readonly annotations?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#auto_pay CceNode#auto_pay}
  */
  readonly autoPay?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#auto_renew CceNode#auto_renew}
  */
  readonly autoRenew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#availability_zone CceNode#availability_zone}
  */
  readonly availabilityZone: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#bandwidth_charge_mode CceNode#bandwidth_charge_mode}
  */
  readonly bandwidthChargeMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#bandwidth_size CceNode#bandwidth_size}
  */
  readonly bandwidthSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#billing_mode CceNode#billing_mode}
  */
  readonly billingMode?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#charging_mode CceNode#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#cluster_id CceNode#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#dedicated_host_id CceNode#dedicated_host_id}
  */
  readonly dedicatedHostId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#ecs_group_id CceNode#ecs_group_id}
  */
  readonly ecsGroupId?: string;
  /**
  * schema: Deprecated
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#ecs_performance_type CceNode#ecs_performance_type}
  */
  readonly ecsPerformanceType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#eip_id CceNode#eip_id}
  */
  readonly eipId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#eip_ids CceNode#eip_ids}
  */
  readonly eipIds?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#enterprise_project_id CceNode#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * schema: Deprecated
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#extend_param CceNode#extend_param}
  */
  readonly extendParam?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#extend_param_charging_mode CceNode#extend_param_charging_mode}
  */
  readonly extendParamChargingMode?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#fixed_ip CceNode#fixed_ip}
  */
  readonly fixedIp?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#flavor_id CceNode#flavor_id}
  */
  readonly flavorId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#id CceNode#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#initialized_conditions CceNode#initialized_conditions}
  */
  readonly initializedConditions?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#iptype CceNode#iptype}
  */
  readonly iptype?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#keep_ecs CceNode#keep_ecs}
  */
  readonly keepEcs?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#key_pair CceNode#key_pair}
  */
  readonly keyPair?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#labels CceNode#labels}
  */
  readonly labels?: { [key: string]: string };
  /**
  * schema: Deprecated
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#max_pods CceNode#max_pods}
  */
  readonly maxPods?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#name CceNode#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#order_id CceNode#order_id}
  */
  readonly orderId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#os CceNode#os}
  */
  readonly os?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#partition CceNode#partition}
  */
  readonly partition?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#password CceNode#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#period CceNode#period}
  */
  readonly period?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#period_unit CceNode#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * schema: Deprecated
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#postinstall CceNode#postinstall}
  */
  readonly postinstall?: string;
  /**
  * schema: Deprecated
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#preinstall CceNode#preinstall}
  */
  readonly preinstall?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#private_key CceNode#private_key}
  */
  readonly privateKey?: string;
  /**
  * schema: Deprecated
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#product_id CceNode#product_id}
  */
  readonly productId?: string;
  /**
  * schema: Deprecated
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#public_key CceNode#public_key}
  */
  readonly publicKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#region CceNode#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#runtime CceNode#runtime}
  */
  readonly runtime?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#sharetype CceNode#sharetype}
  */
  readonly sharetype?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#subnet_id CceNode#subnet_id}
  */
  readonly subnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#tags CceNode#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * data_volumes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#data_volumes CceNode#data_volumes}
  */
  readonly dataVolumes?: CceNodeDataVolumes[] | cdktf.IResolvable;
  /**
  * extend_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#extend_params CceNode#extend_params}
  */
  readonly extendParams?: CceNodeExtendParams;
  /**
  * extension_nics block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#extension_nics CceNode#extension_nics}
  */
  readonly extensionNics?: CceNodeExtensionNics[] | cdktf.IResolvable;
  /**
  * hostname_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#hostname_config CceNode#hostname_config}
  */
  readonly hostnameConfig?: CceNodeHostnameConfig;
  /**
  * root_volume block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#root_volume CceNode#root_volume}
  */
  readonly rootVolume: CceNodeRootVolume;
  /**
  * storage block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#storage CceNode#storage}
  */
  readonly storage?: CceNodeStorage;
  /**
  * taints block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#taints CceNode#taints}
  */
  readonly taints?: CceNodeTaints[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#timeouts CceNode#timeouts}
  */
  readonly timeouts?: CceNodeTimeouts;
}
export interface CceNodeDataVolumes {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#dss_pool_id CceNode#dss_pool_id}
  */
  readonly dssPoolId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#extend_param CceNode#extend_param}
  */
  readonly extendParam?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#extend_params CceNode#extend_params}
  */
  readonly extendParams?: { [key: string]: string };
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#hw_passthrough CceNode#hw_passthrough}
  */
  readonly hwPassthrough?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#kms_key_id CceNode#kms_key_id}
  */
  readonly kmsKeyId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#size CceNode#size}
  */
  readonly size: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#volumetype CceNode#volumetype}
  */
  readonly volumetype: string;
}

export function cceNodeDataVolumesToTerraform(struct?: CceNodeDataVolumes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dss_pool_id: cdktf.stringToTerraform(struct!.dssPoolId),
    extend_param: cdktf.stringToTerraform(struct!.extendParam),
    extend_params: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.extendParams),
    hw_passthrough: cdktf.booleanToTerraform(struct!.hwPassthrough),
    kms_key_id: cdktf.stringToTerraform(struct!.kmsKeyId),
    size: cdktf.numberToTerraform(struct!.size),
    volumetype: cdktf.stringToTerraform(struct!.volumetype),
  }
}


export function cceNodeDataVolumesToHclTerraform(struct?: CceNodeDataVolumes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    dss_pool_id: {
      value: cdktf.stringToHclTerraform(struct!.dssPoolId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    extend_param: {
      value: cdktf.stringToHclTerraform(struct!.extendParam),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    extend_params: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.extendParams),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    hw_passthrough: {
      value: cdktf.booleanToHclTerraform(struct!.hwPassthrough),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    kms_key_id: {
      value: cdktf.stringToHclTerraform(struct!.kmsKeyId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    volumetype: {
      value: cdktf.stringToHclTerraform(struct!.volumetype),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodeDataVolumesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodeDataVolumes | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dssPoolId !== undefined) {
      hasAnyValues = true;
      internalValueResult.dssPoolId = this._dssPoolId;
    }
    if (this._extendParam !== undefined) {
      hasAnyValues = true;
      internalValueResult.extendParam = this._extendParam;
    }
    if (this._extendParams !== undefined) {
      hasAnyValues = true;
      internalValueResult.extendParams = this._extendParams;
    }
    if (this._hwPassthrough !== undefined) {
      hasAnyValues = true;
      internalValueResult.hwPassthrough = this._hwPassthrough;
    }
    if (this._kmsKeyId !== undefined) {
      hasAnyValues = true;
      internalValueResult.kmsKeyId = this._kmsKeyId;
    }
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    if (this._volumetype !== undefined) {
      hasAnyValues = true;
      internalValueResult.volumetype = this._volumetype;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodeDataVolumes | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._dssPoolId = undefined;
      this._extendParam = undefined;
      this._extendParams = undefined;
      this._hwPassthrough = undefined;
      this._kmsKeyId = undefined;
      this._size = undefined;
      this._volumetype = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._dssPoolId = value.dssPoolId;
      this._extendParam = value.extendParam;
      this._extendParams = value.extendParams;
      this._hwPassthrough = value.hwPassthrough;
      this._kmsKeyId = value.kmsKeyId;
      this._size = value.size;
      this._volumetype = value.volumetype;
    }
  }

  // dss_pool_id - computed: true, optional: true, required: false
  private _dssPoolId?: string; 
  public get dssPoolId() {
    return this.getStringAttribute('dss_pool_id');
  }
  public set dssPoolId(value: string) {
    this._dssPoolId = value;
  }
  public resetDssPoolId() {
    this._dssPoolId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dssPoolIdInput() {
    return this._dssPoolId;
  }

  // extend_param - computed: false, optional: true, required: false
  private _extendParam?: string; 
  public get extendParam() {
    return this.getStringAttribute('extend_param');
  }
  public set extendParam(value: string) {
    this._extendParam = value;
  }
  public resetExtendParam() {
    this._extendParam = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendParamInput() {
    return this._extendParam;
  }

  // extend_params - computed: true, optional: true, required: false
  private _extendParams?: { [key: string]: string }; 
  public get extendParams() {
    return this.getStringMapAttribute('extend_params');
  }
  public set extendParams(value: { [key: string]: string }) {
    this._extendParams = value;
  }
  public resetExtendParams() {
    this._extendParams = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendParamsInput() {
    return this._extendParams;
  }

  // hw_passthrough - computed: false, optional: true, required: false
  private _hwPassthrough?: boolean | cdktf.IResolvable; 
  public get hwPassthrough() {
    return this.getBooleanAttribute('hw_passthrough');
  }
  public set hwPassthrough(value: boolean | cdktf.IResolvable) {
    this._hwPassthrough = value;
  }
  public resetHwPassthrough() {
    this._hwPassthrough = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hwPassthroughInput() {
    return this._hwPassthrough;
  }

  // kms_key_id - computed: true, optional: true, required: false
  private _kmsKeyId?: string; 
  public get kmsKeyId() {
    return this.getStringAttribute('kms_key_id');
  }
  public set kmsKeyId(value: string) {
    this._kmsKeyId = value;
  }
  public resetKmsKeyId() {
    this._kmsKeyId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kmsKeyIdInput() {
    return this._kmsKeyId;
  }

  // size - computed: false, optional: false, required: true
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // volumetype - computed: false, optional: false, required: true
  private _volumetype?: string; 
  public get volumetype() {
    return this.getStringAttribute('volumetype');
  }
  public set volumetype(value: string) {
    this._volumetype = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumetypeInput() {
    return this._volumetype;
  }
}

export class CceNodeDataVolumesList extends cdktf.ComplexList {
  public internalValue? : CceNodeDataVolumes[] | cdktf.IResolvable

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
  public get(index: number): CceNodeDataVolumesOutputReference {
    return new CceNodeDataVolumesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodeExtendParams {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#agency_name CceNode#agency_name}
  */
  readonly agencyName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#docker_base_size CceNode#docker_base_size}
  */
  readonly dockerBaseSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#kube_reserved_mem CceNode#kube_reserved_mem}
  */
  readonly kubeReservedMem?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#market_type CceNode#market_type}
  */
  readonly marketType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#max_pods CceNode#max_pods}
  */
  readonly maxPods?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#nic_threshold CceNode#nic_threshold}
  */
  readonly nicThreshold?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#node_image_id CceNode#node_image_id}
  */
  readonly nodeImageId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#node_multi_queue CceNode#node_multi_queue}
  */
  readonly nodeMultiQueue?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#postinstall CceNode#postinstall}
  */
  readonly postinstall?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#preinstall CceNode#preinstall}
  */
  readonly preinstall?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#spot_price CceNode#spot_price}
  */
  readonly spotPrice?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#system_reserved_mem CceNode#system_reserved_mem}
  */
  readonly systemReservedMem?: number;
}

export function cceNodeExtendParamsToTerraform(struct?: CceNodeExtendParamsOutputReference | CceNodeExtendParams): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    agency_name: cdktf.stringToTerraform(struct!.agencyName),
    docker_base_size: cdktf.numberToTerraform(struct!.dockerBaseSize),
    kube_reserved_mem: cdktf.numberToTerraform(struct!.kubeReservedMem),
    market_type: cdktf.stringToTerraform(struct!.marketType),
    max_pods: cdktf.numberToTerraform(struct!.maxPods),
    nic_threshold: cdktf.stringToTerraform(struct!.nicThreshold),
    node_image_id: cdktf.stringToTerraform(struct!.nodeImageId),
    node_multi_queue: cdktf.stringToTerraform(struct!.nodeMultiQueue),
    postinstall: cdktf.stringToTerraform(struct!.postinstall),
    preinstall: cdktf.stringToTerraform(struct!.preinstall),
    spot_price: cdktf.stringToTerraform(struct!.spotPrice),
    system_reserved_mem: cdktf.numberToTerraform(struct!.systemReservedMem),
  }
}


export function cceNodeExtendParamsToHclTerraform(struct?: CceNodeExtendParamsOutputReference | CceNodeExtendParams): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    agency_name: {
      value: cdktf.stringToHclTerraform(struct!.agencyName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    docker_base_size: {
      value: cdktf.numberToHclTerraform(struct!.dockerBaseSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    kube_reserved_mem: {
      value: cdktf.numberToHclTerraform(struct!.kubeReservedMem),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    market_type: {
      value: cdktf.stringToHclTerraform(struct!.marketType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_pods: {
      value: cdktf.numberToHclTerraform(struct!.maxPods),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    nic_threshold: {
      value: cdktf.stringToHclTerraform(struct!.nicThreshold),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    node_image_id: {
      value: cdktf.stringToHclTerraform(struct!.nodeImageId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    node_multi_queue: {
      value: cdktf.stringToHclTerraform(struct!.nodeMultiQueue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    postinstall: {
      value: cdktf.stringToHclTerraform(struct!.postinstall),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    preinstall: {
      value: cdktf.stringToHclTerraform(struct!.preinstall),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    spot_price: {
      value: cdktf.stringToHclTerraform(struct!.spotPrice),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    system_reserved_mem: {
      value: cdktf.numberToHclTerraform(struct!.systemReservedMem),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodeExtendParamsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodeExtendParams | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._agencyName !== undefined) {
      hasAnyValues = true;
      internalValueResult.agencyName = this._agencyName;
    }
    if (this._dockerBaseSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.dockerBaseSize = this._dockerBaseSize;
    }
    if (this._kubeReservedMem !== undefined) {
      hasAnyValues = true;
      internalValueResult.kubeReservedMem = this._kubeReservedMem;
    }
    if (this._marketType !== undefined) {
      hasAnyValues = true;
      internalValueResult.marketType = this._marketType;
    }
    if (this._maxPods !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxPods = this._maxPods;
    }
    if (this._nicThreshold !== undefined) {
      hasAnyValues = true;
      internalValueResult.nicThreshold = this._nicThreshold;
    }
    if (this._nodeImageId !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodeImageId = this._nodeImageId;
    }
    if (this._nodeMultiQueue !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodeMultiQueue = this._nodeMultiQueue;
    }
    if (this._postinstall !== undefined) {
      hasAnyValues = true;
      internalValueResult.postinstall = this._postinstall;
    }
    if (this._preinstall !== undefined) {
      hasAnyValues = true;
      internalValueResult.preinstall = this._preinstall;
    }
    if (this._spotPrice !== undefined) {
      hasAnyValues = true;
      internalValueResult.spotPrice = this._spotPrice;
    }
    if (this._systemReservedMem !== undefined) {
      hasAnyValues = true;
      internalValueResult.systemReservedMem = this._systemReservedMem;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodeExtendParams | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._agencyName = undefined;
      this._dockerBaseSize = undefined;
      this._kubeReservedMem = undefined;
      this._marketType = undefined;
      this._maxPods = undefined;
      this._nicThreshold = undefined;
      this._nodeImageId = undefined;
      this._nodeMultiQueue = undefined;
      this._postinstall = undefined;
      this._preinstall = undefined;
      this._spotPrice = undefined;
      this._systemReservedMem = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._agencyName = value.agencyName;
      this._dockerBaseSize = value.dockerBaseSize;
      this._kubeReservedMem = value.kubeReservedMem;
      this._marketType = value.marketType;
      this._maxPods = value.maxPods;
      this._nicThreshold = value.nicThreshold;
      this._nodeImageId = value.nodeImageId;
      this._nodeMultiQueue = value.nodeMultiQueue;
      this._postinstall = value.postinstall;
      this._preinstall = value.preinstall;
      this._spotPrice = value.spotPrice;
      this._systemReservedMem = value.systemReservedMem;
    }
  }

  // agency_name - computed: false, optional: true, required: false
  private _agencyName?: string; 
  public get agencyName() {
    return this.getStringAttribute('agency_name');
  }
  public set agencyName(value: string) {
    this._agencyName = value;
  }
  public resetAgencyName() {
    this._agencyName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get agencyNameInput() {
    return this._agencyName;
  }

  // docker_base_size - computed: false, optional: true, required: false
  private _dockerBaseSize?: number; 
  public get dockerBaseSize() {
    return this.getNumberAttribute('docker_base_size');
  }
  public set dockerBaseSize(value: number) {
    this._dockerBaseSize = value;
  }
  public resetDockerBaseSize() {
    this._dockerBaseSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dockerBaseSizeInput() {
    return this._dockerBaseSize;
  }

  // kube_reserved_mem - computed: false, optional: true, required: false
  private _kubeReservedMem?: number; 
  public get kubeReservedMem() {
    return this.getNumberAttribute('kube_reserved_mem');
  }
  public set kubeReservedMem(value: number) {
    this._kubeReservedMem = value;
  }
  public resetKubeReservedMem() {
    this._kubeReservedMem = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kubeReservedMemInput() {
    return this._kubeReservedMem;
  }

  // market_type - computed: false, optional: true, required: false
  private _marketType?: string; 
  public get marketType() {
    return this.getStringAttribute('market_type');
  }
  public set marketType(value: string) {
    this._marketType = value;
  }
  public resetMarketType() {
    this._marketType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get marketTypeInput() {
    return this._marketType;
  }

  // max_pods - computed: false, optional: true, required: false
  private _maxPods?: number; 
  public get maxPods() {
    return this.getNumberAttribute('max_pods');
  }
  public set maxPods(value: number) {
    this._maxPods = value;
  }
  public resetMaxPods() {
    this._maxPods = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxPodsInput() {
    return this._maxPods;
  }

  // nic_threshold - computed: false, optional: true, required: false
  private _nicThreshold?: string; 
  public get nicThreshold() {
    return this.getStringAttribute('nic_threshold');
  }
  public set nicThreshold(value: string) {
    this._nicThreshold = value;
  }
  public resetNicThreshold() {
    this._nicThreshold = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nicThresholdInput() {
    return this._nicThreshold;
  }

  // node_image_id - computed: false, optional: true, required: false
  private _nodeImageId?: string; 
  public get nodeImageId() {
    return this.getStringAttribute('node_image_id');
  }
  public set nodeImageId(value: string) {
    this._nodeImageId = value;
  }
  public resetNodeImageId() {
    this._nodeImageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeImageIdInput() {
    return this._nodeImageId;
  }

  // node_multi_queue - computed: false, optional: true, required: false
  private _nodeMultiQueue?: string; 
  public get nodeMultiQueue() {
    return this.getStringAttribute('node_multi_queue');
  }
  public set nodeMultiQueue(value: string) {
    this._nodeMultiQueue = value;
  }
  public resetNodeMultiQueue() {
    this._nodeMultiQueue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeMultiQueueInput() {
    return this._nodeMultiQueue;
  }

  // postinstall - computed: false, optional: true, required: false
  private _postinstall?: string; 
  public get postinstall() {
    return this.getStringAttribute('postinstall');
  }
  public set postinstall(value: string) {
    this._postinstall = value;
  }
  public resetPostinstall() {
    this._postinstall = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get postinstallInput() {
    return this._postinstall;
  }

  // preinstall - computed: false, optional: true, required: false
  private _preinstall?: string; 
  public get preinstall() {
    return this.getStringAttribute('preinstall');
  }
  public set preinstall(value: string) {
    this._preinstall = value;
  }
  public resetPreinstall() {
    this._preinstall = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get preinstallInput() {
    return this._preinstall;
  }

  // spot_price - computed: false, optional: true, required: false
  private _spotPrice?: string; 
  public get spotPrice() {
    return this.getStringAttribute('spot_price');
  }
  public set spotPrice(value: string) {
    this._spotPrice = value;
  }
  public resetSpotPrice() {
    this._spotPrice = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get spotPriceInput() {
    return this._spotPrice;
  }

  // system_reserved_mem - computed: false, optional: true, required: false
  private _systemReservedMem?: number; 
  public get systemReservedMem() {
    return this.getNumberAttribute('system_reserved_mem');
  }
  public set systemReservedMem(value: number) {
    this._systemReservedMem = value;
  }
  public resetSystemReservedMem() {
    this._systemReservedMem = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get systemReservedMemInput() {
    return this._systemReservedMem;
  }
}
export interface CceNodeExtensionNics {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#subnet_id CceNode#subnet_id}
  */
  readonly subnetId: string;
}

export function cceNodeExtensionNicsToTerraform(struct?: CceNodeExtensionNics | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    subnet_id: cdktf.stringToTerraform(struct!.subnetId),
  }
}


export function cceNodeExtensionNicsToHclTerraform(struct?: CceNodeExtensionNics | cdktf.IResolvable): any {
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

export class CceNodeExtensionNicsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodeExtensionNics | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CceNodeExtensionNics | cdktf.IResolvable | undefined) {
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

export class CceNodeExtensionNicsList extends cdktf.ComplexList {
  public internalValue? : CceNodeExtensionNics[] | cdktf.IResolvable

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
  public get(index: number): CceNodeExtensionNicsOutputReference {
    return new CceNodeExtensionNicsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodeHostnameConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#type CceNode#type}
  */
  readonly type: string;
}

export function cceNodeHostnameConfigToTerraform(struct?: CceNodeHostnameConfigOutputReference | CceNodeHostnameConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function cceNodeHostnameConfigToHclTerraform(struct?: CceNodeHostnameConfigOutputReference | CceNodeHostnameConfig): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodeHostnameConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodeHostnameConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodeHostnameConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._type = value.type;
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
}
export interface CceNodeRootVolume {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#dss_pool_id CceNode#dss_pool_id}
  */
  readonly dssPoolId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#extend_param CceNode#extend_param}
  */
  readonly extendParam?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#extend_params CceNode#extend_params}
  */
  readonly extendParams?: { [key: string]: string };
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#hw_passthrough CceNode#hw_passthrough}
  */
  readonly hwPassthrough?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#kms_key_id CceNode#kms_key_id}
  */
  readonly kmsKeyId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#size CceNode#size}
  */
  readonly size: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#volumetype CceNode#volumetype}
  */
  readonly volumetype: string;
}

export function cceNodeRootVolumeToTerraform(struct?: CceNodeRootVolumeOutputReference | CceNodeRootVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dss_pool_id: cdktf.stringToTerraform(struct!.dssPoolId),
    extend_param: cdktf.stringToTerraform(struct!.extendParam),
    extend_params: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.extendParams),
    hw_passthrough: cdktf.booleanToTerraform(struct!.hwPassthrough),
    kms_key_id: cdktf.stringToTerraform(struct!.kmsKeyId),
    size: cdktf.numberToTerraform(struct!.size),
    volumetype: cdktf.stringToTerraform(struct!.volumetype),
  }
}


export function cceNodeRootVolumeToHclTerraform(struct?: CceNodeRootVolumeOutputReference | CceNodeRootVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    dss_pool_id: {
      value: cdktf.stringToHclTerraform(struct!.dssPoolId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    extend_param: {
      value: cdktf.stringToHclTerraform(struct!.extendParam),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    extend_params: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.extendParams),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    hw_passthrough: {
      value: cdktf.booleanToHclTerraform(struct!.hwPassthrough),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    kms_key_id: {
      value: cdktf.stringToHclTerraform(struct!.kmsKeyId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    volumetype: {
      value: cdktf.stringToHclTerraform(struct!.volumetype),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodeRootVolumeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodeRootVolume | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dssPoolId !== undefined) {
      hasAnyValues = true;
      internalValueResult.dssPoolId = this._dssPoolId;
    }
    if (this._extendParam !== undefined) {
      hasAnyValues = true;
      internalValueResult.extendParam = this._extendParam;
    }
    if (this._extendParams !== undefined) {
      hasAnyValues = true;
      internalValueResult.extendParams = this._extendParams;
    }
    if (this._hwPassthrough !== undefined) {
      hasAnyValues = true;
      internalValueResult.hwPassthrough = this._hwPassthrough;
    }
    if (this._kmsKeyId !== undefined) {
      hasAnyValues = true;
      internalValueResult.kmsKeyId = this._kmsKeyId;
    }
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    if (this._volumetype !== undefined) {
      hasAnyValues = true;
      internalValueResult.volumetype = this._volumetype;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodeRootVolume | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._dssPoolId = undefined;
      this._extendParam = undefined;
      this._extendParams = undefined;
      this._hwPassthrough = undefined;
      this._kmsKeyId = undefined;
      this._size = undefined;
      this._volumetype = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._dssPoolId = value.dssPoolId;
      this._extendParam = value.extendParam;
      this._extendParams = value.extendParams;
      this._hwPassthrough = value.hwPassthrough;
      this._kmsKeyId = value.kmsKeyId;
      this._size = value.size;
      this._volumetype = value.volumetype;
    }
  }

  // dss_pool_id - computed: true, optional: true, required: false
  private _dssPoolId?: string; 
  public get dssPoolId() {
    return this.getStringAttribute('dss_pool_id');
  }
  public set dssPoolId(value: string) {
    this._dssPoolId = value;
  }
  public resetDssPoolId() {
    this._dssPoolId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dssPoolIdInput() {
    return this._dssPoolId;
  }

  // extend_param - computed: false, optional: true, required: false
  private _extendParam?: string; 
  public get extendParam() {
    return this.getStringAttribute('extend_param');
  }
  public set extendParam(value: string) {
    this._extendParam = value;
  }
  public resetExtendParam() {
    this._extendParam = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendParamInput() {
    return this._extendParam;
  }

  // extend_params - computed: true, optional: true, required: false
  private _extendParams?: { [key: string]: string }; 
  public get extendParams() {
    return this.getStringMapAttribute('extend_params');
  }
  public set extendParams(value: { [key: string]: string }) {
    this._extendParams = value;
  }
  public resetExtendParams() {
    this._extendParams = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendParamsInput() {
    return this._extendParams;
  }

  // hw_passthrough - computed: false, optional: true, required: false
  private _hwPassthrough?: boolean | cdktf.IResolvable; 
  public get hwPassthrough() {
    return this.getBooleanAttribute('hw_passthrough');
  }
  public set hwPassthrough(value: boolean | cdktf.IResolvable) {
    this._hwPassthrough = value;
  }
  public resetHwPassthrough() {
    this._hwPassthrough = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hwPassthroughInput() {
    return this._hwPassthrough;
  }

  // kms_key_id - computed: true, optional: true, required: false
  private _kmsKeyId?: string; 
  public get kmsKeyId() {
    return this.getStringAttribute('kms_key_id');
  }
  public set kmsKeyId(value: string) {
    this._kmsKeyId = value;
  }
  public resetKmsKeyId() {
    this._kmsKeyId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kmsKeyIdInput() {
    return this._kmsKeyId;
  }

  // size - computed: false, optional: false, required: true
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // volumetype - computed: false, optional: false, required: true
  private _volumetype?: string; 
  public get volumetype() {
    return this.getStringAttribute('volumetype');
  }
  public set volumetype(value: string) {
    this._volumetype = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumetypeInput() {
    return this._volumetype;
  }
}
export interface CceNodeStorageGroupsVirtualSpaces {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#lvm_lv_type CceNode#lvm_lv_type}
  */
  readonly lvmLvType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#lvm_path CceNode#lvm_path}
  */
  readonly lvmPath?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#name CceNode#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#runtime_lv_type CceNode#runtime_lv_type}
  */
  readonly runtimeLvType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#size CceNode#size}
  */
  readonly size: string;
}

export function cceNodeStorageGroupsVirtualSpacesToTerraform(struct?: CceNodeStorageGroupsVirtualSpaces | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    lvm_lv_type: cdktf.stringToTerraform(struct!.lvmLvType),
    lvm_path: cdktf.stringToTerraform(struct!.lvmPath),
    name: cdktf.stringToTerraform(struct!.name),
    runtime_lv_type: cdktf.stringToTerraform(struct!.runtimeLvType),
    size: cdktf.stringToTerraform(struct!.size),
  }
}


export function cceNodeStorageGroupsVirtualSpacesToHclTerraform(struct?: CceNodeStorageGroupsVirtualSpaces | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    lvm_lv_type: {
      value: cdktf.stringToHclTerraform(struct!.lvmLvType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    lvm_path: {
      value: cdktf.stringToHclTerraform(struct!.lvmPath),
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
    runtime_lv_type: {
      value: cdktf.stringToHclTerraform(struct!.runtimeLvType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    size: {
      value: cdktf.stringToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodeStorageGroupsVirtualSpacesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodeStorageGroupsVirtualSpaces | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._lvmLvType !== undefined) {
      hasAnyValues = true;
      internalValueResult.lvmLvType = this._lvmLvType;
    }
    if (this._lvmPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.lvmPath = this._lvmPath;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._runtimeLvType !== undefined) {
      hasAnyValues = true;
      internalValueResult.runtimeLvType = this._runtimeLvType;
    }
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodeStorageGroupsVirtualSpaces | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._lvmLvType = undefined;
      this._lvmPath = undefined;
      this._name = undefined;
      this._runtimeLvType = undefined;
      this._size = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._lvmLvType = value.lvmLvType;
      this._lvmPath = value.lvmPath;
      this._name = value.name;
      this._runtimeLvType = value.runtimeLvType;
      this._size = value.size;
    }
  }

  // lvm_lv_type - computed: false, optional: true, required: false
  private _lvmLvType?: string; 
  public get lvmLvType() {
    return this.getStringAttribute('lvm_lv_type');
  }
  public set lvmLvType(value: string) {
    this._lvmLvType = value;
  }
  public resetLvmLvType() {
    this._lvmLvType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lvmLvTypeInput() {
    return this._lvmLvType;
  }

  // lvm_path - computed: false, optional: true, required: false
  private _lvmPath?: string; 
  public get lvmPath() {
    return this.getStringAttribute('lvm_path');
  }
  public set lvmPath(value: string) {
    this._lvmPath = value;
  }
  public resetLvmPath() {
    this._lvmPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lvmPathInput() {
    return this._lvmPath;
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

  // runtime_lv_type - computed: false, optional: true, required: false
  private _runtimeLvType?: string; 
  public get runtimeLvType() {
    return this.getStringAttribute('runtime_lv_type');
  }
  public set runtimeLvType(value: string) {
    this._runtimeLvType = value;
  }
  public resetRuntimeLvType() {
    this._runtimeLvType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get runtimeLvTypeInput() {
    return this._runtimeLvType;
  }

  // size - computed: false, optional: false, required: true
  private _size?: string; 
  public get size() {
    return this.getStringAttribute('size');
  }
  public set size(value: string) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }
}

export class CceNodeStorageGroupsVirtualSpacesList extends cdktf.ComplexList {
  public internalValue? : CceNodeStorageGroupsVirtualSpaces[] | cdktf.IResolvable

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
  public get(index: number): CceNodeStorageGroupsVirtualSpacesOutputReference {
    return new CceNodeStorageGroupsVirtualSpacesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodeStorageGroups {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#cce_managed CceNode#cce_managed}
  */
  readonly cceManaged?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#name CceNode#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#selector_names CceNode#selector_names}
  */
  readonly selectorNames: string[];
  /**
  * virtual_spaces block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#virtual_spaces CceNode#virtual_spaces}
  */
  readonly virtualSpaces: CceNodeStorageGroupsVirtualSpaces[] | cdktf.IResolvable;
}

export function cceNodeStorageGroupsToTerraform(struct?: CceNodeStorageGroups | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cce_managed: cdktf.booleanToTerraform(struct!.cceManaged),
    name: cdktf.stringToTerraform(struct!.name),
    selector_names: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.selectorNames),
    virtual_spaces: cdktf.listMapper(cceNodeStorageGroupsVirtualSpacesToTerraform, true)(struct!.virtualSpaces),
  }
}


export function cceNodeStorageGroupsToHclTerraform(struct?: CceNodeStorageGroups | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cce_managed: {
      value: cdktf.booleanToHclTerraform(struct!.cceManaged),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    selector_names: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.selectorNames),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    virtual_spaces: {
      value: cdktf.listMapperHcl(cceNodeStorageGroupsVirtualSpacesToHclTerraform, true)(struct!.virtualSpaces),
      isBlock: true,
      type: "list",
      storageClassType: "CceNodeStorageGroupsVirtualSpacesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodeStorageGroupsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodeStorageGroups | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cceManaged !== undefined) {
      hasAnyValues = true;
      internalValueResult.cceManaged = this._cceManaged;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._selectorNames !== undefined) {
      hasAnyValues = true;
      internalValueResult.selectorNames = this._selectorNames;
    }
    if (this._virtualSpaces?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.virtualSpaces = this._virtualSpaces?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodeStorageGroups | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._cceManaged = undefined;
      this._name = undefined;
      this._selectorNames = undefined;
      this._virtualSpaces.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._cceManaged = value.cceManaged;
      this._name = value.name;
      this._selectorNames = value.selectorNames;
      this._virtualSpaces.internalValue = value.virtualSpaces;
    }
  }

  // cce_managed - computed: false, optional: true, required: false
  private _cceManaged?: boolean | cdktf.IResolvable; 
  public get cceManaged() {
    return this.getBooleanAttribute('cce_managed');
  }
  public set cceManaged(value: boolean | cdktf.IResolvable) {
    this._cceManaged = value;
  }
  public resetCceManaged() {
    this._cceManaged = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cceManagedInput() {
    return this._cceManaged;
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

  // selector_names - computed: false, optional: false, required: true
  private _selectorNames?: string[]; 
  public get selectorNames() {
    return this.getListAttribute('selector_names');
  }
  public set selectorNames(value: string[]) {
    this._selectorNames = value;
  }
  // Temporarily expose input value. Use with caution.
  public get selectorNamesInput() {
    return this._selectorNames;
  }

  // virtual_spaces - computed: false, optional: false, required: true
  private _virtualSpaces = new CceNodeStorageGroupsVirtualSpacesList(this, "virtual_spaces", false);
  public get virtualSpaces() {
    return this._virtualSpaces;
  }
  public putVirtualSpaces(value: CceNodeStorageGroupsVirtualSpaces[] | cdktf.IResolvable) {
    this._virtualSpaces.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get virtualSpacesInput() {
    return this._virtualSpaces.internalValue;
  }
}

export class CceNodeStorageGroupsList extends cdktf.ComplexList {
  public internalValue? : CceNodeStorageGroups[] | cdktf.IResolvable

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
  public get(index: number): CceNodeStorageGroupsOutputReference {
    return new CceNodeStorageGroupsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodeStorageSelectors {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#match_label_count CceNode#match_label_count}
  */
  readonly matchLabelCount?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#match_label_metadata_cmkid CceNode#match_label_metadata_cmkid}
  */
  readonly matchLabelMetadataCmkid?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#match_label_metadata_encrypted CceNode#match_label_metadata_encrypted}
  */
  readonly matchLabelMetadataEncrypted?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#match_label_size CceNode#match_label_size}
  */
  readonly matchLabelSize?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#match_label_volume_type CceNode#match_label_volume_type}
  */
  readonly matchLabelVolumeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#name CceNode#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#type CceNode#type}
  */
  readonly type?: string;
}

export function cceNodeStorageSelectorsToTerraform(struct?: CceNodeStorageSelectors | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    match_label_count: cdktf.stringToTerraform(struct!.matchLabelCount),
    match_label_metadata_cmkid: cdktf.stringToTerraform(struct!.matchLabelMetadataCmkid),
    match_label_metadata_encrypted: cdktf.stringToTerraform(struct!.matchLabelMetadataEncrypted),
    match_label_size: cdktf.stringToTerraform(struct!.matchLabelSize),
    match_label_volume_type: cdktf.stringToTerraform(struct!.matchLabelVolumeType),
    name: cdktf.stringToTerraform(struct!.name),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function cceNodeStorageSelectorsToHclTerraform(struct?: CceNodeStorageSelectors | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    match_label_count: {
      value: cdktf.stringToHclTerraform(struct!.matchLabelCount),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    match_label_metadata_cmkid: {
      value: cdktf.stringToHclTerraform(struct!.matchLabelMetadataCmkid),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    match_label_metadata_encrypted: {
      value: cdktf.stringToHclTerraform(struct!.matchLabelMetadataEncrypted),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    match_label_size: {
      value: cdktf.stringToHclTerraform(struct!.matchLabelSize),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    match_label_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.matchLabelVolumeType),
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

export class CceNodeStorageSelectorsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodeStorageSelectors | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._matchLabelCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchLabelCount = this._matchLabelCount;
    }
    if (this._matchLabelMetadataCmkid !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchLabelMetadataCmkid = this._matchLabelMetadataCmkid;
    }
    if (this._matchLabelMetadataEncrypted !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchLabelMetadataEncrypted = this._matchLabelMetadataEncrypted;
    }
    if (this._matchLabelSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchLabelSize = this._matchLabelSize;
    }
    if (this._matchLabelVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.matchLabelVolumeType = this._matchLabelVolumeType;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodeStorageSelectors | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._matchLabelCount = undefined;
      this._matchLabelMetadataCmkid = undefined;
      this._matchLabelMetadataEncrypted = undefined;
      this._matchLabelSize = undefined;
      this._matchLabelVolumeType = undefined;
      this._name = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._matchLabelCount = value.matchLabelCount;
      this._matchLabelMetadataCmkid = value.matchLabelMetadataCmkid;
      this._matchLabelMetadataEncrypted = value.matchLabelMetadataEncrypted;
      this._matchLabelSize = value.matchLabelSize;
      this._matchLabelVolumeType = value.matchLabelVolumeType;
      this._name = value.name;
      this._type = value.type;
    }
  }

  // match_label_count - computed: false, optional: true, required: false
  private _matchLabelCount?: string; 
  public get matchLabelCount() {
    return this.getStringAttribute('match_label_count');
  }
  public set matchLabelCount(value: string) {
    this._matchLabelCount = value;
  }
  public resetMatchLabelCount() {
    this._matchLabelCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchLabelCountInput() {
    return this._matchLabelCount;
  }

  // match_label_metadata_cmkid - computed: false, optional: true, required: false
  private _matchLabelMetadataCmkid?: string; 
  public get matchLabelMetadataCmkid() {
    return this.getStringAttribute('match_label_metadata_cmkid');
  }
  public set matchLabelMetadataCmkid(value: string) {
    this._matchLabelMetadataCmkid = value;
  }
  public resetMatchLabelMetadataCmkid() {
    this._matchLabelMetadataCmkid = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchLabelMetadataCmkidInput() {
    return this._matchLabelMetadataCmkid;
  }

  // match_label_metadata_encrypted - computed: false, optional: true, required: false
  private _matchLabelMetadataEncrypted?: string; 
  public get matchLabelMetadataEncrypted() {
    return this.getStringAttribute('match_label_metadata_encrypted');
  }
  public set matchLabelMetadataEncrypted(value: string) {
    this._matchLabelMetadataEncrypted = value;
  }
  public resetMatchLabelMetadataEncrypted() {
    this._matchLabelMetadataEncrypted = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchLabelMetadataEncryptedInput() {
    return this._matchLabelMetadataEncrypted;
  }

  // match_label_size - computed: false, optional: true, required: false
  private _matchLabelSize?: string; 
  public get matchLabelSize() {
    return this.getStringAttribute('match_label_size');
  }
  public set matchLabelSize(value: string) {
    this._matchLabelSize = value;
  }
  public resetMatchLabelSize() {
    this._matchLabelSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchLabelSizeInput() {
    return this._matchLabelSize;
  }

  // match_label_volume_type - computed: false, optional: true, required: false
  private _matchLabelVolumeType?: string; 
  public get matchLabelVolumeType() {
    return this.getStringAttribute('match_label_volume_type');
  }
  public set matchLabelVolumeType(value: string) {
    this._matchLabelVolumeType = value;
  }
  public resetMatchLabelVolumeType() {
    this._matchLabelVolumeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchLabelVolumeTypeInput() {
    return this._matchLabelVolumeType;
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

  // type - computed: false, optional: true, required: false
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

export class CceNodeStorageSelectorsList extends cdktf.ComplexList {
  public internalValue? : CceNodeStorageSelectors[] | cdktf.IResolvable

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
  public get(index: number): CceNodeStorageSelectorsOutputReference {
    return new CceNodeStorageSelectorsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodeStorage {
  /**
  * groups block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#groups CceNode#groups}
  */
  readonly groups: CceNodeStorageGroups[] | cdktf.IResolvable;
  /**
  * selectors block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#selectors CceNode#selectors}
  */
  readonly selectors: CceNodeStorageSelectors[] | cdktf.IResolvable;
}

export function cceNodeStorageToTerraform(struct?: CceNodeStorageOutputReference | CceNodeStorage): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    groups: cdktf.listMapper(cceNodeStorageGroupsToTerraform, true)(struct!.groups),
    selectors: cdktf.listMapper(cceNodeStorageSelectorsToTerraform, true)(struct!.selectors),
  }
}


export function cceNodeStorageToHclTerraform(struct?: CceNodeStorageOutputReference | CceNodeStorage): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    groups: {
      value: cdktf.listMapperHcl(cceNodeStorageGroupsToHclTerraform, true)(struct!.groups),
      isBlock: true,
      type: "list",
      storageClassType: "CceNodeStorageGroupsList",
    },
    selectors: {
      value: cdktf.listMapperHcl(cceNodeStorageSelectorsToHclTerraform, true)(struct!.selectors),
      isBlock: true,
      type: "list",
      storageClassType: "CceNodeStorageSelectorsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodeStorageOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodeStorage | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._groups?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.groups = this._groups?.internalValue;
    }
    if (this._selectors?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.selectors = this._selectors?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodeStorage | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._groups.internalValue = undefined;
      this._selectors.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._groups.internalValue = value.groups;
      this._selectors.internalValue = value.selectors;
    }
  }

  // groups - computed: false, optional: false, required: true
  private _groups = new CceNodeStorageGroupsList(this, "groups", false);
  public get groups() {
    return this._groups;
  }
  public putGroups(value: CceNodeStorageGroups[] | cdktf.IResolvable) {
    this._groups.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupsInput() {
    return this._groups.internalValue;
  }

  // selectors - computed: false, optional: false, required: true
  private _selectors = new CceNodeStorageSelectorsList(this, "selectors", false);
  public get selectors() {
    return this._selectors;
  }
  public putSelectors(value: CceNodeStorageSelectors[] | cdktf.IResolvable) {
    this._selectors.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get selectorsInput() {
    return this._selectors.internalValue;
  }
}
export interface CceNodeTaints {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#effect CceNode#effect}
  */
  readonly effect: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#key CceNode#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#value CceNode#value}
  */
  readonly value?: string;
}

export function cceNodeTaintsToTerraform(struct?: CceNodeTaints | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    effect: cdktf.stringToTerraform(struct!.effect),
    key: cdktf.stringToTerraform(struct!.key),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function cceNodeTaintsToHclTerraform(struct?: CceNodeTaints | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    effect: {
      value: cdktf.stringToHclTerraform(struct!.effect),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodeTaintsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodeTaints | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._effect !== undefined) {
      hasAnyValues = true;
      internalValueResult.effect = this._effect;
    }
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodeTaints | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._effect = undefined;
      this._key = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._effect = value.effect;
      this._key = value.key;
      this._value = value.value;
    }
  }

  // effect - computed: false, optional: false, required: true
  private _effect?: string; 
  public get effect() {
    return this.getStringAttribute('effect');
  }
  public set effect(value: string) {
    this._effect = value;
  }
  // Temporarily expose input value. Use with caution.
  public get effectInput() {
    return this._effect;
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

export class CceNodeTaintsList extends cdktf.ComplexList {
  public internalValue? : CceNodeTaints[] | cdktf.IResolvable

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
  public get(index: number): CceNodeTaintsOutputReference {
    return new CceNodeTaintsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodeTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#create CceNode#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#delete CceNode#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#update CceNode#update}
  */
  readonly update?: string;
}

export function cceNodeTimeoutsToTerraform(struct?: CceNodeTimeouts | cdktf.IResolvable): any {
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


export function cceNodeTimeoutsToHclTerraform(struct?: CceNodeTimeouts | cdktf.IResolvable): any {
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

export class CceNodeTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CceNodeTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CceNodeTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node huaweicloud_cce_node}
*/
export class CceNode extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cce_node";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CceNode resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CceNode to import
  * @param importFromId The id of the existing CceNode that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CceNode to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cce_node", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node huaweicloud_cce_node} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CceNodeConfig
  */
  public constructor(scope: Construct, id: string, config: CceNodeConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cce_node',
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
    this._annotations = config.annotations;
    this._autoPay = config.autoPay;
    this._autoRenew = config.autoRenew;
    this._availabilityZone = config.availabilityZone;
    this._bandwidthChargeMode = config.bandwidthChargeMode;
    this._bandwidthSize = config.bandwidthSize;
    this._billingMode = config.billingMode;
    this._chargingMode = config.chargingMode;
    this._clusterId = config.clusterId;
    this._dedicatedHostId = config.dedicatedHostId;
    this._ecsGroupId = config.ecsGroupId;
    this._ecsPerformanceType = config.ecsPerformanceType;
    this._eipId = config.eipId;
    this._eipIds = config.eipIds;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._extendParam = config.extendParam;
    this._extendParamChargingMode = config.extendParamChargingMode;
    this._fixedIp = config.fixedIp;
    this._flavorId = config.flavorId;
    this._id = config.id;
    this._initializedConditions = config.initializedConditions;
    this._iptype = config.iptype;
    this._keepEcs = config.keepEcs;
    this._keyPair = config.keyPair;
    this._labels = config.labels;
    this._maxPods = config.maxPods;
    this._name = config.name;
    this._orderId = config.orderId;
    this._os = config.os;
    this._partition = config.partition;
    this._password = config.password;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._postinstall = config.postinstall;
    this._preinstall = config.preinstall;
    this._privateKey = config.privateKey;
    this._productId = config.productId;
    this._publicKey = config.publicKey;
    this._region = config.region;
    this._runtime = config.runtime;
    this._sharetype = config.sharetype;
    this._subnetId = config.subnetId;
    this._tags = config.tags;
    this._dataVolumes.internalValue = config.dataVolumes;
    this._extendParams.internalValue = config.extendParams;
    this._extensionNics.internalValue = config.extensionNics;
    this._hostnameConfig.internalValue = config.hostnameConfig;
    this._rootVolume.internalValue = config.rootVolume;
    this._storage.internalValue = config.storage;
    this._taints.internalValue = config.taints;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // annotations - computed: false, optional: true, required: false
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

  // auto_pay - computed: false, optional: true, required: false
  private _autoPay?: string; 
  public get autoPay() {
    return this.getStringAttribute('auto_pay');
  }
  public set autoPay(value: string) {
    this._autoPay = value;
  }
  public resetAutoPay() {
    this._autoPay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoPayInput() {
    return this._autoPay;
  }

  // auto_renew - computed: false, optional: true, required: false
  private _autoRenew?: string; 
  public get autoRenew() {
    return this.getStringAttribute('auto_renew');
  }
  public set autoRenew(value: string) {
    this._autoRenew = value;
  }
  public resetAutoRenew() {
    this._autoRenew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoRenewInput() {
    return this._autoRenew;
  }

  // availability_zone - computed: false, optional: false, required: true
  private _availabilityZone?: string; 
  public get availabilityZone() {
    return this.getStringAttribute('availability_zone');
  }
  public set availabilityZone(value: string) {
    this._availabilityZone = value;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZoneInput() {
    return this._availabilityZone;
  }

  // bandwidth_charge_mode - computed: false, optional: true, required: false
  private _bandwidthChargeMode?: string; 
  public get bandwidthChargeMode() {
    return this.getStringAttribute('bandwidth_charge_mode');
  }
  public set bandwidthChargeMode(value: string) {
    this._bandwidthChargeMode = value;
  }
  public resetBandwidthChargeMode() {
    this._bandwidthChargeMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthChargeModeInput() {
    return this._bandwidthChargeMode;
  }

  // bandwidth_size - computed: false, optional: true, required: false
  private _bandwidthSize?: number; 
  public get bandwidthSize() {
    return this.getNumberAttribute('bandwidth_size');
  }
  public set bandwidthSize(value: number) {
    this._bandwidthSize = value;
  }
  public resetBandwidthSize() {
    this._bandwidthSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthSizeInput() {
    return this._bandwidthSize;
  }

  // billing_mode - computed: true, optional: true, required: false
  private _billingMode?: number; 
  public get billingMode() {
    return this.getNumberAttribute('billing_mode');
  }
  public set billingMode(value: number) {
    this._billingMode = value;
  }
  public resetBillingMode() {
    this._billingMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get billingModeInput() {
    return this._billingMode;
  }

  // charging_mode - computed: true, optional: true, required: false
  private _chargingMode?: string; 
  public get chargingMode() {
    return this.getStringAttribute('charging_mode');
  }
  public set chargingMode(value: string) {
    this._chargingMode = value;
  }
  public resetChargingMode() {
    this._chargingMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get chargingModeInput() {
    return this._chargingMode;
  }

  // cluster_id - computed: false, optional: false, required: true
  private _clusterId?: string; 
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }
  public set clusterId(value: string) {
    this._clusterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterIdInput() {
    return this._clusterId;
  }

  // dedicated_host_id - computed: false, optional: true, required: false
  private _dedicatedHostId?: string; 
  public get dedicatedHostId() {
    return this.getStringAttribute('dedicated_host_id');
  }
  public set dedicatedHostId(value: string) {
    this._dedicatedHostId = value;
  }
  public resetDedicatedHostId() {
    this._dedicatedHostId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dedicatedHostIdInput() {
    return this._dedicatedHostId;
  }

  // ecs_group_id - computed: false, optional: true, required: false
  private _ecsGroupId?: string; 
  public get ecsGroupId() {
    return this.getStringAttribute('ecs_group_id');
  }
  public set ecsGroupId(value: string) {
    this._ecsGroupId = value;
  }
  public resetEcsGroupId() {
    this._ecsGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ecsGroupIdInput() {
    return this._ecsGroupId;
  }

  // ecs_performance_type - computed: false, optional: true, required: false
  private _ecsPerformanceType?: string; 
  public get ecsPerformanceType() {
    return this.getStringAttribute('ecs_performance_type');
  }
  public set ecsPerformanceType(value: string) {
    this._ecsPerformanceType = value;
  }
  public resetEcsPerformanceType() {
    this._ecsPerformanceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ecsPerformanceTypeInput() {
    return this._ecsPerformanceType;
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

  // eip_ids - computed: false, optional: true, required: false
  private _eipIds?: string[]; 
  public get eipIds() {
    return cdktf.Fn.tolist(this.getListAttribute('eip_ids'));
  }
  public set eipIds(value: string[]) {
    this._eipIds = value;
  }
  public resetEipIds() {
    this._eipIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eipIdsInput() {
    return this._eipIds;
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

  // extend_param - computed: false, optional: true, required: false
  private _extendParam?: { [key: string]: string }; 
  public get extendParam() {
    return this.getStringMapAttribute('extend_param');
  }
  public set extendParam(value: { [key: string]: string }) {
    this._extendParam = value;
  }
  public resetExtendParam() {
    this._extendParam = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendParamInput() {
    return this._extendParam;
  }

  // extend_param_charging_mode - computed: false, optional: true, required: false
  private _extendParamChargingMode?: number; 
  public get extendParamChargingMode() {
    return this.getNumberAttribute('extend_param_charging_mode');
  }
  public set extendParamChargingMode(value: number) {
    this._extendParamChargingMode = value;
  }
  public resetExtendParamChargingMode() {
    this._extendParamChargingMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendParamChargingModeInput() {
    return this._extendParamChargingMode;
  }

  // fixed_ip - computed: false, optional: true, required: false
  private _fixedIp?: string; 
  public get fixedIp() {
    return this.getStringAttribute('fixed_ip');
  }
  public set fixedIp(value: string) {
    this._fixedIp = value;
  }
  public resetFixedIp() {
    this._fixedIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fixedIpInput() {
    return this._fixedIp;
  }

  // flavor_id - computed: false, optional: false, required: true
  private _flavorId?: string; 
  public get flavorId() {
    return this.getStringAttribute('flavor_id');
  }
  public set flavorId(value: string) {
    this._flavorId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorIdInput() {
    return this._flavorId;
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

  // initialized_conditions - computed: true, optional: true, required: false
  private _initializedConditions?: string[]; 
  public get initializedConditions() {
    return this.getListAttribute('initialized_conditions');
  }
  public set initializedConditions(value: string[]) {
    this._initializedConditions = value;
  }
  public resetInitializedConditions() {
    this._initializedConditions = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get initializedConditionsInput() {
    return this._initializedConditions;
  }

  // iptype - computed: false, optional: true, required: false
  private _iptype?: string; 
  public get iptype() {
    return this.getStringAttribute('iptype');
  }
  public set iptype(value: string) {
    this._iptype = value;
  }
  public resetIptype() {
    this._iptype = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get iptypeInput() {
    return this._iptype;
  }

  // keep_ecs - computed: false, optional: true, required: false
  private _keepEcs?: boolean | cdktf.IResolvable; 
  public get keepEcs() {
    return this.getBooleanAttribute('keep_ecs');
  }
  public set keepEcs(value: boolean | cdktf.IResolvable) {
    this._keepEcs = value;
  }
  public resetKeepEcs() {
    this._keepEcs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keepEcsInput() {
    return this._keepEcs;
  }

  // key_pair - computed: false, optional: true, required: false
  private _keyPair?: string; 
  public get keyPair() {
    return this.getStringAttribute('key_pair');
  }
  public set keyPair(value: string) {
    this._keyPair = value;
  }
  public resetKeyPair() {
    this._keyPair = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyPairInput() {
    return this._keyPair;
  }

  // labels - computed: false, optional: true, required: false
  private _labels?: { [key: string]: string }; 
  public get labels() {
    return this.getStringMapAttribute('labels');
  }
  public set labels(value: { [key: string]: string }) {
    this._labels = value;
  }
  public resetLabels() {
    this._labels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get labelsInput() {
    return this._labels;
  }

  // max_pods - computed: false, optional: true, required: false
  private _maxPods?: number; 
  public get maxPods() {
    return this.getNumberAttribute('max_pods');
  }
  public set maxPods(value: number) {
    this._maxPods = value;
  }
  public resetMaxPods() {
    this._maxPods = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxPodsInput() {
    return this._maxPods;
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

  // order_id - computed: false, optional: true, required: false
  private _orderId?: string; 
  public get orderId() {
    return this.getStringAttribute('order_id');
  }
  public set orderId(value: string) {
    this._orderId = value;
  }
  public resetOrderId() {
    this._orderId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get orderIdInput() {
    return this._orderId;
  }

  // os - computed: true, optional: true, required: false
  private _os?: string; 
  public get os() {
    return this.getStringAttribute('os');
  }
  public set os(value: string) {
    this._os = value;
  }
  public resetOs() {
    this._os = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get osInput() {
    return this._os;
  }

  // partition - computed: false, optional: true, required: false
  private _partition?: string; 
  public get partition() {
    return this.getStringAttribute('partition');
  }
  public set partition(value: string) {
    this._partition = value;
  }
  public resetPartition() {
    this._partition = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get partitionInput() {
    return this._partition;
  }

  // password - computed: false, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
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

  // period_unit - computed: false, optional: true, required: false
  private _periodUnit?: string; 
  public get periodUnit() {
    return this.getStringAttribute('period_unit');
  }
  public set periodUnit(value: string) {
    this._periodUnit = value;
  }
  public resetPeriodUnit() {
    this._periodUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodUnitInput() {
    return this._periodUnit;
  }

  // postinstall - computed: false, optional: true, required: false
  private _postinstall?: string; 
  public get postinstall() {
    return this.getStringAttribute('postinstall');
  }
  public set postinstall(value: string) {
    this._postinstall = value;
  }
  public resetPostinstall() {
    this._postinstall = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get postinstallInput() {
    return this._postinstall;
  }

  // preinstall - computed: false, optional: true, required: false
  private _preinstall?: string; 
  public get preinstall() {
    return this.getStringAttribute('preinstall');
  }
  public set preinstall(value: string) {
    this._preinstall = value;
  }
  public resetPreinstall() {
    this._preinstall = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get preinstallInput() {
    return this._preinstall;
  }

  // private_ip - computed: true, optional: false, required: false
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }

  // private_key - computed: false, optional: true, required: false
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

  // product_id - computed: false, optional: true, required: false
  private _productId?: string; 
  public get productId() {
    return this.getStringAttribute('product_id');
  }
  public set productId(value: string) {
    this._productId = value;
  }
  public resetProductId() {
    this._productId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get productIdInput() {
    return this._productId;
  }

  // public_ip - computed: true, optional: false, required: false
  public get publicIp() {
    return this.getStringAttribute('public_ip');
  }

  // public_key - computed: false, optional: true, required: false
  private _publicKey?: string; 
  public get publicKey() {
    return this.getStringAttribute('public_key');
  }
  public set publicKey(value: string) {
    this._publicKey = value;
  }
  public resetPublicKey() {
    this._publicKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicKeyInput() {
    return this._publicKey;
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

  // runtime - computed: true, optional: true, required: false
  private _runtime?: string; 
  public get runtime() {
    return this.getStringAttribute('runtime');
  }
  public set runtime(value: string) {
    this._runtime = value;
  }
  public resetRuntime() {
    this._runtime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get runtimeInput() {
    return this._runtime;
  }

  // server_id - computed: true, optional: false, required: false
  public get serverId() {
    return this.getStringAttribute('server_id');
  }

  // sharetype - computed: false, optional: true, required: false
  private _sharetype?: string; 
  public get sharetype() {
    return this.getStringAttribute('sharetype');
  }
  public set sharetype(value: string) {
    this._sharetype = value;
  }
  public resetSharetype() {
    this._sharetype = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sharetypeInput() {
    return this._sharetype;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // subnet_id - computed: true, optional: true, required: false
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  public resetSubnetId() {
    this._subnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
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

  // data_volumes - computed: false, optional: true, required: false
  private _dataVolumes = new CceNodeDataVolumesList(this, "data_volumes", false);
  public get dataVolumes() {
    return this._dataVolumes;
  }
  public putDataVolumes(value: CceNodeDataVolumes[] | cdktf.IResolvable) {
    this._dataVolumes.internalValue = value;
  }
  public resetDataVolumes() {
    this._dataVolumes.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumesInput() {
    return this._dataVolumes.internalValue;
  }

  // extend_params - computed: false, optional: true, required: false
  private _extendParams = new CceNodeExtendParamsOutputReference(this, "extend_params");
  public get extendParams() {
    return this._extendParams;
  }
  public putExtendParams(value: CceNodeExtendParams) {
    this._extendParams.internalValue = value;
  }
  public resetExtendParams() {
    this._extendParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendParamsInput() {
    return this._extendParams.internalValue;
  }

  // extension_nics - computed: false, optional: true, required: false
  private _extensionNics = new CceNodeExtensionNicsList(this, "extension_nics", false);
  public get extensionNics() {
    return this._extensionNics;
  }
  public putExtensionNics(value: CceNodeExtensionNics[] | cdktf.IResolvable) {
    this._extensionNics.internalValue = value;
  }
  public resetExtensionNics() {
    this._extensionNics.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extensionNicsInput() {
    return this._extensionNics.internalValue;
  }

  // hostname_config - computed: false, optional: true, required: false
  private _hostnameConfig = new CceNodeHostnameConfigOutputReference(this, "hostname_config");
  public get hostnameConfig() {
    return this._hostnameConfig;
  }
  public putHostnameConfig(value: CceNodeHostnameConfig) {
    this._hostnameConfig.internalValue = value;
  }
  public resetHostnameConfig() {
    this._hostnameConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostnameConfigInput() {
    return this._hostnameConfig.internalValue;
  }

  // root_volume - computed: false, optional: false, required: true
  private _rootVolume = new CceNodeRootVolumeOutputReference(this, "root_volume");
  public get rootVolume() {
    return this._rootVolume;
  }
  public putRootVolume(value: CceNodeRootVolume) {
    this._rootVolume.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeInput() {
    return this._rootVolume.internalValue;
  }

  // storage - computed: false, optional: true, required: false
  private _storage = new CceNodeStorageOutputReference(this, "storage");
  public get storage() {
    return this._storage;
  }
  public putStorage(value: CceNodeStorage) {
    this._storage.internalValue = value;
  }
  public resetStorage() {
    this._storage.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storageInput() {
    return this._storage.internalValue;
  }

  // taints - computed: false, optional: true, required: false
  private _taints = new CceNodeTaintsList(this, "taints", false);
  public get taints() {
    return this._taints;
  }
  public putTaints(value: CceNodeTaints[] | cdktf.IResolvable) {
    this._taints.internalValue = value;
  }
  public resetTaints() {
    this._taints.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get taintsInput() {
    return this._taints.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CceNodeTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CceNodeTimeouts) {
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
      annotations: cdktf.hashMapper(cdktf.stringToTerraform)(this._annotations),
      auto_pay: cdktf.stringToTerraform(this._autoPay),
      auto_renew: cdktf.stringToTerraform(this._autoRenew),
      availability_zone: cdktf.stringToTerraform(this._availabilityZone),
      bandwidth_charge_mode: cdktf.stringToTerraform(this._bandwidthChargeMode),
      bandwidth_size: cdktf.numberToTerraform(this._bandwidthSize),
      billing_mode: cdktf.numberToTerraform(this._billingMode),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      dedicated_host_id: cdktf.stringToTerraform(this._dedicatedHostId),
      ecs_group_id: cdktf.stringToTerraform(this._ecsGroupId),
      ecs_performance_type: cdktf.stringToTerraform(this._ecsPerformanceType),
      eip_id: cdktf.stringToTerraform(this._eipId),
      eip_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._eipIds),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      extend_param: cdktf.hashMapper(cdktf.stringToTerraform)(this._extendParam),
      extend_param_charging_mode: cdktf.numberToTerraform(this._extendParamChargingMode),
      fixed_ip: cdktf.stringToTerraform(this._fixedIp),
      flavor_id: cdktf.stringToTerraform(this._flavorId),
      id: cdktf.stringToTerraform(this._id),
      initialized_conditions: cdktf.listMapper(cdktf.stringToTerraform, false)(this._initializedConditions),
      iptype: cdktf.stringToTerraform(this._iptype),
      keep_ecs: cdktf.booleanToTerraform(this._keepEcs),
      key_pair: cdktf.stringToTerraform(this._keyPair),
      labels: cdktf.hashMapper(cdktf.stringToTerraform)(this._labels),
      max_pods: cdktf.numberToTerraform(this._maxPods),
      name: cdktf.stringToTerraform(this._name),
      order_id: cdktf.stringToTerraform(this._orderId),
      os: cdktf.stringToTerraform(this._os),
      partition: cdktf.stringToTerraform(this._partition),
      password: cdktf.stringToTerraform(this._password),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      postinstall: cdktf.stringToTerraform(this._postinstall),
      preinstall: cdktf.stringToTerraform(this._preinstall),
      private_key: cdktf.stringToTerraform(this._privateKey),
      product_id: cdktf.stringToTerraform(this._productId),
      public_key: cdktf.stringToTerraform(this._publicKey),
      region: cdktf.stringToTerraform(this._region),
      runtime: cdktf.stringToTerraform(this._runtime),
      sharetype: cdktf.stringToTerraform(this._sharetype),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      data_volumes: cdktf.listMapper(cceNodeDataVolumesToTerraform, true)(this._dataVolumes.internalValue),
      extend_params: cceNodeExtendParamsToTerraform(this._extendParams.internalValue),
      extension_nics: cdktf.listMapper(cceNodeExtensionNicsToTerraform, true)(this._extensionNics.internalValue),
      hostname_config: cceNodeHostnameConfigToTerraform(this._hostnameConfig.internalValue),
      root_volume: cceNodeRootVolumeToTerraform(this._rootVolume.internalValue),
      storage: cceNodeStorageToTerraform(this._storage.internalValue),
      taints: cdktf.listMapper(cceNodeTaintsToTerraform, true)(this._taints.internalValue),
      timeouts: cceNodeTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      annotations: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._annotations),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      auto_pay: {
        value: cdktf.stringToHclTerraform(this._autoPay),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auto_renew: {
        value: cdktf.stringToHclTerraform(this._autoRenew),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      availability_zone: {
        value: cdktf.stringToHclTerraform(this._availabilityZone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      bandwidth_charge_mode: {
        value: cdktf.stringToHclTerraform(this._bandwidthChargeMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      bandwidth_size: {
        value: cdktf.numberToHclTerraform(this._bandwidthSize),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      billing_mode: {
        value: cdktf.numberToHclTerraform(this._billingMode),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      charging_mode: {
        value: cdktf.stringToHclTerraform(this._chargingMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dedicated_host_id: {
        value: cdktf.stringToHclTerraform(this._dedicatedHostId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ecs_group_id: {
        value: cdktf.stringToHclTerraform(this._ecsGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ecs_performance_type: {
        value: cdktf.stringToHclTerraform(this._ecsPerformanceType),
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
      eip_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._eipIds),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      extend_param: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._extendParam),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      extend_param_charging_mode: {
        value: cdktf.numberToHclTerraform(this._extendParamChargingMode),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      fixed_ip: {
        value: cdktf.stringToHclTerraform(this._fixedIp),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      flavor_id: {
        value: cdktf.stringToHclTerraform(this._flavorId),
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
      initialized_conditions: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._initializedConditions),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      iptype: {
        value: cdktf.stringToHclTerraform(this._iptype),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      keep_ecs: {
        value: cdktf.booleanToHclTerraform(this._keepEcs),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      key_pair: {
        value: cdktf.stringToHclTerraform(this._keyPair),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      labels: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._labels),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      max_pods: {
        value: cdktf.numberToHclTerraform(this._maxPods),
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
      order_id: {
        value: cdktf.stringToHclTerraform(this._orderId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      os: {
        value: cdktf.stringToHclTerraform(this._os),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      partition: {
        value: cdktf.stringToHclTerraform(this._partition),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      password: {
        value: cdktf.stringToHclTerraform(this._password),
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
      period_unit: {
        value: cdktf.stringToHclTerraform(this._periodUnit),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      postinstall: {
        value: cdktf.stringToHclTerraform(this._postinstall),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      preinstall: {
        value: cdktf.stringToHclTerraform(this._preinstall),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      private_key: {
        value: cdktf.stringToHclTerraform(this._privateKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      product_id: {
        value: cdktf.stringToHclTerraform(this._productId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      public_key: {
        value: cdktf.stringToHclTerraform(this._publicKey),
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
      runtime: {
        value: cdktf.stringToHclTerraform(this._runtime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      sharetype: {
        value: cdktf.stringToHclTerraform(this._sharetype),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      subnet_id: {
        value: cdktf.stringToHclTerraform(this._subnetId),
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
      data_volumes: {
        value: cdktf.listMapperHcl(cceNodeDataVolumesToHclTerraform, true)(this._dataVolumes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodeDataVolumesList",
      },
      extend_params: {
        value: cceNodeExtendParamsToHclTerraform(this._extendParams.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodeExtendParamsList",
      },
      extension_nics: {
        value: cdktf.listMapperHcl(cceNodeExtensionNicsToHclTerraform, true)(this._extensionNics.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodeExtensionNicsList",
      },
      hostname_config: {
        value: cceNodeHostnameConfigToHclTerraform(this._hostnameConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodeHostnameConfigList",
      },
      root_volume: {
        value: cceNodeRootVolumeToHclTerraform(this._rootVolume.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodeRootVolumeList",
      },
      storage: {
        value: cceNodeStorageToHclTerraform(this._storage.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodeStorageList",
      },
      taints: {
        value: cdktf.listMapperHcl(cceNodeTaintsToHclTerraform, true)(this._taints.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodeTaintsList",
      },
      timeouts: {
        value: cceNodeTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CceNodeTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

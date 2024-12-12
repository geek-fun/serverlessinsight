// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CceNodePoolConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#auto_renew CceNodePool#auto_renew}
  */
  readonly autoRenew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#availability_zone CceNodePool#availability_zone}
  */
  readonly availabilityZone?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#charging_mode CceNodePool#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#cluster_id CceNodePool#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#ecs_group_id CceNodePool#ecs_group_id}
  */
  readonly ecsGroupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#enterprise_project_id CceNodePool#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * schema: Deprecated; This parameter has been replaced by the 'extend_params' parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#extend_param CceNodePool#extend_param}
  */
  readonly extendParam?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#flavor_id CceNodePool#flavor_id}
  */
  readonly flavorId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#id CceNodePool#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#initial_node_count CceNodePool#initial_node_count}
  */
  readonly initialNodeCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#initialized_conditions CceNodePool#initialized_conditions}
  */
  readonly initializedConditions?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#key_pair CceNodePool#key_pair}
  */
  readonly keyPair?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#label_policy_on_existing_nodes CceNodePool#label_policy_on_existing_nodes}
  */
  readonly labelPolicyOnExistingNodes?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#labels CceNodePool#labels}
  */
  readonly labels?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#max_node_count CceNodePool#max_node_count}
  */
  readonly maxNodeCount?: number;
  /**
  * schema: Deprecated; This parameter can be configured in the 'extend_params' parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#max_pods CceNodePool#max_pods}
  */
  readonly maxPods?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#min_node_count CceNodePool#min_node_count}
  */
  readonly minNodeCount?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#name CceNodePool#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#os CceNodePool#os}
  */
  readonly os?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#password CceNodePool#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#period CceNodePool#period}
  */
  readonly period?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#period_unit CceNodePool#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#pod_security_groups CceNodePool#pod_security_groups}
  */
  readonly podSecurityGroups?: string[];
  /**
  * schema: Deprecated; This parameter can be configured in the 'extend_params' parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#postinstall CceNodePool#postinstall}
  */
  readonly postinstall?: string;
  /**
  * schema: Deprecated; This parameter can be configured in the 'extend_params' parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#preinstall CceNodePool#preinstall}
  */
  readonly preinstall?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#priority CceNodePool#priority}
  */
  readonly priority?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#region CceNodePool#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#runtime CceNodePool#runtime}
  */
  readonly runtime?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#scale_down_cooldown_time CceNodePool#scale_down_cooldown_time}
  */
  readonly scaleDownCooldownTime?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#scall_enable CceNodePool#scall_enable}
  */
  readonly scallEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#security_groups CceNodePool#security_groups}
  */
  readonly securityGroups?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#subnet_id CceNodePool#subnet_id}
  */
  readonly subnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#subnet_list CceNodePool#subnet_list}
  */
  readonly subnetList?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#tag_policy_on_existing_nodes CceNodePool#tag_policy_on_existing_nodes}
  */
  readonly tagPolicyOnExistingNodes?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#tags CceNodePool#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#taint_policy_on_existing_nodes CceNodePool#taint_policy_on_existing_nodes}
  */
  readonly taintPolicyOnExistingNodes?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#type CceNodePool#type}
  */
  readonly type?: string;
  /**
  * data_volumes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#data_volumes CceNodePool#data_volumes}
  */
  readonly dataVolumes?: CceNodePoolDataVolumes[] | cdktf.IResolvable;
  /**
  * extend_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#extend_params CceNodePool#extend_params}
  */
  readonly extendParams?: CceNodePoolExtendParams;
  /**
  * extension_scale_groups block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#extension_scale_groups CceNodePool#extension_scale_groups}
  */
  readonly extensionScaleGroups?: CceNodePoolExtensionScaleGroups[] | cdktf.IResolvable;
  /**
  * hostname_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#hostname_config CceNodePool#hostname_config}
  */
  readonly hostnameConfig?: CceNodePoolHostnameConfig;
  /**
  * root_volume block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#root_volume CceNodePool#root_volume}
  */
  readonly rootVolume: CceNodePoolRootVolume;
  /**
  * storage block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#storage CceNodePool#storage}
  */
  readonly storage?: CceNodePoolStorage;
  /**
  * taints block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#taints CceNodePool#taints}
  */
  readonly taints?: CceNodePoolTaints[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#timeouts CceNodePool#timeouts}
  */
  readonly timeouts?: CceNodePoolTimeouts;
}
export interface CceNodePoolDataVolumes {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#dss_pool_id CceNodePool#dss_pool_id}
  */
  readonly dssPoolId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#extend_param CceNodePool#extend_param}
  */
  readonly extendParam?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#extend_params CceNodePool#extend_params}
  */
  readonly extendParams?: { [key: string]: string };
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#hw_passthrough CceNodePool#hw_passthrough}
  */
  readonly hwPassthrough?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#kms_key_id CceNodePool#kms_key_id}
  */
  readonly kmsKeyId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#size CceNodePool#size}
  */
  readonly size: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#volumetype CceNodePool#volumetype}
  */
  readonly volumetype: string;
}

export function cceNodePoolDataVolumesToTerraform(struct?: CceNodePoolDataVolumes | cdktf.IResolvable): any {
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


export function cceNodePoolDataVolumesToHclTerraform(struct?: CceNodePoolDataVolumes | cdktf.IResolvable): any {
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

export class CceNodePoolDataVolumesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodePoolDataVolumes | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CceNodePoolDataVolumes | cdktf.IResolvable | undefined) {
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

export class CceNodePoolDataVolumesList extends cdktf.ComplexList {
  public internalValue? : CceNodePoolDataVolumes[] | cdktf.IResolvable

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
  public get(index: number): CceNodePoolDataVolumesOutputReference {
    return new CceNodePoolDataVolumesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodePoolExtendParams {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#agency_name CceNodePool#agency_name}
  */
  readonly agencyName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#docker_base_size CceNodePool#docker_base_size}
  */
  readonly dockerBaseSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#kube_reserved_mem CceNodePool#kube_reserved_mem}
  */
  readonly kubeReservedMem?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#market_type CceNodePool#market_type}
  */
  readonly marketType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#max_pods CceNodePool#max_pods}
  */
  readonly maxPods?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#nic_threshold CceNodePool#nic_threshold}
  */
  readonly nicThreshold?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#node_image_id CceNodePool#node_image_id}
  */
  readonly nodeImageId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#node_multi_queue CceNodePool#node_multi_queue}
  */
  readonly nodeMultiQueue?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#postinstall CceNodePool#postinstall}
  */
  readonly postinstall?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#preinstall CceNodePool#preinstall}
  */
  readonly preinstall?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#spot_price CceNodePool#spot_price}
  */
  readonly spotPrice?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#system_reserved_mem CceNodePool#system_reserved_mem}
  */
  readonly systemReservedMem?: number;
}

export function cceNodePoolExtendParamsToTerraform(struct?: CceNodePoolExtendParamsOutputReference | CceNodePoolExtendParams): any {
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


export function cceNodePoolExtendParamsToHclTerraform(struct?: CceNodePoolExtendParamsOutputReference | CceNodePoolExtendParams): any {
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

export class CceNodePoolExtendParamsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodePoolExtendParams | undefined {
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

  public set internalValue(value: CceNodePoolExtendParams | undefined) {
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
export interface CceNodePoolExtensionScaleGroupsMetadata {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#name CceNodePool#name}
  */
  readonly name?: string;
}

export function cceNodePoolExtensionScaleGroupsMetadataToTerraform(struct?: CceNodePoolExtensionScaleGroupsMetadataOutputReference | CceNodePoolExtensionScaleGroupsMetadata): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function cceNodePoolExtensionScaleGroupsMetadataToHclTerraform(struct?: CceNodePoolExtensionScaleGroupsMetadataOutputReference | CceNodePoolExtensionScaleGroupsMetadata): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodePoolExtensionScaleGroupsMetadataOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodePoolExtensionScaleGroupsMetadata | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodePoolExtensionScaleGroupsMetadata | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._name = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._name = value.name;
    }
  }

  // name - computed: false, optional: true, required: false
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
export interface CceNodePoolExtensionScaleGroupsSpecAutoscaling {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#enable CceNodePool#enable}
  */
  readonly enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#extension_priority CceNodePool#extension_priority}
  */
  readonly extensionPriority?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#max_node_count CceNodePool#max_node_count}
  */
  readonly maxNodeCount?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#min_node_count CceNodePool#min_node_count}
  */
  readonly minNodeCount?: number;
}

export function cceNodePoolExtensionScaleGroupsSpecAutoscalingToTerraform(struct?: CceNodePoolExtensionScaleGroupsSpecAutoscalingOutputReference | CceNodePoolExtensionScaleGroupsSpecAutoscaling): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enable: cdktf.booleanToTerraform(struct!.enable),
    extension_priority: cdktf.numberToTerraform(struct!.extensionPriority),
    max_node_count: cdktf.numberToTerraform(struct!.maxNodeCount),
    min_node_count: cdktf.numberToTerraform(struct!.minNodeCount),
  }
}


export function cceNodePoolExtensionScaleGroupsSpecAutoscalingToHclTerraform(struct?: CceNodePoolExtensionScaleGroupsSpecAutoscalingOutputReference | CceNodePoolExtensionScaleGroupsSpecAutoscaling): any {
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
    extension_priority: {
      value: cdktf.numberToHclTerraform(struct!.extensionPriority),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    max_node_count: {
      value: cdktf.numberToHclTerraform(struct!.maxNodeCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    min_node_count: {
      value: cdktf.numberToHclTerraform(struct!.minNodeCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodePoolExtensionScaleGroupsSpecAutoscalingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodePoolExtensionScaleGroupsSpecAutoscaling | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enable !== undefined) {
      hasAnyValues = true;
      internalValueResult.enable = this._enable;
    }
    if (this._extensionPriority !== undefined) {
      hasAnyValues = true;
      internalValueResult.extensionPriority = this._extensionPriority;
    }
    if (this._maxNodeCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxNodeCount = this._maxNodeCount;
    }
    if (this._minNodeCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.minNodeCount = this._minNodeCount;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodePoolExtensionScaleGroupsSpecAutoscaling | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enable = undefined;
      this._extensionPriority = undefined;
      this._maxNodeCount = undefined;
      this._minNodeCount = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enable = value.enable;
      this._extensionPriority = value.extensionPriority;
      this._maxNodeCount = value.maxNodeCount;
      this._minNodeCount = value.minNodeCount;
    }
  }

  // enable - computed: false, optional: true, required: false
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

  // extension_priority - computed: false, optional: true, required: false
  private _extensionPriority?: number; 
  public get extensionPriority() {
    return this.getNumberAttribute('extension_priority');
  }
  public set extensionPriority(value: number) {
    this._extensionPriority = value;
  }
  public resetExtensionPriority() {
    this._extensionPriority = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extensionPriorityInput() {
    return this._extensionPriority;
  }

  // max_node_count - computed: false, optional: true, required: false
  private _maxNodeCount?: number; 
  public get maxNodeCount() {
    return this.getNumberAttribute('max_node_count');
  }
  public set maxNodeCount(value: number) {
    this._maxNodeCount = value;
  }
  public resetMaxNodeCount() {
    this._maxNodeCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxNodeCountInput() {
    return this._maxNodeCount;
  }

  // min_node_count - computed: false, optional: true, required: false
  private _minNodeCount?: number; 
  public get minNodeCount() {
    return this.getNumberAttribute('min_node_count');
  }
  public set minNodeCount(value: number) {
    this._minNodeCount = value;
  }
  public resetMinNodeCount() {
    this._minNodeCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get minNodeCountInput() {
    return this._minNodeCount;
  }
}
export interface CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecification {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#id CceNodePool#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#preference CceNodePool#preference}
  */
  readonly preference?: string;
}

export function cceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecificationToTerraform(struct?: CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecificationOutputReference | CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecification): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    id: cdktf.stringToTerraform(struct!.id),
    preference: cdktf.stringToTerraform(struct!.preference),
  }
}


export function cceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecificationToHclTerraform(struct?: CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecificationOutputReference | CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecification): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    preference: {
      value: cdktf.stringToHclTerraform(struct!.preference),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecificationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecification | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._preference !== undefined) {
      hasAnyValues = true;
      internalValueResult.preference = this._preference;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecification | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._id = undefined;
      this._preference = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._id = value.id;
      this._preference = value.preference;
    }
  }

  // id - computed: false, optional: true, required: false
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

  // preference - computed: false, optional: true, required: false
  private _preference?: string; 
  public get preference() {
    return this.getStringAttribute('preference');
  }
  public set preference(value: string) {
    this._preference = value;
  }
  public resetPreference() {
    this._preference = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get preferenceInput() {
    return this._preference;
  }
}
export interface CceNodePoolExtensionScaleGroupsSpec {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#az CceNodePool#az}
  */
  readonly az?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#flavor CceNodePool#flavor}
  */
  readonly flavor?: string;
  /**
  * autoscaling block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#autoscaling CceNodePool#autoscaling}
  */
  readonly autoscaling?: CceNodePoolExtensionScaleGroupsSpecAutoscaling;
  /**
  * capacity_reservation_specification block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#capacity_reservation_specification CceNodePool#capacity_reservation_specification}
  */
  readonly capacityReservationSpecification?: CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecification;
}

export function cceNodePoolExtensionScaleGroupsSpecToTerraform(struct?: CceNodePoolExtensionScaleGroupsSpecOutputReference | CceNodePoolExtensionScaleGroupsSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    az: cdktf.stringToTerraform(struct!.az),
    flavor: cdktf.stringToTerraform(struct!.flavor),
    autoscaling: cceNodePoolExtensionScaleGroupsSpecAutoscalingToTerraform(struct!.autoscaling),
    capacity_reservation_specification: cceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecificationToTerraform(struct!.capacityReservationSpecification),
  }
}


export function cceNodePoolExtensionScaleGroupsSpecToHclTerraform(struct?: CceNodePoolExtensionScaleGroupsSpecOutputReference | CceNodePoolExtensionScaleGroupsSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    az: {
      value: cdktf.stringToHclTerraform(struct!.az),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    autoscaling: {
      value: cceNodePoolExtensionScaleGroupsSpecAutoscalingToHclTerraform(struct!.autoscaling),
      isBlock: true,
      type: "list",
      storageClassType: "CceNodePoolExtensionScaleGroupsSpecAutoscalingList",
    },
    capacity_reservation_specification: {
      value: cceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecificationToHclTerraform(struct!.capacityReservationSpecification),
      isBlock: true,
      type: "list",
      storageClassType: "CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecificationList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodePoolExtensionScaleGroupsSpecOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodePoolExtensionScaleGroupsSpec | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._az !== undefined) {
      hasAnyValues = true;
      internalValueResult.az = this._az;
    }
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._autoscaling?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.autoscaling = this._autoscaling?.internalValue;
    }
    if (this._capacityReservationSpecification?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.capacityReservationSpecification = this._capacityReservationSpecification?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodePoolExtensionScaleGroupsSpec | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._az = undefined;
      this._flavor = undefined;
      this._autoscaling.internalValue = undefined;
      this._capacityReservationSpecification.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._az = value.az;
      this._flavor = value.flavor;
      this._autoscaling.internalValue = value.autoscaling;
      this._capacityReservationSpecification.internalValue = value.capacityReservationSpecification;
    }
  }

  // az - computed: false, optional: true, required: false
  private _az?: string; 
  public get az() {
    return this.getStringAttribute('az');
  }
  public set az(value: string) {
    this._az = value;
  }
  public resetAz() {
    this._az = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get azInput() {
    return this._az;
  }

  // flavor - computed: false, optional: true, required: false
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  public resetFlavor() {
    this._flavor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
  }

  // autoscaling - computed: false, optional: true, required: false
  private _autoscaling = new CceNodePoolExtensionScaleGroupsSpecAutoscalingOutputReference(this, "autoscaling");
  public get autoscaling() {
    return this._autoscaling;
  }
  public putAutoscaling(value: CceNodePoolExtensionScaleGroupsSpecAutoscaling) {
    this._autoscaling.internalValue = value;
  }
  public resetAutoscaling() {
    this._autoscaling.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoscalingInput() {
    return this._autoscaling.internalValue;
  }

  // capacity_reservation_specification - computed: false, optional: true, required: false
  private _capacityReservationSpecification = new CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecificationOutputReference(this, "capacity_reservation_specification");
  public get capacityReservationSpecification() {
    return this._capacityReservationSpecification;
  }
  public putCapacityReservationSpecification(value: CceNodePoolExtensionScaleGroupsSpecCapacityReservationSpecification) {
    this._capacityReservationSpecification.internalValue = value;
  }
  public resetCapacityReservationSpecification() {
    this._capacityReservationSpecification.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get capacityReservationSpecificationInput() {
    return this._capacityReservationSpecification.internalValue;
  }
}
export interface CceNodePoolExtensionScaleGroups {
  /**
  * metadata block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#metadata CceNodePool#metadata}
  */
  readonly metadata?: CceNodePoolExtensionScaleGroupsMetadata;
  /**
  * spec block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#spec CceNodePool#spec}
  */
  readonly spec?: CceNodePoolExtensionScaleGroupsSpec;
}

export function cceNodePoolExtensionScaleGroupsToTerraform(struct?: CceNodePoolExtensionScaleGroups | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    metadata: cceNodePoolExtensionScaleGroupsMetadataToTerraform(struct!.metadata),
    spec: cceNodePoolExtensionScaleGroupsSpecToTerraform(struct!.spec),
  }
}


export function cceNodePoolExtensionScaleGroupsToHclTerraform(struct?: CceNodePoolExtensionScaleGroups | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    metadata: {
      value: cceNodePoolExtensionScaleGroupsMetadataToHclTerraform(struct!.metadata),
      isBlock: true,
      type: "list",
      storageClassType: "CceNodePoolExtensionScaleGroupsMetadataList",
    },
    spec: {
      value: cceNodePoolExtensionScaleGroupsSpecToHclTerraform(struct!.spec),
      isBlock: true,
      type: "list",
      storageClassType: "CceNodePoolExtensionScaleGroupsSpecList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodePoolExtensionScaleGroupsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodePoolExtensionScaleGroups | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._metadata?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.metadata = this._metadata?.internalValue;
    }
    if (this._spec?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.spec = this._spec?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodePoolExtensionScaleGroups | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._metadata.internalValue = undefined;
      this._spec.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._metadata.internalValue = value.metadata;
      this._spec.internalValue = value.spec;
    }
  }

  // metadata - computed: false, optional: true, required: false
  private _metadata = new CceNodePoolExtensionScaleGroupsMetadataOutputReference(this, "metadata");
  public get metadata() {
    return this._metadata;
  }
  public putMetadata(value: CceNodePoolExtensionScaleGroupsMetadata) {
    this._metadata.internalValue = value;
  }
  public resetMetadata() {
    this._metadata.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metadataInput() {
    return this._metadata.internalValue;
  }

  // spec - computed: false, optional: true, required: false
  private _spec = new CceNodePoolExtensionScaleGroupsSpecOutputReference(this, "spec");
  public get spec() {
    return this._spec;
  }
  public putSpec(value: CceNodePoolExtensionScaleGroupsSpec) {
    this._spec.internalValue = value;
  }
  public resetSpec() {
    this._spec.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get specInput() {
    return this._spec.internalValue;
  }
}

export class CceNodePoolExtensionScaleGroupsList extends cdktf.ComplexList {
  public internalValue? : CceNodePoolExtensionScaleGroups[] | cdktf.IResolvable

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
  public get(index: number): CceNodePoolExtensionScaleGroupsOutputReference {
    return new CceNodePoolExtensionScaleGroupsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodePoolHostnameConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#type CceNodePool#type}
  */
  readonly type: string;
}

export function cceNodePoolHostnameConfigToTerraform(struct?: CceNodePoolHostnameConfigOutputReference | CceNodePoolHostnameConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function cceNodePoolHostnameConfigToHclTerraform(struct?: CceNodePoolHostnameConfigOutputReference | CceNodePoolHostnameConfig): any {
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

export class CceNodePoolHostnameConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodePoolHostnameConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceNodePoolHostnameConfig | undefined) {
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
export interface CceNodePoolRootVolume {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#dss_pool_id CceNodePool#dss_pool_id}
  */
  readonly dssPoolId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#extend_param CceNodePool#extend_param}
  */
  readonly extendParam?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#extend_params CceNodePool#extend_params}
  */
  readonly extendParams?: { [key: string]: string };
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#hw_passthrough CceNodePool#hw_passthrough}
  */
  readonly hwPassthrough?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#kms_key_id CceNodePool#kms_key_id}
  */
  readonly kmsKeyId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#size CceNodePool#size}
  */
  readonly size: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#volumetype CceNodePool#volumetype}
  */
  readonly volumetype: string;
}

export function cceNodePoolRootVolumeToTerraform(struct?: CceNodePoolRootVolumeOutputReference | CceNodePoolRootVolume): any {
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


export function cceNodePoolRootVolumeToHclTerraform(struct?: CceNodePoolRootVolumeOutputReference | CceNodePoolRootVolume): any {
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

export class CceNodePoolRootVolumeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodePoolRootVolume | undefined {
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

  public set internalValue(value: CceNodePoolRootVolume | undefined) {
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
export interface CceNodePoolStorageGroupsVirtualSpaces {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#lvm_lv_type CceNodePool#lvm_lv_type}
  */
  readonly lvmLvType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#lvm_path CceNodePool#lvm_path}
  */
  readonly lvmPath?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#name CceNodePool#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#runtime_lv_type CceNodePool#runtime_lv_type}
  */
  readonly runtimeLvType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#size CceNodePool#size}
  */
  readonly size: string;
}

export function cceNodePoolStorageGroupsVirtualSpacesToTerraform(struct?: CceNodePoolStorageGroupsVirtualSpaces | cdktf.IResolvable): any {
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


export function cceNodePoolStorageGroupsVirtualSpacesToHclTerraform(struct?: CceNodePoolStorageGroupsVirtualSpaces | cdktf.IResolvable): any {
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

export class CceNodePoolStorageGroupsVirtualSpacesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodePoolStorageGroupsVirtualSpaces | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CceNodePoolStorageGroupsVirtualSpaces | cdktf.IResolvable | undefined) {
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

export class CceNodePoolStorageGroupsVirtualSpacesList extends cdktf.ComplexList {
  public internalValue? : CceNodePoolStorageGroupsVirtualSpaces[] | cdktf.IResolvable

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
  public get(index: number): CceNodePoolStorageGroupsVirtualSpacesOutputReference {
    return new CceNodePoolStorageGroupsVirtualSpacesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodePoolStorageGroups {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#cce_managed CceNodePool#cce_managed}
  */
  readonly cceManaged?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#name CceNodePool#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#selector_names CceNodePool#selector_names}
  */
  readonly selectorNames: string[];
  /**
  * virtual_spaces block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#virtual_spaces CceNodePool#virtual_spaces}
  */
  readonly virtualSpaces: CceNodePoolStorageGroupsVirtualSpaces[] | cdktf.IResolvable;
}

export function cceNodePoolStorageGroupsToTerraform(struct?: CceNodePoolStorageGroups | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cce_managed: cdktf.booleanToTerraform(struct!.cceManaged),
    name: cdktf.stringToTerraform(struct!.name),
    selector_names: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.selectorNames),
    virtual_spaces: cdktf.listMapper(cceNodePoolStorageGroupsVirtualSpacesToTerraform, true)(struct!.virtualSpaces),
  }
}


export function cceNodePoolStorageGroupsToHclTerraform(struct?: CceNodePoolStorageGroups | cdktf.IResolvable): any {
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
      value: cdktf.listMapperHcl(cceNodePoolStorageGroupsVirtualSpacesToHclTerraform, true)(struct!.virtualSpaces),
      isBlock: true,
      type: "list",
      storageClassType: "CceNodePoolStorageGroupsVirtualSpacesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodePoolStorageGroupsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodePoolStorageGroups | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CceNodePoolStorageGroups | cdktf.IResolvable | undefined) {
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
  private _virtualSpaces = new CceNodePoolStorageGroupsVirtualSpacesList(this, "virtual_spaces", false);
  public get virtualSpaces() {
    return this._virtualSpaces;
  }
  public putVirtualSpaces(value: CceNodePoolStorageGroupsVirtualSpaces[] | cdktf.IResolvable) {
    this._virtualSpaces.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get virtualSpacesInput() {
    return this._virtualSpaces.internalValue;
  }
}

export class CceNodePoolStorageGroupsList extends cdktf.ComplexList {
  public internalValue? : CceNodePoolStorageGroups[] | cdktf.IResolvable

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
  public get(index: number): CceNodePoolStorageGroupsOutputReference {
    return new CceNodePoolStorageGroupsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodePoolStorageSelectors {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#match_label_count CceNodePool#match_label_count}
  */
  readonly matchLabelCount?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#match_label_metadata_cmkid CceNodePool#match_label_metadata_cmkid}
  */
  readonly matchLabelMetadataCmkid?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#match_label_metadata_encrypted CceNodePool#match_label_metadata_encrypted}
  */
  readonly matchLabelMetadataEncrypted?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#match_label_size CceNodePool#match_label_size}
  */
  readonly matchLabelSize?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#match_label_volume_type CceNodePool#match_label_volume_type}
  */
  readonly matchLabelVolumeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#name CceNodePool#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#type CceNodePool#type}
  */
  readonly type?: string;
}

export function cceNodePoolStorageSelectorsToTerraform(struct?: CceNodePoolStorageSelectors | cdktf.IResolvable): any {
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


export function cceNodePoolStorageSelectorsToHclTerraform(struct?: CceNodePoolStorageSelectors | cdktf.IResolvable): any {
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

export class CceNodePoolStorageSelectorsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodePoolStorageSelectors | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CceNodePoolStorageSelectors | cdktf.IResolvable | undefined) {
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

export class CceNodePoolStorageSelectorsList extends cdktf.ComplexList {
  public internalValue? : CceNodePoolStorageSelectors[] | cdktf.IResolvable

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
  public get(index: number): CceNodePoolStorageSelectorsOutputReference {
    return new CceNodePoolStorageSelectorsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodePoolStorage {
  /**
  * groups block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#groups CceNodePool#groups}
  */
  readonly groups: CceNodePoolStorageGroups[] | cdktf.IResolvable;
  /**
  * selectors block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#selectors CceNodePool#selectors}
  */
  readonly selectors: CceNodePoolStorageSelectors[] | cdktf.IResolvable;
}

export function cceNodePoolStorageToTerraform(struct?: CceNodePoolStorageOutputReference | CceNodePoolStorage): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    groups: cdktf.listMapper(cceNodePoolStorageGroupsToTerraform, true)(struct!.groups),
    selectors: cdktf.listMapper(cceNodePoolStorageSelectorsToTerraform, true)(struct!.selectors),
  }
}


export function cceNodePoolStorageToHclTerraform(struct?: CceNodePoolStorageOutputReference | CceNodePoolStorage): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    groups: {
      value: cdktf.listMapperHcl(cceNodePoolStorageGroupsToHclTerraform, true)(struct!.groups),
      isBlock: true,
      type: "list",
      storageClassType: "CceNodePoolStorageGroupsList",
    },
    selectors: {
      value: cdktf.listMapperHcl(cceNodePoolStorageSelectorsToHclTerraform, true)(struct!.selectors),
      isBlock: true,
      type: "list",
      storageClassType: "CceNodePoolStorageSelectorsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceNodePoolStorageOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CceNodePoolStorage | undefined {
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

  public set internalValue(value: CceNodePoolStorage | undefined) {
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
  private _groups = new CceNodePoolStorageGroupsList(this, "groups", false);
  public get groups() {
    return this._groups;
  }
  public putGroups(value: CceNodePoolStorageGroups[] | cdktf.IResolvable) {
    this._groups.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupsInput() {
    return this._groups.internalValue;
  }

  // selectors - computed: false, optional: false, required: true
  private _selectors = new CceNodePoolStorageSelectorsList(this, "selectors", false);
  public get selectors() {
    return this._selectors;
  }
  public putSelectors(value: CceNodePoolStorageSelectors[] | cdktf.IResolvable) {
    this._selectors.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get selectorsInput() {
    return this._selectors.internalValue;
  }
}
export interface CceNodePoolTaints {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#effect CceNodePool#effect}
  */
  readonly effect: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#key CceNodePool#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#value CceNodePool#value}
  */
  readonly value: string;
}

export function cceNodePoolTaintsToTerraform(struct?: CceNodePoolTaints | cdktf.IResolvable): any {
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


export function cceNodePoolTaintsToHclTerraform(struct?: CceNodePoolTaints | cdktf.IResolvable): any {
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

export class CceNodePoolTaintsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceNodePoolTaints | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CceNodePoolTaints | cdktf.IResolvable | undefined) {
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

export class CceNodePoolTaintsList extends cdktf.ComplexList {
  public internalValue? : CceNodePoolTaints[] | cdktf.IResolvable

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
  public get(index: number): CceNodePoolTaintsOutputReference {
    return new CceNodePoolTaintsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceNodePoolTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#create CceNodePool#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#delete CceNodePool#delete}
  */
  readonly delete?: string;
}

export function cceNodePoolTimeoutsToTerraform(struct?: CceNodePoolTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function cceNodePoolTimeoutsToHclTerraform(struct?: CceNodePoolTimeouts | cdktf.IResolvable): any {
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

export class CceNodePoolTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CceNodePoolTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CceNodePoolTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool huaweicloud_cce_node_pool}
*/
export class CceNodePool extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cce_node_pool";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CceNodePool resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CceNodePool to import
  * @param importFromId The id of the existing CceNodePool that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CceNodePool to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cce_node_pool", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_node_pool huaweicloud_cce_node_pool} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CceNodePoolConfig
  */
  public constructor(scope: Construct, id: string, config: CceNodePoolConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cce_node_pool',
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
    this._autoRenew = config.autoRenew;
    this._availabilityZone = config.availabilityZone;
    this._chargingMode = config.chargingMode;
    this._clusterId = config.clusterId;
    this._ecsGroupId = config.ecsGroupId;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._extendParam = config.extendParam;
    this._flavorId = config.flavorId;
    this._id = config.id;
    this._initialNodeCount = config.initialNodeCount;
    this._initializedConditions = config.initializedConditions;
    this._keyPair = config.keyPair;
    this._labelPolicyOnExistingNodes = config.labelPolicyOnExistingNodes;
    this._labels = config.labels;
    this._maxNodeCount = config.maxNodeCount;
    this._maxPods = config.maxPods;
    this._minNodeCount = config.minNodeCount;
    this._name = config.name;
    this._os = config.os;
    this._password = config.password;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._podSecurityGroups = config.podSecurityGroups;
    this._postinstall = config.postinstall;
    this._preinstall = config.preinstall;
    this._priority = config.priority;
    this._region = config.region;
    this._runtime = config.runtime;
    this._scaleDownCooldownTime = config.scaleDownCooldownTime;
    this._scallEnable = config.scallEnable;
    this._securityGroups = config.securityGroups;
    this._subnetId = config.subnetId;
    this._subnetList = config.subnetList;
    this._tagPolicyOnExistingNodes = config.tagPolicyOnExistingNodes;
    this._tags = config.tags;
    this._taintPolicyOnExistingNodes = config.taintPolicyOnExistingNodes;
    this._type = config.type;
    this._dataVolumes.internalValue = config.dataVolumes;
    this._extendParams.internalValue = config.extendParams;
    this._extensionScaleGroups.internalValue = config.extensionScaleGroups;
    this._hostnameConfig.internalValue = config.hostnameConfig;
    this._rootVolume.internalValue = config.rootVolume;
    this._storage.internalValue = config.storage;
    this._taints.internalValue = config.taints;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // availability_zone - computed: false, optional: true, required: false
  private _availabilityZone?: string; 
  public get availabilityZone() {
    return this.getStringAttribute('availability_zone');
  }
  public set availabilityZone(value: string) {
    this._availabilityZone = value;
  }
  public resetAvailabilityZone() {
    this._availabilityZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZoneInput() {
    return this._availabilityZone;
  }

  // billing_mode - computed: true, optional: false, required: false
  public get billingMode() {
    return this.getNumberAttribute('billing_mode');
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

  // current_node_count - computed: true, optional: false, required: false
  public get currentNodeCount() {
    return this.getNumberAttribute('current_node_count');
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

  // initial_node_count - computed: false, optional: false, required: true
  private _initialNodeCount?: number; 
  public get initialNodeCount() {
    return this.getNumberAttribute('initial_node_count');
  }
  public set initialNodeCount(value: number) {
    this._initialNodeCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get initialNodeCountInput() {
    return this._initialNodeCount;
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

  // label_policy_on_existing_nodes - computed: true, optional: true, required: false
  private _labelPolicyOnExistingNodes?: string; 
  public get labelPolicyOnExistingNodes() {
    return this.getStringAttribute('label_policy_on_existing_nodes');
  }
  public set labelPolicyOnExistingNodes(value: string) {
    this._labelPolicyOnExistingNodes = value;
  }
  public resetLabelPolicyOnExistingNodes() {
    this._labelPolicyOnExistingNodes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get labelPolicyOnExistingNodesInput() {
    return this._labelPolicyOnExistingNodes;
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

  // max_node_count - computed: false, optional: true, required: false
  private _maxNodeCount?: number; 
  public get maxNodeCount() {
    return this.getNumberAttribute('max_node_count');
  }
  public set maxNodeCount(value: number) {
    this._maxNodeCount = value;
  }
  public resetMaxNodeCount() {
    this._maxNodeCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxNodeCountInput() {
    return this._maxNodeCount;
  }

  // max_pods - computed: true, optional: true, required: false
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

  // min_node_count - computed: false, optional: true, required: false
  private _minNodeCount?: number; 
  public get minNodeCount() {
    return this.getNumberAttribute('min_node_count');
  }
  public set minNodeCount(value: number) {
    this._minNodeCount = value;
  }
  public resetMinNodeCount() {
    this._minNodeCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get minNodeCountInput() {
    return this._minNodeCount;
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

  // pod_security_groups - computed: false, optional: true, required: false
  private _podSecurityGroups?: string[]; 
  public get podSecurityGroups() {
    return this.getListAttribute('pod_security_groups');
  }
  public set podSecurityGroups(value: string[]) {
    this._podSecurityGroups = value;
  }
  public resetPodSecurityGroups() {
    this._podSecurityGroups = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get podSecurityGroupsInput() {
    return this._podSecurityGroups;
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

  // scale_down_cooldown_time - computed: false, optional: true, required: false
  private _scaleDownCooldownTime?: number; 
  public get scaleDownCooldownTime() {
    return this.getNumberAttribute('scale_down_cooldown_time');
  }
  public set scaleDownCooldownTime(value: number) {
    this._scaleDownCooldownTime = value;
  }
  public resetScaleDownCooldownTime() {
    this._scaleDownCooldownTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scaleDownCooldownTimeInput() {
    return this._scaleDownCooldownTime;
  }

  // scall_enable - computed: false, optional: true, required: false
  private _scallEnable?: boolean | cdktf.IResolvable; 
  public get scallEnable() {
    return this.getBooleanAttribute('scall_enable');
  }
  public set scallEnable(value: boolean | cdktf.IResolvable) {
    this._scallEnable = value;
  }
  public resetScallEnable() {
    this._scallEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scallEnableInput() {
    return this._scallEnable;
  }

  // security_groups - computed: true, optional: true, required: false
  private _securityGroups?: string[]; 
  public get securityGroups() {
    return this.getListAttribute('security_groups');
  }
  public set securityGroups(value: string[]) {
    this._securityGroups = value;
  }
  public resetSecurityGroups() {
    this._securityGroups = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupsInput() {
    return this._securityGroups;
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

  // subnet_list - computed: false, optional: true, required: false
  private _subnetList?: string[]; 
  public get subnetList() {
    return this.getListAttribute('subnet_list');
  }
  public set subnetList(value: string[]) {
    this._subnetList = value;
  }
  public resetSubnetList() {
    this._subnetList = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetListInput() {
    return this._subnetList;
  }

  // tag_policy_on_existing_nodes - computed: true, optional: true, required: false
  private _tagPolicyOnExistingNodes?: string; 
  public get tagPolicyOnExistingNodes() {
    return this.getStringAttribute('tag_policy_on_existing_nodes');
  }
  public set tagPolicyOnExistingNodes(value: string) {
    this._tagPolicyOnExistingNodes = value;
  }
  public resetTagPolicyOnExistingNodes() {
    this._tagPolicyOnExistingNodes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagPolicyOnExistingNodesInput() {
    return this._tagPolicyOnExistingNodes;
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

  // taint_policy_on_existing_nodes - computed: true, optional: true, required: false
  private _taintPolicyOnExistingNodes?: string; 
  public get taintPolicyOnExistingNodes() {
    return this.getStringAttribute('taint_policy_on_existing_nodes');
  }
  public set taintPolicyOnExistingNodes(value: string) {
    this._taintPolicyOnExistingNodes = value;
  }
  public resetTaintPolicyOnExistingNodes() {
    this._taintPolicyOnExistingNodes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get taintPolicyOnExistingNodesInput() {
    return this._taintPolicyOnExistingNodes;
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

  // data_volumes - computed: false, optional: true, required: false
  private _dataVolumes = new CceNodePoolDataVolumesList(this, "data_volumes", false);
  public get dataVolumes() {
    return this._dataVolumes;
  }
  public putDataVolumes(value: CceNodePoolDataVolumes[] | cdktf.IResolvable) {
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
  private _extendParams = new CceNodePoolExtendParamsOutputReference(this, "extend_params");
  public get extendParams() {
    return this._extendParams;
  }
  public putExtendParams(value: CceNodePoolExtendParams) {
    this._extendParams.internalValue = value;
  }
  public resetExtendParams() {
    this._extendParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendParamsInput() {
    return this._extendParams.internalValue;
  }

  // extension_scale_groups - computed: false, optional: true, required: false
  private _extensionScaleGroups = new CceNodePoolExtensionScaleGroupsList(this, "extension_scale_groups", false);
  public get extensionScaleGroups() {
    return this._extensionScaleGroups;
  }
  public putExtensionScaleGroups(value: CceNodePoolExtensionScaleGroups[] | cdktf.IResolvable) {
    this._extensionScaleGroups.internalValue = value;
  }
  public resetExtensionScaleGroups() {
    this._extensionScaleGroups.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extensionScaleGroupsInput() {
    return this._extensionScaleGroups.internalValue;
  }

  // hostname_config - computed: false, optional: true, required: false
  private _hostnameConfig = new CceNodePoolHostnameConfigOutputReference(this, "hostname_config");
  public get hostnameConfig() {
    return this._hostnameConfig;
  }
  public putHostnameConfig(value: CceNodePoolHostnameConfig) {
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
  private _rootVolume = new CceNodePoolRootVolumeOutputReference(this, "root_volume");
  public get rootVolume() {
    return this._rootVolume;
  }
  public putRootVolume(value: CceNodePoolRootVolume) {
    this._rootVolume.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeInput() {
    return this._rootVolume.internalValue;
  }

  // storage - computed: false, optional: true, required: false
  private _storage = new CceNodePoolStorageOutputReference(this, "storage");
  public get storage() {
    return this._storage;
  }
  public putStorage(value: CceNodePoolStorage) {
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
  private _taints = new CceNodePoolTaintsList(this, "taints", false);
  public get taints() {
    return this._taints;
  }
  public putTaints(value: CceNodePoolTaints[] | cdktf.IResolvable) {
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
  private _timeouts = new CceNodePoolTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CceNodePoolTimeouts) {
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
      auto_renew: cdktf.stringToTerraform(this._autoRenew),
      availability_zone: cdktf.stringToTerraform(this._availabilityZone),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      ecs_group_id: cdktf.stringToTerraform(this._ecsGroupId),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      extend_param: cdktf.hashMapper(cdktf.stringToTerraform)(this._extendParam),
      flavor_id: cdktf.stringToTerraform(this._flavorId),
      id: cdktf.stringToTerraform(this._id),
      initial_node_count: cdktf.numberToTerraform(this._initialNodeCount),
      initialized_conditions: cdktf.listMapper(cdktf.stringToTerraform, false)(this._initializedConditions),
      key_pair: cdktf.stringToTerraform(this._keyPair),
      label_policy_on_existing_nodes: cdktf.stringToTerraform(this._labelPolicyOnExistingNodes),
      labels: cdktf.hashMapper(cdktf.stringToTerraform)(this._labels),
      max_node_count: cdktf.numberToTerraform(this._maxNodeCount),
      max_pods: cdktf.numberToTerraform(this._maxPods),
      min_node_count: cdktf.numberToTerraform(this._minNodeCount),
      name: cdktf.stringToTerraform(this._name),
      os: cdktf.stringToTerraform(this._os),
      password: cdktf.stringToTerraform(this._password),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      pod_security_groups: cdktf.listMapper(cdktf.stringToTerraform, false)(this._podSecurityGroups),
      postinstall: cdktf.stringToTerraform(this._postinstall),
      preinstall: cdktf.stringToTerraform(this._preinstall),
      priority: cdktf.numberToTerraform(this._priority),
      region: cdktf.stringToTerraform(this._region),
      runtime: cdktf.stringToTerraform(this._runtime),
      scale_down_cooldown_time: cdktf.numberToTerraform(this._scaleDownCooldownTime),
      scall_enable: cdktf.booleanToTerraform(this._scallEnable),
      security_groups: cdktf.listMapper(cdktf.stringToTerraform, false)(this._securityGroups),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      subnet_list: cdktf.listMapper(cdktf.stringToTerraform, false)(this._subnetList),
      tag_policy_on_existing_nodes: cdktf.stringToTerraform(this._tagPolicyOnExistingNodes),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      taint_policy_on_existing_nodes: cdktf.stringToTerraform(this._taintPolicyOnExistingNodes),
      type: cdktf.stringToTerraform(this._type),
      data_volumes: cdktf.listMapper(cceNodePoolDataVolumesToTerraform, true)(this._dataVolumes.internalValue),
      extend_params: cceNodePoolExtendParamsToTerraform(this._extendParams.internalValue),
      extension_scale_groups: cdktf.listMapper(cceNodePoolExtensionScaleGroupsToTerraform, true)(this._extensionScaleGroups.internalValue),
      hostname_config: cceNodePoolHostnameConfigToTerraform(this._hostnameConfig.internalValue),
      root_volume: cceNodePoolRootVolumeToTerraform(this._rootVolume.internalValue),
      storage: cceNodePoolStorageToTerraform(this._storage.internalValue),
      taints: cdktf.listMapper(cceNodePoolTaintsToTerraform, true)(this._taints.internalValue),
      timeouts: cceNodePoolTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
      ecs_group_id: {
        value: cdktf.stringToHclTerraform(this._ecsGroupId),
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
      extend_param: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._extendParam),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
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
      initial_node_count: {
        value: cdktf.numberToHclTerraform(this._initialNodeCount),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      initialized_conditions: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._initializedConditions),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      key_pair: {
        value: cdktf.stringToHclTerraform(this._keyPair),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      label_policy_on_existing_nodes: {
        value: cdktf.stringToHclTerraform(this._labelPolicyOnExistingNodes),
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
      max_node_count: {
        value: cdktf.numberToHclTerraform(this._maxNodeCount),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      max_pods: {
        value: cdktf.numberToHclTerraform(this._maxPods),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      min_node_count: {
        value: cdktf.numberToHclTerraform(this._minNodeCount),
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
      os: {
        value: cdktf.stringToHclTerraform(this._os),
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
      pod_security_groups: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._podSecurityGroups),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
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
      runtime: {
        value: cdktf.stringToHclTerraform(this._runtime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      scale_down_cooldown_time: {
        value: cdktf.numberToHclTerraform(this._scaleDownCooldownTime),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      scall_enable: {
        value: cdktf.booleanToHclTerraform(this._scallEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      security_groups: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._securityGroups),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      subnet_id: {
        value: cdktf.stringToHclTerraform(this._subnetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      subnet_list: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._subnetList),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      tag_policy_on_existing_nodes: {
        value: cdktf.stringToHclTerraform(this._tagPolicyOnExistingNodes),
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
      taint_policy_on_existing_nodes: {
        value: cdktf.stringToHclTerraform(this._taintPolicyOnExistingNodes),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      data_volumes: {
        value: cdktf.listMapperHcl(cceNodePoolDataVolumesToHclTerraform, true)(this._dataVolumes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodePoolDataVolumesList",
      },
      extend_params: {
        value: cceNodePoolExtendParamsToHclTerraform(this._extendParams.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodePoolExtendParamsList",
      },
      extension_scale_groups: {
        value: cdktf.listMapperHcl(cceNodePoolExtensionScaleGroupsToHclTerraform, true)(this._extensionScaleGroups.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodePoolExtensionScaleGroupsList",
      },
      hostname_config: {
        value: cceNodePoolHostnameConfigToHclTerraform(this._hostnameConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodePoolHostnameConfigList",
      },
      root_volume: {
        value: cceNodePoolRootVolumeToHclTerraform(this._rootVolume.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodePoolRootVolumeList",
      },
      storage: {
        value: cceNodePoolStorageToHclTerraform(this._storage.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodePoolStorageList",
      },
      taints: {
        value: cdktf.listMapperHcl(cceNodePoolTaintsToHclTerraform, true)(this._taints.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceNodePoolTaintsList",
      },
      timeouts: {
        value: cceNodePoolTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CceNodePoolTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

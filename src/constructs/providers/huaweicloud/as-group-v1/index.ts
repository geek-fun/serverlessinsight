// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AsGroupV1Config extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#agency_name AsGroupV1#agency_name}
  */
  readonly agencyName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#availability_zones AsGroupV1#availability_zones}
  */
  readonly availabilityZones?: string[];
  /**
  * schema: Deprecated; use availability_zones instead
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#available_zones AsGroupV1#available_zones}
  */
  readonly availableZones?: string[];
  /**
  * The cooling duration, in seconds.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#cool_down_time AsGroupV1#cool_down_time}
  */
  readonly coolDownTime?: number;
  /**
  * Whether to delete instances when they are removed from the AS group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#delete_instances AsGroupV1#delete_instances}
  */
  readonly deleteInstances?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#delete_publicip AsGroupV1#delete_publicip}
  */
  readonly deletePublicip?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#delete_volume AsGroupV1#delete_volume}
  */
  readonly deleteVolume?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#description AsGroupV1#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#desire_instance_number AsGroupV1#desire_instance_number}
  */
  readonly desireInstanceNumber?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#enable AsGroupV1#enable}
  */
  readonly enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#enterprise_project_id AsGroupV1#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#force_delete AsGroupV1#force_delete}
  */
  readonly forceDelete?: boolean | cdktf.IResolvable;
  /**
  * The health check grace period for instances, in seconds.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#health_periodic_audit_grace_period AsGroupV1#health_periodic_audit_grace_period}
  */
  readonly healthPeriodicAuditGracePeriod?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#health_periodic_audit_method AsGroupV1#health_periodic_audit_method}
  */
  readonly healthPeriodicAuditMethod?: string;
  /**
  * The health check period for instances, in minutes.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#health_periodic_audit_time AsGroupV1#health_periodic_audit_time}
  */
  readonly healthPeriodicAuditTime?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#id AsGroupV1#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#instance_terminate_policy AsGroupV1#instance_terminate_policy}
  */
  readonly instanceTerminatePolicy?: string;
  /**
  * The system supports the binding of up to six ELB listeners, the IDs of which are separated using a comma.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#lb_listener_id AsGroupV1#lb_listener_id}
  */
  readonly lbListenerId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#max_instance_number AsGroupV1#max_instance_number}
  */
  readonly maxInstanceNumber?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#min_instance_number AsGroupV1#min_instance_number}
  */
  readonly minInstanceNumber?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#multi_az_scaling_policy AsGroupV1#multi_az_scaling_policy}
  */
  readonly multiAzScalingPolicy?: string;
  /**
  * schema: Deprecated; The notification mode has been canceled
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#notifications AsGroupV1#notifications}
  */
  readonly notifications?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#region AsGroupV1#region}
  */
  readonly region?: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#scaling_configuration_id AsGroupV1#scaling_configuration_id}
  */
  readonly scalingConfigurationId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#scaling_group_name AsGroupV1#scaling_group_name}
  */
  readonly scalingGroupName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#tags AsGroupV1#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#vpc_id AsGroupV1#vpc_id}
  */
  readonly vpcId: string;
  /**
  * lbaas_listeners block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#lbaas_listeners AsGroupV1#lbaas_listeners}
  */
  readonly lbaasListeners?: AsGroupV1LbaasListeners[] | cdktf.IResolvable;
  /**
  * networks block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#networks AsGroupV1#networks}
  */
  readonly networks: AsGroupV1Networks[] | cdktf.IResolvable;
  /**
  * security_groups block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#security_groups AsGroupV1#security_groups}
  */
  readonly securityGroups?: AsGroupV1SecurityGroups[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#timeouts AsGroupV1#timeouts}
  */
  readonly timeouts?: AsGroupV1Timeouts;
}
export interface AsGroupV1LbaasListeners {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#pool_id AsGroupV1#pool_id}
  */
  readonly poolId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#protocol_port AsGroupV1#protocol_port}
  */
  readonly protocolPort: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#protocol_version AsGroupV1#protocol_version}
  */
  readonly protocolVersion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#weight AsGroupV1#weight}
  */
  readonly weight?: number;
}

export function asGroupV1LbaasListenersToTerraform(struct?: AsGroupV1LbaasListeners | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    pool_id: cdktf.stringToTerraform(struct!.poolId),
    protocol_port: cdktf.numberToTerraform(struct!.protocolPort),
    protocol_version: cdktf.stringToTerraform(struct!.protocolVersion),
    weight: cdktf.numberToTerraform(struct!.weight),
  }
}


export function asGroupV1LbaasListenersToHclTerraform(struct?: AsGroupV1LbaasListeners | cdktf.IResolvable): any {
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
    protocol_port: {
      value: cdktf.numberToHclTerraform(struct!.protocolPort),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    protocol_version: {
      value: cdktf.stringToHclTerraform(struct!.protocolVersion),
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

export class AsGroupV1LbaasListenersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AsGroupV1LbaasListeners | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._poolId !== undefined) {
      hasAnyValues = true;
      internalValueResult.poolId = this._poolId;
    }
    if (this._protocolPort !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocolPort = this._protocolPort;
    }
    if (this._protocolVersion !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocolVersion = this._protocolVersion;
    }
    if (this._weight !== undefined) {
      hasAnyValues = true;
      internalValueResult.weight = this._weight;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AsGroupV1LbaasListeners | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._poolId = undefined;
      this._protocolPort = undefined;
      this._protocolVersion = undefined;
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
      this._protocolPort = value.protocolPort;
      this._protocolVersion = value.protocolVersion;
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

  // protocol_port - computed: false, optional: false, required: true
  private _protocolPort?: number; 
  public get protocolPort() {
    return this.getNumberAttribute('protocol_port');
  }
  public set protocolPort(value: number) {
    this._protocolPort = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolPortInput() {
    return this._protocolPort;
  }

  // protocol_version - computed: true, optional: true, required: false
  private _protocolVersion?: string; 
  public get protocolVersion() {
    return this.getStringAttribute('protocol_version');
  }
  public set protocolVersion(value: string) {
    this._protocolVersion = value;
  }
  public resetProtocolVersion() {
    this._protocolVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolVersionInput() {
    return this._protocolVersion;
  }

  // weight - computed: false, optional: true, required: false
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

export class AsGroupV1LbaasListenersList extends cdktf.ComplexList {
  public internalValue? : AsGroupV1LbaasListeners[] | cdktf.IResolvable

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
  public get(index: number): AsGroupV1LbaasListenersOutputReference {
    return new AsGroupV1LbaasListenersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AsGroupV1Networks {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#id AsGroupV1#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#ipv6_bandwidth_id AsGroupV1#ipv6_bandwidth_id}
  */
  readonly ipv6BandwidthId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#ipv6_enable AsGroupV1#ipv6_enable}
  */
  readonly ipv6Enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#source_dest_check AsGroupV1#source_dest_check}
  */
  readonly sourceDestCheck?: boolean | cdktf.IResolvable;
}

export function asGroupV1NetworksToTerraform(struct?: AsGroupV1Networks | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    id: cdktf.stringToTerraform(struct!.id),
    ipv6_bandwidth_id: cdktf.stringToTerraform(struct!.ipv6BandwidthId),
    ipv6_enable: cdktf.booleanToTerraform(struct!.ipv6Enable),
    source_dest_check: cdktf.booleanToTerraform(struct!.sourceDestCheck),
  }
}


export function asGroupV1NetworksToHclTerraform(struct?: AsGroupV1Networks | cdktf.IResolvable): any {
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
    ipv6_bandwidth_id: {
      value: cdktf.stringToHclTerraform(struct!.ipv6BandwidthId),
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
    source_dest_check: {
      value: cdktf.booleanToHclTerraform(struct!.sourceDestCheck),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AsGroupV1NetworksOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AsGroupV1Networks | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._ipv6BandwidthId !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipv6BandwidthId = this._ipv6BandwidthId;
    }
    if (this._ipv6Enable !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipv6Enable = this._ipv6Enable;
    }
    if (this._sourceDestCheck !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceDestCheck = this._sourceDestCheck;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AsGroupV1Networks | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._id = undefined;
      this._ipv6BandwidthId = undefined;
      this._ipv6Enable = undefined;
      this._sourceDestCheck = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._id = value.id;
      this._ipv6BandwidthId = value.ipv6BandwidthId;
      this._ipv6Enable = value.ipv6Enable;
      this._sourceDestCheck = value.sourceDestCheck;
    }
  }

  // id - computed: false, optional: false, required: true
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // ipv6_bandwidth_id - computed: false, optional: true, required: false
  private _ipv6BandwidthId?: string; 
  public get ipv6BandwidthId() {
    return this.getStringAttribute('ipv6_bandwidth_id');
  }
  public set ipv6BandwidthId(value: string) {
    this._ipv6BandwidthId = value;
  }
  public resetIpv6BandwidthId() {
    this._ipv6BandwidthId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipv6BandwidthIdInput() {
    return this._ipv6BandwidthId;
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

  // source_dest_check - computed: false, optional: true, required: false
  private _sourceDestCheck?: boolean | cdktf.IResolvable; 
  public get sourceDestCheck() {
    return this.getBooleanAttribute('source_dest_check');
  }
  public set sourceDestCheck(value: boolean | cdktf.IResolvable) {
    this._sourceDestCheck = value;
  }
  public resetSourceDestCheck() {
    this._sourceDestCheck = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceDestCheckInput() {
    return this._sourceDestCheck;
  }
}

export class AsGroupV1NetworksList extends cdktf.ComplexList {
  public internalValue? : AsGroupV1Networks[] | cdktf.IResolvable

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
  public get(index: number): AsGroupV1NetworksOutputReference {
    return new AsGroupV1NetworksOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AsGroupV1SecurityGroups {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#id AsGroupV1#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id: string;
}

export function asGroupV1SecurityGroupsToTerraform(struct?: AsGroupV1SecurityGroups | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    id: cdktf.stringToTerraform(struct!.id),
  }
}


export function asGroupV1SecurityGroupsToHclTerraform(struct?: AsGroupV1SecurityGroups | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AsGroupV1SecurityGroupsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AsGroupV1SecurityGroups | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AsGroupV1SecurityGroups | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._id = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._id = value.id;
    }
  }

  // id - computed: false, optional: false, required: true
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }
}

export class AsGroupV1SecurityGroupsList extends cdktf.ComplexList {
  public internalValue? : AsGroupV1SecurityGroups[] | cdktf.IResolvable

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
  public get(index: number): AsGroupV1SecurityGroupsOutputReference {
    return new AsGroupV1SecurityGroupsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AsGroupV1Timeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#create AsGroupV1#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#delete AsGroupV1#delete}
  */
  readonly delete?: string;
}

export function asGroupV1TimeoutsToTerraform(struct?: AsGroupV1Timeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function asGroupV1TimeoutsToHclTerraform(struct?: AsGroupV1Timeouts | cdktf.IResolvable): any {
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

export class AsGroupV1TimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): AsGroupV1Timeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: AsGroupV1Timeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1 huaweicloud_as_group_v1}
*/
export class AsGroupV1 extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_as_group_v1";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AsGroupV1 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AsGroupV1 to import
  * @param importFromId The id of the existing AsGroupV1 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AsGroupV1 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_as_group_v1", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/as_group_v1 huaweicloud_as_group_v1} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AsGroupV1Config
  */
  public constructor(scope: Construct, id: string, config: AsGroupV1Config) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_as_group_v1',
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
    this._agencyName = config.agencyName;
    this._availabilityZones = config.availabilityZones;
    this._availableZones = config.availableZones;
    this._coolDownTime = config.coolDownTime;
    this._deleteInstances = config.deleteInstances;
    this._deletePublicip = config.deletePublicip;
    this._deleteVolume = config.deleteVolume;
    this._description = config.description;
    this._desireInstanceNumber = config.desireInstanceNumber;
    this._enable = config.enable;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._forceDelete = config.forceDelete;
    this._healthPeriodicAuditGracePeriod = config.healthPeriodicAuditGracePeriod;
    this._healthPeriodicAuditMethod = config.healthPeriodicAuditMethod;
    this._healthPeriodicAuditTime = config.healthPeriodicAuditTime;
    this._id = config.id;
    this._instanceTerminatePolicy = config.instanceTerminatePolicy;
    this._lbListenerId = config.lbListenerId;
    this._maxInstanceNumber = config.maxInstanceNumber;
    this._minInstanceNumber = config.minInstanceNumber;
    this._multiAzScalingPolicy = config.multiAzScalingPolicy;
    this._notifications = config.notifications;
    this._region = config.region;
    this._scalingConfigurationId = config.scalingConfigurationId;
    this._scalingGroupName = config.scalingGroupName;
    this._tags = config.tags;
    this._vpcId = config.vpcId;
    this._lbaasListeners.internalValue = config.lbaasListeners;
    this._networks.internalValue = config.networks;
    this._securityGroups.internalValue = config.securityGroups;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // agency_name - computed: true, optional: true, required: false
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

  // availability_zones - computed: true, optional: true, required: false
  private _availabilityZones?: string[]; 
  public get availabilityZones() {
    return this.getListAttribute('availability_zones');
  }
  public set availabilityZones(value: string[]) {
    this._availabilityZones = value;
  }
  public resetAvailabilityZones() {
    this._availabilityZones = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZonesInput() {
    return this._availabilityZones;
  }

  // available_zones - computed: false, optional: true, required: false
  private _availableZones?: string[]; 
  public get availableZones() {
    return this.getListAttribute('available_zones');
  }
  public set availableZones(value: string[]) {
    this._availableZones = value;
  }
  public resetAvailableZones() {
    this._availableZones = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availableZonesInput() {
    return this._availableZones;
  }

  // cool_down_time - computed: false, optional: true, required: false
  private _coolDownTime?: number; 
  public get coolDownTime() {
    return this.getNumberAttribute('cool_down_time');
  }
  public set coolDownTime(value: number) {
    this._coolDownTime = value;
  }
  public resetCoolDownTime() {
    this._coolDownTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get coolDownTimeInput() {
    return this._coolDownTime;
  }

  // current_instance_number - computed: true, optional: false, required: false
  public get currentInstanceNumber() {
    return this.getNumberAttribute('current_instance_number');
  }

  // delete_instances - computed: false, optional: true, required: false
  private _deleteInstances?: string; 
  public get deleteInstances() {
    return this.getStringAttribute('delete_instances');
  }
  public set deleteInstances(value: string) {
    this._deleteInstances = value;
  }
  public resetDeleteInstances() {
    this._deleteInstances = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInstancesInput() {
    return this._deleteInstances;
  }

  // delete_publicip - computed: false, optional: true, required: false
  private _deletePublicip?: boolean | cdktf.IResolvable; 
  public get deletePublicip() {
    return this.getBooleanAttribute('delete_publicip');
  }
  public set deletePublicip(value: boolean | cdktf.IResolvable) {
    this._deletePublicip = value;
  }
  public resetDeletePublicip() {
    this._deletePublicip = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deletePublicipInput() {
    return this._deletePublicip;
  }

  // delete_volume - computed: true, optional: true, required: false
  private _deleteVolume?: boolean | cdktf.IResolvable; 
  public get deleteVolume() {
    return this.getBooleanAttribute('delete_volume');
  }
  public set deleteVolume(value: boolean | cdktf.IResolvable) {
    this._deleteVolume = value;
  }
  public resetDeleteVolume() {
    this._deleteVolume = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteVolumeInput() {
    return this._deleteVolume;
  }

  // description - computed: true, optional: true, required: false
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

  // desire_instance_number - computed: true, optional: true, required: false
  private _desireInstanceNumber?: number; 
  public get desireInstanceNumber() {
    return this.getNumberAttribute('desire_instance_number');
  }
  public set desireInstanceNumber(value: number) {
    this._desireInstanceNumber = value;
  }
  public resetDesireInstanceNumber() {
    this._desireInstanceNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get desireInstanceNumberInput() {
    return this._desireInstanceNumber;
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

  // force_delete - computed: false, optional: true, required: false
  private _forceDelete?: boolean | cdktf.IResolvable; 
  public get forceDelete() {
    return this.getBooleanAttribute('force_delete');
  }
  public set forceDelete(value: boolean | cdktf.IResolvable) {
    this._forceDelete = value;
  }
  public resetForceDelete() {
    this._forceDelete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forceDeleteInput() {
    return this._forceDelete;
  }

  // health_periodic_audit_grace_period - computed: true, optional: true, required: false
  private _healthPeriodicAuditGracePeriod?: number; 
  public get healthPeriodicAuditGracePeriod() {
    return this.getNumberAttribute('health_periodic_audit_grace_period');
  }
  public set healthPeriodicAuditGracePeriod(value: number) {
    this._healthPeriodicAuditGracePeriod = value;
  }
  public resetHealthPeriodicAuditGracePeriod() {
    this._healthPeriodicAuditGracePeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthPeriodicAuditGracePeriodInput() {
    return this._healthPeriodicAuditGracePeriod;
  }

  // health_periodic_audit_method - computed: false, optional: true, required: false
  private _healthPeriodicAuditMethod?: string; 
  public get healthPeriodicAuditMethod() {
    return this.getStringAttribute('health_periodic_audit_method');
  }
  public set healthPeriodicAuditMethod(value: string) {
    this._healthPeriodicAuditMethod = value;
  }
  public resetHealthPeriodicAuditMethod() {
    this._healthPeriodicAuditMethod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthPeriodicAuditMethodInput() {
    return this._healthPeriodicAuditMethod;
  }

  // health_periodic_audit_time - computed: false, optional: true, required: false
  private _healthPeriodicAuditTime?: number; 
  public get healthPeriodicAuditTime() {
    return this.getNumberAttribute('health_periodic_audit_time');
  }
  public set healthPeriodicAuditTime(value: number) {
    this._healthPeriodicAuditTime = value;
  }
  public resetHealthPeriodicAuditTime() {
    this._healthPeriodicAuditTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthPeriodicAuditTimeInput() {
    return this._healthPeriodicAuditTime;
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

  // instance_terminate_policy - computed: false, optional: true, required: false
  private _instanceTerminatePolicy?: string; 
  public get instanceTerminatePolicy() {
    return this.getStringAttribute('instance_terminate_policy');
  }
  public set instanceTerminatePolicy(value: string) {
    this._instanceTerminatePolicy = value;
  }
  public resetInstanceTerminatePolicy() {
    this._instanceTerminatePolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceTerminatePolicyInput() {
    return this._instanceTerminatePolicy;
  }

  // instances - computed: true, optional: false, required: false
  public get instances() {
    return this.getListAttribute('instances');
  }

  // lb_listener_id - computed: false, optional: true, required: false
  private _lbListenerId?: string; 
  public get lbListenerId() {
    return this.getStringAttribute('lb_listener_id');
  }
  public set lbListenerId(value: string) {
    this._lbListenerId = value;
  }
  public resetLbListenerId() {
    this._lbListenerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lbListenerIdInput() {
    return this._lbListenerId;
  }

  // max_instance_number - computed: false, optional: true, required: false
  private _maxInstanceNumber?: number; 
  public get maxInstanceNumber() {
    return this.getNumberAttribute('max_instance_number');
  }
  public set maxInstanceNumber(value: number) {
    this._maxInstanceNumber = value;
  }
  public resetMaxInstanceNumber() {
    this._maxInstanceNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxInstanceNumberInput() {
    return this._maxInstanceNumber;
  }

  // min_instance_number - computed: false, optional: true, required: false
  private _minInstanceNumber?: number; 
  public get minInstanceNumber() {
    return this.getNumberAttribute('min_instance_number');
  }
  public set minInstanceNumber(value: number) {
    this._minInstanceNumber = value;
  }
  public resetMinInstanceNumber() {
    this._minInstanceNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get minInstanceNumberInput() {
    return this._minInstanceNumber;
  }

  // multi_az_scaling_policy - computed: true, optional: true, required: false
  private _multiAzScalingPolicy?: string; 
  public get multiAzScalingPolicy() {
    return this.getStringAttribute('multi_az_scaling_policy');
  }
  public set multiAzScalingPolicy(value: string) {
    this._multiAzScalingPolicy = value;
  }
  public resetMultiAzScalingPolicy() {
    this._multiAzScalingPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get multiAzScalingPolicyInput() {
    return this._multiAzScalingPolicy;
  }

  // notifications - computed: false, optional: true, required: false
  private _notifications?: string[]; 
  public get notifications() {
    return this.getListAttribute('notifications');
  }
  public set notifications(value: string[]) {
    this._notifications = value;
  }
  public resetNotifications() {
    this._notifications = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationsInput() {
    return this._notifications;
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

  // scaling_configuration_id - computed: true, optional: true, required: false
  private _scalingConfigurationId?: string; 
  public get scalingConfigurationId() {
    return this.getStringAttribute('scaling_configuration_id');
  }
  public set scalingConfigurationId(value: string) {
    this._scalingConfigurationId = value;
  }
  public resetScalingConfigurationId() {
    this._scalingConfigurationId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingConfigurationIdInput() {
    return this._scalingConfigurationId;
  }

  // scaling_group_name - computed: false, optional: false, required: true
  private _scalingGroupName?: string; 
  public get scalingGroupName() {
    return this.getStringAttribute('scaling_group_name');
  }
  public set scalingGroupName(value: string) {
    this._scalingGroupName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingGroupNameInput() {
    return this._scalingGroupName;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // vpc_id - computed: false, optional: false, required: true
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // lbaas_listeners - computed: false, optional: true, required: false
  private _lbaasListeners = new AsGroupV1LbaasListenersList(this, "lbaas_listeners", false);
  public get lbaasListeners() {
    return this._lbaasListeners;
  }
  public putLbaasListeners(value: AsGroupV1LbaasListeners[] | cdktf.IResolvable) {
    this._lbaasListeners.internalValue = value;
  }
  public resetLbaasListeners() {
    this._lbaasListeners.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lbaasListenersInput() {
    return this._lbaasListeners.internalValue;
  }

  // networks - computed: false, optional: false, required: true
  private _networks = new AsGroupV1NetworksList(this, "networks", false);
  public get networks() {
    return this._networks;
  }
  public putNetworks(value: AsGroupV1Networks[] | cdktf.IResolvable) {
    this._networks.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get networksInput() {
    return this._networks.internalValue;
  }

  // security_groups - computed: false, optional: true, required: false
  private _securityGroups = new AsGroupV1SecurityGroupsList(this, "security_groups", false);
  public get securityGroups() {
    return this._securityGroups;
  }
  public putSecurityGroups(value: AsGroupV1SecurityGroups[] | cdktf.IResolvable) {
    this._securityGroups.internalValue = value;
  }
  public resetSecurityGroups() {
    this._securityGroups.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupsInput() {
    return this._securityGroups.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new AsGroupV1TimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: AsGroupV1Timeouts) {
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
      agency_name: cdktf.stringToTerraform(this._agencyName),
      availability_zones: cdktf.listMapper(cdktf.stringToTerraform, false)(this._availabilityZones),
      available_zones: cdktf.listMapper(cdktf.stringToTerraform, false)(this._availableZones),
      cool_down_time: cdktf.numberToTerraform(this._coolDownTime),
      delete_instances: cdktf.stringToTerraform(this._deleteInstances),
      delete_publicip: cdktf.booleanToTerraform(this._deletePublicip),
      delete_volume: cdktf.booleanToTerraform(this._deleteVolume),
      description: cdktf.stringToTerraform(this._description),
      desire_instance_number: cdktf.numberToTerraform(this._desireInstanceNumber),
      enable: cdktf.booleanToTerraform(this._enable),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      force_delete: cdktf.booleanToTerraform(this._forceDelete),
      health_periodic_audit_grace_period: cdktf.numberToTerraform(this._healthPeriodicAuditGracePeriod),
      health_periodic_audit_method: cdktf.stringToTerraform(this._healthPeriodicAuditMethod),
      health_periodic_audit_time: cdktf.numberToTerraform(this._healthPeriodicAuditTime),
      id: cdktf.stringToTerraform(this._id),
      instance_terminate_policy: cdktf.stringToTerraform(this._instanceTerminatePolicy),
      lb_listener_id: cdktf.stringToTerraform(this._lbListenerId),
      max_instance_number: cdktf.numberToTerraform(this._maxInstanceNumber),
      min_instance_number: cdktf.numberToTerraform(this._minInstanceNumber),
      multi_az_scaling_policy: cdktf.stringToTerraform(this._multiAzScalingPolicy),
      notifications: cdktf.listMapper(cdktf.stringToTerraform, false)(this._notifications),
      region: cdktf.stringToTerraform(this._region),
      scaling_configuration_id: cdktf.stringToTerraform(this._scalingConfigurationId),
      scaling_group_name: cdktf.stringToTerraform(this._scalingGroupName),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      lbaas_listeners: cdktf.listMapper(asGroupV1LbaasListenersToTerraform, true)(this._lbaasListeners.internalValue),
      networks: cdktf.listMapper(asGroupV1NetworksToTerraform, true)(this._networks.internalValue),
      security_groups: cdktf.listMapper(asGroupV1SecurityGroupsToTerraform, true)(this._securityGroups.internalValue),
      timeouts: asGroupV1TimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      agency_name: {
        value: cdktf.stringToHclTerraform(this._agencyName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      availability_zones: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._availabilityZones),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      available_zones: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._availableZones),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      cool_down_time: {
        value: cdktf.numberToHclTerraform(this._coolDownTime),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      delete_instances: {
        value: cdktf.stringToHclTerraform(this._deleteInstances),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      delete_publicip: {
        value: cdktf.booleanToHclTerraform(this._deletePublicip),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      delete_volume: {
        value: cdktf.booleanToHclTerraform(this._deleteVolume),
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
      desire_instance_number: {
        value: cdktf.numberToHclTerraform(this._desireInstanceNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      enable: {
        value: cdktf.booleanToHclTerraform(this._enable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      force_delete: {
        value: cdktf.booleanToHclTerraform(this._forceDelete),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      health_periodic_audit_grace_period: {
        value: cdktf.numberToHclTerraform(this._healthPeriodicAuditGracePeriod),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      health_periodic_audit_method: {
        value: cdktf.stringToHclTerraform(this._healthPeriodicAuditMethod),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      health_periodic_audit_time: {
        value: cdktf.numberToHclTerraform(this._healthPeriodicAuditTime),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      instance_terminate_policy: {
        value: cdktf.stringToHclTerraform(this._instanceTerminatePolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lb_listener_id: {
        value: cdktf.stringToHclTerraform(this._lbListenerId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      max_instance_number: {
        value: cdktf.numberToHclTerraform(this._maxInstanceNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      min_instance_number: {
        value: cdktf.numberToHclTerraform(this._minInstanceNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      multi_az_scaling_policy: {
        value: cdktf.stringToHclTerraform(this._multiAzScalingPolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      notifications: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._notifications),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      scaling_configuration_id: {
        value: cdktf.stringToHclTerraform(this._scalingConfigurationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      scaling_group_name: {
        value: cdktf.stringToHclTerraform(this._scalingGroupName),
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
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lbaas_listeners: {
        value: cdktf.listMapperHcl(asGroupV1LbaasListenersToHclTerraform, true)(this._lbaasListeners.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AsGroupV1LbaasListenersList",
      },
      networks: {
        value: cdktf.listMapperHcl(asGroupV1NetworksToHclTerraform, true)(this._networks.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AsGroupV1NetworksList",
      },
      security_groups: {
        value: cdktf.listMapperHcl(asGroupV1SecurityGroupsToHclTerraform, true)(this._securityGroups.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AsGroupV1SecurityGroupsList",
      },
      timeouts: {
        value: asGroupV1TimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "AsGroupV1Timeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

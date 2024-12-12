// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CceClusterV3Config extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#alias CceClusterV3#alias}
  */
  readonly alias?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#annotations CceClusterV3#annotations}
  */
  readonly annotations?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#authenticating_proxy_ca CceClusterV3#authenticating_proxy_ca}
  */
  readonly authenticatingProxyCa?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#authenticating_proxy_cert CceClusterV3#authenticating_proxy_cert}
  */
  readonly authenticatingProxyCert?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#authenticating_proxy_private_key CceClusterV3#authenticating_proxy_private_key}
  */
  readonly authenticatingProxyPrivateKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#authentication_mode CceClusterV3#authentication_mode}
  */
  readonly authenticationMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#auto_pay CceClusterV3#auto_pay}
  */
  readonly autoPay?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#auto_renew CceClusterV3#auto_renew}
  */
  readonly autoRenew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#billing_mode CceClusterV3#billing_mode}
  */
  readonly billingMode?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#charging_mode CceClusterV3#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#cluster_type CceClusterV3#cluster_type}
  */
  readonly clusterType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#cluster_version CceClusterV3#cluster_version}
  */
  readonly clusterVersion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#container_network_cidr CceClusterV3#container_network_cidr}
  */
  readonly containerNetworkCidr?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#container_network_type CceClusterV3#container_network_type}
  */
  readonly containerNetworkType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#custom_san CceClusterV3#custom_san}
  */
  readonly customSan?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#delete_all CceClusterV3#delete_all}
  */
  readonly deleteAll?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#delete_efs CceClusterV3#delete_efs}
  */
  readonly deleteEfs?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#delete_eni CceClusterV3#delete_eni}
  */
  readonly deleteEni?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#delete_evs CceClusterV3#delete_evs}
  */
  readonly deleteEvs?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#delete_net CceClusterV3#delete_net}
  */
  readonly deleteNet?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#delete_obs CceClusterV3#delete_obs}
  */
  readonly deleteObs?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#delete_sfs CceClusterV3#delete_sfs}
  */
  readonly deleteSfs?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#description CceClusterV3#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#eip CceClusterV3#eip}
  */
  readonly eip?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#enable_distribute_management CceClusterV3#enable_distribute_management}
  */
  readonly enableDistributeManagement?: boolean | cdktf.IResolvable;
  /**
  * schema: Computed
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#eni_subnet_cidr CceClusterV3#eni_subnet_cidr}
  */
  readonly eniSubnetCidr?: string;
  /**
  * the IPv4 subnet ID of the subnet where the ENI resides
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#eni_subnet_id CceClusterV3#eni_subnet_id}
  */
  readonly eniSubnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#enterprise_project_id CceClusterV3#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#extend_param CceClusterV3#extend_param}
  */
  readonly extendParam?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#flavor_id CceClusterV3#flavor_id}
  */
  readonly flavorId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#hibernate CceClusterV3#hibernate}
  */
  readonly hibernate?: boolean | cdktf.IResolvable;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#highway_subnet_id CceClusterV3#highway_subnet_id}
  */
  readonly highwaySubnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#id CceClusterV3#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#ipv6_enable CceClusterV3#ipv6_enable}
  */
  readonly ipv6Enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#kube_proxy_mode CceClusterV3#kube_proxy_mode}
  */
  readonly kubeProxyMode?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#labels CceClusterV3#labels}
  */
  readonly labels?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#lts_reclaim_policy CceClusterV3#lts_reclaim_policy}
  */
  readonly ltsReclaimPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#multi_az CceClusterV3#multi_az}
  */
  readonly multiAz?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#name CceClusterV3#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#period CceClusterV3#period}
  */
  readonly period?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#period_unit CceClusterV3#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#region CceClusterV3#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#security_group_id CceClusterV3#security_group_id}
  */
  readonly securityGroupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#service_network_cidr CceClusterV3#service_network_cidr}
  */
  readonly serviceNetworkCidr?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#subnet_id CceClusterV3#subnet_id}
  */
  readonly subnetId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#support_istio CceClusterV3#support_istio}
  */
  readonly supportIstio?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#tags CceClusterV3#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#vpc_id CceClusterV3#vpc_id}
  */
  readonly vpcId: string;
  /**
  * component_configurations block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#component_configurations CceClusterV3#component_configurations}
  */
  readonly componentConfigurations?: CceClusterV3ComponentConfigurations[] | cdktf.IResolvable;
  /**
  * extend_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#extend_params CceClusterV3#extend_params}
  */
  readonly extendParams?: CceClusterV3ExtendParams[] | cdktf.IResolvable;
  /**
  * masters block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#masters CceClusterV3#masters}
  */
  readonly masters?: CceClusterV3Masters[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#timeouts CceClusterV3#timeouts}
  */
  readonly timeouts?: CceClusterV3Timeouts;
}
export interface CceClusterV3CertificateClusters {
}

export function cceClusterV3CertificateClustersToTerraform(struct?: CceClusterV3CertificateClusters): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function cceClusterV3CertificateClustersToHclTerraform(struct?: CceClusterV3CertificateClusters): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CceClusterV3CertificateClustersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceClusterV3CertificateClusters | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceClusterV3CertificateClusters | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // certificate_authority_data - computed: true, optional: false, required: false
  public get certificateAuthorityData() {
    return this.getStringAttribute('certificate_authority_data');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // server - computed: true, optional: false, required: false
  public get server() {
    return this.getStringAttribute('server');
  }
}

export class CceClusterV3CertificateClustersList extends cdktf.ComplexList {

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
  public get(index: number): CceClusterV3CertificateClustersOutputReference {
    return new CceClusterV3CertificateClustersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceClusterV3CertificateUsers {
}

export function cceClusterV3CertificateUsersToTerraform(struct?: CceClusterV3CertificateUsers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function cceClusterV3CertificateUsersToHclTerraform(struct?: CceClusterV3CertificateUsers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CceClusterV3CertificateUsersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceClusterV3CertificateUsers | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceClusterV3CertificateUsers | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // client_certificate_data - computed: true, optional: false, required: false
  public get clientCertificateData() {
    return this.getStringAttribute('client_certificate_data');
  }

  // client_key_data - computed: true, optional: false, required: false
  public get clientKeyData() {
    return this.getStringAttribute('client_key_data');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }
}

export class CceClusterV3CertificateUsersList extends cdktf.ComplexList {

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
  public get(index: number): CceClusterV3CertificateUsersOutputReference {
    return new CceClusterV3CertificateUsersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceClusterV3ComponentConfigurations {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#configurations CceClusterV3#configurations}
  */
  readonly configurations?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#name CceClusterV3#name}
  */
  readonly name: string;
}

export function cceClusterV3ComponentConfigurationsToTerraform(struct?: CceClusterV3ComponentConfigurations | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    configurations: cdktf.stringToTerraform(struct!.configurations),
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function cceClusterV3ComponentConfigurationsToHclTerraform(struct?: CceClusterV3ComponentConfigurations | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    configurations: {
      value: cdktf.stringToHclTerraform(struct!.configurations),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceClusterV3ComponentConfigurationsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceClusterV3ComponentConfigurations | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._configurations !== undefined) {
      hasAnyValues = true;
      internalValueResult.configurations = this._configurations;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceClusterV3ComponentConfigurations | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._configurations = undefined;
      this._name = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._configurations = value.configurations;
      this._name = value.name;
    }
  }

  // configurations - computed: false, optional: true, required: false
  private _configurations?: string; 
  public get configurations() {
    return this.getStringAttribute('configurations');
  }
  public set configurations(value: string) {
    this._configurations = value;
  }
  public resetConfigurations() {
    this._configurations = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configurationsInput() {
    return this._configurations;
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
}

export class CceClusterV3ComponentConfigurationsList extends cdktf.ComplexList {
  public internalValue? : CceClusterV3ComponentConfigurations[] | cdktf.IResolvable

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
  public get(index: number): CceClusterV3ComponentConfigurationsOutputReference {
    return new CceClusterV3ComponentConfigurationsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceClusterV3ExtendParams {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#cluster_az CceClusterV3#cluster_az}
  */
  readonly clusterAz?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#cpu_manager_policy CceClusterV3#cpu_manager_policy}
  */
  readonly cpuManagerPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#dec_master_flavor CceClusterV3#dec_master_flavor}
  */
  readonly decMasterFlavor?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#docker_umask_mode CceClusterV3#docker_umask_mode}
  */
  readonly dockerUmaskMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#dss_master_volumes CceClusterV3#dss_master_volumes}
  */
  readonly dssMasterVolumes?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#fix_pool_mask CceClusterV3#fix_pool_mask}
  */
  readonly fixPoolMask?: string;
}

export function cceClusterV3ExtendParamsToTerraform(struct?: CceClusterV3ExtendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cluster_az: cdktf.stringToTerraform(struct!.clusterAz),
    cpu_manager_policy: cdktf.stringToTerraform(struct!.cpuManagerPolicy),
    dec_master_flavor: cdktf.stringToTerraform(struct!.decMasterFlavor),
    docker_umask_mode: cdktf.stringToTerraform(struct!.dockerUmaskMode),
    dss_master_volumes: cdktf.stringToTerraform(struct!.dssMasterVolumes),
    fix_pool_mask: cdktf.stringToTerraform(struct!.fixPoolMask),
  }
}


export function cceClusterV3ExtendParamsToHclTerraform(struct?: CceClusterV3ExtendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cluster_az: {
      value: cdktf.stringToHclTerraform(struct!.clusterAz),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    cpu_manager_policy: {
      value: cdktf.stringToHclTerraform(struct!.cpuManagerPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    dec_master_flavor: {
      value: cdktf.stringToHclTerraform(struct!.decMasterFlavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    docker_umask_mode: {
      value: cdktf.stringToHclTerraform(struct!.dockerUmaskMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    dss_master_volumes: {
      value: cdktf.stringToHclTerraform(struct!.dssMasterVolumes),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    fix_pool_mask: {
      value: cdktf.stringToHclTerraform(struct!.fixPoolMask),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceClusterV3ExtendParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceClusterV3ExtendParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._clusterAz !== undefined) {
      hasAnyValues = true;
      internalValueResult.clusterAz = this._clusterAz;
    }
    if (this._cpuManagerPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.cpuManagerPolicy = this._cpuManagerPolicy;
    }
    if (this._decMasterFlavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.decMasterFlavor = this._decMasterFlavor;
    }
    if (this._dockerUmaskMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.dockerUmaskMode = this._dockerUmaskMode;
    }
    if (this._dssMasterVolumes !== undefined) {
      hasAnyValues = true;
      internalValueResult.dssMasterVolumes = this._dssMasterVolumes;
    }
    if (this._fixPoolMask !== undefined) {
      hasAnyValues = true;
      internalValueResult.fixPoolMask = this._fixPoolMask;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceClusterV3ExtendParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._clusterAz = undefined;
      this._cpuManagerPolicy = undefined;
      this._decMasterFlavor = undefined;
      this._dockerUmaskMode = undefined;
      this._dssMasterVolumes = undefined;
      this._fixPoolMask = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._clusterAz = value.clusterAz;
      this._cpuManagerPolicy = value.cpuManagerPolicy;
      this._decMasterFlavor = value.decMasterFlavor;
      this._dockerUmaskMode = value.dockerUmaskMode;
      this._dssMasterVolumes = value.dssMasterVolumes;
      this._fixPoolMask = value.fixPoolMask;
    }
  }

  // cluster_az - computed: false, optional: true, required: false
  private _clusterAz?: string; 
  public get clusterAz() {
    return this.getStringAttribute('cluster_az');
  }
  public set clusterAz(value: string) {
    this._clusterAz = value;
  }
  public resetClusterAz() {
    this._clusterAz = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterAzInput() {
    return this._clusterAz;
  }

  // cpu_manager_policy - computed: false, optional: true, required: false
  private _cpuManagerPolicy?: string; 
  public get cpuManagerPolicy() {
    return this.getStringAttribute('cpu_manager_policy');
  }
  public set cpuManagerPolicy(value: string) {
    this._cpuManagerPolicy = value;
  }
  public resetCpuManagerPolicy() {
    this._cpuManagerPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cpuManagerPolicyInput() {
    return this._cpuManagerPolicy;
  }

  // dec_master_flavor - computed: false, optional: true, required: false
  private _decMasterFlavor?: string; 
  public get decMasterFlavor() {
    return this.getStringAttribute('dec_master_flavor');
  }
  public set decMasterFlavor(value: string) {
    this._decMasterFlavor = value;
  }
  public resetDecMasterFlavor() {
    this._decMasterFlavor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get decMasterFlavorInput() {
    return this._decMasterFlavor;
  }

  // docker_umask_mode - computed: false, optional: true, required: false
  private _dockerUmaskMode?: string; 
  public get dockerUmaskMode() {
    return this.getStringAttribute('docker_umask_mode');
  }
  public set dockerUmaskMode(value: string) {
    this._dockerUmaskMode = value;
  }
  public resetDockerUmaskMode() {
    this._dockerUmaskMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dockerUmaskModeInput() {
    return this._dockerUmaskMode;
  }

  // dss_master_volumes - computed: false, optional: true, required: false
  private _dssMasterVolumes?: string; 
  public get dssMasterVolumes() {
    return this.getStringAttribute('dss_master_volumes');
  }
  public set dssMasterVolumes(value: string) {
    this._dssMasterVolumes = value;
  }
  public resetDssMasterVolumes() {
    this._dssMasterVolumes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dssMasterVolumesInput() {
    return this._dssMasterVolumes;
  }

  // fix_pool_mask - computed: false, optional: true, required: false
  private _fixPoolMask?: string; 
  public get fixPoolMask() {
    return this.getStringAttribute('fix_pool_mask');
  }
  public set fixPoolMask(value: string) {
    this._fixPoolMask = value;
  }
  public resetFixPoolMask() {
    this._fixPoolMask = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fixPoolMaskInput() {
    return this._fixPoolMask;
  }
}

export class CceClusterV3ExtendParamsList extends cdktf.ComplexList {
  public internalValue? : CceClusterV3ExtendParams[] | cdktf.IResolvable

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
  public get(index: number): CceClusterV3ExtendParamsOutputReference {
    return new CceClusterV3ExtendParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceClusterV3Masters {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#availability_zone CceClusterV3#availability_zone}
  */
  readonly availabilityZone?: string;
}

export function cceClusterV3MastersToTerraform(struct?: CceClusterV3Masters | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    availability_zone: cdktf.stringToTerraform(struct!.availabilityZone),
  }
}


export function cceClusterV3MastersToHclTerraform(struct?: CceClusterV3Masters | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    availability_zone: {
      value: cdktf.stringToHclTerraform(struct!.availabilityZone),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CceClusterV3MastersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CceClusterV3Masters | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._availabilityZone !== undefined) {
      hasAnyValues = true;
      internalValueResult.availabilityZone = this._availabilityZone;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CceClusterV3Masters | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._availabilityZone = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._availabilityZone = value.availabilityZone;
    }
  }

  // availability_zone - computed: true, optional: true, required: false
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
}

export class CceClusterV3MastersList extends cdktf.ComplexList {
  public internalValue? : CceClusterV3Masters[] | cdktf.IResolvable

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
  public get(index: number): CceClusterV3MastersOutputReference {
    return new CceClusterV3MastersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CceClusterV3Timeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#create CceClusterV3#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#delete CceClusterV3#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#update CceClusterV3#update}
  */
  readonly update?: string;
}

export function cceClusterV3TimeoutsToTerraform(struct?: CceClusterV3Timeouts | cdktf.IResolvable): any {
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


export function cceClusterV3TimeoutsToHclTerraform(struct?: CceClusterV3Timeouts | cdktf.IResolvable): any {
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

export class CceClusterV3TimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CceClusterV3Timeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CceClusterV3Timeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3 huaweicloud_cce_cluster_v3}
*/
export class CceClusterV3 extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cce_cluster_v3";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CceClusterV3 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CceClusterV3 to import
  * @param importFromId The id of the existing CceClusterV3 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CceClusterV3 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cce_cluster_v3", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cce_cluster_v3 huaweicloud_cce_cluster_v3} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CceClusterV3Config
  */
  public constructor(scope: Construct, id: string, config: CceClusterV3Config) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cce_cluster_v3',
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
    this._authenticatingProxyCa = config.authenticatingProxyCa;
    this._authenticatingProxyCert = config.authenticatingProxyCert;
    this._authenticatingProxyPrivateKey = config.authenticatingProxyPrivateKey;
    this._authenticationMode = config.authenticationMode;
    this._autoPay = config.autoPay;
    this._autoRenew = config.autoRenew;
    this._billingMode = config.billingMode;
    this._chargingMode = config.chargingMode;
    this._clusterType = config.clusterType;
    this._clusterVersion = config.clusterVersion;
    this._containerNetworkCidr = config.containerNetworkCidr;
    this._containerNetworkType = config.containerNetworkType;
    this._customSan = config.customSan;
    this._deleteAll = config.deleteAll;
    this._deleteEfs = config.deleteEfs;
    this._deleteEni = config.deleteEni;
    this._deleteEvs = config.deleteEvs;
    this._deleteNet = config.deleteNet;
    this._deleteObs = config.deleteObs;
    this._deleteSfs = config.deleteSfs;
    this._description = config.description;
    this._eip = config.eip;
    this._enableDistributeManagement = config.enableDistributeManagement;
    this._eniSubnetCidr = config.eniSubnetCidr;
    this._eniSubnetId = config.eniSubnetId;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._extendParam = config.extendParam;
    this._flavorId = config.flavorId;
    this._hibernate = config.hibernate;
    this._highwaySubnetId = config.highwaySubnetId;
    this._id = config.id;
    this._ipv6Enable = config.ipv6Enable;
    this._kubeProxyMode = config.kubeProxyMode;
    this._labels = config.labels;
    this._ltsReclaimPolicy = config.ltsReclaimPolicy;
    this._multiAz = config.multiAz;
    this._name = config.name;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._region = config.region;
    this._securityGroupId = config.securityGroupId;
    this._serviceNetworkCidr = config.serviceNetworkCidr;
    this._subnetId = config.subnetId;
    this._supportIstio = config.supportIstio;
    this._tags = config.tags;
    this._vpcId = config.vpcId;
    this._componentConfigurations.internalValue = config.componentConfigurations;
    this._extendParams.internalValue = config.extendParams;
    this._masters.internalValue = config.masters;
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

  // authenticating_proxy_ca - computed: false, optional: true, required: false
  private _authenticatingProxyCa?: string; 
  public get authenticatingProxyCa() {
    return this.getStringAttribute('authenticating_proxy_ca');
  }
  public set authenticatingProxyCa(value: string) {
    this._authenticatingProxyCa = value;
  }
  public resetAuthenticatingProxyCa() {
    this._authenticatingProxyCa = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticatingProxyCaInput() {
    return this._authenticatingProxyCa;
  }

  // authenticating_proxy_cert - computed: false, optional: true, required: false
  private _authenticatingProxyCert?: string; 
  public get authenticatingProxyCert() {
    return this.getStringAttribute('authenticating_proxy_cert');
  }
  public set authenticatingProxyCert(value: string) {
    this._authenticatingProxyCert = value;
  }
  public resetAuthenticatingProxyCert() {
    this._authenticatingProxyCert = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticatingProxyCertInput() {
    return this._authenticatingProxyCert;
  }

  // authenticating_proxy_private_key - computed: false, optional: true, required: false
  private _authenticatingProxyPrivateKey?: string; 
  public get authenticatingProxyPrivateKey() {
    return this.getStringAttribute('authenticating_proxy_private_key');
  }
  public set authenticatingProxyPrivateKey(value: string) {
    this._authenticatingProxyPrivateKey = value;
  }
  public resetAuthenticatingProxyPrivateKey() {
    this._authenticatingProxyPrivateKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticatingProxyPrivateKeyInput() {
    return this._authenticatingProxyPrivateKey;
  }

  // authentication_mode - computed: false, optional: true, required: false
  private _authenticationMode?: string; 
  public get authenticationMode() {
    return this.getStringAttribute('authentication_mode');
  }
  public set authenticationMode(value: string) {
    this._authenticationMode = value;
  }
  public resetAuthenticationMode() {
    this._authenticationMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticationModeInput() {
    return this._authenticationMode;
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

  // category - computed: true, optional: false, required: false
  public get category() {
    return this.getStringAttribute('category');
  }

  // certificate_clusters - computed: true, optional: false, required: false
  private _certificateClusters = new CceClusterV3CertificateClustersList(this, "certificate_clusters", false);
  public get certificateClusters() {
    return this._certificateClusters;
  }

  // certificate_users - computed: true, optional: false, required: false
  private _certificateUsers = new CceClusterV3CertificateUsersList(this, "certificate_users", false);
  public get certificateUsers() {
    return this._certificateUsers;
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

  // cluster_type - computed: false, optional: true, required: false
  private _clusterType?: string; 
  public get clusterType() {
    return this.getStringAttribute('cluster_type');
  }
  public set clusterType(value: string) {
    this._clusterType = value;
  }
  public resetClusterType() {
    this._clusterType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterTypeInput() {
    return this._clusterType;
  }

  // cluster_version - computed: true, optional: true, required: false
  private _clusterVersion?: string; 
  public get clusterVersion() {
    return this.getStringAttribute('cluster_version');
  }
  public set clusterVersion(value: string) {
    this._clusterVersion = value;
  }
  public resetClusterVersion() {
    this._clusterVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterVersionInput() {
    return this._clusterVersion;
  }

  // container_network_cidr - computed: true, optional: true, required: false
  private _containerNetworkCidr?: string; 
  public get containerNetworkCidr() {
    return this.getStringAttribute('container_network_cidr');
  }
  public set containerNetworkCidr(value: string) {
    this._containerNetworkCidr = value;
  }
  public resetContainerNetworkCidr() {
    this._containerNetworkCidr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get containerNetworkCidrInput() {
    return this._containerNetworkCidr;
  }

  // container_network_type - computed: false, optional: false, required: true
  private _containerNetworkType?: string; 
  public get containerNetworkType() {
    return this.getStringAttribute('container_network_type');
  }
  public set containerNetworkType(value: string) {
    this._containerNetworkType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get containerNetworkTypeInput() {
    return this._containerNetworkType;
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

  // delete_all - computed: false, optional: true, required: false
  private _deleteAll?: string; 
  public get deleteAll() {
    return this.getStringAttribute('delete_all');
  }
  public set deleteAll(value: string) {
    this._deleteAll = value;
  }
  public resetDeleteAll() {
    this._deleteAll = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteAllInput() {
    return this._deleteAll;
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

  // delete_evs - computed: false, optional: true, required: false
  private _deleteEvs?: string; 
  public get deleteEvs() {
    return this.getStringAttribute('delete_evs');
  }
  public set deleteEvs(value: string) {
    this._deleteEvs = value;
  }
  public resetDeleteEvs() {
    this._deleteEvs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteEvsInput() {
    return this._deleteEvs;
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

  // delete_sfs - computed: false, optional: true, required: false
  private _deleteSfs?: string; 
  public get deleteSfs() {
    return this.getStringAttribute('delete_sfs');
  }
  public set deleteSfs(value: string) {
    this._deleteSfs = value;
  }
  public resetDeleteSfs() {
    this._deleteSfs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteSfsInput() {
    return this._deleteSfs;
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

  // eip - computed: false, optional: true, required: false
  private _eip?: string; 
  public get eip() {
    return this.getStringAttribute('eip');
  }
  public set eip(value: string) {
    this._eip = value;
  }
  public resetEip() {
    this._eip = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eipInput() {
    return this._eip;
  }

  // enable_distribute_management - computed: false, optional: true, required: false
  private _enableDistributeManagement?: boolean | cdktf.IResolvable; 
  public get enableDistributeManagement() {
    return this.getBooleanAttribute('enable_distribute_management');
  }
  public set enableDistributeManagement(value: boolean | cdktf.IResolvable) {
    this._enableDistributeManagement = value;
  }
  public resetEnableDistributeManagement() {
    this._enableDistributeManagement = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableDistributeManagementInput() {
    return this._enableDistributeManagement;
  }

  // eni_subnet_cidr - computed: true, optional: true, required: false
  private _eniSubnetCidr?: string; 
  public get eniSubnetCidr() {
    return this.getStringAttribute('eni_subnet_cidr');
  }
  public set eniSubnetCidr(value: string) {
    this._eniSubnetCidr = value;
  }
  public resetEniSubnetCidr() {
    this._eniSubnetCidr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eniSubnetCidrInput() {
    return this._eniSubnetCidr;
  }

  // eni_subnet_id - computed: true, optional: true, required: false
  private _eniSubnetId?: string; 
  public get eniSubnetId() {
    return this.getStringAttribute('eni_subnet_id');
  }
  public set eniSubnetId(value: string) {
    this._eniSubnetId = value;
  }
  public resetEniSubnetId() {
    this._eniSubnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eniSubnetIdInput() {
    return this._eniSubnetId;
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

  // hibernate - computed: false, optional: true, required: false
  private _hibernate?: boolean | cdktf.IResolvable; 
  public get hibernate() {
    return this.getBooleanAttribute('hibernate');
  }
  public set hibernate(value: boolean | cdktf.IResolvable) {
    this._hibernate = value;
  }
  public resetHibernate() {
    this._hibernate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hibernateInput() {
    return this._hibernate;
  }

  // highway_subnet_id - computed: true, optional: true, required: false
  private _highwaySubnetId?: string; 
  public get highwaySubnetId() {
    return this.getStringAttribute('highway_subnet_id');
  }
  public set highwaySubnetId(value: string) {
    this._highwaySubnetId = value;
  }
  public resetHighwaySubnetId() {
    this._highwaySubnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get highwaySubnetIdInput() {
    return this._highwaySubnetId;
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

  // kube_config_raw - computed: true, optional: false, required: false
  public get kubeConfigRaw() {
    return this.getStringAttribute('kube_config_raw');
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

  // multi_az - computed: false, optional: true, required: false
  private _multiAz?: boolean | cdktf.IResolvable; 
  public get multiAz() {
    return this.getBooleanAttribute('multi_az');
  }
  public set multiAz(value: boolean | cdktf.IResolvable) {
    this._multiAz = value;
  }
  public resetMultiAz() {
    this._multiAz = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get multiAzInput() {
    return this._multiAz;
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

  // security_group_id - computed: true, optional: true, required: false
  private _securityGroupId?: string; 
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }
  public set securityGroupId(value: string) {
    this._securityGroupId = value;
  }
  public resetSecurityGroupId() {
    this._securityGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupIdInput() {
    return this._securityGroupId;
  }

  // service_network_cidr - computed: true, optional: true, required: false
  private _serviceNetworkCidr?: string; 
  public get serviceNetworkCidr() {
    return this.getStringAttribute('service_network_cidr');
  }
  public set serviceNetworkCidr(value: string) {
    this._serviceNetworkCidr = value;
  }
  public resetServiceNetworkCidr() {
    this._serviceNetworkCidr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceNetworkCidrInput() {
    return this._serviceNetworkCidr;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // support_istio - computed: true, optional: true, required: false
  private _supportIstio?: boolean | cdktf.IResolvable; 
  public get supportIstio() {
    return this.getBooleanAttribute('support_istio');
  }
  public set supportIstio(value: boolean | cdktf.IResolvable) {
    this._supportIstio = value;
  }
  public resetSupportIstio() {
    this._supportIstio = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get supportIstioInput() {
    return this._supportIstio;
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

  // component_configurations - computed: false, optional: true, required: false
  private _componentConfigurations = new CceClusterV3ComponentConfigurationsList(this, "component_configurations", false);
  public get componentConfigurations() {
    return this._componentConfigurations;
  }
  public putComponentConfigurations(value: CceClusterV3ComponentConfigurations[] | cdktf.IResolvable) {
    this._componentConfigurations.internalValue = value;
  }
  public resetComponentConfigurations() {
    this._componentConfigurations.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get componentConfigurationsInput() {
    return this._componentConfigurations.internalValue;
  }

  // extend_params - computed: false, optional: true, required: false
  private _extendParams = new CceClusterV3ExtendParamsList(this, "extend_params", false);
  public get extendParams() {
    return this._extendParams;
  }
  public putExtendParams(value: CceClusterV3ExtendParams[] | cdktf.IResolvable) {
    this._extendParams.internalValue = value;
  }
  public resetExtendParams() {
    this._extendParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendParamsInput() {
    return this._extendParams.internalValue;
  }

  // masters - computed: false, optional: true, required: false
  private _masters = new CceClusterV3MastersList(this, "masters", false);
  public get masters() {
    return this._masters;
  }
  public putMasters(value: CceClusterV3Masters[] | cdktf.IResolvable) {
    this._masters.internalValue = value;
  }
  public resetMasters() {
    this._masters.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mastersInput() {
    return this._masters.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CceClusterV3TimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CceClusterV3Timeouts) {
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
      authenticating_proxy_ca: cdktf.stringToTerraform(this._authenticatingProxyCa),
      authenticating_proxy_cert: cdktf.stringToTerraform(this._authenticatingProxyCert),
      authenticating_proxy_private_key: cdktf.stringToTerraform(this._authenticatingProxyPrivateKey),
      authentication_mode: cdktf.stringToTerraform(this._authenticationMode),
      auto_pay: cdktf.stringToTerraform(this._autoPay),
      auto_renew: cdktf.stringToTerraform(this._autoRenew),
      billing_mode: cdktf.numberToTerraform(this._billingMode),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      cluster_type: cdktf.stringToTerraform(this._clusterType),
      cluster_version: cdktf.stringToTerraform(this._clusterVersion),
      container_network_cidr: cdktf.stringToTerraform(this._containerNetworkCidr),
      container_network_type: cdktf.stringToTerraform(this._containerNetworkType),
      custom_san: cdktf.listMapper(cdktf.stringToTerraform, false)(this._customSan),
      delete_all: cdktf.stringToTerraform(this._deleteAll),
      delete_efs: cdktf.stringToTerraform(this._deleteEfs),
      delete_eni: cdktf.stringToTerraform(this._deleteEni),
      delete_evs: cdktf.stringToTerraform(this._deleteEvs),
      delete_net: cdktf.stringToTerraform(this._deleteNet),
      delete_obs: cdktf.stringToTerraform(this._deleteObs),
      delete_sfs: cdktf.stringToTerraform(this._deleteSfs),
      description: cdktf.stringToTerraform(this._description),
      eip: cdktf.stringToTerraform(this._eip),
      enable_distribute_management: cdktf.booleanToTerraform(this._enableDistributeManagement),
      eni_subnet_cidr: cdktf.stringToTerraform(this._eniSubnetCidr),
      eni_subnet_id: cdktf.stringToTerraform(this._eniSubnetId),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      extend_param: cdktf.hashMapper(cdktf.stringToTerraform)(this._extendParam),
      flavor_id: cdktf.stringToTerraform(this._flavorId),
      hibernate: cdktf.booleanToTerraform(this._hibernate),
      highway_subnet_id: cdktf.stringToTerraform(this._highwaySubnetId),
      id: cdktf.stringToTerraform(this._id),
      ipv6_enable: cdktf.booleanToTerraform(this._ipv6Enable),
      kube_proxy_mode: cdktf.stringToTerraform(this._kubeProxyMode),
      labels: cdktf.hashMapper(cdktf.stringToTerraform)(this._labels),
      lts_reclaim_policy: cdktf.stringToTerraform(this._ltsReclaimPolicy),
      multi_az: cdktf.booleanToTerraform(this._multiAz),
      name: cdktf.stringToTerraform(this._name),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      region: cdktf.stringToTerraform(this._region),
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      service_network_cidr: cdktf.stringToTerraform(this._serviceNetworkCidr),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      support_istio: cdktf.booleanToTerraform(this._supportIstio),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      component_configurations: cdktf.listMapper(cceClusterV3ComponentConfigurationsToTerraform, true)(this._componentConfigurations.internalValue),
      extend_params: cdktf.listMapper(cceClusterV3ExtendParamsToTerraform, true)(this._extendParams.internalValue),
      masters: cdktf.listMapper(cceClusterV3MastersToTerraform, true)(this._masters.internalValue),
      timeouts: cceClusterV3TimeoutsToTerraform(this._timeouts.internalValue),
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
      authenticating_proxy_ca: {
        value: cdktf.stringToHclTerraform(this._authenticatingProxyCa),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      authenticating_proxy_cert: {
        value: cdktf.stringToHclTerraform(this._authenticatingProxyCert),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      authenticating_proxy_private_key: {
        value: cdktf.stringToHclTerraform(this._authenticatingProxyPrivateKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      authentication_mode: {
        value: cdktf.stringToHclTerraform(this._authenticationMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
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
      cluster_type: {
        value: cdktf.stringToHclTerraform(this._clusterType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_version: {
        value: cdktf.stringToHclTerraform(this._clusterVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      container_network_cidr: {
        value: cdktf.stringToHclTerraform(this._containerNetworkCidr),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      container_network_type: {
        value: cdktf.stringToHclTerraform(this._containerNetworkType),
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
      delete_all: {
        value: cdktf.stringToHclTerraform(this._deleteAll),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
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
      delete_evs: {
        value: cdktf.stringToHclTerraform(this._deleteEvs),
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
      delete_sfs: {
        value: cdktf.stringToHclTerraform(this._deleteSfs),
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
      eip: {
        value: cdktf.stringToHclTerraform(this._eip),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_distribute_management: {
        value: cdktf.booleanToHclTerraform(this._enableDistributeManagement),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      eni_subnet_cidr: {
        value: cdktf.stringToHclTerraform(this._eniSubnetCidr),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      eni_subnet_id: {
        value: cdktf.stringToHclTerraform(this._eniSubnetId),
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
      hibernate: {
        value: cdktf.booleanToHclTerraform(this._hibernate),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      highway_subnet_id: {
        value: cdktf.stringToHclTerraform(this._highwaySubnetId),
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
      labels: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._labels),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      lts_reclaim_policy: {
        value: cdktf.stringToHclTerraform(this._ltsReclaimPolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      multi_az: {
        value: cdktf.booleanToHclTerraform(this._multiAz),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      security_group_id: {
        value: cdktf.stringToHclTerraform(this._securityGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      service_network_cidr: {
        value: cdktf.stringToHclTerraform(this._serviceNetworkCidr),
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
      support_istio: {
        value: cdktf.booleanToHclTerraform(this._supportIstio),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      component_configurations: {
        value: cdktf.listMapperHcl(cceClusterV3ComponentConfigurationsToHclTerraform, true)(this._componentConfigurations.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceClusterV3ComponentConfigurationsList",
      },
      extend_params: {
        value: cdktf.listMapperHcl(cceClusterV3ExtendParamsToHclTerraform, true)(this._extendParams.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceClusterV3ExtendParamsList",
      },
      masters: {
        value: cdktf.listMapperHcl(cceClusterV3MastersToHclTerraform, true)(this._masters.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CceClusterV3MastersList",
      },
      timeouts: {
        value: cceClusterV3TimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CceClusterV3Timeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

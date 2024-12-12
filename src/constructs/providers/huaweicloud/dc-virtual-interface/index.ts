// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DcVirtualInterfaceConfig extends cdktf.TerraformMetaArguments {
  /**
  * The address family type of the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#address_family DcVirtualInterface#address_family}
  */
  readonly addressFamily?: string;
  /**
  * The local BGP ASN in client side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#asn DcVirtualInterface#asn}
  */
  readonly asn?: number;
  /**
  * The ingress bandwidth size of the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#bandwidth DcVirtualInterface#bandwidth}
  */
  readonly bandwidth: number;
  /**
  * The (MD5) password for the local BGP.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#bgp_md5 DcVirtualInterface#bgp_md5}
  */
  readonly bgpMd5?: string;
  /**
  * The description of the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#description DcVirtualInterface#description}
  */
  readonly description?: string;
  /**
  * The ID of the direct connection associated with the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#direct_connect_id DcVirtualInterface#direct_connect_id}
  */
  readonly directConnectId: string;
  /**
  * Whether to enable the Bidirectional Forwarding Detection (BFD) function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#enable_bfd DcVirtualInterface#enable_bfd}
  */
  readonly enableBfd?: boolean | cdktf.IResolvable;
  /**
  * Whether to enable the Network Quality Analysis (NQA) function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#enable_nqa DcVirtualInterface#enable_nqa}
  */
  readonly enableNqa?: boolean | cdktf.IResolvable;
  /**
  * The enterprise project ID to which the virtual interface belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#enterprise_project_id DcVirtualInterface#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#id DcVirtualInterface#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the link aggregation group (LAG) associated with the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#lag_id DcVirtualInterface#lag_id}
  */
  readonly lagId?: string;
  /**
  * The IPv4 address of the virtual interface in cloud side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#local_gateway_v4_ip DcVirtualInterface#local_gateway_v4_ip}
  */
  readonly localGatewayV4Ip?: string;
  /**
  * The IPv6 address of the virtual interface in cloud side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#local_gateway_v6_ip DcVirtualInterface#local_gateway_v6_ip}
  */
  readonly localGatewayV6Ip?: string;
  /**
  * The name of the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#name DcVirtualInterface#name}
  */
  readonly name: string;
  /**
  * The region where the virtual interface is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#region DcVirtualInterface#region}
  */
  readonly region?: string;
  /**
  * The CIDR list of remote subnets.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#remote_ep_group DcVirtualInterface#remote_ep_group}
  */
  readonly remoteEpGroup: string[];
  /**
  * The IPv4 address of the virtual interface in client side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#remote_gateway_v4_ip DcVirtualInterface#remote_gateway_v4_ip}
  */
  readonly remoteGatewayV4Ip?: string;
  /**
  * The IPv6 address of the virtual interface in client side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#remote_gateway_v6_ip DcVirtualInterface#remote_gateway_v6_ip}
  */
  readonly remoteGatewayV6Ip?: string;
  /**
  * The project ID of another tenant which is used to create virtual interface across tenant.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#resource_tenant_id DcVirtualInterface#resource_tenant_id}
  */
  readonly resourceTenantId?: string;
  /**
  * The route mode of the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#route_mode DcVirtualInterface#route_mode}
  */
  readonly routeMode: string;
  /**
  * The service type of the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#service_type DcVirtualInterface#service_type}
  */
  readonly serviceType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#tags DcVirtualInterface#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * The type of the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#type DcVirtualInterface#type}
  */
  readonly type: string;
  /**
  * The ID of the virtual gateway to which the virtual interface is connected.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#vgw_id DcVirtualInterface#vgw_id}
  */
  readonly vgwId: string;
  /**
  * The VLAN for constom side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#vlan DcVirtualInterface#vlan}
  */
  readonly vlan: number;
}
export interface DcVirtualInterfaceVifPeers {
}

export function dcVirtualInterfaceVifPeersToTerraform(struct?: DcVirtualInterfaceVifPeers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dcVirtualInterfaceVifPeersToHclTerraform(struct?: DcVirtualInterfaceVifPeers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DcVirtualInterfaceVifPeersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DcVirtualInterfaceVifPeers | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DcVirtualInterfaceVifPeers | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // address_family - computed: true, optional: false, required: false
  public get addressFamily() {
    return this.getStringAttribute('address_family');
  }

  // bgp_asn - computed: true, optional: false, required: false
  public get bgpAsn() {
    return this.getNumberAttribute('bgp_asn');
  }

  // bgp_md5 - computed: true, optional: false, required: false
  public get bgpMd5() {
    return this.getStringAttribute('bgp_md5');
  }

  // bgp_route_limit - computed: true, optional: false, required: false
  public get bgpRouteLimit() {
    return this.getNumberAttribute('bgp_route_limit');
  }

  // bgp_status - computed: true, optional: false, required: false
  public get bgpStatus() {
    return this.getStringAttribute('bgp_status');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // device_id - computed: true, optional: false, required: false
  public get deviceId() {
    return this.getStringAttribute('device_id');
  }

  // enable_bfd - computed: true, optional: false, required: false
  public get enableBfd() {
    return this.getBooleanAttribute('enable_bfd');
  }

  // enable_nqa - computed: true, optional: false, required: false
  public get enableNqa() {
    return this.getBooleanAttribute('enable_nqa');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // local_gateway_ip - computed: true, optional: false, required: false
  public get localGatewayIp() {
    return this.getStringAttribute('local_gateway_ip');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // receive_route_num - computed: true, optional: false, required: false
  public get receiveRouteNum() {
    return this.getNumberAttribute('receive_route_num');
  }

  // remote_ep_group - computed: true, optional: false, required: false
  public get remoteEpGroup() {
    return this.getListAttribute('remote_ep_group');
  }

  // remote_gateway_ip - computed: true, optional: false, required: false
  public get remoteGatewayIp() {
    return this.getStringAttribute('remote_gateway_ip');
  }

  // route_mode - computed: true, optional: false, required: false
  public get routeMode() {
    return this.getStringAttribute('route_mode');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // vif_id - computed: true, optional: false, required: false
  public get vifId() {
    return this.getStringAttribute('vif_id');
  }
}

export class DcVirtualInterfaceVifPeersList extends cdktf.ComplexList {

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
  public get(index: number): DcVirtualInterfaceVifPeersOutputReference {
    return new DcVirtualInterfaceVifPeersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface huaweicloud_dc_virtual_interface}
*/
export class DcVirtualInterface extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dc_virtual_interface";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DcVirtualInterface resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DcVirtualInterface to import
  * @param importFromId The id of the existing DcVirtualInterface that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DcVirtualInterface to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dc_virtual_interface", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dc_virtual_interface huaweicloud_dc_virtual_interface} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DcVirtualInterfaceConfig
  */
  public constructor(scope: Construct, id: string, config: DcVirtualInterfaceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dc_virtual_interface',
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
    this._addressFamily = config.addressFamily;
    this._asn = config.asn;
    this._bandwidth = config.bandwidth;
    this._bgpMd5 = config.bgpMd5;
    this._description = config.description;
    this._directConnectId = config.directConnectId;
    this._enableBfd = config.enableBfd;
    this._enableNqa = config.enableNqa;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._lagId = config.lagId;
    this._localGatewayV4Ip = config.localGatewayV4Ip;
    this._localGatewayV6Ip = config.localGatewayV6Ip;
    this._name = config.name;
    this._region = config.region;
    this._remoteEpGroup = config.remoteEpGroup;
    this._remoteGatewayV4Ip = config.remoteGatewayV4Ip;
    this._remoteGatewayV6Ip = config.remoteGatewayV6Ip;
    this._resourceTenantId = config.resourceTenantId;
    this._routeMode = config.routeMode;
    this._serviceType = config.serviceType;
    this._tags = config.tags;
    this._type = config.type;
    this._vgwId = config.vgwId;
    this._vlan = config.vlan;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // address_family - computed: false, optional: true, required: false
  private _addressFamily?: string; 
  public get addressFamily() {
    return this.getStringAttribute('address_family');
  }
  public set addressFamily(value: string) {
    this._addressFamily = value;
  }
  public resetAddressFamily() {
    this._addressFamily = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressFamilyInput() {
    return this._addressFamily;
  }

  // asn - computed: true, optional: true, required: false
  private _asn?: number; 
  public get asn() {
    return this.getNumberAttribute('asn');
  }
  public set asn(value: number) {
    this._asn = value;
  }
  public resetAsn() {
    this._asn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get asnInput() {
    return this._asn;
  }

  // bandwidth - computed: false, optional: false, required: true
  private _bandwidth?: number; 
  public get bandwidth() {
    return this.getNumberAttribute('bandwidth');
  }
  public set bandwidth(value: number) {
    this._bandwidth = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthInput() {
    return this._bandwidth;
  }

  // bgp_md5 - computed: true, optional: true, required: false
  private _bgpMd5?: string; 
  public get bgpMd5() {
    return this.getStringAttribute('bgp_md5');
  }
  public set bgpMd5(value: string) {
    this._bgpMd5 = value;
  }
  public resetBgpMd5() {
    this._bgpMd5 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bgpMd5Input() {
    return this._bgpMd5;
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

  // device_id - computed: true, optional: false, required: false
  public get deviceId() {
    return this.getStringAttribute('device_id');
  }

  // direct_connect_id - computed: false, optional: false, required: true
  private _directConnectId?: string; 
  public get directConnectId() {
    return this.getStringAttribute('direct_connect_id');
  }
  public set directConnectId(value: string) {
    this._directConnectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get directConnectIdInput() {
    return this._directConnectId;
  }

  // enable_bfd - computed: true, optional: true, required: false
  private _enableBfd?: boolean | cdktf.IResolvable; 
  public get enableBfd() {
    return this.getBooleanAttribute('enable_bfd');
  }
  public set enableBfd(value: boolean | cdktf.IResolvable) {
    this._enableBfd = value;
  }
  public resetEnableBfd() {
    this._enableBfd = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableBfdInput() {
    return this._enableBfd;
  }

  // enable_nqa - computed: true, optional: true, required: false
  private _enableNqa?: boolean | cdktf.IResolvable; 
  public get enableNqa() {
    return this.getBooleanAttribute('enable_nqa');
  }
  public set enableNqa(value: boolean | cdktf.IResolvable) {
    this._enableNqa = value;
  }
  public resetEnableNqa() {
    this._enableNqa = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableNqaInput() {
    return this._enableNqa;
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

  // lag_id - computed: true, optional: true, required: false
  private _lagId?: string; 
  public get lagId() {
    return this.getStringAttribute('lag_id');
  }
  public set lagId(value: string) {
    this._lagId = value;
  }
  public resetLagId() {
    this._lagId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lagIdInput() {
    return this._lagId;
  }

  // local_gateway_v4_ip - computed: false, optional: true, required: false
  private _localGatewayV4Ip?: string; 
  public get localGatewayV4Ip() {
    return this.getStringAttribute('local_gateway_v4_ip');
  }
  public set localGatewayV4Ip(value: string) {
    this._localGatewayV4Ip = value;
  }
  public resetLocalGatewayV4Ip() {
    this._localGatewayV4Ip = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get localGatewayV4IpInput() {
    return this._localGatewayV4Ip;
  }

  // local_gateway_v6_ip - computed: false, optional: true, required: false
  private _localGatewayV6Ip?: string; 
  public get localGatewayV6Ip() {
    return this.getStringAttribute('local_gateway_v6_ip');
  }
  public set localGatewayV6Ip(value: string) {
    this._localGatewayV6Ip = value;
  }
  public resetLocalGatewayV6Ip() {
    this._localGatewayV6Ip = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get localGatewayV6IpInput() {
    return this._localGatewayV6Ip;
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

  // remote_ep_group - computed: false, optional: false, required: true
  private _remoteEpGroup?: string[]; 
  public get remoteEpGroup() {
    return this.getListAttribute('remote_ep_group');
  }
  public set remoteEpGroup(value: string[]) {
    this._remoteEpGroup = value;
  }
  // Temporarily expose input value. Use with caution.
  public get remoteEpGroupInput() {
    return this._remoteEpGroup;
  }

  // remote_gateway_v4_ip - computed: false, optional: true, required: false
  private _remoteGatewayV4Ip?: string; 
  public get remoteGatewayV4Ip() {
    return this.getStringAttribute('remote_gateway_v4_ip');
  }
  public set remoteGatewayV4Ip(value: string) {
    this._remoteGatewayV4Ip = value;
  }
  public resetRemoteGatewayV4Ip() {
    this._remoteGatewayV4Ip = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get remoteGatewayV4IpInput() {
    return this._remoteGatewayV4Ip;
  }

  // remote_gateway_v6_ip - computed: false, optional: true, required: false
  private _remoteGatewayV6Ip?: string; 
  public get remoteGatewayV6Ip() {
    return this.getStringAttribute('remote_gateway_v6_ip');
  }
  public set remoteGatewayV6Ip(value: string) {
    this._remoteGatewayV6Ip = value;
  }
  public resetRemoteGatewayV6Ip() {
    this._remoteGatewayV6Ip = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get remoteGatewayV6IpInput() {
    return this._remoteGatewayV6Ip;
  }

  // resource_tenant_id - computed: false, optional: true, required: false
  private _resourceTenantId?: string; 
  public get resourceTenantId() {
    return this.getStringAttribute('resource_tenant_id');
  }
  public set resourceTenantId(value: string) {
    this._resourceTenantId = value;
  }
  public resetResourceTenantId() {
    this._resourceTenantId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceTenantIdInput() {
    return this._resourceTenantId;
  }

  // route_mode - computed: false, optional: false, required: true
  private _routeMode?: string; 
  public get routeMode() {
    return this.getStringAttribute('route_mode');
  }
  public set routeMode(value: string) {
    this._routeMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get routeModeInput() {
    return this._routeMode;
  }

  // service_type - computed: true, optional: true, required: false
  private _serviceType?: string; 
  public get serviceType() {
    return this.getStringAttribute('service_type');
  }
  public set serviceType(value: string) {
    this._serviceType = value;
  }
  public resetServiceType() {
    this._serviceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceTypeInput() {
    return this._serviceType;
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

  // vgw_id - computed: false, optional: false, required: true
  private _vgwId?: string; 
  public get vgwId() {
    return this.getStringAttribute('vgw_id');
  }
  public set vgwId(value: string) {
    this._vgwId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vgwIdInput() {
    return this._vgwId;
  }

  // vif_peers - computed: true, optional: false, required: false
  private _vifPeers = new DcVirtualInterfaceVifPeersList(this, "vif_peers", false);
  public get vifPeers() {
    return this._vifPeers;
  }

  // vlan - computed: false, optional: false, required: true
  private _vlan?: number; 
  public get vlan() {
    return this.getNumberAttribute('vlan');
  }
  public set vlan(value: number) {
    this._vlan = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vlanInput() {
    return this._vlan;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      address_family: cdktf.stringToTerraform(this._addressFamily),
      asn: cdktf.numberToTerraform(this._asn),
      bandwidth: cdktf.numberToTerraform(this._bandwidth),
      bgp_md5: cdktf.stringToTerraform(this._bgpMd5),
      description: cdktf.stringToTerraform(this._description),
      direct_connect_id: cdktf.stringToTerraform(this._directConnectId),
      enable_bfd: cdktf.booleanToTerraform(this._enableBfd),
      enable_nqa: cdktf.booleanToTerraform(this._enableNqa),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      lag_id: cdktf.stringToTerraform(this._lagId),
      local_gateway_v4_ip: cdktf.stringToTerraform(this._localGatewayV4Ip),
      local_gateway_v6_ip: cdktf.stringToTerraform(this._localGatewayV6Ip),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      remote_ep_group: cdktf.listMapper(cdktf.stringToTerraform, false)(this._remoteEpGroup),
      remote_gateway_v4_ip: cdktf.stringToTerraform(this._remoteGatewayV4Ip),
      remote_gateway_v6_ip: cdktf.stringToTerraform(this._remoteGatewayV6Ip),
      resource_tenant_id: cdktf.stringToTerraform(this._resourceTenantId),
      route_mode: cdktf.stringToTerraform(this._routeMode),
      service_type: cdktf.stringToTerraform(this._serviceType),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      type: cdktf.stringToTerraform(this._type),
      vgw_id: cdktf.stringToTerraform(this._vgwId),
      vlan: cdktf.numberToTerraform(this._vlan),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      address_family: {
        value: cdktf.stringToHclTerraform(this._addressFamily),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      asn: {
        value: cdktf.numberToHclTerraform(this._asn),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      bandwidth: {
        value: cdktf.numberToHclTerraform(this._bandwidth),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      bgp_md5: {
        value: cdktf.stringToHclTerraform(this._bgpMd5),
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
      direct_connect_id: {
        value: cdktf.stringToHclTerraform(this._directConnectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_bfd: {
        value: cdktf.booleanToHclTerraform(this._enableBfd),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_nqa: {
        value: cdktf.booleanToHclTerraform(this._enableNqa),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      lag_id: {
        value: cdktf.stringToHclTerraform(this._lagId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      local_gateway_v4_ip: {
        value: cdktf.stringToHclTerraform(this._localGatewayV4Ip),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      local_gateway_v6_ip: {
        value: cdktf.stringToHclTerraform(this._localGatewayV6Ip),
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
      remote_ep_group: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._remoteEpGroup),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      remote_gateway_v4_ip: {
        value: cdktf.stringToHclTerraform(this._remoteGatewayV4Ip),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      remote_gateway_v6_ip: {
        value: cdktf.stringToHclTerraform(this._remoteGatewayV6Ip),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      resource_tenant_id: {
        value: cdktf.stringToHclTerraform(this._resourceTenantId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      route_mode: {
        value: cdktf.stringToHclTerraform(this._routeMode),
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
      vgw_id: {
        value: cdktf.stringToHclTerraform(this._vgwId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vlan: {
        value: cdktf.numberToHclTerraform(this._vlan),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

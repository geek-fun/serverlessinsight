// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDcVirtualInterfacesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the ID of the direct connection associated with the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces#direct_connect_id DataHuaweicloudDcVirtualInterfaces#direct_connect_id}
  */
  readonly directConnectId?: string;
  /**
  * Specifies the enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces#enterprise_project_id DataHuaweicloudDcVirtualInterfaces#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces#id DataHuaweicloudDcVirtualInterfaces#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the name of the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces#name DataHuaweicloudDcVirtualInterfaces#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces#region DataHuaweicloudDcVirtualInterfaces#region}
  */
  readonly region?: string;
  /**
  * Specifies the status of the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces#status DataHuaweicloudDcVirtualInterfaces#status}
  */
  readonly status?: string;
  /**
  * Specifies the ID of the virtual gateway for the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces#vgw_id DataHuaweicloudDcVirtualInterfaces#vgw_id}
  */
  readonly vgwId?: string;
  /**
  * Specifies the ID of the virtual interface.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces#virtual_interface_id DataHuaweicloudDcVirtualInterfaces#virtual_interface_id}
  */
  readonly virtualInterfaceId?: string;
}
export interface DataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeers {
}

export function dataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeersToTerraform(struct?: DataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeersToHclTerraform(struct?: DataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeers): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeers | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeers | undefined) {
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

export class DataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeersList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeersOutputReference {
    return new DataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudDcVirtualInterfacesVirtualInterfaces {
}

export function dataHuaweicloudDcVirtualInterfacesVirtualInterfacesToTerraform(struct?: DataHuaweicloudDcVirtualInterfacesVirtualInterfaces): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDcVirtualInterfacesVirtualInterfacesToHclTerraform(struct?: DataHuaweicloudDcVirtualInterfacesVirtualInterfaces): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDcVirtualInterfacesVirtualInterfacesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDcVirtualInterfacesVirtualInterfaces | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDcVirtualInterfacesVirtualInterfaces | undefined) {
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

  // asn - computed: true, optional: false, required: false
  public get asn() {
    return this.getNumberAttribute('asn');
  }

  // bandwidth - computed: true, optional: false, required: false
  public get bandwidth() {
    return this.getNumberAttribute('bandwidth');
  }

  // bgp_md5 - computed: true, optional: false, required: false
  public get bgpMd5() {
    return this.getStringAttribute('bgp_md5');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // device_id - computed: true, optional: false, required: false
  public get deviceId() {
    return this.getStringAttribute('device_id');
  }

  // direct_connect_id - computed: true, optional: false, required: false
  public get directConnectId() {
    return this.getStringAttribute('direct_connect_id');
  }

  // enable_bfd - computed: true, optional: false, required: false
  public get enableBfd() {
    return this.getBooleanAttribute('enable_bfd');
  }

  // enable_nqa - computed: true, optional: false, required: false
  public get enableNqa() {
    return this.getBooleanAttribute('enable_nqa');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // lag_id - computed: true, optional: false, required: false
  public get lagId() {
    return this.getStringAttribute('lag_id');
  }

  // local_gateway_v4_ip - computed: true, optional: false, required: false
  public get localGatewayV4Ip() {
    return this.getStringAttribute('local_gateway_v4_ip');
  }

  // local_gateway_v6_ip - computed: true, optional: false, required: false
  public get localGatewayV6Ip() {
    return this.getStringAttribute('local_gateway_v6_ip');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // remote_ep_group - computed: true, optional: false, required: false
  public get remoteEpGroup() {
    return this.getListAttribute('remote_ep_group');
  }

  // remote_gateway_v4_ip - computed: true, optional: false, required: false
  public get remoteGatewayV4Ip() {
    return this.getStringAttribute('remote_gateway_v4_ip');
  }

  // remote_gateway_v6_ip - computed: true, optional: false, required: false
  public get remoteGatewayV6Ip() {
    return this.getStringAttribute('remote_gateway_v6_ip');
  }

  // route_mode - computed: true, optional: false, required: false
  public get routeMode() {
    return this.getStringAttribute('route_mode');
  }

  // service_type - computed: true, optional: false, required: false
  public get serviceType() {
    return this.getStringAttribute('service_type');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // vgw_id - computed: true, optional: false, required: false
  public get vgwId() {
    return this.getStringAttribute('vgw_id');
  }

  // vif_peers - computed: true, optional: false, required: false
  private _vifPeers = new DataHuaweicloudDcVirtualInterfacesVirtualInterfacesVifPeersList(this, "vif_peers", false);
  public get vifPeers() {
    return this._vifPeers;
  }

  // vlan - computed: true, optional: false, required: false
  public get vlan() {
    return this.getNumberAttribute('vlan');
  }
}

export class DataHuaweicloudDcVirtualInterfacesVirtualInterfacesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDcVirtualInterfacesVirtualInterfacesOutputReference {
    return new DataHuaweicloudDcVirtualInterfacesVirtualInterfacesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces huaweicloud_dc_virtual_interfaces}
*/
export class DataHuaweicloudDcVirtualInterfaces extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dc_virtual_interfaces";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDcVirtualInterfaces resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDcVirtualInterfaces to import
  * @param importFromId The id of the existing DataHuaweicloudDcVirtualInterfaces that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDcVirtualInterfaces to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dc_virtual_interfaces", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dc_virtual_interfaces huaweicloud_dc_virtual_interfaces} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDcVirtualInterfacesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDcVirtualInterfacesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dc_virtual_interfaces',
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
    this._directConnectId = config.directConnectId;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._status = config.status;
    this._vgwId = config.vgwId;
    this._virtualInterfaceId = config.virtualInterfaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // direct_connect_id - computed: false, optional: true, required: false
  private _directConnectId?: string; 
  public get directConnectId() {
    return this.getStringAttribute('direct_connect_id');
  }
  public set directConnectId(value: string) {
    this._directConnectId = value;
  }
  public resetDirectConnectId() {
    this._directConnectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get directConnectIdInput() {
    return this._directConnectId;
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

  // status - computed: false, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // vgw_id - computed: false, optional: true, required: false
  private _vgwId?: string; 
  public get vgwId() {
    return this.getStringAttribute('vgw_id');
  }
  public set vgwId(value: string) {
    this._vgwId = value;
  }
  public resetVgwId() {
    this._vgwId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vgwIdInput() {
    return this._vgwId;
  }

  // virtual_interface_id - computed: false, optional: true, required: false
  private _virtualInterfaceId?: string; 
  public get virtualInterfaceId() {
    return this.getStringAttribute('virtual_interface_id');
  }
  public set virtualInterfaceId(value: string) {
    this._virtualInterfaceId = value;
  }
  public resetVirtualInterfaceId() {
    this._virtualInterfaceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get virtualInterfaceIdInput() {
    return this._virtualInterfaceId;
  }

  // virtual_interfaces - computed: true, optional: false, required: false
  private _virtualInterfaces = new DataHuaweicloudDcVirtualInterfacesVirtualInterfacesList(this, "virtual_interfaces", false);
  public get virtualInterfaces() {
    return this._virtualInterfaces;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      direct_connect_id: cdktf.stringToTerraform(this._directConnectId),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      status: cdktf.stringToTerraform(this._status),
      vgw_id: cdktf.stringToTerraform(this._vgwId),
      virtual_interface_id: cdktf.stringToTerraform(this._virtualInterfaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      direct_connect_id: {
        value: cdktf.stringToHclTerraform(this._directConnectId),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      status: {
        value: cdktf.stringToHclTerraform(this._status),
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
      virtual_interface_id: {
        value: cdktf.stringToHclTerraform(this._virtualInterfaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpn_p2c_gateway_connections
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudVpnP2CGatewayConnectionsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpn_p2c_gateway_connections#id DataHuaweicloudVpnP2CGatewayConnections#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of a P2C VPN gateway instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpn_p2c_gateway_connections#p2c_gateway_id DataHuaweicloudVpnP2CGatewayConnections#p2c_gateway_id}
  */
  readonly p2CGatewayId: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpn_p2c_gateway_connections#region DataHuaweicloudVpnP2CGatewayConnections#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudVpnP2CGatewayConnectionsConnections {
}

export function dataHuaweicloudVpnP2CGatewayConnectionsConnectionsToTerraform(struct?: DataHuaweicloudVpnP2CGatewayConnectionsConnections): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudVpnP2CGatewayConnectionsConnectionsToHclTerraform(struct?: DataHuaweicloudVpnP2CGatewayConnectionsConnections): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudVpnP2CGatewayConnectionsConnectionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudVpnP2CGatewayConnectionsConnections | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudVpnP2CGatewayConnectionsConnections | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // client_ip - computed: true, optional: false, required: false
  public get clientIp() {
    return this.getStringAttribute('client_ip');
  }

  // client_user_name - computed: true, optional: false, required: false
  public get clientUserName() {
    return this.getStringAttribute('client_user_name');
  }

  // client_virtual_ip - computed: true, optional: false, required: false
  public get clientVirtualIp() {
    return this.getStringAttribute('client_virtual_ip');
  }

  // connection_established_time - computed: true, optional: false, required: false
  public get connectionEstablishedTime() {
    return this.getStringAttribute('connection_established_time');
  }

  // connection_id - computed: true, optional: false, required: false
  public get connectionId() {
    return this.getStringAttribute('connection_id');
  }

  // inbound_bytes - computed: true, optional: false, required: false
  public get inboundBytes() {
    return this.getNumberAttribute('inbound_bytes');
  }

  // inbound_packets - computed: true, optional: false, required: false
  public get inboundPackets() {
    return this.getNumberAttribute('inbound_packets');
  }

  // outbound_bytes - computed: true, optional: false, required: false
  public get outboundBytes() {
    return this.getNumberAttribute('outbound_bytes');
  }

  // outbound_packets - computed: true, optional: false, required: false
  public get outboundPackets() {
    return this.getNumberAttribute('outbound_packets');
  }

  // timestamp - computed: true, optional: false, required: false
  public get timestamp() {
    return this.getStringAttribute('timestamp');
  }
}

export class DataHuaweicloudVpnP2CGatewayConnectionsConnectionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudVpnP2CGatewayConnectionsConnectionsOutputReference {
    return new DataHuaweicloudVpnP2CGatewayConnectionsConnectionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpn_p2c_gateway_connections huaweicloud_vpn_p2c_gateway_connections}
*/
export class DataHuaweicloudVpnP2CGatewayConnections extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_vpn_p2c_gateway_connections";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudVpnP2CGatewayConnections resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudVpnP2CGatewayConnections to import
  * @param importFromId The id of the existing DataHuaweicloudVpnP2CGatewayConnections that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpn_p2c_gateway_connections#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudVpnP2CGatewayConnections to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_vpn_p2c_gateway_connections", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/vpn_p2c_gateway_connections huaweicloud_vpn_p2c_gateway_connections} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudVpnP2CGatewayConnectionsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudVpnP2CGatewayConnectionsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_vpn_p2c_gateway_connections',
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
    this._id = config.id;
    this._p2CGatewayId = config.p2CGatewayId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // connections - computed: true, optional: false, required: false
  private _connections = new DataHuaweicloudVpnP2CGatewayConnectionsConnectionsList(this, "connections", false);
  public get connections() {
    return this._connections;
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

  // p2c_gateway_id - computed: false, optional: false, required: true
  private _p2CGatewayId?: string; 
  public get p2CGatewayId() {
    return this.getStringAttribute('p2c_gateway_id');
  }
  public set p2CGatewayId(value: string) {
    this._p2CGatewayId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get p2CGatewayIdInput() {
    return this._p2CGatewayId;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      p2c_gateway_id: cdktf.stringToTerraform(this._p2CGatewayId),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      p2c_gateway_id: {
        value: cdktf.stringToHclTerraform(this._p2CGatewayId),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface NatPrivateDnatRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * The network interface ID of the transit IP for private NAT.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#backend_interface_id NatPrivateDnatRule#backend_interface_id}
  */
  readonly backendInterfaceId?: string;
  /**
  * The private IP address of the backend instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#backend_private_ip NatPrivateDnatRule#backend_private_ip}
  */
  readonly backendPrivateIp?: string;
  /**
  * The description of the DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#description NatPrivateDnatRule#description}
  */
  readonly description?: string;
  /**
  * The private NAT gateway ID to which the DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#gateway_id NatPrivateDnatRule#gateway_id}
  */
  readonly gatewayId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#id NatPrivateDnatRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The port of the backend instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#internal_service_port NatPrivateDnatRule#internal_service_port}
  */
  readonly internalServicePort?: number;
  /**
  * The protocol type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#protocol NatPrivateDnatRule#protocol}
  */
  readonly protocol?: string;
  /**
  * The region where the DNAT rule is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#region NatPrivateDnatRule#region}
  */
  readonly region?: string;
  /**
  * The ID of the transit IP for private NAT.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#transit_ip_id NatPrivateDnatRule#transit_ip_id}
  */
  readonly transitIpId: string;
  /**
  * The port of the transit IP.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#transit_service_port NatPrivateDnatRule#transit_service_port}
  */
  readonly transitServicePort?: number;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule huaweicloud_nat_private_dnat_rule}
*/
export class NatPrivateDnatRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_nat_private_dnat_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a NatPrivateDnatRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the NatPrivateDnatRule to import
  * @param importFromId The id of the existing NatPrivateDnatRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the NatPrivateDnatRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_nat_private_dnat_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_private_dnat_rule huaweicloud_nat_private_dnat_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options NatPrivateDnatRuleConfig
  */
  public constructor(scope: Construct, id: string, config: NatPrivateDnatRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_nat_private_dnat_rule',
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
    this._backendInterfaceId = config.backendInterfaceId;
    this._backendPrivateIp = config.backendPrivateIp;
    this._description = config.description;
    this._gatewayId = config.gatewayId;
    this._id = config.id;
    this._internalServicePort = config.internalServicePort;
    this._protocol = config.protocol;
    this._region = config.region;
    this._transitIpId = config.transitIpId;
    this._transitServicePort = config.transitServicePort;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backend_interface_id - computed: true, optional: true, required: false
  private _backendInterfaceId?: string; 
  public get backendInterfaceId() {
    return this.getStringAttribute('backend_interface_id');
  }
  public set backendInterfaceId(value: string) {
    this._backendInterfaceId = value;
  }
  public resetBackendInterfaceId() {
    this._backendInterfaceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendInterfaceIdInput() {
    return this._backendInterfaceId;
  }

  // backend_private_ip - computed: true, optional: true, required: false
  private _backendPrivateIp?: string; 
  public get backendPrivateIp() {
    return this.getStringAttribute('backend_private_ip');
  }
  public set backendPrivateIp(value: string) {
    this._backendPrivateIp = value;
  }
  public resetBackendPrivateIp() {
    this._backendPrivateIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendPrivateIpInput() {
    return this._backendPrivateIp;
  }

  // backend_type - computed: true, optional: false, required: false
  public get backendType() {
    return this.getStringAttribute('backend_type');
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

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // gateway_id - computed: false, optional: false, required: true
  private _gatewayId?: string; 
  public get gatewayId() {
    return this.getStringAttribute('gateway_id');
  }
  public set gatewayId(value: string) {
    this._gatewayId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get gatewayIdInput() {
    return this._gatewayId;
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

  // internal_service_port - computed: false, optional: true, required: false
  private _internalServicePort?: number; 
  public get internalServicePort() {
    return this.getNumberAttribute('internal_service_port');
  }
  public set internalServicePort(value: number) {
    this._internalServicePort = value;
  }
  public resetInternalServicePort() {
    this._internalServicePort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get internalServicePortInput() {
    return this._internalServicePort;
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

  // transit_ip_id - computed: false, optional: false, required: true
  private _transitIpId?: string; 
  public get transitIpId() {
    return this.getStringAttribute('transit_ip_id');
  }
  public set transitIpId(value: string) {
    this._transitIpId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get transitIpIdInput() {
    return this._transitIpId;
  }

  // transit_service_port - computed: false, optional: true, required: false
  private _transitServicePort?: number; 
  public get transitServicePort() {
    return this.getNumberAttribute('transit_service_port');
  }
  public set transitServicePort(value: number) {
    this._transitServicePort = value;
  }
  public resetTransitServicePort() {
    this._transitServicePort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get transitServicePortInput() {
    return this._transitServicePort;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      backend_interface_id: cdktf.stringToTerraform(this._backendInterfaceId),
      backend_private_ip: cdktf.stringToTerraform(this._backendPrivateIp),
      description: cdktf.stringToTerraform(this._description),
      gateway_id: cdktf.stringToTerraform(this._gatewayId),
      id: cdktf.stringToTerraform(this._id),
      internal_service_port: cdktf.numberToTerraform(this._internalServicePort),
      protocol: cdktf.stringToTerraform(this._protocol),
      region: cdktf.stringToTerraform(this._region),
      transit_ip_id: cdktf.stringToTerraform(this._transitIpId),
      transit_service_port: cdktf.numberToTerraform(this._transitServicePort),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      backend_interface_id: {
        value: cdktf.stringToHclTerraform(this._backendInterfaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      backend_private_ip: {
        value: cdktf.stringToHclTerraform(this._backendPrivateIp),
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
      gateway_id: {
        value: cdktf.stringToHclTerraform(this._gatewayId),
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
      internal_service_port: {
        value: cdktf.numberToHclTerraform(this._internalServicePort),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      protocol: {
        value: cdktf.stringToHclTerraform(this._protocol),
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
      transit_ip_id: {
        value: cdktf.stringToHclTerraform(this._transitIpId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      transit_service_port: {
        value: cdktf.numberToHclTerraform(this._transitServicePort),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

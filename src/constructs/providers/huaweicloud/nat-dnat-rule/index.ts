// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface NatDnatRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * The description of the DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#description NatDnatRule#description}
  */
  readonly description?: string;
  /**
  * The port range used by Floating IP provide services for external systems.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#external_service_port NatDnatRule#external_service_port}
  */
  readonly externalServicePort?: number;
  /**
  * The port range used by ECSs or BMSs to provide services for external systems.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#external_service_port_range NatDnatRule#external_service_port_range}
  */
  readonly externalServicePortRange?: string;
  /**
  * The ID of the floating IP address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#floating_ip_id NatDnatRule#floating_ip_id}
  */
  readonly floatingIpId?: string;
  /**
  * The ID of the global EIP connected by the DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#global_eip_id NatDnatRule#global_eip_id}
  */
  readonly globalEipId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#id NatDnatRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The port used by Floating IP provide services for external systems.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#internal_service_port NatDnatRule#internal_service_port}
  */
  readonly internalServicePort?: number;
  /**
  * The port used by ECSs or BMSs to provide services for external systems.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#internal_service_port_range NatDnatRule#internal_service_port_range}
  */
  readonly internalServicePortRange?: string;
  /**
  * The ID of the NAT gateway to which the DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#nat_gateway_id NatDnatRule#nat_gateway_id}
  */
  readonly natGatewayId: string;
  /**
  * The port ID of network.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#port_id NatDnatRule#port_id}
  */
  readonly portId?: string;
  /**
  * The private IP address of a user.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#private_ip NatDnatRule#private_ip}
  */
  readonly privateIp?: string;
  /**
  * The protocol type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#protocol NatDnatRule#protocol}
  */
  readonly protocol: string;
  /**
  * The region where the DNAT rule is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#region NatDnatRule#region}
  */
  readonly region?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#timeouts NatDnatRule#timeouts}
  */
  readonly timeouts?: NatDnatRuleTimeouts;
}
export interface NatDnatRuleTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#create NatDnatRule#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#delete NatDnatRule#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#update NatDnatRule#update}
  */
  readonly update?: string;
}

export function natDnatRuleTimeoutsToTerraform(struct?: NatDnatRuleTimeouts | cdktf.IResolvable): any {
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


export function natDnatRuleTimeoutsToHclTerraform(struct?: NatDnatRuleTimeouts | cdktf.IResolvable): any {
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

export class NatDnatRuleTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): NatDnatRuleTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: NatDnatRuleTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule huaweicloud_nat_dnat_rule}
*/
export class NatDnatRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_nat_dnat_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a NatDnatRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the NatDnatRule to import
  * @param importFromId The id of the existing NatDnatRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the NatDnatRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_nat_dnat_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/nat_dnat_rule huaweicloud_nat_dnat_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options NatDnatRuleConfig
  */
  public constructor(scope: Construct, id: string, config: NatDnatRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_nat_dnat_rule',
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
    this._description = config.description;
    this._externalServicePort = config.externalServicePort;
    this._externalServicePortRange = config.externalServicePortRange;
    this._floatingIpId = config.floatingIpId;
    this._globalEipId = config.globalEipId;
    this._id = config.id;
    this._internalServicePort = config.internalServicePort;
    this._internalServicePortRange = config.internalServicePortRange;
    this._natGatewayId = config.natGatewayId;
    this._portId = config.portId;
    this._privateIp = config.privateIp;
    this._protocol = config.protocol;
    this._region = config.region;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // external_service_port - computed: false, optional: true, required: false
  private _externalServicePort?: number; 
  public get externalServicePort() {
    return this.getNumberAttribute('external_service_port');
  }
  public set externalServicePort(value: number) {
    this._externalServicePort = value;
  }
  public resetExternalServicePort() {
    this._externalServicePort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get externalServicePortInput() {
    return this._externalServicePort;
  }

  // external_service_port_range - computed: false, optional: true, required: false
  private _externalServicePortRange?: string; 
  public get externalServicePortRange() {
    return this.getStringAttribute('external_service_port_range');
  }
  public set externalServicePortRange(value: string) {
    this._externalServicePortRange = value;
  }
  public resetExternalServicePortRange() {
    this._externalServicePortRange = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get externalServicePortRangeInput() {
    return this._externalServicePortRange;
  }

  // floating_ip_address - computed: true, optional: false, required: false
  public get floatingIpAddress() {
    return this.getStringAttribute('floating_ip_address');
  }

  // floating_ip_id - computed: false, optional: true, required: false
  private _floatingIpId?: string; 
  public get floatingIpId() {
    return this.getStringAttribute('floating_ip_id');
  }
  public set floatingIpId(value: string) {
    this._floatingIpId = value;
  }
  public resetFloatingIpId() {
    this._floatingIpId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get floatingIpIdInput() {
    return this._floatingIpId;
  }

  // global_eip_address - computed: true, optional: false, required: false
  public get globalEipAddress() {
    return this.getStringAttribute('global_eip_address');
  }

  // global_eip_id - computed: false, optional: true, required: false
  private _globalEipId?: string; 
  public get globalEipId() {
    return this.getStringAttribute('global_eip_id');
  }
  public set globalEipId(value: string) {
    this._globalEipId = value;
  }
  public resetGlobalEipId() {
    this._globalEipId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get globalEipIdInput() {
    return this._globalEipId;
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

  // internal_service_port_range - computed: false, optional: true, required: false
  private _internalServicePortRange?: string; 
  public get internalServicePortRange() {
    return this.getStringAttribute('internal_service_port_range');
  }
  public set internalServicePortRange(value: string) {
    this._internalServicePortRange = value;
  }
  public resetInternalServicePortRange() {
    this._internalServicePortRange = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get internalServicePortRangeInput() {
    return this._internalServicePortRange;
  }

  // nat_gateway_id - computed: false, optional: false, required: true
  private _natGatewayId?: string; 
  public get natGatewayId() {
    return this.getStringAttribute('nat_gateway_id');
  }
  public set natGatewayId(value: string) {
    this._natGatewayId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get natGatewayIdInput() {
    return this._natGatewayId;
  }

  // port_id - computed: true, optional: true, required: false
  private _portId?: string; 
  public get portId() {
    return this.getStringAttribute('port_id');
  }
  public set portId(value: string) {
    this._portId = value;
  }
  public resetPortId() {
    this._portId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portIdInput() {
    return this._portId;
  }

  // private_ip - computed: true, optional: true, required: false
  private _privateIp?: string; 
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }
  public set privateIp(value: string) {
    this._privateIp = value;
  }
  public resetPrivateIp() {
    this._privateIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateIpInput() {
    return this._privateIp;
  }

  // protocol - computed: false, optional: false, required: true
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new NatDnatRuleTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: NatDnatRuleTimeouts) {
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
      description: cdktf.stringToTerraform(this._description),
      external_service_port: cdktf.numberToTerraform(this._externalServicePort),
      external_service_port_range: cdktf.stringToTerraform(this._externalServicePortRange),
      floating_ip_id: cdktf.stringToTerraform(this._floatingIpId),
      global_eip_id: cdktf.stringToTerraform(this._globalEipId),
      id: cdktf.stringToTerraform(this._id),
      internal_service_port: cdktf.numberToTerraform(this._internalServicePort),
      internal_service_port_range: cdktf.stringToTerraform(this._internalServicePortRange),
      nat_gateway_id: cdktf.stringToTerraform(this._natGatewayId),
      port_id: cdktf.stringToTerraform(this._portId),
      private_ip: cdktf.stringToTerraform(this._privateIp),
      protocol: cdktf.stringToTerraform(this._protocol),
      region: cdktf.stringToTerraform(this._region),
      timeouts: natDnatRuleTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      external_service_port: {
        value: cdktf.numberToHclTerraform(this._externalServicePort),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      external_service_port_range: {
        value: cdktf.stringToHclTerraform(this._externalServicePortRange),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      floating_ip_id: {
        value: cdktf.stringToHclTerraform(this._floatingIpId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      global_eip_id: {
        value: cdktf.stringToHclTerraform(this._globalEipId),
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
      internal_service_port_range: {
        value: cdktf.stringToHclTerraform(this._internalServicePortRange),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      nat_gateway_id: {
        value: cdktf.stringToHclTerraform(this._natGatewayId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      port_id: {
        value: cdktf.stringToHclTerraform(this._portId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      private_ip: {
        value: cdktf.stringToHclTerraform(this._privateIp),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
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
      timeouts: {
        value: natDnatRuleTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "NatDnatRuleTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

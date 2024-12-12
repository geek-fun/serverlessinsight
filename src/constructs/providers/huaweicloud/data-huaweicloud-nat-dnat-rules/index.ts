// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudNatDnatRulesConfig extends cdktf.TerraformMetaArguments {
  /**
  * The port of the EIP associated with the DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#external_service_port DataHuaweicloudNatDnatRules#external_service_port}
  */
  readonly externalServicePort?: string;
  /**
  * The IP address of EIP associated with the DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#floating_ip_address DataHuaweicloudNatDnatRules#floating_ip_address}
  */
  readonly floatingIpAddress?: string;
  /**
  * The ID of the EIP associated with the DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#floating_ip_id DataHuaweicloudNatDnatRules#floating_ip_id}
  */
  readonly floatingIpId?: string;
  /**
  * The ID of the NAT gateway to which the DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#gateway_id DataHuaweicloudNatDnatRules#gateway_id}
  */
  readonly gatewayId?: string;
  /**
  * The IP address of the global EIP associated with the DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#global_eip_address DataHuaweicloudNatDnatRules#global_eip_address}
  */
  readonly globalEipAddress?: string;
  /**
  * The ID of the global EIP associated with the DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#global_eip_id DataHuaweicloudNatDnatRules#global_eip_id}
  */
  readonly globalEipId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#id DataHuaweicloudNatDnatRules#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The port of the backend instance to which the DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#internal_service_port DataHuaweicloudNatDnatRules#internal_service_port}
  */
  readonly internalServicePort?: string;
  /**
  * The port ID of the backend instance to which the DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#port_id DataHuaweicloudNatDnatRules#port_id}
  */
  readonly portId?: string;
  /**
  * The private IP address of the backend instance to which the DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#private_ip DataHuaweicloudNatDnatRules#private_ip}
  */
  readonly privateIp?: string;
  /**
  * The protocol type of the DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#protocol DataHuaweicloudNatDnatRules#protocol}
  */
  readonly protocol?: string;
  /**
  * The region where the DNAT rules are located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#region DataHuaweicloudNatDnatRules#region}
  */
  readonly region?: string;
  /**
  * The ID of the DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#rule_id DataHuaweicloudNatDnatRules#rule_id}
  */
  readonly ruleId?: string;
  /**
  * The status of the DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#status DataHuaweicloudNatDnatRules#status}
  */
  readonly status?: string;
}
export interface DataHuaweicloudNatDnatRulesRules {
}

export function dataHuaweicloudNatDnatRulesRulesToTerraform(struct?: DataHuaweicloudNatDnatRulesRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudNatDnatRulesRulesToHclTerraform(struct?: DataHuaweicloudNatDnatRulesRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudNatDnatRulesRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudNatDnatRulesRules | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudNatDnatRulesRules | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // external_service_port - computed: true, optional: false, required: false
  public get externalServicePort() {
    return this.getNumberAttribute('external_service_port');
  }

  // external_service_port_range - computed: true, optional: false, required: false
  public get externalServicePortRange() {
    return this.getStringAttribute('external_service_port_range');
  }

  // floating_ip_address - computed: true, optional: false, required: false
  public get floatingIpAddress() {
    return this.getStringAttribute('floating_ip_address');
  }

  // floating_ip_id - computed: true, optional: false, required: false
  public get floatingIpId() {
    return this.getStringAttribute('floating_ip_id');
  }

  // gateway_id - computed: true, optional: false, required: false
  public get gatewayId() {
    return this.getStringAttribute('gateway_id');
  }

  // global_eip_address - computed: true, optional: false, required: false
  public get globalEipAddress() {
    return this.getStringAttribute('global_eip_address');
  }

  // global_eip_id - computed: true, optional: false, required: false
  public get globalEipId() {
    return this.getStringAttribute('global_eip_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // internal_service_port - computed: true, optional: false, required: false
  public get internalServicePort() {
    return this.getNumberAttribute('internal_service_port');
  }

  // internal_service_port_range - computed: true, optional: false, required: false
  public get internalServicePortRange() {
    return this.getStringAttribute('internal_service_port_range');
  }

  // port_id - computed: true, optional: false, required: false
  public get portId() {
    return this.getStringAttribute('port_id');
  }

  // private_ip - computed: true, optional: false, required: false
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }
}

export class DataHuaweicloudNatDnatRulesRulesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudNatDnatRulesRulesOutputReference {
    return new DataHuaweicloudNatDnatRulesRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules huaweicloud_nat_dnat_rules}
*/
export class DataHuaweicloudNatDnatRules extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_nat_dnat_rules";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudNatDnatRules resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudNatDnatRules to import
  * @param importFromId The id of the existing DataHuaweicloudNatDnatRules that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudNatDnatRules to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_nat_dnat_rules", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_dnat_rules huaweicloud_nat_dnat_rules} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudNatDnatRulesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudNatDnatRulesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_nat_dnat_rules',
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
    this._externalServicePort = config.externalServicePort;
    this._floatingIpAddress = config.floatingIpAddress;
    this._floatingIpId = config.floatingIpId;
    this._gatewayId = config.gatewayId;
    this._globalEipAddress = config.globalEipAddress;
    this._globalEipId = config.globalEipId;
    this._id = config.id;
    this._internalServicePort = config.internalServicePort;
    this._portId = config.portId;
    this._privateIp = config.privateIp;
    this._protocol = config.protocol;
    this._region = config.region;
    this._ruleId = config.ruleId;
    this._status = config.status;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // external_service_port - computed: false, optional: true, required: false
  private _externalServicePort?: string; 
  public get externalServicePort() {
    return this.getStringAttribute('external_service_port');
  }
  public set externalServicePort(value: string) {
    this._externalServicePort = value;
  }
  public resetExternalServicePort() {
    this._externalServicePort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get externalServicePortInput() {
    return this._externalServicePort;
  }

  // floating_ip_address - computed: false, optional: true, required: false
  private _floatingIpAddress?: string; 
  public get floatingIpAddress() {
    return this.getStringAttribute('floating_ip_address');
  }
  public set floatingIpAddress(value: string) {
    this._floatingIpAddress = value;
  }
  public resetFloatingIpAddress() {
    this._floatingIpAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get floatingIpAddressInput() {
    return this._floatingIpAddress;
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

  // gateway_id - computed: false, optional: true, required: false
  private _gatewayId?: string; 
  public get gatewayId() {
    return this.getStringAttribute('gateway_id');
  }
  public set gatewayId(value: string) {
    this._gatewayId = value;
  }
  public resetGatewayId() {
    this._gatewayId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gatewayIdInput() {
    return this._gatewayId;
  }

  // global_eip_address - computed: false, optional: true, required: false
  private _globalEipAddress?: string; 
  public get globalEipAddress() {
    return this.getStringAttribute('global_eip_address');
  }
  public set globalEipAddress(value: string) {
    this._globalEipAddress = value;
  }
  public resetGlobalEipAddress() {
    this._globalEipAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get globalEipAddressInput() {
    return this._globalEipAddress;
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
  private _internalServicePort?: string; 
  public get internalServicePort() {
    return this.getStringAttribute('internal_service_port');
  }
  public set internalServicePort(value: string) {
    this._internalServicePort = value;
  }
  public resetInternalServicePort() {
    this._internalServicePort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get internalServicePortInput() {
    return this._internalServicePort;
  }

  // port_id - computed: false, optional: true, required: false
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

  // private_ip - computed: false, optional: true, required: false
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

  // protocol - computed: false, optional: true, required: false
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

  // region - computed: false, optional: true, required: false
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

  // rule_id - computed: false, optional: true, required: false
  private _ruleId?: string; 
  public get ruleId() {
    return this.getStringAttribute('rule_id');
  }
  public set ruleId(value: string) {
    this._ruleId = value;
  }
  public resetRuleId() {
    this._ruleId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleIdInput() {
    return this._ruleId;
  }

  // rules - computed: true, optional: false, required: false
  private _rules = new DataHuaweicloudNatDnatRulesRulesList(this, "rules", false);
  public get rules() {
    return this._rules;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      external_service_port: cdktf.stringToTerraform(this._externalServicePort),
      floating_ip_address: cdktf.stringToTerraform(this._floatingIpAddress),
      floating_ip_id: cdktf.stringToTerraform(this._floatingIpId),
      gateway_id: cdktf.stringToTerraform(this._gatewayId),
      global_eip_address: cdktf.stringToTerraform(this._globalEipAddress),
      global_eip_id: cdktf.stringToTerraform(this._globalEipId),
      id: cdktf.stringToTerraform(this._id),
      internal_service_port: cdktf.stringToTerraform(this._internalServicePort),
      port_id: cdktf.stringToTerraform(this._portId),
      private_ip: cdktf.stringToTerraform(this._privateIp),
      protocol: cdktf.stringToTerraform(this._protocol),
      region: cdktf.stringToTerraform(this._region),
      rule_id: cdktf.stringToTerraform(this._ruleId),
      status: cdktf.stringToTerraform(this._status),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      external_service_port: {
        value: cdktf.stringToHclTerraform(this._externalServicePort),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      floating_ip_address: {
        value: cdktf.stringToHclTerraform(this._floatingIpAddress),
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
      gateway_id: {
        value: cdktf.stringToHclTerraform(this._gatewayId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      global_eip_address: {
        value: cdktf.stringToHclTerraform(this._globalEipAddress),
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
        value: cdktf.stringToHclTerraform(this._internalServicePort),
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
      rule_id: {
        value: cdktf.stringToHclTerraform(this._ruleId),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

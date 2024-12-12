// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudNatPrivateDnatRulesConfig extends cdktf.TerraformMetaArguments {
  /**
  * The network interface ID of the backend instance to which the private DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#backend_interface_id DataHuaweicloudNatPrivateDnatRules#backend_interface_id}
  */
  readonly backendInterfaceId?: string;
  /**
  * The private IP address of the backend instance to which the private DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#backend_private_ip DataHuaweicloudNatPrivateDnatRules#backend_private_ip}
  */
  readonly backendPrivateIp?: string;
  /**
  * The type of the backend instance to which the private DNAT rules belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#backend_type DataHuaweicloudNatPrivateDnatRules#backend_type}
  */
  readonly backendType?: string;
  /**
  * The ID of the enterprise project to which the private DNAT rules belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#enterprise_project_id DataHuaweicloudNatPrivateDnatRules#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * The ID of the private NAT gateway to which the private DNAT rules belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#gateway_id DataHuaweicloudNatPrivateDnatRules#gateway_id}
  */
  readonly gatewayId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#id DataHuaweicloudNatPrivateDnatRules#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The port of the backend instance to which the private DNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#internal_service_port DataHuaweicloudNatPrivateDnatRules#internal_service_port}
  */
  readonly internalServicePort?: string;
  /**
  * The protocol type of the private DNAT rules.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#protocol DataHuaweicloudNatPrivateDnatRules#protocol}
  */
  readonly protocol?: string;
  /**
  * The region where the private DNAT rules are located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#region DataHuaweicloudNatPrivateDnatRules#region}
  */
  readonly region?: string;
  /**
  * The ID of the private DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#rule_id DataHuaweicloudNatPrivateDnatRules#rule_id}
  */
  readonly ruleId?: string;
  /**
  * The ID of the transit IP associated with the private DNAT rules.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#transit_ip_id DataHuaweicloudNatPrivateDnatRules#transit_ip_id}
  */
  readonly transitIpId?: string;
  /**
  * The port of the transit IP associated with the private DNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#transit_service_port DataHuaweicloudNatPrivateDnatRules#transit_service_port}
  */
  readonly transitServicePort?: string;
}
export interface DataHuaweicloudNatPrivateDnatRulesRules {
}

export function dataHuaweicloudNatPrivateDnatRulesRulesToTerraform(struct?: DataHuaweicloudNatPrivateDnatRulesRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudNatPrivateDnatRulesRulesToHclTerraform(struct?: DataHuaweicloudNatPrivateDnatRulesRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudNatPrivateDnatRulesRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudNatPrivateDnatRulesRules | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudNatPrivateDnatRulesRules | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // backend_interface_id - computed: true, optional: false, required: false
  public get backendInterfaceId() {
    return this.getStringAttribute('backend_interface_id');
  }

  // backend_private_ip - computed: true, optional: false, required: false
  public get backendPrivateIp() {
    return this.getStringAttribute('backend_private_ip');
  }

  // backend_type - computed: true, optional: false, required: false
  public get backendType() {
    return this.getStringAttribute('backend_type');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // gateway_id - computed: true, optional: false, required: false
  public get gatewayId() {
    return this.getStringAttribute('gateway_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // internal_service_port - computed: true, optional: false, required: false
  public get internalServicePort() {
    return this.getStringAttribute('internal_service_port');
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // transit_ip_id - computed: true, optional: false, required: false
  public get transitIpId() {
    return this.getStringAttribute('transit_ip_id');
  }

  // transit_service_port - computed: true, optional: false, required: false
  public get transitServicePort() {
    return this.getStringAttribute('transit_service_port');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudNatPrivateDnatRulesRulesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudNatPrivateDnatRulesRulesOutputReference {
    return new DataHuaweicloudNatPrivateDnatRulesRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules huaweicloud_nat_private_dnat_rules}
*/
export class DataHuaweicloudNatPrivateDnatRules extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_nat_private_dnat_rules";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudNatPrivateDnatRules resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudNatPrivateDnatRules to import
  * @param importFromId The id of the existing DataHuaweicloudNatPrivateDnatRules that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudNatPrivateDnatRules to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_nat_private_dnat_rules", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_private_dnat_rules huaweicloud_nat_private_dnat_rules} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudNatPrivateDnatRulesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudNatPrivateDnatRulesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_nat_private_dnat_rules',
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
    this._backendType = config.backendType;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._gatewayId = config.gatewayId;
    this._id = config.id;
    this._internalServicePort = config.internalServicePort;
    this._protocol = config.protocol;
    this._region = config.region;
    this._ruleId = config.ruleId;
    this._transitIpId = config.transitIpId;
    this._transitServicePort = config.transitServicePort;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backend_interface_id - computed: false, optional: true, required: false
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

  // backend_private_ip - computed: false, optional: true, required: false
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

  // backend_type - computed: false, optional: true, required: false
  private _backendType?: string; 
  public get backendType() {
    return this.getStringAttribute('backend_type');
  }
  public set backendType(value: string) {
    this._backendType = value;
  }
  public resetBackendType() {
    this._backendType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendTypeInput() {
    return this._backendType;
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
  private _rules = new DataHuaweicloudNatPrivateDnatRulesRulesList(this, "rules", false);
  public get rules() {
    return this._rules;
  }

  // transit_ip_id - computed: false, optional: true, required: false
  private _transitIpId?: string; 
  public get transitIpId() {
    return this.getStringAttribute('transit_ip_id');
  }
  public set transitIpId(value: string) {
    this._transitIpId = value;
  }
  public resetTransitIpId() {
    this._transitIpId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get transitIpIdInput() {
    return this._transitIpId;
  }

  // transit_service_port - computed: false, optional: true, required: false
  private _transitServicePort?: string; 
  public get transitServicePort() {
    return this.getStringAttribute('transit_service_port');
  }
  public set transitServicePort(value: string) {
    this._transitServicePort = value;
  }
  public resetTransitServicePort() {
    this._transitServicePort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get transitServicePortInput() {
    return this._transitServicePort;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      backend_interface_id: cdktf.stringToTerraform(this._backendInterfaceId),
      backend_private_ip: cdktf.stringToTerraform(this._backendPrivateIp),
      backend_type: cdktf.stringToTerraform(this._backendType),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      gateway_id: cdktf.stringToTerraform(this._gatewayId),
      id: cdktf.stringToTerraform(this._id),
      internal_service_port: cdktf.stringToTerraform(this._internalServicePort),
      protocol: cdktf.stringToTerraform(this._protocol),
      region: cdktf.stringToTerraform(this._region),
      rule_id: cdktf.stringToTerraform(this._ruleId),
      transit_ip_id: cdktf.stringToTerraform(this._transitIpId),
      transit_service_port: cdktf.stringToTerraform(this._transitServicePort),
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
      backend_type: {
        value: cdktf.stringToHclTerraform(this._backendType),
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
        value: cdktf.stringToHclTerraform(this._internalServicePort),
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
      transit_ip_id: {
        value: cdktf.stringToHclTerraform(this._transitIpId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      transit_service_port: {
        value: cdktf.stringToHclTerraform(this._transitServicePort),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

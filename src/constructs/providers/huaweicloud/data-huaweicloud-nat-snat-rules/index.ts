// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudNatSnatRulesConfig extends cdktf.TerraformMetaArguments {
  /**
  * The CIDR block to which the SNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#cidr DataHuaweicloudNatSnatRules#cidr}
  */
  readonly cidr?: string;
  /**
  * The IP of the EIP associated with SNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#floating_ip_address DataHuaweicloudNatSnatRules#floating_ip_address}
  */
  readonly floatingIpAddress?: string;
  /**
  * The ID of the EIP associated with SNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#floating_ip_id DataHuaweicloudNatSnatRules#floating_ip_id}
  */
  readonly floatingIpId?: string;
  /**
  * The ID of the NAT gateway to which the SNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#gateway_id DataHuaweicloudNatSnatRules#gateway_id}
  */
  readonly gatewayId?: string;
  /**
  * The IPs of the global EIP associated with SNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#global_eip_address DataHuaweicloudNatSnatRules#global_eip_address}
  */
  readonly globalEipAddress?: string;
  /**
  * The IDs of the global EIP associated with SNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#global_eip_id DataHuaweicloudNatSnatRules#global_eip_id}
  */
  readonly globalEipId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#id DataHuaweicloudNatSnatRules#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The region where the SNAT rules are located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#region DataHuaweicloudNatSnatRules#region}
  */
  readonly region?: string;
  /**
  * The ID of the SNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#rule_id DataHuaweicloudNatSnatRules#rule_id}
  */
  readonly ruleId?: string;
  /**
  * The source type of the SNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#source_type DataHuaweicloudNatSnatRules#source_type}
  */
  readonly sourceType?: string;
  /**
  * The status of the SNAT rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#status DataHuaweicloudNatSnatRules#status}
  */
  readonly status?: string;
  /**
  * The ID of the subnet to which the SNAT rule belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#subnet_id DataHuaweicloudNatSnatRules#subnet_id}
  */
  readonly subnetId?: string;
}
export interface DataHuaweicloudNatSnatRulesRules {
}

export function dataHuaweicloudNatSnatRulesRulesToTerraform(struct?: DataHuaweicloudNatSnatRulesRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudNatSnatRulesRulesToHclTerraform(struct?: DataHuaweicloudNatSnatRulesRules): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudNatSnatRulesRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudNatSnatRulesRules | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudNatSnatRulesRules | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // cidr - computed: true, optional: false, required: false
  public get cidr() {
    return this.getStringAttribute('cidr');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // floating_ip_address - computed: true, optional: false, required: false
  public get floatingIpAddress() {
    return this.getStringAttribute('floating_ip_address');
  }

  // floating_ip_id - computed: true, optional: false, required: false
  public get floatingIpId() {
    return this.getStringAttribute('floating_ip_id');
  }

  // freezed_ip_address - computed: true, optional: false, required: false
  public get freezedIpAddress() {
    return this.getStringAttribute('freezed_ip_address');
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

  // source_type - computed: true, optional: false, required: false
  public get sourceType() {
    return this.getNumberAttribute('source_type');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // subnet_id - computed: true, optional: false, required: false
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
}

export class DataHuaweicloudNatSnatRulesRulesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudNatSnatRulesRulesOutputReference {
    return new DataHuaweicloudNatSnatRulesRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules huaweicloud_nat_snat_rules}
*/
export class DataHuaweicloudNatSnatRules extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_nat_snat_rules";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudNatSnatRules resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudNatSnatRules to import
  * @param importFromId The id of the existing DataHuaweicloudNatSnatRules that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudNatSnatRules to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_nat_snat_rules", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/nat_snat_rules huaweicloud_nat_snat_rules} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudNatSnatRulesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudNatSnatRulesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_nat_snat_rules',
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
    this._cidr = config.cidr;
    this._floatingIpAddress = config.floatingIpAddress;
    this._floatingIpId = config.floatingIpId;
    this._gatewayId = config.gatewayId;
    this._globalEipAddress = config.globalEipAddress;
    this._globalEipId = config.globalEipId;
    this._id = config.id;
    this._region = config.region;
    this._ruleId = config.ruleId;
    this._sourceType = config.sourceType;
    this._status = config.status;
    this._subnetId = config.subnetId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cidr - computed: false, optional: true, required: false
  private _cidr?: string; 
  public get cidr() {
    return this.getStringAttribute('cidr');
  }
  public set cidr(value: string) {
    this._cidr = value;
  }
  public resetCidr() {
    this._cidr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cidrInput() {
    return this._cidr;
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
  private _rules = new DataHuaweicloudNatSnatRulesRulesList(this, "rules", false);
  public get rules() {
    return this._rules;
  }

  // source_type - computed: false, optional: true, required: false
  private _sourceType?: string; 
  public get sourceType() {
    return this.getStringAttribute('source_type');
  }
  public set sourceType(value: string) {
    this._sourceType = value;
  }
  public resetSourceType() {
    this._sourceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTypeInput() {
    return this._sourceType;
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

  // subnet_id - computed: false, optional: true, required: false
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cidr: cdktf.stringToTerraform(this._cidr),
      floating_ip_address: cdktf.stringToTerraform(this._floatingIpAddress),
      floating_ip_id: cdktf.stringToTerraform(this._floatingIpId),
      gateway_id: cdktf.stringToTerraform(this._gatewayId),
      global_eip_address: cdktf.stringToTerraform(this._globalEipAddress),
      global_eip_id: cdktf.stringToTerraform(this._globalEipId),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      rule_id: cdktf.stringToTerraform(this._ruleId),
      source_type: cdktf.stringToTerraform(this._sourceType),
      status: cdktf.stringToTerraform(this._status),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cidr: {
        value: cdktf.stringToHclTerraform(this._cidr),
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
      source_type: {
        value: cdktf.stringToHclTerraform(this._sourceType),
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
      subnet_id: {
        value: cdktf.stringToHclTerraform(this._subnetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

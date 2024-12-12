// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CfwFirewallConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#auto_renew CfwFirewall#auto_renew}
  */
  readonly autoRenew?: string;
  /**
  * Specifies the charging mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#charging_mode CfwFirewall#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Specifies the ER ID of the east-west firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#east_west_firewall_er_id CfwFirewall#east_west_firewall_er_id}
  */
  readonly eastWestFirewallErId?: string;
  /**
  * Specifies the inspection cidr of the east-west firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#east_west_firewall_inspection_cidr CfwFirewall#east_west_firewall_inspection_cidr}
  */
  readonly eastWestFirewallInspectionCidr?: string;
  /**
  * Specifies the mode of the east-west firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#east_west_firewall_mode CfwFirewall#east_west_firewall_mode}
  */
  readonly eastWestFirewallMode?: string;
  /**
  * Specifies the protection statue of the east-west firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#east_west_firewall_status CfwFirewall#east_west_firewall_status}
  */
  readonly eastWestFirewallStatus?: number;
  /**
  * Specifies the enterprise project ID of the firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#enterprise_project_id CfwFirewall#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#id CfwFirewall#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the IPS protection mode of the firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#ips_protection_mode CfwFirewall#ips_protection_mode}
  */
  readonly ipsProtectionMode?: number;
  /**
  * Specifies the IPS patch switch status of the firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#ips_switch_status CfwFirewall#ips_switch_status}
  */
  readonly ipsSwitchStatus?: number;
  /**
  * Specifies the firewall name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#name CfwFirewall#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#period CfwFirewall#period}
  */
  readonly period?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#period_unit CfwFirewall#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#region CfwFirewall#region}
  */
  readonly region?: string;
  /**
  * Specifies the key/value pairs to associate with the firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#tags CfwFirewall#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * flavor block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#flavor CfwFirewall#flavor}
  */
  readonly flavor: CfwFirewallFlavor;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#timeouts CfwFirewall#timeouts}
  */
  readonly timeouts?: CfwFirewallTimeouts;
}
export interface CfwFirewallProtectObjects {
}

export function cfwFirewallProtectObjectsToTerraform(struct?: CfwFirewallProtectObjects): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function cfwFirewallProtectObjectsToHclTerraform(struct?: CfwFirewallProtectObjects): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CfwFirewallProtectObjectsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CfwFirewallProtectObjects | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwFirewallProtectObjects | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // object_id - computed: true, optional: false, required: false
  public get objectId() {
    return this.getStringAttribute('object_id');
  }

  // object_name - computed: true, optional: false, required: false
  public get objectName() {
    return this.getStringAttribute('object_name');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getNumberAttribute('type');
  }
}

export class CfwFirewallProtectObjectsList extends cdktf.ComplexList {

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
  public get(index: number): CfwFirewallProtectObjectsOutputReference {
    return new CfwFirewallProtectObjectsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CfwFirewallFlavor {
  /**
  * Specifies the extend bandwidth of the firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#extend_bandwidth CfwFirewall#extend_bandwidth}
  */
  readonly extendBandwidth?: number;
  /**
  * Specifies the extend EIP number of the firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#extend_eip_count CfwFirewall#extend_eip_count}
  */
  readonly extendEipCount?: number;
  /**
  * Specifies the extend VPC number of the firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#extend_vpc_count CfwFirewall#extend_vpc_count}
  */
  readonly extendVpcCount?: number;
  /**
  * Specifies the version of the firewall.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#version CfwFirewall#version}
  */
  readonly version: string;
}

export function cfwFirewallFlavorToTerraform(struct?: CfwFirewallFlavorOutputReference | CfwFirewallFlavor): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    extend_bandwidth: cdktf.numberToTerraform(struct!.extendBandwidth),
    extend_eip_count: cdktf.numberToTerraform(struct!.extendEipCount),
    extend_vpc_count: cdktf.numberToTerraform(struct!.extendVpcCount),
    version: cdktf.stringToTerraform(struct!.version),
  }
}


export function cfwFirewallFlavorToHclTerraform(struct?: CfwFirewallFlavorOutputReference | CfwFirewallFlavor): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    extend_bandwidth: {
      value: cdktf.numberToHclTerraform(struct!.extendBandwidth),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    extend_eip_count: {
      value: cdktf.numberToHclTerraform(struct!.extendEipCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    extend_vpc_count: {
      value: cdktf.numberToHclTerraform(struct!.extendVpcCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    version: {
      value: cdktf.stringToHclTerraform(struct!.version),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CfwFirewallFlavorOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CfwFirewallFlavor | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._extendBandwidth !== undefined) {
      hasAnyValues = true;
      internalValueResult.extendBandwidth = this._extendBandwidth;
    }
    if (this._extendEipCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.extendEipCount = this._extendEipCount;
    }
    if (this._extendVpcCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.extendVpcCount = this._extendVpcCount;
    }
    if (this._version !== undefined) {
      hasAnyValues = true;
      internalValueResult.version = this._version;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwFirewallFlavor | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._extendBandwidth = undefined;
      this._extendEipCount = undefined;
      this._extendVpcCount = undefined;
      this._version = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._extendBandwidth = value.extendBandwidth;
      this._extendEipCount = value.extendEipCount;
      this._extendVpcCount = value.extendVpcCount;
      this._version = value.version;
    }
  }

  // bandwidth - computed: true, optional: false, required: false
  public get bandwidth() {
    return this.getNumberAttribute('bandwidth');
  }

  // default_bandwidth - computed: true, optional: false, required: false
  public get defaultBandwidth() {
    return this.getNumberAttribute('default_bandwidth');
  }

  // default_eip_count - computed: true, optional: false, required: false
  public get defaultEipCount() {
    return this.getNumberAttribute('default_eip_count');
  }

  // default_log_storage - computed: true, optional: false, required: false
  public get defaultLogStorage() {
    return this.getNumberAttribute('default_log_storage');
  }

  // default_vpc_count - computed: true, optional: false, required: false
  public get defaultVpcCount() {
    return this.getNumberAttribute('default_vpc_count');
  }

  // eip_count - computed: true, optional: false, required: false
  public get eipCount() {
    return this.getNumberAttribute('eip_count');
  }

  // extend_bandwidth - computed: false, optional: true, required: false
  private _extendBandwidth?: number; 
  public get extendBandwidth() {
    return this.getNumberAttribute('extend_bandwidth');
  }
  public set extendBandwidth(value: number) {
    this._extendBandwidth = value;
  }
  public resetExtendBandwidth() {
    this._extendBandwidth = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendBandwidthInput() {
    return this._extendBandwidth;
  }

  // extend_eip_count - computed: false, optional: true, required: false
  private _extendEipCount?: number; 
  public get extendEipCount() {
    return this.getNumberAttribute('extend_eip_count');
  }
  public set extendEipCount(value: number) {
    this._extendEipCount = value;
  }
  public resetExtendEipCount() {
    this._extendEipCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendEipCountInput() {
    return this._extendEipCount;
  }

  // extend_vpc_count - computed: false, optional: true, required: false
  private _extendVpcCount?: number; 
  public get extendVpcCount() {
    return this.getNumberAttribute('extend_vpc_count');
  }
  public set extendVpcCount(value: number) {
    this._extendVpcCount = value;
  }
  public resetExtendVpcCount() {
    this._extendVpcCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extendVpcCountInput() {
    return this._extendVpcCount;
  }

  // log_storage - computed: true, optional: false, required: false
  public get logStorage() {
    return this.getNumberAttribute('log_storage');
  }

  // total_rule_count - computed: true, optional: false, required: false
  public get totalRuleCount() {
    return this.getNumberAttribute('total_rule_count');
  }

  // used_rule_count - computed: true, optional: false, required: false
  public get usedRuleCount() {
    return this.getNumberAttribute('used_rule_count');
  }

  // version - computed: false, optional: false, required: true
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // vpc_bandwidth - computed: true, optional: false, required: false
  public get vpcBandwidth() {
    return this.getNumberAttribute('vpc_bandwidth');
  }

  // vpc_count - computed: true, optional: false, required: false
  public get vpcCount() {
    return this.getNumberAttribute('vpc_count');
  }
}
export interface CfwFirewallTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#create CfwFirewall#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#delete CfwFirewall#delete}
  */
  readonly delete?: string;
}

export function cfwFirewallTimeoutsToTerraform(struct?: CfwFirewallTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function cfwFirewallTimeoutsToHclTerraform(struct?: CfwFirewallTimeouts | cdktf.IResolvable): any {
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

export class CfwFirewallTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CfwFirewallTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CfwFirewallTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall huaweicloud_cfw_firewall}
*/
export class CfwFirewall extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cfw_firewall";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CfwFirewall resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CfwFirewall to import
  * @param importFromId The id of the existing CfwFirewall that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CfwFirewall to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cfw_firewall", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_firewall huaweicloud_cfw_firewall} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CfwFirewallConfig
  */
  public constructor(scope: Construct, id: string, config: CfwFirewallConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cfw_firewall',
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
    this._autoRenew = config.autoRenew;
    this._chargingMode = config.chargingMode;
    this._eastWestFirewallErId = config.eastWestFirewallErId;
    this._eastWestFirewallInspectionCidr = config.eastWestFirewallInspectionCidr;
    this._eastWestFirewallMode = config.eastWestFirewallMode;
    this._eastWestFirewallStatus = config.eastWestFirewallStatus;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._ipsProtectionMode = config.ipsProtectionMode;
    this._ipsSwitchStatus = config.ipsSwitchStatus;
    this._name = config.name;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._region = config.region;
    this._tags = config.tags;
    this._flavor.internalValue = config.flavor;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // charging_mode - computed: false, optional: true, required: false
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

  // east_west_firewall_er_attachment_id - computed: true, optional: false, required: false
  public get eastWestFirewallErAttachmentId() {
    return this.getStringAttribute('east_west_firewall_er_attachment_id');
  }

  // east_west_firewall_er_id - computed: true, optional: true, required: false
  private _eastWestFirewallErId?: string; 
  public get eastWestFirewallErId() {
    return this.getStringAttribute('east_west_firewall_er_id');
  }
  public set eastWestFirewallErId(value: string) {
    this._eastWestFirewallErId = value;
  }
  public resetEastWestFirewallErId() {
    this._eastWestFirewallErId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eastWestFirewallErIdInput() {
    return this._eastWestFirewallErId;
  }

  // east_west_firewall_inspection_cidr - computed: true, optional: true, required: false
  private _eastWestFirewallInspectionCidr?: string; 
  public get eastWestFirewallInspectionCidr() {
    return this.getStringAttribute('east_west_firewall_inspection_cidr');
  }
  public set eastWestFirewallInspectionCidr(value: string) {
    this._eastWestFirewallInspectionCidr = value;
  }
  public resetEastWestFirewallInspectionCidr() {
    this._eastWestFirewallInspectionCidr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eastWestFirewallInspectionCidrInput() {
    return this._eastWestFirewallInspectionCidr;
  }

  // east_west_firewall_inspection_vpc_id - computed: true, optional: false, required: false
  public get eastWestFirewallInspectionVpcId() {
    return this.getStringAttribute('east_west_firewall_inspection_vpc_id');
  }

  // east_west_firewall_mode - computed: true, optional: true, required: false
  private _eastWestFirewallMode?: string; 
  public get eastWestFirewallMode() {
    return this.getStringAttribute('east_west_firewall_mode');
  }
  public set eastWestFirewallMode(value: string) {
    this._eastWestFirewallMode = value;
  }
  public resetEastWestFirewallMode() {
    this._eastWestFirewallMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eastWestFirewallModeInput() {
    return this._eastWestFirewallMode;
  }

  // east_west_firewall_status - computed: false, optional: true, required: false
  private _eastWestFirewallStatus?: number; 
  public get eastWestFirewallStatus() {
    return this.getNumberAttribute('east_west_firewall_status');
  }
  public set eastWestFirewallStatus(value: number) {
    this._eastWestFirewallStatus = value;
  }
  public resetEastWestFirewallStatus() {
    this._eastWestFirewallStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eastWestFirewallStatusInput() {
    return this._eastWestFirewallStatus;
  }

  // engine_type - computed: true, optional: false, required: false
  public get engineType() {
    return this.getNumberAttribute('engine_type');
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

  // ha_type - computed: true, optional: false, required: false
  public get haType() {
    return this.getNumberAttribute('ha_type');
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

  // ips_protection_mode - computed: false, optional: true, required: false
  private _ipsProtectionMode?: number; 
  public get ipsProtectionMode() {
    return this.getNumberAttribute('ips_protection_mode');
  }
  public set ipsProtectionMode(value: number) {
    this._ipsProtectionMode = value;
  }
  public resetIpsProtectionMode() {
    this._ipsProtectionMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipsProtectionModeInput() {
    return this._ipsProtectionMode;
  }

  // ips_switch_status - computed: false, optional: true, required: false
  private _ipsSwitchStatus?: number; 
  public get ipsSwitchStatus() {
    return this.getNumberAttribute('ips_switch_status');
  }
  public set ipsSwitchStatus(value: number) {
    this._ipsSwitchStatus = value;
  }
  public resetIpsSwitchStatus() {
    this._ipsSwitchStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipsSwitchStatusInput() {
    return this._ipsSwitchStatus;
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

  // protect_objects - computed: true, optional: false, required: false
  private _protectObjects = new CfwFirewallProtectObjectsList(this, "protect_objects", false);
  public get protectObjects() {
    return this._protectObjects;
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

  // service_type - computed: true, optional: false, required: false
  public get serviceType() {
    return this.getNumberAttribute('service_type');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getNumberAttribute('status');
  }

  // support_ipv6 - computed: true, optional: false, required: false
  public get supportIpv6() {
    return this.getBooleanAttribute('support_ipv6');
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

  // flavor - computed: false, optional: false, required: true
  private _flavor = new CfwFirewallFlavorOutputReference(this, "flavor");
  public get flavor() {
    return this._flavor;
  }
  public putFlavor(value: CfwFirewallFlavor) {
    this._flavor.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CfwFirewallTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CfwFirewallTimeouts) {
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
      auto_renew: cdktf.stringToTerraform(this._autoRenew),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      east_west_firewall_er_id: cdktf.stringToTerraform(this._eastWestFirewallErId),
      east_west_firewall_inspection_cidr: cdktf.stringToTerraform(this._eastWestFirewallInspectionCidr),
      east_west_firewall_mode: cdktf.stringToTerraform(this._eastWestFirewallMode),
      east_west_firewall_status: cdktf.numberToTerraform(this._eastWestFirewallStatus),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      ips_protection_mode: cdktf.numberToTerraform(this._ipsProtectionMode),
      ips_switch_status: cdktf.numberToTerraform(this._ipsSwitchStatus),
      name: cdktf.stringToTerraform(this._name),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      flavor: cfwFirewallFlavorToTerraform(this._flavor.internalValue),
      timeouts: cfwFirewallTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auto_renew: {
        value: cdktf.stringToHclTerraform(this._autoRenew),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      charging_mode: {
        value: cdktf.stringToHclTerraform(this._chargingMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      east_west_firewall_er_id: {
        value: cdktf.stringToHclTerraform(this._eastWestFirewallErId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      east_west_firewall_inspection_cidr: {
        value: cdktf.stringToHclTerraform(this._eastWestFirewallInspectionCidr),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      east_west_firewall_mode: {
        value: cdktf.stringToHclTerraform(this._eastWestFirewallMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      east_west_firewall_status: {
        value: cdktf.numberToHclTerraform(this._eastWestFirewallStatus),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      ips_protection_mode: {
        value: cdktf.numberToHclTerraform(this._ipsProtectionMode),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      ips_switch_status: {
        value: cdktf.numberToHclTerraform(this._ipsSwitchStatus),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      flavor: {
        value: cfwFirewallFlavorToHclTerraform(this._flavor.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwFirewallFlavorList",
      },
      timeouts: {
        value: cfwFirewallTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CfwFirewallTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

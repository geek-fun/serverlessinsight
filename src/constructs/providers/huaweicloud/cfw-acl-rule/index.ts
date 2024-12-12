// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CfwAclRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * The action type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#action_type CfwAclRule#action_type}
  */
  readonly actionType: number;
  /**
  * The address type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#address_type CfwAclRule#address_type}
  */
  readonly addressType: number;
  /**
  * The rule description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#description CfwAclRule#description}
  */
  readonly description?: string;
  /**
  * The destination address group list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#destination_address_groups CfwAclRule#destination_address_groups}
  */
  readonly destinationAddressGroups?: string[];
  /**
  * The destination address type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#destination_address_type CfwAclRule#destination_address_type}
  */
  readonly destinationAddressType?: number;
  /**
  * The destination IP address list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#destination_addresses CfwAclRule#destination_addresses}
  */
  readonly destinationAddresses?: string[];
  /**
  * The destination domain address name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#destination_domain_address_name CfwAclRule#destination_domain_address_name}
  */
  readonly destinationDomainAddressName?: string;
  /**
  * The destination domain group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#destination_domain_group_id CfwAclRule#destination_domain_group_id}
  */
  readonly destinationDomainGroupId?: string;
  /**
  * The destination domain group name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#destination_domain_group_name CfwAclRule#destination_domain_group_name}
  */
  readonly destinationDomainGroupName?: string;
  /**
  * The destination domain group type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#destination_domain_group_type CfwAclRule#destination_domain_group_type}
  */
  readonly destinationDomainGroupType?: number;
  /**
  * The rule direction.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#direction CfwAclRule#direction}
  */
  readonly direction?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#enable_force_new CfwAclRule#enable_force_new}
  */
  readonly enableForceNew?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#id CfwAclRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Whether to support persistent connections.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#long_connect_enable CfwAclRule#long_connect_enable}
  */
  readonly longConnectEnable: number;
  /**
  * The persistent connection duration (hour).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#long_connect_time_hour CfwAclRule#long_connect_time_hour}
  */
  readonly longConnectTimeHour?: number;
  /**
  * The persistent connection duration (minute).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#long_connect_time_minute CfwAclRule#long_connect_time_minute}
  */
  readonly longConnectTimeMinute?: number;
  /**
  * The persistent Connection Duration (second).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#long_connect_time_second CfwAclRule#long_connect_time_second}
  */
  readonly longConnectTimeSecond?: number;
  /**
  * The rule name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#name CfwAclRule#name}
  */
  readonly name: string;
  /**
  * The protected object ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#object_id CfwAclRule#object_id}
  */
  readonly objectId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#region CfwAclRule#region}
  */
  readonly region?: string;
  /**
  * The number of times the ACL rule is hit.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#rule_hit_count CfwAclRule#rule_hit_count}
  */
  readonly ruleHitCount?: string;
  /**
  * The source address group list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#source_address_groups CfwAclRule#source_address_groups}
  */
  readonly sourceAddressGroups?: string[];
  /**
  * The source address type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#source_address_type CfwAclRule#source_address_type}
  */
  readonly sourceAddressType?: number;
  /**
  * The source IP address list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#source_addresses CfwAclRule#source_addresses}
  */
  readonly sourceAddresses?: string[];
  /**
  * The source predefined address group list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#source_predefined_groups CfwAclRule#source_predefined_groups}
  */
  readonly sourcePredefinedGroups?: string[];
  /**
  * The rule status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#status CfwAclRule#status}
  */
  readonly status: number;
  /**
  * The key/value pairs to associate with the ACL rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#tags CfwAclRule#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * The rule type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#type CfwAclRule#type}
  */
  readonly type: number;
  /**
  * custom_service_groups block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#custom_service_groups CfwAclRule#custom_service_groups}
  */
  readonly customServiceGroups?: CfwAclRuleCustomServiceGroups;
  /**
  * custom_services block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#custom_services CfwAclRule#custom_services}
  */
  readonly customServices?: CfwAclRuleCustomServices[] | cdktf.IResolvable;
  /**
  * destination_region_list block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#destination_region_list CfwAclRule#destination_region_list}
  */
  readonly destinationRegionList?: CfwAclRuleDestinationRegionListStruct[] | cdktf.IResolvable;
  /**
  * predefined_service_groups block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#predefined_service_groups CfwAclRule#predefined_service_groups}
  */
  readonly predefinedServiceGroups?: CfwAclRulePredefinedServiceGroups;
  /**
  * sequence block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#sequence CfwAclRule#sequence}
  */
  readonly sequence: CfwAclRuleSequence;
  /**
  * source_region_list block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#source_region_list CfwAclRule#source_region_list}
  */
  readonly sourceRegionList?: CfwAclRuleSourceRegionListStruct[] | cdktf.IResolvable;
}
export interface CfwAclRuleCustomServiceGroups {
  /**
  * The IDs of the service groups.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#group_ids CfwAclRule#group_ids}
  */
  readonly groupIds: string[];
  /**
  * The protocols used in the service groups.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#protocols CfwAclRule#protocols}
  */
  readonly protocols: number[];
}

export function cfwAclRuleCustomServiceGroupsToTerraform(struct?: CfwAclRuleCustomServiceGroupsOutputReference | CfwAclRuleCustomServiceGroups): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    group_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.groupIds),
    protocols: cdktf.listMapper(cdktf.numberToTerraform, false)(struct!.protocols),
  }
}


export function cfwAclRuleCustomServiceGroupsToHclTerraform(struct?: CfwAclRuleCustomServiceGroupsOutputReference | CfwAclRuleCustomServiceGroups): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    group_ids: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.groupIds),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    protocols: {
      value: cdktf.listMapperHcl(cdktf.numberToHclTerraform, false)(struct!.protocols),
      isBlock: false,
      type: "set",
      storageClassType: "numberList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CfwAclRuleCustomServiceGroupsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CfwAclRuleCustomServiceGroups | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._groupIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.groupIds = this._groupIds;
    }
    if (this._protocols !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocols = this._protocols;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwAclRuleCustomServiceGroups | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._groupIds = undefined;
      this._protocols = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._groupIds = value.groupIds;
      this._protocols = value.protocols;
    }
  }

  // group_ids - computed: false, optional: false, required: true
  private _groupIds?: string[]; 
  public get groupIds() {
    return this.getListAttribute('group_ids');
  }
  public set groupIds(value: string[]) {
    this._groupIds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupIdsInput() {
    return this._groupIds;
  }

  // protocols - computed: false, optional: false, required: true
  private _protocols?: number[]; 
  public get protocols() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('protocols')));
  }
  public set protocols(value: number[]) {
    this._protocols = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolsInput() {
    return this._protocols;
  }
}
export interface CfwAclRuleCustomServices {
  /**
  * The destination port.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#dest_port CfwAclRule#dest_port}
  */
  readonly destPort: string;
  /**
  * The protocol type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#protocol CfwAclRule#protocol}
  */
  readonly protocol: number;
  /**
  * The source port.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#source_port CfwAclRule#source_port}
  */
  readonly sourcePort: string;
}

export function cfwAclRuleCustomServicesToTerraform(struct?: CfwAclRuleCustomServices | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dest_port: cdktf.stringToTerraform(struct!.destPort),
    protocol: cdktf.numberToTerraform(struct!.protocol),
    source_port: cdktf.stringToTerraform(struct!.sourcePort),
  }
}


export function cfwAclRuleCustomServicesToHclTerraform(struct?: CfwAclRuleCustomServices | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    dest_port: {
      value: cdktf.stringToHclTerraform(struct!.destPort),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    protocol: {
      value: cdktf.numberToHclTerraform(struct!.protocol),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    source_port: {
      value: cdktf.stringToHclTerraform(struct!.sourcePort),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CfwAclRuleCustomServicesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CfwAclRuleCustomServices | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._destPort !== undefined) {
      hasAnyValues = true;
      internalValueResult.destPort = this._destPort;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    if (this._sourcePort !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourcePort = this._sourcePort;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwAclRuleCustomServices | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._destPort = undefined;
      this._protocol = undefined;
      this._sourcePort = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._destPort = value.destPort;
      this._protocol = value.protocol;
      this._sourcePort = value.sourcePort;
    }
  }

  // dest_port - computed: false, optional: false, required: true
  private _destPort?: string; 
  public get destPort() {
    return this.getStringAttribute('dest_port');
  }
  public set destPort(value: string) {
    this._destPort = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destPortInput() {
    return this._destPort;
  }

  // protocol - computed: false, optional: false, required: true
  private _protocol?: number; 
  public get protocol() {
    return this.getNumberAttribute('protocol');
  }
  public set protocol(value: number) {
    this._protocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }

  // source_port - computed: false, optional: false, required: true
  private _sourcePort?: string; 
  public get sourcePort() {
    return this.getStringAttribute('source_port');
  }
  public set sourcePort(value: string) {
    this._sourcePort = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourcePortInput() {
    return this._sourcePort;
  }
}

export class CfwAclRuleCustomServicesList extends cdktf.ComplexList {
  public internalValue? : CfwAclRuleCustomServices[] | cdktf.IResolvable

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
  public get(index: number): CfwAclRuleCustomServicesOutputReference {
    return new CfwAclRuleCustomServicesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CfwAclRuleDestinationRegionListStruct {
  /**
  * The Chinese description of the region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#description_cn CfwAclRule#description_cn}
  */
  readonly descriptionCn?: string;
  /**
  * The English description of the region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#description_en CfwAclRule#description_en}
  */
  readonly descriptionEn?: string;
  /**
  * The region ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#region_id CfwAclRule#region_id}
  */
  readonly regionId: string;
  /**
  * The region type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#region_type CfwAclRule#region_type}
  */
  readonly regionType: number;
}

export function cfwAclRuleDestinationRegionListStructToTerraform(struct?: CfwAclRuleDestinationRegionListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description_cn: cdktf.stringToTerraform(struct!.descriptionCn),
    description_en: cdktf.stringToTerraform(struct!.descriptionEn),
    region_id: cdktf.stringToTerraform(struct!.regionId),
    region_type: cdktf.numberToTerraform(struct!.regionType),
  }
}


export function cfwAclRuleDestinationRegionListStructToHclTerraform(struct?: CfwAclRuleDestinationRegionListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description_cn: {
      value: cdktf.stringToHclTerraform(struct!.descriptionCn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    description_en: {
      value: cdktf.stringToHclTerraform(struct!.descriptionEn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region_id: {
      value: cdktf.stringToHclTerraform(struct!.regionId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region_type: {
      value: cdktf.numberToHclTerraform(struct!.regionType),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CfwAclRuleDestinationRegionListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CfwAclRuleDestinationRegionListStruct | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._descriptionCn !== undefined) {
      hasAnyValues = true;
      internalValueResult.descriptionCn = this._descriptionCn;
    }
    if (this._descriptionEn !== undefined) {
      hasAnyValues = true;
      internalValueResult.descriptionEn = this._descriptionEn;
    }
    if (this._regionId !== undefined) {
      hasAnyValues = true;
      internalValueResult.regionId = this._regionId;
    }
    if (this._regionType !== undefined) {
      hasAnyValues = true;
      internalValueResult.regionType = this._regionType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwAclRuleDestinationRegionListStruct | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._descriptionCn = undefined;
      this._descriptionEn = undefined;
      this._regionId = undefined;
      this._regionType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._descriptionCn = value.descriptionCn;
      this._descriptionEn = value.descriptionEn;
      this._regionId = value.regionId;
      this._regionType = value.regionType;
    }
  }

  // description_cn - computed: false, optional: true, required: false
  private _descriptionCn?: string; 
  public get descriptionCn() {
    return this.getStringAttribute('description_cn');
  }
  public set descriptionCn(value: string) {
    this._descriptionCn = value;
  }
  public resetDescriptionCn() {
    this._descriptionCn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionCnInput() {
    return this._descriptionCn;
  }

  // description_en - computed: false, optional: true, required: false
  private _descriptionEn?: string; 
  public get descriptionEn() {
    return this.getStringAttribute('description_en');
  }
  public set descriptionEn(value: string) {
    this._descriptionEn = value;
  }
  public resetDescriptionEn() {
    this._descriptionEn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionEnInput() {
    return this._descriptionEn;
  }

  // region_id - computed: false, optional: false, required: true
  private _regionId?: string; 
  public get regionId() {
    return this.getStringAttribute('region_id');
  }
  public set regionId(value: string) {
    this._regionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionIdInput() {
    return this._regionId;
  }

  // region_type - computed: false, optional: false, required: true
  private _regionType?: number; 
  public get regionType() {
    return this.getNumberAttribute('region_type');
  }
  public set regionType(value: number) {
    this._regionType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionTypeInput() {
    return this._regionType;
  }
}

export class CfwAclRuleDestinationRegionListStructList extends cdktf.ComplexList {
  public internalValue? : CfwAclRuleDestinationRegionListStruct[] | cdktf.IResolvable

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
  public get(index: number): CfwAclRuleDestinationRegionListStructOutputReference {
    return new CfwAclRuleDestinationRegionListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CfwAclRulePredefinedServiceGroups {
  /**
  * The IDs of the service groups.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#group_ids CfwAclRule#group_ids}
  */
  readonly groupIds: string[];
  /**
  * The protocols used in the service groups.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#protocols CfwAclRule#protocols}
  */
  readonly protocols: number[];
}

export function cfwAclRulePredefinedServiceGroupsToTerraform(struct?: CfwAclRulePredefinedServiceGroupsOutputReference | CfwAclRulePredefinedServiceGroups): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    group_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.groupIds),
    protocols: cdktf.listMapper(cdktf.numberToTerraform, false)(struct!.protocols),
  }
}


export function cfwAclRulePredefinedServiceGroupsToHclTerraform(struct?: CfwAclRulePredefinedServiceGroupsOutputReference | CfwAclRulePredefinedServiceGroups): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    group_ids: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.groupIds),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    protocols: {
      value: cdktf.listMapperHcl(cdktf.numberToHclTerraform, false)(struct!.protocols),
      isBlock: false,
      type: "set",
      storageClassType: "numberList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CfwAclRulePredefinedServiceGroupsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CfwAclRulePredefinedServiceGroups | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._groupIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.groupIds = this._groupIds;
    }
    if (this._protocols !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocols = this._protocols;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwAclRulePredefinedServiceGroups | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._groupIds = undefined;
      this._protocols = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._groupIds = value.groupIds;
      this._protocols = value.protocols;
    }
  }

  // group_ids - computed: false, optional: false, required: true
  private _groupIds?: string[]; 
  public get groupIds() {
    return this.getListAttribute('group_ids');
  }
  public set groupIds(value: string[]) {
    this._groupIds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupIdsInput() {
    return this._groupIds;
  }

  // protocols - computed: false, optional: false, required: true
  private _protocols?: number[]; 
  public get protocols() {
    return cdktf.Token.asNumberList(cdktf.Fn.tolist(this.getNumberListAttribute('protocols')));
  }
  public set protocols(value: number[]) {
    this._protocols = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolsInput() {
    return this._protocols;
  }
}
export interface CfwAclRuleSequence {
  /**
  * Whether to pin on bottom.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#bottom CfwAclRule#bottom}
  */
  readonly bottom?: number;
  /**
  * The ID of the rule that the added rule will follow.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#dest_rule_id CfwAclRule#dest_rule_id}
  */
  readonly destRuleId?: string;
  /**
  * Whether to pin on top.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#top CfwAclRule#top}
  */
  readonly top?: number;
}

export function cfwAclRuleSequenceToTerraform(struct?: CfwAclRuleSequenceOutputReference | CfwAclRuleSequence): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bottom: cdktf.numberToTerraform(struct!.bottom),
    dest_rule_id: cdktf.stringToTerraform(struct!.destRuleId),
    top: cdktf.numberToTerraform(struct!.top),
  }
}


export function cfwAclRuleSequenceToHclTerraform(struct?: CfwAclRuleSequenceOutputReference | CfwAclRuleSequence): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bottom: {
      value: cdktf.numberToHclTerraform(struct!.bottom),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    dest_rule_id: {
      value: cdktf.stringToHclTerraform(struct!.destRuleId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    top: {
      value: cdktf.numberToHclTerraform(struct!.top),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CfwAclRuleSequenceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CfwAclRuleSequence | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bottom !== undefined) {
      hasAnyValues = true;
      internalValueResult.bottom = this._bottom;
    }
    if (this._destRuleId !== undefined) {
      hasAnyValues = true;
      internalValueResult.destRuleId = this._destRuleId;
    }
    if (this._top !== undefined) {
      hasAnyValues = true;
      internalValueResult.top = this._top;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwAclRuleSequence | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bottom = undefined;
      this._destRuleId = undefined;
      this._top = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bottom = value.bottom;
      this._destRuleId = value.destRuleId;
      this._top = value.top;
    }
  }

  // bottom - computed: false, optional: true, required: false
  private _bottom?: number; 
  public get bottom() {
    return this.getNumberAttribute('bottom');
  }
  public set bottom(value: number) {
    this._bottom = value;
  }
  public resetBottom() {
    this._bottom = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bottomInput() {
    return this._bottom;
  }

  // dest_rule_id - computed: true, optional: true, required: false
  private _destRuleId?: string; 
  public get destRuleId() {
    return this.getStringAttribute('dest_rule_id');
  }
  public set destRuleId(value: string) {
    this._destRuleId = value;
  }
  public resetDestRuleId() {
    this._destRuleId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destRuleIdInput() {
    return this._destRuleId;
  }

  // top - computed: false, optional: true, required: false
  private _top?: number; 
  public get top() {
    return this.getNumberAttribute('top');
  }
  public set top(value: number) {
    this._top = value;
  }
  public resetTop() {
    this._top = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topInput() {
    return this._top;
  }
}
export interface CfwAclRuleSourceRegionListStruct {
  /**
  * The Chinese description of the region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#description_cn CfwAclRule#description_cn}
  */
  readonly descriptionCn?: string;
  /**
  * The English description of the region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#description_en CfwAclRule#description_en}
  */
  readonly descriptionEn?: string;
  /**
  * The region ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#region_id CfwAclRule#region_id}
  */
  readonly regionId: string;
  /**
  * The region type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#region_type CfwAclRule#region_type}
  */
  readonly regionType: number;
}

export function cfwAclRuleSourceRegionListStructToTerraform(struct?: CfwAclRuleSourceRegionListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description_cn: cdktf.stringToTerraform(struct!.descriptionCn),
    description_en: cdktf.stringToTerraform(struct!.descriptionEn),
    region_id: cdktf.stringToTerraform(struct!.regionId),
    region_type: cdktf.numberToTerraform(struct!.regionType),
  }
}


export function cfwAclRuleSourceRegionListStructToHclTerraform(struct?: CfwAclRuleSourceRegionListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description_cn: {
      value: cdktf.stringToHclTerraform(struct!.descriptionCn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    description_en: {
      value: cdktf.stringToHclTerraform(struct!.descriptionEn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region_id: {
      value: cdktf.stringToHclTerraform(struct!.regionId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region_type: {
      value: cdktf.numberToHclTerraform(struct!.regionType),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CfwAclRuleSourceRegionListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CfwAclRuleSourceRegionListStruct | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._descriptionCn !== undefined) {
      hasAnyValues = true;
      internalValueResult.descriptionCn = this._descriptionCn;
    }
    if (this._descriptionEn !== undefined) {
      hasAnyValues = true;
      internalValueResult.descriptionEn = this._descriptionEn;
    }
    if (this._regionId !== undefined) {
      hasAnyValues = true;
      internalValueResult.regionId = this._regionId;
    }
    if (this._regionType !== undefined) {
      hasAnyValues = true;
      internalValueResult.regionType = this._regionType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwAclRuleSourceRegionListStruct | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._descriptionCn = undefined;
      this._descriptionEn = undefined;
      this._regionId = undefined;
      this._regionType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._descriptionCn = value.descriptionCn;
      this._descriptionEn = value.descriptionEn;
      this._regionId = value.regionId;
      this._regionType = value.regionType;
    }
  }

  // description_cn - computed: false, optional: true, required: false
  private _descriptionCn?: string; 
  public get descriptionCn() {
    return this.getStringAttribute('description_cn');
  }
  public set descriptionCn(value: string) {
    this._descriptionCn = value;
  }
  public resetDescriptionCn() {
    this._descriptionCn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionCnInput() {
    return this._descriptionCn;
  }

  // description_en - computed: false, optional: true, required: false
  private _descriptionEn?: string; 
  public get descriptionEn() {
    return this.getStringAttribute('description_en');
  }
  public set descriptionEn(value: string) {
    this._descriptionEn = value;
  }
  public resetDescriptionEn() {
    this._descriptionEn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionEnInput() {
    return this._descriptionEn;
  }

  // region_id - computed: false, optional: false, required: true
  private _regionId?: string; 
  public get regionId() {
    return this.getStringAttribute('region_id');
  }
  public set regionId(value: string) {
    this._regionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionIdInput() {
    return this._regionId;
  }

  // region_type - computed: false, optional: false, required: true
  private _regionType?: number; 
  public get regionType() {
    return this.getNumberAttribute('region_type');
  }
  public set regionType(value: number) {
    this._regionType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionTypeInput() {
    return this._regionType;
  }
}

export class CfwAclRuleSourceRegionListStructList extends cdktf.ComplexList {
  public internalValue? : CfwAclRuleSourceRegionListStruct[] | cdktf.IResolvable

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
  public get(index: number): CfwAclRuleSourceRegionListStructOutputReference {
    return new CfwAclRuleSourceRegionListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule huaweicloud_cfw_acl_rule}
*/
export class CfwAclRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cfw_acl_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CfwAclRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CfwAclRule to import
  * @param importFromId The id of the existing CfwAclRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CfwAclRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cfw_acl_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_acl_rule huaweicloud_cfw_acl_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CfwAclRuleConfig
  */
  public constructor(scope: Construct, id: string, config: CfwAclRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cfw_acl_rule',
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
    this._actionType = config.actionType;
    this._addressType = config.addressType;
    this._description = config.description;
    this._destinationAddressGroups = config.destinationAddressGroups;
    this._destinationAddressType = config.destinationAddressType;
    this._destinationAddresses = config.destinationAddresses;
    this._destinationDomainAddressName = config.destinationDomainAddressName;
    this._destinationDomainGroupId = config.destinationDomainGroupId;
    this._destinationDomainGroupName = config.destinationDomainGroupName;
    this._destinationDomainGroupType = config.destinationDomainGroupType;
    this._direction = config.direction;
    this._enableForceNew = config.enableForceNew;
    this._id = config.id;
    this._longConnectEnable = config.longConnectEnable;
    this._longConnectTimeHour = config.longConnectTimeHour;
    this._longConnectTimeMinute = config.longConnectTimeMinute;
    this._longConnectTimeSecond = config.longConnectTimeSecond;
    this._name = config.name;
    this._objectId = config.objectId;
    this._region = config.region;
    this._ruleHitCount = config.ruleHitCount;
    this._sourceAddressGroups = config.sourceAddressGroups;
    this._sourceAddressType = config.sourceAddressType;
    this._sourceAddresses = config.sourceAddresses;
    this._sourcePredefinedGroups = config.sourcePredefinedGroups;
    this._status = config.status;
    this._tags = config.tags;
    this._type = config.type;
    this._customServiceGroups.internalValue = config.customServiceGroups;
    this._customServices.internalValue = config.customServices;
    this._destinationRegionList.internalValue = config.destinationRegionList;
    this._predefinedServiceGroups.internalValue = config.predefinedServiceGroups;
    this._sequence.internalValue = config.sequence;
    this._sourceRegionList.internalValue = config.sourceRegionList;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // action_type - computed: false, optional: false, required: true
  private _actionType?: number; 
  public get actionType() {
    return this.getNumberAttribute('action_type');
  }
  public set actionType(value: number) {
    this._actionType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionTypeInput() {
    return this._actionType;
  }

  // address_type - computed: false, optional: false, required: true
  private _addressType?: number; 
  public get addressType() {
    return this.getNumberAttribute('address_type');
  }
  public set addressType(value: number) {
    this._addressType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get addressTypeInput() {
    return this._addressType;
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

  // destination_address_groups - computed: false, optional: true, required: false
  private _destinationAddressGroups?: string[]; 
  public get destinationAddressGroups() {
    return this.getListAttribute('destination_address_groups');
  }
  public set destinationAddressGroups(value: string[]) {
    this._destinationAddressGroups = value;
  }
  public resetDestinationAddressGroups() {
    this._destinationAddressGroups = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationAddressGroupsInput() {
    return this._destinationAddressGroups;
  }

  // destination_address_type - computed: false, optional: true, required: false
  private _destinationAddressType?: number; 
  public get destinationAddressType() {
    return this.getNumberAttribute('destination_address_type');
  }
  public set destinationAddressType(value: number) {
    this._destinationAddressType = value;
  }
  public resetDestinationAddressType() {
    this._destinationAddressType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationAddressTypeInput() {
    return this._destinationAddressType;
  }

  // destination_addresses - computed: false, optional: true, required: false
  private _destinationAddresses?: string[]; 
  public get destinationAddresses() {
    return this.getListAttribute('destination_addresses');
  }
  public set destinationAddresses(value: string[]) {
    this._destinationAddresses = value;
  }
  public resetDestinationAddresses() {
    this._destinationAddresses = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationAddressesInput() {
    return this._destinationAddresses;
  }

  // destination_domain_address_name - computed: false, optional: true, required: false
  private _destinationDomainAddressName?: string; 
  public get destinationDomainAddressName() {
    return this.getStringAttribute('destination_domain_address_name');
  }
  public set destinationDomainAddressName(value: string) {
    this._destinationDomainAddressName = value;
  }
  public resetDestinationDomainAddressName() {
    this._destinationDomainAddressName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationDomainAddressNameInput() {
    return this._destinationDomainAddressName;
  }

  // destination_domain_group_id - computed: false, optional: true, required: false
  private _destinationDomainGroupId?: string; 
  public get destinationDomainGroupId() {
    return this.getStringAttribute('destination_domain_group_id');
  }
  public set destinationDomainGroupId(value: string) {
    this._destinationDomainGroupId = value;
  }
  public resetDestinationDomainGroupId() {
    this._destinationDomainGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationDomainGroupIdInput() {
    return this._destinationDomainGroupId;
  }

  // destination_domain_group_name - computed: false, optional: true, required: false
  private _destinationDomainGroupName?: string; 
  public get destinationDomainGroupName() {
    return this.getStringAttribute('destination_domain_group_name');
  }
  public set destinationDomainGroupName(value: string) {
    this._destinationDomainGroupName = value;
  }
  public resetDestinationDomainGroupName() {
    this._destinationDomainGroupName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationDomainGroupNameInput() {
    return this._destinationDomainGroupName;
  }

  // destination_domain_group_type - computed: false, optional: true, required: false
  private _destinationDomainGroupType?: number; 
  public get destinationDomainGroupType() {
    return this.getNumberAttribute('destination_domain_group_type');
  }
  public set destinationDomainGroupType(value: number) {
    this._destinationDomainGroupType = value;
  }
  public resetDestinationDomainGroupType() {
    this._destinationDomainGroupType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationDomainGroupTypeInput() {
    return this._destinationDomainGroupType;
  }

  // direction - computed: true, optional: true, required: false
  private _direction?: number; 
  public get direction() {
    return this.getNumberAttribute('direction');
  }
  public set direction(value: number) {
    this._direction = value;
  }
  public resetDirection() {
    this._direction = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get directionInput() {
    return this._direction;
  }

  // enable_force_new - computed: false, optional: true, required: false
  private _enableForceNew?: string; 
  public get enableForceNew() {
    return this.getStringAttribute('enable_force_new');
  }
  public set enableForceNew(value: string) {
    this._enableForceNew = value;
  }
  public resetEnableForceNew() {
    this._enableForceNew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableForceNewInput() {
    return this._enableForceNew;
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

  // long_connect_enable - computed: false, optional: false, required: true
  private _longConnectEnable?: number; 
  public get longConnectEnable() {
    return this.getNumberAttribute('long_connect_enable');
  }
  public set longConnectEnable(value: number) {
    this._longConnectEnable = value;
  }
  // Temporarily expose input value. Use with caution.
  public get longConnectEnableInput() {
    return this._longConnectEnable;
  }

  // long_connect_time_hour - computed: true, optional: true, required: false
  private _longConnectTimeHour?: number; 
  public get longConnectTimeHour() {
    return this.getNumberAttribute('long_connect_time_hour');
  }
  public set longConnectTimeHour(value: number) {
    this._longConnectTimeHour = value;
  }
  public resetLongConnectTimeHour() {
    this._longConnectTimeHour = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get longConnectTimeHourInput() {
    return this._longConnectTimeHour;
  }

  // long_connect_time_minute - computed: true, optional: true, required: false
  private _longConnectTimeMinute?: number; 
  public get longConnectTimeMinute() {
    return this.getNumberAttribute('long_connect_time_minute');
  }
  public set longConnectTimeMinute(value: number) {
    this._longConnectTimeMinute = value;
  }
  public resetLongConnectTimeMinute() {
    this._longConnectTimeMinute = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get longConnectTimeMinuteInput() {
    return this._longConnectTimeMinute;
  }

  // long_connect_time_second - computed: true, optional: true, required: false
  private _longConnectTimeSecond?: number; 
  public get longConnectTimeSecond() {
    return this.getNumberAttribute('long_connect_time_second');
  }
  public set longConnectTimeSecond(value: number) {
    this._longConnectTimeSecond = value;
  }
  public resetLongConnectTimeSecond() {
    this._longConnectTimeSecond = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get longConnectTimeSecondInput() {
    return this._longConnectTimeSecond;
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

  // object_id - computed: false, optional: false, required: true
  private _objectId?: string; 
  public get objectId() {
    return this.getStringAttribute('object_id');
  }
  public set objectId(value: string) {
    this._objectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get objectIdInput() {
    return this._objectId;
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

  // rule_hit_count - computed: true, optional: true, required: false
  private _ruleHitCount?: string; 
  public get ruleHitCount() {
    return this.getStringAttribute('rule_hit_count');
  }
  public set ruleHitCount(value: string) {
    this._ruleHitCount = value;
  }
  public resetRuleHitCount() {
    this._ruleHitCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleHitCountInput() {
    return this._ruleHitCount;
  }

  // source_address_groups - computed: false, optional: true, required: false
  private _sourceAddressGroups?: string[]; 
  public get sourceAddressGroups() {
    return this.getListAttribute('source_address_groups');
  }
  public set sourceAddressGroups(value: string[]) {
    this._sourceAddressGroups = value;
  }
  public resetSourceAddressGroups() {
    this._sourceAddressGroups = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceAddressGroupsInput() {
    return this._sourceAddressGroups;
  }

  // source_address_type - computed: false, optional: true, required: false
  private _sourceAddressType?: number; 
  public get sourceAddressType() {
    return this.getNumberAttribute('source_address_type');
  }
  public set sourceAddressType(value: number) {
    this._sourceAddressType = value;
  }
  public resetSourceAddressType() {
    this._sourceAddressType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceAddressTypeInput() {
    return this._sourceAddressType;
  }

  // source_addresses - computed: false, optional: true, required: false
  private _sourceAddresses?: string[]; 
  public get sourceAddresses() {
    return this.getListAttribute('source_addresses');
  }
  public set sourceAddresses(value: string[]) {
    this._sourceAddresses = value;
  }
  public resetSourceAddresses() {
    this._sourceAddresses = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceAddressesInput() {
    return this._sourceAddresses;
  }

  // source_predefined_groups - computed: false, optional: true, required: false
  private _sourcePredefinedGroups?: string[]; 
  public get sourcePredefinedGroups() {
    return this.getListAttribute('source_predefined_groups');
  }
  public set sourcePredefinedGroups(value: string[]) {
    this._sourcePredefinedGroups = value;
  }
  public resetSourcePredefinedGroups() {
    this._sourcePredefinedGroups = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourcePredefinedGroupsInput() {
    return this._sourcePredefinedGroups;
  }

  // status - computed: false, optional: false, required: true
  private _status?: number; 
  public get status() {
    return this.getNumberAttribute('status');
  }
  public set status(value: number) {
    this._status = value;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
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
  private _type?: number; 
  public get type() {
    return this.getNumberAttribute('type');
  }
  public set type(value: number) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // custom_service_groups - computed: false, optional: true, required: false
  private _customServiceGroups = new CfwAclRuleCustomServiceGroupsOutputReference(this, "custom_service_groups");
  public get customServiceGroups() {
    return this._customServiceGroups;
  }
  public putCustomServiceGroups(value: CfwAclRuleCustomServiceGroups) {
    this._customServiceGroups.internalValue = value;
  }
  public resetCustomServiceGroups() {
    this._customServiceGroups.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customServiceGroupsInput() {
    return this._customServiceGroups.internalValue;
  }

  // custom_services - computed: false, optional: true, required: false
  private _customServices = new CfwAclRuleCustomServicesList(this, "custom_services", false);
  public get customServices() {
    return this._customServices;
  }
  public putCustomServices(value: CfwAclRuleCustomServices[] | cdktf.IResolvable) {
    this._customServices.internalValue = value;
  }
  public resetCustomServices() {
    this._customServices.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customServicesInput() {
    return this._customServices.internalValue;
  }

  // destination_region_list - computed: false, optional: true, required: false
  private _destinationRegionList = new CfwAclRuleDestinationRegionListStructList(this, "destination_region_list", false);
  public get destinationRegionList() {
    return this._destinationRegionList;
  }
  public putDestinationRegionList(value: CfwAclRuleDestinationRegionListStruct[] | cdktf.IResolvable) {
    this._destinationRegionList.internalValue = value;
  }
  public resetDestinationRegionList() {
    this._destinationRegionList.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationRegionListInput() {
    return this._destinationRegionList.internalValue;
  }

  // predefined_service_groups - computed: false, optional: true, required: false
  private _predefinedServiceGroups = new CfwAclRulePredefinedServiceGroupsOutputReference(this, "predefined_service_groups");
  public get predefinedServiceGroups() {
    return this._predefinedServiceGroups;
  }
  public putPredefinedServiceGroups(value: CfwAclRulePredefinedServiceGroups) {
    this._predefinedServiceGroups.internalValue = value;
  }
  public resetPredefinedServiceGroups() {
    this._predefinedServiceGroups.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get predefinedServiceGroupsInput() {
    return this._predefinedServiceGroups.internalValue;
  }

  // sequence - computed: false, optional: false, required: true
  private _sequence = new CfwAclRuleSequenceOutputReference(this, "sequence");
  public get sequence() {
    return this._sequence;
  }
  public putSequence(value: CfwAclRuleSequence) {
    this._sequence.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sequenceInput() {
    return this._sequence.internalValue;
  }

  // source_region_list - computed: false, optional: true, required: false
  private _sourceRegionList = new CfwAclRuleSourceRegionListStructList(this, "source_region_list", false);
  public get sourceRegionList() {
    return this._sourceRegionList;
  }
  public putSourceRegionList(value: CfwAclRuleSourceRegionListStruct[] | cdktf.IResolvable) {
    this._sourceRegionList.internalValue = value;
  }
  public resetSourceRegionList() {
    this._sourceRegionList.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceRegionListInput() {
    return this._sourceRegionList.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      action_type: cdktf.numberToTerraform(this._actionType),
      address_type: cdktf.numberToTerraform(this._addressType),
      description: cdktf.stringToTerraform(this._description),
      destination_address_groups: cdktf.listMapper(cdktf.stringToTerraform, false)(this._destinationAddressGroups),
      destination_address_type: cdktf.numberToTerraform(this._destinationAddressType),
      destination_addresses: cdktf.listMapper(cdktf.stringToTerraform, false)(this._destinationAddresses),
      destination_domain_address_name: cdktf.stringToTerraform(this._destinationDomainAddressName),
      destination_domain_group_id: cdktf.stringToTerraform(this._destinationDomainGroupId),
      destination_domain_group_name: cdktf.stringToTerraform(this._destinationDomainGroupName),
      destination_domain_group_type: cdktf.numberToTerraform(this._destinationDomainGroupType),
      direction: cdktf.numberToTerraform(this._direction),
      enable_force_new: cdktf.stringToTerraform(this._enableForceNew),
      id: cdktf.stringToTerraform(this._id),
      long_connect_enable: cdktf.numberToTerraform(this._longConnectEnable),
      long_connect_time_hour: cdktf.numberToTerraform(this._longConnectTimeHour),
      long_connect_time_minute: cdktf.numberToTerraform(this._longConnectTimeMinute),
      long_connect_time_second: cdktf.numberToTerraform(this._longConnectTimeSecond),
      name: cdktf.stringToTerraform(this._name),
      object_id: cdktf.stringToTerraform(this._objectId),
      region: cdktf.stringToTerraform(this._region),
      rule_hit_count: cdktf.stringToTerraform(this._ruleHitCount),
      source_address_groups: cdktf.listMapper(cdktf.stringToTerraform, false)(this._sourceAddressGroups),
      source_address_type: cdktf.numberToTerraform(this._sourceAddressType),
      source_addresses: cdktf.listMapper(cdktf.stringToTerraform, false)(this._sourceAddresses),
      source_predefined_groups: cdktf.listMapper(cdktf.stringToTerraform, false)(this._sourcePredefinedGroups),
      status: cdktf.numberToTerraform(this._status),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      type: cdktf.numberToTerraform(this._type),
      custom_service_groups: cfwAclRuleCustomServiceGroupsToTerraform(this._customServiceGroups.internalValue),
      custom_services: cdktf.listMapper(cfwAclRuleCustomServicesToTerraform, true)(this._customServices.internalValue),
      destination_region_list: cdktf.listMapper(cfwAclRuleDestinationRegionListStructToTerraform, true)(this._destinationRegionList.internalValue),
      predefined_service_groups: cfwAclRulePredefinedServiceGroupsToTerraform(this._predefinedServiceGroups.internalValue),
      sequence: cfwAclRuleSequenceToTerraform(this._sequence.internalValue),
      source_region_list: cdktf.listMapper(cfwAclRuleSourceRegionListStructToTerraform, true)(this._sourceRegionList.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      action_type: {
        value: cdktf.numberToHclTerraform(this._actionType),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      address_type: {
        value: cdktf.numberToHclTerraform(this._addressType),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_address_groups: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._destinationAddressGroups),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      destination_address_type: {
        value: cdktf.numberToHclTerraform(this._destinationAddressType),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      destination_addresses: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._destinationAddresses),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      destination_domain_address_name: {
        value: cdktf.stringToHclTerraform(this._destinationDomainAddressName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_domain_group_id: {
        value: cdktf.stringToHclTerraform(this._destinationDomainGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_domain_group_name: {
        value: cdktf.stringToHclTerraform(this._destinationDomainGroupName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      destination_domain_group_type: {
        value: cdktf.numberToHclTerraform(this._destinationDomainGroupType),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      direction: {
        value: cdktf.numberToHclTerraform(this._direction),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      enable_force_new: {
        value: cdktf.stringToHclTerraform(this._enableForceNew),
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
      long_connect_enable: {
        value: cdktf.numberToHclTerraform(this._longConnectEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      long_connect_time_hour: {
        value: cdktf.numberToHclTerraform(this._longConnectTimeHour),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      long_connect_time_minute: {
        value: cdktf.numberToHclTerraform(this._longConnectTimeMinute),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      long_connect_time_second: {
        value: cdktf.numberToHclTerraform(this._longConnectTimeSecond),
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
      object_id: {
        value: cdktf.stringToHclTerraform(this._objectId),
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
      rule_hit_count: {
        value: cdktf.stringToHclTerraform(this._ruleHitCount),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      source_address_groups: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._sourceAddressGroups),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      source_address_type: {
        value: cdktf.numberToHclTerraform(this._sourceAddressType),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      source_addresses: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._sourceAddresses),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      source_predefined_groups: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._sourcePredefinedGroups),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      status: {
        value: cdktf.numberToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      type: {
        value: cdktf.numberToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      custom_service_groups: {
        value: cfwAclRuleCustomServiceGroupsToHclTerraform(this._customServiceGroups.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwAclRuleCustomServiceGroupsList",
      },
      custom_services: {
        value: cdktf.listMapperHcl(cfwAclRuleCustomServicesToHclTerraform, true)(this._customServices.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwAclRuleCustomServicesList",
      },
      destination_region_list: {
        value: cdktf.listMapperHcl(cfwAclRuleDestinationRegionListStructToHclTerraform, true)(this._destinationRegionList.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwAclRuleDestinationRegionListStructList",
      },
      predefined_service_groups: {
        value: cfwAclRulePredefinedServiceGroupsToHclTerraform(this._predefinedServiceGroups.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwAclRulePredefinedServiceGroupsList",
      },
      sequence: {
        value: cfwAclRuleSequenceToHclTerraform(this._sequence.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwAclRuleSequenceList",
      },
      source_region_list: {
        value: cdktf.listMapperHcl(cfwAclRuleSourceRegionListStructToHclTerraform, true)(this._sourceRegionList.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwAclRuleSourceRegionListStructList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

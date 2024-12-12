// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CfwProtectionRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * The action type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#action_type CfwProtectionRule#action_type}
  */
  readonly actionType: number;
  /**
  * The address type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address_type CfwProtectionRule#address_type}
  */
  readonly addressType: number;
  /**
  * The description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#description CfwProtectionRule#description}
  */
  readonly description?: string;
  /**
  * The direction.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#direction CfwProtectionRule#direction}
  */
  readonly direction?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#id CfwProtectionRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Whether to support persistent connections.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#long_connect_enable CfwProtectionRule#long_connect_enable}
  */
  readonly longConnectEnable: number;
  /**
  * The persistent connection duration (hour).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#long_connect_time_hour CfwProtectionRule#long_connect_time_hour}
  */
  readonly longConnectTimeHour?: number;
  /**
  * The persistent connection duration (minute).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#long_connect_time_minute CfwProtectionRule#long_connect_time_minute}
  */
  readonly longConnectTimeMinute?: number;
  /**
  * The persistent Connection Duration (second).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#long_connect_time_second CfwProtectionRule#long_connect_time_second}
  */
  readonly longConnectTimeSecond?: number;
  /**
  * The rule name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#name CfwProtectionRule#name}
  */
  readonly name: string;
  /**
  * The protected object ID
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#object_id CfwProtectionRule#object_id}
  */
  readonly objectId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#region CfwProtectionRule#region}
  */
  readonly region?: string;
  /**
  * The number of times the protection rule is hit.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#rule_hit_count CfwProtectionRule#rule_hit_count}
  */
  readonly ruleHitCount?: string;
  /**
  * The rule status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#status CfwProtectionRule#status}
  */
  readonly status: number;
  /**
  * The key/value pairs to associate with the protection rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#tags CfwProtectionRule#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * The rule type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#type CfwProtectionRule#type}
  */
  readonly type: number;
  /**
  * destination block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#destination CfwProtectionRule#destination}
  */
  readonly destination: CfwProtectionRuleDestination;
  /**
  * sequence block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#sequence CfwProtectionRule#sequence}
  */
  readonly sequence: CfwProtectionRuleSequence;
  /**
  * service block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#service CfwProtectionRule#service}
  */
  readonly service: CfwProtectionRuleService;
  /**
  * source block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#source CfwProtectionRule#source}
  */
  readonly source: CfwProtectionRuleSource;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#timeouts CfwProtectionRule#timeouts}
  */
  readonly timeouts?: CfwProtectionRuleTimeouts;
}
export interface CfwProtectionRuleDestinationRegionListStruct {
  /**
  * The Chinese description of the region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#description_cn CfwProtectionRule#description_cn}
  */
  readonly descriptionCn?: string;
  /**
  * The English description of the region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#description_en CfwProtectionRule#description_en}
  */
  readonly descriptionEn?: string;
  /**
  * The region ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#region_id CfwProtectionRule#region_id}
  */
  readonly regionId: string;
  /**
  * The region type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#region_type CfwProtectionRule#region_type}
  */
  readonly regionType: number;
}

export function cfwProtectionRuleDestinationRegionListStructToTerraform(struct?: CfwProtectionRuleDestinationRegionListStruct | cdktf.IResolvable): any {
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


export function cfwProtectionRuleDestinationRegionListStructToHclTerraform(struct?: CfwProtectionRuleDestinationRegionListStruct | cdktf.IResolvable): any {
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

export class CfwProtectionRuleDestinationRegionListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CfwProtectionRuleDestinationRegionListStruct | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CfwProtectionRuleDestinationRegionListStruct | cdktf.IResolvable | undefined) {
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

export class CfwProtectionRuleDestinationRegionListStructList extends cdktf.ComplexList {
  public internalValue? : CfwProtectionRuleDestinationRegionListStruct[] | cdktf.IResolvable

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
  public get(index: number): CfwProtectionRuleDestinationRegionListStructOutputReference {
    return new CfwProtectionRuleDestinationRegionListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CfwProtectionRuleDestination {
  /**
  * The IP address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address CfwProtectionRule#address}
  */
  readonly address?: string;
  /**
  * The address group list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address_group CfwProtectionRule#address_group}
  */
  readonly addressGroup?: string[];
  /**
  * The ID of the associated IP address group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address_set_id CfwProtectionRule#address_set_id}
  */
  readonly addressSetId?: string;
  /**
  * The IP address group name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address_set_name CfwProtectionRule#address_set_name}
  */
  readonly addressSetName?: string;
  /**
  * The address type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address_type CfwProtectionRule#address_type}
  */
  readonly addressType?: number;
  /**
  * The name of the domain name address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#domain_address_name CfwProtectionRule#domain_address_name}
  */
  readonly domainAddressName?: string;
  /**
  * The ID of the domain group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#domain_set_id CfwProtectionRule#domain_set_id}
  */
  readonly domainSetId?: string;
  /**
  * The name of domain group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#domain_set_name CfwProtectionRule#domain_set_name}
  */
  readonly domainSetName?: string;
  /**
  * The IP address list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#ip_address CfwProtectionRule#ip_address}
  */
  readonly ipAddress?: string[];
  /**
  * The Source type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#type CfwProtectionRule#type}
  */
  readonly type: number;
  /**
  * region_list block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#region_list CfwProtectionRule#region_list}
  */
  readonly regionList?: CfwProtectionRuleDestinationRegionListStruct[] | cdktf.IResolvable;
}

export function cfwProtectionRuleDestinationToTerraform(struct?: CfwProtectionRuleDestinationOutputReference | CfwProtectionRuleDestination): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    address: cdktf.stringToTerraform(struct!.address),
    address_group: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.addressGroup),
    address_set_id: cdktf.stringToTerraform(struct!.addressSetId),
    address_set_name: cdktf.stringToTerraform(struct!.addressSetName),
    address_type: cdktf.numberToTerraform(struct!.addressType),
    domain_address_name: cdktf.stringToTerraform(struct!.domainAddressName),
    domain_set_id: cdktf.stringToTerraform(struct!.domainSetId),
    domain_set_name: cdktf.stringToTerraform(struct!.domainSetName),
    ip_address: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.ipAddress),
    type: cdktf.numberToTerraform(struct!.type),
    region_list: cdktf.listMapper(cfwProtectionRuleDestinationRegionListStructToTerraform, true)(struct!.regionList),
  }
}


export function cfwProtectionRuleDestinationToHclTerraform(struct?: CfwProtectionRuleDestinationOutputReference | CfwProtectionRuleDestination): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    address: {
      value: cdktf.stringToHclTerraform(struct!.address),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    address_group: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.addressGroup),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    address_set_id: {
      value: cdktf.stringToHclTerraform(struct!.addressSetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    address_set_name: {
      value: cdktf.stringToHclTerraform(struct!.addressSetName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    address_type: {
      value: cdktf.numberToHclTerraform(struct!.addressType),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    domain_address_name: {
      value: cdktf.stringToHclTerraform(struct!.domainAddressName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    domain_set_id: {
      value: cdktf.stringToHclTerraform(struct!.domainSetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    domain_set_name: {
      value: cdktf.stringToHclTerraform(struct!.domainSetName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ip_address: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.ipAddress),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    type: {
      value: cdktf.numberToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    region_list: {
      value: cdktf.listMapperHcl(cfwProtectionRuleDestinationRegionListStructToHclTerraform, true)(struct!.regionList),
      isBlock: true,
      type: "list",
      storageClassType: "CfwProtectionRuleDestinationRegionListStructList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CfwProtectionRuleDestinationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CfwProtectionRuleDestination | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._address !== undefined) {
      hasAnyValues = true;
      internalValueResult.address = this._address;
    }
    if (this._addressGroup !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressGroup = this._addressGroup;
    }
    if (this._addressSetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressSetId = this._addressSetId;
    }
    if (this._addressSetName !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressSetName = this._addressSetName;
    }
    if (this._addressType !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressType = this._addressType;
    }
    if (this._domainAddressName !== undefined) {
      hasAnyValues = true;
      internalValueResult.domainAddressName = this._domainAddressName;
    }
    if (this._domainSetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.domainSetId = this._domainSetId;
    }
    if (this._domainSetName !== undefined) {
      hasAnyValues = true;
      internalValueResult.domainSetName = this._domainSetName;
    }
    if (this._ipAddress !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipAddress = this._ipAddress;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._regionList?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.regionList = this._regionList?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwProtectionRuleDestination | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._address = undefined;
      this._addressGroup = undefined;
      this._addressSetId = undefined;
      this._addressSetName = undefined;
      this._addressType = undefined;
      this._domainAddressName = undefined;
      this._domainSetId = undefined;
      this._domainSetName = undefined;
      this._ipAddress = undefined;
      this._type = undefined;
      this._regionList.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._address = value.address;
      this._addressGroup = value.addressGroup;
      this._addressSetId = value.addressSetId;
      this._addressSetName = value.addressSetName;
      this._addressType = value.addressType;
      this._domainAddressName = value.domainAddressName;
      this._domainSetId = value.domainSetId;
      this._domainSetName = value.domainSetName;
      this._ipAddress = value.ipAddress;
      this._type = value.type;
      this._regionList.internalValue = value.regionList;
    }
  }

  // address - computed: false, optional: true, required: false
  private _address?: string; 
  public get address() {
    return this.getStringAttribute('address');
  }
  public set address(value: string) {
    this._address = value;
  }
  public resetAddress() {
    this._address = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressInput() {
    return this._address;
  }

  // address_group - computed: false, optional: true, required: false
  private _addressGroup?: string[]; 
  public get addressGroup() {
    return this.getListAttribute('address_group');
  }
  public set addressGroup(value: string[]) {
    this._addressGroup = value;
  }
  public resetAddressGroup() {
    this._addressGroup = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressGroupInput() {
    return this._addressGroup;
  }

  // address_set_id - computed: false, optional: true, required: false
  private _addressSetId?: string; 
  public get addressSetId() {
    return this.getStringAttribute('address_set_id');
  }
  public set addressSetId(value: string) {
    this._addressSetId = value;
  }
  public resetAddressSetId() {
    this._addressSetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressSetIdInput() {
    return this._addressSetId;
  }

  // address_set_name - computed: false, optional: true, required: false
  private _addressSetName?: string; 
  public get addressSetName() {
    return this.getStringAttribute('address_set_name');
  }
  public set addressSetName(value: string) {
    this._addressSetName = value;
  }
  public resetAddressSetName() {
    this._addressSetName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressSetNameInput() {
    return this._addressSetName;
  }

  // address_type - computed: false, optional: true, required: false
  private _addressType?: number; 
  public get addressType() {
    return this.getNumberAttribute('address_type');
  }
  public set addressType(value: number) {
    this._addressType = value;
  }
  public resetAddressType() {
    this._addressType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressTypeInput() {
    return this._addressType;
  }

  // domain_address_name - computed: false, optional: true, required: false
  private _domainAddressName?: string; 
  public get domainAddressName() {
    return this.getStringAttribute('domain_address_name');
  }
  public set domainAddressName(value: string) {
    this._domainAddressName = value;
  }
  public resetDomainAddressName() {
    this._domainAddressName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainAddressNameInput() {
    return this._domainAddressName;
  }

  // domain_set_id - computed: false, optional: true, required: false
  private _domainSetId?: string; 
  public get domainSetId() {
    return this.getStringAttribute('domain_set_id');
  }
  public set domainSetId(value: string) {
    this._domainSetId = value;
  }
  public resetDomainSetId() {
    this._domainSetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainSetIdInput() {
    return this._domainSetId;
  }

  // domain_set_name - computed: false, optional: true, required: false
  private _domainSetName?: string; 
  public get domainSetName() {
    return this.getStringAttribute('domain_set_name');
  }
  public set domainSetName(value: string) {
    this._domainSetName = value;
  }
  public resetDomainSetName() {
    this._domainSetName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainSetNameInput() {
    return this._domainSetName;
  }

  // ip_address - computed: false, optional: true, required: false
  private _ipAddress?: string[]; 
  public get ipAddress() {
    return this.getListAttribute('ip_address');
  }
  public set ipAddress(value: string[]) {
    this._ipAddress = value;
  }
  public resetIpAddress() {
    this._ipAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipAddressInput() {
    return this._ipAddress;
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

  // region_list - computed: false, optional: true, required: false
  private _regionList = new CfwProtectionRuleDestinationRegionListStructList(this, "region_list", false);
  public get regionList() {
    return this._regionList;
  }
  public putRegionList(value: CfwProtectionRuleDestinationRegionListStruct[] | cdktf.IResolvable) {
    this._regionList.internalValue = value;
  }
  public resetRegionList() {
    this._regionList.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get regionListInput() {
    return this._regionList.internalValue;
  }
}
export interface CfwProtectionRuleSequence {
  /**
  * The ID of the rule that the added rule will follow.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#dest_rule_id CfwProtectionRule#dest_rule_id}
  */
  readonly destRuleId?: string;
  /**
  * Whether to pin on top.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#top CfwProtectionRule#top}
  */
  readonly top?: number;
}

export function cfwProtectionRuleSequenceToTerraform(struct?: CfwProtectionRuleSequenceOutputReference | CfwProtectionRuleSequence): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dest_rule_id: cdktf.stringToTerraform(struct!.destRuleId),
    top: cdktf.numberToTerraform(struct!.top),
  }
}


export function cfwProtectionRuleSequenceToHclTerraform(struct?: CfwProtectionRuleSequenceOutputReference | CfwProtectionRuleSequence): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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

export class CfwProtectionRuleSequenceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CfwProtectionRuleSequence | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
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

  public set internalValue(value: CfwProtectionRuleSequence | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._destRuleId = undefined;
      this._top = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._destRuleId = value.destRuleId;
      this._top = value.top;
    }
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

  // top - computed: true, optional: true, required: false
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
export interface CfwProtectionRuleServiceCustomService {
  /**
  * The destination port.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#dest_port CfwProtectionRule#dest_port}
  */
  readonly destPort: string;
  /**
  * The protocol type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#protocol CfwProtectionRule#protocol}
  */
  readonly protocol: number;
  /**
  * The source port.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#source_port CfwProtectionRule#source_port}
  */
  readonly sourcePort: string;
}

export function cfwProtectionRuleServiceCustomServiceToTerraform(struct?: CfwProtectionRuleServiceCustomService | cdktf.IResolvable): any {
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


export function cfwProtectionRuleServiceCustomServiceToHclTerraform(struct?: CfwProtectionRuleServiceCustomService | cdktf.IResolvable): any {
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

export class CfwProtectionRuleServiceCustomServiceOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CfwProtectionRuleServiceCustomService | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CfwProtectionRuleServiceCustomService | cdktf.IResolvable | undefined) {
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

export class CfwProtectionRuleServiceCustomServiceList extends cdktf.ComplexList {
  public internalValue? : CfwProtectionRuleServiceCustomService[] | cdktf.IResolvable

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
  public get(index: number): CfwProtectionRuleServiceCustomServiceOutputReference {
    return new CfwProtectionRuleServiceCustomServiceOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CfwProtectionRuleService {
  /**
  * The destination port.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#dest_port CfwProtectionRule#dest_port}
  */
  readonly destPort?: string;
  /**
  * The protocol type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#protocol CfwProtectionRule#protocol}
  */
  readonly protocol?: number;
  /**
  * The service group list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#service_group CfwProtectionRule#service_group}
  */
  readonly serviceGroup?: string[];
  /**
  * The service group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#service_set_id CfwProtectionRule#service_set_id}
  */
  readonly serviceSetId?: string;
  /**
  * The service group name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#service_set_name CfwProtectionRule#service_set_name}
  */
  readonly serviceSetName?: string;
  /**
  * The source port.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#source_port CfwProtectionRule#source_port}
  */
  readonly sourcePort?: string;
  /**
  * The service input type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#type CfwProtectionRule#type}
  */
  readonly type: number;
  /**
  * custom_service block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#custom_service CfwProtectionRule#custom_service}
  */
  readonly customService?: CfwProtectionRuleServiceCustomService[] | cdktf.IResolvable;
}

export function cfwProtectionRuleServiceToTerraform(struct?: CfwProtectionRuleServiceOutputReference | CfwProtectionRuleService): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dest_port: cdktf.stringToTerraform(struct!.destPort),
    protocol: cdktf.numberToTerraform(struct!.protocol),
    service_group: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.serviceGroup),
    service_set_id: cdktf.stringToTerraform(struct!.serviceSetId),
    service_set_name: cdktf.stringToTerraform(struct!.serviceSetName),
    source_port: cdktf.stringToTerraform(struct!.sourcePort),
    type: cdktf.numberToTerraform(struct!.type),
    custom_service: cdktf.listMapper(cfwProtectionRuleServiceCustomServiceToTerraform, true)(struct!.customService),
  }
}


export function cfwProtectionRuleServiceToHclTerraform(struct?: CfwProtectionRuleServiceOutputReference | CfwProtectionRuleService): any {
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
    service_group: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.serviceGroup),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    service_set_id: {
      value: cdktf.stringToHclTerraform(struct!.serviceSetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    service_set_name: {
      value: cdktf.stringToHclTerraform(struct!.serviceSetName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_port: {
      value: cdktf.stringToHclTerraform(struct!.sourcePort),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.numberToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    custom_service: {
      value: cdktf.listMapperHcl(cfwProtectionRuleServiceCustomServiceToHclTerraform, true)(struct!.customService),
      isBlock: true,
      type: "list",
      storageClassType: "CfwProtectionRuleServiceCustomServiceList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CfwProtectionRuleServiceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CfwProtectionRuleService | undefined {
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
    if (this._serviceGroup !== undefined) {
      hasAnyValues = true;
      internalValueResult.serviceGroup = this._serviceGroup;
    }
    if (this._serviceSetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.serviceSetId = this._serviceSetId;
    }
    if (this._serviceSetName !== undefined) {
      hasAnyValues = true;
      internalValueResult.serviceSetName = this._serviceSetName;
    }
    if (this._sourcePort !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourcePort = this._sourcePort;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._customService?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.customService = this._customService?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwProtectionRuleService | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._destPort = undefined;
      this._protocol = undefined;
      this._serviceGroup = undefined;
      this._serviceSetId = undefined;
      this._serviceSetName = undefined;
      this._sourcePort = undefined;
      this._type = undefined;
      this._customService.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._destPort = value.destPort;
      this._protocol = value.protocol;
      this._serviceGroup = value.serviceGroup;
      this._serviceSetId = value.serviceSetId;
      this._serviceSetName = value.serviceSetName;
      this._sourcePort = value.sourcePort;
      this._type = value.type;
      this._customService.internalValue = value.customService;
    }
  }

  // dest_port - computed: false, optional: true, required: false
  private _destPort?: string; 
  public get destPort() {
    return this.getStringAttribute('dest_port');
  }
  public set destPort(value: string) {
    this._destPort = value;
  }
  public resetDestPort() {
    this._destPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destPortInput() {
    return this._destPort;
  }

  // protocol - computed: false, optional: true, required: false
  private _protocol?: number; 
  public get protocol() {
    return this.getNumberAttribute('protocol');
  }
  public set protocol(value: number) {
    this._protocol = value;
  }
  public resetProtocol() {
    this._protocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }

  // service_group - computed: false, optional: true, required: false
  private _serviceGroup?: string[]; 
  public get serviceGroup() {
    return this.getListAttribute('service_group');
  }
  public set serviceGroup(value: string[]) {
    this._serviceGroup = value;
  }
  public resetServiceGroup() {
    this._serviceGroup = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceGroupInput() {
    return this._serviceGroup;
  }

  // service_set_id - computed: false, optional: true, required: false
  private _serviceSetId?: string; 
  public get serviceSetId() {
    return this.getStringAttribute('service_set_id');
  }
  public set serviceSetId(value: string) {
    this._serviceSetId = value;
  }
  public resetServiceSetId() {
    this._serviceSetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceSetIdInput() {
    return this._serviceSetId;
  }

  // service_set_name - computed: false, optional: true, required: false
  private _serviceSetName?: string; 
  public get serviceSetName() {
    return this.getStringAttribute('service_set_name');
  }
  public set serviceSetName(value: string) {
    this._serviceSetName = value;
  }
  public resetServiceSetName() {
    this._serviceSetName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceSetNameInput() {
    return this._serviceSetName;
  }

  // source_port - computed: false, optional: true, required: false
  private _sourcePort?: string; 
  public get sourcePort() {
    return this.getStringAttribute('source_port');
  }
  public set sourcePort(value: string) {
    this._sourcePort = value;
  }
  public resetSourcePort() {
    this._sourcePort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourcePortInput() {
    return this._sourcePort;
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

  // custom_service - computed: false, optional: true, required: false
  private _customService = new CfwProtectionRuleServiceCustomServiceList(this, "custom_service", false);
  public get customService() {
    return this._customService;
  }
  public putCustomService(value: CfwProtectionRuleServiceCustomService[] | cdktf.IResolvable) {
    this._customService.internalValue = value;
  }
  public resetCustomService() {
    this._customService.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customServiceInput() {
    return this._customService.internalValue;
  }
}
export interface CfwProtectionRuleSourceRegionListStruct {
  /**
  * The Chinese description of the region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#description_cn CfwProtectionRule#description_cn}
  */
  readonly descriptionCn?: string;
  /**
  * The English description of the region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#description_en CfwProtectionRule#description_en}
  */
  readonly descriptionEn?: string;
  /**
  * The region ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#region_id CfwProtectionRule#region_id}
  */
  readonly regionId: string;
  /**
  * The region type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#region_type CfwProtectionRule#region_type}
  */
  readonly regionType: number;
}

export function cfwProtectionRuleSourceRegionListStructToTerraform(struct?: CfwProtectionRuleSourceRegionListStruct | cdktf.IResolvable): any {
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


export function cfwProtectionRuleSourceRegionListStructToHclTerraform(struct?: CfwProtectionRuleSourceRegionListStruct | cdktf.IResolvable): any {
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

export class CfwProtectionRuleSourceRegionListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CfwProtectionRuleSourceRegionListStruct | cdktf.IResolvable | undefined {
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

  public set internalValue(value: CfwProtectionRuleSourceRegionListStruct | cdktf.IResolvable | undefined) {
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

export class CfwProtectionRuleSourceRegionListStructList extends cdktf.ComplexList {
  public internalValue? : CfwProtectionRuleSourceRegionListStruct[] | cdktf.IResolvable

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
  public get(index: number): CfwProtectionRuleSourceRegionListStructOutputReference {
    return new CfwProtectionRuleSourceRegionListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface CfwProtectionRuleSource {
  /**
  * The IP address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address CfwProtectionRule#address}
  */
  readonly address?: string;
  /**
  * The address group list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address_group CfwProtectionRule#address_group}
  */
  readonly addressGroup?: string[];
  /**
  * The ID of the associated IP address group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address_set_id CfwProtectionRule#address_set_id}
  */
  readonly addressSetId?: string;
  /**
  * The IP address group name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address_set_name CfwProtectionRule#address_set_name}
  */
  readonly addressSetName?: string;
  /**
  * The address type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#address_type CfwProtectionRule#address_type}
  */
  readonly addressType?: number;
  /**
  * The name of the domain name address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#domain_address_name CfwProtectionRule#domain_address_name}
  */
  readonly domainAddressName?: string;
  /**
  * The ID of the domain group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#domain_set_id CfwProtectionRule#domain_set_id}
  */
  readonly domainSetId?: string;
  /**
  * The name of domain group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#domain_set_name CfwProtectionRule#domain_set_name}
  */
  readonly domainSetName?: string;
  /**
  * The IP address list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#ip_address CfwProtectionRule#ip_address}
  */
  readonly ipAddress?: string[];
  /**
  * The Source type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#type CfwProtectionRule#type}
  */
  readonly type: number;
  /**
  * region_list block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#region_list CfwProtectionRule#region_list}
  */
  readonly regionList?: CfwProtectionRuleSourceRegionListStruct[] | cdktf.IResolvable;
}

export function cfwProtectionRuleSourceToTerraform(struct?: CfwProtectionRuleSourceOutputReference | CfwProtectionRuleSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    address: cdktf.stringToTerraform(struct!.address),
    address_group: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.addressGroup),
    address_set_id: cdktf.stringToTerraform(struct!.addressSetId),
    address_set_name: cdktf.stringToTerraform(struct!.addressSetName),
    address_type: cdktf.numberToTerraform(struct!.addressType),
    domain_address_name: cdktf.stringToTerraform(struct!.domainAddressName),
    domain_set_id: cdktf.stringToTerraform(struct!.domainSetId),
    domain_set_name: cdktf.stringToTerraform(struct!.domainSetName),
    ip_address: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.ipAddress),
    type: cdktf.numberToTerraform(struct!.type),
    region_list: cdktf.listMapper(cfwProtectionRuleSourceRegionListStructToTerraform, true)(struct!.regionList),
  }
}


export function cfwProtectionRuleSourceToHclTerraform(struct?: CfwProtectionRuleSourceOutputReference | CfwProtectionRuleSource): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    address: {
      value: cdktf.stringToHclTerraform(struct!.address),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    address_group: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.addressGroup),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    address_set_id: {
      value: cdktf.stringToHclTerraform(struct!.addressSetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    address_set_name: {
      value: cdktf.stringToHclTerraform(struct!.addressSetName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    address_type: {
      value: cdktf.numberToHclTerraform(struct!.addressType),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    domain_address_name: {
      value: cdktf.stringToHclTerraform(struct!.domainAddressName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    domain_set_id: {
      value: cdktf.stringToHclTerraform(struct!.domainSetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    domain_set_name: {
      value: cdktf.stringToHclTerraform(struct!.domainSetName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ip_address: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.ipAddress),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    type: {
      value: cdktf.numberToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    region_list: {
      value: cdktf.listMapperHcl(cfwProtectionRuleSourceRegionListStructToHclTerraform, true)(struct!.regionList),
      isBlock: true,
      type: "list",
      storageClassType: "CfwProtectionRuleSourceRegionListStructList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CfwProtectionRuleSourceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): CfwProtectionRuleSource | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._address !== undefined) {
      hasAnyValues = true;
      internalValueResult.address = this._address;
    }
    if (this._addressGroup !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressGroup = this._addressGroup;
    }
    if (this._addressSetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressSetId = this._addressSetId;
    }
    if (this._addressSetName !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressSetName = this._addressSetName;
    }
    if (this._addressType !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressType = this._addressType;
    }
    if (this._domainAddressName !== undefined) {
      hasAnyValues = true;
      internalValueResult.domainAddressName = this._domainAddressName;
    }
    if (this._domainSetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.domainSetId = this._domainSetId;
    }
    if (this._domainSetName !== undefined) {
      hasAnyValues = true;
      internalValueResult.domainSetName = this._domainSetName;
    }
    if (this._ipAddress !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipAddress = this._ipAddress;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._regionList?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.regionList = this._regionList?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwProtectionRuleSource | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._address = undefined;
      this._addressGroup = undefined;
      this._addressSetId = undefined;
      this._addressSetName = undefined;
      this._addressType = undefined;
      this._domainAddressName = undefined;
      this._domainSetId = undefined;
      this._domainSetName = undefined;
      this._ipAddress = undefined;
      this._type = undefined;
      this._regionList.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._address = value.address;
      this._addressGroup = value.addressGroup;
      this._addressSetId = value.addressSetId;
      this._addressSetName = value.addressSetName;
      this._addressType = value.addressType;
      this._domainAddressName = value.domainAddressName;
      this._domainSetId = value.domainSetId;
      this._domainSetName = value.domainSetName;
      this._ipAddress = value.ipAddress;
      this._type = value.type;
      this._regionList.internalValue = value.regionList;
    }
  }

  // address - computed: false, optional: true, required: false
  private _address?: string; 
  public get address() {
    return this.getStringAttribute('address');
  }
  public set address(value: string) {
    this._address = value;
  }
  public resetAddress() {
    this._address = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressInput() {
    return this._address;
  }

  // address_group - computed: false, optional: true, required: false
  private _addressGroup?: string[]; 
  public get addressGroup() {
    return this.getListAttribute('address_group');
  }
  public set addressGroup(value: string[]) {
    this._addressGroup = value;
  }
  public resetAddressGroup() {
    this._addressGroup = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressGroupInput() {
    return this._addressGroup;
  }

  // address_set_id - computed: false, optional: true, required: false
  private _addressSetId?: string; 
  public get addressSetId() {
    return this.getStringAttribute('address_set_id');
  }
  public set addressSetId(value: string) {
    this._addressSetId = value;
  }
  public resetAddressSetId() {
    this._addressSetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressSetIdInput() {
    return this._addressSetId;
  }

  // address_set_name - computed: false, optional: true, required: false
  private _addressSetName?: string; 
  public get addressSetName() {
    return this.getStringAttribute('address_set_name');
  }
  public set addressSetName(value: string) {
    this._addressSetName = value;
  }
  public resetAddressSetName() {
    this._addressSetName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressSetNameInput() {
    return this._addressSetName;
  }

  // address_type - computed: false, optional: true, required: false
  private _addressType?: number; 
  public get addressType() {
    return this.getNumberAttribute('address_type');
  }
  public set addressType(value: number) {
    this._addressType = value;
  }
  public resetAddressType() {
    this._addressType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressTypeInput() {
    return this._addressType;
  }

  // domain_address_name - computed: false, optional: true, required: false
  private _domainAddressName?: string; 
  public get domainAddressName() {
    return this.getStringAttribute('domain_address_name');
  }
  public set domainAddressName(value: string) {
    this._domainAddressName = value;
  }
  public resetDomainAddressName() {
    this._domainAddressName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainAddressNameInput() {
    return this._domainAddressName;
  }

  // domain_set_id - computed: false, optional: true, required: false
  private _domainSetId?: string; 
  public get domainSetId() {
    return this.getStringAttribute('domain_set_id');
  }
  public set domainSetId(value: string) {
    this._domainSetId = value;
  }
  public resetDomainSetId() {
    this._domainSetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainSetIdInput() {
    return this._domainSetId;
  }

  // domain_set_name - computed: false, optional: true, required: false
  private _domainSetName?: string; 
  public get domainSetName() {
    return this.getStringAttribute('domain_set_name');
  }
  public set domainSetName(value: string) {
    this._domainSetName = value;
  }
  public resetDomainSetName() {
    this._domainSetName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainSetNameInput() {
    return this._domainSetName;
  }

  // ip_address - computed: false, optional: true, required: false
  private _ipAddress?: string[]; 
  public get ipAddress() {
    return this.getListAttribute('ip_address');
  }
  public set ipAddress(value: string[]) {
    this._ipAddress = value;
  }
  public resetIpAddress() {
    this._ipAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipAddressInput() {
    return this._ipAddress;
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

  // region_list - computed: false, optional: true, required: false
  private _regionList = new CfwProtectionRuleSourceRegionListStructList(this, "region_list", false);
  public get regionList() {
    return this._regionList;
  }
  public putRegionList(value: CfwProtectionRuleSourceRegionListStruct[] | cdktf.IResolvable) {
    this._regionList.internalValue = value;
  }
  public resetRegionList() {
    this._regionList.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get regionListInput() {
    return this._regionList.internalValue;
  }
}
export interface CfwProtectionRuleTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#delete CfwProtectionRule#delete}
  */
  readonly delete?: string;
}

export function cfwProtectionRuleTimeoutsToTerraform(struct?: CfwProtectionRuleTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function cfwProtectionRuleTimeoutsToHclTerraform(struct?: CfwProtectionRuleTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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

export class CfwProtectionRuleTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CfwProtectionRuleTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CfwProtectionRuleTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._delete = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._delete = value.delete;
    }
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule huaweicloud_cfw_protection_rule}
*/
export class CfwProtectionRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cfw_protection_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CfwProtectionRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CfwProtectionRule to import
  * @param importFromId The id of the existing CfwProtectionRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CfwProtectionRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cfw_protection_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cfw_protection_rule huaweicloud_cfw_protection_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CfwProtectionRuleConfig
  */
  public constructor(scope: Construct, id: string, config: CfwProtectionRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cfw_protection_rule',
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
    this._direction = config.direction;
    this._id = config.id;
    this._longConnectEnable = config.longConnectEnable;
    this._longConnectTimeHour = config.longConnectTimeHour;
    this._longConnectTimeMinute = config.longConnectTimeMinute;
    this._longConnectTimeSecond = config.longConnectTimeSecond;
    this._name = config.name;
    this._objectId = config.objectId;
    this._region = config.region;
    this._ruleHitCount = config.ruleHitCount;
    this._status = config.status;
    this._tags = config.tags;
    this._type = config.type;
    this._destination.internalValue = config.destination;
    this._sequence.internalValue = config.sequence;
    this._service.internalValue = config.service;
    this._source.internalValue = config.source;
    this._timeouts.internalValue = config.timeouts;
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

  // destination - computed: false, optional: false, required: true
  private _destination = new CfwProtectionRuleDestinationOutputReference(this, "destination");
  public get destination() {
    return this._destination;
  }
  public putDestination(value: CfwProtectionRuleDestination) {
    this._destination.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationInput() {
    return this._destination.internalValue;
  }

  // sequence - computed: false, optional: false, required: true
  private _sequence = new CfwProtectionRuleSequenceOutputReference(this, "sequence");
  public get sequence() {
    return this._sequence;
  }
  public putSequence(value: CfwProtectionRuleSequence) {
    this._sequence.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sequenceInput() {
    return this._sequence.internalValue;
  }

  // service - computed: false, optional: false, required: true
  private _service = new CfwProtectionRuleServiceOutputReference(this, "service");
  public get service() {
    return this._service;
  }
  public putService(value: CfwProtectionRuleService) {
    this._service.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceInput() {
    return this._service.internalValue;
  }

  // source - computed: false, optional: false, required: true
  private _source = new CfwProtectionRuleSourceOutputReference(this, "source");
  public get source() {
    return this._source;
  }
  public putSource(value: CfwProtectionRuleSource) {
    this._source.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceInput() {
    return this._source.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CfwProtectionRuleTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CfwProtectionRuleTimeouts) {
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
      action_type: cdktf.numberToTerraform(this._actionType),
      address_type: cdktf.numberToTerraform(this._addressType),
      description: cdktf.stringToTerraform(this._description),
      direction: cdktf.numberToTerraform(this._direction),
      id: cdktf.stringToTerraform(this._id),
      long_connect_enable: cdktf.numberToTerraform(this._longConnectEnable),
      long_connect_time_hour: cdktf.numberToTerraform(this._longConnectTimeHour),
      long_connect_time_minute: cdktf.numberToTerraform(this._longConnectTimeMinute),
      long_connect_time_second: cdktf.numberToTerraform(this._longConnectTimeSecond),
      name: cdktf.stringToTerraform(this._name),
      object_id: cdktf.stringToTerraform(this._objectId),
      region: cdktf.stringToTerraform(this._region),
      rule_hit_count: cdktf.stringToTerraform(this._ruleHitCount),
      status: cdktf.numberToTerraform(this._status),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      type: cdktf.numberToTerraform(this._type),
      destination: cfwProtectionRuleDestinationToTerraform(this._destination.internalValue),
      sequence: cfwProtectionRuleSequenceToTerraform(this._sequence.internalValue),
      service: cfwProtectionRuleServiceToTerraform(this._service.internalValue),
      source: cfwProtectionRuleSourceToTerraform(this._source.internalValue),
      timeouts: cfwProtectionRuleTimeoutsToTerraform(this._timeouts.internalValue),
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
      direction: {
        value: cdktf.numberToHclTerraform(this._direction),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      destination: {
        value: cfwProtectionRuleDestinationToHclTerraform(this._destination.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwProtectionRuleDestinationList",
      },
      sequence: {
        value: cfwProtectionRuleSequenceToHclTerraform(this._sequence.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwProtectionRuleSequenceList",
      },
      service: {
        value: cfwProtectionRuleServiceToHclTerraform(this._service.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwProtectionRuleServiceList",
      },
      source: {
        value: cfwProtectionRuleSourceToHclTerraform(this._source.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CfwProtectionRuleSourceList",
      },
      timeouts: {
        value: cfwProtectionRuleTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CfwProtectionRuleTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

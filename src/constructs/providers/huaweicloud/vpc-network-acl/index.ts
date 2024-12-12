// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpcNetworkAclConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#description VpcNetworkAcl#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#enabled VpcNetworkAcl#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#enterprise_project_id VpcNetworkAcl#enterprise_project_id}
  */
  readonly enterpriseProjectId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#id VpcNetworkAcl#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#name VpcNetworkAcl#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#region VpcNetworkAcl#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#tags VpcNetworkAcl#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * associated_subnets block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#associated_subnets VpcNetworkAcl#associated_subnets}
  */
  readonly associatedSubnets?: VpcNetworkAclAssociatedSubnets[] | cdktf.IResolvable;
  /**
  * egress_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#egress_rules VpcNetworkAcl#egress_rules}
  */
  readonly egressRules?: VpcNetworkAclEgressRules[] | cdktf.IResolvable;
  /**
  * ingress_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#ingress_rules VpcNetworkAcl#ingress_rules}
  */
  readonly ingressRules?: VpcNetworkAclIngressRules[] | cdktf.IResolvable;
}
export interface VpcNetworkAclAssociatedSubnets {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#subnet_id VpcNetworkAcl#subnet_id}
  */
  readonly subnetId: string;
}

export function vpcNetworkAclAssociatedSubnetsToTerraform(struct?: VpcNetworkAclAssociatedSubnets | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    subnet_id: cdktf.stringToTerraform(struct!.subnetId),
  }
}


export function vpcNetworkAclAssociatedSubnetsToHclTerraform(struct?: VpcNetworkAclAssociatedSubnets | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    subnet_id: {
      value: cdktf.stringToHclTerraform(struct!.subnetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpcNetworkAclAssociatedSubnetsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): VpcNetworkAclAssociatedSubnets | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._subnetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.subnetId = this._subnetId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpcNetworkAclAssociatedSubnets | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._subnetId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._subnetId = value.subnetId;
    }
  }

  // subnet_id - computed: false, optional: false, required: true
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
  }
}

export class VpcNetworkAclAssociatedSubnetsList extends cdktf.ComplexList {
  public internalValue? : VpcNetworkAclAssociatedSubnets[] | cdktf.IResolvable

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
  public get(index: number): VpcNetworkAclAssociatedSubnetsOutputReference {
    return new VpcNetworkAclAssociatedSubnetsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface VpcNetworkAclEgressRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#action VpcNetworkAcl#action}
  */
  readonly action: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#description VpcNetworkAcl#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#destination_ip_address VpcNetworkAcl#destination_ip_address}
  */
  readonly destinationIpAddress?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#destination_ip_address_group_id VpcNetworkAcl#destination_ip_address_group_id}
  */
  readonly destinationIpAddressGroupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#destination_port VpcNetworkAcl#destination_port}
  */
  readonly destinationPort?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#ip_version VpcNetworkAcl#ip_version}
  */
  readonly ipVersion: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#name VpcNetworkAcl#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#protocol VpcNetworkAcl#protocol}
  */
  readonly protocol: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#source_ip_address VpcNetworkAcl#source_ip_address}
  */
  readonly sourceIpAddress?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#source_ip_address_group_id VpcNetworkAcl#source_ip_address_group_id}
  */
  readonly sourceIpAddressGroupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#source_port VpcNetworkAcl#source_port}
  */
  readonly sourcePort?: string;
}

export function vpcNetworkAclEgressRulesToTerraform(struct?: VpcNetworkAclEgressRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    action: cdktf.stringToTerraform(struct!.action),
    description: cdktf.stringToTerraform(struct!.description),
    destination_ip_address: cdktf.stringToTerraform(struct!.destinationIpAddress),
    destination_ip_address_group_id: cdktf.stringToTerraform(struct!.destinationIpAddressGroupId),
    destination_port: cdktf.stringToTerraform(struct!.destinationPort),
    ip_version: cdktf.numberToTerraform(struct!.ipVersion),
    name: cdktf.stringToTerraform(struct!.name),
    protocol: cdktf.stringToTerraform(struct!.protocol),
    source_ip_address: cdktf.stringToTerraform(struct!.sourceIpAddress),
    source_ip_address_group_id: cdktf.stringToTerraform(struct!.sourceIpAddressGroupId),
    source_port: cdktf.stringToTerraform(struct!.sourcePort),
  }
}


export function vpcNetworkAclEgressRulesToHclTerraform(struct?: VpcNetworkAclEgressRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    action: {
      value: cdktf.stringToHclTerraform(struct!.action),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    destination_ip_address: {
      value: cdktf.stringToHclTerraform(struct!.destinationIpAddress),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    destination_ip_address_group_id: {
      value: cdktf.stringToHclTerraform(struct!.destinationIpAddressGroupId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    destination_port: {
      value: cdktf.stringToHclTerraform(struct!.destinationPort),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ip_version: {
      value: cdktf.numberToHclTerraform(struct!.ipVersion),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    protocol: {
      value: cdktf.stringToHclTerraform(struct!.protocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_ip_address: {
      value: cdktf.stringToHclTerraform(struct!.sourceIpAddress),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_ip_address_group_id: {
      value: cdktf.stringToHclTerraform(struct!.sourceIpAddressGroupId),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpcNetworkAclEgressRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): VpcNetworkAclEgressRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._action !== undefined) {
      hasAnyValues = true;
      internalValueResult.action = this._action;
    }
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._destinationIpAddress !== undefined) {
      hasAnyValues = true;
      internalValueResult.destinationIpAddress = this._destinationIpAddress;
    }
    if (this._destinationIpAddressGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.destinationIpAddressGroupId = this._destinationIpAddressGroupId;
    }
    if (this._destinationPort !== undefined) {
      hasAnyValues = true;
      internalValueResult.destinationPort = this._destinationPort;
    }
    if (this._ipVersion !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipVersion = this._ipVersion;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    if (this._sourceIpAddress !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceIpAddress = this._sourceIpAddress;
    }
    if (this._sourceIpAddressGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceIpAddressGroupId = this._sourceIpAddressGroupId;
    }
    if (this._sourcePort !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourcePort = this._sourcePort;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpcNetworkAclEgressRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._action = undefined;
      this._description = undefined;
      this._destinationIpAddress = undefined;
      this._destinationIpAddressGroupId = undefined;
      this._destinationPort = undefined;
      this._ipVersion = undefined;
      this._name = undefined;
      this._protocol = undefined;
      this._sourceIpAddress = undefined;
      this._sourceIpAddressGroupId = undefined;
      this._sourcePort = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._action = value.action;
      this._description = value.description;
      this._destinationIpAddress = value.destinationIpAddress;
      this._destinationIpAddressGroupId = value.destinationIpAddressGroupId;
      this._destinationPort = value.destinationPort;
      this._ipVersion = value.ipVersion;
      this._name = value.name;
      this._protocol = value.protocol;
      this._sourceIpAddress = value.sourceIpAddress;
      this._sourceIpAddressGroupId = value.sourceIpAddressGroupId;
      this._sourcePort = value.sourcePort;
    }
  }

  // action - computed: false, optional: false, required: true
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
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

  // destination_ip_address - computed: false, optional: true, required: false
  private _destinationIpAddress?: string; 
  public get destinationIpAddress() {
    return this.getStringAttribute('destination_ip_address');
  }
  public set destinationIpAddress(value: string) {
    this._destinationIpAddress = value;
  }
  public resetDestinationIpAddress() {
    this._destinationIpAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationIpAddressInput() {
    return this._destinationIpAddress;
  }

  // destination_ip_address_group_id - computed: false, optional: true, required: false
  private _destinationIpAddressGroupId?: string; 
  public get destinationIpAddressGroupId() {
    return this.getStringAttribute('destination_ip_address_group_id');
  }
  public set destinationIpAddressGroupId(value: string) {
    this._destinationIpAddressGroupId = value;
  }
  public resetDestinationIpAddressGroupId() {
    this._destinationIpAddressGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationIpAddressGroupIdInput() {
    return this._destinationIpAddressGroupId;
  }

  // destination_port - computed: false, optional: true, required: false
  private _destinationPort?: string; 
  public get destinationPort() {
    return this.getStringAttribute('destination_port');
  }
  public set destinationPort(value: string) {
    this._destinationPort = value;
  }
  public resetDestinationPort() {
    this._destinationPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationPortInput() {
    return this._destinationPort;
  }

  // ip_version - computed: false, optional: false, required: true
  private _ipVersion?: number; 
  public get ipVersion() {
    return this.getNumberAttribute('ip_version');
  }
  public set ipVersion(value: number) {
    this._ipVersion = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ipVersionInput() {
    return this._ipVersion;
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

  // rule_id - computed: true, optional: false, required: false
  public get ruleId() {
    return this.getStringAttribute('rule_id');
  }

  // source_ip_address - computed: false, optional: true, required: false
  private _sourceIpAddress?: string; 
  public get sourceIpAddress() {
    return this.getStringAttribute('source_ip_address');
  }
  public set sourceIpAddress(value: string) {
    this._sourceIpAddress = value;
  }
  public resetSourceIpAddress() {
    this._sourceIpAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceIpAddressInput() {
    return this._sourceIpAddress;
  }

  // source_ip_address_group_id - computed: false, optional: true, required: false
  private _sourceIpAddressGroupId?: string; 
  public get sourceIpAddressGroupId() {
    return this.getStringAttribute('source_ip_address_group_id');
  }
  public set sourceIpAddressGroupId(value: string) {
    this._sourceIpAddressGroupId = value;
  }
  public resetSourceIpAddressGroupId() {
    this._sourceIpAddressGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceIpAddressGroupIdInput() {
    return this._sourceIpAddressGroupId;
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
}

export class VpcNetworkAclEgressRulesList extends cdktf.ComplexList {
  public internalValue? : VpcNetworkAclEgressRules[] | cdktf.IResolvable

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
  public get(index: number): VpcNetworkAclEgressRulesOutputReference {
    return new VpcNetworkAclEgressRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface VpcNetworkAclIngressRules {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#action VpcNetworkAcl#action}
  */
  readonly action: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#description VpcNetworkAcl#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#destination_ip_address VpcNetworkAcl#destination_ip_address}
  */
  readonly destinationIpAddress?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#destination_ip_address_group_id VpcNetworkAcl#destination_ip_address_group_id}
  */
  readonly destinationIpAddressGroupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#destination_port VpcNetworkAcl#destination_port}
  */
  readonly destinationPort?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#ip_version VpcNetworkAcl#ip_version}
  */
  readonly ipVersion: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#name VpcNetworkAcl#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#protocol VpcNetworkAcl#protocol}
  */
  readonly protocol: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#source_ip_address VpcNetworkAcl#source_ip_address}
  */
  readonly sourceIpAddress?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#source_ip_address_group_id VpcNetworkAcl#source_ip_address_group_id}
  */
  readonly sourceIpAddressGroupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#source_port VpcNetworkAcl#source_port}
  */
  readonly sourcePort?: string;
}

export function vpcNetworkAclIngressRulesToTerraform(struct?: VpcNetworkAclIngressRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    action: cdktf.stringToTerraform(struct!.action),
    description: cdktf.stringToTerraform(struct!.description),
    destination_ip_address: cdktf.stringToTerraform(struct!.destinationIpAddress),
    destination_ip_address_group_id: cdktf.stringToTerraform(struct!.destinationIpAddressGroupId),
    destination_port: cdktf.stringToTerraform(struct!.destinationPort),
    ip_version: cdktf.numberToTerraform(struct!.ipVersion),
    name: cdktf.stringToTerraform(struct!.name),
    protocol: cdktf.stringToTerraform(struct!.protocol),
    source_ip_address: cdktf.stringToTerraform(struct!.sourceIpAddress),
    source_ip_address_group_id: cdktf.stringToTerraform(struct!.sourceIpAddressGroupId),
    source_port: cdktf.stringToTerraform(struct!.sourcePort),
  }
}


export function vpcNetworkAclIngressRulesToHclTerraform(struct?: VpcNetworkAclIngressRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    action: {
      value: cdktf.stringToHclTerraform(struct!.action),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    destination_ip_address: {
      value: cdktf.stringToHclTerraform(struct!.destinationIpAddress),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    destination_ip_address_group_id: {
      value: cdktf.stringToHclTerraform(struct!.destinationIpAddressGroupId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    destination_port: {
      value: cdktf.stringToHclTerraform(struct!.destinationPort),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ip_version: {
      value: cdktf.numberToHclTerraform(struct!.ipVersion),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    protocol: {
      value: cdktf.stringToHclTerraform(struct!.protocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_ip_address: {
      value: cdktf.stringToHclTerraform(struct!.sourceIpAddress),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_ip_address_group_id: {
      value: cdktf.stringToHclTerraform(struct!.sourceIpAddressGroupId),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpcNetworkAclIngressRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): VpcNetworkAclIngressRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._action !== undefined) {
      hasAnyValues = true;
      internalValueResult.action = this._action;
    }
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._destinationIpAddress !== undefined) {
      hasAnyValues = true;
      internalValueResult.destinationIpAddress = this._destinationIpAddress;
    }
    if (this._destinationIpAddressGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.destinationIpAddressGroupId = this._destinationIpAddressGroupId;
    }
    if (this._destinationPort !== undefined) {
      hasAnyValues = true;
      internalValueResult.destinationPort = this._destinationPort;
    }
    if (this._ipVersion !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipVersion = this._ipVersion;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    if (this._sourceIpAddress !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceIpAddress = this._sourceIpAddress;
    }
    if (this._sourceIpAddressGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceIpAddressGroupId = this._sourceIpAddressGroupId;
    }
    if (this._sourcePort !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourcePort = this._sourcePort;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpcNetworkAclIngressRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._action = undefined;
      this._description = undefined;
      this._destinationIpAddress = undefined;
      this._destinationIpAddressGroupId = undefined;
      this._destinationPort = undefined;
      this._ipVersion = undefined;
      this._name = undefined;
      this._protocol = undefined;
      this._sourceIpAddress = undefined;
      this._sourceIpAddressGroupId = undefined;
      this._sourcePort = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._action = value.action;
      this._description = value.description;
      this._destinationIpAddress = value.destinationIpAddress;
      this._destinationIpAddressGroupId = value.destinationIpAddressGroupId;
      this._destinationPort = value.destinationPort;
      this._ipVersion = value.ipVersion;
      this._name = value.name;
      this._protocol = value.protocol;
      this._sourceIpAddress = value.sourceIpAddress;
      this._sourceIpAddressGroupId = value.sourceIpAddressGroupId;
      this._sourcePort = value.sourcePort;
    }
  }

  // action - computed: false, optional: false, required: true
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
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

  // destination_ip_address - computed: false, optional: true, required: false
  private _destinationIpAddress?: string; 
  public get destinationIpAddress() {
    return this.getStringAttribute('destination_ip_address');
  }
  public set destinationIpAddress(value: string) {
    this._destinationIpAddress = value;
  }
  public resetDestinationIpAddress() {
    this._destinationIpAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationIpAddressInput() {
    return this._destinationIpAddress;
  }

  // destination_ip_address_group_id - computed: false, optional: true, required: false
  private _destinationIpAddressGroupId?: string; 
  public get destinationIpAddressGroupId() {
    return this.getStringAttribute('destination_ip_address_group_id');
  }
  public set destinationIpAddressGroupId(value: string) {
    this._destinationIpAddressGroupId = value;
  }
  public resetDestinationIpAddressGroupId() {
    this._destinationIpAddressGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationIpAddressGroupIdInput() {
    return this._destinationIpAddressGroupId;
  }

  // destination_port - computed: false, optional: true, required: false
  private _destinationPort?: string; 
  public get destinationPort() {
    return this.getStringAttribute('destination_port');
  }
  public set destinationPort(value: string) {
    this._destinationPort = value;
  }
  public resetDestinationPort() {
    this._destinationPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationPortInput() {
    return this._destinationPort;
  }

  // ip_version - computed: false, optional: false, required: true
  private _ipVersion?: number; 
  public get ipVersion() {
    return this.getNumberAttribute('ip_version');
  }
  public set ipVersion(value: number) {
    this._ipVersion = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ipVersionInput() {
    return this._ipVersion;
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

  // rule_id - computed: true, optional: false, required: false
  public get ruleId() {
    return this.getStringAttribute('rule_id');
  }

  // source_ip_address - computed: false, optional: true, required: false
  private _sourceIpAddress?: string; 
  public get sourceIpAddress() {
    return this.getStringAttribute('source_ip_address');
  }
  public set sourceIpAddress(value: string) {
    this._sourceIpAddress = value;
  }
  public resetSourceIpAddress() {
    this._sourceIpAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceIpAddressInput() {
    return this._sourceIpAddress;
  }

  // source_ip_address_group_id - computed: false, optional: true, required: false
  private _sourceIpAddressGroupId?: string; 
  public get sourceIpAddressGroupId() {
    return this.getStringAttribute('source_ip_address_group_id');
  }
  public set sourceIpAddressGroupId(value: string) {
    this._sourceIpAddressGroupId = value;
  }
  public resetSourceIpAddressGroupId() {
    this._sourceIpAddressGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceIpAddressGroupIdInput() {
    return this._sourceIpAddressGroupId;
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
}

export class VpcNetworkAclIngressRulesList extends cdktf.ComplexList {
  public internalValue? : VpcNetworkAclIngressRules[] | cdktf.IResolvable

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
  public get(index: number): VpcNetworkAclIngressRulesOutputReference {
    return new VpcNetworkAclIngressRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl huaweicloud_vpc_network_acl}
*/
export class VpcNetworkAcl extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_vpc_network_acl";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VpcNetworkAcl resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VpcNetworkAcl to import
  * @param importFromId The id of the existing VpcNetworkAcl that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VpcNetworkAcl to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_vpc_network_acl", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpc_network_acl huaweicloud_vpc_network_acl} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VpcNetworkAclConfig
  */
  public constructor(scope: Construct, id: string, config: VpcNetworkAclConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_vpc_network_acl',
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
    this._enabled = config.enabled;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._tags = config.tags;
    this._associatedSubnets.internalValue = config.associatedSubnets;
    this._egressRules.internalValue = config.egressRules;
    this._ingressRules.internalValue = config.ingressRules;
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

  // enabled - computed: false, optional: true, required: false
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  public resetEnabled() {
    this._enabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // enterprise_project_id - computed: false, optional: false, required: true
  private _enterpriseProjectId?: string; 
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }
  public set enterpriseProjectId(value: string) {
    this._enterpriseProjectId = value;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // associated_subnets - computed: false, optional: true, required: false
  private _associatedSubnets = new VpcNetworkAclAssociatedSubnetsList(this, "associated_subnets", true);
  public get associatedSubnets() {
    return this._associatedSubnets;
  }
  public putAssociatedSubnets(value: VpcNetworkAclAssociatedSubnets[] | cdktf.IResolvable) {
    this._associatedSubnets.internalValue = value;
  }
  public resetAssociatedSubnets() {
    this._associatedSubnets.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get associatedSubnetsInput() {
    return this._associatedSubnets.internalValue;
  }

  // egress_rules - computed: false, optional: true, required: false
  private _egressRules = new VpcNetworkAclEgressRulesList(this, "egress_rules", false);
  public get egressRules() {
    return this._egressRules;
  }
  public putEgressRules(value: VpcNetworkAclEgressRules[] | cdktf.IResolvable) {
    this._egressRules.internalValue = value;
  }
  public resetEgressRules() {
    this._egressRules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get egressRulesInput() {
    return this._egressRules.internalValue;
  }

  // ingress_rules - computed: false, optional: true, required: false
  private _ingressRules = new VpcNetworkAclIngressRulesList(this, "ingress_rules", false);
  public get ingressRules() {
    return this._ingressRules;
  }
  public putIngressRules(value: VpcNetworkAclIngressRules[] | cdktf.IResolvable) {
    this._ingressRules.internalValue = value;
  }
  public resetIngressRules() {
    this._ingressRules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ingressRulesInput() {
    return this._ingressRules.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      enabled: cdktf.booleanToTerraform(this._enabled),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      associated_subnets: cdktf.listMapper(vpcNetworkAclAssociatedSubnetsToTerraform, true)(this._associatedSubnets.internalValue),
      egress_rules: cdktf.listMapper(vpcNetworkAclEgressRulesToTerraform, true)(this._egressRules.internalValue),
      ingress_rules: cdktf.listMapper(vpcNetworkAclIngressRulesToTerraform, true)(this._ingressRules.internalValue),
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
      enabled: {
        value: cdktf.booleanToHclTerraform(this._enabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      associated_subnets: {
        value: cdktf.listMapperHcl(vpcNetworkAclAssociatedSubnetsToHclTerraform, true)(this._associatedSubnets.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "VpcNetworkAclAssociatedSubnetsList",
      },
      egress_rules: {
        value: cdktf.listMapperHcl(vpcNetworkAclEgressRulesToHclTerraform, true)(this._egressRules.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpcNetworkAclEgressRulesList",
      },
      ingress_rules: {
        value: cdktf.listMapperHcl(vpcNetworkAclIngressRulesToHclTerraform, true)(this._ingressRules.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpcNetworkAclIngressRulesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

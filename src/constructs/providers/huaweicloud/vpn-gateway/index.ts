// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpnGatewayConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#access_private_ip_1 VpnGateway#access_private_ip_1}
  */
  readonly accessPrivateIp1?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#access_private_ip_2 VpnGateway#access_private_ip_2}
  */
  readonly accessPrivateIp2?: string;
  /**
  * The access subnet ID of the VPN gateway.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#access_subnet_id VpnGateway#access_subnet_id}
  */
  readonly accessSubnetId?: string;
  /**
  * The access VPC ID of the VPN gateway.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#access_vpc_id VpnGateway#access_vpc_id}
  */
  readonly accessVpcId?: string;
  /**
  * The ASN number of BGP
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#asn VpnGateway#asn}
  */
  readonly asn?: number;
  /**
  * The attachment type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#attachment_type VpnGateway#attachment_type}
  */
  readonly attachmentType?: string;
  /**
  * The availability zone IDs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#availability_zones VpnGateway#availability_zones}
  */
  readonly availabilityZones: string[];
  /**
  * The Network ID of the VPC subnet used by the VPN gateway.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#connect_subnet VpnGateway#connect_subnet}
  */
  readonly connectSubnet?: string;
  /**
  * The enterprise project ID
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#enterprise_project_id VpnGateway#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * The enterprise router ID to attach with to VPN gateway.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#er_id VpnGateway#er_id}
  */
  readonly erId?: string;
  /**
  * The flavor of the VPN gateway.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#flavor VpnGateway#flavor}
  */
  readonly flavor?: string;
  /**
  * The HA mode of the VPN gateway.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#ha_mode VpnGateway#ha_mode}
  */
  readonly haMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#id VpnGateway#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The local subnets.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#local_subnets VpnGateway#local_subnets}
  */
  readonly localSubnets?: string[];
  /**
  * The name of the VPN gateway. Only letters, digits, underscores(_) and hypens(-) are supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#name VpnGateway#name}
  */
  readonly name: string;
  /**
  * The network type of the VPN gateway.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#network_type VpnGateway#network_type}
  */
  readonly networkType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#region VpnGateway#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#tags VpnGateway#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * The ID of the VPC to which the VPN gateway is connected.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#vpc_id VpnGateway#vpc_id}
  */
  readonly vpcId?: string;
  /**
  * certificate block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#certificate VpnGateway#certificate}
  */
  readonly certificate?: VpnGatewayCertificate;
  /**
  * eip1 block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#eip1 VpnGateway#eip1}
  */
  readonly eip1?: VpnGatewayEip1;
  /**
  * eip2 block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#eip2 VpnGateway#eip2}
  */
  readonly eip2?: VpnGatewayEip2;
  /**
  * master_eip block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#master_eip VpnGateway#master_eip}
  */
  readonly masterEip?: VpnGatewayMasterEip;
  /**
  * slave_eip block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#slave_eip VpnGateway#slave_eip}
  */
  readonly slaveEip?: VpnGatewaySlaveEip;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#timeouts VpnGateway#timeouts}
  */
  readonly timeouts?: VpnGatewayTimeouts;
}
export interface VpnGatewayCertificate {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#certificate_chain VpnGateway#certificate_chain}
  */
  readonly certificateChain: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#content VpnGateway#content}
  */
  readonly content: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#enc_certificate VpnGateway#enc_certificate}
  */
  readonly encCertificate: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#enc_private_key VpnGateway#enc_private_key}
  */
  readonly encPrivateKey: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#name VpnGateway#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#private_key VpnGateway#private_key}
  */
  readonly privateKey: string;
}

export function vpnGatewayCertificateToTerraform(struct?: VpnGatewayCertificateOutputReference | VpnGatewayCertificate): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    certificate_chain: cdktf.stringToTerraform(struct!.certificateChain),
    content: cdktf.stringToTerraform(struct!.content),
    enc_certificate: cdktf.stringToTerraform(struct!.encCertificate),
    enc_private_key: cdktf.stringToTerraform(struct!.encPrivateKey),
    name: cdktf.stringToTerraform(struct!.name),
    private_key: cdktf.stringToTerraform(struct!.privateKey),
  }
}


export function vpnGatewayCertificateToHclTerraform(struct?: VpnGatewayCertificateOutputReference | VpnGatewayCertificate): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    certificate_chain: {
      value: cdktf.stringToHclTerraform(struct!.certificateChain),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    content: {
      value: cdktf.stringToHclTerraform(struct!.content),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    enc_certificate: {
      value: cdktf.stringToHclTerraform(struct!.encCertificate),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    enc_private_key: {
      value: cdktf.stringToHclTerraform(struct!.encPrivateKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    private_key: {
      value: cdktf.stringToHclTerraform(struct!.privateKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpnGatewayCertificateOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VpnGatewayCertificate | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._certificateChain !== undefined) {
      hasAnyValues = true;
      internalValueResult.certificateChain = this._certificateChain;
    }
    if (this._content !== undefined) {
      hasAnyValues = true;
      internalValueResult.content = this._content;
    }
    if (this._encCertificate !== undefined) {
      hasAnyValues = true;
      internalValueResult.encCertificate = this._encCertificate;
    }
    if (this._encPrivateKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.encPrivateKey = this._encPrivateKey;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._privateKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.privateKey = this._privateKey;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpnGatewayCertificate | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._certificateChain = undefined;
      this._content = undefined;
      this._encCertificate = undefined;
      this._encPrivateKey = undefined;
      this._name = undefined;
      this._privateKey = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._certificateChain = value.certificateChain;
      this._content = value.content;
      this._encCertificate = value.encCertificate;
      this._encPrivateKey = value.encPrivateKey;
      this._name = value.name;
      this._privateKey = value.privateKey;
    }
  }

  // certificate_chain - computed: false, optional: false, required: true
  private _certificateChain?: string; 
  public get certificateChain() {
    return this.getStringAttribute('certificate_chain');
  }
  public set certificateChain(value: string) {
    this._certificateChain = value;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateChainInput() {
    return this._certificateChain;
  }

  // certificate_chain_expire_time - computed: true, optional: false, required: false
  public get certificateChainExpireTime() {
    return this.getStringAttribute('certificate_chain_expire_time');
  }

  // certificate_chain_serial_number - computed: true, optional: false, required: false
  public get certificateChainSerialNumber() {
    return this.getStringAttribute('certificate_chain_serial_number');
  }

  // certificate_chain_subject - computed: true, optional: false, required: false
  public get certificateChainSubject() {
    return this.getStringAttribute('certificate_chain_subject');
  }

  // certificate_expire_time - computed: true, optional: false, required: false
  public get certificateExpireTime() {
    return this.getStringAttribute('certificate_expire_time');
  }

  // certificate_id - computed: true, optional: false, required: false
  public get certificateId() {
    return this.getStringAttribute('certificate_id');
  }

  // certificate_serial_number - computed: true, optional: false, required: false
  public get certificateSerialNumber() {
    return this.getStringAttribute('certificate_serial_number');
  }

  // certificate_subject - computed: true, optional: false, required: false
  public get certificateSubject() {
    return this.getStringAttribute('certificate_subject');
  }

  // content - computed: false, optional: false, required: true
  private _content?: string; 
  public get content() {
    return this.getStringAttribute('content');
  }
  public set content(value: string) {
    this._content = value;
  }
  // Temporarily expose input value. Use with caution.
  public get contentInput() {
    return this._content;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // enc_certificate - computed: false, optional: false, required: true
  private _encCertificate?: string; 
  public get encCertificate() {
    return this.getStringAttribute('enc_certificate');
  }
  public set encCertificate(value: string) {
    this._encCertificate = value;
  }
  // Temporarily expose input value. Use with caution.
  public get encCertificateInput() {
    return this._encCertificate;
  }

  // enc_certificate_expire_time - computed: true, optional: false, required: false
  public get encCertificateExpireTime() {
    return this.getStringAttribute('enc_certificate_expire_time');
  }

  // enc_certificate_serial_number - computed: true, optional: false, required: false
  public get encCertificateSerialNumber() {
    return this.getStringAttribute('enc_certificate_serial_number');
  }

  // enc_certificate_subject - computed: true, optional: false, required: false
  public get encCertificateSubject() {
    return this.getStringAttribute('enc_certificate_subject');
  }

  // enc_private_key - computed: false, optional: false, required: true
  private _encPrivateKey?: string; 
  public get encPrivateKey() {
    return this.getStringAttribute('enc_private_key');
  }
  public set encPrivateKey(value: string) {
    this._encPrivateKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get encPrivateKeyInput() {
    return this._encPrivateKey;
  }

  // issuer - computed: true, optional: false, required: false
  public get issuer() {
    return this.getStringAttribute('issuer');
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

  // private_key - computed: false, optional: false, required: true
  private _privateKey?: string; 
  public get privateKey() {
    return this.getStringAttribute('private_key');
  }
  public set privateKey(value: string) {
    this._privateKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get privateKeyInput() {
    return this._privateKey;
  }

  // signature_algorithm - computed: true, optional: false, required: false
  public get signatureAlgorithm() {
    return this.getStringAttribute('signature_algorithm');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}
export interface VpnGatewayEip1 {
  /**
  * The bandwidth name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#bandwidth_name VpnGateway#bandwidth_name}
  */
  readonly bandwidthName?: string;
  /**
  * Bandwidth size in Mbit/s. When the flavor is **V300**, the value cannot be greater than **300**.
  * 
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#bandwidth_size VpnGateway#bandwidth_size}
  */
  readonly bandwidthSize?: number;
  /**
  * The charge mode of the bandwidth. The value can be **bandwidth** and **traffic**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#charge_mode VpnGateway#charge_mode}
  */
  readonly chargeMode?: string;
  /**
  * The public IP ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#id VpnGateway#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The EIP type. The value can be **5_bgp** and **5_sbgp**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#type VpnGateway#type}
  */
  readonly type?: string;
}

export function vpnGatewayEip1ToTerraform(struct?: VpnGatewayEip1OutputReference | VpnGatewayEip1): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bandwidth_name: cdktf.stringToTerraform(struct!.bandwidthName),
    bandwidth_size: cdktf.numberToTerraform(struct!.bandwidthSize),
    charge_mode: cdktf.stringToTerraform(struct!.chargeMode),
    id: cdktf.stringToTerraform(struct!.id),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function vpnGatewayEip1ToHclTerraform(struct?: VpnGatewayEip1OutputReference | VpnGatewayEip1): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bandwidth_name: {
      value: cdktf.stringToHclTerraform(struct!.bandwidthName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    bandwidth_size: {
      value: cdktf.numberToHclTerraform(struct!.bandwidthSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    charge_mode: {
      value: cdktf.stringToHclTerraform(struct!.chargeMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpnGatewayEip1OutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VpnGatewayEip1 | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bandwidthName !== undefined) {
      hasAnyValues = true;
      internalValueResult.bandwidthName = this._bandwidthName;
    }
    if (this._bandwidthSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.bandwidthSize = this._bandwidthSize;
    }
    if (this._chargeMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.chargeMode = this._chargeMode;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpnGatewayEip1 | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bandwidthName = undefined;
      this._bandwidthSize = undefined;
      this._chargeMode = undefined;
      this._id = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bandwidthName = value.bandwidthName;
      this._bandwidthSize = value.bandwidthSize;
      this._chargeMode = value.chargeMode;
      this._id = value.id;
      this._type = value.type;
    }
  }

  // bandwidth_id - computed: true, optional: false, required: false
  public get bandwidthId() {
    return this.getStringAttribute('bandwidth_id');
  }

  // bandwidth_name - computed: true, optional: true, required: false
  private _bandwidthName?: string; 
  public get bandwidthName() {
    return this.getStringAttribute('bandwidth_name');
  }
  public set bandwidthName(value: string) {
    this._bandwidthName = value;
  }
  public resetBandwidthName() {
    this._bandwidthName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthNameInput() {
    return this._bandwidthName;
  }

  // bandwidth_size - computed: true, optional: true, required: false
  private _bandwidthSize?: number; 
  public get bandwidthSize() {
    return this.getNumberAttribute('bandwidth_size');
  }
  public set bandwidthSize(value: number) {
    this._bandwidthSize = value;
  }
  public resetBandwidthSize() {
    this._bandwidthSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthSizeInput() {
    return this._bandwidthSize;
  }

  // charge_mode - computed: true, optional: true, required: false
  private _chargeMode?: string; 
  public get chargeMode() {
    return this.getStringAttribute('charge_mode');
  }
  public set chargeMode(value: string) {
    this._chargeMode = value;
  }
  public resetChargeMode() {
    this._chargeMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get chargeModeInput() {
    return this._chargeMode;
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

  // ip_address - computed: true, optional: false, required: false
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }

  // ip_version - computed: true, optional: false, required: false
  public get ipVersion() {
    return this.getNumberAttribute('ip_version');
  }

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface VpnGatewayEip2 {
  /**
  * The bandwidth name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#bandwidth_name VpnGateway#bandwidth_name}
  */
  readonly bandwidthName?: string;
  /**
  * Bandwidth size in Mbit/s. When the flavor is **V300**, the value cannot be greater than **300**.
  * 
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#bandwidth_size VpnGateway#bandwidth_size}
  */
  readonly bandwidthSize?: number;
  /**
  * The charge mode of the bandwidth. The value can be **bandwidth** and **traffic**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#charge_mode VpnGateway#charge_mode}
  */
  readonly chargeMode?: string;
  /**
  * The public IP ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#id VpnGateway#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The EIP type. The value can be **5_bgp** and **5_sbgp**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#type VpnGateway#type}
  */
  readonly type?: string;
}

export function vpnGatewayEip2ToTerraform(struct?: VpnGatewayEip2OutputReference | VpnGatewayEip2): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bandwidth_name: cdktf.stringToTerraform(struct!.bandwidthName),
    bandwidth_size: cdktf.numberToTerraform(struct!.bandwidthSize),
    charge_mode: cdktf.stringToTerraform(struct!.chargeMode),
    id: cdktf.stringToTerraform(struct!.id),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function vpnGatewayEip2ToHclTerraform(struct?: VpnGatewayEip2OutputReference | VpnGatewayEip2): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bandwidth_name: {
      value: cdktf.stringToHclTerraform(struct!.bandwidthName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    bandwidth_size: {
      value: cdktf.numberToHclTerraform(struct!.bandwidthSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    charge_mode: {
      value: cdktf.stringToHclTerraform(struct!.chargeMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpnGatewayEip2OutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VpnGatewayEip2 | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bandwidthName !== undefined) {
      hasAnyValues = true;
      internalValueResult.bandwidthName = this._bandwidthName;
    }
    if (this._bandwidthSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.bandwidthSize = this._bandwidthSize;
    }
    if (this._chargeMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.chargeMode = this._chargeMode;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpnGatewayEip2 | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bandwidthName = undefined;
      this._bandwidthSize = undefined;
      this._chargeMode = undefined;
      this._id = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bandwidthName = value.bandwidthName;
      this._bandwidthSize = value.bandwidthSize;
      this._chargeMode = value.chargeMode;
      this._id = value.id;
      this._type = value.type;
    }
  }

  // bandwidth_id - computed: true, optional: false, required: false
  public get bandwidthId() {
    return this.getStringAttribute('bandwidth_id');
  }

  // bandwidth_name - computed: true, optional: true, required: false
  private _bandwidthName?: string; 
  public get bandwidthName() {
    return this.getStringAttribute('bandwidth_name');
  }
  public set bandwidthName(value: string) {
    this._bandwidthName = value;
  }
  public resetBandwidthName() {
    this._bandwidthName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthNameInput() {
    return this._bandwidthName;
  }

  // bandwidth_size - computed: true, optional: true, required: false
  private _bandwidthSize?: number; 
  public get bandwidthSize() {
    return this.getNumberAttribute('bandwidth_size');
  }
  public set bandwidthSize(value: number) {
    this._bandwidthSize = value;
  }
  public resetBandwidthSize() {
    this._bandwidthSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthSizeInput() {
    return this._bandwidthSize;
  }

  // charge_mode - computed: true, optional: true, required: false
  private _chargeMode?: string; 
  public get chargeMode() {
    return this.getStringAttribute('charge_mode');
  }
  public set chargeMode(value: string) {
    this._chargeMode = value;
  }
  public resetChargeMode() {
    this._chargeMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get chargeModeInput() {
    return this._chargeMode;
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

  // ip_address - computed: true, optional: false, required: false
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }

  // ip_version - computed: true, optional: false, required: false
  public get ipVersion() {
    return this.getNumberAttribute('ip_version');
  }

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface VpnGatewayMasterEip {
  /**
  * The bandwidth name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#bandwidth_name VpnGateway#bandwidth_name}
  */
  readonly bandwidthName?: string;
  /**
  * Bandwidth size in Mbit/s. When the flavor is **V300**, the value cannot be greater than **300**.
  * 
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#bandwidth_size VpnGateway#bandwidth_size}
  */
  readonly bandwidthSize?: number;
  /**
  * The charge mode of the bandwidth. The value can be **bandwidth** and **traffic**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#charge_mode VpnGateway#charge_mode}
  */
  readonly chargeMode?: string;
  /**
  * The public IP ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#id VpnGateway#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The EIP type. The value can be **5_bgp** and **5_sbgp**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#type VpnGateway#type}
  */
  readonly type?: string;
}

export function vpnGatewayMasterEipToTerraform(struct?: VpnGatewayMasterEipOutputReference | VpnGatewayMasterEip): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bandwidth_name: cdktf.stringToTerraform(struct!.bandwidthName),
    bandwidth_size: cdktf.numberToTerraform(struct!.bandwidthSize),
    charge_mode: cdktf.stringToTerraform(struct!.chargeMode),
    id: cdktf.stringToTerraform(struct!.id),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function vpnGatewayMasterEipToHclTerraform(struct?: VpnGatewayMasterEipOutputReference | VpnGatewayMasterEip): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bandwidth_name: {
      value: cdktf.stringToHclTerraform(struct!.bandwidthName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    bandwidth_size: {
      value: cdktf.numberToHclTerraform(struct!.bandwidthSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    charge_mode: {
      value: cdktf.stringToHclTerraform(struct!.chargeMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpnGatewayMasterEipOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VpnGatewayMasterEip | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bandwidthName !== undefined) {
      hasAnyValues = true;
      internalValueResult.bandwidthName = this._bandwidthName;
    }
    if (this._bandwidthSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.bandwidthSize = this._bandwidthSize;
    }
    if (this._chargeMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.chargeMode = this._chargeMode;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpnGatewayMasterEip | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bandwidthName = undefined;
      this._bandwidthSize = undefined;
      this._chargeMode = undefined;
      this._id = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bandwidthName = value.bandwidthName;
      this._bandwidthSize = value.bandwidthSize;
      this._chargeMode = value.chargeMode;
      this._id = value.id;
      this._type = value.type;
    }
  }

  // bandwidth_id - computed: true, optional: false, required: false
  public get bandwidthId() {
    return this.getStringAttribute('bandwidth_id');
  }

  // bandwidth_name - computed: true, optional: true, required: false
  private _bandwidthName?: string; 
  public get bandwidthName() {
    return this.getStringAttribute('bandwidth_name');
  }
  public set bandwidthName(value: string) {
    this._bandwidthName = value;
  }
  public resetBandwidthName() {
    this._bandwidthName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthNameInput() {
    return this._bandwidthName;
  }

  // bandwidth_size - computed: true, optional: true, required: false
  private _bandwidthSize?: number; 
  public get bandwidthSize() {
    return this.getNumberAttribute('bandwidth_size');
  }
  public set bandwidthSize(value: number) {
    this._bandwidthSize = value;
  }
  public resetBandwidthSize() {
    this._bandwidthSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthSizeInput() {
    return this._bandwidthSize;
  }

  // charge_mode - computed: true, optional: true, required: false
  private _chargeMode?: string; 
  public get chargeMode() {
    return this.getStringAttribute('charge_mode');
  }
  public set chargeMode(value: string) {
    this._chargeMode = value;
  }
  public resetChargeMode() {
    this._chargeMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get chargeModeInput() {
    return this._chargeMode;
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

  // ip_address - computed: true, optional: false, required: false
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }

  // ip_version - computed: true, optional: false, required: false
  public get ipVersion() {
    return this.getNumberAttribute('ip_version');
  }

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface VpnGatewaySlaveEip {
  /**
  * The bandwidth name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#bandwidth_name VpnGateway#bandwidth_name}
  */
  readonly bandwidthName?: string;
  /**
  * Bandwidth size in Mbit/s. When the flavor is **V300**, the value cannot be greater than **300**.
  * 
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#bandwidth_size VpnGateway#bandwidth_size}
  */
  readonly bandwidthSize?: number;
  /**
  * The charge mode of the bandwidth. The value can be **bandwidth** and **traffic**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#charge_mode VpnGateway#charge_mode}
  */
  readonly chargeMode?: string;
  /**
  * The public IP ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#id VpnGateway#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The EIP type. The value can be **5_bgp** and **5_sbgp**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#type VpnGateway#type}
  */
  readonly type?: string;
}

export function vpnGatewaySlaveEipToTerraform(struct?: VpnGatewaySlaveEipOutputReference | VpnGatewaySlaveEip): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bandwidth_name: cdktf.stringToTerraform(struct!.bandwidthName),
    bandwidth_size: cdktf.numberToTerraform(struct!.bandwidthSize),
    charge_mode: cdktf.stringToTerraform(struct!.chargeMode),
    id: cdktf.stringToTerraform(struct!.id),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function vpnGatewaySlaveEipToHclTerraform(struct?: VpnGatewaySlaveEipOutputReference | VpnGatewaySlaveEip): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bandwidth_name: {
      value: cdktf.stringToHclTerraform(struct!.bandwidthName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    bandwidth_size: {
      value: cdktf.numberToHclTerraform(struct!.bandwidthSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    charge_mode: {
      value: cdktf.stringToHclTerraform(struct!.chargeMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpnGatewaySlaveEipOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VpnGatewaySlaveEip | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bandwidthName !== undefined) {
      hasAnyValues = true;
      internalValueResult.bandwidthName = this._bandwidthName;
    }
    if (this._bandwidthSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.bandwidthSize = this._bandwidthSize;
    }
    if (this._chargeMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.chargeMode = this._chargeMode;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpnGatewaySlaveEip | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bandwidthName = undefined;
      this._bandwidthSize = undefined;
      this._chargeMode = undefined;
      this._id = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bandwidthName = value.bandwidthName;
      this._bandwidthSize = value.bandwidthSize;
      this._chargeMode = value.chargeMode;
      this._id = value.id;
      this._type = value.type;
    }
  }

  // bandwidth_id - computed: true, optional: false, required: false
  public get bandwidthId() {
    return this.getStringAttribute('bandwidth_id');
  }

  // bandwidth_name - computed: true, optional: true, required: false
  private _bandwidthName?: string; 
  public get bandwidthName() {
    return this.getStringAttribute('bandwidth_name');
  }
  public set bandwidthName(value: string) {
    this._bandwidthName = value;
  }
  public resetBandwidthName() {
    this._bandwidthName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthNameInput() {
    return this._bandwidthName;
  }

  // bandwidth_size - computed: true, optional: true, required: false
  private _bandwidthSize?: number; 
  public get bandwidthSize() {
    return this.getNumberAttribute('bandwidth_size');
  }
  public set bandwidthSize(value: number) {
    this._bandwidthSize = value;
  }
  public resetBandwidthSize() {
    this._bandwidthSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthSizeInput() {
    return this._bandwidthSize;
  }

  // charge_mode - computed: true, optional: true, required: false
  private _chargeMode?: string; 
  public get chargeMode() {
    return this.getStringAttribute('charge_mode');
  }
  public set chargeMode(value: string) {
    this._chargeMode = value;
  }
  public resetChargeMode() {
    this._chargeMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get chargeModeInput() {
    return this._chargeMode;
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

  // ip_address - computed: true, optional: false, required: false
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }

  // ip_version - computed: true, optional: false, required: false
  public get ipVersion() {
    return this.getNumberAttribute('ip_version');
  }

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface VpnGatewayTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#create VpnGateway#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#delete VpnGateway#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#update VpnGateway#update}
  */
  readonly update?: string;
}

export function vpnGatewayTimeoutsToTerraform(struct?: VpnGatewayTimeouts | cdktf.IResolvable): any {
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


export function vpnGatewayTimeoutsToHclTerraform(struct?: VpnGatewayTimeouts | cdktf.IResolvable): any {
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

export class VpnGatewayTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): VpnGatewayTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: VpnGatewayTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway huaweicloud_vpn_gateway}
*/
export class VpnGateway extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_vpn_gateway";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VpnGateway resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VpnGateway to import
  * @param importFromId The id of the existing VpnGateway that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VpnGateway to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_vpn_gateway", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_gateway huaweicloud_vpn_gateway} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VpnGatewayConfig
  */
  public constructor(scope: Construct, id: string, config: VpnGatewayConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_vpn_gateway',
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
    this._accessPrivateIp1 = config.accessPrivateIp1;
    this._accessPrivateIp2 = config.accessPrivateIp2;
    this._accessSubnetId = config.accessSubnetId;
    this._accessVpcId = config.accessVpcId;
    this._asn = config.asn;
    this._attachmentType = config.attachmentType;
    this._availabilityZones = config.availabilityZones;
    this._connectSubnet = config.connectSubnet;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._erId = config.erId;
    this._flavor = config.flavor;
    this._haMode = config.haMode;
    this._id = config.id;
    this._localSubnets = config.localSubnets;
    this._name = config.name;
    this._networkType = config.networkType;
    this._region = config.region;
    this._tags = config.tags;
    this._vpcId = config.vpcId;
    this._certificate.internalValue = config.certificate;
    this._eip1.internalValue = config.eip1;
    this._eip2.internalValue = config.eip2;
    this._masterEip.internalValue = config.masterEip;
    this._slaveEip.internalValue = config.slaveEip;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_private_ip_1 - computed: true, optional: true, required: false
  private _accessPrivateIp1?: string; 
  public get accessPrivateIp1() {
    return this.getStringAttribute('access_private_ip_1');
  }
  public set accessPrivateIp1(value: string) {
    this._accessPrivateIp1 = value;
  }
  public resetAccessPrivateIp1() {
    this._accessPrivateIp1 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessPrivateIp1Input() {
    return this._accessPrivateIp1;
  }

  // access_private_ip_2 - computed: true, optional: true, required: false
  private _accessPrivateIp2?: string; 
  public get accessPrivateIp2() {
    return this.getStringAttribute('access_private_ip_2');
  }
  public set accessPrivateIp2(value: string) {
    this._accessPrivateIp2 = value;
  }
  public resetAccessPrivateIp2() {
    this._accessPrivateIp2 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessPrivateIp2Input() {
    return this._accessPrivateIp2;
  }

  // access_subnet_id - computed: true, optional: true, required: false
  private _accessSubnetId?: string; 
  public get accessSubnetId() {
    return this.getStringAttribute('access_subnet_id');
  }
  public set accessSubnetId(value: string) {
    this._accessSubnetId = value;
  }
  public resetAccessSubnetId() {
    this._accessSubnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessSubnetIdInput() {
    return this._accessSubnetId;
  }

  // access_vpc_id - computed: true, optional: true, required: false
  private _accessVpcId?: string; 
  public get accessVpcId() {
    return this.getStringAttribute('access_vpc_id');
  }
  public set accessVpcId(value: string) {
    this._accessVpcId = value;
  }
  public resetAccessVpcId() {
    this._accessVpcId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessVpcIdInput() {
    return this._accessVpcId;
  }

  // asn - computed: false, optional: true, required: false
  private _asn?: number; 
  public get asn() {
    return this.getNumberAttribute('asn');
  }
  public set asn(value: number) {
    this._asn = value;
  }
  public resetAsn() {
    this._asn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get asnInput() {
    return this._asn;
  }

  // attachment_type - computed: false, optional: true, required: false
  private _attachmentType?: string; 
  public get attachmentType() {
    return this.getStringAttribute('attachment_type');
  }
  public set attachmentType(value: string) {
    this._attachmentType = value;
  }
  public resetAttachmentType() {
    this._attachmentType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get attachmentTypeInput() {
    return this._attachmentType;
  }

  // availability_zones - computed: false, optional: false, required: true
  private _availabilityZones?: string[]; 
  public get availabilityZones() {
    return this.getListAttribute('availability_zones');
  }
  public set availabilityZones(value: string[]) {
    this._availabilityZones = value;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZonesInput() {
    return this._availabilityZones;
  }

  // connect_subnet - computed: true, optional: true, required: false
  private _connectSubnet?: string; 
  public get connectSubnet() {
    return this.getStringAttribute('connect_subnet');
  }
  public set connectSubnet(value: string) {
    this._connectSubnet = value;
  }
  public resetConnectSubnet() {
    this._connectSubnet = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get connectSubnetInput() {
    return this._connectSubnet;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // er_attachment_id - computed: true, optional: false, required: false
  public get erAttachmentId() {
    return this.getStringAttribute('er_attachment_id');
  }

  // er_id - computed: true, optional: true, required: false
  private _erId?: string; 
  public get erId() {
    return this.getStringAttribute('er_id');
  }
  public set erId(value: string) {
    this._erId = value;
  }
  public resetErId() {
    this._erId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get erIdInput() {
    return this._erId;
  }

  // flavor - computed: true, optional: true, required: false
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  public resetFlavor() {
    this._flavor = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
  }

  // ha_mode - computed: true, optional: true, required: false
  private _haMode?: string; 
  public get haMode() {
    return this.getStringAttribute('ha_mode');
  }
  public set haMode(value: string) {
    this._haMode = value;
  }
  public resetHaMode() {
    this._haMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get haModeInput() {
    return this._haMode;
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

  // local_subnets - computed: true, optional: true, required: false
  private _localSubnets?: string[]; 
  public get localSubnets() {
    return this.getListAttribute('local_subnets');
  }
  public set localSubnets(value: string[]) {
    this._localSubnets = value;
  }
  public resetLocalSubnets() {
    this._localSubnets = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get localSubnetsInput() {
    return this._localSubnets;
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

  // network_type - computed: true, optional: true, required: false
  private _networkType?: string; 
  public get networkType() {
    return this.getStringAttribute('network_type');
  }
  public set networkType(value: string) {
    this._networkType = value;
  }
  public resetNetworkType() {
    this._networkType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get networkTypeInput() {
    return this._networkType;
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

  // used_connection_group - computed: true, optional: false, required: false
  public get usedConnectionGroup() {
    return this.getNumberAttribute('used_connection_group');
  }

  // used_connection_number - computed: true, optional: false, required: false
  public get usedConnectionNumber() {
    return this.getNumberAttribute('used_connection_number');
  }

  // vpc_id - computed: true, optional: true, required: false
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  public resetVpcId() {
    this._vpcId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // certificate - computed: false, optional: true, required: false
  private _certificate = new VpnGatewayCertificateOutputReference(this, "certificate");
  public get certificate() {
    return this._certificate;
  }
  public putCertificate(value: VpnGatewayCertificate) {
    this._certificate.internalValue = value;
  }
  public resetCertificate() {
    this._certificate.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateInput() {
    return this._certificate.internalValue;
  }

  // eip1 - computed: false, optional: true, required: false
  private _eip1 = new VpnGatewayEip1OutputReference(this, "eip1");
  public get eip1() {
    return this._eip1;
  }
  public putEip1(value: VpnGatewayEip1) {
    this._eip1.internalValue = value;
  }
  public resetEip1() {
    this._eip1.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eip1Input() {
    return this._eip1.internalValue;
  }

  // eip2 - computed: false, optional: true, required: false
  private _eip2 = new VpnGatewayEip2OutputReference(this, "eip2");
  public get eip2() {
    return this._eip2;
  }
  public putEip2(value: VpnGatewayEip2) {
    this._eip2.internalValue = value;
  }
  public resetEip2() {
    this._eip2.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eip2Input() {
    return this._eip2.internalValue;
  }

  // master_eip - computed: false, optional: true, required: false
  private _masterEip = new VpnGatewayMasterEipOutputReference(this, "master_eip");
  public get masterEip() {
    return this._masterEip;
  }
  public putMasterEip(value: VpnGatewayMasterEip) {
    this._masterEip.internalValue = value;
  }
  public resetMasterEip() {
    this._masterEip.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get masterEipInput() {
    return this._masterEip.internalValue;
  }

  // slave_eip - computed: false, optional: true, required: false
  private _slaveEip = new VpnGatewaySlaveEipOutputReference(this, "slave_eip");
  public get slaveEip() {
    return this._slaveEip;
  }
  public putSlaveEip(value: VpnGatewaySlaveEip) {
    this._slaveEip.internalValue = value;
  }
  public resetSlaveEip() {
    this._slaveEip.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get slaveEipInput() {
    return this._slaveEip.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new VpnGatewayTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: VpnGatewayTimeouts) {
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
      access_private_ip_1: cdktf.stringToTerraform(this._accessPrivateIp1),
      access_private_ip_2: cdktf.stringToTerraform(this._accessPrivateIp2),
      access_subnet_id: cdktf.stringToTerraform(this._accessSubnetId),
      access_vpc_id: cdktf.stringToTerraform(this._accessVpcId),
      asn: cdktf.numberToTerraform(this._asn),
      attachment_type: cdktf.stringToTerraform(this._attachmentType),
      availability_zones: cdktf.listMapper(cdktf.stringToTerraform, false)(this._availabilityZones),
      connect_subnet: cdktf.stringToTerraform(this._connectSubnet),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      er_id: cdktf.stringToTerraform(this._erId),
      flavor: cdktf.stringToTerraform(this._flavor),
      ha_mode: cdktf.stringToTerraform(this._haMode),
      id: cdktf.stringToTerraform(this._id),
      local_subnets: cdktf.listMapper(cdktf.stringToTerraform, false)(this._localSubnets),
      name: cdktf.stringToTerraform(this._name),
      network_type: cdktf.stringToTerraform(this._networkType),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      certificate: vpnGatewayCertificateToTerraform(this._certificate.internalValue),
      eip1: vpnGatewayEip1ToTerraform(this._eip1.internalValue),
      eip2: vpnGatewayEip2ToTerraform(this._eip2.internalValue),
      master_eip: vpnGatewayMasterEipToTerraform(this._masterEip.internalValue),
      slave_eip: vpnGatewaySlaveEipToTerraform(this._slaveEip.internalValue),
      timeouts: vpnGatewayTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      access_private_ip_1: {
        value: cdktf.stringToHclTerraform(this._accessPrivateIp1),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      access_private_ip_2: {
        value: cdktf.stringToHclTerraform(this._accessPrivateIp2),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      access_subnet_id: {
        value: cdktf.stringToHclTerraform(this._accessSubnetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      access_vpc_id: {
        value: cdktf.stringToHclTerraform(this._accessVpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      asn: {
        value: cdktf.numberToHclTerraform(this._asn),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      attachment_type: {
        value: cdktf.stringToHclTerraform(this._attachmentType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      availability_zones: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._availabilityZones),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      connect_subnet: {
        value: cdktf.stringToHclTerraform(this._connectSubnet),
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
      er_id: {
        value: cdktf.stringToHclTerraform(this._erId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      flavor: {
        value: cdktf.stringToHclTerraform(this._flavor),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ha_mode: {
        value: cdktf.stringToHclTerraform(this._haMode),
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
      local_subnets: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._localSubnets),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      network_type: {
        value: cdktf.stringToHclTerraform(this._networkType),
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
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      certificate: {
        value: vpnGatewayCertificateToHclTerraform(this._certificate.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpnGatewayCertificateList",
      },
      eip1: {
        value: vpnGatewayEip1ToHclTerraform(this._eip1.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpnGatewayEip1List",
      },
      eip2: {
        value: vpnGatewayEip2ToHclTerraform(this._eip2.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpnGatewayEip2List",
      },
      master_eip: {
        value: vpnGatewayMasterEipToHclTerraform(this._masterEip.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpnGatewayMasterEipList",
      },
      slave_eip: {
        value: vpnGatewaySlaveEipToHclTerraform(this._slaveEip.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpnGatewaySlaveEipList",
      },
      timeouts: {
        value: vpnGatewayTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "VpnGatewayTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

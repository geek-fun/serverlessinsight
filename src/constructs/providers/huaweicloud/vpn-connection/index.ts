// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpnConnectionConfig extends cdktf.TerraformMetaArguments {
  /**
  * The customer gateway ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#customer_gateway_id VpnConnection#customer_gateway_id}
  */
  readonly customerGatewayId: string;
  /**
  * Whether to enable NQA check.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#enable_nqa VpnConnection#enable_nqa}
  */
  readonly enableNqa?: boolean | cdktf.IResolvable;
  /**
  * The enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#enterprise_project_id VpnConnection#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * The VPN gateway ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#gateway_id VpnConnection#gateway_id}
  */
  readonly gatewayId: string;
  /**
  * The VPN gateway IP ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#gateway_ip VpnConnection#gateway_ip}
  */
  readonly gatewayIp: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#ha_role VpnConnection#ha_role}
  */
  readonly haRole?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#id VpnConnection#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the VPN connection.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#name VpnConnection#name}
  */
  readonly name: string;
  /**
  * The customer subnets.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#peer_subnets VpnConnection#peer_subnets}
  */
  readonly peerSubnets?: string[];
  /**
  * The pre-shared key.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#psk VpnConnection#psk}
  */
  readonly psk: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#region VpnConnection#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#tags VpnConnection#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * The local tunnel address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#tunnel_local_address VpnConnection#tunnel_local_address}
  */
  readonly tunnelLocalAddress?: string;
  /**
  * The peer tunnel address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#tunnel_peer_address VpnConnection#tunnel_peer_address}
  */
  readonly tunnelPeerAddress?: string;
  /**
  * The connection type. The value can be **policy**, **static** or **bgp**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#vpn_type VpnConnection#vpn_type}
  */
  readonly vpnType: string;
  /**
  * ikepolicy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#ikepolicy VpnConnection#ikepolicy}
  */
  readonly ikepolicy?: VpnConnectionIkepolicy;
  /**
  * ipsecpolicy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#ipsecpolicy VpnConnection#ipsecpolicy}
  */
  readonly ipsecpolicy?: VpnConnectionIpsecpolicy;
  /**
  * policy_rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#policy_rules VpnConnection#policy_rules}
  */
  readonly policyRules?: VpnConnectionPolicyRules[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#timeouts VpnConnection#timeouts}
  */
  readonly timeouts?: VpnConnectionTimeouts;
}
export interface VpnConnectionIkepolicyDpd {
  /**
  * Specifies the DPD idle timeout period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#interval VpnConnection#interval}
  */
  readonly interval?: number;
  /**
  * Specifies the format of DPD packets.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#msg VpnConnection#msg}
  */
  readonly msg?: string;
  /**
  * Specifies the interval for retransmitting DPD packets.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#timeout VpnConnection#timeout}
  */
  readonly timeout?: number;
}

export function vpnConnectionIkepolicyDpdToTerraform(struct?: VpnConnectionIkepolicyDpdOutputReference | VpnConnectionIkepolicyDpd): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    interval: cdktf.numberToTerraform(struct!.interval),
    msg: cdktf.stringToTerraform(struct!.msg),
    timeout: cdktf.numberToTerraform(struct!.timeout),
  }
}


export function vpnConnectionIkepolicyDpdToHclTerraform(struct?: VpnConnectionIkepolicyDpdOutputReference | VpnConnectionIkepolicyDpd): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    interval: {
      value: cdktf.numberToHclTerraform(struct!.interval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    msg: {
      value: cdktf.stringToHclTerraform(struct!.msg),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    timeout: {
      value: cdktf.numberToHclTerraform(struct!.timeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpnConnectionIkepolicyDpdOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VpnConnectionIkepolicyDpd | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._interval !== undefined) {
      hasAnyValues = true;
      internalValueResult.interval = this._interval;
    }
    if (this._msg !== undefined) {
      hasAnyValues = true;
      internalValueResult.msg = this._msg;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpnConnectionIkepolicyDpd | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._interval = undefined;
      this._msg = undefined;
      this._timeout = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._interval = value.interval;
      this._msg = value.msg;
      this._timeout = value.timeout;
    }
  }

  // interval - computed: true, optional: true, required: false
  private _interval?: number; 
  public get interval() {
    return this.getNumberAttribute('interval');
  }
  public set interval(value: number) {
    this._interval = value;
  }
  public resetInterval() {
    this._interval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get intervalInput() {
    return this._interval;
  }

  // msg - computed: true, optional: true, required: false
  private _msg?: string; 
  public get msg() {
    return this.getStringAttribute('msg');
  }
  public set msg(value: string) {
    this._msg = value;
  }
  public resetMsg() {
    this._msg = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get msgInput() {
    return this._msg;
  }

  // timeout - computed: true, optional: true, required: false
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  public resetTimeout() {
    this._timeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }
}
export interface VpnConnectionIkepolicy {
  /**
  * The authentication algorithm, SHA1 and MD5 are less secure, please use them with caution.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#authentication_algorithm VpnConnection#authentication_algorithm}
  */
  readonly authenticationAlgorithm?: string;
  /**
  * The authentication method during IKE negotiation.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#authentication_method VpnConnection#authentication_method}
  */
  readonly authenticationMethod?: string;
  /**
  * Specifies the DH group used for key exchange in phase 1.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#dh_group VpnConnection#dh_group}
  */
  readonly dhGroup?: string;
  /**
  * The encryption algorithm, 3DES is less secure, please use them with caution.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#encryption_algorithm VpnConnection#encryption_algorithm}
  */
  readonly encryptionAlgorithm?: string;
  /**
  * The IKE negotiation version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#ike_version VpnConnection#ike_version}
  */
  readonly ikeVersion?: string;
  /**
  * The life cycle of SA in seconds, when the life cycle expires, IKE SA will be automatically updated.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#lifetime_seconds VpnConnection#lifetime_seconds}
  */
  readonly lifetimeSeconds?: number;
  /**
  * The local ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#local_id VpnConnection#local_id}
  */
  readonly localId?: string;
  /**
  * The local ID type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#local_id_type VpnConnection#local_id_type}
  */
  readonly localIdType?: string;
  /**
  * The peer ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#peer_id VpnConnection#peer_id}
  */
  readonly peerId?: string;
  /**
  * The peer ID type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#peer_id_type VpnConnection#peer_id_type}
  */
  readonly peerIdType?: string;
  /**
  * The DH key group used by PFS.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#pfs VpnConnection#pfs}
  */
  readonly pfs?: string;
  /**
  * The negotiation mode, only works when the ike_version is v1.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#phase1_negotiation_mode VpnConnection#phase1_negotiation_mode}
  */
  readonly phase1NegotiationMode?: string;
  /**
  * dpd block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#dpd VpnConnection#dpd}
  */
  readonly dpd?: VpnConnectionIkepolicyDpd;
}

export function vpnConnectionIkepolicyToTerraform(struct?: VpnConnectionIkepolicyOutputReference | VpnConnectionIkepolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    authentication_algorithm: cdktf.stringToTerraform(struct!.authenticationAlgorithm),
    authentication_method: cdktf.stringToTerraform(struct!.authenticationMethod),
    dh_group: cdktf.stringToTerraform(struct!.dhGroup),
    encryption_algorithm: cdktf.stringToTerraform(struct!.encryptionAlgorithm),
    ike_version: cdktf.stringToTerraform(struct!.ikeVersion),
    lifetime_seconds: cdktf.numberToTerraform(struct!.lifetimeSeconds),
    local_id: cdktf.stringToTerraform(struct!.localId),
    local_id_type: cdktf.stringToTerraform(struct!.localIdType),
    peer_id: cdktf.stringToTerraform(struct!.peerId),
    peer_id_type: cdktf.stringToTerraform(struct!.peerIdType),
    pfs: cdktf.stringToTerraform(struct!.pfs),
    phase1_negotiation_mode: cdktf.stringToTerraform(struct!.phase1NegotiationMode),
    dpd: vpnConnectionIkepolicyDpdToTerraform(struct!.dpd),
  }
}


export function vpnConnectionIkepolicyToHclTerraform(struct?: VpnConnectionIkepolicyOutputReference | VpnConnectionIkepolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    authentication_algorithm: {
      value: cdktf.stringToHclTerraform(struct!.authenticationAlgorithm),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    authentication_method: {
      value: cdktf.stringToHclTerraform(struct!.authenticationMethod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    dh_group: {
      value: cdktf.stringToHclTerraform(struct!.dhGroup),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    encryption_algorithm: {
      value: cdktf.stringToHclTerraform(struct!.encryptionAlgorithm),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ike_version: {
      value: cdktf.stringToHclTerraform(struct!.ikeVersion),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    lifetime_seconds: {
      value: cdktf.numberToHclTerraform(struct!.lifetimeSeconds),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    local_id: {
      value: cdktf.stringToHclTerraform(struct!.localId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    local_id_type: {
      value: cdktf.stringToHclTerraform(struct!.localIdType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    peer_id: {
      value: cdktf.stringToHclTerraform(struct!.peerId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    peer_id_type: {
      value: cdktf.stringToHclTerraform(struct!.peerIdType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    pfs: {
      value: cdktf.stringToHclTerraform(struct!.pfs),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    phase1_negotiation_mode: {
      value: cdktf.stringToHclTerraform(struct!.phase1NegotiationMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    dpd: {
      value: vpnConnectionIkepolicyDpdToHclTerraform(struct!.dpd),
      isBlock: true,
      type: "list",
      storageClassType: "VpnConnectionIkepolicyDpdList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpnConnectionIkepolicyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VpnConnectionIkepolicy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authenticationAlgorithm !== undefined) {
      hasAnyValues = true;
      internalValueResult.authenticationAlgorithm = this._authenticationAlgorithm;
    }
    if (this._authenticationMethod !== undefined) {
      hasAnyValues = true;
      internalValueResult.authenticationMethod = this._authenticationMethod;
    }
    if (this._dhGroup !== undefined) {
      hasAnyValues = true;
      internalValueResult.dhGroup = this._dhGroup;
    }
    if (this._encryptionAlgorithm !== undefined) {
      hasAnyValues = true;
      internalValueResult.encryptionAlgorithm = this._encryptionAlgorithm;
    }
    if (this._ikeVersion !== undefined) {
      hasAnyValues = true;
      internalValueResult.ikeVersion = this._ikeVersion;
    }
    if (this._lifetimeSeconds !== undefined) {
      hasAnyValues = true;
      internalValueResult.lifetimeSeconds = this._lifetimeSeconds;
    }
    if (this._localId !== undefined) {
      hasAnyValues = true;
      internalValueResult.localId = this._localId;
    }
    if (this._localIdType !== undefined) {
      hasAnyValues = true;
      internalValueResult.localIdType = this._localIdType;
    }
    if (this._peerId !== undefined) {
      hasAnyValues = true;
      internalValueResult.peerId = this._peerId;
    }
    if (this._peerIdType !== undefined) {
      hasAnyValues = true;
      internalValueResult.peerIdType = this._peerIdType;
    }
    if (this._pfs !== undefined) {
      hasAnyValues = true;
      internalValueResult.pfs = this._pfs;
    }
    if (this._phase1NegotiationMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.phase1NegotiationMode = this._phase1NegotiationMode;
    }
    if (this._dpd?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.dpd = this._dpd?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpnConnectionIkepolicy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._authenticationAlgorithm = undefined;
      this._authenticationMethod = undefined;
      this._dhGroup = undefined;
      this._encryptionAlgorithm = undefined;
      this._ikeVersion = undefined;
      this._lifetimeSeconds = undefined;
      this._localId = undefined;
      this._localIdType = undefined;
      this._peerId = undefined;
      this._peerIdType = undefined;
      this._pfs = undefined;
      this._phase1NegotiationMode = undefined;
      this._dpd.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._authenticationAlgorithm = value.authenticationAlgorithm;
      this._authenticationMethod = value.authenticationMethod;
      this._dhGroup = value.dhGroup;
      this._encryptionAlgorithm = value.encryptionAlgorithm;
      this._ikeVersion = value.ikeVersion;
      this._lifetimeSeconds = value.lifetimeSeconds;
      this._localId = value.localId;
      this._localIdType = value.localIdType;
      this._peerId = value.peerId;
      this._peerIdType = value.peerIdType;
      this._pfs = value.pfs;
      this._phase1NegotiationMode = value.phase1NegotiationMode;
      this._dpd.internalValue = value.dpd;
    }
  }

  // authentication_algorithm - computed: true, optional: true, required: false
  private _authenticationAlgorithm?: string; 
  public get authenticationAlgorithm() {
    return this.getStringAttribute('authentication_algorithm');
  }
  public set authenticationAlgorithm(value: string) {
    this._authenticationAlgorithm = value;
  }
  public resetAuthenticationAlgorithm() {
    this._authenticationAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticationAlgorithmInput() {
    return this._authenticationAlgorithm;
  }

  // authentication_method - computed: true, optional: true, required: false
  private _authenticationMethod?: string; 
  public get authenticationMethod() {
    return this.getStringAttribute('authentication_method');
  }
  public set authenticationMethod(value: string) {
    this._authenticationMethod = value;
  }
  public resetAuthenticationMethod() {
    this._authenticationMethod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticationMethodInput() {
    return this._authenticationMethod;
  }

  // dh_group - computed: true, optional: true, required: false
  private _dhGroup?: string; 
  public get dhGroup() {
    return this.getStringAttribute('dh_group');
  }
  public set dhGroup(value: string) {
    this._dhGroup = value;
  }
  public resetDhGroup() {
    this._dhGroup = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dhGroupInput() {
    return this._dhGroup;
  }

  // encryption_algorithm - computed: true, optional: true, required: false
  private _encryptionAlgorithm?: string; 
  public get encryptionAlgorithm() {
    return this.getStringAttribute('encryption_algorithm');
  }
  public set encryptionAlgorithm(value: string) {
    this._encryptionAlgorithm = value;
  }
  public resetEncryptionAlgorithm() {
    this._encryptionAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptionAlgorithmInput() {
    return this._encryptionAlgorithm;
  }

  // ike_version - computed: true, optional: true, required: false
  private _ikeVersion?: string; 
  public get ikeVersion() {
    return this.getStringAttribute('ike_version');
  }
  public set ikeVersion(value: string) {
    this._ikeVersion = value;
  }
  public resetIkeVersion() {
    this._ikeVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ikeVersionInput() {
    return this._ikeVersion;
  }

  // lifetime_seconds - computed: true, optional: true, required: false
  private _lifetimeSeconds?: number; 
  public get lifetimeSeconds() {
    return this.getNumberAttribute('lifetime_seconds');
  }
  public set lifetimeSeconds(value: number) {
    this._lifetimeSeconds = value;
  }
  public resetLifetimeSeconds() {
    this._lifetimeSeconds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lifetimeSecondsInput() {
    return this._lifetimeSeconds;
  }

  // local_id - computed: true, optional: true, required: false
  private _localId?: string; 
  public get localId() {
    return this.getStringAttribute('local_id');
  }
  public set localId(value: string) {
    this._localId = value;
  }
  public resetLocalId() {
    this._localId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get localIdInput() {
    return this._localId;
  }

  // local_id_type - computed: true, optional: true, required: false
  private _localIdType?: string; 
  public get localIdType() {
    return this.getStringAttribute('local_id_type');
  }
  public set localIdType(value: string) {
    this._localIdType = value;
  }
  public resetLocalIdType() {
    this._localIdType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get localIdTypeInput() {
    return this._localIdType;
  }

  // peer_id - computed: true, optional: true, required: false
  private _peerId?: string; 
  public get peerId() {
    return this.getStringAttribute('peer_id');
  }
  public set peerId(value: string) {
    this._peerId = value;
  }
  public resetPeerId() {
    this._peerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get peerIdInput() {
    return this._peerId;
  }

  // peer_id_type - computed: true, optional: true, required: false
  private _peerIdType?: string; 
  public get peerIdType() {
    return this.getStringAttribute('peer_id_type');
  }
  public set peerIdType(value: string) {
    this._peerIdType = value;
  }
  public resetPeerIdType() {
    this._peerIdType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get peerIdTypeInput() {
    return this._peerIdType;
  }

  // pfs - computed: true, optional: true, required: false
  private _pfs?: string; 
  public get pfs() {
    return this.getStringAttribute('pfs');
  }
  public set pfs(value: string) {
    this._pfs = value;
  }
  public resetPfs() {
    this._pfs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pfsInput() {
    return this._pfs;
  }

  // phase1_negotiation_mode - computed: true, optional: true, required: false
  private _phase1NegotiationMode?: string; 
  public get phase1NegotiationMode() {
    return this.getStringAttribute('phase1_negotiation_mode');
  }
  public set phase1NegotiationMode(value: string) {
    this._phase1NegotiationMode = value;
  }
  public resetPhase1NegotiationMode() {
    this._phase1NegotiationMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get phase1NegotiationModeInput() {
    return this._phase1NegotiationMode;
  }

  // dpd - computed: false, optional: true, required: false
  private _dpd = new VpnConnectionIkepolicyDpdOutputReference(this, "dpd");
  public get dpd() {
    return this._dpd;
  }
  public putDpd(value: VpnConnectionIkepolicyDpd) {
    this._dpd.internalValue = value;
  }
  public resetDpd() {
    this._dpd.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dpdInput() {
    return this._dpd.internalValue;
  }
}
export interface VpnConnectionIpsecpolicy {
  /**
  * The authentication algorithm, SHA1 and MD5 are less secure, please use them with caution.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#authentication_algorithm VpnConnection#authentication_algorithm}
  */
  readonly authenticationAlgorithm?: string;
  /**
  * The encapsulation mode, only **tunnel** supported for now.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#encapsulation_mode VpnConnection#encapsulation_mode}
  */
  readonly encapsulationMode?: string;
  /**
  * The encryption algorithm, 3DES is less secure, please use them with caution.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#encryption_algorithm VpnConnection#encryption_algorithm}
  */
  readonly encryptionAlgorithm?: string;
  /**
  * The lifecycle time of Ipsec tunnel in seconds.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#lifetime_seconds VpnConnection#lifetime_seconds}
  */
  readonly lifetimeSeconds?: number;
  /**
  * The DH key group used by PFS.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#pfs VpnConnection#pfs}
  */
  readonly pfs?: string;
  /**
  * The transform protocol. Only **esp** supported for now.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#transform_protocol VpnConnection#transform_protocol}
  */
  readonly transformProtocol?: string;
}

export function vpnConnectionIpsecpolicyToTerraform(struct?: VpnConnectionIpsecpolicyOutputReference | VpnConnectionIpsecpolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    authentication_algorithm: cdktf.stringToTerraform(struct!.authenticationAlgorithm),
    encapsulation_mode: cdktf.stringToTerraform(struct!.encapsulationMode),
    encryption_algorithm: cdktf.stringToTerraform(struct!.encryptionAlgorithm),
    lifetime_seconds: cdktf.numberToTerraform(struct!.lifetimeSeconds),
    pfs: cdktf.stringToTerraform(struct!.pfs),
    transform_protocol: cdktf.stringToTerraform(struct!.transformProtocol),
  }
}


export function vpnConnectionIpsecpolicyToHclTerraform(struct?: VpnConnectionIpsecpolicyOutputReference | VpnConnectionIpsecpolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    authentication_algorithm: {
      value: cdktf.stringToHclTerraform(struct!.authenticationAlgorithm),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    encapsulation_mode: {
      value: cdktf.stringToHclTerraform(struct!.encapsulationMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    encryption_algorithm: {
      value: cdktf.stringToHclTerraform(struct!.encryptionAlgorithm),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    lifetime_seconds: {
      value: cdktf.numberToHclTerraform(struct!.lifetimeSeconds),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    pfs: {
      value: cdktf.stringToHclTerraform(struct!.pfs),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    transform_protocol: {
      value: cdktf.stringToHclTerraform(struct!.transformProtocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpnConnectionIpsecpolicyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VpnConnectionIpsecpolicy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authenticationAlgorithm !== undefined) {
      hasAnyValues = true;
      internalValueResult.authenticationAlgorithm = this._authenticationAlgorithm;
    }
    if (this._encapsulationMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.encapsulationMode = this._encapsulationMode;
    }
    if (this._encryptionAlgorithm !== undefined) {
      hasAnyValues = true;
      internalValueResult.encryptionAlgorithm = this._encryptionAlgorithm;
    }
    if (this._lifetimeSeconds !== undefined) {
      hasAnyValues = true;
      internalValueResult.lifetimeSeconds = this._lifetimeSeconds;
    }
    if (this._pfs !== undefined) {
      hasAnyValues = true;
      internalValueResult.pfs = this._pfs;
    }
    if (this._transformProtocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.transformProtocol = this._transformProtocol;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpnConnectionIpsecpolicy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._authenticationAlgorithm = undefined;
      this._encapsulationMode = undefined;
      this._encryptionAlgorithm = undefined;
      this._lifetimeSeconds = undefined;
      this._pfs = undefined;
      this._transformProtocol = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._authenticationAlgorithm = value.authenticationAlgorithm;
      this._encapsulationMode = value.encapsulationMode;
      this._encryptionAlgorithm = value.encryptionAlgorithm;
      this._lifetimeSeconds = value.lifetimeSeconds;
      this._pfs = value.pfs;
      this._transformProtocol = value.transformProtocol;
    }
  }

  // authentication_algorithm - computed: true, optional: true, required: false
  private _authenticationAlgorithm?: string; 
  public get authenticationAlgorithm() {
    return this.getStringAttribute('authentication_algorithm');
  }
  public set authenticationAlgorithm(value: string) {
    this._authenticationAlgorithm = value;
  }
  public resetAuthenticationAlgorithm() {
    this._authenticationAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authenticationAlgorithmInput() {
    return this._authenticationAlgorithm;
  }

  // encapsulation_mode - computed: true, optional: true, required: false
  private _encapsulationMode?: string; 
  public get encapsulationMode() {
    return this.getStringAttribute('encapsulation_mode');
  }
  public set encapsulationMode(value: string) {
    this._encapsulationMode = value;
  }
  public resetEncapsulationMode() {
    this._encapsulationMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encapsulationModeInput() {
    return this._encapsulationMode;
  }

  // encryption_algorithm - computed: true, optional: true, required: false
  private _encryptionAlgorithm?: string; 
  public get encryptionAlgorithm() {
    return this.getStringAttribute('encryption_algorithm');
  }
  public set encryptionAlgorithm(value: string) {
    this._encryptionAlgorithm = value;
  }
  public resetEncryptionAlgorithm() {
    this._encryptionAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptionAlgorithmInput() {
    return this._encryptionAlgorithm;
  }

  // lifetime_seconds - computed: true, optional: true, required: false
  private _lifetimeSeconds?: number; 
  public get lifetimeSeconds() {
    return this.getNumberAttribute('lifetime_seconds');
  }
  public set lifetimeSeconds(value: number) {
    this._lifetimeSeconds = value;
  }
  public resetLifetimeSeconds() {
    this._lifetimeSeconds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lifetimeSecondsInput() {
    return this._lifetimeSeconds;
  }

  // pfs - computed: true, optional: true, required: false
  private _pfs?: string; 
  public get pfs() {
    return this.getStringAttribute('pfs');
  }
  public set pfs(value: string) {
    this._pfs = value;
  }
  public resetPfs() {
    this._pfs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pfsInput() {
    return this._pfs;
  }

  // transform_protocol - computed: true, optional: true, required: false
  private _transformProtocol?: string; 
  public get transformProtocol() {
    return this.getStringAttribute('transform_protocol');
  }
  public set transformProtocol(value: string) {
    this._transformProtocol = value;
  }
  public resetTransformProtocol() {
    this._transformProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get transformProtocolInput() {
    return this._transformProtocol;
  }
}
export interface VpnConnectionPolicyRules {
  /**
  * The list of destination CIDRs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#destination VpnConnection#destination}
  */
  readonly destination?: string[];
  /**
  * The rule index.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#rule_index VpnConnection#rule_index}
  */
  readonly ruleIndex?: number;
  /**
  * The source CIDR.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#source VpnConnection#source}
  */
  readonly source?: string;
}

export function vpnConnectionPolicyRulesToTerraform(struct?: VpnConnectionPolicyRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    destination: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.destination),
    rule_index: cdktf.numberToTerraform(struct!.ruleIndex),
    source: cdktf.stringToTerraform(struct!.source),
  }
}


export function vpnConnectionPolicyRulesToHclTerraform(struct?: VpnConnectionPolicyRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    destination: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.destination),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    rule_index: {
      value: cdktf.numberToHclTerraform(struct!.ruleIndex),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    source: {
      value: cdktf.stringToHclTerraform(struct!.source),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpnConnectionPolicyRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): VpnConnectionPolicyRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._destination !== undefined) {
      hasAnyValues = true;
      internalValueResult.destination = this._destination;
    }
    if (this._ruleIndex !== undefined) {
      hasAnyValues = true;
      internalValueResult.ruleIndex = this._ruleIndex;
    }
    if (this._source !== undefined) {
      hasAnyValues = true;
      internalValueResult.source = this._source;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpnConnectionPolicyRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._destination = undefined;
      this._ruleIndex = undefined;
      this._source = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._destination = value.destination;
      this._ruleIndex = value.ruleIndex;
      this._source = value.source;
    }
  }

  // destination - computed: true, optional: true, required: false
  private _destination?: string[]; 
  public get destination() {
    return this.getListAttribute('destination');
  }
  public set destination(value: string[]) {
    this._destination = value;
  }
  public resetDestination() {
    this._destination = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationInput() {
    return this._destination;
  }

  // rule_index - computed: true, optional: true, required: false
  private _ruleIndex?: number; 
  public get ruleIndex() {
    return this.getNumberAttribute('rule_index');
  }
  public set ruleIndex(value: number) {
    this._ruleIndex = value;
  }
  public resetRuleIndex() {
    this._ruleIndex = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleIndexInput() {
    return this._ruleIndex;
  }

  // source - computed: true, optional: true, required: false
  private _source?: string; 
  public get source() {
    return this.getStringAttribute('source');
  }
  public set source(value: string) {
    this._source = value;
  }
  public resetSource() {
    this._source = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceInput() {
    return this._source;
  }
}

export class VpnConnectionPolicyRulesList extends cdktf.ComplexList {
  public internalValue? : VpnConnectionPolicyRules[] | cdktf.IResolvable

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
  public get(index: number): VpnConnectionPolicyRulesOutputReference {
    return new VpnConnectionPolicyRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface VpnConnectionTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#create VpnConnection#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#delete VpnConnection#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#update VpnConnection#update}
  */
  readonly update?: string;
}

export function vpnConnectionTimeoutsToTerraform(struct?: VpnConnectionTimeouts | cdktf.IResolvable): any {
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


export function vpnConnectionTimeoutsToHclTerraform(struct?: VpnConnectionTimeouts | cdktf.IResolvable): any {
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

export class VpnConnectionTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): VpnConnectionTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: VpnConnectionTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection huaweicloud_vpn_connection}
*/
export class VpnConnection extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_vpn_connection";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VpnConnection resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VpnConnection to import
  * @param importFromId The id of the existing VpnConnection that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VpnConnection to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_vpn_connection", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vpn_connection huaweicloud_vpn_connection} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VpnConnectionConfig
  */
  public constructor(scope: Construct, id: string, config: VpnConnectionConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_vpn_connection',
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
    this._customerGatewayId = config.customerGatewayId;
    this._enableNqa = config.enableNqa;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._gatewayId = config.gatewayId;
    this._gatewayIp = config.gatewayIp;
    this._haRole = config.haRole;
    this._id = config.id;
    this._name = config.name;
    this._peerSubnets = config.peerSubnets;
    this._psk = config.psk;
    this._region = config.region;
    this._tags = config.tags;
    this._tunnelLocalAddress = config.tunnelLocalAddress;
    this._tunnelPeerAddress = config.tunnelPeerAddress;
    this._vpnType = config.vpnType;
    this._ikepolicy.internalValue = config.ikepolicy;
    this._ipsecpolicy.internalValue = config.ipsecpolicy;
    this._policyRules.internalValue = config.policyRules;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // customer_gateway_id - computed: false, optional: false, required: true
  private _customerGatewayId?: string; 
  public get customerGatewayId() {
    return this.getStringAttribute('customer_gateway_id');
  }
  public set customerGatewayId(value: string) {
    this._customerGatewayId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get customerGatewayIdInput() {
    return this._customerGatewayId;
  }

  // enable_nqa - computed: true, optional: true, required: false
  private _enableNqa?: boolean | cdktf.IResolvable; 
  public get enableNqa() {
    return this.getBooleanAttribute('enable_nqa');
  }
  public set enableNqa(value: boolean | cdktf.IResolvable) {
    this._enableNqa = value;
  }
  public resetEnableNqa() {
    this._enableNqa = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableNqaInput() {
    return this._enableNqa;
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

  // gateway_ip - computed: false, optional: false, required: true
  private _gatewayIp?: string; 
  public get gatewayIp() {
    return this.getStringAttribute('gateway_ip');
  }
  public set gatewayIp(value: string) {
    this._gatewayIp = value;
  }
  // Temporarily expose input value. Use with caution.
  public get gatewayIpInput() {
    return this._gatewayIp;
  }

  // ha_role - computed: true, optional: true, required: false
  private _haRole?: string; 
  public get haRole() {
    return this.getStringAttribute('ha_role');
  }
  public set haRole(value: string) {
    this._haRole = value;
  }
  public resetHaRole() {
    this._haRole = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get haRoleInput() {
    return this._haRole;
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

  // peer_subnets - computed: true, optional: true, required: false
  private _peerSubnets?: string[]; 
  public get peerSubnets() {
    return this.getListAttribute('peer_subnets');
  }
  public set peerSubnets(value: string[]) {
    this._peerSubnets = value;
  }
  public resetPeerSubnets() {
    this._peerSubnets = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get peerSubnetsInput() {
    return this._peerSubnets;
  }

  // psk - computed: false, optional: false, required: true
  private _psk?: string; 
  public get psk() {
    return this.getStringAttribute('psk');
  }
  public set psk(value: string) {
    this._psk = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pskInput() {
    return this._psk;
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

  // tunnel_local_address - computed: true, optional: true, required: false
  private _tunnelLocalAddress?: string; 
  public get tunnelLocalAddress() {
    return this.getStringAttribute('tunnel_local_address');
  }
  public set tunnelLocalAddress(value: string) {
    this._tunnelLocalAddress = value;
  }
  public resetTunnelLocalAddress() {
    this._tunnelLocalAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tunnelLocalAddressInput() {
    return this._tunnelLocalAddress;
  }

  // tunnel_peer_address - computed: true, optional: true, required: false
  private _tunnelPeerAddress?: string; 
  public get tunnelPeerAddress() {
    return this.getStringAttribute('tunnel_peer_address');
  }
  public set tunnelPeerAddress(value: string) {
    this._tunnelPeerAddress = value;
  }
  public resetTunnelPeerAddress() {
    this._tunnelPeerAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tunnelPeerAddressInput() {
    return this._tunnelPeerAddress;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // vpn_type - computed: false, optional: false, required: true
  private _vpnType?: string; 
  public get vpnType() {
    return this.getStringAttribute('vpn_type');
  }
  public set vpnType(value: string) {
    this._vpnType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vpnTypeInput() {
    return this._vpnType;
  }

  // ikepolicy - computed: false, optional: true, required: false
  private _ikepolicy = new VpnConnectionIkepolicyOutputReference(this, "ikepolicy");
  public get ikepolicy() {
    return this._ikepolicy;
  }
  public putIkepolicy(value: VpnConnectionIkepolicy) {
    this._ikepolicy.internalValue = value;
  }
  public resetIkepolicy() {
    this._ikepolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ikepolicyInput() {
    return this._ikepolicy.internalValue;
  }

  // ipsecpolicy - computed: false, optional: true, required: false
  private _ipsecpolicy = new VpnConnectionIpsecpolicyOutputReference(this, "ipsecpolicy");
  public get ipsecpolicy() {
    return this._ipsecpolicy;
  }
  public putIpsecpolicy(value: VpnConnectionIpsecpolicy) {
    this._ipsecpolicy.internalValue = value;
  }
  public resetIpsecpolicy() {
    this._ipsecpolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipsecpolicyInput() {
    return this._ipsecpolicy.internalValue;
  }

  // policy_rules - computed: false, optional: true, required: false
  private _policyRules = new VpnConnectionPolicyRulesList(this, "policy_rules", false);
  public get policyRules() {
    return this._policyRules;
  }
  public putPolicyRules(value: VpnConnectionPolicyRules[] | cdktf.IResolvable) {
    this._policyRules.internalValue = value;
  }
  public resetPolicyRules() {
    this._policyRules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyRulesInput() {
    return this._policyRules.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new VpnConnectionTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: VpnConnectionTimeouts) {
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
      customer_gateway_id: cdktf.stringToTerraform(this._customerGatewayId),
      enable_nqa: cdktf.booleanToTerraform(this._enableNqa),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      gateway_id: cdktf.stringToTerraform(this._gatewayId),
      gateway_ip: cdktf.stringToTerraform(this._gatewayIp),
      ha_role: cdktf.stringToTerraform(this._haRole),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      peer_subnets: cdktf.listMapper(cdktf.stringToTerraform, false)(this._peerSubnets),
      psk: cdktf.stringToTerraform(this._psk),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      tunnel_local_address: cdktf.stringToTerraform(this._tunnelLocalAddress),
      tunnel_peer_address: cdktf.stringToTerraform(this._tunnelPeerAddress),
      vpn_type: cdktf.stringToTerraform(this._vpnType),
      ikepolicy: vpnConnectionIkepolicyToTerraform(this._ikepolicy.internalValue),
      ipsecpolicy: vpnConnectionIpsecpolicyToTerraform(this._ipsecpolicy.internalValue),
      policy_rules: cdktf.listMapper(vpnConnectionPolicyRulesToTerraform, true)(this._policyRules.internalValue),
      timeouts: vpnConnectionTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      customer_gateway_id: {
        value: cdktf.stringToHclTerraform(this._customerGatewayId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_nqa: {
        value: cdktf.booleanToHclTerraform(this._enableNqa),
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
      gateway_id: {
        value: cdktf.stringToHclTerraform(this._gatewayId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      gateway_ip: {
        value: cdktf.stringToHclTerraform(this._gatewayIp),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ha_role: {
        value: cdktf.stringToHclTerraform(this._haRole),
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
      peer_subnets: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._peerSubnets),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      psk: {
        value: cdktf.stringToHclTerraform(this._psk),
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
      tunnel_local_address: {
        value: cdktf.stringToHclTerraform(this._tunnelLocalAddress),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tunnel_peer_address: {
        value: cdktf.stringToHclTerraform(this._tunnelPeerAddress),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vpn_type: {
        value: cdktf.stringToHclTerraform(this._vpnType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ikepolicy: {
        value: vpnConnectionIkepolicyToHclTerraform(this._ikepolicy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpnConnectionIkepolicyList",
      },
      ipsecpolicy: {
        value: vpnConnectionIpsecpolicyToHclTerraform(this._ipsecpolicy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpnConnectionIpsecpolicyList",
      },
      policy_rules: {
        value: cdktf.listMapperHcl(vpnConnectionPolicyRulesToHclTerraform, true)(this._policyRules.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpnConnectionPolicyRulesList",
      },
      timeouts: {
        value: vpnConnectionTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "VpnConnectionTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

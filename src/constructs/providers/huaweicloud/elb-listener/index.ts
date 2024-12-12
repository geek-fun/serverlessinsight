// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ElbListenerConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#access_policy ElbListener#access_policy}
  */
  readonly accessPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#advanced_forwarding_enabled ElbListener#advanced_forwarding_enabled}
  */
  readonly advancedForwardingEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#ca_certificate ElbListener#ca_certificate}
  */
  readonly caCertificate?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#default_pool_id ElbListener#default_pool_id}
  */
  readonly defaultPoolId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#description ElbListener#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#enable_member_retry ElbListener#enable_member_retry}
  */
  readonly enableMemberRetry?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#force_delete ElbListener#force_delete}
  */
  readonly forceDelete?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#forward_eip ElbListener#forward_eip}
  */
  readonly forwardEip?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#forward_elb ElbListener#forward_elb}
  */
  readonly forwardElb?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#forward_host ElbListener#forward_host}
  */
  readonly forwardHost?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#forward_port ElbListener#forward_port}
  */
  readonly forwardPort?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#forward_proto ElbListener#forward_proto}
  */
  readonly forwardProto?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#forward_request_port ElbListener#forward_request_port}
  */
  readonly forwardRequestPort?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#forward_tls_certificate ElbListener#forward_tls_certificate}
  */
  readonly forwardTlsCertificate?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#forward_tls_cipher ElbListener#forward_tls_cipher}
  */
  readonly forwardTlsCipher?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#forward_tls_protocol ElbListener#forward_tls_protocol}
  */
  readonly forwardTlsProtocol?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#gzip_enable ElbListener#gzip_enable}
  */
  readonly gzipEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#http2_enable ElbListener#http2_enable}
  */
  readonly http2Enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#id ElbListener#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#idle_timeout ElbListener#idle_timeout}
  */
  readonly idleTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#ip_group ElbListener#ip_group}
  */
  readonly ipGroup?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#loadbalancer_id ElbListener#loadbalancer_id}
  */
  readonly loadbalancerId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#name ElbListener#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#protection_reason ElbListener#protection_reason}
  */
  readonly protectionReason?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#protection_status ElbListener#protection_status}
  */
  readonly protectionStatus?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#protocol ElbListener#protocol}
  */
  readonly protocol: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#protocol_port ElbListener#protocol_port}
  */
  readonly protocolPort?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#proxy_protocol_enable ElbListener#proxy_protocol_enable}
  */
  readonly proxyProtocolEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#quic_listener_id ElbListener#quic_listener_id}
  */
  readonly quicListenerId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#real_ip ElbListener#real_ip}
  */
  readonly realIp?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#region ElbListener#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#request_timeout ElbListener#request_timeout}
  */
  readonly requestTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#response_timeout ElbListener#response_timeout}
  */
  readonly responseTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#security_policy_id ElbListener#security_policy_id}
  */
  readonly securityPolicyId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#server_certificate ElbListener#server_certificate}
  */
  readonly serverCertificate?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#sni_certificate ElbListener#sni_certificate}
  */
  readonly sniCertificate?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#sni_match_algo ElbListener#sni_match_algo}
  */
  readonly sniMatchAlgo?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#ssl_early_data_enable ElbListener#ssl_early_data_enable}
  */
  readonly sslEarlyDataEnable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#tags ElbListener#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#tls_ciphers_policy ElbListener#tls_ciphers_policy}
  */
  readonly tlsCiphersPolicy?: string;
  /**
  * port_ranges block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#port_ranges ElbListener#port_ranges}
  */
  readonly portRanges?: ElbListenerPortRanges[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#timeouts ElbListener#timeouts}
  */
  readonly timeouts?: ElbListenerTimeouts;
}
export interface ElbListenerPortRanges {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#end_port ElbListener#end_port}
  */
  readonly endPort: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#start_port ElbListener#start_port}
  */
  readonly startPort: number;
}

export function elbListenerPortRangesToTerraform(struct?: ElbListenerPortRanges | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    end_port: cdktf.numberToTerraform(struct!.endPort),
    start_port: cdktf.numberToTerraform(struct!.startPort),
  }
}


export function elbListenerPortRangesToHclTerraform(struct?: ElbListenerPortRanges | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    end_port: {
      value: cdktf.numberToHclTerraform(struct!.endPort),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    start_port: {
      value: cdktf.numberToHclTerraform(struct!.startPort),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ElbListenerPortRangesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ElbListenerPortRanges | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._endPort !== undefined) {
      hasAnyValues = true;
      internalValueResult.endPort = this._endPort;
    }
    if (this._startPort !== undefined) {
      hasAnyValues = true;
      internalValueResult.startPort = this._startPort;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ElbListenerPortRanges | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._endPort = undefined;
      this._startPort = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._endPort = value.endPort;
      this._startPort = value.startPort;
    }
  }

  // end_port - computed: false, optional: false, required: true
  private _endPort?: number; 
  public get endPort() {
    return this.getNumberAttribute('end_port');
  }
  public set endPort(value: number) {
    this._endPort = value;
  }
  // Temporarily expose input value. Use with caution.
  public get endPortInput() {
    return this._endPort;
  }

  // start_port - computed: false, optional: false, required: true
  private _startPort?: number; 
  public get startPort() {
    return this.getNumberAttribute('start_port');
  }
  public set startPort(value: number) {
    this._startPort = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startPortInput() {
    return this._startPort;
  }
}

export class ElbListenerPortRangesList extends cdktf.ComplexList {
  public internalValue? : ElbListenerPortRanges[] | cdktf.IResolvable

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
  public get(index: number): ElbListenerPortRangesOutputReference {
    return new ElbListenerPortRangesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ElbListenerTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#create ElbListener#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#delete ElbListener#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#update ElbListener#update}
  */
  readonly update?: string;
}

export function elbListenerTimeoutsToTerraform(struct?: ElbListenerTimeouts | cdktf.IResolvable): any {
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


export function elbListenerTimeoutsToHclTerraform(struct?: ElbListenerTimeouts | cdktf.IResolvable): any {
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

export class ElbListenerTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): ElbListenerTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: ElbListenerTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener huaweicloud_elb_listener}
*/
export class ElbListener extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_elb_listener";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ElbListener resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ElbListener to import
  * @param importFromId The id of the existing ElbListener that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ElbListener to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_elb_listener", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/elb_listener huaweicloud_elb_listener} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ElbListenerConfig
  */
  public constructor(scope: Construct, id: string, config: ElbListenerConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_elb_listener',
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
    this._accessPolicy = config.accessPolicy;
    this._advancedForwardingEnabled = config.advancedForwardingEnabled;
    this._caCertificate = config.caCertificate;
    this._defaultPoolId = config.defaultPoolId;
    this._description = config.description;
    this._enableMemberRetry = config.enableMemberRetry;
    this._forceDelete = config.forceDelete;
    this._forwardEip = config.forwardEip;
    this._forwardElb = config.forwardElb;
    this._forwardHost = config.forwardHost;
    this._forwardPort = config.forwardPort;
    this._forwardProto = config.forwardProto;
    this._forwardRequestPort = config.forwardRequestPort;
    this._forwardTlsCertificate = config.forwardTlsCertificate;
    this._forwardTlsCipher = config.forwardTlsCipher;
    this._forwardTlsProtocol = config.forwardTlsProtocol;
    this._gzipEnable = config.gzipEnable;
    this._http2Enable = config.http2Enable;
    this._id = config.id;
    this._idleTimeout = config.idleTimeout;
    this._ipGroup = config.ipGroup;
    this._loadbalancerId = config.loadbalancerId;
    this._name = config.name;
    this._protectionReason = config.protectionReason;
    this._protectionStatus = config.protectionStatus;
    this._protocol = config.protocol;
    this._protocolPort = config.protocolPort;
    this._proxyProtocolEnable = config.proxyProtocolEnable;
    this._quicListenerId = config.quicListenerId;
    this._realIp = config.realIp;
    this._region = config.region;
    this._requestTimeout = config.requestTimeout;
    this._responseTimeout = config.responseTimeout;
    this._securityPolicyId = config.securityPolicyId;
    this._serverCertificate = config.serverCertificate;
    this._sniCertificate = config.sniCertificate;
    this._sniMatchAlgo = config.sniMatchAlgo;
    this._sslEarlyDataEnable = config.sslEarlyDataEnable;
    this._tags = config.tags;
    this._tlsCiphersPolicy = config.tlsCiphersPolicy;
    this._portRanges.internalValue = config.portRanges;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_policy - computed: false, optional: true, required: false
  private _accessPolicy?: string; 
  public get accessPolicy() {
    return this.getStringAttribute('access_policy');
  }
  public set accessPolicy(value: string) {
    this._accessPolicy = value;
  }
  public resetAccessPolicy() {
    this._accessPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessPolicyInput() {
    return this._accessPolicy;
  }

  // advanced_forwarding_enabled - computed: true, optional: true, required: false
  private _advancedForwardingEnabled?: boolean | cdktf.IResolvable; 
  public get advancedForwardingEnabled() {
    return this.getBooleanAttribute('advanced_forwarding_enabled');
  }
  public set advancedForwardingEnabled(value: boolean | cdktf.IResolvable) {
    this._advancedForwardingEnabled = value;
  }
  public resetAdvancedForwardingEnabled() {
    this._advancedForwardingEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get advancedForwardingEnabledInput() {
    return this._advancedForwardingEnabled;
  }

  // ca_certificate - computed: false, optional: true, required: false
  private _caCertificate?: string; 
  public get caCertificate() {
    return this.getStringAttribute('ca_certificate');
  }
  public set caCertificate(value: string) {
    this._caCertificate = value;
  }
  public resetCaCertificate() {
    this._caCertificate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get caCertificateInput() {
    return this._caCertificate;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // default_pool_id - computed: true, optional: true, required: false
  private _defaultPoolId?: string; 
  public get defaultPoolId() {
    return this.getStringAttribute('default_pool_id');
  }
  public set defaultPoolId(value: string) {
    this._defaultPoolId = value;
  }
  public resetDefaultPoolId() {
    this._defaultPoolId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultPoolIdInput() {
    return this._defaultPoolId;
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

  // enable_member_retry - computed: true, optional: true, required: false
  private _enableMemberRetry?: boolean | cdktf.IResolvable; 
  public get enableMemberRetry() {
    return this.getBooleanAttribute('enable_member_retry');
  }
  public set enableMemberRetry(value: boolean | cdktf.IResolvable) {
    this._enableMemberRetry = value;
  }
  public resetEnableMemberRetry() {
    this._enableMemberRetry = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableMemberRetryInput() {
    return this._enableMemberRetry;
  }

  // force_delete - computed: false, optional: true, required: false
  private _forceDelete?: boolean | cdktf.IResolvable; 
  public get forceDelete() {
    return this.getBooleanAttribute('force_delete');
  }
  public set forceDelete(value: boolean | cdktf.IResolvable) {
    this._forceDelete = value;
  }
  public resetForceDelete() {
    this._forceDelete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forceDeleteInput() {
    return this._forceDelete;
  }

  // forward_eip - computed: true, optional: true, required: false
  private _forwardEip?: boolean | cdktf.IResolvable; 
  public get forwardEip() {
    return this.getBooleanAttribute('forward_eip');
  }
  public set forwardEip(value: boolean | cdktf.IResolvable) {
    this._forwardEip = value;
  }
  public resetForwardEip() {
    this._forwardEip = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardEipInput() {
    return this._forwardEip;
  }

  // forward_elb - computed: true, optional: true, required: false
  private _forwardElb?: boolean | cdktf.IResolvable; 
  public get forwardElb() {
    return this.getBooleanAttribute('forward_elb');
  }
  public set forwardElb(value: boolean | cdktf.IResolvable) {
    this._forwardElb = value;
  }
  public resetForwardElb() {
    this._forwardElb = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardElbInput() {
    return this._forwardElb;
  }

  // forward_host - computed: false, optional: true, required: false
  private _forwardHost?: boolean | cdktf.IResolvable; 
  public get forwardHost() {
    return this.getBooleanAttribute('forward_host');
  }
  public set forwardHost(value: boolean | cdktf.IResolvable) {
    this._forwardHost = value;
  }
  public resetForwardHost() {
    this._forwardHost = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardHostInput() {
    return this._forwardHost;
  }

  // forward_port - computed: true, optional: true, required: false
  private _forwardPort?: boolean | cdktf.IResolvable; 
  public get forwardPort() {
    return this.getBooleanAttribute('forward_port');
  }
  public set forwardPort(value: boolean | cdktf.IResolvable) {
    this._forwardPort = value;
  }
  public resetForwardPort() {
    this._forwardPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardPortInput() {
    return this._forwardPort;
  }

  // forward_proto - computed: true, optional: true, required: false
  private _forwardProto?: boolean | cdktf.IResolvable; 
  public get forwardProto() {
    return this.getBooleanAttribute('forward_proto');
  }
  public set forwardProto(value: boolean | cdktf.IResolvable) {
    this._forwardProto = value;
  }
  public resetForwardProto() {
    this._forwardProto = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardProtoInput() {
    return this._forwardProto;
  }

  // forward_request_port - computed: true, optional: true, required: false
  private _forwardRequestPort?: boolean | cdktf.IResolvable; 
  public get forwardRequestPort() {
    return this.getBooleanAttribute('forward_request_port');
  }
  public set forwardRequestPort(value: boolean | cdktf.IResolvable) {
    this._forwardRequestPort = value;
  }
  public resetForwardRequestPort() {
    this._forwardRequestPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardRequestPortInput() {
    return this._forwardRequestPort;
  }

  // forward_tls_certificate - computed: true, optional: true, required: false
  private _forwardTlsCertificate?: boolean | cdktf.IResolvable; 
  public get forwardTlsCertificate() {
    return this.getBooleanAttribute('forward_tls_certificate');
  }
  public set forwardTlsCertificate(value: boolean | cdktf.IResolvable) {
    this._forwardTlsCertificate = value;
  }
  public resetForwardTlsCertificate() {
    this._forwardTlsCertificate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardTlsCertificateInput() {
    return this._forwardTlsCertificate;
  }

  // forward_tls_cipher - computed: true, optional: true, required: false
  private _forwardTlsCipher?: boolean | cdktf.IResolvable; 
  public get forwardTlsCipher() {
    return this.getBooleanAttribute('forward_tls_cipher');
  }
  public set forwardTlsCipher(value: boolean | cdktf.IResolvable) {
    this._forwardTlsCipher = value;
  }
  public resetForwardTlsCipher() {
    this._forwardTlsCipher = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardTlsCipherInput() {
    return this._forwardTlsCipher;
  }

  // forward_tls_protocol - computed: true, optional: true, required: false
  private _forwardTlsProtocol?: boolean | cdktf.IResolvable; 
  public get forwardTlsProtocol() {
    return this.getBooleanAttribute('forward_tls_protocol');
  }
  public set forwardTlsProtocol(value: boolean | cdktf.IResolvable) {
    this._forwardTlsProtocol = value;
  }
  public resetForwardTlsProtocol() {
    this._forwardTlsProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardTlsProtocolInput() {
    return this._forwardTlsProtocol;
  }

  // gzip_enable - computed: true, optional: true, required: false
  private _gzipEnable?: boolean | cdktf.IResolvable; 
  public get gzipEnable() {
    return this.getBooleanAttribute('gzip_enable');
  }
  public set gzipEnable(value: boolean | cdktf.IResolvable) {
    this._gzipEnable = value;
  }
  public resetGzipEnable() {
    this._gzipEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gzipEnableInput() {
    return this._gzipEnable;
  }

  // http2_enable - computed: true, optional: true, required: false
  private _http2Enable?: boolean | cdktf.IResolvable; 
  public get http2Enable() {
    return this.getBooleanAttribute('http2_enable');
  }
  public set http2Enable(value: boolean | cdktf.IResolvable) {
    this._http2Enable = value;
  }
  public resetHttp2Enable() {
    this._http2Enable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get http2EnableInput() {
    return this._http2Enable;
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

  // idle_timeout - computed: true, optional: true, required: false
  private _idleTimeout?: number; 
  public get idleTimeout() {
    return this.getNumberAttribute('idle_timeout');
  }
  public set idleTimeout(value: number) {
    this._idleTimeout = value;
  }
  public resetIdleTimeout() {
    this._idleTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idleTimeoutInput() {
    return this._idleTimeout;
  }

  // ip_group - computed: false, optional: true, required: false
  private _ipGroup?: string; 
  public get ipGroup() {
    return this.getStringAttribute('ip_group');
  }
  public set ipGroup(value: string) {
    this._ipGroup = value;
  }
  public resetIpGroup() {
    this._ipGroup = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipGroupInput() {
    return this._ipGroup;
  }

  // loadbalancer_id - computed: false, optional: false, required: true
  private _loadbalancerId?: string; 
  public get loadbalancerId() {
    return this.getStringAttribute('loadbalancer_id');
  }
  public set loadbalancerId(value: string) {
    this._loadbalancerId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get loadbalancerIdInput() {
    return this._loadbalancerId;
  }

  // name - computed: true, optional: true, required: false
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

  // protection_reason - computed: false, optional: true, required: false
  private _protectionReason?: string; 
  public get protectionReason() {
    return this.getStringAttribute('protection_reason');
  }
  public set protectionReason(value: string) {
    this._protectionReason = value;
  }
  public resetProtectionReason() {
    this._protectionReason = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protectionReasonInput() {
    return this._protectionReason;
  }

  // protection_status - computed: true, optional: true, required: false
  private _protectionStatus?: string; 
  public get protectionStatus() {
    return this.getStringAttribute('protection_status');
  }
  public set protectionStatus(value: string) {
    this._protectionStatus = value;
  }
  public resetProtectionStatus() {
    this._protectionStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protectionStatusInput() {
    return this._protectionStatus;
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

  // protocol_port - computed: true, optional: true, required: false
  private _protocolPort?: number; 
  public get protocolPort() {
    return this.getNumberAttribute('protocol_port');
  }
  public set protocolPort(value: number) {
    this._protocolPort = value;
  }
  public resetProtocolPort() {
    this._protocolPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolPortInput() {
    return this._protocolPort;
  }

  // proxy_protocol_enable - computed: true, optional: true, required: false
  private _proxyProtocolEnable?: boolean | cdktf.IResolvable; 
  public get proxyProtocolEnable() {
    return this.getBooleanAttribute('proxy_protocol_enable');
  }
  public set proxyProtocolEnable(value: boolean | cdktf.IResolvable) {
    this._proxyProtocolEnable = value;
  }
  public resetProxyProtocolEnable() {
    this._proxyProtocolEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get proxyProtocolEnableInput() {
    return this._proxyProtocolEnable;
  }

  // quic_listener_id - computed: false, optional: true, required: false
  private _quicListenerId?: string; 
  public get quicListenerId() {
    return this.getStringAttribute('quic_listener_id');
  }
  public set quicListenerId(value: string) {
    this._quicListenerId = value;
  }
  public resetQuicListenerId() {
    this._quicListenerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get quicListenerIdInput() {
    return this._quicListenerId;
  }

  // real_ip - computed: true, optional: true, required: false
  private _realIp?: boolean | cdktf.IResolvable; 
  public get realIp() {
    return this.getBooleanAttribute('real_ip');
  }
  public set realIp(value: boolean | cdktf.IResolvable) {
    this._realIp = value;
  }
  public resetRealIp() {
    this._realIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get realIpInput() {
    return this._realIp;
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

  // request_timeout - computed: true, optional: true, required: false
  private _requestTimeout?: number; 
  public get requestTimeout() {
    return this.getNumberAttribute('request_timeout');
  }
  public set requestTimeout(value: number) {
    this._requestTimeout = value;
  }
  public resetRequestTimeout() {
    this._requestTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestTimeoutInput() {
    return this._requestTimeout;
  }

  // response_timeout - computed: true, optional: true, required: false
  private _responseTimeout?: number; 
  public get responseTimeout() {
    return this.getNumberAttribute('response_timeout');
  }
  public set responseTimeout(value: number) {
    this._responseTimeout = value;
  }
  public resetResponseTimeout() {
    this._responseTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get responseTimeoutInput() {
    return this._responseTimeout;
  }

  // security_policy_id - computed: false, optional: true, required: false
  private _securityPolicyId?: string; 
  public get securityPolicyId() {
    return this.getStringAttribute('security_policy_id');
  }
  public set securityPolicyId(value: string) {
    this._securityPolicyId = value;
  }
  public resetSecurityPolicyId() {
    this._securityPolicyId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityPolicyIdInput() {
    return this._securityPolicyId;
  }

  // server_certificate - computed: false, optional: true, required: false
  private _serverCertificate?: string; 
  public get serverCertificate() {
    return this.getStringAttribute('server_certificate');
  }
  public set serverCertificate(value: string) {
    this._serverCertificate = value;
  }
  public resetServerCertificate() {
    this._serverCertificate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serverCertificateInput() {
    return this._serverCertificate;
  }

  // sni_certificate - computed: false, optional: true, required: false
  private _sniCertificate?: string[]; 
  public get sniCertificate() {
    return this.getListAttribute('sni_certificate');
  }
  public set sniCertificate(value: string[]) {
    this._sniCertificate = value;
  }
  public resetSniCertificate() {
    this._sniCertificate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sniCertificateInput() {
    return this._sniCertificate;
  }

  // sni_match_algo - computed: true, optional: true, required: false
  private _sniMatchAlgo?: string; 
  public get sniMatchAlgo() {
    return this.getStringAttribute('sni_match_algo');
  }
  public set sniMatchAlgo(value: string) {
    this._sniMatchAlgo = value;
  }
  public resetSniMatchAlgo() {
    this._sniMatchAlgo = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sniMatchAlgoInput() {
    return this._sniMatchAlgo;
  }

  // ssl_early_data_enable - computed: false, optional: true, required: false
  private _sslEarlyDataEnable?: boolean | cdktf.IResolvable; 
  public get sslEarlyDataEnable() {
    return this.getBooleanAttribute('ssl_early_data_enable');
  }
  public set sslEarlyDataEnable(value: boolean | cdktf.IResolvable) {
    this._sslEarlyDataEnable = value;
  }
  public resetSslEarlyDataEnable() {
    this._sslEarlyDataEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslEarlyDataEnableInput() {
    return this._sslEarlyDataEnable;
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

  // tls_ciphers_policy - computed: true, optional: true, required: false
  private _tlsCiphersPolicy?: string; 
  public get tlsCiphersPolicy() {
    return this.getStringAttribute('tls_ciphers_policy');
  }
  public set tlsCiphersPolicy(value: string) {
    this._tlsCiphersPolicy = value;
  }
  public resetTlsCiphersPolicy() {
    this._tlsCiphersPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tlsCiphersPolicyInput() {
    return this._tlsCiphersPolicy;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // port_ranges - computed: false, optional: true, required: false
  private _portRanges = new ElbListenerPortRangesList(this, "port_ranges", true);
  public get portRanges() {
    return this._portRanges;
  }
  public putPortRanges(value: ElbListenerPortRanges[] | cdktf.IResolvable) {
    this._portRanges.internalValue = value;
  }
  public resetPortRanges() {
    this._portRanges.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portRangesInput() {
    return this._portRanges.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new ElbListenerTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: ElbListenerTimeouts) {
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
      access_policy: cdktf.stringToTerraform(this._accessPolicy),
      advanced_forwarding_enabled: cdktf.booleanToTerraform(this._advancedForwardingEnabled),
      ca_certificate: cdktf.stringToTerraform(this._caCertificate),
      default_pool_id: cdktf.stringToTerraform(this._defaultPoolId),
      description: cdktf.stringToTerraform(this._description),
      enable_member_retry: cdktf.booleanToTerraform(this._enableMemberRetry),
      force_delete: cdktf.booleanToTerraform(this._forceDelete),
      forward_eip: cdktf.booleanToTerraform(this._forwardEip),
      forward_elb: cdktf.booleanToTerraform(this._forwardElb),
      forward_host: cdktf.booleanToTerraform(this._forwardHost),
      forward_port: cdktf.booleanToTerraform(this._forwardPort),
      forward_proto: cdktf.booleanToTerraform(this._forwardProto),
      forward_request_port: cdktf.booleanToTerraform(this._forwardRequestPort),
      forward_tls_certificate: cdktf.booleanToTerraform(this._forwardTlsCertificate),
      forward_tls_cipher: cdktf.booleanToTerraform(this._forwardTlsCipher),
      forward_tls_protocol: cdktf.booleanToTerraform(this._forwardTlsProtocol),
      gzip_enable: cdktf.booleanToTerraform(this._gzipEnable),
      http2_enable: cdktf.booleanToTerraform(this._http2Enable),
      id: cdktf.stringToTerraform(this._id),
      idle_timeout: cdktf.numberToTerraform(this._idleTimeout),
      ip_group: cdktf.stringToTerraform(this._ipGroup),
      loadbalancer_id: cdktf.stringToTerraform(this._loadbalancerId),
      name: cdktf.stringToTerraform(this._name),
      protection_reason: cdktf.stringToTerraform(this._protectionReason),
      protection_status: cdktf.stringToTerraform(this._protectionStatus),
      protocol: cdktf.stringToTerraform(this._protocol),
      protocol_port: cdktf.numberToTerraform(this._protocolPort),
      proxy_protocol_enable: cdktf.booleanToTerraform(this._proxyProtocolEnable),
      quic_listener_id: cdktf.stringToTerraform(this._quicListenerId),
      real_ip: cdktf.booleanToTerraform(this._realIp),
      region: cdktf.stringToTerraform(this._region),
      request_timeout: cdktf.numberToTerraform(this._requestTimeout),
      response_timeout: cdktf.numberToTerraform(this._responseTimeout),
      security_policy_id: cdktf.stringToTerraform(this._securityPolicyId),
      server_certificate: cdktf.stringToTerraform(this._serverCertificate),
      sni_certificate: cdktf.listMapper(cdktf.stringToTerraform, false)(this._sniCertificate),
      sni_match_algo: cdktf.stringToTerraform(this._sniMatchAlgo),
      ssl_early_data_enable: cdktf.booleanToTerraform(this._sslEarlyDataEnable),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      tls_ciphers_policy: cdktf.stringToTerraform(this._tlsCiphersPolicy),
      port_ranges: cdktf.listMapper(elbListenerPortRangesToTerraform, true)(this._portRanges.internalValue),
      timeouts: elbListenerTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      access_policy: {
        value: cdktf.stringToHclTerraform(this._accessPolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      advanced_forwarding_enabled: {
        value: cdktf.booleanToHclTerraform(this._advancedForwardingEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      ca_certificate: {
        value: cdktf.stringToHclTerraform(this._caCertificate),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      default_pool_id: {
        value: cdktf.stringToHclTerraform(this._defaultPoolId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_member_retry: {
        value: cdktf.booleanToHclTerraform(this._enableMemberRetry),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      force_delete: {
        value: cdktf.booleanToHclTerraform(this._forceDelete),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      forward_eip: {
        value: cdktf.booleanToHclTerraform(this._forwardEip),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      forward_elb: {
        value: cdktf.booleanToHclTerraform(this._forwardElb),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      forward_host: {
        value: cdktf.booleanToHclTerraform(this._forwardHost),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      forward_port: {
        value: cdktf.booleanToHclTerraform(this._forwardPort),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      forward_proto: {
        value: cdktf.booleanToHclTerraform(this._forwardProto),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      forward_request_port: {
        value: cdktf.booleanToHclTerraform(this._forwardRequestPort),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      forward_tls_certificate: {
        value: cdktf.booleanToHclTerraform(this._forwardTlsCertificate),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      forward_tls_cipher: {
        value: cdktf.booleanToHclTerraform(this._forwardTlsCipher),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      forward_tls_protocol: {
        value: cdktf.booleanToHclTerraform(this._forwardTlsProtocol),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      gzip_enable: {
        value: cdktf.booleanToHclTerraform(this._gzipEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      http2_enable: {
        value: cdktf.booleanToHclTerraform(this._http2Enable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      idle_timeout: {
        value: cdktf.numberToHclTerraform(this._idleTimeout),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      ip_group: {
        value: cdktf.stringToHclTerraform(this._ipGroup),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      loadbalancer_id: {
        value: cdktf.stringToHclTerraform(this._loadbalancerId),
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
      protection_reason: {
        value: cdktf.stringToHclTerraform(this._protectionReason),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      protection_status: {
        value: cdktf.stringToHclTerraform(this._protectionStatus),
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
      protocol_port: {
        value: cdktf.numberToHclTerraform(this._protocolPort),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      proxy_protocol_enable: {
        value: cdktf.booleanToHclTerraform(this._proxyProtocolEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      quic_listener_id: {
        value: cdktf.stringToHclTerraform(this._quicListenerId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      real_ip: {
        value: cdktf.booleanToHclTerraform(this._realIp),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      request_timeout: {
        value: cdktf.numberToHclTerraform(this._requestTimeout),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      response_timeout: {
        value: cdktf.numberToHclTerraform(this._responseTimeout),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      security_policy_id: {
        value: cdktf.stringToHclTerraform(this._securityPolicyId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      server_certificate: {
        value: cdktf.stringToHclTerraform(this._serverCertificate),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      sni_certificate: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._sniCertificate),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      sni_match_algo: {
        value: cdktf.stringToHclTerraform(this._sniMatchAlgo),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ssl_early_data_enable: {
        value: cdktf.booleanToHclTerraform(this._sslEarlyDataEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      tls_ciphers_policy: {
        value: cdktf.stringToHclTerraform(this._tlsCiphersPolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      port_ranges: {
        value: cdktf.listMapperHcl(elbListenerPortRangesToHclTerraform, true)(this._portRanges.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ElbListenerPortRangesList",
      },
      timeouts: {
        value: elbListenerTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "ElbListenerTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

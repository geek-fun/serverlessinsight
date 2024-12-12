// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WafDomainConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#certificate_id WafDomain#certificate_id}
  */
  readonly certificateId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#certificate_name WafDomain#certificate_name}
  */
  readonly certificateName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#charging_mode WafDomain#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#cipher WafDomain#cipher}
  */
  readonly cipher?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#description WafDomain#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#domain WafDomain#domain}
  */
  readonly domain: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#enterprise_project_id WafDomain#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#forward_header_map WafDomain#forward_header_map}
  */
  readonly forwardHeaderMap?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#http2_enable WafDomain#http2_enable}
  */
  readonly http2Enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#id WafDomain#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#ipv6_enable WafDomain#ipv6_enable}
  */
  readonly ipv6Enable?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#keep_policy WafDomain#keep_policy}
  */
  readonly keepPolicy?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#lb_algorithm WafDomain#lb_algorithm}
  */
  readonly lbAlgorithm?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#pci_3ds WafDomain#pci_3ds}
  */
  readonly pci3Ds?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#pci_dss WafDomain#pci_dss}
  */
  readonly pciDss?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#policy_id WafDomain#policy_id}
  */
  readonly policyId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#protect_status WafDomain#protect_status}
  */
  readonly protectStatus?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#proxy WafDomain#proxy}
  */
  readonly proxy?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#redirect_url WafDomain#redirect_url}
  */
  readonly redirectUrl?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#region WafDomain#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#tls WafDomain#tls}
  */
  readonly tls?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#website_name WafDomain#website_name}
  */
  readonly websiteName?: string;
  /**
  * custom_page block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#custom_page WafDomain#custom_page}
  */
  readonly customPage?: WafDomainCustomPage;
  /**
  * server block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#server WafDomain#server}
  */
  readonly server: WafDomainServer[] | cdktf.IResolvable;
  /**
  * timeout_settings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#timeout_settings WafDomain#timeout_settings}
  */
  readonly timeoutSettings?: WafDomainTimeoutSettings;
  /**
  * traffic_mark block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#traffic_mark WafDomain#traffic_mark}
  */
  readonly trafficMark?: WafDomainTrafficMark;
}
export interface WafDomainCustomPage {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#block_page_type WafDomain#block_page_type}
  */
  readonly blockPageType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#http_return_code WafDomain#http_return_code}
  */
  readonly httpReturnCode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#page_content WafDomain#page_content}
  */
  readonly pageContent: string;
}

export function wafDomainCustomPageToTerraform(struct?: WafDomainCustomPageOutputReference | WafDomainCustomPage): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    block_page_type: cdktf.stringToTerraform(struct!.blockPageType),
    http_return_code: cdktf.stringToTerraform(struct!.httpReturnCode),
    page_content: cdktf.stringToTerraform(struct!.pageContent),
  }
}


export function wafDomainCustomPageToHclTerraform(struct?: WafDomainCustomPageOutputReference | WafDomainCustomPage): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    block_page_type: {
      value: cdktf.stringToHclTerraform(struct!.blockPageType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    http_return_code: {
      value: cdktf.stringToHclTerraform(struct!.httpReturnCode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    page_content: {
      value: cdktf.stringToHclTerraform(struct!.pageContent),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafDomainCustomPageOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WafDomainCustomPage | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._blockPageType !== undefined) {
      hasAnyValues = true;
      internalValueResult.blockPageType = this._blockPageType;
    }
    if (this._httpReturnCode !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpReturnCode = this._httpReturnCode;
    }
    if (this._pageContent !== undefined) {
      hasAnyValues = true;
      internalValueResult.pageContent = this._pageContent;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafDomainCustomPage | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._blockPageType = undefined;
      this._httpReturnCode = undefined;
      this._pageContent = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._blockPageType = value.blockPageType;
      this._httpReturnCode = value.httpReturnCode;
      this._pageContent = value.pageContent;
    }
  }

  // block_page_type - computed: false, optional: false, required: true
  private _blockPageType?: string; 
  public get blockPageType() {
    return this.getStringAttribute('block_page_type');
  }
  public set blockPageType(value: string) {
    this._blockPageType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get blockPageTypeInput() {
    return this._blockPageType;
  }

  // http_return_code - computed: false, optional: false, required: true
  private _httpReturnCode?: string; 
  public get httpReturnCode() {
    return this.getStringAttribute('http_return_code');
  }
  public set httpReturnCode(value: string) {
    this._httpReturnCode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get httpReturnCodeInput() {
    return this._httpReturnCode;
  }

  // page_content - computed: false, optional: false, required: true
  private _pageContent?: string; 
  public get pageContent() {
    return this.getStringAttribute('page_content');
  }
  public set pageContent(value: string) {
    this._pageContent = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pageContentInput() {
    return this._pageContent;
  }
}
export interface WafDomainServer {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#address WafDomain#address}
  */
  readonly address: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#client_protocol WafDomain#client_protocol}
  */
  readonly clientProtocol: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#port WafDomain#port}
  */
  readonly port: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#server_protocol WafDomain#server_protocol}
  */
  readonly serverProtocol: string;
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#type WafDomain#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#weight WafDomain#weight}
  */
  readonly weight?: number;
}

export function wafDomainServerToTerraform(struct?: WafDomainServer | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    address: cdktf.stringToTerraform(struct!.address),
    client_protocol: cdktf.stringToTerraform(struct!.clientProtocol),
    port: cdktf.numberToTerraform(struct!.port),
    server_protocol: cdktf.stringToTerraform(struct!.serverProtocol),
    type: cdktf.stringToTerraform(struct!.type),
    weight: cdktf.numberToTerraform(struct!.weight),
  }
}


export function wafDomainServerToHclTerraform(struct?: WafDomainServer | cdktf.IResolvable): any {
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
    client_protocol: {
      value: cdktf.stringToHclTerraform(struct!.clientProtocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    server_protocol: {
      value: cdktf.stringToHclTerraform(struct!.serverProtocol),
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
    weight: {
      value: cdktf.numberToHclTerraform(struct!.weight),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafDomainServerOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): WafDomainServer | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._address !== undefined) {
      hasAnyValues = true;
      internalValueResult.address = this._address;
    }
    if (this._clientProtocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.clientProtocol = this._clientProtocol;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._serverProtocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.serverProtocol = this._serverProtocol;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._weight !== undefined) {
      hasAnyValues = true;
      internalValueResult.weight = this._weight;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafDomainServer | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._address = undefined;
      this._clientProtocol = undefined;
      this._port = undefined;
      this._serverProtocol = undefined;
      this._type = undefined;
      this._weight = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._address = value.address;
      this._clientProtocol = value.clientProtocol;
      this._port = value.port;
      this._serverProtocol = value.serverProtocol;
      this._type = value.type;
      this._weight = value.weight;
    }
  }

  // address - computed: false, optional: false, required: true
  private _address?: string; 
  public get address() {
    return this.getStringAttribute('address');
  }
  public set address(value: string) {
    this._address = value;
  }
  // Temporarily expose input value. Use with caution.
  public get addressInput() {
    return this._address;
  }

  // client_protocol - computed: false, optional: false, required: true
  private _clientProtocol?: string; 
  public get clientProtocol() {
    return this.getStringAttribute('client_protocol');
  }
  public set clientProtocol(value: string) {
    this._clientProtocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clientProtocolInput() {
    return this._clientProtocol;
  }

  // port - computed: false, optional: false, required: true
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }

  // server_protocol - computed: false, optional: false, required: true
  private _serverProtocol?: string; 
  public get serverProtocol() {
    return this.getStringAttribute('server_protocol');
  }
  public set serverProtocol(value: string) {
    this._serverProtocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serverProtocolInput() {
    return this._serverProtocol;
  }

  // type - computed: false, optional: true, required: false
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

  // weight - computed: false, optional: true, required: false
  private _weight?: number; 
  public get weight() {
    return this.getNumberAttribute('weight');
  }
  public set weight(value: number) {
    this._weight = value;
  }
  public resetWeight() {
    this._weight = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get weightInput() {
    return this._weight;
  }
}

export class WafDomainServerList extends cdktf.ComplexList {
  public internalValue? : WafDomainServer[] | cdktf.IResolvable

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
  public get(index: number): WafDomainServerOutputReference {
    return new WafDomainServerOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface WafDomainTimeoutSettings {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#connection_timeout WafDomain#connection_timeout}
  */
  readonly connectionTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#read_timeout WafDomain#read_timeout}
  */
  readonly readTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#write_timeout WafDomain#write_timeout}
  */
  readonly writeTimeout?: number;
}

export function wafDomainTimeoutSettingsToTerraform(struct?: WafDomainTimeoutSettingsOutputReference | WafDomainTimeoutSettings): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    connection_timeout: cdktf.numberToTerraform(struct!.connectionTimeout),
    read_timeout: cdktf.numberToTerraform(struct!.readTimeout),
    write_timeout: cdktf.numberToTerraform(struct!.writeTimeout),
  }
}


export function wafDomainTimeoutSettingsToHclTerraform(struct?: WafDomainTimeoutSettingsOutputReference | WafDomainTimeoutSettings): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    connection_timeout: {
      value: cdktf.numberToHclTerraform(struct!.connectionTimeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    read_timeout: {
      value: cdktf.numberToHclTerraform(struct!.readTimeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    write_timeout: {
      value: cdktf.numberToHclTerraform(struct!.writeTimeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafDomainTimeoutSettingsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WafDomainTimeoutSettings | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._connectionTimeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.connectionTimeout = this._connectionTimeout;
    }
    if (this._readTimeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.readTimeout = this._readTimeout;
    }
    if (this._writeTimeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.writeTimeout = this._writeTimeout;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafDomainTimeoutSettings | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._connectionTimeout = undefined;
      this._readTimeout = undefined;
      this._writeTimeout = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._connectionTimeout = value.connectionTimeout;
      this._readTimeout = value.readTimeout;
      this._writeTimeout = value.writeTimeout;
    }
  }

  // connection_timeout - computed: true, optional: true, required: false
  private _connectionTimeout?: number; 
  public get connectionTimeout() {
    return this.getNumberAttribute('connection_timeout');
  }
  public set connectionTimeout(value: number) {
    this._connectionTimeout = value;
  }
  public resetConnectionTimeout() {
    this._connectionTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get connectionTimeoutInput() {
    return this._connectionTimeout;
  }

  // read_timeout - computed: true, optional: true, required: false
  private _readTimeout?: number; 
  public get readTimeout() {
    return this.getNumberAttribute('read_timeout');
  }
  public set readTimeout(value: number) {
    this._readTimeout = value;
  }
  public resetReadTimeout() {
    this._readTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readTimeoutInput() {
    return this._readTimeout;
  }

  // write_timeout - computed: true, optional: true, required: false
  private _writeTimeout?: number; 
  public get writeTimeout() {
    return this.getNumberAttribute('write_timeout');
  }
  public set writeTimeout(value: number) {
    this._writeTimeout = value;
  }
  public resetWriteTimeout() {
    this._writeTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get writeTimeoutInput() {
    return this._writeTimeout;
  }
}
export interface WafDomainTrafficMark {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#ip_tags WafDomain#ip_tags}
  */
  readonly ipTags?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#session_tag WafDomain#session_tag}
  */
  readonly sessionTag?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#user_tag WafDomain#user_tag}
  */
  readonly userTag?: string;
}

export function wafDomainTrafficMarkToTerraform(struct?: WafDomainTrafficMarkOutputReference | WafDomainTrafficMark): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    ip_tags: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.ipTags),
    session_tag: cdktf.stringToTerraform(struct!.sessionTag),
    user_tag: cdktf.stringToTerraform(struct!.userTag),
  }
}


export function wafDomainTrafficMarkToHclTerraform(struct?: WafDomainTrafficMarkOutputReference | WafDomainTrafficMark): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    ip_tags: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.ipTags),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    session_tag: {
      value: cdktf.stringToHclTerraform(struct!.sessionTag),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user_tag: {
      value: cdktf.stringToHclTerraform(struct!.userTag),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafDomainTrafficMarkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WafDomainTrafficMark | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._ipTags !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipTags = this._ipTags;
    }
    if (this._sessionTag !== undefined) {
      hasAnyValues = true;
      internalValueResult.sessionTag = this._sessionTag;
    }
    if (this._userTag !== undefined) {
      hasAnyValues = true;
      internalValueResult.userTag = this._userTag;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafDomainTrafficMark | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._ipTags = undefined;
      this._sessionTag = undefined;
      this._userTag = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._ipTags = value.ipTags;
      this._sessionTag = value.sessionTag;
      this._userTag = value.userTag;
    }
  }

  // ip_tags - computed: true, optional: true, required: false
  private _ipTags?: string[]; 
  public get ipTags() {
    return this.getListAttribute('ip_tags');
  }
  public set ipTags(value: string[]) {
    this._ipTags = value;
  }
  public resetIpTags() {
    this._ipTags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipTagsInput() {
    return this._ipTags;
  }

  // session_tag - computed: true, optional: true, required: false
  private _sessionTag?: string; 
  public get sessionTag() {
    return this.getStringAttribute('session_tag');
  }
  public set sessionTag(value: string) {
    this._sessionTag = value;
  }
  public resetSessionTag() {
    this._sessionTag = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sessionTagInput() {
    return this._sessionTag;
  }

  // user_tag - computed: true, optional: true, required: false
  private _userTag?: string; 
  public get userTag() {
    return this.getStringAttribute('user_tag');
  }
  public set userTag(value: string) {
    this._userTag = value;
  }
  public resetUserTag() {
    this._userTag = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userTagInput() {
    return this._userTag;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain huaweicloud_waf_domain}
*/
export class WafDomain extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_waf_domain";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WafDomain resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WafDomain to import
  * @param importFromId The id of the existing WafDomain that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WafDomain to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_waf_domain", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_domain huaweicloud_waf_domain} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WafDomainConfig
  */
  public constructor(scope: Construct, id: string, config: WafDomainConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_waf_domain',
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
    this._certificateId = config.certificateId;
    this._certificateName = config.certificateName;
    this._chargingMode = config.chargingMode;
    this._cipher = config.cipher;
    this._description = config.description;
    this._domain = config.domain;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._forwardHeaderMap = config.forwardHeaderMap;
    this._http2Enable = config.http2Enable;
    this._id = config.id;
    this._ipv6Enable = config.ipv6Enable;
    this._keepPolicy = config.keepPolicy;
    this._lbAlgorithm = config.lbAlgorithm;
    this._pci3Ds = config.pci3Ds;
    this._pciDss = config.pciDss;
    this._policyId = config.policyId;
    this._protectStatus = config.protectStatus;
    this._proxy = config.proxy;
    this._redirectUrl = config.redirectUrl;
    this._region = config.region;
    this._tls = config.tls;
    this._websiteName = config.websiteName;
    this._customPage.internalValue = config.customPage;
    this._server.internalValue = config.server;
    this._timeoutSettings.internalValue = config.timeoutSettings;
    this._trafficMark.internalValue = config.trafficMark;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_code - computed: true, optional: false, required: false
  public get accessCode() {
    return this.getStringAttribute('access_code');
  }

  // access_status - computed: true, optional: false, required: false
  public get accessStatus() {
    return this.getNumberAttribute('access_status');
  }

  // certificate_id - computed: false, optional: true, required: false
  private _certificateId?: string; 
  public get certificateId() {
    return this.getStringAttribute('certificate_id');
  }
  public set certificateId(value: string) {
    this._certificateId = value;
  }
  public resetCertificateId() {
    this._certificateId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateIdInput() {
    return this._certificateId;
  }

  // certificate_name - computed: false, optional: true, required: false
  private _certificateName?: string; 
  public get certificateName() {
    return this.getStringAttribute('certificate_name');
  }
  public set certificateName(value: string) {
    this._certificateName = value;
  }
  public resetCertificateName() {
    this._certificateName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateNameInput() {
    return this._certificateName;
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

  // cipher - computed: true, optional: true, required: false
  private _cipher?: string; 
  public get cipher() {
    return this.getStringAttribute('cipher');
  }
  public set cipher(value: string) {
    this._cipher = value;
  }
  public resetCipher() {
    this._cipher = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cipherInput() {
    return this._cipher;
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

  // domain - computed: false, optional: false, required: true
  private _domain?: string; 
  public get domain() {
    return this.getStringAttribute('domain');
  }
  public set domain(value: string) {
    this._domain = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainInput() {
    return this._domain;
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

  // forward_header_map - computed: true, optional: true, required: false
  private _forwardHeaderMap?: { [key: string]: string }; 
  public get forwardHeaderMap() {
    return this.getStringMapAttribute('forward_header_map');
  }
  public set forwardHeaderMap(value: { [key: string]: string }) {
    this._forwardHeaderMap = value;
  }
  public resetForwardHeaderMap() {
    this._forwardHeaderMap = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardHeaderMapInput() {
    return this._forwardHeaderMap;
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

  // ipv6_enable - computed: true, optional: true, required: false
  private _ipv6Enable?: boolean | cdktf.IResolvable; 
  public get ipv6Enable() {
    return this.getBooleanAttribute('ipv6_enable');
  }
  public set ipv6Enable(value: boolean | cdktf.IResolvable) {
    this._ipv6Enable = value;
  }
  public resetIpv6Enable() {
    this._ipv6Enable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipv6EnableInput() {
    return this._ipv6Enable;
  }

  // keep_policy - computed: false, optional: true, required: false
  private _keepPolicy?: boolean | cdktf.IResolvable; 
  public get keepPolicy() {
    return this.getBooleanAttribute('keep_policy');
  }
  public set keepPolicy(value: boolean | cdktf.IResolvable) {
    this._keepPolicy = value;
  }
  public resetKeepPolicy() {
    this._keepPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keepPolicyInput() {
    return this._keepPolicy;
  }

  // lb_algorithm - computed: true, optional: true, required: false
  private _lbAlgorithm?: string; 
  public get lbAlgorithm() {
    return this.getStringAttribute('lb_algorithm');
  }
  public set lbAlgorithm(value: string) {
    this._lbAlgorithm = value;
  }
  public resetLbAlgorithm() {
    this._lbAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lbAlgorithmInput() {
    return this._lbAlgorithm;
  }

  // pci_3ds - computed: true, optional: true, required: false
  private _pci3Ds?: boolean | cdktf.IResolvable; 
  public get pci3Ds() {
    return this.getBooleanAttribute('pci_3ds');
  }
  public set pci3Ds(value: boolean | cdktf.IResolvable) {
    this._pci3Ds = value;
  }
  public resetPci3Ds() {
    this._pci3Ds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pci3DsInput() {
    return this._pci3Ds;
  }

  // pci_dss - computed: true, optional: true, required: false
  private _pciDss?: boolean | cdktf.IResolvable; 
  public get pciDss() {
    return this.getBooleanAttribute('pci_dss');
  }
  public set pciDss(value: boolean | cdktf.IResolvable) {
    this._pciDss = value;
  }
  public resetPciDss() {
    this._pciDss = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pciDssInput() {
    return this._pciDss;
  }

  // policy_id - computed: true, optional: true, required: false
  private _policyId?: string; 
  public get policyId() {
    return this.getStringAttribute('policy_id');
  }
  public set policyId(value: string) {
    this._policyId = value;
  }
  public resetPolicyId() {
    this._policyId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyIdInput() {
    return this._policyId;
  }

  // protect_status - computed: true, optional: true, required: false
  private _protectStatus?: number; 
  public get protectStatus() {
    return this.getNumberAttribute('protect_status');
  }
  public set protectStatus(value: number) {
    this._protectStatus = value;
  }
  public resetProtectStatus() {
    this._protectStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protectStatusInput() {
    return this._protectStatus;
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }

  // proxy - computed: false, optional: true, required: false
  private _proxy?: boolean | cdktf.IResolvable; 
  public get proxy() {
    return this.getBooleanAttribute('proxy');
  }
  public set proxy(value: boolean | cdktf.IResolvable) {
    this._proxy = value;
  }
  public resetProxy() {
    this._proxy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get proxyInput() {
    return this._proxy;
  }

  // redirect_url - computed: false, optional: true, required: false
  private _redirectUrl?: string; 
  public get redirectUrl() {
    return this.getStringAttribute('redirect_url');
  }
  public set redirectUrl(value: string) {
    this._redirectUrl = value;
  }
  public resetRedirectUrl() {
    this._redirectUrl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redirectUrlInput() {
    return this._redirectUrl;
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

  // tls - computed: true, optional: true, required: false
  private _tls?: string; 
  public get tls() {
    return this.getStringAttribute('tls');
  }
  public set tls(value: string) {
    this._tls = value;
  }
  public resetTls() {
    this._tls = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tlsInput() {
    return this._tls;
  }

  // website_name - computed: true, optional: true, required: false
  private _websiteName?: string; 
  public get websiteName() {
    return this.getStringAttribute('website_name');
  }
  public set websiteName(value: string) {
    this._websiteName = value;
  }
  public resetWebsiteName() {
    this._websiteName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get websiteNameInput() {
    return this._websiteName;
  }

  // custom_page - computed: false, optional: true, required: false
  private _customPage = new WafDomainCustomPageOutputReference(this, "custom_page");
  public get customPage() {
    return this._customPage;
  }
  public putCustomPage(value: WafDomainCustomPage) {
    this._customPage.internalValue = value;
  }
  public resetCustomPage() {
    this._customPage.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customPageInput() {
    return this._customPage.internalValue;
  }

  // server - computed: false, optional: false, required: true
  private _server = new WafDomainServerList(this, "server", false);
  public get server() {
    return this._server;
  }
  public putServer(value: WafDomainServer[] | cdktf.IResolvable) {
    this._server.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serverInput() {
    return this._server.internalValue;
  }

  // timeout_settings - computed: false, optional: true, required: false
  private _timeoutSettings = new WafDomainTimeoutSettingsOutputReference(this, "timeout_settings");
  public get timeoutSettings() {
    return this._timeoutSettings;
  }
  public putTimeoutSettings(value: WafDomainTimeoutSettings) {
    this._timeoutSettings.internalValue = value;
  }
  public resetTimeoutSettings() {
    this._timeoutSettings.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutSettingsInput() {
    return this._timeoutSettings.internalValue;
  }

  // traffic_mark - computed: false, optional: true, required: false
  private _trafficMark = new WafDomainTrafficMarkOutputReference(this, "traffic_mark");
  public get trafficMark() {
    return this._trafficMark;
  }
  public putTrafficMark(value: WafDomainTrafficMark) {
    this._trafficMark.internalValue = value;
  }
  public resetTrafficMark() {
    this._trafficMark.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trafficMarkInput() {
    return this._trafficMark.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      certificate_id: cdktf.stringToTerraform(this._certificateId),
      certificate_name: cdktf.stringToTerraform(this._certificateName),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      cipher: cdktf.stringToTerraform(this._cipher),
      description: cdktf.stringToTerraform(this._description),
      domain: cdktf.stringToTerraform(this._domain),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      forward_header_map: cdktf.hashMapper(cdktf.stringToTerraform)(this._forwardHeaderMap),
      http2_enable: cdktf.booleanToTerraform(this._http2Enable),
      id: cdktf.stringToTerraform(this._id),
      ipv6_enable: cdktf.booleanToTerraform(this._ipv6Enable),
      keep_policy: cdktf.booleanToTerraform(this._keepPolicy),
      lb_algorithm: cdktf.stringToTerraform(this._lbAlgorithm),
      pci_3ds: cdktf.booleanToTerraform(this._pci3Ds),
      pci_dss: cdktf.booleanToTerraform(this._pciDss),
      policy_id: cdktf.stringToTerraform(this._policyId),
      protect_status: cdktf.numberToTerraform(this._protectStatus),
      proxy: cdktf.booleanToTerraform(this._proxy),
      redirect_url: cdktf.stringToTerraform(this._redirectUrl),
      region: cdktf.stringToTerraform(this._region),
      tls: cdktf.stringToTerraform(this._tls),
      website_name: cdktf.stringToTerraform(this._websiteName),
      custom_page: wafDomainCustomPageToTerraform(this._customPage.internalValue),
      server: cdktf.listMapper(wafDomainServerToTerraform, true)(this._server.internalValue),
      timeout_settings: wafDomainTimeoutSettingsToTerraform(this._timeoutSettings.internalValue),
      traffic_mark: wafDomainTrafficMarkToTerraform(this._trafficMark.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      certificate_id: {
        value: cdktf.stringToHclTerraform(this._certificateId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      certificate_name: {
        value: cdktf.stringToHclTerraform(this._certificateName),
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
      cipher: {
        value: cdktf.stringToHclTerraform(this._cipher),
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
      domain: {
        value: cdktf.stringToHclTerraform(this._domain),
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
      forward_header_map: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._forwardHeaderMap),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
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
      ipv6_enable: {
        value: cdktf.booleanToHclTerraform(this._ipv6Enable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      keep_policy: {
        value: cdktf.booleanToHclTerraform(this._keepPolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      lb_algorithm: {
        value: cdktf.stringToHclTerraform(this._lbAlgorithm),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      pci_3ds: {
        value: cdktf.booleanToHclTerraform(this._pci3Ds),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      pci_dss: {
        value: cdktf.booleanToHclTerraform(this._pciDss),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      policy_id: {
        value: cdktf.stringToHclTerraform(this._policyId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      protect_status: {
        value: cdktf.numberToHclTerraform(this._protectStatus),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      proxy: {
        value: cdktf.booleanToHclTerraform(this._proxy),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      redirect_url: {
        value: cdktf.stringToHclTerraform(this._redirectUrl),
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
      tls: {
        value: cdktf.stringToHclTerraform(this._tls),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      website_name: {
        value: cdktf.stringToHclTerraform(this._websiteName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      custom_page: {
        value: wafDomainCustomPageToHclTerraform(this._customPage.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafDomainCustomPageList",
      },
      server: {
        value: cdktf.listMapperHcl(wafDomainServerToHclTerraform, true)(this._server.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafDomainServerList",
      },
      timeout_settings: {
        value: wafDomainTimeoutSettingsToHclTerraform(this._timeoutSettings.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafDomainTimeoutSettingsList",
      },
      traffic_mark: {
        value: wafDomainTrafficMarkToHclTerraform(this._trafficMark.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafDomainTrafficMarkList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

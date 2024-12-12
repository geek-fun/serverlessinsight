// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WafDedicatedDomainConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#certificate_id WafDedicatedDomain#certificate_id}
  */
  readonly certificateId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#cipher WafDedicatedDomain#cipher}
  */
  readonly cipher?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#description WafDedicatedDomain#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#domain WafDedicatedDomain#domain}
  */
  readonly domain: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#enterprise_project_id WafDedicatedDomain#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#forward_header_map WafDedicatedDomain#forward_header_map}
  */
  readonly forwardHeaderMap?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#id WafDedicatedDomain#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#keep_policy WafDedicatedDomain#keep_policy}
  */
  readonly keepPolicy?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#pci_3ds WafDedicatedDomain#pci_3ds}
  */
  readonly pci3Ds?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#pci_dss WafDedicatedDomain#pci_dss}
  */
  readonly pciDss?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#policy_id WafDedicatedDomain#policy_id}
  */
  readonly policyId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#protect_status WafDedicatedDomain#protect_status}
  */
  readonly protectStatus?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#proxy WafDedicatedDomain#proxy}
  */
  readonly proxy?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#redirect_url WafDedicatedDomain#redirect_url}
  */
  readonly redirectUrl?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#region WafDedicatedDomain#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#tls WafDedicatedDomain#tls}
  */
  readonly tls?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#website_name WafDedicatedDomain#website_name}
  */
  readonly websiteName?: string;
  /**
  * connection_protection block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#connection_protection WafDedicatedDomain#connection_protection}
  */
  readonly connectionProtection?: WafDedicatedDomainConnectionProtection;
  /**
  * custom_page block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#custom_page WafDedicatedDomain#custom_page}
  */
  readonly customPage?: WafDedicatedDomainCustomPage;
  /**
  * server block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#server WafDedicatedDomain#server}
  */
  readonly server: WafDedicatedDomainServer[] | cdktf.IResolvable;
  /**
  * timeout_settings block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#timeout_settings WafDedicatedDomain#timeout_settings}
  */
  readonly timeoutSettings?: WafDedicatedDomainTimeoutSettings;
  /**
  * traffic_mark block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#traffic_mark WafDedicatedDomain#traffic_mark}
  */
  readonly trafficMark?: WafDedicatedDomainTrafficMark;
}
export interface WafDedicatedDomainConnectionProtection {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#duration WafDedicatedDomain#duration}
  */
  readonly duration?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#error_percentage WafDedicatedDomain#error_percentage}
  */
  readonly errorPercentage?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#error_threshold WafDedicatedDomain#error_threshold}
  */
  readonly errorThreshold?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#initial_downtime WafDedicatedDomain#initial_downtime}
  */
  readonly initialDowntime?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#multiplier_for_consecutive_breakdowns WafDedicatedDomain#multiplier_for_consecutive_breakdowns}
  */
  readonly multiplierForConsecutiveBreakdowns?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#pending_url_request_threshold WafDedicatedDomain#pending_url_request_threshold}
  */
  readonly pendingUrlRequestThreshold?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#status WafDedicatedDomain#status}
  */
  readonly status?: boolean | cdktf.IResolvable;
}

export function wafDedicatedDomainConnectionProtectionToTerraform(struct?: WafDedicatedDomainConnectionProtectionOutputReference | WafDedicatedDomainConnectionProtection): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    duration: cdktf.numberToTerraform(struct!.duration),
    error_percentage: cdktf.numberToTerraform(struct!.errorPercentage),
    error_threshold: cdktf.numberToTerraform(struct!.errorThreshold),
    initial_downtime: cdktf.numberToTerraform(struct!.initialDowntime),
    multiplier_for_consecutive_breakdowns: cdktf.numberToTerraform(struct!.multiplierForConsecutiveBreakdowns),
    pending_url_request_threshold: cdktf.numberToTerraform(struct!.pendingUrlRequestThreshold),
    status: cdktf.booleanToTerraform(struct!.status),
  }
}


export function wafDedicatedDomainConnectionProtectionToHclTerraform(struct?: WafDedicatedDomainConnectionProtectionOutputReference | WafDedicatedDomainConnectionProtection): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    duration: {
      value: cdktf.numberToHclTerraform(struct!.duration),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    error_percentage: {
      value: cdktf.numberToHclTerraform(struct!.errorPercentage),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    error_threshold: {
      value: cdktf.numberToHclTerraform(struct!.errorThreshold),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    initial_downtime: {
      value: cdktf.numberToHclTerraform(struct!.initialDowntime),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    multiplier_for_consecutive_breakdowns: {
      value: cdktf.numberToHclTerraform(struct!.multiplierForConsecutiveBreakdowns),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    pending_url_request_threshold: {
      value: cdktf.numberToHclTerraform(struct!.pendingUrlRequestThreshold),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    status: {
      value: cdktf.booleanToHclTerraform(struct!.status),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafDedicatedDomainConnectionProtectionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WafDedicatedDomainConnectionProtection | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._duration !== undefined) {
      hasAnyValues = true;
      internalValueResult.duration = this._duration;
    }
    if (this._errorPercentage !== undefined) {
      hasAnyValues = true;
      internalValueResult.errorPercentage = this._errorPercentage;
    }
    if (this._errorThreshold !== undefined) {
      hasAnyValues = true;
      internalValueResult.errorThreshold = this._errorThreshold;
    }
    if (this._initialDowntime !== undefined) {
      hasAnyValues = true;
      internalValueResult.initialDowntime = this._initialDowntime;
    }
    if (this._multiplierForConsecutiveBreakdowns !== undefined) {
      hasAnyValues = true;
      internalValueResult.multiplierForConsecutiveBreakdowns = this._multiplierForConsecutiveBreakdowns;
    }
    if (this._pendingUrlRequestThreshold !== undefined) {
      hasAnyValues = true;
      internalValueResult.pendingUrlRequestThreshold = this._pendingUrlRequestThreshold;
    }
    if (this._status !== undefined) {
      hasAnyValues = true;
      internalValueResult.status = this._status;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafDedicatedDomainConnectionProtection | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._duration = undefined;
      this._errorPercentage = undefined;
      this._errorThreshold = undefined;
      this._initialDowntime = undefined;
      this._multiplierForConsecutiveBreakdowns = undefined;
      this._pendingUrlRequestThreshold = undefined;
      this._status = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._duration = value.duration;
      this._errorPercentage = value.errorPercentage;
      this._errorThreshold = value.errorThreshold;
      this._initialDowntime = value.initialDowntime;
      this._multiplierForConsecutiveBreakdowns = value.multiplierForConsecutiveBreakdowns;
      this._pendingUrlRequestThreshold = value.pendingUrlRequestThreshold;
      this._status = value.status;
    }
  }

  // duration - computed: true, optional: true, required: false
  private _duration?: number; 
  public get duration() {
    return this.getNumberAttribute('duration');
  }
  public set duration(value: number) {
    this._duration = value;
  }
  public resetDuration() {
    this._duration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get durationInput() {
    return this._duration;
  }

  // error_percentage - computed: true, optional: true, required: false
  private _errorPercentage?: number; 
  public get errorPercentage() {
    return this.getNumberAttribute('error_percentage');
  }
  public set errorPercentage(value: number) {
    this._errorPercentage = value;
  }
  public resetErrorPercentage() {
    this._errorPercentage = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get errorPercentageInput() {
    return this._errorPercentage;
  }

  // error_threshold - computed: true, optional: true, required: false
  private _errorThreshold?: number; 
  public get errorThreshold() {
    return this.getNumberAttribute('error_threshold');
  }
  public set errorThreshold(value: number) {
    this._errorThreshold = value;
  }
  public resetErrorThreshold() {
    this._errorThreshold = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get errorThresholdInput() {
    return this._errorThreshold;
  }

  // initial_downtime - computed: true, optional: true, required: false
  private _initialDowntime?: number; 
  public get initialDowntime() {
    return this.getNumberAttribute('initial_downtime');
  }
  public set initialDowntime(value: number) {
    this._initialDowntime = value;
  }
  public resetInitialDowntime() {
    this._initialDowntime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get initialDowntimeInput() {
    return this._initialDowntime;
  }

  // multiplier_for_consecutive_breakdowns - computed: true, optional: true, required: false
  private _multiplierForConsecutiveBreakdowns?: number; 
  public get multiplierForConsecutiveBreakdowns() {
    return this.getNumberAttribute('multiplier_for_consecutive_breakdowns');
  }
  public set multiplierForConsecutiveBreakdowns(value: number) {
    this._multiplierForConsecutiveBreakdowns = value;
  }
  public resetMultiplierForConsecutiveBreakdowns() {
    this._multiplierForConsecutiveBreakdowns = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get multiplierForConsecutiveBreakdownsInput() {
    return this._multiplierForConsecutiveBreakdowns;
  }

  // pending_url_request_threshold - computed: true, optional: true, required: false
  private _pendingUrlRequestThreshold?: number; 
  public get pendingUrlRequestThreshold() {
    return this.getNumberAttribute('pending_url_request_threshold');
  }
  public set pendingUrlRequestThreshold(value: number) {
    this._pendingUrlRequestThreshold = value;
  }
  public resetPendingUrlRequestThreshold() {
    this._pendingUrlRequestThreshold = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pendingUrlRequestThresholdInput() {
    return this._pendingUrlRequestThreshold;
  }

  // status - computed: true, optional: true, required: false
  private _status?: boolean | cdktf.IResolvable; 
  public get status() {
    return this.getBooleanAttribute('status');
  }
  public set status(value: boolean | cdktf.IResolvable) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }
}
export interface WafDedicatedDomainCustomPage {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#block_page_type WafDedicatedDomain#block_page_type}
  */
  readonly blockPageType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#http_return_code WafDedicatedDomain#http_return_code}
  */
  readonly httpReturnCode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#page_content WafDedicatedDomain#page_content}
  */
  readonly pageContent: string;
}

export function wafDedicatedDomainCustomPageToTerraform(struct?: WafDedicatedDomainCustomPageOutputReference | WafDedicatedDomainCustomPage): any {
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


export function wafDedicatedDomainCustomPageToHclTerraform(struct?: WafDedicatedDomainCustomPageOutputReference | WafDedicatedDomainCustomPage): any {
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

export class WafDedicatedDomainCustomPageOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WafDedicatedDomainCustomPage | undefined {
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

  public set internalValue(value: WafDedicatedDomainCustomPage | undefined) {
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
export interface WafDedicatedDomainServer {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#address WafDedicatedDomain#address}
  */
  readonly address: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#client_protocol WafDedicatedDomain#client_protocol}
  */
  readonly clientProtocol: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#port WafDedicatedDomain#port}
  */
  readonly port: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#server_protocol WafDedicatedDomain#server_protocol}
  */
  readonly serverProtocol: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#type WafDedicatedDomain#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#vpc_id WafDedicatedDomain#vpc_id}
  */
  readonly vpcId: string;
}

export function wafDedicatedDomainServerToTerraform(struct?: WafDedicatedDomainServer | cdktf.IResolvable): any {
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
    vpc_id: cdktf.stringToTerraform(struct!.vpcId),
  }
}


export function wafDedicatedDomainServerToHclTerraform(struct?: WafDedicatedDomainServer | cdktf.IResolvable): any {
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
    vpc_id: {
      value: cdktf.stringToHclTerraform(struct!.vpcId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WafDedicatedDomainServerOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): WafDedicatedDomainServer | cdktf.IResolvable | undefined {
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
    if (this._vpcId !== undefined) {
      hasAnyValues = true;
      internalValueResult.vpcId = this._vpcId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WafDedicatedDomainServer | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._address = undefined;
      this._clientProtocol = undefined;
      this._port = undefined;
      this._serverProtocol = undefined;
      this._type = undefined;
      this._vpcId = undefined;
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
      this._vpcId = value.vpcId;
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

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // vpc_id - computed: false, optional: false, required: true
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }
}

export class WafDedicatedDomainServerList extends cdktf.ComplexList {
  public internalValue? : WafDedicatedDomainServer[] | cdktf.IResolvable

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
  public get(index: number): WafDedicatedDomainServerOutputReference {
    return new WafDedicatedDomainServerOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface WafDedicatedDomainTimeoutSettings {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#connection_timeout WafDedicatedDomain#connection_timeout}
  */
  readonly connectionTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#read_timeout WafDedicatedDomain#read_timeout}
  */
  readonly readTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#write_timeout WafDedicatedDomain#write_timeout}
  */
  readonly writeTimeout?: number;
}

export function wafDedicatedDomainTimeoutSettingsToTerraform(struct?: WafDedicatedDomainTimeoutSettingsOutputReference | WafDedicatedDomainTimeoutSettings): any {
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


export function wafDedicatedDomainTimeoutSettingsToHclTerraform(struct?: WafDedicatedDomainTimeoutSettingsOutputReference | WafDedicatedDomainTimeoutSettings): any {
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

export class WafDedicatedDomainTimeoutSettingsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WafDedicatedDomainTimeoutSettings | undefined {
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

  public set internalValue(value: WafDedicatedDomainTimeoutSettings | undefined) {
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
export interface WafDedicatedDomainTrafficMark {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#ip_tags WafDedicatedDomain#ip_tags}
  */
  readonly ipTags?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#session_tag WafDedicatedDomain#session_tag}
  */
  readonly sessionTag?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#user_tag WafDedicatedDomain#user_tag}
  */
  readonly userTag?: string;
}

export function wafDedicatedDomainTrafficMarkToTerraform(struct?: WafDedicatedDomainTrafficMarkOutputReference | WafDedicatedDomainTrafficMark): any {
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


export function wafDedicatedDomainTrafficMarkToHclTerraform(struct?: WafDedicatedDomainTrafficMarkOutputReference | WafDedicatedDomainTrafficMark): any {
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

export class WafDedicatedDomainTrafficMarkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WafDedicatedDomainTrafficMark | undefined {
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

  public set internalValue(value: WafDedicatedDomainTrafficMark | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain huaweicloud_waf_dedicated_domain}
*/
export class WafDedicatedDomain extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_waf_dedicated_domain";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WafDedicatedDomain resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WafDedicatedDomain to import
  * @param importFromId The id of the existing WafDedicatedDomain that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WafDedicatedDomain to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_waf_dedicated_domain", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/waf_dedicated_domain huaweicloud_waf_dedicated_domain} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WafDedicatedDomainConfig
  */
  public constructor(scope: Construct, id: string, config: WafDedicatedDomainConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_waf_dedicated_domain',
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
    this._cipher = config.cipher;
    this._description = config.description;
    this._domain = config.domain;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._forwardHeaderMap = config.forwardHeaderMap;
    this._id = config.id;
    this._keepPolicy = config.keepPolicy;
    this._pci3Ds = config.pci3Ds;
    this._pciDss = config.pciDss;
    this._policyId = config.policyId;
    this._protectStatus = config.protectStatus;
    this._proxy = config.proxy;
    this._redirectUrl = config.redirectUrl;
    this._region = config.region;
    this._tls = config.tls;
    this._websiteName = config.websiteName;
    this._connectionProtection.internalValue = config.connectionProtection;
    this._customPage.internalValue = config.customPage;
    this._server.internalValue = config.server;
    this._timeoutSettings.internalValue = config.timeoutSettings;
    this._trafficMark.internalValue = config.trafficMark;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_status - computed: true, optional: false, required: false
  public get accessStatus() {
    return this.getNumberAttribute('access_status');
  }

  // alarm_page - computed: true, optional: false, required: false
  private _alarmPage = new cdktf.StringMap(this, "alarm_page");
  public get alarmPage() {
    return this._alarmPage;
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

  // certificate_name - computed: true, optional: false, required: false
  public get certificateName() {
    return this.getStringAttribute('certificate_name');
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

  // compliance_certification - computed: true, optional: false, required: false
  private _complianceCertification = new cdktf.BooleanMap(this, "compliance_certification");
  public get complianceCertification() {
    return this._complianceCertification;
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

  // traffic_identifier - computed: true, optional: false, required: false
  private _trafficIdentifier = new cdktf.StringMap(this, "traffic_identifier");
  public get trafficIdentifier() {
    return this._trafficIdentifier;
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

  // connection_protection - computed: false, optional: true, required: false
  private _connectionProtection = new WafDedicatedDomainConnectionProtectionOutputReference(this, "connection_protection");
  public get connectionProtection() {
    return this._connectionProtection;
  }
  public putConnectionProtection(value: WafDedicatedDomainConnectionProtection) {
    this._connectionProtection.internalValue = value;
  }
  public resetConnectionProtection() {
    this._connectionProtection.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get connectionProtectionInput() {
    return this._connectionProtection.internalValue;
  }

  // custom_page - computed: false, optional: true, required: false
  private _customPage = new WafDedicatedDomainCustomPageOutputReference(this, "custom_page");
  public get customPage() {
    return this._customPage;
  }
  public putCustomPage(value: WafDedicatedDomainCustomPage) {
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
  private _server = new WafDedicatedDomainServerList(this, "server", false);
  public get server() {
    return this._server;
  }
  public putServer(value: WafDedicatedDomainServer[] | cdktf.IResolvable) {
    this._server.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serverInput() {
    return this._server.internalValue;
  }

  // timeout_settings - computed: false, optional: true, required: false
  private _timeoutSettings = new WafDedicatedDomainTimeoutSettingsOutputReference(this, "timeout_settings");
  public get timeoutSettings() {
    return this._timeoutSettings;
  }
  public putTimeoutSettings(value: WafDedicatedDomainTimeoutSettings) {
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
  private _trafficMark = new WafDedicatedDomainTrafficMarkOutputReference(this, "traffic_mark");
  public get trafficMark() {
    return this._trafficMark;
  }
  public putTrafficMark(value: WafDedicatedDomainTrafficMark) {
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
      cipher: cdktf.stringToTerraform(this._cipher),
      description: cdktf.stringToTerraform(this._description),
      domain: cdktf.stringToTerraform(this._domain),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      forward_header_map: cdktf.hashMapper(cdktf.stringToTerraform)(this._forwardHeaderMap),
      id: cdktf.stringToTerraform(this._id),
      keep_policy: cdktf.booleanToTerraform(this._keepPolicy),
      pci_3ds: cdktf.booleanToTerraform(this._pci3Ds),
      pci_dss: cdktf.booleanToTerraform(this._pciDss),
      policy_id: cdktf.stringToTerraform(this._policyId),
      protect_status: cdktf.numberToTerraform(this._protectStatus),
      proxy: cdktf.booleanToTerraform(this._proxy),
      redirect_url: cdktf.stringToTerraform(this._redirectUrl),
      region: cdktf.stringToTerraform(this._region),
      tls: cdktf.stringToTerraform(this._tls),
      website_name: cdktf.stringToTerraform(this._websiteName),
      connection_protection: wafDedicatedDomainConnectionProtectionToTerraform(this._connectionProtection.internalValue),
      custom_page: wafDedicatedDomainCustomPageToTerraform(this._customPage.internalValue),
      server: cdktf.listMapper(wafDedicatedDomainServerToTerraform, true)(this._server.internalValue),
      timeout_settings: wafDedicatedDomainTimeoutSettingsToTerraform(this._timeoutSettings.internalValue),
      traffic_mark: wafDedicatedDomainTrafficMarkToTerraform(this._trafficMark.internalValue),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      keep_policy: {
        value: cdktf.booleanToHclTerraform(this._keepPolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      connection_protection: {
        value: wafDedicatedDomainConnectionProtectionToHclTerraform(this._connectionProtection.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafDedicatedDomainConnectionProtectionList",
      },
      custom_page: {
        value: wafDedicatedDomainCustomPageToHclTerraform(this._customPage.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafDedicatedDomainCustomPageList",
      },
      server: {
        value: cdktf.listMapperHcl(wafDedicatedDomainServerToHclTerraform, true)(this._server.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafDedicatedDomainServerList",
      },
      timeout_settings: {
        value: wafDedicatedDomainTimeoutSettingsToHclTerraform(this._timeoutSettings.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafDedicatedDomainTimeoutSettingsList",
      },
      traffic_mark: {
        value: wafDedicatedDomainTrafficMarkToHclTerraform(this._trafficMark.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WafDedicatedDomainTrafficMarkList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

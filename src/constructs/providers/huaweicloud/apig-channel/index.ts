// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ApigChannelConfig extends cdktf.TerraformMetaArguments {
  /**
  * The distribution algorithm.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#balance_strategy ApigChannel#balance_strategy}
  */
  readonly balanceStrategy: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#id ApigChannel#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the dedicated instance to which the channel belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#instance_id ApigChannel#instance_id}
  */
  readonly instanceId: string;
  /**
  * The member type of the channel.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#member_type ApigChannel#member_type}
  */
  readonly memberType?: string;
  /**
  * The channel name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#name ApigChannel#name}
  */
  readonly name: string;
  /**
  * The default port for health check in channel.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#port ApigChannel#port}
  */
  readonly port: number;
  /**
  * The region where the dedicated instance is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#region ApigChannel#region}
  */
  readonly region?: string;
  /**
  * The type of the channel.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#type ApigChannel#type}
  */
  readonly type?: number;
  /**
  * health_check block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#health_check ApigChannel#health_check}
  */
  readonly healthCheck?: ApigChannelHealthCheck;
  /**
  * member block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#member ApigChannel#member}
  */
  readonly member?: ApigChannelMember[] | cdktf.IResolvable;
  /**
  * member_group block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#member_group ApigChannel#member_group}
  */
  readonly memberGroup?: ApigChannelMemberGroup[] | cdktf.IResolvable;
  /**
  * microservice block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#microservice ApigChannel#microservice}
  */
  readonly microservice?: ApigChannelMicroservice;
}
export interface ApigChannelHealthCheck {
  /**
  * Whether to enable two-way authentication.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#enable_client_ssl ApigChannel#enable_client_ssl}
  */
  readonly enableClientSsl?: boolean | cdktf.IResolvable;
  /**
  * The response codes for determining a successful HTTP response.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#http_codes ApigChannel#http_codes}
  */
  readonly httpCodes?: string;
  /**
  * The interval between consecutive check, in second.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#interval ApigChannel#interval}
  */
  readonly interval: number;
  /**
  * The request method for health check.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#method ApigChannel#method}
  */
  readonly method?: string;
  /**
  * The destination path for health check.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#path ApigChannel#path}
  */
  readonly path?: string;
  /**
  * The destination host port for health check.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#port ApigChannel#port}
  */
  readonly port?: number;
  /**
  * The rotocol for performing health check on backend servers.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#protocol ApigChannel#protocol}
  */
  readonly protocol: string;
  /**
  * The status of health check.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#status ApigChannel#status}
  */
  readonly status?: number;
  /**
  * The unhealthy threshold, which refers to the number of consecutive failed check required for a backend server to be considered unhealthy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#threshold_abnormal ApigChannel#threshold_abnormal}
  */
  readonly thresholdAbnormal: number;
  /**
  * The the healthy threshold, which refers to the number of consecutive successful checks required for a backend server to be considered healthy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#threshold_normal ApigChannel#threshold_normal}
  */
  readonly thresholdNormal: number;
  /**
  * The timeout for determining whether a health check fails, in second.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#timeout ApigChannel#timeout}
  */
  readonly timeout: number;
}

export function apigChannelHealthCheckToTerraform(struct?: ApigChannelHealthCheckOutputReference | ApigChannelHealthCheck): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enable_client_ssl: cdktf.booleanToTerraform(struct!.enableClientSsl),
    http_codes: cdktf.stringToTerraform(struct!.httpCodes),
    interval: cdktf.numberToTerraform(struct!.interval),
    method: cdktf.stringToTerraform(struct!.method),
    path: cdktf.stringToTerraform(struct!.path),
    port: cdktf.numberToTerraform(struct!.port),
    protocol: cdktf.stringToTerraform(struct!.protocol),
    status: cdktf.numberToTerraform(struct!.status),
    threshold_abnormal: cdktf.numberToTerraform(struct!.thresholdAbnormal),
    threshold_normal: cdktf.numberToTerraform(struct!.thresholdNormal),
    timeout: cdktf.numberToTerraform(struct!.timeout),
  }
}


export function apigChannelHealthCheckToHclTerraform(struct?: ApigChannelHealthCheckOutputReference | ApigChannelHealthCheck): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enable_client_ssl: {
      value: cdktf.booleanToHclTerraform(struct!.enableClientSsl),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    http_codes: {
      value: cdktf.stringToHclTerraform(struct!.httpCodes),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    interval: {
      value: cdktf.numberToHclTerraform(struct!.interval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    method: {
      value: cdktf.stringToHclTerraform(struct!.method),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    path: {
      value: cdktf.stringToHclTerraform(struct!.path),
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
    protocol: {
      value: cdktf.stringToHclTerraform(struct!.protocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    status: {
      value: cdktf.numberToHclTerraform(struct!.status),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    threshold_abnormal: {
      value: cdktf.numberToHclTerraform(struct!.thresholdAbnormal),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    threshold_normal: {
      value: cdktf.numberToHclTerraform(struct!.thresholdNormal),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
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

export class ApigChannelHealthCheckOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ApigChannelHealthCheck | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enableClientSsl !== undefined) {
      hasAnyValues = true;
      internalValueResult.enableClientSsl = this._enableClientSsl;
    }
    if (this._httpCodes !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpCodes = this._httpCodes;
    }
    if (this._interval !== undefined) {
      hasAnyValues = true;
      internalValueResult.interval = this._interval;
    }
    if (this._method !== undefined) {
      hasAnyValues = true;
      internalValueResult.method = this._method;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    if (this._status !== undefined) {
      hasAnyValues = true;
      internalValueResult.status = this._status;
    }
    if (this._thresholdAbnormal !== undefined) {
      hasAnyValues = true;
      internalValueResult.thresholdAbnormal = this._thresholdAbnormal;
    }
    if (this._thresholdNormal !== undefined) {
      hasAnyValues = true;
      internalValueResult.thresholdNormal = this._thresholdNormal;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigChannelHealthCheck | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enableClientSsl = undefined;
      this._httpCodes = undefined;
      this._interval = undefined;
      this._method = undefined;
      this._path = undefined;
      this._port = undefined;
      this._protocol = undefined;
      this._status = undefined;
      this._thresholdAbnormal = undefined;
      this._thresholdNormal = undefined;
      this._timeout = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enableClientSsl = value.enableClientSsl;
      this._httpCodes = value.httpCodes;
      this._interval = value.interval;
      this._method = value.method;
      this._path = value.path;
      this._port = value.port;
      this._protocol = value.protocol;
      this._status = value.status;
      this._thresholdAbnormal = value.thresholdAbnormal;
      this._thresholdNormal = value.thresholdNormal;
      this._timeout = value.timeout;
    }
  }

  // enable_client_ssl - computed: true, optional: true, required: false
  private _enableClientSsl?: boolean | cdktf.IResolvable; 
  public get enableClientSsl() {
    return this.getBooleanAttribute('enable_client_ssl');
  }
  public set enableClientSsl(value: boolean | cdktf.IResolvable) {
    this._enableClientSsl = value;
  }
  public resetEnableClientSsl() {
    this._enableClientSsl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableClientSslInput() {
    return this._enableClientSsl;
  }

  // http_codes - computed: true, optional: true, required: false
  private _httpCodes?: string; 
  public get httpCodes() {
    return this.getStringAttribute('http_codes');
  }
  public set httpCodes(value: string) {
    this._httpCodes = value;
  }
  public resetHttpCodes() {
    this._httpCodes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpCodesInput() {
    return this._httpCodes;
  }

  // interval - computed: false, optional: false, required: true
  private _interval?: number; 
  public get interval() {
    return this.getNumberAttribute('interval');
  }
  public set interval(value: number) {
    this._interval = value;
  }
  // Temporarily expose input value. Use with caution.
  public get intervalInput() {
    return this._interval;
  }

  // method - computed: true, optional: true, required: false
  private _method?: string; 
  public get method() {
    return this.getStringAttribute('method');
  }
  public set method(value: string) {
    this._method = value;
  }
  public resetMethod() {
    this._method = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get methodInput() {
    return this._method;
  }

  // path - computed: true, optional: true, required: false
  private _path?: string; 
  public get path() {
    return this.getStringAttribute('path');
  }
  public set path(value: string) {
    this._path = value;
  }
  public resetPath() {
    this._path = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pathInput() {
    return this._path;
  }

  // port - computed: true, optional: true, required: false
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
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

  // status - computed: true, optional: true, required: false
  private _status?: number; 
  public get status() {
    return this.getNumberAttribute('status');
  }
  public set status(value: number) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // threshold_abnormal - computed: false, optional: false, required: true
  private _thresholdAbnormal?: number; 
  public get thresholdAbnormal() {
    return this.getNumberAttribute('threshold_abnormal');
  }
  public set thresholdAbnormal(value: number) {
    this._thresholdAbnormal = value;
  }
  // Temporarily expose input value. Use with caution.
  public get thresholdAbnormalInput() {
    return this._thresholdAbnormal;
  }

  // threshold_normal - computed: false, optional: false, required: true
  private _thresholdNormal?: number; 
  public get thresholdNormal() {
    return this.getNumberAttribute('threshold_normal');
  }
  public set thresholdNormal(value: number) {
    this._thresholdNormal = value;
  }
  // Temporarily expose input value. Use with caution.
  public get thresholdNormalInput() {
    return this._thresholdNormal;
  }

  // timeout - computed: false, optional: false, required: true
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }
}
export interface ApigChannelMember {
  /**
  * The group name of the backend server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#group_name ApigChannel#group_name}
  */
  readonly groupName?: string;
  /**
  * The IP address of the backend server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#host ApigChannel#host}
  */
  readonly host?: string;
  /**
  * The ID of the backend server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#id ApigChannel#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Whether this member is the backup member.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#is_backup ApigChannel#is_backup}
  */
  readonly isBackup?: boolean | cdktf.IResolvable;
  /**
  * The name of the backend server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#name ApigChannel#name}
  */
  readonly name?: string;
  /**
  * The port of the backend server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#port ApigChannel#port}
  */
  readonly port?: number;
  /**
  * The status of the backend server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#status ApigChannel#status}
  */
  readonly status?: number;
  /**
  * The weight of current backend server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#weight ApigChannel#weight}
  */
  readonly weight?: number;
}

export function apigChannelMemberToTerraform(struct?: ApigChannelMember | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    group_name: cdktf.stringToTerraform(struct!.groupName),
    host: cdktf.stringToTerraform(struct!.host),
    id: cdktf.stringToTerraform(struct!.id),
    is_backup: cdktf.booleanToTerraform(struct!.isBackup),
    name: cdktf.stringToTerraform(struct!.name),
    port: cdktf.numberToTerraform(struct!.port),
    status: cdktf.numberToTerraform(struct!.status),
    weight: cdktf.numberToTerraform(struct!.weight),
  }
}


export function apigChannelMemberToHclTerraform(struct?: ApigChannelMember | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    group_name: {
      value: cdktf.stringToHclTerraform(struct!.groupName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    host: {
      value: cdktf.stringToHclTerraform(struct!.host),
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
    is_backup: {
      value: cdktf.booleanToHclTerraform(struct!.isBackup),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
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
    status: {
      value: cdktf.numberToHclTerraform(struct!.status),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
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

export class ApigChannelMemberOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigChannelMember | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._groupName !== undefined) {
      hasAnyValues = true;
      internalValueResult.groupName = this._groupName;
    }
    if (this._host !== undefined) {
      hasAnyValues = true;
      internalValueResult.host = this._host;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._isBackup !== undefined) {
      hasAnyValues = true;
      internalValueResult.isBackup = this._isBackup;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._status !== undefined) {
      hasAnyValues = true;
      internalValueResult.status = this._status;
    }
    if (this._weight !== undefined) {
      hasAnyValues = true;
      internalValueResult.weight = this._weight;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigChannelMember | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._groupName = undefined;
      this._host = undefined;
      this._id = undefined;
      this._isBackup = undefined;
      this._name = undefined;
      this._port = undefined;
      this._status = undefined;
      this._weight = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._groupName = value.groupName;
      this._host = value.host;
      this._id = value.id;
      this._isBackup = value.isBackup;
      this._name = value.name;
      this._port = value.port;
      this._status = value.status;
      this._weight = value.weight;
    }
  }

  // group_name - computed: true, optional: true, required: false
  private _groupName?: string; 
  public get groupName() {
    return this.getStringAttribute('group_name');
  }
  public set groupName(value: string) {
    this._groupName = value;
  }
  public resetGroupName() {
    this._groupName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get groupNameInput() {
    return this._groupName;
  }

  // host - computed: true, optional: true, required: false
  private _host?: string; 
  public get host() {
    return this.getStringAttribute('host');
  }
  public set host(value: string) {
    this._host = value;
  }
  public resetHost() {
    this._host = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostInput() {
    return this._host;
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

  // is_backup - computed: true, optional: true, required: false
  private _isBackup?: boolean | cdktf.IResolvable; 
  public get isBackup() {
    return this.getBooleanAttribute('is_backup');
  }
  public set isBackup(value: boolean | cdktf.IResolvable) {
    this._isBackup = value;
  }
  public resetIsBackup() {
    this._isBackup = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isBackupInput() {
    return this._isBackup;
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

  // port - computed: true, optional: true, required: false
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }

  // status - computed: true, optional: true, required: false
  private _status?: number; 
  public get status() {
    return this.getNumberAttribute('status');
  }
  public set status(value: number) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // weight - computed: true, optional: true, required: false
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

export class ApigChannelMemberList extends cdktf.ComplexList {
  public internalValue? : ApigChannelMember[] | cdktf.IResolvable

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
  public get(index: number): ApigChannelMemberOutputReference {
    return new ApigChannelMemberOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigChannelMemberGroup {
  /**
  * The description of the member group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#description ApigChannel#description}
  */
  readonly description?: string;
  /**
  * The microservice tags of the backend server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#microservice_labels ApigChannel#microservice_labels}
  */
  readonly microserviceLabels?: { [key: string]: string };
  /**
  * The microservice port of the backend server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#microservice_port ApigChannel#microservice_port}
  */
  readonly microservicePort?: number;
  /**
  * The microservice version of the backend server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#microservice_version ApigChannel#microservice_version}
  */
  readonly microserviceVersion?: string;
  /**
  * The name of the member group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#name ApigChannel#name}
  */
  readonly name: string;
  /**
  * The weight of the current member group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#weight ApigChannel#weight}
  */
  readonly weight?: number;
}

export function apigChannelMemberGroupToTerraform(struct?: ApigChannelMemberGroup | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    microservice_labels: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.microserviceLabels),
    microservice_port: cdktf.numberToTerraform(struct!.microservicePort),
    microservice_version: cdktf.stringToTerraform(struct!.microserviceVersion),
    name: cdktf.stringToTerraform(struct!.name),
    weight: cdktf.numberToTerraform(struct!.weight),
  }
}


export function apigChannelMemberGroupToHclTerraform(struct?: ApigChannelMemberGroup | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    microservice_labels: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.microserviceLabels),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    microservice_port: {
      value: cdktf.numberToHclTerraform(struct!.microservicePort),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    microservice_version: {
      value: cdktf.stringToHclTerraform(struct!.microserviceVersion),
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

export class ApigChannelMemberGroupOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigChannelMemberGroup | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._microserviceLabels !== undefined) {
      hasAnyValues = true;
      internalValueResult.microserviceLabels = this._microserviceLabels;
    }
    if (this._microservicePort !== undefined) {
      hasAnyValues = true;
      internalValueResult.microservicePort = this._microservicePort;
    }
    if (this._microserviceVersion !== undefined) {
      hasAnyValues = true;
      internalValueResult.microserviceVersion = this._microserviceVersion;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._weight !== undefined) {
      hasAnyValues = true;
      internalValueResult.weight = this._weight;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigChannelMemberGroup | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._microserviceLabels = undefined;
      this._microservicePort = undefined;
      this._microserviceVersion = undefined;
      this._name = undefined;
      this._weight = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._description = value.description;
      this._microserviceLabels = value.microserviceLabels;
      this._microservicePort = value.microservicePort;
      this._microserviceVersion = value.microserviceVersion;
      this._name = value.name;
      this._weight = value.weight;
    }
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

  // microservice_labels - computed: true, optional: true, required: false
  private _microserviceLabels?: { [key: string]: string }; 
  public get microserviceLabels() {
    return this.getStringMapAttribute('microservice_labels');
  }
  public set microserviceLabels(value: { [key: string]: string }) {
    this._microserviceLabels = value;
  }
  public resetMicroserviceLabels() {
    this._microserviceLabels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get microserviceLabelsInput() {
    return this._microserviceLabels;
  }

  // microservice_port - computed: true, optional: true, required: false
  private _microservicePort?: number; 
  public get microservicePort() {
    return this.getNumberAttribute('microservice_port');
  }
  public set microservicePort(value: number) {
    this._microservicePort = value;
  }
  public resetMicroservicePort() {
    this._microservicePort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get microservicePortInput() {
    return this._microservicePort;
  }

  // microservice_version - computed: true, optional: true, required: false
  private _microserviceVersion?: string; 
  public get microserviceVersion() {
    return this.getStringAttribute('microservice_version');
  }
  public set microserviceVersion(value: string) {
    this._microserviceVersion = value;
  }
  public resetMicroserviceVersion() {
    this._microserviceVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get microserviceVersionInput() {
    return this._microserviceVersion;
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

  // weight - computed: true, optional: true, required: false
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

export class ApigChannelMemberGroupList extends cdktf.ComplexList {
  public internalValue? : ApigChannelMemberGroup[] | cdktf.IResolvable

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
  public get(index: number): ApigChannelMemberGroupOutputReference {
    return new ApigChannelMemberGroupOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigChannelMicroserviceCceConfig {
  /**
  * The ID of the CCE cluster.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#cluster_id ApigChannel#cluster_id}
  */
  readonly clusterId: string;
  /**
  * The service label key.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#label_key ApigChannel#label_key}
  */
  readonly labelKey?: string;
  /**
  * The service label value.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#label_value ApigChannel#label_value}
  */
  readonly labelValue?: string;
  /**
  * The name of the CCE namespace.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#namespace ApigChannel#namespace}
  */
  readonly namespace: string;
  /**
  * The workload name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#workload_name ApigChannel#workload_name}
  */
  readonly workloadName?: string;
  /**
  * The workload type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#workload_type ApigChannel#workload_type}
  */
  readonly workloadType: string;
}

export function apigChannelMicroserviceCceConfigToTerraform(struct?: ApigChannelMicroserviceCceConfigOutputReference | ApigChannelMicroserviceCceConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cluster_id: cdktf.stringToTerraform(struct!.clusterId),
    label_key: cdktf.stringToTerraform(struct!.labelKey),
    label_value: cdktf.stringToTerraform(struct!.labelValue),
    namespace: cdktf.stringToTerraform(struct!.namespace),
    workload_name: cdktf.stringToTerraform(struct!.workloadName),
    workload_type: cdktf.stringToTerraform(struct!.workloadType),
  }
}


export function apigChannelMicroserviceCceConfigToHclTerraform(struct?: ApigChannelMicroserviceCceConfigOutputReference | ApigChannelMicroserviceCceConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cluster_id: {
      value: cdktf.stringToHclTerraform(struct!.clusterId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    label_key: {
      value: cdktf.stringToHclTerraform(struct!.labelKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    label_value: {
      value: cdktf.stringToHclTerraform(struct!.labelValue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    namespace: {
      value: cdktf.stringToHclTerraform(struct!.namespace),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    workload_name: {
      value: cdktf.stringToHclTerraform(struct!.workloadName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    workload_type: {
      value: cdktf.stringToHclTerraform(struct!.workloadType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigChannelMicroserviceCceConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ApigChannelMicroserviceCceConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._clusterId !== undefined) {
      hasAnyValues = true;
      internalValueResult.clusterId = this._clusterId;
    }
    if (this._labelKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.labelKey = this._labelKey;
    }
    if (this._labelValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.labelValue = this._labelValue;
    }
    if (this._namespace !== undefined) {
      hasAnyValues = true;
      internalValueResult.namespace = this._namespace;
    }
    if (this._workloadName !== undefined) {
      hasAnyValues = true;
      internalValueResult.workloadName = this._workloadName;
    }
    if (this._workloadType !== undefined) {
      hasAnyValues = true;
      internalValueResult.workloadType = this._workloadType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigChannelMicroserviceCceConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._clusterId = undefined;
      this._labelKey = undefined;
      this._labelValue = undefined;
      this._namespace = undefined;
      this._workloadName = undefined;
      this._workloadType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._clusterId = value.clusterId;
      this._labelKey = value.labelKey;
      this._labelValue = value.labelValue;
      this._namespace = value.namespace;
      this._workloadName = value.workloadName;
      this._workloadType = value.workloadType;
    }
  }

  // cluster_id - computed: false, optional: false, required: true
  private _clusterId?: string; 
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }
  public set clusterId(value: string) {
    this._clusterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterIdInput() {
    return this._clusterId;
  }

  // label_key - computed: false, optional: true, required: false
  private _labelKey?: string; 
  public get labelKey() {
    return this.getStringAttribute('label_key');
  }
  public set labelKey(value: string) {
    this._labelKey = value;
  }
  public resetLabelKey() {
    this._labelKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get labelKeyInput() {
    return this._labelKey;
  }

  // label_value - computed: false, optional: true, required: false
  private _labelValue?: string; 
  public get labelValue() {
    return this.getStringAttribute('label_value');
  }
  public set labelValue(value: string) {
    this._labelValue = value;
  }
  public resetLabelValue() {
    this._labelValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get labelValueInput() {
    return this._labelValue;
  }

  // namespace - computed: false, optional: false, required: true
  private _namespace?: string; 
  public get namespace() {
    return this.getStringAttribute('namespace');
  }
  public set namespace(value: string) {
    this._namespace = value;
  }
  // Temporarily expose input value. Use with caution.
  public get namespaceInput() {
    return this._namespace;
  }

  // workload_name - computed: false, optional: true, required: false
  private _workloadName?: string; 
  public get workloadName() {
    return this.getStringAttribute('workload_name');
  }
  public set workloadName(value: string) {
    this._workloadName = value;
  }
  public resetWorkloadName() {
    this._workloadName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get workloadNameInput() {
    return this._workloadName;
  }

  // workload_type - computed: false, optional: false, required: true
  private _workloadType?: string; 
  public get workloadType() {
    return this.getStringAttribute('workload_type');
  }
  public set workloadType(value: string) {
    this._workloadType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workloadTypeInput() {
    return this._workloadType;
  }
}
export interface ApigChannelMicroserviceCseConfig {
  /**
  * schema:Internal; The microservice engine ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#engine_id ApigChannel#engine_id}
  */
  readonly engineId: string;
  /**
  * schema:Internal; The microservice ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#service_id ApigChannel#service_id}
  */
  readonly serviceId: string;
}

export function apigChannelMicroserviceCseConfigToTerraform(struct?: ApigChannelMicroserviceCseConfigOutputReference | ApigChannelMicroserviceCseConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    engine_id: cdktf.stringToTerraform(struct!.engineId),
    service_id: cdktf.stringToTerraform(struct!.serviceId),
  }
}


export function apigChannelMicroserviceCseConfigToHclTerraform(struct?: ApigChannelMicroserviceCseConfigOutputReference | ApigChannelMicroserviceCseConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    engine_id: {
      value: cdktf.stringToHclTerraform(struct!.engineId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    service_id: {
      value: cdktf.stringToHclTerraform(struct!.serviceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigChannelMicroserviceCseConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ApigChannelMicroserviceCseConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._engineId !== undefined) {
      hasAnyValues = true;
      internalValueResult.engineId = this._engineId;
    }
    if (this._serviceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.serviceId = this._serviceId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigChannelMicroserviceCseConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._engineId = undefined;
      this._serviceId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._engineId = value.engineId;
      this._serviceId = value.serviceId;
    }
  }

  // engine_id - computed: false, optional: false, required: true
  private _engineId?: string; 
  public get engineId() {
    return this.getStringAttribute('engine_id');
  }
  public set engineId(value: string) {
    this._engineId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get engineIdInput() {
    return this._engineId;
  }

  // service_id - computed: false, optional: false, required: true
  private _serviceId?: string; 
  public get serviceId() {
    return this.getStringAttribute('service_id');
  }
  public set serviceId(value: string) {
    this._serviceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceIdInput() {
    return this._serviceId;
  }
}
export interface ApigChannelMicroservice {
  /**
  * cce_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#cce_config ApigChannel#cce_config}
  */
  readonly cceConfig?: ApigChannelMicroserviceCceConfig;
  /**
  * cse_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#cse_config ApigChannel#cse_config}
  */
  readonly cseConfig?: ApigChannelMicroserviceCseConfig;
}

export function apigChannelMicroserviceToTerraform(struct?: ApigChannelMicroserviceOutputReference | ApigChannelMicroservice): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cce_config: apigChannelMicroserviceCceConfigToTerraform(struct!.cceConfig),
    cse_config: apigChannelMicroserviceCseConfigToTerraform(struct!.cseConfig),
  }
}


export function apigChannelMicroserviceToHclTerraform(struct?: ApigChannelMicroserviceOutputReference | ApigChannelMicroservice): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cce_config: {
      value: apigChannelMicroserviceCceConfigToHclTerraform(struct!.cceConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ApigChannelMicroserviceCceConfigList",
    },
    cse_config: {
      value: apigChannelMicroserviceCseConfigToHclTerraform(struct!.cseConfig),
      isBlock: true,
      type: "list",
      storageClassType: "ApigChannelMicroserviceCseConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigChannelMicroserviceOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ApigChannelMicroservice | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cceConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.cceConfig = this._cceConfig?.internalValue;
    }
    if (this._cseConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.cseConfig = this._cseConfig?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigChannelMicroservice | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._cceConfig.internalValue = undefined;
      this._cseConfig.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._cceConfig.internalValue = value.cceConfig;
      this._cseConfig.internalValue = value.cseConfig;
    }
  }

  // cce_config - computed: false, optional: true, required: false
  private _cceConfig = new ApigChannelMicroserviceCceConfigOutputReference(this, "cce_config");
  public get cceConfig() {
    return this._cceConfig;
  }
  public putCceConfig(value: ApigChannelMicroserviceCceConfig) {
    this._cceConfig.internalValue = value;
  }
  public resetCceConfig() {
    this._cceConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cceConfigInput() {
    return this._cceConfig.internalValue;
  }

  // cse_config - computed: false, optional: true, required: false
  private _cseConfig = new ApigChannelMicroserviceCseConfigOutputReference(this, "cse_config");
  public get cseConfig() {
    return this._cseConfig;
  }
  public putCseConfig(value: ApigChannelMicroserviceCseConfig) {
    this._cseConfig.internalValue = value;
  }
  public resetCseConfig() {
    this._cseConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cseConfigInput() {
    return this._cseConfig.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel huaweicloud_apig_channel}
*/
export class ApigChannel extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_apig_channel";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ApigChannel resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ApigChannel to import
  * @param importFromId The id of the existing ApigChannel that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ApigChannel to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_apig_channel", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_channel huaweicloud_apig_channel} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ApigChannelConfig
  */
  public constructor(scope: Construct, id: string, config: ApigChannelConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_apig_channel',
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
    this._balanceStrategy = config.balanceStrategy;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._memberType = config.memberType;
    this._name = config.name;
    this._port = config.port;
    this._region = config.region;
    this._type = config.type;
    this._healthCheck.internalValue = config.healthCheck;
    this._member.internalValue = config.member;
    this._memberGroup.internalValue = config.memberGroup;
    this._microservice.internalValue = config.microservice;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // balance_strategy - computed: false, optional: false, required: true
  private _balanceStrategy?: number; 
  public get balanceStrategy() {
    return this.getNumberAttribute('balance_strategy');
  }
  public set balanceStrategy(value: number) {
    this._balanceStrategy = value;
  }
  // Temporarily expose input value. Use with caution.
  public get balanceStrategyInput() {
    return this._balanceStrategy;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // member_type - computed: true, optional: true, required: false
  private _memberType?: string; 
  public get memberType() {
    return this.getStringAttribute('member_type');
  }
  public set memberType(value: string) {
    this._memberType = value;
  }
  public resetMemberType() {
    this._memberType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get memberTypeInput() {
    return this._memberType;
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
    return this.getNumberAttribute('status');
  }

  // type - computed: true, optional: true, required: false
  private _type?: number; 
  public get type() {
    return this.getNumberAttribute('type');
  }
  public set type(value: number) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // health_check - computed: false, optional: true, required: false
  private _healthCheck = new ApigChannelHealthCheckOutputReference(this, "health_check");
  public get healthCheck() {
    return this._healthCheck;
  }
  public putHealthCheck(value: ApigChannelHealthCheck) {
    this._healthCheck.internalValue = value;
  }
  public resetHealthCheck() {
    this._healthCheck.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckInput() {
    return this._healthCheck.internalValue;
  }

  // member - computed: false, optional: true, required: false
  private _member = new ApigChannelMemberList(this, "member", true);
  public get member() {
    return this._member;
  }
  public putMember(value: ApigChannelMember[] | cdktf.IResolvable) {
    this._member.internalValue = value;
  }
  public resetMember() {
    this._member.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get memberInput() {
    return this._member.internalValue;
  }

  // member_group - computed: false, optional: true, required: false
  private _memberGroup = new ApigChannelMemberGroupList(this, "member_group", false);
  public get memberGroup() {
    return this._memberGroup;
  }
  public putMemberGroup(value: ApigChannelMemberGroup[] | cdktf.IResolvable) {
    this._memberGroup.internalValue = value;
  }
  public resetMemberGroup() {
    this._memberGroup.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get memberGroupInput() {
    return this._memberGroup.internalValue;
  }

  // microservice - computed: false, optional: true, required: false
  private _microservice = new ApigChannelMicroserviceOutputReference(this, "microservice");
  public get microservice() {
    return this._microservice;
  }
  public putMicroservice(value: ApigChannelMicroservice) {
    this._microservice.internalValue = value;
  }
  public resetMicroservice() {
    this._microservice.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get microserviceInput() {
    return this._microservice.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      balance_strategy: cdktf.numberToTerraform(this._balanceStrategy),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      member_type: cdktf.stringToTerraform(this._memberType),
      name: cdktf.stringToTerraform(this._name),
      port: cdktf.numberToTerraform(this._port),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.numberToTerraform(this._type),
      health_check: apigChannelHealthCheckToTerraform(this._healthCheck.internalValue),
      member: cdktf.listMapper(apigChannelMemberToTerraform, true)(this._member.internalValue),
      member_group: cdktf.listMapper(apigChannelMemberGroupToTerraform, true)(this._memberGroup.internalValue),
      microservice: apigChannelMicroserviceToTerraform(this._microservice.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      balance_strategy: {
        value: cdktf.numberToHclTerraform(this._balanceStrategy),
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      member_type: {
        value: cdktf.stringToHclTerraform(this._memberType),
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
      port: {
        value: cdktf.numberToHclTerraform(this._port),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      type: {
        value: cdktf.numberToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      health_check: {
        value: apigChannelHealthCheckToHclTerraform(this._healthCheck.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ApigChannelHealthCheckList",
      },
      member: {
        value: cdktf.listMapperHcl(apigChannelMemberToHclTerraform, true)(this._member.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ApigChannelMemberList",
      },
      member_group: {
        value: cdktf.listMapperHcl(apigChannelMemberGroupToHclTerraform, true)(this._memberGroup.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ApigChannelMemberGroupList",
      },
      microservice: {
        value: apigChannelMicroserviceToHclTerraform(this._microservice.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ApigChannelMicroserviceList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

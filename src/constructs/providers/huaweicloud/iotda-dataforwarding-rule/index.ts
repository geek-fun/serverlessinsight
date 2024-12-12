// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IotdaDataforwardingRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#description IotdaDataforwardingRule#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#enabled IotdaDataforwardingRule#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#id IotdaDataforwardingRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#name IotdaDataforwardingRule#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#region IotdaDataforwardingRule#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#select IotdaDataforwardingRule#select}
  */
  readonly select?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#space_id IotdaDataforwardingRule#space_id}
  */
  readonly spaceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#trigger IotdaDataforwardingRule#trigger}
  */
  readonly trigger: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#where IotdaDataforwardingRule#where}
  */
  readonly where?: string;
  /**
  * targets block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#targets IotdaDataforwardingRule#targets}
  */
  readonly targets?: IotdaDataforwardingRuleTargets[] | cdktf.IResolvable;
}
export interface IotdaDataforwardingRuleTargetsAmqpForwarding {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#queue_name IotdaDataforwardingRule#queue_name}
  */
  readonly queueName: string;
}

export function iotdaDataforwardingRuleTargetsAmqpForwardingToTerraform(struct?: IotdaDataforwardingRuleTargetsAmqpForwardingOutputReference | IotdaDataforwardingRuleTargetsAmqpForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    queue_name: cdktf.stringToTerraform(struct!.queueName),
  }
}


export function iotdaDataforwardingRuleTargetsAmqpForwardingToHclTerraform(struct?: IotdaDataforwardingRuleTargetsAmqpForwardingOutputReference | IotdaDataforwardingRuleTargetsAmqpForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    queue_name: {
      value: cdktf.stringToHclTerraform(struct!.queueName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDataforwardingRuleTargetsAmqpForwardingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDataforwardingRuleTargetsAmqpForwarding | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._queueName !== undefined) {
      hasAnyValues = true;
      internalValueResult.queueName = this._queueName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDataforwardingRuleTargetsAmqpForwarding | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._queueName = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._queueName = value.queueName;
    }
  }

  // queue_name - computed: false, optional: false, required: true
  private _queueName?: string; 
  public get queueName() {
    return this.getStringAttribute('queue_name');
  }
  public set queueName(value: string) {
    this._queueName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get queueNameInput() {
    return this._queueName;
  }
}
export interface IotdaDataforwardingRuleTargetsDisForwarding {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#project_id IotdaDataforwardingRule#project_id}
  */
  readonly projectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#region IotdaDataforwardingRule#region}
  */
  readonly region: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#stream_id IotdaDataforwardingRule#stream_id}
  */
  readonly streamId: string;
}

export function iotdaDataforwardingRuleTargetsDisForwardingToTerraform(struct?: IotdaDataforwardingRuleTargetsDisForwardingOutputReference | IotdaDataforwardingRuleTargetsDisForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    project_id: cdktf.stringToTerraform(struct!.projectId),
    region: cdktf.stringToTerraform(struct!.region),
    stream_id: cdktf.stringToTerraform(struct!.streamId),
  }
}


export function iotdaDataforwardingRuleTargetsDisForwardingToHclTerraform(struct?: IotdaDataforwardingRuleTargetsDisForwardingOutputReference | IotdaDataforwardingRuleTargetsDisForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    project_id: {
      value: cdktf.stringToHclTerraform(struct!.projectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region: {
      value: cdktf.stringToHclTerraform(struct!.region),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    stream_id: {
      value: cdktf.stringToHclTerraform(struct!.streamId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDataforwardingRuleTargetsDisForwardingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDataforwardingRuleTargetsDisForwarding | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._projectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.projectId = this._projectId;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._streamId !== undefined) {
      hasAnyValues = true;
      internalValueResult.streamId = this._streamId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDataforwardingRuleTargetsDisForwarding | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._projectId = undefined;
      this._region = undefined;
      this._streamId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._projectId = value.projectId;
      this._region = value.region;
      this._streamId = value.streamId;
    }
  }

  // project_id - computed: true, optional: true, required: false
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  public resetProjectId() {
    this._projectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
  }

  // region - computed: false, optional: false, required: true
  private _region?: string; 
  public get region() {
    return this.getStringAttribute('region');
  }
  public set region(value: string) {
    this._region = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionInput() {
    return this._region;
  }

  // stream_id - computed: false, optional: false, required: true
  private _streamId?: string; 
  public get streamId() {
    return this.getStringAttribute('stream_id');
  }
  public set streamId(value: string) {
    this._streamId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get streamIdInput() {
    return this._streamId;
  }
}
export interface IotdaDataforwardingRuleTargetsFgsForwarding {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#func_name IotdaDataforwardingRule#func_name}
  */
  readonly funcName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#func_urn IotdaDataforwardingRule#func_urn}
  */
  readonly funcUrn: string;
}

export function iotdaDataforwardingRuleTargetsFgsForwardingToTerraform(struct?: IotdaDataforwardingRuleTargetsFgsForwardingOutputReference | IotdaDataforwardingRuleTargetsFgsForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    func_name: cdktf.stringToTerraform(struct!.funcName),
    func_urn: cdktf.stringToTerraform(struct!.funcUrn),
  }
}


export function iotdaDataforwardingRuleTargetsFgsForwardingToHclTerraform(struct?: IotdaDataforwardingRuleTargetsFgsForwardingOutputReference | IotdaDataforwardingRuleTargetsFgsForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    func_name: {
      value: cdktf.stringToHclTerraform(struct!.funcName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    func_urn: {
      value: cdktf.stringToHclTerraform(struct!.funcUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDataforwardingRuleTargetsFgsForwardingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDataforwardingRuleTargetsFgsForwarding | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._funcName !== undefined) {
      hasAnyValues = true;
      internalValueResult.funcName = this._funcName;
    }
    if (this._funcUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.funcUrn = this._funcUrn;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDataforwardingRuleTargetsFgsForwarding | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._funcName = undefined;
      this._funcUrn = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._funcName = value.funcName;
      this._funcUrn = value.funcUrn;
    }
  }

  // func_name - computed: false, optional: false, required: true
  private _funcName?: string; 
  public get funcName() {
    return this.getStringAttribute('func_name');
  }
  public set funcName(value: string) {
    this._funcName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get funcNameInput() {
    return this._funcName;
  }

  // func_urn - computed: false, optional: false, required: true
  private _funcUrn?: string; 
  public get funcUrn() {
    return this.getStringAttribute('func_urn');
  }
  public set funcUrn(value: string) {
    this._funcUrn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get funcUrnInput() {
    return this._funcUrn;
  }
}
export interface IotdaDataforwardingRuleTargetsHttpForwarding {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#url IotdaDataforwardingRule#url}
  */
  readonly url: string;
}

export function iotdaDataforwardingRuleTargetsHttpForwardingToTerraform(struct?: IotdaDataforwardingRuleTargetsHttpForwardingOutputReference | IotdaDataforwardingRuleTargetsHttpForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    url: cdktf.stringToTerraform(struct!.url),
  }
}


export function iotdaDataforwardingRuleTargetsHttpForwardingToHclTerraform(struct?: IotdaDataforwardingRuleTargetsHttpForwardingOutputReference | IotdaDataforwardingRuleTargetsHttpForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    url: {
      value: cdktf.stringToHclTerraform(struct!.url),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDataforwardingRuleTargetsHttpForwardingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDataforwardingRuleTargetsHttpForwarding | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._url !== undefined) {
      hasAnyValues = true;
      internalValueResult.url = this._url;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDataforwardingRuleTargetsHttpForwarding | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._url = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._url = value.url;
    }
  }

  // url - computed: false, optional: false, required: true
  private _url?: string; 
  public get url() {
    return this.getStringAttribute('url');
  }
  public set url(value: string) {
    this._url = value;
  }
  // Temporarily expose input value. Use with caution.
  public get urlInput() {
    return this._url;
  }
}
export interface IotdaDataforwardingRuleTargetsKafkaForwardingAddresses {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#domain IotdaDataforwardingRule#domain}
  */
  readonly domain?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#ip IotdaDataforwardingRule#ip}
  */
  readonly ip?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#port IotdaDataforwardingRule#port}
  */
  readonly port: number;
}

export function iotdaDataforwardingRuleTargetsKafkaForwardingAddressesToTerraform(struct?: IotdaDataforwardingRuleTargetsKafkaForwardingAddresses | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    domain: cdktf.stringToTerraform(struct!.domain),
    ip: cdktf.stringToTerraform(struct!.ip),
    port: cdktf.numberToTerraform(struct!.port),
  }
}


export function iotdaDataforwardingRuleTargetsKafkaForwardingAddressesToHclTerraform(struct?: IotdaDataforwardingRuleTargetsKafkaForwardingAddresses | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    domain: {
      value: cdktf.stringToHclTerraform(struct!.domain),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ip: {
      value: cdktf.stringToHclTerraform(struct!.ip),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDataforwardingRuleTargetsKafkaForwardingAddressesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): IotdaDataforwardingRuleTargetsKafkaForwardingAddresses | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._domain !== undefined) {
      hasAnyValues = true;
      internalValueResult.domain = this._domain;
    }
    if (this._ip !== undefined) {
      hasAnyValues = true;
      internalValueResult.ip = this._ip;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDataforwardingRuleTargetsKafkaForwardingAddresses | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._domain = undefined;
      this._ip = undefined;
      this._port = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._domain = value.domain;
      this._ip = value.ip;
      this._port = value.port;
    }
  }

  // domain - computed: false, optional: true, required: false
  private _domain?: string; 
  public get domain() {
    return this.getStringAttribute('domain');
  }
  public set domain(value: string) {
    this._domain = value;
  }
  public resetDomain() {
    this._domain = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainInput() {
    return this._domain;
  }

  // ip - computed: false, optional: true, required: false
  private _ip?: string; 
  public get ip() {
    return this.getStringAttribute('ip');
  }
  public set ip(value: string) {
    this._ip = value;
  }
  public resetIp() {
    this._ip = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipInput() {
    return this._ip;
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
}

export class IotdaDataforwardingRuleTargetsKafkaForwardingAddressesList extends cdktf.ComplexList {
  public internalValue? : IotdaDataforwardingRuleTargetsKafkaForwardingAddresses[] | cdktf.IResolvable

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
  public get(index: number): IotdaDataforwardingRuleTargetsKafkaForwardingAddressesOutputReference {
    return new IotdaDataforwardingRuleTargetsKafkaForwardingAddressesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface IotdaDataforwardingRuleTargetsKafkaForwarding {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#password IotdaDataforwardingRule#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#project_id IotdaDataforwardingRule#project_id}
  */
  readonly projectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#region IotdaDataforwardingRule#region}
  */
  readonly region: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#topic IotdaDataforwardingRule#topic}
  */
  readonly topic: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#user_name IotdaDataforwardingRule#user_name}
  */
  readonly userName?: string;
  /**
  * addresses block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#addresses IotdaDataforwardingRule#addresses}
  */
  readonly addresses: IotdaDataforwardingRuleTargetsKafkaForwardingAddresses[] | cdktf.IResolvable;
}

export function iotdaDataforwardingRuleTargetsKafkaForwardingToTerraform(struct?: IotdaDataforwardingRuleTargetsKafkaForwardingOutputReference | IotdaDataforwardingRuleTargetsKafkaForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    password: cdktf.stringToTerraform(struct!.password),
    project_id: cdktf.stringToTerraform(struct!.projectId),
    region: cdktf.stringToTerraform(struct!.region),
    topic: cdktf.stringToTerraform(struct!.topic),
    user_name: cdktf.stringToTerraform(struct!.userName),
    addresses: cdktf.listMapper(iotdaDataforwardingRuleTargetsKafkaForwardingAddressesToTerraform, true)(struct!.addresses),
  }
}


export function iotdaDataforwardingRuleTargetsKafkaForwardingToHclTerraform(struct?: IotdaDataforwardingRuleTargetsKafkaForwardingOutputReference | IotdaDataforwardingRuleTargetsKafkaForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    project_id: {
      value: cdktf.stringToHclTerraform(struct!.projectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region: {
      value: cdktf.stringToHclTerraform(struct!.region),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic: {
      value: cdktf.stringToHclTerraform(struct!.topic),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user_name: {
      value: cdktf.stringToHclTerraform(struct!.userName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    addresses: {
      value: cdktf.listMapperHcl(iotdaDataforwardingRuleTargetsKafkaForwardingAddressesToHclTerraform, true)(struct!.addresses),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDataforwardingRuleTargetsKafkaForwardingAddressesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDataforwardingRuleTargetsKafkaForwardingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDataforwardingRuleTargetsKafkaForwarding | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._projectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.projectId = this._projectId;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._topic !== undefined) {
      hasAnyValues = true;
      internalValueResult.topic = this._topic;
    }
    if (this._userName !== undefined) {
      hasAnyValues = true;
      internalValueResult.userName = this._userName;
    }
    if (this._addresses?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.addresses = this._addresses?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDataforwardingRuleTargetsKafkaForwarding | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._password = undefined;
      this._projectId = undefined;
      this._region = undefined;
      this._topic = undefined;
      this._userName = undefined;
      this._addresses.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._password = value.password;
      this._projectId = value.projectId;
      this._region = value.region;
      this._topic = value.topic;
      this._userName = value.userName;
      this._addresses.internalValue = value.addresses;
    }
  }

  // password - computed: false, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // project_id - computed: true, optional: true, required: false
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  public resetProjectId() {
    this._projectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
  }

  // region - computed: false, optional: false, required: true
  private _region?: string; 
  public get region() {
    return this.getStringAttribute('region');
  }
  public set region(value: string) {
    this._region = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionInput() {
    return this._region;
  }

  // topic - computed: false, optional: false, required: true
  private _topic?: string; 
  public get topic() {
    return this.getStringAttribute('topic');
  }
  public set topic(value: string) {
    this._topic = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicInput() {
    return this._topic;
  }

  // user_name - computed: false, optional: true, required: false
  private _userName?: string; 
  public get userName() {
    return this.getStringAttribute('user_name');
  }
  public set userName(value: string) {
    this._userName = value;
  }
  public resetUserName() {
    this._userName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userNameInput() {
    return this._userName;
  }

  // addresses - computed: false, optional: false, required: true
  private _addresses = new IotdaDataforwardingRuleTargetsKafkaForwardingAddressesList(this, "addresses", false);
  public get addresses() {
    return this._addresses;
  }
  public putAddresses(value: IotdaDataforwardingRuleTargetsKafkaForwardingAddresses[] | cdktf.IResolvable) {
    this._addresses.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get addressesInput() {
    return this._addresses.internalValue;
  }
}
export interface IotdaDataforwardingRuleTargetsObsForwarding {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#bucket IotdaDataforwardingRule#bucket}
  */
  readonly bucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#custom_directory IotdaDataforwardingRule#custom_directory}
  */
  readonly customDirectory?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#project_id IotdaDataforwardingRule#project_id}
  */
  readonly projectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#region IotdaDataforwardingRule#region}
  */
  readonly region: string;
}

export function iotdaDataforwardingRuleTargetsObsForwardingToTerraform(struct?: IotdaDataforwardingRuleTargetsObsForwardingOutputReference | IotdaDataforwardingRuleTargetsObsForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bucket: cdktf.stringToTerraform(struct!.bucket),
    custom_directory: cdktf.stringToTerraform(struct!.customDirectory),
    project_id: cdktf.stringToTerraform(struct!.projectId),
    region: cdktf.stringToTerraform(struct!.region),
  }
}


export function iotdaDataforwardingRuleTargetsObsForwardingToHclTerraform(struct?: IotdaDataforwardingRuleTargetsObsForwardingOutputReference | IotdaDataforwardingRuleTargetsObsForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bucket: {
      value: cdktf.stringToHclTerraform(struct!.bucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    custom_directory: {
      value: cdktf.stringToHclTerraform(struct!.customDirectory),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    project_id: {
      value: cdktf.stringToHclTerraform(struct!.projectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    region: {
      value: cdktf.stringToHclTerraform(struct!.region),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDataforwardingRuleTargetsObsForwardingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDataforwardingRuleTargetsObsForwarding | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucket = this._bucket;
    }
    if (this._customDirectory !== undefined) {
      hasAnyValues = true;
      internalValueResult.customDirectory = this._customDirectory;
    }
    if (this._projectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.projectId = this._projectId;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDataforwardingRuleTargetsObsForwarding | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bucket = undefined;
      this._customDirectory = undefined;
      this._projectId = undefined;
      this._region = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bucket = value.bucket;
      this._customDirectory = value.customDirectory;
      this._projectId = value.projectId;
      this._region = value.region;
    }
  }

  // bucket - computed: false, optional: false, required: true
  private _bucket?: string; 
  public get bucket() {
    return this.getStringAttribute('bucket');
  }
  public set bucket(value: string) {
    this._bucket = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketInput() {
    return this._bucket;
  }

  // custom_directory - computed: true, optional: true, required: false
  private _customDirectory?: string; 
  public get customDirectory() {
    return this.getStringAttribute('custom_directory');
  }
  public set customDirectory(value: string) {
    this._customDirectory = value;
  }
  public resetCustomDirectory() {
    this._customDirectory = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customDirectoryInput() {
    return this._customDirectory;
  }

  // project_id - computed: true, optional: true, required: false
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  public resetProjectId() {
    this._projectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
  }

  // region - computed: false, optional: false, required: true
  private _region?: string; 
  public get region() {
    return this.getStringAttribute('region');
  }
  public set region(value: string) {
    this._region = value;
  }
  // Temporarily expose input value. Use with caution.
  public get regionInput() {
    return this._region;
  }
}
export interface IotdaDataforwardingRuleTargets {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#type IotdaDataforwardingRule#type}
  */
  readonly type: string;
  /**
  * amqp_forwarding block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#amqp_forwarding IotdaDataforwardingRule#amqp_forwarding}
  */
  readonly amqpForwarding?: IotdaDataforwardingRuleTargetsAmqpForwarding;
  /**
  * dis_forwarding block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#dis_forwarding IotdaDataforwardingRule#dis_forwarding}
  */
  readonly disForwarding?: IotdaDataforwardingRuleTargetsDisForwarding;
  /**
  * fgs_forwarding block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#fgs_forwarding IotdaDataforwardingRule#fgs_forwarding}
  */
  readonly fgsForwarding?: IotdaDataforwardingRuleTargetsFgsForwarding;
  /**
  * http_forwarding block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#http_forwarding IotdaDataforwardingRule#http_forwarding}
  */
  readonly httpForwarding?: IotdaDataforwardingRuleTargetsHttpForwarding;
  /**
  * kafka_forwarding block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#kafka_forwarding IotdaDataforwardingRule#kafka_forwarding}
  */
  readonly kafkaForwarding?: IotdaDataforwardingRuleTargetsKafkaForwarding;
  /**
  * obs_forwarding block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#obs_forwarding IotdaDataforwardingRule#obs_forwarding}
  */
  readonly obsForwarding?: IotdaDataforwardingRuleTargetsObsForwarding;
}

export function iotdaDataforwardingRuleTargetsToTerraform(struct?: IotdaDataforwardingRuleTargets | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    amqp_forwarding: iotdaDataforwardingRuleTargetsAmqpForwardingToTerraform(struct!.amqpForwarding),
    dis_forwarding: iotdaDataforwardingRuleTargetsDisForwardingToTerraform(struct!.disForwarding),
    fgs_forwarding: iotdaDataforwardingRuleTargetsFgsForwardingToTerraform(struct!.fgsForwarding),
    http_forwarding: iotdaDataforwardingRuleTargetsHttpForwardingToTerraform(struct!.httpForwarding),
    kafka_forwarding: iotdaDataforwardingRuleTargetsKafkaForwardingToTerraform(struct!.kafkaForwarding),
    obs_forwarding: iotdaDataforwardingRuleTargetsObsForwardingToTerraform(struct!.obsForwarding),
  }
}


export function iotdaDataforwardingRuleTargetsToHclTerraform(struct?: IotdaDataforwardingRuleTargets | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    amqp_forwarding: {
      value: iotdaDataforwardingRuleTargetsAmqpForwardingToHclTerraform(struct!.amqpForwarding),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDataforwardingRuleTargetsAmqpForwardingList",
    },
    dis_forwarding: {
      value: iotdaDataforwardingRuleTargetsDisForwardingToHclTerraform(struct!.disForwarding),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDataforwardingRuleTargetsDisForwardingList",
    },
    fgs_forwarding: {
      value: iotdaDataforwardingRuleTargetsFgsForwardingToHclTerraform(struct!.fgsForwarding),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDataforwardingRuleTargetsFgsForwardingList",
    },
    http_forwarding: {
      value: iotdaDataforwardingRuleTargetsHttpForwardingToHclTerraform(struct!.httpForwarding),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDataforwardingRuleTargetsHttpForwardingList",
    },
    kafka_forwarding: {
      value: iotdaDataforwardingRuleTargetsKafkaForwardingToHclTerraform(struct!.kafkaForwarding),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDataforwardingRuleTargetsKafkaForwardingList",
    },
    obs_forwarding: {
      value: iotdaDataforwardingRuleTargetsObsForwardingToHclTerraform(struct!.obsForwarding),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDataforwardingRuleTargetsObsForwardingList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDataforwardingRuleTargetsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): IotdaDataforwardingRuleTargets | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._amqpForwarding?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.amqpForwarding = this._amqpForwarding?.internalValue;
    }
    if (this._disForwarding?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.disForwarding = this._disForwarding?.internalValue;
    }
    if (this._fgsForwarding?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.fgsForwarding = this._fgsForwarding?.internalValue;
    }
    if (this._httpForwarding?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpForwarding = this._httpForwarding?.internalValue;
    }
    if (this._kafkaForwarding?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.kafkaForwarding = this._kafkaForwarding?.internalValue;
    }
    if (this._obsForwarding?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsForwarding = this._obsForwarding?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDataforwardingRuleTargets | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._type = undefined;
      this._amqpForwarding.internalValue = undefined;
      this._disForwarding.internalValue = undefined;
      this._fgsForwarding.internalValue = undefined;
      this._httpForwarding.internalValue = undefined;
      this._kafkaForwarding.internalValue = undefined;
      this._obsForwarding.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._type = value.type;
      this._amqpForwarding.internalValue = value.amqpForwarding;
      this._disForwarding.internalValue = value.disForwarding;
      this._fgsForwarding.internalValue = value.fgsForwarding;
      this._httpForwarding.internalValue = value.httpForwarding;
      this._kafkaForwarding.internalValue = value.kafkaForwarding;
      this._obsForwarding.internalValue = value.obsForwarding;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
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

  // amqp_forwarding - computed: false, optional: true, required: false
  private _amqpForwarding = new IotdaDataforwardingRuleTargetsAmqpForwardingOutputReference(this, "amqp_forwarding");
  public get amqpForwarding() {
    return this._amqpForwarding;
  }
  public putAmqpForwarding(value: IotdaDataforwardingRuleTargetsAmqpForwarding) {
    this._amqpForwarding.internalValue = value;
  }
  public resetAmqpForwarding() {
    this._amqpForwarding.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get amqpForwardingInput() {
    return this._amqpForwarding.internalValue;
  }

  // dis_forwarding - computed: false, optional: true, required: false
  private _disForwarding = new IotdaDataforwardingRuleTargetsDisForwardingOutputReference(this, "dis_forwarding");
  public get disForwarding() {
    return this._disForwarding;
  }
  public putDisForwarding(value: IotdaDataforwardingRuleTargetsDisForwarding) {
    this._disForwarding.internalValue = value;
  }
  public resetDisForwarding() {
    this._disForwarding.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disForwardingInput() {
    return this._disForwarding.internalValue;
  }

  // fgs_forwarding - computed: false, optional: true, required: false
  private _fgsForwarding = new IotdaDataforwardingRuleTargetsFgsForwardingOutputReference(this, "fgs_forwarding");
  public get fgsForwarding() {
    return this._fgsForwarding;
  }
  public putFgsForwarding(value: IotdaDataforwardingRuleTargetsFgsForwarding) {
    this._fgsForwarding.internalValue = value;
  }
  public resetFgsForwarding() {
    this._fgsForwarding.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fgsForwardingInput() {
    return this._fgsForwarding.internalValue;
  }

  // http_forwarding - computed: false, optional: true, required: false
  private _httpForwarding = new IotdaDataforwardingRuleTargetsHttpForwardingOutputReference(this, "http_forwarding");
  public get httpForwarding() {
    return this._httpForwarding;
  }
  public putHttpForwarding(value: IotdaDataforwardingRuleTargetsHttpForwarding) {
    this._httpForwarding.internalValue = value;
  }
  public resetHttpForwarding() {
    this._httpForwarding.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpForwardingInput() {
    return this._httpForwarding.internalValue;
  }

  // kafka_forwarding - computed: false, optional: true, required: false
  private _kafkaForwarding = new IotdaDataforwardingRuleTargetsKafkaForwardingOutputReference(this, "kafka_forwarding");
  public get kafkaForwarding() {
    return this._kafkaForwarding;
  }
  public putKafkaForwarding(value: IotdaDataforwardingRuleTargetsKafkaForwarding) {
    this._kafkaForwarding.internalValue = value;
  }
  public resetKafkaForwarding() {
    this._kafkaForwarding.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kafkaForwardingInput() {
    return this._kafkaForwarding.internalValue;
  }

  // obs_forwarding - computed: false, optional: true, required: false
  private _obsForwarding = new IotdaDataforwardingRuleTargetsObsForwardingOutputReference(this, "obs_forwarding");
  public get obsForwarding() {
    return this._obsForwarding;
  }
  public putObsForwarding(value: IotdaDataforwardingRuleTargetsObsForwarding) {
    this._obsForwarding.internalValue = value;
  }
  public resetObsForwarding() {
    this._obsForwarding.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsForwardingInput() {
    return this._obsForwarding.internalValue;
  }
}

export class IotdaDataforwardingRuleTargetsList extends cdktf.ComplexList {
  public internalValue? : IotdaDataforwardingRuleTargets[] | cdktf.IResolvable

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
  public get(index: number): IotdaDataforwardingRuleTargetsOutputReference {
    return new IotdaDataforwardingRuleTargetsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule huaweicloud_iotda_dataforwarding_rule}
*/
export class IotdaDataforwardingRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_iotda_dataforwarding_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IotdaDataforwardingRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IotdaDataforwardingRule to import
  * @param importFromId The id of the existing IotdaDataforwardingRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IotdaDataforwardingRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_iotda_dataforwarding_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_dataforwarding_rule huaweicloud_iotda_dataforwarding_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IotdaDataforwardingRuleConfig
  */
  public constructor(scope: Construct, id: string, config: IotdaDataforwardingRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_iotda_dataforwarding_rule',
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
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._select = config.select;
    this._spaceId = config.spaceId;
    this._trigger = config.trigger;
    this._where = config.where;
    this._targets.internalValue = config.targets;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // select - computed: false, optional: true, required: false
  private _select?: string; 
  public get select() {
    return this.getStringAttribute('select');
  }
  public set select(value: string) {
    this._select = value;
  }
  public resetSelect() {
    this._select = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get selectInput() {
    return this._select;
  }

  // space_id - computed: true, optional: true, required: false
  private _spaceId?: string; 
  public get spaceId() {
    return this.getStringAttribute('space_id');
  }
  public set spaceId(value: string) {
    this._spaceId = value;
  }
  public resetSpaceId() {
    this._spaceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get spaceIdInput() {
    return this._spaceId;
  }

  // trigger - computed: false, optional: false, required: true
  private _trigger?: string; 
  public get trigger() {
    return this.getStringAttribute('trigger');
  }
  public set trigger(value: string) {
    this._trigger = value;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerInput() {
    return this._trigger;
  }

  // where - computed: false, optional: true, required: false
  private _where?: string; 
  public get where() {
    return this.getStringAttribute('where');
  }
  public set where(value: string) {
    this._where = value;
  }
  public resetWhere() {
    this._where = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get whereInput() {
    return this._where;
  }

  // targets - computed: false, optional: true, required: false
  private _targets = new IotdaDataforwardingRuleTargetsList(this, "targets", true);
  public get targets() {
    return this._targets;
  }
  public putTargets(value: IotdaDataforwardingRuleTargets[] | cdktf.IResolvable) {
    this._targets.internalValue = value;
  }
  public resetTargets() {
    this._targets.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get targetsInput() {
    return this._targets.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      enabled: cdktf.booleanToTerraform(this._enabled),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      select: cdktf.stringToTerraform(this._select),
      space_id: cdktf.stringToTerraform(this._spaceId),
      trigger: cdktf.stringToTerraform(this._trigger),
      where: cdktf.stringToTerraform(this._where),
      targets: cdktf.listMapper(iotdaDataforwardingRuleTargetsToTerraform, true)(this._targets.internalValue),
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
      select: {
        value: cdktf.stringToHclTerraform(this._select),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      space_id: {
        value: cdktf.stringToHclTerraform(this._spaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      trigger: {
        value: cdktf.stringToHclTerraform(this._trigger),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      where: {
        value: cdktf.stringToHclTerraform(this._where),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      targets: {
        value: cdktf.listMapperHcl(iotdaDataforwardingRuleTargetsToHclTerraform, true)(this._targets.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "IotdaDataforwardingRuleTargetsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

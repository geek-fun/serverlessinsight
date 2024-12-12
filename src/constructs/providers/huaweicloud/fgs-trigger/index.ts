// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface FgsTriggerConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#function_urn FgsTrigger#function_urn}
  */
  readonly functionUrn: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#id FgsTrigger#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#region FgsTrigger#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#status FgsTrigger#status}
  */
  readonly status?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#type FgsTrigger#type}
  */
  readonly type: string;
  /**
  * apig block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#apig FgsTrigger#apig}
  */
  readonly apig?: FgsTriggerApig;
  /**
  * dis block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#dis FgsTrigger#dis}
  */
  readonly dis?: FgsTriggerDis;
  /**
  * kafka block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#kafka FgsTrigger#kafka}
  */
  readonly kafka?: FgsTriggerKafka;
  /**
  * lts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#lts FgsTrigger#lts}
  */
  readonly lts?: FgsTriggerLts;
  /**
  * obs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#obs FgsTrigger#obs}
  */
  readonly obs?: FgsTriggerObs;
  /**
  * smn block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#smn FgsTrigger#smn}
  */
  readonly smn?: FgsTriggerSmn;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#timeouts FgsTrigger#timeouts}
  */
  readonly timeouts?: FgsTriggerTimeouts;
  /**
  * timer block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#timer FgsTrigger#timer}
  */
  readonly timer?: FgsTriggerTimer;
}
export interface FgsTriggerApig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#api_name FgsTrigger#api_name}
  */
  readonly apiName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#env_name FgsTrigger#env_name}
  */
  readonly envName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#group_id FgsTrigger#group_id}
  */
  readonly groupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#instance_id FgsTrigger#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#request_protocol FgsTrigger#request_protocol}
  */
  readonly requestProtocol?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#security_authentication FgsTrigger#security_authentication}
  */
  readonly securityAuthentication?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#timeout FgsTrigger#timeout}
  */
  readonly timeout?: number;
}

export function fgsTriggerApigToTerraform(struct?: FgsTriggerApigOutputReference | FgsTriggerApig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    api_name: cdktf.stringToTerraform(struct!.apiName),
    env_name: cdktf.stringToTerraform(struct!.envName),
    group_id: cdktf.stringToTerraform(struct!.groupId),
    instance_id: cdktf.stringToTerraform(struct!.instanceId),
    request_protocol: cdktf.stringToTerraform(struct!.requestProtocol),
    security_authentication: cdktf.stringToTerraform(struct!.securityAuthentication),
    timeout: cdktf.numberToTerraform(struct!.timeout),
  }
}


export function fgsTriggerApigToHclTerraform(struct?: FgsTriggerApigOutputReference | FgsTriggerApig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    api_name: {
      value: cdktf.stringToHclTerraform(struct!.apiName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    env_name: {
      value: cdktf.stringToHclTerraform(struct!.envName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    group_id: {
      value: cdktf.stringToHclTerraform(struct!.groupId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    instance_id: {
      value: cdktf.stringToHclTerraform(struct!.instanceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    request_protocol: {
      value: cdktf.stringToHclTerraform(struct!.requestProtocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    security_authentication: {
      value: cdktf.stringToHclTerraform(struct!.securityAuthentication),
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

export class FgsTriggerApigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsTriggerApig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._apiName !== undefined) {
      hasAnyValues = true;
      internalValueResult.apiName = this._apiName;
    }
    if (this._envName !== undefined) {
      hasAnyValues = true;
      internalValueResult.envName = this._envName;
    }
    if (this._groupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.groupId = this._groupId;
    }
    if (this._instanceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceId = this._instanceId;
    }
    if (this._requestProtocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.requestProtocol = this._requestProtocol;
    }
    if (this._securityAuthentication !== undefined) {
      hasAnyValues = true;
      internalValueResult.securityAuthentication = this._securityAuthentication;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsTriggerApig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._apiName = undefined;
      this._envName = undefined;
      this._groupId = undefined;
      this._instanceId = undefined;
      this._requestProtocol = undefined;
      this._securityAuthentication = undefined;
      this._timeout = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._apiName = value.apiName;
      this._envName = value.envName;
      this._groupId = value.groupId;
      this._instanceId = value.instanceId;
      this._requestProtocol = value.requestProtocol;
      this._securityAuthentication = value.securityAuthentication;
      this._timeout = value.timeout;
    }
  }

  // api_name - computed: false, optional: false, required: true
  private _apiName?: string; 
  public get apiName() {
    return this.getStringAttribute('api_name');
  }
  public set apiName(value: string) {
    this._apiName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get apiNameInput() {
    return this._apiName;
  }

  // env_name - computed: false, optional: false, required: true
  private _envName?: string; 
  public get envName() {
    return this.getStringAttribute('env_name');
  }
  public set envName(value: string) {
    this._envName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get envNameInput() {
    return this._envName;
  }

  // group_id - computed: false, optional: false, required: true
  private _groupId?: string; 
  public get groupId() {
    return this.getStringAttribute('group_id');
  }
  public set groupId(value: string) {
    this._groupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupIdInput() {
    return this._groupId;
  }

  // instance_id - computed: false, optional: true, required: false
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  public resetInstanceId() {
    this._instanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // request_protocol - computed: false, optional: true, required: false
  private _requestProtocol?: string; 
  public get requestProtocol() {
    return this.getStringAttribute('request_protocol');
  }
  public set requestProtocol(value: string) {
    this._requestProtocol = value;
  }
  public resetRequestProtocol() {
    this._requestProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestProtocolInput() {
    return this._requestProtocol;
  }

  // security_authentication - computed: false, optional: true, required: false
  private _securityAuthentication?: string; 
  public get securityAuthentication() {
    return this.getStringAttribute('security_authentication');
  }
  public set securityAuthentication(value: string) {
    this._securityAuthentication = value;
  }
  public resetSecurityAuthentication() {
    this._securityAuthentication = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityAuthenticationInput() {
    return this._securityAuthentication;
  }

  // timeout - computed: false, optional: true, required: false
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
export interface FgsTriggerDis {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#max_fetch_bytes FgsTrigger#max_fetch_bytes}
  */
  readonly maxFetchBytes: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#pull_period FgsTrigger#pull_period}
  */
  readonly pullPeriod: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#serial_enable FgsTrigger#serial_enable}
  */
  readonly serialEnable: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#starting_position FgsTrigger#starting_position}
  */
  readonly startingPosition: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#stream_name FgsTrigger#stream_name}
  */
  readonly streamName: string;
}

export function fgsTriggerDisToTerraform(struct?: FgsTriggerDisOutputReference | FgsTriggerDis): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    max_fetch_bytes: cdktf.numberToTerraform(struct!.maxFetchBytes),
    pull_period: cdktf.numberToTerraform(struct!.pullPeriod),
    serial_enable: cdktf.booleanToTerraform(struct!.serialEnable),
    starting_position: cdktf.stringToTerraform(struct!.startingPosition),
    stream_name: cdktf.stringToTerraform(struct!.streamName),
  }
}


export function fgsTriggerDisToHclTerraform(struct?: FgsTriggerDisOutputReference | FgsTriggerDis): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    max_fetch_bytes: {
      value: cdktf.numberToHclTerraform(struct!.maxFetchBytes),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    pull_period: {
      value: cdktf.numberToHclTerraform(struct!.pullPeriod),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    serial_enable: {
      value: cdktf.booleanToHclTerraform(struct!.serialEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    starting_position: {
      value: cdktf.stringToHclTerraform(struct!.startingPosition),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    stream_name: {
      value: cdktf.stringToHclTerraform(struct!.streamName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsTriggerDisOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsTriggerDis | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._maxFetchBytes !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxFetchBytes = this._maxFetchBytes;
    }
    if (this._pullPeriod !== undefined) {
      hasAnyValues = true;
      internalValueResult.pullPeriod = this._pullPeriod;
    }
    if (this._serialEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.serialEnable = this._serialEnable;
    }
    if (this._startingPosition !== undefined) {
      hasAnyValues = true;
      internalValueResult.startingPosition = this._startingPosition;
    }
    if (this._streamName !== undefined) {
      hasAnyValues = true;
      internalValueResult.streamName = this._streamName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsTriggerDis | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._maxFetchBytes = undefined;
      this._pullPeriod = undefined;
      this._serialEnable = undefined;
      this._startingPosition = undefined;
      this._streamName = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._maxFetchBytes = value.maxFetchBytes;
      this._pullPeriod = value.pullPeriod;
      this._serialEnable = value.serialEnable;
      this._startingPosition = value.startingPosition;
      this._streamName = value.streamName;
    }
  }

  // max_fetch_bytes - computed: false, optional: false, required: true
  private _maxFetchBytes?: number; 
  public get maxFetchBytes() {
    return this.getNumberAttribute('max_fetch_bytes');
  }
  public set maxFetchBytes(value: number) {
    this._maxFetchBytes = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maxFetchBytesInput() {
    return this._maxFetchBytes;
  }

  // pull_period - computed: false, optional: false, required: true
  private _pullPeriod?: number; 
  public get pullPeriod() {
    return this.getNumberAttribute('pull_period');
  }
  public set pullPeriod(value: number) {
    this._pullPeriod = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pullPeriodInput() {
    return this._pullPeriod;
  }

  // serial_enable - computed: false, optional: false, required: true
  private _serialEnable?: boolean | cdktf.IResolvable; 
  public get serialEnable() {
    return this.getBooleanAttribute('serial_enable');
  }
  public set serialEnable(value: boolean | cdktf.IResolvable) {
    this._serialEnable = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serialEnableInput() {
    return this._serialEnable;
  }

  // starting_position - computed: false, optional: false, required: true
  private _startingPosition?: string; 
  public get startingPosition() {
    return this.getStringAttribute('starting_position');
  }
  public set startingPosition(value: string) {
    this._startingPosition = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startingPositionInput() {
    return this._startingPosition;
  }

  // stream_name - computed: false, optional: false, required: true
  private _streamName?: string; 
  public get streamName() {
    return this.getStringAttribute('stream_name');
  }
  public set streamName(value: string) {
    this._streamName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get streamNameInput() {
    return this._streamName;
  }
}
export interface FgsTriggerKafka {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#batch_size FgsTrigger#batch_size}
  */
  readonly batchSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#instance_id FgsTrigger#instance_id}
  */
  readonly instanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#password FgsTrigger#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#topic_ids FgsTrigger#topic_ids}
  */
  readonly topicIds: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#user_name FgsTrigger#user_name}
  */
  readonly userName?: string;
}

export function fgsTriggerKafkaToTerraform(struct?: FgsTriggerKafkaOutputReference | FgsTriggerKafka): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    batch_size: cdktf.numberToTerraform(struct!.batchSize),
    instance_id: cdktf.stringToTerraform(struct!.instanceId),
    password: cdktf.stringToTerraform(struct!.password),
    topic_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.topicIds),
    user_name: cdktf.stringToTerraform(struct!.userName),
  }
}


export function fgsTriggerKafkaToHclTerraform(struct?: FgsTriggerKafkaOutputReference | FgsTriggerKafka): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    batch_size: {
      value: cdktf.numberToHclTerraform(struct!.batchSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    instance_id: {
      value: cdktf.stringToHclTerraform(struct!.instanceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic_ids: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.topicIds),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    user_name: {
      value: cdktf.stringToHclTerraform(struct!.userName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsTriggerKafkaOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsTriggerKafka | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._batchSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.batchSize = this._batchSize;
    }
    if (this._instanceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceId = this._instanceId;
    }
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._topicIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicIds = this._topicIds;
    }
    if (this._userName !== undefined) {
      hasAnyValues = true;
      internalValueResult.userName = this._userName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsTriggerKafka | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._batchSize = undefined;
      this._instanceId = undefined;
      this._password = undefined;
      this._topicIds = undefined;
      this._userName = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._batchSize = value.batchSize;
      this._instanceId = value.instanceId;
      this._password = value.password;
      this._topicIds = value.topicIds;
      this._userName = value.userName;
    }
  }

  // batch_size - computed: false, optional: true, required: false
  private _batchSize?: number; 
  public get batchSize() {
    return this.getNumberAttribute('batch_size');
  }
  public set batchSize(value: number) {
    this._batchSize = value;
  }
  public resetBatchSize() {
    this._batchSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get batchSizeInput() {
    return this._batchSize;
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

  // topic_ids - computed: false, optional: false, required: true
  private _topicIds?: string[]; 
  public get topicIds() {
    return cdktf.Fn.tolist(this.getListAttribute('topic_ids'));
  }
  public set topicIds(value: string[]) {
    this._topicIds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicIdsInput() {
    return this._topicIds;
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
}
export interface FgsTriggerLts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#log_group_id FgsTrigger#log_group_id}
  */
  readonly logGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#log_topic_id FgsTrigger#log_topic_id}
  */
  readonly logTopicId: string;
}

export function fgsTriggerLtsToTerraform(struct?: FgsTriggerLtsOutputReference | FgsTriggerLts): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    log_group_id: cdktf.stringToTerraform(struct!.logGroupId),
    log_topic_id: cdktf.stringToTerraform(struct!.logTopicId),
  }
}


export function fgsTriggerLtsToHclTerraform(struct?: FgsTriggerLtsOutputReference | FgsTriggerLts): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    log_group_id: {
      value: cdktf.stringToHclTerraform(struct!.logGroupId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    log_topic_id: {
      value: cdktf.stringToHclTerraform(struct!.logTopicId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsTriggerLtsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsTriggerLts | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._logGroupId !== undefined) {
      hasAnyValues = true;
      internalValueResult.logGroupId = this._logGroupId;
    }
    if (this._logTopicId !== undefined) {
      hasAnyValues = true;
      internalValueResult.logTopicId = this._logTopicId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsTriggerLts | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._logGroupId = undefined;
      this._logTopicId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._logGroupId = value.logGroupId;
      this._logTopicId = value.logTopicId;
    }
  }

  // log_group_id - computed: false, optional: false, required: true
  private _logGroupId?: string; 
  public get logGroupId() {
    return this.getStringAttribute('log_group_id');
  }
  public set logGroupId(value: string) {
    this._logGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logGroupIdInput() {
    return this._logGroupId;
  }

  // log_topic_id - computed: false, optional: false, required: true
  private _logTopicId?: string; 
  public get logTopicId() {
    return this.getStringAttribute('log_topic_id');
  }
  public set logTopicId(value: string) {
    this._logTopicId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logTopicIdInput() {
    return this._logTopicId;
  }
}
export interface FgsTriggerObs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#bucket_name FgsTrigger#bucket_name}
  */
  readonly bucketName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#event_notification_name FgsTrigger#event_notification_name}
  */
  readonly eventNotificationName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#events FgsTrigger#events}
  */
  readonly events: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#prefix FgsTrigger#prefix}
  */
  readonly prefix?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#suffix FgsTrigger#suffix}
  */
  readonly suffix?: string;
}

export function fgsTriggerObsToTerraform(struct?: FgsTriggerObsOutputReference | FgsTriggerObs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bucket_name: cdktf.stringToTerraform(struct!.bucketName),
    event_notification_name: cdktf.stringToTerraform(struct!.eventNotificationName),
    events: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.events),
    prefix: cdktf.stringToTerraform(struct!.prefix),
    suffix: cdktf.stringToTerraform(struct!.suffix),
  }
}


export function fgsTriggerObsToHclTerraform(struct?: FgsTriggerObsOutputReference | FgsTriggerObs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bucket_name: {
      value: cdktf.stringToHclTerraform(struct!.bucketName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    event_notification_name: {
      value: cdktf.stringToHclTerraform(struct!.eventNotificationName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    events: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.events),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    prefix: {
      value: cdktf.stringToHclTerraform(struct!.prefix),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    suffix: {
      value: cdktf.stringToHclTerraform(struct!.suffix),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsTriggerObsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsTriggerObs | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bucketName !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucketName = this._bucketName;
    }
    if (this._eventNotificationName !== undefined) {
      hasAnyValues = true;
      internalValueResult.eventNotificationName = this._eventNotificationName;
    }
    if (this._events !== undefined) {
      hasAnyValues = true;
      internalValueResult.events = this._events;
    }
    if (this._prefix !== undefined) {
      hasAnyValues = true;
      internalValueResult.prefix = this._prefix;
    }
    if (this._suffix !== undefined) {
      hasAnyValues = true;
      internalValueResult.suffix = this._suffix;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsTriggerObs | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bucketName = undefined;
      this._eventNotificationName = undefined;
      this._events = undefined;
      this._prefix = undefined;
      this._suffix = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bucketName = value.bucketName;
      this._eventNotificationName = value.eventNotificationName;
      this._events = value.events;
      this._prefix = value.prefix;
      this._suffix = value.suffix;
    }
  }

  // bucket_name - computed: false, optional: false, required: true
  private _bucketName?: string; 
  public get bucketName() {
    return this.getStringAttribute('bucket_name');
  }
  public set bucketName(value: string) {
    this._bucketName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketNameInput() {
    return this._bucketName;
  }

  // event_notification_name - computed: false, optional: false, required: true
  private _eventNotificationName?: string; 
  public get eventNotificationName() {
    return this.getStringAttribute('event_notification_name');
  }
  public set eventNotificationName(value: string) {
    this._eventNotificationName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get eventNotificationNameInput() {
    return this._eventNotificationName;
  }

  // events - computed: false, optional: false, required: true
  private _events?: string[]; 
  public get events() {
    return cdktf.Fn.tolist(this.getListAttribute('events'));
  }
  public set events(value: string[]) {
    this._events = value;
  }
  // Temporarily expose input value. Use with caution.
  public get eventsInput() {
    return this._events;
  }

  // prefix - computed: false, optional: true, required: false
  private _prefix?: string; 
  public get prefix() {
    return this.getStringAttribute('prefix');
  }
  public set prefix(value: string) {
    this._prefix = value;
  }
  public resetPrefix() {
    this._prefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get prefixInput() {
    return this._prefix;
  }

  // suffix - computed: false, optional: true, required: false
  private _suffix?: string; 
  public get suffix() {
    return this.getStringAttribute('suffix');
  }
  public set suffix(value: string) {
    this._suffix = value;
  }
  public resetSuffix() {
    this._suffix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get suffixInput() {
    return this._suffix;
  }
}
export interface FgsTriggerSmn {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#topic_urn FgsTrigger#topic_urn}
  */
  readonly topicUrn: string;
}

export function fgsTriggerSmnToTerraform(struct?: FgsTriggerSmnOutputReference | FgsTriggerSmn): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    topic_urn: cdktf.stringToTerraform(struct!.topicUrn),
  }
}


export function fgsTriggerSmnToHclTerraform(struct?: FgsTriggerSmnOutputReference | FgsTriggerSmn): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    topic_urn: {
      value: cdktf.stringToHclTerraform(struct!.topicUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsTriggerSmnOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsTriggerSmn | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._topicUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicUrn = this._topicUrn;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsTriggerSmn | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._topicUrn = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._topicUrn = value.topicUrn;
    }
  }

  // topic_urn - computed: false, optional: false, required: true
  private _topicUrn?: string; 
  public get topicUrn() {
    return this.getStringAttribute('topic_urn');
  }
  public set topicUrn(value: string) {
    this._topicUrn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicUrnInput() {
    return this._topicUrn;
  }
}
export interface FgsTriggerTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#update FgsTrigger#update}
  */
  readonly update?: string;
}

export function fgsTriggerTimeoutsToTerraform(struct?: FgsTriggerTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function fgsTriggerTimeoutsToHclTerraform(struct?: FgsTriggerTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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

export class FgsTriggerTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): FgsTriggerTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsTriggerTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._update = value.update;
    }
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
export interface FgsTriggerTimer {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#additional_information FgsTrigger#additional_information}
  */
  readonly additionalInformation?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#name FgsTrigger#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#schedule FgsTrigger#schedule}
  */
  readonly schedule: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#schedule_type FgsTrigger#schedule_type}
  */
  readonly scheduleType: string;
}

export function fgsTriggerTimerToTerraform(struct?: FgsTriggerTimerOutputReference | FgsTriggerTimer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    additional_information: cdktf.stringToTerraform(struct!.additionalInformation),
    name: cdktf.stringToTerraform(struct!.name),
    schedule: cdktf.stringToTerraform(struct!.schedule),
    schedule_type: cdktf.stringToTerraform(struct!.scheduleType),
  }
}


export function fgsTriggerTimerToHclTerraform(struct?: FgsTriggerTimerOutputReference | FgsTriggerTimer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    additional_information: {
      value: cdktf.stringToHclTerraform(struct!.additionalInformation),
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
    schedule: {
      value: cdktf.stringToHclTerraform(struct!.schedule),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    schedule_type: {
      value: cdktf.stringToHclTerraform(struct!.scheduleType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsTriggerTimerOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsTriggerTimer | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._additionalInformation !== undefined) {
      hasAnyValues = true;
      internalValueResult.additionalInformation = this._additionalInformation;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._schedule !== undefined) {
      hasAnyValues = true;
      internalValueResult.schedule = this._schedule;
    }
    if (this._scheduleType !== undefined) {
      hasAnyValues = true;
      internalValueResult.scheduleType = this._scheduleType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsTriggerTimer | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._additionalInformation = undefined;
      this._name = undefined;
      this._schedule = undefined;
      this._scheduleType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._additionalInformation = value.additionalInformation;
      this._name = value.name;
      this._schedule = value.schedule;
      this._scheduleType = value.scheduleType;
    }
  }

  // additional_information - computed: false, optional: true, required: false
  private _additionalInformation?: string; 
  public get additionalInformation() {
    return this.getStringAttribute('additional_information');
  }
  public set additionalInformation(value: string) {
    this._additionalInformation = value;
  }
  public resetAdditionalInformation() {
    this._additionalInformation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get additionalInformationInput() {
    return this._additionalInformation;
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

  // schedule - computed: false, optional: false, required: true
  private _schedule?: string; 
  public get schedule() {
    return this.getStringAttribute('schedule');
  }
  public set schedule(value: string) {
    this._schedule = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scheduleInput() {
    return this._schedule;
  }

  // schedule_type - computed: false, optional: false, required: true
  private _scheduleType?: string; 
  public get scheduleType() {
    return this.getStringAttribute('schedule_type');
  }
  public set scheduleType(value: string) {
    this._scheduleType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scheduleTypeInput() {
    return this._scheduleType;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger huaweicloud_fgs_trigger}
*/
export class FgsTrigger extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_fgs_trigger";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a FgsTrigger resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the FgsTrigger to import
  * @param importFromId The id of the existing FgsTrigger that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the FgsTrigger to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_fgs_trigger", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_trigger huaweicloud_fgs_trigger} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options FgsTriggerConfig
  */
  public constructor(scope: Construct, id: string, config: FgsTriggerConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_fgs_trigger',
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
    this._functionUrn = config.functionUrn;
    this._id = config.id;
    this._region = config.region;
    this._status = config.status;
    this._type = config.type;
    this._apig.internalValue = config.apig;
    this._dis.internalValue = config.dis;
    this._kafka.internalValue = config.kafka;
    this._lts.internalValue = config.lts;
    this._obs.internalValue = config.obs;
    this._smn.internalValue = config.smn;
    this._timeouts.internalValue = config.timeouts;
    this._timer.internalValue = config.timer;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // function_urn - computed: false, optional: false, required: true
  private _functionUrn?: string; 
  public get functionUrn() {
    return this.getStringAttribute('function_urn');
  }
  public set functionUrn(value: string) {
    this._functionUrn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get functionUrnInput() {
    return this._functionUrn;
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

  // status - computed: true, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
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

  // apig - computed: false, optional: true, required: false
  private _apig = new FgsTriggerApigOutputReference(this, "apig");
  public get apig() {
    return this._apig;
  }
  public putApig(value: FgsTriggerApig) {
    this._apig.internalValue = value;
  }
  public resetApig() {
    this._apig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get apigInput() {
    return this._apig.internalValue;
  }

  // dis - computed: false, optional: true, required: false
  private _dis = new FgsTriggerDisOutputReference(this, "dis");
  public get dis() {
    return this._dis;
  }
  public putDis(value: FgsTriggerDis) {
    this._dis.internalValue = value;
  }
  public resetDis() {
    this._dis.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disInput() {
    return this._dis.internalValue;
  }

  // kafka - computed: false, optional: true, required: false
  private _kafka = new FgsTriggerKafkaOutputReference(this, "kafka");
  public get kafka() {
    return this._kafka;
  }
  public putKafka(value: FgsTriggerKafka) {
    this._kafka.internalValue = value;
  }
  public resetKafka() {
    this._kafka.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get kafkaInput() {
    return this._kafka.internalValue;
  }

  // lts - computed: false, optional: true, required: false
  private _lts = new FgsTriggerLtsOutputReference(this, "lts");
  public get lts() {
    return this._lts;
  }
  public putLts(value: FgsTriggerLts) {
    this._lts.internalValue = value;
  }
  public resetLts() {
    this._lts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsInput() {
    return this._lts.internalValue;
  }

  // obs - computed: false, optional: true, required: false
  private _obs = new FgsTriggerObsOutputReference(this, "obs");
  public get obs() {
    return this._obs;
  }
  public putObs(value: FgsTriggerObs) {
    this._obs.internalValue = value;
  }
  public resetObs() {
    this._obs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsInput() {
    return this._obs.internalValue;
  }

  // smn - computed: false, optional: true, required: false
  private _smn = new FgsTriggerSmnOutputReference(this, "smn");
  public get smn() {
    return this._smn;
  }
  public putSmn(value: FgsTriggerSmn) {
    this._smn.internalValue = value;
  }
  public resetSmn() {
    this._smn.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smnInput() {
    return this._smn.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new FgsTriggerTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: FgsTriggerTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // timer - computed: false, optional: true, required: false
  private _timer = new FgsTriggerTimerOutputReference(this, "timer");
  public get timer() {
    return this._timer;
  }
  public putTimer(value: FgsTriggerTimer) {
    this._timer.internalValue = value;
  }
  public resetTimer() {
    this._timer.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timerInput() {
    return this._timer.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      function_urn: cdktf.stringToTerraform(this._functionUrn),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      status: cdktf.stringToTerraform(this._status),
      type: cdktf.stringToTerraform(this._type),
      apig: fgsTriggerApigToTerraform(this._apig.internalValue),
      dis: fgsTriggerDisToTerraform(this._dis.internalValue),
      kafka: fgsTriggerKafkaToTerraform(this._kafka.internalValue),
      lts: fgsTriggerLtsToTerraform(this._lts.internalValue),
      obs: fgsTriggerObsToTerraform(this._obs.internalValue),
      smn: fgsTriggerSmnToTerraform(this._smn.internalValue),
      timeouts: fgsTriggerTimeoutsToTerraform(this._timeouts.internalValue),
      timer: fgsTriggerTimerToTerraform(this._timer.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      function_urn: {
        value: cdktf.stringToHclTerraform(this._functionUrn),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      apig: {
        value: fgsTriggerApigToHclTerraform(this._apig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsTriggerApigList",
      },
      dis: {
        value: fgsTriggerDisToHclTerraform(this._dis.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsTriggerDisList",
      },
      kafka: {
        value: fgsTriggerKafkaToHclTerraform(this._kafka.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsTriggerKafkaList",
      },
      lts: {
        value: fgsTriggerLtsToHclTerraform(this._lts.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsTriggerLtsList",
      },
      obs: {
        value: fgsTriggerObsToHclTerraform(this._obs.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsTriggerObsList",
      },
      smn: {
        value: fgsTriggerSmnToHclTerraform(this._smn.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsTriggerSmnList",
      },
      timeouts: {
        value: fgsTriggerTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "FgsTriggerTimeouts",
      },
      timer: {
        value: fgsTriggerTimerToHclTerraform(this._timer.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsTriggerTimerList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

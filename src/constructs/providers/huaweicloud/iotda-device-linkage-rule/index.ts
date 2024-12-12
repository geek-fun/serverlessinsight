// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IotdaDeviceLinkageRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#description IotdaDeviceLinkageRule#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#enabled IotdaDeviceLinkageRule#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#id IotdaDeviceLinkageRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#name IotdaDeviceLinkageRule#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#region IotdaDeviceLinkageRule#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#space_id IotdaDeviceLinkageRule#space_id}
  */
  readonly spaceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#trigger_logic IotdaDeviceLinkageRule#trigger_logic}
  */
  readonly triggerLogic?: string;
  /**
  * actions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#actions IotdaDeviceLinkageRule#actions}
  */
  readonly actions: IotdaDeviceLinkageRuleActions[] | cdktf.IResolvable;
  /**
  * effective_period block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#effective_period IotdaDeviceLinkageRule#effective_period}
  */
  readonly effectivePeriod?: IotdaDeviceLinkageRuleEffectivePeriod;
  /**
  * triggers block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#triggers IotdaDeviceLinkageRule#triggers}
  */
  readonly triggers: IotdaDeviceLinkageRuleTriggers[] | cdktf.IResolvable;
}
export interface IotdaDeviceLinkageRuleActionsDeviceAlarm {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#description IotdaDeviceLinkageRule#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#dimension IotdaDeviceLinkageRule#dimension}
  */
  readonly dimension?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#name IotdaDeviceLinkageRule#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#severity IotdaDeviceLinkageRule#severity}
  */
  readonly severity: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#type IotdaDeviceLinkageRule#type}
  */
  readonly type: string;
}

export function iotdaDeviceLinkageRuleActionsDeviceAlarmToTerraform(struct?: IotdaDeviceLinkageRuleActionsDeviceAlarmOutputReference | IotdaDeviceLinkageRuleActionsDeviceAlarm): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    dimension: cdktf.stringToTerraform(struct!.dimension),
    name: cdktf.stringToTerraform(struct!.name),
    severity: cdktf.stringToTerraform(struct!.severity),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function iotdaDeviceLinkageRuleActionsDeviceAlarmToHclTerraform(struct?: IotdaDeviceLinkageRuleActionsDeviceAlarmOutputReference | IotdaDeviceLinkageRuleActionsDeviceAlarm): any {
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
    dimension: {
      value: cdktf.stringToHclTerraform(struct!.dimension),
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
    severity: {
      value: cdktf.stringToHclTerraform(struct!.severity),
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

export class IotdaDeviceLinkageRuleActionsDeviceAlarmOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDeviceLinkageRuleActionsDeviceAlarm | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._dimension !== undefined) {
      hasAnyValues = true;
      internalValueResult.dimension = this._dimension;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._severity !== undefined) {
      hasAnyValues = true;
      internalValueResult.severity = this._severity;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceLinkageRuleActionsDeviceAlarm | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._description = undefined;
      this._dimension = undefined;
      this._name = undefined;
      this._severity = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._description = value.description;
      this._dimension = value.dimension;
      this._name = value.name;
      this._severity = value.severity;
      this._type = value.type;
    }
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

  // dimension - computed: false, optional: true, required: false
  private _dimension?: string; 
  public get dimension() {
    return this.getStringAttribute('dimension');
  }
  public set dimension(value: string) {
    this._dimension = value;
  }
  public resetDimension() {
    this._dimension = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dimensionInput() {
    return this._dimension;
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

  // severity - computed: false, optional: false, required: true
  private _severity?: string; 
  public get severity() {
    return this.getStringAttribute('severity');
  }
  public set severity(value: string) {
    this._severity = value;
  }
  // Temporarily expose input value. Use with caution.
  public get severityInput() {
    return this._severity;
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
}
export interface IotdaDeviceLinkageRuleActionsDeviceCommand {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#buffer_timeout IotdaDeviceLinkageRule#buffer_timeout}
  */
  readonly bufferTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#command_body IotdaDeviceLinkageRule#command_body}
  */
  readonly commandBody: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#command_name IotdaDeviceLinkageRule#command_name}
  */
  readonly commandName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#device_id IotdaDeviceLinkageRule#device_id}
  */
  readonly deviceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#mode IotdaDeviceLinkageRule#mode}
  */
  readonly mode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#response_timeout IotdaDeviceLinkageRule#response_timeout}
  */
  readonly responseTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#service_id IotdaDeviceLinkageRule#service_id}
  */
  readonly serviceId: string;
}

export function iotdaDeviceLinkageRuleActionsDeviceCommandToTerraform(struct?: IotdaDeviceLinkageRuleActionsDeviceCommandOutputReference | IotdaDeviceLinkageRuleActionsDeviceCommand): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    buffer_timeout: cdktf.numberToTerraform(struct!.bufferTimeout),
    command_body: cdktf.stringToTerraform(struct!.commandBody),
    command_name: cdktf.stringToTerraform(struct!.commandName),
    device_id: cdktf.stringToTerraform(struct!.deviceId),
    mode: cdktf.stringToTerraform(struct!.mode),
    response_timeout: cdktf.numberToTerraform(struct!.responseTimeout),
    service_id: cdktf.stringToTerraform(struct!.serviceId),
  }
}


export function iotdaDeviceLinkageRuleActionsDeviceCommandToHclTerraform(struct?: IotdaDeviceLinkageRuleActionsDeviceCommandOutputReference | IotdaDeviceLinkageRuleActionsDeviceCommand): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    buffer_timeout: {
      value: cdktf.numberToHclTerraform(struct!.bufferTimeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    command_body: {
      value: cdktf.stringToHclTerraform(struct!.commandBody),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    command_name: {
      value: cdktf.stringToHclTerraform(struct!.commandName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    device_id: {
      value: cdktf.stringToHclTerraform(struct!.deviceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mode: {
      value: cdktf.stringToHclTerraform(struct!.mode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    response_timeout: {
      value: cdktf.numberToHclTerraform(struct!.responseTimeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
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

export class IotdaDeviceLinkageRuleActionsDeviceCommandOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDeviceLinkageRuleActionsDeviceCommand | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bufferTimeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.bufferTimeout = this._bufferTimeout;
    }
    if (this._commandBody !== undefined) {
      hasAnyValues = true;
      internalValueResult.commandBody = this._commandBody;
    }
    if (this._commandName !== undefined) {
      hasAnyValues = true;
      internalValueResult.commandName = this._commandName;
    }
    if (this._deviceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.deviceId = this._deviceId;
    }
    if (this._mode !== undefined) {
      hasAnyValues = true;
      internalValueResult.mode = this._mode;
    }
    if (this._responseTimeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.responseTimeout = this._responseTimeout;
    }
    if (this._serviceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.serviceId = this._serviceId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceLinkageRuleActionsDeviceCommand | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bufferTimeout = undefined;
      this._commandBody = undefined;
      this._commandName = undefined;
      this._deviceId = undefined;
      this._mode = undefined;
      this._responseTimeout = undefined;
      this._serviceId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bufferTimeout = value.bufferTimeout;
      this._commandBody = value.commandBody;
      this._commandName = value.commandName;
      this._deviceId = value.deviceId;
      this._mode = value.mode;
      this._responseTimeout = value.responseTimeout;
      this._serviceId = value.serviceId;
    }
  }

  // buffer_timeout - computed: false, optional: true, required: false
  private _bufferTimeout?: number; 
  public get bufferTimeout() {
    return this.getNumberAttribute('buffer_timeout');
  }
  public set bufferTimeout(value: number) {
    this._bufferTimeout = value;
  }
  public resetBufferTimeout() {
    this._bufferTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bufferTimeoutInput() {
    return this._bufferTimeout;
  }

  // command_body - computed: false, optional: false, required: true
  private _commandBody?: string; 
  public get commandBody() {
    return this.getStringAttribute('command_body');
  }
  public set commandBody(value: string) {
    this._commandBody = value;
  }
  // Temporarily expose input value. Use with caution.
  public get commandBodyInput() {
    return this._commandBody;
  }

  // command_name - computed: false, optional: false, required: true
  private _commandName?: string; 
  public get commandName() {
    return this.getStringAttribute('command_name');
  }
  public set commandName(value: string) {
    this._commandName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get commandNameInput() {
    return this._commandName;
  }

  // device_id - computed: false, optional: false, required: true
  private _deviceId?: string; 
  public get deviceId() {
    return this.getStringAttribute('device_id');
  }
  public set deviceId(value: string) {
    this._deviceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get deviceIdInput() {
    return this._deviceId;
  }

  // mode - computed: false, optional: true, required: false
  private _mode?: string; 
  public get mode() {
    return this.getStringAttribute('mode');
  }
  public set mode(value: string) {
    this._mode = value;
  }
  public resetMode() {
    this._mode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get modeInput() {
    return this._mode;
  }

  // response_timeout - computed: false, optional: true, required: false
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
export interface IotdaDeviceLinkageRuleActionsSmnForwarding {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#message_content IotdaDeviceLinkageRule#message_content}
  */
  readonly messageContent?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#message_template_name IotdaDeviceLinkageRule#message_template_name}
  */
  readonly messageTemplateName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#message_title IotdaDeviceLinkageRule#message_title}
  */
  readonly messageTitle: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#project_id IotdaDeviceLinkageRule#project_id}
  */
  readonly projectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#region IotdaDeviceLinkageRule#region}
  */
  readonly region: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#topic_name IotdaDeviceLinkageRule#topic_name}
  */
  readonly topicName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#topic_urn IotdaDeviceLinkageRule#topic_urn}
  */
  readonly topicUrn: string;
}

export function iotdaDeviceLinkageRuleActionsSmnForwardingToTerraform(struct?: IotdaDeviceLinkageRuleActionsSmnForwardingOutputReference | IotdaDeviceLinkageRuleActionsSmnForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    message_content: cdktf.stringToTerraform(struct!.messageContent),
    message_template_name: cdktf.stringToTerraform(struct!.messageTemplateName),
    message_title: cdktf.stringToTerraform(struct!.messageTitle),
    project_id: cdktf.stringToTerraform(struct!.projectId),
    region: cdktf.stringToTerraform(struct!.region),
    topic_name: cdktf.stringToTerraform(struct!.topicName),
    topic_urn: cdktf.stringToTerraform(struct!.topicUrn),
  }
}


export function iotdaDeviceLinkageRuleActionsSmnForwardingToHclTerraform(struct?: IotdaDeviceLinkageRuleActionsSmnForwardingOutputReference | IotdaDeviceLinkageRuleActionsSmnForwarding): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    message_content: {
      value: cdktf.stringToHclTerraform(struct!.messageContent),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    message_template_name: {
      value: cdktf.stringToHclTerraform(struct!.messageTemplateName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    message_title: {
      value: cdktf.stringToHclTerraform(struct!.messageTitle),
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
    topic_name: {
      value: cdktf.stringToHclTerraform(struct!.topicName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
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

export class IotdaDeviceLinkageRuleActionsSmnForwardingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDeviceLinkageRuleActionsSmnForwarding | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._messageContent !== undefined) {
      hasAnyValues = true;
      internalValueResult.messageContent = this._messageContent;
    }
    if (this._messageTemplateName !== undefined) {
      hasAnyValues = true;
      internalValueResult.messageTemplateName = this._messageTemplateName;
    }
    if (this._messageTitle !== undefined) {
      hasAnyValues = true;
      internalValueResult.messageTitle = this._messageTitle;
    }
    if (this._projectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.projectId = this._projectId;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._topicName !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicName = this._topicName;
    }
    if (this._topicUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicUrn = this._topicUrn;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceLinkageRuleActionsSmnForwarding | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._messageContent = undefined;
      this._messageTemplateName = undefined;
      this._messageTitle = undefined;
      this._projectId = undefined;
      this._region = undefined;
      this._topicName = undefined;
      this._topicUrn = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._messageContent = value.messageContent;
      this._messageTemplateName = value.messageTemplateName;
      this._messageTitle = value.messageTitle;
      this._projectId = value.projectId;
      this._region = value.region;
      this._topicName = value.topicName;
      this._topicUrn = value.topicUrn;
    }
  }

  // message_content - computed: true, optional: true, required: false
  private _messageContent?: string; 
  public get messageContent() {
    return this.getStringAttribute('message_content');
  }
  public set messageContent(value: string) {
    this._messageContent = value;
  }
  public resetMessageContent() {
    this._messageContent = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get messageContentInput() {
    return this._messageContent;
  }

  // message_template_name - computed: true, optional: true, required: false
  private _messageTemplateName?: string; 
  public get messageTemplateName() {
    return this.getStringAttribute('message_template_name');
  }
  public set messageTemplateName(value: string) {
    this._messageTemplateName = value;
  }
  public resetMessageTemplateName() {
    this._messageTemplateName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get messageTemplateNameInput() {
    return this._messageTemplateName;
  }

  // message_title - computed: false, optional: false, required: true
  private _messageTitle?: string; 
  public get messageTitle() {
    return this.getStringAttribute('message_title');
  }
  public set messageTitle(value: string) {
    this._messageTitle = value;
  }
  // Temporarily expose input value. Use with caution.
  public get messageTitleInput() {
    return this._messageTitle;
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

  // topic_name - computed: false, optional: false, required: true
  private _topicName?: string; 
  public get topicName() {
    return this.getStringAttribute('topic_name');
  }
  public set topicName(value: string) {
    this._topicName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicNameInput() {
    return this._topicName;
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
export interface IotdaDeviceLinkageRuleActions {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#type IotdaDeviceLinkageRule#type}
  */
  readonly type: string;
  /**
  * device_alarm block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#device_alarm IotdaDeviceLinkageRule#device_alarm}
  */
  readonly deviceAlarm?: IotdaDeviceLinkageRuleActionsDeviceAlarm;
  /**
  * device_command block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#device_command IotdaDeviceLinkageRule#device_command}
  */
  readonly deviceCommand?: IotdaDeviceLinkageRuleActionsDeviceCommand;
  /**
  * smn_forwarding block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#smn_forwarding IotdaDeviceLinkageRule#smn_forwarding}
  */
  readonly smnForwarding?: IotdaDeviceLinkageRuleActionsSmnForwarding;
}

export function iotdaDeviceLinkageRuleActionsToTerraform(struct?: IotdaDeviceLinkageRuleActions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    device_alarm: iotdaDeviceLinkageRuleActionsDeviceAlarmToTerraform(struct!.deviceAlarm),
    device_command: iotdaDeviceLinkageRuleActionsDeviceCommandToTerraform(struct!.deviceCommand),
    smn_forwarding: iotdaDeviceLinkageRuleActionsSmnForwardingToTerraform(struct!.smnForwarding),
  }
}


export function iotdaDeviceLinkageRuleActionsToHclTerraform(struct?: IotdaDeviceLinkageRuleActions | cdktf.IResolvable): any {
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
    device_alarm: {
      value: iotdaDeviceLinkageRuleActionsDeviceAlarmToHclTerraform(struct!.deviceAlarm),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDeviceLinkageRuleActionsDeviceAlarmList",
    },
    device_command: {
      value: iotdaDeviceLinkageRuleActionsDeviceCommandToHclTerraform(struct!.deviceCommand),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDeviceLinkageRuleActionsDeviceCommandList",
    },
    smn_forwarding: {
      value: iotdaDeviceLinkageRuleActionsSmnForwardingToHclTerraform(struct!.smnForwarding),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDeviceLinkageRuleActionsSmnForwardingList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDeviceLinkageRuleActionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): IotdaDeviceLinkageRuleActions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._deviceAlarm?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.deviceAlarm = this._deviceAlarm?.internalValue;
    }
    if (this._deviceCommand?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.deviceCommand = this._deviceCommand?.internalValue;
    }
    if (this._smnForwarding?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.smnForwarding = this._smnForwarding?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceLinkageRuleActions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._type = undefined;
      this._deviceAlarm.internalValue = undefined;
      this._deviceCommand.internalValue = undefined;
      this._smnForwarding.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._type = value.type;
      this._deviceAlarm.internalValue = value.deviceAlarm;
      this._deviceCommand.internalValue = value.deviceCommand;
      this._smnForwarding.internalValue = value.smnForwarding;
    }
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

  // device_alarm - computed: false, optional: true, required: false
  private _deviceAlarm = new IotdaDeviceLinkageRuleActionsDeviceAlarmOutputReference(this, "device_alarm");
  public get deviceAlarm() {
    return this._deviceAlarm;
  }
  public putDeviceAlarm(value: IotdaDeviceLinkageRuleActionsDeviceAlarm) {
    this._deviceAlarm.internalValue = value;
  }
  public resetDeviceAlarm() {
    this._deviceAlarm.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deviceAlarmInput() {
    return this._deviceAlarm.internalValue;
  }

  // device_command - computed: false, optional: true, required: false
  private _deviceCommand = new IotdaDeviceLinkageRuleActionsDeviceCommandOutputReference(this, "device_command");
  public get deviceCommand() {
    return this._deviceCommand;
  }
  public putDeviceCommand(value: IotdaDeviceLinkageRuleActionsDeviceCommand) {
    this._deviceCommand.internalValue = value;
  }
  public resetDeviceCommand() {
    this._deviceCommand.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deviceCommandInput() {
    return this._deviceCommand.internalValue;
  }

  // smn_forwarding - computed: false, optional: true, required: false
  private _smnForwarding = new IotdaDeviceLinkageRuleActionsSmnForwardingOutputReference(this, "smn_forwarding");
  public get smnForwarding() {
    return this._smnForwarding;
  }
  public putSmnForwarding(value: IotdaDeviceLinkageRuleActionsSmnForwarding) {
    this._smnForwarding.internalValue = value;
  }
  public resetSmnForwarding() {
    this._smnForwarding.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smnForwardingInput() {
    return this._smnForwarding.internalValue;
  }
}

export class IotdaDeviceLinkageRuleActionsList extends cdktf.ComplexList {
  public internalValue? : IotdaDeviceLinkageRuleActions[] | cdktf.IResolvable

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
  public get(index: number): IotdaDeviceLinkageRuleActionsOutputReference {
    return new IotdaDeviceLinkageRuleActionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface IotdaDeviceLinkageRuleEffectivePeriod {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#days_of_week IotdaDeviceLinkageRule#days_of_week}
  */
  readonly daysOfWeek?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#end_time IotdaDeviceLinkageRule#end_time}
  */
  readonly endTime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#start_time IotdaDeviceLinkageRule#start_time}
  */
  readonly startTime: string;
}

export function iotdaDeviceLinkageRuleEffectivePeriodToTerraform(struct?: IotdaDeviceLinkageRuleEffectivePeriodOutputReference | IotdaDeviceLinkageRuleEffectivePeriod): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    days_of_week: cdktf.stringToTerraform(struct!.daysOfWeek),
    end_time: cdktf.stringToTerraform(struct!.endTime),
    start_time: cdktf.stringToTerraform(struct!.startTime),
  }
}


export function iotdaDeviceLinkageRuleEffectivePeriodToHclTerraform(struct?: IotdaDeviceLinkageRuleEffectivePeriodOutputReference | IotdaDeviceLinkageRuleEffectivePeriod): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    days_of_week: {
      value: cdktf.stringToHclTerraform(struct!.daysOfWeek),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    end_time: {
      value: cdktf.stringToHclTerraform(struct!.endTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    start_time: {
      value: cdktf.stringToHclTerraform(struct!.startTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDeviceLinkageRuleEffectivePeriodOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDeviceLinkageRuleEffectivePeriod | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._daysOfWeek !== undefined) {
      hasAnyValues = true;
      internalValueResult.daysOfWeek = this._daysOfWeek;
    }
    if (this._endTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.endTime = this._endTime;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceLinkageRuleEffectivePeriod | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._daysOfWeek = undefined;
      this._endTime = undefined;
      this._startTime = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._daysOfWeek = value.daysOfWeek;
      this._endTime = value.endTime;
      this._startTime = value.startTime;
    }
  }

  // days_of_week - computed: true, optional: true, required: false
  private _daysOfWeek?: string; 
  public get daysOfWeek() {
    return this.getStringAttribute('days_of_week');
  }
  public set daysOfWeek(value: string) {
    this._daysOfWeek = value;
  }
  public resetDaysOfWeek() {
    this._daysOfWeek = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get daysOfWeekInput() {
    return this._daysOfWeek;
  }

  // end_time - computed: false, optional: false, required: true
  private _endTime?: string; 
  public get endTime() {
    return this.getStringAttribute('end_time');
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get endTimeInput() {
    return this._endTime;
  }

  // start_time - computed: false, optional: false, required: true
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }
}
export interface IotdaDeviceLinkageRuleTriggersDailyTimerCondition {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#days_of_week IotdaDeviceLinkageRule#days_of_week}
  */
  readonly daysOfWeek?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#start_time IotdaDeviceLinkageRule#start_time}
  */
  readonly startTime: string;
}

export function iotdaDeviceLinkageRuleTriggersDailyTimerConditionToTerraform(struct?: IotdaDeviceLinkageRuleTriggersDailyTimerConditionOutputReference | IotdaDeviceLinkageRuleTriggersDailyTimerCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    days_of_week: cdktf.stringToTerraform(struct!.daysOfWeek),
    start_time: cdktf.stringToTerraform(struct!.startTime),
  }
}


export function iotdaDeviceLinkageRuleTriggersDailyTimerConditionToHclTerraform(struct?: IotdaDeviceLinkageRuleTriggersDailyTimerConditionOutputReference | IotdaDeviceLinkageRuleTriggersDailyTimerCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    days_of_week: {
      value: cdktf.stringToHclTerraform(struct!.daysOfWeek),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    start_time: {
      value: cdktf.stringToHclTerraform(struct!.startTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDeviceLinkageRuleTriggersDailyTimerConditionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDeviceLinkageRuleTriggersDailyTimerCondition | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._daysOfWeek !== undefined) {
      hasAnyValues = true;
      internalValueResult.daysOfWeek = this._daysOfWeek;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceLinkageRuleTriggersDailyTimerCondition | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._daysOfWeek = undefined;
      this._startTime = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._daysOfWeek = value.daysOfWeek;
      this._startTime = value.startTime;
    }
  }

  // days_of_week - computed: true, optional: true, required: false
  private _daysOfWeek?: string; 
  public get daysOfWeek() {
    return this.getStringAttribute('days_of_week');
  }
  public set daysOfWeek(value: string) {
    this._daysOfWeek = value;
  }
  public resetDaysOfWeek() {
    this._daysOfWeek = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get daysOfWeekInput() {
    return this._daysOfWeek;
  }

  // start_time - computed: false, optional: false, required: true
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }
}
export interface IotdaDeviceLinkageRuleTriggersDeviceDataCondition {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#data_validatiy_period IotdaDeviceLinkageRule#data_validatiy_period}
  */
  readonly dataValidatiyPeriod?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#device_id IotdaDeviceLinkageRule#device_id}
  */
  readonly deviceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#in_values IotdaDeviceLinkageRule#in_values}
  */
  readonly inValues?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#operator IotdaDeviceLinkageRule#operator}
  */
  readonly operator: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#path IotdaDeviceLinkageRule#path}
  */
  readonly path: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#product_id IotdaDeviceLinkageRule#product_id}
  */
  readonly productId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#trigger_strategy IotdaDeviceLinkageRule#trigger_strategy}
  */
  readonly triggerStrategy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#value IotdaDeviceLinkageRule#value}
  */
  readonly value?: string;
}

export function iotdaDeviceLinkageRuleTriggersDeviceDataConditionToTerraform(struct?: IotdaDeviceLinkageRuleTriggersDeviceDataConditionOutputReference | IotdaDeviceLinkageRuleTriggersDeviceDataCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    data_validatiy_period: cdktf.numberToTerraform(struct!.dataValidatiyPeriod),
    device_id: cdktf.stringToTerraform(struct!.deviceId),
    in_values: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.inValues),
    operator: cdktf.stringToTerraform(struct!.operator),
    path: cdktf.stringToTerraform(struct!.path),
    product_id: cdktf.stringToTerraform(struct!.productId),
    trigger_strategy: cdktf.stringToTerraform(struct!.triggerStrategy),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function iotdaDeviceLinkageRuleTriggersDeviceDataConditionToHclTerraform(struct?: IotdaDeviceLinkageRuleTriggersDeviceDataConditionOutputReference | IotdaDeviceLinkageRuleTriggersDeviceDataCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    data_validatiy_period: {
      value: cdktf.numberToHclTerraform(struct!.dataValidatiyPeriod),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    device_id: {
      value: cdktf.stringToHclTerraform(struct!.deviceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    in_values: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.inValues),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    operator: {
      value: cdktf.stringToHclTerraform(struct!.operator),
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
    product_id: {
      value: cdktf.stringToHclTerraform(struct!.productId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    trigger_strategy: {
      value: cdktf.stringToHclTerraform(struct!.triggerStrategy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDeviceLinkageRuleTriggersDeviceDataConditionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDeviceLinkageRuleTriggersDeviceDataCondition | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dataValidatiyPeriod !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataValidatiyPeriod = this._dataValidatiyPeriod;
    }
    if (this._deviceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.deviceId = this._deviceId;
    }
    if (this._inValues !== undefined) {
      hasAnyValues = true;
      internalValueResult.inValues = this._inValues;
    }
    if (this._operator !== undefined) {
      hasAnyValues = true;
      internalValueResult.operator = this._operator;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._productId !== undefined) {
      hasAnyValues = true;
      internalValueResult.productId = this._productId;
    }
    if (this._triggerStrategy !== undefined) {
      hasAnyValues = true;
      internalValueResult.triggerStrategy = this._triggerStrategy;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceLinkageRuleTriggersDeviceDataCondition | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._dataValidatiyPeriod = undefined;
      this._deviceId = undefined;
      this._inValues = undefined;
      this._operator = undefined;
      this._path = undefined;
      this._productId = undefined;
      this._triggerStrategy = undefined;
      this._value = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._dataValidatiyPeriod = value.dataValidatiyPeriod;
      this._deviceId = value.deviceId;
      this._inValues = value.inValues;
      this._operator = value.operator;
      this._path = value.path;
      this._productId = value.productId;
      this._triggerStrategy = value.triggerStrategy;
      this._value = value.value;
    }
  }

  // data_validatiy_period - computed: false, optional: true, required: false
  private _dataValidatiyPeriod?: number; 
  public get dataValidatiyPeriod() {
    return this.getNumberAttribute('data_validatiy_period');
  }
  public set dataValidatiyPeriod(value: number) {
    this._dataValidatiyPeriod = value;
  }
  public resetDataValidatiyPeriod() {
    this._dataValidatiyPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataValidatiyPeriodInput() {
    return this._dataValidatiyPeriod;
  }

  // device_id - computed: false, optional: true, required: false
  private _deviceId?: string; 
  public get deviceId() {
    return this.getStringAttribute('device_id');
  }
  public set deviceId(value: string) {
    this._deviceId = value;
  }
  public resetDeviceId() {
    this._deviceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deviceIdInput() {
    return this._deviceId;
  }

  // in_values - computed: false, optional: true, required: false
  private _inValues?: string[]; 
  public get inValues() {
    return this.getListAttribute('in_values');
  }
  public set inValues(value: string[]) {
    this._inValues = value;
  }
  public resetInValues() {
    this._inValues = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inValuesInput() {
    return this._inValues;
  }

  // operator - computed: false, optional: false, required: true
  private _operator?: string; 
  public get operator() {
    return this.getStringAttribute('operator');
  }
  public set operator(value: string) {
    this._operator = value;
  }
  // Temporarily expose input value. Use with caution.
  public get operatorInput() {
    return this._operator;
  }

  // path - computed: false, optional: false, required: true
  private _path?: string; 
  public get path() {
    return this.getStringAttribute('path');
  }
  public set path(value: string) {
    this._path = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pathInput() {
    return this._path;
  }

  // product_id - computed: false, optional: true, required: false
  private _productId?: string; 
  public get productId() {
    return this.getStringAttribute('product_id');
  }
  public set productId(value: string) {
    this._productId = value;
  }
  public resetProductId() {
    this._productId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get productIdInput() {
    return this._productId;
  }

  // trigger_strategy - computed: true, optional: true, required: false
  private _triggerStrategy?: string; 
  public get triggerStrategy() {
    return this.getStringAttribute('trigger_strategy');
  }
  public set triggerStrategy(value: string) {
    this._triggerStrategy = value;
  }
  public resetTriggerStrategy() {
    this._triggerStrategy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerStrategyInput() {
    return this._triggerStrategy;
  }

  // value - computed: false, optional: true, required: false
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  public resetValue() {
    this._value = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}
export interface IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusCondition {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#device_id IotdaDeviceLinkageRule#device_id}
  */
  readonly deviceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#duration IotdaDeviceLinkageRule#duration}
  */
  readonly duration?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#product_id IotdaDeviceLinkageRule#product_id}
  */
  readonly productId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#status_list IotdaDeviceLinkageRule#status_list}
  */
  readonly statusList?: string[];
}

export function iotdaDeviceLinkageRuleTriggersDeviceLinkageStatusConditionToTerraform(struct?: IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusConditionOutputReference | IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    device_id: cdktf.stringToTerraform(struct!.deviceId),
    duration: cdktf.numberToTerraform(struct!.duration),
    product_id: cdktf.stringToTerraform(struct!.productId),
    status_list: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.statusList),
  }
}


export function iotdaDeviceLinkageRuleTriggersDeviceLinkageStatusConditionToHclTerraform(struct?: IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusConditionOutputReference | IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    device_id: {
      value: cdktf.stringToHclTerraform(struct!.deviceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    duration: {
      value: cdktf.numberToHclTerraform(struct!.duration),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    product_id: {
      value: cdktf.stringToHclTerraform(struct!.productId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    status_list: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.statusList),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusConditionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusCondition | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._deviceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.deviceId = this._deviceId;
    }
    if (this._duration !== undefined) {
      hasAnyValues = true;
      internalValueResult.duration = this._duration;
    }
    if (this._productId !== undefined) {
      hasAnyValues = true;
      internalValueResult.productId = this._productId;
    }
    if (this._statusList !== undefined) {
      hasAnyValues = true;
      internalValueResult.statusList = this._statusList;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusCondition | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._deviceId = undefined;
      this._duration = undefined;
      this._productId = undefined;
      this._statusList = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._deviceId = value.deviceId;
      this._duration = value.duration;
      this._productId = value.productId;
      this._statusList = value.statusList;
    }
  }

  // device_id - computed: true, optional: true, required: false
  private _deviceId?: string; 
  public get deviceId() {
    return this.getStringAttribute('device_id');
  }
  public set deviceId(value: string) {
    this._deviceId = value;
  }
  public resetDeviceId() {
    this._deviceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deviceIdInput() {
    return this._deviceId;
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

  // product_id - computed: false, optional: true, required: false
  private _productId?: string; 
  public get productId() {
    return this.getStringAttribute('product_id');
  }
  public set productId(value: string) {
    this._productId = value;
  }
  public resetProductId() {
    this._productId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get productIdInput() {
    return this._productId;
  }

  // status_list - computed: true, optional: true, required: false
  private _statusList?: string[]; 
  public get statusList() {
    return this.getListAttribute('status_list');
  }
  public set statusList(value: string[]) {
    this._statusList = value;
  }
  public resetStatusList() {
    this._statusList = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusListInput() {
    return this._statusList;
  }
}
export interface IotdaDeviceLinkageRuleTriggersSimpleTimerCondition {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#repeat_count IotdaDeviceLinkageRule#repeat_count}
  */
  readonly repeatCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#repeat_interval IotdaDeviceLinkageRule#repeat_interval}
  */
  readonly repeatInterval: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#start_time IotdaDeviceLinkageRule#start_time}
  */
  readonly startTime: string;
}

export function iotdaDeviceLinkageRuleTriggersSimpleTimerConditionToTerraform(struct?: IotdaDeviceLinkageRuleTriggersSimpleTimerConditionOutputReference | IotdaDeviceLinkageRuleTriggersSimpleTimerCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    repeat_count: cdktf.numberToTerraform(struct!.repeatCount),
    repeat_interval: cdktf.numberToTerraform(struct!.repeatInterval),
    start_time: cdktf.stringToTerraform(struct!.startTime),
  }
}


export function iotdaDeviceLinkageRuleTriggersSimpleTimerConditionToHclTerraform(struct?: IotdaDeviceLinkageRuleTriggersSimpleTimerConditionOutputReference | IotdaDeviceLinkageRuleTriggersSimpleTimerCondition): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    repeat_count: {
      value: cdktf.numberToHclTerraform(struct!.repeatCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    repeat_interval: {
      value: cdktf.numberToHclTerraform(struct!.repeatInterval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    start_time: {
      value: cdktf.stringToHclTerraform(struct!.startTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDeviceLinkageRuleTriggersSimpleTimerConditionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDeviceLinkageRuleTriggersSimpleTimerCondition | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._repeatCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.repeatCount = this._repeatCount;
    }
    if (this._repeatInterval !== undefined) {
      hasAnyValues = true;
      internalValueResult.repeatInterval = this._repeatInterval;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceLinkageRuleTriggersSimpleTimerCondition | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._repeatCount = undefined;
      this._repeatInterval = undefined;
      this._startTime = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._repeatCount = value.repeatCount;
      this._repeatInterval = value.repeatInterval;
      this._startTime = value.startTime;
    }
  }

  // repeat_count - computed: false, optional: false, required: true
  private _repeatCount?: number; 
  public get repeatCount() {
    return this.getNumberAttribute('repeat_count');
  }
  public set repeatCount(value: number) {
    this._repeatCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get repeatCountInput() {
    return this._repeatCount;
  }

  // repeat_interval - computed: false, optional: false, required: true
  private _repeatInterval?: number; 
  public get repeatInterval() {
    return this.getNumberAttribute('repeat_interval');
  }
  public set repeatInterval(value: number) {
    this._repeatInterval = value;
  }
  // Temporarily expose input value. Use with caution.
  public get repeatIntervalInput() {
    return this._repeatInterval;
  }

  // start_time - computed: false, optional: false, required: true
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }
}
export interface IotdaDeviceLinkageRuleTriggers {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#type IotdaDeviceLinkageRule#type}
  */
  readonly type: string;
  /**
  * daily_timer_condition block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#daily_timer_condition IotdaDeviceLinkageRule#daily_timer_condition}
  */
  readonly dailyTimerCondition?: IotdaDeviceLinkageRuleTriggersDailyTimerCondition;
  /**
  * device_data_condition block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#device_data_condition IotdaDeviceLinkageRule#device_data_condition}
  */
  readonly deviceDataCondition?: IotdaDeviceLinkageRuleTriggersDeviceDataCondition;
  /**
  * device_linkage_status_condition block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#device_linkage_status_condition IotdaDeviceLinkageRule#device_linkage_status_condition}
  */
  readonly deviceLinkageStatusCondition?: IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusCondition;
  /**
  * simple_timer_condition block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#simple_timer_condition IotdaDeviceLinkageRule#simple_timer_condition}
  */
  readonly simpleTimerCondition?: IotdaDeviceLinkageRuleTriggersSimpleTimerCondition;
}

export function iotdaDeviceLinkageRuleTriggersToTerraform(struct?: IotdaDeviceLinkageRuleTriggers | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    daily_timer_condition: iotdaDeviceLinkageRuleTriggersDailyTimerConditionToTerraform(struct!.dailyTimerCondition),
    device_data_condition: iotdaDeviceLinkageRuleTriggersDeviceDataConditionToTerraform(struct!.deviceDataCondition),
    device_linkage_status_condition: iotdaDeviceLinkageRuleTriggersDeviceLinkageStatusConditionToTerraform(struct!.deviceLinkageStatusCondition),
    simple_timer_condition: iotdaDeviceLinkageRuleTriggersSimpleTimerConditionToTerraform(struct!.simpleTimerCondition),
  }
}


export function iotdaDeviceLinkageRuleTriggersToHclTerraform(struct?: IotdaDeviceLinkageRuleTriggers | cdktf.IResolvable): any {
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
    daily_timer_condition: {
      value: iotdaDeviceLinkageRuleTriggersDailyTimerConditionToHclTerraform(struct!.dailyTimerCondition),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDeviceLinkageRuleTriggersDailyTimerConditionList",
    },
    device_data_condition: {
      value: iotdaDeviceLinkageRuleTriggersDeviceDataConditionToHclTerraform(struct!.deviceDataCondition),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDeviceLinkageRuleTriggersDeviceDataConditionList",
    },
    device_linkage_status_condition: {
      value: iotdaDeviceLinkageRuleTriggersDeviceLinkageStatusConditionToHclTerraform(struct!.deviceLinkageStatusCondition),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusConditionList",
    },
    simple_timer_condition: {
      value: iotdaDeviceLinkageRuleTriggersSimpleTimerConditionToHclTerraform(struct!.simpleTimerCondition),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDeviceLinkageRuleTriggersSimpleTimerConditionList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDeviceLinkageRuleTriggersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): IotdaDeviceLinkageRuleTriggers | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._dailyTimerCondition?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.dailyTimerCondition = this._dailyTimerCondition?.internalValue;
    }
    if (this._deviceDataCondition?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.deviceDataCondition = this._deviceDataCondition?.internalValue;
    }
    if (this._deviceLinkageStatusCondition?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.deviceLinkageStatusCondition = this._deviceLinkageStatusCondition?.internalValue;
    }
    if (this._simpleTimerCondition?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.simpleTimerCondition = this._simpleTimerCondition?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceLinkageRuleTriggers | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._type = undefined;
      this._dailyTimerCondition.internalValue = undefined;
      this._deviceDataCondition.internalValue = undefined;
      this._deviceLinkageStatusCondition.internalValue = undefined;
      this._simpleTimerCondition.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._type = value.type;
      this._dailyTimerCondition.internalValue = value.dailyTimerCondition;
      this._deviceDataCondition.internalValue = value.deviceDataCondition;
      this._deviceLinkageStatusCondition.internalValue = value.deviceLinkageStatusCondition;
      this._simpleTimerCondition.internalValue = value.simpleTimerCondition;
    }
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

  // daily_timer_condition - computed: false, optional: true, required: false
  private _dailyTimerCondition = new IotdaDeviceLinkageRuleTriggersDailyTimerConditionOutputReference(this, "daily_timer_condition");
  public get dailyTimerCondition() {
    return this._dailyTimerCondition;
  }
  public putDailyTimerCondition(value: IotdaDeviceLinkageRuleTriggersDailyTimerCondition) {
    this._dailyTimerCondition.internalValue = value;
  }
  public resetDailyTimerCondition() {
    this._dailyTimerCondition.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dailyTimerConditionInput() {
    return this._dailyTimerCondition.internalValue;
  }

  // device_data_condition - computed: false, optional: true, required: false
  private _deviceDataCondition = new IotdaDeviceLinkageRuleTriggersDeviceDataConditionOutputReference(this, "device_data_condition");
  public get deviceDataCondition() {
    return this._deviceDataCondition;
  }
  public putDeviceDataCondition(value: IotdaDeviceLinkageRuleTriggersDeviceDataCondition) {
    this._deviceDataCondition.internalValue = value;
  }
  public resetDeviceDataCondition() {
    this._deviceDataCondition.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deviceDataConditionInput() {
    return this._deviceDataCondition.internalValue;
  }

  // device_linkage_status_condition - computed: false, optional: true, required: false
  private _deviceLinkageStatusCondition = new IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusConditionOutputReference(this, "device_linkage_status_condition");
  public get deviceLinkageStatusCondition() {
    return this._deviceLinkageStatusCondition;
  }
  public putDeviceLinkageStatusCondition(value: IotdaDeviceLinkageRuleTriggersDeviceLinkageStatusCondition) {
    this._deviceLinkageStatusCondition.internalValue = value;
  }
  public resetDeviceLinkageStatusCondition() {
    this._deviceLinkageStatusCondition.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deviceLinkageStatusConditionInput() {
    return this._deviceLinkageStatusCondition.internalValue;
  }

  // simple_timer_condition - computed: false, optional: true, required: false
  private _simpleTimerCondition = new IotdaDeviceLinkageRuleTriggersSimpleTimerConditionOutputReference(this, "simple_timer_condition");
  public get simpleTimerCondition() {
    return this._simpleTimerCondition;
  }
  public putSimpleTimerCondition(value: IotdaDeviceLinkageRuleTriggersSimpleTimerCondition) {
    this._simpleTimerCondition.internalValue = value;
  }
  public resetSimpleTimerCondition() {
    this._simpleTimerCondition.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get simpleTimerConditionInput() {
    return this._simpleTimerCondition.internalValue;
  }
}

export class IotdaDeviceLinkageRuleTriggersList extends cdktf.ComplexList {
  public internalValue? : IotdaDeviceLinkageRuleTriggers[] | cdktf.IResolvable

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
  public get(index: number): IotdaDeviceLinkageRuleTriggersOutputReference {
    return new IotdaDeviceLinkageRuleTriggersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule huaweicloud_iotda_device_linkage_rule}
*/
export class IotdaDeviceLinkageRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_iotda_device_linkage_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IotdaDeviceLinkageRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IotdaDeviceLinkageRule to import
  * @param importFromId The id of the existing IotdaDeviceLinkageRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IotdaDeviceLinkageRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_iotda_device_linkage_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_linkage_rule huaweicloud_iotda_device_linkage_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IotdaDeviceLinkageRuleConfig
  */
  public constructor(scope: Construct, id: string, config: IotdaDeviceLinkageRuleConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_iotda_device_linkage_rule',
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
    this._spaceId = config.spaceId;
    this._triggerLogic = config.triggerLogic;
    this._actions.internalValue = config.actions;
    this._effectivePeriod.internalValue = config.effectivePeriod;
    this._triggers.internalValue = config.triggers;
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

  // space_id - computed: false, optional: false, required: true
  private _spaceId?: string; 
  public get spaceId() {
    return this.getStringAttribute('space_id');
  }
  public set spaceId(value: string) {
    this._spaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get spaceIdInput() {
    return this._spaceId;
  }

  // trigger_logic - computed: false, optional: true, required: false
  private _triggerLogic?: string; 
  public get triggerLogic() {
    return this.getStringAttribute('trigger_logic');
  }
  public set triggerLogic(value: string) {
    this._triggerLogic = value;
  }
  public resetTriggerLogic() {
    this._triggerLogic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerLogicInput() {
    return this._triggerLogic;
  }

  // actions - computed: false, optional: false, required: true
  private _actions = new IotdaDeviceLinkageRuleActionsList(this, "actions", true);
  public get actions() {
    return this._actions;
  }
  public putActions(value: IotdaDeviceLinkageRuleActions[] | cdktf.IResolvable) {
    this._actions.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionsInput() {
    return this._actions.internalValue;
  }

  // effective_period - computed: false, optional: true, required: false
  private _effectivePeriod = new IotdaDeviceLinkageRuleEffectivePeriodOutputReference(this, "effective_period");
  public get effectivePeriod() {
    return this._effectivePeriod;
  }
  public putEffectivePeriod(value: IotdaDeviceLinkageRuleEffectivePeriod) {
    this._effectivePeriod.internalValue = value;
  }
  public resetEffectivePeriod() {
    this._effectivePeriod.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get effectivePeriodInput() {
    return this._effectivePeriod.internalValue;
  }

  // triggers - computed: false, optional: false, required: true
  private _triggers = new IotdaDeviceLinkageRuleTriggersList(this, "triggers", true);
  public get triggers() {
    return this._triggers;
  }
  public putTriggers(value: IotdaDeviceLinkageRuleTriggers[] | cdktf.IResolvable) {
    this._triggers.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get triggersInput() {
    return this._triggers.internalValue;
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
      space_id: cdktf.stringToTerraform(this._spaceId),
      trigger_logic: cdktf.stringToTerraform(this._triggerLogic),
      actions: cdktf.listMapper(iotdaDeviceLinkageRuleActionsToTerraform, true)(this._actions.internalValue),
      effective_period: iotdaDeviceLinkageRuleEffectivePeriodToTerraform(this._effectivePeriod.internalValue),
      triggers: cdktf.listMapper(iotdaDeviceLinkageRuleTriggersToTerraform, true)(this._triggers.internalValue),
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
      space_id: {
        value: cdktf.stringToHclTerraform(this._spaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      trigger_logic: {
        value: cdktf.stringToHclTerraform(this._triggerLogic),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      actions: {
        value: cdktf.listMapperHcl(iotdaDeviceLinkageRuleActionsToHclTerraform, true)(this._actions.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "IotdaDeviceLinkageRuleActionsList",
      },
      effective_period: {
        value: iotdaDeviceLinkageRuleEffectivePeriodToHclTerraform(this._effectivePeriod.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "IotdaDeviceLinkageRuleEffectivePeriodList",
      },
      triggers: {
        value: cdktf.listMapperHcl(iotdaDeviceLinkageRuleTriggersToHclTerraform, true)(this._triggers.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "IotdaDeviceLinkageRuleTriggersList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

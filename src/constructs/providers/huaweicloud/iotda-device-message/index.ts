// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IotdaDeviceMessageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#device_id IotdaDeviceMessage#device_id}
  */
  readonly deviceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#encoding IotdaDeviceMessage#encoding}
  */
  readonly encoding?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#id IotdaDeviceMessage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#message IotdaDeviceMessage#message}
  */
  readonly message: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#message_id IotdaDeviceMessage#message_id}
  */
  readonly messageId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#name IotdaDeviceMessage#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#payload_format IotdaDeviceMessage#payload_format}
  */
  readonly payloadFormat?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#region IotdaDeviceMessage#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#topic IotdaDeviceMessage#topic}
  */
  readonly topic?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#topic_full_name IotdaDeviceMessage#topic_full_name}
  */
  readonly topicFullName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#ttl IotdaDeviceMessage#ttl}
  */
  readonly ttl?: string;
  /**
  * properties block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#properties IotdaDeviceMessage#properties}
  */
  readonly properties?: IotdaDeviceMessageProperties;
}
export interface IotdaDeviceMessageErrorInfo {
}

export function iotdaDeviceMessageErrorInfoToTerraform(struct?: IotdaDeviceMessageErrorInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function iotdaDeviceMessageErrorInfoToHclTerraform(struct?: IotdaDeviceMessageErrorInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class IotdaDeviceMessageErrorInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): IotdaDeviceMessageErrorInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceMessageErrorInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // error_code - computed: true, optional: false, required: false
  public get errorCode() {
    return this.getStringAttribute('error_code');
  }

  // error_msg - computed: true, optional: false, required: false
  public get errorMsg() {
    return this.getStringAttribute('error_msg');
  }
}

export class IotdaDeviceMessageErrorInfoList extends cdktf.ComplexList {

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
  public get(index: number): IotdaDeviceMessageErrorInfoOutputReference {
    return new IotdaDeviceMessageErrorInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface IotdaDeviceMessagePropertiesUserProperties {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#prop_key IotdaDeviceMessage#prop_key}
  */
  readonly propKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#prop_value IotdaDeviceMessage#prop_value}
  */
  readonly propValue?: string;
}

export function iotdaDeviceMessagePropertiesUserPropertiesToTerraform(struct?: IotdaDeviceMessagePropertiesUserProperties | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    prop_key: cdktf.stringToTerraform(struct!.propKey),
    prop_value: cdktf.stringToTerraform(struct!.propValue),
  }
}


export function iotdaDeviceMessagePropertiesUserPropertiesToHclTerraform(struct?: IotdaDeviceMessagePropertiesUserProperties | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    prop_key: {
      value: cdktf.stringToHclTerraform(struct!.propKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    prop_value: {
      value: cdktf.stringToHclTerraform(struct!.propValue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDeviceMessagePropertiesUserPropertiesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): IotdaDeviceMessagePropertiesUserProperties | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._propKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.propKey = this._propKey;
    }
    if (this._propValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.propValue = this._propValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceMessagePropertiesUserProperties | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._propKey = undefined;
      this._propValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._propKey = value.propKey;
      this._propValue = value.propValue;
    }
  }

  // prop_key - computed: true, optional: true, required: false
  private _propKey?: string; 
  public get propKey() {
    return this.getStringAttribute('prop_key');
  }
  public set propKey(value: string) {
    this._propKey = value;
  }
  public resetPropKey() {
    this._propKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get propKeyInput() {
    return this._propKey;
  }

  // prop_value - computed: true, optional: true, required: false
  private _propValue?: string; 
  public get propValue() {
    return this.getStringAttribute('prop_value');
  }
  public set propValue(value: string) {
    this._propValue = value;
  }
  public resetPropValue() {
    this._propValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get propValueInput() {
    return this._propValue;
  }
}

export class IotdaDeviceMessagePropertiesUserPropertiesList extends cdktf.ComplexList {
  public internalValue? : IotdaDeviceMessagePropertiesUserProperties[] | cdktf.IResolvable

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
  public get(index: number): IotdaDeviceMessagePropertiesUserPropertiesOutputReference {
    return new IotdaDeviceMessagePropertiesUserPropertiesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface IotdaDeviceMessageProperties {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#correlation_data IotdaDeviceMessage#correlation_data}
  */
  readonly correlationData?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#response_topic IotdaDeviceMessage#response_topic}
  */
  readonly responseTopic?: string;
  /**
  * user_properties block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#user_properties IotdaDeviceMessage#user_properties}
  */
  readonly userProperties?: IotdaDeviceMessagePropertiesUserProperties[] | cdktf.IResolvable;
}

export function iotdaDeviceMessagePropertiesToTerraform(struct?: IotdaDeviceMessagePropertiesOutputReference | IotdaDeviceMessageProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    correlation_data: cdktf.stringToTerraform(struct!.correlationData),
    response_topic: cdktf.stringToTerraform(struct!.responseTopic),
    user_properties: cdktf.listMapper(iotdaDeviceMessagePropertiesUserPropertiesToTerraform, true)(struct!.userProperties),
  }
}


export function iotdaDeviceMessagePropertiesToHclTerraform(struct?: IotdaDeviceMessagePropertiesOutputReference | IotdaDeviceMessageProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    correlation_data: {
      value: cdktf.stringToHclTerraform(struct!.correlationData),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    response_topic: {
      value: cdktf.stringToHclTerraform(struct!.responseTopic),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    user_properties: {
      value: cdktf.listMapperHcl(iotdaDeviceMessagePropertiesUserPropertiesToHclTerraform, true)(struct!.userProperties),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaDeviceMessagePropertiesUserPropertiesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaDeviceMessagePropertiesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaDeviceMessageProperties | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._correlationData !== undefined) {
      hasAnyValues = true;
      internalValueResult.correlationData = this._correlationData;
    }
    if (this._responseTopic !== undefined) {
      hasAnyValues = true;
      internalValueResult.responseTopic = this._responseTopic;
    }
    if (this._userProperties?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.userProperties = this._userProperties?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaDeviceMessageProperties | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._correlationData = undefined;
      this._responseTopic = undefined;
      this._userProperties.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._correlationData = value.correlationData;
      this._responseTopic = value.responseTopic;
      this._userProperties.internalValue = value.userProperties;
    }
  }

  // correlation_data - computed: true, optional: true, required: false
  private _correlationData?: string; 
  public get correlationData() {
    return this.getStringAttribute('correlation_data');
  }
  public set correlationData(value: string) {
    this._correlationData = value;
  }
  public resetCorrelationData() {
    this._correlationData = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get correlationDataInput() {
    return this._correlationData;
  }

  // response_topic - computed: true, optional: true, required: false
  private _responseTopic?: string; 
  public get responseTopic() {
    return this.getStringAttribute('response_topic');
  }
  public set responseTopic(value: string) {
    this._responseTopic = value;
  }
  public resetResponseTopic() {
    this._responseTopic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get responseTopicInput() {
    return this._responseTopic;
  }

  // user_properties - computed: false, optional: true, required: false
  private _userProperties = new IotdaDeviceMessagePropertiesUserPropertiesList(this, "user_properties", false);
  public get userProperties() {
    return this._userProperties;
  }
  public putUserProperties(value: IotdaDeviceMessagePropertiesUserProperties[] | cdktf.IResolvable) {
    this._userProperties.internalValue = value;
  }
  public resetUserProperties() {
    this._userProperties.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userPropertiesInput() {
    return this._userProperties.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message huaweicloud_iotda_device_message}
*/
export class IotdaDeviceMessage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_iotda_device_message";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IotdaDeviceMessage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IotdaDeviceMessage to import
  * @param importFromId The id of the existing IotdaDeviceMessage that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IotdaDeviceMessage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_iotda_device_message", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_device_message huaweicloud_iotda_device_message} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IotdaDeviceMessageConfig
  */
  public constructor(scope: Construct, id: string, config: IotdaDeviceMessageConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_iotda_device_message',
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
    this._deviceId = config.deviceId;
    this._encoding = config.encoding;
    this._id = config.id;
    this._message = config.message;
    this._messageId = config.messageId;
    this._name = config.name;
    this._payloadFormat = config.payloadFormat;
    this._region = config.region;
    this._topic = config.topic;
    this._topicFullName = config.topicFullName;
    this._ttl = config.ttl;
    this._properties.internalValue = config.properties;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_time - computed: true, optional: false, required: false
  public get createdTime() {
    return this.getStringAttribute('created_time');
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

  // encoding - computed: true, optional: true, required: false
  private _encoding?: string; 
  public get encoding() {
    return this.getStringAttribute('encoding');
  }
  public set encoding(value: string) {
    this._encoding = value;
  }
  public resetEncoding() {
    this._encoding = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get encodingInput() {
    return this._encoding;
  }

  // error_info - computed: true, optional: false, required: false
  private _errorInfo = new IotdaDeviceMessageErrorInfoList(this, "error_info", false);
  public get errorInfo() {
    return this._errorInfo;
  }

  // finished_time - computed: true, optional: false, required: false
  public get finishedTime() {
    return this.getStringAttribute('finished_time');
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

  // message - computed: false, optional: false, required: true
  private _message?: string; 
  public get message() {
    return this.getStringAttribute('message');
  }
  public set message(value: string) {
    this._message = value;
  }
  // Temporarily expose input value. Use with caution.
  public get messageInput() {
    return this._message;
  }

  // message_id - computed: true, optional: true, required: false
  private _messageId?: string; 
  public get messageId() {
    return this.getStringAttribute('message_id');
  }
  public set messageId(value: string) {
    this._messageId = value;
  }
  public resetMessageId() {
    this._messageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get messageIdInput() {
    return this._messageId;
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

  // payload_format - computed: true, optional: true, required: false
  private _payloadFormat?: string; 
  public get payloadFormat() {
    return this.getStringAttribute('payload_format');
  }
  public set payloadFormat(value: string) {
    this._payloadFormat = value;
  }
  public resetPayloadFormat() {
    this._payloadFormat = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get payloadFormatInput() {
    return this._payloadFormat;
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

  // topic - computed: true, optional: true, required: false
  private _topic?: string; 
  public get topic() {
    return this.getStringAttribute('topic');
  }
  public set topic(value: string) {
    this._topic = value;
  }
  public resetTopic() {
    this._topic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicInput() {
    return this._topic;
  }

  // topic_full_name - computed: true, optional: true, required: false
  private _topicFullName?: string; 
  public get topicFullName() {
    return this.getStringAttribute('topic_full_name');
  }
  public set topicFullName(value: string) {
    this._topicFullName = value;
  }
  public resetTopicFullName() {
    this._topicFullName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicFullNameInput() {
    return this._topicFullName;
  }

  // ttl - computed: false, optional: true, required: false
  private _ttl?: string; 
  public get ttl() {
    return this.getStringAttribute('ttl');
  }
  public set ttl(value: string) {
    this._ttl = value;
  }
  public resetTtl() {
    this._ttl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ttlInput() {
    return this._ttl;
  }

  // properties - computed: false, optional: true, required: false
  private _properties = new IotdaDeviceMessagePropertiesOutputReference(this, "properties");
  public get properties() {
    return this._properties;
  }
  public putProperties(value: IotdaDeviceMessageProperties) {
    this._properties.internalValue = value;
  }
  public resetProperties() {
    this._properties.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get propertiesInput() {
    return this._properties.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      device_id: cdktf.stringToTerraform(this._deviceId),
      encoding: cdktf.stringToTerraform(this._encoding),
      id: cdktf.stringToTerraform(this._id),
      message: cdktf.stringToTerraform(this._message),
      message_id: cdktf.stringToTerraform(this._messageId),
      name: cdktf.stringToTerraform(this._name),
      payload_format: cdktf.stringToTerraform(this._payloadFormat),
      region: cdktf.stringToTerraform(this._region),
      topic: cdktf.stringToTerraform(this._topic),
      topic_full_name: cdktf.stringToTerraform(this._topicFullName),
      ttl: cdktf.stringToTerraform(this._ttl),
      properties: iotdaDeviceMessagePropertiesToTerraform(this._properties.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      device_id: {
        value: cdktf.stringToHclTerraform(this._deviceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      encoding: {
        value: cdktf.stringToHclTerraform(this._encoding),
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
      message: {
        value: cdktf.stringToHclTerraform(this._message),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      message_id: {
        value: cdktf.stringToHclTerraform(this._messageId),
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
      payload_format: {
        value: cdktf.stringToHclTerraform(this._payloadFormat),
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
      topic: {
        value: cdktf.stringToHclTerraform(this._topic),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      topic_full_name: {
        value: cdktf.stringToHclTerraform(this._topicFullName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ttl: {
        value: cdktf.stringToHclTerraform(this._ttl),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      properties: {
        value: iotdaDeviceMessagePropertiesToHclTerraform(this._properties.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "IotdaDeviceMessagePropertiesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

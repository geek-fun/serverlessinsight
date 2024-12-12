// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ModelartsServiceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Which status you want to change the service to, the valid value can be **running** or **stopped**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#change_status_to ModelartsService#change_status_to}
  */
  readonly changeStatusTo?: string;
  /**
  * The description of the service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#description ModelartsService#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#id ModelartsService#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Inference mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#infer_type ModelartsService#infer_type}
  */
  readonly inferType: string;
  /**
  * Service name, which consists of 1 to 64 characters.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#name ModelartsService#name}
  */
  readonly name: string;
  /**
  * Specifies the ID of the new dedicated resource pool.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#pool_name ModelartsService#pool_name}
  */
  readonly poolName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#region ModelartsService#region}
  */
  readonly region?: string;
  /**
  * The security group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#security_group_id ModelartsService#security_group_id}
  */
  readonly securityGroupId?: string;
  /**
  * The subnet ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#subnet_id ModelartsService#subnet_id}
  */
  readonly subnetId?: string;
  /**
  * The VPC ID to which a real-time service instance is deployed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#vpc_id ModelartsService#vpc_id}
  */
  readonly vpcId?: string;
  /**
  * ID of the workspace to which a service belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#workspace_id ModelartsService#workspace_id}
  */
  readonly workspaceId?: string;
  /**
  * additional_properties block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#additional_properties ModelartsService#additional_properties}
  */
  readonly additionalProperties?: ModelartsServiceAdditionalProperties;
  /**
  * config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#config ModelartsService#config}
  */
  readonly config: ModelartsServiceConfigA[] | cdktf.IResolvable;
  /**
  * schedule block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#schedule ModelartsService#schedule}
  */
  readonly schedule?: ModelartsServiceSchedule;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#timeouts ModelartsService#timeouts}
  */
  readonly timeouts?: ModelartsServiceTimeouts;
}
export interface ModelartsServiceAdditionalPropertiesLogReportChannels {
  /**
  * The type of log report channel. The valid value is **LTS**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#type ModelartsService#type}
  */
  readonly type?: string;
}

export function modelartsServiceAdditionalPropertiesLogReportChannelsToTerraform(struct?: ModelartsServiceAdditionalPropertiesLogReportChannelsOutputReference | ModelartsServiceAdditionalPropertiesLogReportChannels): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function modelartsServiceAdditionalPropertiesLogReportChannelsToHclTerraform(struct?: ModelartsServiceAdditionalPropertiesLogReportChannelsOutputReference | ModelartsServiceAdditionalPropertiesLogReportChannels): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsServiceAdditionalPropertiesLogReportChannelsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ModelartsServiceAdditionalPropertiesLogReportChannels | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsServiceAdditionalPropertiesLogReportChannels | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._type = value.type;
    }
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
export interface ModelartsServiceAdditionalPropertiesSmnNotification {
  /**
  * Event ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#events ModelartsService#events}
  */
  readonly events?: number[];
  /**
  * URN of an SMN topic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#topic_urn ModelartsService#topic_urn}
  */
  readonly topicUrn?: string;
}

export function modelartsServiceAdditionalPropertiesSmnNotificationToTerraform(struct?: ModelartsServiceAdditionalPropertiesSmnNotificationOutputReference | ModelartsServiceAdditionalPropertiesSmnNotification): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    events: cdktf.listMapper(cdktf.numberToTerraform, false)(struct!.events),
    topic_urn: cdktf.stringToTerraform(struct!.topicUrn),
  }
}


export function modelartsServiceAdditionalPropertiesSmnNotificationToHclTerraform(struct?: ModelartsServiceAdditionalPropertiesSmnNotificationOutputReference | ModelartsServiceAdditionalPropertiesSmnNotification): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    events: {
      value: cdktf.listMapperHcl(cdktf.numberToHclTerraform, false)(struct!.events),
      isBlock: false,
      type: "list",
      storageClassType: "numberList",
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

export class ModelartsServiceAdditionalPropertiesSmnNotificationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ModelartsServiceAdditionalPropertiesSmnNotification | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._events !== undefined) {
      hasAnyValues = true;
      internalValueResult.events = this._events;
    }
    if (this._topicUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicUrn = this._topicUrn;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsServiceAdditionalPropertiesSmnNotification | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._events = undefined;
      this._topicUrn = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._events = value.events;
      this._topicUrn = value.topicUrn;
    }
  }

  // events - computed: true, optional: true, required: false
  private _events?: number[]; 
  public get events() {
    return this.getNumberListAttribute('events');
  }
  public set events(value: number[]) {
    this._events = value;
  }
  public resetEvents() {
    this._events = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eventsInput() {
    return this._events;
  }

  // topic_urn - computed: true, optional: true, required: false
  private _topicUrn?: string; 
  public get topicUrn() {
    return this.getStringAttribute('topic_urn');
  }
  public set topicUrn(value: string) {
    this._topicUrn = value;
  }
  public resetTopicUrn() {
    this._topicUrn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicUrnInput() {
    return this._topicUrn;
  }
}
export interface ModelartsServiceAdditionalProperties {
  /**
  * log_report_channels block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#log_report_channels ModelartsService#log_report_channels}
  */
  readonly logReportChannels?: ModelartsServiceAdditionalPropertiesLogReportChannels;
  /**
  * smn_notification block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#smn_notification ModelartsService#smn_notification}
  */
  readonly smnNotification?: ModelartsServiceAdditionalPropertiesSmnNotification;
}

export function modelartsServiceAdditionalPropertiesToTerraform(struct?: ModelartsServiceAdditionalPropertiesOutputReference | ModelartsServiceAdditionalProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    log_report_channels: modelartsServiceAdditionalPropertiesLogReportChannelsToTerraform(struct!.logReportChannels),
    smn_notification: modelartsServiceAdditionalPropertiesSmnNotificationToTerraform(struct!.smnNotification),
  }
}


export function modelartsServiceAdditionalPropertiesToHclTerraform(struct?: ModelartsServiceAdditionalPropertiesOutputReference | ModelartsServiceAdditionalProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    log_report_channels: {
      value: modelartsServiceAdditionalPropertiesLogReportChannelsToHclTerraform(struct!.logReportChannels),
      isBlock: true,
      type: "list",
      storageClassType: "ModelartsServiceAdditionalPropertiesLogReportChannelsList",
    },
    smn_notification: {
      value: modelartsServiceAdditionalPropertiesSmnNotificationToHclTerraform(struct!.smnNotification),
      isBlock: true,
      type: "list",
      storageClassType: "ModelartsServiceAdditionalPropertiesSmnNotificationList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsServiceAdditionalPropertiesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ModelartsServiceAdditionalProperties | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._logReportChannels?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.logReportChannels = this._logReportChannels?.internalValue;
    }
    if (this._smnNotification?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.smnNotification = this._smnNotification?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsServiceAdditionalProperties | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._logReportChannels.internalValue = undefined;
      this._smnNotification.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._logReportChannels.internalValue = value.logReportChannels;
      this._smnNotification.internalValue = value.smnNotification;
    }
  }

  // log_report_channels - computed: false, optional: true, required: false
  private _logReportChannels = new ModelartsServiceAdditionalPropertiesLogReportChannelsOutputReference(this, "log_report_channels");
  public get logReportChannels() {
    return this._logReportChannels;
  }
  public putLogReportChannels(value: ModelartsServiceAdditionalPropertiesLogReportChannels) {
    this._logReportChannels.internalValue = value;
  }
  public resetLogReportChannels() {
    this._logReportChannels.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logReportChannelsInput() {
    return this._logReportChannels.internalValue;
  }

  // smn_notification - computed: false, optional: true, required: false
  private _smnNotification = new ModelartsServiceAdditionalPropertiesSmnNotificationOutputReference(this, "smn_notification");
  public get smnNotification() {
    return this._smnNotification;
  }
  public putSmnNotification(value: ModelartsServiceAdditionalPropertiesSmnNotification) {
    this._smnNotification.internalValue = value;
  }
  public resetSmnNotification() {
    this._smnNotification.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smnNotificationInput() {
    return this._smnNotification.internalValue;
  }
}
export interface ModelartsServiceConfigCustomSpec {
  /**
  * Number of Ascend chips. Either this parameter or **gpu_p4** is configured.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#ascend_a310 ModelartsService#ascend_a310}
  */
  readonly ascendA310?: number;
  /**
  * Number of CPU cores, which can be a decimal. The value cannot be smaller than 0.01.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#cpu ModelartsService#cpu}
  */
  readonly cpu?: number;
  /**
  * Number of GPU cores, which can be a decimal.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#gpu_p4 ModelartsService#gpu_p4}
  */
  readonly gpuP4?: number;
  /**
  * Memory in MB, which must be an integer.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#memory ModelartsService#memory}
  */
  readonly memory?: number;
}

export function modelartsServiceConfigCustomSpecToTerraform(struct?: ModelartsServiceConfigCustomSpecOutputReference | ModelartsServiceConfigCustomSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    ascend_a310: cdktf.numberToTerraform(struct!.ascendA310),
    cpu: cdktf.numberToTerraform(struct!.cpu),
    gpu_p4: cdktf.numberToTerraform(struct!.gpuP4),
    memory: cdktf.numberToTerraform(struct!.memory),
  }
}


export function modelartsServiceConfigCustomSpecToHclTerraform(struct?: ModelartsServiceConfigCustomSpecOutputReference | ModelartsServiceConfigCustomSpec): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    ascend_a310: {
      value: cdktf.numberToHclTerraform(struct!.ascendA310),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    cpu: {
      value: cdktf.numberToHclTerraform(struct!.cpu),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    gpu_p4: {
      value: cdktf.numberToHclTerraform(struct!.gpuP4),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    memory: {
      value: cdktf.numberToHclTerraform(struct!.memory),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsServiceConfigCustomSpecOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ModelartsServiceConfigCustomSpec | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._ascendA310 !== undefined) {
      hasAnyValues = true;
      internalValueResult.ascendA310 = this._ascendA310;
    }
    if (this._cpu !== undefined) {
      hasAnyValues = true;
      internalValueResult.cpu = this._cpu;
    }
    if (this._gpuP4 !== undefined) {
      hasAnyValues = true;
      internalValueResult.gpuP4 = this._gpuP4;
    }
    if (this._memory !== undefined) {
      hasAnyValues = true;
      internalValueResult.memory = this._memory;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsServiceConfigCustomSpec | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._ascendA310 = undefined;
      this._cpu = undefined;
      this._gpuP4 = undefined;
      this._memory = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._ascendA310 = value.ascendA310;
      this._cpu = value.cpu;
      this._gpuP4 = value.gpuP4;
      this._memory = value.memory;
    }
  }

  // ascend_a310 - computed: true, optional: true, required: false
  private _ascendA310?: number; 
  public get ascendA310() {
    return this.getNumberAttribute('ascend_a310');
  }
  public set ascendA310(value: number) {
    this._ascendA310 = value;
  }
  public resetAscendA310() {
    this._ascendA310 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ascendA310Input() {
    return this._ascendA310;
  }

  // cpu - computed: true, optional: true, required: false
  private _cpu?: number; 
  public get cpu() {
    return this.getNumberAttribute('cpu');
  }
  public set cpu(value: number) {
    this._cpu = value;
  }
  public resetCpu() {
    this._cpu = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cpuInput() {
    return this._cpu;
  }

  // gpu_p4 - computed: true, optional: true, required: false
  private _gpuP4?: number; 
  public get gpuP4() {
    return this.getNumberAttribute('gpu_p4');
  }
  public set gpuP4(value: number) {
    this._gpuP4 = value;
  }
  public resetGpuP4() {
    this._gpuP4 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gpuP4Input() {
    return this._gpuP4;
  }

  // memory - computed: true, optional: true, required: false
  private _memory?: number; 
  public get memory() {
    return this.getNumberAttribute('memory');
  }
  public set memory(value: number) {
    this._memory = value;
  }
  public resetMemory() {
    this._memory = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get memoryInput() {
    return this._memory;
  }
}
export interface ModelartsServiceConfigA {
  /**
  * OBS path to the output data of a batch job. Mandatory for batch services.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#dest_path ModelartsService#dest_path}
  */
  readonly destPath?: string;
  /**
  * Environment variable key-value pair required for running a model.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#envs ModelartsService#envs}
  */
  readonly envs?: { [key: string]: string };
  /**
  * Number of instances deployed for a model.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#instance_count ModelartsService#instance_count}
  */
  readonly instanceCount?: number;
  /**
  * Mapping between input parameters and CSV data. Optional for batch services.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#mapping_rule ModelartsService#mapping_rule}
  */
  readonly mappingRule?: { [key: string]: string };
  /**
  * Mapping type of the input data. Mandatory for batch services.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#mapping_type ModelartsService#mapping_type}
  */
  readonly mappingType?: string;
  /**
  * Model ID, which can be obtained by calling the API for obtaining a model list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#model_id ModelartsService#model_id}
  */
  readonly modelId?: string;
  /**
  * Edge node ID array. Mandatory for edge services.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#nodes ModelartsService#nodes}
  */
  readonly nodes?: string[];
  /**
  * ID of a dedicated resource pool. Optional for real-time services.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#pool_name ModelartsService#pool_name}
  */
  readonly poolName?: string;
  /**
  * Inference API called in a batch task, which is the RESTful API exposed in the model image.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#req_uri ModelartsService#req_uri}
  */
  readonly reqUri?: string;
  /**
  * Resource flavors.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#specification ModelartsService#specification}
  */
  readonly specification?: string;
  /**
  * OBS path to the input data of a batch job.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#src_path ModelartsService#src_path}
  */
  readonly srcPath?: string;
  /**
  * Data source type, which can be ManifestFile. Mandatory for batch services.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#src_type ModelartsService#src_type}
  */
  readonly srcType?: string;
  /**
  * Weight of traffic allocated to a model.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#weight ModelartsService#weight}
  */
  readonly weight?: number;
  /**
  * custom_spec block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#custom_spec ModelartsService#custom_spec}
  */
  readonly customSpec?: ModelartsServiceConfigCustomSpec;
}

export function modelartsServiceConfigAToTerraform(struct?: ModelartsServiceConfigA | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dest_path: cdktf.stringToTerraform(struct!.destPath),
    envs: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.envs),
    instance_count: cdktf.numberToTerraform(struct!.instanceCount),
    mapping_rule: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.mappingRule),
    mapping_type: cdktf.stringToTerraform(struct!.mappingType),
    model_id: cdktf.stringToTerraform(struct!.modelId),
    nodes: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.nodes),
    pool_name: cdktf.stringToTerraform(struct!.poolName),
    req_uri: cdktf.stringToTerraform(struct!.reqUri),
    specification: cdktf.stringToTerraform(struct!.specification),
    src_path: cdktf.stringToTerraform(struct!.srcPath),
    src_type: cdktf.stringToTerraform(struct!.srcType),
    weight: cdktf.numberToTerraform(struct!.weight),
    custom_spec: modelartsServiceConfigCustomSpecToTerraform(struct!.customSpec),
  }
}


export function modelartsServiceConfigAToHclTerraform(struct?: ModelartsServiceConfigA | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    dest_path: {
      value: cdktf.stringToHclTerraform(struct!.destPath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    envs: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.envs),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    instance_count: {
      value: cdktf.numberToHclTerraform(struct!.instanceCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    mapping_rule: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.mappingRule),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    mapping_type: {
      value: cdktf.stringToHclTerraform(struct!.mappingType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    model_id: {
      value: cdktf.stringToHclTerraform(struct!.modelId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    nodes: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.nodes),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    pool_name: {
      value: cdktf.stringToHclTerraform(struct!.poolName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    req_uri: {
      value: cdktf.stringToHclTerraform(struct!.reqUri),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    specification: {
      value: cdktf.stringToHclTerraform(struct!.specification),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    src_path: {
      value: cdktf.stringToHclTerraform(struct!.srcPath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    src_type: {
      value: cdktf.stringToHclTerraform(struct!.srcType),
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
    custom_spec: {
      value: modelartsServiceConfigCustomSpecToHclTerraform(struct!.customSpec),
      isBlock: true,
      type: "list",
      storageClassType: "ModelartsServiceConfigCustomSpecList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ModelartsServiceConfigAOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ModelartsServiceConfigA | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._destPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.destPath = this._destPath;
    }
    if (this._envs !== undefined) {
      hasAnyValues = true;
      internalValueResult.envs = this._envs;
    }
    if (this._instanceCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceCount = this._instanceCount;
    }
    if (this._mappingRule !== undefined) {
      hasAnyValues = true;
      internalValueResult.mappingRule = this._mappingRule;
    }
    if (this._mappingType !== undefined) {
      hasAnyValues = true;
      internalValueResult.mappingType = this._mappingType;
    }
    if (this._modelId !== undefined) {
      hasAnyValues = true;
      internalValueResult.modelId = this._modelId;
    }
    if (this._nodes !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodes = this._nodes;
    }
    if (this._poolName !== undefined) {
      hasAnyValues = true;
      internalValueResult.poolName = this._poolName;
    }
    if (this._reqUri !== undefined) {
      hasAnyValues = true;
      internalValueResult.reqUri = this._reqUri;
    }
    if (this._specification !== undefined) {
      hasAnyValues = true;
      internalValueResult.specification = this._specification;
    }
    if (this._srcPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.srcPath = this._srcPath;
    }
    if (this._srcType !== undefined) {
      hasAnyValues = true;
      internalValueResult.srcType = this._srcType;
    }
    if (this._weight !== undefined) {
      hasAnyValues = true;
      internalValueResult.weight = this._weight;
    }
    if (this._customSpec?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.customSpec = this._customSpec?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsServiceConfigA | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._destPath = undefined;
      this._envs = undefined;
      this._instanceCount = undefined;
      this._mappingRule = undefined;
      this._mappingType = undefined;
      this._modelId = undefined;
      this._nodes = undefined;
      this._poolName = undefined;
      this._reqUri = undefined;
      this._specification = undefined;
      this._srcPath = undefined;
      this._srcType = undefined;
      this._weight = undefined;
      this._customSpec.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._destPath = value.destPath;
      this._envs = value.envs;
      this._instanceCount = value.instanceCount;
      this._mappingRule = value.mappingRule;
      this._mappingType = value.mappingType;
      this._modelId = value.modelId;
      this._nodes = value.nodes;
      this._poolName = value.poolName;
      this._reqUri = value.reqUri;
      this._specification = value.specification;
      this._srcPath = value.srcPath;
      this._srcType = value.srcType;
      this._weight = value.weight;
      this._customSpec.internalValue = value.customSpec;
    }
  }

  // dest_path - computed: true, optional: true, required: false
  private _destPath?: string; 
  public get destPath() {
    return this.getStringAttribute('dest_path');
  }
  public set destPath(value: string) {
    this._destPath = value;
  }
  public resetDestPath() {
    this._destPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destPathInput() {
    return this._destPath;
  }

  // envs - computed: true, optional: true, required: false
  private _envs?: { [key: string]: string }; 
  public get envs() {
    return this.getStringMapAttribute('envs');
  }
  public set envs(value: { [key: string]: string }) {
    this._envs = value;
  }
  public resetEnvs() {
    this._envs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get envsInput() {
    return this._envs;
  }

  // instance_count - computed: true, optional: true, required: false
  private _instanceCount?: number; 
  public get instanceCount() {
    return this.getNumberAttribute('instance_count');
  }
  public set instanceCount(value: number) {
    this._instanceCount = value;
  }
  public resetInstanceCount() {
    this._instanceCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceCountInput() {
    return this._instanceCount;
  }

  // mapping_rule - computed: true, optional: true, required: false
  private _mappingRule?: { [key: string]: string }; 
  public get mappingRule() {
    return this.getStringMapAttribute('mapping_rule');
  }
  public set mappingRule(value: { [key: string]: string }) {
    this._mappingRule = value;
  }
  public resetMappingRule() {
    this._mappingRule = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mappingRuleInput() {
    return this._mappingRule;
  }

  // mapping_type - computed: true, optional: true, required: false
  private _mappingType?: string; 
  public get mappingType() {
    return this.getStringAttribute('mapping_type');
  }
  public set mappingType(value: string) {
    this._mappingType = value;
  }
  public resetMappingType() {
    this._mappingType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mappingTypeInput() {
    return this._mappingType;
  }

  // model_id - computed: true, optional: true, required: false
  private _modelId?: string; 
  public get modelId() {
    return this.getStringAttribute('model_id');
  }
  public set modelId(value: string) {
    this._modelId = value;
  }
  public resetModelId() {
    this._modelId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get modelIdInput() {
    return this._modelId;
  }

  // nodes - computed: true, optional: true, required: false
  private _nodes?: string[]; 
  public get nodes() {
    return this.getListAttribute('nodes');
  }
  public set nodes(value: string[]) {
    this._nodes = value;
  }
  public resetNodes() {
    this._nodes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodesInput() {
    return this._nodes;
  }

  // pool_name - computed: true, optional: true, required: false
  private _poolName?: string; 
  public get poolName() {
    return this.getStringAttribute('pool_name');
  }
  public set poolName(value: string) {
    this._poolName = value;
  }
  public resetPoolName() {
    this._poolName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get poolNameInput() {
    return this._poolName;
  }

  // req_uri - computed: true, optional: true, required: false
  private _reqUri?: string; 
  public get reqUri() {
    return this.getStringAttribute('req_uri');
  }
  public set reqUri(value: string) {
    this._reqUri = value;
  }
  public resetReqUri() {
    this._reqUri = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get reqUriInput() {
    return this._reqUri;
  }

  // specification - computed: true, optional: true, required: false
  private _specification?: string; 
  public get specification() {
    return this.getStringAttribute('specification');
  }
  public set specification(value: string) {
    this._specification = value;
  }
  public resetSpecification() {
    this._specification = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get specificationInput() {
    return this._specification;
  }

  // src_path - computed: true, optional: true, required: false
  private _srcPath?: string; 
  public get srcPath() {
    return this.getStringAttribute('src_path');
  }
  public set srcPath(value: string) {
    this._srcPath = value;
  }
  public resetSrcPath() {
    this._srcPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcPathInput() {
    return this._srcPath;
  }

  // src_type - computed: true, optional: true, required: false
  private _srcType?: string; 
  public get srcType() {
    return this.getStringAttribute('src_type');
  }
  public set srcType(value: string) {
    this._srcType = value;
  }
  public resetSrcType() {
    this._srcType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcTypeInput() {
    return this._srcType;
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

  // custom_spec - computed: false, optional: true, required: false
  private _customSpec = new ModelartsServiceConfigCustomSpecOutputReference(this, "custom_spec");
  public get customSpec() {
    return this._customSpec;
  }
  public putCustomSpec(value: ModelartsServiceConfigCustomSpec) {
    this._customSpec.internalValue = value;
  }
  public resetCustomSpec() {
    this._customSpec.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customSpecInput() {
    return this._customSpec.internalValue;
  }
}

export class ModelartsServiceConfigAList extends cdktf.ComplexList {
  public internalValue? : ModelartsServiceConfigA[] | cdktf.IResolvable

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
  public get(index: number): ModelartsServiceConfigAOutputReference {
    return new ModelartsServiceConfigAOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ModelartsServiceSchedule {
  /**
  * Value mapping a time unit.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#duration ModelartsService#duration}
  */
  readonly duration: number;
  /**
  * Scheduling time unit. Possible values are DAYS, HOURS, and MINUTES.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#time_unit ModelartsService#time_unit}
  */
  readonly timeUnit: string;
  /**
  * Scheduling type. Only the value **stop** is supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#type ModelartsService#type}
  */
  readonly type: string;
}

export function modelartsServiceScheduleToTerraform(struct?: ModelartsServiceScheduleOutputReference | ModelartsServiceSchedule): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    duration: cdktf.numberToTerraform(struct!.duration),
    time_unit: cdktf.stringToTerraform(struct!.timeUnit),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function modelartsServiceScheduleToHclTerraform(struct?: ModelartsServiceScheduleOutputReference | ModelartsServiceSchedule): any {
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
    time_unit: {
      value: cdktf.stringToHclTerraform(struct!.timeUnit),
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

export class ModelartsServiceScheduleOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ModelartsServiceSchedule | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._duration !== undefined) {
      hasAnyValues = true;
      internalValueResult.duration = this._duration;
    }
    if (this._timeUnit !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeUnit = this._timeUnit;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ModelartsServiceSchedule | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._duration = undefined;
      this._timeUnit = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._duration = value.duration;
      this._timeUnit = value.timeUnit;
      this._type = value.type;
    }
  }

  // duration - computed: false, optional: false, required: true
  private _duration?: number; 
  public get duration() {
    return this.getNumberAttribute('duration');
  }
  public set duration(value: number) {
    this._duration = value;
  }
  // Temporarily expose input value. Use with caution.
  public get durationInput() {
    return this._duration;
  }

  // time_unit - computed: false, optional: false, required: true
  private _timeUnit?: string; 
  public get timeUnit() {
    return this.getStringAttribute('time_unit');
  }
  public set timeUnit(value: string) {
    this._timeUnit = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeUnitInput() {
    return this._timeUnit;
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
export interface ModelartsServiceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#create ModelartsService#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#delete ModelartsService#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#update ModelartsService#update}
  */
  readonly update?: string;
}

export function modelartsServiceTimeoutsToTerraform(struct?: ModelartsServiceTimeouts | cdktf.IResolvable): any {
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


export function modelartsServiceTimeoutsToHclTerraform(struct?: ModelartsServiceTimeouts | cdktf.IResolvable): any {
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

export class ModelartsServiceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): ModelartsServiceTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: ModelartsServiceTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service huaweicloud_modelarts_service}
*/
export class ModelartsService extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_modelarts_service";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ModelartsService resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ModelartsService to import
  * @param importFromId The id of the existing ModelartsService that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ModelartsService to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_modelarts_service", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_service huaweicloud_modelarts_service} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ModelartsServiceConfig
  */
  public constructor(scope: Construct, id: string, config: ModelartsServiceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_modelarts_service',
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
    this._changeStatusTo = config.changeStatusTo;
    this._description = config.description;
    this._id = config.id;
    this._inferType = config.inferType;
    this._name = config.name;
    this._poolName = config.poolName;
    this._region = config.region;
    this._securityGroupId = config.securityGroupId;
    this._subnetId = config.subnetId;
    this._vpcId = config.vpcId;
    this._workspaceId = config.workspaceId;
    this._additionalProperties.internalValue = config.additionalProperties;
    this._config.internalValue = config.config;
    this._schedule.internalValue = config.schedule;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_address - computed: true, optional: false, required: false
  public get accessAddress() {
    return this.getStringAttribute('access_address');
  }

  // bind_access_address - computed: true, optional: false, required: false
  public get bindAccessAddress() {
    return this.getStringAttribute('bind_access_address');
  }

  // change_status_to - computed: true, optional: true, required: false
  private _changeStatusTo?: string; 
  public get changeStatusTo() {
    return this.getStringAttribute('change_status_to');
  }
  public set changeStatusTo(value: string) {
    this._changeStatusTo = value;
  }
  public resetChangeStatusTo() {
    this._changeStatusTo = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get changeStatusToInput() {
    return this._changeStatusTo;
  }

  // debug_url - computed: true, optional: false, required: false
  public get debugUrl() {
    return this.getStringAttribute('debug_url');
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

  // failed_times - computed: true, optional: false, required: false
  public get failedTimes() {
    return this.getNumberAttribute('failed_times');
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

  // infer_type - computed: false, optional: false, required: true
  private _inferType?: string; 
  public get inferType() {
    return this.getStringAttribute('infer_type');
  }
  public set inferType(value: string) {
    this._inferType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get inferTypeInput() {
    return this._inferType;
  }

  // invocation_times - computed: true, optional: false, required: false
  public get invocationTimes() {
    return this.getNumberAttribute('invocation_times');
  }

  // is_free - computed: true, optional: false, required: false
  public get isFree() {
    return this.getBooleanAttribute('is_free');
  }

  // is_shared - computed: true, optional: false, required: false
  public get isShared() {
    return this.getBooleanAttribute('is_shared');
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

  // owner - computed: true, optional: false, required: false
  public get owner() {
    return this.getStringAttribute('owner');
  }

  // pool_name - computed: true, optional: true, required: false
  private _poolName?: string; 
  public get poolName() {
    return this.getStringAttribute('pool_name');
  }
  public set poolName(value: string) {
    this._poolName = value;
  }
  public resetPoolName() {
    this._poolName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get poolNameInput() {
    return this._poolName;
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

  // security_group_id - computed: true, optional: true, required: false
  private _securityGroupId?: string; 
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }
  public set securityGroupId(value: string) {
    this._securityGroupId = value;
  }
  public resetSecurityGroupId() {
    this._securityGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupIdInput() {
    return this._securityGroupId;
  }

  // shared_count - computed: true, optional: false, required: false
  public get sharedCount() {
    return this.getNumberAttribute('shared_count');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // subnet_id - computed: true, optional: true, required: false
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  public resetSubnetId() {
    this._subnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
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

  // workspace_id - computed: true, optional: true, required: false
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  public resetWorkspaceId() {
    this._workspaceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // additional_properties - computed: false, optional: true, required: false
  private _additionalProperties = new ModelartsServiceAdditionalPropertiesOutputReference(this, "additional_properties");
  public get additionalProperties() {
    return this._additionalProperties;
  }
  public putAdditionalProperties(value: ModelartsServiceAdditionalProperties) {
    this._additionalProperties.internalValue = value;
  }
  public resetAdditionalProperties() {
    this._additionalProperties.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get additionalPropertiesInput() {
    return this._additionalProperties.internalValue;
  }

  // config - computed: false, optional: false, required: true
  private _config = new ModelartsServiceConfigAList(this, "config", false);
  public get config() {
    return this._config;
  }
  public putConfig(value: ModelartsServiceConfigA[] | cdktf.IResolvable) {
    this._config.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get configInput() {
    return this._config.internalValue;
  }

  // schedule - computed: false, optional: true, required: false
  private _schedule = new ModelartsServiceScheduleOutputReference(this, "schedule");
  public get schedule() {
    return this._schedule;
  }
  public putSchedule(value: ModelartsServiceSchedule) {
    this._schedule.internalValue = value;
  }
  public resetSchedule() {
    this._schedule.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scheduleInput() {
    return this._schedule.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new ModelartsServiceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: ModelartsServiceTimeouts) {
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
      change_status_to: cdktf.stringToTerraform(this._changeStatusTo),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      infer_type: cdktf.stringToTerraform(this._inferType),
      name: cdktf.stringToTerraform(this._name),
      pool_name: cdktf.stringToTerraform(this._poolName),
      region: cdktf.stringToTerraform(this._region),
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      additional_properties: modelartsServiceAdditionalPropertiesToTerraform(this._additionalProperties.internalValue),
      config: cdktf.listMapper(modelartsServiceConfigAToTerraform, true)(this._config.internalValue),
      schedule: modelartsServiceScheduleToTerraform(this._schedule.internalValue),
      timeouts: modelartsServiceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      change_status_to: {
        value: cdktf.stringToHclTerraform(this._changeStatusTo),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      infer_type: {
        value: cdktf.stringToHclTerraform(this._inferType),
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
      pool_name: {
        value: cdktf.stringToHclTerraform(this._poolName),
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
      security_group_id: {
        value: cdktf.stringToHclTerraform(this._securityGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      subnet_id: {
        value: cdktf.stringToHclTerraform(this._subnetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      additional_properties: {
        value: modelartsServiceAdditionalPropertiesToHclTerraform(this._additionalProperties.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ModelartsServiceAdditionalPropertiesList",
      },
      config: {
        value: cdktf.listMapperHcl(modelartsServiceConfigAToHclTerraform, true)(this._config.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ModelartsServiceConfigAList",
      },
      schedule: {
        value: modelartsServiceScheduleToHclTerraform(this._schedule.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ModelartsServiceScheduleList",
      },
      timeouts: {
        value: modelartsServiceTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "ModelartsServiceTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

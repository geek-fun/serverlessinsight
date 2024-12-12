// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsCceAccessConfig extends cdktf.TerraformMetaArguments {
  /**
  * Whether collect in binary format. Default is false.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#binary_collect LtsCceAccess#binary_collect}
  */
  readonly binaryCollect?: boolean | cdktf.IResolvable;
  /**
  * The CCE cluster ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#cluster_id LtsCceAccess#cluster_id}
  */
  readonly clusterId: string;
  /**
  * The log access host group ID list.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#host_group_ids LtsCceAccess#host_group_ids}
  */
  readonly hostGroupIds?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#id LtsCceAccess#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The log group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#log_group_id LtsCceAccess#log_group_id}
  */
  readonly logGroupId: string;
  /**
  * Whether to split log. Default is false.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#log_split LtsCceAccess#log_split}
  */
  readonly logSplit?: boolean | cdktf.IResolvable;
  /**
  * The log stream ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#log_stream_id LtsCceAccess#log_stream_id}
  */
  readonly logStreamId: string;
  /**
  * The name of the CCE access.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#name LtsCceAccess#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#region LtsCceAccess#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#tags LtsCceAccess#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * access_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#access_config LtsCceAccess#access_config}
  */
  readonly accessConfig: LtsCceAccessAccessConfig;
}
export interface LtsCceAccessAccessConfigMultiLogFormat {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#mode LtsCceAccess#mode}
  */
  readonly mode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#value LtsCceAccess#value}
  */
  readonly value: string;
}

export function ltsCceAccessAccessConfigMultiLogFormatToTerraform(struct?: LtsCceAccessAccessConfigMultiLogFormatOutputReference | LtsCceAccessAccessConfigMultiLogFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    mode: cdktf.stringToTerraform(struct!.mode),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function ltsCceAccessAccessConfigMultiLogFormatToHclTerraform(struct?: LtsCceAccessAccessConfigMultiLogFormatOutputReference | LtsCceAccessAccessConfigMultiLogFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    mode: {
      value: cdktf.stringToHclTerraform(struct!.mode),
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

export class LtsCceAccessAccessConfigMultiLogFormatOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsCceAccessAccessConfigMultiLogFormat | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._mode !== undefined) {
      hasAnyValues = true;
      internalValueResult.mode = this._mode;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsCceAccessAccessConfigMultiLogFormat | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._mode = undefined;
      this._value = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._mode = value.mode;
      this._value = value.value;
    }
  }

  // mode - computed: false, optional: false, required: true
  private _mode?: string; 
  public get mode() {
    return this.getStringAttribute('mode');
  }
  public set mode(value: string) {
    this._mode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get modeInput() {
    return this._mode;
  }

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}
export interface LtsCceAccessAccessConfigSingleLogFormat {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#mode LtsCceAccess#mode}
  */
  readonly mode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#value LtsCceAccess#value}
  */
  readonly value?: string;
}

export function ltsCceAccessAccessConfigSingleLogFormatToTerraform(struct?: LtsCceAccessAccessConfigSingleLogFormatOutputReference | LtsCceAccessAccessConfigSingleLogFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    mode: cdktf.stringToTerraform(struct!.mode),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function ltsCceAccessAccessConfigSingleLogFormatToHclTerraform(struct?: LtsCceAccessAccessConfigSingleLogFormatOutputReference | LtsCceAccessAccessConfigSingleLogFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    mode: {
      value: cdktf.stringToHclTerraform(struct!.mode),
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

export class LtsCceAccessAccessConfigSingleLogFormatOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsCceAccessAccessConfigSingleLogFormat | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._mode !== undefined) {
      hasAnyValues = true;
      internalValueResult.mode = this._mode;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsCceAccessAccessConfigSingleLogFormat | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._mode = undefined;
      this._value = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._mode = value.mode;
      this._value = value.value;
    }
  }

  // mode - computed: false, optional: false, required: true
  private _mode?: string; 
  public get mode() {
    return this.getStringAttribute('mode');
  }
  public set mode(value: string) {
    this._mode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get modeInput() {
    return this._mode;
  }

  // value - computed: true, optional: true, required: false
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
export interface LtsCceAccessAccessConfigWindowsLogInfo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#categorys LtsCceAccess#categorys}
  */
  readonly categorys: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#event_level LtsCceAccess#event_level}
  */
  readonly eventLevel: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#time_offset LtsCceAccess#time_offset}
  */
  readonly timeOffset: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#time_offset_unit LtsCceAccess#time_offset_unit}
  */
  readonly timeOffsetUnit: string;
}

export function ltsCceAccessAccessConfigWindowsLogInfoToTerraform(struct?: LtsCceAccessAccessConfigWindowsLogInfoOutputReference | LtsCceAccessAccessConfigWindowsLogInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    categorys: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.categorys),
    event_level: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.eventLevel),
    time_offset: cdktf.numberToTerraform(struct!.timeOffset),
    time_offset_unit: cdktf.stringToTerraform(struct!.timeOffsetUnit),
  }
}


export function ltsCceAccessAccessConfigWindowsLogInfoToHclTerraform(struct?: LtsCceAccessAccessConfigWindowsLogInfoOutputReference | LtsCceAccessAccessConfigWindowsLogInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    categorys: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.categorys),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    event_level: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.eventLevel),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    time_offset: {
      value: cdktf.numberToHclTerraform(struct!.timeOffset),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    time_offset_unit: {
      value: cdktf.stringToHclTerraform(struct!.timeOffsetUnit),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsCceAccessAccessConfigWindowsLogInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsCceAccessAccessConfigWindowsLogInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._categorys !== undefined) {
      hasAnyValues = true;
      internalValueResult.categorys = this._categorys;
    }
    if (this._eventLevel !== undefined) {
      hasAnyValues = true;
      internalValueResult.eventLevel = this._eventLevel;
    }
    if (this._timeOffset !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeOffset = this._timeOffset;
    }
    if (this._timeOffsetUnit !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeOffsetUnit = this._timeOffsetUnit;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsCceAccessAccessConfigWindowsLogInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._categorys = undefined;
      this._eventLevel = undefined;
      this._timeOffset = undefined;
      this._timeOffsetUnit = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._categorys = value.categorys;
      this._eventLevel = value.eventLevel;
      this._timeOffset = value.timeOffset;
      this._timeOffsetUnit = value.timeOffsetUnit;
    }
  }

  // categorys - computed: false, optional: false, required: true
  private _categorys?: string[]; 
  public get categorys() {
    return this.getListAttribute('categorys');
  }
  public set categorys(value: string[]) {
    this._categorys = value;
  }
  // Temporarily expose input value. Use with caution.
  public get categorysInput() {
    return this._categorys;
  }

  // event_level - computed: false, optional: false, required: true
  private _eventLevel?: string[]; 
  public get eventLevel() {
    return this.getListAttribute('event_level');
  }
  public set eventLevel(value: string[]) {
    this._eventLevel = value;
  }
  // Temporarily expose input value. Use with caution.
  public get eventLevelInput() {
    return this._eventLevel;
  }

  // time_offset - computed: false, optional: false, required: true
  private _timeOffset?: number; 
  public get timeOffset() {
    return this.getNumberAttribute('time_offset');
  }
  public set timeOffset(value: number) {
    this._timeOffset = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeOffsetInput() {
    return this._timeOffset;
  }

  // time_offset_unit - computed: false, optional: false, required: true
  private _timeOffsetUnit?: string; 
  public get timeOffsetUnit() {
    return this.getStringAttribute('time_offset_unit');
  }
  public set timeOffsetUnit(value: string) {
    this._timeOffsetUnit = value;
  }
  // Temporarily expose input value. Use with caution.
  public get timeOffsetUnitInput() {
    return this._timeOffsetUnit;
  }
}
export interface LtsCceAccessAccessConfig {
  /**
  * The collection path blacklist.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#black_paths LtsCceAccess#black_paths}
  */
  readonly blackPaths?: string[];
  /**
  * The regular expression matching of kubernetes container names.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#container_name_regex LtsCceAccess#container_name_regex}
  */
  readonly containerNameRegex?: string;
  /**
  * The environment variable blacklist.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#exclude_envs LtsCceAccess#exclude_envs}
  */
  readonly excludeEnvs?: { [key: string]: string };
  /**
  * The kubernetes label blacklist.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#exclude_k8s_labels LtsCceAccess#exclude_k8s_labels}
  */
  readonly excludeK8SLabels?: { [key: string]: string };
  /**
  * The container label blacklist.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#exclude_labels LtsCceAccess#exclude_labels}
  */
  readonly excludeLabels?: { [key: string]: string };
  /**
  * The environment variable whitelist.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#include_envs LtsCceAccess#include_envs}
  */
  readonly includeEnvs?: { [key: string]: string };
  /**
  * The kubernetes label whitelist.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#include_k8s_labels LtsCceAccess#include_k8s_labels}
  */
  readonly includeK8SLabels?: { [key: string]: string };
  /**
  * The container label whitelist.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#include_labels LtsCceAccess#include_labels}
  */
  readonly includeLabels?: { [key: string]: string };
  /**
  * The environment variable tag.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#log_envs LtsCceAccess#log_envs}
  */
  readonly logEnvs?: { [key: string]: string };
  /**
  * The kubernetes label log tag.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#log_k8s LtsCceAccess#log_k8s}
  */
  readonly logK8S?: { [key: string]: string };
  /**
  * The container label log tag.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#log_labels LtsCceAccess#log_labels}
  */
  readonly logLabels?: { [key: string]: string };
  /**
  * The regular expression matching of kubernetes namespaces.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#name_space_regex LtsCceAccess#name_space_regex}
  */
  readonly nameSpaceRegex?: string;
  /**
  * The type of the CCE access.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#path_type LtsCceAccess#path_type}
  */
  readonly pathType: string;
  /**
  * The collection paths.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#paths LtsCceAccess#paths}
  */
  readonly paths?: string[];
  /**
  * The regular expression matching of kubernetes pods.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#pod_name_regex LtsCceAccess#pod_name_regex}
  */
  readonly podNameRegex?: string;
  /**
  * Whether error output is standard. Default is false.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#stderr LtsCceAccess#stderr}
  */
  readonly stderr?: boolean | cdktf.IResolvable;
  /**
  * Whether output is standard. Default is false.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#stdout LtsCceAccess#stdout}
  */
  readonly stdout?: boolean | cdktf.IResolvable;
  /**
  * multi_log_format block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#multi_log_format LtsCceAccess#multi_log_format}
  */
  readonly multiLogFormat?: LtsCceAccessAccessConfigMultiLogFormat;
  /**
  * single_log_format block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#single_log_format LtsCceAccess#single_log_format}
  */
  readonly singleLogFormat?: LtsCceAccessAccessConfigSingleLogFormat;
  /**
  * windows_log_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#windows_log_info LtsCceAccess#windows_log_info}
  */
  readonly windowsLogInfo?: LtsCceAccessAccessConfigWindowsLogInfo;
}

export function ltsCceAccessAccessConfigToTerraform(struct?: LtsCceAccessAccessConfigOutputReference | LtsCceAccessAccessConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    black_paths: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.blackPaths),
    container_name_regex: cdktf.stringToTerraform(struct!.containerNameRegex),
    exclude_envs: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.excludeEnvs),
    exclude_k8s_labels: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.excludeK8SLabels),
    exclude_labels: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.excludeLabels),
    include_envs: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.includeEnvs),
    include_k8s_labels: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.includeK8SLabels),
    include_labels: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.includeLabels),
    log_envs: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.logEnvs),
    log_k8s: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.logK8S),
    log_labels: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.logLabels),
    name_space_regex: cdktf.stringToTerraform(struct!.nameSpaceRegex),
    path_type: cdktf.stringToTerraform(struct!.pathType),
    paths: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.paths),
    pod_name_regex: cdktf.stringToTerraform(struct!.podNameRegex),
    stderr: cdktf.booleanToTerraform(struct!.stderr),
    stdout: cdktf.booleanToTerraform(struct!.stdout),
    multi_log_format: ltsCceAccessAccessConfigMultiLogFormatToTerraform(struct!.multiLogFormat),
    single_log_format: ltsCceAccessAccessConfigSingleLogFormatToTerraform(struct!.singleLogFormat),
    windows_log_info: ltsCceAccessAccessConfigWindowsLogInfoToTerraform(struct!.windowsLogInfo),
  }
}


export function ltsCceAccessAccessConfigToHclTerraform(struct?: LtsCceAccessAccessConfigOutputReference | LtsCceAccessAccessConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    black_paths: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.blackPaths),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    container_name_regex: {
      value: cdktf.stringToHclTerraform(struct!.containerNameRegex),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    exclude_envs: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.excludeEnvs),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    exclude_k8s_labels: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.excludeK8SLabels),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    exclude_labels: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.excludeLabels),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    include_envs: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.includeEnvs),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    include_k8s_labels: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.includeK8SLabels),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    include_labels: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.includeLabels),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    log_envs: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.logEnvs),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    log_k8s: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.logK8S),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    log_labels: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.logLabels),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    name_space_regex: {
      value: cdktf.stringToHclTerraform(struct!.nameSpaceRegex),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    path_type: {
      value: cdktf.stringToHclTerraform(struct!.pathType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    paths: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.paths),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    pod_name_regex: {
      value: cdktf.stringToHclTerraform(struct!.podNameRegex),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    stderr: {
      value: cdktf.booleanToHclTerraform(struct!.stderr),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    stdout: {
      value: cdktf.booleanToHclTerraform(struct!.stdout),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    multi_log_format: {
      value: ltsCceAccessAccessConfigMultiLogFormatToHclTerraform(struct!.multiLogFormat),
      isBlock: true,
      type: "list",
      storageClassType: "LtsCceAccessAccessConfigMultiLogFormatList",
    },
    single_log_format: {
      value: ltsCceAccessAccessConfigSingleLogFormatToHclTerraform(struct!.singleLogFormat),
      isBlock: true,
      type: "list",
      storageClassType: "LtsCceAccessAccessConfigSingleLogFormatList",
    },
    windows_log_info: {
      value: ltsCceAccessAccessConfigWindowsLogInfoToHclTerraform(struct!.windowsLogInfo),
      isBlock: true,
      type: "list",
      storageClassType: "LtsCceAccessAccessConfigWindowsLogInfoList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsCceAccessAccessConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsCceAccessAccessConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._blackPaths !== undefined) {
      hasAnyValues = true;
      internalValueResult.blackPaths = this._blackPaths;
    }
    if (this._containerNameRegex !== undefined) {
      hasAnyValues = true;
      internalValueResult.containerNameRegex = this._containerNameRegex;
    }
    if (this._excludeEnvs !== undefined) {
      hasAnyValues = true;
      internalValueResult.excludeEnvs = this._excludeEnvs;
    }
    if (this._excludeK8SLabels !== undefined) {
      hasAnyValues = true;
      internalValueResult.excludeK8SLabels = this._excludeK8SLabels;
    }
    if (this._excludeLabels !== undefined) {
      hasAnyValues = true;
      internalValueResult.excludeLabels = this._excludeLabels;
    }
    if (this._includeEnvs !== undefined) {
      hasAnyValues = true;
      internalValueResult.includeEnvs = this._includeEnvs;
    }
    if (this._includeK8SLabels !== undefined) {
      hasAnyValues = true;
      internalValueResult.includeK8SLabels = this._includeK8SLabels;
    }
    if (this._includeLabels !== undefined) {
      hasAnyValues = true;
      internalValueResult.includeLabels = this._includeLabels;
    }
    if (this._logEnvs !== undefined) {
      hasAnyValues = true;
      internalValueResult.logEnvs = this._logEnvs;
    }
    if (this._logK8S !== undefined) {
      hasAnyValues = true;
      internalValueResult.logK8S = this._logK8S;
    }
    if (this._logLabels !== undefined) {
      hasAnyValues = true;
      internalValueResult.logLabels = this._logLabels;
    }
    if (this._nameSpaceRegex !== undefined) {
      hasAnyValues = true;
      internalValueResult.nameSpaceRegex = this._nameSpaceRegex;
    }
    if (this._pathType !== undefined) {
      hasAnyValues = true;
      internalValueResult.pathType = this._pathType;
    }
    if (this._paths !== undefined) {
      hasAnyValues = true;
      internalValueResult.paths = this._paths;
    }
    if (this._podNameRegex !== undefined) {
      hasAnyValues = true;
      internalValueResult.podNameRegex = this._podNameRegex;
    }
    if (this._stderr !== undefined) {
      hasAnyValues = true;
      internalValueResult.stderr = this._stderr;
    }
    if (this._stdout !== undefined) {
      hasAnyValues = true;
      internalValueResult.stdout = this._stdout;
    }
    if (this._multiLogFormat?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.multiLogFormat = this._multiLogFormat?.internalValue;
    }
    if (this._singleLogFormat?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.singleLogFormat = this._singleLogFormat?.internalValue;
    }
    if (this._windowsLogInfo?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.windowsLogInfo = this._windowsLogInfo?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LtsCceAccessAccessConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._blackPaths = undefined;
      this._containerNameRegex = undefined;
      this._excludeEnvs = undefined;
      this._excludeK8SLabels = undefined;
      this._excludeLabels = undefined;
      this._includeEnvs = undefined;
      this._includeK8SLabels = undefined;
      this._includeLabels = undefined;
      this._logEnvs = undefined;
      this._logK8S = undefined;
      this._logLabels = undefined;
      this._nameSpaceRegex = undefined;
      this._pathType = undefined;
      this._paths = undefined;
      this._podNameRegex = undefined;
      this._stderr = undefined;
      this._stdout = undefined;
      this._multiLogFormat.internalValue = undefined;
      this._singleLogFormat.internalValue = undefined;
      this._windowsLogInfo.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._blackPaths = value.blackPaths;
      this._containerNameRegex = value.containerNameRegex;
      this._excludeEnvs = value.excludeEnvs;
      this._excludeK8SLabels = value.excludeK8SLabels;
      this._excludeLabels = value.excludeLabels;
      this._includeEnvs = value.includeEnvs;
      this._includeK8SLabels = value.includeK8SLabels;
      this._includeLabels = value.includeLabels;
      this._logEnvs = value.logEnvs;
      this._logK8S = value.logK8S;
      this._logLabels = value.logLabels;
      this._nameSpaceRegex = value.nameSpaceRegex;
      this._pathType = value.pathType;
      this._paths = value.paths;
      this._podNameRegex = value.podNameRegex;
      this._stderr = value.stderr;
      this._stdout = value.stdout;
      this._multiLogFormat.internalValue = value.multiLogFormat;
      this._singleLogFormat.internalValue = value.singleLogFormat;
      this._windowsLogInfo.internalValue = value.windowsLogInfo;
    }
  }

  // black_paths - computed: false, optional: true, required: false
  private _blackPaths?: string[]; 
  public get blackPaths() {
    return this.getListAttribute('black_paths');
  }
  public set blackPaths(value: string[]) {
    this._blackPaths = value;
  }
  public resetBlackPaths() {
    this._blackPaths = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get blackPathsInput() {
    return this._blackPaths;
  }

  // container_name_regex - computed: false, optional: true, required: false
  private _containerNameRegex?: string; 
  public get containerNameRegex() {
    return this.getStringAttribute('container_name_regex');
  }
  public set containerNameRegex(value: string) {
    this._containerNameRegex = value;
  }
  public resetContainerNameRegex() {
    this._containerNameRegex = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get containerNameRegexInput() {
    return this._containerNameRegex;
  }

  // exclude_envs - computed: false, optional: true, required: false
  private _excludeEnvs?: { [key: string]: string }; 
  public get excludeEnvs() {
    return this.getStringMapAttribute('exclude_envs');
  }
  public set excludeEnvs(value: { [key: string]: string }) {
    this._excludeEnvs = value;
  }
  public resetExcludeEnvs() {
    this._excludeEnvs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get excludeEnvsInput() {
    return this._excludeEnvs;
  }

  // exclude_k8s_labels - computed: false, optional: true, required: false
  private _excludeK8SLabels?: { [key: string]: string }; 
  public get excludeK8SLabels() {
    return this.getStringMapAttribute('exclude_k8s_labels');
  }
  public set excludeK8SLabels(value: { [key: string]: string }) {
    this._excludeK8SLabels = value;
  }
  public resetExcludeK8SLabels() {
    this._excludeK8SLabels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get excludeK8SLabelsInput() {
    return this._excludeK8SLabels;
  }

  // exclude_labels - computed: false, optional: true, required: false
  private _excludeLabels?: { [key: string]: string }; 
  public get excludeLabels() {
    return this.getStringMapAttribute('exclude_labels');
  }
  public set excludeLabels(value: { [key: string]: string }) {
    this._excludeLabels = value;
  }
  public resetExcludeLabels() {
    this._excludeLabels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get excludeLabelsInput() {
    return this._excludeLabels;
  }

  // include_envs - computed: false, optional: true, required: false
  private _includeEnvs?: { [key: string]: string }; 
  public get includeEnvs() {
    return this.getStringMapAttribute('include_envs');
  }
  public set includeEnvs(value: { [key: string]: string }) {
    this._includeEnvs = value;
  }
  public resetIncludeEnvs() {
    this._includeEnvs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get includeEnvsInput() {
    return this._includeEnvs;
  }

  // include_k8s_labels - computed: false, optional: true, required: false
  private _includeK8SLabels?: { [key: string]: string }; 
  public get includeK8SLabels() {
    return this.getStringMapAttribute('include_k8s_labels');
  }
  public set includeK8SLabels(value: { [key: string]: string }) {
    this._includeK8SLabels = value;
  }
  public resetIncludeK8SLabels() {
    this._includeK8SLabels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get includeK8SLabelsInput() {
    return this._includeK8SLabels;
  }

  // include_labels - computed: false, optional: true, required: false
  private _includeLabels?: { [key: string]: string }; 
  public get includeLabels() {
    return this.getStringMapAttribute('include_labels');
  }
  public set includeLabels(value: { [key: string]: string }) {
    this._includeLabels = value;
  }
  public resetIncludeLabels() {
    this._includeLabels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get includeLabelsInput() {
    return this._includeLabels;
  }

  // log_envs - computed: false, optional: true, required: false
  private _logEnvs?: { [key: string]: string }; 
  public get logEnvs() {
    return this.getStringMapAttribute('log_envs');
  }
  public set logEnvs(value: { [key: string]: string }) {
    this._logEnvs = value;
  }
  public resetLogEnvs() {
    this._logEnvs = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logEnvsInput() {
    return this._logEnvs;
  }

  // log_k8s - computed: false, optional: true, required: false
  private _logK8S?: { [key: string]: string }; 
  public get logK8S() {
    return this.getStringMapAttribute('log_k8s');
  }
  public set logK8S(value: { [key: string]: string }) {
    this._logK8S = value;
  }
  public resetLogK8S() {
    this._logK8S = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logK8SInput() {
    return this._logK8S;
  }

  // log_labels - computed: false, optional: true, required: false
  private _logLabels?: { [key: string]: string }; 
  public get logLabels() {
    return this.getStringMapAttribute('log_labels');
  }
  public set logLabels(value: { [key: string]: string }) {
    this._logLabels = value;
  }
  public resetLogLabels() {
    this._logLabels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logLabelsInput() {
    return this._logLabels;
  }

  // name_space_regex - computed: false, optional: true, required: false
  private _nameSpaceRegex?: string; 
  public get nameSpaceRegex() {
    return this.getStringAttribute('name_space_regex');
  }
  public set nameSpaceRegex(value: string) {
    this._nameSpaceRegex = value;
  }
  public resetNameSpaceRegex() {
    this._nameSpaceRegex = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameSpaceRegexInput() {
    return this._nameSpaceRegex;
  }

  // path_type - computed: false, optional: false, required: true
  private _pathType?: string; 
  public get pathType() {
    return this.getStringAttribute('path_type');
  }
  public set pathType(value: string) {
    this._pathType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pathTypeInput() {
    return this._pathType;
  }

  // paths - computed: false, optional: true, required: false
  private _paths?: string[]; 
  public get paths() {
    return this.getListAttribute('paths');
  }
  public set paths(value: string[]) {
    this._paths = value;
  }
  public resetPaths() {
    this._paths = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pathsInput() {
    return this._paths;
  }

  // pod_name_regex - computed: false, optional: true, required: false
  private _podNameRegex?: string; 
  public get podNameRegex() {
    return this.getStringAttribute('pod_name_regex');
  }
  public set podNameRegex(value: string) {
    this._podNameRegex = value;
  }
  public resetPodNameRegex() {
    this._podNameRegex = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get podNameRegexInput() {
    return this._podNameRegex;
  }

  // stderr - computed: true, optional: true, required: false
  private _stderr?: boolean | cdktf.IResolvable; 
  public get stderr() {
    return this.getBooleanAttribute('stderr');
  }
  public set stderr(value: boolean | cdktf.IResolvable) {
    this._stderr = value;
  }
  public resetStderr() {
    this._stderr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get stderrInput() {
    return this._stderr;
  }

  // stdout - computed: true, optional: true, required: false
  private _stdout?: boolean | cdktf.IResolvable; 
  public get stdout() {
    return this.getBooleanAttribute('stdout');
  }
  public set stdout(value: boolean | cdktf.IResolvable) {
    this._stdout = value;
  }
  public resetStdout() {
    this._stdout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get stdoutInput() {
    return this._stdout;
  }

  // multi_log_format - computed: false, optional: true, required: false
  private _multiLogFormat = new LtsCceAccessAccessConfigMultiLogFormatOutputReference(this, "multi_log_format");
  public get multiLogFormat() {
    return this._multiLogFormat;
  }
  public putMultiLogFormat(value: LtsCceAccessAccessConfigMultiLogFormat) {
    this._multiLogFormat.internalValue = value;
  }
  public resetMultiLogFormat() {
    this._multiLogFormat.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get multiLogFormatInput() {
    return this._multiLogFormat.internalValue;
  }

  // single_log_format - computed: false, optional: true, required: false
  private _singleLogFormat = new LtsCceAccessAccessConfigSingleLogFormatOutputReference(this, "single_log_format");
  public get singleLogFormat() {
    return this._singleLogFormat;
  }
  public putSingleLogFormat(value: LtsCceAccessAccessConfigSingleLogFormat) {
    this._singleLogFormat.internalValue = value;
  }
  public resetSingleLogFormat() {
    this._singleLogFormat.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get singleLogFormatInput() {
    return this._singleLogFormat.internalValue;
  }

  // windows_log_info - computed: false, optional: true, required: false
  private _windowsLogInfo = new LtsCceAccessAccessConfigWindowsLogInfoOutputReference(this, "windows_log_info");
  public get windowsLogInfo() {
    return this._windowsLogInfo;
  }
  public putWindowsLogInfo(value: LtsCceAccessAccessConfigWindowsLogInfo) {
    this._windowsLogInfo.internalValue = value;
  }
  public resetWindowsLogInfo() {
    this._windowsLogInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get windowsLogInfoInput() {
    return this._windowsLogInfo.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access huaweicloud_lts_cce_access}
*/
export class LtsCceAccess extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_cce_access";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsCceAccess resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsCceAccess to import
  * @param importFromId The id of the existing LtsCceAccess that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsCceAccess to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_cce_access", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_cce_access huaweicloud_lts_cce_access} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsCceAccessConfig
  */
  public constructor(scope: Construct, id: string, config: LtsCceAccessConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_cce_access',
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
    this._binaryCollect = config.binaryCollect;
    this._clusterId = config.clusterId;
    this._hostGroupIds = config.hostGroupIds;
    this._id = config.id;
    this._logGroupId = config.logGroupId;
    this._logSplit = config.logSplit;
    this._logStreamId = config.logStreamId;
    this._name = config.name;
    this._region = config.region;
    this._tags = config.tags;
    this._accessConfig.internalValue = config.accessConfig;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_type - computed: true, optional: false, required: false
  public get accessType() {
    return this.getStringAttribute('access_type');
  }

  // binary_collect - computed: true, optional: true, required: false
  private _binaryCollect?: boolean | cdktf.IResolvable; 
  public get binaryCollect() {
    return this.getBooleanAttribute('binary_collect');
  }
  public set binaryCollect(value: boolean | cdktf.IResolvable) {
    this._binaryCollect = value;
  }
  public resetBinaryCollect() {
    this._binaryCollect = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get binaryCollectInput() {
    return this._binaryCollect;
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

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // host_group_ids - computed: true, optional: true, required: false
  private _hostGroupIds?: string[]; 
  public get hostGroupIds() {
    return this.getListAttribute('host_group_ids');
  }
  public set hostGroupIds(value: string[]) {
    this._hostGroupIds = value;
  }
  public resetHostGroupIds() {
    this._hostGroupIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostGroupIdsInput() {
    return this._hostGroupIds;
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

  // log_group_name - computed: true, optional: false, required: false
  public get logGroupName() {
    return this.getStringAttribute('log_group_name');
  }

  // log_split - computed: true, optional: true, required: false
  private _logSplit?: boolean | cdktf.IResolvable; 
  public get logSplit() {
    return this.getBooleanAttribute('log_split');
  }
  public set logSplit(value: boolean | cdktf.IResolvable) {
    this._logSplit = value;
  }
  public resetLogSplit() {
    this._logSplit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logSplitInput() {
    return this._logSplit;
  }

  // log_stream_id - computed: false, optional: false, required: true
  private _logStreamId?: string; 
  public get logStreamId() {
    return this.getStringAttribute('log_stream_id');
  }
  public set logStreamId(value: string) {
    this._logStreamId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamIdInput() {
    return this._logStreamId;
  }

  // log_stream_name - computed: true, optional: false, required: false
  public get logStreamName() {
    return this.getStringAttribute('log_stream_name');
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

  // access_config - computed: false, optional: false, required: true
  private _accessConfig = new LtsCceAccessAccessConfigOutputReference(this, "access_config");
  public get accessConfig() {
    return this._accessConfig;
  }
  public putAccessConfig(value: LtsCceAccessAccessConfig) {
    this._accessConfig.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get accessConfigInput() {
    return this._accessConfig.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      binary_collect: cdktf.booleanToTerraform(this._binaryCollect),
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      host_group_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._hostGroupIds),
      id: cdktf.stringToTerraform(this._id),
      log_group_id: cdktf.stringToTerraform(this._logGroupId),
      log_split: cdktf.booleanToTerraform(this._logSplit),
      log_stream_id: cdktf.stringToTerraform(this._logStreamId),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      access_config: ltsCceAccessAccessConfigToTerraform(this._accessConfig.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      binary_collect: {
        value: cdktf.booleanToHclTerraform(this._binaryCollect),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      host_group_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._hostGroupIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_group_id: {
        value: cdktf.stringToHclTerraform(this._logGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_split: {
        value: cdktf.booleanToHclTerraform(this._logSplit),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      log_stream_id: {
        value: cdktf.stringToHclTerraform(this._logStreamId),
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
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      access_config: {
        value: ltsCceAccessAccessConfigToHclTerraform(this._accessConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsCceAccessAccessConfigList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

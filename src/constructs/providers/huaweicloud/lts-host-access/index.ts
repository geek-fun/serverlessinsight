// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsHostAccessConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#host_group_ids LtsHostAccess#host_group_ids}
  */
  readonly hostGroupIds?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#id LtsHostAccess#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#log_group_id LtsHostAccess#log_group_id}
  */
  readonly logGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#log_stream_id LtsHostAccess#log_stream_id}
  */
  readonly logStreamId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#name LtsHostAccess#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#region LtsHostAccess#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#tags LtsHostAccess#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * access_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#access_config LtsHostAccess#access_config}
  */
  readonly accessConfig: LtsHostAccessAccessConfig;
}
export interface LtsHostAccessAccessConfigMultiLogFormat {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#mode LtsHostAccess#mode}
  */
  readonly mode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#value LtsHostAccess#value}
  */
  readonly value: string;
}

export function ltsHostAccessAccessConfigMultiLogFormatToTerraform(struct?: LtsHostAccessAccessConfigMultiLogFormatOutputReference | LtsHostAccessAccessConfigMultiLogFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    mode: cdktf.stringToTerraform(struct!.mode),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function ltsHostAccessAccessConfigMultiLogFormatToHclTerraform(struct?: LtsHostAccessAccessConfigMultiLogFormatOutputReference | LtsHostAccessAccessConfigMultiLogFormat): any {
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

export class LtsHostAccessAccessConfigMultiLogFormatOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsHostAccessAccessConfigMultiLogFormat | undefined {
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

  public set internalValue(value: LtsHostAccessAccessConfigMultiLogFormat | undefined) {
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
export interface LtsHostAccessAccessConfigSingleLogFormat {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#mode LtsHostAccess#mode}
  */
  readonly mode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#value LtsHostAccess#value}
  */
  readonly value?: string;
}

export function ltsHostAccessAccessConfigSingleLogFormatToTerraform(struct?: LtsHostAccessAccessConfigSingleLogFormatOutputReference | LtsHostAccessAccessConfigSingleLogFormat): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    mode: cdktf.stringToTerraform(struct!.mode),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function ltsHostAccessAccessConfigSingleLogFormatToHclTerraform(struct?: LtsHostAccessAccessConfigSingleLogFormatOutputReference | LtsHostAccessAccessConfigSingleLogFormat): any {
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

export class LtsHostAccessAccessConfigSingleLogFormatOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsHostAccessAccessConfigSingleLogFormat | undefined {
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

  public set internalValue(value: LtsHostAccessAccessConfigSingleLogFormat | undefined) {
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
export interface LtsHostAccessAccessConfigWindowsLogInfo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#categorys LtsHostAccess#categorys}
  */
  readonly categorys: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#event_level LtsHostAccess#event_level}
  */
  readonly eventLevel: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#time_offset LtsHostAccess#time_offset}
  */
  readonly timeOffset: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#time_offset_unit LtsHostAccess#time_offset_unit}
  */
  readonly timeOffsetUnit: string;
}

export function ltsHostAccessAccessConfigWindowsLogInfoToTerraform(struct?: LtsHostAccessAccessConfigWindowsLogInfoOutputReference | LtsHostAccessAccessConfigWindowsLogInfo): any {
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


export function ltsHostAccessAccessConfigWindowsLogInfoToHclTerraform(struct?: LtsHostAccessAccessConfigWindowsLogInfoOutputReference | LtsHostAccessAccessConfigWindowsLogInfo): any {
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

export class LtsHostAccessAccessConfigWindowsLogInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsHostAccessAccessConfigWindowsLogInfo | undefined {
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

  public set internalValue(value: LtsHostAccessAccessConfigWindowsLogInfo | undefined) {
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
export interface LtsHostAccessAccessConfig {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#black_paths LtsHostAccess#black_paths}
  */
  readonly blackPaths?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#paths LtsHostAccess#paths}
  */
  readonly paths: string[];
  /**
  * multi_log_format block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#multi_log_format LtsHostAccess#multi_log_format}
  */
  readonly multiLogFormat?: LtsHostAccessAccessConfigMultiLogFormat;
  /**
  * single_log_format block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#single_log_format LtsHostAccess#single_log_format}
  */
  readonly singleLogFormat?: LtsHostAccessAccessConfigSingleLogFormat;
  /**
  * windows_log_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#windows_log_info LtsHostAccess#windows_log_info}
  */
  readonly windowsLogInfo?: LtsHostAccessAccessConfigWindowsLogInfo;
}

export function ltsHostAccessAccessConfigToTerraform(struct?: LtsHostAccessAccessConfigOutputReference | LtsHostAccessAccessConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    black_paths: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.blackPaths),
    paths: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.paths),
    multi_log_format: ltsHostAccessAccessConfigMultiLogFormatToTerraform(struct!.multiLogFormat),
    single_log_format: ltsHostAccessAccessConfigSingleLogFormatToTerraform(struct!.singleLogFormat),
    windows_log_info: ltsHostAccessAccessConfigWindowsLogInfoToTerraform(struct!.windowsLogInfo),
  }
}


export function ltsHostAccessAccessConfigToHclTerraform(struct?: LtsHostAccessAccessConfigOutputReference | LtsHostAccessAccessConfig): any {
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
    paths: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.paths),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    multi_log_format: {
      value: ltsHostAccessAccessConfigMultiLogFormatToHclTerraform(struct!.multiLogFormat),
      isBlock: true,
      type: "list",
      storageClassType: "LtsHostAccessAccessConfigMultiLogFormatList",
    },
    single_log_format: {
      value: ltsHostAccessAccessConfigSingleLogFormatToHclTerraform(struct!.singleLogFormat),
      isBlock: true,
      type: "list",
      storageClassType: "LtsHostAccessAccessConfigSingleLogFormatList",
    },
    windows_log_info: {
      value: ltsHostAccessAccessConfigWindowsLogInfoToHclTerraform(struct!.windowsLogInfo),
      isBlock: true,
      type: "list",
      storageClassType: "LtsHostAccessAccessConfigWindowsLogInfoList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LtsHostAccessAccessConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LtsHostAccessAccessConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._blackPaths !== undefined) {
      hasAnyValues = true;
      internalValueResult.blackPaths = this._blackPaths;
    }
    if (this._paths !== undefined) {
      hasAnyValues = true;
      internalValueResult.paths = this._paths;
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

  public set internalValue(value: LtsHostAccessAccessConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._blackPaths = undefined;
      this._paths = undefined;
      this._multiLogFormat.internalValue = undefined;
      this._singleLogFormat.internalValue = undefined;
      this._windowsLogInfo.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._blackPaths = value.blackPaths;
      this._paths = value.paths;
      this._multiLogFormat.internalValue = value.multiLogFormat;
      this._singleLogFormat.internalValue = value.singleLogFormat;
      this._windowsLogInfo.internalValue = value.windowsLogInfo;
    }
  }

  // black_paths - computed: true, optional: true, required: false
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

  // paths - computed: false, optional: false, required: true
  private _paths?: string[]; 
  public get paths() {
    return this.getListAttribute('paths');
  }
  public set paths(value: string[]) {
    this._paths = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pathsInput() {
    return this._paths;
  }

  // multi_log_format - computed: false, optional: true, required: false
  private _multiLogFormat = new LtsHostAccessAccessConfigMultiLogFormatOutputReference(this, "multi_log_format");
  public get multiLogFormat() {
    return this._multiLogFormat;
  }
  public putMultiLogFormat(value: LtsHostAccessAccessConfigMultiLogFormat) {
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
  private _singleLogFormat = new LtsHostAccessAccessConfigSingleLogFormatOutputReference(this, "single_log_format");
  public get singleLogFormat() {
    return this._singleLogFormat;
  }
  public putSingleLogFormat(value: LtsHostAccessAccessConfigSingleLogFormat) {
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
  private _windowsLogInfo = new LtsHostAccessAccessConfigWindowsLogInfoOutputReference(this, "windows_log_info");
  public get windowsLogInfo() {
    return this._windowsLogInfo;
  }
  public putWindowsLogInfo(value: LtsHostAccessAccessConfigWindowsLogInfo) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access huaweicloud_lts_host_access}
*/
export class LtsHostAccess extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_host_access";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsHostAccess resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsHostAccess to import
  * @param importFromId The id of the existing LtsHostAccess that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsHostAccess to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_host_access", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_host_access huaweicloud_lts_host_access} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsHostAccessConfig
  */
  public constructor(scope: Construct, id: string, config: LtsHostAccessConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_host_access',
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
    this._hostGroupIds = config.hostGroupIds;
    this._id = config.id;
    this._logGroupId = config.logGroupId;
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
  private _accessConfig = new LtsHostAccessAccessConfigOutputReference(this, "access_config");
  public get accessConfig() {
    return this._accessConfig;
  }
  public putAccessConfig(value: LtsHostAccessAccessConfig) {
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
      host_group_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._hostGroupIds),
      id: cdktf.stringToTerraform(this._id),
      log_group_id: cdktf.stringToTerraform(this._logGroupId),
      log_stream_id: cdktf.stringToTerraform(this._logStreamId),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      access_config: ltsHostAccessAccessConfigToTerraform(this._accessConfig.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
        value: ltsHostAccessAccessConfigToHclTerraform(this._accessConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LtsHostAccessAccessConfigList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

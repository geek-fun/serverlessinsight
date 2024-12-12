// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LiveRecordingConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#app_name LiveRecording#app_name}
  */
  readonly appName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#domain_name LiveRecording#domain_name}
  */
  readonly domainName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#id LiveRecording#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#region LiveRecording#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#stream_name LiveRecording#stream_name}
  */
  readonly streamName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#type LiveRecording#type}
  */
  readonly type?: string;
  /**
  * flv block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#flv LiveRecording#flv}
  */
  readonly flv?: LiveRecordingFlv;
  /**
  * hls block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#hls LiveRecording#hls}
  */
  readonly hls?: LiveRecordingHls;
  /**
  * mp4 block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#mp4 LiveRecording#mp4}
  */
  readonly mp4?: LiveRecordingMp4;
  /**
  * obs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#obs LiveRecording#obs}
  */
  readonly obs: LiveRecordingObs;
}
export interface LiveRecordingFlv {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#file_naming LiveRecording#file_naming}
  */
  readonly fileNaming?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#max_stream_pause_length LiveRecording#max_stream_pause_length}
  */
  readonly maxStreamPauseLength?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#recording_length LiveRecording#recording_length}
  */
  readonly recordingLength: number;
}

export function liveRecordingFlvToTerraform(struct?: LiveRecordingFlvOutputReference | LiveRecordingFlv): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    file_naming: cdktf.stringToTerraform(struct!.fileNaming),
    max_stream_pause_length: cdktf.numberToTerraform(struct!.maxStreamPauseLength),
    recording_length: cdktf.numberToTerraform(struct!.recordingLength),
  }
}


export function liveRecordingFlvToHclTerraform(struct?: LiveRecordingFlvOutputReference | LiveRecordingFlv): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    file_naming: {
      value: cdktf.stringToHclTerraform(struct!.fileNaming),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_stream_pause_length: {
      value: cdktf.numberToHclTerraform(struct!.maxStreamPauseLength),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    recording_length: {
      value: cdktf.numberToHclTerraform(struct!.recordingLength),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LiveRecordingFlvOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LiveRecordingFlv | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._fileNaming !== undefined) {
      hasAnyValues = true;
      internalValueResult.fileNaming = this._fileNaming;
    }
    if (this._maxStreamPauseLength !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxStreamPauseLength = this._maxStreamPauseLength;
    }
    if (this._recordingLength !== undefined) {
      hasAnyValues = true;
      internalValueResult.recordingLength = this._recordingLength;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LiveRecordingFlv | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._fileNaming = undefined;
      this._maxStreamPauseLength = undefined;
      this._recordingLength = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._fileNaming = value.fileNaming;
      this._maxStreamPauseLength = value.maxStreamPauseLength;
      this._recordingLength = value.recordingLength;
    }
  }

  // file_naming - computed: true, optional: true, required: false
  private _fileNaming?: string; 
  public get fileNaming() {
    return this.getStringAttribute('file_naming');
  }
  public set fileNaming(value: string) {
    this._fileNaming = value;
  }
  public resetFileNaming() {
    this._fileNaming = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fileNamingInput() {
    return this._fileNaming;
  }

  // max_stream_pause_length - computed: true, optional: true, required: false
  private _maxStreamPauseLength?: number; 
  public get maxStreamPauseLength() {
    return this.getNumberAttribute('max_stream_pause_length');
  }
  public set maxStreamPauseLength(value: number) {
    this._maxStreamPauseLength = value;
  }
  public resetMaxStreamPauseLength() {
    this._maxStreamPauseLength = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxStreamPauseLengthInput() {
    return this._maxStreamPauseLength;
  }

  // recording_length - computed: false, optional: false, required: true
  private _recordingLength?: number; 
  public get recordingLength() {
    return this.getNumberAttribute('recording_length');
  }
  public set recordingLength(value: number) {
    this._recordingLength = value;
  }
  // Temporarily expose input value. Use with caution.
  public get recordingLengthInput() {
    return this._recordingLength;
  }
}
export interface LiveRecordingHls {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#file_naming LiveRecording#file_naming}
  */
  readonly fileNaming?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#max_stream_pause_length LiveRecording#max_stream_pause_length}
  */
  readonly maxStreamPauseLength?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#recording_length LiveRecording#recording_length}
  */
  readonly recordingLength: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#ts_file_naming LiveRecording#ts_file_naming}
  */
  readonly tsFileNaming?: string;
}

export function liveRecordingHlsToTerraform(struct?: LiveRecordingHlsOutputReference | LiveRecordingHls): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    file_naming: cdktf.stringToTerraform(struct!.fileNaming),
    max_stream_pause_length: cdktf.numberToTerraform(struct!.maxStreamPauseLength),
    recording_length: cdktf.numberToTerraform(struct!.recordingLength),
    ts_file_naming: cdktf.stringToTerraform(struct!.tsFileNaming),
  }
}


export function liveRecordingHlsToHclTerraform(struct?: LiveRecordingHlsOutputReference | LiveRecordingHls): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    file_naming: {
      value: cdktf.stringToHclTerraform(struct!.fileNaming),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_stream_pause_length: {
      value: cdktf.numberToHclTerraform(struct!.maxStreamPauseLength),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    recording_length: {
      value: cdktf.numberToHclTerraform(struct!.recordingLength),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    ts_file_naming: {
      value: cdktf.stringToHclTerraform(struct!.tsFileNaming),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LiveRecordingHlsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LiveRecordingHls | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._fileNaming !== undefined) {
      hasAnyValues = true;
      internalValueResult.fileNaming = this._fileNaming;
    }
    if (this._maxStreamPauseLength !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxStreamPauseLength = this._maxStreamPauseLength;
    }
    if (this._recordingLength !== undefined) {
      hasAnyValues = true;
      internalValueResult.recordingLength = this._recordingLength;
    }
    if (this._tsFileNaming !== undefined) {
      hasAnyValues = true;
      internalValueResult.tsFileNaming = this._tsFileNaming;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LiveRecordingHls | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._fileNaming = undefined;
      this._maxStreamPauseLength = undefined;
      this._recordingLength = undefined;
      this._tsFileNaming = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._fileNaming = value.fileNaming;
      this._maxStreamPauseLength = value.maxStreamPauseLength;
      this._recordingLength = value.recordingLength;
      this._tsFileNaming = value.tsFileNaming;
    }
  }

  // file_naming - computed: true, optional: true, required: false
  private _fileNaming?: string; 
  public get fileNaming() {
    return this.getStringAttribute('file_naming');
  }
  public set fileNaming(value: string) {
    this._fileNaming = value;
  }
  public resetFileNaming() {
    this._fileNaming = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fileNamingInput() {
    return this._fileNaming;
  }

  // max_stream_pause_length - computed: true, optional: true, required: false
  private _maxStreamPauseLength?: number; 
  public get maxStreamPauseLength() {
    return this.getNumberAttribute('max_stream_pause_length');
  }
  public set maxStreamPauseLength(value: number) {
    this._maxStreamPauseLength = value;
  }
  public resetMaxStreamPauseLength() {
    this._maxStreamPauseLength = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxStreamPauseLengthInput() {
    return this._maxStreamPauseLength;
  }

  // recording_length - computed: false, optional: false, required: true
  private _recordingLength?: number; 
  public get recordingLength() {
    return this.getNumberAttribute('recording_length');
  }
  public set recordingLength(value: number) {
    this._recordingLength = value;
  }
  // Temporarily expose input value. Use with caution.
  public get recordingLengthInput() {
    return this._recordingLength;
  }

  // ts_file_naming - computed: true, optional: true, required: false
  private _tsFileNaming?: string; 
  public get tsFileNaming() {
    return this.getStringAttribute('ts_file_naming');
  }
  public set tsFileNaming(value: string) {
    this._tsFileNaming = value;
  }
  public resetTsFileNaming() {
    this._tsFileNaming = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tsFileNamingInput() {
    return this._tsFileNaming;
  }
}
export interface LiveRecordingMp4 {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#file_naming LiveRecording#file_naming}
  */
  readonly fileNaming?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#max_stream_pause_length LiveRecording#max_stream_pause_length}
  */
  readonly maxStreamPauseLength?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#recording_length LiveRecording#recording_length}
  */
  readonly recordingLength: number;
}

export function liveRecordingMp4ToTerraform(struct?: LiveRecordingMp4OutputReference | LiveRecordingMp4): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    file_naming: cdktf.stringToTerraform(struct!.fileNaming),
    max_stream_pause_length: cdktf.numberToTerraform(struct!.maxStreamPauseLength),
    recording_length: cdktf.numberToTerraform(struct!.recordingLength),
  }
}


export function liveRecordingMp4ToHclTerraform(struct?: LiveRecordingMp4OutputReference | LiveRecordingMp4): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    file_naming: {
      value: cdktf.stringToHclTerraform(struct!.fileNaming),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_stream_pause_length: {
      value: cdktf.numberToHclTerraform(struct!.maxStreamPauseLength),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    recording_length: {
      value: cdktf.numberToHclTerraform(struct!.recordingLength),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LiveRecordingMp4OutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LiveRecordingMp4 | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._fileNaming !== undefined) {
      hasAnyValues = true;
      internalValueResult.fileNaming = this._fileNaming;
    }
    if (this._maxStreamPauseLength !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxStreamPauseLength = this._maxStreamPauseLength;
    }
    if (this._recordingLength !== undefined) {
      hasAnyValues = true;
      internalValueResult.recordingLength = this._recordingLength;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LiveRecordingMp4 | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._fileNaming = undefined;
      this._maxStreamPauseLength = undefined;
      this._recordingLength = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._fileNaming = value.fileNaming;
      this._maxStreamPauseLength = value.maxStreamPauseLength;
      this._recordingLength = value.recordingLength;
    }
  }

  // file_naming - computed: true, optional: true, required: false
  private _fileNaming?: string; 
  public get fileNaming() {
    return this.getStringAttribute('file_naming');
  }
  public set fileNaming(value: string) {
    this._fileNaming = value;
  }
  public resetFileNaming() {
    this._fileNaming = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fileNamingInput() {
    return this._fileNaming;
  }

  // max_stream_pause_length - computed: true, optional: true, required: false
  private _maxStreamPauseLength?: number; 
  public get maxStreamPauseLength() {
    return this.getNumberAttribute('max_stream_pause_length');
  }
  public set maxStreamPauseLength(value: number) {
    this._maxStreamPauseLength = value;
  }
  public resetMaxStreamPauseLength() {
    this._maxStreamPauseLength = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxStreamPauseLengthInput() {
    return this._maxStreamPauseLength;
  }

  // recording_length - computed: false, optional: false, required: true
  private _recordingLength?: number; 
  public get recordingLength() {
    return this.getNumberAttribute('recording_length');
  }
  public set recordingLength(value: number) {
    this._recordingLength = value;
  }
  // Temporarily expose input value. Use with caution.
  public get recordingLengthInput() {
    return this._recordingLength;
  }
}
export interface LiveRecordingObs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#bucket LiveRecording#bucket}
  */
  readonly bucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#object LiveRecording#object}
  */
  readonly object?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#region LiveRecording#region}
  */
  readonly region: string;
}

export function liveRecordingObsToTerraform(struct?: LiveRecordingObsOutputReference | LiveRecordingObs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bucket: cdktf.stringToTerraform(struct!.bucket),
    object: cdktf.stringToTerraform(struct!.object),
    region: cdktf.stringToTerraform(struct!.region),
  }
}


export function liveRecordingObsToHclTerraform(struct?: LiveRecordingObsOutputReference | LiveRecordingObs): any {
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
    object: {
      value: cdktf.stringToHclTerraform(struct!.object),
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

export class LiveRecordingObsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LiveRecordingObs | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucket = this._bucket;
    }
    if (this._object !== undefined) {
      hasAnyValues = true;
      internalValueResult.object = this._object;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LiveRecordingObs | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bucket = undefined;
      this._object = undefined;
      this._region = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bucket = value.bucket;
      this._object = value.object;
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

  // object - computed: true, optional: true, required: false
  private _object?: string; 
  public get object() {
    return this.getStringAttribute('object');
  }
  public set object(value: string) {
    this._object = value;
  }
  public resetObject() {
    this._object = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get objectInput() {
    return this._object;
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

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording huaweicloud_live_recording}
*/
export class LiveRecording extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_live_recording";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LiveRecording resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LiveRecording to import
  * @param importFromId The id of the existing LiveRecording that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LiveRecording to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_live_recording", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_recording huaweicloud_live_recording} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LiveRecordingConfig
  */
  public constructor(scope: Construct, id: string, config: LiveRecordingConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_live_recording',
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
    this._appName = config.appName;
    this._domainName = config.domainName;
    this._id = config.id;
    this._region = config.region;
    this._streamName = config.streamName;
    this._type = config.type;
    this._flv.internalValue = config.flv;
    this._hls.internalValue = config.hls;
    this._mp4.internalValue = config.mp4;
    this._obs.internalValue = config.obs;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // app_name - computed: false, optional: false, required: true
  private _appName?: string; 
  public get appName() {
    return this.getStringAttribute('app_name');
  }
  public set appName(value: string) {
    this._appName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get appNameInput() {
    return this._appName;
  }

  // domain_name - computed: false, optional: false, required: true
  private _domainName?: string; 
  public get domainName() {
    return this.getStringAttribute('domain_name');
  }
  public set domainName(value: string) {
    this._domainName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainNameInput() {
    return this._domainName;
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

  // flv - computed: false, optional: true, required: false
  private _flv = new LiveRecordingFlvOutputReference(this, "flv");
  public get flv() {
    return this._flv;
  }
  public putFlv(value: LiveRecordingFlv) {
    this._flv.internalValue = value;
  }
  public resetFlv() {
    this._flv.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get flvInput() {
    return this._flv.internalValue;
  }

  // hls - computed: false, optional: true, required: false
  private _hls = new LiveRecordingHlsOutputReference(this, "hls");
  public get hls() {
    return this._hls;
  }
  public putHls(value: LiveRecordingHls) {
    this._hls.internalValue = value;
  }
  public resetHls() {
    this._hls.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hlsInput() {
    return this._hls.internalValue;
  }

  // mp4 - computed: false, optional: true, required: false
  private _mp4 = new LiveRecordingMp4OutputReference(this, "mp4");
  public get mp4() {
    return this._mp4;
  }
  public putMp4(value: LiveRecordingMp4) {
    this._mp4.internalValue = value;
  }
  public resetMp4() {
    this._mp4.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mp4Input() {
    return this._mp4.internalValue;
  }

  // obs - computed: false, optional: false, required: true
  private _obs = new LiveRecordingObsOutputReference(this, "obs");
  public get obs() {
    return this._obs;
  }
  public putObs(value: LiveRecordingObs) {
    this._obs.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get obsInput() {
    return this._obs.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      app_name: cdktf.stringToTerraform(this._appName),
      domain_name: cdktf.stringToTerraform(this._domainName),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      stream_name: cdktf.stringToTerraform(this._streamName),
      type: cdktf.stringToTerraform(this._type),
      flv: liveRecordingFlvToTerraform(this._flv.internalValue),
      hls: liveRecordingHlsToTerraform(this._hls.internalValue),
      mp4: liveRecordingMp4ToTerraform(this._mp4.internalValue),
      obs: liveRecordingObsToTerraform(this._obs.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      app_name: {
        value: cdktf.stringToHclTerraform(this._appName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      domain_name: {
        value: cdktf.stringToHclTerraform(this._domainName),
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
      stream_name: {
        value: cdktf.stringToHclTerraform(this._streamName),
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
      flv: {
        value: liveRecordingFlvToHclTerraform(this._flv.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LiveRecordingFlvList",
      },
      hls: {
        value: liveRecordingHlsToHclTerraform(this._hls.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LiveRecordingHlsList",
      },
      mp4: {
        value: liveRecordingMp4ToHclTerraform(this._mp4.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LiveRecordingMp4List",
      },
      obs: {
        value: liveRecordingObsToHclTerraform(this._obs.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LiveRecordingObsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

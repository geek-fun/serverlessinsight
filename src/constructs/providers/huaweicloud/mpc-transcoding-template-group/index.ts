// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MpcTranscodingTemplateGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#dash_segment_duration MpcTranscodingTemplateGroup#dash_segment_duration}
  */
  readonly dashSegmentDuration?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#hls_segment_duration MpcTranscodingTemplateGroup#hls_segment_duration}
  */
  readonly hlsSegmentDuration?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#id MpcTranscodingTemplateGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#low_bitrate_hd MpcTranscodingTemplateGroup#low_bitrate_hd}
  */
  readonly lowBitrateHd?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#name MpcTranscodingTemplateGroup#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#output_format MpcTranscodingTemplateGroup#output_format}
  */
  readonly outputFormat: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#region MpcTranscodingTemplateGroup#region}
  */
  readonly region?: string;
  /**
  * audio block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#audio MpcTranscodingTemplateGroup#audio}
  */
  readonly audio?: MpcTranscodingTemplateGroupAudio;
  /**
  * video_common block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#video_common MpcTranscodingTemplateGroup#video_common}
  */
  readonly videoCommon?: MpcTranscodingTemplateGroupVideoCommon;
  /**
  * videos block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#videos MpcTranscodingTemplateGroup#videos}
  */
  readonly videos?: MpcTranscodingTemplateGroupVideos[] | cdktf.IResolvable;
}
export interface MpcTranscodingTemplateGroupAudio {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#bitrate MpcTranscodingTemplateGroup#bitrate}
  */
  readonly bitrate?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#channels MpcTranscodingTemplateGroup#channels}
  */
  readonly channels: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#codec MpcTranscodingTemplateGroup#codec}
  */
  readonly codec: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#output_policy MpcTranscodingTemplateGroup#output_policy}
  */
  readonly outputPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#sample_rate MpcTranscodingTemplateGroup#sample_rate}
  */
  readonly sampleRate: number;
}

export function mpcTranscodingTemplateGroupAudioToTerraform(struct?: MpcTranscodingTemplateGroupAudioOutputReference | MpcTranscodingTemplateGroupAudio): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bitrate: cdktf.numberToTerraform(struct!.bitrate),
    channels: cdktf.numberToTerraform(struct!.channels),
    codec: cdktf.numberToTerraform(struct!.codec),
    output_policy: cdktf.stringToTerraform(struct!.outputPolicy),
    sample_rate: cdktf.numberToTerraform(struct!.sampleRate),
  }
}


export function mpcTranscodingTemplateGroupAudioToHclTerraform(struct?: MpcTranscodingTemplateGroupAudioOutputReference | MpcTranscodingTemplateGroupAudio): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bitrate: {
      value: cdktf.numberToHclTerraform(struct!.bitrate),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    channels: {
      value: cdktf.numberToHclTerraform(struct!.channels),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    codec: {
      value: cdktf.numberToHclTerraform(struct!.codec),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    output_policy: {
      value: cdktf.stringToHclTerraform(struct!.outputPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sample_rate: {
      value: cdktf.numberToHclTerraform(struct!.sampleRate),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MpcTranscodingTemplateGroupAudioOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MpcTranscodingTemplateGroupAudio | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bitrate !== undefined) {
      hasAnyValues = true;
      internalValueResult.bitrate = this._bitrate;
    }
    if (this._channels !== undefined) {
      hasAnyValues = true;
      internalValueResult.channels = this._channels;
    }
    if (this._codec !== undefined) {
      hasAnyValues = true;
      internalValueResult.codec = this._codec;
    }
    if (this._outputPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.outputPolicy = this._outputPolicy;
    }
    if (this._sampleRate !== undefined) {
      hasAnyValues = true;
      internalValueResult.sampleRate = this._sampleRate;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MpcTranscodingTemplateGroupAudio | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bitrate = undefined;
      this._channels = undefined;
      this._codec = undefined;
      this._outputPolicy = undefined;
      this._sampleRate = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bitrate = value.bitrate;
      this._channels = value.channels;
      this._codec = value.codec;
      this._outputPolicy = value.outputPolicy;
      this._sampleRate = value.sampleRate;
    }
  }

  // bitrate - computed: false, optional: true, required: false
  private _bitrate?: number; 
  public get bitrate() {
    return this.getNumberAttribute('bitrate');
  }
  public set bitrate(value: number) {
    this._bitrate = value;
  }
  public resetBitrate() {
    this._bitrate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bitrateInput() {
    return this._bitrate;
  }

  // channels - computed: false, optional: false, required: true
  private _channels?: number; 
  public get channels() {
    return this.getNumberAttribute('channels');
  }
  public set channels(value: number) {
    this._channels = value;
  }
  // Temporarily expose input value. Use with caution.
  public get channelsInput() {
    return this._channels;
  }

  // codec - computed: false, optional: false, required: true
  private _codec?: number; 
  public get codec() {
    return this.getNumberAttribute('codec');
  }
  public set codec(value: number) {
    this._codec = value;
  }
  // Temporarily expose input value. Use with caution.
  public get codecInput() {
    return this._codec;
  }

  // output_policy - computed: false, optional: true, required: false
  private _outputPolicy?: string; 
  public get outputPolicy() {
    return this.getStringAttribute('output_policy');
  }
  public set outputPolicy(value: string) {
    this._outputPolicy = value;
  }
  public resetOutputPolicy() {
    this._outputPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get outputPolicyInput() {
    return this._outputPolicy;
  }

  // sample_rate - computed: false, optional: false, required: true
  private _sampleRate?: number; 
  public get sampleRate() {
    return this.getNumberAttribute('sample_rate');
  }
  public set sampleRate(value: number) {
    this._sampleRate = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sampleRateInput() {
    return this._sampleRate;
  }
}
export interface MpcTranscodingTemplateGroupVideoCommon {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#black_bar_removal MpcTranscodingTemplateGroup#black_bar_removal}
  */
  readonly blackBarRemoval?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#codec MpcTranscodingTemplateGroup#codec}
  */
  readonly codec?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#fps MpcTranscodingTemplateGroup#fps}
  */
  readonly fps?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#level MpcTranscodingTemplateGroup#level}
  */
  readonly level?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#max_consecutive_bframes MpcTranscodingTemplateGroup#max_consecutive_bframes}
  */
  readonly maxConsecutiveBframes?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#max_iframes_interval MpcTranscodingTemplateGroup#max_iframes_interval}
  */
  readonly maxIframesInterval?: number;
  /**
  * schema: Deprecated; the SDK does not support it
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#max_reference_frames MpcTranscodingTemplateGroup#max_reference_frames}
  */
  readonly maxReferenceFrames?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#output_policy MpcTranscodingTemplateGroup#output_policy}
  */
  readonly outputPolicy?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#profile MpcTranscodingTemplateGroup#profile}
  */
  readonly profile?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#quality MpcTranscodingTemplateGroup#quality}
  */
  readonly quality?: number;
}

export function mpcTranscodingTemplateGroupVideoCommonToTerraform(struct?: MpcTranscodingTemplateGroupVideoCommonOutputReference | MpcTranscodingTemplateGroupVideoCommon): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    black_bar_removal: cdktf.numberToTerraform(struct!.blackBarRemoval),
    codec: cdktf.numberToTerraform(struct!.codec),
    fps: cdktf.numberToTerraform(struct!.fps),
    level: cdktf.numberToTerraform(struct!.level),
    max_consecutive_bframes: cdktf.numberToTerraform(struct!.maxConsecutiveBframes),
    max_iframes_interval: cdktf.numberToTerraform(struct!.maxIframesInterval),
    max_reference_frames: cdktf.numberToTerraform(struct!.maxReferenceFrames),
    output_policy: cdktf.stringToTerraform(struct!.outputPolicy),
    profile: cdktf.numberToTerraform(struct!.profile),
    quality: cdktf.numberToTerraform(struct!.quality),
  }
}


export function mpcTranscodingTemplateGroupVideoCommonToHclTerraform(struct?: MpcTranscodingTemplateGroupVideoCommonOutputReference | MpcTranscodingTemplateGroupVideoCommon): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    black_bar_removal: {
      value: cdktf.numberToHclTerraform(struct!.blackBarRemoval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    codec: {
      value: cdktf.numberToHclTerraform(struct!.codec),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    fps: {
      value: cdktf.numberToHclTerraform(struct!.fps),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    level: {
      value: cdktf.numberToHclTerraform(struct!.level),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    max_consecutive_bframes: {
      value: cdktf.numberToHclTerraform(struct!.maxConsecutiveBframes),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    max_iframes_interval: {
      value: cdktf.numberToHclTerraform(struct!.maxIframesInterval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    max_reference_frames: {
      value: cdktf.numberToHclTerraform(struct!.maxReferenceFrames),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    output_policy: {
      value: cdktf.stringToHclTerraform(struct!.outputPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    profile: {
      value: cdktf.numberToHclTerraform(struct!.profile),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    quality: {
      value: cdktf.numberToHclTerraform(struct!.quality),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MpcTranscodingTemplateGroupVideoCommonOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MpcTranscodingTemplateGroupVideoCommon | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._blackBarRemoval !== undefined) {
      hasAnyValues = true;
      internalValueResult.blackBarRemoval = this._blackBarRemoval;
    }
    if (this._codec !== undefined) {
      hasAnyValues = true;
      internalValueResult.codec = this._codec;
    }
    if (this._fps !== undefined) {
      hasAnyValues = true;
      internalValueResult.fps = this._fps;
    }
    if (this._level !== undefined) {
      hasAnyValues = true;
      internalValueResult.level = this._level;
    }
    if (this._maxConsecutiveBframes !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxConsecutiveBframes = this._maxConsecutiveBframes;
    }
    if (this._maxIframesInterval !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxIframesInterval = this._maxIframesInterval;
    }
    if (this._maxReferenceFrames !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxReferenceFrames = this._maxReferenceFrames;
    }
    if (this._outputPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.outputPolicy = this._outputPolicy;
    }
    if (this._profile !== undefined) {
      hasAnyValues = true;
      internalValueResult.profile = this._profile;
    }
    if (this._quality !== undefined) {
      hasAnyValues = true;
      internalValueResult.quality = this._quality;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MpcTranscodingTemplateGroupVideoCommon | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._blackBarRemoval = undefined;
      this._codec = undefined;
      this._fps = undefined;
      this._level = undefined;
      this._maxConsecutiveBframes = undefined;
      this._maxIframesInterval = undefined;
      this._maxReferenceFrames = undefined;
      this._outputPolicy = undefined;
      this._profile = undefined;
      this._quality = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._blackBarRemoval = value.blackBarRemoval;
      this._codec = value.codec;
      this._fps = value.fps;
      this._level = value.level;
      this._maxConsecutiveBframes = value.maxConsecutiveBframes;
      this._maxIframesInterval = value.maxIframesInterval;
      this._maxReferenceFrames = value.maxReferenceFrames;
      this._outputPolicy = value.outputPolicy;
      this._profile = value.profile;
      this._quality = value.quality;
    }
  }

  // black_bar_removal - computed: false, optional: true, required: false
  private _blackBarRemoval?: number; 
  public get blackBarRemoval() {
    return this.getNumberAttribute('black_bar_removal');
  }
  public set blackBarRemoval(value: number) {
    this._blackBarRemoval = value;
  }
  public resetBlackBarRemoval() {
    this._blackBarRemoval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get blackBarRemovalInput() {
    return this._blackBarRemoval;
  }

  // codec - computed: false, optional: true, required: false
  private _codec?: number; 
  public get codec() {
    return this.getNumberAttribute('codec');
  }
  public set codec(value: number) {
    this._codec = value;
  }
  public resetCodec() {
    this._codec = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codecInput() {
    return this._codec;
  }

  // fps - computed: false, optional: true, required: false
  private _fps?: number; 
  public get fps() {
    return this.getNumberAttribute('fps');
  }
  public set fps(value: number) {
    this._fps = value;
  }
  public resetFps() {
    this._fps = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fpsInput() {
    return this._fps;
  }

  // level - computed: false, optional: true, required: false
  private _level?: number; 
  public get level() {
    return this.getNumberAttribute('level');
  }
  public set level(value: number) {
    this._level = value;
  }
  public resetLevel() {
    this._level = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get levelInput() {
    return this._level;
  }

  // max_consecutive_bframes - computed: false, optional: true, required: false
  private _maxConsecutiveBframes?: number; 
  public get maxConsecutiveBframes() {
    return this.getNumberAttribute('max_consecutive_bframes');
  }
  public set maxConsecutiveBframes(value: number) {
    this._maxConsecutiveBframes = value;
  }
  public resetMaxConsecutiveBframes() {
    this._maxConsecutiveBframes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxConsecutiveBframesInput() {
    return this._maxConsecutiveBframes;
  }

  // max_iframes_interval - computed: false, optional: true, required: false
  private _maxIframesInterval?: number; 
  public get maxIframesInterval() {
    return this.getNumberAttribute('max_iframes_interval');
  }
  public set maxIframesInterval(value: number) {
    this._maxIframesInterval = value;
  }
  public resetMaxIframesInterval() {
    this._maxIframesInterval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxIframesIntervalInput() {
    return this._maxIframesInterval;
  }

  // max_reference_frames - computed: true, optional: true, required: false
  private _maxReferenceFrames?: number; 
  public get maxReferenceFrames() {
    return this.getNumberAttribute('max_reference_frames');
  }
  public set maxReferenceFrames(value: number) {
    this._maxReferenceFrames = value;
  }
  public resetMaxReferenceFrames() {
    this._maxReferenceFrames = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxReferenceFramesInput() {
    return this._maxReferenceFrames;
  }

  // output_policy - computed: false, optional: true, required: false
  private _outputPolicy?: string; 
  public get outputPolicy() {
    return this.getStringAttribute('output_policy');
  }
  public set outputPolicy(value: string) {
    this._outputPolicy = value;
  }
  public resetOutputPolicy() {
    this._outputPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get outputPolicyInput() {
    return this._outputPolicy;
  }

  // profile - computed: false, optional: true, required: false
  private _profile?: number; 
  public get profile() {
    return this.getNumberAttribute('profile');
  }
  public set profile(value: number) {
    this._profile = value;
  }
  public resetProfile() {
    this._profile = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get profileInput() {
    return this._profile;
  }

  // quality - computed: false, optional: true, required: false
  private _quality?: number; 
  public get quality() {
    return this.getNumberAttribute('quality');
  }
  public set quality(value: number) {
    this._quality = value;
  }
  public resetQuality() {
    this._quality = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get qualityInput() {
    return this._quality;
  }
}
export interface MpcTranscodingTemplateGroupVideos {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#bitrate MpcTranscodingTemplateGroup#bitrate}
  */
  readonly bitrate?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#height MpcTranscodingTemplateGroup#height}
  */
  readonly height?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#width MpcTranscodingTemplateGroup#width}
  */
  readonly width?: number;
}

export function mpcTranscodingTemplateGroupVideosToTerraform(struct?: MpcTranscodingTemplateGroupVideos | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bitrate: cdktf.numberToTerraform(struct!.bitrate),
    height: cdktf.numberToTerraform(struct!.height),
    width: cdktf.numberToTerraform(struct!.width),
  }
}


export function mpcTranscodingTemplateGroupVideosToHclTerraform(struct?: MpcTranscodingTemplateGroupVideos | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bitrate: {
      value: cdktf.numberToHclTerraform(struct!.bitrate),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    height: {
      value: cdktf.numberToHclTerraform(struct!.height),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    width: {
      value: cdktf.numberToHclTerraform(struct!.width),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MpcTranscodingTemplateGroupVideosOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MpcTranscodingTemplateGroupVideos | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bitrate !== undefined) {
      hasAnyValues = true;
      internalValueResult.bitrate = this._bitrate;
    }
    if (this._height !== undefined) {
      hasAnyValues = true;
      internalValueResult.height = this._height;
    }
    if (this._width !== undefined) {
      hasAnyValues = true;
      internalValueResult.width = this._width;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MpcTranscodingTemplateGroupVideos | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._bitrate = undefined;
      this._height = undefined;
      this._width = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._bitrate = value.bitrate;
      this._height = value.height;
      this._width = value.width;
    }
  }

  // bitrate - computed: false, optional: true, required: false
  private _bitrate?: number; 
  public get bitrate() {
    return this.getNumberAttribute('bitrate');
  }
  public set bitrate(value: number) {
    this._bitrate = value;
  }
  public resetBitrate() {
    this._bitrate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bitrateInput() {
    return this._bitrate;
  }

  // height - computed: false, optional: true, required: false
  private _height?: number; 
  public get height() {
    return this.getNumberAttribute('height');
  }
  public set height(value: number) {
    this._height = value;
  }
  public resetHeight() {
    this._height = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get heightInput() {
    return this._height;
  }

  // width - computed: false, optional: true, required: false
  private _width?: number; 
  public get width() {
    return this.getNumberAttribute('width');
  }
  public set width(value: number) {
    this._width = value;
  }
  public resetWidth() {
    this._width = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get widthInput() {
    return this._width;
  }
}

export class MpcTranscodingTemplateGroupVideosList extends cdktf.ComplexList {
  public internalValue? : MpcTranscodingTemplateGroupVideos[] | cdktf.IResolvable

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
  public get(index: number): MpcTranscodingTemplateGroupVideosOutputReference {
    return new MpcTranscodingTemplateGroupVideosOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group huaweicloud_mpc_transcoding_template_group}
*/
export class MpcTranscodingTemplateGroup extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_mpc_transcoding_template_group";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a MpcTranscodingTemplateGroup resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the MpcTranscodingTemplateGroup to import
  * @param importFromId The id of the existing MpcTranscodingTemplateGroup that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the MpcTranscodingTemplateGroup to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_mpc_transcoding_template_group", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mpc_transcoding_template_group huaweicloud_mpc_transcoding_template_group} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MpcTranscodingTemplateGroupConfig
  */
  public constructor(scope: Construct, id: string, config: MpcTranscodingTemplateGroupConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_mpc_transcoding_template_group',
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
    this._dashSegmentDuration = config.dashSegmentDuration;
    this._hlsSegmentDuration = config.hlsSegmentDuration;
    this._id = config.id;
    this._lowBitrateHd = config.lowBitrateHd;
    this._name = config.name;
    this._outputFormat = config.outputFormat;
    this._region = config.region;
    this._audio.internalValue = config.audio;
    this._videoCommon.internalValue = config.videoCommon;
    this._videos.internalValue = config.videos;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // dash_segment_duration - computed: false, optional: true, required: false
  private _dashSegmentDuration?: number; 
  public get dashSegmentDuration() {
    return this.getNumberAttribute('dash_segment_duration');
  }
  public set dashSegmentDuration(value: number) {
    this._dashSegmentDuration = value;
  }
  public resetDashSegmentDuration() {
    this._dashSegmentDuration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dashSegmentDurationInput() {
    return this._dashSegmentDuration;
  }

  // hls_segment_duration - computed: false, optional: true, required: false
  private _hlsSegmentDuration?: number; 
  public get hlsSegmentDuration() {
    return this.getNumberAttribute('hls_segment_duration');
  }
  public set hlsSegmentDuration(value: number) {
    this._hlsSegmentDuration = value;
  }
  public resetHlsSegmentDuration() {
    this._hlsSegmentDuration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hlsSegmentDurationInput() {
    return this._hlsSegmentDuration;
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

  // low_bitrate_hd - computed: false, optional: true, required: false
  private _lowBitrateHd?: boolean | cdktf.IResolvable; 
  public get lowBitrateHd() {
    return this.getBooleanAttribute('low_bitrate_hd');
  }
  public set lowBitrateHd(value: boolean | cdktf.IResolvable) {
    this._lowBitrateHd = value;
  }
  public resetLowBitrateHd() {
    this._lowBitrateHd = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lowBitrateHdInput() {
    return this._lowBitrateHd;
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

  // output_format - computed: false, optional: false, required: true
  private _outputFormat?: number; 
  public get outputFormat() {
    return this.getNumberAttribute('output_format');
  }
  public set outputFormat(value: number) {
    this._outputFormat = value;
  }
  // Temporarily expose input value. Use with caution.
  public get outputFormatInput() {
    return this._outputFormat;
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

  // template_ids - computed: true, optional: false, required: false
  public get templateIds() {
    return this.getListAttribute('template_ids');
  }

  // audio - computed: false, optional: true, required: false
  private _audio = new MpcTranscodingTemplateGroupAudioOutputReference(this, "audio");
  public get audio() {
    return this._audio;
  }
  public putAudio(value: MpcTranscodingTemplateGroupAudio) {
    this._audio.internalValue = value;
  }
  public resetAudio() {
    this._audio.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get audioInput() {
    return this._audio.internalValue;
  }

  // video_common - computed: false, optional: true, required: false
  private _videoCommon = new MpcTranscodingTemplateGroupVideoCommonOutputReference(this, "video_common");
  public get videoCommon() {
    return this._videoCommon;
  }
  public putVideoCommon(value: MpcTranscodingTemplateGroupVideoCommon) {
    this._videoCommon.internalValue = value;
  }
  public resetVideoCommon() {
    this._videoCommon.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get videoCommonInput() {
    return this._videoCommon.internalValue;
  }

  // videos - computed: false, optional: true, required: false
  private _videos = new MpcTranscodingTemplateGroupVideosList(this, "videos", false);
  public get videos() {
    return this._videos;
  }
  public putVideos(value: MpcTranscodingTemplateGroupVideos[] | cdktf.IResolvable) {
    this._videos.internalValue = value;
  }
  public resetVideos() {
    this._videos.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get videosInput() {
    return this._videos.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      dash_segment_duration: cdktf.numberToTerraform(this._dashSegmentDuration),
      hls_segment_duration: cdktf.numberToTerraform(this._hlsSegmentDuration),
      id: cdktf.stringToTerraform(this._id),
      low_bitrate_hd: cdktf.booleanToTerraform(this._lowBitrateHd),
      name: cdktf.stringToTerraform(this._name),
      output_format: cdktf.numberToTerraform(this._outputFormat),
      region: cdktf.stringToTerraform(this._region),
      audio: mpcTranscodingTemplateGroupAudioToTerraform(this._audio.internalValue),
      video_common: mpcTranscodingTemplateGroupVideoCommonToTerraform(this._videoCommon.internalValue),
      videos: cdktf.listMapper(mpcTranscodingTemplateGroupVideosToTerraform, true)(this._videos.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      dash_segment_duration: {
        value: cdktf.numberToHclTerraform(this._dashSegmentDuration),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      hls_segment_duration: {
        value: cdktf.numberToHclTerraform(this._hlsSegmentDuration),
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
      low_bitrate_hd: {
        value: cdktf.booleanToHclTerraform(this._lowBitrateHd),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      output_format: {
        value: cdktf.numberToHclTerraform(this._outputFormat),
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
      audio: {
        value: mpcTranscodingTemplateGroupAudioToHclTerraform(this._audio.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MpcTranscodingTemplateGroupAudioList",
      },
      video_common: {
        value: mpcTranscodingTemplateGroupVideoCommonToHclTerraform(this._videoCommon.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MpcTranscodingTemplateGroupVideoCommonList",
      },
      videos: {
        value: cdktf.listMapperHcl(mpcTranscodingTemplateGroupVideosToHclTerraform, true)(this._videos.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MpcTranscodingTemplateGroupVideosList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

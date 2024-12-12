// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VodTranscodingTemplateGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#audio_codec VodTranscodingTemplateGroup#audio_codec}
  */
  readonly audioCodec?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#auto_encrypt VodTranscodingTemplateGroup#auto_encrypt}
  */
  readonly autoEncrypt?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#description VodTranscodingTemplateGroup#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#hls_segment_duration VodTranscodingTemplateGroup#hls_segment_duration}
  */
  readonly hlsSegmentDuration?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#id VodTranscodingTemplateGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#is_default VodTranscodingTemplateGroup#is_default}
  */
  readonly isDefault?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#low_bitrate_hd VodTranscodingTemplateGroup#low_bitrate_hd}
  */
  readonly lowBitrateHd?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#name VodTranscodingTemplateGroup#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#region VodTranscodingTemplateGroup#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#video_codec VodTranscodingTemplateGroup#video_codec}
  */
  readonly videoCodec?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#watermark_template_ids VodTranscodingTemplateGroup#watermark_template_ids}
  */
  readonly watermarkTemplateIds?: string[];
  /**
  * quality_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#quality_info VodTranscodingTemplateGroup#quality_info}
  */
  readonly qualityInfo: VodTranscodingTemplateGroupQualityInfo[] | cdktf.IResolvable;
}
export interface VodTranscodingTemplateGroupQualityInfoAudio {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#bitrate VodTranscodingTemplateGroup#bitrate}
  */
  readonly bitrate?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#channels VodTranscodingTemplateGroup#channels}
  */
  readonly channels: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#sample_rate VodTranscodingTemplateGroup#sample_rate}
  */
  readonly sampleRate: number;
}

export function vodTranscodingTemplateGroupQualityInfoAudioToTerraform(struct?: VodTranscodingTemplateGroupQualityInfoAudioOutputReference | VodTranscodingTemplateGroupQualityInfoAudio): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bitrate: cdktf.numberToTerraform(struct!.bitrate),
    channels: cdktf.numberToTerraform(struct!.channels),
    sample_rate: cdktf.numberToTerraform(struct!.sampleRate),
  }
}


export function vodTranscodingTemplateGroupQualityInfoAudioToHclTerraform(struct?: VodTranscodingTemplateGroupQualityInfoAudioOutputReference | VodTranscodingTemplateGroupQualityInfoAudio): any {
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

export class VodTranscodingTemplateGroupQualityInfoAudioOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VodTranscodingTemplateGroupQualityInfoAudio | undefined {
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
    if (this._sampleRate !== undefined) {
      hasAnyValues = true;
      internalValueResult.sampleRate = this._sampleRate;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VodTranscodingTemplateGroupQualityInfoAudio | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bitrate = undefined;
      this._channels = undefined;
      this._sampleRate = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bitrate = value.bitrate;
      this._channels = value.channels;
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
export interface VodTranscodingTemplateGroupQualityInfoVideo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#bitrate VodTranscodingTemplateGroup#bitrate}
  */
  readonly bitrate?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#frame_rate VodTranscodingTemplateGroup#frame_rate}
  */
  readonly frameRate?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#height VodTranscodingTemplateGroup#height}
  */
  readonly height?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#quality VodTranscodingTemplateGroup#quality}
  */
  readonly quality: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#width VodTranscodingTemplateGroup#width}
  */
  readonly width?: number;
}

export function vodTranscodingTemplateGroupQualityInfoVideoToTerraform(struct?: VodTranscodingTemplateGroupQualityInfoVideoOutputReference | VodTranscodingTemplateGroupQualityInfoVideo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bitrate: cdktf.numberToTerraform(struct!.bitrate),
    frame_rate: cdktf.numberToTerraform(struct!.frameRate),
    height: cdktf.numberToTerraform(struct!.height),
    quality: cdktf.stringToTerraform(struct!.quality),
    width: cdktf.numberToTerraform(struct!.width),
  }
}


export function vodTranscodingTemplateGroupQualityInfoVideoToHclTerraform(struct?: VodTranscodingTemplateGroupQualityInfoVideoOutputReference | VodTranscodingTemplateGroupQualityInfoVideo): any {
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
    frame_rate: {
      value: cdktf.numberToHclTerraform(struct!.frameRate),
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
    quality: {
      value: cdktf.stringToHclTerraform(struct!.quality),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
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

export class VodTranscodingTemplateGroupQualityInfoVideoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VodTranscodingTemplateGroupQualityInfoVideo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bitrate !== undefined) {
      hasAnyValues = true;
      internalValueResult.bitrate = this._bitrate;
    }
    if (this._frameRate !== undefined) {
      hasAnyValues = true;
      internalValueResult.frameRate = this._frameRate;
    }
    if (this._height !== undefined) {
      hasAnyValues = true;
      internalValueResult.height = this._height;
    }
    if (this._quality !== undefined) {
      hasAnyValues = true;
      internalValueResult.quality = this._quality;
    }
    if (this._width !== undefined) {
      hasAnyValues = true;
      internalValueResult.width = this._width;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VodTranscodingTemplateGroupQualityInfoVideo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bitrate = undefined;
      this._frameRate = undefined;
      this._height = undefined;
      this._quality = undefined;
      this._width = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bitrate = value.bitrate;
      this._frameRate = value.frameRate;
      this._height = value.height;
      this._quality = value.quality;
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

  // frame_rate - computed: false, optional: true, required: false
  private _frameRate?: number; 
  public get frameRate() {
    return this.getNumberAttribute('frame_rate');
  }
  public set frameRate(value: number) {
    this._frameRate = value;
  }
  public resetFrameRate() {
    this._frameRate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get frameRateInput() {
    return this._frameRate;
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

  // quality - computed: false, optional: false, required: true
  private _quality?: string; 
  public get quality() {
    return this.getStringAttribute('quality');
  }
  public set quality(value: string) {
    this._quality = value;
  }
  // Temporarily expose input value. Use with caution.
  public get qualityInput() {
    return this._quality;
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
export interface VodTranscodingTemplateGroupQualityInfo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#output_format VodTranscodingTemplateGroup#output_format}
  */
  readonly outputFormat: string;
  /**
  * audio block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#audio VodTranscodingTemplateGroup#audio}
  */
  readonly audio?: VodTranscodingTemplateGroupQualityInfoAudio;
  /**
  * video block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#video VodTranscodingTemplateGroup#video}
  */
  readonly video?: VodTranscodingTemplateGroupQualityInfoVideo;
}

export function vodTranscodingTemplateGroupQualityInfoToTerraform(struct?: VodTranscodingTemplateGroupQualityInfo | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    output_format: cdktf.stringToTerraform(struct!.outputFormat),
    audio: vodTranscodingTemplateGroupQualityInfoAudioToTerraform(struct!.audio),
    video: vodTranscodingTemplateGroupQualityInfoVideoToTerraform(struct!.video),
  }
}


export function vodTranscodingTemplateGroupQualityInfoToHclTerraform(struct?: VodTranscodingTemplateGroupQualityInfo | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    output_format: {
      value: cdktf.stringToHclTerraform(struct!.outputFormat),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    audio: {
      value: vodTranscodingTemplateGroupQualityInfoAudioToHclTerraform(struct!.audio),
      isBlock: true,
      type: "list",
      storageClassType: "VodTranscodingTemplateGroupQualityInfoAudioList",
    },
    video: {
      value: vodTranscodingTemplateGroupQualityInfoVideoToHclTerraform(struct!.video),
      isBlock: true,
      type: "list",
      storageClassType: "VodTranscodingTemplateGroupQualityInfoVideoList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VodTranscodingTemplateGroupQualityInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): VodTranscodingTemplateGroupQualityInfo | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._outputFormat !== undefined) {
      hasAnyValues = true;
      internalValueResult.outputFormat = this._outputFormat;
    }
    if (this._audio?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.audio = this._audio?.internalValue;
    }
    if (this._video?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.video = this._video?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VodTranscodingTemplateGroupQualityInfo | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._outputFormat = undefined;
      this._audio.internalValue = undefined;
      this._video.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._outputFormat = value.outputFormat;
      this._audio.internalValue = value.audio;
      this._video.internalValue = value.video;
    }
  }

  // output_format - computed: false, optional: false, required: true
  private _outputFormat?: string; 
  public get outputFormat() {
    return this.getStringAttribute('output_format');
  }
  public set outputFormat(value: string) {
    this._outputFormat = value;
  }
  // Temporarily expose input value. Use with caution.
  public get outputFormatInput() {
    return this._outputFormat;
  }

  // audio - computed: false, optional: true, required: false
  private _audio = new VodTranscodingTemplateGroupQualityInfoAudioOutputReference(this, "audio");
  public get audio() {
    return this._audio;
  }
  public putAudio(value: VodTranscodingTemplateGroupQualityInfoAudio) {
    this._audio.internalValue = value;
  }
  public resetAudio() {
    this._audio.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get audioInput() {
    return this._audio.internalValue;
  }

  // video - computed: false, optional: true, required: false
  private _video = new VodTranscodingTemplateGroupQualityInfoVideoOutputReference(this, "video");
  public get video() {
    return this._video;
  }
  public putVideo(value: VodTranscodingTemplateGroupQualityInfoVideo) {
    this._video.internalValue = value;
  }
  public resetVideo() {
    this._video.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get videoInput() {
    return this._video.internalValue;
  }
}

export class VodTranscodingTemplateGroupQualityInfoList extends cdktf.ComplexList {
  public internalValue? : VodTranscodingTemplateGroupQualityInfo[] | cdktf.IResolvable

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
  public get(index: number): VodTranscodingTemplateGroupQualityInfoOutputReference {
    return new VodTranscodingTemplateGroupQualityInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group huaweicloud_vod_transcoding_template_group}
*/
export class VodTranscodingTemplateGroup extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_vod_transcoding_template_group";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VodTranscodingTemplateGroup resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VodTranscodingTemplateGroup to import
  * @param importFromId The id of the existing VodTranscodingTemplateGroup that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VodTranscodingTemplateGroup to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_vod_transcoding_template_group", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_transcoding_template_group huaweicloud_vod_transcoding_template_group} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VodTranscodingTemplateGroupConfig
  */
  public constructor(scope: Construct, id: string, config: VodTranscodingTemplateGroupConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_vod_transcoding_template_group',
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
    this._audioCodec = config.audioCodec;
    this._autoEncrypt = config.autoEncrypt;
    this._description = config.description;
    this._hlsSegmentDuration = config.hlsSegmentDuration;
    this._id = config.id;
    this._isDefault = config.isDefault;
    this._lowBitrateHd = config.lowBitrateHd;
    this._name = config.name;
    this._region = config.region;
    this._videoCodec = config.videoCodec;
    this._watermarkTemplateIds = config.watermarkTemplateIds;
    this._qualityInfo.internalValue = config.qualityInfo;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // audio_codec - computed: true, optional: true, required: false
  private _audioCodec?: string; 
  public get audioCodec() {
    return this.getStringAttribute('audio_codec');
  }
  public set audioCodec(value: string) {
    this._audioCodec = value;
  }
  public resetAudioCodec() {
    this._audioCodec = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get audioCodecInput() {
    return this._audioCodec;
  }

  // auto_encrypt - computed: false, optional: true, required: false
  private _autoEncrypt?: boolean | cdktf.IResolvable; 
  public get autoEncrypt() {
    return this.getBooleanAttribute('auto_encrypt');
  }
  public set autoEncrypt(value: boolean | cdktf.IResolvable) {
    this._autoEncrypt = value;
  }
  public resetAutoEncrypt() {
    this._autoEncrypt = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoEncryptInput() {
    return this._autoEncrypt;
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

  // hls_segment_duration - computed: true, optional: true, required: false
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

  // is_default - computed: false, optional: true, required: false
  private _isDefault?: boolean | cdktf.IResolvable; 
  public get isDefault() {
    return this.getBooleanAttribute('is_default');
  }
  public set isDefault(value: boolean | cdktf.IResolvable) {
    this._isDefault = value;
  }
  public resetIsDefault() {
    this._isDefault = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isDefaultInput() {
    return this._isDefault;
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

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // video_codec - computed: true, optional: true, required: false
  private _videoCodec?: string; 
  public get videoCodec() {
    return this.getStringAttribute('video_codec');
  }
  public set videoCodec(value: string) {
    this._videoCodec = value;
  }
  public resetVideoCodec() {
    this._videoCodec = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get videoCodecInput() {
    return this._videoCodec;
  }

  // watermark_template_ids - computed: false, optional: true, required: false
  private _watermarkTemplateIds?: string[]; 
  public get watermarkTemplateIds() {
    return this.getListAttribute('watermark_template_ids');
  }
  public set watermarkTemplateIds(value: string[]) {
    this._watermarkTemplateIds = value;
  }
  public resetWatermarkTemplateIds() {
    this._watermarkTemplateIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get watermarkTemplateIdsInput() {
    return this._watermarkTemplateIds;
  }

  // quality_info - computed: false, optional: false, required: true
  private _qualityInfo = new VodTranscodingTemplateGroupQualityInfoList(this, "quality_info", false);
  public get qualityInfo() {
    return this._qualityInfo;
  }
  public putQualityInfo(value: VodTranscodingTemplateGroupQualityInfo[] | cdktf.IResolvable) {
    this._qualityInfo.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get qualityInfoInput() {
    return this._qualityInfo.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      audio_codec: cdktf.stringToTerraform(this._audioCodec),
      auto_encrypt: cdktf.booleanToTerraform(this._autoEncrypt),
      description: cdktf.stringToTerraform(this._description),
      hls_segment_duration: cdktf.numberToTerraform(this._hlsSegmentDuration),
      id: cdktf.stringToTerraform(this._id),
      is_default: cdktf.booleanToTerraform(this._isDefault),
      low_bitrate_hd: cdktf.booleanToTerraform(this._lowBitrateHd),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      video_codec: cdktf.stringToTerraform(this._videoCodec),
      watermark_template_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._watermarkTemplateIds),
      quality_info: cdktf.listMapper(vodTranscodingTemplateGroupQualityInfoToTerraform, true)(this._qualityInfo.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      audio_codec: {
        value: cdktf.stringToHclTerraform(this._audioCodec),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auto_encrypt: {
        value: cdktf.booleanToHclTerraform(this._autoEncrypt),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
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
      is_default: {
        value: cdktf.booleanToHclTerraform(this._isDefault),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      video_codec: {
        value: cdktf.stringToHclTerraform(this._videoCodec),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      watermark_template_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._watermarkTemplateIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      quality_info: {
        value: cdktf.listMapperHcl(vodTranscodingTemplateGroupQualityInfoToHclTerraform, true)(this._qualityInfo.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VodTranscodingTemplateGroupQualityInfoList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

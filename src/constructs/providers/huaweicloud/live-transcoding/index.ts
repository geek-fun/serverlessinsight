// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LiveTranscodingConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#app_name LiveTranscoding#app_name}
  */
  readonly appName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#domain_name LiveTranscoding#domain_name}
  */
  readonly domainName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#id LiveTranscoding#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#low_bitrate_hd LiveTranscoding#low_bitrate_hd}
  */
  readonly lowBitrateHd?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#region LiveTranscoding#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#video_encoding LiveTranscoding#video_encoding}
  */
  readonly videoEncoding: string;
  /**
  * templates block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#templates LiveTranscoding#templates}
  */
  readonly templates: LiveTranscodingTemplates[] | cdktf.IResolvable;
}
export interface LiveTranscodingTemplates {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#bitrate LiveTranscoding#bitrate}
  */
  readonly bitrate: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#frame_rate LiveTranscoding#frame_rate}
  */
  readonly frameRate?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#height LiveTranscoding#height}
  */
  readonly height: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#name LiveTranscoding#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#width LiveTranscoding#width}
  */
  readonly width: number;
}

export function liveTranscodingTemplatesToTerraform(struct?: LiveTranscodingTemplates | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bitrate: cdktf.numberToTerraform(struct!.bitrate),
    frame_rate: cdktf.numberToTerraform(struct!.frameRate),
    height: cdktf.numberToTerraform(struct!.height),
    name: cdktf.stringToTerraform(struct!.name),
    width: cdktf.numberToTerraform(struct!.width),
  }
}


export function liveTranscodingTemplatesToHclTerraform(struct?: LiveTranscodingTemplates | cdktf.IResolvable): any {
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
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
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

export class LiveTranscodingTemplatesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LiveTranscodingTemplates | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
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
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._width !== undefined) {
      hasAnyValues = true;
      internalValueResult.width = this._width;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LiveTranscodingTemplates | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._bitrate = undefined;
      this._frameRate = undefined;
      this._height = undefined;
      this._name = undefined;
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
      this._frameRate = value.frameRate;
      this._height = value.height;
      this._name = value.name;
      this._width = value.width;
    }
  }

  // bitrate - computed: false, optional: false, required: true
  private _bitrate?: number; 
  public get bitrate() {
    return this.getNumberAttribute('bitrate');
  }
  public set bitrate(value: number) {
    this._bitrate = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bitrateInput() {
    return this._bitrate;
  }

  // frame_rate - computed: true, optional: true, required: false
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

  // height - computed: false, optional: false, required: true
  private _height?: number; 
  public get height() {
    return this.getNumberAttribute('height');
  }
  public set height(value: number) {
    this._height = value;
  }
  // Temporarily expose input value. Use with caution.
  public get heightInput() {
    return this._height;
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

  // width - computed: false, optional: false, required: true
  private _width?: number; 
  public get width() {
    return this.getNumberAttribute('width');
  }
  public set width(value: number) {
    this._width = value;
  }
  // Temporarily expose input value. Use with caution.
  public get widthInput() {
    return this._width;
  }
}

export class LiveTranscodingTemplatesList extends cdktf.ComplexList {
  public internalValue? : LiveTranscodingTemplates[] | cdktf.IResolvable

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
  public get(index: number): LiveTranscodingTemplatesOutputReference {
    return new LiveTranscodingTemplatesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding huaweicloud_live_transcoding}
*/
export class LiveTranscoding extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_live_transcoding";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LiveTranscoding resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LiveTranscoding to import
  * @param importFromId The id of the existing LiveTranscoding that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LiveTranscoding to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_live_transcoding", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/live_transcoding huaweicloud_live_transcoding} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LiveTranscodingConfig
  */
  public constructor(scope: Construct, id: string, config: LiveTranscodingConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_live_transcoding',
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
    this._lowBitrateHd = config.lowBitrateHd;
    this._region = config.region;
    this._videoEncoding = config.videoEncoding;
    this._templates.internalValue = config.templates;
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

  // low_bitrate_hd - computed: true, optional: true, required: false
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

  // video_encoding - computed: false, optional: false, required: true
  private _videoEncoding?: string; 
  public get videoEncoding() {
    return this.getStringAttribute('video_encoding');
  }
  public set videoEncoding(value: string) {
    this._videoEncoding = value;
  }
  // Temporarily expose input value. Use with caution.
  public get videoEncodingInput() {
    return this._videoEncoding;
  }

  // templates - computed: false, optional: false, required: true
  private _templates = new LiveTranscodingTemplatesList(this, "templates", false);
  public get templates() {
    return this._templates;
  }
  public putTemplates(value: LiveTranscodingTemplates[] | cdktf.IResolvable) {
    this._templates.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get templatesInput() {
    return this._templates.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      app_name: cdktf.stringToTerraform(this._appName),
      domain_name: cdktf.stringToTerraform(this._domainName),
      id: cdktf.stringToTerraform(this._id),
      low_bitrate_hd: cdktf.booleanToTerraform(this._lowBitrateHd),
      region: cdktf.stringToTerraform(this._region),
      video_encoding: cdktf.stringToTerraform(this._videoEncoding),
      templates: cdktf.listMapper(liveTranscodingTemplatesToTerraform, true)(this._templates.internalValue),
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
      low_bitrate_hd: {
        value: cdktf.booleanToHclTerraform(this._lowBitrateHd),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      video_encoding: {
        value: cdktf.stringToHclTerraform(this._videoEncoding),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      templates: {
        value: cdktf.listMapperHcl(liveTranscodingTemplatesToHclTerraform, true)(this._templates.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LiveTranscodingTemplatesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

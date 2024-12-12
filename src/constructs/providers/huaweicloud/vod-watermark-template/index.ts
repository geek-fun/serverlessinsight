// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VodWatermarkTemplateConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#height VodWatermarkTemplate#height}
  */
  readonly height?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#horizontal_offset VodWatermarkTemplate#horizontal_offset}
  */
  readonly horizontalOffset?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#id VodWatermarkTemplate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#image_file VodWatermarkTemplate#image_file}
  */
  readonly imageFile: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#image_process VodWatermarkTemplate#image_process}
  */
  readonly imageProcess?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#image_type VodWatermarkTemplate#image_type}
  */
  readonly imageType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#name VodWatermarkTemplate#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#position VodWatermarkTemplate#position}
  */
  readonly position?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#region VodWatermarkTemplate#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#timeline_duration VodWatermarkTemplate#timeline_duration}
  */
  readonly timelineDuration?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#timeline_start VodWatermarkTemplate#timeline_start}
  */
  readonly timelineStart?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#vertical_offset VodWatermarkTemplate#vertical_offset}
  */
  readonly verticalOffset?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#width VodWatermarkTemplate#width}
  */
  readonly width?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#timeouts VodWatermarkTemplate#timeouts}
  */
  readonly timeouts?: VodWatermarkTemplateTimeouts;
}
export interface VodWatermarkTemplateTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#create VodWatermarkTemplate#create}
  */
  readonly create?: string;
}

export function vodWatermarkTemplateTimeoutsToTerraform(struct?: VodWatermarkTemplateTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function vodWatermarkTemplateTimeoutsToHclTerraform(struct?: VodWatermarkTemplateTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VodWatermarkTemplateTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): VodWatermarkTemplateTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VodWatermarkTemplateTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template huaweicloud_vod_watermark_template}
*/
export class VodWatermarkTemplate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_vod_watermark_template";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VodWatermarkTemplate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VodWatermarkTemplate to import
  * @param importFromId The id of the existing VodWatermarkTemplate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VodWatermarkTemplate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_vod_watermark_template", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_watermark_template huaweicloud_vod_watermark_template} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VodWatermarkTemplateConfig
  */
  public constructor(scope: Construct, id: string, config: VodWatermarkTemplateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_vod_watermark_template',
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
    this._height = config.height;
    this._horizontalOffset = config.horizontalOffset;
    this._id = config.id;
    this._imageFile = config.imageFile;
    this._imageProcess = config.imageProcess;
    this._imageType = config.imageType;
    this._name = config.name;
    this._position = config.position;
    this._region = config.region;
    this._timelineDuration = config.timelineDuration;
    this._timelineStart = config.timelineStart;
    this._verticalOffset = config.verticalOffset;
    this._width = config.width;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // height - computed: false, optional: true, required: false
  private _height?: string; 
  public get height() {
    return this.getStringAttribute('height');
  }
  public set height(value: string) {
    this._height = value;
  }
  public resetHeight() {
    this._height = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get heightInput() {
    return this._height;
  }

  // horizontal_offset - computed: false, optional: true, required: false
  private _horizontalOffset?: string; 
  public get horizontalOffset() {
    return this.getStringAttribute('horizontal_offset');
  }
  public set horizontalOffset(value: string) {
    this._horizontalOffset = value;
  }
  public resetHorizontalOffset() {
    this._horizontalOffset = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get horizontalOffsetInput() {
    return this._horizontalOffset;
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

  // image_file - computed: false, optional: false, required: true
  private _imageFile?: string; 
  public get imageFile() {
    return this.getStringAttribute('image_file');
  }
  public set imageFile(value: string) {
    this._imageFile = value;
  }
  // Temporarily expose input value. Use with caution.
  public get imageFileInput() {
    return this._imageFile;
  }

  // image_process - computed: false, optional: true, required: false
  private _imageProcess?: string; 
  public get imageProcess() {
    return this.getStringAttribute('image_process');
  }
  public set imageProcess(value: string) {
    this._imageProcess = value;
  }
  public resetImageProcess() {
    this._imageProcess = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get imageProcessInput() {
    return this._imageProcess;
  }

  // image_type - computed: false, optional: false, required: true
  private _imageType?: string; 
  public get imageType() {
    return this.getStringAttribute('image_type');
  }
  public set imageType(value: string) {
    this._imageType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get imageTypeInput() {
    return this._imageType;
  }

  // image_url - computed: true, optional: false, required: false
  public get imageUrl() {
    return this.getStringAttribute('image_url');
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

  // position - computed: false, optional: true, required: false
  private _position?: string; 
  public get position() {
    return this.getStringAttribute('position');
  }
  public set position(value: string) {
    this._position = value;
  }
  public resetPosition() {
    this._position = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get positionInput() {
    return this._position;
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

  // timeline_duration - computed: false, optional: true, required: false
  private _timelineDuration?: string; 
  public get timelineDuration() {
    return this.getStringAttribute('timeline_duration');
  }
  public set timelineDuration(value: string) {
    this._timelineDuration = value;
  }
  public resetTimelineDuration() {
    this._timelineDuration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timelineDurationInput() {
    return this._timelineDuration;
  }

  // timeline_start - computed: false, optional: true, required: false
  private _timelineStart?: string; 
  public get timelineStart() {
    return this.getStringAttribute('timeline_start');
  }
  public set timelineStart(value: string) {
    this._timelineStart = value;
  }
  public resetTimelineStart() {
    this._timelineStart = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timelineStartInput() {
    return this._timelineStart;
  }

  // vertical_offset - computed: false, optional: true, required: false
  private _verticalOffset?: string; 
  public get verticalOffset() {
    return this.getStringAttribute('vertical_offset');
  }
  public set verticalOffset(value: string) {
    this._verticalOffset = value;
  }
  public resetVerticalOffset() {
    this._verticalOffset = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get verticalOffsetInput() {
    return this._verticalOffset;
  }

  // watermark_type - computed: true, optional: false, required: false
  public get watermarkType() {
    return this.getStringAttribute('watermark_type');
  }

  // width - computed: false, optional: true, required: false
  private _width?: string; 
  public get width() {
    return this.getStringAttribute('width');
  }
  public set width(value: string) {
    this._width = value;
  }
  public resetWidth() {
    this._width = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get widthInput() {
    return this._width;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new VodWatermarkTemplateTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: VodWatermarkTemplateTimeouts) {
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
      height: cdktf.stringToTerraform(this._height),
      horizontal_offset: cdktf.stringToTerraform(this._horizontalOffset),
      id: cdktf.stringToTerraform(this._id),
      image_file: cdktf.stringToTerraform(this._imageFile),
      image_process: cdktf.stringToTerraform(this._imageProcess),
      image_type: cdktf.stringToTerraform(this._imageType),
      name: cdktf.stringToTerraform(this._name),
      position: cdktf.stringToTerraform(this._position),
      region: cdktf.stringToTerraform(this._region),
      timeline_duration: cdktf.stringToTerraform(this._timelineDuration),
      timeline_start: cdktf.stringToTerraform(this._timelineStart),
      vertical_offset: cdktf.stringToTerraform(this._verticalOffset),
      width: cdktf.stringToTerraform(this._width),
      timeouts: vodWatermarkTemplateTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      height: {
        value: cdktf.stringToHclTerraform(this._height),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      horizontal_offset: {
        value: cdktf.stringToHclTerraform(this._horizontalOffset),
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
      image_file: {
        value: cdktf.stringToHclTerraform(this._imageFile),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      image_process: {
        value: cdktf.stringToHclTerraform(this._imageProcess),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      image_type: {
        value: cdktf.stringToHclTerraform(this._imageType),
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
      position: {
        value: cdktf.stringToHclTerraform(this._position),
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
      timeline_duration: {
        value: cdktf.stringToHclTerraform(this._timelineDuration),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeline_start: {
        value: cdktf.stringToHclTerraform(this._timelineStart),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vertical_offset: {
        value: cdktf.stringToHclTerraform(this._verticalOffset),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      width: {
        value: cdktf.stringToHclTerraform(this._width),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeouts: {
        value: vodWatermarkTemplateTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "VodWatermarkTemplateTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

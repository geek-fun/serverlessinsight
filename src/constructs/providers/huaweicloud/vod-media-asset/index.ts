// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VodMediaAssetConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#auto_encrypt VodMediaAsset#auto_encrypt}
  */
  readonly autoEncrypt?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#auto_preload VodMediaAsset#auto_preload}
  */
  readonly autoPreload?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#category_id VodMediaAsset#category_id}
  */
  readonly categoryId?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#description VodMediaAsset#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#id VodMediaAsset#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#input_bucket VodMediaAsset#input_bucket}
  */
  readonly inputBucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#input_path VodMediaAsset#input_path}
  */
  readonly inputPath?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#labels VodMediaAsset#labels}
  */
  readonly labels?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#media_type VodMediaAsset#media_type}
  */
  readonly mediaType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#name VodMediaAsset#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#output_bucket VodMediaAsset#output_bucket}
  */
  readonly outputBucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#output_path VodMediaAsset#output_path}
  */
  readonly outputPath?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#publish VodMediaAsset#publish}
  */
  readonly publish?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#region VodMediaAsset#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#review_template_id VodMediaAsset#review_template_id}
  */
  readonly reviewTemplateId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#storage_mode VodMediaAsset#storage_mode}
  */
  readonly storageMode?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#template_group_name VodMediaAsset#template_group_name}
  */
  readonly templateGroupName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#url VodMediaAsset#url}
  */
  readonly url?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#workflow_name VodMediaAsset#workflow_name}
  */
  readonly workflowName?: string;
  /**
  * thumbnail block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#thumbnail VodMediaAsset#thumbnail}
  */
  readonly thumbnail?: VodMediaAssetThumbnail;
}
export interface VodMediaAssetThumbnail {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#aspect_ratio VodMediaAsset#aspect_ratio}
  */
  readonly aspectRatio?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#cover_position VodMediaAsset#cover_position}
  */
  readonly coverPosition?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#dots VodMediaAsset#dots}
  */
  readonly dots?: number[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#format VodMediaAsset#format}
  */
  readonly format?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#max_length VodMediaAsset#max_length}
  */
  readonly maxLength?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#time VodMediaAsset#time}
  */
  readonly time?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#type VodMediaAsset#type}
  */
  readonly type: string;
}

export function vodMediaAssetThumbnailToTerraform(struct?: VodMediaAssetThumbnailOutputReference | VodMediaAssetThumbnail): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    aspect_ratio: cdktf.numberToTerraform(struct!.aspectRatio),
    cover_position: cdktf.numberToTerraform(struct!.coverPosition),
    dots: cdktf.listMapper(cdktf.numberToTerraform, false)(struct!.dots),
    format: cdktf.numberToTerraform(struct!.format),
    max_length: cdktf.numberToTerraform(struct!.maxLength),
    time: cdktf.numberToTerraform(struct!.time),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function vodMediaAssetThumbnailToHclTerraform(struct?: VodMediaAssetThumbnailOutputReference | VodMediaAssetThumbnail): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    aspect_ratio: {
      value: cdktf.numberToHclTerraform(struct!.aspectRatio),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    cover_position: {
      value: cdktf.numberToHclTerraform(struct!.coverPosition),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    dots: {
      value: cdktf.listMapperHcl(cdktf.numberToHclTerraform, false)(struct!.dots),
      isBlock: false,
      type: "list",
      storageClassType: "numberList",
    },
    format: {
      value: cdktf.numberToHclTerraform(struct!.format),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    max_length: {
      value: cdktf.numberToHclTerraform(struct!.maxLength),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    time: {
      value: cdktf.numberToHclTerraform(struct!.time),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
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

export class VodMediaAssetThumbnailOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): VodMediaAssetThumbnail | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._aspectRatio !== undefined) {
      hasAnyValues = true;
      internalValueResult.aspectRatio = this._aspectRatio;
    }
    if (this._coverPosition !== undefined) {
      hasAnyValues = true;
      internalValueResult.coverPosition = this._coverPosition;
    }
    if (this._dots !== undefined) {
      hasAnyValues = true;
      internalValueResult.dots = this._dots;
    }
    if (this._format !== undefined) {
      hasAnyValues = true;
      internalValueResult.format = this._format;
    }
    if (this._maxLength !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxLength = this._maxLength;
    }
    if (this._time !== undefined) {
      hasAnyValues = true;
      internalValueResult.time = this._time;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VodMediaAssetThumbnail | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._aspectRatio = undefined;
      this._coverPosition = undefined;
      this._dots = undefined;
      this._format = undefined;
      this._maxLength = undefined;
      this._time = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._aspectRatio = value.aspectRatio;
      this._coverPosition = value.coverPosition;
      this._dots = value.dots;
      this._format = value.format;
      this._maxLength = value.maxLength;
      this._time = value.time;
      this._type = value.type;
    }
  }

  // aspect_ratio - computed: false, optional: true, required: false
  private _aspectRatio?: number; 
  public get aspectRatio() {
    return this.getNumberAttribute('aspect_ratio');
  }
  public set aspectRatio(value: number) {
    this._aspectRatio = value;
  }
  public resetAspectRatio() {
    this._aspectRatio = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aspectRatioInput() {
    return this._aspectRatio;
  }

  // cover_position - computed: false, optional: true, required: false
  private _coverPosition?: number; 
  public get coverPosition() {
    return this.getNumberAttribute('cover_position');
  }
  public set coverPosition(value: number) {
    this._coverPosition = value;
  }
  public resetCoverPosition() {
    this._coverPosition = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get coverPositionInput() {
    return this._coverPosition;
  }

  // dots - computed: false, optional: true, required: false
  private _dots?: number[]; 
  public get dots() {
    return this.getNumberListAttribute('dots');
  }
  public set dots(value: number[]) {
    this._dots = value;
  }
  public resetDots() {
    this._dots = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dotsInput() {
    return this._dots;
  }

  // format - computed: false, optional: true, required: false
  private _format?: number; 
  public get format() {
    return this.getNumberAttribute('format');
  }
  public set format(value: number) {
    this._format = value;
  }
  public resetFormat() {
    this._format = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get formatInput() {
    return this._format;
  }

  // max_length - computed: false, optional: true, required: false
  private _maxLength?: number; 
  public get maxLength() {
    return this.getNumberAttribute('max_length');
  }
  public set maxLength(value: number) {
    this._maxLength = value;
  }
  public resetMaxLength() {
    this._maxLength = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxLengthInput() {
    return this._maxLength;
  }

  // time - computed: false, optional: true, required: false
  private _time?: number; 
  public get time() {
    return this.getNumberAttribute('time');
  }
  public set time(value: number) {
    this._time = value;
  }
  public resetTime() {
    this._time = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeInput() {
    return this._time;
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

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset huaweicloud_vod_media_asset}
*/
export class VodMediaAsset extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_vod_media_asset";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VodMediaAsset resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VodMediaAsset to import
  * @param importFromId The id of the existing VodMediaAsset that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VodMediaAsset to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_vod_media_asset", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/vod_media_asset huaweicloud_vod_media_asset} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VodMediaAssetConfig
  */
  public constructor(scope: Construct, id: string, config: VodMediaAssetConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_vod_media_asset',
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
    this._autoEncrypt = config.autoEncrypt;
    this._autoPreload = config.autoPreload;
    this._categoryId = config.categoryId;
    this._description = config.description;
    this._id = config.id;
    this._inputBucket = config.inputBucket;
    this._inputPath = config.inputPath;
    this._labels = config.labels;
    this._mediaType = config.mediaType;
    this._name = config.name;
    this._outputBucket = config.outputBucket;
    this._outputPath = config.outputPath;
    this._publish = config.publish;
    this._region = config.region;
    this._reviewTemplateId = config.reviewTemplateId;
    this._storageMode = config.storageMode;
    this._templateGroupName = config.templateGroupName;
    this._url = config.url;
    this._workflowName = config.workflowName;
    this._thumbnail.internalValue = config.thumbnail;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // auto_preload - computed: false, optional: true, required: false
  private _autoPreload?: boolean | cdktf.IResolvable; 
  public get autoPreload() {
    return this.getBooleanAttribute('auto_preload');
  }
  public set autoPreload(value: boolean | cdktf.IResolvable) {
    this._autoPreload = value;
  }
  public resetAutoPreload() {
    this._autoPreload = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoPreloadInput() {
    return this._autoPreload;
  }

  // category_id - computed: true, optional: true, required: false
  private _categoryId?: number; 
  public get categoryId() {
    return this.getNumberAttribute('category_id');
  }
  public set categoryId(value: number) {
    this._categoryId = value;
  }
  public resetCategoryId() {
    this._categoryId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get categoryIdInput() {
    return this._categoryId;
  }

  // category_name - computed: true, optional: false, required: false
  public get categoryName() {
    return this.getStringAttribute('category_name');
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

  // input_bucket - computed: false, optional: true, required: false
  private _inputBucket?: string; 
  public get inputBucket() {
    return this.getStringAttribute('input_bucket');
  }
  public set inputBucket(value: string) {
    this._inputBucket = value;
  }
  public resetInputBucket() {
    this._inputBucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inputBucketInput() {
    return this._inputBucket;
  }

  // input_path - computed: false, optional: true, required: false
  private _inputPath?: string; 
  public get inputPath() {
    return this.getStringAttribute('input_path');
  }
  public set inputPath(value: string) {
    this._inputPath = value;
  }
  public resetInputPath() {
    this._inputPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inputPathInput() {
    return this._inputPath;
  }

  // labels - computed: false, optional: true, required: false
  private _labels?: string; 
  public get labels() {
    return this.getStringAttribute('labels');
  }
  public set labels(value: string) {
    this._labels = value;
  }
  public resetLabels() {
    this._labels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get labelsInput() {
    return this._labels;
  }

  // media_name - computed: true, optional: false, required: false
  public get mediaName() {
    return this.getStringAttribute('media_name');
  }

  // media_type - computed: false, optional: false, required: true
  private _mediaType?: string; 
  public get mediaType() {
    return this.getStringAttribute('media_type');
  }
  public set mediaType(value: string) {
    this._mediaType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get mediaTypeInput() {
    return this._mediaType;
  }

  // media_url - computed: true, optional: false, required: false
  public get mediaUrl() {
    return this.getStringAttribute('media_url');
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

  // output_bucket - computed: false, optional: true, required: false
  private _outputBucket?: string; 
  public get outputBucket() {
    return this.getStringAttribute('output_bucket');
  }
  public set outputBucket(value: string) {
    this._outputBucket = value;
  }
  public resetOutputBucket() {
    this._outputBucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get outputBucketInput() {
    return this._outputBucket;
  }

  // output_path - computed: false, optional: true, required: false
  private _outputPath?: string; 
  public get outputPath() {
    return this.getStringAttribute('output_path');
  }
  public set outputPath(value: string) {
    this._outputPath = value;
  }
  public resetOutputPath() {
    this._outputPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get outputPathInput() {
    return this._outputPath;
  }

  // publish - computed: false, optional: true, required: false
  private _publish?: boolean | cdktf.IResolvable; 
  public get publish() {
    return this.getBooleanAttribute('publish');
  }
  public set publish(value: boolean | cdktf.IResolvable) {
    this._publish = value;
  }
  public resetPublish() {
    this._publish = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publishInput() {
    return this._publish;
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

  // review_template_id - computed: false, optional: true, required: false
  private _reviewTemplateId?: string; 
  public get reviewTemplateId() {
    return this.getStringAttribute('review_template_id');
  }
  public set reviewTemplateId(value: string) {
    this._reviewTemplateId = value;
  }
  public resetReviewTemplateId() {
    this._reviewTemplateId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get reviewTemplateIdInput() {
    return this._reviewTemplateId;
  }

  // storage_mode - computed: false, optional: true, required: false
  private _storageMode?: number; 
  public get storageMode() {
    return this.getNumberAttribute('storage_mode');
  }
  public set storageMode(value: number) {
    this._storageMode = value;
  }
  public resetStorageMode() {
    this._storageMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storageModeInput() {
    return this._storageMode;
  }

  // template_group_name - computed: false, optional: true, required: false
  private _templateGroupName?: string; 
  public get templateGroupName() {
    return this.getStringAttribute('template_group_name');
  }
  public set templateGroupName(value: string) {
    this._templateGroupName = value;
  }
  public resetTemplateGroupName() {
    this._templateGroupName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateGroupNameInput() {
    return this._templateGroupName;
  }

  // url - computed: false, optional: true, required: false
  private _url?: string; 
  public get url() {
    return this.getStringAttribute('url');
  }
  public set url(value: string) {
    this._url = value;
  }
  public resetUrl() {
    this._url = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get urlInput() {
    return this._url;
  }

  // workflow_name - computed: false, optional: true, required: false
  private _workflowName?: string; 
  public get workflowName() {
    return this.getStringAttribute('workflow_name');
  }
  public set workflowName(value: string) {
    this._workflowName = value;
  }
  public resetWorkflowName() {
    this._workflowName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get workflowNameInput() {
    return this._workflowName;
  }

  // thumbnail - computed: false, optional: true, required: false
  private _thumbnail = new VodMediaAssetThumbnailOutputReference(this, "thumbnail");
  public get thumbnail() {
    return this._thumbnail;
  }
  public putThumbnail(value: VodMediaAssetThumbnail) {
    this._thumbnail.internalValue = value;
  }
  public resetThumbnail() {
    this._thumbnail.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get thumbnailInput() {
    return this._thumbnail.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auto_encrypt: cdktf.booleanToTerraform(this._autoEncrypt),
      auto_preload: cdktf.booleanToTerraform(this._autoPreload),
      category_id: cdktf.numberToTerraform(this._categoryId),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      input_bucket: cdktf.stringToTerraform(this._inputBucket),
      input_path: cdktf.stringToTerraform(this._inputPath),
      labels: cdktf.stringToTerraform(this._labels),
      media_type: cdktf.stringToTerraform(this._mediaType),
      name: cdktf.stringToTerraform(this._name),
      output_bucket: cdktf.stringToTerraform(this._outputBucket),
      output_path: cdktf.stringToTerraform(this._outputPath),
      publish: cdktf.booleanToTerraform(this._publish),
      region: cdktf.stringToTerraform(this._region),
      review_template_id: cdktf.stringToTerraform(this._reviewTemplateId),
      storage_mode: cdktf.numberToTerraform(this._storageMode),
      template_group_name: cdktf.stringToTerraform(this._templateGroupName),
      url: cdktf.stringToTerraform(this._url),
      workflow_name: cdktf.stringToTerraform(this._workflowName),
      thumbnail: vodMediaAssetThumbnailToTerraform(this._thumbnail.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auto_encrypt: {
        value: cdktf.booleanToHclTerraform(this._autoEncrypt),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      auto_preload: {
        value: cdktf.booleanToHclTerraform(this._autoPreload),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      category_id: {
        value: cdktf.numberToHclTerraform(this._categoryId),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      input_bucket: {
        value: cdktf.stringToHclTerraform(this._inputBucket),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      input_path: {
        value: cdktf.stringToHclTerraform(this._inputPath),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      labels: {
        value: cdktf.stringToHclTerraform(this._labels),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      media_type: {
        value: cdktf.stringToHclTerraform(this._mediaType),
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
      output_bucket: {
        value: cdktf.stringToHclTerraform(this._outputBucket),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      output_path: {
        value: cdktf.stringToHclTerraform(this._outputPath),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      publish: {
        value: cdktf.booleanToHclTerraform(this._publish),
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
      review_template_id: {
        value: cdktf.stringToHclTerraform(this._reviewTemplateId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      storage_mode: {
        value: cdktf.numberToHclTerraform(this._storageMode),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      template_group_name: {
        value: cdktf.stringToHclTerraform(this._templateGroupName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      url: {
        value: cdktf.stringToHclTerraform(this._url),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      workflow_name: {
        value: cdktf.stringToHclTerraform(this._workflowName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      thumbnail: {
        value: vodMediaAssetThumbnailToHclTerraform(this._thumbnail.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VodMediaAssetThumbnailList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

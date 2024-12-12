// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IotdaUpgradePackageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#custom_info IotdaUpgradePackage#custom_info}
  */
  readonly customInfo?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#description IotdaUpgradePackage#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#id IotdaUpgradePackage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#product_id IotdaUpgradePackage#product_id}
  */
  readonly productId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#region IotdaUpgradePackage#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#space_id IotdaUpgradePackage#space_id}
  */
  readonly spaceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#support_source_versions IotdaUpgradePackage#support_source_versions}
  */
  readonly supportSourceVersions?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#type IotdaUpgradePackage#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#version IotdaUpgradePackage#version}
  */
  readonly version: string;
  /**
  * file_location block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#file_location IotdaUpgradePackage#file_location}
  */
  readonly fileLocation: IotdaUpgradePackageFileLocation[] | cdktf.IResolvable;
}
export interface IotdaUpgradePackageFileLocationObsLocation {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#bucket_name IotdaUpgradePackage#bucket_name}
  */
  readonly bucketName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#object_key IotdaUpgradePackage#object_key}
  */
  readonly objectKey: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#region IotdaUpgradePackage#region}
  */
  readonly region: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#sign IotdaUpgradePackage#sign}
  */
  readonly sign?: string;
}

export function iotdaUpgradePackageFileLocationObsLocationToTerraform(struct?: IotdaUpgradePackageFileLocationObsLocationOutputReference | IotdaUpgradePackageFileLocationObsLocation): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bucket_name: cdktf.stringToTerraform(struct!.bucketName),
    object_key: cdktf.stringToTerraform(struct!.objectKey),
    region: cdktf.stringToTerraform(struct!.region),
    sign: cdktf.stringToTerraform(struct!.sign),
  }
}


export function iotdaUpgradePackageFileLocationObsLocationToHclTerraform(struct?: IotdaUpgradePackageFileLocationObsLocationOutputReference | IotdaUpgradePackageFileLocationObsLocation): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bucket_name: {
      value: cdktf.stringToHclTerraform(struct!.bucketName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    object_key: {
      value: cdktf.stringToHclTerraform(struct!.objectKey),
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
    sign: {
      value: cdktf.stringToHclTerraform(struct!.sign),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaUpgradePackageFileLocationObsLocationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotdaUpgradePackageFileLocationObsLocation | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bucketName !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucketName = this._bucketName;
    }
    if (this._objectKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.objectKey = this._objectKey;
    }
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._sign !== undefined) {
      hasAnyValues = true;
      internalValueResult.sign = this._sign;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaUpgradePackageFileLocationObsLocation | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bucketName = undefined;
      this._objectKey = undefined;
      this._region = undefined;
      this._sign = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bucketName = value.bucketName;
      this._objectKey = value.objectKey;
      this._region = value.region;
      this._sign = value.sign;
    }
  }

  // bucket_name - computed: false, optional: false, required: true
  private _bucketName?: string; 
  public get bucketName() {
    return this.getStringAttribute('bucket_name');
  }
  public set bucketName(value: string) {
    this._bucketName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketNameInput() {
    return this._bucketName;
  }

  // object_key - computed: false, optional: false, required: true
  private _objectKey?: string; 
  public get objectKey() {
    return this.getStringAttribute('object_key');
  }
  public set objectKey(value: string) {
    this._objectKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get objectKeyInput() {
    return this._objectKey;
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

  // sign - computed: true, optional: true, required: false
  private _sign?: string; 
  public get sign() {
    return this.getStringAttribute('sign');
  }
  public set sign(value: string) {
    this._sign = value;
  }
  public resetSign() {
    this._sign = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get signInput() {
    return this._sign;
  }
}
export interface IotdaUpgradePackageFileLocation {
  /**
  * obs_location block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#obs_location IotdaUpgradePackage#obs_location}
  */
  readonly obsLocation?: IotdaUpgradePackageFileLocationObsLocation;
}

export function iotdaUpgradePackageFileLocationToTerraform(struct?: IotdaUpgradePackageFileLocation | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    obs_location: iotdaUpgradePackageFileLocationObsLocationToTerraform(struct!.obsLocation),
  }
}


export function iotdaUpgradePackageFileLocationToHclTerraform(struct?: IotdaUpgradePackageFileLocation | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    obs_location: {
      value: iotdaUpgradePackageFileLocationObsLocationToHclTerraform(struct!.obsLocation),
      isBlock: true,
      type: "list",
      storageClassType: "IotdaUpgradePackageFileLocationObsLocationList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotdaUpgradePackageFileLocationOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): IotdaUpgradePackageFileLocation | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._obsLocation?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.obsLocation = this._obsLocation?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotdaUpgradePackageFileLocation | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._obsLocation.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._obsLocation.internalValue = value.obsLocation;
    }
  }

  // obs_location - computed: false, optional: true, required: false
  private _obsLocation = new IotdaUpgradePackageFileLocationObsLocationOutputReference(this, "obs_location");
  public get obsLocation() {
    return this._obsLocation;
  }
  public putObsLocation(value: IotdaUpgradePackageFileLocationObsLocation) {
    this._obsLocation.internalValue = value;
  }
  public resetObsLocation() {
    this._obsLocation.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsLocationInput() {
    return this._obsLocation.internalValue;
  }
}

export class IotdaUpgradePackageFileLocationList extends cdktf.ComplexList {
  public internalValue? : IotdaUpgradePackageFileLocation[] | cdktf.IResolvable

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
  public get(index: number): IotdaUpgradePackageFileLocationOutputReference {
    return new IotdaUpgradePackageFileLocationOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package huaweicloud_iotda_upgrade_package}
*/
export class IotdaUpgradePackage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_iotda_upgrade_package";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IotdaUpgradePackage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IotdaUpgradePackage to import
  * @param importFromId The id of the existing IotdaUpgradePackage that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IotdaUpgradePackage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_iotda_upgrade_package", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iotda_upgrade_package huaweicloud_iotda_upgrade_package} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IotdaUpgradePackageConfig
  */
  public constructor(scope: Construct, id: string, config: IotdaUpgradePackageConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_iotda_upgrade_package',
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
    this._customInfo = config.customInfo;
    this._description = config.description;
    this._id = config.id;
    this._productId = config.productId;
    this._region = config.region;
    this._spaceId = config.spaceId;
    this._supportSourceVersions = config.supportSourceVersions;
    this._type = config.type;
    this._version = config.version;
    this._fileLocation.internalValue = config.fileLocation;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // custom_info - computed: false, optional: true, required: false
  private _customInfo?: string; 
  public get customInfo() {
    return this.getStringAttribute('custom_info');
  }
  public set customInfo(value: string) {
    this._customInfo = value;
  }
  public resetCustomInfo() {
    this._customInfo = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customInfoInput() {
    return this._customInfo;
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

  // product_id - computed: false, optional: false, required: true
  private _productId?: string; 
  public get productId() {
    return this.getStringAttribute('product_id');
  }
  public set productId(value: string) {
    this._productId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get productIdInput() {
    return this._productId;
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

  // space_id - computed: false, optional: false, required: true
  private _spaceId?: string; 
  public get spaceId() {
    return this.getStringAttribute('space_id');
  }
  public set spaceId(value: string) {
    this._spaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get spaceIdInput() {
    return this._spaceId;
  }

  // support_source_versions - computed: false, optional: true, required: false
  private _supportSourceVersions?: string[]; 
  public get supportSourceVersions() {
    return this.getListAttribute('support_source_versions');
  }
  public set supportSourceVersions(value: string[]) {
    this._supportSourceVersions = value;
  }
  public resetSupportSourceVersions() {
    this._supportSourceVersions = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get supportSourceVersionsInput() {
    return this._supportSourceVersions;
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

  // version - computed: false, optional: false, required: true
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // file_location - computed: false, optional: false, required: true
  private _fileLocation = new IotdaUpgradePackageFileLocationList(this, "file_location", false);
  public get fileLocation() {
    return this._fileLocation;
  }
  public putFileLocation(value: IotdaUpgradePackageFileLocation[] | cdktf.IResolvable) {
    this._fileLocation.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fileLocationInput() {
    return this._fileLocation.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      custom_info: cdktf.stringToTerraform(this._customInfo),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      product_id: cdktf.stringToTerraform(this._productId),
      region: cdktf.stringToTerraform(this._region),
      space_id: cdktf.stringToTerraform(this._spaceId),
      support_source_versions: cdktf.listMapper(cdktf.stringToTerraform, false)(this._supportSourceVersions),
      type: cdktf.stringToTerraform(this._type),
      version: cdktf.stringToTerraform(this._version),
      file_location: cdktf.listMapper(iotdaUpgradePackageFileLocationToTerraform, true)(this._fileLocation.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      custom_info: {
        value: cdktf.stringToHclTerraform(this._customInfo),
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
      product_id: {
        value: cdktf.stringToHclTerraform(this._productId),
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
      space_id: {
        value: cdktf.stringToHclTerraform(this._spaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      support_source_versions: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._supportSourceVersions),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      version: {
        value: cdktf.stringToHclTerraform(this._version),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      file_location: {
        value: cdktf.listMapperHcl(iotdaUpgradePackageFileLocationToHclTerraform, true)(this._fileLocation.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "IotdaUpgradePackageFileLocationList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

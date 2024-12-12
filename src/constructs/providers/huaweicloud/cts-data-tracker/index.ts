// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CtsDataTrackerConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#bucket_name CtsDataTracker#bucket_name}
  */
  readonly bucketName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#compress_type CtsDataTracker#compress_type}
  */
  readonly compressType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#data_bucket CtsDataTracker#data_bucket}
  */
  readonly dataBucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#data_operation CtsDataTracker#data_operation}
  */
  readonly dataOperation?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#enabled CtsDataTracker#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#file_prefix CtsDataTracker#file_prefix}
  */
  readonly filePrefix?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#id CtsDataTracker#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#is_sort_by_service CtsDataTracker#is_sort_by_service}
  */
  readonly isSortByService?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#lts_enabled CtsDataTracker#lts_enabled}
  */
  readonly ltsEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#name CtsDataTracker#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#obs_retention_period CtsDataTracker#obs_retention_period}
  */
  readonly obsRetentionPeriod?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#region CtsDataTracker#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#tags CtsDataTracker#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#validate_file CtsDataTracker#validate_file}
  */
  readonly validateFile?: boolean | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#timeouts CtsDataTracker#timeouts}
  */
  readonly timeouts?: CtsDataTrackerTimeouts;
}
export interface CtsDataTrackerTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#create CtsDataTracker#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#delete CtsDataTracker#delete}
  */
  readonly delete?: string;
}

export function ctsDataTrackerTimeoutsToTerraform(struct?: CtsDataTrackerTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function ctsDataTrackerTimeoutsToHclTerraform(struct?: CtsDataTrackerTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CtsDataTrackerTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): CtsDataTrackerTimeouts | cdktf.IResolvable | undefined {
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
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CtsDataTrackerTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker huaweicloud_cts_data_tracker}
*/
export class CtsDataTracker extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cts_data_tracker";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CtsDataTracker resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CtsDataTracker to import
  * @param importFromId The id of the existing CtsDataTracker that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CtsDataTracker to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cts_data_tracker", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cts_data_tracker huaweicloud_cts_data_tracker} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CtsDataTrackerConfig
  */
  public constructor(scope: Construct, id: string, config: CtsDataTrackerConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cts_data_tracker',
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
    this._bucketName = config.bucketName;
    this._compressType = config.compressType;
    this._dataBucket = config.dataBucket;
    this._dataOperation = config.dataOperation;
    this._enabled = config.enabled;
    this._filePrefix = config.filePrefix;
    this._id = config.id;
    this._isSortByService = config.isSortByService;
    this._ltsEnabled = config.ltsEnabled;
    this._name = config.name;
    this._obsRetentionPeriod = config.obsRetentionPeriod;
    this._region = config.region;
    this._tags = config.tags;
    this._validateFile = config.validateFile;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // agency_name - computed: true, optional: false, required: false
  public get agencyName() {
    return this.getStringAttribute('agency_name');
  }

  // bucket_name - computed: false, optional: true, required: false
  private _bucketName?: string; 
  public get bucketName() {
    return this.getStringAttribute('bucket_name');
  }
  public set bucketName(value: string) {
    this._bucketName = value;
  }
  public resetBucketName() {
    this._bucketName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketNameInput() {
    return this._bucketName;
  }

  // compress_type - computed: false, optional: true, required: false
  private _compressType?: string; 
  public get compressType() {
    return this.getStringAttribute('compress_type');
  }
  public set compressType(value: string) {
    this._compressType = value;
  }
  public resetCompressType() {
    this._compressType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get compressTypeInput() {
    return this._compressType;
  }

  // data_bucket - computed: false, optional: false, required: true
  private _dataBucket?: string; 
  public get dataBucket() {
    return this.getStringAttribute('data_bucket');
  }
  public set dataBucket(value: string) {
    this._dataBucket = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataBucketInput() {
    return this._dataBucket;
  }

  // data_operation - computed: true, optional: true, required: false
  private _dataOperation?: string[]; 
  public get dataOperation() {
    return this.getListAttribute('data_operation');
  }
  public set dataOperation(value: string[]) {
    this._dataOperation = value;
  }
  public resetDataOperation() {
    this._dataOperation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataOperationInput() {
    return this._dataOperation;
  }

  // enabled - computed: false, optional: true, required: false
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  public resetEnabled() {
    this._enabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // file_prefix - computed: false, optional: true, required: false
  private _filePrefix?: string; 
  public get filePrefix() {
    return this.getStringAttribute('file_prefix');
  }
  public set filePrefix(value: string) {
    this._filePrefix = value;
  }
  public resetFilePrefix() {
    this._filePrefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get filePrefixInput() {
    return this._filePrefix;
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

  // is_sort_by_service - computed: false, optional: true, required: false
  private _isSortByService?: boolean | cdktf.IResolvable; 
  public get isSortByService() {
    return this.getBooleanAttribute('is_sort_by_service');
  }
  public set isSortByService(value: boolean | cdktf.IResolvable) {
    this._isSortByService = value;
  }
  public resetIsSortByService() {
    this._isSortByService = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isSortByServiceInput() {
    return this._isSortByService;
  }

  // lts_enabled - computed: false, optional: true, required: false
  private _ltsEnabled?: boolean | cdktf.IResolvable; 
  public get ltsEnabled() {
    return this.getBooleanAttribute('lts_enabled');
  }
  public set ltsEnabled(value: boolean | cdktf.IResolvable) {
    this._ltsEnabled = value;
  }
  public resetLtsEnabled() {
    this._ltsEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ltsEnabledInput() {
    return this._ltsEnabled;
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

  // obs_retention_period - computed: false, optional: true, required: false
  private _obsRetentionPeriod?: number; 
  public get obsRetentionPeriod() {
    return this.getNumberAttribute('obs_retention_period');
  }
  public set obsRetentionPeriod(value: number) {
    this._obsRetentionPeriod = value;
  }
  public resetObsRetentionPeriod() {
    this._obsRetentionPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get obsRetentionPeriodInput() {
    return this._obsRetentionPeriod;
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // transfer_enabled - computed: true, optional: false, required: false
  public get transferEnabled() {
    return this.getBooleanAttribute('transfer_enabled');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // validate_file - computed: false, optional: true, required: false
  private _validateFile?: boolean | cdktf.IResolvable; 
  public get validateFile() {
    return this.getBooleanAttribute('validate_file');
  }
  public set validateFile(value: boolean | cdktf.IResolvable) {
    this._validateFile = value;
  }
  public resetValidateFile() {
    this._validateFile = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get validateFileInput() {
    return this._validateFile;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new CtsDataTrackerTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: CtsDataTrackerTimeouts) {
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
      bucket_name: cdktf.stringToTerraform(this._bucketName),
      compress_type: cdktf.stringToTerraform(this._compressType),
      data_bucket: cdktf.stringToTerraform(this._dataBucket),
      data_operation: cdktf.listMapper(cdktf.stringToTerraform, false)(this._dataOperation),
      enabled: cdktf.booleanToTerraform(this._enabled),
      file_prefix: cdktf.stringToTerraform(this._filePrefix),
      id: cdktf.stringToTerraform(this._id),
      is_sort_by_service: cdktf.booleanToTerraform(this._isSortByService),
      lts_enabled: cdktf.booleanToTerraform(this._ltsEnabled),
      name: cdktf.stringToTerraform(this._name),
      obs_retention_period: cdktf.numberToTerraform(this._obsRetentionPeriod),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      validate_file: cdktf.booleanToTerraform(this._validateFile),
      timeouts: ctsDataTrackerTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      bucket_name: {
        value: cdktf.stringToHclTerraform(this._bucketName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      compress_type: {
        value: cdktf.stringToHclTerraform(this._compressType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      data_bucket: {
        value: cdktf.stringToHclTerraform(this._dataBucket),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      data_operation: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._dataOperation),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      enabled: {
        value: cdktf.booleanToHclTerraform(this._enabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      file_prefix: {
        value: cdktf.stringToHclTerraform(this._filePrefix),
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
      is_sort_by_service: {
        value: cdktf.booleanToHclTerraform(this._isSortByService),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      lts_enabled: {
        value: cdktf.booleanToHclTerraform(this._ltsEnabled),
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
      obs_retention_period: {
        value: cdktf.numberToHclTerraform(this._obsRetentionPeriod),
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
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      validate_file: {
        value: cdktf.booleanToHclTerraform(this._validateFile),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      timeouts: {
        value: ctsDataTrackerTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "CtsDataTrackerTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

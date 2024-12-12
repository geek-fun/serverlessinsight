// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DisStreamV2Config extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#auto_scale_max_partition_count DisStreamV2#auto_scale_max_partition_count}
  */
  readonly autoScaleMaxPartitionCount?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#auto_scale_min_partition_count DisStreamV2#auto_scale_min_partition_count}
  */
  readonly autoScaleMinPartitionCount?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#compression_format DisStreamV2#compression_format}
  */
  readonly compressionFormat?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#csv_delimiter DisStreamV2#csv_delimiter}
  */
  readonly csvDelimiter?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#data_schema DisStreamV2#data_schema}
  */
  readonly dataSchema?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#data_type DisStreamV2#data_type}
  */
  readonly dataType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#enterprise_project_id DisStreamV2#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#id DisStreamV2#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#partition_count DisStreamV2#partition_count}
  */
  readonly partitionCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#region DisStreamV2#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#retention_period DisStreamV2#retention_period}
  */
  readonly retentionPeriod?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#stream_name DisStreamV2#stream_name}
  */
  readonly streamName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#stream_type DisStreamV2#stream_type}
  */
  readonly streamType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#tags DisStreamV2#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#timeouts DisStreamV2#timeouts}
  */
  readonly timeouts?: DisStreamV2Timeouts;
}
export interface DisStreamV2Partitions {
}

export function disStreamV2PartitionsToTerraform(struct?: DisStreamV2Partitions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function disStreamV2PartitionsToHclTerraform(struct?: DisStreamV2Partitions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DisStreamV2PartitionsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DisStreamV2Partitions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DisStreamV2Partitions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // hash_range - computed: true, optional: false, required: false
  public get hashRange() {
    return this.getStringAttribute('hash_range');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // sequence_number_range - computed: true, optional: false, required: false
  public get sequenceNumberRange() {
    return this.getStringAttribute('sequence_number_range');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }
}

export class DisStreamV2PartitionsList extends cdktf.ComplexList {

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
  public get(index: number): DisStreamV2PartitionsOutputReference {
    return new DisStreamV2PartitionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DisStreamV2Timeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#update DisStreamV2#update}
  */
  readonly update?: string;
}

export function disStreamV2TimeoutsToTerraform(struct?: DisStreamV2Timeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function disStreamV2TimeoutsToHclTerraform(struct?: DisStreamV2Timeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DisStreamV2TimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DisStreamV2Timeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DisStreamV2Timeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._update = value.update;
    }
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2 huaweicloud_dis_stream_v2}
*/
export class DisStreamV2 extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dis_stream_v2";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DisStreamV2 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DisStreamV2 to import
  * @param importFromId The id of the existing DisStreamV2 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DisStreamV2 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dis_stream_v2", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dis_stream_v2 huaweicloud_dis_stream_v2} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DisStreamV2Config
  */
  public constructor(scope: Construct, id: string, config: DisStreamV2Config) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dis_stream_v2',
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
    this._autoScaleMaxPartitionCount = config.autoScaleMaxPartitionCount;
    this._autoScaleMinPartitionCount = config.autoScaleMinPartitionCount;
    this._compressionFormat = config.compressionFormat;
    this._csvDelimiter = config.csvDelimiter;
    this._dataSchema = config.dataSchema;
    this._dataType = config.dataType;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._partitionCount = config.partitionCount;
    this._region = config.region;
    this._retentionPeriod = config.retentionPeriod;
    this._streamName = config.streamName;
    this._streamType = config.streamType;
    this._tags = config.tags;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // auto_scale_max_partition_count - computed: true, optional: true, required: false
  private _autoScaleMaxPartitionCount?: number; 
  public get autoScaleMaxPartitionCount() {
    return this.getNumberAttribute('auto_scale_max_partition_count');
  }
  public set autoScaleMaxPartitionCount(value: number) {
    this._autoScaleMaxPartitionCount = value;
  }
  public resetAutoScaleMaxPartitionCount() {
    this._autoScaleMaxPartitionCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoScaleMaxPartitionCountInput() {
    return this._autoScaleMaxPartitionCount;
  }

  // auto_scale_min_partition_count - computed: true, optional: true, required: false
  private _autoScaleMinPartitionCount?: number; 
  public get autoScaleMinPartitionCount() {
    return this.getNumberAttribute('auto_scale_min_partition_count');
  }
  public set autoScaleMinPartitionCount(value: number) {
    this._autoScaleMinPartitionCount = value;
  }
  public resetAutoScaleMinPartitionCount() {
    this._autoScaleMinPartitionCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoScaleMinPartitionCountInput() {
    return this._autoScaleMinPartitionCount;
  }

  // compression_format - computed: true, optional: true, required: false
  private _compressionFormat?: string; 
  public get compressionFormat() {
    return this.getStringAttribute('compression_format');
  }
  public set compressionFormat(value: string) {
    this._compressionFormat = value;
  }
  public resetCompressionFormat() {
    this._compressionFormat = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get compressionFormatInput() {
    return this._compressionFormat;
  }

  // created - computed: true, optional: false, required: false
  public get created() {
    return this.getNumberAttribute('created');
  }

  // csv_delimiter - computed: true, optional: true, required: false
  private _csvDelimiter?: string; 
  public get csvDelimiter() {
    return this.getStringAttribute('csv_delimiter');
  }
  public set csvDelimiter(value: string) {
    this._csvDelimiter = value;
  }
  public resetCsvDelimiter() {
    this._csvDelimiter = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get csvDelimiterInput() {
    return this._csvDelimiter;
  }

  // data_schema - computed: true, optional: true, required: false
  private _dataSchema?: string; 
  public get dataSchema() {
    return this.getStringAttribute('data_schema');
  }
  public set dataSchema(value: string) {
    this._dataSchema = value;
  }
  public resetDataSchema() {
    this._dataSchema = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataSchemaInput() {
    return this._dataSchema;
  }

  // data_type - computed: true, optional: true, required: false
  private _dataType?: string; 
  public get dataType() {
    return this.getStringAttribute('data_type');
  }
  public set dataType(value: string) {
    this._dataType = value;
  }
  public resetDataType() {
    this._dataType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataTypeInput() {
    return this._dataType;
  }

  // enterprise_project_id - computed: true, optional: true, required: false
  private _enterpriseProjectId?: string; 
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }
  public set enterpriseProjectId(value: string) {
    this._enterpriseProjectId = value;
  }
  public resetEnterpriseProjectId() {
    this._enterpriseProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseProjectIdInput() {
    return this._enterpriseProjectId;
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

  // partition_count - computed: false, optional: false, required: true
  private _partitionCount?: number; 
  public get partitionCount() {
    return this.getNumberAttribute('partition_count');
  }
  public set partitionCount(value: number) {
    this._partitionCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get partitionCountInput() {
    return this._partitionCount;
  }

  // partitions - computed: true, optional: false, required: false
  private _partitions = new DisStreamV2PartitionsList(this, "partitions", false);
  public get partitions() {
    return this._partitions;
  }

  // readable_partition_count - computed: true, optional: false, required: false
  public get readablePartitionCount() {
    return this.getNumberAttribute('readable_partition_count');
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

  // retention_period - computed: false, optional: true, required: false
  private _retentionPeriod?: number; 
  public get retentionPeriod() {
    return this.getNumberAttribute('retention_period');
  }
  public set retentionPeriod(value: number) {
    this._retentionPeriod = value;
  }
  public resetRetentionPeriod() {
    this._retentionPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retentionPeriodInput() {
    return this._retentionPeriod;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // stream_id - computed: true, optional: false, required: false
  public get streamId() {
    return this.getStringAttribute('stream_id');
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

  // stream_type - computed: true, optional: true, required: false
  private _streamType?: string; 
  public get streamType() {
    return this.getStringAttribute('stream_type');
  }
  public set streamType(value: string) {
    this._streamType = value;
  }
  public resetStreamType() {
    this._streamType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get streamTypeInput() {
    return this._streamType;
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

  // writable_partition_count - computed: true, optional: false, required: false
  public get writablePartitionCount() {
    return this.getNumberAttribute('writable_partition_count');
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DisStreamV2TimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DisStreamV2Timeouts) {
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
      auto_scale_max_partition_count: cdktf.numberToTerraform(this._autoScaleMaxPartitionCount),
      auto_scale_min_partition_count: cdktf.numberToTerraform(this._autoScaleMinPartitionCount),
      compression_format: cdktf.stringToTerraform(this._compressionFormat),
      csv_delimiter: cdktf.stringToTerraform(this._csvDelimiter),
      data_schema: cdktf.stringToTerraform(this._dataSchema),
      data_type: cdktf.stringToTerraform(this._dataType),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      partition_count: cdktf.numberToTerraform(this._partitionCount),
      region: cdktf.stringToTerraform(this._region),
      retention_period: cdktf.numberToTerraform(this._retentionPeriod),
      stream_name: cdktf.stringToTerraform(this._streamName),
      stream_type: cdktf.stringToTerraform(this._streamType),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      timeouts: disStreamV2TimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auto_scale_max_partition_count: {
        value: cdktf.numberToHclTerraform(this._autoScaleMaxPartitionCount),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      auto_scale_min_partition_count: {
        value: cdktf.numberToHclTerraform(this._autoScaleMinPartitionCount),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      compression_format: {
        value: cdktf.stringToHclTerraform(this._compressionFormat),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      csv_delimiter: {
        value: cdktf.stringToHclTerraform(this._csvDelimiter),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      data_schema: {
        value: cdktf.stringToHclTerraform(this._dataSchema),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      data_type: {
        value: cdktf.stringToHclTerraform(this._dataType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
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
      partition_count: {
        value: cdktf.numberToHclTerraform(this._partitionCount),
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
      retention_period: {
        value: cdktf.numberToHclTerraform(this._retentionPeriod),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      stream_name: {
        value: cdktf.stringToHclTerraform(this._streamName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      stream_type: {
        value: cdktf.stringToHclTerraform(this._streamType),
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
      timeouts: {
        value: disStreamV2TimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DisStreamV2Timeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

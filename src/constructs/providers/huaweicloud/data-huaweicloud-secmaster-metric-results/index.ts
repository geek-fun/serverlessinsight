// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudSecmasterMetricResultsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies whether the cache is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results#cache DataHuaweicloudSecmasterMetricResults#cache}
  */
  readonly cache?: string;
  /**
  * Specifies the indicator card IDs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results#field_ids DataHuaweicloudSecmasterMetricResults#field_ids}
  */
  readonly fieldIds?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results#id DataHuaweicloudSecmasterMetricResults#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the interactive parameters.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results#interactive_params DataHuaweicloudSecmasterMetricResults#interactive_params}
  */
  readonly interactiveParams?: { [key: string]: string }[] | cdktf.IResolvable;
  /**
  * Specifies the metrics IDs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results#metric_ids DataHuaweicloudSecmasterMetricResults#metric_ids}
  */
  readonly metricIds: string[];
  /**
  * Specifies the parameter list of the metric.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results#params DataHuaweicloudSecmasterMetricResults#params}
  */
  readonly params?: { [key: string]: string }[] | cdktf.IResolvable;
  /**
  * Specifies the region in which to query the data source. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results#region DataHuaweicloudSecmasterMetricResults#region}
  */
  readonly region?: string;
  /**
  * Specifies the time range for querying metrics.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results#timespan DataHuaweicloudSecmasterMetricResults#timespan}
  */
  readonly timespan?: string;
  /**
  * Specifies the workspace ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results#workspace_id DataHuaweicloudSecmasterMetricResults#workspace_id}
  */
  readonly workspaceId: string;
}
export interface DataHuaweicloudSecmasterMetricResultsMetricResultsDataRows {
}

export function dataHuaweicloudSecmasterMetricResultsMetricResultsDataRowsToTerraform(struct?: DataHuaweicloudSecmasterMetricResultsMetricResultsDataRows): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterMetricResultsMetricResultsDataRowsToHclTerraform(struct?: DataHuaweicloudSecmasterMetricResultsMetricResultsDataRows): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterMetricResultsMetricResultsDataRowsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterMetricResultsMetricResultsDataRows | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterMetricResultsMetricResultsDataRows | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // data_row - computed: true, optional: false, required: false
  public get dataRow() {
    return this.getListAttribute('data_row');
  }
}

export class DataHuaweicloudSecmasterMetricResultsMetricResultsDataRowsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterMetricResultsMetricResultsDataRowsOutputReference {
    return new DataHuaweicloudSecmasterMetricResultsMetricResultsDataRowsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudSecmasterMetricResultsMetricResults {
}

export function dataHuaweicloudSecmasterMetricResultsMetricResultsToTerraform(struct?: DataHuaweicloudSecmasterMetricResultsMetricResults): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterMetricResultsMetricResultsToHclTerraform(struct?: DataHuaweicloudSecmasterMetricResultsMetricResults): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterMetricResultsMetricResultsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterMetricResultsMetricResults | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterMetricResultsMetricResults | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // data_rows - computed: true, optional: false, required: false
  private _dataRows = new DataHuaweicloudSecmasterMetricResultsMetricResultsDataRowsList(this, "data_rows", false);
  public get dataRows() {
    return this._dataRows;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // labels - computed: true, optional: false, required: false
  public get labels() {
    return this.getListAttribute('labels');
  }
}

export class DataHuaweicloudSecmasterMetricResultsMetricResultsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterMetricResultsMetricResultsOutputReference {
    return new DataHuaweicloudSecmasterMetricResultsMetricResultsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results huaweicloud_secmaster_metric_results}
*/
export class DataHuaweicloudSecmasterMetricResults extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_metric_results";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudSecmasterMetricResults resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudSecmasterMetricResults to import
  * @param importFromId The id of the existing DataHuaweicloudSecmasterMetricResults that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudSecmasterMetricResults to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_metric_results", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_metric_results huaweicloud_secmaster_metric_results} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudSecmasterMetricResultsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudSecmasterMetricResultsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_metric_results',
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
    this._cache = config.cache;
    this._fieldIds = config.fieldIds;
    this._id = config.id;
    this._interactiveParams = config.interactiveParams;
    this._metricIds = config.metricIds;
    this._params = config.params;
    this._region = config.region;
    this._timespan = config.timespan;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cache - computed: false, optional: true, required: false
  private _cache?: string; 
  public get cache() {
    return this.getStringAttribute('cache');
  }
  public set cache(value: string) {
    this._cache = value;
  }
  public resetCache() {
    this._cache = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cacheInput() {
    return this._cache;
  }

  // field_ids - computed: false, optional: true, required: false
  private _fieldIds?: string[]; 
  public get fieldIds() {
    return this.getListAttribute('field_ids');
  }
  public set fieldIds(value: string[]) {
    this._fieldIds = value;
  }
  public resetFieldIds() {
    this._fieldIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldIdsInput() {
    return this._fieldIds;
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

  // interactive_params - computed: false, optional: true, required: false
  private _interactiveParams?: { [key: string]: string }[] | cdktf.IResolvable; 
  public get interactiveParams() {
    return this.interpolationForAttribute('interactive_params');
  }
  public set interactiveParams(value: { [key: string]: string }[] | cdktf.IResolvable) {
    this._interactiveParams = value;
  }
  public resetInteractiveParams() {
    this._interactiveParams = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get interactiveParamsInput() {
    return this._interactiveParams;
  }

  // metric_ids - computed: false, optional: false, required: true
  private _metricIds?: string[]; 
  public get metricIds() {
    return this.getListAttribute('metric_ids');
  }
  public set metricIds(value: string[]) {
    this._metricIds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get metricIdsInput() {
    return this._metricIds;
  }

  // metric_results - computed: true, optional: false, required: false
  private _metricResults = new DataHuaweicloudSecmasterMetricResultsMetricResultsList(this, "metric_results", false);
  public get metricResults() {
    return this._metricResults;
  }

  // params - computed: false, optional: true, required: false
  private _params?: { [key: string]: string }[] | cdktf.IResolvable; 
  public get params() {
    return this.interpolationForAttribute('params');
  }
  public set params(value: { [key: string]: string }[] | cdktf.IResolvable) {
    this._params = value;
  }
  public resetParams() {
    this._params = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get paramsInput() {
    return this._params;
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

  // timespan - computed: false, optional: true, required: false
  private _timespan?: string; 
  public get timespan() {
    return this.getStringAttribute('timespan');
  }
  public set timespan(value: string) {
    this._timespan = value;
  }
  public resetTimespan() {
    this._timespan = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timespanInput() {
    return this._timespan;
  }

  // workspace_id - computed: false, optional: false, required: true
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cache: cdktf.stringToTerraform(this._cache),
      field_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._fieldIds),
      id: cdktf.stringToTerraform(this._id),
      interactive_params: cdktf.listMapper(cdktf.hashMapper(cdktf.stringToTerraform), false)(this._interactiveParams),
      metric_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._metricIds),
      params: cdktf.listMapper(cdktf.hashMapper(cdktf.stringToTerraform), false)(this._params),
      region: cdktf.stringToTerraform(this._region),
      timespan: cdktf.stringToTerraform(this._timespan),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cache: {
        value: cdktf.stringToHclTerraform(this._cache),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      field_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._fieldIds),
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
      interactive_params: {
        value: cdktf.listMapperHcl(cdktf.hashMapperHcl(cdktf.stringToHclTerraform), false)(this._interactiveParams),
        isBlock: false,
        type: "list",
        storageClassType: "stringMapList",
      },
      metric_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._metricIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      params: {
        value: cdktf.listMapperHcl(cdktf.hashMapperHcl(cdktf.stringToHclTerraform), false)(this._params),
        isBlock: false,
        type: "list",
        storageClassType: "stringMapList",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timespan: {
        value: cdktf.stringToHclTerraform(this._timespan),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

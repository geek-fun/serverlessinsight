// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudDdsSlowLogsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the fuzzy search for logs based on multiple database table name keywords.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#collection_keywords DataHuaweicloudDdsSlowLogs#collection_keywords}
  */
  readonly collectionKeywords?: string[];
  /**
  * Specifies the fuzzy search for logs based on multiple database keywords.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#database_keywords DataHuaweicloudDdsSlowLogs#database_keywords}
  */
  readonly databaseKeywords?: string[];
  /**
  * Specifies the end time in the **yyyy-mm-ddThh:mm:ssZ** format.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#end_time DataHuaweicloudDdsSlowLogs#end_time}
  */
  readonly endTime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#id DataHuaweicloudDdsSlowLogs#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#instance_id DataHuaweicloudDdsSlowLogs#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the full-text log search based on multiple keywords.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#keywords DataHuaweicloudDdsSlowLogs#keywords}
  */
  readonly keywords?: string[];
  /**
  * Specifies the logs can be searched based on the maximum execution duration. Unit is ms.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#max_cost_time DataHuaweicloudDdsSlowLogs#max_cost_time}
  */
  readonly maxCostTime?: number;
  /**
  * Specifies the logs can be searched based on the minimum execution duration. Unit is ms.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#min_cost_time DataHuaweicloudDdsSlowLogs#min_cost_time}
  */
  readonly minCostTime?: number;
  /**
  * Specifies the node ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#node_id DataHuaweicloudDdsSlowLogs#node_id}
  */
  readonly nodeId?: string;
  /**
  * Specifies the statement type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#operate_type DataHuaweicloudDdsSlowLogs#operate_type}
  */
  readonly operateType?: string;
  /**
  * Specifies the region in which to query the resource.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#region DataHuaweicloudDdsSlowLogs#region}
  */
  readonly region?: string;
  /**
  * Specifies the start time in the **yyyy-mm-ddThh:mm:ssZ** format.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#start_time DataHuaweicloudDdsSlowLogs#start_time}
  */
  readonly startTime: string;
}
export interface DataHuaweicloudDdsSlowLogsSlowLogs {
}

export function dataHuaweicloudDdsSlowLogsSlowLogsToTerraform(struct?: DataHuaweicloudDdsSlowLogsSlowLogs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudDdsSlowLogsSlowLogsToHclTerraform(struct?: DataHuaweicloudDdsSlowLogsSlowLogs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudDdsSlowLogsSlowLogsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudDdsSlowLogsSlowLogs | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudDdsSlowLogsSlowLogs | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // collection - computed: true, optional: false, required: false
  public get collection() {
    return this.getStringAttribute('collection');
  }

  // cost_time - computed: true, optional: false, required: false
  public get costTime() {
    return this.getNumberAttribute('cost_time');
  }

  // database - computed: true, optional: false, required: false
  public get database() {
    return this.getStringAttribute('database');
  }

  // docs_returned - computed: true, optional: false, required: false
  public get docsReturned() {
    return this.getNumberAttribute('docs_returned');
  }

  // docs_scanned - computed: true, optional: false, required: false
  public get docsScanned() {
    return this.getNumberAttribute('docs_scanned');
  }

  // lock_time - computed: true, optional: false, required: false
  public get lockTime() {
    return this.getNumberAttribute('lock_time');
  }

  // log_time - computed: true, optional: false, required: false
  public get logTime() {
    return this.getStringAttribute('log_time');
  }

  // node_id - computed: true, optional: false, required: false
  public get nodeId() {
    return this.getStringAttribute('node_id');
  }

  // node_name - computed: true, optional: false, required: false
  public get nodeName() {
    return this.getStringAttribute('node_name');
  }

  // operate_type - computed: true, optional: false, required: false
  public get operateType() {
    return this.getStringAttribute('operate_type');
  }

  // whole_message - computed: true, optional: false, required: false
  public get wholeMessage() {
    return this.getStringAttribute('whole_message');
  }
}

export class DataHuaweicloudDdsSlowLogsSlowLogsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudDdsSlowLogsSlowLogsOutputReference {
    return new DataHuaweicloudDdsSlowLogsSlowLogsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs huaweicloud_dds_slow_logs}
*/
export class DataHuaweicloudDdsSlowLogs extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dds_slow_logs";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudDdsSlowLogs resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudDdsSlowLogs to import
  * @param importFromId The id of the existing DataHuaweicloudDdsSlowLogs that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudDdsSlowLogs to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dds_slow_logs", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/dds_slow_logs huaweicloud_dds_slow_logs} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudDdsSlowLogsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudDdsSlowLogsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dds_slow_logs',
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
    this._collectionKeywords = config.collectionKeywords;
    this._databaseKeywords = config.databaseKeywords;
    this._endTime = config.endTime;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._keywords = config.keywords;
    this._maxCostTime = config.maxCostTime;
    this._minCostTime = config.minCostTime;
    this._nodeId = config.nodeId;
    this._operateType = config.operateType;
    this._region = config.region;
    this._startTime = config.startTime;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // collection_keywords - computed: false, optional: true, required: false
  private _collectionKeywords?: string[]; 
  public get collectionKeywords() {
    return this.getListAttribute('collection_keywords');
  }
  public set collectionKeywords(value: string[]) {
    this._collectionKeywords = value;
  }
  public resetCollectionKeywords() {
    this._collectionKeywords = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get collectionKeywordsInput() {
    return this._collectionKeywords;
  }

  // database_keywords - computed: false, optional: true, required: false
  private _databaseKeywords?: string[]; 
  public get databaseKeywords() {
    return this.getListAttribute('database_keywords');
  }
  public set databaseKeywords(value: string[]) {
    this._databaseKeywords = value;
  }
  public resetDatabaseKeywords() {
    this._databaseKeywords = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get databaseKeywordsInput() {
    return this._databaseKeywords;
  }

  // end_time - computed: false, optional: false, required: true
  private _endTime?: string; 
  public get endTime() {
    return this.getStringAttribute('end_time');
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get endTimeInput() {
    return this._endTime;
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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // keywords - computed: false, optional: true, required: false
  private _keywords?: string[]; 
  public get keywords() {
    return this.getListAttribute('keywords');
  }
  public set keywords(value: string[]) {
    this._keywords = value;
  }
  public resetKeywords() {
    this._keywords = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keywordsInput() {
    return this._keywords;
  }

  // max_cost_time - computed: false, optional: true, required: false
  private _maxCostTime?: number; 
  public get maxCostTime() {
    return this.getNumberAttribute('max_cost_time');
  }
  public set maxCostTime(value: number) {
    this._maxCostTime = value;
  }
  public resetMaxCostTime() {
    this._maxCostTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxCostTimeInput() {
    return this._maxCostTime;
  }

  // min_cost_time - computed: false, optional: true, required: false
  private _minCostTime?: number; 
  public get minCostTime() {
    return this.getNumberAttribute('min_cost_time');
  }
  public set minCostTime(value: number) {
    this._minCostTime = value;
  }
  public resetMinCostTime() {
    this._minCostTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get minCostTimeInput() {
    return this._minCostTime;
  }

  // node_id - computed: false, optional: true, required: false
  private _nodeId?: string; 
  public get nodeId() {
    return this.getStringAttribute('node_id');
  }
  public set nodeId(value: string) {
    this._nodeId = value;
  }
  public resetNodeId() {
    this._nodeId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeIdInput() {
    return this._nodeId;
  }

  // operate_type - computed: false, optional: true, required: false
  private _operateType?: string; 
  public get operateType() {
    return this.getStringAttribute('operate_type');
  }
  public set operateType(value: string) {
    this._operateType = value;
  }
  public resetOperateType() {
    this._operateType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get operateTypeInput() {
    return this._operateType;
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

  // slow_logs - computed: true, optional: false, required: false
  private _slowLogs = new DataHuaweicloudDdsSlowLogsSlowLogsList(this, "slow_logs", false);
  public get slowLogs() {
    return this._slowLogs;
  }

  // start_time - computed: false, optional: false, required: true
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      collection_keywords: cdktf.listMapper(cdktf.stringToTerraform, false)(this._collectionKeywords),
      database_keywords: cdktf.listMapper(cdktf.stringToTerraform, false)(this._databaseKeywords),
      end_time: cdktf.stringToTerraform(this._endTime),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      keywords: cdktf.listMapper(cdktf.stringToTerraform, false)(this._keywords),
      max_cost_time: cdktf.numberToTerraform(this._maxCostTime),
      min_cost_time: cdktf.numberToTerraform(this._minCostTime),
      node_id: cdktf.stringToTerraform(this._nodeId),
      operate_type: cdktf.stringToTerraform(this._operateType),
      region: cdktf.stringToTerraform(this._region),
      start_time: cdktf.stringToTerraform(this._startTime),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      collection_keywords: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._collectionKeywords),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      database_keywords: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._databaseKeywords),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      end_time: {
        value: cdktf.stringToHclTerraform(this._endTime),
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      keywords: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._keywords),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      max_cost_time: {
        value: cdktf.numberToHclTerraform(this._maxCostTime),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      min_cost_time: {
        value: cdktf.numberToHclTerraform(this._minCostTime),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      node_id: {
        value: cdktf.stringToHclTerraform(this._nodeId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      operate_type: {
        value: cdktf.stringToHclTerraform(this._operateType),
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
      start_time: {
        value: cdktf.stringToHclTerraform(this._startTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

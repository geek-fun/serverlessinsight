// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_source_statuses
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudRmsResourceAggregatorSourceStatusesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the resource aggregator ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_source_statuses#aggregator_id DataHuaweicloudRmsResourceAggregatorSourceStatuses#aggregator_id}
  */
  readonly aggregatorId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_source_statuses#id DataHuaweicloudRmsResourceAggregatorSourceStatuses#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the status of the aggregated source account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_source_statuses#status DataHuaweicloudRmsResourceAggregatorSourceStatuses#status}
  */
  readonly status?: string;
}
export interface DataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatuses {
}

export function dataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatusesToTerraform(struct?: DataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatuses): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatusesToHclTerraform(struct?: DataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatuses): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatusesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatuses | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatuses | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // last_error_code - computed: true, optional: false, required: false
  public get lastErrorCode() {
    return this.getStringAttribute('last_error_code');
  }

  // last_error_message - computed: true, optional: false, required: false
  public get lastErrorMessage() {
    return this.getStringAttribute('last_error_message');
  }

  // last_update_status - computed: true, optional: false, required: false
  public get lastUpdateStatus() {
    return this.getStringAttribute('last_update_status');
  }

  // last_update_time - computed: true, optional: false, required: false
  public get lastUpdateTime() {
    return this.getStringAttribute('last_update_time');
  }

  // source_id - computed: true, optional: false, required: false
  public get sourceId() {
    return this.getStringAttribute('source_id');
  }

  // source_name - computed: true, optional: false, required: false
  public get sourceName() {
    return this.getStringAttribute('source_name');
  }

  // source_type - computed: true, optional: false, required: false
  public get sourceType() {
    return this.getStringAttribute('source_type');
  }
}

export class DataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatusesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatusesOutputReference {
    return new DataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatusesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_source_statuses huaweicloud_rms_resource_aggregator_source_statuses}
*/
export class DataHuaweicloudRmsResourceAggregatorSourceStatuses extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rms_resource_aggregator_source_statuses";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudRmsResourceAggregatorSourceStatuses resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudRmsResourceAggregatorSourceStatuses to import
  * @param importFromId The id of the existing DataHuaweicloudRmsResourceAggregatorSourceStatuses that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_source_statuses#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudRmsResourceAggregatorSourceStatuses to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rms_resource_aggregator_source_statuses", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_source_statuses huaweicloud_rms_resource_aggregator_source_statuses} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudRmsResourceAggregatorSourceStatusesConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudRmsResourceAggregatorSourceStatusesConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rms_resource_aggregator_source_statuses',
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
    this._aggregatorId = config.aggregatorId;
    this._id = config.id;
    this._status = config.status;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // aggregated_source_statuses - computed: true, optional: false, required: false
  private _aggregatedSourceStatuses = new DataHuaweicloudRmsResourceAggregatorSourceStatusesAggregatedSourceStatusesList(this, "aggregated_source_statuses", false);
  public get aggregatedSourceStatuses() {
    return this._aggregatedSourceStatuses;
  }

  // aggregator_id - computed: false, optional: false, required: true
  private _aggregatorId?: string; 
  public get aggregatorId() {
    return this.getStringAttribute('aggregator_id');
  }
  public set aggregatorId(value: string) {
    this._aggregatorId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get aggregatorIdInput() {
    return this._aggregatorId;
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

  // status - computed: false, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      aggregator_id: cdktf.stringToTerraform(this._aggregatorId),
      id: cdktf.stringToTerraform(this._id),
      status: cdktf.stringToTerraform(this._status),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      aggregator_id: {
        value: cdktf.stringToHclTerraform(this._aggregatorId),
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
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

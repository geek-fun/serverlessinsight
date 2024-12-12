// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_line_levels
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_line_levels#id DataHuaweicloudCcGlobalConnectionBandwidthLineLevels#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Line grade.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_line_levels#levels DataHuaweicloudCcGlobalConnectionBandwidthLineLevels#levels}
  */
  readonly levels?: string;
  /**
  * Line ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_line_levels#line_id DataHuaweicloudCcGlobalConnectionBandwidthLineLevels#line_id}
  */
  readonly lineId?: string;
  /**
  * Local access point code included in the line specification.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_line_levels#local_area DataHuaweicloudCcGlobalConnectionBandwidthLineLevels#local_area}
  */
  readonly localArea?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_line_levels#region DataHuaweicloudCcGlobalConnectionBandwidthLineLevels#region}
  */
  readonly region?: string;
  /**
  * Remote access point code included in the line specification.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_line_levels#remote_area DataHuaweicloudCcGlobalConnectionBandwidthLineLevels#remote_area}
  */
  readonly remoteArea?: string;
}
export interface DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevels {
}

export function dataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevelsToTerraform(struct?: DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevels): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevelsToHclTerraform(struct?: DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevels): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevelsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevels | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevels | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // levels - computed: true, optional: false, required: false
  public get levels() {
    return this.getListAttribute('levels');
  }

  // local_area - computed: true, optional: false, required: false
  public get localArea() {
    return this.getStringAttribute('local_area');
  }

  // remote_area - computed: true, optional: false, required: false
  public get remoteArea() {
    return this.getStringAttribute('remote_area');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevelsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevelsOutputReference {
    return new DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevelsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_line_levels huaweicloud_cc_global_connection_bandwidth_line_levels}
*/
export class DataHuaweicloudCcGlobalConnectionBandwidthLineLevels extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_global_connection_bandwidth_line_levels";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCcGlobalConnectionBandwidthLineLevels resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCcGlobalConnectionBandwidthLineLevels to import
  * @param importFromId The id of the existing DataHuaweicloudCcGlobalConnectionBandwidthLineLevels that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_line_levels#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCcGlobalConnectionBandwidthLineLevels to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_global_connection_bandwidth_line_levels", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_global_connection_bandwidth_line_levels huaweicloud_cc_global_connection_bandwidth_line_levels} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_global_connection_bandwidth_line_levels',
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
    this._id = config.id;
    this._levels = config.levels;
    this._lineId = config.lineId;
    this._localArea = config.localArea;
    this._region = config.region;
    this._remoteArea = config.remoteArea;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // levels - computed: false, optional: true, required: false
  private _levels?: string; 
  public get levels() {
    return this.getStringAttribute('levels');
  }
  public set levels(value: string) {
    this._levels = value;
  }
  public resetLevels() {
    this._levels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get levelsInput() {
    return this._levels;
  }

  // line_id - computed: false, optional: true, required: false
  private _lineId?: string; 
  public get lineId() {
    return this.getStringAttribute('line_id');
  }
  public set lineId(value: string) {
    this._lineId = value;
  }
  public resetLineId() {
    this._lineId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lineIdInput() {
    return this._lineId;
  }

  // line_levels - computed: true, optional: false, required: false
  private _lineLevels = new DataHuaweicloudCcGlobalConnectionBandwidthLineLevelsLineLevelsList(this, "line_levels", false);
  public get lineLevels() {
    return this._lineLevels;
  }

  // local_area - computed: false, optional: true, required: false
  private _localArea?: string; 
  public get localArea() {
    return this.getStringAttribute('local_area');
  }
  public set localArea(value: string) {
    this._localArea = value;
  }
  public resetLocalArea() {
    this._localArea = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get localAreaInput() {
    return this._localArea;
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

  // remote_area - computed: false, optional: true, required: false
  private _remoteArea?: string; 
  public get remoteArea() {
    return this.getStringAttribute('remote_area');
  }
  public set remoteArea(value: string) {
    this._remoteArea = value;
  }
  public resetRemoteArea() {
    this._remoteArea = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get remoteAreaInput() {
    return this._remoteArea;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      levels: cdktf.stringToTerraform(this._levels),
      line_id: cdktf.stringToTerraform(this._lineId),
      local_area: cdktf.stringToTerraform(this._localArea),
      region: cdktf.stringToTerraform(this._region),
      remote_area: cdktf.stringToTerraform(this._remoteArea),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      levels: {
        value: cdktf.stringToHclTerraform(this._levels),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      line_id: {
        value: cdktf.stringToHclTerraform(this._lineId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      local_area: {
        value: cdktf.stringToHclTerraform(this._localArea),
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
      remote_area: {
        value: cdktf.stringToHclTerraform(this._remoteArea),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

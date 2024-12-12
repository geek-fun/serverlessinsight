// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_inter_region_bandwidth
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CcInterRegionBandwidthConfig extends cdktf.TerraformMetaArguments {
  /**
  * Inter-region bandwidth.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_inter_region_bandwidth#bandwidth CcInterRegionBandwidth#bandwidth}
  */
  readonly bandwidth: number;
  /**
  * Bandwidth package ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_inter_region_bandwidth#bandwidth_package_id CcInterRegionBandwidth#bandwidth_package_id}
  */
  readonly bandwidthPackageId: string;
  /**
  * Cloud connection ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_inter_region_bandwidth#cloud_connection_id CcInterRegionBandwidth#cloud_connection_id}
  */
  readonly cloudConnectionId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_inter_region_bandwidth#id CcInterRegionBandwidth#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Two regions to which bandwidth is allocated.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_inter_region_bandwidth#inter_region_ids CcInterRegionBandwidth#inter_region_ids}
  */
  readonly interRegionIds: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_inter_region_bandwidth#region CcInterRegionBandwidth#region}
  */
  readonly region?: string;
}
export interface CcInterRegionBandwidthInterRegions {
}

export function ccInterRegionBandwidthInterRegionsToTerraform(struct?: CcInterRegionBandwidthInterRegions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function ccInterRegionBandwidthInterRegionsToHclTerraform(struct?: CcInterRegionBandwidthInterRegions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CcInterRegionBandwidthInterRegionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CcInterRegionBandwidthInterRegions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CcInterRegionBandwidthInterRegions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // local_region_id - computed: true, optional: false, required: false
  public get localRegionId() {
    return this.getStringAttribute('local_region_id');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // remote_region_id - computed: true, optional: false, required: false
  public get remoteRegionId() {
    return this.getStringAttribute('remote_region_id');
  }
}

export class CcInterRegionBandwidthInterRegionsList extends cdktf.ComplexList {

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
  public get(index: number): CcInterRegionBandwidthInterRegionsOutputReference {
    return new CcInterRegionBandwidthInterRegionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_inter_region_bandwidth huaweicloud_cc_inter_region_bandwidth}
*/
export class CcInterRegionBandwidth extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_inter_region_bandwidth";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CcInterRegionBandwidth resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CcInterRegionBandwidth to import
  * @param importFromId The id of the existing CcInterRegionBandwidth that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_inter_region_bandwidth#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CcInterRegionBandwidth to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_inter_region_bandwidth", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_inter_region_bandwidth huaweicloud_cc_inter_region_bandwidth} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CcInterRegionBandwidthConfig
  */
  public constructor(scope: Construct, id: string, config: CcInterRegionBandwidthConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_inter_region_bandwidth',
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
    this._bandwidth = config.bandwidth;
    this._bandwidthPackageId = config.bandwidthPackageId;
    this._cloudConnectionId = config.cloudConnectionId;
    this._id = config.id;
    this._interRegionIds = config.interRegionIds;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // bandwidth - computed: false, optional: false, required: true
  private _bandwidth?: number; 
  public get bandwidth() {
    return this.getNumberAttribute('bandwidth');
  }
  public set bandwidth(value: number) {
    this._bandwidth = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthInput() {
    return this._bandwidth;
  }

  // bandwidth_package_id - computed: false, optional: false, required: true
  private _bandwidthPackageId?: string; 
  public get bandwidthPackageId() {
    return this.getStringAttribute('bandwidth_package_id');
  }
  public set bandwidthPackageId(value: string) {
    this._bandwidthPackageId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthPackageIdInput() {
    return this._bandwidthPackageId;
  }

  // cloud_connection_id - computed: false, optional: false, required: true
  private _cloudConnectionId?: string; 
  public get cloudConnectionId() {
    return this.getStringAttribute('cloud_connection_id');
  }
  public set cloudConnectionId(value: string) {
    this._cloudConnectionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cloudConnectionIdInput() {
    return this._cloudConnectionId;
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

  // inter_region_ids - computed: false, optional: false, required: true
  private _interRegionIds?: string[]; 
  public get interRegionIds() {
    return this.getListAttribute('inter_region_ids');
  }
  public set interRegionIds(value: string[]) {
    this._interRegionIds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get interRegionIdsInput() {
    return this._interRegionIds;
  }

  // inter_regions - computed: true, optional: false, required: false
  private _interRegions = new CcInterRegionBandwidthInterRegionsList(this, "inter_regions", false);
  public get interRegions() {
    return this._interRegions;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      bandwidth: cdktf.numberToTerraform(this._bandwidth),
      bandwidth_package_id: cdktf.stringToTerraform(this._bandwidthPackageId),
      cloud_connection_id: cdktf.stringToTerraform(this._cloudConnectionId),
      id: cdktf.stringToTerraform(this._id),
      inter_region_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._interRegionIds),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      bandwidth: {
        value: cdktf.numberToHclTerraform(this._bandwidth),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      bandwidth_package_id: {
        value: cdktf.stringToHclTerraform(this._bandwidthPackageId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cloud_connection_id: {
        value: cdktf.stringToHclTerraform(this._cloudConnectionId),
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
      inter_region_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._interRegionIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

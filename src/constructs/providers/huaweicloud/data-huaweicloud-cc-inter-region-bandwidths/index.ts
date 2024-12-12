// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_inter_region_bandwidths
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCcInterRegionBandwidthsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the bandwidth package ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_inter_region_bandwidths#bandwidth_package_id DataHuaweicloudCcInterRegionBandwidths#bandwidth_package_id}
  */
  readonly bandwidthPackageId?: string;
  /**
  * Specifies the cloud connection ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_inter_region_bandwidths#cloud_connection_id DataHuaweicloudCcInterRegionBandwidths#cloud_connection_id}
  */
  readonly cloudConnectionId?: string;
  /**
  * Specifies enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_inter_region_bandwidths#enterprise_project_id DataHuaweicloudCcInterRegionBandwidths#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_inter_region_bandwidths#id DataHuaweicloudCcInterRegionBandwidths#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the inter-region bandwidth ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_inter_region_bandwidths#inter_region_bandwidth_id DataHuaweicloudCcInterRegionBandwidths#inter_region_bandwidth_id}
  */
  readonly interRegionBandwidthId?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_inter_region_bandwidths#region DataHuaweicloudCcInterRegionBandwidths#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegions {
}

export function dataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegionsToTerraform(struct?: DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegionsToHclTerraform(struct?: DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegions | undefined) {
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

export class DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegionsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegionsOutputReference {
    return new DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidths {
}

export function dataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsToTerraform(struct?: DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidths): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsToHclTerraform(struct?: DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidths): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidths | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidths | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // bandwidth - computed: true, optional: false, required: false
  public get bandwidth() {
    return this.getNumberAttribute('bandwidth');
  }

  // bandwidth_package_id - computed: true, optional: false, required: false
  public get bandwidthPackageId() {
    return this.getStringAttribute('bandwidth_package_id');
  }

  // cloud_connection_id - computed: true, optional: false, required: false
  public get cloudConnectionId() {
    return this.getStringAttribute('cloud_connection_id');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // inter_regions - computed: true, optional: false, required: false
  private _interRegions = new DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsInterRegionsList(this, "inter_regions", false);
  public get interRegions() {
    return this._interRegions;
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsOutputReference {
    return new DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_inter_region_bandwidths huaweicloud_cc_inter_region_bandwidths}
*/
export class DataHuaweicloudCcInterRegionBandwidths extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_inter_region_bandwidths";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCcInterRegionBandwidths resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCcInterRegionBandwidths to import
  * @param importFromId The id of the existing DataHuaweicloudCcInterRegionBandwidths that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_inter_region_bandwidths#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCcInterRegionBandwidths to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_inter_region_bandwidths", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_inter_region_bandwidths huaweicloud_cc_inter_region_bandwidths} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCcInterRegionBandwidthsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCcInterRegionBandwidthsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_inter_region_bandwidths',
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
    this._bandwidthPackageId = config.bandwidthPackageId;
    this._cloudConnectionId = config.cloudConnectionId;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._interRegionBandwidthId = config.interRegionBandwidthId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // bandwidth_package_id - computed: false, optional: true, required: false
  private _bandwidthPackageId?: string; 
  public get bandwidthPackageId() {
    return this.getStringAttribute('bandwidth_package_id');
  }
  public set bandwidthPackageId(value: string) {
    this._bandwidthPackageId = value;
  }
  public resetBandwidthPackageId() {
    this._bandwidthPackageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bandwidthPackageIdInput() {
    return this._bandwidthPackageId;
  }

  // cloud_connection_id - computed: false, optional: true, required: false
  private _cloudConnectionId?: string; 
  public get cloudConnectionId() {
    return this.getStringAttribute('cloud_connection_id');
  }
  public set cloudConnectionId(value: string) {
    this._cloudConnectionId = value;
  }
  public resetCloudConnectionId() {
    this._cloudConnectionId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cloudConnectionIdInput() {
    return this._cloudConnectionId;
  }

  // enterprise_project_id - computed: false, optional: true, required: false
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

  // inter_region_bandwidth_id - computed: false, optional: true, required: false
  private _interRegionBandwidthId?: string; 
  public get interRegionBandwidthId() {
    return this.getStringAttribute('inter_region_bandwidth_id');
  }
  public set interRegionBandwidthId(value: string) {
    this._interRegionBandwidthId = value;
  }
  public resetInterRegionBandwidthId() {
    this._interRegionBandwidthId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get interRegionBandwidthIdInput() {
    return this._interRegionBandwidthId;
  }

  // inter_region_bandwidths - computed: true, optional: false, required: false
  private _interRegionBandwidths = new DataHuaweicloudCcInterRegionBandwidthsInterRegionBandwidthsList(this, "inter_region_bandwidths", false);
  public get interRegionBandwidths() {
    return this._interRegionBandwidths;
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
      bandwidth_package_id: cdktf.stringToTerraform(this._bandwidthPackageId),
      cloud_connection_id: cdktf.stringToTerraform(this._cloudConnectionId),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      inter_region_bandwidth_id: cdktf.stringToTerraform(this._interRegionBandwidthId),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
      inter_region_bandwidth_id: {
        value: cdktf.stringToHclTerraform(this._interRegionBandwidthId),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

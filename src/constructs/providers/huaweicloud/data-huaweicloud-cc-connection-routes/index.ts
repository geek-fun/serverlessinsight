// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_connection_routes
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudCcConnectionRoutesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies cloud connection ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_connection_routes#cloud_connection_id DataHuaweicloudCcConnectionRoutes#cloud_connection_id}
  */
  readonly cloudConnectionId?: string;
  /**
  * Specifies cloud connection route ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_connection_routes#cloud_connection_route_id DataHuaweicloudCcConnectionRoutes#cloud_connection_route_id}
  */
  readonly cloudConnectionRouteId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_connection_routes#id DataHuaweicloudCcConnectionRoutes#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies network instance ID of cloud connection route.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_connection_routes#instance_id DataHuaweicloudCcConnectionRoutes#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_connection_routes#region DataHuaweicloudCcConnectionRoutes#region}
  */
  readonly region?: string;
  /**
  * Specifies region ID of cloud connection route.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_connection_routes#region_id DataHuaweicloudCcConnectionRoutes#region_id}
  */
  readonly regionId?: string;
}
export interface DataHuaweicloudCcConnectionRoutesCloudConnectionRoutes {
}

export function dataHuaweicloudCcConnectionRoutesCloudConnectionRoutesToTerraform(struct?: DataHuaweicloudCcConnectionRoutesCloudConnectionRoutes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudCcConnectionRoutesCloudConnectionRoutesToHclTerraform(struct?: DataHuaweicloudCcConnectionRoutesCloudConnectionRoutes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudCcConnectionRoutesCloudConnectionRoutesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudCcConnectionRoutesCloudConnectionRoutes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudCcConnectionRoutesCloudConnectionRoutes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // cloud_connection_id - computed: true, optional: false, required: false
  public get cloudConnectionId() {
    return this.getStringAttribute('cloud_connection_id');
  }

  // destination - computed: true, optional: false, required: false
  public get destination() {
    return this.getStringAttribute('destination');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // instance_id - computed: true, optional: false, required: false
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // region_id - computed: true, optional: false, required: false
  public get regionId() {
    return this.getStringAttribute('region_id');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class DataHuaweicloudCcConnectionRoutesCloudConnectionRoutesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudCcConnectionRoutesCloudConnectionRoutesOutputReference {
    return new DataHuaweicloudCcConnectionRoutesCloudConnectionRoutesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_connection_routes huaweicloud_cc_connection_routes}
*/
export class DataHuaweicloudCcConnectionRoutes extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_connection_routes";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudCcConnectionRoutes resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudCcConnectionRoutes to import
  * @param importFromId The id of the existing DataHuaweicloudCcConnectionRoutes that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_connection_routes#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudCcConnectionRoutes to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_connection_routes", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/cc_connection_routes huaweicloud_cc_connection_routes} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudCcConnectionRoutesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudCcConnectionRoutesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_connection_routes',
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
    this._cloudConnectionId = config.cloudConnectionId;
    this._cloudConnectionRouteId = config.cloudConnectionRouteId;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._region = config.region;
    this._regionId = config.regionId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // cloud_connection_route_id - computed: false, optional: true, required: false
  private _cloudConnectionRouteId?: string; 
  public get cloudConnectionRouteId() {
    return this.getStringAttribute('cloud_connection_route_id');
  }
  public set cloudConnectionRouteId(value: string) {
    this._cloudConnectionRouteId = value;
  }
  public resetCloudConnectionRouteId() {
    this._cloudConnectionRouteId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cloudConnectionRouteIdInput() {
    return this._cloudConnectionRouteId;
  }

  // cloud_connection_routes - computed: true, optional: false, required: false
  private _cloudConnectionRoutes = new DataHuaweicloudCcConnectionRoutesCloudConnectionRoutesList(this, "cloud_connection_routes", false);
  public get cloudConnectionRoutes() {
    return this._cloudConnectionRoutes;
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

  // instance_id - computed: false, optional: true, required: false
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  public resetInstanceId() {
    this._instanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
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

  // region_id - computed: false, optional: true, required: false
  private _regionId?: string; 
  public get regionId() {
    return this.getStringAttribute('region_id');
  }
  public set regionId(value: string) {
    this._regionId = value;
  }
  public resetRegionId() {
    this._regionId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get regionIdInput() {
    return this._regionId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cloud_connection_id: cdktf.stringToTerraform(this._cloudConnectionId),
      cloud_connection_route_id: cdktf.stringToTerraform(this._cloudConnectionRouteId),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      region: cdktf.stringToTerraform(this._region),
      region_id: cdktf.stringToTerraform(this._regionId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cloud_connection_id: {
        value: cdktf.stringToHclTerraform(this._cloudConnectionId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cloud_connection_route_id: {
        value: cdktf.stringToHclTerraform(this._cloudConnectionRouteId),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      region_id: {
        value: cdktf.stringToHclTerraform(this._regionId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

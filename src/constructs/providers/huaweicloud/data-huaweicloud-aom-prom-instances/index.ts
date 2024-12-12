// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudAomPromInstancesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances#cce_cluster_enable DataHuaweicloudAomPromInstances#cce_cluster_enable}
  */
  readonly cceClusterEnable?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances#enterprise_project_id DataHuaweicloudAomPromInstances#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances#id DataHuaweicloudAomPromInstances#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances#prom_id DataHuaweicloudAomPromInstances#prom_id}
  */
  readonly promId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances#prom_status DataHuaweicloudAomPromInstances#prom_status}
  */
  readonly promStatus?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances#prom_type DataHuaweicloudAomPromInstances#prom_type}
  */
  readonly promType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances#region DataHuaweicloudAomPromInstances#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudAomPromInstancesInstances {
}

export function dataHuaweicloudAomPromInstancesInstancesToTerraform(struct?: DataHuaweicloudAomPromInstancesInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudAomPromInstancesInstancesToHclTerraform(struct?: DataHuaweicloudAomPromInstancesInstances): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudAomPromInstancesInstancesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudAomPromInstancesInstances | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudAomPromInstancesInstances | undefined) {
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

  // deleted_at - computed: true, optional: false, required: false
  public get deletedAt() {
    return this.getStringAttribute('deleted_at');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_deleted_tag - computed: true, optional: false, required: false
  public get isDeletedTag() {
    return this.getStringAttribute('is_deleted_tag');
  }

  // prom_http_api_endpoint - computed: true, optional: false, required: false
  public get promHttpApiEndpoint() {
    return this.getStringAttribute('prom_http_api_endpoint');
  }

  // prom_name - computed: true, optional: false, required: false
  public get promName() {
    return this.getStringAttribute('prom_name');
  }

  // prom_status - computed: true, optional: false, required: false
  public get promStatus() {
    return this.getStringAttribute('prom_status');
  }

  // prom_type - computed: true, optional: false, required: false
  public get promType() {
    return this.getStringAttribute('prom_type');
  }

  // prom_version - computed: true, optional: false, required: false
  public get promVersion() {
    return this.getStringAttribute('prom_version');
  }

  // remote_read_url - computed: true, optional: false, required: false
  public get remoteReadUrl() {
    return this.getStringAttribute('remote_read_url');
  }

  // remote_write_url - computed: true, optional: false, required: false
  public get remoteWriteUrl() {
    return this.getStringAttribute('remote_write_url');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudAomPromInstancesInstancesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudAomPromInstancesInstancesOutputReference {
    return new DataHuaweicloudAomPromInstancesInstancesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances huaweicloud_aom_prom_instances}
*/
export class DataHuaweicloudAomPromInstances extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_prom_instances";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudAomPromInstances resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudAomPromInstances to import
  * @param importFromId The id of the existing DataHuaweicloudAomPromInstances that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudAomPromInstances to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_prom_instances", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/aom_prom_instances huaweicloud_aom_prom_instances} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudAomPromInstancesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudAomPromInstancesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_prom_instances',
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
    this._cceClusterEnable = config.cceClusterEnable;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._promId = config.promId;
    this._promStatus = config.promStatus;
    this._promType = config.promType;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cce_cluster_enable - computed: false, optional: true, required: false
  private _cceClusterEnable?: string; 
  public get cceClusterEnable() {
    return this.getStringAttribute('cce_cluster_enable');
  }
  public set cceClusterEnable(value: string) {
    this._cceClusterEnable = value;
  }
  public resetCceClusterEnable() {
    this._cceClusterEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cceClusterEnableInput() {
    return this._cceClusterEnable;
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

  // instances - computed: true, optional: false, required: false
  private _instances = new DataHuaweicloudAomPromInstancesInstancesList(this, "instances", false);
  public get instances() {
    return this._instances;
  }

  // prom_id - computed: false, optional: true, required: false
  private _promId?: string; 
  public get promId() {
    return this.getStringAttribute('prom_id');
  }
  public set promId(value: string) {
    this._promId = value;
  }
  public resetPromId() {
    this._promId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get promIdInput() {
    return this._promId;
  }

  // prom_status - computed: false, optional: true, required: false
  private _promStatus?: string; 
  public get promStatus() {
    return this.getStringAttribute('prom_status');
  }
  public set promStatus(value: string) {
    this._promStatus = value;
  }
  public resetPromStatus() {
    this._promStatus = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get promStatusInput() {
    return this._promStatus;
  }

  // prom_type - computed: false, optional: true, required: false
  private _promType?: string; 
  public get promType() {
    return this.getStringAttribute('prom_type');
  }
  public set promType(value: string) {
    this._promType = value;
  }
  public resetPromType() {
    this._promType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get promTypeInput() {
    return this._promType;
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
      cce_cluster_enable: cdktf.stringToTerraform(this._cceClusterEnable),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      prom_id: cdktf.stringToTerraform(this._promId),
      prom_status: cdktf.stringToTerraform(this._promStatus),
      prom_type: cdktf.stringToTerraform(this._promType),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cce_cluster_enable: {
        value: cdktf.stringToHclTerraform(this._cceClusterEnable),
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
      prom_id: {
        value: cdktf.stringToHclTerraform(this._promId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      prom_status: {
        value: cdktf.stringToHclTerraform(this._promStatus),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      prom_type: {
        value: cdktf.stringToHclTerraform(this._promType),
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

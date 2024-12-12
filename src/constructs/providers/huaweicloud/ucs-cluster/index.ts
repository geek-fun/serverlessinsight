// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface UcsClusterConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the name of the cluster to register.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#annotations UcsCluster#annotations}
  */
  readonly annotations?: { [key: string]: string };
  /**
  * Specifies the category of the cloud.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#category UcsCluster#category}
  */
  readonly category: string;
  /**
  * Specifies the city name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#city UcsCluster#city}
  */
  readonly city?: string;
  /**
  * Specifies the cluster id.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#cluster_id UcsCluster#cluster_id}
  */
  readonly clusterId?: string;
  /**
  * Specifies the labels of the cluster to register.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#cluster_labels UcsCluster#cluster_labels}
  */
  readonly clusterLabels?: { [key: string]: string };
  /**
  * Specifies the name of the cluster to register.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#cluster_name UcsCluster#cluster_name}
  */
  readonly clusterName?: string;
  /**
  * Specifies the cluster project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#cluster_project_id UcsCluster#cluster_project_id}
  */
  readonly clusterProjectId?: string;
  /**
  * Specifies the cluster region.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#cluster_region UcsCluster#cluster_region}
  */
  readonly clusterRegion?: string;
  /**
  * Specifies the cluster type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#cluster_type UcsCluster#cluster_type}
  */
  readonly clusterType: string;
  /**
  * Specifies the country name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#country UcsCluster#country}
  */
  readonly country?: string;
  /**
  * Specifies ID of the fleet to add the cluster into.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#fleet_id UcsCluster#fleet_id}
  */
  readonly fleetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#id UcsCluster#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the cloud service provider.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#service_provider UcsCluster#service_provider}
  */
  readonly serviceProvider?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster huaweicloud_ucs_cluster}
*/
export class UcsCluster extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_ucs_cluster";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a UcsCluster resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the UcsCluster to import
  * @param importFromId The id of the existing UcsCluster that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the UcsCluster to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_ucs_cluster", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ucs_cluster huaweicloud_ucs_cluster} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options UcsClusterConfig
  */
  public constructor(scope: Construct, id: string, config: UcsClusterConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_ucs_cluster',
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
    this._annotations = config.annotations;
    this._category = config.category;
    this._city = config.city;
    this._clusterId = config.clusterId;
    this._clusterLabels = config.clusterLabels;
    this._clusterName = config.clusterName;
    this._clusterProjectId = config.clusterProjectId;
    this._clusterRegion = config.clusterRegion;
    this._clusterType = config.clusterType;
    this._country = config.country;
    this._fleetId = config.fleetId;
    this._id = config.id;
    this._serviceProvider = config.serviceProvider;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // annotations - computed: false, optional: true, required: false
  private _annotations?: { [key: string]: string }; 
  public get annotations() {
    return this.getStringMapAttribute('annotations');
  }
  public set annotations(value: { [key: string]: string }) {
    this._annotations = value;
  }
  public resetAnnotations() {
    this._annotations = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get annotationsInput() {
    return this._annotations;
  }

  // category - computed: false, optional: false, required: true
  private _category?: string; 
  public get category() {
    return this.getStringAttribute('category');
  }
  public set category(value: string) {
    this._category = value;
  }
  // Temporarily expose input value. Use with caution.
  public get categoryInput() {
    return this._category;
  }

  // city - computed: true, optional: true, required: false
  private _city?: string; 
  public get city() {
    return this.getStringAttribute('city');
  }
  public set city(value: string) {
    this._city = value;
  }
  public resetCity() {
    this._city = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cityInput() {
    return this._city;
  }

  // cluster_id - computed: true, optional: true, required: false
  private _clusterId?: string; 
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }
  public set clusterId(value: string) {
    this._clusterId = value;
  }
  public resetClusterId() {
    this._clusterId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterIdInput() {
    return this._clusterId;
  }

  // cluster_labels - computed: true, optional: true, required: false
  private _clusterLabels?: { [key: string]: string }; 
  public get clusterLabels() {
    return this.getStringMapAttribute('cluster_labels');
  }
  public set clusterLabels(value: { [key: string]: string }) {
    this._clusterLabels = value;
  }
  public resetClusterLabels() {
    this._clusterLabels = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterLabelsInput() {
    return this._clusterLabels;
  }

  // cluster_name - computed: true, optional: true, required: false
  private _clusterName?: string; 
  public get clusterName() {
    return this.getStringAttribute('cluster_name');
  }
  public set clusterName(value: string) {
    this._clusterName = value;
  }
  public resetClusterName() {
    this._clusterName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterNameInput() {
    return this._clusterName;
  }

  // cluster_project_id - computed: true, optional: true, required: false
  private _clusterProjectId?: string; 
  public get clusterProjectId() {
    return this.getStringAttribute('cluster_project_id');
  }
  public set clusterProjectId(value: string) {
    this._clusterProjectId = value;
  }
  public resetClusterProjectId() {
    this._clusterProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterProjectIdInput() {
    return this._clusterProjectId;
  }

  // cluster_region - computed: true, optional: true, required: false
  private _clusterRegion?: string; 
  public get clusterRegion() {
    return this.getStringAttribute('cluster_region');
  }
  public set clusterRegion(value: string) {
    this._clusterRegion = value;
  }
  public resetClusterRegion() {
    this._clusterRegion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterRegionInput() {
    return this._clusterRegion;
  }

  // cluster_type - computed: false, optional: false, required: true
  private _clusterType?: string; 
  public get clusterType() {
    return this.getStringAttribute('cluster_type');
  }
  public set clusterType(value: string) {
    this._clusterType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterTypeInput() {
    return this._clusterType;
  }

  // country - computed: true, optional: true, required: false
  private _country?: string; 
  public get country() {
    return this.getStringAttribute('country');
  }
  public set country(value: string) {
    this._country = value;
  }
  public resetCountry() {
    this._country = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get countryInput() {
    return this._country;
  }

  // fleet_id - computed: false, optional: true, required: false
  private _fleetId?: string; 
  public get fleetId() {
    return this.getStringAttribute('fleet_id');
  }
  public set fleetId(value: string) {
    this._fleetId = value;
  }
  public resetFleetId() {
    this._fleetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fleetIdInput() {
    return this._fleetId;
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

  // manage_type - computed: true, optional: false, required: false
  public get manageType() {
    return this.getStringAttribute('manage_type');
  }

  // service_provider - computed: true, optional: true, required: false
  private _serviceProvider?: string; 
  public get serviceProvider() {
    return this.getStringAttribute('service_provider');
  }
  public set serviceProvider(value: string) {
    this._serviceProvider = value;
  }
  public resetServiceProvider() {
    this._serviceProvider = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceProviderInput() {
    return this._serviceProvider;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      annotations: cdktf.hashMapper(cdktf.stringToTerraform)(this._annotations),
      category: cdktf.stringToTerraform(this._category),
      city: cdktf.stringToTerraform(this._city),
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      cluster_labels: cdktf.hashMapper(cdktf.stringToTerraform)(this._clusterLabels),
      cluster_name: cdktf.stringToTerraform(this._clusterName),
      cluster_project_id: cdktf.stringToTerraform(this._clusterProjectId),
      cluster_region: cdktf.stringToTerraform(this._clusterRegion),
      cluster_type: cdktf.stringToTerraform(this._clusterType),
      country: cdktf.stringToTerraform(this._country),
      fleet_id: cdktf.stringToTerraform(this._fleetId),
      id: cdktf.stringToTerraform(this._id),
      service_provider: cdktf.stringToTerraform(this._serviceProvider),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      annotations: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._annotations),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      category: {
        value: cdktf.stringToHclTerraform(this._category),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      city: {
        value: cdktf.stringToHclTerraform(this._city),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_labels: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._clusterLabels),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      cluster_name: {
        value: cdktf.stringToHclTerraform(this._clusterName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_project_id: {
        value: cdktf.stringToHclTerraform(this._clusterProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_region: {
        value: cdktf.stringToHclTerraform(this._clusterRegion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_type: {
        value: cdktf.stringToHclTerraform(this._clusterType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      country: {
        value: cdktf.stringToHclTerraform(this._country),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      fleet_id: {
        value: cdktf.stringToHclTerraform(this._fleetId),
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
      service_provider: {
        value: cdktf.stringToHclTerraform(this._serviceProvider),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

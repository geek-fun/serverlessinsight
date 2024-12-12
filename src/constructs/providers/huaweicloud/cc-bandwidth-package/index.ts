// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CcBandwidthPackageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Bandwidth in the bandwidth package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#bandwidth CcBandwidthPackage#bandwidth}
  */
  readonly bandwidth: number;
  /**
  * Billing mode of the bandwidth package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#billing_mode CcBandwidthPackage#billing_mode}
  */
  readonly billingMode: string;
  /**
  * Billing option of the bandwidth package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#charge_mode CcBandwidthPackage#charge_mode}
  */
  readonly chargeMode: string;
  /**
  * The description about the bandwidth package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#description CcBandwidthPackage#description}
  */
  readonly description?: string;
  /**
  * ID of the enterprise project that the bandwidth package belongs to.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#enterprise_project_id CcBandwidthPackage#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#id CcBandwidthPackage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Interflow mode of the bandwidth package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#interflow_mode CcBandwidthPackage#interflow_mode}
  */
  readonly interflowMode?: string;
  /**
  * The local area ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#local_area_id CcBandwidthPackage#local_area_id}
  */
  readonly localAreaId: string;
  /**
  * The bandwidth package name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#name CcBandwidthPackage#name}
  */
  readonly name: string;
  /**
  * Project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#project_id CcBandwidthPackage#project_id}
  */
  readonly projectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#region CcBandwidthPackage#region}
  */
  readonly region?: string;
  /**
  * The remote area ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#remote_area_id CcBandwidthPackage#remote_area_id}
  */
  readonly remoteAreaId: string;
  /**
  * ID of the resource that the bandwidth package is bound to.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#resource_id CcBandwidthPackage#resource_id}
  */
  readonly resourceId?: string;
  /**
  * Type of the resource that the bandwidth package is bound to.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#resource_type CcBandwidthPackage#resource_type}
  */
  readonly resourceType?: string;
  /**
  * Specification code of the bandwidth package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#spec_code CcBandwidthPackage#spec_code}
  */
  readonly specCode?: string;
  /**
  * The key/value pairs to associate with the bandwidth package.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#tags CcBandwidthPackage#tags}
  */
  readonly tags?: { [key: string]: string };
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package huaweicloud_cc_bandwidth_package}
*/
export class CcBandwidthPackage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cc_bandwidth_package";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CcBandwidthPackage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CcBandwidthPackage to import
  * @param importFromId The id of the existing CcBandwidthPackage that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CcBandwidthPackage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cc_bandwidth_package", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cc_bandwidth_package huaweicloud_cc_bandwidth_package} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CcBandwidthPackageConfig
  */
  public constructor(scope: Construct, id: string, config: CcBandwidthPackageConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cc_bandwidth_package',
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
    this._billingMode = config.billingMode;
    this._chargeMode = config.chargeMode;
    this._description = config.description;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._interflowMode = config.interflowMode;
    this._localAreaId = config.localAreaId;
    this._name = config.name;
    this._projectId = config.projectId;
    this._region = config.region;
    this._remoteAreaId = config.remoteAreaId;
    this._resourceId = config.resourceId;
    this._resourceType = config.resourceType;
    this._specCode = config.specCode;
    this._tags = config.tags;
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

  // billing_mode - computed: false, optional: false, required: true
  private _billingMode?: string; 
  public get billingMode() {
    return this.getStringAttribute('billing_mode');
  }
  public set billingMode(value: string) {
    this._billingMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get billingModeInput() {
    return this._billingMode;
  }

  // charge_mode - computed: false, optional: false, required: true
  private _chargeMode?: string; 
  public get chargeMode() {
    return this.getStringAttribute('charge_mode');
  }
  public set chargeMode(value: string) {
    this._chargeMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get chargeModeInput() {
    return this._chargeMode;
  }

  // description - computed: true, optional: true, required: false
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  public resetDescription() {
    this._description = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
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

  // interflow_mode - computed: true, optional: true, required: false
  private _interflowMode?: string; 
  public get interflowMode() {
    return this.getStringAttribute('interflow_mode');
  }
  public set interflowMode(value: string) {
    this._interflowMode = value;
  }
  public resetInterflowMode() {
    this._interflowMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get interflowModeInput() {
    return this._interflowMode;
  }

  // local_area_id - computed: false, optional: false, required: true
  private _localAreaId?: string; 
  public get localAreaId() {
    return this.getStringAttribute('local_area_id');
  }
  public set localAreaId(value: string) {
    this._localAreaId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get localAreaIdInput() {
    return this._localAreaId;
  }

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // project_id - computed: true, optional: true, required: false
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  public resetProjectId() {
    this._projectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
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

  // remote_area_id - computed: false, optional: false, required: true
  private _remoteAreaId?: string; 
  public get remoteAreaId() {
    return this.getStringAttribute('remote_area_id');
  }
  public set remoteAreaId(value: string) {
    this._remoteAreaId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get remoteAreaIdInput() {
    return this._remoteAreaId;
  }

  // resource_id - computed: true, optional: true, required: false
  private _resourceId?: string; 
  public get resourceId() {
    return this.getStringAttribute('resource_id');
  }
  public set resourceId(value: string) {
    this._resourceId = value;
  }
  public resetResourceId() {
    this._resourceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceIdInput() {
    return this._resourceId;
  }

  // resource_type - computed: true, optional: true, required: false
  private _resourceType?: string; 
  public get resourceType() {
    return this.getStringAttribute('resource_type');
  }
  public set resourceType(value: string) {
    this._resourceType = value;
  }
  public resetResourceType() {
    this._resourceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceTypeInput() {
    return this._resourceType;
  }

  // spec_code - computed: true, optional: true, required: false
  private _specCode?: string; 
  public get specCode() {
    return this.getStringAttribute('spec_code');
  }
  public set specCode(value: string) {
    this._specCode = value;
  }
  public resetSpecCode() {
    this._specCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get specCodeInput() {
    return this._specCode;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tags - computed: true, optional: true, required: false
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      bandwidth: cdktf.numberToTerraform(this._bandwidth),
      billing_mode: cdktf.stringToTerraform(this._billingMode),
      charge_mode: cdktf.stringToTerraform(this._chargeMode),
      description: cdktf.stringToTerraform(this._description),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      interflow_mode: cdktf.stringToTerraform(this._interflowMode),
      local_area_id: cdktf.stringToTerraform(this._localAreaId),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      remote_area_id: cdktf.stringToTerraform(this._remoteAreaId),
      resource_id: cdktf.stringToTerraform(this._resourceId),
      resource_type: cdktf.stringToTerraform(this._resourceType),
      spec_code: cdktf.stringToTerraform(this._specCode),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
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
      billing_mode: {
        value: cdktf.stringToHclTerraform(this._billingMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      charge_mode: {
        value: cdktf.stringToHclTerraform(this._chargeMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
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
      interflow_mode: {
        value: cdktf.stringToHclTerraform(this._interflowMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      local_area_id: {
        value: cdktf.stringToHclTerraform(this._localAreaId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
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
      remote_area_id: {
        value: cdktf.stringToHclTerraform(this._remoteAreaId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      resource_id: {
        value: cdktf.stringToHclTerraform(this._resourceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      resource_type: {
        value: cdktf.stringToHclTerraform(this._resourceType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      spec_code: {
        value: cdktf.stringToHclTerraform(this._specCode),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

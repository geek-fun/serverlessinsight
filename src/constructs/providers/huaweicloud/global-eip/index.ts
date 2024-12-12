// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface GlobalEipConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip#access_site GlobalEip#access_site}
  */
  readonly accessSite: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip#description GlobalEip#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip#enterprise_project_id GlobalEip#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip#geip_pool_name GlobalEip#geip_pool_name}
  */
  readonly geipPoolName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip#id GlobalEip#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip#internet_bandwidth_id GlobalEip#internet_bandwidth_id}
  */
  readonly internetBandwidthId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip#name GlobalEip#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip#tags GlobalEip#tags}
  */
  readonly tags?: { [key: string]: string };
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip huaweicloud_global_eip}
*/
export class GlobalEip extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_global_eip";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a GlobalEip resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the GlobalEip to import
  * @param importFromId The id of the existing GlobalEip that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the GlobalEip to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_global_eip", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/global_eip huaweicloud_global_eip} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options GlobalEipConfig
  */
  public constructor(scope: Construct, id: string, config: GlobalEipConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_global_eip',
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
    this._accessSite = config.accessSite;
    this._description = config.description;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._geipPoolName = config.geipPoolName;
    this._id = config.id;
    this._internetBandwidthId = config.internetBandwidthId;
    this._name = config.name;
    this._tags = config.tags;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_site - computed: false, optional: false, required: true
  private _accessSite?: string; 
  public get accessSite() {
    return this.getStringAttribute('access_site');
  }
  public set accessSite(value: string) {
    this._accessSite = value;
  }
  // Temporarily expose input value. Use with caution.
  public get accessSiteInput() {
    return this._accessSite;
  }

  // associate_instance_id - computed: true, optional: false, required: false
  public get associateInstanceId() {
    return this.getStringAttribute('associate_instance_id');
  }

  // associate_instance_region - computed: true, optional: false, required: false
  public get associateInstanceRegion() {
    return this.getStringAttribute('associate_instance_region');
  }

  // associate_instance_type - computed: true, optional: false, required: false
  public get associateInstanceType() {
    return this.getStringAttribute('associate_instance_type');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: false, optional: true, required: false
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

  // frozen - computed: true, optional: false, required: false
  public get frozen() {
    return this.getBooleanAttribute('frozen');
  }

  // frozen_info - computed: true, optional: false, required: false
  public get frozenInfo() {
    return this.getStringAttribute('frozen_info');
  }

  // geip_pool_name - computed: false, optional: false, required: true
  private _geipPoolName?: string; 
  public get geipPoolName() {
    return this.getStringAttribute('geip_pool_name');
  }
  public set geipPoolName(value: string) {
    this._geipPoolName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get geipPoolNameInput() {
    return this._geipPoolName;
  }

  // global_connection_bandwidth_id - computed: true, optional: false, required: false
  public get globalConnectionBandwidthId() {
    return this.getStringAttribute('global_connection_bandwidth_id');
  }

  // global_connection_bandwidth_type - computed: true, optional: false, required: false
  public get globalConnectionBandwidthType() {
    return this.getStringAttribute('global_connection_bandwidth_type');
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

  // internet_bandwidth_id - computed: false, optional: false, required: true
  private _internetBandwidthId?: string; 
  public get internetBandwidthId() {
    return this.getStringAttribute('internet_bandwidth_id');
  }
  public set internetBandwidthId(value: string) {
    this._internetBandwidthId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get internetBandwidthIdInput() {
    return this._internetBandwidthId;
  }

  // ip_address - computed: true, optional: false, required: false
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }

  // ip_version - computed: true, optional: false, required: false
  public get ipVersion() {
    return this.getNumberAttribute('ip_version');
  }

  // isp - computed: true, optional: false, required: false
  public get isp() {
    return this.getStringAttribute('isp');
  }

  // name - computed: true, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // polluted - computed: true, optional: false, required: false
  public get polluted() {
    return this.getBooleanAttribute('polluted');
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      access_site: cdktf.stringToTerraform(this._accessSite),
      description: cdktf.stringToTerraform(this._description),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      geip_pool_name: cdktf.stringToTerraform(this._geipPoolName),
      id: cdktf.stringToTerraform(this._id),
      internet_bandwidth_id: cdktf.stringToTerraform(this._internetBandwidthId),
      name: cdktf.stringToTerraform(this._name),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      access_site: {
        value: cdktf.stringToHclTerraform(this._accessSite),
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
      geip_pool_name: {
        value: cdktf.stringToHclTerraform(this._geipPoolName),
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
      internet_bandwidth_id: {
        value: cdktf.stringToHclTerraform(this._internetBandwidthId),
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

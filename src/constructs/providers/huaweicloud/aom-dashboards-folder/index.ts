// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboards_folder
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AomDashboardsFolderConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboards_folder#delete_all AomDashboardsFolder#delete_all}
  */
  readonly deleteAll?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboards_folder#enterprise_project_id AomDashboardsFolder#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboards_folder#folder_title AomDashboardsFolder#folder_title}
  */
  readonly folderTitle: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboards_folder#id AomDashboardsFolder#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboards_folder#region AomDashboardsFolder#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboards_folder huaweicloud_aom_dashboards_folder}
*/
export class AomDashboardsFolder extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_dashboards_folder";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AomDashboardsFolder resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AomDashboardsFolder to import
  * @param importFromId The id of the existing AomDashboardsFolder that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboards_folder#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AomDashboardsFolder to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_dashboards_folder", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboards_folder huaweicloud_aom_dashboards_folder} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AomDashboardsFolderConfig
  */
  public constructor(scope: Construct, id: string, config: AomDashboardsFolderConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_dashboards_folder',
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
    this._deleteAll = config.deleteAll;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._folderTitle = config.folderTitle;
    this._id = config.id;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
  }

  // dashboard_ids - computed: true, optional: false, required: false
  public get dashboardIds() {
    return this.getListAttribute('dashboard_ids');
  }

  // delete_all - computed: false, optional: true, required: false
  private _deleteAll?: boolean | cdktf.IResolvable; 
  public get deleteAll() {
    return this.getBooleanAttribute('delete_all');
  }
  public set deleteAll(value: boolean | cdktf.IResolvable) {
    this._deleteAll = value;
  }
  public resetDeleteAll() {
    this._deleteAll = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteAllInput() {
    return this._deleteAll;
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

  // folder_title - computed: false, optional: false, required: true
  private _folderTitle?: string; 
  public get folderTitle() {
    return this.getStringAttribute('folder_title');
  }
  public set folderTitle(value: string) {
    this._folderTitle = value;
  }
  // Temporarily expose input value. Use with caution.
  public get folderTitleInput() {
    return this._folderTitle;
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

  // is_template - computed: true, optional: false, required: false
  public get isTemplate() {
    return this.getBooleanAttribute('is_template');
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
      delete_all: cdktf.booleanToTerraform(this._deleteAll),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      folder_title: cdktf.stringToTerraform(this._folderTitle),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      delete_all: {
        value: cdktf.booleanToHclTerraform(this._deleteAll),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      folder_title: {
        value: cdktf.stringToHclTerraform(this._folderTitle),
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

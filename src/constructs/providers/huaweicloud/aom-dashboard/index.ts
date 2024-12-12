// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AomDashboardConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard#charts AomDashboard#charts}
  */
  readonly charts?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard#dashboard_tags AomDashboard#dashboard_tags}
  */
  readonly dashboardTags?: { [key: string]: string }[] | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard#dashboard_title AomDashboard#dashboard_title}
  */
  readonly dashboardTitle: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard#dashboard_type AomDashboard#dashboard_type}
  */
  readonly dashboardType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard#enterprise_project_id AomDashboard#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard#folder_title AomDashboard#folder_title}
  */
  readonly folderTitle: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard#id AomDashboard#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard#is_favorite AomDashboard#is_favorite}
  */
  readonly isFavorite?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard#region AomDashboard#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard huaweicloud_aom_dashboard}
*/
export class AomDashboard extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_aom_dashboard";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AomDashboard resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AomDashboard to import
  * @param importFromId The id of the existing AomDashboard that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AomDashboard to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_aom_dashboard", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/aom_dashboard huaweicloud_aom_dashboard} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AomDashboardConfig
  */
  public constructor(scope: Construct, id: string, config: AomDashboardConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_aom_dashboard',
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
    this._charts = config.charts;
    this._dashboardTags = config.dashboardTags;
    this._dashboardTitle = config.dashboardTitle;
    this._dashboardType = config.dashboardType;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._folderTitle = config.folderTitle;
    this._id = config.id;
    this._isFavorite = config.isFavorite;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // charts - computed: false, optional: true, required: false
  private _charts?: string; 
  public get charts() {
    return this.getStringAttribute('charts');
  }
  public set charts(value: string) {
    this._charts = value;
  }
  public resetCharts() {
    this._charts = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get chartsInput() {
    return this._charts;
  }

  // dashboard_tags - computed: false, optional: true, required: false
  private _dashboardTags?: { [key: string]: string }[] | cdktf.IResolvable; 
  public get dashboardTags() {
    return this.interpolationForAttribute('dashboard_tags');
  }
  public set dashboardTags(value: { [key: string]: string }[] | cdktf.IResolvable) {
    this._dashboardTags = value;
  }
  public resetDashboardTags() {
    this._dashboardTags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dashboardTagsInput() {
    return this._dashboardTags;
  }

  // dashboard_title - computed: false, optional: false, required: true
  private _dashboardTitle?: string; 
  public get dashboardTitle() {
    return this.getStringAttribute('dashboard_title');
  }
  public set dashboardTitle(value: string) {
    this._dashboardTitle = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dashboardTitleInput() {
    return this._dashboardTitle;
  }

  // dashboard_type - computed: false, optional: false, required: true
  private _dashboardType?: string; 
  public get dashboardType() {
    return this.getStringAttribute('dashboard_type');
  }
  public set dashboardType(value: string) {
    this._dashboardType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dashboardTypeInput() {
    return this._dashboardType;
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

  // is_favorite - computed: true, optional: true, required: false
  private _isFavorite?: boolean | cdktf.IResolvable; 
  public get isFavorite() {
    return this.getBooleanAttribute('is_favorite');
  }
  public set isFavorite(value: boolean | cdktf.IResolvable) {
    this._isFavorite = value;
  }
  public resetIsFavorite() {
    this._isFavorite = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isFavoriteInput() {
    return this._isFavorite;
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
      charts: cdktf.stringToTerraform(this._charts),
      dashboard_tags: cdktf.listMapper(cdktf.hashMapper(cdktf.stringToTerraform), false)(this._dashboardTags),
      dashboard_title: cdktf.stringToTerraform(this._dashboardTitle),
      dashboard_type: cdktf.stringToTerraform(this._dashboardType),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      folder_title: cdktf.stringToTerraform(this._folderTitle),
      id: cdktf.stringToTerraform(this._id),
      is_favorite: cdktf.booleanToTerraform(this._isFavorite),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      charts: {
        value: cdktf.stringToHclTerraform(this._charts),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dashboard_tags: {
        value: cdktf.listMapperHcl(cdktf.hashMapperHcl(cdktf.stringToHclTerraform), false)(this._dashboardTags),
        isBlock: false,
        type: "list",
        storageClassType: "stringMapList",
      },
      dashboard_title: {
        value: cdktf.stringToHclTerraform(this._dashboardTitle),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dashboard_type: {
        value: cdktf.stringToHclTerraform(this._dashboardType),
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
      is_favorite: {
        value: cdktf.booleanToHclTerraform(this._isFavorite),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LtsDashboardConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#filters LtsDashboard#filters}
  */
  readonly filters?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#group_name LtsDashboard#group_name}
  */
  readonly groupName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#id LtsDashboard#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#is_delete_charts LtsDashboard#is_delete_charts}
  */
  readonly isDeleteCharts?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#last_update_time LtsDashboard#last_update_time}
  */
  readonly lastUpdateTime?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#log_group_id LtsDashboard#log_group_id}
  */
  readonly logGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#log_group_name LtsDashboard#log_group_name}
  */
  readonly logGroupName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#log_stream_id LtsDashboard#log_stream_id}
  */
  readonly logStreamId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#log_stream_name LtsDashboard#log_stream_name}
  */
  readonly logStreamName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#region LtsDashboard#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#template_title LtsDashboard#template_title}
  */
  readonly templateTitle: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#template_type LtsDashboard#template_type}
  */
  readonly templateType?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#title LtsDashboard#title}
  */
  readonly title?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard huaweicloud_lts_dashboard}
*/
export class LtsDashboard extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_lts_dashboard";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LtsDashboard resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LtsDashboard to import
  * @param importFromId The id of the existing LtsDashboard that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LtsDashboard to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_lts_dashboard", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/lts_dashboard huaweicloud_lts_dashboard} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LtsDashboardConfig
  */
  public constructor(scope: Construct, id: string, config: LtsDashboardConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_lts_dashboard',
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
    this._filters = config.filters;
    this._groupName = config.groupName;
    this._id = config.id;
    this._isDeleteCharts = config.isDeleteCharts;
    this._lastUpdateTime = config.lastUpdateTime;
    this._logGroupId = config.logGroupId;
    this._logGroupName = config.logGroupName;
    this._logStreamId = config.logStreamId;
    this._logStreamName = config.logStreamName;
    this._region = config.region;
    this._templateTitle = config.templateTitle;
    this._templateType = config.templateType;
    this._title = config.title;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // filters - computed: false, optional: true, required: false
  private _filters?: string[]; 
  public get filters() {
    return this.getListAttribute('filters');
  }
  public set filters(value: string[]) {
    this._filters = value;
  }
  public resetFilters() {
    this._filters = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get filtersInput() {
    return this._filters;
  }

  // group_name - computed: false, optional: true, required: false
  private _groupName?: string; 
  public get groupName() {
    return this.getStringAttribute('group_name');
  }
  public set groupName(value: string) {
    this._groupName = value;
  }
  public resetGroupName() {
    this._groupName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get groupNameInput() {
    return this._groupName;
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

  // is_delete_charts - computed: false, optional: true, required: false
  private _isDeleteCharts?: string; 
  public get isDeleteCharts() {
    return this.getStringAttribute('is_delete_charts');
  }
  public set isDeleteCharts(value: string) {
    this._isDeleteCharts = value;
  }
  public resetIsDeleteCharts() {
    this._isDeleteCharts = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isDeleteChartsInput() {
    return this._isDeleteCharts;
  }

  // last_update_time - computed: false, optional: true, required: false
  private _lastUpdateTime?: number; 
  public get lastUpdateTime() {
    return this.getNumberAttribute('last_update_time');
  }
  public set lastUpdateTime(value: number) {
    this._lastUpdateTime = value;
  }
  public resetLastUpdateTime() {
    this._lastUpdateTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lastUpdateTimeInput() {
    return this._lastUpdateTime;
  }

  // log_group_id - computed: false, optional: false, required: true
  private _logGroupId?: string; 
  public get logGroupId() {
    return this.getStringAttribute('log_group_id');
  }
  public set logGroupId(value: string) {
    this._logGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logGroupIdInput() {
    return this._logGroupId;
  }

  // log_group_name - computed: false, optional: false, required: true
  private _logGroupName?: string; 
  public get logGroupName() {
    return this.getStringAttribute('log_group_name');
  }
  public set logGroupName(value: string) {
    this._logGroupName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logGroupNameInput() {
    return this._logGroupName;
  }

  // log_stream_id - computed: false, optional: false, required: true
  private _logStreamId?: string; 
  public get logStreamId() {
    return this.getStringAttribute('log_stream_id');
  }
  public set logStreamId(value: string) {
    this._logStreamId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamIdInput() {
    return this._logStreamId;
  }

  // log_stream_name - computed: false, optional: false, required: true
  private _logStreamName?: string; 
  public get logStreamName() {
    return this.getStringAttribute('log_stream_name');
  }
  public set logStreamName(value: string) {
    this._logStreamName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get logStreamNameInput() {
    return this._logStreamName;
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

  // template_title - computed: false, optional: false, required: true
  private _templateTitle?: string[]; 
  public get templateTitle() {
    return this.getListAttribute('template_title');
  }
  public set templateTitle(value: string[]) {
    this._templateTitle = value;
  }
  // Temporarily expose input value. Use with caution.
  public get templateTitleInput() {
    return this._templateTitle;
  }

  // template_type - computed: false, optional: true, required: false
  private _templateType?: string[]; 
  public get templateType() {
    return this.getListAttribute('template_type');
  }
  public set templateType(value: string[]) {
    this._templateType = value;
  }
  public resetTemplateType() {
    this._templateType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateTypeInput() {
    return this._templateType;
  }

  // title - computed: true, optional: true, required: false
  private _title?: string; 
  public get title() {
    return this.getStringAttribute('title');
  }
  public set title(value: string) {
    this._title = value;
  }
  public resetTitle() {
    this._title = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get titleInput() {
    return this._title;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      filters: cdktf.listMapper(cdktf.stringToTerraform, false)(this._filters),
      group_name: cdktf.stringToTerraform(this._groupName),
      id: cdktf.stringToTerraform(this._id),
      is_delete_charts: cdktf.stringToTerraform(this._isDeleteCharts),
      last_update_time: cdktf.numberToTerraform(this._lastUpdateTime),
      log_group_id: cdktf.stringToTerraform(this._logGroupId),
      log_group_name: cdktf.stringToTerraform(this._logGroupName),
      log_stream_id: cdktf.stringToTerraform(this._logStreamId),
      log_stream_name: cdktf.stringToTerraform(this._logStreamName),
      region: cdktf.stringToTerraform(this._region),
      template_title: cdktf.listMapper(cdktf.stringToTerraform, false)(this._templateTitle),
      template_type: cdktf.listMapper(cdktf.stringToTerraform, false)(this._templateType),
      title: cdktf.stringToTerraform(this._title),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      filters: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._filters),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      group_name: {
        value: cdktf.stringToHclTerraform(this._groupName),
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
      is_delete_charts: {
        value: cdktf.stringToHclTerraform(this._isDeleteCharts),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      last_update_time: {
        value: cdktf.numberToHclTerraform(this._lastUpdateTime),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      log_group_id: {
        value: cdktf.stringToHclTerraform(this._logGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_group_name: {
        value: cdktf.stringToHclTerraform(this._logGroupName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_stream_id: {
        value: cdktf.stringToHclTerraform(this._logStreamId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      log_stream_name: {
        value: cdktf.stringToHclTerraform(this._logStreamName),
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
      template_title: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._templateTitle),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      template_type: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._templateType),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      title: {
        value: cdktf.stringToHclTerraform(this._title),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudSecmasterWorkspacesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the creation end time, for example, 2024-04-2T16:08:09Z+0800.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#create_time_end DataHuaweicloudSecmasterWorkspaces#create_time_end}
  */
  readonly createTimeEnd?: string;
  /**
  * Specifies the creation start time, for example, 2024-04-26T16:08:09Z+0800.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#create_time_start DataHuaweicloudSecmasterWorkspaces#create_time_start}
  */
  readonly createTimeStart?: string;
  /**
  * Specifies the workspace description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#description DataHuaweicloudSecmasterWorkspaces#description}
  */
  readonly description?: string;
  /**
  * Specifies the enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#enterprise_project_id DataHuaweicloudSecmasterWorkspaces#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#id DataHuaweicloudSecmasterWorkspaces#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the workspace IDs, which is separated by commas (,).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#ids DataHuaweicloudSecmasterWorkspaces#ids}
  */
  readonly ids?: string;
  /**
  * Specifies whether to query the view. The value can be **true** or **false**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#is_view DataHuaweicloudSecmasterWorkspaces#is_view}
  */
  readonly isView?: string;
  /**
  * Specifies the workspace name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#name DataHuaweicloudSecmasterWorkspaces#name}
  */
  readonly name?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#region DataHuaweicloudSecmasterWorkspaces#region}
  */
  readonly region?: string;
  /**
  * Specifies the space ID bound to the view.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#view_bind_id DataHuaweicloudSecmasterWorkspaces#view_bind_id}
  */
  readonly viewBindId?: string;
  /**
  * Specifies the space name bound to the view.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#view_bind_name DataHuaweicloudSecmasterWorkspaces#view_bind_name}
  */
  readonly viewBindName?: string;
}
export interface DataHuaweicloudSecmasterWorkspacesWorkspaces {
}

export function dataHuaweicloudSecmasterWorkspacesWorkspacesToTerraform(struct?: DataHuaweicloudSecmasterWorkspacesWorkspaces): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterWorkspacesWorkspacesToHclTerraform(struct?: DataHuaweicloudSecmasterWorkspacesWorkspaces): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterWorkspacesWorkspacesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterWorkspacesWorkspaces | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterWorkspacesWorkspaces | undefined) {
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

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // enterprise_project_id - computed: true, optional: false, required: false
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }

  // enterprise_project_name - computed: true, optional: false, required: false
  public get enterpriseProjectName() {
    return this.getStringAttribute('enterprise_project_name');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // is_view - computed: true, optional: false, required: false
  public get isView() {
    return this.getBooleanAttribute('is_view');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // view_bind_id - computed: true, optional: false, required: false
  public get viewBindId() {
    return this.getStringAttribute('view_bind_id');
  }

  // view_bind_name - computed: true, optional: false, required: false
  public get viewBindName() {
    return this.getStringAttribute('view_bind_name');
  }
}

export class DataHuaweicloudSecmasterWorkspacesWorkspacesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterWorkspacesWorkspacesOutputReference {
    return new DataHuaweicloudSecmasterWorkspacesWorkspacesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces huaweicloud_secmaster_workspaces}
*/
export class DataHuaweicloudSecmasterWorkspaces extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_workspaces";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudSecmasterWorkspaces resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudSecmasterWorkspaces to import
  * @param importFromId The id of the existing DataHuaweicloudSecmasterWorkspaces that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudSecmasterWorkspaces to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_workspaces", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workspaces huaweicloud_secmaster_workspaces} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudSecmasterWorkspacesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudSecmasterWorkspacesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_workspaces',
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
    this._createTimeEnd = config.createTimeEnd;
    this._createTimeStart = config.createTimeStart;
    this._description = config.description;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._ids = config.ids;
    this._isView = config.isView;
    this._name = config.name;
    this._region = config.region;
    this._viewBindId = config.viewBindId;
    this._viewBindName = config.viewBindName;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // create_time_end - computed: false, optional: true, required: false
  private _createTimeEnd?: string; 
  public get createTimeEnd() {
    return this.getStringAttribute('create_time_end');
  }
  public set createTimeEnd(value: string) {
    this._createTimeEnd = value;
  }
  public resetCreateTimeEnd() {
    this._createTimeEnd = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createTimeEndInput() {
    return this._createTimeEnd;
  }

  // create_time_start - computed: false, optional: true, required: false
  private _createTimeStart?: string; 
  public get createTimeStart() {
    return this.getStringAttribute('create_time_start');
  }
  public set createTimeStart(value: string) {
    this._createTimeStart = value;
  }
  public resetCreateTimeStart() {
    this._createTimeStart = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createTimeStartInput() {
    return this._createTimeStart;
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

  // ids - computed: false, optional: true, required: false
  private _ids?: string; 
  public get ids() {
    return this.getStringAttribute('ids');
  }
  public set ids(value: string) {
    this._ids = value;
  }
  public resetIds() {
    this._ids = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idsInput() {
    return this._ids;
  }

  // is_view - computed: false, optional: true, required: false
  private _isView?: string; 
  public get isView() {
    return this.getStringAttribute('is_view');
  }
  public set isView(value: string) {
    this._isView = value;
  }
  public resetIsView() {
    this._isView = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isViewInput() {
    return this._isView;
  }

  // name - computed: false, optional: true, required: false
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

  // view_bind_id - computed: false, optional: true, required: false
  private _viewBindId?: string; 
  public get viewBindId() {
    return this.getStringAttribute('view_bind_id');
  }
  public set viewBindId(value: string) {
    this._viewBindId = value;
  }
  public resetViewBindId() {
    this._viewBindId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get viewBindIdInput() {
    return this._viewBindId;
  }

  // view_bind_name - computed: false, optional: true, required: false
  private _viewBindName?: string; 
  public get viewBindName() {
    return this.getStringAttribute('view_bind_name');
  }
  public set viewBindName(value: string) {
    this._viewBindName = value;
  }
  public resetViewBindName() {
    this._viewBindName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get viewBindNameInput() {
    return this._viewBindName;
  }

  // workspaces - computed: true, optional: false, required: false
  private _workspaces = new DataHuaweicloudSecmasterWorkspacesWorkspacesList(this, "workspaces", false);
  public get workspaces() {
    return this._workspaces;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      create_time_end: cdktf.stringToTerraform(this._createTimeEnd),
      create_time_start: cdktf.stringToTerraform(this._createTimeStart),
      description: cdktf.stringToTerraform(this._description),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      ids: cdktf.stringToTerraform(this._ids),
      is_view: cdktf.stringToTerraform(this._isView),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      view_bind_id: cdktf.stringToTerraform(this._viewBindId),
      view_bind_name: cdktf.stringToTerraform(this._viewBindName),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      create_time_end: {
        value: cdktf.stringToHclTerraform(this._createTimeEnd),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      create_time_start: {
        value: cdktf.stringToHclTerraform(this._createTimeStart),
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
      ids: {
        value: cdktf.stringToHclTerraform(this._ids),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_view: {
        value: cdktf.stringToHclTerraform(this._isView),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      view_bind_id: {
        value: cdktf.stringToHclTerraform(this._viewBindId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      view_bind_name: {
        value: cdktf.stringToHclTerraform(this._viewBindName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

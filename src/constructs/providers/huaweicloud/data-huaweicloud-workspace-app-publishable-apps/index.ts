// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/workspace_app_publishable_apps
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudWorkspaceAppPublishableAppsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the ID of the application group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/workspace_app_publishable_apps#app_group_id DataHuaweicloudWorkspaceAppPublishableApps#app_group_id}
  */
  readonly appGroupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/workspace_app_publishable_apps#id DataHuaweicloudWorkspaceAppPublishableApps#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/workspace_app_publishable_apps#region DataHuaweicloudWorkspaceAppPublishableApps#region}
  */
  readonly region?: string;
}
export interface DataHuaweicloudWorkspaceAppPublishableAppsApps {
}

export function dataHuaweicloudWorkspaceAppPublishableAppsAppsToTerraform(struct?: DataHuaweicloudWorkspaceAppPublishableAppsApps): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudWorkspaceAppPublishableAppsAppsToHclTerraform(struct?: DataHuaweicloudWorkspaceAppPublishableAppsApps): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudWorkspaceAppPublishableAppsAppsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudWorkspaceAppPublishableAppsApps | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudWorkspaceAppPublishableAppsApps | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // command_param - computed: true, optional: false, required: false
  public get commandParam() {
    return this.getStringAttribute('command_param');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // execute_path - computed: true, optional: false, required: false
  public get executePath() {
    return this.getStringAttribute('execute_path');
  }

  // icon_index - computed: true, optional: false, required: false
  public get iconIndex() {
    return this.getNumberAttribute('icon_index');
  }

  // icon_path - computed: true, optional: false, required: false
  public get iconPath() {
    return this.getStringAttribute('icon_path');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // publishable - computed: true, optional: false, required: false
  public get publishable() {
    return this.getBooleanAttribute('publishable');
  }

  // publisher - computed: true, optional: false, required: false
  public get publisher() {
    return this.getStringAttribute('publisher');
  }

  // source_image_ids - computed: true, optional: false, required: false
  public get sourceImageIds() {
    return this.getListAttribute('source_image_ids');
  }

  // version - computed: true, optional: false, required: false
  public get version() {
    return this.getStringAttribute('version');
  }

  // work_path - computed: true, optional: false, required: false
  public get workPath() {
    return this.getStringAttribute('work_path');
  }
}

export class DataHuaweicloudWorkspaceAppPublishableAppsAppsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudWorkspaceAppPublishableAppsAppsOutputReference {
    return new DataHuaweicloudWorkspaceAppPublishableAppsAppsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/workspace_app_publishable_apps huaweicloud_workspace_app_publishable_apps}
*/
export class DataHuaweicloudWorkspaceAppPublishableApps extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_app_publishable_apps";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudWorkspaceAppPublishableApps resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudWorkspaceAppPublishableApps to import
  * @param importFromId The id of the existing DataHuaweicloudWorkspaceAppPublishableApps that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/workspace_app_publishable_apps#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudWorkspaceAppPublishableApps to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_app_publishable_apps", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/workspace_app_publishable_apps huaweicloud_workspace_app_publishable_apps} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudWorkspaceAppPublishableAppsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudWorkspaceAppPublishableAppsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_app_publishable_apps',
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
    this._appGroupId = config.appGroupId;
    this._id = config.id;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // app_group_id - computed: false, optional: false, required: true
  private _appGroupId?: string; 
  public get appGroupId() {
    return this.getStringAttribute('app_group_id');
  }
  public set appGroupId(value: string) {
    this._appGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get appGroupIdInput() {
    return this._appGroupId;
  }

  // apps - computed: true, optional: false, required: false
  private _apps = new DataHuaweicloudWorkspaceAppPublishableAppsAppsList(this, "apps", false);
  public get apps() {
    return this._apps;
  }

  // group_images - computed: true, optional: false, required: false
  public get groupImages() {
    return this.getListAttribute('group_images');
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
      app_group_id: cdktf.stringToTerraform(this._appGroupId),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      app_group_id: {
        value: cdktf.stringToHclTerraform(this._appGroupId),
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

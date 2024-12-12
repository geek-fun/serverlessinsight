// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WorkspaceAppPublishmentConfig extends cdktf.TerraformMetaArguments {
  /**
  * The APP group ID to which the application belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#app_group_id WorkspaceAppPublishment#app_group_id}
  */
  readonly appGroupId: string;
  /**
  * The command line parameter used to start the application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#command_param WorkspaceAppPublishment#command_param}
  */
  readonly commandParam?: string;
  /**
  * The description of the application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#description WorkspaceAppPublishment#description}
  */
  readonly description?: string;
  /**
  * The location where the application file is installed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#execute_path WorkspaceAppPublishment#execute_path}
  */
  readonly executePath: string;
  /**
  * The icon index of the application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#icon_index WorkspaceAppPublishment#icon_index}
  */
  readonly iconIndex?: number;
  /**
  * The path where the application icon is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#icon_path WorkspaceAppPublishment#icon_path}
  */
  readonly iconPath?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#id WorkspaceAppPublishment#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#name WorkspaceAppPublishment#name}
  */
  readonly name: string;
  /**
  * The publisher of the application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#publisher WorkspaceAppPublishment#publisher}
  */
  readonly publisher?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#region WorkspaceAppPublishment#region}
  */
  readonly region?: string;
  /**
  * Whether to run in sandbox mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#sandbox_enable WorkspaceAppPublishment#sandbox_enable}
  */
  readonly sandboxEnable?: boolean | cdktf.IResolvable;
  /**
  * The list of image IDs corresponding to the server instance to which the application belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#source_image_ids WorkspaceAppPublishment#source_image_ids}
  */
  readonly sourceImageIds?: string[];
  /**
  * The current status of the application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#status WorkspaceAppPublishment#status}
  */
  readonly status?: string;
  /**
  * The type of the application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#type WorkspaceAppPublishment#type}
  */
  readonly type: number;
  /**
  * The version of the application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#version WorkspaceAppPublishment#version}
  */
  readonly version?: string;
  /**
  * The publisher of the application.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#work_path WorkspaceAppPublishment#work_path}
  */
  readonly workPath?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment huaweicloud_workspace_app_publishment}
*/
export class WorkspaceAppPublishment extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_app_publishment";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WorkspaceAppPublishment resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WorkspaceAppPublishment to import
  * @param importFromId The id of the existing WorkspaceAppPublishment that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WorkspaceAppPublishment to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_app_publishment", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_publishment huaweicloud_workspace_app_publishment} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WorkspaceAppPublishmentConfig
  */
  public constructor(scope: Construct, id: string, config: WorkspaceAppPublishmentConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_app_publishment',
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
    this._commandParam = config.commandParam;
    this._description = config.description;
    this._executePath = config.executePath;
    this._iconIndex = config.iconIndex;
    this._iconPath = config.iconPath;
    this._id = config.id;
    this._name = config.name;
    this._publisher = config.publisher;
    this._region = config.region;
    this._sandboxEnable = config.sandboxEnable;
    this._sourceImageIds = config.sourceImageIds;
    this._status = config.status;
    this._type = config.type;
    this._version = config.version;
    this._workPath = config.workPath;
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

  // command_param - computed: false, optional: true, required: false
  private _commandParam?: string; 
  public get commandParam() {
    return this.getStringAttribute('command_param');
  }
  public set commandParam(value: string) {
    this._commandParam = value;
  }
  public resetCommandParam() {
    this._commandParam = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get commandParamInput() {
    return this._commandParam;
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

  // execute_path - computed: false, optional: false, required: true
  private _executePath?: string; 
  public get executePath() {
    return this.getStringAttribute('execute_path');
  }
  public set executePath(value: string) {
    this._executePath = value;
  }
  // Temporarily expose input value. Use with caution.
  public get executePathInput() {
    return this._executePath;
  }

  // icon_index - computed: false, optional: true, required: false
  private _iconIndex?: number; 
  public get iconIndex() {
    return this.getNumberAttribute('icon_index');
  }
  public set iconIndex(value: number) {
    this._iconIndex = value;
  }
  public resetIconIndex() {
    this._iconIndex = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get iconIndexInput() {
    return this._iconIndex;
  }

  // icon_path - computed: false, optional: true, required: false
  private _iconPath?: string; 
  public get iconPath() {
    return this.getStringAttribute('icon_path');
  }
  public set iconPath(value: string) {
    this._iconPath = value;
  }
  public resetIconPath() {
    this._iconPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get iconPathInput() {
    return this._iconPath;
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

  // published_at - computed: true, optional: false, required: false
  public get publishedAt() {
    return this.getStringAttribute('published_at');
  }

  // publisher - computed: false, optional: true, required: false
  private _publisher?: string; 
  public get publisher() {
    return this.getStringAttribute('publisher');
  }
  public set publisher(value: string) {
    this._publisher = value;
  }
  public resetPublisher() {
    this._publisher = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publisherInput() {
    return this._publisher;
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

  // sandbox_enable - computed: false, optional: true, required: false
  private _sandboxEnable?: boolean | cdktf.IResolvable; 
  public get sandboxEnable() {
    return this.getBooleanAttribute('sandbox_enable');
  }
  public set sandboxEnable(value: boolean | cdktf.IResolvable) {
    this._sandboxEnable = value;
  }
  public resetSandboxEnable() {
    this._sandboxEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sandboxEnableInput() {
    return this._sandboxEnable;
  }

  // source_image_ids - computed: false, optional: true, required: false
  private _sourceImageIds?: string[]; 
  public get sourceImageIds() {
    return this.getListAttribute('source_image_ids');
  }
  public set sourceImageIds(value: string[]) {
    this._sourceImageIds = value;
  }
  public resetSourceImageIds() {
    this._sourceImageIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceImageIdsInput() {
    return this._sourceImageIds;
  }

  // status - computed: true, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // type - computed: false, optional: false, required: true
  private _type?: number; 
  public get type() {
    return this.getNumberAttribute('type');
  }
  public set type(value: number) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // version - computed: false, optional: true, required: false
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  public resetVersion() {
    this._version = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // work_path - computed: false, optional: true, required: false
  private _workPath?: string; 
  public get workPath() {
    return this.getStringAttribute('work_path');
  }
  public set workPath(value: string) {
    this._workPath = value;
  }
  public resetWorkPath() {
    this._workPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get workPathInput() {
    return this._workPath;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      app_group_id: cdktf.stringToTerraform(this._appGroupId),
      command_param: cdktf.stringToTerraform(this._commandParam),
      description: cdktf.stringToTerraform(this._description),
      execute_path: cdktf.stringToTerraform(this._executePath),
      icon_index: cdktf.numberToTerraform(this._iconIndex),
      icon_path: cdktf.stringToTerraform(this._iconPath),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      publisher: cdktf.stringToTerraform(this._publisher),
      region: cdktf.stringToTerraform(this._region),
      sandbox_enable: cdktf.booleanToTerraform(this._sandboxEnable),
      source_image_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._sourceImageIds),
      status: cdktf.stringToTerraform(this._status),
      type: cdktf.numberToTerraform(this._type),
      version: cdktf.stringToTerraform(this._version),
      work_path: cdktf.stringToTerraform(this._workPath),
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
      command_param: {
        value: cdktf.stringToHclTerraform(this._commandParam),
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
      execute_path: {
        value: cdktf.stringToHclTerraform(this._executePath),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      icon_index: {
        value: cdktf.numberToHclTerraform(this._iconIndex),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      icon_path: {
        value: cdktf.stringToHclTerraform(this._iconPath),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      publisher: {
        value: cdktf.stringToHclTerraform(this._publisher),
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
      sandbox_enable: {
        value: cdktf.booleanToHclTerraform(this._sandboxEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      source_image_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._sourceImageIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      type: {
        value: cdktf.numberToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      version: {
        value: cdktf.stringToHclTerraform(this._version),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      work_path: {
        value: cdktf.stringToHclTerraform(this._workPath),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_enable
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface SecmasterPlaybookEnableConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the actived playbook version ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_enable#active_version_id SecmasterPlaybookEnable#active_version_id}
  */
  readonly activeVersionId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_enable#id SecmasterPlaybookEnable#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the playbook ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_enable#playbook_id SecmasterPlaybookEnable#playbook_id}
  */
  readonly playbookId: string;
  /**
  * Specifies the playbook name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_enable#playbook_name SecmasterPlaybookEnable#playbook_name}
  */
  readonly playbookName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_enable#region SecmasterPlaybookEnable#region}
  */
  readonly region?: string;
  /**
  * Specifies the ID of the workspace to which the playbook version belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_enable#workspace_id SecmasterPlaybookEnable#workspace_id}
  */
  readonly workspaceId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_enable huaweicloud_secmaster_playbook_enable}
*/
export class SecmasterPlaybookEnable extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_playbook_enable";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a SecmasterPlaybookEnable resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the SecmasterPlaybookEnable to import
  * @param importFromId The id of the existing SecmasterPlaybookEnable that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_enable#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the SecmasterPlaybookEnable to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_playbook_enable", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/secmaster_playbook_enable huaweicloud_secmaster_playbook_enable} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options SecmasterPlaybookEnableConfig
  */
  public constructor(scope: Construct, id: string, config: SecmasterPlaybookEnableConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_playbook_enable',
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
    this._activeVersionId = config.activeVersionId;
    this._id = config.id;
    this._playbookId = config.playbookId;
    this._playbookName = config.playbookName;
    this._region = config.region;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // active_version_id - computed: false, optional: false, required: true
  private _activeVersionId?: string; 
  public get activeVersionId() {
    return this.getStringAttribute('active_version_id');
  }
  public set activeVersionId(value: string) {
    this._activeVersionId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get activeVersionIdInput() {
    return this._activeVersionId;
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

  // playbook_id - computed: false, optional: false, required: true
  private _playbookId?: string; 
  public get playbookId() {
    return this.getStringAttribute('playbook_id');
  }
  public set playbookId(value: string) {
    this._playbookId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get playbookIdInput() {
    return this._playbookId;
  }

  // playbook_name - computed: false, optional: false, required: true
  private _playbookName?: string; 
  public get playbookName() {
    return this.getStringAttribute('playbook_name');
  }
  public set playbookName(value: string) {
    this._playbookName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get playbookNameInput() {
    return this._playbookName;
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

  // workspace_id - computed: false, optional: false, required: true
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      active_version_id: cdktf.stringToTerraform(this._activeVersionId),
      id: cdktf.stringToTerraform(this._id),
      playbook_id: cdktf.stringToTerraform(this._playbookId),
      playbook_name: cdktf.stringToTerraform(this._playbookName),
      region: cdktf.stringToTerraform(this._region),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      active_version_id: {
        value: cdktf.stringToHclTerraform(this._activeVersionId),
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
      playbook_id: {
        value: cdktf.stringToHclTerraform(this._playbookId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      playbook_name: {
        value: cdktf.stringToHclTerraform(this._playbookName),
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
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_storage_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WorkspaceAppStoragePolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * The collection of permissions that client can use to access storage.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_storage_policy#client_actions WorkspaceAppStoragePolicy#client_actions}
  */
  readonly clientActions?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_storage_policy#id WorkspaceAppStoragePolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The region where the custom storage permission policy is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_storage_policy#region WorkspaceAppStoragePolicy#region}
  */
  readonly region?: string;
  /**
  * The collection of permissions that server can use to access storage.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_storage_policy#server_actions WorkspaceAppStoragePolicy#server_actions}
  */
  readonly serverActions: string[];
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_storage_policy huaweicloud_workspace_app_storage_policy}
*/
export class WorkspaceAppStoragePolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_app_storage_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WorkspaceAppStoragePolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WorkspaceAppStoragePolicy to import
  * @param importFromId The id of the existing WorkspaceAppStoragePolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_storage_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WorkspaceAppStoragePolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_app_storage_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_storage_policy huaweicloud_workspace_app_storage_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WorkspaceAppStoragePolicyConfig
  */
  public constructor(scope: Construct, id: string, config: WorkspaceAppStoragePolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_app_storage_policy',
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
    this._clientActions = config.clientActions;
    this._id = config.id;
    this._region = config.region;
    this._serverActions = config.serverActions;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // client_actions - computed: false, optional: true, required: false
  private _clientActions?: string[]; 
  public get clientActions() {
    return cdktf.Fn.tolist(this.getListAttribute('client_actions'));
  }
  public set clientActions(value: string[]) {
    this._clientActions = value;
  }
  public resetClientActions() {
    this._clientActions = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clientActionsInput() {
    return this._clientActions;
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

  // server_actions - computed: false, optional: false, required: true
  private _serverActions?: string[]; 
  public get serverActions() {
    return cdktf.Fn.tolist(this.getListAttribute('server_actions'));
  }
  public set serverActions(value: string[]) {
    this._serverActions = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serverActionsInput() {
    return this._serverActions;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      client_actions: cdktf.listMapper(cdktf.stringToTerraform, false)(this._clientActions),
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      server_actions: cdktf.listMapper(cdktf.stringToTerraform, false)(this._serverActions),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      client_actions: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._clientActions),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
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
      server_actions: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._serverActions),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

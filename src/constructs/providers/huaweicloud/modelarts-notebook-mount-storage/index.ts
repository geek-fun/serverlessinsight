// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_notebook_mount_storage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ModelartsNotebookMountStorageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_notebook_mount_storage#id ModelartsNotebookMountStorage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_notebook_mount_storage#local_mount_directory ModelartsNotebookMountStorage#local_mount_directory}
  */
  readonly localMountDirectory: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_notebook_mount_storage#notebook_id ModelartsNotebookMountStorage#notebook_id}
  */
  readonly notebookId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_notebook_mount_storage#region ModelartsNotebookMountStorage#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_notebook_mount_storage#storage_path ModelartsNotebookMountStorage#storage_path}
  */
  readonly storagePath: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_notebook_mount_storage huaweicloud_modelarts_notebook_mount_storage}
*/
export class ModelartsNotebookMountStorage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_modelarts_notebook_mount_storage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ModelartsNotebookMountStorage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ModelartsNotebookMountStorage to import
  * @param importFromId The id of the existing ModelartsNotebookMountStorage that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_notebook_mount_storage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ModelartsNotebookMountStorage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_modelarts_notebook_mount_storage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/modelarts_notebook_mount_storage huaweicloud_modelarts_notebook_mount_storage} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ModelartsNotebookMountStorageConfig
  */
  public constructor(scope: Construct, id: string, config: ModelartsNotebookMountStorageConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_modelarts_notebook_mount_storage',
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
    this._id = config.id;
    this._localMountDirectory = config.localMountDirectory;
    this._notebookId = config.notebookId;
    this._region = config.region;
    this._storagePath = config.storagePath;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // local_mount_directory - computed: false, optional: false, required: true
  private _localMountDirectory?: string; 
  public get localMountDirectory() {
    return this.getStringAttribute('local_mount_directory');
  }
  public set localMountDirectory(value: string) {
    this._localMountDirectory = value;
  }
  // Temporarily expose input value. Use with caution.
  public get localMountDirectoryInput() {
    return this._localMountDirectory;
  }

  // mount_id - computed: true, optional: false, required: false
  public get mountId() {
    return this.getStringAttribute('mount_id');
  }

  // notebook_id - computed: false, optional: false, required: true
  private _notebookId?: string; 
  public get notebookId() {
    return this.getStringAttribute('notebook_id');
  }
  public set notebookId(value: string) {
    this._notebookId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get notebookIdInput() {
    return this._notebookId;
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // storage_path - computed: false, optional: false, required: true
  private _storagePath?: string; 
  public get storagePath() {
    return this.getStringAttribute('storage_path');
  }
  public set storagePath(value: string) {
    this._storagePath = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storagePathInput() {
    return this._storagePath;
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      local_mount_directory: cdktf.stringToTerraform(this._localMountDirectory),
      notebook_id: cdktf.stringToTerraform(this._notebookId),
      region: cdktf.stringToTerraform(this._region),
      storage_path: cdktf.stringToTerraform(this._storagePath),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      local_mount_directory: {
        value: cdktf.stringToHclTerraform(this._localMountDirectory),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      notebook_id: {
        value: cdktf.stringToHclTerraform(this._notebookId),
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
      storage_path: {
        value: cdktf.stringToHclTerraform(this._storagePath),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

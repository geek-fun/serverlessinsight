// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_nas_storage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WorkspaceAppNasStorageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_nas_storage#id WorkspaceAppNasStorage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the NAS storage.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_nas_storage#name WorkspaceAppNasStorage#name}
  */
  readonly name: string;
  /**
  * The region where the NAS storage is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_nas_storage#region WorkspaceAppNasStorage#region}
  */
  readonly region?: string;
  /**
  * storage_metadata block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_nas_storage#storage_metadata WorkspaceAppNasStorage#storage_metadata}
  */
  readonly storageMetadata: WorkspaceAppNasStorageStorageMetadata;
}
export interface WorkspaceAppNasStorageStorageMetadata {
  /**
  * The storage type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_nas_storage#storage_class WorkspaceAppNasStorage#storage_class}
  */
  readonly storageClass: string;
  /**
  * The storage name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_nas_storage#storage_handle WorkspaceAppNasStorage#storage_handle}
  */
  readonly storageHandle: string;
}

export function workspaceAppNasStorageStorageMetadataToTerraform(struct?: WorkspaceAppNasStorageStorageMetadataOutputReference | WorkspaceAppNasStorageStorageMetadata): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    storage_class: cdktf.stringToTerraform(struct!.storageClass),
    storage_handle: cdktf.stringToTerraform(struct!.storageHandle),
  }
}


export function workspaceAppNasStorageStorageMetadataToHclTerraform(struct?: WorkspaceAppNasStorageStorageMetadataOutputReference | WorkspaceAppNasStorageStorageMetadata): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    storage_class: {
      value: cdktf.stringToHclTerraform(struct!.storageClass),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    storage_handle: {
      value: cdktf.stringToHclTerraform(struct!.storageHandle),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceAppNasStorageStorageMetadataOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WorkspaceAppNasStorageStorageMetadata | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._storageClass !== undefined) {
      hasAnyValues = true;
      internalValueResult.storageClass = this._storageClass;
    }
    if (this._storageHandle !== undefined) {
      hasAnyValues = true;
      internalValueResult.storageHandle = this._storageHandle;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceAppNasStorageStorageMetadata | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._storageClass = undefined;
      this._storageHandle = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._storageClass = value.storageClass;
      this._storageHandle = value.storageHandle;
    }
  }

  // export_location - computed: true, optional: false, required: false
  public get exportLocation() {
    return this.getStringAttribute('export_location');
  }

  // storage_class - computed: false, optional: false, required: true
  private _storageClass?: string; 
  public get storageClass() {
    return this.getStringAttribute('storage_class');
  }
  public set storageClass(value: string) {
    this._storageClass = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageClassInput() {
    return this._storageClass;
  }

  // storage_handle - computed: false, optional: false, required: true
  private _storageHandle?: string; 
  public get storageHandle() {
    return this.getStringAttribute('storage_handle');
  }
  public set storageHandle(value: string) {
    this._storageHandle = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageHandleInput() {
    return this._storageHandle;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_nas_storage huaweicloud_workspace_app_nas_storage}
*/
export class WorkspaceAppNasStorage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_app_nas_storage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WorkspaceAppNasStorage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WorkspaceAppNasStorage to import
  * @param importFromId The id of the existing WorkspaceAppNasStorage that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_nas_storage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WorkspaceAppNasStorage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_app_nas_storage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_nas_storage huaweicloud_workspace_app_nas_storage} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WorkspaceAppNasStorageConfig
  */
  public constructor(scope: Construct, id: string, config: WorkspaceAppNasStorageConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_app_nas_storage',
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
    this._name = config.name;
    this._region = config.region;
    this._storageMetadata.internalValue = config.storageMetadata;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // storage_metadata - computed: false, optional: false, required: true
  private _storageMetadata = new WorkspaceAppNasStorageStorageMetadataOutputReference(this, "storage_metadata");
  public get storageMetadata() {
    return this._storageMetadata;
  }
  public putStorageMetadata(value: WorkspaceAppNasStorageStorageMetadata) {
    this._storageMetadata.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageMetadataInput() {
    return this._storageMetadata.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      storage_metadata: workspaceAppNasStorageStorageMetadataToTerraform(this._storageMetadata.internalValue),
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
      storage_metadata: {
        value: workspaceAppNasStorageStorageMetadataToHclTerraform(this._storageMetadata.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WorkspaceAppNasStorageStorageMetadataList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

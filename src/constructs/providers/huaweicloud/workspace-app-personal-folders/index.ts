// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WorkspaceAppPersonalFoldersConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders#id WorkspaceAppPersonalFolders#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The region where the personal folders are located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders#region WorkspaceAppPersonalFolders#region}
  */
  readonly region?: string;
  /**
  * The NAS storage ID to which the personal folders belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders#storage_id WorkspaceAppPersonalFolders#storage_id}
  */
  readonly storageId: string;
  /**
  * assignments block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders#assignments WorkspaceAppPersonalFolders#assignments}
  */
  readonly assignments: WorkspaceAppPersonalFoldersAssignments[] | cdktf.IResolvable;
}
export interface WorkspaceAppPersonalFoldersAssignments {
  /**
  * The object name of personal folder assignment.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders#attach WorkspaceAppPersonalFolders#attach}
  */
  readonly attach: string;
  /**
  * The type of personal folder assignment.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders#attach_type WorkspaceAppPersonalFolders#attach_type}
  */
  readonly attachType?: string;
  /**
  * The ID of the storage permission policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders#policy_statement_id WorkspaceAppPersonalFolders#policy_statement_id}
  */
  readonly policyStatementId: string;
}

export function workspaceAppPersonalFoldersAssignmentsToTerraform(struct?: WorkspaceAppPersonalFoldersAssignments | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    attach: cdktf.stringToTerraform(struct!.attach),
    attach_type: cdktf.stringToTerraform(struct!.attachType),
    policy_statement_id: cdktf.stringToTerraform(struct!.policyStatementId),
  }
}


export function workspaceAppPersonalFoldersAssignmentsToHclTerraform(struct?: WorkspaceAppPersonalFoldersAssignments | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    attach: {
      value: cdktf.stringToHclTerraform(struct!.attach),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    attach_type: {
      value: cdktf.stringToHclTerraform(struct!.attachType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    policy_statement_id: {
      value: cdktf.stringToHclTerraform(struct!.policyStatementId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceAppPersonalFoldersAssignmentsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): WorkspaceAppPersonalFoldersAssignments | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._attach !== undefined) {
      hasAnyValues = true;
      internalValueResult.attach = this._attach;
    }
    if (this._attachType !== undefined) {
      hasAnyValues = true;
      internalValueResult.attachType = this._attachType;
    }
    if (this._policyStatementId !== undefined) {
      hasAnyValues = true;
      internalValueResult.policyStatementId = this._policyStatementId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceAppPersonalFoldersAssignments | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._attach = undefined;
      this._attachType = undefined;
      this._policyStatementId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._attach = value.attach;
      this._attachType = value.attachType;
      this._policyStatementId = value.policyStatementId;
    }
  }

  // attach - computed: false, optional: false, required: true
  private _attach?: string; 
  public get attach() {
    return this.getStringAttribute('attach');
  }
  public set attach(value: string) {
    this._attach = value;
  }
  // Temporarily expose input value. Use with caution.
  public get attachInput() {
    return this._attach;
  }

  // attach_type - computed: true, optional: true, required: false
  private _attachType?: string; 
  public get attachType() {
    return this.getStringAttribute('attach_type');
  }
  public set attachType(value: string) {
    this._attachType = value;
  }
  public resetAttachType() {
    this._attachType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get attachTypeInput() {
    return this._attachType;
  }

  // policy_statement_id - computed: false, optional: false, required: true
  private _policyStatementId?: string; 
  public get policyStatementId() {
    return this.getStringAttribute('policy_statement_id');
  }
  public set policyStatementId(value: string) {
    this._policyStatementId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get policyStatementIdInput() {
    return this._policyStatementId;
  }
}

export class WorkspaceAppPersonalFoldersAssignmentsList extends cdktf.ComplexList {
  public internalValue? : WorkspaceAppPersonalFoldersAssignments[] | cdktf.IResolvable

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
  public get(index: number): WorkspaceAppPersonalFoldersAssignmentsOutputReference {
    return new WorkspaceAppPersonalFoldersAssignmentsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders huaweicloud_workspace_app_personal_folders}
*/
export class WorkspaceAppPersonalFolders extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_app_personal_folders";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WorkspaceAppPersonalFolders resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WorkspaceAppPersonalFolders to import
  * @param importFromId The id of the existing WorkspaceAppPersonalFolders that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WorkspaceAppPersonalFolders to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_app_personal_folders", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_personal_folders huaweicloud_workspace_app_personal_folders} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WorkspaceAppPersonalFoldersConfig
  */
  public constructor(scope: Construct, id: string, config: WorkspaceAppPersonalFoldersConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_app_personal_folders',
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
    this._region = config.region;
    this._storageId = config.storageId;
    this._assignments.internalValue = config.assignments;
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

  // storage_id - computed: false, optional: false, required: true
  private _storageId?: string; 
  public get storageId() {
    return this.getStringAttribute('storage_id');
  }
  public set storageId(value: string) {
    this._storageId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageIdInput() {
    return this._storageId;
  }

  // assignments - computed: false, optional: false, required: true
  private _assignments = new WorkspaceAppPersonalFoldersAssignmentsList(this, "assignments", true);
  public get assignments() {
    return this._assignments;
  }
  public putAssignments(value: WorkspaceAppPersonalFoldersAssignments[] | cdktf.IResolvable) {
    this._assignments.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get assignmentsInput() {
    return this._assignments.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      storage_id: cdktf.stringToTerraform(this._storageId),
      assignments: cdktf.listMapper(workspaceAppPersonalFoldersAssignmentsToTerraform, true)(this._assignments.internalValue),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      storage_id: {
        value: cdktf.stringToHclTerraform(this._storageId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      assignments: {
        value: cdktf.listMapperHcl(workspaceAppPersonalFoldersAssignmentsToHclTerraform, true)(this._assignments.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "WorkspaceAppPersonalFoldersAssignmentsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

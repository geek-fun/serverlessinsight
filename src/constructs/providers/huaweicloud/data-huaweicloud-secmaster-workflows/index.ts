// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudSecmasterWorkflowsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the data class ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#data_class_id DataHuaweicloudSecmasterWorkflows#data_class_id}
  */
  readonly dataClassId?: string;
  /**
  * Specifies the data class name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#data_class_name DataHuaweicloudSecmasterWorkflows#data_class_name}
  */
  readonly dataClassName?: string;
  /**
  * Specifies the workflow description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#description DataHuaweicloudSecmasterWorkflows#description}
  */
  readonly description?: string;
  /**
  * Specifies whether the version is enabled. The value can be **true** and **false**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#enabled DataHuaweicloudSecmasterWorkflows#enabled}
  */
  readonly enabled?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#id DataHuaweicloudSecmasterWorkflows#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies whether the version is the latest. The value can be **true** and **false**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#last_version DataHuaweicloudSecmasterWorkflows#last_version}
  */
  readonly lastVersion?: string;
  /**
  * Specifies the workflow name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#name DataHuaweicloudSecmasterWorkflows#name}
  */
  readonly name?: string;
  /**
  * Specifies the region in which to query the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#region DataHuaweicloudSecmasterWorkflows#region}
  */
  readonly region?: string;
  /**
  * Specifies the workflow type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#type DataHuaweicloudSecmasterWorkflows#type}
  */
  readonly type?: string;
  /**
  * Specifies the workspace ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#workspace_id DataHuaweicloudSecmasterWorkflows#workspace_id}
  */
  readonly workspaceId: string;
}
export interface DataHuaweicloudSecmasterWorkflowsWorkflows {
}

export function dataHuaweicloudSecmasterWorkflowsWorkflowsToTerraform(struct?: DataHuaweicloudSecmasterWorkflowsWorkflows): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudSecmasterWorkflowsWorkflowsToHclTerraform(struct?: DataHuaweicloudSecmasterWorkflowsWorkflows): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudSecmasterWorkflowsWorkflowsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudSecmasterWorkflowsWorkflows | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudSecmasterWorkflowsWorkflows | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // approve_role - computed: true, optional: false, required: false
  public get approveRole() {
    return this.getStringAttribute('approve_role');
  }

  // current_approval_version_id - computed: true, optional: false, required: false
  public get currentApprovalVersionId() {
    return this.getStringAttribute('current_approval_version_id');
  }

  // current_rejected_version_id - computed: true, optional: false, required: false
  public get currentRejectedVersionId() {
    return this.getStringAttribute('current_rejected_version_id');
  }

  // data_class_id - computed: true, optional: false, required: false
  public get dataClassId() {
    return this.getStringAttribute('data_class_id');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // edit_role - computed: true, optional: false, required: false
  public get editRole() {
    return this.getStringAttribute('edit_role');
  }

  // enabled - computed: true, optional: false, required: false
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }

  // engine_type - computed: true, optional: false, required: false
  public get engineType() {
    return this.getStringAttribute('engine_type');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // use_role - computed: true, optional: false, required: false
  public get useRole() {
    return this.getStringAttribute('use_role');
  }

  // version_id - computed: true, optional: false, required: false
  public get versionId() {
    return this.getStringAttribute('version_id');
  }

  // workspace_id - computed: true, optional: false, required: false
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
}

export class DataHuaweicloudSecmasterWorkflowsWorkflowsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudSecmasterWorkflowsWorkflowsOutputReference {
    return new DataHuaweicloudSecmasterWorkflowsWorkflowsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows huaweicloud_secmaster_workflows}
*/
export class DataHuaweicloudSecmasterWorkflows extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_secmaster_workflows";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudSecmasterWorkflows resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudSecmasterWorkflows to import
  * @param importFromId The id of the existing DataHuaweicloudSecmasterWorkflows that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudSecmasterWorkflows to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_secmaster_workflows", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/secmaster_workflows huaweicloud_secmaster_workflows} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudSecmasterWorkflowsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudSecmasterWorkflowsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_secmaster_workflows',
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
    this._dataClassId = config.dataClassId;
    this._dataClassName = config.dataClassName;
    this._description = config.description;
    this._enabled = config.enabled;
    this._id = config.id;
    this._lastVersion = config.lastVersion;
    this._name = config.name;
    this._region = config.region;
    this._type = config.type;
    this._workspaceId = config.workspaceId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // data_class_id - computed: false, optional: true, required: false
  private _dataClassId?: string; 
  public get dataClassId() {
    return this.getStringAttribute('data_class_id');
  }
  public set dataClassId(value: string) {
    this._dataClassId = value;
  }
  public resetDataClassId() {
    this._dataClassId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataClassIdInput() {
    return this._dataClassId;
  }

  // data_class_name - computed: false, optional: true, required: false
  private _dataClassName?: string; 
  public get dataClassName() {
    return this.getStringAttribute('data_class_name');
  }
  public set dataClassName(value: string) {
    this._dataClassName = value;
  }
  public resetDataClassName() {
    this._dataClassName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataClassNameInput() {
    return this._dataClassName;
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

  // enabled - computed: false, optional: true, required: false
  private _enabled?: string; 
  public get enabled() {
    return this.getStringAttribute('enabled');
  }
  public set enabled(value: string) {
    this._enabled = value;
  }
  public resetEnabled() {
    this._enabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
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

  // last_version - computed: false, optional: true, required: false
  private _lastVersion?: string; 
  public get lastVersion() {
    return this.getStringAttribute('last_version');
  }
  public set lastVersion(value: string) {
    this._lastVersion = value;
  }
  public resetLastVersion() {
    this._lastVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lastVersionInput() {
    return this._lastVersion;
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

  // type - computed: false, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // workflows - computed: true, optional: false, required: false
  private _workflows = new DataHuaweicloudSecmasterWorkflowsWorkflowsList(this, "workflows", false);
  public get workflows() {
    return this._workflows;
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
      data_class_id: cdktf.stringToTerraform(this._dataClassId),
      data_class_name: cdktf.stringToTerraform(this._dataClassName),
      description: cdktf.stringToTerraform(this._description),
      enabled: cdktf.stringToTerraform(this._enabled),
      id: cdktf.stringToTerraform(this._id),
      last_version: cdktf.stringToTerraform(this._lastVersion),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.stringToTerraform(this._type),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      data_class_id: {
        value: cdktf.stringToHclTerraform(this._dataClassId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      data_class_name: {
        value: cdktf.stringToHclTerraform(this._dataClassName),
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
      enabled: {
        value: cdktf.stringToHclTerraform(this._enabled),
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
      last_version: {
        value: cdktf.stringToHclTerraform(this._lastVersion),
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
      type: {
        value: cdktf.stringToHclTerraform(this._type),
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

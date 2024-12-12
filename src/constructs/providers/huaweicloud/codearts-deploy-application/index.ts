// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CodeartsDeployApplicationConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the source information transferred by the pipeline.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#artifact_source_system CodeartsDeployApplication#artifact_source_system}
  */
  readonly artifactSourceSystem?: string;
  /**
  * Specifies the artifact type for the pipeline source.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#artifact_type CodeartsDeployApplication#artifact_type}
  */
  readonly artifactType?: string;
  /**
  * Specifies the creation type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#create_type CodeartsDeployApplication#create_type}
  */
  readonly createType: string;
  /**
  * Specifies the application description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#description CodeartsDeployApplication#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#id CodeartsDeployApplication#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies whether the application is in draft status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#is_draft CodeartsDeployApplication#is_draft}
  */
  readonly isDraft: boolean | cdktf.IResolvable;
  /**
  * Specifies the application name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#name CodeartsDeployApplication#name}
  */
  readonly name: string;
  /**
  * Specifies the project ID for CodeArts service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#project_id CodeartsDeployApplication#project_id}
  */
  readonly projectId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#region CodeartsDeployApplication#region}
  */
  readonly region?: string;
  /**
  * Specifies the custom slave resource pool ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#resource_pool_id CodeartsDeployApplication#resource_pool_id}
  */
  readonly resourcePoolId?: string;
  /**
  * schema: Deprecated; Currently, the field is useless for creating API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#template_id CodeartsDeployApplication#template_id}
  */
  readonly templateId?: string;
  /**
  * Specifies where a deployment task can be executed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#trigger_source CodeartsDeployApplication#trigger_source}
  */
  readonly triggerSource: string;
  /**
  * operation_list block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#operation_list CodeartsDeployApplication#operation_list}
  */
  readonly operationList?: CodeartsDeployApplicationOperationListStruct[] | cdktf.IResolvable;
}
export interface CodeartsDeployApplicationOperationListStruct {
  /**
  * Specifies the download URL.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#code CodeartsDeployApplication#code}
  */
  readonly code?: string;
  /**
  * Specifies the step description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#description CodeartsDeployApplication#description}
  */
  readonly description?: string;
  /**
  * Specifies the entry function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#entrance CodeartsDeployApplication#entrance}
  */
  readonly entrance?: string;
  /**
  * Specifies the module ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#module_id CodeartsDeployApplication#module_id}
  */
  readonly moduleId?: string;
  /**
  * Specifies the step name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#name CodeartsDeployApplication#name}
  */
  readonly name?: string;
  /**
  * Specifies the parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#params CodeartsDeployApplication#params}
  */
  readonly params?: string;
  /**
  * Specifies the version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#version CodeartsDeployApplication#version}
  */
  readonly version?: string;
}

export function codeartsDeployApplicationOperationListStructToTerraform(struct?: CodeartsDeployApplicationOperationListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    code: cdktf.stringToTerraform(struct!.code),
    description: cdktf.stringToTerraform(struct!.description),
    entrance: cdktf.stringToTerraform(struct!.entrance),
    module_id: cdktf.stringToTerraform(struct!.moduleId),
    name: cdktf.stringToTerraform(struct!.name),
    params: cdktf.stringToTerraform(struct!.params),
    version: cdktf.stringToTerraform(struct!.version),
  }
}


export function codeartsDeployApplicationOperationListStructToHclTerraform(struct?: CodeartsDeployApplicationOperationListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    code: {
      value: cdktf.stringToHclTerraform(struct!.code),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    entrance: {
      value: cdktf.stringToHclTerraform(struct!.entrance),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    module_id: {
      value: cdktf.stringToHclTerraform(struct!.moduleId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    params: {
      value: cdktf.stringToHclTerraform(struct!.params),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    version: {
      value: cdktf.stringToHclTerraform(struct!.version),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CodeartsDeployApplicationOperationListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CodeartsDeployApplicationOperationListStruct | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._code !== undefined) {
      hasAnyValues = true;
      internalValueResult.code = this._code;
    }
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._entrance !== undefined) {
      hasAnyValues = true;
      internalValueResult.entrance = this._entrance;
    }
    if (this._moduleId !== undefined) {
      hasAnyValues = true;
      internalValueResult.moduleId = this._moduleId;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._params !== undefined) {
      hasAnyValues = true;
      internalValueResult.params = this._params;
    }
    if (this._version !== undefined) {
      hasAnyValues = true;
      internalValueResult.version = this._version;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CodeartsDeployApplicationOperationListStruct | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._code = undefined;
      this._description = undefined;
      this._entrance = undefined;
      this._moduleId = undefined;
      this._name = undefined;
      this._params = undefined;
      this._version = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._code = value.code;
      this._description = value.description;
      this._entrance = value.entrance;
      this._moduleId = value.moduleId;
      this._name = value.name;
      this._params = value.params;
      this._version = value.version;
    }
  }

  // code - computed: false, optional: true, required: false
  private _code?: string; 
  public get code() {
    return this.getStringAttribute('code');
  }
  public set code(value: string) {
    this._code = value;
  }
  public resetCode() {
    this._code = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeInput() {
    return this._code;
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

  // entrance - computed: false, optional: true, required: false
  private _entrance?: string; 
  public get entrance() {
    return this.getStringAttribute('entrance');
  }
  public set entrance(value: string) {
    this._entrance = value;
  }
  public resetEntrance() {
    this._entrance = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get entranceInput() {
    return this._entrance;
  }

  // module_id - computed: false, optional: true, required: false
  private _moduleId?: string; 
  public get moduleId() {
    return this.getStringAttribute('module_id');
  }
  public set moduleId(value: string) {
    this._moduleId = value;
  }
  public resetModuleId() {
    this._moduleId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get moduleIdInput() {
    return this._moduleId;
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

  // params - computed: false, optional: true, required: false
  private _params?: string; 
  public get params() {
    return this.getStringAttribute('params');
  }
  public set params(value: string) {
    this._params = value;
  }
  public resetParams() {
    this._params = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get paramsInput() {
    return this._params;
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
}

export class CodeartsDeployApplicationOperationListStructList extends cdktf.ComplexList {
  public internalValue? : CodeartsDeployApplicationOperationListStruct[] | cdktf.IResolvable

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
  public get(index: number): CodeartsDeployApplicationOperationListStructOutputReference {
    return new CodeartsDeployApplicationOperationListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application huaweicloud_codearts_deploy_application}
*/
export class CodeartsDeployApplication extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_codearts_deploy_application";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CodeartsDeployApplication resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CodeartsDeployApplication to import
  * @param importFromId The id of the existing CodeartsDeployApplication that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CodeartsDeployApplication to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_codearts_deploy_application", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_application huaweicloud_codearts_deploy_application} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CodeartsDeployApplicationConfig
  */
  public constructor(scope: Construct, id: string, config: CodeartsDeployApplicationConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_codearts_deploy_application',
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
    this._artifactSourceSystem = config.artifactSourceSystem;
    this._artifactType = config.artifactType;
    this._createType = config.createType;
    this._description = config.description;
    this._id = config.id;
    this._isDraft = config.isDraft;
    this._name = config.name;
    this._projectId = config.projectId;
    this._region = config.region;
    this._resourcePoolId = config.resourcePoolId;
    this._templateId = config.templateId;
    this._triggerSource = config.triggerSource;
    this._operationList.internalValue = config.operationList;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // artifact_source_system - computed: false, optional: true, required: false
  private _artifactSourceSystem?: string; 
  public get artifactSourceSystem() {
    return this.getStringAttribute('artifact_source_system');
  }
  public set artifactSourceSystem(value: string) {
    this._artifactSourceSystem = value;
  }
  public resetArtifactSourceSystem() {
    this._artifactSourceSystem = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get artifactSourceSystemInput() {
    return this._artifactSourceSystem;
  }

  // artifact_type - computed: false, optional: true, required: false
  private _artifactType?: string; 
  public get artifactType() {
    return this.getStringAttribute('artifact_type');
  }
  public set artifactType(value: string) {
    this._artifactType = value;
  }
  public resetArtifactType() {
    this._artifactType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get artifactTypeInput() {
    return this._artifactType;
  }

  // can_copy - computed: true, optional: false, required: false
  public get canCopy() {
    return this.getBooleanAttribute('can_copy');
  }

  // can_create_env - computed: true, optional: false, required: false
  public get canCreateEnv() {
    return this.getBooleanAttribute('can_create_env');
  }

  // can_delete - computed: true, optional: false, required: false
  public get canDelete() {
    return this.getBooleanAttribute('can_delete');
  }

  // can_execute - computed: true, optional: false, required: false
  public get canExecute() {
    return this.getBooleanAttribute('can_execute');
  }

  // can_manage - computed: true, optional: false, required: false
  public get canManage() {
    return this.getBooleanAttribute('can_manage');
  }

  // can_modify - computed: true, optional: false, required: false
  public get canModify() {
    return this.getBooleanAttribute('can_modify');
  }

  // can_view - computed: true, optional: false, required: false
  public get canView() {
    return this.getBooleanAttribute('can_view');
  }

  // create_type - computed: false, optional: false, required: true
  private _createType?: string; 
  public get createType() {
    return this.getStringAttribute('create_type');
  }
  public set createType(value: string) {
    this._createType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get createTypeInput() {
    return this._createType;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: true, required: false
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

  // is_draft - computed: false, optional: false, required: true
  private _isDraft?: boolean | cdktf.IResolvable; 
  public get isDraft() {
    return this.getBooleanAttribute('is_draft');
  }
  public set isDraft(value: boolean | cdktf.IResolvable) {
    this._isDraft = value;
  }
  // Temporarily expose input value. Use with caution.
  public get isDraftInput() {
    return this._isDraft;
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

  // project_id - computed: false, optional: false, required: true
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
  }

  // project_name - computed: true, optional: false, required: false
  public get projectName() {
    return this.getStringAttribute('project_name');
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

  // resource_pool_id - computed: true, optional: true, required: false
  private _resourcePoolId?: string; 
  public get resourcePoolId() {
    return this.getStringAttribute('resource_pool_id');
  }
  public set resourcePoolId(value: string) {
    this._resourcePoolId = value;
  }
  public resetResourcePoolId() {
    this._resourcePoolId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourcePoolIdInput() {
    return this._resourcePoolId;
  }

  // steps - computed: true, optional: false, required: false
  private _steps = new cdktf.StringMap(this, "steps");
  public get steps() {
    return this._steps;
  }

  // task_id - computed: true, optional: false, required: false
  public get taskId() {
    return this.getStringAttribute('task_id');
  }

  // task_name - computed: true, optional: false, required: false
  public get taskName() {
    return this.getStringAttribute('task_name');
  }

  // template_id - computed: false, optional: true, required: false
  private _templateId?: string; 
  public get templateId() {
    return this.getStringAttribute('template_id');
  }
  public set templateId(value: string) {
    this._templateId = value;
  }
  public resetTemplateId() {
    this._templateId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateIdInput() {
    return this._templateId;
  }

  // trigger_source - computed: false, optional: false, required: true
  private _triggerSource?: string; 
  public get triggerSource() {
    return this.getStringAttribute('trigger_source');
  }
  public set triggerSource(value: string) {
    this._triggerSource = value;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerSourceInput() {
    return this._triggerSource;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // operation_list - computed: false, optional: true, required: false
  private _operationList = new CodeartsDeployApplicationOperationListStructList(this, "operation_list", false);
  public get operationList() {
    return this._operationList;
  }
  public putOperationList(value: CodeartsDeployApplicationOperationListStruct[] | cdktf.IResolvable) {
    this._operationList.internalValue = value;
  }
  public resetOperationList() {
    this._operationList.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get operationListInput() {
    return this._operationList.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      artifact_source_system: cdktf.stringToTerraform(this._artifactSourceSystem),
      artifact_type: cdktf.stringToTerraform(this._artifactType),
      create_type: cdktf.stringToTerraform(this._createType),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      is_draft: cdktf.booleanToTerraform(this._isDraft),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      resource_pool_id: cdktf.stringToTerraform(this._resourcePoolId),
      template_id: cdktf.stringToTerraform(this._templateId),
      trigger_source: cdktf.stringToTerraform(this._triggerSource),
      operation_list: cdktf.listMapper(codeartsDeployApplicationOperationListStructToTerraform, true)(this._operationList.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      artifact_source_system: {
        value: cdktf.stringToHclTerraform(this._artifactSourceSystem),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      artifact_type: {
        value: cdktf.stringToHclTerraform(this._artifactType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      create_type: {
        value: cdktf.stringToHclTerraform(this._createType),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_draft: {
        value: cdktf.booleanToHclTerraform(this._isDraft),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
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
      resource_pool_id: {
        value: cdktf.stringToHclTerraform(this._resourcePoolId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      template_id: {
        value: cdktf.stringToHclTerraform(this._templateId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      trigger_source: {
        value: cdktf.stringToHclTerraform(this._triggerSource),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      operation_list: {
        value: cdktf.listMapperHcl(codeartsDeployApplicationOperationListStructToHclTerraform, true)(this._operationList.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CodeartsDeployApplicationOperationListStructList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IamAgencyV3Config extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#all_resources_roles IamAgencyV3#all_resources_roles}
  */
  readonly allResourcesRoles?: string[];
  /**
  * schema: Required
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#delegated_domain_name IamAgencyV3#delegated_domain_name}
  */
  readonly delegatedDomainName?: string;
  /**
  * schema: Internal
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#delegated_service_name IamAgencyV3#delegated_service_name}
  */
  readonly delegatedServiceName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#description IamAgencyV3#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#domain_roles IamAgencyV3#domain_roles}
  */
  readonly domainRoles?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#duration IamAgencyV3#duration}
  */
  readonly duration?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#id IamAgencyV3#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#name IamAgencyV3#name}
  */
  readonly name: string;
  /**
  * project_role block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#project_role IamAgencyV3#project_role}
  */
  readonly projectRole?: IamAgencyV3ProjectRole[] | cdktf.IResolvable;
}
export interface IamAgencyV3ProjectRole {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#project IamAgencyV3#project}
  */
  readonly project: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#roles IamAgencyV3#roles}
  */
  readonly roles: string[];
}

export function iamAgencyV3ProjectRoleToTerraform(struct?: IamAgencyV3ProjectRole | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    project: cdktf.stringToTerraform(struct!.project),
    roles: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.roles),
  }
}


export function iamAgencyV3ProjectRoleToHclTerraform(struct?: IamAgencyV3ProjectRole | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    project: {
      value: cdktf.stringToHclTerraform(struct!.project),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    roles: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.roles),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IamAgencyV3ProjectRoleOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): IamAgencyV3ProjectRole | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._project !== undefined) {
      hasAnyValues = true;
      internalValueResult.project = this._project;
    }
    if (this._roles !== undefined) {
      hasAnyValues = true;
      internalValueResult.roles = this._roles;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IamAgencyV3ProjectRole | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._project = undefined;
      this._roles = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._project = value.project;
      this._roles = value.roles;
    }
  }

  // project - computed: false, optional: false, required: true
  private _project?: string; 
  public get project() {
    return this.getStringAttribute('project');
  }
  public set project(value: string) {
    this._project = value;
  }
  // Temporarily expose input value. Use with caution.
  public get projectInput() {
    return this._project;
  }

  // roles - computed: false, optional: false, required: true
  private _roles?: string[]; 
  public get roles() {
    return cdktf.Fn.tolist(this.getListAttribute('roles'));
  }
  public set roles(value: string[]) {
    this._roles = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rolesInput() {
    return this._roles;
  }
}

export class IamAgencyV3ProjectRoleList extends cdktf.ComplexList {
  public internalValue? : IamAgencyV3ProjectRole[] | cdktf.IResolvable

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
  public get(index: number): IamAgencyV3ProjectRoleOutputReference {
    return new IamAgencyV3ProjectRoleOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3 huaweicloud_iam_agency_v3}
*/
export class IamAgencyV3 extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_iam_agency_v3";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IamAgencyV3 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IamAgencyV3 to import
  * @param importFromId The id of the existing IamAgencyV3 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IamAgencyV3 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_iam_agency_v3", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/iam_agency_v3 huaweicloud_iam_agency_v3} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IamAgencyV3Config
  */
  public constructor(scope: Construct, id: string, config: IamAgencyV3Config) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_iam_agency_v3',
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
    this._allResourcesRoles = config.allResourcesRoles;
    this._delegatedDomainName = config.delegatedDomainName;
    this._delegatedServiceName = config.delegatedServiceName;
    this._description = config.description;
    this._domainRoles = config.domainRoles;
    this._duration = config.duration;
    this._id = config.id;
    this._name = config.name;
    this._projectRole.internalValue = config.projectRole;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // all_resources_roles - computed: false, optional: true, required: false
  private _allResourcesRoles?: string[]; 
  public get allResourcesRoles() {
    return cdktf.Fn.tolist(this.getListAttribute('all_resources_roles'));
  }
  public set allResourcesRoles(value: string[]) {
    this._allResourcesRoles = value;
  }
  public resetAllResourcesRoles() {
    this._allResourcesRoles = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get allResourcesRolesInput() {
    return this._allResourcesRoles;
  }

  // create_time - computed: true, optional: false, required: false
  public get createTime() {
    return this.getStringAttribute('create_time');
  }

  // delegated_domain_name - computed: false, optional: true, required: false
  private _delegatedDomainName?: string; 
  public get delegatedDomainName() {
    return this.getStringAttribute('delegated_domain_name');
  }
  public set delegatedDomainName(value: string) {
    this._delegatedDomainName = value;
  }
  public resetDelegatedDomainName() {
    this._delegatedDomainName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get delegatedDomainNameInput() {
    return this._delegatedDomainName;
  }

  // delegated_service_name - computed: false, optional: true, required: false
  private _delegatedServiceName?: string; 
  public get delegatedServiceName() {
    return this.getStringAttribute('delegated_service_name');
  }
  public set delegatedServiceName(value: string) {
    this._delegatedServiceName = value;
  }
  public resetDelegatedServiceName() {
    this._delegatedServiceName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get delegatedServiceNameInput() {
    return this._delegatedServiceName;
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

  // domain_roles - computed: false, optional: true, required: false
  private _domainRoles?: string[]; 
  public get domainRoles() {
    return cdktf.Fn.tolist(this.getListAttribute('domain_roles'));
  }
  public set domainRoles(value: string[]) {
    this._domainRoles = value;
  }
  public resetDomainRoles() {
    this._domainRoles = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainRolesInput() {
    return this._domainRoles;
  }

  // duration - computed: false, optional: true, required: false
  private _duration?: string; 
  public get duration() {
    return this.getStringAttribute('duration');
  }
  public set duration(value: string) {
    this._duration = value;
  }
  public resetDuration() {
    this._duration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get durationInput() {
    return this._duration;
  }

  // expire_time - computed: true, optional: false, required: false
  public get expireTime() {
    return this.getStringAttribute('expire_time');
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

  // project_role - computed: false, optional: true, required: false
  private _projectRole = new IamAgencyV3ProjectRoleList(this, "project_role", true);
  public get projectRole() {
    return this._projectRole;
  }
  public putProjectRole(value: IamAgencyV3ProjectRole[] | cdktf.IResolvable) {
    this._projectRole.internalValue = value;
  }
  public resetProjectRole() {
    this._projectRole.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get projectRoleInput() {
    return this._projectRole.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      all_resources_roles: cdktf.listMapper(cdktf.stringToTerraform, false)(this._allResourcesRoles),
      delegated_domain_name: cdktf.stringToTerraform(this._delegatedDomainName),
      delegated_service_name: cdktf.stringToTerraform(this._delegatedServiceName),
      description: cdktf.stringToTerraform(this._description),
      domain_roles: cdktf.listMapper(cdktf.stringToTerraform, false)(this._domainRoles),
      duration: cdktf.stringToTerraform(this._duration),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      project_role: cdktf.listMapper(iamAgencyV3ProjectRoleToTerraform, true)(this._projectRole.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      all_resources_roles: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._allResourcesRoles),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      delegated_domain_name: {
        value: cdktf.stringToHclTerraform(this._delegatedDomainName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      delegated_service_name: {
        value: cdktf.stringToHclTerraform(this._delegatedServiceName),
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
      domain_roles: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._domainRoles),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      duration: {
        value: cdktf.stringToHclTerraform(this._duration),
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
      project_role: {
        value: cdktf.listMapperHcl(iamAgencyV3ProjectRoleToHclTerraform, true)(this._projectRole.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "IamAgencyV3ProjectRoleList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

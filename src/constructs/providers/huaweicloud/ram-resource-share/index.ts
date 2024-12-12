// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RamResourceShareConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies whether resources can be shared with any accounts outside the organization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share#allow_external_principals RamResourceShare#allow_external_principals}
  */
  readonly allowExternalPrincipals?: boolean | cdktf.IResolvable;
  /**
  * Specifies the description of the resource share.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share#description RamResourceShare#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share#id RamResourceShare#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the name of the resource share.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share#name RamResourceShare#name}
  */
  readonly name: string;
  /**
  * Specifies the list of RAM permissions associated with the resource share.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share#permission_ids RamResourceShare#permission_ids}
  */
  readonly permissionIds?: string[];
  /**
  * Specifies the list of one or more principals associated with the resource share.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share#principals RamResourceShare#principals}
  */
  readonly principals: string[];
  /**
  * Specifies the list of URNs of one or more resources associated with the resource share.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share#resource_urns RamResourceShare#resource_urns}
  */
  readonly resourceUrns: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share#tags RamResourceShare#tags}
  */
  readonly tags?: { [key: string]: string };
}
export interface RamResourceShareAssociatedPermissions {
}

export function ramResourceShareAssociatedPermissionsToTerraform(struct?: RamResourceShareAssociatedPermissions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function ramResourceShareAssociatedPermissionsToHclTerraform(struct?: RamResourceShareAssociatedPermissions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class RamResourceShareAssociatedPermissionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): RamResourceShareAssociatedPermissions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RamResourceShareAssociatedPermissions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // permission_id - computed: true, optional: false, required: false
  public get permissionId() {
    return this.getStringAttribute('permission_id');
  }

  // permission_name - computed: true, optional: false, required: false
  public get permissionName() {
    return this.getStringAttribute('permission_name');
  }

  // resource_type - computed: true, optional: false, required: false
  public get resourceType() {
    return this.getStringAttribute('resource_type');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }
}

export class RamResourceShareAssociatedPermissionsList extends cdktf.ComplexList {

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
  public get(index: number): RamResourceShareAssociatedPermissionsOutputReference {
    return new RamResourceShareAssociatedPermissionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share huaweicloud_ram_resource_share}
*/
export class RamResourceShare extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_ram_resource_share";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a RamResourceShare resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the RamResourceShare to import
  * @param importFromId The id of the existing RamResourceShare that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the RamResourceShare to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_ram_resource_share", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/ram_resource_share huaweicloud_ram_resource_share} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RamResourceShareConfig
  */
  public constructor(scope: Construct, id: string, config: RamResourceShareConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_ram_resource_share',
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
    this._allowExternalPrincipals = config.allowExternalPrincipals;
    this._description = config.description;
    this._id = config.id;
    this._name = config.name;
    this._permissionIds = config.permissionIds;
    this._principals = config.principals;
    this._resourceUrns = config.resourceUrns;
    this._tags = config.tags;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // allow_external_principals - computed: false, optional: true, required: false
  private _allowExternalPrincipals?: boolean | cdktf.IResolvable; 
  public get allowExternalPrincipals() {
    return this.getBooleanAttribute('allow_external_principals');
  }
  public set allowExternalPrincipals(value: boolean | cdktf.IResolvable) {
    this._allowExternalPrincipals = value;
  }
  public resetAllowExternalPrincipals() {
    this._allowExternalPrincipals = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get allowExternalPrincipalsInput() {
    return this._allowExternalPrincipals;
  }

  // associated_permissions - computed: true, optional: false, required: false
  private _associatedPermissions = new RamResourceShareAssociatedPermissionsList(this, "associated_permissions", false);
  public get associatedPermissions() {
    return this._associatedPermissions;
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

  // owning_account_id - computed: true, optional: false, required: false
  public get owningAccountId() {
    return this.getStringAttribute('owning_account_id');
  }

  // permission_ids - computed: false, optional: true, required: false
  private _permissionIds?: string[]; 
  public get permissionIds() {
    return cdktf.Fn.tolist(this.getListAttribute('permission_ids'));
  }
  public set permissionIds(value: string[]) {
    this._permissionIds = value;
  }
  public resetPermissionIds() {
    this._permissionIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get permissionIdsInput() {
    return this._permissionIds;
  }

  // principals - computed: false, optional: false, required: true
  private _principals?: string[]; 
  public get principals() {
    return cdktf.Fn.tolist(this.getListAttribute('principals'));
  }
  public set principals(value: string[]) {
    this._principals = value;
  }
  // Temporarily expose input value. Use with caution.
  public get principalsInput() {
    return this._principals;
  }

  // resource_urns - computed: false, optional: false, required: true
  private _resourceUrns?: string[]; 
  public get resourceUrns() {
    return cdktf.Fn.tolist(this.getListAttribute('resource_urns'));
  }
  public set resourceUrns(value: string[]) {
    this._resourceUrns = value;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceUrnsInput() {
    return this._resourceUrns;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string }; 
  public get tags() {
    return this.getStringMapAttribute('tags');
  }
  public set tags(value: { [key: string]: string }) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      allow_external_principals: cdktf.booleanToTerraform(this._allowExternalPrincipals),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      permission_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._permissionIds),
      principals: cdktf.listMapper(cdktf.stringToTerraform, false)(this._principals),
      resource_urns: cdktf.listMapper(cdktf.stringToTerraform, false)(this._resourceUrns),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      allow_external_principals: {
        value: cdktf.booleanToHclTerraform(this._allowExternalPrincipals),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      permission_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._permissionIds),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      principals: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._principals),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      resource_urns: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._resourceUrns),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

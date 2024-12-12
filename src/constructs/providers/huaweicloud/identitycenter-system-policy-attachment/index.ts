// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_system_policy_attachment
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IdentitycenterSystemPolicyAttachmentConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_system_policy_attachment#id IdentitycenterSystemPolicyAttachment#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_system_policy_attachment#instance_id IdentitycenterSystemPolicyAttachment#instance_id}
  */
  readonly instanceId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_system_policy_attachment#permission_set_id IdentitycenterSystemPolicyAttachment#permission_set_id}
  */
  readonly permissionSetId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_system_policy_attachment#policy_ids IdentitycenterSystemPolicyAttachment#policy_ids}
  */
  readonly policyIds: string[];
}
export interface IdentitycenterSystemPolicyAttachmentAttachedPolicies {
}

export function identitycenterSystemPolicyAttachmentAttachedPoliciesToTerraform(struct?: IdentitycenterSystemPolicyAttachmentAttachedPolicies): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function identitycenterSystemPolicyAttachmentAttachedPoliciesToHclTerraform(struct?: IdentitycenterSystemPolicyAttachmentAttachedPolicies): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class IdentitycenterSystemPolicyAttachmentAttachedPoliciesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): IdentitycenterSystemPolicyAttachmentAttachedPolicies | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IdentitycenterSystemPolicyAttachmentAttachedPolicies | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }
}

export class IdentitycenterSystemPolicyAttachmentAttachedPoliciesList extends cdktf.ComplexList {

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
  public get(index: number): IdentitycenterSystemPolicyAttachmentAttachedPoliciesOutputReference {
    return new IdentitycenterSystemPolicyAttachmentAttachedPoliciesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_system_policy_attachment huaweicloud_identitycenter_system_policy_attachment}
*/
export class IdentitycenterSystemPolicyAttachment extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_identitycenter_system_policy_attachment";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IdentitycenterSystemPolicyAttachment resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IdentitycenterSystemPolicyAttachment to import
  * @param importFromId The id of the existing IdentitycenterSystemPolicyAttachment that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_system_policy_attachment#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IdentitycenterSystemPolicyAttachment to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_identitycenter_system_policy_attachment", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identitycenter_system_policy_attachment huaweicloud_identitycenter_system_policy_attachment} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IdentitycenterSystemPolicyAttachmentConfig
  */
  public constructor(scope: Construct, id: string, config: IdentitycenterSystemPolicyAttachmentConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_identitycenter_system_policy_attachment',
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
    this._instanceId = config.instanceId;
    this._permissionSetId = config.permissionSetId;
    this._policyIds = config.policyIds;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // attached_policies - computed: true, optional: false, required: false
  private _attachedPolicies = new IdentitycenterSystemPolicyAttachmentAttachedPoliciesList(this, "attached_policies", false);
  public get attachedPolicies() {
    return this._attachedPolicies;
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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // permission_set_id - computed: false, optional: false, required: true
  private _permissionSetId?: string; 
  public get permissionSetId() {
    return this.getStringAttribute('permission_set_id');
  }
  public set permissionSetId(value: string) {
    this._permissionSetId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get permissionSetIdInput() {
    return this._permissionSetId;
  }

  // policy_ids - computed: false, optional: false, required: true
  private _policyIds?: string[]; 
  public get policyIds() {
    return cdktf.Fn.tolist(this.getListAttribute('policy_ids'));
  }
  public set policyIds(value: string[]) {
    this._policyIds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get policyIdsInput() {
    return this._policyIds;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      permission_set_id: cdktf.stringToTerraform(this._permissionSetId),
      policy_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._policyIds),
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      permission_set_id: {
        value: cdktf.stringToHclTerraform(this._permissionSetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      policy_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._policyIds),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

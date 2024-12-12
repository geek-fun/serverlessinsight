// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy_associate
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CnadAdvancedPolicyAssociateConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy_associate#id CnadAdvancedPolicyAssociate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the instance ID. This field must be the instance ID where the policy is
  * located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy_associate#instance_id CnadAdvancedPolicyAssociate#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the CNAD advanced policy ID in which to associate protected objects.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy_associate#policy_id CnadAdvancedPolicyAssociate#policy_id}
  */
  readonly policyId: string;
  /**
  * Specifies the protected object IDs to associate.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy_associate#protected_object_ids CnadAdvancedPolicyAssociate#protected_object_ids}
  */
  readonly protectedObjectIds: string[];
}
export interface CnadAdvancedPolicyAssociateProtectedObjects {
}

export function cnadAdvancedPolicyAssociateProtectedObjectsToTerraform(struct?: CnadAdvancedPolicyAssociateProtectedObjects): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function cnadAdvancedPolicyAssociateProtectedObjectsToHclTerraform(struct?: CnadAdvancedPolicyAssociateProtectedObjects): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CnadAdvancedPolicyAssociateProtectedObjectsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CnadAdvancedPolicyAssociateProtectedObjects | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CnadAdvancedPolicyAssociateProtectedObjects | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // block_threshold - computed: true, optional: false, required: false
  public get blockThreshold() {
    return this.getStringAttribute('block_threshold');
  }

  // clean_threshold - computed: true, optional: false, required: false
  public get cleanThreshold() {
    return this.getNumberAttribute('clean_threshold');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // instance_id - computed: true, optional: false, required: false
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }

  // instance_name - computed: true, optional: false, required: false
  public get instanceName() {
    return this.getStringAttribute('instance_name');
  }

  // instance_version - computed: true, optional: false, required: false
  public get instanceVersion() {
    return this.getStringAttribute('instance_version');
  }

  // ip_address - computed: true, optional: false, required: false
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // policy_name - computed: true, optional: false, required: false
  public get policyName() {
    return this.getStringAttribute('policy_name');
  }

  // region - computed: true, optional: false, required: false
  public get region() {
    return this.getStringAttribute('region');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getNumberAttribute('status');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class CnadAdvancedPolicyAssociateProtectedObjectsList extends cdktf.ComplexList {

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
  public get(index: number): CnadAdvancedPolicyAssociateProtectedObjectsOutputReference {
    return new CnadAdvancedPolicyAssociateProtectedObjectsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy_associate huaweicloud_cnad_advanced_policy_associate}
*/
export class CnadAdvancedPolicyAssociate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cnad_advanced_policy_associate";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CnadAdvancedPolicyAssociate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CnadAdvancedPolicyAssociate to import
  * @param importFromId The id of the existing CnadAdvancedPolicyAssociate that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy_associate#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CnadAdvancedPolicyAssociate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cnad_advanced_policy_associate", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cnad_advanced_policy_associate huaweicloud_cnad_advanced_policy_associate} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CnadAdvancedPolicyAssociateConfig
  */
  public constructor(scope: Construct, id: string, config: CnadAdvancedPolicyAssociateConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cnad_advanced_policy_associate',
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
    this._policyId = config.policyId;
    this._protectedObjectIds = config.protectedObjectIds;
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

  // policy_id - computed: false, optional: false, required: true
  private _policyId?: string; 
  public get policyId() {
    return this.getStringAttribute('policy_id');
  }
  public set policyId(value: string) {
    this._policyId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get policyIdInput() {
    return this._policyId;
  }

  // protected_object_ids - computed: false, optional: false, required: true
  private _protectedObjectIds?: string[]; 
  public get protectedObjectIds() {
    return cdktf.Fn.tolist(this.getListAttribute('protected_object_ids'));
  }
  public set protectedObjectIds(value: string[]) {
    this._protectedObjectIds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protectedObjectIdsInput() {
    return this._protectedObjectIds;
  }

  // protected_objects - computed: true, optional: false, required: false
  private _protectedObjects = new CnadAdvancedPolicyAssociateProtectedObjectsList(this, "protected_objects", false);
  public get protectedObjects() {
    return this._protectedObjects;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      policy_id: cdktf.stringToTerraform(this._policyId),
      protected_object_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._protectedObjectIds),
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
      policy_id: {
        value: cdktf.stringToHclTerraform(this._policyId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      protected_object_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._protectedObjectIds),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

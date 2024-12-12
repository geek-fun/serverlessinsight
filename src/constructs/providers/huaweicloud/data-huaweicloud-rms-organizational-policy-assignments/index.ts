// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_organizational_policy_assignments
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudRmsOrganizationalPolicyAssignmentsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the ID of the organizational policy assignment.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_organizational_policy_assignments#assignment_id DataHuaweicloudRmsOrganizationalPolicyAssignments#assignment_id}
  */
  readonly assignmentId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_organizational_policy_assignments#id DataHuaweicloudRmsOrganizationalPolicyAssignments#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the name of the organizational policy assignment.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_organizational_policy_assignments#name DataHuaweicloudRmsOrganizationalPolicyAssignments#name}
  */
  readonly name?: string;
  /**
  * Specifies the ID of the organization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_organizational_policy_assignments#organization_id DataHuaweicloudRmsOrganizationalPolicyAssignments#organization_id}
  */
  readonly organizationId: string;
  /**
  * Specifies the ID of the policy definition.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_organizational_policy_assignments#policy_definition_id DataHuaweicloudRmsOrganizationalPolicyAssignments#policy_definition_id}
  */
  readonly policyDefinitionId?: string;
}
export interface DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilter {
}

export function dataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilterToTerraform(struct?: DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilterToHclTerraform(struct?: DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilterOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilter | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilter | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // region_id - computed: true, optional: false, required: false
  public get regionId() {
    return this.getStringAttribute('region_id');
  }

  // resource_id - computed: true, optional: false, required: false
  public get resourceId() {
    return this.getStringAttribute('resource_id');
  }

  // resource_provider - computed: true, optional: false, required: false
  public get resourceProvider() {
    return this.getStringAttribute('resource_provider');
  }

  // resource_type - computed: true, optional: false, required: false
  public get resourceType() {
    return this.getStringAttribute('resource_type');
  }

  // tag_key - computed: true, optional: false, required: false
  public get tagKey() {
    return this.getStringAttribute('tag_key');
  }

  // tag_value - computed: true, optional: false, required: false
  public get tagValue() {
    return this.getStringAttribute('tag_value');
  }
}

export class DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilterList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilterOutputReference {
    return new DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilterOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignments {
}

export function dataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsToTerraform(struct?: DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignments): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsToHclTerraform(struct?: DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignments): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignments | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignments | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // organization_policy_assignment_urn - computed: true, optional: false, required: false
  public get organizationPolicyAssignmentUrn() {
    return this.getStringAttribute('organization_policy_assignment_urn');
  }

  // owner_id - computed: true, optional: false, required: false
  public get ownerId() {
    return this.getStringAttribute('owner_id');
  }

  // parameters - computed: true, optional: false, required: false
  private _parameters = new cdktf.StringMap(this, "parameters");
  public get parameters() {
    return this._parameters;
  }

  // period - computed: true, optional: false, required: false
  public get period() {
    return this.getStringAttribute('period');
  }

  // policy_definition_id - computed: true, optional: false, required: false
  public get policyDefinitionId() {
    return this.getStringAttribute('policy_definition_id');
  }

  // policy_filter - computed: true, optional: false, required: false
  private _policyFilter = new DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsPolicyFilterList(this, "policy_filter", false);
  public get policyFilter() {
    return this._policyFilter;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsOutputReference {
    return new DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_organizational_policy_assignments huaweicloud_rms_organizational_policy_assignments}
*/
export class DataHuaweicloudRmsOrganizationalPolicyAssignments extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rms_organizational_policy_assignments";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudRmsOrganizationalPolicyAssignments resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudRmsOrganizationalPolicyAssignments to import
  * @param importFromId The id of the existing DataHuaweicloudRmsOrganizationalPolicyAssignments that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_organizational_policy_assignments#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudRmsOrganizationalPolicyAssignments to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rms_organizational_policy_assignments", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_organizational_policy_assignments huaweicloud_rms_organizational_policy_assignments} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudRmsOrganizationalPolicyAssignmentsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudRmsOrganizationalPolicyAssignmentsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rms_organizational_policy_assignments',
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
    this._assignmentId = config.assignmentId;
    this._id = config.id;
    this._name = config.name;
    this._organizationId = config.organizationId;
    this._policyDefinitionId = config.policyDefinitionId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // assignment_id - computed: false, optional: true, required: false
  private _assignmentId?: string; 
  public get assignmentId() {
    return this.getStringAttribute('assignment_id');
  }
  public set assignmentId(value: string) {
    this._assignmentId = value;
  }
  public resetAssignmentId() {
    this._assignmentId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignmentIdInput() {
    return this._assignmentId;
  }

  // assignments - computed: true, optional: false, required: false
  private _assignments = new DataHuaweicloudRmsOrganizationalPolicyAssignmentsAssignmentsList(this, "assignments", true);
  public get assignments() {
    return this._assignments;
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

  // organization_id - computed: false, optional: false, required: true
  private _organizationId?: string; 
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }
  public set organizationId(value: string) {
    this._organizationId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get organizationIdInput() {
    return this._organizationId;
  }

  // policy_definition_id - computed: false, optional: true, required: false
  private _policyDefinitionId?: string; 
  public get policyDefinitionId() {
    return this.getStringAttribute('policy_definition_id');
  }
  public set policyDefinitionId(value: string) {
    this._policyDefinitionId = value;
  }
  public resetPolicyDefinitionId() {
    this._policyDefinitionId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyDefinitionIdInput() {
    return this._policyDefinitionId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      assignment_id: cdktf.stringToTerraform(this._assignmentId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      organization_id: cdktf.stringToTerraform(this._organizationId),
      policy_definition_id: cdktf.stringToTerraform(this._policyDefinitionId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      assignment_id: {
        value: cdktf.stringToHclTerraform(this._assignmentId),
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
      organization_id: {
        value: cdktf.stringToHclTerraform(this._organizationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      policy_definition_id: {
        value: cdktf.stringToHclTerraform(this._policyDefinitionId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

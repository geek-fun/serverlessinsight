// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_assignments
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the resource aggregator ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_assignments#aggregator_id DataHuaweicloudRmsResourceAggregatorPolicyAssignments#aggregator_id}
  */
  readonly aggregatorId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_assignments#id DataHuaweicloudRmsResourceAggregatorPolicyAssignments#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * filter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_assignments#filter DataHuaweicloudRmsResourceAggregatorPolicyAssignments#filter}
  */
  readonly filter?: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilter;
}
export interface DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetails {
}

export function dataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetailsToTerraform(struct?: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetails): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetailsToHclTerraform(struct?: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetails): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetailsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetails | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetails | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // compliant_count - computed: true, optional: false, required: false
  public get compliantCount() {
    return this.getNumberAttribute('compliant_count');
  }

  // non_compliant_count - computed: true, optional: false, required: false
  public get nonCompliantCount() {
    return this.getNumberAttribute('non_compliant_count');
  }
}

export class DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetailsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetailsOutputReference {
    return new DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetailsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsCompliance {
}

export function dataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceToTerraform(struct?: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsCompliance): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceToHclTerraform(struct?: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsCompliance): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsCompliance | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsCompliance | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // compliance_state - computed: true, optional: false, required: false
  public get complianceState() {
    return this.getStringAttribute('compliance_state');
  }

  // resource_details - computed: true, optional: false, required: false
  private _resourceDetails = new DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceResourceDetailsList(this, "resource_details", false);
  public get resourceDetails() {
    return this._resourceDetails;
  }
}

export class DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceOutputReference {
    return new DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignments {
}

export function dataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsToTerraform(struct?: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignments): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsToHclTerraform(struct?: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignments): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignments | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignments | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // account_id - computed: true, optional: false, required: false
  public get accountId() {
    return this.getStringAttribute('account_id');
  }

  // account_name - computed: true, optional: false, required: false
  public get accountName() {
    return this.getStringAttribute('account_name');
  }

  // compliance - computed: true, optional: false, required: false
  private _compliance = new DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsComplianceList(this, "compliance", false);
  public get compliance() {
    return this._compliance;
  }

  // policy_assignment_id - computed: true, optional: false, required: false
  public get policyAssignmentId() {
    return this.getStringAttribute('policy_assignment_id');
  }

  // policy_assignment_name - computed: true, optional: false, required: false
  public get policyAssignmentName() {
    return this.getStringAttribute('policy_assignment_name');
  }
}

export class DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsOutputReference {
    return new DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilter {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_assignments#account_id DataHuaweicloudRmsResourceAggregatorPolicyAssignments#account_id}
  */
  readonly accountId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_assignments#compliance_state DataHuaweicloudRmsResourceAggregatorPolicyAssignments#compliance_state}
  */
  readonly complianceState?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_assignments#policy_assignment_name DataHuaweicloudRmsResourceAggregatorPolicyAssignments#policy_assignment_name}
  */
  readonly policyAssignmentName?: string;
}

export function dataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilterToTerraform(struct?: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilterOutputReference | DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    account_id: cdktf.stringToTerraform(struct!.accountId),
    compliance_state: cdktf.stringToTerraform(struct!.complianceState),
    policy_assignment_name: cdktf.stringToTerraform(struct!.policyAssignmentName),
  }
}


export function dataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilterToHclTerraform(struct?: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilterOutputReference | DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    account_id: {
      value: cdktf.stringToHclTerraform(struct!.accountId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    compliance_state: {
      value: cdktf.stringToHclTerraform(struct!.complianceState),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    policy_assignment_name: {
      value: cdktf.stringToHclTerraform(struct!.policyAssignmentName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilterOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilter | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accountId !== undefined) {
      hasAnyValues = true;
      internalValueResult.accountId = this._accountId;
    }
    if (this._complianceState !== undefined) {
      hasAnyValues = true;
      internalValueResult.complianceState = this._complianceState;
    }
    if (this._policyAssignmentName !== undefined) {
      hasAnyValues = true;
      internalValueResult.policyAssignmentName = this._policyAssignmentName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilter | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accountId = undefined;
      this._complianceState = undefined;
      this._policyAssignmentName = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accountId = value.accountId;
      this._complianceState = value.complianceState;
      this._policyAssignmentName = value.policyAssignmentName;
    }
  }

  // account_id - computed: false, optional: true, required: false
  private _accountId?: string; 
  public get accountId() {
    return this.getStringAttribute('account_id');
  }
  public set accountId(value: string) {
    this._accountId = value;
  }
  public resetAccountId() {
    this._accountId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountIdInput() {
    return this._accountId;
  }

  // compliance_state - computed: false, optional: true, required: false
  private _complianceState?: string; 
  public get complianceState() {
    return this.getStringAttribute('compliance_state');
  }
  public set complianceState(value: string) {
    this._complianceState = value;
  }
  public resetComplianceState() {
    this._complianceState = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get complianceStateInput() {
    return this._complianceState;
  }

  // policy_assignment_name - computed: false, optional: true, required: false
  private _policyAssignmentName?: string; 
  public get policyAssignmentName() {
    return this.getStringAttribute('policy_assignment_name');
  }
  public set policyAssignmentName(value: string) {
    this._policyAssignmentName = value;
  }
  public resetPolicyAssignmentName() {
    this._policyAssignmentName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyAssignmentNameInput() {
    return this._policyAssignmentName;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_assignments huaweicloud_rms_resource_aggregator_policy_assignments}
*/
export class DataHuaweicloudRmsResourceAggregatorPolicyAssignments extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rms_resource_aggregator_policy_assignments";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudRmsResourceAggregatorPolicyAssignments resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudRmsResourceAggregatorPolicyAssignments to import
  * @param importFromId The id of the existing DataHuaweicloudRmsResourceAggregatorPolicyAssignments that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_assignments#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudRmsResourceAggregatorPolicyAssignments to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rms_resource_aggregator_policy_assignments", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_assignments huaweicloud_rms_resource_aggregator_policy_assignments} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rms_resource_aggregator_policy_assignments',
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
    this._aggregatorId = config.aggregatorId;
    this._id = config.id;
    this._filter.internalValue = config.filter;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // aggregator_id - computed: false, optional: false, required: true
  private _aggregatorId?: string; 
  public get aggregatorId() {
    return this.getStringAttribute('aggregator_id');
  }
  public set aggregatorId(value: string) {
    this._aggregatorId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get aggregatorIdInput() {
    return this._aggregatorId;
  }

  // assignments - computed: true, optional: false, required: false
  private _assignments = new DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsAssignmentsList(this, "assignments", false);
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

  // filter - computed: false, optional: true, required: false
  private _filter = new DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilterOutputReference(this, "filter");
  public get filter() {
    return this._filter;
  }
  public putFilter(value: DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilter) {
    this._filter.internalValue = value;
  }
  public resetFilter() {
    this._filter.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get filterInput() {
    return this._filter.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      aggregator_id: cdktf.stringToTerraform(this._aggregatorId),
      id: cdktf.stringToTerraform(this._id),
      filter: dataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilterToTerraform(this._filter.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      aggregator_id: {
        value: cdktf.stringToHclTerraform(this._aggregatorId),
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
      filter: {
        value: dataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilterToHclTerraform(this._filter.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataHuaweicloudRmsResourceAggregatorPolicyAssignmentsFilterList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

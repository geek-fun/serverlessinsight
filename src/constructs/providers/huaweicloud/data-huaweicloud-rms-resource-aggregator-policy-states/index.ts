// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudRmsResourceAggregatorPolicyStatesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states#account_id DataHuaweicloudRmsResourceAggregatorPolicyStates#account_id}
  */
  readonly accountId?: string;
  /**
  * Specifies the resource aggregator ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states#aggregator_id DataHuaweicloudRmsResourceAggregatorPolicyStates#aggregator_id}
  */
  readonly aggregatorId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states#compliance_state DataHuaweicloudRmsResourceAggregatorPolicyStates#compliance_state}
  */
  readonly complianceState?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states#id DataHuaweicloudRmsResourceAggregatorPolicyStates#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states#policy_assignment_name DataHuaweicloudRmsResourceAggregatorPolicyStates#policy_assignment_name}
  */
  readonly policyAssignmentName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states#resource_id DataHuaweicloudRmsResourceAggregatorPolicyStates#resource_id}
  */
  readonly resourceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states#resource_name DataHuaweicloudRmsResourceAggregatorPolicyStates#resource_name}
  */
  readonly resourceName?: string;
}
export interface DataHuaweicloudRmsResourceAggregatorPolicyStatesStates {
}

export function dataHuaweicloudRmsResourceAggregatorPolicyStatesStatesToTerraform(struct?: DataHuaweicloudRmsResourceAggregatorPolicyStatesStates): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudRmsResourceAggregatorPolicyStatesStatesToHclTerraform(struct?: DataHuaweicloudRmsResourceAggregatorPolicyStatesStates): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudRmsResourceAggregatorPolicyStatesStatesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudRmsResourceAggregatorPolicyStatesStates | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudRmsResourceAggregatorPolicyStatesStates | undefined) {
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

  // domain_id - computed: true, optional: false, required: false
  public get domainId() {
    return this.getStringAttribute('domain_id');
  }

  // evaluation_time - computed: true, optional: false, required: false
  public get evaluationTime() {
    return this.getStringAttribute('evaluation_time');
  }

  // policy_assignment_id - computed: true, optional: false, required: false
  public get policyAssignmentId() {
    return this.getStringAttribute('policy_assignment_id');
  }

  // policy_assignment_name - computed: true, optional: false, required: false
  public get policyAssignmentName() {
    return this.getStringAttribute('policy_assignment_name');
  }

  // policy_definition_id - computed: true, optional: false, required: false
  public get policyDefinitionId() {
    return this.getStringAttribute('policy_definition_id');
  }

  // region_id - computed: true, optional: false, required: false
  public get regionId() {
    return this.getStringAttribute('region_id');
  }

  // resource_id - computed: true, optional: false, required: false
  public get resourceId() {
    return this.getStringAttribute('resource_id');
  }

  // resource_name - computed: true, optional: false, required: false
  public get resourceName() {
    return this.getStringAttribute('resource_name');
  }

  // resource_provider - computed: true, optional: false, required: false
  public get resourceProvider() {
    return this.getStringAttribute('resource_provider');
  }

  // resource_type - computed: true, optional: false, required: false
  public get resourceType() {
    return this.getStringAttribute('resource_type');
  }

  // trigger_type - computed: true, optional: false, required: false
  public get triggerType() {
    return this.getStringAttribute('trigger_type');
  }
}

export class DataHuaweicloudRmsResourceAggregatorPolicyStatesStatesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudRmsResourceAggregatorPolicyStatesStatesOutputReference {
    return new DataHuaweicloudRmsResourceAggregatorPolicyStatesStatesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states huaweicloud_rms_resource_aggregator_policy_states}
*/
export class DataHuaweicloudRmsResourceAggregatorPolicyStates extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rms_resource_aggregator_policy_states";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudRmsResourceAggregatorPolicyStates resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudRmsResourceAggregatorPolicyStates to import
  * @param importFromId The id of the existing DataHuaweicloudRmsResourceAggregatorPolicyStates that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudRmsResourceAggregatorPolicyStates to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rms_resource_aggregator_policy_states", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/rms_resource_aggregator_policy_states huaweicloud_rms_resource_aggregator_policy_states} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudRmsResourceAggregatorPolicyStatesConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudRmsResourceAggregatorPolicyStatesConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rms_resource_aggregator_policy_states',
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
    this._accountId = config.accountId;
    this._aggregatorId = config.aggregatorId;
    this._complianceState = config.complianceState;
    this._id = config.id;
    this._policyAssignmentName = config.policyAssignmentName;
    this._resourceId = config.resourceId;
    this._resourceName = config.resourceName;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // resource_id - computed: false, optional: true, required: false
  private _resourceId?: string; 
  public get resourceId() {
    return this.getStringAttribute('resource_id');
  }
  public set resourceId(value: string) {
    this._resourceId = value;
  }
  public resetResourceId() {
    this._resourceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceIdInput() {
    return this._resourceId;
  }

  // resource_name - computed: false, optional: true, required: false
  private _resourceName?: string; 
  public get resourceName() {
    return this.getStringAttribute('resource_name');
  }
  public set resourceName(value: string) {
    this._resourceName = value;
  }
  public resetResourceName() {
    this._resourceName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceNameInput() {
    return this._resourceName;
  }

  // states - computed: true, optional: false, required: false
  private _states = new DataHuaweicloudRmsResourceAggregatorPolicyStatesStatesList(this, "states", false);
  public get states() {
    return this._states;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      account_id: cdktf.stringToTerraform(this._accountId),
      aggregator_id: cdktf.stringToTerraform(this._aggregatorId),
      compliance_state: cdktf.stringToTerraform(this._complianceState),
      id: cdktf.stringToTerraform(this._id),
      policy_assignment_name: cdktf.stringToTerraform(this._policyAssignmentName),
      resource_id: cdktf.stringToTerraform(this._resourceId),
      resource_name: cdktf.stringToTerraform(this._resourceName),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      account_id: {
        value: cdktf.stringToHclTerraform(this._accountId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      aggregator_id: {
        value: cdktf.stringToHclTerraform(this._aggregatorId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      compliance_state: {
        value: cdktf.stringToHclTerraform(this._complianceState),
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
      policy_assignment_name: {
        value: cdktf.stringToHclTerraform(this._policyAssignmentName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      resource_id: {
        value: cdktf.stringToHclTerraform(this._resourceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      resource_name: {
        value: cdktf.stringToHclTerraform(this._resourceName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

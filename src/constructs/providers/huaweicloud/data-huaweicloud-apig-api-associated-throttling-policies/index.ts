// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudApigApiAssociatedThrottlingPoliciesConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the API bound to the throttling policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies#api_id DataHuaweicloudApigApiAssociatedThrottlingPolicies#api_id}
  */
  readonly apiId: string;
  /**
  * The name of the environment where the API is published.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies#env_name DataHuaweicloudApigApiAssociatedThrottlingPolicies#env_name}
  */
  readonly envName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies#id DataHuaweicloudApigApiAssociatedThrottlingPolicies#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the dedicated instance to which the throttling policies belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies#instance_id DataHuaweicloudApigApiAssociatedThrottlingPolicies#instance_id}
  */
  readonly instanceId: string;
  /**
  * The name of the throttling policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies#name DataHuaweicloudApigApiAssociatedThrottlingPolicies#name}
  */
  readonly name?: string;
  /**
  * The time unit for limiting the number of API calls.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies#period_unit DataHuaweicloudApigApiAssociatedThrottlingPolicies#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * The ID of the throttling policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies#policy_id DataHuaweicloudApigApiAssociatedThrottlingPolicies#policy_id}
  */
  readonly policyId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies#region DataHuaweicloudApigApiAssociatedThrottlingPolicies#region}
  */
  readonly region?: string;
  /**
  * The type of the throttling policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies#type DataHuaweicloudApigApiAssociatedThrottlingPolicies#type}
  */
  readonly type?: string;
}
export interface DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottles {
}

export function dataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottlesToTerraform(struct?: DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottles): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottlesToHclTerraform(struct?: DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottles): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottlesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottles | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottles | undefined) {
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

  // max_api_requests - computed: true, optional: false, required: false
  public get maxApiRequests() {
    return this.getNumberAttribute('max_api_requests');
  }

  // throttling_object_id - computed: true, optional: false, required: false
  public get throttlingObjectId() {
    return this.getStringAttribute('throttling_object_id');
  }

  // throttling_object_name - computed: true, optional: false, required: false
  public get throttlingObjectName() {
    return this.getStringAttribute('throttling_object_name');
  }
}

export class DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottlesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottlesOutputReference {
    return new DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottlesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottles {
}

export function dataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottlesToTerraform(struct?: DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottles): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottlesToHclTerraform(struct?: DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottles): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottlesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottles | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottles | undefined) {
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

  // max_api_requests - computed: true, optional: false, required: false
  public get maxApiRequests() {
    return this.getNumberAttribute('max_api_requests');
  }

  // throttling_object_id - computed: true, optional: false, required: false
  public get throttlingObjectId() {
    return this.getStringAttribute('throttling_object_id');
  }

  // throttling_object_name - computed: true, optional: false, required: false
  public get throttlingObjectName() {
    return this.getStringAttribute('throttling_object_name');
  }
}

export class DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottlesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottlesOutputReference {
    return new DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottlesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataHuaweicloudApigApiAssociatedThrottlingPoliciesPolicies {
}

export function dataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesToTerraform(struct?: DataHuaweicloudApigApiAssociatedThrottlingPoliciesPolicies): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesToHclTerraform(struct?: DataHuaweicloudApigApiAssociatedThrottlingPoliciesPolicies): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudApigApiAssociatedThrottlingPoliciesPolicies | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudApigApiAssociatedThrottlingPoliciesPolicies | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // app_throttles - computed: true, optional: false, required: false
  private _appThrottles = new DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesAppThrottlesList(this, "app_throttles", false);
  public get appThrottles() {
    return this._appThrottles;
  }

  // bind_id - computed: true, optional: false, required: false
  public get bindId() {
    return this.getStringAttribute('bind_id');
  }

  // bind_time - computed: true, optional: false, required: false
  public get bindTime() {
    return this.getStringAttribute('bind_time');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // env_name - computed: true, optional: false, required: false
  public get envName() {
    return this.getStringAttribute('env_name');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // max_api_requests - computed: true, optional: false, required: false
  public get maxApiRequests() {
    return this.getNumberAttribute('max_api_requests');
  }

  // max_app_requests - computed: true, optional: false, required: false
  public get maxAppRequests() {
    return this.getNumberAttribute('max_app_requests');
  }

  // max_ip_requests - computed: true, optional: false, required: false
  public get maxIpRequests() {
    return this.getNumberAttribute('max_ip_requests');
  }

  // max_user_requests - computed: true, optional: false, required: false
  public get maxUserRequests() {
    return this.getNumberAttribute('max_user_requests');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // period - computed: true, optional: false, required: false
  public get period() {
    return this.getNumberAttribute('period');
  }

  // period_unit - computed: true, optional: false, required: false
  public get periodUnit() {
    return this.getStringAttribute('period_unit');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // user_throttles - computed: true, optional: false, required: false
  private _userThrottles = new DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesUserThrottlesList(this, "user_throttles", false);
  public get userThrottles() {
    return this._userThrottles;
  }
}

export class DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesOutputReference {
    return new DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies huaweicloud_apig_api_associated_throttling_policies}
*/
export class DataHuaweicloudApigApiAssociatedThrottlingPolicies extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_apig_api_associated_throttling_policies";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudApigApiAssociatedThrottlingPolicies resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudApigApiAssociatedThrottlingPolicies to import
  * @param importFromId The id of the existing DataHuaweicloudApigApiAssociatedThrottlingPolicies that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudApigApiAssociatedThrottlingPolicies to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_apig_api_associated_throttling_policies", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_associated_throttling_policies huaweicloud_apig_api_associated_throttling_policies} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudApigApiAssociatedThrottlingPoliciesConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudApigApiAssociatedThrottlingPoliciesConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_apig_api_associated_throttling_policies',
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
    this._apiId = config.apiId;
    this._envName = config.envName;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._name = config.name;
    this._periodUnit = config.periodUnit;
    this._policyId = config.policyId;
    this._region = config.region;
    this._type = config.type;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // api_id - computed: false, optional: false, required: true
  private _apiId?: string; 
  public get apiId() {
    return this.getStringAttribute('api_id');
  }
  public set apiId(value: string) {
    this._apiId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get apiIdInput() {
    return this._apiId;
  }

  // env_name - computed: false, optional: true, required: false
  private _envName?: string; 
  public get envName() {
    return this.getStringAttribute('env_name');
  }
  public set envName(value: string) {
    this._envName = value;
  }
  public resetEnvName() {
    this._envName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get envNameInput() {
    return this._envName;
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

  // period_unit - computed: false, optional: true, required: false
  private _periodUnit?: string; 
  public get periodUnit() {
    return this.getStringAttribute('period_unit');
  }
  public set periodUnit(value: string) {
    this._periodUnit = value;
  }
  public resetPeriodUnit() {
    this._periodUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodUnitInput() {
    return this._periodUnit;
  }

  // policies - computed: true, optional: false, required: false
  private _policies = new DataHuaweicloudApigApiAssociatedThrottlingPoliciesPoliciesList(this, "policies", false);
  public get policies() {
    return this._policies;
  }

  // policy_id - computed: false, optional: true, required: false
  private _policyId?: string; 
  public get policyId() {
    return this.getStringAttribute('policy_id');
  }
  public set policyId(value: string) {
    this._policyId = value;
  }
  public resetPolicyId() {
    this._policyId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyIdInput() {
    return this._policyId;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      api_id: cdktf.stringToTerraform(this._apiId),
      env_name: cdktf.stringToTerraform(this._envName),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      policy_id: cdktf.stringToTerraform(this._policyId),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.stringToTerraform(this._type),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      api_id: {
        value: cdktf.stringToHclTerraform(this._apiId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      env_name: {
        value: cdktf.stringToHclTerraform(this._envName),
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
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
      period_unit: {
        value: cdktf.stringToHclTerraform(this._periodUnit),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

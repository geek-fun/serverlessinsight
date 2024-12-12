// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ApigThrottlingPolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * The description about the API throttling policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#description ApigThrottlingPolicy#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#id ApigThrottlingPolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the dedicated instance to which the throttling policy belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#instance_id ApigThrottlingPolicy#instance_id}
  */
  readonly instanceId: string;
  /**
  * The maximum number of times an API can be accessed within a specified period..
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#max_api_requests ApigThrottlingPolicy#max_api_requests}
  */
  readonly maxApiRequests: number;
  /**
  * The maximum number of times the API can be accessed by an app within the same period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#max_app_requests ApigThrottlingPolicy#max_app_requests}
  */
  readonly maxAppRequests?: number;
  /**
  * The maximum number of times the API can be accessed by an IP address within the same period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#max_ip_requests ApigThrottlingPolicy#max_ip_requests}
  */
  readonly maxIpRequests?: number;
  /**
  * The maximum number of times the API can be accessed by a user within the same period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#max_user_requests ApigThrottlingPolicy#max_user_requests}
  */
  readonly maxUserRequests?: number;
  /**
  * The name of the throttling policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#name ApigThrottlingPolicy#name}
  */
  readonly name: string;
  /**
  * The period of time for limiting the number of API calls.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#period ApigThrottlingPolicy#period}
  */
  readonly period: number;
  /**
  * The time unit for limiting the number of API calls.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#period_unit ApigThrottlingPolicy#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * The region where the throttling policy is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#region ApigThrottlingPolicy#region}
  */
  readonly region?: string;
  /**
  * The type of the request throttling policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#type ApigThrottlingPolicy#type}
  */
  readonly type?: string;
  /**
  * app_throttles block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#app_throttles ApigThrottlingPolicy#app_throttles}
  */
  readonly appThrottles?: ApigThrottlingPolicyAppThrottles[] | cdktf.IResolvable;
  /**
  * user_throttles block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#user_throttles ApigThrottlingPolicy#user_throttles}
  */
  readonly userThrottles?: ApigThrottlingPolicyUserThrottles[] | cdktf.IResolvable;
}
export interface ApigThrottlingPolicyAppThrottles {
  /**
  * The maximum number of times an API can be accessed within a specified period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#max_api_requests ApigThrottlingPolicy#max_api_requests}
  */
  readonly maxApiRequests: number;
  /**
  * The object ID which the special throttling policy belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#throttling_object_id ApigThrottlingPolicy#throttling_object_id}
  */
  readonly throttlingObjectId: string;
}

export function apigThrottlingPolicyAppThrottlesToTerraform(struct?: ApigThrottlingPolicyAppThrottles | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    max_api_requests: cdktf.numberToTerraform(struct!.maxApiRequests),
    throttling_object_id: cdktf.stringToTerraform(struct!.throttlingObjectId),
  }
}


export function apigThrottlingPolicyAppThrottlesToHclTerraform(struct?: ApigThrottlingPolicyAppThrottles | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    max_api_requests: {
      value: cdktf.numberToHclTerraform(struct!.maxApiRequests),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    throttling_object_id: {
      value: cdktf.stringToHclTerraform(struct!.throttlingObjectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigThrottlingPolicyAppThrottlesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigThrottlingPolicyAppThrottles | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._maxApiRequests !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxApiRequests = this._maxApiRequests;
    }
    if (this._throttlingObjectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.throttlingObjectId = this._throttlingObjectId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigThrottlingPolicyAppThrottles | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._maxApiRequests = undefined;
      this._throttlingObjectId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._maxApiRequests = value.maxApiRequests;
      this._throttlingObjectId = value.throttlingObjectId;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // max_api_requests - computed: false, optional: false, required: true
  private _maxApiRequests?: number; 
  public get maxApiRequests() {
    return this.getNumberAttribute('max_api_requests');
  }
  public set maxApiRequests(value: number) {
    this._maxApiRequests = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maxApiRequestsInput() {
    return this._maxApiRequests;
  }

  // throttling_object_id - computed: false, optional: false, required: true
  private _throttlingObjectId?: string; 
  public get throttlingObjectId() {
    return this.getStringAttribute('throttling_object_id');
  }
  public set throttlingObjectId(value: string) {
    this._throttlingObjectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get throttlingObjectIdInput() {
    return this._throttlingObjectId;
  }

  // throttling_object_name - computed: true, optional: false, required: false
  public get throttlingObjectName() {
    return this.getStringAttribute('throttling_object_name');
  }
}

export class ApigThrottlingPolicyAppThrottlesList extends cdktf.ComplexList {
  public internalValue? : ApigThrottlingPolicyAppThrottles[] | cdktf.IResolvable

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
  public get(index: number): ApigThrottlingPolicyAppThrottlesOutputReference {
    return new ApigThrottlingPolicyAppThrottlesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigThrottlingPolicyUserThrottles {
  /**
  * The maximum number of times an API can be accessed within a specified period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#max_api_requests ApigThrottlingPolicy#max_api_requests}
  */
  readonly maxApiRequests: number;
  /**
  * The object ID which the special throttling policy belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#throttling_object_id ApigThrottlingPolicy#throttling_object_id}
  */
  readonly throttlingObjectId: string;
}

export function apigThrottlingPolicyUserThrottlesToTerraform(struct?: ApigThrottlingPolicyUserThrottles | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    max_api_requests: cdktf.numberToTerraform(struct!.maxApiRequests),
    throttling_object_id: cdktf.stringToTerraform(struct!.throttlingObjectId),
  }
}


export function apigThrottlingPolicyUserThrottlesToHclTerraform(struct?: ApigThrottlingPolicyUserThrottles | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    max_api_requests: {
      value: cdktf.numberToHclTerraform(struct!.maxApiRequests),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    throttling_object_id: {
      value: cdktf.stringToHclTerraform(struct!.throttlingObjectId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigThrottlingPolicyUserThrottlesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigThrottlingPolicyUserThrottles | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._maxApiRequests !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxApiRequests = this._maxApiRequests;
    }
    if (this._throttlingObjectId !== undefined) {
      hasAnyValues = true;
      internalValueResult.throttlingObjectId = this._throttlingObjectId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigThrottlingPolicyUserThrottles | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._maxApiRequests = undefined;
      this._throttlingObjectId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._maxApiRequests = value.maxApiRequests;
      this._throttlingObjectId = value.throttlingObjectId;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // max_api_requests - computed: false, optional: false, required: true
  private _maxApiRequests?: number; 
  public get maxApiRequests() {
    return this.getNumberAttribute('max_api_requests');
  }
  public set maxApiRequests(value: number) {
    this._maxApiRequests = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maxApiRequestsInput() {
    return this._maxApiRequests;
  }

  // throttling_object_id - computed: false, optional: false, required: true
  private _throttlingObjectId?: string; 
  public get throttlingObjectId() {
    return this.getStringAttribute('throttling_object_id');
  }
  public set throttlingObjectId(value: string) {
    this._throttlingObjectId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get throttlingObjectIdInput() {
    return this._throttlingObjectId;
  }

  // throttling_object_name - computed: true, optional: false, required: false
  public get throttlingObjectName() {
    return this.getStringAttribute('throttling_object_name');
  }
}

export class ApigThrottlingPolicyUserThrottlesList extends cdktf.ComplexList {
  public internalValue? : ApigThrottlingPolicyUserThrottles[] | cdktf.IResolvable

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
  public get(index: number): ApigThrottlingPolicyUserThrottlesOutputReference {
    return new ApigThrottlingPolicyUserThrottlesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy huaweicloud_apig_throttling_policy}
*/
export class ApigThrottlingPolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_apig_throttling_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ApigThrottlingPolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ApigThrottlingPolicy to import
  * @param importFromId The id of the existing ApigThrottlingPolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ApigThrottlingPolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_apig_throttling_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_throttling_policy huaweicloud_apig_throttling_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ApigThrottlingPolicyConfig
  */
  public constructor(scope: Construct, id: string, config: ApigThrottlingPolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_apig_throttling_policy',
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
    this._description = config.description;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._maxApiRequests = config.maxApiRequests;
    this._maxAppRequests = config.maxAppRequests;
    this._maxIpRequests = config.maxIpRequests;
    this._maxUserRequests = config.maxUserRequests;
    this._name = config.name;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._region = config.region;
    this._type = config.type;
    this._appThrottles.internalValue = config.appThrottles;
    this._userThrottles.internalValue = config.userThrottles;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // max_api_requests - computed: false, optional: false, required: true
  private _maxApiRequests?: number; 
  public get maxApiRequests() {
    return this.getNumberAttribute('max_api_requests');
  }
  public set maxApiRequests(value: number) {
    this._maxApiRequests = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maxApiRequestsInput() {
    return this._maxApiRequests;
  }

  // max_app_requests - computed: false, optional: true, required: false
  private _maxAppRequests?: number; 
  public get maxAppRequests() {
    return this.getNumberAttribute('max_app_requests');
  }
  public set maxAppRequests(value: number) {
    this._maxAppRequests = value;
  }
  public resetMaxAppRequests() {
    this._maxAppRequests = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxAppRequestsInput() {
    return this._maxAppRequests;
  }

  // max_ip_requests - computed: false, optional: true, required: false
  private _maxIpRequests?: number; 
  public get maxIpRequests() {
    return this.getNumberAttribute('max_ip_requests');
  }
  public set maxIpRequests(value: number) {
    this._maxIpRequests = value;
  }
  public resetMaxIpRequests() {
    this._maxIpRequests = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxIpRequestsInput() {
    return this._maxIpRequests;
  }

  // max_user_requests - computed: false, optional: true, required: false
  private _maxUserRequests?: number; 
  public get maxUserRequests() {
    return this.getNumberAttribute('max_user_requests');
  }
  public set maxUserRequests(value: number) {
    this._maxUserRequests = value;
  }
  public resetMaxUserRequests() {
    this._maxUserRequests = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxUserRequestsInput() {
    return this._maxUserRequests;
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

  // period - computed: false, optional: false, required: true
  private _period?: number; 
  public get period() {
    return this.getNumberAttribute('period');
  }
  public set period(value: number) {
    this._period = value;
  }
  // Temporarily expose input value. Use with caution.
  public get periodInput() {
    return this._period;
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

  // app_throttles - computed: false, optional: true, required: false
  private _appThrottles = new ApigThrottlingPolicyAppThrottlesList(this, "app_throttles", true);
  public get appThrottles() {
    return this._appThrottles;
  }
  public putAppThrottles(value: ApigThrottlingPolicyAppThrottles[] | cdktf.IResolvable) {
    this._appThrottles.internalValue = value;
  }
  public resetAppThrottles() {
    this._appThrottles.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appThrottlesInput() {
    return this._appThrottles.internalValue;
  }

  // user_throttles - computed: false, optional: true, required: false
  private _userThrottles = new ApigThrottlingPolicyUserThrottlesList(this, "user_throttles", true);
  public get userThrottles() {
    return this._userThrottles;
  }
  public putUserThrottles(value: ApigThrottlingPolicyUserThrottles[] | cdktf.IResolvable) {
    this._userThrottles.internalValue = value;
  }
  public resetUserThrottles() {
    this._userThrottles.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userThrottlesInput() {
    return this._userThrottles.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      max_api_requests: cdktf.numberToTerraform(this._maxApiRequests),
      max_app_requests: cdktf.numberToTerraform(this._maxAppRequests),
      max_ip_requests: cdktf.numberToTerraform(this._maxIpRequests),
      max_user_requests: cdktf.numberToTerraform(this._maxUserRequests),
      name: cdktf.stringToTerraform(this._name),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.stringToTerraform(this._type),
      app_throttles: cdktf.listMapper(apigThrottlingPolicyAppThrottlesToTerraform, true)(this._appThrottles.internalValue),
      user_throttles: cdktf.listMapper(apigThrottlingPolicyUserThrottlesToTerraform, true)(this._userThrottles.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
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
      instance_id: {
        value: cdktf.stringToHclTerraform(this._instanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      max_api_requests: {
        value: cdktf.numberToHclTerraform(this._maxApiRequests),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      max_app_requests: {
        value: cdktf.numberToHclTerraform(this._maxAppRequests),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      max_ip_requests: {
        value: cdktf.numberToHclTerraform(this._maxIpRequests),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      max_user_requests: {
        value: cdktf.numberToHclTerraform(this._maxUserRequests),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      period: {
        value: cdktf.numberToHclTerraform(this._period),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      period_unit: {
        value: cdktf.stringToHclTerraform(this._periodUnit),
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
      app_throttles: {
        value: cdktf.listMapperHcl(apigThrottlingPolicyAppThrottlesToHclTerraform, true)(this._appThrottles.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ApigThrottlingPolicyAppThrottlesList",
      },
      user_throttles: {
        value: cdktf.listMapperHcl(apigThrottlingPolicyUserThrottlesToHclTerraform, true)(this._userThrottles.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ApigThrottlingPolicyUserThrottlesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

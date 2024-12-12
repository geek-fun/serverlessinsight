// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RmsRemediationConfigurationConfig extends cdktf.TerraformMetaArguments {
  /**
  * The authorization type for remediation configurations.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#auth_type RmsRemediationConfiguration#auth_type}
  */
  readonly authType?: string;
  /**
  * The information of dependent service authorization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#auth_value RmsRemediationConfiguration#auth_value}
  */
  readonly authValue?: string;
  /**
  * Whether remediation is automatic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#automatic RmsRemediationConfiguration#automatic}
  */
  readonly automatic?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#id RmsRemediationConfiguration#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The maximum number of retries allowed within a specified period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#maximum_attempts RmsRemediationConfiguration#maximum_attempts}
  */
  readonly maximumAttempts?: number;
  /**
  * The policy assignment ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#policy_assignment_id RmsRemediationConfiguration#policy_assignment_id}
  */
  readonly policyAssignmentId: string;
  /**
  * The region in which to create the resource. If omitted, the provider-level region will be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#region RmsRemediationConfiguration#region}
  */
  readonly region?: string;
  /**
  * The time period during which the number of attempts specified in the maximum_attempts can be tried.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#retry_attempt_seconds RmsRemediationConfiguration#retry_attempt_seconds}
  */
  readonly retryAttemptSeconds?: number;
  /**
  * The ID of a remediation object.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#target_id RmsRemediationConfiguration#target_id}
  */
  readonly targetId: string;
  /**
  * The execution method of remediation.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#target_type RmsRemediationConfiguration#target_type}
  */
  readonly targetType: string;
  /**
  * resource_parameter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#resource_parameter RmsRemediationConfiguration#resource_parameter}
  */
  readonly resourceParameter: RmsRemediationConfigurationResourceParameter;
  /**
  * static_parameter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#static_parameter RmsRemediationConfiguration#static_parameter}
  */
  readonly staticParameter?: RmsRemediationConfigurationStaticParameter[] | cdktf.IResolvable;
}
export interface RmsRemediationConfigurationResourceParameter {
  /**
  * The parameter name for passing the resource ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#resource_id RmsRemediationConfiguration#resource_id}
  */
  readonly resourceId: string;
}

export function rmsRemediationConfigurationResourceParameterToTerraform(struct?: RmsRemediationConfigurationResourceParameterOutputReference | RmsRemediationConfigurationResourceParameter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    resource_id: cdktf.stringToTerraform(struct!.resourceId),
  }
}


export function rmsRemediationConfigurationResourceParameterToHclTerraform(struct?: RmsRemediationConfigurationResourceParameterOutputReference | RmsRemediationConfigurationResourceParameter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    resource_id: {
      value: cdktf.stringToHclTerraform(struct!.resourceId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RmsRemediationConfigurationResourceParameterOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): RmsRemediationConfigurationResourceParameter | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._resourceId !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceId = this._resourceId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RmsRemediationConfigurationResourceParameter | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._resourceId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._resourceId = value.resourceId;
    }
  }

  // resource_id - computed: false, optional: false, required: true
  private _resourceId?: string; 
  public get resourceId() {
    return this.getStringAttribute('resource_id');
  }
  public set resourceId(value: string) {
    this._resourceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceIdInput() {
    return this._resourceId;
  }
}
export interface RmsRemediationConfigurationStaticParameter {
  /**
  * The static parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#var_key RmsRemediationConfiguration#var_key}
  */
  readonly varKey?: string;
  /**
  * The static parameter value.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#var_value RmsRemediationConfiguration#var_value}
  */
  readonly varValue?: string;
}

export function rmsRemediationConfigurationStaticParameterToTerraform(struct?: RmsRemediationConfigurationStaticParameter | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    var_key: cdktf.stringToTerraform(struct!.varKey),
    var_value: cdktf.stringToTerraform(struct!.varValue),
  }
}


export function rmsRemediationConfigurationStaticParameterToHclTerraform(struct?: RmsRemediationConfigurationStaticParameter | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    var_key: {
      value: cdktf.stringToHclTerraform(struct!.varKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    var_value: {
      value: cdktf.stringToHclTerraform(struct!.varValue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class RmsRemediationConfigurationStaticParameterOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): RmsRemediationConfigurationStaticParameter | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._varKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.varKey = this._varKey;
    }
    if (this._varValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.varValue = this._varValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RmsRemediationConfigurationStaticParameter | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._varKey = undefined;
      this._varValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._varKey = value.varKey;
      this._varValue = value.varValue;
    }
  }

  // var_key - computed: false, optional: true, required: false
  private _varKey?: string; 
  public get varKey() {
    return this.getStringAttribute('var_key');
  }
  public set varKey(value: string) {
    this._varKey = value;
  }
  public resetVarKey() {
    this._varKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get varKeyInput() {
    return this._varKey;
  }

  // var_value - computed: false, optional: true, required: false
  private _varValue?: string; 
  public get varValue() {
    return this.getStringAttribute('var_value');
  }
  public set varValue(value: string) {
    this._varValue = value;
  }
  public resetVarValue() {
    this._varValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get varValueInput() {
    return this._varValue;
  }
}

export class RmsRemediationConfigurationStaticParameterList extends cdktf.ComplexList {
  public internalValue? : RmsRemediationConfigurationStaticParameter[] | cdktf.IResolvable

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
  public get(index: number): RmsRemediationConfigurationStaticParameterOutputReference {
    return new RmsRemediationConfigurationStaticParameterOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration huaweicloud_rms_remediation_configuration}
*/
export class RmsRemediationConfiguration extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_rms_remediation_configuration";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a RmsRemediationConfiguration resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the RmsRemediationConfiguration to import
  * @param importFromId The id of the existing RmsRemediationConfiguration that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the RmsRemediationConfiguration to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_rms_remediation_configuration", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/rms_remediation_configuration huaweicloud_rms_remediation_configuration} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RmsRemediationConfigurationConfig
  */
  public constructor(scope: Construct, id: string, config: RmsRemediationConfigurationConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_rms_remediation_configuration',
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
    this._authType = config.authType;
    this._authValue = config.authValue;
    this._automatic = config.automatic;
    this._id = config.id;
    this._maximumAttempts = config.maximumAttempts;
    this._policyAssignmentId = config.policyAssignmentId;
    this._region = config.region;
    this._retryAttemptSeconds = config.retryAttemptSeconds;
    this._targetId = config.targetId;
    this._targetType = config.targetType;
    this._resourceParameter.internalValue = config.resourceParameter;
    this._staticParameter.internalValue = config.staticParameter;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // auth_type - computed: false, optional: true, required: false
  private _authType?: string; 
  public get authType() {
    return this.getStringAttribute('auth_type');
  }
  public set authType(value: string) {
    this._authType = value;
  }
  public resetAuthType() {
    this._authType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authTypeInput() {
    return this._authType;
  }

  // auth_value - computed: false, optional: true, required: false
  private _authValue?: string; 
  public get authValue() {
    return this.getStringAttribute('auth_value');
  }
  public set authValue(value: string) {
    this._authValue = value;
  }
  public resetAuthValue() {
    this._authValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authValueInput() {
    return this._authValue;
  }

  // automatic - computed: false, optional: true, required: false
  private _automatic?: boolean | cdktf.IResolvable; 
  public get automatic() {
    return this.getBooleanAttribute('automatic');
  }
  public set automatic(value: boolean | cdktf.IResolvable) {
    this._automatic = value;
  }
  public resetAutomatic() {
    this._automatic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get automaticInput() {
    return this._automatic;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // created_by - computed: true, optional: false, required: false
  public get createdBy() {
    return this.getStringAttribute('created_by');
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

  // maximum_attempts - computed: true, optional: true, required: false
  private _maximumAttempts?: number; 
  public get maximumAttempts() {
    return this.getNumberAttribute('maximum_attempts');
  }
  public set maximumAttempts(value: number) {
    this._maximumAttempts = value;
  }
  public resetMaximumAttempts() {
    this._maximumAttempts = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maximumAttemptsInput() {
    return this._maximumAttempts;
  }

  // policy_assignment_id - computed: false, optional: false, required: true
  private _policyAssignmentId?: string; 
  public get policyAssignmentId() {
    return this.getStringAttribute('policy_assignment_id');
  }
  public set policyAssignmentId(value: string) {
    this._policyAssignmentId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get policyAssignmentIdInput() {
    return this._policyAssignmentId;
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

  // retry_attempt_seconds - computed: true, optional: true, required: false
  private _retryAttemptSeconds?: number; 
  public get retryAttemptSeconds() {
    return this.getNumberAttribute('retry_attempt_seconds');
  }
  public set retryAttemptSeconds(value: number) {
    this._retryAttemptSeconds = value;
  }
  public resetRetryAttemptSeconds() {
    this._retryAttemptSeconds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retryAttemptSecondsInput() {
    return this._retryAttemptSeconds;
  }

  // target_id - computed: false, optional: false, required: true
  private _targetId?: string; 
  public get targetId() {
    return this.getStringAttribute('target_id');
  }
  public set targetId(value: string) {
    this._targetId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetIdInput() {
    return this._targetId;
  }

  // target_type - computed: false, optional: false, required: true
  private _targetType?: string; 
  public get targetType() {
    return this.getStringAttribute('target_type');
  }
  public set targetType(value: string) {
    this._targetType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetTypeInput() {
    return this._targetType;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // resource_parameter - computed: false, optional: false, required: true
  private _resourceParameter = new RmsRemediationConfigurationResourceParameterOutputReference(this, "resource_parameter");
  public get resourceParameter() {
    return this._resourceParameter;
  }
  public putResourceParameter(value: RmsRemediationConfigurationResourceParameter) {
    this._resourceParameter.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceParameterInput() {
    return this._resourceParameter.internalValue;
  }

  // static_parameter - computed: false, optional: true, required: false
  private _staticParameter = new RmsRemediationConfigurationStaticParameterList(this, "static_parameter", false);
  public get staticParameter() {
    return this._staticParameter;
  }
  public putStaticParameter(value: RmsRemediationConfigurationStaticParameter[] | cdktf.IResolvable) {
    this._staticParameter.internalValue = value;
  }
  public resetStaticParameter() {
    this._staticParameter.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get staticParameterInput() {
    return this._staticParameter.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auth_type: cdktf.stringToTerraform(this._authType),
      auth_value: cdktf.stringToTerraform(this._authValue),
      automatic: cdktf.booleanToTerraform(this._automatic),
      id: cdktf.stringToTerraform(this._id),
      maximum_attempts: cdktf.numberToTerraform(this._maximumAttempts),
      policy_assignment_id: cdktf.stringToTerraform(this._policyAssignmentId),
      region: cdktf.stringToTerraform(this._region),
      retry_attempt_seconds: cdktf.numberToTerraform(this._retryAttemptSeconds),
      target_id: cdktf.stringToTerraform(this._targetId),
      target_type: cdktf.stringToTerraform(this._targetType),
      resource_parameter: rmsRemediationConfigurationResourceParameterToTerraform(this._resourceParameter.internalValue),
      static_parameter: cdktf.listMapper(rmsRemediationConfigurationStaticParameterToTerraform, true)(this._staticParameter.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auth_type: {
        value: cdktf.stringToHclTerraform(this._authType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auth_value: {
        value: cdktf.stringToHclTerraform(this._authValue),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      automatic: {
        value: cdktf.booleanToHclTerraform(this._automatic),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      maximum_attempts: {
        value: cdktf.numberToHclTerraform(this._maximumAttempts),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      policy_assignment_id: {
        value: cdktf.stringToHclTerraform(this._policyAssignmentId),
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
      retry_attempt_seconds: {
        value: cdktf.numberToHclTerraform(this._retryAttemptSeconds),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      target_id: {
        value: cdktf.stringToHclTerraform(this._targetId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      target_type: {
        value: cdktf.stringToHclTerraform(this._targetType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      resource_parameter: {
        value: rmsRemediationConfigurationResourceParameterToHclTerraform(this._resourceParameter.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "RmsRemediationConfigurationResourceParameterList",
      },
      static_parameter: {
        value: cdktf.listMapperHcl(rmsRemediationConfigurationStaticParameterToHclTerraform, true)(this._staticParameter.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "RmsRemediationConfigurationStaticParameterList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface FgsAsyncInvokeConfigurationConfig extends cdktf.TerraformMetaArguments {
  /**
  * Whether to enable asynchronous invocation status persistence.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#enable_async_status_log FgsAsyncInvokeConfiguration#enable_async_status_log}
  */
  readonly enableAsyncStatusLog?: boolean | cdktf.IResolvable;
  /**
  * The function URN to which the asynchronous invocation belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#function_urn FgsAsyncInvokeConfiguration#function_urn}
  */
  readonly functionUrn: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#id FgsAsyncInvokeConfiguration#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The maximum validity period of a message.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#max_async_event_age_in_seconds FgsAsyncInvokeConfiguration#max_async_event_age_in_seconds}
  */
  readonly maxAsyncEventAgeInSeconds: number;
  /**
  * The maximum number of retry attempts to be made if asynchronous invocation fails.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#max_async_retry_attempts FgsAsyncInvokeConfiguration#max_async_retry_attempts}
  */
  readonly maxAsyncRetryAttempts: number;
  /**
  * The region in which to configure the asynchronous invocation.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#region FgsAsyncInvokeConfiguration#region}
  */
  readonly region?: string;
  /**
  * on_failure block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#on_failure FgsAsyncInvokeConfiguration#on_failure}
  */
  readonly onFailure?: FgsAsyncInvokeConfigurationOnFailure;
  /**
  * on_success block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#on_success FgsAsyncInvokeConfiguration#on_success}
  */
  readonly onSuccess?: FgsAsyncInvokeConfigurationOnSuccess;
}
export interface FgsAsyncInvokeConfigurationOnFailure {
  /**
  * The object type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#destination FgsAsyncInvokeConfiguration#destination}
  */
  readonly destination: string;
  /**
  * The parameters (in JSON format) corresponding to the target service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#param FgsAsyncInvokeConfiguration#param}
  */
  readonly param: string;
}

export function fgsAsyncInvokeConfigurationOnFailureToTerraform(struct?: FgsAsyncInvokeConfigurationOnFailureOutputReference | FgsAsyncInvokeConfigurationOnFailure): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    destination: cdktf.stringToTerraform(struct!.destination),
    param: cdktf.stringToTerraform(struct!.param),
  }
}


export function fgsAsyncInvokeConfigurationOnFailureToHclTerraform(struct?: FgsAsyncInvokeConfigurationOnFailureOutputReference | FgsAsyncInvokeConfigurationOnFailure): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    destination: {
      value: cdktf.stringToHclTerraform(struct!.destination),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    param: {
      value: cdktf.stringToHclTerraform(struct!.param),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsAsyncInvokeConfigurationOnFailureOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsAsyncInvokeConfigurationOnFailure | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._destination !== undefined) {
      hasAnyValues = true;
      internalValueResult.destination = this._destination;
    }
    if (this._param !== undefined) {
      hasAnyValues = true;
      internalValueResult.param = this._param;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsAsyncInvokeConfigurationOnFailure | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._destination = undefined;
      this._param = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._destination = value.destination;
      this._param = value.param;
    }
  }

  // destination - computed: false, optional: false, required: true
  private _destination?: string; 
  public get destination() {
    return this.getStringAttribute('destination');
  }
  public set destination(value: string) {
    this._destination = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationInput() {
    return this._destination;
  }

  // param - computed: false, optional: false, required: true
  private _param?: string; 
  public get param() {
    return this.getStringAttribute('param');
  }
  public set param(value: string) {
    this._param = value;
  }
  // Temporarily expose input value. Use with caution.
  public get paramInput() {
    return this._param;
  }
}
export interface FgsAsyncInvokeConfigurationOnSuccess {
  /**
  * The object type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#destination FgsAsyncInvokeConfiguration#destination}
  */
  readonly destination: string;
  /**
  * The parameters (in JSON format) corresponding to the target service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#param FgsAsyncInvokeConfiguration#param}
  */
  readonly param: string;
}

export function fgsAsyncInvokeConfigurationOnSuccessToTerraform(struct?: FgsAsyncInvokeConfigurationOnSuccessOutputReference | FgsAsyncInvokeConfigurationOnSuccess): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    destination: cdktf.stringToTerraform(struct!.destination),
    param: cdktf.stringToTerraform(struct!.param),
  }
}


export function fgsAsyncInvokeConfigurationOnSuccessToHclTerraform(struct?: FgsAsyncInvokeConfigurationOnSuccessOutputReference | FgsAsyncInvokeConfigurationOnSuccess): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    destination: {
      value: cdktf.stringToHclTerraform(struct!.destination),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    param: {
      value: cdktf.stringToHclTerraform(struct!.param),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class FgsAsyncInvokeConfigurationOnSuccessOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): FgsAsyncInvokeConfigurationOnSuccess | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._destination !== undefined) {
      hasAnyValues = true;
      internalValueResult.destination = this._destination;
    }
    if (this._param !== undefined) {
      hasAnyValues = true;
      internalValueResult.param = this._param;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: FgsAsyncInvokeConfigurationOnSuccess | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._destination = undefined;
      this._param = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._destination = value.destination;
      this._param = value.param;
    }
  }

  // destination - computed: false, optional: false, required: true
  private _destination?: string; 
  public get destination() {
    return this.getStringAttribute('destination');
  }
  public set destination(value: string) {
    this._destination = value;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationInput() {
    return this._destination;
  }

  // param - computed: false, optional: false, required: true
  private _param?: string; 
  public get param() {
    return this.getStringAttribute('param');
  }
  public set param(value: string) {
    this._param = value;
  }
  // Temporarily expose input value. Use with caution.
  public get paramInput() {
    return this._param;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration huaweicloud_fgs_async_invoke_configuration}
*/
export class FgsAsyncInvokeConfiguration extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_fgs_async_invoke_configuration";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a FgsAsyncInvokeConfiguration resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the FgsAsyncInvokeConfiguration to import
  * @param importFromId The id of the existing FgsAsyncInvokeConfiguration that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the FgsAsyncInvokeConfiguration to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_fgs_async_invoke_configuration", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/fgs_async_invoke_configuration huaweicloud_fgs_async_invoke_configuration} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options FgsAsyncInvokeConfigurationConfig
  */
  public constructor(scope: Construct, id: string, config: FgsAsyncInvokeConfigurationConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_fgs_async_invoke_configuration',
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
    this._enableAsyncStatusLog = config.enableAsyncStatusLog;
    this._functionUrn = config.functionUrn;
    this._id = config.id;
    this._maxAsyncEventAgeInSeconds = config.maxAsyncEventAgeInSeconds;
    this._maxAsyncRetryAttempts = config.maxAsyncRetryAttempts;
    this._region = config.region;
    this._onFailure.internalValue = config.onFailure;
    this._onSuccess.internalValue = config.onSuccess;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // enable_async_status_log - computed: false, optional: true, required: false
  private _enableAsyncStatusLog?: boolean | cdktf.IResolvable; 
  public get enableAsyncStatusLog() {
    return this.getBooleanAttribute('enable_async_status_log');
  }
  public set enableAsyncStatusLog(value: boolean | cdktf.IResolvable) {
    this._enableAsyncStatusLog = value;
  }
  public resetEnableAsyncStatusLog() {
    this._enableAsyncStatusLog = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableAsyncStatusLogInput() {
    return this._enableAsyncStatusLog;
  }

  // function_urn - computed: false, optional: false, required: true
  private _functionUrn?: string; 
  public get functionUrn() {
    return this.getStringAttribute('function_urn');
  }
  public set functionUrn(value: string) {
    this._functionUrn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get functionUrnInput() {
    return this._functionUrn;
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

  // max_async_event_age_in_seconds - computed: false, optional: false, required: true
  private _maxAsyncEventAgeInSeconds?: number; 
  public get maxAsyncEventAgeInSeconds() {
    return this.getNumberAttribute('max_async_event_age_in_seconds');
  }
  public set maxAsyncEventAgeInSeconds(value: number) {
    this._maxAsyncEventAgeInSeconds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maxAsyncEventAgeInSecondsInput() {
    return this._maxAsyncEventAgeInSeconds;
  }

  // max_async_retry_attempts - computed: false, optional: false, required: true
  private _maxAsyncRetryAttempts?: number; 
  public get maxAsyncRetryAttempts() {
    return this.getNumberAttribute('max_async_retry_attempts');
  }
  public set maxAsyncRetryAttempts(value: number) {
    this._maxAsyncRetryAttempts = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maxAsyncRetryAttemptsInput() {
    return this._maxAsyncRetryAttempts;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // on_failure - computed: false, optional: true, required: false
  private _onFailure = new FgsAsyncInvokeConfigurationOnFailureOutputReference(this, "on_failure");
  public get onFailure() {
    return this._onFailure;
  }
  public putOnFailure(value: FgsAsyncInvokeConfigurationOnFailure) {
    this._onFailure.internalValue = value;
  }
  public resetOnFailure() {
    this._onFailure.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get onFailureInput() {
    return this._onFailure.internalValue;
  }

  // on_success - computed: false, optional: true, required: false
  private _onSuccess = new FgsAsyncInvokeConfigurationOnSuccessOutputReference(this, "on_success");
  public get onSuccess() {
    return this._onSuccess;
  }
  public putOnSuccess(value: FgsAsyncInvokeConfigurationOnSuccess) {
    this._onSuccess.internalValue = value;
  }
  public resetOnSuccess() {
    this._onSuccess.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get onSuccessInput() {
    return this._onSuccess.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      enable_async_status_log: cdktf.booleanToTerraform(this._enableAsyncStatusLog),
      function_urn: cdktf.stringToTerraform(this._functionUrn),
      id: cdktf.stringToTerraform(this._id),
      max_async_event_age_in_seconds: cdktf.numberToTerraform(this._maxAsyncEventAgeInSeconds),
      max_async_retry_attempts: cdktf.numberToTerraform(this._maxAsyncRetryAttempts),
      region: cdktf.stringToTerraform(this._region),
      on_failure: fgsAsyncInvokeConfigurationOnFailureToTerraform(this._onFailure.internalValue),
      on_success: fgsAsyncInvokeConfigurationOnSuccessToTerraform(this._onSuccess.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      enable_async_status_log: {
        value: cdktf.booleanToHclTerraform(this._enableAsyncStatusLog),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      function_urn: {
        value: cdktf.stringToHclTerraform(this._functionUrn),
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
      max_async_event_age_in_seconds: {
        value: cdktf.numberToHclTerraform(this._maxAsyncEventAgeInSeconds),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      max_async_retry_attempts: {
        value: cdktf.numberToHclTerraform(this._maxAsyncRetryAttempts),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      on_failure: {
        value: fgsAsyncInvokeConfigurationOnFailureToHclTerraform(this._onFailure.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsAsyncInvokeConfigurationOnFailureList",
      },
      on_success: {
        value: fgsAsyncInvokeConfigurationOnSuccessToHclTerraform(this._onSuccess.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "FgsAsyncInvokeConfigurationOnSuccessList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

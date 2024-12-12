// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ApigApiConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the authorizer to which the API request used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#authorizer_id ApigApi#authorizer_id}
  */
  readonly authorizerId?: string;
  /**
  * The description of the API request body, which can be an example request body, media type or parameters.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#body_description ApigApi#body_description}
  */
  readonly bodyDescription?: string;
  /**
  * Whether CORS is supported.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#cors ApigApi#cors}
  */
  readonly cors?: boolean | cdktf.IResolvable;
  /**
  * The API description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#description ApigApi#description}
  */
  readonly description?: string;
  /**
  * The example response for a failure request.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#failure_response ApigApi#failure_response}
  */
  readonly failureResponse?: string;
  /**
  * The ID of the API group to which the API belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#group_id ApigApi#group_id}
  */
  readonly groupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#id ApigApi#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the instance to which the API belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#instance_id ApigApi#instance_id}
  */
  readonly instanceId: string;
  /**
  * The matching mode of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#matching ApigApi#matching}
  */
  readonly matching?: string;
  /**
  * The API name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#name ApigApi#name}
  */
  readonly name: string;
  /**
  * The region where the API is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#region ApigApi#region}
  */
  readonly region?: string;
  /**
  * The request method of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#request_method ApigApi#request_method}
  */
  readonly requestMethod: string;
  /**
  * The request address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#request_path ApigApi#request_path}
  */
  readonly requestPath: string;
  /**
  * The request protocol of the API request.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#request_protocol ApigApi#request_protocol}
  */
  readonly requestProtocol: string;
  /**
  * The ID of the custom response that API used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#response_id ApigApi#response_id}
  */
  readonly responseId?: string;
  /**
  * The security authentication mode of the API request.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#security_authentication ApigApi#security_authentication}
  */
  readonly securityAuthentication?: string;
  /**
  * Whether the authentication of the application code is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#simple_authentication ApigApi#simple_authentication}
  */
  readonly simpleAuthentication?: boolean | cdktf.IResolvable;
  /**
  * The example response for a successful request.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#success_response ApigApi#success_response}
  */
  readonly successResponse?: string;
  /**
  * The list of tags configuration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#tags ApigApi#tags}
  */
  readonly tags?: string[];
  /**
  * The API type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#type ApigApi#type}
  */
  readonly type: string;
  /**
  * backend_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#backend_params ApigApi#backend_params}
  */
  readonly backendParams?: ApigApiBackendParams[] | cdktf.IResolvable;
  /**
  * func_graph block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#func_graph ApigApi#func_graph}
  */
  readonly funcGraph?: ApigApiFuncGraph;
  /**
  * func_graph_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#func_graph_policy ApigApi#func_graph_policy}
  */
  readonly funcGraphPolicy?: ApigApiFuncGraphPolicy[] | cdktf.IResolvable;
  /**
  * mock block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#mock ApigApi#mock}
  */
  readonly mock?: ApigApiMock;
  /**
  * mock_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#mock_policy ApigApi#mock_policy}
  */
  readonly mockPolicy?: ApigApiMockPolicy[] | cdktf.IResolvable;
  /**
  * request_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#request_params ApigApi#request_params}
  */
  readonly requestParams?: ApigApiRequestParams[] | cdktf.IResolvable;
  /**
  * web block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#web ApigApi#web}
  */
  readonly web?: ApigApiWeb;
  /**
  * web_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#web_policy ApigApi#web_policy}
  */
  readonly webPolicy?: ApigApiWebPolicy[] | cdktf.IResolvable;
}
export interface ApigApiBackendParams {
  /**
  * The description of the parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#description ApigApi#description}
  */
  readonly description?: string;
  /**
  * Where the parameter is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#location ApigApi#location}
  */
  readonly location: string;
  /**
  * The parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#name ApigApi#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#system_param_type ApigApi#system_param_type}
  */
  readonly systemParamType?: string;
  /**
  * The parameter type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#type ApigApi#type}
  */
  readonly type: string;
  /**
  * The value of the parameter
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#value ApigApi#value}
  */
  readonly value: string;
}

export function apigApiBackendParamsToTerraform(struct?: ApigApiBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    location: cdktf.stringToTerraform(struct!.location),
    name: cdktf.stringToTerraform(struct!.name),
    system_param_type: cdktf.stringToTerraform(struct!.systemParamType),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function apigApiBackendParamsToHclTerraform(struct?: ApigApiBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    location: {
      value: cdktf.stringToHclTerraform(struct!.location),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    system_param_type: {
      value: cdktf.stringToHclTerraform(struct!.systemParamType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiBackendParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiBackendParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._location !== undefined) {
      hasAnyValues = true;
      internalValueResult.location = this._location;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._systemParamType !== undefined) {
      hasAnyValues = true;
      internalValueResult.systemParamType = this._systemParamType;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiBackendParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._location = undefined;
      this._name = undefined;
      this._systemParamType = undefined;
      this._type = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._description = value.description;
      this._location = value.location;
      this._name = value.name;
      this._systemParamType = value.systemParamType;
      this._type = value.type;
      this._value = value.value;
    }
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

  // location - computed: false, optional: false, required: true
  private _location?: string; 
  public get location() {
    return this.getStringAttribute('location');
  }
  public set location(value: string) {
    this._location = value;
  }
  // Temporarily expose input value. Use with caution.
  public get locationInput() {
    return this._location;
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

  // system_param_type - computed: false, optional: true, required: false
  private _systemParamType?: string; 
  public get systemParamType() {
    return this.getStringAttribute('system_param_type');
  }
  public set systemParamType(value: string) {
    this._systemParamType = value;
  }
  public resetSystemParamType() {
    this._systemParamType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get systemParamTypeInput() {
    return this._systemParamType;
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class ApigApiBackendParamsList extends cdktf.ComplexList {
  public internalValue? : ApigApiBackendParams[] | cdktf.IResolvable

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
  public get(index: number): ApigApiBackendParamsOutputReference {
    return new ApigApiBackendParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigApiFuncGraph {
  /**
  * The ID of the backend custom authorization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#authorizer_id ApigApi#authorizer_id}
  */
  readonly authorizerId?: string;
  /**
  * The alias URN of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#function_alias_urn ApigApi#function_alias_urn}
  */
  readonly functionAliasUrn?: string;
  /**
  * The URN of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#function_urn ApigApi#function_urn}
  */
  readonly functionUrn: string;
  /**
  * The invocation type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#invocation_type ApigApi#invocation_type}
  */
  readonly invocationType?: string;
  /**
  * The network architecture (framework) type of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#network_type ApigApi#network_type}
  */
  readonly networkType?: string;
  /**
  * The request protocol of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#request_protocol ApigApi#request_protocol}
  */
  readonly requestProtocol?: string;
  /**
  * The timeout for API requests to backend service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#timeout ApigApi#timeout}
  */
  readonly timeout?: number;
  /**
  * The version of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#version ApigApi#version}
  */
  readonly version?: string;
}

export function apigApiFuncGraphToTerraform(struct?: ApigApiFuncGraphOutputReference | ApigApiFuncGraph): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    authorizer_id: cdktf.stringToTerraform(struct!.authorizerId),
    function_alias_urn: cdktf.stringToTerraform(struct!.functionAliasUrn),
    function_urn: cdktf.stringToTerraform(struct!.functionUrn),
    invocation_type: cdktf.stringToTerraform(struct!.invocationType),
    network_type: cdktf.stringToTerraform(struct!.networkType),
    request_protocol: cdktf.stringToTerraform(struct!.requestProtocol),
    timeout: cdktf.numberToTerraform(struct!.timeout),
    version: cdktf.stringToTerraform(struct!.version),
  }
}


export function apigApiFuncGraphToHclTerraform(struct?: ApigApiFuncGraphOutputReference | ApigApiFuncGraph): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    authorizer_id: {
      value: cdktf.stringToHclTerraform(struct!.authorizerId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    function_alias_urn: {
      value: cdktf.stringToHclTerraform(struct!.functionAliasUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    function_urn: {
      value: cdktf.stringToHclTerraform(struct!.functionUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    invocation_type: {
      value: cdktf.stringToHclTerraform(struct!.invocationType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    network_type: {
      value: cdktf.stringToHclTerraform(struct!.networkType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    request_protocol: {
      value: cdktf.stringToHclTerraform(struct!.requestProtocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    timeout: {
      value: cdktf.numberToHclTerraform(struct!.timeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    version: {
      value: cdktf.stringToHclTerraform(struct!.version),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiFuncGraphOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ApigApiFuncGraph | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authorizerId !== undefined) {
      hasAnyValues = true;
      internalValueResult.authorizerId = this._authorizerId;
    }
    if (this._functionAliasUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.functionAliasUrn = this._functionAliasUrn;
    }
    if (this._functionUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.functionUrn = this._functionUrn;
    }
    if (this._invocationType !== undefined) {
      hasAnyValues = true;
      internalValueResult.invocationType = this._invocationType;
    }
    if (this._networkType !== undefined) {
      hasAnyValues = true;
      internalValueResult.networkType = this._networkType;
    }
    if (this._requestProtocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.requestProtocol = this._requestProtocol;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    if (this._version !== undefined) {
      hasAnyValues = true;
      internalValueResult.version = this._version;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiFuncGraph | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._authorizerId = undefined;
      this._functionAliasUrn = undefined;
      this._functionUrn = undefined;
      this._invocationType = undefined;
      this._networkType = undefined;
      this._requestProtocol = undefined;
      this._timeout = undefined;
      this._version = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._authorizerId = value.authorizerId;
      this._functionAliasUrn = value.functionAliasUrn;
      this._functionUrn = value.functionUrn;
      this._invocationType = value.invocationType;
      this._networkType = value.networkType;
      this._requestProtocol = value.requestProtocol;
      this._timeout = value.timeout;
      this._version = value.version;
    }
  }

  // authorizer_id - computed: false, optional: true, required: false
  private _authorizerId?: string; 
  public get authorizerId() {
    return this.getStringAttribute('authorizer_id');
  }
  public set authorizerId(value: string) {
    this._authorizerId = value;
  }
  public resetAuthorizerId() {
    this._authorizerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authorizerIdInput() {
    return this._authorizerId;
  }

  // function_alias_urn - computed: false, optional: true, required: false
  private _functionAliasUrn?: string; 
  public get functionAliasUrn() {
    return this.getStringAttribute('function_alias_urn');
  }
  public set functionAliasUrn(value: string) {
    this._functionAliasUrn = value;
  }
  public resetFunctionAliasUrn() {
    this._functionAliasUrn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get functionAliasUrnInput() {
    return this._functionAliasUrn;
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

  // invocation_type - computed: false, optional: true, required: false
  private _invocationType?: string; 
  public get invocationType() {
    return this.getStringAttribute('invocation_type');
  }
  public set invocationType(value: string) {
    this._invocationType = value;
  }
  public resetInvocationType() {
    this._invocationType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get invocationTypeInput() {
    return this._invocationType;
  }

  // network_type - computed: false, optional: true, required: false
  private _networkType?: string; 
  public get networkType() {
    return this.getStringAttribute('network_type');
  }
  public set networkType(value: string) {
    this._networkType = value;
  }
  public resetNetworkType() {
    this._networkType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get networkTypeInput() {
    return this._networkType;
  }

  // request_protocol - computed: false, optional: true, required: false
  private _requestProtocol?: string; 
  public get requestProtocol() {
    return this.getStringAttribute('request_protocol');
  }
  public set requestProtocol(value: string) {
    this._requestProtocol = value;
  }
  public resetRequestProtocol() {
    this._requestProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestProtocolInput() {
    return this._requestProtocol;
  }

  // timeout - computed: false, optional: true, required: false
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  public resetTimeout() {
    this._timeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }

  // version - computed: false, optional: true, required: false
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  public resetVersion() {
    this._version = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }
}
export interface ApigApiFuncGraphPolicyBackendParams {
  /**
  * The description of the parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#description ApigApi#description}
  */
  readonly description?: string;
  /**
  * Where the parameter is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#location ApigApi#location}
  */
  readonly location: string;
  /**
  * The parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#name ApigApi#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#system_param_type ApigApi#system_param_type}
  */
  readonly systemParamType?: string;
  /**
  * The parameter type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#type ApigApi#type}
  */
  readonly type: string;
  /**
  * The value of the parameter
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#value ApigApi#value}
  */
  readonly value: string;
}

export function apigApiFuncGraphPolicyBackendParamsToTerraform(struct?: ApigApiFuncGraphPolicyBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    location: cdktf.stringToTerraform(struct!.location),
    name: cdktf.stringToTerraform(struct!.name),
    system_param_type: cdktf.stringToTerraform(struct!.systemParamType),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function apigApiFuncGraphPolicyBackendParamsToHclTerraform(struct?: ApigApiFuncGraphPolicyBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    location: {
      value: cdktf.stringToHclTerraform(struct!.location),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    system_param_type: {
      value: cdktf.stringToHclTerraform(struct!.systemParamType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiFuncGraphPolicyBackendParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiFuncGraphPolicyBackendParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._location !== undefined) {
      hasAnyValues = true;
      internalValueResult.location = this._location;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._systemParamType !== undefined) {
      hasAnyValues = true;
      internalValueResult.systemParamType = this._systemParamType;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiFuncGraphPolicyBackendParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._location = undefined;
      this._name = undefined;
      this._systemParamType = undefined;
      this._type = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._description = value.description;
      this._location = value.location;
      this._name = value.name;
      this._systemParamType = value.systemParamType;
      this._type = value.type;
      this._value = value.value;
    }
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

  // location - computed: false, optional: false, required: true
  private _location?: string; 
  public get location() {
    return this.getStringAttribute('location');
  }
  public set location(value: string) {
    this._location = value;
  }
  // Temporarily expose input value. Use with caution.
  public get locationInput() {
    return this._location;
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

  // system_param_type - computed: false, optional: true, required: false
  private _systemParamType?: string; 
  public get systemParamType() {
    return this.getStringAttribute('system_param_type');
  }
  public set systemParamType(value: string) {
    this._systemParamType = value;
  }
  public resetSystemParamType() {
    this._systemParamType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get systemParamTypeInput() {
    return this._systemParamType;
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class ApigApiFuncGraphPolicyBackendParamsList extends cdktf.ComplexList {
  public internalValue? : ApigApiFuncGraphPolicyBackendParams[] | cdktf.IResolvable

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
  public get(index: number): ApigApiFuncGraphPolicyBackendParamsOutputReference {
    return new ApigApiFuncGraphPolicyBackendParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigApiFuncGraphPolicyConditions {
  /**
  * The cookie parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#cookie_name ApigApi#cookie_name}
  */
  readonly cookieName?: string;
  /**
  * The frontend authentication parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#frontend_authorizer_name ApigApi#frontend_authorizer_name}
  */
  readonly frontendAuthorizerName?: string;
  /**
  * The request parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#param_name ApigApi#param_name}
  */
  readonly paramName?: string;
  /**
  * The type of the backend policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#source ApigApi#source}
  */
  readonly source?: string;
  /**
  * The gateway built-in parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#sys_name ApigApi#sys_name}
  */
  readonly sysName?: string;
  /**
  * The condition type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#type ApigApi#type}
  */
  readonly type?: string;
  /**
  * The value of the backend policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#value ApigApi#value}
  */
  readonly value: string;
}

export function apigApiFuncGraphPolicyConditionsToTerraform(struct?: ApigApiFuncGraphPolicyConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cookie_name: cdktf.stringToTerraform(struct!.cookieName),
    frontend_authorizer_name: cdktf.stringToTerraform(struct!.frontendAuthorizerName),
    param_name: cdktf.stringToTerraform(struct!.paramName),
    source: cdktf.stringToTerraform(struct!.source),
    sys_name: cdktf.stringToTerraform(struct!.sysName),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function apigApiFuncGraphPolicyConditionsToHclTerraform(struct?: ApigApiFuncGraphPolicyConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cookie_name: {
      value: cdktf.stringToHclTerraform(struct!.cookieName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    frontend_authorizer_name: {
      value: cdktf.stringToHclTerraform(struct!.frontendAuthorizerName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    param_name: {
      value: cdktf.stringToHclTerraform(struct!.paramName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source: {
      value: cdktf.stringToHclTerraform(struct!.source),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sys_name: {
      value: cdktf.stringToHclTerraform(struct!.sysName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiFuncGraphPolicyConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiFuncGraphPolicyConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cookieName !== undefined) {
      hasAnyValues = true;
      internalValueResult.cookieName = this._cookieName;
    }
    if (this._frontendAuthorizerName !== undefined) {
      hasAnyValues = true;
      internalValueResult.frontendAuthorizerName = this._frontendAuthorizerName;
    }
    if (this._paramName !== undefined) {
      hasAnyValues = true;
      internalValueResult.paramName = this._paramName;
    }
    if (this._source !== undefined) {
      hasAnyValues = true;
      internalValueResult.source = this._source;
    }
    if (this._sysName !== undefined) {
      hasAnyValues = true;
      internalValueResult.sysName = this._sysName;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiFuncGraphPolicyConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._cookieName = undefined;
      this._frontendAuthorizerName = undefined;
      this._paramName = undefined;
      this._source = undefined;
      this._sysName = undefined;
      this._type = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._cookieName = value.cookieName;
      this._frontendAuthorizerName = value.frontendAuthorizerName;
      this._paramName = value.paramName;
      this._source = value.source;
      this._sysName = value.sysName;
      this._type = value.type;
      this._value = value.value;
    }
  }

  // cookie_name - computed: false, optional: true, required: false
  private _cookieName?: string; 
  public get cookieName() {
    return this.getStringAttribute('cookie_name');
  }
  public set cookieName(value: string) {
    this._cookieName = value;
  }
  public resetCookieName() {
    this._cookieName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cookieNameInput() {
    return this._cookieName;
  }

  // frontend_authorizer_name - computed: false, optional: true, required: false
  private _frontendAuthorizerName?: string; 
  public get frontendAuthorizerName() {
    return this.getStringAttribute('frontend_authorizer_name');
  }
  public set frontendAuthorizerName(value: string) {
    this._frontendAuthorizerName = value;
  }
  public resetFrontendAuthorizerName() {
    this._frontendAuthorizerName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get frontendAuthorizerNameInput() {
    return this._frontendAuthorizerName;
  }

  // param_name - computed: false, optional: true, required: false
  private _paramName?: string; 
  public get paramName() {
    return this.getStringAttribute('param_name');
  }
  public set paramName(value: string) {
    this._paramName = value;
  }
  public resetParamName() {
    this._paramName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get paramNameInput() {
    return this._paramName;
  }

  // source - computed: false, optional: true, required: false
  private _source?: string; 
  public get source() {
    return this.getStringAttribute('source');
  }
  public set source(value: string) {
    this._source = value;
  }
  public resetSource() {
    this._source = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceInput() {
    return this._source;
  }

  // sys_name - computed: false, optional: true, required: false
  private _sysName?: string; 
  public get sysName() {
    return this.getStringAttribute('sys_name');
  }
  public set sysName(value: string) {
    this._sysName = value;
  }
  public resetSysName() {
    this._sysName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sysNameInput() {
    return this._sysName;
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

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class ApigApiFuncGraphPolicyConditionsList extends cdktf.ComplexList {
  public internalValue? : ApigApiFuncGraphPolicyConditions[] | cdktf.IResolvable

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
  public get(index: number): ApigApiFuncGraphPolicyConditionsOutputReference {
    return new ApigApiFuncGraphPolicyConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigApiFuncGraphPolicy {
  /**
  * The ID of the backend custom authorization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#authorizer_id ApigApi#authorizer_id}
  */
  readonly authorizerId?: string;
  /**
  * The effective mode of the backend policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#effective_mode ApigApi#effective_mode}
  */
  readonly effectiveMode?: string;
  /**
  * The alias URN of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#function_alias_urn ApigApi#function_alias_urn}
  */
  readonly functionAliasUrn?: string;
  /**
  * The URN of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#function_urn ApigApi#function_urn}
  */
  readonly functionUrn: string;
  /**
  * The invocation mode of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#invocation_mode ApigApi#invocation_mode}
  */
  readonly invocationMode?: string;
  /**
  * The invocation mode of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#invocation_type ApigApi#invocation_type}
  */
  readonly invocationType?: string;
  /**
  * The name of the backend policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#name ApigApi#name}
  */
  readonly name: string;
  /**
  * The network (framework) type of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#network_type ApigApi#network_type}
  */
  readonly networkType?: string;
  /**
  * The request protocol of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#request_protocol ApigApi#request_protocol}
  */
  readonly requestProtocol?: string;
  /**
  * The timeout for API requests to backend service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#timeout ApigApi#timeout}
  */
  readonly timeout?: number;
  /**
  * The version of the FunctionGraph function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#version ApigApi#version}
  */
  readonly version?: string;
  /**
  * backend_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#backend_params ApigApi#backend_params}
  */
  readonly backendParams?: ApigApiFuncGraphPolicyBackendParams[] | cdktf.IResolvable;
  /**
  * conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#conditions ApigApi#conditions}
  */
  readonly conditions: ApigApiFuncGraphPolicyConditions[] | cdktf.IResolvable;
}

export function apigApiFuncGraphPolicyToTerraform(struct?: ApigApiFuncGraphPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    authorizer_id: cdktf.stringToTerraform(struct!.authorizerId),
    effective_mode: cdktf.stringToTerraform(struct!.effectiveMode),
    function_alias_urn: cdktf.stringToTerraform(struct!.functionAliasUrn),
    function_urn: cdktf.stringToTerraform(struct!.functionUrn),
    invocation_mode: cdktf.stringToTerraform(struct!.invocationMode),
    invocation_type: cdktf.stringToTerraform(struct!.invocationType),
    name: cdktf.stringToTerraform(struct!.name),
    network_type: cdktf.stringToTerraform(struct!.networkType),
    request_protocol: cdktf.stringToTerraform(struct!.requestProtocol),
    timeout: cdktf.numberToTerraform(struct!.timeout),
    version: cdktf.stringToTerraform(struct!.version),
    backend_params: cdktf.listMapper(apigApiFuncGraphPolicyBackendParamsToTerraform, true)(struct!.backendParams),
    conditions: cdktf.listMapper(apigApiFuncGraphPolicyConditionsToTerraform, true)(struct!.conditions),
  }
}


export function apigApiFuncGraphPolicyToHclTerraform(struct?: ApigApiFuncGraphPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    authorizer_id: {
      value: cdktf.stringToHclTerraform(struct!.authorizerId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    effective_mode: {
      value: cdktf.stringToHclTerraform(struct!.effectiveMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    function_alias_urn: {
      value: cdktf.stringToHclTerraform(struct!.functionAliasUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    function_urn: {
      value: cdktf.stringToHclTerraform(struct!.functionUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    invocation_mode: {
      value: cdktf.stringToHclTerraform(struct!.invocationMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    invocation_type: {
      value: cdktf.stringToHclTerraform(struct!.invocationType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    network_type: {
      value: cdktf.stringToHclTerraform(struct!.networkType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    request_protocol: {
      value: cdktf.stringToHclTerraform(struct!.requestProtocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    timeout: {
      value: cdktf.numberToHclTerraform(struct!.timeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    version: {
      value: cdktf.stringToHclTerraform(struct!.version),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    backend_params: {
      value: cdktf.listMapperHcl(apigApiFuncGraphPolicyBackendParamsToHclTerraform, true)(struct!.backendParams),
      isBlock: true,
      type: "set",
      storageClassType: "ApigApiFuncGraphPolicyBackendParamsList",
    },
    conditions: {
      value: cdktf.listMapperHcl(apigApiFuncGraphPolicyConditionsToHclTerraform, true)(struct!.conditions),
      isBlock: true,
      type: "set",
      storageClassType: "ApigApiFuncGraphPolicyConditionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiFuncGraphPolicyOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiFuncGraphPolicy | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authorizerId !== undefined) {
      hasAnyValues = true;
      internalValueResult.authorizerId = this._authorizerId;
    }
    if (this._effectiveMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.effectiveMode = this._effectiveMode;
    }
    if (this._functionAliasUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.functionAliasUrn = this._functionAliasUrn;
    }
    if (this._functionUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.functionUrn = this._functionUrn;
    }
    if (this._invocationMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.invocationMode = this._invocationMode;
    }
    if (this._invocationType !== undefined) {
      hasAnyValues = true;
      internalValueResult.invocationType = this._invocationType;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._networkType !== undefined) {
      hasAnyValues = true;
      internalValueResult.networkType = this._networkType;
    }
    if (this._requestProtocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.requestProtocol = this._requestProtocol;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    if (this._version !== undefined) {
      hasAnyValues = true;
      internalValueResult.version = this._version;
    }
    if (this._backendParams?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendParams = this._backendParams?.internalValue;
    }
    if (this._conditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.conditions = this._conditions?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiFuncGraphPolicy | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._authorizerId = undefined;
      this._effectiveMode = undefined;
      this._functionAliasUrn = undefined;
      this._functionUrn = undefined;
      this._invocationMode = undefined;
      this._invocationType = undefined;
      this._name = undefined;
      this._networkType = undefined;
      this._requestProtocol = undefined;
      this._timeout = undefined;
      this._version = undefined;
      this._backendParams.internalValue = undefined;
      this._conditions.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._authorizerId = value.authorizerId;
      this._effectiveMode = value.effectiveMode;
      this._functionAliasUrn = value.functionAliasUrn;
      this._functionUrn = value.functionUrn;
      this._invocationMode = value.invocationMode;
      this._invocationType = value.invocationType;
      this._name = value.name;
      this._networkType = value.networkType;
      this._requestProtocol = value.requestProtocol;
      this._timeout = value.timeout;
      this._version = value.version;
      this._backendParams.internalValue = value.backendParams;
      this._conditions.internalValue = value.conditions;
    }
  }

  // authorizer_id - computed: false, optional: true, required: false
  private _authorizerId?: string; 
  public get authorizerId() {
    return this.getStringAttribute('authorizer_id');
  }
  public set authorizerId(value: string) {
    this._authorizerId = value;
  }
  public resetAuthorizerId() {
    this._authorizerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authorizerIdInput() {
    return this._authorizerId;
  }

  // effective_mode - computed: false, optional: true, required: false
  private _effectiveMode?: string; 
  public get effectiveMode() {
    return this.getStringAttribute('effective_mode');
  }
  public set effectiveMode(value: string) {
    this._effectiveMode = value;
  }
  public resetEffectiveMode() {
    this._effectiveMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get effectiveModeInput() {
    return this._effectiveMode;
  }

  // function_alias_urn - computed: false, optional: true, required: false
  private _functionAliasUrn?: string; 
  public get functionAliasUrn() {
    return this.getStringAttribute('function_alias_urn');
  }
  public set functionAliasUrn(value: string) {
    this._functionAliasUrn = value;
  }
  public resetFunctionAliasUrn() {
    this._functionAliasUrn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get functionAliasUrnInput() {
    return this._functionAliasUrn;
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

  // invocation_mode - computed: false, optional: true, required: false
  private _invocationMode?: string; 
  public get invocationMode() {
    return this.getStringAttribute('invocation_mode');
  }
  public set invocationMode(value: string) {
    this._invocationMode = value;
  }
  public resetInvocationMode() {
    this._invocationMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get invocationModeInput() {
    return this._invocationMode;
  }

  // invocation_type - computed: false, optional: true, required: false
  private _invocationType?: string; 
  public get invocationType() {
    return this.getStringAttribute('invocation_type');
  }
  public set invocationType(value: string) {
    this._invocationType = value;
  }
  public resetInvocationType() {
    this._invocationType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get invocationTypeInput() {
    return this._invocationType;
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

  // network_type - computed: false, optional: true, required: false
  private _networkType?: string; 
  public get networkType() {
    return this.getStringAttribute('network_type');
  }
  public set networkType(value: string) {
    this._networkType = value;
  }
  public resetNetworkType() {
    this._networkType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get networkTypeInput() {
    return this._networkType;
  }

  // request_protocol - computed: false, optional: true, required: false
  private _requestProtocol?: string; 
  public get requestProtocol() {
    return this.getStringAttribute('request_protocol');
  }
  public set requestProtocol(value: string) {
    this._requestProtocol = value;
  }
  public resetRequestProtocol() {
    this._requestProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestProtocolInput() {
    return this._requestProtocol;
  }

  // timeout - computed: false, optional: true, required: false
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  public resetTimeout() {
    this._timeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }

  // version - computed: false, optional: true, required: false
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  public resetVersion() {
    this._version = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // backend_params - computed: false, optional: true, required: false
  private _backendParams = new ApigApiFuncGraphPolicyBackendParamsList(this, "backend_params", true);
  public get backendParams() {
    return this._backendParams;
  }
  public putBackendParams(value: ApigApiFuncGraphPolicyBackendParams[] | cdktf.IResolvable) {
    this._backendParams.internalValue = value;
  }
  public resetBackendParams() {
    this._backendParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendParamsInput() {
    return this._backendParams.internalValue;
  }

  // conditions - computed: false, optional: false, required: true
  private _conditions = new ApigApiFuncGraphPolicyConditionsList(this, "conditions", true);
  public get conditions() {
    return this._conditions;
  }
  public putConditions(value: ApigApiFuncGraphPolicyConditions[] | cdktf.IResolvable) {
    this._conditions.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get conditionsInput() {
    return this._conditions.internalValue;
  }
}

export class ApigApiFuncGraphPolicyList extends cdktf.ComplexList {
  public internalValue? : ApigApiFuncGraphPolicy[] | cdktf.IResolvable

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
  public get(index: number): ApigApiFuncGraphPolicyOutputReference {
    return new ApigApiFuncGraphPolicyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigApiMock {
  /**
  * The ID of the backend custom authorization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#authorizer_id ApigApi#authorizer_id}
  */
  readonly authorizerId?: string;
  /**
  * The response content of the mock.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#response ApigApi#response}
  */
  readonly response?: string;
  /**
  * The custom status code of the mock response.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#status_code ApigApi#status_code}
  */
  readonly statusCode?: number;
}

export function apigApiMockToTerraform(struct?: ApigApiMockOutputReference | ApigApiMock): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    authorizer_id: cdktf.stringToTerraform(struct!.authorizerId),
    response: cdktf.stringToTerraform(struct!.response),
    status_code: cdktf.numberToTerraform(struct!.statusCode),
  }
}


export function apigApiMockToHclTerraform(struct?: ApigApiMockOutputReference | ApigApiMock): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    authorizer_id: {
      value: cdktf.stringToHclTerraform(struct!.authorizerId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    response: {
      value: cdktf.stringToHclTerraform(struct!.response),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    status_code: {
      value: cdktf.numberToHclTerraform(struct!.statusCode),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiMockOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ApigApiMock | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authorizerId !== undefined) {
      hasAnyValues = true;
      internalValueResult.authorizerId = this._authorizerId;
    }
    if (this._response !== undefined) {
      hasAnyValues = true;
      internalValueResult.response = this._response;
    }
    if (this._statusCode !== undefined) {
      hasAnyValues = true;
      internalValueResult.statusCode = this._statusCode;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiMock | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._authorizerId = undefined;
      this._response = undefined;
      this._statusCode = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._authorizerId = value.authorizerId;
      this._response = value.response;
      this._statusCode = value.statusCode;
    }
  }

  // authorizer_id - computed: false, optional: true, required: false
  private _authorizerId?: string; 
  public get authorizerId() {
    return this.getStringAttribute('authorizer_id');
  }
  public set authorizerId(value: string) {
    this._authorizerId = value;
  }
  public resetAuthorizerId() {
    this._authorizerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authorizerIdInput() {
    return this._authorizerId;
  }

  // response - computed: false, optional: true, required: false
  private _response?: string; 
  public get response() {
    return this.getStringAttribute('response');
  }
  public set response(value: string) {
    this._response = value;
  }
  public resetResponse() {
    this._response = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get responseInput() {
    return this._response;
  }

  // status_code - computed: true, optional: true, required: false
  private _statusCode?: number; 
  public get statusCode() {
    return this.getNumberAttribute('status_code');
  }
  public set statusCode(value: number) {
    this._statusCode = value;
  }
  public resetStatusCode() {
    this._statusCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusCodeInput() {
    return this._statusCode;
  }
}
export interface ApigApiMockPolicyBackendParams {
  /**
  * The description of the parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#description ApigApi#description}
  */
  readonly description?: string;
  /**
  * Where the parameter is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#location ApigApi#location}
  */
  readonly location: string;
  /**
  * The parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#name ApigApi#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#system_param_type ApigApi#system_param_type}
  */
  readonly systemParamType?: string;
  /**
  * The parameter type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#type ApigApi#type}
  */
  readonly type: string;
  /**
  * The value of the parameter
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#value ApigApi#value}
  */
  readonly value: string;
}

export function apigApiMockPolicyBackendParamsToTerraform(struct?: ApigApiMockPolicyBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    location: cdktf.stringToTerraform(struct!.location),
    name: cdktf.stringToTerraform(struct!.name),
    system_param_type: cdktf.stringToTerraform(struct!.systemParamType),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function apigApiMockPolicyBackendParamsToHclTerraform(struct?: ApigApiMockPolicyBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    location: {
      value: cdktf.stringToHclTerraform(struct!.location),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    system_param_type: {
      value: cdktf.stringToHclTerraform(struct!.systemParamType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiMockPolicyBackendParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiMockPolicyBackendParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._location !== undefined) {
      hasAnyValues = true;
      internalValueResult.location = this._location;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._systemParamType !== undefined) {
      hasAnyValues = true;
      internalValueResult.systemParamType = this._systemParamType;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiMockPolicyBackendParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._location = undefined;
      this._name = undefined;
      this._systemParamType = undefined;
      this._type = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._description = value.description;
      this._location = value.location;
      this._name = value.name;
      this._systemParamType = value.systemParamType;
      this._type = value.type;
      this._value = value.value;
    }
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

  // location - computed: false, optional: false, required: true
  private _location?: string; 
  public get location() {
    return this.getStringAttribute('location');
  }
  public set location(value: string) {
    this._location = value;
  }
  // Temporarily expose input value. Use with caution.
  public get locationInput() {
    return this._location;
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

  // system_param_type - computed: false, optional: true, required: false
  private _systemParamType?: string; 
  public get systemParamType() {
    return this.getStringAttribute('system_param_type');
  }
  public set systemParamType(value: string) {
    this._systemParamType = value;
  }
  public resetSystemParamType() {
    this._systemParamType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get systemParamTypeInput() {
    return this._systemParamType;
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class ApigApiMockPolicyBackendParamsList extends cdktf.ComplexList {
  public internalValue? : ApigApiMockPolicyBackendParams[] | cdktf.IResolvable

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
  public get(index: number): ApigApiMockPolicyBackendParamsOutputReference {
    return new ApigApiMockPolicyBackendParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigApiMockPolicyConditions {
  /**
  * The cookie parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#cookie_name ApigApi#cookie_name}
  */
  readonly cookieName?: string;
  /**
  * The frontend authentication parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#frontend_authorizer_name ApigApi#frontend_authorizer_name}
  */
  readonly frontendAuthorizerName?: string;
  /**
  * The request parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#param_name ApigApi#param_name}
  */
  readonly paramName?: string;
  /**
  * The type of the backend policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#source ApigApi#source}
  */
  readonly source?: string;
  /**
  * The gateway built-in parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#sys_name ApigApi#sys_name}
  */
  readonly sysName?: string;
  /**
  * The condition type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#type ApigApi#type}
  */
  readonly type?: string;
  /**
  * The value of the backend policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#value ApigApi#value}
  */
  readonly value: string;
}

export function apigApiMockPolicyConditionsToTerraform(struct?: ApigApiMockPolicyConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cookie_name: cdktf.stringToTerraform(struct!.cookieName),
    frontend_authorizer_name: cdktf.stringToTerraform(struct!.frontendAuthorizerName),
    param_name: cdktf.stringToTerraform(struct!.paramName),
    source: cdktf.stringToTerraform(struct!.source),
    sys_name: cdktf.stringToTerraform(struct!.sysName),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function apigApiMockPolicyConditionsToHclTerraform(struct?: ApigApiMockPolicyConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cookie_name: {
      value: cdktf.stringToHclTerraform(struct!.cookieName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    frontend_authorizer_name: {
      value: cdktf.stringToHclTerraform(struct!.frontendAuthorizerName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    param_name: {
      value: cdktf.stringToHclTerraform(struct!.paramName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source: {
      value: cdktf.stringToHclTerraform(struct!.source),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sys_name: {
      value: cdktf.stringToHclTerraform(struct!.sysName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiMockPolicyConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiMockPolicyConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cookieName !== undefined) {
      hasAnyValues = true;
      internalValueResult.cookieName = this._cookieName;
    }
    if (this._frontendAuthorizerName !== undefined) {
      hasAnyValues = true;
      internalValueResult.frontendAuthorizerName = this._frontendAuthorizerName;
    }
    if (this._paramName !== undefined) {
      hasAnyValues = true;
      internalValueResult.paramName = this._paramName;
    }
    if (this._source !== undefined) {
      hasAnyValues = true;
      internalValueResult.source = this._source;
    }
    if (this._sysName !== undefined) {
      hasAnyValues = true;
      internalValueResult.sysName = this._sysName;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiMockPolicyConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._cookieName = undefined;
      this._frontendAuthorizerName = undefined;
      this._paramName = undefined;
      this._source = undefined;
      this._sysName = undefined;
      this._type = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._cookieName = value.cookieName;
      this._frontendAuthorizerName = value.frontendAuthorizerName;
      this._paramName = value.paramName;
      this._source = value.source;
      this._sysName = value.sysName;
      this._type = value.type;
      this._value = value.value;
    }
  }

  // cookie_name - computed: false, optional: true, required: false
  private _cookieName?: string; 
  public get cookieName() {
    return this.getStringAttribute('cookie_name');
  }
  public set cookieName(value: string) {
    this._cookieName = value;
  }
  public resetCookieName() {
    this._cookieName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cookieNameInput() {
    return this._cookieName;
  }

  // frontend_authorizer_name - computed: false, optional: true, required: false
  private _frontendAuthorizerName?: string; 
  public get frontendAuthorizerName() {
    return this.getStringAttribute('frontend_authorizer_name');
  }
  public set frontendAuthorizerName(value: string) {
    this._frontendAuthorizerName = value;
  }
  public resetFrontendAuthorizerName() {
    this._frontendAuthorizerName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get frontendAuthorizerNameInput() {
    return this._frontendAuthorizerName;
  }

  // param_name - computed: false, optional: true, required: false
  private _paramName?: string; 
  public get paramName() {
    return this.getStringAttribute('param_name');
  }
  public set paramName(value: string) {
    this._paramName = value;
  }
  public resetParamName() {
    this._paramName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get paramNameInput() {
    return this._paramName;
  }

  // source - computed: false, optional: true, required: false
  private _source?: string; 
  public get source() {
    return this.getStringAttribute('source');
  }
  public set source(value: string) {
    this._source = value;
  }
  public resetSource() {
    this._source = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceInput() {
    return this._source;
  }

  // sys_name - computed: false, optional: true, required: false
  private _sysName?: string; 
  public get sysName() {
    return this.getStringAttribute('sys_name');
  }
  public set sysName(value: string) {
    this._sysName = value;
  }
  public resetSysName() {
    this._sysName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sysNameInput() {
    return this._sysName;
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

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class ApigApiMockPolicyConditionsList extends cdktf.ComplexList {
  public internalValue? : ApigApiMockPolicyConditions[] | cdktf.IResolvable

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
  public get(index: number): ApigApiMockPolicyConditionsOutputReference {
    return new ApigApiMockPolicyConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigApiMockPolicy {
  /**
  * The ID of the backend custom authorization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#authorizer_id ApigApi#authorizer_id}
  */
  readonly authorizerId?: string;
  /**
  * The effective mode of the backend policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#effective_mode ApigApi#effective_mode}
  */
  readonly effectiveMode?: string;
  /**
  * The backend policy name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#name ApigApi#name}
  */
  readonly name: string;
  /**
  * The response content of the mock.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#response ApigApi#response}
  */
  readonly response?: string;
  /**
  * The custom status code of the mock response.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#status_code ApigApi#status_code}
  */
  readonly statusCode?: number;
  /**
  * backend_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#backend_params ApigApi#backend_params}
  */
  readonly backendParams?: ApigApiMockPolicyBackendParams[] | cdktf.IResolvable;
  /**
  * conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#conditions ApigApi#conditions}
  */
  readonly conditions: ApigApiMockPolicyConditions[] | cdktf.IResolvable;
}

export function apigApiMockPolicyToTerraform(struct?: ApigApiMockPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    authorizer_id: cdktf.stringToTerraform(struct!.authorizerId),
    effective_mode: cdktf.stringToTerraform(struct!.effectiveMode),
    name: cdktf.stringToTerraform(struct!.name),
    response: cdktf.stringToTerraform(struct!.response),
    status_code: cdktf.numberToTerraform(struct!.statusCode),
    backend_params: cdktf.listMapper(apigApiMockPolicyBackendParamsToTerraform, true)(struct!.backendParams),
    conditions: cdktf.listMapper(apigApiMockPolicyConditionsToTerraform, true)(struct!.conditions),
  }
}


export function apigApiMockPolicyToHclTerraform(struct?: ApigApiMockPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    authorizer_id: {
      value: cdktf.stringToHclTerraform(struct!.authorizerId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    effective_mode: {
      value: cdktf.stringToHclTerraform(struct!.effectiveMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    response: {
      value: cdktf.stringToHclTerraform(struct!.response),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    status_code: {
      value: cdktf.numberToHclTerraform(struct!.statusCode),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    backend_params: {
      value: cdktf.listMapperHcl(apigApiMockPolicyBackendParamsToHclTerraform, true)(struct!.backendParams),
      isBlock: true,
      type: "set",
      storageClassType: "ApigApiMockPolicyBackendParamsList",
    },
    conditions: {
      value: cdktf.listMapperHcl(apigApiMockPolicyConditionsToHclTerraform, true)(struct!.conditions),
      isBlock: true,
      type: "set",
      storageClassType: "ApigApiMockPolicyConditionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiMockPolicyOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiMockPolicy | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authorizerId !== undefined) {
      hasAnyValues = true;
      internalValueResult.authorizerId = this._authorizerId;
    }
    if (this._effectiveMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.effectiveMode = this._effectiveMode;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._response !== undefined) {
      hasAnyValues = true;
      internalValueResult.response = this._response;
    }
    if (this._statusCode !== undefined) {
      hasAnyValues = true;
      internalValueResult.statusCode = this._statusCode;
    }
    if (this._backendParams?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendParams = this._backendParams?.internalValue;
    }
    if (this._conditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.conditions = this._conditions?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiMockPolicy | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._authorizerId = undefined;
      this._effectiveMode = undefined;
      this._name = undefined;
      this._response = undefined;
      this._statusCode = undefined;
      this._backendParams.internalValue = undefined;
      this._conditions.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._authorizerId = value.authorizerId;
      this._effectiveMode = value.effectiveMode;
      this._name = value.name;
      this._response = value.response;
      this._statusCode = value.statusCode;
      this._backendParams.internalValue = value.backendParams;
      this._conditions.internalValue = value.conditions;
    }
  }

  // authorizer_id - computed: false, optional: true, required: false
  private _authorizerId?: string; 
  public get authorizerId() {
    return this.getStringAttribute('authorizer_id');
  }
  public set authorizerId(value: string) {
    this._authorizerId = value;
  }
  public resetAuthorizerId() {
    this._authorizerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authorizerIdInput() {
    return this._authorizerId;
  }

  // effective_mode - computed: false, optional: true, required: false
  private _effectiveMode?: string; 
  public get effectiveMode() {
    return this.getStringAttribute('effective_mode');
  }
  public set effectiveMode(value: string) {
    this._effectiveMode = value;
  }
  public resetEffectiveMode() {
    this._effectiveMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get effectiveModeInput() {
    return this._effectiveMode;
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

  // response - computed: false, optional: true, required: false
  private _response?: string; 
  public get response() {
    return this.getStringAttribute('response');
  }
  public set response(value: string) {
    this._response = value;
  }
  public resetResponse() {
    this._response = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get responseInput() {
    return this._response;
  }

  // status_code - computed: true, optional: true, required: false
  private _statusCode?: number; 
  public get statusCode() {
    return this.getNumberAttribute('status_code');
  }
  public set statusCode(value: number) {
    this._statusCode = value;
  }
  public resetStatusCode() {
    this._statusCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusCodeInput() {
    return this._statusCode;
  }

  // backend_params - computed: false, optional: true, required: false
  private _backendParams = new ApigApiMockPolicyBackendParamsList(this, "backend_params", true);
  public get backendParams() {
    return this._backendParams;
  }
  public putBackendParams(value: ApigApiMockPolicyBackendParams[] | cdktf.IResolvable) {
    this._backendParams.internalValue = value;
  }
  public resetBackendParams() {
    this._backendParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendParamsInput() {
    return this._backendParams.internalValue;
  }

  // conditions - computed: false, optional: false, required: true
  private _conditions = new ApigApiMockPolicyConditionsList(this, "conditions", true);
  public get conditions() {
    return this._conditions;
  }
  public putConditions(value: ApigApiMockPolicyConditions[] | cdktf.IResolvable) {
    this._conditions.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get conditionsInput() {
    return this._conditions.internalValue;
  }
}

export class ApigApiMockPolicyList extends cdktf.ComplexList {
  public internalValue? : ApigApiMockPolicy[] | cdktf.IResolvable

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
  public get(index: number): ApigApiMockPolicyOutputReference {
    return new ApigApiMockPolicyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigApiRequestParams {
  /**
  * The default value of the parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#default ApigApi#default}
  */
  readonly default?: string;
  /**
  * The parameter description.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#description ApigApi#description}
  */
  readonly description?: string;
  /**
  * The enumerated value.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#enumeration ApigApi#enumeration}
  */
  readonly enumeration?: string;
  /**
  * The parameter example.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#example ApigApi#example}
  */
  readonly example?: string;
  /**
  * Where this parameter is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#location ApigApi#location}
  */
  readonly location?: string;
  /**
  * The maximum value or length (string parameter) for parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#maximum ApigApi#maximum}
  */
  readonly maximum?: number;
  /**
  * The minimum value or length (string parameter) for parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#minimum ApigApi#minimum}
  */
  readonly minimum?: number;
  /**
  * The name of the request parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#name ApigApi#name}
  */
  readonly name: string;
  /**
  * Whether to transparently transfer the parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#passthrough ApigApi#passthrough}
  */
  readonly passthrough?: boolean | cdktf.IResolvable;
  /**
  * Whether this parameter is required.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#required ApigApi#required}
  */
  readonly required?: boolean | cdktf.IResolvable;
  /**
  * The parameter type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#type ApigApi#type}
  */
  readonly type?: string;
  /**
  * Whether to enable the parameter validation.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#valid_enable ApigApi#valid_enable}
  */
  readonly validEnable?: number;
}

export function apigApiRequestParamsToTerraform(struct?: ApigApiRequestParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    default: cdktf.stringToTerraform(struct!.default),
    description: cdktf.stringToTerraform(struct!.description),
    enumeration: cdktf.stringToTerraform(struct!.enumeration),
    example: cdktf.stringToTerraform(struct!.example),
    location: cdktf.stringToTerraform(struct!.location),
    maximum: cdktf.numberToTerraform(struct!.maximum),
    minimum: cdktf.numberToTerraform(struct!.minimum),
    name: cdktf.stringToTerraform(struct!.name),
    passthrough: cdktf.booleanToTerraform(struct!.passthrough),
    required: cdktf.booleanToTerraform(struct!.required),
    type: cdktf.stringToTerraform(struct!.type),
    valid_enable: cdktf.numberToTerraform(struct!.validEnable),
  }
}


export function apigApiRequestParamsToHclTerraform(struct?: ApigApiRequestParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    default: {
      value: cdktf.stringToHclTerraform(struct!.default),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    enumeration: {
      value: cdktf.stringToHclTerraform(struct!.enumeration),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    example: {
      value: cdktf.stringToHclTerraform(struct!.example),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    location: {
      value: cdktf.stringToHclTerraform(struct!.location),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    maximum: {
      value: cdktf.numberToHclTerraform(struct!.maximum),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    minimum: {
      value: cdktf.numberToHclTerraform(struct!.minimum),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    passthrough: {
      value: cdktf.booleanToHclTerraform(struct!.passthrough),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    required: {
      value: cdktf.booleanToHclTerraform(struct!.required),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    valid_enable: {
      value: cdktf.numberToHclTerraform(struct!.validEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiRequestParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiRequestParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._default !== undefined) {
      hasAnyValues = true;
      internalValueResult.default = this._default;
    }
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._enumeration !== undefined) {
      hasAnyValues = true;
      internalValueResult.enumeration = this._enumeration;
    }
    if (this._example !== undefined) {
      hasAnyValues = true;
      internalValueResult.example = this._example;
    }
    if (this._location !== undefined) {
      hasAnyValues = true;
      internalValueResult.location = this._location;
    }
    if (this._maximum !== undefined) {
      hasAnyValues = true;
      internalValueResult.maximum = this._maximum;
    }
    if (this._minimum !== undefined) {
      hasAnyValues = true;
      internalValueResult.minimum = this._minimum;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._passthrough !== undefined) {
      hasAnyValues = true;
      internalValueResult.passthrough = this._passthrough;
    }
    if (this._required !== undefined) {
      hasAnyValues = true;
      internalValueResult.required = this._required;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._validEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.validEnable = this._validEnable;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiRequestParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._default = undefined;
      this._description = undefined;
      this._enumeration = undefined;
      this._example = undefined;
      this._location = undefined;
      this._maximum = undefined;
      this._minimum = undefined;
      this._name = undefined;
      this._passthrough = undefined;
      this._required = undefined;
      this._type = undefined;
      this._validEnable = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._default = value.default;
      this._description = value.description;
      this._enumeration = value.enumeration;
      this._example = value.example;
      this._location = value.location;
      this._maximum = value.maximum;
      this._minimum = value.minimum;
      this._name = value.name;
      this._passthrough = value.passthrough;
      this._required = value.required;
      this._type = value.type;
      this._validEnable = value.validEnable;
    }
  }

  // default - computed: true, optional: true, required: false
  private _default?: string; 
  public get default() {
    return this.getStringAttribute('default');
  }
  public set default(value: string) {
    this._default = value;
  }
  public resetDefault() {
    this._default = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultInput() {
    return this._default;
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

  // enumeration - computed: true, optional: true, required: false
  private _enumeration?: string; 
  public get enumeration() {
    return this.getStringAttribute('enumeration');
  }
  public set enumeration(value: string) {
    this._enumeration = value;
  }
  public resetEnumeration() {
    this._enumeration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enumerationInput() {
    return this._enumeration;
  }

  // example - computed: true, optional: true, required: false
  private _example?: string; 
  public get example() {
    return this.getStringAttribute('example');
  }
  public set example(value: string) {
    this._example = value;
  }
  public resetExample() {
    this._example = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get exampleInput() {
    return this._example;
  }

  // location - computed: false, optional: true, required: false
  private _location?: string; 
  public get location() {
    return this.getStringAttribute('location');
  }
  public set location(value: string) {
    this._location = value;
  }
  public resetLocation() {
    this._location = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get locationInput() {
    return this._location;
  }

  // maximum - computed: true, optional: true, required: false
  private _maximum?: number; 
  public get maximum() {
    return this.getNumberAttribute('maximum');
  }
  public set maximum(value: number) {
    this._maximum = value;
  }
  public resetMaximum() {
    this._maximum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maximumInput() {
    return this._maximum;
  }

  // minimum - computed: true, optional: true, required: false
  private _minimum?: number; 
  public get minimum() {
    return this.getNumberAttribute('minimum');
  }
  public set minimum(value: number) {
    this._minimum = value;
  }
  public resetMinimum() {
    this._minimum = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get minimumInput() {
    return this._minimum;
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

  // passthrough - computed: true, optional: true, required: false
  private _passthrough?: boolean | cdktf.IResolvable; 
  public get passthrough() {
    return this.getBooleanAttribute('passthrough');
  }
  public set passthrough(value: boolean | cdktf.IResolvable) {
    this._passthrough = value;
  }
  public resetPassthrough() {
    this._passthrough = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passthroughInput() {
    return this._passthrough;
  }

  // required - computed: true, optional: true, required: false
  private _required?: boolean | cdktf.IResolvable; 
  public get required() {
    return this.getBooleanAttribute('required');
  }
  public set required(value: boolean | cdktf.IResolvable) {
    this._required = value;
  }
  public resetRequired() {
    this._required = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requiredInput() {
    return this._required;
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

  // valid_enable - computed: true, optional: true, required: false
  private _validEnable?: number; 
  public get validEnable() {
    return this.getNumberAttribute('valid_enable');
  }
  public set validEnable(value: number) {
    this._validEnable = value;
  }
  public resetValidEnable() {
    this._validEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get validEnableInput() {
    return this._validEnable;
  }
}

export class ApigApiRequestParamsList extends cdktf.ComplexList {
  public internalValue? : ApigApiRequestParams[] | cdktf.IResolvable

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
  public get(index: number): ApigApiRequestParamsOutputReference {
    return new ApigApiRequestParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigApiWeb {
  /**
  * The ID of the backend custom authorization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#authorizer_id ApigApi#authorizer_id}
  */
  readonly authorizerId?: string;
  /**
  * The backend service address, which consists of a domain name or IP address, and a port number.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#backend_address ApigApi#backend_address}
  */
  readonly backendAddress?: string;
  /**
  * The proxy host header.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#host_header ApigApi#host_header}
  */
  readonly hostHeader?: string;
  /**
  * The backend request path.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#path ApigApi#path}
  */
  readonly path: string;
  /**
  * The backend request method of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#request_method ApigApi#request_method}
  */
  readonly requestMethod?: string;
  /**
  * The web protocol type of the API request.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#request_protocol ApigApi#request_protocol}
  */
  readonly requestProtocol?: string;
  /**
  * The number of retry attempts to request the backend service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#retry_count ApigApi#retry_count}
  */
  readonly retryCount?: number;
  /**
  * Whether to enable two-way authentication.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#ssl_enable ApigApi#ssl_enable}
  */
  readonly sslEnable?: boolean | cdktf.IResolvable;
  /**
  * The timeout for API requests to backend service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#timeout ApigApi#timeout}
  */
  readonly timeout?: number;
  /**
  * The VPC channel ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#vpc_channel_id ApigApi#vpc_channel_id}
  */
  readonly vpcChannelId?: string;
}

export function apigApiWebToTerraform(struct?: ApigApiWebOutputReference | ApigApiWeb): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    authorizer_id: cdktf.stringToTerraform(struct!.authorizerId),
    backend_address: cdktf.stringToTerraform(struct!.backendAddress),
    host_header: cdktf.stringToTerraform(struct!.hostHeader),
    path: cdktf.stringToTerraform(struct!.path),
    request_method: cdktf.stringToTerraform(struct!.requestMethod),
    request_protocol: cdktf.stringToTerraform(struct!.requestProtocol),
    retry_count: cdktf.numberToTerraform(struct!.retryCount),
    ssl_enable: cdktf.booleanToTerraform(struct!.sslEnable),
    timeout: cdktf.numberToTerraform(struct!.timeout),
    vpc_channel_id: cdktf.stringToTerraform(struct!.vpcChannelId),
  }
}


export function apigApiWebToHclTerraform(struct?: ApigApiWebOutputReference | ApigApiWeb): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    authorizer_id: {
      value: cdktf.stringToHclTerraform(struct!.authorizerId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    backend_address: {
      value: cdktf.stringToHclTerraform(struct!.backendAddress),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    host_header: {
      value: cdktf.stringToHclTerraform(struct!.hostHeader),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    path: {
      value: cdktf.stringToHclTerraform(struct!.path),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    request_method: {
      value: cdktf.stringToHclTerraform(struct!.requestMethod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    request_protocol: {
      value: cdktf.stringToHclTerraform(struct!.requestProtocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    retry_count: {
      value: cdktf.numberToHclTerraform(struct!.retryCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    ssl_enable: {
      value: cdktf.booleanToHclTerraform(struct!.sslEnable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    timeout: {
      value: cdktf.numberToHclTerraform(struct!.timeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    vpc_channel_id: {
      value: cdktf.stringToHclTerraform(struct!.vpcChannelId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiWebOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ApigApiWeb | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authorizerId !== undefined) {
      hasAnyValues = true;
      internalValueResult.authorizerId = this._authorizerId;
    }
    if (this._backendAddress !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendAddress = this._backendAddress;
    }
    if (this._hostHeader !== undefined) {
      hasAnyValues = true;
      internalValueResult.hostHeader = this._hostHeader;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._requestMethod !== undefined) {
      hasAnyValues = true;
      internalValueResult.requestMethod = this._requestMethod;
    }
    if (this._requestProtocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.requestProtocol = this._requestProtocol;
    }
    if (this._retryCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.retryCount = this._retryCount;
    }
    if (this._sslEnable !== undefined) {
      hasAnyValues = true;
      internalValueResult.sslEnable = this._sslEnable;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    if (this._vpcChannelId !== undefined) {
      hasAnyValues = true;
      internalValueResult.vpcChannelId = this._vpcChannelId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiWeb | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._authorizerId = undefined;
      this._backendAddress = undefined;
      this._hostHeader = undefined;
      this._path = undefined;
      this._requestMethod = undefined;
      this._requestProtocol = undefined;
      this._retryCount = undefined;
      this._sslEnable = undefined;
      this._timeout = undefined;
      this._vpcChannelId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._authorizerId = value.authorizerId;
      this._backendAddress = value.backendAddress;
      this._hostHeader = value.hostHeader;
      this._path = value.path;
      this._requestMethod = value.requestMethod;
      this._requestProtocol = value.requestProtocol;
      this._retryCount = value.retryCount;
      this._sslEnable = value.sslEnable;
      this._timeout = value.timeout;
      this._vpcChannelId = value.vpcChannelId;
    }
  }

  // authorizer_id - computed: false, optional: true, required: false
  private _authorizerId?: string; 
  public get authorizerId() {
    return this.getStringAttribute('authorizer_id');
  }
  public set authorizerId(value: string) {
    this._authorizerId = value;
  }
  public resetAuthorizerId() {
    this._authorizerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authorizerIdInput() {
    return this._authorizerId;
  }

  // backend_address - computed: false, optional: true, required: false
  private _backendAddress?: string; 
  public get backendAddress() {
    return this.getStringAttribute('backend_address');
  }
  public set backendAddress(value: string) {
    this._backendAddress = value;
  }
  public resetBackendAddress() {
    this._backendAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendAddressInput() {
    return this._backendAddress;
  }

  // host_header - computed: false, optional: true, required: false
  private _hostHeader?: string; 
  public get hostHeader() {
    return this.getStringAttribute('host_header');
  }
  public set hostHeader(value: string) {
    this._hostHeader = value;
  }
  public resetHostHeader() {
    this._hostHeader = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostHeaderInput() {
    return this._hostHeader;
  }

  // path - computed: false, optional: false, required: true
  private _path?: string; 
  public get path() {
    return this.getStringAttribute('path');
  }
  public set path(value: string) {
    this._path = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pathInput() {
    return this._path;
  }

  // request_method - computed: false, optional: true, required: false
  private _requestMethod?: string; 
  public get requestMethod() {
    return this.getStringAttribute('request_method');
  }
  public set requestMethod(value: string) {
    this._requestMethod = value;
  }
  public resetRequestMethod() {
    this._requestMethod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestMethodInput() {
    return this._requestMethod;
  }

  // request_protocol - computed: false, optional: true, required: false
  private _requestProtocol?: string; 
  public get requestProtocol() {
    return this.getStringAttribute('request_protocol');
  }
  public set requestProtocol(value: string) {
    this._requestProtocol = value;
  }
  public resetRequestProtocol() {
    this._requestProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestProtocolInput() {
    return this._requestProtocol;
  }

  // retry_count - computed: false, optional: true, required: false
  private _retryCount?: number; 
  public get retryCount() {
    return this.getNumberAttribute('retry_count');
  }
  public set retryCount(value: number) {
    this._retryCount = value;
  }
  public resetRetryCount() {
    this._retryCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retryCountInput() {
    return this._retryCount;
  }

  // ssl_enable - computed: false, optional: true, required: false
  private _sslEnable?: boolean | cdktf.IResolvable; 
  public get sslEnable() {
    return this.getBooleanAttribute('ssl_enable');
  }
  public set sslEnable(value: boolean | cdktf.IResolvable) {
    this._sslEnable = value;
  }
  public resetSslEnable() {
    this._sslEnable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslEnableInput() {
    return this._sslEnable;
  }

  // timeout - computed: false, optional: true, required: false
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  public resetTimeout() {
    this._timeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }

  // vpc_channel_id - computed: false, optional: true, required: false
  private _vpcChannelId?: string; 
  public get vpcChannelId() {
    return this.getStringAttribute('vpc_channel_id');
  }
  public set vpcChannelId(value: string) {
    this._vpcChannelId = value;
  }
  public resetVpcChannelId() {
    this._vpcChannelId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcChannelIdInput() {
    return this._vpcChannelId;
  }
}
export interface ApigApiWebPolicyBackendParams {
  /**
  * The description of the parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#description ApigApi#description}
  */
  readonly description?: string;
  /**
  * Where the parameter is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#location ApigApi#location}
  */
  readonly location: string;
  /**
  * The parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#name ApigApi#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#system_param_type ApigApi#system_param_type}
  */
  readonly systemParamType?: string;
  /**
  * The parameter type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#type ApigApi#type}
  */
  readonly type: string;
  /**
  * The value of the parameter
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#value ApigApi#value}
  */
  readonly value: string;
}

export function apigApiWebPolicyBackendParamsToTerraform(struct?: ApigApiWebPolicyBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    location: cdktf.stringToTerraform(struct!.location),
    name: cdktf.stringToTerraform(struct!.name),
    system_param_type: cdktf.stringToTerraform(struct!.systemParamType),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function apigApiWebPolicyBackendParamsToHclTerraform(struct?: ApigApiWebPolicyBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    location: {
      value: cdktf.stringToHclTerraform(struct!.location),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    system_param_type: {
      value: cdktf.stringToHclTerraform(struct!.systemParamType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiWebPolicyBackendParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiWebPolicyBackendParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._location !== undefined) {
      hasAnyValues = true;
      internalValueResult.location = this._location;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._systemParamType !== undefined) {
      hasAnyValues = true;
      internalValueResult.systemParamType = this._systemParamType;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiWebPolicyBackendParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._location = undefined;
      this._name = undefined;
      this._systemParamType = undefined;
      this._type = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._description = value.description;
      this._location = value.location;
      this._name = value.name;
      this._systemParamType = value.systemParamType;
      this._type = value.type;
      this._value = value.value;
    }
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

  // location - computed: false, optional: false, required: true
  private _location?: string; 
  public get location() {
    return this.getStringAttribute('location');
  }
  public set location(value: string) {
    this._location = value;
  }
  // Temporarily expose input value. Use with caution.
  public get locationInput() {
    return this._location;
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

  // system_param_type - computed: false, optional: true, required: false
  private _systemParamType?: string; 
  public get systemParamType() {
    return this.getStringAttribute('system_param_type');
  }
  public set systemParamType(value: string) {
    this._systemParamType = value;
  }
  public resetSystemParamType() {
    this._systemParamType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get systemParamTypeInput() {
    return this._systemParamType;
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class ApigApiWebPolicyBackendParamsList extends cdktf.ComplexList {
  public internalValue? : ApigApiWebPolicyBackendParams[] | cdktf.IResolvable

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
  public get(index: number): ApigApiWebPolicyBackendParamsOutputReference {
    return new ApigApiWebPolicyBackendParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigApiWebPolicyConditions {
  /**
  * The cookie parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#cookie_name ApigApi#cookie_name}
  */
  readonly cookieName?: string;
  /**
  * The frontend authentication parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#frontend_authorizer_name ApigApi#frontend_authorizer_name}
  */
  readonly frontendAuthorizerName?: string;
  /**
  * The request parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#param_name ApigApi#param_name}
  */
  readonly paramName?: string;
  /**
  * The type of the backend policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#source ApigApi#source}
  */
  readonly source?: string;
  /**
  * The gateway built-in parameter name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#sys_name ApigApi#sys_name}
  */
  readonly sysName?: string;
  /**
  * The condition type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#type ApigApi#type}
  */
  readonly type?: string;
  /**
  * The value of the backend policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#value ApigApi#value}
  */
  readonly value: string;
}

export function apigApiWebPolicyConditionsToTerraform(struct?: ApigApiWebPolicyConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cookie_name: cdktf.stringToTerraform(struct!.cookieName),
    frontend_authorizer_name: cdktf.stringToTerraform(struct!.frontendAuthorizerName),
    param_name: cdktf.stringToTerraform(struct!.paramName),
    source: cdktf.stringToTerraform(struct!.source),
    sys_name: cdktf.stringToTerraform(struct!.sysName),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function apigApiWebPolicyConditionsToHclTerraform(struct?: ApigApiWebPolicyConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cookie_name: {
      value: cdktf.stringToHclTerraform(struct!.cookieName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    frontend_authorizer_name: {
      value: cdktf.stringToHclTerraform(struct!.frontendAuthorizerName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    param_name: {
      value: cdktf.stringToHclTerraform(struct!.paramName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source: {
      value: cdktf.stringToHclTerraform(struct!.source),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sys_name: {
      value: cdktf.stringToHclTerraform(struct!.sysName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiWebPolicyConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiWebPolicyConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cookieName !== undefined) {
      hasAnyValues = true;
      internalValueResult.cookieName = this._cookieName;
    }
    if (this._frontendAuthorizerName !== undefined) {
      hasAnyValues = true;
      internalValueResult.frontendAuthorizerName = this._frontendAuthorizerName;
    }
    if (this._paramName !== undefined) {
      hasAnyValues = true;
      internalValueResult.paramName = this._paramName;
    }
    if (this._source !== undefined) {
      hasAnyValues = true;
      internalValueResult.source = this._source;
    }
    if (this._sysName !== undefined) {
      hasAnyValues = true;
      internalValueResult.sysName = this._sysName;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiWebPolicyConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._cookieName = undefined;
      this._frontendAuthorizerName = undefined;
      this._paramName = undefined;
      this._source = undefined;
      this._sysName = undefined;
      this._type = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._cookieName = value.cookieName;
      this._frontendAuthorizerName = value.frontendAuthorizerName;
      this._paramName = value.paramName;
      this._source = value.source;
      this._sysName = value.sysName;
      this._type = value.type;
      this._value = value.value;
    }
  }

  // cookie_name - computed: false, optional: true, required: false
  private _cookieName?: string; 
  public get cookieName() {
    return this.getStringAttribute('cookie_name');
  }
  public set cookieName(value: string) {
    this._cookieName = value;
  }
  public resetCookieName() {
    this._cookieName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cookieNameInput() {
    return this._cookieName;
  }

  // frontend_authorizer_name - computed: false, optional: true, required: false
  private _frontendAuthorizerName?: string; 
  public get frontendAuthorizerName() {
    return this.getStringAttribute('frontend_authorizer_name');
  }
  public set frontendAuthorizerName(value: string) {
    this._frontendAuthorizerName = value;
  }
  public resetFrontendAuthorizerName() {
    this._frontendAuthorizerName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get frontendAuthorizerNameInput() {
    return this._frontendAuthorizerName;
  }

  // param_name - computed: false, optional: true, required: false
  private _paramName?: string; 
  public get paramName() {
    return this.getStringAttribute('param_name');
  }
  public set paramName(value: string) {
    this._paramName = value;
  }
  public resetParamName() {
    this._paramName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get paramNameInput() {
    return this._paramName;
  }

  // source - computed: false, optional: true, required: false
  private _source?: string; 
  public get source() {
    return this.getStringAttribute('source');
  }
  public set source(value: string) {
    this._source = value;
  }
  public resetSource() {
    this._source = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceInput() {
    return this._source;
  }

  // sys_name - computed: false, optional: true, required: false
  private _sysName?: string; 
  public get sysName() {
    return this.getStringAttribute('sys_name');
  }
  public set sysName(value: string) {
    this._sysName = value;
  }
  public resetSysName() {
    this._sysName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sysNameInput() {
    return this._sysName;
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

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class ApigApiWebPolicyConditionsList extends cdktf.ComplexList {
  public internalValue? : ApigApiWebPolicyConditions[] | cdktf.IResolvable

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
  public get(index: number): ApigApiWebPolicyConditionsOutputReference {
    return new ApigApiWebPolicyConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ApigApiWebPolicy {
  /**
  * The ID of the backend custom authorization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#authorizer_id ApigApi#authorizer_id}
  */
  readonly authorizerId?: string;
  /**
  * The backend service address
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#backend_address ApigApi#backend_address}
  */
  readonly backendAddress?: string;
  /**
  * The effective mode of the backend policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#effective_mode ApigApi#effective_mode}
  */
  readonly effectiveMode?: string;
  /**
  * The proxy host header.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#host_header ApigApi#host_header}
  */
  readonly hostHeader?: string;
  /**
  * The name of the web policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#name ApigApi#name}
  */
  readonly name: string;
  /**
  * The backend request address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#path ApigApi#path}
  */
  readonly path: string;
  /**
  * The backend request method of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#request_method ApigApi#request_method}
  */
  readonly requestMethod: string;
  /**
  * The backend request protocol.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#request_protocol ApigApi#request_protocol}
  */
  readonly requestProtocol?: string;
  /**
  * The number of retry attempts to request the backend service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#retry_count ApigApi#retry_count}
  */
  readonly retryCount?: number;
  /**
  * The timeout for API requests to backend service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#timeout ApigApi#timeout}
  */
  readonly timeout?: number;
  /**
  * The VPC channel ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#vpc_channel_id ApigApi#vpc_channel_id}
  */
  readonly vpcChannelId?: string;
  /**
  * backend_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#backend_params ApigApi#backend_params}
  */
  readonly backendParams?: ApigApiWebPolicyBackendParams[] | cdktf.IResolvable;
  /**
  * conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#conditions ApigApi#conditions}
  */
  readonly conditions: ApigApiWebPolicyConditions[] | cdktf.IResolvable;
}

export function apigApiWebPolicyToTerraform(struct?: ApigApiWebPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    authorizer_id: cdktf.stringToTerraform(struct!.authorizerId),
    backend_address: cdktf.stringToTerraform(struct!.backendAddress),
    effective_mode: cdktf.stringToTerraform(struct!.effectiveMode),
    host_header: cdktf.stringToTerraform(struct!.hostHeader),
    name: cdktf.stringToTerraform(struct!.name),
    path: cdktf.stringToTerraform(struct!.path),
    request_method: cdktf.stringToTerraform(struct!.requestMethod),
    request_protocol: cdktf.stringToTerraform(struct!.requestProtocol),
    retry_count: cdktf.numberToTerraform(struct!.retryCount),
    timeout: cdktf.numberToTerraform(struct!.timeout),
    vpc_channel_id: cdktf.stringToTerraform(struct!.vpcChannelId),
    backend_params: cdktf.listMapper(apigApiWebPolicyBackendParamsToTerraform, true)(struct!.backendParams),
    conditions: cdktf.listMapper(apigApiWebPolicyConditionsToTerraform, true)(struct!.conditions),
  }
}


export function apigApiWebPolicyToHclTerraform(struct?: ApigApiWebPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    authorizer_id: {
      value: cdktf.stringToHclTerraform(struct!.authorizerId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    backend_address: {
      value: cdktf.stringToHclTerraform(struct!.backendAddress),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    effective_mode: {
      value: cdktf.stringToHclTerraform(struct!.effectiveMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    host_header: {
      value: cdktf.stringToHclTerraform(struct!.hostHeader),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    path: {
      value: cdktf.stringToHclTerraform(struct!.path),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    request_method: {
      value: cdktf.stringToHclTerraform(struct!.requestMethod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    request_protocol: {
      value: cdktf.stringToHclTerraform(struct!.requestProtocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    retry_count: {
      value: cdktf.numberToHclTerraform(struct!.retryCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    timeout: {
      value: cdktf.numberToHclTerraform(struct!.timeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    vpc_channel_id: {
      value: cdktf.stringToHclTerraform(struct!.vpcChannelId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    backend_params: {
      value: cdktf.listMapperHcl(apigApiWebPolicyBackendParamsToHclTerraform, true)(struct!.backendParams),
      isBlock: true,
      type: "set",
      storageClassType: "ApigApiWebPolicyBackendParamsList",
    },
    conditions: {
      value: cdktf.listMapperHcl(apigApiWebPolicyConditionsToHclTerraform, true)(struct!.conditions),
      isBlock: true,
      type: "set",
      storageClassType: "ApigApiWebPolicyConditionsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigApiWebPolicyOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigApiWebPolicy | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authorizerId !== undefined) {
      hasAnyValues = true;
      internalValueResult.authorizerId = this._authorizerId;
    }
    if (this._backendAddress !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendAddress = this._backendAddress;
    }
    if (this._effectiveMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.effectiveMode = this._effectiveMode;
    }
    if (this._hostHeader !== undefined) {
      hasAnyValues = true;
      internalValueResult.hostHeader = this._hostHeader;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._requestMethod !== undefined) {
      hasAnyValues = true;
      internalValueResult.requestMethod = this._requestMethod;
    }
    if (this._requestProtocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.requestProtocol = this._requestProtocol;
    }
    if (this._retryCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.retryCount = this._retryCount;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    if (this._vpcChannelId !== undefined) {
      hasAnyValues = true;
      internalValueResult.vpcChannelId = this._vpcChannelId;
    }
    if (this._backendParams?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendParams = this._backendParams?.internalValue;
    }
    if (this._conditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.conditions = this._conditions?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigApiWebPolicy | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._authorizerId = undefined;
      this._backendAddress = undefined;
      this._effectiveMode = undefined;
      this._hostHeader = undefined;
      this._name = undefined;
      this._path = undefined;
      this._requestMethod = undefined;
      this._requestProtocol = undefined;
      this._retryCount = undefined;
      this._timeout = undefined;
      this._vpcChannelId = undefined;
      this._backendParams.internalValue = undefined;
      this._conditions.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._authorizerId = value.authorizerId;
      this._backendAddress = value.backendAddress;
      this._effectiveMode = value.effectiveMode;
      this._hostHeader = value.hostHeader;
      this._name = value.name;
      this._path = value.path;
      this._requestMethod = value.requestMethod;
      this._requestProtocol = value.requestProtocol;
      this._retryCount = value.retryCount;
      this._timeout = value.timeout;
      this._vpcChannelId = value.vpcChannelId;
      this._backendParams.internalValue = value.backendParams;
      this._conditions.internalValue = value.conditions;
    }
  }

  // authorizer_id - computed: false, optional: true, required: false
  private _authorizerId?: string; 
  public get authorizerId() {
    return this.getStringAttribute('authorizer_id');
  }
  public set authorizerId(value: string) {
    this._authorizerId = value;
  }
  public resetAuthorizerId() {
    this._authorizerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authorizerIdInput() {
    return this._authorizerId;
  }

  // backend_address - computed: false, optional: true, required: false
  private _backendAddress?: string; 
  public get backendAddress() {
    return this.getStringAttribute('backend_address');
  }
  public set backendAddress(value: string) {
    this._backendAddress = value;
  }
  public resetBackendAddress() {
    this._backendAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendAddressInput() {
    return this._backendAddress;
  }

  // effective_mode - computed: false, optional: true, required: false
  private _effectiveMode?: string; 
  public get effectiveMode() {
    return this.getStringAttribute('effective_mode');
  }
  public set effectiveMode(value: string) {
    this._effectiveMode = value;
  }
  public resetEffectiveMode() {
    this._effectiveMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get effectiveModeInput() {
    return this._effectiveMode;
  }

  // host_header - computed: false, optional: true, required: false
  private _hostHeader?: string; 
  public get hostHeader() {
    return this.getStringAttribute('host_header');
  }
  public set hostHeader(value: string) {
    this._hostHeader = value;
  }
  public resetHostHeader() {
    this._hostHeader = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostHeaderInput() {
    return this._hostHeader;
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

  // path - computed: false, optional: false, required: true
  private _path?: string; 
  public get path() {
    return this.getStringAttribute('path');
  }
  public set path(value: string) {
    this._path = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pathInput() {
    return this._path;
  }

  // request_method - computed: false, optional: false, required: true
  private _requestMethod?: string; 
  public get requestMethod() {
    return this.getStringAttribute('request_method');
  }
  public set requestMethod(value: string) {
    this._requestMethod = value;
  }
  // Temporarily expose input value. Use with caution.
  public get requestMethodInput() {
    return this._requestMethod;
  }

  // request_protocol - computed: false, optional: true, required: false
  private _requestProtocol?: string; 
  public get requestProtocol() {
    return this.getStringAttribute('request_protocol');
  }
  public set requestProtocol(value: string) {
    this._requestProtocol = value;
  }
  public resetRequestProtocol() {
    this._requestProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestProtocolInput() {
    return this._requestProtocol;
  }

  // retry_count - computed: false, optional: true, required: false
  private _retryCount?: number; 
  public get retryCount() {
    return this.getNumberAttribute('retry_count');
  }
  public set retryCount(value: number) {
    this._retryCount = value;
  }
  public resetRetryCount() {
    this._retryCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retryCountInput() {
    return this._retryCount;
  }

  // timeout - computed: false, optional: true, required: false
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  public resetTimeout() {
    this._timeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }

  // vpc_channel_id - computed: false, optional: true, required: false
  private _vpcChannelId?: string; 
  public get vpcChannelId() {
    return this.getStringAttribute('vpc_channel_id');
  }
  public set vpcChannelId(value: string) {
    this._vpcChannelId = value;
  }
  public resetVpcChannelId() {
    this._vpcChannelId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcChannelIdInput() {
    return this._vpcChannelId;
  }

  // backend_params - computed: false, optional: true, required: false
  private _backendParams = new ApigApiWebPolicyBackendParamsList(this, "backend_params", true);
  public get backendParams() {
    return this._backendParams;
  }
  public putBackendParams(value: ApigApiWebPolicyBackendParams[] | cdktf.IResolvable) {
    this._backendParams.internalValue = value;
  }
  public resetBackendParams() {
    this._backendParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendParamsInput() {
    return this._backendParams.internalValue;
  }

  // conditions - computed: false, optional: false, required: true
  private _conditions = new ApigApiWebPolicyConditionsList(this, "conditions", true);
  public get conditions() {
    return this._conditions;
  }
  public putConditions(value: ApigApiWebPolicyConditions[] | cdktf.IResolvable) {
    this._conditions.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get conditionsInput() {
    return this._conditions.internalValue;
  }
}

export class ApigApiWebPolicyList extends cdktf.ComplexList {
  public internalValue? : ApigApiWebPolicy[] | cdktf.IResolvable

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
  public get(index: number): ApigApiWebPolicyOutputReference {
    return new ApigApiWebPolicyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api huaweicloud_apig_api}
*/
export class ApigApi extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_apig_api";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ApigApi resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ApigApi to import
  * @param importFromId The id of the existing ApigApi that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ApigApi to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_apig_api", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_api huaweicloud_apig_api} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ApigApiConfig
  */
  public constructor(scope: Construct, id: string, config: ApigApiConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_apig_api',
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
    this._authorizerId = config.authorizerId;
    this._bodyDescription = config.bodyDescription;
    this._cors = config.cors;
    this._description = config.description;
    this._failureResponse = config.failureResponse;
    this._groupId = config.groupId;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._matching = config.matching;
    this._name = config.name;
    this._region = config.region;
    this._requestMethod = config.requestMethod;
    this._requestPath = config.requestPath;
    this._requestProtocol = config.requestProtocol;
    this._responseId = config.responseId;
    this._securityAuthentication = config.securityAuthentication;
    this._simpleAuthentication = config.simpleAuthentication;
    this._successResponse = config.successResponse;
    this._tags = config.tags;
    this._type = config.type;
    this._backendParams.internalValue = config.backendParams;
    this._funcGraph.internalValue = config.funcGraph;
    this._funcGraphPolicy.internalValue = config.funcGraphPolicy;
    this._mock.internalValue = config.mock;
    this._mockPolicy.internalValue = config.mockPolicy;
    this._requestParams.internalValue = config.requestParams;
    this._web.internalValue = config.web;
    this._webPolicy.internalValue = config.webPolicy;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // authorizer_id - computed: false, optional: true, required: false
  private _authorizerId?: string; 
  public get authorizerId() {
    return this.getStringAttribute('authorizer_id');
  }
  public set authorizerId(value: string) {
    this._authorizerId = value;
  }
  public resetAuthorizerId() {
    this._authorizerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authorizerIdInput() {
    return this._authorizerId;
  }

  // body_description - computed: false, optional: true, required: false
  private _bodyDescription?: string; 
  public get bodyDescription() {
    return this.getStringAttribute('body_description');
  }
  public set bodyDescription(value: string) {
    this._bodyDescription = value;
  }
  public resetBodyDescription() {
    this._bodyDescription = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bodyDescriptionInput() {
    return this._bodyDescription;
  }

  // cors - computed: false, optional: true, required: false
  private _cors?: boolean | cdktf.IResolvable; 
  public get cors() {
    return this.getBooleanAttribute('cors');
  }
  public set cors(value: boolean | cdktf.IResolvable) {
    this._cors = value;
  }
  public resetCors() {
    this._cors = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get corsInput() {
    return this._cors;
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

  // failure_response - computed: false, optional: true, required: false
  private _failureResponse?: string; 
  public get failureResponse() {
    return this.getStringAttribute('failure_response');
  }
  public set failureResponse(value: string) {
    this._failureResponse = value;
  }
  public resetFailureResponse() {
    this._failureResponse = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get failureResponseInput() {
    return this._failureResponse;
  }

  // group_id - computed: false, optional: false, required: true
  private _groupId?: string; 
  public get groupId() {
    return this.getStringAttribute('group_id');
  }
  public set groupId(value: string) {
    this._groupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupIdInput() {
    return this._groupId;
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

  // matching - computed: false, optional: true, required: false
  private _matching?: string; 
  public get matching() {
    return this.getStringAttribute('matching');
  }
  public set matching(value: string) {
    this._matching = value;
  }
  public resetMatching() {
    this._matching = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchingInput() {
    return this._matching;
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

  // registered_at - computed: true, optional: false, required: false
  public get registeredAt() {
    return this.getStringAttribute('registered_at');
  }

  // request_method - computed: false, optional: false, required: true
  private _requestMethod?: string; 
  public get requestMethod() {
    return this.getStringAttribute('request_method');
  }
  public set requestMethod(value: string) {
    this._requestMethod = value;
  }
  // Temporarily expose input value. Use with caution.
  public get requestMethodInput() {
    return this._requestMethod;
  }

  // request_path - computed: false, optional: false, required: true
  private _requestPath?: string; 
  public get requestPath() {
    return this.getStringAttribute('request_path');
  }
  public set requestPath(value: string) {
    this._requestPath = value;
  }
  // Temporarily expose input value. Use with caution.
  public get requestPathInput() {
    return this._requestPath;
  }

  // request_protocol - computed: false, optional: false, required: true
  private _requestProtocol?: string; 
  public get requestProtocol() {
    return this.getStringAttribute('request_protocol');
  }
  public set requestProtocol(value: string) {
    this._requestProtocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get requestProtocolInput() {
    return this._requestProtocol;
  }

  // response_id - computed: false, optional: true, required: false
  private _responseId?: string; 
  public get responseId() {
    return this.getStringAttribute('response_id');
  }
  public set responseId(value: string) {
    this._responseId = value;
  }
  public resetResponseId() {
    this._responseId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get responseIdInput() {
    return this._responseId;
  }

  // security_authentication - computed: false, optional: true, required: false
  private _securityAuthentication?: string; 
  public get securityAuthentication() {
    return this.getStringAttribute('security_authentication');
  }
  public set securityAuthentication(value: string) {
    this._securityAuthentication = value;
  }
  public resetSecurityAuthentication() {
    this._securityAuthentication = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityAuthenticationInput() {
    return this._securityAuthentication;
  }

  // simple_authentication - computed: true, optional: true, required: false
  private _simpleAuthentication?: boolean | cdktf.IResolvable; 
  public get simpleAuthentication() {
    return this.getBooleanAttribute('simple_authentication');
  }
  public set simpleAuthentication(value: boolean | cdktf.IResolvable) {
    this._simpleAuthentication = value;
  }
  public resetSimpleAuthentication() {
    this._simpleAuthentication = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get simpleAuthenticationInput() {
    return this._simpleAuthentication;
  }

  // success_response - computed: false, optional: true, required: false
  private _successResponse?: string; 
  public get successResponse() {
    return this.getStringAttribute('success_response');
  }
  public set successResponse(value: string) {
    this._successResponse = value;
  }
  public resetSuccessResponse() {
    this._successResponse = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get successResponseInput() {
    return this._successResponse;
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: string[]; 
  public get tags() {
    return cdktf.Fn.tolist(this.getListAttribute('tags'));
  }
  public set tags(value: string[]) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // backend_params - computed: false, optional: true, required: false
  private _backendParams = new ApigApiBackendParamsList(this, "backend_params", true);
  public get backendParams() {
    return this._backendParams;
  }
  public putBackendParams(value: ApigApiBackendParams[] | cdktf.IResolvable) {
    this._backendParams.internalValue = value;
  }
  public resetBackendParams() {
    this._backendParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendParamsInput() {
    return this._backendParams.internalValue;
  }

  // func_graph - computed: false, optional: true, required: false
  private _funcGraph = new ApigApiFuncGraphOutputReference(this, "func_graph");
  public get funcGraph() {
    return this._funcGraph;
  }
  public putFuncGraph(value: ApigApiFuncGraph) {
    this._funcGraph.internalValue = value;
  }
  public resetFuncGraph() {
    this._funcGraph.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get funcGraphInput() {
    return this._funcGraph.internalValue;
  }

  // func_graph_policy - computed: false, optional: true, required: false
  private _funcGraphPolicy = new ApigApiFuncGraphPolicyList(this, "func_graph_policy", true);
  public get funcGraphPolicy() {
    return this._funcGraphPolicy;
  }
  public putFuncGraphPolicy(value: ApigApiFuncGraphPolicy[] | cdktf.IResolvable) {
    this._funcGraphPolicy.internalValue = value;
  }
  public resetFuncGraphPolicy() {
    this._funcGraphPolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get funcGraphPolicyInput() {
    return this._funcGraphPolicy.internalValue;
  }

  // mock - computed: false, optional: true, required: false
  private _mock = new ApigApiMockOutputReference(this, "mock");
  public get mock() {
    return this._mock;
  }
  public putMock(value: ApigApiMock) {
    this._mock.internalValue = value;
  }
  public resetMock() {
    this._mock.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mockInput() {
    return this._mock.internalValue;
  }

  // mock_policy - computed: false, optional: true, required: false
  private _mockPolicy = new ApigApiMockPolicyList(this, "mock_policy", true);
  public get mockPolicy() {
    return this._mockPolicy;
  }
  public putMockPolicy(value: ApigApiMockPolicy[] | cdktf.IResolvable) {
    this._mockPolicy.internalValue = value;
  }
  public resetMockPolicy() {
    this._mockPolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mockPolicyInput() {
    return this._mockPolicy.internalValue;
  }

  // request_params - computed: false, optional: true, required: false
  private _requestParams = new ApigApiRequestParamsList(this, "request_params", true);
  public get requestParams() {
    return this._requestParams;
  }
  public putRequestParams(value: ApigApiRequestParams[] | cdktf.IResolvable) {
    this._requestParams.internalValue = value;
  }
  public resetRequestParams() {
    this._requestParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestParamsInput() {
    return this._requestParams.internalValue;
  }

  // web - computed: false, optional: true, required: false
  private _web = new ApigApiWebOutputReference(this, "web");
  public get web() {
    return this._web;
  }
  public putWeb(value: ApigApiWeb) {
    this._web.internalValue = value;
  }
  public resetWeb() {
    this._web.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get webInput() {
    return this._web.internalValue;
  }

  // web_policy - computed: false, optional: true, required: false
  private _webPolicy = new ApigApiWebPolicyList(this, "web_policy", true);
  public get webPolicy() {
    return this._webPolicy;
  }
  public putWebPolicy(value: ApigApiWebPolicy[] | cdktf.IResolvable) {
    this._webPolicy.internalValue = value;
  }
  public resetWebPolicy() {
    this._webPolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get webPolicyInput() {
    return this._webPolicy.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      authorizer_id: cdktf.stringToTerraform(this._authorizerId),
      body_description: cdktf.stringToTerraform(this._bodyDescription),
      cors: cdktf.booleanToTerraform(this._cors),
      description: cdktf.stringToTerraform(this._description),
      failure_response: cdktf.stringToTerraform(this._failureResponse),
      group_id: cdktf.stringToTerraform(this._groupId),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      matching: cdktf.stringToTerraform(this._matching),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      request_method: cdktf.stringToTerraform(this._requestMethod),
      request_path: cdktf.stringToTerraform(this._requestPath),
      request_protocol: cdktf.stringToTerraform(this._requestProtocol),
      response_id: cdktf.stringToTerraform(this._responseId),
      security_authentication: cdktf.stringToTerraform(this._securityAuthentication),
      simple_authentication: cdktf.booleanToTerraform(this._simpleAuthentication),
      success_response: cdktf.stringToTerraform(this._successResponse),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      type: cdktf.stringToTerraform(this._type),
      backend_params: cdktf.listMapper(apigApiBackendParamsToTerraform, true)(this._backendParams.internalValue),
      func_graph: apigApiFuncGraphToTerraform(this._funcGraph.internalValue),
      func_graph_policy: cdktf.listMapper(apigApiFuncGraphPolicyToTerraform, true)(this._funcGraphPolicy.internalValue),
      mock: apigApiMockToTerraform(this._mock.internalValue),
      mock_policy: cdktf.listMapper(apigApiMockPolicyToTerraform, true)(this._mockPolicy.internalValue),
      request_params: cdktf.listMapper(apigApiRequestParamsToTerraform, true)(this._requestParams.internalValue),
      web: apigApiWebToTerraform(this._web.internalValue),
      web_policy: cdktf.listMapper(apigApiWebPolicyToTerraform, true)(this._webPolicy.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      authorizer_id: {
        value: cdktf.stringToHclTerraform(this._authorizerId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      body_description: {
        value: cdktf.stringToHclTerraform(this._bodyDescription),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cors: {
        value: cdktf.booleanToHclTerraform(this._cors),
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
      failure_response: {
        value: cdktf.stringToHclTerraform(this._failureResponse),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      group_id: {
        value: cdktf.stringToHclTerraform(this._groupId),
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
      matching: {
        value: cdktf.stringToHclTerraform(this._matching),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      request_method: {
        value: cdktf.stringToHclTerraform(this._requestMethod),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      request_path: {
        value: cdktf.stringToHclTerraform(this._requestPath),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      request_protocol: {
        value: cdktf.stringToHclTerraform(this._requestProtocol),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      response_id: {
        value: cdktf.stringToHclTerraform(this._responseId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      security_authentication: {
        value: cdktf.stringToHclTerraform(this._securityAuthentication),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      simple_authentication: {
        value: cdktf.booleanToHclTerraform(this._simpleAuthentication),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      success_response: {
        value: cdktf.stringToHclTerraform(this._successResponse),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tags: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._tags),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      backend_params: {
        value: cdktf.listMapperHcl(apigApiBackendParamsToHclTerraform, true)(this._backendParams.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ApigApiBackendParamsList",
      },
      func_graph: {
        value: apigApiFuncGraphToHclTerraform(this._funcGraph.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ApigApiFuncGraphList",
      },
      func_graph_policy: {
        value: cdktf.listMapperHcl(apigApiFuncGraphPolicyToHclTerraform, true)(this._funcGraphPolicy.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ApigApiFuncGraphPolicyList",
      },
      mock: {
        value: apigApiMockToHclTerraform(this._mock.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ApigApiMockList",
      },
      mock_policy: {
        value: cdktf.listMapperHcl(apigApiMockPolicyToHclTerraform, true)(this._mockPolicy.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ApigApiMockPolicyList",
      },
      request_params: {
        value: cdktf.listMapperHcl(apigApiRequestParamsToHclTerraform, true)(this._requestParams.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ApigApiRequestParamsList",
      },
      web: {
        value: apigApiWebToHclTerraform(this._web.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ApigApiWebList",
      },
      web_policy: {
        value: cdktf.listMapperHcl(apigApiWebPolicyToHclTerraform, true)(this._webPolicy.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ApigApiWebPolicyList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

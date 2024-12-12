// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataartsDataserviceApiConfig extends cdktf.TerraformMetaArguments {
  /**
  * The authentication type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#auth_type DataartsDataserviceApi#auth_type}
  */
  readonly authType: string;
  /**
  * The ID of the catalog where the API is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#catalog_id DataartsDataserviceApi#catalog_id}
  */
  readonly catalogId: string;
  /**
  * The description of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#description DataartsDataserviceApi#description}
  */
  readonly description?: string;
  /**
  * The type of DLM engine.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#dlm_type DataartsDataserviceApi#dlm_type}
  */
  readonly dlmType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#id DataartsDataserviceApi#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The API reviewer.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#manager DataartsDataserviceApi#manager}
  */
  readonly manager: string;
  /**
  * The name of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#name DataartsDataserviceApi#name}
  */
  readonly name: string;
  /**
  * The API request path.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#path DataartsDataserviceApi#path}
  */
  readonly path: string;
  /**
  * The request protocol of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#protocol DataartsDataserviceApi#protocol}
  */
  readonly protocol: string;
  /**
  * The region where the API is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#region DataartsDataserviceApi#region}
  */
  readonly region?: string;
  /**
  * The request type of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#request_type DataartsDataserviceApi#request_type}
  */
  readonly requestType: string;
  /**
  * The API type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#type DataartsDataserviceApi#type}
  */
  readonly type: string;
  /**
  * The visibility to the catalog of API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#visibility DataartsDataserviceApi#visibility}
  */
  readonly visibility?: string;
  /**
  * The ID of the workspace to which the API belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#workspace_id DataartsDataserviceApi#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * backend_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#backend_config DataartsDataserviceApi#backend_config}
  */
  readonly backendConfig?: DataartsDataserviceApiBackendConfig;
  /**
  * datasource_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#datasource_config DataartsDataserviceApi#datasource_config}
  */
  readonly datasourceConfig: DataartsDataserviceApiDatasourceConfig;
  /**
  * request_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#request_params DataartsDataserviceApi#request_params}
  */
  readonly requestParams?: DataartsDataserviceApiRequestParams[] | cdktf.IResolvable;
}
export interface DataartsDataserviceApiHosts {
}

export function dataartsDataserviceApiHostsToTerraform(struct?: DataartsDataserviceApiHosts): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataartsDataserviceApiHostsToHclTerraform(struct?: DataartsDataserviceApiHosts): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataartsDataserviceApiHostsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsDataserviceApiHosts | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsDataserviceApiHosts | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // domains - computed: true, optional: false, required: false
  public get domains() {
    return this.getListAttribute('domains');
  }

  // external_host - computed: true, optional: false, required: false
  public get externalHost() {
    return this.getStringAttribute('external_host');
  }

  // instance_id - computed: true, optional: false, required: false
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }

  // instance_name - computed: true, optional: false, required: false
  public get instanceName() {
    return this.getStringAttribute('instance_name');
  }

  // intranet_host - computed: true, optional: false, required: false
  public get intranetHost() {
    return this.getStringAttribute('intranet_host');
  }
}

export class DataartsDataserviceApiHostsList extends cdktf.ComplexList {

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
  public get(index: number): DataartsDataserviceApiHostsOutputReference {
    return new DataartsDataserviceApiHostsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsDataserviceApiBackendConfigBackendParams {
  /**
  * The name of the corresponding backend parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#backend_param_name DataartsDataserviceApi#backend_param_name}
  */
  readonly backendParamName: string;
  /**
  * The name of the request parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#name DataartsDataserviceApi#name}
  */
  readonly name: string;
  /**
  * The position of the request parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#position DataartsDataserviceApi#position}
  */
  readonly position: string;
}

export function dataartsDataserviceApiBackendConfigBackendParamsToTerraform(struct?: DataartsDataserviceApiBackendConfigBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    backend_param_name: cdktf.stringToTerraform(struct!.backendParamName),
    name: cdktf.stringToTerraform(struct!.name),
    position: cdktf.stringToTerraform(struct!.position),
  }
}


export function dataartsDataserviceApiBackendConfigBackendParamsToHclTerraform(struct?: DataartsDataserviceApiBackendConfigBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    backend_param_name: {
      value: cdktf.stringToHclTerraform(struct!.backendParamName),
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
    position: {
      value: cdktf.stringToHclTerraform(struct!.position),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsDataserviceApiBackendConfigBackendParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsDataserviceApiBackendConfigBackendParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._backendParamName !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendParamName = this._backendParamName;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._position !== undefined) {
      hasAnyValues = true;
      internalValueResult.position = this._position;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsDataserviceApiBackendConfigBackendParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._backendParamName = undefined;
      this._name = undefined;
      this._position = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._backendParamName = value.backendParamName;
      this._name = value.name;
      this._position = value.position;
    }
  }

  // backend_param_name - computed: false, optional: false, required: true
  private _backendParamName?: string; 
  public get backendParamName() {
    return this.getStringAttribute('backend_param_name');
  }
  public set backendParamName(value: string) {
    this._backendParamName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get backendParamNameInput() {
    return this._backendParamName;
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

  // position - computed: false, optional: false, required: true
  private _position?: string; 
  public get position() {
    return this.getStringAttribute('position');
  }
  public set position(value: string) {
    this._position = value;
  }
  // Temporarily expose input value. Use with caution.
  public get positionInput() {
    return this._position;
  }
}

export class DataartsDataserviceApiBackendConfigBackendParamsList extends cdktf.ComplexList {
  public internalValue? : DataartsDataserviceApiBackendConfigBackendParams[] | cdktf.IResolvable

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
  public get(index: number): DataartsDataserviceApiBackendConfigBackendParamsOutputReference {
    return new DataartsDataserviceApiBackendConfigBackendParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsDataserviceApiBackendConfigConstantParams {
  /**
  * The description of the constant parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#description DataartsDataserviceApi#description}
  */
  readonly description?: string;
  /**
  * The name of the constant parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#name DataartsDataserviceApi#name}
  */
  readonly name: string;
  /**
  * The position of the constant parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#position DataartsDataserviceApi#position}
  */
  readonly position: string;
  /**
  * The type of the constant parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#type DataartsDataserviceApi#type}
  */
  readonly type: string;
  /**
  * The value of the constant parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#value DataartsDataserviceApi#value}
  */
  readonly value: string;
}

export function dataartsDataserviceApiBackendConfigConstantParamsToTerraform(struct?: DataartsDataserviceApiBackendConfigConstantParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    name: cdktf.stringToTerraform(struct!.name),
    position: cdktf.stringToTerraform(struct!.position),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function dataartsDataserviceApiBackendConfigConstantParamsToHclTerraform(struct?: DataartsDataserviceApiBackendConfigConstantParams | cdktf.IResolvable): any {
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
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    position: {
      value: cdktf.stringToHclTerraform(struct!.position),
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

export class DataartsDataserviceApiBackendConfigConstantParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsDataserviceApiBackendConfigConstantParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._position !== undefined) {
      hasAnyValues = true;
      internalValueResult.position = this._position;
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

  public set internalValue(value: DataartsDataserviceApiBackendConfigConstantParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._name = undefined;
      this._position = undefined;
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
      this._name = value.name;
      this._position = value.position;
      this._type = value.type;
      this._value = value.value;
    }
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

  // position - computed: false, optional: false, required: true
  private _position?: string; 
  public get position() {
    return this.getStringAttribute('position');
  }
  public set position(value: string) {
    this._position = value;
  }
  // Temporarily expose input value. Use with caution.
  public get positionInput() {
    return this._position;
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

export class DataartsDataserviceApiBackendConfigConstantParamsList extends cdktf.ComplexList {
  public internalValue? : DataartsDataserviceApiBackendConfigConstantParams[] | cdktf.IResolvable

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
  public get(index: number): DataartsDataserviceApiBackendConfigConstantParamsOutputReference {
    return new DataartsDataserviceApiBackendConfigConstantParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsDataserviceApiBackendConfig {
  /**
  * The backend host.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#host DataartsDataserviceApi#host}
  */
  readonly host: string;
  /**
  * The backend path.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#path DataartsDataserviceApi#path}
  */
  readonly path: string;
  /**
  * The protocol of the backend request.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#protocol DataartsDataserviceApi#protocol}
  */
  readonly protocol: string;
  /**
  * The backend timeout.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#timeout DataartsDataserviceApi#timeout}
  */
  readonly timeout?: number;
  /**
  * The type of the backend request.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#type DataartsDataserviceApi#type}
  */
  readonly type: string;
  /**
  * backend_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#backend_params DataartsDataserviceApi#backend_params}
  */
  readonly backendParams?: DataartsDataserviceApiBackendConfigBackendParams[] | cdktf.IResolvable;
  /**
  * constant_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#constant_params DataartsDataserviceApi#constant_params}
  */
  readonly constantParams?: DataartsDataserviceApiBackendConfigConstantParams[] | cdktf.IResolvable;
}

export function dataartsDataserviceApiBackendConfigToTerraform(struct?: DataartsDataserviceApiBackendConfigOutputReference | DataartsDataserviceApiBackendConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    host: cdktf.stringToTerraform(struct!.host),
    path: cdktf.stringToTerraform(struct!.path),
    protocol: cdktf.stringToTerraform(struct!.protocol),
    timeout: cdktf.numberToTerraform(struct!.timeout),
    type: cdktf.stringToTerraform(struct!.type),
    backend_params: cdktf.listMapper(dataartsDataserviceApiBackendConfigBackendParamsToTerraform, true)(struct!.backendParams),
    constant_params: cdktf.listMapper(dataartsDataserviceApiBackendConfigConstantParamsToTerraform, true)(struct!.constantParams),
  }
}


export function dataartsDataserviceApiBackendConfigToHclTerraform(struct?: DataartsDataserviceApiBackendConfigOutputReference | DataartsDataserviceApiBackendConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    host: {
      value: cdktf.stringToHclTerraform(struct!.host),
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
    protocol: {
      value: cdktf.stringToHclTerraform(struct!.protocol),
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
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    backend_params: {
      value: cdktf.listMapperHcl(dataartsDataserviceApiBackendConfigBackendParamsToHclTerraform, true)(struct!.backendParams),
      isBlock: true,
      type: "set",
      storageClassType: "DataartsDataserviceApiBackendConfigBackendParamsList",
    },
    constant_params: {
      value: cdktf.listMapperHcl(dataartsDataserviceApiBackendConfigConstantParamsToHclTerraform, true)(struct!.constantParams),
      isBlock: true,
      type: "set",
      storageClassType: "DataartsDataserviceApiBackendConfigConstantParamsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsDataserviceApiBackendConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsDataserviceApiBackendConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._host !== undefined) {
      hasAnyValues = true;
      internalValueResult.host = this._host;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._backendParams?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendParams = this._backendParams?.internalValue;
    }
    if (this._constantParams?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.constantParams = this._constantParams?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsDataserviceApiBackendConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._host = undefined;
      this._path = undefined;
      this._protocol = undefined;
      this._timeout = undefined;
      this._type = undefined;
      this._backendParams.internalValue = undefined;
      this._constantParams.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._host = value.host;
      this._path = value.path;
      this._protocol = value.protocol;
      this._timeout = value.timeout;
      this._type = value.type;
      this._backendParams.internalValue = value.backendParams;
      this._constantParams.internalValue = value.constantParams;
    }
  }

  // host - computed: false, optional: false, required: true
  private _host?: string; 
  public get host() {
    return this.getStringAttribute('host');
  }
  public set host(value: string) {
    this._host = value;
  }
  // Temporarily expose input value. Use with caution.
  public get hostInput() {
    return this._host;
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

  // protocol - computed: false, optional: false, required: true
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }

  // timeout - computed: true, optional: true, required: false
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

  // backend_params - computed: false, optional: true, required: false
  private _backendParams = new DataartsDataserviceApiBackendConfigBackendParamsList(this, "backend_params", true);
  public get backendParams() {
    return this._backendParams;
  }
  public putBackendParams(value: DataartsDataserviceApiBackendConfigBackendParams[] | cdktf.IResolvable) {
    this._backendParams.internalValue = value;
  }
  public resetBackendParams() {
    this._backendParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendParamsInput() {
    return this._backendParams.internalValue;
  }

  // constant_params - computed: false, optional: true, required: false
  private _constantParams = new DataartsDataserviceApiBackendConfigConstantParamsList(this, "constant_params", true);
  public get constantParams() {
    return this._constantParams;
  }
  public putConstantParams(value: DataartsDataserviceApiBackendConfigConstantParams[] | cdktf.IResolvable) {
    this._constantParams.internalValue = value;
  }
  public resetConstantParams() {
    this._constantParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get constantParamsInput() {
    return this._constantParams.internalValue;
  }
}
export interface DataartsDataserviceApiDatasourceConfigBackendParams {
  /**
  * The condition character.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#condition DataartsDataserviceApi#condition}
  */
  readonly condition?: string;
  /**
  * The name of the mapping parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#mapping DataartsDataserviceApi#mapping}
  */
  readonly mapping: string;
  /**
  * The name of the backend parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#name DataartsDataserviceApi#name}
  */
  readonly name: string;
}

export function dataartsDataserviceApiDatasourceConfigBackendParamsToTerraform(struct?: DataartsDataserviceApiDatasourceConfigBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    condition: cdktf.stringToTerraform(struct!.condition),
    mapping: cdktf.stringToTerraform(struct!.mapping),
    name: cdktf.stringToTerraform(struct!.name),
  }
}


export function dataartsDataserviceApiDatasourceConfigBackendParamsToHclTerraform(struct?: DataartsDataserviceApiDatasourceConfigBackendParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    condition: {
      value: cdktf.stringToHclTerraform(struct!.condition),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mapping: {
      value: cdktf.stringToHclTerraform(struct!.mapping),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsDataserviceApiDatasourceConfigBackendParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsDataserviceApiDatasourceConfigBackendParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._condition !== undefined) {
      hasAnyValues = true;
      internalValueResult.condition = this._condition;
    }
    if (this._mapping !== undefined) {
      hasAnyValues = true;
      internalValueResult.mapping = this._mapping;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsDataserviceApiDatasourceConfigBackendParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._condition = undefined;
      this._mapping = undefined;
      this._name = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._condition = value.condition;
      this._mapping = value.mapping;
      this._name = value.name;
    }
  }

  // condition - computed: true, optional: true, required: false
  private _condition?: string; 
  public get condition() {
    return this.getStringAttribute('condition');
  }
  public set condition(value: string) {
    this._condition = value;
  }
  public resetCondition() {
    this._condition = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get conditionInput() {
    return this._condition;
  }

  // mapping - computed: false, optional: false, required: true
  private _mapping?: string; 
  public get mapping() {
    return this.getStringAttribute('mapping');
  }
  public set mapping(value: string) {
    this._mapping = value;
  }
  // Temporarily expose input value. Use with caution.
  public get mappingInput() {
    return this._mapping;
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
}

export class DataartsDataserviceApiDatasourceConfigBackendParamsList extends cdktf.ComplexList {
  public internalValue? : DataartsDataserviceApiDatasourceConfigBackendParams[] | cdktf.IResolvable

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
  public get(index: number): DataartsDataserviceApiDatasourceConfigBackendParamsOutputReference {
    return new DataartsDataserviceApiDatasourceConfigBackendParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsDataserviceApiDatasourceConfigOrderParams {
  /**
  * The corresponding parameter field for the order parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#field DataartsDataserviceApi#field}
  */
  readonly field: string;
  /**
  * The name of the order parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#name DataartsDataserviceApi#name}
  */
  readonly name: string;
  /**
  * Whether this order parameter is the optional parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#optional DataartsDataserviceApi#optional}
  */
  readonly optional?: boolean | cdktf.IResolvable;
  /**
  * The order of the sorting parameters.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#order DataartsDataserviceApi#order}
  */
  readonly order?: number;
  /**
  * The sort type of the order parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#sort DataartsDataserviceApi#sort}
  */
  readonly sort?: string;
}

export function dataartsDataserviceApiDatasourceConfigOrderParamsToTerraform(struct?: DataartsDataserviceApiDatasourceConfigOrderParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    field: cdktf.stringToTerraform(struct!.field),
    name: cdktf.stringToTerraform(struct!.name),
    optional: cdktf.booleanToTerraform(struct!.optional),
    order: cdktf.numberToTerraform(struct!.order),
    sort: cdktf.stringToTerraform(struct!.sort),
  }
}


export function dataartsDataserviceApiDatasourceConfigOrderParamsToHclTerraform(struct?: DataartsDataserviceApiDatasourceConfigOrderParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    field: {
      value: cdktf.stringToHclTerraform(struct!.field),
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
    optional: {
      value: cdktf.booleanToHclTerraform(struct!.optional),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    order: {
      value: cdktf.numberToHclTerraform(struct!.order),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    sort: {
      value: cdktf.stringToHclTerraform(struct!.sort),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsDataserviceApiDatasourceConfigOrderParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsDataserviceApiDatasourceConfigOrderParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._field !== undefined) {
      hasAnyValues = true;
      internalValueResult.field = this._field;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._optional !== undefined) {
      hasAnyValues = true;
      internalValueResult.optional = this._optional;
    }
    if (this._order !== undefined) {
      hasAnyValues = true;
      internalValueResult.order = this._order;
    }
    if (this._sort !== undefined) {
      hasAnyValues = true;
      internalValueResult.sort = this._sort;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsDataserviceApiDatasourceConfigOrderParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._field = undefined;
      this._name = undefined;
      this._optional = undefined;
      this._order = undefined;
      this._sort = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._field = value.field;
      this._name = value.name;
      this._optional = value.optional;
      this._order = value.order;
      this._sort = value.sort;
    }
  }

  // field - computed: false, optional: false, required: true
  private _field?: string; 
  public get field() {
    return this.getStringAttribute('field');
  }
  public set field(value: string) {
    this._field = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldInput() {
    return this._field;
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

  // optional - computed: true, optional: true, required: false
  private _optional?: boolean | cdktf.IResolvable; 
  public get optional() {
    return this.getBooleanAttribute('optional');
  }
  public set optional(value: boolean | cdktf.IResolvable) {
    this._optional = value;
  }
  public resetOptional() {
    this._optional = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get optionalInput() {
    return this._optional;
  }

  // order - computed: true, optional: true, required: false
  private _order?: number; 
  public get order() {
    return this.getNumberAttribute('order');
  }
  public set order(value: number) {
    this._order = value;
  }
  public resetOrder() {
    this._order = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get orderInput() {
    return this._order;
  }

  // sort - computed: true, optional: true, required: false
  private _sort?: string; 
  public get sort() {
    return this.getStringAttribute('sort');
  }
  public set sort(value: string) {
    this._sort = value;
  }
  public resetSort() {
    this._sort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sortInput() {
    return this._sort;
  }
}

export class DataartsDataserviceApiDatasourceConfigOrderParamsList extends cdktf.ComplexList {
  public internalValue? : DataartsDataserviceApiDatasourceConfigOrderParams[] | cdktf.IResolvable

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
  public get(index: number): DataartsDataserviceApiDatasourceConfigOrderParamsOutputReference {
    return new DataartsDataserviceApiDatasourceConfigOrderParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsDataserviceApiDatasourceConfigResponseParams {
  /**
  * The description of the response parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#description DataartsDataserviceApi#description}
  */
  readonly description?: string;
  /**
  * The example value of the response parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#example_value DataartsDataserviceApi#example_value}
  */
  readonly exampleValue?: string;
  /**
  * The bound table field for the response parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#field DataartsDataserviceApi#field}
  */
  readonly field: string;
  /**
  * The name of the response parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#name DataartsDataserviceApi#name}
  */
  readonly name: string;
  /**
  * The type of the response parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#type DataartsDataserviceApi#type}
  */
  readonly type: string;
}

export function dataartsDataserviceApiDatasourceConfigResponseParamsToTerraform(struct?: DataartsDataserviceApiDatasourceConfigResponseParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    example_value: cdktf.stringToTerraform(struct!.exampleValue),
    field: cdktf.stringToTerraform(struct!.field),
    name: cdktf.stringToTerraform(struct!.name),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function dataartsDataserviceApiDatasourceConfigResponseParamsToHclTerraform(struct?: DataartsDataserviceApiDatasourceConfigResponseParams | cdktf.IResolvable): any {
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
    example_value: {
      value: cdktf.stringToHclTerraform(struct!.exampleValue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    field: {
      value: cdktf.stringToHclTerraform(struct!.field),
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
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsDataserviceApiDatasourceConfigResponseParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsDataserviceApiDatasourceConfigResponseParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._exampleValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.exampleValue = this._exampleValue;
    }
    if (this._field !== undefined) {
      hasAnyValues = true;
      internalValueResult.field = this._field;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsDataserviceApiDatasourceConfigResponseParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._exampleValue = undefined;
      this._field = undefined;
      this._name = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._description = value.description;
      this._exampleValue = value.exampleValue;
      this._field = value.field;
      this._name = value.name;
      this._type = value.type;
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

  // example_value - computed: false, optional: true, required: false
  private _exampleValue?: string; 
  public get exampleValue() {
    return this.getStringAttribute('example_value');
  }
  public set exampleValue(value: string) {
    this._exampleValue = value;
  }
  public resetExampleValue() {
    this._exampleValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get exampleValueInput() {
    return this._exampleValue;
  }

  // field - computed: false, optional: false, required: true
  private _field?: string; 
  public get field() {
    return this.getStringAttribute('field');
  }
  public set field(value: string) {
    this._field = value;
  }
  // Temporarily expose input value. Use with caution.
  public get fieldInput() {
    return this._field;
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
}

export class DataartsDataserviceApiDatasourceConfigResponseParamsList extends cdktf.ComplexList {
  public internalValue? : DataartsDataserviceApiDatasourceConfigResponseParams[] | cdktf.IResolvable

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
  public get(index: number): DataartsDataserviceApiDatasourceConfigResponseParamsOutputReference {
    return new DataartsDataserviceApiDatasourceConfigResponseParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsDataserviceApiDatasourceConfig {
  /**
  * The access mode for the data.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#access_mode DataartsDataserviceApi#access_mode}
  */
  readonly accessMode?: string;
  /**
  * The ID of the data connection.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#connection_id DataartsDataserviceApi#connection_id}
  */
  readonly connectionId?: string;
  /**
  * The name of the data connection.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#connection_name DataartsDataserviceApi#connection_name}
  */
  readonly connectionName?: string;
  /**
  * The name of the database.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#database DataartsDataserviceApi#database}
  */
  readonly database: string;
  /**
  * The name of the data table.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#datatable DataartsDataserviceApi#datatable}
  */
  readonly datatable: string;
  /**
  * The ID of the DLI queue.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#queue DataartsDataserviceApi#queue}
  */
  readonly queue?: string;
  /**
  * The SQL statements in script access type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#sql DataartsDataserviceApi#sql}
  */
  readonly sql?: string;
  /**
  * The ID of the data table.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#table_id DataartsDataserviceApi#table_id}
  */
  readonly tableId?: string;
  /**
  * The type of the data source.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#type DataartsDataserviceApi#type}
  */
  readonly type: string;
  /**
  * backend_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#backend_params DataartsDataserviceApi#backend_params}
  */
  readonly backendParams?: DataartsDataserviceApiDatasourceConfigBackendParams[] | cdktf.IResolvable;
  /**
  * order_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#order_params DataartsDataserviceApi#order_params}
  */
  readonly orderParams?: DataartsDataserviceApiDatasourceConfigOrderParams[] | cdktf.IResolvable;
  /**
  * response_params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#response_params DataartsDataserviceApi#response_params}
  */
  readonly responseParams?: DataartsDataserviceApiDatasourceConfigResponseParams[] | cdktf.IResolvable;
}

export function dataartsDataserviceApiDatasourceConfigToTerraform(struct?: DataartsDataserviceApiDatasourceConfigOutputReference | DataartsDataserviceApiDatasourceConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_mode: cdktf.stringToTerraform(struct!.accessMode),
    connection_id: cdktf.stringToTerraform(struct!.connectionId),
    connection_name: cdktf.stringToTerraform(struct!.connectionName),
    database: cdktf.stringToTerraform(struct!.database),
    datatable: cdktf.stringToTerraform(struct!.datatable),
    queue: cdktf.stringToTerraform(struct!.queue),
    sql: cdktf.stringToTerraform(struct!.sql),
    table_id: cdktf.stringToTerraform(struct!.tableId),
    type: cdktf.stringToTerraform(struct!.type),
    backend_params: cdktf.listMapper(dataartsDataserviceApiDatasourceConfigBackendParamsToTerraform, true)(struct!.backendParams),
    order_params: cdktf.listMapper(dataartsDataserviceApiDatasourceConfigOrderParamsToTerraform, true)(struct!.orderParams),
    response_params: cdktf.listMapper(dataartsDataserviceApiDatasourceConfigResponseParamsToTerraform, true)(struct!.responseParams),
  }
}


export function dataartsDataserviceApiDatasourceConfigToHclTerraform(struct?: DataartsDataserviceApiDatasourceConfigOutputReference | DataartsDataserviceApiDatasourceConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    access_mode: {
      value: cdktf.stringToHclTerraform(struct!.accessMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    connection_id: {
      value: cdktf.stringToHclTerraform(struct!.connectionId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    connection_name: {
      value: cdktf.stringToHclTerraform(struct!.connectionName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    database: {
      value: cdktf.stringToHclTerraform(struct!.database),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    datatable: {
      value: cdktf.stringToHclTerraform(struct!.datatable),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    queue: {
      value: cdktf.stringToHclTerraform(struct!.queue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sql: {
      value: cdktf.stringToHclTerraform(struct!.sql),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    table_id: {
      value: cdktf.stringToHclTerraform(struct!.tableId),
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
    backend_params: {
      value: cdktf.listMapperHcl(dataartsDataserviceApiDatasourceConfigBackendParamsToHclTerraform, true)(struct!.backendParams),
      isBlock: true,
      type: "set",
      storageClassType: "DataartsDataserviceApiDatasourceConfigBackendParamsList",
    },
    order_params: {
      value: cdktf.listMapperHcl(dataartsDataserviceApiDatasourceConfigOrderParamsToHclTerraform, true)(struct!.orderParams),
      isBlock: true,
      type: "set",
      storageClassType: "DataartsDataserviceApiDatasourceConfigOrderParamsList",
    },
    response_params: {
      value: cdktf.listMapperHcl(dataartsDataserviceApiDatasourceConfigResponseParamsToHclTerraform, true)(struct!.responseParams),
      isBlock: true,
      type: "set",
      storageClassType: "DataartsDataserviceApiDatasourceConfigResponseParamsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsDataserviceApiDatasourceConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsDataserviceApiDatasourceConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessMode = this._accessMode;
    }
    if (this._connectionId !== undefined) {
      hasAnyValues = true;
      internalValueResult.connectionId = this._connectionId;
    }
    if (this._connectionName !== undefined) {
      hasAnyValues = true;
      internalValueResult.connectionName = this._connectionName;
    }
    if (this._database !== undefined) {
      hasAnyValues = true;
      internalValueResult.database = this._database;
    }
    if (this._datatable !== undefined) {
      hasAnyValues = true;
      internalValueResult.datatable = this._datatable;
    }
    if (this._queue !== undefined) {
      hasAnyValues = true;
      internalValueResult.queue = this._queue;
    }
    if (this._sql !== undefined) {
      hasAnyValues = true;
      internalValueResult.sql = this._sql;
    }
    if (this._tableId !== undefined) {
      hasAnyValues = true;
      internalValueResult.tableId = this._tableId;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._backendParams?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendParams = this._backendParams?.internalValue;
    }
    if (this._orderParams?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.orderParams = this._orderParams?.internalValue;
    }
    if (this._responseParams?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.responseParams = this._responseParams?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsDataserviceApiDatasourceConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accessMode = undefined;
      this._connectionId = undefined;
      this._connectionName = undefined;
      this._database = undefined;
      this._datatable = undefined;
      this._queue = undefined;
      this._sql = undefined;
      this._tableId = undefined;
      this._type = undefined;
      this._backendParams.internalValue = undefined;
      this._orderParams.internalValue = undefined;
      this._responseParams.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accessMode = value.accessMode;
      this._connectionId = value.connectionId;
      this._connectionName = value.connectionName;
      this._database = value.database;
      this._datatable = value.datatable;
      this._queue = value.queue;
      this._sql = value.sql;
      this._tableId = value.tableId;
      this._type = value.type;
      this._backendParams.internalValue = value.backendParams;
      this._orderParams.internalValue = value.orderParams;
      this._responseParams.internalValue = value.responseParams;
    }
  }

  // access_mode - computed: true, optional: true, required: false
  private _accessMode?: string; 
  public get accessMode() {
    return this.getStringAttribute('access_mode');
  }
  public set accessMode(value: string) {
    this._accessMode = value;
  }
  public resetAccessMode() {
    this._accessMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessModeInput() {
    return this._accessMode;
  }

  // connection_id - computed: false, optional: true, required: false
  private _connectionId?: string; 
  public get connectionId() {
    return this.getStringAttribute('connection_id');
  }
  public set connectionId(value: string) {
    this._connectionId = value;
  }
  public resetConnectionId() {
    this._connectionId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get connectionIdInput() {
    return this._connectionId;
  }

  // connection_name - computed: true, optional: true, required: false
  private _connectionName?: string; 
  public get connectionName() {
    return this.getStringAttribute('connection_name');
  }
  public set connectionName(value: string) {
    this._connectionName = value;
  }
  public resetConnectionName() {
    this._connectionName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get connectionNameInput() {
    return this._connectionName;
  }

  // database - computed: false, optional: false, required: true
  private _database?: string; 
  public get database() {
    return this.getStringAttribute('database');
  }
  public set database(value: string) {
    this._database = value;
  }
  // Temporarily expose input value. Use with caution.
  public get databaseInput() {
    return this._database;
  }

  // datatable - computed: false, optional: false, required: true
  private _datatable?: string; 
  public get datatable() {
    return this.getStringAttribute('datatable');
  }
  public set datatable(value: string) {
    this._datatable = value;
  }
  // Temporarily expose input value. Use with caution.
  public get datatableInput() {
    return this._datatable;
  }

  // queue - computed: true, optional: true, required: false
  private _queue?: string; 
  public get queue() {
    return this.getStringAttribute('queue');
  }
  public set queue(value: string) {
    this._queue = value;
  }
  public resetQueue() {
    this._queue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queueInput() {
    return this._queue;
  }

  // sql - computed: false, optional: true, required: false
  private _sql?: string; 
  public get sql() {
    return this.getStringAttribute('sql');
  }
  public set sql(value: string) {
    this._sql = value;
  }
  public resetSql() {
    this._sql = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sqlInput() {
    return this._sql;
  }

  // table_id - computed: true, optional: true, required: false
  private _tableId?: string; 
  public get tableId() {
    return this.getStringAttribute('table_id');
  }
  public set tableId(value: string) {
    this._tableId = value;
  }
  public resetTableId() {
    this._tableId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tableIdInput() {
    return this._tableId;
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

  // backend_params - computed: false, optional: true, required: false
  private _backendParams = new DataartsDataserviceApiDatasourceConfigBackendParamsList(this, "backend_params", true);
  public get backendParams() {
    return this._backendParams;
  }
  public putBackendParams(value: DataartsDataserviceApiDatasourceConfigBackendParams[] | cdktf.IResolvable) {
    this._backendParams.internalValue = value;
  }
  public resetBackendParams() {
    this._backendParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendParamsInput() {
    return this._backendParams.internalValue;
  }

  // order_params - computed: false, optional: true, required: false
  private _orderParams = new DataartsDataserviceApiDatasourceConfigOrderParamsList(this, "order_params", true);
  public get orderParams() {
    return this._orderParams;
  }
  public putOrderParams(value: DataartsDataserviceApiDatasourceConfigOrderParams[] | cdktf.IResolvable) {
    this._orderParams.internalValue = value;
  }
  public resetOrderParams() {
    this._orderParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get orderParamsInput() {
    return this._orderParams.internalValue;
  }

  // response_params - computed: false, optional: true, required: false
  private _responseParams = new DataartsDataserviceApiDatasourceConfigResponseParamsList(this, "response_params", true);
  public get responseParams() {
    return this._responseParams;
  }
  public putResponseParams(value: DataartsDataserviceApiDatasourceConfigResponseParams[] | cdktf.IResolvable) {
    this._responseParams.internalValue = value;
  }
  public resetResponseParams() {
    this._responseParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get responseParamsInput() {
    return this._responseParams.internalValue;
  }
}
export interface DataartsDataserviceApiRequestParams {
  /**
  * The default value of the request parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#default_value DataartsDataserviceApi#default_value}
  */
  readonly defaultValue?: string;
  /**
  * The description of the request parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#description DataartsDataserviceApi#description}
  */
  readonly description?: string;
  /**
  * The example value of the request parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#example_value DataartsDataserviceApi#example_value}
  */
  readonly exampleValue?: string;
  /**
  * The name of the request parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#name DataartsDataserviceApi#name}
  */
  readonly name: string;
  /**
  * Whether this parameter is the required parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#necessary DataartsDataserviceApi#necessary}
  */
  readonly necessary?: boolean | cdktf.IResolvable;
  /**
  * The position of the request parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#position DataartsDataserviceApi#position}
  */
  readonly position: string;
  /**
  * The type of the request parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#type DataartsDataserviceApi#type}
  */
  readonly type: string;
}

export function dataartsDataserviceApiRequestParamsToTerraform(struct?: DataartsDataserviceApiRequestParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    default_value: cdktf.stringToTerraform(struct!.defaultValue),
    description: cdktf.stringToTerraform(struct!.description),
    example_value: cdktf.stringToTerraform(struct!.exampleValue),
    name: cdktf.stringToTerraform(struct!.name),
    necessary: cdktf.booleanToTerraform(struct!.necessary),
    position: cdktf.stringToTerraform(struct!.position),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function dataartsDataserviceApiRequestParamsToHclTerraform(struct?: DataartsDataserviceApiRequestParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    default_value: {
      value: cdktf.stringToHclTerraform(struct!.defaultValue),
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
    example_value: {
      value: cdktf.stringToHclTerraform(struct!.exampleValue),
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
    necessary: {
      value: cdktf.booleanToHclTerraform(struct!.necessary),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    position: {
      value: cdktf.stringToHclTerraform(struct!.position),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsDataserviceApiRequestParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsDataserviceApiRequestParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._defaultValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.defaultValue = this._defaultValue;
    }
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._exampleValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.exampleValue = this._exampleValue;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._necessary !== undefined) {
      hasAnyValues = true;
      internalValueResult.necessary = this._necessary;
    }
    if (this._position !== undefined) {
      hasAnyValues = true;
      internalValueResult.position = this._position;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsDataserviceApiRequestParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._defaultValue = undefined;
      this._description = undefined;
      this._exampleValue = undefined;
      this._name = undefined;
      this._necessary = undefined;
      this._position = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._defaultValue = value.defaultValue;
      this._description = value.description;
      this._exampleValue = value.exampleValue;
      this._name = value.name;
      this._necessary = value.necessary;
      this._position = value.position;
      this._type = value.type;
    }
  }

  // default_value - computed: false, optional: true, required: false
  private _defaultValue?: string; 
  public get defaultValue() {
    return this.getStringAttribute('default_value');
  }
  public set defaultValue(value: string) {
    this._defaultValue = value;
  }
  public resetDefaultValue() {
    this._defaultValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultValueInput() {
    return this._defaultValue;
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

  // example_value - computed: false, optional: true, required: false
  private _exampleValue?: string; 
  public get exampleValue() {
    return this.getStringAttribute('example_value');
  }
  public set exampleValue(value: string) {
    this._exampleValue = value;
  }
  public resetExampleValue() {
    this._exampleValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get exampleValueInput() {
    return this._exampleValue;
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

  // necessary - computed: false, optional: true, required: false
  private _necessary?: boolean | cdktf.IResolvable; 
  public get necessary() {
    return this.getBooleanAttribute('necessary');
  }
  public set necessary(value: boolean | cdktf.IResolvable) {
    this._necessary = value;
  }
  public resetNecessary() {
    this._necessary = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get necessaryInput() {
    return this._necessary;
  }

  // position - computed: false, optional: false, required: true
  private _position?: string; 
  public get position() {
    return this.getStringAttribute('position');
  }
  public set position(value: string) {
    this._position = value;
  }
  // Temporarily expose input value. Use with caution.
  public get positionInput() {
    return this._position;
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
}

export class DataartsDataserviceApiRequestParamsList extends cdktf.ComplexList {
  public internalValue? : DataartsDataserviceApiRequestParams[] | cdktf.IResolvable

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
  public get(index: number): DataartsDataserviceApiRequestParamsOutputReference {
    return new DataartsDataserviceApiRequestParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api huaweicloud_dataarts_dataservice_api}
*/
export class DataartsDataserviceApi extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_dataservice_api";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataartsDataserviceApi resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataartsDataserviceApi to import
  * @param importFromId The id of the existing DataartsDataserviceApi that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataartsDataserviceApi to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_dataservice_api", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api huaweicloud_dataarts_dataservice_api} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataartsDataserviceApiConfig
  */
  public constructor(scope: Construct, id: string, config: DataartsDataserviceApiConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_dataservice_api',
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
    this._catalogId = config.catalogId;
    this._description = config.description;
    this._dlmType = config.dlmType;
    this._id = config.id;
    this._manager = config.manager;
    this._name = config.name;
    this._path = config.path;
    this._protocol = config.protocol;
    this._region = config.region;
    this._requestType = config.requestType;
    this._type = config.type;
    this._visibility = config.visibility;
    this._workspaceId = config.workspaceId;
    this._backendConfig.internalValue = config.backendConfig;
    this._datasourceConfig.internalValue = config.datasourceConfig;
    this._requestParams.internalValue = config.requestParams;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // auth_type - computed: false, optional: false, required: true
  private _authType?: string; 
  public get authType() {
    return this.getStringAttribute('auth_type');
  }
  public set authType(value: string) {
    this._authType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get authTypeInput() {
    return this._authType;
  }

  // catalog_id - computed: false, optional: false, required: true
  private _catalogId?: string; 
  public get catalogId() {
    return this.getStringAttribute('catalog_id');
  }
  public set catalogId(value: string) {
    this._catalogId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get catalogIdInput() {
    return this._catalogId;
  }

  // create_user - computed: true, optional: false, required: false
  public get createUser() {
    return this.getStringAttribute('create_user');
  }

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

  // dlm_type - computed: false, optional: true, required: false
  private _dlmType?: string; 
  public get dlmType() {
    return this.getStringAttribute('dlm_type');
  }
  public set dlmType(value: string) {
    this._dlmType = value;
  }
  public resetDlmType() {
    this._dlmType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dlmTypeInput() {
    return this._dlmType;
  }

  // group_id - computed: true, optional: false, required: false
  public get groupId() {
    return this.getStringAttribute('group_id');
  }

  // host - computed: true, optional: false, required: false
  public get host() {
    return this.getStringAttribute('host');
  }

  // hosts - computed: true, optional: false, required: false
  private _hosts = new DataartsDataserviceApiHostsList(this, "hosts", false);
  public get hosts() {
    return this._hosts;
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

  // manager - computed: false, optional: false, required: true
  private _manager?: string; 
  public get manager() {
    return this.getStringAttribute('manager');
  }
  public set manager(value: string) {
    this._manager = value;
  }
  // Temporarily expose input value. Use with caution.
  public get managerInput() {
    return this._manager;
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

  // protocol - computed: false, optional: false, required: true
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
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

  // request_type - computed: false, optional: false, required: true
  private _requestType?: string; 
  public get requestType() {
    return this.getStringAttribute('request_type');
  }
  public set requestType(value: string) {
    this._requestType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get requestTypeInput() {
    return this._requestType;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // visibility - computed: false, optional: true, required: false
  private _visibility?: string; 
  public get visibility() {
    return this.getStringAttribute('visibility');
  }
  public set visibility(value: string) {
    this._visibility = value;
  }
  public resetVisibility() {
    this._visibility = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get visibilityInput() {
    return this._visibility;
  }

  // workspace_id - computed: false, optional: false, required: true
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // backend_config - computed: false, optional: true, required: false
  private _backendConfig = new DataartsDataserviceApiBackendConfigOutputReference(this, "backend_config");
  public get backendConfig() {
    return this._backendConfig;
  }
  public putBackendConfig(value: DataartsDataserviceApiBackendConfig) {
    this._backendConfig.internalValue = value;
  }
  public resetBackendConfig() {
    this._backendConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendConfigInput() {
    return this._backendConfig.internalValue;
  }

  // datasource_config - computed: false, optional: false, required: true
  private _datasourceConfig = new DataartsDataserviceApiDatasourceConfigOutputReference(this, "datasource_config");
  public get datasourceConfig() {
    return this._datasourceConfig;
  }
  public putDatasourceConfig(value: DataartsDataserviceApiDatasourceConfig) {
    this._datasourceConfig.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get datasourceConfigInput() {
    return this._datasourceConfig.internalValue;
  }

  // request_params - computed: false, optional: true, required: false
  private _requestParams = new DataartsDataserviceApiRequestParamsList(this, "request_params", true);
  public get requestParams() {
    return this._requestParams;
  }
  public putRequestParams(value: DataartsDataserviceApiRequestParams[] | cdktf.IResolvable) {
    this._requestParams.internalValue = value;
  }
  public resetRequestParams() {
    this._requestParams.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestParamsInput() {
    return this._requestParams.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auth_type: cdktf.stringToTerraform(this._authType),
      catalog_id: cdktf.stringToTerraform(this._catalogId),
      description: cdktf.stringToTerraform(this._description),
      dlm_type: cdktf.stringToTerraform(this._dlmType),
      id: cdktf.stringToTerraform(this._id),
      manager: cdktf.stringToTerraform(this._manager),
      name: cdktf.stringToTerraform(this._name),
      path: cdktf.stringToTerraform(this._path),
      protocol: cdktf.stringToTerraform(this._protocol),
      region: cdktf.stringToTerraform(this._region),
      request_type: cdktf.stringToTerraform(this._requestType),
      type: cdktf.stringToTerraform(this._type),
      visibility: cdktf.stringToTerraform(this._visibility),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      backend_config: dataartsDataserviceApiBackendConfigToTerraform(this._backendConfig.internalValue),
      datasource_config: dataartsDataserviceApiDatasourceConfigToTerraform(this._datasourceConfig.internalValue),
      request_params: cdktf.listMapper(dataartsDataserviceApiRequestParamsToTerraform, true)(this._requestParams.internalValue),
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
      catalog_id: {
        value: cdktf.stringToHclTerraform(this._catalogId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dlm_type: {
        value: cdktf.stringToHclTerraform(this._dlmType),
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
      manager: {
        value: cdktf.stringToHclTerraform(this._manager),
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
      path: {
        value: cdktf.stringToHclTerraform(this._path),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      protocol: {
        value: cdktf.stringToHclTerraform(this._protocol),
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
      request_type: {
        value: cdktf.stringToHclTerraform(this._requestType),
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
      visibility: {
        value: cdktf.stringToHclTerraform(this._visibility),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      backend_config: {
        value: dataartsDataserviceApiBackendConfigToHclTerraform(this._backendConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataartsDataserviceApiBackendConfigList",
      },
      datasource_config: {
        value: dataartsDataserviceApiDatasourceConfigToHclTerraform(this._datasourceConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataartsDataserviceApiDatasourceConfigList",
      },
      request_params: {
        value: cdktf.listMapperHcl(dataartsDataserviceApiRequestParamsToHclTerraform, true)(this._requestParams.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "DataartsDataserviceApiRequestParamsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

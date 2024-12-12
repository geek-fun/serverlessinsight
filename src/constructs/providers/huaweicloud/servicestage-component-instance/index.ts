// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ServicestageComponentInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#application_id ServicestageComponentInstance#application_id}
  */
  readonly applicationId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#component_id ServicestageComponentInstance#component_id}
  */
  readonly componentId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#description ServicestageComponentInstance#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#environment_id ServicestageComponentInstance#environment_id}
  */
  readonly environmentId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#flavor_id ServicestageComponentInstance#flavor_id}
  */
  readonly flavorId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#id ServicestageComponentInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#name ServicestageComponentInstance#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#region ServicestageComponentInstance#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#replica ServicestageComponentInstance#replica}
  */
  readonly replica: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#version ServicestageComponentInstance#version}
  */
  readonly version: string;
  /**
  * artifact block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#artifact ServicestageComponentInstance#artifact}
  */
  readonly artifact?: ServicestageComponentInstanceArtifact[] | cdktf.IResolvable;
  /**
  * configuration block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#configuration ServicestageComponentInstance#configuration}
  */
  readonly configuration?: ServicestageComponentInstanceConfiguration;
  /**
  * external_access block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#external_access ServicestageComponentInstance#external_access}
  */
  readonly externalAccess?: ServicestageComponentInstanceExternalAccess[] | cdktf.IResolvable;
  /**
  * refer_resource block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#refer_resource ServicestageComponentInstance#refer_resource}
  */
  readonly referResource: ServicestageComponentInstanceReferResource[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#timeouts ServicestageComponentInstance#timeouts}
  */
  readonly timeouts?: ServicestageComponentInstanceTimeouts;
}
export interface ServicestageComponentInstanceArtifactProperties {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#bucket ServicestageComponentInstance#bucket}
  */
  readonly bucket?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#endpoint ServicestageComponentInstance#endpoint}
  */
  readonly endpoint?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#key ServicestageComponentInstance#key}
  */
  readonly key?: string;
}

export function servicestageComponentInstanceArtifactPropertiesToTerraform(struct?: ServicestageComponentInstanceArtifactPropertiesOutputReference | ServicestageComponentInstanceArtifactProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bucket: cdktf.stringToTerraform(struct!.bucket),
    endpoint: cdktf.stringToTerraform(struct!.endpoint),
    key: cdktf.stringToTerraform(struct!.key),
  }
}


export function servicestageComponentInstanceArtifactPropertiesToHclTerraform(struct?: ServicestageComponentInstanceArtifactPropertiesOutputReference | ServicestageComponentInstanceArtifactProperties): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bucket: {
      value: cdktf.stringToHclTerraform(struct!.bucket),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    endpoint: {
      value: cdktf.stringToHclTerraform(struct!.endpoint),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    key: {
      value: cdktf.stringToHclTerraform(struct!.key),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceArtifactPropertiesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceArtifactProperties | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bucket !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucket = this._bucket;
    }
    if (this._endpoint !== undefined) {
      hasAnyValues = true;
      internalValueResult.endpoint = this._endpoint;
    }
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceArtifactProperties | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bucket = undefined;
      this._endpoint = undefined;
      this._key = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bucket = value.bucket;
      this._endpoint = value.endpoint;
      this._key = value.key;
    }
  }

  // bucket - computed: true, optional: true, required: false
  private _bucket?: string; 
  public get bucket() {
    return this.getStringAttribute('bucket');
  }
  public set bucket(value: string) {
    this._bucket = value;
  }
  public resetBucket() {
    this._bucket = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketInput() {
    return this._bucket;
  }

  // endpoint - computed: true, optional: true, required: false
  private _endpoint?: string; 
  public get endpoint() {
    return this.getStringAttribute('endpoint');
  }
  public set endpoint(value: string) {
    this._endpoint = value;
  }
  public resetEndpoint() {
    this._endpoint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endpointInput() {
    return this._endpoint;
  }

  // key - computed: true, optional: true, required: false
  private _key?: string; 
  public get key() {
    return this.getStringAttribute('key');
  }
  public set key(value: string) {
    this._key = value;
  }
  public resetKey() {
    this._key = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyInput() {
    return this._key;
  }
}
export interface ServicestageComponentInstanceArtifact {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#auth_type ServicestageComponentInstance#auth_type}
  */
  readonly authType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#name ServicestageComponentInstance#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#storage ServicestageComponentInstance#storage}
  */
  readonly storage: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#type ServicestageComponentInstance#type}
  */
  readonly type: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#url ServicestageComponentInstance#url}
  */
  readonly url: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#version ServicestageComponentInstance#version}
  */
  readonly version?: string;
  /**
  * properties block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#properties ServicestageComponentInstance#properties}
  */
  readonly properties?: ServicestageComponentInstanceArtifactProperties;
}

export function servicestageComponentInstanceArtifactToTerraform(struct?: ServicestageComponentInstanceArtifact | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    auth_type: cdktf.stringToTerraform(struct!.authType),
    name: cdktf.stringToTerraform(struct!.name),
    storage: cdktf.stringToTerraform(struct!.storage),
    type: cdktf.stringToTerraform(struct!.type),
    url: cdktf.stringToTerraform(struct!.url),
    version: cdktf.stringToTerraform(struct!.version),
    properties: servicestageComponentInstanceArtifactPropertiesToTerraform(struct!.properties),
  }
}


export function servicestageComponentInstanceArtifactToHclTerraform(struct?: ServicestageComponentInstanceArtifact | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    auth_type: {
      value: cdktf.stringToHclTerraform(struct!.authType),
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
    storage: {
      value: cdktf.stringToHclTerraform(struct!.storage),
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
    url: {
      value: cdktf.stringToHclTerraform(struct!.url),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    version: {
      value: cdktf.stringToHclTerraform(struct!.version),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    properties: {
      value: servicestageComponentInstanceArtifactPropertiesToHclTerraform(struct!.properties),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceArtifactPropertiesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceArtifactOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ServicestageComponentInstanceArtifact | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._authType !== undefined) {
      hasAnyValues = true;
      internalValueResult.authType = this._authType;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._storage !== undefined) {
      hasAnyValues = true;
      internalValueResult.storage = this._storage;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._url !== undefined) {
      hasAnyValues = true;
      internalValueResult.url = this._url;
    }
    if (this._version !== undefined) {
      hasAnyValues = true;
      internalValueResult.version = this._version;
    }
    if (this._properties?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.properties = this._properties?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceArtifact | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._authType = undefined;
      this._name = undefined;
      this._storage = undefined;
      this._type = undefined;
      this._url = undefined;
      this._version = undefined;
      this._properties.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._authType = value.authType;
      this._name = value.name;
      this._storage = value.storage;
      this._type = value.type;
      this._url = value.url;
      this._version = value.version;
      this._properties.internalValue = value.properties;
    }
  }

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

  // storage - computed: false, optional: false, required: true
  private _storage?: string; 
  public get storage() {
    return this.getStringAttribute('storage');
  }
  public set storage(value: string) {
    this._storage = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageInput() {
    return this._storage;
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

  // url - computed: false, optional: false, required: true
  private _url?: string; 
  public get url() {
    return this.getStringAttribute('url');
  }
  public set url(value: string) {
    this._url = value;
  }
  // Temporarily expose input value. Use with caution.
  public get urlInput() {
    return this._url;
  }

  // version - computed: true, optional: true, required: false
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

  // properties - computed: false, optional: true, required: false
  private _properties = new ServicestageComponentInstanceArtifactPropertiesOutputReference(this, "properties");
  public get properties() {
    return this._properties;
  }
  public putProperties(value: ServicestageComponentInstanceArtifactProperties) {
    this._properties.internalValue = value;
  }
  public resetProperties() {
    this._properties.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get propertiesInput() {
    return this._properties.internalValue;
  }
}

export class ServicestageComponentInstanceArtifactList extends cdktf.ComplexList {
  public internalValue? : ServicestageComponentInstanceArtifact[] | cdktf.IResolvable

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
  public get(index: number): ServicestageComponentInstanceArtifactOutputReference {
    return new ServicestageComponentInstanceArtifactOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ServicestageComponentInstanceConfigurationEnvVariable {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#name ServicestageComponentInstance#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#value ServicestageComponentInstance#value}
  */
  readonly value: string;
}

export function servicestageComponentInstanceConfigurationEnvVariableToTerraform(struct?: ServicestageComponentInstanceConfigurationEnvVariable | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function servicestageComponentInstanceConfigurationEnvVariableToHclTerraform(struct?: ServicestageComponentInstanceConfigurationEnvVariable | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
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

export class ServicestageComponentInstanceConfigurationEnvVariableOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ServicestageComponentInstanceConfigurationEnvVariable | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationEnvVariable | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._value = value.value;
    }
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

export class ServicestageComponentInstanceConfigurationEnvVariableList extends cdktf.ComplexList {
  public internalValue? : ServicestageComponentInstanceConfigurationEnvVariable[] | cdktf.IResolvable

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
  public get(index: number): ServicestageComponentInstanceConfigurationEnvVariableOutputReference {
    return new ServicestageComponentInstanceConfigurationEnvVariableOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ServicestageComponentInstanceConfigurationLifecycleEntrypoint {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#args ServicestageComponentInstance#args}
  */
  readonly args: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#commands ServicestageComponentInstance#commands}
  */
  readonly commands: string[];
}

export function servicestageComponentInstanceConfigurationLifecycleEntrypointToTerraform(struct?: ServicestageComponentInstanceConfigurationLifecycleEntrypointOutputReference | ServicestageComponentInstanceConfigurationLifecycleEntrypoint): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    args: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.args),
    commands: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.commands),
  }
}


export function servicestageComponentInstanceConfigurationLifecycleEntrypointToHclTerraform(struct?: ServicestageComponentInstanceConfigurationLifecycleEntrypointOutputReference | ServicestageComponentInstanceConfigurationLifecycleEntrypoint): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    args: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.args),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    commands: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.commands),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationLifecycleEntrypointOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationLifecycleEntrypoint | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._args !== undefined) {
      hasAnyValues = true;
      internalValueResult.args = this._args;
    }
    if (this._commands !== undefined) {
      hasAnyValues = true;
      internalValueResult.commands = this._commands;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationLifecycleEntrypoint | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._args = undefined;
      this._commands = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._args = value.args;
      this._commands = value.commands;
    }
  }

  // args - computed: false, optional: false, required: true
  private _args?: string[]; 
  public get args() {
    return this.getListAttribute('args');
  }
  public set args(value: string[]) {
    this._args = value;
  }
  // Temporarily expose input value. Use with caution.
  public get argsInput() {
    return this._args;
  }

  // commands - computed: false, optional: false, required: true
  private _commands?: string[]; 
  public get commands() {
    return this.getListAttribute('commands');
  }
  public set commands(value: string[]) {
    this._commands = value;
  }
  // Temporarily expose input value. Use with caution.
  public get commandsInput() {
    return this._commands;
  }
}
export interface ServicestageComponentInstanceConfigurationLifecyclePostStartParameters {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#commands ServicestageComponentInstance#commands}
  */
  readonly commands?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#host ServicestageComponentInstance#host}
  */
  readonly host?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#path ServicestageComponentInstance#path}
  */
  readonly path?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#port ServicestageComponentInstance#port}
  */
  readonly port?: number;
}

export function servicestageComponentInstanceConfigurationLifecyclePostStartParametersToTerraform(struct?: ServicestageComponentInstanceConfigurationLifecyclePostStartParametersOutputReference | ServicestageComponentInstanceConfigurationLifecyclePostStartParameters): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    commands: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.commands),
    host: cdktf.stringToTerraform(struct!.host),
    path: cdktf.stringToTerraform(struct!.path),
    port: cdktf.numberToTerraform(struct!.port),
  }
}


export function servicestageComponentInstanceConfigurationLifecyclePostStartParametersToHclTerraform(struct?: ServicestageComponentInstanceConfigurationLifecyclePostStartParametersOutputReference | ServicestageComponentInstanceConfigurationLifecyclePostStartParameters): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    commands: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.commands),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
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
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationLifecyclePostStartParametersOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationLifecyclePostStartParameters | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._commands !== undefined) {
      hasAnyValues = true;
      internalValueResult.commands = this._commands;
    }
    if (this._host !== undefined) {
      hasAnyValues = true;
      internalValueResult.host = this._host;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationLifecyclePostStartParameters | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._commands = undefined;
      this._host = undefined;
      this._path = undefined;
      this._port = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._commands = value.commands;
      this._host = value.host;
      this._path = value.path;
      this._port = value.port;
    }
  }

  // commands - computed: true, optional: true, required: false
  private _commands?: string[]; 
  public get commands() {
    return this.getListAttribute('commands');
  }
  public set commands(value: string[]) {
    this._commands = value;
  }
  public resetCommands() {
    this._commands = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get commandsInput() {
    return this._commands;
  }

  // host - computed: true, optional: true, required: false
  private _host?: string; 
  public get host() {
    return this.getStringAttribute('host');
  }
  public set host(value: string) {
    this._host = value;
  }
  public resetHost() {
    this._host = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostInput() {
    return this._host;
  }

  // path - computed: true, optional: true, required: false
  private _path?: string; 
  public get path() {
    return this.getStringAttribute('path');
  }
  public set path(value: string) {
    this._path = value;
  }
  public resetPath() {
    this._path = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pathInput() {
    return this._path;
  }

  // port - computed: true, optional: true, required: false
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }
}
export interface ServicestageComponentInstanceConfigurationLifecyclePostStart {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#type ServicestageComponentInstance#type}
  */
  readonly type: string;
  /**
  * parameters block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#parameters ServicestageComponentInstance#parameters}
  */
  readonly parameters: ServicestageComponentInstanceConfigurationLifecyclePostStartParameters;
}

export function servicestageComponentInstanceConfigurationLifecyclePostStartToTerraform(struct?: ServicestageComponentInstanceConfigurationLifecyclePostStartOutputReference | ServicestageComponentInstanceConfigurationLifecyclePostStart): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    parameters: servicestageComponentInstanceConfigurationLifecyclePostStartParametersToTerraform(struct!.parameters),
  }
}


export function servicestageComponentInstanceConfigurationLifecyclePostStartToHclTerraform(struct?: ServicestageComponentInstanceConfigurationLifecyclePostStartOutputReference | ServicestageComponentInstanceConfigurationLifecyclePostStart): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    parameters: {
      value: servicestageComponentInstanceConfigurationLifecyclePostStartParametersToHclTerraform(struct!.parameters),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationLifecyclePostStartParametersList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationLifecyclePostStartOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationLifecyclePostStart | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._parameters?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.parameters = this._parameters?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationLifecyclePostStart | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._type = undefined;
      this._parameters.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._type = value.type;
      this._parameters.internalValue = value.parameters;
    }
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

  // parameters - computed: false, optional: false, required: true
  private _parameters = new ServicestageComponentInstanceConfigurationLifecyclePostStartParametersOutputReference(this, "parameters");
  public get parameters() {
    return this._parameters;
  }
  public putParameters(value: ServicestageComponentInstanceConfigurationLifecyclePostStartParameters) {
    this._parameters.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get parametersInput() {
    return this._parameters.internalValue;
  }
}
export interface ServicestageComponentInstanceConfigurationLifecyclePreStopParameters {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#commands ServicestageComponentInstance#commands}
  */
  readonly commands?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#host ServicestageComponentInstance#host}
  */
  readonly host?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#path ServicestageComponentInstance#path}
  */
  readonly path?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#port ServicestageComponentInstance#port}
  */
  readonly port?: number;
}

export function servicestageComponentInstanceConfigurationLifecyclePreStopParametersToTerraform(struct?: ServicestageComponentInstanceConfigurationLifecyclePreStopParametersOutputReference | ServicestageComponentInstanceConfigurationLifecyclePreStopParameters): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    commands: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.commands),
    host: cdktf.stringToTerraform(struct!.host),
    path: cdktf.stringToTerraform(struct!.path),
    port: cdktf.numberToTerraform(struct!.port),
  }
}


export function servicestageComponentInstanceConfigurationLifecyclePreStopParametersToHclTerraform(struct?: ServicestageComponentInstanceConfigurationLifecyclePreStopParametersOutputReference | ServicestageComponentInstanceConfigurationLifecyclePreStopParameters): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    commands: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.commands),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
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
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationLifecyclePreStopParametersOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationLifecyclePreStopParameters | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._commands !== undefined) {
      hasAnyValues = true;
      internalValueResult.commands = this._commands;
    }
    if (this._host !== undefined) {
      hasAnyValues = true;
      internalValueResult.host = this._host;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationLifecyclePreStopParameters | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._commands = undefined;
      this._host = undefined;
      this._path = undefined;
      this._port = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._commands = value.commands;
      this._host = value.host;
      this._path = value.path;
      this._port = value.port;
    }
  }

  // commands - computed: true, optional: true, required: false
  private _commands?: string[]; 
  public get commands() {
    return this.getListAttribute('commands');
  }
  public set commands(value: string[]) {
    this._commands = value;
  }
  public resetCommands() {
    this._commands = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get commandsInput() {
    return this._commands;
  }

  // host - computed: true, optional: true, required: false
  private _host?: string; 
  public get host() {
    return this.getStringAttribute('host');
  }
  public set host(value: string) {
    this._host = value;
  }
  public resetHost() {
    this._host = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostInput() {
    return this._host;
  }

  // path - computed: true, optional: true, required: false
  private _path?: string; 
  public get path() {
    return this.getStringAttribute('path');
  }
  public set path(value: string) {
    this._path = value;
  }
  public resetPath() {
    this._path = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pathInput() {
    return this._path;
  }

  // port - computed: true, optional: true, required: false
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }
}
export interface ServicestageComponentInstanceConfigurationLifecyclePreStop {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#type ServicestageComponentInstance#type}
  */
  readonly type: string;
  /**
  * parameters block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#parameters ServicestageComponentInstance#parameters}
  */
  readonly parameters: ServicestageComponentInstanceConfigurationLifecyclePreStopParameters;
}

export function servicestageComponentInstanceConfigurationLifecyclePreStopToTerraform(struct?: ServicestageComponentInstanceConfigurationLifecyclePreStopOutputReference | ServicestageComponentInstanceConfigurationLifecyclePreStop): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    parameters: servicestageComponentInstanceConfigurationLifecyclePreStopParametersToTerraform(struct!.parameters),
  }
}


export function servicestageComponentInstanceConfigurationLifecyclePreStopToHclTerraform(struct?: ServicestageComponentInstanceConfigurationLifecyclePreStopOutputReference | ServicestageComponentInstanceConfigurationLifecyclePreStop): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    parameters: {
      value: servicestageComponentInstanceConfigurationLifecyclePreStopParametersToHclTerraform(struct!.parameters),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationLifecyclePreStopParametersList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationLifecyclePreStopOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationLifecyclePreStop | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._parameters?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.parameters = this._parameters?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationLifecyclePreStop | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._type = undefined;
      this._parameters.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._type = value.type;
      this._parameters.internalValue = value.parameters;
    }
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

  // parameters - computed: false, optional: false, required: true
  private _parameters = new ServicestageComponentInstanceConfigurationLifecyclePreStopParametersOutputReference(this, "parameters");
  public get parameters() {
    return this._parameters;
  }
  public putParameters(value: ServicestageComponentInstanceConfigurationLifecyclePreStopParameters) {
    this._parameters.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get parametersInput() {
    return this._parameters.internalValue;
  }
}
export interface ServicestageComponentInstanceConfigurationLifecycle {
  /**
  * entrypoint block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#entrypoint ServicestageComponentInstance#entrypoint}
  */
  readonly entrypoint?: ServicestageComponentInstanceConfigurationLifecycleEntrypoint;
  /**
  * post_start block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#post_start ServicestageComponentInstance#post_start}
  */
  readonly postStart?: ServicestageComponentInstanceConfigurationLifecyclePostStart;
  /**
  * pre_stop block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#pre_stop ServicestageComponentInstance#pre_stop}
  */
  readonly preStop?: ServicestageComponentInstanceConfigurationLifecyclePreStop;
}

export function servicestageComponentInstanceConfigurationLifecycleToTerraform(struct?: ServicestageComponentInstanceConfigurationLifecycleOutputReference | ServicestageComponentInstanceConfigurationLifecycle): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    entrypoint: servicestageComponentInstanceConfigurationLifecycleEntrypointToTerraform(struct!.entrypoint),
    post_start: servicestageComponentInstanceConfigurationLifecyclePostStartToTerraform(struct!.postStart),
    pre_stop: servicestageComponentInstanceConfigurationLifecyclePreStopToTerraform(struct!.preStop),
  }
}


export function servicestageComponentInstanceConfigurationLifecycleToHclTerraform(struct?: ServicestageComponentInstanceConfigurationLifecycleOutputReference | ServicestageComponentInstanceConfigurationLifecycle): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    entrypoint: {
      value: servicestageComponentInstanceConfigurationLifecycleEntrypointToHclTerraform(struct!.entrypoint),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationLifecycleEntrypointList",
    },
    post_start: {
      value: servicestageComponentInstanceConfigurationLifecyclePostStartToHclTerraform(struct!.postStart),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationLifecyclePostStartList",
    },
    pre_stop: {
      value: servicestageComponentInstanceConfigurationLifecyclePreStopToHclTerraform(struct!.preStop),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationLifecyclePreStopList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationLifecycleOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationLifecycle | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._entrypoint?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.entrypoint = this._entrypoint?.internalValue;
    }
    if (this._postStart?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.postStart = this._postStart?.internalValue;
    }
    if (this._preStop?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.preStop = this._preStop?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationLifecycle | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._entrypoint.internalValue = undefined;
      this._postStart.internalValue = undefined;
      this._preStop.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._entrypoint.internalValue = value.entrypoint;
      this._postStart.internalValue = value.postStart;
      this._preStop.internalValue = value.preStop;
    }
  }

  // entrypoint - computed: false, optional: true, required: false
  private _entrypoint = new ServicestageComponentInstanceConfigurationLifecycleEntrypointOutputReference(this, "entrypoint");
  public get entrypoint() {
    return this._entrypoint;
  }
  public putEntrypoint(value: ServicestageComponentInstanceConfigurationLifecycleEntrypoint) {
    this._entrypoint.internalValue = value;
  }
  public resetEntrypoint() {
    this._entrypoint.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get entrypointInput() {
    return this._entrypoint.internalValue;
  }

  // post_start - computed: false, optional: true, required: false
  private _postStart = new ServicestageComponentInstanceConfigurationLifecyclePostStartOutputReference(this, "post_start");
  public get postStart() {
    return this._postStart;
  }
  public putPostStart(value: ServicestageComponentInstanceConfigurationLifecyclePostStart) {
    this._postStart.internalValue = value;
  }
  public resetPostStart() {
    this._postStart.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get postStartInput() {
    return this._postStart.internalValue;
  }

  // pre_stop - computed: false, optional: true, required: false
  private _preStop = new ServicestageComponentInstanceConfigurationLifecyclePreStopOutputReference(this, "pre_stop");
  public get preStop() {
    return this._preStop;
  }
  public putPreStop(value: ServicestageComponentInstanceConfigurationLifecyclePreStop) {
    this._preStop.internalValue = value;
  }
  public resetPreStop() {
    this._preStop.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get preStopInput() {
    return this._preStop.internalValue;
  }
}
export interface ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMounting {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#aging_period ServicestageComponentInstance#aging_period}
  */
  readonly agingPeriod?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#host_extend_path ServicestageComponentInstance#host_extend_path}
  */
  readonly hostExtendPath?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#path ServicestageComponentInstance#path}
  */
  readonly path: string;
}

export function servicestageComponentInstanceConfigurationLogCollectionPolicyContainerMountingToTerraform(struct?: ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMounting | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    aging_period: cdktf.stringToTerraform(struct!.agingPeriod),
    host_extend_path: cdktf.stringToTerraform(struct!.hostExtendPath),
    path: cdktf.stringToTerraform(struct!.path),
  }
}


export function servicestageComponentInstanceConfigurationLogCollectionPolicyContainerMountingToHclTerraform(struct?: ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMounting | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    aging_period: {
      value: cdktf.stringToHclTerraform(struct!.agingPeriod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    host_extend_path: {
      value: cdktf.stringToHclTerraform(struct!.hostExtendPath),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMountingOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMounting | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._agingPeriod !== undefined) {
      hasAnyValues = true;
      internalValueResult.agingPeriod = this._agingPeriod;
    }
    if (this._hostExtendPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.hostExtendPath = this._hostExtendPath;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMounting | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._agingPeriod = undefined;
      this._hostExtendPath = undefined;
      this._path = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._agingPeriod = value.agingPeriod;
      this._hostExtendPath = value.hostExtendPath;
      this._path = value.path;
    }
  }

  // aging_period - computed: false, optional: true, required: false
  private _agingPeriod?: string; 
  public get agingPeriod() {
    return this.getStringAttribute('aging_period');
  }
  public set agingPeriod(value: string) {
    this._agingPeriod = value;
  }
  public resetAgingPeriod() {
    this._agingPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get agingPeriodInput() {
    return this._agingPeriod;
  }

  // host_extend_path - computed: false, optional: true, required: false
  private _hostExtendPath?: string; 
  public get hostExtendPath() {
    return this.getStringAttribute('host_extend_path');
  }
  public set hostExtendPath(value: string) {
    this._hostExtendPath = value;
  }
  public resetHostExtendPath() {
    this._hostExtendPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostExtendPathInput() {
    return this._hostExtendPath;
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
}

export class ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMountingList extends cdktf.ComplexList {
  public internalValue? : ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMounting[] | cdktf.IResolvable

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
  public get(index: number): ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMountingOutputReference {
    return new ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMountingOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ServicestageComponentInstanceConfigurationLogCollectionPolicy {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#host_path ServicestageComponentInstance#host_path}
  */
  readonly hostPath?: string;
  /**
  * container_mounting block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#container_mounting ServicestageComponentInstance#container_mounting}
  */
  readonly containerMounting: ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMounting[] | cdktf.IResolvable;
}

export function servicestageComponentInstanceConfigurationLogCollectionPolicyToTerraform(struct?: ServicestageComponentInstanceConfigurationLogCollectionPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    host_path: cdktf.stringToTerraform(struct!.hostPath),
    container_mounting: cdktf.listMapper(servicestageComponentInstanceConfigurationLogCollectionPolicyContainerMountingToTerraform, true)(struct!.containerMounting),
  }
}


export function servicestageComponentInstanceConfigurationLogCollectionPolicyToHclTerraform(struct?: ServicestageComponentInstanceConfigurationLogCollectionPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    host_path: {
      value: cdktf.stringToHclTerraform(struct!.hostPath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    container_mounting: {
      value: cdktf.listMapperHcl(servicestageComponentInstanceConfigurationLogCollectionPolicyContainerMountingToHclTerraform, true)(struct!.containerMounting),
      isBlock: true,
      type: "set",
      storageClassType: "ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMountingList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationLogCollectionPolicyOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ServicestageComponentInstanceConfigurationLogCollectionPolicy | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._hostPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.hostPath = this._hostPath;
    }
    if (this._containerMounting?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.containerMounting = this._containerMounting?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationLogCollectionPolicy | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._hostPath = undefined;
      this._containerMounting.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._hostPath = value.hostPath;
      this._containerMounting.internalValue = value.containerMounting;
    }
  }

  // host_path - computed: false, optional: true, required: false
  private _hostPath?: string; 
  public get hostPath() {
    return this.getStringAttribute('host_path');
  }
  public set hostPath(value: string) {
    this._hostPath = value;
  }
  public resetHostPath() {
    this._hostPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostPathInput() {
    return this._hostPath;
  }

  // container_mounting - computed: false, optional: false, required: true
  private _containerMounting = new ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMountingList(this, "container_mounting", true);
  public get containerMounting() {
    return this._containerMounting;
  }
  public putContainerMounting(value: ServicestageComponentInstanceConfigurationLogCollectionPolicyContainerMounting[] | cdktf.IResolvable) {
    this._containerMounting.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get containerMountingInput() {
    return this._containerMounting.internalValue;
  }
}

export class ServicestageComponentInstanceConfigurationLogCollectionPolicyList extends cdktf.ComplexList {
  public internalValue? : ServicestageComponentInstanceConfigurationLogCollectionPolicy[] | cdktf.IResolvable

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
  public get(index: number): ServicestageComponentInstanceConfigurationLogCollectionPolicyOutputReference {
    return new ServicestageComponentInstanceConfigurationLogCollectionPolicyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ServicestageComponentInstanceConfigurationProbeLivenessCommandParam {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#commands ServicestageComponentInstance#commands}
  */
  readonly commands: string[];
}

export function servicestageComponentInstanceConfigurationProbeLivenessCommandParamToTerraform(struct?: ServicestageComponentInstanceConfigurationProbeLivenessCommandParamOutputReference | ServicestageComponentInstanceConfigurationProbeLivenessCommandParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    commands: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.commands),
  }
}


export function servicestageComponentInstanceConfigurationProbeLivenessCommandParamToHclTerraform(struct?: ServicestageComponentInstanceConfigurationProbeLivenessCommandParamOutputReference | ServicestageComponentInstanceConfigurationProbeLivenessCommandParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    commands: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.commands),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationProbeLivenessCommandParamOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationProbeLivenessCommandParam | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._commands !== undefined) {
      hasAnyValues = true;
      internalValueResult.commands = this._commands;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationProbeLivenessCommandParam | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._commands = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._commands = value.commands;
    }
  }

  // commands - computed: false, optional: false, required: true
  private _commands?: string[]; 
  public get commands() {
    return this.getListAttribute('commands');
  }
  public set commands(value: string[]) {
    this._commands = value;
  }
  // Temporarily expose input value. Use with caution.
  public get commandsInput() {
    return this._commands;
  }
}
export interface ServicestageComponentInstanceConfigurationProbeLivenessHttpParam {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#host ServicestageComponentInstance#host}
  */
  readonly host?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#path ServicestageComponentInstance#path}
  */
  readonly path: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#port ServicestageComponentInstance#port}
  */
  readonly port: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#scheme ServicestageComponentInstance#scheme}
  */
  readonly scheme: string;
}

export function servicestageComponentInstanceConfigurationProbeLivenessHttpParamToTerraform(struct?: ServicestageComponentInstanceConfigurationProbeLivenessHttpParamOutputReference | ServicestageComponentInstanceConfigurationProbeLivenessHttpParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    host: cdktf.stringToTerraform(struct!.host),
    path: cdktf.stringToTerraform(struct!.path),
    port: cdktf.numberToTerraform(struct!.port),
    scheme: cdktf.stringToTerraform(struct!.scheme),
  }
}


export function servicestageComponentInstanceConfigurationProbeLivenessHttpParamToHclTerraform(struct?: ServicestageComponentInstanceConfigurationProbeLivenessHttpParamOutputReference | ServicestageComponentInstanceConfigurationProbeLivenessHttpParam): any {
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
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    scheme: {
      value: cdktf.stringToHclTerraform(struct!.scheme),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationProbeLivenessHttpParamOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationProbeLivenessHttpParam | undefined {
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
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._scheme !== undefined) {
      hasAnyValues = true;
      internalValueResult.scheme = this._scheme;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationProbeLivenessHttpParam | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._host = undefined;
      this._path = undefined;
      this._port = undefined;
      this._scheme = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._host = value.host;
      this._path = value.path;
      this._port = value.port;
      this._scheme = value.scheme;
    }
  }

  // host - computed: true, optional: true, required: false
  private _host?: string; 
  public get host() {
    return this.getStringAttribute('host');
  }
  public set host(value: string) {
    this._host = value;
  }
  public resetHost() {
    this._host = undefined;
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

  // port - computed: false, optional: false, required: true
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }

  // scheme - computed: false, optional: false, required: true
  private _scheme?: string; 
  public get scheme() {
    return this.getStringAttribute('scheme');
  }
  public set scheme(value: string) {
    this._scheme = value;
  }
  // Temporarily expose input value. Use with caution.
  public get schemeInput() {
    return this._scheme;
  }
}
export interface ServicestageComponentInstanceConfigurationProbeLivenessTcpParam {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#port ServicestageComponentInstance#port}
  */
  readonly port: number;
}

export function servicestageComponentInstanceConfigurationProbeLivenessTcpParamToTerraform(struct?: ServicestageComponentInstanceConfigurationProbeLivenessTcpParamOutputReference | ServicestageComponentInstanceConfigurationProbeLivenessTcpParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    port: cdktf.numberToTerraform(struct!.port),
  }
}


export function servicestageComponentInstanceConfigurationProbeLivenessTcpParamToHclTerraform(struct?: ServicestageComponentInstanceConfigurationProbeLivenessTcpParamOutputReference | ServicestageComponentInstanceConfigurationProbeLivenessTcpParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationProbeLivenessTcpParamOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationProbeLivenessTcpParam | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationProbeLivenessTcpParam | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._port = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._port = value.port;
    }
  }

  // port - computed: false, optional: false, required: true
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }
}
export interface ServicestageComponentInstanceConfigurationProbeLiveness {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#delay ServicestageComponentInstance#delay}
  */
  readonly delay?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#timeout ServicestageComponentInstance#timeout}
  */
  readonly timeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#type ServicestageComponentInstance#type}
  */
  readonly type: string;
  /**
  * command_param block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#command_param ServicestageComponentInstance#command_param}
  */
  readonly commandParam?: ServicestageComponentInstanceConfigurationProbeLivenessCommandParam;
  /**
  * http_param block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#http_param ServicestageComponentInstance#http_param}
  */
  readonly httpParam?: ServicestageComponentInstanceConfigurationProbeLivenessHttpParam;
  /**
  * tcp_param block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#tcp_param ServicestageComponentInstance#tcp_param}
  */
  readonly tcpParam?: ServicestageComponentInstanceConfigurationProbeLivenessTcpParam;
}

export function servicestageComponentInstanceConfigurationProbeLivenessToTerraform(struct?: ServicestageComponentInstanceConfigurationProbeLivenessOutputReference | ServicestageComponentInstanceConfigurationProbeLiveness): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    delay: cdktf.numberToTerraform(struct!.delay),
    timeout: cdktf.numberToTerraform(struct!.timeout),
    type: cdktf.stringToTerraform(struct!.type),
    command_param: servicestageComponentInstanceConfigurationProbeLivenessCommandParamToTerraform(struct!.commandParam),
    http_param: servicestageComponentInstanceConfigurationProbeLivenessHttpParamToTerraform(struct!.httpParam),
    tcp_param: servicestageComponentInstanceConfigurationProbeLivenessTcpParamToTerraform(struct!.tcpParam),
  }
}


export function servicestageComponentInstanceConfigurationProbeLivenessToHclTerraform(struct?: ServicestageComponentInstanceConfigurationProbeLivenessOutputReference | ServicestageComponentInstanceConfigurationProbeLiveness): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    delay: {
      value: cdktf.numberToHclTerraform(struct!.delay),
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
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    command_param: {
      value: servicestageComponentInstanceConfigurationProbeLivenessCommandParamToHclTerraform(struct!.commandParam),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationProbeLivenessCommandParamList",
    },
    http_param: {
      value: servicestageComponentInstanceConfigurationProbeLivenessHttpParamToHclTerraform(struct!.httpParam),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationProbeLivenessHttpParamList",
    },
    tcp_param: {
      value: servicestageComponentInstanceConfigurationProbeLivenessTcpParamToHclTerraform(struct!.tcpParam),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationProbeLivenessTcpParamList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationProbeLivenessOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationProbeLiveness | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._delay !== undefined) {
      hasAnyValues = true;
      internalValueResult.delay = this._delay;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._commandParam?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.commandParam = this._commandParam?.internalValue;
    }
    if (this._httpParam?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpParam = this._httpParam?.internalValue;
    }
    if (this._tcpParam?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.tcpParam = this._tcpParam?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationProbeLiveness | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._delay = undefined;
      this._timeout = undefined;
      this._type = undefined;
      this._commandParam.internalValue = undefined;
      this._httpParam.internalValue = undefined;
      this._tcpParam.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._delay = value.delay;
      this._timeout = value.timeout;
      this._type = value.type;
      this._commandParam.internalValue = value.commandParam;
      this._httpParam.internalValue = value.httpParam;
      this._tcpParam.internalValue = value.tcpParam;
    }
  }

  // delay - computed: true, optional: true, required: false
  private _delay?: number; 
  public get delay() {
    return this.getNumberAttribute('delay');
  }
  public set delay(value: number) {
    this._delay = value;
  }
  public resetDelay() {
    this._delay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get delayInput() {
    return this._delay;
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

  // command_param - computed: false, optional: true, required: false
  private _commandParam = new ServicestageComponentInstanceConfigurationProbeLivenessCommandParamOutputReference(this, "command_param");
  public get commandParam() {
    return this._commandParam;
  }
  public putCommandParam(value: ServicestageComponentInstanceConfigurationProbeLivenessCommandParam) {
    this._commandParam.internalValue = value;
  }
  public resetCommandParam() {
    this._commandParam.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get commandParamInput() {
    return this._commandParam.internalValue;
  }

  // http_param - computed: false, optional: true, required: false
  private _httpParam = new ServicestageComponentInstanceConfigurationProbeLivenessHttpParamOutputReference(this, "http_param");
  public get httpParam() {
    return this._httpParam;
  }
  public putHttpParam(value: ServicestageComponentInstanceConfigurationProbeLivenessHttpParam) {
    this._httpParam.internalValue = value;
  }
  public resetHttpParam() {
    this._httpParam.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpParamInput() {
    return this._httpParam.internalValue;
  }

  // tcp_param - computed: false, optional: true, required: false
  private _tcpParam = new ServicestageComponentInstanceConfigurationProbeLivenessTcpParamOutputReference(this, "tcp_param");
  public get tcpParam() {
    return this._tcpParam;
  }
  public putTcpParam(value: ServicestageComponentInstanceConfigurationProbeLivenessTcpParam) {
    this._tcpParam.internalValue = value;
  }
  public resetTcpParam() {
    this._tcpParam.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tcpParamInput() {
    return this._tcpParam.internalValue;
  }
}
export interface ServicestageComponentInstanceConfigurationProbeReadinessCommandParam {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#commands ServicestageComponentInstance#commands}
  */
  readonly commands: string[];
}

export function servicestageComponentInstanceConfigurationProbeReadinessCommandParamToTerraform(struct?: ServicestageComponentInstanceConfigurationProbeReadinessCommandParamOutputReference | ServicestageComponentInstanceConfigurationProbeReadinessCommandParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    commands: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.commands),
  }
}


export function servicestageComponentInstanceConfigurationProbeReadinessCommandParamToHclTerraform(struct?: ServicestageComponentInstanceConfigurationProbeReadinessCommandParamOutputReference | ServicestageComponentInstanceConfigurationProbeReadinessCommandParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    commands: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.commands),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationProbeReadinessCommandParamOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationProbeReadinessCommandParam | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._commands !== undefined) {
      hasAnyValues = true;
      internalValueResult.commands = this._commands;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationProbeReadinessCommandParam | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._commands = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._commands = value.commands;
    }
  }

  // commands - computed: false, optional: false, required: true
  private _commands?: string[]; 
  public get commands() {
    return this.getListAttribute('commands');
  }
  public set commands(value: string[]) {
    this._commands = value;
  }
  // Temporarily expose input value. Use with caution.
  public get commandsInput() {
    return this._commands;
  }
}
export interface ServicestageComponentInstanceConfigurationProbeReadinessHttpParam {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#host ServicestageComponentInstance#host}
  */
  readonly host?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#path ServicestageComponentInstance#path}
  */
  readonly path: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#port ServicestageComponentInstance#port}
  */
  readonly port: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#scheme ServicestageComponentInstance#scheme}
  */
  readonly scheme: string;
}

export function servicestageComponentInstanceConfigurationProbeReadinessHttpParamToTerraform(struct?: ServicestageComponentInstanceConfigurationProbeReadinessHttpParamOutputReference | ServicestageComponentInstanceConfigurationProbeReadinessHttpParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    host: cdktf.stringToTerraform(struct!.host),
    path: cdktf.stringToTerraform(struct!.path),
    port: cdktf.numberToTerraform(struct!.port),
    scheme: cdktf.stringToTerraform(struct!.scheme),
  }
}


export function servicestageComponentInstanceConfigurationProbeReadinessHttpParamToHclTerraform(struct?: ServicestageComponentInstanceConfigurationProbeReadinessHttpParamOutputReference | ServicestageComponentInstanceConfigurationProbeReadinessHttpParam): any {
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
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    scheme: {
      value: cdktf.stringToHclTerraform(struct!.scheme),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationProbeReadinessHttpParamOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationProbeReadinessHttpParam | undefined {
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
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._scheme !== undefined) {
      hasAnyValues = true;
      internalValueResult.scheme = this._scheme;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationProbeReadinessHttpParam | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._host = undefined;
      this._path = undefined;
      this._port = undefined;
      this._scheme = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._host = value.host;
      this._path = value.path;
      this._port = value.port;
      this._scheme = value.scheme;
    }
  }

  // host - computed: true, optional: true, required: false
  private _host?: string; 
  public get host() {
    return this.getStringAttribute('host');
  }
  public set host(value: string) {
    this._host = value;
  }
  public resetHost() {
    this._host = undefined;
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

  // port - computed: false, optional: false, required: true
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }

  // scheme - computed: false, optional: false, required: true
  private _scheme?: string; 
  public get scheme() {
    return this.getStringAttribute('scheme');
  }
  public set scheme(value: string) {
    this._scheme = value;
  }
  // Temporarily expose input value. Use with caution.
  public get schemeInput() {
    return this._scheme;
  }
}
export interface ServicestageComponentInstanceConfigurationProbeReadinessTcpParam {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#port ServicestageComponentInstance#port}
  */
  readonly port: number;
}

export function servicestageComponentInstanceConfigurationProbeReadinessTcpParamToTerraform(struct?: ServicestageComponentInstanceConfigurationProbeReadinessTcpParamOutputReference | ServicestageComponentInstanceConfigurationProbeReadinessTcpParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    port: cdktf.numberToTerraform(struct!.port),
  }
}


export function servicestageComponentInstanceConfigurationProbeReadinessTcpParamToHclTerraform(struct?: ServicestageComponentInstanceConfigurationProbeReadinessTcpParamOutputReference | ServicestageComponentInstanceConfigurationProbeReadinessTcpParam): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationProbeReadinessTcpParamOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationProbeReadinessTcpParam | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationProbeReadinessTcpParam | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._port = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._port = value.port;
    }
  }

  // port - computed: false, optional: false, required: true
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }
}
export interface ServicestageComponentInstanceConfigurationProbeReadiness {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#delay ServicestageComponentInstance#delay}
  */
  readonly delay?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#timeout ServicestageComponentInstance#timeout}
  */
  readonly timeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#type ServicestageComponentInstance#type}
  */
  readonly type: string;
  /**
  * command_param block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#command_param ServicestageComponentInstance#command_param}
  */
  readonly commandParam?: ServicestageComponentInstanceConfigurationProbeReadinessCommandParam;
  /**
  * http_param block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#http_param ServicestageComponentInstance#http_param}
  */
  readonly httpParam?: ServicestageComponentInstanceConfigurationProbeReadinessHttpParam;
  /**
  * tcp_param block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#tcp_param ServicestageComponentInstance#tcp_param}
  */
  readonly tcpParam?: ServicestageComponentInstanceConfigurationProbeReadinessTcpParam;
}

export function servicestageComponentInstanceConfigurationProbeReadinessToTerraform(struct?: ServicestageComponentInstanceConfigurationProbeReadinessOutputReference | ServicestageComponentInstanceConfigurationProbeReadiness): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    delay: cdktf.numberToTerraform(struct!.delay),
    timeout: cdktf.numberToTerraform(struct!.timeout),
    type: cdktf.stringToTerraform(struct!.type),
    command_param: servicestageComponentInstanceConfigurationProbeReadinessCommandParamToTerraform(struct!.commandParam),
    http_param: servicestageComponentInstanceConfigurationProbeReadinessHttpParamToTerraform(struct!.httpParam),
    tcp_param: servicestageComponentInstanceConfigurationProbeReadinessTcpParamToTerraform(struct!.tcpParam),
  }
}


export function servicestageComponentInstanceConfigurationProbeReadinessToHclTerraform(struct?: ServicestageComponentInstanceConfigurationProbeReadinessOutputReference | ServicestageComponentInstanceConfigurationProbeReadiness): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    delay: {
      value: cdktf.numberToHclTerraform(struct!.delay),
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
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    command_param: {
      value: servicestageComponentInstanceConfigurationProbeReadinessCommandParamToHclTerraform(struct!.commandParam),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationProbeReadinessCommandParamList",
    },
    http_param: {
      value: servicestageComponentInstanceConfigurationProbeReadinessHttpParamToHclTerraform(struct!.httpParam),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationProbeReadinessHttpParamList",
    },
    tcp_param: {
      value: servicestageComponentInstanceConfigurationProbeReadinessTcpParamToHclTerraform(struct!.tcpParam),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationProbeReadinessTcpParamList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationProbeReadinessOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationProbeReadiness | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._delay !== undefined) {
      hasAnyValues = true;
      internalValueResult.delay = this._delay;
    }
    if (this._timeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.timeout = this._timeout;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._commandParam?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.commandParam = this._commandParam?.internalValue;
    }
    if (this._httpParam?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpParam = this._httpParam?.internalValue;
    }
    if (this._tcpParam?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.tcpParam = this._tcpParam?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationProbeReadiness | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._delay = undefined;
      this._timeout = undefined;
      this._type = undefined;
      this._commandParam.internalValue = undefined;
      this._httpParam.internalValue = undefined;
      this._tcpParam.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._delay = value.delay;
      this._timeout = value.timeout;
      this._type = value.type;
      this._commandParam.internalValue = value.commandParam;
      this._httpParam.internalValue = value.httpParam;
      this._tcpParam.internalValue = value.tcpParam;
    }
  }

  // delay - computed: true, optional: true, required: false
  private _delay?: number; 
  public get delay() {
    return this.getNumberAttribute('delay');
  }
  public set delay(value: number) {
    this._delay = value;
  }
  public resetDelay() {
    this._delay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get delayInput() {
    return this._delay;
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

  // command_param - computed: false, optional: true, required: false
  private _commandParam = new ServicestageComponentInstanceConfigurationProbeReadinessCommandParamOutputReference(this, "command_param");
  public get commandParam() {
    return this._commandParam;
  }
  public putCommandParam(value: ServicestageComponentInstanceConfigurationProbeReadinessCommandParam) {
    this._commandParam.internalValue = value;
  }
  public resetCommandParam() {
    this._commandParam.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get commandParamInput() {
    return this._commandParam.internalValue;
  }

  // http_param - computed: false, optional: true, required: false
  private _httpParam = new ServicestageComponentInstanceConfigurationProbeReadinessHttpParamOutputReference(this, "http_param");
  public get httpParam() {
    return this._httpParam;
  }
  public putHttpParam(value: ServicestageComponentInstanceConfigurationProbeReadinessHttpParam) {
    this._httpParam.internalValue = value;
  }
  public resetHttpParam() {
    this._httpParam.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpParamInput() {
    return this._httpParam.internalValue;
  }

  // tcp_param - computed: false, optional: true, required: false
  private _tcpParam = new ServicestageComponentInstanceConfigurationProbeReadinessTcpParamOutputReference(this, "tcp_param");
  public get tcpParam() {
    return this._tcpParam;
  }
  public putTcpParam(value: ServicestageComponentInstanceConfigurationProbeReadinessTcpParam) {
    this._tcpParam.internalValue = value;
  }
  public resetTcpParam() {
    this._tcpParam.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tcpParamInput() {
    return this._tcpParam.internalValue;
  }
}
export interface ServicestageComponentInstanceConfigurationProbe {
  /**
  * liveness block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#liveness ServicestageComponentInstance#liveness}
  */
  readonly liveness?: ServicestageComponentInstanceConfigurationProbeLiveness;
  /**
  * readiness block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#readiness ServicestageComponentInstance#readiness}
  */
  readonly readiness?: ServicestageComponentInstanceConfigurationProbeReadiness;
}

export function servicestageComponentInstanceConfigurationProbeToTerraform(struct?: ServicestageComponentInstanceConfigurationProbeOutputReference | ServicestageComponentInstanceConfigurationProbe): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    liveness: servicestageComponentInstanceConfigurationProbeLivenessToTerraform(struct!.liveness),
    readiness: servicestageComponentInstanceConfigurationProbeReadinessToTerraform(struct!.readiness),
  }
}


export function servicestageComponentInstanceConfigurationProbeToHclTerraform(struct?: ServicestageComponentInstanceConfigurationProbeOutputReference | ServicestageComponentInstanceConfigurationProbe): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    liveness: {
      value: servicestageComponentInstanceConfigurationProbeLivenessToHclTerraform(struct!.liveness),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationProbeLivenessList",
    },
    readiness: {
      value: servicestageComponentInstanceConfigurationProbeReadinessToHclTerraform(struct!.readiness),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationProbeReadinessList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationProbeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationProbe | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._liveness?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.liveness = this._liveness?.internalValue;
    }
    if (this._readiness?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.readiness = this._readiness?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationProbe | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._liveness.internalValue = undefined;
      this._readiness.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._liveness.internalValue = value.liveness;
      this._readiness.internalValue = value.readiness;
    }
  }

  // liveness - computed: false, optional: true, required: false
  private _liveness = new ServicestageComponentInstanceConfigurationProbeLivenessOutputReference(this, "liveness");
  public get liveness() {
    return this._liveness;
  }
  public putLiveness(value: ServicestageComponentInstanceConfigurationProbeLiveness) {
    this._liveness.internalValue = value;
  }
  public resetLiveness() {
    this._liveness.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get livenessInput() {
    return this._liveness.internalValue;
  }

  // readiness - computed: false, optional: true, required: false
  private _readiness = new ServicestageComponentInstanceConfigurationProbeReadinessOutputReference(this, "readiness");
  public get readiness() {
    return this._readiness;
  }
  public putReadiness(value: ServicestageComponentInstanceConfigurationProbeReadiness) {
    this._readiness.internalValue = value;
  }
  public resetReadiness() {
    this._readiness.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readinessInput() {
    return this._readiness.internalValue;
  }
}
export interface ServicestageComponentInstanceConfigurationSchedulerAffinity {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#availability_zones ServicestageComponentInstance#availability_zones}
  */
  readonly availabilityZones?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#instance_names ServicestageComponentInstance#instance_names}
  */
  readonly instanceNames?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#private_ips ServicestageComponentInstance#private_ips}
  */
  readonly privateIps?: string[];
}

export function servicestageComponentInstanceConfigurationSchedulerAffinityToTerraform(struct?: ServicestageComponentInstanceConfigurationSchedulerAffinityOutputReference | ServicestageComponentInstanceConfigurationSchedulerAffinity): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    availability_zones: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.availabilityZones),
    instance_names: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.instanceNames),
    private_ips: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.privateIps),
  }
}


export function servicestageComponentInstanceConfigurationSchedulerAffinityToHclTerraform(struct?: ServicestageComponentInstanceConfigurationSchedulerAffinityOutputReference | ServicestageComponentInstanceConfigurationSchedulerAffinity): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    availability_zones: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.availabilityZones),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    instance_names: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.instanceNames),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    private_ips: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.privateIps),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationSchedulerAffinityOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationSchedulerAffinity | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._availabilityZones !== undefined) {
      hasAnyValues = true;
      internalValueResult.availabilityZones = this._availabilityZones;
    }
    if (this._instanceNames !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceNames = this._instanceNames;
    }
    if (this._privateIps !== undefined) {
      hasAnyValues = true;
      internalValueResult.privateIps = this._privateIps;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationSchedulerAffinity | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._availabilityZones = undefined;
      this._instanceNames = undefined;
      this._privateIps = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._availabilityZones = value.availabilityZones;
      this._instanceNames = value.instanceNames;
      this._privateIps = value.privateIps;
    }
  }

  // availability_zones - computed: true, optional: true, required: false
  private _availabilityZones?: string[]; 
  public get availabilityZones() {
    return this.getListAttribute('availability_zones');
  }
  public set availabilityZones(value: string[]) {
    this._availabilityZones = value;
  }
  public resetAvailabilityZones() {
    this._availabilityZones = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZonesInput() {
    return this._availabilityZones;
  }

  // instance_names - computed: true, optional: true, required: false
  private _instanceNames?: string[]; 
  public get instanceNames() {
    return this.getListAttribute('instance_names');
  }
  public set instanceNames(value: string[]) {
    this._instanceNames = value;
  }
  public resetInstanceNames() {
    this._instanceNames = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceNamesInput() {
    return this._instanceNames;
  }

  // private_ips - computed: true, optional: true, required: false
  private _privateIps?: string[]; 
  public get privateIps() {
    return this.getListAttribute('private_ips');
  }
  public set privateIps(value: string[]) {
    this._privateIps = value;
  }
  public resetPrivateIps() {
    this._privateIps = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateIpsInput() {
    return this._privateIps;
  }
}
export interface ServicestageComponentInstanceConfigurationSchedulerAntiAffinity {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#availability_zones ServicestageComponentInstance#availability_zones}
  */
  readonly availabilityZones?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#instance_names ServicestageComponentInstance#instance_names}
  */
  readonly instanceNames?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#private_ips ServicestageComponentInstance#private_ips}
  */
  readonly privateIps?: string[];
}

export function servicestageComponentInstanceConfigurationSchedulerAntiAffinityToTerraform(struct?: ServicestageComponentInstanceConfigurationSchedulerAntiAffinityOutputReference | ServicestageComponentInstanceConfigurationSchedulerAntiAffinity): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    availability_zones: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.availabilityZones),
    instance_names: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.instanceNames),
    private_ips: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.privateIps),
  }
}


export function servicestageComponentInstanceConfigurationSchedulerAntiAffinityToHclTerraform(struct?: ServicestageComponentInstanceConfigurationSchedulerAntiAffinityOutputReference | ServicestageComponentInstanceConfigurationSchedulerAntiAffinity): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    availability_zones: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.availabilityZones),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    instance_names: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.instanceNames),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    private_ips: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.privateIps),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationSchedulerAntiAffinityOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationSchedulerAntiAffinity | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._availabilityZones !== undefined) {
      hasAnyValues = true;
      internalValueResult.availabilityZones = this._availabilityZones;
    }
    if (this._instanceNames !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceNames = this._instanceNames;
    }
    if (this._privateIps !== undefined) {
      hasAnyValues = true;
      internalValueResult.privateIps = this._privateIps;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationSchedulerAntiAffinity | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._availabilityZones = undefined;
      this._instanceNames = undefined;
      this._privateIps = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._availabilityZones = value.availabilityZones;
      this._instanceNames = value.instanceNames;
      this._privateIps = value.privateIps;
    }
  }

  // availability_zones - computed: true, optional: true, required: false
  private _availabilityZones?: string[]; 
  public get availabilityZones() {
    return this.getListAttribute('availability_zones');
  }
  public set availabilityZones(value: string[]) {
    this._availabilityZones = value;
  }
  public resetAvailabilityZones() {
    this._availabilityZones = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZonesInput() {
    return this._availabilityZones;
  }

  // instance_names - computed: true, optional: true, required: false
  private _instanceNames?: string[]; 
  public get instanceNames() {
    return this.getListAttribute('instance_names');
  }
  public set instanceNames(value: string[]) {
    this._instanceNames = value;
  }
  public resetInstanceNames() {
    this._instanceNames = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceNamesInput() {
    return this._instanceNames;
  }

  // private_ips - computed: true, optional: true, required: false
  private _privateIps?: string[]; 
  public get privateIps() {
    return this.getListAttribute('private_ips');
  }
  public set privateIps(value: string[]) {
    this._privateIps = value;
  }
  public resetPrivateIps() {
    this._privateIps = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateIpsInput() {
    return this._privateIps;
  }
}
export interface ServicestageComponentInstanceConfigurationScheduler {
  /**
  * affinity block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#affinity ServicestageComponentInstance#affinity}
  */
  readonly affinity?: ServicestageComponentInstanceConfigurationSchedulerAffinity;
  /**
  * anti_affinity block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#anti_affinity ServicestageComponentInstance#anti_affinity}
  */
  readonly antiAffinity?: ServicestageComponentInstanceConfigurationSchedulerAntiAffinity;
}

export function servicestageComponentInstanceConfigurationSchedulerToTerraform(struct?: ServicestageComponentInstanceConfigurationSchedulerOutputReference | ServicestageComponentInstanceConfigurationScheduler): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    affinity: servicestageComponentInstanceConfigurationSchedulerAffinityToTerraform(struct!.affinity),
    anti_affinity: servicestageComponentInstanceConfigurationSchedulerAntiAffinityToTerraform(struct!.antiAffinity),
  }
}


export function servicestageComponentInstanceConfigurationSchedulerToHclTerraform(struct?: ServicestageComponentInstanceConfigurationSchedulerOutputReference | ServicestageComponentInstanceConfigurationScheduler): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    affinity: {
      value: servicestageComponentInstanceConfigurationSchedulerAffinityToHclTerraform(struct!.affinity),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationSchedulerAffinityList",
    },
    anti_affinity: {
      value: servicestageComponentInstanceConfigurationSchedulerAntiAffinityToHclTerraform(struct!.antiAffinity),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationSchedulerAntiAffinityList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationSchedulerOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationScheduler | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._affinity?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.affinity = this._affinity?.internalValue;
    }
    if (this._antiAffinity?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.antiAffinity = this._antiAffinity?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationScheduler | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._affinity.internalValue = undefined;
      this._antiAffinity.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._affinity.internalValue = value.affinity;
      this._antiAffinity.internalValue = value.antiAffinity;
    }
  }

  // affinity - computed: false, optional: true, required: false
  private _affinity = new ServicestageComponentInstanceConfigurationSchedulerAffinityOutputReference(this, "affinity");
  public get affinity() {
    return this._affinity;
  }
  public putAffinity(value: ServicestageComponentInstanceConfigurationSchedulerAffinity) {
    this._affinity.internalValue = value;
  }
  public resetAffinity() {
    this._affinity.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get affinityInput() {
    return this._affinity.internalValue;
  }

  // anti_affinity - computed: false, optional: true, required: false
  private _antiAffinity = new ServicestageComponentInstanceConfigurationSchedulerAntiAffinityOutputReference(this, "anti_affinity");
  public get antiAffinity() {
    return this._antiAffinity;
  }
  public putAntiAffinity(value: ServicestageComponentInstanceConfigurationSchedulerAntiAffinity) {
    this._antiAffinity.internalValue = value;
  }
  public resetAntiAffinity() {
    this._antiAffinity.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get antiAffinityInput() {
    return this._antiAffinity.internalValue;
  }
}
export interface ServicestageComponentInstanceConfigurationStorageMount {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#path ServicestageComponentInstance#path}
  */
  readonly path: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#readonly ServicestageComponentInstance#readonly}
  */
  readonly readonly: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#subpath ServicestageComponentInstance#subpath}
  */
  readonly subpath?: string;
}

export function servicestageComponentInstanceConfigurationStorageMountToTerraform(struct?: ServicestageComponentInstanceConfigurationStorageMount | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    path: cdktf.stringToTerraform(struct!.path),
    readonly: cdktf.booleanToTerraform(struct!.readonly),
    subpath: cdktf.stringToTerraform(struct!.subpath),
  }
}


export function servicestageComponentInstanceConfigurationStorageMountToHclTerraform(struct?: ServicestageComponentInstanceConfigurationStorageMount | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    path: {
      value: cdktf.stringToHclTerraform(struct!.path),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    readonly: {
      value: cdktf.booleanToHclTerraform(struct!.readonly),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    subpath: {
      value: cdktf.stringToHclTerraform(struct!.subpath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationStorageMountOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ServicestageComponentInstanceConfigurationStorageMount | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._readonly !== undefined) {
      hasAnyValues = true;
      internalValueResult.readonly = this._readonly;
    }
    if (this._subpath !== undefined) {
      hasAnyValues = true;
      internalValueResult.subpath = this._subpath;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationStorageMount | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._path = undefined;
      this._readonly = undefined;
      this._subpath = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._path = value.path;
      this._readonly = value.readonly;
      this._subpath = value.subpath;
    }
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

  // readonly - computed: false, optional: false, required: true
  private _readonly?: boolean | cdktf.IResolvable; 
  public get readonly() {
    return this.getBooleanAttribute('readonly');
  }
  public set readonly(value: boolean | cdktf.IResolvable) {
    this._readonly = value;
  }
  // Temporarily expose input value. Use with caution.
  public get readonlyInput() {
    return this._readonly;
  }

  // subpath - computed: true, optional: true, required: false
  private _subpath?: string; 
  public get subpath() {
    return this.getStringAttribute('subpath');
  }
  public set subpath(value: string) {
    this._subpath = value;
  }
  public resetSubpath() {
    this._subpath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subpathInput() {
    return this._subpath;
  }
}

export class ServicestageComponentInstanceConfigurationStorageMountList extends cdktf.ComplexList {
  public internalValue? : ServicestageComponentInstanceConfigurationStorageMount[] | cdktf.IResolvable

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
  public get(index: number): ServicestageComponentInstanceConfigurationStorageMountOutputReference {
    return new ServicestageComponentInstanceConfigurationStorageMountOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ServicestageComponentInstanceConfigurationStorageParameter {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#claim_name ServicestageComponentInstance#claim_name}
  */
  readonly claimName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#name ServicestageComponentInstance#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#path ServicestageComponentInstance#path}
  */
  readonly path?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#secret_name ServicestageComponentInstance#secret_name}
  */
  readonly secretName?: string;
}

export function servicestageComponentInstanceConfigurationStorageParameterToTerraform(struct?: ServicestageComponentInstanceConfigurationStorageParameterOutputReference | ServicestageComponentInstanceConfigurationStorageParameter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    claim_name: cdktf.stringToTerraform(struct!.claimName),
    name: cdktf.stringToTerraform(struct!.name),
    path: cdktf.stringToTerraform(struct!.path),
    secret_name: cdktf.stringToTerraform(struct!.secretName),
  }
}


export function servicestageComponentInstanceConfigurationStorageParameterToHclTerraform(struct?: ServicestageComponentInstanceConfigurationStorageParameterOutputReference | ServicestageComponentInstanceConfigurationStorageParameter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    claim_name: {
      value: cdktf.stringToHclTerraform(struct!.claimName),
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
    secret_name: {
      value: cdktf.stringToHclTerraform(struct!.secretName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationStorageParameterOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationStorageParameter | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._claimName !== undefined) {
      hasAnyValues = true;
      internalValueResult.claimName = this._claimName;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._path !== undefined) {
      hasAnyValues = true;
      internalValueResult.path = this._path;
    }
    if (this._secretName !== undefined) {
      hasAnyValues = true;
      internalValueResult.secretName = this._secretName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationStorageParameter | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._claimName = undefined;
      this._name = undefined;
      this._path = undefined;
      this._secretName = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._claimName = value.claimName;
      this._name = value.name;
      this._path = value.path;
      this._secretName = value.secretName;
    }
  }

  // claim_name - computed: true, optional: true, required: false
  private _claimName?: string; 
  public get claimName() {
    return this.getStringAttribute('claim_name');
  }
  public set claimName(value: string) {
    this._claimName = value;
  }
  public resetClaimName() {
    this._claimName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get claimNameInput() {
    return this._claimName;
  }

  // name - computed: true, optional: true, required: false
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

  // path - computed: true, optional: true, required: false
  private _path?: string; 
  public get path() {
    return this.getStringAttribute('path');
  }
  public set path(value: string) {
    this._path = value;
  }
  public resetPath() {
    this._path = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pathInput() {
    return this._path;
  }

  // secret_name - computed: true, optional: true, required: false
  private _secretName?: string; 
  public get secretName() {
    return this.getStringAttribute('secret_name');
  }
  public set secretName(value: string) {
    this._secretName = value;
  }
  public resetSecretName() {
    this._secretName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretNameInput() {
    return this._secretName;
  }
}
export interface ServicestageComponentInstanceConfigurationStorage {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#type ServicestageComponentInstance#type}
  */
  readonly type: string;
  /**
  * mount block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#mount ServicestageComponentInstance#mount}
  */
  readonly mount: ServicestageComponentInstanceConfigurationStorageMount[] | cdktf.IResolvable;
  /**
  * parameter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#parameter ServicestageComponentInstance#parameter}
  */
  readonly parameter: ServicestageComponentInstanceConfigurationStorageParameter;
}

export function servicestageComponentInstanceConfigurationStorageToTerraform(struct?: ServicestageComponentInstanceConfigurationStorage | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    mount: cdktf.listMapper(servicestageComponentInstanceConfigurationStorageMountToTerraform, true)(struct!.mount),
    parameter: servicestageComponentInstanceConfigurationStorageParameterToTerraform(struct!.parameter),
  }
}


export function servicestageComponentInstanceConfigurationStorageToHclTerraform(struct?: ServicestageComponentInstanceConfigurationStorage | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    mount: {
      value: cdktf.listMapperHcl(servicestageComponentInstanceConfigurationStorageMountToHclTerraform, true)(struct!.mount),
      isBlock: true,
      type: "set",
      storageClassType: "ServicestageComponentInstanceConfigurationStorageMountList",
    },
    parameter: {
      value: servicestageComponentInstanceConfigurationStorageParameterToHclTerraform(struct!.parameter),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationStorageParameterList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationStorageOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ServicestageComponentInstanceConfigurationStorage | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._mount?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.mount = this._mount?.internalValue;
    }
    if (this._parameter?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.parameter = this._parameter?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationStorage | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._type = undefined;
      this._mount.internalValue = undefined;
      this._parameter.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._type = value.type;
      this._mount.internalValue = value.mount;
      this._parameter.internalValue = value.parameter;
    }
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

  // mount - computed: false, optional: false, required: true
  private _mount = new ServicestageComponentInstanceConfigurationStorageMountList(this, "mount", true);
  public get mount() {
    return this._mount;
  }
  public putMount(value: ServicestageComponentInstanceConfigurationStorageMount[] | cdktf.IResolvable) {
    this._mount.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get mountInput() {
    return this._mount.internalValue;
  }

  // parameter - computed: false, optional: false, required: true
  private _parameter = new ServicestageComponentInstanceConfigurationStorageParameterOutputReference(this, "parameter");
  public get parameter() {
    return this._parameter;
  }
  public putParameter(value: ServicestageComponentInstanceConfigurationStorageParameter) {
    this._parameter.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get parameterInput() {
    return this._parameter.internalValue;
  }
}

export class ServicestageComponentInstanceConfigurationStorageList extends cdktf.ComplexList {
  public internalValue? : ServicestageComponentInstanceConfigurationStorage[] | cdktf.IResolvable

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
  public get(index: number): ServicestageComponentInstanceConfigurationStorageOutputReference {
    return new ServicestageComponentInstanceConfigurationStorageOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ServicestageComponentInstanceConfigurationStrategy {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#upgrade ServicestageComponentInstance#upgrade}
  */
  readonly upgrade?: string;
}

export function servicestageComponentInstanceConfigurationStrategyToTerraform(struct?: ServicestageComponentInstanceConfigurationStrategyOutputReference | ServicestageComponentInstanceConfigurationStrategy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    upgrade: cdktf.stringToTerraform(struct!.upgrade),
  }
}


export function servicestageComponentInstanceConfigurationStrategyToHclTerraform(struct?: ServicestageComponentInstanceConfigurationStrategyOutputReference | ServicestageComponentInstanceConfigurationStrategy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    upgrade: {
      value: cdktf.stringToHclTerraform(struct!.upgrade),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationStrategyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfigurationStrategy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._upgrade !== undefined) {
      hasAnyValues = true;
      internalValueResult.upgrade = this._upgrade;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfigurationStrategy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._upgrade = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._upgrade = value.upgrade;
    }
  }

  // upgrade - computed: false, optional: true, required: false
  private _upgrade?: string; 
  public get upgrade() {
    return this.getStringAttribute('upgrade');
  }
  public set upgrade(value: string) {
    this._upgrade = value;
  }
  public resetUpgrade() {
    this._upgrade = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get upgradeInput() {
    return this._upgrade;
  }
}
export interface ServicestageComponentInstanceConfiguration {
  /**
  * env_variable block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#env_variable ServicestageComponentInstance#env_variable}
  */
  readonly envVariable?: ServicestageComponentInstanceConfigurationEnvVariable[] | cdktf.IResolvable;
  /**
  * lifecycle block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#lifecycle ServicestageComponentInstance#lifecycle}
  */
  readonly lifecycle?: ServicestageComponentInstanceConfigurationLifecycle;
  /**
  * log_collection_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#log_collection_policy ServicestageComponentInstance#log_collection_policy}
  */
  readonly logCollectionPolicy?: ServicestageComponentInstanceConfigurationLogCollectionPolicy[] | cdktf.IResolvable;
  /**
  * probe block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#probe ServicestageComponentInstance#probe}
  */
  readonly probe?: ServicestageComponentInstanceConfigurationProbe;
  /**
  * scheduler block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#scheduler ServicestageComponentInstance#scheduler}
  */
  readonly scheduler?: ServicestageComponentInstanceConfigurationScheduler;
  /**
  * storage block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#storage ServicestageComponentInstance#storage}
  */
  readonly storage?: ServicestageComponentInstanceConfigurationStorage[] | cdktf.IResolvable;
  /**
  * strategy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#strategy ServicestageComponentInstance#strategy}
  */
  readonly strategy?: ServicestageComponentInstanceConfigurationStrategy;
}

export function servicestageComponentInstanceConfigurationToTerraform(struct?: ServicestageComponentInstanceConfigurationOutputReference | ServicestageComponentInstanceConfiguration): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    env_variable: cdktf.listMapper(servicestageComponentInstanceConfigurationEnvVariableToTerraform, true)(struct!.envVariable),
    lifecycle: servicestageComponentInstanceConfigurationLifecycleToTerraform(struct!.lifecycle),
    log_collection_policy: cdktf.listMapper(servicestageComponentInstanceConfigurationLogCollectionPolicyToTerraform, true)(struct!.logCollectionPolicy),
    probe: servicestageComponentInstanceConfigurationProbeToTerraform(struct!.probe),
    scheduler: servicestageComponentInstanceConfigurationSchedulerToTerraform(struct!.scheduler),
    storage: cdktf.listMapper(servicestageComponentInstanceConfigurationStorageToTerraform, true)(struct!.storage),
    strategy: servicestageComponentInstanceConfigurationStrategyToTerraform(struct!.strategy),
  }
}


export function servicestageComponentInstanceConfigurationToHclTerraform(struct?: ServicestageComponentInstanceConfigurationOutputReference | ServicestageComponentInstanceConfiguration): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    env_variable: {
      value: cdktf.listMapperHcl(servicestageComponentInstanceConfigurationEnvVariableToHclTerraform, true)(struct!.envVariable),
      isBlock: true,
      type: "set",
      storageClassType: "ServicestageComponentInstanceConfigurationEnvVariableList",
    },
    lifecycle: {
      value: servicestageComponentInstanceConfigurationLifecycleToHclTerraform(struct!.lifecycle),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationLifecycleList",
    },
    log_collection_policy: {
      value: cdktf.listMapperHcl(servicestageComponentInstanceConfigurationLogCollectionPolicyToHclTerraform, true)(struct!.logCollectionPolicy),
      isBlock: true,
      type: "set",
      storageClassType: "ServicestageComponentInstanceConfigurationLogCollectionPolicyList",
    },
    probe: {
      value: servicestageComponentInstanceConfigurationProbeToHclTerraform(struct!.probe),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationProbeList",
    },
    scheduler: {
      value: servicestageComponentInstanceConfigurationSchedulerToHclTerraform(struct!.scheduler),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationSchedulerList",
    },
    storage: {
      value: cdktf.listMapperHcl(servicestageComponentInstanceConfigurationStorageToHclTerraform, true)(struct!.storage),
      isBlock: true,
      type: "set",
      storageClassType: "ServicestageComponentInstanceConfigurationStorageList",
    },
    strategy: {
      value: servicestageComponentInstanceConfigurationStrategyToHclTerraform(struct!.strategy),
      isBlock: true,
      type: "list",
      storageClassType: "ServicestageComponentInstanceConfigurationStrategyList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceConfigurationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ServicestageComponentInstanceConfiguration | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._envVariable?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.envVariable = this._envVariable?.internalValue;
    }
    if (this._lifecycle?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.lifecycle = this._lifecycle?.internalValue;
    }
    if (this._logCollectionPolicy?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.logCollectionPolicy = this._logCollectionPolicy?.internalValue;
    }
    if (this._probe?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.probe = this._probe?.internalValue;
    }
    if (this._scheduler?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.scheduler = this._scheduler?.internalValue;
    }
    if (this._storage?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.storage = this._storage?.internalValue;
    }
    if (this._strategy?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.strategy = this._strategy?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceConfiguration | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._envVariable.internalValue = undefined;
      this._lifecycle.internalValue = undefined;
      this._logCollectionPolicy.internalValue = undefined;
      this._probe.internalValue = undefined;
      this._scheduler.internalValue = undefined;
      this._storage.internalValue = undefined;
      this._strategy.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._envVariable.internalValue = value.envVariable;
      this._lifecycle.internalValue = value.lifecycle;
      this._logCollectionPolicy.internalValue = value.logCollectionPolicy;
      this._probe.internalValue = value.probe;
      this._scheduler.internalValue = value.scheduler;
      this._storage.internalValue = value.storage;
      this._strategy.internalValue = value.strategy;
    }
  }

  // env_variable - computed: false, optional: true, required: false
  private _envVariable = new ServicestageComponentInstanceConfigurationEnvVariableList(this, "env_variable", true);
  public get envVariable() {
    return this._envVariable;
  }
  public putEnvVariable(value: ServicestageComponentInstanceConfigurationEnvVariable[] | cdktf.IResolvable) {
    this._envVariable.internalValue = value;
  }
  public resetEnvVariable() {
    this._envVariable.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get envVariableInput() {
    return this._envVariable.internalValue;
  }

  // lifecycle - computed: false, optional: true, required: false
  private _lifecycle = new ServicestageComponentInstanceConfigurationLifecycleOutputReference(this, "lifecycle");
  public get lifecycle() {
    return this._lifecycle;
  }
  public putLifecycle(value: ServicestageComponentInstanceConfigurationLifecycle) {
    this._lifecycle.internalValue = value;
  }
  public resetLifecycle() {
    this._lifecycle.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lifecycleInput() {
    return this._lifecycle.internalValue;
  }

  // log_collection_policy - computed: false, optional: true, required: false
  private _logCollectionPolicy = new ServicestageComponentInstanceConfigurationLogCollectionPolicyList(this, "log_collection_policy", true);
  public get logCollectionPolicy() {
    return this._logCollectionPolicy;
  }
  public putLogCollectionPolicy(value: ServicestageComponentInstanceConfigurationLogCollectionPolicy[] | cdktf.IResolvable) {
    this._logCollectionPolicy.internalValue = value;
  }
  public resetLogCollectionPolicy() {
    this._logCollectionPolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logCollectionPolicyInput() {
    return this._logCollectionPolicy.internalValue;
  }

  // probe - computed: false, optional: true, required: false
  private _probe = new ServicestageComponentInstanceConfigurationProbeOutputReference(this, "probe");
  public get probe() {
    return this._probe;
  }
  public putProbe(value: ServicestageComponentInstanceConfigurationProbe) {
    this._probe.internalValue = value;
  }
  public resetProbe() {
    this._probe.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get probeInput() {
    return this._probe.internalValue;
  }

  // scheduler - computed: false, optional: true, required: false
  private _scheduler = new ServicestageComponentInstanceConfigurationSchedulerOutputReference(this, "scheduler");
  public get scheduler() {
    return this._scheduler;
  }
  public putScheduler(value: ServicestageComponentInstanceConfigurationScheduler) {
    this._scheduler.internalValue = value;
  }
  public resetScheduler() {
    this._scheduler.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schedulerInput() {
    return this._scheduler.internalValue;
  }

  // storage - computed: false, optional: true, required: false
  private _storage = new ServicestageComponentInstanceConfigurationStorageList(this, "storage", true);
  public get storage() {
    return this._storage;
  }
  public putStorage(value: ServicestageComponentInstanceConfigurationStorage[] | cdktf.IResolvable) {
    this._storage.internalValue = value;
  }
  public resetStorage() {
    this._storage.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storageInput() {
    return this._storage.internalValue;
  }

  // strategy - computed: false, optional: true, required: false
  private _strategy = new ServicestageComponentInstanceConfigurationStrategyOutputReference(this, "strategy");
  public get strategy() {
    return this._strategy;
  }
  public putStrategy(value: ServicestageComponentInstanceConfigurationStrategy) {
    this._strategy.internalValue = value;
  }
  public resetStrategy() {
    this._strategy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get strategyInput() {
    return this._strategy.internalValue;
  }
}
export interface ServicestageComponentInstanceExternalAccess {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#address ServicestageComponentInstance#address}
  */
  readonly address?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#port ServicestageComponentInstance#port}
  */
  readonly port?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#protocol ServicestageComponentInstance#protocol}
  */
  readonly protocol?: string;
}

export function servicestageComponentInstanceExternalAccessToTerraform(struct?: ServicestageComponentInstanceExternalAccess | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    address: cdktf.stringToTerraform(struct!.address),
    port: cdktf.numberToTerraform(struct!.port),
    protocol: cdktf.stringToTerraform(struct!.protocol),
  }
}


export function servicestageComponentInstanceExternalAccessToHclTerraform(struct?: ServicestageComponentInstanceExternalAccess | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    address: {
      value: cdktf.stringToHclTerraform(struct!.address),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    protocol: {
      value: cdktf.stringToHclTerraform(struct!.protocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceExternalAccessOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ServicestageComponentInstanceExternalAccess | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._address !== undefined) {
      hasAnyValues = true;
      internalValueResult.address = this._address;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceExternalAccess | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._address = undefined;
      this._port = undefined;
      this._protocol = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._address = value.address;
      this._port = value.port;
      this._protocol = value.protocol;
    }
  }

  // address - computed: true, optional: true, required: false
  private _address?: string; 
  public get address() {
    return this.getStringAttribute('address');
  }
  public set address(value: string) {
    this._address = value;
  }
  public resetAddress() {
    this._address = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressInput() {
    return this._address;
  }

  // port - computed: true, optional: true, required: false
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }

  // protocol - computed: true, optional: true, required: false
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  public resetProtocol() {
    this._protocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }
}

export class ServicestageComponentInstanceExternalAccessList extends cdktf.ComplexList {
  public internalValue? : ServicestageComponentInstanceExternalAccess[] | cdktf.IResolvable

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
  public get(index: number): ServicestageComponentInstanceExternalAccessOutputReference {
    return new ServicestageComponentInstanceExternalAccessOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ServicestageComponentInstanceReferResource {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#alias ServicestageComponentInstance#alias}
  */
  readonly alias?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#id ServicestageComponentInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#parameters ServicestageComponentInstance#parameters}
  */
  readonly parameters?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#type ServicestageComponentInstance#type}
  */
  readonly type: string;
}

export function servicestageComponentInstanceReferResourceToTerraform(struct?: ServicestageComponentInstanceReferResource | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    alias: cdktf.stringToTerraform(struct!.alias),
    id: cdktf.stringToTerraform(struct!.id),
    parameters: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.parameters),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function servicestageComponentInstanceReferResourceToHclTerraform(struct?: ServicestageComponentInstanceReferResource | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    alias: {
      value: cdktf.stringToHclTerraform(struct!.alias),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    parameters: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.parameters),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
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

export class ServicestageComponentInstanceReferResourceOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ServicestageComponentInstanceReferResource | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._alias !== undefined) {
      hasAnyValues = true;
      internalValueResult.alias = this._alias;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._parameters !== undefined) {
      hasAnyValues = true;
      internalValueResult.parameters = this._parameters;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceReferResource | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._alias = undefined;
      this._id = undefined;
      this._parameters = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._alias = value.alias;
      this._id = value.id;
      this._parameters = value.parameters;
      this._type = value.type;
    }
  }

  // alias - computed: true, optional: true, required: false
  private _alias?: string; 
  public get alias() {
    return this.getStringAttribute('alias');
  }
  public set alias(value: string) {
    this._alias = value;
  }
  public resetAlias() {
    this._alias = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aliasInput() {
    return this._alias;
  }

  // id - computed: false, optional: false, required: true
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // parameters - computed: true, optional: true, required: false
  private _parameters?: { [key: string]: string }; 
  public get parameters() {
    return this.getStringMapAttribute('parameters');
  }
  public set parameters(value: { [key: string]: string }) {
    this._parameters = value;
  }
  public resetParameters() {
    this._parameters = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parametersInput() {
    return this._parameters;
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

export class ServicestageComponentInstanceReferResourceList extends cdktf.ComplexList {
  public internalValue? : ServicestageComponentInstanceReferResource[] | cdktf.IResolvable

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
  public get(index: number): ServicestageComponentInstanceReferResourceOutputReference {
    return new ServicestageComponentInstanceReferResourceOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ServicestageComponentInstanceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#create ServicestageComponentInstance#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#delete ServicestageComponentInstance#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#update ServicestageComponentInstance#update}
  */
  readonly update?: string;
}

export function servicestageComponentInstanceTimeoutsToTerraform(struct?: ServicestageComponentInstanceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function servicestageComponentInstanceTimeoutsToHclTerraform(struct?: ServicestageComponentInstanceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ServicestageComponentInstanceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): ServicestageComponentInstanceTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ServicestageComponentInstanceTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._delete = value.delete;
      this._update = value.update;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance huaweicloud_servicestage_component_instance}
*/
export class ServicestageComponentInstance extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_servicestage_component_instance";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ServicestageComponentInstance resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ServicestageComponentInstance to import
  * @param importFromId The id of the existing ServicestageComponentInstance that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ServicestageComponentInstance to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_servicestage_component_instance", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/servicestage_component_instance huaweicloud_servicestage_component_instance} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ServicestageComponentInstanceConfig
  */
  public constructor(scope: Construct, id: string, config: ServicestageComponentInstanceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_servicestage_component_instance',
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
    this._applicationId = config.applicationId;
    this._componentId = config.componentId;
    this._description = config.description;
    this._environmentId = config.environmentId;
    this._flavorId = config.flavorId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._replica = config.replica;
    this._version = config.version;
    this._artifact.internalValue = config.artifact;
    this._configuration.internalValue = config.configuration;
    this._externalAccess.internalValue = config.externalAccess;
    this._referResource.internalValue = config.referResource;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // application_id - computed: false, optional: false, required: true
  private _applicationId?: string; 
  public get applicationId() {
    return this.getStringAttribute('application_id');
  }
  public set applicationId(value: string) {
    this._applicationId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get applicationIdInput() {
    return this._applicationId;
  }

  // component_id - computed: false, optional: false, required: true
  private _componentId?: string; 
  public get componentId() {
    return this.getStringAttribute('component_id');
  }
  public set componentId(value: string) {
    this._componentId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get componentIdInput() {
    return this._componentId;
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

  // environment_id - computed: false, optional: false, required: true
  private _environmentId?: string; 
  public get environmentId() {
    return this.getStringAttribute('environment_id');
  }
  public set environmentId(value: string) {
    this._environmentId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get environmentIdInput() {
    return this._environmentId;
  }

  // flavor_id - computed: false, optional: false, required: true
  private _flavorId?: string; 
  public get flavorId() {
    return this.getStringAttribute('flavor_id');
  }
  public set flavorId(value: string) {
    this._flavorId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorIdInput() {
    return this._flavorId;
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

  // replica - computed: false, optional: false, required: true
  private _replica?: number; 
  public get replica() {
    return this.getNumberAttribute('replica');
  }
  public set replica(value: number) {
    this._replica = value;
  }
  // Temporarily expose input value. Use with caution.
  public get replicaInput() {
    return this._replica;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // version - computed: false, optional: false, required: true
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // artifact - computed: false, optional: true, required: false
  private _artifact = new ServicestageComponentInstanceArtifactList(this, "artifact", true);
  public get artifact() {
    return this._artifact;
  }
  public putArtifact(value: ServicestageComponentInstanceArtifact[] | cdktf.IResolvable) {
    this._artifact.internalValue = value;
  }
  public resetArtifact() {
    this._artifact.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get artifactInput() {
    return this._artifact.internalValue;
  }

  // configuration - computed: false, optional: true, required: false
  private _configuration = new ServicestageComponentInstanceConfigurationOutputReference(this, "configuration");
  public get configuration() {
    return this._configuration;
  }
  public putConfiguration(value: ServicestageComponentInstanceConfiguration) {
    this._configuration.internalValue = value;
  }
  public resetConfiguration() {
    this._configuration.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get configurationInput() {
    return this._configuration.internalValue;
  }

  // external_access - computed: false, optional: true, required: false
  private _externalAccess = new ServicestageComponentInstanceExternalAccessList(this, "external_access", true);
  public get externalAccess() {
    return this._externalAccess;
  }
  public putExternalAccess(value: ServicestageComponentInstanceExternalAccess[] | cdktf.IResolvable) {
    this._externalAccess.internalValue = value;
  }
  public resetExternalAccess() {
    this._externalAccess.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get externalAccessInput() {
    return this._externalAccess.internalValue;
  }

  // refer_resource - computed: false, optional: false, required: true
  private _referResource = new ServicestageComponentInstanceReferResourceList(this, "refer_resource", true);
  public get referResource() {
    return this._referResource;
  }
  public putReferResource(value: ServicestageComponentInstanceReferResource[] | cdktf.IResolvable) {
    this._referResource.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get referResourceInput() {
    return this._referResource.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new ServicestageComponentInstanceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: ServicestageComponentInstanceTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      application_id: cdktf.stringToTerraform(this._applicationId),
      component_id: cdktf.stringToTerraform(this._componentId),
      description: cdktf.stringToTerraform(this._description),
      environment_id: cdktf.stringToTerraform(this._environmentId),
      flavor_id: cdktf.stringToTerraform(this._flavorId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      replica: cdktf.numberToTerraform(this._replica),
      version: cdktf.stringToTerraform(this._version),
      artifact: cdktf.listMapper(servicestageComponentInstanceArtifactToTerraform, true)(this._artifact.internalValue),
      configuration: servicestageComponentInstanceConfigurationToTerraform(this._configuration.internalValue),
      external_access: cdktf.listMapper(servicestageComponentInstanceExternalAccessToTerraform, true)(this._externalAccess.internalValue),
      refer_resource: cdktf.listMapper(servicestageComponentInstanceReferResourceToTerraform, true)(this._referResource.internalValue),
      timeouts: servicestageComponentInstanceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      application_id: {
        value: cdktf.stringToHclTerraform(this._applicationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      component_id: {
        value: cdktf.stringToHclTerraform(this._componentId),
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
      environment_id: {
        value: cdktf.stringToHclTerraform(this._environmentId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      flavor_id: {
        value: cdktf.stringToHclTerraform(this._flavorId),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      replica: {
        value: cdktf.numberToHclTerraform(this._replica),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      version: {
        value: cdktf.stringToHclTerraform(this._version),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      artifact: {
        value: cdktf.listMapperHcl(servicestageComponentInstanceArtifactToHclTerraform, true)(this._artifact.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ServicestageComponentInstanceArtifactList",
      },
      configuration: {
        value: servicestageComponentInstanceConfigurationToHclTerraform(this._configuration.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "ServicestageComponentInstanceConfigurationList",
      },
      external_access: {
        value: cdktf.listMapperHcl(servicestageComponentInstanceExternalAccessToHclTerraform, true)(this._externalAccess.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ServicestageComponentInstanceExternalAccessList",
      },
      refer_resource: {
        value: cdktf.listMapperHcl(servicestageComponentInstanceReferResourceToHclTerraform, true)(this._referResource.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ServicestageComponentInstanceReferResourceList",
      },
      timeouts: {
        value: servicestageComponentInstanceTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "ServicestageComponentInstanceTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

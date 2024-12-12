// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ApigCustomAuthorizerConfig extends cdktf.TerraformMetaArguments {
  /**
  * The maximum cache age.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#cache_age ApigCustomAuthorizer#cache_age}
  */
  readonly cacheAge?: number;
  /**
  * The version alias URI of the FGS function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#function_alias_uri ApigCustomAuthorizer#function_alias_uri}
  */
  readonly functionAliasUri?: string;
  /**
  * The URN of the FGS function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#function_urn ApigCustomAuthorizer#function_urn}
  */
  readonly functionUrn: string;
  /**
  * The version of the FGS function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#function_version ApigCustomAuthorizer#function_version}
  */
  readonly functionVersion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#id ApigCustomAuthorizer#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the dedicated instance to which the custom authorizer belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#instance_id ApigCustomAuthorizer#instance_id}
  */
  readonly instanceId: string;
  /**
  * Whether to send the body.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#is_body_send ApigCustomAuthorizer#is_body_send}
  */
  readonly isBodySend?: boolean | cdktf.IResolvable;
  /**
  * The name of the custom authorizer.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#name ApigCustomAuthorizer#name}
  */
  readonly name: string;
  /**
  * The framework type of the function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#network_type ApigCustomAuthorizer#network_type}
  */
  readonly networkType?: string;
  /**
  * The region where the custom authorizer is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#region ApigCustomAuthorizer#region}
  */
  readonly region?: string;
  /**
  * The custom authorization type
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#type ApigCustomAuthorizer#type}
  */
  readonly type?: string;
  /**
  * The user data for custom authorizer function.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#user_data ApigCustomAuthorizer#user_data}
  */
  readonly userData?: string;
  /**
  * identity block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#identity ApigCustomAuthorizer#identity}
  */
  readonly identity?: ApigCustomAuthorizerIdentity[] | cdktf.IResolvable;
}
export interface ApigCustomAuthorizerIdentity {
  /**
  * The parameter location.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#location ApigCustomAuthorizer#location}
  */
  readonly location: string;
  /**
  * The name of the parameter to be verified.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#name ApigCustomAuthorizer#name}
  */
  readonly name: string;
  /**
  * The parameter verification expression.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#validation ApigCustomAuthorizer#validation}
  */
  readonly validation?: string;
}

export function apigCustomAuthorizerIdentityToTerraform(struct?: ApigCustomAuthorizerIdentity | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    location: cdktf.stringToTerraform(struct!.location),
    name: cdktf.stringToTerraform(struct!.name),
    validation: cdktf.stringToTerraform(struct!.validation),
  }
}


export function apigCustomAuthorizerIdentityToHclTerraform(struct?: ApigCustomAuthorizerIdentity | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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
    validation: {
      value: cdktf.stringToHclTerraform(struct!.validation),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class ApigCustomAuthorizerIdentityOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): ApigCustomAuthorizerIdentity | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._location !== undefined) {
      hasAnyValues = true;
      internalValueResult.location = this._location;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._validation !== undefined) {
      hasAnyValues = true;
      internalValueResult.validation = this._validation;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ApigCustomAuthorizerIdentity | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._location = undefined;
      this._name = undefined;
      this._validation = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._location = value.location;
      this._name = value.name;
      this._validation = value.validation;
    }
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

  // validation - computed: false, optional: true, required: false
  private _validation?: string; 
  public get validation() {
    return this.getStringAttribute('validation');
  }
  public set validation(value: string) {
    this._validation = value;
  }
  public resetValidation() {
    this._validation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get validationInput() {
    return this._validation;
  }
}

export class ApigCustomAuthorizerIdentityList extends cdktf.ComplexList {
  public internalValue? : ApigCustomAuthorizerIdentity[] | cdktf.IResolvable

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
  public get(index: number): ApigCustomAuthorizerIdentityOutputReference {
    return new ApigCustomAuthorizerIdentityOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer huaweicloud_apig_custom_authorizer}
*/
export class ApigCustomAuthorizer extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_apig_custom_authorizer";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a ApigCustomAuthorizer resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the ApigCustomAuthorizer to import
  * @param importFromId The id of the existing ApigCustomAuthorizer that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the ApigCustomAuthorizer to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_apig_custom_authorizer", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/apig_custom_authorizer huaweicloud_apig_custom_authorizer} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ApigCustomAuthorizerConfig
  */
  public constructor(scope: Construct, id: string, config: ApigCustomAuthorizerConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_apig_custom_authorizer',
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
    this._cacheAge = config.cacheAge;
    this._functionAliasUri = config.functionAliasUri;
    this._functionUrn = config.functionUrn;
    this._functionVersion = config.functionVersion;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._isBodySend = config.isBodySend;
    this._name = config.name;
    this._networkType = config.networkType;
    this._region = config.region;
    this._type = config.type;
    this._userData = config.userData;
    this._identity.internalValue = config.identity;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cache_age - computed: false, optional: true, required: false
  private _cacheAge?: number; 
  public get cacheAge() {
    return this.getNumberAttribute('cache_age');
  }
  public set cacheAge(value: number) {
    this._cacheAge = value;
  }
  public resetCacheAge() {
    this._cacheAge = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cacheAgeInput() {
    return this._cacheAge;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // function_alias_uri - computed: true, optional: true, required: false
  private _functionAliasUri?: string; 
  public get functionAliasUri() {
    return this.getStringAttribute('function_alias_uri');
  }
  public set functionAliasUri(value: string) {
    this._functionAliasUri = value;
  }
  public resetFunctionAliasUri() {
    this._functionAliasUri = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get functionAliasUriInput() {
    return this._functionAliasUri;
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

  // function_version - computed: true, optional: true, required: false
  private _functionVersion?: string; 
  public get functionVersion() {
    return this.getStringAttribute('function_version');
  }
  public set functionVersion(value: string) {
    this._functionVersion = value;
  }
  public resetFunctionVersion() {
    this._functionVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get functionVersionInput() {
    return this._functionVersion;
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

  // is_body_send - computed: false, optional: true, required: false
  private _isBodySend?: boolean | cdktf.IResolvable; 
  public get isBodySend() {
    return this.getBooleanAttribute('is_body_send');
  }
  public set isBodySend(value: boolean | cdktf.IResolvable) {
    this._isBodySend = value;
  }
  public resetIsBodySend() {
    this._isBodySend = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isBodySendInput() {
    return this._isBodySend;
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

  // network_type - computed: true, optional: true, required: false
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

  // user_data - computed: false, optional: true, required: false
  private _userData?: string; 
  public get userData() {
    return this.getStringAttribute('user_data');
  }
  public set userData(value: string) {
    this._userData = value;
  }
  public resetUserData() {
    this._userData = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userDataInput() {
    return this._userData;
  }

  // identity - computed: false, optional: true, required: false
  private _identity = new ApigCustomAuthorizerIdentityList(this, "identity", true);
  public get identity() {
    return this._identity;
  }
  public putIdentity(value: ApigCustomAuthorizerIdentity[] | cdktf.IResolvable) {
    this._identity.internalValue = value;
  }
  public resetIdentity() {
    this._identity.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get identityInput() {
    return this._identity.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cache_age: cdktf.numberToTerraform(this._cacheAge),
      function_alias_uri: cdktf.stringToTerraform(this._functionAliasUri),
      function_urn: cdktf.stringToTerraform(this._functionUrn),
      function_version: cdktf.stringToTerraform(this._functionVersion),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      is_body_send: cdktf.booleanToTerraform(this._isBodySend),
      name: cdktf.stringToTerraform(this._name),
      network_type: cdktf.stringToTerraform(this._networkType),
      region: cdktf.stringToTerraform(this._region),
      type: cdktf.stringToTerraform(this._type),
      user_data: cdktf.stringToTerraform(this._userData),
      identity: cdktf.listMapper(apigCustomAuthorizerIdentityToTerraform, true)(this._identity.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cache_age: {
        value: cdktf.numberToHclTerraform(this._cacheAge),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      function_alias_uri: {
        value: cdktf.stringToHclTerraform(this._functionAliasUri),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      function_urn: {
        value: cdktf.stringToHclTerraform(this._functionUrn),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      function_version: {
        value: cdktf.stringToHclTerraform(this._functionVersion),
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
      is_body_send: {
        value: cdktf.booleanToHclTerraform(this._isBodySend),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      network_type: {
        value: cdktf.stringToHclTerraform(this._networkType),
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
      user_data: {
        value: cdktf.stringToHclTerraform(this._userData),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      identity: {
        value: cdktf.listMapperHcl(apigCustomAuthorizerIdentityToHclTerraform, true)(this._identity.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "ApigCustomAuthorizerIdentityList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

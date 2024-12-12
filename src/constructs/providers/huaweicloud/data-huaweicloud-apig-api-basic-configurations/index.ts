// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHuaweicloudApigApiBasicConfigurationsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the ID of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#api_id DataHuaweicloudApigApiBasicConfigurations#api_id}
  */
  readonly apiId?: string;
  /**
  * Specifies the backend type of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#backend_type DataHuaweicloudApigApiBasicConfigurations#backend_type}
  */
  readonly backendType?: string;
  /**
  * Specifies the ID of the environment where the API is published.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#env_id DataHuaweicloudApigApiBasicConfigurations#env_id}
  */
  readonly envId?: string;
  /**
  * Specifies the name of the environment where the API is published.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#env_name DataHuaweicloudApigApiBasicConfigurations#env_name}
  */
  readonly envName?: string;
  /**
  * Specifies the ID of the API group to which the APIs belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#group_id DataHuaweicloudApigApiBasicConfigurations#group_id}
  */
  readonly groupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#id DataHuaweicloudApigApiBasicConfigurations#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the ID of the dedicated instance to which the APIs belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#instance_id DataHuaweicloudApigApiBasicConfigurations#instance_id}
  */
  readonly instanceId: string;
  /**
  * Specifies the name of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#name DataHuaweicloudApigApiBasicConfigurations#name}
  */
  readonly name?: string;
  /**
  * Specifies the parameter name for exact matching.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#precise_search DataHuaweicloudApigApiBasicConfigurations#precise_search}
  */
  readonly preciseSearch?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#region DataHuaweicloudApigApiBasicConfigurations#region}
  */
  readonly region?: string;
  /**
  * Specifies the request method of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#request_method DataHuaweicloudApigApiBasicConfigurations#request_method}
  */
  readonly requestMethod?: string;
  /**
  * Specifies the request address of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#request_path DataHuaweicloudApigApiBasicConfigurations#request_path}
  */
  readonly requestPath?: string;
  /**
  * Specifies the request protocol of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#request_protocol DataHuaweicloudApigApiBasicConfigurations#request_protocol}
  */
  readonly requestProtocol?: string;
  /**
  * Specifies the security authentication mode of the API request.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#security_authentication DataHuaweicloudApigApiBasicConfigurations#security_authentication}
  */
  readonly securityAuthentication?: string;
  /**
  * Specifies the type of the API.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#type DataHuaweicloudApigApiBasicConfigurations#type}
  */
  readonly type?: string;
  /**
  * Specifies the name of the VPC channel.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#vpc_channel_name DataHuaweicloudApigApiBasicConfigurations#vpc_channel_name}
  */
  readonly vpcChannelName?: string;
}
export interface DataHuaweicloudApigApiBasicConfigurationsConfigurations {
}

export function dataHuaweicloudApigApiBasicConfigurationsConfigurationsToTerraform(struct?: DataHuaweicloudApigApiBasicConfigurationsConfigurations): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataHuaweicloudApigApiBasicConfigurationsConfigurationsToHclTerraform(struct?: DataHuaweicloudApigApiBasicConfigurationsConfigurations): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataHuaweicloudApigApiBasicConfigurationsConfigurationsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataHuaweicloudApigApiBasicConfigurationsConfigurations | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHuaweicloudApigApiBasicConfigurationsConfigurations | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // authorizer_id - computed: true, optional: false, required: false
  public get authorizerId() {
    return this.getStringAttribute('authorizer_id');
  }

  // backend_type - computed: true, optional: false, required: false
  public get backendType() {
    return this.getStringAttribute('backend_type');
  }

  // cors - computed: true, optional: false, required: false
  public get cors() {
    return this.getBooleanAttribute('cors');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // env_id - computed: true, optional: false, required: false
  public get envId() {
    return this.getStringAttribute('env_id');
  }

  // env_name - computed: true, optional: false, required: false
  public get envName() {
    return this.getStringAttribute('env_name');
  }

  // group_id - computed: true, optional: false, required: false
  public get groupId() {
    return this.getStringAttribute('group_id');
  }

  // group_name - computed: true, optional: false, required: false
  public get groupName() {
    return this.getStringAttribute('group_name');
  }

  // group_version - computed: true, optional: false, required: false
  public get groupVersion() {
    return this.getStringAttribute('group_version');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // matching - computed: true, optional: false, required: false
  public get matching() {
    return this.getStringAttribute('matching');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // publish_id - computed: true, optional: false, required: false
  public get publishId() {
    return this.getStringAttribute('publish_id');
  }

  // published_at - computed: true, optional: false, required: false
  public get publishedAt() {
    return this.getStringAttribute('published_at');
  }

  // registered_at - computed: true, optional: false, required: false
  public get registeredAt() {
    return this.getStringAttribute('registered_at');
  }

  // request_method - computed: true, optional: false, required: false
  public get requestMethod() {
    return this.getStringAttribute('request_method');
  }

  // request_path - computed: true, optional: false, required: false
  public get requestPath() {
    return this.getStringAttribute('request_path');
  }

  // request_protocol - computed: true, optional: false, required: false
  public get requestProtocol() {
    return this.getStringAttribute('request_protocol');
  }

  // security_authentication - computed: true, optional: false, required: false
  public get securityAuthentication() {
    return this.getStringAttribute('security_authentication');
  }

  // simple_authentication - computed: true, optional: false, required: false
  public get simpleAuthentication() {
    return this.getBooleanAttribute('simple_authentication');
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return cdktf.Fn.tolist(this.getListAttribute('tags'));
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }
}

export class DataHuaweicloudApigApiBasicConfigurationsConfigurationsList extends cdktf.ComplexList {

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
  public get(index: number): DataHuaweicloudApigApiBasicConfigurationsConfigurationsOutputReference {
    return new DataHuaweicloudApigApiBasicConfigurationsConfigurationsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations huaweicloud_apig_api_basic_configurations}
*/
export class DataHuaweicloudApigApiBasicConfigurations extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_apig_api_basic_configurations";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataHuaweicloudApigApiBasicConfigurations resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataHuaweicloudApigApiBasicConfigurations to import
  * @param importFromId The id of the existing DataHuaweicloudApigApiBasicConfigurations that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataHuaweicloudApigApiBasicConfigurations to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_apig_api_basic_configurations", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/data-sources/apig_api_basic_configurations huaweicloud_apig_api_basic_configurations} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHuaweicloudApigApiBasicConfigurationsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHuaweicloudApigApiBasicConfigurationsConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_apig_api_basic_configurations',
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
    this._backendType = config.backendType;
    this._envId = config.envId;
    this._envName = config.envName;
    this._groupId = config.groupId;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._name = config.name;
    this._preciseSearch = config.preciseSearch;
    this._region = config.region;
    this._requestMethod = config.requestMethod;
    this._requestPath = config.requestPath;
    this._requestProtocol = config.requestProtocol;
    this._securityAuthentication = config.securityAuthentication;
    this._type = config.type;
    this._vpcChannelName = config.vpcChannelName;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // api_id - computed: false, optional: true, required: false
  private _apiId?: string; 
  public get apiId() {
    return this.getStringAttribute('api_id');
  }
  public set apiId(value: string) {
    this._apiId = value;
  }
  public resetApiId() {
    this._apiId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get apiIdInput() {
    return this._apiId;
  }

  // backend_type - computed: false, optional: true, required: false
  private _backendType?: string; 
  public get backendType() {
    return this.getStringAttribute('backend_type');
  }
  public set backendType(value: string) {
    this._backendType = value;
  }
  public resetBackendType() {
    this._backendType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendTypeInput() {
    return this._backendType;
  }

  // configurations - computed: true, optional: false, required: false
  private _configurations = new DataHuaweicloudApigApiBasicConfigurationsConfigurationsList(this, "configurations", false);
  public get configurations() {
    return this._configurations;
  }

  // env_id - computed: false, optional: true, required: false
  private _envId?: string; 
  public get envId() {
    return this.getStringAttribute('env_id');
  }
  public set envId(value: string) {
    this._envId = value;
  }
  public resetEnvId() {
    this._envId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get envIdInput() {
    return this._envId;
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

  // group_id - computed: false, optional: true, required: false
  private _groupId?: string; 
  public get groupId() {
    return this.getStringAttribute('group_id');
  }
  public set groupId(value: string) {
    this._groupId = value;
  }
  public resetGroupId() {
    this._groupId = undefined;
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

  // precise_search - computed: false, optional: true, required: false
  private _preciseSearch?: string; 
  public get preciseSearch() {
    return this.getStringAttribute('precise_search');
  }
  public set preciseSearch(value: string) {
    this._preciseSearch = value;
  }
  public resetPreciseSearch() {
    this._preciseSearch = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get preciseSearchInput() {
    return this._preciseSearch;
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

  // request_path - computed: false, optional: true, required: false
  private _requestPath?: string; 
  public get requestPath() {
    return this.getStringAttribute('request_path');
  }
  public set requestPath(value: string) {
    this._requestPath = value;
  }
  public resetRequestPath() {
    this._requestPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requestPathInput() {
    return this._requestPath;
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

  // vpc_channel_name - computed: false, optional: true, required: false
  private _vpcChannelName?: string; 
  public get vpcChannelName() {
    return this.getStringAttribute('vpc_channel_name');
  }
  public set vpcChannelName(value: string) {
    this._vpcChannelName = value;
  }
  public resetVpcChannelName() {
    this._vpcChannelName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcChannelNameInput() {
    return this._vpcChannelName;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      api_id: cdktf.stringToTerraform(this._apiId),
      backend_type: cdktf.stringToTerraform(this._backendType),
      env_id: cdktf.stringToTerraform(this._envId),
      env_name: cdktf.stringToTerraform(this._envName),
      group_id: cdktf.stringToTerraform(this._groupId),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      precise_search: cdktf.stringToTerraform(this._preciseSearch),
      region: cdktf.stringToTerraform(this._region),
      request_method: cdktf.stringToTerraform(this._requestMethod),
      request_path: cdktf.stringToTerraform(this._requestPath),
      request_protocol: cdktf.stringToTerraform(this._requestProtocol),
      security_authentication: cdktf.stringToTerraform(this._securityAuthentication),
      type: cdktf.stringToTerraform(this._type),
      vpc_channel_name: cdktf.stringToTerraform(this._vpcChannelName),
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
      backend_type: {
        value: cdktf.stringToHclTerraform(this._backendType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      env_id: {
        value: cdktf.stringToHclTerraform(this._envId),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      precise_search: {
        value: cdktf.stringToHclTerraform(this._preciseSearch),
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
      security_authentication: {
        value: cdktf.stringToHclTerraform(this._securityAuthentication),
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
      vpc_channel_name: {
        value: cdktf.stringToHclTerraform(this._vpcChannelName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

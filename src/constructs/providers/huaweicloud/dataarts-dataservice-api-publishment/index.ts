// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataartsDataserviceApiPublishmentConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the API to be published.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#api_id DataartsDataserviceApiPublishment#api_id}
  */
  readonly apiId: string;
  /**
  * The APIG group ID to which the published API belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#apig_group_id DataartsDataserviceApiPublishment#apig_group_id}
  */
  readonly apigGroupId?: string;
  /**
  * The  APIG instance ID to which the API is published simultaneously in APIG service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#apig_instance_id DataartsDataserviceApiPublishment#apig_instance_id}
  */
  readonly apigInstanceId?: string;
  /**
  * The type of the APIG object.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#apig_type DataartsDataserviceApiPublishment#apig_type}
  */
  readonly apigType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#id DataartsDataserviceApiPublishment#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The exclusive cluster ID to which the published API belongs in Data Service side.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#instance_id DataartsDataserviceApiPublishment#instance_id}
  */
  readonly instanceId: string;
  /**
  * The region where the API to be published is located.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#region DataartsDataserviceApiPublishment#region}
  */
  readonly region?: string;
  /**
  * The application ID for ROMA APIC.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#roma_app_id DataartsDataserviceApiPublishment#roma_app_id}
  */
  readonly romaAppId?: string;
  /**
  * The workspace ID to which the published API belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#workspace_id DataartsDataserviceApiPublishment#workspace_id}
  */
  readonly workspaceId: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#timeouts DataartsDataserviceApiPublishment#timeouts}
  */
  readonly timeouts?: DataartsDataserviceApiPublishmentTimeouts;
}
export interface DataartsDataserviceApiPublishmentTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#create DataartsDataserviceApiPublishment#create}
  */
  readonly create?: string;
}

export function dataartsDataserviceApiPublishmentTimeoutsToTerraform(struct?: DataartsDataserviceApiPublishmentTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function dataartsDataserviceApiPublishmentTimeoutsToHclTerraform(struct?: DataartsDataserviceApiPublishmentTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsDataserviceApiPublishmentTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DataartsDataserviceApiPublishmentTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsDataserviceApiPublishmentTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment huaweicloud_dataarts_dataservice_api_publishment}
*/
export class DataartsDataserviceApiPublishment extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_dataservice_api_publishment";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataartsDataserviceApiPublishment resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataartsDataserviceApiPublishment to import
  * @param importFromId The id of the existing DataartsDataserviceApiPublishment that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataartsDataserviceApiPublishment to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_dataservice_api_publishment", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_dataservice_api_publishment huaweicloud_dataarts_dataservice_api_publishment} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataartsDataserviceApiPublishmentConfig
  */
  public constructor(scope: Construct, id: string, config: DataartsDataserviceApiPublishmentConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_dataservice_api_publishment',
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
    this._apigGroupId = config.apigGroupId;
    this._apigInstanceId = config.apigInstanceId;
    this._apigType = config.apigType;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._region = config.region;
    this._romaAppId = config.romaAppId;
    this._workspaceId = config.workspaceId;
    this._timeouts.internalValue = config.timeouts;
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

  // apig_group_id - computed: false, optional: true, required: false
  private _apigGroupId?: string; 
  public get apigGroupId() {
    return this.getStringAttribute('apig_group_id');
  }
  public set apigGroupId(value: string) {
    this._apigGroupId = value;
  }
  public resetApigGroupId() {
    this._apigGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get apigGroupIdInput() {
    return this._apigGroupId;
  }

  // apig_instance_id - computed: false, optional: true, required: false
  private _apigInstanceId?: string; 
  public get apigInstanceId() {
    return this.getStringAttribute('apig_instance_id');
  }
  public set apigInstanceId(value: string) {
    this._apigInstanceId = value;
  }
  public resetApigInstanceId() {
    this._apigInstanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get apigInstanceIdInput() {
    return this._apigInstanceId;
  }

  // apig_type - computed: false, optional: true, required: false
  private _apigType?: string; 
  public get apigType() {
    return this.getStringAttribute('apig_type');
  }
  public set apigType(value: string) {
    this._apigType = value;
  }
  public resetApigType() {
    this._apigType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get apigTypeInput() {
    return this._apigType;
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

  // publish_id - computed: true, optional: false, required: false
  public get publishId() {
    return this.getStringAttribute('publish_id');
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

  // roma_app_id - computed: false, optional: true, required: false
  private _romaAppId?: string; 
  public get romaAppId() {
    return this.getStringAttribute('roma_app_id');
  }
  public set romaAppId(value: string) {
    this._romaAppId = value;
  }
  public resetRomaAppId() {
    this._romaAppId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get romaAppIdInput() {
    return this._romaAppId;
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

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DataartsDataserviceApiPublishmentTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DataartsDataserviceApiPublishmentTimeouts) {
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
      api_id: cdktf.stringToTerraform(this._apiId),
      apig_group_id: cdktf.stringToTerraform(this._apigGroupId),
      apig_instance_id: cdktf.stringToTerraform(this._apigInstanceId),
      apig_type: cdktf.stringToTerraform(this._apigType),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      region: cdktf.stringToTerraform(this._region),
      roma_app_id: cdktf.stringToTerraform(this._romaAppId),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      timeouts: dataartsDataserviceApiPublishmentTimeoutsToTerraform(this._timeouts.internalValue),
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
      apig_group_id: {
        value: cdktf.stringToHclTerraform(this._apigGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      apig_instance_id: {
        value: cdktf.stringToHclTerraform(this._apigInstanceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      apig_type: {
        value: cdktf.stringToHclTerraform(this._apigType),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      roma_app_id: {
        value: cdktf.stringToHclTerraform(this._romaAppId),
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
      timeouts: {
        value: dataartsDataserviceApiPublishmentTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DataartsDataserviceApiPublishmentTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

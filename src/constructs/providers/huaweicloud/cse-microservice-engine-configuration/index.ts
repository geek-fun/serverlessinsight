// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CseMicroserviceEngineConfigurationConfig extends cdktf.TerraformMetaArguments {
  /**
  * The user password that used to pass the RBAC control.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#admin_pass CseMicroserviceEngineConfiguration#admin_pass}
  */
  readonly adminPass?: string;
  /**
  * The user name that used to pass the RBAC control.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#admin_user CseMicroserviceEngineConfiguration#admin_user}
  */
  readonly adminUser?: string;
  /**
  * The address that used to request the access token.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#auth_address CseMicroserviceEngineConfiguration#auth_address}
  */
  readonly authAddress: string;
  /**
  * The address that used to send requests and manage configuration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#connect_address CseMicroserviceEngineConfiguration#connect_address}
  */
  readonly connectAddress: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#id CseMicroserviceEngineConfiguration#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The configuration key (item name).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#key CseMicroserviceEngineConfiguration#key}
  */
  readonly key: string;
  /**
  * The configuration status.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#status CseMicroserviceEngineConfiguration#status}
  */
  readonly status?: string;
  /**
  * The key/value pairs to associate with the configuration that used to filter resource.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#tags CseMicroserviceEngineConfiguration#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * The configuration value.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#value CseMicroserviceEngineConfiguration#value}
  */
  readonly value: string;
  /**
  * The type of the configuration value.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#value_type CseMicroserviceEngineConfiguration#value_type}
  */
  readonly valueType: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration huaweicloud_cse_microservice_engine_configuration}
*/
export class CseMicroserviceEngineConfiguration extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_cse_microservice_engine_configuration";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CseMicroserviceEngineConfiguration resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CseMicroserviceEngineConfiguration to import
  * @param importFromId The id of the existing CseMicroserviceEngineConfiguration that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CseMicroserviceEngineConfiguration to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_cse_microservice_engine_configuration", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/cse_microservice_engine_configuration huaweicloud_cse_microservice_engine_configuration} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CseMicroserviceEngineConfigurationConfig
  */
  public constructor(scope: Construct, id: string, config: CseMicroserviceEngineConfigurationConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_cse_microservice_engine_configuration',
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
    this._adminPass = config.adminPass;
    this._adminUser = config.adminUser;
    this._authAddress = config.authAddress;
    this._connectAddress = config.connectAddress;
    this._id = config.id;
    this._key = config.key;
    this._status = config.status;
    this._tags = config.tags;
    this._value = config.value;
    this._valueType = config.valueType;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // admin_pass - computed: false, optional: true, required: false
  private _adminPass?: string; 
  public get adminPass() {
    return this.getStringAttribute('admin_pass');
  }
  public set adminPass(value: string) {
    this._adminPass = value;
  }
  public resetAdminPass() {
    this._adminPass = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get adminPassInput() {
    return this._adminPass;
  }

  // admin_user - computed: false, optional: true, required: false
  private _adminUser?: string; 
  public get adminUser() {
    return this.getStringAttribute('admin_user');
  }
  public set adminUser(value: string) {
    this._adminUser = value;
  }
  public resetAdminUser() {
    this._adminUser = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get adminUserInput() {
    return this._adminUser;
  }

  // auth_address - computed: false, optional: false, required: true
  private _authAddress?: string; 
  public get authAddress() {
    return this.getStringAttribute('auth_address');
  }
  public set authAddress(value: string) {
    this._authAddress = value;
  }
  // Temporarily expose input value. Use with caution.
  public get authAddressInput() {
    return this._authAddress;
  }

  // connect_address - computed: false, optional: false, required: true
  private _connectAddress?: string; 
  public get connectAddress() {
    return this.getStringAttribute('connect_address');
  }
  public set connectAddress(value: string) {
    this._connectAddress = value;
  }
  // Temporarily expose input value. Use with caution.
  public get connectAddressInput() {
    return this._connectAddress;
  }

  // create_revision - computed: true, optional: false, required: false
  public get createRevision() {
    return this.getNumberAttribute('create_revision');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // key - computed: false, optional: false, required: true
  private _key?: string; 
  public get key() {
    return this.getStringAttribute('key');
  }
  public set key(value: string) {
    this._key = value;
  }
  // Temporarily expose input value. Use with caution.
  public get keyInput() {
    return this._key;
  }

  // status - computed: true, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string }; 
  public get tags() {
    return this.getStringMapAttribute('tags');
  }
  public set tags(value: { [key: string]: string }) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // update_revision - computed: true, optional: false, required: false
  public get updateRevision() {
    return this.getNumberAttribute('update_revision');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
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

  // value_type - computed: false, optional: false, required: true
  private _valueType?: string; 
  public get valueType() {
    return this.getStringAttribute('value_type');
  }
  public set valueType(value: string) {
    this._valueType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueTypeInput() {
    return this._valueType;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      admin_pass: cdktf.stringToTerraform(this._adminPass),
      admin_user: cdktf.stringToTerraform(this._adminUser),
      auth_address: cdktf.stringToTerraform(this._authAddress),
      connect_address: cdktf.stringToTerraform(this._connectAddress),
      id: cdktf.stringToTerraform(this._id),
      key: cdktf.stringToTerraform(this._key),
      status: cdktf.stringToTerraform(this._status),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      value: cdktf.stringToTerraform(this._value),
      value_type: cdktf.stringToTerraform(this._valueType),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      admin_pass: {
        value: cdktf.stringToHclTerraform(this._adminPass),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      admin_user: {
        value: cdktf.stringToHclTerraform(this._adminUser),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auth_address: {
        value: cdktf.stringToHclTerraform(this._authAddress),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      connect_address: {
        value: cdktf.stringToHclTerraform(this._connectAddress),
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
      key: {
        value: cdktf.stringToHclTerraform(this._key),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      status: {
        value: cdktf.stringToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      value: {
        value: cdktf.stringToHclTerraform(this._value),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      value_type: {
        value: cdktf.stringToHclTerraform(this._valueType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DliDatasourceAuthConfig extends cdktf.TerraformMetaArguments {
  /**
  * The OBS path of the security cluster certificate.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#certificate_location DliDatasourceAuth#certificate_location}
  */
  readonly certificateLocation?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#id DliDatasourceAuth#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The key password.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#key_password DliDatasourceAuth#key_password}
  */
  readonly keyPassword?: string;
  /**
  * The OBS path of the **keystore** configuration file.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#keystore_location DliDatasourceAuth#keystore_location}
  */
  readonly keystoreLocation?: string;
  /**
  * The password of the **keystore ** configuration file.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#keystore_password DliDatasourceAuth#keystore_password}
  */
  readonly keystorePassword?: string;
  /**
  * The OBS path of the **keytab** configuration file.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#keytab DliDatasourceAuth#keytab}
  */
  readonly keytab?: string;
  /**
  * The OBS path of the **krb5** configuration file.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#krb5_conf DliDatasourceAuth#krb5_conf}
  */
  readonly krb5Conf?: string;
  /**
  * The name of a datasource authentication.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#name DliDatasourceAuth#name}
  */
  readonly name: string;
  /**
  * The password for accessing the security cluster or datasource.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#password DliDatasourceAuth#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#region DliDatasourceAuth#region}
  */
  readonly region?: string;
  /**
  * The OBS path of the **truststore** configuration file.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#truststore_location DliDatasourceAuth#truststore_location}
  */
  readonly truststoreLocation?: string;
  /**
  * The password of the **truststore** configuration file.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#truststore_password DliDatasourceAuth#truststore_password}
  */
  readonly truststorePassword?: string;
  /**
  * Data source type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#type DliDatasourceAuth#type}
  */
  readonly type: string;
  /**
  * Username for accessing the security cluster or datasource.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#user_name DliDatasourceAuth#user_name}
  */
  readonly userName?: string;
  /**
  * Username for accessing the security cluster or datasource. Use 'user_name' instead.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#username DliDatasourceAuth#username}
  */
  readonly username?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth huaweicloud_dli_datasource_auth}
*/
export class DliDatasourceAuth extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dli_datasource_auth";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DliDatasourceAuth resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DliDatasourceAuth to import
  * @param importFromId The id of the existing DliDatasourceAuth that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DliDatasourceAuth to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dli_datasource_auth", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_datasource_auth huaweicloud_dli_datasource_auth} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DliDatasourceAuthConfig
  */
  public constructor(scope: Construct, id: string, config: DliDatasourceAuthConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dli_datasource_auth',
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
    this._certificateLocation = config.certificateLocation;
    this._id = config.id;
    this._keyPassword = config.keyPassword;
    this._keystoreLocation = config.keystoreLocation;
    this._keystorePassword = config.keystorePassword;
    this._keytab = config.keytab;
    this._krb5Conf = config.krb5Conf;
    this._name = config.name;
    this._password = config.password;
    this._region = config.region;
    this._truststoreLocation = config.truststoreLocation;
    this._truststorePassword = config.truststorePassword;
    this._type = config.type;
    this._userName = config.userName;
    this._username = config.username;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // certificate_location - computed: true, optional: true, required: false
  private _certificateLocation?: string; 
  public get certificateLocation() {
    return this.getStringAttribute('certificate_location');
  }
  public set certificateLocation(value: string) {
    this._certificateLocation = value;
  }
  public resetCertificateLocation() {
    this._certificateLocation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateLocationInput() {
    return this._certificateLocation;
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

  // key_password - computed: true, optional: true, required: false
  private _keyPassword?: string; 
  public get keyPassword() {
    return this.getStringAttribute('key_password');
  }
  public set keyPassword(value: string) {
    this._keyPassword = value;
  }
  public resetKeyPassword() {
    this._keyPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyPasswordInput() {
    return this._keyPassword;
  }

  // keystore_location - computed: true, optional: true, required: false
  private _keystoreLocation?: string; 
  public get keystoreLocation() {
    return this.getStringAttribute('keystore_location');
  }
  public set keystoreLocation(value: string) {
    this._keystoreLocation = value;
  }
  public resetKeystoreLocation() {
    this._keystoreLocation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keystoreLocationInput() {
    return this._keystoreLocation;
  }

  // keystore_password - computed: true, optional: true, required: false
  private _keystorePassword?: string; 
  public get keystorePassword() {
    return this.getStringAttribute('keystore_password');
  }
  public set keystorePassword(value: string) {
    this._keystorePassword = value;
  }
  public resetKeystorePassword() {
    this._keystorePassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keystorePasswordInput() {
    return this._keystorePassword;
  }

  // keytab - computed: true, optional: true, required: false
  private _keytab?: string; 
  public get keytab() {
    return this.getStringAttribute('keytab');
  }
  public set keytab(value: string) {
    this._keytab = value;
  }
  public resetKeytab() {
    this._keytab = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keytabInput() {
    return this._keytab;
  }

  // krb5_conf - computed: true, optional: true, required: false
  private _krb5Conf?: string; 
  public get krb5Conf() {
    return this.getStringAttribute('krb5_conf');
  }
  public set krb5Conf(value: string) {
    this._krb5Conf = value;
  }
  public resetKrb5Conf() {
    this._krb5Conf = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get krb5ConfInput() {
    return this._krb5Conf;
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

  // owner - computed: true, optional: false, required: false
  public get owner() {
    return this.getStringAttribute('owner');
  }

  // password - computed: true, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
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

  // truststore_location - computed: true, optional: true, required: false
  private _truststoreLocation?: string; 
  public get truststoreLocation() {
    return this.getStringAttribute('truststore_location');
  }
  public set truststoreLocation(value: string) {
    this._truststoreLocation = value;
  }
  public resetTruststoreLocation() {
    this._truststoreLocation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get truststoreLocationInput() {
    return this._truststoreLocation;
  }

  // truststore_password - computed: true, optional: true, required: false
  private _truststorePassword?: string; 
  public get truststorePassword() {
    return this.getStringAttribute('truststore_password');
  }
  public set truststorePassword(value: string) {
    this._truststorePassword = value;
  }
  public resetTruststorePassword() {
    this._truststorePassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get truststorePasswordInput() {
    return this._truststorePassword;
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

  // user_name - computed: true, optional: true, required: false
  private _userName?: string; 
  public get userName() {
    return this.getStringAttribute('user_name');
  }
  public set userName(value: string) {
    this._userName = value;
  }
  public resetUserName() {
    this._userName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userNameInput() {
    return this._userName;
  }

  // username - computed: true, optional: true, required: false
  private _username?: string; 
  public get username() {
    return this.getStringAttribute('username');
  }
  public set username(value: string) {
    this._username = value;
  }
  public resetUsername() {
    this._username = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get usernameInput() {
    return this._username;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      certificate_location: cdktf.stringToTerraform(this._certificateLocation),
      id: cdktf.stringToTerraform(this._id),
      key_password: cdktf.stringToTerraform(this._keyPassword),
      keystore_location: cdktf.stringToTerraform(this._keystoreLocation),
      keystore_password: cdktf.stringToTerraform(this._keystorePassword),
      keytab: cdktf.stringToTerraform(this._keytab),
      krb5_conf: cdktf.stringToTerraform(this._krb5Conf),
      name: cdktf.stringToTerraform(this._name),
      password: cdktf.stringToTerraform(this._password),
      region: cdktf.stringToTerraform(this._region),
      truststore_location: cdktf.stringToTerraform(this._truststoreLocation),
      truststore_password: cdktf.stringToTerraform(this._truststorePassword),
      type: cdktf.stringToTerraform(this._type),
      user_name: cdktf.stringToTerraform(this._userName),
      username: cdktf.stringToTerraform(this._username),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      certificate_location: {
        value: cdktf.stringToHclTerraform(this._certificateLocation),
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
      key_password: {
        value: cdktf.stringToHclTerraform(this._keyPassword),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      keystore_location: {
        value: cdktf.stringToHclTerraform(this._keystoreLocation),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      keystore_password: {
        value: cdktf.stringToHclTerraform(this._keystorePassword),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      keytab: {
        value: cdktf.stringToHclTerraform(this._keytab),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      krb5_conf: {
        value: cdktf.stringToHclTerraform(this._krb5Conf),
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
      password: {
        value: cdktf.stringToHclTerraform(this._password),
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
      truststore_location: {
        value: cdktf.stringToHclTerraform(this._truststoreLocation),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      truststore_password: {
        value: cdktf.stringToHclTerraform(this._truststorePassword),
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
      user_name: {
        value: cdktf.stringToHclTerraform(this._userName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      username: {
        value: cdktf.stringToHclTerraform(this._username),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

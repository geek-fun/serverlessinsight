// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CodeartsInspectorWebsiteConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the authentication type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#auth_type CodeartsInspectorWebsite#auth_type}
  */
  readonly authType: string;
  /**
  * Specifies the HTTP headers.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#http_headers CodeartsInspectorWebsite#http_headers}
  */
  readonly httpHeaders?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#id CodeartsInspectorWebsite#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the login cookies.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#login_cookie CodeartsInspectorWebsite#login_cookie}
  */
  readonly loginCookie?: string;
  /**
  * Specifies the login password.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#login_password CodeartsInspectorWebsite#login_password}
  */
  readonly loginPassword?: string;
  /**
  * Specifies the login URL.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#login_url CodeartsInspectorWebsite#login_url}
  */
  readonly loginUrl?: string;
  /**
  * Specifies the login username.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#login_username CodeartsInspectorWebsite#login_username}
  */
  readonly loginUsername?: string;
  /**
  * Specifies the verify URL.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#verify_url CodeartsInspectorWebsite#verify_url}
  */
  readonly verifyUrl?: string;
  /**
  * Specifies the website address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#website_address CodeartsInspectorWebsite#website_address}
  */
  readonly websiteAddress: string;
  /**
  * Specifies the website name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#website_name CodeartsInspectorWebsite#website_name}
  */
  readonly websiteName: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website huaweicloud_codearts_inspector_website}
*/
export class CodeartsInspectorWebsite extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_codearts_inspector_website";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CodeartsInspectorWebsite resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CodeartsInspectorWebsite to import
  * @param importFromId The id of the existing CodeartsInspectorWebsite that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CodeartsInspectorWebsite to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_codearts_inspector_website", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_inspector_website huaweicloud_codearts_inspector_website} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CodeartsInspectorWebsiteConfig
  */
  public constructor(scope: Construct, id: string, config: CodeartsInspectorWebsiteConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_codearts_inspector_website',
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
    this._httpHeaders = config.httpHeaders;
    this._id = config.id;
    this._loginCookie = config.loginCookie;
    this._loginPassword = config.loginPassword;
    this._loginUrl = config.loginUrl;
    this._loginUsername = config.loginUsername;
    this._verifyUrl = config.verifyUrl;
    this._websiteAddress = config.websiteAddress;
    this._websiteName = config.websiteName;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // auth_status - computed: true, optional: false, required: false
  public get authStatus() {
    return this.getStringAttribute('auth_status');
  }

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

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // high - computed: true, optional: false, required: false
  public get high() {
    return this.getNumberAttribute('high');
  }

  // hint - computed: true, optional: false, required: false
  public get hint() {
    return this.getNumberAttribute('hint');
  }

  // http_headers - computed: false, optional: true, required: false
  private _httpHeaders?: { [key: string]: string }; 
  public get httpHeaders() {
    return this.getStringMapAttribute('http_headers');
  }
  public set httpHeaders(value: { [key: string]: string }) {
    this._httpHeaders = value;
  }
  public resetHttpHeaders() {
    this._httpHeaders = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpHeadersInput() {
    return this._httpHeaders;
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

  // login_cookie - computed: false, optional: true, required: false
  private _loginCookie?: string; 
  public get loginCookie() {
    return this.getStringAttribute('login_cookie');
  }
  public set loginCookie(value: string) {
    this._loginCookie = value;
  }
  public resetLoginCookie() {
    this._loginCookie = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loginCookieInput() {
    return this._loginCookie;
  }

  // login_password - computed: false, optional: true, required: false
  private _loginPassword?: string; 
  public get loginPassword() {
    return this.getStringAttribute('login_password');
  }
  public set loginPassword(value: string) {
    this._loginPassword = value;
  }
  public resetLoginPassword() {
    this._loginPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loginPasswordInput() {
    return this._loginPassword;
  }

  // login_url - computed: false, optional: true, required: false
  private _loginUrl?: string; 
  public get loginUrl() {
    return this.getStringAttribute('login_url');
  }
  public set loginUrl(value: string) {
    this._loginUrl = value;
  }
  public resetLoginUrl() {
    this._loginUrl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loginUrlInput() {
    return this._loginUrl;
  }

  // login_username - computed: false, optional: true, required: false
  private _loginUsername?: string; 
  public get loginUsername() {
    return this.getStringAttribute('login_username');
  }
  public set loginUsername(value: string) {
    this._loginUsername = value;
  }
  public resetLoginUsername() {
    this._loginUsername = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loginUsernameInput() {
    return this._loginUsername;
  }

  // low - computed: true, optional: false, required: false
  public get low() {
    return this.getNumberAttribute('low');
  }

  // middle - computed: true, optional: false, required: false
  public get middle() {
    return this.getNumberAttribute('middle');
  }

  // verify_url - computed: false, optional: true, required: false
  private _verifyUrl?: string; 
  public get verifyUrl() {
    return this.getStringAttribute('verify_url');
  }
  public set verifyUrl(value: string) {
    this._verifyUrl = value;
  }
  public resetVerifyUrl() {
    this._verifyUrl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get verifyUrlInput() {
    return this._verifyUrl;
  }

  // website_address - computed: false, optional: false, required: true
  private _websiteAddress?: string; 
  public get websiteAddress() {
    return this.getStringAttribute('website_address');
  }
  public set websiteAddress(value: string) {
    this._websiteAddress = value;
  }
  // Temporarily expose input value. Use with caution.
  public get websiteAddressInput() {
    return this._websiteAddress;
  }

  // website_name - computed: false, optional: false, required: true
  private _websiteName?: string; 
  public get websiteName() {
    return this.getStringAttribute('website_name');
  }
  public set websiteName(value: string) {
    this._websiteName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get websiteNameInput() {
    return this._websiteName;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auth_type: cdktf.stringToTerraform(this._authType),
      http_headers: cdktf.hashMapper(cdktf.stringToTerraform)(this._httpHeaders),
      id: cdktf.stringToTerraform(this._id),
      login_cookie: cdktf.stringToTerraform(this._loginCookie),
      login_password: cdktf.stringToTerraform(this._loginPassword),
      login_url: cdktf.stringToTerraform(this._loginUrl),
      login_username: cdktf.stringToTerraform(this._loginUsername),
      verify_url: cdktf.stringToTerraform(this._verifyUrl),
      website_address: cdktf.stringToTerraform(this._websiteAddress),
      website_name: cdktf.stringToTerraform(this._websiteName),
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
      http_headers: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._httpHeaders),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      login_cookie: {
        value: cdktf.stringToHclTerraform(this._loginCookie),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      login_password: {
        value: cdktf.stringToHclTerraform(this._loginPassword),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      login_url: {
        value: cdktf.stringToHclTerraform(this._loginUrl),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      login_username: {
        value: cdktf.stringToHclTerraform(this._loginUsername),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      verify_url: {
        value: cdktf.stringToHclTerraform(this._verifyUrl),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      website_address: {
        value: cdktf.stringToHclTerraform(this._websiteAddress),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      website_name: {
        value: cdktf.stringToHclTerraform(this._websiteName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IdentityLoginPolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy#account_validity_period IdentityLoginPolicy#account_validity_period}
  */
  readonly accountValidityPeriod?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy#custom_info_for_login IdentityLoginPolicy#custom_info_for_login}
  */
  readonly customInfoForLogin?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy#id IdentityLoginPolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy#lockout_duration IdentityLoginPolicy#lockout_duration}
  */
  readonly lockoutDuration?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy#login_failed_times IdentityLoginPolicy#login_failed_times}
  */
  readonly loginFailedTimes?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy#period_with_login_failures IdentityLoginPolicy#period_with_login_failures}
  */
  readonly periodWithLoginFailures?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy#session_timeout IdentityLoginPolicy#session_timeout}
  */
  readonly sessionTimeout?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy#show_recent_login_info IdentityLoginPolicy#show_recent_login_info}
  */
  readonly showRecentLoginInfo?: boolean | cdktf.IResolvable;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy huaweicloud_identity_login_policy}
*/
export class IdentityLoginPolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_identity_login_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IdentityLoginPolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IdentityLoginPolicy to import
  * @param importFromId The id of the existing IdentityLoginPolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IdentityLoginPolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_identity_login_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/identity_login_policy huaweicloud_identity_login_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IdentityLoginPolicyConfig = {}
  */
  public constructor(scope: Construct, id: string, config: IdentityLoginPolicyConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_identity_login_policy',
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
    this._accountValidityPeriod = config.accountValidityPeriod;
    this._customInfoForLogin = config.customInfoForLogin;
    this._id = config.id;
    this._lockoutDuration = config.lockoutDuration;
    this._loginFailedTimes = config.loginFailedTimes;
    this._periodWithLoginFailures = config.periodWithLoginFailures;
    this._sessionTimeout = config.sessionTimeout;
    this._showRecentLoginInfo = config.showRecentLoginInfo;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // account_validity_period - computed: true, optional: true, required: false
  private _accountValidityPeriod?: number; 
  public get accountValidityPeriod() {
    return this.getNumberAttribute('account_validity_period');
  }
  public set accountValidityPeriod(value: number) {
    this._accountValidityPeriod = value;
  }
  public resetAccountValidityPeriod() {
    this._accountValidityPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountValidityPeriodInput() {
    return this._accountValidityPeriod;
  }

  // custom_info_for_login - computed: false, optional: true, required: false
  private _customInfoForLogin?: string; 
  public get customInfoForLogin() {
    return this.getStringAttribute('custom_info_for_login');
  }
  public set customInfoForLogin(value: string) {
    this._customInfoForLogin = value;
  }
  public resetCustomInfoForLogin() {
    this._customInfoForLogin = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customInfoForLoginInput() {
    return this._customInfoForLogin;
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

  // lockout_duration - computed: false, optional: true, required: false
  private _lockoutDuration?: number; 
  public get lockoutDuration() {
    return this.getNumberAttribute('lockout_duration');
  }
  public set lockoutDuration(value: number) {
    this._lockoutDuration = value;
  }
  public resetLockoutDuration() {
    this._lockoutDuration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lockoutDurationInput() {
    return this._lockoutDuration;
  }

  // login_failed_times - computed: false, optional: true, required: false
  private _loginFailedTimes?: number; 
  public get loginFailedTimes() {
    return this.getNumberAttribute('login_failed_times');
  }
  public set loginFailedTimes(value: number) {
    this._loginFailedTimes = value;
  }
  public resetLoginFailedTimes() {
    this._loginFailedTimes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loginFailedTimesInput() {
    return this._loginFailedTimes;
  }

  // period_with_login_failures - computed: false, optional: true, required: false
  private _periodWithLoginFailures?: number; 
  public get periodWithLoginFailures() {
    return this.getNumberAttribute('period_with_login_failures');
  }
  public set periodWithLoginFailures(value: number) {
    this._periodWithLoginFailures = value;
  }
  public resetPeriodWithLoginFailures() {
    this._periodWithLoginFailures = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodWithLoginFailuresInput() {
    return this._periodWithLoginFailures;
  }

  // session_timeout - computed: false, optional: true, required: false
  private _sessionTimeout?: number; 
  public get sessionTimeout() {
    return this.getNumberAttribute('session_timeout');
  }
  public set sessionTimeout(value: number) {
    this._sessionTimeout = value;
  }
  public resetSessionTimeout() {
    this._sessionTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sessionTimeoutInput() {
    return this._sessionTimeout;
  }

  // show_recent_login_info - computed: false, optional: true, required: false
  private _showRecentLoginInfo?: boolean | cdktf.IResolvable; 
  public get showRecentLoginInfo() {
    return this.getBooleanAttribute('show_recent_login_info');
  }
  public set showRecentLoginInfo(value: boolean | cdktf.IResolvable) {
    this._showRecentLoginInfo = value;
  }
  public resetShowRecentLoginInfo() {
    this._showRecentLoginInfo = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get showRecentLoginInfoInput() {
    return this._showRecentLoginInfo;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      account_validity_period: cdktf.numberToTerraform(this._accountValidityPeriod),
      custom_info_for_login: cdktf.stringToTerraform(this._customInfoForLogin),
      id: cdktf.stringToTerraform(this._id),
      lockout_duration: cdktf.numberToTerraform(this._lockoutDuration),
      login_failed_times: cdktf.numberToTerraform(this._loginFailedTimes),
      period_with_login_failures: cdktf.numberToTerraform(this._periodWithLoginFailures),
      session_timeout: cdktf.numberToTerraform(this._sessionTimeout),
      show_recent_login_info: cdktf.booleanToTerraform(this._showRecentLoginInfo),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      account_validity_period: {
        value: cdktf.numberToHclTerraform(this._accountValidityPeriod),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      custom_info_for_login: {
        value: cdktf.stringToHclTerraform(this._customInfoForLogin),
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
      lockout_duration: {
        value: cdktf.numberToHclTerraform(this._lockoutDuration),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      login_failed_times: {
        value: cdktf.numberToHclTerraform(this._loginFailedTimes),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      period_with_login_failures: {
        value: cdktf.numberToHclTerraform(this._periodWithLoginFailures),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      session_timeout: {
        value: cdktf.numberToHclTerraform(this._sessionTimeout),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      show_recent_login_info: {
        value: cdktf.booleanToHclTerraform(this._showRecentLoginInfo),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MeetingUserConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#account MeetingUser#account}
  */
  readonly account?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#account_name MeetingUser#account_name}
  */
  readonly accountName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#account_password MeetingUser#account_password}
  */
  readonly accountPassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#app_id MeetingUser#app_id}
  */
  readonly appId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#app_key MeetingUser#app_key}
  */
  readonly appKey?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#corp_id MeetingUser#corp_id}
  */
  readonly corpId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#country MeetingUser#country}
  */
  readonly country?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#department_code MeetingUser#department_code}
  */
  readonly departmentCode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#description MeetingUser#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#email MeetingUser#email}
  */
  readonly email?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#english_name MeetingUser#english_name}
  */
  readonly englishName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#hide_phone MeetingUser#hide_phone}
  */
  readonly hidePhone?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#id MeetingUser#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#is_admin MeetingUser#is_admin}
  */
  readonly isAdmin?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#is_send_notify MeetingUser#is_send_notify}
  */
  readonly isSendNotify?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#name MeetingUser#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#password MeetingUser#password}
  */
  readonly password: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#phone MeetingUser#phone}
  */
  readonly phone?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#signature MeetingUser#signature}
  */
  readonly signature?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#sort_level MeetingUser#sort_level}
  */
  readonly sortLevel?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#status MeetingUser#status}
  */
  readonly status?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#third_account MeetingUser#third_account}
  */
  readonly thirdAccount?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#title MeetingUser#title}
  */
  readonly title?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#user_id MeetingUser#user_id}
  */
  readonly userId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user huaweicloud_meeting_user}
*/
export class MeetingUser extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_meeting_user";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a MeetingUser resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the MeetingUser to import
  * @param importFromId The id of the existing MeetingUser that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the MeetingUser to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_meeting_user", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/meeting_user huaweicloud_meeting_user} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MeetingUserConfig
  */
  public constructor(scope: Construct, id: string, config: MeetingUserConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_meeting_user',
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
    this._account = config.account;
    this._accountName = config.accountName;
    this._accountPassword = config.accountPassword;
    this._appId = config.appId;
    this._appKey = config.appKey;
    this._corpId = config.corpId;
    this._country = config.country;
    this._departmentCode = config.departmentCode;
    this._description = config.description;
    this._email = config.email;
    this._englishName = config.englishName;
    this._hidePhone = config.hidePhone;
    this._id = config.id;
    this._isAdmin = config.isAdmin;
    this._isSendNotify = config.isSendNotify;
    this._name = config.name;
    this._password = config.password;
    this._phone = config.phone;
    this._signature = config.signature;
    this._sortLevel = config.sortLevel;
    this._status = config.status;
    this._thirdAccount = config.thirdAccount;
    this._title = config.title;
    this._userId = config.userId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // account - computed: true, optional: true, required: false
  private _account?: string; 
  public get account() {
    return this.getStringAttribute('account');
  }
  public set account(value: string) {
    this._account = value;
  }
  public resetAccount() {
    this._account = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountInput() {
    return this._account;
  }

  // account_name - computed: false, optional: true, required: false
  private _accountName?: string; 
  public get accountName() {
    return this.getStringAttribute('account_name');
  }
  public set accountName(value: string) {
    this._accountName = value;
  }
  public resetAccountName() {
    this._accountName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountNameInput() {
    return this._accountName;
  }

  // account_password - computed: false, optional: true, required: false
  private _accountPassword?: string; 
  public get accountPassword() {
    return this.getStringAttribute('account_password');
  }
  public set accountPassword(value: string) {
    this._accountPassword = value;
  }
  public resetAccountPassword() {
    this._accountPassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accountPasswordInput() {
    return this._accountPassword;
  }

  // app_id - computed: false, optional: true, required: false
  private _appId?: string; 
  public get appId() {
    return this.getStringAttribute('app_id');
  }
  public set appId(value: string) {
    this._appId = value;
  }
  public resetAppId() {
    this._appId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appIdInput() {
    return this._appId;
  }

  // app_key - computed: false, optional: true, required: false
  private _appKey?: string; 
  public get appKey() {
    return this.getStringAttribute('app_key');
  }
  public set appKey(value: string) {
    this._appKey = value;
  }
  public resetAppKey() {
    this._appKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appKeyInput() {
    return this._appKey;
  }

  // corp_id - computed: true, optional: true, required: false
  private _corpId?: string; 
  public get corpId() {
    return this.getStringAttribute('corp_id');
  }
  public set corpId(value: string) {
    this._corpId = value;
  }
  public resetCorpId() {
    this._corpId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get corpIdInput() {
    return this._corpId;
  }

  // country - computed: true, optional: true, required: false
  private _country?: string; 
  public get country() {
    return this.getStringAttribute('country');
  }
  public set country(value: string) {
    this._country = value;
  }
  public resetCountry() {
    this._country = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get countryInput() {
    return this._country;
  }

  // department_code - computed: true, optional: true, required: false
  private _departmentCode?: string; 
  public get departmentCode() {
    return this.getStringAttribute('department_code');
  }
  public set departmentCode(value: string) {
    this._departmentCode = value;
  }
  public resetDepartmentCode() {
    this._departmentCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get departmentCodeInput() {
    return this._departmentCode;
  }

  // department_name - computed: true, optional: false, required: false
  public get departmentName() {
    return this.getStringAttribute('department_name');
  }

  // department_name_path - computed: true, optional: false, required: false
  public get departmentNamePath() {
    return this.getStringAttribute('department_name_path');
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

  // email - computed: true, optional: true, required: false
  private _email?: string; 
  public get email() {
    return this.getStringAttribute('email');
  }
  public set email(value: string) {
    this._email = value;
  }
  public resetEmail() {
    this._email = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get emailInput() {
    return this._email;
  }

  // english_name - computed: true, optional: true, required: false
  private _englishName?: string; 
  public get englishName() {
    return this.getStringAttribute('english_name');
  }
  public set englishName(value: string) {
    this._englishName = value;
  }
  public resetEnglishName() {
    this._englishName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get englishNameInput() {
    return this._englishName;
  }

  // hide_phone - computed: true, optional: true, required: false
  private _hidePhone?: boolean | cdktf.IResolvable; 
  public get hidePhone() {
    return this.getBooleanAttribute('hide_phone');
  }
  public set hidePhone(value: boolean | cdktf.IResolvable) {
    this._hidePhone = value;
  }
  public resetHidePhone() {
    this._hidePhone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hidePhoneInput() {
    return this._hidePhone;
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

  // is_admin - computed: true, optional: true, required: false
  private _isAdmin?: boolean | cdktf.IResolvable; 
  public get isAdmin() {
    return this.getBooleanAttribute('is_admin');
  }
  public set isAdmin(value: boolean | cdktf.IResolvable) {
    this._isAdmin = value;
  }
  public resetIsAdmin() {
    this._isAdmin = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isAdminInput() {
    return this._isAdmin;
  }

  // is_send_notify - computed: false, optional: true, required: false
  private _isSendNotify?: boolean | cdktf.IResolvable; 
  public get isSendNotify() {
    return this.getBooleanAttribute('is_send_notify');
  }
  public set isSendNotify(value: boolean | cdktf.IResolvable) {
    this._isSendNotify = value;
  }
  public resetIsSendNotify() {
    this._isSendNotify = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isSendNotifyInput() {
    return this._isSendNotify;
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

  // password - computed: false, optional: false, required: true
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // phone - computed: true, optional: true, required: false
  private _phone?: string; 
  public get phone() {
    return this.getStringAttribute('phone');
  }
  public set phone(value: string) {
    this._phone = value;
  }
  public resetPhone() {
    this._phone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get phoneInput() {
    return this._phone;
  }

  // signature - computed: true, optional: true, required: false
  private _signature?: string; 
  public get signature() {
    return this.getStringAttribute('signature');
  }
  public set signature(value: string) {
    this._signature = value;
  }
  public resetSignature() {
    this._signature = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get signatureInput() {
    return this._signature;
  }

  // sip_number - computed: true, optional: false, required: false
  public get sipNumber() {
    return this.getStringAttribute('sip_number');
  }

  // sort_level - computed: true, optional: true, required: false
  private _sortLevel?: number; 
  public get sortLevel() {
    return this.getNumberAttribute('sort_level');
  }
  public set sortLevel(value: number) {
    this._sortLevel = value;
  }
  public resetSortLevel() {
    this._sortLevel = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sortLevelInput() {
    return this._sortLevel;
  }

  // status - computed: true, optional: true, required: false
  private _status?: number; 
  public get status() {
    return this.getNumberAttribute('status');
  }
  public set status(value: number) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
  }

  // third_account - computed: true, optional: true, required: false
  private _thirdAccount?: string; 
  public get thirdAccount() {
    return this.getStringAttribute('third_account');
  }
  public set thirdAccount(value: string) {
    this._thirdAccount = value;
  }
  public resetThirdAccount() {
    this._thirdAccount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get thirdAccountInput() {
    return this._thirdAccount;
  }

  // title - computed: true, optional: true, required: false
  private _title?: string; 
  public get title() {
    return this.getStringAttribute('title');
  }
  public set title(value: string) {
    this._title = value;
  }
  public resetTitle() {
    this._title = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get titleInput() {
    return this._title;
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getNumberAttribute('type');
  }

  // user_id - computed: true, optional: true, required: false
  private _userId?: string; 
  public get userId() {
    return this.getStringAttribute('user_id');
  }
  public set userId(value: string) {
    this._userId = value;
  }
  public resetUserId() {
    this._userId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userIdInput() {
    return this._userId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      account: cdktf.stringToTerraform(this._account),
      account_name: cdktf.stringToTerraform(this._accountName),
      account_password: cdktf.stringToTerraform(this._accountPassword),
      app_id: cdktf.stringToTerraform(this._appId),
      app_key: cdktf.stringToTerraform(this._appKey),
      corp_id: cdktf.stringToTerraform(this._corpId),
      country: cdktf.stringToTerraform(this._country),
      department_code: cdktf.stringToTerraform(this._departmentCode),
      description: cdktf.stringToTerraform(this._description),
      email: cdktf.stringToTerraform(this._email),
      english_name: cdktf.stringToTerraform(this._englishName),
      hide_phone: cdktf.booleanToTerraform(this._hidePhone),
      id: cdktf.stringToTerraform(this._id),
      is_admin: cdktf.booleanToTerraform(this._isAdmin),
      is_send_notify: cdktf.booleanToTerraform(this._isSendNotify),
      name: cdktf.stringToTerraform(this._name),
      password: cdktf.stringToTerraform(this._password),
      phone: cdktf.stringToTerraform(this._phone),
      signature: cdktf.stringToTerraform(this._signature),
      sort_level: cdktf.numberToTerraform(this._sortLevel),
      status: cdktf.numberToTerraform(this._status),
      third_account: cdktf.stringToTerraform(this._thirdAccount),
      title: cdktf.stringToTerraform(this._title),
      user_id: cdktf.stringToTerraform(this._userId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      account: {
        value: cdktf.stringToHclTerraform(this._account),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      account_name: {
        value: cdktf.stringToHclTerraform(this._accountName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      account_password: {
        value: cdktf.stringToHclTerraform(this._accountPassword),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      app_id: {
        value: cdktf.stringToHclTerraform(this._appId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      app_key: {
        value: cdktf.stringToHclTerraform(this._appKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      corp_id: {
        value: cdktf.stringToHclTerraform(this._corpId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      country: {
        value: cdktf.stringToHclTerraform(this._country),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      department_code: {
        value: cdktf.stringToHclTerraform(this._departmentCode),
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
      email: {
        value: cdktf.stringToHclTerraform(this._email),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      english_name: {
        value: cdktf.stringToHclTerraform(this._englishName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      hide_phone: {
        value: cdktf.booleanToHclTerraform(this._hidePhone),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_admin: {
        value: cdktf.booleanToHclTerraform(this._isAdmin),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      is_send_notify: {
        value: cdktf.booleanToHclTerraform(this._isSendNotify),
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
      password: {
        value: cdktf.stringToHclTerraform(this._password),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      phone: {
        value: cdktf.stringToHclTerraform(this._phone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      signature: {
        value: cdktf.stringToHclTerraform(this._signature),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      sort_level: {
        value: cdktf.numberToHclTerraform(this._sortLevel),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      status: {
        value: cdktf.numberToHclTerraform(this._status),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      third_account: {
        value: cdktf.stringToHclTerraform(this._thirdAccount),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      title: {
        value: cdktf.stringToHclTerraform(this._title),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      user_id: {
        value: cdktf.stringToHclTerraform(this._userId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

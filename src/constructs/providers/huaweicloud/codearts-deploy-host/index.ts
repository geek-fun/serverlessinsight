// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CodeartsDeployHostConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies whether the host is an agent host.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#as_proxy CodeartsDeployHost#as_proxy}
  */
  readonly asProxy?: boolean | cdktf.IResolvable;
  /**
  * Specifies the CodeArts deploy group ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#group_id CodeartsDeployHost#group_id}
  */
  readonly groupId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#id CodeartsDeployHost#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies whether to enable Application Operations Management (AOM) for free to provide
  * metric monitoring, log query and alarm functions.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#install_icagent CodeartsDeployHost#install_icagent}
  */
  readonly installIcagent?: boolean | cdktf.IResolvable;
  /**
  * Specifies the IP address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#ip_address CodeartsDeployHost#ip_address}
  */
  readonly ipAddress: string;
  /**
  * Specifies the host name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#name CodeartsDeployHost#name}
  */
  readonly name: string;
  /**
  * Specifies the operating system.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#os_type CodeartsDeployHost#os_type}
  */
  readonly osType: string;
  /**
  * Specifies the password.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#password CodeartsDeployHost#password}
  */
  readonly password?: string;
  /**
  * Specifies the SSH port.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#port CodeartsDeployHost#port}
  */
  readonly port: number;
  /**
  * Specifies the private key.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#private_key CodeartsDeployHost#private_key}
  */
  readonly privateKey?: string;
  /**
  * Specifies the agent ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#proxy_host_id CodeartsDeployHost#proxy_host_id}
  */
  readonly proxyHostId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#region CodeartsDeployHost#region}
  */
  readonly region?: string;
  /**
  * Specifies whether to synchronize the password of the current host to the hosts with the
  * same IP address, username and port number in other group in the same project.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#sync CodeartsDeployHost#sync}
  */
  readonly sync?: boolean | cdktf.IResolvable;
  /**
  * Specifies the username.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#username CodeartsDeployHost#username}
  */
  readonly username: string;
}
export interface CodeartsDeployHostPermission {
}

export function codeartsDeployHostPermissionToTerraform(struct?: CodeartsDeployHostPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function codeartsDeployHostPermissionToHclTerraform(struct?: CodeartsDeployHostPermission): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class CodeartsDeployHostPermissionOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CodeartsDeployHostPermission | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CodeartsDeployHostPermission | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // can_add_host - computed: true, optional: false, required: false
  public get canAddHost() {
    return this.getBooleanAttribute('can_add_host');
  }

  // can_copy - computed: true, optional: false, required: false
  public get canCopy() {
    return this.getBooleanAttribute('can_copy');
  }

  // can_delete - computed: true, optional: false, required: false
  public get canDelete() {
    return this.getBooleanAttribute('can_delete');
  }

  // can_edit - computed: true, optional: false, required: false
  public get canEdit() {
    return this.getBooleanAttribute('can_edit');
  }

  // can_view - computed: true, optional: false, required: false
  public get canView() {
    return this.getBooleanAttribute('can_view');
  }
}

export class CodeartsDeployHostPermissionList extends cdktf.ComplexList {

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
  public get(index: number): CodeartsDeployHostPermissionOutputReference {
    return new CodeartsDeployHostPermissionOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host huaweicloud_codearts_deploy_host}
*/
export class CodeartsDeployHost extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_codearts_deploy_host";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CodeartsDeployHost resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CodeartsDeployHost to import
  * @param importFromId The id of the existing CodeartsDeployHost that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CodeartsDeployHost to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_codearts_deploy_host", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/codearts_deploy_host huaweicloud_codearts_deploy_host} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CodeartsDeployHostConfig
  */
  public constructor(scope: Construct, id: string, config: CodeartsDeployHostConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_codearts_deploy_host',
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
    this._asProxy = config.asProxy;
    this._groupId = config.groupId;
    this._id = config.id;
    this._installIcagent = config.installIcagent;
    this._ipAddress = config.ipAddress;
    this._name = config.name;
    this._osType = config.osType;
    this._password = config.password;
    this._port = config.port;
    this._privateKey = config.privateKey;
    this._proxyHostId = config.proxyHostId;
    this._region = config.region;
    this._sync = config.sync;
    this._username = config.username;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // as_proxy - computed: true, optional: true, required: false
  private _asProxy?: boolean | cdktf.IResolvable; 
  public get asProxy() {
    return this.getBooleanAttribute('as_proxy');
  }
  public set asProxy(value: boolean | cdktf.IResolvable) {
    this._asProxy = value;
  }
  public resetAsProxy() {
    this._asProxy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get asProxyInput() {
    return this._asProxy;
  }

  // connection_status - computed: true, optional: false, required: false
  public get connectionStatus() {
    return this.getStringAttribute('connection_status');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // group_id - computed: false, optional: false, required: true
  private _groupId?: string; 
  public get groupId() {
    return this.getStringAttribute('group_id');
  }
  public set groupId(value: string) {
    this._groupId = value;
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

  // install_icagent - computed: false, optional: true, required: false
  private _installIcagent?: boolean | cdktf.IResolvable; 
  public get installIcagent() {
    return this.getBooleanAttribute('install_icagent');
  }
  public set installIcagent(value: boolean | cdktf.IResolvable) {
    this._installIcagent = value;
  }
  public resetInstallIcagent() {
    this._installIcagent = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get installIcagentInput() {
    return this._installIcagent;
  }

  // ip_address - computed: false, optional: false, required: true
  private _ipAddress?: string; 
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }
  public set ipAddress(value: string) {
    this._ipAddress = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ipAddressInput() {
    return this._ipAddress;
  }

  // lastest_connection_at - computed: true, optional: false, required: false
  public get lastestConnectionAt() {
    return this.getStringAttribute('lastest_connection_at');
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

  // os_type - computed: false, optional: false, required: true
  private _osType?: string; 
  public get osType() {
    return this.getStringAttribute('os_type');
  }
  public set osType(value: string) {
    this._osType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get osTypeInput() {
    return this._osType;
  }

  // password - computed: false, optional: true, required: false
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

  // permission - computed: true, optional: false, required: false
  private _permission = new CodeartsDeployHostPermissionList(this, "permission", false);
  public get permission() {
    return this._permission;
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

  // private_key - computed: false, optional: true, required: false
  private _privateKey?: string; 
  public get privateKey() {
    return this.getStringAttribute('private_key');
  }
  public set privateKey(value: string) {
    this._privateKey = value;
  }
  public resetPrivateKey() {
    this._privateKey = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateKeyInput() {
    return this._privateKey;
  }

  // proxy_host_id - computed: true, optional: true, required: false
  private _proxyHostId?: string; 
  public get proxyHostId() {
    return this.getStringAttribute('proxy_host_id');
  }
  public set proxyHostId(value: string) {
    this._proxyHostId = value;
  }
  public resetProxyHostId() {
    this._proxyHostId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get proxyHostIdInput() {
    return this._proxyHostId;
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

  // sync - computed: false, optional: true, required: false
  private _sync?: boolean | cdktf.IResolvable; 
  public get sync() {
    return this.getBooleanAttribute('sync');
  }
  public set sync(value: boolean | cdktf.IResolvable) {
    this._sync = value;
  }
  public resetSync() {
    this._sync = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get syncInput() {
    return this._sync;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // username - computed: false, optional: false, required: true
  private _username?: string; 
  public get username() {
    return this.getStringAttribute('username');
  }
  public set username(value: string) {
    this._username = value;
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
      as_proxy: cdktf.booleanToTerraform(this._asProxy),
      group_id: cdktf.stringToTerraform(this._groupId),
      id: cdktf.stringToTerraform(this._id),
      install_icagent: cdktf.booleanToTerraform(this._installIcagent),
      ip_address: cdktf.stringToTerraform(this._ipAddress),
      name: cdktf.stringToTerraform(this._name),
      os_type: cdktf.stringToTerraform(this._osType),
      password: cdktf.stringToTerraform(this._password),
      port: cdktf.numberToTerraform(this._port),
      private_key: cdktf.stringToTerraform(this._privateKey),
      proxy_host_id: cdktf.stringToTerraform(this._proxyHostId),
      region: cdktf.stringToTerraform(this._region),
      sync: cdktf.booleanToTerraform(this._sync),
      username: cdktf.stringToTerraform(this._username),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      as_proxy: {
        value: cdktf.booleanToHclTerraform(this._asProxy),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      install_icagent: {
        value: cdktf.booleanToHclTerraform(this._installIcagent),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      ip_address: {
        value: cdktf.stringToHclTerraform(this._ipAddress),
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
      os_type: {
        value: cdktf.stringToHclTerraform(this._osType),
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
      port: {
        value: cdktf.numberToHclTerraform(this._port),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      private_key: {
        value: cdktf.stringToHclTerraform(this._privateKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      proxy_host_id: {
        value: cdktf.stringToHclTerraform(this._proxyHostId),
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
      sync: {
        value: cdktf.booleanToHclTerraform(this._sync),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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

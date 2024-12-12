// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WorkspaceServiceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#access_mode WorkspaceService#access_mode}
  */
  readonly accessMode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#auth_type WorkspaceService#auth_type}
  */
  readonly authType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#dedicated_subnets WorkspaceService#dedicated_subnets}
  */
  readonly dedicatedSubnets?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#enterprise_id WorkspaceService#enterprise_id}
  */
  readonly enterpriseId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#id WorkspaceService#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#internet_access_port WorkspaceService#internet_access_port}
  */
  readonly internetAccessPort?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#lock_enabled WorkspaceService#lock_enabled}
  */
  readonly lockEnabled?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#management_subnet_cidr WorkspaceService#management_subnet_cidr}
  */
  readonly managementSubnetCidr?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#network_ids WorkspaceService#network_ids}
  */
  readonly networkIds: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#region WorkspaceService#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#vpc_id WorkspaceService#vpc_id}
  */
  readonly vpcId: string;
  /**
  * ad_domain block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#ad_domain WorkspaceService#ad_domain}
  */
  readonly adDomain?: WorkspaceServiceAdDomain;
  /**
  * otp_config_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#otp_config_info WorkspaceService#otp_config_info}
  */
  readonly otpConfigInfo?: WorkspaceServiceOtpConfigInfo;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#timeouts WorkspaceService#timeouts}
  */
  readonly timeouts?: WorkspaceServiceTimeouts;
}
export interface WorkspaceServiceDesktopSecurityGroup {
}

export function workspaceServiceDesktopSecurityGroupToTerraform(struct?: WorkspaceServiceDesktopSecurityGroup): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function workspaceServiceDesktopSecurityGroupToHclTerraform(struct?: WorkspaceServiceDesktopSecurityGroup): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class WorkspaceServiceDesktopSecurityGroupOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): WorkspaceServiceDesktopSecurityGroup | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceServiceDesktopSecurityGroup | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }
}

export class WorkspaceServiceDesktopSecurityGroupList extends cdktf.ComplexList {

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
  public get(index: number): WorkspaceServiceDesktopSecurityGroupOutputReference {
    return new WorkspaceServiceDesktopSecurityGroupOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface WorkspaceServiceInfrastructureSecurityGroup {
}

export function workspaceServiceInfrastructureSecurityGroupToTerraform(struct?: WorkspaceServiceInfrastructureSecurityGroup): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function workspaceServiceInfrastructureSecurityGroupToHclTerraform(struct?: WorkspaceServiceInfrastructureSecurityGroup): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class WorkspaceServiceInfrastructureSecurityGroupOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): WorkspaceServiceInfrastructureSecurityGroup | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceServiceInfrastructureSecurityGroup | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }
}

export class WorkspaceServiceInfrastructureSecurityGroupList extends cdktf.ComplexList {

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
  public get(index: number): WorkspaceServiceInfrastructureSecurityGroupOutputReference {
    return new WorkspaceServiceInfrastructureSecurityGroupOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface WorkspaceServiceAdDomain {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#active_dns_ip WorkspaceService#active_dns_ip}
  */
  readonly activeDnsIp?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#active_domain_ip WorkspaceService#active_domain_ip}
  */
  readonly activeDomainIp: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#active_domain_name WorkspaceService#active_domain_name}
  */
  readonly activeDomainName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#admin_account WorkspaceService#admin_account}
  */
  readonly adminAccount: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#delete_computer_object WorkspaceService#delete_computer_object}
  */
  readonly deleteComputerObject?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#name WorkspaceService#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#password WorkspaceService#password}
  */
  readonly password: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#standby_dns_ip WorkspaceService#standby_dns_ip}
  */
  readonly standbyDnsIp?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#standby_domain_ip WorkspaceService#standby_domain_ip}
  */
  readonly standbyDomainIp?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#standby_domain_name WorkspaceService#standby_domain_name}
  */
  readonly standbyDomainName?: string;
}

export function workspaceServiceAdDomainToTerraform(struct?: WorkspaceServiceAdDomainOutputReference | WorkspaceServiceAdDomain): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    active_dns_ip: cdktf.stringToTerraform(struct!.activeDnsIp),
    active_domain_ip: cdktf.stringToTerraform(struct!.activeDomainIp),
    active_domain_name: cdktf.stringToTerraform(struct!.activeDomainName),
    admin_account: cdktf.stringToTerraform(struct!.adminAccount),
    delete_computer_object: cdktf.booleanToTerraform(struct!.deleteComputerObject),
    name: cdktf.stringToTerraform(struct!.name),
    password: cdktf.stringToTerraform(struct!.password),
    standby_dns_ip: cdktf.stringToTerraform(struct!.standbyDnsIp),
    standby_domain_ip: cdktf.stringToTerraform(struct!.standbyDomainIp),
    standby_domain_name: cdktf.stringToTerraform(struct!.standbyDomainName),
  }
}


export function workspaceServiceAdDomainToHclTerraform(struct?: WorkspaceServiceAdDomainOutputReference | WorkspaceServiceAdDomain): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    active_dns_ip: {
      value: cdktf.stringToHclTerraform(struct!.activeDnsIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    active_domain_ip: {
      value: cdktf.stringToHclTerraform(struct!.activeDomainIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    active_domain_name: {
      value: cdktf.stringToHclTerraform(struct!.activeDomainName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    admin_account: {
      value: cdktf.stringToHclTerraform(struct!.adminAccount),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete_computer_object: {
      value: cdktf.booleanToHclTerraform(struct!.deleteComputerObject),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    standby_dns_ip: {
      value: cdktf.stringToHclTerraform(struct!.standbyDnsIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    standby_domain_ip: {
      value: cdktf.stringToHclTerraform(struct!.standbyDomainIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    standby_domain_name: {
      value: cdktf.stringToHclTerraform(struct!.standbyDomainName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceServiceAdDomainOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WorkspaceServiceAdDomain | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._activeDnsIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.activeDnsIp = this._activeDnsIp;
    }
    if (this._activeDomainIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.activeDomainIp = this._activeDomainIp;
    }
    if (this._activeDomainName !== undefined) {
      hasAnyValues = true;
      internalValueResult.activeDomainName = this._activeDomainName;
    }
    if (this._adminAccount !== undefined) {
      hasAnyValues = true;
      internalValueResult.adminAccount = this._adminAccount;
    }
    if (this._deleteComputerObject !== undefined) {
      hasAnyValues = true;
      internalValueResult.deleteComputerObject = this._deleteComputerObject;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._standbyDnsIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.standbyDnsIp = this._standbyDnsIp;
    }
    if (this._standbyDomainIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.standbyDomainIp = this._standbyDomainIp;
    }
    if (this._standbyDomainName !== undefined) {
      hasAnyValues = true;
      internalValueResult.standbyDomainName = this._standbyDomainName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceServiceAdDomain | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._activeDnsIp = undefined;
      this._activeDomainIp = undefined;
      this._activeDomainName = undefined;
      this._adminAccount = undefined;
      this._deleteComputerObject = undefined;
      this._name = undefined;
      this._password = undefined;
      this._standbyDnsIp = undefined;
      this._standbyDomainIp = undefined;
      this._standbyDomainName = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._activeDnsIp = value.activeDnsIp;
      this._activeDomainIp = value.activeDomainIp;
      this._activeDomainName = value.activeDomainName;
      this._adminAccount = value.adminAccount;
      this._deleteComputerObject = value.deleteComputerObject;
      this._name = value.name;
      this._password = value.password;
      this._standbyDnsIp = value.standbyDnsIp;
      this._standbyDomainIp = value.standbyDomainIp;
      this._standbyDomainName = value.standbyDomainName;
    }
  }

  // active_dns_ip - computed: false, optional: true, required: false
  private _activeDnsIp?: string; 
  public get activeDnsIp() {
    return this.getStringAttribute('active_dns_ip');
  }
  public set activeDnsIp(value: string) {
    this._activeDnsIp = value;
  }
  public resetActiveDnsIp() {
    this._activeDnsIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get activeDnsIpInput() {
    return this._activeDnsIp;
  }

  // active_domain_ip - computed: false, optional: false, required: true
  private _activeDomainIp?: string; 
  public get activeDomainIp() {
    return this.getStringAttribute('active_domain_ip');
  }
  public set activeDomainIp(value: string) {
    this._activeDomainIp = value;
  }
  // Temporarily expose input value. Use with caution.
  public get activeDomainIpInput() {
    return this._activeDomainIp;
  }

  // active_domain_name - computed: false, optional: false, required: true
  private _activeDomainName?: string; 
  public get activeDomainName() {
    return this.getStringAttribute('active_domain_name');
  }
  public set activeDomainName(value: string) {
    this._activeDomainName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get activeDomainNameInput() {
    return this._activeDomainName;
  }

  // admin_account - computed: false, optional: false, required: true
  private _adminAccount?: string; 
  public get adminAccount() {
    return this.getStringAttribute('admin_account');
  }
  public set adminAccount(value: string) {
    this._adminAccount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get adminAccountInput() {
    return this._adminAccount;
  }

  // delete_computer_object - computed: true, optional: true, required: false
  private _deleteComputerObject?: boolean | cdktf.IResolvable; 
  public get deleteComputerObject() {
    return this.getBooleanAttribute('delete_computer_object');
  }
  public set deleteComputerObject(value: boolean | cdktf.IResolvable) {
    this._deleteComputerObject = value;
  }
  public resetDeleteComputerObject() {
    this._deleteComputerObject = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteComputerObjectInput() {
    return this._deleteComputerObject;
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

  // standby_dns_ip - computed: false, optional: true, required: false
  private _standbyDnsIp?: string; 
  public get standbyDnsIp() {
    return this.getStringAttribute('standby_dns_ip');
  }
  public set standbyDnsIp(value: string) {
    this._standbyDnsIp = value;
  }
  public resetStandbyDnsIp() {
    this._standbyDnsIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get standbyDnsIpInput() {
    return this._standbyDnsIp;
  }

  // standby_domain_ip - computed: false, optional: true, required: false
  private _standbyDomainIp?: string; 
  public get standbyDomainIp() {
    return this.getStringAttribute('standby_domain_ip');
  }
  public set standbyDomainIp(value: string) {
    this._standbyDomainIp = value;
  }
  public resetStandbyDomainIp() {
    this._standbyDomainIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get standbyDomainIpInput() {
    return this._standbyDomainIp;
  }

  // standby_domain_name - computed: false, optional: true, required: false
  private _standbyDomainName?: string; 
  public get standbyDomainName() {
    return this.getStringAttribute('standby_domain_name');
  }
  public set standbyDomainName(value: string) {
    this._standbyDomainName = value;
  }
  public resetStandbyDomainName() {
    this._standbyDomainName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get standbyDomainNameInput() {
    return this._standbyDomainName;
  }
}
export interface WorkspaceServiceOtpConfigInfo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#app_id WorkspaceService#app_id}
  */
  readonly appId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#app_secret WorkspaceService#app_secret}
  */
  readonly appSecret?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#auth_server_access_mode WorkspaceService#auth_server_access_mode}
  */
  readonly authServerAccessMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#auth_url WorkspaceService#auth_url}
  */
  readonly authUrl?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#cert_content WorkspaceService#cert_content}
  */
  readonly certContent?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#enable WorkspaceService#enable}
  */
  readonly enable: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#receive_mode WorkspaceService#receive_mode}
  */
  readonly receiveMode: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#rule WorkspaceService#rule}
  */
  readonly rule?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#rule_type WorkspaceService#rule_type}
  */
  readonly ruleType?: string;
}

export function workspaceServiceOtpConfigInfoToTerraform(struct?: WorkspaceServiceOtpConfigInfoOutputReference | WorkspaceServiceOtpConfigInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    app_id: cdktf.stringToTerraform(struct!.appId),
    app_secret: cdktf.stringToTerraform(struct!.appSecret),
    auth_server_access_mode: cdktf.stringToTerraform(struct!.authServerAccessMode),
    auth_url: cdktf.stringToTerraform(struct!.authUrl),
    cert_content: cdktf.stringToTerraform(struct!.certContent),
    enable: cdktf.booleanToTerraform(struct!.enable),
    receive_mode: cdktf.stringToTerraform(struct!.receiveMode),
    rule: cdktf.stringToTerraform(struct!.rule),
    rule_type: cdktf.stringToTerraform(struct!.ruleType),
  }
}


export function workspaceServiceOtpConfigInfoToHclTerraform(struct?: WorkspaceServiceOtpConfigInfoOutputReference | WorkspaceServiceOtpConfigInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    app_id: {
      value: cdktf.stringToHclTerraform(struct!.appId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    app_secret: {
      value: cdktf.stringToHclTerraform(struct!.appSecret),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    auth_server_access_mode: {
      value: cdktf.stringToHclTerraform(struct!.authServerAccessMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    auth_url: {
      value: cdktf.stringToHclTerraform(struct!.authUrl),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    cert_content: {
      value: cdktf.stringToHclTerraform(struct!.certContent),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    enable: {
      value: cdktf.booleanToHclTerraform(struct!.enable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    receive_mode: {
      value: cdktf.stringToHclTerraform(struct!.receiveMode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    rule: {
      value: cdktf.stringToHclTerraform(struct!.rule),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    rule_type: {
      value: cdktf.stringToHclTerraform(struct!.ruleType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceServiceOtpConfigInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WorkspaceServiceOtpConfigInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._appId !== undefined) {
      hasAnyValues = true;
      internalValueResult.appId = this._appId;
    }
    if (this._appSecret !== undefined) {
      hasAnyValues = true;
      internalValueResult.appSecret = this._appSecret;
    }
    if (this._authServerAccessMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.authServerAccessMode = this._authServerAccessMode;
    }
    if (this._authUrl !== undefined) {
      hasAnyValues = true;
      internalValueResult.authUrl = this._authUrl;
    }
    if (this._certContent !== undefined) {
      hasAnyValues = true;
      internalValueResult.certContent = this._certContent;
    }
    if (this._enable !== undefined) {
      hasAnyValues = true;
      internalValueResult.enable = this._enable;
    }
    if (this._receiveMode !== undefined) {
      hasAnyValues = true;
      internalValueResult.receiveMode = this._receiveMode;
    }
    if (this._rule !== undefined) {
      hasAnyValues = true;
      internalValueResult.rule = this._rule;
    }
    if (this._ruleType !== undefined) {
      hasAnyValues = true;
      internalValueResult.ruleType = this._ruleType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceServiceOtpConfigInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._appId = undefined;
      this._appSecret = undefined;
      this._authServerAccessMode = undefined;
      this._authUrl = undefined;
      this._certContent = undefined;
      this._enable = undefined;
      this._receiveMode = undefined;
      this._rule = undefined;
      this._ruleType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._appId = value.appId;
      this._appSecret = value.appSecret;
      this._authServerAccessMode = value.authServerAccessMode;
      this._authUrl = value.authUrl;
      this._certContent = value.certContent;
      this._enable = value.enable;
      this._receiveMode = value.receiveMode;
      this._rule = value.rule;
      this._ruleType = value.ruleType;
    }
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

  // app_secret - computed: false, optional: true, required: false
  private _appSecret?: string; 
  public get appSecret() {
    return this.getStringAttribute('app_secret');
  }
  public set appSecret(value: string) {
    this._appSecret = value;
  }
  public resetAppSecret() {
    this._appSecret = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appSecretInput() {
    return this._appSecret;
  }

  // auth_server_access_mode - computed: false, optional: true, required: false
  private _authServerAccessMode?: string; 
  public get authServerAccessMode() {
    return this.getStringAttribute('auth_server_access_mode');
  }
  public set authServerAccessMode(value: string) {
    this._authServerAccessMode = value;
  }
  public resetAuthServerAccessMode() {
    this._authServerAccessMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authServerAccessModeInput() {
    return this._authServerAccessMode;
  }

  // auth_url - computed: false, optional: true, required: false
  private _authUrl?: string; 
  public get authUrl() {
    return this.getStringAttribute('auth_url');
  }
  public set authUrl(value: string) {
    this._authUrl = value;
  }
  public resetAuthUrl() {
    this._authUrl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get authUrlInput() {
    return this._authUrl;
  }

  // cert_content - computed: false, optional: true, required: false
  private _certContent?: string; 
  public get certContent() {
    return this.getStringAttribute('cert_content');
  }
  public set certContent(value: string) {
    this._certContent = value;
  }
  public resetCertContent() {
    this._certContent = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certContentInput() {
    return this._certContent;
  }

  // enable - computed: false, optional: false, required: true
  private _enable?: boolean | cdktf.IResolvable; 
  public get enable() {
    return this.getBooleanAttribute('enable');
  }
  public set enable(value: boolean | cdktf.IResolvable) {
    this._enable = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enableInput() {
    return this._enable;
  }

  // receive_mode - computed: false, optional: false, required: true
  private _receiveMode?: string; 
  public get receiveMode() {
    return this.getStringAttribute('receive_mode');
  }
  public set receiveMode(value: string) {
    this._receiveMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get receiveModeInput() {
    return this._receiveMode;
  }

  // rule - computed: false, optional: true, required: false
  private _rule?: string; 
  public get rule() {
    return this.getStringAttribute('rule');
  }
  public set rule(value: string) {
    this._rule = value;
  }
  public resetRule() {
    this._rule = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleInput() {
    return this._rule;
  }

  // rule_type - computed: false, optional: true, required: false
  private _ruleType?: string; 
  public get ruleType() {
    return this.getStringAttribute('rule_type');
  }
  public set ruleType(value: string) {
    this._ruleType = value;
  }
  public resetRuleType() {
    this._ruleType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleTypeInput() {
    return this._ruleType;
  }
}
export interface WorkspaceServiceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#create WorkspaceService#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#delete WorkspaceService#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#update WorkspaceService#update}
  */
  readonly update?: string;
}

export function workspaceServiceTimeoutsToTerraform(struct?: WorkspaceServiceTimeouts | cdktf.IResolvable): any {
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


export function workspaceServiceTimeoutsToHclTerraform(struct?: WorkspaceServiceTimeouts | cdktf.IResolvable): any {
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

export class WorkspaceServiceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): WorkspaceServiceTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: WorkspaceServiceTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service huaweicloud_workspace_service}
*/
export class WorkspaceService extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_service";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WorkspaceService resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WorkspaceService to import
  * @param importFromId The id of the existing WorkspaceService that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WorkspaceService to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_service", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_service huaweicloud_workspace_service} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WorkspaceServiceConfig
  */
  public constructor(scope: Construct, id: string, config: WorkspaceServiceConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_service',
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
    this._accessMode = config.accessMode;
    this._authType = config.authType;
    this._dedicatedSubnets = config.dedicatedSubnets;
    this._enterpriseId = config.enterpriseId;
    this._id = config.id;
    this._internetAccessPort = config.internetAccessPort;
    this._lockEnabled = config.lockEnabled;
    this._managementSubnetCidr = config.managementSubnetCidr;
    this._networkIds = config.networkIds;
    this._region = config.region;
    this._vpcId = config.vpcId;
    this._adDomain.internalValue = config.adDomain;
    this._otpConfigInfo.internalValue = config.otpConfigInfo;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_mode - computed: false, optional: false, required: true
  private _accessMode?: string; 
  public get accessMode() {
    return this.getStringAttribute('access_mode');
  }
  public set accessMode(value: string) {
    this._accessMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get accessModeInput() {
    return this._accessMode;
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

  // dedicated_subnets - computed: true, optional: true, required: false
  private _dedicatedSubnets?: string[]; 
  public get dedicatedSubnets() {
    return this.getListAttribute('dedicated_subnets');
  }
  public set dedicatedSubnets(value: string[]) {
    this._dedicatedSubnets = value;
  }
  public resetDedicatedSubnets() {
    this._dedicatedSubnets = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dedicatedSubnetsInput() {
    return this._dedicatedSubnets;
  }

  // desktop_security_group - computed: true, optional: false, required: false
  private _desktopSecurityGroup = new WorkspaceServiceDesktopSecurityGroupList(this, "desktop_security_group", false);
  public get desktopSecurityGroup() {
    return this._desktopSecurityGroup;
  }

  // enterprise_id - computed: true, optional: true, required: false
  private _enterpriseId?: string; 
  public get enterpriseId() {
    return this.getStringAttribute('enterprise_id');
  }
  public set enterpriseId(value: string) {
    this._enterpriseId = value;
  }
  public resetEnterpriseId() {
    this._enterpriseId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseIdInput() {
    return this._enterpriseId;
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

  // infrastructure_security_group - computed: true, optional: false, required: false
  private _infrastructureSecurityGroup = new WorkspaceServiceInfrastructureSecurityGroupList(this, "infrastructure_security_group", false);
  public get infrastructureSecurityGroup() {
    return this._infrastructureSecurityGroup;
  }

  // internet_access_address - computed: true, optional: false, required: false
  public get internetAccessAddress() {
    return this.getStringAttribute('internet_access_address');
  }

  // internet_access_port - computed: true, optional: true, required: false
  private _internetAccessPort?: number; 
  public get internetAccessPort() {
    return this.getNumberAttribute('internet_access_port');
  }
  public set internetAccessPort(value: number) {
    this._internetAccessPort = value;
  }
  public resetInternetAccessPort() {
    this._internetAccessPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get internetAccessPortInput() {
    return this._internetAccessPort;
  }

  // is_locked - computed: true, optional: false, required: false
  public get isLocked() {
    return this.getNumberAttribute('is_locked');
  }

  // lock_enabled - computed: false, optional: true, required: false
  private _lockEnabled?: boolean | cdktf.IResolvable; 
  public get lockEnabled() {
    return this.getBooleanAttribute('lock_enabled');
  }
  public set lockEnabled(value: boolean | cdktf.IResolvable) {
    this._lockEnabled = value;
  }
  public resetLockEnabled() {
    this._lockEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lockEnabledInput() {
    return this._lockEnabled;
  }

  // lock_reason - computed: true, optional: false, required: false
  public get lockReason() {
    return this.getStringAttribute('lock_reason');
  }

  // lock_time - computed: true, optional: false, required: false
  public get lockTime() {
    return this.getStringAttribute('lock_time');
  }

  // management_subnet_cidr - computed: true, optional: true, required: false
  private _managementSubnetCidr?: string; 
  public get managementSubnetCidr() {
    return this.getStringAttribute('management_subnet_cidr');
  }
  public set managementSubnetCidr(value: string) {
    this._managementSubnetCidr = value;
  }
  public resetManagementSubnetCidr() {
    this._managementSubnetCidr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get managementSubnetCidrInput() {
    return this._managementSubnetCidr;
  }

  // network_ids - computed: false, optional: false, required: true
  private _networkIds?: string[]; 
  public get networkIds() {
    return this.getListAttribute('network_ids');
  }
  public set networkIds(value: string[]) {
    this._networkIds = value;
  }
  // Temporarily expose input value. Use with caution.
  public get networkIdsInput() {
    return this._networkIds;
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // vpc_id - computed: false, optional: false, required: true
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // ad_domain - computed: false, optional: true, required: false
  private _adDomain = new WorkspaceServiceAdDomainOutputReference(this, "ad_domain");
  public get adDomain() {
    return this._adDomain;
  }
  public putAdDomain(value: WorkspaceServiceAdDomain) {
    this._adDomain.internalValue = value;
  }
  public resetAdDomain() {
    this._adDomain.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get adDomainInput() {
    return this._adDomain.internalValue;
  }

  // otp_config_info - computed: false, optional: true, required: false
  private _otpConfigInfo = new WorkspaceServiceOtpConfigInfoOutputReference(this, "otp_config_info");
  public get otpConfigInfo() {
    return this._otpConfigInfo;
  }
  public putOtpConfigInfo(value: WorkspaceServiceOtpConfigInfo) {
    this._otpConfigInfo.internalValue = value;
  }
  public resetOtpConfigInfo() {
    this._otpConfigInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get otpConfigInfoInput() {
    return this._otpConfigInfo.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new WorkspaceServiceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: WorkspaceServiceTimeouts) {
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
      access_mode: cdktf.stringToTerraform(this._accessMode),
      auth_type: cdktf.stringToTerraform(this._authType),
      dedicated_subnets: cdktf.listMapper(cdktf.stringToTerraform, false)(this._dedicatedSubnets),
      enterprise_id: cdktf.stringToTerraform(this._enterpriseId),
      id: cdktf.stringToTerraform(this._id),
      internet_access_port: cdktf.numberToTerraform(this._internetAccessPort),
      lock_enabled: cdktf.booleanToTerraform(this._lockEnabled),
      management_subnet_cidr: cdktf.stringToTerraform(this._managementSubnetCidr),
      network_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._networkIds),
      region: cdktf.stringToTerraform(this._region),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      ad_domain: workspaceServiceAdDomainToTerraform(this._adDomain.internalValue),
      otp_config_info: workspaceServiceOtpConfigInfoToTerraform(this._otpConfigInfo.internalValue),
      timeouts: workspaceServiceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      access_mode: {
        value: cdktf.stringToHclTerraform(this._accessMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auth_type: {
        value: cdktf.stringToHclTerraform(this._authType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dedicated_subnets: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._dedicatedSubnets),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      enterprise_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseId),
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
      internet_access_port: {
        value: cdktf.numberToHclTerraform(this._internetAccessPort),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      lock_enabled: {
        value: cdktf.booleanToHclTerraform(this._lockEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      management_subnet_cidr: {
        value: cdktf.stringToHclTerraform(this._managementSubnetCidr),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      network_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._networkIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ad_domain: {
        value: workspaceServiceAdDomainToHclTerraform(this._adDomain.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WorkspaceServiceAdDomainList",
      },
      otp_config_info: {
        value: workspaceServiceOtpConfigInfoToHclTerraform(this._otpConfigInfo.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WorkspaceServiceOtpConfigInfoList",
      },
      timeouts: {
        value: workspaceServiceTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "WorkspaceServiceTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

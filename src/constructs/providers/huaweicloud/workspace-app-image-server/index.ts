// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WorkspaceAppImageServerConfig extends cdktf.TerraformMetaArguments {
  /**
  * The list of the warehouse apps.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#attach_apps WorkspaceAppImageServer#attach_apps}
  */
  readonly attachApps?: string[];
  /**
  * The availability zone of the image server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#availability_zone WorkspaceAppImageServer#availability_zone}
  */
  readonly availabilityZone?: string;
  /**
  * The description of the image server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#description WorkspaceAppImageServer#description}
  */
  readonly description?: string;
  /**
  * The ID of the enterprise project to which the image server belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#enterprise_project_id WorkspaceAppImageServer#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * The number of additional sessions for a single server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#extra_session_size WorkspaceAppImageServer#extra_session_size}
  */
  readonly extraSessionSize?: number;
  /**
  * The additional session type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#extra_session_type WorkspaceAppImageServer#extra_session_type}
  */
  readonly extraSessionType?: string;
  /**
  * The flavor ID of the image server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#flavor_id WorkspaceAppImageServer#flavor_id}
  */
  readonly flavorId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#id WorkspaceAppImageServer#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The basic image ID of the image server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#image_id WorkspaceAppImageServer#image_id}
  */
  readonly imageId: string;
  /**
  * The basic image product ID of the image server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#image_source_product_id WorkspaceAppImageServer#image_source_product_id}
  */
  readonly imageSourceProductId?: string;
  /**
  * The basic image type of the image server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#image_type WorkspaceAppImageServer#image_type}
  */
  readonly imageType: string;
  /**
  * Whether to delete resources associated with this image server after deleting it.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#is_delete_associated_resources WorkspaceAppImageServer#is_delete_associated_resources}
  */
  readonly isDeleteAssociatedResources?: boolean | cdktf.IResolvable;
  /**
  * The session mode of the image server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#is_vdi WorkspaceAppImageServer#is_vdi}
  */
  readonly isVdi?: boolean | cdktf.IResolvable;
  /**
  * The name of the image server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#name WorkspaceAppImageServer#name}
  */
  readonly name: string;
  /**
  * The OU name corresponding to the AD server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#ou_name WorkspaceAppImageServer#ou_name}
  */
  readonly ouName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#region WorkspaceAppImageServer#region}
  */
  readonly region?: string;
  /**
  * The specification code of the basic image to which the image server belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#spec_code WorkspaceAppImageServer#spec_code}
  */
  readonly specCode?: string;
  /**
  * The subnet ID to which the image server belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#subnet_id WorkspaceAppImageServer#subnet_id}
  */
  readonly subnetId: string;
  /**
  * The key/value pairs to associate with the image server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#tags WorkspaceAppImageServer#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * The VPC ID to which the image server belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#vpc_id WorkspaceAppImageServer#vpc_id}
  */
  readonly vpcId: string;
  /**
  * authorize_accounts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#authorize_accounts WorkspaceAppImageServer#authorize_accounts}
  */
  readonly authorizeAccounts: WorkspaceAppImageServerAuthorizeAccounts[] | cdktf.IResolvable;
  /**
  * root_volume block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#root_volume WorkspaceAppImageServer#root_volume}
  */
  readonly rootVolume: WorkspaceAppImageServerRootVolume;
  /**
  * route_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#route_policy WorkspaceAppImageServer#route_policy}
  */
  readonly routePolicy?: WorkspaceAppImageServerRoutePolicy;
  /**
  * scheduler_hints block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#scheduler_hints WorkspaceAppImageServer#scheduler_hints}
  */
  readonly schedulerHints?: WorkspaceAppImageServerSchedulerHints;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#timeouts WorkspaceAppImageServer#timeouts}
  */
  readonly timeouts?: WorkspaceAppImageServerTimeouts;
}
export interface WorkspaceAppImageServerAuthorizeAccounts {
  /**
  * The name of the account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#account WorkspaceAppImageServer#account}
  */
  readonly account: string;
  /**
  * The domain name of the Workspace service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#domain WorkspaceAppImageServer#domain}
  */
  readonly domain?: string;
  /**
  * The type of the account.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#type WorkspaceAppImageServer#type}
  */
  readonly type: string;
}

export function workspaceAppImageServerAuthorizeAccountsToTerraform(struct?: WorkspaceAppImageServerAuthorizeAccounts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    account: cdktf.stringToTerraform(struct!.account),
    domain: cdktf.stringToTerraform(struct!.domain),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function workspaceAppImageServerAuthorizeAccountsToHclTerraform(struct?: WorkspaceAppImageServerAuthorizeAccounts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    account: {
      value: cdktf.stringToHclTerraform(struct!.account),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    domain: {
      value: cdktf.stringToHclTerraform(struct!.domain),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceAppImageServerAuthorizeAccountsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): WorkspaceAppImageServerAuthorizeAccounts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._account !== undefined) {
      hasAnyValues = true;
      internalValueResult.account = this._account;
    }
    if (this._domain !== undefined) {
      hasAnyValues = true;
      internalValueResult.domain = this._domain;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceAppImageServerAuthorizeAccounts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._account = undefined;
      this._domain = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._account = value.account;
      this._domain = value.domain;
      this._type = value.type;
    }
  }

  // account - computed: false, optional: false, required: true
  private _account?: string; 
  public get account() {
    return this.getStringAttribute('account');
  }
  public set account(value: string) {
    this._account = value;
  }
  // Temporarily expose input value. Use with caution.
  public get accountInput() {
    return this._account;
  }

  // domain - computed: false, optional: true, required: false
  private _domain?: string; 
  public get domain() {
    return this.getStringAttribute('domain');
  }
  public set domain(value: string) {
    this._domain = value;
  }
  public resetDomain() {
    this._domain = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainInput() {
    return this._domain;
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
}

export class WorkspaceAppImageServerAuthorizeAccountsList extends cdktf.ComplexList {
  public internalValue? : WorkspaceAppImageServerAuthorizeAccounts[] | cdktf.IResolvable

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
  public get(index: number): WorkspaceAppImageServerAuthorizeAccountsOutputReference {
    return new WorkspaceAppImageServerAuthorizeAccountsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface WorkspaceAppImageServerRootVolume {
  /**
  * The disk size of the image server, in GB.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#size WorkspaceAppImageServer#size}
  */
  readonly size: number;
  /**
  * The disk type of the image server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#type WorkspaceAppImageServer#type}
  */
  readonly type: string;
}

export function workspaceAppImageServerRootVolumeToTerraform(struct?: WorkspaceAppImageServerRootVolumeOutputReference | WorkspaceAppImageServerRootVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    size: cdktf.numberToTerraform(struct!.size),
    type: cdktf.stringToTerraform(struct!.type),
  }
}


export function workspaceAppImageServerRootVolumeToHclTerraform(struct?: WorkspaceAppImageServerRootVolumeOutputReference | WorkspaceAppImageServerRootVolume): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceAppImageServerRootVolumeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WorkspaceAppImageServerRootVolume | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceAppImageServerRootVolume | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._size = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._size = value.size;
      this._type = value.type;
    }
  }

  // size - computed: false, optional: false, required: true
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
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
}
export interface WorkspaceAppImageServerRoutePolicy {
  /**
  * The CPU usage of the server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#cpu_threshold WorkspaceAppImageServer#cpu_threshold}
  */
  readonly cpuThreshold?: number;
  /**
  * The number of session connections of the server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#max_session WorkspaceAppImageServer#max_session}
  */
  readonly maxSession?: number;
  /**
  * The memory usage of the server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#mem_threshold WorkspaceAppImageServer#mem_threshold}
  */
  readonly memThreshold?: number;
}

export function workspaceAppImageServerRoutePolicyToTerraform(struct?: WorkspaceAppImageServerRoutePolicyOutputReference | WorkspaceAppImageServerRoutePolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cpu_threshold: cdktf.numberToTerraform(struct!.cpuThreshold),
    max_session: cdktf.numberToTerraform(struct!.maxSession),
    mem_threshold: cdktf.numberToTerraform(struct!.memThreshold),
  }
}


export function workspaceAppImageServerRoutePolicyToHclTerraform(struct?: WorkspaceAppImageServerRoutePolicyOutputReference | WorkspaceAppImageServerRoutePolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cpu_threshold: {
      value: cdktf.numberToHclTerraform(struct!.cpuThreshold),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    max_session: {
      value: cdktf.numberToHclTerraform(struct!.maxSession),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    mem_threshold: {
      value: cdktf.numberToHclTerraform(struct!.memThreshold),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceAppImageServerRoutePolicyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WorkspaceAppImageServerRoutePolicy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cpuThreshold !== undefined) {
      hasAnyValues = true;
      internalValueResult.cpuThreshold = this._cpuThreshold;
    }
    if (this._maxSession !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxSession = this._maxSession;
    }
    if (this._memThreshold !== undefined) {
      hasAnyValues = true;
      internalValueResult.memThreshold = this._memThreshold;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceAppImageServerRoutePolicy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._cpuThreshold = undefined;
      this._maxSession = undefined;
      this._memThreshold = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._cpuThreshold = value.cpuThreshold;
      this._maxSession = value.maxSession;
      this._memThreshold = value.memThreshold;
    }
  }

  // cpu_threshold - computed: false, optional: true, required: false
  private _cpuThreshold?: number; 
  public get cpuThreshold() {
    return this.getNumberAttribute('cpu_threshold');
  }
  public set cpuThreshold(value: number) {
    this._cpuThreshold = value;
  }
  public resetCpuThreshold() {
    this._cpuThreshold = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cpuThresholdInput() {
    return this._cpuThreshold;
  }

  // max_session - computed: false, optional: true, required: false
  private _maxSession?: number; 
  public get maxSession() {
    return this.getNumberAttribute('max_session');
  }
  public set maxSession(value: number) {
    this._maxSession = value;
  }
  public resetMaxSession() {
    this._maxSession = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxSessionInput() {
    return this._maxSession;
  }

  // mem_threshold - computed: false, optional: true, required: false
  private _memThreshold?: number; 
  public get memThreshold() {
    return this.getNumberAttribute('mem_threshold');
  }
  public set memThreshold(value: number) {
    this._memThreshold = value;
  }
  public resetMemThreshold() {
    this._memThreshold = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get memThresholdInput() {
    return this._memThreshold;
  }
}
export interface WorkspaceAppImageServerSchedulerHints {
  /**
  * The ID of the dedicate host.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#dedicated_host_id WorkspaceAppImageServer#dedicated_host_id}
  */
  readonly dedicatedHostId?: string;
  /**
  * The type of the dedicate host.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#tenancy WorkspaceAppImageServer#tenancy}
  */
  readonly tenancy?: string;
}

export function workspaceAppImageServerSchedulerHintsToTerraform(struct?: WorkspaceAppImageServerSchedulerHintsOutputReference | WorkspaceAppImageServerSchedulerHints): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dedicated_host_id: cdktf.stringToTerraform(struct!.dedicatedHostId),
    tenancy: cdktf.stringToTerraform(struct!.tenancy),
  }
}


export function workspaceAppImageServerSchedulerHintsToHclTerraform(struct?: WorkspaceAppImageServerSchedulerHintsOutputReference | WorkspaceAppImageServerSchedulerHints): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    dedicated_host_id: {
      value: cdktf.stringToHclTerraform(struct!.dedicatedHostId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    tenancy: {
      value: cdktf.stringToHclTerraform(struct!.tenancy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceAppImageServerSchedulerHintsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WorkspaceAppImageServerSchedulerHints | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dedicatedHostId !== undefined) {
      hasAnyValues = true;
      internalValueResult.dedicatedHostId = this._dedicatedHostId;
    }
    if (this._tenancy !== undefined) {
      hasAnyValues = true;
      internalValueResult.tenancy = this._tenancy;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceAppImageServerSchedulerHints | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._dedicatedHostId = undefined;
      this._tenancy = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._dedicatedHostId = value.dedicatedHostId;
      this._tenancy = value.tenancy;
    }
  }

  // dedicated_host_id - computed: false, optional: true, required: false
  private _dedicatedHostId?: string; 
  public get dedicatedHostId() {
    return this.getStringAttribute('dedicated_host_id');
  }
  public set dedicatedHostId(value: string) {
    this._dedicatedHostId = value;
  }
  public resetDedicatedHostId() {
    this._dedicatedHostId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dedicatedHostIdInput() {
    return this._dedicatedHostId;
  }

  // tenancy - computed: false, optional: true, required: false
  private _tenancy?: string; 
  public get tenancy() {
    return this.getStringAttribute('tenancy');
  }
  public set tenancy(value: string) {
    this._tenancy = value;
  }
  public resetTenancy() {
    this._tenancy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tenancyInput() {
    return this._tenancy;
  }
}
export interface WorkspaceAppImageServerTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#create WorkspaceAppImageServer#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#delete WorkspaceAppImageServer#delete}
  */
  readonly delete?: string;
}

export function workspaceAppImageServerTimeoutsToTerraform(struct?: WorkspaceAppImageServerTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function workspaceAppImageServerTimeoutsToHclTerraform(struct?: WorkspaceAppImageServerTimeouts | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceAppImageServerTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): WorkspaceAppImageServerTimeouts | cdktf.IResolvable | undefined {
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
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceAppImageServerTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server huaweicloud_workspace_app_image_server}
*/
export class WorkspaceAppImageServer extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_app_image_server";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WorkspaceAppImageServer resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WorkspaceAppImageServer to import
  * @param importFromId The id of the existing WorkspaceAppImageServer that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WorkspaceAppImageServer to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_app_image_server", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_image_server huaweicloud_workspace_app_image_server} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WorkspaceAppImageServerConfig
  */
  public constructor(scope: Construct, id: string, config: WorkspaceAppImageServerConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_app_image_server',
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
    this._attachApps = config.attachApps;
    this._availabilityZone = config.availabilityZone;
    this._description = config.description;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._extraSessionSize = config.extraSessionSize;
    this._extraSessionType = config.extraSessionType;
    this._flavorId = config.flavorId;
    this._id = config.id;
    this._imageId = config.imageId;
    this._imageSourceProductId = config.imageSourceProductId;
    this._imageType = config.imageType;
    this._isDeleteAssociatedResources = config.isDeleteAssociatedResources;
    this._isVdi = config.isVdi;
    this._name = config.name;
    this._ouName = config.ouName;
    this._region = config.region;
    this._specCode = config.specCode;
    this._subnetId = config.subnetId;
    this._tags = config.tags;
    this._vpcId = config.vpcId;
    this._authorizeAccounts.internalValue = config.authorizeAccounts;
    this._rootVolume.internalValue = config.rootVolume;
    this._routePolicy.internalValue = config.routePolicy;
    this._schedulerHints.internalValue = config.schedulerHints;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // attach_apps - computed: false, optional: true, required: false
  private _attachApps?: string[]; 
  public get attachApps() {
    return this.getListAttribute('attach_apps');
  }
  public set attachApps(value: string[]) {
    this._attachApps = value;
  }
  public resetAttachApps() {
    this._attachApps = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get attachAppsInput() {
    return this._attachApps;
  }

  // availability_zone - computed: false, optional: true, required: false
  private _availabilityZone?: string; 
  public get availabilityZone() {
    return this.getStringAttribute('availability_zone');
  }
  public set availabilityZone(value: string) {
    this._availabilityZone = value;
  }
  public resetAvailabilityZone() {
    this._availabilityZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZoneInput() {
    return this._availabilityZone;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // enterprise_project_id - computed: true, optional: true, required: false
  private _enterpriseProjectId?: string; 
  public get enterpriseProjectId() {
    return this.getStringAttribute('enterprise_project_id');
  }
  public set enterpriseProjectId(value: string) {
    this._enterpriseProjectId = value;
  }
  public resetEnterpriseProjectId() {
    this._enterpriseProjectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enterpriseProjectIdInput() {
    return this._enterpriseProjectId;
  }

  // extra_session_size - computed: false, optional: true, required: false
  private _extraSessionSize?: number; 
  public get extraSessionSize() {
    return this.getNumberAttribute('extra_session_size');
  }
  public set extraSessionSize(value: number) {
    this._extraSessionSize = value;
  }
  public resetExtraSessionSize() {
    this._extraSessionSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extraSessionSizeInput() {
    return this._extraSessionSize;
  }

  // extra_session_type - computed: false, optional: true, required: false
  private _extraSessionType?: string; 
  public get extraSessionType() {
    return this.getStringAttribute('extra_session_type');
  }
  public set extraSessionType(value: string) {
    this._extraSessionType = value;
  }
  public resetExtraSessionType() {
    this._extraSessionType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extraSessionTypeInput() {
    return this._extraSessionType;
  }

  // flavor_id - computed: false, optional: false, required: true
  private _flavorId?: string; 
  public get flavorId() {
    return this.getStringAttribute('flavor_id');
  }
  public set flavorId(value: string) {
    this._flavorId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorIdInput() {
    return this._flavorId;
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

  // image_id - computed: false, optional: false, required: true
  private _imageId?: string; 
  public get imageId() {
    return this.getStringAttribute('image_id');
  }
  public set imageId(value: string) {
    this._imageId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get imageIdInput() {
    return this._imageId;
  }

  // image_source_product_id - computed: false, optional: true, required: false
  private _imageSourceProductId?: string; 
  public get imageSourceProductId() {
    return this.getStringAttribute('image_source_product_id');
  }
  public set imageSourceProductId(value: string) {
    this._imageSourceProductId = value;
  }
  public resetImageSourceProductId() {
    this._imageSourceProductId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get imageSourceProductIdInput() {
    return this._imageSourceProductId;
  }

  // image_type - computed: false, optional: false, required: true
  private _imageType?: string; 
  public get imageType() {
    return this.getStringAttribute('image_type');
  }
  public set imageType(value: string) {
    this._imageType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get imageTypeInput() {
    return this._imageType;
  }

  // is_delete_associated_resources - computed: false, optional: true, required: false
  private _isDeleteAssociatedResources?: boolean | cdktf.IResolvable; 
  public get isDeleteAssociatedResources() {
    return this.getBooleanAttribute('is_delete_associated_resources');
  }
  public set isDeleteAssociatedResources(value: boolean | cdktf.IResolvable) {
    this._isDeleteAssociatedResources = value;
  }
  public resetIsDeleteAssociatedResources() {
    this._isDeleteAssociatedResources = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isDeleteAssociatedResourcesInput() {
    return this._isDeleteAssociatedResources;
  }

  // is_vdi - computed: false, optional: true, required: false
  private _isVdi?: boolean | cdktf.IResolvable; 
  public get isVdi() {
    return this.getBooleanAttribute('is_vdi');
  }
  public set isVdi(value: boolean | cdktf.IResolvable) {
    this._isVdi = value;
  }
  public resetIsVdi() {
    this._isVdi = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isVdiInput() {
    return this._isVdi;
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

  // ou_name - computed: false, optional: true, required: false
  private _ouName?: string; 
  public get ouName() {
    return this.getStringAttribute('ou_name');
  }
  public set ouName(value: string) {
    this._ouName = value;
  }
  public resetOuName() {
    this._ouName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ouNameInput() {
    return this._ouName;
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

  // spec_code - computed: true, optional: true, required: false
  private _specCode?: string; 
  public get specCode() {
    return this.getStringAttribute('spec_code');
  }
  public set specCode(value: string) {
    this._specCode = value;
  }
  public resetSpecCode() {
    this._specCode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get specCodeInput() {
    return this._specCode;
  }

  // subnet_id - computed: false, optional: false, required: true
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
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

  // authorize_accounts - computed: false, optional: false, required: true
  private _authorizeAccounts = new WorkspaceAppImageServerAuthorizeAccountsList(this, "authorize_accounts", true);
  public get authorizeAccounts() {
    return this._authorizeAccounts;
  }
  public putAuthorizeAccounts(value: WorkspaceAppImageServerAuthorizeAccounts[] | cdktf.IResolvable) {
    this._authorizeAccounts.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get authorizeAccountsInput() {
    return this._authorizeAccounts.internalValue;
  }

  // root_volume - computed: false, optional: false, required: true
  private _rootVolume = new WorkspaceAppImageServerRootVolumeOutputReference(this, "root_volume");
  public get rootVolume() {
    return this._rootVolume;
  }
  public putRootVolume(value: WorkspaceAppImageServerRootVolume) {
    this._rootVolume.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeInput() {
    return this._rootVolume.internalValue;
  }

  // route_policy - computed: false, optional: true, required: false
  private _routePolicy = new WorkspaceAppImageServerRoutePolicyOutputReference(this, "route_policy");
  public get routePolicy() {
    return this._routePolicy;
  }
  public putRoutePolicy(value: WorkspaceAppImageServerRoutePolicy) {
    this._routePolicy.internalValue = value;
  }
  public resetRoutePolicy() {
    this._routePolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get routePolicyInput() {
    return this._routePolicy.internalValue;
  }

  // scheduler_hints - computed: false, optional: true, required: false
  private _schedulerHints = new WorkspaceAppImageServerSchedulerHintsOutputReference(this, "scheduler_hints");
  public get schedulerHints() {
    return this._schedulerHints;
  }
  public putSchedulerHints(value: WorkspaceAppImageServerSchedulerHints) {
    this._schedulerHints.internalValue = value;
  }
  public resetSchedulerHints() {
    this._schedulerHints.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get schedulerHintsInput() {
    return this._schedulerHints.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new WorkspaceAppImageServerTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: WorkspaceAppImageServerTimeouts) {
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
      attach_apps: cdktf.listMapper(cdktf.stringToTerraform, false)(this._attachApps),
      availability_zone: cdktf.stringToTerraform(this._availabilityZone),
      description: cdktf.stringToTerraform(this._description),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      extra_session_size: cdktf.numberToTerraform(this._extraSessionSize),
      extra_session_type: cdktf.stringToTerraform(this._extraSessionType),
      flavor_id: cdktf.stringToTerraform(this._flavorId),
      id: cdktf.stringToTerraform(this._id),
      image_id: cdktf.stringToTerraform(this._imageId),
      image_source_product_id: cdktf.stringToTerraform(this._imageSourceProductId),
      image_type: cdktf.stringToTerraform(this._imageType),
      is_delete_associated_resources: cdktf.booleanToTerraform(this._isDeleteAssociatedResources),
      is_vdi: cdktf.booleanToTerraform(this._isVdi),
      name: cdktf.stringToTerraform(this._name),
      ou_name: cdktf.stringToTerraform(this._ouName),
      region: cdktf.stringToTerraform(this._region),
      spec_code: cdktf.stringToTerraform(this._specCode),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      authorize_accounts: cdktf.listMapper(workspaceAppImageServerAuthorizeAccountsToTerraform, true)(this._authorizeAccounts.internalValue),
      root_volume: workspaceAppImageServerRootVolumeToTerraform(this._rootVolume.internalValue),
      route_policy: workspaceAppImageServerRoutePolicyToTerraform(this._routePolicy.internalValue),
      scheduler_hints: workspaceAppImageServerSchedulerHintsToTerraform(this._schedulerHints.internalValue),
      timeouts: workspaceAppImageServerTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      attach_apps: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._attachApps),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      availability_zone: {
        value: cdktf.stringToHclTerraform(this._availabilityZone),
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
      enterprise_project_id: {
        value: cdktf.stringToHclTerraform(this._enterpriseProjectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      extra_session_size: {
        value: cdktf.numberToHclTerraform(this._extraSessionSize),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      extra_session_type: {
        value: cdktf.stringToHclTerraform(this._extraSessionType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      flavor_id: {
        value: cdktf.stringToHclTerraform(this._flavorId),
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
      image_id: {
        value: cdktf.stringToHclTerraform(this._imageId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      image_source_product_id: {
        value: cdktf.stringToHclTerraform(this._imageSourceProductId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      image_type: {
        value: cdktf.stringToHclTerraform(this._imageType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_delete_associated_resources: {
        value: cdktf.booleanToHclTerraform(this._isDeleteAssociatedResources),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      is_vdi: {
        value: cdktf.booleanToHclTerraform(this._isVdi),
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
      ou_name: {
        value: cdktf.stringToHclTerraform(this._ouName),
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
      spec_code: {
        value: cdktf.stringToHclTerraform(this._specCode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      subnet_id: {
        value: cdktf.stringToHclTerraform(this._subnetId),
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
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      authorize_accounts: {
        value: cdktf.listMapperHcl(workspaceAppImageServerAuthorizeAccountsToHclTerraform, true)(this._authorizeAccounts.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "WorkspaceAppImageServerAuthorizeAccountsList",
      },
      root_volume: {
        value: workspaceAppImageServerRootVolumeToHclTerraform(this._rootVolume.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WorkspaceAppImageServerRootVolumeList",
      },
      route_policy: {
        value: workspaceAppImageServerRoutePolicyToHclTerraform(this._routePolicy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WorkspaceAppImageServerRoutePolicyList",
      },
      scheduler_hints: {
        value: workspaceAppImageServerSchedulerHintsToHclTerraform(this._schedulerHints.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WorkspaceAppImageServerSchedulerHintsList",
      },
      timeouts: {
        value: workspaceAppImageServerTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "WorkspaceAppImageServerTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

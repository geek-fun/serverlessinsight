// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface WorkspaceAppServerGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * The type of application group associated with the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#app_type WorkspaceAppServerGroup#app_type}
  */
  readonly appType?: string;
  /**
  * The availability zone of the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#availability_zone WorkspaceAppServerGroup#availability_zone}
  */
  readonly availabilityZone?: string;
  /**
  * The description of the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#description WorkspaceAppServerGroup#description}
  */
  readonly description?: string;
  /**
  * Whether to enable server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#enabled WorkspaceAppServerGroup#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * The ID of the enterprise project to which the server group belong.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#enterprise_project_id WorkspaceAppServerGroup#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * The number of additional sessions for a single server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#extra_session_size WorkspaceAppServerGroup#extra_session_size}
  */
  readonly extraSessionSize?: number;
  /**
  * The additional session type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#extra_session_type WorkspaceAppServerGroup#extra_session_type}
  */
  readonly extraSessionType?: string;
  /**
  * The flavor ID of the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#flavor_id WorkspaceAppServerGroup#flavor_id}
  */
  readonly flavorId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#id WorkspaceAppServerGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The image ID of the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#image_id WorkspaceAppServerGroup#image_id}
  */
  readonly imageId: string;
  /**
  * The image product ID of the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#image_product_id WorkspaceAppServerGroup#image_product_id}
  */
  readonly imageProductId?: string;
  /**
  * The image type of the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#image_type WorkspaceAppServerGroup#image_type}
  */
  readonly imageType: string;
  /**
  * The session mode of the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#is_vdi WorkspaceAppServerGroup#is_vdi}
  */
  readonly isVdi?: boolean | cdktf.IResolvable;
  /**
  * The name of the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#name WorkspaceAppServerGroup#name}
  */
  readonly name: string;
  /**
  * The operating system type of the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#os_type WorkspaceAppServerGroup#os_type}
  */
  readonly osType: string;
  /**
  * The OU name corresponding to the AD server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#ou_name WorkspaceAppServerGroup#ou_name}
  */
  readonly ouName?: string;
  /**
  * The ID of the primary server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#primary_server_group_id WorkspaceAppServerGroup#primary_server_group_id}
  */
  readonly primaryServerGroupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#region WorkspaceAppServerGroup#region}
  */
  readonly region?: string;
  /**
  * The NAS storage directory mounting policy on the APS.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#storage_mount_policy WorkspaceAppServerGroup#storage_mount_policy}
  */
  readonly storageMountPolicy?: string;
  /**
  * The subnet ID to which the server group belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#subnet_id WorkspaceAppServerGroup#subnet_id}
  */
  readonly subnetId: string;
  /**
  * The size of system disk, in GB.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#system_disk_size WorkspaceAppServerGroup#system_disk_size}
  */
  readonly systemDiskSize: number;
  /**
  * The type of system disk.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#system_disk_type WorkspaceAppServerGroup#system_disk_type}
  */
  readonly systemDiskType: string;
  /**
  * The key/value pairs to associate with the server group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#tags WorkspaceAppServerGroup#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * The VPC ID to which the server group belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#vpc_id WorkspaceAppServerGroup#vpc_id}
  */
  readonly vpcId: string;
  /**
  * ip_virtual block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#ip_virtual WorkspaceAppServerGroup#ip_virtual}
  */
  readonly ipVirtual?: WorkspaceAppServerGroupIpVirtual;
  /**
  * route_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#route_policy WorkspaceAppServerGroup#route_policy}
  */
  readonly routePolicy?: WorkspaceAppServerGroupRoutePolicy;
}
export interface WorkspaceAppServerGroupIpVirtual {
  /**
  * Whether to enable IP virtualization.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#enable WorkspaceAppServerGroup#enable}
  */
  readonly enable: boolean | cdktf.IResolvable;
}

export function workspaceAppServerGroupIpVirtualToTerraform(struct?: WorkspaceAppServerGroupIpVirtualOutputReference | WorkspaceAppServerGroupIpVirtual): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enable: cdktf.booleanToTerraform(struct!.enable),
  }
}


export function workspaceAppServerGroupIpVirtualToHclTerraform(struct?: WorkspaceAppServerGroupIpVirtualOutputReference | WorkspaceAppServerGroupIpVirtual): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enable: {
      value: cdktf.booleanToHclTerraform(struct!.enable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class WorkspaceAppServerGroupIpVirtualOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WorkspaceAppServerGroupIpVirtual | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enable !== undefined) {
      hasAnyValues = true;
      internalValueResult.enable = this._enable;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: WorkspaceAppServerGroupIpVirtual | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enable = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enable = value.enable;
    }
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
}
export interface WorkspaceAppServerGroupRoutePolicy {
  /**
  * The CPU usage of the server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#cpu_threshold WorkspaceAppServerGroup#cpu_threshold}
  */
  readonly cpuThreshold?: number;
  /**
  * The number of session connections of the server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#max_session WorkspaceAppServerGroup#max_session}
  */
  readonly maxSession?: number;
  /**
  * The memory usage of the server.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#mem_threshold WorkspaceAppServerGroup#mem_threshold}
  */
  readonly memThreshold?: number;
}

export function workspaceAppServerGroupRoutePolicyToTerraform(struct?: WorkspaceAppServerGroupRoutePolicyOutputReference | WorkspaceAppServerGroupRoutePolicy): any {
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


export function workspaceAppServerGroupRoutePolicyToHclTerraform(struct?: WorkspaceAppServerGroupRoutePolicyOutputReference | WorkspaceAppServerGroupRoutePolicy): any {
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

export class WorkspaceAppServerGroupRoutePolicyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): WorkspaceAppServerGroupRoutePolicy | undefined {
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

  public set internalValue(value: WorkspaceAppServerGroupRoutePolicy | undefined) {
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

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group huaweicloud_workspace_app_server_group}
*/
export class WorkspaceAppServerGroup extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_workspace_app_server_group";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a WorkspaceAppServerGroup resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the WorkspaceAppServerGroup to import
  * @param importFromId The id of the existing WorkspaceAppServerGroup that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the WorkspaceAppServerGroup to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_workspace_app_server_group", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/workspace_app_server_group huaweicloud_workspace_app_server_group} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options WorkspaceAppServerGroupConfig
  */
  public constructor(scope: Construct, id: string, config: WorkspaceAppServerGroupConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_workspace_app_server_group',
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
    this._appType = config.appType;
    this._availabilityZone = config.availabilityZone;
    this._description = config.description;
    this._enabled = config.enabled;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._extraSessionSize = config.extraSessionSize;
    this._extraSessionType = config.extraSessionType;
    this._flavorId = config.flavorId;
    this._id = config.id;
    this._imageId = config.imageId;
    this._imageProductId = config.imageProductId;
    this._imageType = config.imageType;
    this._isVdi = config.isVdi;
    this._name = config.name;
    this._osType = config.osType;
    this._ouName = config.ouName;
    this._primaryServerGroupId = config.primaryServerGroupId;
    this._region = config.region;
    this._storageMountPolicy = config.storageMountPolicy;
    this._subnetId = config.subnetId;
    this._systemDiskSize = config.systemDiskSize;
    this._systemDiskType = config.systemDiskType;
    this._tags = config.tags;
    this._vpcId = config.vpcId;
    this._ipVirtual.internalValue = config.ipVirtual;
    this._routePolicy.internalValue = config.routePolicy;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // app_type - computed: true, optional: true, required: false
  private _appType?: string; 
  public get appType() {
    return this.getStringAttribute('app_type');
  }
  public set appType(value: string) {
    this._appType = value;
  }
  public resetAppType() {
    this._appType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get appTypeInput() {
    return this._appType;
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

  // enabled - computed: false, optional: true, required: false
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  public resetEnabled() {
    this._enabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
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

  // image_product_id - computed: true, optional: true, required: false
  private _imageProductId?: string; 
  public get imageProductId() {
    return this.getStringAttribute('image_product_id');
  }
  public set imageProductId(value: string) {
    this._imageProductId = value;
  }
  public resetImageProductId() {
    this._imageProductId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get imageProductIdInput() {
    return this._imageProductId;
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

  // primary_server_group_id - computed: false, optional: true, required: false
  private _primaryServerGroupId?: string; 
  public get primaryServerGroupId() {
    return this.getStringAttribute('primary_server_group_id');
  }
  public set primaryServerGroupId(value: string) {
    this._primaryServerGroupId = value;
  }
  public resetPrimaryServerGroupId() {
    this._primaryServerGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get primaryServerGroupIdInput() {
    return this._primaryServerGroupId;
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

  // storage_mount_policy - computed: true, optional: true, required: false
  private _storageMountPolicy?: string; 
  public get storageMountPolicy() {
    return this.getStringAttribute('storage_mount_policy');
  }
  public set storageMountPolicy(value: string) {
    this._storageMountPolicy = value;
  }
  public resetStorageMountPolicy() {
    this._storageMountPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storageMountPolicyInput() {
    return this._storageMountPolicy;
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

  // system_disk_size - computed: false, optional: false, required: true
  private _systemDiskSize?: number; 
  public get systemDiskSize() {
    return this.getNumberAttribute('system_disk_size');
  }
  public set systemDiskSize(value: number) {
    this._systemDiskSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get systemDiskSizeInput() {
    return this._systemDiskSize;
  }

  // system_disk_type - computed: false, optional: false, required: true
  private _systemDiskType?: string; 
  public get systemDiskType() {
    return this.getStringAttribute('system_disk_type');
  }
  public set systemDiskType(value: string) {
    this._systemDiskType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get systemDiskTypeInput() {
    return this._systemDiskType;
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

  // ip_virtual - computed: false, optional: true, required: false
  private _ipVirtual = new WorkspaceAppServerGroupIpVirtualOutputReference(this, "ip_virtual");
  public get ipVirtual() {
    return this._ipVirtual;
  }
  public putIpVirtual(value: WorkspaceAppServerGroupIpVirtual) {
    this._ipVirtual.internalValue = value;
  }
  public resetIpVirtual() {
    this._ipVirtual.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipVirtualInput() {
    return this._ipVirtual.internalValue;
  }

  // route_policy - computed: false, optional: true, required: false
  private _routePolicy = new WorkspaceAppServerGroupRoutePolicyOutputReference(this, "route_policy");
  public get routePolicy() {
    return this._routePolicy;
  }
  public putRoutePolicy(value: WorkspaceAppServerGroupRoutePolicy) {
    this._routePolicy.internalValue = value;
  }
  public resetRoutePolicy() {
    this._routePolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get routePolicyInput() {
    return this._routePolicy.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      app_type: cdktf.stringToTerraform(this._appType),
      availability_zone: cdktf.stringToTerraform(this._availabilityZone),
      description: cdktf.stringToTerraform(this._description),
      enabled: cdktf.booleanToTerraform(this._enabled),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      extra_session_size: cdktf.numberToTerraform(this._extraSessionSize),
      extra_session_type: cdktf.stringToTerraform(this._extraSessionType),
      flavor_id: cdktf.stringToTerraform(this._flavorId),
      id: cdktf.stringToTerraform(this._id),
      image_id: cdktf.stringToTerraform(this._imageId),
      image_product_id: cdktf.stringToTerraform(this._imageProductId),
      image_type: cdktf.stringToTerraform(this._imageType),
      is_vdi: cdktf.booleanToTerraform(this._isVdi),
      name: cdktf.stringToTerraform(this._name),
      os_type: cdktf.stringToTerraform(this._osType),
      ou_name: cdktf.stringToTerraform(this._ouName),
      primary_server_group_id: cdktf.stringToTerraform(this._primaryServerGroupId),
      region: cdktf.stringToTerraform(this._region),
      storage_mount_policy: cdktf.stringToTerraform(this._storageMountPolicy),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      system_disk_size: cdktf.numberToTerraform(this._systemDiskSize),
      system_disk_type: cdktf.stringToTerraform(this._systemDiskType),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      ip_virtual: workspaceAppServerGroupIpVirtualToTerraform(this._ipVirtual.internalValue),
      route_policy: workspaceAppServerGroupRoutePolicyToTerraform(this._routePolicy.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      app_type: {
        value: cdktf.stringToHclTerraform(this._appType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
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
      enabled: {
        value: cdktf.booleanToHclTerraform(this._enabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      image_product_id: {
        value: cdktf.stringToHclTerraform(this._imageProductId),
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
      os_type: {
        value: cdktf.stringToHclTerraform(this._osType),
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
      primary_server_group_id: {
        value: cdktf.stringToHclTerraform(this._primaryServerGroupId),
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
      storage_mount_policy: {
        value: cdktf.stringToHclTerraform(this._storageMountPolicy),
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
      system_disk_size: {
        value: cdktf.numberToHclTerraform(this._systemDiskSize),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      system_disk_type: {
        value: cdktf.stringToHclTerraform(this._systemDiskType),
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
      ip_virtual: {
        value: workspaceAppServerGroupIpVirtualToHclTerraform(this._ipVirtual.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WorkspaceAppServerGroupIpVirtualList",
      },
      route_policy: {
        value: workspaceAppServerGroupRoutePolicyToHclTerraform(this._routePolicy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "WorkspaceAppServerGroupRoutePolicyList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

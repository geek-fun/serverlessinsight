// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface HssCceProtectionConfig extends cdktf.TerraformMetaArguments {
  /**
  * Specifies the agent version.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#agent_version HssCceProtection#agent_version}
  */
  readonly agentVersion?: string;
  /**
  * Specifies whether to enable automatic agent upgrade.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#auto_upgrade HssCceProtection#auto_upgrade}
  */
  readonly autoUpgrade?: boolean | cdktf.IResolvable;
  /**
  * Specifies the CCE protection type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#cce_protection_type HssCceProtection#cce_protection_type}
  */
  readonly cceProtectionType: string;
  /**
  * Specifies the charging mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#charging_mode HssCceProtection#charging_mode}
  */
  readonly chargingMode: string;
  /**
  * Specifies the CCE cluster ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#cluster_id HssCceProtection#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Specifies the CCE cluster name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#cluster_name HssCceProtection#cluster_name}
  */
  readonly clusterName: string;
  /**
  * Specifies the CCE cluster type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#cluster_type HssCceProtection#cluster_type}
  */
  readonly clusterType: string;
  /**
  * Specifies the enterprise project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#enterprise_project_id HssCceProtection#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#id HssCceProtection#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the invoked service.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#invoked_service HssCceProtection#invoked_service}
  */
  readonly invokedService?: string;
  /**
  * Specifies whether to prefer the package period quota.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#prefer_packet_cycle HssCceProtection#prefer_packet_cycle}
  */
  readonly preferPacketCycle?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#region HssCceProtection#region}
  */
  readonly region?: string;
  /**
  * runtime_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#runtime_info HssCceProtection#runtime_info}
  */
  readonly runtimeInfo?: HssCceProtectionRuntimeInfo[] | cdktf.IResolvable;
  /**
  * schedule_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#schedule_info HssCceProtection#schedule_info}
  */
  readonly scheduleInfo?: HssCceProtectionScheduleInfo;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#timeouts HssCceProtection#timeouts}
  */
  readonly timeouts?: HssCceProtectionTimeouts;
}
export interface HssCceProtectionRuntimeInfo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#runtime_name HssCceProtection#runtime_name}
  */
  readonly runtimeName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#runtime_path HssCceProtection#runtime_path}
  */
  readonly runtimePath?: string;
}

export function hssCceProtectionRuntimeInfoToTerraform(struct?: HssCceProtectionRuntimeInfo | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    runtime_name: cdktf.stringToTerraform(struct!.runtimeName),
    runtime_path: cdktf.stringToTerraform(struct!.runtimePath),
  }
}


export function hssCceProtectionRuntimeInfoToHclTerraform(struct?: HssCceProtectionRuntimeInfo | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    runtime_name: {
      value: cdktf.stringToHclTerraform(struct!.runtimeName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    runtime_path: {
      value: cdktf.stringToHclTerraform(struct!.runtimePath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class HssCceProtectionRuntimeInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): HssCceProtectionRuntimeInfo | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._runtimeName !== undefined) {
      hasAnyValues = true;
      internalValueResult.runtimeName = this._runtimeName;
    }
    if (this._runtimePath !== undefined) {
      hasAnyValues = true;
      internalValueResult.runtimePath = this._runtimePath;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: HssCceProtectionRuntimeInfo | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._runtimeName = undefined;
      this._runtimePath = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._runtimeName = value.runtimeName;
      this._runtimePath = value.runtimePath;
    }
  }

  // runtime_name - computed: false, optional: true, required: false
  private _runtimeName?: string; 
  public get runtimeName() {
    return this.getStringAttribute('runtime_name');
  }
  public set runtimeName(value: string) {
    this._runtimeName = value;
  }
  public resetRuntimeName() {
    this._runtimeName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get runtimeNameInput() {
    return this._runtimeName;
  }

  // runtime_path - computed: false, optional: true, required: false
  private _runtimePath?: string; 
  public get runtimePath() {
    return this.getStringAttribute('runtime_path');
  }
  public set runtimePath(value: string) {
    this._runtimePath = value;
  }
  public resetRuntimePath() {
    this._runtimePath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get runtimePathInput() {
    return this._runtimePath;
  }
}

export class HssCceProtectionRuntimeInfoList extends cdktf.ComplexList {
  public internalValue? : HssCceProtectionRuntimeInfo[] | cdktf.IResolvable

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
  public get(index: number): HssCceProtectionRuntimeInfoOutputReference {
    return new HssCceProtectionRuntimeInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface HssCceProtectionScheduleInfo {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#node_selector HssCceProtection#node_selector}
  */
  readonly nodeSelector?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#pod_tolerances HssCceProtection#pod_tolerances}
  */
  readonly podTolerances?: string[];
}

export function hssCceProtectionScheduleInfoToTerraform(struct?: HssCceProtectionScheduleInfoOutputReference | HssCceProtectionScheduleInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    node_selector: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.nodeSelector),
    pod_tolerances: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.podTolerances),
  }
}


export function hssCceProtectionScheduleInfoToHclTerraform(struct?: HssCceProtectionScheduleInfoOutputReference | HssCceProtectionScheduleInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    node_selector: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.nodeSelector),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    pod_tolerances: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.podTolerances),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class HssCceProtectionScheduleInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): HssCceProtectionScheduleInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._nodeSelector !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodeSelector = this._nodeSelector;
    }
    if (this._podTolerances !== undefined) {
      hasAnyValues = true;
      internalValueResult.podTolerances = this._podTolerances;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: HssCceProtectionScheduleInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._nodeSelector = undefined;
      this._podTolerances = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._nodeSelector = value.nodeSelector;
      this._podTolerances = value.podTolerances;
    }
  }

  // node_selector - computed: false, optional: true, required: false
  private _nodeSelector?: string[]; 
  public get nodeSelector() {
    return this.getListAttribute('node_selector');
  }
  public set nodeSelector(value: string[]) {
    this._nodeSelector = value;
  }
  public resetNodeSelector() {
    this._nodeSelector = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeSelectorInput() {
    return this._nodeSelector;
  }

  // pod_tolerances - computed: false, optional: true, required: false
  private _podTolerances?: string[]; 
  public get podTolerances() {
    return this.getListAttribute('pod_tolerances');
  }
  public set podTolerances(value: string[]) {
    this._podTolerances = value;
  }
  public resetPodTolerances() {
    this._podTolerances = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get podTolerancesInput() {
    return this._podTolerances;
  }
}
export interface HssCceProtectionTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#create HssCceProtection#create}
  */
  readonly create?: string;
}

export function hssCceProtectionTimeoutsToTerraform(struct?: HssCceProtectionTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
  }
}


export function hssCceProtectionTimeoutsToHclTerraform(struct?: HssCceProtectionTimeouts | cdktf.IResolvable): any {
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

export class HssCceProtectionTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): HssCceProtectionTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: HssCceProtectionTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection huaweicloud_hss_cce_protection}
*/
export class HssCceProtection extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_hss_cce_protection";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a HssCceProtection resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the HssCceProtection to import
  * @param importFromId The id of the existing HssCceProtection that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the HssCceProtection to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_hss_cce_protection", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/hss_cce_protection huaweicloud_hss_cce_protection} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options HssCceProtectionConfig
  */
  public constructor(scope: Construct, id: string, config: HssCceProtectionConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_hss_cce_protection',
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
    this._agentVersion = config.agentVersion;
    this._autoUpgrade = config.autoUpgrade;
    this._cceProtectionType = config.cceProtectionType;
    this._chargingMode = config.chargingMode;
    this._clusterId = config.clusterId;
    this._clusterName = config.clusterName;
    this._clusterType = config.clusterType;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._invokedService = config.invokedService;
    this._preferPacketCycle = config.preferPacketCycle;
    this._region = config.region;
    this._runtimeInfo.internalValue = config.runtimeInfo;
    this._scheduleInfo.internalValue = config.scheduleInfo;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // agent_version - computed: false, optional: true, required: false
  private _agentVersion?: string; 
  public get agentVersion() {
    return this.getStringAttribute('agent_version');
  }
  public set agentVersion(value: string) {
    this._agentVersion = value;
  }
  public resetAgentVersion() {
    this._agentVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get agentVersionInput() {
    return this._agentVersion;
  }

  // auto_upgrade - computed: true, optional: true, required: false
  private _autoUpgrade?: boolean | cdktf.IResolvable; 
  public get autoUpgrade() {
    return this.getBooleanAttribute('auto_upgrade');
  }
  public set autoUpgrade(value: boolean | cdktf.IResolvable) {
    this._autoUpgrade = value;
  }
  public resetAutoUpgrade() {
    this._autoUpgrade = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoUpgradeInput() {
    return this._autoUpgrade;
  }

  // cce_protection_type - computed: false, optional: false, required: true
  private _cceProtectionType?: string; 
  public get cceProtectionType() {
    return this.getStringAttribute('cce_protection_type');
  }
  public set cceProtectionType(value: string) {
    this._cceProtectionType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cceProtectionTypeInput() {
    return this._cceProtectionType;
  }

  // charging_mode - computed: false, optional: false, required: true
  private _chargingMode?: string; 
  public get chargingMode() {
    return this.getStringAttribute('charging_mode');
  }
  public set chargingMode(value: string) {
    this._chargingMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get chargingModeInput() {
    return this._chargingMode;
  }

  // cluster_id - computed: false, optional: false, required: true
  private _clusterId?: string; 
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }
  public set clusterId(value: string) {
    this._clusterId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterIdInput() {
    return this._clusterId;
  }

  // cluster_name - computed: false, optional: false, required: true
  private _clusterName?: string; 
  public get clusterName() {
    return this.getStringAttribute('cluster_name');
  }
  public set clusterName(value: string) {
    this._clusterName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterNameInput() {
    return this._clusterName;
  }

  // cluster_type - computed: false, optional: false, required: true
  private _clusterType?: string; 
  public get clusterType() {
    return this.getStringAttribute('cluster_type');
  }
  public set clusterType(value: string) {
    this._clusterType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterTypeInput() {
    return this._clusterType;
  }

  // enterprise_project_id - computed: false, optional: true, required: false
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

  // fail_reason - computed: true, optional: false, required: false
  public get failReason() {
    return this.getStringAttribute('fail_reason');
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

  // invoked_service - computed: false, optional: true, required: false
  private _invokedService?: string; 
  public get invokedService() {
    return this.getStringAttribute('invoked_service');
  }
  public set invokedService(value: string) {
    this._invokedService = value;
  }
  public resetInvokedService() {
    this._invokedService = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get invokedServiceInput() {
    return this._invokedService;
  }

  // node_total_num - computed: true, optional: false, required: false
  public get nodeTotalNum() {
    return this.getNumberAttribute('node_total_num');
  }

  // prefer_packet_cycle - computed: true, optional: true, required: false
  private _preferPacketCycle?: boolean | cdktf.IResolvable; 
  public get preferPacketCycle() {
    return this.getBooleanAttribute('prefer_packet_cycle');
  }
  public set preferPacketCycle(value: boolean | cdktf.IResolvable) {
    this._preferPacketCycle = value;
  }
  public resetPreferPacketCycle() {
    this._preferPacketCycle = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get preferPacketCycleInput() {
    return this._preferPacketCycle;
  }

  // protect_interrupt_node_num - computed: true, optional: false, required: false
  public get protectInterruptNodeNum() {
    return this.getNumberAttribute('protect_interrupt_node_num');
  }

  // protect_node_num - computed: true, optional: false, required: false
  public get protectNodeNum() {
    return this.getNumberAttribute('protect_node_num');
  }

  // protect_status - computed: true, optional: false, required: false
  public get protectStatus() {
    return this.getStringAttribute('protect_status');
  }

  // protect_type - computed: true, optional: false, required: false
  public get protectType() {
    return this.getStringAttribute('protect_type');
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

  // unprotect_node_num - computed: true, optional: false, required: false
  public get unprotectNodeNum() {
    return this.getNumberAttribute('unprotect_node_num');
  }

  // vpc_id - computed: true, optional: false, required: false
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }

  // runtime_info - computed: false, optional: true, required: false
  private _runtimeInfo = new HssCceProtectionRuntimeInfoList(this, "runtime_info", false);
  public get runtimeInfo() {
    return this._runtimeInfo;
  }
  public putRuntimeInfo(value: HssCceProtectionRuntimeInfo[] | cdktf.IResolvable) {
    this._runtimeInfo.internalValue = value;
  }
  public resetRuntimeInfo() {
    this._runtimeInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get runtimeInfoInput() {
    return this._runtimeInfo.internalValue;
  }

  // schedule_info - computed: false, optional: true, required: false
  private _scheduleInfo = new HssCceProtectionScheduleInfoOutputReference(this, "schedule_info");
  public get scheduleInfo() {
    return this._scheduleInfo;
  }
  public putScheduleInfo(value: HssCceProtectionScheduleInfo) {
    this._scheduleInfo.internalValue = value;
  }
  public resetScheduleInfo() {
    this._scheduleInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scheduleInfoInput() {
    return this._scheduleInfo.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new HssCceProtectionTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: HssCceProtectionTimeouts) {
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
      agent_version: cdktf.stringToTerraform(this._agentVersion),
      auto_upgrade: cdktf.booleanToTerraform(this._autoUpgrade),
      cce_protection_type: cdktf.stringToTerraform(this._cceProtectionType),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      cluster_name: cdktf.stringToTerraform(this._clusterName),
      cluster_type: cdktf.stringToTerraform(this._clusterType),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      invoked_service: cdktf.stringToTerraform(this._invokedService),
      prefer_packet_cycle: cdktf.booleanToTerraform(this._preferPacketCycle),
      region: cdktf.stringToTerraform(this._region),
      runtime_info: cdktf.listMapper(hssCceProtectionRuntimeInfoToTerraform, true)(this._runtimeInfo.internalValue),
      schedule_info: hssCceProtectionScheduleInfoToTerraform(this._scheduleInfo.internalValue),
      timeouts: hssCceProtectionTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      agent_version: {
        value: cdktf.stringToHclTerraform(this._agentVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auto_upgrade: {
        value: cdktf.booleanToHclTerraform(this._autoUpgrade),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      cce_protection_type: {
        value: cdktf.stringToHclTerraform(this._cceProtectionType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      charging_mode: {
        value: cdktf.stringToHclTerraform(this._chargingMode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_name: {
        value: cdktf.stringToHclTerraform(this._clusterName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      cluster_type: {
        value: cdktf.stringToHclTerraform(this._clusterType),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      invoked_service: {
        value: cdktf.stringToHclTerraform(this._invokedService),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      prefer_packet_cycle: {
        value: cdktf.booleanToHclTerraform(this._preferPacketCycle),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      runtime_info: {
        value: cdktf.listMapperHcl(hssCceProtectionRuntimeInfoToHclTerraform, true)(this._runtimeInfo.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "HssCceProtectionRuntimeInfoList",
      },
      schedule_info: {
        value: hssCceProtectionScheduleInfoToHclTerraform(this._scheduleInfo.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "HssCceProtectionScheduleInfoList",
      },
      timeouts: {
        value: hssCceProtectionTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "HssCceProtectionTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

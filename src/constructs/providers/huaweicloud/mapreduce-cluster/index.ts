// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MapreduceClusterConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#availability_zone MapreduceCluster#availability_zone}
  */
  readonly availabilityZone: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#charging_mode MapreduceCluster#charging_mode}
  */
  readonly chargingMode?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#component_list MapreduceCluster#component_list}
  */
  readonly componentList: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#eip_id MapreduceCluster#eip_id}
  */
  readonly eipId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#enterprise_project_id MapreduceCluster#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#id MapreduceCluster#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#log_collection MapreduceCluster#log_collection}
  */
  readonly logCollection?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#manager_admin_pass MapreduceCluster#manager_admin_pass}
  */
  readonly managerAdminPass: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#name MapreduceCluster#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#node_admin_pass MapreduceCluster#node_admin_pass}
  */
  readonly nodeAdminPass?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#node_key_pair MapreduceCluster#node_key_pair}
  */
  readonly nodeKeyPair?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#period MapreduceCluster#period}
  */
  readonly period?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#period_unit MapreduceCluster#period_unit}
  */
  readonly periodUnit?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#public_ip MapreduceCluster#public_ip}
  */
  readonly publicIp?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#region MapreduceCluster#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#safe_mode MapreduceCluster#safe_mode}
  */
  readonly safeMode?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#security_group_ids MapreduceCluster#security_group_ids}
  */
  readonly securityGroupIds?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#subnet_id MapreduceCluster#subnet_id}
  */
  readonly subnetId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#tags MapreduceCluster#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#template_id MapreduceCluster#template_id}
  */
  readonly templateId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#type MapreduceCluster#type}
  */
  readonly type?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#version MapreduceCluster#version}
  */
  readonly version: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#vpc_id MapreduceCluster#vpc_id}
  */
  readonly vpcId: string;
  /**
  * analysis_core_nodes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#analysis_core_nodes MapreduceCluster#analysis_core_nodes}
  */
  readonly analysisCoreNodes?: MapreduceClusterAnalysisCoreNodes;
  /**
  * analysis_task_nodes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#analysis_task_nodes MapreduceCluster#analysis_task_nodes}
  */
  readonly analysisTaskNodes?: MapreduceClusterAnalysisTaskNodes;
  /**
  * bootstrap_scripts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#bootstrap_scripts MapreduceCluster#bootstrap_scripts}
  */
  readonly bootstrapScripts?: MapreduceClusterBootstrapScripts[] | cdktf.IResolvable;
  /**
  * component_configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#component_configs MapreduceCluster#component_configs}
  */
  readonly componentConfigs?: MapreduceClusterComponentConfigs[] | cdktf.IResolvable;
  /**
  * custom_nodes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#custom_nodes MapreduceCluster#custom_nodes}
  */
  readonly customNodes?: MapreduceClusterCustomNodes[] | cdktf.IResolvable;
  /**
  * external_datasources block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#external_datasources MapreduceCluster#external_datasources}
  */
  readonly externalDatasources?: MapreduceClusterExternalDatasources[] | cdktf.IResolvable;
  /**
  * master_nodes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#master_nodes MapreduceCluster#master_nodes}
  */
  readonly masterNodes: MapreduceClusterMasterNodes;
  /**
  * smn_notify block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#smn_notify MapreduceCluster#smn_notify}
  */
  readonly smnNotify?: MapreduceClusterSmnNotify;
  /**
  * streaming_core_nodes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#streaming_core_nodes MapreduceCluster#streaming_core_nodes}
  */
  readonly streamingCoreNodes?: MapreduceClusterStreamingCoreNodes;
  /**
  * streaming_task_nodes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#streaming_task_nodes MapreduceCluster#streaming_task_nodes}
  */
  readonly streamingTaskNodes?: MapreduceClusterStreamingTaskNodes;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#timeouts MapreduceCluster#timeouts}
  */
  readonly timeouts?: MapreduceClusterTimeouts;
}
export interface MapreduceClusterAnalysisCoreNodes {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#assigned_roles MapreduceCluster#assigned_roles}
  */
  readonly assignedRoles?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_count MapreduceCluster#data_volume_count}
  */
  readonly dataVolumeCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_size MapreduceCluster#data_volume_size}
  */
  readonly dataVolumeSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_type MapreduceCluster#data_volume_type}
  */
  readonly dataVolumeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#flavor MapreduceCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#node_number MapreduceCluster#node_number}
  */
  readonly nodeNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_size MapreduceCluster#root_volume_size}
  */
  readonly rootVolumeSize: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_type MapreduceCluster#root_volume_type}
  */
  readonly rootVolumeType: string;
}

export function mapreduceClusterAnalysisCoreNodesToTerraform(struct?: MapreduceClusterAnalysisCoreNodesOutputReference | MapreduceClusterAnalysisCoreNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    assigned_roles: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.assignedRoles),
    data_volume_count: cdktf.numberToTerraform(struct!.dataVolumeCount),
    data_volume_size: cdktf.numberToTerraform(struct!.dataVolumeSize),
    data_volume_type: cdktf.stringToTerraform(struct!.dataVolumeType),
    flavor: cdktf.stringToTerraform(struct!.flavor),
    node_number: cdktf.numberToTerraform(struct!.nodeNumber),
    root_volume_size: cdktf.numberToTerraform(struct!.rootVolumeSize),
    root_volume_type: cdktf.stringToTerraform(struct!.rootVolumeType),
  }
}


export function mapreduceClusterAnalysisCoreNodesToHclTerraform(struct?: MapreduceClusterAnalysisCoreNodesOutputReference | MapreduceClusterAnalysisCoreNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    assigned_roles: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.assignedRoles),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    data_volume_count: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.dataVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    node_number: {
      value: cdktf.numberToHclTerraform(struct!.nodeNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.rootVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.rootVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterAnalysisCoreNodesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MapreduceClusterAnalysisCoreNodes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._assignedRoles !== undefined) {
      hasAnyValues = true;
      internalValueResult.assignedRoles = this._assignedRoles;
    }
    if (this._dataVolumeCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeCount = this._dataVolumeCount;
    }
    if (this._dataVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeSize = this._dataVolumeSize;
    }
    if (this._dataVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeType = this._dataVolumeType;
    }
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._nodeNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodeNumber = this._nodeNumber;
    }
    if (this._rootVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeSize = this._rootVolumeSize;
    }
    if (this._rootVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeType = this._rootVolumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterAnalysisCoreNodes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._assignedRoles = undefined;
      this._dataVolumeCount = undefined;
      this._dataVolumeSize = undefined;
      this._dataVolumeType = undefined;
      this._flavor = undefined;
      this._nodeNumber = undefined;
      this._rootVolumeSize = undefined;
      this._rootVolumeType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._assignedRoles = value.assignedRoles;
      this._dataVolumeCount = value.dataVolumeCount;
      this._dataVolumeSize = value.dataVolumeSize;
      this._dataVolumeType = value.dataVolumeType;
      this._flavor = value.flavor;
      this._nodeNumber = value.nodeNumber;
      this._rootVolumeSize = value.rootVolumeSize;
      this._rootVolumeType = value.rootVolumeType;
    }
  }

  // assigned_roles - computed: false, optional: true, required: false
  private _assignedRoles?: string[]; 
  public get assignedRoles() {
    return this.getListAttribute('assigned_roles');
  }
  public set assignedRoles(value: string[]) {
    this._assignedRoles = value;
  }
  public resetAssignedRoles() {
    this._assignedRoles = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignedRolesInput() {
    return this._assignedRoles;
  }

  // data_volume_count - computed: false, optional: false, required: true
  private _dataVolumeCount?: number; 
  public get dataVolumeCount() {
    return this.getNumberAttribute('data_volume_count');
  }
  public set dataVolumeCount(value: number) {
    this._dataVolumeCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeCountInput() {
    return this._dataVolumeCount;
  }

  // data_volume_size - computed: false, optional: true, required: false
  private _dataVolumeSize?: number; 
  public get dataVolumeSize() {
    return this.getNumberAttribute('data_volume_size');
  }
  public set dataVolumeSize(value: number) {
    this._dataVolumeSize = value;
  }
  public resetDataVolumeSize() {
    this._dataVolumeSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeSizeInput() {
    return this._dataVolumeSize;
  }

  // data_volume_type - computed: false, optional: true, required: false
  private _dataVolumeType?: string; 
  public get dataVolumeType() {
    return this.getStringAttribute('data_volume_type');
  }
  public set dataVolumeType(value: string) {
    this._dataVolumeType = value;
  }
  public resetDataVolumeType() {
    this._dataVolumeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeTypeInput() {
    return this._dataVolumeType;
  }

  // flavor - computed: false, optional: false, required: true
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
  }

  // host_ips - computed: true, optional: false, required: false
  public get hostIps() {
    return this.getListAttribute('host_ips');
  }

  // node_number - computed: false, optional: false, required: true
  private _nodeNumber?: number; 
  public get nodeNumber() {
    return this.getNumberAttribute('node_number');
  }
  public set nodeNumber(value: number) {
    this._nodeNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeNumberInput() {
    return this._nodeNumber;
  }

  // root_volume_size - computed: false, optional: false, required: true
  private _rootVolumeSize?: number; 
  public get rootVolumeSize() {
    return this.getNumberAttribute('root_volume_size');
  }
  public set rootVolumeSize(value: number) {
    this._rootVolumeSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeSizeInput() {
    return this._rootVolumeSize;
  }

  // root_volume_type - computed: false, optional: false, required: true
  private _rootVolumeType?: string; 
  public get rootVolumeType() {
    return this.getStringAttribute('root_volume_type');
  }
  public set rootVolumeType(value: string) {
    this._rootVolumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeTypeInput() {
    return this._rootVolumeType;
  }
}
export interface MapreduceClusterAnalysisTaskNodes {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#assigned_roles MapreduceCluster#assigned_roles}
  */
  readonly assignedRoles?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_count MapreduceCluster#data_volume_count}
  */
  readonly dataVolumeCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_size MapreduceCluster#data_volume_size}
  */
  readonly dataVolumeSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_type MapreduceCluster#data_volume_type}
  */
  readonly dataVolumeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#flavor MapreduceCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#node_number MapreduceCluster#node_number}
  */
  readonly nodeNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_size MapreduceCluster#root_volume_size}
  */
  readonly rootVolumeSize: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_type MapreduceCluster#root_volume_type}
  */
  readonly rootVolumeType: string;
}

export function mapreduceClusterAnalysisTaskNodesToTerraform(struct?: MapreduceClusterAnalysisTaskNodesOutputReference | MapreduceClusterAnalysisTaskNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    assigned_roles: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.assignedRoles),
    data_volume_count: cdktf.numberToTerraform(struct!.dataVolumeCount),
    data_volume_size: cdktf.numberToTerraform(struct!.dataVolumeSize),
    data_volume_type: cdktf.stringToTerraform(struct!.dataVolumeType),
    flavor: cdktf.stringToTerraform(struct!.flavor),
    node_number: cdktf.numberToTerraform(struct!.nodeNumber),
    root_volume_size: cdktf.numberToTerraform(struct!.rootVolumeSize),
    root_volume_type: cdktf.stringToTerraform(struct!.rootVolumeType),
  }
}


export function mapreduceClusterAnalysisTaskNodesToHclTerraform(struct?: MapreduceClusterAnalysisTaskNodesOutputReference | MapreduceClusterAnalysisTaskNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    assigned_roles: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.assignedRoles),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    data_volume_count: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.dataVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    node_number: {
      value: cdktf.numberToHclTerraform(struct!.nodeNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.rootVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.rootVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterAnalysisTaskNodesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MapreduceClusterAnalysisTaskNodes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._assignedRoles !== undefined) {
      hasAnyValues = true;
      internalValueResult.assignedRoles = this._assignedRoles;
    }
    if (this._dataVolumeCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeCount = this._dataVolumeCount;
    }
    if (this._dataVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeSize = this._dataVolumeSize;
    }
    if (this._dataVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeType = this._dataVolumeType;
    }
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._nodeNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodeNumber = this._nodeNumber;
    }
    if (this._rootVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeSize = this._rootVolumeSize;
    }
    if (this._rootVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeType = this._rootVolumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterAnalysisTaskNodes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._assignedRoles = undefined;
      this._dataVolumeCount = undefined;
      this._dataVolumeSize = undefined;
      this._dataVolumeType = undefined;
      this._flavor = undefined;
      this._nodeNumber = undefined;
      this._rootVolumeSize = undefined;
      this._rootVolumeType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._assignedRoles = value.assignedRoles;
      this._dataVolumeCount = value.dataVolumeCount;
      this._dataVolumeSize = value.dataVolumeSize;
      this._dataVolumeType = value.dataVolumeType;
      this._flavor = value.flavor;
      this._nodeNumber = value.nodeNumber;
      this._rootVolumeSize = value.rootVolumeSize;
      this._rootVolumeType = value.rootVolumeType;
    }
  }

  // assigned_roles - computed: false, optional: true, required: false
  private _assignedRoles?: string[]; 
  public get assignedRoles() {
    return this.getListAttribute('assigned_roles');
  }
  public set assignedRoles(value: string[]) {
    this._assignedRoles = value;
  }
  public resetAssignedRoles() {
    this._assignedRoles = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignedRolesInput() {
    return this._assignedRoles;
  }

  // data_volume_count - computed: false, optional: false, required: true
  private _dataVolumeCount?: number; 
  public get dataVolumeCount() {
    return this.getNumberAttribute('data_volume_count');
  }
  public set dataVolumeCount(value: number) {
    this._dataVolumeCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeCountInput() {
    return this._dataVolumeCount;
  }

  // data_volume_size - computed: false, optional: true, required: false
  private _dataVolumeSize?: number; 
  public get dataVolumeSize() {
    return this.getNumberAttribute('data_volume_size');
  }
  public set dataVolumeSize(value: number) {
    this._dataVolumeSize = value;
  }
  public resetDataVolumeSize() {
    this._dataVolumeSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeSizeInput() {
    return this._dataVolumeSize;
  }

  // data_volume_type - computed: false, optional: true, required: false
  private _dataVolumeType?: string; 
  public get dataVolumeType() {
    return this.getStringAttribute('data_volume_type');
  }
  public set dataVolumeType(value: string) {
    this._dataVolumeType = value;
  }
  public resetDataVolumeType() {
    this._dataVolumeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeTypeInput() {
    return this._dataVolumeType;
  }

  // flavor - computed: false, optional: false, required: true
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
  }

  // host_ips - computed: true, optional: false, required: false
  public get hostIps() {
    return this.getListAttribute('host_ips');
  }

  // node_number - computed: false, optional: false, required: true
  private _nodeNumber?: number; 
  public get nodeNumber() {
    return this.getNumberAttribute('node_number');
  }
  public set nodeNumber(value: number) {
    this._nodeNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeNumberInput() {
    return this._nodeNumber;
  }

  // root_volume_size - computed: false, optional: false, required: true
  private _rootVolumeSize?: number; 
  public get rootVolumeSize() {
    return this.getNumberAttribute('root_volume_size');
  }
  public set rootVolumeSize(value: number) {
    this._rootVolumeSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeSizeInput() {
    return this._rootVolumeSize;
  }

  // root_volume_type - computed: false, optional: false, required: true
  private _rootVolumeType?: string; 
  public get rootVolumeType() {
    return this.getStringAttribute('root_volume_type');
  }
  public set rootVolumeType(value: string) {
    this._rootVolumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeTypeInput() {
    return this._rootVolumeType;
  }
}
export interface MapreduceClusterBootstrapScripts {
  /**
  * Whether the bootstrap action script runs only on active master nodes.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#active_master MapreduceCluster#active_master}
  */
  readonly activeMaster?: boolean | cdktf.IResolvable;
  /**
  * Whether the bootstrap action script is executed before component start.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#before_component_start MapreduceCluster#before_component_start}
  */
  readonly beforeComponentStart?: boolean | cdktf.IResolvable;
  /**
  * Whether the bootstrap action script involves root user operations.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#execute_need_sudo_root MapreduceCluster#execute_need_sudo_root}
  */
  readonly executeNeedSudoRoot?: boolean | cdktf.IResolvable;
  /**
  * The action after the bootstrap action script fails to be executed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#fail_action MapreduceCluster#fail_action}
  */
  readonly failAction: string;
  /**
  * Name of a bootstrap action script.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#name MapreduceCluster#name}
  */
  readonly name: string;
  /**
  * Name of the node group where the bootstrap action script is executed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#nodes MapreduceCluster#nodes}
  */
  readonly nodes: string[];
  /**
  * Bootstrap action script parameters.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#parameters MapreduceCluster#parameters}
  */
  readonly parameters?: string;
  /**
  * Path of a bootstrap action script. Set this parameter to an OBS bucket path or a local VM path.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#uri MapreduceCluster#uri}
  */
  readonly uri: string;
}

export function mapreduceClusterBootstrapScriptsToTerraform(struct?: MapreduceClusterBootstrapScripts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    active_master: cdktf.booleanToTerraform(struct!.activeMaster),
    before_component_start: cdktf.booleanToTerraform(struct!.beforeComponentStart),
    execute_need_sudo_root: cdktf.booleanToTerraform(struct!.executeNeedSudoRoot),
    fail_action: cdktf.stringToTerraform(struct!.failAction),
    name: cdktf.stringToTerraform(struct!.name),
    nodes: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.nodes),
    parameters: cdktf.stringToTerraform(struct!.parameters),
    uri: cdktf.stringToTerraform(struct!.uri),
  }
}


export function mapreduceClusterBootstrapScriptsToHclTerraform(struct?: MapreduceClusterBootstrapScripts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    active_master: {
      value: cdktf.booleanToHclTerraform(struct!.activeMaster),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    before_component_start: {
      value: cdktf.booleanToHclTerraform(struct!.beforeComponentStart),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    execute_need_sudo_root: {
      value: cdktf.booleanToHclTerraform(struct!.executeNeedSudoRoot),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    fail_action: {
      value: cdktf.stringToHclTerraform(struct!.failAction),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    nodes: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.nodes),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    parameters: {
      value: cdktf.stringToHclTerraform(struct!.parameters),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    uri: {
      value: cdktf.stringToHclTerraform(struct!.uri),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterBootstrapScriptsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MapreduceClusterBootstrapScripts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._activeMaster !== undefined) {
      hasAnyValues = true;
      internalValueResult.activeMaster = this._activeMaster;
    }
    if (this._beforeComponentStart !== undefined) {
      hasAnyValues = true;
      internalValueResult.beforeComponentStart = this._beforeComponentStart;
    }
    if (this._executeNeedSudoRoot !== undefined) {
      hasAnyValues = true;
      internalValueResult.executeNeedSudoRoot = this._executeNeedSudoRoot;
    }
    if (this._failAction !== undefined) {
      hasAnyValues = true;
      internalValueResult.failAction = this._failAction;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._nodes !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodes = this._nodes;
    }
    if (this._parameters !== undefined) {
      hasAnyValues = true;
      internalValueResult.parameters = this._parameters;
    }
    if (this._uri !== undefined) {
      hasAnyValues = true;
      internalValueResult.uri = this._uri;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterBootstrapScripts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._activeMaster = undefined;
      this._beforeComponentStart = undefined;
      this._executeNeedSudoRoot = undefined;
      this._failAction = undefined;
      this._name = undefined;
      this._nodes = undefined;
      this._parameters = undefined;
      this._uri = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._activeMaster = value.activeMaster;
      this._beforeComponentStart = value.beforeComponentStart;
      this._executeNeedSudoRoot = value.executeNeedSudoRoot;
      this._failAction = value.failAction;
      this._name = value.name;
      this._nodes = value.nodes;
      this._parameters = value.parameters;
      this._uri = value.uri;
    }
  }

  // active_master - computed: true, optional: true, required: false
  private _activeMaster?: boolean | cdktf.IResolvable; 
  public get activeMaster() {
    return this.getBooleanAttribute('active_master');
  }
  public set activeMaster(value: boolean | cdktf.IResolvable) {
    this._activeMaster = value;
  }
  public resetActiveMaster() {
    this._activeMaster = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get activeMasterInput() {
    return this._activeMaster;
  }

  // before_component_start - computed: true, optional: true, required: false
  private _beforeComponentStart?: boolean | cdktf.IResolvable; 
  public get beforeComponentStart() {
    return this.getBooleanAttribute('before_component_start');
  }
  public set beforeComponentStart(value: boolean | cdktf.IResolvable) {
    this._beforeComponentStart = value;
  }
  public resetBeforeComponentStart() {
    this._beforeComponentStart = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get beforeComponentStartInput() {
    return this._beforeComponentStart;
  }

  // execute_need_sudo_root - computed: true, optional: true, required: false
  private _executeNeedSudoRoot?: boolean | cdktf.IResolvable; 
  public get executeNeedSudoRoot() {
    return this.getBooleanAttribute('execute_need_sudo_root');
  }
  public set executeNeedSudoRoot(value: boolean | cdktf.IResolvable) {
    this._executeNeedSudoRoot = value;
  }
  public resetExecuteNeedSudoRoot() {
    this._executeNeedSudoRoot = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get executeNeedSudoRootInput() {
    return this._executeNeedSudoRoot;
  }

  // fail_action - computed: false, optional: false, required: true
  private _failAction?: string; 
  public get failAction() {
    return this.getStringAttribute('fail_action');
  }
  public set failAction(value: string) {
    this._failAction = value;
  }
  // Temporarily expose input value. Use with caution.
  public get failActionInput() {
    return this._failAction;
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

  // nodes - computed: false, optional: false, required: true
  private _nodes?: string[]; 
  public get nodes() {
    return this.getListAttribute('nodes');
  }
  public set nodes(value: string[]) {
    this._nodes = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodesInput() {
    return this._nodes;
  }

  // parameters - computed: false, optional: true, required: false
  private _parameters?: string; 
  public get parameters() {
    return this.getStringAttribute('parameters');
  }
  public set parameters(value: string) {
    this._parameters = value;
  }
  public resetParameters() {
    this._parameters = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parametersInput() {
    return this._parameters;
  }

  // start_time - computed: true, optional: false, required: false
  public get startTime() {
    return this.getStringAttribute('start_time');
  }

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
  }

  // uri - computed: false, optional: false, required: true
  private _uri?: string; 
  public get uri() {
    return this.getStringAttribute('uri');
  }
  public set uri(value: string) {
    this._uri = value;
  }
  // Temporarily expose input value. Use with caution.
  public get uriInput() {
    return this._uri;
  }
}

export class MapreduceClusterBootstrapScriptsList extends cdktf.ComplexList {
  public internalValue? : MapreduceClusterBootstrapScripts[] | cdktf.IResolvable

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
  public get(index: number): MapreduceClusterBootstrapScriptsOutputReference {
    return new MapreduceClusterBootstrapScriptsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MapreduceClusterComponentConfigsConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#config_file_name MapreduceCluster#config_file_name}
  */
  readonly configFileName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#key MapreduceCluster#key}
  */
  readonly key: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#value MapreduceCluster#value}
  */
  readonly value: string;
}

export function mapreduceClusterComponentConfigsConfigsToTerraform(struct?: MapreduceClusterComponentConfigsConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    config_file_name: cdktf.stringToTerraform(struct!.configFileName),
    key: cdktf.stringToTerraform(struct!.key),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function mapreduceClusterComponentConfigsConfigsToHclTerraform(struct?: MapreduceClusterComponentConfigsConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    config_file_name: {
      value: cdktf.stringToHclTerraform(struct!.configFileName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    key: {
      value: cdktf.stringToHclTerraform(struct!.key),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterComponentConfigsConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MapreduceClusterComponentConfigsConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._configFileName !== undefined) {
      hasAnyValues = true;
      internalValueResult.configFileName = this._configFileName;
    }
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterComponentConfigsConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._configFileName = undefined;
      this._key = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._configFileName = value.configFileName;
      this._key = value.key;
      this._value = value.value;
    }
  }

  // config_file_name - computed: false, optional: false, required: true
  private _configFileName?: string; 
  public get configFileName() {
    return this.getStringAttribute('config_file_name');
  }
  public set configFileName(value: string) {
    this._configFileName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get configFileNameInput() {
    return this._configFileName;
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
}

export class MapreduceClusterComponentConfigsConfigsList extends cdktf.ComplexList {
  public internalValue? : MapreduceClusterComponentConfigsConfigs[] | cdktf.IResolvable

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
  public get(index: number): MapreduceClusterComponentConfigsConfigsOutputReference {
    return new MapreduceClusterComponentConfigsConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MapreduceClusterComponentConfigs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#name MapreduceCluster#name}
  */
  readonly name: string;
  /**
  * configs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#configs MapreduceCluster#configs}
  */
  readonly configs: MapreduceClusterComponentConfigsConfigs[] | cdktf.IResolvable;
}

export function mapreduceClusterComponentConfigsToTerraform(struct?: MapreduceClusterComponentConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    configs: cdktf.listMapper(mapreduceClusterComponentConfigsConfigsToTerraform, true)(struct!.configs),
  }
}


export function mapreduceClusterComponentConfigsToHclTerraform(struct?: MapreduceClusterComponentConfigs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    configs: {
      value: cdktf.listMapperHcl(mapreduceClusterComponentConfigsConfigsToHclTerraform, true)(struct!.configs),
      isBlock: true,
      type: "list",
      storageClassType: "MapreduceClusterComponentConfigsConfigsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterComponentConfigsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MapreduceClusterComponentConfigs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._configs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.configs = this._configs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterComponentConfigs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._configs.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._configs.internalValue = value.configs;
    }
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

  // configs - computed: false, optional: false, required: true
  private _configs = new MapreduceClusterComponentConfigsConfigsList(this, "configs", false);
  public get configs() {
    return this._configs;
  }
  public putConfigs(value: MapreduceClusterComponentConfigsConfigs[] | cdktf.IResolvable) {
    this._configs.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get configsInput() {
    return this._configs.internalValue;
  }
}

export class MapreduceClusterComponentConfigsList extends cdktf.ComplexList {
  public internalValue? : MapreduceClusterComponentConfigs[] | cdktf.IResolvable

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
  public get(index: number): MapreduceClusterComponentConfigsOutputReference {
    return new MapreduceClusterComponentConfigsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MapreduceClusterCustomNodes {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#assigned_roles MapreduceCluster#assigned_roles}
  */
  readonly assignedRoles?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_count MapreduceCluster#data_volume_count}
  */
  readonly dataVolumeCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_size MapreduceCluster#data_volume_size}
  */
  readonly dataVolumeSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_type MapreduceCluster#data_volume_type}
  */
  readonly dataVolumeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#flavor MapreduceCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#group_name MapreduceCluster#group_name}
  */
  readonly groupName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#node_number MapreduceCluster#node_number}
  */
  readonly nodeNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_size MapreduceCluster#root_volume_size}
  */
  readonly rootVolumeSize: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_type MapreduceCluster#root_volume_type}
  */
  readonly rootVolumeType: string;
}

export function mapreduceClusterCustomNodesToTerraform(struct?: MapreduceClusterCustomNodes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    assigned_roles: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.assignedRoles),
    data_volume_count: cdktf.numberToTerraform(struct!.dataVolumeCount),
    data_volume_size: cdktf.numberToTerraform(struct!.dataVolumeSize),
    data_volume_type: cdktf.stringToTerraform(struct!.dataVolumeType),
    flavor: cdktf.stringToTerraform(struct!.flavor),
    group_name: cdktf.stringToTerraform(struct!.groupName),
    node_number: cdktf.numberToTerraform(struct!.nodeNumber),
    root_volume_size: cdktf.numberToTerraform(struct!.rootVolumeSize),
    root_volume_type: cdktf.stringToTerraform(struct!.rootVolumeType),
  }
}


export function mapreduceClusterCustomNodesToHclTerraform(struct?: MapreduceClusterCustomNodes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    assigned_roles: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.assignedRoles),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    data_volume_count: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.dataVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    group_name: {
      value: cdktf.stringToHclTerraform(struct!.groupName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    node_number: {
      value: cdktf.numberToHclTerraform(struct!.nodeNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.rootVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.rootVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterCustomNodesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MapreduceClusterCustomNodes | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._assignedRoles !== undefined) {
      hasAnyValues = true;
      internalValueResult.assignedRoles = this._assignedRoles;
    }
    if (this._dataVolumeCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeCount = this._dataVolumeCount;
    }
    if (this._dataVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeSize = this._dataVolumeSize;
    }
    if (this._dataVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeType = this._dataVolumeType;
    }
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._groupName !== undefined) {
      hasAnyValues = true;
      internalValueResult.groupName = this._groupName;
    }
    if (this._nodeNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodeNumber = this._nodeNumber;
    }
    if (this._rootVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeSize = this._rootVolumeSize;
    }
    if (this._rootVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeType = this._rootVolumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterCustomNodes | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._assignedRoles = undefined;
      this._dataVolumeCount = undefined;
      this._dataVolumeSize = undefined;
      this._dataVolumeType = undefined;
      this._flavor = undefined;
      this._groupName = undefined;
      this._nodeNumber = undefined;
      this._rootVolumeSize = undefined;
      this._rootVolumeType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._assignedRoles = value.assignedRoles;
      this._dataVolumeCount = value.dataVolumeCount;
      this._dataVolumeSize = value.dataVolumeSize;
      this._dataVolumeType = value.dataVolumeType;
      this._flavor = value.flavor;
      this._groupName = value.groupName;
      this._nodeNumber = value.nodeNumber;
      this._rootVolumeSize = value.rootVolumeSize;
      this._rootVolumeType = value.rootVolumeType;
    }
  }

  // assigned_roles - computed: false, optional: true, required: false
  private _assignedRoles?: string[]; 
  public get assignedRoles() {
    return this.getListAttribute('assigned_roles');
  }
  public set assignedRoles(value: string[]) {
    this._assignedRoles = value;
  }
  public resetAssignedRoles() {
    this._assignedRoles = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignedRolesInput() {
    return this._assignedRoles;
  }

  // data_volume_count - computed: false, optional: false, required: true
  private _dataVolumeCount?: number; 
  public get dataVolumeCount() {
    return this.getNumberAttribute('data_volume_count');
  }
  public set dataVolumeCount(value: number) {
    this._dataVolumeCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeCountInput() {
    return this._dataVolumeCount;
  }

  // data_volume_size - computed: false, optional: true, required: false
  private _dataVolumeSize?: number; 
  public get dataVolumeSize() {
    return this.getNumberAttribute('data_volume_size');
  }
  public set dataVolumeSize(value: number) {
    this._dataVolumeSize = value;
  }
  public resetDataVolumeSize() {
    this._dataVolumeSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeSizeInput() {
    return this._dataVolumeSize;
  }

  // data_volume_type - computed: false, optional: true, required: false
  private _dataVolumeType?: string; 
  public get dataVolumeType() {
    return this.getStringAttribute('data_volume_type');
  }
  public set dataVolumeType(value: string) {
    this._dataVolumeType = value;
  }
  public resetDataVolumeType() {
    this._dataVolumeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeTypeInput() {
    return this._dataVolumeType;
  }

  // flavor - computed: false, optional: false, required: true
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
  }

  // group_name - computed: false, optional: false, required: true
  private _groupName?: string; 
  public get groupName() {
    return this.getStringAttribute('group_name');
  }
  public set groupName(value: string) {
    this._groupName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get groupNameInput() {
    return this._groupName;
  }

  // host_ips - computed: true, optional: false, required: false
  public get hostIps() {
    return this.getListAttribute('host_ips');
  }

  // node_number - computed: false, optional: false, required: true
  private _nodeNumber?: number; 
  public get nodeNumber() {
    return this.getNumberAttribute('node_number');
  }
  public set nodeNumber(value: number) {
    this._nodeNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeNumberInput() {
    return this._nodeNumber;
  }

  // root_volume_size - computed: false, optional: false, required: true
  private _rootVolumeSize?: number; 
  public get rootVolumeSize() {
    return this.getNumberAttribute('root_volume_size');
  }
  public set rootVolumeSize(value: number) {
    this._rootVolumeSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeSizeInput() {
    return this._rootVolumeSize;
  }

  // root_volume_type - computed: false, optional: false, required: true
  private _rootVolumeType?: string; 
  public get rootVolumeType() {
    return this.getStringAttribute('root_volume_type');
  }
  public set rootVolumeType(value: string) {
    this._rootVolumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeTypeInput() {
    return this._rootVolumeType;
  }
}

export class MapreduceClusterCustomNodesList extends cdktf.ComplexList {
  public internalValue? : MapreduceClusterCustomNodes[] | cdktf.IResolvable

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
  public get(index: number): MapreduceClusterCustomNodesOutputReference {
    return new MapreduceClusterCustomNodesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MapreduceClusterExternalDatasources {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#component_name MapreduceCluster#component_name}
  */
  readonly componentName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_connection_id MapreduceCluster#data_connection_id}
  */
  readonly dataConnectionId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#role_type MapreduceCluster#role_type}
  */
  readonly roleType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#source_type MapreduceCluster#source_type}
  */
  readonly sourceType: string;
}

export function mapreduceClusterExternalDatasourcesToTerraform(struct?: MapreduceClusterExternalDatasources | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    component_name: cdktf.stringToTerraform(struct!.componentName),
    data_connection_id: cdktf.stringToTerraform(struct!.dataConnectionId),
    role_type: cdktf.stringToTerraform(struct!.roleType),
    source_type: cdktf.stringToTerraform(struct!.sourceType),
  }
}


export function mapreduceClusterExternalDatasourcesToHclTerraform(struct?: MapreduceClusterExternalDatasources | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    component_name: {
      value: cdktf.stringToHclTerraform(struct!.componentName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    data_connection_id: {
      value: cdktf.stringToHclTerraform(struct!.dataConnectionId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    role_type: {
      value: cdktf.stringToHclTerraform(struct!.roleType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source_type: {
      value: cdktf.stringToHclTerraform(struct!.sourceType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterExternalDatasourcesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MapreduceClusterExternalDatasources | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._componentName !== undefined) {
      hasAnyValues = true;
      internalValueResult.componentName = this._componentName;
    }
    if (this._dataConnectionId !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataConnectionId = this._dataConnectionId;
    }
    if (this._roleType !== undefined) {
      hasAnyValues = true;
      internalValueResult.roleType = this._roleType;
    }
    if (this._sourceType !== undefined) {
      hasAnyValues = true;
      internalValueResult.sourceType = this._sourceType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterExternalDatasources | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._componentName = undefined;
      this._dataConnectionId = undefined;
      this._roleType = undefined;
      this._sourceType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._componentName = value.componentName;
      this._dataConnectionId = value.dataConnectionId;
      this._roleType = value.roleType;
      this._sourceType = value.sourceType;
    }
  }

  // component_name - computed: false, optional: false, required: true
  private _componentName?: string; 
  public get componentName() {
    return this.getStringAttribute('component_name');
  }
  public set componentName(value: string) {
    this._componentName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get componentNameInput() {
    return this._componentName;
  }

  // data_connection_id - computed: false, optional: true, required: false
  private _dataConnectionId?: string; 
  public get dataConnectionId() {
    return this.getStringAttribute('data_connection_id');
  }
  public set dataConnectionId(value: string) {
    this._dataConnectionId = value;
  }
  public resetDataConnectionId() {
    this._dataConnectionId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataConnectionIdInput() {
    return this._dataConnectionId;
  }

  // role_type - computed: false, optional: false, required: true
  private _roleType?: string; 
  public get roleType() {
    return this.getStringAttribute('role_type');
  }
  public set roleType(value: string) {
    this._roleType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get roleTypeInput() {
    return this._roleType;
  }

  // source_type - computed: false, optional: false, required: true
  private _sourceType?: string; 
  public get sourceType() {
    return this.getStringAttribute('source_type');
  }
  public set sourceType(value: string) {
    this._sourceType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceTypeInput() {
    return this._sourceType;
  }
}

export class MapreduceClusterExternalDatasourcesList extends cdktf.ComplexList {
  public internalValue? : MapreduceClusterExternalDatasources[] | cdktf.IResolvable

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
  public get(index: number): MapreduceClusterExternalDatasourcesOutputReference {
    return new MapreduceClusterExternalDatasourcesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MapreduceClusterMasterNodes {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#assigned_roles MapreduceCluster#assigned_roles}
  */
  readonly assignedRoles?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_count MapreduceCluster#data_volume_count}
  */
  readonly dataVolumeCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_size MapreduceCluster#data_volume_size}
  */
  readonly dataVolumeSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_type MapreduceCluster#data_volume_type}
  */
  readonly dataVolumeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#flavor MapreduceCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#node_number MapreduceCluster#node_number}
  */
  readonly nodeNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_size MapreduceCluster#root_volume_size}
  */
  readonly rootVolumeSize: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_type MapreduceCluster#root_volume_type}
  */
  readonly rootVolumeType: string;
}

export function mapreduceClusterMasterNodesToTerraform(struct?: MapreduceClusterMasterNodesOutputReference | MapreduceClusterMasterNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    assigned_roles: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.assignedRoles),
    data_volume_count: cdktf.numberToTerraform(struct!.dataVolumeCount),
    data_volume_size: cdktf.numberToTerraform(struct!.dataVolumeSize),
    data_volume_type: cdktf.stringToTerraform(struct!.dataVolumeType),
    flavor: cdktf.stringToTerraform(struct!.flavor),
    node_number: cdktf.numberToTerraform(struct!.nodeNumber),
    root_volume_size: cdktf.numberToTerraform(struct!.rootVolumeSize),
    root_volume_type: cdktf.stringToTerraform(struct!.rootVolumeType),
  }
}


export function mapreduceClusterMasterNodesToHclTerraform(struct?: MapreduceClusterMasterNodesOutputReference | MapreduceClusterMasterNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    assigned_roles: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.assignedRoles),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    data_volume_count: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.dataVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    node_number: {
      value: cdktf.numberToHclTerraform(struct!.nodeNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.rootVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.rootVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterMasterNodesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MapreduceClusterMasterNodes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._assignedRoles !== undefined) {
      hasAnyValues = true;
      internalValueResult.assignedRoles = this._assignedRoles;
    }
    if (this._dataVolumeCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeCount = this._dataVolumeCount;
    }
    if (this._dataVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeSize = this._dataVolumeSize;
    }
    if (this._dataVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeType = this._dataVolumeType;
    }
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._nodeNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodeNumber = this._nodeNumber;
    }
    if (this._rootVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeSize = this._rootVolumeSize;
    }
    if (this._rootVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeType = this._rootVolumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterMasterNodes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._assignedRoles = undefined;
      this._dataVolumeCount = undefined;
      this._dataVolumeSize = undefined;
      this._dataVolumeType = undefined;
      this._flavor = undefined;
      this._nodeNumber = undefined;
      this._rootVolumeSize = undefined;
      this._rootVolumeType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._assignedRoles = value.assignedRoles;
      this._dataVolumeCount = value.dataVolumeCount;
      this._dataVolumeSize = value.dataVolumeSize;
      this._dataVolumeType = value.dataVolumeType;
      this._flavor = value.flavor;
      this._nodeNumber = value.nodeNumber;
      this._rootVolumeSize = value.rootVolumeSize;
      this._rootVolumeType = value.rootVolumeType;
    }
  }

  // assigned_roles - computed: false, optional: true, required: false
  private _assignedRoles?: string[]; 
  public get assignedRoles() {
    return this.getListAttribute('assigned_roles');
  }
  public set assignedRoles(value: string[]) {
    this._assignedRoles = value;
  }
  public resetAssignedRoles() {
    this._assignedRoles = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignedRolesInput() {
    return this._assignedRoles;
  }

  // data_volume_count - computed: false, optional: false, required: true
  private _dataVolumeCount?: number; 
  public get dataVolumeCount() {
    return this.getNumberAttribute('data_volume_count');
  }
  public set dataVolumeCount(value: number) {
    this._dataVolumeCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeCountInput() {
    return this._dataVolumeCount;
  }

  // data_volume_size - computed: false, optional: true, required: false
  private _dataVolumeSize?: number; 
  public get dataVolumeSize() {
    return this.getNumberAttribute('data_volume_size');
  }
  public set dataVolumeSize(value: number) {
    this._dataVolumeSize = value;
  }
  public resetDataVolumeSize() {
    this._dataVolumeSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeSizeInput() {
    return this._dataVolumeSize;
  }

  // data_volume_type - computed: false, optional: true, required: false
  private _dataVolumeType?: string; 
  public get dataVolumeType() {
    return this.getStringAttribute('data_volume_type');
  }
  public set dataVolumeType(value: string) {
    this._dataVolumeType = value;
  }
  public resetDataVolumeType() {
    this._dataVolumeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeTypeInput() {
    return this._dataVolumeType;
  }

  // flavor - computed: false, optional: false, required: true
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
  }

  // host_ips - computed: true, optional: false, required: false
  public get hostIps() {
    return this.getListAttribute('host_ips');
  }

  // node_number - computed: false, optional: false, required: true
  private _nodeNumber?: number; 
  public get nodeNumber() {
    return this.getNumberAttribute('node_number');
  }
  public set nodeNumber(value: number) {
    this._nodeNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeNumberInput() {
    return this._nodeNumber;
  }

  // root_volume_size - computed: false, optional: false, required: true
  private _rootVolumeSize?: number; 
  public get rootVolumeSize() {
    return this.getNumberAttribute('root_volume_size');
  }
  public set rootVolumeSize(value: number) {
    this._rootVolumeSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeSizeInput() {
    return this._rootVolumeSize;
  }

  // root_volume_type - computed: false, optional: false, required: true
  private _rootVolumeType?: string; 
  public get rootVolumeType() {
    return this.getStringAttribute('root_volume_type');
  }
  public set rootVolumeType(value: string) {
    this._rootVolumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeTypeInput() {
    return this._rootVolumeType;
  }
}
export interface MapreduceClusterSmnNotify {
  /**
  * The subscription rule name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#subscription_name MapreduceCluster#subscription_name}
  */
  readonly subscriptionName: string;
  /**
  * The Uniform Resource Name (URN) of the topic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#topic_urn MapreduceCluster#topic_urn}
  */
  readonly topicUrn: string;
}

export function mapreduceClusterSmnNotifyToTerraform(struct?: MapreduceClusterSmnNotifyOutputReference | MapreduceClusterSmnNotify): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    subscription_name: cdktf.stringToTerraform(struct!.subscriptionName),
    topic_urn: cdktf.stringToTerraform(struct!.topicUrn),
  }
}


export function mapreduceClusterSmnNotifyToHclTerraform(struct?: MapreduceClusterSmnNotifyOutputReference | MapreduceClusterSmnNotify): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    subscription_name: {
      value: cdktf.stringToHclTerraform(struct!.subscriptionName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topic_urn: {
      value: cdktf.stringToHclTerraform(struct!.topicUrn),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterSmnNotifyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MapreduceClusterSmnNotify | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._subscriptionName !== undefined) {
      hasAnyValues = true;
      internalValueResult.subscriptionName = this._subscriptionName;
    }
    if (this._topicUrn !== undefined) {
      hasAnyValues = true;
      internalValueResult.topicUrn = this._topicUrn;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterSmnNotify | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._subscriptionName = undefined;
      this._topicUrn = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._subscriptionName = value.subscriptionName;
      this._topicUrn = value.topicUrn;
    }
  }

  // subscription_name - computed: false, optional: false, required: true
  private _subscriptionName?: string; 
  public get subscriptionName() {
    return this.getStringAttribute('subscription_name');
  }
  public set subscriptionName(value: string) {
    this._subscriptionName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subscriptionNameInput() {
    return this._subscriptionName;
  }

  // topic_urn - computed: false, optional: false, required: true
  private _topicUrn?: string; 
  public get topicUrn() {
    return this.getStringAttribute('topic_urn');
  }
  public set topicUrn(value: string) {
    this._topicUrn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicUrnInput() {
    return this._topicUrn;
  }
}
export interface MapreduceClusterStreamingCoreNodes {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#assigned_roles MapreduceCluster#assigned_roles}
  */
  readonly assignedRoles?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_count MapreduceCluster#data_volume_count}
  */
  readonly dataVolumeCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_size MapreduceCluster#data_volume_size}
  */
  readonly dataVolumeSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_type MapreduceCluster#data_volume_type}
  */
  readonly dataVolumeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#flavor MapreduceCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#node_number MapreduceCluster#node_number}
  */
  readonly nodeNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_size MapreduceCluster#root_volume_size}
  */
  readonly rootVolumeSize: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_type MapreduceCluster#root_volume_type}
  */
  readonly rootVolumeType: string;
}

export function mapreduceClusterStreamingCoreNodesToTerraform(struct?: MapreduceClusterStreamingCoreNodesOutputReference | MapreduceClusterStreamingCoreNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    assigned_roles: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.assignedRoles),
    data_volume_count: cdktf.numberToTerraform(struct!.dataVolumeCount),
    data_volume_size: cdktf.numberToTerraform(struct!.dataVolumeSize),
    data_volume_type: cdktf.stringToTerraform(struct!.dataVolumeType),
    flavor: cdktf.stringToTerraform(struct!.flavor),
    node_number: cdktf.numberToTerraform(struct!.nodeNumber),
    root_volume_size: cdktf.numberToTerraform(struct!.rootVolumeSize),
    root_volume_type: cdktf.stringToTerraform(struct!.rootVolumeType),
  }
}


export function mapreduceClusterStreamingCoreNodesToHclTerraform(struct?: MapreduceClusterStreamingCoreNodesOutputReference | MapreduceClusterStreamingCoreNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    assigned_roles: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.assignedRoles),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    data_volume_count: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.dataVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    node_number: {
      value: cdktf.numberToHclTerraform(struct!.nodeNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.rootVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.rootVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterStreamingCoreNodesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MapreduceClusterStreamingCoreNodes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._assignedRoles !== undefined) {
      hasAnyValues = true;
      internalValueResult.assignedRoles = this._assignedRoles;
    }
    if (this._dataVolumeCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeCount = this._dataVolumeCount;
    }
    if (this._dataVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeSize = this._dataVolumeSize;
    }
    if (this._dataVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeType = this._dataVolumeType;
    }
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._nodeNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodeNumber = this._nodeNumber;
    }
    if (this._rootVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeSize = this._rootVolumeSize;
    }
    if (this._rootVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeType = this._rootVolumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterStreamingCoreNodes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._assignedRoles = undefined;
      this._dataVolumeCount = undefined;
      this._dataVolumeSize = undefined;
      this._dataVolumeType = undefined;
      this._flavor = undefined;
      this._nodeNumber = undefined;
      this._rootVolumeSize = undefined;
      this._rootVolumeType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._assignedRoles = value.assignedRoles;
      this._dataVolumeCount = value.dataVolumeCount;
      this._dataVolumeSize = value.dataVolumeSize;
      this._dataVolumeType = value.dataVolumeType;
      this._flavor = value.flavor;
      this._nodeNumber = value.nodeNumber;
      this._rootVolumeSize = value.rootVolumeSize;
      this._rootVolumeType = value.rootVolumeType;
    }
  }

  // assigned_roles - computed: false, optional: true, required: false
  private _assignedRoles?: string[]; 
  public get assignedRoles() {
    return this.getListAttribute('assigned_roles');
  }
  public set assignedRoles(value: string[]) {
    this._assignedRoles = value;
  }
  public resetAssignedRoles() {
    this._assignedRoles = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignedRolesInput() {
    return this._assignedRoles;
  }

  // data_volume_count - computed: false, optional: false, required: true
  private _dataVolumeCount?: number; 
  public get dataVolumeCount() {
    return this.getNumberAttribute('data_volume_count');
  }
  public set dataVolumeCount(value: number) {
    this._dataVolumeCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeCountInput() {
    return this._dataVolumeCount;
  }

  // data_volume_size - computed: false, optional: true, required: false
  private _dataVolumeSize?: number; 
  public get dataVolumeSize() {
    return this.getNumberAttribute('data_volume_size');
  }
  public set dataVolumeSize(value: number) {
    this._dataVolumeSize = value;
  }
  public resetDataVolumeSize() {
    this._dataVolumeSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeSizeInput() {
    return this._dataVolumeSize;
  }

  // data_volume_type - computed: false, optional: true, required: false
  private _dataVolumeType?: string; 
  public get dataVolumeType() {
    return this.getStringAttribute('data_volume_type');
  }
  public set dataVolumeType(value: string) {
    this._dataVolumeType = value;
  }
  public resetDataVolumeType() {
    this._dataVolumeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeTypeInput() {
    return this._dataVolumeType;
  }

  // flavor - computed: false, optional: false, required: true
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
  }

  // host_ips - computed: true, optional: false, required: false
  public get hostIps() {
    return this.getListAttribute('host_ips');
  }

  // node_number - computed: false, optional: false, required: true
  private _nodeNumber?: number; 
  public get nodeNumber() {
    return this.getNumberAttribute('node_number');
  }
  public set nodeNumber(value: number) {
    this._nodeNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeNumberInput() {
    return this._nodeNumber;
  }

  // root_volume_size - computed: false, optional: false, required: true
  private _rootVolumeSize?: number; 
  public get rootVolumeSize() {
    return this.getNumberAttribute('root_volume_size');
  }
  public set rootVolumeSize(value: number) {
    this._rootVolumeSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeSizeInput() {
    return this._rootVolumeSize;
  }

  // root_volume_type - computed: false, optional: false, required: true
  private _rootVolumeType?: string; 
  public get rootVolumeType() {
    return this.getStringAttribute('root_volume_type');
  }
  public set rootVolumeType(value: string) {
    this._rootVolumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeTypeInput() {
    return this._rootVolumeType;
  }
}
export interface MapreduceClusterStreamingTaskNodes {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#assigned_roles MapreduceCluster#assigned_roles}
  */
  readonly assignedRoles?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_count MapreduceCluster#data_volume_count}
  */
  readonly dataVolumeCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_size MapreduceCluster#data_volume_size}
  */
  readonly dataVolumeSize?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#data_volume_type MapreduceCluster#data_volume_type}
  */
  readonly dataVolumeType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#flavor MapreduceCluster#flavor}
  */
  readonly flavor: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#node_number MapreduceCluster#node_number}
  */
  readonly nodeNumber: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_size MapreduceCluster#root_volume_size}
  */
  readonly rootVolumeSize: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#root_volume_type MapreduceCluster#root_volume_type}
  */
  readonly rootVolumeType: string;
}

export function mapreduceClusterStreamingTaskNodesToTerraform(struct?: MapreduceClusterStreamingTaskNodesOutputReference | MapreduceClusterStreamingTaskNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    assigned_roles: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.assignedRoles),
    data_volume_count: cdktf.numberToTerraform(struct!.dataVolumeCount),
    data_volume_size: cdktf.numberToTerraform(struct!.dataVolumeSize),
    data_volume_type: cdktf.stringToTerraform(struct!.dataVolumeType),
    flavor: cdktf.stringToTerraform(struct!.flavor),
    node_number: cdktf.numberToTerraform(struct!.nodeNumber),
    root_volume_size: cdktf.numberToTerraform(struct!.rootVolumeSize),
    root_volume_type: cdktf.stringToTerraform(struct!.rootVolumeType),
  }
}


export function mapreduceClusterStreamingTaskNodesToHclTerraform(struct?: MapreduceClusterStreamingTaskNodesOutputReference | MapreduceClusterStreamingTaskNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    assigned_roles: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.assignedRoles),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    data_volume_count: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.dataVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    data_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.dataVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    flavor: {
      value: cdktf.stringToHclTerraform(struct!.flavor),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    node_number: {
      value: cdktf.numberToHclTerraform(struct!.nodeNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_size: {
      value: cdktf.numberToHclTerraform(struct!.rootVolumeSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    root_volume_type: {
      value: cdktf.stringToHclTerraform(struct!.rootVolumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceClusterStreamingTaskNodesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MapreduceClusterStreamingTaskNodes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._assignedRoles !== undefined) {
      hasAnyValues = true;
      internalValueResult.assignedRoles = this._assignedRoles;
    }
    if (this._dataVolumeCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeCount = this._dataVolumeCount;
    }
    if (this._dataVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeSize = this._dataVolumeSize;
    }
    if (this._dataVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.dataVolumeType = this._dataVolumeType;
    }
    if (this._flavor !== undefined) {
      hasAnyValues = true;
      internalValueResult.flavor = this._flavor;
    }
    if (this._nodeNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.nodeNumber = this._nodeNumber;
    }
    if (this._rootVolumeSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeSize = this._rootVolumeSize;
    }
    if (this._rootVolumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.rootVolumeType = this._rootVolumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceClusterStreamingTaskNodes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._assignedRoles = undefined;
      this._dataVolumeCount = undefined;
      this._dataVolumeSize = undefined;
      this._dataVolumeType = undefined;
      this._flavor = undefined;
      this._nodeNumber = undefined;
      this._rootVolumeSize = undefined;
      this._rootVolumeType = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._assignedRoles = value.assignedRoles;
      this._dataVolumeCount = value.dataVolumeCount;
      this._dataVolumeSize = value.dataVolumeSize;
      this._dataVolumeType = value.dataVolumeType;
      this._flavor = value.flavor;
      this._nodeNumber = value.nodeNumber;
      this._rootVolumeSize = value.rootVolumeSize;
      this._rootVolumeType = value.rootVolumeType;
    }
  }

  // assigned_roles - computed: false, optional: true, required: false
  private _assignedRoles?: string[]; 
  public get assignedRoles() {
    return this.getListAttribute('assigned_roles');
  }
  public set assignedRoles(value: string[]) {
    this._assignedRoles = value;
  }
  public resetAssignedRoles() {
    this._assignedRoles = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignedRolesInput() {
    return this._assignedRoles;
  }

  // data_volume_count - computed: false, optional: false, required: true
  private _dataVolumeCount?: number; 
  public get dataVolumeCount() {
    return this.getNumberAttribute('data_volume_count');
  }
  public set dataVolumeCount(value: number) {
    this._dataVolumeCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeCountInput() {
    return this._dataVolumeCount;
  }

  // data_volume_size - computed: false, optional: true, required: false
  private _dataVolumeSize?: number; 
  public get dataVolumeSize() {
    return this.getNumberAttribute('data_volume_size');
  }
  public set dataVolumeSize(value: number) {
    this._dataVolumeSize = value;
  }
  public resetDataVolumeSize() {
    this._dataVolumeSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeSizeInput() {
    return this._dataVolumeSize;
  }

  // data_volume_type - computed: false, optional: true, required: false
  private _dataVolumeType?: string; 
  public get dataVolumeType() {
    return this.getStringAttribute('data_volume_type');
  }
  public set dataVolumeType(value: string) {
    this._dataVolumeType = value;
  }
  public resetDataVolumeType() {
    this._dataVolumeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataVolumeTypeInput() {
    return this._dataVolumeType;
  }

  // flavor - computed: false, optional: false, required: true
  private _flavor?: string; 
  public get flavor() {
    return this.getStringAttribute('flavor');
  }
  public set flavor(value: string) {
    this._flavor = value;
  }
  // Temporarily expose input value. Use with caution.
  public get flavorInput() {
    return this._flavor;
  }

  // host_ips - computed: true, optional: false, required: false
  public get hostIps() {
    return this.getListAttribute('host_ips');
  }

  // node_number - computed: false, optional: false, required: true
  private _nodeNumber?: number; 
  public get nodeNumber() {
    return this.getNumberAttribute('node_number');
  }
  public set nodeNumber(value: number) {
    this._nodeNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeNumberInput() {
    return this._nodeNumber;
  }

  // root_volume_size - computed: false, optional: false, required: true
  private _rootVolumeSize?: number; 
  public get rootVolumeSize() {
    return this.getNumberAttribute('root_volume_size');
  }
  public set rootVolumeSize(value: number) {
    this._rootVolumeSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeSizeInput() {
    return this._rootVolumeSize;
  }

  // root_volume_type - computed: false, optional: false, required: true
  private _rootVolumeType?: string; 
  public get rootVolumeType() {
    return this.getStringAttribute('root_volume_type');
  }
  public set rootVolumeType(value: string) {
    this._rootVolumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeTypeInput() {
    return this._rootVolumeType;
  }
}
export interface MapreduceClusterTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#create MapreduceCluster#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#delete MapreduceCluster#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#update MapreduceCluster#update}
  */
  readonly update?: string;
}

export function mapreduceClusterTimeoutsToTerraform(struct?: MapreduceClusterTimeouts | cdktf.IResolvable): any {
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


export function mapreduceClusterTimeoutsToHclTerraform(struct?: MapreduceClusterTimeouts | cdktf.IResolvable): any {
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

export class MapreduceClusterTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): MapreduceClusterTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: MapreduceClusterTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster huaweicloud_mapreduce_cluster}
*/
export class MapreduceCluster extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_mapreduce_cluster";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a MapreduceCluster resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the MapreduceCluster to import
  * @param importFromId The id of the existing MapreduceCluster that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the MapreduceCluster to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_mapreduce_cluster", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_cluster huaweicloud_mapreduce_cluster} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MapreduceClusterConfig
  */
  public constructor(scope: Construct, id: string, config: MapreduceClusterConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_mapreduce_cluster',
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
    this._availabilityZone = config.availabilityZone;
    this._chargingMode = config.chargingMode;
    this._componentList = config.componentList;
    this._eipId = config.eipId;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._id = config.id;
    this._logCollection = config.logCollection;
    this._managerAdminPass = config.managerAdminPass;
    this._name = config.name;
    this._nodeAdminPass = config.nodeAdminPass;
    this._nodeKeyPair = config.nodeKeyPair;
    this._period = config.period;
    this._periodUnit = config.periodUnit;
    this._publicIp = config.publicIp;
    this._region = config.region;
    this._safeMode = config.safeMode;
    this._securityGroupIds = config.securityGroupIds;
    this._subnetId = config.subnetId;
    this._tags = config.tags;
    this._templateId = config.templateId;
    this._type = config.type;
    this._version = config.version;
    this._vpcId = config.vpcId;
    this._analysisCoreNodes.internalValue = config.analysisCoreNodes;
    this._analysisTaskNodes.internalValue = config.analysisTaskNodes;
    this._bootstrapScripts.internalValue = config.bootstrapScripts;
    this._componentConfigs.internalValue = config.componentConfigs;
    this._customNodes.internalValue = config.customNodes;
    this._externalDatasources.internalValue = config.externalDatasources;
    this._masterNodes.internalValue = config.masterNodes;
    this._smnNotify.internalValue = config.smnNotify;
    this._streamingCoreNodes.internalValue = config.streamingCoreNodes;
    this._streamingTaskNodes.internalValue = config.streamingTaskNodes;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // availability_zone - computed: false, optional: false, required: true
  private _availabilityZone?: string; 
  public get availabilityZone() {
    return this.getStringAttribute('availability_zone');
  }
  public set availabilityZone(value: string) {
    this._availabilityZone = value;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZoneInput() {
    return this._availabilityZone;
  }

  // charging_mode - computed: true, optional: true, required: false
  private _chargingMode?: string; 
  public get chargingMode() {
    return this.getStringAttribute('charging_mode');
  }
  public set chargingMode(value: string) {
    this._chargingMode = value;
  }
  public resetChargingMode() {
    this._chargingMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get chargingModeInput() {
    return this._chargingMode;
  }

  // charging_start_time - computed: true, optional: false, required: false
  public get chargingStartTime() {
    return this.getStringAttribute('charging_start_time');
  }

  // component_list - computed: false, optional: false, required: true
  private _componentList?: string[]; 
  public get componentList() {
    return cdktf.Fn.tolist(this.getListAttribute('component_list'));
  }
  public set componentList(value: string[]) {
    this._componentList = value;
  }
  // Temporarily expose input value. Use with caution.
  public get componentListInput() {
    return this._componentList;
  }

  // create_time - computed: true, optional: false, required: false
  public get createTime() {
    return this.getStringAttribute('create_time');
  }

  // eip_id - computed: true, optional: true, required: false
  private _eipId?: string; 
  public get eipId() {
    return this.getStringAttribute('eip_id');
  }
  public set eipId(value: string) {
    this._eipId = value;
  }
  public resetEipId() {
    this._eipId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eipIdInput() {
    return this._eipId;
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

  // log_collection - computed: false, optional: true, required: false
  private _logCollection?: boolean | cdktf.IResolvable; 
  public get logCollection() {
    return this.getBooleanAttribute('log_collection');
  }
  public set logCollection(value: boolean | cdktf.IResolvable) {
    this._logCollection = value;
  }
  public resetLogCollection() {
    this._logCollection = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logCollectionInput() {
    return this._logCollection;
  }

  // manager_admin_pass - computed: false, optional: false, required: true
  private _managerAdminPass?: string; 
  public get managerAdminPass() {
    return this.getStringAttribute('manager_admin_pass');
  }
  public set managerAdminPass(value: string) {
    this._managerAdminPass = value;
  }
  // Temporarily expose input value. Use with caution.
  public get managerAdminPassInput() {
    return this._managerAdminPass;
  }

  // master_node_ip - computed: true, optional: false, required: false
  public get masterNodeIp() {
    return this.getStringAttribute('master_node_ip');
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

  // node_admin_pass - computed: false, optional: true, required: false
  private _nodeAdminPass?: string; 
  public get nodeAdminPass() {
    return this.getStringAttribute('node_admin_pass');
  }
  public set nodeAdminPass(value: string) {
    this._nodeAdminPass = value;
  }
  public resetNodeAdminPass() {
    this._nodeAdminPass = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeAdminPassInput() {
    return this._nodeAdminPass;
  }

  // node_key_pair - computed: false, optional: true, required: false
  private _nodeKeyPair?: string; 
  public get nodeKeyPair() {
    return this.getStringAttribute('node_key_pair');
  }
  public set nodeKeyPair(value: string) {
    this._nodeKeyPair = value;
  }
  public resetNodeKeyPair() {
    this._nodeKeyPair = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeKeyPairInput() {
    return this._nodeKeyPair;
  }

  // period - computed: false, optional: true, required: false
  private _period?: number; 
  public get period() {
    return this.getNumberAttribute('period');
  }
  public set period(value: number) {
    this._period = value;
  }
  public resetPeriod() {
    this._period = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodInput() {
    return this._period;
  }

  // period_unit - computed: false, optional: true, required: false
  private _periodUnit?: string; 
  public get periodUnit() {
    return this.getStringAttribute('period_unit');
  }
  public set periodUnit(value: string) {
    this._periodUnit = value;
  }
  public resetPeriodUnit() {
    this._periodUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodUnitInput() {
    return this._periodUnit;
  }

  // private_ip - computed: true, optional: false, required: false
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }

  // public_ip - computed: true, optional: true, required: false
  private _publicIp?: string; 
  public get publicIp() {
    return this.getStringAttribute('public_ip');
  }
  public set publicIp(value: string) {
    this._publicIp = value;
  }
  public resetPublicIp() {
    this._publicIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicIpInput() {
    return this._publicIp;
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

  // safe_mode - computed: false, optional: true, required: false
  private _safeMode?: boolean | cdktf.IResolvable; 
  public get safeMode() {
    return this.getBooleanAttribute('safe_mode');
  }
  public set safeMode(value: boolean | cdktf.IResolvable) {
    this._safeMode = value;
  }
  public resetSafeMode() {
    this._safeMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get safeModeInput() {
    return this._safeMode;
  }

  // security_group_ids - computed: true, optional: true, required: false
  private _securityGroupIds?: string[]; 
  public get securityGroupIds() {
    return cdktf.Fn.tolist(this.getListAttribute('security_group_ids'));
  }
  public set securityGroupIds(value: string[]) {
    this._securityGroupIds = value;
  }
  public resetSecurityGroupIds() {
    this._securityGroupIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupIdsInput() {
    return this._securityGroupIds;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // template_id - computed: false, optional: true, required: false
  private _templateId?: string; 
  public get templateId() {
    return this.getStringAttribute('template_id');
  }
  public set templateId(value: string) {
    this._templateId = value;
  }
  public resetTemplateId() {
    this._templateId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get templateIdInput() {
    return this._templateId;
  }

  // total_node_number - computed: true, optional: false, required: false
  public get totalNodeNumber() {
    return this.getNumberAttribute('total_node_number');
  }

  // type - computed: false, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // update_time - computed: true, optional: false, required: false
  public get updateTime() {
    return this.getStringAttribute('update_time');
  }

  // version - computed: false, optional: false, required: true
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
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

  // analysis_core_nodes - computed: false, optional: true, required: false
  private _analysisCoreNodes = new MapreduceClusterAnalysisCoreNodesOutputReference(this, "analysis_core_nodes");
  public get analysisCoreNodes() {
    return this._analysisCoreNodes;
  }
  public putAnalysisCoreNodes(value: MapreduceClusterAnalysisCoreNodes) {
    this._analysisCoreNodes.internalValue = value;
  }
  public resetAnalysisCoreNodes() {
    this._analysisCoreNodes.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get analysisCoreNodesInput() {
    return this._analysisCoreNodes.internalValue;
  }

  // analysis_task_nodes - computed: false, optional: true, required: false
  private _analysisTaskNodes = new MapreduceClusterAnalysisTaskNodesOutputReference(this, "analysis_task_nodes");
  public get analysisTaskNodes() {
    return this._analysisTaskNodes;
  }
  public putAnalysisTaskNodes(value: MapreduceClusterAnalysisTaskNodes) {
    this._analysisTaskNodes.internalValue = value;
  }
  public resetAnalysisTaskNodes() {
    this._analysisTaskNodes.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get analysisTaskNodesInput() {
    return this._analysisTaskNodes.internalValue;
  }

  // bootstrap_scripts - computed: false, optional: true, required: false
  private _bootstrapScripts = new MapreduceClusterBootstrapScriptsList(this, "bootstrap_scripts", true);
  public get bootstrapScripts() {
    return this._bootstrapScripts;
  }
  public putBootstrapScripts(value: MapreduceClusterBootstrapScripts[] | cdktf.IResolvable) {
    this._bootstrapScripts.internalValue = value;
  }
  public resetBootstrapScripts() {
    this._bootstrapScripts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bootstrapScriptsInput() {
    return this._bootstrapScripts.internalValue;
  }

  // component_configs - computed: false, optional: true, required: false
  private _componentConfigs = new MapreduceClusterComponentConfigsList(this, "component_configs", false);
  public get componentConfigs() {
    return this._componentConfigs;
  }
  public putComponentConfigs(value: MapreduceClusterComponentConfigs[] | cdktf.IResolvable) {
    this._componentConfigs.internalValue = value;
  }
  public resetComponentConfigs() {
    this._componentConfigs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get componentConfigsInput() {
    return this._componentConfigs.internalValue;
  }

  // custom_nodes - computed: false, optional: true, required: false
  private _customNodes = new MapreduceClusterCustomNodesList(this, "custom_nodes", false);
  public get customNodes() {
    return this._customNodes;
  }
  public putCustomNodes(value: MapreduceClusterCustomNodes[] | cdktf.IResolvable) {
    this._customNodes.internalValue = value;
  }
  public resetCustomNodes() {
    this._customNodes.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customNodesInput() {
    return this._customNodes.internalValue;
  }

  // external_datasources - computed: false, optional: true, required: false
  private _externalDatasources = new MapreduceClusterExternalDatasourcesList(this, "external_datasources", false);
  public get externalDatasources() {
    return this._externalDatasources;
  }
  public putExternalDatasources(value: MapreduceClusterExternalDatasources[] | cdktf.IResolvable) {
    this._externalDatasources.internalValue = value;
  }
  public resetExternalDatasources() {
    this._externalDatasources.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get externalDatasourcesInput() {
    return this._externalDatasources.internalValue;
  }

  // master_nodes - computed: false, optional: false, required: true
  private _masterNodes = new MapreduceClusterMasterNodesOutputReference(this, "master_nodes");
  public get masterNodes() {
    return this._masterNodes;
  }
  public putMasterNodes(value: MapreduceClusterMasterNodes) {
    this._masterNodes.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get masterNodesInput() {
    return this._masterNodes.internalValue;
  }

  // smn_notify - computed: false, optional: true, required: false
  private _smnNotify = new MapreduceClusterSmnNotifyOutputReference(this, "smn_notify");
  public get smnNotify() {
    return this._smnNotify;
  }
  public putSmnNotify(value: MapreduceClusterSmnNotify) {
    this._smnNotify.internalValue = value;
  }
  public resetSmnNotify() {
    this._smnNotify.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smnNotifyInput() {
    return this._smnNotify.internalValue;
  }

  // streaming_core_nodes - computed: false, optional: true, required: false
  private _streamingCoreNodes = new MapreduceClusterStreamingCoreNodesOutputReference(this, "streaming_core_nodes");
  public get streamingCoreNodes() {
    return this._streamingCoreNodes;
  }
  public putStreamingCoreNodes(value: MapreduceClusterStreamingCoreNodes) {
    this._streamingCoreNodes.internalValue = value;
  }
  public resetStreamingCoreNodes() {
    this._streamingCoreNodes.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get streamingCoreNodesInput() {
    return this._streamingCoreNodes.internalValue;
  }

  // streaming_task_nodes - computed: false, optional: true, required: false
  private _streamingTaskNodes = new MapreduceClusterStreamingTaskNodesOutputReference(this, "streaming_task_nodes");
  public get streamingTaskNodes() {
    return this._streamingTaskNodes;
  }
  public putStreamingTaskNodes(value: MapreduceClusterStreamingTaskNodes) {
    this._streamingTaskNodes.internalValue = value;
  }
  public resetStreamingTaskNodes() {
    this._streamingTaskNodes.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get streamingTaskNodesInput() {
    return this._streamingTaskNodes.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new MapreduceClusterTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: MapreduceClusterTimeouts) {
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
      availability_zone: cdktf.stringToTerraform(this._availabilityZone),
      charging_mode: cdktf.stringToTerraform(this._chargingMode),
      component_list: cdktf.listMapper(cdktf.stringToTerraform, false)(this._componentList),
      eip_id: cdktf.stringToTerraform(this._eipId),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      id: cdktf.stringToTerraform(this._id),
      log_collection: cdktf.booleanToTerraform(this._logCollection),
      manager_admin_pass: cdktf.stringToTerraform(this._managerAdminPass),
      name: cdktf.stringToTerraform(this._name),
      node_admin_pass: cdktf.stringToTerraform(this._nodeAdminPass),
      node_key_pair: cdktf.stringToTerraform(this._nodeKeyPair),
      period: cdktf.numberToTerraform(this._period),
      period_unit: cdktf.stringToTerraform(this._periodUnit),
      public_ip: cdktf.stringToTerraform(this._publicIp),
      region: cdktf.stringToTerraform(this._region),
      safe_mode: cdktf.booleanToTerraform(this._safeMode),
      security_group_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._securityGroupIds),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      template_id: cdktf.stringToTerraform(this._templateId),
      type: cdktf.stringToTerraform(this._type),
      version: cdktf.stringToTerraform(this._version),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      analysis_core_nodes: mapreduceClusterAnalysisCoreNodesToTerraform(this._analysisCoreNodes.internalValue),
      analysis_task_nodes: mapreduceClusterAnalysisTaskNodesToTerraform(this._analysisTaskNodes.internalValue),
      bootstrap_scripts: cdktf.listMapper(mapreduceClusterBootstrapScriptsToTerraform, true)(this._bootstrapScripts.internalValue),
      component_configs: cdktf.listMapper(mapreduceClusterComponentConfigsToTerraform, true)(this._componentConfigs.internalValue),
      custom_nodes: cdktf.listMapper(mapreduceClusterCustomNodesToTerraform, true)(this._customNodes.internalValue),
      external_datasources: cdktf.listMapper(mapreduceClusterExternalDatasourcesToTerraform, true)(this._externalDatasources.internalValue),
      master_nodes: mapreduceClusterMasterNodesToTerraform(this._masterNodes.internalValue),
      smn_notify: mapreduceClusterSmnNotifyToTerraform(this._smnNotify.internalValue),
      streaming_core_nodes: mapreduceClusterStreamingCoreNodesToTerraform(this._streamingCoreNodes.internalValue),
      streaming_task_nodes: mapreduceClusterStreamingTaskNodesToTerraform(this._streamingTaskNodes.internalValue),
      timeouts: mapreduceClusterTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      availability_zone: {
        value: cdktf.stringToHclTerraform(this._availabilityZone),
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
      component_list: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._componentList),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      eip_id: {
        value: cdktf.stringToHclTerraform(this._eipId),
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
      log_collection: {
        value: cdktf.booleanToHclTerraform(this._logCollection),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      manager_admin_pass: {
        value: cdktf.stringToHclTerraform(this._managerAdminPass),
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
      node_admin_pass: {
        value: cdktf.stringToHclTerraform(this._nodeAdminPass),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      node_key_pair: {
        value: cdktf.stringToHclTerraform(this._nodeKeyPair),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      period: {
        value: cdktf.numberToHclTerraform(this._period),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      period_unit: {
        value: cdktf.stringToHclTerraform(this._periodUnit),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      public_ip: {
        value: cdktf.stringToHclTerraform(this._publicIp),
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
      safe_mode: {
        value: cdktf.booleanToHclTerraform(this._safeMode),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      security_group_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._securityGroupIds),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
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
      template_id: {
        value: cdktf.stringToHclTerraform(this._templateId),
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
      version: {
        value: cdktf.stringToHclTerraform(this._version),
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
      analysis_core_nodes: {
        value: mapreduceClusterAnalysisCoreNodesToHclTerraform(this._analysisCoreNodes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceClusterAnalysisCoreNodesList",
      },
      analysis_task_nodes: {
        value: mapreduceClusterAnalysisTaskNodesToHclTerraform(this._analysisTaskNodes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceClusterAnalysisTaskNodesList",
      },
      bootstrap_scripts: {
        value: cdktf.listMapperHcl(mapreduceClusterBootstrapScriptsToHclTerraform, true)(this._bootstrapScripts.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "MapreduceClusterBootstrapScriptsList",
      },
      component_configs: {
        value: cdktf.listMapperHcl(mapreduceClusterComponentConfigsToHclTerraform, true)(this._componentConfigs.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceClusterComponentConfigsList",
      },
      custom_nodes: {
        value: cdktf.listMapperHcl(mapreduceClusterCustomNodesToHclTerraform, true)(this._customNodes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceClusterCustomNodesList",
      },
      external_datasources: {
        value: cdktf.listMapperHcl(mapreduceClusterExternalDatasourcesToHclTerraform, true)(this._externalDatasources.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceClusterExternalDatasourcesList",
      },
      master_nodes: {
        value: mapreduceClusterMasterNodesToHclTerraform(this._masterNodes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceClusterMasterNodesList",
      },
      smn_notify: {
        value: mapreduceClusterSmnNotifyToHclTerraform(this._smnNotify.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceClusterSmnNotifyList",
      },
      streaming_core_nodes: {
        value: mapreduceClusterStreamingCoreNodesToHclTerraform(this._streamingCoreNodes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceClusterStreamingCoreNodesList",
      },
      streaming_task_nodes: {
        value: mapreduceClusterStreamingTaskNodesToHclTerraform(this._streamingTaskNodes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceClusterStreamingTaskNodesList",
      },
      timeouts: {
        value: mapreduceClusterTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "MapreduceClusterTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

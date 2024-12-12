// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MrsClusterV1Config extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#available_zone_id MrsClusterV1#available_zone_id}
  */
  readonly availableZoneId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#billing_type MrsClusterV1#billing_type}
  */
  readonly billingType: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#cluster_admin_secret MrsClusterV1#cluster_admin_secret}
  */
  readonly clusterAdminSecret: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#cluster_name MrsClusterV1#cluster_name}
  */
  readonly clusterName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#cluster_type MrsClusterV1#cluster_type}
  */
  readonly clusterType?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#cluster_version MrsClusterV1#cluster_version}
  */
  readonly clusterVersion?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#core_node_num MrsClusterV1#core_node_num}
  */
  readonly coreNodeNum: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#core_node_size MrsClusterV1#core_node_size}
  */
  readonly coreNodeSize: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#id MrsClusterV1#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#log_collection MrsClusterV1#log_collection}
  */
  readonly logCollection?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#master_node_num MrsClusterV1#master_node_num}
  */
  readonly masterNodeNum: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#master_node_size MrsClusterV1#master_node_size}
  */
  readonly masterNodeSize: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#node_password MrsClusterV1#node_password}
  */
  readonly nodePassword?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#node_public_cert_name MrsClusterV1#node_public_cert_name}
  */
  readonly nodePublicCertName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#region MrsClusterV1#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#safe_mode MrsClusterV1#safe_mode}
  */
  readonly safeMode: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#subnet_id MrsClusterV1#subnet_id}
  */
  readonly subnetId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#tags MrsClusterV1#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#volume_size MrsClusterV1#volume_size}
  */
  readonly volumeSize: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#volume_type MrsClusterV1#volume_type}
  */
  readonly volumeType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#vpc_id MrsClusterV1#vpc_id}
  */
  readonly vpcId: string;
  /**
  * add_jobs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#add_jobs MrsClusterV1#add_jobs}
  */
  readonly addJobs?: MrsClusterV1AddJobs[] | cdktf.IResolvable;
  /**
  * component_list block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#component_list MrsClusterV1#component_list}
  */
  readonly componentList: MrsClusterV1ComponentListStruct[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#timeouts MrsClusterV1#timeouts}
  */
  readonly timeouts?: MrsClusterV1Timeouts;
}
export interface MrsClusterV1AddJobs {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#arguments MrsClusterV1#arguments}
  */
  readonly arguments?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#file_action MrsClusterV1#file_action}
  */
  readonly fileAction?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#hive_script_path MrsClusterV1#hive_script_path}
  */
  readonly hiveScriptPath?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#hql MrsClusterV1#hql}
  */
  readonly hql?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#input MrsClusterV1#input}
  */
  readonly input?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#jar_path MrsClusterV1#jar_path}
  */
  readonly jarPath: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#job_log MrsClusterV1#job_log}
  */
  readonly jobLog?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#job_name MrsClusterV1#job_name}
  */
  readonly jobName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#job_type MrsClusterV1#job_type}
  */
  readonly jobType: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#output MrsClusterV1#output}
  */
  readonly output?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#shutdown_cluster MrsClusterV1#shutdown_cluster}
  */
  readonly shutdownCluster?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#submit_job_once_cluster_run MrsClusterV1#submit_job_once_cluster_run}
  */
  readonly submitJobOnceClusterRun: boolean | cdktf.IResolvable;
}

export function mrsClusterV1AddJobsToTerraform(struct?: MrsClusterV1AddJobs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    arguments: cdktf.stringToTerraform(struct!.arguments),
    file_action: cdktf.stringToTerraform(struct!.fileAction),
    hive_script_path: cdktf.stringToTerraform(struct!.hiveScriptPath),
    hql: cdktf.stringToTerraform(struct!.hql),
    input: cdktf.stringToTerraform(struct!.input),
    jar_path: cdktf.stringToTerraform(struct!.jarPath),
    job_log: cdktf.stringToTerraform(struct!.jobLog),
    job_name: cdktf.stringToTerraform(struct!.jobName),
    job_type: cdktf.numberToTerraform(struct!.jobType),
    output: cdktf.stringToTerraform(struct!.output),
    shutdown_cluster: cdktf.booleanToTerraform(struct!.shutdownCluster),
    submit_job_once_cluster_run: cdktf.booleanToTerraform(struct!.submitJobOnceClusterRun),
  }
}


export function mrsClusterV1AddJobsToHclTerraform(struct?: MrsClusterV1AddJobs | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    arguments: {
      value: cdktf.stringToHclTerraform(struct!.arguments),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    file_action: {
      value: cdktf.stringToHclTerraform(struct!.fileAction),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    hive_script_path: {
      value: cdktf.stringToHclTerraform(struct!.hiveScriptPath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    hql: {
      value: cdktf.stringToHclTerraform(struct!.hql),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    input: {
      value: cdktf.stringToHclTerraform(struct!.input),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    jar_path: {
      value: cdktf.stringToHclTerraform(struct!.jarPath),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    job_log: {
      value: cdktf.stringToHclTerraform(struct!.jobLog),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    job_name: {
      value: cdktf.stringToHclTerraform(struct!.jobName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    job_type: {
      value: cdktf.numberToHclTerraform(struct!.jobType),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    output: {
      value: cdktf.stringToHclTerraform(struct!.output),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    shutdown_cluster: {
      value: cdktf.booleanToHclTerraform(struct!.shutdownCluster),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    submit_job_once_cluster_run: {
      value: cdktf.booleanToHclTerraform(struct!.submitJobOnceClusterRun),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MrsClusterV1AddJobsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MrsClusterV1AddJobs | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._arguments !== undefined) {
      hasAnyValues = true;
      internalValueResult.arguments = this._arguments;
    }
    if (this._fileAction !== undefined) {
      hasAnyValues = true;
      internalValueResult.fileAction = this._fileAction;
    }
    if (this._hiveScriptPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.hiveScriptPath = this._hiveScriptPath;
    }
    if (this._hql !== undefined) {
      hasAnyValues = true;
      internalValueResult.hql = this._hql;
    }
    if (this._input !== undefined) {
      hasAnyValues = true;
      internalValueResult.input = this._input;
    }
    if (this._jarPath !== undefined) {
      hasAnyValues = true;
      internalValueResult.jarPath = this._jarPath;
    }
    if (this._jobLog !== undefined) {
      hasAnyValues = true;
      internalValueResult.jobLog = this._jobLog;
    }
    if (this._jobName !== undefined) {
      hasAnyValues = true;
      internalValueResult.jobName = this._jobName;
    }
    if (this._jobType !== undefined) {
      hasAnyValues = true;
      internalValueResult.jobType = this._jobType;
    }
    if (this._output !== undefined) {
      hasAnyValues = true;
      internalValueResult.output = this._output;
    }
    if (this._shutdownCluster !== undefined) {
      hasAnyValues = true;
      internalValueResult.shutdownCluster = this._shutdownCluster;
    }
    if (this._submitJobOnceClusterRun !== undefined) {
      hasAnyValues = true;
      internalValueResult.submitJobOnceClusterRun = this._submitJobOnceClusterRun;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MrsClusterV1AddJobs | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._arguments = undefined;
      this._fileAction = undefined;
      this._hiveScriptPath = undefined;
      this._hql = undefined;
      this._input = undefined;
      this._jarPath = undefined;
      this._jobLog = undefined;
      this._jobName = undefined;
      this._jobType = undefined;
      this._output = undefined;
      this._shutdownCluster = undefined;
      this._submitJobOnceClusterRun = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._arguments = value.arguments;
      this._fileAction = value.fileAction;
      this._hiveScriptPath = value.hiveScriptPath;
      this._hql = value.hql;
      this._input = value.input;
      this._jarPath = value.jarPath;
      this._jobLog = value.jobLog;
      this._jobName = value.jobName;
      this._jobType = value.jobType;
      this._output = value.output;
      this._shutdownCluster = value.shutdownCluster;
      this._submitJobOnceClusterRun = value.submitJobOnceClusterRun;
    }
  }

  // arguments - computed: true, optional: true, required: false
  private _arguments?: string; 
  public get arguments() {
    return this.getStringAttribute('arguments');
  }
  public set arguments(value: string) {
    this._arguments = value;
  }
  public resetArguments() {
    this._arguments = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get argumentsInput() {
    return this._arguments;
  }

  // file_action - computed: true, optional: true, required: false
  private _fileAction?: string; 
  public get fileAction() {
    return this.getStringAttribute('file_action');
  }
  public set fileAction(value: string) {
    this._fileAction = value;
  }
  public resetFileAction() {
    this._fileAction = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fileActionInput() {
    return this._fileAction;
  }

  // hive_script_path - computed: true, optional: true, required: false
  private _hiveScriptPath?: string; 
  public get hiveScriptPath() {
    return this.getStringAttribute('hive_script_path');
  }
  public set hiveScriptPath(value: string) {
    this._hiveScriptPath = value;
  }
  public resetHiveScriptPath() {
    this._hiveScriptPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hiveScriptPathInput() {
    return this._hiveScriptPath;
  }

  // hql - computed: true, optional: true, required: false
  private _hql?: string; 
  public get hql() {
    return this.getStringAttribute('hql');
  }
  public set hql(value: string) {
    this._hql = value;
  }
  public resetHql() {
    this._hql = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hqlInput() {
    return this._hql;
  }

  // input - computed: true, optional: true, required: false
  private _input?: string; 
  public get input() {
    return this.getStringAttribute('input');
  }
  public set input(value: string) {
    this._input = value;
  }
  public resetInput() {
    this._input = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inputInput() {
    return this._input;
  }

  // jar_path - computed: false, optional: false, required: true
  private _jarPath?: string; 
  public get jarPath() {
    return this.getStringAttribute('jar_path');
  }
  public set jarPath(value: string) {
    this._jarPath = value;
  }
  // Temporarily expose input value. Use with caution.
  public get jarPathInput() {
    return this._jarPath;
  }

  // job_log - computed: true, optional: true, required: false
  private _jobLog?: string; 
  public get jobLog() {
    return this.getStringAttribute('job_log');
  }
  public set jobLog(value: string) {
    this._jobLog = value;
  }
  public resetJobLog() {
    this._jobLog = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get jobLogInput() {
    return this._jobLog;
  }

  // job_name - computed: false, optional: false, required: true
  private _jobName?: string; 
  public get jobName() {
    return this.getStringAttribute('job_name');
  }
  public set jobName(value: string) {
    this._jobName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get jobNameInput() {
    return this._jobName;
  }

  // job_type - computed: false, optional: false, required: true
  private _jobType?: number; 
  public get jobType() {
    return this.getNumberAttribute('job_type');
  }
  public set jobType(value: number) {
    this._jobType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get jobTypeInput() {
    return this._jobType;
  }

  // output - computed: true, optional: true, required: false
  private _output?: string; 
  public get output() {
    return this.getStringAttribute('output');
  }
  public set output(value: string) {
    this._output = value;
  }
  public resetOutput() {
    this._output = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get outputInput() {
    return this._output;
  }

  // shutdown_cluster - computed: true, optional: true, required: false
  private _shutdownCluster?: boolean | cdktf.IResolvable; 
  public get shutdownCluster() {
    return this.getBooleanAttribute('shutdown_cluster');
  }
  public set shutdownCluster(value: boolean | cdktf.IResolvable) {
    this._shutdownCluster = value;
  }
  public resetShutdownCluster() {
    this._shutdownCluster = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get shutdownClusterInput() {
    return this._shutdownCluster;
  }

  // submit_job_once_cluster_run - computed: false, optional: false, required: true
  private _submitJobOnceClusterRun?: boolean | cdktf.IResolvable; 
  public get submitJobOnceClusterRun() {
    return this.getBooleanAttribute('submit_job_once_cluster_run');
  }
  public set submitJobOnceClusterRun(value: boolean | cdktf.IResolvable) {
    this._submitJobOnceClusterRun = value;
  }
  // Temporarily expose input value. Use with caution.
  public get submitJobOnceClusterRunInput() {
    return this._submitJobOnceClusterRun;
  }
}

export class MrsClusterV1AddJobsList extends cdktf.ComplexList {
  public internalValue? : MrsClusterV1AddJobs[] | cdktf.IResolvable

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
  public get(index: number): MrsClusterV1AddJobsOutputReference {
    return new MrsClusterV1AddJobsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MrsClusterV1ComponentListStruct {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#component_name MrsClusterV1#component_name}
  */
  readonly componentName: string;
}

export function mrsClusterV1ComponentListStructToTerraform(struct?: MrsClusterV1ComponentListStruct | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    component_name: cdktf.stringToTerraform(struct!.componentName),
  }
}


export function mrsClusterV1ComponentListStructToHclTerraform(struct?: MrsClusterV1ComponentListStruct | cdktf.IResolvable): any {
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MrsClusterV1ComponentListStructOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MrsClusterV1ComponentListStruct | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._componentName !== undefined) {
      hasAnyValues = true;
      internalValueResult.componentName = this._componentName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MrsClusterV1ComponentListStruct | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._componentName = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._componentName = value.componentName;
    }
  }

  // component_desc - computed: true, optional: false, required: false
  public get componentDesc() {
    return this.getStringAttribute('component_desc');
  }

  // component_id - computed: true, optional: false, required: false
  public get componentId() {
    return this.getStringAttribute('component_id');
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

  // component_version - computed: true, optional: false, required: false
  public get componentVersion() {
    return this.getStringAttribute('component_version');
  }
}

export class MrsClusterV1ComponentListStructList extends cdktf.ComplexList {
  public internalValue? : MrsClusterV1ComponentListStruct[] | cdktf.IResolvable

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
  public get(index: number): MrsClusterV1ComponentListStructOutputReference {
    return new MrsClusterV1ComponentListStructOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MrsClusterV1Timeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#create MrsClusterV1#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#delete MrsClusterV1#delete}
  */
  readonly delete?: string;
}

export function mrsClusterV1TimeoutsToTerraform(struct?: MrsClusterV1Timeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


export function mrsClusterV1TimeoutsToHclTerraform(struct?: MrsClusterV1Timeouts | cdktf.IResolvable): any {
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

export class MrsClusterV1TimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): MrsClusterV1Timeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: MrsClusterV1Timeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1 huaweicloud_mrs_cluster_v1}
*/
export class MrsClusterV1 extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_mrs_cluster_v1";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a MrsClusterV1 resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the MrsClusterV1 to import
  * @param importFromId The id of the existing MrsClusterV1 that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the MrsClusterV1 to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_mrs_cluster_v1", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mrs_cluster_v1 huaweicloud_mrs_cluster_v1} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MrsClusterV1Config
  */
  public constructor(scope: Construct, id: string, config: MrsClusterV1Config) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_mrs_cluster_v1',
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
    this._availableZoneId = config.availableZoneId;
    this._billingType = config.billingType;
    this._clusterAdminSecret = config.clusterAdminSecret;
    this._clusterName = config.clusterName;
    this._clusterType = config.clusterType;
    this._clusterVersion = config.clusterVersion;
    this._coreNodeNum = config.coreNodeNum;
    this._coreNodeSize = config.coreNodeSize;
    this._id = config.id;
    this._logCollection = config.logCollection;
    this._masterNodeNum = config.masterNodeNum;
    this._masterNodeSize = config.masterNodeSize;
    this._nodePassword = config.nodePassword;
    this._nodePublicCertName = config.nodePublicCertName;
    this._region = config.region;
    this._safeMode = config.safeMode;
    this._subnetId = config.subnetId;
    this._tags = config.tags;
    this._volumeSize = config.volumeSize;
    this._volumeType = config.volumeType;
    this._vpcId = config.vpcId;
    this._addJobs.internalValue = config.addJobs;
    this._componentList.internalValue = config.componentList;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // available_zone_id - computed: false, optional: false, required: true
  private _availableZoneId?: string; 
  public get availableZoneId() {
    return this.getStringAttribute('available_zone_id');
  }
  public set availableZoneId(value: string) {
    this._availableZoneId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get availableZoneIdInput() {
    return this._availableZoneId;
  }

  // available_zone_name - computed: true, optional: false, required: false
  public get availableZoneName() {
    return this.getStringAttribute('available_zone_name');
  }

  // billing_type - computed: false, optional: false, required: true
  private _billingType?: number; 
  public get billingType() {
    return this.getNumberAttribute('billing_type');
  }
  public set billingType(value: number) {
    this._billingType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get billingTypeInput() {
    return this._billingType;
  }

  // charging_start_time - computed: true, optional: false, required: false
  public get chargingStartTime() {
    return this.getStringAttribute('charging_start_time');
  }

  // cluster_admin_secret - computed: false, optional: false, required: true
  private _clusterAdminSecret?: string; 
  public get clusterAdminSecret() {
    return this.getStringAttribute('cluster_admin_secret');
  }
  public set clusterAdminSecret(value: string) {
    this._clusterAdminSecret = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterAdminSecretInput() {
    return this._clusterAdminSecret;
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

  // cluster_state - computed: true, optional: false, required: false
  public get clusterState() {
    return this.getStringAttribute('cluster_state');
  }

  // cluster_type - computed: true, optional: true, required: false
  private _clusterType?: number; 
  public get clusterType() {
    return this.getNumberAttribute('cluster_type');
  }
  public set clusterType(value: number) {
    this._clusterType = value;
  }
  public resetClusterType() {
    this._clusterType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterTypeInput() {
    return this._clusterType;
  }

  // cluster_version - computed: true, optional: true, required: false
  private _clusterVersion?: string; 
  public get clusterVersion() {
    return this.getStringAttribute('cluster_version');
  }
  public set clusterVersion(value: string) {
    this._clusterVersion = value;
  }
  public resetClusterVersion() {
    this._clusterVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterVersionInput() {
    return this._clusterVersion;
  }

  // core_node_num - computed: false, optional: false, required: true
  private _coreNodeNum?: number; 
  public get coreNodeNum() {
    return this.getNumberAttribute('core_node_num');
  }
  public set coreNodeNum(value: number) {
    this._coreNodeNum = value;
  }
  // Temporarily expose input value. Use with caution.
  public get coreNodeNumInput() {
    return this._coreNodeNum;
  }

  // core_node_product_id - computed: true, optional: false, required: false
  public get coreNodeProductId() {
    return this.getStringAttribute('core_node_product_id');
  }

  // core_node_size - computed: false, optional: false, required: true
  private _coreNodeSize?: string; 
  public get coreNodeSize() {
    return this.getStringAttribute('core_node_size');
  }
  public set coreNodeSize(value: string) {
    this._coreNodeSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get coreNodeSizeInput() {
    return this._coreNodeSize;
  }

  // core_node_spec_id - computed: true, optional: false, required: false
  public get coreNodeSpecId() {
    return this.getStringAttribute('core_node_spec_id');
  }

  // create_at - computed: true, optional: false, required: false
  public get createAt() {
    return this.getStringAttribute('create_at');
  }

  // deployment_id - computed: true, optional: false, required: false
  public get deploymentId() {
    return this.getStringAttribute('deployment_id');
  }

  // duration - computed: true, optional: false, required: false
  public get duration() {
    return this.getStringAttribute('duration');
  }

  // error_info - computed: true, optional: false, required: false
  public get errorInfo() {
    return this.getStringAttribute('error_info');
  }

  // external_alternate_ip - computed: true, optional: false, required: false
  public get externalAlternateIp() {
    return this.getStringAttribute('external_alternate_ip');
  }

  // external_ip - computed: true, optional: false, required: false
  public get externalIp() {
    return this.getStringAttribute('external_ip');
  }

  // fee - computed: true, optional: false, required: false
  public get fee() {
    return this.getStringAttribute('fee');
  }

  // hadoop_version - computed: true, optional: false, required: false
  public get hadoopVersion() {
    return this.getStringAttribute('hadoop_version');
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

  // instance_id - computed: true, optional: false, required: false
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }

  // internal_ip - computed: true, optional: false, required: false
  public get internalIp() {
    return this.getStringAttribute('internal_ip');
  }

  // log_collection - computed: true, optional: true, required: false
  private _logCollection?: number; 
  public get logCollection() {
    return this.getNumberAttribute('log_collection');
  }
  public set logCollection(value: number) {
    this._logCollection = value;
  }
  public resetLogCollection() {
    this._logCollection = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logCollectionInput() {
    return this._logCollection;
  }

  // master_node_ip - computed: true, optional: false, required: false
  public get masterNodeIp() {
    return this.getStringAttribute('master_node_ip');
  }

  // master_node_num - computed: false, optional: false, required: true
  private _masterNodeNum?: number; 
  public get masterNodeNum() {
    return this.getNumberAttribute('master_node_num');
  }
  public set masterNodeNum(value: number) {
    this._masterNodeNum = value;
  }
  // Temporarily expose input value. Use with caution.
  public get masterNodeNumInput() {
    return this._masterNodeNum;
  }

  // master_node_product_id - computed: true, optional: false, required: false
  public get masterNodeProductId() {
    return this.getStringAttribute('master_node_product_id');
  }

  // master_node_size - computed: false, optional: false, required: true
  private _masterNodeSize?: string; 
  public get masterNodeSize() {
    return this.getStringAttribute('master_node_size');
  }
  public set masterNodeSize(value: string) {
    this._masterNodeSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get masterNodeSizeInput() {
    return this._masterNodeSize;
  }

  // master_node_spec_id - computed: true, optional: false, required: false
  public get masterNodeSpecId() {
    return this.getStringAttribute('master_node_spec_id');
  }

  // node_password - computed: false, optional: true, required: false
  private _nodePassword?: string; 
  public get nodePassword() {
    return this.getStringAttribute('node_password');
  }
  public set nodePassword(value: string) {
    this._nodePassword = value;
  }
  public resetNodePassword() {
    this._nodePassword = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodePasswordInput() {
    return this._nodePassword;
  }

  // node_public_cert_name - computed: false, optional: true, required: false
  private _nodePublicCertName?: string; 
  public get nodePublicCertName() {
    return this.getStringAttribute('node_public_cert_name');
  }
  public set nodePublicCertName(value: string) {
    this._nodePublicCertName = value;
  }
  public resetNodePublicCertName() {
    this._nodePublicCertName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nodePublicCertNameInput() {
    return this._nodePublicCertName;
  }

  // order_id - computed: true, optional: false, required: false
  public get orderId() {
    return this.getStringAttribute('order_id');
  }

  // private_ip_first - computed: true, optional: false, required: false
  public get privateIpFirst() {
    return this.getStringAttribute('private_ip_first');
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

  // remark - computed: true, optional: false, required: false
  public get remark() {
    return this.getStringAttribute('remark');
  }

  // safe_mode - computed: false, optional: false, required: true
  private _safeMode?: number; 
  public get safeMode() {
    return this.getNumberAttribute('safe_mode');
  }
  public set safeMode(value: number) {
    this._safeMode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get safeModeInput() {
    return this._safeMode;
  }

  // security_groups_id - computed: true, optional: false, required: false
  public get securityGroupsId() {
    return this.getStringAttribute('security_groups_id');
  }

  // slave_security_groups_id - computed: true, optional: false, required: false
  public get slaveSecurityGroupsId() {
    return this.getStringAttribute('slave_security_groups_id');
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

  // update_at - computed: true, optional: false, required: false
  public get updateAt() {
    return this.getStringAttribute('update_at');
  }

  // vnc - computed: true, optional: false, required: false
  public get vnc() {
    return this.getStringAttribute('vnc');
  }

  // volume_size - computed: false, optional: false, required: true
  private _volumeSize?: number; 
  public get volumeSize() {
    return this.getNumberAttribute('volume_size');
  }
  public set volumeSize(value: number) {
    this._volumeSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeSizeInput() {
    return this._volumeSize;
  }

  // volume_type - computed: false, optional: false, required: true
  private _volumeType?: string; 
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }
  public set volumeType(value: string) {
    this._volumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeTypeInput() {
    return this._volumeType;
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

  // add_jobs - computed: false, optional: true, required: false
  private _addJobs = new MrsClusterV1AddJobsList(this, "add_jobs", true);
  public get addJobs() {
    return this._addJobs;
  }
  public putAddJobs(value: MrsClusterV1AddJobs[] | cdktf.IResolvable) {
    this._addJobs.internalValue = value;
  }
  public resetAddJobs() {
    this._addJobs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addJobsInput() {
    return this._addJobs.internalValue;
  }

  // component_list - computed: false, optional: false, required: true
  private _componentList = new MrsClusterV1ComponentListStructList(this, "component_list", true);
  public get componentList() {
    return this._componentList;
  }
  public putComponentList(value: MrsClusterV1ComponentListStruct[] | cdktf.IResolvable) {
    this._componentList.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get componentListInput() {
    return this._componentList.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new MrsClusterV1TimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: MrsClusterV1Timeouts) {
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
      available_zone_id: cdktf.stringToTerraform(this._availableZoneId),
      billing_type: cdktf.numberToTerraform(this._billingType),
      cluster_admin_secret: cdktf.stringToTerraform(this._clusterAdminSecret),
      cluster_name: cdktf.stringToTerraform(this._clusterName),
      cluster_type: cdktf.numberToTerraform(this._clusterType),
      cluster_version: cdktf.stringToTerraform(this._clusterVersion),
      core_node_num: cdktf.numberToTerraform(this._coreNodeNum),
      core_node_size: cdktf.stringToTerraform(this._coreNodeSize),
      id: cdktf.stringToTerraform(this._id),
      log_collection: cdktf.numberToTerraform(this._logCollection),
      master_node_num: cdktf.numberToTerraform(this._masterNodeNum),
      master_node_size: cdktf.stringToTerraform(this._masterNodeSize),
      node_password: cdktf.stringToTerraform(this._nodePassword),
      node_public_cert_name: cdktf.stringToTerraform(this._nodePublicCertName),
      region: cdktf.stringToTerraform(this._region),
      safe_mode: cdktf.numberToTerraform(this._safeMode),
      subnet_id: cdktf.stringToTerraform(this._subnetId),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      volume_size: cdktf.numberToTerraform(this._volumeSize),
      volume_type: cdktf.stringToTerraform(this._volumeType),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      add_jobs: cdktf.listMapper(mrsClusterV1AddJobsToTerraform, true)(this._addJobs.internalValue),
      component_list: cdktf.listMapper(mrsClusterV1ComponentListStructToTerraform, true)(this._componentList.internalValue),
      timeouts: mrsClusterV1TimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      available_zone_id: {
        value: cdktf.stringToHclTerraform(this._availableZoneId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      billing_type: {
        value: cdktf.numberToHclTerraform(this._billingType),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      cluster_admin_secret: {
        value: cdktf.stringToHclTerraform(this._clusterAdminSecret),
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
        value: cdktf.numberToHclTerraform(this._clusterType),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      cluster_version: {
        value: cdktf.stringToHclTerraform(this._clusterVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      core_node_num: {
        value: cdktf.numberToHclTerraform(this._coreNodeNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      core_node_size: {
        value: cdktf.stringToHclTerraform(this._coreNodeSize),
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
        value: cdktf.numberToHclTerraform(this._logCollection),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      master_node_num: {
        value: cdktf.numberToHclTerraform(this._masterNodeNum),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      master_node_size: {
        value: cdktf.stringToHclTerraform(this._masterNodeSize),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      node_password: {
        value: cdktf.stringToHclTerraform(this._nodePassword),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      node_public_cert_name: {
        value: cdktf.stringToHclTerraform(this._nodePublicCertName),
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
        value: cdktf.numberToHclTerraform(this._safeMode),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      volume_size: {
        value: cdktf.numberToHclTerraform(this._volumeSize),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      volume_type: {
        value: cdktf.stringToHclTerraform(this._volumeType),
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
      add_jobs: {
        value: cdktf.listMapperHcl(mrsClusterV1AddJobsToHclTerraform, true)(this._addJobs.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "MrsClusterV1AddJobsList",
      },
      component_list: {
        value: cdktf.listMapperHcl(mrsClusterV1ComponentListStructToHclTerraform, true)(this._componentList.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "MrsClusterV1ComponentListStructList",
      },
      timeouts: {
        value: mrsClusterV1TimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "MrsClusterV1Timeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

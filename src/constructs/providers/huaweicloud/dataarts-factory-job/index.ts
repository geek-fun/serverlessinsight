// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataartsFactoryJobConfig extends cdktf.TerraformMetaArguments {
  /**
  * Path of a job in the directory tree.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#directory DataartsFactoryJob#directory}
  */
  readonly directory?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#id DataartsFactoryJob#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The OBS path where job execution logs are stored.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#log_path DataartsFactoryJob#log_path}
  */
  readonly logPath?: string;
  /**
  * Job name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#name DataartsFactoryJob#name}
  */
  readonly name: string;
  /**
  * Job type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#process_type DataartsFactoryJob#process_type}
  */
  readonly processType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#region DataartsFactoryJob#region}
  */
  readonly region?: string;
  /**
  * The workspace ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#workspace_id DataartsFactoryJob#workspace_id}
  */
  readonly workspaceId?: string;
  /**
  * basic_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#basic_config DataartsFactoryJob#basic_config}
  */
  readonly basicConfig?: DataartsFactoryJobBasicConfig;
  /**
  * nodes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#nodes DataartsFactoryJob#nodes}
  */
  readonly nodes: DataartsFactoryJobNodes[] | cdktf.IResolvable;
  /**
  * params block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#params DataartsFactoryJob#params}
  */
  readonly params?: DataartsFactoryJobParams[] | cdktf.IResolvable;
  /**
  * schedule block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#schedule DataartsFactoryJob#schedule}
  */
  readonly schedule: DataartsFactoryJobSchedule;
}
export interface DataartsFactoryJobBasicConfig {
  /**
  * Custom fields.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#custom_fields DataartsFactoryJob#custom_fields}
  */
  readonly customFields?: { [key: string]: string };
  /**
  * Job execution user. The value must be an existing user.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#execute_user DataartsFactoryJob#execute_user}
  */
  readonly executeUser?: string;
  /**
  * Maximum execution time of a job instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#instance_timeout DataartsFactoryJob#instance_timeout}
  */
  readonly instanceTimeout?: number;
  /**
  * Job owner.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#owner DataartsFactoryJob#owner}
  */
  readonly owner?: string;
  /**
  * Job priority.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#priority DataartsFactoryJob#priority}
  */
  readonly priority?: number;
}

export function dataartsFactoryJobBasicConfigToTerraform(struct?: DataartsFactoryJobBasicConfigOutputReference | DataartsFactoryJobBasicConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    custom_fields: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.customFields),
    execute_user: cdktf.stringToTerraform(struct!.executeUser),
    instance_timeout: cdktf.numberToTerraform(struct!.instanceTimeout),
    owner: cdktf.stringToTerraform(struct!.owner),
    priority: cdktf.numberToTerraform(struct!.priority),
  }
}


export function dataartsFactoryJobBasicConfigToHclTerraform(struct?: DataartsFactoryJobBasicConfigOutputReference | DataartsFactoryJobBasicConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    custom_fields: {
      value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(struct!.customFields),
      isBlock: false,
      type: "map",
      storageClassType: "stringMap",
    },
    execute_user: {
      value: cdktf.stringToHclTerraform(struct!.executeUser),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    instance_timeout: {
      value: cdktf.numberToHclTerraform(struct!.instanceTimeout),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    owner: {
      value: cdktf.stringToHclTerraform(struct!.owner),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    priority: {
      value: cdktf.numberToHclTerraform(struct!.priority),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobBasicConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsFactoryJobBasicConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._customFields !== undefined) {
      hasAnyValues = true;
      internalValueResult.customFields = this._customFields;
    }
    if (this._executeUser !== undefined) {
      hasAnyValues = true;
      internalValueResult.executeUser = this._executeUser;
    }
    if (this._instanceTimeout !== undefined) {
      hasAnyValues = true;
      internalValueResult.instanceTimeout = this._instanceTimeout;
    }
    if (this._owner !== undefined) {
      hasAnyValues = true;
      internalValueResult.owner = this._owner;
    }
    if (this._priority !== undefined) {
      hasAnyValues = true;
      internalValueResult.priority = this._priority;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobBasicConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._customFields = undefined;
      this._executeUser = undefined;
      this._instanceTimeout = undefined;
      this._owner = undefined;
      this._priority = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._customFields = value.customFields;
      this._executeUser = value.executeUser;
      this._instanceTimeout = value.instanceTimeout;
      this._owner = value.owner;
      this._priority = value.priority;
    }
  }

  // custom_fields - computed: true, optional: true, required: false
  private _customFields?: { [key: string]: string }; 
  public get customFields() {
    return this.getStringMapAttribute('custom_fields');
  }
  public set customFields(value: { [key: string]: string }) {
    this._customFields = value;
  }
  public resetCustomFields() {
    this._customFields = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customFieldsInput() {
    return this._customFields;
  }

  // execute_user - computed: true, optional: true, required: false
  private _executeUser?: string; 
  public get executeUser() {
    return this.getStringAttribute('execute_user');
  }
  public set executeUser(value: string) {
    this._executeUser = value;
  }
  public resetExecuteUser() {
    this._executeUser = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get executeUserInput() {
    return this._executeUser;
  }

  // instance_timeout - computed: true, optional: true, required: false
  private _instanceTimeout?: number; 
  public get instanceTimeout() {
    return this.getNumberAttribute('instance_timeout');
  }
  public set instanceTimeout(value: number) {
    this._instanceTimeout = value;
  }
  public resetInstanceTimeout() {
    this._instanceTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceTimeoutInput() {
    return this._instanceTimeout;
  }

  // owner - computed: true, optional: true, required: false
  private _owner?: string; 
  public get owner() {
    return this.getStringAttribute('owner');
  }
  public set owner(value: string) {
    this._owner = value;
  }
  public resetOwner() {
    this._owner = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ownerInput() {
    return this._owner;
  }

  // priority - computed: true, optional: true, required: false
  private _priority?: number; 
  public get priority() {
    return this.getNumberAttribute('priority');
  }
  public set priority(value: number) {
    this._priority = value;
  }
  public resetPriority() {
    this._priority = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get priorityInput() {
    return this._priority;
  }
}
export interface DataartsFactoryJobNodesConditions {
  /**
  * EL expression.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#expression DataartsFactoryJob#expression}
  */
  readonly expression: string;
  /**
  * Name of the previous node on which the current node depends.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#pre_node_name DataartsFactoryJob#pre_node_name}
  */
  readonly preNodeName: string;
}

export function dataartsFactoryJobNodesConditionsToTerraform(struct?: DataartsFactoryJobNodesConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    expression: cdktf.stringToTerraform(struct!.expression),
    pre_node_name: cdktf.stringToTerraform(struct!.preNodeName),
  }
}


export function dataartsFactoryJobNodesConditionsToHclTerraform(struct?: DataartsFactoryJobNodesConditions | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    expression: {
      value: cdktf.stringToHclTerraform(struct!.expression),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    pre_node_name: {
      value: cdktf.stringToHclTerraform(struct!.preNodeName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobNodesConditionsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsFactoryJobNodesConditions | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._expression !== undefined) {
      hasAnyValues = true;
      internalValueResult.expression = this._expression;
    }
    if (this._preNodeName !== undefined) {
      hasAnyValues = true;
      internalValueResult.preNodeName = this._preNodeName;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobNodesConditions | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._expression = undefined;
      this._preNodeName = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._expression = value.expression;
      this._preNodeName = value.preNodeName;
    }
  }

  // expression - computed: false, optional: false, required: true
  private _expression?: string; 
  public get expression() {
    return this.getStringAttribute('expression');
  }
  public set expression(value: string) {
    this._expression = value;
  }
  // Temporarily expose input value. Use with caution.
  public get expressionInput() {
    return this._expression;
  }

  // pre_node_name - computed: false, optional: false, required: true
  private _preNodeName?: string; 
  public get preNodeName() {
    return this.getStringAttribute('pre_node_name');
  }
  public set preNodeName(value: string) {
    this._preNodeName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get preNodeNameInput() {
    return this._preNodeName;
  }
}

export class DataartsFactoryJobNodesConditionsList extends cdktf.ComplexList {
  public internalValue? : DataartsFactoryJobNodesConditions[] | cdktf.IResolvable

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
  public get(index: number): DataartsFactoryJobNodesConditionsOutputReference {
    return new DataartsFactoryJobNodesConditionsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsFactoryJobNodesCronTriggerDependJobs {
  /**
  * Dependency job failure policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#depend_fail_policy DataartsFactoryJob#depend_fail_policy}
  */
  readonly dependFailPolicy?: string;
  /**
  * Dependency period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#depend_period DataartsFactoryJob#depend_period}
  */
  readonly dependPeriod?: string;
  /**
  * A list of dependent jobs. Only the existing jobs can be depended on.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#jobs DataartsFactoryJob#jobs}
  */
  readonly jobs: string[];
}

export function dataartsFactoryJobNodesCronTriggerDependJobsToTerraform(struct?: DataartsFactoryJobNodesCronTriggerDependJobsOutputReference | DataartsFactoryJobNodesCronTriggerDependJobs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    depend_fail_policy: cdktf.stringToTerraform(struct!.dependFailPolicy),
    depend_period: cdktf.stringToTerraform(struct!.dependPeriod),
    jobs: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.jobs),
  }
}


export function dataartsFactoryJobNodesCronTriggerDependJobsToHclTerraform(struct?: DataartsFactoryJobNodesCronTriggerDependJobsOutputReference | DataartsFactoryJobNodesCronTriggerDependJobs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    depend_fail_policy: {
      value: cdktf.stringToHclTerraform(struct!.dependFailPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    depend_period: {
      value: cdktf.stringToHclTerraform(struct!.dependPeriod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    jobs: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.jobs),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobNodesCronTriggerDependJobsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsFactoryJobNodesCronTriggerDependJobs | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dependFailPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.dependFailPolicy = this._dependFailPolicy;
    }
    if (this._dependPeriod !== undefined) {
      hasAnyValues = true;
      internalValueResult.dependPeriod = this._dependPeriod;
    }
    if (this._jobs !== undefined) {
      hasAnyValues = true;
      internalValueResult.jobs = this._jobs;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobNodesCronTriggerDependJobs | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._dependFailPolicy = undefined;
      this._dependPeriod = undefined;
      this._jobs = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._dependFailPolicy = value.dependFailPolicy;
      this._dependPeriod = value.dependPeriod;
      this._jobs = value.jobs;
    }
  }

  // depend_fail_policy - computed: true, optional: true, required: false
  private _dependFailPolicy?: string; 
  public get dependFailPolicy() {
    return this.getStringAttribute('depend_fail_policy');
  }
  public set dependFailPolicy(value: string) {
    this._dependFailPolicy = value;
  }
  public resetDependFailPolicy() {
    this._dependFailPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependFailPolicyInput() {
    return this._dependFailPolicy;
  }

  // depend_period - computed: true, optional: true, required: false
  private _dependPeriod?: string; 
  public get dependPeriod() {
    return this.getStringAttribute('depend_period');
  }
  public set dependPeriod(value: string) {
    this._dependPeriod = value;
  }
  public resetDependPeriod() {
    this._dependPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependPeriodInput() {
    return this._dependPeriod;
  }

  // jobs - computed: false, optional: false, required: true
  private _jobs?: string[]; 
  public get jobs() {
    return this.getListAttribute('jobs');
  }
  public set jobs(value: string[]) {
    this._jobs = value;
  }
  // Temporarily expose input value. Use with caution.
  public get jobsInput() {
    return this._jobs;
  }
}
export interface DataartsFactoryJobNodesCronTrigger {
  /**
  * Number of concurrent executions allowed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#concurrent DataartsFactoryJob#concurrent}
  */
  readonly concurrent?: number;
  /**
  * Indicates whether to depend on the execution result of the current
  *                  job's dependent job in the previous scheduling period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#depend_pre_period DataartsFactoryJob#depend_pre_period}
  */
  readonly dependPrePeriod?: boolean | cdktf.IResolvable;
  /**
  * Scheduling end time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#end_time DataartsFactoryJob#end_time}
  */
  readonly endTime?: string;
  /**
  * Cron expression in the format of **<second><minute><hour><day><month><week>**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#expression DataartsFactoryJob#expression}
  */
  readonly expression: string;
  /**
  * Time zone corresponding to the Cron expression.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#expression_time_zone DataartsFactoryJob#expression_time_zone}
  */
  readonly expressionTimeZone?: string;
  /**
  * Job execution interval consisting of a time and time unit.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#period DataartsFactoryJob#period}
  */
  readonly period?: string;
  /**
  * Scheduling start time.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#start_time DataartsFactoryJob#start_time}
  */
  readonly startTime: string;
  /**
  * depend_jobs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#depend_jobs DataartsFactoryJob#depend_jobs}
  */
  readonly dependJobs?: DataartsFactoryJobNodesCronTriggerDependJobs;
}

export function dataartsFactoryJobNodesCronTriggerToTerraform(struct?: DataartsFactoryJobNodesCronTriggerOutputReference | DataartsFactoryJobNodesCronTrigger): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    concurrent: cdktf.numberToTerraform(struct!.concurrent),
    depend_pre_period: cdktf.booleanToTerraform(struct!.dependPrePeriod),
    end_time: cdktf.stringToTerraform(struct!.endTime),
    expression: cdktf.stringToTerraform(struct!.expression),
    expression_time_zone: cdktf.stringToTerraform(struct!.expressionTimeZone),
    period: cdktf.stringToTerraform(struct!.period),
    start_time: cdktf.stringToTerraform(struct!.startTime),
    depend_jobs: dataartsFactoryJobNodesCronTriggerDependJobsToTerraform(struct!.dependJobs),
  }
}


export function dataartsFactoryJobNodesCronTriggerToHclTerraform(struct?: DataartsFactoryJobNodesCronTriggerOutputReference | DataartsFactoryJobNodesCronTrigger): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    concurrent: {
      value: cdktf.numberToHclTerraform(struct!.concurrent),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    depend_pre_period: {
      value: cdktf.booleanToHclTerraform(struct!.dependPrePeriod),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    end_time: {
      value: cdktf.stringToHclTerraform(struct!.endTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    expression: {
      value: cdktf.stringToHclTerraform(struct!.expression),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    expression_time_zone: {
      value: cdktf.stringToHclTerraform(struct!.expressionTimeZone),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    period: {
      value: cdktf.stringToHclTerraform(struct!.period),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    start_time: {
      value: cdktf.stringToHclTerraform(struct!.startTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    depend_jobs: {
      value: dataartsFactoryJobNodesCronTriggerDependJobsToHclTerraform(struct!.dependJobs),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsFactoryJobNodesCronTriggerDependJobsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobNodesCronTriggerOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsFactoryJobNodesCronTrigger | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._concurrent !== undefined) {
      hasAnyValues = true;
      internalValueResult.concurrent = this._concurrent;
    }
    if (this._dependPrePeriod !== undefined) {
      hasAnyValues = true;
      internalValueResult.dependPrePeriod = this._dependPrePeriod;
    }
    if (this._endTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.endTime = this._endTime;
    }
    if (this._expression !== undefined) {
      hasAnyValues = true;
      internalValueResult.expression = this._expression;
    }
    if (this._expressionTimeZone !== undefined) {
      hasAnyValues = true;
      internalValueResult.expressionTimeZone = this._expressionTimeZone;
    }
    if (this._period !== undefined) {
      hasAnyValues = true;
      internalValueResult.period = this._period;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    if (this._dependJobs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.dependJobs = this._dependJobs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobNodesCronTrigger | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._concurrent = undefined;
      this._dependPrePeriod = undefined;
      this._endTime = undefined;
      this._expression = undefined;
      this._expressionTimeZone = undefined;
      this._period = undefined;
      this._startTime = undefined;
      this._dependJobs.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._concurrent = value.concurrent;
      this._dependPrePeriod = value.dependPrePeriod;
      this._endTime = value.endTime;
      this._expression = value.expression;
      this._expressionTimeZone = value.expressionTimeZone;
      this._period = value.period;
      this._startTime = value.startTime;
      this._dependJobs.internalValue = value.dependJobs;
    }
  }

  // concurrent - computed: true, optional: true, required: false
  private _concurrent?: number; 
  public get concurrent() {
    return this.getNumberAttribute('concurrent');
  }
  public set concurrent(value: number) {
    this._concurrent = value;
  }
  public resetConcurrent() {
    this._concurrent = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get concurrentInput() {
    return this._concurrent;
  }

  // depend_pre_period - computed: true, optional: true, required: false
  private _dependPrePeriod?: boolean | cdktf.IResolvable; 
  public get dependPrePeriod() {
    return this.getBooleanAttribute('depend_pre_period');
  }
  public set dependPrePeriod(value: boolean | cdktf.IResolvable) {
    this._dependPrePeriod = value;
  }
  public resetDependPrePeriod() {
    this._dependPrePeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependPrePeriodInput() {
    return this._dependPrePeriod;
  }

  // end_time - computed: true, optional: true, required: false
  private _endTime?: string; 
  public get endTime() {
    return this.getStringAttribute('end_time');
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
  public resetEndTime() {
    this._endTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endTimeInput() {
    return this._endTime;
  }

  // expression - computed: false, optional: false, required: true
  private _expression?: string; 
  public get expression() {
    return this.getStringAttribute('expression');
  }
  public set expression(value: string) {
    this._expression = value;
  }
  // Temporarily expose input value. Use with caution.
  public get expressionInput() {
    return this._expression;
  }

  // expression_time_zone - computed: true, optional: true, required: false
  private _expressionTimeZone?: string; 
  public get expressionTimeZone() {
    return this.getStringAttribute('expression_time_zone');
  }
  public set expressionTimeZone(value: string) {
    this._expressionTimeZone = value;
  }
  public resetExpressionTimeZone() {
    this._expressionTimeZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expressionTimeZoneInput() {
    return this._expressionTimeZone;
  }

  // period - computed: true, optional: true, required: false
  private _period?: string; 
  public get period() {
    return this.getStringAttribute('period');
  }
  public set period(value: string) {
    this._period = value;
  }
  public resetPeriod() {
    this._period = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get periodInput() {
    return this._period;
  }

  // start_time - computed: false, optional: false, required: true
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }

  // depend_jobs - computed: false, optional: true, required: false
  private _dependJobs = new DataartsFactoryJobNodesCronTriggerDependJobsOutputReference(this, "depend_jobs");
  public get dependJobs() {
    return this._dependJobs;
  }
  public putDependJobs(value: DataartsFactoryJobNodesCronTriggerDependJobs) {
    this._dependJobs.internalValue = value;
  }
  public resetDependJobs() {
    this._dependJobs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependJobsInput() {
    return this._dependJobs.internalValue;
  }
}
export interface DataartsFactoryJobNodesEventTrigger {
  /**
  * DIS stream name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#channel DataartsFactoryJob#channel}
  */
  readonly channel: string;
  /**
  * Number of the concurrently scheduled jobs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#concurrent DataartsFactoryJob#concurrent}
  */
  readonly concurrent?: number;
  /**
  * Event type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#event_type DataartsFactoryJob#event_type}
  */
  readonly eventType: string;
  /**
  * Job failure policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#fail_policy DataartsFactoryJob#fail_policy}
  */
  readonly failPolicy?: string;
  /**
  * Access policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#read_policy DataartsFactoryJob#read_policy}
  */
  readonly readPolicy?: string;
}

export function dataartsFactoryJobNodesEventTriggerToTerraform(struct?: DataartsFactoryJobNodesEventTriggerOutputReference | DataartsFactoryJobNodesEventTrigger): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    channel: cdktf.stringToTerraform(struct!.channel),
    concurrent: cdktf.numberToTerraform(struct!.concurrent),
    event_type: cdktf.stringToTerraform(struct!.eventType),
    fail_policy: cdktf.stringToTerraform(struct!.failPolicy),
    read_policy: cdktf.stringToTerraform(struct!.readPolicy),
  }
}


export function dataartsFactoryJobNodesEventTriggerToHclTerraform(struct?: DataartsFactoryJobNodesEventTriggerOutputReference | DataartsFactoryJobNodesEventTrigger): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    channel: {
      value: cdktf.stringToHclTerraform(struct!.channel),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    concurrent: {
      value: cdktf.numberToHclTerraform(struct!.concurrent),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    event_type: {
      value: cdktf.stringToHclTerraform(struct!.eventType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    fail_policy: {
      value: cdktf.stringToHclTerraform(struct!.failPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    read_policy: {
      value: cdktf.stringToHclTerraform(struct!.readPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobNodesEventTriggerOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsFactoryJobNodesEventTrigger | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._channel !== undefined) {
      hasAnyValues = true;
      internalValueResult.channel = this._channel;
    }
    if (this._concurrent !== undefined) {
      hasAnyValues = true;
      internalValueResult.concurrent = this._concurrent;
    }
    if (this._eventType !== undefined) {
      hasAnyValues = true;
      internalValueResult.eventType = this._eventType;
    }
    if (this._failPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.failPolicy = this._failPolicy;
    }
    if (this._readPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.readPolicy = this._readPolicy;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobNodesEventTrigger | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._channel = undefined;
      this._concurrent = undefined;
      this._eventType = undefined;
      this._failPolicy = undefined;
      this._readPolicy = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._channel = value.channel;
      this._concurrent = value.concurrent;
      this._eventType = value.eventType;
      this._failPolicy = value.failPolicy;
      this._readPolicy = value.readPolicy;
    }
  }

  // channel - computed: false, optional: false, required: true
  private _channel?: string; 
  public get channel() {
    return this.getStringAttribute('channel');
  }
  public set channel(value: string) {
    this._channel = value;
  }
  // Temporarily expose input value. Use with caution.
  public get channelInput() {
    return this._channel;
  }

  // concurrent - computed: true, optional: true, required: false
  private _concurrent?: number; 
  public get concurrent() {
    return this.getNumberAttribute('concurrent');
  }
  public set concurrent(value: number) {
    this._concurrent = value;
  }
  public resetConcurrent() {
    this._concurrent = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get concurrentInput() {
    return this._concurrent;
  }

  // event_type - computed: false, optional: false, required: true
  private _eventType?: string; 
  public get eventType() {
    return this.getStringAttribute('event_type');
  }
  public set eventType(value: string) {
    this._eventType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get eventTypeInput() {
    return this._eventType;
  }

  // fail_policy - computed: true, optional: true, required: false
  private _failPolicy?: string; 
  public get failPolicy() {
    return this.getStringAttribute('fail_policy');
  }
  public set failPolicy(value: string) {
    this._failPolicy = value;
  }
  public resetFailPolicy() {
    this._failPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get failPolicyInput() {
    return this._failPolicy;
  }

  // read_policy - computed: true, optional: true, required: false
  private _readPolicy?: string; 
  public get readPolicy() {
    return this.getStringAttribute('read_policy');
  }
  public set readPolicy(value: string) {
    this._readPolicy = value;
  }
  public resetReadPolicy() {
    this._readPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readPolicyInput() {
    return this._readPolicy;
  }
}
export interface DataartsFactoryJobNodesLocation {
  /**
  * Position of the node on the horizontal axis of the job canvas.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#x DataartsFactoryJob#x}
  */
  readonly x: number;
  /**
  * Position of the node on the vertical axis of the job canvas.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#y DataartsFactoryJob#y}
  */
  readonly y: number;
}

export function dataartsFactoryJobNodesLocationToTerraform(struct?: DataartsFactoryJobNodesLocationOutputReference | DataartsFactoryJobNodesLocation): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    x: cdktf.numberToTerraform(struct!.x),
    y: cdktf.numberToTerraform(struct!.y),
  }
}


export function dataartsFactoryJobNodesLocationToHclTerraform(struct?: DataartsFactoryJobNodesLocationOutputReference | DataartsFactoryJobNodesLocation): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    x: {
      value: cdktf.numberToHclTerraform(struct!.x),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    y: {
      value: cdktf.numberToHclTerraform(struct!.y),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobNodesLocationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsFactoryJobNodesLocation | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._x !== undefined) {
      hasAnyValues = true;
      internalValueResult.x = this._x;
    }
    if (this._y !== undefined) {
      hasAnyValues = true;
      internalValueResult.y = this._y;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobNodesLocation | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._x = undefined;
      this._y = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._x = value.x;
      this._y = value.y;
    }
  }

  // x - computed: false, optional: false, required: true
  private _x?: number; 
  public get x() {
    return this.getNumberAttribute('x');
  }
  public set x(value: number) {
    this._x = value;
  }
  // Temporarily expose input value. Use with caution.
  public get xInput() {
    return this._x;
  }

  // y - computed: false, optional: false, required: true
  private _y?: number; 
  public get y() {
    return this.getNumberAttribute('y');
  }
  public set y(value: number) {
    this._y = value;
  }
  // Temporarily expose input value. Use with caution.
  public get yInput() {
    return this._y;
  }
}
export interface DataartsFactoryJobNodesProperties {
  /**
  * Property name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#name DataartsFactoryJob#name}
  */
  readonly name?: string;
  /**
  * Property value.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#value DataartsFactoryJob#value}
  */
  readonly value?: string;
}

export function dataartsFactoryJobNodesPropertiesToTerraform(struct?: DataartsFactoryJobNodesProperties | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function dataartsFactoryJobNodesPropertiesToHclTerraform(struct?: DataartsFactoryJobNodesProperties | cdktf.IResolvable): any {
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

export class DataartsFactoryJobNodesPropertiesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsFactoryJobNodesProperties | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobNodesProperties | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._value = value.value;
    }
  }

  // name - computed: true, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // value - computed: true, optional: true, required: false
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  public resetValue() {
    this._value = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}

export class DataartsFactoryJobNodesPropertiesList extends cdktf.ComplexList {
  public internalValue? : DataartsFactoryJobNodesProperties[] | cdktf.IResolvable

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
  public get(index: number): DataartsFactoryJobNodesPropertiesOutputReference {
    return new DataartsFactoryJobNodesPropertiesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsFactoryJobNodes {
  /**
  * Node failure policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#fail_policy DataartsFactoryJob#fail_policy}
  */
  readonly failPolicy?: string;
  /**
  * Maximum execution time of a node.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#max_execution_time DataartsFactoryJob#max_execution_time}
  */
  readonly maxExecutionTime?: number;
  /**
  * Node name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#name DataartsFactoryJob#name}
  */
  readonly name: string;
  /**
  * Interval at which node running results are checked.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#polling_interval DataartsFactoryJob#polling_interval}
  */
  readonly pollingInterval?: number;
  /**
  * Name of the previous node on which the current node depends.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#pre_node_name DataartsFactoryJob#pre_node_name}
  */
  readonly preNodeName?: string[];
  /**
  * Interval at which a retry is performed upon a failure.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#retry_interval DataartsFactoryJob#retry_interval}
  */
  readonly retryInterval?: number;
  /**
  * Number of the node retries.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#retry_times DataartsFactoryJob#retry_times}
  */
  readonly retryTimes?: number;
  /**
  * Node type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#type DataartsFactoryJob#type}
  */
  readonly type: string;
  /**
  * conditions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#conditions DataartsFactoryJob#conditions}
  */
  readonly conditions?: DataartsFactoryJobNodesConditions[] | cdktf.IResolvable;
  /**
  * cron_trigger block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#cron_trigger DataartsFactoryJob#cron_trigger}
  */
  readonly cronTrigger?: DataartsFactoryJobNodesCronTrigger;
  /**
  * event_trigger block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#event_trigger DataartsFactoryJob#event_trigger}
  */
  readonly eventTrigger?: DataartsFactoryJobNodesEventTrigger;
  /**
  * location block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#location DataartsFactoryJob#location}
  */
  readonly location: DataartsFactoryJobNodesLocation;
  /**
  * properties block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#properties DataartsFactoryJob#properties}
  */
  readonly properties: DataartsFactoryJobNodesProperties[] | cdktf.IResolvable;
}

export function dataartsFactoryJobNodesToTerraform(struct?: DataartsFactoryJobNodes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    fail_policy: cdktf.stringToTerraform(struct!.failPolicy),
    max_execution_time: cdktf.numberToTerraform(struct!.maxExecutionTime),
    name: cdktf.stringToTerraform(struct!.name),
    polling_interval: cdktf.numberToTerraform(struct!.pollingInterval),
    pre_node_name: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.preNodeName),
    retry_interval: cdktf.numberToTerraform(struct!.retryInterval),
    retry_times: cdktf.numberToTerraform(struct!.retryTimes),
    type: cdktf.stringToTerraform(struct!.type),
    conditions: cdktf.listMapper(dataartsFactoryJobNodesConditionsToTerraform, true)(struct!.conditions),
    cron_trigger: dataartsFactoryJobNodesCronTriggerToTerraform(struct!.cronTrigger),
    event_trigger: dataartsFactoryJobNodesEventTriggerToTerraform(struct!.eventTrigger),
    location: dataartsFactoryJobNodesLocationToTerraform(struct!.location),
    properties: cdktf.listMapper(dataartsFactoryJobNodesPropertiesToTerraform, true)(struct!.properties),
  }
}


export function dataartsFactoryJobNodesToHclTerraform(struct?: DataartsFactoryJobNodes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    fail_policy: {
      value: cdktf.stringToHclTerraform(struct!.failPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_execution_time: {
      value: cdktf.numberToHclTerraform(struct!.maxExecutionTime),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    polling_interval: {
      value: cdktf.numberToHclTerraform(struct!.pollingInterval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    pre_node_name: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.preNodeName),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    retry_interval: {
      value: cdktf.numberToHclTerraform(struct!.retryInterval),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    retry_times: {
      value: cdktf.numberToHclTerraform(struct!.retryTimes),
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
    conditions: {
      value: cdktf.listMapperHcl(dataartsFactoryJobNodesConditionsToHclTerraform, true)(struct!.conditions),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsFactoryJobNodesConditionsList",
    },
    cron_trigger: {
      value: dataartsFactoryJobNodesCronTriggerToHclTerraform(struct!.cronTrigger),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsFactoryJobNodesCronTriggerList",
    },
    event_trigger: {
      value: dataartsFactoryJobNodesEventTriggerToHclTerraform(struct!.eventTrigger),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsFactoryJobNodesEventTriggerList",
    },
    location: {
      value: dataartsFactoryJobNodesLocationToHclTerraform(struct!.location),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsFactoryJobNodesLocationList",
    },
    properties: {
      value: cdktf.listMapperHcl(dataartsFactoryJobNodesPropertiesToHclTerraform, true)(struct!.properties),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsFactoryJobNodesPropertiesList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobNodesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsFactoryJobNodes | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._failPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.failPolicy = this._failPolicy;
    }
    if (this._maxExecutionTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxExecutionTime = this._maxExecutionTime;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._pollingInterval !== undefined) {
      hasAnyValues = true;
      internalValueResult.pollingInterval = this._pollingInterval;
    }
    if (this._preNodeName !== undefined) {
      hasAnyValues = true;
      internalValueResult.preNodeName = this._preNodeName;
    }
    if (this._retryInterval !== undefined) {
      hasAnyValues = true;
      internalValueResult.retryInterval = this._retryInterval;
    }
    if (this._retryTimes !== undefined) {
      hasAnyValues = true;
      internalValueResult.retryTimes = this._retryTimes;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._conditions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.conditions = this._conditions?.internalValue;
    }
    if (this._cronTrigger?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.cronTrigger = this._cronTrigger?.internalValue;
    }
    if (this._eventTrigger?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.eventTrigger = this._eventTrigger?.internalValue;
    }
    if (this._location?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.location = this._location?.internalValue;
    }
    if (this._properties?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.properties = this._properties?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobNodes | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._failPolicy = undefined;
      this._maxExecutionTime = undefined;
      this._name = undefined;
      this._pollingInterval = undefined;
      this._preNodeName = undefined;
      this._retryInterval = undefined;
      this._retryTimes = undefined;
      this._type = undefined;
      this._conditions.internalValue = undefined;
      this._cronTrigger.internalValue = undefined;
      this._eventTrigger.internalValue = undefined;
      this._location.internalValue = undefined;
      this._properties.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._failPolicy = value.failPolicy;
      this._maxExecutionTime = value.maxExecutionTime;
      this._name = value.name;
      this._pollingInterval = value.pollingInterval;
      this._preNodeName = value.preNodeName;
      this._retryInterval = value.retryInterval;
      this._retryTimes = value.retryTimes;
      this._type = value.type;
      this._conditions.internalValue = value.conditions;
      this._cronTrigger.internalValue = value.cronTrigger;
      this._eventTrigger.internalValue = value.eventTrigger;
      this._location.internalValue = value.location;
      this._properties.internalValue = value.properties;
    }
  }

  // fail_policy - computed: true, optional: true, required: false
  private _failPolicy?: string; 
  public get failPolicy() {
    return this.getStringAttribute('fail_policy');
  }
  public set failPolicy(value: string) {
    this._failPolicy = value;
  }
  public resetFailPolicy() {
    this._failPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get failPolicyInput() {
    return this._failPolicy;
  }

  // max_execution_time - computed: true, optional: true, required: false
  private _maxExecutionTime?: number; 
  public get maxExecutionTime() {
    return this.getNumberAttribute('max_execution_time');
  }
  public set maxExecutionTime(value: number) {
    this._maxExecutionTime = value;
  }
  public resetMaxExecutionTime() {
    this._maxExecutionTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxExecutionTimeInput() {
    return this._maxExecutionTime;
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

  // polling_interval - computed: true, optional: true, required: false
  private _pollingInterval?: number; 
  public get pollingInterval() {
    return this.getNumberAttribute('polling_interval');
  }
  public set pollingInterval(value: number) {
    this._pollingInterval = value;
  }
  public resetPollingInterval() {
    this._pollingInterval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pollingIntervalInput() {
    return this._pollingInterval;
  }

  // pre_node_name - computed: true, optional: true, required: false
  private _preNodeName?: string[]; 
  public get preNodeName() {
    return this.getListAttribute('pre_node_name');
  }
  public set preNodeName(value: string[]) {
    this._preNodeName = value;
  }
  public resetPreNodeName() {
    this._preNodeName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get preNodeNameInput() {
    return this._preNodeName;
  }

  // retry_interval - computed: true, optional: true, required: false
  private _retryInterval?: number; 
  public get retryInterval() {
    return this.getNumberAttribute('retry_interval');
  }
  public set retryInterval(value: number) {
    this._retryInterval = value;
  }
  public resetRetryInterval() {
    this._retryInterval = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retryIntervalInput() {
    return this._retryInterval;
  }

  // retry_times - computed: true, optional: true, required: false
  private _retryTimes?: number; 
  public get retryTimes() {
    return this.getNumberAttribute('retry_times');
  }
  public set retryTimes(value: number) {
    this._retryTimes = value;
  }
  public resetRetryTimes() {
    this._retryTimes = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retryTimesInput() {
    return this._retryTimes;
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

  // conditions - computed: false, optional: true, required: false
  private _conditions = new DataartsFactoryJobNodesConditionsList(this, "conditions", false);
  public get conditions() {
    return this._conditions;
  }
  public putConditions(value: DataartsFactoryJobNodesConditions[] | cdktf.IResolvable) {
    this._conditions.internalValue = value;
  }
  public resetConditions() {
    this._conditions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get conditionsInput() {
    return this._conditions.internalValue;
  }

  // cron_trigger - computed: false, optional: true, required: false
  private _cronTrigger = new DataartsFactoryJobNodesCronTriggerOutputReference(this, "cron_trigger");
  public get cronTrigger() {
    return this._cronTrigger;
  }
  public putCronTrigger(value: DataartsFactoryJobNodesCronTrigger) {
    this._cronTrigger.internalValue = value;
  }
  public resetCronTrigger() {
    this._cronTrigger.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cronTriggerInput() {
    return this._cronTrigger.internalValue;
  }

  // event_trigger - computed: false, optional: true, required: false
  private _eventTrigger = new DataartsFactoryJobNodesEventTriggerOutputReference(this, "event_trigger");
  public get eventTrigger() {
    return this._eventTrigger;
  }
  public putEventTrigger(value: DataartsFactoryJobNodesEventTrigger) {
    this._eventTrigger.internalValue = value;
  }
  public resetEventTrigger() {
    this._eventTrigger.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eventTriggerInput() {
    return this._eventTrigger.internalValue;
  }

  // location - computed: false, optional: false, required: true
  private _location = new DataartsFactoryJobNodesLocationOutputReference(this, "location");
  public get location() {
    return this._location;
  }
  public putLocation(value: DataartsFactoryJobNodesLocation) {
    this._location.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get locationInput() {
    return this._location.internalValue;
  }

  // properties - computed: false, optional: false, required: true
  private _properties = new DataartsFactoryJobNodesPropertiesList(this, "properties", false);
  public get properties() {
    return this._properties;
  }
  public putProperties(value: DataartsFactoryJobNodesProperties[] | cdktf.IResolvable) {
    this._properties.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get propertiesInput() {
    return this._properties.internalValue;
  }
}

export class DataartsFactoryJobNodesList extends cdktf.ComplexList {
  public internalValue? : DataartsFactoryJobNodes[] | cdktf.IResolvable

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
  public get(index: number): DataartsFactoryJobNodesOutputReference {
    return new DataartsFactoryJobNodesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsFactoryJobParams {
  /**
  * Name of a parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#name DataartsFactoryJob#name}
  */
  readonly name: string;
  /**
  * Parameter type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#type DataartsFactoryJob#type}
  */
  readonly type?: string;
  /**
  * Value of the parameter.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#value DataartsFactoryJob#value}
  */
  readonly value: string;
}

export function dataartsFactoryJobParamsToTerraform(struct?: DataartsFactoryJobParams | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    type: cdktf.stringToTerraform(struct!.type),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function dataartsFactoryJobParamsToHclTerraform(struct?: DataartsFactoryJobParams | cdktf.IResolvable): any {
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
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
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

export class DataartsFactoryJobParamsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataartsFactoryJobParams | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobParams | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._type = undefined;
      this._value = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._type = value.type;
      this._value = value.value;
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

  // type - computed: true, optional: true, required: false
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

export class DataartsFactoryJobParamsList extends cdktf.ComplexList {
  public internalValue? : DataartsFactoryJobParams[] | cdktf.IResolvable

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
  public get(index: number): DataartsFactoryJobParamsOutputReference {
    return new DataartsFactoryJobParamsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataartsFactoryJobScheduleCronDependJobs {
  /**
  * Dependency job failure policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#depend_fail_policy DataartsFactoryJob#depend_fail_policy}
  */
  readonly dependFailPolicy?: string;
  /**
  * Dependency period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#depend_period DataartsFactoryJob#depend_period}
  */
  readonly dependPeriod?: string;
  /**
  * A list of dependent jobs. Only the existing jobs can be depended on.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#jobs DataartsFactoryJob#jobs}
  */
  readonly jobs: string[];
}

export function dataartsFactoryJobScheduleCronDependJobsToTerraform(struct?: DataartsFactoryJobScheduleCronDependJobsOutputReference | DataartsFactoryJobScheduleCronDependJobs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    depend_fail_policy: cdktf.stringToTerraform(struct!.dependFailPolicy),
    depend_period: cdktf.stringToTerraform(struct!.dependPeriod),
    jobs: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.jobs),
  }
}


export function dataartsFactoryJobScheduleCronDependJobsToHclTerraform(struct?: DataartsFactoryJobScheduleCronDependJobsOutputReference | DataartsFactoryJobScheduleCronDependJobs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    depend_fail_policy: {
      value: cdktf.stringToHclTerraform(struct!.dependFailPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    depend_period: {
      value: cdktf.stringToHclTerraform(struct!.dependPeriod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    jobs: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.jobs),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobScheduleCronDependJobsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsFactoryJobScheduleCronDependJobs | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dependFailPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.dependFailPolicy = this._dependFailPolicy;
    }
    if (this._dependPeriod !== undefined) {
      hasAnyValues = true;
      internalValueResult.dependPeriod = this._dependPeriod;
    }
    if (this._jobs !== undefined) {
      hasAnyValues = true;
      internalValueResult.jobs = this._jobs;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobScheduleCronDependJobs | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._dependFailPolicy = undefined;
      this._dependPeriod = undefined;
      this._jobs = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._dependFailPolicy = value.dependFailPolicy;
      this._dependPeriod = value.dependPeriod;
      this._jobs = value.jobs;
    }
  }

  // depend_fail_policy - computed: true, optional: true, required: false
  private _dependFailPolicy?: string; 
  public get dependFailPolicy() {
    return this.getStringAttribute('depend_fail_policy');
  }
  public set dependFailPolicy(value: string) {
    this._dependFailPolicy = value;
  }
  public resetDependFailPolicy() {
    this._dependFailPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependFailPolicyInput() {
    return this._dependFailPolicy;
  }

  // depend_period - computed: true, optional: true, required: false
  private _dependPeriod?: string; 
  public get dependPeriod() {
    return this.getStringAttribute('depend_period');
  }
  public set dependPeriod(value: string) {
    this._dependPeriod = value;
  }
  public resetDependPeriod() {
    this._dependPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependPeriodInput() {
    return this._dependPeriod;
  }

  // jobs - computed: false, optional: false, required: true
  private _jobs?: string[]; 
  public get jobs() {
    return this.getListAttribute('jobs');
  }
  public set jobs(value: string[]) {
    this._jobs = value;
  }
  // Temporarily expose input value. Use with caution.
  public get jobsInput() {
    return this._jobs;
  }
}
export interface DataartsFactoryJobScheduleCron {
  /**
  * Indicates whether to depend on the execution result of 
  *                 the current job's dependent job in the previous scheduling period.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#depend_pre_period DataartsFactoryJob#depend_pre_period}
  */
  readonly dependPrePeriod?: boolean | cdktf.IResolvable;
  /**
  * Scheduling end time in the format of **yyyy-MM-dd'T'HH:mm:ssZ**, 
  *                 which is an ISO 8601 time format.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#end_time DataartsFactoryJob#end_time}
  */
  readonly endTime?: string;
  /**
  * Cron expression in the format of **<second><minute><hour><day><month><week>**.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#expression DataartsFactoryJob#expression}
  */
  readonly expression: string;
  /**
  * Time zone corresponding to the Cron expression.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#expression_time_zone DataartsFactoryJob#expression_time_zone}
  */
  readonly expressionTimeZone?: string;
  /**
  * Scheduling start time in the format of **yyyy-MM-dd'T'HH:mm:ssZ**, 
  *                 which is an ISO 8601 time format.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#start_time DataartsFactoryJob#start_time}
  */
  readonly startTime: string;
  /**
  * depend_jobs block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#depend_jobs DataartsFactoryJob#depend_jobs}
  */
  readonly dependJobs?: DataartsFactoryJobScheduleCronDependJobs;
}

export function dataartsFactoryJobScheduleCronToTerraform(struct?: DataartsFactoryJobScheduleCronOutputReference | DataartsFactoryJobScheduleCron): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    depend_pre_period: cdktf.booleanToTerraform(struct!.dependPrePeriod),
    end_time: cdktf.stringToTerraform(struct!.endTime),
    expression: cdktf.stringToTerraform(struct!.expression),
    expression_time_zone: cdktf.stringToTerraform(struct!.expressionTimeZone),
    start_time: cdktf.stringToTerraform(struct!.startTime),
    depend_jobs: dataartsFactoryJobScheduleCronDependJobsToTerraform(struct!.dependJobs),
  }
}


export function dataartsFactoryJobScheduleCronToHclTerraform(struct?: DataartsFactoryJobScheduleCronOutputReference | DataartsFactoryJobScheduleCron): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    depend_pre_period: {
      value: cdktf.booleanToHclTerraform(struct!.dependPrePeriod),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    end_time: {
      value: cdktf.stringToHclTerraform(struct!.endTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    expression: {
      value: cdktf.stringToHclTerraform(struct!.expression),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    expression_time_zone: {
      value: cdktf.stringToHclTerraform(struct!.expressionTimeZone),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    start_time: {
      value: cdktf.stringToHclTerraform(struct!.startTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    depend_jobs: {
      value: dataartsFactoryJobScheduleCronDependJobsToHclTerraform(struct!.dependJobs),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsFactoryJobScheduleCronDependJobsList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobScheduleCronOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsFactoryJobScheduleCron | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dependPrePeriod !== undefined) {
      hasAnyValues = true;
      internalValueResult.dependPrePeriod = this._dependPrePeriod;
    }
    if (this._endTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.endTime = this._endTime;
    }
    if (this._expression !== undefined) {
      hasAnyValues = true;
      internalValueResult.expression = this._expression;
    }
    if (this._expressionTimeZone !== undefined) {
      hasAnyValues = true;
      internalValueResult.expressionTimeZone = this._expressionTimeZone;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    if (this._dependJobs?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.dependJobs = this._dependJobs?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobScheduleCron | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._dependPrePeriod = undefined;
      this._endTime = undefined;
      this._expression = undefined;
      this._expressionTimeZone = undefined;
      this._startTime = undefined;
      this._dependJobs.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._dependPrePeriod = value.dependPrePeriod;
      this._endTime = value.endTime;
      this._expression = value.expression;
      this._expressionTimeZone = value.expressionTimeZone;
      this._startTime = value.startTime;
      this._dependJobs.internalValue = value.dependJobs;
    }
  }

  // depend_pre_period - computed: true, optional: true, required: false
  private _dependPrePeriod?: boolean | cdktf.IResolvable; 
  public get dependPrePeriod() {
    return this.getBooleanAttribute('depend_pre_period');
  }
  public set dependPrePeriod(value: boolean | cdktf.IResolvable) {
    this._dependPrePeriod = value;
  }
  public resetDependPrePeriod() {
    this._dependPrePeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependPrePeriodInput() {
    return this._dependPrePeriod;
  }

  // end_time - computed: true, optional: true, required: false
  private _endTime?: string; 
  public get endTime() {
    return this.getStringAttribute('end_time');
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
  public resetEndTime() {
    this._endTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endTimeInput() {
    return this._endTime;
  }

  // expression - computed: false, optional: false, required: true
  private _expression?: string; 
  public get expression() {
    return this.getStringAttribute('expression');
  }
  public set expression(value: string) {
    this._expression = value;
  }
  // Temporarily expose input value. Use with caution.
  public get expressionInput() {
    return this._expression;
  }

  // expression_time_zone - computed: true, optional: true, required: false
  private _expressionTimeZone?: string; 
  public get expressionTimeZone() {
    return this.getStringAttribute('expression_time_zone');
  }
  public set expressionTimeZone(value: string) {
    this._expressionTimeZone = value;
  }
  public resetExpressionTimeZone() {
    this._expressionTimeZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expressionTimeZoneInput() {
    return this._expressionTimeZone;
  }

  // start_time - computed: false, optional: false, required: true
  private _startTime?: string; 
  public get startTime() {
    return this.getStringAttribute('start_time');
  }
  public set startTime(value: string) {
    this._startTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get startTimeInput() {
    return this._startTime;
  }

  // depend_jobs - computed: false, optional: true, required: false
  private _dependJobs = new DataartsFactoryJobScheduleCronDependJobsOutputReference(this, "depend_jobs");
  public get dependJobs() {
    return this._dependJobs;
  }
  public putDependJobs(value: DataartsFactoryJobScheduleCronDependJobs) {
    this._dependJobs.internalValue = value;
  }
  public resetDependJobs() {
    this._dependJobs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dependJobsInput() {
    return this._dependJobs.internalValue;
  }
}
export interface DataartsFactoryJobScheduleEvent {
  /**
  * DIS stream name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#channel DataartsFactoryJob#channel}
  */
  readonly channel: string;
  /**
  * Number of the concurrently scheduled jobs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#concurrent DataartsFactoryJob#concurrent}
  */
  readonly concurrent?: number;
  /**
  * Event type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#event_type DataartsFactoryJob#event_type}
  */
  readonly eventType: string;
  /**
  * Job failure policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#fail_policy DataartsFactoryJob#fail_policy}
  */
  readonly failPolicy?: string;
  /**
  * Access policy.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#read_policy DataartsFactoryJob#read_policy}
  */
  readonly readPolicy?: string;
}

export function dataartsFactoryJobScheduleEventToTerraform(struct?: DataartsFactoryJobScheduleEventOutputReference | DataartsFactoryJobScheduleEvent): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    channel: cdktf.stringToTerraform(struct!.channel),
    concurrent: cdktf.numberToTerraform(struct!.concurrent),
    event_type: cdktf.stringToTerraform(struct!.eventType),
    fail_policy: cdktf.stringToTerraform(struct!.failPolicy),
    read_policy: cdktf.stringToTerraform(struct!.readPolicy),
  }
}


export function dataartsFactoryJobScheduleEventToHclTerraform(struct?: DataartsFactoryJobScheduleEventOutputReference | DataartsFactoryJobScheduleEvent): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    channel: {
      value: cdktf.stringToHclTerraform(struct!.channel),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    concurrent: {
      value: cdktf.numberToHclTerraform(struct!.concurrent),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    event_type: {
      value: cdktf.stringToHclTerraform(struct!.eventType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    fail_policy: {
      value: cdktf.stringToHclTerraform(struct!.failPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    read_policy: {
      value: cdktf.stringToHclTerraform(struct!.readPolicy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobScheduleEventOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsFactoryJobScheduleEvent | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._channel !== undefined) {
      hasAnyValues = true;
      internalValueResult.channel = this._channel;
    }
    if (this._concurrent !== undefined) {
      hasAnyValues = true;
      internalValueResult.concurrent = this._concurrent;
    }
    if (this._eventType !== undefined) {
      hasAnyValues = true;
      internalValueResult.eventType = this._eventType;
    }
    if (this._failPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.failPolicy = this._failPolicy;
    }
    if (this._readPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.readPolicy = this._readPolicy;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobScheduleEvent | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._channel = undefined;
      this._concurrent = undefined;
      this._eventType = undefined;
      this._failPolicy = undefined;
      this._readPolicy = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._channel = value.channel;
      this._concurrent = value.concurrent;
      this._eventType = value.eventType;
      this._failPolicy = value.failPolicy;
      this._readPolicy = value.readPolicy;
    }
  }

  // channel - computed: false, optional: false, required: true
  private _channel?: string; 
  public get channel() {
    return this.getStringAttribute('channel');
  }
  public set channel(value: string) {
    this._channel = value;
  }
  // Temporarily expose input value. Use with caution.
  public get channelInput() {
    return this._channel;
  }

  // concurrent - computed: true, optional: true, required: false
  private _concurrent?: number; 
  public get concurrent() {
    return this.getNumberAttribute('concurrent');
  }
  public set concurrent(value: number) {
    this._concurrent = value;
  }
  public resetConcurrent() {
    this._concurrent = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get concurrentInput() {
    return this._concurrent;
  }

  // event_type - computed: false, optional: false, required: true
  private _eventType?: string; 
  public get eventType() {
    return this.getStringAttribute('event_type');
  }
  public set eventType(value: string) {
    this._eventType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get eventTypeInput() {
    return this._eventType;
  }

  // fail_policy - computed: true, optional: true, required: false
  private _failPolicy?: string; 
  public get failPolicy() {
    return this.getStringAttribute('fail_policy');
  }
  public set failPolicy(value: string) {
    this._failPolicy = value;
  }
  public resetFailPolicy() {
    this._failPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get failPolicyInput() {
    return this._failPolicy;
  }

  // read_policy - computed: true, optional: true, required: false
  private _readPolicy?: string; 
  public get readPolicy() {
    return this.getStringAttribute('read_policy');
  }
  public set readPolicy(value: string) {
    this._readPolicy = value;
  }
  public resetReadPolicy() {
    this._readPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readPolicyInput() {
    return this._readPolicy;
  }
}
export interface DataartsFactoryJobSchedule {
  /**
  * Scheduling type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#type DataartsFactoryJob#type}
  */
  readonly type: string;
  /**
  * cron block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#cron DataartsFactoryJob#cron}
  */
  readonly cron?: DataartsFactoryJobScheduleCron;
  /**
  * event block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#event DataartsFactoryJob#event}
  */
  readonly event?: DataartsFactoryJobScheduleEvent;
}

export function dataartsFactoryJobScheduleToTerraform(struct?: DataartsFactoryJobScheduleOutputReference | DataartsFactoryJobSchedule): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    cron: dataartsFactoryJobScheduleCronToTerraform(struct!.cron),
    event: dataartsFactoryJobScheduleEventToTerraform(struct!.event),
  }
}


export function dataartsFactoryJobScheduleToHclTerraform(struct?: DataartsFactoryJobScheduleOutputReference | DataartsFactoryJobSchedule): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    cron: {
      value: dataartsFactoryJobScheduleCronToHclTerraform(struct!.cron),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsFactoryJobScheduleCronList",
    },
    event: {
      value: dataartsFactoryJobScheduleEventToHclTerraform(struct!.event),
      isBlock: true,
      type: "list",
      storageClassType: "DataartsFactoryJobScheduleEventList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataartsFactoryJobScheduleOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DataartsFactoryJobSchedule | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._cron?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.cron = this._cron?.internalValue;
    }
    if (this._event?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.event = this._event?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataartsFactoryJobSchedule | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._type = undefined;
      this._cron.internalValue = undefined;
      this._event.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._type = value.type;
      this._cron.internalValue = value.cron;
      this._event.internalValue = value.event;
    }
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

  // cron - computed: false, optional: true, required: false
  private _cron = new DataartsFactoryJobScheduleCronOutputReference(this, "cron");
  public get cron() {
    return this._cron;
  }
  public putCron(value: DataartsFactoryJobScheduleCron) {
    this._cron.internalValue = value;
  }
  public resetCron() {
    this._cron.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cronInput() {
    return this._cron.internalValue;
  }

  // event - computed: false, optional: true, required: false
  private _event = new DataartsFactoryJobScheduleEventOutputReference(this, "event");
  public get event() {
    return this._event;
  }
  public putEvent(value: DataartsFactoryJobScheduleEvent) {
    this._event.internalValue = value;
  }
  public resetEvent() {
    this._event.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eventInput() {
    return this._event.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job huaweicloud_dataarts_factory_job}
*/
export class DataartsFactoryJob extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dataarts_factory_job";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataartsFactoryJob resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataartsFactoryJob to import
  * @param importFromId The id of the existing DataartsFactoryJob that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataartsFactoryJob to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dataarts_factory_job", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dataarts_factory_job huaweicloud_dataarts_factory_job} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataartsFactoryJobConfig
  */
  public constructor(scope: Construct, id: string, config: DataartsFactoryJobConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dataarts_factory_job',
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
    this._directory = config.directory;
    this._id = config.id;
    this._logPath = config.logPath;
    this._name = config.name;
    this._processType = config.processType;
    this._region = config.region;
    this._workspaceId = config.workspaceId;
    this._basicConfig.internalValue = config.basicConfig;
    this._nodes.internalValue = config.nodes;
    this._params.internalValue = config.params;
    this._schedule.internalValue = config.schedule;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // directory - computed: true, optional: true, required: false
  private _directory?: string; 
  public get directory() {
    return this.getStringAttribute('directory');
  }
  public set directory(value: string) {
    this._directory = value;
  }
  public resetDirectory() {
    this._directory = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get directoryInput() {
    return this._directory;
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

  // log_path - computed: true, optional: true, required: false
  private _logPath?: string; 
  public get logPath() {
    return this.getStringAttribute('log_path');
  }
  public set logPath(value: string) {
    this._logPath = value;
  }
  public resetLogPath() {
    this._logPath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get logPathInput() {
    return this._logPath;
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

  // process_type - computed: false, optional: false, required: true
  private _processType?: string; 
  public get processType() {
    return this.getStringAttribute('process_type');
  }
  public set processType(value: string) {
    this._processType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get processTypeInput() {
    return this._processType;
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

  // workspace_id - computed: true, optional: true, required: false
  private _workspaceId?: string; 
  public get workspaceId() {
    return this.getStringAttribute('workspace_id');
  }
  public set workspaceId(value: string) {
    this._workspaceId = value;
  }
  public resetWorkspaceId() {
    this._workspaceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get workspaceIdInput() {
    return this._workspaceId;
  }

  // basic_config - computed: false, optional: true, required: false
  private _basicConfig = new DataartsFactoryJobBasicConfigOutputReference(this, "basic_config");
  public get basicConfig() {
    return this._basicConfig;
  }
  public putBasicConfig(value: DataartsFactoryJobBasicConfig) {
    this._basicConfig.internalValue = value;
  }
  public resetBasicConfig() {
    this._basicConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get basicConfigInput() {
    return this._basicConfig.internalValue;
  }

  // nodes - computed: false, optional: false, required: true
  private _nodes = new DataartsFactoryJobNodesList(this, "nodes", false);
  public get nodes() {
    return this._nodes;
  }
  public putNodes(value: DataartsFactoryJobNodes[] | cdktf.IResolvable) {
    this._nodes.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodesInput() {
    return this._nodes.internalValue;
  }

  // params - computed: false, optional: true, required: false
  private _params = new DataartsFactoryJobParamsList(this, "params", false);
  public get params() {
    return this._params;
  }
  public putParams(value: DataartsFactoryJobParams[] | cdktf.IResolvable) {
    this._params.internalValue = value;
  }
  public resetParams() {
    this._params.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get paramsInput() {
    return this._params.internalValue;
  }

  // schedule - computed: false, optional: false, required: true
  private _schedule = new DataartsFactoryJobScheduleOutputReference(this, "schedule");
  public get schedule() {
    return this._schedule;
  }
  public putSchedule(value: DataartsFactoryJobSchedule) {
    this._schedule.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scheduleInput() {
    return this._schedule.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      directory: cdktf.stringToTerraform(this._directory),
      id: cdktf.stringToTerraform(this._id),
      log_path: cdktf.stringToTerraform(this._logPath),
      name: cdktf.stringToTerraform(this._name),
      process_type: cdktf.stringToTerraform(this._processType),
      region: cdktf.stringToTerraform(this._region),
      workspace_id: cdktf.stringToTerraform(this._workspaceId),
      basic_config: dataartsFactoryJobBasicConfigToTerraform(this._basicConfig.internalValue),
      nodes: cdktf.listMapper(dataartsFactoryJobNodesToTerraform, true)(this._nodes.internalValue),
      params: cdktf.listMapper(dataartsFactoryJobParamsToTerraform, true)(this._params.internalValue),
      schedule: dataartsFactoryJobScheduleToTerraform(this._schedule.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      directory: {
        value: cdktf.stringToHclTerraform(this._directory),
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
      log_path: {
        value: cdktf.stringToHclTerraform(this._logPath),
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
      process_type: {
        value: cdktf.stringToHclTerraform(this._processType),
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
      workspace_id: {
        value: cdktf.stringToHclTerraform(this._workspaceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      basic_config: {
        value: dataartsFactoryJobBasicConfigToHclTerraform(this._basicConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataartsFactoryJobBasicConfigList",
      },
      nodes: {
        value: cdktf.listMapperHcl(dataartsFactoryJobNodesToHclTerraform, true)(this._nodes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataartsFactoryJobNodesList",
      },
      params: {
        value: cdktf.listMapperHcl(dataartsFactoryJobParamsToHclTerraform, true)(this._params.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataartsFactoryJobParamsList",
      },
      schedule: {
        value: dataartsFactoryJobScheduleToHclTerraform(this._schedule.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DataartsFactoryJobScheduleList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MapreduceScalingPolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Whether to enable the auto scaling rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#auto_scaling_enable MapreduceScalingPolicy#auto_scaling_enable}
  */
  readonly autoScalingEnable: boolean | cdktf.IResolvable;
  /**
  * The MRS cluster ID to which the auto scaling policy applies.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#cluster_id MapreduceScalingPolicy#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#id MapreduceScalingPolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Maximum number of nodes in the node group. Value range: 0 to 500.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#max_capacity MapreduceScalingPolicy#max_capacity}
  */
  readonly maxCapacity: number;
  /**
  * Minimum number of nodes in the node group. Value range: 0 to 500.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#min_capacity MapreduceScalingPolicy#min_capacity}
  */
  readonly minCapacity: number;
  /**
  * Name of the node to which an auto scaling rule applies.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#node_group MapreduceScalingPolicy#node_group}
  */
  readonly nodeGroup: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#region MapreduceScalingPolicy#region}
  */
  readonly region?: string;
  /**
  * exec_scripts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#exec_scripts MapreduceScalingPolicy#exec_scripts}
  */
  readonly execScripts?: MapreduceScalingPolicyExecScripts[] | cdktf.IResolvable;
  /**
  * resources_plans block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#resources_plans MapreduceScalingPolicy#resources_plans}
  */
  readonly resourcesPlans?: MapreduceScalingPolicyResourcesPlans[] | cdktf.IResolvable;
  /**
  * rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#rules MapreduceScalingPolicy#rules}
  */
  readonly rules?: MapreduceScalingPolicyRules[] | cdktf.IResolvable;
}
export interface MapreduceScalingPolicyExecScripts {
  /**
  * Time when a script is executed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#action_stage MapreduceScalingPolicy#action_stage}
  */
  readonly actionStage: string;
  /**
  * Whether the custom automation script runs only on the active Master node.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#active_master MapreduceScalingPolicy#active_master}
  */
  readonly activeMaster?: boolean | cdktf.IResolvable;
  /**
  * Whether to continue to execute subsequent scripts and create a cluster after
  * 					 the custom automation script fails to be executed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#fail_action MapreduceScalingPolicy#fail_action}
  */
  readonly failAction: string;
  /**
  * Name of a custom automation script.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#name MapreduceScalingPolicy#name}
  */
  readonly name: string;
  /**
  * Type of a node where the custom automation script is executed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#nodes MapreduceScalingPolicy#nodes}
  */
  readonly nodes: string[];
  /**
  * Parameters of a custom automation script.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#parameters MapreduceScalingPolicy#parameters}
  */
  readonly parameters?: string;
  /**
  * Path of a custom automation script.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#uri MapreduceScalingPolicy#uri}
  */
  readonly uri: string;
}

export function mapreduceScalingPolicyExecScriptsToTerraform(struct?: MapreduceScalingPolicyExecScripts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    action_stage: cdktf.stringToTerraform(struct!.actionStage),
    active_master: cdktf.booleanToTerraform(struct!.activeMaster),
    fail_action: cdktf.stringToTerraform(struct!.failAction),
    name: cdktf.stringToTerraform(struct!.name),
    nodes: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.nodes),
    parameters: cdktf.stringToTerraform(struct!.parameters),
    uri: cdktf.stringToTerraform(struct!.uri),
  }
}


export function mapreduceScalingPolicyExecScriptsToHclTerraform(struct?: MapreduceScalingPolicyExecScripts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    action_stage: {
      value: cdktf.stringToHclTerraform(struct!.actionStage),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    active_master: {
      value: cdktf.booleanToHclTerraform(struct!.activeMaster),
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

export class MapreduceScalingPolicyExecScriptsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MapreduceScalingPolicyExecScripts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._actionStage !== undefined) {
      hasAnyValues = true;
      internalValueResult.actionStage = this._actionStage;
    }
    if (this._activeMaster !== undefined) {
      hasAnyValues = true;
      internalValueResult.activeMaster = this._activeMaster;
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

  public set internalValue(value: MapreduceScalingPolicyExecScripts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._actionStage = undefined;
      this._activeMaster = undefined;
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
      this._actionStage = value.actionStage;
      this._activeMaster = value.activeMaster;
      this._failAction = value.failAction;
      this._name = value.name;
      this._nodes = value.nodes;
      this._parameters = value.parameters;
      this._uri = value.uri;
    }
  }

  // action_stage - computed: false, optional: false, required: true
  private _actionStage?: string; 
  public get actionStage() {
    return this.getStringAttribute('action_stage');
  }
  public set actionStage(value: string) {
    this._actionStage = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionStageInput() {
    return this._actionStage;
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

  // parameters - computed: true, optional: true, required: false
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

export class MapreduceScalingPolicyExecScriptsList extends cdktf.ComplexList {
  public internalValue? : MapreduceScalingPolicyExecScripts[] | cdktf.IResolvable

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
  public get(index: number): MapreduceScalingPolicyExecScriptsOutputReference {
    return new MapreduceScalingPolicyExecScriptsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MapreduceScalingPolicyResourcesPlans {
  /**
  * End time of a resource plan.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#end_time MapreduceScalingPolicy#end_time}
  */
  readonly endTime: string;
  /**
  * Maximum number of the preserved nodes in a node group in a resource plan. Value range: 0 to 500.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#max_capacity MapreduceScalingPolicy#max_capacity}
  */
  readonly maxCapacity: number;
  /**
  * Minimum number of the preserved nodes in a node group in a resource plan. Value range: 0 to 500.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#min_capacity MapreduceScalingPolicy#min_capacity}
  */
  readonly minCapacity: number;
  /**
  * Cycle type of a resource plan.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#period_type MapreduceScalingPolicy#period_type}
  */
  readonly periodType: string;
  /**
  * The start time of a resource plan.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#start_time MapreduceScalingPolicy#start_time}
  */
  readonly startTime: string;
}

export function mapreduceScalingPolicyResourcesPlansToTerraform(struct?: MapreduceScalingPolicyResourcesPlans | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    end_time: cdktf.stringToTerraform(struct!.endTime),
    max_capacity: cdktf.numberToTerraform(struct!.maxCapacity),
    min_capacity: cdktf.numberToTerraform(struct!.minCapacity),
    period_type: cdktf.stringToTerraform(struct!.periodType),
    start_time: cdktf.stringToTerraform(struct!.startTime),
  }
}


export function mapreduceScalingPolicyResourcesPlansToHclTerraform(struct?: MapreduceScalingPolicyResourcesPlans | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    end_time: {
      value: cdktf.stringToHclTerraform(struct!.endTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_capacity: {
      value: cdktf.numberToHclTerraform(struct!.maxCapacity),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    min_capacity: {
      value: cdktf.numberToHclTerraform(struct!.minCapacity),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    period_type: {
      value: cdktf.stringToHclTerraform(struct!.periodType),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceScalingPolicyResourcesPlansOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MapreduceScalingPolicyResourcesPlans | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._endTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.endTime = this._endTime;
    }
    if (this._maxCapacity !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxCapacity = this._maxCapacity;
    }
    if (this._minCapacity !== undefined) {
      hasAnyValues = true;
      internalValueResult.minCapacity = this._minCapacity;
    }
    if (this._periodType !== undefined) {
      hasAnyValues = true;
      internalValueResult.periodType = this._periodType;
    }
    if (this._startTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.startTime = this._startTime;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceScalingPolicyResourcesPlans | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._endTime = undefined;
      this._maxCapacity = undefined;
      this._minCapacity = undefined;
      this._periodType = undefined;
      this._startTime = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._endTime = value.endTime;
      this._maxCapacity = value.maxCapacity;
      this._minCapacity = value.minCapacity;
      this._periodType = value.periodType;
      this._startTime = value.startTime;
    }
  }

  // end_time - computed: false, optional: false, required: true
  private _endTime?: string; 
  public get endTime() {
    return this.getStringAttribute('end_time');
  }
  public set endTime(value: string) {
    this._endTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get endTimeInput() {
    return this._endTime;
  }

  // max_capacity - computed: false, optional: false, required: true
  private _maxCapacity?: number; 
  public get maxCapacity() {
    return this.getNumberAttribute('max_capacity');
  }
  public set maxCapacity(value: number) {
    this._maxCapacity = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maxCapacityInput() {
    return this._maxCapacity;
  }

  // min_capacity - computed: false, optional: false, required: true
  private _minCapacity?: number; 
  public get minCapacity() {
    return this.getNumberAttribute('min_capacity');
  }
  public set minCapacity(value: number) {
    this._minCapacity = value;
  }
  // Temporarily expose input value. Use with caution.
  public get minCapacityInput() {
    return this._minCapacity;
  }

  // period_type - computed: false, optional: false, required: true
  private _periodType?: string; 
  public get periodType() {
    return this.getStringAttribute('period_type');
  }
  public set periodType(value: string) {
    this._periodType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get periodTypeInput() {
    return this._periodType;
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
}

export class MapreduceScalingPolicyResourcesPlansList extends cdktf.ComplexList {
  public internalValue? : MapreduceScalingPolicyResourcesPlans[] | cdktf.IResolvable

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
  public get(index: number): MapreduceScalingPolicyResourcesPlansOutputReference {
    return new MapreduceScalingPolicyResourcesPlansOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MapreduceScalingPolicyRulesTrigger {
  /**
  * Metric judgment logic operator.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#comparison_operator MapreduceScalingPolicy#comparison_operator}
  */
  readonly comparisonOperator?: string;
  /**
  * Number of consecutive five-minute periods, during which a metric threshold is reached.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#evaluation_periods MapreduceScalingPolicy#evaluation_periods}
  */
  readonly evaluationPeriods: number;
  /**
  * Metric name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#metric_name MapreduceScalingPolicy#metric_name}
  */
  readonly metricName: string;
  /**
  * Metric threshold to trigger a rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#metric_value MapreduceScalingPolicy#metric_value}
  */
  readonly metricValue: string;
}

export function mapreduceScalingPolicyRulesTriggerToTerraform(struct?: MapreduceScalingPolicyRulesTriggerOutputReference | MapreduceScalingPolicyRulesTrigger): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    comparison_operator: cdktf.stringToTerraform(struct!.comparisonOperator),
    evaluation_periods: cdktf.numberToTerraform(struct!.evaluationPeriods),
    metric_name: cdktf.stringToTerraform(struct!.metricName),
    metric_value: cdktf.stringToTerraform(struct!.metricValue),
  }
}


export function mapreduceScalingPolicyRulesTriggerToHclTerraform(struct?: MapreduceScalingPolicyRulesTriggerOutputReference | MapreduceScalingPolicyRulesTrigger): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    comparison_operator: {
      value: cdktf.stringToHclTerraform(struct!.comparisonOperator),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    evaluation_periods: {
      value: cdktf.numberToHclTerraform(struct!.evaluationPeriods),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    metric_name: {
      value: cdktf.stringToHclTerraform(struct!.metricName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    metric_value: {
      value: cdktf.stringToHclTerraform(struct!.metricValue),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceScalingPolicyRulesTriggerOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MapreduceScalingPolicyRulesTrigger | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._comparisonOperator !== undefined) {
      hasAnyValues = true;
      internalValueResult.comparisonOperator = this._comparisonOperator;
    }
    if (this._evaluationPeriods !== undefined) {
      hasAnyValues = true;
      internalValueResult.evaluationPeriods = this._evaluationPeriods;
    }
    if (this._metricName !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricName = this._metricName;
    }
    if (this._metricValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.metricValue = this._metricValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceScalingPolicyRulesTrigger | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._comparisonOperator = undefined;
      this._evaluationPeriods = undefined;
      this._metricName = undefined;
      this._metricValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._comparisonOperator = value.comparisonOperator;
      this._evaluationPeriods = value.evaluationPeriods;
      this._metricName = value.metricName;
      this._metricValue = value.metricValue;
    }
  }

  // comparison_operator - computed: true, optional: true, required: false
  private _comparisonOperator?: string; 
  public get comparisonOperator() {
    return this.getStringAttribute('comparison_operator');
  }
  public set comparisonOperator(value: string) {
    this._comparisonOperator = value;
  }
  public resetComparisonOperator() {
    this._comparisonOperator = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get comparisonOperatorInput() {
    return this._comparisonOperator;
  }

  // evaluation_periods - computed: false, optional: false, required: true
  private _evaluationPeriods?: number; 
  public get evaluationPeriods() {
    return this.getNumberAttribute('evaluation_periods');
  }
  public set evaluationPeriods(value: number) {
    this._evaluationPeriods = value;
  }
  // Temporarily expose input value. Use with caution.
  public get evaluationPeriodsInput() {
    return this._evaluationPeriods;
  }

  // metric_name - computed: false, optional: false, required: true
  private _metricName?: string; 
  public get metricName() {
    return this.getStringAttribute('metric_name');
  }
  public set metricName(value: string) {
    this._metricName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get metricNameInput() {
    return this._metricName;
  }

  // metric_value - computed: false, optional: false, required: true
  private _metricValue?: string; 
  public get metricValue() {
    return this.getStringAttribute('metric_value');
  }
  public set metricValue(value: string) {
    this._metricValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get metricValueInput() {
    return this._metricValue;
  }
}
export interface MapreduceScalingPolicyRules {
  /**
  * Auto scaling rule adjustment type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#adjustment_type MapreduceScalingPolicy#adjustment_type}
  */
  readonly adjustmentType: string;
  /**
  * Cluster cooling time after an auto scaling rule is triggered, when no auto scaling 
  * 					operation is performed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#cool_down_minutes MapreduceScalingPolicy#cool_down_minutes}
  */
  readonly coolDownMinutes: number;
  /**
  * Description about an auto scaling rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#description MapreduceScalingPolicy#description}
  */
  readonly description?: string;
  /**
  * Name of an auto scaling rule.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#name MapreduceScalingPolicy#name}
  */
  readonly name: string;
  /**
  * Number of nodes that can be adjusted once. Value range: 1 to 100.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#scaling_adjustment MapreduceScalingPolicy#scaling_adjustment}
  */
  readonly scalingAdjustment: number;
  /**
  * trigger block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#trigger MapreduceScalingPolicy#trigger}
  */
  readonly trigger: MapreduceScalingPolicyRulesTrigger;
}

export function mapreduceScalingPolicyRulesToTerraform(struct?: MapreduceScalingPolicyRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    adjustment_type: cdktf.stringToTerraform(struct!.adjustmentType),
    cool_down_minutes: cdktf.numberToTerraform(struct!.coolDownMinutes),
    description: cdktf.stringToTerraform(struct!.description),
    name: cdktf.stringToTerraform(struct!.name),
    scaling_adjustment: cdktf.numberToTerraform(struct!.scalingAdjustment),
    trigger: mapreduceScalingPolicyRulesTriggerToTerraform(struct!.trigger),
  }
}


export function mapreduceScalingPolicyRulesToHclTerraform(struct?: MapreduceScalingPolicyRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    adjustment_type: {
      value: cdktf.stringToHclTerraform(struct!.adjustmentType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    cool_down_minutes: {
      value: cdktf.numberToHclTerraform(struct!.coolDownMinutes),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
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
    scaling_adjustment: {
      value: cdktf.numberToHclTerraform(struct!.scalingAdjustment),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    trigger: {
      value: mapreduceScalingPolicyRulesTriggerToHclTerraform(struct!.trigger),
      isBlock: true,
      type: "list",
      storageClassType: "MapreduceScalingPolicyRulesTriggerList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MapreduceScalingPolicyRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): MapreduceScalingPolicyRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._adjustmentType !== undefined) {
      hasAnyValues = true;
      internalValueResult.adjustmentType = this._adjustmentType;
    }
    if (this._coolDownMinutes !== undefined) {
      hasAnyValues = true;
      internalValueResult.coolDownMinutes = this._coolDownMinutes;
    }
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._scalingAdjustment !== undefined) {
      hasAnyValues = true;
      internalValueResult.scalingAdjustment = this._scalingAdjustment;
    }
    if (this._trigger?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.trigger = this._trigger?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MapreduceScalingPolicyRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._adjustmentType = undefined;
      this._coolDownMinutes = undefined;
      this._description = undefined;
      this._name = undefined;
      this._scalingAdjustment = undefined;
      this._trigger.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._adjustmentType = value.adjustmentType;
      this._coolDownMinutes = value.coolDownMinutes;
      this._description = value.description;
      this._name = value.name;
      this._scalingAdjustment = value.scalingAdjustment;
      this._trigger.internalValue = value.trigger;
    }
  }

  // adjustment_type - computed: false, optional: false, required: true
  private _adjustmentType?: string; 
  public get adjustmentType() {
    return this.getStringAttribute('adjustment_type');
  }
  public set adjustmentType(value: string) {
    this._adjustmentType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get adjustmentTypeInput() {
    return this._adjustmentType;
  }

  // cool_down_minutes - computed: false, optional: false, required: true
  private _coolDownMinutes?: number; 
  public get coolDownMinutes() {
    return this.getNumberAttribute('cool_down_minutes');
  }
  public set coolDownMinutes(value: number) {
    this._coolDownMinutes = value;
  }
  // Temporarily expose input value. Use with caution.
  public get coolDownMinutesInput() {
    return this._coolDownMinutes;
  }

  // description - computed: true, optional: true, required: false
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

  // scaling_adjustment - computed: false, optional: false, required: true
  private _scalingAdjustment?: number; 
  public get scalingAdjustment() {
    return this.getNumberAttribute('scaling_adjustment');
  }
  public set scalingAdjustment(value: number) {
    this._scalingAdjustment = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingAdjustmentInput() {
    return this._scalingAdjustment;
  }

  // trigger - computed: false, optional: false, required: true
  private _trigger = new MapreduceScalingPolicyRulesTriggerOutputReference(this, "trigger");
  public get trigger() {
    return this._trigger;
  }
  public putTrigger(value: MapreduceScalingPolicyRulesTrigger) {
    this._trigger.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get triggerInput() {
    return this._trigger.internalValue;
  }
}

export class MapreduceScalingPolicyRulesList extends cdktf.ComplexList {
  public internalValue? : MapreduceScalingPolicyRules[] | cdktf.IResolvable

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
  public get(index: number): MapreduceScalingPolicyRulesOutputReference {
    return new MapreduceScalingPolicyRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy huaweicloud_mapreduce_scaling_policy}
*/
export class MapreduceScalingPolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_mapreduce_scaling_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a MapreduceScalingPolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the MapreduceScalingPolicy to import
  * @param importFromId The id of the existing MapreduceScalingPolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the MapreduceScalingPolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_mapreduce_scaling_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/mapreduce_scaling_policy huaweicloud_mapreduce_scaling_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MapreduceScalingPolicyConfig
  */
  public constructor(scope: Construct, id: string, config: MapreduceScalingPolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_mapreduce_scaling_policy',
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
    this._autoScalingEnable = config.autoScalingEnable;
    this._clusterId = config.clusterId;
    this._id = config.id;
    this._maxCapacity = config.maxCapacity;
    this._minCapacity = config.minCapacity;
    this._nodeGroup = config.nodeGroup;
    this._region = config.region;
    this._execScripts.internalValue = config.execScripts;
    this._resourcesPlans.internalValue = config.resourcesPlans;
    this._rules.internalValue = config.rules;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // auto_scaling_enable - computed: false, optional: false, required: true
  private _autoScalingEnable?: boolean | cdktf.IResolvable; 
  public get autoScalingEnable() {
    return this.getBooleanAttribute('auto_scaling_enable');
  }
  public set autoScalingEnable(value: boolean | cdktf.IResolvable) {
    this._autoScalingEnable = value;
  }
  // Temporarily expose input value. Use with caution.
  public get autoScalingEnableInput() {
    return this._autoScalingEnable;
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

  // max_capacity - computed: false, optional: false, required: true
  private _maxCapacity?: number; 
  public get maxCapacity() {
    return this.getNumberAttribute('max_capacity');
  }
  public set maxCapacity(value: number) {
    this._maxCapacity = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maxCapacityInput() {
    return this._maxCapacity;
  }

  // min_capacity - computed: false, optional: false, required: true
  private _minCapacity?: number; 
  public get minCapacity() {
    return this.getNumberAttribute('min_capacity');
  }
  public set minCapacity(value: number) {
    this._minCapacity = value;
  }
  // Temporarily expose input value. Use with caution.
  public get minCapacityInput() {
    return this._minCapacity;
  }

  // node_group - computed: false, optional: false, required: true
  private _nodeGroup?: string; 
  public get nodeGroup() {
    return this.getStringAttribute('node_group');
  }
  public set nodeGroup(value: string) {
    this._nodeGroup = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeGroupInput() {
    return this._nodeGroup;
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

  // exec_scripts - computed: false, optional: true, required: false
  private _execScripts = new MapreduceScalingPolicyExecScriptsList(this, "exec_scripts", false);
  public get execScripts() {
    return this._execScripts;
  }
  public putExecScripts(value: MapreduceScalingPolicyExecScripts[] | cdktf.IResolvable) {
    this._execScripts.internalValue = value;
  }
  public resetExecScripts() {
    this._execScripts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get execScriptsInput() {
    return this._execScripts.internalValue;
  }

  // resources_plans - computed: false, optional: true, required: false
  private _resourcesPlans = new MapreduceScalingPolicyResourcesPlansList(this, "resources_plans", false);
  public get resourcesPlans() {
    return this._resourcesPlans;
  }
  public putResourcesPlans(value: MapreduceScalingPolicyResourcesPlans[] | cdktf.IResolvable) {
    this._resourcesPlans.internalValue = value;
  }
  public resetResourcesPlans() {
    this._resourcesPlans.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourcesPlansInput() {
    return this._resourcesPlans.internalValue;
  }

  // rules - computed: false, optional: true, required: false
  private _rules = new MapreduceScalingPolicyRulesList(this, "rules", false);
  public get rules() {
    return this._rules;
  }
  public putRules(value: MapreduceScalingPolicyRules[] | cdktf.IResolvable) {
    this._rules.internalValue = value;
  }
  public resetRules() {
    this._rules.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rulesInput() {
    return this._rules.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auto_scaling_enable: cdktf.booleanToTerraform(this._autoScalingEnable),
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      id: cdktf.stringToTerraform(this._id),
      max_capacity: cdktf.numberToTerraform(this._maxCapacity),
      min_capacity: cdktf.numberToTerraform(this._minCapacity),
      node_group: cdktf.stringToTerraform(this._nodeGroup),
      region: cdktf.stringToTerraform(this._region),
      exec_scripts: cdktf.listMapper(mapreduceScalingPolicyExecScriptsToTerraform, true)(this._execScripts.internalValue),
      resources_plans: cdktf.listMapper(mapreduceScalingPolicyResourcesPlansToTerraform, true)(this._resourcesPlans.internalValue),
      rules: cdktf.listMapper(mapreduceScalingPolicyRulesToTerraform, true)(this._rules.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auto_scaling_enable: {
        value: cdktf.booleanToHclTerraform(this._autoScalingEnable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
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
      max_capacity: {
        value: cdktf.numberToHclTerraform(this._maxCapacity),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      min_capacity: {
        value: cdktf.numberToHclTerraform(this._minCapacity),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      node_group: {
        value: cdktf.stringToHclTerraform(this._nodeGroup),
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
      exec_scripts: {
        value: cdktf.listMapperHcl(mapreduceScalingPolicyExecScriptsToHclTerraform, true)(this._execScripts.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceScalingPolicyExecScriptsList",
      },
      resources_plans: {
        value: cdktf.listMapperHcl(mapreduceScalingPolicyResourcesPlansToHclTerraform, true)(this._resourcesPlans.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceScalingPolicyResourcesPlansList",
      },
      rules: {
        value: cdktf.listMapperHcl(mapreduceScalingPolicyRulesToHclTerraform, true)(this._rules.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MapreduceScalingPolicyRulesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

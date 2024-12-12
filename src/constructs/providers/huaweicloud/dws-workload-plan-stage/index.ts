// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DwsWorkloadPlanStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#cluster_id DwsWorkloadPlanStage#cluster_id}
  */
  readonly clusterId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#day DwsWorkloadPlanStage#day}
  */
  readonly day?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#end_time DwsWorkloadPlanStage#end_time}
  */
  readonly endTime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#id DwsWorkloadPlanStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#month DwsWorkloadPlanStage#month}
  */
  readonly month?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#name DwsWorkloadPlanStage#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#plan_id DwsWorkloadPlanStage#plan_id}
  */
  readonly planId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#region DwsWorkloadPlanStage#region}
  */
  readonly region?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#start_time DwsWorkloadPlanStage#start_time}
  */
  readonly startTime: string;
  /**
  * queues block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#queues DwsWorkloadPlanStage#queues}
  */
  readonly queues: DwsWorkloadPlanStageQueues[] | cdktf.IResolvable;
}
export interface DwsWorkloadPlanStageQueuesConfiguration {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#resource_description DwsWorkloadPlanStage#resource_description}
  */
  readonly resourceDescription?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#resource_name DwsWorkloadPlanStage#resource_name}
  */
  readonly resourceName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#resource_value DwsWorkloadPlanStage#resource_value}
  */
  readonly resourceValue: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#value_unit DwsWorkloadPlanStage#value_unit}
  */
  readonly valueUnit?: string;
}

export function dwsWorkloadPlanStageQueuesConfigurationToTerraform(struct?: DwsWorkloadPlanStageQueuesConfiguration | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    resource_description: cdktf.stringToTerraform(struct!.resourceDescription),
    resource_name: cdktf.stringToTerraform(struct!.resourceName),
    resource_value: cdktf.numberToTerraform(struct!.resourceValue),
    value_unit: cdktf.stringToTerraform(struct!.valueUnit),
  }
}


export function dwsWorkloadPlanStageQueuesConfigurationToHclTerraform(struct?: DwsWorkloadPlanStageQueuesConfiguration | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    resource_description: {
      value: cdktf.stringToHclTerraform(struct!.resourceDescription),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    resource_name: {
      value: cdktf.stringToHclTerraform(struct!.resourceName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    resource_value: {
      value: cdktf.numberToHclTerraform(struct!.resourceValue),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    value_unit: {
      value: cdktf.stringToHclTerraform(struct!.valueUnit),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DwsWorkloadPlanStageQueuesConfigurationOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DwsWorkloadPlanStageQueuesConfiguration | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._resourceDescription !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceDescription = this._resourceDescription;
    }
    if (this._resourceName !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceName = this._resourceName;
    }
    if (this._resourceValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.resourceValue = this._resourceValue;
    }
    if (this._valueUnit !== undefined) {
      hasAnyValues = true;
      internalValueResult.valueUnit = this._valueUnit;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsWorkloadPlanStageQueuesConfiguration | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._resourceDescription = undefined;
      this._resourceName = undefined;
      this._resourceValue = undefined;
      this._valueUnit = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._resourceDescription = value.resourceDescription;
      this._resourceName = value.resourceName;
      this._resourceValue = value.resourceValue;
      this._valueUnit = value.valueUnit;
    }
  }

  // resource_description - computed: false, optional: true, required: false
  private _resourceDescription?: string; 
  public get resourceDescription() {
    return this.getStringAttribute('resource_description');
  }
  public set resourceDescription(value: string) {
    this._resourceDescription = value;
  }
  public resetResourceDescription() {
    this._resourceDescription = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceDescriptionInput() {
    return this._resourceDescription;
  }

  // resource_name - computed: false, optional: false, required: true
  private _resourceName?: string; 
  public get resourceName() {
    return this.getStringAttribute('resource_name');
  }
  public set resourceName(value: string) {
    this._resourceName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceNameInput() {
    return this._resourceName;
  }

  // resource_value - computed: false, optional: false, required: true
  private _resourceValue?: number; 
  public get resourceValue() {
    return this.getNumberAttribute('resource_value');
  }
  public set resourceValue(value: number) {
    this._resourceValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceValueInput() {
    return this._resourceValue;
  }

  // value_unit - computed: false, optional: true, required: false
  private _valueUnit?: string; 
  public get valueUnit() {
    return this.getStringAttribute('value_unit');
  }
  public set valueUnit(value: string) {
    this._valueUnit = value;
  }
  public resetValueUnit() {
    this._valueUnit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get valueUnitInput() {
    return this._valueUnit;
  }
}

export class DwsWorkloadPlanStageQueuesConfigurationList extends cdktf.ComplexList {
  public internalValue? : DwsWorkloadPlanStageQueuesConfiguration[] | cdktf.IResolvable

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
  public get(index: number): DwsWorkloadPlanStageQueuesConfigurationOutputReference {
    return new DwsWorkloadPlanStageQueuesConfigurationOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DwsWorkloadPlanStageQueues {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#name DwsWorkloadPlanStage#name}
  */
  readonly name: string;
  /**
  * configuration block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#configuration DwsWorkloadPlanStage#configuration}
  */
  readonly configuration: DwsWorkloadPlanStageQueuesConfiguration[] | cdktf.IResolvable;
}

export function dwsWorkloadPlanStageQueuesToTerraform(struct?: DwsWorkloadPlanStageQueues | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    name: cdktf.stringToTerraform(struct!.name),
    configuration: cdktf.listMapper(dwsWorkloadPlanStageQueuesConfigurationToTerraform, true)(struct!.configuration),
  }
}


export function dwsWorkloadPlanStageQueuesToHclTerraform(struct?: DwsWorkloadPlanStageQueues | cdktf.IResolvable): any {
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
    configuration: {
      value: cdktf.listMapperHcl(dwsWorkloadPlanStageQueuesConfigurationToHclTerraform, true)(struct!.configuration),
      isBlock: true,
      type: "set",
      storageClassType: "DwsWorkloadPlanStageQueuesConfigurationList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DwsWorkloadPlanStageQueuesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DwsWorkloadPlanStageQueues | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._configuration?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.configuration = this._configuration?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DwsWorkloadPlanStageQueues | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._name = undefined;
      this._configuration.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._name = value.name;
      this._configuration.internalValue = value.configuration;
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

  // configuration - computed: false, optional: false, required: true
  private _configuration = new DwsWorkloadPlanStageQueuesConfigurationList(this, "configuration", true);
  public get configuration() {
    return this._configuration;
  }
  public putConfiguration(value: DwsWorkloadPlanStageQueuesConfiguration[] | cdktf.IResolvable) {
    this._configuration.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get configurationInput() {
    return this._configuration.internalValue;
  }
}

export class DwsWorkloadPlanStageQueuesList extends cdktf.ComplexList {
  public internalValue? : DwsWorkloadPlanStageQueues[] | cdktf.IResolvable

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
  public get(index: number): DwsWorkloadPlanStageQueuesOutputReference {
    return new DwsWorkloadPlanStageQueuesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage huaweicloud_dws_workload_plan_stage}
*/
export class DwsWorkloadPlanStage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dws_workload_plan_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DwsWorkloadPlanStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DwsWorkloadPlanStage to import
  * @param importFromId The id of the existing DwsWorkloadPlanStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DwsWorkloadPlanStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dws_workload_plan_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dws_workload_plan_stage huaweicloud_dws_workload_plan_stage} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DwsWorkloadPlanStageConfig
  */
  public constructor(scope: Construct, id: string, config: DwsWorkloadPlanStageConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dws_workload_plan_stage',
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
    this._clusterId = config.clusterId;
    this._day = config.day;
    this._endTime = config.endTime;
    this._id = config.id;
    this._month = config.month;
    this._name = config.name;
    this._planId = config.planId;
    this._region = config.region;
    this._startTime = config.startTime;
    this._queues.internalValue = config.queues;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // day - computed: true, optional: true, required: false
  private _day?: string; 
  public get day() {
    return this.getStringAttribute('day');
  }
  public set day(value: string) {
    this._day = value;
  }
  public resetDay() {
    this._day = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dayInput() {
    return this._day;
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

  // month - computed: true, optional: true, required: false
  private _month?: string; 
  public get month() {
    return this.getStringAttribute('month');
  }
  public set month(value: string) {
    this._month = value;
  }
  public resetMonth() {
    this._month = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get monthInput() {
    return this._month;
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

  // plan_id - computed: false, optional: false, required: true
  private _planId?: string; 
  public get planId() {
    return this.getStringAttribute('plan_id');
  }
  public set planId(value: string) {
    this._planId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get planIdInput() {
    return this._planId;
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

  // queues - computed: false, optional: false, required: true
  private _queues = new DwsWorkloadPlanStageQueuesList(this, "queues", false);
  public get queues() {
    return this._queues;
  }
  public putQueues(value: DwsWorkloadPlanStageQueues[] | cdktf.IResolvable) {
    this._queues.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get queuesInput() {
    return this._queues.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      day: cdktf.stringToTerraform(this._day),
      end_time: cdktf.stringToTerraform(this._endTime),
      id: cdktf.stringToTerraform(this._id),
      month: cdktf.stringToTerraform(this._month),
      name: cdktf.stringToTerraform(this._name),
      plan_id: cdktf.stringToTerraform(this._planId),
      region: cdktf.stringToTerraform(this._region),
      start_time: cdktf.stringToTerraform(this._startTime),
      queues: cdktf.listMapper(dwsWorkloadPlanStageQueuesToTerraform, true)(this._queues.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cluster_id: {
        value: cdktf.stringToHclTerraform(this._clusterId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      day: {
        value: cdktf.stringToHclTerraform(this._day),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      end_time: {
        value: cdktf.stringToHclTerraform(this._endTime),
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
      month: {
        value: cdktf.stringToHclTerraform(this._month),
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
      plan_id: {
        value: cdktf.stringToHclTerraform(this._planId),
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
      start_time: {
        value: cdktf.stringToHclTerraform(this._startTime),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      queues: {
        value: cdktf.listMapperHcl(dwsWorkloadPlanStageQueuesToHclTerraform, true)(this._queues.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DwsWorkloadPlanStageQueuesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}

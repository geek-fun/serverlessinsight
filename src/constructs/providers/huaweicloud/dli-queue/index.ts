// https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DliQueueConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#cu_count DliQueue#cu_count}
  */
  readonly cuCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#description DliQueue#description}
  */
  readonly description?: string;
  /**
  * The name of the elastic resource pool to which the queue belongs.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#elastic_resource_pool_name DliQueue#elastic_resource_pool_name}
  */
  readonly elasticResourcePoolName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#enterprise_project_id DliQueue#enterprise_project_id}
  */
  readonly enterpriseProjectId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#feature DliQueue#feature}
  */
  readonly feature?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#id DliQueue#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#management_subnet_cidr DliQueue#management_subnet_cidr}
  */
  readonly managementSubnetCidr?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#name DliQueue#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#platform DliQueue#platform}
  */
  readonly platform?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#queue_type DliQueue#queue_type}
  */
  readonly queueType?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#region DliQueue#region}
  */
  readonly region?: string;
  /**
  * The queue resource mode.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#resource_mode DliQueue#resource_mode}
  */
  readonly resourceMode?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#subnet_cidr DliQueue#subnet_cidr}
  */
  readonly subnetCidr?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#tags DliQueue#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * The CIDR block of the queue.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#vpc_cidr DliQueue#vpc_cidr}
  */
  readonly vpcCidr?: string;
  /**
  * scaling_policies block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#scaling_policies DliQueue#scaling_policies}
  */
  readonly scalingPolicies?: DliQueueScalingPolicies[] | cdktf.IResolvable;
  /**
  * spark_driver block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#spark_driver DliQueue#spark_driver}
  */
  readonly sparkDriver?: DliQueueSparkDriver;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#timeouts DliQueue#timeouts}
  */
  readonly timeouts?: DliQueueTimeouts;
}
export interface DliQueueScalingPolicies {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#impact_start_time DliQueue#impact_start_time}
  */
  readonly impactStartTime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#impact_stop_time DliQueue#impact_stop_time}
  */
  readonly impactStopTime: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#max_cu DliQueue#max_cu}
  */
  readonly maxCu: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#min_cu DliQueue#min_cu}
  */
  readonly minCu: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#priority DliQueue#priority}
  */
  readonly priority: number;
}

export function dliQueueScalingPoliciesToTerraform(struct?: DliQueueScalingPolicies | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    impact_start_time: cdktf.stringToTerraform(struct!.impactStartTime),
    impact_stop_time: cdktf.stringToTerraform(struct!.impactStopTime),
    max_cu: cdktf.numberToTerraform(struct!.maxCu),
    min_cu: cdktf.numberToTerraform(struct!.minCu),
    priority: cdktf.numberToTerraform(struct!.priority),
  }
}


export function dliQueueScalingPoliciesToHclTerraform(struct?: DliQueueScalingPolicies | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    impact_start_time: {
      value: cdktf.stringToHclTerraform(struct!.impactStartTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    impact_stop_time: {
      value: cdktf.stringToHclTerraform(struct!.impactStopTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    max_cu: {
      value: cdktf.numberToHclTerraform(struct!.maxCu),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    min_cu: {
      value: cdktf.numberToHclTerraform(struct!.minCu),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
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

export class DliQueueScalingPoliciesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DliQueueScalingPolicies | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._impactStartTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.impactStartTime = this._impactStartTime;
    }
    if (this._impactStopTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.impactStopTime = this._impactStopTime;
    }
    if (this._maxCu !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxCu = this._maxCu;
    }
    if (this._minCu !== undefined) {
      hasAnyValues = true;
      internalValueResult.minCu = this._minCu;
    }
    if (this._priority !== undefined) {
      hasAnyValues = true;
      internalValueResult.priority = this._priority;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliQueueScalingPolicies | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._impactStartTime = undefined;
      this._impactStopTime = undefined;
      this._maxCu = undefined;
      this._minCu = undefined;
      this._priority = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._impactStartTime = value.impactStartTime;
      this._impactStopTime = value.impactStopTime;
      this._maxCu = value.maxCu;
      this._minCu = value.minCu;
      this._priority = value.priority;
    }
  }

  // impact_start_time - computed: false, optional: false, required: true
  private _impactStartTime?: string; 
  public get impactStartTime() {
    return this.getStringAttribute('impact_start_time');
  }
  public set impactStartTime(value: string) {
    this._impactStartTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get impactStartTimeInput() {
    return this._impactStartTime;
  }

  // impact_stop_time - computed: false, optional: false, required: true
  private _impactStopTime?: string; 
  public get impactStopTime() {
    return this.getStringAttribute('impact_stop_time');
  }
  public set impactStopTime(value: string) {
    this._impactStopTime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get impactStopTimeInput() {
    return this._impactStopTime;
  }

  // max_cu - computed: false, optional: false, required: true
  private _maxCu?: number; 
  public get maxCu() {
    return this.getNumberAttribute('max_cu');
  }
  public set maxCu(value: number) {
    this._maxCu = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maxCuInput() {
    return this._maxCu;
  }

  // min_cu - computed: false, optional: false, required: true
  private _minCu?: number; 
  public get minCu() {
    return this.getNumberAttribute('min_cu');
  }
  public set minCu(value: number) {
    this._minCu = value;
  }
  // Temporarily expose input value. Use with caution.
  public get minCuInput() {
    return this._minCu;
  }

  // priority - computed: false, optional: false, required: true
  private _priority?: number; 
  public get priority() {
    return this.getNumberAttribute('priority');
  }
  public set priority(value: number) {
    this._priority = value;
  }
  // Temporarily expose input value. Use with caution.
  public get priorityInput() {
    return this._priority;
  }
}

export class DliQueueScalingPoliciesList extends cdktf.ComplexList {
  public internalValue? : DliQueueScalingPolicies[] | cdktf.IResolvable

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
  public get(index: number): DliQueueScalingPoliciesOutputReference {
    return new DliQueueScalingPoliciesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DliQueueSparkDriver {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#max_concurrent DliQueue#max_concurrent}
  */
  readonly maxConcurrent?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#max_instance DliQueue#max_instance}
  */
  readonly maxInstance?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#max_prefetch_instance DliQueue#max_prefetch_instance}
  */
  readonly maxPrefetchInstance?: string;
}

export function dliQueueSparkDriverToTerraform(struct?: DliQueueSparkDriverOutputReference | DliQueueSparkDriver): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    max_concurrent: cdktf.numberToTerraform(struct!.maxConcurrent),
    max_instance: cdktf.numberToTerraform(struct!.maxInstance),
    max_prefetch_instance: cdktf.stringToTerraform(struct!.maxPrefetchInstance),
  }
}


export function dliQueueSparkDriverToHclTerraform(struct?: DliQueueSparkDriverOutputReference | DliQueueSparkDriver): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    max_concurrent: {
      value: cdktf.numberToHclTerraform(struct!.maxConcurrent),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    max_instance: {
      value: cdktf.numberToHclTerraform(struct!.maxInstance),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    max_prefetch_instance: {
      value: cdktf.stringToHclTerraform(struct!.maxPrefetchInstance),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DliQueueSparkDriverOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DliQueueSparkDriver | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._maxConcurrent !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxConcurrent = this._maxConcurrent;
    }
    if (this._maxInstance !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxInstance = this._maxInstance;
    }
    if (this._maxPrefetchInstance !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxPrefetchInstance = this._maxPrefetchInstance;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliQueueSparkDriver | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._maxConcurrent = undefined;
      this._maxInstance = undefined;
      this._maxPrefetchInstance = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._maxConcurrent = value.maxConcurrent;
      this._maxInstance = value.maxInstance;
      this._maxPrefetchInstance = value.maxPrefetchInstance;
    }
  }

  // max_concurrent - computed: false, optional: true, required: false
  private _maxConcurrent?: number; 
  public get maxConcurrent() {
    return this.getNumberAttribute('max_concurrent');
  }
  public set maxConcurrent(value: number) {
    this._maxConcurrent = value;
  }
  public resetMaxConcurrent() {
    this._maxConcurrent = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxConcurrentInput() {
    return this._maxConcurrent;
  }

  // max_instance - computed: false, optional: true, required: false
  private _maxInstance?: number; 
  public get maxInstance() {
    return this.getNumberAttribute('max_instance');
  }
  public set maxInstance(value: number) {
    this._maxInstance = value;
  }
  public resetMaxInstance() {
    this._maxInstance = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxInstanceInput() {
    return this._maxInstance;
  }

  // max_prefetch_instance - computed: false, optional: true, required: false
  private _maxPrefetchInstance?: string; 
  public get maxPrefetchInstance() {
    return this.getStringAttribute('max_prefetch_instance');
  }
  public set maxPrefetchInstance(value: string) {
    this._maxPrefetchInstance = value;
  }
  public resetMaxPrefetchInstance() {
    this._maxPrefetchInstance = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxPrefetchInstanceInput() {
    return this._maxPrefetchInstance;
  }
}
export interface DliQueueTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#update DliQueue#update}
  */
  readonly update?: string;
}

export function dliQueueTimeoutsToTerraform(struct?: DliQueueTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function dliQueueTimeoutsToHclTerraform(struct?: DliQueueTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
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

export class DliQueueTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DliQueueTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DliQueueTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._update = value.update;
    }
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
* Represents a {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue huaweicloud_dli_queue}
*/
export class DliQueue extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "huaweicloud_dli_queue";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DliQueue resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DliQueue to import
  * @param importFromId The id of the existing DliQueue that should be imported. Refer to the {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DliQueue to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "huaweicloud_dli_queue", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/huaweicloud/huaweicloud/1.71.1/docs/resources/dli_queue huaweicloud_dli_queue} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DliQueueConfig
  */
  public constructor(scope: Construct, id: string, config: DliQueueConfig) {
    super(scope, id, {
      terraformResourceType: 'huaweicloud_dli_queue',
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
    this._cuCount = config.cuCount;
    this._description = config.description;
    this._elasticResourcePoolName = config.elasticResourcePoolName;
    this._enterpriseProjectId = config.enterpriseProjectId;
    this._feature = config.feature;
    this._id = config.id;
    this._managementSubnetCidr = config.managementSubnetCidr;
    this._name = config.name;
    this._platform = config.platform;
    this._queueType = config.queueType;
    this._region = config.region;
    this._resourceMode = config.resourceMode;
    this._subnetCidr = config.subnetCidr;
    this._tags = config.tags;
    this._vpcCidr = config.vpcCidr;
    this._scalingPolicies.internalValue = config.scalingPolicies;
    this._sparkDriver.internalValue = config.sparkDriver;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // create_time - computed: true, optional: false, required: false
  public get createTime() {
    return this.getNumberAttribute('create_time');
  }

  // cu_count - computed: false, optional: false, required: true
  private _cuCount?: number; 
  public get cuCount() {
    return this.getNumberAttribute('cu_count');
  }
  public set cuCount(value: number) {
    this._cuCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cuCountInput() {
    return this._cuCount;
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

  // elastic_resource_pool_name - computed: true, optional: true, required: false
  private _elasticResourcePoolName?: string; 
  public get elasticResourcePoolName() {
    return this.getStringAttribute('elastic_resource_pool_name');
  }
  public set elasticResourcePoolName(value: string) {
    this._elasticResourcePoolName = value;
  }
  public resetElasticResourcePoolName() {
    this._elasticResourcePoolName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get elasticResourcePoolNameInput() {
    return this._elasticResourcePoolName;
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

  // feature - computed: false, optional: true, required: false
  private _feature?: string; 
  public get feature() {
    return this.getStringAttribute('feature');
  }
  public set feature(value: string) {
    this._feature = value;
  }
  public resetFeature() {
    this._feature = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get featureInput() {
    return this._feature;
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

  // management_subnet_cidr - computed: false, optional: true, required: false
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

  // platform - computed: false, optional: true, required: false
  private _platform?: string; 
  public get platform() {
    return this.getStringAttribute('platform');
  }
  public set platform(value: string) {
    this._platform = value;
  }
  public resetPlatform() {
    this._platform = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get platformInput() {
    return this._platform;
  }

  // queue_type - computed: false, optional: true, required: false
  private _queueType?: string; 
  public get queueType() {
    return this.getStringAttribute('queue_type');
  }
  public set queueType(value: string) {
    this._queueType = value;
  }
  public resetQueueType() {
    this._queueType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get queueTypeInput() {
    return this._queueType;
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

  // resource_mode - computed: true, optional: true, required: false
  private _resourceMode?: number; 
  public get resourceMode() {
    return this.getNumberAttribute('resource_mode');
  }
  public set resourceMode(value: number) {
    this._resourceMode = value;
  }
  public resetResourceMode() {
    this._resourceMode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceModeInput() {
    return this._resourceMode;
  }

  // subnet_cidr - computed: false, optional: true, required: false
  private _subnetCidr?: string; 
  public get subnetCidr() {
    return this.getStringAttribute('subnet_cidr');
  }
  public set subnetCidr(value: string) {
    this._subnetCidr = value;
  }
  public resetSubnetCidr() {
    this._subnetCidr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetCidrInput() {
    return this._subnetCidr;
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

  // vpc_cidr - computed: true, optional: true, required: false
  private _vpcCidr?: string; 
  public get vpcCidr() {
    return this.getStringAttribute('vpc_cidr');
  }
  public set vpcCidr(value: string) {
    this._vpcCidr = value;
  }
  public resetVpcCidr() {
    this._vpcCidr = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcCidrInput() {
    return this._vpcCidr;
  }

  // scaling_policies - computed: false, optional: true, required: false
  private _scalingPolicies = new DliQueueScalingPoliciesList(this, "scaling_policies", true);
  public get scalingPolicies() {
    return this._scalingPolicies;
  }
  public putScalingPolicies(value: DliQueueScalingPolicies[] | cdktf.IResolvable) {
    this._scalingPolicies.internalValue = value;
  }
  public resetScalingPolicies() {
    this._scalingPolicies.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingPoliciesInput() {
    return this._scalingPolicies.internalValue;
  }

  // spark_driver - computed: false, optional: true, required: false
  private _sparkDriver = new DliQueueSparkDriverOutputReference(this, "spark_driver");
  public get sparkDriver() {
    return this._sparkDriver;
  }
  public putSparkDriver(value: DliQueueSparkDriver) {
    this._sparkDriver.internalValue = value;
  }
  public resetSparkDriver() {
    this._sparkDriver.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sparkDriverInput() {
    return this._sparkDriver.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DliQueueTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DliQueueTimeouts) {
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
      cu_count: cdktf.numberToTerraform(this._cuCount),
      description: cdktf.stringToTerraform(this._description),
      elastic_resource_pool_name: cdktf.stringToTerraform(this._elasticResourcePoolName),
      enterprise_project_id: cdktf.stringToTerraform(this._enterpriseProjectId),
      feature: cdktf.stringToTerraform(this._feature),
      id: cdktf.stringToTerraform(this._id),
      management_subnet_cidr: cdktf.stringToTerraform(this._managementSubnetCidr),
      name: cdktf.stringToTerraform(this._name),
      platform: cdktf.stringToTerraform(this._platform),
      queue_type: cdktf.stringToTerraform(this._queueType),
      region: cdktf.stringToTerraform(this._region),
      resource_mode: cdktf.numberToTerraform(this._resourceMode),
      subnet_cidr: cdktf.stringToTerraform(this._subnetCidr),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      vpc_cidr: cdktf.stringToTerraform(this._vpcCidr),
      scaling_policies: cdktf.listMapper(dliQueueScalingPoliciesToTerraform, true)(this._scalingPolicies.internalValue),
      spark_driver: dliQueueSparkDriverToTerraform(this._sparkDriver.internalValue),
      timeouts: dliQueueTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cu_count: {
        value: cdktf.numberToHclTerraform(this._cuCount),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      elastic_resource_pool_name: {
        value: cdktf.stringToHclTerraform(this._elasticResourcePoolName),
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
      feature: {
        value: cdktf.stringToHclTerraform(this._feature),
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
      management_subnet_cidr: {
        value: cdktf.stringToHclTerraform(this._managementSubnetCidr),
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
      platform: {
        value: cdktf.stringToHclTerraform(this._platform),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      queue_type: {
        value: cdktf.stringToHclTerraform(this._queueType),
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
      resource_mode: {
        value: cdktf.numberToHclTerraform(this._resourceMode),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      subnet_cidr: {
        value: cdktf.stringToHclTerraform(this._subnetCidr),
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
      vpc_cidr: {
        value: cdktf.stringToHclTerraform(this._vpcCidr),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      scaling_policies: {
        value: cdktf.listMapperHcl(dliQueueScalingPoliciesToHclTerraform, true)(this._scalingPolicies.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "DliQueueScalingPoliciesList",
      },
      spark_driver: {
        value: dliQueueSparkDriverToHclTerraform(this._sparkDriver.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DliQueueSparkDriverList",
      },
      timeouts: {
        value: dliQueueTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DliQueueTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
